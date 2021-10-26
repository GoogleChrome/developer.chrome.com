const fs = require('fs');
const path = require('path');

/**
 * @return {Promise<string[]>}
 */
module.exports = async function () {
  // TODO(samthor): This just copies top-level files for now.
  const testdataTarget = path.join(__dirname, '../testdata');
  const dataTarget = path.join(__dirname, '../data');

  fs.mkdirSync(dataTarget, {recursive: true});

  const all = fs.readdirSync(testdataTarget);
  for (const f of all) {
    fs.copyFileSync(path.join(testdataTarget, f), path.join(dataTarget, f));
  }
  return all;
};
