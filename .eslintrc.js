module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'no-console': 'off',
    'no-duplicate-imports': 'error',
  },
};
