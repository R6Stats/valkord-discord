module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules:  {
    '@typescript-eslint/indent': ['error', 2],
    'camelcase': 'off',
    '@typescript-eslint/camelcase': ['error', { 'ignoreDestructuring': true, 'properties': 'never' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'semi': ['error', 'never']
  },
};
