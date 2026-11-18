"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Fontes de TV ao vivo: a que já abriu neste aparelho volta na frente.
 * Sem nenhuma gravada, a primeira do catálogo abre, igual ao site.
 */
var SaimoFontesLive = {
  MONITOR: "https://saimo-tv.pages.dev/fontes-desativadas.json",
  DEAD_KEY: "saimo_hosts_mortos",
  DEAD_AT: "saimo_hosts_mortos_em",
  USER_KEY: "saimo_fontes_bloqueadas",
  PREFER_KEY: "saimo_fonte_tocou",
  LAT_KEY: "saimo_fonte_lat",
  hostsMortos: [],
  _preferidas: null,
  hostDe: function hostDe(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      if (h.indexOf("www.") === 0) h = h.slice(4);
      return h;
    } catch (e) {
      return "";
    }
  },
  atualizarMortos: function atualizarMortos() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var agora, quando, guardado, ctrl, t, res, json, lista, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            agora = Date.now();
            _context.p = 1;
            quando = parseInt(localStorage.getItem(_this.DEAD_AT) || "0", 10);
            guardado = JSON.parse(localStorage.getItem(_this.DEAD_KEY) || "[]");
            if (!(quando && agora - quando < 3600000 && Array.isArray(guardado))) {
              _context.n = 2;
              break;
            }
            _this.hostsMortos = guardado;
            return _context.a(2);
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
          case 4:
            _context.p = 4;
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, 8000);
            _context.n = 5;
            return fetch(_this.MONITOR, {
              signal: ctrl.signal
            });
          case 5:
            res = _context.v;
            clearTimeout(t);
            if (res.ok) {
              _context.n = 6;
              break;
            }
            return _context.a(2);
          case 6:
            _context.n = 7;
            return res.json();
          case 7:
            json = _context.v;
            lista = json && json.desativados || [];
            _this.hostsMortos = lista.map(function (h) {
              return String(h).toLowerCase();
            });
            localStorage.setItem(_this.DEAD_KEY, JSON.stringify(_this.hostsMortos));
            localStorage.setItem(_this.DEAD_AT, String(agora));
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t2 = _context.v;
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[4, 8], [1, 3]]);
    }))();
  },
  morto: function morto(urlOuFonte) {
    var fonte = urlOuFonte && typeof urlOuFonte === "object" ? urlOuFonte : null;
    var url = fonte ? fonte.url : urlOuFonte;
    var u = String(url || "").toLowerCase();
    if (!u) return true;
    if (u.indexOf("/offline") !== -1) return true;
    if (/\.mpd(\?|$)/.test(u)) return true;
    var temCabecalho = !!(fonte && (fonte.referer || fonte.agent || fonte.agente));
    // error.txt sem cabeçalho costuma ser página de erro. O EmbedTV
    // (cloudfront-net.lat) publica a playlist com esse nome e ela abre direto,
    // com CORS liberado — é a fonte que o site usa no SporTV.
    if (u.indexOf("error.txt") !== -1 && !temCabecalho && u.indexOf("cloudfront-net.lat") === -1) return true;
    var h = this.hostDe(url);
    if (!h) return false;
    if (this.bloqueadosPeloUsuario().some(function (m) {
      return h === m || h.indexOf(m) !== -1 || m.indexOf(h) !== -1;
    })) return true;
    // A lista do monitor marca o host do error.txt como morto porque a sonda não manda Referer.
    if (temCabecalho) return false;
    return this.hostsMortos.some(function (m) {
      return h === m || h.indexOf(m) !== -1 || m.indexOf(h) !== -1;
    });
  },
  /**
   * Fontes que você mesmo desativou, guardadas no aparelho. Diferente da lista
   * do monitor (servidor fora do ar para todo mundo), esta é escolha sua:
   * desativa pelo menu de Fontes do player e reativa em Ajustes.
   * Fica em memória: morto() corre na montagem das grades, e ler o
   * localStorage a cada fonte custaria caro.
   */
  _bloqueados: null,
  bloqueadosPeloUsuario: function bloqueadosPeloUsuario() {
    if (this._bloqueados) return this._bloqueados;
    try {
      var lista = JSON.parse(localStorage.getItem(this.USER_KEY) || "[]");
      this._bloqueados = Array.isArray(lista) ? lista : [];
    } catch (e) {
      this._bloqueados = [];
    }
    return this._bloqueados;
  },
  bloquearHost: function bloquearHost(host) {
    host = String(host || "").toLowerCase();
    if (!host) return;
    var lista = this.bloqueadosPeloUsuario();
    if (lista.indexOf(host) === -1) lista.push(host);
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(lista));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "fontes_bloqueadas: " + ((e && e.message) || ""));
    }
  },
  reativarTudo: function reativarTudo() {
    var lista = this.bloqueadosPeloUsuario();
    try {
      localStorage.removeItem(this.USER_KEY);
    } catch (e) {}
    this._bloqueados = [];
    return lista.length;
  },
  /**
   * Tempo até a imagem abrir, por host, neste aparelho.
   * A próxima vez a mais rápida fica na frente.
   */
  _lat: null,
  latencias: function latencias() {
    if (this._lat) return this._lat;
    try {
      var data = JSON.parse(localStorage.getItem(this.LAT_KEY) || "{}");
      this._lat = data && typeof data === "object" ? data : {};
    } catch (e) {
      this._lat = {};
    }
    return this._lat;
  },
  msDe: function msDe(url) {
    var h = this.hostDe(url);
    if (!h) return null;
    var x = this.latencias()[h];
    return x && x.ms > 0 ? x.ms : null;
  },
  textoLatencia: function textoLatencia(url) {
    var ms = this.msDe(url);
    if (ms == null) return "";
    if (ms < 1000) return Math.round(ms) + " ms";
    var s = (ms / 1000).toFixed(1).replace(".", ",");
    return s + " s";
  },
  guardarLatencia: function guardarLatencia(host, ms) {
    host = String(host || "").toLowerCase();
    ms = Math.round(Number(ms) || 0);
    if (!host || ms < 80 || ms > 60000) return;
    var mapa = this.latencias();
    var prev = mapa[host];
    var novo = prev && prev.n ? Math.round(prev.ms * 0.65 + ms * 0.35) : ms;
    mapa[host] = {
      ms: novo,
      n: (prev && prev.n || 0) + 1,
      em: Date.now()
    };
    var chaves = Object.keys(mapa);
    if (chaves.length > 50) {
      chaves.sort(function (a, b) {
        return (mapa[a].em || 0) - (mapa[b].em || 0);
      });
      chaves.slice(0, chaves.length - 50).forEach(function (c) {
        delete mapa[c];
      });
    }
    try {
      localStorage.setItem(this.LAT_KEY, JSON.stringify(mapa));
    } catch (e2) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "fonte_lat: " + ((e2 && e2.message) || ""));
    }
  },
  /**
   * Tira hosts desligados. Depois ordena pelo tempo de abertura
   * gravado neste aparelho. Sem medida, fica a ordem do catálogo.
   */
  normNome: function normNome(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  },
  preferidas: function preferidas() {
    if (this._preferidas) return this._preferidas;
    try {
      var data = JSON.parse(localStorage.getItem(this.PREFER_KEY) || "{}");
      this._preferidas = data && typeof data === "object" ? data : {};
    } catch (e) {
      this._preferidas = {};
    }
    return this._preferidas;
  },
  lembrar: function lembrar(nome, url) {
    var k = this.normNome(nome);
    var host = this.hostDe(url);
    if (!k || !host) return;
    var mapa = this.preferidas();
    mapa[k] = {
      host: host,
      url: url,
      em: Date.now()
    };
    var chaves = Object.keys(mapa);
    if (chaves.length > 80) {
      chaves.sort(function (a, b) {
        return (mapa[a].em || 0) - (mapa[b].em || 0);
      });
      chaves.slice(0, chaves.length - 80).forEach(function (c) {
        delete mapa[c];
      });
    }
    try {
      localStorage.setItem(this.PREFER_KEY, JSON.stringify(mapa));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "fonte_tocou: " + ((e && e.message) || ""));
    }
  },
  ordenar: function ordenar(sources, nome) {
    var _this2 = this;
    var lista = (sources || []).slice();
    if (!lista.length) return lista;
    var vivas = lista.filter(function (s) {
      return !_this2.morto(s);
    });
    var base = vivas.length ? vivas : lista;
    if (base.length < 2) return base;
    var scored = [];
    var i, s, ms;
    for (i = 0; i < base.length; i++) {
      s = base[i];
      ms = _this2.msDe(s.url);
      scored.push({
        s: s,
        i: i,
        ms: ms == null ? 1000000 + i : ms
      });
    }
    scored.sort(function (a, b) {
      if (a.ms !== b.ms) return a.ms - b.ms;
      return a.i - b.i;
    });
    var out = [];
    for (i = 0; i < scored.length; i++) out.push(scored[i].s);
    var pref = this.preferidas()[this.normNome(nome)];
    if (!pref) return out;
    var pi = -1;
    for (i = 0; i < out.length; i++) {
      if (pref.url && out[i].url === pref.url && !_this2.morto(out[i])) {
        pi = i;
        break;
      }
      if (pi < 0 && pref.host && _this2.hostDe(out[i].url) === pref.host && !_this2.morto(out[i])) pi = i;
    }
    if (pi <= 0) return out;
    var pms = _this2.msDe(out[pi].url);
    var best = scored[0] && scored[0].ms < 1000000 ? scored[0].ms : null;
    if (pms != null && best != null && pms > best + 400) return out;
    var escolhida = out.splice(pi, 1)[0];
    out.unshift(escolhida);
    return out;
  }
};
SaimoFontesLive.atualizarMortos();
window.SaimoFontesLive = SaimoFontesLive;