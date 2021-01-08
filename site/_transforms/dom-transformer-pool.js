const path = require('path');

// This works around: https://github.com/mysticatea/eslint-plugin-node/issues/244
// eslint-disable-next-line node/no-missing-require
const {pool: buildWorkerPool} = require('async-transforms/worker');

/** @type {(content: string, outputPath: string) => Promise<string>} */
let domTransformerPool;

/**
 * This wraps "dom-transformer.js", which uses Cheerio to modify the DOM for all pages. This work
 * is CPU-bound, so use a worker pool for a speed improvement.
 */
const domTransformer = (content, outputPath) => {
  if (domTransformerPool === undefined) {
    // Lazily create the worker pool if needed.
    const script = path.join(__dirname, './dom-transformer.js');
    domTransformerPool = buildWorkerPool(script);
  }
  return domTransformerPool(content, outputPath);
};

module.exports = {domTransformer};
