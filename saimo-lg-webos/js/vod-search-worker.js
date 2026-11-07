/* vod-search-worker.js — Pesquisa do acervo Saimo TV em segundo plano (Web Worker).
 *
 * Executa em thread separada. Monta o índice normalizado (minúsculas, sem acentos)
 * e responde às buscas sem nunca travar a thread de interface / controle remoto.
 *
 * Escrito em ES5 puro para rodar no escopo de Worker em todas as versões do webOS.
 */
(function () {
  'use strict';

  var index = []; // [{ id, type, title, lc, year, posterUrl, category, original }]
  var ready = false;

  function fold(s) {
    if (!s) return '';
    var str = String(s).toLowerCase();
    // Normalização sem acentos compatível com ES5
    var mapa = {
      'á':'a','à':'a','ã':'a','â':'a','ä':'a',
      'é':'e','è':'e','ê':'e','ë':'e',
      'í':'i','ì':'i','î':'i','ï':'i',
      'ó':'o','ò':'o','õ':'o','ô':'o','ö':'o',
      'ú':'u','ù':'u','û':'u','ü':'u',
      'ç':'c','ñ':'n'
    };
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      out += mapa[c] || c;
    }
    return out.replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function addItems(items, defaultType) {
    if (!items || !items.length) return;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!it) continue;
      var title = it.title || it.name || '';
      if (!title) continue;
      var type = it.type || defaultType || 'movie';
      var lc = fold(title);
      index.push({
        id: it.id || (type + ':' + title),
        type: type,
        title: title,
        lc: lc,
        year: it.year || '',
        posterUrl: it.posterUrl || it.logo || it.stream_icon || it.cover || '',
        category: it.category || '',
        original: it
      });
    }
  }

  function scoreItem(lc, query) {
    if (lc === query) return 1;
    if (lc.indexOf(query) === 0) return 2;
    var words = lc.split(' ');
    for (var w = 0; w < words.length; w++) {
      if (words[w].indexOf(query) === 0) return 3;
    }
    var idx = lc.indexOf(query);
    if (idx !== -1) return 4;
    return -1;
  }

  function noEscopo(type, scope) {
    if (!scope || scope === 'tudo') return true;
    if (scope === 'canais') return type === 'channel';
    if (scope === 'filmes') return type === 'movie' || type === 'filme';
    if (scope === 'series') return type === 'series';
    if (scope === 'animes') return type === 'anime';
    if (scope === 'doramas') return type === 'dorama';
    return true;
  }
  function search(query, limit, reqId, scope) {
    var q = fold(query);
    var lim = limit || 40;
    scope = scope || 'tudo';
    if (q.length < 2) {
      self.postMessage({ cmd: 'results', reqId: reqId, q: query, canais: [], filmes: [], series: [], animes: [], doramas: [], total: 0, scope: scope });
      return;
    }

    var canais = [];
    var filmes = [];
    var series = [];
    var animes = [];
    var doramas = [];
    for (var i = 0; i < index.length; i++) {
      var it = index[i];
      if (!noEscopo(it.type, scope)) continue;
      var score = scoreItem(it.lc, q);
      if (score === -1) continue;

      var match = { item: it.original, score: score, title: it.title, type: it.type };

      if (it.type === 'channel') canais.push(match);
      else if (it.type === 'series') series.push(match);
      else if (it.type === 'anime') animes.push(match);
      else if (it.type === 'dorama') doramas.push(match);
      else filmes.push(match);
    }

    function sortMatch(a, b) {
      return a.score - b.score || a.title.localeCompare(b.title);
    }

    canais.sort(sortMatch);
    filmes.sort(sortMatch);
    series.sort(sortMatch);
    animes.sort(sortMatch);
    doramas.sort(sortMatch);

    if (canais.length > 24) canais = canais.slice(0, 24);
    if (filmes.length > lim) filmes = filmes.slice(0, lim);
    if (series.length > lim) series = series.slice(0, lim);
    if (animes.length > lim) animes = animes.slice(0, lim);
    if (doramas.length > lim) doramas = doramas.slice(0, lim);

    // Extrair apenas o item original
    var resCanais = [];
    for (var c = 0; c < canais.length; c++) resCanais.push(canais[c].item);
    var resFilmes = [];
    for (var f = 0; f < filmes.length; f++) resFilmes.push(filmes[f].item);
    var resSeries = [];
    for (var s = 0; s < series.length; s++) resSeries.push(series[s].item);
    var resAnimes = [];
    for (var a = 0; a < animes.length; a++) resAnimes.push(animes[a].item);
    var resDoramas = [];
    for (var d = 0; d < doramas.length; d++) resDoramas.push(doramas[d].item);

    var total = resCanais.length + resFilmes.length + resSeries.length + resAnimes.length + resDoramas.length;

    self.postMessage({
      cmd: 'results',
      reqId: reqId,
      q: query,
      canais: resCanais,
      filmes: resFilmes,
      series: resSeries,
      animes: resAnimes,
      doramas: resDoramas,
      total: total,
      ready: ready,
      scope: scope
    });
  }

  self.onmessage = function (e) {
    var data = e.data || {};
    var cmd = data.cmd;

    if (cmd === 'init' || cmd === 'add_items') {
      if (data.clear) index = [];
      addItems(data.items, data.defaultType);
      ready = true;
      self.postMessage({ cmd: 'ready', count: index.length });
    } else if (cmd === 'search') {
      search(data.q, data.limit, data.reqId, data.scope);
    } else if (cmd === 'clear') {
      index = [];
      ready = false;
    }
  };
})();
