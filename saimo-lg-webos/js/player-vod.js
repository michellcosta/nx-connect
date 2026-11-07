"use strict";

/**
 * SaimoVodPlayer — Controlador Dedicado de Reprodução VOD (Filmes, Séries, Animes e Doramas).
 *
 * Gerencia a barra de tempo focável com passo acelerado, cursor inteligente sem inundar o HLS,
 * diálogo de retomada ("Continuar de MM:SS"), cartão de próximo episódio com contagem regressiva,
 * painel único de configurações (velocidade, proporção, motor, sleep timer) e mapeamento de teclas.
 */
var SaimoVodPlayer = /*#__PURE__*/function () {
  function SaimoVodPlayer(basePlayer) {
    this.base = basePlayer;
    this.video = basePlayer.video;
    this.osd = null;
    this.active = false;
    this.vodItem = null;
    this.currentEp = null;
    this.episodesList = [];

    // Estado da barra e navegação
    this.isScrubbing = false;
    this.cursorTime = 0;
    this.stepSeconds = 10;
    this.lastStepTime = 0;
    this.stepLevel = 0; // 0: 10s, 1: 30s, 2: 60s, 3: 300s
    this.zone = "controls"; // "seekbar", "controls", "resume", "settings", "nextCard", "jump"
    this.tbFocus = "play";
    this.tbOrdem = ["back", "play", "fwd", "gear"];
    this.transportAberto = false;
    this.pausaUsuario = false;
    this.primeiroPlaying = true;
    this._carregando = false;

    // Timers
    this.osdTimer = null;
    this.progressSaveTimer = null;
    this.lastProgressSavedTime = 0;
    this.nextEpCountdownTimer = null;
    this.nextEpSecondsLeft = 10;
    this.sleepTimer = null;
    this.consecutiveEpisodes = 0;
    this.idlePromptActive = false;
    this._setR = 0;
    this._setC = 0;
    this.skipHideTimer = null;
    this.skipVisivel = false;
    this.skipJaMostrado = false;
    this.skipHudTimer = null;

    // Configurações ativas
    this.aspectRatio = "contain"; // contain, fill, cover
    this.playbackSpeed = 1.0;
    this.autoplayEnabled = true;
    this.bindDom();
    this.bindVideoEvents();
  }
  var _proto = SaimoVodPlayer.prototype;
  _proto.bindDom = function bindDom() {
    this.dom = {
      container: document.getElementById("vod-osd"),
      title: document.getElementById("vod-title"),
      subtitle: document.getElementById("vod-subtitle"),
      endsAt: document.getElementById("vod-ends-at"),
      badgeAudio: document.getElementById("vod-badge-audio"),
      badgeQuality: document.getElementById("vod-badge-quality"),
      badgeEngine: document.getElementById("vod-badge-engine"),
      buffering: document.getElementById("vod-buffering"),
      bufferingText: document.getElementById("vod-buffering-text"),
      // Modais
      resumeDialog: document.getElementById("vod-resume-dialog"),
      resumeText: document.getElementById("vod-resume-text"),
      resumeBtnYes: document.getElementById("vod-resume-btn-yes"),
      resumeBtnRestart: document.getElementById("vod-resume-btn-restart"),
      idleDialog: document.getElementById("vod-idle-dialog"),
      idleBtnContinue: document.getElementById("vod-idle-btn-continue"),
      jumpDialog: document.getElementById("vod-jump-dialog"),
      jumpDisplay: document.getElementById("vod-jump-display"),
      nextCard: document.getElementById("vod-next-card"),
      nextTitle: document.getElementById("vod-next-title"),
      nextProgressFill: document.getElementById("vod-next-progress-fill"),
      settingsPanel: document.getElementById("vod-settings-panel"),
      // Seekbar
      seekbar: document.getElementById("vod-seekbar"),
      seekBuffered: document.getElementById("vod-seek-buffered"),
      seekPlayed: document.getElementById("vod-seek-played"),
      seekCursor: document.getElementById("vod-seek-cursor"),
      cursorTooltip: document.getElementById("vod-cursor-tooltip"),
      seekMarks: document.getElementById("vod-seek-marks"),
      currentTime: document.getElementById("vod-current-time"),
      remainingTime: document.getElementById("vod-remaining-time"),
      durationTime: document.getElementById("vod-duration-time"),
      stepBadge: document.getElementById("vod-step-badge"),
      hintSkip: document.getElementById("vod-hint-skip"),
      skipBtn: document.getElementById("vod-skip-btn"),
      sourceIndicator: document.getElementById("vod-source-indicator"),
      skipHud: document.getElementById("vod-skip-hud"),
      skipHudArrows: document.getElementById("vod-skip-hud-arrows"),
      skipHudAmt: document.getElementById("vod-skip-hud-amt"),
      skipHudTime: document.getElementById("vod-skip-hud-time"),
      pauseIcon: document.getElementById("vod-pause-icon"),
      tbBack: document.getElementById("vod-btn-back"),
      tbPlay: document.getElementById("vod-btn-play"),
      tbFwd: document.getElementById("vod-btn-fwd"),
      tbGear: document.getElementById("vod-btn-gear")
    };
    var self = this;
    if (this.dom.settingsPanel) {
      this.dom.settingsPanel.addEventListener("click", function (e) {
        var chip = e.target;
        while (chip && chip !== self.dom.settingsPanel && !(chip.classList && chip.classList.contains("vod-chip"))) chip = chip.parentNode;
        if (!chip || chip === self.dom.settingsPanel) return;
        self.ativarChip(chip);
      });
    }
    if (this.dom.skipBtn) {
      this.dom.skipBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!self.active || !self.skipVisivel) return;
        self.base.skipIntro();
        self.esconderBotaoPular();
        if (self.zone === "skip") self.zone = "controls";
      });
    }
  };
  _proto.bindVideoEvents = function bindVideoEvents() {
    var _this = this;
    if (!this.video) return;
    this.video.addEventListener("timeupdate", function () {
      if (!_this.active || _this.isScrubbing) return;
      _this.updateTimeline();
      _this.checkSkipMarks();
      _this.checkProgressSave();
    });
    this.video.addEventListener("waiting", function () {
      if (!_this.active) return;
      _this.showBuffering(true, "Carregando...");
    });
    this.video.addEventListener("playing", function () {
      if (!_this.active) return;
      _this._carregando = false;
      _this.pausaUsuario = false;
      _this.showBuffering(false);
      _this.updateTimeline();
      _this.updateBadges();
      _this.mostrarPausa(false);
      _this.atualizarTransport();
      if (_this.zone === "resume" || _this.zone === "settings" || _this.zone === "idlePrompt") return;
      if (_this.primeiroPlaying) {
        _this.primeiroPlaying = false;
        _this.mostrarProgresso(4000);
        return;
      }
      if (_this.transportAberto) _this.showOSD(_this.video.paused ? 0 : 5000);
    });
    this.video.addEventListener("canplay", function () {
      if (!_this.active) return;
      _this.showBuffering(false);
    });
    this.video.addEventListener("pause", function () {
      if (!_this.active) return;
      _this.saveProgressNow();
      if (_this.zone === "resume" || _this.zone === "idlePrompt" || _this.zone === "settings") return;
      if (!_this.pausaUsuario) return;
      _this.checkSkipMarks();
      _this.esconderBotaoPular();
      _this.mostrarPausa(true);
      _this.atualizarTransport();
      _this.mostrarFaixaPlay();
      _this.showOSD(0);
    });
    this.video.addEventListener("ended", function () {
      if (!_this.active) return;
      _this.handleVideoEnded();
    });
  };
  _proto.iniciar = function iniciar(item, ep, resumeTime, episodesList) {
    this.active = true;
    this.vodItem = item;
    this.currentEp = ep;
    this.episodesList = episodesList || [];
    this.isScrubbing = false;
    this.zone = "controls";
    this.cursorTime = 0;
    this.stepLevel = 0;
    this.skipJaMostrado = false;
    this.tbFocus = "play";
    this.transportAberto = false;
    this.pausaUsuario = false;
    this.primeiroPlaying = true;
    this._carregando = true;
    this.esconderSkipHud();
    this.mostrarPausa(false);
    this.atualizarTransport();
    if (this.base.showLoading) this.base.showLoading(false);

    if (this.dom.container) {
      this.dom.container.classList.remove("hidden");
      this.dom.container.classList.add("is-chrome-off");
      this.dom.container.classList.remove("is-progress-only");
    }
    var liveOsd = document.getElementById("player-osd");
    if (liveOsd) liveOsd.classList.add("hidden");
    if (this.base.osd && this.base.osd.skipBtn) this.base.osd.skipBtn.classList.add("hidden");
    this.updateTitles();
    this.renderSeekMarks();
    this.updateBadges();
    this.aplicarProporcao(this.aspectRatio);
    this.showBuffering(true, "Carregando...");

    var salvo = this.obterProgressoSalvo();
    if (salvo && salvo.currentTime >= 30 && salvo.currentTime < (this.video.duration || 999999) * 0.95 && !resumeTime) {
      this.mostrarDialogoRetomada(salvo.currentTime);
    } else if (resumeTime && resumeTime > 0) {
      this.seekTo(resumeTime);
    }
  };
  _proto.fechar = function fechar() {
    this.saveProgressNow();
    this.active = false;
    this.isScrubbing = false;
    this.limparCountdownProximoEp();
    if (this.dom.container) this.dom.container.classList.add("hidden");
    if (this.dom.settingsPanel) this.dom.settingsPanel.classList.add("hidden");
    if (this.dom.resumeDialog) this.dom.resumeDialog.classList.add("hidden");
    if (this.dom.idleDialog) this.dom.idleDialog.classList.add("hidden");
    this.esconderBotaoPular();
    this.esconderSkipHud();
    this.mostrarPausa(false);
    this.pausaUsuario = false;
    this.transportAberto = false;
    this._carregando = false;
  };
  _proto.podeContexto = function podeContexto() {
    if (!this.active) return false;
    if (this.transportAberto) return false;
    if (this.pausaUsuario) return false;
    if (this.zone === "resume" || this.zone === "idlePrompt" || this.zone === "settings") return false;
    if (this.nextEpCountdownTimer) return false;
    return true;
  };
  _proto.temPularDisponivel = function temPularDisponivel() {
    var marks = this.base.currentChannel && this.base.currentChannel.skipMarks || [];
    var cur = this.video.currentTime || 0;
    var dur = this.video.duration || 0;
    return !!marks.find(function (m) {
      return m.tipo !== "creditos" && cur >= m.inicio && cur < (m.fim || dur) - 1;
    });
  };
  _proto.esconderBotaoPular = function esconderBotaoPular() {
    if (this.skipHideTimer) {
      clearTimeout(this.skipHideTimer);
      this.skipHideTimer = null;
    }
    this.skipVisivel = false;
    if (this.dom.skipBtn) {
      this.dom.skipBtn.classList.add("hidden");
      this.dom.skipBtn.classList.remove("is-focused");
    }
    if (this.zone === "skip") this.zone = "controls";
  };
  _proto.mostrarBotaoPular = function mostrarBotaoPular(label) {
    var _thisSkip = this;
    if (!this.dom.skipBtn) return;
    this.dom.skipBtn.textContent = label || "Pular abertura";
    this.dom.skipBtn.classList.remove("hidden");
    this.skipVisivel = true;
    this.showOSD(3500);
    if (this.skipHideTimer) clearTimeout(this.skipHideTimer);
    this.skipHideTimer = setTimeout(function () {
      if (!_thisSkip.isOSDVisible()) _thisSkip.esconderBotaoPular();
    }, 3000);
  };
  _proto.focarBotaoPular = function focarBotaoPular() {
    if (!this.skipVisivel || !this.dom.skipBtn) return false;
    this.zone = "skip";
    if (this.dom.seekbar) this.dom.seekbar.classList.remove("is-focused");
    this.dom.skipBtn.classList.add("is-focused");
    this.showOSD(8000);
    return true;
  };
  _proto.updateTitles = function updateTitles() {
    if (!this.vodItem) return;
    var isSeries = this.vodItem.type === "series";
    if (this.dom.title) {
      this.dom.title.textContent = this.vodItem.title || this.vodItem.name || "Vídeo";
    }
    if (this.dom.subtitle) {
      if (isSeries && this.currentEp) {
        var s = String(this.currentEp.season || "1").padStart(2, "0");
        var e = String(this.currentEp.episode || "1").padStart(2, "0");
        var t = this.currentEp.title ? " \xB7 " + this.currentEp.title : "";
        this.dom.subtitle.textContent = "T" + s + " \xB7 E" + e + t;
        this.dom.subtitle.style.display = "block";
      } else if (this.vodItem.year) {
        this.dom.subtitle.textContent = "Lan\xE7amento: " + this.vodItem.year;
        this.dom.subtitle.style.display = "block";
      } else {
        this.dom.subtitle.style.display = "none";
      }
    }
  };
  _proto.updateBadges = function updateBadges() {
    if (this.dom.badgeEngine) {
      this.dom.badgeEngine.textContent = this.base.getEngineName ? this.base.getEngineName().toUpperCase() : "NATIVO";
    }
    if (this.dom.badgeQuality) {
      var h = this.video.videoHeight || 1080;
      this.dom.badgeQuality.textContent = h >= 2160 ? "4K" : h >= 1080 ? "FHD" : "HD";
    }
    if (this.dom.badgeAudio) {
      var src = this.base.currentChannel && this.base.currentChannel.sources && this.base.currentChannel.sources[this.base.currentSourceIndex];
      this.dom.badgeAudio.textContent = src && src.audio ? src.audio.toUpperCase() : "DUB";
    }
    if (this.dom.sourceIndicator && this.base.currentChannel) {
      var total = (this.base.currentChannel.sources || []).length;
      this.dom.sourceIndicator.textContent = "Fonte " + (this.base.currentSourceIndex + 1) + " de " + total;
    }
  };
  _proto.updateTimeline = function updateTimeline() {
    var cur = this.video.currentTime || 0;
    var dur = this.video.duration || 0;
    if (dur <= 0 || isNaN(dur)) return;

    // Atualiza textos de tempo
    if (this.dom.currentTime) this.dom.currentTime.textContent = this.formatTime(cur);
    if (this.dom.durationTime) this.dom.durationTime.textContent = this.formatTime(dur);
    if (this.dom.remainingTime) this.dom.remainingTime.textContent = "-" + this.formatTime(Math.max(0, dur - cur));

    // Termina às HH:MM
    if (this.dom.endsAt) {
      var agora = Date.now();
      var restanteMs = Math.max(0, dur - cur) * 1000;
      var dataFim = new Date(agora + restanteMs);
      var hh = String(dataFim.getHours()).padStart(2, "0");
      var mm = String(dataFim.getMinutes()).padStart(2, "0");
      this.dom.endsAt.textContent = "Termina \xE0s " + hh + ":" + mm;
    }

    // Progresso reproduzido
    var pct = Math.min(100, Math.max(0, cur / dur * 100));
    if (this.dom.seekPlayed) this.dom.seekPlayed.style.width = pct + "%";

    // Progresso em buffer
    try {
      var b = this.video.buffered;
      if (b && b.length > 0) {
        for (var i = 0; i < b.length; i++) {
          if (b.start(i) <= cur && cur <= b.end(i)) {
            var bufPct = Math.min(100, b.end(i) / dur * 100);
            if (this.dom.seekBuffered) this.dom.seekBuffered.style.width = bufPct + "%";
            break;
          }
        }
      }
    } catch (e) {}
  };
  _proto.renderSeekMarks = function renderSeekMarks() {
    var _this2 = this;
    if (!this.dom.seekMarks) return;
    this.dom.seekMarks.innerHTML = "";
    var marks = this.base.currentChannel && this.base.currentChannel.skipMarks || [];
    var dur = this.video.duration || 1;
    marks.forEach(function (m) {
      if (m.inicio == null || dur <= 0) return;
      var el = document.createElement("div");
      el.className = "vod-seek-mark " + (m.tipo === "creditos" ? "credits" : "intro");
      var leftPct = m.inicio / dur * 100;
      var widthPct = m.fim != null ? Math.max(1, (m.fim - m.inicio) / dur * 100) : 2;
      el.style.left = leftPct + "%";
      el.style.width = widthPct + "%";
      _this2.dom.seekMarks.appendChild(el);
    });
  }

  // ── Navegação & Scrubbing na Seekbar ───────────────────────────
;
  _proto.iniciarScrubbing = function iniciarScrubbing(direcao) {
    this.isScrubbing = true;
    this.zone = "seekbar";
    if (this.dom.seekbar) this.dom.seekbar.classList.add("is-focused");
    if (this.dom.seekCursor) this.dom.seekCursor.classList.remove("hidden");
    var agora = Date.now();
    var intervalo = agora - this.lastStepTime;
    this.lastStepTime = agora;

    // Aceleração progressiva do passo de busca (10s -> 30s -> 1m -> 5m)
    if (intervalo < 450) {
      this.stepLevel = Math.min(3, this.stepLevel + 1);
    } else if (intervalo > 800) {
      this.stepLevel = 0;
    }
    var steps = [10, 30, 60, 300];
    this.stepSeconds = steps[this.stepLevel] || 10;
    var baseTime = this.cursorTime > 0 ? this.cursorTime : this.video.currentTime || 0;
    var dur = this.video.duration || 0;
    this.cursorTime = Math.max(0, Math.min(baseTime + direcao * this.stepSeconds, dur - 1));

    // Atualiza tooltip e badge de passo
    if (this.dom.cursorTooltip) this.dom.cursorTooltip.textContent = this.formatTime(this.cursorTime);
    if (this.dom.seekCursor && dur > 0) {
      this.dom.seekCursor.style.left = this.cursorTime / dur * 100 + "%";
    }
    if (this.dom.stepBadge) {
      this.dom.stepBadge.textContent = "" + (direcao > 0 ? "+" : "-") + this.formatPasso(this.stepSeconds);
      this.dom.stepBadge.classList.remove("hidden");
    }
    this.showOSD(6000);
  };
  _proto.confirmarScrubbing = function confirmarScrubbing() {
    if (!this.isScrubbing) return;
    this.isScrubbing = false;
    if (this.dom.seekCursor) this.dom.seekCursor.classList.add("hidden");
    if (this.dom.stepBadge) this.dom.stepBadge.classList.add("hidden");
    this.seekTo(this.cursorTime);
    this.cursorTime = 0;
    this.stepLevel = 0;
    this.showOSD(3000);
  };
  _proto.cancelarScrubbing = function cancelarScrubbing() {
    this.isScrubbing = false;
    this.cursorTime = 0;
    this.stepLevel = 0;
    if (this.dom.seekCursor) this.dom.seekCursor.classList.add("hidden");
    if (this.dom.stepBadge) this.dom.stepBadge.classList.add("hidden");
    this.showOSD(3000);
  };
  _proto.pularInstantaneo = function pularInstantaneo(direcao) {
    if (!this.podeBuscar()) {
      this.base.showStatus("Avanço/retrocesso indisponível neste vídeo.");
      return;
    }
    var agora = Date.now();
    var intervalo = agora - this.lastStepTime;
    this.lastStepTime = agora;
    if (intervalo < 450) this.stepLevel = Math.min(3, this.stepLevel + 1);else if (intervalo > 800) this.stepLevel = 0;
    var steps = [10, 30, 60, 300];
    this.stepSeconds = steps[this.stepLevel] || 10;
    var cur = this.video.currentTime || 0;
    var dur = this.video.duration || 0;
    var dest = Math.max(0, Math.min(cur + direcao * this.stepSeconds, Math.max(0, dur - 1)));
    this.seekTo(dest);
    this.mostrarSkipHud(direcao, this.stepSeconds);
  };
  _proto.mostrarSkipHud = function mostrarSkipHud(direcao, segundos) {
    var _thisHud = this;
    if (!this.dom.skipHud) return;
    this.dom.skipHud.classList.toggle("is-back", direcao < 0);
    this.dom.skipHud.classList.remove("hidden");
    if (this.dom.skipHudArrows) this.dom.skipHudArrows.textContent = direcao < 0 ? "◄ ◄" : "► ►";
    if (this.dom.skipHudAmt) this.dom.skipHudAmt.textContent = (direcao > 0 ? "+" : "-") + this.formatPasso(segundos);
    if (this.dom.skipHudTime) this.dom.skipHudTime.textContent = this.formatTime(this.video.currentTime || 0);
    if (this.skipHudTimer) clearTimeout(this.skipHudTimer);
    this.skipHudTimer = setTimeout(function () {
      _thisHud.esconderSkipHud();
    }, 1400);
    this.updateTimeline();
  };
  _proto.esconderSkipHud = function esconderSkipHud() {
    if (this.skipHudTimer) {
      clearTimeout(this.skipHudTimer);
      this.skipHudTimer = null;
    }
    if (this.dom.skipHud) this.dom.skipHud.classList.add("hidden");
  };
  _proto.mostrarPausa = function mostrarPausa(on) {
    if (!this.dom.pauseIcon) return;
    this.dom.pauseIcon.classList.toggle("hidden", !on);
  };
  _proto.elTransport = function elTransport(id) {
    if (id === "back") return this.dom.tbBack;
    if (id === "fwd") return this.dom.tbFwd;
    if (id === "gear") return this.dom.tbGear;
    return this.dom.tbPlay;
  };
  _proto.atualizarTransport = function atualizarTransport() {
    var play = this.dom.tbPlay;
    if (play) {
      var paused = !!(this.video && this.video.paused);
      play.classList.toggle("is-paused", paused);
      play.classList.toggle("is-playing", !paused);
      play.setAttribute("aria-label", paused ? "Reproduzir" : "Pausar");
    }
    for (var i = 0; i < this.tbOrdem.length; i++) {
      var el = this.elTransport(this.tbOrdem[i]);
      if (el) el.classList.toggle("is-focused", this.tbFocus === this.tbOrdem[i]);
    }
  };
  _proto.mostrarProgresso = function mostrarProgresso(durationMs) {
    this.transportAberto = false;
    this.showOSD(durationMs == null ? 4000 : durationMs);
  };
  _proto.mostrarFaixaPlay = function mostrarFaixaPlay() {
    this.transportAberto = true;
    this.tbFocus = "play";
    this.atualizarTransport();
    this.showOSD(this.pausaUsuario ? 0 : 5000);
  };
  _proto.navegarTransport = function navegarTransport(delta) {
    if (this.zone === "settings") {
      this.toggleSettingsPanel();
      return;
    }
    if (!this.transportAberto) {
      this.pularInstantaneo(delta < 0 ? -1 : 1);
      return;
    }
    var ordem = this.tbOrdem;
    var i = ordem.indexOf(this.tbFocus);
    if (i < 0) i = 1;
    this.tbFocus = ordem[(i + delta + ordem.length) % ordem.length];
    this.atualizarTransport();
    this.showOSD(5000);
  };
  _proto.acionarTransport = function acionarTransport() {
    if (this.tbFocus === "back") {
      this.pularInstantaneo(-1);
      this.showOSD(5000);
      return;
    }
    if (this.tbFocus === "fwd") {
      this.pularInstantaneo(1);
      this.showOSD(5000);
      return;
    }
    if (this.tbFocus === "gear") {
      this.abrirAjustes();
      return;
    }
    if (this.video && !this.video.paused) this.pausaUsuario = true;
    else this.pausaUsuario = false;
    this.base.togglePlayPause();
    this.atualizarTransport();
    this.showOSD(this.pausaUsuario ? 0 : 5000);
  };
  _proto.espiarControles = function espiarControles() {
    if (this.zone === "settings") {
      this.toggleSettingsPanel();
      return;
    }
    if (this.transportAberto || this.isOSDVisible()) this.hideOSD();
    else this.mostrarFaixaPlay();
  };
  _proto.seekTo = function seekTo(targetSeconds) {
    if (!this.podeBuscar()) {
      this.base.showStatus("Avanço/retrocesso indisponível neste vídeo.");
      return;
    }
    var dur = this.video.duration || 0;
    var dest = Math.max(0, Math.min(targetSeconds, dur - 2));

    // Verifica se a área já está no buffer
    var estaBuffered = false;
    try {
      var b = this.video.buffered;
      for (var i = 0; i < b.length; i++) {
        if (b.start(i) <= dest && dest <= b.end(i)) {
          estaBuffered = true;
          break;
        }
      }
    } catch (e) {}
    if (!estaBuffered) {
      this.showBuffering(true, "Carregando...");
    }
    try {
      this.video.currentTime = dest;
      this.updateTimeline();
    } catch (e) {
      this.base.showStatus("Falha ao buscar trecho");
    }
  };
  _proto.podeBuscar = function podeBuscar() {
    if (!this.video || !isFinite(this.video.duration) || this.video.duration <= 0) return false;
    try {
      var s = this.video.seekable;
      return !!(s && s.length > 0);
    } catch (e) {
      return true;
    }
  };
  _proto.pularPorcentagem = function pularPorcentagem(num) {
    if (!this.podeBuscar()) return;
    var dur = this.video.duration || 0;
    var pct = num * 0.1;
    var target = dur * pct;
    this.seekTo(target);
    this.base.showStatus("Pulo para " + num * 10 + "% (" + this.formatTime(target) + ")");
    this.showOSD(3000);
  }

  // ── Diálogos & Modais ──────────────────────────────────────────
;
  _proto.mostrarDialogoRetomada = function mostrarDialogoRetomada(tempo) {
    this.zone = "resume";
    this.pausaUsuario = false;
    this.mostrarPausa(false);
    if (this.dom.container) {
      this.dom.container.classList.remove("hidden");
      this.dom.container.classList.add("is-chrome-off");
      this.dom.container.classList.remove("is-progress-only");
    }
    if (this.dom.resumeText) this.dom.resumeText.textContent = "Voc\xEA parou em " + this.formatTime(tempo);
    if (this.dom.resumeDialog) this.dom.resumeDialog.classList.remove("hidden");
    if (this.dom.resumeBtnYes) this.dom.resumeBtnYes.classList.add("is-focused");
    this.video.pause();
  };
  _proto.fecharDialogoRetomada = function fecharDialogoRetomada(continuar, tempo) {
    if (this.dom.resumeDialog) this.dom.resumeDialog.classList.add("hidden");
    this.zone = "controls";
    if (continuar && tempo > 0) {
      this.seekTo(tempo);
    }
    this.video.play().catch(function () {});
  };
  _proto.checkSkipMarks = function checkSkipMarks() {
    var cur = this.video.currentTime;
    var dur = this.video.duration || 0;
    var marks = this.base.currentChannel && this.base.currentChannel.skipMarks || [];

    // Detecção de Abertura
    var intro = marks.find(function (m) {
      return m.tipo !== "creditos" && cur >= m.inicio && cur < (m.fim || dur) - 1;
    });
    if (intro) {
      if (this.dom.hintSkip) this.dom.hintSkip.textContent = "▼ Pular abertura";
      if (!this.skipJaMostrado) {
        this.skipJaMostrado = true;
        this.mostrarBotaoPular("Pular abertura");
      }
      if (window.SaimoAjustes && SaimoAjustes.get("autoSkip") && intro.fim != null) {
        this.seekTo(intro.fim);
        this.base.showStatus("Abertura pulada automaticamente");
        this.esconderBotaoPular();
      }
    } else {
      this.skipJaMostrado = false;
      this.esconderBotaoPular();
      if (this.dom.hintSkip) this.dom.hintSkip.textContent = "OK longo · menu";
    }

    // Detecção de Créditos / Final para Próximo Episódio
    var credito = marks.find(function (m) {
      return m.tipo === "creditos" && cur >= m.inicio;
    });
    var nosFinais = dur > 60 && dur - cur <= 30;
    if ((credito || nosFinais) && !this.nextEpCountdownTimer && this.temProximoEpisodio()) {
      this.iniciarCountdownProximoEp();
    }
  };
  _proto.temProximoEpisodio = function temProximoEpisodio() {
    if (!this.vodItem || this.vodItem.type !== "series" || !this.currentEp) return false;
    var idx = (this.episodesList || []).indexOf(this.currentEp);
    return idx >= 0 && idx < this.episodesList.length - 1;
  };
  _proto.iniciarCountdownProximoEp = function iniciarCountdownProximoEp() {
    var _this3 = this;
    if (this.idlePromptActive) return;
    this.nextEpSecondsLeft = 10;
    var proxEp = this.episodesList[(this.episodesList || []).indexOf(this.currentEp) + 1];
    if (this.dom.nextTitle) {
      this.dom.nextTitle.textContent = proxEp ? "T" + proxEp.season + " \xB7 E" + proxEp.episode + ": " + (proxEp.title || "Próximo episódio") : "Próximo episódio";
    }
    if (this.dom.nextCard) this.dom.nextCard.classList.remove("hidden");
    this.nextEpCountdownTimer = setInterval(function () {
      _this3.nextEpSecondsLeft--;
      if (_this3.dom.nextProgressFill) {
        var pct = (10 - _this3.nextEpSecondsLeft) / 10 * 100;
        _this3.dom.nextProgressFill.style.width = pct + "%";
      }
      if (_this3.nextEpSecondsLeft <= 0) {
        _this3.limparCountdownProximoEp();
        if (_this3.autoplayEnabled) {
          _this3.consecutiveEpisodes++;
          if (_this3.consecutiveEpisodes >= 3) {
            _this3.mostrarPromptAindaAssistindo();
          } else {
            _this3.tocarProximoEpisodio();
          }
        }
      }
    }, 1000);
  };
  _proto.limparCountdownProximoEp = function limparCountdownProximoEp() {
    if (this.nextEpCountdownTimer) {
      clearInterval(this.nextEpCountdownTimer);
      this.nextEpCountdownTimer = null;
    }
    if (this.dom.nextCard) this.dom.nextCard.classList.add("hidden");
  };
  _proto.tocarProximoEpisodio = function tocarProximoEpisodio() {
    this.limparCountdownProximoEp();
    if (this.base.callbacks && this.base.callbacks.onEnded) {
      this.base.callbacks.onEnded(this.base.currentChannel);
    }
  };
  _proto.mostrarPromptAindaAssistindo = function mostrarPromptAindaAssistindo() {
    this.idlePromptActive = true;
    this.zone = "idlePrompt";
    this.video.pause();
    if (this.dom.idleDialog) this.dom.idleDialog.classList.remove("hidden");
  };
  _proto.confirmarAindaAssistindo = function confirmarAindaAssistindo() {
    this.idlePromptActive = false;
    this.consecutiveEpisodes = 0;
    this.zone = "controls";
    if (this.dom.idleDialog) this.dom.idleDialog.classList.add("hidden");
    this.tocarProximoEpisodio();
  };
  _proto.handleVideoEnded = function handleVideoEnded() {
    this.saveProgressNow(true);
    if (this.temProximoEpisodio()) {
      this.tocarProximoEpisodio();
    } else {
      this.base.showStatus("Fim da reprodução");
      this.showOSD(4000);
    }
  }

  // ── Painel de Configurações ────────────────────────────────────
;
  _proto.toggleSettingsPanel = function toggleSettingsPanel() {
    if (!this.dom.settingsPanel) return;
    if (this.dom.settingsPanel.classList.contains("hidden")) this.abrirAjustes();else this.fecharAjustes();
  };
  _proto.abrirAjustes = function abrirAjustes() {
    if (!this.dom.settingsPanel) return;
    this.zone = "settings";
    this.pintarAjustes();
    this.dom.settingsPanel.classList.remove("hidden");
    this._setR = 0;
    this._setC = 0;
    this.focarChipAjuste();
    if (this.dom.container) {
      this.dom.container.classList.remove("hidden");
      this.dom.container.classList.add("is-chrome-off");
      this.dom.container.classList.remove("is-progress-only");
    }
    if (this.osdTimer) clearTimeout(this.osdTimer);
  };
  _proto.fecharAjustes = function fecharAjustes() {
    if (this.dom.settingsPanel) this.dom.settingsPanel.classList.add("hidden");
    this.zone = "controls";
    this.tbFocus = "play";
    this.atualizarTransport();
    this.hideOSD();
  };
  _proto.marcarChipAtivo = function marcarChipAtivo(row, val) {
    if (!row) return;
    Array.prototype.forEach.call(row.querySelectorAll(".vod-chip"), function (c) {
      c.classList.toggle("is-active", String(c.getAttribute("data-val")) === String(val));
    });
  };
  _proto.pintarAjustes = function pintarAjustes() {
    var fontesRow = document.getElementById("vod-setting-fontes");
    var chipsWrap = fontesRow && fontesRow.querySelector(".vod-setting-chips");
    var srcs = this.base.currentChannel && this.base.currentChannel.sources || [];
    var idx = this.base.currentSourceIndex || 0;
    if (fontesRow && chipsWrap) {
      chipsWrap.innerHTML = "";
      if (srcs.length > 1) {
        fontesRow.classList.remove("hidden");
        srcs.forEach(function (s, i) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "vod-chip" + (i === idx ? " is-active" : "");
          b.dataset.act = "fonte";
          b.dataset.idx = String(i);
          var aud = String(s.audio || "").toUpperCase();
          b.textContent = (aud ? aud + " · " : "") + (s.quality || "Fonte " + (i + 1));
          chipsWrap.appendChild(b);
        });
      } else fontesRow.classList.add("hidden");
    }
    var skip = this.dom.settingsPanel.querySelector('[data-act="skip"]');
    if (skip) skip.classList.toggle("hidden", !this.temPularDisponivel());
    var fav = document.getElementById("vod-chip-fav");
    if (fav && this.vodItem) {
      var t = this.vodItem.title || this.vodItem.name || "";
      var on = this.base.callbacks && this.base.callbacks.onIsFav && this.base.callbacks.onIsFav(t);
      fav.textContent = on ? "Remover dos favoritos" : "Favoritar";
    }
    this.marcarChipAtivo(this.dom.settingsPanel.querySelector('[data-setting="speed"]'), this.playbackSpeed);
    this.marcarChipAtivo(this.dom.settingsPanel.querySelector('[data-setting="ratio"]'), this.aspectRatio);
  };
  _proto.linhasAjuste = function linhasAjuste() {
    var rows = [];
    if (!this.dom.settingsPanel) return rows;
    Array.prototype.forEach.call(this.dom.settingsPanel.querySelectorAll(".vod-setting-row"), function (row) {
      if (row.classList.contains("hidden")) return;
      var chips = [];
      Array.prototype.forEach.call(row.querySelectorAll(".vod-chip"), function (c) {
        if (!c.classList.contains("hidden")) chips.push(c);
      });
      if (chips.length) rows.push(chips);
    });
    return rows;
  };
  _proto.chipAjusteAtual = function chipAjusteAtual() {
    var rows = this.linhasAjuste();
    if (!rows.length) return null;
    this._setR = Math.max(0, Math.min(this._setR, rows.length - 1));
    this._setC = Math.max(0, Math.min(this._setC, rows[this._setR].length - 1));
    return rows[this._setR][this._setC] || null;
  };
  _proto.chipsAjusteVisiveis = function chipsAjusteVisiveis() {
    var rows = this.linhasAjuste();
    var all = [];
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < rows[r].length; c++) all.push(rows[r][c]);
    }
    return all;
  };
  _proto.apontarChipAjuste = function apontarChipAjuste(chip) {
    var rows = this.linhasAjuste();
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < rows[r].length; c++) {
        if (rows[r][c] === chip) {
          this._setR = r;
          this._setC = c;
          return;
        }
      }
    }
  };
  _proto.focarChipAjuste = function focarChipAjuste() {
    var rows = this.linhasAjuste();
    if (!rows.length) return;
    this._setR = Math.max(0, Math.min(this._setR, rows.length - 1));
    this._setC = Math.max(0, Math.min(this._setC, rows[this._setR].length - 1));
    Array.prototype.forEach.call(this.dom.settingsPanel.querySelectorAll(".vod-chip"), function (c) {
      c.classList.remove("is-focused");
    });
    var chip = rows[this._setR][this._setC];
    if (chip) {
      chip.classList.add("is-focused");
      try {
        chip.scrollIntoView({
          block: "nearest"
        });
      } catch (e) {}
    }
  };
  _proto.moverChipAjuste = function moverChipAjuste(dx, dy) {
    var cur = this.chipAjusteAtual();
    if (!cur) return;
    var chips = this.chipsAjusteVisiveis();
    var box = cur.getBoundingClientRect();
    var cy = box.top;
    var cx = box.left + box.width / 2;
    var sameLine = [];
    var i;
    for (i = 0; i < chips.length; i++) {
      var t = chips[i].getBoundingClientRect();
      if (Math.abs(t.top - cy) < 10) sameLine.push(chips[i]);
    }
    sameLine.sort(function (a, b) {
      return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
    });
    if (dx !== 0) {
      var idx = 0;
      for (i = 0; i < sameLine.length; i++) if (sameLine[i] === cur) idx = i;
      var viz = sameLine[idx + dx];
      if (viz) {
        this.apontarChipAjuste(viz);
        this.focarChipAjuste();
      }
      return;
    }
    var bestY = dy > 0 ? Infinity : -Infinity;
    for (i = 0; i < chips.length; i++) {
      var top = chips[i].getBoundingClientRect().top;
      if (dy > 0 && top > cy + 10 && top < bestY) bestY = top;
      if (dy < 0 && top < cy - 10 && top > bestY) bestY = top;
    }
    if (bestY === Infinity || bestY === -Infinity) return;
    var best = null;
    var bestDist = Infinity;
    for (i = 0; i < chips.length; i++) {
      var r2 = chips[i].getBoundingClientRect();
      if (Math.abs(r2.top - bestY) > 10) continue;
      var d = Math.abs(r2.left + r2.width / 2 - cx);
      if (d < bestDist) {
        bestDist = d;
        best = chips[i];
      }
    }
    if (best) {
      this.apontarChipAjuste(best);
      this.focarChipAjuste();
    }
  };
  _proto.navegarSettings = function navegarSettings(code) {
    if (code === 461 || code === 27 || code === 10009 || code === 8) {
      this.fecharAjustes();
      return;
    }
    var rows = this.linhasAjuste();
    if (!rows.length) return;
    if (code === 38) this.moverChipAjuste(0, -1);
    else if (code === 40) this.moverChipAjuste(0, 1);
    else if (code === 37) this.moverChipAjuste(-1, 0);
    else if (code === 39) this.moverChipAjuste(1, 0);
    else if (code === 13) {
      this.ativarChip(this.chipAjusteAtual());
    }
  };
  _proto.ativarChip = function ativarChip(chip) {
    if (!chip) return;
    var act = chip.getAttribute("data-act");
    var row = chip.parentNode && chip.parentNode.parentNode;
    var setting = row && row.getAttribute("data-setting");
    var val = chip.getAttribute("data-val");
    if (act === "skip") {
      this.base.skipIntro();
      this.esconderBotaoPular();
      this.fecharAjustes();
      return;
    }
    if (act === "restart") {
      this.seekTo(0);
      this.video.play().catch(function () {});
      this.fecharAjustes();
      return;
    }
    if (act === "fav") {
      if (this.base.callbacks && this.base.callbacks.onToggleFav) this.base.callbacks.onToggleFav(this.vodItem);
      this.pintarAjustes();
      this.focarChipAjuste();
      return;
    }
    if (act === "subs") {
      if (this.base.callbacks && this.base.callbacks.onLegendas) this.base.callbacks.onLegendas();
      return;
    }
    if (act === "fonte") {
      var i = parseInt(chip.getAttribute("data-idx"), 10) || 0;
      var ch = this.base.currentChannel;
      if (ch) this.base.playChannel(ch, i, this.video.currentTime || 0);
      this.pintarAjustes();
      this.focarChipAjuste();
      return;
    }
    if (setting === "speed") {
      this.alterarVelocidade(val);
      this.marcarChipAtivo(row, val);
    } else if (setting === "ratio") {
      this.aplicarProporcao(val);
      this.marcarChipAtivo(row, val);
    } else if (setting === "sleep") {
      this.ajustarSleepTimer(parseInt(val, 10) || 0);
      this.marcarChipAtivo(row, val);
    }
    this.focarChipAjuste();
  };
  _proto.alterarVelocidade = function alterarVelocidade(val) {
    this.playbackSpeed = parseFloat(val) || 1.0;
    try {
      this.video.playbackRate = this.playbackSpeed;
      this.base.showStatus("Velocidade: " + this.playbackSpeed + "x");
    } catch (e) {
      this.base.showStatus("Alteração de velocidade não suportada pela TV");
    }
  };
  _proto.aplicarProporcao = function aplicarProporcao(tipo) {
    this.aspectRatio = tipo;
    if (!this.video) return;
    if (tipo === "fill") {
      this.video.style.objectFit = "fill";
      this.base.showStatus("Proporção: Preencher tela (16:9)");
    } else if (tipo === "cover") {
      this.video.style.objectFit = "cover";
      this.base.showStatus("Proporção: Zoom / Cortar");
    } else {
      this.video.style.objectFit = "contain";
      this.base.showStatus("Proporção: Ajustar (Original)");
    }
  };
  _proto.ajustarSleepTimer = function ajustarSleepTimer(minutos) {
    var _this4 = this;
    if (this.sleepTimer) clearTimeout(this.sleepTimer);
    if (!minutos || minutos <= 0) {
      this.base.showStatus("Timer de sono desativado");
      return;
    }
    this.base.showStatus("Timer de sono ativado para " + minutos + " minutos");
    this.sleepTimer = setTimeout(function () {
      _this4.video.pause();
      _this4.base.showStatus("Timer de sono atingido. Pausado.");
      try {
        if (window.close) window.close();
      } catch (e) {}
    }, minutos * 60 * 1000);
  }

  // ── Progresso e Histórico ─────────────────────────────────────
;
  _proto.obterProgressoSalvo = function obterProgressoSalvo() {
    try {
      var map = JSON.parse(localStorage.getItem("saimo_progress") || "{}");
      var k = this.chaveProgresso();
      return map[k] || null;
    } catch (e) {
      return null;
    }
  };
  _proto.chaveProgresso = function chaveProgresso() {
    if (!this.vodItem) return "";
    if (this.currentEp) return "s:" + this.vodItem.title + "|T" + this.currentEp.season + "E" + this.currentEp.episode;
    if (this.vodItem.type === "series") return "s:" + this.vodItem.title;
    return "f:" + (this.vodItem.title || this.vodItem.name);
  };
  _proto.checkProgressSave = function checkProgressSave() {
    var cur = this.video.currentTime || 0;
    if (Math.abs(cur - this.lastProgressSavedTime) >= 20) {
      this.saveProgressNow();
    }
  };
  _proto.saveProgressNow = function saveProgressNow(finalizado) {
    if (finalizado === void 0) {
      finalizado = false;
    }
    if (!this.vodItem || !this.video || !this.video.duration) return;
    var cur = this.video.currentTime || 0;
    var dur = this.video.duration || 0;
    this.lastProgressSavedTime = cur;
    try {
      var map = JSON.parse(localStorage.getItem("saimo_progress") || "{}");
      var k = this.chaveProgresso();
      var assistido = finalizado || dur > 0 && (cur / dur >= 0.95 || dur - cur < 20);
      if (assistido) {
        delete map[k];
      } else {
        map[k] = {
          currentTime: cur,
          duration: dur,
          watched: false,
          timestamp: Date.now(),
          season: this.currentEp ? this.currentEp.season : null,
          episode: this.currentEp ? this.currentEp.episode : null
        };
      }
      localStorage.setItem("saimo_progress", JSON.stringify(map));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_progress: " + ((e && e.message) || ""));
    }
  }

  // ── Tratamento de Teclas do Controle Remoto ───────────────────
;
  _proto.handleKey = function handleKey(e, code) {
    if (!this.active) return false;

    // Reset de inatividade para "Ainda assistindo"
    this.consecutiveEpisodes = 0;

    // 1. Modal Continuar Assistindo
    if (this.zone === "resume") {
      if (code === 13) {
        // OK
        var salvo = this.obterProgressoSalvo();
        this.fecharDialogoRetomada(true, salvo ? salvo.currentTime : 0);
        return true;
      }
      if (code === 37 || code === 39) {
        // Alterna botões
        var sim = this.dom.resumeBtnYes.classList.contains("is-focused");
        if (sim) {
          this.dom.resumeBtnYes.classList.remove("is-focused");
          this.dom.resumeBtnRestart.classList.add("is-focused");
        } else {
          this.dom.resumeBtnRestart.classList.remove("is-focused");
          this.dom.resumeBtnYes.classList.add("is-focused");
        }
        return true;
      }
      if (code === 461 || code === 27) {
        // Voltar
        this.fecharDialogoRetomada(false, 0);
        return true;
      }
      return true;
    }

    // 2. Modal Ainda Assistindo
    if (this.zone === "idlePrompt") {
      if (code === 13) {
        this.confirmarAindaAssistindo();
        return true;
      }
      return true;
    }

    // 3. Painel de Ajustes VOD
    if (this.zone === "settings") {
      this.navegarSettings(code);
      return true;
    }

    // 4. Cartão Próximo Episódio Ativo
    if (this.nextEpCountdownTimer) {
      if (code === 13) {
        // OK
        this.tocarProximoEpisodio();
        return true;
      }
      if (code === 461 || code === 27) {
        // Voltar
        this.limparCountdownProximoEp();
        return true;
      }
    }

    // 5. Botão Pular abertura (zona focável)
    if (this.zone === "skip") {
      if (code === 13) {
        this.base.skipIntro();
        this.esconderBotaoPular();
        this.zone = "controls";
        this.showOSD(3000);
        return true;
      }
      if (code === 38 || code === 40) {
        this.zone = "controls";
        if (this.dom.skipBtn) this.dom.skipBtn.classList.remove("is-focused");
        this.mostrarFaixaPlay();
        return true;
      }
    }

    // Teclas numéricas 0-9 removidas (use OK longo / barra de tempo)

    // 6. Esquerda / direita: navegam os botões. Rew/FF do controle ainda pulam.
    if (code === 412) {
      this.pularInstantaneo(-1);
      return true;
    }
    if (code === 417) {
      this.pularInstantaneo(1);
      return true;
    }
    if (code === 37) {
      this.navegarTransport(-1);
      return true;
    }
    if (code === 39) {
      this.navegarTransport(1);
      return true;
    }

    // 7. Cima / baixo só mostram ou escondem a faixa
    if (code === 40 || code === 38) {
      this.espiarControles();
      return true;
    }

    // 8. OK curto: mostra os botões; com botões visíveis, aciona o focado
    if (code === 13) {
      if (e && e.repeat) return true;
      if (this.isScrubbing) this.cancelarScrubbing();
      if (!this.transportAberto) {
        this.mostrarFaixaPlay();
        return true;
      }
      this.acionarTransport();
      return true;
    }

    // 9. Teclas Coloridas
    if (code === 404) {
      // Verde: Pular abertura ou +85s
      this.base.skipIntro();
      return true;
    }
    if (code === 403) {
      // Vermelho: Alterna Engine
      this.base.cycleEngine();
      return true;
    }

    // 10. Botão Voltar (Back)
    if (code === 461 || code === 27 || code === 10009 || code === 8) {
      if (this.zone === "settings") {
        this.fecharAjustes();
        return true;
      }
      if (this.isScrubbing) {
        this.cancelarScrubbing();
        return true;
      }
      if (this.isOSDVisible() || this.transportAberto) {
        this.hideOSD(true);
        return true;
      }
      this.fechar();
      return false;
    }
    return false;
  };
  _proto.showBuffering = function showBuffering(show, msg) {
    if (!this.dom.buffering) return;
    if (show) {
      if (this.dom.bufferingText) this.dom.bufferingText.textContent = msg || "Carregando...";
      this.dom.buffering.classList.remove("hidden");
      if (this.dom.container) this.dom.container.classList.remove("hidden");
    } else {
      this.dom.buffering.classList.add("hidden");
    }
  };
  _proto.showOSD = function showOSD(durationMs) {
    var _this5 = this;
    if (durationMs === void 0) {
      durationMs = 4000;
    }
    if (!this.dom.container) return;
    this.dom.container.classList.remove("hidden");
    this.dom.container.classList.remove("is-chrome-off");
    this.dom.container.classList.toggle("is-progress-only", !this.transportAberto);
    if (!this.video.paused && this.temPularDisponivel() && this.dom.skipBtn) {
      this.dom.skipBtn.classList.remove("hidden");
      this.skipVisivel = true;
    }
    if (this.osdTimer) clearTimeout(this.osdTimer);
    if (durationMs > 0 && !this.isScrubbing && !this.pausaUsuario && this.zone !== "settings" && this.zone !== "resume") {
      this.osdTimer = setTimeout(function () {
        return _this5.hideOSD();
      }, durationMs);
    }
  };
  _proto.hideOSD = function hideOSD(force) {
    if (!this.dom.container || this.isScrubbing) return;
    if (!force && this.pausaUsuario) return;
    if (!force && (this.zone === "settings" || this.zone === "resume" || this.zone === "idlePrompt")) return;
    this.dom.container.classList.remove("hidden");
    this.dom.container.classList.add("is-chrome-off");
    this.dom.container.classList.remove("is-progress-only");
    if (this.dom.seekbar) this.dom.seekbar.classList.remove("is-focused");
    if (this.zone === "skip") this.zone = "controls";
    this.transportAberto = false;
    this.tbFocus = "play";
    this.atualizarTransport();
    if (this.dom.skipBtn) {
      this.dom.skipBtn.classList.add("hidden");
      this.dom.skipBtn.classList.remove("is-focused");
    }
    this.skipVisivel = false;
  };
  _proto.isOSDVisible = function isOSDVisible() {
    return this.dom.container && !this.dom.container.classList.contains("hidden") && !this.dom.container.classList.contains("is-chrome-off");
  };
  _proto.formatTime = function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return "00:00";
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 60);
    if (h > 0) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  };
  _proto.formatPasso = function formatPasso(sec) {
    if (sec >= 60) return Math.floor(sec / 60) + "min";
    return sec + "s";
  };
  return SaimoVodPlayer;
}();
if (typeof window !== "undefined") {
  window.SaimoVodPlayer = SaimoVodPlayer;
}