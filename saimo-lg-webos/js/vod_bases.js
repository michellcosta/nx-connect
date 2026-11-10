/* Fontes VOD vivem na nuvem (nx-conexao.pages.dev/v1/bases), semeadas com
   segredo via env — sem credenciais no IPK nem no git (item da auditoria).
   Troca/revogação de fonte: POST /v1/bases/definir, sem gerar IPK novo.
   O bloco abaixo busca e sobrepõe; sem nuvem, o app segue com as listas
   do usuário (Xtream pareado / M3U). Backup do antigo: melhorias/vod_bases-embutido-backup.json */
window.SAIMO_VOD_BASES = {};
/* Bases remotas (nx-conexao.pages.dev): quando chegam, sobrepõem o pacote
   embutido — dá para trocar/revogar fonte sem gerar IPK novo. Os consumidores
   (catalogo.js, api.js) leem o global a cada uso, então a troca vale na hora. */
(function () {
  try {
    var x = new XMLHttpRequest();
    x.open("GET", "https://nx-conexao.pages.dev/v1/bases", true);
    x.timeout = 15000;
    x.onload = function () {
      try {
        var j = JSON.parse(x.responseText || "{}");
        var b = j && j.bases;
        if (!b || typeof b !== "object") return;
        var n = 0;
        var k;
        for (k in b) {
          if (b[k]) n++;
        }
        if (!n) return;
        window.SAIMO_VOD_BASES = b;
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("bases", "remotas: " + n + " fontes (sobrepõem o pacote)");
      } catch (eB) {}
    };
    x.send();
  } catch (eR) {}
})();
