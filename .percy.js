module.exports = {
  'version': 1,
  'snapshot': {
    'widths': [375, 865, 1280],
    'percy-css': `
      iframe {
        display: none !important;
      }`
  },
  'static-snapshots': {
    'path': 'dist',
    'snapshot-files': [
      'index.html',
      'releases/index.html',
      'blog/index.html',
      'demo/index.html',
      'docs/index.html',
      'docs/extensions/index.html',
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