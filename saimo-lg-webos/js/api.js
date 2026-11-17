"use strict";

function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Saimo TV - API & Catalogo + VOD Parser para LG webOS
 */
var SaimoAPI = {
  remoteUrl: "https://canais-saimo.pages.dev/catalogo.txt",
  localBackupUrl: "catalogo.txt",
  vodDestaquesUrl: "vod/destaques.txt",
  vodDestaquesRemote: "https://filmes-saimo.pages.dev/destaques.txt",
  vodIndiceUrl: "vod/indice.txt",
  vodRemoteBase: "https://filmes-saimo.pages.dev/",
  vodNovidadesUrl: "vod/novidades.json",
  bases: {},
  _seriesCache: Object.create(null),
  _destaquesCache: null,
  _letrasFilmes: null,
  tmdbPosterBase: "https://image.tmdb.org/t/p/w342",
  /**
   * Parse do catalogo.txt para TV Ao Vivo
   */
  parseCatalogo: function parseCatalogo(text) {
    var lines = text.split("\n");
    var channels = [];
    var categoriesSet = new Set(["Todos"]);
    var currentChannel = null;
    var currentSource = null;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line || line.charCodeAt(0) === 35) continue; // ignora vazias ou '#'

      var colonIndex = line.indexOf(":");
      if (colonIndex === -1) continue;
      var key = line.slice(0, colonIndex).trim().toLowerCase();
      var value = line.slice(colonIndex + 1).trim();
      if (key === "canal") {
        if (currentChannel && currentChannel.sources.length > 0) {
          channels.push(currentChannel);
        }
        currentChannel = {
          type: "channel",
          name: value,
          category: "Geral",
          logo: "",
          sources: []
        };
        currentSource = null;
      } else if (key === "categoria" && currentChannel) {
        currentChannel.category = value;
        categoriesSet.add(value);
      } else if (key === "logo" && currentChannel) {
        currentChannel.logo = value;
      } else if (key === "fonte" && currentChannel) {
        currentSource = {
          url: value,
          quality: "Automática",
          referer: "",
          agent: ""
        };
        currentChannel.sources.push(currentSource);
      } else if (key === "qualidade" && currentSource) {
        currentSource.quality = value;
      } else if (key === "referer" && currentSource) {
        currentSource.referer = value;
      } else if (key === "agente" && currentSource) {
        currentSource.agent = value;
      }
    }
    if (currentChannel && currentChannel.sources.length > 0) {
      channels.push(currentChannel);
    }
    return {
      channels: channels,
      categories: Array.from(categoriesSet)
    };
  },
  /**
   * Carrega os canais ao vivo
   */
  urlCatalogoCanais: function urlCatalogoCanais() {
    if (window.SaimoOficial) return SaimoOficial.urlCanais();
    return this.remoteUrl;
  },
  vodBaseAtivo: function vodBaseAtivo() {
    if (window.SaimoOficial) return SaimoOficial.urlVodBase();
    return this.vodRemoteBase;
  },
  loadChannels: function loadChannels() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var ler, remoto, local;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            ler = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, ms) {
                var controller, timeoutId, res, text, parsed, _t;
                return _regenerator().w(function (_context) {
                  while (1) switch (_context.p = _context.n) {
                    case 0:
                      controller = new AbortController();
                      timeoutId = setTimeout(function () {
                        return controller.abort();
                      }, ms);
                      _context.p = 1;
                      _context.n = 2;
                      return fetch(url, {
                        signal: controller.signal
                      });
                    case 2:
                      res = _context.v;
                      if (res.ok) {
                        _context.n = 3;
                        break;
                      }
                      return _context.a(2, null);
                    case 3:
                      _context.n = 4;
                      return res.text();
                    case 4:
                      text = _context.v;
                      parsed = _this.parseCatalogo(text);
                      return _context.a(2, parsed.channels && parsed.channels.length ? parsed : null);
                    case 5:
                      _context.p = 5;
                      _t = _context.v;
                      return _context.a(2, null);
                    case 6:
                      _context.p = 6;
                      clearTimeout(timeoutId);
                      return _context.f(6);
                    case 7:
                      return _context.a(2);
                  }
                }, _callee, null, [[1, 5, 6, 7]]);
              }));
              return function ler(_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }();
            _context2.n = 1;
            return ler(_this.urlCatalogoCanais(), 6000);
          case 1:
            remoto = _context2.v;
            if (!remoto) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, remoto);
          case 2:
            _context2.n = 3;
            return ler(_this.localBackupUrl, 4000);
          case 3:
            local = _context2.v;
            if (!local) {
              _context2.n = 4;
              break;
            }
            return _context2.a(2, local);
          case 4:
            return _context2.a(2, {
              channels: [],
              categories: ["Todos"]
            });
        }
      }, _callee2);
    }))();
  },
  /**
   * O catálogo publicado de hoje, só do remoto (igual ao site). Quem chama
   * decide o que fazer sem rede: os dados embutidos são o fallback.
   */
  catalogoRemoto: function catalogoRemoto() {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var controller, timeoutId, res, text, parsed, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            controller = new AbortController();
            timeoutId = setTimeout(function () {
              return controller.abort();
            }, 6000);
            _context3.p = 1;
            _context3.n = 2;
            return fetch(_this2.urlCatalogoCanais(), {
              signal: controller.signal,
              cache: "no-store"
            });
          case 2:
            res = _context3.v;
            if (res.ok) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, null);
          case 3:
            _context3.n = 4;
            return res.text();
          case 4:
            text = _context3.v;
            parsed = _this2.parseCatalogo(text);
            return _context3.a(2, parsed.channels && parsed.channels.length ? parsed : null);
          case 5:
            _context3.p = 5;
            _t2 = _context3.v;
            return _context3.a(2, null);
          case 6:
            _context3.p = 6;
            clearTimeout(timeoutId);
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 5, 6, 7]]);
    }))();
  },
  /**
   * Proxy da Saimo TV (igual ao site): manda o Referer e o User-Agent que
   * certos CDNs exigem — cabeçalhos que o navegador da TV não consegue mandar
   * direto. O direto tenta primeiro e tem chance de passar; o proxy é a rede
   * de segurança quando falta cabeçalho ou CORS.
   */
  PROXY_PRINCIPAL: "https://saimo-tv.pages.dev",
  PROXY_RESERVA: "https://saimo-tv2.pages.dev",
  _proxyCaido: false,
  proxyBase: function proxyBase() {
    var h = String((typeof location !== "undefined" && location.hostname) || "");
    if (h === "localhost" || h === "127.0.0.1" || h === "::1") {
      return String(location.origin || ("http://" + h + (location.port ? ":" + location.port : "")));
    }
    return this._proxyCaido ? this.PROXY_RESERVA : this.PROXY_PRINCIPAL;
  },
  /**
   * Proxy vivo? Sem o parâmetro url, um proxy vivo responde 400 em JSON; um
   * cortado (cota do dia) responde a página do site. Vale a reserva.
   */
  sondarProxy: function sondarProxy() {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var ctrl, t, res, tipo, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, 6000);
            _context4.n = 1;
            return fetch(_this3.PROXY_PRINCIPAL + "/api/proxy", {
              signal: ctrl.signal,
              cache: "no-store"
            });
          case 1:
            res = _context4.v;
            clearTimeout(t);
            tipo = res.headers.get("content-type") || "";
            _this3._proxyCaido = tipo.indexOf("text/html") !== -1;
            _context4.n = 3;
            break;
          case 2:
            _context4.p = 2;
            _t3 = _context4.v;
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }))();
  },
  /** Fonte que se beneficia do proxy: cabeçalhos exigidos, HTTP puro, master
   * .txt sem CORS ou o dadinho, que é página e só o proxy reescreve. */
  precisaProxy: function precisaProxy(source) {
    var u = String(source && source.url || "");
    if (!u) return false;
    if (source.referer || source.agent) return true;
    var limpa = u.split("?")[0].toLowerCase();
    return u.indexOf("http://") === 0 || limpa.slice(-4) === ".txt" || u.indexOf("dadinhodetapioca.fun") !== -1;
  },
  proxyUrl: function proxyUrl(source) {
    var out = this.proxyBase() + "/api/proxy?url=" + encodeURIComponent(source.url);
    if (source.referer) out += "&referer=" + encodeURIComponent(source.referer);
    if (source.agent) out += "&ua=" + encodeURIComponent(source.agent);
    return out;
  },
  vodUrlLocal: function vodUrlLocal(path) {
    var p = String(path || "").replace(/^vod\//, "");
    try {
      return new URL("vod/" + p, document.baseURI || window.location.href).toString();
    } catch (e) {
      return "vod/" + p;
    }
  },
  fetchTextXhr: function fetchTextXhr(url) {
    return new Promise(function (resolve) {
      if (!url || typeof XMLHttpRequest === "undefined") {
        resolve("");
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.timeout = 20000;
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText || "");
          return;
        }
        /* file://: Chrome reporta status 0 mesmo em sucesso — sem isso o
           conteúdo local era descartado e o app virava só-CDN na TV. */
        if (xhr.status === 0 && xhr.responseText) {
          resolve(xhr.responseText);
          return;
        }
        resolve("");
      };
      xhr.onerror = function () {
        resolve("");
      };
      xhr.ontimeout = function () {
        resolve("");
      };
      try {
        xhr.send();
      } catch (e) {
        resolve("");
      }
    });
  },
  fetchTextUrl: function fetchTextUrl(url) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var xhrHit, res, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (url) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, "");
          case 1:
            _context5.n = 2;
            return _this4.fetchTextXhr(url);
          case 2:
            xhrHit = _context5.v;
            if (!(xhrHit && xhrHit.length > 0)) {
              _context5.n = 3;
              break;
            }
            return _context5.a(2, xhrHit);
          case 3:
            _context5.p = 3;
            _context5.n = 4;
            return fetch(url, {
              cache: "no-store"
            });
          case 4:
            res = _context5.v;
            if (!res.ok) {
              _context5.n = 6;
              break;
            }
            _context5.n = 5;
            return res.text();
          case 5:
            return _context5.a(2, _context5.v);
          case 6:
            _context5.n = 8;
            break;
          case 7:
            _context5.p = 7;
            _t4 = _context5.v;
          case 8:
            return _context5.a(2, "");
        }
      }, _callee5, null, [[3, 7]]);
    }))();
  },
  /**
   * Lê shard do VOD: espelho remoto primeiro (igual ao Mac), depois pasta local.
   */
  fetchVodText: function fetchVodText(nome, origem) {
    var _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var path, base, remoto, local;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            path = String(nome || "").replace(/^vod\//, "");
            /* '#' na URL vira fragmento e corta o caminho: usa %23. */
            path = path.replace(/#/g, "%23");
            origem = origem || null;
            if (origem && origem.local) {
              _context6.n = 4;
              break;
            }
            base = origem && origem.base ? origem.base : _this5.vodBaseAtivo();
            if (!(base && (base.indexOf("http://") === 0 || base.indexOf("https://") === 0))) {
              _context6.n = 4;
              break;
            }
            _context6.n = 1;
            return _this5.fetchTextUrl(base + path);
          case 1:
            remoto = _context6.v;
            if (origem) return _context6.a(2, remoto || "");
            if (!(remoto && remoto.length > 80)) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, remoto);
          case 2:
            _context6.n = 3;
            return _this5.fetchTextUrl(_this5.vodUrlLocal(path));
          case 3:
            local = _context6.v;
            return _context6.a(2, local || remoto);
          case 4:
            _context6.n = 5;
            return _this5.fetchTextUrl(_this5.vodUrlLocal(path));
          case 5:
            return _context6.a(2, _context6.v || "");
        }
      }, _callee6);
    }))();
  },
  gavetaFilme: function gavetaFilme(letter) {
    var L = String(letter || "A").trim();
    if (L === "#") return "hash";
    return L.toUpperCase();
  },
  letrasDoIndiceFilmes: function letrasDoIndiceFilmes() {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var text, out;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!_this6._letrasFilmes) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2, _this6._letrasFilmes);
          case 1:
            _context7.n = 2;
            return _this6.fetchVodText("indice.txt");
          case 2:
            text = _context7.v;
            out = [];
            String(text || "").split("\n").forEach(function (raw) {
              var cols = raw.trim().split("\t");
              if (cols.length < 3) return;
              var L = cols[0].trim();
              if (L === "#") out.push("#");else if (/^[A-Za-z]$/.test(L)) out.push(L.toUpperCase());
            });
            if (!out.length) {
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (c) {
                return out.push(c);
              });
              out.push("#");
            }
            _this6._letrasFilmes = out;
            return _context7.a(2, out);
        }
      }, _callee7);
    }))();
  },
  /**
   * Carrega o índice de bases do VOD
   */
  loadVodBases: function loadVodBases() {
    var _this7 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var text, lines, _iterator, _step, line, parts, _t5;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (!(Object.keys(_this7.bases).length > 0)) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, _this7.bases);
          case 1:
            if (window.SAIMO_VOD_BASES && typeof window.SAIMO_VOD_BASES === "object") {
              Object.keys(window.SAIMO_VOD_BASES).forEach(function (k) {
                var idx = parseInt(k, 10);
                if (!isNaN(idx) && window.SAIMO_VOD_BASES[k]) _this7.bases[idx] = window.SAIMO_VOD_BASES[k];
              });
            }
            _context8.p = 2;
            _context8.n = 3;
            return _this7.fetchVodText("indice.txt");
          case 3:
            text = _context8.v;
            if (text) {
              lines = text.split("\n");
              for (_iterator = _createForOfIteratorHelperLoose(lines); !(_step = _iterator()).done;) {
                line = _step.value;
                line = line.trim();
                if (line.startsWith("base:")) {
                  parts = line.split(/\s+/);
                  if (parts.length >= 3) {
                    _this7.bases[parseInt(parts[1], 10)] = parts[2];
                  }
                }
              }
            }
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t5 = _context8.v;
            console.warn("Erro ao carregar indice VOD:", _t5);
          case 5:
            return _context8.a(2, _this7.bases);
        }
      }, _callee8, null, [[2, 4]]);
    }))();
  },
  /**
   * Expande "10:2454183" para a URL completa usando as bases
   */
  normTituloVod: function normTituloVod(t) {
    return String(t || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s*\(\d{4}\)\s*$/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  },
  titulosVodIguais: function titulosVodIguais(a, b) {
    var x = this.normTituloVod(a);
    var y = this.normTituloVod(b);
    return !!(x && y && x === y);
  },
  parseFontesDaLinhaFilme: function parseFontesDaLinhaFilme(cols) {
    var _this8 = this;
    var sources = [];
    var _loop = function _loop() {
      var part = String(cols[i] || "").trim();
      var eqIndex = part.indexOf("=");
      if (eqIndex === -1) return 1; // continue
      var audioRaw = part.slice(0, eqIndex).trim().toLowerCase();
      var audioType = audioRaw === "leg" ? "LEG" : "DUB";
      part.slice(eqIndex + 1).split(",").forEach(function (rawToken, idx) {
        var fullUrl = _this8.expandStreamUrl(rawToken);
        if (fullUrl) {
          sources.push({
            url: fullUrl,
            quality: audioType === "LEG" ? "Legendado (" + (idx + 1) + ")" : "Dublado (" + (idx + 1) + ")",
            audio: audioType
          });
        }
      });
    };
    for (var i = 1; i < cols.length; i++) {
      if (_loop()) continue;
    }
    return sources;
  },
  parseFilmeShard: function parseFilmeShard(text, title) {
    var want = this.normTituloVod(title);
    if (!want || !text) return [];
    var lines = String(text).split("\n");
    for (var li = 0; li < lines.length; li++) {
      var cols = lines[li].split("\t");
      if (cols.length < 2) continue;
      if (!this.titulosVodIguais(cols[0], title)) continue;
      var sources = this.parseFontesDaLinhaFilme(cols);
      if (sources.length) return sources;
    }
    return [];
  },
  /* Só quando o link do catálogo não abre. O site devolve 302 para o arquivo. */
  urlStream: function urlStream(ch) {
    if (!ch || ch.isLive) return "";
    var item = ch.vodItem || {};
    var id = parseInt(ch.tmdb || item.tmdb || item.tmdbId || 0, 10) || 0;
    if (!id && window.SaimoFicha && SaimoFicha.tmdbId) {
      id = parseInt(SaimoFicha.tmdbId(item.title, item.type === "series") || 0, 10) || 0;
    }
    if (!id) return "";
    var ep = ch.episode;
    var serie = item.type === "series" || !!ep;
    var audio = "";
    var fontes = ch.sources || [];
    var i;
    for (i = 0; i < fontes.length; i++) {
      if (fontes[i] && fontes[i].audio) {
        audio = String(fontes[i].audio).toLowerCase();
        break;
      }
    }
    var versao = audio.indexOf("leg") === 0 ? "leg" : "dub";
    var u = "https://saimo-tv.pages.dev/api/stream?tipo=" + (serie ? "series" : "movie") + "&id=" + id + "&versao=" + versao;
    if (serie && ep) {
      var temporada = parseInt(ep.season, 10) || 1;
      var numero = parseInt(ep.episode, 10) || 1;
      u += "&s=" + temporada + "&e=" + numero;
    }
    return u;
  },
  expandStreamUrl: function expandStreamUrl(token) {
    if (!token) return "";
    token = token.trim();
    if (token.startsWith("http://") || token.startsWith("https://")) {
      return token;
    }
    var colonIndex = token.indexOf(":");
    if (colonIndex !== -1) {
      var baseIdx = parseInt(token.slice(0, colonIndex), 10);
      var rest = token.slice(colonIndex + 1);
      var base = this.bases[baseIdx];
      if (base) {
        return rest.includes(".") ? base + rest : "" + base + rest + ".mp4";
      }
    }
    return "";
  },
  DISCO_DEST: "saimo_vod_destaques",
  destaquesVazio: function destaquesVazio() {
    return { filmesRows: {}, seriesRows: {}, filas: [] };
  },
  destaquesTemFila: function destaquesTemFila(pack) {
    return !!(pack && pack.filas && pack.filas.length);
  },
  textoDestaquesOk: function textoDestaquesOk(text) {
    return !!(text && text.indexOf("fila") !== -1);
  },
  lerDiscoDestaques: function lerDiscoDestaques() {
    try {
      return localStorage.getItem(this.DISCO_DEST) || "";
    } catch (e) {
      return "";
    }
  },
  guardarDiscoDestaques: function guardarDiscoDestaques(text) {
    if (!this.textoDestaquesOk(text)) return;
    try {
      localStorage.setItem(this.DISCO_DEST, text);
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "api_destaques: " + ((e && e.message) || ""));
    }
  },
  parseDestaquesTexto: function parseDestaquesTexto(text) {
    var filmesRows = {};
    var seriesRows = {};
    var filas = [];
    var atual = null;
    var currentSection = "Em alta";
    var self = this;
    String(text || "").split("\n").forEach(function (rawLine) {
      var line = rawLine.trim();
      if (!line || line.charAt(0) === "#") return;
      if (line.indexOf("capa:") === 0) {
        var parts = line.split(/\s+/);
        if (parts[1]) self.tmdbPosterBase = parts[1];
        return;
      }
      if (line.indexOf("fila\t") === 0 || line.indexOf("fila ") === 0) {
        currentSection = line.replace(/^fila[\t ]+/, "").trim();
        atual = { title: currentSection, marca: "", items: [] };
        filas.push(atual);
        return;
      }
      var cols = line.split("\t");
      if (cols.length < 3) return;
      var marca = cols[0].trim();
      var title = cols[1].trim();
      var letter = cols[2].trim() || title.charAt(0).toUpperCase();
      var year = cols[3] ? cols[3].trim() : "";
      var poster = cols[4] ? cols[4].trim() : "";
      var kind = marca === "s" ? "series" : marca === "a" ? "anime" : marca === "d" ? "dorama" : "movie";
      var item = {
        type: kind === "movie" ? "movie" : "series",
        kind: kind,
        marca: marca,
        title: title,
        letter: letter,
        year: year,
        posterUrl: poster ? self.tmdbPosterBase + poster : "",
        section: currentSection
      };
      if (atual) {
        if (!atual.marca) atual.marca = marca;
        atual.items.push(item);
      }
      var bolsa = kind === "movie" ? filmesRows : kind === "series" ? seriesRows : null;
      if (bolsa) {
        if (!bolsa[currentSection]) bolsa[currentSection] = [];
        bolsa[currentSection].push(item);
      }
    });
    return { filmesRows: filmesRows, seriesRows: seriesRows, filas: filas };
  },
  aplicarDestaquesTexto: function aplicarDestaquesTexto(text) {
    if (!this.textoDestaquesOk(text)) return null;
    var pack = this.parseDestaquesTexto(text);
    if (!this.destaquesTemFila(pack)) return null;
    this._destaquesCache = pack;
    this.guardarDiscoDestaques(text);
    return pack;
  },
  atualizarDestaquesRemoto: function atualizarDestaquesRemoto() {
    var self = this;
    if (!this.vodDestaquesRemote) return;
    this.fetchTextUrl(this.vodDestaquesRemote).then(function (text) {
      if (self.textoDestaquesOk(text)) self.aplicarDestaquesTexto(text);
    }).catch(function () {});
  },
  destaquesSoXtream: function destaquesSoXtream() {
    if (this.destaquesTemFila(this._destaquesCache)) return this._destaquesCache;
    if (window.SaimoXtream && SaimoXtream.fileirasHome && SaimoXtream.ligado && SaimoXtream.ligado()) {
      var xf = SaimoXtream.fileirasHome() || [];
      if (xf.length) {
        var fr = {};
        var sr = {};
        xf.forEach(function (f) {
          var t = f.title || "";
          if (/s[eé]rie/i.test(t) && !/anime|dorama/i.test(t)) sr[t] = f.items || [];
          else fr[t] = f.items || [];
        });
        this._destaquesCache = { filas: xf, filmesRows: fr, seriesRows: sr };
        return this._destaquesCache;
      }
    }
    this._destaquesCache = this.destaquesVazio();
    return this._destaquesCache;
  },
  /**
   * Carrega os destaques do VOD (Filmes, Séries, Lançamentos, Animes, Doramas)
   */
  loadVodDestaques: function loadVodDestaques() {
    var self = this;
    if (window.SaimoOficial && !SaimoOficial.catalogoSaimoLigado() && !SaimoOficial.catalogoMeuLigado()) {
      return Promise.resolve(this.destaquesSoXtream());
    }
    if (this.destaquesTemFila(this._destaquesCache)) return Promise.resolve(this._destaquesCache);
    return this.loadVodBases().then(function () {
      return self.fetchTextUrl(self.vodDestaquesUrl);
    }).then(function (local) {
      var pack = self.aplicarDestaquesTexto(local);
      if (pack) {
        self.atualizarDestaquesRemoto();
        return pack;
      }
      pack = self.aplicarDestaquesTexto(self.lerDiscoDestaques());
      if (pack) {
        self.atualizarDestaquesRemoto();
        return pack;
      }
      if (!self.vodDestaquesRemote) {
        if (!self._destaquesCache) self._destaquesCache = self.destaquesVazio();
        return self._destaquesCache;
      }
      return self.fetchTextUrl(self.vodDestaquesRemote).then(function (remoto) {
        pack = self.aplicarDestaquesTexto(remoto);
        if (pack) return pack;
        if (!self._destaquesCache) self._destaquesCache = self.destaquesVazio();
        return self._destaquesCache;
      });
    }).catch(function (err) {
      console.error("Erro ao carregar VOD Destaques:", err);
      var pack = self.aplicarDestaquesTexto(self.lerDiscoDestaques());
      if (pack) return pack;
      if (!self._destaquesCache) self._destaquesCache = self.destaquesVazio();
      return self._destaquesCache;
    });
  },
  _colecaoCache: Object.create(null),
  episodioDaLinha: function episodioDaLinha(cols) {
    var _this0 = this;
    if (!cols || cols.length < 4) return null;
    var season = String(cols[0] || "").trim();
    var epNum = String(cols[1] || "").trim();
    var audio = String(cols[2] || "").trim().toUpperCase();
    var sources = [];
    String(cols[3] || "").split(",").forEach(function (rawToken, idx) {
      var fullUrl = _this0.expandStreamUrl(rawToken);
      if (!fullUrl) return;
      sources.push({
        url: fullUrl,
        quality: audio === "LEG" ? "Legendado (" + (idx + 1) + ")" : "Dublado (" + (idx + 1) + ")",
        audio: audio === "LEG" ? "LEG" : "DUB"
      });
    });
    if (!sources.length) return null;
    return {
      title: "T" + season + " : E" + epNum,
      season: season,
      episode: epNum,
      sources: sources
    };
  },
  /**
   * categorias.txt: tipo (f|s), título e categorias (anime, dorama, novela, kids).
   * O mesmo arquivo do site. Título fora daqui é filme ou série comum.
   */
  _parseCategorias: function _parseCategorias(text) {
    var mapa = {
      f: { anime: [], dorama: [], novela: [], kids: [] },
      s: { anime: [], dorama: [], novela: [], kids: [] }
    };
    String(text || "").split("\n").forEach(function (raw) {
      var line = raw.replace(/\r$/, "");
      if (!line || line.charAt(0) === "#") return;
      var cols = line.split("\t");
      if (cols.length < 3) return;
      var tipo = String(cols[0] || "").trim();
      var titulo = String(cols[1] || "").trim();
      if ((tipo !== "f" && tipo !== "s") || !titulo) return;
      String(cols[2] || "").split(",").forEach(function (c) {
        var cat = String(c || "").trim();
        if (mapa[tipo][cat]) mapa[tipo][cat].push(titulo);
      });
    });
    return mapa;
  },
  _catMap: null,
  _catPromise: null,
  loadCategorias: function loadCategorias() {
    var self = this;
    if (self._catMap) return Promise.resolve(self._catMap);
    if (self._catPromise) return self._catPromise;
    function ler(url) {
      return fetch(url).then(function (res) {
        if (!res || !res.ok) return "";
        return res.text();
      }).catch(function () {
        return "";
      });
    }
    self._catPromise = ler("vod/categorias.txt").then(function (text) {
      if (text && text.indexOf("\t") !== -1) return text;
      return ler("https://filmes-saimo.pages.dev/categorias.txt");
    }).then(function (text) {
      self._catMap = self._parseCategorias(text);
      return self._catMap;
    });
    return self._catPromise;
  },
  /**
   * Animes e doramas: o mesmo arquivo que o Mac lê (redeflix/links-*.txt).
   */
  loadColecao: function loadColecao(tipo) {
    var _this1 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var nome, text, res, res2, kind, marca, out, cur, _t8, _t9;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            if (!(tipo !== "animes" && tipo !== "doramas")) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, []);
          case 1:
            if (!_this1._colecaoCache[tipo]) {
              _context0.n = 2;
              break;
            }
            return _context0.a(2, _this1._colecaoCache[tipo]);
          case 2:
            _context0.n = 3;
            return _this1.loadVodBases();
          case 3:
            nome = "redeflix/links-" + tipo + ".txt";
            text = "";
            _context0.p = 4;
            _context0.n = 5;
            return fetch("vod/" + nome);
          case 5:
            res = _context0.v;
            if (!res.ok) {
              _context0.n = 7;
              break;
            }
            _context0.n = 6;
            return res.text();
          case 6:
            text = _context0.v;
          case 7:
            _context0.n = 9;
            break;
          case 8:
            _context0.p = 8;
            _t8 = _context0.v;
          case 9:
            if (!(!text || text.indexOf("@") === -1)) {
              _context0.n = 15;
              break;
            }
            _context0.p = 10;
            _context0.n = 11;
            return fetch("https://filmes-saimo.pages.dev/" + nome);
          case 11:
            res2 = _context0.v;
            if (!res2.ok) {
              _context0.n = 13;
              break;
            }
            _context0.n = 12;
            return res2.text();
          case 12:
            text = _context0.v;
          case 13:
            _context0.n = 15;
            break;
          case 14:
            _context0.p = 14;
            _t9 = _context0.v;
          case 15:
            kind = tipo === "animes" ? "anime" : "dorama";
            marca = tipo === "animes" ? "a" : "d";
            out = [];
            cur = null;
            String(text || "").split("\n").forEach(function (raw) {
              var line = raw.replace(/\r$/, "");
              if (!line) return;
              if (line.charAt(0) === "@") {
                if (cur && cur.episodes.length) out.push(cur);
                var cols = line.slice(1).split("\t");
                var title = String(cols[0] || "").trim();
                var year = String(cols[1] || "").trim();
                var letraBruta = title.replace(/^[^0-9A-Za-z]+/, "").charAt(0).toUpperCase();
                cur = {
                  type: "series",
                  kind: kind,
                  marca: marca,
                  title: title,
                  year: year,
                  letter: /[A-Z]/.test(letraBruta) ? letraBruta : "#",
                  posterUrl: "",
                  episodes: []
                };
                return;
              }
              if (!cur) return;
              var ep = _this1.episodioDaLinha(line.split("\t"));
              if (!ep) return;
              var prev = cur.episodes.find(function (e) {
                return e.season === ep.season && e.episode === ep.episode;
              });
              if (prev) prev.sources = prev.sources.concat(ep.sources);else cur.episodes.push(ep);
            });
            if (cur && cur.episodes.length && cur.title) out.push(cur);
            _this1._colecaoCache[tipo] = out;
            return _context0.a(2, out);
        }
      }, _callee0, null, [[10, 14], [4, 8]]);
    }))();
  },
  /**
   * Resolve os streams de um filme em todos os catálogos ligados (o seu primeiro).
   */
  resolveMovieStreams: function resolveMovieStreams(title, letter) {
    var self = this;
    return this.loadVodBases().then(function () {
      var origens = window.SaimoOficial && SaimoOficial.vodOrigens ? SaimoOficial.vodOrigens() : [{
        id: "saimo",
        nome: "Saimo",
        base: self.vodBaseAtivo()
      }];
      var tentar = [];
      var addLetra = function addLetra(L) {
        if (!L) return;
        var n = String(L).trim();
        var key = n === "#" ? "#" : n.toUpperCase();
        if (tentar.indexOf(key) < 0) tentar.push(key);
      };
      addLetra(letter);
      var ch = String(title || "").replace(/^[^0-9A-Za-z]+/, "").charAt(0);
      if (ch && /[0-9]/.test(ch)) addLetra("#");else if (ch) addLetra(ch.toUpperCase());
      var buscar = function buscar(lista, origem) {
        var i = 0;
        var step = function step() {
          if (i >= lista.length) return Promise.resolve([]);
          var gaveta = self.gavetaFilme(lista[i]);
          return self.fetchVodText("filmes-" + gaveta + ".txt", origem).then(function (text) {
            var sources = self.parseFilmeShard(text, title);
            if (sources.length) return sources;
            i += 1;
            return step();
          });
        };
        return step();
      };
      var umaOrigem = function umaOrigem(origem) {
        return buscar(tentar, origem);
      };
      var out = [];
      var seen = {};
      var next = function next(i) {
        if (i >= origens.length) {
          if (window.SaimoXtream && SaimoXtream.ligado && SaimoXtream.ligado()) {
            (SaimoXtream.fontesFilme(title) || []).forEach(function (s) {
              var u = String(s.url || "");
              if (!u || seen[u]) return;
              seen[u] = 1;
              out.unshift(s);
            });
          }
          return out;
        }
        return umaOrigem(origens[i]).then(function (srcs) {
          (srcs || []).forEach(function (s) {
            var u = String(s.url || "");
            if (!u || seen[u]) return;
            seen[u] = 1;
            s.origem = origens[i].id;
            s.origemNome = origens[i].nome;
            if (s.quality) s.quality = String(s.quality) + " · " + origens[i].nome;
            out.push(s);
          });
          return next(i + 1);
        });
      };
      return next(0);
    });
  },
  tituloDaArroba: function tituloDaArroba(line) {
    return String(line || "").replace(/^@/, "").split("\t")[0].trim();
  },
  parseSeriesBlock: function parseSeriesBlock(text, title) {
    var _this11 = this;
    var lines = String(text || "").split("\n");
    var inSeries = false;
    var episodes = [];
    var _loop2 = function _loop2() {
        var line = _step3.value;
        line = line.trim();
        if (line.startsWith("@")) {
          var t = _this11.tituloDaArroba(line);
          if (_this11.titulosVodIguais(t, title)) inSeries = true;else if (inSeries) return 0; // break
          return 1; // continue
        }
        if (!inSeries) return 1; // continue
        var cols = line.split("\t");
        if (cols.length < 4) return 1; // continue
        var season = cols[0].trim();
        var epNum = cols[1].trim();
        var audio = cols[2].trim().toUpperCase();
        var rawUrls = cols[3].trim().split(",");
        var sources = [];
        rawUrls.forEach(function (rawToken, idx) {
          var fullUrl = _this11.expandStreamUrl(rawToken);
          if (fullUrl) {
            sources.push({
              url: fullUrl,
              quality: audio === "DUB" ? "Dublado (" + (idx + 1) + ")" : "Legendado (" + (idx + 1) + ")",
              audio: audio
            });
          }
        });
        if (sources.length) {
          var prev = episodes.find(function (e) {
            return e.season === season && e.episode === epNum;
          });
          if (prev) {
            prev.sources = prev.sources.concat(sources);
          } else {
            episodes.push({
              title: "T" + season + " : E" + epNum,
              season: season,
              episode: epNum,
              sources: sources
            });
          }
        }
      },
      _ret;
    for (var _iterator3 = _createForOfIteratorHelperLoose(lines), _step3; !(_step3 = _iterator3()).done;) {
      _ret = _loop2();
      if (_ret === 0) break;
      if (_ret === 1) continue;
    }
    return episodes;
  },
  pedacoDoIndice: function pedacoDoIndice(title, cleanLetter) {
    var _this12 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var text, lines, i, cols, pedaco, _t0;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            _context11.p = 0;
            _context11.n = 1;
            return _this12.fetchVodText("series-" + cleanLetter + ".txt");
          case 1:
            text = _context11.v;
            if (text) {
              _context11.n = 2;
              break;
            }
            return _context11.a(2, null);
          case 2:
            lines = text.split("\n");
            i = 0;
          case 3:
            if (!(i < lines.length)) {
              _context11.n = 5;
              break;
            }
            cols = lines[i].split("\t");
            if (!(cols.length >= 3 && _this12.titulosVodIguais(cols[0], title))) {
              _context11.n = 4;
              break;
            }
            pedaco = parseInt(cols.length >= 4 ? cols[2] : cols[1], 10);
            return _context11.a(2, isNaN(pedaco) ? null : pedaco);
          case 4:
            i++;
            _context11.n = 3;
            break;
          case 5:
            _context11.n = 7;
            break;
          case 6:
            _context11.p = 6;
            _t0 = _context11.v;
          case 7:
            return _context11.a(2, null);
        }
      }, _callee11, null, [[0, 6]]);
    }))();
  },
  /**
   * Resolve os episódios de uma série a partir do índice vod/series-<letra>.txt
   */
  resolveSeriesEpisodes: function resolveSeriesEpisodes(title, letter) {
    var _this13 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var cleanLetter, cacheKey, pedaco, tryParts, part, missSeguidos, i, _part, shard, episodes, _t1;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            _context12.n = 1;
            return _this13.loadVodBases();
          case 1:
            cleanLetter = (letter === "#" ? "hash" : letter).toUpperCase();
            cacheKey = cleanLetter + "\t" + String(title || "").trim().toLowerCase();
            if (!_this13._seriesCache[cacheKey]) {
              _context12.n = 2;
              break;
            }
            return _context12.a(2, _this13._seriesCache[cacheKey]);
          case 2:
            _context12.n = 3;
            return _this13.pedacoDoIndice(title, cleanLetter);
          case 3:
            pedaco = _context12.v;
            tryParts = [];
            if (pedaco != null) tryParts.push(pedaco);
            for (part = 0; part <= 20; part++) {
              if (tryParts.indexOf(part) === -1) tryParts.push(part);
            }
            missSeguidos = 0;
            i = 0;
          case 4:
            if (!(i < tryParts.length)) {
              _context12.n = 13;
              break;
            }
            _part = tryParts[i];
            _context12.p = 5;
            _context12.n = 6;
            return _this13.fetchVodText("series-" + cleanLetter + "-" + _part + ".txt");
          case 6:
            shard = _context12.v;
            if (shard) {
              _context12.n = 9;
              break;
            }
            if (!(pedaco != null && _part === pedaco)) {
              _context12.n = 7;
              break;
            }
            return _context12.a(3, 12);
          case 7:
            missSeguidos++;
            if (!(missSeguidos >= 2 && _part > (pedaco != null ? pedaco : 0))) {
              _context12.n = 8;
              break;
            }
            return _context12.a(3, 13);
          case 8:
            return _context12.a(3, 12);
          case 9:
            missSeguidos = 0;
            episodes = _this13.parseSeriesBlock(shard, title);
            if (!episodes.length) {
              _context12.n = 10;
              break;
            }
            _this13._seriesCache[cacheKey] = episodes;
            return _context12.a(2, episodes);
          case 10:
            _context12.n = 12;
            break;
          case 11:
            _context12.p = 11;
            _t1 = _context12.v;
          case 12:
            i++;
            _context12.n = 4;
            break;
          case 13:
            _this13._seriesCache[cacheKey] = [];
            return _context12.a(2, []);
        }
      }, _callee12, null, [[5, 11]]);
    }))();
  }
};
window.SaimoAPI = SaimoAPI;
/* Config remota (nx-conexao.pages.dev): versão mínima e mensagem, trocáveis
   sem IPK. Silencioso em falha; resultados vão para o Diagnóstico. */
(function () {
  function comparar(a, b) {
    a = String(a || "").split(".");
    b = String(b || "").split(".");
    var i;
    for (i = 0; i < 3; i++) {
      var x = parseInt(a[i], 10) || 0;
      var y = parseInt(b[i], 10) || 0;
      if (x !== y) return x - y;
    }
    return 0;
  }
  try {
    var x = new XMLHttpRequest();
    x.open("GET", "https://nx-conexao.pages.dev/v1/config", true);
    x.timeout = 15000;
    x.onload = function () {
      try {
        var j = JSON.parse(x.responseText || "{}");
        if (!j || j.vazio) return;
        window.SAIMO_CONFIG = j;
        var atual = (typeof window !== "undefined" && window.SAIMO_VERSAO) || "";
        if (j.versaoMinima && atual && comparar(j.versaoMinima, atual) > 0) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("atualizacao", "versao " + j.versaoMinima + " disponivel (esta TV: " + atual + ")");
        }
        if (j.mensagem && window.SaimoDiagnostico) SaimoDiagnostico.logEvento("aviso", j.mensagem);
      } catch (eC) {}
    };
    x.send();
  } catch (eR) {}
})();
