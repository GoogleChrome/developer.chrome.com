const fs = require('fs');
const path = require('path');


/**
 * @return {Promise<TwitterTweet[]>}
 */
module.exports = async () => {
  const fuguFile = path.join(__dirname, '../../external/data/fugu-showcase.json');
  let fuguItems = /** @type {TwitterTweet[]} */ (
    JSON.parse(fs.readFileSync(fuguFile, 'utf-8'))
  );

  return fuguItems;
};
