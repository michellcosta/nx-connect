/**
 * Fonte preferida na série: mesmo servidor, depois a mesma posição
 * na versão (dublado/legendado), depois a primeira.
 * Rótulo das listas: Fonte N, nome (áudio) e qualidade — sem host.
 */
var SaimoFontePref = {
  KEY: "saimo_fonte_pref",
  hostDe: function hostDe(url) {
    try {
      var h = new URL(url).hostname.toLowerCase();
      if (h.indexOf("www.") === 0) h = h.slice(4);
      return h;
    } catch (e) {
      return "";
    }
  },
  tipo: function tipo(s) {
    var a = String(s && (s.audio || s.quality) || "").toUpperCase();
    if (a.indexOf("LEG") >= 0) return "LEG";
    if (a.indexOf("DUB") >= 0 || a.indexOf("NAC") >= 0) return "DUB";
    return a || "DUB";
  },
  nomeAudio: function nomeAudio(s) {
    var t = this.tipo(s);
    var nome = t === "LEG" ? "Legendado" : "Dublado";
    if (s && s.suaLista) return nome + " · lista";
    return nome;
  },
  qualidade: function qualidade(s) {
    var q = String(s && s.quality || "").trim();
    if (!q || /^https?:/i.test(q) || q.indexOf(".") >= 0 && q.indexOf(" ") < 0) return "";
    if (/xtream|lista/i.test(q) && q.length > 24) return "";
    return q;
  },
  rotulo: function rotulo(s, i) {
    var n = "Fonte " + ((i || 0) + 1);
    var nome = this.nomeAudio(s);
    var q = this.qualidade(s);
    return {
      n: n,
      nome: nome,
      qualidade: q,
      texto: n + " · " + nome + (q ? " · " + q : "")
    };
  },
  ler: function ler(titulo) {
    if (!titulo) return null;
    try {
      var mapa = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      return mapa[titulo] || null;
    } catch (e) {
      return null;
    }
  },
  guardar: function guardar(titulo, url, sources, idx) {
    if (!titulo || !url) return;
    var lista = sources || [];
    var s = lista[idx];
    if (!s) {
      for (var i = 0; i < lista.length; i++) {
        if ((lista[i].url || lista[i].src) === url) {
          s = lista[i];
          idx = i;
          break;
        }
      }
    }
    var tipo = this.tipo(s || { audio: "DUB" });
    var posicao = 0;
    var visto = 0;
    for (var j = 0; j < lista.length; j++) {
      if (this.tipo(lista[j]) !== tipo) continue;
      if (j === idx || (lista[j].url || lista[j].src) === url) {
        posicao = visto;
        break;
      }
      visto++;
    }
    var mapa = {};
    try {
      mapa = JSON.parse(localStorage.getItem(this.KEY) || "{}");
    } catch (e2) {}
    mapa[titulo] = {
      host: this.hostDe(url),
      tipo: tipo,
      posicao: posicao
    };
    try {
      localStorage.setItem(this.KEY, JSON.stringify(mapa));
    } catch (e3) {}
  },
  ordenar: function ordenar(sources, titulo, audioPref) {
    var lista = (sources || []).slice();
    if (!lista.length) return lista;
    var self = this;
    var want = audioPref === "leg" ? "LEG" : "DUB";
    lista.sort(function (a, b) {
      var pa = a.origem === "meu" || a.suaLista ? 0 : 1;
      var pb = b.origem === "meu" || b.suaLista ? 0 : 1;
      if (pa !== pb) return pa - pb;
      var aa = self.tipo(a) === want ? 0 : 1;
      var bb = self.tipo(b) === want ? 0 : 1;
      return aa - bb;
    });
    var mem = this.ler(titulo);
    var escolhida = -1;
    var i;
    if (mem) {
      var tipoAlvo = mem.tipo || want;
      var n = 0;
      var noHost = -1;
      var naPos = -1;
      for (i = 0; i < lista.length; i++) {
        if (this.tipo(lista[i]) !== tipoAlvo) continue;
        var h = this.hostDe(lista[i].url || lista[i].src);
        if (n === mem.posicao) naPos = i;
        if (mem.host && h === mem.host) {
          if (n === mem.posicao) {
            escolhida = i;
            break;
          }
          if (noHost < 0) noHost = i;
        }
        n++;
      }
      if (escolhida < 0 && noHost >= 0) escolhida = noHost;
      if (escolhida < 0 && naPos >= 0) escolhida = naPos;
    }
    if (escolhida < 0) {
      for (i = 0; i < lista.length; i++) {
        if (this.tipo(lista[i]) === want) {
          escolhida = i;
          break;
        }
      }
    }
    if (escolhida > 0) {
      var item = lista.splice(escolhida, 1)[0];
      lista.unshift(item);
    }
    return lista;
  }
};
window.SaimoFontePref = SaimoFontePref;
