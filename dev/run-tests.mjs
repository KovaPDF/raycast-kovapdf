// Our own tests for the extension logic. They live outside the extension files
// (the Raycast Store copy holds only the extension), so they are run from here:
//   node dev/run-tests.mjs
import { execFileSync } from "node:child_process";
import { readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, ".test-dist");
rmSync(out, { recursive: true, force: true });
const tsc = path.join(root, "node_modules", "typescript", "bin", "tsc");
execFileSync(process.execPath, [tsc, "-p", path.join(root, "dev", "tsconfig.test.json")], { stdio: "inherit" });
const dir = path.join(out, "dev", "test");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => path.join(dir, f));
execFileSync(process.execPath, ["--test", ...files], { stdio: "inherit" });
