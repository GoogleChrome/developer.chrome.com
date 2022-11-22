const test = require('ava');
const {minifyHtmlFilter} = require('../../../site/_filters/minify-html');

test('minify-html: returns minified', t => {
  const actual = minifyHtmlFilter(
    '<div id="test-123">' + '<p>asd</p>' + '' + '' + '' + '   </div>'
  );

  t.is(actual, '<div id=test-123><p>asd</p></div>');
});

test('minify-html: handles empty string gracefully', t => {
  const actual = minifyHtmlFilter('');

  t.is(actual, '');
});

test('minify-html: throws if passed non-string', t => {
  const error = t.throws(() => minifyHtmlFilter(2323));

  t.is(error.message, 'Invalid type passed to minifyHtml: number');
});
