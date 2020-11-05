const test = require('ava');
const cheerio = require('cheerio');
const {asides} = require('../../../site/_transforms/asides');

const template = markup => {
  return cheerio.load(`<html><head></head><body>${markup}</body></html>`);
};

test("ignores content if it can't find an aside", t => {
  const locale = 'en';
  const $ = template('<div></div>');
  const expected = template('<div></div>').html();
  const actual = asides($, locale).html();
  t.assert(actual === expected);
});

test('adds a default aside', t => {
  const locale = 'en';
  const $ = template('<div class="aside">hello</div>');
  const expected = template('<div class="aside">hello</div>').html();
  const actual = asides($, locale).html();
  t.assert(actual === expected);
});

test('adds an aside__label', t => {
  const locale = 'en';
  const $ = template('<div class="aside aside--caution">hello</div>');
  // Calling asides modifies $ in place.
  asides($, locale);
  t.assert($('.aside__label').length === 1);
  t.assert($('.aside__label > svg').length === 1);
  t.assert($('.aside__label > span').text() === 'Caution');
});

test('adds a localized aside__label', t => {
  const locale = 'es';
  const $ = template('<div class="aside aside--caution">hello</div>');
  // Calling asides modifies $ in place.
  asides($, locale);
  t.assert($('.aside__label > span').text() === 'Precaución');
});
