module.exports = {
  'env': {
    'node': true,
    'es2020': true,
    'mocha': true,
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'igrnoePatterns': ['.eslintrc.js'],
  'plugins': ['@typescript-eslint'],
  'rules': {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'curly': ['error', 'all'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'require-atomic-updates': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
