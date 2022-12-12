const SNAPSHOTS = [
  '/en/index.html',
  '/en/content-types/blog-landing/index.html',
  '/en/content-types/docs-landing/index.html',
  '/en/content-types/doc-post/index.html',
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
