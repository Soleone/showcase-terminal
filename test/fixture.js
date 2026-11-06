import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// Writes files (strings, buffers or JSON values) into a fresh temporary folder.
export async function fixture(files = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "showcase-terminal-test-"));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(root, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, typeof content === "string" || Buffer.isBuffer(content) ? content : `${JSON.stringify(content, null, 2)}\n`);
  }
  return root;
}
