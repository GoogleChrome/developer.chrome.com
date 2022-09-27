const test = require('ava');
const truncateString = require('../../../../site/_js/utils/truncate-string');

test('truncate-string does not break words', t => {
  t.assert(
    truncateString('Lorem Ipsum is simply dummy text', 17) === 'Lorem Ipsum is'
  );
});

test('truncate-string can trim to the first word', t => {
  t.assert(truncateString('Lorem Ipsum is simply dummy text', 4) === 'Lorem');
});

test('truncate-string can trim to the last word', t => {
  t.assert(
    truncateString('Lorem Ipsum is simply dummy text', 32) ===
      'Lorem Ipsum is simply dummy text'
  );
});

test('truncate-string can handle empty strings', t => {
  t.assert(truncateString('', 12) === '');
});

test('truncate-string does not truncate if max length is greater than the string length', t => {
  t.assert(
    truncateString('Lorem Ipsum is simply dummy tex', 500) ===
      'Lorem Ipsum is simply dummy tex'
  );
});
