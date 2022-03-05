module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    'ecmaFeatures': {
        'jsx': true,
        'modules': true
    },
    'env': {
        'node': true
    },
  };