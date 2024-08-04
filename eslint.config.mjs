import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import airbnb from "eslint-config-airbnb";
import airbnbHooks from "eslint-config-airbnb/hooks";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.tsx", "**/*.test.ts"],
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.recommended,
  airbnb,
  airbnbHooks,
  configPrettier,
  pluginPrettier,
  pluginJsxA11y.configs.recommended,
];
