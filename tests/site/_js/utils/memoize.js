const test = require('ava');
const memoize = require('../../../../site/_js/utils/memoize');

test('memoize: test memoize returns expected', t => {
  const memoized = memoize(() => 1234);

  t.assert(memoized() === 1234);
});

test('memoize: test memoize caches result and does not call multiple times', t => {
  let initial = 10;

  const memoized = memoize(() => {
    initial += 20;

    return initial;
  });

  t.assert(memoized() === 30);
  t.assert(memoized() === 30);
  t.assert(memoized() === 30);
  t.assert(initial === 30);
});

test('memoize: test memoize caches once per function signature', t => {
  let initial = 10;

  const memoized = memoize(add => {
    initial += add;
    return initial;
  });

  t.assert(memoized(10) === 20);
  t.assert(memoized(10) === 20);
  t.assert(memoized(20) === 40);
  t.assert(memoized(20) === 40);
});

test('memoize: test memoize works with async functions', async t => {
  const memoized = memoize(async () => {
    return 1234;
  });

  t.assert((await memoized()) === 1234);
});
