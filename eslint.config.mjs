import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Flat ESLint config. Next.js 16 removed `next lint`; we run the ESLint CLI
 * directly (`pnpm lint`). See node_modules/next/dist/docs/.../03-eslint.md.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Payload writes generated types here (Phase 1); not ours to lint.
    "src/payload-types.ts",
    "**/*.db",
  ]),
]);

export default eslintConfig;
