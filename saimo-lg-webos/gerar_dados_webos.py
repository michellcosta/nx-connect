#!/usr/bin/env python3
"""Gera js/channels_data.js e js/vod_data.js a partir dos txt do pacote.

Na webOS o fetch remoto dos shards costuma falhar; por isso embutimos fontes
dos títulos de destaques.txt (Em alta, Lançamentos…) direto no vod_data.js.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
VOD = RAIZ / "vod"
JS = RAIZ / "js"

_SHARD_CACHE: dict[str, list[str]] = {}
_BASES: dict[int, str] = {}


def norm_title(t: str) -> str:
    t = (t or "").strip().lower()
    t = re.sub(r"\s*\(\d{4}\)\s*$", "", t)
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def load_bases() -> dict[int, str]:
    global _BASES
    if _BASES:
        return _BASES
    indice = VOD / "indice.txt"
    if not indice.is_file():
        return _BASES
    for raw in indice.read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw.strip()
        if not line.startswith("base:"):
            continue
        parts = line.split()
        if len(parts) >= 3:
            try:
                _BASES[int(parts[1], 10)] = parts[2]
            except ValueError:
                pass
    return _BASES


def expand_token(token: str) -> str:
    token = (token or "").strip()
    if not token:
        return ""
    if token.startswith("http://") or token.startswith("https://"):
        return token
    if ":" not in token:
        return ""
    bases = load_bases()
    idx_s, rest = token.split(":", 1)
    try:
        idx = int(idx_s, 10)
    except ValueError:
        return ""
    base = bases.get(idx)
    if not base:
        return ""
    return base + rest if "." in rest else f"{base}{rest}.mp4"


def parse_fontes_linha(cols: list[str]) -> list[dict]:
    out: list[dict] = []
    for part in cols[1:]:
        part = part.strip()
        if "=" not in part:
            continue
        audio_raw, payload = part.split("=", 1)
        audio = "LEG" if audio_raw.strip().lower() == "leg" else "DUB"
        for i, raw in enumerate(payload.split(",")):
            url = expand_token(raw)
            if not url:
                continue
            label = "Legendado" if audio == "LEG" else "Dublado"
            out.append({
                "url": url,
                "quality": f"{label} ({i + 1})",
                "audio": audio,
                "referer": "",
                "agent": "",
            })
    return out


def shard_lines(letter: str) -> list[str]:
    gaveta = "hash" if letter == "#" else letter.upper()
    key = gaveta
    if key in _SHARD_CACHE:
        return _SHARD_CACHE[key]
    path = VOD / f"filmes-{gaveta}.txt"
    if not path.is_file():
        _SHARD_CACHE[key] = []
        return []
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    _SHARD_CACHE[key] = lines
    return lines


def sources_for_movie(title: str, letter_hint: str) -> list[dict]:
    want = norm_title(title)
    if not want:
        return []
    letters: list[str] = []
    if letter_hint:
        letters.append(letter_hint)
    ch = re.sub(r"^[^0-9A-Za-z]+", "", title or "").strip()[:1]
    if ch.isdigit() or ch == "#":
        letters.append("#")
    elif ch:
        letters.append(ch.upper())
    for L in "ABCDEFGHIJKLMNOPQRSTUVWXYZ#":
        if L not in letters:
            letters.append(L)

    seen_shard: set[str] = set()
    for letter in letters:
        gaveta = "hash" if letter == "#" else letter.upper()
        if gaveta in seen_shard:
            continue
        seen_shard.add(gaveta)
        for raw in shard_lines(letter):
            if not raw.strip() or raw.startswith("#"):
                continue
            cols = raw.split("\t")
            if len(cols) < 2:
                continue
            if norm_title(cols[0]) != want:
                continue
            fontes = parse_fontes_linha(cols)
            if fontes:
                return fontes[:12]
    return []


def is_letra_cat(k: str) -> bool:
    return k == "#" or (len(k) == 1 and k.isalpha())


def enrich_vod_sources(rows: dict) -> None:
    """Só destaques (Em alta, Lançamentos…), não as gavetas A–Z inteiras."""
    for sec, items in rows.items():
        if is_letra_cat(sec):
            continue
        for it in items:
            if it.get("type") != "movie":
                continue
            if it.get("sources"):
                continue
            fontes = sources_for_movie(it.get("title", ""), it.get("letter", "A"))
            if fontes:
                it["sources"] = fontes


def parse_catalogo(text: str) -> dict:
    channels = []
    categories = ["Todos"]
    seen_cat = {"Todos"}
    current = None
    src = None
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip().lower()
        value = value.strip()
        if key == "canal":
            if current and current["sources"]:
                channels.append(current)
            current = {"type": "channel", "name": value, "category": "Geral", "logo": "", "sources": []}
            src = None
        elif key == "categoria" and current:
            current["category"] = value
            if value not in seen_cat:
                seen_cat.add(value)
                categories.append(value)
        elif key == "logo" and current:
            current["logo"] = value
        elif key == "fonte" and current:
            src = {"url": value, "quality": "Automática", "referer": "", "agent": ""}
            current["sources"].append(src)
        elif key == "qualidade" and src:
            src["quality"] = value
        elif key == "referer" and src:
            src["referer"] = value
        elif key == "agente" and src:
            src["agent"] = value
    if current and current["sources"]:
        channels.append(current)
    return {"channels": channels, "categories": categories}


def year_of(title: str) -> str:
    m = re.search(r"\((\d{4})\)\s*$", title)
    return m.group(1) if m else ""


def letter_of(title: str, fallback: str) -> str:
    t = (title or "").strip()
    if not t:
        return fallback or "A"
    ch = t[0].upper()
    if ch.isdigit() or ch == "#":
        return "#"
    return ch if "A" <= ch <= "Z" else fallback or "A"


def parse_destaques(text: str) -> tuple[dict, dict, str]:
    filmes, series = {}, {}
    section = "Em alta"
    poster_base = "https://image.tmdb.org/t/p/w342"
    is_series = False
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("capa:"):
            parts = line.split()
            if len(parts) >= 2:
                poster_base = parts[1]
            continue
        if line.startswith("fila\t") or line.startswith("fila "):
            section = re.sub(r"^fila[\t ]+", "", line).strip()
            is_series = bool(re.search(r"série|series|anime|dorama", section, re.I))
            continue
        cols = line.split("\t")
        if len(cols) < 3:
            continue
        tipo, title, letter = cols[0].strip(), cols[1].strip(), cols[2].strip()
        year = cols[3].strip() if len(cols) > 3 else ""
        poster = cols[4].strip() if len(cols) > 4 else ""
        item = {
            "type": "series" if tipo == "s" or is_series else "movie",
            "title": title,
            "letter": letter or letter_of(title, "A"),
            "year": year,
            "posterUrl": (poster_base + poster) if poster else "",
            "section": section,
        }
        bucket = series if item["type"] == "series" else filmes
        bucket.setdefault(section, []).append(item)
    return filmes, series, poster_base


def filmes_por_letra() -> dict:
    rows = {}
    for path in sorted(VOD.glob("filmes-*.txt")):
        letter = path.stem.split("-", 1)[-1]
        if letter.lower() == "hash":
            letter = "#"
        lista = []
        vistos = set()
        for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
            if not raw.strip() or raw.startswith("#"):
                continue
            title = raw.split("\t", 1)[0].strip()
            if not title or title.lower() in vistos:
                continue
            vistos.add(title.lower())
            lista.append({
                "type": "movie",
                "title": title,
                "letter": letter,
                "year": year_of(title),
                "posterUrl": "",
            })
        if lista:
            rows[letter] = lista
    return rows


def series_por_letra() -> dict:
    rows = {}
    for path in sorted(VOD.glob("series-*.txt")):
        stem = path.stem
        if re.search(r"-\d+$", stem):
            continue
        letter = stem.split("-", 1)[-1]
        if letter.lower() == "hash":
            letter = "#"
        lista = []
        vistos = set()
        for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
            if not raw.strip() or raw.startswith("#"):
                continue
            cols = raw.split("\t")
            title = cols[0].strip()
            if not title or title.lower() in vistos:
                continue
            vistos.add(title.lower())
            year = ""
            if len(cols) >= 2 and re.fullmatch(r"\d{4}", cols[1].strip()):
                year = cols[1].strip()
            lista.append({
                "type": "series",
                "title": title,
                "letter": letter,
                "year": year,
                "posterUrl": "",
            })
        if lista:
            rows[letter] = lista
    return rows


def escrever_js(path: Path, nome: str, data) -> None:
    body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    path.write_text(f"window.{nome} = {body};\n", encoding="utf-8")
    print(f"{path.name}: {path.stat().st_size // 1024} KB")


def main() -> None:
    JS.mkdir(exist_ok=True)
    cat = parse_catalogo((RAIZ / "catalogo.txt").read_text(encoding="utf-8", errors="replace"))
    escrever_js(JS / "channels_data.js", "SAIMO_CHANNELS_DATA", cat)
    print(f"  {len(cat['channels'])} canais")

    dest_filmes, dest_series, _ = parse_destaques(
        (VOD / "destaques.txt").read_text(encoding="utf-8", errors="replace")
    )
    filmes = filmes_por_letra()
    series = series_por_letra()
    for k, v in dest_filmes.items():
        filmes[k] = v
    for k, v in dest_series.items():
        series[k] = v
    load_bases()
    enrich_vod_sources(filmes)
    enrich_vod_sources(series)
    bases_js = {str(k): v for k, v in load_bases().items()}
    escrever_js(JS / "vod_bases.js", "SAIMO_VOD_BASES", bases_js)
    escrever_js(JS / "vod_data.js", "SAIMO_VOD_DATA", {"filmesRows": filmes, "seriesRows": series})
    n_f = sum(len(v) for v in filmes.values())
    n_s = sum(len(v) for v in series.values())
    print(f"  {n_f} filmes, {n_s} séries")


if __name__ == "__main__":
    main()
