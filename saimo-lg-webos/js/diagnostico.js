/**
 * SaimoDiagnostico — Central de Diagnóstico e Métricas de Reprodução.
 *
 * Coleta informações do sistema, resolução, engine ativa, decodificador da TV,
 * frames decodificados, tamanho do buffer e histórico de falhas, com mascaramento
 * estrito de credenciais (senhas e tokens nunca são expostos).
 */
var SaimoDiagnostico = (function () {
  'use strict';

  var _playbackLogs = [];
  var _overlayEl = null;
  var _overlayTimer = null;
  var _linhas = [];

  function ehLocal() {
    var h = String(location.hostname || '').toLowerCase();
    return h === 'localhost' || h === '127.0.0.1' || h === '::1' || location.protocol === 'file:';
  }

  function maskUrl(url) {
    if (!url) return '';
    var s = String(url);
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) return s;
    try {
      if (s.indexOf('url=') !== -1) {
        var enc = s.split('url=')[1].split('&')[0];
        try { s = decodeURIComponent(enc); } catch (e1) {}
      }
      var u = new URL(s, location.href);
      var parts = u.pathname.split('/');
      if (parts[1] === 'play') {
        var extra = /\/m3u8$/i.test(u.pathname) ? '/m3u8' : '';
        return u.protocol + '//' + u.host + '/play/***' + extra;
      }
      if (parts.length >= 4) {
        if (parts[1] === 'movie' || parts[1] === 'series' || parts[1] === 'live') {
          return u.protocol + '//' + u.host + '/' + parts[1] + '/***/' + parts[parts.length - 1];
        }
        if (/^\d+(\.\w+)?$/.test(parts[parts.length - 1]) && parts.length >= 4) {
          return u.protocol + '//' + u.host + '/…/***/' + parts[parts.length - 1];
        }
      }
      if (u.search) {
        var sp = u.search.replace(/((?:pass|password|token|key|username)=)[^&]*/gi, '$1***');
        return u.protocol + '//' + u.host + u.pathname + sp;
      }
      return u.protocol + '//' + u.host + u.pathname;
    } catch (e) {
      return String(url).replace(/\/\/([^/]+\/)(live|movie|series)\/[^/]+\/[^/]+\//i, '//$1$2/***/');
    }
  }

  function detectarWebOS() {
    var ua = navigator.userAgent || '';
    var versao = 'PC / localhost';
    var chrom = ua.match(/Chrome\/(\d+)/);
    var chromVer = chrom ? parseInt(chrom[1], 10) : 0;
    var webos = /Web0S|webOS|NetCast/i.test(ua) || !!(window.webOS || window.PalmSystem);

    if (webos) {
      if (chromVer <= 38) versao = 'webOS 3.x (Chrome 38)';
      else if (chromVer <= 53) versao = 'webOS 4.x (Chrome 53)';
      else if (chromVer <= 68) versao = 'webOS 4.5/5.x (Chrome 68)';
      else if (chromVer <= 79) versao = 'webOS 6.x (Chrome 79)';
      else if (chromVer <= 87) versao = 'webOS 22 (Chrome 87)';
      else if (chromVer <= 94) versao = 'webOS 23 (Chrome 94)';
      else versao = 'webOS (Chrome ' + chromVer + ')';
    } else if (chromVer) {
      versao = 'Chrome ' + chromVer + ' · ' + (location.host || 'local');
    }

    return {
      sistema: versao,
      chromium: chromVer,
      resolucao: window.innerWidth + 'x' + window.innerHeight,
      dpr: window.devicePixelRatio || 1,
      plataforma: navigator.platform || '',
      local: ehLocal(),
      webos: webos
    };
  }

  // ── Vigia de memória: amostra a cada 60 s e avisa quando o heap não volta ──
  var _memTimer = null;
  var _memAmostras = [];
  var _memUltimoAviso = 0;

  function memoriaMB() {
    try {
      if (window.performance && performance.memory && performance.memory.usedJSHeapSize > 0) {
        return Math.round(performance.memory.usedJSHeapSize / 1048576);
      }
    } catch (e) {}
    return null;
  }

  function amostrarMemoria() {
    var mb = memoriaMB();
    if (mb == null) return;
    var agora = Date.now();
    _memAmostras.push({ t: agora, mb: mb });
    if (_memAmostras.length > 30) _memAmostras.shift();
    if (_memAmostras.length < 15) return;
    var base = Infinity;
    for (var i = 0; i < _memAmostras.length; i++) {
      if (_memAmostras[i].mb < base) base = _memAmostras[i].mb;
    }
    var folga = Math.max(30, Math.round(base * 0.5));
    var sustentado = true;
    for (var j = _memAmostras.length - 5; j < _memAmostras.length; j++) {
      if (_memAmostras[j].mb - base < folga) {
        sustentado = false;
        break;
      }
    }
    if (sustentado && agora - _memUltimoAviso > 30 * 60 * 1000) {
      _memUltimoAviso = agora;
      logEvento('memoria_crescendo', 'mínima ' + base + ' MB → atual ' + mb + ' MB (últimos ~30 min)');
    }
  }

  function vigiarMemoria() {
    if (_memTimer || memoriaMB() == null) return;
    _memTimer = setInterval(amostrarMemoria, 60000);
    setTimeout(function () {
      var mb = memoriaMB();
      if (mb != null) linha('memória inicial: ' + mb + ' MB');
    }, 8000);
  }

  function fotoMemoria(rotulo) {
    var mb = memoriaMB();
    if (mb == null) return null;
    logEvento('memoria_foto', (rotulo ? rotulo + ': ' : '') + mb + ' MB');
    return mb;
  }

  function picoMemoriaMB() {
    var pico = 0;
    for (var i = 0; i < _memAmostras.length; i++) {
      if (_memAmostras[i].mb > pico) pico = _memAmostras[i].mb;
    }
    return pico;
  }

  function pintarPainel() {
    if (!_overlayEl) return;
    var sys = detectarWebOS();
    var xt = window.SaimoXtream;
    var xtLinha = 'Xtream: desligado';
    if (xt && xt.ligado && xt.ligado()) {
      xtLinha = xt.mensagemStatus ? xt.mensagemStatus() : 'Xtream ligado';
    }
    var txt = 'LOG LOCAL · ' + sys.sistema + ' · ' + sys.resolucao + '\n' + xtLinha + '\n' +
      '────────────────────────────────\n' + _linhas.join('\n');
    _overlayEl.textContent = txt;
  }

  function linha(msg) {
    var hora = (new Date()).toLocaleTimeString();
    var t = '[' + hora + '] ' + String(msg || '');
    _linhas.unshift(t);
    if (_linhas.length > 24) _linhas.pop();
    try { console.log('[Saimo]', msg); } catch (e) {}
    pintarPainel();
  }

  function logEvento(tipo, detalhe) {
    var entrada = {
      ts: Date.now(),
      data: (new Date()).toLocaleTimeString(),
      tipo: tipo,
      detalhe: maskUrl(detalhe)
    };
    _playbackLogs.unshift(entrada);
    if (_playbackLogs.length > 40) _playbackLogs.pop();
    linha(tipo + ' · ' + entrada.detalhe);
  }

  function sondar(url, aoTipo) {
    if (!url) return;
    var mostra = maskUrl(url);
    var x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.timeout = 8000;
    try { x.overrideMimeType('text/plain; charset=x-user-defined'); } catch (e) {}
    var cortou = false;
    function avisar(tipo, head) {
      linha('sonda HTTP ' + x.status + ' · ' + tipo + ' · ' + mostra);
      if (head) linha('sonda início: ' + head.slice(0, 40));
      if (typeof aoTipo === 'function') {
        try { aoTipo(tipo, x.status); } catch (eCb) {}
      }
    }
    x.onprogress = function () {
      if (cortou) return;
      var t = x.responseText || '';
      if (t.length < 8) return;
      cortou = true;
      try { x.abort(); } catch (e2) {}
      var head = t.slice(0, 48).replace(/\s+/g, ' ');
      var tipo = 'bytes desconhecidos';
      if (/^\s*\{/.test(t) || t.indexOf('"error"') !== -1) tipo = 'JSON erro (proxy/bloqueio)';
      else if (head.indexOf('#EXTM3U') === 0) tipo = 'HLS #EXTM3U';
      else if (head.charCodeAt(0) === 0x47) tipo = 'MPEG-TS (byte 0x47)';
      else if (/^\s*<!doctype|^\s*<html/i.test(t)) {
        tipo = 'HTML (não é vídeo)';
        if (/Error response|Error code: 404|Directory listing/i.test(t)) {
          tipo = '404 do python -m http.server — feche e rode: python dev-server.py';
        } else if (/404 Not Found/i.test(t)) {
          tipo = 'HTML 404 (não é vídeo)';
        }
      }
      else if (/ftyp|moov/i.test(head)) tipo = 'MP4';
      avisar(tipo, head);
    };
    x.onload = function () {
      if (cortou) return;
      var t = x.responseText || '';
      linha('sonda HTTP ' + x.status + ' · ' + t.length + ' bytes · ' + mostra);
      if (t) linha('sonda início: ' + t.slice(0, 40).replace(/\s+/g, ' '));
    };
    x.onerror = function () {
      linha('sonda FALHOU (CORS/rede) · ' + mostra);
    };
    x.ontimeout = function () {
      linha('sonda TIMEOUT · ' + mostra);
    };
    try { x.send(); } catch (e3) {
      linha('sonda erro · ' + (e3 && e3.message));
    }
  }

  function abrirPainel() {
    if (_overlayEl) return;
    var el = document.createElement('div');
    el.id = 'saimo-diag-hud';
    el.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:999999;background:rgba(8,12,24,0.92);' +
      'color:#7dffb3;font:13px/1.45 Consolas,monospace;padding:12px 14px;border-radius:10px;' +
      'border:1px solid #1a4a32;max-width:560px;max-height:42vh;overflow:auto;' +
      'box-shadow:0 8px 28px rgba(0,0,0,0.55);white-space:pre-wrap;pointer-events:none;';
    (document.body || document.documentElement).appendChild(el);
    _overlayEl = el;
    linha('log ligado em ' + location.href);
  }

  vigiarMemoria();

  return {
    maskUrl: maskUrl,
    detectarWebOS: detectarWebOS,
    logEvento: logEvento,
    linha: linha,
    sondar: sondar,
    ehLocal: ehLocal,
    abrirPainel: abrirPainel,
    memoriaMB: memoriaMB,
    fotoMemoria: fotoMemoria,
    amostrasMemoria: function () {
      return _memAmostras.slice();
    },

    obterRelatorio: function (player) {
      var sys = detectarWebOS();
      var mb = memoriaMB();
      var pico = picoMemoriaMB();
      return {
        sistema: sys.sistema,
        resolucao: sys.resolucao,
        memoriaJS: mb != null ? mb + ' MB' : 'N/A',
        picoMemoriaJS: (pico || mb) ? (pico || mb) + ' MB' : 'N/A',
        engineAtiva: (player && player.getEngineName) ? player.getEngineName() : 'N/A',
        videoPronto: !!(player && player.video && player.video.readyState >= 2),
        bufferSegundos: (player && player.getBufferSeconds) ? player.getBufferSeconds().toFixed(1) + 's' : '0s',
        canalAtual: (player && player.currentChannel) ? player.currentChannel.name : 'Nenhum',
        fonteAtual: (player && player.getCurrentSourceUrl) ? maskUrl(player.getCurrentSourceUrl()) : 'N/A',
        historicoEventos: _playbackLogs.slice(0, 10)
      };
    },

    toggleHUD: function (player) {
      if (_overlayEl) {
        if (_overlayTimer) clearInterval(_overlayTimer);
        _overlayTimer = null;
        if (_overlayEl.parentNode) _overlayEl.parentNode.removeChild(_overlayEl);
        _overlayEl = null;
        return;
      }
      abrirPainel();
      var self = this;
      _overlayTimer = setInterval(function () {
        self.obterRelatorio(player);
      }, 2000);
    }
  };
})();

if (typeof window !== 'undefined') {
  window.SaimoDiagnostico = SaimoDiagnostico;
}
