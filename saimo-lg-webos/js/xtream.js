/**
 * SaimoXtream — Cliente para Painéis Xtream Codes IPTV.
 *
 * Permite conectar a servidores Xtream (host, usuário e senha), sincronizar
 * categorias, canais ao vivo, filmes, séries e grade de arquivo (catch-up).
 * Compatível com ES5 / webOS 3.x+.
 */
var SaimoXtream = (function () {
  'use strict';

  function sanitizeHost(host) {
    var h = String(host || '').trim();
    if (!h) return '';
    if (!/^https?:\/\//i.test(h)) h = 'http://' + h;
    h = h.replace(/\/(player_api\.php|get\.php|xmltv\.php).*$/i, '');
    return h.replace(/\/+$/, '');
  }

  function hostStream(perfil) {
    var info = (perfil && (perfil.serverInfo || perfil.server_info)) || {};
    var url = String(info.url || '').trim();
    if (!url) return sanitizeHost(perfil && perfil.streamHost || perfil && perfil.host || '');
    var proto = String(info.server_protocol || 'http').replace(/:\/?$/, '');
    if (!/^https?:\/\//i.test(url)) url = proto + '://' + url;
    var limpo = sanitizeHost(url);
    var semProto = limpo.replace(/^https?:\/\//i, '');
    var jaTemPorta = /:\d+$/.test(semProto.split('/')[0]);
    if (!jaTemPorta) {
      var porta = proto === 'https' ? String(info.https_port || '') : String(info.port || '');
      if (porta && porta !== '80' && porta !== '443') limpo += ':' + porta;
    }
    return sanitizeHost(limpo);
  }

  function perfilMidia() {
    var p = perfilAtivo || perfilSalvo() || {};
    return {
      host: p.host,
      username: p.username,
      password: p.password,
      serverInfo: p.serverInfo || p.server_info,
      streamHost: cache.streamHost || p.streamHost || hostStream(p)
    };
  }

  function basesStream(perfil) {
    var p = perfil || perfilMidia();
    var out = [];
    var visto = {};
    function add(h) {
      h = sanitizeHost(h);
      if (!h || visto[h]) return;
      visto[h] = 1;
      out.push(h);
    }
    add(p.host);
    add(hostStream(p));
    add(p.streamHost);
    add(cache.streamHost);
    return out;
  }

  function candidateUrls(serverUrl) {
    var base = sanitizeHost(serverUrl);
    var urls = [base];
    if (base.indexOf('https://') === 0) {
      urls.push('http://' + base.slice(8));
    } else if (base.indexOf('http://') === 0) {
      urls.push('https://' + base.slice(7));
    }
    return urls;
  }

  function urlViaProxy(url) {
    if (window.SaimoAPI && SaimoAPI.proxyUrl) return SaimoAPI.proxyUrl({ url: url });
    return '';
  }

  function escapeRe(s) {
    return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function primeiraUrlLiveM3u(texto) {
    var linhas = String(texto || '').split(/\r?\n/);
    var i;
    var primeira = '';
    for (i = 0; i < linhas.length; i++) {
      var ln = linhas[i].replace(/^\s+|\s+$/g, '');
      if (!/^https?:\/\//i.test(ln)) continue;
      ln = ln.replace(/\s.*/, '');
      if (!primeira) primeira = ln;
      if (/\/play\//i.test(ln) || /\/live\//i.test(ln)) return ln;
    }
    return primeira;
  }

  function lerPadraoM3u(texto, perfil) {
    if (!texto) return null;
    var url = primeiraUrlLiveM3u(texto);
    if (!url) {
      var m0 = String(texto).match(/https?:\/\/[^\s"'<>]+/i);
      if (m0) url = m0[0];
    }
    if (!url) return null;
    var playM = url.match(/^(https?:\/\/[^/?#]+)\/play\/([^/?#]*)(\/[^?#]*)?/i);
    if (playM) {
      var suf = playM[3] || '';
      var extPlay = '';
      if (/m3u8/i.test(suf) || /m3u8/i.test(url)) extPlay = '/m3u8';
      else if (/\/ts$/i.test(suf) || /\.ts/i.test(suf)) extPlay = '/ts';
      return { tipo: 'play', base: sanitizeHost(playM[1]), meio: '/play/', ext: extPlay };
    }
    var user = String((perfil && perfil.username) || '');
    var pass = String((perfil && perfil.password) || '');
    var chaveLive = '/live/' + user + '/' + pass + '/';
    var chave = '/' + user + '/' + pass + '/';
    var posLive = user && pass ? url.indexOf(chaveLive) : -1;
    var pos = user && pass ? url.indexOf(chave) : -1;
    var base = '';
    var meio = '';
    var resto = '';
    if (posLive !== -1) {
      base = url.slice(0, posLive);
      meio = chaveLive;
      resto = url.slice(posLive + chaveLive.length);
    } else if (pos !== -1) {
      base = url.slice(0, pos);
      meio = chave;
      resto = url.slice(pos + chave.length);
    } else {
      return null;
    }
    var ext = '';
    var cortar = resto.search(/[?#]/);
    if (cortar !== -1) resto = resto.slice(0, cortar);
    if (/\/m3u8$/i.test(resto) || /\.m3u8$/i.test(resto)) ext = resto.indexOf('.m3u8') !== -1 ? '.m3u8' : '/m3u8';
    else if (/\/ts$/i.test(resto) || /\.ts$/i.test(resto)) ext = resto.indexOf('.ts') !== -1 ? '.ts' : '/ts';
    else {
      var ponto = resto.lastIndexOf('.');
      if (ponto > 0) ext = resto.slice(ponto);
    }
    return { tipo: 'live', base: sanitizeHost(base), meio: meio, ext: ext };
  }

  function xhrTextoCedo(url, callback, jaProxy) {
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.timeout = 20000;
      var acabou = false;
      function fim(err, text) {
        if (acabou) return;
        acabou = true;
        callback(err, text || '');
      }
      x.onprogress = function () {
        var t = x.responseText || '';
        if (t.indexOf('http://') !== -1 || t.indexOf('https://') !== -1) {
          try { x.abort(); } catch (e) {}
          fim(null, t);
        }
        if (t.length > 80000) {
          try { x.abort(); } catch (e2) {}
          fim(null, t);
        }
      };
      x.onload = function () {
        if (x.status >= 200 && x.status < 400) fim(null, x.responseText || '');
        else tentar();
      };
      x.onerror = function () { tentar(); };
      x.ontimeout = function () { tentar(); };
      function tentar() {
        var prox = !jaProxy ? urlViaProxy(url) : '';
        if (prox && prox !== url) {
          xhrTextoCedo(prox, callback, true);
          return;
        }
        fim(new Error('m3u'), '');
      }
      x.send();
    } catch (e) {
      callback(e, '');
    }
  }

  function xhrTexto(url, timeoutMs, callback, jaTentouProxy, onProg) {
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.timeout = timeoutMs || 60000;
      function tentarProxy(motivo) {
        var prox = !jaTentouProxy ? urlViaProxy(url) : '';
        if (prox && prox !== url) {
          xhrTexto(prox, timeoutMs, callback, true, onProg);
          return;
        }
        callback(new Error(motivo), '');
      }
      x.onprogress = function () {
        if (onProg) onProg(x.loaded || 0, x.total || 0);
      };
      x.onload = function () {
        if (x.status >= 200 && x.status < 300) callback(null, x.responseText || '');
        else tentarProxy('HTTP ' + x.status);
      };
      x.onerror = function () { tentarProxy('Erro de conexão'); };
      x.ontimeout = function () { tentarProxy('Tempo esgotado'); };
      x.send();
    } catch (e) {
      callback(e, '');
    }
  }

  function idDaUrl(url) {
    var m = String(url || '').match(/\/(\d+)\.(m3u8|ts|mp4|mkv|avi)(?:\?|$)/i);
    return m ? m[1] : '';
  }

  function caminhoM3u(url) {
    return String(url || '').split('?')[0].toLowerCase();
  }

  function ehLiveM3u(url) {
    var u = caminhoM3u(url);
    if (u.indexOf('/live/') !== -1) return true;
    if (/\/play\/[^/]+\/m3u8\/?$/.test(u)) return true;
    if (/\.m3u8$/.test(u) && u.indexOf('/movie/') === -1 && u.indexOf('/series/') === -1) return true;
    return false;
  }

  function ehVodM3u(url) {
    var u = caminhoM3u(url);
    if (u.indexOf('/movie/') !== -1) return true;
    if (/\/play\/[^/]+\/?$/.test(u) && u.indexOf('/m3u8') === -1) return true;
    return false;
  }

  function ehSerieM3u(url) {
    return caminhoM3u(url).indexOf('/series/') !== -1;
  }

  function attrExtinf(ln, nome) {
    var m = String(ln || '').match(new RegExp(nome + '="([^"]*)"', 'i'));
    return m ? m[1] : '';
  }

  function chaveCanal(s) {
    return chaveTitulo(String(s || '').replace(/^[a-z]{2,4}\s*[:|\-]\s*/i, ''));
  }

  function indexarNome(mapa, nome, alvo) {
    var a = chaveTitulo(nome);
    var b = chaveCanal(nome);
    if (a) mapa[a] = alvo;
    if (b) mapa[b] = alvo;
  }

  function urlPlayDoId(id) {
    if (!id || !cache.playPorId) return '';
    return cache.playPorId[String(id)] || '';
  }

  function juntarFontes() {
    var visto = {};
    var out = [];
    var a, i, src, lista;
    for (a = 0; a < arguments.length; a++) {
      lista = arguments[a];
      if (!lista) continue;
      if (lista.url) lista = [lista];
      for (i = 0; i < lista.length; i++) {
        src = lista[i];
        if (!src || !src.url || visto[src.url]) continue;
        visto[src.url] = 1;
        out.push(src);
      }
    }
    return out;
  }

  function hostApi(perfil) {
    var p = perfil || perfilMidia();
    return sanitizeHost((p && p.host) || cache.host || '');
  }

  function hostnameDe(url) {
    try { return new URL(String(url || '')).hostname.toLowerCase(); } catch (e) { return ''; }
  }

  function urlLiveDoPadrao(id, perfil) {
    if (!id) return '';
    var p = perfil || perfilMidia();
    var user = String((p && p.username) || '');
    var pass = String((p && p.password) || '');
    if (!user || !pass) return '';
    var pad = cache.padraoLive;
    var base = hostApi(p);
    var meio = '/live/' + user + '/' + pass + '/';
    var ext = '.ts';
    if (pad && pad.tipo !== 'play') {
      if (pad.base) base = pad.base;
      if (pad.meio) meio = pad.meio;
      if (typeof pad.ext === 'string') ext = pad.ext;
    }
    if (!base) base = basesStream(p)[0] || '';
    if (!base) return '';
    return base + meio + id + ext;
  }

  function fontesAoVivo(id, playUrl, perfil) {
    var direto = String(playUrl || urlPlayDoId(id) || '').replace(/^\s+|\s+$/g, '');
    var classica = urlLiveDoPadrao(id, perfil);
    var out = [];
    if (direto) out = juntarFontes(fontesLivePlay(direto), out);
    if (classica && classica !== direto) out = juntarFontes(out, [fonteXtream(classica)]);
    return out;
  }

  function nomeExtinf(ln) {
    var s = String(ln || '');
    var virg = s.lastIndexOf(',');
    var nome = virg >= 0 ? s.slice(virg + 1).replace(/^\s+|\s+$/g, '') : '';
    return nome || attrExtinf(s, 'tvg-name');
  }

  function aplicarPlayNosItens() {
    var nLive = 0;
    var nVod = 0;
    var amostraLive = '';
    var amostraVod = '';
    var i;
    var k;
    var perfil = perfilMidia();
    for (i = 0; i < (cache.canais || []).length; i++) {
      var urlC = urlPlayDoId(cache.canais[i].xtreamId) || cache.canais[i].playUrl || '';
      if (urlC) {
        cache.canais[i].playUrl = urlC;
        nLive++;
        if (!amostraLive) amostraLive = urlC;
      }
      if (!cache.canais[i].sources || !cache.canais[i].sources.length) {
        cache.canais[i].sources = fontesAoVivo(cache.canais[i].xtreamId, cache.canais[i].playUrl, perfil);
      }
    }
    for (k in cache.filmes) {
      if (!Object.prototype.hasOwnProperty.call(cache.filmes, k)) continue;
      var urlF = cache.filmes[k].playUrl || urlPlayDoId(cache.filmes[k].xtreamId) || '';
      if (!urlF) continue;
      nVod++;
      if (!amostraVod) amostraVod = urlF;
      break;
    }
    if (window.SaimoDiagnostico) {
      SaimoDiagnostico.linha(
        'M3U xui-id: ' + nLive + ' canais · ' + nVod + ' filmes. Live: ' +
        (window.SaimoDiagnostico.maskUrl(amostraLive) || '(sem match)') +
        ' · Filme: ' + (window.SaimoDiagnostico.maskUrl(amostraVod) || '(sem match)')
      );
    }
    return nLive + nVod;
  }

  function aplicarM3u(texto) {
    if (!texto) return 0;
    if (!cache.playPorId) cache.playPorId = {};
    var linhas = String(texto).split(/\r?\n/);
    var xui = '';
    var nomeInf = '';
    var n = 0;
    var i;
    for (i = 0; i < linhas.length; i++) {
      var ln = linhas[i];
      if (!ln) continue;
      if (ln.charCodeAt(0) === 35) {
        if (ln.indexOf('#EXTINF') === 0) {
          xui = attrExtinf(ln, 'xui-id');
          nomeInf = nomeExtinf(ln);
        }
        continue;
      }
      if (ln.indexOf('http') !== 0) continue;
      var url = ln.replace(/^\s+|\s+$/g, '');
      var id = xui || idDaUrl(url);
      if (id) {
        cache.playPorId[String(id)] = url;
        n++;
      }
      if (ehVodM3u(url) && nomeInf) {
        var kf = chaveTitulo(nomeInf);
        if (kf && cache.filmes[kf]) {
          cache.filmes[kf].playUrl = url;
          n++;
        }
      }
      xui = '';
      nomeInf = '';
    }
    var pad = lerPadraoM3u(texto, perfilMidia());
    if (pad) {
      cache.padraoLive = pad;
      if (pad.tipo !== 'play' && pad.base) cache.streamHost = pad.base;
    }
    aplicarPlayNosItens();
    return n;
  }

  function faltaPlayUrl() {
    var i;
    var k;
    var nFilmes = 0;
    var nComUrl = 0;
    for (i = 0; i < (cache.canais || []).length; i++) {
      if (cache.canais[i].xtreamId && !cache.canais[i].playUrl) return true;
    }
    for (k in cache.filmes) {
      if (!Object.prototype.hasOwnProperty.call(cache.filmes, k)) continue;
      nFilmes++;
      if (cache.filmes[k].playUrl) nComUrl++;
    }
    if (nFilmes && nComUrl < Math.max(1, Math.floor(nFilmes * 0.2))) return true;
    return false;
  }

  function baixarM3u(perfil, callback, silencioso) {
    var cb = callback || function () {};
    var host = sanitizeHost((perfil && perfil.host) || cache.host);
    if (!host || !perfil) {
      cb(0);
      return;
    }
    var q = host + '/get.php?username=' + encodeURIComponent(perfil.username) + '&password=' + encodeURIComponent(perfil.password);
    function pM3u(loaded, total) {
      if (silencioso) return;
      var mb = (loaded / 1048576).toFixed(1);
      var pct = total ? 50 + Math.round(40 * loaded / total) : Math.min(88, 50 + loaded / (512 * 1024));
      avisarProgresso(pct, 'Catálogo já está salvo. Baixando só os links reais… ' + mb + ' MB');
    }
    xhrTexto(q + '&type=m3u_plus', 400000, function (err, text) {
      var n = aplicarM3u(text);
      if (n) {
        cb(n);
        return;
      }
      xhrTexto(q + '&type=m3u', 120000, function (err2, text2) {
        cb(aplicarM3u(text2));
      }, false, pM3u);
    }, false, pM3u);
  }

  function aprenderPadraoLive(perfil, callback) {
    var cb = callback || function () {};
    if (cache.padraoLive && cache.padraoLive.meio) {
      cb(cache.padraoLive);
      return;
    }
    var bases = basesStream(perfil);
    var urls = [];
    var i;
    for (i = 0; i < bases.length; i++) {
      var q = bases[i] + '/get.php?username=' + encodeURIComponent(perfil.username) + '&password=' + encodeURIComponent(perfil.password);
      urls.push(q + '&type=m3u&output=hls');
      urls.push(q + '&type=m3u&output=ts');
    }
    var n = 0;
    function next() {
      if (n >= urls.length) {
        cb(null);
        return;
      }
      xhrTextoCedo(urls[n++], function (err, text) {
        var pad = lerPadraoM3u(text, perfil);
        if (pad) {
          cache.padraoLive = pad;
          if (!cache.streamHost) cache.streamHost = pad.base;
          if (window.SaimoDiagnostico) {
            SaimoDiagnostico.linha('padrão live ' + (cache.streamHost || pad.base) + ' · m3u ' + pad.base + (pad.meio && pad.meio.indexOf('/live/') >= 0 ? ' /live/' : ' /') + 'id' + (pad.ext || ''));
          }
          cb(pad);
          return;
        }
        next();
      });
    }
    next();
  }

  function fmtMbBaixado(bytes, total) {
    var mb = Math.round((bytes || 0) / 104857.6) / 10;
    var msg = mb + ' MB';
    if (total) msg += ' de ' + Math.round(total / 104857.6) / 10 + ' MB';
    return msg;
  }
  function xhrJSON(url, timeoutMs, callback, jaTentouProxy, onProg) {
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.timeout = timeoutMs || 15000;
      function tentarProxy(motivo) {
        var prox = !jaTentouProxy ? urlViaProxy(url) : '';
        if (prox && prox !== url) {
          xhrJSON(prox, timeoutMs, callback, true, onProg);
          return;
        }
        callback(new Error(motivo));
      }
      if (onProg && x.addEventListener) {
        x.addEventListener('progress', function (ev) {
          if (!ev) return;
          if (ev.lengthComputable && ev.total) onProg(ev.loaded / ev.total, ev.loaded, ev.total);
          else if (ev.loaded) onProg(-1, ev.loaded, 0);
        });
      }
      x.onload = function () {
        if (x.status >= 200 && x.status < 300) {
          var grande = x.responseText && x.responseText.length > 3e6;
          if (grande) {
            avisarProgresso(progressoPct, 'Catálogo grande (' + fmtMbBaixado(x.responseText.length) + '). Lendo… a tela pode travar por até 1 minuto.');
          }
          try {
            var data = JSON.parse(x.responseText);
            callback(null, data);
          } catch (e) {
            tentarProxy('Resposta inválida do servidor');
          }
        } else {
          tentarProxy('HTTP ' + x.status);
        }
      };
      x.ontimeout = function () { tentarProxy('Tempo esgotado'); };
      x.onerror = function () { tentarProxy('Erro de conexão com o servidor'); };
      x.send();
    } catch (e) {
      if (!jaTentouProxy) {
        var prox = urlViaProxy(url);
        if (prox) {
          xhrJSON(prox, timeoutMs, callback, true, onProg);
          return;
        }
      }
      callback(e);
    }
  }

  function apiUrl(perfil, params) {
    var base = sanitizeHost(perfil.host || perfil.server_url);
    var u = encodeURIComponent(perfil.username || perfil.user || '');
    var p = encodeURIComponent(perfil.password || perfil.pass || '');
    var query = 'username=' + u + '&password=' + p;
    if (params) query += '&' + params;
    return base + '/player_api.php?' + query;
  }

  var CACHE_KEY = 'saimo_xtream_vod';
  var SEMANA_MS = 7 * 24 * 60 * 60 * 1000;
  var cache = { filmes: {}, series: {}, canais: [], playPorId: {}, ts: 0, host: '', user: '', lastErro: '', lastOk: false };
  var perfilAtivo = null;
  var syncEmCurso = false;
  var m3uSessao = false;
  var syncEsperando = [];
  var lastErro = '';
  var lastOk = false;
  var discoPronto = false;
  var discoCarregando = null;
  var idbConn = null;
  var idbFila = null;
  var progressoOuvintes = [];
  var progressoPct = 0;
  var progressoMsg = '';
  var colecaoMemo = {};
  var indiceLetra = { movie: null, series: null };

  function lerAjustes() {
    return window.SaimoAjustes ? SaimoAjustes.ler() : {};
  }

  function perfilSalvo() {
    var a = lerAjustes();
    var host = String(a.xtreamHost || '').trim();
    var user = String(a.xtreamUser || '').trim();
    var pass = String(a.xtreamPass || '');
    if (!host || !user || !pass) return null;
    return { host: sanitizeHost(host), username: user, password: pass };
  }

  function ligado() {
    var a = lerAjustes();
    if (!perfilSalvo()) return false;
    return !a.xtreamOff;
  }

  function chaveTitulo(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/\s*\(\d{4}\)\s*$/, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function letraDe(title) {
    var t = String(title || '').trim();
    var c = t.charAt(0).toUpperCase();
    if (c >= 'A' && c <= 'Z') return c;
    return '#';
  }

  function urlTsDoPlay(url) {
    return String(url || '').replace(/\/+$/, '').replace(/\/m3u8$/i, '');
  }

  function fontesLivePlay(url) {
    var u = String(url || '').replace(/^\s+|\s+$/g, '').replace(/\/+$/, '');
    if (!u) return [];
    if (/\/play\//i.test(u) && !/m3u8|\.ts$|\/ts$/i.test(u)) {
      return juntarFontes([fonteXtream(u)], [fonteXtream(u + '/ts')]);
    }
    return [fonteXtream(u)];
  }

  function fonteXtream(url) {
    var u = String(url || '').toLowerCase();
    var q = 'Xtream';
    if (u.indexOf('/m3u8') !== -1 || /\.m3u8(\?|$)/.test(u)) q = 'HLS';
    else if (/\.ts(\?|$)/.test(u) || /\/ts(\/|$)/.test(u)) q = 'TS';
    else if (/\/play\//.test(u) && u.indexOf('/m3u8') === -1 && u.indexOf('/movie') === -1) q = 'HLS';
    return {
      url: url,
      quality: q,
      audio: 'DUB',
      origem: 'meu',
      origemNome: 'Xtream',
      referer: '',
      agent: ''
    };
  }

  function dataCurta(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    return (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm;
  }

  function avisarProgresso(pct, msg) {
    progressoPct = Math.max(0, Math.min(100, pct || 0));
    progressoMsg = msg || '';
    var i;
    for (i = 0; i < progressoOuvintes.length; i++) {
      try { progressoOuvintes[i](progressoPct, progressoMsg); } catch (e) {}
    }
  }

  function withIdb(cb) {
    if (idbConn) { cb(idbConn); return; }
    if (!window.indexedDB) { cb(null); return; }
    if (idbFila) { idbFila.push(cb); return; }
    idbFila = [cb];
    var req = indexedDB.open('saimo_xtream', 1);
    req.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains('pacote')) db.createObjectStore('pacote');
    };
    req.onsuccess = function (e) {
      idbConn = e.target.result;
      var fila = idbFila;
      idbFila = null;
      var i;
      for (i = 0; i < fila.length; i++) fila[i](idbConn);
    };
    req.onerror = function () {
      var fila = idbFila;
      idbFila = null;
      var i;
      for (i = 0; i < fila.length; i++) fila[i](null);
    };
  }

  function compactarCanais() {
    var out = [];
    var i;
    for (i = 0; i < (cache.canais || []).length; i++) {
      var c = cache.canais[i] || {};
      out.push({
        name: c.name,
        logo: c.logo || '',
        category: c.category || 'Xtream',
        xtreamId: c.xtreamId,
        ext: c.ext || '',
        epgChannelId: c.epgChannelId || '',
        playUrl: c.playUrl || ''
      });
    }
    return out;
  }

  function hidratarCanais(lista, perfil) {
    cache.canais = [];
    if (!lista || !lista.length) return;
    var p = perfil || perfilSalvo() || { host: cache.host, username: '', password: '' };
    if (cache.streamHost) p.streamHost = cache.streamHost;
    var i;
    for (i = 0; i < lista.length; i++) {
      var c = lista[i] || {};
      if (c.playUrl) {
        cache.canais.push({
          type: 'channel',
          name: c.name,
          logo: c.logo || '',
          category: c.category || 'Xtream',
          isLive: true,
          xtream: true,
          xtreamId: c.xtreamId,
          ext: c.ext || '',
          epgChannelId: c.epgChannelId || '',
          playUrl: c.playUrl,
          sources: fontesAoVivo(c.xtreamId, c.playUrl, p)
        });
        continue;
      }
      if (c.sources && c.sources.length && !c.xtreamId) {
        cache.canais.push(c);
        continue;
      }
      registrarCanal({
        name: c.name,
        stream_id: c.xtreamId || c.stream_id || c.id,
        stream_icon: c.logo,
        category_id: '_c',
        container_extension: c.ext || '',
        epg_channel_id: c.epgChannelId || ''
      }, { _c: c.category || 'Xtream' }, p);
    }
  }

  function aplicarPacote(raw) {
    if (!raw) return false;
    if (raw.filmes && typeof raw.filmes === 'object' && !Array.isArray(raw.filmes)) cache.filmes = compactarMapaVod(raw.filmes, 'movie');
    else cache.filmes = {};
    if (raw.series && typeof raw.series === 'object' && !Array.isArray(raw.series)) cache.series = compactarMapaVod(raw.series, 'series');
    else cache.series = {};
    cache.ts = raw.ts || 0;
    cache.host = raw.host || '';
    cache.user = raw.user || '';
    cache.streamHost = raw.streamHost || '';
    cache.padraoLive = raw.padraoLive || null;
    cache.m3uTs = raw.m3uTs || 0;
    cache.playPorId = raw.playPorId && typeof raw.playPorId === 'object' ? raw.playPorId : {};
    lastErro = raw.lastErro || '';
    lastOk = !!raw.lastOk || !!(contar(cache.filmes) + contar(cache.series) + (raw.canais || []).length);
    hidratarCanais(raw.canais || [], perfilSalvo());
    colecaoMemo = {};
    indiceLetra = { movie: null, series: null };
    return lastOk;
  }

  function cacheValido() {
    var p = perfilSalvo();
    if (!p) return false;
    if (!lastOk) return false;
    if (!contar(cache.filmes) && !contar(cache.series) && !(cache.canais || []).length) return false;
    if (cache.host && sanitizeHost(cache.host) !== p.host) return false;
    if (cache.user && cache.user !== p.username) return false;
    if (!cache.ts) return false;
    return (Date.now() - cache.ts) < SEMANA_MS;
  }

  function carregarCacheDisco() {
    try {
      var raw = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (raw && raw.filmes && typeof raw.filmes === 'object') aplicarPacote(raw);
    } catch (e) {}
  }

  function carregarCacheDiscoPromise(done) {
    if (discoPronto) { done(); return; }
    if (discoCarregando) { discoCarregando.push(done); return; }
    discoCarregando = [done];
    function terminar() {
      discoPronto = true;
      var fila = discoCarregando || [];
      discoCarregando = null;
      var i;
      for (i = 0; i < fila.length; i++) fila[i]();
    }
    withIdb(function (db) {
      if (!db) { terminar(); return; }
      try {
        var tx = db.transaction('pacote', 'readonly');
        var req = tx.objectStore('pacote').get('vod');
        req.onsuccess = function () {
          if (req.result) aplicarPacote(req.result);
          terminar();
        };
        req.onerror = function () { terminar(); };
      } catch (e) {
        terminar();
      }
    });
  }

  function gravarCacheDisco(done) {
    var p = perfilSalvo();
    var pacote = {
      filmes: compactarMapaVod(cache.filmes, 'movie'),
      series: compactarMapaVod(cache.series, 'series'),
      canais: compactarCanais(),
      ts: cache.ts,
      host: cache.host,
      streamHost: cache.streamHost || (p && p.streamHost) || '',
      padraoLive: cache.padraoLive || null,
      m3uTs: cache.m3uTs || 0,
      playPorId: cache.playPorId || {},
      user: (p && p.username) || cache.user || '',
      lastErro: lastErro,
      lastOk: lastOk
    };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        ts: cache.ts,
        host: cache.host,
        user: pacote.user,
        lastOk: lastOk,
        lastErro: lastErro,
        nf: contar(cache.filmes),
        ns: contar(cache.series),
        nc: (cache.canais || []).length
      }));
    } catch (e) {
      if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("armazenamento_erro", "xtream_cache: " + ((e && e.message) || ""));
    }
    withIdb(function (db) {
      if (!db) {
        if (done) done(false);
        return;
      }
      try {
        var tx = db.transaction('pacote', 'readwrite');
        tx.objectStore('pacote').put(pacote, 'vod');
        tx.oncomplete = function () { if (done) done(true); };
        tx.onerror = function () { if (done) done(false); };
      } catch (e) {
        if (done) done(false);
      }
    });
  }

  function contar(mapa) {
    var n = 0;
    var k;
    for (k in mapa || {}) {
      if (Object.prototype.hasOwnProperty.call(mapa, k)) n++;
    }
    return n;
  }

  function magroVod(it, tipo) {
    if (!it) return it;
    var o = {
      type: tipo || it.type,
      title: it.title || it.name || ''
    };
    o.name = o.title;
    if (it.letter) o.letter = it.letter;
    if (it.year) o.year = it.year;
    if (it.posterUrl) o.posterUrl = it.posterUrl;
    if (it.category) o.category = it.category;
    if (it.colecao) o.colecao = it.colecao;
    if (it.xtreamId) o.xtreamId = it.xtreamId;
    if (it.ext) o.ext = it.ext;
    if (it.playUrl) o.playUrl = it.playUrl;
    return o;
  }

  function compactarMapaVod(mapa, tipo) {
    var k;
    var amostra;
    for (k in mapa || {}) {
      if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
      amostra = mapa[k];
      break;
    }
    if (amostra && amostra.xtreamId && amostra.title && !amostra.sources) return mapa;
    var out = {};
    for (k in mapa || {}) {
      if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
      out[k] = magroVod(mapa[k], tipo);
    }
    return out;
  }

  function mensagemStatus() {
    if (!perfilSalvo()) return 'Xtream: falta servidor, usuário ou senha.';
    if (!ligado()) return 'Xtream: dados salvos, mas o interruptor está desligado.';
    if (lastErro) return 'Xtream não entrou: ' + lastErro;
    var nf = contar(cache.filmes);
    var ns = contar(cache.series);
    var nc = (cache.canais || []).length;
    if (lastOk && (nf || ns || nc)) {
      var texto = 'Xtream no aparelho: ' + nf + ' filmes · ' + ns + ' séries · ' + nc + ' canais.';
      if (cache.ts) {
        texto += ' Atualizado em ' + dataCurta(cache.ts) + '. Vale 7 dias (até ' + dataCurta(cache.ts + SEMANA_MS) + ').';
      }
      return texto;
    }
    if (lastOk) return 'Xtream entrou, mas o painel não mandou filmes nem séries.';
    return 'Xtream ligado, ainda sem catálogo neste aparelho. Use Atualizar Xtream agora.';
  }

  function classificarColecao(catNome) {
    var s = String(catNome || '').toLowerCase();
    if (/dorama|k-?drama|j-?drama|c-?drama|novel/.test(s)) return 'doramas';
    if (/anime/.test(s)) return 'animes';
    return '';
  }

  function asArray(data) {
    if (Array.isArray(data)) return data;
    if (!data || typeof data !== 'object') return [];
    if (Array.isArray(data.streams)) return data.streams;
    if (Array.isArray(data.data)) return data.data;
    var out = [];
    var k;
    for (k in data) {
      if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
      var row = data[k];
      if (row && typeof row === 'object' && (row.stream_id || row.series_id || row.name || row.title)) out.push(row);
    }
    return out;
  }

  function mapaCategorias(lista) {
    var m = {};
    var i;
    if (!Array.isArray(lista)) return m;
    for (i = 0; i < lista.length; i++) {
      var c = lista[i] || {};
      m[String(c.category_id)] = c.category_name || '';
    }
    return m;
  }

  function registrarFilme(row, catMap) {
    var name = String((row && (row.name || row.title)) || '').trim();
    var id = row && row.stream_id;
    if (!name || !id) return;
    var ext = String(row.container_extension || 'mp4').replace(/^\./, '');
    var cat = (catMap && catMap[String(row.category_id)]) || '';
    var k = chaveTitulo(name);
    if (!cache.filmes[k]) {
      cache.filmes[k] = magroVod({
        type: 'movie',
        title: name,
        letter: letraDe(name),
        year: String(row.year || '').slice(0, 4),
        posterUrl: row.stream_icon || '',
        category: cat,
        colecao: classificarColecao(cat + ' ' + name),
        xtreamId: id,
        ext: ext
      }, 'movie');
    }
  }

  function registrarSerie(row, catMap) {
    var name = String((row && (row.name || row.title)) || '').trim();
    var id = row && (row.series_id || row.id);
    if (!name || !id) return;
    var cat = (catMap && catMap[String(row.category_id)]) || '';
    var colecao = classificarColecao(cat + ' ' + name);
    var k = chaveTitulo(name);
    cache.series[k] = magroVod({
      type: 'series',
      title: name,
      letter: letraDe(name),
      year: String(row.year || '').slice(0, 4),
      posterUrl: row.cover || row.stream_icon || '',
      category: cat,
      colecao: colecao,
      xtreamId: id
    }, 'series');
  }

  function registrarCanal(row, catMap, perfil) {
    var name = String((row && (row.name || row.title)) || '').trim();
    var id = row && row.stream_id;
    if (!name || !id) return;
    var ext = String(row.container_extension || '').replace(/^\./, '').toLowerCase();
    var fontes = [];
    var visto = {};
    function add(url, quality) {
      if (!url || visto[url]) return;
      visto[url] = 1;
      var src = fonteXtream(url);
      src.quality = quality;
      fontes.push(src);
    }
    if (row.direct_source) add(String(row.direct_source), 'DIRECT');
    fontes = juntarFontes(fontes, fontesAoVivo(id, urlPlayDoId(id), perfil));
    cache.canais.push({
      type: 'channel',
      name: name,
      logo: row.stream_icon || '',
      category: (catMap && catMap[String(row.category_id)]) || 'Xtream',
      isLive: true,
      xtream: true,
      xtreamId: id,
      ext: ext,
      epgChannelId: row.epg_channel_id || '',
      sources: fontes
    });
  }

  function montarEpisodios(perfil, data) {
    var out = [];
    var epsMap = (data && data.episodes) || {};
    var temporada;
    for (temporada in epsMap) {
      if (!Object.prototype.hasOwnProperty.call(epsMap, temporada)) continue;
      var lista = epsMap[temporada] || [];
      var i;
      for (i = 0; i < lista.length; i++) {
        var ep = lista[i] || {};
        var id = ep.id || ep.episode_id;
        if (!id) continue;
        var ext = String(ep.container_extension || 'mp4').replace(/^\./, '');
        var num = String(ep.episode_num || (i + 1));
        var sea = String(ep.season || temporada);
        var playEp = urlPlayDoId(id);
        out.push({
          title: 'T' + sea + ' : E' + num,
          season: sea,
          episode: num,
          sources: [fonteXtream(playEp || SaimoXtream.gerarStreamUrl(perfilMidia(), id, ext, 'series'))]
        });
      }
    }
    return out;
  }

  function mesclarEpisodios(existentes, extras) {
    var out = (existentes || []).slice();
    var i;
    for (i = 0; i < (extras || []).length; i++) {
      var xe = extras[i];
      var hit = null;
      var j;
      for (j = 0; j < out.length; j++) {
        if (String(out[j].season) === String(xe.season) && String(out[j].episode) === String(xe.episode)) {
          hit = out[j];
          break;
        }
      }
      if (!hit) {
        out.push(xe);
        continue;
      }
      hit.sources = hit.sources || [];
      var s;
      for (s = 0; s < xe.sources.length; s++) {
        var url = xe.sources[s].url;
        var dup = false;
        var k;
        for (k = 0; k < hit.sources.length; k++) {
          if (hit.sources[k].url === url) dup = true;
        }
        if (!dup) hit.sources.unshift(xe.sources[s]);
      }
    }
    return out;
  }

  carregarCacheDisco();

  return {
    sanitizeHost: sanitizeHost,
    candidateUrls: candidateUrls,

    login: function (host, user, pass, callback) {
      var candidates = candidateUrls(host);
      var idx = 0;

      function tentarProximo() {
        if (idx >= candidates.length) {
          callback(new Error('Não foi possível conectar ao servidor Xtream'));
          return;
        }
        var candidateHost = candidates[idx++];
        var perfil = { host: candidateHost, username: user, password: pass };
        var url = apiUrl(perfil, '');

        xhrJSON(url, 12000, function (err, data) {
          if (err || !data) {
            tentarProximo();
            return;
          }
          var info = data.user_info;
          if (!info) {
            tentarProximo();
            return;
          }
          if (Number(info.auth) !== 1) {
            callback(new Error('Credenciais rejeitadas: verifique usuário e senha'));
            return;
          }
          var status = String(info.status || '').toLowerCase();
          if (status && status !== 'active') {
            callback(new Error('Conta inativa ou expirada (status: ' + info.status + ')'));
            return;
          }

          var ok = {
            host: candidateHost,
            username: user,
            password: pass,
            userInfo: info,
            serverInfo: data.server_info
          };
          ok.streamHost = hostStream(ok);
          if (window.SaimoDiagnostico) {
            SaimoDiagnostico.linha('xtream login ok · api ' + ok.host + ' · stream ' + (ok.streamHost || ok.host));
          }
          callback(null, ok);
        });
      }

      tentarProximo();
    },

    obterCategoriasAoVivo: function (perfil, callback) {
      xhrJSON(apiUrl(perfil, 'action=get_live_categories'), 15000, function (err, data) {
        callback(null, Array.isArray(data) ? data : []);
      });
    },

    obterCanaisAoVivo: function (perfil, catId, callback) {
      var p = 'action=get_live_streams';
      if (catId) p += '&category_id=' + encodeURIComponent(catId);
      xhrJSON(apiUrl(perfil, p), 20000, function (err, data) {
        callback(null, Array.isArray(data) ? data : []);
      });
    },

    obterCategoriasVod: function (perfil, callback) {
      xhrJSON(apiUrl(perfil, 'action=get_vod_categories'), 15000, function (err, data) {
        callback(null, Array.isArray(data) ? data : []);
      });
    },

    obterFilmes: function (perfil, catId, callback) {
      var p = 'action=get_vod_streams';
      if (catId) p += '&category_id=' + encodeURIComponent(catId);
      xhrJSON(apiUrl(perfil, p), 20000, function (err, data) {
        callback(null, Array.isArray(data) ? data : []);
      });
    },

    obterSeries: function (perfil, catId, callback) {
      var p = 'action=get_series';
      if (catId) p += '&category_id=' + encodeURIComponent(catId);
      xhrJSON(apiUrl(perfil, p), 20000, function (err, data) {
        callback(null, Array.isArray(data) ? data : []);
      });
    },

    obterInfoSerie: function (perfil, seriesId, callback) {
      var p = 'action=get_series_info&series_id=' + encodeURIComponent(seriesId);
      xhrJSON(apiUrl(perfil, p), 15000, callback);
    },

    obterCatchupArchive: function (perfil, streamId, callback) {
      var p = 'action=get_simple_data_table&stream_id=' + encodeURIComponent(streamId);
      xhrJSON(apiUrl(perfil, p), 15000, function (err, data) {
        if (err || !data) { callback(null, []); return; }
        var epgList = (data.epg_listings) || [];
        callback(null, epgList);
      });
    },

    gerarStreamUrl: function (perfil, streamId, ext, tipo) {
      var play = urlPlayDoId(streamId);
      var pu = String(play || '').toLowerCase();
      if (tipo === 'live' && play && (pu.indexOf('/play/') !== -1 || pu.indexOf('/live/') !== -1)) return play;
      if (tipo === 'movie' && play && ehVodM3u(play)) return play;
      if (tipo === 'series' && play && (pu.indexOf('/series') !== -1 || ehVodM3u(play))) return play;
      if (tipo === 'live') {
        var doPadrao = urlLiveDoPadrao(streamId, perfil);
        if (doPadrao) return doPadrao;
      }
      var base = hostApi(perfil) || sanitizeHost(
        hostStream(perfil) ||
        (perfil && perfil.host)
      );
      var u = String(perfil.username || '');
      var p = String(perfil.password || '');
      var formato = ext === '' ? '' : (ext ? ('.' + String(ext).replace(/^\./, '')) : (tipo === 'live' ? '.ts' : '.mp4'));
      if (tipo === 'live') {
        return base + '/live/' + u + '/' + p + '/' + streamId + formato;
      } else if (tipo === 'series') {
        return base + '/series/' + u + '/' + p + '/' + streamId + formato;
      }
      return base + '/movie/' + u + '/' + p + '/' + streamId + formato;
    },

    gerarTimeshiftUrl: function (perfil, streamId, startTimestamp, durationMinutes) {
      var base = sanitizeHost(perfil.host);
      var u = encodeURIComponent(perfil.username);
      var p = encodeURIComponent(perfil.password);
      return base + '/timeshift/' + u + '/' + p + '/' + durationMinutes + '/' + startTimestamp + '/' + streamId + '.ts';
    },

    ligado: ligado,
    perfilSalvo: perfilSalvo,
    mensagemStatus: mensagemStatus,

    resumo: function () {
      if (lastErro && !cacheValido()) return 'falhou: ' + lastErro;
      var nf = contar(cache.filmes);
      var ns = contar(cache.series);
      var nc = (cache.canais || []).length;
      if (!nf && !ns && !nc) return lastOk ? 'login ok, catálogo vazio' : 'ainda não baixou · use Atualizar agora';
      var t = nf + ' filmes · ' + ns + ' séries · ' + nc + ' canais';
      if (cache.ts) t += ' · no aparelho até ' + dataCurta(cache.ts + SEMANA_MS);
      return t;
    },

    reconstruirFontes: function () {
      var p = perfilAtivo || perfilSalvo();
      if (p && cache.streamHost) p.streamHost = cache.streamHost;
      hidratarCanais(compactarCanais(), p);
      perfilAtivo = p;
    },

    quandoCache: function (cb) {
      carregarCacheDiscoPromise(function () {
        if (typeof cb === 'function') cb();
      });
    },
    infoDe: function infoDe(vodId) {
      return new Promise(function (resolve) {
        if (!vodId) {
          resolve(null);
          return;
        }
        if (cache.infos && cache.infos[vodId]) {
          resolve(cache.infos[vodId]);
          return;
        }
        if (!perfilAtivo) {
          resolve(null);
          return;
        }
        xhrJSON(apiUrl(perfilAtivo, 'action=get_vod_info&vod_id=' + encodeURIComponent(vodId)), 15000, function (err, data) {
          var ficha = null;
          if (!err && data && data.info) {
            var info = data.info;
            var capa = info.movie_image || info.cover_big || "";
            var duracao = 0;
            if (info.duration) {
              if (String(info.duration).indexOf(":") !== -1) {
                var partesD = String(info.duration).split(":");
                duracao = (parseInt(partesD[0], 10) || 0) * 60 + (parseInt(partesD[1], 10) || 0);
              } else duracao = parseInt(info.duration, 10) || 0;
            }
            ficha = {
              sinopse: info.plot || info.description || "",
              ano: String(info.releasedate || info.year || "").slice(0, 4),
              nota: parseFloat(info.rating) || 0,
              generos: String(info.genre || "").split(/[,/]/).map(function (g) { return g.trim(); }).filter(Boolean),
              capa: capa,
              fundo: info.backdrop_path && info.backdrop_path.length ? info.backdrop_path[0] : capa,
              elenco: String(info.cast || "").split(/,\s*/).filter(Boolean),
              frase: "",
              duracao: duracao,
              classificacao: "",
              assinatura: String(info.director || ""),
              produtora: String(info.production_company || "")
            };
            if (!cache.infos) cache.infos = {};
            cache.infos[vodId] = ficha;
          }
          resolve(ficha);
        });
      });
    },
    cacheValido: cacheValido,
    ultimaSync: function () { return cache.ts || 0; },
    baixando: function () { return syncEmCurso; },
    onProgress: function (fn) {
      if (typeof fn === 'function') progressoOuvintes.push(fn);
    },
    progresso: function () { return { pct: progressoPct, msg: progressoMsg }; },

    fontesFilme: function (title) {
      if (!ligado()) return [];
      var perfil = perfilMidia();
      var it = cache.filmes[chaveTitulo(title)];
      if (!it) return [];
      var play = it.playUrl || urlPlayDoId(it.xtreamId);
      if (play) return [fonteXtream(play)];
      if (it.sources && it.sources.length) return it.sources.slice();
      if (!perfil || !it.xtreamId) return [];
      var ext = String(it.ext || 'mp4').replace(/^\./, '');
      var url = this.gerarStreamUrl(perfil, it.xtreamId, ext, 'movie');
      return url ? [fonteXtream(url)] : [];
    },

    mapaFilmes: function () { return cache.filmes || {}; },
    mapaSeries: function () { return cache.series || {}; },
    canaisAoVivo: function () { return ligado() ? (cache.canais || []) : []; },
    colecao: function (tipo) {
      if (!ligado()) return [];
      if (colecaoMemo[tipo]) return colecaoMemo[tipo];
      var out = [];
      var mapas = [cache.filmes, cache.series];
      var m, k;
      for (m = 0; m < mapas.length; m++) {
        for (k in mapas[m]) {
          if (!Object.prototype.hasOwnProperty.call(mapas[m], k)) continue;
          if (mapas[m][k].colecao === tipo) out.push(mapas[m][k]);
        }
      }
      colecaoMemo[tipo] = out;
      return out;
    },

    fileirasHome: function () {
      if (!ligado()) return [];
      function pegar(mapa, tipo, n, filtro) {
        var comCapa = [];
        var semCapa = [];
        var k, it, card;
        for (k in mapa) {
          if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
          it = mapa[k];
          if (filtro && it.colecao !== filtro) continue;
          card = {
            type: tipo,
            title: it.title,
            name: it.title,
            year: it.year || '',
            posterUrl: it.posterUrl || '',
            letter: it.letter,
            colecao: it.colecao || ''
          };
          if (card.posterUrl) comCapa.push(card);
          else semCapa.push(card);
          if (comCapa.length >= n) break;
        }
        return comCapa.concat(semCapa).slice(0, n);
      }
      var filmes = pegar(cache.filmes, 'movie', 20);
      if (!filmes.length) return [];
      return [{ title: 'Em alta', marca: 'f', items: filmes }];
    },

    itensLetra: function (tipo, letra) {
      if (!ligado()) return [];
      var chave = tipo === 'series' ? 'series' : 'movie';
      var L = letra === '#' ? '#' : String(letra || '#').toUpperCase();
      if (!indiceLetra[chave]) {
        var mapa = chave === 'series' ? cache.series : cache.filmes;
        var idx = {};
        var k;
        var letItem;
        for (k in mapa) {
          if (!Object.prototype.hasOwnProperty.call(mapa, k)) continue;
          letItem = mapa[k].letter || '#';
          if (!idx[letItem]) idx[letItem] = [];
          idx[letItem].push(mapa[k]);
        }
        indiceLetra[chave] = idx;
      }
      return (indiceLetra[chave][L] || []).slice();
    },

    sincronizar: function (callback, forcar) {
      var cb = callback || function () {};
      var self = this;
      var perfil = perfilSalvo();
      if (!ligado() || !perfil) {
        lastOk = false;
        lastErro = 'Xtream desligado ou incompleto';
        cb(new Error(lastErro));
        return;
      }
      if (!forcar && cacheValido()) {
        perfilAtivo = perfilAtivo || perfil;
        cb(null, cache);
        return;
      }
      if (syncEmCurso) {
        syncEsperando.push(cb);
        return;
      }
      syncEmCurso = true;
      var partes = { login: 0, live: 0, vod: 0 };
      function pintarBarra(msg) {
        var pct = 4 + partes.login * 8 + partes.live * 38 + partes.vod * 48;
        avisarProgresso(pct, msg || progressoMsg);
      }
      function terminar(err) {
        syncEmCurso = false;
        if (!err) avisarProgresso(100, 'Pronto. Catálogo salvo neste aparelho por 7 dias.');
        var fila = [cb].concat(syncEsperando);
        syncEsperando = [];
        var i;
        for (i = 0; i < fila.length; i++) fila[i](err, cache);
      }
      avisarProgresso(2, 'Entrando no painel Xtream…');
      self.login(perfil.host, perfil.username, perfil.password, function (err, ok) {
        if (err || !ok) {
          lastOk = false;
          lastErro = (err && err.message) || 'Falha no login Xtream';
          avisarProgresso(100, 'Xtream não entrou: ' + lastErro);
          gravarCacheDisco(function () {
            terminar(err || new Error(lastErro));
          });
          return;
        }
        perfilAtivo = ok;
        cache.streamHost = ok.streamHost || hostStream(ok);
        partes.login = 1;
        pintarBarra('Login ok. Descobrindo o endereço real dos canais…');
        aprenderPadraoLive(ok, function () {
        pintarBarra('Login ok. Baixando canais, filmes e séries…');
        var falta = 2;
        function partePronta() {
          falta -= 1;
          if (falta > 0) return;
          var nf = contar(cache.filmes);
          var ns = contar(cache.series);
          var nc = (cache.canais || []).length;
          if (!nf && !ns && !nc) {
            lastOk = false;
            lastErro = 'Login ok, mas o catálogo não veio';
            avisarProgresso(100, lastErro);
            gravarCacheDisco(function () {
              terminar(new Error(lastErro));
            });
            return;
          }
          lastOk = true;
          lastErro = '';
          avisarProgresso(90, 'Lendo a lista M3U real do painel…');
          baixarM3u(ok, function () {
            cache.m3uTs = Date.now();
            avisarProgresso(96, 'Guardando no aparelho…');
            gravarCacheDisco(function () {
              terminar(null);
            });
          });
        }
        xhrJSON(apiUrl(ok, 'action=get_live_categories'), 20000, function (eCl, liveCats) {
          pintarBarra('Baixando canais ao vivo…');
        xhrJSON(apiUrl(ok, 'action=get_live_streams'), 90000, function (eL, lives) {
          var mapL = mapaCategorias(asArray(liveCats));
          var listaL = asArray(lives);
          cache.canais = [];
          var i;
          for (i = 0; i < listaL.length; i++) registrarCanal(listaL[i], mapL, ok);
          partes.live = 1;
          pintarBarra('Canais ok. Esperando filmes e séries…');
          partePronta();
        }, false, function (frac, mb, total) {
          partes.live = Math.max(partes.live, frac >= 0 ? 0.15 + frac * 0.8 : 0.15);
          pintarBarra('Baixando canais ao vivo… ' + fmtMbBaixado(mb, total));
        });
        });
        xhrJSON(apiUrl(ok, 'action=get_vod_categories'), 20000, function (eCv, vodCats) {
          xhrJSON(apiUrl(ok, 'action=get_series_categories'), 20000, function (eCs, serCats) {
            var mapV = mapaCategorias(asArray(vodCats));
            var mapS = mapaCategorias(asArray(serCats));
            pintarBarra('Baixando filmes…');
            xhrJSON(apiUrl(ok, 'action=get_vod_streams'), 90000, function (errF, filmes) {
              pintarBarra('Baixando séries…');
              xhrJSON(apiUrl(ok, 'action=get_series'), 90000, function (errS, series) {
                var listaF = asArray(filmes);
                var listaS = asArray(series);
                var canaisKeep = cache.canais || [];
                cache.filmes = {};
                cache.series = {};
                cache.canais = canaisKeep;
                colecaoMemo = {};
                indiceLetra = { movie: null, series: null };
                cache.ts = Date.now();
                cache.host = ok.host;
                cache.streamHost = ok.streamHost || hostStream(ok);
                cache.user = ok.username;
                var i;
                for (i = 0; i < listaF.length; i++) registrarFilme(listaF[i], mapV);
                for (i = 0; i < listaS.length; i++) registrarSerie(listaS[i], mapS);
                partes.vod = 1;
                pintarBarra('Filmes e séries ok.');
                partePronta();
              }, false, function (frac, mb, total) {
                partes.vod = Math.max(partes.vod, frac >= 0 ? 0.55 + frac * 0.4 : 0.55);
                pintarBarra('Baixando séries… ' + fmtMbBaixado(mb, total));
              });
            }, false, function (frac, mb, total) {
              partes.vod = Math.max(partes.vod, frac >= 0 ? 0.1 + frac * 0.4 : 0.1);
              pintarBarra('Baixando filmes… ' + fmtMbBaixado(mb, total));
            });
          });
        });
        });
      });
    },

    baixarCanaisAoVivo: function (callback) {
      var cb = callback || function () {};
      var self = this;
      var perfil = perfilSalvo();
      if (!ligado() || !perfil) {
        cb(new Error('Xtream desligado'));
        return;
      }
      avisarProgresso(6, 'Baixando canais ao vivo do Xtream…');
      self.login(perfil.host, perfil.username, perfil.password, function (err, ok) {
        if (err || !ok) {
          cb(err || new Error('Falha no login Xtream'));
          return;
        }
        perfilAtivo = ok;
        cache.streamHost = ok.streamHost || hostStream(ok);
        aprenderPadraoLive(ok, function () {
        xhrJSON(apiUrl(ok, 'action=get_live_categories'), 20000, function (eCl, liveCats) {
          xhrJSON(apiUrl(ok, 'action=get_live_streams'), 90000, function (eL, lives) {
            var mapL = mapaCategorias(asArray(liveCats));
            var listaL = asArray(lives);
            cache.canais = [];
            var i;
            for (i = 0; i < listaL.length; i++) registrarCanal(listaL[i], mapL, ok);
            cache.host = ok.host;
            cache.streamHost = ok.streamHost || hostStream(ok);
            cache.user = ok.username;
            if (!cache.ts) cache.ts = Date.now();
            lastOk = !!(contar(cache.filmes) + contar(cache.series) + cache.canais.length);
            gravarCacheDisco(function () {
              avisarProgresso(100, cache.canais.length + ' canais do Xtream no aparelho.');
              cb(null);
            });
          });
        });
        });
      });
    },

    sincronizarPromise: function (forcar) {
      var self = this;
      return new Promise(function (resolve) {
        if (!ligado()) {
          resolve(false);
          return;
        }
        carregarCacheDiscoPromise(function () {
          if (!forcar && cacheValido()) {
            perfilAtivo = perfilAtivo || perfilSalvo();
            self.reconstruirFontes();
            resolve(true);
            var p = perfilAtivo || perfilSalvo();
            var m3uNovo = !cache.m3uTs || (Date.now() - cache.m3uTs) >= SEMANA_MS;
            if (p && !m3uSessao && faltaPlayUrl() && m3uNovo) {
              m3uSessao = true;
              self.login(p.host, p.username, p.password, function (err, ok) {
                if (err || !ok) return;
                perfilAtivo = ok;
                cache.streamHost = ok.streamHost || hostStream(ok);
                baixarM3u(ok, function (n) {
                  if (!n) return;
                  cache.m3uTs = Date.now();
                  gravarCacheDisco(function () {
                    self.reconstruirFontes();
                  });
                }, true);
              });
            }
            return;
          }
          self.sincronizar(function (err) {
            resolve(!err);
          }, true);
        });
      });
    },

    juntarEpisodiosPromise: function (item) {
      var self = this;
      return new Promise(function (resolve) {
        if (!ligado() || !item) {
          resolve(item);
          return;
        }
        var perfil = perfilAtivo || perfilSalvo();
        var meta = cache.series[chaveTitulo(item.title || item.name)];
        if (!perfil || !meta) {
          resolve(item);
          return;
        }
        self.obterInfoSerie(perfil, meta.xtreamId, function (err, data) {
          if (!err && data) {
            item.episodes = mesclarEpisodios(item.episodes || [], montarEpisodios(perfil, data));
            if (!item.posterUrl && meta.posterUrl) item.posterUrl = meta.posterUrl;
          }
          resolve(item);
        });
      });
    }
  };
})();

if (typeof window !== 'undefined') {
  window.SaimoXtream = SaimoXtream;
}
