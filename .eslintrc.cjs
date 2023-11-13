module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  globals: {
    google: 'readonly'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    // https://typescript-eslint.io/architecture/parser/#project
    project: ['./tsconfig.json', , './tsconfig.node.json']
  },
  ignorePatterns: [
    'tsconfig.json',
    'package.json',
    '.eslintrc.cjs',
    'postcss.config.cjs',
    'tsconfig.node.json',
    'uno.config.ts',
    'vite.config.ts'
  ]
}
