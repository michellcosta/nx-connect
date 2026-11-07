/**
 * SaimoCatchup — Reprodução de Programação Passada (Timeshift / Gravação).
 *
 * Funciona com servidores Xtream Codes que possuem arquivo habilitado (tv_archive=1).
 * Não é ofertado para listas M3U comuns (que não possuem suporte a gravação do servidor).
 * Compatível com ES5 / webOS 3.x+.
 */
var SaimoCatchup = (function () {
  'use strict';

  function temCatchup(canal) {
    if (!canal) return false;
    // Verifica flag do canal no Xtream
    if (canal.tv_archive === 1 || canal.tv_archive === '1') return true;
    if (canal.archive === 1 || canal.archive === '1') return true;
    return false;
  }

  function formatarData(timestampSec) {
    var d = new Date(timestampSec * 1000);
    var dia = String(d.getDate()).padStart(2, '0');
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var hora = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return dia + '/' + mes + ' ' + hora + ':' + min;
  }

  return {
    temCatchup: temCatchup,

    carregarArquivo: function (perfil, canal, callback) {
      if (!temCatchup(canal)) {
        callback(null, []);
        return;
      }
      var streamId = canal.stream_id || canal.id;
      if (!streamId || !window.SaimoXtream) {
        callback(null, []);
        return;
      }

      SaimoXtream.obterCatchupArchive(perfil, streamId, function (err, listings) {
        if (err || !listings) {
          callback(null, []);
          return;
        }

        var resultado = [];
        for (var i = 0; i < listings.length; i++) {
          var p = listings[i];
          var startSec = parseInt(p.start_timestamp, 10) || 0;
          var stopSec = parseInt(p.stop_timestamp, 10) || 0;
          var durMin = Math.round((stopSec - startSec) / 60) || 30;

          resultado.push({
            id: p.id,
            title: p.title || 'Sem título',
            description: p.description || '',
            start: startSec,
            stop: stopSec,
            durationMinutes: durMin,
            rotuloHora: formatarData(startSec),
            streamUrl: SaimoXtream.gerarTimeshiftUrl(perfil, streamId, startSec, durMin)
          });
        }

        callback(null, resultado);
      });
    }
  };
})();

if (typeof window !== 'undefined') {
  window.SaimoCatchup = SaimoCatchup;
}
