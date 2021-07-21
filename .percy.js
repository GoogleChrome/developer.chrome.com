module.exports = {
  'version': 1,
  'snapshot': {
    'widths': [375, 865, 1280],
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
    'path': 'dist',
    'snapshot-files': [
      'index.html',
      'releases/index.html',
      'docs/index.html',
      'docs/native-client/index.html',
      'blog/welcome/index.html',
      'docs/extensions/what-are-extensions/index.html',
      'docs/handbook/components/index.html'
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