# Servidor local: arquivos estáticos + /api/proxy para o Xtream no Chrome.
# Uso: python dev-server.py
# (no lugar de: python -m http.server 8771)

from __future__ import print_function

import json
import os
import random
import re
import sys
import ssl
import socket
import threading
import time

try:
    from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
    from urllib.parse import urlparse, parse_qs, quote
    from urllib.request import Request, urlopen
    from urllib.error import HTTPError, URLError
except ImportError:
    from SimpleHTTPServer import SimpleHTTPRequestHandler
    from SocketServer import ThreadingMixIn
    from BaseHTTPServer import HTTPServer
    from urlparse import urlparse, parse_qs, quote
    from urllib2 import Request, urlopen, HTTPError, URLError

    class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
        daemon_threads = True

PORT = int(os.environ.get("PORT", "8771"))
ROOT = os.path.dirname(os.path.abspath(__file__))
CTX = ssl.create_default_context()
PAREAR = {}
PAREAR_LOCK = threading.Lock()
PAREAR_ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def parear_limpar():
    agora = time.time()
    mortos = [k for k, v in PAREAR.items() if v.get("expira", 0) < agora]
    for k in mortos:
        PAREAR.pop(k, None)


def parear_novo():
    with PAREAR_LOCK:
        parear_limpar()
        for _ in range(20):
            code = "".join(random.choice(PAREAR_ABC) for _ in range(6))
            if code not in PAREAR:
                PAREAR[code] = {"expira": time.time() + 360, "pending": True}
                return code
    return ""


def send_json(handler, obj, status=200):
    body = json.dumps(obj).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Expose-Headers", "*")
        path = self.path.split("?", 1)[0]
        if path != "/api/proxy":
            self.send_header("Cache-Control", "no-store")
        SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Expose-Headers", "*")
        self.end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/proxy":
            self.handle_proxy()
            return
        if path == "/api/lan":
            send_json(self, {"ip": lan_ip(), "port": str(PORT)})
            return
        if path in ("/ligar", "/ligar.html"):
            self.path = "/ligar.html"
            return SimpleHTTPRequestHandler.do_GET(self)
        if path == "/v1/parear/criar":
            send_json(self, {"error": "use POST"}, 405)
            return
        if path.startswith("/v1/parear/"):
            code = path.split("/")[-1].upper()
            with PAREAR_LOCK:
                parear_limpar()
                item = PAREAR.get(code)
                if not item:
                    send_json(self, {"error": "código inválido ou vencido"}, 404)
                    return
                if item.get("pending"):
                    send_json(self, {"pending": True, "code": code})
                    return
                saida = dict(item)
                PAREAR.pop(code, None)
            saida.pop("expira", None)
            saida.pop("pending", None)
            send_json(self, saida)
            return
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        length = int(self.headers.get("Content-Length") or 0)
        if length > 500000:
            send_json(self, {"error": "corpo grande demais"}, 413)
            return
        raw = self.rfile.read(length) if length else b"{}"
        try:
            corpo = json.loads(raw.decode("utf-8") or "{}")
        except Exception:
            corpo = {}
        if path == "/v1/parear/criar":
            code = parear_novo()
            if not code:
                send_json(self, {"error": "não criou código"}, 500)
                return
            send_json(self, {"code": code, "expira": 360})
            return
        if path.startswith("/v1/parear/"):
            code = path.split("/")[-1].upper()
            with PAREAR_LOCK:
                parear_limpar()
                item = PAREAR.get(code)
                if not item:
                    send_json(self, {"error": "código inválido ou vencido"}, 404)
                    return
                tipo = str(corpo.get("tipo") or "")
                if tipo not in ("xtream", "m3u_url", "m3u_txt"):
                    send_json(self, {"error": "tipo inválido"}, 400)
                    return
                if tipo == "xtream":
                    item.update({
                        "pending": False,
                        "tipo": "xtream",
                        "host": str(corpo.get("host") or ""),
                        "user": str(corpo.get("user") or ""),
                        "pass": str(corpo.get("pass") or ""),
                    })
                elif tipo == "m3u_url":
                    item.update({
                        "pending": False,
                        "tipo": "m3u_url",
                        "url": str(corpo.get("url") or ""),
                    })
                else:
                    texto = str(corpo.get("texto") or "")
                    if len(texto) > 400000:
                        send_json(self, {"error": "arquivo grande demais"}, 413)
                        return
                    item.update({
                        "pending": False,
                        "tipo": "m3u_txt",
                        "nome": str(corpo.get("nome") or "lista.m3u"),
                        "texto": texto,
                    })
            send_json(self, {"ok": True})
            return
        send_json(self, {"error": "não encontrado"}, 404)

    def handle_proxy(self):
        qs = parse_qs(urlparse(self.path).query)
        target = (qs.get("url") or [""])[0]
        if not target or not (target.startswith("http://") or target.startswith("https://")):
            self.send_error(400, "url")
            return
        headers = {
            "User-Agent": self.headers.get(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
            ),
            "Accept": "*/*",
        }
        rng = self.headers.get("Range")
        if rng:
            headers["Range"] = rng
        referer = (qs.get("referer") or [""])[0]
        if referer:
            headers["Referer"] = referer
        ua = (qs.get("ua") or [""])[0]
        if ua:
            headers["User-Agent"] = ua
        try:
            req = Request(target, headers=headers)
            resp = urlopen(req, timeout=300, context=CTX if target.startswith("https://") else None)
        except HTTPError as err:
            self.send_response(err.code)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", err.headers.get("Content-Type", "text/plain"))
            self.end_headers()
            try:
                self.wfile.write(err.read()[:800])
            except Exception:
                pass
            return
        except Exception as err:
            body = ('{"error":"proxy local: %s"}' % str(err)).encode("utf-8")
            self.send_response(502)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        ct = resp.headers.get("Content-Type") or "application/octet-stream"
        peek = resp.read(376)
        rest = None
        is_hls = peek.lstrip().startswith(b"#EXTM3U") or "mpegurl" in ct.lower()
        if is_hls:
            rest = peek + resp.read(512 * 1024)
            try:
                text = rest.decode("utf-8", "replace")
            except Exception:
                text = rest.decode("latin-1", "replace")
            base_abs = target.rsplit("/", 1)[0] + "/"

            def sub(url):
                u = (url or "").strip().strip('"').strip("'")
                if not u or u.startswith("#") or "/api/proxy" in u:
                    return url
                if u.startswith("//"):
                    u = "http:" + u
                elif u.startswith("/"):
                    p = urlparse(target)
                    u = p.scheme + "://" + p.netloc + u
                elif not u.startswith("http"):
                    u = base_abs + u
                return "/api/proxy?url=" + quote(u, safe="")

            uri_re = re.compile(r'(URI=)("([^"]*)"|\'([^\']*)\')', re.I)

            def rewrite_line(line):
                if not line.strip():
                    return line
                if line.startswith("#"):
                    if "URI=" in line.upper():
                        def repl(m):
                            raw = m.group(3) if m.group(3) is not None else (m.group(4) or "")
                            return m.group(1) + '"' + sub(raw) + '"'
                        return uri_re.sub(repl, line)
                    return line
                return sub(line)

            out_lines = []
            for line in text.splitlines():
                out_lines.append(rewrite_line(line))
            data = ("\n".join(out_lines) + "\n").encode("utf-8")
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "application/vnd.apple.mpegurl")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            resp.close()
            return

        status = getattr(resp, "status", 200)
        is_ts = len(peek) > 0 and peek[:1] == b"\x47"
        if len(peek) >= 8 and peek[4:8] == b"ftyp":
            ct = "video/mp4"
        elif is_ts:
            ct = "video/mp2t"
        self.send_response(status)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Expose-Headers", "*")
        self.send_header("Content-Type", ct)
        cl = resp.headers.get("Content-Length")
        if cl and peek and not is_ts:
            try:
                self.send_header("Content-Length", str(int(cl)))
            except Exception:
                pass
        cr = resp.headers.get("Content-Range")
        if cr:
            self.send_header("Content-Range", cr)
        if not is_ts:
            self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        try:
            if peek:
                self.wfile.write(peek)
            while True:
                chunk = resp.read(16 * 1024 if is_ts else 32 * 1024)
                if not chunk:
                    break
                self.wfile.write(chunk)
                try:
                    self.wfile.flush()
                except Exception:
                    pass
        except Exception:
            pass
        try:
            resp.close()
        except Exception:
            pass


def main():
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print("Saimo local em http://127.0.0.1:%s/  (proxy em /api/proxy)" % PORT)
    print("Celular na mesma rede: http://%s:%s/ligar.html" % (lan_ip(), PORT))
    httpd.serve_forever()


if __name__ == "__main__":
    main()
