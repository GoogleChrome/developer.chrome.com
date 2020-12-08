module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      startServerTimeout: 60 * 1000, // allow our build to take 60s
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/blog/',
        'http://localhost:8080/docs/',
        'http://localhost:8080/docs/extensions/',
      ],
    },
    assert: {
      // @see https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#preset
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        // Canonical url will not match the domain while on localhost.
        canonical: 'off',
        'tap-targets': 'off', // Disable temporarily until #476 is fixed.
      },
    },
  },
};
