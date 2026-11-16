#!/usr/bin/env python3
"""Gera vod/adultos.txt: IDs TMDB adultos + títulos do acervo local.

Usa a flag adult do TMDB (discover) e uma lista de palavras revisada.
Títulos inocentes (O Oposto do Sexo) não entram.
"""
from __future__ import annotations

import json
import os
import re
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
VOD = RAIZ / "vod"
CHAVE = (os.environ.get("TMDB_KEY") or "15d2ea6d0dc1d476efbca3eba2b9bbfb").strip()
TMDB = "https://api.themoviedb.org/3"
UA = "Mozilla/5.0 (WebOS; SaimoTV) AppleWebKit/537.36"

FORTE = re.compile(
    r"(?:\bporn|\bporno\b|\bpornhub|\bxvideos|\bxhamster|\bredtube|"
    r"\byouporn|\bbrazzers|\bbrasileirinhas|\bonlyfans|\bninfoman|"
    r"\bhustler|\bpenthouse|\bplayboy|\bsexy hot|\bsex prive|\bsexprive|"
    r"\b\+18\b|\b18\+|\berotic|\berotico\b|\berotica\b|"
    r"^adulto |\badult material\b|\bxxx \d|\bxxx [a-z])",
    re.I,
)
LIVRE = {
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
    "xxx reactivated the return of xander cage",
}


def fold(s: str) -> str:
    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\s*\(\d{4}\)\s*$", "", s)
    s = re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()
    return s


def livre(lc: str) -> bool:
    for x in LIVRE:
        if lc == x:
            return True
        if " " in x and (lc.startswith(x + " ") or lc.startswith(x + " ")):
            return True
    return False


def pedir(url: str, timeout: int = 25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            return json.loads(res.read().decode("utf-8"))
    except Exception:
        return None


def ids_fichas() -> dict[int, str]:
    out: dict[int, str] = {}
    path = VOD / "fichas.txt"
    if not path.exists():
        return out
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if not line or line.startswith("#") or line.startswith("capa:"):
            continue
        cols = line.split("\t")
        if len(cols) < 3:
            continue
        titulo = cols[1].strip()
        try:
            tid = int(cols[2])
        except ValueError:
            continue
        if tid and titulo:
            out[tid] = titulo
    return out


def varrer_letras() -> tuple[set[int], set[str]]:
    ids: set[int] = set()
    titulos: set[str] = set()
    for path in sorted(VOD.glob("filmes-*.txt")) + sorted(VOD.glob("series-*.txt")):
        if path.name.endswith(tuple(f"-{i}.txt" for i in range(12))):
            continue
        texto = path.read_text(encoding="utf-8", errors="replace")
        for line in texto.splitlines():
            if not line or line.startswith("#"):
                continue
            titulo = line.split("\t", 1)[0].strip()
            lc = fold(titulo)
            if not lc or livre(lc):
                continue
            if FORTE.search(lc):
                titulos.add(titulo)
            for m in re.finditer(r"tmdb[_/](\d+)", line, re.I):
                tid = int(m.group(1))
                if FORTE.search(lc):
                    ids.add(tid)
                    titulos.add(titulo)
    return ids, titulos


def discover_adult(kind: str, teto_paginas: int = 40) -> set[int]:
    ids: set[int] = set()
    if not CHAVE:
        return ids
    for page in range(1, teto_paginas + 1):
        q = urllib.parse.urlencode(
            {
                "api_key": CHAVE,
                "include_adult": "true",
                "language": "pt-BR",
                "page": page,
                "sort_by": "popularity.desc",
            }
        )
        data = pedir(f"{TMDB}/discover/{kind}?{q}")
        if not data or not data.get("results"):
            break
        for row in data["results"]:
            if row.get("adult") and row.get("id"):
                ids.add(int(row["id"]))
        total = int(data.get("total_pages") or page)
        if page >= min(total, teto_paginas):
            break
        time.sleep(0.12)
    return ids


def main() -> None:
    fichas = ids_fichas()
    ids_letra, titulos = varrer_letras()
    ids: set[int] = set(ids_letra)
    for tid, titulo in fichas.items():
        lc = fold(titulo)
        if livre(lc):
            continue
        if FORTE.search(lc):
            ids.add(tid)
            titulos.add(titulo)
    print(f"local: {len(ids)} ids · {len(titulos)} títulos")
    try:
        disc_f = discover_adult("movie", 3)
        disc_s = discover_adult("tv", 3)
        cruzados = (disc_f | disc_s) & set(fichas)
        ids |= cruzados
        for tid in cruzados:
            titulos.add(fichas[tid])
        print(f"tmdb discover: filmes {len(disc_f)} · séries {len(disc_s)} · no acervo {len(cruzados)}")
    except Exception as e:
        print("tmdb discover falhou:", e)

    linhas = [
        "# IDs TMDB adultos e títulos extras do acervo Saimo.",
        "# Gerado por gerar_adultos.py — não editar à mão.",
        "#ids",
    ]
    for tid in sorted(ids):
        linhas.append(str(tid))
    linhas.append("#titulos")
    vistos = set()
    for t in sorted(titulos, key=lambda s: fold(s)):
        lc = fold(t)
        if not lc or lc in vistos or livre(lc):
            continue
        vistos.add(lc)
        linhas.append(t)
    dest = VOD / "adultos.txt"
    dest.write_text("\n".join(linhas) + "\n", encoding="utf-8")
    print(f"escreveu {dest} · {len(ids)} ids · {len(vistos)} títulos")


if __name__ == "__main__":
    main()
