/* ficha-index-worker.js — indexa o fichas.txt FORA da main thread.
 * Na TV o parse de ~95 mil títulos custava 11,2s de main thread (foco
 * engarrafado durante a abertura). Mesma lógica do indexarIds (ficha.js);
 * a resposta usa structured clone, que preserva as referências compartilhadas
 * entre meta/lista/byTmdb (uma cópia só de cada rec).
 * Se o worker não existir (webOS antigo), ficha.js cai no parse local. */
"use strict";

function foldW(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s*\(\d{4}\)\s*$/, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function semAnoW(s) {
  return String(s || "").replace(/\s*\(\d{4}\)\s*$/, "").trim();
}

function agoraMs() {
  return (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
}

self.onmessage = function (ev) {
  var d = ev.data || {};
  if (d.cmd !== "indexar") return;
  var t0 = agoraMs();
  var lines = String(d.texto || "").split("\n");
  var posterBase = String(d.posterBase || "https://image.tmdb.org/t/p/w342");
  var itens = { f: [], s: [] };
  var i, line;
  for (i = 0; i < lines.length; i++) {
    line = lines[i];
    if (!line || line.charCodeAt(0) === 35) continue;
    if (line.indexOf("capa:") === 0) {
      var base = line.replace(/^capa:\s*/, "").trim();
      if (base) posterBase = base;
      continue;
    }
    var cols = line.split("\t");
    if (cols.length < 3) continue;
    var tipo = cols[0].trim();
    if (tipo !== "f" && tipo !== "s") continue;
    var titulo = cols[1].trim();
    var id = parseInt(cols[2], 10);
    if (!titulo) continue;
    var poster = cols[3] ? cols[3].trim() : "";
    var bruto = cols[4] || "";
    var generos = null;
    if (bruto) {
      generos = [];
      var pedacos = bruto.split(",");
      for (var g = 0; g < pedacos.length; g++) {
        var nome = pedacos[g].trim();
        if (nome) generos.push(nome);
      }
      if (!generos.length) generos = null;
    }
    var fT = foldW(titulo);
    var sa = semAnoW(titulo);
    if (!id && !poster && !generos) continue;
    var anoM = titulo.match(/\((\d{4})\)\s*$/);
    itens[tipo].push({
      t: titulo,
      sa: sa,
      f: fT,
      id: id || 0,
      c: poster ? (poster.indexOf("http") === 0 ? poster : posterBase + poster) : "",
      g: generos,
      a: anoM ? parseInt(anoM[1], 10) : 0
    });
  }

  /* Entrega FATIADA e ESPAÇADA: um postMessage gigante deserializava 95 mil
     registros de uma vez (3,3s — medido na TV); e mesmo fatiado, os blocos
     chegavam em rajada e se empilhavam (~4s seguidos). Pausa de 140 ms entre
     blocos dá respiro real para a UI processar teclado/animação. */
  var CHUNK = 3000;
  var PAUSA = 100;
  var fila = [];
  var primeiro = true;
  function enfileirar(tipo, arr) {
    for (var i = 0; i < arr.length; i += CHUNK) {
      fila.push({
        cmd: "indice-chunk",
        reqId: d.reqId || 0,
        tipo: tipo,
        inicio: primeiro,
        posterBase: primeiro ? posterBase : "",
        itens: arr.slice(i, i + CHUNK)
      });
      primeiro = false;
    }
  }
  enfileirar("f", itens.f);
  enfileirar("s", itens.s);
  function despachar() {
    var msg = fila.shift();
    if (!msg) {
      self.postMessage({
        cmd: "indexado-fim",
        reqId: d.reqId || 0,
        ms: Math.round(agoraMs() - t0),
        total: itens.f.length + itens.s.length
      });
      return;
    }
    msg.tFim = Date.now();
    self.postMessage(msg);
    setTimeout(despachar, PAUSA);
  }
  despachar();
};
