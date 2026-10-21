// The kit as source for a standalone page (exports stripped), from anatomy's scripts/inline-kit.mjs.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const kitScript = () => readFileSync(join(dirname(fileURLToPath(import.meta.url)), "iso-kit.mjs"), "utf8").replace(/^export /gm, "");
