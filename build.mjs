import { cpSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const dirs = ["public/uv", "public/baremux", "public/epoxy"];
for (const dir of dirs) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Ultraviolet
cpSync(
  resolve("node_modules/@titaniumnetwork-dev/ultraviolet/dist"),
  "public/uv",
  { recursive: true }
);

// BareMux
cpSync(
  resolve("node_modules/@mercuryworkshop/bare-mux/dist"),
  "public/baremux",
  { recursive: true }
);

// Epoxy
cpSync(
  resolve("node_modules/@mercuryworkshop/epoxy-transport/dist"),
  "public/epoxy",
  { recursive: true }
);

console.log("✅ Build completado");
