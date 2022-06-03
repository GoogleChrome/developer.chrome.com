const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const fuguFile = path.join(
    __dirname,
    '../../external/data/fugu-showcase.json'
  );
  const fuguItems = /** @type {FuguProject[]} */ (
    JSON.parse(fs.readFileSync(fuguFile, 'utf-8'))
  );

  const availableAPIs = new Set();
  fuguItems.forEach(item => {
    item.usedAPIs.forEach(api => {
      availableAPIs.add(api.name);
    });
  });

  return {
    fuguItems,
    availableApis: Array.from(availableAPIs.keys()).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    ),
  };
};
