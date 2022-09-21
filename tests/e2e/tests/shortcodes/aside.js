const test = require('ava');

// eslint-disable-next-line ava/no-import-test-files
const {getPageByUrl} = require('../../utils.js');

test('renders a default aside', async t => {
  const $ = await getPageByUrl('en/shortcodes/aside/default');

  t.assert($('.aside').length === 1);
  t.assert($('.aside').text().trim() === 'Aside text.');
});

test('renders a typed (caution) aside', async t => {
  const $ = await getPageByUrl('en/shortcodes/aside/caution');

  t.assert($('.aside__label').length === 1);
  t.assert($('.aside__label > svg').length === 1);
  t.assert($('.aside__label > span').text().trim() === 'Caution');
});

test('localizes type labels', async t => {
  const $ = await getPageByUrl('es/shortcodes/aside/localized-label');
  t.assert($('.aside__label > span').text().trim() === 'Precaución');
});

test('renders inline Markdown', async t => {
  const $ = await getPageByUrl('en/shortcodes/aside/markdown');

  t.assert($('.aside strong').length === 1);
  t.assert($('.aside a').length === 1);
});
