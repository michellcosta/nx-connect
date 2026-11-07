"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Legendas OpenSubtitles (addon Stremio) + mapa IMDb publicado.
 */
var SaimoLegendas = {
  BASE: "https://filmes-saimo.pages.dev/",
  SERVICO: "https://opensubtitles-v3.strem.io/subtitles",
  idiomas: [{
    codigo: "pob",
    nome: "Português (Brasil)",
    limite: 5
  }, {
    codigo: "por",
    nome: "Português (Portugal)",
    limite: 3
  }, {
    codigo: "eng",
    nome: "Inglês",
    limite: 3
  }, {
    codigo: "spa",
    nome: "Espanhol",
    limite: 2
  }],
  fragmentos: Object.create(null),
  listas: Object.create(null),
  arquivos: Object.create(null),
  falas: [],
  atraso: 0,
  overlay: null,
  setOverlay: function setOverlay(el) {
    this.overlay = el;
  },
  texto: function texto(url) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var res;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return fetch(url);
          case 1:
            res = _context.v;
            if (res.ok) {
              _context.n = 2;
              break;
            }
            return _context.a(2, "");
          case 2:
            return _context.a(2, res.text());
        }
      }, _callee);
    }))();
  },
  imdb: function imdb(tmdb, isSeries) {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var nome, corpo, mapa;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (tmdb) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, "");
          case 1:
            nome = (isSeries ? "s" : "f") + "-" + String(tmdb % 100).padStart(2, "0");
            if (_this.fragmentos[nome]) {
              _context2.n = 3;
              break;
            }
            _context2.n = 2;
            return _this.texto(_this.BASE + "imdb/" + nome + ".txt");
          case 2:
            corpo = _context2.v;
            mapa = Object.create(null);
            String(corpo || "").split("\n").forEach(function (linha) {
              var partes = linha.split("\t");
              if (partes.length >= 2) {
                var id = parseInt(partes[0], 10);
                if (id) mapa[id] = partes[1].trim();
              }
            });
            _this.fragmentos[nome] = mapa;
          case 3:
            return _context2.a(2, _this.fragmentos[nome][tmdb] || "");
        }
      }, _callee2);
    }))();
  },
  opcoes: function opcoes(tmdb, isSeries, temporada, episodio) {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var chave, imdb, alvo, json, todas, saida, _t, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            chave = [isSeries, tmdb, temporada || 0, episodio || 0].join("|");
            if (!_this2.listas[chave]) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, _this2.listas[chave]);
          case 1:
            _context3.n = 2;
            return _this2.imdb(tmdb, isSeries);
          case 2:
            imdb = _context3.v;
            if (imdb) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, []);
          case 3:
            alvo = isSeries && temporada > 0 ? "series/" + imdb + ":" + temporada + ":" + episodio : "movie/" + imdb;
            _context3.p = 4;
            _t = JSON;
            _context3.n = 5;
            return _this2.texto(_this2.SERVICO + "/" + alvo + ".json");
          case 5:
            json = _t.parse.call(_t, _context3.v);
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t2 = _context3.v;
            return _context3.a(2, []);
          case 7:
            todas = json.subtitles || [];
            saida = [];
            _this2.idiomas.forEach(function (_ref) {
              var codigo = _ref.codigo,
                nome = _ref.nome,
                limite = _ref.limite;
              var n = 0;
              todas.forEach(function (s) {
                if (n >= limite || s.lang !== codigo || !s.url) return;
                var versao = (s.releaseGroup || s.releaseFormat || String(n + 1)).trim();
                saida.push({
                  id: codigo + "-" + (s.id || n),
                  idioma: codigo,
                  rotulo: nome + " · " + versao,
                  url: s.url
                });
                n += 1;
              });
            });
            _this2.listas[chave] = saida;
            return _context3.a(2, saida);
        }
      }, _callee3, null, [[4, 6]]);
    }))();
  },
  parseSrt: function parseSrt(conteudo) {
    var limpo = String(conteudo || "").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var tempo = /(\d+):(\d{2}):(\d{2})[,.](\d{1,3})/;
    function segundos(s) {
      var m = String(s).match(tempo);
      if (!m) return -1;
      var milis = (m[4] + "000").slice(0, 3);
      return +m[1] * 3600 + +m[2] * 60 + +m[3] + +milis / 1000;
    }
    var falas = [];
    limpo.split("\n\n").forEach(function (bloco) {
      var linhas = bloco.split("\n");
      var i = linhas.findIndex(function (l) {
        return l.indexOf("-->") !== -1;
      });
      if (i < 0) return;
      var tempos = linhas[i].split("-->");
      if (tempos.length < 2) return;
      var inicio = segundos(tempos[0]);
      var fim = segundos(tempos[1]);
      if (inicio < 0 || fim <= inicio) return;
      var texto = linhas.slice(i + 1).join("\n").replace(/<[^>]+>/g, "").replace(/\{\\[^}]*\}/g, "").trim();
      if (texto) falas.push({
        inicio: inicio,
        fim: fim,
        texto: texto
      });
    });
    falas.sort(function (a, b) {
      return a.inicio - b.inicio;
    });
    return falas;
  },
  carregar: function carregar(opcao) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var corpo, falas;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (opcao) {
              _context4.n = 1;
              break;
            }
            _this3.falas = [];
            _this3.mostrar("");
            return _context4.a(2);
          case 1:
            if (!_this3.arquivos[opcao.url]) {
              _context4.n = 2;
              break;
            }
            _this3.falas = _this3.arquivos[opcao.url];
            return _context4.a(2);
          case 2:
            _context4.n = 3;
            return _this3.texto(opcao.url);
          case 3:
            corpo = _context4.v;
            falas = _this3.parseSrt(corpo);
            if (falas.length) {
              _context4.n = 4;
              break;
            }
            return _context4.a(2);
          case 4:
            _this3.arquivos[opcao.url] = falas;
            _this3.falas = falas;
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  desligar: function desligar() {
    this.falas = [];
    this.mostrar("");
  },
  falaEm: function falaEm(t) {
    var tempo = t + this.atraso;
    var falas = this.falas;
    if (!falas.length) return "";
    var baixo = 0;
    var alto = falas.length;
    while (baixo < alto) {
      var meio = baixo + alto >> 1;
      if (falas[meio].inicio <= tempo) baixo = meio + 1;else alto = meio;
    }
    var i = baixo - 1;
    while (i >= 0 && i >= baixo - 4) {
      if (tempo < falas[i].fim) return falas[i].texto;
      i -= 1;
    }
    return "";
  },
  atualizar: function atualizar(t) {
    this.mostrar(this.falaEm(t));
  },
  mostrar: function mostrar(texto) {
    if (this.overlay) this.overlay.textContent = texto || "";
  },
  idiomaGuardado: function idiomaGuardado() {
    try {
      return localStorage.getItem("saimo_legenda_idioma") || "pob";
    } catch (e) {
      return "pob";
    }
  },
  guardarIdioma: function guardarIdioma(codigo) {
    try {
      localStorage.setItem("saimo_legenda_idioma", codigo || "");
    } catch (e) {}
  }
};
window.SaimoLegendas = SaimoLegendas;