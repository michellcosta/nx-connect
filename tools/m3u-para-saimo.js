"use strict";

var fs = require("fs");
var path = require("path");
var readline = require("readline");

var SRC = process.argv[2] || "C:/Users/Michell Oliveira/Downloads/LISTA MICHELLTV/VODS03-MICHELLTV.m3u";
var OUT = process.argv[3] || "C:/Users/Michell Oliveira/Downloads/catalogo-michell-saimo";

function fold(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function letraDe(titulo) {
  var t = fold(titulo).replace(/^[^a-z0-9]+/, "");
  var c = t.charAt(0);
  if (!c || /[0-9]/.test(c)) return "#";
  return c.toUpperCase();
}

function anoDe(titulo) {
  var m = String(titulo || "").match(/\((\d{4})\)\s*$/);
  return m ? m[1] : "";
}

function ehLeg(nome, grupo) {
  var t = fold(nome + " " + grupo);
  if (/\bleg(endado)?\b/.test(t) && !/\bdub(lado)?\b/.test(fold(nome))) return true;
  if (/\sleg\s*$/i.test(nome) || /\bleg\)$/i.test(nome)) return true;
  return false;
}

function limparTitulo(nome) {
  var t = String(nome || "").trim();
  var ep = t.match(/\s+S\d{1,2}\s*E\d{1,3}\s*$/i) || t.match(/\s+\d{1,2}x\d{2}\s*$/i);
  if (ep) t = t.slice(0, ep.index);
  t = t.replace(/\s+(LEG|DUB|CINE|4K|1080P|720P)\s*$/i, "");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

function parseEp(nome) {
  var m = String(nome || "").match(/(?:^|[\s._-])S(\d{1,2})\s*E(\d{1,3})(?=$|[\s._-])/i);
  if (!m) m = String(nome || "").match(/(?:^|[\s._-])(\d{1,2})x(\d{2,3})(?=$|[\s._-])/i);
  if (!m) return null;
  return { s: parseInt(m[1], 10), e: parseInt(m[2], 10) };
}

function posterPath(logo) {
  var m = String(logo || "").match(/\/([A-Za-z0-9_-]+\.jpg)(?:\?|$)/i);
  return m ? "/" + m[1] : "";
}

function gavetaFilme(letra) {
  return letra === "#" ? "hash" : letra;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Arquivo não encontrado:", SRC);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  var filmes = Object.create(null);
  var series = Object.create(null);
  var nFilme = 0;
  var nEp = 0;
  var nSkip = 0;
  var meta = null;

  var rl = readline.createInterface({
    input: fs.createReadStream(SRC, { encoding: "utf8" }),
    crlfDelay: Infinity
  });

  function fecharItem(url) {
    if (!meta || !url || !/^https?:\/\//i.test(url)) {
      meta = null;
      return;
    }
    var nome = meta.name || "";
    var grupo = fold(meta.group || "");
    var ep = parseEp(nome);
    var titulo = limparTitulo(nome);
    if (!titulo) {
      nSkip++;
      meta = null;
      return;
    }
    var audio = ehLeg(nome, meta.group) ? "leg" : "dub";
    var grupoFilme = /filme|movie|\bcine\b|cinema/.test(grupo);
    var grupoSerie = /serie|temporada|novela|dorama/.test(grupo) || (/\banime/.test(grupo) && !grupoFilme);

    if (ep) {
      var sk = fold(titulo);
      if (!series[sk]) {
        series[sk] = {
          title: titulo,
          year: anoDe(titulo),
          letter: letraDe(titulo),
          logo: meta.logo || "",
          poster: posterPath(meta.logo),
          eps: Object.create(null)
        };
      }
      var ek = ep.s + "x" + ep.e + "x" + audio;
      if (!series[sk].eps[ek]) {
        series[sk].eps[ek] = { s: ep.s, e: ep.e, audio: audio, urls: [] };
        nEp++;
      }
      if (series[sk].eps[ek].urls.indexOf(url) < 0) series[sk].eps[ek].urls.push(url);
      if (!series[sk].logo && meta.logo) {
        series[sk].logo = meta.logo;
        series[sk].poster = posterPath(meta.logo);
      }
    } else if (grupoSerie && !grupoFilme) {
      nSkip++;
    } else {
      var fk = fold(titulo);
      if (!filmes[fk]) {
        filmes[fk] = {
          title: titulo,
          year: anoDe(titulo),
          letter: letraDe(titulo),
          logo: meta.logo || "",
          poster: posterPath(meta.logo),
          dub: [],
          leg: []
        };
        nFilme++;
      }
      var arr = audio === "leg" ? filmes[fk].leg : filmes[fk].dub;
      if (arr.indexOf(url) < 0) arr.push(url);
      if (!filmes[fk].logo && meta.logo) {
        filmes[fk].logo = meta.logo;
        filmes[fk].poster = posterPath(meta.logo);
      }
    }
    meta = null;
  }

  for await (var linha of rl) {
    linha = linha.trim();
    if (!linha) continue;
    if (linha.indexOf("#EXTINF") === 0) {
      var logo = (linha.match(/tvg-logo="([^"]*)"/i) || [])[1] || "";
      var group = (linha.match(/group-title="([^"]*)"/i) || [])[1] || "";
      var virgula = linha.lastIndexOf(",");
      var name = virgula >= 0 ? linha.slice(virgula + 1).trim() : "";
      meta = { logo: logo, group: group, name: name };
      continue;
    }
    if (linha.charAt(0) === "#") continue;
    fecharItem(linha);
  }

  var porLetraF = Object.create(null);
  Object.keys(filmes).forEach(function (k) {
    var it = filmes[k];
    var L = it.letter;
    if (!porLetraF[L]) porLetraF[L] = [];
    porLetraF[L].push(it);
  });
  Object.keys(porLetraF).forEach(function (L) {
    porLetraF[L].sort(function (a, b) {
      return fold(a.title).localeCompare(fold(b.title));
    });
    var linhas = porLetraF[L].map(function (it) {
      var parts = [it.title];
      if (it.dub.length) parts.push("dub=" + it.dub.join(","));
      if (it.leg.length) parts.push("leg=" + it.leg.join(","));
      return parts.join("\t");
    });
    var nome = "filmes-" + gavetaFilme(L) + ".txt";
    fs.writeFileSync(path.join(OUT, nome), linhas.join("\n") + "\n", "utf8");
  });

  var porLetraS = Object.create(null);
  Object.keys(series).forEach(function (k) {
    var it = series[k];
    var L = it.letter;
    if (!porLetraS[L]) porLetraS[L] = [];
    porLetraS[L].push(it);
  });
  Object.keys(porLetraS).forEach(function (L) {
    porLetraS[L].sort(function (a, b) {
      return fold(a.title).localeCompare(fold(b.title));
    });
    var g = gavetaFilme(L);
    var idx = porLetraS[L].map(function (it) {
      var n = Object.keys(it.eps).length;
      return it.title + "\t" + (it.year || "") + "\t0\t" + n;
    });
    fs.writeFileSync(path.join(OUT, "series-" + g + ".txt"), idx.join("\n") + "\n", "utf8");
    var body = [];
    porLetraS[L].forEach(function (it) {
      body.push("@" + it.title);
      var eps = Object.keys(it.eps)
        .map(function (ek) {
          return it.eps[ek];
        })
        .sort(function (a, b) {
          return a.s - b.s || a.e - b.e || a.audio.localeCompare(b.audio);
        });
      eps.forEach(function (ep) {
        body.push(ep.s + "\t" + ep.e + "\t" + ep.audio + "\t" + ep.urls.join(","));
      });
    });
    fs.writeFileSync(path.join(OUT, "series-" + g + "-0.txt"), body.join("\n") + "\n", "utf8");
  });

  var filmeLista = Object.keys(filmes).map(function (k) {
    return filmes[k];
  });
  var serieLista = Object.keys(series).map(function (k) {
    return series[k];
  });
  filmeLista.sort(function (a, b) {
    return (b.year || "0").localeCompare(a.year || "0");
  });
  var emAlta = filmeLista.filter(function (x) {
    return x.poster;
  }).slice(0, 28);
  var serAlta = serieLista.filter(function (x) {
    return x.poster;
  }).slice(0, 16);

  var dest = ["# Fileiras da tela inicial. Geradas do M3U Michell.", "capa: https://image.tmdb.org/t/p/w342", "fila\tEm alta"];
  emAlta.forEach(function (it) {
    dest.push("f\t" + it.title + "\t" + it.letter + "\t" + (it.year || "") + "\t" + (it.poster || ""));
  });
  dest.push("fila\tSéries em alta");
  serAlta.forEach(function (it) {
    dest.push("s\t" + it.title + "\t" + it.letter + "\t" + (it.year || "") + "\t" + (it.poster || ""));
  });
  fs.writeFileSync(path.join(OUT, "destaques.txt"), dest.join("\n") + "\n", "utf8");

  var resumo =
    "Filmes únicos: " +
    nFilme +
    "\nEpisódios: " +
    nEp +
    "\nSéries: " +
    serieLista.length +
    "\nIgnorados: " +
    nSkip +
    "\nPasta: " +
    OUT +
    "\n\nNo Cloudflare Pages, envie TODOS os .txt desta pasta na raiz.\nNa TV: Ajustes > Listas oficiais > Endereço do meu catálogo > https://SEU-PROJETO.pages.dev/\n";
  fs.writeFileSync(path.join(OUT, "LEIA-ME.txt"), resumo, "utf8");
  console.log(resumo);
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
