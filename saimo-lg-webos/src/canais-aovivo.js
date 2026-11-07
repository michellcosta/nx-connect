/**
 * Ao vivo: um canal, várias fontes (Saimo + Xtream + listas).
 * Abas por o que você assiste, não por de onde veio o sinal.
 */
var SaimoCanaisAoVivo = {
  ABAS: ["Favoritos", "Recentes", "TV aberta", "Esportes", "Variedades", "Documentários", "Cinema", "Mais"],
  chave: function chave(s) {
    var k = String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    k = k.replace(/\s*\(lista\s+\d+\)\s*$/g, " ");
    k = k.replace(/\b(fhd|uhd|4k|8k|full hd|hd|sd|hevc|h265|h264|fhd60|60fps|multi audio|alt|fhdr|ot|rk)\b/g, " ");
    k = k.replace(/[''`´]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    return k;
  },
  origemFonte: function origemFonte(s, canal) {
    if (!s && canal) {
      if (canal.xtream) return "xtream";
      if (canal.suaLista) return "lista";
      return "saimo";
    }
    if (!s) return "saimo";
    if (s.origem === "xtream" || s.origemNome === "Xtream" || s.origem === "xtream") return "xtream";
    if (s.suaLista || s.origem === "lista" || s.origem === "meu") return "lista";
    if (s.origemNome && /xtream/i.test(s.origemNome)) return "xtream";
    if (s.origem === "saimo") return "saimo";
    return "saimo";
  },
  rotuloOrigem: function rotuloOrigem(o, s) {
    if (o === "xtream") return "Xtream";
    if (o === "lista") {
      var n = s && (s.listaNome || s.origemNome);
      if (n && !/^xtream$/i.test(n) && n !== "Sua lista") return n;
      return "Lista";
    }
    return "Saimo";
  },
  rotuloFonte: function rotuloFonte(s, canal) {
    return this.rotuloOrigem(this.origemFonte(s, canal), s);
  },
  origensDoCanal: function origensDoCanal(c) {
    var visto = {};
    var out = [];
    var srcs = (c && c.sources) || [];
    var i, o;
    for (i = 0; i < srcs.length; i++) {
      o = this.origemFonte(srcs[i], c);
      if (visto[o]) continue;
      visto[o] = 1;
      out.push(o);
    }
    if (!out.length) out.push(this.origemFonte(null, c));
    return out;
  },
  textoOrigens: function textoOrigens(c) {
    var self = this;
    return this.origensDoCanal(c).map(function (o) {
      return self.rotuloOrigem(o);
    }).join(" · ");
  },
  marcarFonte: function marcarFonte(s, origem, extra) {
    extra = extra || {};
    var copia = {};
    var k;
    for (k in s) {
      if (Object.prototype.hasOwnProperty.call(s, k)) copia[k] = s[k];
    }
    copia.origem = origem;
    if (origem === "xtream") {
      copia.origemNome = "Xtream";
    } else if (origem === "lista") {
      copia.suaLista = true;
      if (extra.listaNome) {
        copia.listaNome = extra.listaNome;
        copia.origemNome = extra.listaNome;
      }
    } else {
      copia.origemNome = copia.origemNome || "Saimo";
    }
    return copia;
  },
  textoBalde: function textoBalde(c) {
    var t = String((c && c.category) || "") + " " + String((c && (c.name || c.title)) || "");
    t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return t;
  },
  balde: function balde(c) {
    var t = this.textoBalde(c);
    if (/\bvariedades?\b/.test(t)) return "variedades";
    if (/\b(infantil|kids|cartoon|nick|gloob|tooncast|baby ?tv|discovery kids|boomerang|cartoonito)s?\b/.test(t)) return "infantil";
    if (/\b(esportes?|sports?|premiere|combate|espn|dazn|ufc|fight|band sports|sportv)\b/.test(t)) return "esportes";
    if (/\b(documentarios?|documentaries|discovery(?!\s*kids)|history|nat ?geo|national geographic|animal planet|love nature)\b/.test(t)) return "documentarios";
    if (/\bfilmes?\b/.test(t) || /\b(cinema|telecine|hbo|megapix|cinemax|tnt|space|warner|paramount|sony movies|tcm)\b/.test(t) && !/\b(noticias|news)\b/.test(t)) return "cinema";
    if (/\b(globo|band|record|sbt|redetv|rede tv|cultura|gazeta|cnn|jovem pan|tv brasil|tv senado|tv camara|canais abertos|tv aberta|abertos)\b/.test(t)) return "aberta";
    return "outros";
  },
  noBalde: function noBalde(c, nome) {
    if (nome === "TV aberta") return this.balde(c) === "aberta";
    if (nome === "Esportes") return this.balde(c) === "esportes";
    if (nome === "Variedades") return this.balde(c) === "variedades";
    if (nome === "24 Desenho") return this.balde(c) === "desenho";
    if (nome === "Infantil") return this.balde(c) === "infantil";
    if (nome === "Documentários") return this.balde(c) === "documentarios";
    if (nome === "Cinema") return this.balde(c) === "cinema";
    return false;
  },
  catNoBaldePrincipal: function catNoBaldePrincipal(cat) {
    var b = this.balde({ category: cat, name: "" });
    return b === "aberta" || b === "esportes" || b === "variedades" || b === "documentarios" || b === "cinema";
  },
  mesclar: function mesclar(grupos) {
    var map = Object.create(null);
    var ordem = [];
    var g, i, c, key, prev, s, j, url, visto;
    for (g = 0; g < grupos.length; g++) {
      var lista = grupos[g].canais || [];
      var origem = grupos[g].origem;
      var extra = grupos[g].extra || {};
      for (i = 0; i < lista.length; i++) {
        c = lista[i];
        if (!c) continue;
        key = this.chave(c.name || c.title);
        if (!key) continue;
        if (!map[key]) {
          map[key] = {
            type: "channel",
            isLive: true,
            name: String(c.name || c.title || "").replace(/\s*\(Lista\s+\d+\)\s*$/i, ""),
            title: c.title || c.name,
            category: c.category || "",
            logo: c.logo || "",
            sources: [],
            xtream: !!c.xtream || origem === "xtream",
            suaLista: origem === "lista",
            xtreamId: c.xtreamId || c.stream_id || ""
          };
          ordem.push(key);
        }
        prev = map[key];
        if (!prev.logo && c.logo) prev.logo = c.logo;
        if (c.xtream || origem === "xtream") {
          prev.xtream = true;
          if (c.xtreamId || c.stream_id) prev.xtreamId = c.xtreamId || c.stream_id;
        }
        if (origem === "lista") prev.suaLista = true;
        visto = Object.create(null);
        for (j = 0; j < prev.sources.length; j++) visto[prev.sources[j].url] = 1;
        var srcs = c.sources && c.sources.length ? c.sources : [];
        for (s = 0; s < srcs.length; s++) {
          url = srcs[s] && srcs[s].url;
          if (!url || visto[url]) continue;
          visto[url] = 1;
          prev.sources.push(this.marcarFonte(srcs[s], origem, extra));
        }
      }
    }
    var out = [];
    for (i = 0; i < ordem.length; i++) {
      c = map[ordem[i]];
      if (c.sources && c.sources.length) out.push(c);
    }
    return out;
  },
  agruparFontes: function agruparFontes(sources, canal) {
    var grupos = { lista: [], xtream: [], saimo: [] };
    var ordem = ["lista", "xtream", "saimo"];
    var i, o, s;
    for (i = 0; i < (sources || []).length; i++) {
      s = sources[i];
      o = this.origemFonte(s, canal);
      if (!grupos[o]) grupos[o] = [];
      grupos[o].push({ s: s, i: i });
    }
    var out = [];
    for (i = 0; i < ordem.length; i++) {
      o = ordem[i];
      if (!grupos[o] || !grupos[o].length) continue;
      out.push({
        titulo: this.rotuloOrigem(o, grupos[o][0].s),
        origem: o,
        itens: grupos[o]
      });
    }
    return out;
  }
};
window.SaimoCanaisAoVivo = SaimoCanaisAoVivo;
