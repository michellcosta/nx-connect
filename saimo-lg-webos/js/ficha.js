"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Fichas locais (sinopses.txt + fichas.txt) e TMDB como reserva.
 */
var SaimoFicha = {
  FICHAS_LOCAL: "vod/fichas.txt",
  FICHAS_URL: "https://filmes-saimo.pages.dev/fichas.txt",
  SINOPSES: "vod/sinopses.txt",
  SINOPSES_URL: "https://nx-conexao.pages.dev/sinopses.txt",
  SERIES_EPS: "vod/series_eps.txt",
  PLATAFORMAS_LOCAL: "vod/plataformas.txt",
  PLATAFORMAS_URL: "https://filmes-saimo.pages.dev/plataformas.txt",
  TMDB: "https://api.themoviedb.org/3",
  PROXY: "https://nx-conexao.pages.dev",
  IMG: "https://image.tmdb.org/t/p/",
  ids: {
    f: Object.create(null),
    s: Object.create(null)
  },
  meta: {
    f: Object.create(null),
    s: Object.create(null)
  },
  posterBase: "https://image.tmdb.org/t/p/w342",
  locais: Object.create(null),
  lista: {
    f: [],
    s: []
  },
  byTmdb: {
    f: Object.create(null),
    s: Object.create(null)
  },
  plats: {
    f: Object.create(null),
    s: Object.create(null)
  },
  ordemPlats: [],
  _genCache: {
    f: null,
    s: null
  },
  eps: Object.create(null),
  loaded: false,
  loading: null,
  _falhasLogadas: Object.create(null),
  logarFalha: function logarFalha(url, motivo) {
    if (!url) return;
    if (this._falhasLogadas[url]) return;
    this._falhasLogadas[url] = 1;
    if (window.SaimoDiagnostico) {
      var mascara = SaimoDiagnostico.maskUrl ? SaimoDiagnostico.maskUrl(String(url)) : String(url);
      SaimoDiagnostico.logEvento("ficha_fonte_erro", motivo + " · " + mascara);
    }
  },
  cache: Object.create(null),
  seasonCache: Object.create(null),
  posterCache: Object.create(null),
  disco: null,
  DISCO_FICHAS: "saimo_ficha_cache",
  DISCO_TEMPS: "saimo_temp_cache",
  DISCO_CAPAS: "saimo_poster_cache",
  MAX_FICHAS: 300,
  MAX_TEMPS: 150,
  MAX_CAPAS: 400,
  _foldCache: null,
  _foldCount: 0,
  fold: function fold(s) {
    /* Memoizado: NFD + 3 regexes por chamada; fold roda em todo título
       consultado (chave, tmdbId, posterDe). Limite por contador, não por
       Object.keys — por miss era O(cache) e engasgou a TV na 1.0.11. */
    s = String(s || "");
    if (this._foldCache === null) this._foldCache = Object.create(null);
    if (this._foldCache[s] !== undefined) return this._foldCache[s];
    var r = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s*\(\d{4}\)\s*$/, "").replace(/[^a-z0-9]+/g, " ").trim();
    if (this._foldCount > 60000) {
      this._foldCache = Object.create(null);
      this._foldCount = 0;
    }
    this._foldCache[s] = r;
    this._foldCount++;
    return r;
  },
  semAno: function semAno(titulo) {
    return String(titulo || "").replace(/\s*\(\d{4}\)\s*$/, "").trim();
  },
  chave: function chave(title, isSeries) {
    return (isSeries ? "s:" : "f:") + this.fold(title);
  },
  texto: function texto(url) {
    /* XHR primeiro: em file:// o fetch() nativo é bloqueado por segurança
       (webOS 23 / Chrome 94 — "Failed to fetch" nos vod/* da TV). O XHR
       ainda passa no container; para file:// o sucesso vem com status 0. */
    return new Promise(function (resolve) {
      var fechou = false;
      function fim(txt, motivo) {
        if (fechou) return;
        fechou = true;
        if (txt) {
          delete SaimoFicha._falhasLogadas[url];
          resolve(txt);
          return;
        }
        if (motivo) SaimoFicha.logarFalha(url, motivo);
        resolve("");
      }
      function viaFetch() {
        fetch(url).then(function (res) {
          if (!res.ok) {
            fim("", "HTTP " + res.status);
            return;
          }
          res.text().then(function (t) {
            fim(t);
          }, function (eT) {
            fim("", "rede: " + (eT && eT.message || eT));
          });
        }, function (eF) {
          fim("", "rede: " + (eF && eF.message || eF) + " · fetch e XHR falharam");
        });
      }
      var xhr;
      try {
        if (typeof XMLHttpRequest === "undefined") {
          viaFetch();
          return;
        }
        xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.timeout = 20000;
        xhr.onload = function () {
          if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status === 0 && xhr.responseText)) fim(xhr.responseText || "");
          else viaFetch();
        };
        xhr.onerror = function () {
          viaFetch();
        };
        xhr.ontimeout = function () {
          viaFetch();
        };
        xhr.send();
      } catch (eX) {
        viaFetch();
      }
    });
  },
  percorrer: function percorrer(lines, fn) {
    /* Fatiado por TEMPO, não por contagem: cada bloco roda até ~12 ms e cede a
       main thread — o foco do controle continua respondendo durante a indexação
       do fichas (4,4 MB). Lotes fixos de 200 linhas engarrafavam a abertura:
       cada yield volta clamped a ~4 ms pelo Chrome (~200 pausas por arquivo). */
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var passo, i, t0;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            passo = 2000;
            i = 0;
            t0 = Date.now();
          case 1:
            if (!(i < lines.length)) {
              _context2.n = 3;
              break;
            }
            fn(lines[i]);
            if (!((i + 1) % passo === 0 || Date.now() - t0 > 12)) {
              _context2.n = 2;
              break;
            }
            _context2.n = 2;
            return new Promise(function (r) {
              setTimeout(function () {
                t0 = Date.now();
                r();
              }, 0);
            });
          case 2:
            i++;
            _context2.n = 1;
            break;
          case 3:
            return _context2.a(2);
        }
      }, _callee2);
    }))();
  },
  _indexWorker: null,
  _indexWorkerFalhou: false,
  _indexReqId: 0,
  _indexFila: [],
  _indexAplicando: false,
  _indexFimCb: null,
  /* Indexação em Web Worker: o parse de ~95 mil títulos custava 11,2s de
     main thread na TV (foco engarrafado). O worker parseia em paralelo e
     devolve as estruturas via structured clone (referências preservadas).
     Sem Worker (webOS antigo) ou em erro: cai no parse local fatiado. */
  indexarIds: function indexarIds(text) {
    var self = this;
    if (this._indexWorkerFalhou || typeof Worker === "undefined") {
      return this.indexarIdsMain(text);
    }
    return this.indexarViaWorker(text).catch(function () {
      self._indexWorkerFalhou = true;
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "indice worker falhou; parse local");
      return self.indexarIdsMain(text);
    });
  },
  indexarViaWorker: function indexarViaWorker(text) {
    var self = this;
    return new Promise(function (resolve, reject) {
      /* Chrome 38 (webOS 3) rejeita function declarada dentro de try. */
      var vigilante = null;
      function rearmar() {
        if (vigilante) clearTimeout(vigilante);
        vigilante = setTimeout(function () {
          if (self._indexWorker) {
            self._indexWorker.terminate();
            self._indexWorker = null;
          }
          reject(new Error("worker sem resposta"));
        }, 90000);
      }
      try {
        if (!self._indexWorker) {
          self._indexWorker = new Worker("js/ficha-index-worker.js?v=xt138");
        }
        var w = self._indexWorker;
        var reqId = ++self._indexReqId;
        rearmar();
        var handler = function (ev) {
          var d = ev.data || {};
          if (d.cmd === "indice-chunk" && d.reqId === reqId) {
            rearmar();
            if (d.inicio) self.aplicarInicioIndice(d);
            self._indexFila.push(d);
            self._bombaIndice();
            return;
          }
          if (d.cmd === "indexado-fim" && d.reqId === reqId) {
            w.removeEventListener("message", handler);
            if (vigilante) clearTimeout(vigilante);
            self._genCache.f = null;
            self._genCache.s = null;
            var fechar = function fechar() {
              if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "indice worker: " + (d.ms || 0) + "ms parse · " + (d.total || 0) + " titulos · entregue em blocos");
              resolve(d.ms || 0);
            };
            if (self._indexFila.length || self._indexAplicando) self._indexFimCb = fechar;
            else fechar();
          }
        };
        w.addEventListener("message", handler);
        w.postMessage({
          cmd: "indexar",
          reqId: reqId,
          texto: String(text || ""),
          posterBase: self.posterBase
        });
      } catch (eW) {
        reject(eW);
      }
    });
  },
  aplicarInicioIndice: function aplicarInicioIndice(d) {
    /* Mapas zerados com protótipo nulo (títulos viram chaves — sem risco de
       colisão com Object.prototype) e reconstruídos por bloco: o structured
       clone de um pacote único deserializava 3,3s de uma vez na main thread. */
    this.posterBase = String(d.posterBase || this.posterBase);
    this.ids.f = Object.create(null);
    this.ids.s = Object.create(null);
    this.meta.f = Object.create(null);
    this.meta.s = Object.create(null);
    this.byTmdb.f = Object.create(null);
    this.byTmdb.s = Object.create(null);
    this.lista.f = [];
    this.lista.s = [];
    this._indexFila = [];
    this._indexAplicando = false;
  },
  aplicarChunkIndice: function aplicarChunkIndice(d) {
    var ids = this.ids[d.tipo];
    var meta = this.meta[d.tipo];
    var lista = this.lista[d.tipo];
    var byTmdb = this.byTmdb[d.tipo];
    var itens = d.itens || [];
    /* Pré-aquece o memo do fold com as chaves que o worker já calculou —
       as consultas posteriores (itemTemPlay, conjunto) viram hit. */
    if (this._foldCache === null) this._foldCache = Object.create(null);
    for (var w = 0; w < itens.length; w++) {
      var pw = itens[w];
      if (this._foldCache[pw.t] === undefined) this._foldCache[pw.t] = pw.f;
    }
    for (var i = 0; i < itens.length; i++) {
      var it = itens[i];
      if (it.id) {
        ids[it.t] = it.id;
        ids[it.sa] = it.id;
        ids[it.f] = it.id;
      }
      if (!it.c && !it.g) continue;
      var rec = {
        tmdb: it.id,
        titulo: it.t,
        ano: it.a,
        capa: it.c,
        generos: it.g || []
      };
      meta[it.f] = rec;
      lista.push(rec);
      if (it.id) byTmdb[it.id] = rec;
    }
  },
  _bombaIndice: function _bombaIndice() {
    if (this._indexAplicando) return;
    var d = this._indexFila.shift();
    if (!d) {
      if (this._indexFimCb) {
        var cb = this._indexFimCb;
        this._indexFimCb = null;
        cb();
      }
      return;
    }
    this._indexAplicando = true;
    this.aplicarChunkIndice(d);
    this._indexAplicando = false;
    var self = this;
    setTimeout(function () {
      self._bombaIndice();
    }, 16);
  },
  indexarIdsMain: function indexarIdsMain(text) {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var lines;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            lines = String(text).split("\n");
            _this.lista.f = [];
            _this.lista.s = [];
            _this.byTmdb.f = Object.create(null);
            _this.byTmdb.s = Object.create(null);
            _this._genCache.f = null;
            _this._genCache.s = null;
            _context3.n = 1;
            return _this.percorrer(lines, function (line) {
              if (!line || line.charCodeAt(0) === 35) return;
              if (line.indexOf("capa:") === 0) {
                var base = line.replace(/^capa:\s*/, "").trim();
                if (base) _this.posterBase = base;
                return;
              }
              var cols = line.split("\t");
              if (cols.length < 3) return;
              var tipo = cols[0].trim();
              if (tipo !== "f" && tipo !== "s") return;
              var titulo = cols[1].trim();
              var id = parseInt(cols[2], 10);
              if (!titulo) return;
              if (id) {
                var bucket = tipo === "s" ? _this.ids.s : _this.ids.f;
                bucket[titulo] = id;
                bucket[_this.semAno(titulo)] = id;
                bucket[_this.fold(titulo)] = id;
              }
              var poster = cols[3] ? cols[3].trim() : "";
              var generos = (cols[4] || "").split(",").map(function (s) {
                return s.trim();
              }).filter(Boolean);
              if (!poster && !generos.length) return;
              var anoM = titulo.match(/\((\d{4})\)\s*$/);
              var rec = {
                tmdb: id || 0,
                titulo: titulo,
                ano: anoM ? parseInt(anoM[1], 10) : 0,
                capa: poster ? poster.indexOf("http") === 0 ? poster : _this.posterBase + poster : "",
                generos: generos
              };
              var meta = tipo === "s" ? _this.meta.s : _this.meta.f;
              meta[_this.fold(titulo)] = rec;
              meta[_this.fold(_this.semAno(titulo))] = rec;
              _this.lista[tipo].push(rec);
              if (id) _this.byTmdb[tipo][id] = rec;
            });
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  pessoaFoto: function pessoaFoto(path) {
    if (!path) return "";
    if (path.indexOf("http") === 0) return path;
    return this.IMG + "w342" + path;
  },
  parseElenco: function parseElenco(txt) {
    var _this2 = this;
    return String(txt || "").split("||").map(function (p) {
      var bits = p.split("|").map(function (s) {
        return s.trim();
      });
      return {
        id: 0,
        nome: bits[0] || "",
        papel: bits[1] || "",
        foto: _this2.pessoaFoto(bits[2] || "")
      };
    }).filter(function (p) {
      return p.nome;
    });
  },
  indexarSinopses: function indexarSinopses(text) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var lines;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            lines = String(text).split("\n");
            _context4.n = 1;
            return _this3.percorrer(lines, function (line) {
              if (!line || line.charCodeAt(0) === 35) return;
              var cols = line.split("\t");
              if (cols.length < 10) return;
              var tipo = cols[0].trim();
              var titulo = cols[1].trim();
              var isSeries = tipo === "s";
              var ficha = {
                tmdb: parseInt(cols[2], 10) || 0,
                titulo: titulo,
                ano: cols[3] || "",
                duracao: parseInt(cols[4], 10) || 0,
                nota: parseFloat(cols[5]) || 0,
                votos: 0,
                generos: (cols[6] || "").split(",").map(function (s) {
                  return s.trim();
                }).filter(Boolean),
                assinatura: cols[7] || "",
                roteiro: "",
                produtora: "",
                elenco: _this3.parseElenco(cols[8]),
                sinopse: cols.slice(9).join("\t").trim(),
                frase: "",
                classificacao: "",
                capa: "",
                fundo: "",
                temporadas: 0,
                logo: "",
                local: true
              };
              var ck = _this3.chave(titulo, isSeries);
              if (_this3.locais[ck]) return;
              _this3.locais[ck] = ficha;
              if (ficha.tmdb) {
                var bucket = isSeries ? _this3.ids.s : _this3.ids.f;
                bucket[titulo] = ficha.tmdb;
                bucket[_this3.fold(titulo)] = ficha.tmdb;
              }
            });
          case 1:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  indexarEps: function indexarEps(text) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var lines;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            lines = String(text).split("\n");
            _context5.n = 1;
            return _this4.percorrer(lines, function (line) {
              if (!line || line.charCodeAt(0) === 35) return;
              var cols = line.split("\t");
              if (cols.length < 4) return;
              var serie = cols[0].trim();
              var t = parseInt(cols[1], 10);
              var e = parseInt(cols[2], 10);
              var marca = _this4.fold(serie) + "|" + t;
              if (!_this4.eps[marca]) _this4.eps[marca] = {};
              _this4.eps[marca][e] = {
                nome: cols[3] || "",
                duracao: parseInt(cols[4], 10) || 0,
                sinopse: cols.slice(5).join("\t").trim(),
                imagem: ""
              };
            });
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  },
  ensureIndex: function ensureIndex() {
    var _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!_this5.loaded) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2, Promise.resolve());
          case 1:
            if (!_this5.loading) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, _this5.loading);
          case 2:
            _this5.loading = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
              var local, remoto, sin, eps, t0Idx, t0Fetch;
              return _regenerator().w(function (_context6) {
                while (1) switch (_context6.n) {
                  case 0:
                    t0Idx = Date.now();
                    t0Fetch = Date.now();
                    _context6.n = 1;
                    return _this5.texto(_this5.FICHAS_LOCAL);
                  case 1:
                    local = _context6.v;
                    if (local && window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "fichas fetch: " + (Date.now() - t0Fetch) + "ms · " + Math.round(local.length / 1024) + "KB");
                    if (!local) {
                      _context6.n = 3;
                      break;
                    }
                    _context6.n = 2;
                    return _this5.indexarIds(local);
                  case 2:
                    _this5.atualizarIndiceSegundoPlano(local);
                    _context6.n = 5;
                    break;
                  case 3:
                    _context6.n = 4;
                    return _this5.texto(_this5.FICHAS_URL);
                  case 4:
                    remoto = _context6.v;
                    if (!remoto) {
                      _context6.n = 5;
                      break;
                    }
                    _context6.n = 5;
                    return _this5.indexarIds(remoto);
                  case 5:
                    _context6.n = 6;
                    return _this5.texto(_this5.SINOPSES);
                  case 6:
                    sin = _context6.v;
                    if (sin) {
                      _this5.atualizarSinopsesSegundoPlano(sin);
                      _context6.n = 8;
                      break;
                    }
                    _context6.n = 7;
                    return _this5.texto(_this5.SINOPSES_URL);
                  case 7:
                    sin = _context6.v;
                  case 8:
                    if (!sin) {
                      _context6.n = 9;
                      break;
                    }
                    _context6.n = 9;
                    return _this5.indexarSinopses(sin);
                  case 9:
                    _context6.n = 10;
                    return _this5.texto(_this5.SERIES_EPS);
                  case 10:
                    eps = _context6.v;
                    if (!eps) {
                      _context6.n = 11;
                      break;
                    }
                    _context6.n = 11;
                    return _this5.indexarEps(eps);
                  case 11:
                    if (Object.keys(_this5.ids.f).length + Object.keys(_this5.ids.s).length) {
                      _this5.loaded = true;
                      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "fichas total: " + (Date.now() - t0Idx) + "ms (fetch+worker+sinopses/eps)");
                    } else {
                      /* Local e CDN falharam: nao marca carregado — com indice vazio
                         ficariam zeros nos generos e capas para sempre. Limpa 'loading'
                         para retentar na proxima abertura e deixa a causa no Diagnostico. */
                      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("fichas_vazio", "fichas local e CDN falharam; indice vazio (vai retentar)");
                      _this5.loading = null;
                    }
                    return _context6.a(2);
                }
              }, _callee6);
            }))().catch(function () {
              _this5.loading = null;
            });
            return _context7.a(2, _this5.loading);
        }
      }, _callee7);
    }))();
  },
  atualizarIndiceSegundoPlano: function atualizarIndiceSegundoPlano(local) {
    var self = this;
    /* Reindexar o fichas do CDN (4,4 MB) custa segundos de main thread na TV.
       O índice local do IPK já cobre a abertura: refresca só a cada 6 h E fora
       da janela de arranque (2 min após o boot) — na 1ª abertura pós-instalação
       o refresh dobrava o trabalho justo quando o foco precisava responder. */
    try {
      var ultima = parseInt(localStorage.getItem("saimo_fichas_ultima"), 10) || 0;
      if (Date.now() - ultima < 6 * 60 * 60 * 1000) return;
    } catch (eTs) {}
    setTimeout(function () {
      self.texto(self.FICHAS_URL).then(function (remoto) {
        if (!remoto || remoto.length < String(local || "").length + 80) return null;
        try {
          localStorage.setItem("saimo_fichas_ultima", String(Date.now()));
        } catch (eTs2) {}
        return self.indexarIds(remoto);
      }).catch(function () {});
    }, 120000);
  },
  atualizarSinopsesSegundoPlano: function atualizarSinopsesSegundoPlano(local) {
    var self = this;
    this.texto(this.SINOPSES_URL).then(function (remoto) {
      if (!remoto || remoto.length < String(local || "").length + 80) return null;
      return self.indexarSinopses(remoto);
    }).catch(function () {});
  },
  tmdbId: function tmdbId(title, isSeries) {
    var bucket = isSeries ? this.ids.s : this.ids.f;
    return bucket[title] || bucket[this.semAno(title)] || bucket[this.fold(title)] || 0;
  },
  buscarId: function buscarId(title, isSeries) {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var direto, limpo, ano, tipo, campo, queries, lista, i, json, alvo, certo, id, bucket;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            direto = _this6.tmdbId(title, isSeries);
            if (!direto) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, direto);
          case 1:
            limpo = _this6.semAno(title);
            ano = (String(title).match(/\((\d{4})\)/) || [])[1] || "";
            tipo = isSeries ? "tv" : "movie";
            campo = isSeries ? "name" : "title";
            queries = [_this6.urlTmdb("/search/" + tipo, "language=pt-BR&query=" + encodeURIComponent(limpo) + (ano ? (isSeries ? "&first_air_date_year=" : "&year=") + ano : "")), _this6.urlTmdb("/search/" + tipo, "language=en-US&query=" + encodeURIComponent(limpo))];
            lista = [];
            i = 0;
          case 2:
            if (!(i < queries.length && !lista.length)) {
              _context8.n = 5;
              break;
            }
            _context8.n = 3;
            return _this6.pedir(queries[i]);
          case 3:
            json = _context8.v;
            lista = json && json.results || [];
          case 4:
            i++;
            _context8.n = 2;
            break;
          case 5:
            if (lista.length) {
              _context8.n = 6;
              break;
            }
            return _context8.a(2, 0);
          case 6:
            alvo = _this6.fold(title);
            certo = lista.find(function (r) {
              return _this6.fold(r[campo] || r.original_title || r.original_name || "") === alvo;
            }) || lista[0];
            id = certo && certo.id ? certo.id : 0;
            if (id) {
              bucket = isSeries ? _this6.ids.s : _this6.ids.f;
              bucket[title] = id;
              bucket[_this6.fold(title)] = id;
            }
            return _context8.a(2, id);
        }
      }, _callee8);
    }))();
  },
  posterDe: function posterDe(titulo, isSeries) {
    var _this7 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var q, ck, doDisco, marca, fichaDisco, direta, local, tipo, json, lista, hit, url;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            q = _this7.semAno(titulo);
            if (!(!q || q.length < 3)) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2, "");
          case 1:
            ck = _this7.chave(titulo, !!isSeries);
            if (!(_this7.posterCache[ck] !== undefined)) {
              _context9.n = 2;
              break;
            }
            return _context9.a(2, _this7.posterCache[ck]);
          case 2:
            doDisco = _this7.capaSalva(ck);
            if (!doDisco) {
              _context9.n = 3;
              break;
            }
            _this7.posterCache[ck] = doDisco;
            return _context9.a(2, doDisco);
          case 3:
            marca = (isSeries ? "s:" : "f:") + titulo;
            fichaDisco = _this7.fichaSalva(marca);
            if (!(fichaDisco && fichaDisco.capa)) {
              _context9.n = 4;
              break;
            }
            _this7.posterCache[ck] = fichaDisco.capa;
            return _context9.a(2, fichaDisco.capa);
          case 4:
            _context9.n = 5;
            return _this7.ensureIndex();
          case 5:
            direta = _this7.capaDe(titulo, !!isSeries);
            if (!direta) {
              _context9.n = 6;
              break;
            }
            _this7.posterCache[ck] = direta;
            return _context9.a(2, direta);
          case 6:
            local = _this7.localDe(titulo, !!isSeries);
            if (!(local && local.capa)) {
              _context9.n = 7;
              break;
            }
            _this7.posterCache[ck] = local.capa;
            return _context9.a(2, local.capa);
          case 7:
            if (!(_this7.cache[marca] && _this7.cache[marca].capa)) {
              _context9.n = 8;
              break;
            }
            _this7.posterCache[ck] = _this7.cache[marca].capa;
            return _context9.a(2, _this7.cache[marca].capa);
          case 8:
            tipo = isSeries ? "tv" : "movie";
            _context9.n = 9;
            return _this7.pedir(_this7.urlTmdb("/search/" + tipo, "language=pt-BR&query=" + encodeURIComponent(q)));
          case 9:
            json = _context9.v;
            if (json) {
              _context9.n = 10;
              break;
            }
            return _context9.a(2, "");
          case 10:
            lista = json.results || [];
            hit = lista.find(function (r) {
              return r.poster_path;
            }) || lista[0];
            url = hit && hit.poster_path ? _this7.IMG + "w342" + hit.poster_path : "";
            if (url) {
              _this7.posterCache[ck] = url;
              _this7.gravarCapa(ck, url);
            }
            return _context9.a(2, url);
        }
      }, _callee9);
    }))();
  },
  urlTmdb: function urlTmdb(path, extra) {
    var p = String(path || "");
    if (p.charAt(0) !== "/") p = "/" + p;
    var qs = extra ? "&" + String(extra).replace(/^\?/, "").replace(/^&/, "") : "";
    return this.PROXY + "/tmdb?p=" + encodeURIComponent(p) + qs;
  },
  pedir: function pedir(url) {
    var _this8 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var lista, h, u, path, i, res, _t2;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            lista = [];
            try {
              if (String(url).indexOf(_this8.PROXY) === 0) lista.push(url);
              else {
                u = new URL(url);
                h = u.hostname.toLowerCase();
                if (h === "api.themoviedb.org") {
                  path = u.pathname.replace(/^\/3/, "") || "/";
                  u.searchParams.delete("api_key");
                  lista.push(_this8.urlTmdb(path, u.search ? u.search.slice(1) : ""));
                } else lista.push(url);
              }
            } catch (e) {
              lista.push(url);
            }
            i = 0;
          case 1:
            if (!(i < lista.length)) {
              _context0.n = 8;
              break;
            }
            _context0.p = 2;
            _context0.n = 3;
            /* Timeout 12s: sem isso um fetch pendurado da TMDB ocupa os slots
               de capa para sempre e a fila inteira para (foto da TV: 4 capas
               carregadas, 2 eternamente vazias). */
            return new Promise(function (resolveT) {
              var ctrl = typeof AbortController === "function" ? new AbortController() : null;
              var t = setTimeout(function () {
                if (ctrl) {
                  try { ctrl.abort(); } catch (eA) {}
                }
                resolveT(null);
              }, 12000);
              fetch(lista[i], ctrl ? { signal: ctrl.signal } : {}).then(function (rT) {
                clearTimeout(t);
                resolveT(rT);
              }, function () {
                clearTimeout(t);
                resolveT(null);
              });
            });
          case 3:
            res = _context0.v;
            if (res.ok) {
              _context0.n = 4;
              break;
            }
            return _context0.a(3, 7);
          case 4:
            _context0.n = 5;
            return res.json();
          case 5:
            return _context0.a(2, _context0.v);
          case 6:
            _context0.p = 6;
            _t2 = _context0.v;
          case 7:
            i++;
            _context0.n = 1;
            break;
          case 8:
            return _context0.a(2, null);
        }
      }, _callee0, null, [[2, 6]]);
    }))();
  },
  lancamentosCache: null,
  lancamentosEm: 0,
  lancamentosFilmes: function lancamentosFilmes() {
    var self = this;
    if (this.lancamentosCache && Date.now() - this.lancamentosEm < 6 * 3600 * 1000) {
      return Promise.resolve(this.lancamentosCache);
    }
    var qs = "language=pt-BR&page=1";
    var urls = [
      this.urlTmdb("/movie/now_playing", qs + "&region=BR"),
      this.urlTmdb("/movie/upcoming", qs + "&region=BR"),
      this.urlTmdb("/trending/movie/week", qs)
    ];
    return Promise.all(urls.map(function (u) {
      return self.pedir(u);
    })).then(function (resps) {
      var seen = {};
      var out = [];
      (resps || []).forEach(function (json) {
        ((json && json.results) || []).forEach(function (r) {
          if (!r || !r.id || seen[r.id]) return;
          seen[r.id] = 1;
          var titulo = r.title || r.original_title || "";
          if (!titulo) return;
          out.push({
            tmdb: r.id,
            title: titulo,
            original: r.original_title || titulo,
            year: String(r.release_date || "").slice(0, 4),
            overview: r.overview || "",
            poster: r.poster_path ? self.IMG + "w342" + r.poster_path : "",
            backdrop: r.backdrop_path ? self.IMG + "w780" + r.backdrop_path : "",
            nota: r.vote_average || 0
          });
        });
      });
      self.lancamentosCache = out;
      self.lancamentosEm = Date.now();
      return out;
    }).catch(function () {
      return self.lancamentosCache || [];
    });
  },
  classificacaoBR: function classificacaoBR(json, isSeries) {
    if (isSeries) {
      var _listas = json.content_ratings && json.content_ratings.results || [];
      var _br = _listas.find(function (x) {
        return x.iso_3166_1 === "BR";
      });
      return _br && _br.rating || "";
    }
    var listas = json.release_dates && json.release_dates.results || [];
    var br = listas.find(function (x) {
      return x.iso_3166_1 === "BR";
    });
    var datas = br && br.release_dates || [];
    var cert = datas.map(function (d) {
      return d.certification;
    }).find(function (c) {
      return c;
    });
    return cert || "";
  },
  logoDe: function logoDe(json) {
    var _this9 = this;
    var logos = json.images && json.images.logos || [];
    var _loop = function _loop() {
        var lingua = _arr[_i];
        var achada = logos.find(function (l) {
          return (l.iso_639_1 || "") === lingua;
        });
        if (achada && achada.file_path) return {
          v: _this9.IMG + "w500" + achada.file_path
        };
      },
      _ret;
    for (var _i = 0, _arr = ["pt", "en", ""]; _i < _arr.length; _i++) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
    return "";
  },
  lerDisco: function lerDisco() {
    if (this.disco) return this.disco;
    var vazio = {
      fichas: {},
      temps: {},
      capas: {}
    };
    try {
      var fichas = JSON.parse(localStorage.getItem(this.DISCO_FICHAS) || "{}");
      var temps = JSON.parse(localStorage.getItem(this.DISCO_TEMPS) || "{}");
      var capas = JSON.parse(localStorage.getItem(this.DISCO_CAPAS) || "{}");
      vazio.fichas = fichas && typeof fichas === "object" ? fichas : {};
      vazio.temps = temps && typeof temps === "object" ? temps : {};
      vazio.capas = capas && typeof capas === "object" ? capas : {};
    } catch (e) {}
    this.disco = vazio;
    return vazio;
  },
  podarMapa: function podarMapa(mapa, max) {
    var chaves = Object.keys(mapa || {});
    if (chaves.length <= max) return;
    chaves.sort(function (a, b) {
      return (mapa[a] && mapa[a].at || 0) - (mapa[b] && mapa[b].at || 0);
    });
    var sobra = chaves.length - Math.floor(max * 0.8);
    for (var i = 0; i < sobra; i++) delete mapa[chaves[i]];
  },
  gravarDisco: function gravarDisco() {
    var d = this.lerDisco();
    if (!d.capas) d.capas = {};
    this.podarMapa(d.fichas, this.MAX_FICHAS);
    this.podarMapa(d.temps, this.MAX_TEMPS);
    this.podarMapa(d.capas, this.MAX_CAPAS);
    try {
      localStorage.setItem(this.DISCO_FICHAS, JSON.stringify(d.fichas));
      localStorage.setItem(this.DISCO_TEMPS, JSON.stringify(d.temps));
      localStorage.setItem(this.DISCO_CAPAS, JSON.stringify(d.capas));
    } catch (e) {
      this.podarMapa(d.fichas, Math.floor(this.MAX_FICHAS / 2));
      this.podarMapa(d.temps, Math.floor(this.MAX_TEMPS / 2));
      this.podarMapa(d.capas, Math.floor(this.MAX_CAPAS / 2));
      try {
        localStorage.setItem(this.DISCO_FICHAS, JSON.stringify(d.fichas));
        localStorage.setItem(this.DISCO_TEMPS, JSON.stringify(d.temps));
        localStorage.setItem(this.DISCO_CAPAS, JSON.stringify(d.capas));
      } catch (e2) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "ficha_cache: " + ((e2 && e2.message) || ""));
      }
    }
  },
  fichaSalva: function fichaSalva(marca) {
    var rec = this.lerDisco().fichas[marca];
    return rec && rec.v && rec.v.deTmdb ? rec.v : null;
  },
  gravarFicha: function gravarFicha(marca, ficha) {
    if (!ficha || !ficha.deTmdb) return;
    var d = this.lerDisco();
    d.fichas[marca] = {
      at: Date.now(),
      v: ficha
    };
    this.gravarDisco();
  },
  tempSalva: function tempSalva(marca) {
    var rec = this.lerDisco().temps[marca];
    return rec && rec.v ? rec.v : null;
  },
  gravarTemp: function gravarTemp(marca, saida) {
    if (!marca || !saida) return;
    var d = this.lerDisco();
    d.temps[marca] = {
      at: Date.now(),
      v: saida
    };
    this.gravarDisco();
  },
  capaSalva: function capaSalva(chave) {
    var rec = this.lerDisco().capas && this.lerDisco().capas[chave];
    return rec && rec.v ? rec.v : "";
  },
  gravarCapa: function gravarCapa(chave, url) {
    if (!chave || !url) return;
    var d = this.lerDisco();
    if (!d.capas) d.capas = {};
    d.capas[chave] = {
      at: Date.now(),
      v: url
    };
    this.gravarDisco();
  },
  localDe: function localDe(title, isSeries) {
    return this.locais[this.chave(title, isSeries)] || null;
  },
  metaDe: function metaDe(title, isSeries) {
    var bucket = isSeries ? this.meta.s : this.meta.f;
    return bucket[this.fold(title)] || bucket[this.fold(this.semAno(title))] || null;
  },
  capaDe: function capaDe(title, isSeries) {
    var m = this.metaDe(title, isSeries);
    if (m && m.capa) return m.capa;
    var local = this.localDe(title, isSeries);
    return local && local.capa || "";
  },
  generosDe: function generosDe(title, isSeries) {
    var m = this.metaDe(title, isSeries);
    if (m && m.generos && m.generos.length) return m.generos;
    var local = this.localDe(title, isSeries);
    return local && local.generos || [];
  },
  nomeGenero: function nomeGenero(g, isSeries) {
    g = String(g || "").trim();
    if (g === "Thriller") return "Suspense";
    if (g === "Kids") return "Infantil";
    if (g === "Soap") return "Novela";
    if (isSeries) {
      if (g === "Sci-Fi & Fantasy" || g === "Ficção científica") return "Ficção e fantasia";
      if (g === "Action & Adventure") return "Ação e aventura";
      return g;
    }
    if (g === "Sci-Fi & Fantasy" || g === "Ficção e fantasia") return "Ficção científica";
    if (g === "Action & Adventure" || g === "Ação e aventura") return "Ação";
    return g;
  },
  recsDe: function recsDe(isSeries) {
    return this.lista && this.lista[isSeries ? "s" : "f"] || [];
  },
  indiceGeneros: function indiceGeneros(isSeries) {
    var k = isSeries ? "s" : "f";
    if (this._genCache[k]) return this._genCache[k];
    var map = Object.create(null);
    var arr = this.recsDe(isSeries);
    for (var i = 0; i < arr.length; i++) {
      var rec = arr[i];
      var gens = rec && rec.generos || [];
      var visto = Object.create(null);
      for (var g = 0; g < gens.length; g++) {
        var nome = this.nomeGenero(gens[g], isSeries);
        if (!nome || visto[nome]) continue;
        visto[nome] = 1;
        if (!map[nome]) map[nome] = [];
        map[nome].push(rec);
      }
    }
    /* Não ordena todos os gêneros aqui: na TV isso travava ~11s. Cada
       gênero só é ordenado na primeira listarPorGenero daquele nome. */
    this._genCache[k] = map;
    return map;
  },
  recPassaGenero: function recPassaGenero(rec, genero, isSeries) {
    if (!rec || !genero) return false;
    var alvo = this.nomeGenero(genero, isSeries);
    var gens = rec.generos || [];
    for (var i = 0; i < gens.length; i++) {
      if (this.nomeGenero(gens[i], isSeries) === alvo) return true;
    }
    return false;
  },
  recPassaDecada: function recPassaDecada(rec, faixa) {
    var y = rec && rec.ano || 0;
    if (!y) return false;
    if (faixa === 2020) return y >= 2020 && y < 2030;
    if (faixa === 2010) return y >= 2010 && y < 2020;
    if (faixa === 2000) return y >= 2000 && y < 2010;
    if (faixa === 1990) return y >= 1990 && y < 2000;
    if (faixa === 1980) return y >= 1980 && y < 1990;
    if (faixa === 1979) return y > 0 && y < 1980;
    return false;
  },
  recPassaCombo: function recPassaCombo(rec, nomes, isSeries) {
    if (!rec || !nomes || !nomes.length) return false;
    for (var i = 0; i < nomes.length; i++) {
      if (this.recPassaGenero(rec, nomes[i], isSeries)) return true;
    }
    return false;
  },
  ordenarRecs: function ordenarRecs(arr) {
    /* localeCompare("pt-BR") por comparação custava ~3-8s na TV (milhões de
       comparações ao montar os índices de gênero). Chave pré-computada no
       próprio rec + comparação de string pura: ~50x mais rápido. */
    for (var i = 0; i < arr.length; i++) {
      var r = arr[i];
      if (r && r._chaveOrd === undefined) r._chaveOrd = String(r.titulo || "").toLowerCase();
    }
    arr.sort(function (a, b) {
      var ka = a._chaveOrd || "";
      var kb = b._chaveOrd || "";
      return (b.ano || 0) - (a.ano || 0) || (ka < kb ? -1 : ka > kb ? 1 : 0);
    });
    return arr;
  },
  listar: function listar(isSeries, pred, limite, soComCapa) {
    var arr = this.recsDe(isSeries);
    var out = [];
    var extra = [];
    for (var i = 0; i < arr.length; i++) {
      var rec = arr[i];
      if (pred && !pred(rec)) continue;
      if (soComCapa && !rec.capa) {
        extra.push(rec);
        continue;
      }
      out.push(rec);
    }
    if (soComCapa && limite && out.length < limite) {
      for (var j = 0; j < extra.length && out.length < limite; j++) out.push(extra[j]);
    }
    this.ordenarRecs(out);
    if (limite) out = out.slice(0, limite);
    return out;
  },
  indexarPlataformas: function indexarPlataformas(text) {
    var self = this;
    this.plats = { f: Object.create(null), s: Object.create(null) };
    this.ordemPlats = [];
    String(text || "").split("\n").forEach(function (raw) {
      var line = raw.trim();
      if (!line) return;
      var cols = line.split("\t");
      if (cols[0] === "ordem") {
        self.ordemPlats = cols.slice(1).filter(Boolean);
        return;
      }
      if (line.charAt(0) === "#") return;
      var nome = cols[0];
      var tipo = cols[1];
      if ((tipo !== "f" && tipo !== "s") || !nome) return;
      var recs = [];
      var visto = Object.create(null);
      var i, id, rec;
      for (i = 2; i < cols.length; i++) {
        id = parseInt(cols[i], 10);
        if (!id || visto[id]) continue;
        rec = self.byTmdb[tipo][id];
        if (!rec) continue;
        visto[id] = 1;
        recs.push(rec);
      }
      if (!recs.length) return;
      self.ordenarRecs(recs);
      self.plats[tipo][nome] = recs;
      if (self.ordemPlats.indexOf(nome) < 0) self.ordemPlats.push(nome);
    });
  },
  listarPorPlataforma: function listarPorPlataforma(isSeries, nome) {
    var tipo = isSeries ? "s" : "f";
    return (this.plats[tipo] && this.plats[tipo][nome]) || [];
  },
  listarPorGenero: function listarPorGenero(isSeries, genero, limite, soComCapa) {
    var alvo = this.nomeGenero(genero, isSeries);
    var lista = this.indiceGeneros(isSeries)[alvo] || [];
    if (!soComCapa && !limite) {
      if (!lista._ord) {
        this.ordenarRecs(lista);
        lista._ord = 1;
      }
      return lista;
    }
    var out = [];
    for (var i = 0; i < lista.length; i++) {
      if (soComCapa && !(lista[i] && lista[i].capa)) continue;
      out.push(lista[i]);
      if (limite && lista._ord && out.length >= limite) break;
    }
    if (limite && !lista._ord) {
      out.sort(function (a, b) {
        return (b.ano || 0) - (a.ano || 0);
      });
      if (out.length > limite) out = out.slice(0, limite);
    }
    return out;
  },
  listarPorDecada: function listarPorDecada(isSeries, faixa, limite, soComCapa) {
    var self = this;
    return this.listar(isSeries, function (rec) {
      return self.recPassaDecada(rec, faixa);
    }, limite, soComCapa);
  },
  listarCombo: function listarCombo(isSeries, nomes, limite, soComCapa) {
    var self = this;
    return this.listar(isSeries, function (rec) {
      return self.recPassaCombo(rec, nomes, isSeries);
    }, limite, soComCapa);
  },
  cardDeRec: function cardDeRec(rec, isSeries) {
    if (!rec) return null;
    return {
      type: isSeries ? "series" : "movie",
      title: rec.titulo,
      name: rec.titulo,
      year: rec.ano ? String(rec.ano) : "",
      posterUrl: rec.capa || "",
      sources: []
    };
  },
  de: function de(title, isSeries) {
    var _this0 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var marca, salva, local, id, tipo, extras, url, json, overview, en, crew, direcao, criadores, roteiro, prod, vids, trailer, ficha, _t3, _t4;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            marca = (isSeries ? "s:" : "f:") + title;
            if (!(_this0.cache[marca] && _this0.cache[marca].deTmdb)) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2, _this0.cache[marca]);
          case 1:
            salva = _this0.fichaSalva(marca);
            if (!salva) {
              _context1.n = 2;
              break;
            }
            _this0.cache[marca] = salva;
            return _context1.a(2, salva);
          case 2:
            _context1.n = 3;
            return _this0.ensureIndex();
          case 3:
            local = _this0.localDe(title, isSeries);
            _context1.p = 4;
            _t3 = local && local.tmdb;
            if (_t3) {
              _context1.n = 6;
              break;
            }
            _context1.n = 5;
            return _this0.buscarId(title, isSeries);
          case 5:
            _t3 = _context1.v;
          case 6:
            id = _t3;
            if (id) {
              _context1.n = 8;
              break;
            }
            if (!(local && local.sinopse)) {
              _context1.n = 7;
              break;
            }
            _this0.cache[marca] = local;
            return _context1.a(2, local);
          case 7:
            return _context1.a(2, null);
          case 8:
            tipo = isSeries ? "tv" : "movie";
            extras = isSeries ? "credits,content_ratings,images,videos" : "credits,release_dates,images,videos";
            url = _this0.urlTmdb("/" + tipo + "/" + id, "language=pt-BR&append_to_response=" + extras + "&include_image_language=pt,en,null");
            _context1.n = 9;
            return _this0.pedir(url);
          case 9:
            json = _context1.v;
            if (json) {
              _context1.n = 11;
              break;
            }
            if (!(local && local.sinopse)) {
              _context1.n = 10;
              break;
            }
            _this0.cache[marca] = local;
            return _context1.a(2, local);
          case 10:
            return _context1.a(2, null);
          case 11:
            overview = json.overview || local && local.sinopse || "";
            if (overview) {
              _context1.n = 13;
              break;
            }
            _context1.n = 12;
            return _this0.pedir(_this0.urlTmdb("/" + tipo + "/" + id, "language=en-US"));
          case 12:
            en = _context1.v;
            if (en && en.overview) overview = en.overview;
          case 13:
            crew = json.credits && json.credits.crew || [];
            direcao = crew.filter(function (c) {
              return c.job === "Director";
            }).map(function (c) {
              return c.name;
            }).filter(Boolean);
            criadores = (json.created_by || []).map(function (c) {
              return c.name;
            }).filter(Boolean);
            roteiro = crew.filter(function (c) {
              return c.job === "Screenplay" || c.job === "Writer";
            }).map(function (c) {
              return c.name;
            }).filter(Boolean);
            prod = ((json.production_companies || [])[0] || {}).name || "";
            vids = (json.videos && json.videos.results || []).filter(function (v) {
              return v.site === "YouTube" && v.key;
            });
            trailer = vids.find(function (v) {
              return v.type === "Trailer" && (v.iso_639_1 === "pt" || v.iso_639_1 === "pt-BR");
            }) || vids.find(function (v) {
              return v.type === "Trailer";
            }) || vids[0];
            ficha = {
              tmdb: id,
              titulo: json[isSeries ? "name" : "title"] || title,
              sinopse: overview,
              frase: json.tagline || "",
              nota: json.vote_average || local && local.nota || 0,
              votos: json.vote_count || 0,
              ano: String(json[isSeries ? "first_air_date" : "release_date"] || "").slice(0, 4) || local && local.ano || "",
              generos: (json.genres || []).map(function (g) {
                return g.name;
              }).filter(Boolean),
              duracao: isSeries ? (json.episode_run_time || [])[0] || local && local.duracao || 0 : json.runtime || local && local.duracao || 0,
              classificacao: _this0.classificacaoBR(json, isSeries),
              capa: json.poster_path ? _this0.IMG + "w500" + json.poster_path : "",
              fundo: json.backdrop_path ? _this0.IMG + "w1280" + json.backdrop_path : "",
              temporadas: json.number_of_seasons || 0,
              logo: _this0.logoDe(json),
              assinatura: (direcao.length ? direcao : criadores).slice(0, 2).join(", ") || local && local.assinatura || "",
              roteiro: roteiro.slice(0, 2).join(", "),
              produtora: prod,
              elenco: (json.credits && json.credits.cast || []).slice(0, 8).map(function (p) {
                return {
                  id: p.id,
                  nome: p.name || "",
                  papel: p.character || "",
                  foto: p.profile_path ? _this0.IMG + "w342" + p.profile_path : ""
                };
              }),
              deTmdb: true,
              trailer: trailer ? trailer.key : ""
            };
            if (!ficha.elenco.length && local) ficha.elenco = local.elenco;
            _this0.cache[marca] = ficha;
            _this0.gravarFicha(marca, ficha);
            return _context1.a(2, ficha);
          case 14:
            _context1.p = 14;
            _t4 = _context1.v;
            return _context1.a(2, local && local.sinopse ? local : null);
        }
      }, _callee1, null, [[4, 14]]);
    }))();
  },
  temporada: function temporada(title, numero) {
    var _this1 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var marcaLocal, salva, saida, local, id, gravar, json;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            _context10.n = 1;
            return _this1.ensureIndex();
          case 1:
            marcaLocal = _this1.fold(title) + "|" + numero;
            if (!_this1.seasonCache[marcaLocal]) {
              _context10.n = 2;
              break;
            }
            return _context10.a(2, _this1.seasonCache[marcaLocal]);
          case 2:
            salva = _this1.tempSalva(marcaLocal);
            if (!salva) {
              _context10.n = 3;
              break;
            }
            _this1.seasonCache[marcaLocal] = salva;
            return _context10.a(2, salva);
          case 3:
            saida = {};
            local = _this1.eps[marcaLocal];
            if (local) {
              Object.keys(local).forEach(function (k) {
                saida[k] = Object.assign({}, local[k]);
              });
            }
            _context10.n = 4;
            return _this1.buscarId(title, true);
          case 4:
            id = _context10.v;
            gravar = false;
            if (!id) {
              _context10.n = 6;
              break;
            }
            _context10.n = 5;
            return _this1.pedir(_this1.urlTmdb("/tv/" + id + "/season/" + numero, "language=pt-BR"));
          case 5:
            json = _context10.v;
            if (json) {
              gravar = true;
              (json.episodes || []).forEach(function (ep) {
                var n = ep.episode_number;
                if (!n) return;
                var prev = saida[n] || {};
                saida[n] = {
                  nome: prev.nome || ep.name || "",
                  sinopse: prev.sinopse || ep.overview || "",
                  imagem: prev.imagem || (ep.still_path ? _this1.IMG + "w300" + ep.still_path : ""),
                  duracao: prev.duracao || ep.runtime || 0
                };
              });
            }
          case 6:
            _this1.seasonCache[marcaLocal] = saida;
            if (gravar) _this1.gravarTemp(marcaLocal, saida);
            return _context10.a(2, saida);
        }
      }, _callee10);
    }))();
  },
  pulos: function pulos(tmdb, temporada, episodio) {
    var _this10 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var url, json, campos, trechos, _t5;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            if (tmdb) {
              _context11.n = 1;
              break;
            }
            return _context11.a(2, []);
          case 1:
            url = "https://api.theintrodb.org/v3/media?tmdb_id=" + tmdb;
            if (temporada > 0) url += "&season=" + temporada + "&episode=" + (episodio || 0);
            _context11.p = 2;
            _context11.n = 3;
            return _this10.pedir(url);
          case 3:
            json = _context11.v;
            if (json) {
              _context11.n = 4;
              break;
            }
            return _context11.a(2, []);
          case 4:
            campos = [["intro", "abertura"], ["recap", "recapitulacao"], ["credits", "creditos"], ["preview", "previa"]];
            trechos = [];
            campos.forEach(function (_ref2) {
              var campo = _ref2[0],
                tipo = _ref2[1];
              (json[campo] || []).forEach(function (item) {
                var inicio = (item.start_ms || 0) / 1000;
                var fim = item.end_ms != null ? item.end_ms / 1000 : null;
                if (fim != null && fim - inicio < 3) return;
                trechos.push({
                  tipo: tipo,
                  inicio: inicio,
                  fim: fim
                });
              });
            });
            return _context11.a(2, trechos);
          case 5:
            _context11.p = 5;
            _t5 = _context11.v;
            return _context11.a(2, []);
        }
      }, _callee11, null, [[2, 5]]);
    }))();
  }
};
window.SaimoFicha = SaimoFicha;
/* Boot antecipado do índice: roda durante a abertura da TV (a fase de dados
   não disputa decodificador com o vídeo). Sem isso o parse + entrega só
   começavam depois da intro, e a home nascia engasgando. */
if (typeof window !== "undefined" && window.SaimoFicha && !window.SaimoFicha._bootFeito) {
  window.SaimoFicha._bootFeito = true;
  window.SaimoFicha.ensureIndex().catch(function () {});
}
