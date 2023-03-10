module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-unused-vars': 'off',
    'no-irregular-whitespace': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'

  },
  "globals": {
    "error": true,
    "emit": true
  }
}
