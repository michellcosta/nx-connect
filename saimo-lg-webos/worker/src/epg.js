/**
 * EPG magro: o JSON vive no Pages (nx-conexao). O Worker só espelha no KV.
 */
const EPG_KEY = "epg";
const EPG_TTL_MS = 4 * 3600 * 1000;
const NUVEM = "https://nx-conexao.pages.dev/epg.json";

export async function atualizarEpg(env) {
  if (!env || !env.RANKING) return null;
  const res = await fetch(NUVEM, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  const n = data && data.channels ? Object.keys(data.channels).length : 0;
  if (!n) return null;
  await env.RANKING.put(EPG_KEY, JSON.stringify(data));
  return data;
}

export async function epgGet(env, ctx, jsonFn) {
  let data = null;
  try {
    const raw = env.RANKING ? await env.RANKING.get(EPG_KEY) : null;
    data = raw ? JSON.parse(raw) : null;
  } catch (e) {
    data = null;
  }
  const n = data && data.channels ? Object.keys(data.channels).length : 0;
  const velho = !n || !data.updated || Date.now() - data.updated > EPG_TTL_MS;
  if (velho && ctx && ctx.waitUntil) ctx.waitUntil(atualizarEpg(env).catch(function () {}));
  if (n) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  try {
    const res = await fetch(NUVEM, { headers: { Accept: "application/json" } });
    if (res.ok) data = await res.json();
  } catch (e2) {
    data = null;
  }
  if (data && data.channels) {
    if (env.RANKING && ctx && ctx.waitUntil) {
      ctx.waitUntil(env.RANKING.put(EPG_KEY, JSON.stringify(data)).catch(function () {}));
    }
    return jsonFn(data);
  }
  return jsonFn({ updated: 0, janelaHoras: 6, channels: {} });
}
