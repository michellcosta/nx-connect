"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Eventos esportivos e rádios. A agenda passa pelo site, porque a embedtv
 * não libera CORS; os jogos de streaming vêm do JSON publicado no mesmo site.
 */
var SaimoExtra = {
  AGENDA: "https://saimo-tv.pages.dev/api/events",
  MONITOR: "https://saimo-tv.pages.dev/eventos-extra.json",
  RADIOS: "https://canais-saimo.pages.dev/radios.txt",
  radiosCache: [],
  jogosCache: [],
  chave: function chave(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "");
  },
  escudo: function escudo(url) {
    return String(url || "").replace(/w_\d+,h_\d+/, "w_128,h_128");
  },
  normCache: Object.create(null),
  normCacheN: 0,
  normCanal: function normCanal(s) {
    var bruto = String(s || "");
    var cache = this.normCache;
    if (cache[bruto] !== undefined) return cache[bruto];
    var n = this.chave(bruto).replace(/[^a-z0-9]/g, "");
    var prev = "";
    while (n && n !== prev) {
      prev = n;
      n = n.replace(/(fullhd|fhd|uhd|h265|hevc|4k|hd|sd)$/g, "");
    }
    if (this.normCacheN > 20000) {
      this.normCache = Object.create(null);
      this.normCacheN = 0;
    }
    cache[bruto] = n;
    this.normCacheN++;
    return n;
  },
  rotuloDoSlug: function rotuloDoSlug(url) {
    var fim = String(url || "").split("?")[0].split("/").pop() || "";
    var slug = this.normCanal(fim);
    if (!slug) return "";
    var mapa = {
      premiere: "Premiere",
      sportv: "SporTV",
      espn: "ESPN",
      xsports: "XSports",
      tnt: "TNT",
      primevideo: "Prime Video",
      caze: "CazéTV"
    };
    if (mapa[slug]) return mapa[slug];
    if (slug.indexOf("globo") === 0 && slug.length > 5) return "Globo " + slug.slice(5).toUpperCase();
    var m = slug.match(/^(.*?)(\d+)$/);
    if (m && mapa[m[1]]) return mapa[m[1]] + " " + m[2];
    if (m && m[1].indexOf("globo") === 0 && m[1].length > 5) return "Globo " + m[1].slice(5).toUpperCase();
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  },
  canalDo: function canalDo(url, canais, casa, fora, listaPronta) {
    var _this = this;
    var fim = String(url || "").split("?")[0].split("/").pop().replace(/\.[a-z0-9]{2,5}$/i, "") || "";
    var slug = this.normCanal(fim);
    if (!slug || slug.length < 3) return null;
    var lista = listaPronta || (canais || []).map(function (c) {
      return { canal: c, norm: _this.normCanal(c.name) };
    }).filter(function (x) {
      return x.norm && x.norm.length >= 2;
    });
    var exatas = lista.filter(function (x) {
      return x.norm === slug;
    });
    var contendo = lista.filter(function (x) {
      if (x.norm === slug || x.norm.length < 4) return false;
      return x.norm.indexOf(slug) !== -1 || slug.indexOf(x.norm) !== -1;
    });
    var semNumero = slug.replace(/\d+$/, "");
    var prefixo = [];
    if (semNumero.length >= 4 && semNumero !== slug) {
      prefixo = lista.filter(function (x) {
        return x.norm.indexOf(semNumero) === 0;
      });
    }
    var escolher = function escolher(grupo, maisLongo, exigirEpg) {
      var okEpg = grupo.filter(function (x) {
        return _this.epgConfere(x.canal, casa, fora);
      });
      if (exigirEpg && !okEpg.length) return null;
      var finalistas = okEpg.length ? okEpg : grupo;
      finalistas.sort(function (a, b) {
        return maisLongo ? b.norm.length - a.norm.length : a.norm.length - b.norm.length;
      });
      return finalistas[0] ? finalistas[0].canal : null;
    };
    if (exatas.length) return escolher(exatas, false, false);
    if (contendo.length) return escolher(contendo, true, false);
    if (prefixo.length) {
      var generico = /^(canal|canais|tv|channel)$/.test(semNumero);
      return escolher(prefixo, true, generico);
    }
    return null;
  },
  epgConfere: function epgConfere(canal, casa, fora) {
    var _this2 = this;
    if (!canal || !window.SaimoEpg || !SaimoEpg.listaLocal) return true;
    var lista = SaimoEpg.listaLocal(canal.name) || [];
    var agora = Date.now();
    var p = lista.find(function (x) {
      return x && x.start <= agora && agora < x.stop;
    });
    var titulo = this.chave(p && p.title);
    if (!titulo || titulo.length < 4) return true;
    if (/^(aovivo|evento|eventos|esporte|esportes|jogo|jogos|programacao|futebol|basquete)$/.test(titulo)) return true;
    var tokens = String(casa + " " + fora).split(/\s+/).map(function (t) {
      return _this2.chave(t);
    }).filter(function (t) {
      return t.length >= 4;
    });
    if (!tokens.length) return true;
    return tokens.some(function (t) {
      return titulo.indexOf(t) !== -1;
    });
  },
  parseData: function parseData(texto) {
    if (!texto) return null;
    var d = Date.parse(texto);
    return isNaN(d) ? null : d;
  },
  lerAgenda: function lerAgenda(lista, canais) {
    var _this3 = this;
    if (!Array.isArray(lista)) return [];
    var listaNorm = (canais || []).map(function (c) {
      return { canal: c, norm: _this3.normCanal(c.name) };
    }).filter(function (x) {
      return x.norm && x.norm.length >= 2;
    });
    var jogos = [];
    var vistos = {};
    lista.forEach(function (o) {
      var times = o.teams || {};
      var casa = times.home || {};
      var fora = times.away || {};
      var inicio = _this3.parseData(o.time_start);
      if (!casa.name || !fora.name || !inicio) return;
      var players = Array.isArray(o.players) ? o.players : o.players ? [o.players] : [];
      var canal = null;
      var canalNome = "";
      players.forEach(function (p) {
        var url = typeof p === "string" ? p : p && (p.url || p.href) || "";
        if (!url) return;
        if (!canalNome) canalNome = _this3.rotuloDoSlug(url);
        if (canal) return;
        var achado = _this3.canalDo(url, canais || [], casa.name, fora.name, listaNorm);
        if (achado) {
          canal = achado;
          canalNome = achado.name;
        }
      });
      if (!canal && canalNome) {
        var alvo = _this3.normCanal(canalNome);
        if (alvo && alvo.length >= 4) {
          var porNome = (canais || []).filter(function (c) {
            var n = _this3.normCanal(c.name);
            if (n === alvo) return true;
            return n.length >= 4 && (n.indexOf(alvo) !== -1 || alvo.indexOf(n) !== -1);
          });
          porNome.sort(function (a, b) {
            var ea = _this3.normCanal(a.name) === alvo ? 0 : 1;
            var eb = _this3.normCanal(b.name) === alvo ? 0 : 1;
            if (ea !== eb) return ea - eb;
            return _this3.normCanal(b.name).length - _this3.normCanal(a.name).length;
          });
          canal = porNome[0] || null;
          if (canal) canalNome = canal.name;
        }
      }
      var id = casa.name + " x " + fora.name + "|" + inicio;
      if (vistos[id]) return;
      vistos[id] = 1;
      var liga = o.league || {};
      var fim = _this3.parseData(o.time_end) || inicio + 2 * 3600 * 1000;
      jogos.push({
        id: id,
        casa: casa.name,
        fora: fora.name,
        casaLogo: _this3.escudo(casa.image),
        foraLogo: _this3.escudo(fora.image),
        liga: liga.name || "",
        inicio: inicio,
        fim: fim,
        canal: canal,
        canalNome: canalNome,
        estado: o.estado || "",
        placar: o.placar || "",
        tempo: o.tempo || ""
      });
    });
    return jogos;
  },
  json: function json(url) {
    /* XHR primeiro: é o caminho provado na TV (mesmo padrão do fetchTextXhr —
       em file:// o sucesso vem com status 0 e conteúdo legível). O fetch com
       AbortController falhou para a ESPN na webOS 23 (todas_ligas_vazias na
       1.0.25/26) mesmo com CORS OK do endpoint. Timeout 12s. */
    return new Promise(function (resolve) {
      var fechou = false;
      function fim(v) {
        if (fechou) return;
        fechou = true;
        resolve(v);
      }
      function viaFetch() {
        try {
          var ctrl = typeof AbortController === "function" ? new AbortController() : null;
          var t = ctrl ? setTimeout(function () {
            try { ctrl.abort(); } catch (eA) {}
          }, 12000) : null;
          fetch(url, ctrl ? { signal: ctrl.signal } : {}).then(function (res) {
            if (t) clearTimeout(t);
            if (!res.ok) return fim(null);
            res.json().then(function (j) {
              fim(j);
            }, function () {
              fim(null);
            });
          }, function () {
            if (t) clearTimeout(t);
            fim(null);
          });
        } catch (eF) {
          fim(null);
        }
      }
      try {
        if (typeof XMLHttpRequest === "undefined") {
          viaFetch();
          return;
        }
        var x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.timeout = 12000;
        x.onload = function () {
          if ((x.status >= 200 && x.status < 300) || (x.status === 0 && x.responseText)) {
            try {
              fim(JSON.parse(x.responseText));
            } catch (eJ) {
              fim(null);
            }
          } else viaFetch();
        };
        x.onerror = function () {
          viaFetch();
        };
        x.ontimeout = function () {
          viaFetch();
        };
        x.send();
      } catch (eX) {
        viaFetch();
      }
    });
  },
  texto: function texto(url) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var res, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return fetch(url);
          case 1:
            res = _context2.v;
            if (res.ok) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, "");
          case 2:
            _context2.n = 3;
            return res.text();
          case 3:
            return _context2.a(2, _context2.v);
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            return _context2.a(2, "");
        }
      }, _callee2, null, [[0, 4]]);
    }))();
  },
  jogos: function jogos(canais) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _yield$Promise$all, a, b, da, db, agora, extra, todos, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(window.SaimoEpg && SaimoEpg.ensure)) {
              _context3.n = 4;
              break;
            }
            _context3.p = 1;
            _context3.n = 2;
            return SaimoEpg.ensure();
          case 2:
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
          case 4:
            _context3.n = 5;
            return Promise.all([_this4.json(_this4.AGENDA), _this4.json(_this4.MONITOR)]);
          case 5:
            _yield$Promise$all = _context3.v;
            a = _yield$Promise$all[0];
            b = _yield$Promise$all[1];
            da = a ? _this4.lerAgenda(a, canais) : [];
            db = b ? _this4.lerAgenda(b, canais) : [];
            agora = Date.now();
            extra = db.filter(function (x) {
              return !da.some(function (e) {
                return Math.abs(e.inicio - x.inicio) < 1800000 && _this4.chave(e.casa) === _this4.chave(x.casa) && _this4.chave(e.fora) === _this4.chave(x.fora);
              });
            });
            todos = da.concat(extra).filter(function (j) {
              return j.fim > agora - 600000;
            });
            todos.sort(function (x, y) {
              return x.inicio - y.inicio;
            });
            _this4.jogosCache = todos.slice(0, 40);
            return _context3.a(2, _this4.jogosCache);
        }
      }, _callee3, null, [[1, 3]]);
    }))();
  },
  quando: function quando(inicio) {
    var d = new Date(inicio);
    var hoje = new Date();
    var hh = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    var mesmoDia = d.toDateString() === hoje.toDateString();
    var amanha = new Date(hoje.getTime() + 86400000).toDateString() === d.toDateString();
    if (mesmoDia) return hh;
    if (amanha) return "amanhã " + hh;
    var dias = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    return dias[d.getDay()] + " " + hh;
  },
  jogosDeHoje: function jogosDeHoje(lista) {
    var _this5 = this;
    var hoje = new Date().toDateString();
    return (lista || []).filter(function (j) {
      if (!j) return false;
      if (_this5.aoVivo(j)) return true;
      return new Date(j.inicio).toDateString() === hoje;
    });
  },
  aoVivo: function aoVivo(jogo) {
    var agora = Date.now();
    return jogo.estado === "in" || jogo.estado !== "post" && agora >= jogo.inicio && agora <= jogo.fim;
  },
  capaBoa: function capaBoa(url) {
    var u = String(url || "").trim();
    if (!/^https?:\/\//i.test(u)) return "";
    var l = u.toLowerCase();
    var bloqueio = ["favicon", "facebook.com", "fbcdn.net", "drive.google", "sedoparking", "hostinger", "wikimedia.org/wiki/", "images.app.goo.gl", "duckduckgo.com", "wix.com/favicon"];
    for (var i = 0; i < bloqueio.length; i++) if (l.indexOf(bloqueio[i]) >= 0) return "";
    if (/\.(m3u8|mp3|aac|ogg)(\?|$)/.test(l)) return "";
    if (/\.(png|jpe?g|webp|gif|svg|ico)(\?|$)/.test(l)) return u;
    if (/radios\.com\.br|postimg\.cc|i\.imgur\.com|upload\.wikimedia\.org|googleusercontent|tunein\.com|mytuner|ibb\.co|cloudfront\.net|wixstatic\.com/.test(l)) return u;
    return "";
  },
  marcaRadio: function marcaRadio(name) {
    var s = String(name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (s.indexOf("hunter") >= 0) return "hunter";
    if (s.indexOf("jovem pan") >= 0) return "jovempan";
    if (s.indexOf("bandnews") >= 0 || s.indexOf("band news") >= 0) return "bandnews";
    if (/(^| )cbn( |$)/.test(s)) return "cbn";
    if (s.indexOf("novabrasil") >= 0 || s.indexOf("nova brasil") >= 0) return "novabrasil";
    if (s.indexOf("metropolitana") >= 0) return "metropolitana";
    if (s.indexOf("antena 1") >= 0 || s.indexOf("antena1") >= 0) return "antena1";
    if (s.indexOf("saudade") >= 0) return "saudade";
    if (s.indexOf("transamerica") >= 0) return "transamerica";
    if (s.indexOf("bandeirantes") >= 0) return "bandeirantes";
    if (s.indexOf("alpha fm") >= 0 || s.indexOf("alpha mpb") >= 0) return "alpha";
    if (s.indexOf("atlantida") >= 0) return "atlantida";
    if (s.indexOf("kiss fm") >= 0) return "kiss";
    if (s.indexOf("mgt ") >= 0) return "mgt";
    if (s.indexOf("mix fm") >= 0) return "mix";
    return "";
  },
  radios: function radios() {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var text, lista, marcas;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!_this6.radiosCache.length) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, _this6.radiosCache);
          case 1:
            _context4.n = 2;
            return _this6.texto(_this6.RADIOS);
          case 2:
            text = _context4.v;
            lista = [];
            String(text).split("\n").forEach(function (line) {
              line = line.trim();
              if (!line || line.charAt(0) === "#") return;
              var parts = line.split("|");
              if (parts.length < 2) return;
              lista.push({
                type: "radio",
                name: parts[0].trim(),
                url: parts[1].trim(),
                logo: _this6.capaBoa(parts[2] || "")
              });
            });
            marcas = {};
            lista.forEach(function (r) {
              var m = _this6.marcaRadio(r.name);
              if (m && r.logo && !marcas[m]) marcas[m] = r.logo;
            });
            lista.forEach(function (r) {
              if (r.logo) return;
              var m = _this6.marcaRadio(r.name);
              if (m && marcas[m]) r.logo = marcas[m];
            });
            _this6.radiosCache = lista;
            return _context4.a(2, lista);
        }
      }, _callee4);
    }))();
  }
};
window.SaimoExtra = SaimoExtra;

/**
 * Aviso de versão nova, como o Mac faz: lê o versao.json publicado no máximo
 * uma vez por dia e, se houver número maior que o instalado, mostra um aviso
 * discreto na home. Só isso — a TV não baixa nem recarrega nada sozinha.
 */
var SaimoVersao = {
  ATUAL: (typeof window !== "undefined" && window.SAIMO_VERSAO) || "1.0.5",
  ENDERECO: "https://canais-saimo.pages.dev/versao.json",
  CHAVE: "saimo_versao_remota",
  CHAVE_VISTO: "saimo_versao_visto_em",
  nova: null,
  maior: function maior(a, b) {
    var pa = String(a || "").split(".").map(function (n) {
      return parseInt(n, 10) || 0;
    });
    var pb = String(b || "").split(".").map(function (n) {
      return parseInt(n, 10) || 0;
    });
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var d = (pa[i] || 0) - (pb[i] || 0);
      if (d) return d;
    }
    return 0;
  },
  marcarVisto: function marcarVisto() {
    try {
      localStorage.setItem(this.CHAVE_VISTO, String(Date.now()));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "eventos_visto: " + ((e && e.message) || ""));
    }
  },
  mostrarSeNovo: function mostrarSeNovo() {},
  verificar: function verificar() {
    return Promise.resolve();
  }
};
window.SaimoVersao = SaimoVersao;