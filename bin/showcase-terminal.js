#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { buildTerminal, serveTerminal } from "../src/terminal.js";

const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

const usage = `showcase-terminal ${version}: build an in-browser terminal demo for a CLI.

Usage:
  showcase-terminal [recipe]  Build the page from a folder with terminal.json (default demo/browser)

Options:
  --out <dir>    Where to write the page (default dist/browser)
  --serve        Serve the page on 127.0.0.1 after building it
  --port <n>     Port for --serve (default 4321)
  --help, -h     Show this help
  --version      Show the version`;

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      out: { type: "string" },
      serve: { type: "boolean" },
      port: { type: "string" },
      help: { type: "boolean", short: "h" },
      version: { type: "boolean" },
    },
  });
  if (values.version) return console.log(version);
  if (values.help) return console.log(usage);
  if (positionals.length > 1) throw new Error("showcase-terminal takes a single recipe folder");

  const { out, bytes } = await buildTerminal(positionals[0] ?? "demo/browser", values.out ?? "dist/browser");
  console.log(`Built ${out} (${Math.round(bytes / 1024)} KB of files)`);
  if (!values.serve) return;
  const port = Number(values.port ?? 4321);
  if (!Number.isInteger(port)) throw new Error("--port must be a number");
  await serveTerminal(out, port);
  console.log(`Serving at http://127.0.0.1:${port} (Ctrl-C to stop)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
