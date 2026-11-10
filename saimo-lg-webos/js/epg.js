"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Guia 6 h no estilo Assist+: EPG curto por canal (Xtream) + cache local.
 * Sem baixar XMLTV de 16 MB.
 */
var SaimoEpg = {
  JANELA: 6 * 3600 * 1000,
  TTL: 6 * 3600 * 1000,
  MAX_PAR: 2,
  LOCAL: "vod/epg.json",
  PROXY: "https://saimo-webos.gabrielsaimo68.workers.dev",
  PROXY_HOSTS: {
    "www.guiadetv.com": 1,
    "guiadetv.com": 1,
    "meuguia.tv": 1,
    "www.meuguia.tv": 1
  },
  CACHE_KEY: "saimo_epg_cache",
  CACHE_AT: "saimo_epg_cache_em",
  byName: Object.create(null),
  vistoXtream: Object.create(null),
  falhou: Object.create(null),
  visto: Object.create(null),
  loaded: false,
  loading: null,
  fila: [],
  inflight: 0,
  _cacheTimer: 0,
  meuguiaCodes: {
    ae: "MDO",
    "a e": "MDO",
    "animal planet": "APL",
    axn: "AXN",
    band: "BAN",
    "band sports": "BSP",
    bandsports: "BSP",
    "cartoon network": "CAR",
    "canal brasil": "CBR",
    "canal off": "OFF",
    off: "OFF",
    cinemax: "MNX",
    combate: "135",
    "discovery channel": "DIS",
    "discovery home health": "HEA",
    "discovery kids": "DIK",
    "discovery science": "DSC",
    "discovery turbo": "DTU",
    "discovery world": "DIW",
    e: "EET",
    espn: "ESP",
    "espn 2": "ES2",
    "espn 3": "ES3",
    "espn 4": "ES4",
    "espn 5": "ES5",
    gnt: "GNT",
    globo: "GRD",
    "globo sp": "GRD",
    "globo rj": "GRD",
    "globo news": "GLN",
    globonews: "GLN",
    gloob: "GOB",
    hbo: "HBO",
    "hbo family": "HFA",
    "hbo plus": "HPL",
    "hbo signature": "HFE",
    "hbo 2": "HB2",
    hbo2: "HB2",
    history: "HIS",
    megapix: "MPX",
    multishow: "MSH",
    premiere: "121",
    "premiere clubes": "121",
    "premiere fc": "121",
    record: "REC",
    sbt: "SBT",
    sony: "SET",
    "sony channel": "SET",
    space: "SPA",
    sportv: "SPO",
    "sportv 2": "SP2",
    "sportv 3": "SP3",
    "studio universal": "HAL",
    "telecine action": "TC2",
    "telecine pipoca": "TC4",
    "telecine premium": "TC1",
    tnt: "TNT",
    tooncast: "TOC",
    "tnt series": "TBS",
    "universal tv": "USA",
    universal: "USA",
    viva: "VIV",
    warner: "WBT",
    "arte 1": "BQ5",
    tlc: "TRV",
    "tv escola": "ESC",
    escola: "ESC",
    "tv justica": "JUS",
    justica: "JUS"
  },
  slugs: {
    "a e": "ae",
    ae: "ae",
    agro: "agro",
    "agro mais": "agro",
    "canal agro": "agro",
    amc: "amc",
    "animal planet": "animal-planet",
    "arte 1": "arte-1",
    arte1: "arte-1",
    axn: "axn",
    band: "band",
    "band sp": "band",
    "band campinas": "band",
    "band curitiba": "band",
    "band mg": "band",
    "band para": "band",
    "band recife tv tribuna": "band",
    "band rn": "band",
    "band rs": "band",
    "band sergipe": "band",
    "band rj": "band-rj",
    "band news": "bandnews",
    bandnews: "bandnews",
    "band sports": "bandsports",
    bandsports: "bandsports",
    "bbc world": "bbc-world",
    "bbc world news": "bbc-world",
    bis: "bis",
    bloomberg: "bloomberg",
    "box kids": "box-kids",
    "box kids tv": "box-kids",
    "canal educacao": "canal-educacao",
    "canal rural": "canal-rural",
    "canal uol": "canal-uol",
    "cancao nova": "cancao-nova",
    "cartoon network": "cartoon-network",
    cartoonito: "cartoonito",
    cinemax: "cinemax",
    "cnn brasil": "cnn-brasil",
    combate: "combate",
    curta: "curta",
    "discovery channel": "discovery-channel",
    "discovery home health": "discovery-home-health",
    "discovery h h": "discovery-home-health",
    "discovery kids": "discovery-kids",
    "discovery science": "discovery-science",
    "discovery cience": "discovery-science",
    "discovery theater": "discovery-theater",
    "discovery theather": "discovery-theater",
    "discovery turbo": "discovery-turbo",
    "discovery world": "discovery-world",
    "discovery id": "investigacao-discovery",
    "investigacao discovery": "investigacao-discovery",
    "investigation discovery": "investigacao-discovery",
    e: "e",
    espn: "espn",
    "espn 2": "espn-2",
    "espn 3": "espn-3",
    "espn 4": "espn-4",
    "espn 5": "espn-5",
    "espn 6": "espn-6",
    "film arts": "film-arts",
    "food network": "food-network",
    "fox news": "fox-news",
    futura: "futura",
    "canal futura": "futura",
    "ge tv": "ge-tv",
    getv: "ge-tv",
    "globo news": "globo-news",
    globonews: "globo-news",
    "globo rj": "globo-rio-de-janeiro",
    "globo rio de janeiro": "globo-rio-de-janeiro",
    globo: "globo-sp",
    "globo sp": "globo-sp",
    "globo am": "globo-sp",
    "globo ce": "globo-sp",
    "globo df": "globo-sp",
    "globo es": "globo-sp",
    "globo go": "globo-sp",
    "globo mg": "globo-sp",
    "globo pb": "globo-sp",
    "globo pe": "globo-sp",
    "globo rs": "globo-sp",
    gloob: "gloob",
    gloobinho: "gloobinho",
    gnt: "gnt",
    hbo: "hbo",
    "hbo 2": "hbo-2",
    hbo2: "hbo-2",
    "hbo family": "hbo-family",
    "hbo mundi": "hbo-mundi",
    "hbo plus": "hbo-plus",
    "hbo mais": "hbo-plus",
    "hbo pop": "hbo-pop",
    "hbo signature": "hbo-signature",
    "hbo xtreme": "hbo-xtreme",
    hgtv: "hgtv",
    history: "history",
    "history channel": "history",
    "history 2": "history-2",
    h2: "history-2",
    "jovem pan news": "jovem-pan-news",
    lifetime: "lifetime",
    "lifetime movies": "lifetime",
    megapix: "megapix",
    multishow: "multishow",
    "music box brazil": "music-box-brazil",
    "music box brasil": "music-box-brazil",
    "music box": "music-box-brazil",
    "n sports": "nsports",
    nsports: "nsports",
    "n sports jogo 1": "nsports",
    off: "off",
    "canal off": "off",
    premiere: "premiere-fc",
    "premiere clubes": "premiere-fc",
    "premiere fc": "premiere-fc",
    "premiere 2": "premiere-2",
    "premiere 3": "premiere-3",
    "premiere 4": "premiere-4",
    "premiere 5": "premiere-5",
    "premiere 6": "premiere-6",
    "premiere 7": "premiere-7",
    "prime box brazil": "prime-box-brazil",
    "record news": "record-news",
    record: "record-tv",
    "record tv": "record-tv",
    "record sp": "record-tv",
    "record go": "record-tv",
    "record mg": "record-tv",
    "record rj": "record-tv",
    "record internacional": "record-tv",
    recordtv: "record-tv",
    "rede brasil": "rede-brasil",
    "rede familia": "rede-familia",
    "rede gospel": "rede-gospel",
    redetv: "rede-tv",
    "rede tv": "rede-tv",
    "rede vida": "rede-vida",
    sbt: "sbt",
    "sbt sp": "sbt",
    "sbt alterosa": "sbt",
    "sbt ba": "sbt",
    "sbt go": "sbt",
    "sbt interior": "sbt",
    "sbt londrina": "sbt",
    "sbt maringa": "sbt",
    "sbt mg": "sbt",
    "sbt pi": "sbt",
    "sbt pr": "sbt",
    "sbt news": "sbt-news",
    "sbt rj": "sbt-rio-de-janeiro",
    "sbt rio de janeiro": "sbt-rio-de-janeiro",
    sony: "sony",
    "canal sony": "sony",
    "discovery tlc": "tlc",
    "sony channel": "sony",
    "sony movies": "sony-movies",
    space: "space",
    sportv: "sportv",
    "sportv 2": "sportv-2",
    sportv2: "sportv-2",
    "sportv 3": "sportv-3",
    sportv3: "sportv-3",
    sportynet: "sportynet",
    "sportynet 01": "sportynet",
    "sportynet 4": "sportynet",
    "sportynet 1": "sportynet",
    "sportynet 2": "sportynet",
    "sportynet 3": "sportynet",
    "studio universal": "studio-universal",
    syfy: "syfy",
    "usa network": "syfy",
    tcm: "tcm",
    "telecine action": "telecine-action",
    "telecine cult": "telecine-cult",
    "telecine fun": "telecine-fun",
    "telecine pipoca": "telecine-pipoca",
    "telecine premium": "telecine-premium",
    "telecine touch": "telecine-touch",
    "terra viva": "terra-viva",
    tlc: "tlc",
    tnt: "tnt",
    "tnt novelas": "tnt-novelas",
    "tnt series": "tnt-series",
    tooncast: "tooncast",
    "travel box brazil": "travel-box-brasil",
    "travel box brasil": "travel-box-brasil",
    trutv: "trutv",
    "adult swim": "trutv",
    "tv aparecida": "tv-aparecida",
    "tv brasil": "tv-brasil",
    "tv camara": "tv-camara",
    "tv cultura": "tv-cultura",
    cultura: "tv-cultura",
    "tv gazeta": "tv-gazeta",
    gazeta: "tv-gazeta",
    "tv ra tim bum": "tv-ra-tim-bum",
    "ra tim bum": "tv-ra-tim-bum",
    "tv senado": "tv-senado",
    "universal tv": "universal-tv",
    "universal channel": "universal-tv",
    viva: "viva",
    "canal viva": "viva",
    "globoplay novelas": "viva",
    warner: "warner",
    "warner channel": "warner",
    woohoo: "woohoo",
    "x sports": "xsports",
    xsports: "xsports",
    "amc series": "amc",
    "cnn brasil money": "cnn-brasil",
    "canal gov": "canal-gov",
    "chef tv": "chef-tv",
    "comedy central": "comedy-central",
    "cultura fast": "cultura-fast",
    "fifa": "fifa",
    "fifa portugues": "fifa",
    mtv: "mtv",
    "paramount channel": "paramount-channel",
    "paramount network": "paramount-channel",
    "premiere 1": "premiere-fc",
    "premiere 8": "premiere-fc",
    "premiere 8 mosaico": "premiere-fc",
    "rede criancas": "rede-criancas",
    "espn 1": "espn",
    "sportv 1": "sportv",
    "star channel": "star-channel",
    "tv a critica": "tv-a-critica",
    uol: "canal-uol",
    bbc: "bbc-world",
    "cnn internacional": "cnn-brasil",
    "cnn international": "cnn-brasil",
    "tv cancao nova": "cancao-nova"
  },
  fold: function fold(s) {
    return String(s || "").replace(/\+/g, " plus ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  },
  decode: function decode(s) {
    return String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
  },
  norm: function norm(s) {
    var k = this.fold(this.decode(s));
    k = k.replace(/\b(fhd|uhd|4k|8k|full hd|hd|sd|hevc|h265|h264|fhd60|60fps|multi audio|alt|fhdr|ot|rk)\b/g, " ");
    k = k.replace(/\s+/g, " ").trim();
    k = k.replace(/^br\s+/, "");
    k = k.replace(/\s+lista\s+\d+$/, "");
    var aliases = {
      "a e": "ae",
      ae: "ae",
      "globo news": "globonews",
      globonews: "globonews",
      cnn: "cnn brasil",
      "band brasil": "band",
      "band sp": "band",
      "premiere fc": "premiere clubes",
      "warner channel": "warner",
      "sony channel": "sony",
      "canal sony": "sony",
      "discovery tlc": "tlc",
      "history channel": "history",
      "universal tv": "universal",
      "universal channel": "universal",
      recordtv: "record",
      "record tv": "record",
      "discovery theather": "discovery theater",
      "discovery cience": "discovery science",
      "music box brasil": "music box brazil",
      "hbo mais": "hbo plus",
      "fashion tv": "fashiontv",
      "ge tv": "ge tv"
    };
    return aliases[k] || k;
  },
  marcaSlug: function marcaSlug(n) {
    if (/^globo news|^globonews/.test(n)) return "globo-news";
    if (/^globo rj|^globo rio/.test(n)) return "globo-rio-de-janeiro";
    if (/^globo/.test(n)) return "globo-sp";
    if (/anhanguera|eptv|nsc|rbs tv|^rbs |^rpc |intertv|inter tv|rede amazonica|tv tem |tv integracao|tv morena|centro america|tv liberal|tv mirante|verdes mares|tv cabo branco|tv clube|tv diario mogi|tv fronteira|tv grande rio|tv paraiba|tv rio sul|tv sergipe|tv subae|tv sudoeste|tv tribuna santos|tv vanguarda|asa branca|gazeta (noroeste|norte|sul)/.test(n)) return "globo-sp";
    if (/^record news/.test(n)) return "record-news";
    if (/^record/.test(n)) return "record-tv";
    if (/^sbt news/.test(n)) return "sbt-news";
    if (/^sbt rj|^sbt rio/.test(n)) return "sbt-rio-de-janeiro";
    if (/^sbt/.test(n)) return "sbt";
    if (/^band news/.test(n)) return "bandnews";
    if (/^band sports/.test(n)) return "bandsports";
    if (/^band rj/.test(n)) return "band-rj";
    if (/^band/.test(n)) return "band";
    return "";
  },
  ehDeListaImportada: function ehDeListaImportada(canal) {
    if (!canal || typeof canal !== "object") return false;
    if (canal.suaLista) return true;
    var fontes = canal.sources || [];
    for (var i = 0; i < fontes.length; i++) {
      if (fontes[i] && (fontes[i].suaLista || fontes[i].origem === "lista")) return true;
    }
    return false;
  },
  pulaGrade: function pulaGrade(nome) {
    var n = this.norm(nome);
    return /^(a fazenda|amazon prime|prime video|apple tv|appletv|disney|cine sky|dazn|caze|goat|campeonato|eventos extras|formula 1|ufc|onefootball|nba league|hbo max|max(?:\s|$))/.test(n) || /\bsinal\s+\d/.test(n);
  },
  slug: function slug(name) {
    var n = this.norm(name);
    if (this.slugs[n]) return this.slugs[n];
    if (this.slugs[this.fold(name)]) return this.slugs[this.fold(name)];
    var noNum = n.replace(/\s+\d{1,2}$/, "");
    if (noNum !== n && this.slugs[noNum]) return this.slugs[noNum];
    var marca = this.marcaSlug(n);
    if (marca) return marca;
    var parts = n.split(" ");
    while (parts.length > 1) {
      parts.pop();
      var t = parts.join(" ");
      if (this.slugs[t] && !/^(tv|canal|rede)$/.test(t)) return this.slugs[t];
    }
    return "";
  },
  codeMeuguia: function codeMeuguia(name) {
    var n = this.norm(name);
    if (this.meuguiaCodes[n]) return this.meuguiaCodes[n];
    if (this.meuguiaCodes[this.fold(name)]) return this.meuguiaCodes[this.fold(name)];
    var marca = this.marcaSlug(n);
    var deSlug = {
      "globo-sp": "GRD",
      "globo-rio-de-janeiro": "GRD",
      "record-tv": "REC",
      sbt: "SBT",
      band: "BAN",
      "band-rj": "BAN"
    };
    return deSlug[marca] || "";
  },
  hhmm: function hhmm(ms) {
    var d = new Date(ms);
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  },
  janela: function janela() {
    var agora = Date.now();
    return {
      from: agora - 3600000,
      to: agora + this.JANELA,
      agora: agora
    };
  },
  filtrar: function filtrar(lista) {
    var j = this.janela();
    return (lista || []).filter(function (p) {
      return p.stop > j.from && p.start < j.to;
    });
  },
  guardar: function guardar(nome, lista) {
    var key = this.norm(nome);
    if (!key || !lista || !lista.length) return;
    var prev = this.byName[key] || [];
    var score = function score(list) {
      return list.length + list.filter(function (p) {
        return p && p.desc;
      }).length;
    };
    var escolhida = score(lista) >= score(prev) ? lista : prev;
    var outra = escolhida === lista ? prev : lista;
    this.byName[key] = this.mesclar(outra, escolhida);
    var s = this.slug(nome);
    if (s) {
      var prevS = this.byName["@" + s] || [];
      this.byName["@" + s] = score(this.byName[key]) >= score(prevS) ? this.byName[key] : prevS;
    }
    this.gravarCache();
  },
  lerCache: function lerCache() {
    var _this = this;
    try {
      var quando = parseInt(localStorage.getItem(this.CACHE_AT) || "0", 10);
      if (!quando || Date.now() - quando > this.TTL) return;
      var data = JSON.parse(localStorage.getItem(this.CACHE_KEY) || "{}");
      Object.keys(data).forEach(function (k) {
        if (Array.isArray(data[k]) && data[k].length) _this.guardarMem(k, data[k]);
      });
    } catch (e) {}
  },
  guardarMem: function guardarMem(key, lista) {
    var prev = this.byName[key] || [];
    var score = function score(list) {
      return list.length + list.filter(function (p) {
        return p && p.desc;
      }).length;
    };
    this.byName[key] = score(lista) >= score(prev) ? lista : prev;
  },
  gravarCache: function gravarCache() {
    var _this2 = this;
    if (this._cacheTimer) clearTimeout(this._cacheTimer);
    this._cacheTimer = setTimeout(function () {
      var t0 = Date.now();
      try {
        var slim = {};
        Object.keys(_this2.byName).forEach(function (k) {
          slim[k] = (_this2.byName[k] || []).map(function (p) {
            var item = {
              title: p.title,
              desc: p.desc || "",
              start: p.start,
              stop: p.stop
            };
            if (p.pagina) item.pagina = p.pagina;
            return item;
          });
        });
        localStorage.setItem(_this2.CACHE_KEY, JSON.stringify(slim));
        localStorage.setItem(_this2.CACHE_AT, String(Date.now()));
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "epg cache: " + (Date.now() - t0) + "ms");
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "epg_cache: " + ((e && e.message) || ""));
      }
    }, 800);
  },
  parseDur: function parseDur(s) {
    var t = String(s || "").replace(/<[^>]+>/g, "").trim().toLowerCase();
    if (!t) return 45 * 60000;
    if (t.indexOf("h") !== -1) {
      var parts = t.split("h");
      var h = parseInt(parts[0], 10) || 0;
      var m = parseInt(String(parts[1] || "").replace(/\D/g, ""), 10) || 0;
      var ms = (h * 3600 + m * 60) * 1000;
      return ms > 0 ? ms : 45 * 60000;
    }
    if (t.indexOf("min") !== -1) {
      var _m = parseInt(t, 10) || 0;
      return _m > 0 ? _m * 60000 : 45 * 60000;
    }
    return 45 * 60000;
  },
  b64: function b64(s) {
    if (!s) return "";
    var raw = String(s).replace(/\s+/g, "");
    try {
      return decodeURIComponent(escape(atob(raw)));
    } catch (e) {
      try {
        return atob(raw);
      } catch (e2) {
        return String(s);
      }
    }
  },
  desrele: function desrele(url) {
    var m = String(url || "").match(/\/relay\/p\/([A-Za-z0-9+/=]+)/i);
    if (!m) return url;
    try {
      return this.b64(m[1]);
    } catch (e) {
      return url;
    }
  },
  xtreamDe: function xtreamDe(url) {
    var real = this.desrele(url);
    var m = String(real).match(/^(https?:\/\/[^/]+)\/live\/([^/]+)\/([^/]+)\/(\d+)/i) || String(real).match(/^(https?:\/\/[^/]+)\/([^/]+)\/([^/]+)\/(\d+)\.(?:m3u8|ts)/i);
    if (!m) return null;
    return {
      host: m[1],
      user: m[2],
      pass: m[3],
      id: m[4]
    };
  },
  xtreamDoCanal: function xtreamDoCanal(canal) {
    var perfil = window.SaimoXtream && SaimoXtream.perfilSalvo ? SaimoXtream.perfilSalvo() : null;
    var id = canal && (canal.xtreamId || canal.stream_id);
    if (perfil && id && (canal.xtream || canal.epgChannelId || canal.origemNome === "Xtream")) {
      var host = window.SaimoXtream.sanitizeHost ? SaimoXtream.sanitizeHost(perfil.host) : perfil.host;
      return {
        host: host,
        user: perfil.username,
        pass: perfil.password,
        id: String(id)
      };
    }
    var fontes = canal && canal.sources || [];
    for (var i = 0; i < fontes.length; i++) {
      var x = this.xtreamDe(fontes[i].url);
      if (x) return x;
    }
    if (perfil && id) {
      return {
        host: window.SaimoXtream && SaimoXtream.sanitizeHost ? SaimoXtream.sanitizeHost(perfil.host) : perfil.host,
        user: perfil.username,
        pass: perfil.password,
        id: String(id)
      };
    }
    return null;
  },
  lerXtream: function lerXtream(json) {
    var _this3 = this;
    var lista = json && (json.epg_listings || json.listings) || [];
    var out = [];
    lista.forEach(function (item) {
      var start = parseInt(item.start_timestamp, 10) * 1000;
      var stop = parseInt(item.stop_timestamp || item.end_timestamp, 10) * 1000;
      if (!start) start = Date.parse(item.start || item.time || "") || 0;
      if (!stop) stop = Date.parse(item.end || item.stop || "") || 0;
      if (!start) return;
      if (!stop) stop = start + 3600000;
      var title = _this3.b64(item.title) || item.title || "";
      var desc = _this3.b64(item.description) || item.description || "";
      if (!title) return;
      out.push({
        title: String(title).trim(),
        desc: String(desc).trim(),
        start: start,
        stop: stop
      });
    });
    out.sort(function (a, b) {
      return a.start - b.start;
    });
    return out;
  },
  log: function log(msg) {
    try {
      if (window.SaimoDiagnostico && SaimoDiagnostico.linha) SaimoDiagnostico.linha("EPG · " + msg);
    } catch (e) {}
  },
  logGrade: function logGrade(marca, lista) {
    var nn = this.nowNext(lista);
    var extra = "";
    if (nn && nn.current && nn.current.title) extra = " · agora " + nn.current.title;
    else if (nn && nn.next && nn.next.title) extra = " · a seguir " + nn.next.title;
    this.log(marca + " · " + ((lista && lista.length) || 0) + " programas" + extra);
  },
  viaProxy: function viaProxy(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      if (!this.PROXY_HOSTS[h]) return url;
      if (window.SaimoAPI && SaimoAPI.proxyUrl) return SaimoAPI.proxyUrl({ url: url });
      return this.PROXY + "/proxy?u=" + encodeURIComponent(url);
    } catch (e) {}
    return url;
  },
  buscarComLimite: function buscarComLimite(url, ms) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = 0;
    var estouro = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        if (ctrl) {
          try {
            ctrl.abort();
          } catch (e) {}
        }
        reject(new Error("timeout"));
      }, ms);
    });
    var pedido = fetch(url, ctrl ? {
      signal: ctrl.signal
    } : undefined).then(function (res) {
      if (!res.ok) throw new Error("http");
      return res.text();
    });
    return Promise.race([pedido, estouro]).then(function (v) {
      clearTimeout(timer);
      return v;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  },
  pedir: function pedir(url) {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var lista, via, querJson, i, texto, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            lista = [];
            via = _this4.viaProxy(url);
            if (via !== url) lista.push(via);
            if (window.SaimoAPI && SaimoAPI.proxyUrl) {
              var api = SaimoAPI.proxyUrl({ url: url });
              if (api && lista.indexOf(api) === -1) lista.push(api);
            }
            if (lista.indexOf(url) === -1) lista.push(url);
            querJson = url.indexOf("player_api") !== -1;
            i = 0;
          case 1:
            if (!(i < lista.length)) {
              _context.n = 10;
              break;
            }
            _context.p = 2;
            _context.n = 3;
            return _this4.buscarComLimite(lista[i], 8000);
          case 3:
            texto = _context.v;
            if (!(texto == null || texto === "")) {
              _context.n = 4;
              break;
            }
            return _context.a(3, 9);
          case 4:
            if (!querJson) {
              _context.n = 7;
              break;
            }
            _context.p = 5;
            return _context.a(2, JSON.parse(texto));
          case 6:
            _context.p = 6;
            _t = _context.v;
            return _context.a(3, 9);
          case 7:
            return _context.a(2, texto);
          case 8:
            _context.p = 8;
            _t2 = _context.v;
          case 9:
            i++;
            _context.n = 1;
            break;
          case 10:
            return _context.a(2, null);
        }
      }, _callee, null, [[5, 6], [2, 8]]);
    }))();
  },
  xtreamEpg: function xtreamEpg(x) {
    var _this5 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var marca, base, json, list;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            marca = x.host + "|" + x.id;
            if (!(_this5.vistoXtream[marca] && Date.now() - _this5.vistoXtream[marca].at < (_this5.vistoXtream[marca].list && _this5.vistoXtream[marca].list.length ? _this5.TTL : 20 * 60 * 1000))) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, _this5.vistoXtream[marca].list);
          case 1:
            base = x.host + "/player_api.php?username=" + encodeURIComponent(x.user) + "&password=" + encodeURIComponent(x.pass) + "&stream_id=" + x.id;
            _context2.n = 2;
            return _this5.pedir(base + "&action=get_short_epg&limit=16");
          case 2:
            json = _context2.v;
            list = _this5.lerXtream(json);
            if (list.length) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return _this5.pedir(base + "&action=get_simple_data_table");
          case 3:
            json = _context2.v;
            list = _this5.filtrar(_this5.lerXtream(json));
          case 4:
            _this5.vistoXtream[marca] = {
              at: Date.now(),
              list: list
            };
            return _context2.a(2, list);
        }
      }, _callee2);
    }))();
  },
  parseGuiaLd: function parseGuiaLd(html) {
    var out = [];
    var chunks = String(html).split('type="application/ld+json"');
    for (var i = 1; i < chunks.length; i++) {
      var open = chunks[i].indexOf(">");
      var close = chunks[i].indexOf("</script>");
      if (open === -1 || close === -1 || close <= open) continue;
      var raw = chunks[i].slice(open + 1, close).trim();
      var data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        continue;
      }
      var evs = data && data.broadcastEvent;
      if (!evs || !evs.length) continue;
      for (var j = 0; j < evs.length; j++) {
        var ev = evs[j];
        var start = Date.parse(ev && ev.startDate || "");
        var stop = Date.parse(ev && ev.endDate || "");
        var title = this.decode(ev && ev.name || "").trim();
        if (!start || !title) continue;
        out.push({
          title: title,
          desc: "",
          start: start,
          stop: stop || start + 45 * 60000,
          pagina: ""
        });
      }
    }
    out.sort(function (a, b) {
      return a.start - b.start;
    });
    return out;
  },
  parseGuia: function parseGuia(html) {
    var ld = this.parseGuiaLd(html);
    var parts = String(html).split("<li");
    var raw = [];
    for (var i = 1; i < parts.length; i++) {
      var li = parts[i];
      var dtm = li.indexOf('datetime="');
      if (dtm === -1) continue;
      var q = li.indexOf('"', dtm + 10);
      var dt = li.slice(dtm + 10, q > dtm ? q : dtm + 35);
      var start = Date.parse(dt);
      if (!start) continue;
      var prog = li.indexOf("/programa/");
      if (prog === -1) continue;
      var pagina = this.paginaDoLi(li, prog);
      var aOpen = li.indexOf(">", prog);
      var aClose = li.indexOf("</a>", aOpen);
      if (aOpen === -1 || aClose === -1) continue;
      var title = this.decode(li.slice(aOpen + 1, aClose).replace(/<[^>]+>/g, "")).trim();
      if (title.length < 2) continue;
      var dur = 45 * 60000;
      var timeClose = li.indexOf("</time>");
      if (timeClose !== -1) {
        var spanTag = li.indexOf("<span", timeClose);
        var spanOpen = spanTag !== -1 ? li.indexOf(">", spanTag) : -1;
        var spanClose = spanOpen !== -1 ? li.indexOf("</span>", spanOpen) : -1;
        if (spanOpen !== -1 && spanClose !== -1) {
          dur = this.parseDur(li.slice(spanOpen + 1, spanClose));
        }
      }
      var desc = "";
      var pTag = li.indexOf("<p");
      if (pTag !== -1) {
        var pOpen = li.indexOf(">", pTag);
        var pClose = li.indexOf("</p>", pOpen);
        if (pOpen !== -1 && pClose !== -1) {
          desc = this.decode(li.slice(pOpen + 1, pClose).replace(/<[^>]+>/g, "")).trim();
        }
      }
      raw.push({
        title: title,
        desc: desc,
        start: start,
        stop: start + dur,
        pagina: pagina
      });
    }
    raw.sort(function (a, b) {
      return a.start - b.start;
    });
    var unique = [];
    raw.forEach(function (p) {
      if (unique.length && unique[unique.length - 1].start === p.start) return;
      unique.push(p);
    });
    var lis = unique.map(function (p, i) {
      var next = unique[i + 1];
      var stop = p.stop;
      if (next && (stop > next.start || Math.abs(stop - next.start) <= 60000)) stop = next.start;
      return {
        title: p.title,
        desc: p.desc,
        start: p.start,
        stop: stop,
        pagina: p.pagina || ""
      };
    });
    return lis.length >= ld.length ? lis : ld;
  },
  guiaHtml: function guiaHtml(nome) {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var slug, html;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            slug = _this6.slug(nome);
            if (!slug) return _context3.a(2, []);
            _this6.log((nome || "?") + " → " + slug);
            if (!(!slug || _this6.falhou[slug])) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, []);
          case 1:
            _context3.n = 2;
            return _this6.pedir("https://www.guiadetv.com/canal/" + slug);
          case 2:
            html = _context3.v;
            if (!(!html || typeof html !== "string")) {
              _context3.n = 3;
              break;
            }
            _this6.falhou[slug] = 1;
            _this6.log("sem página · " + slug);
            return _context3.a(2, []);
          case 3:
            html = _this6.filtrar(_this6.parseGuia(html));
            _this6.logGrade(slug, html);
            return _context3.a(2, html);
        }
      }, _callee3);
    }))();
  },
  parseMeuGuia: function parseMeuGuia(html) {
    var parts = String(html).split("<li");
    var hoje = new Date();
    var hojeMes = hoje.getMonth() + 1;
    var year = hoje.getFullYear();
    var month = hojeMes;
    var day = hoje.getDate();
    var raw = [];
    for (var i = 1; i < parts.length; i++) {
      var li = parts[i];
      if (li.indexOf("subheader") !== -1) {
        var gt = li.indexOf(">");
        var lt = gt === -1 ? -1 : li.indexOf("<", gt);
        var text = gt !== -1 && lt !== -1 ? li.slice(gt + 1, lt) : "";
        var comma = text.indexOf(",");
        if (comma === -1) continue;
        var dm = text.slice(comma + 1).trim().split("/");
        if (dm.length < 2) continue;
        var d = parseInt(dm[0], 10);
        var m = parseInt(dm[1], 10);
        if (!d || !m) continue;
        year = m < hojeMes ? hoje.getFullYear() + 1 : hoje.getFullYear();
        month = m;
        day = d;
        continue;
      }
      var m1 = li.indexOf("lileft time'>");
      var m2 = li.indexOf('lileft time">');
      var marker = m1 !== -1 ? m1 + 13 : m2 !== -1 ? m2 + 13 : -1;
      if (marker === -1) continue;
      var clockEnd = li.indexOf("<", marker);
      if (clockEnd === -1) continue;
      var hm = li.slice(marker, clockEnd).trim().split(":");
      if (hm.length < 2) continue;
      var h2 = li.indexOf("<h2>");
      var h2e = li.indexOf("</h2>", h2);
      if (h2 === -1 || h2e === -1) continue;
      var title = this.decode(li.slice(h2 + 4, h2e).replace(/<[^>]+>/g, "")).trim();
      if (!title) continue;
      var h3 = li.indexOf("<h3>");
      var h3e = li.indexOf("</h3>", h3);
      var cat = h3 !== -1 && h3e !== -1 ? this.decode(li.slice(h3 + 4, h3e).replace(/<[^>]+>/g, "")).trim() : "";
      var start = new Date(year, month - 1, day, parseInt(hm[0], 10) || 0, parseInt(hm[1], 10) || 0, 0).getTime();
      if (!start) continue;
      raw.push({
        title: title,
        desc: cat,
        start: start
      });
    }
    raw.sort(function (a, b) {
      return a.start - b.start;
    });
    return raw.map(function (p, i) {
      var next = raw[i + 1];
      return {
        title: p.title,
        desc: p.desc || "",
        start: p.start,
        stop: next ? next.start : p.start + 3600000
      };
    });
  },
  meuguiaHtml: function meuguiaHtml(nome) {
    var _this7 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var code, html;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            code = _this7.codeMeuguia(nome);
            if (!(!code || _this7.falhou["mg:" + code])) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, []);
          case 1:
            _context4.n = 2;
            return _this7.pedir("https://meuguia.tv/programacao/canal/" + code);
          case 2:
            html = _context4.v;
            if (!(!html || typeof html !== "string")) {
              _context4.n = 3;
              break;
            }
            _this7.falhou["mg:" + code] = 1;
            return _context4.a(2, []);
          case 3:
            html = _this7.filtrar(_this7.parseMeuGuia(html));
            _this7.logGrade("MeuGuia " + code, html);
            return _context4.a(2, html);
        }
      }, _callee4);
    }))();
  },
  aplicarJson: function aplicarJson(data) {
    var _this8 = this;
    var t0 = Date.now();
    var n = 0;
    var ch = data && data.channels || {};
    Object.keys(ch).forEach(function (nome) {
      n++;
      return _this8.guardar(nome, ch[nome]);
    });
    if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("perf", "epg aplicar: " + n + " canais · " + (Date.now() - t0) + "ms");
  },
  ensure: function ensure() {
    var _this9 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (!_this9.loaded) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            if (!_this9.loading) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, _this9.loading);
          case 2:
            _this9.loading = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
              var res, _t3, _t4;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.p = _context5.n) {
                  case 0:
                    _context5.p = 0;
                    _context5.n = 1;
                    /* fetch() em file:// é bloqueado no Chrome 94 (webOS 23); XHR passa.
                       Adaptador devolve "resposta" com ok/text/json p/ o gerador abaixo. */
                    return (window.SaimoAPI && SaimoAPI.fetchTextXhr ? SaimoAPI.fetchTextXhr(_this9.LOCAL).then(function (txt) {
                      return {
                        ok: !!txt,
                        status: txt ? 200 : 0,
                        text: function () { return Promise.resolve(txt || ""); },
                        json: function () {
                          try { return Promise.resolve(JSON.parse(txt || "{}")); }
                          catch (eJ) { return Promise.reject(eJ); }
                        }
                      };
                    }) : fetch(_this9.LOCAL));
                  case 1:
                    res = _context5.v;
                    if (!res.ok) {
                      _context5.n = 3;
                      break;
                    }
                    _t3 = _this9;
                    _context5.n = 2;
                    return res.json();
                  case 2:
                    _t3.aplicarJson.call(_t3, _context5.v);
                  case 3:
                    _context5.n = 5;
                    break;
                  case 4:
                    _context5.p = 4;
                    _t4 = _context5.v;
                  case 5:
                    _this9.lerCache();
                    _this9.loaded = true;
                  case 6:
                    return _context5.a(2);
                }
              }, _callee5, null, [[0, 4]]);
            }))();
            return _context6.a(2, _this9.loading);
        }
      }, _callee6);
    }))();
  },
  listaLocal: function listaLocal(nome) {
    var n = this.norm(nome);
    var list = this.filtrar(this.byName[n] || []);
    if (list.length) return list;
    var s = this.slug(nome);
    if (s) {
      list = this.filtrar(this.byName["@" + s] || []);
      if (list.length) return list;
    }
    return [];
  },
  temSinopse: function temSinopse(lista) {
    return (lista || []).some(function (p) {
      return p && p.desc && String(p.desc).length > 24;
    });
  },
  cortado: function cortado(desc) {
    var t = String(desc || "").trim();
    return t.slice(-1) === "…" || t.slice(-3) === "...";
  },
  precisaPagina: function precisaPagina(lista) {
    var _this0 = this;
    return (lista || []).some(function (p) {
      return p && _this0.cortado(p.desc) && !p.pagina;
    });
  },
  escolherDesc: function escolherDesc(a, b) {
    var da = String(a && a.desc || "");
    var db = String(b && b.desc || "");
    if (!this.cortado(da) && this.cortado(db)) return da;
    if (!this.cortado(db) && this.cortado(da)) return db;
    return da.length >= db.length ? da : db;
  },
  mesclar: function mesclar(base, escolhida) {
    var _this1 = this;
    var porInicio = Object.create(null);
    (base || []).forEach(function (p) {
      if (p && p.start) porInicio[p.start] = p;
    });
    return (escolhida || []).map(function (p) {
      var old = porInicio[p.start];
      if (!old) return p;
      var desc = _this1.escolherDesc(p, old);
      var pagina = p.pagina || old.pagina || "";
      if (desc === (p.desc || "") && pagina === (p.pagina || "")) return p;
      return {
        title: p.title,
        desc: desc,
        start: p.start,
        stop: p.stop,
        pagina: pagina
      };
    });
  },
  paginaDoLi: function paginaDoLi(li, prog) {
    var q1 = li.lastIndexOf('"', prog);
    var q2 = li.lastIndexOf("'", prog);
    var q0 = q1 > q2 ? q1 : q2;
    if (q0 === -1) return "";
    var end = li.indexOf(li.charAt(q0), prog);
    if (end === -1) return "";
    var href = li.slice(q0 + 1, end);
    var cut = href.indexOf("/programa/");
    if (cut === -1) return "";
    var path = href.slice(cut);
    var q = path.indexOf("?");
    if (q !== -1) path = path.slice(0, q);
    var h = path.indexOf("#");
    if (h !== -1) path = path.slice(0, h);
    if (path.indexOf(" ") !== -1) path = path.slice(0, path.indexOf(" "));
    if (path.indexOf("..") !== -1 || path.indexOf("/programa/") !== 0) return "";
    return path;
  },
  metaDescricao: function metaDescricao(html) {
    var s = String(html || "");
    var name = s.indexOf('name="description"');
    if (name === -1) return "";
    var tagStart = s.lastIndexOf("<meta", name);
    var tagEnd = s.indexOf(">", name);
    if (tagStart === -1 || tagEnd === -1) return "";
    var tag = s.slice(tagStart, tagEnd);
    var c = tag.indexOf('content="');
    if (c === -1) return "";
    var start = c + 9;
    var end = tag.indexOf('"', start);
    if (end === -1) return "";
    return this.decode(tag.slice(start, end)).trim();
  },
  completar: function completar(p) {
    var _this10 = this;
    if (!p || !this.cortado(p.desc) || !p.pagina) return Promise.resolve(p);
    if (p._cheia) return p._cheia;
    var path = String(p.pagina);
    if (path.indexOf("/programa/") !== 0 || path.indexOf("..") !== -1) return Promise.resolve(p);
    p._cheia = this.pedir("https://www.guiadetv.com" + path).then(function (html) {
      var desc = _this10.metaDescricao(html);
      if (desc && desc.length > String(p.desc || "").length && !_this10.cortado(desc)) {
        p.desc = desc;
        _this10.gravarCache();
      }
      return p;
    }).catch(function () {
      return p;
    });
    return p._cheia;
  },
  baixarCanal: function baixarCanal(canal) {
    var _this11 = this;
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var nome, key, hit, html, mg, x, list, _t5;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            nome = typeof canal === "string" ? canal : canal && canal.name || "";
            key = _this11.norm(nome);
            hit = _this11.listaLocal(nome);
            x = typeof canal === "object" ? _this11.xtreamDoCanal(canal) : null;
          case 20:
            if (!_this11.visto[key]) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2, hit);
          case 1:
            if (!(hit.length && _this11.temSinopse(hit) && !_this11.precisaPagina(hit))) {
              _context7.n = 2;
              break;
            }
            _this11.visto[key] = 1;
            return _context7.a(2, hit);
          case 2:
            _context7.n = 3;
            return _this11.guiaHtml(nome);
          case 3:
            html = _context7.v;
            if (!html.length) {
              _context7.n = 4;
              break;
            }
            _this11.guardar(nome, html);
            _this11.visto[key] = 1;
            return _context7.a(2, _this11.listaLocal(nome));
          case 4:
            _context7.n = 5;
            return _this11.meuguiaHtml(nome);
          case 5:
            mg = _context7.v;
            if (!mg.length) {
              _context7.n = 6;
              break;
            }
            _this11.guardar(nome, mg);
            _this11.visto[key] = 1;
            return _context7.a(2, _this11.listaLocal(nome));
          case 6:
            x = typeof canal === "object" ? _this11.xtreamDoCanal(canal) : null;
            if (!x) {
              _context7.n = 8;
              break;
            }
            _t5 = _this11;
            _context7.n = 7;
            return _this11.xtreamEpg(x);
          case 7:
            list = _t5.filtrar.call(_t5, _context7.v);
            if (!list.length) {
              _context7.n = 8;
              break;
            }
            _this11.guardar(nome, list);
            _this11.visto[key] = 1;
            return _context7.a(2, _this11.listaLocal(nome));
          case 8:
            _this11.visto[key] = 1;
            return _context7.a(2, hit.length ? hit : []);
        }
      }, _callee7);
    }))();
  },
  programas: function programas(canal) {
    var _this12 = this;
    var nome = typeof canal === "string" ? canal : canal && canal.name || "";
    if (this.pulaGrade(nome)) return Promise.resolve([]);
    var key = this.norm(nome);
    var hit = this.listaLocal(nome);
    if (this.visto[key] || hit.length && this.temSinopse(hit) && !this.precisaPagina(hit)) return Promise.resolve(hit);
    return new Promise(function (resolve) {
      _this12.ensure().then(function () {
        var local = _this12.listaLocal(nome);
        if (_this12.visto[key] || local.length && _this12.temSinopse(local) && !_this12.precisaPagina(local)) {
          resolve(local);
          return;
        }
        if (_this12.ehDeListaImportada(canal) || _this12.fila.length >= 300) {
          _this12.visto[key] = 1;
          resolve(local);
          return;
        }
        _this12.fila.unshift({
          canal: canal,
          resolve: resolve
        });
        _this12.puxar();
      });
    });
  },
  puxar: function puxar() {
    var _this13 = this;
    var _loop = function _loop() {
      var job = _this13.fila.shift();
      _this13.inflight++;
      _this13.baixarCanal(job.canal).then(function (list) {
        _this13.inflight--;
        job.resolve(list);
        _this13.puxar();
      });
    };
    while (this.inflight < this.MAX_PAR && this.fila.length) {
      _loop();
    }
  },
  nowNext: function nowNext(lista) {
    var agora = Date.now();
    if (!lista || !lista.length) return null;
    var cur = null;
    var next = null;
    for (var i = 0; i < lista.length; i++) {
      var p = lista[i];
      if (p.start <= agora && agora < p.stop) {
        cur = p;
        next = lista[i + 1] || null;
        break;
      }
      if (p.start > agora) {
        next = p;
        break;
      }
    }
    if (!cur && !next) return null;
    var dur = cur ? cur.stop - cur.start : 1;
    var progress = cur ? Math.min(1, Math.max(0, (agora - cur.start) / dur)) : 0;
    return {
      current: cur,
      next: next,
      progress: progress
    };
  }
};
window.SaimoEpg = SaimoEpg;