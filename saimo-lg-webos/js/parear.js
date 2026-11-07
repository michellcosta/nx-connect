/**
 * Pareamento TV ↔ celular (QR). O código não leva senha.
 * QR e API: nx-conexao.pages.dev
 */
var SaimoParear = (function () {
  'use strict';

  var NUVEM = 'https://nx-conexao.pages.dev';
  var PAGINA = 'https://nx-conexao.pages.dev/ligar';
  var pollTimer = 0;
  var codigoAtivo = '';

  function baseApi() {
    return NUVEM;
  }

  function jsonReq(method, path, body, cb) {
    var x = new XMLHttpRequest();
    x.open(method, baseApi() + path, true);
    x.timeout = 15000;
    x.setRequestHeader('Accept', 'application/json');
    if (body) x.setRequestHeader('Content-Type', 'application/json');
    x.onload = function () {
      var j = {};
      try { j = JSON.parse(x.responseText || '{}'); } catch (e) {}
      if (x.status >= 200 && x.status < 300) cb(null, j);
      else cb(new Error(j.error || ('HTTP ' + x.status)), j);
    };
    x.onerror = function () { cb(new Error('Sem conexão com o pareamento')); };
    x.ontimeout = function () { cb(new Error('Tempo esgotado')); };
    x.send(body ? JSON.stringify(body) : null);
  }

  function qrSrc(url) {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=480x480&ecc=M&margin=8&data=' + encodeURIComponent(url);
  }

  function parar() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = 0;
    }
    codigoAtivo = '';
  }

  function aplicar(pacote, onOk, onErr) {
    if (!pacote || !pacote.tipo) {
      onErr(new Error('Resposta vazia'));
      return;
    }
    if (pacote.tipo === 'xtream') {
      if (!window.SaimoAjustes) {
        onErr(new Error('Ajustes indisponíveis'));
        return;
      }
      SaimoAjustes.gravar({
        xtreamHost: String(pacote.host || '').trim(),
        xtreamUser: String(pacote.user || '').trim(),
        xtreamPass: String(pacote.pass || ''),
        catalogoXtream: true,
        xtreamOff: false
      });
      onOk('xtream', 'Xtream chegou. Baixando o painel…');
      return;
    }
    if (pacote.tipo === 'm3u_url' && window.SaimoListas && SaimoListas.adicionar) {
      SaimoListas.adicionar(pacote.url).then(function (res) {
        if (res && res.ok) onOk('m3u', 'Lista M3U adicionada neste aparelho.');
        else onErr(new Error((res && res.erro) || 'Não deu para ler a lista'));
      }).catch(function (e) {
        onErr(e || new Error('Falha na lista'));
      });
      return;
    }
    if (pacote.tipo === 'm3u_txt' && window.SaimoListas && SaimoListas.adicionarDeTexto) {
      SaimoListas.adicionarDeTexto(pacote.texto, { rotulo: pacote.nome || 'Celular' }).then(function (res) {
        if (res && res.ok) onOk('m3u', 'Arquivo M3U importado neste aparelho.');
        else onErr(new Error((res && res.erro) || 'Não deu para importar'));
      }).catch(function (e) {
        onErr(e || new Error('Falha no arquivo'));
      });
      return;
    }
    onErr(new Error('Tipo não suportado'));
  }

  return {
    parar: parar,
    iniciar: function (ui) {
      parar();
      jsonReq('POST', '/v1/parear/criar', {}, function (err, criou) {
        if (err || !criou || !criou.code) {
          if (ui && ui.status) ui.status('Não criou o código. Confira a internet e tente de novo (OK).');
          return;
        }
        codigoAtivo = criou.code;
        var url = PAGINA + '?c=' + encodeURIComponent(codigoAtivo);
        if (ui && ui.codigo) ui.codigo(codigoAtivo);
        if (ui && ui.url) ui.url(url);
        if (ui && ui.qr) ui.qr(qrSrc(url));
        if (ui && ui.status) ui.status('Aguardando o celular…');
        pollTimer = setInterval(function () {
          if (!codigoAtivo) return;
          jsonReq('GET', '/v1/parear/' + encodeURIComponent(codigoAtivo), null, function (e2, pac) {
            if (e2 || !pac) return;
            if (pac.pending) return;
            parar();
            aplicar(pac, function (tipo, msg) {
              if (ui && ui.ok) ui.ok(tipo, msg);
            }, function (er) {
              if (ui && ui.status) ui.status(er.message || 'Não aplicou o que veio do celular');
            });
          });
        }, 2000);
      });
    }
  };
})();

if (typeof window !== 'undefined') window.SaimoParear = SaimoParear;
