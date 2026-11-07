"use strict";

/**
 * Endereços oficiais de canais e VOD (mesmos arquivos do celular / TV Box).
 * Catálogo Saimo e catálogo próprio podem ligar juntos ou só um.
 */
var SaimoOficial = {
  DEFAULT_CANAIS: "https://canais-saimo.pages.dev/catalogo.txt",
  DEFAULT_VOD: "https://filmes-saimo.pages.dev/",
  LOCAL_CANAIS: "catalogo.txt",

  urlCanais: function urlCanais() {
    var raw = window.SaimoAjustes ? SaimoAjustes.get("urlCanais") : "";
    var s = String(raw || "").trim();
    return s || this.DEFAULT_CANAIS;
  },

  urlMeuVod: function urlMeuVod() {
    var raw = window.SaimoAjustes ? SaimoAjustes.get("urlVod") : "";
    var s = String(raw || "").trim();
    if (!s) return "";
    return s.replace(/\/?$/, "/");
  },

  catalogoSaimoLigado: function catalogoSaimoLigado() {
    if (!window.SaimoAjustes) return true;
    return SaimoAjustes.get("catalogoSaimo") !== false;
  },

  catalogoMeuLigado: function catalogoMeuLigado() {
    if (!window.SaimoAjustes) return false;
    return !!SaimoAjustes.get("catalogoMeu") && !!this.urlMeuVod();
  },

  catalogoXtreamLigado: function catalogoXtreamLigado() {
    return !!(window.SaimoXtream && SaimoXtream.ligado && SaimoXtream.ligado());
  },

  temCatalogoVod: function temCatalogoVod() {
    return this.catalogoSaimoLigado() || this.catalogoMeuLigado() || this.catalogoXtreamLigado();
  },

  /**
   * Origens ativas. A sua vem primeiro (mais fontes / prioridade de play).
   */
  vodOrigens: function vodOrigens() {
    var out = [];
    var meu = this.catalogoMeuLigado();
    var saimo = this.catalogoSaimoLigado();
    if (meu) {
      out.push({
        id: "meu",
        nome: "Seu",
        base: this.urlMeuVod(),
        local: false
      });
    }
    if (saimo) {
      if (this.usarEmbutido()) {
        out.push({
          id: "saimo",
          nome: "Saimo",
          base: "vod/",
          local: true
        });
      } else {
        out.push({
          id: "saimo",
          nome: "Saimo",
          base: this.DEFAULT_VOD,
          local: false
        });
      }
    }
    return out;
  },

  urlVodBase: function urlVodBase() {
    var origens = this.vodOrigens();
    var i;
    for (i = 0; i < origens.length; i++) {
      if (origens[i].id === "saimo") return origens[i].base;
    }
    if (origens.length) return origens[0].base;
    if (this.catalogoSaimoLigado()) return this.DEFAULT_VOD;
    return "";
  },

  usarEmbutido: function usarEmbutido() {
    return !!(window.SaimoAjustes && SaimoAjustes.get("pacoteEmbutido"));
  },

  restaurarPadrao: function restaurarPadrao() {
    if (!window.SaimoAjustes) return {};
    return SaimoAjustes.gravar({
      urlCanais: "",
      urlVod: "",
      catalogoSaimo: true,
      catalogoMeu: false
    });
  },

  syncApiUrls: function syncApiUrls() {
    if (!window.SaimoAPI) return;
    SaimoAPI.remoteUrl = this.urlCanais();
    SaimoAPI.vodRemoteBase = this.urlVodBase();
    var base = String(SaimoAPI.vodRemoteBase || "");
    if (this.catalogoSaimoLigado() || this.catalogoMeuLigado()) {
      SaimoAPI.vodDestaquesRemote = (base.indexOf("http") === 0 ? base : this.DEFAULT_VOD) + "destaques.txt";
    } else {
      SaimoAPI.vodDestaquesRemote = "";
    }
  },

  resolveVodPath: function resolveVodPath(rel) {
    rel = String(rel || "").replace(/^vod\//, "");
    var base = this.urlVodBase();
    if (!base) return "";
    if (base.indexOf("http://") === 0 || base.indexOf("https://") === 0) {
      return base + rel;
    }
    return "vod/" + rel;
  },

  limparCacheVod: function limparCacheVod() {
    if (window.SaimoCatalogo && SaimoCatalogo.limparCache) {
      SaimoCatalogo.limparCache();
    }
    if (window.SaimoAPI) {
      SaimoAPI._destaquesCache = null;
      SaimoAPI._letrasFilmes = null;
      SaimoAPI._seriesCache = Object.create(null);
      if (SaimoAPI.bases) SaimoAPI.bases = {};
    }
  }
};

if (typeof window !== "undefined") {
  window.SaimoOficial = SaimoOficial;
  SaimoOficial.syncApiUrls();
}
