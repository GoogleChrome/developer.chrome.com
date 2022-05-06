const SNAPSHOTS = [
  '/index.html', // Home
  '/docs/index.html', // Docs
  '/docs/native-client/index.html', // Docs landing page
  '/docs/extensions/mv3/index.html', // Docs page
  '/docs/extensions/reference/action/index.html', // API reference page
  '/docs/handbook/test-post/index.html', // Test blog post
  '/docs/handbook/components/index.html', // Handbook components
];

module.exports = {
  version: 2,
  snapshot: {
    widths: [
      375,
      865,
      1280,
      1600
    ],
    percyCSS: '\n' +
      '      iframe, .cookie-banner {\n' +
      '        display: none !important;\n' +
      '      }\n' +
      '    ',
    enableJavaScript: true
  },
  discovery: {
    disableCache: true,
    networkIdleTimeout: 250,
    concurrency: 15,
  },
  static: {
    baseUrl: '/',
    include: SNAPSHOTS,
    exclude: [
      // Prevent percy to snapshot all index.html files in ./dist dir
      ({ name }) => !SNAPSHOTS.includes(name)
    ]
  }
}
