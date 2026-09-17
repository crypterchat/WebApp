import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // One-off Node setup scripts (CommonJS)
    "alter-db.js",
    "alter-db-secret.js",
    "create-logs-table.js",
    "setup-db.js",
    "scripts/**",
  ]),
]);

export default eslintConfig;
