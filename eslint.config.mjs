import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
      "next/core-web-vitals",
      "next/typescript",
  ),
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      semi: "error",
      indent: ["error", 4, { "SwitchCase": 1 }],
      curly: "error",
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
    },
  }
];

export default eslintConfig;
