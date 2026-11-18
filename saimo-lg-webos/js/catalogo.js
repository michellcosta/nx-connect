/**
 * SaimoCatalogo — Carregamento sob demanda do catálogo VOD.
 *
 * Evita carregar o vod_data.js inteiro (3.7 MB, 40.000 títulos) no boot da TV.
 * Lê os arquivos particionados em vod/ apenas quando a letra ou categoria é aberta,
 * economizando centenas de megabytes de memória RAM e zerando o congelamento inicial.
 */
var SaimoCatalogo = (function () {
  'use strict';

  var LETRAS = ['#'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  var _cacheFilmes = {};
  var _cacheSeries = {};
  var _promessasEmCurso = {};
  var _destaques = null;
  var _indiceContagens = null;
  var _indicePromise = null;

  function expandToken(token) {
    token = String(token || '').trim();
    if (!token) return '';
    if (token.indexOf('http://') === 0 || token.indexOf('https://') === 0) return token;
    var parts = token.split(':');
    if (parts.length === 2) {
      var baseId = parts[0];
      var rel = parts[1];
      var base = window.SaimoAPI && SaimoAPI.baseDoIndice ? SaimoAPI.baseDoIndice(baseId) : "";
      if (!base && window.SAIMO_VOD_BASES) base = window.SAIMO_VOD_BASES[baseId];
      if (base) {
        if (base.slice(-1) !== '/' && rel.charAt(0) !== '/') base += '/';
        return base + rel + '.mp4';
      }
    }
    return '';
  }

  function extrairFontes(partes) {
    var out = [];
    for (var i = 1; i < partes.length; i++) {
      var part = partes[i].trim();
      if (part.indexOf('=') === -1) continue;
      var eq = part.indexOf('=');
      var audioRaw = part.substring(0, eq).trim().toLowerCase();
      var payload = part.substring(eq + 1).trim();
      var audio = audioRaw === 'leg' ? 'LEG' : 'DUB';
      var urls = payload.split(',');
      for (var u = 0; u < urls.length; u++) {
        var rawUrl = urls[u].trim();
        var fullUrl = expandToken(rawUrl);
        if (fullUrl) {
          out.push({
            url: fullUrl,
            quality: (audio === 'LEG' ? 'Legendado' : 'Dublado') + ' (' + (u + 1) + ')',
            audio: audio,
            referer: '',
            agent: ''
          });
        }
      }
    }
    return out;
  }

  function parseSeriesIndice(texto, letra) {
    var linhas = String(texto || '').split('\n');
    var itens = [];
    for (var i = 0; i < linhas.length; i++) {
      var linha = linhas[i].trim();
      if (!linha || linha.charAt(0) === '#') continue;
      var cols = linha.split('\t');
      var titulo = (cols[0] || '').trim();
      if (!titulo) continue;
      var year = (cols[1] || '').trim();
      if (!year || !/^\d{4}$/.test(year)) {
        var ym = titulo.match(/\((\d{4})\)/);
        year = ym ? ym[1] : year && /^\d{4}$/.test(year) ? year : '';
      }
      itens.push({
        type: 'series',
        title: titulo,
        name: titulo,
        letter: letra,
        year: year,
        posterUrl: '',
        sources: [],
        episodes: []
      });
    }
    return itens;
  }

  function parseTxtLinhas(texto, tipo, letra) {
    var linhas = String(texto || '').split('\n');
    var itens = [];
    for (var i = 0; i < linhas.length; i++) {
      var linha = linhas[i].trim();
      if (!linha || linha.charAt(0) === '#') continue;
      var cols = linha.split('\t');
      var titulo = cols[0].trim();
      if (!titulo) continue;

      var yearMatch = titulo.match(/\((\d{4})\)/);
      var year = yearMatch ? yearMatch[1] : '';
      var fontes = extrairFontes(cols);

      itens.push({
        type: tipo === 'series' ? 'series' : 'movie',
        title: titulo,
        name: titulo,
        letter: letra,
        year: year,
        posterUrl: '',
        sources: fontes
      });
    }
    return itens;
  }

  function xhrGet(url, callback) {
    if (window.SaimoOficial && String(url || "").indexOf("http://") !== 0 && String(url || "").indexOf("https://") !== 0) {
      url = SaimoOficial.resolveVodPath(String(url || "").replace(/^vod\//, ""));
    }
    if (window.SaimoAPI && SaimoAPI.urlFresca) url = SaimoAPI.urlFresca(url);
    if (!url) {
      callback(new Error('Catálogo Saimo desligado'));
      return;
    }
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, true);
      if (String(url).indexOf('http://') === 0 || String(url).indexOf('https://') === 0) {
        try { x.setRequestHeader('Cache-Control', 'no-cache'); } catch (eH) {}
        try { x.setRequestHeader('Pragma', 'no-cache'); } catch (eH2) {}
      }
      x.onload = function () {
        if (x.status >= 200 && x.status < 300) {
          callback(null, x.responseText);
        } else {
          callback(new Error('HTTP ' + x.status));
        }
      };
      x.onerror = function () { callback(new Error('Erro de rede')); };
      x.send();
    } catch (e) {
      callback(e);
    }
  }

  function fallbackVodData(tipo, letraGaveta, cache, callback, resolve) {
    if (window.SAIMO_VOD_DATA) {
      var banco = tipo === 'series' ? window.SAIMO_VOD_DATA.seriesRows : window.SAIMO_VOD_DATA.filmesRows;
      var items = (banco && banco[letraGaveta]) || [];
      cache[letraGaveta] = items;
      if (callback) callback(null, items);
      resolve(items);
      return true;
    }
    cache[letraGaveta] = [];
    if (callback) callback(null, []);
    resolve([]);
    return true;
  }

  function carregarArquivoLetra(tipo, letraGaveta, callback, resolve, reject, cache, chavePromise) {
    /* '#' na URL vira fragmento e corta o caminho: usa %23 (igual ao site). */
    var nomeLetra = letraGaveta === '#' ? '%23' : letraGaveta;
    if (tipo === 'series') {
      var arquivoIndice = 'vod/series-' + nomeLetra + '.txt';
      xhrGet(arquivoIndice, function (err, txt) {
        if (err) {
          if (fallbackVodData(tipo, letraGaveta, cache, callback, resolve)) {
            delete _promessasEmCurso[chavePromise];
          } else {
            delete _promessasEmCurso[chavePromise];
            if (callback) callback(err, []);
            resolve([]);
          }
          return;
        }
        var itens = parseSeriesIndice(txt, letraGaveta);
        cache[letraGaveta] = itens;
        delete _promessasEmCurso[chavePromise];
        if (callback) callback(null, itens);
        resolve(itens);
      });
      return;
    }
    xhrGet('vod/filmes-' + nomeLetra + '.txt', function (err2, txt2) {
      if (err2) {
        if (fallbackVodData(tipo, letraGaveta, cache, callback, resolve)) {
          delete _promessasEmCurso[chavePromise];
        } else {
          delete _promessasEmCurso[chavePromise];
          if (callback) callback(err2, []);
          resolve([]);
        }
        return;
      }
      var itensF = parseTxtLinhas(txt2, tipo, letraGaveta);
      cache[letraGaveta] = itensF;
      delete _promessasEmCurso[chavePromise];
      if (callback) callback(null, itensF);
      resolve(itensF);
    });
  }

  function parseIndiceContagens(texto) {
    var map = { filmes: {}, series: {} };
    var linhas = String(texto || '').split('\n');
    for (var i = 0; i < linhas.length; i++) {
      var linha = linhas[i].trim();
      if (!linha || linha.indexOf('base:') === 0) continue;
      var cols = linha.split('\t');
      if (cols.length < 3) continue;
      var L = cols[0].trim();
      if (!L) continue;
      var nf = parseInt(cols[1], 10);
      var ns = parseInt(cols[2], 10);
      if (!isNaN(nf)) map.filmes[L] = nf;
      if (!isNaN(ns)) map.series[L] = ns;
    }
    return map;
  }

  return {
    LETRAS: LETRAS,

    obterLetra: function (tipo, letra, callback) {
      var letraGaveta = letra === '#' ? '#' : String(letra || '#').toUpperCase();
      var cache = tipo === 'series' ? _cacheSeries : _cacheFilmes;

      if (cache[letraGaveta]) {
        if (callback) callback(null, cache[letraGaveta]);
        return Promise.resolve(cache[letraGaveta]);
      }

      var chavePromise = tipo + ':' + letraGaveta;
      if (_promessasEmCurso[chavePromise]) {
        return _promessasEmCurso[chavePromise];
      }

      var p = new Promise(function (resolve, reject) {
        carregarArquivoLetra(tipo, letraGaveta, callback, resolve, reject, cache, chavePromise);
      });

      _promessasEmCurso[chavePromise] = p;
      return p;
    },

    contagemSecao: function (tipo) {
      if (!_indiceContagens) return null;
      var map = tipo === 'series' ? _indiceContagens.series : _indiceContagens.filmes;
      var total = 0;
      for (var k in map) {
        if (Object.prototype.hasOwnProperty.call(map, k)) total += map[k];
      }
      return total || null;
    },

    carregarIndice: function () {
      if (_indiceContagens) return Promise.resolve(_indiceContagens);
      if (_indicePromise) return _indicePromise;
      _indicePromise = new Promise(function (resolve) {
        xhrGet('vod/indice.txt', function (err, txt) {
          _indiceContagens = err ? { filmes: {}, series: {} } : parseIndiceContagens(txt);
          resolve(_indiceContagens);
        });
      });
      return _indicePromise;
    },

    limparCache: function () {
      _cacheFilmes = {};
      _cacheSeries = {};
      _promessasEmCurso = {};
    }
  };
})();

if (typeof window !== 'undefined') {
  window.SaimoCatalogo = SaimoCatalogo;
}
