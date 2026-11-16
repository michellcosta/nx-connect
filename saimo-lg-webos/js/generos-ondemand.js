/**
 * Fileiras de gênero no On Demand, a partir do fichas.txt.
 * Ocioso, até 60 títulos por gênero, mais recentes primeiro, 4 capas na fileira.
 */
var SaimoGenerosOd = {
  MAX: 60,
  CAPAS: 4,
  ORDEM: ["Ação", "Comédia", "Drama", "Terror", "Suspense", "Ficção científica", "Animação", "Romance", "Aventura", "Crime", "Família", "Fantasia", "Mistério", "Documentário", "Guerra", "Faroeste", "História", "Música"],
  cache: null,
  recs: function recs(genero) {
    if (!window.SaimoFicha || !SaimoFicha.listarPorGenero) return [];
    var f = SaimoFicha.listarPorGenero(false, genero, this.MAX, true) || [];
    var s = SaimoFicha.listarPorGenero(true, genero, this.MAX, true) || [];
    var mix = [];
    var i;
    for (i = 0; i < f.length; i++) mix.push({ rec: f[i], serie: false, ano: f[i].ano || 0 });
    for (i = 0; i < s.length; i++) mix.push({ rec: s[i], serie: true, ano: s[i].ano || 0 });
    mix.sort(function (a, b) {
      return b.ano - a.ano || String(a.rec.titulo || "").localeCompare(String(b.rec.titulo || ""), "pt-BR");
    });
    var out = [];
    var visto = Object.create(null);
    for (i = 0; i < mix.length && out.length < this.MAX; i++) {
      var t = mix[i].rec && mix[i].rec.titulo;
      if (!t || visto[t]) continue;
      visto[t] = 1;
      out.push(mix[i]);
    }
    return out;
  },
  preparar: function preparar() {
    if (this.cache) return this.cache;
    if (!window.SaimoFicha || !SaimoFicha.loaded) return [];
    var filas = [];
    for (var i = 0; i < this.ORDEM.length; i++) {
      var g = this.ORDEM[i];
      var lista = this.recs(g);
      if (lista.length < this.CAPAS) continue;
      filas.push({
        title: g,
        genero: g,
        recs: lista
      });
    }
    this.cache = filas;
    return filas;
  },
  cardsDaFila: function cardsDaFila(fila, cardFn) {
    var recs = (fila && fila.recs || []).slice(0, this.CAPAS);
    var items = [];
    for (var i = 0; i < recs.length; i++) {
      var card = cardFn(recs[i].rec, recs[i].serie);
      if (card) items.push(card);
    }
    return items;
  }
};
window.SaimoGenerosOd = SaimoGenerosOd;
