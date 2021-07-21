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

        /**
         * Canonical URL will not match the domain while being tested.
         */
        canonical: 'off',

        /**
         * Disable until #71 is fixed.
         */
        'tap-targets': 'off',

        /**
         * We don't care about preconnect to Analytics and friends.
         */
        'uses-rel-preconnect': 'off',

        /**
         * For now, we allow a single resource with a long cache TTL: Analytics, whose 2h TTL
         * raises the ire of this assertion.
         * (This was always a warning, but we can hide it for now.)
         */
        'uses-long-cache-ttl': ['warn', {maxLength: 1}],
      },
    },
  },
};
