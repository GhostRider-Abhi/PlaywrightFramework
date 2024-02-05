module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended",
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": "error",
  },
};
