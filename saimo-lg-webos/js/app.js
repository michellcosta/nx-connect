"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Saimo TV - App principal LG webOS
 */
document.addEventListener("DOMContentLoaded", function () {
  var iniciarApp = function iniciarApp() {
    var screenHome = document.getElementById("screen-home");
    var screenCatalog = document.getElementById("screen-catalog");
    var screenBrowse = document.getElementById("screen-browse");
    var browseRowsEl = document.getElementById("browse-rows");
    var browseTitle = document.getElementById("browse-title");
    var browseCount = document.getElementById("browse-count");
    var browseClock = document.getElementById("browse-clock");
    var btnBrowseBack = document.getElementById("btn-browse-back");
    var btnBrowseSearch = document.getElementById("btn-browse-search");
    var btnBrowseAz = document.getElementById("btn-browse-az");
    var browseToolbar = document.getElementById("browse-toolbar");
    var browseSubnav = document.getElementById("browse-subnav");
    var browseTabEls = browseSubnav ? Array.prototype.slice.call(browseSubnav.querySelectorAll(".browse-tab")) : [];
    var browseHub = document.getElementById("browse-hub");
    var hubGensData = [];
    var hubGenRow = 0;
    var hubGenCol = 0;
    var browseShelf = document.getElementById("browse-shelf");
    var odSideEl = document.getElementById("od-side");
    var odFlyEl = document.getElementById("od-fly");
    var odTitle = document.getElementById("od-title");
    var odGrid = document.getElementById("od-grid");
    var BROWSE_TABS = ["ondemand", "filmes", "series", "animes", "doramas"];
    var playerContainer = document.getElementById("player-container");
    var modalOverlay = document.getElementById("modal-overlay");
    var searchModal = document.getElementById("search-modal");
    var infoPanel = document.getElementById("info-panel");
    var seriesScreen = document.getElementById("series-screen");
    var settingsScreen = document.getElementById("settings-screen");
    var homeEditScreen = document.getElementById("home-edit-screen");
    var homeEditList = document.getElementById("home-edit-list");
    var listasScreen = document.getElementById("listas-screen");
    var oficialScreen = document.getElementById("oficial-screen");
    var pinScreen = document.getElementById("pin-screen");
    var eventsScreen = document.getElementById("events-screen");
    var radiosScreen = document.getElementById("radios-screen");
    var btnOpenSearch = document.getElementById("btn-open-search");
    var btnOpenHomeEdit = document.getElementById("btn-open-home-edit");
    var btnOpenSettings = document.getElementById("btn-open-settings");
    var btnCatalogSearch = document.getElementById("btn-catalog-search");
    var btnCatalogGuide = document.getElementById("btn-catalog-guide");
    var homeClock = document.getElementById("home-clock");
    var homeExplore = document.getElementById("home-explore");
    var exploreChips = homeExplore ? Array.prototype.slice.call(homeExplore.querySelectorAll(".explore-chip")) : [];
    var homeSideMenu = document.getElementById("home-side-menu");
    var homeSideScrim = document.getElementById("home-side-scrim");
    var homeSideItems = homeSideMenu ? Array.prototype.slice.call(homeSideMenu.querySelectorAll(".home-side-item")) : [];
    var homeRowsEl = document.getElementById("home-rows");
    var homeScroll = document.getElementById("home-scroll");
    var homeHeader = document.querySelector("#screen-home .home-header");
    var homeMenuSeta = document.getElementById("home-menu-seta");
    var homeHeroBg = document.getElementById("home-hero-bg");
    var homeSpotTitle = document.getElementById("home-spot-title");
    var homeSpotMeta = document.getElementById("home-spot-meta");
    var homeSpotOverview = document.getElementById("home-spot-overview");
    var headerBtns = [btnOpenSearch, btnOpenHomeEdit, btnOpenSettings].filter(Boolean);
    var resumeBanner = document.getElementById("resume-banner");
    var resumeTitle = document.getElementById("resume-title");
    var resumeTime = document.getElementById("resume-time");
    var btnResumePlay = document.getElementById("btn-resume-play");
    var catalogSectionTitle = document.getElementById("catalog-section-title");
    var categoriesBar = document.getElementById("categories-bar");
    var contentArea = document.getElementById("content-area");
    var channelsGrid = document.getElementById("channels-grid");
    var channelCounter = document.getElementById("channel-counter");
    var catalogClock = document.getElementById("catalog-clock");
    var btnBackHub = document.getElementById("btn-back-hub");
    var modalTitle = document.getElementById("modal-title");
    var modalList = document.getElementById("modal-list");
    var searchQueryEl = document.getElementById("search-query");
    var searchKeyboard = document.getElementById("search-keyboard");
    var searchResultsCount = document.getElementById("search-results-count");
    var searchResultsGrid = document.getElementById("search-results-grid");
    var settingsList = document.getElementById("settings-list");
    var settingsVer = document.getElementById("settings-ver");
    var pinDots = document.getElementById("pin-dots");
    var pinPrompt = document.getElementById("pin-prompt");
    var pinPad = document.getElementById("pin-pad");
    var eventsList = document.getElementById("events-list");
    var radiosGrid = document.getElementById("radios-grid");
    var radiosCardScreen = document.getElementById("radios-card-screen");
    var radiosCardGrid = document.getElementById("radios-card-grid");
    var radioAudio = document.getElementById("radio-audio");
    var radioNow = document.getElementById("radio-now");
    var radioMini = document.getElementById("radio-mini");
    var radioMiniNome = document.getElementById("radio-mini-nome");
    var btnRadioPrev = document.getElementById("radio-prev");
    var btnRadioToggle = document.getElementById("radio-toggle");
    var btnRadioNext = document.getElementById("radio-next");
    var btnRadioLista = document.getElementById("radio-lista");
    var btnRadioStop = document.getElementById("radio-stop");
    var eventsClock = document.getElementById("events-clock");
    var guideClock = document.getElementById("guide-clock");
    var radiosClock = document.getElementById("radios-clock");
    var btnEventsBack = document.getElementById("btn-events-back");
    var btnRadiosBack = document.getElementById("btn-radios-back");
    var btnRadiosBusca = document.getElementById("btn-radios-busca");
    var radiosBusca = document.getElementById("radios-busca");
    var radiosBuscaQueryEl = document.getElementById("radios-busca-query");
    var radiosBuscaTeclado = document.getElementById("radios-busca-teclado");
    var radiosBuscaContagem = document.getElementById("radios-busca-contagem");
    var radiosBuscaGrade = document.getElementById("radios-busca-grade");
    var btnRadiosCardBusca = document.getElementById("btn-radios-card-busca");
    var homeHero = document.getElementById("home-hero");
    var homeHeroKicker = document.getElementById("home-hero-kicker");
    var btnHeroPlay = document.getElementById("btn-hero-play");
    var btnHeroInfo = document.getElementById("btn-hero-info");
    var homeHook = document.getElementById("home-hook");
    var jogosHojeScreen = document.getElementById("jogos-hoje-screen");
    var jogosHojeList = document.getElementById("jogos-hoje-list");
    var guideScreen = document.getElementById("guide-screen");
    var guideList = document.getElementById("guide-list");
    var guideStatus = document.getElementById("guide-status");
    var btnGuideBack = document.getElementById("btn-guide-back");
    var btnGuideNow = document.getElementById("btn-guide-now");
    var guideHeroTitle = document.getElementById("guide-hero-title");
    var guideHeroMeta = document.getElementById("guide-hero-meta");
    var guideHeroOverview = document.getElementById("guide-hero-overview");
    var videoElement = document.getElementById("video-element");
    var osdElements = {
      container: document.getElementById("player-osd"),
      title: document.getElementById("osd-title"),
      program: document.getElementById("osd-program"),
      category: document.getElementById("osd-category"),
      desc: document.getElementById("osd-desc"),
      logo: document.getElementById("osd-logo"),
      quality: document.getElementById("osd-quality"),
      origem: document.getElementById("osd-origem"),
      timeDisplay: document.getElementById("osd-time"),
      source: document.getElementById("osd-source"),
      status: document.getElementById("osd-status"),
      loading: document.getElementById("player-loading"),
      liveBadge: document.getElementById("osd-live-badge"),
      progressWrap: document.getElementById("osd-progress-wrap"),
      progressFill: document.getElementById("osd-progress-fill"),
      skipBtn: document.getElementById("osd-skip-btn"),
      skipHint: document.getElementById("osd-skip-hint"),
      nextEpCard: document.getElementById("next-ep-card")
    };
    var infoEls = {
      backdrop: document.getElementById("info-panel-backdrop"),
      poster: document.getElementById("info-panel-poster"),
      type: document.getElementById("info-panel-type"),
      title: document.getElementById("info-panel-title"),
      tagline: document.getElementById("info-panel-tagline"),
      year: document.getElementById("info-panel-year"),
      rating: document.getElementById("info-panel-rating"),
      runtime: document.getElementById("info-panel-runtime"),
      cert: document.getElementById("info-panel-cert"),
      sources: document.getElementById("info-panel-sources"),
      credits: document.getElementById("info-panel-credits"),
      fontes: document.getElementById("info-panel-fontes"),
      fontesBloco: document.getElementById("info-fontes-bloco"),
      category: document.getElementById("info-panel-category"),
      overview: document.getElementById("info-panel-overview"),
      cast: document.getElementById("info-panel-cast"),
      progressWrap: document.getElementById("info-panel-progress-wrap"),
      progressLabel: document.getElementById("info-panel-progress-label"),
      progressBar: document.getElementById("info-panel-progress-bar"),
      btnPlay: document.getElementById("btn-info-play"),
      btnResume: document.getElementById("btn-info-resume"),
      btnTrailer: document.getElementById("btn-info-trailer"),
      btnFav: document.getElementById("btn-info-favorite"),
      btnClose: document.getElementById("btn-info-close"),
      stars: document.getElementById("info-panel-stars")
    };
    var trailerOverlay = document.getElementById("trailer-overlay");
    var trailerFrame = document.getElementById("trailer-frame");
    var infoTrailerKey = "";
    var seriesEls = {
      backdrop: document.getElementById("series-backdrop"),
      fichaView: document.getElementById("series-ficha-view"),
      epView: document.getElementById("series-ep-view"),
      title: document.getElementById("series-title"),
      stars: document.getElementById("series-stars"),
      poster: document.getElementById("series-poster"),
      tagline: document.getElementById("series-tagline"),
      year: document.getElementById("series-year"),
      seasonsPill: document.getElementById("series-seasons-pill"),
      genres: document.getElementById("series-genres"),
      credits: document.getElementById("series-credits"),
      cert: document.getElementById("series-cert"),
      overview: document.getElementById("series-overview"),
      fichaSeasons: document.getElementById("series-ficha-seasons"),
      epCount: document.getElementById("series-ep-count"),
      btnBack: document.getElementById("btn-series-back"),
      btnPlay: document.getElementById("btn-series-play"),
      btnEpisodes: document.getElementById("btn-series-episodes"),
      btnFav: document.getElementById("btn-series-fav"),
      btnEpBack: document.getElementById("btn-series-ep-back"),
      epHeading: document.getElementById("series-ep-heading"),
      seasons: document.getElementById("series-seasons"),
      versions: document.getElementById("series-versions"),
      episodes: document.getElementById("series-episodes"),
      fichaEpisodes: document.getElementById("series-ficha-episodes"),
      cast: document.getElementById("series-cast")
    };
    var nextEpTitle = document.getElementById("next-ep-title");
    var subtitleOverlay = document.getElementById("subtitle-overlay");
    if (window.SaimoLegendas) SaimoLegendas.setOverlay(subtitleOverlay);
    if (window.SaimoAjustes) SaimoAjustes.aplicar();
    function fold(s) {
      return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }
    function stripYear(s) {
      return String(s || "").replace(/\s*\(\d{4}\)\s*$/, "").trim();
    }
    function buscaChave(s) {
      return fold(s).replace(/[''`´]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    }
    function notaBusca(nome, termo) {
      var n = buscaChave(nome);
      var t = buscaChave(termo);
      if (!t || !n) return -1;
      if (n === t) return 0;
      if (n.indexOf(t) === 0) return 1;
      if (n.indexOf(" " + t) !== -1 || n.indexOf(t) !== -1) return 2;
      var words = t.split(" ").filter(Boolean);
      if (words.length && words.every(function (w) {
        return n.indexOf(w) !== -1;
      })) return 3;
      return -1;
    }
    function getFavorites() {
      try {
        return JSON.parse(localStorage.getItem("saimo_favorites") || "[]");
      } catch (e) {
        return [];
      }
    }
    function saveFavorites(favs) {
      localStorage.setItem("saimo_favorites", JSON.stringify(favs));
    }
    function isFavorited(title) {
      return getFavorites().includes((title || "").trim());
    }
    function pintarEstrela(el, ligado) {
      if (!el) return;
      var star = null;
      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i].classList.contains("star-badge")) {
          star = el.children[i];
          break;
        }
      }
      if (ligado) {
        if (star) return;
        star = document.createElement("div");
        star.className = "star-badge";
        star.textContent = "★";
        el.appendChild(star);
      } else if (star) star.remove();
    }
    function retirarCardFavorito(title) {
      var ix = gridIndex;
      var atual = activeItemList[ix];
      var nomeAtual = atual && (atual.name || atual.title || "").trim();
      if (nomeAtual !== title) {
        ix = activeItemList.findIndex(function (it) {
          return (it.name || it.title || "").trim() === title;
        });
      }
      if (ix < 0) return;
      activeItemList.splice(ix, 1);
      var card = channelsGrid.children[ix];
      if (card) {
        card.remove();
        if (renderedCount > 0) renderedCount--;
      }
      if (!activeItemList.length) {
        gridIndex = 0;
        catalogZone = "categories";
        updateCatalogFocus();
        return;
      }
      if (ix < gridIndex) gridIndex--;
      if (gridIndex >= activeItemList.length) gridIndex = activeItemList.length - 1;
      while (renderedCount <= gridIndex && renderedCount < activeItemList.length) {
        renderNextChunk(PAGE_SIZE_STEP);
      }
      catalogZone = "grid";
      updateCatalogFocus();
    }
    function estrelaNoBrowse() {
      if (modoPrateleira()) {
        var _item = browseZone === "grid" ? itemOdEm(odGridIndex) : null;
        if (_item && odGrid) {
          var _card = odGrid.querySelector('.od-poster[data-index="' + odGridIndex + '"]');
          if (_card) pintarEstrela(_card, isFavorited(_item.title || _item.name || ""));
        }
        var ixFav = odSide.findIndex(function (e) {
          return e.id === "fav";
        });
        if (ixFav >= 0) {
          var fav = favoritosDaSecao(browseKind);
          odSide[ixFav].items = fav;
          odSide[ixFav].contagem = fav.length;
          var btn = odSideEl && odSideEl.children[ixFav];
          var count = btn && btn.querySelector(".od-side-count");
          if (count) count.textContent = fmtNum(fav.length);
          if (_item && odListaIndex === ixFav && !isFavorited(_item.title || _item.name || "")) {
            var guardado = odGridIndex;
            pintarGradeOd(true);
            odGridIndex = Math.min(guardado, Math.max(0, odItems.length - 1));
            garantirGradeAte(odGridIndex);
            updateBrowseFocus();
          }
        }
        return;
      }
      var item = browseItem();
      var rowEl = browseRowsEl && browseRowsEl.children[browseRow];
      var track = rowEl && rowEl.querySelector(".home-row-track");
      var card = track && track.children[browseCol];
      if (!card || !item) return;
      pintarEstrela(card, isFavorited(item.title || item.name || ""));
    }
    function estrelaNoGuia(title, ligado) {
      if (!guideData.length) return;
      var ix = guideData.findIndex(function (r) {
        return (r.ch && r.ch.name || "").trim() === title;
      });
      if (ix < 0) return;
      var rowEl = linhaDoGuia(ix);
      var logo = rowEl && rowEl.querySelector(".guide-logo");
      pintarEstrela(logo, ligado);
    }
    function toggleFavorite(item) {
      var title = (item.title || item.name || "").trim();
      if (!title) return;
      var favs = getFavorites();
      var on = favs.includes(title);
      favs = on ? favs.filter(function (t) {
        return t !== title;
      }) : favs.concat(title);
      saveFavorites(favs);
      var msg = (on ? "Removido dos Favoritos: " : "Adicionado aos Favoritos: ") + title;
      var ligado = !on;
      if (currentScreen === "player") {
        player.showStatus(msg);
        player.showOSD(3000);
      }
      if (infoEls.btnFav && currentScreen === "info") {
        infoEls.btnFav.textContent = ligado ? "★  Favorito" : "Favoritar";
      }
      if (seriesEls.btnFav && currentScreen === "series" && currentSeriesItem && currentSeriesItem.title === title) {
        seriesEls.btnFav.textContent = ligado ? "★  Favorito" : "Favoritar";
      }
      if (currentScreen === "catalog") {
        var activeTab = categoriesBar.querySelector(".cat-tab.active");
        if (activeTab && activeTab.textContent === "Favoritos") retirarCardFavorito(title);else {
          var card = channelsGrid.children[gridIndex];
          if (card) pintarEstrela(card, ligado);
        }
      } else if (currentScreen === "guia") estrelaNoGuia(title, ligado);else if (currentScreen === "browse") estrelaNoBrowse();
      if (currentScreen === "home") refreshHomeDynamic();
    }
    function getLastWatched() {
      try {
        return JSON.parse(localStorage.getItem("saimo_history") || "null");
      } catch (e) {
        return null;
      }
    }
    function saveLastWatched(data) {
      try {
        localStorage.setItem("saimo_history", JSON.stringify(data));
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_history: " + ((e && e.message) || ""));
      }
    }
    function getLastLive() {
      try {
        return JSON.parse(localStorage.getItem("saimo_last_live") || "null");
      } catch (e) {
        return null;
      }
    }
    function saveLastLive(ch, sourceIndex) {
      if (!ch || !ch.isLive) return;
      var src = (ch.sources || [])[sourceIndex] || (ch.sources || [])[0];
      try {
        localStorage.setItem("saimo_last_live", JSON.stringify({
          name: ch.name,
          url: src && src.url,
          timestamp: Date.now()
        }));
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_last_live: " + ((e && e.message) || ""));
      }
    }
    function canalPorNome(nome) {
      var k = buscaChave(nome);
      return liveChannels().find(function (c) {
        return buscaChave(c.name) === k;
      }) || null;
    }
    function getProgressMap() {
      try {
        return JSON.parse(localStorage.getItem("saimo_progress") || "{}");
      } catch (e) {
        return {};
      }
    }
    function progressKey(item, ep) {
      if (!item) return "";
      if (ep) return "s:" + item.title + "|T" + ep.season + "E" + ep.episode;
      if (item.type === "series") return "s:" + item.title;
      if (item.type === "movie") return "f:" + item.title;
      return "c:" + (item.name || item.title);
    }
    function getProgress(item, ep) {
      return getProgressMap()[progressKey(item, ep)] || null;
    }
    function progressoConcluido(currentTime, duration) {
      if (!(duration > 0)) return false;
      return currentTime / duration >= 0.95 || duration - currentTime < 20;
    }
    function progressoResumivel(p) {
      return !!(p && !p.watched && p.currentTime > 15 && !progressoConcluido(p.currentTime, p.duration));
    }
    function historicoResumivel(last) {
      return !!(last && last.name && last.currentTime > 15 && !progressoConcluido(last.currentTime, last.duration));
    }
    function limparHistoricoSeFor(item) {
      var last = getLastWatched();
      if (!last || !item) return;
      var titulo = item.title || item.name || "";
      var nome = last.name || "";
      if (!titulo || nome !== titulo && nome.indexOf(titulo) !== 0) return;
      try {
        localStorage.removeItem("saimo_history");
      } catch (e) {}
    }
    function saveProgress(item, ep, currentTime, duration) {
      if (!item || !duration) return;
      var map = getProgressMap();
      var k = progressKey(item, ep);
      if (progressoConcluido(currentTime, duration)) {
        delete map[k];
        limparHistoricoSeFor(item);
      } else {
        map[k] = {
          currentTime: currentTime,
          duration: duration,
          watched: false,
          timestamp: Date.now(),
          season: ep ? ep.season : null,
          episode: ep ? ep.episode : null
        };
      }
      try {
        localStorage.setItem("saimo_progress", JSON.stringify(map));
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_progress: " + ((e && e.message) || ""));
      }
    }
    var player = new SaimoPlayer(videoElement, osdElements, {
      onProgress: function onProgress(channel, currentTime, duration) {
        if (channel && !channel.isLive && duration > 30) {
          var ep = playingVodItem && currentSeriesItem && currentPlayingEpIndex >= 0 ? (currentSeriesItem.episodes || [])[currentPlayingEpIndex] : null;
          if (playingVodItem) saveProgress(playingVodItem, ep, currentTime, duration);
          if (progressoConcluido(currentTime, duration)) return;
          saveLastWatched({
            name: channel.name,
            category: channel.category,
            logo: channel.logo,
            currentTime: currentTime,
            duration: duration,
            sources: channel.sources,
            seriesItem: currentSeriesItem,
            epIndex: currentPlayingEpIndex,
            section: currentSection,
            timestamp: Date.now()
          });
        }
      },
      onEnded: function onEnded() {
        playNextEpisode(true);
      },
      onCredits: function onCredits() {
        showNextEpisodeCard();
      },
      onAutoNext: function onAutoNext() {
        playNextEpisode(true);
      },
      onPlaying: function onPlaying(ch, idx) {
        saveLastLive(ch, idx);
        if (ch && !ch.isLive && playingVodItem && playingVodItem.type === "series" && window.SaimoAjustes) {
          var srcVod = (ch.sources || [])[idx];
          if (srcVod && srcVod.url) SaimoAjustes.guardarFonte(playingVodItem.title, srcVod.url, ch.sources, idx);
        }
        if (ch && ch.isLive && window.SaimoFontesLive) {
          var src = (ch.sources || [])[idx];
          if (src && src.url) SaimoFontesLive.lembrar(ch.name, src.url);
        }
        if (window.SaimoTelemetria) SaimoTelemetria.tocou(ch, idx);
        if (zapAberta) atualizarChipOrigemZap();
        if (zapAberta && osdElements.container) osdElements.container.classList.add("hidden");
      },
      onPlayStart: function onPlayStart(ch, idx) {
        if (window.SaimoTelemetria) SaimoTelemetria.comecou(ch, idx);
        if (ch && ch.isLive && !ch.logo && window.SaimoLogos && osdElements.logo) {
          SaimoLogos.pedir(ch, osdElements.logo);
        }
      },
      onToggleFav: function onToggleFav(item) {
        if (item) toggleFavorite(item);
      },
      onIsFav: function onIsFav(title) {
        return isFavorited(title);
      },
      onLegendas: function onLegendas() {
        openSubtitleMenu();
      },
      onSourceFail: function onSourceFail(ch, idx, reason) {
        if (window.SaimoTelemetria) SaimoTelemetria.falhou(ch, idx, reason);
      },
      onChannelDown: function onChannelDown(ch) {
        if (window.SaimoTelemetria) SaimoTelemetria.caiu(ch);
      }
    });
    var vodPlayer = typeof SaimoVodPlayer !== "undefined" ? new SaimoVodPlayer(player) : null;
    window.saimoVodPlayer = vodPlayer;
    var channelsData = window.SAIMO_CHANNELS_DATA || {
      channels: [],
      categories: ["Todos"]
    };
    var vodData = window.SAIMO_VOD_DATA || {
      filmesRows: {},
      seriesRows: {}
    };
    function canaisEmbutidosLista() {
      return (window.SAIMO_CHANNELS_DATA && window.SAIMO_CHANNELS_DATA.channels) || [];
    }
    function categoriasEmbutidas() {
      return (window.SAIMO_CHANNELS_DATA && window.SAIMO_CHANNELS_DATA.categories) || ["Todos"];
    }
    function preencherCanaisAoVivo(canais, cats) {
      liveChannelsAll = (canais || []).slice();
      liveCategories = (cats || ["Todos"]).slice();
    }
    function aplicarCanaisEmbutidos() {
      preencherCanaisAoVivo(canaisEmbutidosLista(), categoriasEmbutidas());
    }
    function recarregarCanaisOficial() {
      if (xtreamEstaLigado()) aplicarCanaisXtream();
      if (!saimoListaLigada()) {
        if (!xtreamEstaLigado()) preencherCanaisAoVivo([], ["Todos"]);
        return Promise.resolve(true);
      }
      if (window.SaimoOficial && SaimoOficial.usarEmbutido()) {
        aplicarCanaisEmbutidos();
        return Promise.resolve(true);
      }
      if (window.SaimoOficial) SaimoOficial.syncApiUrls();
      if (!window.SaimoAPI || !SaimoAPI.catalogoRemoto) {
        aplicarCanaisEmbutidos();
        return Promise.resolve(false);
      }
      return SaimoAPI.catalogoRemoto().then(function (cat) {
        if (cat && cat.channels && cat.channels.length) {
          preencherCanaisAoVivo(cat.channels, cat.categories);
          return true;
        }
        aplicarCanaisEmbutidos();
        return false;
      }).catch(function () {
        aplicarCanaisEmbutidos();
        return false;
      });
    }
    function recarregarAcervoOficial() {
      acervoPronto = null;
      filmesRows = {};
      seriesRows = {};
      if (window.SaimoOficial) {
        SaimoOficial.syncApiUrls();
        SaimoOficial.limparCacheVod();
      }
      var tarefas = [recarregarCanaisOficial()];
      if (window.SaimoAPI && SaimoAPI.loadVodBases) tarefas.push(SaimoAPI.loadVodBases().catch(function () {}));
      tarefas.push(carregarAcervo().catch(function () {}));
      tarefas.push(sincronizarMeuXtream(true).catch(function () {}));
      return Promise.all(tarefas).then(function () {
        aplicarXtreamNoAcervo();
        if (homeReady) buildHome(true);
      });
    }
    var liveChannelsAll = [];
    var liveCategories = ["Todos"];
    var aovivoMaisNome = "";
    var aovivoMaisAbaAntes = -1;
    var aovivoOrigem = "";
    var catsMaisItens = [];
    var catsMaisIndex = 0;
    var catsMaisVolta = "catalog";
    var LIVE_RECENT_KEY = "saimo_live_recent";
    if (!xtreamEstaLigado() && saimoListaLigada() && (!window.SaimoOficial || SaimoOficial.usarEmbutido())) {
      preencherCanaisAoVivo(canaisEmbutidosLista(), categoriasEmbutidas());
    }
    var filmesRows = vodData.filmesRows || {};
    var seriesRows = vodData.seriesRows || {};
    var filmesCats = {};
    var seriesCats = {};
    var colecaoCats = {};
    var colecaoLista = [];
    var GENERO_ORDEM = ["Ação", "Comédia", "Drama", "Terror", "Suspense", "Ficção científica", "Animação", "Romance", "Aventura", "Crime", "Família", "Fantasia", "Mistério", "Documentário", "Guerra", "Faroeste", "História", "Música"];
    var GENERO_FILMES = ["Drama", "Comédia", "Suspense", "Ação", "Terror", "Romance", "Aventura", "Crime", "Família", "Fantasia", "Ficção científica", "Animação", "Documentário", "Mistério", "Guerra"];
    var GENERO_SERIES = ["Drama", "Comédia", "Ficção e fantasia", "Ação e aventura", "Crime", "Documentário", "Mistério", "Reality", "Infantil", "Novela"];
    var DECADA_DEFS = [{
      faixa: 2020,
      nome: "Anos 2020"
    }, {
      faixa: 2010,
      nome: "Anos 2010"
    }, {
      faixa: 2000,
      nome: "Anos 2000"
    }, {
      faixa: 1990,
      nome: "Anos 90"
    }, {
      faixa: 1980,
      nome: "Anos 80"
    }, {
      faixa: 1979,
      nome: "Clássicos"
    }];
    var COMBO_DEFS = [{
      id: "familia",
      nome: "Para a família",
      gens: ["Família", "Animação", "Infantil"]
    }, {
      id: "rir",
      nome: "Para rir",
      gens: ["Comédia"]
    }, {
      id: "chorar",
      nome: "Para chorar",
      gens: ["Romance", "Drama"]
    }, {
      id: "medo",
      nome: "Para ter medo",
      gens: ["Terror"]
    }];
    var FILEIRA_CAPAS = 4;
    var odFiltroAudio = "todos";
    var odFiltroDecada = "todas";
    function isLetraCat(k) {
      return typeof k === "string" && (k === "#" || /^[A-Za-z]$/.test(k));
    }
    function letraKeys(rows) {
      return Object.keys(rows || {}).filter(isLetraCat);
    }
    function catalogItems(rows) {
      var seen = Object.create(null);
      var out = [];
      letraKeys(rows).forEach(function (k) {
        (rows[k] || []).forEach(function (it) {
          var id = fold(it && (it.title || it.name) || "");
          if (!id || seen[id]) return;
          seen[id] = 1;
          out.push(it);
        });
      });
      return out;
    }
    function anoDeItem(it) {
      var y = parseInt(it && it.year, 10);
      if (y) return y;
      var m = String(it && it.title || "").match(/\((\d{4})\)\s*$/);
      return m ? parseInt(m[1], 10) : 0;
    }
    function nomeGenero(g, isSeries) {
      if (window.SaimoFicha && SaimoFicha.nomeGenero) return SaimoFicha.nomeGenero(g, isSeries);
      return g;
    }
    function cardsDaFicha(recs, isSeries, limite) {
      var lista = recs || [];
      if (isSeries) lista = recsSerieSemAnime(lista);
      var kind = isSeries ? "series" : "filmes";
      var out = [];
      var i, rec, card;
      for (i = 0; i < lista.length; i++) {
        rec = lista[i];
        if (!rec) continue;
        if (!itemTemPlay({
          title: rec.titulo || rec.title,
          type: isSeries ? "series" : "movie"
        }, kind)) continue;
        card = window.SaimoFicha && SaimoFicha.cardDeRec ? SaimoFicha.cardDeRec(rec, isSeries) : rec;
        card = cardDoAcervo(card, isSeries);
        if (card) out.push(card);
        if (limite && out.length >= limite) break;
      }
      return out;
    }
    function itemTemAudio(item, pref) {
      if (!pref || pref === "todos") return true;
      var src = item && item.sources || [];
      if (!src.length) return true;
      return src.some(function (s) {
        var a = String(s.audio || s.quality || "").toLowerCase();
        if (pref === "dub") return a.indexOf("dub") >= 0 && a.indexOf("leg") < 0 || a === "dub";
        if (pref === "leg") return a.indexOf("leg") >= 0;
        return true;
      });
    }
    function itemNaDecada(item, faixa) {
      if (!faixa || faixa === "todas") return true;
      var y = anoDeItem(item);
      if (!y) return false;
      faixa = parseInt(faixa, 10);
      if (faixa === 2020) return y >= 2020 && y < 2030;
      if (faixa === 2010) return y >= 2010 && y < 2020;
      if (faixa === 2000) return y >= 2000 && y < 2010;
      if (faixa === 1990) return y >= 1990 && y < 2000;
      if (faixa === 1980) return y >= 1980 && y < 1990;
      if (faixa === 1979) return y > 0 && y < 1980;
      return true;
    }
    function aplicarFiltrosOd(items) {
      return (items || []).filter(function (it) {
        if (it && it.type === "acao") return true;
        if (!itemTemPlay(it, browseKind)) return false;
        if (!itemNaDecada(it, odFiltroDecada)) return false;
        if (!itemTemAudio(it, odFiltroAudio)) return false;
        return true;
      });
    }
    function posicaoGenero(g) {
      var i = GENERO_ORDEM.indexOf(g);
      return i < 0 ? 99 : i;
    }
    function cardDoAcervo(it, isSeries) {
      var found = lookupVod(it.title, isSeries ? "series" : "movie");
      var card = found ? Object.assign({}, found) : Object.assign({}, it);
      card.type = isSeries ? "series" : it.type || card.type || "movie";
      card.title = it.title || card.title;
      if (window.SaimoFicha && SaimoFicha.capaDe) {
        var capa = SaimoFicha.capaDe(card.title, isSeries);
        if (capa) card.posterUrl = capa;
      }
      if (!card.posterUrl && it.posterUrl) card.posterUrl = it.posterUrl;
      if (!card.year && it.year) card.year = it.year;
      return card;
    }
    function isAbaGenero(k) {
      if (GENERO_ORDEM.indexOf(k) >= 0) return true;
      if (GENERO_FILMES.indexOf(k) >= 0 || GENERO_SERIES.indexOf(k) >= 0) return true;
      return /^(Ação|Comédia|Drama|Terror|Suspense|Ficção|Animação|Romance|Aventura|Crime|Família|Fantasia|Mistério|Documentário|Guerra|Faroeste|História|Música|Kids|Reality|Soap|Talk|War|Infantil|Novela)/.test(k);
    }
    function ordenarAbas(cats) {
      var dest = [];
      var gens = [];
      Object.keys(cats || {}).forEach(function (k) {
        if (!k || isLetraCat(k)) return;
        if (isAbaGenero(k)) gens.push(k);else dest.push(k);
      });
      gens.sort(function (a, b) {
        return posicaoGenero(a) - posicaoGenero(b) || a.localeCompare(b, "pt-BR");
      });
      return dest.concat(gens);
    }
    function liveChannels() {
      var hide = window.SaimoAjustes && SaimoAjustes.get("hideAdult");
      var adulto = function adulto(c) {
        return hide && window.SaimoAjustes && SaimoAjustes.ehAdulto(c);
      };
      var saimo = (liveChannelsAll || []).filter(function (c) {
        return !adulto(c);
      });
      var xtream = [];
      if (window.SaimoXtream && SaimoXtream.canaisAoVivo) {
        xtream = (SaimoXtream.canaisAoVivo() || []).filter(function (c) {
          return !adulto(c);
        });
      }
      var lista = window.SaimoListas ? SaimoListas.canais([]) : [];
      if (window.SaimoCanaisAoVivo) {
        return SaimoCanaisAoVivo.mesclar([{
          origem: "saimo",
          canais: saimo
        }, {
          origem: "xtream",
          canais: xtream
        }, {
          origem: "lista",
          canais: lista
        }]);
      }
      return saimo.concat(xtream).concat(lista);
    }
    var filmeByKey = Object.create(null);
    var serieByKey = Object.create(null);
    function guardarNoIndice(map, item, gavetaPorLetra) {
      if (!item || !item.title) return;
      var keys = [fold(item.title), fold(stripYear(item.title))];
      keys.forEach(function (k) {
        if (!k) return;
        var prev = map[k];
        if (!prev) {
          map[k] = item;
          return;
        }
        var prevTemFonte = prev.sources && prev.sources.length;
        var novoTemFonte = item.sources && item.sources.length;
        if (novoTemFonte && !prevTemFonte) map[k] = item;else if (gavetaPorLetra && item.letter) map[k] = item;else if (!prev.letter && item.letter) map[k] = item;
      });
    }
    function rebuildVodIndex() {
      Object.keys(filmeByKey).forEach(function (k) {
        delete filmeByKey[k];
      });
      Object.keys(serieByKey).forEach(function (k) {
        delete serieByKey[k];
      });
      Object.keys(filmesRows).forEach(function (bucket) {
        var gaveta = isLetraCat(bucket);
        (filmesRows[bucket] || []).forEach(function (m) {
          return guardarNoIndice(filmeByKey, m, gaveta);
        });
      });
      Object.keys(seriesRows).forEach(function (bucket) {
        var gaveta = isLetraCat(bucket);
        (seriesRows[bucket] || []).forEach(function (s) {
          return guardarNoIndice(serieByKey, s, gaveta);
        });
      });
    }
    function usarCatalogoLazy() {
      try {
        if (localStorage.getItem("saimo_vod_data") === "1") return false;
      } catch (e) {}
      return !!(window.SaimoCatalogo && typeof SaimoCatalogo.obterLetra === "function");
    }
    function mesclarDestaquesNasRows(dest) {
      dest = dest || {};
      Object.keys(dest.filmesRows || {}).forEach(function (k) {
        var items = mapDestRow(dest.filmesRows[k]);
        if (items.length) filmesRows[k] = items;
      });
      Object.keys(dest.seriesRows || {}).forEach(function (k) {
        var items = mapDestRow(dest.seriesRows[k]);
        if (items.length) seriesRows[k] = items;
      });
    }
    var searchWorkerVisto = Object.create(null);
    function tipoItemBusca(it, padrao) {
      if (!it) return padrao || "movie";
      if (it.type === "channel" || it.isLive) return "channel";
      if (it.colecao === "animes" || it.type === "anime" || it.kind === "anime") return "anime";
      if (it.colecao === "doramas" || it.type === "dorama" || it.kind === "dorama") return "dorama";
      if (it.type === "series") return "series";
      return padrao || it.type || "movie";
    }
    function marcarVistoBusca(tipo, titulo) {
      var id = tipo + ":" + fold(titulo || "");
      if (!titulo || searchWorkerVisto[id]) return false;
      searchWorkerVisto[id] = 1;
      return true;
    }
    function empurrarItensBuscaWorker(items, tipoFixo) {
      if (!searchWorker || !searchWorkerReady || !items || !items.length) return;
      var lote = [];
      items.forEach(function (it) {
        if (!it || !(it.title || it.name)) return;
        var tipo = tipoFixo || tipoItemBusca(it, "movie");
        var titulo = it.title || it.name;
        if (tipo === "series" && itemPareceAnime(it)) return;
        if (!marcarVistoBusca(tipo, titulo)) return;
        lote.push({
          type: tipo,
          title: titulo,
          name: it.name,
          year: it.year || "",
          posterUrl: it.posterUrl || it.logo || "",
          category: it.category || ""
        });
      });
      if (!lote.length) return;
      var i = 0;
      var passo = 1200;
      function enviar() {
        if (!searchWorker) return;
        var pedaco = lote.slice(i, i + passo);
        if (!pedaco.length) return;
        searchWorker.postMessage({
          cmd: "add_items",
          items: pedaco,
          clear: false
        });
        i += passo;
        if (i < lote.length) setTimeout(enviar, 0);
      }
      enviar();
    }
    function chaveTituloVod(s) {
      return String(s || "").toLowerCase().replace(/\s*\(\d{4}\)\s*$/, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    }
    var xtreamVod = {
      filmes: {},
      series: {},
      lastErro: "",
      lastOk: false,
      perfil: null
    };
    function letraXtream(title) {
      var c = String(title || "").trim().charAt(0).toUpperCase();
      return c >= "A" && c <= "Z" ? c : "#";
    }
    function itensXtreamLetra(tipo, letra) {
      if (window.SaimoXtream && SaimoXtream.itensLetra) {
        return SaimoXtream.itensLetra(tipo === "series" ? "series" : "movie", letra) || [];
      }
      var L = letra === "#" ? "#" : String(letra || "#").toUpperCase();
      var mapa = tipo === "series" ? xtreamVod.series : xtreamVod.filmes;
      var out = [];
      var k;
      for (k in mapa) {
        if (Object.prototype.hasOwnProperty.call(mapa, k) && mapa[k].letter === L) out.push(mapa[k]);
      }
      return out;
    }
    function fontesXtreamFilme(title) {
      if (window.SaimoXtream && SaimoXtream.fontesFilme) return SaimoXtream.fontesFilme(title) || [];
      var it = xtreamVod.filmes[chaveTituloVod(title)];
      if (!it || !xtreamVod.perfil || !window.SaimoXtream || !SaimoXtream.gerarStreamUrl) return it && it.sources ? it.sources : [];
      return [{
        url: SaimoXtream.gerarStreamUrl(xtreamVod.perfil, it.xtreamId, it.ext || "mp4", "movie"),
        quality: "Xtream",
        audio: "DUB",
        origem: "meu",
        origemNome: "Xtream"
      }];
    }
    function carregarScriptXtream() {
      return new Promise(function (resolve) {
        if (window.SaimoXtream && SaimoXtream.login) {
          resolve(true);
          return;
        }
        var s = document.createElement("script");
        s.src = "js/xtream.js?v=xt73";
        s.onload = function () {
          resolve(!!(window.SaimoXtream && SaimoXtream.login));
        };
        s.onerror = function () {
          resolve(false);
        };
        document.head.appendChild(s);
      });
    }
    var xtreamBarTimer = 0;
    var xtreamBarLigada = false;
    function pintarBarraXtream(pct, msg) {
      var overlay = document.getElementById("xtream-progress");
      var fill = document.getElementById("xtream-progress-fill");
      var lab = document.getElementById("xtream-progress-msg");
      var num = document.getElementById("xtream-progress-pct");
      var ofWrap = document.getElementById("oficial-progress");
      var ofFill = document.getElementById("oficial-progress-fill");
      var ofPct = document.getElementById("oficial-progress-pct");
      var baixando = window.SaimoXtream && SaimoXtream.baixando && SaimoXtream.baixando();
      if (baixando && !homeReady) {
        if (overlay) overlay.classList.remove("hidden");
        if (ofWrap) ofWrap.classList.remove("hidden");
      } else if (!pct || pct >= 100 || homeReady) {
        if (overlay) overlay.classList.add("hidden");
        if (ofWrap) ofWrap.classList.add("hidden");
      }
      var tit = document.getElementById("xtream-progress-title");
      if (tit) {
        tit.textContent = (msg && /link|URL|M3U|já está/i.test(msg))
          ? "Atualizando links do Xtream"
          : "Baixando seu Xtream";
      }
      if (fill) fill.style.width = Math.round(pct) + "%";
      if (ofFill) ofFill.style.width = Math.round(pct) + "%";
      if (lab) lab.textContent = msg || "Baixando…";
      if (num) num.textContent = Math.round(pct) + "%";
      if (ofPct) ofPct.textContent = Math.round(pct) + "%";
      if (msg && document.getElementById("oficial-status")) {
        document.getElementById("oficial-status").textContent = msg + " · " + Math.round(pct) + "%";
      }
      if (pct >= 100) {
        if (xtreamBarTimer) clearTimeout(xtreamBarTimer);
        xtreamBarTimer = setTimeout(function () {
          if (overlay) overlay.classList.add("hidden");
          if (ofWrap) ofWrap.classList.add("hidden");
        }, 1400);
      }
    }
    function ligarBarraXtream() {
      if (xtreamBarLigada || !window.SaimoXtream || !SaimoXtream.onProgress) return;
      xtreamBarLigada = true;
      SaimoXtream.onProgress(pintarBarraXtream);
    }
    function sincronizarMeuXtream(forcar) {
      ligarBarraXtream();
      return carregarScriptXtream().then(function (ok) {
        return new Promise(function (resolve) {
          if (!ok) {
            xtreamVod.lastOk = false;
            xtreamVod.lastErro = "Não achou js/xtream.js";
            resolve(false);
            return;
          }
          if (SaimoXtream.sincronizarPromise) {
            SaimoXtream.sincronizarPromise(!!forcar).then(function (r) {
              resolve(!!r);
            }).catch(function () {
              resolve(false);
            });
            return;
          }
          var host = String(SaimoAjustes.get("xtreamHost") || "").trim();
          var user = String(SaimoAjustes.get("xtreamUser") || "").trim();
          var pass = String(SaimoAjustes.get("xtreamPass") || "");
          if (!host || !user || !pass) {
            xtreamVod.lastErro = "Falta servidor, usuário ou senha";
            resolve(false);
            return;
          }
          SaimoXtream.login(host, user, pass, function (err, perfil) {
            if (err || !perfil) {
              xtreamVod.lastOk = false;
              xtreamVod.lastErro = err && err.message ? err.message : "Login recusado";
              resolve(false);
              return;
            }
            xtreamVod.perfil = perfil;
            SaimoXtream.obterFilmes(perfil, null, function (e1, filmes) {
              SaimoXtream.obterSeries(perfil, null, function (e2, series) {
                xtreamVod.filmes = {};
                xtreamVod.series = {};
                var i;
                var listaF = Array.isArray(filmes) ? filmes : [];
                var listaS = Array.isArray(series) ? series : [];
                for (i = 0; i < listaF.length; i++) {
                  var row = listaF[i] || {};
                  var name = String(row.name || row.title || "").trim();
                  if (!name || !row.stream_id) continue;
                  xtreamVod.filmes[chaveTituloVod(name)] = {
                    type: "movie",
                    title: name,
                    name: name,
                    letter: letraXtream(name),
                    year: String(row.year || "").slice(0, 4),
                    xtreamId: row.stream_id,
                    ext: String(row.container_extension || "mp4").replace(/^\./, "")
                  };
                }
                for (i = 0; i < listaS.length; i++) {
                  var rs = listaS[i] || {};
                  var ns = String(rs.name || rs.title || "").trim();
                  var sid = rs.series_id || rs.id;
                  if (!ns || !sid) continue;
                  xtreamVod.series[chaveTituloVod(ns)] = {
                    type: "series",
                    title: ns,
                    name: ns,
                    letter: letraXtream(ns),
                    year: String(rs.year || "").slice(0, 4),
                    xtreamId: sid
                  };
                }
                if (!listaF.length && !listaS.length) {
                  xtreamVod.lastOk = false;
                  xtreamVod.lastErro = e1 && e1.message ? e1.message : "Login ok, catálogo vazio";
                  resolve(false);
                  return;
                }
                xtreamVod.lastOk = true;
                xtreamVod.lastErro = "";
                resolve(true);
              });
            });
          });
        });
      });
    }
    function listarXtreamColecao(tipo) {
      if (window.SaimoXtream && SaimoXtream.colecao) return SaimoXtream.colecao(tipo) || [];
      var out = [];
      var mapas = [xtreamVod.filmes, xtreamVod.series];
      var i, k;
      for (i = 0; i < mapas.length; i++) {
        for (k in mapas[i]) {
          if (Object.prototype.hasOwnProperty.call(mapas[i], k) && mapas[i][k].colecao === tipo) out.push(mapas[i][k]);
        }
      }
      return out;
    }
    function aplicarCanaisXtream() {
      var xs = window.SaimoXtream && SaimoXtream.canaisAoVivo ? SaimoXtream.canaisAoVivo() : [];
      if (!xs.length) return false;
      var i;
      for (i = 0; i < xs.length; i++) {
        xs[i].type = "channel";
        xs[i].isLive = true;
        xs[i].xtream = true;
      }
      return true;
    }
    function amostraCanaisXtream(n) {
      var xs = window.SaimoXtream && SaimoXtream.canaisAoVivo ? SaimoXtream.canaisAoVivo() : [];
      return xs.slice(0, n || 24).map(function (c) {
        return {
          type: "channel",
          isLive: true,
          title: c.name,
          name: c.name,
          category: c.category || "",
          logo: c.logo || "",
          posterUrl: c.logo || "",
          sources: c.sources || []
        };
      });
    }
    function destaquesDoXtream() {
      var filas = window.SaimoXtream && SaimoXtream.fileirasHome ? SaimoXtream.fileirasHome() || [] : [];
      var filmesRowsX = {};
      var seriesRowsX = {};
      var i;
      for (i = 0; i < filas.length; i++) {
        var f = filas[i];
        var t = f.title || "";
        if (/s[eé]rie/i.test(t) && !/anime|dorama/i.test(t)) seriesRowsX[t] = f.items || [];
        else filmesRowsX[t] = f.items || [];
      }
      return {
        filas: filas,
        filmesRows: filmesRowsX,
        seriesRows: seriesRowsX
      };
    }
    function aplicarXtreamNoAcervo(opts) {
      if (!xtreamEstaLigado()) return;
      opts = opts || {};
      try {
        var dest = destaquesDoXtream();
        if (window.SaimoAPI) SaimoAPI._destaquesCache = dest;
        var altaF = dest.filmesRows["Em alta"] || dest.filas[0] && dest.filas[0].items || [];
        var altaS = dest.seriesRows["Séries em alta"] || [];
        if (altaF.length) {
          filmesCats["Em alta"] = altaF;
          filmesCats["Seu Xtream"] = altaF;
        }
        if (altaS.length) {
          seriesCats["Em alta"] = altaS;
          seriesCats["Seu Xtream"] = altaS;
        }
        if (!opts.leve) {
          var animes = listarXtreamColecao("animes");
          var doramas = listarXtreamColecao("doramas");
          if (animes.length) {
            mesclarColecao("animes", animes);
            colecaoCats = colecaoCats || {};
          }
          if (doramas.length) mesclarColecao("doramas", doramas);
        }
        aplicarCanaisXtream();
        if (currentScreen === "catalog" && currentSection === "aovivo") {
          enterSection("aovivo");
        }
        xtreamFilmeFold = null;
        if (altaF.length) homeJaComXtream = true;
        if (!opts.leve) alimentarSearchWorkerCatalog();
        if (homeReady && altaF.length && !opts.silencio) buildHome(true);
        if (currentScreen === "browse") {
          if (browseKind === "ondemand") {
            pintarHub();
            updateBrowseFocus();
          } else if (browseKind === "filmes" || browseKind === "series" || browseKind === "animes" || browseKind === "doramas") {
            preencherPrateleira(browseKind, true);
          }
        }
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("tela_atualizar_erro", (e && e.message) || "");
      }
    }
    function mesclarLetraXtream(tipo, letra, items) {
      var out = (items || []).slice();
      var extra = itensXtreamLetra(tipo, letra);
      var visto = Object.create(null);
      var i;
      for (i = 0; i < out.length; i++) {
        visto[chaveTituloVod(out[i].title || out[i].name)] = 1;
      }
      for (i = 0; i < extra.length; i++) {
        var k = chaveTituloVod(extra[i].title || extra[i].name);
        if (!visto[k]) {
          visto[k] = 1;
          out.push(extra[i]);
        }
      }
      return out;
    }
    function deveBuscarLetraHttps() {
      if (!window.SaimoOficial) return true;
      return SaimoOficial.catalogoSaimoLigado() || SaimoOficial.catalogoMeuLigado();
    }
    function garantirLetraAcervo(tipo, letra) {
      if (!usarCatalogoLazy()) {
        var rows = tipo === "series" ? seriesRows : filmesRows;
        return Promise.resolve(mesclarLetraXtream(tipo, letra, rows[letra] || []));
      }
      var p = deveBuscarLetraHttps() ? SaimoCatalogo.obterLetra(tipo, letra) : Promise.resolve([]);
      return p.then(function (items) {
        items = mesclarLetraXtream(tipo, letra, items);
        var _rows = tipo === "series" ? seriesRows : filmesRows;
        _rows[letra] = items;
        var map = tipo === "series" ? serieByKey : filmeByKey;
        (items || []).forEach(function (it) {
          return guardarNoIndice(map, it, true);
        });
        empurrarItensBuscaWorker(items);
        return items;
      });
    }
    var _indexBuscaLetra = 0;
    var _indexBuscaTipo = "movie";
    function agendarIndexBuscaWorkerLetras() {
      if (!usarCatalogoLazy() || !searchWorker || !searchWorkerReady || !window.SaimoCatalogo) return;
      if (_indexBuscaLetra >= SaimoCatalogo.LETRAS.length) {
        _indexBuscaLetra = 0;
        _indexBuscaTipo = _indexBuscaTipo === "movie" ? "series" : "";
        if (!_indexBuscaTipo) return;
      }
      var L = SaimoCatalogo.LETRAS[_indexBuscaLetra];
      var tipo = _indexBuscaTipo;
      _indexBuscaLetra++;
      var pLetra = deveBuscarLetraHttps() ? SaimoCatalogo.obterLetra(tipo, L) : Promise.resolve([]);
      pLetra.then(function (items) {
        items = mesclarLetraXtream(tipo, L, items);
        var rows = tipo === "series" ? seriesRows : filmesRows;
        rows[L] = items;
        var map = tipo === "series" ? serieByKey : filmeByKey;
        (items || []).forEach(function (it) {
          return guardarNoIndice(map, it, true);
        });
        empurrarItensBuscaWorker(items);
      }).catch(function () {}).then(function () {
        quandoOcioso(agendarIndexBuscaWorkerLetras);
      });
    }
    var controleOcupadoAte = 0;
    var filaOciosa = [];
    var ociosoTimer = null;
    function controleMexeu() {
      controleOcupadoAte = Date.now() + 1000;
      if (ociosoTimer) clearTimeout(ociosoTimer);
      ociosoTimer = setTimeout(esvaziarOciosos, 1000);
    }
    function quandoOcioso(fn) {
      if (Date.now() >= controleOcupadoAte) {
        try {
          fn();
        } catch (e) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("tarefa_ociosa_erro", (e && e.message) || "");
        }
        return;
      }
      filaOciosa.push(fn);
      if (!ociosoTimer) {
        ociosoTimer = setTimeout(esvaziarOciosos, Math.max(50, controleOcupadoAte - Date.now()));
      }
    }
    function esvaziarOciosos() {
      ociosoTimer = null;
      if (Date.now() < controleOcupadoAte) {
        ociosoTimer = setTimeout(esvaziarOciosos, Math.max(50, controleOcupadoAte - Date.now()));
        return;
      }
      var lote = filaOciosa.splice(0);
      for (var i = 0; i < lote.length; i++) {
        try {
          lote[i]();
        } catch (e) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("tarefa_ociosa_erro", (e && e.message) || "");
        }
      }
    }
    var acervoPronto = null;
    function carregarAcervo() {
      if (acervoPronto) return acervoPronto;
      acervoPronto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var vod, tarefas, i;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (usarCatalogoLazy()) {
                _context.n = 10;
                break;
              }
              if (window.SAIMO_VOD_DATA) {
                _context.n = 1;
                break;
              }
              _context.n = 0;
              return new Promise(function (resolve) {
                var s = document.createElement("script");
                s.src = "js/vod_data.js";
                s.onload = function () {
                  return resolve();
                };
                s.onerror = function () {
                  return resolve();
                };
                document.body.appendChild(s);
              });
            case 10:
              _context.n = 11;
              return SaimoCatalogo.carregarIndice();
            case 11:
              _context.n = 12;
              return ensureVodCategories();
            case 12:
              if (!(window.SaimoAPI && SaimoAPI.loadVodDestaques)) {
                _context.n = 13;
                break;
              }
              _context.n = 13;
              return SaimoAPI.loadVodDestaques();
            case 13:
              if (_context.v && _context.v.filmesRows) mesclarDestaquesNasRows(_context.v);
              rebuildVodIndex();
              searchWorkerCatalogLoaded = false;
              quandoOcioso(function () {
                if (!homeReady) return;
                refreshHomeDynamic();
                acrescentarGenerosHome();
                preencherCapasHome();
                agendarIndexBuscaWorkerLetras();
              });
              if (searchWorkerReady) alimentarSearchWorkerCatalog();
              _context.n = 5;
              break;
            case 1:
              vod = window.SAIMO_VOD_DATA;
              if (vod) {
                Object.keys(vod.filmesRows || {}).forEach(function (k) {
                  filmesRows[k] = vod.filmesRows[k];
                });
                Object.keys(vod.seriesRows || {}).forEach(function (k) {
                  seriesRows[k] = vod.seriesRows[k];
                });
              }
              tarefas = [];
              Object.keys(filmesRows).forEach(function (bucket) {
                var gaveta = isLetraCat(bucket);
                (filmesRows[bucket] || []).forEach(function (m) {
                  return tarefas.push(function () {
                    return guardarNoIndice(filmeByKey, m, gaveta);
                  });
                });
              });
              Object.keys(seriesRows).forEach(function (bucket) {
                var gaveta = isLetraCat(bucket);
                (seriesRows[bucket] || []).forEach(function (s) {
                  return tarefas.push(function () {
                    return guardarNoIndice(serieByKey, s, gaveta);
                  });
                });
              });
              i = 0;
            case 2:
              if (!(i < tarefas.length)) {
                _context.n = 4;
                break;
              }
              tarefas[i]();
              if (!((i + 1) % 400 === 0)) {
                _context.n = 3;
                break;
              }
              _context.n = 3;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });
            case 3:
              i++;
              _context.n = 2;
              break;
            case 4:
              quandoOcioso(function () {
                if (!homeReady) return;
                refreshHomeDynamic();
                acrescentarGenerosHome();
                preencherCapasHome();
              });
            case 5:
              return _context.a(2);
          }
        }, _callee);
      }))();
      return acervoPronto;
    }
    function hydrateCatalog() {
      return _hydrateCatalog.apply(this, arguments);
    }
    function _hydrateCatalog() {
      _hydrateCatalog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var mudou, cat, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (window.SaimoAPI) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, false);
            case 1:
              mudou = false;
              if (xtreamEstaLigado()) {
                aplicarCanaisXtream();
                _context2.n = 5;
                break;
              }
              if (!saimoListaLigada()) {
                preencherCanaisAoVivo([], ["Todos"]);
                _context2.n = 5;
                break;
              }
              _context2.p = 2;
              _context2.n = 3;
              return SaimoAPI.loadChannels();
            case 3:
              cat = _context2.v;
              if (xtreamEstaLigado()) {
                aplicarCanaisXtream();
              } else if (cat && cat.channels && cat.channels.length) {
                preencherCanaisAoVivo(cat.channels, cat.categories);
                mudou = true;
              }
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
            case 5:
              _context2.p = 5;
              _context2.n = 6;
              return ensureVodCategories();
            case 6:
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
              try {
                buildVodCategories({
                  filmesRows: {},
                  seriesRows: {}
                });
              } catch (e2) {}
            case 8:
              return _context2.a(2, mudou);
          }
        }, _callee2, null, [[5, 7], [2, 4]]);
      }));
      return _hydrateCatalog.apply(this, arguments);
    }
    function lookupVod(title, type) {
      var k = fold(title);
      var k2 = fold(stripYear(title));
      if (type === "series") return serieByKey[k] || serieByKey[k2] || null;
      if (type === "movie") return filmeByKey[k] || filmeByKey[k2] || null;
      return filmeByKey[k] || serieByKey[k] || filmeByKey[k2] || serieByKey[k2] || null;
    }
    function itemTemPlay(it, kind) {
      if (!it || it.type === "acao") return true;
      var title = it.title || it.name || "";
      if (!title) return false;
      kind = kind || (it.type === "movie" ? "filmes" : it.colecao === "animes" || it.kind === "anime" ? "animes" : it.colecao === "doramas" || it.kind === "dorama" ? "doramas" : "series");
      if (kind === "filmes" || it.type === "movie") {
        if (it.sources && it.sources.length) return true;
        if (it.xtreamId) return true;
        var filme = lookupVod(title, "movie");
        if (filme && (filme.xtreamId || filme.letter || filme.sources && filme.sources.length)) return true;
        if (fontesXtreamFilme(title).length) return true;
        if (window.SaimoXtream && SaimoXtream.mapaFilmes) {
          var mf = SaimoXtream.mapaFilmes() || {};
          if (mf[fold(title)] || mf[fold(stripYear(title))]) return true;
        }
        if (window.SaimoListas && SaimoListas.fontesFilme && SaimoListas.fontesFilme(title).length) return true;
        return false;
      }
      if (it.episodes && it.episodes.length) return true;
      if (it.xtreamId) return true;
      if (it.letter && it.type === "series") return true;
      if (lookupVod(title, "series")) return true;
      if (window.SaimoXtream && SaimoXtream.mapaSeries) {
        var mapa = SaimoXtream.mapaSeries() || {};
        var ks = fold(title);
        if (mapa[ks] || mapa[fold(stripYear(title))]) return true;
      }
      return false;
    }
    function amostraMapaVod(mapa, n) {
      var out = [];
      var k;
      n = n || 48;
      for (k in mapa || {}) {
        if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
        out.push(mapa[k]);
        if (out.length >= n) break;
      }
      return out;
    }
    function titulosXtreamDaSecao(kind) {
      if (!window.SaimoXtream) return [];
      if (kind === "filmes" && SaimoXtream.mapaFilmes) return amostraMapaVod(SaimoXtream.mapaFilmes(), 80);
      if (kind === "series" && SaimoXtream.mapaSeries) return itensSerieSemAnime(amostraMapaVod(SaimoXtream.mapaSeries(), 80));
      if (SaimoXtream.colecao) return (SaimoXtream.colecao(kind) || []).slice(0, 80);
      return [];
    }
    function carregarIndiceSeriesPlay() {
      return Promise.resolve();
    }
    function metaVod(item) {
      if (!item) return null;
      var tipo = item.type === "series" ? "series" : "movie";
      return lookupVod(item.title, tipo);
    }
    function resolverFontesFilme(_x) {
      return _resolverFontesFilme.apply(this, arguments);
    }
    function _resolverFontesFilme() {
      _resolverFontesFilme = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(item) {
        var tentativas, meta, visto, i, L, sources;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              tentativas = [];
              meta = lookupVod(item.title, "movie");
              if (meta && meta.letter) tentativas.push(meta.letter);
              if (item.letter) tentativas.push(item.letter);
              tentativas.push(letraItem(item));
              visto = Object.create(null);
              i = 0;
            case 1:
              if (!(i < tentativas.length)) {
                _context3.n = 5;
                break;
              }
              L = tentativas[i];
              if (!(!L || visto[L])) {
                _context3.n = 2;
                break;
              }
              return _context3.a(3, 4);
            case 2:
              visto[L] = 1;
              _context3.n = 3;
              return SaimoAPI.resolveMovieStreams(item.title, L);
            case 3:
              sources = _context3.v;
              if (!(sources && sources.length)) {
                _context3.n = 4;
                break;
              }
              return _context3.a(2, sources);
            case 4:
              i++;
              _context3.n = 1;
              break;
            case 5:
              return _context3.a(2, []);
          }
        }, _callee3);
      }));
      return _resolverFontesFilme.apply(this, arguments);
    }
    function resolverEpisodiosSerie(_x2) {
      return _resolverEpisodiosSerie.apply(this, arguments);
    }
    function _resolverEpisodiosSerie() {
      _resolverEpisodiosSerie = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(item) {
        var tentativas, meta, visto, i, L, eps;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              tentativas = [];
              meta = lookupVod(item.title, "series");
              if (meta && meta.letter) tentativas.push(meta.letter);
              if (item.letter) tentativas.push(item.letter);
              tentativas.push(letraItem(item));
              visto = Object.create(null);
              i = 0;
            case 1:
              if (!(i < tentativas.length)) {
                _context4.n = 5;
                break;
              }
              L = tentativas[i];
              if (!(!L || visto[L])) {
                _context4.n = 2;
                break;
              }
              return _context4.a(3, 4);
            case 2:
              visto[L] = 1;
              _context4.n = 3;
              return SaimoAPI.resolveSeriesEpisodes(item.title, L);
            case 3:
              eps = _context4.v;
              if (!(eps && eps.length)) {
                _context4.n = 4;
                break;
              }
              return _context4.a(2, eps);
            case 4:
              i++;
              _context4.n = 1;
              break;
            case 5:
              return _context4.a(2, []);
          }
        }, _callee4);
      }));
      return _resolverEpisodiosSerie.apply(this, arguments);
    }
    function enrichItem(_x3) {
      return _enrichItem.apply(this, arguments);
    }
    function _enrichItem() {
      _enrichItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(item) {
        var meta, ehFilme, found, extras, eps, _found, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (item) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, item);
            case 1:
              if (!(item.type !== "channel" && item.type !== "jogo" && item.type !== "acao" && item.type !== "radio")) {
                _context5.n = 5;
                break;
              }
              _context5.p = 2;
              _context5.n = 3;
              return carregarAcervo();
            case 3:
              _context5.n = 5;
              break;
            case 4:
              _context5.p = 4;
              _t3 = _context5.v;
            case 5:
              meta = metaVod(item);
              if (meta) {
                if (meta.letter) item.letter = meta.letter;
                if (meta.year && !item.year) item.year = meta.year;
              }
              ehFilme = item.type === "movie" || item.type !== "series" && item.type !== "channel" && item.type !== "acao";
              if (ehFilme) item.type = "movie";
              if (!(ehFilme && window.SaimoAPI)) {
                _context5.n = 7;
                break;
              }
              found = lookupVod(item.title, "movie");
              if (found) {
                if (found.posterUrl) item.posterUrl = item.posterUrl || found.posterUrl;
                if (found.letter) item.letter = found.letter;
              }
              _context5.n = 6;
              return resolverFontesFilme(item);
            case 6:
              if (_context5.v && _context5.v.length) item.sources = _context5.v;
              else item.sources = item.sources || [];
            case 7:
              if (ehFilme && window.SaimoListas) {
                extras = SaimoListas.fontesFilme(item.title);
                item.sources = item.sources || [];
                extras.forEach(function (s) {
                  if (!item.sources.some(function (x) {
                    return x.url === s.url;
                  })) item.sources.unshift(s);
                });
              }
              if (ehFilme) {
                extras = fontesXtreamFilme(item.title);
                item.sources = item.sources || [];
                extras.forEach(function (s) {
                  if (!item.sources.some(function (x) {
                    return x.url === s.url;
                  })) item.sources.unshift(s);
                });
              }
              if (!(item.type === "series" && window.SaimoAPI)) {
                _context5.n = 9;
                break;
              }
              _context5.n = 8;
              return resolverEpisodiosSerie(item);
            case 8:
              eps = _context5.v;
              if (eps && eps.length) {
                item.episodes = eps;
              } else if (!item.episodes || !item.episodes.length) {
                _found = lookupVod(item.title, "series");
                if (_found && _found.episodes && _found.episodes.length) {
                  item.episodes = _found.episodes;
                  item.posterUrl = item.posterUrl || _found.posterUrl;
                }
              }
            case 9:
              if (item.type === "series" && window.SaimoListas) SaimoListas.juntarEpisodios(item);
              if (!(item.type === "series" && window.SaimoXtream && SaimoXtream.juntarEpisodiosPromise && SaimoXtream.ligado && SaimoXtream.ligado())) {
                return _context5.a(2, item);
              }
              _context5.n = 10;
              return SaimoXtream.juntarEpisodiosPromise(item);
            case 10:
              return _context5.a(2, item);
          }
        }, _callee5, null, [[2, 4]]);
      }));
      return _enrichItem.apply(this, arguments);
    }
    var currentScreen = "home";
    var catalogZone = "grid";
    var aovivoBuscaAberta = false;
    var aovivoBuscaQuery = "";
    var aovivoBuscaKbIndex = 0;
    var aovivoBuscaKeys = [];
    var currentSection = "aovivo";
    var categoryIndex = 0;
    var gridIndex = 0;
    var zapAberta = false;
    var zapLista = [];
    var zapIndex = 0;
    var zapAba = 0;
    var zapZona = "canais";
    var zapGeracao = 0;
    var zapTimer = null;
    var zapPlayTimer = null;
    var modalIndex = 0;
    var activeItemList = [];
    var renderedCount = 0;
    var PAGE_SIZE_INITIAL = 30;
    var PAGE_SIZE_STEP = 18;
    var GRID_COLUMNS = 6;
    var currentSeriesItem = null;
    var currentPlayingEpIndex = -1;
    var playingVodItem = null;
    var currentFocusedElement = null;
    var infoItem = null;
    var infoBtnIndex = 0;
    var infoSources = [];
    var infoSourceIndex = 0;
    var seriesView = "ficha";
    var seriesZone = "play";
    var seriesBtnIndex = 0;
    var seriesSeasonIndex = 0;
    var seriesVersionIndex = 0;
    var seriesEpIndex = 0;
    var seriesFichaEpIndex = 0;
    var seriesSeasons = [];
    var seriesVersions = [];
    var seriesEpisodesView = [];
    var modalMode = "episodes";
    var modalChoices = [];
    var modalReturnScreen = null;
    var nextEpisodePending = null;
    var nextCardVisible = false;
    var returnScreen = "catalog";
    var telaAcervo = "home";
    var guiaVolta = "home";
    var gradeAz = false;
    var gradeGenero = "";
    var gradeItens = [];
    var gradeVolta = "ondemand";
    var browseKind = "ondemand";
    var browseData = [];
    var browseRow = 0;
    var browseCol = 0;
    var browseZone = "rows";
    var browsePilha = [];
    var browseSeq = 0;
    var browseSubIndex = 0;
    var odSide = [];
    var odSideIndex = 0;
    var odListaIndex = 0;
    var odListaExtra = null;
    var odFlyIndex = 0;
    var odItems = [];
    var odGridIndex = 0;
    var odRendered = 0;
    var OD_COLS = 4;
    var OD_PAGE = 16;
    var colecaoCache = {
      animes: null,
      doramas: null
    };
    var colecaoOk = {
      animes: false,
      doramas: false
    };
    var cacheCandidatos = null;
    var infoOverviewTop = 0;
    var homeZone = "explore";
    var menuMexeu = false;
    var homeMenuOpen = false;
    var sideMenuIndex = 0;
    var homeMenuReturnZone = "explore";
    var headerIndex = 0;
    var exploreIndex = 0;
    var homeRow = 0;
    var homeOnLink = false;
    var homeCol = 0;
    var homeData = [];
    var homeReady = false;
    var homeBuildGen = 0;
    var homeFromDest = false;
    var homeJaComXtream = false;
    var homeHeroItem = null;
    var homeHeroContinue = false;
    var homeHeroTravado = false;
    var homeHeroArtGen = 0;
    var heroBtnIndex = 0;
    var homeHookGame = null;
    var homeJogosHoje = [];
    var jogosHojeIndex = 0;
    var infoZone = "buttons";
    var infoCastIndex = 0;
    var seriesCastIndex = 0;
    var guideZone = "list";
    var guideData = [];
    var guideIndex = 0;
    var guideProg = 0;
    var guideOrigin = 0;
    var GUIDE_SPAN = 6 * 3600 * 1000;
    var GUIDE_PX = 5;
    var spotTimer = null;
    var searchReturn = "home";
    var searchSoCanais = false;
    var searchEscopo = "tudo";
    var searchQuery = "";
    var searchZone = "kb";
    var kbIndex = 0;
    var kbKeys = [];
    var searchGroups = [];
    var searchGroup = 0;
    var searchCol = 0;
    var buscaGeracao = 0;
    var settingsIndex = 0;
    var settingsDefs = [];
    var settingsGrupo = 0;
    var settingsZona = "nav";
    var parearOrigem = "settings";
    var pinBuffer = "";
    var pinMode = "check";
    var pinAfter = null;
    var eventsIndex = 0;
    var eventsData = [];
    var radiosIndex = 0;
    var radiosData = [];
    var radioAtual = null;
    var radioMiniAtivo = false;
    var radioMiniIndex = 0;
    var radiosCardIndex = 0;
    var radioCardVolta = "radios";
    var radiosBuscaQuery = "";
    var radiosBuscaZona = "kb";
    var radiosBuscaKb = 0;
    var radiosBuscaIndex = 0;
    var radiosBuscaLista = [];
    var radiosBuscaTeclas = [];
    var radiosBuscaVolta = "radios";
    function prepararRolagem(card) {
      var antigos = document.querySelectorAll(".now-title.rola, .next-title.rola");
      for (var i = 0; i < antigos.length; i++) {
        antigos[i].classList.remove("rola");
        antigos[i].style.removeProperty("--rola");
        antigos[i].style.removeProperty("--rola-dur");
      }
      if (!card || !card.classList || !card.classList.contains("is-live")) return;
      var linhas = card.querySelectorAll(".now-title, .next-title");
      for (var _i = 0; _i < linhas.length; _i++) {
        var el = linhas[_i];
        var span = el.querySelector("span");
        if (!span) continue;
        span.style.maxWidth = "none";
        var folga = span.scrollWidth - el.clientWidth;
        span.style.maxWidth = "";
        if (folga > 8) {
          el.style.setProperty("--rola", -folga + "px");
          el.style.setProperty("--rola-dur", Math.max(7, Math.round(folga / 28)) + "s");
          el.classList.add("rola");
        }
      }
    }
    function setFocus(el) {
      if (currentFocusedElement) currentFocusedElement.classList.remove("focused");
      if (el) {
        el.classList.add("focused");
        currentFocusedElement = el;
        el.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "nearest"
        });
        revelarTituloDaFileira(el);
        prepararRolagem(el);
      }
    }
    function revelarTituloDaFileira(el) {
      var caixa = homeScroll || homeRowsEl;
      if (!el || !el.closest || !caixa || !caixa.contains(el)) return;
      var row = el.closest(".home-row");
      if (!row) return;
      var head = row.querySelector(".home-row-head") || row;
      var limite = caixa.getBoundingClientRect().top;
      var topo = head.getBoundingClientRect().top;
      if (topo < limite - 1) caixa.scrollTop -= limite - topo;
    }
    function saudacao() {
      var h = new Date().getHours();
      if (h >= 5 && h <= 11) return "Bom dia";
      if (h >= 12 && h <= 17) return "Boa tarde";
      return "Boa noite";
    }
    function updateClocks() {
      var d = new Date();
      var h = d.getHours();
      var m = String(d.getMinutes()).padStart(2, "0");
      var cfg = window.SaimoAjustes ? SaimoAjustes.ler() : {
        clock24: true
      };
      var t;
      if (cfg.clock24 === false) {
        var ap = h >= 12 ? "PM" : "AM";
        t = String((h + 11) % 12 + 1) + ":" + m + " " + ap;
      } else t = String(h).padStart(2, "0") + ":" + m;
      if (homeClock) homeClock.textContent = t;
      if (catalogClock) catalogClock.textContent = t;
      if (browseClock) browseClock.textContent = t;
      if (eventsClock) eventsClock.textContent = t;
      if (guideClock) guideClock.textContent = t;
      if (radiosClock) radiosClock.textContent = t;
      if (Date.now() >= controleOcupadoAte) tickBarrasPrograma();
    }
    updateClocks();
    setInterval(updateClocks, 10000);
    function hideAll() {
      screenHome.classList.add("hidden");
      screenCatalog.classList.add("hidden");
      if (screenBrowse) screenBrowse.classList.add("hidden");
      playerContainer.classList.remove("active");
      if (searchModal) searchModal.classList.remove("active");
      if (radiosBusca) radiosBusca.classList.remove("active");
      if (infoPanel) infoPanel.classList.remove("active");
      if (seriesScreen) seriesScreen.classList.remove("active");
      if (settingsScreen) settingsScreen.classList.remove("active");
      if (homeEditScreen) homeEditScreen.classList.remove("active");
      if (jogosHojeScreen) jogosHojeScreen.classList.remove("active");
      if (radiosCardScreen) radiosCardScreen.classList.remove("active");
      if (listasScreen) listasScreen.classList.remove("active");
      if (oficialScreen) oficialScreen.classList.remove("active");
      var parearScreenHide = document.getElementById("parear-screen");
      if (parearScreenHide) parearScreenHide.classList.remove("active");
      if (pinScreen) pinScreen.classList.remove("active");
      var catsMaisHide = document.getElementById("cats-mais-screen");
      if (catsMaisHide) catsMaisHide.classList.remove("active");
      if (eventsScreen) eventsScreen.classList.add("hidden");
      if (radiosScreen) radiosScreen.classList.add("hidden");
      if (guideScreen) guideScreen.classList.add("hidden");
      modalOverlay.classList.remove("active");
      if (trailerOverlay) trailerOverlay.classList.remove("active");
      if (trailerFrame && currentScreen !== "trailer") trailerFrame.src = "";
    }
    function revelarAtras() {
      var tela = returnScreen || "home";
      if (tela === "catalog") screenCatalog.classList.remove("hidden");else if (tela === "browse" && screenBrowse) screenBrowse.classList.remove("hidden");else if (tela === "guia" && guideScreen) guideScreen.classList.remove("hidden");else if (tela === "search") {
        if (searchReturn === "browse" && screenBrowse) screenBrowse.classList.remove("hidden");else if (searchReturn === "catalog") screenCatalog.classList.remove("hidden");else screenHome.classList.remove("hidden");
      } else screenHome.classList.remove("hidden");
    }
    function showScreen(name) {
      if (name !== "player") cancelarCanalZap();
      hideAll();
      if (name === "home") screenHome.classList.remove("hidden");else if (name === "catalog") screenCatalog.classList.remove("hidden");else if (name === "browse" && screenBrowse) screenBrowse.classList.remove("hidden");else if (name === "player") playerContainer.classList.add("active");else if (name === "search") {
        if (searchReturn === "browse" && screenBrowse) screenBrowse.classList.remove("hidden");else if (searchReturn === "catalog") screenCatalog.classList.remove("hidden");else screenHome.classList.remove("hidden");
        searchModal.classList.add("active");
      } else if (name === "info") {
        revelarAtras();
        infoPanel.classList.add("active");
      } else if (name === "series") {
        revelarAtras();
        seriesScreen.classList.add("active");
      } else if (name === "settings") settingsScreen.classList.add("active");else if (name === "homeedit" && homeEditScreen) homeEditScreen.classList.add("active");else if (name === "jogoshoje" && jogosHojeScreen) {
        screenHome.classList.remove("hidden");
        jogosHojeScreen.classList.add("active");
      } else if (name === "listas" && listasScreen) listasScreen.classList.add("active");else if (name === "oficial" && oficialScreen) oficialScreen.classList.add("active");else if (name === "parear") {
        var parearEl = document.getElementById("parear-screen");
        if (parearEl) parearEl.classList.add("active");
      } else if (name === "pin") pinScreen.classList.add("active");else if (name === "eventos") eventsScreen.classList.remove("hidden");else if (name === "radios") radiosScreen.classList.remove("hidden");else if (name === "radiobusca" && radiosBusca) radiosBusca.classList.add("active");else if (name === "guia") guideScreen.classList.remove("hidden");
      encaixarRadioMini();
    }
    function escudoPartida(nome, url) {
      if (url) {
        var img = document.createElement("img");
        img.src = url;
        img.alt = "";
        img.addEventListener("error", function () {
          var letra = document.createElement("div");
          letra.className = "jogo-letra";
          letra.textContent = (nome || "?").charAt(0).toUpperCase();
          if (img.parentNode) img.parentNode.replaceChild(letra, img);
        });
        return img;
      }
      var letra = document.createElement("div");
      letra.className = "jogo-letra";
      letra.textContent = (nome || "?").charAt(0).toUpperCase();
      return letra;
    }
    function cardPartida(jogo) {
      var el = document.createElement("div");
      el.className = "home-mini jogo";
      var times = document.createElement("div");
      times.className = "jogo-times";
      [jogo.casa, jogo.fora].forEach(function (nome, i) {
        var lado = document.createElement("div");
        lado.className = "jogo-time";
        lado.appendChild(escudoPartida(nome, i === 0 ? jogo.casaLogo : jogo.foraLogo));
        var nm = document.createElement("div");
        nm.className = "jogo-nome";
        nm.textContent = nome || "";
        lado.appendChild(nm);
        times.appendChild(lado);
      });
      var meta = document.createElement("div");
      meta.className = "jogo-meta";
      var liga = document.createElement("div");
      liga.className = "jogo-liga";
      liga.textContent = jogo.liga || jogo.canal && jogo.canal.name || "Esporte";
      var hora = document.createElement("div");
      var vivo = window.SaimoExtra && SaimoExtra.aoVivo(jogo);
      hora.className = "jogo-hora" + (vivo ? " vivo" : "");
      hora.textContent = vivo ? "AO VIVO" : window.SaimoExtra ? SaimoExtra.quando(jogo.inicio) : "";
      meta.appendChild(liga);
      meta.appendChild(hora);
      el.appendChild(times);
      el.appendChild(meta);
      return el;
    }
    function miniCard(item, wide, eager) {
      var el = document.createElement("div");
      var carga = eager ? "eager" : "lazy";
      if (item && item.type === "jogo" && item.jogo) return cardPartida(item.jogo);
      if (item && item.type === "channel") {
        if (item.soNome) {
          el.className = "home-mini live so-nome";
          var _nm = document.createElement("div");
          _nm.className = "mini-name";
          _nm.textContent = item.name || item.title || "";
          el.appendChild(_nm);
          return el;
        }
        el.className = "home-mini live";
        var logoWrap = document.createElement("div");
        logoWrap.className = "live-logo";
        var logo = item.logo || item.posterUrl || "";
        if (logo) {
          var img = document.createElement("img");
          img.src = logo;
          img.alt = "";
          img.loading = carga;
          logoWrap.appendChild(img);
        } else {
          logoWrap.textContent = (item.name || item.title || "?").charAt(0).toUpperCase();
          if (window.SaimoLogos) SaimoLogos.pedir(item, logoWrap);
        }
        var _nm2 = document.createElement("div");
        _nm2.className = "mini-name";
        _nm2.textContent = item.name || item.title || "";
        el.appendChild(logoWrap);
        el.appendChild(_nm2);
        var cat = document.createElement("div");
        cat.className = "mini-cat";
        cat.textContent = "Ao vivo";
        el.appendChild(cat);
        var barra = criarBarraPrograma();
        el.appendChild(barra);
        pintarEstrela(el, isFavorited(item.name || item.title || ""));
        preencherBarraPrograma(barra, item);
        preencherProgramaAoVivo(cat, item);
        return el;
      }
      var acao = item && item.type === "acao";
      var secaoCard = acao && item.acao === "secao";
      el.className = "home-mini" + (wide || secaoCard || acao && item.acao === "az" ? " wide" : "");
      if (acao) el.classList.add(item.acao === "secao" ? "secao" : "acao");
      if (acao && item.secao) el.classList.add("secao-" + item.secao);
      var imgUrl = !acao && (item.posterUrl || item.logo || "");
      if (imgUrl && window.SaimoCapas) imgUrl = SaimoCapas.urlLeve(imgUrl);
      if (imgUrl) {
        var _img = document.createElement("img");
        _img.src = imgUrl;
        _img.loading = carga;
        el.appendChild(_img);
      } else {
        var ph = document.createElement("div");
        ph.className = "mini-ph";
        if (secaoCard) {
          ph.innerHTML = '<span class="secao-titulo">' + (item.title || "") + "</span>" + (item.subtitulo ? '<span class="secao-sub">' + item.subtitulo + "</span>" : "");
        } else {
          ph.textContent = acao ? item.title || "" : (item.title || item.name || "?").charAt(0).toUpperCase();
        }
        el.appendChild(ph);
      }
      var nm = document.createElement("div");
      nm.className = "mini-name";
      nm.textContent = secaoCard ? "" : acao ? item.subtitulo || item.title || "" : nomeTela(item);
      el.appendChild(nm);
      if (!acao) pintarEstrela(el, isFavorited(item.title || item.name || ""));
      return el;
    }
    function criarBarraPrograma() {
      var track = document.createElement("div");
      track.className = "prog-canal vazia";
      var fill = document.createElement("div");
      fill.className = "prog-canal-fill";
      track.appendChild(fill);
      return track;
    }
    function aplicarBarraPrograma(track, nn) {
      if (!track) return;
      var fill = track.querySelector(".prog-canal-fill");
      var cur = nn && nn.current;
      if (!cur || !(cur.stop > cur.start)) {
        track.classList.add("vazia");
        delete track.dataset.start;
        delete track.dataset.stop;
        if (fill) fill.style.width = "0";
        return;
      }
      track.classList.remove("vazia");
      track.dataset.start = String(cur.start);
      track.dataset.stop = String(cur.stop);
      var p = Math.min(1, Math.max(0, (Date.now() - cur.start) / (cur.stop - cur.start)));
      if (fill) fill.style.width = p * 100 + "%";
    }
    function preencherBarraPrograma(track, item) {
      if (!track || !window.SaimoEpg) return;
      quandoOcioso(function () {
        SaimoEpg.programas(item).then(function (list) {
          quandoOcioso(function () {
            if (!track.isConnected) return;
            aplicarBarraPrograma(track, SaimoEpg.nowNext(list));
          });
        });
      });
    }
    function preencherProgramaAoVivo(el, item) {
      if (!el || !window.SaimoEpg) return;
      quandoOcioso(function () {
        SaimoEpg.programas(item).then(function (list) {
          quandoOcioso(function () {
            if (!el.isConnected) return;
            var nn = SaimoEpg.nowNext(list);
            el.textContent = nn && nn.current && nn.current.title || "Ao vivo";
          });
        });
      });
    }
    function tickBarrasPrograma() {
      var agora = Date.now();
      var bars = document.querySelectorAll(".prog-canal");
      for (var i = 0; i < bars.length; i++) {
        var track = bars[i];
        var start = parseInt(track.dataset.start, 10);
        var stop = parseInt(track.dataset.stop, 10);
        if (!start || !(stop > start)) continue;
        var fill = track.querySelector(".prog-canal-fill");
        var p = Math.min(1, Math.max(0, (agora - start) / (stop - start)));
        if (fill) fill.style.width = p * 100 + "%";
      }
    }
    function continueItems() {
      var map = getProgressMap();
      var out = [];
      Object.keys(map).forEach(function (k) {
        var p = map[k];
        if (!progressoResumivel(p)) return;
        var title = "";
        var type = "movie";
        if (k.indexOf("f:") === 0) {
          title = k.slice(2);
          type = "movie";
        } else if (k.indexOf("s:") === 0) {
          title = k.slice(2).split("|")[0];
          type = "series";
        } else return;
        var vod = lookupVod(title, type);
        if (!vod) return;
        var card = cardDoAcervo(vod, type === "series");
        out.push({
          item: card,
          ts: p.timestamp || 0
        });
      });
      out.sort(function (a, b) {
        return b.ts - a.ts;
      });
      var items = out.slice(0, 16).map(function (x) {
        return x.item;
      });
      var live = getLastLive();
      var ch = live && canalPorNome(live.name);
      if (ch) {
        var card = {
          type: "channel",
          title: ch.name,
          name: ch.name,
          category: ch.category,
          logo: ch.logo,
          posterUrl: ch.logo,
          sources: ch.sources
        };
        return [card].concat(items.filter(function (it) {
          return (it.name || it.title) !== ch.name;
        })).slice(0, 16);
      }
      return items;
    }
    function canaisParaContinuar() {
      var live = getLastLive();
      var ch = live && canalPorNome(live.name);
      if (!ch) return [];
      return [{
        type: "channel",
        title: ch.name,
        name: ch.name,
        category: ch.category,
        logo: ch.logo,
        posterUrl: ch.logo,
        sources: ch.sources,
        soNome: true
      }];
    }
    function favItems() {
      var names = getFavorites();
      var out = [];
      names.forEach(function (n) {
        var m = lookupVod(n, "movie") || lookupVod(n, "series");
        if (m) out.push(m);
      });
      return out.slice(0, 20);
    }
    function favLiveItems() {
      return liveChannels().filter(function (c) {
        return isFavorited(c.name);
      }).slice(0, 20).map(function (c) {
        return {
          type: "channel",
          title: c.name,
          name: c.name,
          category: c.category || "",
          logo: c.logo || "",
          posterUrl: c.logo || "",
          sources: c.sources || []
        };
      });
    }
    function itensDaSuaLista() {
      if (!window.SaimoListas) return [];
      if (!Object.keys(filmeByKey).length && !Object.keys(serieByKey).length) return [];
      return SaimoListas.soltos(function (titulo, tipo) {
        return !!lookupVod(titulo, tipo);
      });
    }
    function mapDestRow(arr) {
      return (arr || []).map(function (it) {
        var found = lookupVod(it.title, it.type);
        var full = found ? Object.assign({}, found) : {};
        full.type = it.type || found && found.type || full.type;
        if (it.kind) full.kind = it.kind;
        if (it.marca) full.marca = it.marca;
        if (it.episodes && it.episodes.length) full.episodes = it.episodes;
        full.title = it.title || full.title;
        if (it.year) full.year = it.year;
        if (found && found.letter) full.letter = found.letter;else if (it.letter) full.letter = it.letter;
        if (found && found.sources) full.sources = found.sources;
        if (found && found.episodes) full.episodes = found.episodes;
        full.posterUrl = it.posterUrl || full.posterUrl || "";
        if (window.SaimoFicha && SaimoFicha.capaDe && !full.posterUrl) {
          full.posterUrl = SaimoFicha.capaDe(full.title, full.type === "series") || "";
        }
        return full;
      }).filter(function (it) {
        return it && (it.title || it.name);
      });
    }
    function encherGeneros(isSeries) {
      var ordem = isSeries ? GENERO_SERIES : GENERO_FILMES;
      var buckets = {};
      if (window.SaimoFicha && SaimoFicha.listarPorGenero) {
        ordem.forEach(function (nome) {
          if (isSeries && nome === "Animação") return;
          var recs = SaimoFicha.listarPorGenero(isSeries, nome, 0, false);
          if (isSeries) recs = recsSerieSemAnime(recs);
          if (recs.length >= FILEIRA_CAPAS) buckets[nome] = cardsDaFicha(recs, isSeries);
        });
        return buckets;
      }
      var fonte = isSeries ? seriesRows : filmesRows;
      catalogItems(fonte).forEach(function (it) {
        if (!it || !it.title) return;
        if (isSeries && itemPareceAnime(it)) return;
        var gens = window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title, isSeries) : [];
        if (!gens.length) return;
        var card = cardDoAcervo(it, isSeries);
        var seen = Object.create(null);
        gens.forEach(function (g) {
          var nome = nomeGenero(g, isSeries);
          if (!nome || seen[nome]) return;
          if (/^(Kids|Reality|Soap|Talk|TV|War & Politics|Action & Adventure|Sci-Fi)/.test(g) && ordem.indexOf(nome) < 0) return;
          seen[nome] = 1;
          if (!buckets[nome]) buckets[nome] = [];
          buckets[nome].push(card);
        });
      });
      Object.keys(buckets).forEach(function (n) {
        buckets[n].sort(function (a, b) {
          return anoDeItem(b) - anoDeItem(a) || String(a.title).localeCompare(String(b.title), "pt-BR");
        });
      });
      return buckets;
    }
    function fallbackDestaqueRows(isSeries) {
      var rows = isSeries ? seriesRows : filmesRows;
      var out = {};
      var all = catalogItems(rows);
      if (isSeries) all = itensSerieSemAnime(all);
      var recent = all.filter(function (it) {
        return anoDeItem(it) >= 2024;
      });
      if (recent.length) {
        var y = Math.max.apply(null, recent.map(anoDeItem));
        out["Lançamentos " + y] = recent.filter(function (it) {
          return anoDeItem(it) === y;
        }).slice(0, 40).map(function (it) {
          return cardDoAcervo(it, isSeries);
        });
      }
      var alta = all.slice(0, 40).map(function (it) {
        return cardDoAcervo(it, isSeries);
      });
      if (alta.length) out["Em alta"] = alta;
      return out;
    }
    function buildVodCategories(dest) {
      var nextF = {};
      var nextS = {};
      dest = dest || {};
      Object.keys(dest.filmesRows || {}).forEach(function (n) {
        if (isLetraCat(n)) return;
        var items = mapDestRow(dest.filmesRows[n]);
        if (items.length) nextF[n] = items;
      });
      Object.keys(dest.seriesRows || {}).forEach(function (n) {
        if (isLetraCat(n)) return;
        var items = itensSerieSemAnime(mapDestRow(dest.seriesRows[n]));
        if (items.length) nextS[n] = items;
      });
      var genF = encherGeneros(false);
      var genS = encherGeneros(true);
      Object.keys(genF).forEach(function (n) {
        if (genF[n].length >= 4 && !nextF[n]) nextF[n] = genF[n].slice(0, 48);
      });
      Object.keys(genS).forEach(function (n) {
        if (genS[n].length >= 4 && !nextS[n]) nextS[n] = genS[n].slice(0, 48);
      });
      if (!Object.keys(nextF).length) Object.assign(nextF, fallbackDestaqueRows(false));
      if (!Object.keys(nextS).length) Object.assign(nextS, fallbackDestaqueRows(true));
      filmesCats = nextF;
      seriesCats = nextS;
    }
    function ensureVodCategories() {
      return _ensureVodCategories.apply(this, arguments);
    }
    function _ensureVodCategories() {
      _ensureVodCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var dest, _t4, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (!(window.SaimoFicha && SaimoFicha.ensureIndex)) {
                _context6.n = 4;
                break;
              }
              _context6.p = 1;
              _context6.n = 2;
              return SaimoFicha.ensureIndex();
            case 2:
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t4 = _context6.v;
            case 4:
              dest = {
                filmesRows: {},
                seriesRows: {}
              };
              if (!(window.SaimoAPI && SaimoAPI.loadVodDestaques)) {
                _context6.n = 8;
                break;
              }
              _context6.p = 5;
              _context6.n = 6;
              return SaimoAPI.loadVodDestaques();
            case 6:
              dest = _context6.v;
              _context6.n = 8;
              break;
            case 7:
              _context6.p = 7;
              _t5 = _context6.v;
            case 8:
              buildVodCategories(dest);
            case 9:
              return _context6.a(2);
          }
        }, _callee6, null, [[5, 7], [1, 3]]);
      }));
      return _ensureVodCategories.apply(this, arguments);
    }
    function ensureColecaoCategories(_x4) {
      return _ensureColecaoCategories.apply(this, arguments);
    }
    function _ensureColecaoCategories() {
      _ensureColecaoCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(section) {
        var marca, lista, filas, buckets, _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              colecaoCats = {};
              colecaoLista = [];
              marca = section === "animes" ? "a" : "d";
              _context7.n = 1;
              return garantirColecao(section);
            case 1:
              lista = _context7.v;
              colecaoLista = lista.map(function (it) {
                return cardDoAcervo(it, true);
              });
              if (!(window.SaimoFicha && SaimoFicha.ensureIndex)) {
                _context7.n = 5;
                break;
              }
              _context7.p = 2;
              _context7.n = 3;
              return SaimoFicha.ensureIndex();
            case 3:
              _context7.n = 5;
              break;
            case 4:
              _context7.p = 4;
              _t6 = _context7.v;
            case 5:
              _context7.n = 6;
              return destaquesFilas();
            case 6:
              filas = _context7.v;
              filas.forEach(function (f) {
                if (/em alta/i.test(f.title || "")) return;
                var items = mapDestRow((f.items || []).filter(function (it) {
                  return (it.marca || "f") === marca;
                }));
                if (items.length >= 4) colecaoCats[f.title] = items;
              });
              buckets = {};
              candidatosColecao(lista).forEach(function (c) {
                (c.generos || []).forEach(function (g) {
                  if (!g) return;
                  if (!buckets[g]) buckets[g] = [];
                  buckets[g].push(c.card);
                });
              });
              Object.keys(buckets).forEach(function (n) {
                if (buckets[n].length >= 4 && !colecaoCats[n]) {
                  colecaoCats[n] = buckets[n].slice(0, 48);
                }
              });
              if (!Object.keys(colecaoCats).length && colecaoLista.length) {
                colecaoCats["Lançamentos"] = colecaoLista.slice(0, 40);
              }
            case 7:
              return _context7.a(2);
          }
        }, _callee7, null, [[2, 4]]);
      }));
      return _ensureColecaoCategories.apply(this, arguments);
    }
    function indiceAbaInicial(subCategories) {
      var cats = null;
      if (currentSection === "filmes") cats = filmesCats;else if (currentSection === "series") cats = seriesCats;else if (currentSection === "animes" || currentSection === "doramas") cats = colecaoCats;
      if (!cats) return 0;
      for (var i = 1; i < subCategories.length; i++) {
        var nome = subCategories[i];
        if (cats[nome] && cats[nome].length) return i;
      }
      return 0;
    }
    var HOME_EDIT_KEY = "saimo_home_blocos";
    var HOME_EDIT_DEFS = [{
      key: "hero",
      title: "Cartaz"
    }, {
      key: "jogo",
      title: "Jogos de hoje"
    }, {
      key: "continuar",
      title: "Continue assistindo"
    }, {
      key: "aovivo",
      title: "Ao vivo agora"
    }, {
      key: "emalta",
      title: "Em alta (filmes)"
    }, {
      key: "series",
      title: "Séries em alta"
    }, {
      key: "lancamentos",
      title: "Lançamentos de " + new Date().getFullYear() + " (filmes)"
    }, {
      key: "seriesnovas",
      title: "Séries novas de " + new Date().getFullYear()
    }, {
      key: "animes",
      title: "Animes"
    }, {
      key: "doramas",
      title: "Doramas"
    }];
    var homeEditIndex = 0;
    function lerHomeBlocos() {
      try {
        var raw = JSON.parse(localStorage.getItem(HOME_EDIT_KEY) || "{}");
        return raw && typeof raw === "object" ? raw : {};
      } catch (e) {
        return {};
      }
    }
    function blocoLigado(chave) {
      return lerHomeBlocos()[chave] !== false;
    }
    function gravarBloco(chave, on) {
      var atual = lerHomeBlocos();
      atual[chave] = !!on;
      try {
        localStorage.setItem(HOME_EDIT_KEY, JSON.stringify(atual));
      } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "home_blocos: " + ((e && e.message) || ""));
      }
    }
    function chaveDaFileira(titulo) {
      var nome = String(titulo || "");
      if (nome === "Continue assistindo") return "continuar";
      if (nome === "Ao vivo agora") return "aovivo";
      if (nome === "Em alta") return "emalta";
      if (nome === "Séries em alta") return "series";
      if (/^lan[cç]amentos/i.test(nome)) return "lancamentos";
      if (/^s[eé]ries novas/i.test(nome)) return "seriesnovas";
      if (nome === "Animes") return "animes";
      if (nome === "Doramas") return "doramas";
      return "";
    }
    function fileiraLigada(titulo) {
      var chave = chaveDaFileira(titulo);
      return !chave || blocoLigado(chave);
    }
    function heroVisivel() {
      return !!(blocoLigado("hero") && homeHeroItem && homeHero && !homeHero.classList.contains("hidden"));
    }
    function hookVisible() {
      return !!(homeHook && homeJogosHoje.length && !homeHook.classList.contains("hidden"));
    }
    function homeAfterExplore() {
      if (heroVisivel()) return "hero";
      if (hookVisible()) return "hook";
      return "rows";
    }
    function homeBeforeRows() {
      if (hookVisible()) return "hook";
      if (heroVisivel()) return "hero";
      return "explore";
    }
    function openHomeMenu() {
      if (!homeSideMenu || homeMenuOpen) return;
      homeMenuReturnZone = homeZone;
      homeMenuOpen = true;
      homeZone = "menu";
      if (sideMenuIndex < 0 || sideMenuIndex >= homeSideItems.length) sideMenuIndex = 0;
      screenHome.classList.add("home-menu-open");
      if (homeSideScrim) homeSideScrim.classList.remove("hidden");
      if (homeSideScrim) homeSideScrim.classList.add("visible");
      homeSideMenu.setAttribute("aria-hidden", "false");
      updateHomeFocus();
    }
    function closeHomeMenu(restoreZone) {
      if (!homeMenuOpen) return;
      homeMenuOpen = false;
      screenHome.classList.remove("home-menu-open");
      if (homeSideScrim) {
        homeSideScrim.classList.remove("visible");
        homeSideScrim.classList.add("hidden");
      }
      if (homeSideMenu) homeSideMenu.setAttribute("aria-hidden", "true");
      homeZone = restoreZone !== undefined ? restoreZone : homeMenuReturnZone;
      updateHomeFocus();
    }
    function activateSideMenu() {
      var el = homeSideItems[sideMenuIndex];
      if (!el) return;
      var sec = el.dataset.section;
      closeHomeMenu("explore");
      if (sec === "home") return;
      if (sec === "buscar") openSearch();else if (sec === "eventos") openEvents();else if (sec === "radios") openRadios();else if (sec === "guia") openGuide();else if (sec === "ondemand" || sec === "favoritos" || sec === "filmes" || sec === "series") openBrowse(sec);else enterSection(sec);
    }
    function paintHeroChips(parts) {
      if (!homeSpotMeta) return;
      homeSpotMeta.innerHTML = "";
      (parts || []).filter(Boolean).forEach(function (text) {
        var chip = document.createElement("span");
        chip.className = "hero-chip";
        chip.textContent = text;
        homeSpotMeta.appendChild(chip);
      });
    }
    function chaveHero(item) {
      if (!item) return "";
      return fold(item.title || item.name || item.titlePt || "");
    }
    function mesmoTituloHero(a, b) {
      var ka = chaveHero(a);
      return !!(ka && ka === chaveHero(b));
    }
    function urlArteHero(item, f) {
      if (f && f.fundo) return f.fundo;
      if (item && item.fundo) return item.fundo;
      if (item && item.posterUrl) return item.posterUrl;
      return "";
    }
    function revelarHero() {
      if (!homeHeroItem || !blocoLigado("hero")) return;
      if (homeHero) homeHero.classList.remove("hidden");
      if (screenHome) screenHome.classList.remove("home-sem-destaque");
    }
    function mostrarFundoHero(url, item) {
      if (!homeHeroBg) {
        revelarHero();
        return;
      }
      if (!url) {
        revelarHero();
        return;
      }
      if (homeHeroBg.dataset.url === url) {
        homeHeroBg.classList.add("pronta");
        revelarHero();
        return;
      }
      var gen = ++homeHeroArtGen;
      var img = new Image();
      img.onload = function () {
        if (gen !== homeHeroArtGen || !mesmoTituloHero(homeHeroItem, item)) return;
        homeHeroBg.style.backgroundImage = "url(" + url + ")";
        homeHeroBg.dataset.url = url;
        homeHeroBg.classList.add("pronta");
        revelarHero();
      };
      img.onerror = function () {
        if (gen !== homeHeroArtGen) return;
        revelarHero();
      };
      img.src = url;
      setTimeout(function () {
        if (gen !== homeHeroArtGen) return;
        if (homeHero && homeHero.classList.contains("hidden")) revelarHero();
      }, 900);
    }
    function aplicarFichaHero(item, f) {
      if (!f || !mesmoTituloHero(homeHeroItem, item)) return;
      if (f.sinopse && homeSpotOverview) homeSpotOverview.textContent = f.sinopse;
      var chips = [];
      if (f.duracao) chips.push(formatDuracao(f.duracao));
      if (f.ano || item.year) chips.push(String(f.ano || item.year));
      if (f.nota) chips.push("★ " + (Math.round(f.nota * 10) / 10).toFixed(1));
      (f.generos || []).slice(0, 3).forEach(function (g) {
        return chips.push(g);
      });
      if (chips.length) paintHeroChips(chips);
      if (f.fundo && homeHeroItem) homeHeroItem.fundo = f.fundo;
      mostrarFundoHero(urlArteHero(homeHeroItem, f), homeHeroItem);
    }
    function mesclarArteHero(item) {
      if (!homeHeroItem || !item || !mesmoTituloHero(homeHeroItem, item)) return;
      if (item.fundo && !homeHeroItem.fundo) homeHeroItem.fundo = item.fundo;
      if (item.posterUrl && !homeHeroItem.posterUrl) homeHeroItem.posterUrl = item.posterUrl;
      if (item.sinopsePt && !homeHeroItem.sinopsePt) homeHeroItem.sinopsePt = item.sinopsePt;
      if (item.titlePt) homeHeroItem.titlePt = item.titlePt;
      mostrarFundoHero(urlArteHero(homeHeroItem, null), homeHeroItem);
    }
    function paintHero(item, isContinue) {
      if (item && homeHeroTravado && homeHeroItem && !mesmoTituloHero(homeHeroItem, item)) {
        mesclarArteHero(item);
        return;
      }
      homeHeroItem = item || null;
      homeHeroContinue = !!isContinue;
      if (homeHeroKicker) homeHeroKicker.textContent = isContinue ? "Continue assistindo" : "Em alta";
      if (!item || !blocoLigado("hero")) {
        if (!item) {
          homeHeroItem = null;
          homeHeroTravado = false;
        }
        if (homeHero) homeHero.classList.add("hidden");
        if (screenHome) screenHome.classList.toggle("home-sem-destaque", true);
        if (!item) {
          if (homeSpotTitle) homeSpotTitle.textContent = "";
          paintHeroChips([]);
          if (homeSpotOverview) homeSpotOverview.textContent = "";
          if (btnHeroPlay) btnHeroPlay.textContent = "Assistir";
          if (homeHeroBg) {
            homeHeroBg.style.backgroundImage = "";
            homeHeroBg.classList.remove("pronta");
            delete homeHeroBg.dataset.url;
          }
        }
        return;
      }
      homeHeroTravado = true;
      if (homeHero) homeHero.classList.add("hidden");
      if (homeSpotTitle) homeSpotTitle.textContent = nomeTela(item);
      paintHeroChips([item.year || ""]);
      if (homeSpotOverview) homeSpotOverview.textContent = item.sinopsePt || "";
      if (btnHeroPlay) btnHeroPlay.textContent = isContinue ? "Continuar" : "Assistir";
      var imediata = fichaPronta(item);
      mostrarFundoHero(urlArteHero(item, imediata), item);
      if (imediata) aplicarFichaHero(item, imediata);
      if (!window.SaimoFicha || !item.title) return;
      SaimoFicha.de(item.title, item.type === "series").then(function (f) {
        return aplicarFichaHero(item, f);
      }).catch(function () {});
    }
    function fichaPronta(item) {
      if (!window.SaimoFicha || !item || !item.title) return null;
      var serie = item.type === "series";
      var marca = (serie ? "s:" : "f:") + item.title;
      var salva = SaimoFicha.fichaSalva(marca);
      var local = SaimoFicha.localDe(item.title, serie);
      return salva || (local && local.sinopse ? local : null);
    }
    function acrescentarGenerosHome() {
      return;
      var buckets = {
        Ação: [],
        Comédia: [],
        Terror: [],
        Animação: [],
        Família: [],
        Romance: []
      };
      var nomes = Object.keys(buckets);
      var keys = Object.keys(SaimoFicha.locais);
      var _loop = function _loop() {
          var cheio = true;
          for (var j = 0; j < nomes.length; j++) {
            if (buckets[nomes[j]].length < 16) {
              cheio = false;
              break;
            }
          }
          if (cheio) return 0; // break
          var k = keys[i];
          var f = SaimoFicha.locais[k];
          if (!f) return 1; // continue
          var serie = k.indexOf("s:") === 0;
          var vod = lookupVod(f.titulo, serie ? "series" : "movie");
          if (!vod) return 1; // continue
          (f.generos || []).forEach(function (g) {
            var nome = g === "Thriller" ? "Suspense" : g;
            if (!buckets[nome] || buckets[nome].length >= 16) return;
            if (buckets[nome].some(function (x) {
              return x.title === vod.title;
            })) return;
            var card = Object.assign({}, vod);
            if (!card.posterUrl && f.capa) card.posterUrl = f.capa;
            buckets[nome].push(card);
          });
        },
        _ret;
      for (var i = 0; i < keys.length; i++) {
        _ret = _loop();
        if (_ret === 0) break;
        if (_ret === 1) continue;
      }
      nomes.forEach(function (n) {
        if (!buckets[n].length) return;
        if (homeData.some(function (r) {
          return r.title === n;
        })) return;
        syncHomeRow(n, buckets[n]);
      });
    }
    function paintHook(jogos) {
      homeJogosHoje = blocoLigado("jogo") ? jogos || [] : [];
      homeHookGame = null;
      if (!homeHook) return;
      if (!homeJogosHoje.length) {
        homeHook.classList.add("hidden");
        homeHook.innerHTML = "";
        return;
      }
      var vivos = homeJogosHoje.filter(function (j) {
        return window.SaimoExtra && SaimoExtra.aoVivo(j);
      }).length;
      var meta = vivos ? vivos + (vivos === 1 ? " ao vivo" : " ao vivo") : homeJogosHoje.length + (homeJogosHoje.length === 1 ? " jogo" : " jogos");
      homeHook.classList.remove("hidden");
      homeHook.innerHTML = '<div class="hook-match">Jogos de hoje</div>' + '<div class="hook-meta' + (vivos ? " ao-vivo" : "") + '">' + meta + "</div>";
    }
    function makeHomeRowEl(row, ri) {
      var wrap = document.createElement("div");
      wrap.className = "home-row" + (row.live ? " home-row-live" : "");
      wrap.dataset.row = String(ri);
      var head = document.createElement("div");
      head.className = "home-row-head";
      var t = document.createElement("div");
      t.className = "home-row-title";
      t.textContent = row.title;
      head.appendChild(t);
      if (row.link) {
        var link = document.createElement("button");
        link.type = "button";
        link.className = "home-row-link";
        link.textContent = row.link + " ›";
        link.addEventListener("click", function () {
          var rows = Array.prototype.slice.call(homeRowsEl.children);
          var ix = rows.indexOf(wrap);
          if (ix >= 0) homeRow = ix;
          homeOnLink = true;
          activateRowLink();
        });
        head.appendChild(link);
      }
      var track = document.createElement("div");
      track.className = "home-row-track";
      if (!row.items.length && row.emptyText) {
        var empty = document.createElement("div");
        empty.className = "home-row-empty";
        empty.textContent = row.emptyText;
        track.appendChild(empty);
      } else {
        row.items.forEach(function (item, ci) {
          var card = miniCard(item, row.wide || row.live || item.wide);
          card.dataset.row = String(ri);
          card.dataset.col = String(ci);
          track.appendChild(card);
        });
      }
      wrap.appendChild(head);
      wrap.appendChild(track);
      return wrap;
    }
    function reindexHomeCards() {
      Array.prototype.forEach.call(homeRowsEl.children, function (wrap, ri) {
        var track = wrap.querySelector(".home-row-track");
        if (!track) return;
        Array.prototype.forEach.call(track.children, function (card, ci) {
          card.dataset.row = String(ri);
          card.dataset.col = String(ci);
        });
      });
    }
    function sameHomeItems(a, b) {
      if (!a || !b || a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) {
        if ((a[i].title || a[i].name) !== (b[i].title || b[i].name)) return false;
      }
      return true;
    }
    function linhaHome(title, items, opts) {
      opts = opts || {};
      return {
        title: title,
        items: (items || []).slice(0, 20),
        wide: !!opts.wide,
        live: !!opts.live,
        link: opts.link || "",
        linkSection: opts.linkSection || "",
        emptyText: opts.emptyText || ""
      };
    }
    function syncHomeRow(title, items, insertAt, opts) {
      opts = opts || {};
      if (!fileiraLigada(title)) {
        var fora = homeData.findIndex(function (r) {
          return r.title === title;
        });
        if (fora >= 0) {
          homeData.splice(fora, 1);
          if (homeRowsEl.children[fora]) homeRowsEl.removeChild(homeRowsEl.children[fora]);
          reindexHomeCards();
        }
        return;
      }
      var list = (items || []).slice(0, 20);
      var idx = homeData.findIndex(function (r) {
        return r.title === title;
      });
      if (!list.length && !opts.keepEmpty) {
        if (idx >= 0) {
          homeData.splice(idx, 1);
          if (homeRowsEl.children[idx]) homeRowsEl.removeChild(homeRowsEl.children[idx]);
          reindexHomeCards();
        }
        return;
      }
      var prev = idx >= 0 ? homeData[idx] : null;
      var link = opts.link != null ? opts.link : prev && prev.link || "";
      var linkSection = opts.linkSection != null ? opts.linkSection : prev && prev.linkSection || "";
      var pos = insertAt == null ? idx >= 0 ? idx : homeData.length : Math.min(insertAt, idx >= 0 ? Math.max(0, homeData.length - 1) : homeData.length);
      var mesmos = idx >= 0 && sameHomeItems(homeData[idx].items, list) && (homeData[idx].link || "") === link;
      if (mesmos) {
        if (idx !== pos) moverLinhaHome(idx, pos);
        return;
      }
      var row = linhaHome(title, list, {
        wide: opts.wide != null ? opts.wide : prev && prev.wide,
        live: opts.live != null ? opts.live : prev && prev.live,
        link: link,
        linkSection: linkSection,
        emptyText: opts.emptyText || prev && prev.emptyText || ""
      });
      if (idx < 0) {
        homeData.splice(pos, 0, row);
        homeRowsEl.insertBefore(makeHomeRowEl(row, pos), homeRowsEl.children[pos] || null);
        reindexHomeCards();
        return;
      }
      homeData[idx] = row;
      var old = homeRowsEl.children[idx];
      var neu = makeHomeRowEl(row, idx);
      if (old) homeRowsEl.replaceChild(neu, old);else homeRowsEl.appendChild(neu);
      if (idx !== pos) moverLinhaHome(idx, pos);else reindexHomeCards();
    }
    function moverLinhaHome(de, para) {
      if (de === para || de < 0 || para < 0 || de >= homeData.length) return;
      var row = homeData.splice(de, 1)[0];
      var el = homeRowsEl.children[de];
      if (el) homeRowsEl.removeChild(el);
      var destino = Math.min(para, homeData.length);
      homeData.splice(destino, 0, row);
      if (el) homeRowsEl.insertBefore(el, homeRowsEl.children[destino] || null);
      reindexHomeCards();
    }
    function refreshHomeDynamic() {
      if (!homeReady) return;
      var canaisCont = canaisParaContinuar();
      syncHomeRow("Continue assistindo", canaisCont, 0, {
        wide: true,
        live: true,
        link: "",
        linkSection: ""
      });
      var contIdx = homeData.findIndex(function (r) {
        return r.title === "Continue assistindo";
      });
      syncHomeRow("Ao vivo agora", favLiveItems(), contIdx >= 0 ? contIdx + 1 : 0, {
        keepEmpty: true,
        wide: true,
        live: true,
        link: "",
        linkSection: "",
        emptyText: "Favorite canais no Ao vivo com o botão amarelo."
      });
      var soltos = itensDaSuaLista();
      var depois = homeData.findIndex(function (r) {
        return r.title === "Em alta";
      });
      syncHomeRow("Da sua lista", soltos, depois >= 0 ? depois + 1 : 1, {
        keepEmpty: false
      });
      var alta = homeData.find(function (r) {
        return r.title === "Em alta";
      });
      var heroAlta = alta && alta.items && alta.items[0] || null;
      if (homeHeroItem && heroAlta) mesclarArteHero(heroAlta);
      if (homeRow >= homeData.length) homeRow = Math.max(0, homeData.length - 1);
      var atual = homeData[homeRow];
      if (atual && homeCol >= atual.items.length) homeCol = Math.max(0, atual.items.length - 1);
      if (atual && !atual.items.length) homeOnLink = true;
    }
    function nomeTela(item) {
      if (!item) return "";
      return item.titlePt || item.title || item.name || "";
    }
    var xtreamFilmeFold = null;
    function indiceXtreamFilmes() {
      if (xtreamFilmeFold) return xtreamFilmeFold;
      xtreamFilmeFold = Object.create(null);
      var mapa = window.SaimoXtream && SaimoXtream.mapaFilmes ? SaimoXtream.mapaFilmes() : {};
      var k, it, fk;
      for (k in mapa) {
        if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
        it = mapa[k];
        if (!it || !it.title) continue;
        xtreamFilmeFold[k] = it;
        fk = fold(it.title);
        if (fk && !xtreamFilmeFold[fk]) xtreamFilmeFold[fk] = it;
        fk = fold(stripYear(it.title));
        if (fk && !xtreamFilmeFold[fk]) xtreamFilmeFold[fk] = it;
        fk = chaveTituloVod(it.title);
        if (fk && !xtreamFilmeFold[fk]) xtreamFilmeFold[fk] = it;
      }
      return xtreamFilmeFold;
    }
    function acharFilmePorTmdb(tm) {
      if (!tm) return null;
      var tent = [tm.title, tm.original];
      if (tm.year) {
        tent.push(tm.title + " (" + tm.year + ")");
        tent.push(tm.original + " (" + tm.year + ")");
      }
      var i, hit, k;
      for (i = 0; i < tent.length; i++) {
        hit = lookupVod(tent[i], "movie");
        if (hit) return hit;
      }
      var idx = indiceXtreamFilmes();
      for (i = 0; i < tent.length; i++) {
        k = chaveTituloVod(tent[i]) || fold(tent[i]);
        if (k && idx[k]) return idx[k];
        k = fold(stripYear(tent[i]));
        if (k && idx[k]) return idx[k];
      }
      var alvos = Object.create(null);
      tent.forEach(function (t) {
        alvos[fold(t)] = 1;
        alvos[fold(stripYear(t))] = 1;
        alvos[chaveTituloVod(t)] = 1;
      });
      for (k in filmeByKey) {
        if (!Object.prototype.hasOwnProperty.call(filmeByKey, k)) continue;
        if (alvos[k] || alvos[fold(stripYear(k))]) return filmeByKey[k];
      }
      return null;
    }
    function cruzarLancamentosTmdb(lista) {
      var out = [];
      var visto = Object.create(null);
      (lista || []).forEach(function (tm) {
        if (!tm) return;
        var found = acharFilmePorTmdb(tm);
        if (!found) return;
        var id = fold(found.title);
        if (visto[id]) return;
        visto[id] = 1;
        var card = Object.assign({}, found);
        card.type = "movie";
        card.marca = "f";
        card.titlePt = tm.title || found.title;
        if (tm.year) card.year = tm.year;
        if (tm.poster) card.posterUrl = tm.poster;
        if (tm.backdrop) card.fundo = tm.backdrop;
        if (tm.overview) card.sinopsePt = tm.overview;
        if (tm.nota) card.nota = tm.nota;
        out.push(card);
      });
      return out.slice(0, 20);
    }
    function completarEmAlta(base, extras) {
      var out = [];
      var visto = Object.create(null);
      function add(arr) {
        (arr || []).forEach(function (it) {
          if (!it) return;
          var id = fold((it.title || it.name || "") + (it.type || ""));
          if (!id || visto[id]) return;
          visto[id] = 1;
          out.push(it);
        });
      }
      add(base);
      (extras || []).forEach(add);
      return out.slice(0, 20);
    }
    function destAltaLocal() {
      var alta = filmesRows["Em alta"] || seriesRows["Em alta"];
      if (alta && alta.length) return alta.slice(0, 20);
      var chave = Object.keys(filmesRows)[0];
      return chave ? (filmesRows[chave] || []).slice(0, 20) : [];
    }
    function buildHome(_x5) {
      return _buildHome.apply(this, arguments);
    }
    function _buildHome() {
      _buildHome = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(force) {
        var geracao, cont, dest, grupos, ordenadas, emAlta, lancKey, lanc, filmeCont, seen, pushRow, aoVivo, canaisCont, daLista, tmdbLanc, _t7;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              pushRow = function _pushRow(nome, arr, opts) {
                opts = opts || {};
                if (!fileiraLigada(nome)) return;
                if (!arr || !arr.length) return;
                var items = arr.filter(function (it) {
                  var id = (it.type || "") + (it.title || it.name);
                  if (!opts.allowDup) {
                    if (seen[id]) return false;
                    seen[id] = 1;
                  }
                  return true;
                });
                if (items.length) homeData.push(linhaHome(nome, items, opts));
              };
              if (!(homeReady && !force)) {
                _context8.n = 1;
                break;
              }
              refreshHomeDynamic();
              return _context8.a(2);
            case 1:
              geracao = ++homeBuildGen;
              cont = continueItems();
              dest = {
                filmesRows: {},
                seriesRows: {}
              };
              if (!(window.SaimoAPI && SaimoAPI.loadVodDestaques)) {
                _context8.n = 5;
                break;
              }
              _context8.p = 2;
              _context8.n = 3;
              return SaimoAPI.loadVodDestaques();
            case 3:
              dest = _context8.v;
              _context8.n = 5;
              break;
            case 4:
              _context8.p = 4;
              _t7 = _context8.v;
            case 5:
              if (!(geracao !== homeBuildGen)) {
                _context8.n = 6;
                break;
              }
              return _context8.a(2);
            case 6:
              if (xtreamEstaLigado()) aplicarXtreamNoAcervo({ silencio: true });
              grupos = dest.filmesRows || {};
              if (xtreamEstaLigado()) {
                var xdest = destaquesDoXtream();
                if (xdest && xdest.filmesRows && Object.keys(xdest.filmesRows).length) {
                  grupos = xdest.filmesRows;
                  dest = xdest;
                }
              }
              ordenadas = [];
              if (xtreamEstaLigado() && grupos["Em alta"] && grupos["Em alta"].length) homeJaComXtream = true;
              homeFromDest = Object.keys(grupos).length > 0 || Object.keys(dest.seriesRows || {}).length > 0;
              lancKey = Object.keys(grupos).find(function (n) {
                return /lan[cç]amentos/i.test(n);
              });
              lanc = lancKey ? mapDestRow(grupos[lancKey]).slice(0, 20) : [];
              filmeCont = cont.find(function (it) {
                return it && it.type !== "channel";
              });
              _context8.n = 19;
              return window.SaimoFicha && SaimoFicha.lancamentosFilmes ? SaimoFicha.lancamentosFilmes() : [];
            case 19:
              if (geracao !== homeBuildGen) return _context8.a(2);
              tmdbLanc = _context8.v || [];
              emAlta = cruzarLancamentosTmdb(tmdbLanc);
              var destAlta = grupos["Em alta"] ? mapDestRow(grupos["Em alta"]).slice(0, 20) : [];
              if (!destAlta.length) destAlta = destAltaLocal();
              emAlta = completarEmAlta(emAlta, [destAlta, lanc]);
              _context8.n = 7;
              var heroCand = filmeCont || emAlta[0] || null;
              if (homeHeroTravado && homeHeroItem) {
                mesclarArteHero(filmeCont);
                mesclarArteHero(emAlta[0]);
              } else {
                paintHero(heroCand, !!filmeCont);
              }
              break;
            case 7:
              if (!(geracao !== homeBuildGen)) {
                _context8.n = 8;
                break;
              }
              return _context8.a(2);
            case 8:
              homeData = [];
              seen = {};
              aoVivo = favLiveItems();
              if (!aoVivo.length) aoVivo = amostraCanaisXtream(24);
              canaisCont = canaisParaContinuar();
              if (canaisCont.length && fileiraLigada("Continue assistindo")) {
                homeData.push(linhaHome("Continue assistindo", canaisCont, {
                  wide: true,
                  live: true
                }));
              }
              if (fileiraLigada("Ao vivo agora")) {
                homeData.push(linhaHome("Ao vivo agora", aoVivo, {
                  wide: true,
                  live: true,
                  emptyText: aoVivo.length ? "" : "Favorite canais no Ao vivo com o botão amarelo."
                }));
              }
              pushRow("Em alta", emAlta);
              daLista = itensDaSuaLista();
              if (daLista.length) pushRow("Da sua lista", daLista);
              if (lanc.length && !(emAlta && emAlta.length) && !(tmdbLanc && tmdbLanc.length)) {
                pushRow(lancKey || "Lançamentos", lanc);
              }
              homeRowsEl.innerHTML = "";
              homeData.forEach(function (row, ri) {
                return homeRowsEl.appendChild(makeHomeRowEl(row, ri));
              });
              preencherCapasHome();
              if (homeRow >= homeData.length) homeRow = 0;
              homeReady = true;
              if (currentScreen === "home") updateHomeFocus();
              if (window.SaimoFicha) {
                quandoOcioso(function () {
                  SaimoFicha.ensureIndex().then(function () {
                    quandoOcioso(function () {
                      if (geracao !== homeBuildGen || !homeReady) return;
                      var imediata = fichaPronta(homeHeroItem);
                      if (imediata) aplicarFichaHero(homeHeroItem, imediata);
                    });
                  }).catch(function () {});
                });
              }
              if (window.SaimoExtra) {
                SaimoExtra.jogos(liveChannels()).then(function (jogos) {
                  quandoOcioso(function () {
                    if (geracao !== homeBuildGen || !homeReady) return;
                    var hoje = window.SaimoExtra && SaimoExtra.jogosDeHoje ? SaimoExtra.jogosDeHoje(jogos) : [];
                    paintHook(hoje);
                  });
                }).catch(function () {});
              }
            case 9:
              return _context8.a(2);
          }
        }, _callee8, null, [[2, 4]]);
      }));
      return _buildHome.apply(this, arguments);
    }
    function preencherCapasHome() {
      if (!window.SaimoCapas) return;
      SaimoCapas.preencherFileiras(homeRowsEl, function (ri, ci) {
        return homeData[ri] && homeData[ri].items[ci];
      });
    }
    function preFichaNoFoco(item) {
      if (window.SaimoDiagnostico && SaimoDiagnostico.detectarWebOS().webos) return;
      if (!item || item.type === "channel" || item.type === "jogo" || item.type === "acao") return;
      if (!window.SaimoCapas || !window.SaimoFicha) return;
      SaimoCapas.agendarPreFicha(item, function (it) {
        var titulo = it.title || it.name;
        if (!titulo) return;
        var serie = it.type === "series" || it.type !== "movie";
        var run = function () {
          SaimoFicha.de(titulo, serie).catch(function () {});
        };
        if (typeof requestIdleCallback === "function") requestIdleCallback(run, {
          timeout: 2000
        });else setTimeout(run, 50);
      });
    }
    function homeItem() {
      var row = homeData[homeRow];
      return row && row.items[homeCol] ? row.items[homeCol] : null;
    }
    function menuForaDaTela() {
      if (!homeScroll || !homeHeader) return false;
      var caixa = homeScroll.getBoundingClientRect();
      var barra = homeHeader.getBoundingClientRect();
      return barra.bottom < caixa.top + 12;
    }
    function atualizarSetaMenu() {
      if (!homeMenuSeta) return;
      var mostra = currentScreen === "home" && !homeMenuOpen && menuForaDaTela() && homeZone !== "explore" && homeZone !== "header" && homeZone !== "menu";
      homeMenuSeta.classList.toggle("hidden", !mostra);
    }
    function trazerMenu() {
      homeOnLink = false;
      homeZone = "explore";
      if (homeScroll) homeScroll.scrollTop = 0;
      updateHomeFocus();
      if (homeScroll) homeScroll.scrollTop = 0;
      try {
        window.scrollTo(0, 0);
      } catch (e) {}
      atualizarSetaMenu();
    }
    function updateHomeFocus() {
      if (homeZone === "menu") setFocus(homeSideItems[sideMenuIndex] || homeSideItems[0]);else if (homeZone === "radiomini") {
        var btns = botoesRadioMini();
        setFocus(btns[radioMiniIndex] || btns[0]);
      } else if (homeZone === "header") setFocus(headerBtns[headerIndex] || headerBtns[0]);else if (homeZone === "explore") setFocus(exploreChips[exploreIndex] || exploreChips[0]);else if (homeZone === "hero") {
        var _btns = [btnHeroPlay, btnHeroInfo].filter(Boolean);
        if (heroBtnIndex >= _btns.length) heroBtnIndex = 0;
        setFocus(_btns[heroBtnIndex] || homeHero);
      } else if (homeZone === "hook") setFocus(homeHook);else {
        var rowEl = homeRowsEl.children[homeRow];
        if (homeOnLink) {
          var link = rowEl && rowEl.querySelector(".home-row-link");
          if (link) setFocus(link);else homeOnLink = false;
        }
        if (!homeOnLink) {
          var track = rowEl && rowEl.querySelector(".home-row-track");
          var card = track && track.children[homeCol];
          if (card) setFocus(card);
          var row = homeData[homeRow];
          if (track && row && row.items && window.SaimoCapas) {
            SaimoCapas.atualizarJanelaTrack(track, row.items, homeCol);
            preFichaNoFoco(row.items[homeCol]);
          }
        }
      }
      atualizarSetaMenu();
    }
    function activateRowLink() {
      var row = homeData[homeRow];
      if (!row || !row.linkSection) return;
      var sec = row.linkSection;
      if (sec === "ondemand" || sec === "favoritos" || sec === "filmes" || sec === "series") openBrowse(sec);else if (sec === "eventos") openEvents();else enterSection(sec);
    }
    function prepararFileiraInicial() {
      homeRow = 0;
      homeCol = 0;
      homeOnLink = false;
      var row = homeData[0];
      if (row && !row.items.length && row.link) homeOnLink = true;
    }
    function moverFileiraHome(delta) {
      var prox = homeRow + delta;
      if (prox < 0) {
        homeOnLink = false;
        homeZone = homeBeforeRows();
        return;
      }
      if (prox >= homeData.length) return;
      homeRow = prox;
      homeOnLink = false;
      var row = homeData[homeRow];
      var n = row && row.items ? row.items.length : 0;
      homeCol = n ? Math.min(homeCol, n - 1) : 0;
      if (!n) homeOnLink = !!(row && row.link);
    }
    function activateHero(_x6) {
      return _activateHero.apply(this, arguments);
    }
    function _activateHero() {
      _activateHero = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(openInfo) {
        var item;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              item = homeHeroItem;
              if (item) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2);
            case 1:
              _context9.n = 2;
              return enrichItem(item);
            case 2:
              returnScreen = "home";
              if (!(item.type === "channel")) {
                _context9.n = 3;
                break;
              }
              launchPlayer({
                name: item.name,
                category: item.category,
                logo: item.logo,
                isLive: true,
                sources: item.sources
              }, item, null);
              return _context9.a(2);
            case 3:
              if (!openInfo) {
                _context9.n = 4;
                break;
              }
              if (item.type === "series") openSeriesScreen(item);else openInfoPanel(item);
              return _context9.a(2);
            case 4:
              if (item.type === "series") openSeriesScreen(item);else if (homeHeroContinue) playInfoItemFrom(item, true);else openInfoPanel(item);
            case 5:
              return _context9.a(2);
          }
        }, _callee9);
      }));
      return _activateHero.apply(this, arguments);
    }
    function playInfoItemFrom(item, fromResume) {
      infoItem = item;
      playInfoItem(fromResume);
    }
    function nomeCanalJogo(j) {
      if (!j) return "";
      return j.canal && j.canal.name || j.canalNome || "";
    }
    function abrirJogo(j) {
      if (!j || !j.canal) return;
      returnScreen = "home";
      launchPlayer({
        name: j.canal.name,
        category: j.liga || "Esporte",
        logo: j.canal.logo,
        isLive: true,
        sources: j.canal.sources
      }, j.canal, null);
    }
    function itensJogosHoje() {
      return jogosHojeList ? jogosHojeList.querySelectorAll(".jogo-hoje-item") : [];
    }
    function renderJogosHoje() {
      if (!jogosHojeList) return;
      var vivoDe = function vivoDe(j) {
        return !!(window.SaimoExtra && SaimoExtra.aoVivo(j));
      };
      homeJogosHoje = homeJogosHoje.slice().sort(function (a, b) {
        var va = vivoDe(a) ? 0 : 1;
        var vb = vivoDe(b) ? 0 : 1;
        if (va !== vb) return va - vb;
        return (a.inicio || 0) - (b.inicio || 0);
      });
      jogosHojeList.innerHTML = "";
      var horaAnterior = "";
      homeJogosHoje.forEach(function (j, i) {
        var vivo = vivoDe(j);
        var quando = window.SaimoExtra ? SaimoExtra.quando(j.inicio) : "";
        var futuro = !vivo && j.inicio > Date.now();
        if (!vivo && quando !== horaAnterior) {
          horaAnterior = quando;
          var grupo = document.createElement("div");
          grupo.className = "jogo-hoje-grupo";
          grupo.textContent = quando;
          jogosHojeList.appendChild(grupo);
        }
        var canal = nomeCanalJogo(j);
        var row = document.createElement("div");
        row.className = "jogo-hoje-item";
        var times = document.createElement("div");
        times.className = "jogo-hoje-times";
        [j.casa, j.fora].forEach(function (nome, lado) {
          if (lado === 1) {
            var vs = document.createElement("div");
            vs.className = "jogo-hoje-x";
            vs.textContent = "×";
            times.appendChild(vs);
          }
          var time = document.createElement("div");
          time.className = "jogo-hoje-time";
          time.appendChild(escudoPartida(nome, lado === 0 ? j.casaLogo : j.foraLogo));
          var nm = document.createElement("div");
          nm.className = "jogo-hoje-nome";
          nm.textContent = nome || "";
          time.appendChild(nm);
          times.appendChild(time);
        });
        var info = document.createElement("div");
        info.className = "jogo-hoje-info";
        var estado = document.createElement("span");
        estado.className = "jogo-hoje-estado " + (vivo ? "vivo" : futuro ? "breve" : "");
        estado.textContent = vivo ? "AO VIVO" : futuro ? "EM BREVE" : quando;
        info.appendChild(estado);
        var resto = [vivo ? quando : "", j.liga, canal].filter(Boolean).join(" · ");
        var fora = j.canal ? "" : canal ? " · canal fora da lista" : "";
        if (resto || fora) info.appendChild(document.createTextNode((resto ? " · " + resto : "") + fora));
        row.appendChild(times);
        row.appendChild(info);
        row.addEventListener("click", function () {
          jogosHojeIndex = i;
          abrirJogo(j);
        });
        jogosHojeList.appendChild(row);
      });
      if (jogosHojeIndex >= homeJogosHoje.length) jogosHojeIndex = 0;
      setFocus(itensJogosHoje()[jogosHojeIndex]);
    }
    function openJogosHoje() {
      if (!homeJogosHoje.length || !jogosHojeScreen) return;
      currentScreen = "jogoshoje";
      showScreen("jogoshoje");
      jogosHojeIndex = 0;
      renderJogosHoje();
    }
    function activateHook() {
      openJogosHoje();
    }
    function activateHomeItem() {
      return _activateHomeItem.apply(this, arguments);
    }
    function _activateHomeItem() {
      _activateHomeItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var item, j, colecao;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              item = homeItem();
              if (item) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              if (!(item.type === "jogo" && item.jogo)) {
                _context0.n = 2;
                break;
              }
              j = item.jogo;
              returnScreen = "home";
              if (j.canal) {
                launchPlayer({
                  name: j.canal.name,
                  category: j.liga || "Esporte",
                  logo: j.canal.logo,
                  isLive: true,
                  sources: j.canal.sources
                }, j.canal, null);
              } else openEvents();
              return _context0.a(2);
            case 2:
              telaAcervo = "home";
              returnScreen = "home";
              if (!(item.type === "channel" || item.isLive)) {
                _context0.n = 3;
                break;
              }
              launchPlayer({
                name: item.name,
                category: item.category,
                logo: item.logo,
                isLive: true,
                sources: item.sources
              }, item, null);
              return _context0.a(2);
            case 3:
              colecao = item.marca === "a" || item.marca === "d" || item.kind === "anime" || item.kind === "dorama";
              if (!colecao) {
                _context0.n = 5;
                break;
              }
              _context0.n = 4;
              return enrichItem(item);
            case 4:
              _context0.n = 5;
              return ligarColecao(item);
            case 5:
              if (item.type === "movie") openInfoPanel(item);else if (item.type === "series") openSeriesScreen(item);
            case 6:
              return _context0.a(2);
          }
        }, _callee0);
      }));
      return _activateHomeItem.apply(this, arguments);
    }
    function activateExplore() {
      var chip = exploreChips[exploreIndex];
      if (!chip) return;
      var sec = chip.dataset.section;
      if (sec === "buscar") openSearch();else if (sec === "home") return;else if (sec === "eventos") openEvents();else if (sec === "radios") openRadios();else if (sec === "guia") openGuide();else if (sec === "ondemand" || sec === "favoritos" || sec === "filmes" || sec === "series") openBrowse(sec);else enterSection(sec);
    }
    function returnToHome(resetTop) {
      telaAcervo = "home";
      gradeAz = false;
      currentScreen = "home";
      showScreen("home");
      refreshHomeDynamic();
      if (homeMenuOpen) closeHomeMenu(resetTop ? "explore" : homeMenuReturnZone);
      if (resetTop) homeZone = "explore";
      updateHomeFocus();
    }
    function checkResumeBanner(section) {
      if (!resumeBanner) return;
      if (section !== "filmes" && section !== "series") {
        resumeBanner.classList.add("hidden");
        return;
      }
      var last = getLastWatched();
      if (historicoResumivel(last)) {
        resumeTitle.textContent = last.name;
        resumeTime.textContent = "Parou em " + player.formatTime(last.currentTime) + " de " + player.formatTime(last.duration);
        resumeBanner.classList.remove("hidden");
      } else resumeBanner.classList.add("hidden");
    }
    function fmtNum(n) {
      try {
        return Number(n).toLocaleString("pt-BR");
      } catch (e) {
        return String(n);
      }
    }
    function letraItem(it) {
      var l = String(it && it.letter || "").trim();
      if (l === "#") return "#";
      if (/^[A-Za-z]$/.test(l)) return l.toUpperCase();
      var ch = String(it && (it.title || it.name) || "").replace(/^[^0-9A-Za-z]+/, "").charAt(0).toUpperCase();
      return /[A-Z]/.test(ch) ? ch : "#";
    }
    function cartaoAcao(titulo, subtitulo, acao, secao, genero, extra) {
      extra = extra || {};
      return {
        type: "acao",
        title: titulo,
        subtitulo: subtitulo || "",
        acao: acao,
        secao: secao,
        genero: genero || "",
        filtroTipo: extra.filtroTipo || "",
        filtroValor: extra.filtroValor || extra.combo || extra.decada || "",
        combo: extra.combo || null,
        decada: extra.decada || 0,
        wide: acao !== "genero" && acao !== "decada" && acao !== "combo"
      };
    }
    function contagemSecao(secao) {
      if (xtreamEstaLigado() && window.SaimoXtream) {
        var mapa = secao === "filmes" && SaimoXtream.mapaFilmes ? SaimoXtream.mapaFilmes() : secao === "series" && SaimoXtream.mapaSeries ? SaimoXtream.mapaSeries() : null;
        if (mapa) {
          var nx = 0;
          var kx;
          for (kx in mapa) {
            if (!Object.prototype.hasOwnProperty.call(mapa, kx)) continue;
            if (secao === "series" && itemPareceAnime(mapa[kx])) continue;
            nx++;
          }
          if (nx) return nx;
        }
        if (secao === "animes" || secao === "doramas") {
          var col = listarXtreamColecao(secao);
          if (col.length && !(colecaoCache[secao] && colecaoCache[secao].length)) return col.length;
        }
      }
      if (secao === "animes") {
        if (colecaoCache.animes && colecaoCache.animes.length) return colecaoCache.animes.length;
      }
      if (usarCatalogoLazy() && window.SaimoCatalogo) {
        if (secao === "filmes") {
          var nf = SaimoCatalogo.contagemSecao("filmes");
          if (nf) return nf;
        }
        if (secao === "series") {
          var ns = SaimoCatalogo.contagemSecao("series");
          if (ns) return qtdSeriesSemAnime(ns);
        }
      }
      if (secao === "filmes") return catalogItems(filmesRows).length;
      if (secao === "series") return itensSerieSemAnime(catalogItems(seriesRows)).length;
      if (secao === "animes" && colecaoCache.animes) return colecaoCache.animes.length;
      if (secao === "doramas" && colecaoCache.doramas) return colecaoCache.doramas.length;
      return 0;
    }
    function candidatosDe(isSeries, limite) {
      if (!cacheCandidatos) cacheCandidatos = {
        f: null,
        s: null
      };
      var k = isSeries ? "s" : "f";
      if (cacheCandidatos[k] && !limite) {
        return isSeries ? cacheCandidatos[k].filter(function (c) {
          return c && c.card && !itemPareceAnime(c.card);
        }) : cacheCandidatos[k];
      }
      var lista = [];
      var max = limite || 0;
      var n = 0;
      catalogItems(isSeries ? seriesRows : filmesRows).forEach(function (it) {
        if (isSeries && itemPareceAnime(it)) return;
        if (max && n >= max) return;
        n++;
        var capa = it.posterUrl || "";
        if (!capa && window.SaimoFicha && SaimoFicha.capaDe) {
          capa = SaimoFicha.capaDe(it.title, isSeries) || "";
        }
        if (!capa) return;
        var gens = (window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title, isSeries) : []).map(nomeGenero);
        lista.push({
          ano: anoDeItem(it),
          generos: gens,
          card: Object.assign({}, it, {
            posterUrl: capa,
            type: isSeries ? "series" : "movie"
          })
        });
      });
      if (!limite) cacheCandidatos[k] = lista;
      return lista;
    }
    function candidatosColecao(itens) {
      var lista = [];
      (itens || []).forEach(function (it) {
        var capa = window.SaimoFicha && SaimoFicha.capaDe ? SaimoFicha.capaDe(it.title, true) || it.posterUrl || "" : it.posterUrl || "";
        if (!capa) return;
        var gens = (window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title, true) : []).map(function (g) {
          return nomeGenero(g, true);
        });
        lista.push({
          ano: anoDeItem(it),
          generos: gens,
          card: Object.assign({}, it, {
            posterUrl: capa,
            type: "series"
          })
        });
      });
      return lista;
    }
    function tituloFileiraGenero(secao, genero) {
      var g = genero.toLowerCase();
      if (secao === "filmes") return "Filmes de " + g;
      if (secao === "series") return "Séries de " + g;
      return genero;
    }
    function fileiraPorMarca(filas, marca, titulo) {
      var acc = [];
      filas.forEach(function (f) {
        mapDestRow((f.items || []).filter(function (it) {
          return (it.marca || "f") === marca;
        })).forEach(function (x) {
          return acc.push(x);
        });
      });
      var visto = {};
      var uniq = [];
      acc.forEach(function (it) {
        var t = it.title || "";
        if (!t || visto[t]) return;
        visto[t] = 1;
        uniq.push(it);
      });
      if (uniq.length < 4) return null;
      return {
        title: titulo,
        items: uniq.slice(0, 40),
        wide: false
      };
    }
    function fileirasGenero(cands, secao, soEstes) {
      var presentes = {};
      cands.forEach(function (c) {
        return (c.generos || []).forEach(function (g) {
          if (g) presentes[g] = 1;
        });
      });
      var lista = soEstes ? soEstes.filter(function (g) {
        return presentes[g];
      }) : Object.keys(presentes);
      lista.sort(function (a, b) {
        return posicaoGenero(a) - posicaoGenero(b) || a.localeCompare(b, "pt-BR");
      });
      var rows = [];
      lista.forEach(function (genero) {
        var doGenero = cands.filter(function (c) {
          return c.generos.indexOf(genero) >= 0;
        }).sort(function (a, b) {
          return b.ano - a.ano || String(a.card.title).localeCompare(String(b.card.title), "pt-BR");
        }).slice(0, FILEIRA_CAPAS);
        if (doGenero.length < FILEIRA_CAPAS) return;
        var items = doGenero.map(function (c) {
          return c.card;
        });
        items.push(cartaoAcao("Todos de " + genero + " ›", "", "genero", secao, genero));
        rows.push({
          title: tituloFileiraGenero(secao, genero),
          items: items,
          wide: false
        });
      });
      return rows;
    }
    function fileiraDeRecs(titulo, recs, isSeries, acao, secao, extra) {
      extra = extra || {};
      var cards = cardsDaFicha(recs, isSeries, FILEIRA_CAPAS);
      if (cards.length < FILEIRA_CAPAS) return null;
      cards.push(cartaoAcao("Ver todos ›", "", acao, secao, extra.genero || "", extra));
      return {
        title: titulo,
        items: cards,
        wide: false
      };
    }
    function fileirasLevesFicha(secao) {
      var isSeries = secao === "series";
      var rows = [];
      if (!window.SaimoFicha || !SaimoFicha.listarPorGenero) return rows;
      var ordem = isSeries ? GENERO_SERIES : GENERO_FILMES;
      ordem.forEach(function (genero) {
        if (isSeries && genero === "Animação") return;
        var recs = SaimoFicha.listarPorGenero(isSeries, genero, FILEIRA_CAPAS, true);
        if (isSeries) recs = recsSerieSemAnime(recs);
        var row = fileiraDeRecs(tituloFileiraGenero(secao, genero), recs, isSeries, "genero", secao, {
          genero: genero
        });
        if (row) rows.push(row);
      });
      return rows;
    }
    function fileirasDecada(secao) {
      var isSeries = secao === "series";
      var rows = [];
      if (!window.SaimoFicha || !SaimoFicha.listarPorDecada) return rows;
      DECADA_DEFS.forEach(function (d) {
        var recs = SaimoFicha.listarPorDecada(isSeries, d.faixa, FILEIRA_CAPAS, true);
        var row = fileiraDeRecs(d.nome, recs, isSeries, "decada", secao, {
          decada: d.faixa
        });
        if (row) rows.push(row);
      });
      return rows;
    }
    function fileirasCombo(secao) {
      var isSeries = secao === "series";
      var rows = [];
      if (!window.SaimoFicha || !SaimoFicha.listarCombo) return rows;
      COMBO_DEFS.forEach(function (c) {
        var recs = SaimoFicha.listarCombo(isSeries, c.gens, FILEIRA_CAPAS, true);
        var row = fileiraDeRecs(c.nome, recs, isSeries, "combo", secao, {
          combo: c.gens
        });
        if (row) rows.push(row);
      });
      return rows;
    }
    function fileiraMaratona(filas) {
      var acc = [];
      (filas || []).forEach(function (f) {
        mapDestRow((f.items || []).filter(function (it) {
          var m = it.marca || "f";
          return m === "a" || m === "d" || /cole[cç][aã]o|saga/i.test(f.title || "");
        })).forEach(function (x) {
          return acc.push(x);
        });
      });
      var visto = {};
      var uniq = [];
      acc.forEach(function (it) {
        var t = it.title || "";
        if (!t || visto[t]) return;
        visto[t] = 1;
        uniq.push(it);
      });
      if (uniq.length < FILEIRA_CAPAS) return null;
      var items = uniq.slice(0, FILEIRA_CAPAS);
      items.push(cartaoAcao("Ver animes ›", "", "secao", "animes", ""));
      return {
        title: "Maratona de fim de semana",
        items: items,
        wide: false
      };
    }
    function recentWatchedItems() {
      var map = getProgressMap();
      var out = [];
      Object.keys(map).forEach(function (k) {
        var p = map[k];
        if (!p) return;
        var title = "";
        var type = "movie";
        if (k.indexOf("f:") === 0) {
          title = k.slice(2);
          type = "movie";
        } else if (k.indexOf("s:") === 0) {
          title = k.slice(2).split("|")[0];
          type = "series";
        } else return;
        var vod = lookupVod(title, type);
        var card = vod ? cardDoAcervo(vod, type === "series") : cardDoAcervo({
          type: type,
          title: title
        }, type === "series");
        out.push({
          item: card,
          ts: p.timestamp || 0
        });
      });
      out.sort(function (a, b) {
        return b.ts - a.ts;
      });
      var visto = {};
      var items = [];
      out.forEach(function (x) {
        var t = x.item && (x.item.title || x.item.name) || "";
        if (!t || visto[t]) return;
        visto[t] = 1;
        items.push(x.item);
      });
      return items.slice(0, 16);
    }
    function porqueAssistiuItems(limite) {
      var last = getLastWatched();
      if (!last || !last.name || !window.SaimoFicha || !SaimoFicha.listarCombo) return {
        titulo: "",
        items: []
      };
      var isSeries = !!(last.seriesItem || last.section === "series");
      var gens = (SaimoFicha.generosDe(last.name, isSeries) || []).map(function (g) {
        return nomeGenero(g, isSeries);
      }).filter(Boolean);
      if (!gens.length) return {
        titulo: "",
        items: []
      };
      var recs = SaimoFicha.listarCombo(isSeries, gens, (limite || 12) + 4, true).filter(function (r) {
        return fold(r.titulo) !== fold(last.name) && fold(SaimoFicha.semAno(r.titulo)) !== fold(stripYear(last.name));
      });
      var y = parseInt(String(last.name).match(/\((\d{4})\)\s*$/) && String(last.name).match(/\((\d{4})\)\s*$/)[1], 10) || 0;
      if (y) {
        recs.sort(function (a, b) {
          var da = Math.abs((a.ano || 0) - y);
          var db = Math.abs((b.ano || 0) - y);
          return da - db || (b.ano || 0) - (a.ano || 0);
        });
      }
      return {
        titulo: "Porque você assistiu " + stripYear(last.name),
        items: cardsDaFicha(recs, isSeries, limite || 12)
      };
    }
    function filasDoVodEmbutido() {
      var filas = [];
      var pushSecao = function pushSecao(titulo, arr, marca) {
        var items = (arr || []).map(function (it) {
          return Object.assign({}, it, {
            marca: it.marca || marca,
            type: it.type || (marca === "s" ? "series" : "movie")
          });
        });
        if (items.length >= 4) filas.push({
          title: titulo,
          items: items
        });
      };
      pushSecao("Em alta", filmesRows["Em alta"], "f");
      pushSecao("Séries em alta", seriesRows["Em alta"] || seriesRows["Séries em alta"], "s");
      Object.keys(filmesRows).forEach(function (k) {
        if (isLetraCat(k) || k === "Em alta") return;
        if (/série|series|anime|dorama/i.test(k)) return;
        pushSecao(k, filmesRows[k], "f");
      });
      Object.keys(seriesRows).forEach(function (k) {
        if (isLetraCat(k) || /em alta/i.test(k)) return;
        pushSecao(k, seriesRows[k], "s");
      });
      return filas;
    }
    function destaquesFilas() {
      return _destaquesFilas.apply(this, arguments);
    }
    function _destaquesFilas() {
      _destaquesFilas = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var filas, _t8, _t9, _t0;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              filas = [];
              if (!(window.SaimoAPI && SaimoAPI.loadVodDestaques)) {
                _context1.n = 5;
                break;
              }
              _context1.p = 1;
              _context1.n = 2;
              return SaimoAPI.loadVodDestaques();
            case 2:
              _t8 = _context1.v.filas;
              if (_t8) {
                _context1.n = 3;
                break;
              }
              _t8 = [];
            case 3:
              filas = _t8;
              _context1.n = 5;
              break;
            case 4:
              _context1.p = 4;
              _t9 = _context1.v;
            case 5:
              if (window.SaimoXtream && SaimoXtream.fileirasHome && SaimoXtream.ligado && SaimoXtream.ligado()) {
                filas = (SaimoXtream.fileirasHome() || []).concat(filas);
              }
              if (!filas.length && window.SaimoOficial && SaimoOficial.catalogoSaimoLigado()) filas = filasDoVodEmbutido();
              else if (!filas.length && !window.SaimoOficial) filas = filasDoVodEmbutido();
              if (!(window.SaimoFicha && SaimoFicha.ensureIndex)) {
                _context1.n = 9;
                break;
              }
              _context1.p = 6;
              _context1.n = 7;
              return SaimoFicha.ensureIndex();
            case 7:
              _context1.n = 9;
              break;
            case 8:
              _context1.p = 8;
              _t0 = _context1.v;
            case 9:
              return _context1.a(2, filas);
          }
        }, _callee1, null, [[6, 8], [1, 4]]);
      }));
      return _destaquesFilas.apply(this, arguments);
    }
    function fileirasGeneroDeCats(_x7) {
      return _fileirasGeneroDeCats.apply(this, arguments);
    }
    function _fileirasGeneroDeCats() {
      _fileirasGeneroDeCats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(kind) {
        var cats, secao, rows;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              _context10.n = 1;
              return ensureVodCategories();
            case 1:
              secao = kind === "filmes" ? "filmes" : "series";
              rows = fileirasLevesFicha(secao);
              return _context10.a(2, rows);
          }
        }, _callee10);
      }));
      return _fileirasGeneroDeCats.apply(this, arguments);
    }
    function marcarColecaoItem(it, tipo) {
      if (!it) return it;
      it.type = it.type === "movie" ? "movie" : "series";
      it.kind = tipo === "animes" ? "anime" : "dorama";
      it.marca = tipo === "animes" ? "a" : "d";
      it.colecao = tipo;
      return it;
    }
    function mesclarColecao(tipo, extra) {
      var out = colecaoCache[tipo] ? colecaoCache[tipo].slice() : [];
      var visto = Object.create(null);
      var i, it, k, pos;
      for (i = 0; i < out.length; i++) {
        k = fold((out[i] && (out[i].title || out[i].name)) || "");
        if (k) visto[k] = i;
      }
      for (i = 0; i < (extra || []).length; i++) {
        it = extra[i];
        if (!it) continue;
        k = fold(it.title || it.name || "");
        if (!k) continue;
        marcarColecaoItem(it, tipo);
        pos = visto[k];
        if (pos == null) {
          visto[k] = out.length;
          out.push(it);
        } else if (it.episodes && it.episodes.length && !(out[pos].episodes && out[pos].episodes.length)) {
          out[pos] = it;
        } else if (!out[pos].posterUrl && it.posterUrl) {
          out[pos].posterUrl = it.posterUrl;
        }
      }
      colecaoCache[tipo] = out;
      return out;
    }
    function itemPareceAnime(it) {
      if (!it) return false;
      if (it.colecao === "animes" || it.kind === "anime" || it.marca === "a" || it.type === "anime") return true;
      var t = String(it.title || it.name || "") + " " + String(it.category || "");
      if (/anime/i.test(t)) return true;
      var gens = window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title || it.name, true) : [];
      var i;
      for (i = 0; i < gens.length; i++) {
        if (nomeGenero(gens[i], true) === "Animação") return true;
      }
      return false;
    }
    function recPareceAnime(rec) {
      if (!rec) return false;
      if (/anime/i.test(rec.titulo || rec.title || "")) return true;
      var gens = rec.generos || [];
      var i;
      for (i = 0; i < gens.length; i++) {
        if (nomeGenero(gens[i], true) === "Animação") return true;
      }
      return false;
    }
    function recsSerieSemAnime(recs) {
      return (recs || []).filter(function (rec) {
        return !recPareceAnime(rec);
      });
    }
    function itensSerieSemAnime(lista) {
      return (lista || []).filter(function (it) {
        if (!it || it.type === "acao" || it.type === "movie" || it.type === "channel") return true;
        return !itemPareceAnime(it);
      });
    }
    function qtdSeriesSemAnime(total) {
      var n = Number(total) || 0;
      var na = 0;
      if (colecaoCache.animes && colecaoCache.animes.length) na = colecaoCache.animes.length;
      else if (window.SaimoFicha && SaimoFicha.loaded && SaimoFicha.listarPorGenero) na = SaimoFicha.listarPorGenero(true, "Animação", 0, false).length;
      if (na > 0 && n > na) return n - na;
      return n;
    }
    function itensAnimeDasFichas() {
      var out = [];
      var visto = Object.create(null);
      var add = function add(it) {
        if (!it || !it.title) return;
        var k = fold(it.title);
        if (!k || visto[k]) return;
        visto[k] = 1;
        marcarColecaoItem(it, "animes");
        if (!itemTemPlay(it, "animes")) return;
        out.push(it);
      };
      if (window.SaimoFicha && SaimoFicha.loaded && SaimoFicha.listarPorGenero) {
        var recs = SaimoFicha.listarPorGenero(true, "Animação", 0, false) || [];
        recs.forEach(function (rec) {
          add(SaimoFicha.cardDeRec(rec, true));
        });
        (SaimoFicha.recsDe(true) || []).forEach(function (rec) {
          if (!rec || !/anime/i.test(rec.titulo || "")) return;
          add(SaimoFicha.cardDeRec(rec, true));
        });
      }
      if (window.SaimoXtream && SaimoXtream.mapaSeries) {
        var mapa = SaimoXtream.mapaSeries() || {};
        var k;
        for (k in mapa) {
          if (Object.prototype.hasOwnProperty.call(mapa, k) && itemPareceAnime(mapa[k])) add(Object.assign({}, mapa[k]));
        }
      }
      return out;
    }
    function colherColecaoLocal(tipo) {
      if (tipo === "animes") mesclarColecao("animes", itensAnimeDasFichas());
      mesclarColecao(tipo, listarXtreamColecao(tipo));
      if (colecaoCache[tipo] && colecaoCache[tipo].length) {
        colecaoCache[tipo] = colecaoCache[tipo].filter(function (it) {
          return itemTemPlay(it, tipo);
        });
      }
      return colecaoCache[tipo] || [];
    }
    function garantirColecao(_x8) {
      return _garantirColecao.apply(this, arguments);
    }
    function _garantirColecao() {
      _garantirColecao = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(tipo) {
        var _t1;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              if (!(colecaoOk[tipo] && colecaoCache[tipo] && colecaoCache[tipo].length)) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2, colecaoCache[tipo]);
            case 1:
              colherColecaoLocal(tipo);
              if (tipo === "animes" && colecaoCache.animes && colecaoCache.animes.length && window.SaimoFicha && SaimoFicha.loaded) {
                colecaoOk.animes = true;
                if (window.SaimoAPI && SaimoAPI.loadColecao) {
                  SaimoAPI.loadColecao("animes").then(function (lista) {
                    mesclarColecao("animes", lista);
                  }).catch(function () {});
                }
                return _context11.a(2, colecaoCache.animes);
              }
              if (!(!window.SaimoAPI || !SaimoAPI.loadColecao)) {
                _context11.n = 2;
                break;
              }
              if (tipo !== "animes" || window.SaimoFicha && SaimoFicha.loaded) colecaoOk[tipo] = true;
              return _context11.a(2, colecaoCache[tipo] || []);
            case 2:
              _context11.p = 2;
              _context11.n = 3;
              return SaimoAPI.loadColecao(tipo);
            case 3:
              mesclarColecao(tipo, _context11.v);
              _context11.n = 5;
              break;
            case 4:
              _context11.p = 4;
              _t1 = _context11.v;
            case 5:
              colherColecaoLocal(tipo);
              if (tipo !== "animes" || window.SaimoFicha && SaimoFicha.loaded) colecaoOk[tipo] = true;
              return _context11.a(2, colecaoCache[tipo] || []);
          }
        }, _callee11, null, [[2, 4]]);
      }));
      return _garantirColecao.apply(this, arguments);
    }
    function ligarColecao(_x9) {
      return _ligarColecao.apply(this, arguments);
    }
    function _ligarColecao() {
      _ligarColecao = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(item) {
        var marca, tipo, lista, hit;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              if (item) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, item);
            case 1:
              marca = item.marca || (item.kind === "anime" ? "a" : item.kind === "dorama" ? "d" : "");
              if (!(marca !== "a" && marca !== "d")) {
                _context12.n = 2;
                break;
              }
              return _context12.a(2, item);
            case 2:
              tipo = marca === "a" ? "animes" : "doramas";
              _context12.n = 3;
              return garantirColecao(tipo);
            case 3:
              lista = _context12.v;
              hit = lista.find(function (s) {
                return fold(s.title) === fold(item.title) || fold(s.title) === fold(stripYear(item.title));
              });
              if (hit) {
                _context12.n = 4;
                break;
              }
              return _context12.a(2, item);
            case 4:
              item.episodes = hit.episodes;
              item.type = "series";
              item.kind = hit.kind;
              item.marca = marca;
              if (!item.year) item.year = hit.year;
              if (!item.posterUrl && window.SaimoFicha && SaimoFicha.capaDe) item.posterUrl = SaimoFicha.capaDe(item.title, true) || "";
              return _context12.a(2, item);
          }
        }, _callee12);
      }));
      return _ligarColecao.apply(this, arguments);
    }
    function montarFavoritos() {
      var filmes = [];
      var series = [];
      var canais = [];
      getFavorites().forEach(function (n) {
        var m = lookupVod(n, "movie");
        if (m) {
          filmes.push(cardDoAcervo(m, false));
          return;
        }
        var s = lookupVod(n, "series");
        if (s) {
          series.push(cardDoAcervo(s, true));
          return;
        }
        var ch = canalPorNome(n);
        if (ch) canais.push(Object.assign({
          type: "channel",
          title: ch.name
        }, ch));
      });
      var rows = [];
      if (canais.length) rows.push({
        title: "Canais",
        items: canais,
        wide: true
      });
      if (filmes.length) rows.push({
        title: "Filmes",
        items: filmes,
        wide: false
      });
      if (series.length) rows.push({
        title: "Séries",
        items: series,
        wide: false
      });
      return rows;
    }
    function montarBrowse(_x0) {
      return _montarBrowse.apply(this, arguments);
    }
    function _montarBrowse() {
      _montarBrowse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(kind) {
        var filas, rows, cards, _cont, fa, fd, marca, cont, titulosJa, pushRowBrowse, secRows, extra, cands, _t10;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (!(kind === "favoritos")) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, montarFavoritos());
            case 1:
              _context13.n = 2;
              return destaquesFilas();
            case 2:
              filas = _context13.v;
              rows = [];
              if (!(kind === "ondemand")) {
                _context13.n = 4;
                break;
              }
              _context13.n = 3;
              return Promise.all([garantirColecao("animes"), garantirColecao("doramas")]);
            case 3:
              cards = ["filmes", "series", "animes", "doramas"].map(function (s) {
                var nome = {
                  filmes: "Filmes",
                  series: "Séries",
                  animes: "Animes",
                  doramas: "Doramas"
                }[s];
                var n = contagemSecao(s);
                return cartaoAcao(nome, n ? fmtNum(n) + " títulos" : "", "secao", s, "");
              });
              rows.push({
                title: "Categorias",
                items: cards,
                wide: true
              });
              _cont = continueItems();
              if (_cont.length) rows.push({
                title: "Continue assistindo",
                items: _cont,
                wide: false
              });
              filas.forEach(function (f) {
                var items = mapDestRow(f.items || []);
                if (items.length >= 4) rows.push({
                  title: f.title,
                  items: items.slice(0, 12),
                  wide: false
                });
              });
              (function () {
                var pq = porqueAssistiuItems(FILEIRA_CAPAS);
                if (pq.items.length >= FILEIRA_CAPAS) rows.push({
                  title: pq.titulo,
                  items: pq.items,
                  wide: false
                });
                var rec = recentWatchedItems();
                if (rec.length >= 2) rows.push({
                  title: "Assistidos recentemente",
                  items: rec.slice(0, 12),
                  wide: false
                });
                var mar = fileiraMaratona(filas);
                if (mar) rows.push(mar);
              })();
              fa = fileiraPorMarca(filas, "a", "Animes");
              fd = fileiraPorMarca(filas, "d", "Doramas");
              if (fa) rows.push(fa);
              if (fd) rows.push(fd);
              return _context13.a(2, rows);
            case 4:
              marca = kind === "series" ? "s" : kind === "animes" ? "a" : kind === "doramas" ? "d" : "f";
              cont = continueItems().filter(function (it) {
                if (kind === "filmes") return it.type === "movie";
                if (kind === "series") return it.type === "series" && !itemPareceAnime(it);
                return true;
              });
              if (cont.length && kind !== "animes" && kind !== "doramas") {
                rows.push({
                  title: "Continue assistindo",
                  items: cont,
                  wide: false
                });
              }
              titulosJa = {};
              pushRowBrowse = function pushRowBrowse(titulo, items) {
                if (!items || items.length < 4 || titulosJa[titulo]) return;
                titulosJa[titulo] = 1;
                rows.push({
                  title: titulo,
                  items: items.slice(0, 40),
                  wide: false
                });
              };
              filas.forEach(function (f) {
                var items = mapDestRow((f.items || []).filter(function (it) {
                  return (it.marca || "f") === marca;
                }));
                if (kind === "series") items = itensSerieSemAnime(items);
                pushRowBrowse(f.title, items);
              });
              if (!(kind === "filmes" || kind === "series")) {
                _context13.n = 6;
                break;
              }
              secRows = kind === "filmes" ? filmesRows : seriesRows;
              Object.keys(secRows).forEach(function (sec) {
                if (isLetraCat(sec)) return;
                if (kind === "filmes" && /série|series|anime|dorama/i.test(sec)) return;
                if (kind === "series" && /anime/i.test(sec)) return;
                var rowItems = mapDestRow(secRows[sec]);
                if (kind === "series") rowItems = itensSerieSemAnime(rowItems);
                pushRowBrowse(sec, rowItems);
              });
              _context13.n = 5;
              return fileirasGeneroDeCats(kind);
            case 5:
              extra = _context13.v;
              extra.forEach(function (r) {
                if (titulosJa[r.title]) return;
                titulosJa[r.title] = 1;
                rows.push(r);
              });
              (function () {
                var pq = porqueAssistiuItems(FILEIRA_CAPAS);
                if (pq.items.length >= FILEIRA_CAPAS && !titulosJa[pq.titulo]) {
                  titulosJa[pq.titulo] = 1;
                  rows.push({
                    title: pq.titulo,
                    items: pq.items,
                    wide: false
                  });
                }
                var rec = recentWatchedItems().filter(function (it) {
                  return kind === "filmes" ? it.type === "movie" : it.type === "series";
                });
                if (rec.length >= 2 && !titulosJa["Assistidos recentemente"]) {
                  titulosJa["Assistidos recentemente"] = 1;
                  rows.push({
                    title: "Assistidos recentemente",
                    items: rec.slice(0, 12),
                    wide: false
                  });
                }
              })();
              return _context13.a(2, rows);
            case 6:
              _t10 = candidatosColecao;
              _context13.n = 7;
              return garantirColecao(kind);
            case 7:
              cands = _t10(_context13.v);
              fileirasGenero(cands, kind, null).forEach(function (r) {
                return rows.push(r);
              });
              return _context13.a(2, rows);
          }
        }, _callee13);
      }));
      return _montarBrowse.apply(this, arguments);
    }
    function modoHub() {
      return browseKind === "ondemand";
    }
    function modoPrateleira() {
      return browseKind === "filmes" || browseKind === "series" || browseKind === "animes" || browseKind === "doramas";
    }
    function aplicarModoBrowse() {
      var hub = modoHub();
      var prat = modoPrateleira();
      if (browseHub) browseHub.classList.toggle("hidden", !hub);
      if (browseShelf) browseShelf.classList.toggle("hidden", !prat);
      if (browseRowsEl) browseRowsEl.classList.toggle("hidden", hub || prat);
      if (browseToolbar) browseToolbar.classList.add("hidden");
    }
    function svgSecao(secao) {
      var cor = secao === "filmes" || secao === "animes" ? "#0a0d14" : "#fff";
      if (secao === "filmes") {
        return '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="' + cor + '" d="M3 5h2.2l1.6 2.4h2.3L7.5 5h2.2l1.6 2.4h2.4L12.1 5h2.2l1.6 2.4H21v11.2A1.4 1.4 0 0 1 19.6 20H4.4A1.4 1.4 0 0 1 3 18.6V5zm1.8 5.2v7.2h14.4v-7.2H4.8z"/></svg>';
      }
      if (secao === "series") {
        return '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="' + cor + '" d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v9A1.5 1.5 0 0 1 19.5 17h-15A1.5 1.5 0 0 1 3 15.5v-9zM8 20.5h8v-1.6H8v1.6z"/></svg>';
      }
      if (secao === "animes") {
        return '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="' + cor + '" d="M12 2.8l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.2 6.8 18.7l1.2-5.8-4.4-4 5.9-.7z"/></svg>';
      }
      return '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="' + cor + '" d="M12 20.2s-6.6-4.1-6.6-8.6a3.8 3.8 0 0 1 6.6-2.5 3.8 3.8 0 0 1 6.6 2.5c0 4.5-6.6 8.6-6.6 8.6z"/></svg>';
    }
    function capasDaSecao(secao, n) {
      n = n || 4;
      var dest = cacheDestaques();
      var urls = [];
      var visto = Object.create(null);
      var marca = secao === "series" ? "s" : secao === "animes" ? "a" : secao === "doramas" ? "d" : "f";
      var add = function add(it, filaMarca) {
        if (!it || urls.length >= n) return;
        if ((it.marca || filaMarca || "") !== marca) return;
        if (secao === "series" && itemPareceAnime(it)) return;
        if (!itemTemPlay(it, secao)) return;
        var capa = it.posterUrl || "";
        if (!capa) return;
        if (window.SaimoCapas) capa = SaimoCapas.urlLeve(capa);
        if (visto[capa]) return;
        visto[capa] = 1;
        urls.push(capa);
      };
      var pred = secao === "filmes" ? /^em alta$/i : secao === "series" ? /s[eé]ries em alta/i : secao === "animes" ? /^animes$/i : /^doramas$/i;
      if (dest && dest.filas) {
        dest.filas.forEach(function (f) {
          if (urls.length >= n) return;
          if (pred.test(f.title || "")) {
            (f.items || []).forEach(function (it) {
              add(it, f.marca);
            });
          }
        });
        if (!urls.length) {
          dest.filas.forEach(function (f) {
            (f.items || []).forEach(function (it) {
              add(it, f.marca);
            });
          });
        }
      }
      if (urls.length < n && secao === "animes" && window.SaimoFicha && SaimoFicha.listarPorGenero) {
        (SaimoFicha.listarPorGenero(true, "Animação", 16, true) || []).forEach(function (rec) {
          add({
            title: rec.titulo,
            posterUrl: rec.capa,
            marca: "a"
          }, "a");
        });
      }
      if (urls.length < n && secao === "series" && window.SaimoFicha && SaimoFicha.recsDe) {
        (SaimoFicha.recsDe(true) || []).forEach(function (rec) {
          if (urls.length >= n || recPareceAnime(rec) || !rec.capa) return;
          add({
            title: rec.titulo,
            posterUrl: rec.capa,
            marca: "s"
          }, "s");
        });
      }
      if (urls.length < n && colecaoCache[secao]) {
        colecaoCache[secao].forEach(function (it) {
          add(it, marca);
        });
      }
      return urls;
    }
    function continueDaSecao(kind) {
      var base = continueItems().filter(function (it) {
        return it && it.type !== "channel";
      });
      if (kind === "filmes") return base.filter(function (it) {
        return it.type === "movie";
      });
      if (kind === "series") return base.filter(function (it) {
        return it.type === "series" && !itemPareceAnime(it);
      });
      var nomes = Object.create(null);
      (colecaoCache[kind] || []).forEach(function (it) {
        if (it && it.title) nomes[fold(it.title)] = 1;
      });
      return base.filter(function (it) {
        return nomes[fold(it.title || it.name || "")];
      });
    }
    function favoritosDaSecao(kind) {
      var out = [];
      getFavorites().forEach(function (n) {
        if (kind === "filmes") {
          var m = lookupVod(n, "movie");
          if (m) out.push(cardDoAcervo(m, false));
          return;
        }
        if (kind === "series") {
          var s = lookupVod(n, "series");
          if (s && !itemPareceAnime(s)) out.push(cardDoAcervo(s, true));
          return;
        }
        var lista = colecaoCache[kind] || [];
        var alvo = fold(n);
        var hit = lista.find(function (s) {
          return fold(s.title) === alvo;
        });
        if (hit) out.push(cardDoAcervo(hit, true));
      });
      return out;
    }
    function lancamentosDaSecao(kind) {
      var serie = kind !== "filmes";
      var teto = new Date().getFullYear() + 1;
      var all = [];
      if (kind === "filmes") all = catalogItems(filmesRows);else if (kind === "series") all = itensSerieSemAnime(catalogItems(seriesRows));else all = (colecaoCache[kind] || []).slice();
      all = (all || []).filter(function (it) {
        return itemTemPlay(it, kind);
      });
      if (!all.length) all = (titulosXtreamDaSecao(kind) || []).filter(function (it) {
        return itemTemPlay(it, kind);
      });
      var melhor = 0;
      var i;
      for (i = 0; i < all.length; i++) {
        var y = anoDeItem(all[i]);
        if (y >= 2000 && y <= teto && y > melhor) melhor = y;
      }
      var lista = [];
      if (melhor) {
        for (i = 0; i < all.length; i++) {
          var _y = anoDeItem(all[i]);
          if (_y >= melhor - 1 && _y <= teto) lista.push(all[i]);
        }
      }
      if (!lista.length) lista = all.slice();
      lista.sort(function (a, b) {
        return anoDeItem(b) - anoDeItem(a) || String(a.title || "").localeCompare(String(b.title || ""), "pt-BR");
      });
      return lista.slice(0, 48).map(function (it) {
        return cardDoAcervo(it, serie);
      });
    }
    function cacheDestaques() {
      return window.SaimoAPI && SaimoAPI._destaquesCache || null;
    }
    function nomeFilaDestaque(kind, pred, fallback) {
      var dest = cacheDestaques();
      var i, n;
      if (dest && dest.filas) {
        for (i = 0; i < dest.filas.length; i++) {
          n = dest.filas[i] && dest.filas[i].title || "";
          if (pred(n)) return n;
        }
      }
      var rows = dest && (kind === "series" ? dest.seriesRows : dest.filmesRows) || {};
      for (n in rows) {
        if (Object.prototype.hasOwnProperty.call(rows, n) && pred(n)) return n;
      }
      return fallback;
    }
    function cardsDestaqueSecao(kind, pred) {
      var dest = cacheDestaques();
      if (!dest || !((dest.filas && dest.filas.length) || Object.keys(dest.filmesRows || {}).length)) {
        var cats = kind === "series" ? seriesCats : filmesCats;
        var chave;
        for (chave in cats) {
          if (Object.prototype.hasOwnProperty.call(cats, chave) && pred(chave) && cats[chave].length) {
            return cats[chave].filter(function (it) {
              return itemTemPlay(it, kind);
            });
          }
        }
        if (cats["Em alta"] && cats["Em alta"].length) return cats["Em alta"].filter(function (it) {
          return itemTemPlay(it, kind);
        });
        if (cats["Seu Xtream"] && cats["Seu Xtream"].length) return cats["Seu Xtream"].filter(function (it) {
          return itemTemPlay(it, kind);
        });
        return titulosXtreamDaSecao(kind).filter(function (it) {
          return itemTemPlay(it, kind);
        }).slice(0, 48).map(function (it) {
          return cardDoAcervo(it, kind === "series");
        });
      }
      var isSeries = kind === "series";
      var out = [];
      var visto = Object.create(null);
      var add = function add(it) {
        if (!it || !it.title || visto[it.title]) return;
        if (kind === "filmes" && (it.marca === "s" || it.marca === "a" || it.marca === "d" || it.type === "series")) return;
        if (kind === "series" && (it.marca === "f" || it.type === "movie" || itemPareceAnime(it))) return;
        if (!itemTemPlay(it, kind)) return;
        visto[it.title] = 1;
        out.push(cardDoAcervo(it, isSeries));
      };
      if (dest.filas) {
        dest.filas.forEach(function (f) {
          if (!pred(f.title || "")) return;
          var marca = f.marca || "";
          if (kind === "filmes" && (marca === "s" || marca === "a" || marca === "d")) return;
          if (kind === "series" && marca === "f") return;
          (f.items || []).forEach(add);
        });
      }
      var rows = (kind === "series" ? dest.seriesRows : dest.filmesRows) || {};
      Object.keys(rows).forEach(function (n) {
        if (!pred(n)) return;
        (rows[n] || []).forEach(add);
      });
      if (out.length) return out;
      return titulosXtreamDaSecao(kind).filter(function (it) {
        return itemTemPlay(it, kind);
      }).slice(0, 48).map(function (it) {
        return cardDoAcervo(it, kind === "series");
      });
    }
    function itensDaDecada(kind, faixa) {
      var serie = kind !== "filmes";
      var all = kind === "filmes" ? catalogItems(filmesRows) : kind === "series" ? itensSerieSemAnime(catalogItems(seriesRows)) : colecaoCache[kind] || [];
      var out = [];
      var i;
      for (i = 0; i < all.length; i++) {
        if (itemNaDecada(all[i], faixa)) out.push(cardDoAcervo(all[i], serie));
      }
      return out;
    }
    function filhosGenero(kind) {
      var out = [];
      if (kind === "filmes" || kind === "series") {
        var isSeries = kind === "series";
        (isSeries ? GENERO_SERIES : GENERO_FILMES).forEach(function (nome) {
          if (isSeries && nome === "Animação") return;
          var recs = window.SaimoFicha && SaimoFicha.listarPorGenero ? SaimoFicha.listarPorGenero(isSeries, nome, 0, false) : [];
          if (isSeries) recs = recsSerieSemAnime(recs);
          recs = (recs || []).filter(function (rec) {
            return itemTemPlay({
              title: rec.titulo,
              type: isSeries ? "series" : "movie"
            }, kind);
          });
          if (!recs.length) return;
          out.push({
            id: "cat:" + nome,
            nome: nome,
            tipo: "lista",
            contagem: recs.length,
            recs: recs,
            isSeries: isSeries,
            items: null
          });
        });
        if (out.length) return out;
        var buckets = {};
        titulosXtreamDaSecao(kind).forEach(function (it) {
          if (!itemTemPlay(it, kind)) return;
          var gens = (window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title || it.name, isSeries) : []).map(function (g) {
            return nomeGenero(g, isSeries);
          });
          var card = cardDoAcervo(it, isSeries);
          gens.forEach(function (g) {
            if (!g) return;
            if (!buckets[g]) buckets[g] = [];
            buckets[g].push(card);
          });
        });
        (isSeries ? GENERO_SERIES : GENERO_FILMES).forEach(function (nome) {
          var items = buckets[nome];
          if (!items || items.length < 4) return;
          out.push({
            id: "cat:" + nome,
            nome: nome,
            tipo: "lista",
            contagem: items.length,
            items: items.slice(0, 80),
            isSeries: isSeries
          });
        });
        return out;
      }
      ordenarAbas(colecaoCats).forEach(function (nome) {
        if (/em alta/i.test(nome || "")) return;
        var items = (colecaoCats[nome] || []).slice();
        if (!items.length) return;
        out.push({
          id: "cat:" + nome,
          nome: nome,
          tipo: "lista",
          contagem: items.length,
          items: items
        });
      });
      return out;
    }
    function filhosDecada(kind) {
      return DECADA_DEFS.map(function (d) {
        return {
          id: "dec:" + d.faixa,
          nome: d.nome,
          tipo: "lista",
          lazy: "decada",
          faixa: String(d.faixa),
          kind: kind,
          contagem: "",
          items: null
        };
      });
    }
    function garantirItensLista(ent) {
      if (!ent) return ent;
      if (ent.lazy === "decada" && !ent.items) {
        ent.items = itensDaDecada(ent.kind || browseKind, ent.faixa);
        ent.contagem = ent.items.length;
      }
      return ent;
    }
    function listaMostrada() {
      return garantirItensLista(odListaExtra) || odSide[odListaIndex];
    }
    function acharFilhoPorId(id) {
      var i, j, ent, filhos;
      if (!id) return null;
      for (i = 0; i < odSide.length; i++) {
        ent = odSide[i];
        filhos = ent && ent.filhos || [];
        for (j = 0; j < filhos.length; j++) {
          if (filhos[j].id === id) return filhos[j];
        }
      }
      return null;
    }
    function montarPrateleira(kind) {
      var lado = [];
      var pushLista = function pushLista(id, nome, items) {
        if (!items || !items.length) return;
        lado.push({
          id: id,
          nome: nome,
          tipo: "lista",
          contagem: items.length,
          items: items
        });
      };
      var pushSub = function pushSub(id, nome, filhos) {
        if (!filhos || !filhos.length) return;
        lado.push({
          id: id,
          nome: nome,
          tipo: "submenu",
          contagem: filhos.length,
          filhos: filhos
        });
      };
      lado.push({
        id: "buscar",
        nome: "Pesquisar",
        tipo: "buscar",
        contagem: ""
      });
      pushLista("cont", "Continue assistindo", continueDaSecao(kind));
      var minha = favoritosDaSecao(kind);
      if (window.SaimoListas && SaimoListas.soltos) {
        var visto = Object.create(null);
        minha.forEach(function (it) {
          visto[fold(it.title || it.name || "")] = 1;
        });
        SaimoListas.soltos(function (titulo, tipo) {
          return !!(tipo === "movie" ? lookupVod(titulo, "movie") : lookupVod(titulo, "series"));
        }).forEach(function (it) {
          if (kind === "filmes" && it.type !== "movie") return;
          if (kind === "series" && (it.type !== "series" || itemPareceAnime(it))) return;
          if (kind !== "filmes" && kind !== "series") return;
          var k = fold(it.title || "");
          if (!k || visto[k]) return;
          visto[k] = 1;
          minha.push(cardDoAcervo(it, it.type === "series"));
        });
      }
      lado.push({
        id: "fav",
        nome: "Minha lista",
        tipo: "lista",
        contagem: minha.length,
        items: minha
      });
      var predLanc = function predLanc(n) {
        return kind === "series" ? /s[eé]ries novas|lan[cç]amentos/i.test(n) : /lan[cç]amentos/i.test(n);
      };
      var lancDest = cardsDestaqueSecao(kind, predLanc);
      var lanc = lancDest.length ? lancDest : lancamentosDaSecao(kind);
      lado.push({
        id: "lanc",
        nome: lancDest.length ? nomeFilaDestaque(kind, predLanc, "Lançamentos") : "Lançamentos",
        tipo: "lista",
        contagem: lanc.length,
        items: lanc
      });
      pushSub("generos", "Gêneros", filhosGenero(kind));
      if (kind !== "animes" && kind !== "doramas") {
        var predAlta = function predAlta(n) {
          return kind === "series" ? /em alta/i.test(n) : /^em alta$/i.test(n);
        };
        pushLista("alta", nomeFilaDestaque(kind, predAlta, "Em alta"), cardsDestaqueSecao(kind, predAlta));
      }
      lado.push({
        id: "az",
        nome: "A–Z",
        tipo: "az",
        contagem: contagemSecao(kind)
      });
      return lado;
    }
    function listaTemItens(ent) {
      if (!ent) return false;
      if (ent.tipo === "submenu") return !!(ent.filhos && ent.filhos.length);
      if (ent.tipo !== "lista") return false;
      if (ent.lazy === "decada") return true;
      if (ent.recs && ent.recs.length) return true;
      return !!(ent.items && ent.items.length);
    }
    function indiceListaInicial() {
      var i;
      for (i = 0; i < odSide.length; i++) {
        var ent = odSide[i];
        if (ent && ent.tipo === "lista" && listaTemItens(ent) && /lan[cç]amento|em alta/i.test(ent.nome)) return i;
      }
      for (i = 0; i < odSide.length; i++) {
        if (odSide[i] && odSide[i].tipo === "lista" && listaTemItens(odSide[i])) return i;
      }
      return 0;
    }
    function preencherPrateleira(kind, manterFoco) {
      var idLista = odListaExtra && odListaExtra.id || odSide[odListaIndex] && odSide[odListaIndex].id;
      var idLado = odSide[odSideIndex] && odSide[odSideIndex].id;
      var zona = browseZone;
      var gix = odGridIndex;
      var extraId = odListaExtra && odListaExtra.id;
      odListaExtra = null;
      fecharFly(true);
      odSide = montarPrateleira(kind);
      if (manterFoco && idLado) {
        var ni = -1;
        for (var i = 0; i < odSide.length; i++) {
          if (odSide[i].id === idLado) ni = i;
        }
        odSideIndex = ni >= 0 ? ni : indiceListaInicial();
      } else if (!manterFoco || odSideIndex >= odSide.length) {
        odSideIndex = indiceListaInicial();
      }
      if (manterFoco && idLista) {
        var nj = -1;
        for (var j = 0; j < odSide.length; j++) {
          if (odSide[j].id === idLista) nj = j;
        }
        odListaIndex = nj >= 0 ? nj : indiceListaInicial();
      } else {
        odListaIndex = odSide[odSideIndex] && odSide[odSideIndex].tipo === "lista" ? odSideIndex : indiceListaInicial();
      }
      if (manterFoco && extraId) {
        odListaExtra = acharFilhoPorId(extraId);
      }
      pintarLado();
      pintarGradeOd(true);
      if (listaTemItens(listaMostrada())) {
        browseZone = manterFoco && zona === "side" ? "side" : "grid";
        if (manterFoco && zona === "grid") {
          odGridIndex = Math.min(gix, Math.max(0, odItems.length - 1));
          garantirGradeAte(odGridIndex);
        }
      } else {
        browseZone = odSide.length ? "side" : "back";
      }
      updateBrowseFocus();
    }
    function itemOdEm(i) {
      if (i == null || i < 0) return null;
      if (odItems[i]) return odItems[i];
      var ent = listaMostrada();
      if (ent && ent.recs && ent.recs[i] && window.SaimoFicha && SaimoFicha.cardDeRec) {
        odItems[i] = cardDoAcervo(SaimoFicha.cardDeRec(ent.recs[i], !!ent.isSeries), !!ent.isSeries);
      }
      return odItems[i] || null;
    }
    function pintarHub() {
      if (!browseHub) return;
      browseHub.innerHTML = "";
      var grade = document.createElement("div");
      grade.className = "od-hub-grid";
      [{
        secao: "filmes",
        nome: "Filmes",
        i: 0
      }, {
        secao: "series",
        nome: "Séries",
        i: 1
      }, {
        secao: "animes",
        nome: "Animes",
        i: 2
      }, {
        secao: "doramas",
        nome: "Doramas",
        i: 3
      }].forEach(function (d) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "od-cat od-cat-" + d.secao;
        card.dataset.col = String(d.i);
        card.dataset.secao = d.secao;
        var capas = capasDaSecao(d.secao, 4);
        if (capas.length) {
          var mosaico = document.createElement("div");
          mosaico.className = "od-mosaic";
          capas.forEach(function (url) {
            var img = document.createElement("img");
            img.src = url;
            img.alt = "";
            img.decoding = "async";
            img.loading = "eager";
            mosaico.appendChild(img);
          });
          card.appendChild(mosaico);
        }
        var info = document.createElement("div");
        info.className = "od-cat-info";
        var ico = document.createElement("span");
        ico.className = "od-ico od-ico-" + d.secao;
        ico.innerHTML = svgSecao(d.secao);
        var texto = document.createElement("span");
        texto.className = "od-cat-text";
        var nome = document.createElement("span");
        nome.className = "od-cat-nome";
        nome.textContent = d.nome;
        var sub = document.createElement("span");
        sub.className = "od-cat-sub";
        var qtd = contagemSecao(d.secao);
        sub.textContent = qtd ? fmtNum(qtd) + " títulos" : "";
        texto.appendChild(nome);
        texto.appendChild(sub);
        info.appendChild(ico);
        info.appendChild(texto);
        card.appendChild(info);
        grade.appendChild(card);
      });
      browseHub.appendChild(grade);
      hubGensData = [];
    }
    function cardHubGenero(rec, serie) {
      if (!rec) return null;
      var bruto = window.SaimoFicha && SaimoFicha.cardDeRec ? SaimoFicha.cardDeRec(rec, serie) : rec;
      return cardDoAcervo(bruto, serie);
    }
    function pintarHubGens() {
      if (!browseHub) return;
      var velho = browseHub.querySelector(".od-hub-gens");
      if (velho) velho.parentNode.removeChild(velho);
      if (!window.SaimoGenerosOd) return;
      hubGensData = SaimoGenerosOd.preparar();
      if (!hubGensData.length) return;
      var wrap = document.createElement("div");
      wrap.className = "od-hub-gens";
      hubGensData.forEach(function (fila, ri) {
        var items = SaimoGenerosOd.cardsDaFila(fila, cardHubGenero);
        if (items.length < 4) return;
        items.push(cartaoAcao("Todos de " + fila.genero + " ›", "", "genero", "filmes", fila.genero));
        var row = makeHomeRowEl({
          title: fila.title,
          items: items,
          wide: false
        }, ri);
        wrap.appendChild(row);
      });
      browseHub.appendChild(wrap);
    }
    function itemHubGen() {
      var fila = hubGensData[hubGenRow];
      if (!fila || !window.SaimoGenerosOd) return null;
      var items = SaimoGenerosOd.cardsDaFila(fila, cardHubGenero);
      items.push(cartaoAcao("Todos de " + fila.genero + " ›", "", "genero", "filmes", fila.genero));
      return items[hubGenCol] || null;
    }
    function focarHubGen() {
      if (!browseHub) return false;
      var rows = browseHub.querySelectorAll(".od-hub-gens .home-row");
      var rowEl = rows[hubGenRow];
      if (!rowEl) return false;
      var track = rowEl.querySelector(".home-row-track");
      var card = track && track.children[hubGenCol];
      if (!card) return false;
      setFocus(card);
      try {
        card.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } catch (e) {}
      return true;
    }
    function ativarHubGen() {
      var item = itemHubGen();
      if (!item) return;
      if (item.type === "acao" && item.acao === "genero") {
        abrirAz(item.secao, item.genero);
        return;
      }
      telaAcervo = "browse";
      returnScreen = "browse";
      enrichItem(item).then(function (full) {
        openInfo(full || item);
      });
    }
    function ladoEstaAtivo(ent) {
      if (!ent) return false;
      if (odListaExtra) {
        return !!(ent.filhos && ent.filhos.some(function (f) {
          return f.id === odListaExtra.id;
        }));
      }
      return ent.tipo === "lista" && odSide[odListaIndex] === ent;
    }
    function fecharFly(silencio) {
      if (odFlyEl) {
        odFlyEl.classList.add("hidden");
        odFlyEl.innerHTML = "";
      }
      if (!silencio && browseZone === "fly") {
        browseZone = "side";
        updateBrowseFocus();
      }
    }
    function pintarFly() {
      if (!odFlyEl) return;
      var pai = odSide[odSideIndex];
      var filhos = pai && pai.filhos || [];
      odFlyEl.innerHTML = "";
      if (!filhos.length) {
        odFlyEl.classList.add("hidden");
        return;
      }
      odFlyEl.classList.remove("hidden");
      filhos.forEach(function (ent, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "od-fly-row" + (i === odFlyIndex ? " focused" : "");
        btn.dataset.index = String(i);
        var nome = document.createElement("span");
        nome.textContent = ent.nome;
        btn.appendChild(nome);
        if (ent.contagem !== "" && ent.contagem != null) {
          var c = document.createElement("span");
          c.className = "od-fly-count";
          c.textContent = fmtNum(ent.contagem || 0);
          btn.appendChild(c);
        }
        odFlyEl.appendChild(btn);
      });
    }
    function abrirFly() {
      var pai = odSide[odSideIndex];
      if (!pai || pai.tipo !== "submenu" || !(pai.filhos && pai.filhos.length)) return;
      odFlyIndex = 0;
      if (odListaExtra) {
        var ix = pai.filhos.findIndex(function (f) {
          return f.id === odListaExtra.id;
        });
        if (ix >= 0) odFlyIndex = ix;
      }
      browseZone = "fly";
      pintarFly();
      updateBrowseFocus();
    }
    function ativarFly() {
      var pai = odSide[odSideIndex];
      var filho = pai && pai.filhos && pai.filhos[odFlyIndex];
      if (!filho) return;
      odListaExtra = garantirItensLista(filho);
      fecharFly(true);
      pintarLado();
      pintarGradeOd(true);
      browseZone = listaTemItens(odListaExtra) ? "grid" : "side";
      odGridIndex = 0;
      garantirGradeAte(odGridIndex);
      updateBrowseFocus();
    }
    function pintarLado() {
      if (!odSideEl) return;
      odSideEl.innerHTML = "";
      odSide.forEach(function (ent, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "od-side-row" + (ladoEstaAtivo(ent) ? " active" : "");
        btn.dataset.index = String(i);
        var esq = document.createElement("span");
        esq.className = "od-side-esq";
        if (ent.tipo === "buscar") {
          var ico = document.createElement("span");
          ico.className = "od-lupa";
          ico.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="10" cy="10" r="6.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M14.8 14.8L20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
          esq.appendChild(ico);
        }
        var nome = document.createElement("span");
        nome.className = "od-side-nome";
        nome.textContent = ent.nome;
        esq.appendChild(nome);
        btn.appendChild(esq);
        if (ent.tipo === "submenu") {
          var seta = document.createElement("span");
          seta.className = "od-side-count";
          seta.textContent = "›";
          btn.appendChild(seta);
        } else if (ent.tipo !== "buscar") {
          var c = document.createElement("span");
          c.className = "od-side-count";
          c.textContent = fmtNum(ent.contagem || 0);
          btn.appendChild(c);
        }
        odSideEl.appendChild(btn);
      });
    }
    function cartaoOd(item, index) {
      var card = document.createElement("div");
      card.className = "od-poster";
      card.dataset.index = String(index);
      var media = document.createElement("div");
      media.className = "od-poster-media";
      item = item || {};
      var url = item.posterUrl || "";
      var mostrar = !window.SaimoCapas || SaimoCapas.deveCarregar(odItems, index, odGridIndex);
      if (url && mostrar && window.SaimoCapas) url = SaimoCapas.urlLeve(url);
      if (url && mostrar) {
        var img = document.createElement("img");
        img.src = url;
        img.alt = "";
        if (window.SaimoCapas && SaimoCapas.suportaLazy()) img.loading = "lazy";
        media.appendChild(img);
      } else media.textContent = (item.title || item.name || "?").charAt(0).toUpperCase();
      var nome = document.createElement("div");
      nome.className = "od-poster-nome";
      nome.textContent = item.title || item.name || "";
      card.appendChild(media);
      card.appendChild(nome);
      pintarEstrela(card, isFavorited(item.title || item.name || ""));
      return card;
    }
    function pintarGradeOd(reset) {
      var ent = listaMostrada();
      if (odTitle) odTitle.textContent = ent && ent.nome || "";
      if (!odGrid) return;
        if (reset) {
        if (ent && ent.recs && ent.recs.length) {
          ent.recs = ent.recs.filter(function (rec) {
            return itemTemPlay({
              title: rec.titulo,
              type: ent.isSeries ? "series" : "movie"
            }, browseKind);
          });
          odItems = new Array(ent.recs.length);
        } else {
          odItems = aplicarFiltrosOd(ent && ent.items ? ent.items.slice() : []);
        }
        odGridIndex = 0;
        odRendered = 0;
        odGrid.innerHTML = "";
        odGrid.scrollTop = 0;
      }
      if (!odItems.length) {
        odGrid.innerHTML = '<div class="od-vazio">Nenhum título nesta lista.</div>';
        odRendered = 0;
        return;
      }
      var fim = Math.min(odRendered + OD_PAGE, odItems.length);
      if (fim <= odRendered) return;
      var frag = document.createDocumentFragment();
      for (var i = odRendered; i < fim; i++) frag.appendChild(cartaoOd(itemOdEm(i), i));
      odGrid.appendChild(frag);
      odRendered = fim;
      if (window.SaimoCapas && odGrid) {
        var ini = Math.max(0, odGridIndex - OD_COLS);
        var fimJanela = Math.min(odItems.length, odGridIndex + OD_COLS * 2);
        for (var j = ini; j < fimJanela; j++) itemOdEm(j);
        SaimoCapas.atualizarJanelaGrade(odGrid, odItems, odGridIndex);
      }
    }
    function garantirGradeAte(indice) {
      while (odRendered <= indice && odRendered < odItems.length) pintarGradeOd(false);
    }
    function moverLado(delta) {
      var prox = odSideIndex + delta;
      if (prox < 0 || prox >= odSide.length) return false;
      odSideIndex = prox;
      var ent = odSide[odSideIndex];
      if (ent && ent.tipo === "lista") {
        odListaExtra = null;
        odListaIndex = odSideIndex;
        pintarGradeOd(true);
      }
      pintarLado();
      updateBrowseFocus();
      return true;
    }
    function ativarLado() {
      var ent = odSide[odSideIndex];
      if (!ent) return;
      if (ent.tipo === "buscar") {
        openSearch();
        return;
      }
      if (ent.tipo === "az") {
        abrirAz(browseKind, "");
        return;
      }
      if (ent.tipo === "submenu") {
        abrirFly();
        return;
      }
      if (ent.tipo === "ciclo") {
        if (ent.ciclo === "audio") {
          odFiltroAudio = odFiltroAudio === "todos" ? "dub" : odFiltroAudio === "dub" ? "leg" : "todos";
        } else if (ent.ciclo === "decada") {
          var ix = DECADA_DEFS.findIndex(function (d) {
            return String(d.faixa) === String(odFiltroDecada);
          });
          if (odFiltroDecada === "todas") odFiltroDecada = String(DECADA_DEFS[0].faixa);else if (ix >= 0 && ix < DECADA_DEFS.length - 1) odFiltroDecada = String(DECADA_DEFS[ix + 1].faixa);else odFiltroDecada = "todas";
        }
        var idAtual = odSide[odListaIndex] && odSide[odListaIndex].id;
        odSide = montarPrateleira(browseKind);
        if (idAtual) {
          var ni = -1;
          for (var si = 0; si < odSide.length; si++) {
            if (odSide[si].id === idAtual) ni = si;
          }
          if (ni < 0) {
            for (var sj = 0; sj < odSide.length; sj++) {
              if (odSide[sj].id === ent.id) ni = sj;
            }
          }
          if (ni >= 0) {
            odSideIndex = ni;
            if (odSide[ni].tipo === "lista") odListaIndex = ni;
          }
        }
        pintarLado();
        pintarGradeOd(true);
        updateBrowseFocus();
        return;
      }
      if (ent.tipo === "lista") {
        odListaExtra = null;
        odListaIndex = odSideIndex;
        pintarGradeOd(true);
        browseZone = listaTemItens(ent) ? "grid" : "side";
        odGridIndex = 0;
        updateBrowseFocus();
      }
    }
    function activateOdItem() {
      return _activateOdItem.apply(this, arguments);
    }
    function _activateOdItem() {
      _activateOdItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var item;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              item = itemOdEm(odGridIndex);
              if (item) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2);
            case 1:
              telaAcervo = "browse";
              returnScreen = "browse";
              if (item.type === "series") openSeriesScreen(item);else openInfoPanel(item);
              enrichItem(item).then(function () {
                return ligarColecao(item);
              }).catch(function () {});
            case 2:
              return _context14.a(2);
          }
        }, _callee14);
      }));
      return _activateOdItem.apply(this, arguments);
    }
    function navegarHub(code) {
      if (browseZone === "gens") {
        var fila = hubGensData[hubGenRow];
        var capas = window.SaimoGenerosOd ? SaimoGenerosOd.CAPAS : 4;
        var nItens = fila ? Math.min(capas, (fila.recs || []).length) + 1 : 0;
        if (code === 37) {
          if (hubGenCol > 0) hubGenCol--;
          else {
            browseZone = "back";
            updateBrowseFocus();
            return;
          }
        } else if (code === 39) {
          if (hubGenCol < nItens - 1) hubGenCol++;
        } else if (code === 38) {
          if (hubGenRow > 0) {
            hubGenRow--;
            hubGenCol = Math.min(hubGenCol, Math.min(capas, (hubGensData[hubGenRow].recs || []).length));
          } else {
            browseZone = "hub";
            browseCol = 2;
            updateBrowseFocus();
            return;
          }
        } else if (code === 40) {
          if (hubGenRow < hubGensData.length - 1) {
            hubGenRow++;
            hubGenCol = Math.min(hubGenCol, Math.min(capas, (hubGensData[hubGenRow].recs || []).length));
          }
        } else if (code === 13) {
          ativarHubGen();
          return;
        }
        updateBrowseFocus();
        return;
      }
      if (browseZone !== "hub") {
        if (code === 40 || code === 39) {
          browseZone = "hub";
          browseCol = 0;
          updateBrowseFocus();
        } else if (code === 13) voltarBrowse();
        return;
      }
      if (code === 37) {
        if (browseCol === 1 || browseCol === 3) {
          browseCol--;
          updateBrowseFocus();
        } else {
          browseZone = "back";
          updateBrowseFocus();
        }
      } else if (code === 39) {
        if (browseCol === 0 || browseCol === 2) {
          browseCol++;
          updateBrowseFocus();
        }
      } else if (code === 38) {
        if (browseCol >= 2) {
          browseCol -= 2;
          updateBrowseFocus();
        } else {
          browseZone = "back";
          updateBrowseFocus();
        }
      } else if (code === 40) {
        if (browseCol <= 1) {
          browseCol += 2;
          updateBrowseFocus();
        }
      } else if (code === 13) {
        var secao = ["filmes", "series", "animes", "doramas"][browseCol];
        if (secao) openBrowse(secao);
      }
    }
    function navegarPrateleira(code) {
      if (browseZone === "fly") {
        var pai = odSide[odSideIndex];
        var nFly = pai && pai.filhos ? pai.filhos.length : 0;
        if (code === 38) {
          if (odFlyIndex > 0) {
            odFlyIndex--;
            pintarFly();
            updateBrowseFocus();
          }
        } else if (code === 40) {
          if (odFlyIndex < nFly - 1) {
            odFlyIndex++;
            pintarFly();
            updateBrowseFocus();
          }
        } else if (code === 37 || code === 8) {
          fecharFly();
        } else if (code === 39 || code === 13) ativarFly();
        return;
      }
      if (browseZone === "back") {
        if (code === 40 || code === 39) {
          browseZone = "side";
          updateBrowseFocus();
        } else if (code === 13) voltarBrowse();
        return;
      }
      if (browseZone === "side") {
        if (code === 38) {
          if (odSideIndex === 0) {
            browseZone = "back";
            updateBrowseFocus();
          } else moverLado(-1);
        } else if (code === 40) {
          if (odSideIndex < odSide.length - 1) moverLado(1);
        } else if (code === 39) {
          var ent = odSide[odSideIndex];
          if (ent && ent.tipo === "submenu") abrirFly();
          else if (ent && ent.tipo === "lista") {
            odListaExtra = null;
            odListaIndex = odSideIndex;
            pintarGradeOd(true);
            if (listaTemItens(ent)) {
              browseZone = "grid";
              odGridIndex = 0;
              garantirGradeAte(odGridIndex);
              updateBrowseFocus();
            }
          } else if (ent && ent.tipo === "az") abrirAz(browseKind, "");
        } else if (code === 37) {
          browseZone = "back";
          updateBrowseFocus();
        } else if (code === 13) ativarLado();
        return;
      }
      var total = odItems.length;
      if (!total) {
        if (code === 37) {
          browseZone = "side";
          updateBrowseFocus();
        }
        return;
      }
      if (code === 37) {
        if (odGridIndex % OD_COLS === 0) {
          browseZone = "side";
          updateBrowseFocus();
        } else {
          odGridIndex--;
          updateBrowseFocus();
        }
      } else if (code === 39) {
        if (odGridIndex < total - 1) {
          odGridIndex++;
          garantirGradeAte(odGridIndex);
          updateBrowseFocus();
        }
      } else if (code === 38) {
        if (odGridIndex - OD_COLS >= 0) {
          odGridIndex -= OD_COLS;
          updateBrowseFocus();
        }
      } else if (code === 40) {
        if (odGridIndex + OD_COLS < total) {
          odGridIndex += OD_COLS;
          garantirGradeAte(odGridIndex);
          updateBrowseFocus();
        }
      } else if (code === 13) activateOdItem();
    }
    function browseItem() {
      if (modoPrateleira() && browseZone === "grid") return itemOdEm(odGridIndex);
      var row = browseData[browseRow];
      return row && row.items[browseCol];
    }
    function pintarBrowse() {
      if (!browseRowsEl) return;
      browseRowsEl.innerHTML = "";
      if (!browseData.length) {
        browseRowsEl.innerHTML = '<div class="browse-empty">Nenhum título por aqui.</div>';
        return;
      }
      browseData.forEach(function (row, ri) {
        return browseRowsEl.appendChild(makeHomeRowEl(row, ri));
      });
      preencherCapasBrowse();
    }
    function preencherCapasBrowse() {
      if (!window.SaimoCapas || !browseRowsEl) return;
      SaimoCapas.preencherFileiras(browseRowsEl, function (ri, ci) {
        return browseData[ri] && browseData[ri].items[ci];
      });
    }
    function atualizarBrowseSubnav() {
      if (browseToolbar) browseToolbar.classList.add("hidden");
    }
    function browseSecaoAz() {
      if (browseKind === "series" || browseKind === "animes" || browseKind === "doramas") return browseKind;
      return "filmes";
    }
    function updateBrowseFocus() {
      if (modoHub()) {
        if (browseZone === "gens" && focarHubGen()) return;
        if (browseZone === "hub" && browseHub) {
          var card = browseHub.querySelector('.od-cat[data-col="' + browseCol + '"]');
          if (card) {
            setFocus(card);
            return;
          }
        }
        setFocus(btnBrowseBack);
        return;
      }
      if (modoPrateleira()) {
        if (browseZone === "grid" && odGrid) {
          var _card2 = odGrid.querySelector('.od-poster[data-index="' + odGridIndex + '"]');
          if (_card2) {
            setFocus(_card2);
            if (window.SaimoCapas && odItems.length) {
              var i0 = Math.max(0, odGridIndex - OD_COLS);
              var i1 = Math.min(odItems.length, odGridIndex + OD_COLS * 2);
              for (var k = i0; k < i1; k++) itemOdEm(k);
              SaimoCapas.atualizarJanelaGrade(odGrid, odItems, odGridIndex);
            }
            preFichaNoFoco(itemOdEm(odGridIndex));
            return;
          }
        }
        if (browseZone === "fly" && odFlyEl && odFlyEl.children[odFlyIndex]) {
          setFocus(odFlyEl.children[odFlyIndex]);
          return;
        }
        if (browseZone === "side" && odSideEl && odSideEl.children[odSideIndex]) {
          setFocus(odSideEl.children[odSideIndex]);
          return;
        }
        setFocus(btnBrowseBack);
        return;
      }
      if (browseZone === "subnav" && browseTabEls[browseSubIndex]) setFocus(browseTabEls[browseSubIndex]);else if (browseZone === "az" && btnBrowseAz) setFocus(btnBrowseAz);else if (browseZone === "search" && btnBrowseSearch) setFocus(btnBrowseSearch);else if (browseZone === "back" || !browseData.length) setFocus(btnBrowseBack);else {
        var rowEl = browseRowsEl && browseRowsEl.children[browseRow];
        var track = rowEl && rowEl.querySelector(".home-row-track");
        var _card3 = track && track.children[browseCol];
        if (_card3) {
          setFocus(_card3);
          try {
            _card3.scrollIntoView({
              block: "nearest",
              inline: "nearest"
            });
          } catch (e) {}
          var brow = browseData[browseRow];
          if (track && brow && brow.items && window.SaimoCapas) {
            SaimoCapas.atualizarJanelaTrack(track, brow.items, browseCol);
            preFichaNoFoco(brow.items[browseCol]);
          }
        } else setFocus(btnBrowseBack);
      }
    }
    function restaurarBrowse() {
      currentScreen = "browse";
      telaAcervo = "browse";
      showScreen("browse");
      estrelaNoBrowse();
      updateBrowseFocus();
    }
    function voltarBrowse() {
      var prev = browsePilha.pop();
      if (prev) openBrowse(prev, {
        substituir: true
      });else returnToHome();
    }
    function openBrowse(_x1, _x10) {
      return _openBrowse.apply(this, arguments);
    }
    function _openBrowse() {
      _openBrowse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(kind, opts) {
        var seq, titulos, manterFoco, rowGuardada, colGuardada, esperaFicha, rows, n, itens;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              opts = opts || {};
              if (!opts.substituir) {
                if (currentScreen === "browse" && browseKind && browseKind !== kind) browsePilha.push(browseKind);else if (currentScreen !== "browse") browsePilha = [];
              }
              browseKind = kind;
              if (xtreamEstaLigado()) aplicarXtreamNoAcervo();
              telaAcervo = "browse";
              seq = ++browseSeq;
              currentScreen = "browse";
              showScreen("browse");
              atualizarBrowseSubnav();
              titulos = {
                ondemand: "ON DEMAND",
                filmes: "FILMES",
                series: "SÉRIES",
                animes: "ANIMES",
                doramas: "DORAMAS",
                favoritos: "FAVORITOS"
              };
              if (browseTitle) browseTitle.textContent = titulos[kind] || "ACERVO";
              if (browseCount) browseCount.textContent = "";
              aplicarModoBrowse();
              manterFoco = !!opts.manterFoco;
              rowGuardada = browseRow;
              colGuardada = browseCol;
              browseZone = "back";
              if (!manterFoco) {
                browseRow = 0;
                browseCol = 0;
              }
              if (modoPrateleira() && kind !== "filmes" && kind !== "series") {
                if (odTitle) odTitle.textContent = "";
                if (odSideEl) odSideEl.innerHTML = "";
                if (odGrid) odGrid.innerHTML = '<div class="od-vazio">Carregando…</div>';
              }
              if (!modoHub() && !modoPrateleira() && browseRowsEl) {
                browseRowsEl.innerHTML = '<div class="browse-empty">Carregando…</div>';
              }
              if (modoHub()) {
                pintarHub();
                browseZone = "hub";
                browseCol = manterFoco ? browseCol : 0;
                updateBrowseFocus();
                carregarAcervo().catch(function () {});
                carregarIndiceSeriesPlay().then(function () {
                  if (seq !== browseSeq || browseKind !== "ondemand") return;
                  return window.SaimoFicha && SaimoFicha.ensureIndex ? SaimoFicha.ensureIndex() : null;
                }).then(function () {
                  if (seq !== browseSeq || browseKind !== "ondemand") return;
                  colecaoOk.animes = false;
                  return garantirColecao("animes");
                }).then(function () {
                  if (seq !== browseSeq || browseKind !== "ondemand") return;
                  pintarHub();
                  updateBrowseFocus();
                }).catch(function () {});
                if (window.SaimoAPI && SaimoAPI.loadVodDestaques) {
                  SaimoAPI.loadVodDestaques().then(function () {
                    if (seq !== browseSeq || browseKind !== "ondemand") return;
                    pintarHub();
                    updateBrowseFocus();
                  }).catch(function () {});
                }
                return _context15.a(2);
              }
              if (modoPrateleira() && (kind === "filmes" || kind === "series")) {
                preencherPrateleira(kind, manterFoco);
                carregarAcervo().catch(function () {});
                if (kind === "series") {
                  carregarIndiceSeriesPlay().then(function () {
                    if (seq !== browseSeq || browseKind !== kind) return;
                    preencherPrateleira(kind, true);
                  }).catch(function () {});
                }
                if (window.SaimoAPI && SaimoAPI.loadVodDestaques) {
                  SaimoAPI.loadVodDestaques().then(function () {
                    if (seq !== browseSeq || browseKind !== kind) return;
                    preencherPrateleira(kind, true);
                  }).catch(function () {});
                }
                if (window.SaimoFicha && SaimoFicha.ensureIndex && !SaimoFicha.loaded) {
                  SaimoFicha.ensureIndex().then(function () {
                    if (seq !== browseSeq || browseKind !== kind) return;
                    preencherPrateleira(kind, true);
                  }).catch(function () {});
                }
                return _context15.a(2);
              }
              updateBrowseFocus();
              esperaFicha = [];
              esperaFicha.push(carregarAcervo());
              if (modoPrateleira() || kind === "favoritos") {
                if (window.SaimoFicha && SaimoFicha.ensureIndex) esperaFicha.push(SaimoFicha.ensureIndex().catch(function () {}));
                if (kind === "animes" || kind === "doramas") {
                  esperaFicha.push(carregarIndiceSeriesPlay().then(function () {
                    colecaoOk.animes = false;
                    colecaoOk.doramas = false;
                    return Promise.all([garantirColecao("animes").catch(function () {
                      return [];
                    }), garantirColecao("doramas").catch(function () {
                      return [];
                    })]);
                  }));
                }
              }
              _context15.n = 1;
              return Promise.all(esperaFicha);
            case 1:
              if (!(seq !== browseSeq)) {
                _context15.n = 2;
                break;
              }
              return _context15.a(2);
            case 2:
            case 3:
              if (!modoPrateleira()) {
                _context15.n = 8;
                break;
              }
              if (!(kind === "animes" || kind === "doramas")) {
                _context15.n = 5;
                break;
              }
              _context15.n = 4;
              return ensureColecaoCategories(kind);
            case 4:
              _context15.n = 6;
              break;
            case 5:
              _context15.n = 6;
              return ensureVodCategories();
            case 6:
              if (!(seq !== browseSeq)) {
                _context15.n = 7;
                break;
              }
              return _context15.a(2);
            case 7:
              preencherPrateleira(kind, manterFoco);
              return _context15.a(2);
            case 8:
              _context15.n = 9;
              return montarBrowse(kind);
            case 9:
              rows = _context15.v;
              if (!(seq !== browseSeq)) {
                _context15.n = 10;
                break;
              }
              return _context15.a(2);
            case 10:
              browseData = rows;
              pintarBrowse();
              if (browseCount && kind !== "ondemand" && kind !== "favoritos") {
                n = rows.reduce(function (s, r) {
                  return s + r.items.filter(function (it) {
                    return it.type !== "acao";
                  }).length;
                }, 0);
                browseCount.textContent = n ? fmtNum(n) + " na tela" : "";
              }
              if (manterFoco && rows.length) {
                browseZone = "rows";
                browseRow = Math.min(rowGuardada, rows.length - 1);
                itens = rows[browseRow] && rows[browseRow].items || [];
                browseCol = itens.length ? Math.min(colGuardada, itens.length - 1) : 0;
              } else {
                browseZone = rows.length ? "rows" : "back";
                browseRow = 0;
                browseCol = 0;
              }
              updateBrowseFocus();
            case 11:
              return _context15.a(2);
          }
        }, _callee15);
      }));
      return _openBrowse.apply(this, arguments);
    }
    function activateBrowseItem() {
      return _activateBrowseItem.apply(this, arguments);
    }
    function _activateBrowseItem() {
      _activateBrowseItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var item;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              item = browseItem();
              if (item) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2);
            case 1:
              if (!(item.type === "acao")) {
                _context16.n = 2;
                break;
              }
              if (item.acao === "secao") openBrowse(item.secao);else if (item.acao === "genero") {
                abrirAz(item.secao, item.genero);
              } else if (item.acao === "decada") {
                abrirAz(item.secao, "", {
                  decada: item.decada
                });
              } else if (item.acao === "combo") {
                abrirAz(item.secao, "", {
                  combo: item.combo
                });
              }
              return _context16.a(2);
            case 2:
              telaAcervo = "browse";
              returnScreen = "browse";
              _context16.n = 3;
              return enrichItem(item);
            case 3:
              _context16.n = 4;
              return ligarColecao(item);
            case 4:
              if (item.type === "channel") {
                launchPlayer({
                  name: item.name,
                  category: item.category,
                  logo: item.logo,
                  isLive: true,
                  sources: item.sources
                }, item, null);
              } else if (item.type === "series") openSeriesScreen(item);else openInfoPanel(item);
            case 5:
              return _context16.a(2);
          }
        }, _callee16);
      }));
      return _activateBrowseItem.apply(this, arguments);
    }
    function mostrarGuia(on) {
      if (!btnCatalogGuide) return;
      btnCatalogGuide.classList.toggle("hidden", !on);
    }
    function abrirAz(_x11, _x12) {
      return _abrirAz.apply(this, arguments);
    }
    function _abrirAz() {
      _abrirAz = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(secao, genero, opts) {
        var nomes, base, isSeries, letras, visto, subs, _t11, recs;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              gradeAz = true;
              gradeGenero = genero || "";
              gradeVolta = browseKind;
              telaAcervo = "catalog";
              currentSection = secao;
              currentScreen = "catalog";
              showScreen("catalog");
              mostrarGuia(false);
              if (btnBackHub) btnBackHub.textContent = "◄ Voltar";
              if (resumeBanner) resumeBanner.classList.add("hidden");
              nomes = {
                filmes: "FILMES",
                series: "SÉRIES",
                animes: "ANIMES",
                doramas: "DORAMAS"
              };
              opts = opts || {};
              if (catalogSectionTitle) {
                var extra = genero ? " · " + genero : opts.decada ? " · " + (DECADA_DEFS.filter(function (d) {
                  return d.faixa === opts.decada;
                })[0] || {
                  nome: "Época"
                }).nome : opts.combo ? " · seleção" : "";
                catalogSectionTitle.textContent = (nomes[secao] || "ACERVO") + extra;
              }
              if (!(window.SaimoFicha && SaimoFicha.ensureIndex)) {
                _context17.n = 4;
                break;
              }
              _context17.p = 1;
              _context17.n = 2;
              return SaimoFicha.ensureIndex();
            case 2:
              _context17.n = 4;
              break;
            case 3:
              _context17.p = 3;
              _t11 = _context17.v;
            case 4:
              base = [];
              if (!(secao === "animes" || secao === "doramas")) {
                _context17.n = 6;
                break;
              }
              _context17.n = 5;
              return garantirColecao(secao);
            case 5:
              base = _context17.v.slice();
              _context17.n = 7;
              break;
            case 6:
              if (secao === "series") base = itensSerieSemAnime(catalogItems(seriesRows));else base = catalogItems(filmesRows);
            case 7:
              isSeries = secao !== "filmes";
              if (window.SaimoFicha && SaimoFicha.listar && (secao === "filmes" || secao === "series") && (genero || opts.decada || opts.combo)) {
                if (genero) recs = SaimoFicha.listarPorGenero(isSeries, genero, 0, false);else if (opts.decada) recs = SaimoFicha.listarPorDecada(isSeries, opts.decada, 0, false);else recs = SaimoFicha.listarCombo(isSeries, opts.combo, 0, false);
                base = cardsDaFicha(recs, isSeries);
              }
              if (usarCatalogoLazy() && !genero && !opts.decada && !opts.combo && (secao === "filmes" || secao === "series")) {
                gradeItens = [];
                letras = SaimoCatalogo.LETRAS.slice();
                subs = letras;
                categoriesBar.innerHTML = "";
                subs.forEach(function (catName, idx) {
                  var tab = document.createElement("div");
                  tab.className = "cat-tab" + (idx === 0 ? " active" : "");
                  tab.textContent = catName;
                  categoriesBar.appendChild(tab);
                });
                if (channelCounter) {
                  var tot = SaimoCatalogo.contagemSecao(secao === "series" ? "series" : "filmes");
                  if (secao === "series") tot = qtdSeriesSemAnime(tot);
                  channelCounter.textContent = fmtNum(tot || 0) + " títulos";
                }
                categoryIndex = 0;
                catalogZone = subs.length ? "categories" : "back-btn";
                if (subs.length) {
                  _context17.n = 8;
                  break;
                }
                activeItemList = [];
                channelsGrid.innerHTML = "";
                updateCatalogFocus();
                return _context17.a(2);
              }
              if (genero) {
                base = base.filter(function (it) {
                  var gens = (window.SaimoFicha && SaimoFicha.generosDe ? SaimoFicha.generosDe(it.title, isSeries) : []).map(function (g) {
                    return nomeGenero(g, isSeries);
                  });
                  return gens.indexOf(genero) >= 0;
                });
              }
              gradeItens = base.map(function (it) {
                var serie = it.type === "series";
                var capa = window.SaimoFicha && SaimoFicha.capaDe && SaimoFicha.capaDe(it.title, serie) || it.posterUrl || "";
                return Object.assign({}, it, {
                  posterUrl: capa,
                  letter: letraItem(it)
                });
              }).sort(function (a, b) {
                return String(a.title).localeCompare(String(b.title), "pt-BR");
              });
              letras = [];
              visto = {};
              gradeItens.forEach(function (it) {
                var L = it.letter || "#";
                if (!visto[L]) {
                  visto[L] = 1;
                  letras.push(L);
                }
              });
              letras.sort(function (a, b) {
                return (a === "#" ? "" : a).localeCompare(b === "#" ? "" : b);
              });
              subs = (genero ? ["Todos"] : []).concat(letras);
              categoriesBar.innerHTML = "";
              subs.forEach(function (catName, idx) {
                var tab = document.createElement("div");
                tab.className = "cat-tab" + (idx === 0 ? " active" : "");
                tab.textContent = catName;
                categoriesBar.appendChild(tab);
              });
              if (channelCounter) channelCounter.textContent = fmtNum(gradeItens.length) + " títulos";
              categoryIndex = 0;
              catalogZone = subs.length ? "categories" : "back-btn";
              if (subs.length) {
                _context17.n = 8;
                break;
              }
              activeItemList = [];
              channelsGrid.innerHTML = "";
              updateCatalogFocus();
              return _context17.a(2);
            case 8:
              selectCategory(0, true);
            case 9:
              return _context17.a(2);
          }
        }, _callee17, null, [[1, 3]]);
      }));
      return _abrirAz.apply(this, arguments);
    }
    function voltarDaGrade() {
      gradeAz = false;
      gradeGenero = "";
      restaurarBrowse();
    }
    function enterSection(_x13, _x14) {
      return _enterSection.apply(this, arguments);
    }
    function _enterSection() {
      _enterSection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(section, opts) {
        var subCategories, lives, abas, startTab, ix;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              opts = opts || {};
              if (!(section === "ondemand" || section === "favoritos")) {
                _context18.n = 1;
                break;
              }
              openBrowse(section);
              return _context18.a(2);
            case 1:
              gradeAz = false;
              mostrarGuia(section === "aovivo");
              if (btnBackHub) btnBackHub.textContent = "◄ Início";
              currentSection = section;
              currentScreen = "catalog";
              catalogZone = "grid";
              categoryIndex = 0;
              gridIndex = 0;
              showScreen("catalog");
              subCategories = [];
              lives = liveChannels();
              if (!(section === "aovivo")) {
                _context18.n = 2;
                break;
              }
              catalogSectionTitle.textContent = "TV AO VIVO";
              aovivoMaisNome = "";
              aovivoOrigem = "";
              subCategories = abasAovivo();
              channelCounter.textContent = lives.length + " canais";
              if (window.SaimoEpg) SaimoEpg.ensure(lives.map(function (c) {
                return c.name;
              }));
              _context18.n = 8;
              break;
            case 2:
              if (!(section === "filmes")) {
                _context18.n = 4;
                break;
              }
              catalogSectionTitle.textContent = "FILMES";
              if (Object.keys(filmesCats).length) {
                _context18.n = 3;
                break;
              }
              _context18.n = 3;
              return ensureVodCategories();
            case 3:
              subCategories = ["Favoritos"].concat(ordenarAbas(filmesCats));
              channelCounter.textContent = catalogItems(filmesRows).length + " Filmes";
              _context18.n = 8;
              break;
            case 4:
              if (!(section === "series")) {
                _context18.n = 6;
                break;
              }
              catalogSectionTitle.textContent = "SERIES";
              if (Object.keys(seriesCats).length) {
                _context18.n = 5;
                break;
              }
              _context18.n = 5;
              return ensureVodCategories();
            case 5:
              subCategories = ["Favoritos"].concat(ordenarAbas(seriesCats));
              channelCounter.textContent = itensSerieSemAnime(catalogItems(seriesRows)).length + " Series";
              _context18.n = 8;
              break;
            case 6:
              if (!(section === "animes" || section === "doramas")) {
                _context18.n = 8;
                break;
              }
              catalogSectionTitle.textContent = section === "animes" ? "ANIMES" : "DORAMAS";
              _context18.n = 7;
              return ensureColecaoCategories(section);
            case 7:
              subCategories = ["Favoritos"].concat(ordenarAbas(colecaoCats));
              channelCounter.textContent = colecaoLista.length + " titulos";
            case 8:
              categoriesBar.innerHTML = "";
              startTab = section === "aovivo" ? indiceAbaAovivoInicial(subCategories) : indiceAbaInicial(subCategories);
              if (opts.aba) {
                ix = subCategories.indexOf(opts.aba);
                if (ix >= 0) startTab = ix;
              }
              subCategories.forEach(function (catName, idx) {
                var tab = document.createElement("div");
                tab.className = "cat-tab" + (idx === startTab ? " active" : "");
                tab.textContent = catName;
                tab.dataset.index = String(idx);
                tab.addEventListener("click", function () {
                  selectCategory(idx, section === "aovivo" && ehAbaMais(catName) ? false : true);
                });
                categoriesBar.appendChild(tab);
              });
              checkResumeBanner(section);
              selectCategory(startTab, false);
            case 9:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      return _enterSection.apply(this, arguments);
    }
    function indiceAbaAntesMais() {
      var tabs = categoriesBar.querySelectorAll(".cat-tab");
      var i;
      for (i = 0; i < tabs.length; i++) {
        if (ehAbaMais(tabs[i].textContent)) return Math.max(0, i - 1);
      }
      return Math.max(0, (tabs.length || 1) - 2);
    }
    function selectCategory(catIdx, keepTabFocus) {
      var abaAntes = categoryIndex;
      categoryIndex = catIdx;
      var tabs = categoriesBar.querySelectorAll(".cat-tab");
      tabs.forEach(function (t, i) {
        t.classList.toggle("active", i === catIdx);
        if (i === catIdx) t.scrollIntoView({
          behavior: "auto",
          inline: "nearest"
        });
      });
      var catName = tabs[catIdx] ? tabs[catIdx].textContent : "";
      if (gradeAz) {
        if (usarCatalogoLazy() && isLetraCat(catName) && (currentSection === "filmes" || currentSection === "series")) {
          var tipoCat = currentSection === "series" ? "series" : "filmes";
          garantirLetraAcervo(tipoCat, catName).then(function (items) {
            activeItemList = currentSection === "series" ? itensSerieSemAnime(items) : items.slice();
            if (currentSection === "filmes" || currentSection === "series") {
              activeItemList = activeItemList.filter(function (it) {
                return itemTemPlay(it, currentSection);
              });
            }
            channelsGrid.innerHTML = "";
            contentArea.scrollTop = 0;
            renderedCount = 0;
            gridIndex = 0;
            renderNextChunk(PAGE_SIZE_INITIAL);
            catalogZone = keepTabFocus ? "categories" : "grid";
            updateCatalogFocus();
          });
          return;
        }
        activeItemList = !catName || catName === "Todos" ? gradeItens.slice() : gradeItens.filter(function (it) {
          return (it.letter || "#") === catName;
        });
        channelsGrid.innerHTML = "";
        contentArea.scrollTop = 0;
        renderedCount = 0;
        gridIndex = 0;
        renderNextChunk(PAGE_SIZE_INITIAL);
        catalogZone = keepTabFocus ? "categories" : "grid";
        updateCatalogFocus();
        return;
      }
      var lives = liveChannels();
      if (catName === "Favoritos") {
        if (currentSection === "aovivo") {
          aovivoOrigem = "";
          aovivoMaisNome = "";
          activeItemList = lives.filter(function (c) {
            return isFavorited(c.name);
          });
        } else if (currentSection === "filmes") activeItemList = catalogItems(filmesRows).filter(function (m) {
          return isFavorited(m.title);
        });else if (currentSection === "animes" || currentSection === "doramas") {
          activeItemList = colecaoLista.filter(function (s) {
            return isFavorited(s.title);
          });
        } else activeItemList = catalogItems(seriesRows).filter(function (s) {
          return isFavorited(s.title) && !itemPareceAnime(s);
        });
      } else if (currentSection === "aovivo") {
        if (ehAbaMais(catName) && !aovivoMaisNome) {
          if (abaAntes !== catIdx) {
            var tabAntes = categoriesBar.querySelectorAll(".cat-tab")[abaAntes];
            if (tabAntes && !ehAbaMais(tabAntes.textContent)) aovivoMaisAbaAntes = abaAntes;
          }
          abrirMaisCategorias("catalog");
          return;
        }
        if (!ehAbaMais(catName)) aovivoMaisNome = "";
        activeItemList = listaFiltradaAovivo(catName);
        if (channelCounter) {
          var extra = ehAbaMais(catName) && aovivoMaisNome ? " · " + limparNomeCat(aovivoMaisNome) : "";
          channelCounter.textContent = activeItemList.length + " canais" + extra;
        }
      } else if (currentSection === "filmes") activeItemList = filmesCats[catName] || [];else if (currentSection === "animes" || currentSection === "doramas") activeItemList = colecaoCats[catName] || [];else activeItemList = seriesCats[catName] || [];
      channelsGrid.innerHTML = "";
      contentArea.scrollTop = 0;
      renderedCount = 0;
      gridIndex = 0;
      renderNextChunk(PAGE_SIZE_INITIAL);
      catalogZone = keepTabFocus ? "categories" : "grid";
      updateCatalogFocus();
    }
    function renderNextChunk(count) {
      var fragment = document.createDocumentFragment();
      var end = Math.min(renderedCount + count, activeItemList.length);
      for (var i = renderedCount; i < end; i++) fragment.appendChild(createCard(activeItemList[i], i));
      channelsGrid.appendChild(fragment);
      renderedCount = end;
    }
    function createCard(item, index) {
      var card = document.createElement("div");
      var isLive = item.type === "channel";
      card.className = "channel-card" + (isLive ? " is-live" : "");
      card.dataset.index = String(index);
      var title = item.name || item.title || "";
      if (isFavorited(title)) {
        var star = document.createElement("div");
        star.className = "star-badge";
        star.textContent = "★";
        card.appendChild(star);
      }
      if (isLive) {
        var origemEl = document.createElement("div");
        origemEl.className = "origem-badge origem-" + origemCanal(item);
        origemEl.textContent = window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.textoOrigens(item) : rotuloOrigem(item);
        card.appendChild(origemEl);
      }
      var mediaWrap = document.createElement("div");
      mediaWrap.className = "card-media-wrap";
      if (isLive) {
        if (item.logo) {
          var img = document.createElement("img");
          img.className = "channel-logo";
          img.src = item.logo;
          img.loading = "lazy";
          img.onerror = function () {
            return img.replaceWith(createPlaceholder(item.name));
          };
          mediaWrap.appendChild(img);
        } else {
          mediaWrap.appendChild(createPlaceholder(item.name));
          if (window.SaimoLogos) SaimoLogos.pedir(item, mediaWrap);
        }
      } else if (item.posterUrl) {
        var poster = document.createElement("img");
        poster.className = "vod-poster";
        poster.src = item.posterUrl;
        poster.loading = "lazy";
        poster.onerror = function () {
          return poster.replaceWith(createPlaceholder(item.title));
        };
        mediaWrap.appendChild(poster);
      } else mediaWrap.appendChild(createPlaceholder(item.title));
      var info = document.createElement("div");
      info.className = "channel-info";
      var name = document.createElement("div");
      name.className = "channel-name";
      name.textContent = title;
      var meta = document.createElement("div");
      meta.className = "channel-meta";
      if (isLive) {
        var now = item.epgNow ? item.epgNow : "Ao vivo";
        meta.innerHTML = '<span class="source-badge">' + now + "</span>";
      } else {
        var tag = item.categoryTag || (item.type === "movie" ? "Filme" : "Serie");
        meta.innerHTML = '<span class="year-badge">' + tag + (item.year ? " · " + item.year : "") + "</span>";
      }
      info.appendChild(name);
      info.appendChild(meta);
      card.appendChild(mediaWrap);
      card.appendChild(info);
      if (isLive) fillNowNext(card, item);
      return card;
    }
    function escHtml(s) {
      return String(s || "").replace(/[&<>"]/g, function (c) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;"
        }[c];
      });
    }
    function fillNowNext(card, channel) {
      if (!window.SaimoEpg || !card || !channel) return;
      SaimoEpg.programas(channel).then(function (list) {
        var nn = SaimoEpg.nowNext(list);
        var meta = card.querySelector(".channel-meta");
        if (!meta) return;
        if (!nn || !nn.current) {
          meta.innerHTML = '<span class="source-badge">Ao vivo</span>';
          return;
        }
        meta.innerHTML = '<div class="now-next"><div class="now-title"><span>' + escHtml(nn.current.title) + "</span></div>" + (nn.next ? '<div class="next-title"><span>A seguir · ' + escHtml(nn.next.title) + "</span></div>" : "") + '<div class="now-bar"><span style="width:' + Math.round(nn.progress * 100) + '%"></span></div></div>';
        if (card.classList.contains("focused")) prepararRolagem(card);
      });
    }
    function paintCast(container, elenco) {
      if (!container) return;
      container.innerHTML = "";
      (elenco || []).slice(0, 8).forEach(function (p) {
        var el = document.createElement("div");
        el.className = "cast-card";
        if (p.foto) {
          var img = document.createElement("img");
          img.src = p.foto;
          img.alt = p.nome;
          el.appendChild(img);
        } else {
          var ph = document.createElement("div");
          ph.className = "cast-placeholder";
          ph.textContent = (p.nome || "?").charAt(0);
          el.appendChild(ph);
        }
        var nm = document.createElement("div");
        nm.className = "cast-name";
        nm.textContent = p.nome;
        var role = document.createElement("div");
        role.className = "cast-role";
        role.textContent = p.papel;
        el.appendChild(nm);
        el.appendChild(role);
        container.appendChild(el);
      });
    }
    function markOverviewScroll(el) {
      if (!el) return;
      el.classList.toggle("can-scroll", el.scrollHeight > el.clientHeight + 4);
    }
    function cardDaFicha(el) {
      return el && el.closest ? el.closest(".ficha-card") : null;
    }
    function cardPodeDescer(card) {
      return !!(card && card.scrollTop + card.clientHeight < card.scrollHeight - 8);
    }
    function cardPodeSubir(card) {
      return !!(card && card.scrollTop > 0);
    }
    function rolarFicha(card, dir) {
      if (!card) return;
      var max = Math.max(0, card.scrollHeight - card.clientHeight);
      card.scrollTop = Math.max(0, Math.min(max, card.scrollTop + dir * 120));
    }
    function soltarFocoParaRolar() {
      if (currentFocusedElement) currentFocusedElement.classList.remove("focused");
      currentFocusedElement = null;
    }
    function alvoAbaixoDaFicha(card, el) {
      if (!card || !el || el.classList && el.classList.contains("hidden")) return false;
      var c = card.getBoundingClientRect();
      var r = el.getBoundingClientRect();
      if (r.height < 1) return false;
      return r.top > c.bottom - 24;
    }
    function createPlaceholder(title) {
      var div = document.createElement("div");
      div.className = "channel-logo-placeholder";
      div.textContent = (title || "S").trim().charAt(0).toUpperCase();
      return div;
    }
    function executeCard(index) {
      var item = activeItemList[index];
      if (!item) return;
      returnScreen = "catalog";
      if (item.type === "channel" || item.isLive) {
        launchPlayer({
          name: item.name,
          category: item.category,
          logo: item.logo,
          isLive: true,
          xtream: !!item.xtream,
          sources: item.sources
        }, item, null);
      } else if (item.type === "movie") openInfoPanel(item);else if (item.type === "series") openSeriesScreen(item);
    }
    function visibleInfoButtons() {
      return [infoEls.btnPlay, infoEls.btnResume, infoEls.btnFav, infoEls.btnTrailer].filter(function (b) {
        return b && !b.classList.contains("hidden");
      });
    }
    function focusInfoButton() {
      var btns = visibleInfoButtons();
      if (!btns.length) return;
      if (infoBtnIndex >= btns.length) infoBtnIndex = 0;
      setFocus(btns[infoBtnIndex]);
    }
    function paintStars(nota, el) {
      var target = el || infoEls.stars;
      if (!target) return;
      var n = Number(nota) || 0;
      target.textContent = n ? "★ " + (Math.round(n * 10) / 10).toFixed(1) : "";
    }
    function visibleSeriesFichaButtons() {
      return [seriesEls.btnPlay, seriesEls.btnFav, seriesEls.btnEpisodes].filter(function (b) {
        return b && !b.classList.contains("hidden");
      });
    }
    function focusSeriesFichaButton() {
      var btns = visibleSeriesFichaButtons();
      if (!btns.length) return;
      if (seriesBtnIndex >= btns.length) seriesBtnIndex = 0;
      setFocus(btns[seriesBtnIndex]);
    }
    function seriesPlayLabel() {
      var eps = currentSeriesItem && currentSeriesItem.episodes || [];
      var last = getLastWatched();
      if (last && last.seriesItem && currentSeriesItem && last.seriesItem.title === currentSeriesItem.title && last.epIndex >= 0) {
        var ep = eps[last.epIndex];
        if (ep) return "▶  Continuar " + ep.title;
      }
      var first = eps[0];
      if (first) {
        var s = first.season != null ? first.season : 1;
        var e = first.episode != null ? first.episode : 1;
        return "▶  Assistir T" + s + " E" + e;
      }
      return "▶  Assistir";
    }
    function formatDuracao(min) {
      var n = Math.round(Number(min) || 0);
      if (!n) return "";
      var h = Math.floor(n / 60);
      var m = n % 60;
      if (h && m) return h + "h " + m + "min";
      if (h) return h + "h";
      return m + " min";
    }
    function formatHms(min) {
      var t = Math.round((min || 0) * 60);
      if (!t) return "";
      var h = Math.floor(t / 3600);
      var m = Math.floor(t % 3600 / 60);
      var s = t % 60;
      return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }
    function setTrailer(key) {
      infoTrailerKey = key || "";
      if (infoEls.btnTrailer) {
        if (infoTrailerKey) infoEls.btnTrailer.classList.remove("hidden");else infoEls.btnTrailer.classList.add("hidden");
      }
    }
    function closeTrailer() {
      if (trailerFrame) trailerFrame.src = "";
      if (trailerOverlay) trailerOverlay.classList.remove("active");
      if (currentScreen === "trailer") {
        currentScreen = "info";
        showScreen("info");
        infoPanel.classList.add("active");
        focusInfoButton();
      }
    }
    function playTrailer() {
      if (!infoTrailerKey) return;
      if (window.webOS && webOS.service && webOS.service.request) {
        try {
          webOS.service.request("luna://com.webos.applicationManager", {
            method: "launch",
            parameters: {
              id: "youtube.leanback.v4",
              params: {
                contentTarget: "https://www.youtube.com/tv?v=" + infoTrailerKey
              }
            }
          });
          return;
        } catch (e) {
          if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("youtube_abrir_erro", (e && e.message) || "");
        }
      }
      if (trailerFrame) trailerFrame.src = "https://www.youtube.com/embed/" + infoTrailerKey + "?autoplay=1&rel=0";
      if (trailerOverlay) trailerOverlay.classList.add("active");
      currentScreen = "trailer";
    }
    function certColor(n) {
      if (/18/.test(n)) return "#ef4444";
      if (/16/.test(n)) return "#f97316";
      if (/14/.test(n)) return "#eab308";
      if (/12/.test(n)) return "#3b82f6";
      return "#22c55e";
    }
    function fichaMinimaDoItem(item) {
      if (!item || !window.SaimoFicha) return null;
      var isSeries = item.type === "series";
      var local = SaimoFicha.localDe(item.title, isSeries);
      var meta = SaimoFicha.metaDe(item.title, isSeries);
      var capa = item.posterUrl || SaimoFicha.capaDe(item.title, isSeries) || local && local.capa || "";
      if (!local && !meta && !capa) return null;
      return {
        sinopse: local && local.sinopse || "",
        ano: local && local.ano || item.year || "",
        nota: local && local.nota || 0,
        generos: local && local.generos || meta && meta.generos || [],
        capa: capa,
        fundo: capa,
        elenco: local && local.elenco || [],
        frase: "",
        duracao: local && local.duracao || 0,
        classificacao: "",
        assinatura: local && local.assinatura || "",
        produtora: ""
      };
    }
    function paintCreditLines(container, linhas) {
      if (!container) return;
      container.innerHTML = "";
      var visiveis = (linhas || []).filter(function (l) {
        return l && l.valor;
      });
      container.classList.toggle("hidden", !visiveis.length);
      visiveis.forEach(function (l) {
        var row = document.createElement("div");
        row.className = "ficha-credit";
        var k = document.createElement("span");
        k.textContent = l.rotulo;
        var v = document.createElement("b");
        v.textContent = l.valor;
        row.appendChild(k);
        row.appendChild(v);
        container.appendChild(row);
      });
    }
    function nomeArquivoFonte(url) {
      var limpo = String(url || "").split("?")[0];
      var parts = limpo.split("/").filter(Boolean);
      var nome = parts[parts.length - 1] || "fonte";
      try {
        nome = decodeURIComponent(nome);
      } catch (e) {}
      return nome;
    }
    function rotuloAudioFonte(s) {
      if (window.SaimoFontePref) return SaimoFontePref.nomeAudio(s);
      var a = String(s && s.audio || "DUB").toUpperCase();
      var audio = a.indexOf("LEG") === 0 ? "Legendado" : "Dublado";
      if (s && s.suaLista) return audio + " · lista";
      return audio;
    }
    function renderInfoFontes(sources) {
      infoSources = sources || [];
      var grid = infoEls.fontes;
      if (!grid) return;
      grid.innerHTML = "";
      if (infoEls.fontesBloco) infoEls.fontesBloco.classList.toggle("hidden", !infoSources.length);
      infoSources.forEach(function (s, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "fonte-card";
        var rot = window.SaimoFontePref ? SaimoFontePref.rotulo(s, i) : null;
        var audio = document.createElement("span");
        audio.className = "fonte-audio";
        audio.textContent = rot ? rot.nome : rotuloAudioFonte(s);
        var file = document.createElement("span");
        file.className = "fonte-file";
        file.textContent = rot ? rot.qualidade || (s.suaLista ? "Sua lista" : "") : s.suaLista ? "Sua lista" : "";
        var n = document.createElement("span");
        n.className = "fonte-n";
        n.textContent = rot ? rot.n : "Fonte " + (i + 1);
        btn.appendChild(n);
        btn.appendChild(audio);
        btn.appendChild(file);
        btn.addEventListener("click", function () {
          return playInfoItem(false, i);
        });
        grid.appendChild(btn);
      });
      if (infoSourceIndex >= infoSources.length) infoSourceIndex = 0;
    }
    function pintarFichaNaInfo(ficha, item) {
      if (!ficha) return;
      infoEls.tagline.textContent = ficha.frase || "";
      infoEls.tagline.classList.toggle("hidden", !ficha.frase);
      infoEls.year.textContent = ficha.ano || item.year || "";
      paintStars(ficha.nota || 0);
      infoEls.runtime.textContent = ficha.duracao ? formatDuracao(ficha.duracao) : "";
      infoEls.cert.textContent = ficha.classificacao || "";
      if (infoEls.cert && ficha.classificacao) infoEls.cert.style.color = certColor(ficha.classificacao);
      if (infoEls.sources) infoEls.sources.textContent = "";
      paintCreditLines(infoEls.credits, [{
        rotulo: "Direção",
        valor: ficha.assinatura || ""
      }, {
        rotulo: "Roteiro",
        valor: ficha.roteiro || ""
      }, {
        rotulo: "Produção",
        valor: ficha.produtora || ""
      }]);
      infoEls.category.textContent = (ficha.generos || []).slice(0, 3).join(" · ") || infoEls.category.textContent;
      if (ficha.trailer) setTrailer(ficha.trailer);
      infoEls.overview.textContent = ficha.sinopse || "Sinopse indisponível.";
      if (infoEls.backdrop) infoEls.backdrop.style.backgroundImage = "";
      if (ficha.capa) {
        infoEls.poster.src = ficha.capa;
        infoEls.poster.classList.add("visible");
      }
      paintCast(infoEls.cast, ficha.elenco || []);
      markOverviewScroll(infoEls.overview);
    }
    function openInfoPanel(_x15) {
      return _openInfoPanel.apply(this, arguments);
    }
    function _openInfoPanel() {
      _openInfoPanel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(item) {
        var local, fontesOrdenadas, prog, ficha, n, n2, _t12;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              infoItem = item;
              infoOverviewTop = 0;
              infoZone = "buttons";
              infoCastIndex = 0;
              currentScreen = "info";
              showScreen("info");
              infoEls.type.textContent = item.type === "series" ? "SÉRIE" : "FILME";
              infoEls.title.textContent = item.title;
              infoEls.tagline.textContent = "";
              infoEls.year.textContent = item.year || "";
              infoEls.rating.textContent = "";
              infoEls.runtime.textContent = "";
              paintStars(0);
              setTrailer("");
              infoEls.cert.textContent = "";
              if (infoEls.sources) infoEls.sources.textContent = "";
              if (infoEls.tagline) infoEls.tagline.classList.add("hidden");
              paintCreditLines(infoEls.credits, []);
              infoEls.category.textContent = item.categoryTag || item.section || "";
              infoEls.overview.textContent = "Carregando ficha...";
              infoEls.overview.scrollTop = 0;
              if (!infoEls.cast.children.length) infoEls.cast.innerHTML = "";
              infoEls.poster.classList.remove("visible");
              if (item.posterUrl) {
                infoEls.poster.src = window.SaimoCapas ? SaimoCapas.urlLeve(item.posterUrl) : item.posterUrl;
                infoEls.poster.classList.add("visible");
              }
              if (infoEls.backdrop) infoEls.backdrop.style.backgroundImage = "";
              infoEls.btnFav.textContent = isFavorited(item.title) ? "★  Favorito" : "Favoritar";
              fontesOrdenadas = window.SaimoAjustes ? SaimoAjustes.ordenarFontes(item.sources || [], "") : item.sources || [];
              infoSourceIndex = 0;
              renderInfoFontes(fontesOrdenadas);
              prog = getProgress(item);
              if (progressoResumivel(prog)) {
                infoEls.progressWrap.classList.remove("hidden");
                infoEls.btnResume.classList.remove("hidden");
                infoEls.progressLabel.textContent = "Parou em " + player.formatTime(prog.currentTime);
                infoEls.progressBar.style.width = Math.min(100, prog.currentTime / prog.duration * 100) + "%";
                infoBtnIndex = 1;
              } else {
                infoEls.progressWrap.classList.add("hidden");
                infoEls.btnResume.classList.add("hidden");
                infoBtnIndex = 0;
              }
              focusInfoButton();
              _context19.n = 1;
              return enrichItem(item);
            case 1:
              if (!(infoItem !== item)) {
                _context19.n = 2;
                break;
              }
              return _context19.a(2);
            case 2:
              fontesOrdenadas = window.SaimoAjustes ? SaimoAjustes.ordenarFontes(item.sources || [], "") : item.sources || [];
              renderInfoFontes(fontesOrdenadas);
              if (!window.SaimoFicha) {
                _context19.n = 4;
                break;
              }
              _context19.n = 3;
              return SaimoFicha.ensureIndex();
            case 3:
              local = SaimoFicha.localDe(item.title, item.type === "series");
              if (local && local.sinopse) {
                infoEls.overview.textContent = local.sinopse;
                if (local.ano) infoEls.year.textContent = local.ano;
                if (local.nota) paintStars(local.nota);
                if (local.duracao) infoEls.runtime.textContent = formatDuracao(local.duracao);
                if (local.generos && local.generos.length) infoEls.category.textContent = local.generos.slice(0, 3).join(" · ");
                paintCreditLines(infoEls.credits, [{
                  rotulo: "Direção",
                  valor: local.assinatura || ""
                }, {
                  rotulo: "Roteiro",
                  valor: local.roteiro || ""
                }, {
                  rotulo: "Produção",
                  valor: local.produtora || ""
                }]);
                paintCast(infoEls.cast, local.elenco);
              }
            case 4:
              ficha = null;
              if (!window.SaimoFicha) {
                _context19.n = 8;
                break;
              }
              _context19.p = 4;
              _context19.n = 5;
              return SaimoFicha.de(item.title, item.type === "series");
            case 5:
              ficha = _context19.v;
              _context19.n = 8;
              break;
            case 6:
              _context19.p = 6;
              _t12 = _context19.v;
              ficha = null;
              if (!(infoItem !== item)) {
                _context19.n = 8;
                break;
              }
              return _context19.a(2);
            case 8:
              if (infoItem !== item) return _context19.a(2);
              if (!ficha) ficha = fichaMinimaDoItem(item);
              if (!ficha) {
                _context19.n = 9;
                break;
              }
              pintarFichaNaInfo(ficha, item);
              _context19.n = 11;
              break;
            case 9:
              n = (item.sources || []).length;
              infoEls.overview.textContent = n ? "Pronto para assistir — " + n + " fonte(s) encontrada(s)." : "Buscando fontes… Se não tocar, verifique a conexão e tente de novo.";
              infoEls.sources.textContent = n + " fontes";
              markOverviewScroll(infoEls.overview);
              if (n) {
                _context19.n = 11;
                break;
              }
              _context19.n = 10;
              return enrichItem(item);
            case 10:
              n2 = (item.sources || []).length;
              infoEls.sources.textContent = "";
              renderInfoFontes(window.SaimoAjustes ? SaimoAjustes.ordenarFontes(item.sources || [], "") : item.sources || []);
              if (n2) {
                infoEls.overview.textContent = "Pronto para assistir — " + n2 + " fonte(s) encontrada(s).";
              } else {
                infoEls.overview.textContent = "Nenhuma fonte de reprodução encontrada para este título.";
              }
              markOverviewScroll(infoEls.overview);
            case 11:
              return _context19.a(2);
          }
        }, _callee19, null, [[4, 6]]);
      }));
      return _openInfoPanel.apply(this, arguments);
    }
    function closeInfoPanel() {
      infoPanel.classList.remove("active");
      if (telaAcervo === "browse") {
        restaurarBrowse();
        return;
      }
      if (returnScreen === "home" || returnScreen === "search") {
        if (returnScreen === "search") {
          currentScreen = "search";
          showScreen("search");
          updateSearchFocus();
        } else returnToHome();
        return;
      }
      currentScreen = "catalog";
      catalogZone = "grid";
      showScreen("catalog");
      updateCatalogFocus();
    }
    function playInfoItem(_x16, _x17) {
      return _playInfoItem.apply(this, arguments);
    }
    function _playInfoItem() {
      _playInfoItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(fromResume, sourceIndex) {
        var sources, ix, escolhida, prog, start;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              if (infoItem) {
                _context20.n = 1;
                break;
              }
              return _context20.a(2);
            case 1:
              _context20.n = 2;
              return enrichItem(infoItem);
            case 2:
              sources = infoSources.length ? infoSources.slice() : window.SaimoAjustes ? SaimoAjustes.ordenarFontes(infoItem.sources || [], "") : infoItem.sources || [];
              ix = typeof sourceIndex === "number" ? sourceIndex : -1;
              if (ix > 0 && ix < sources.length) {
                escolhida = sources[ix];
                sources = [escolhida].concat(sources.filter(function (_, i) {
                  return i !== ix;
                }));
              }
              if (sources.length) {
                _context20.n = 3;
                break;
              }
              player.showStatus("Fonte indisponível. Verifique a internet.");
              if (infoEls.sources) infoEls.sources.textContent = "0 fontes";
              return _context20.a(2);
            case 3:
              prog = getProgress(infoItem);
              start = fromResume && progressoResumivel(prog) ? prog.currentTime : 0;
              launchPlayer({
                name: infoItem.title,
                category: "Filme" + (infoItem.year ? " (" + infoItem.year + ")" : ""),
                logo: infoItem.posterUrl,
                isLive: false,
                sources: sources,
                resumeTime: start,
                vodItem: infoItem
              }, infoItem, null);
            case 4:
              return _context20.a(2);
          }
        }, _callee20);
      }));
      return _playInfoItem.apply(this, arguments);
    }
    function uniqueSorted(arr) {
      return Array.from(new Set(arr)).sort(function (a, b) {
        var na = parseInt(a, 10);
        var nb = parseInt(b, 10);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return String(a).localeCompare(String(b));
      });
    }
    function seasonEq(a, b) {
      var na = parseInt(a, 10);
      var nb = parseInt(b, 10);
      if (!isNaN(na) && !isNaN(nb)) return na === nb;
      return String(a) === String(b);
    }
    function epTemAudio(ep, ver) {
      return (ep.sources || []).some(function (s) {
        return (s.audio || "DUB") === ver;
      });
    }
    function fontesDoEp(ep) {
      var all = ep && ep.sources || [];
      var ver = seriesVersions[seriesVersionIndex];
      if (!ver) return all;
      var filtradas = all.filter(function (s) {
        return (s.audio || "DUB") === ver;
      });
      return filtradas.length ? filtradas : all;
    }
    function episodesForSeason(season, ver) {
      if (!currentSeriesItem) return [];
      var list = (currentSeriesItem.episodes || []).filter(function (e) {
        return seasonEq(e.season, season);
      });
      if (ver) {
        var filtered = list.filter(function (e) {
          return epTemAudio(e, ver);
        });
        if (filtered.length) list = filtered;
      }
      return list;
    }
    function rotuloEpisodio(ep, nome) {
      var n = ep && ep.episode != null ? ep.episode : "";
      if (n && nome) return n + ". " + nome;
      if (nome) return nome;
      if (n) return n + ". " + (ep && ep.title || "Episódio");
      return ep && ep.title || "Episódio";
    }
    function buildEpCard(ep, modo) {
      var card = document.createElement("div");
      card.className = "ep-card";
      var thumb = document.createElement("img");
      thumb.className = "ep-thumb";
      thumb.src = currentSeriesItem.posterUrl || "";
      var body = document.createElement("div");
      body.className = "ep-body";
      var name = document.createElement("div");
      name.className = "ep-name";
      name.textContent = modo === "ficha" ? rotuloEpisodio(ep) : ep.title || "";
      var sub = document.createElement("div");
      sub.className = "ep-sub";
      var prog = getProgress(currentSeriesItem, ep);
      if (modo === "ficha") {
        sub.textContent = progressoResumivel(prog) ? "Parou em " + player.formatTime(prog.currentTime) : "";
      } else {
        sub.textContent = progressoResumivel(prog) ? "Parou em " + player.formatTime(prog.currentTime) : (ep.sources || []).length + " fonte(s)";
      }
      var sin = document.createElement("div");
      sin.className = "ep-sinopse";
      var bar = document.createElement("div");
      bar.className = "ep-progress";
      var fill = document.createElement("span");
      fill.style.width = progressoResumivel(prog) && prog.duration ? Math.min(100, prog.currentTime / prog.duration * 100) + "%" : "0%";
      bar.appendChild(fill);
      body.appendChild(name);
      body.appendChild(sub);
      if (modo === "ficha") body.appendChild(sin);
      card.appendChild(thumb);
      card.appendChild(body);
      card.appendChild(bar);
      return card;
    }
    function syncSeriesEpisodeLists() {
      if (!currentSeriesItem) return;
      var season = seriesSeasons[seriesSeasonIndex];
      var ver = seriesVersions[seriesVersionIndex];
      seriesEpisodesView = episodesForSeason(season, ver);
      renderSeriesEpisodes();
      renderFichaSeasons();
      renderSeriesFichaEpisodes();
    }
    function renderFichaSeasons() {
      var box = seriesEls.fichaSeasons;
      if (!box) return;
      box.innerHTML = "";
      if (seriesSeasons.length < 2) {
        box.classList.add("hidden");
        return;
      }
      box.classList.remove("hidden");
      seriesSeasons.forEach(function (s, i) {
        var el = document.createElement("div");
        el.className = "pill" + (i === seriesSeasonIndex ? " active" : "");
        el.textContent = "Temporada " + s;
        box.appendChild(el);
      });
    }
    function pintarFichaSerie(ficha, item) {
      if (!ficha) return;
      if (seriesEls.tagline) {
        seriesEls.tagline.textContent = ficha.frase || "";
        seriesEls.tagline.classList.toggle("hidden", !ficha.frase);
      }
      paintStars(ficha.nota || 0, seriesEls.stars);
      if (seriesEls.year) seriesEls.year.textContent = ficha.ano || item && item.year || "";
      if (seriesEls.seasonsPill) {
        var t = ficha.temporadas || seriesSeasons.length || 0;
        seriesEls.seasonsPill.textContent = t ? t + (t === 1 ? " temporada" : " temporadas") : "";
      }
      if (seriesEls.cert) {
        seriesEls.cert.textContent = ficha.classificacao || "";
        seriesEls.cert.style.color = ficha.classificacao ? certColor(ficha.classificacao) : "";
      }
      if (seriesEls.genres) seriesEls.genres.textContent = (ficha.generos || []).slice(0, 3).join(" · ");
      if (seriesEls.overview) seriesEls.overview.textContent = ficha.sinopse || "Sinopse indisponível.";
      paintCreditLines(seriesEls.credits, [{
        rotulo: "Criação",
        valor: ficha.assinatura || ""
      }, {
        rotulo: "Produção",
        valor: ficha.produtora || ""
      }]);
      if (seriesEls.backdrop) seriesEls.backdrop.style.backgroundImage = "";
      var capa = ficha.capa || item && item.posterUrl || "";
      if (seriesEls.poster && capa) {
        seriesEls.poster.src = capa;
        seriesEls.poster.classList.add("visible");
      }
      paintCast(seriesEls.cast, ficha.elenco || []);
      markOverviewScroll(seriesEls.overview);
    }
    function renderSeriesFichaEpisodes() {
      if (!seriesEls.fichaEpisodes) return;
      seriesEls.fichaEpisodes.innerHTML = "";
      var season = seriesSeasons[seriesSeasonIndex];
      var ver = seriesVersions[seriesVersionIndex];
      var list = episodesForSeason(season, ver);
      if (seriesEls.epCount) {
        seriesEls.epCount.textContent = list.length ? list.length + (list.length === 1 ? " episódio" : " episódios") : "";
      }
      if (!list.length) {
        var msg = document.createElement("div");
        msg.className = "series-ep-empty";
        msg.textContent = (currentSeriesItem.episodes || []).length ? "Nenhum episódio nesta temporada/áudio." : "Carregando episódios...";
        seriesEls.fichaEpisodes.appendChild(msg);
        return;
      }
      list.forEach(function (ep, i) {
        var card = buildEpCard(ep, "ficha");
        if (seriesZone === "ficha-eps" && i === seriesFichaEpIndex) card.classList.add("focused");
        seriesEls.fichaEpisodes.appendChild(card);
      });
      if (seriesFichaEpIndex >= list.length) seriesFichaEpIndex = 0;
    }
    function showSeriesFichaView(enriquecer) {
      seriesView = "ficha";
      if (seriesScreen) seriesScreen.classList.remove("ep-list-active");
      if (seriesEls.fichaView) seriesEls.fichaView.classList.remove("hidden");
      if (seriesEls.epView) seriesEls.epView.classList.add("hidden");
      seriesZone = "play";
      seriesBtnIndex = 0;
      syncSeriesEpisodeLists();
      if (enriquecer) enrichSeriesEpisodes();
      updateSeriesFocus();
    }
    function openSeriesEpisodesView() {
      return _openSeriesEpisodesView.apply(this, arguments);
    }
    function _openSeriesEpisodesView() {
      _openSeriesEpisodesView = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              if (currentSeriesItem) {
                _context21.n = 1;
                break;
              }
              return _context21.a(2);
            case 1:
              _context21.n = 2;
              return enrichItem(currentSeriesItem);
            case 2:
              seriesView = "episodes";
              if (seriesScreen) seriesScreen.classList.add("ep-list-active");
              if (seriesEls.fichaView) seriesEls.fichaView.classList.add("hidden");
              if (seriesEls.epView) seriesEls.epView.classList.remove("hidden");
              if (seriesEls.epHeading) seriesEls.epHeading.textContent = currentSeriesItem.title;
              renderSeriesFilters();
              syncSeriesEpisodeLists();
              enrichSeriesEpisodes();
              seriesZone = seriesEpisodesView.length ? "episodes" : "seasons";
              seriesEpIndex = 0;
              updateSeriesFocus();
            case 3:
              return _context21.a(2);
          }
        }, _callee21);
      }));
      return _openSeriesEpisodesView.apply(this, arguments);
    }
    function openSeriesScreen(_x18) {
      return _openSeriesScreen.apply(this, arguments);
    }
    function montarSeriesTelaInicial(item) {
      currentSeriesItem = item;
      currentScreen = "series";
      showScreen("series");
      showSeriesFichaView();
      seriesEls.title.textContent = item.title;
      if (seriesEls.stars) seriesEls.stars.textContent = "";
      if (seriesEls.year) seriesEls.year.textContent = item.year || "";
      if (seriesEls.seasonsPill) seriesEls.seasonsPill.textContent = "";
      if (seriesEls.genres) seriesEls.genres.textContent = "";
      if (seriesEls.tagline) {
        seriesEls.tagline.textContent = "";
        seriesEls.tagline.classList.add("hidden");
      }
      paintCreditLines(seriesEls.credits, []);
      if (seriesEls.cert) seriesEls.cert.textContent = "";
      seriesEls.overview.textContent = "Carregando...";
      if (seriesEls.cast) seriesEls.cast.innerHTML = "";
      if (seriesEls.backdrop) seriesEls.backdrop.style.backgroundImage = "";
      if (seriesEls.poster) {
        seriesEls.poster.classList.remove("visible");
        if (item.posterUrl) {
          seriesEls.poster.src = window.SaimoCapas ? SaimoCapas.urlLeve(item.posterUrl) : item.posterUrl;
          seriesEls.poster.classList.add("visible");
        }
      }
      if (seriesEls.btnFav) {
        seriesEls.btnFav.textContent = isFavorited(item.title) ? "★  Favorito" : "Favoritar";
      }
    }
    function sincronizarEpisodiosSeries(item) {
      var eps = item.episodes || [];
      var last = getLastWatched();
      var startSeason;
      var ep;
      seriesSeasons = uniqueSorted(eps.map(function (e) {
        return String(e.season);
      }));
      if (!seriesSeasons.length) seriesSeasons = ["1"];
      startSeason = seriesSeasons[0];
      if (last && last.seriesItem && last.seriesItem.title === item.title && last.epIndex >= 0) {
        ep = eps[last.epIndex];
        if (ep) startSeason = String(ep.season);
      }
      seriesSeasonIndex = Math.max(0, seriesSeasons.indexOf(startSeason));
      rebuildSeriesVersions();
      syncSeriesEpisodeLists();
      enrichSeriesEpisodes();
      seriesEls.btnPlay.textContent = seriesPlayLabel();
    }
    function _openSeriesScreen() {
      _openSeriesScreen = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(item) {
        var eps, last, startSeason, ep, local, ficha, _t13;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              montarSeriesTelaInicial(item);
              sincronizarEpisodiosSeries(item);
              focusSeriesFichaButton();
              _context22.n = 1;
              return enrichItem(item);
            case 1:
              if (!(currentSeriesItem !== item)) {
                _context22.n = 2;
                break;
              }
              return _context22.a(2);
            case 2:
              sincronizarEpisodiosSeries(item);
              if (!window.SaimoFicha) {
                _context22.n = 4;
                break;
              }
              _context22.n = 3;
              return SaimoFicha.ensureIndex();
            case 3:
              local = SaimoFicha.localDe(item.title, true);
              if (local && local.sinopse) pintarFichaSerie(local, item);
            case 4:
              if (!window.SaimoFicha) {
                _context22.n = 9;
                break;
              }
              ficha = null;
              _context22.p = 4;
              _context22.n = 5;
              return SaimoFicha.de(item.title, true);
            case 5:
              ficha = _context22.v;
              _context22.n = 7;
              break;
            case 6:
              _context22.p = 6;
              _t13 = _context22.v;
              ficha = null;
            case 7:
              if (!(currentSeriesItem !== item)) {
                _context22.n = 8;
                break;
              }
              return _context22.a(2);
            case 8:
              if (ficha) pintarFichaSerie(ficha, item);else if (!seriesEls.overview.textContent || seriesEls.overview.textContent === "Carregando...") {
                seriesEls.overview.textContent = "Não foi possível carregar a ficha agora.";
              }
              markOverviewScroll(seriesEls.overview);
            case 9:
              return _context22.a(2);
          }
        }, _callee22, null, [[4, 6]]);
      }));
      return _openSeriesScreen.apply(this, arguments);
    }
    function rebuildSeriesVersions() {
      var season = seriesSeasons[seriesSeasonIndex];
      var eps = (currentSeriesItem.episodes || []).filter(function (e) {
        return seasonEq(e.season, season);
      });
      var audios = [];
      eps.forEach(function (e) {
        return (e.sources || []).forEach(function (s) {
          var a = s.audio || "DUB";
          if (audios.indexOf(a) === -1) audios.push(a);
        });
      });
      seriesVersions = uniqueSorted(audios);
      if (!seriesVersions.length) seriesVersions = ["DUB"];
      var pref = window.SaimoAjustes ? SaimoAjustes.get("audioPref") : "dub";
      var want = pref === "leg" ? "LEG" : "DUB";
      var ix = seriesVersions.indexOf(want);
      seriesVersionIndex = ix >= 0 ? ix : 0;
    }
    function renderSeriesFilters() {
      seriesEls.seasons.innerHTML = "";
      seriesSeasons.forEach(function (s, i) {
        var el = document.createElement("div");
        el.className = "pill" + (i === seriesSeasonIndex ? " active" : "");
        el.textContent = "T" + s;
        seriesEls.seasons.appendChild(el);
      });
      seriesEls.versions.innerHTML = "";
      seriesVersions.forEach(function (v, i) {
        var el = document.createElement("div");
        el.className = "pill" + (i === seriesVersionIndex ? " active" : "");
        el.textContent = v === "LEG" ? "Legendado" : "Dublado";
        seriesEls.versions.appendChild(el);
      });
    }
    function renderSeriesEpisodes() {
      if (!seriesEls.episodes || !currentSeriesItem) return;
      seriesEls.episodes.innerHTML = "";
      if (!seriesEpisodesView.length) {
        var msg = document.createElement("div");
        msg.className = "series-ep-empty";
        msg.textContent = (currentSeriesItem.episodes || []).length ? "Nenhum episódio nesta temporada." : "Episódios indisponíveis.";
        seriesEls.episodes.appendChild(msg);
        return;
      }
      seriesEpisodesView.forEach(function (ep, i) {
        var card = buildEpCard(ep);
        if (seriesView === "episodes" && seriesZone === "episodes" && i === seriesEpIndex) card.classList.add("focused");
        seriesEls.episodes.appendChild(card);
      });
      if (seriesEpIndex >= seriesEpisodesView.length) seriesEpIndex = 0;
    }
    function enrichSeriesEpisodes() {
      return _enrichSeriesEpisodes.apply(this, arguments);
    }
    function _enrichSeriesEpisodes() {
      _enrichSeriesEpisodes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
        var season, detalhes, paintCard, cards, fichaCards;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              paintCard = function _paintCard(card, ep) {
                if (!card) return;
                var d = detalhes[parseInt(ep.episode, 10)];
                if (!d) return;
                var name = card.querySelector(".ep-name");
                var thumb = card.querySelector(".ep-thumb");
                if (name && d.nome) name.textContent = rotuloEpisodio(ep, d.nome);
                if (thumb && d.imagem) thumb.src = d.imagem;
                var sub = card.querySelector(".ep-sub");
                if (sub && d.duracao && (sub.textContent || "").indexOf("Parou") !== 0) {
                  sub.textContent = formatDuracao(d.duracao);
                }
                var sin = card.querySelector(".ep-sinopse");
                if (sin && d.sinopse) sin.textContent = d.sinopse;
              };
              if (!(!window.SaimoFicha || !currentSeriesItem)) {
                _context23.n = 1;
                break;
              }
              return _context23.a(2);
            case 1:
              season = parseInt(seriesSeasons[seriesSeasonIndex], 10) || 1;
              _context23.n = 2;
              return SaimoFicha.temporada(currentSeriesItem.title, season);
            case 2:
              detalhes = _context23.v;
              cards = seriesEls.episodes ? seriesEls.episodes.children : [];
              seriesEpisodesView.forEach(function (ep, i) {
                return paintCard(cards[i], ep);
              });
              fichaCards = seriesEls.fichaEpisodes ? seriesEls.fichaEpisodes.querySelectorAll(".ep-card") : [];
              seriesEpisodesView.forEach(function (ep, i) {
                return paintCard(fichaCards[i], ep);
              });
            case 3:
              return _context23.a(2);
          }
        }, _callee23);
      }));
      return _enrichSeriesEpisodes.apply(this, arguments);
    }
    function closeSeriesScreen() {
      seriesScreen.classList.remove("active");
      if (telaAcervo === "browse") {
        restaurarBrowse();
        return;
      }
      if (returnScreen === "home" || returnScreen === "search") {
        if (returnScreen === "search") {
          currentScreen = "search";
          showScreen("search");
          updateSearchFocus();
        } else returnToHome();
        return;
      }
      currentScreen = "catalog";
      catalogZone = "grid";
      showScreen("catalog");
      updateCatalogFocus();
    }
    function playSeriesContinue() {
      syncSeriesEpisodeLists();
      var last = getLastWatched();
      if (last && last.seriesItem && currentSeriesItem && last.seriesItem.title === currentSeriesItem.title && last.epIndex >= 0) {
        playSelectedEpisode(last.epIndex);
        return;
      }
      var ep = seriesEpisodesView[0];
      if (!ep) return;
      var idx = (currentSeriesItem.episodes || []).indexOf(ep);
      playSelectedEpisode(idx >= 0 ? idx : 0);
    }
    function playFichaEpisode(index) {
      syncSeriesEpisodeLists();
      var ep = seriesEpisodesView[index];
      if (!ep || !currentSeriesItem) return;
      var idx = (currentSeriesItem.episodes || []).indexOf(ep);
      playSelectedEpisode(idx >= 0 ? idx : 0);
    }
    function updateSeriesFocus() {
      if (seriesView === "ficha") {
        if (seriesZone === "back") setFocus(seriesEls.btnBack);else if (seriesZone === "play") focusSeriesFichaButton();else if (seriesZone === "cast") {
          var cards = seriesEls.cast ? seriesEls.cast.children : [];
          if (seriesCastIndex >= cards.length) seriesCastIndex = 0;
          if (cards[seriesCastIndex]) {
            setFocus(cards[seriesCastIndex]);
            cards[seriesCastIndex].scrollIntoView({
              inline: "nearest",
              block: "nearest"
            });
          } else focusSeriesFichaButton();
        } else if (seriesZone === "overview") soltarFocoParaRolar();else if (seriesZone === "ficha-seasons") {
          var pills = seriesEls.fichaSeasons ? seriesEls.fichaSeasons.children : [];
          if (pills[seriesSeasonIndex]) setFocus(pills[seriesSeasonIndex]);else focusSeriesFichaButton();
        } else if (seriesZone === "ficha-eps") {
          var _cards = seriesEls.fichaEpisodes ? seriesEls.fichaEpisodes.querySelectorAll(".ep-card") : [];
          if (_cards[seriesFichaEpIndex]) {
            setFocus(_cards[seriesFichaEpIndex]);
            _cards[seriesFichaEpIndex].scrollIntoView({
              inline: "nearest",
              block: "nearest"
            });
          } else focusSeriesFichaButton();
        }
        return;
      }
      if (seriesZone === "back") setFocus(seriesEls.btnEpBack || seriesEls.btnBack);else if (seriesZone === "play") setFocus(seriesEls.btnPlay);else if (seriesZone === "cast") {
        var _cards2 = seriesEls.cast ? seriesEls.cast.children : [];
        if (seriesCastIndex >= _cards2.length) seriesCastIndex = 0;
        if (_cards2[seriesCastIndex]) {
          setFocus(_cards2[seriesCastIndex]);
          _cards2[seriesCastIndex].scrollIntoView({
            inline: "nearest",
            block: "nearest"
          });
        } else setFocus(seriesEls.btnPlay);
      } else if (seriesZone === "seasons") {
        var el = seriesEls.seasons.children[seriesSeasonIndex];
        if (el) setFocus(el);
      } else if (seriesZone === "versions") {
        var _el = seriesEls.versions.children[seriesVersionIndex];
        if (_el) setFocus(_el);
      } else {
        var _el2 = seriesEls.episodes.children[seriesEpIndex];
        if (_el2) setFocus(_el2);
      }
    }
    function playSelectedEpisode(epIndex) {
      var ep = currentSeriesItem && currentSeriesItem.episodes ? currentSeriesItem.episodes[epIndex] : null;
      if (!ep) return;
      currentPlayingEpIndex = epIndex;
      var prog = getProgress(currentSeriesItem, ep);
      var start = progressoResumivel(prog) ? prog.currentTime : 0;
      var fontes = fontesDoEp(ep);
      var sources = window.SaimoAjustes ? SaimoAjustes.ordenarFontes(fontes, currentSeriesItem.title) : fontes;
      launchPlayer({
        name: currentSeriesItem.title + " - " + ep.title,
        category: "Serie On Demand",
        logo: currentSeriesItem.posterUrl,
        isLive: false,
        sources: sources,
        resumeTime: start,
        vodItem: currentSeriesItem,
        episode: ep
      }, currentSeriesItem, ep);
    }
    function launchPlayer(_x19, _x20, _x21) {
      return _launchPlayer.apply(this, arguments);
    }
    function _launchPlayer() {
      _launchPlayer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(data, vodItem, ep) {
        var skipMarks, isSeries, tmdb, sources;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              silenciarRadio();
              playingVodItem = vodItem || data.vodItem || null;
              if (currentScreen === "series" || currentScreen === "info" || currentScreen === "catalog" || currentScreen === "home" || currentScreen === "browse" || currentScreen === "eventos" || currentScreen === "guia") {
                returnScreen = currentScreen === "player" ? returnScreen : currentScreen;
              }
              nextCardVisible = false;
              nextEpisodePending = null;
              if (osdElements.nextEpCard) osdElements.nextEpCard.classList.add("hidden");
              currentScreen = "player";
              showScreen("player");
              osdElements.liveBadge.style.display = data.isLive ? "block" : "none";
              if (osdElements.timeDisplay && !data.isLive) osdElements.timeDisplay.style.display = "block";
              skipMarks = [];
              if (!(!data.isLive && window.SaimoFicha && playingVodItem)) {
                _context24.n = 4;
                break;
              }
              isSeries = playingVodItem.type === "series";
              _context24.n = 1;
              return SaimoFicha.ensureIndex();
            case 1:
              _context24.n = 2;
              return SaimoFicha.buscarId(playingVodItem.title, isSeries);
            case 2:
              tmdb = _context24.v;
              if (!tmdb) {
                _context24.n = 4;
                break;
              }
              _context24.n = 3;
              return SaimoFicha.pulos(tmdb, ep ? parseInt(ep.season, 10) : 0, ep ? parseInt(ep.episode, 10) : 0);
            case 3:
              skipMarks = _context24.v;
              autoLoadSubtitles(tmdb, isSeries, ep);
            case 4:
              if (playingVodItem && playingVodItem.type === "series" && data.sources && data.sources[0]) {
                SaimoAjustes.guardarFonte(playingVodItem.title, data.sources[0].url, data.sources, 0);
              }
              SaimoAjustes.aplicar();
              sources = data.sources || [];
              var fonteXt = !!(data.xtream || (vodItem && vodItem.xtream) || sources[0] && sources[0].origemNome === "Xtream");
              if (data.isLive && window.SaimoFontesLive) {
                sources = SaimoFontesLive.ordenar(sources, data.name);
              } else if (!data.isLive && window.SaimoAjustes) {
                var tituloMem = playingVodItem && playingVodItem.type === "series" ? playingVodItem.title : "";
                sources = SaimoAjustes.ordenarFontes(sources, tituloMem);
              }
              if (!data.isLive && window.saimoVodPlayer) {
                window.saimoVodPlayer.iniciar(playingVodItem, ep, data.resumeTime || 0, currentSeriesItem ? currentSeriesItem.episodes || [] : []);
              } else if (data.isLive && window.saimoVodPlayer) {
                window.saimoVodPlayer.fechar();
              }
              if (data.isLive && data.name) lembrarCanalAoVivo(data.name);
              player.playChannel({
                name: data.name,
                category: data.category,
                logo: data.logo,
                sources: sources,
                isLive: data.isLive,
                xtream: !!(data.xtream || playingVodItem && playingVodItem.xtream || fonteXt),
                skipMarks: skipMarks,
                vodItem: playingVodItem,
                episode: ep,
                episodesList: currentSeriesItem ? currentSeriesItem.episodes || [] : []
              }, 0, data.resumeTime || 0);
            case 5:
              return _context24.a(2);
          }
        }, _callee24);
      }));
      return _launchPlayer.apply(this, arguments);
    }
    function autoLoadSubtitles(_x22, _x23, _x24) {
      return _autoLoadSubtitles.apply(this, arguments);
    }
    function _autoLoadSubtitles() {
      _autoLoadSubtitles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(tmdb, isSeries, ep) {
        var wanted, ops, escolhida;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              if (window.SaimoLegendas) {
                _context25.n = 1;
                break;
              }
              return _context25.a(2);
            case 1:
              wanted = SaimoLegendas.idiomaGuardado();
              if (wanted) {
                _context25.n = 2;
                break;
              }
              return _context25.a(2);
            case 2:
              _context25.n = 3;
              return SaimoLegendas.opcoes(tmdb, isSeries, ep ? parseInt(ep.season, 10) : 0, ep ? parseInt(ep.episode, 10) : 0);
            case 3:
              ops = _context25.v;
              escolhida = ops.find(function (o) {
                return o.idioma === wanted;
              }) || ops[0];
              if (!escolhida) {
                _context25.n = 4;
                break;
              }
              _context25.n = 4;
              return SaimoLegendas.carregar(escolhida);
            case 4:
              return _context25.a(2);
          }
        }, _callee25);
      }));
      return _autoLoadSubtitles.apply(this, arguments);
    }
    function showNextEpisodeCard() {
      if (!currentSeriesItem || currentPlayingEpIndex < 0) return;
      var nextIdx = currentPlayingEpIndex + 1;
      var next = currentSeriesItem.episodes[nextIdx];
      if (!next) return;
      nextEpisodePending = nextIdx;
      nextCardVisible = true;
      if (nextEpTitle) nextEpTitle.textContent = next.title;
      if (osdElements.nextEpCard) osdElements.nextEpCard.classList.remove("hidden");
    }
    function playNextEpisode(auto) {
      if (!currentSeriesItem || currentPlayingEpIndex < 0) return false;
      if (playNextEpisode.busy) return false;
      var nextIdx = currentPlayingEpIndex + 1;
      if (nextIdx >= (currentSeriesItem.episodes || []).length) return false;
      if (auto && window.SaimoAjustes && SaimoAjustes.get("autoNext") === false && !nextCardVisible) {
        showNextEpisodeCard();
        return false;
      }
      playNextEpisode.busy = true;
      if (auto) player.showStatus("Próximo episódio...");
      setTimeout(function () {
        playNextEpisode.busy = false;
        playSelectedEpisode(nextIdx);
      }, auto ? 800 : 0);
      return true;
    }
    function voltarNaGrade(nomeCanal) {
      var nome = (nomeCanal || "").trim();
      if (nome && activeItemList.length) {
        var atual = activeItemList[gridIndex];
        var nomeAtual = atual && (atual.name || atual.title || "").trim();
        if (nomeAtual !== nome) {
          var ix = activeItemList.findIndex(function (it) {
            return (it.name || it.title || "").trim() === nome;
          });
          if (ix >= 0) gridIndex = ix;
        }
      }
      if (!activeItemList.length) {
        catalogZone = "categories";
        updateCatalogFocus();
        return;
      }
      if (gridIndex < 0) gridIndex = 0;
      if (gridIndex >= activeItemList.length) gridIndex = activeItemList.length - 1;
      while (renderedCount <= gridIndex && renderedCount < activeItemList.length) {
        renderNextChunk(PAGE_SIZE_STEP);
      }
      var item = activeItemList[gridIndex];
      var card = channelsGrid.children[gridIndex];
      if (card && item) pintarEstrela(card, isFavorited(item.name || item.title || ""));
      catalogZone = "grid";
      updateCatalogFocus();
    }
    function nomeDoItem(item) {
      return item && (item.name || item.title) || "";
    }
    function indiceDoCanal(lista, nome) {
      var chave = buscaChave(nome);
      if (!chave || !lista) return -1;
      for (var i = 0; i < lista.length; i++) {
        if (buscaChave(nomeDoItem(lista[i])) === chave) return i;
      }
      return -1;
    }
    function limparNomeCat(s) {
      return String(s || "").replace(/[♦️⭐●■▪]/g, " ").replace(/\s*[|·]\s*/g, " ").replace(/\s+/g, " ").trim();
    }
    function origemCanal(c) {
      if (window.SaimoCanaisAoVivo) {
        var os = SaimoCanaisAoVivo.origensDoCanal(c);
        return os[0] || "saimo";
      }
      if (!c) return "saimo";
      var s = c.sources && c.sources[0];
      if (c.xtream || s && s.origemNome === "Xtream") return "xtream";
      if (c.suaLista || s && s.suaLista) return "lista";
      return "saimo";
    }
    function origemFonteAtual(c) {
      if (!c) return "saimo";
      var idx = player && c === player.currentChannel ? player.currentSourceIndex : 0;
      var s = c.sources && c.sources[idx] || c.sources && c.sources[0];
      if (window.SaimoCanaisAoVivo) return SaimoCanaisAoVivo.origemFonte(s, c);
      return origemCanal(c);
    }
    function rotuloOrigem(c, fonte) {
      if (window.SaimoCanaisAoVivo) {
        if (fonte) return SaimoCanaisAoVivo.rotuloFonte(fonte, c);
        if (c && c === player.currentChannel) {
          var s = c.sources && c.sources[player.currentSourceIndex];
          return SaimoCanaisAoVivo.rotuloFonte(s, c);
        }
        return SaimoCanaisAoVivo.textoOrigens(c);
      }
      var o = origemCanal(c);
      if (o === "xtream") return "Xtream";
      if (o === "lista") return "Lista";
      return "Saimo";
    }
    function abasAovivo() {
      return window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.ABAS.slice() : ["Favoritos", "Recentes", "TV aberta", "Esportes", "Variedades", "Documentários", "Cinema", "Mais"];
    }
    function indiceAbaAovivoInicial(abas) {
      abas = abas || abasAovivo();
      if (canaisRecentesAoVivo().length) {
        var r = abas.indexOf("Recentes");
        if (r >= 0) return r;
      }
      var a = abas.indexOf("TV aberta");
      return a >= 0 ? a : 0;
    }
    function lembrarCanalAoVivo(nome) {
      if (!nome) return;
      var arr = [];
      try {
        arr = JSON.parse(localStorage.getItem(LIVE_RECENT_KEY) || "[]");
      } catch (e) {}
      if (!Array.isArray(arr)) arr = [];
      arr = arr.filter(function (n) {
        return n !== nome;
      });
      arr.unshift(nome);
      if (arr.length > 30) arr.length = 30;
      try {
        localStorage.setItem(LIVE_RECENT_KEY, JSON.stringify(arr));
      } catch (e2) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "saimo_live_recent: " + ((e2 && e2.message) || ""));
      }
    }
    function canaisRecentesAoVivo() {
      var lives = liveChannels();
      var nomes = [];
      try {
        nomes = JSON.parse(localStorage.getItem(LIVE_RECENT_KEY) || "[]");
      } catch (e) {}
      var out = [];
      var i, j;
      for (i = 0; i < nomes.length; i++) {
        for (j = 0; j < lives.length; j++) {
          if (lives[j].name === nomes[i] || buscaChave(lives[j].name) === buscaChave(nomes[i])) {
            out.push(lives[j]);
            break;
          }
        }
      }
      return out;
    }
    function canalAberto(c) {
      if (window.SaimoCanaisAoVivo) return SaimoCanaisAoVivo.noBalde(c, "TV aberta");
      var t = (limparNomeCat((c && c.category) || "") + " " + limparNomeCat((c && c.name) || "")).toLowerCase();
      return /\b(globo|band|record|sbt|redetv|rede tv|cultura|gazeta|cnn|jovem pan|tv brasil|tv senado|tv camara|canais abertos|abertos)\b/.test(t);
    }
    function listaCategoriasMais() {
      var lives = liveChannels();
      var map = {};
      var i, k;
      for (i = 0; i < lives.length; i++) {
        k = lives[i].category || "Outros";
        if (k === "Todos") continue;
        if (window.SaimoCanaisAoVivo && SaimoCanaisAoVivo.catNoBaldePrincipal(k)) continue;
        map[k] = (map[k] || 0) + 1;
      }
      return Object.keys(map).sort(function (a, b) {
        return limparNomeCat(a).localeCompare(limparNomeCat(b), "pt-BR");
      }).map(function (nome) {
        return { nome: nome, n: map[nome] };
      });
    }
    function ehAbaMais(nome) {
      return String(nome || "").indexOf("Mais") === 0;
    }
    function listaFiltradaAovivo(nome) {
      var lives = liveChannels();
      if (nome === "Favoritos") return lives.filter(function (c) {
        return isFavorited(c.name);
      });
      if (nome === "Recentes") return canaisRecentesAoVivo();
      if (nome === "TV aberta" || nome === "Abertos") return lives.filter(canalAberto);
      if (nome === "Esportes" || nome === "Variedades" || nome === "24 Desenho" || nome === "Infantil" || nome === "Documentários" || nome === "Cinema") {
        return lives.filter(function (c) {
          return window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.noBalde(c, nome) : false;
        });
      }
      if (ehAbaMais(nome)) {
        if (aovivoMaisNome) return lives.filter(function (c) {
          return c.category === aovivoMaisNome;
        });
        return [];
      }
      if (!nome || nome === "Todos") return lives;
      return lives.filter(function (c) {
        return c.category === nome;
      });
    }
    function fecharMaisCategorias() {
      var el = document.getElementById("cats-mais-screen");
      if (el) el.classList.remove("active");
      aovivoMaisNome = "";
      if (catsMaisVolta === "zap") {
        currentScreen = "player";
        var abasZap = abasDaFaixa();
        var ixZap = aovivoMaisAbaAntes;
        if (ixZap < 0 || ixZap >= abasZap.length || ehAbaMais(abasZap[ixZap])) ixZap = indiceAbaAntesMais();
        aplicarAba(ixZap);
        return;
      }
      currentScreen = "catalog";
      catalogZone = "categories";
      var ix = aovivoMaisAbaAntes;
      if (ix < 0) ix = indiceAbaAntesMais();
      selectCategory(ix, true);
      updateCatalogFocus();
    }
    function escolherCategoriaMais(nome) {
      aovivoMaisNome = nome || "";
      var volta = catsMaisVolta;
      var el = document.getElementById("cats-mais-screen");
      if (el) el.classList.remove("active");
      if (volta === "zap") {
        currentScreen = "player";
        zapLista = listaFiltradaAovivo("Mais");
        var ch = player.currentChannel && player.currentChannel.name;
        var i = indiceDoCanal(zapLista, ch);
        zapIndex = i >= 0 ? i : 0;
        pintarAbas();
        pintarFaixa();
        return;
      }
      currentScreen = "catalog";
      var tabs = categoriesBar.querySelectorAll(".cat-tab");
      var ix = 0;
      var t;
      for (t = 0; t < tabs.length; t++) {
        if (ehAbaMais(tabs[t].textContent)) {
          ix = t;
          break;
        }
      }
      selectCategory(ix, true);
      catalogZone = "grid";
      gridIndex = 0;
      updateCatalogFocus();
    }
    function abrirMaisCategorias(volta) {
      catsMaisVolta = volta || "catalog";
      catsMaisItens = listaCategoriasMais();
      catsMaisIndex = 0;
      if (aovivoMaisNome) {
        var p;
        for (p = 0; p < catsMaisItens.length; p++) {
          if (catsMaisItens[p].nome === aovivoMaisNome) {
            catsMaisIndex = p;
            break;
          }
        }
      }
      var grid = document.getElementById("cats-mais-grid");
      var tela = document.getElementById("cats-mais-screen");
      if (!grid || !tela) return;
      grid.innerHTML = "";
      catsMaisItens.forEach(function (item, i) {
        var card = document.createElement("div");
        card.className = "cats-mais-card" + (i === catsMaisIndex ? " focused" : "");
        card.innerHTML = '<div class="cats-mais-nome">' + limparNomeCat(item.nome) + '</div><div class="cats-mais-n">' + item.n + " canais</div>";
        card.addEventListener("click", function () {
          escolherCategoriaMais(item.nome);
        });
        grid.appendChild(card);
      });
      currentScreen = "catsmais";
      tela.classList.add("active");
      var focado = grid.children[catsMaisIndex];
      if (focado) {
        setFocus(focado);
        focado.scrollIntoView({ block: "nearest" });
      }
    }
    function moverMaisCategorias(dx, dy) {
      if (!catsMaisItens.length) return;
      var cols = 5;
      var n = catsMaisItens.length;
      var col = catsMaisIndex % cols;
      var row = Math.floor(catsMaisIndex / cols);
      if (dx) {
        col += dx;
        if (col < 0) col = Math.min(cols - 1, (n - 1) % cols);
        if (col > cols - 1) col = 0;
      }
      if (dy) row += dy;
      var ix = row * cols + col;
      if (ix < 0) ix = n - 1;
      if (ix >= n) ix = col < n ? col : 0;
      catsMaisIndex = ix;
      var grid = document.getElementById("cats-mais-grid");
      if (!grid) return;
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.classList.toggle("focused", i === catsMaisIndex);
      });
      var el = grid.children[catsMaisIndex];
      if (el) {
        setFocus(el);
        el.scrollIntoView({ block: "nearest" });
      }
    }
    function abasDaFaixa() {
      return abasAovivo();
    }
    function listaDaAba(nome) {
      return listaFiltradaAovivo(nome);
    }
    function abaInicial() {
      var ch = player.currentChannel;
      var abas = abasDaFaixa();
      if (ch && isFavorited(ch.name)) {
        var fav = abas.indexOf("Favoritos");
        if (fav >= 0) return fav;
      }
      if (ch && window.SaimoCanaisAoVivo) {
        var nomes = ["TV aberta", "Esportes", "Variedades", "Documentários", "Cinema"];
        var b, ix;
        for (b = 0; b < nomes.length; b++) {
          if (SaimoCanaisAoVivo.noBalde(ch, nomes[b])) {
            ix = abas.indexOf(nomes[b]);
            if (ix >= 0) return ix;
          }
        }
      }
      var cat = abas.indexOf(ch && ch.category);
      if (cat >= 0) return cat;
      var mais = abas.indexOf("Mais");
      return mais >= 0 ? mais : 0;
    }
    function pintarAbas() {
      var bar = document.getElementById("zap-abas");
      if (!bar) return;
      var abas = abasDaFaixa();
      bar.innerHTML = "";
      abas.forEach(function (nome, i) {
        var el = document.createElement("div");
        el.className = "zap-aba" + (i === zapAba ? " ativa" : "");
        el.textContent = nome;
        bar.appendChild(el);
      });
      var ativa = bar.querySelector(".zap-aba.ativa");
      if (ativa) bar.scrollLeft = Math.max(0, ativa.offsetLeft - (bar.clientWidth - ativa.offsetWidth) / 2);
    }
    function marcarFocoFaixa() {
      var faixa = document.getElementById("zap-faixa");
      if (faixa) faixa.classList.toggle("foco-abas", zapZona === "abas");
    }
    function aplicarAba(indice) {
      var abas = abasDaFaixa();
      if (!abas.length) return;
      var abaAntes = zapAba;
      zapAba = (indice % abas.length + abas.length) % abas.length;
      var nomeAba = abas[zapAba];
      if (!ehAbaMais(nomeAba)) aovivoMaisNome = "";
      if (ehAbaMais(nomeAba) && !aovivoMaisNome) {
        if (abaAntes !== zapAba && !ehAbaMais(abas[abaAntes] || "")) aovivoMaisAbaAntes = abaAntes;
        pintarAbas();
        abrirMaisCategorias("zap");
        return;
      }
      zapLista = listaDaAba(nomeAba);
      var nome = player.currentChannel && player.currentChannel.name;
      var i = indiceDoCanal(zapLista, nome);
      zapIndex = i >= 0 ? i : 0;
      pintarAbas();
      pintarFaixa();
    }
    function esconderOsd() {
      if (osdElements.container) osdElements.container.classList.add("hidden");
    }
    function cancelarCanalZap() {
      if (zapPlayTimer) {
        clearTimeout(zapPlayTimer);
        zapPlayTimer = null;
      }
    }
    function agendarCanalZap(item) {
      if (!item) return;
      cancelarCanalZap();
      esconderOsd();
      zapPlayTimer = setTimeout(function () {
        zapPlayTimer = null;
        launchPlayer({
          name: item.name,
          category: item.category,
          logo: item.logo,
          isLive: true,
          sources: item.sources,
          xtream: !!item.xtream
        }, item, null);
      }, 320);
    }
    function tocarFaixa() {
      if (zapTimer) clearTimeout(zapTimer);
      zapTimer = null;
      if (!zapAberta) return;
      zapTimer = setTimeout(fecharFaixa, 10000);
    }
    function fecharFaixa() {
      if (zapTimer) clearTimeout(zapTimer);
      zapTimer = null;
      zapAberta = false;
      zapZona = "canais";
      var atual = document.getElementById("zap-atual");
      if (atual) delete atual.dataset.canal;
      var faixa = document.getElementById("zap-faixa");
      if (faixa) faixa.classList.add("hidden");
    }
    function abrirFaixa() {
      if (!player.isLive || !player.currentChannel) return;
      zapAberta = true;
      esconderOsd();
      var faixa = document.getElementById("zap-faixa");
      if (faixa) {
        faixa.classList.remove("hidden");
        faixa.classList.remove("foco-abas");
      }
      zapZona = "canais";
      aplicarAba(abaInicial());
      tocarFaixa();
    }
    function moverFaixa(delta) {
      if (!zapLista.length) return;
      var prox = zapIndex + delta;
      if (prox < 0 || prox >= zapLista.length) return;
      zapIndex = prox;
      pintarFaixa();
    }
    function deltaTeclaCanal(code) {
      if (code === 33 || code === 427) return 1;
      if (code === 34 || code === 428) return -1;
      return 0;
    }
    function listaZapAoVivo() {
      var abas = abasDaFaixa();
      if (!abas.length) return [];
      var aba = abaInicial();
      return listaDaAba(abas[aba]);
    }
    function trocarCanalAoVivo(delta) {
      if (!player.isLive || !player.currentChannel || !delta) return false;
      if (zapAberta) {
        moverFaixa(delta);
        tocarFaixa();
        return true;
      }
      var lista = activeItemList.length && activeItemList.every(function (it) {
        return it && it.type === "channel";
      }) ? activeItemList : listaZapAoVivo();
      if (!lista.length) return false;
      var ix = indiceDoCanal(lista, player.currentChannel.name);
      if (ix < 0) ix = 0;
      var prox = ix + delta;
      if (prox < 0 || prox >= lista.length) return false;
      var item = lista[prox];
      if (!item) return false;
      var naGrade = activeItemList.findIndex(function (it) {
        return it && it.type === "channel" && buscaChave(nomeDoItem(it)) === buscaChave(nomeDoItem(item));
      });
      if (naGrade >= 0) gridIndex = naGrade;
      agendarCanalZap(item);
      return true;
    }
    function moverFocoCanalGrade(delta) {
      if (!delta) return false;
      var total = activeItemList.length;
      if (!total) return false;
      var prox = gridIndex + delta;
      if (prox < 0 || prox >= total) return false;
      gridIndex = prox;
      if (gridIndex >= renderedCount - 6) renderNextChunk(PAGE_SIZE_STEP);
      updateCatalogFocus();
      return true;
    }
    function moverFocoCanalHome(delta) {
      if (!delta || homeOnLink) return false;
      var row = homeData[homeRow];
      if (!row || !row.live) return false;
      var n = row.items ? row.items.length : 0;
      if (!n) return false;
      var prox = homeCol + delta;
      if (prox < 0 || prox >= n) return false;
      homeCol = prox;
      updateHomeFocus();
      return true;
    }
    function entrarFaixa() {
      var item = zapLista[zapIndex];
      if (!item) return;
      var atual = player.currentChannel && player.currentChannel.name;
      if (buscaChave(nomeDoItem(item)) === buscaChave(atual)) {
        fecharFaixa();
        return;
      }
      var naGrade = activeItemList.findIndex(function (it) {
        return it && it.type === "channel" && buscaChave(nomeDoItem(it)) === buscaChave(nomeDoItem(item));
      });
      if (naGrade >= 0) gridIndex = naGrade;
      launchPlayer({
        name: item.name,
        category: item.category,
        logo: item.logo,
        isLive: true,
        sources: item.sources
      }, item, null);
      esconderOsd();
      pintarFaixa();
    }
    function rolarFaixa() {
      var antigos = document.querySelectorAll("#zap-faixa .rola");
      for (var i = 0; i < antigos.length; i++) {
        antigos[i].classList.remove("rola");
        antigos[i].style.removeProperty("--rola");
        antigos[i].style.removeProperty("--rola-dur");
      }
      var centro = document.querySelector("#zap-faixa .zap-centro");
      if (!centro) return;
      var linhas = centro.querySelectorAll(".zap-nome, .zap-agora, .zap-seguir");
      for (var _i4 = 0; _i4 < linhas.length; _i4++) {
        var el = linhas[_i4];
        var span = el.querySelector("span");
        if (!span || !span.textContent) continue;
        span.style.maxWidth = "none";
        var folga = span.scrollWidth - el.clientWidth;
        span.style.maxWidth = "";
        if (folga > 8) {
          el.style.setProperty("--rola", -folga + "px");
          el.style.setProperty("--rola-dur", Math.max(7, Math.round(folga / 28)) + "s");
          el.classList.add("rola");
        }
      }
    }
    function logoDaFaixa(item) {
      var nome = nomeDoItem(item);
      var wrap = document.createElement("div");
      wrap.className = "zap-logo-wrap";
      if (item.logo) {
        var img = document.createElement("img");
        img.className = "zap-logo";
        img.alt = "";
        img.src = item.logo;
        img.onerror = function () {
          var letra = document.createElement("div");
          letra.className = "zap-logo-letra";
          letra.textContent = (nome || "?").charAt(0).toUpperCase();
          img.replaceWith(letra);
        };
        wrap.appendChild(img);
        return wrap;
      }
      var letra = document.createElement("div");
      letra.className = "zap-logo-letra";
      letra.textContent = (nome || "?").charAt(0).toUpperCase();
      wrap.appendChild(letra);
      if (window.SaimoLogos) SaimoLogos.pedir(item, wrap);
      return wrap;
    }
    function preencherFaixaEpg(card, item, geracao) {
      if (!window.SaimoEpg) return;
      SaimoEpg.programas(item).then(function (list) {
        if (geracao !== zapGeracao || !zapAberta) return;
        var nn = SaimoEpg.nowNext(list);
        var agora = card.querySelector(".zap-agora span");
        var seguir = card.querySelector(".zap-seguir span");
        if (agora) agora.textContent = nn && nn.current && nn.current.title || "Ao vivo";
        if (seguir) seguir.textContent = nn && nn.next && nn.next.title ? "A seguir · " + nn.next.title : "";
        aplicarBarraPrograma(card.querySelector(".prog-canal"), nn);
        if (card.classList.contains("zap-centro")) requestAnimationFrame(rolarFaixa);
      });
    }
    function chipOrigemAtual() {
      var ch = player.currentChannel;
      var s = ch && ch.sources && ch.sources[player.currentSourceIndex];
      return {
        origem: window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.origemFonte(s, ch) : origemCanal(ch),
        texto: rotuloOrigem(ch, s)
      };
    }
    function atualizarChipOrigemZap() {
      var box = document.getElementById("zap-atual");
      var chip = box && box.querySelector(".zap-atual-chip");
      if (!chip || !player.currentChannel) return;
      var info = chipOrigemAtual();
      chip.className = "zap-atual-chip origem-badge origem-" + info.origem;
      chip.textContent = info.texto;
      box.dataset.fonte = String(player.currentSourceIndex);
    }
    function pintarCanalNoAr() {
      var box = document.getElementById("zap-atual");
      var ch = player.currentChannel;
      if (!box || !ch) return;
      var marca = buscaChave(ch.name);
      if (box.dataset.canal === marca && box.childElementCount) {
        atualizarChipOrigemZap();
        return;
      }
      box.dataset.canal = marca;
      box.innerHTML = "";
      var topo = document.createElement("div");
      topo.className = "zap-atual-topo";
      var nome = document.createElement("div");
      nome.className = "zap-atual-nome";
      nome.textContent = ch.name || "";
      var chip = document.createElement("div");
      chip.className = "zap-atual-chip origem-badge";
      topo.appendChild(nome);
      topo.appendChild(chip);
      var programa = document.createElement("div");
      programa.className = "zap-atual-programa";
      programa.textContent = "…";
      var hora = document.createElement("div");
      hora.className = "zap-atual-hora";
      var seguir = document.createElement("div");
      seguir.className = "zap-atual-seguir";
      var resumo = document.createElement("div");
      resumo.className = "zap-atual-resumo";
      box.appendChild(topo);
      atualizarChipOrigemZap();
      box.appendChild(programa);
      box.appendChild(hora);
      var barra = criarBarraPrograma();
      barra.classList.add("zap-atual-barra");
      box.appendChild(barra);
      box.appendChild(seguir);
      box.appendChild(resumo);
      if (!window.SaimoEpg) return;
      SaimoEpg.programas(ch).then(function (list) {
        if (!zapAberta || box.dataset.canal !== marca) return;
        var nn = SaimoEpg.nowNext(list);
        var cur = nn && nn.current;
        programa.textContent = cur && cur.title || "Ao vivo";
        hora.textContent = cur && cur.start && cur.stop ? SaimoEpg.hhmm(cur.start) + " – " + SaimoEpg.hhmm(cur.stop) : "";
        seguir.textContent = nn && nn.next && nn.next.title ? "A seguir · " + nn.next.title : "";
        aplicarBarraPrograma(barra, nn);
        resumo.textContent = cur && cur.desc || "";
        if (cur) {
          SaimoEpg.completar(cur).then(function (p) {
            if (!zapAberta || box.dataset.canal !== marca) return;
            resumo.textContent = p && p.desc || "";
          });
        }
      });
    }
    function pintarFaixa() {
      var trilho = document.getElementById("zap-trilho");
      if (!trilho) return;
      pintarCanalNoAr();
      var geracao = ++zapGeracao;
      trilho.innerHTML = "";
      var noAr = player.currentChannel && player.currentChannel.name;
      [-2, -1, 0, 1, 2].forEach(function (off) {
        var i = zapIndex + off;
        if (i < 0 || i >= zapLista.length) {
          var vazio = document.createElement("div");
          vazio.className = "zap-card zap-lado zap-vazio";
          trilho.appendChild(vazio);
          return;
        }
        var item = zapLista[i];
        var card = document.createElement("div");
        card.className = "zap-card " + (off === 0 ? "zap-centro" : "zap-lado");
        card.appendChild(logoDaFaixa(item));
        var origemZap = document.createElement("div");
        var srcZap = off === 0 && player.currentChannel && buscaChave(nomeDoItem(item)) === buscaChave(player.currentChannel.name) ? player.currentChannel.sources[player.currentSourceIndex] : item.sources && item.sources[0];
        origemZap.className = "origem-badge origem-" + (window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.origemFonte(srcZap, item) : origemCanal(item));
        origemZap.textContent = rotuloOrigem(item, srcZap);
        card.appendChild(origemZap);
        var nome = document.createElement("div");
        nome.className = "zap-nome";
        var nomeSpan = document.createElement("span");
        nomeSpan.textContent = nomeDoItem(item);
        nome.appendChild(nomeSpan);
        var agora = document.createElement("div");
        agora.className = "zap-agora";
        var agoraSpan = document.createElement("span");
        agoraSpan.textContent = "…";
        agora.appendChild(agoraSpan);
        var seguir = document.createElement("div");
        seguir.className = "zap-seguir";
        var seguirSpan = document.createElement("span");
        seguir.appendChild(seguirSpan);
        card.appendChild(nome);
        card.appendChild(agora);
        card.appendChild(seguir);
        card.appendChild(criarBarraPrograma());
        if (buscaChave(nomeDoItem(item)) === buscaChave(noAr)) {
          var marca = document.createElement("div");
          marca.className = "zap-noar";
          marca.textContent = "NO AR";
          card.appendChild(marca);
        }
        trilho.appendChild(card);
        preencherFaixaEpg(card, item, geracao);
      });
      requestAnimationFrame(rolarFaixa);
    }
    function exitPlayer() {
      fecharFaixa();
      var canalAberto = player.currentChannel;
      var nomeCanal = canalAberto && (canalAberto.name || canalAberto.title || "");
      if (window.saimoVodPlayer) window.saimoVodPlayer.fechar();
      player.stop();
      playerContainer.classList.remove("active");
      nextCardVisible = false;
      if (returnScreen === "series" && currentSeriesItem) {
        openSeriesScreen(currentSeriesItem);
        return;
      }
      if (returnScreen === "info" && infoItem) {
        openInfoPanel(infoItem);
        return;
      }
      if (returnScreen === "browse") {
        restaurarBrowse();
        return;
      }
      if (returnScreen === "home") {
        returnToHome();
        return;
      }
      if (returnScreen === "eventos") {
        openEvents();
        return;
      }
      if (returnScreen === "guia") {
        openGuide({
          manter: true,
          nome: nomeCanal
        });
        return;
      }
      if (currentSection === "aovivo") {
        currentScreen = "catalog";
        showScreen("catalog");
        checkResumeBanner(currentSection);
        voltarNaGrade(nomeCanal);
      } else if (currentSection === "filmes" || currentSection === "series") {
        currentScreen = "catalog";
        showScreen("catalog");
        checkResumeBanner(currentSection);
        catalogZone = "categories";
        updateCatalogFocus();
      } else returnToHome();
    }
    var KB_COLS = 10;
    var kbModo = "letras";
    function tecladoDireita(index, total, cols, temAlvo, irAlvo) {
      if (temAlvo && index % cols === cols - 1) {
        irAlvo();
        return index;
      }
      if (index + 1 < total) return index + 1;
      if (temAlvo) irAlvo();
      return index;
    }
    function teclasDoTeclado() {
      if (kbModo === "numeros") {
        return "1234567890".split("").concat(["ABC", "APAGAR", "ESPAÇO", "LIMPAR"]);
      }
      return ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "APAGAR", "Z", "X", "C", "V", "B", "N", "M", "123", "ESPAÇO", "LIMPAR"];
    }
    function rotuloTecla(ch) {
      if (ch === "APAGAR") return "⌫";
      if (ch === "ESPAÇO") return "espaço";
      if (ch === "LIMPAR") return "limpar";
      return ch;
    }
    function montarTecladoEm(box, destKeys, onClick) {
      if (!box || !destKeys) return;
      box.innerHTML = "";
      destKeys.length = 0;
      teclasDoTeclado().forEach(function (ch) {
        var el = document.createElement("div");
        el.className = "kb-key" + (ch.length > 1 ? " acao" : "");
        el.textContent = rotuloTecla(ch);
        el.dataset.ch = ch;
        if (onClick) el.addEventListener("click", function () {
          onClick(ch);
        });
        box.appendChild(el);
        destKeys.push(el);
      });
    }
    function aplicarModoTeclado(ch) {
      if (ch === "123") {
        kbModo = "numeros";
        rebuildTodosTeclados();
        return true;
      }
      if (ch === "ABC") {
        kbModo = "letras";
        rebuildTodosTeclados();
        return true;
      }
      return false;
    }
    function rebuildTodosTeclados() {
      if (kbIndex >= teclasDoTeclado().length) kbIndex = 0;
      if (aovivoBuscaKbIndex >= teclasDoTeclado().length) aovivoBuscaKbIndex = 0;
      if (radiosBuscaKb >= teclasDoTeclado().length) radiosBuscaKb = 0;
      montarTecladoEm(searchKeyboard, kbKeys, typeKey);
      montarTecladoEm(document.getElementById("aovivo-busca-kb"), aovivoBuscaKeys, typeKeyAoVivo);
      montarTecladoEm(radiosBuscaTeclado, radiosBuscaTeclas, digitarRadioBusca);
      if (currentScreen === "search") updateSearchFocus();
      else if (aovivoBuscaAberta && catalogZone === "busca-kb") updateCatalogFocus();
      else if (currentScreen === "radiobusca") focarRadiosBusca();
    }
    function buildKeyboard() {
      montarTecladoEm(searchKeyboard, kbKeys, typeKey);
    }
    buildKeyboard();
    function montarTecladoAoVivo() {
      montarTecladoEm(document.getElementById("aovivo-busca-kb"), aovivoBuscaKeys, typeKeyAoVivo);
    }
    function pintarQueryAoVivo() {
      var el = document.getElementById("aovivo-busca-query");
      if (el) el.textContent = (aovivoBuscaQuery || "") + "_";
    }
    function aplicarBuscaAoVivo() {
      var termo = aovivoBuscaQuery;
      var lives = liveChannels();
      var list = !String(termo || "").trim() ? lives : lives.filter(function (c) {
        return notaBusca(c.name || c.title, termo) >= 0;
      });
      activeItemList = list;
      channelsGrid.innerHTML = "";
      renderedCount = 0;
      gridIndex = 0;
      renderNextChunk(PAGE_SIZE_INITIAL);
      if (channelCounter) channelCounter.textContent = list.length + " canais";
    }
    function abrirBuscaAoVivo() {
      if (currentScreen === "catsmais") {
        var tela = document.getElementById("cats-mais-screen");
        if (tela) tela.classList.remove("active");
        currentScreen = "catalog";
        showScreen("catalog");
      }
      montarTecladoAoVivo();
      aovivoBuscaAberta = true;
      aovivoBuscaQuery = "";
      aovivoBuscaKbIndex = 0;
      var bar = document.getElementById("aovivo-busca");
      if (bar) bar.classList.remove("hidden");
      if (screenCatalog) screenCatalog.classList.add("buscando");
      pintarQueryAoVivo();
      aplicarBuscaAoVivo();
      catalogZone = "busca-kb";
      updateCatalogFocus();
    }
    function fecharBuscaAoVivo() {
      if (!aovivoBuscaAberta) return;
      aovivoBuscaAberta = false;
      aovivoBuscaQuery = "";
      var bar = document.getElementById("aovivo-busca");
      if (bar) bar.classList.add("hidden");
      if (screenCatalog) screenCatalog.classList.remove("buscando");
      if (currentScreen === "catalog" && currentSection === "aovivo") {
        selectCategory(categoryIndex, true);
        catalogZone = "grid";
        updateCatalogFocus();
      }
    }
    function typeKeyAoVivo(ch) {
      if (aplicarModoTeclado(ch)) return;
      if (ch === "APAGAR") aovivoBuscaQuery = aovivoBuscaQuery.slice(0, -1);
      else if (ch === "LIMPAR") aovivoBuscaQuery = "";
      else if (ch === "ESPAÇO") aovivoBuscaQuery += " ";
      else aovivoBuscaQuery += ch;
      pintarQueryAoVivo();
      aplicarBuscaAoVivo();
      catalogZone = "busca-kb";
      updateCatalogFocus();
    }
    function handleBuscaAoVivoKey(e, code) {
      var cols = KB_COLS;
      var n = aovivoBuscaKeys.length;
      if (catalogZone === "busca-kb") {
        if (code === 37) {
          e.preventDefault();
          aovivoBuscaKbIndex = (aovivoBuscaKbIndex + n - 1) % n;
          updateCatalogFocus();
        } else if (code === 39) {
          e.preventDefault();
          aovivoBuscaKbIndex = tecladoDireita(aovivoBuscaKbIndex, n, cols, !!activeItemList.length, function () {
            catalogZone = "grid";
            gridIndex = Math.min(gridIndex, Math.max(0, activeItemList.length - 1));
          });
          updateCatalogFocus();
        } else if (code === 38) {
          e.preventDefault();
          if (aovivoBuscaKbIndex >= cols) {
            aovivoBuscaKbIndex -= cols;
            updateCatalogFocus();
          } else if (activeItemList.length) {
            catalogZone = "grid";
            gridIndex = Math.min(gridIndex, activeItemList.length - 1);
            updateCatalogFocus();
          }
        } else if (code === 40) {
          e.preventDefault();
          if (aovivoBuscaKbIndex + cols < n) aovivoBuscaKbIndex += cols;
          else aovivoBuscaKbIndex = n - 1;
          updateCatalogFocus();
        } else if (code === 13) {
          e.preventDefault();
          var tecla = aovivoBuscaKeys[aovivoBuscaKbIndex];
          if (tecla) typeKeyAoVivo(tecla.dataset.ch);
        }
        return;
      }
      var total = activeItemList.length;
      if (code === 37) {
        e.preventDefault();
        if (gridIndex > 0) {
          gridIndex--;
          updateCatalogFocus();
        }
      } else if (code === 39) {
        e.preventDefault();
        if (gridIndex < total - 1) {
          gridIndex++;
          if (gridIndex >= renderedCount - 6) renderNextChunk(PAGE_SIZE_STEP);
          updateCatalogFocus();
        }
      } else if (code === 38) {
        e.preventDefault();
        if (gridIndex - GRID_COLUMNS >= 0) {
          gridIndex -= GRID_COLUMNS;
          updateCatalogFocus();
        }
      } else if (code === 40) {
        e.preventDefault();
        if (gridIndex + GRID_COLUMNS < total) {
          gridIndex += GRID_COLUMNS;
          if (gridIndex >= renderedCount - 6) renderNextChunk(PAGE_SIZE_STEP);
          updateCatalogFocus();
        } else {
          catalogZone = "busca-kb";
          updateCatalogFocus();
        }
      } else if (code === 13 && ctxPodeOkLongo()) {
        return;
      } else if (code === 13) {
        e.preventDefault();
        executeCard(gridIndex);
      }
    }
    function escopoBuscaDaTela() {
      if (currentScreen === "catalog" && currentSection === "aovivo") return "canais";
      if (currentScreen === "catsmais" || currentScreen === "guia") return "canais";
      if (currentScreen === "player" && player && player.isLive) return "canais";
      if (currentScreen === "browse") {
        if (browseKind === "filmes") return "filmes";
        if (browseKind === "series") return "series";
        if (browseKind === "animes") return "animes";
        if (browseKind === "doramas") return "doramas";
      }
      return "tudo";
    }
    function textoEscopoBusca(esc) {
      if (esc === "canais") return "só canais";
      if (esc === "filmes") return "só filmes";
      if (esc === "series") return "só séries";
      if (esc === "animes") return "só animes";
      if (esc === "doramas") return "só doramas";
      return "canais, filmes, séries, animes, doramas";
    }
    function openSearch() {
      if (currentScreen === "catsmais" || currentScreen === "catalog" && currentSection === "aovivo") {
        abrirBuscaAoVivo();
        return;
      }
      return _openSearch.apply(this, arguments);
    }
    function _openSearch() {
      _openSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        var espera, hintBusca;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              searchEscopo = escopoBuscaDaTela();
              searchSoCanais = searchEscopo === "canais";
              searchReturn = currentScreen === "search" ? searchReturn : currentScreen;
              currentScreen = "search";
              showScreen("search");
              searchQuery = "";
              searchZone = "kb";
              kbIndex = 0;
              searchGroups = [];
              renderSearchQuery();
              hintBusca = document.querySelector(".tv-search-hint");
              if (hintBusca) hintBusca.textContent = "OK tecla · ▼ resultados · " + textoEscopoBusca(searchEscopo) + " · VOLTAR fecha";
              if (searchResultsCount) searchResultsCount.textContent = "Digite 2 letras para buscar " + textoEscopoBusca(searchEscopo).replace("só ", "") + ".";
              updateSearchFocus();
              initSearchWorker();
              espera = [];
              if (searchEscopo === "tudo" || searchEscopo === "filmes" || searchEscopo === "series") espera.push(carregarAcervo());
              if (window.SaimoFicha && SaimoFicha.ensureIndex) espera.push(SaimoFicha.ensureIndex().catch(function () {}));
              if (searchEscopo === "tudo" || searchEscopo === "animes") espera.push(garantirColecao("animes").catch(function () {
                return [];
              }));
              if (searchEscopo === "tudo" || searchEscopo === "doramas") espera.push(garantirColecao("doramas").catch(function () {
                return [];
              }));
              if (!espera.length) espera.push(Promise.resolve());
              _context26.n = 1;
              return Promise.all(espera);
            case 1:
              if (!(currentScreen !== "search")) {
                _context26.n = 2;
                break;
              }
              return _context26.a(2);
            case 2:
              alimentarSearchWorkerCatalog();
              performSearch(searchQuery);
            case 3:
              return _context26.a(2);
          }
        }, _callee26);
      }));
      return _openSearch.apply(this, arguments);
    }
    function closeSearch() {
      searchSoCanais = false;
      searchEscopo = "tudo";
      searchModal.classList.remove("active");
      if (searchReturn === "catalog") {
        currentScreen = "catalog";
        showScreen("catalog");
        updateCatalogFocus();
      } else if (searchReturn === "browse") restaurarBrowse();else returnToHome();
    }
    function renderSearchQuery() {
      searchQueryEl.textContent = (searchQuery || "") + "_";
    }
    var searchWorker = null;
    var searchWorkerReady = false;
    var searchWorkerCatalogLoaded = false;
    var searchWorkerReqId = 0;
    var searchDebounceTimer = null;
    function valoresMapaVod(mapa) {
      var out = [];
      var k;
      for (k in mapa || {}) {
        if (Object.prototype.hasOwnProperty.call(mapa, k) && mapa[k]) out.push(mapa[k]);
      }
      return out;
    }
    function mesclarListasBusca(listas) {
      var out = [];
      var visto = Object.create(null);
      (listas || []).forEach(function (arr) {
        (arr || []).forEach(function (it) {
          if (!it) return;
          var t = it.title || it.name || "";
          if (!t) return;
          var k = fold(t) + "|" + (it.type || it.colecao || "");
          if (visto[k]) return;
          visto[k] = 1;
          out.push(it);
        });
      });
      return out;
    }
    function xtreamFilmesBusca() {
      if (!window.SaimoXtream || !SaimoXtream.mapaFilmes) return [];
      return valoresMapaVod(SaimoXtream.mapaFilmes()).filter(function (it) {
        return it.colecao !== "animes" && it.colecao !== "doramas";
      });
    }
    function xtreamSeriesBusca() {
      if (!window.SaimoXtream || !SaimoXtream.mapaSeries) return [];
      return valoresMapaVod(SaimoXtream.mapaSeries()).filter(function (it) {
        return it.colecao !== "animes" && it.colecao !== "doramas" && !itemPareceAnime(it);
      });
    }
    function canaisParaBusca() {
      return (liveChannels() || []).map(function (c) {
        return {
          type: "channel",
          title: c.title || c.name || "",
          name: c.name || c.title || "",
          posterUrl: c.logo || c.posterUrl || "",
          logo: c.logo || "",
          category: c.category || "",
          sources: c.sources,
          isLive: true
        };
      });
    }
    function filmesParaBusca() {
      return mesclarListasBusca([catalogItems(filmesRows), xtreamFilmesBusca()]);
    }
    function seriesParaBusca() {
      return itensSerieSemAnime(mesclarListasBusca([catalogItems(seriesRows), xtreamSeriesBusca()]));
    }
    function animesParaBusca() {
      return mesclarListasBusca([colecaoCache.animes || [], listarXtreamColecao("animes")]);
    }
    function doramasParaBusca() {
      return mesclarListasBusca([colecaoCache.doramas || [], listarXtreamColecao("doramas")]);
    }
    function alimentarSearchWorkerCatalog() {
      if (!searchWorker || !searchWorkerReady) return;
      searchWorkerCatalogLoaded = true;
      empurrarItensBuscaWorker(canaisParaBusca(), "channel");
      empurrarItensBuscaWorker(filmesParaBusca(), "movie");
      empurrarItensBuscaWorker(seriesParaBusca(), "series");
      empurrarItensBuscaWorker(animesParaBusca(), "anime");
      empurrarItensBuscaWorker(doramasParaBusca(), "dorama");
    }
    function initSearchWorker() {
      if (searchWorker || typeof Worker === "undefined") return;
      try {
        searchWorker = new Worker("js/vod-search-worker.js?v=xt77");
        searchWorker.onmessage = function (ev) {
          var d = ev.data || {};
          if (d.cmd === "ready") {
            searchWorkerReady = true;
            alimentarSearchWorkerCatalog();
            if (currentScreen === "search" && searchQuery && searchQuery.length >= 2) {
              triggerSearch(searchQuery);
            }
          } else if (d.cmd === "results") {
            if (d.reqId !== searchWorkerReqId) return;
            renderWorkerSearchResults(d);
          }
        };
        searchWorker.onerror = function () {
          searchWorker = null;
          searchWorkerReady = false;
          searchWorkerCatalogLoaded = false;
          searchWorkerVisto = Object.create(null);
        };
        searchWorkerVisto = Object.create(null);
        searchWorker.postMessage({
          cmd: "init",
          items: [],
          clear: true
        });
      } catch (e) {
        searchWorker = null;
      }
    }
    function triggerSearch(q) {
      if (searchWorker && searchWorkerReady) {
        searchWorkerReqId++;
        searchWorker.postMessage({
          cmd: "search",
          q: q,
          limit: 40,
          reqId: searchWorkerReqId,
          scope: searchEscopo || "tudo"
        });
      } else {
        performSearchFallback(q);
      }
    }
    function renderWorkerSearchResults(d) {
      var geracao = buscaGeracao;
      searchGroups = [];
      searchGroup = 0;
      searchCol = 0;
      searchResultsGrid.innerHTML = "";
      function addGroup(title, items, wide) {
        if (!items || !items.length) return;
        searchGroups.push({
          title: title,
          items: items,
          wide: !!wide
        });
        var box = document.createElement("div");
        var h = document.createElement("div");
        h.className = "search-group-title";
        h.textContent = title;
        var track = document.createElement("div");
        track.className = "home-row-track";
        items.forEach(function (it) {
          return track.appendChild(miniCard(it, wide, true));
        });
        box.appendChild(h);
        box.appendChild(track);
        searchResultsGrid.appendChild(box);
      }
      var esc = d.scope || searchEscopo;
      if (esc === "canais") addGroup("Canais", d.canais || [], true);
      else if (esc === "filmes") addGroup("Filmes", d.filmes || [], false);
      else if (esc === "series") addGroup("Séries", d.series || [], false);
      else if (esc === "animes") addGroup("Animes", d.animes || [], false);
      else if (esc === "doramas") addGroup("Doramas", d.doramas || [], false);
      else {
        addGroup("Canais", d.canais || [], true);
        addGroup("Filmes", d.filmes || [], false);
        addGroup("Séries", d.series || [], false);
        addGroup("Animes", d.animes || [], false);
        addGroup("Doramas", d.doramas || [], false);
      }
      var total = d.total || 0;
      searchResultsCount.textContent = total + ' resultado(s) para "' + d.q + '"';
      preencherCapasBusca(geracao);
    }
    function typeKey(ch) {
      if (aplicarModoTeclado(ch)) return;
      if (ch === "APAGAR") searchQuery = searchQuery.slice(0, -1);else if (ch === "LIMPAR") searchQuery = "";else if (ch === "ESPAÇO") searchQuery += " ";else searchQuery += ch;
      renderSearchQuery();
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(function () {
        performSearch(searchQuery);
      }, 200);
    }
    function capaJaPronta(it) {
      if (!it || it.type === "channel" || it.posterUrl) return;
      if (!window.SaimoFicha || !SaimoFicha.capaDe) return;
      var serie = it.type !== "movie";
      var capa = SaimoFicha.capaDe(it.title, serie) || "";
      if (capa) it.posterUrl = capa;
    }
    function preencherCapasBusca(geracao) {
      if (!window.SaimoCapas || !searchResultsGrid) return;
      var boxes = searchResultsGrid.children;
      for (var gi = 0; gi < boxes.length; gi++) {
        var track = boxes[gi].querySelector(".home-row-track");
        var grupo = searchGroups[gi];
        if (!track || !grupo || !grupo.items) continue;
        var top = SaimoCapas.indicesTop4(grupo.items);
        Array.prototype.forEach.call(track.children, function (card, ci) {
          if (!top[ci]) return;
          var item = grupo.items[ci];
          if (!item || item.type === "channel") return;
          SaimoCapas.pedir(item, card, true);
        });
      }
    }
    function performSearch(query) {
      if (searchWorker && searchWorkerReady) {
        searchWorkerReqId++;
        searchWorker.postMessage({
          cmd: "search",
          q: query,
          limit: 40,
          reqId: searchWorkerReqId,
          scope: searchEscopo || "tudo"
        });
        return;
      }
      performSearchFallback(query);
    }
    function performSearchFallback(query) {
      var geracao = ++buscaGeracao;
      var termo = fold(query);
      searchGroups = [];
      searchGroup = 0;
      searchCol = 0;
      searchResultsGrid.innerHTML = "";
      if (termo.length < 2) {
        searchResultsCount.textContent = "Digite 2 letras para buscar " + textoEscopoBusca(searchEscopo).replace("só ", "") + ".";
        return;
      }
      function rankear(lista, campo) {
        return lista.map(function (it) {
          return {
            it: it,
            n: notaBusca(it[campo] || it.title || it.name, query)
          };
        }).filter(function (x) {
          return x.n >= 0;
        }).sort(function (a, b) {
          return a.n - b.n || String(a.it[campo] || a.it.title || "").localeCompare(String(b.it[campo] || b.it.title || ""));
        }).map(function (x) {
          return x.it;
        });
      }
      var esc = searchEscopo || "tudo";
      var canais = esc === "tudo" || esc === "canais" ? rankear(canaisParaBusca(), "name").slice(0, esc === "canais" ? 48 : 24) : [];
      var filmes = esc === "tudo" || esc === "filmes" ? rankear(filmesParaBusca(), "title").slice(0, 40) : [];
      var series = esc === "tudo" || esc === "series" ? rankear(seriesParaBusca(), "title").slice(0, 40) : [];
      var animes = esc === "tudo" || esc === "animes" ? rankear(animesParaBusca(), "title").slice(0, 40) : [];
      var doramas = esc === "tudo" || esc === "doramas" ? rankear(doramasParaBusca(), "title").slice(0, 40) : [];
      [filmes, series, animes, doramas].forEach(function (lista) {
        return lista.forEach(capaJaPronta);
      });
      function addGroup(title, items, wide) {
        if (!items.length) return;
        var lista = items;
        searchGroups.push({
          title: title,
          items: lista,
          wide: !!wide
        });
        var box = document.createElement("div");
        var h = document.createElement("div");
        h.className = "search-group-title";
        h.textContent = title;
        var track = document.createElement("div");
        track.className = "home-row-track";
        lista.forEach(function (it) {
          return track.appendChild(miniCard(it, wide, true));
        });
        box.appendChild(h);
        box.appendChild(track);
        searchResultsGrid.appendChild(box);
      }
      if (esc === "canais") addGroup("Canais", canais, true);
      else if (esc === "filmes") addGroup("Filmes", filmes, false);
      else if (esc === "series") addGroup("Séries", series, false);
      else if (esc === "animes") addGroup("Animes", animes, false);
      else if (esc === "doramas") addGroup("Doramas", doramas, false);
      else {
        addGroup("Canais", canais, true);
        addGroup("Filmes", filmes, false);
        addGroup("Séries", series, false);
        addGroup("Animes", animes, false);
        addGroup("Doramas", doramas, false);
      }
      var total = canais.length + filmes.length + series.length + animes.length + doramas.length;
      searchResultsCount.textContent = total + ' resultado(s) para "' + query + '"';
      preencherCapasBusca(geracao);
    }
    function updateSearchFocus() {
      if (searchZone === "kb") setFocus(kbKeys[kbIndex] || kbKeys[0]);else {
        var box = searchResultsGrid.children[searchGroup];
        var track = box && box.querySelector(".home-row-track");
        var card = track && track.children[searchCol];
        if (card) setFocus(card);
        var g = searchGroups[searchGroup];
        if (track && g && g.items && window.SaimoCapas) {
          SaimoCapas.atualizarJanelaTrack(track, g.items, searchCol);
          preFichaNoFoco(g.items[searchCol]);
        }
      }
    }
    function activateSearchResult() {
      return _activateSearchResult.apply(this, arguments);
    }
    function _activateSearchResult() {
      _activateSearchResult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
        var g, item;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              g = searchGroups[searchGroup];
              if (g) {
                _context27.n = 1;
                break;
              }
              return _context27.a(2);
            case 1:
              item = g.items[searchCol];
              if (item) {
                _context27.n = 2;
                break;
              }
              return _context27.a(2);
            case 2:
              returnScreen = "search";
              if (item.type === "channel") launchPlayer({
                name: item.name,
                category: item.category,
                logo: item.logo,
                isLive: true,
                sources: item.sources
              }, item, null);else if (item.type === "movie") openInfoPanel(item);else openSeriesScreen(item);
              enrichItem(item).catch(function () {});
            case 3:
              return _context27.a(2);
          }
        }, _callee27);
      }));
      return _activateSearchResult.apply(this, arguments);
    }
    var OFICIAL_KEYS = "abcdefghijklmnopqrstuvwxyz0123456789".split("").concat([".", ":", "/", "-", "_", "@", "+", "!", "?", "&", "=", "%", "MAIÚSC", "APAGAR", "LIMPAR", "ADICIONAR"]);
    var listaItem = 0;
    function pintarListaStatus(texto) {
      var el = document.getElementById("listas-status");
      if (el) el.textContent = texto || "";
    }
    function contaLista(n, um, outros) {
      return n + " " + (n === 1 ? um : outros);
    }
    function pintarListasSalvas() {
      var box = document.getElementById("listas-itens");
      if (!box || !window.SaimoListas) return;
      box.innerHTML = "";
      if (!SaimoListas.listas.length) {
        var vazio = document.createElement("div");
        vazio.className = "settings-row";
        vazio.innerHTML = '<div><div class="s-title">Nenhuma lista ainda</div><div class="s-desc">Manda o link pelo QR em Ligar com o celular.</div></div>';
        box.appendChild(vazio);
        return;
      }
      SaimoListas.listas.forEach(function (lista, i) {
        var r = SaimoListas.resumo(lista);
        var row = document.createElement("div");
        row.className = "settings-row";
        var partes = [];
        if (r.canais) partes.push(contaLista(r.canais, "canal", "canais"));
        if (r.filmes) partes.push(contaLista(r.filmes, "filme", "filmes"));
        if (r.eps) partes.push(contaLista(r.eps, "episódio", "episódios"));
        row.innerHTML = '<div><div class="s-title">Lista ' + (i + 1) + (lista.ativa ? "" : " · desligada") + '</div><div class="s-desc">' + (partes.join(" · ") || "vazia") + ' · OK liga ou desliga · vermelho remove</div></div><div class="s-val">' + (lista.ativa ? "Ligada" : "Desligada") + "</div>";
        box.appendChild(row);
      });
    }
    function focoListas() {
      var rows = document.querySelectorAll("#listas-itens .settings-row");
      if (listaItem >= rows.length) listaItem = Math.max(0, rows.length - 1);
      rows.forEach(function (el, i) {
        return el.classList.toggle("focused", i === listaItem);
      });
      var alvo = rows[listaItem];
      if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({
        block: "nearest"
      });
    }
    function aplicarListas() {
      if (homeReady) refreshHomeDynamic();
    }
    function removerListaFocada() {
      if (!window.SaimoListas || !SaimoListas.listas.length) return;
      var lista = SaimoListas.listas[listaItem];
      if (!lista) return;
      SaimoListas.remover(lista.id);
      if (listaItem >= SaimoListas.listas.length) listaItem = Math.max(0, SaimoListas.listas.length - 1);
      pintarListasSalvas();
      pintarListaStatus("Lista removida deste aparelho.");
      carregarAcervo().then(function () {
        return aplicarListas();
      }).catch(function () {
        return aplicarListas();
      });
      focoListas();
    }
    function openListas() {
      if (window.SaimoListas) SaimoListas.carregar();
      listaItem = 0;
      pintarListaStatus("");
      pintarListasSalvas();
      currentScreen = "listas";
      showScreen("listas");
      focoListas();
    }
    function fecharListas() {
      currentScreen = "settings";
      showScreen("settings");
      renderSettings();
    }
    function navegarListas(code) {
      if (!window.SaimoListas || !SaimoListas.listas.length) return;
      var n = SaimoListas.listas.length;
      if (code === 38 && listaItem > 0) listaItem--;
      else if (code === 40 && listaItem < n - 1) listaItem++;
      else if (code === 13) {
        var lista = SaimoListas.listas[listaItem];
        if (!lista) return;
        SaimoListas.alternar(lista.id);
        pintarListasSalvas();
        aplicarListas();
      }
      focoListas();
    }
    var OFICIAL_ACOES = [{
      id: "saimoCat",
      title: "Catálogo Saimo",
      hint: "canais, filmes e séries da Saimo · OK liga ou desliga"
    }, {
      id: "xtreamCat",
      title: "Meu Xtream",
      hint: "OK liga ou desliga · sem conta, abre o QR"
    }, {
      id: "parearCelular",
      title: "Ligar com o celular",
      hint: "QR · Xtream, link M3U ou arquivo"
    }, {
      id: "atualizar",
      title: "Atualizar agora",
      hint: "baixa de novo Saimo e Xtream"
    }, {
      id: "restaurar",
      title: "Restaurar o padrão",
      hint: "Saimo ligado · Xtream como estava"
    }];
    var oficialUrl = "";
    var oficialCampo = null;
    var oficialMaiusc = false;
    var oficialZona = "itens";
    var oficialKb = 0;
    var oficialItem = 0;
    var oficialKeys = [];
    var oficialOcupado = false;
    function pintarOficialUrl() {
      var el = document.getElementById("oficial-url");
      var kb = document.getElementById("oficial-teclado");
      if (!oficialCampo) {
        if (el) el.textContent = "Escolha um item abaixo · OK para editar ou executar";
        if (kb) kb.classList.add("hidden");
        return;
      }
      if (el) {
        if (oficialCampo === "xtreamPass") el.textContent = oficialUrl ? "senha · " + oficialUrl.length + " caracteres" : "digite a senha";
        else el.textContent = oficialUrl || (oficialCampo === "xtreamUser" ? "usuário" : "https://");
      }
      if (kb) kb.classList.remove("hidden");
    }
    function pintarOficialStatus(texto) {
      var el = document.getElementById("oficial-status");
      if (el) el.textContent = texto || "";
    }
    function pintarOficialItens() {
      var box = document.getElementById("oficial-itens");
      if (!box) return;
      box.innerHTML = "";
      OFICIAL_ACOES.forEach(function (a, i) {
        var row = document.createElement("div");
        row.className = "settings-row" + (oficialZona === "itens" && i === oficialItem ? " focused" : "");
        var titulo = a.title;
        var hint = a.hint;
        if (a.id === "saimoCat") titulo += SaimoOficial.catalogoSaimoLigado() ? " · Ligado" : " · Desligado";
        if (a.id === "xtreamCat") {
          var xtOn = xtreamEstaLigado();
          titulo += xtOn ? " · Ligado" : " · Desligado";
          if (!temDadosXtream()) hint = "ainda sem conta · OK abre o QR do celular";
          else if (window.SaimoXtream && SaimoXtream.resumo) hint = SaimoXtream.resumo();
        }
        if (a.id === "atualizar") {
          if (window.SaimoXtream && SaimoXtream.ultimaSync && SaimoXtream.ultimaSync()) {
            var ts = SaimoXtream.ultimaSync();
            var d = new Date(ts);
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            hint = "Xtream na TV desde " + (dd < 10 ? "0" : "") + dd + "/" + (mm < 10 ? "0" : "") + mm + " · OK baixa de novo";
          }
        }
        row.innerHTML = "<div class=\"settings-row-title\">" + titulo + "</div><div class=\"settings-row-desc\">" + hint + "</div>";
        row.addEventListener("click", function () {
          oficialItem = i;
          oficialZona = "itens";
          executarAcaoOficial(a.id);
          focoOficial();
        });
        box.appendChild(row);
      });
    }
    function montarTecladoOficial() {
      var box = document.getElementById("oficial-teclado");
      if (!box) return;
      box.innerHTML = "";
      oficialKeys = [];
      OFICIAL_KEYS.forEach(function (ch) {
        var el = document.createElement("div");
        el.className = "kb-key" + (ch.length > 1 ? " wide" : "");
        el.textContent = ch === "MAIÚSC" ? "Aa" : ch === "ADICIONAR" ? "SALVAR" : ch;
        el.dataset.ch = ch;
        box.appendChild(el);
        oficialKeys.push(el);
        el.addEventListener("click", function () {
          oficialZona = "kb";
          oficialKb = oficialKeys.indexOf(el);
          teclaOficial(ch);
          focoOficial();
        });
      });
    }
    function rolarFocoNaCaixa(box, el) {
      if (!box || !el || !box.contains(el)) return;
      var br = box.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      if (er.top < br.top) box.scrollTop += er.top - br.top - 12;
      else if (er.bottom > br.bottom) box.scrollTop += er.bottom - br.bottom + 12;
    }
    function focoOficial() {
      oficialKeys.forEach(function (el, i) {
        return el.classList.toggle("focused", oficialZona === "kb" && i === oficialKb);
      });
      var box = document.getElementById("oficial-itens");
      var rows = box ? box.querySelectorAll(".settings-row") : [];
      Array.prototype.forEach.call(rows, function (el, i) {
        el.classList.toggle("focused", oficialZona === "itens" && i === oficialItem);
      });
      var alvo = oficialZona === "kb" ? oficialKeys[oficialKb] : rows[oficialItem];
      if (oficialZona === "itens") rolarFocoNaCaixa(box, alvo);
      else if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ block: "nearest" });
    }
    function fecharOficial() {
      oficialCampo = null;
      currentScreen = "settings";
      showScreen("settings");
      renderSettings();
    }
    function fecharParearCelular() {
      if (window.SaimoParear) SaimoParear.parar();
      if (parearOrigem === "oficial") {
        currentScreen = "oficial";
        showScreen("oficial");
        pintarOficialItens();
        pintarOficialStatus(statusXtreamAtual());
        focoOficial();
        return;
      }
      currentScreen = "settings";
      showScreen("settings");
      renderSettings();
    }
    function abrirParearCelular(origem) {
      parearOrigem = origem || "settings";
      currentScreen = "parear";
      showScreen("parear");
      var st = document.getElementById("parear-status");
      var cd = document.getElementById("parear-code");
      var ur = document.getElementById("parear-url");
      var qr = document.getElementById("parear-qr");
      if (st) st.textContent = "Criando código…";
      if (cd) cd.textContent = "------";
      if (ur) ur.textContent = "";
      if (qr) qr.removeAttribute("src");
      if (!window.SaimoParear) {
        if (st) st.textContent = "Falta js/parear.js";
        return;
      }
      SaimoParear.iniciar({
        codigo: function (c) { if (cd) cd.textContent = c; },
        url: function (u) { if (ur) ur.textContent = u; },
        qr: function (src) {
          if (!qr) return;
          qr.onerror = function () {
            var u = ur && ur.textContent;
            if (u) qr.src = "https://quickchart.io/qr?size=480&text=" + encodeURIComponent(u);
          };
          qr.src = src;
        },
        status: function (t) { if (st) st.textContent = t; },
        ok: function (tipo, msg) {
          if (st) st.textContent = msg || "Chegou.";
          if (tipo === "xtream") {
            setTimeout(function () {
              fecharParearCelular();
              testarXtreamAgora("Xtream do celular. Baixando o painel…", true);
            }, 700);
            return;
          }
          setTimeout(function () {
            fecharParearCelular();
            pintarOficialStatus(msg || "Lista do celular adicionada.");
            carregarAcervo().then(function () { aplicarListas(); }).catch(function () { aplicarListas(); });
          }, 700);
        }
      });
    }
    function temDadosXtream() {
      if (!window.SaimoAjustes) return false;
      return !!(String(SaimoAjustes.get("xtreamHost") || "").trim() && String(SaimoAjustes.get("xtreamUser") || "").trim() && String(SaimoAjustes.get("xtreamPass") || ""));
    }
    function saimoListaLigada() {
      if (!window.SaimoOficial) return true;
      return SaimoOficial.catalogoSaimoLigado();
    }
    function xtreamEstaLigado() {
      if (!temDadosXtream()) return false;
      if (window.SaimoAjustes && SaimoAjustes.get("xtreamOff")) return false;
      return true;
    }
    function openOficialListas() {
      oficialUrl = "";
      oficialCampo = null;
      oficialMaiusc = false;
      oficialZona = "itens";
      oficialKb = 0;
      oficialItem = 0;
      oficialOcupado = false;
      if (temDadosXtream() && !SaimoAjustes.get("xtreamOff")) {
        SaimoAjustes.gravar({ catalogoXtream: true, xtreamOff: false });
      }
      montarTecladoOficial();
      pintarOficialUrl();
      pintarOficialStatus(statusXtreamAtual());
      pintarOficialItens();
      currentScreen = "oficial";
      showScreen("oficial");
      focoOficial();
      if (xtreamEstaLigado() && window.SaimoXtream && !(SaimoXtream.cacheValido && SaimoXtream.cacheValido())) {
        testarXtreamAgora("Preparando o Xtream…", false);
      }
    }
    function statusXtreamAtual() {
      if (window.SaimoXtream && SaimoXtream.mensagemStatus) return SaimoXtream.mensagemStatus();
      if (xtreamVod.lastErro) return "Xtream não entrou: " + xtreamVod.lastErro;
      var nf = 0;
      var ns = 0;
      var k;
      for (k in xtreamVod.filmes) {
        if (Object.prototype.hasOwnProperty.call(xtreamVod.filmes, k)) nf++;
      }
      for (k in xtreamVod.series) {
        if (Object.prototype.hasOwnProperty.call(xtreamVod.series, k)) ns++;
      }
      if (xtreamVod.lastOk) return "Xtream entrou: " + nf + " filmes · " + ns + " séries.";
      if (xtreamEstaLigado()) return "Xtream ligado. Clique de novo em Meu Xtream para testar.";
      return "Preencha servidor, usuário e senha e clique em Meu Xtream.";
    }
    function testarXtreamAgora(textoEspera, forcar) {
      if (!xtreamEstaLigado()) {
        pintarOficialStatus(statusXtreamAtual());
        pintarOficialItens();
        return;
      }
      ligarBarraXtream();
      pintarOficialStatus(textoEspera || (forcar ? "Baixando o Xtream de novo…" : "Preparando o Xtream…"));
      sincronizarMeuXtream(!!forcar).then(function () {
        aplicarXtreamNoAcervo({ silencio: true });
        pintarOficialStatus(statusXtreamAtual());
        pintarOficialItens();
        buildHome(true);
      }).catch(function () {
        pintarOficialStatus(statusXtreamAtual() || "Xtream não entrou. Confira servidor, usuário e senha.");
        pintarOficialItens();
      });
    }
    function iniciarEdicaoOficial(campo) {
      if (!window.SaimoOficial) return;
      oficialCampo = campo;
      if (campo === "xtreamHost") {
        oficialUrl = String(SaimoAjustes.get("xtreamHost") || "").trim() || "http://";
      } else if (campo === "xtreamUser") {
        oficialUrl = String(SaimoAjustes.get("xtreamUser") || "").trim();
      } else if (campo === "xtreamPass") {
        oficialUrl = String(SaimoAjustes.get("xtreamPass") || "");
      } else if (campo === "vod") {
        oficialUrl = String(SaimoAjustes.get("urlVod") || "").trim() || "https://";
      } else {
        oficialUrl = String(SaimoAjustes.get("urlCanais") || "").trim() || SaimoOficial.DEFAULT_CANAIS;
      }
      oficialZona = "kb";
      oficialKb = 0;
      pintarOficialUrl();
      pintarOficialStatus("Edite e use SALVAR · grava neste aparelho");
      focoOficial();
    }
    function salvarOficialUrl() {
      if (oficialOcupado || !oficialCampo || !window.SaimoOficial) return;
      var url = oficialUrl.trim();
      if (!url && oficialCampo !== "xtreamPass") {
        pintarOficialStatus("Digite o valor ou use Restaurar padrão.");
        return;
      }
      oficialOcupado = true;
      pintarOficialStatus("Salvando…");
      var parcial;
      if (oficialCampo === "vod") {
        parcial = { urlVod: url, catalogoMeu: true };
      } else if (oficialCampo === "xtreamHost") {
        parcial = { xtreamHost: url, catalogoXtream: true, xtreamOff: false };
      } else if (oficialCampo === "xtreamUser") {
        parcial = { xtreamUser: url, catalogoXtream: true, xtreamOff: false };
      } else if (oficialCampo === "xtreamPass") {
        parcial = { xtreamPass: url, catalogoXtream: true, xtreamOff: false };
      } else {
        parcial = { urlCanais: url };
      }
      SaimoAjustes.gravar(parcial);
      SaimoOficial.syncApiUrls();
      SaimoOficial.limparCacheVod();
      var campoSalvo = oficialCampo;
      oficialCampo = null;
      oficialUrl = "";
      oficialZona = "itens";
      oficialOcupado = false;
      pintarOficialUrl();
      pintarOficialItens();
      focoOficial();
      if (campoSalvo === "xtreamHost" || campoSalvo === "xtreamUser" || campoSalvo === "xtreamPass") {
        if (window.SaimoXtream && SaimoXtream.ligado && SaimoXtream.ligado()) {
          if (SaimoXtream.cacheValido && SaimoXtream.cacheValido()) {
            if (SaimoXtream.reconstruirFontes) SaimoXtream.reconstruirFontes();
            aplicarXtreamNoAcervo();
            pintarOficialStatus("Salvo. O catálogo da semana continua neste aparelho.");
            pintarOficialItens();
          } else {
            testarXtreamAgora("Dados novos. Baixando o catálogo…", true);
          }
        } else {
          pintarOficialStatus("Salvo. Falta preencher servidor, usuário e senha.");
        }
      } else {
        pintarOficialStatus("Salvo. Use Recarregar para aplicar.");
      }
    }
    function executarAcaoOficial(id) {
      if (!window.SaimoOficial) return;
      if (oficialOcupado && id !== "xtreamCat" && id !== "atualizar" && id !== "parearCelular") return;
      if (id === "saimoCat") {
        var saimoOn = !SaimoOficial.catalogoSaimoLigado();
        SaimoAjustes.gravar({
          catalogoSaimo: saimoOn
        });
        SaimoOficial.syncApiUrls();
        SaimoOficial.limparCacheVod();
        acervoPronto = null;
        filmesRows = {};
        seriesRows = {};
        pintarOficialItens();
        pintarOficialStatus(saimoOn ? "Catálogo Saimo ligado. Recarregando…" : "Catálogo Saimo desligado. Só o seu. Recarregando…");
        recarregarAcervoOficial().then(function () {
          pintarOficialStatus(saimoOn ? "Catálogo Saimo ligado." : statusXtreamAtual() || "Catálogo Saimo desligado. Só o seu.");
          pintarOficialItens();
        }).catch(function () {
          pintarOficialItens();
        });
        return;
      }
      if (id === "meuCat") {
        if (!SaimoOficial.urlMeuVod()) {
          iniciarEdicaoOficial("vod");
          pintarOficialStatus("Cole o https:// da pasta do seu catálogo e SALVAR.");
          return;
        }
        var meuOn = !SaimoAjustes.get("catalogoMeu");
        if (meuOn && !SaimoOficial.urlMeuVod()) {
          iniciarEdicaoOficial("vod");
          return;
        }
        SaimoAjustes.gravar({
          catalogoMeu: meuOn
        });
        SaimoOficial.syncApiUrls();
        SaimoOficial.limparCacheVod();
        pintarOficialItens();
        pintarOficialStatus(meuOn ? "Meu catálogo ligado. Fontes suas entram primeiro." : "Meu catálogo desligado.");
        return;
      }
      if (id === "xtreamCat") {
        if (!temDadosXtream()) {
          abrirParearCelular("oficial");
          return;
        }
        if (xtreamEstaLigado()) {
          SaimoAjustes.gravar({
            catalogoXtream: false,
            xtreamOff: true
          });
          homeJaComXtream = false;
          pintarOficialItens();
          recarregarCanaisOficial().then(function () {
            if (homeReady) buildHome(true);
            pintarOficialStatus("Xtream desligado. Os dados ficam neste aparelho.");
            pintarOficialItens();
          });
          return;
        }
        SaimoAjustes.gravar({
          catalogoXtream: true,
          xtreamOff: false
        });
        pintarOficialItens();
        testarXtreamAgora("Meu Xtream ligado.", false);
        return;
      }
      if (id === "parearCelular") {
        abrirParearCelular("oficial");
        return;
      }
      if (id === "restaurar") {
        SaimoOficial.restaurarPadrao();
        SaimoOficial.syncApiUrls();
        SaimoOficial.limparCacheVod();
        pintarOficialStatus("Endereços padrão restaurados.");
        pintarOficialItens();
        return;
      }
      if (id === "atualizar") {
        oficialOcupado = true;
        pintarOficialStatus("Baixando catálogos…");
        recarregarAcervoOficial().then(function () {
          oficialOcupado = false;
          var xt = statusXtreamAtual();
          pintarOficialStatus(xt ? "Listas atualizadas. " + xt : "Listas atualizadas.");
          pintarOficialItens();
        }).catch(function () {
          oficialOcupado = false;
          pintarOficialStatus("Não foi possível atualizar tudo. " + statusXtreamAtual());
          pintarOficialItens();
        });
      }
    }
    function teclaOficial(ch) {
      if (ch === "MAIÚSC") {
        oficialMaiusc = !oficialMaiusc;
        return;
      }
      if (ch === "APAGAR") {
        oficialUrl = oficialUrl.slice(0, -1);
        pintarOficialUrl();
        return;
      }
      if (ch === "LIMPAR") {
        oficialUrl = "";
        pintarOficialUrl();
        return;
      }
      if (ch === "ADICIONAR") {
        salvarOficialUrl();
        return;
      }
      var letra = oficialMaiusc ? ch.toUpperCase() : ch;
      oficialUrl += letra;
      pintarOficialUrl();
    }
    function navegarOficial(code) {
      var cols = 10;
      var total = oficialKeys.length;
      var rows = document.querySelectorAll("#oficial-itens .settings-row");
      if (oficialCampo && oficialZona === "kb") {
        if (code === 37 && oficialKb > 0) oficialKb--;else if (code === 39 && oficialKb < total - 1) oficialKb++;else if (code === 38 && oficialKb - cols >= 0) oficialKb -= cols;else if (code === 40) {
          if (oficialKb + cols < total) oficialKb += cols;else {
            oficialCampo = null;
            oficialZona = "itens";
            pintarOficialUrl();
          }
        } else if (code === 13) teclaOficial(OFICIAL_KEYS[oficialKb]);
      } else if (oficialZona === "itens") {
        if (code === 38 && oficialItem > 0) oficialItem--;else if (code === 38 && oficialCampo) {
          oficialZona = "kb";
        } else if (code === 40 && oficialItem < rows.length - 1) oficialItem++;else if (code === 13) {
          var ac = OFICIAL_ACOES[oficialItem];
          if (ac) executarAcaoOficial(ac.id);
        }
      }
      focoOficial();
    }
    var SETTINGS_GRUPOS = [{
      id: "ligar",
      title: "Ligar",
      desc: "QR do celular"
    }, {
      id: "listas",
      title: "Listas",
      desc: "Xtream e M3U"
    }, {
      id: "imagem",
      title: "Imagem e som",
      desc: "Tela, áudio, ao vivo"
    }, {
      id: "play",
      title: "Reprodução",
      desc: "Episódio e relógio"
    }, {
      id: "restricao",
      title: "Restrições",
      desc: "PIN e adulto"
    }, {
      id: "sobre",
      title: "Sobre",
      desc: "App e histórico"
    }];
    var SETTINGS_DEFS = [{
      key: "ligarCelular",
      grupo: "ligar",
      title: "Mostrar o QR",
      desc: "Aponte a câmera. O código vale 6 minutos",
      type: "action"
    }, {
      key: "listasOficiais",
      grupo: "listas",
      title: "Listas oficiais",
      desc: "Saimo e Xtream",
      type: "action"
    }, {
      key: "minhasListas",
      grupo: "listas",
      title: "Minhas listas",
      desc: "Listas do QR · ligar ou tirar daqui",
      type: "action"
    }, {
      key: "fillScreen",
      grupo: "imagem",
      title: "Preencher a tela",
      desc: "Corta as bordas em vez de faixas pretas",
      type: "bool"
    }, {
      key: "audioPref",
      grupo: "imagem",
      title: "Áudio preferido",
      desc: "Ordem das fontes em filmes e séries",
      type: "cycle",
      opts: [["dub", "Dublado"], ["leg", "Legendado"]]
    }, {
      key: "audioNorm",
      grupo: "imagem",
      title: "Áudio inteligente",
      desc: "Nivela o volume entre canais e fontes",
      type: "bool"
    }, {
      key: "zeroDelay",
      grupo: "imagem",
      title: "Zero Delay (ao vivo)",
      desc: "Mais perto do ao vivo; agressivo pode engasgar",
      type: "cycle",
      opts: [["off", "Padrão"], ["equilibrado", "Equilibrado"], ["agressivo", "Agressivo"]]
    }, {
      key: "subSize",
      grupo: "imagem",
      title: "Tamanho da legenda",
      desc: "Texto sobre o vídeo",
      type: "cycle",
      opts: [[28, "Pequeno"], [32, "Médio"], [40, "Grande"]]
    }, {
      key: "autoSkip",
      grupo: "play",
      title: "Pular abertura sozinho",
      desc: "Quando o TheIntroDB marcar o trecho",
      type: "bool"
    }, {
      key: "autoNext",
      grupo: "play",
      title: "Próximo episódio automático",
      desc: "Ao chegar nos créditos",
      type: "bool"
    }, {
      key: "openLast",
      grupo: "play",
      title: "Ao abrir o app",
      desc: "Tela inicial ou último título",
      type: "bool",
      on: "Último título",
      off: "Tela inicial"
    }, {
      key: "clock24",
      grupo: "play",
      title: "Relógio",
      desc: "Horário no guia e no OSD",
      type: "bool",
      on: "24 horas",
      off: "12 horas"
    }, {
      key: "hideAdult",
      grupo: "restricao",
      title: "Esconder canais adulto",
      desc: "Pede o PIN para desligar",
      type: "bool",
      pin: true
    }, {
      key: "setpin",
      grupo: "restricao",
      title: "Trocar PIN parental",
      desc: "Quatro dígitos (padrão 0000)",
      type: "action"
    }, {
      key: "fontesBloqueadas",
      grupo: "restricao",
      title: "Fontes desativadas por você",
      desc: "Reativa os servidores bloqueados neste aparelho",
      type: "action"
    }, {
      key: "pacoteEmbutido",
      grupo: "sobre",
      title: "Catálogo do pacote",
      desc: "Usa os arquivos embutidos no app (sem internet)",
      type: "bool"
    }, {
      key: "clear",
      grupo: "sobre",
      title: "Limpar histórico",
      desc: "Continue assistindo e progresso",
      type: "action"
    }];
    function settingValueLabel(def, cfg) {
      if (def.type === "bool") {
        var on = !!cfg[def.key];
        if (def.on) return on ? def.on : def.off;
        return on ? "Ligado" : "Desligado";
      }
      if (def.type === "cycle") {
        var cur = cfg[def.key];
        var hit = (def.opts || []).find(function (o) {
          return o[0] === cur;
        });
        return hit ? hit[1] : String(cur);
      }
      return "OK";
    }
    function defsDoGrupo() {
      var g = SETTINGS_GRUPOS[settingsGrupo] || SETTINGS_GRUPOS[0];
      return SETTINGS_DEFS.filter(function (d) {
        return d.grupo === g.id;
      });
    }
    function focoSettings() {
      var nav = document.getElementById("settings-nav");
      if (nav) {
        Array.prototype.forEach.call(nav.children, function (el, i) {
          el.classList.toggle("is-on", i === settingsGrupo);
          el.classList.toggle("focused", settingsZona === "nav" && i === settingsGrupo);
        });
      }
      if (settingsZona === "nav" && nav && nav.children[settingsGrupo]) {
        setFocus(nav.children[settingsGrupo]);
        return;
      }
      if (settingsList && settingsList.children[settingsIndex]) setFocus(settingsList.children[settingsIndex]);
    }
    function renderSettings() {
      var cfg = SaimoAjustes.ler();
      var g = SETTINGS_GRUPOS[settingsGrupo] || SETTINGS_GRUPOS[0];
      settingsDefs = defsDoGrupo();
      var nav = document.getElementById("settings-nav");
      var heading = document.getElementById("settings-heading");
      var sub = document.getElementById("settings-sub");
      if (heading) heading.textContent = g.title;
      if (sub) sub.textContent = g.desc;
      if (nav) {
        nav.innerHTML = "";
        SETTINGS_GRUPOS.forEach(function (item, i) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "tv-ajustes-nav-item";
          b.innerHTML = '<div class="nav-title">' + item.title + '</div><div class="nav-desc">' + item.desc + "</div>";
          b.addEventListener("click", function () {
            settingsGrupo = i;
            settingsIndex = 0;
            settingsZona = item.id === "ligar" ? "nav" : "lista";
            renderSettings();
            if (item.id === "ligar") abrirParearCelular("settings");
          });
          nav.appendChild(b);
        });
      }
      if (settingsList) {
        settingsList.innerHTML = "";
        var nBloqueadas = window.SaimoFontesLive ? SaimoFontesLive.bloqueadosPeloUsuario().length : 0;
        settingsDefs.forEach(function (def, i) {
          var nListas = window.SaimoListas ? SaimoListas.listas.length : 0;
          var titulo = def.key === "fontesBloqueadas" && nBloqueadas ? def.title + " (" + nBloqueadas + ")" : def.key === "minhasListas" && nListas ? def.title + " (" + nListas + ")" : def.title;
          var row = document.createElement("div");
          row.className = "settings-row";
          row.innerHTML = '<div><div class="s-title">' + titulo + '</div><div class="s-desc">' + def.desc + '</div></div><div class="s-val">' + settingValueLabel(def, cfg) + "</div>";
          row.addEventListener("click", function () {
            settingsIndex = i;
            settingsZona = "lista";
            activateSetting();
          });
          settingsList.appendChild(row);
        });
      }
      if (settingsVer) {
        var ver = window.SaimoVersao ? SaimoVersao.ATUAL : "1.0.4";
        settingsVer.textContent = "Saimo TV (" + ver + ") - atualizado por NeXus";
      }
      if (settingsIndex >= settingsDefs.length) settingsIndex = 0;
      focoSettings();
    }
    function renderHomeEdit() {
      if (!homeEditList) return;
      homeEditList.innerHTML = "";
      HOME_EDIT_DEFS.forEach(function (def, i) {
        var on = blocoLigado(def.key);
        var row = document.createElement("div");
        row.className = "settings-row";
        row.innerHTML = '<div class="s-title">' + def.title + "</div>" + '<div class="home-edit-val"><span class="s-val">' + (on ? "Ligado" : "Desligado") + "</span>" + '<div class="home-edit-switch' + (on ? " on" : "") + '" aria-hidden="true"><span></span></div></div>';
        row.addEventListener("click", function () {
          homeEditIndex = i;
          alternarBlocoHome();
        });
        homeEditList.appendChild(row);
      });
      if (homeEditIndex >= HOME_EDIT_DEFS.length) homeEditIndex = 0;
      setFocus(homeEditList.children[homeEditIndex]);
    }
    function openHomeEdit() {
      currentScreen = "homeedit";
      showScreen("homeedit");
      homeEditIndex = 0;
      renderHomeEdit();
    }
    function alternarBlocoHome() {
      var def = HOME_EDIT_DEFS[homeEditIndex];
      if (!def) return;
      gravarBloco(def.key, !blocoLigado(def.key));
      renderHomeEdit();
      buildHome(true);
    }
    function openSettings() {
      currentScreen = "settings";
      showScreen("settings");
      settingsIndex = 0;
      settingsGrupo = 0;
      settingsZona = "nav";
      renderSettings();
    }
    function activateSetting() {
      var def = settingsDefs[settingsIndex] || SETTINGS_DEFS[settingsIndex];
      if (!def) return;
      if (def.type === "action") {
        if (def.key === "ligarCelular") {
          abrirParearCelular("settings");
          return;
        }
        if (def.key === "clear") {
          try {
            localStorage.removeItem("saimo_progress");
            localStorage.removeItem("saimo_history");
            localStorage.removeItem("saimo_last_live");
            localStorage.removeItem("saimo_live_recent");
          } catch (e) {
            if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("limpar_historico_erro", (e && e.message) || "");
          }
          renderSettings();
          return;
        }
        if (def.key === "fontesBloqueadas") {
          if (window.SaimoFontesLive) SaimoFontesLive.reativarTudo();
          renderSettings();
          return;
        }
        if (def.key === "minhasListas") {
          openListas();
          return;
        }
        if (def.key === "listasOficiais") {
          openOficialListas();
          return;
        }
        if (def.key === "setpin") {
          openPin("new", function () {
            return renderSettings();
          });
          return;
        }
      }
      if (def.type === "bool") {
        var _SaimoAjustes$gravar;
        var cfg = SaimoAjustes.ler();
        var next = !cfg[def.key];
        if (def.pin && cfg[def.key] === true && next === false) {
          openPin("check", function () {
            SaimoAjustes.gravar({
              hideAdult: false
            });
            renderSettings();
          });
          return;
        }
        SaimoAjustes.gravar((_SaimoAjustes$gravar = {}, _SaimoAjustes$gravar[def.key] = next, _SaimoAjustes$gravar));
        if (def.key === "pacoteEmbutido") {
          recarregarAcervoOficial().catch(function () {});
        }
      } else if (def.type === "cycle") {
        var _SaimoAjustes$gravar2;
        var _cfg = SaimoAjustes.ler();
        var opts = def.opts;
        var i = opts.findIndex(function (o) {
          return o[0] === _cfg[def.key];
        });
        var n = opts[(i + 1) % opts.length][0];
        SaimoAjustes.gravar((_SaimoAjustes$gravar2 = {}, _SaimoAjustes$gravar2[def.key] = n, _SaimoAjustes$gravar2));
      }
      renderSettings();
    }
    function openPin(mode, after) {
      pinMode = mode;
      pinAfter = after;
      pinBuffer = "";
      pinPrompt.textContent = mode === "new" ? "Novo PIN de 4 dígitos" : "Digite o PIN";
      pinDots.textContent = "••••";
      pinPad.innerHTML = "";
      "1234567890".split("").forEach(function (d) {
        var el = document.createElement("div");
        el.className = "kb-key";
        el.textContent = d;
        el.dataset.ch = d;
        pinPad.appendChild(el);
      });
      currentScreen = "pin";
      showScreen("pin");
      setFocus(pinPad.children[0]);
    }
    function pinDigit(d) {
      pinBuffer += d;
      pinDots.textContent = "••••".slice(pinBuffer.length) + pinBuffer.replace(/./g, "●");
      if (pinBuffer.length < 4) return;
      if (pinMode === "new") {
        SaimoAjustes.setPin(pinBuffer);
        pinScreen.classList.remove("active");
        currentScreen = "settings";
        showScreen("settings");
        renderSettings();
        return;
      }
      if (pinBuffer === SaimoAjustes.pin()) {
        pinScreen.classList.remove("active");
        currentScreen = "settings";
        showScreen("settings");
        if (pinAfter) pinAfter();
        else renderSettings();
      } else {
        pinBuffer = "";
        pinPrompt.textContent = "PIN incorreto. Tente de novo.";
        pinDots.textContent = "••••";
      }
    }
    function openEvents() {
      return _openEvents.apply(this, arguments);
    }
    function _openEvents() {
      _openEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29() {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              currentScreen = "eventos";
              showScreen("eventos");
              eventsList.innerHTML = "<p class='event-meta'>Carregando jogos...</p>";
              _context29.n = 1;
              return SaimoExtra.jogos(liveChannelsAll);
            case 1:
              eventsData = _context29.v;
              eventsList.innerHTML = "";
              if (eventsData.length) {
                _context29.n = 2;
                break;
              }
              eventsList.innerHTML = "<p class='event-meta'>Nenhum jogo com canal na lista agora.</p>";
              setFocus(btnEventsBack);
              return _context29.a(2);
            case 2:
              eventsData.forEach(function (j) {
                var card = document.createElement("div");
                card.className = "event-card";
                var logos = document.createElement("div");
                logos.className = "event-logos";
                if (j.casaLogo) {
                  var i = document.createElement("img");
                  i.src = j.casaLogo;
                  logos.appendChild(i);
                }
                if (j.foraLogo) {
                  var _i5 = document.createElement("img");
                  _i5.src = j.foraLogo;
                  logos.appendChild(_i5);
                }
                var txt = document.createElement("div");
                var live = SaimoExtra.aoVivo(j);
                txt.innerHTML = '<div class="event-title">' + j.casa + " x " + j.fora + (j.placar ? "  " + j.placar : "") + "</div>" + '<div class="event-meta">' + (live ? "AO VIVO · " : "") + (j.liga ? j.liga + " · " : "") + SaimoExtra.quando(j.inicio) + (nomeCanalJogo(j) ? " · " + nomeCanalJogo(j) : "") + (j.canal ? "" : " · canal fora da lista") + "</div>";
                card.appendChild(logos);
                card.appendChild(txt);
                eventsList.appendChild(card);
              });
              eventsIndex = 0;
              setFocus(eventsList.children[0]);
            case 3:
              return _context29.a(2);
          }
        }, _callee29);
      }));
      return _openEvents.apply(this, arguments);
    }
    function iniciaisRadio(nome) {
      var partes = String(nome || "").replace(/[0-9.]/g, " ").split(/\s+/).filter(function (p) {
        return p && p.length > 1 && !/^(fm|am|web|rádio|radio|hd)$/i.test(p);
      });
      var a = (partes[0] || nome || "?").charAt(0);
      var b = partes[1] ? partes[1].charAt(0) : "";
      return (a + b).toUpperCase();
    }
    function capaRadioEl(r) {
      var box = document.createElement("div");
      box.className = "radio-capa";
      if (r.logo) {
        var img = document.createElement("img");
        img.alt = "";
        img.src = r.logo;
        img.addEventListener("error", function () {
          box.textContent = iniciaisRadio(r.name);
          box.classList.add("sem-imagem");
          if (img.parentNode) img.parentNode.removeChild(img);
        });
        box.appendChild(img);
      } else {
        box.textContent = iniciaisRadio(r.name);
        box.classList.add("sem-imagem");
      }
      return box;
    }
    function cardRadio(r) {
      var card = document.createElement("div");
      card.className = "radio-card";
      card.appendChild(capaRadioEl(r));
      var nm = document.createElement("div");
      nm.className = "mini-name";
      nm.textContent = r.name;
      card.appendChild(nm);
      return card;
    }
    function botoesRadioMini() {
      return [btnRadioPrev, btnRadioToggle, btnRadioNext, btnRadioLista, btnRadioStop].filter(Boolean);
    }
    function relogioDaTela() {
      if (currentScreen === "catalog") return catalogClock;
      if (currentScreen === "browse") return browseClock;
      if (currentScreen === "radios" || currentScreen === "radioscard") return radiosClock;
      if (currentScreen === "eventos") return eventsClock;
      if (currentScreen === "guia") return guideClock;
      if (currentScreen === "home" || currentScreen === "jogoshoje" || currentScreen === "info" || currentScreen === "series") return homeClock;
      return null;
    }
    function encaixarRadioMini() {
      if (!radioMini) return;
      var clock = relogioDaTela();
      if (clock && clock.offsetParent) {
        radioMini.classList.remove("flutua");
        clock.parentNode.insertBefore(radioMini, clock);
        var alvo = clock.parentNode;
        while (alvo && alvo !== document.body && !(alvo.classList && (alvo.classList.contains("home-header") || alvo.classList.contains("header")))) alvo = alvo.parentNode;
        if (alvo && alvo.classList) alvo.classList.toggle("com-radio", !!radioAtual);
        return;
      }
      radioMini.classList.add("flutua");
      document.body.appendChild(radioMini);
    }
    function pintarRadioMini(pausada) {
      encaixarRadioMini();
      if (radioMiniNome) radioMiniNome.textContent = radioAtual ? radioAtual.name : "";
      if (!btnRadioToggle) return;
      var parado = !radioAtual;
      var emPausa = parado || pausada === true || pausada !== false && (!radioAudio || radioAudio.paused);
      btnRadioToggle.innerHTML = emPausa ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.2v13.6l11.2-6.8z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 4.5h3.4v15H6.5zm7.6 0h3.4v15h-3.4z"/></svg>';
      btnRadioToggle.setAttribute("aria-label", emPausa ? "Tocar" : "Pausar");
      if (radioNow) {
        radioNow.textContent = parado ? "Parada" : emPausa ? "Pausada" : "No ar";
        radioNow.classList.toggle("hidden", !parado);
      }
    }
    function silenciarRadio() {
      radioAtual = null;
      if (radioAudio) {
        radioAudio.pause();
        radioAudio.removeAttribute("src");
      }
      if (radioMini) radioMini.classList.add("hidden");
      pintarRadioMini(true);
    }
    function entrarRadioMini() {
      var btns = botoesRadioMini();
      if (!btns.length || !radioAtual || !radioMini || radioMini.classList.contains("hidden")) return false;
      radioMiniAtivo = true;
      radioMiniIndex = 0;
      if (currentScreen === "home") homeZone = "radiomini";
      setFocus(btns[0]);
      return true;
    }
    function sairRadioMini() {
      radioMiniAtivo = false;
      if (currentScreen === "home") {
        homeZone = "header";
        headerIndex = Math.max(0, headerBtns.length - 1);
        updateHomeFocus();
        return;
      }
      if (currentScreen === "catalog") {
        catalogZone = "search";
        updateCatalogFocus();
        return;
      }
      if (currentScreen === "browse") {
        var temSubnav = browseKind !== "favoritos" && browseTabEls.length;
        browseZone = btnBrowseAz && temSubnav ? "az" : btnBrowseSearch ? "search" : "back";
        updateBrowseFocus();
        return;
      }
      if (currentScreen === "guia") {
        guideZone = "now";
        updateGuideFocus();
        return;
      }
      if (currentScreen === "settings") {
        focoSettings();
        return;
      }
      if (currentScreen === "homeedit" && homeEditList && homeEditList.children[homeEditIndex]) {
        setFocus(homeEditList.children[homeEditIndex]);
        return;
      }
      if (currentScreen === "eventos") {
        setFocus(btnEventsBack);
        return;
      }
      if (currentScreen === "radios") {
        setFocus(btnRadiosBack);
        return;
      }
    }
    function ativarRadioMini() {
      var btns = botoesRadioMini();
      var btn = btns[radioMiniIndex];
      if (btn === btnRadioPrev) radioVizinha(-1);else if (btn === btnRadioNext) radioVizinha(1);else if (btn === btnRadioToggle) alternarRadio();else if (btn === btnRadioLista) openRadiosCard();else if (btn === btnRadioStop) pararRadio();
    }
    function navegarRadioMini(e, code) {
      var btns = botoesRadioMini();
      if (code === 37) {
        e.preventDefault();
        if (radioMiniIndex > 0) {
          radioMiniIndex--;
          setFocus(btns[radioMiniIndex]);
        } else sairRadioMini();
      } else if (code === 39 && radioMiniIndex < btns.length - 1) {
        e.preventDefault();
        radioMiniIndex++;
        setFocus(btns[radioMiniIndex]);
      } else if (code === 40) {
        e.preventDefault();
        sairRadioMini();
      } else if (code === 13) {
        e.preventDefault();
        ativarRadioMini();
      }
    }
    function montarTecladoRadios() {
      montarTecladoEm(radiosBuscaTeclado, radiosBuscaTeclas, digitarRadioBusca);
    }
    function pintarRadiosBusca() {
      if (radiosBuscaQueryEl) radiosBuscaQueryEl.textContent = (radiosBuscaQuery || "") + "_";
      var termo = radiosBuscaQuery;
      radiosBuscaLista = !termo ? [] : radiosData.map(function (r) {
        return {
          r: r,
          n: notaBusca(r.name, termo)
        };
      }).filter(function (x) {
        return x.n >= 0;
      }).sort(function (a, b) {
        return a.n - b.n || a.r.name.localeCompare(b.r.name, "pt");
      }).map(function (x) {
        return x.r;
      });
      if (radiosBuscaIndex >= radiosBuscaLista.length) radiosBuscaIndex = 0;
      if (radiosBuscaGrade) {
        radiosBuscaGrade.innerHTML = "";
        radiosBuscaLista.forEach(function (r) {
          return radiosBuscaGrade.appendChild(cardRadio(r));
        });
      }
      if (radiosBuscaContagem) {
        radiosBuscaContagem.textContent = !termo ? "Digite o nome da rádio" : radiosBuscaLista.length ? radiosBuscaLista.length + " rádios" : "Nenhuma rádio";
      }
      if (!radiosBuscaLista.length && radiosBuscaZona === "grade") radiosBuscaZona = "kb";
    }
    function digitarRadioBusca(ch) {
      if (aplicarModoTeclado(ch)) return;
      if (ch === "APAGAR") radiosBuscaQuery = radiosBuscaQuery.slice(0, -1);else if (ch === "LIMPAR") radiosBuscaQuery = "";else if (ch === "ESPAÇO") radiosBuscaQuery += " ";else radiosBuscaQuery += ch;
      radiosBuscaIndex = 0;
      pintarRadiosBusca();
      focarRadiosBusca();
    }
    function focarRadiosBusca() {
      if (radiosBuscaZona === "grade" && radiosBuscaGrade && radiosBuscaGrade.children[radiosBuscaIndex]) {
        setFocus(radiosBuscaGrade.children[radiosBuscaIndex]);
        return;
      }
      radiosBuscaZona = "kb";
      setFocus(radiosBuscaTeclas[radiosBuscaKb] || radiosBuscaTeclas[0]);
    }
    function openRadiosBusca() {
      return _openRadiosBusca.apply(this, arguments);
    }
    function _openRadiosBusca() {
      _openRadiosBusca = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              if (radiosData.length) {
                _context30.n = 2;
                break;
              }
              _context30.n = 1;
              return SaimoExtra.radios();
            case 1:
              radiosData = _context30.v;
            case 2:
              montarTecladoRadios();
              if (currentScreen !== "radiobusca") radiosBuscaVolta = currentScreen;
              radiosBuscaQuery = "";
              radiosBuscaZona = "kb";
              radiosBuscaKb = 0;
              radiosBuscaIndex = 0;
              radiosBuscaLista = [];
              currentScreen = "radiobusca";
              if (radiosBuscaVolta === "radios") showScreen("radiobusca");else if (radiosBusca) {
                radiosBusca.classList.add("active");
                encaixarRadioMini();
              }
              pintarRadiosBusca();
              focarRadiosBusca();
            case 3:
              return _context30.a(2);
          }
        }, _callee30);
      }));
      return _openRadiosBusca.apply(this, arguments);
    }
    function closeRadiosBusca() {
      if (radiosBuscaVolta === "radioscard") {
        if (radiosBusca) radiosBusca.classList.remove("active");
        currentScreen = "radioscard";
        var item = radiosCardGrid && radiosCardGrid.children[radiosCardIndex];
        if (item) setFocus(item);else if (btnRadiosCardBusca) setFocus(btnRadiosCardBusca);
        return;
      }
      currentScreen = "radios";
      showScreen("radios");
      if (radiosGrid && radiosGrid.children[radiosIndex]) setFocus(radiosGrid.children[radiosIndex]);else if (btnRadiosBusca) setFocus(btnRadiosBusca);else setFocus(btnRadiosBack);
    }
    function openRadios() {
      return _openRadios.apply(this, arguments);
    }
    function _openRadios() {
      _openRadios = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31() {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              currentScreen = "radios";
              showScreen("radios");
              _context31.n = 1;
              return SaimoExtra.radios();
            case 1:
              radiosData = _context31.v;
              radiosGrid.innerHTML = "";
              radiosData.forEach(function (r) {
                return radiosGrid.appendChild(cardRadio(r));
              });
              radiosIndex = 0;
              if (radiosGrid.children[0]) setFocus(radiosGrid.children[0]);else setFocus(btnRadiosBack);
            case 2:
              return _context31.a(2);
          }
        }, _callee31);
      }));
      return _openRadios.apply(this, arguments);
    }
    function playRadio(r) {
      if (!radioAudio || !r) return;
      player.stop();
      radioAtual = r;
      radioAudio.src = r.url;
      radioAudio.play().catch(function () {});
      if (radioMini) radioMini.classList.remove("hidden");
      encaixarRadioMini();
      pintarRadioMini(false);
    }
    function alternarRadio() {
      if (!radioAudio || !radioAtual) return;
      if (radioAudio.paused) {
        radioAudio.play().catch(function () {});
        pintarRadioMini(false);
      } else {
        radioAudio.pause();
        pintarRadioMini(true);
      }
    }
    function pararRadio() {
      var estava = radioMiniAtivo;
      silenciarRadio();
      if (estava) sairRadioMini();
    }
    function radioVizinha(delta) {
      if (!radiosData.length || !radioAtual) return;
      var i = 0;
      for (; i < radiosData.length; i++) {
        if (radiosData[i].name === radioAtual.name && radiosData[i].url === radioAtual.url) break;
      }
      if (i >= radiosData.length) i = 0;
      var n = radiosData.length;
      playRadio(radiosData[(i + delta + n) % n]);
    }
    function openRadiosCard() {
      return _openRadiosCard.apply(this, arguments);
    }
    function _openRadiosCard() {
      _openRadiosCard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
        var i, item;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              if (radiosData.length) {
                _context32.n = 2;
                break;
              }
              _context32.n = 1;
              return SaimoExtra.radios();
            case 1:
              radiosData = _context32.v;
            case 2:
              radioCardVolta = currentScreen === "radioscard" ? radioCardVolta : currentScreen;
              currentScreen = "radioscard";
              radiosCardGrid.innerHTML = "";
              radiosData.forEach(function (r) {
                return radiosCardGrid.appendChild(cardRadio(r));
              });
              radiosCardIndex = 0;
              for (i = 0; i < radiosData.length; i++) {
                if (radioAtual && radiosData[i].name === radioAtual.name && radiosData[i].url === radioAtual.url) radiosCardIndex = i;
              }
              radiosCardScreen.classList.add("active");
              radioMiniAtivo = false;
              item = radiosCardGrid.children[radiosCardIndex];
              if (item) setFocus(item);
            case 3:
              return _context32.a(2);
          }
        }, _callee32);
      }));
      return _openRadiosCard.apply(this, arguments);
    }
    function closeRadiosCard() {
      if (radiosCardScreen) radiosCardScreen.classList.remove("active");
      currentScreen = radioCardVolta || "radios";
      encaixarRadioMini();
      var btns = botoesRadioMini();
      if (radioAtual && btns.length) {
        radioMiniAtivo = true;
        radioMiniIndex = Math.min(radioMiniIndex, btns.length - 1);
        if (currentScreen === "home") homeZone = "radiomini";
        setFocus(btns[radioMiniIndex] || btns[0]);
        return;
      }
      if (currentScreen === "home") updateHomeFocus();else if (currentScreen === "radios" && radiosGrid.children[radiosIndex]) setFocus(radiosGrid.children[radiosIndex]);else if (currentScreen === "catalog") updateCatalogFocus();else if (currentScreen === "browse") updateBrowseFocus();
    }
    function restamTxt(stop) {
      var m = Math.max(0, Math.round((stop - Date.now()) / 60000));
      if (m >= 60) return Math.floor(m / 60) + "h " + m % 60 + "m restantes";
      return m + "m restantes";
    }
    function horaGuia(ms) {
      var d = new Date(ms);
      var cfg = window.SaimoAjustes ? SaimoAjustes.ler() : {
        clock24: true
      };
      if (cfg.clock24 === false) {
        var h = d.getHours();
        var ap = h >= 12 ? "PM" : "AM";
        return (h + 11) % 12 + 1 + ":" + String(d.getMinutes()).padStart(2, "0") + ap;
      }
      return SaimoEpg.hhmm(ms);
    }
    function programaFocado() {
      var row = guideData[guideIndex];
      if (!row) return null;
      var lista = row.list || [];
      if (lista[guideProg]) return {
        row: row,
        p: lista[guideProg]
      };
      var agora = Date.now();
      var cur = lista.find(function (p) {
        return p.start <= agora && agora < p.stop;
      }) || lista[0];
      return {
        row: row,
        p: cur || null
      };
    }
    function updateGuideHero() {
      var hit = programaFocado();
      if (!hit || !guideHeroTitle) return;
      var ch = hit.row.ch;
      var p = hit.p;
      if (!p) {
        guideHeroTitle.textContent = ch.name;
        if (guideHeroMeta) guideHeroMeta.textContent = ch.category || "Ao vivo";
        if (guideHeroOverview) guideHeroOverview.textContent = "Sem programação neste canal.";
        var _posterEl = document.getElementById("guide-hero-poster");
        if (_posterEl) _posterEl.style.display = "none";
        return;
      }
      var agora = Date.now();
      var aoVivo = p.start <= agora && agora < p.stop;
      guideHeroTitle.textContent = p.title;
      if (guideHeroMeta) {
        guideHeroMeta.textContent = [ch.name, aoVivo ? restamTxt(p.stop) : horaGuia(p.start), ch.category].filter(Boolean).join("   ·   ");
      }
      if (guideHeroOverview) guideHeroOverview.textContent = p.desc || "Sinopse indisponível.";
      var posterEl = document.getElementById("guide-hero-poster");
      if (posterEl) {
        posterEl.removeAttribute("src");
        posterEl.style.display = "none";
        buscarPosterGuia(p.title).then(function (url) {
          var atual = programaFocado();
          if (!atual || !atual.p || atual.p.title !== p.title) return;
          if (!url) return;
          posterEl.src = url;
          posterEl.style.display = "block";
        });
      }
    }
    var posterGuiaCache = Object.create(null);
    function buscarPosterGuia(_x25) {
      return _buscarPosterGuia.apply(this, arguments);
    }
    function _buscarPosterGuia() {
      _buscarPosterGuia = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(titulo) {
        var k, url;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              k = buscaChave(titulo);
              if (k) {
                _context33.n = 1;
                break;
              }
              return _context33.a(2, "");
            case 1:
              if (!(posterGuiaCache[k] !== undefined)) {
                _context33.n = 2;
                break;
              }
              return _context33.a(2, posterGuiaCache[k]);
            case 2:
              posterGuiaCache[k] = "";
              if (!(!window.SaimoFicha || !SaimoFicha.posterDe)) {
                _context33.n = 3;
                break;
              }
              return _context33.a(2, "");
            case 3:
              _context33.n = 4;
              return SaimoFicha.posterDe(titulo);
            case 4:
              url = _context33.v;
              posterGuiaCache[k] = url || "";
              return _context33.a(2, posterGuiaCache[k]);
          }
        }, _callee33);
      }));
      return _buscarPosterGuia.apply(this, arguments);
    }
    function linhaDoGuia(index) {
      if (!guideList) return null;
      var kids = guideList.children;
      var base = kids[0] && kids[0].classList.contains("guide-ruler") ? 1 : 0;
      return kids[index + base] || null;
    }
    function updateGuideFocus() {
      if (guideZone === "back") {
        setFocus(btnGuideBack);
        return;
      }
      if (guideZone === "now") {
        setFocus(btnGuideNow);
        return;
      }
      var row = linhaDoGuia(guideIndex);
      if (!row) return;
      row.scrollIntoView({
        block: "nearest"
      });
      var logo = row.querySelector(".guide-logo");
      var progs = row.querySelectorAll(".guide-prog");
      Array.prototype.forEach.call(guideList.querySelectorAll(".guide-logo"), function (el) {
        return el.classList.remove("focused");
      });
      if (logo) logo.classList.add("focused");
      if (progs.length) {
        if (guideProg >= progs.length) guideProg = 0;
        if (guideProg < 0) guideProg = 0;
        setFocus(progs[guideProg]);
        progs[guideProg].scrollIntoView({
          inline: "nearest",
          block: "nearest"
        });
      } else if (logo) setFocus(logo);else setFocus(row);
      updateGuideHero();
    }
    function guiaInicio() {
      if (!guideOrigin) {
        var agora = Date.now();
        guideOrigin = agora - 30 * 60000;
        guideOrigin -= guideOrigin % (15 * 60000);
      }
      return guideOrigin;
    }
    function guiaLargura() {
      return GUIDE_SPAN / 60000 * GUIDE_PX;
    }
    function renderGuideRuler() {
      var from = guiaInicio();
      var w = guiaLargura();
      var bar = document.createElement("div");
      bar.className = "guide-ruler";
      bar.style.width = w + "px";
      for (var t = from; t <= from + GUIDE_SPAN; t += 30 * 60000) {
        var tick = document.createElement("div");
        tick.className = "guide-ruler-tick";
        tick.style.left = (t - from) / 60000 * GUIDE_PX + "px";
        tick.textContent = horaGuia(t);
        bar.appendChild(tick);
      }
      return bar;
    }
    function preencherBlocosGuia(blocks, row, i) {
      var agora = Date.now();
      var from = guiaInicio();
      var to = from + GUIDE_SPAN;
      var w = guiaLargura();
      blocks.style.width = w + "px";
      blocks.innerHTML = "";
      if (agora >= from && agora <= to) {
        var nowLine = document.createElement("div");
        nowLine.className = "guide-now-line";
        nowLine.style.left = (agora - from) / 60000 * GUIDE_PX + "px";
        blocks.appendChild(nowLine);
      }
      if (!row.loaded) {
        var empty = document.createElement("div");
        empty.className = "guide-empty";
        empty.textContent = "Carregando...";
        blocks.appendChild(empty);
        return;
      }
      if (!row.list.length) {
        var b = document.createElement("div");
        b.className = "guide-prog now";
        b.style.left = "0px";
        b.style.width = Math.min(280, w) + "px";
        b.innerHTML = '<div class="guide-prog-title">Ao vivo</div><div class="guide-prog-time">' + escHtml(row.ch.name) + "</div>";
        blocks.appendChild(b);
        return;
      }
      row.list.forEach(function (p, pi) {
        var a = Math.max(p.start, from);
        var bStop = Math.min(p.stop, to);
        if (bStop <= a) {
          a = p.start < from ? from : Math.max(from, to - 15 * 60000);
          bStop = a + 15 * 60000;
        }
        var b = document.createElement("div");
        var isNow = p.start <= agora && agora < p.stop;
        b.className = "guide-prog" + (isNow ? " now" : "");
        b.style.left = (a - from) / 60000 * GUIDE_PX + "px";
        b.style.width = Math.max(56, (bStop - a) / 60000 * GUIDE_PX) + "px";
        var sub = isNow ? restamTxt(p.stop) : horaGuia(p.start);
        b.innerHTML = '<div class="guide-prog-title">' + escHtml(p.title) + "</div>" + '<div class="guide-prog-time">' + sub + "</div>";
        if (i === guideIndex && pi === guideProg) b.classList.add("focused");
        blocks.appendChild(b);
      });
    }
    function atualizarStatusGuia() {
      if (!guideStatus) return;
      var falhas = 0;
      var ok = 0;
      var pendente = 0;
      guideData.forEach(function (row) {
        if (!row.loaded) pendente++;else if (row.list.length) ok++;else falhas++;
      });
      if (!pendente && falhas && !ok) guideStatus.textContent = "Guia indisponível";else guideStatus.textContent = "Agora → +6h";
    }
    function renderGuide() {
      if (!guideList) return;
      var w = guiaLargura();
      var top = guideList.scrollTop;
      var left = guideList.scrollLeft;
      guideList.innerHTML = "";
      guideList.appendChild(renderGuideRuler());
      guideData.forEach(function (row, i) {
        var el = document.createElement("div");
        el.className = "guide-row";
        var logo = document.createElement("div");
        logo.className = "guide-logo" + (i === guideIndex ? " focused" : "");
        if (row.ch.logo) {
          var img = document.createElement("img");
          img.src = row.ch.logo;
          img.alt = row.ch.name;
          logo.appendChild(img);
        } else {
          var nm = document.createElement("div");
          nm.className = "guide-logo-name";
          nm.textContent = row.ch.name;
          logo.appendChild(nm);
        }
        pintarEstrela(logo, isFavorited(row.ch.name));
        var blocks = document.createElement("div");
        blocks.className = "guide-blocks";
        blocks.style.width = w + "px";
        preencherBlocosGuia(blocks, row, i);
        el.appendChild(logo);
        el.appendChild(blocks);
        guideList.appendChild(el);
      });
      guideList.scrollTop = top;
      guideList.scrollLeft = left;
      atualizarStatusGuia();
      updateGuideHero();
    }
    function atualizarLinhaGuia(i) {
      var el = linhaDoGuia(i);
      var row = guideData[i];
      if (!el || !row) return;
      var blocks = el.querySelector(".guide-blocks");
      if (!blocks) return;
      preencherBlocosGuia(blocks, row, i);
      atualizarStatusGuia();
      if (i === guideIndex) updateGuideFocus();
    }
    var guiaTicket = 0;
    var guiaAbrindo = false;
    function loadGuideBatch(_x26, _x27) {
      return _loadGuideBatch.apply(this, arguments);
    }
    function _loadGuideBatch() {
      _loadGuideBatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(from, n) {
        var ticket, dados, jobs, i;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              if (window.SaimoEpg) {
                _context35.n = 1;
                break;
              }
              return _context35.a(2);
            case 1:
              ticket = guiaTicket;
              dados = guideData;
              jobs = [];
              i = from;
            case 2:
              if (!(i < Math.min(from + n, dados.length))) {
                _context35.n = 5;
                break;
              }
              if (!(dados[i].loaded || dados[i].empty)) {
                _context35.n = 3;
                break;
              }
              return _context35.a(3, 4);
            case 3:
              jobs.push(function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(idx) {
                  var list, _t14;
                  return _regenerator().w(function (_context34) {
                    while (1) switch (_context34.p = _context34.n) {
                      case 0:
                        list = [];
                        _context34.p = 1;
                        _context34.n = 2;
                        return SaimoEpg.programas(dados[idx].ch);
                      case 2:
                        list = _context34.v;
                        _context34.n = 4;
                        break;
                      case 3:
                        _context34.p = 3;
                        _t14 = _context34.v;
                        list = [];
                      case 4:
                        if (!(ticket !== guiaTicket || guideData !== dados || !dados[idx])) {
                          _context34.n = 5;
                          break;
                        }
                        return _context34.a(2);
                      case 5:
                        dados[idx].list = list || [];
                        dados[idx].loaded = true;
                        atualizarLinhaGuia(idx);
                      case 6:
                        return _context34.a(2);
                    }
                  }, _callee34, null, [[1, 3]]);
                }));
                return function (_x29) {
                  return _ref2.apply(this, arguments);
                };
              }()(i));
            case 4:
              i++;
              _context35.n = 2;
              break;
            case 5:
              if (jobs.length) {
                _context35.n = 6;
                break;
              }
              return _context35.a(2);
            case 6:
              _context35.n = 7;
              return Promise.all(jobs);
            case 7:
              return _context35.a(2);
          }
        }, _callee35);
      }));
      return _loadGuideBatch.apply(this, arguments);
    }
    function openGuide(_x28) {
      return _openGuide.apply(this, arguments);
    }
    function _openGuide() {
      _openGuide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(opts) {
        var ticket, manter, nome, previa, ix, canais, inicio, _t15;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              opts = opts || {};
              if (!(guiaAbrindo && currentScreen === "guia" && !opts.manter)) {
                _context36.n = 1;
                break;
              }
              return _context36.a(2);
            case 1:
              ticket = ++guiaTicket;
              guiaAbrindo = true;
              _context36.p = 2;
              manter = !!opts.manter;
              nome = (opts.nome || "").trim();
              if (!manter) {
                guiaVolta = currentScreen === "catalog" ? "catalog" : "home";
                guideIndex = 0;
                guideProg = 0;
                guideOrigin = 0;
              } else if (nome) {
                previa = liveChannels();
                ix = previa.findIndex(function (c) {
                  return (c.name || "").trim() === nome;
                });
                if (ix >= 0) guideIndex = ix;
              }
              currentScreen = "guia";
              showScreen("guia");
              guideZone = "list";
              canais = liveChannels();
              if (guideIndex < 0 || guideIndex >= canais.length) guideIndex = 0;
              if (!window.SaimoEpg) {
                _context36.n = 6;
                break;
              }
              _context36.p = 3;
              _context36.n = 4;
              return SaimoEpg.ensure();
            case 4:
              _context36.n = 6;
              break;
            case 5:
              _context36.p = 5;
              _t15 = _context36.v;
            case 6:
              if (!(ticket !== guiaTicket)) {
                _context36.n = 7;
                break;
              }
              return _context36.a(2);
            case 7:
              guideData = canais.map(function (ch) {
                var list = window.SaimoEpg ? SaimoEpg.listaLocal(ch.name) || [] : [];
                return {
                  ch: ch,
                  list: list,
                  loaded: list.length > 0,
                  empty: false
                };
              });
              renderGuide();
              updateGuideFocus();
              inicio = Math.max(0, guideIndex - 2);
              _context36.n = 8;
              return loadGuideBatch(inicio, Math.min(24, Math.max(0, canais.length - inicio)));
            case 8:
              _context36.p = 8;
              if (ticket === guiaTicket) guiaAbrindo = false;
              return _context36.f(8);
            case 9:
              return _context36.a(2);
          }
        }, _callee36, null, [[3, 5], [2,, 8, 9]]);
      }));
      return _openGuide.apply(this, arguments);
    }
    function guideNow() {
      var agora = Date.now();
      var row = guideData[guideIndex];
      if (row && row.list && row.list.length) {
        var ix = row.list.findIndex(function (p) {
          return p.start <= agora && agora < p.stop;
        });
        guideProg = ix >= 0 ? ix : 0;
      }
      guideZone = "list";
      updateGuideFocus();
    }
    function tuneGuide() {
      var row = guideData[guideIndex];
      if (!row || !row.ch) return;
      returnScreen = "guia";
      launchPlayer({
        name: row.ch.name,
        category: row.ch.category,
        logo: row.ch.logo,
        isLive: true,
        sources: row.ch.sources
      }, row.ch, null);
    }
    function updateCatalogFocus() {
      if (catalogZone === "busca-kb") {
        var tecla = aovivoBuscaKeys[aovivoBuscaKbIndex];
        if (tecla) setFocus(tecla);
        return;
      }
      if (catalogZone === "back-btn") setFocus(btnBackHub);else if (catalogZone === "guide" && btnCatalogGuide) setFocus(btnCatalogGuide);else if (catalogZone === "search") setFocus(btnCatalogSearch);else if (catalogZone === "categories") {
        var tabs = categoriesBar.querySelectorAll(".cat-tab");
        if (tabs[categoryIndex]) setFocus(tabs[categoryIndex]);
      } else if (catalogZone === "resume") {
        if (btnResumePlay && resumeBanner && !resumeBanner.classList.contains("hidden")) setFocus(btnResumePlay);else {
          catalogZone = "categories";
          updateCatalogFocus();
        }
      } else {
        var cards = channelsGrid.children;
        if (cards[gridIndex]) setFocus(cards[gridIndex]);
      }
    }
    function ctxPodeOkLongo() {
      if (window.SaimoMultiview && SaimoMultiview.isAtivo()) return true;
      if (currentScreen === "search" && searchZone === "results") {
        var g = searchGroups[searchGroup];
        if (g && g.items && g.items[searchCol]) return true;
      }
      if (currentScreen === "info" && infoItem) return true;
      if (currentScreen === "series" && seriesView === "ficha" && seriesZone === "ficha-eps") {
        syncSeriesEpisodeLists();
        if (seriesEpisodesView[seriesFichaEpIndex]) return true;
      }
      if (currentScreen === "series" && seriesView === "ficha" && seriesZone === "play" && currentSeriesItem) return true;
      if (currentScreen === "series" && seriesView === "episodes" && seriesZone === "episodes" && seriesEpisodesView[seriesEpIndex]) return true;
      if (currentScreen === "catalog" && catalogZone === "grid" && activeItemList[gridIndex]) return true;
      if (currentScreen === "browse" && browseZone === "grid" && odItems && odItems.length) return true;
      if (currentScreen === "guia" && guideZone !== "back" && guideZone !== "now") return true;
      if (currentScreen === "player" && player && player.isLive && !zapAberta && !nextCardVisible) return true;
      if (currentScreen === "player" && player && !player.isLive && window.saimoVodPlayer && saimoVodPlayer.active && saimoVodPlayer.podeContexto && saimoVodPlayer.podeContexto()) return true;
      if (currentScreen === "home") {
        if (homeZone === "hero" && homeHeroItem) return true;
        if (homeZone === "rows" && !homeOnLink && homeItem()) return true;
      }
      return false;
    }
    function ctxItemAlvo() {
      if (window.SaimoMultiview && SaimoMultiview.isAtivo()) return {
        tipo: "multiview"
      };
      if (currentScreen === "search" && searchZone === "results") {
        var g = searchGroups[searchGroup];
        return g && g.items ? g.items[searchCol] : null;
      }
      if (currentScreen === "series" && seriesView === "ficha" && seriesZone === "ficha-eps") {
        syncSeriesEpisodeLists();
        var epFicha = seriesEpisodesView[seriesFichaEpIndex];
        if (epFicha && currentSeriesItem) {
          return {
            type: "episode",
            title: currentSeriesItem.title,
            name: currentSeriesItem.title,
            seriesItem: currentSeriesItem,
            ep: epFicha
          };
        }
      }
      if (currentScreen === "series" && seriesView === "episodes" && seriesZone === "episodes") {
        var epSel = seriesEpisodesView[seriesEpIndex];
        if (epSel && currentSeriesItem) {
          return {
            type: "episode",
            title: currentSeriesItem.title,
            name: currentSeriesItem.title,
            seriesItem: currentSeriesItem,
            ep: epSel
          };
        }
      }
      if (currentScreen === "series") return currentSeriesItem;
      if (currentScreen === "info") return infoItem;
      if (currentScreen === "player" && !player.isLive && playingVodItem) return playingVodItem;
      if (currentScreen === "catalog" && catalogZone === "grid") return activeItemList[gridIndex];
      if (currentScreen === "browse" && browseZone === "grid") return itemOdEm(odGridIndex);
      if (currentScreen === "guia" && guideZone !== "back" && guideZone !== "now") {
        var row = guideData[guideIndex];
        return row && row.ch ? row.ch : null;
      }
      if (currentScreen === "player" && player.isLive) return player.currentChannel;
      if (currentScreen === "home" && homeZone === "hero") return homeHeroItem;
      if (currentScreen === "home" && homeZone === "rows" && !homeOnLink) return homeItem();
      return null;
    }
    function executarOkCurtoContexto() {
      if (window.SaimoMultiview && SaimoMultiview.isAtivo()) {
        SaimoMultiview.toggleZoom();
        return;
      }
      if (currentScreen === "home") {
        if (homeZone === "hero") activateHero(heroBtnIndex === 1);else if (homeZone === "rows" && !homeOnLink) activateHomeItem();
        return;
      }
      if (currentScreen === "catalog" && catalogZone === "grid") {
        executeCard(gridIndex);
        return;
      }
      if (currentScreen === "browse" && browseZone === "grid") {
        activateOdItem();
        return;
      }
      if (currentScreen === "guia") {
        tuneGuide();
        return;
      }
      if (currentScreen === "search" && searchZone === "results") {
        activateSearchResult();
        return;
      }
      if (currentScreen === "info") {
        var btnsInfo = visibleInfoButtons();
        if (infoZone === "sources") {
          playInfoItem(false, infoSourceIndex);
          return;
        }
        if (btnsInfo[infoBtnIndex]) btnsInfo[infoBtnIndex].click();
        return;
      }
      if (currentScreen === "series" && seriesView === "ficha") {
        if (seriesZone === "ficha-eps") {
          playFichaEpisode(seriesFichaEpIndex);
          return;
        }
        var btnsSerie = visibleSeriesFichaButtons();
        if (btnsSerie[seriesBtnIndex]) btnsSerie[seriesBtnIndex].click();
        return;
      }
      if (currentScreen === "series" && seriesView === "episodes" && seriesZone === "episodes") {
        var epOk = seriesEpisodesView[seriesEpIndex];
        if (epOk && currentSeriesItem) {
          var ixEp = currentSeriesItem.episodes.indexOf(epOk);
          playSelectedEpisode(ixEp);
        }
        return;
      }
      if (currentScreen === "player" && player && !player.isLive && window.saimoVodPlayer && saimoVodPlayer.active) {
        saimoVodPlayer.handleKey({
          preventDefault: function preventDefault() {}
        }, 13);
        return;
      }
      if (currentScreen === "player" && player.isLive && !zapAberta) abrirFaixa();
    }
    function montarMenuContexto() {
      var item = ctxItemAlvo();
      if (!item) return {
        title: "Opções",
        items: []
      };
      if (item.tipo === "multiview") {
        return {
          title: "Multiview",
          items: [{
            label: "Ampliar / dividir tela",
            action: "ctx-mv-zoom"
          }, {
            label: "Fechar Multiview",
            action: "ctx-mv-fechar"
          }]
        };
      }
      var titulo = (item.title || item.name || "").trim();
      var fav = titulo ? isFavorited(titulo) : false;
      var items = [];
      if (titulo && !(currentScreen === "player" && player && !player.isLive) && item.type !== "episode") {
        items.push({
          label: fav ? "★  Remover dos favoritos" : "☆  Adicionar aos favoritos",
          action: "ctx-fav",
          item: item
        });
      }
      if (item.type === "episode" && item.seriesItem) {
        var titSerie = (item.seriesItem.title || "").trim();
        var favSerie = titSerie ? isFavorited(titSerie) : false;
        if (titSerie) {
          items.push({
            label: favSerie ? "★  Série nos favoritos" : "☆  Favoritar série",
            action: "ctx-fav",
            item: item.seriesItem
          });
        }
        items.push({
          label: "Assistir episódio",
          action: "ctx-play-ep",
          item: item
        });
        items.push({
          label: "Ver todos os episódios",
          action: "ctx-serie-eps",
          item: item.seriesItem
        });
      } else if (currentScreen === "player" && player.isLive && player.currentChannel) {
        items.push({
          label: "Escolher fonte",
          action: "ctx-fontes"
        });
        items.push({
          label: "Lista de canais",
          action: "ctx-zap"
        });
      } else if (currentScreen === "player" && !player.isLive && playingVodItem) {
        if (window.saimoVodPlayer && saimoVodPlayer.abrirAjustes) {
          saimoVodPlayer.abrirAjustes();
          return {
            title: "",
            items: []
          };
        }
        items.push({
          label: fav ? "★  Remover dos favoritos" : "☆  Adicionar aos favoritos",
          action: "ctx-fav",
          item: playingVodItem
        });
        if (window.saimoVodPlayer && saimoVodPlayer.temPularDisponivel && saimoVodPlayer.temPularDisponivel()) {
          items.push({
            label: "Pular abertura",
            action: "ctx-vod-skip"
          });
        }
        items.push({
          label: "Legendas",
          action: "ctx-subs"
        });
        if (player.currentChannel && player.currentChannel.sources && player.currentChannel.sources.length > 1) {
          items.push({
            label: "Escolher fonte",
            action: "ctx-fontes"
          });
        }
      } else if (item.isLive || item.type === "channel") {
        items.push({
          label: "Assistir",
          action: "ctx-play",
          item: item
        });
        if (item.sources && item.sources.length > 1) {
          items.push({
            label: "Escolher fonte…",
            action: "ctx-canal-fontes",
            item: item
          });
        }
      } else if (item.type === "movie" || item.type === "series") {
        items.push({
          label: "Abrir ficha",
          action: "ctx-play",
          item: item
        });
        if (currentScreen === "info" && infoEls.btnTrailer && !infoEls.btnTrailer.classList.contains("hidden")) {
          items.push({
            label: "Trailer",
            action: "ctx-trailer"
          });
        }
        if (currentScreen === "series" && seriesView === "ficha") {
          items.push({
            label: "Lista completa de episódios",
            action: "ctx-serie-eps",
            item: item
          });
        }
      }
      return {
        title: titulo || "Opções",
        items: items
      };
    }
    function launchCanalComFonte(ch, sourceIndex) {
      if (!ch) return;
      var sources = (ch.sources || []).slice();
      var idx = parseInt(sourceIndex, 10) || 0;
      if (idx > 0 && idx < sources.length) {
        var escolhida = sources.splice(idx, 1)[0];
        sources.unshift(escolhida);
      }
      launchPlayer({
        name: ch.name,
        category: ch.category,
        logo: ch.logo,
        isLive: true,
        sources: sources
      }, ch, null);
    }
    function openContextModal(title, items) {
      modalReturnScreen = currentScreen;
      openListModal(title, items, "contexto");
    }
    if (window.SaimoContexto) {
      SaimoContexto.ligar({
        telaModal: function telaModal() {
          if (currentScreen === "modal" || currentScreen === "pin") return true;
          if (currentScreen === "search") return true;
          return false;
        },
        podeOkLongo: ctxPodeOkLongo,
        okCurto: executarOkCurtoContexto,
        montarMenu: montarMenuContexto,
        abrirModal: openContextModal
      });
    }
    function openListModal(title, items, mode) {
      modalMode = mode;
      modalChoices = items;
      modalTitle.textContent = title;
      modalList.innerHTML = "";
      modalIndex = 0;
      var first = 0;
      items.forEach(function (it, i) {
        if (it.action === "grupo" && first === i) first = i + 1;
        var el = document.createElement("div");
        el.className = "modal-item" + (it.action === "grupo" ? " modal-grupo" : "") + (i === first ? " focused" : "");
        el.innerHTML = "<span>" + it.label + "</span>";
        modalList.appendChild(el);
      });
      modalIndex = Math.min(first, items.length - 1);
      currentScreen = "modal";
      modalOverlay.classList.add("active");
      if (modalList.children[modalIndex]) setFocus(modalList.children[modalIndex]);
    }
    function closeListModal() {
      modalOverlay.classList.remove("active");
      var voltar = modalReturnScreen;
      modalReturnScreen = null;
      if (voltar === "player") {
        currentScreen = "player";
        playerContainer.classList.add("active");
      } else if (voltar === "info") {
        currentScreen = "info";
        infoPanel.classList.add("active");
      } else if (voltar === "series") {
        currentScreen = "series";
        seriesScreen.classList.add("active");
      } else if (voltar === "home") {
        currentScreen = "home";
        showScreen("home");
      } else if (voltar === "browse") {
        currentScreen = "browse";
        showScreen("browse");
      } else if (voltar === "guia") {
        currentScreen = "guia";
        showScreen("guia");
      } else if (voltar === "catalog") {
        currentScreen = "catalog";
        showScreen("catalog");
      } else if (playerContainer.classList.contains("active")) currentScreen = "player";else if (infoPanel.classList.contains("active")) currentScreen = "info";else if (seriesScreen.classList.contains("active")) currentScreen = "series";else currentScreen = "catalog";
    }
    function confirmListModal() {
      var choice = modalChoices[modalIndex];
      if (choice && choice.action === "grupo") return;
      closeListModal();
      if (!choice) return;
      if (choice.action === "source") player.playSourceIndex(choice.index);else if (choice.action === "fonte-desativar") {
        if (window.SaimoFontesLive) SaimoFontesLive.bloquearHost(choice.host);
        player.showStatus("Fonte desativada neste aparelho");
        player.showOSD(2500);
        player.nextSource();
      } else if (choice.action === "sub-off") {
        SaimoLegendas.desligar();
        SaimoLegendas.guardarIdioma("");
        player.showStatus("Legendas desligadas");
        player.showOSD(2500);
      } else if (choice.action === "sub") {
        SaimoLegendas.guardarIdioma(choice.opcao.idioma);
        SaimoLegendas.carregar(choice.opcao).then(function () {
          player.showStatus("Legenda: " + choice.opcao.rotulo);
          player.showOSD(2500);
        });
      } else if (choice.action === "sub-delay") {
        SaimoLegendas.atraso += choice.delta;
        player.showStatus("Atraso " + (SaimoLegendas.atraso >= 0 ? "+" : "") + SaimoLegendas.atraso.toFixed(1) + "s");
        player.showOSD(2000);
      } else if (choice.action === "ctx-fav" && choice.item) {
        toggleFavorite(choice.item);
      } else if (choice.action === "ctx-fontes") {
        openSourceMenu();
      } else if (choice.action === "ctx-zap") {
        abrirFaixa();
      } else if (choice.action === "ctx-play" && choice.item) {
        executarOkCurtoContexto();
      } else if (choice.action === "ctx-mv-zoom") {
        if (window.SaimoMultiview) SaimoMultiview.toggleZoom();
      } else if (choice.action === "ctx-mv-fechar") {
        if (window.SaimoMultiview) SaimoMultiview.fechar();
      } else if (choice.action === "ctx-vod-skip") {
        if (player) player.skipIntro();
        if (window.saimoVodPlayer && saimoVodPlayer.esconderBotaoPular) saimoVodPlayer.esconderBotaoPular();
      } else if (choice.action === "ctx-subs") {
        openSubtitleMenu();
      } else if (choice.action === "ctx-trailer") {
        if (infoEls.btnTrailer) infoEls.btnTrailer.click();
      } else if (choice.action === "ctx-play-ep" && choice.item && choice.item.ep && choice.item.seriesItem) {
        var ix = choice.item.seriesItem.episodes.indexOf(choice.item.ep);
        if (ix >= 0) playSelectedEpisode(ix);
      } else if (choice.action === "ctx-serie-eps") {
        openSeriesEpisodesView();
      } else if (choice.action === "ctx-canal-fontes" && choice.item) {
        var canal = choice.item;
        var listaFontes = itensFontesAgrupados(canal, "ctx-canal-fonte-idx", { channel: canal });
        if (listaFontes.length) openContextModal(canal.name || "Fontes", listaFontes);
      } else if (choice.action === "ctx-canal-fonte-idx" && choice.channel != null) {
        launchCanalComFonte(choice.channel, choice.index);
      }
    }
    function itensFontesAgrupados(canal, acao, extra) {
      extra = extra || {};
      var sources = (canal && canal.sources) || [];
      var bloqueados = window.SaimoFontesLive ? SaimoFontesLive.bloqueadosPeloUsuario() : [];
      var hostBloqueado = function hostBloqueado(h) {
        return bloqueados.some(function (m) {
          return h === m || h.indexOf(m) !== -1 || m.indexOf(h) !== -1;
        });
      };
      var grupos = window.SaimoCanaisAoVivo ? SaimoCanaisAoVivo.agruparFontes(sources, canal) : [{
        titulo: "",
        itens: sources.map(function (s, i) {
          return { s: s, i: i };
        })
      }];
      var items = [];
      var g, j, par, s, i, h, rot, tocando;
      for (g = 0; g < grupos.length; g++) {
        if (grupos[g].titulo) {
          items.push({
            label: grupos[g].titulo,
            action: "grupo"
          });
        }
        for (j = 0; j < grupos[g].itens.length; j++) {
          par = grupos[g].itens[j];
          s = par.s;
          i = par.i;
          h = window.SaimoFontesLive ? SaimoFontesLive.hostDe(s.url) : "";
          rot = window.SaimoFontePref ? SaimoFontePref.rotulo(s, i).texto : s.quality || "Fonte " + (i + 1);
          var lat = window.SaimoFontesLive ? SaimoFontesLive.textoLatencia(s.url) : "";
          tocando = player.currentChannel === canal && i === player.currentSourceIndex;
          items.push({
            label: (tocando ? "▶ " : "") + rot + (lat ? "  ·  " + lat : "") + (!s.suaLista && h && hostBloqueado(h) ? "  ·  desativada" : ""),
            action: acao,
            index: i,
            channel: extra.channel
          });
        }
      }
      return items;
    }
    function openSourceMenu() {
      if (!player.currentChannel) return;
      var items = itensFontesAgrupados(player.currentChannel, "source");
      var atual = player.currentChannel.sources[player.currentSourceIndex];
      var hostAtual = atual && !atual.suaLista && window.SaimoFontesLive ? SaimoFontesLive.hostDe(atual.url) : "";
      if (hostAtual) {
        items.push({
          label: "✕  Desativar esta fonte",
          action: "fonte-desativar",
          host: hostAtual
        });
      }
      openListModal("Fontes", items, "sources");
    }
    function openSubtitleMenu() {
      return _openSubtitleMenu.apply(this, arguments);
    }
    function _openSubtitleMenu() {
      _openSubtitleMenu = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
        var isSeries, tmdb, ep, ops, items;
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              if (!(!playingVodItem || !window.SaimoLegendas)) {
                _context37.n = 1;
                break;
              }
              player.showStatus("Legendas só em filme/série");
              player.showOSD(2000);
              return _context37.a(2);
            case 1:
              _context37.n = 2;
              return SaimoFicha.ensureIndex();
            case 2:
              isSeries = playingVodItem.type === "series";
              _context37.n = 3;
              return SaimoFicha.buscarId(playingVodItem.title, isSeries);
            case 3:
              tmdb = _context37.v;
              ep = currentSeriesItem && currentPlayingEpIndex >= 0 ? currentSeriesItem.episodes[currentPlayingEpIndex] : null;
              _context37.n = 4;
              return SaimoLegendas.opcoes(tmdb, isSeries, ep ? parseInt(ep.season, 10) : 0, ep ? parseInt(ep.episode, 10) : 0);
            case 4:
              ops = _context37.v;
              items = [{
                label: "Desligar legendas",
                action: "sub-off"
              }].concat(ops.map(function (o) {
                return {
                  label: o.rotulo,
                  action: "sub",
                  opcao: o
                };
              })).concat([{
                label: "Atraso −0,5s",
                action: "sub-delay",
                delta: -0.5
              }, {
                label: "Atraso +0,5s",
                action: "sub-delay",
                delta: 0.5
              }]);
              openListModal("Legendas", items, "subs");
            case 5:
              return _context37.a(2);
          }
        }, _callee37);
      }));
      return _openSubtitleMenu.apply(this, arguments);
    }
    function isBackKey(e) {
      var c = e.keyCode || e.which;
      return c === 461 || c === 10009 || c === 27 || c === 8 || e.key === "Back" || e.key === "GoBack" || e.key === "Escape" || e.key === "Backspace";
    }
    function handleBack(e) {
      if (!isBackKey(e)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (currentScreen === "modal") {
        closeListModal();
        return;
      }
      if (currentScreen === "pin") {
        pinScreen.classList.remove("active");
        currentScreen = "settings";
        showScreen("settings");
        renderSettings();
        return;
      }
      if (currentScreen === "player") {
        if (zapAberta) {
          fecharFaixa();
          return;
        }
        if (nextCardVisible) {
          nextCardVisible = false;
          if (osdElements.nextEpCard) osdElements.nextEpCard.classList.add("hidden");
          return;
        }
        if (player && !player.isLive && window.saimoVodPlayer && saimoVodPlayer.active) {
          var codeBack = e.keyCode || e.which || 461;
          if (saimoVodPlayer.handleKey(e, codeBack)) return;
        }
        exitPlayer();
      } else if (currentScreen === "trailer") closeTrailer();else if (currentScreen === "info") closeInfoPanel();else if (currentScreen === "series") {
        if (seriesView === "episodes") showSeriesFichaView(true);else closeSeriesScreen();
      } else if (currentScreen === "home" && homeMenuOpen) {
        closeHomeMenu();
      } else if (currentScreen === "home") {
        try {
          window.close();
        } catch (err) {}
      } else if (currentScreen === "catsmais") fecharMaisCategorias();else if (currentScreen === "search") closeSearch();else if (currentScreen === "radiobusca") closeRadiosBusca();else if (currentScreen === "radioscard") closeRadiosCard();else if (currentScreen === "settings" || currentScreen === "homeedit" || currentScreen === "jogoshoje" || currentScreen === "eventos" || currentScreen === "radios") returnToHome();else if (currentScreen === "listas") fecharListas();else if (currentScreen === "parear") fecharParearCelular();else if (currentScreen === "oficial") fecharOficial();else if (currentScreen === "guia") {
        if (guiaVolta === "catalog") {
          currentScreen = "catalog";
          showScreen("catalog");
          updateCatalogFocus();
        } else returnToHome();
      } else if (currentScreen === "browse") {
        if (modoPrateleira() && browseZone === "fly") {
          fecharFly();
          return;
        }
        if (modoPrateleira() && browseZone === "grid") {
          browseZone = "side";
          updateBrowseFocus();
          return;
        }
        voltarBrowse();
      } else if (currentScreen === "catalog") {
        if (aovivoBuscaAberta) {
          fecharBuscaAoVivo();
          return;
        }
        var abaCat = categoriesBar.querySelector(".cat-tab.active");
        if (currentSection === "aovivo" && aovivoMaisNome && (catalogZone === "grid" || catalogZone === "categories")) {
          abrirMaisCategorias("catalog");
          return;
        }
        if (currentSection === "aovivo" && abaCat && ehAbaMais(abaCat.textContent) && !aovivoMaisNome) {
          fecharMaisCategorias();
          return;
        }
        if (catalogZone === "grid") {
          catalogZone = "categories";
          updateCatalogFocus();
        } else if (catalogZone === "resume") {
          catalogZone = "categories";
          updateCatalogFocus();
        } else if (catalogZone === "categories" || catalogZone === "guide") {
          catalogZone = "back-btn";
          updateCatalogFocus();
        } else if (gradeAz) voltarDaGrade();else returnToHome();
      }
    }
    window.addEventListener("keydown", handleBack, true);
    window.addEventListener("keyup", function (e) {
      if (isBackKey(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
    function ativarWebOS() {
      try {
        if (window.webOSSystem && typeof webOSSystem.activate === "function") webOSSystem.activate();else if (window.PalmSystem && typeof PalmSystem.activate === "function") PalmSystem.activate();
      } catch (err) {}
    }
    function restaurarApp() {
      ativarWebOS();
      if (currentScreen === "player") {
        playerContainer.classList.add("active");
        try {
          if (player && player.video && player.video.paused) player.video.play();
        } catch (err) {}
        return;
      }
      var tela = currentScreen || "home";
      if (tela === "search") showScreen("search");else if (tela === "info") showScreen("info");else if (tela === "series") showScreen("series");else if (tela === "settings") showScreen("settings");else if (tela === "catalog") showScreen("catalog");else if (tela === "eventos") showScreen("eventos");else if (tela === "radios") showScreen("radios");else if (tela === "guia") showScreen("guia");else {
        currentScreen = "home";
        showScreen("home");
        updateHomeFocus();
      }
    }
    function persistirCheckpoint() {
      if (window.saimoVodPlayer && window.saimoVodPlayer.active && window.saimoVodPlayer.saveProgressNow) {
        try {
          window.saimoVodPlayer.saveProgressNow();
        } catch (eVod) {}
      }
      if (player && player.flushProgress) player.flushProgress();
    }
    document.addEventListener("webOSRelaunch", restaurarApp, true);
    document.addEventListener("webOSLaunch", ativarWebOS, true);
    document.addEventListener("pagehide", persistirCheckpoint, true);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        persistirCheckpoint();
        if (currentScreen === "player" && player && player.video) {
          try {
            player.video.pause();
          } catch (err) {}
        }
        return;
      }
      restaurarApp();
    }, true);
    document.addEventListener("keyup", function (e) {
      var code = e.keyCode || e.which;
      if (window.SaimoContexto && SaimoContexto.onOkUp(e)) {
        e.preventDefault();
      }
    });
    function handleNav(e) {
      var code = e.keyCode || e.which;
      if (code === 13 && window.SaimoContexto && SaimoContexto.podeOkLongo() && SaimoContexto.onOkDown(e)) {
        e.preventDefault();
        return;
      }
      if (currentScreen === "player" && player && !player.isLive && window.saimoVodPlayer && window.saimoVodPlayer.active) {
        if (code === 13 && ctxPodeOkLongo() && window.SaimoContexto && SaimoContexto.onOkDown(e)) {
          e.preventDefault();
          return;
        }
        if (window.saimoVodPlayer.handleKey(e, code)) {
          e.preventDefault();
          return;
        }
      }
      if (window.SaimoMultiview && SaimoMultiview.isAtivo()) {
        if (isBackKey(e)) {
          e.preventDefault();
          SaimoMultiview.fechar();
          return;
        }
        if (code === 13 && window.SaimoContexto && SaimoContexto.podeOkLongo()) {
          return;
        }
        if (code === 13) {
          SaimoMultiview.toggleZoom();
          return;
        }
        if (code === 37) {
          SaimoMultiview.moverFoco(-1);
          return;
        }
        if (code === 39) {
          SaimoMultiview.moverFoco(1);
          return;
        }
        if (code === 38) {
          SaimoMultiview.moverFoco(-2);
          return;
        }
        if (code === 40) {
          SaimoMultiview.moverFoco(2);
          return;
        }
        var dCanalMv = deltaTeclaCanal(code);
        if (dCanalMv) {
          e.preventDefault();
          SaimoMultiview.trocarCanalTileAtual(dCanalMv);
          return;
        }
      }
      if (code === 37 || code === 38 || code === 39 || code === 40 || code === 13) controleMexeu();
      if (isBackKey(e)) return;
      if (currentScreen === "catsmais") {
        if (code === 37) {
          e.preventDefault();
          moverMaisCategorias(-1, 0);
        } else if (code === 39) {
          e.preventDefault();
          moverMaisCategorias(1, 0);
        } else if (code === 38) {
          e.preventDefault();
          moverMaisCategorias(0, -1);
        } else if (code === 40) {
          e.preventDefault();
          moverMaisCategorias(0, 1);
        } else if (code === 13) {
          e.preventDefault();
          if (catsMaisItens[catsMaisIndex]) escolherCategoriaMais(catsMaisItens[catsMaisIndex].nome);
        }
        return;
      }
      if (currentScreen === "player" && zapAberta) tocarFaixa();
      if (code === 403) {
        e.preventDefault();
        if (currentScreen === "listas") {
          removerListaFocada();
          return;
        }
        if (currentScreen === "player") {
          if (player.cycleEngine) player.cycleEngine();else player.cycleQuality();
        } else if (currentScreen === "radios" || currentScreen === "radioscard") openRadiosBusca();else if (currentScreen !== "search" && currentScreen !== "radiobusca") openSearch();
        return;
      }
      if (code === 404) {
        e.preventDefault();
        if (currentScreen === "player") {
          if (player.lastSkipTipo) {
            player.skipIntro();
          } else if (window.SaimoDiagnostico) {
            SaimoDiagnostico.toggleHUD(player);
          }
        }
        return;
      }
      if (code === 405) {
        e.preventDefault();
        if (currentScreen === "catalog" && catalogZone === "grid" && activeItemList[gridIndex]) toggleFavorite(activeItemList[gridIndex]);else if (currentScreen === "info" && infoItem) toggleFavorite(infoItem);else if (currentScreen === "series" && currentSeriesItem) toggleFavorite(currentSeriesItem);else if (currentScreen === "player" && playingVodItem) toggleFavorite(playingVodItem);else if (currentScreen === "player" && player.currentChannel) toggleFavorite(player.currentChannel);else if (currentScreen === "home") {
          var alvo = homeZone === "hero" ? homeHeroItem : homeItem();
          if (alvo) toggleFavorite(alvo);
        } else if (currentScreen === "browse") {
          var _alvo = browseItem();
          if (_alvo && _alvo.type !== "acao") {
            toggleFavorite(_alvo);
            if (browseKind === "favoritos") openBrowse("favoritos", {
              substituir: true,
              manterFoco: true
            });
          }
        } else if (currentScreen === "guia" && guideZone === "list") {
          var row = guideData[guideIndex];
          if (row && row.ch) toggleFavorite(row.ch);
        }
        return;
      }
      if (code === 406) {
        e.preventDefault();
        if (currentScreen === "player") openSubtitleMenu();
        return;
      }
      if (radioMiniAtivo && radioMini && currentFocusedElement && radioMini.contains(currentFocusedElement)) {
        navegarRadioMini(e, code);
        return;
      }
      if (currentScreen === "radioscard") {
        var cols = 4;
        var total = radiosData.length;
        if (currentFocusedElement === btnRadiosCardBusca) {
          if (code === 40 && radiosCardGrid.children.length) {
            e.preventDefault();
            setFocus(radiosCardGrid.children[radiosCardIndex] || radiosCardGrid.children[0]);
          } else if (code === 13) {
            e.preventDefault();
            openRadiosBusca();
          }
          return;
        }
        if (code === 37 && radiosCardIndex > 0) {
          e.preventDefault();
          radiosCardIndex--;
          setFocus(radiosCardGrid.children[radiosCardIndex]);
        } else if (code === 39 && radiosCardIndex < total - 1) {
          e.preventDefault();
          radiosCardIndex++;
          setFocus(radiosCardGrid.children[radiosCardIndex]);
        } else if (code === 38) {
          e.preventDefault();
          if (radiosCardIndex - cols >= 0) {
            radiosCardIndex -= cols;
            setFocus(radiosCardGrid.children[radiosCardIndex]);
          } else if (btnRadiosCardBusca) setFocus(btnRadiosCardBusca);
        } else if (code === 40 && radiosCardIndex + cols < total) {
          e.preventDefault();
          radiosCardIndex += cols;
          setFocus(radiosCardGrid.children[radiosCardIndex]);
        } else if (code === 13) {
          e.preventDefault();
          playRadio(radiosData[radiosCardIndex]);
          closeRadiosCard();
        }
        return;
      }
      if (currentScreen === "listas") {
        e.preventDefault();
        navegarListas(code);
        return;
      }
      if (currentScreen === "oficial") {
        e.preventDefault();
        navegarOficial(code);
        return;
      }
      if (currentScreen === "home") {
        if (code === 37 || code === 38 || code === 39 || code === 40 || code === 13) menuMexeu = true;
        if (homeZone === "menu") {
          if (code === 38 && sideMenuIndex > 0) {
            e.preventDefault();
            sideMenuIndex--;
            updateHomeFocus();
          } else if (code === 40 && sideMenuIndex < homeSideItems.length - 1) {
            e.preventDefault();
            sideMenuIndex++;
            updateHomeFocus();
          } else if (code === 39) {
            e.preventDefault();
            closeHomeMenu();
          } else if (code === 13) {
            e.preventDefault();
            activateSideMenu();
          }
          return;
        }
        if (homeZone === "header") {
          if (code === 37) {
            e.preventDefault();
            if (headerIndex > 0) headerIndex--;else {
              homeZone = "explore";
              exploreIndex = Math.max(0, exploreChips.length - 1);
            }
            updateHomeFocus();
          } else if (code === 39 && headerIndex < headerBtns.length - 1) {
            e.preventDefault();
            headerIndex++;
            updateHomeFocus();
          } else if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 40) {
            e.preventDefault();
            homeZone = homeAfterExplore();
            if (homeZone === "rows") prepararFileiraInicial();else {
              homeRow = 0;
              homeCol = 0;
              homeOnLink = false;
            }
            updateHomeFocus();
          } else if (code === 13) {
            e.preventDefault();
            if (headerBtns[headerIndex] === btnOpenSearch) openSearch();else if (headerBtns[headerIndex] === btnOpenHomeEdit) openHomeEdit();else openSettings();
          }
        } else if (homeZone === "explore") {
          if (code === 37) {
            e.preventDefault();
            if (exploreIndex > 0) exploreIndex--;else openHomeMenu();
            if (homeZone === "explore") updateHomeFocus();
          } else if (code === 39) {
            e.preventDefault();
            if (exploreIndex < exploreChips.length - 1) exploreIndex++;else if (headerBtns.length) {
              homeZone = "header";
              headerIndex = 0;
            }
            updateHomeFocus();
          } else if (code === 40) {
            e.preventDefault();
            homeZone = homeAfterExplore();
            if (homeZone === "rows") prepararFileiraInicial();else {
              homeRow = 0;
              homeCol = 0;
              homeOnLink = false;
            }
            updateHomeFocus();
          } else if (code === 13) {
            e.preventDefault();
            activateExplore();
          }
        } else if (homeZone === "hero") {
          if (code === 37 && heroBtnIndex > 0) {
            e.preventDefault();
            heroBtnIndex--;
            updateHomeFocus();
          } else if (code === 37) {
            e.preventDefault();
            openHomeMenu();
          } else if (code === 39 && heroBtnIndex < 1) {
            e.preventDefault();
            heroBtnIndex++;
            updateHomeFocus();
          } else if (code === 38) {
            e.preventDefault();
            homeZone = "explore";
            updateHomeFocus();
          } else if (code === 40) {
            e.preventDefault();
            homeZone = hookVisible() ? "hook" : "rows";
            if (homeZone === "rows") prepararFileiraInicial();else {
              homeRow = 0;
              homeCol = 0;
            }
            updateHomeFocus();
          } else if (code === 13) {
            e.preventDefault();
            activateHero(heroBtnIndex === 1);
          }
        } else if (homeZone === "hook") {
          if (code === 37) {
            e.preventDefault();
            openHomeMenu();
          } else if (code === 38) {
            e.preventDefault();
            homeZone = heroVisivel() ? "hero" : "explore";
            updateHomeFocus();
          } else if (code === 40) {
            e.preventDefault();
            homeZone = "rows";
            prepararFileiraInicial();
            updateHomeFocus();
          } else if (code === 13) {
            e.preventDefault();
            activateHook();
          }
        } else {
          var _row = homeData[homeRow];
          var n = _row ? _row.items.length : 0;
          if (homeOnLink) {
            if (code === 37) {
              e.preventDefault();
              openHomeMenu();
            } else if (code === 39 && n > 0) {
              e.preventDefault();
              homeOnLink = false;
              homeCol = 0;
              updateHomeFocus();
            } else if (code === 38) {
              e.preventDefault();
              moverFileiraHome(-1);
              updateHomeFocus();
            } else if (code === 40) {
              e.preventDefault();
              moverFileiraHome(1);
              updateHomeFocus();
            } else if (code === 13) {
              e.preventDefault();
              activateRowLink();
            }
            return;
          }
          var dCanalHome = deltaTeclaCanal(code);
          if (dCanalHome && _row && _row.live) {
            e.preventDefault();
            moverFocoCanalHome(dCanalHome);
            return;
          }
          if (code === 37) {
            e.preventDefault();
            if (homeCol > 0) {
              homeCol--;
              updateHomeFocus();
            } else openHomeMenu();
          } else if (code === 39 && homeCol < n - 1) {
            e.preventDefault();
            homeCol++;
            updateHomeFocus();
          } else if (code === 38) {
            e.preventDefault();
            moverFileiraHome(-1);
            updateHomeFocus();
          } else if (code === 40) {
            e.preventDefault();
            moverFileiraHome(1);
            updateHomeFocus();
          } else if (code === 13) {
            e.preventDefault();
            activateHomeItem();
          }
        }
        return;
      }
      if (currentScreen === "search") {
        if (searchZone === "kb") {
          var _cols = KB_COLS;
          var _total = kbKeys.length;
          if (code === 37) {
            e.preventDefault();
            kbIndex = (kbIndex + _total - 1) % _total;
            updateSearchFocus();
          } else if (code === 39) {
            e.preventDefault();
            kbIndex = tecladoDireita(kbIndex, _total, _cols, !!searchGroups.length, function () {
              searchZone = "results";
              searchGroup = 0;
              searchCol = 0;
            });
            updateSearchFocus();
          } else if (code === 38) {
            e.preventDefault();
            if (kbIndex >= _cols) kbIndex -= _cols;
            updateSearchFocus();
          } else if (code === 40) {
            e.preventDefault();
            if (kbIndex + _cols < _total) kbIndex += _cols;
            else if (searchGroups.length) {
              searchZone = "results";
              searchGroup = 0;
              searchCol = 0;
            }
            updateSearchFocus();
          } else if (code === 13) {
            e.preventDefault();
            var teclaBusca = kbKeys[kbIndex];
            if (teclaBusca) typeKey(teclaBusca.dataset.ch);
          }
        } else {
          var g = searchGroups[searchGroup];
          var _n = g ? g.items.length : 0;
          if (code === 37) {
            e.preventDefault();
            if (searchCol > 0) searchCol--;
            updateSearchFocus();
          } else if (code === 39 && searchCol < _n - 1) {
            e.preventDefault();
            searchCol++;
            updateSearchFocus();
          } else if (code === 38) {
            e.preventDefault();
            if (searchGroup > 0) {
              searchGroup--;
              searchCol = Math.min(searchCol, searchGroups[searchGroup].items.length - 1);
            } else searchZone = "kb";
            updateSearchFocus();
          } else if (code === 40) {
            e.preventDefault();
            if (searchGroup < searchGroups.length - 1) {
              searchGroup++;
              searchCol = Math.min(searchCol, searchGroups[searchGroup].items.length - 1);
            }
            updateSearchFocus();
          } else if (code === 13) {
            e.preventDefault();
            if (window.SaimoContexto) SaimoContexto.cancelar();
            activateSearchResult();
          }
        }
        return;
      }
      if (currentScreen === "jogoshoje") {
        if (code === 38 && jogosHojeIndex > 0) {
          e.preventDefault();
          jogosHojeIndex--;
          setFocus(itensJogosHoje()[jogosHojeIndex]);
        } else if (code === 40 && jogosHojeIndex < homeJogosHoje.length - 1) {
          e.preventDefault();
          jogosHojeIndex++;
          setFocus(itensJogosHoje()[jogosHojeIndex]);
        } else if (code === 13) {
          e.preventDefault();
          abrirJogo(homeJogosHoje[jogosHojeIndex]);
        }
        return;
      }
      if (currentScreen === "homeedit") {
        if (code === 38 && homeEditIndex === 0 && radioAtual) {
          e.preventDefault();
          entrarRadioMini();
        } else if (code === 38 && homeEditIndex > 0) {
          e.preventDefault();
          homeEditIndex--;
          setFocus(homeEditList.children[homeEditIndex]);
        } else if (code === 40 && homeEditIndex < HOME_EDIT_DEFS.length - 1) {
          e.preventDefault();
          homeEditIndex++;
          setFocus(homeEditList.children[homeEditIndex]);
        } else if (code === 13) {
          e.preventDefault();
          alternarBlocoHome();
        }
        return;
      }
      if (currentScreen === "parear") {
        if (code === 13) {
          e.preventDefault();
          abrirParearCelular(parearOrigem);
        }
        return;
      }
      if (currentScreen === "settings") {
        var gNow = SETTINGS_GRUPOS[settingsGrupo] || SETTINGS_GRUPOS[0];
        if (code === 37 && settingsZona === "lista") {
          e.preventDefault();
          settingsZona = "nav";
          focoSettings();
        } else if (code === 39 && settingsZona === "nav") {
          e.preventDefault();
          if (gNow.id === "ligar") {
            abrirParearCelular("settings");
            return;
          }
          settingsZona = "lista";
          if (settingsIndex >= settingsDefs.length) settingsIndex = 0;
          focoSettings();
        } else if (code === 38) {
          e.preventDefault();
          if (settingsZona === "nav") {
            if (settingsGrupo === 0 && radioAtual) entrarRadioMini();
            else if (settingsGrupo > 0) {
              settingsGrupo--;
              settingsIndex = 0;
              renderSettings();
            }
          } else if (settingsIndex > 0) {
            settingsIndex--;
            focoSettings();
          }
        } else if (code === 40) {
          e.preventDefault();
          if (settingsZona === "nav") {
            if (settingsGrupo < SETTINGS_GRUPOS.length - 1) {
              settingsGrupo++;
              settingsIndex = 0;
              renderSettings();
            }
          } else if (settingsIndex < settingsDefs.length - 1) {
            settingsIndex++;
            focoSettings();
          }
        } else if (code === 13) {
          e.preventDefault();
          if (settingsZona === "nav") {
            if (gNow.id === "ligar") abrirParearCelular("settings");
            else {
              settingsZona = "lista";
              settingsIndex = 0;
              focoSettings();
            }
          } else activateSetting();
        }
        return;
      }
      if (currentScreen === "pin") {
        var keys = pinPad.children;
        var i = 0;
        for (; i < keys.length; i++) if (keys[i].classList.contains("focused")) break;
        if (code === 37 && i > 0) {
          e.preventDefault();
          setFocus(keys[i - 1]);
        } else if (code === 39 && i < keys.length - 1) {
          e.preventDefault();
          setFocus(keys[i + 1]);
        } else if (code === 38 && i >= 3) {
          e.preventDefault();
          setFocus(keys[i - 3]);
        } else if (code === 40 && i + 3 < keys.length) {
          e.preventDefault();
          setFocus(keys[i + 3]);
        } else if (code === 13 && keys[i]) {
          e.preventDefault();
          pinDigit(keys[i].dataset.ch);
        }
        return;
      }
      if (currentScreen === "eventos") {
        if (currentFocusedElement === btnEventsBack && code === 39 && radioAtual) {
          e.preventDefault();
          entrarRadioMini();
          return;
        }
        if (code === 38) {
          e.preventDefault();
          if (eventsIndex > 0) {
            eventsIndex--;
            setFocus(eventsList.children[eventsIndex]);
          } else setFocus(btnEventsBack);
        } else if (code === 40 && eventsIndex < eventsData.length - 1) {
          e.preventDefault();
          eventsIndex++;
          setFocus(eventsList.children[eventsIndex]);
        } else if (code === 13) {
          e.preventDefault();
          if (document.activeElement === btnEventsBack || currentFocusedElement === btnEventsBack) returnToHome();else if (eventsData[eventsIndex] && eventsData[eventsIndex].canal) {
            var j = eventsData[eventsIndex];
            abrirJogo(j);
          }
        }
        return;
      }
      if (currentScreen === "guia") {
        if (guideZone === "back") {
          if (code === 39) {
            e.preventDefault();
            guideZone = "now";
            updateGuideFocus();
          } else if (code === 40) {
            e.preventDefault();
            guideZone = "list";
            updateGuideFocus();
          } else if (code === 13) {
            e.preventDefault();
            returnToHome();
          }
        } else if (guideZone === "now") {
          if (code === 37) {
            e.preventDefault();
            guideZone = "back";
            updateGuideFocus();
          } else if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 40) {
            e.preventDefault();
            guideZone = "list";
            updateGuideFocus();
          } else if (code === 13) {
            e.preventDefault();
            guideNow();
          }
        } else {
          var _row2 = guideData[guideIndex];
          var vis = _row2 && _row2.list ? _row2.list.length : 0;
          var _n2 = vis || (_row2 && _row2.loaded ? 1 : 0);
          if (code === 38) {
            e.preventDefault();
            if (guideIndex > 0) {
              guideIndex--;
              var prev = guideData[guideIndex];
              var pv = (prev.list || []).length || 1;
              guideProg = Math.min(guideProg, Math.max(0, pv - 1));
              if (guideIndex < 4) loadGuideBatch(0, 12);
              updateGuideFocus();
            } else {
              guideZone = "back";
              updateGuideFocus();
            }
          } else if (code === 40 && guideIndex < guideData.length - 1) {
            e.preventDefault();
            guideIndex++;
            var next = guideData[guideIndex];
            var nv = (next.list || []).length || 1;
            guideProg = Math.min(guideProg, Math.max(0, nv - 1));
            if (!next.loaded) loadGuideBatch(guideIndex, 12);
            updateGuideFocus();
          } else if (code === 37 && guideProg > 0) {
            e.preventDefault();
            guideProg--;
            updateGuideFocus();
          } else if (code === 39 && _n2 && guideProg < _n2 - 1) {
            e.preventDefault();
            guideProg++;
            updateGuideFocus();
          } else if (code === 13 && ctxPodeOkLongo()) {
            return;
          } else if (code === 13) {
            e.preventDefault();
            tuneGuide();
          }
        }
        return;
      }
      if (currentScreen === "radiobusca") {
        var colsKb = KB_COLS;
        var colsGrade = 3;
        var totalKb = radiosBuscaTeclas.length;
        var totalGrade = radiosBuscaLista.length;
        if (radiosBuscaZona === "kb") {
          if (code === 37) {
            e.preventDefault();
            radiosBuscaKb = (radiosBuscaKb + totalKb - 1) % totalKb;
            focarRadiosBusca();
          } else if (code === 39) {
            e.preventDefault();
            radiosBuscaKb = tecladoDireita(radiosBuscaKb, totalKb, colsKb, !!totalGrade, function () {
              radiosBuscaZona = "grade";
              radiosBuscaIndex = 0;
            });
            focarRadiosBusca();
          } else if (code === 38) {
            e.preventDefault();
            if (radiosBuscaKb >= colsKb) radiosBuscaKb -= colsKb;
            focarRadiosBusca();
          } else if (code === 40) {
            e.preventDefault();
            if (radiosBuscaKb + colsKb < totalKb) radiosBuscaKb += colsKb;
            else if (totalGrade) radiosBuscaZona = "grade";
            else radiosBuscaKb = totalKb - 1;
            focarRadiosBusca();
          } else if (code === 13) {
            e.preventDefault();
            digitarRadioBusca(radiosBuscaTeclas[radiosBuscaKb].dataset.ch);
          }
        } else if (totalGrade) {
          var col = radiosBuscaIndex % colsGrade;
          if (code === 37 && radiosBuscaIndex > 0) {
            e.preventDefault();
            radiosBuscaIndex--;
            focarRadiosBusca();
          } else if (code === 39 && radiosBuscaIndex < totalGrade - 1) {
            e.preventDefault();
            radiosBuscaIndex++;
            focarRadiosBusca();
          } else if (code === 38) {
            e.preventDefault();
            if (radiosBuscaIndex - colsGrade >= 0) radiosBuscaIndex -= colsGrade;
            else radiosBuscaZona = "kb";
            focarRadiosBusca();
          } else if (code === 40) {
            e.preventDefault();
            if (radiosBuscaIndex + colsGrade < totalGrade) radiosBuscaIndex += colsGrade;
            focarRadiosBusca();
          } else if (code === 13) {
            e.preventDefault();
            playRadio(radiosBuscaLista[radiosBuscaIndex]);
            if (radiosBuscaVolta === "radioscard") {
              if (radiosBusca) radiosBusca.classList.remove("active");
              closeRadiosCard();
            } else closeRadiosBusca();
          }
        }
        return;
      }
      if (currentScreen === "radios") {
        if (currentFocusedElement === btnRadiosBusca) {
          if (code === 37) {
            e.preventDefault();
            setFocus(btnRadiosBack);
          } else if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 40 && radiosGrid.children.length) {
            e.preventDefault();
            radiosIndex = 0;
            setFocus(radiosGrid.children[0]);
          } else if (code === 13) {
            e.preventDefault();
            openRadiosBusca();
          }
          return;
        }
        if (currentFocusedElement === btnRadiosBack && code === 39) {
          e.preventDefault();
          setFocus(btnRadiosBusca);
          return;
        }
        var _cols2 = 4;
        if (code === 37 && radiosIndex > 0) {
          e.preventDefault();
          radiosIndex--;
          setFocus(radiosGrid.children[radiosIndex]);
        } else if (code === 39 && radiosIndex < radiosData.length - 1) {
          e.preventDefault();
          radiosIndex++;
          setFocus(radiosGrid.children[radiosIndex]);
        } else if (code === 38) {
          e.preventDefault();
          if (radiosIndex - _cols2 >= 0) {
            radiosIndex -= _cols2;
            setFocus(radiosGrid.children[radiosIndex]);
          } else setFocus(btnRadiosBack);
        } else if (code === 40 && radiosIndex + _cols2 < radiosData.length) {
          e.preventDefault();
          radiosIndex += _cols2;
          setFocus(radiosGrid.children[radiosIndex]);
        } else if (code === 13) {
          e.preventDefault();
          if (currentFocusedElement === btnRadiosBack) returnToHome();else playRadio(radiosData[radiosIndex]);
        }
        return;
      }
      if (currentScreen === "player") {
        var dCanal = deltaTeclaCanal(code);
        if (dCanal) {
          e.preventDefault();
          if (player.isLive && trocarCanalAoVivo(dCanal)) return;
          return;
        }
        if (nextCardVisible && code === 13) {
          e.preventDefault();
          if (nextEpisodePending != null) playSelectedEpisode(nextEpisodePending);
          return;
        }
        if (code === 13 && ctxPodeOkLongo()) {
          return;
        }
        if (code === 13) {
          e.preventDefault();
          if (player.isLive) {
            if (zapAberta) {
              if (zapZona === "abas") {
                var abaZap = abasDaFaixa()[zapAba];
                if (ehAbaMais(abaZap)) {
                  aovivoOrigem = "";
                  abrirMaisCategorias("zap");
                }
                return;
              }
              if (zapZona === "canais") entrarFaixa();
              return;
            }
            abrirFaixa();
            return;
          }
          if (!player.isOSDVisible()) player.showOSD(5000);else player.togglePlayPause();
        } else if (code === 37) {
          e.preventDefault();
          if (player.isLive && zapAberta) {
            if (zapZona === "abas") aplicarAba(zapAba - 1);else moverFaixa(-1);
          } else if (player.isLive) player.previousSource();else player.seek(-10);
        } else if (code === 39) {
          e.preventDefault();
          if (player.isLive && zapAberta) {
            if (zapZona === "abas") aplicarAba(zapAba + 1);else moverFaixa(1);
          } else if (player.isLive) player.nextSource();else player.seek(10);
        } else if (code === 38) {
          e.preventDefault();
          if (player.isLive && zapAberta) {
            if (zapZona === "canais") {
              zapZona = "abas";
              marcarFocoFaixa();
            }
            return;
          }
          if (player.isLive) {
            if (gridIndex > 0) {
              gridIndex--;
              executeCard(gridIndex);
            }
          } else openSourceMenu();
        } else if (code === 40) {
          e.preventDefault();
          if (player.isLive && zapAberta) {
            if (zapZona === "abas") {
              zapZona = "canais";
              marcarFocoFaixa();
            }
            return;
          }
          if (player.isLive && gridIndex < activeItemList.length - 1) {
            gridIndex++;
            executeCard(gridIndex);
          } else player.showOSD(4000);
        } else if (code === 415 || code === 19) player.togglePlayPause();else if (code === 413) exitPlayer();
        return;
      }
      if (currentScreen === "modal") {
        var items = modalList.children;
        var andarModal = function andarModal(dir) {
          var i = modalIndex + dir;
          while (i >= 0 && i < items.length) {
            if (!modalChoices[i] || modalChoices[i].action !== "grupo") {
              modalIndex = i;
              setFocus(items[i]);
              return;
            }
            i += dir;
          }
        };
        if (code === 38 && modalIndex > 0) {
          e.preventDefault();
          andarModal(-1);
        } else if (code === 40 && modalIndex < items.length - 1) {
          e.preventDefault();
          andarModal(1);
        } else if (code === 13) {
          e.preventDefault();
          confirmListModal();
        }
        return;
      }
      if (currentScreen === "info") {
        if (code === 13 && ctxPodeOkLongo()) {
          return;
        }
        var alvoInfoAbaixo = function alvoInfoAbaixo() {
          if (fonteN) return fonteCards[0];
          if (castN) return infoEls.cast.children[0];
          return null;
        };
        var precisaRolarInfo = function precisaRolarInfo() {
          var alvo = alvoInfoAbaixo();
          return cardPodeDescer(card) && (!alvo || alvoAbaixoDaFicha(card, alvo));
        };
        var entrarRolagemInfo = function entrarRolagemInfo(dir) {
          infoZone = "overview";
          soltarFocoParaRolar();
          rolarFicha(card, dir);
        };
        var focarFonte = function focarFonte() {
          if (!fonteN) {
            infoZone = "buttons";
            focusInfoButton();
            return;
          }
          if (infoSourceIndex >= fonteN) infoSourceIndex = 0;
          setFocus(fonteCards[infoSourceIndex]);
          fonteCards[infoSourceIndex].scrollIntoView({
            inline: "nearest",
            block: "nearest"
          });
        };
        var descerDosBotoes = function descerDosBotoes() {
          if (precisaRolarInfo()) {
            entrarRolagemInfo(1);
            return;
          }
          if (fonteN) {
            infoZone = "sources";
            focarFonte();
          } else if (castN) {
            infoZone = "cast";
            infoCastIndex = 0;
            setFocus(infoEls.cast.children[0]);
          }
        };
        var btns = visibleInfoButtons();
        var castN = infoEls.cast ? infoEls.cast.children.length : 0;
        var fonteCards = infoEls.fontes ? infoEls.fontes.querySelectorAll(".fonte-card") : [];
        var fonteN = fonteCards.length;
        var card = cardDaFicha(infoEls.overview);
        if (infoZone === "cast") {
          if (code === 37 && infoCastIndex > 0) {
            e.preventDefault();
            infoCastIndex--;
            setFocus(infoEls.cast.children[infoCastIndex]);
            infoEls.cast.children[infoCastIndex].scrollIntoView({
              inline: "nearest",
              block: "nearest"
            });
          } else if (code === 39 && infoCastIndex < castN - 1) {
            e.preventDefault();
            infoCastIndex++;
            setFocus(infoEls.cast.children[infoCastIndex]);
            infoEls.cast.children[infoCastIndex].scrollIntoView({
              inline: "nearest",
              block: "nearest"
            });
          } else if (code === 38) {
            e.preventDefault();
            if (fonteN) {
              infoZone = "sources";
              focarFonte();
            } else if (cardPodeSubir(card)) entrarRolagemInfo(-1);else {
              infoZone = "buttons";
              focusInfoButton();
            }
          }
          return;
        }
        if (infoZone === "sources") {
          if (code === 37 && infoSourceIndex > 0) {
            e.preventDefault();
            infoSourceIndex--;
            focarFonte();
          } else if (code === 39 && infoSourceIndex < fonteN - 1) {
            e.preventDefault();
            infoSourceIndex++;
            focarFonte();
          } else if (code === 38) {
            e.preventDefault();
            if (cardPodeSubir(card)) entrarRolagemInfo(-1);else {
              infoZone = "buttons";
              focusInfoButton();
            }
          } else if (code === 40 && castN) {
            e.preventDefault();
            infoZone = "cast";
            infoCastIndex = 0;
            setFocus(infoEls.cast.children[0]);
          } else if (code === 13) {
            e.preventDefault();
            playInfoItem(false, infoSourceIndex);
          }
          return;
        }
        if (infoZone === "overview") {
          if (code === 40) {
            e.preventDefault();
            if (precisaRolarInfo()) rolarFicha(card, 1);else if (fonteN) {
              infoZone = "sources";
              focarFonte();
            } else if (castN) {
              infoZone = "cast";
              infoCastIndex = 0;
              setFocus(infoEls.cast.children[0]);
            }
          } else if (code === 38) {
            e.preventDefault();
            if (cardPodeSubir(card)) rolarFicha(card, -1);else {
              infoZone = "buttons";
              focusInfoButton();
            }
          }
          return;
        }
        if (code === 37 && infoBtnIndex > 0) {
          e.preventDefault();
          infoBtnIndex--;
          focusInfoButton();
        } else if (code === 39 && infoBtnIndex < btns.length - 1) {
          e.preventDefault();
          infoBtnIndex++;
          focusInfoButton();
        } else if (code === 40) {
          e.preventDefault();
          descerDosBotoes();
        } else if (code === 13) {
          e.preventDefault();
          var b = btns[infoBtnIndex];
          if (b) b.click();
        }
        return;
      }
      if (currentScreen === "series") {
        if (code === 13 && ctxPodeOkLongo()) {
          return;
        }
        if (seriesView === "ficha") {
          var alvoSerieAbaixo = function alvoSerieAbaixo() {
            if (seriesSeasons.length > 1 && seriesEls.fichaSeasons && !seriesEls.fichaSeasons.classList.contains("hidden")) {
              return seriesEls.fichaSeasons;
            }
            var cards = seriesEls.fichaEpisodes ? seriesEls.fichaEpisodes.querySelectorAll(".ep-card") : [];
            if (cards.length) return cards[0];
            if (_castN) return seriesEls.cast.children[0];
            return null;
          };
          var precisaRolarSerie = function precisaRolarSerie() {
            var alvo = alvoSerieAbaixo();
            return cardPodeDescer(_card4) && (!alvo || alvoAbaixoDaFicha(_card4, alvo));
          };
          var entrarRolagemSerie = function entrarRolagemSerie(dir) {
            seriesZone = "overview";
            soltarFocoParaRolar();
            rolarFicha(_card4, dir);
          };
          var descerDaSerie = function descerDaSerie() {
            syncSeriesEpisodeLists();
            if (precisaRolarSerie()) {
              entrarRolagemSerie(1);
              return;
            }
            if (seriesSeasons.length > 1) {
              seriesZone = "ficha-seasons";
              updateSeriesFocus();
            } else if (seriesEpisodesView.length) {
              seriesZone = "ficha-eps";
              seriesFichaEpIndex = 0;
              updateSeriesFocus();
            } else if (_castN) {
              seriesZone = "cast";
              seriesCastIndex = 0;
              setFocus(seriesEls.cast.children[0]);
            }
          };
          var subirParaTextoOuPlay = function subirParaTextoOuPlay() {
            if (cardPodeSubir(_card4)) entrarRolagemSerie(-1);else {
              seriesZone = "play";
              focusSeriesFichaButton();
            }
          };
          var _btns2 = visibleSeriesFichaButtons();
          var _castN = seriesEls.cast ? seriesEls.cast.children.length : 0;
          var _card4 = cardDaFicha(seriesEls.overview);
          if (seriesZone === "cast") {
            if (code === 37 && seriesCastIndex > 0) {
              e.preventDefault();
              seriesCastIndex--;
              setFocus(seriesEls.cast.children[seriesCastIndex]);
              seriesEls.cast.children[seriesCastIndex].scrollIntoView({
                inline: "nearest",
                block: "nearest"
              });
            } else if (code === 39 && seriesCastIndex < _castN - 1) {
              e.preventDefault();
              seriesCastIndex++;
              setFocus(seriesEls.cast.children[seriesCastIndex]);
              seriesEls.cast.children[seriesCastIndex].scrollIntoView({
                inline: "nearest",
                block: "nearest"
              });
            } else if (code === 38) {
              e.preventDefault();
              syncSeriesEpisodeLists();
              if (seriesEpisodesView.length) {
                seriesZone = "ficha-eps";
                updateSeriesFocus();
              } else subirParaTextoOuPlay();
            }
            return;
          }
          if (seriesZone === "overview") {
            if (code === 40) {
              e.preventDefault();
              descerDaSerie();
            } else if (code === 38) {
              e.preventDefault();
              if (cardPodeSubir(_card4)) rolarFicha(_card4, -1);else {
                seriesZone = "play";
                focusSeriesFichaButton();
              }
            }
            return;
          }
          if (seriesZone === "ficha-eps") {
            var cards = seriesEls.fichaEpisodes ? seriesEls.fichaEpisodes.querySelectorAll(".ep-card") : [];
            var _n3 = cards.length;
            if (code === 37 && seriesFichaEpIndex > 0) {
              e.preventDefault();
              seriesFichaEpIndex--;
              updateSeriesFocus();
            } else if (code === 39 && seriesFichaEpIndex < _n3 - 1) {
              e.preventDefault();
              seriesFichaEpIndex++;
              updateSeriesFocus();
            } else if (code === 38) {
              e.preventDefault();
              if (seriesSeasons.length > 1) {
                seriesZone = "ficha-seasons";
                updateSeriesFocus();
              } else subirParaTextoOuPlay();
            } else if (code === 40 && _castN) {
              e.preventDefault();
              seriesZone = "cast";
              seriesCastIndex = 0;
              setFocus(seriesEls.cast.children[0]);
            } else if (code === 13 && ctxPodeOkLongo()) {
              return;
            } else if (code === 13) {
              e.preventDefault();
              playFichaEpisode(seriesFichaEpIndex);
            }
            return;
          }
          if (code === 13 && ctxPodeOkLongo()) {
            return;
          }
          if (code === 13) {
            e.preventDefault();
            if (seriesZone === "back") closeSeriesScreen();else if (seriesZone === "play") {
              var _b = _btns2[seriesBtnIndex];
              if (_b === seriesEls.btnPlay) playSeriesContinue();else if (_b === seriesEls.btnEpisodes) openSeriesEpisodesView();else if (_b === seriesEls.btnFav && currentSeriesItem) toggleFavorite(currentSeriesItem);
            }
            return;
          }
          if (seriesZone === "back") {
            if (code === 40) {
              e.preventDefault();
              seriesZone = "play";
              focusSeriesFichaButton();
            }
          } else if (seriesZone === "ficha-seasons") {
            if (code === 37 && seriesSeasonIndex > 0) {
              e.preventDefault();
              seriesSeasonIndex--;
              rebuildSeriesVersions();
              syncSeriesEpisodeLists();
              enrichSeriesEpisodes();
              updateSeriesFocus();
            } else if (code === 39 && seriesSeasonIndex < seriesSeasons.length - 1) {
              e.preventDefault();
              seriesSeasonIndex++;
              rebuildSeriesVersions();
              syncSeriesEpisodeLists();
              enrichSeriesEpisodes();
              updateSeriesFocus();
            } else if (code === 38) {
              e.preventDefault();
              subirParaTextoOuPlay();
            } else if (code === 40) {
              e.preventDefault();
              if (seriesEpisodesView.length) {
                seriesZone = "ficha-eps";
                seriesFichaEpIndex = 0;
                updateSeriesFocus();
              } else if (_castN) {
                seriesZone = "cast";
                seriesCastIndex = 0;
                setFocus(seriesEls.cast.children[0]);
              }
            }
          } else if (seriesZone === "play") {
            if (code === 37 && seriesBtnIndex > 0) {
              e.preventDefault();
              seriesBtnIndex--;
              focusSeriesFichaButton();
            } else if (code === 39 && seriesBtnIndex < _btns2.length - 1) {
              e.preventDefault();
              seriesBtnIndex++;
              focusSeriesFichaButton();
            } else if (code === 40) {
              e.preventDefault();
              descerDaSerie();
            }
          }
          return;
        }
        if (code === 13 && ctxPodeOkLongo()) {
          return;
        }
        if (code === 13) {
          e.preventDefault();
          if (seriesZone === "back") showSeriesFichaView(true);else if (seriesZone === "seasons") {
            rebuildSeriesVersions();
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (seriesZone === "versions") {
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (seriesEpisodesView[seriesEpIndex]) {
            var ep = seriesEpisodesView[seriesEpIndex];
            var idx = currentSeriesItem.episodes.indexOf(ep);
            playSelectedEpisode(idx);
          }
          return;
        }
        if (seriesZone === "back") {
          if (code === 40) {
            e.preventDefault();
            seriesZone = "seasons";
            updateSeriesFocus();
          }
        } else if (seriesZone === "seasons") {
          if (code === 37 && seriesSeasonIndex > 0) {
            e.preventDefault();
            seriesSeasonIndex--;
            rebuildSeriesVersions();
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (code === 39 && seriesSeasonIndex < seriesSeasons.length - 1) {
            e.preventDefault();
            seriesSeasonIndex++;
            rebuildSeriesVersions();
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (code === 38) {
            e.preventDefault();
            seriesZone = "back";
            updateSeriesFocus();
          } else if (code === 40) {
            e.preventDefault();
            seriesZone = seriesVersions.length ? "versions" : "episodes";
            updateSeriesFocus();
          }
        } else if (seriesZone === "versions") {
          if (code === 37 && seriesVersionIndex > 0) {
            e.preventDefault();
            seriesVersionIndex--;
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (code === 39 && seriesVersionIndex < seriesVersions.length - 1) {
            e.preventDefault();
            seriesVersionIndex++;
            renderSeriesFilters();
            syncSeriesEpisodeLists();
            enrichSeriesEpisodes();
            updateSeriesFocus();
          } else if (code === 38) {
            e.preventDefault();
            seriesZone = "seasons";
            updateSeriesFocus();
          } else if (code === 40) {
            e.preventDefault();
            seriesZone = "episodes";
            updateSeriesFocus();
          }
        } else {
          if (code === 37 && seriesEpIndex > 0) {
            e.preventDefault();
            seriesEpIndex--;
            updateSeriesFocus();
          } else if (code === 39 && seriesEpIndex < seriesEpisodesView.length - 1) {
            e.preventDefault();
            seriesEpIndex++;
            updateSeriesFocus();
          } else if (code === 38) {
            e.preventDefault();
            seriesZone = "versions";
            updateSeriesFocus();
          }
        }
        return;
      }
      if (currentScreen === "browse") {
        if (modoHub()) {
          e.preventDefault();
          navegarHub(code);
          return;
        }
        if (modoPrateleira()) {
          e.preventDefault();
          navegarPrateleira(code);
          return;
        }
        var _row3 = browseData[browseRow];
        var _total2 = _row3 ? _row3.items.length : 0;
        var temSubnav = browseKind !== "favoritos" && browseTabEls.length;
        if (browseZone === "back") {
          if (code === 39 && temSubnav) {
            e.preventDefault();
            browseZone = "subnav";
            updateBrowseFocus();
          } else if (code === 39 && btnBrowseSearch) {
            e.preventDefault();
            browseZone = "search";
            updateBrowseFocus();
          } else if (code === 40 && browseData.length) {
            e.preventDefault();
            browseZone = temSubnav ? "subnav" : "rows";
            if (!temSubnav) {
              browseRow = 0;
              browseCol = 0;
            }
            updateBrowseFocus();
          } else if (code === 13) {
            e.preventDefault();
            voltarBrowse();
          }
        } else if (browseZone === "subnav") {
          if (code === 37 && browseSubIndex > 0) {
            e.preventDefault();
            browseSubIndex--;
            updateBrowseFocus();
          } else if (code === 39 && browseSubIndex < browseTabEls.length - 1) {
            e.preventDefault();
            browseSubIndex++;
            updateBrowseFocus();
          } else if (code === 37 && browseSubIndex === 0) {
            e.preventDefault();
            browseZone = "back";
            updateBrowseFocus();
          } else if (code === 39 && browseSubIndex === browseTabEls.length - 1 && btnBrowseSearch) {
            e.preventDefault();
            browseZone = "search";
            updateBrowseFocus();
          } else if (code === 40 && browseData.length) {
            e.preventDefault();
            browseZone = "rows";
            browseRow = 0;
            browseCol = 0;
            updateBrowseFocus();
          } else if (code === 38) {
            e.preventDefault();
            browseZone = "back";
            updateBrowseFocus();
          } else if (code === 13) {
            e.preventDefault();
            var k = browseTabEls[browseSubIndex] && browseTabEls[browseSubIndex].dataset.kind;
            if (k) openBrowse(k);
          }
        } else if (browseZone === "search") {
          if (code === 37) {
            e.preventDefault();
            browseZone = temSubnav ? "subnav" : "back";
            updateBrowseFocus();
          } else if (code === 39 && btnBrowseAz && temSubnav) {
            e.preventDefault();
            browseZone = "az";
            updateBrowseFocus();
          } else if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 40 && browseData.length) {
            e.preventDefault();
            browseZone = "rows";
            browseRow = 0;
            browseCol = 0;
            updateBrowseFocus();
          } else if (code === 13) {
            e.preventDefault();
            openSearch();
          }
        } else if (browseZone === "az") {
          if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 37) {
            e.preventDefault();
            browseZone = "search";
            updateBrowseFocus();
          } else if (code === 40 && browseData.length) {
            e.preventDefault();
            browseZone = "rows";
            browseRow = 0;
            browseCol = 0;
            updateBrowseFocus();
          } else if (code === 38) {
            e.preventDefault();
            browseZone = "search";
            updateBrowseFocus();
          } else if (code === 13) {
            e.preventDefault();
            abrirAz(browseSecaoAz(), "");
          }
        } else if (code === 37) {
          e.preventDefault();
          if (browseCol > 0) {
            browseCol--;
            updateBrowseFocus();
          }
        } else if (code === 39) {
          e.preventDefault();
          if (browseCol < _total2 - 1) {
            browseCol++;
            updateBrowseFocus();
          }
        } else if (code === 38) {
          e.preventDefault();
          if (browseRow > 0) {
            browseRow--;
            browseCol = 0;
            updateBrowseFocus();
          } else if (temSubnav) {
            browseZone = "subnav";
            updateBrowseFocus();
          } else {
            browseZone = "back";
            updateBrowseFocus();
          }
        } else if (code === 40) {
          e.preventDefault();
          if (browseRow < browseData.length - 1) {
            browseRow++;
            browseCol = 0;
            updateBrowseFocus();
          }
        } else if (code === 13) {
          e.preventDefault();
          activateBrowseItem();
        }
        return;
      }
      if (currentScreen === "catalog") {
        if (aovivoBuscaAberta) {
          handleBuscaAoVivoKey(e, code);
          return;
        }
        var tabs = categoriesBar.querySelectorAll(".cat-tab");
        var _total3 = activeItemList.length;
        var hasResume = resumeBanner && !resumeBanner.classList.contains("hidden");
        var guiaVisivel = btnCatalogGuide && !btnCatalogGuide.classList.contains("hidden");
        if (catalogZone === "back-btn") {
          if (code === 39) {
            e.preventDefault();
            catalogZone = guiaVisivel ? "guide" : "search";
            updateCatalogFocus();
          } else if (code === 40) {
            e.preventDefault();
            catalogZone = hasResume ? "resume" : "categories";
            updateCatalogFocus();
          } else if (code === 13) {
            e.preventDefault();
            gradeAz ? voltarDaGrade() : returnToHome();
          }
        } else if (catalogZone === "guide") {
          if (code === 37) {
            e.preventDefault();
            catalogZone = "back-btn";
            updateCatalogFocus();
          } else if (code === 39) {
            e.preventDefault();
            catalogZone = "search";
            updateCatalogFocus();
          } else if (code === 40) {
            e.preventDefault();
            catalogZone = "categories";
            updateCatalogFocus();
          } else if (code === 13) {
            e.preventDefault();
            openGuide();
          }
        } else if (catalogZone === "search") {
          if (code === 37) {
            e.preventDefault();
            catalogZone = guiaVisivel ? "guide" : "back-btn";
            updateCatalogFocus();
          } else if (code === 39 && radioAtual) {
            e.preventDefault();
            entrarRadioMini();
          } else if (code === 40) {
            e.preventDefault();
            catalogZone = "categories";
            updateCatalogFocus();
          } else if (code === 13) {
            e.preventDefault();
            openSearch();
          }
        } else if (catalogZone === "resume") {
          if (code === 38) {
            e.preventDefault();
            catalogZone = "back-btn";
            updateCatalogFocus();
          } else if (code === 40 || code === 37 || code === 39) {
            e.preventDefault();
            catalogZone = "categories";
            updateCatalogFocus();
          } else if (code === 13) {
            e.preventDefault();
            if (btnResumePlay) btnResumePlay.click();
          }
        } else if (catalogZone === "categories") {
          if (code === 37) {
            e.preventDefault();
            if (categoryIndex > 0) selectCategory(categoryIndex - 1, true);else {
              catalogZone = "back-btn";
              updateCatalogFocus();
            }
          } else if (code === 39) {
            e.preventDefault();
            if (categoryIndex < tabs.length - 1) selectCategory(categoryIndex + 1, true);
          } else if (code === 38) {
            e.preventDefault();
            catalogZone = hasResume ? "resume" : "back-btn";
            updateCatalogFocus();
          } else if (code === 40) {
            e.preventDefault();
            if (_total3 > 0) {
              catalogZone = "grid";
              gridIndex = 0;
            }
            updateCatalogFocus();
          } else if (code === 13) {
            e.preventDefault();
            var abaOk = tabs[categoryIndex] ? tabs[categoryIndex].textContent : "";
            if (currentSection === "aovivo" && ehAbaMais(abaOk)) abrirMaisCategorias("catalog");
            else if (_total3 > 0) {
              catalogZone = "grid";
              gridIndex = 0;
              updateCatalogFocus();
            }
          }
        } else {
          var dCanalCat = deltaTeclaCanal(code);
          if (dCanalCat && currentSection === "aovivo") {
            e.preventDefault();
            moverFocoCanalGrade(dCanalCat);
            return;
          }
          if (code === 37) {
            e.preventDefault();
            if (gridIndex > 0) {
              gridIndex--;
              updateCatalogFocus();
            }
          } else if (code === 39) {
            e.preventDefault();
            if (gridIndex < _total3 - 1) {
              gridIndex++;
              if (gridIndex >= renderedCount - 6) renderNextChunk(PAGE_SIZE_STEP);
              updateCatalogFocus();
            }
          } else if (code === 38) {
            e.preventDefault();
            if (gridIndex - GRID_COLUMNS >= 0) {
              gridIndex -= GRID_COLUMNS;
              updateCatalogFocus();
            } else {
              catalogZone = "categories";
              updateCatalogFocus();
            }
          } else if (code === 40) {
            e.preventDefault();
            if (gridIndex + GRID_COLUMNS < _total3) {
              gridIndex += GRID_COLUMNS;
              if (gridIndex >= renderedCount - 6) renderNextChunk(PAGE_SIZE_STEP);
              updateCatalogFocus();
            }
          } else if (code === 13 && ctxPodeOkLongo()) {
            return;
          } else if (code === 13) {
            e.preventDefault();
            executeCard(gridIndex);
          }
        }
      }
    }
    window.addEventListener("keydown", handleNav);
    exploreIndex = 0;
    homeZone = "explore";
    updateHomeFocus();
    if (homeScroll) homeScroll.addEventListener("scroll", atualizarSetaMenu);
    if (homeMenuSeta) homeMenuSeta.addEventListener("click", openHomeMenu);
    if (btnOpenSearch) btnOpenSearch.addEventListener("click", openSearch);
    if (btnOpenHomeEdit) btnOpenHomeEdit.addEventListener("click", openHomeEdit);
    if (btnOpenSettings) btnOpenSettings.addEventListener("click", openSettings);
    if (btnCatalogSearch) btnCatalogSearch.addEventListener("click", openSearch);
    if (btnEventsBack) btnEventsBack.addEventListener("click", returnToHome);
    if (btnRadiosBack) btnRadiosBack.addEventListener("click", returnToHome);
    if (btnRadiosBusca) btnRadiosBusca.addEventListener("click", function () {
      return openRadiosBusca();
    });
    if (btnRadiosCardBusca) btnRadiosCardBusca.addEventListener("click", function () {
      return openRadiosBusca();
    });
    if (btnRadioPrev) btnRadioPrev.addEventListener("click", function () {
      return radioVizinha(-1);
    });
    if (btnRadioNext) btnRadioNext.addEventListener("click", function () {
      return radioVizinha(1);
    });
    if (btnRadioToggle) btnRadioToggle.addEventListener("click", alternarRadio);
    if (btnRadioLista) btnRadioLista.addEventListener("click", function () {
      return openRadiosCard();
    });
    if (btnRadioStop) btnRadioStop.addEventListener("click", pararRadio);
    if (radioAudio) {
      radioAudio.addEventListener("playing", function () {
        if (radioAtual) pintarRadioMini(false);
      });
      radioAudio.addEventListener("pause", function () {
        if (radioAtual) pintarRadioMini(true);
      });
    }
    if (btnGuideBack) btnGuideBack.addEventListener("click", function () {
      if (guiaVolta === "catalog") {
        currentScreen = "catalog";
        showScreen("catalog");
        updateCatalogFocus();
      } else returnToHome();
    });
    if (btnGuideNow) btnGuideNow.addEventListener("click", guideNow);
    if (btnHeroPlay) btnHeroPlay.addEventListener("click", function () {
      return activateHero(false);
    });
    if (btnHeroInfo) btnHeroInfo.addEventListener("click", function () {
      return activateHero(true);
    });
    if (homeHook) homeHook.addEventListener("click", activateHook);
    exploreChips.forEach(function (c, i) {
      return c.addEventListener("click", function () {
        exploreIndex = i;
        activateExplore();
      });
    });
    if (btnResumePlay) {
      btnResumePlay.addEventListener("click", function () {
        var last = getLastWatched();
        if (!last || !last.sources) return;
        if (last.seriesItem && last.epIndex >= 0) {
          currentSeriesItem = last.seriesItem;
          currentPlayingEpIndex = last.epIndex;
          var ep = (last.seriesItem.episodes || [])[last.epIndex];
          launchPlayer({
            name: last.seriesItem.title + (ep ? " - " + ep.title : ""),
            category: "Serie On Demand",
            logo: last.logo,
            isLive: false,
            sources: last.sources,
            resumeTime: last.currentTime
          }, last.seriesItem, ep);
        } else {
          launchPlayer({
            name: last.name,
            category: last.category,
            logo: last.logo,
            isLive: false,
            sources: last.sources,
            resumeTime: last.currentTime
          }, {
            type: "movie",
            title: last.name,
            posterUrl: last.logo,
            sources: last.sources
          }, null);
        }
      });
    }
    infoEls.btnPlay.addEventListener("click", function () {
      return playInfoItem(false);
    });
    infoEls.btnResume.addEventListener("click", function () {
      return playInfoItem(true);
    });
    if (infoEls.btnTrailer) infoEls.btnTrailer.addEventListener("click", playTrailer);
    infoEls.btnFav.addEventListener("click", function () {
      if (infoItem) toggleFavorite(infoItem);
    });
    infoEls.btnClose.addEventListener("click", closeInfoPanel);
    seriesEls.btnBack.addEventListener("click", closeSeriesScreen);
    seriesEls.btnPlay.addEventListener("click", playSeriesContinue);
    if (seriesEls.btnEpisodes) seriesEls.btnEpisodes.addEventListener("click", openSeriesEpisodesView);
    if (seriesEls.btnFav) seriesEls.btnFav.addEventListener("click", function () {
      if (currentSeriesItem) toggleFavorite(currentSeriesItem);
    });
    if (seriesEls.btnEpBack) seriesEls.btnEpBack.addEventListener("click", function () {
      return showSeriesFichaView(true);
    });
    homeSideItems.forEach(function (el, i) {
      return el.addEventListener("click", function () {
        sideMenuIndex = i;
        activateSideMenu();
      });
    });
    btnBackHub.addEventListener("click", function () {
      if (catalogZone === "grid") {
        catalogZone = "categories";
        updateCatalogFocus();
      } else if (catalogZone === "categories" || catalogZone === "resume" || catalogZone === "guide") {
        catalogZone = "back-btn";
        updateCatalogFocus();
      } else if (gradeAz) voltarDaGrade();else returnToHome();
    });
    if (btnBrowseBack) btnBrowseBack.addEventListener("click", voltarBrowse);
    if (btnBrowseSearch) btnBrowseSearch.addEventListener("click", openSearch);
    if (btnBrowseAz) btnBrowseAz.addEventListener("click", function () {
      return abrirAz(browseSecaoAz(), "");
    });
    browseTabEls.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.dataset.kind;
        if (k) openBrowse(k);
      });
    });
    if (btnCatalogGuide) btnCatalogGuide.addEventListener("click", openGuide);
    if (browseRowsEl) {
      browseRowsEl.addEventListener("click", function (e) {
        var card = e.target;
        while (card && card !== browseRowsEl && !(card.classList && card.classList.contains("home-mini"))) card = card.parentNode;
        if (!card || card === browseRowsEl) return;
        browseRow = parseInt(card.dataset.row, 10) || 0;
        browseCol = parseInt(card.dataset.col, 10) || 0;
        browseZone = "rows";
        activateBrowseItem();
      });
    }
    if (browseHub) {
      browseHub.addEventListener("click", function (e) {
        var mini = e.target;
        while (mini && mini !== browseHub && !(mini.classList && mini.classList.contains("home-mini"))) mini = mini.parentNode;
        if (mini && mini !== browseHub) {
          hubGenRow = parseInt(mini.dataset.row, 10) || 0;
          hubGenCol = parseInt(mini.dataset.col, 10) || 0;
          browseZone = "gens";
          ativarHubGen();
          return;
        }
        var card = e.target;
        while (card && card !== browseHub && !(card.classList && card.classList.contains("od-cat"))) card = card.parentNode;
        if (!card || card === browseHub) return;
        var secao = card.dataset.secao;
        if (secao) openBrowse(secao);
      });
    }
    if (odSideEl) {
      odSideEl.addEventListener("click", function (e) {
        var row = e.target;
        while (row && row !== odSideEl && !(row.classList && row.classList.contains("od-side-row"))) row = row.parentNode;
        if (!row || row === odSideEl) return;
        odSideIndex = parseInt(row.dataset.index, 10) || 0;
        browseZone = "side";
        ativarLado();
      });
    }
    if (odFlyEl) {
      odFlyEl.addEventListener("click", function (e) {
        var row = e.target;
        while (row && row !== odFlyEl && !(row.classList && row.classList.contains("od-fly-row"))) row = row.parentNode;
        if (!row || row === odFlyEl) return;
        odFlyIndex = parseInt(row.dataset.index, 10) || 0;
        ativarFly();
      });
    }
    if (odGrid) {
      odGrid.addEventListener("click", function (e) {
        var card = e.target;
        while (card && card !== odGrid && !(card.classList && card.classList.contains("od-poster"))) card = card.parentNode;
        if (!card || card === odGrid) return;
        odGridIndex = parseInt(card.dataset.index, 10) || 0;
        browseZone = "grid";
        activateOdItem();
      });
    }
    quandoOcioso(function () {
      ensureVodCategories().catch(function () {
        return buildVodCategories({
          filmesRows: {},
          seriesRows: {}
        });
      });
    });
    if (window.SaimoAPI && SaimoAPI.loadVodBases) {
      quandoOcioso(function () {
        SaimoAPI.loadVodBases().catch(function () {});
      });
    }
    if (window.SaimoAPI && SaimoAPI.sondarProxy) SaimoAPI.sondarProxy();

    // O catálogo de canais chega em paralelo. A home não espera por ele:
    // o destaque abre com os dados locais e a fileira ao vivo se atualiza depois.
    var trocarParaCatalogoRemoto = function trocarParaCatalogoRemoto() {
      return recarregarCanaisOficial();
    };
    ligarBarraXtream();
    buildHome().then(function () {
      return hydrateCatalog();
    }).then(function (mudou) {
      if (!(mudou && !homeFromDest)) return;
      if (menuMexeu) quandoOcioso(function () {
        return buildHome(true);
      });else return buildHome(true);
    }).then(function () {
      if (!xtreamEstaLigado()) {
        return trocarParaCatalogoRemoto().then(function () {
          if (homeReady) {
            quandoOcioso(function () {
              return refreshHomeDynamic();
            });
          }
        });
      }
      return carregarScriptXtream().then(function () {
        return new Promise(function (resolve) {
          function aposCache() {
            aplicarXtreamNoAcervo({
              leve: true,
              silencio: true
            });
            quandoOcioso(function () {
              aplicarXtreamNoAcervo({
                silencio: true
              });
              if (homeReady) refreshHomeDynamic();
            });
            sincronizarMeuXtream(false).then(function () {
              aplicarXtreamNoAcervo();
              resolve();
            });
          }
          if (window.SaimoXtream && SaimoXtream.quandoCache) SaimoXtream.quandoCache(aposCache);else aposCache();
        });
      });
    }).then(function () {
      if (window.SaimoListas) {
        SaimoListas.atualizarSePreciso().then(function (mudou) {
          if (mudou && homeReady && acervoPronto) {
            carregarAcervo().then(function () {
              return quandoOcioso(refreshHomeDynamic);
            }).catch(function () {});
          }
        }).catch(function () {});
      }
      quandoOcioso(function () {
        if (window.SaimoEpg) SaimoEpg.ensure(liveChannels().map(function (c) {
          return c.name;
        }));
      });
      if (!menuMexeu && currentScreen === "home") {
        exploreIndex = 0;
        homeZone = "explore";
        updateHomeFocus();
      }
      var cfg = SaimoAjustes.ler();
      if (!cfg.openLast) return;
      var live = getLastLive();
      var last = getLastWatched();
      if (live && (!last || (live.timestamp || 0) >= (last.timestamp || 0))) {
        var ch = canalPorNome(live.name);
        if (ch) {
          launchPlayer({
            name: ch.name,
            category: ch.category,
            logo: ch.logo,
            isLive: true,
            sources: ch.sources
          }, ch, null);
          return;
        }
      }
      if (historicoResumivel(last) && last.sources) {
        if (btnResumePlay) btnResumePlay.click();
      }
    });
  };
  if (window.SaimoAbertura) SaimoAbertura.quandoTerminar(iniciarApp);else iniciarApp();
});