const test = require('ava');
const path = require('path');
const {permalink} = require('../../../site/_functions/i18n');

const setupData = (filePath, ext = '.md') => {
  return {
    permalink: '',
    page: {
      filePathStem: path.join(filePath),
      inputPath: '.' + filePath + ext,
    },
  };
};

test('strips i18n directory', t => {
  let data = setupData('/i18n/es/foo/bar/index');
  let expected = '/es/foo/bar/index.html';
  t.assert(permalink(data) === expected);

  data = setupData('/i18n/es/index');
  expected = '/es/index.html';
  t.assert(permalink(data) === expected);
});

test('uses .html for markdown and nunjucks, defaults for other files', t => {
  let data = setupData('/i18n/es/foo/index');
  let expected = '/es/foo/index.html';
  t.assert(permalink(data) === expected);

  data = setupData('/i18n/es/bar/index', '.njk');
  expected = '/es/bar/index.html';
  t.assert(permalink(data) === expected);

  data = setupData('/i18n/es/baz/index', '.json');
  expected = '/es/baz/index.json';
  t.assert(permalink(data) === expected);
});

test('returns the existing permalink if it finds one', t => {
  const data = setupData('/i18n/es/baz/index', '.json');
  data.permalink = '/foo.json';

  t.assert(permalink(data) === '/foo.json');
});

test('throws if i18n is not in the path', t => {
  const data = setupData('/foo/index');
  const error = t.throws(() => {
    permalink(data);
  });
  t.is(error.message, 'Could not find i18n prefix for file ./foo/index.md');
});
