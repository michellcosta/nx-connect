/**
 * Proxy CORS (guiadetv, meuguia, TMDB) + ranking de hosts da telemetria.
 *
 *   npx wrangler kv namespace create RANKING
 *   # cola o id em wrangler.toml
 *   npx wrangler deploy
 */
const ALLOW = new Set([
  "www.guiadetv.com",
  "guiadetv.com",
  "meuguia.tv",
  "www.meuguia.tv",
  "api.themoviedb.org"
]);

const UA = "Mozilla/5.0 (WebOS; SaimoTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const KEY = "hosts";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400"
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders() }
  });
}

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch (e) {
    return "";
  }
}

function chaveTmdb(env) {
  return String((env && env.TMDB_KEY) || "").trim();
}

function pathTmdbOk(path) {
  const p = String(path || "").split("?")[0];
  return /^\/(movie|tv|search|trending|collection|company|genre|configuration)/.test(p);
}

async function tmdb(request, env) {
  const url = new URL(request.url);
  let path = url.searchParams.get("p") || url.searchParams.get("path") || "";
  if (path.charAt(0) !== "/") path = "/" + path;
  if (!pathTmdbOk(path)) return json({ error: "path" }, 400);
  const key = chaveTmdb(env);
  if (!key) return json({ error: "sem tmdb" }, 501);
  const alvo = new URL("https://api.themoviedb.org/3" + path);
  url.searchParams.forEach((v, k) => {
    if (k === "p" || k === "path" || k === "api_key") return;
    alvo.searchParams.set(k, v);
  });
  alvo.searchParams.set("api_key", key);
  const res = await fetch(alvo.toString(), {
    headers: { "User-Agent": UA, Accept: "application/json" },
    redirect: "follow"
  });
  const headers = new Headers(corsHeaders());
  headers.set("content-type", res.headers.get("content-type") || "application/json; charset=utf-8");
  headers.set("cache-control", "public, max-age=300");
  return new Response(res.body, { status: res.status, headers });
}

async function proxy(request, env) {
  const u = new URL(request.url).searchParams.get("u") || "";
  const h = hostOf(u);
  if (!h || !ALLOW.has(h)) return json({ error: "host nao permitido" }, 400);
  const alvo = new URL(u);
  if (alvo.protocol !== "https:" && alvo.protocol !== "http:") {
    return json({ error: "url invalida" }, 400);
  }
  if (h === "api.themoviedb.org") {
    const key = chaveTmdb(env);
    if (!key) return json({ error: "sem tmdb" }, 501);
    alvo.searchParams.delete("api_key");
    alvo.searchParams.set("api_key", key);
  }
  const res = await fetch(alvo.toString(), {
    headers: {
      "User-Agent": UA,
      Accept: request.headers.get("Accept") || "text/html,application/json,*/*"
    },
    redirect: "follow"
  });
  const headers = new Headers(corsHeaders());
  const ct = res.headers.get("content-type") || "text/plain; charset=utf-8";
  headers.set("content-type", ct);
  headers.set("cache-control", "public, max-age=300");
  return new Response(res.body, { status: res.status, headers });
}

async function lerHosts(env) {
  if (!env.RANKING) return {};
  try {
    return JSON.parse((await env.RANKING.get(KEY)) || "{}") || {};
  } catch (e) {
    return {};
  }
}

async function rankingGet(env) {
  return json({ hosts: await lerHosts(env) });
}

async function rankingPost(request, env) {
  if (!env.RANKING) return json({ ok: false, error: "sem KV" }, 501);
  let corpo = {};
  try {
    corpo = await request.json();
  } catch (e) {
    return json({ error: "json" }, 400);
  }
  const type = String(corpo.type || "");
  let h = String(corpo.host || "").toLowerCase();
  if (h.indexOf("www.") === 0) h = h.slice(4);
  if (!h || (type !== "play_ok" && type !== "source_fail")) {
    return json({ ok: true, ignored: true });
  }
  const hosts = await lerHosts(env);
  const cur = hosts[h] || { ok: 0, fail: 0 };
  if (type === "play_ok") cur.ok += 1;
  else cur.fail += 1;
  hosts[h] = cur;
  await env.RANKING.put(KEY, JSON.stringify(hosts));
  return json({ ok: true });
}

const PAREAR_ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function codigoParear() {
  let s = "";
  for (let i = 0; i < 6; i++) s += PAREAR_ABC[Math.floor(Math.random() * PAREAR_ABC.length)];
  return s;
}

async function parearCriar(env) {
  if (!env.RANKING) return json({ error: "sem KV" }, 501);
  for (let i = 0; i < 12; i++) {
    const code = codigoParear();
    const key = "parear:" + code;
    const existe = await env.RANKING.get(key);
    if (existe) continue;
    await env.RANKING.put(key, JSON.stringify({ pending: true }), { expirationTtl: 400 });
    return json({ code: code, expira: 360 });
  }
  return json({ error: "não criou código" }, 500);
}

async function parearLer(env, code) {
  if (!env.RANKING) return json({ error: "sem KV" }, 501);
  const key = "parear:" + String(code || "").toUpperCase();
  const raw = await env.RANKING.get(key);
  if (!raw) return json({ error: "código inválido ou vencido" }, 404);
  let item = {};
  try { item = JSON.parse(raw); } catch (e) { item = {}; }
  if (item.pending) return json({ pending: true, code: String(code || "").toUpperCase() });
  await env.RANKING.delete(key);
  return json(item);
}

async function parearGravar(request, env, code) {
  if (!env.RANKING) return json({ error: "sem KV" }, 501);
  const key = "parear:" + String(code || "").toUpperCase();
  const raw = await env.RANKING.get(key);
  if (!raw) return json({ error: "código inválido ou vencido" }, 404);
  let corpo = {};
  try { corpo = await request.json(); } catch (e) { return json({ error: "json" }, 400); }
  const tipo = String(corpo.tipo || "");
  if (tipo !== "xtream" && tipo !== "m3u_url" && tipo !== "m3u_txt") {
    return json({ error: "tipo inválido" }, 400);
  }
  const item = { tipo: tipo, pending: false };
  if (tipo === "xtream") {
    item.host = String(corpo.host || "");
    item.user = String(corpo.user || "");
    item.pass = String(corpo.pass || "");
  } else if (tipo === "m3u_url") {
    item.url = String(corpo.url || "");
  } else {
    const texto = String(corpo.texto || "");
    if (texto.length > 400000) return json({ error: "arquivo grande demais" }, 413);
    item.nome = String(corpo.nome || "lista.m3u");
    item.texto = texto;
  }
  await env.RANKING.put(key, JSON.stringify(item), { expirationTtl: 400 });
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    if (url.pathname === "/proxy" && request.method === "GET") return proxy(request, env);
    if (url.pathname === "/tmdb" && request.method === "GET") return tmdb(request, env);
    if (url.pathname === "/v1/ranking" && request.method === "GET") return rankingGet(env);
    if ((url.pathname === "/v1/event" || url.pathname === "/v1/ranking") && request.method === "POST") {
      return rankingPost(request, env);
    }
    if (url.pathname === "/v1/parear/criar" && request.method === "POST") return parearCriar(env);
    if (url.pathname.startsWith("/v1/parear/") && url.pathname !== "/v1/parear/criar") {
      const code = url.pathname.split("/").pop();
      if (request.method === "GET") return parearLer(env, code);
      if (request.method === "POST") return parearGravar(request, env, code);
    }
    return json({ ok: true, service: "saimo-webos" });
  }
};
