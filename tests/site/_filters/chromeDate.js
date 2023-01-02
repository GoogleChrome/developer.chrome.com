const test = require('ava');
let {chromeDate} = require('../../../site/_filters/chromeDate');

chromeDate = chromeDate.bind({
  env: {
    filters: {
      safe: s => {
        return s;
      },
    },
  },
  ctx: {locale: 'de'},
});

test('fails for unknown milestone', t => {
  t.throws(() => {
    chromeDate(undefined);
  });
});

test('fails to get unknown date type', t => {
  t.throws(() => {
    chromeDate('120', 'partyDate');
  });
});

test('returns stable date per default', t => {
  t.assert(chromeDate('108') === chromeDate('108', 'stableDate'));
});

test('returns earliestBetaDate', t => {
  t.assert(chromeDate('108', 'earliestBetaDate'));
});

test('returns finalBetaDate', t => {
  t.assert(chromeDate('108', 'finalBetaDate'));
});

test('localizes output', t => {
  t.assert(chromeDate('107').includes('Oktober'));
});
