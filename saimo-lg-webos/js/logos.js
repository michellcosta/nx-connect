/**
 * Logo de canal ao vivo quando a lista não manda tvg-logo / stream_icon.
 * 1) cruza com catálogo Saimo e outras listas que já têm logo
 * 2) tv-logos (BR + internacional + América Latina)
 * 3) TMDB company, só do que está na tela
 */
var SaimoLogos = {
  KEY: "saimo_logos_canais",
  CDN: "https://cdn.jsdelivr.net/gh/tv-logo/tv-logos@master/",
  MAX_DISCO: 250,
  MAX_FILA: 2,
  _mapa: Object.create(null),
  _miss: Object.create(null),
  _fila: [],
  _ativos: 0,
  _idxAt: 0,
  _discoOk: false,

  fold: function (s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  },

  chave: function (s) {
    var t = this.fold(s);
    t = t.replace(/^[a-z]{2,3}\s*[:|\-]\s*/, "");
    t = t.replace(/\b(fhd|uhd|4k|8k|full\s*hd|hd|sd|hevc|h265|h264|fhd60|60fps|multi\s*audio)\b/g, " ");
    t = t.replace(/\[[^\]]*\]/g, " ");
    t = t.replace(/\([^)]*\)/g, " ");
    t = t.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    return t;
  },

  lerDisco: function () {
    if (this._discoOk) return;
    this._discoOk = true;
    try {
      var raw = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      var k;
      for (k in raw) {
        if (Object.prototype.hasOwnProperty.call(raw, k) && raw[k]) this._mapa[k] = raw[k];
      }
    } catch (e) {}
  },

  gravarDisco: function () {
    var out = {};
    var n = 0;
    var k;
    for (k in this._mapa) {
      if (!Object.prototype.hasOwnProperty.call(this._mapa, k) || !this._mapa[k]) continue;
      out[k] = this._mapa[k];
      n++;
      if (n >= this.MAX_DISCO) break;
    }
    try {
      localStorage.setItem(this.KEY, JSON.stringify(out));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "logos_cache: " + ((e && e.message) || ""));
    }
  },

  guardar: function (chave, url) {
    if (!chave || !url) return;
    this._mapa[chave] = url;
    this.gravarDisco();
  },

  add: function (nome, url) {
    if (!url) return;
    var k = this.chave(nome);
    if (k && !this._mapa[k]) this._mapa[k] = url;
  },

  indexarAcervo: function () {
    var agora = Date.now();
    if (this._idxAt && agora - this._idxAt < 45000) return;
    this._idxAt = agora;
    this.lerDisco();
    var i, ch, d, listas, li, it;
    d = window.SAIMO_CHANNELS_DATA && SAIMO_CHANNELS_DATA.channels;
    if (d && d.length) {
      for (i = 0; i < d.length; i++) {
        ch = d[i];
        if (ch && ch.logo) this.add(ch.name, ch.logo);
      }
    }
    if (window.SaimoXtream && SaimoXtream.canaisAoVivo) {
      d = SaimoXtream.canaisAoVivo() || [];
      for (i = 0; i < d.length; i++) {
        ch = d[i];
        if (ch && ch.logo) this.add(ch.name, ch.logo);
      }
    }
    if (window.SaimoListas && SaimoListas.listas) {
      listas = SaimoListas.listas;
      for (li = 0; li < listas.length; li++) {
        d = (listas[li] && listas[li].itens) || [];
        for (i = 0; i < d.length; i++) {
          it = d[i];
          if (it && it.kind === "live" && it.logo) this.add(it.name || it.title, it.logo);
        }
      }
    }
  },

  urlDe: function (nome) {
    this.lerDisco();
    var k = this.chave(nome);
    if (!k) return "";
    if (this._miss[k]) return "";
    if (this._mapa[k]) return this._mapa[k];
    return this._urlTv(k);
  },

  _urlTv: function (k) {
    var idx = window.SAIMO_TV_LOGOS;
    if (!idx || !k) return "";
    var path = idx[k];
    if (!path && /^tv /.test(k)) path = idx[k.slice(3)];
    if (!path && / tv$/.test(k)) path = idx[k.replace(/ tv$/, "")];
    if (!path && / channel$/.test(k)) path = idx[k.replace(/ channel$/, "")];
    if (!path && / brasil$/.test(k)) path = idx[k.replace(/ brasil$/, "")];
    if (!path) {
      var compacto = k.replace(/ /g, "");
      if (idx[compacto]) path = idx[compacto];
    }
    if (!path) {
      var num = k.match(/^(.+?)\s+(\d+)$/);
      if (num && idx[num[1] + num[2]]) path = idx[num[1] + num[2]];
    }
    return path ? this.CDN + path : "";
  },

  pintar: function (alvo, url, nome) {
    if (!alvo || !url) return;
    var img = alvo.tagName === "IMG" ? alvo : alvo.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      var ph = alvo.querySelector(".channel-logo-placeholder, .zap-logo-letra");
      if (ph) ph.replaceWith(img);
      else {
        alvo.textContent = "";
        alvo.appendChild(img);
      }
    }
    if (alvo.className && String(alvo.className).indexOf("zap") !== -1) img.className = "zap-logo";
    else if (!img.className) img.className = "channel-logo";
    img.onerror = function () {
      var letra = document.createElement("div");
      if (alvo.className && String(alvo.className).indexOf("zap") !== -1) letra.className = "zap-logo-letra";
      else if (!(alvo.className && String(alvo.className).indexOf("live-logo") !== -1)) letra.className = "channel-logo-placeholder";
      letra.textContent = String(nome || "?").charAt(0).toUpperCase();
      img.replaceWith(letra);
    };
    img.style.display = "";
    if (img.getAttribute("src") !== url) img.src = url;
  },

  pedir: function (item, alvo) {
    if (!item || !alvo) return;
    var nome = item.name || item.title || "";
    if (item.logo) {
      this.pintar(alvo, item.logo, nome);
      return;
    }
    this.indexarAcervo();
    var k = this.chave(nome);
    if (!k || k.length < 2 || /^\d+$/.test(k) || this._miss[k]) return;
    if (this._mapa[k]) {
      item.logo = this._mapa[k];
      this.pintar(alvo, item.logo, nome);
      return;
    }
    var tv = this._urlTv(k);
    if (tv) {
      this.guardar(k, tv);
      item.logo = tv;
      this.pintar(alvo, tv, nome);
      return;
    }
    this._fila.push({ item: item, alvo: alvo, k: k, nome: nome });
    this._bombeiar();
  },

  _bombeiar: function () {
    var _this = this;
    var max = 1;
    try {
      if (window.SaimoDiagnostico && !SaimoDiagnostico.detectarWebOS().webos) max = this.MAX_FILA;
    } catch (e) {}
    while (this._ativos < max && this._fila.length) {
      var job = this._fila.shift();
      if (!job.alvo || !job.alvo.isConnected) continue;
      if (this._mapa[job.k]) {
        job.item.logo = this._mapa[job.k];
        this.pintar(job.alvo, job.item.logo, job.nome);
        continue;
      }
      if (this._miss[job.k]) continue;
      this._ativos++;
      (function (j) {
        _this._tmdb(j.k).then(function (url) {
          _this._ativos--;
          if (url) {
            _this.guardar(j.k, url);
            j.item.logo = url;
            if (j.alvo && j.alvo.isConnected) _this.pintar(j.alvo, url, j.nome);
          } else {
            _this._miss[j.k] = 1;
          }
          _this._bombeiar();
        }).catch(function () {
          _this._ativos--;
          _this._miss[j.k] = 1;
          _this._bombeiar();
        });
      })(job);
    }
  },

  _tmdb: function (q) {
    if (!q || !window.SaimoFicha || !SaimoFicha.pedir) return Promise.resolve("");
    var termo = q.split(" ").slice(0, 4).join(" ");
    var url = SaimoFicha.urlTmdb("/search/company", "query=" + encodeURIComponent(termo));
    return SaimoFicha.pedir(url).then(function (data) {
      var hit = data && data.results && data.results[0];
      if (!hit || !hit.logo_path) return "";
      return SaimoFicha.IMG + "w154" + hit.logo_path;
    }).catch(function () {
      return "";
    });
  }
};

if (typeof window !== "undefined") window.SaimoLogos = SaimoLogos;
