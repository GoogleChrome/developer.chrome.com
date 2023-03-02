const test = require('ava');
let {ChromeDate} = require('../../../site/_shortcodes/ChromeDate');

ChromeDate = ChromeDate.bind({
  ctx: {locale: 'de'},
});

test('fails for unknown milestone', t => {
  t.throws(() => {
    ChromeDate(undefined);
  });
});

test('fails to get unknown date type', t => {
  t.throws(() => {
    ChromeDate('120', 'partyDate');
  });
});

test('returns stable date per default', t => {
  t.assert(ChromeDate('108') === ChromeDate('108', 'stableDate'));
});

test('returns earliestBetaDate', t => {
  t.assert(ChromeDate('108', 'earliestBetaDate'));
});

test('returns finalBetaDate', t => {
  t.assert(ChromeDate('108', 'finalBetaDate'));
});

test('localizes output', t => {
  t.assert(ChromeDate('107').includes('Oktober'));
});
