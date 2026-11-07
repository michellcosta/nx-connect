#!/usr/bin/env python3
"""Baixa sinopses, elenco e episódios (TMDB) e um recorte de 6 h do EPG XMLTV."""
from __future__ import annotations

import gzip
import io
import json
import re
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
REPO = RAIZ.parent / "SaimoPlayer-2.4.6"
VOD = RAIZ / "vod"
CHAVE = "15d2ea6d0dc1d476efbca3eba2b9bbfb"
TMDB = "https://api.themoviedb.org/3"
UA = "Mozilla/5.0 (WebOS; SaimoTV) AppleWebKit/537.36"

EPG_URLS = [
    "https://iptv-epg.org/files/epg-br.xml",
    "https://www.open-epg.com/files/brazil3.xml",
]


def fold(s: str) -> str:
    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\s*\(\d{4}\)\s*$", "", s)
    s = re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()
    return s


def pedir(url: str, timeout: int = 25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            return json.loads(res.read().decode("utf-8"))
    except Exception:
        return None


def limpar(s: str) -> str:
    return re.sub(r"[\t\r\n]+", " ", s or "").strip()


def ler_fichas(path: Path) -> dict:
    ids = {"f": {}, "s": {}}
    if not path.exists():
        return ids
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if not line or line.startswith("#"):
            continue
        cols = line.split("\t")
        if len(cols) < 3:
            continue
        tipo = cols[0].strip()
        titulo = cols[1].strip()
        try:
            tid = int(cols[2])
        except ValueError:
            continue
        bucket = ids["s" if tipo == "s" else "f"]
        bucket[titulo] = tid
        bucket[fold(titulo)] = tid
    return ids


def ler_destaques(path: Path):
    filmes, series = [], []
    if not path.exists():
        return filmes, series
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if not line or line.startswith("#") or line.startswith("capa:") or line.startswith("fila"):
            continue
        cols = line.split("\t")
        if len(cols) < 2:
            continue
        tipo, titulo = cols[0].strip(), cols[1].strip()
        if tipo == "s":
            series.append(titulo)
        elif tipo == "f":
            filmes.append(titulo)
    return filmes, series


def tmdb_detalhe(tipo: str, tid: int):
    extras = "credits,content_ratings,images" if tipo == "tv" else "credits,release_dates,images"
    url = (
        f"{TMDB}/{tipo}/{tid}?api_key={CHAVE}&language=pt-BR"
        f"&append_to_response={extras}&include_image_language=pt,en,null"
    )
    js = pedir(url)
    if not js:
        return None
    overview = js.get("overview") or ""
    if not overview:
        en = pedir(f"{TMDB}/{tipo}/{tid}?api_key={CHAVE}&language=en-US")
        if en:
            overview = en.get("overview") or ""
    crew = (js.get("credits") or {}).get("crew") or []
    direcao = [c.get("name") for c in crew if c.get("job") == "Director" and c.get("name")]
    criadores = [c.get("name") for c in (js.get("created_by") or []) if c.get("name")]
    elenco = []
    for p in ((js.get("credits") or {}).get("cast") or [])[:8]:
        elenco.append(f"{p.get('nome', p.get('name', ''))}|{p.get('character', '')}|{p.get('profile_path') or ''}")
    data = js.get("first_air_date" if tipo == "tv" else "release_date") or ""
    return {
        "id": tid,
        "titulo": js.get("name" if tipo == "tv" else "title") or "",
        "sinopse": limpar(overview),
        "ano": data[:4],
        "nota": js.get("vote_average") or 0,
        "duracao": ((js.get("episode_run_time") or [0])[0] if tipo == "tv" else js.get("runtime") or 0),
        "generos": ",".join(g.get("name") for g in (js.get("genres") or []) if g.get("name")),
        "elenco": " || ".join(elenco),
        "assinatura": ", ".join((direcao or criadores)[:2]),
        "temporadas": js.get("number_of_seasons") or 0,
        "capa": js.get("poster_path") or "",
        "fundo": js.get("backdrop_path") or "",
    }


def tmdb_temporada(tid: int, n: int):
    js = pedir(f"{TMDB}/tv/{tid}/season/{n}?api_key={CHAVE}&language=pt-BR")
    if not js:
        return []
    out = []
    for ep in js.get("episodes") or []:
        num = ep.get("episode_number")
        if not num:
            continue
        out.append({
            "t": n,
            "e": num,
            "nome": limpar(ep.get("name") or ""),
            "duracao": ep.get("runtime") or 0,
            "sinopse": limpar(ep.get("overview") or ""),
        })
    return out


def gerar_sinopses():
    origem = REPO / "vod" / "fichas.txt"
    destino_fichas = VOD / "fichas.txt"
    if origem.exists():
        destino_fichas.write_bytes(origem.read_bytes())
        print("fichas.txt copiado")
    ids = ler_fichas(destino_fichas)
    filmes, series = ler_destaques(VOD / "destaques.txt")
    # também as primeiras 80 séries de cada letra do índice, para o catálogo não ficar vazio
    extra_series = []
    for p in sorted(VOD.glob("series-*.txt")):
        if re.search(r"-\d+\.txt$", p.name):
            continue
        for i, line in enumerate(p.read_text(encoding="utf-8", errors="replace").splitlines()):
            if i >= 12:
                break
            titulo = line.split("\t")[0].strip()
            if titulo:
                extra_series.append(titulo)
    seen_s, series_all = set(), []
    for t in series + extra_series:
        k = fold(t)
        if k in seen_s:
            continue
        seen_s.add(k)
        series_all.append(t)

    destaques_s = set(fold(t) for t in series)
    tarefas = [("f", t) for t in filmes] + [("s", t) for t in series_all]
    print(f"baixando {len(tarefas)} fichas TMDB...")

    linhas = ["# tipo\ttitulo\tid\tano\tduracao\tnota\tgeneros\tassinatura\telenco\tsinopse"]
    eps_linhas = ["# serie\ttemporada\tepisodio\tnome\tduracao\tsinopse"]
    ok = 0

    def resolver(tipo, titulo):
        bucket = ids["s" if tipo == "s" else "f"]
        tid = bucket.get(titulo) or bucket.get(fold(titulo))
        kind = "tv" if tipo == "s" else "movie"
        if not tid:
            q = urllib.parse.quote(re.sub(r"\s*\(\d{4}\)\s*$", "", titulo))
            js = pedir(f"{TMDB}/search/{kind}?api_key={CHAVE}&language=pt-BR&query={q}")
            results = (js or {}).get("results") or []
            tid = results[0]["id"] if results else 0
        if not tid:
            return tipo, titulo, None, []
        det = tmdb_detalhe(kind, tid)
        epis = []
        if tipo == "s" and det and fold(titulo) in destaques_s:
            ntemp = min(int(det.get("temporadas") or 1), 8) or 1
            for n in range(1, ntemp + 1):
                epis.extend(tmdb_temporada(tid, n))
                time.sleep(0.04)
        return tipo, titulo, det, epis

    with ThreadPoolExecutor(max_workers=4) as pool:
        futs = [pool.submit(resolver, t, n) for t, n in tarefas]
        for fut in as_completed(futs):
            tipo, titulo, det, epis = fut.result()
            if not det or not det["sinopse"]:
                continue
            ok += 1
            linhas.append("\t".join([
                tipo, titulo, str(det["id"]), det["ano"], str(det["duracao"]),
                f"{det['nota']:.1f}", det["generos"], det["assinatura"],
                det["elenco"], det["sinopse"],
            ]))
            for ep in epis:
                eps_linhas.append("\t".join([
                    titulo, str(ep["t"]), str(ep["e"]), ep["nome"],
                    str(ep["duracao"]), ep["sinopse"],
                ]))
            if ok % 25 == 0:
                print(f"  {ok} prontas")

    linhas[1:] = sorted(linhas[1:])
    (VOD / "sinopses.txt").write_text("\n".join(linhas) + "\n", encoding="utf-8")
    (VOD / "series_eps.txt").write_text("\n".join(eps_linhas) + "\n", encoding="utf-8")
    print(f"sinopses.txt: {ok} títulos | series_eps.txt: {len(eps_linhas)-1} episódios")


def baixar_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Encoding": "gzip"})
    with urllib.request.urlopen(req, timeout=90) as res:
        data = res.read()
        if res.headers.get("Content-Encoding") == "gzip" or data[:2] == b"\x1f\x8b":
            try:
                data = gzip.decompress(data)
            except Exception:
                data = gzip.GzipFile(fileobj=io.BytesIO(data)).read()
        return data


def xmltv_date(s: str):
    s = (s or "").strip()
    if len(s) < 14:
        return None
    try:
        dt = datetime.strptime(s[:14], "%Y%m%d%H%M%S")
    except ValueError:
        return None
    tz = s[15:] if len(s) > 15 else "-0300"
    m = re.match(r"([+-])(\d{2})(\d{2})", tz.replace(":", ""))
    if m:
        sign = 1 if m.group(1) == "+" else -1
        dt = dt.replace(tzinfo=timezone(sign * timedelta(hours=int(m.group(2)), minutes=int(m.group(3)))))
    else:
        dt = dt.replace(tzinfo=timezone(timedelta(hours=-3)))
    return int(dt.timestamp() * 1000)


def decode_ent(s: str) -> str:
    return (
        (s or "")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", '"')
        .replace("&#39;", "'")
        .replace("&apos;", "'")
    )


def norm_canal(s: str) -> str:
    s = fold(decode_ent(s))
    s = re.sub(r"^br\s+", "", s)
    s = re.sub(r"\s+(hd|sd|fhd|uhd|4k|br)$", "", s)
    s = re.sub(r"\s+brasil$", "", s)
    aliases = {
        "a e": "ae",
        "globo news": "globonews",
        "globonews": "globonews",
        "cnn": "cnn brasil",
        "band brasil": "band",
        "band sp": "band",
        "sbt": "sbt",
        "premiere fc": "premiere clubes",
        "premiere clubes": "premiere clubes",
        "universal tv": "universal",
        "universal channel": "universal",
        "warner channel": "warner",
        "sony channel": "sony",
        "history channel": "history",
        "e": "e",
    }
    s = aliases.get(s, s)
    return s.strip()


def nomes_canais():
    nomes = []
    cat = RAIZ / "catalogo.txt"
    if cat.exists():
        for line in cat.read_text(encoding="utf-8", errors="replace").splitlines():
            if line.lower().startswith("canal:"):
                n = line.split(":", 1)[1].strip()
                if n:
                    nomes.append(n)
    if nomes:
        return nomes
    ch_js = RAIZ / "js" / "channels_data.js"
    if ch_js.exists():
        raw = ch_js.read_text(encoding="utf-8", errors="replace")
        nomes = re.findall(r'"name": "([^"]+)"', raw)
    return nomes


def gerar_epg():
    nomes = nomes_canais()
    wanted = {}
    for n in nomes:
        wanted.setdefault(norm_canal(n), n)

    xml = b""
    for url in EPG_URLS:
        try:
            print("baixando", url)
            xml = baixar_bytes(url)
            if b"<programme" in xml:
                break
        except Exception as e:
            print("falhou", url, e)
            xml = b""
    if not xml:
        print("EPG remoto indisponível")
        return

    text = xml.decode("utf-8", errors="replace")
    name_to_ids = {}
    for m in re.finditer(r'<channel id="([^"]+)">([\s\S]*?)</channel>', text):
        cid, body = m.group(1), m.group(2)
        dn = re.search(r"<display-name[^>]*>([^<]+)</display-name>", body)
        if not dn:
            continue
        key = norm_canal(dn.group(1))
        name_to_ids.setdefault(key, []).append(cid)

    xml_to_ours = {}
    for key, nome in wanted.items():
        ids = name_to_ids.get(key)
        if not ids:
            cands = [k for k in name_to_ids if k.startswith(key + " ") or key.startswith(k + " ")]
            if len(cands) == 1:
                ids = name_to_ids[cands[0]]
        if ids:
            for i in ids:
                xml_to_ours[i] = nome

    agora = int(time.time() * 1000)
    frm, to = agora - 3600_000, agora + 6 * 3600_000
    canais = {}
    for m in re.finditer(
        r'<programme\s+([^>]+)>([\s\S]*?)</programme>',
        text,
    ):
        attrs, body = m.group(1), m.group(2)
        ch = re.search(r'channel="([^"]+)"', attrs)
        st = re.search(r'start="([^"]+)"', attrs)
        sp = re.search(r'stop="([^"]+)"', attrs)
        if not (ch and st and sp):
            continue
        nosso = xml_to_ours.get(ch.group(1))
        if not nosso:
            continue
        start = xmltv_date(st.group(1))
        stop = xmltv_date(sp.group(1))
        if not start or not stop or stop <= frm or start >= to:
            continue
        tm = re.search(r"<title[^>]*>([^<]+)</title>", body)
        if not tm:
            continue
        desc = re.search(r"<desc[^>]*>([^<]+)</desc>", body)
        canais.setdefault(nosso, []).append({
            "title": limpar(decode_ent(tm.group(1))),
            "desc": limpar(decode_ent(desc.group(1) if desc else "")),
            "start": start,
            "stop": stop,
        })

    for lista in canais.values():
        lista.sort(key=lambda p: p["start"])
    saida = {"updated": agora, "janelaHoras": 6, "channels": canais}
    (VOD / "epg.json").write_text(json.dumps(saida, ensure_ascii=False), encoding="utf-8")
    print(f"epg.json: {len(canais)} canais, {sum(len(v) for v in canais.values())} programas")


if __name__ == "__main__":
    import sys
    VOD.mkdir(exist_ok=True)
    if "epg" in sys.argv:
        gerar_epg()
    elif "sinopses" in sys.argv:
        gerar_sinopses()
    else:
        gerar_sinopses()
        gerar_epg()
