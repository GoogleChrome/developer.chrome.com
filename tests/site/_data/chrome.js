const test = require('ava');
const buildVersionInformation = require('../../../site/_data/chrome');
const {
  setCacheForTest,
  setTestEnabled,
} = require('../../../site/_data/lib/cache');

const testOmahaProxyData = [
  {
    os: 'win',
    versions: [
      {
        channel: 'stable',
        version: '42.0.1234.1',
      },
    ],
  },
];

test.before(() => {
  setTestEnabled(true);
});

test.after(() => {
  setTestEnabled(false);
});

test('returns version information', async t => {
  setCacheForTest(
    'https://omahaproxy.appspot.com/all.json',
    testOmahaProxyData
  );

  setCacheForTest(
    'https://chromiumdash.appspot.com/fetch_milestone_schedule?mstone=42',
    {
      mstones: [
        {
          mstone: 42,
          stable_date: '2020-01-01T00:00:00',
        },
      ],
    }
  );

  setCacheForTest(
    'https://chromiumdash.appspot.com/fetch_milestone_schedule?mstone=43',
    {
      mstones: [
        {
          mstone: 43,
          stable_date: '2020-02-01T00:00:00',
        },
      ],
    }
  );

  const actual = await buildVersionInformation();
  const expected = {
    channels: {
      stable: {
        key: 'stable',
        mstone: 42,
        stableDate: new Date('2020-01-01T00:00:00'),
      },
      beta: {
        key: 'beta',
        mstone: 43,
        stableDate: new Date('2020-02-01T00:00:00'),
      },
    },
  };

  t.deepEqual(expected, actual);
});
