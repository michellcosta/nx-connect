"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Listas .m3u da pessoa, só neste aparelho.
 * Canal vai para o Ao vivo. Filme com o mesmo nome do catálogo vira mais uma
 * fonte. O que não casa fica em "Da sua lista". Série só com temporada e episódio.
 * O link não é mostrado.
 */
var SaimoListas = {
  KEY: "saimo_minhas_listas",
  MAX_LISTAS: 10,
  MAX_ITENS: 10000,
  HORAS: 12 * 3600000,
  listas: [],
  indice: null,
  indiceSuja: true,
  _idbTentou: false,
  _idbPronto: false,
  _idbEscritas: 0,
  _idb: null,
  fold: function fold(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  },
  chave: function chave(s) {
    return this.fold(s).replace(/[''`´]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  },
  semAno: function semAno(s) {
    return String(s || "").replace(/\s*\(\d{4}\)\s*$/, "").replace(/\s+\d{4}\s*$/, "").trim();
  },
  limparGrupo: function limparGrupo(s) {
    return String(s || "").replace(/[♦️⭐●■▪]/g, " ").replace(/\s*[|·]\s*/g, " ").replace(/\s+/g, " ").trim();
  },
  limparNome: function limparNome(s) {
    var t = String(s || "");
    t = t.replace(/\[[^\]]*\]/g, " ").replace(/\([^)]*\)/g, " ");
    t = t.replace(/\b(1080p|720p|480p|2160p|4k|fhd|hd|sd|bluray|blu-ray|web-dl|webrip|hdtv|dublado|legendado|dual|audio|completo)\b/ig, " ");
    t = t.replace(/[._]+/g, " ").replace(/\s+/g, " ").trim();
    return t || String(s || "").trim();
  },
  adulto: function adulto(nome, grupo) {
    var t = this.fold(nome + " " + grupo);
    if (/adult swim/.test(t)) return false;
    if (/\badult\b|\bxxx\b|\bporn|\+18|erotic/.test(t)) return true;
    if (window.SaimoAjustes && SaimoAjustes.ehAdulto) {
      return SaimoAjustes.ehAdulto({
        name: nome,
        category: grupo
      });
    }
    return false;
  },
  esconderAdulto: function esconderAdulto() {
    return !!(window.SaimoAjustes && SaimoAjustes.get("hideAdult"));
  },
  fonte: function fonte(url, meta) {
    meta = meta || {};
    return {
      url: url,
      quality: "Sua lista",
      audio: "DUB",
      referer: meta.referer || "",
      agent: meta.agent || meta.userAgent || "",
      suaLista: true,
      origem: "lista",
      origemNome: meta.listaNome || "Lista",
      listaNome: meta.listaNome || ""
    };
  },
  refererDaUrl: function refererDaUrl(url) {
    try {
      var u = new URL(String(url));
      return u.origin + "/";
    } catch (e) {
      return "";
    }
  },
  lerVlcOpt: function lerVlcOpt(linha) {
    var m = String(linha || "").match(/#EXTVLCOPT:(http-user-agent|http-referrer)=(.*)/i);
    if (!m) return null;
    return {
      key: m[1].toLowerCase(),
      val: (m[2] || "").trim()
    };
  },
  carregar: function carregar() {
    if (this._idbPronto) return this.listas;
    try {
      var raw = JSON.parse(localStorage.getItem(this.KEY) || "[]");
      if (Array.isArray(raw)) this.listas = raw;
    } catch (e) {}
    if (!this._idbTentou) {
      this._idbTentou = true;
      this._conectarIdb();
    }
    return this.listas;
  },
  /**
   * As listas vivem no IndexedDB (espaço de sobra). O localStorage fica só como
   * cópia de segurança da era antiga e ponto de partida da migração automática.
   * Em TV sem IndexedDB, tudo segue como antes.
   */
  _conectarIdb: function _conectarIdb() {
    var self = this;
    if (!window.indexedDB) {
      this._idbPronto = true;
      return;
    }
    try {
      var rq = indexedDB.open("saimo_tv", 1);
      rq.onupgradeneeded = function () {
        rq.result.createObjectStore("kv");
      };
      rq.onsuccess = function () {
        self._idb = rq.result;
        self._idb.onerror = function () {};
        self._carregarIdb();
      };
      rq.onerror = function () {
        self._idb = null;
        self._idbPronto = true;
      };
      rq.onblocked = function () {
        self._idb = null;
        self._idbPronto = true;
      };
    } catch (e) {
      this._idb = null;
      this._idbPronto = true;
    }
  },
  _carregarIdb: function _carregarIdb() {
    var self = this;
    if (!this._idb) {
      this._idbPronto = true;
      return;
    }
    try {
      var rq = this._idb.transaction("kv").objectStore("kv").get("listas");
      rq.onsuccess = function () {
        var salvo = rq.result;
        var migrando = !Array.isArray(salvo) && self.listas.length && !self._idbEscritas;
        self._idbPronto = true;
        if (Array.isArray(salvo) && salvo.length && !self._idbEscritas) {
          self.listas = salvo;
        } else if (self._idbEscritas || migrando) {
          self._gravarIdb(function (ok) {
            if (migrando && window.SaimoDiagnostico) {
              SaimoDiagnostico.logEvento(ok ? "listas_migradas" : "armazenamento_erro", ok ? self.listas.length + " lista(s) do localStorage para o IndexedDB" : "migração das listas para o IndexedDB falhou");
            }
          });
        }
      };
      rq.onerror = function () {
        self._idbPronto = true;
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "ler as listas do IndexedDB falhou");
      };
    } catch (e) {
      this._idbPronto = true;
    }
  },
  _gravarIdb: function _gravarIdb(cb) {
    var self = this;
    this._idbEscritas++;
    if (!this._idb || !this._idbPronto) {
      if (cb) cb(this._salvarLocalStorage());
      return;
    }
    var avisou = false;
    function falhou(err) {
      if (avisou) return;
      avisou = true;
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "IndexedDB: " + ((err && err.message) || ""));
      if (cb) cb(self._salvarLocalStorage());
    }
    try {
      var tx = this._idb.transaction("kv", "readwrite");
      tx.objectStore("kv").put(this.listas, "listas");
      tx.oncomplete = function () {
        if (!avisou) {
          avisou = true;
          if (cb) cb(true);
        }
      };
      tx.onabort = function () {
        falhou(tx.error);
      };
      tx.onerror = function () {
        falhou(tx.error);
      };
    } catch (e) {
      falhou(e);
    }
  },
  _salvarLocalStorage: function _salvarLocalStorage() {
    var texto = JSON.stringify(this.listas);
    try {
      localStorage.setItem(this.KEY, texto);
      return true;
    } catch (e) {}
    this.listas.forEach(function (lista) {
      (lista.itens || []).forEach(function (it) {
        it.logo = "";
      });
    });
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this.listas));
      return true;
    } catch (e2) {
      return false;
    }
  },
  salvar: function salvar() {
    var self = this;
    this.indiceSuja = true;
    if (this._idbPronto && this._idb) {
      this._gravarIdb(function (ok) {
        if (!ok && window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "as listas não persistiram (IndexedDB e localStorage falharam)");
      });
      return true;
    }
    this._idbEscritas++;
    return this._salvarLocalStorage();
  },
  lerExtinf: function lerExtinf(linha) {
    var logo = (linha.match(/tvg-logo="([^"]*)"/i) || [])[1] || "";
    var group = (linha.match(/group-title="([^"]*)"/i) || [])[1] || "";
    var virgula = linha.lastIndexOf(",");
    var name = virgula >= 0 ? linha.slice(virgula + 1).trim() : "";
    return {
      logo: logo,
      group: group,
      name: name
    };
  },
  classificar: function classificar(meta, url) {
    var grupo = meta.group || "";
    var bruto = (meta.name || "").trim();
    var g = this.fold(grupo);
    var ep = bruto.match(/(?:^|[\s._-])S(\d{1,2})\s*E(\d{1,3})(?=$|[\s._-])/i) || bruto.match(/(?:^|[\s._-])(\d{1,2})x(\d{2})(?=$|[\s._-])/i) || bruto.match(/(?:^|[\s._-])T(\d{1,2})\s*E(\d{1,3})(?=$|[\s._-])/i) || bruto.match(/(?:Temporada|Temp\.?)\s*(\d{1,2})(?:\s*(?:Episodio|Ep\.?|E)\s*(\d{1,3}))?/i) || bruto.match(/Season\s*(\d{1,2})(?:\s*(?:Episode|Ep\.?|E)\s*(\d{1,3}))?/i);
    var ext = String(url).split("?")[0].toLowerCase();
    var arquivo = /\.(mp4|mkv|avi|m4v)$/.test(ext);
    var grupoFilme = /filme|movie|\bvod\b|cinema/.test(g);
    var grupoSerie = /serie|series|temporada|novela|anime|dorama/.test(g);
    var kind = "live";
    var title = bruto;
    var season = 0;
    var episode = 0;
    if (ep) {
      season = parseInt(ep[1], 10) || 0;
      episode = parseInt(ep[2], 10) || 0;
      title = this.limparNome(bruto.slice(0, ep.index));
      kind = title ? "episode" : "skip";
    } else if (grupoSerie) {
      kind = "skip";
    } else if (arquivo || grupoFilme) {
      kind = "movie";
      title = this.limparNome(bruto);
    }
    if (!title) return null;
    if (kind === "skip") return null;
    var referer = meta.referer || "";
    var agent = meta.agent || "";
    return {
      kind: kind,
      name: bruto || title,
      title: title,
      group: grupo,
      url: url,
      logo: meta.logo || "",
      adult: this.adulto(bruto || title, grupo),
      season: season,
      episode: episode,
      referer: referer,
      agent: agent
    };
  },
  parse: function parse(texto, opts) {
    opts = opts || {};
    var linhas = String(texto || "").split(/\r?\n/);
    var out = [];
    var meta = null;
    var pendingRef = opts.refererDefault || "";
    var pendingAgent = opts.agentDefault || "";
    for (var i = 0; i < linhas.length; i++) {
      var l = linhas[i].trim();
      if (!l) continue;
      if (l.indexOf("#EXTVLCOPT") === 0) {
        var opt = this.lerVlcOpt(l);
        if (opt) {
          if (opt.key === "http-referrer") pendingRef = opt.val;else if (opt.key === "http-user-agent") pendingAgent = opt.val;
        }
        continue;
      }
      if (l.indexOf("#EXTINF") === 0) {
        meta = this.lerExtinf(l);
        meta.referer = pendingRef;
        meta.agent = pendingAgent;
        pendingRef = opts.refererDefault || "";
        pendingAgent = opts.agentDefault || "";
        continue;
      }
      if (l.charAt(0) === "#") continue;
      if (!/^https?:\/\//i.test(l)) {
        meta = null;
        continue;
      }
      var item = this.classificar(meta || {
        name: ""
      }, l);
      meta = null;
      if (item) out.push(item);
      if (out.length >= this.MAX_ITENS) break;
    }
    return out;
  },
  baixar: function baixar(url) {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var ctrl, t, headers, res, texto, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, 20000);
            headers = {};
            _context.p = 1;
            _context.n = 2;
            return fetch(url, {
              signal: ctrl.signal,
              headers: headers
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
            texto = _context.v;
            if (!(!texto || texto.length > 8 * 1024 * 1024)) {
              _context.n = 5;
              break;
            }
            return _context.a(2, null);
          case 5:
            return _context.a(2, _this.parse(texto, {
              refererDefault: _this.refererDaUrl(url)
            }));
          case 6:
            _context.p = 6;
            _t = _context.v;
            return _context.a(2, null);
          case 7:
            _context.p = 7;
            clearTimeout(t);
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[1, 6, 7, 8]]);
    }))();
  },
  resumo: function resumo(lista) {
    var _this2 = this;
    var itens = lista.itens || [];
    var canais = 0;
    var filmes = 0;
    var eps = 0;
    itens.forEach(function (it) {
      if (_this2.esconderAdulto() && it.adult) return;
      if (it.kind === "live") canais++;else if (it.kind === "movie") filmes++;else if (it.kind === "episode") eps++;
    });
    return {
      canais: canais,
      filmes: filmes,
      eps: eps
    };
  },
  adicionar: function adicionar(url) {
    url = String(url || "").trim();
    if (!/^https?:\/\//i.test(url)) {
      return Promise.resolve({
        ok: false,
        erro: "O link precisa começar com http:// ou https://"
      });
    }
    return this.adicionarDeTexto(null, {
      url: url,
      rotulo: url
    });
  },
  adicionarDeTexto: function adicionarDeTexto(texto, opts) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var url, rotulo, itens, lista;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            opts = opts || {};
            url = String(opts.url || "").trim();
            rotulo = String(opts.rotulo || url || "Lista importada").trim();
            if (!(_this3.listas.length >= _this3.MAX_LISTAS)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, {
              ok: false,
              erro: "Dá para guardar até " + _this3.MAX_LISTAS + " listas."
            });
          case 1:
            if (!url || !_this3.listas.some(function (l) {
              return l.url === url;
            })) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, {
              ok: false,
              erro: "Essa lista já está neste aparelho."
            });
          case 2:
            if (texto) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return _this3.baixar(url);
          case 3:
            itens = _context2.v;
            _context2.n = 5;
            break;
          case 4:
            itens = _this3.parse(texto, {
              refererDefault: url ? _this3.refererDaUrl(url) : ""
            });
          case 5:
            if (!(!itens || !itens.length)) {
              _context2.n = 6;
              break;
            }
            return _context2.a(2, {
              ok: false,
              erro: "Não foi possível ler a lista."
            });
          case 6:
            lista = {
              id: String(Date.now()),
              url: url || "arquivo:" + rotulo.slice(0, 48),
              rotulo: rotulo,
              ativa: true,
              em: Date.now(),
              itens: itens
            };
            _this3.listas.push(lista);
            if (_this3.salvar()) {
              _context2.n = 7;
              break;
            }
            _this3.listas.pop();
            return _context2.a(2, {
              ok: false,
              erro: "A lista é grande demais para este aparelho."
            });
          case 7:
            return _context2.a(2, {
              ok: true,
              lista: lista
            });
        }
      }, _callee2);
    }))();
  },
  adicionarArquivo: function adicionarArquivo(file) {
    var _this3a = this;
    return new Promise(function (resolve) {
      if (!file) {
        resolve({
          ok: false,
          erro: "Arquivo inválido."
        });
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        _this3a.adicionarDeTexto(String(reader.result || ""), {
          url: "",
          rotulo: file.name || "Lista .m3u"
        }).then(resolve).catch(function () {
          resolve({
            ok: false,
            erro: "Não foi possível ler o arquivo."
          });
        });
      };
      reader.onerror = function () {
        resolve({
          ok: false,
          erro: "Não foi possível ler o arquivo."
        });
      };
      reader.readAsText(file);
    });
  },
  remover: function remover(id) {
    this.listas = this.listas.filter(function (l) {
      return l.id !== id;
    });
    this.salvar();
  },
  alternar: function alternar(id) {
    var lista = this.listas.find(function (l) {
      return l.id === id;
    });
    if (!lista) return;
    lista.ativa = !lista.ativa;
    this.salvar();
  },
  atualizarSePreciso: function atualizarSePreciso() {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var agora, mudou, i, lista, itens;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            agora = Date.now();
            mudou = false;
            i = 0;
          case 1:
            if (!(i < _this4.listas.length)) {
              _context3.n = 6;
              break;
            }
            lista = _this4.listas[i];
            if (!(!lista.ativa || !lista.url || String(lista.url).indexOf("arquivo:") === 0)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(3, 5);
          case 2:
            if (!(lista.em && agora - lista.em < _this4.HORAS)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(3, 5);
          case 3:
            _context3.n = 4;
            return _this4.baixar(lista.url);
          case 4:
            itens = _context3.v;
            if (itens && itens.length) {
              lista.itens = itens;
              lista.em = agora;
              mudou = true;
            }
          case 5:
            i++;
            _context3.n = 1;
            break;
          case 6:
            if (mudou) _this4.salvar();
            return _context3.a(2, mudou);
        }
      }, _callee3);
    }))();
  },
  ativas: function ativas() {
    return this.listas.filter(function (l) {
      return l.ativa;
    });
  },
  cada: function cada(fn) {
    var _this5 = this;
    this.ativas().forEach(function (lista) {
      (lista.itens || []).forEach(function (it) {
        if (_this5.esconderAdulto() && it.adult) return;
        fn(it, lista);
      });
    });
  },
  canais: function canais(oficiais) {
    var _this6 = this;
    var out = [];
    this.ativas().forEach(function (lista) {
      (lista.itens || []).forEach(function (it) {
        if (it.kind !== "live") return;
        if (_this6.esconderAdulto() && it.adult) return;
        var name = it.name || it.title;
        var grupo = _this6.limparGrupo(it.group) || lista.rotulo || "Minhas listas";
        out.push({
          type: "channel",
          name: name,
          title: name,
          category: grupo,
          logo: it.logo || "",
          sources: [_this6.fonte(it.url, {
            referer: it.referer,
            agent: it.agent,
            listaNome: lista.rotulo || "Lista"
          })],
          suaLista: true
        });
      });
    });
    out.sort(function (a, b) {
      return a.name.localeCompare(b.name, "pt-BR");
    });
    return out;
  },
  casa: function casa(tituloLista, tituloCatalogo) {
    var a = this.chave(this.semAno(this.limparNome(tituloLista)));
    var b = this.chave(this.semAno(tituloCatalogo));
    return !!(a && b && a === b);
  },
  garantirIndice: function garantirIndice() {
    var self = this;
    if (!this.indiceSuja && this.indice) return;
    var filmes = Object.create(null);
    var eps = Object.create(null);
    this.ativas().forEach(function (lista) {
      (lista.itens || []).forEach(function (it) {
        if (!it || !it.title || !it.kind) return;
        var k = self.chave(self.semAno(self.limparNome(it.title)));
        if (!k) return;
        var alvo = it.kind === "movie" ? filmes : it.kind === "episode" ? eps : null;
        if (!alvo) return;
        if (!alvo[k]) alvo[k] = [];
        alvo[k].push(it);
      });
    });
    this.indice = { filmes: filmes, eps: eps };
    this.indiceSuja = false;
  },
  fontesFilme: function fontesFilme(titulo) {
    var self = this;
    this.garantirIndice();
    var k = self.chave(self.semAno(titulo));
    var bucket = this.indice && this.indice.filmes[k] || [];
    var esconder = this.esconderAdulto();
    var out = [];
    var visto = Object.create(null);
    bucket.forEach(function (it) {
      if (esconder && it.adult) return;
      if (visto[it.url]) return;
      visto[it.url] = 1;
      out.push(self.fonte(it.url, {
        referer: it.referer,
        agent: it.agent
      }));
    });
    return out;
  },
  juntarEpisodios: function juntarEpisodios(item) {
    var self = this;
    if (!item || !item.title) return item;
    this.garantirIndice();
    var k = self.chave(self.semAno(item.title));
    var cru = this.indice && this.indice.eps[k] || [];
    var esconder = this.esconderAdulto();
    var extras = cru.filter(function (it) {
      return !(esconder && it.adult);
    });
    if (!extras.length) return item;
    item.episodes = item.episodes || [];
    extras.forEach(function (it) {
      var ep = item.episodes.find(function (e) {
        return parseInt(e.season, 10) === it.season && parseInt(e.episode, 10) === it.episode;
      });
      if (!ep) {
        ep = {
          season: it.season,
          episode: it.episode,
          title: "Episódio " + it.episode,
          sources: []
        };
        item.episodes.push(ep);
      }
      ep.sources = ep.sources || [];
      if (!ep.sources.some(function (s) {
        return s.url === it.url;
      })) ep.sources.push(_this8.fonte(it.url, {
        referer: it.referer,
        agent: it.agent
      }));
    });
    item.episodes.sort(function (a, b) {
      return (parseInt(a.season, 10) || 0) - (parseInt(b.season, 10) || 0) || (parseInt(a.episode, 10) || 0) - (parseInt(b.episode, 10) || 0);
    });
    return item;
  },
  /**
   * Filmes e séries que não estão no catálogo.
   * existe(titulo, "movie"|"series") diz se o catálogo já tem o título.
   */
  soltos: function soltos(existe) {
    var _this9 = this;
    var filmes = [];
    var seriesMap = Object.create(null);
    var vistoFilme = Object.create(null);
    this.cada(function (it) {
      if (it.kind === "movie") {
        if (existe && existe(it.title, "movie")) return;
        var k = _this9.chave(it.title);
        if (vistoFilme[k]) {
          var card = filmes.find(function (f) {
            return _this9.chave(f.title) === k;
          });
          if (card && !card.sources.some(function (s) {
            return s.url === it.url;
          })) card.sources.push(_this9.fonte(it.url, {
            referer: it.referer,
            agent: it.agent
          }));
          return;
        }
        vistoFilme[k] = 1;
        filmes.push({
          type: "movie",
          title: it.title,
          posterUrl: it.logo || "",
          sources: [_this9.fonte(it.url, {
            referer: it.referer,
            agent: it.agent
          })],
          suaLista: true
        });
      } else if (it.kind === "episode") {
        if (existe && existe(it.title, "series")) return;
        var _k = _this9.chave(it.title);
        if (!seriesMap[_k]) {
          seriesMap[_k] = {
            type: "series",
            title: it.title,
            posterUrl: it.logo || "",
            episodes: [],
            suaLista: true
          };
        }
        var serie = seriesMap[_k];
        if (!serie.posterUrl && it.logo) serie.posterUrl = it.logo;
        var ep = serie.episodes.find(function (e) {
          return e.season === it.season && e.episode === it.episode;
        });
        if (!ep) {
          ep = {
            season: it.season,
            episode: it.episode,
            title: "Episódio " + it.episode,
            sources: []
          };
          serie.episodes.push(ep);
        }
        if (!ep.sources.some(function (s) {
          return s.url === it.url;
        })) ep.sources.push(_this9.fonte(it.url, {
          referer: it.referer,
          agent: it.agent
        }));
      }
    });
    var series = Object.keys(seriesMap).map(function (k) {
      return seriesMap[k];
    });
    series.forEach(function (s) {
      return s.episodes.sort(function (a, b) {
        return a.season - b.season || a.episode - b.episode;
      });
    });
    return filmes.concat(series);
  }
};
SaimoListas.carregar();
window.SaimoListas = SaimoListas;