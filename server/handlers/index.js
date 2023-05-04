const {buildStaticHandler} = require('./static');
const healthCheckHandler = require('../health-check');
const {notFoundHandler} = require('../not-found');

// If we see content from /fonts/, then cache it forever.
// If this ends up 404'ing, we invalidate the Cache-Control header in notFoundHandler.
const immutableRootMatch = /^\/fonts\//;
const immutableRootHandler = (req, res, next) => {
  if (immutableRootMatch.test(req.url)) {
    res.setHeader('Cache-Control', 'max-age=31536000,immutable');
  }
  next();
};

const cspHandler = (_req, res, next) => {
  // TODO(samthor): This is an unsuitable policy but included as a start.
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "object-src 'none'; " +
      "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://cdnjs.cloudflare.com https://www.gstatic.com https://www.google.com https://*.firebaseio.com https://shared-storage-demo-content-producer.web.app;" +
      "base-uri 'none'; " +
      "frame-ancestors 'self'; " +
      'report-uri https://csp.withgoogle.com/csp/chrome-apps-doc'
  );
  // nb. This is superceded by 'frame-ancestors' above, but retain while that
  // policy is "Report-Only".
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
};

module.exports = [
  cspHandler,
  immutableRootHandler,
  buildStaticHandler(),
  healthCheckHandler,
  notFoundHandler,
];
