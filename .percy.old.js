module.exports = {
  'version': 1,
  'snapshot': {
    'widths': [375, 865, 1280, 1600],
    'percy-css': `
      iframe, .cookie-banner {
        display: none !important;
      }
    `,
    // We need this for pages that use the masonry layout which requires
    // runtime JS to layout correctly.
    'enable-javascript': true,
  },
  'static-snapshots': {
    'path': 'dist/en',
    'snapshot-files': [
      'index.html',
    ].join(',')
  },
  'agent': {
    'asset-discovery': {
      'network-idle-timeout': 250, // ms
      'page-pool-size-min': 5, // pages
      'page-pool-size-max': 20 // pages
    }
  }
};