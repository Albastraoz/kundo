import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, "dist", "client");
const templatePath = path.join(clientDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("Missing frontend/dist/client/index.html — run npm run build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");
const { render } = await import(
  pathToFileURL(path.join(__dirname, "dist", "server", "entry-server.mjs")).href
);

const appHtml = render("/");
const html = template.replace("<!--ssr-outlet-->", appHtml);

process.stdout.write(html);
