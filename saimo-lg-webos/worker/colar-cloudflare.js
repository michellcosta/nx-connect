/**
 * Cole este arquivo inteiro no Worker da Cloudflare (no lugar do Hello World).
 * Deploy → depois, em Triggers, aponte:
 *   saimo-tv.pages.dev/ligar*
 *   saimo-tv.pages.dev/v1/parear*
 * para este Worker.
 */
const ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...cors() },
  });
}

function codigoNovo() {
  let s = "";
  for (let i = 0; i < 6; i++) s += ABC[Math.floor(Math.random() * ABC.length)];
  return s;
}

function chave(code) {
  return new Request("https://parear.saimo/" + String(code || "").toUpperCase());
}

async function gravar(code, obj, ttl) {
  await caches.default.put(
    chave(code),
    new Response(JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
        "Cache-Control": "max-age=" + (ttl || 360),
      },
    })
  );
}

async function ler(code) {
  const hit = await caches.default.match(chave(code));
  if (!hit) return null;
  try {
    return await hit.json();
  } catch (e) {
    return null;
  }
}

async function apagar(code) {
  try {
    await caches.default.delete(chave(code));
  } catch (e) {}
}

function paginaLigar() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Saimo TV · Ligar na TV</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: #070b14; color: #e8eefc; }
    main { max-width: 440px; margin: 0 auto; padding: 28px 18px 48px; }
    h1 { font-size: 1.45rem; margin: 0 0 6px; }
    .sub { color: #8b9bb8; margin: 0 0 22px; font-size: .95rem; }
    .code { font: 800 1.6rem/1 ui-monospace, Consolas, monospace; letter-spacing: .28em; color: #7dffb3; margin-bottom: 18px; }
    .tabs { display: flex; gap: 8px; margin-bottom: 16px; }
    .tabs button { flex: 1; border: 0; border-radius: 12px; padding: 10px 8px; background: #121a2c; color: #c5d0e6; font-weight: 700; }
    .tabs button.on { background: #1a4a32; color: #7dffb3; }
    label { display: block; font-size: .82rem; color: #8b9bb8; margin: 12px 0 6px; }
    input, textarea { width: 100%; border: 1px solid #243049; background: #0d1422; color: inherit; border-radius: 12px; padding: 12px 14px; font-size: 1rem; }
    textarea { min-height: 88px; }
    .hint { font-size: .8rem; color: #6d7d99; margin-top: 8px; }
    .ok { margin-top: 18px; width: 100%; border: 0; border-radius: 14px; padding: 14px; font-weight: 800; font-size: 1rem; background: #1bd17a; color: #062414; }
    .msg { margin-top: 14px; min-height: 1.4em; color: #7dffb3; }
    .msg.err { color: #ff8b8b; }
    .painel { display: none; }
    .painel.on { display: block; }
  </style>
</head>
<body>
<main>
  <h1>Mandar para a TV</h1>
  <p class="sub">Xtream, link M3U ou arquivo. A TV precisa estar na tela do QR.</p>
  <div class="code" id="codigo">------</div>
  <div class="tabs">
    <button type="button" class="on" data-tab="xtream">Xtream</button>
    <button type="button" data-tab="link">Link M3U</button>
    <button type="button" data-tab="arquivo">Arquivo</button>
  </div>
  <div id="p-xtream" class="painel on">
    <label>Servidor</label>
    <input id="host" placeholder="http://seupainel.com" autocomplete="off">
    <label>Usuário</label>
    <input id="user" placeholder="login" autocomplete="username">
    <label>Senha</label>
    <input id="pass" type="password" placeholder="senha" autocomplete="current-password">
  </div>
  <div id="p-link" class="painel">
    <label>Link da lista</label>
    <textarea id="m3uurl" placeholder="http://…/get.php?username=… ou .m3u"></textarea>
    <p class="hint">Se for get.php do Xtream, a TV entra no painel. Lista enorme: prefira o Xtream.</p>
  </div>
  <div id="p-arquivo" class="painel">
    <label>Arquivo .m3u</label>
    <input id="arq" type="file" accept=".m3u,.m3u8,.txt">
    <p class="hint">No máximo 400 KB. Playlist grande não vai: use Xtream ou o link.</p>
  </div>
  <button class="ok" type="button" id="enviar">Enviar para a TV</button>
  <p class="msg" id="msg"></p>
</main>
<script>
(function () {
  var code = (new URLSearchParams(location.search).get("c") || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  document.getElementById("codigo").textContent = code || "sem código";
  var tab = "xtream";
  document.querySelectorAll(".tabs button").forEach(function (b) {
    b.onclick = function () {
      tab = b.getAttribute("data-tab");
      document.querySelectorAll(".tabs button").forEach(function (x) { x.classList.toggle("on", x === b); });
      document.querySelectorAll(".painel").forEach(function (p) { p.classList.toggle("on", p.id === "p-" + tab); });
    };
  });
  function msg(t, err) {
    var el = document.getElementById("msg");
    el.textContent = t;
    el.className = "msg" + (err ? " err" : "");
  }
  function xtreamDoGet(url) {
    try {
      var u = new URL(url);
      var user = u.searchParams.get("username");
      var pass = u.searchParams.get("password");
      if (user && pass) return { tipo: "xtream", host: u.origin, user: user, pass: pass };
    } catch (e) {}
    return null;
  }
  document.getElementById("enviar").onclick = function () {
    if (!code) { msg("Abra esta página pelo QR da TV.", true); return; }
    if (tab === "xtream") {
      var host = document.getElementById("host").value.trim();
      var user = document.getElementById("user").value.trim();
      var pass = document.getElementById("pass").value;
      if (!host || !user || !pass) { msg("Preencha servidor, usuário e senha.", true); return; }
      if (!/^https?:\\/\\//i.test(host)) host = "http://" + host;
      ir({ tipo: "xtream", host: host, user: user, pass: pass });
      return;
    }
    if (tab === "link") {
      var u = document.getElementById("m3uurl").value.trim();
      if (!/^https?:\\/\\//i.test(u)) { msg("Cole um link http:// ou https://", true); return; }
      ir(xtreamDoGet(u) || { tipo: "m3u_url", url: u });
      return;
    }
    var f = document.getElementById("arq").files[0];
    if (!f) { msg("Escolha um arquivo .m3u", true); return; }
    if (f.size > 400 * 1024) { msg("Arquivo grande demais. Use Xtream ou o link.", true); return; }
    var r = new FileReader();
    r.onload = function () {
      var txt = String(r.result || "");
      var m = txt.match(/https?:\\/\\/[^\\s"'<>]+get\\.php\\?[^\\s"'<>]+/i);
      if (m) {
        var x = xtreamDoGet(m[0]);
        if (x) { ir(x); return; }
      }
      ir({ tipo: "m3u_txt", nome: f.name, texto: txt });
    };
    r.readAsText(f);
  };
  function ir(body) {
    msg("Enviando…");
    fetch("/v1/parear/" + encodeURIComponent(code), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (res) { return res.json().then(function (j) { return { res: res, j: j }; }); })
      .then(function (o) {
        if (!o.res.ok) throw new Error((o.j && o.j.error) || ("HTTP " + o.res.status));
        msg("Pronto. Olhe a TV.");
      })
      .catch(function (e) { msg(e.message || "Não enviou.", true); });
  }
})();
</script>
</body>
</html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors() });
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (request.method === "GET" && (path === "/ligar.html" || path === "/ligar" || path === "/")) {
      return new Response(paginaLigar(), {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...cors() },
      });
    }

    if (path === "/v1/parear/criar" && request.method === "POST") {
      let code = "";
      for (let i = 0; i < 8; i++) {
        code = codigoNovo();
        if (!(await ler(code))) break;
      }
      await gravar(code, { pending: true }, 360);
      return json({ code: code, expira: 360 });
    }

    if (path.startsWith("/v1/parear/") && path !== "/v1/parear/criar") {
      const code = path.split("/").pop().toUpperCase();
      if (request.method === "GET") {
        const item = await ler(code);
        if (!item) return json({ error: "código inválido ou vencido" }, 404);
        if (item.pending) return json({ pending: true, code: code });
        await apagar(code);
        return json(item);
      }
      if (request.method === "POST") {
        const item = await ler(code);
        if (!item) return json({ error: "código inválido ou vencido" }, 404);
        let corpo = {};
        try {
          corpo = await request.json();
        } catch (e) {
          return json({ error: "json" }, 400);
        }
        const tipo = String(corpo.tipo || "");
        if (tipo !== "xtream" && tipo !== "m3u_url" && tipo !== "m3u_txt") {
          return json({ error: "tipo inválido" }, 400);
        }
        const salvo = { tipo: tipo, pending: false };
        if (tipo === "xtream") {
          salvo.host = String(corpo.host || "");
          salvo.user = String(corpo.user || "");
          salvo.pass = String(corpo.pass || "");
        } else if (tipo === "m3u_url") {
          salvo.url = String(corpo.url || "");
        } else {
          const texto = String(corpo.texto || "");
          if (texto.length > 400000) return json({ error: "arquivo grande demais" }, 413);
          salvo.nome = String(corpo.nome || "lista.m3u");
          salvo.texto = texto;
        }
        await gravar(code, salvo, 360);
        return json({ ok: true });
      }
    }

    return json({ ok: true, service: "saimo-ligar" });
  },
};
