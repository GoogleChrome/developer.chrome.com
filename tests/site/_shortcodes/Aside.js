const test = require('ava');
const cheerio = require('cheerio');
const {Aside} = require('../../../site/_shortcodes/Aside');

test('creates a default aside', t => {
  const thisToBind = {page: {filePathStem: '/en/foo/index'}};
  const $ = cheerio.load(Aside.bind(thisToBind)('hello world'));
  t.assert($('.aside').length === 1);
  t.assert($('.aside').text().trim() === 'hello world');
});

test('adds an aside__label', t => {
  const thisToBind = {page: {filePathStem: '/en/foo/index'}};
  const $ = cheerio.load(Aside.bind(thisToBind)('hello world', 'caution'));
  t.assert($('.aside__label').length === 1);
  t.assert($('.aside__label > svg').length === 1);
  t.assert($('.aside__label > span').text().trim() === 'Caution');
});

test('adds a localized aside__label', t => {
  const thisToBind = {page: {filePathStem: '/es/foo/index'}};
  const $ = cheerio.load(Aside.bind(thisToBind)('hello world', 'caution'));
  t.assert($('.aside__label > span').text().trim() === 'Precaución');
});
