"use strict";

/**
 * Preferências da LG (localStorage). Sem MetalFX, Cast ou janela extra.
 */
var SaimoAjustes = {
  KEY: "saimo_ajustes",
  PIN_KEY: "saimo_pin",
  padrao: {
    fillScreen: false,
    audioPref: "dub",
    subSize: 32,
    autoSkip: false,
    autoNext: true,
    hideAdult: true,
    openLast: false,
    clock24: true,
    zeroDelay: "off",
    audioNorm: false,
    urlCanais: "",
    urlVod: "",
    catalogoSaimo: true,
    catalogoMeu: false,
    catalogoXtream: true,
    xtreamOff: false,
    xtreamHost: "",
    xtreamUser: "",
    xtreamPass: "",
    pacoteEmbutido: false,
    pularAbertura: false,
    vistaAoVivo: "grade"
  },
  _rawCache: null,
  _versao: 0,
  ler: function ler() {
    /* Cache do JSON parseado: JSON.parse(localStorage.getItem) a cada chamada
       custou ~2,1 s só de ajustes no perfil de CPU (getItem é IPC síncrono e
       lento na TV). O Object.assign final fica igual ao código antigo — cada
       chamada devolve objeto fresco, sem risco de mutação do cache. Cache
       invalidado ao gravar e no evento storage (outra página mudou).
       _versao sobe a cada mudança: consumidores quentes (xtream ligado/perfil)
       comparam a versão em vez de reler tudo. */
    if (this._rawCache === null) {
      var raw = {};
      try {
        raw = JSON.parse(localStorage.getItem(this.KEY) || "{}") || {};
      } catch (e) {
        raw = {};
      }
      if (raw.catalogoMeu === undefined && String(raw.urlVod || "").trim()) {
        raw.catalogoMeu = true;
        if (raw.catalogoSaimo === undefined) raw.catalogoSaimo = false;
      }
      this._rawCache = raw;
    }
    return Object.assign({}, this.padrao, this._rawCache);
  },
  gravar: function gravar(parcial) {
    var atual = Object.assign(this.ler(), parcial || {});
    this._rawCache = Object.assign({}, atual);
    this._versao++;
    window.SAIMO_FONTES_VER = (window.SAIMO_FONTES_VER || 0) + 1;
    try {
      localStorage.setItem(this.KEY, JSON.stringify(atual));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "ajustes: " + ((e && e.message) || ""));
    }
    this.aplicar(atual);
    return atual;
  },
  get: function get(chave) {
    /* Leitura direta do cache, sem copiar objeto: get() rodava ~260 mil vezes
       ao abrir hub+Filmes (1 cópia de ~40 chaves cada). Chave ausente cai no
       padrão. */
    if (this._rawCache === null) this.ler();
    var v = this._rawCache[chave];
    return v === undefined ? this.padrao[chave] : v;
  },
  pin: function pin() {
    try {
      return localStorage.getItem(this.PIN_KEY) || "0000";
    } catch (e) {
      return "0000";
    }
  },
  setPin: function setPin(pin) {
    try {
      localStorage.setItem(this.PIN_KEY, String(pin || "0000").slice(0, 4));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_pin: " + ((e && e.message) || ""));
    }
  },
  aplicar: function aplicar(cfg) {
    cfg = cfg || this.ler();
    var video = document.getElementById("video-element");
    if (video) video.classList.toggle("fill-screen", !!cfg.fillScreen);
    var overlay = document.getElementById("subtitle-overlay");
    if (overlay) overlay.style.fontSize = (cfg.subSize || 32) + "px";
    if (window.SaimoAudio) SaimoAudio.sincronizar(video, !!cfg.audioNorm);
  },
  tipoAudioFonte: function tipoAudioFonte(s) {
    var a = String(s && (s.audio || s.quality) || "").toUpperCase();
    if (a.indexOf("LEG") >= 0) return "LEG";
    if (a.indexOf("DUB") >= 0 || a.indexOf("NAC") >= 0) return "DUB";
    return a || "DUB";
  },
  ordenarFontes: function ordenarFontes(sources, serieTitulo) {
    if (window.SaimoFontePref) return SaimoFontePref.ordenar(sources, serieTitulo, this.get("audioPref") || "dub");
    var _this = this;
    var lista = (sources || []).slice();
    if (!lista.length) return lista;
    var pref = this.get("audioPref") || "dub";
    var want = pref === "leg" ? "LEG" : "DUB";
    lista.sort(function (a, b) {
      var pa = a.origem === "meu" || a.suaLista ? 0 : 1;
      var pb = b.origem === "meu" || b.suaLista ? 0 : 1;
      if (pa !== pb) return pa - pb;
      var aa = _this.tipoAudioFonte(a) === want ? 0 : 1;
      var bb = _this.tipoAudioFonte(b) === want ? 0 : 1;
      return aa - bb;
    });
    return lista;
  },
  guardarFonte: function guardarFonte(serieTitulo, url, sources, idx) {
    if (window.SaimoFontePref) {
      SaimoFontePref.guardar(serieTitulo, url, sources, idx);
      return;
    }
    if (!serieTitulo || !url) return;
    var mapa = {};
    try {
      mapa = JSON.parse(localStorage.getItem("saimo_fonte_pref") || "{}");
    } catch (e) {}
    mapa[serieTitulo] = {
      host: this.hostDe(url),
      posicao: idx || 0
    };
    try {
      localStorage.setItem("saimo_fonte_pref", JSON.stringify(mapa));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_fonte_pref: " + ((e && e.message) || ""));
    }
  },
  hostDe: function hostDe(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      if (h.indexOf("www.") === 0) h = h.slice(4);
      return h;
    } catch (e) {
      return "";
    }
  },
  ehAdulto: function ehAdulto(item) {
    if (window.SaimoAdultos && SaimoAdultos.eh) return SaimoAdultos.eh(item);
    var t = (item && (item.category || item.name || item.title) || "").toLowerCase();
    return /adulto|sexy hot|playboy|sex prive|penthouse|hustler|brasileirinhas|venus/.test(t);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  return SaimoAjustes.aplicar();
});
window.SaimoAjustes = SaimoAjustes;
/* Outra página/página antiga mudou os ajustes: solta o cache pra reler. */
try {
  window.addEventListener("storage", function (ev) {
    if (!ev || ev.key === SaimoAjustes.KEY) {
      SaimoAjustes._rawCache = null;
      SaimoAjustes._versao++;
      window.SAIMO_FONTES_VER = (window.SAIMO_FONTES_VER || 0) + 1;
    }
  });
} catch (eSt) {}

/**
 * Áudio Inteligente: nivela o volume entre canais e fontes (igual ao site).
 *
 * Desligado por padrão na TV: só acopla o WebAudio quando você liga em Ajustes.
 * Uma vez acoplado, o áudio sempre passa pelo compressor — com o ajuste
 * desligado ele fica neutro (sem compressão nem ganho), custo perto de zero.
 */
var SaimoAudio = {
  ctx: null,
  compressor: null,
  ganho: null,
  ligado: false,
  sincronizar: function sincronizar(video, ativo) {
    var _this2 = this;
    this.ligado = !!ativo;
    if (this.ctx) {
      this.parametros();
      return;
    }
    if (!ativo || !video) return;
    // Fonte direta sem MSE (blob:) pode silenciar sem CORS: não acopla.
    var src = video.src || "";
    if (src && src.indexOf("blob:") !== 0 && src.indexOf("data:") !== 0) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.compressor = this.ctx.createDynamicsCompressor();
      this.ganho = this.ctx.createGain();
      this.compressor.connect(this.ganho);
      this.ganho.connect(this.ctx.destination);
      this.ctx.createMediaElementSource(video).connect(this.compressor);
      video.addEventListener("play", function () {
        if (_this2.ctx && _this2.ctx.state === "suspended") _this2.ctx.resume().catch(function () {});
      }, {
        passive: true
      });
      this.parametros();
    } catch (e) {
      this.ctx = null;
    }
  },
  parametros: function parametros() {
    if (!this.ctx || !this.compressor || !this.ganho) return;
    var t = this.ctx.currentTime;
    if (this.ligado) {
      this.compressor.threshold.setValueAtTime(-22, t);
      this.compressor.knee.setValueAtTime(24, t);
      this.compressor.ratio.setValueAtTime(8, t);
      this.compressor.attack.setValueAtTime(0.005, t);
      this.compressor.release.setValueAtTime(0.20, t);
      this.ganho.gain.setValueAtTime(1.4, t);
    } else {
      this.compressor.threshold.setValueAtTime(0, t);
      this.ganho.gain.setValueAtTime(1.0, t);
    }
  }
};
window.SaimoAudio = SaimoAudio;