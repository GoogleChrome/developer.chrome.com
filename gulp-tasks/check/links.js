const {UrlCrawl} = require('webdev-infra/utils/url-crawl');
const handlers = require('../../server/handlers');

new UrlCrawl({
  handlers,
})
  .go()
  .then(result => {
    result.summaryToConsole();
    if (result.errors.length > 0) {
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  });
