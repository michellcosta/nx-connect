/* jogos-espn.js — Placar ao vivo, tabelas, ficha do jogo e jogos por dia
   da API pública da ESPN (sem chave, sem cadastro).
   Enriquece o painel "Jogos de hoje" (agenda da Saimo em SaimoExtra) com
   placar, minuto e estado ao vivo, casando os times por nome.
   Tudo silencioso: se a ESPN falhar, o painel segue como antes, sem placar. */
var SaimoJogosEspn = (function () {
  "use strict";

  var HEADER_BASE = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&league=";
  var SCORE_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/";
  var STAND_BASE = "https://site.api.espn.com/apis/v2/sports/soccer/";
  var TTL = 45000;          // placar muda rápido; cache curto em memória
  var TTL_TABELA = 3600000; // tabela muda devagar; 1 h
  var TTL_FICHA = 120000;   // ficha (escalação) ao vivo; 2 min
  var TTL_DIA = 600000;     // jogos de outro dia; 10 min

  var LIGAS = [
    { slug: "bra.1", nome: "Brasileirão Série A" },
    { slug: "bra.2", nome: "Brasileirão Série B" },
    { slug: "bra.3", nome: "Brasileirão Série C", tabela: false },
    { slug: "bra.copa_do_brazil", nome: "Copa do Brasil", tabela: false },
    { slug: "conmebol.libertadores", nome: "Libertadores" },
    { slug: "conmebol.sudamericana", nome: "Sulamericana" },
    { slug: "uefa.champions", nome: "Champions" },
    { slug: "uefa.europa", nome: "Europa League" },
    { slug: "eng.1", nome: "Premier League" },
    { slug: "esp.1", nome: "LaLiga" },
    { slug: "ita.1", nome: "Serie A" },
    { slug: "ger.1", nome: "Bundesliga" },
    { slug: "fra.1", nome: "Ligue 1" },
    { slug: "ned.1", nome: "Eredivisie" },
    { slug: "por.1", nome: "Liga Portugal" },
    { slug: "usa.1", nome: "MLS" },
    { slug: "mex.1", nome: "Liga MX" }
  ];

  var cache = { jogos: [], quando: 0, promessa: null };
  var cacheTabelas = {};
  var cacheFichas = {};
  var cacheDias = {};

  function chave(s) {
    if (window.SaimoExtra && SaimoExtra.chave) return SaimoExtra.chave(s);
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "");
  }

  function pegarDireto(url) {
    return window.SaimoExtra && SaimoExtra.json ? SaimoExtra.json(url) : Promise.resolve(null);
  }

  /* Tenta direto; se vier vazio/erro, refaz 1x pelo proxy (CORS/rede no TV). */
  function pegar(url) {
    return pegarDireto(url).then(function (dados) {
      if (dados) return dados;
      if (window.SaimoAPI && SaimoAPI.proxyUrl) return pegarDireto(SaimoAPI.proxyUrl({ url: url }));
      return null;
    });
  }

  /* Lê um evento nos dois formatos da ESPN: "header" (competitors direto no
     evento) e "scoreboard" (competitions[0].competitors, dados do time em
     event.competitors[n].team). */
  function lerEvento(ev, ligaNome, ligaSlug) {
    if (!ev) return null;
    var comps = ev.competitors || (ev.competitions && ev.competitions[0] && ev.competitions[0].competitors) || [];
    var casa = null;
    var fora = null;
    for (var i = 0; i < comps.length; i++) {
      var c = comps[i];
      if (!c) continue;
      if (c.homeAway === "home" && !casa) casa = c;
      else if (c.homeAway === "away" && !fora) fora = c;
      else if (!casa) casa = c;
      else if (!fora) fora = c;
    }
    if (!casa || !fora) return null;
    var nomeCasa = casa.displayName || (casa.team && casa.team.displayName) || "";
    var nomeFora = fora.displayName || (fora.team && fora.team.displayName) || "";
    if (!nomeCasa || !nomeFora) return null;
    var tipo = (ev.fullStatus && ev.fullStatus.type) || {};
    var estado = typeof ev.status === "string" ? ev.status : (ev.status && ev.status.type && ev.status.type.state) || tipo.state || "";
    var resumo = tipo.shortDetail || tipo.detail || tipo.summary || "";
    var pc = parseInt(casa.score, 10);
    var pf = parseInt(fora.score, 10);
    return {
      id: String(ev.id || ""),
      casa: nomeCasa,
      fora: nomeFora,
      casaLogo: casa.logo || (casa.team && casa.team.logo) || "",
      foraLogo: fora.logo || (fora.team && fora.team.logo) || "",
      liga: ligaNome,
      ligaSlug: ligaSlug,
      estado: estado,
      resumo: String(resumo || "").trim(),
      placarCasa: isNaN(pc) ? null : pc,
      placarFora: isNaN(pf) ? null : pf,
      inicio: Date.parse(ev.date || "") || 0
    };
  }

  /* ---------- Placar do dia (endpoint compacto, uma liga por request) ---------- */

  function buscarLiga(liga) {
    return pegar(HEADER_BASE + liga.slug).then(function (dados) {
      var eventos = eventosDo(dados);
      var saida = [];
      for (var i = 0; i < eventos.length; i++) {
        var j = lerEvento(eventos[i], liga.nome, liga.slug);
        if (j) saida.push(j);
      }
      return saida;
    }).catch(function () {
      return [];
    });
  }

  function eventosDo(dados) {
    try {
      return (dados && dados.sports && dados.sports[0] && dados.sports[0].leagues && dados.sports[0].leagues[0] && dados.sports[0].leagues[0].events) || [];
    } catch (e) {
      return [];
    }
  }

  /* 17 ligas de uma vez estourava o limite de conexões por host na TV e
     tudo caía no timeout de 8s (todas_ligas_vazias). Lotes de 4 mantêm a
     ordem dos grupos e deixam as conexões se reusarem. */
  function emLotes(arr, n, fn) {
    var saida = [];
    var i = 0;
    function passo() {
      var lote = arr.slice(i, i + n);
      i += lote.length;
      if (!lote.length) return Promise.resolve(saida);
      return Promise.all(lote.map(fn)).then(function (rs) {
        for (var k = 0; k < rs.length; k++) saida.push(rs[k]);
        return passo();
      });
    }
    return passo();
  }

  function carregar() {
    var agora = Date.now();
    if (cache.promessa && agora - cache.quando < TTL) return cache.promessa;
    cache.quando = agora;
    cache.promessa = emLotes(LIGAS, 4, buscarLiga).then(function (grupos) {
      var todos = [];
      var vazias = 0;
      for (var i = 0; i < grupos.length; i++) {
        if (grupos[i].length) todos = todos.concat(grupos[i]);
        else vazias++;
      }
      if (vazias === LIGAS.length && window.SaimoDiagnostico && SaimoDiagnostico.logEvento) {
        SaimoDiagnostico.logEvento("espn_erro", "todas_ligas_vazias");
      }
      cache.jogos = todos;
      return todos;
    }).catch(function () {
      return cache.jogos || [];
    });
    return cache.promessa;
  }

  /* ---------- Casamento de times agenda ↔ ESPN ---------- */

  /* Igual (sem acento/espaço) ou contenção nos dois lados (mín. 4 letras)
     pra pegar "Inter" vs "Internacional". */
  function casaTime(a, b) {
    var na = chave(a);
    var nb = chave(b);
    if (!na || !nb) return false;
    if (na === nb) return true;
    return na.length >= 4 && nb.length >= 4 && (na.indexOf(nb) !== -1 || nb.indexOf(na) !== -1);
  }

  function acharJogo(j) {
    var melhor = null;
    var melhorPeso = -1;
    for (var i = 0; i < cache.jogos.length; i++) {
      var e = cache.jogos[i];
      var normal = casaTime(j.casa, e.casa) && casaTime(j.fora, e.fora);
      var trocado = casaTime(j.casa, e.fora) && casaTime(j.fora, e.casa);
      if (!normal && !trocado) continue;
      // em empate, prefere liga brasileira/sul-americana
      var peso = e.ligaSlug.indexOf("bra.") === 0 || e.ligaSlug.indexOf("conmebol.") === 0 ? 0 : 1;
      if (melhor === null || peso < melhorPeso) {
        melhor = e;
        melhorPeso = peso;
      }
    }
    return melhor;
  }

  /* Preenche placar/tempo/estado (e espnId/ligaSlug pra ficha) dos jogos da
     agenda com dados da ESPN. Falha devolve a lista como veio. */
  function enriquecerLista(lista) {
    if (!Array.isArray(lista) || !lista.length) return Promise.resolve(lista || []);
    return carregar().then(function (jogos) {
      if (!jogos.length) return lista;
      lista.forEach(function (j) {
        if (!j) return;
        var e = acharJogo(j);
        if (!e) return;
        j.espnId = e.id;
        if (!j.ligaSlug) j.ligaSlug = e.ligaSlug;
        var temPlacar = typeof e.placarCasa === "number" && typeof e.placarFora === "number";
        if (e.estado === "in") {
          if (temPlacar && !j.placar) {
            j.placar = e.placarCasa + " × " + e.placarFora;
            j.placarCasa = e.placarCasa;
            j.placarFora = e.placarFora;
          }
          if (e.resumo && e.resumo.toLowerCase().indexOf("sched") === -1) j.tempo = e.resumo;
          j.estado = "in";
        } else if (e.estado === "post") {
          if (temPlacar && !j.placar) {
            j.placar = e.placarCasa + " × " + e.placarFora;
            j.placarCasa = e.placarCasa;
            j.placarFora = e.placarFora;
          }
          if (e.resumo) j.tempo = e.resumo;
          j.estado = "post";
        }
      });
      return lista;
    }).catch(function () {
      return lista;
    });
  }

  /* ---------- Tabela do campeonato ---------- */

  function linhasDe(standings) {
    var linhas = [];
    var entradas = (standings && standings.entries) || [];
    entradas.forEach(function (e) {
      var st = {};
      (e.stats || []).forEach(function (s) { st[s.name] = s.displayValue; });
      var pos = parseInt(st.rank, 10);
      if (isNaN(pos)) pos = linhas.length + 1;
      linhas.push({
        pos: pos,
        time: (e.team && e.team.displayName) || "",
        logo: (e.team && e.team.logos && e.team.logos[0] && e.team.logos[0].href) || "",
        pontos: st.points || "0",
        jogos: st.gamesPlayed || "0",
        vitorias: st.wins || "0",
        empates: st.ties || "0",
        derrotas: st.losses || "0",
        saldo: st.pointDifferential || st.goalDifferential || ""
      });
    });
    linhas.sort(function (a, b) {
      return a.pos - b.pos;
    });
    return linhas;
  }

  function nomeGrupo(no) {
    var n = String((no && (no.name || no.abbreviation || no.shortName)) || "").trim();
    if (!n || /^(overall|total|league|general)$/i.test(n)) return "";
    var g = n.match(/^group\s+(.+)$/i);
    if (g) return "Grupo " + g[1];
    return n;
  }

  function coletarGrupos(no, saida) {
    if (!no) return;
    var linhas = linhasDe(no.standings);
    if (linhas.length) {
      saida.push({ nome: nomeGrupo(no), linhas: linhas });
      return;
    }
    var kids = no.children || [];
    for (var i = 0; i < kids.length; i++) coletarGrupos(kids[i], saida);
  }

  function tabela(slug) {
    var agora = Date.now();
    var c = cacheTabelas[slug];
    if (c && agora - c.quando < TTL_TABELA) return Promise.resolve(c.grupos);
    return pegar(STAND_BASE + slug + "/standings").then(function (dados) {
      var grupos = [];
      try {
        coletarGrupos(dados, grupos);
      } catch (err) {
        grupos = [];
      }
      cacheTabelas[slug] = { grupos: grupos, quando: agora };
      return grupos;
    }).catch(function () {
      return [];
    });
  }

  /* ---------- Ficha do jogo (escalação + gols/cartões) ---------- */

  /* Os keyEvents do summary não trazem athletesInvolved; o nome do jogador
     vem no texto, ex.: "Kristoffer Ajer (Brentford) is shown the yellow card."
     ou "Goal! A 1, B 0. Diego Gómez (A) left footed shot...". */
  function nomeDoTexto(texto) {
    var t = String(texto || "").trim();
    if (!t) return "";
    var corte = t.split(" (")[0];
    if (corte.indexOf(". ") !== -1) corte = corte.split(". ").pop();
    corte = corte.replace(/^Goal!\s*/i, "");
    corte = corte.replace(/^Own Goal by\s*/i, "Contra: ");
    return corte.trim();
  }

  function fichaDoJogo(j) {
    if (!j || !j.espnId || !j.ligaSlug) return Promise.resolve(null);
    var c = cacheFichas[j.espnId];
    var agora = Date.now();
    if (c && agora - c.quando < TTL_FICHA) return Promise.resolve(c.ficha);
    var url = SCORE_BASE + j.ligaSlug + "/summary?event=" + j.espnId;
    return pegar(url).then(function (sm) {
      var ficha = null;
      try {
        if (sm && sm.rosters && sm.rosters.length) {
          var comp = sm.header && sm.header.competitions && sm.header.competitions[0];
          var comps = (comp && comp.competitors) || [];
          var idCasa = null;
          var idFora = null;
          comps.forEach(function (cc) {
            if (cc.homeAway === "home") idCasa = cc.team && cc.team.id;
            else if (cc.homeAway === "away") idFora = cc.team && cc.team.id;
          });
          var times = [];
          sm.rosters.forEach(function (r) {
            var jogadores = [];
            (r.roster || []).forEach(function (p) {
              var at = p.athlete || {};
              var nome = at.displayName || at.shortName || "";
              if (!nome) return;
              jogadores.push({
                nome: nome,
                camisa: p.jersey || "",
                posicao: (at.position && at.position.abbreviation) || "",
                titular: !!p.starter
              });
            });
            times.push({
              nome: (r.team && r.team.displayName) || "",
              logo: (r.team && r.team.logo) || "",
              formacao: r.formacion || r.formation || "",
              jogadores: jogadores
            });
          });
          var eventos = [];
          (sm.keyEvents || []).forEach(function (ke) {
            var tipo = (ke.type && ke.type.text) || "";
            if (tipo !== "Goal" && tipo !== "Yellow Card" && tipo !== "Red Card") return;
            var id = ke.team && ke.team.id;
            eventos.push({
              minuto: (ke.clock && ke.clock.displayValue) || "",
              tipo: tipo,
              lado: id && id === idCasa ? "casa" : id && id === idFora ? "fora" : "",
              texto: nomeDoTexto(ke.text) || (ke.athletesInvolved && ke.athletesInvolved[0] && (ke.athletesInvolved[0].displayName || ke.athletesInvolved[0].shortName)) || ""
            });
          });
          if (times.length) ficha = { times: times, eventos: eventos };
        }
      } catch (e) {
        ficha = null;
      }
      cacheFichas[j.espnId] = { ficha: ficha, quando: agora };
      return ficha;
    }).catch(function () {
      return null;
    });
  }

  /* ---------- Jogos de um dia futuro (0 = hoje, que é pela agenda) ---------- */

  function dataYyyymmdd(offset) {
    var d = new Date(Date.now() + offset * 86400000);
    var m = d.getMonth() + 1;
    var dia = d.getDate();
    return d.getFullYear() + (m < 10 ? "0" : "") + m + (dia < 10 ? "0" : "") + dia;
  }

  /* Devolve Promise de grupos na ordem de LIGAS: [{liga, ligaSlug, jogos}]. */
  function jogosDoDia(offset) {
    if (!offset || offset <= 0) return Promise.resolve([]);
    var data = dataYyyymmdd(offset);
    var grupos = new Array(LIGAS.length);
    var pendentes = [];
    var agora = Date.now();
    for (var i = 0; i < LIGAS.length; i++) {
      var ch = offset + "|" + LIGAS[i].slug;
      var c = cacheDias[ch];
      if (c && agora - c.quando < TTL_DIA) grupos[i] = c.jogos;
      else pendentes.push(i);
    }
    if (!pendentes.length) return Promise.resolve(rotular(grupos));
    var promessas = pendentes.map(function (i) {
      var ch = offset + "|" + LIGAS[i].slug;
      return pegar(SCORE_BASE + LIGAS[i].slug + "/scoreboard?dates=" + data).then(function (dados) {
        var eventos = (dados && dados.events) || [];
        var jogos = [];
        for (var k = 0; k < eventos.length; k++) {
          var x = lerEvento(eventos[k], LIGAS[i].nome, LIGAS[i].slug);
          if (x) jogos.push(x);
        }
        cacheDias[ch] = { jogos: jogos, quando: Date.now() };
        grupos[i] = jogos;
        return null;
      }).catch(function () {
        grupos[i] = [];
        return null;
      });
    });
    return Promise.all(promessas).then(function () {
      return rotular(grupos);
    });
  }

  function rotular(grupos) {
    var saida = [];
    for (var i = 0; i < LIGAS.length; i++) {
      saida.push({ liga: LIGAS[i].nome, ligaSlug: LIGAS[i].slug, jogos: grupos[i] || [] });
    }
    return saida;
  }

  var api = {
    LIGAS: LIGAS,
    carregar: carregar,
    enriquecerLista: enriquecerLista,
    tabela: tabela,
    fichaDoJogo: fichaDoJogo,
    jogosDoDia: jogosDoDia
  };
  window.SaimoJogosEspn = api;
  return api;
})();
