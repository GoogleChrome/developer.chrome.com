const fs = require('fs');
const path = require('path');

/**
 * @return {Promise<string[]>}
 */
module.exports = function () {
  // TODO(samthor): This just copies top-level files for now.
  const fallbackTarget = path.join(__dirname, '../fallback');
  const dataTarget = path.join(__dirname, '../data');

  fs.mkdirSync(dataTarget, {recursive: true});

  const all = fs.readdirSync(fallbackTarget);
  for (const f of all) {
    fs.copyFileSync(path.join(fallbackTarget, f), path.join(dataTarget, f));
  }
  return all;
};
