/**
 * SaimoMultiview — Múltiplas telas simultâneas de TV ao vivo.
 *
 * Permite assistir a 2 ou 4 canais ao vivo ao mesmo tempo.
 * Ajusta automaticamente o limite de telas conforme a capacidade da TV:
 *   - webOS 3.x a 5.x: limitado a 2 decodificadores (evita travamento do hardware).
 *   - webOS 6.x+ (modernas): grid 2x2 com até 4 canais simultâneos.
 *
 * Apenas a tela focada tem áudio ativo; as demais ficam em mudo.
 */
var SaimoMultiview = (function () {
  'use strict';

  var _ativo = false;
  var _container = null;
  var _jogadores = [];
  var _focoIndice = 0;
  var _zoomed = false;
  var _canaisDisponiveis = [];

  function detectarCapacidadeDecodificadores() {
    var ua = navigator.userAgent || '';
    var chrom = ua.match(/Chrome\/(\d+)/);
    var chromVer = chrom ? parseInt(chrom[1], 10) : 0;
    // Chromium 79+ = webOS 6.x+, suporta 4 decoders independentes com folga
    if (chromVer >= 79) return 4;
    // Modelos mais antigos limitam a 2 decoders de vídeo de hardware
    return 2;
  }

  function criarTile(indice, canal) {
    var wrap = document.createElement('div');
    wrap.className = 'mv-tile' + (indice === _focoIndice ? ' is-active' : '');
    wrap.id = 'mv-tile-' + indice;

    var video = document.createElement('video');
    video.className = 'mv-video';
    video.autoplay = true;
    video.playsInline = true;
    video.muted = indice !== _focoIndice;

    var badge = document.createElement('div');
    badge.className = 'mv-badge';
    badge.textContent = canal ? canal.name : ('Slot ' + (indice + 1));

    wrap.appendChild(video);
    wrap.appendChild(badge);

    var playerInstancia = null;
    if (window.Hls && Hls.isSupported() && canal && canal.sources && canal.sources[0]) {
      var url = canal.sources[0].url;
      if (url.indexOf('.m3u8') !== -1) {
        var hls = new Hls({
          enableWorker: false,
          maxBufferLength: 4,
          maxMaxBufferLength: 6,
          maxBufferSize: 3 * 1024 * 1024
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        playerInstancia = { hls: hls, video: video };
      } else {
        video.src = url;
        video.play().catch(function () {});
        playerInstancia = { video: video };
      }
    }

    return {
      wrap: wrap,
      video: video,
      badge: badge,
      canal: canal,
      player: playerInstancia
    };
  }

  function atualizarFocoAudio() {
    for (var i = 0; i < _jogadores.length; i++) {
      var j = _jogadores[i];
      if (!j) continue;
      if (i === _focoIndice) {
        j.wrap.classList.add('is-active');
        j.video.muted = false;
      } else {
        j.wrap.classList.remove('is-active');
        j.video.muted = true;
      }
    }
  }

  return {
    isAtivo: function () { return _ativo; },

    iniciar: function (canais, canalInicial) {
      if (_ativo) return;
      _ativo = true;
      _canaisDisponiveis = canais || [];
      _zoomed = false;
      _focoIndice = 0;

      var maxTelas = detectarCapacidadeDecodificadores();

      var el = document.getElementById('screen-multiview');
      if (!el) {
        el = document.createElement('div');
        el.id = 'screen-multiview';
        el.className = 'screen-multiview';
        document.body.appendChild(el);
      }
      el.innerHTML = '';
      el.classList.remove('hidden');
      el.classList.add('mv-' + maxTelas);
      _container = el;

      _jogadores = [];
      var listaCanais = [canalInicial];
      for (var c = 0; c < _canaisDisponiveis.length && listaCanais.length < maxTelas; c++) {
        var candidato = _canaisDisponiveis[c];
        if (candidato !== canalInicial) listaCanais.push(candidato);
      }

      for (var i = 0; i < maxTelas; i++) {
        var tile = criarTile(i, listaCanais[i] || null);
        _jogadores.push(tile);
        _container.appendChild(tile.wrap);
      }

      atualizarFocoAudio();
    },

    moverFoco: function (delta) {
      if (!_ativo || _zoomed) return;
      var total = _jogadores.length;
      _focoIndice = (_focoIndice + delta + total) % total;
      atualizarFocoAudio();
    },

    toggleZoom: function () {
      if (!_ativo) return;
      _zoomed = !_zoomed;
      for (var i = 0; i < _jogadores.length; i++) {
        var j = _jogadores[i];
        if (!j) continue;
        if (_zoomed) {
          if (i === _focoIndice) j.wrap.classList.add('is-zoomed');
          else j.wrap.classList.add('is-hidden');
        } else {
          j.wrap.classList.remove('is-zoomed');
          j.wrap.classList.remove('is-hidden');
        }
      }
    },

    trocarCanalTileAtual: function (direcao) {
      if (!_ativo) return;
      var j = _jogadores[_focoIndice];
      if (!j) return;
      var curIdx = _canaisDisponiveis.indexOf(j.canal);
      var novoIdx = (curIdx + direcao + _canaisDisponiveis.length) % _canaisDisponiveis.length;
      var novoCanal = _canaisDisponiveis[novoIdx];
      if (!novoCanal) return;

      if (j.player && j.player.hls) {
        try { j.player.hls.destroy(); } catch (e) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("multiview_cleanup_erro", "hls.destroy: " + ((e && e.message) || ""));
        }
      }
      j.canal = novoCanal;
      j.badge.textContent = novoCanal.name;

      if (novoCanal.sources && novoCanal.sources[0]) {
        var url = novoCanal.sources[0].url;
        if (window.Hls && Hls.isSupported() && url.indexOf('.m3u8') !== -1) {
          var hls = new Hls({ enableWorker: true, maxBufferLength: 4, maxBufferSize: 3 * 1024 * 1024 });
          hls.loadSource(url);
          hls.attachMedia(j.video);
          j.player = { hls: hls, video: j.video };
        } else {
          j.video.src = url;
          j.video.play().catch(function () {});
          j.player = { video: j.video };
        }
      }
    },

    fechar: function () {
      if (!_ativo) return;
      _ativo = false;
      for (var i = 0; i < _jogadores.length; i++) {
        var j = _jogadores[i];
        if (j && j.player && j.player.hls) {
          try { j.player.hls.destroy(); } catch (e) {
            if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("multiview_cleanup_erro", "hls.destroy: " + ((e && e.message) || ""));
          }
        }
        if (j && j.video) {
          try {
            j.video.pause();
            j.video.removeAttribute('src');
            j.video.load();
          } catch (e) {
            if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("multiview_cleanup_erro", "video: " + ((e && e.message) || ""));
          }
        }
      }
      _jogadores = [];
      if (_container) {
        _container.classList.add('hidden');
        _container.innerHTML = '';
      }
    }
  };
})();

if (typeof window !== 'undefined') {
  window.SaimoMultiview = SaimoMultiview;
}
