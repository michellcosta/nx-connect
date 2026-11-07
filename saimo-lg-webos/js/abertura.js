/**
 * Vídeo de entrada da TV Box (paisagem, sem som).
 *
 * A LG só decodifica um vídeo por vez. O <video> do player, mesmo vazio,
 * segura esse decodificador: a abertura pintava o primeiro quadro e parava.
 * O player sai da tela até o vídeo acabar. O app só inicia depois.
 * Qualquer tecla pula. Se não andar em 8 s, a home abre.
 */
(function () {
  var FADE = 250;
  var TETO = 8000;

  var caixa = document.getElementById("abertura-app");
  var video = document.getElementById("abertura-video");
  var fila = [];
  var acabou = false;

  function avisar() {
    if (acabou) return;
    acabou = true;
    var lista = fila;
    fila = [];
    for (var i = 0; i < lista.length; i++) {
      try { lista[i](); } catch (e) {
        if (window.SaimoDiagnostico) SaimoDiagnostico.logEvento("abertura_callback_erro", (e && e.message) || "");
      }
    }
  }

  window.SaimoAbertura = {
    quandoTerminar: function (fn) {
      if (acabou) fn();
      else fila.push(fn);
    }
  };

  var jaIniciou = false;
  try {
    jaIniciou = sessionStorage.getItem('saimo_abertura_vista') === '1' ||
                localStorage.getItem('saimo_pular_abertura') === '1';
  } catch (e) {}

  if (jaIniciou || !caixa || !video) {
    if (caixa && caixa.parentNode) caixa.parentNode.removeChild(caixa);
    avisar();
    return;
  }
  try { sessionStorage.setItem('saimo_abertura_vista', '1'); } catch (e) {}

  var playerVideo = document.getElementById("video-element");
  var playerSlot = playerVideo ? playerVideo.parentNode : null;
  var playerAntes = playerVideo ? playerVideo.nextSibling : null;
  if (playerVideo && playerSlot) playerSlot.removeChild(playerVideo);

  var saindo = false;
  var encerrando = false;
  var tentativas = 0;
  var comecou = false;

  function devolverPlayer() {
    if (!playerVideo || !playerSlot || playerVideo.parentNode) return;
    if (playerAntes && playerAntes.parentNode === playerSlot) playerSlot.insertBefore(playerVideo, playerAntes);
    else playerSlot.appendChild(playerVideo);
  }

  function remover() {
    encerrando = true;
    try { video.pause(); } catch (e) {}
    try {
      video.removeAttribute("src");
      video.load();
    } catch (e) {}
    if (caixa.parentNode) caixa.parentNode.removeChild(caixa);
    devolverPlayer();
    avisar();
  }

  function sair(suave) {
    if (saindo) return;
    saindo = true;
    clearTimeout(teto);
    if (!suave) { remover(); return; }
    caixa.classList.add("saindo");
    setTimeout(remover, FADE);
  }

  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("abertura-app")) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    sair(true);
  }, true);

  caixa.addEventListener("click", function () { sair(true); });

  function tocar() {
    if (saindo || encerrando) return;
    var pedido;
    try { pedido = video.play(); } catch (e) { pedido = null; }
    if (pedido && typeof pedido.catch === "function") {
      pedido.catch(function () {
        if (saindo || encerrando) return;
        if (tentativas < 10) {
          tentativas += 1;
          setTimeout(tocar, 300);
        }
      });
    }
  }

  video.muted = true;
  video.setAttribute("muted", "muted");
  try {
    video.setAttribute("mediaOption", JSON.stringify({
      mediaTransportType: "URI",
      option: { transmission: { playTime: { start: 0 } } }
    }));
  } catch (e) {}

  video.addEventListener("ended", function () { sair(true); });
  video.addEventListener("error", function () { if (!encerrando) sair(false); });
  video.addEventListener("loadeddata", tocar);
  video.addEventListener("canplay", function () { if (video.paused) tocar(); });

  var teto = setTimeout(function () {
    if (!saindo && video.currentTime > 0.2 && !video.ended) {
      setTimeout(function () { sair(true); }, 7000);
      return;
    }
    sair(false);
  }, TETO);

  function comecar() {
    if (comecou) return;
    comecou = true;
    video.src = "abertura.mp4";
    try { video.load(); } catch (e) {}
    tocar();
  }

  setTimeout(comecar, 0);
})();
