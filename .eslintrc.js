module.exports = {
  extends: ['./node_modules/gts', 'plugin:ava/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    // By default AVA will ignore folders or files with underscores in
    // their name. Since we have test paths like /site/_data/… we need to
    // disable this linter rule and enable these paths in our ava.config.js.
    'ava/no-ignored-test-files': 0,

    // This rule checks to if your package requires devDependencies.
    // This rule is useful if you're publishing a package to npm but we're not,
    // we're building an application and we require devDependencies in a lot of
    // places. For our use case it makes sense to disable this rule.
    // Read more: https://github.com/mysticatea/eslint-plugin-node/issues/47
    'node/no-unpublished-require': 0,

    // This rule looks at the node version in your package.json's engines field
    // to determine which ES features are allowed. Our engine field says we
    // support Node v12 which does not yet have support for modules. But we use
    // rollup to bundle our client-side JS and our config.js files for other
    // tools like ava and rollup support ESM.
    'node/no-unsupported-features/es-syntax': ['error', {
      'ignores': ['modules'],
    }]
  }
};