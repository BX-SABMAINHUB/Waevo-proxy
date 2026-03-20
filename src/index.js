import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "http";
import { createReadStream, statSync, existsSync } from "fs";
import { resolve, extname } from "path";

const bare = createBareServer("/bare/");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".svg":  "image/svg+xml",
  ".json": "application/json",
  ".wasm": "application/wasm",
};

const server = createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    return bare.routeRequest(req, res);
  }

  let filePath = resolve("public", req.url === "/" ? "index.html" : req.url.slice(1));

  // Fallback a index.html para rutas del service worker
  if (!existsSync(filePath)) {
    filePath = resolve("public", "index.html");
  }

  try {
    const stat = statSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": stat.size,
    });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

bare.upgradeRequest(server);

server.listen(PORT, () => {
  console.log(`🌐 Waevo-Proxy corriendo en http://localhost:${PORT}`);
});
