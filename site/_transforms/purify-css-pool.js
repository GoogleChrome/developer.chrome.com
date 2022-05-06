const path = require('path');

// This works around: https://github.com/mysticatea/eslint-plugin-node/issues/244
// eslint-disable-next-line node/no-missing-require
const {pool: buildWorkerPool} = require('async-transforms/worker');

/** @type {(content: string, outputPath: string) => Promise<string>} */
let purifyCSSPool;

/**
 * This wraps "purify-css.js" which is rather slow, and can be parallelized.
 */
const purifyCss = (content, outputPath) => {
  if (purifyCSSPool === undefined) {
    // Lazily create the worker pool if needed.
    const script = path.join(__dirname, './purify-css.js');
    purifyCSSPool = buildWorkerPool(script);
  }
  return purifyCSSPool(content, outputPath);
};

module.exports = {purifyCss};
