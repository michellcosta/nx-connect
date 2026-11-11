"use strict";

/**
 * Saimo TV - Player Engine para LG webOS
 */
var SaimoPlayer = /*#__PURE__*/function () {
  function SaimoPlayer(videoElement, osdElements, callbacks) {
    if (callbacks === void 0) {
      callbacks = {};
    }
    this.video = videoElement;
    this.osd = osdElements;
    this.callbacks = callbacks;
    this.hls = null;
    this.mpegts = null;
    this.currentChannel = null;
    this.currentSourceIndex = 0;
    this.osdTimer = null;
    this.isPlaying = false;
    this.isLive = false;
    this.initialResumeTime = 0;
    this.skipMarks = [];
    this.creditsShown = false;
    this.lastSkipTipo = "";
    this.loadTimer = null;
    this.failedHosts = [];
    this._trocando = false;
    this._playGen = 0;
    this._fonteTocou = false;
    this._segurarFonte = false;
    this._reconectando = false;
    this._tentouNativo = false;
    this._tentouHls = false;
    this._tentouProxy = false;
    this._nativo = false;
    this._abrindo = false;
    this._lastProgressSec = -1;
    this._liveWatchdog = null;
    this.initVideoListeners();
  }
  var _proto = SaimoPlayer.prototype;
  _proto.initVideoListeners = function initVideoListeners() {
    var _this = this;
    this.video.addEventListener("waiting", function () {
      if (_this.vodAtivo()) return;
      if (_this.mpegts) return;
      _this.showLoading(true);
      if (_this.isLive && _this._fonteTocou) _this.armarEspera();
    });
    this.video.addEventListener("playing", function () {
      _this.limparEspera();
      _this.limparWatchdogAoVivo();
      _this._lastProgressSec = -1;
      _this._trocando = false;
      _this._reconectando = false;
      _this._fonteTocou = true;
      _this.showLoading(false);
      _this.isPlaying = true;
      _this.updateOSD();
      _this.showOSD(4000);
      if (_this.callbacks.onPlaying) _this.callbacks.onPlaying(_this.currentChannel, _this.currentSourceIndex);
      _this.armarWatchdogAoVivo();
      var hostOk = _this.hostDaFonte(_this.currentChannel.sources[_this.currentSourceIndex]);
      if (hostOk) _this.salvarEngineHost(hostOk, _this.mpegts ? "mpegts" : (_this._nativo ? "native" : "hls"));
      if (_this.isLive && _this._t0Fonte && window.SaimoFontesLive) {
        SaimoFontesLive.guardarLatencia(hostOk, Date.now() - _this._t0Fonte);
        _this._t0Fonte = 0;
      }
      if (window.SaimoDiagnostico) {
        var agora = Date.now();
        if (!_this._lastPlayOkLog || agora - _this._lastPlayOkLog > 8000) {
          _this._lastPlayOkLog = agora;
          SaimoDiagnostico.linha('play_ok · ' + (_this.mpegts ? 'mpegts' : (_this._nativo || !_this.precisaHls(_this.urlOriginal()) ? 'nativo' : 'hls.js')) + ' · ' + hostOk);
        }
      }
    });
    this.video.addEventListener("timeupdate", function () {
      if (!_this.isLive && _this.video.duration > 0) {
        _this.updateTimeDisplay();
        _this.updateSkipCue();
        if (window.SaimoLegendas) SaimoLegendas.atualizar(_this.video.currentTime);
        var t = Math.floor(_this.video.currentTime);
        if (_this.callbacks.onProgress && t % 5 === 0 && t !== _this._lastProgressSec) {
          _this._lastProgressSec = t;
          _this.callbacks.onProgress(_this.currentChannel, _this.video.currentTime, _this.video.duration);
        }
      }
    });
    this.video.addEventListener("pause", function () {
      _this.flushProgress();
    });
    this.video.addEventListener("ended", function () {
      if (_this.isLive && _this._fonteTocou) {
        _this.lidarFalha("Sinal caiu");
        return;
      }
      if (_this.callbacks.onEnded) _this.callbacks.onEnded(_this.currentChannel);
    });
    this.video.addEventListener("error", function () {
      var err = _this.video.error;
      var cod = err ? err.code : '?';
      var msg = err && err.message ? err.message : 'Erro de reprodução';
      if (window.SaimoDiagnostico) SaimoDiagnostico.linha('video.error code=' + cod + ' · ' + msg);
      if (_this._abrindo) return;
      _this.lidarFalha("Erro de reprodução");
    });
  };
  _proto.flushProgress = function flushProgress() {
    if (this.isLive || !this.video || !(this.video.duration > 0) || !this.callbacks.onProgress) return;
    this.callbacks.onProgress(this.currentChannel, this.video.currentTime, this.video.duration);
  };
  _proto.getHlsConfig = function getHlsConfig() {
    var live = !!this.isLive;
    var segura = live && this._fonteTocou;
    var isOldWebos = window.SaimoDiagnostico && SaimoDiagnostico.detectarWebOS().chromium <= 53;
    var cfg = {
      enableWorker: !(this.decoderDaTv() || isOldWebos),
      lowLatencyMode: false,
      backBufferLength: live ? 4 : 30,
      maxBufferLength: live ? 8 : (isOldWebos ? 15 : 30),
      maxMaxBufferLength: live ? 14 : (isOldWebos ? 25 : 60),
      maxBufferSize: (live ? 8 : (isOldWebos ? 16 : 32)) * 1024 * 1024,
      liveSyncDurationCount: live ? 2 : 3,
      liveMaxLatencyDurationCount: live ? 6 : 10,
      startLevel: live ? 0 : -1,
      testBandwidth: !live,
      startFragPrefetch: true,
      manifestLoadingTimeOut: segura ? 8000 : live ? 4500 : 6000,
      manifestLoadingMaxRetry: segura ? 4 : live ? 0 : 1,
      levelLoadingTimeOut: segura ? 8000 : live ? 4500 : 6000,
      levelLoadingMaxRetry: segura ? 4 : live ? 0 : 1,
      fragLoadingTimeOut: segura ? 8000 : live ? 4000 : 8000,
      fragLoadingMaxRetry: segura ? 4 : live ? 1 : 2
    };
    var perfilBuffer = window.SaimoAjustes && SaimoAjustes.get("bufferProfile") || "auto";
    if (perfilBuffer === "economico" || perfilBuffer === "auto" && window.SaimoDiagnostico && SaimoDiagnostico.detectarWebOS().chromium <= 53) {
      cfg.maxBufferLength = live ? 4 : 4;
      cfg.maxMaxBufferLength = live ? 6 : 8;
      cfg.maxBufferSize = (live ? 4 : 6) * 1024 * 1024;
    } else if (perfilBuffer === "alto") {
      cfg.maxBufferLength = live ? 15 : 20;
      cfg.maxMaxBufferLength = live ? 25 : 30;
      cfg.maxBufferSize = (live ? 16 : 24) * 1024 * 1024;
    }
    if (this.ehXtream && this.ehXtream()) {
      cfg.manifestLoadingTimeOut = 20000;
      cfg.manifestLoadingMaxRetry = 2;
      cfg.levelLoadingTimeOut = 20000;
      cfg.levelLoadingMaxRetry = 2;
      cfg.fragLoadingTimeOut = 20000;
      cfg.fragLoadingMaxRetry = 3;
      cfg.keyLoadingTimeOut = 20000;
      cfg.keyLoadingMaxRetry = 4;
    }
    if (live) {
      var modo = window.SaimoAjustes && SaimoAjustes.get("zeroDelay") || "off";
      if (modo === "equilibrado") {
        cfg.liveSyncDurationCount = 2.8;
        cfg.liveMaxLatencyDurationCount = 5.5;
        cfg.maxLiveSyncPlaybackRate = 1.03;
        cfg.liveSyncOnStallIncrease = 1.5;
      } else if (modo === "agressivo") {
        cfg.liveSyncDurationCount = 1.5;
        cfg.liveMaxLatencyDurationCount = 3;
        cfg.maxLiveSyncPlaybackRate = 1.15;
        cfg.maxBufferLength = 6;
        cfg.maxMaxBufferLength = 10;
      }
    }
    return cfg;
  };
  _proto.urlOriginal = function urlOriginal() {
    var s = this.currentChannel && this.currentChannel.sources && this.currentChannel.sources[this.currentSourceIndex];
    return s && s.url ? s.url : "";
  };
  _proto.ehXtream = function ehXtream() {
    var ch = this.currentChannel;
    if (!ch) return false;
    if (ch.xtream) return true;
    var s = ch.sources && ch.sources[this.currentSourceIndex];
    return !!(s && s.origemNome === "Xtream");
  };
  _proto.precisaHls = function precisaHls(url) {
    if (!window.Hls || !window.Hls.isSupported()) return false;
    var orig = String(this.urlOriginal() || url || "").toLowerCase();
    var u = String(url || orig).toLowerCase();
    var teste = orig + " " + u;
    if (!teste.trim()) return false;
    if (/\.(mp4|mkv|avi|webm)(\?|$)/.test(orig) || /\.(mp4|mkv|avi|webm)(\?|$)/.test(u)) return false;
    if (this.ehHls(orig) || this.ehHls(u)) return true;
    if (this.ehStreamTs(orig) || this.ehStreamTs(u)) return false;
    if (!this.decoderDaTv() && this.isLive && /\/play\//.test(teste) && teste.indexOf("/movie/") === -1) return true;
    if (this.isLive) return false;
    return u.indexOf("/hls/") !== -1 || orig.indexOf("/hls/") !== -1;
  }

  /** Playlist HLS, inclusive /play/TOKEN/m3u8 (sem ponto) e o .txt do s25. */;
  _proto.ehHls = function ehHls(url) {
    var u = String(url || "").split("?")[0].toLowerCase();
    return u.indexOf(".m3u8") !== -1 || /\/m3u8$/i.test(u) || u.slice(-4) === ".txt" || u.indexOf("dadinhodetapioca.fun") !== -1;
  }

  /** LG/webOS: o decodificador toca HTTP, TS e MP4 sem CORS. No PC isso não existe. */;
  _proto.temMpegTs = function temMpegTs() {
    try {
      return !!(window.mpegts && mpegts.isSupported && mpegts.isSupported());
    } catch (e) {
      return false;
    }
  };
  _proto.ehStreamTs = function ehStreamTs(url) {
    var u = String(url || "").split("?")[0].toLowerCase();
    if (!u || this.ehHls(u)) return false;
    if (/\.(mp4|mkv|avi|webm)$/.test(u)) return false;
    if (/\.ts$/.test(u) || /\/ts$/.test(u) || /%2ets/i.test(u)) return true;
    if (/\/play\//.test(u) && /\/ts(\/|$)/.test(u)) return true;
    if (/\/live\//.test(u) && u.indexOf(".m3u8") === -1 && u.indexOf("/m3u8") === -1) return true;
    return false;
  };
  _proto.precisaMpegTs = function precisaMpegTs(url) {
    if (!this.isLive) return false;
    if (this.decoderDaTv()) return false;
    var u = String(url || this.urlOriginal() || "");
    if (!u || this.ehHls(u) || /\.(mp4|mkv|avi|webm)(\?|$)/i.test(u)) return false;
    return this.ehStreamTs(u);
  };
  _proto.decoderDaTv = function decoderDaTv() {
    try {
      var ua = navigator.userAgent || "";
      if (/Web0S|webOS|NetCast/i.test(ua) || window.webOS || window.PalmSystem) return true;
      if (/Tizen/i.test(ua) || window.tizen) return true;
      return false;
    } catch (e) {
      return false;
    }
  };
  _proto.hostDaFonte = function hostDaFonte(src) {
    if (!src || !src.url) return "";
    if (window.SaimoFontesLive) return SaimoFontesLive.hostDe(src.url);
    try {
      return new URL(src.url).hostname.toLowerCase();
    } catch (e) {
      return "";
    }
  };
  _proto.limparEspera = function limparEspera() {
    if (this.loadTimer) {
      clearTimeout(this.loadTimer);
      this.loadTimer = null;
    }
  };
  _proto.armarEspera = function armarEspera() {
    var _this2 = this;
    if (this.loadTimer) return;
    var gen = this._playGen;
    var segura = this.isLive && this._fonteTocou;
    var ms = segura ? 30000 : this.ehXtream() ? (this.isLive ? 20000 : 45000) : this.isLive ? 4500 : 12000;
    this.loadTimer = setTimeout(function () {
      _this2.loadTimer = null;
      if (_this2._playGen !== gen) return;
      if (segura) _this2.lidarFalha("Sinal oscilou");else _this2.tryNextSource("Demorou demais");
    }, ms);
  };
  _proto.fonteRuim = function fonteRuim(src) {
    if (!src || !src.url) return true;
    if (src.origemNome === "Xtream" || this.ehXtream()) return false;
    if (window.SaimoFontesLive && SaimoFontesLive.morto(src)) return true;
    return false;
  };
  _proto.proximoIndice = function proximoIndice(from) {
    var fontes = this.currentChannel && this.currentChannel.sources || [];
    var xtream = this.ehXtream();
    for (var i = from; i < fontes.length; i++) {
      if (this.fonteRuim(fontes[i])) continue;
      if (xtream) return i;
      var h = this.hostDaFonte(fontes[i]);
      if (!h || this.failedHosts.indexOf(h) === -1) return i;
    }
    return -1;
  };
  _proto.indiceFonteTs = function indiceFonteTs(channel) {
    var fontes = channel && channel.sources || [];
    for (var i = 0; i < fontes.length; i++) {
      if (this.fonteRuim(fontes[i])) continue;
      if (this.ehStreamTs(fontes[i] && fontes[i].url)) return i;
    }
    return -1;
  };
  _proto.playChannel = function playChannel(channel, sourceIndex, resumeTime, viaProxy, nativo) {
    var _this3 = this;
    if (sourceIndex === void 0) {
      sourceIndex = 0;
    }
    if (resumeTime === void 0) {
      resumeTime = 0;
    }
    if (viaProxy === void 0) {
      viaProxy = false;
    }
    if (nativo === void 0) {
      nativo = false;
    }
    this._playGen += 1;
    var gen = this._playGen;
    this._trocando = false;
    var mesmaFonte = this._segurarFonte && this.currentChannel === channel;
    this._segurarFonte = false;
    if (!mesmaFonte) this._fonteTocou = false;
    if (this.currentChannel !== channel) this.failedHosts = [];
    if (this.currentChannel !== channel) this._stallRecuperacoes = 0;
    var canalAnterior = this.currentChannel;
    var idxAnterior = this.currentSourceIndex;
    this.currentChannel = channel;
    this.isLive = !!channel.isLive;
    this.initialResumeTime = resumeTime;
    this.creditsShown = false;
    this.lastSkipTipo = "";
    this.skipMarks = channel.skipMarks || [];
    if (window.SaimoLegendas) SaimoLegendas.mostrar("");
    var idx = sourceIndex;
    if (this.decoderDaTv() && this.isLive && !viaProxy && !nativo && canalAnterior !== channel && sourceIndex === 0) {
      var tsIdx = this.indiceFonteTs(channel);
      if (tsIdx >= 0) idx = tsIdx;
    }
    if (this.fonteRuim(channel.sources[idx])) {
      var n = this.proximoIndice(idx);
      idx = n >= 0 ? n : idx;
    }
    var mesmaTentativa = canalAnterior === channel && idxAnterior === idx;
    if (!mesmaTentativa && !viaProxy && !nativo) {
      this._tentouNativo = false;
      this._tentouHls = false;
      this._tentouProxy = false;
    }
    this.currentSourceIndex = idx;
    if (this.isLive && !mesmaFonte) this._t0Fonte = Date.now();
    var source = channel.sources[idx];
    if (!source || !source.url) {
      this.showStatus("Nenhuma fonte disponível.");
      return;
    }

    // 1ª fonte /play/ no PC = HLS. mpegts só na fonte TS (/ts ou /live/*.ts).
    if (this.isLive && this.ehStreamTs(source.url) && !this.ehHls(source.url)) {
      if (this.decoderDaTv()) {
        nativo = true;
        viaProxy = false;
      } else {
        nativo = false;
        if (!viaProxy) viaProxy = true;
      }
    } else if (!viaProxy && !nativo && !this._tentouNativo && this.decoderDaTv() && this.ehHls(source.url)) {
      var prefHls = this.engineParaHost(this.hostDaFonte(source));
      if (prefHls === "hls") {
        nativo = false;
        this._tentouNativo = true;
      } else {
        nativo = true;
      }
    } else if (!this.isLive && this.ehXtream() && !viaProxy && !nativo && !this.decoderDaTv() && window.SaimoAPI && SaimoAPI.precisaProxy(source)) {
      viaProxy = true;
    }
    if (!this.decoderDaTv() && this.isLive && this.ehXtream() && !viaProxy) viaProxy = true;
    this._viaProxy = !!viaProxy;
    this._nativo = !!nativo;
    if (nativo) this._tentouNativo = true;
    if (viaProxy) this._tentouProxy = true;
    if (!nativo && !viaProxy) this._tentouHls = true;
    this.showLoading(true);
    this.showStatus(mesmaFonte ? "Reconectando…" : nativo ? "Fonte " + (idx + 1) + " · TS…" : viaProxy ? "Fonte " + (sourceIndex + 1) + " · via proxy…" : channel.isLive ? "Abrindo canal…" : "Carregando…");
    this.updateOSD();
    this.showOSD(4000);
    this.limparEspera();
    this.armarEspera();
    if (this.callbacks.onPlayStart) this.callbacks.onPlayStart(channel, idx);
    this.hideSkip();
    if (this.osd.nextEpCard) this.osd.nextEpCard.classList.add("hidden");
    var streamUrl = viaProxy && window.SaimoAPI && SaimoAPI.proxyUrl ? SaimoAPI.proxyUrl(source) : source.url;
    if (!nativo && this.precisaMpegTs(source.url) && !this.temMpegTs()) {
      var _thisTs = this;
      SaimoPlayer.carregarMpegTs(function (ok) {
        if (_thisTs._playGen !== gen) return;
        if (!ok) {
          _thisTs.lidarFalha("Falta o motor TS no PC");
          return;
        }
        _thisTs.playChannel(channel, sourceIndex, resumeTime, viaProxy, nativo);
      });
      return;
    }
    var usarMpegTs = !nativo && this.precisaMpegTs(source.url) && this.temMpegTs();
    var usarNativo = !!nativo || (!usarMpegTs && !this.precisaHls(source.url) && !this.precisaHls(streamUrl));
    var motor = usarMpegTs ? 'mpegts' : (usarNativo ? 'nativo' : 'hls.js');
    if (motor === 'hls.js') this._tentouHls = true;
    if (window.SaimoDiagnostico) {
      var D = SaimoDiagnostico;
      D.linha(
        (channel.isLive ? 'AO VIVO' : 'VOD') +
        (this.ehXtream() ? ' · xtream' : '') +
        ' · fonte ' + (idx + 1) + '/' + (channel.sources || []).length +
        ' · ' + motor +
        (viaProxy ? ' · proxy' : ' · direto') +
        ' · ' + (source.quality || '')
      );
      D.linha('url ' + D.maskUrl(source.url));
      if (viaProxy) {
        var ph = '?';
        try { ph = new URL(streamUrl, location.href).host; } catch (e0) {}
        D.linha('proxy via ' + ph + ' · ' + D.maskUrl(streamUrl));
      }
      if (!this.isLive) {
        D.sondar(streamUrl, function (tipo) {
          if (_this3._playGen !== gen) return;
          if (!tipo) return;
          if (/HTML|JSON erro|não é vídeo/i.test(tipo)) {
            _this3.lidarFalha('Servidor devolveu página, não vídeo');
          }
        });
      }
    }
    if (usarNativo) this._tentouNativo = true;
    this._abrindo = true;
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.mpegts) {
      try { this.mpegts.pause(); this.mpegts.unload(); this.mpegts.detachMediaElement(); this.mpegts.destroy(); } catch (eM) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("player_cleanup_erro", "mpegts: " + ((eM && eM.message) || ""));
      }
      this.mpegts = null;
    }
    var onMediaReady = function onMediaReady() {
      if (_this3._playGen !== gen) return;
      if (_this3.initialResumeTime > 0) {
        try {
          _this3.video.currentTime = _this3.initialResumeTime;
          _this3.showStatus("Continuando de " + _this3.formatTime(_this3.initialResumeTime) + "...");
        } catch (e) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("player_retomar_erro", (e && e.message) || "");
        }
        _this3.initialResumeTime = 0;
      }
      _this3.video.play().catch(function () {});
    };
    if (usarMpegTs) {
      this._abrindo = false;
      try {
        this.mpegts = mpegts.createPlayer({
          type: 'mpegts',
          isLive: !!this.isLive,
          url: streamUrl,
          cors: true,
          withCredentials: false
        }, {
          enableWorker: false,
          enableStashBuffer: true,
          stashInitialSize: 1024,
          lazyLoad: false,
          autoCleanupSourceBuffer: true,
          autoCleanupMaxBackwardDuration: 12,
          autoCleanupMinBackwardDuration: 4,
          liveBufferLatencyChasing: false,
          fixAudioTimestampGap: true
        });
        this.mpegts.attachMediaElement(this.video);
        this.mpegts.load();
        this.mpegts.on(mpegts.Events.ERROR, function (tipo, det) {
          if (_this3._playGen !== gen) return;
          if (window.SaimoDiagnostico) SaimoDiagnostico.linha('mpegts ERROR · ' + tipo + ' · ' + det);
          _this3.lidarFalha('Falha no MPEG-TS');
        });
        Promise.resolve(this.mpegts.play()).catch(function () {});
        onMediaReady();
      } catch (eTs) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.linha('mpegts throw · ' + (eTs && eTs.message));
        this.lidarFalha('Falha no MPEG-TS');
      }
    } else if (!usarNativo) {
      this._abrindo = false;
      var cfgHls = this.getHlsConfig();
      if (!this.decoderDaTv() && window.SaimoAPI && SaimoAPI.proxyUrl) {
        var origemPlay = source && source.url || "";
        var encaminharHls = function (xhr, u) {
          if (!u || u.indexOf("/api/proxy") !== -1) return;
          var alvo = u;
          try {
            var parsed = new URL(u, location.href);
            var local = parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost";
            if (local) {
              if (parsed.pathname.indexOf("/api/proxy") === 0) return;
              if (origemPlay) {
                var orig = new URL(origemPlay);
                alvo = orig.protocol + "//" + orig.host + parsed.pathname + parsed.search;
              }
            } else {
              alvo = parsed.href;
            }
          } catch (e1) {}
          if (alvo.indexOf("http://") === 0 || alvo.indexOf("https://") === 0) {
            try {
              xhr.open("GET", SaimoAPI.proxyUrl({
                url: alvo,
                referer: (source && source.referer) || ""
              }), true);
            } catch (e2) {}
          }
        };
        cfgHls.xhrSetup = encaminharHls;
        cfgHls.licenseXhrSetup = encaminharHls;
      }
      this.hls = new Hls(cfgHls);
      this.hls.loadSource(streamUrl);
      this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, onMediaReady);
      this.hls.on(Hls.Events.FRAG_BUFFERED, function () {
        if (_this3._playGen !== gen) return;
        _this3.limparEspera();
        _this3.showLoading(false);
      });
      this.hls.on(Hls.Events.ERROR, function (event, data) {
        if (_this3._playGen !== gen) return;
        if (window.SaimoDiagnostico && data) {
          SaimoDiagnostico.linha('hls ' + (data.fatal ? 'FATAL' : 'warn') + ' · ' + data.type + ' · ' + (data.details || ''));
        }
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          if (_this3._fonteTocou && _this3.hls) {
            try {
              _this3.hls.startLoad();
              return;
            } catch (e) {}
          }
          _this3.lidarFalha("Falha na rede");
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          try {
            _this3.hls.recoverMediaError();
          } catch (e) {
            _this3.lidarFalha("Codec de mídia incompatível");
          }
        } else _this3.lidarFalha("Erro de transmissão");
      });
    } else {
      this.video.removeAttribute("src");
      this.video.src = streamUrl;
      this.video.addEventListener("loadedmetadata", function () {
        _this3._abrindo = false;
        if (window.SaimoDiagnostico) {
          SaimoDiagnostico.linha('metadata · duration=' + (_this3.video.duration || 0).toFixed(0) + 's · type=' + (_this3.video.videoWidth || 0) + 'x' + (_this3.video.videoHeight || 0));
        }
        onMediaReady();
      }, {
        once: true
      });
      this.video.load();
      this.video.play().catch(function () {});
      setTimeout(function () {
        if (_this3._playGen === gen) _this3._abrindo = false;
      }, 400);
    }
  };
  _proto.lidarFalha = function lidarFalha(reason) {
    if (this.isLive && this._fonteTocou) {
      this.reconectarMesma(reason);
      return;
    }
    this.tryNextSource(reason);
  };
  _proto.reconectarMesma = function reconectarMesma(reason) {
    var _this4 = this;
    if (!this.currentChannel || this._reconectando) return;
    this._reconectando = true;
    this.limparEspera();
    this.showLoading(true);
    this.showStatus("Sinal oscilou, reconectando…");
    if (this.isOSDVisible()) this.showOSD(4000);else this.mostrarAviso("Sinal oscilou, reconectando…");
    var ch = this.currentChannel;
    var idx = this.currentSourceIndex;
    var gen = this._playGen;
    setTimeout(function () {
      if (_this4._playGen !== gen) return;
      _this4._reconectando = false;
      _this4._segurarFonte = true;
      _this4.playChannel(ch, idx, _this4.isLive ? 0 : _this4.video.currentTime || 0, _this4._viaProxy, _this4._nativo);
    }, 800);
  };
  _proto.tryNextSource = function tryNextSource(reason) {
    if (window.SaimoDiagnostico) SaimoDiagnostico.linha('falhou: ' + (reason || '?') + ' · próxima fonte…');
    if (!this.currentChannel || this._trocando) return;
    this._trocando = true;
    this.limparEspera();
    var atual = this.currentChannel.sources[this.currentSourceIndex];

    if (!this.isLive && !this._tentouHls && !this._viaProxy && window.Hls && Hls.isSupported() && this.precisaHls(atual && atual.url)) {
      this._trocando = false;
      this.showStatus("Fonte " + (this.currentSourceIndex + 1) + " · hls…");
      this.playChannel(this.currentChannel, this.currentSourceIndex, this.isLive ? 0 : this.video.currentTime || 0, false, false);
      return;
    }

    // Ao vivo fica em TS. HLS só no VOD.
    var nextIndex = this.proximoIndice(this.currentSourceIndex + 1);
    if (this.ehXtream() && nextIndex >= 0) {
      this._trocando = false;
      this.showStatus("Fonte " + (nextIndex + 1) + "…");
      this.playChannel(this.currentChannel, nextIndex, this.isLive ? 0 : this.video.currentTime || 0);
      return;
    }
    // O proxy manda o Referer que o decodificador da TV não consegue enviar.
    if (!this.decoderDaTv() && !this._tentouProxy && this.isLive && window.SaimoAPI && SaimoAPI.proxyUrl) {
      this._trocando = false;
      this.showStatus("Fonte " + (this.currentSourceIndex + 1) + " · via proxy…");
      this.playChannel(this.currentChannel, this.currentSourceIndex, this.isLive ? 0 : this.video.currentTime || 0, true);
      return;
    }
    var liveTsTv = this.decoderDaTv() && this.isLive && atual && (this.ehStreamTs(atual.url) || this.ehXtream()) && !this.ehHls(atual.url);
    if (!liveTsTv && !this._tentouProxy && window.SaimoAPI && SaimoAPI.precisaProxy(atual)) {
      this._trocando = false;
      this.showStatus("Fonte " + (this.currentSourceIndex + 1) + " · via proxy…");
      this.playChannel(this.currentChannel, this.currentSourceIndex, this.isLive ? 0 : this.video.currentTime || 0, true);
      return;
    }
    var host = this.hostDaFonte(atual);
    if (host && !this.ehXtream() && this.failedHosts.indexOf(host) === -1) this.failedHosts.push(host);
    if (this.callbacks.onSourceFail) this.callbacks.onSourceFail(this.currentChannel, this.currentSourceIndex, reason);
    if (nextIndex >= 0) {
      this.showStatus("Fonte " + (nextIndex + 1) + "…");
      this._trocando = false;
      this.playChannel(this.currentChannel, nextIndex, this.isLive ? 0 : this.video.currentTime || 0);
    } else {
      this._trocando = false;
      this.showLoading(false);
      this.showStatus("Todas as fontes falharam no momento.");
      if (window.SaimoDiagnostico) SaimoDiagnostico.linha('FIM · todas as fontes falharam');
      this.showOSD(6000);
      if (this.callbacks.onChannelDown) this.callbacks.onChannelDown(this.currentChannel);
    }
  };
  _proto.nextSource = function nextSource() {
    if (!this.currentChannel || this.currentChannel.sources.length <= 1) return;
    var nextIndex = (this.currentSourceIndex + 1) % this.currentChannel.sources.length;
    this.playChannel(this.currentChannel, nextIndex, this.video.currentTime || 0);
  };
  _proto.previousSource = function previousSource() {
    if (!this.currentChannel || this.currentChannel.sources.length <= 1) return;
    var prevIndex = this.currentSourceIndex - 1;
    if (prevIndex < 0) prevIndex = this.currentChannel.sources.length - 1;
    this.playChannel(this.currentChannel, prevIndex, this.video.currentTime || 0);
  };
  _proto.playSourceIndex = function playSourceIndex(index) {
    if (!this.currentChannel || !this.currentChannel.sources[index]) return;
    this.playChannel(this.currentChannel, index, this.video.currentTime || 0);
  };
  _proto.togglePlayPause = function togglePlayPause() {
    if (this.isLive) {
      this.showStatus("Ao vivo não pausa");
      this.showOSD(2000);
      return;
    }
    if (this.video.paused) {
      this.video.play();
      this.showStatus("Reproduzindo");
    } else {
      this.video.pause();
      this.showStatus("Pausado");
    }
    this.showOSD(3000);
  };
  _proto.seek = function seek(seconds) {
    if (this.isLive || !this.video.duration) return;
    var newTime = Math.max(0, Math.min(this.video.currentTime + seconds, this.video.duration - 2));
    this.video.currentTime = newTime;
    this.showStatus((seconds > 0 ? "+" : "") + seconds + "s (" + this.formatTime(newTime) + ")");
    this.showOSD(3000);
  };
  _proto.skipIntro = function skipIntro() {
    var _this5 = this;
    if (this.isLive || !this.video.duration) return;
    var pos = this.video.currentTime;
    var trecho = this.skipMarks.find(function (t) {
      return t.tipo !== "creditos" && pos >= t.inicio && pos < (t.fim != null ? t.fim : _this5.video.duration) - 1;
    });
    if (trecho && trecho.fim != null) {
      this.video.currentTime = Math.min(trecho.fim, this.video.duration - 2);
      this.showStatus("Pulou " + this.rotuloSkip(trecho.tipo));
    } else {
      var newTime = Math.min(this.video.currentTime + 85, this.video.duration - 5);
      this.video.currentTime = newTime;
      this.showStatus("Avançou abertura (+85s)");
    }
    this.hideSkip();
    this.showOSD(3000);
  };
  _proto.rotuloSkip = function rotuloSkip(tipo) {
    if (tipo === "abertura") return "abertura";
    if (tipo === "recapitulacao") return "recapitulação";
    if (tipo === "previa") return "prévia";
    return "trecho";
  };
  _proto.vodAtivo = function vodAtivo() {
    return !!(window.saimoVodPlayer && window.saimoVodPlayer.active && !this.isLive);
  };
  _proto.updateSkipCue = function updateSkipCue() {
    if (this.vodAtivo()) return;
    var pos = this.video.currentTime;
    var dur = this.video.duration;
    var trecho = this.skipMarks.find(function (t) {
      return t.tipo !== "creditos" && pos >= t.inicio && pos < (t.fim != null ? t.fim : dur) - 1;
    });
    if (trecho) {
      if (this.lastSkipTipo !== trecho.tipo) {
        this.lastSkipTipo = trecho.tipo;
        this.showSkip("Pular " + this.rotuloSkip(trecho.tipo));
        if (window.SaimoAjustes && SaimoAjustes.get("autoSkip") && trecho.fim != null) {
          this.skipIntro();
        }
      }
    } else {
      this.lastSkipTipo = "";
      this.hideSkip();
    }
    var creditos = this.skipMarks.find(function (t) {
      return t.tipo === "creditos";
    });
    if (creditos && !this.creditsShown && pos >= creditos.inicio) {
      this.creditsShown = true;
      if (this.callbacks.onCredits) this.callbacks.onCredits();
      if (window.SaimoAjustes && SaimoAjustes.get("autoNext") && this.callbacks.onAutoNext) {
        this.callbacks.onAutoNext();
      }
    }
  };
  _proto.showSkip = function showSkip(label) {
    if (this.vodAtivo()) return;
    if (!this.osd.skipBtn) return;
    this.osd.skipBtn.textContent = label;
    this.osd.skipBtn.classList.remove("hidden");
    if (this.osd.skipHint) this.osd.skipHint.textContent = "[Verde] " + label;
  };
  _proto.hideSkip = function hideSkip() {
    if (this.osd.skipBtn) this.osd.skipBtn.classList.add("hidden");
  };
  _proto.cycleQuality = function cycleQuality() {
    if (!this.hls || !this.hls.levels || this.hls.levels.length <= 1) {
      this.showStatus("Qualidade única fornecida");
      this.showOSD(3000);
      return;
    }
    var current = this.hls.currentLevel;
    var next = current === -1 ? 0 : current + 1 >= this.hls.levels.length ? -1 : current + 1;
    this.hls.currentLevel = next;
    var label = next === -1 ? "Automática" : (this.hls.levels[next].height || 720) + "p";
    this.showStatus("Qualidade: " + label);
    if (this.osd.quality) this.osd.quality.textContent = label;
    this.showOSD(3000);
  };
  _proto.stop = function stop() {
    this._playGen += 1;
    this.limparEspera();
    this._trocando = false;
    this._fonteTocou = false;
    this._segurarFonte = false;
    this._reconectando = false;
    this.failedHosts = [];
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    this.video.pause();
    this.video.removeAttribute("src");
    try {
      var loadP = this.video.load();
      if (loadP && typeof loadP.catch === 'function') loadP.catch(function () {});
    } catch (eLoad) {}
    this.currentChannel = null;
    this.skipMarks = [];
    this.hideSkip();
    if (window.SaimoLegendas) SaimoLegendas.desligar();
    if (this.osd.nextEpCard) this.osd.nextEpCard.classList.add("hidden");
    this.showLoading(false);
  };
  _proto.mostrarAviso = function mostrarAviso(txt) {
    try {
      if (!this._avisoEl || !this._avisoEl.parentNode) {
        this._avisoEl = document.createElement("div");
        this._avisoEl.style.cssText = "position:fixed;right:16px;bottom:14px;z-index:9999;background:rgba(8,12,24,0.9);color:#cfd8ff;font:14px/1.4 sans-serif;padding:8px 12px;border-radius:8px;border:1px solid #2a3a6e;pointer-events:none;";
        (document.body || document.documentElement).appendChild(this._avisoEl);
      }
      this._avisoEl.textContent = txt;
      this._avisoEl.style.display = "block";
      var el = this._avisoEl;
      clearTimeout(this._avisoTimer);
      this._avisoTimer = setTimeout(function () {
        el.style.display = "none";
      }, 5000);
    } catch (eAv) {}
  };
  _proto.showOSD = function showOSD(durationMs) {
    var _this6 = this;
    if (this.vodAtivo()) return;
    if (durationMs == null) durationMs = 4000;
    if (!this.osd.container) return;
    this.osd.container.classList.remove("hidden");
    /* Dicas de teclas: só na primeira exibição do boot — depois a tela
       fica limpa (o rodapé voltava a cada troca e poluía o vídeo). */
    if (this.osd.shortcuts) {
      var primeira = false;
      try {
        primeira = sessionStorage.getItem("saimo_dicas_vistas") !== "1";
      } catch (eD) {
        primeira = true;
      }
      this.osd.shortcuts.style.display = primeira ? "" : "none";
      if (primeira && durationMs >= 3000) {
        try { sessionStorage.setItem("saimo_dicas_vistas", "1"); } catch (eD2) {}
      }
    }
    if (this.osdTimer) clearTimeout(this.osdTimer);
    if (durationMs > 0) {
      this.osdTimer = setTimeout(function () {
        _this6.osd.container.classList.add("hidden");
      }, durationMs);
    }
  };
  _proto.isOSDVisible = function isOSDVisible() {
    return this.osd.container && !this.osd.container.classList.contains("hidden");
  };
  _proto.updateOSD = function updateOSD() {
    var _this7 = this;
    if (!this.currentChannel) return;
    var ch = this.currentChannel;
    var src = ch.sources[this.currentSourceIndex];
    if (this.osd.title) this.osd.title.textContent = ch.name;
    if (this.osd.category) this.osd.category.textContent = ch.category;
    if (this.osd.logo) {
      if (ch.logo) {
        this.osd.logo.src = ch.logo;
        this.osd.logo.style.display = "block";
      } else {
        this.osd.logo.style.display = "none";
      }
    }
    if (this.osd.quality) this.osd.quality.textContent = src ? src.quality || "HD" : "HD";
    if (this.osd.origem) {
      var oChip = window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.origemFonte(src, ch) : "saimo";
      var oTxt = window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.rotuloFonte(src, ch) : "";
      this.osd.origem.textContent = oTxt;
      this.osd.origem.className = "osd-badge osd-origem-chip origem-" + oChip;
      this.osd.origem.style.display = this.isLive && oTxt ? "block" : "none";
    }
    if (this.osd.source) {
      /* Fonte N de M: só enquanto o canal abre — depois o app troca sozinho. */
      this.osd.source.style.display = this.isPlaying ? "none" : "";
      var rotFonte = this.isLive && window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.rotuloFonte(src, ch) + " · " : "";
      this.osd.source.textContent = rotFonte + "Fonte " + (this.currentSourceIndex + 1) + " de " + ch.sources.length;
    }
    var barraEpg = this.osd.progressWrap && this.osd.progressWrap.querySelector(".osd-progress-bg");
    if (!this.isLive) {
      if (this.osd.progressWrap) this.osd.progressWrap.style.display = "block";
      if (barraEpg) {
        barraEpg.classList.remove("vazia");
        delete barraEpg.dataset.start;
        delete barraEpg.dataset.stop;
      }
      if (this.osd.program) this.osd.program.textContent = "";
      if (this.osd.desc) this.osd.desc.textContent = "";
      return;
    }
    if (this.osd.progressWrap) this.osd.progressWrap.style.display = "none";
    if (this.osd.timeDisplay) this.osd.timeDisplay.style.display = "none";
    if (!window.SaimoEpg) return;
    SaimoEpg.programas(ch).then(function (list) {
      if (_this7.currentChannel !== ch) return;
      var nn = SaimoEpg.nowNext(list);
      var cur = nn && nn.current;
      if (_this7.osd.program) _this7.osd.program.textContent = cur ? cur.title : "";
      if (_this7.osd.desc) _this7.osd.desc.textContent = cur && cur.desc ? cur.desc : "";
      if (cur) {
        SaimoEpg.completar(cur).then(function (p) {
          if (_this7.currentChannel !== ch) return;
          if (_this7.osd.desc && p && p.desc) _this7.osd.desc.textContent = p.desc;
        });
      }
      if (_this7.osd.category && cur) {
        var hora = SaimoEpg.hhmm(cur.start) + " – " + SaimoEpg.hhmm(cur.stop);
        _this7.osd.category.textContent = hora + (nn.next ? "  ·  A seguir: " + nn.next.title : "");
      }
      var temBarra = !!(cur && cur.stop > cur.start);
      if (_this7.osd.progressWrap) _this7.osd.progressWrap.style.display = temBarra ? "block" : "none";
      if (barraEpg) {
        if (temBarra) {
          barraEpg.classList.remove("vazia");
          barraEpg.dataset.start = String(cur.start);
          barraEpg.dataset.stop = String(cur.stop);
          var fill = _this7.osd.progressFill || barraEpg.querySelector(".prog-canal-fill");
          var p = Math.min(1, Math.max(0, (Date.now() - cur.start) / (cur.stop - cur.start)));
          if (fill) fill.style.width = p * 100 + "%";
        } else {
          barraEpg.classList.add("vazia");
          delete barraEpg.dataset.start;
          delete barraEpg.dataset.stop;
        }
      }
      if (_this7.osd.timeDisplay) {
        if (temBarra) {
          _this7.osd.timeDisplay.style.display = "block";
          _this7.osd.timeDisplay.textContent = SaimoEpg.hhmm(cur.start) + " – " + SaimoEpg.hhmm(cur.stop);
        } else {
          _this7.osd.timeDisplay.style.display = "none";
        }
      }
    });
  };
  _proto.updateTimeDisplay = function updateTimeDisplay() {
    var cur = this.video.currentTime;
    var dur = this.video.duration;
    if (this.osd.timeDisplay) {
      this.osd.timeDisplay.textContent = this.formatTime(cur) + " / " + this.formatTime(dur);
    }
    if (this.osd.progressFill && dur > 0) {
      this.osd.progressFill.style.width = Math.min(100, cur / dur * 100) + "%";
    }
  };
  _proto.formatTime = function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return "00:00";
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 60);
    if (h > 0) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  };
  _proto.showStatus = function showStatus(msg) {
    if (this.osd.status) this.osd.status.textContent = msg;
  };
  _proto.showLoading = function showLoading(show) {
    if (!this.osd.loading) return;
    if (this.vodAtivo()) {
      this.osd.loading.classList.remove("active");
      return;
    }
    if (show) this.osd.loading.classList.add("active");else this.osd.loading.classList.remove("active");
  };
  _proto.chaveEngine = function chaveEngine(host) {
    return String(host || "") + (this.isLive ? "|live" : "|vod");
  };
  _proto.engineParaHost = function engineParaHost(host) {
    if (!host) return null;
    try {
      var m = JSON.parse(localStorage.getItem("saimo_engine_pref") || "{}");
      return m[this.chaveEngine(host)] || null;
    } catch (e) {
      return null;
    }
  };
  _proto.salvarEngineHost = function salvarEngineHost(host, engine) {
    if (!host || !engine) return;
    try {
      var m = JSON.parse(localStorage.getItem("saimo_engine_pref") || "{}");
      m[this.chaveEngine(host)] = engine;
      localStorage.setItem("saimo_engine_pref", JSON.stringify(m));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_engine_pref: " + ((e && e.message) || ""));
    }
  };
  _proto.armarWatchdogAoVivo = function armarWatchdogAoVivo() {
    var _this8 = this;
    this.limparWatchdogAoVivo();
    if (!this.isLive) return;
    var lastTime = this.video.currentTime;
    var stallCount = 0;
    this._stallEstavelMs = 0;
    this._liveWatchdog = setInterval(function () {
      if (!_this8.isPlaying || _this8.video.paused) return;
      var cur = _this8.video.currentTime;
      if (Math.abs(cur - lastTime) < 0.05) {
        stallCount += 1000;
        if (stallCount >= 8000) {
          stallCount = 0;
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("stall_recuperacao", _this8.getCurrentSourceUrl());
          _this8.recuperarStallAoVivo();
        }
      } else {
        stallCount = 0;
        lastTime = cur;
        /* 60 s estável limpa o histórico de recuperações da fonte atual */
        _this8._stallEstavelMs += 1000;
        if (_this8._stallEstavelMs >= 60000 && _this8._stallRecuperacoes) {
          _this8._stallRecuperacoes = 0;
          _this8._stallEstavelMs = 0;
        }
      }
    }, 1000);
  };
  _proto.limparWatchdogAoVivo = function limparWatchdogAoVivo() {
    if (this._liveWatchdog) {
      clearInterval(this._liveWatchdog);
      this._liveWatchdog = null;
    }
  };
  _proto.recuperarStallAoVivo = function recuperarStallAoVivo() {
    if (!this.isLive || !this.currentChannel) return;
    if (this.mpegts) return;
    /* Vigia: 3 recuperações seguidas na mesma fonte = fonte ruim; avança pra próxima. */
    this._stallRecuperacoes = (this._stallRecuperacoes || 0) + 1;
    this._stallEstavelMs = 0;
    if (this._stallRecuperacoes >= 3) {
      this._stallRecuperacoes = 0;
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("fonte_oscilando", this.getCurrentSourceUrl());
      this.showStatus("Sinal oscilando, trocando de fonte…");
      if (this.isOSDVisible()) this.showOSD(4000);else this.mostrarAviso("Sinal oscilando, trocando de fonte…");
      this.tryNextSource("Sinal oscilando");
      return;
    }
    this.showStatus("Recuperando sinal travado…");
    if (this._nativo && window.Hls && Hls.isSupported() && this.precisaHls(this.getCurrentSourceUrl())) {
      this._nativo = false;
      this.playChannel(this.currentChannel, this.currentSourceIndex, 0, this._viaProxy, false);
    } else if (this.hls) {
      try {
        this.hls.recoverMediaError();
      } catch (e) {
        this.reconectarMesma("stall");
      }
    } else {
      this.reconectarMesma("stall");
    }
  };
  _proto.getEngineName = function getEngineName() {
    if (this.mpegts) return "mpegts.js (MSE TS)";
    if (this._nativo) return "Nativo (Hardware)";
    if (this.hls) return "HLS.js (MSE Software)";
    return "HTML5 Direto";
  };
  _proto.getBufferSeconds = function getBufferSeconds() {
    try {
      var b = this.video.buffered;
      var t = this.video.currentTime;
      for (var i = 0; i < b.length; i++) {
        if (b.start(i) <= t && t <= b.end(i)) return b.end(i) - t;
      }
    } catch (e) {}
    return 0;
  };
  _proto.getCurrentSourceUrl = function getCurrentSourceUrl() {
    var ch = this.currentChannel;
    var src = ch && ch.sources && ch.sources[this.currentSourceIndex];
    return src ? src.url : "";
  };
  _proto.cycleEngine = function cycleEngine() {
    if (!this.currentChannel) return;
    var ch = this.currentChannel;
    var idx = this.currentSourceIndex;
    var url = ch.sources[idx] && ch.sources[idx].url;
    if (this.isLive && !this.precisaHls(url)) {
      this.showStatus("Ao vivo neste canal fica em TS");
      this.showOSD(2500);
      return;
    }
    var novoNativo = !this._nativo;
    var host = this.hostDaFonte(ch.sources[idx]);
    this.salvarEngineHost(host, novoNativo ? "native" : "hls");
    this.showStatus("Alternando motor: " + (novoNativo ? "Nativo" : "HLS.js"));
    this.showOSD(3000);
    this.playChannel(ch, idx, this.isLive ? 0 : this.video.currentTime, this._viaProxy, novoNativo);
  };
  return SaimoPlayer;
}();

SaimoPlayer._mpegtsCbs = null;
SaimoPlayer.carregarMpegTs = function (done) {
  if (window.mpegts) {
    if (done) done(true);
    return;
  }
  try {
    var ua = navigator.userAgent || "";
    if (/Web0S|webOS|NetCast/i.test(ua) || window.webOS || window.PalmSystem) {
      if (done) done(false);
      return;
    }
  } catch (eTv) {}
  if (SaimoPlayer._mpegtsCbs) {
    if (done) SaimoPlayer._mpegtsCbs.push(done);
    return;
  }
  SaimoPlayer._mpegtsCbs = done ? [done] : [];
  var s = document.createElement("script");
  s.src = "js/mpegts.min.js";
  s.onload = function () {
    var fila = SaimoPlayer._mpegtsCbs || [];
    SaimoPlayer._mpegtsCbs = null;
    var ok = false;
    try {
      ok = !!(window.mpegts && mpegts.isSupported && mpegts.isSupported());
    } catch (eOk) {}
    var i;
    for (i = 0; i < fila.length; i++) if (fila[i]) fila[i](ok);
  };
  s.onerror = function () {
    var fila = SaimoPlayer._mpegtsCbs || [];
    SaimoPlayer._mpegtsCbs = null;
    var i;
    for (i = 0; i < fila.length; i++) if (fila[i]) fila[i](false);
  };
  (document.head || document.body).appendChild(s);
};