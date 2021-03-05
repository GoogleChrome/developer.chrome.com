/**
 * @fileoverview Tests for the unique-redirect-handler used by the server.
 */

const test = require('ava');
const {buildMatcher} = require('../../server/unique-redirect');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');

test.beforeEach(t => {
  const p = tmp.dirSync();
  t.context.cleanup = () => p.removeCallback();
  t.context.dir = p.name;
  fs.mkdirSync(p.name, {recursive: true});
});

test.afterEach.always(t => {
  fs.rmSync(t.context.dir, {recursive: true});
  try {
    t.context.cleanup();
  } catch (e) {
    // often fails because of rmSync
  }
});

const addPage = (t, sub) => {
  const dir = path.join(t.context.dir, sub);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'index.html'), '');
};

test('basic top-level redirect', async t => {
  addPage(t, 'test');
  addPage(t, 'test/page');

  const matcher = await buildMatcher(t.context.dir, []);

  t.is(matcher('/foo/bar/hello/page'), '/test/page');
  t.is(matcher('/foo/bar/hello/page/index.html'), '/test/page');
  t.is(matcher('/test/page'), undefined, 'no self-redirect for safety');
  t.is(matcher('/page'), '/test/page');

  t.is(matcher('/test/page/test'), '/test');
  t.is(matcher('/page/test'), '/test');
});

test('avoid dir, prefer another', async t => {
  addPage(t, 'mv2/foo');
  addPage(t, 'mv2/only-in-mv2');
  addPage(t, 'mv3/foo');

  // This test prefers the mv3 folder over the mv2 folder.
  const matcher = await buildMatcher(t.context.dir, ['/mv2']);

  t.is(matcher('/foo'), '/mv3/foo');
  t.is(matcher('/mv3/FOO'), '/mv3/foo');
  t.is(matcher('/mv2/under/foo'), '/mv2/foo');
  t.is(matcher('/mv3/onlyINmv2'), '/mv2/only-in-mv2');
});

test('prefer mv3', async t => {
  addPage(t, '/en/docs/extensions/mv2/content_scripts');
  addPage(t, '/en/docs/extensions/mv3/content_scripts');

  const matcher = await buildMatcher(t.context.dir, [
    '/en/docs/extensions/mv2',
  ]);

  t.is(
    matcher('/extensions/content_scripts'),
    '/en/docs/extensions/mv3/content_scripts'
  );
});
