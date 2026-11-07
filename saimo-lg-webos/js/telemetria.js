"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Amostra do Saimo Monitor (igual ao Mac): só ~5% dos aparelhos falam.
 * Fogo e esquece — sem rede o player segue igual.
 */
var SaimoTelemetria = {
  BASE: "https://saimo-monitor.gabrielsaimo68.workers.dev/v1",
  RANK: "https://saimo-webos.gabrielsaimo68.workers.dev/v1/event",
  JSON: "https://saimo-monitor.gabrielsaimo68.workers.dev/telemetria.json",
  ID_KEY: "saimo_telem_id",
  PCT_KEY: "saimo_telem_pct",
  PCT_AT: "saimo_telem_pct_em",
  padraoPct: 5,
  plataforma: "lg",
  id: "",
  pct: 5,
  amostraSrv: null,
  cumprimentou: false,
  t0: 0,
  okEnviado: false,
  fnv1a: function fnv1a(texto) {
    var h = 0x811c9dc5;
    var s = String(texto || "");
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  },
  deviceId: function deviceId() {
    if (this.id) return this.id;
    try {
      this.id = localStorage.getItem(this.ID_KEY) || "";
    } catch (e) {}
    if (!this.id) {
      this.id = (crypto.randomUUID ? crypto.randomUUID() : "lg-" + Math.random().toString(16).slice(2) + Date.now().toString(16)).toLowerCase();
      try {
        localStorage.setItem(this.ID_KEY, this.id);
      } catch (e) {}
    }
    return this.id;
  },
  naAmostra: function naAmostra() {
    if (this.amostraSrv != null) return this.amostraSrv;
    return this.fnv1a(this.deviceId()) % 10000 < this.pct * 100;
  },
  hostDe: function hostDe(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      if (h.indexOf("www.") === 0) h = h.slice(4);
      if (h === "127.0.0.1" || h === "localhost") return "";
      return h;
    } catch (e) {
      return "";
    }
  },
  versao: function versao() {
    return window.webOSSystem && webOSSystem.version ? String(webOSSystem.version) : "1.0.0";
  },
  iniciar: function iniciar() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var salvo, quando, res, j, n, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _this.deviceId();
            try {
              salvo = parseFloat(localStorage.getItem(_this.PCT_KEY));
              if (salvo >= 0 && salvo <= 100) _this.pct = salvo;
            } catch (e) {}
            _context.p = 1;
            quando = parseInt(localStorage.getItem(_this.PCT_AT) || "0", 10);
            if (!(!quando || Date.now() - quando > 24 * 3600 * 1000)) {
              _context.n = 4;
              break;
            }
            _context.n = 2;
            return fetch(_this.JSON, {
              cache: "no-store"
            });
          case 2:
            res = _context.v;
            if (!res.ok) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return res.json();
          case 3:
            j = _context.v;
            n = Number(j && j.amostraPct);
            if (n >= 0 && n <= 100) {
              _this.pct = n;
              localStorage.setItem(_this.PCT_KEY, String(n));
              localStorage.setItem(_this.PCT_AT, String(Date.now()));
            }
          case 4:
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
          case 6:
            _this.hello();
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[1, 5]]);
    }))();
  },
  hello: function hello() {
    var _this2 = this;
    if (!this.naAmostra() || this.cumprimentou) return;
    this.cumprimentou = true;
    this.post("hello", {
      version: this.versao(),
      model: "webOS",
      os: "webOS",
      screen: (screen.width || 1920) + "x" + (screen.height || 1080),
      lang: navigator.language || "pt-BR"
    }, function (corpo) {
      if (!corpo) return;
      var n = Number(corpo.amostraPct);
      if (n >= 0 && n <= 100) _this2.pct = n;
      if (typeof corpo.amostra === "boolean") _this2.amostraSrv = corpo.amostra;
    });
  },
  post: function post(rota, corpo, cb) {
    if (!this.naAmostra()) return;
    var payload = Object.assign({
      deviceId: this.deviceId(),
      platform: this.plataforma
    }, corpo || {});
    fetch(this.BASE + "/" + rota, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.ok ? res.json() : null;
    }).then(function (j) {
      if (cb) cb(j);
    }).catch(function () {});
  },
  evento: function evento(type, extra) {
    var corpo = Object.assign({
      type: type,
      version: this.versao()
    }, extra || {});
    this.post("event", corpo);
    if (this.naAmostra() && (type === "play_ok" || type === "source_fail")) {
      fetch(this.RANK, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          type: type,
          host: corpo.host || "",
          platform: this.plataforma
        })
      }).catch(function () {});
    }
  },
  tipoDe: function tipoDe(ch) {
    return ch && ch.isLive ? "live" : "vod";
  },
  comecou: function comecou(ch, fonteIdx) {
    if (!ch) return;
    this.t0 = Date.now();
    this.okEnviado = false;
    var src = (ch.sources || [])[fonteIdx] || {};
    this.evento("play_start", {
      kind: this.tipoDe(ch),
      title: ch.name,
      host: this.hostDe(src.url),
      source: fonteIdx
    });
  },
  tocou: function tocou(ch, fonteIdx) {
    if (!ch || this.okEnviado) return;
    this.okEnviado = true;
    var src = (ch.sources || [])[fonteIdx] || {};
    this.evento("play_ok", {
      kind: this.tipoDe(ch),
      title: ch.name,
      host: this.hostDe(src.url),
      source: fonteIdx,
      ms: Math.max(0, Date.now() - (this.t0 || Date.now()))
    });
  },
  falhou: function falhou(ch, fonteIdx, detalhe) {
    if (!ch) return;
    var src = (ch.sources || [])[fonteIdx] || {};
    this.evento("source_fail", {
      kind: this.tipoDe(ch),
      title: ch.name,
      host: this.hostDe(src.url),
      source: fonteIdx,
      detail: String(detalhe || "")
    });
  },
  caiu: function caiu(ch) {
    if (!ch) return;
    this.evento("channel_down", {
      kind: this.tipoDe(ch),
      title: ch.name,
      detail: "nenhuma das " + (ch.sources && ch.sources.length || 0) + " fonte(s) abriu"
    });
  }
};
SaimoTelemetria.iniciar();
window.SaimoTelemetria = SaimoTelemetria;