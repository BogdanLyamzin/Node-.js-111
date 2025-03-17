import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  },
];