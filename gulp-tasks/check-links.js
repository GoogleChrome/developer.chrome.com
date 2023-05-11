const {UrlCrawl} = require('webdev-infra/utils/url-crawl');
const handlers = require('../server/handlers');

module.exports = async function checkLinks() {
  const result = await new UrlCrawl({
    handlers,
  }).go();

  result.summaryToConsole();
  if (result.errors.length > 0) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};
