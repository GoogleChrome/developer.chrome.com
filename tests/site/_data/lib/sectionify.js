const test = require('ava');
const {sectionify} = require('../../../../site/_data/lib/sectionify');

test('sectionify nests children under the parent path', t => {
  const section = [
    {
      url: 'foo',
      sections: [
        {
          url: 'bar',
          sections: [
            {
              url: 'hello',
            },
            {
              url: 'world',
            },
          ],
        },
        {
          url: '/baz/qux',
        },
        {
          url: 'https://google.com',
        },
      ],
    },
  ];

  const expected = [
    {
      url: '/docs/foo/',
      sections: [
        {
          url: '/docs/foo/bar/',
          sections: [
            {
              url: '/docs/foo/bar/hello/',
            },
            {
              url: '/docs/foo/bar/world/',
            },
          ],
        },
        {
          url: '/baz/qux/',
        },
        {
          url: 'https://google.com',
        },
      ],
    },
  ];

  t.deepEqual(sectionify(section, '/docs'), expected);
});

test('sectionify throws if the parent argument is not an absolute path', t => {
  const error = t.throws(() => {
    sectionify([], 'foo');
  });
  t.is(error.message, 'parent argument must be an absolute path.');
});
