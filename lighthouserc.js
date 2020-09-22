module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run production && npm run server',
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/blog',
        'http://localhost:8080/docs',
        'http://localhost:8080/docs/extensions',
        'http://localhost:8080/releases',
      ],
    },
    assert: {
      // @see https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#preset
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        // Canonical url will not match the domain while on localhost.
        canonical: 'off',
        'tap-targets': 'off', // Disable temporarily until base css is in place.
      },
    },
  },
};
