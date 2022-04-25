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
    disableCache: true
  },
  static: {
    include: [
      '/en/index.html',
      '/en/blog/index.html'
    ],
  }
}
