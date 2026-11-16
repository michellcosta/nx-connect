/**
 * SaimoAdultos — IDs TMDB + títulos + palavras revisadas.
 * O arquivo vod/adultos.txt entra como conjunto; o nome sozinho não basta
 * (ex.: "O Oposto do Sexo" fica na lista livre).
 */
var SaimoAdultos = (function () {
  "use strict";

  var ids = Object.create(null);
  var titulos = Object.create(null);
  var pronto = false;
  var LIVRE = [
    "o oposto do sexo",
    "the opposite of sex",
    "sexo mentiras e videotape",
    "sex lies and videotape",
    "sexo e a cidade",
    "sex and the city",
    "adult swim",
    "tudo sobre sexo",
    "masters of sex",
    "sexo fragil",
    "a arte de ser adulto",
    "xxx",
    "xxx 2",
    "xxx 2 estado de emergencia",
    "xxx state of the union",
    "xxx return of xander cage",
    "xxx reactivated",
    "xxx reactivated the return of xander cage"
  ];

  function fold(s) {
    if (!s) return "";
    var str = String(s).toLowerCase();
    var mapa = {
      á: "a", à: "a", ã: "a", â: "a", ä: "a",
      é: "e", è: "e", ê: "e", ë: "e",
      í: "i", ì: "i", î: "i", ï: "i",
      ó: "o", ò: "o", õ: "o", ô: "o", ö: "o",
      ú: "u", ù: "u", û: "u", ü: "u",
      ç: "c", ñ: "n"
    };
    var out = "";
    var i;
    for (i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      out += mapa[c] || c;
    }
    return out.replace(/\s*\(\d{4}\)\s*$/, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function livre(lc) {
    var i;
    var x;
    for (i = 0; i < LIVRE.length; i++) {
      x = LIVRE[i];
      if (lc === x) return true;
      if (x.indexOf(" ") >= 0 && lc.indexOf(x + " ") === 0) return true;
    }
    return false;
  }

  function porPalavra(lc, cat) {
    if (livre(lc)) return false;
    var t = (lc + " " + fold(cat || "")).replace(/\s+/g, " ");
    if (/adult swim/.test(t)) return false;
    var catLc = fold(cat || "");
    if (/\badulto\b/.test(catLc) || /\badult\b/.test(catLc)) return true;
    if (/^adulto /.test(t) || /\badult material\b/.test(t)) return true;
    if (/\bxxx \d|\bxxx [a-z]/.test(t)) return true;
    if (/\bporn|\bporno\b|\bpornhub|\bxvideos|\bxhamster|\bredtube|\byouporn|\bbrazzers|\bbrasileirinhas|\bonlyfans|\bninfoman/.test(t)) return true;
    if (/\bhustler|\bpenthouse|\bplayboy|\bsexy hot|\bsex prive|\bsexprive/.test(t)) return true;
    if (/\b\+18\b|\b18\+/.test(t)) return true;
    if (/\berotic|\berotico\b|\berotica\b/.test(t)) return true;
    if (/\badult\b/.test(t) && t.indexOf("adulto") === -1) return true;
    return false;
  }

  function tmdbDe(item) {
    if (!item) return 0;
    var n = parseInt(item.tmdb || item.tmdbId || item.id, 10) || 0;
    if (n) return n;
    var title = item.title || item.name || item.titulo || "";
    if (!title || !window.SaimoFicha || !SaimoFicha.tmdbId) return 0;
    var serie = item.type === "series" || item.colecao === "animes" || item.colecao === "doramas";
    return parseInt(SaimoFicha.tmdbId(title, serie), 10) || 0;
  }

  function eh(item) {
    if (!item) return false;
    if (item.adult === true || item.adult === 1 || item.adult === "1") return true;
    var title = item.title || item.name || item.titulo || "";
    var lc = fold(title);
    if (lc && titulos[lc]) return true;
    var id = tmdbDe(item);
    if (id && ids[String(id)]) return true;
    return porPalavra(lc, item.category || item.group || item.colecao || "");
  }

  function esconder() {
    return !(window.SaimoAjustes && SaimoAjustes.get("hideAdult") === false);
  }

  function passa(item) {
    if (!esconder()) return true;
    return !eh(item);
  }

  function filtrar(arr) {
    var lista = arr || [];
    if (!esconder()) return lista;
    var out = [];
    var i;
    for (i = 0; i < lista.length; i++) {
      if (passa(lista[i])) out.push(lista[i]);
    }
    return out;
  }

  function parse(text) {
    var lines = String(text || "").split(/\r?\n/);
    var i;
    for (i = 0; i < lines.length; i++) {
      var ln = lines[i].replace(/^\s+|\s+$/g, "");
      if (!ln || ln.charAt(0) === "#") continue;
      if (/^\d+$/.test(ln)) ids[ln] = 1;
      else titulos[fold(ln)] = 1;
    }
  }

  function carregar() {
    return new Promise(function (resolve) {
      try {
        var x = new XMLHttpRequest();
        x.open("GET", "vod/adultos.txt?v=xt1", true);
        x.timeout = 8000;
        x.onload = function () {
          if (x.status >= 200 && x.status < 400) parse(x.responseText || "");
          pronto = true;
          resolve(true);
        };
        x.onerror = function () {
          pronto = true;
          resolve(false);
        };
        x.ontimeout = function () {
          pronto = true;
          resolve(false);
        };
        x.send();
      } catch (e) {
        pronto = true;
        resolve(false);
      }
    });
  }

  return {
    eh: eh,
    passa: passa,
    filtrar: filtrar,
    esconder: esconder,
    carregar: carregar,
    fold: fold,
    pronto: function () { return pronto; }
  };
})();
window.SaimoAdultos = SaimoAdultos;
