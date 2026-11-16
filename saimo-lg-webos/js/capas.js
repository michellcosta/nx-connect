/**
 * Capas leves para TV: fila de 2 pedidos, w185, 4 por fileira + janela no foco.
 */
var SaimoCapas = {
  MAX_AUTO: 4,
  JANELA: 3,
  COLS_GRADE: 4,
  LINHAS_EXTRA: 1,
  MAX_FILA: 2,
  CACHE_MAX: 80,
  _leve: null,
  _cache: Object.create(null),
  _cacheOrdem: [],
  _fila: [],
  _vazias: Object.create(null),
  _ativos: 0,
  _lazyOk: null,

  suportaLazy: function () {
    if (this._lazyOk !== null) return this._lazyOk;
    try {
      var img = document.createElement("img");
      this._lazyOk = "loading" in img;
    } catch (e) {
      this._lazyOk = false;
    }
    return this._lazyOk;
  },

  _w: "w185",
  ehLeve: function () {
    if (this._leve !== null) return this._leve;
    var d = window.SaimoDiagnostico && SaimoDiagnostico.detectarWebOS && SaimoDiagnostico.detectarWebOS();
    this._leve = !!(d && d.webos);
    if (this._leve) {
      /* Um só modo para TODAS as TVs: o perfil das modernas (webOS 22+) —
         fileira inteira na montagem, downloads em paralelo e w342. O modo
         leve das TVs antigas (w92, fila de 1, cache 40) acabou. */
      this.MAX_AUTO = 6;
      this.JANELA = 3;
      this.MAX_FILA = 3;
      this.CACHE_MAX = 120;
      this._w = "w342";
    }
    return this._leve;
  },

  urlLeve: function (url) {
    url = String(url || "");
    if (!url) return "";
    this.ehLeve();
    var tam = this._w || "w185";
    return url.replace(/\/t\/p\/w\d+\//, "/t/p/" + tam + "/").replace(/w342/g, tam);
  },

  _guardarCache: function (chave, url) {
    if (!chave || !url) return;
    if (!this._cache[chave]) {
      this._cacheOrdem.push(chave);
      if (this._cacheOrdem.length > this.CACHE_MAX) {
        var velha = this._cacheOrdem.shift();
        delete this._cache[velha];
      }
    }
    this._cache[chave] = url;
  },

  chaveItem: function (item) {
    return String(item && (item.title || item.name) || "") + "|" + (item && item.type || "");
  },

  anoDe: function (item) {
    if (!item) return 0;
    var y = parseInt(item.year, 10);
    if (y) return y;
    var m = String(item.title || item.name || "").match(/\((\d{4})\)\s*$/);
    return m ? parseInt(m[1], 10) : 0;
  },

  indicesTop4: function (items) {
    var map = Object.create(null);
    if (!items || !items.length) return map;
    var ord = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!it || it.type === "channel" || it.type === "jogo" || it.type === "acao") continue;
      ord.push({ i: i, y: this.anoDe(it) });
    }
    ord.sort(function (a, b) {
      return b.y - a.y || a.i - b.i;
    });
    for (var j = 0; j < ord.length && j < this.MAX_AUTO; j++) map[ord[j].i] = 1;
    return map;
  },

  naJanelaGrade: function (index, foco, cols) {
    cols = cols || this.COLS_GRADE;
    if (index == null || index < 0) return false;
    if (foco == null || foco < 0) foco = 0;
    return Math.abs(Math.floor(index / cols) - Math.floor(foco / cols)) <= this.LINHAS_EXTRA;
  },
  deveCarregar: function (items, index, foco) {
    if (index == null || index < 0) return false;
    return this.naJanelaGrade(index, foco);
  },

  aplicar: function (card, item, url) {
    if (!card || !url) return;
    url = this.urlLeve(url);
    if (item) item.posterUrl = url;
    var ph = card.querySelector(".mini-ph");
    var media = card.querySelector(".od-poster-media");
    var img = card.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = "";
      img.loading = "eager";
      if (ph) card.replaceChild(img, ph);
      else if (media) {
        media.textContent = "";
        media.appendChild(img);
      } else {
        var nome = card.querySelector(".mini-name");
        if (nome) card.insertBefore(img, nome);
        else card.insertBefore(img, card.firstChild);
      }
    }
    if (img.getAttribute("src") !== url) img.src = url;
  },

  liberar: function (card) {
    if (!card) return;
    var img = card.querySelector("img");
    if (!img) return;
    img.removeAttribute("src");
    var pai = img.parentNode;
    if (!pai) return;
    var naMedia = pai.className && String(pai.className).indexOf("od-poster-media") !== -1;
    pai.removeChild(img);
    if (naMedia || card.querySelector(".mini-ph") || card.querySelector(".od-poster-media")) return;
    var ph = document.createElement("div");
    ph.className = "mini-ph";
    var nome = card.querySelector(".mini-name");
    var letra = nome && nome.textContent ? nome.textContent.charAt(0) : "?";
    ph.textContent = letra.toUpperCase();
    if (nome) card.insertBefore(ph, nome);
    else card.insertBefore(ph, card.firstChild);
  },

  pedir: function (item, card, prioridade) {
    if (!item || !card) return;
    var img = card.querySelector("img");
    if (img && img.getAttribute("src")) return;
    var ck = this.chaveItem(item);
    if (this._cache[ck]) {
      this.aplicar(card, item, this._cache[ck]);
      return;
    }
    if (item.posterUrl) {
      var leve = this.urlLeve(item.posterUrl);
      this._guardarCache(ck, leve);
      this.aplicar(card, item, leve);
      return;
    }
    if (!window.SaimoFicha || !SaimoFicha.posterDe) return;
    this._fila.push({
      item: item,
      card: card,
      serie: item.type === "series",
      ck: ck,
      pri: prioridade ? 0 : 1
    });
    this._fila.sort(function (a, b) {
      return a.pri - b.pri;
    });
    this._bombeiar();
  },

  _bombeiar: function () {
    var _this2 = this;
    function rodar(job) {
      _this2._ativos++;
      SaimoFicha.posterDe(job.item.title || job.item.name, job.serie).then(function (url) {
        _this2._ativos--;
        if (url) {
          url = _this2.urlLeve(url);
          _this2._guardarCache(job.ck, url);
        } else if (window.SaimoDiagnostico && !_this2._vazias[job.ck]) {
          _this2._vazias[job.ck] = 1;
          SaimoDiagnostico.logEvento("capa_vazia", job.item.title || job.item.name || "?");
        }
        if (url && job.card.isConnected) _this2.aplicar(job.card, job.item, url);
        _this2._bombeiar();
      }).catch(function () {
        _this2._ativos--;
        _this2._bombeiar();
      });
    }
    while (this._ativos < this.MAX_FILA && this._fila.length) {
      var job = this._fila.shift();
      if (!job || !job.card || !job.card.isConnected) continue;
      rodar(job);
    }
  },

  preencherFileiras: function (rowsEl, getItem) {
    this.ehLeve();
    if (!rowsEl || !getItem) return;
    var _this3 = this;
    Array.prototype.forEach.call(rowsEl.querySelectorAll(".home-row"), function (wrap) {
      var ri = parseInt(wrap.dataset.row, 10);
      if (isNaN(ri)) return;
      var track = wrap.querySelector(".home-row-track");
      if (!track) return;
      var items = [];
      Array.prototype.forEach.call(track.querySelectorAll(".home-mini"), function (c, ci) {
        items[ci] = getItem(ri, ci);
      });
      var leve = _this3.ehLeve();
      var top = leve ? _this3.indicesTop4(items) : null;
      Array.prototype.forEach.call(track.querySelectorAll(".home-mini"), function (card, ci) {
        if (card.querySelector("img")) return;
        var item = items[ci];
        if (!item || !(item.title || item.name)) return;
        if (item.type === "channel" || item.type === "jogo" || item.type === "acao") return;
        if (leve && !top[ci]) return;
        _this3.pedir(item, card, true);
      });
    });
  },

  atualizarJanelaGrade: function (gridEl, items, foco) {
    if (!gridEl || !items || !items.length) return;
    var _this4 = this;
    var leve = this.ehLeve();
    var g = gridEl.getBoundingClientRect();
    var folga = 120;
    Array.prototype.forEach.call(gridEl.querySelectorAll(".od-poster"), function (card) {
      var idx = parseInt(card.dataset.index, 10);
      if (isNaN(idx)) return;
      var item = items[idx];
      if (!item) return;
      var r = card.getBoundingClientRect();
      var visivel = r.bottom > g.top - folga && r.top < g.bottom + folga;
      var naLinha = leve && _this4.naJanelaGrade(idx, foco);
      if (visivel || naLinha) _this4.pedir(item, card, visivel || Math.abs(idx - (foco || 0)) <= 1);
      else if (leve) _this4.liberar(card);
    });
  },

  atualizarJanelaTrack: function (track, items, focoCol) {
    if (!track || !items || !items.length) return;
    var _this5 = this;
    /* Fora do webOS (debug/mouse) não há motivo pra janela: carrega tudo. */
    var leve = this.ehLeve();
    var foco = focoCol == null ? 0 : focoCol;
    var g = track.getBoundingClientRect();
    var folga = 80;
    Array.prototype.forEach.call(track.querySelectorAll(".home-mini"), function (card, ci) {
      var item = items[ci];
      if (!item || !(item.title || item.name)) return;
      if (item.type === "channel" || item.type === "jogo" || item.type === "acao") return;
      if (!leve) {
        _this5.pedir(item, card, true);
        return;
      }
      var r = card.getBoundingClientRect();
      var visivel = r.right > g.left - folga && r.left < g.right + folga;
      if (ci === foco) visivel = true;
      if (visivel) _this5.pedir(item, card, ci === foco || Math.abs(ci - foco) <= 1);
      else _this5.liberar(card);
    });
  },

  agendarPreFicha: function (item, cb) {
    clearTimeout(this._prefichaTimer);
    this._prefichaItem = null;
    if (!item || !cb) return;
    var titulo = item.title || item.name;
    if (!titulo) return;
    this._prefichaItem = item;
    var _this5 = this;
    this._prefichaTimer = setTimeout(function () {
      if (_this5._prefichaItem !== item) return;
      cb(item);
    }, 350);
  }
};

window.SaimoCapas = SaimoCapas;
