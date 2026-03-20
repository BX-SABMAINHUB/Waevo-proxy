import { createRequire } from "module";
import { cpSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const uvPath = dirname(require.resolve("@titaniumnetwork-dev/ultraviolet"));
const baremuxPath = dirname(require.resolve("@mercuryworkshop/bare-mux/package.json"));
const epoxyPath = dirname(require.resolve("@mercuryworkshop/epoxy-transport/package.json"));

const dirs = [
  "public/uv",
  "public/baremux",
  "public/epoxy",
];

for (const dir of dirs) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Copia archivos de Ultraviolet
cpSync(uvPath, "public/uv", { recursive: true });

// Copia BareMux
cpSync(resolve(baremuxPath, "dist"), "public/baremux", { recursive: true });

// Copia Epoxy
cpSync(resolve(epoxyPath, "dist"), "public/epoxy", { recursive: true });

console.log("✅ Build completado - archivos copiados a /public");
