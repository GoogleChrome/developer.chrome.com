module.exports = {
  extends: ['./node_modules/gts', 'plugin:ava/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  // This contains "chrome" for testing the autocomplete of Chrome's extension
  // API.
  globals: {"chrome": "readonly"},
  rules: {
    // By default AVA will ignore folders or files with underscores in
    // their name. Since we have test paths like /site/_data/… we need to
    // disable this linter rule and enable these paths in our ava.config.js.
    'ava/no-ignored-test-files': 0,

    // These rules check if your package requires devDependencies. These rules
    // are useful if you're publishing a package to npm but we're not, we're
    // building an application and we require devDependencies in a lot of
    // places. For our use case it makes sense to disable this rule.
    // Read more: https://github.com/mysticatea/eslint-plugin-node/issues/47
    'node/no-unpublished-require': 0,
    'node/no-unpublished-import': 0,

    // Even though we target Node v14 (and v12 also supported modules), eslint
    // still complains that modules are not yet suppoted.
    'node/no-unsupported-features/es-syntax': ['error', {
      'ignores': ['modules'],
    }],
  },
};