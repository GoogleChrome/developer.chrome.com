const {UrlCrawl} = require('webdev-infra/utils/url-crawl');
const handlers = require('./server/handlers');

new UrlCrawl({
  handlers,
})
  .go()
  .then(result => result.summaryToConsole());
