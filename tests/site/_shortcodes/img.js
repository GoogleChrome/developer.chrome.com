const test = require('ava');
const cheerio = require('cheerio');
const {html} = require('common-tags');

const {img} = require('../../../site/_shortcodes/img');
const thisToBind = {page: {inputPath: './this/file/doesnt/exist.md'}};

test('img shortcode generates img html', t => {
  const src = 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg';
  const parsed = cheerio.load(
    img.bind(thisToBind)({src, alt: 'hello', height: '100', width: '100'})
  );
  const expected = cheerio.load(html` <img
    src="https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format"
    srcset="
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=100   100w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=140   140w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=196   196w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=274   274w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=384   384w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=538   538w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=752   752w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1054 1054w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1476 1476w,
      https://developer-chrome-com.imgix.net/image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg?auto=format&w=1600 1600w
    "
    alt="hello"
    loading="lazy"
  />`);

  t.deepEqual(parsed('img').html(), expected('img').html());
});

test('img shortcode throws error when `alt` argument is not a string', t => {
  const src = 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1600132969326.jpg';
  const error = t.throws(() => {
    img.bind(thisToBind)({src});
  });
  t.is(
    error.message,
    `ERROR IN ${thisToBind.page.inputPath}, IMG ${src}: alt text must be a string, received a undefined`
  );
});
