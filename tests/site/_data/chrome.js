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
  {
    os: 'linux',
    versions: [
      {
        channel: 'beta',
        version: '43.1.1234.8',
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
    {} // set an empty value for 43, discarded by client
  );

  const actual = await buildVersionInformation();
  const expected = {
    channels: {
      stable: {
        channel: 'stable',
        mstone: 42,
        stable_date: '2020-01-01T00:00:00',
      },
      beta: {channel: 'beta', mstone: 43},
    },
  };

  t.assert(JSON.stringify(expected) === JSON.stringify(actual));
});
