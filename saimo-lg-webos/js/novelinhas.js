/**
 * Novelinhas — minisséries verticais (novelinhas.txt no CDN).
 * Grade de capas em pé e player em tela cheia: seta troca o episódio.
 */
var SaimoNovelinhas = (function () {
  var PROG_KEY = "saimo_novelinha_visto";
  var COLS = 6;
  var raiz = null;
  var gradeEl = null;
  var playerEl = null;
  var videoEl = null;
  var preloadEl = null;
  var audioEls = [];
  var temaEls = [];
  var aberto = false;
  var noPlayer = false;
  var zona = "grade";
  var audioIdx = 0;
  var temaIdx = 0;
  var foco = 0;
  var series = [];
  var visiveis = [];
  var temas = ["Todos"];
  var audios = ["todos", "dub", "leg"];
  var baseUrl = "https://pub-3bce2defc5bb48328c9c6f4b234fa0fb.r2.dev/novelinhas/";
  var carga = null;
  var atual = null;
  var ep = 1;

  function pad3(n) {
    n = String(n);
    while (n.length < 3) n = "0" + n;
    return n;
  }

  function lerProg() {
    try {
      var raw = JSON.parse(localStorage.getItem(PROG_KEY) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (e) {
      return {};
    }
  }

  function gravarProg() {
    if (!atual) return;
    var d = lerProg();
    d[atual.id] = ep;
    try {
      localStorage.setItem(PROG_KEY, JSON.stringify(d));
    } catch (e2) {}
  }

  function xhr(url) {
    return new Promise(function (resolve) {
      try {
        var x = new XMLHttpRequest();
        x.open("GET", url, true);
        x.onload = function () {
          resolve(x.status >= 200 && x.status < 300 ? x.responseText : "");
        };
        x.onerror = function () { resolve(""); };
        x.send();
      } catch (e) {
        resolve("");
      }
    });
  }

  function parse(texto) {
    var linhas = String(texto || "").split("\n");
    var base = baseUrl;
    var out = [];
    var i;
    for (i = 0; i < linhas.length; i++) {
      var linha = linhas[i].replace(/\r$/, "");
      if (!linha) continue;
      if (linha.indexOf("base:") === 0) {
        base = linha.slice(5).replace(/^\s+|\s+$/g, "");
        if (base && base.charAt(base.length - 1) !== "/") base += "/";
        continue;
      }
      if (linha.charAt(0) === "#") continue;
      var c = linha.split("\t");
      if (c.length < 6) continue;
      var n = parseInt(c[3], 10) || 0;
      if (!n || !c[1]) continue;
      var gens = [];
      String(c[6] || "").split(",").forEach(function (g) {
        g = String(g || "").replace(/^\s+|\s+$/g, "");
        if (g) gens.push(g);
      });
      out.push({
        id: String(c[0] || "").replace(/^\s+|\s+$/g, ""),
        titulo: String(c[1] || "").replace(/^\s+|\s+$/g, ""),
        pasta: String(c[2] || "").replace(/^\s+|\s+$/g, ""),
        eps: n,
        audio: String(c[4] || "dub").replace(/^\s+|\s+$/g, "").toLowerCase(),
        capa: String(c[5] || "").replace(/^\s+|\s+$/g, ""),
        generos: gens,
        sinopse: c[7] || ""
      });
    }
    return { base: base || baseUrl, series: out };
  }

  function carregar() {
    if (carga) return carga;
    carga = xhr("vod/novelinhas.txt").then(function (txt) {
      if (txt && txt.indexOf("\t") !== -1) return txt;
      return xhr("https://filmes-saimo.pages.dev/novelinhas.txt");
    }).then(function (txt) {
      var parsed = parse(txt);
      baseUrl = parsed.base;
      series = parsed.series;
      var visto = Object.create(null);
      temas = ["Todos"];
      var i, j;
      for (i = 0; i < series.length; i++) {
        var gs = series[i].generos || [];
        for (j = 0; j < gs.length; j++) {
          if (!visto[gs[j]]) {
            visto[gs[j]] = 1;
            temas.push(gs[j]);
          }
        }
      }
      temas.sort(function (a, b) {
        if (a === "Todos") return -1;
        if (b === "Todos") return 1;
        return a.localeCompare(b, "pt-BR");
      });
      return series;
    });
    return carga;
  }

  function urlEp(s, n) {
    return baseUrl + s.pasta + "/episode-" + pad3(n) + ".mp4";
  }

  function filtrar() {
    var audio = audios[audioIdx] || "todos";
    var tema = temas[temaIdx] || "Todos";
    var prog = lerProg();
    visiveis = series.filter(function (s) {
      if (audio !== "todos" && s.audio !== audio) return false;
      if (tema !== "Todos") {
        var ok = false;
        var i;
        for (i = 0; i < s.generos.length; i++) if (s.generos[i] === tema) ok = true;
        if (!ok) return false;
      }
      return true;
    });
    visiveis.sort(function (a, b) {
      var pa = prog[a.id] ? 1 : 0;
      var pb = prog[b.id] ? 1 : 0;
      if (pa !== pb) return pb - pa;
      return a.titulo.localeCompare(b.titulo, "pt-BR");
    });
    if (foco >= visiveis.length) foco = visiveis.length ? visiveis.length - 1 : 0;
  }

  function limparFoco() {
    var marcados = raiz.querySelectorAll(".nn-focado");
    var i;
    for (i = 0; i < marcados.length; i++) marcados[i].classList.remove("nn-focado");
  }

  function pintarTemas() {
    var faixa = raiz.querySelector(".nn-temas");
    faixa.innerHTML = "";
    temaEls = [];
    var i;
    for (i = 0; i < temas.length; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "nn-chip";
      b.textContent = temas[i];
      b.onclick = (function (idx) {
        return function () {
          temaIdx = idx;
          zona = "grade";
          foco = 0;
          pintarGrade();
          focar();
        };
      })(i);
      faixa.appendChild(b);
      temaEls.push(b);
    }
  }

  function pintarGrade() {
    filtrar();
    gradeEl.innerHTML = "";
    if (!visiveis.length) {
      var vazio = document.createElement("div");
      vazio.className = "nn-vazio";
      vazio.textContent = series.length ? "Nada nesse filtro." : "Carregando novelinhas…";
      gradeEl.appendChild(vazio);
      return;
    }
    var prog = lerProg();
    var i;
    for (i = 0; i < visiveis.length; i++) {
      var s = visiveis[i];
      var card = document.createElement("button");
      card.type = "button";
      card.className = "nn-card";
      card.setAttribute("data-i", String(i));
      card.onclick = (function (idx) {
        return function () {
          foco = idx;
          zona = "grade";
          var s = visiveis[idx];
          if (s) abrirPlayer(s);
        };
      })(i);
      var img = document.createElement("img");
      img.alt = "";
      card.appendChild(img);
      if (prog[s.id]) {
        var badge = document.createElement("span");
        badge.className = "nn-ep";
        badge.textContent = "Ep " + prog[s.id];
        card.appendChild(badge);
      }
      gradeEl.appendChild(card);
    }
    revelarCapas();
  }

  function revelarCapas() {
    var i0 = Math.max(0, foco - COLS);
    var i1 = Math.min(visiveis.length, foco + COLS * 3);
    var i;
    for (i = i0; i < i1; i++) {
      var card = gradeEl.querySelector('[data-i="' + i + '"] img');
      if (card && !card.getAttribute("src") && visiveis[i].capa) card.src = visiveis[i].capa;
    }
  }

  function focar() {
    if (!raiz) return;
    limparFoco();
    var el = null;
    if (zona === "voltar") el = raiz.querySelector(".nn-voltar");
    else if (zona === "audio") el = audioEls[audioIdx];
    else if (zona === "tema") el = temaEls[temaIdx];
    else el = gradeEl.querySelector('[data-i="' + foco + '"]');
    if (el) {
      el.classList.add("nn-focado");
      try {
        el.scrollIntoView({ block: "nearest", inline: "nearest" });
      } catch (e) {}
    }
    revelarCapas();
  }

  function rotuloAudio(a) {
    if (a === "dub") return "Dublado";
    if (a === "leg") return "Legendado";
    return "Todos";
  }

  function pintarAudios() {
    var i;
    for (i = 0; i < audioEls.length; i++) audioEls[i].textContent = rotuloAudio(audios[i]);
  }

  function montar() {
    if (raiz) return;
    raiz = document.createElement("div");
    raiz.className = "novelinhas hidden";
    raiz.innerHTML = '<div class="nn-topo"><button type="button" class="back-pill nn-voltar">◄ Voltar</button><div class="nn-titulo">Novelinhas</div></div><div class="nn-audios"></div><div class="nn-temas"></div><div class="nn-grade"></div><div class="nn-player hidden"><video></video><div class="nn-osd"><div class="nn-osd-tit"></div><div class="nn-osd-sub"></div><div class="nn-osd-erro"></div></div></div>';
    document.body.appendChild(raiz);
    gradeEl = raiz.querySelector(".nn-grade");
    playerEl = raiz.querySelector(".nn-player");
    videoEl = raiz.querySelector("video");
    var faixaA = raiz.querySelector(".nn-audios");
    var i;
    for (i = 0; i < audios.length; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "nn-chip";
      b.textContent = rotuloAudio(audios[i]);
      b.onclick = (function (idx) {
        return function () {
          audioIdx = idx;
          zona = "grade";
          foco = 0;
          pintarGrade();
          focar();
        };
      })(i);
      faixaA.appendChild(b);
      audioEls.push(b);
    }
    raiz.querySelector(".nn-voltar").onclick = function () { fechar(); };
    videoEl.addEventListener("ended", function () {
      if (atual && ep < atual.eps) irEp(ep + 1);
    });
    videoEl.addEventListener("error", function () {
      var erro = raiz.querySelector(".nn-osd-erro");
      if (erro) erro.textContent = "Este episódio não abriu. Seta para baixo tenta o próximo.";
    });
  }

  function mostrarOsd() {
    var tit = raiz.querySelector(".nn-osd-tit");
    var sub = raiz.querySelector(".nn-osd-sub");
    var erro = raiz.querySelector(".nn-osd-erro");
    if (tit) tit.textContent = atual ? atual.titulo : "";
    if (sub) sub.textContent = atual ? "Episódio " + ep + " de " + atual.eps + "  ·  seta troca  ·  OK pausa" : "";
    if (erro) erro.textContent = "";
  }

  function irEp(n) {
    if (!atual) return;
    if (n < 1) n = 1;
    if (n > atual.eps) n = atual.eps;
    ep = n;
    gravarProg();
    mostrarOsd();
    videoEl.src = urlEp(atual, ep);
    try {
      var playP = videoEl.play();
      if (playP && playP.catch) playP.catch(function () {});
    } catch (e) {}
    if (preloadEl) {
      try { preloadEl.pause(); } catch (e2) {}
      preloadEl = null;
    }
    if (ep < atual.eps) {
      preloadEl = document.createElement("video");
      preloadEl.preload = "auto";
      preloadEl.src = urlEp(atual, ep + 1);
    }
  }

  function abrirPlayer(s) {
    atual = s;
    noPlayer = true;
    playerEl.classList.remove("hidden");
    var salvo = lerProg()[s.id] || 1;
    if (salvo < 1 || salvo > s.eps) salvo = 1;
    irEp(salvo);
  }

  function fecharPlayer() {
    noPlayer = false;
    gravarProg();
    try { videoEl.pause(); } catch (e) {}
    videoEl.removeAttribute("src");
    try { videoEl.load(); } catch (e2) {}
    if (preloadEl) {
      try { preloadEl.pause(); } catch (e3) {}
      preloadEl.removeAttribute("src");
      preloadEl = null;
    }
    playerEl.classList.add("hidden");
    atual = null;
    pintarGrade();
    focar();
  }

  function ativar() {
    if (zona === "voltar") {
      fechar();
      return;
    }
    if (zona === "audio" || zona === "tema") {
      zona = "grade";
      focar();
      return;
    }
    var s = visiveis[foco];
    if (s) abrirPlayer(s);
  }

  function tecla(code) {
    if (!aberto) return;
    if (noPlayer) {
      if (code === 38 || code === 37) irEp(ep - 1);
      else if (code === 40 || code === 39) irEp(ep + 1);
      else if (code === 13) {
        if (videoEl.paused) {
          try { videoEl.play(); } catch (e) {}
        } else {
          try { videoEl.pause(); } catch (e2) {}
        }
      }
      return;
    }
    if (code === 38) {
      if (zona === "grade") {
        if (foco >= COLS) foco -= COLS;
        else zona = "tema";
      } else if (zona === "tema") zona = "audio";
      else if (zona === "audio") zona = "voltar";
    } else if (code === 40) {
      if (zona === "voltar") zona = "audio";
      else if (zona === "audio") zona = "tema";
      else if (zona === "tema") zona = "grade";
      else if (foco + COLS < visiveis.length) foco += COLS;
    } else if (code === 37) {
      if (zona === "audio" && audioIdx > 0) {
        audioIdx--;
        pintarGrade();
      } else if (zona === "tema" && temaIdx > 0) {
        temaIdx--;
        pintarGrade();
      } else if (zona === "grade" && foco > 0) foco--;
    } else if (code === 39) {
      if (zona === "audio" && audioIdx < audios.length - 1) {
        audioIdx++;
        pintarGrade();
      } else if (zona === "tema" && temaIdx < temas.length - 1) {
        temaIdx++;
        pintarGrade();
      } else if (zona === "grade" && foco < visiveis.length - 1) foco++;
    } else if (code === 13) ativar();
    focar();
  }

  function abrir() {
    montar();
    aberto = true;
    noPlayer = false;
    zona = "grade";
    foco = 0;
    raiz.classList.remove("hidden");
    pintarAudios();
    gradeEl.innerHTML = '<div class="nn-vazio">Carregando novelinhas…</div>';
    carregar().then(function () {
      if (!aberto) return;
      pintarTemas();
      pintarGrade();
      focar();
    });
  }

  function fechar() {
    if (noPlayer) fecharPlayer();
    aberto = false;
    if (raiz) raiz.classList.add("hidden");
  }

  function voltar() {
    if (noPlayer) fecharPlayer();
    else fechar();
  }

  return {
    abrir: abrir,
    fechar: fechar,
    voltar: voltar,
    tecla: tecla,
    ativo: function () { return aberto; },
    precarregar: carregar,
    capas: function (n) {
      var out = [];
      var i;
      n = n || 4;
      for (i = 0; i < series.length && out.length < n; i++) {
        if (series[i].capa) out.push(series[i].capa);
      }
      return out;
    }
  };
})();
