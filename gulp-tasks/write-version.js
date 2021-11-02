/**
 * Write the HEAD SHA to the `dist folder` on prod builds, plus the contents of `.hash` of the
 * site's external data.
 *
 * This is used for Cloud Build to compare the currently deployed version of the site against
 * what would be deployed.
 *
 * This matches web.dev's version, but:
 *  - adds /external/data/.hash to the output.
 *  - writes to "site-version", not "version""
 */

const fs = require('fs');

const getVersion = require('../tools/version');

const writeVersionInProd = async () => {
  if (process.env.NODE_ENV === 'production') {
    const version = getVersion();
    fs.mkdirSync('./dist', {recursive: true});
    fs.writeFileSync('./dist/site-version', version);
  }
};

module.exports = writeVersionInProd;
