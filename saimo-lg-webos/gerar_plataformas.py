#!/usr/bin/env python3
"""Gera vod/plataformas.txt: IDs TMDB do catálogo disponíveis em cada streaming no BR.

Consulta discover + with_watch_providers (JustWatch via TMDB), não um GET por título.
Regenere todo mês. Crédito obrigatório: JustWatch.

  TMDB_KEY=... python gerar_plataformas.py
  python gerar_plataformas.py --listar   # todos os provedores BR + casamento
"""
from __future__ import annotations

import argparse
import json
import os
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
VOD = RAIZ / "vod"
TMDB = "https://api.themoviedb.org/3"
UA = "Mozilla/5.0 (compatible; SaimoTV/plataformas)"
PAUSA = 0.28
# Assinatura, grátis, anúncio, aluguel e compra — senão Pluto/YouTube/loja Apple ficam vazios.
MONETIZACAO = "flatrate|free|ads|rent|buy"

# (rótulo no menu, aliases TMDB, IDs se o nome na API for ambíguo)
ALVOS = [
    ("Netflix", ("netflix",), (8,)),
    ("Prime Video", ("amazon prime video", "prime video"), (119,)),
    ("Apple TV+", ("apple tv+", "apple tv plus"), (350,)),
    ("Disney+", ("disney plus", "disney+"), (337,)),
    ("Max", ("max", "hbo max"), (1899,)),
    ("Globoplay", ("globoplay",), (307,)),
    ("Paramount+", ("paramount+", "paramount plus"), (531,)),
    ("Looke", ("looke",), (47,)),
    ("Pluto TV", ("pluto tv", "pluto"), (300,)),
    ("Mercado Play", ("mercado play",), (2302,)),
    ("Oldflix", ("oldflix",), (499,)),
    ("Claro tv+", ("claro tv+", "claro tv plus"), (484,)),
    ("Amazon Filmes", ("amazon video",), (10,)),
    ("Apple TV", ("apple tv store", "itunes"), (2,)),
    ("Crunchyroll", ("crunchyroll",), (283,)),
    ("MUBI", ("mubi",), (11,)),
]


def fold(s: str) -> str:
    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return s.lower().strip()


def chave() -> str:
    k = (os.environ.get("TMDB_KEY") or "").strip()
    if k:
        return k
    raise SystemExit("Defina TMDB_KEY no ambiente (chave do TMDB).")


def pedir(path: str, params: dict, key: str):
    q = dict(params)
    q["api_key"] = key
    url = TMDB + path + "?" + urllib.parse.urlencode(q)
    ultimo = None
    for tentativa in range(12):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=90) as res:
                return json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            ultimo = e
            if e.code in (429, 500, 502, 503) and tentativa < 11:
                time.sleep(min(60, 3 * (tentativa + 1)))
                continue
            raise
        except (TimeoutError, urllib.error.URLError, OSError) as e:
            ultimo = e
            if tentativa < 11:
                print("  (rede: %s, nova tentativa %d)" % (e, tentativa + 2))
                time.sleep(min(90, 4 * (tentativa + 1)))
                continue
            raise
    if ultimo:
        raise ultimo
    return {}


def ids_catalogo(path: Path) -> dict[str, set[int]]:
    out = {"f": set(), "s": set()}
    if not path.exists():
        raise SystemExit("Não achei " + str(path))
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if not line or line[0] == "#":
            continue
        cols = line.split("\t")
        if len(cols) < 3 or cols[0] not in ("f", "s"):
            continue
        try:
            tid = int(cols[2])
        except ValueError:
            continue
        if tid:
            out[cols[0]].add(tid)
    return out


def provedores_br(key: str, tipo: str) -> list[dict]:
    data = pedir("/watch/providers/" + tipo, {"watch_region": "BR", "language": "pt-BR"}, key)
    time.sleep(PAUSA)
    return data.get("results") or []


def imprimir_todos(lista: list[dict], titulo: str) -> None:
    print(titulo)
    itens = sorted(lista, key=lambda p: fold(p.get("provider_name") or ""))
    for p in itens:
        pid = p.get("provider_id")
        nome = p.get("provider_name") or ""
        print("    %4s  %s" % (pid, nome))
    print("  (%d provedores)" % len(itens))


def casar_provedores(lista: list[dict]) -> list[tuple[str, list[int], list[str]]]:
    por_nome = {}
    por_id = {}
    for p in lista:
        nome = fold(p.get("provider_name") or "")
        pid = p.get("provider_id")
        if not pid:
            continue
        pid = int(pid)
        por_id[pid] = p.get("provider_name") or ""
        if nome:
            por_nome.setdefault(nome, []).append((pid, p.get("provider_name") or ""))
    usados = set()
    saida = []
    for rotulo, aliases, fallbacks in ALVOS:
        ids = []
        nomes = []

        def add(pid, original):
            if pid in ids or pid in usados:
                return
            ids.append(pid)
            nomes.append(original)
            usados.add(pid)

        for alias in aliases:
            for pid, original in por_nome.get(alias, []):
                add(pid, original)
        if not ids:
            for nome, pares in por_nome.items():
                if any(alias in nome for alias in aliases):
                    for pid, original in pares:
                        add(pid, original)
        for pid in fallbacks:
            if pid in por_id:
                add(pid, por_id[pid])
        saida.append((rotulo, ids, nomes))
    return saida


CACHE = RAIZ / ".plats_cache"


def cache_path(rotulo: str, tipo: str, provider_ids: list[int]) -> Path:
    slug = fold(rotulo).replace(" ", "_").replace("+", "plus")
    pids = "-".join(str(i) for i in provider_ids)
    return CACHE / ("%s_%s_%s.json" % (slug, tipo, pids))


def discover_ids(key: str, tipo: str, provider_ids: list[int], rotulo: str = "") -> set[int]:
    if not provider_ids:
        return set()
    arq = cache_path(rotulo or "x", tipo, provider_ids)
    if arq.exists():
        try:
            data = json.loads(arq.read_text(encoding="utf-8"))
            ids = {int(x) for x in data}
            print("  (cache %s %s: %d ids)" % (rotulo, tipo, len(ids)))
            return ids
        except (OSError, ValueError, TypeError):
            pass
    path = "/discover/movie" if tipo == "movie" else "/discover/tv"
    ids: set[int] = set()
    page = 1
    total = 1
    while page <= total and page <= 500:
        data = pedir(
            path,
            {
                "watch_region": "BR",
                "with_watch_providers": "|".join(str(i) for i in provider_ids),
                "with_watch_monetization_types": MONETIZACAO,
                "sort_by": "popularity.desc",
                "page": page,
                "language": "pt-BR",
            },
            key,
        )
        time.sleep(PAUSA)
        total = int(data.get("total_pages") or 1)
        for r in data.get("results") or []:
            if r.get("id"):
                ids.add(int(r["id"]))
        if not (data.get("results") or []):
            break
        page += 1
    CACHE.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps(sorted(ids)), encoding="utf-8")
    return ids


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--listar", action="store_true", help="só lista provedores BR e sai")
    args = ap.parse_args()
    key = chave()

    movie_p = provedores_br(key, "movie")
    tv_p = provedores_br(key, "tv")
    imprimir_todos(movie_p, "Todos os provedores BR (filme):")
    imprimir_todos(tv_p, "Todos os provedores BR (série):")
    casados_f = casar_provedores(movie_p)
    casados_s = casar_provedores(tv_p)
    print("Casamento:")
    for rotulo, ids, nomes in casados_f:
        print("  filme  %-16s  ids=%s  (%s)" % (rotulo, ids or "—", ", ".join(nomes) or "não achei"))
    for rotulo, ids, nomes in casados_s:
        print("  série  %-16s  ids=%s  (%s)" % (rotulo, ids or "—", ", ".join(nomes) or "não achei"))
    if args.listar:
        return

    cat = ids_catalogo(VOD / "fichas.txt")
    print("Catálogo com ID TMDB: %d filmes, %d séries" % (len(cat["f"]), len(cat["s"])))
    linhas = [
        "# Disponibilidade no Brasil. Dados TMDB / JustWatch. Regenerar todo mês.",
        "# gerado\t" + date.today().isoformat(),
        "# Use só o nome em texto, sem logotipo.",
        "# monetizacao\t" + MONETIZACAO,
    ]
    ordem = []
    uniao_f, uniao_s = set(), set()
    mapa_f = {n: i for n, i, _ in casados_f}
    mapa_s = {n: i for n, i, _ in casados_s}
    for rotulo, _aliases, _fb in ALVOS:
        pf, ps = mapa_f.get(rotulo) or [], mapa_s.get(rotulo) or []
        if pf:
            linhas.append("# provider\t%s\tf\t%s" % (rotulo, ",".join(str(x) for x in pf)))
        if ps:
            linhas.append("# provider\t%s\ts\t%s" % (rotulo, ",".join(str(x) for x in ps)))
        hit_f = sorted(discover_ids(key, "movie", pf, rotulo) & cat["f"]) if pf else []
        hit_s = sorted(discover_ids(key, "tv", ps, rotulo) & cat["s"]) if ps else []
        uniao_f.update(hit_f)
        uniao_s.update(hit_s)
        print("  %s: %d filmes, %d séries no catálogo" % (rotulo, len(hit_f), len(hit_s)))
        if hit_f:
            linhas.append("\t".join([rotulo, "f"] + [str(i) for i in hit_f]))
        if hit_s:
            linhas.append("\t".join([rotulo, "s"] + [str(i) for i in hit_s]))
        if hit_f or hit_s:
            ordem.append(rotulo)
    linhas.append("ordem\t" + "\t".join(ordem))
    dest = VOD / "plataformas.txt"
    dest.write_text("\n".join(linhas) + "\n", encoding="utf-8")
    print(
        "união: %d filmes (%.0f%%), %d séries (%.0f%%) em alguma plataforma"
        % (
            len(uniao_f),
            100.0 * len(uniao_f) / max(1, len(cat["f"])),
            len(uniao_s),
            100.0 * len(uniao_s) / max(1, len(cat["s"])),
        )
    )
    print("fora: %d filmes, %d séries" % (len(cat["f"]) - len(uniao_f), len(cat["s"]) - len(uniao_s)))
    print("gravou", dest, "(%d linhas)" % len(linhas))


if __name__ == "__main__":
    main()
