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


EPG_STOP = {"tv", "canal", "rede", "br", "the", "channel"}
EPG_UFS = {"sp", "rj", "mg", "df", "es", "go", "rs", "pr", "ba", "pe", "ce", "am", "pa"}
EPG_PREF = {
    "globo": ("globo sp", "tv globo sao paulo", "globo sao paulo", "rede globo"),
    "band": ("band", "band sp", "band brasil"),
    "sbt": ("sbt", "sbt sp", "sbt brasil"),
    "record": ("recordtv", "recordtv sp", "record br"),
    "cnn": ("cnn brasil",),
    "sony": ("sony", "sony channel"),
    "warner": ("warner", "warner channel"),
    "universal": ("universal", "universal tv", "universal channel"),
    "nickelodeon": ("nick",),
    "nicktoons": ("nick jr",),
    "agro mais": ("agromais", "agromais br"),
    "agro": ("agromais", "agromais br"),
}


def norm_canal(s: str) -> str:
    s = fold(decode_ent(s))
    s = re.sub(r"^(tv|canal|rede|br)\s+", "", s)
    s = re.sub(r"\b(fhd|uhd|4k|8k|full hd|hd|sd|hevc|h265|h264|backup|option|feed)\b", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
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
        "record tv": "record",
        "hbo 2": "hbo2",
        "hbo mais": "hbo plus",
        "band sports": "bandsports",
        "band sports hd": "bandsports",
        "sport tv": "sportv",
        "sport tv 2": "sportv 2",
        "sport tv 3": "sportv 3",
        "discovery id": "investigacao discovery",
        "investigation discovery": "investigacao discovery",
        "e": "e",
        "nickelodeon": "nick",
        "nicktoons brasil": "nick jr",
        "nicktoons": "nick jr",
        "nickonline": "nick",
        "agro mais": "agromais",
        "canal agro": "agromais",
        "agro": "agromais",
        "record sp": "recordtv sp",
        "record rj": "record tv rj",
        "record go": "record tv goias",
    }
    return aliases.get(s, s)


def compact_canal(s: str) -> str:
    t = (s or "").replace(" ", "")
    if t.endswith("br") and len(t) > 4:
        t = t[:-2]
    return t


def tokens_flex(s: str):
    out = []
    for t in (s or "").split():
        if t in EPG_STOP:
            continue
        if len(t) > 4 and t.endswith("tv"):
            t = t[:-2]
        out.append(t)
    return out


def escolher_xml_key(key: str, xml_keys):
    if not key:
        return None
    if key in xml_keys:
        return key
    ck = compact_canal(key)
    for k in xml_keys:
        if compact_canal(k) == ck:
            return k
    for pref in EPG_PREF.get(key, ()):
        if pref in xml_keys:
            return pref
        pk = compact_canal(pref)
        for k in xml_keys:
            if compact_canal(k) == pk:
                return k
    prefix = [k for k in xml_keys if k.startswith(key + " ")]
    if prefix:
        prefix.sort(key=lambda k: (len(k.split()), len(k)))
        return prefix[0]
    shorter = [k for k in xml_keys if key.startswith(k + " ") and len(k) >= 3]
    if shorter:
        shorter.sort(key=lambda k: -len(k))
        return shorter[0]
    ct = tokens_flex(key)
    iguais = [k for k in xml_keys if tokens_flex(k) == ct]
    if iguais:
        iguais.sort(key=len)
        return iguais[0]
    toks = [t for t in key.split() if t not in EPG_STOP]
    if not toks:
        return None
    scored = []
    for k in xml_keys:
        kt = tokens_flex(k)
        kset = set(kt)
        if ct and all(t in kset for t in ct):
            scored.append((0, len(kt), k))
            continue
        if len(ct) >= 2 and ct[-1] in EPG_UFS and ct[:-1] == kt:
            scored.append((1, len(kt), k))
            continue
        old = set(k.split())
        if all(t in old for t in toks):
            scored.append((2, len(k.split()) - len(toks), k))
    if scored:
        scored.sort()
        return scored[0][2]
    return None


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


def parse_xmltv_canais(text: str):
    id_meta = {}
    for m in re.finditer(r'<channel id="([^"]+)">([\s\S]*?)</channel>', text):
        cid, body = m.group(1), m.group(2)
        dn = re.search(r"<display-name[^>]*>([^<]+)</display-name>", body)
        if not dn:
            continue
        raw = decode_ent(dn.group(1)).strip()
        key = norm_canal(raw)
        if key:
            id_meta[cid] = (key, raw)
    return id_meta


def programas_epg_janela(text, id_meta, frm, to, dest, nomes):
    for m in re.finditer(r'<programme\s+([^>]+)>([\s\S]*?)</programme>', text):
        attrs, body = m.group(1), m.group(2)
        ch = re.search(r'channel="([^"]+)"', attrs)
        st = re.search(r'start="([^"]+)"', attrs)
        sp = re.search(r'stop="([^"]+)"', attrs)
        if not (ch and st and sp):
            continue
        meta = id_meta.get(ch.group(1))
        if not meta:
            continue
        key, raw = meta
        start = xmltv_date(st.group(1))
        stop = xmltv_date(sp.group(1))
        if not start or not stop or stop <= frm or start >= to:
            continue
        tm = re.search(r"<title[^>]*>([^<]+)</title>", body)
        if not tm:
            continue
        desc = re.search(r"<desc[^>]*>([^<]+)</desc>", body)
        d = limpar(decode_ent(desc.group(1) if desc else ""))
        if len(d) > 120:
            d = d[:117] + "…"
        lista = dest.setdefault(key, [])
        if len(lista) >= 14:
            continue
        title = limpar(decode_ent(tm.group(1)))
        if any(p["start"] == start and p["title"] == title for p in lista):
            continue
        lista.append({"title": title, "desc": d, "start": start, "stop": stop})
        nomes.setdefault(key, raw)


def gerar_epg():
    nomes = nomes_canais()

    agora = int(time.time() * 1000)
    frm, to = agora - 3600_000, agora + 6 * 3600_000
    progs = {}
    xml_nomes = {}
    algum = False
    for url in EPG_URLS:
        try:
            print("baixando", url)
            xml = baixar_bytes(url)
        except Exception as e:
            print("falhou", url, e)
            continue
        if b"<programme" not in xml:
            continue
        algum = True
        text = xml.decode("utf-8", errors="replace")
        programas_epg_janela(text, parse_xmltv_canais(text), frm, to, progs, xml_nomes)
    if not algum or not progs:
        print("EPG remoto indisponível")
        return

    xml_keys = list(progs.keys())
    canais = {}

    def colocar(rotulo, key):
        lista = progs.get(key)
        if not rotulo or not lista:
            return
        prev = canais.get(rotulo)
        if not prev or len(lista) > len(prev):
            canais[rotulo] = lista

    usados = set()
    for nome in nomes:
        xml_key = escolher_xml_key(norm_canal(nome), xml_keys)
        if not xml_key:
            continue
        usados.add(xml_key)
        colocar(nome, xml_key)
        xml_nome = xml_nomes.get(xml_key)
        if xml_nome and xml_nome != nome:
            colocar(xml_nome, xml_key)

    for xml_key, xml_nome in xml_nomes.items():
        if xml_key in usados or xml_key not in progs:
            continue
        rotulo = xml_nome or xml_key
        if rotulo not in canais:
            colocar(rotulo, xml_key)

    for lista in canais.values():
        lista.sort(key=lambda p: p["start"])
    saida = {"updated": agora, "janelaHoras": 6, "channels": canais}
    (VOD / "epg.json").write_text(json.dumps(saida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"epg.json: {len(canais)} nomes, {len(usados)} do catálogo, {sum(len(v) for v in canais.values())} programas")


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
