const test = require('ava');
const cheerio = require('cheerio');
const {html} = require('common-tags');

const {img} = require('../../../site/_shortcodes/img');

test('img shortcode generates img html', t => {
  const path = 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg';
  const parsed = cheerio.load(img(path));
  const expected = cheerio.load(html` <img
    src="https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format"
    srcset="
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=100   100w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=140   140w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=196   196w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=274   274w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=384   384w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=538   538w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=752   752w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1054 1054w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1476 1476w,
      https://wd.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1600 1600w
    "
    loading="lazy"
  />`);

  t.deepEqual(parsed('img').html(), expected('img').html());
});

test('img shortcode throws error when `alt` argument is not a string', t => {
  const path = 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg';
  const error = t.throws(() => {
    img(path, false);
  });
  t.is(error.message, 'alt text must be a string, received a boolean');
});
