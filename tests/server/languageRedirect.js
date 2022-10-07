const http = require('http');
const test = require('ava');
const fetch = require('node-fetch');
const listen = require('test-listen');

const app = require('../../server');

test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always(t => {
  t.context.server.close();
});

test.serial('en served w/o accept-language and path prefix', async t => {
  const response = await fetch(`${t.context.prefixUrl}/article`);
  const body = await response.text();

  t.assert(body.includes('English'));
});

test.serial(
  'en served with accept-language: de but en path prefix',
  async t => {
    const response = await fetch(`${t.context.prefixUrl}/en/article`, {
      headers: {
        'Accept-Language': 'de',
      },
    });
    const body = await response.text();

    t.assert(body.includes('English'));
  }
);

test.serial(
  'de served with accept-language: de and w/o path prefix',
  async t => {
    const response = await fetch(`${t.context.prefixUrl}/article`, {
      headers: {
        'Accept-Language': 'de',
      },
    });
    const body = await response.text();

    t.assert(body.includes('Deutsch'));
  }
);

test.serial(
  'de served with accept-language: en but de path prefix',
  async t => {
    const response = await fetch(`${t.context.prefixUrl}/de/article`, {
      headers: {
        'Accept-Language': 'en',
      },
    });
    const body = await response.text();

    t.assert(body.includes('Deutsch'));
  }
);

test.serial(
  'de served with accept-language: de and de path prefix',
  async t => {
    const response = await fetch(`${t.context.prefixUrl}/de/article`, {
      headers: {
        'Accept-Language': 'de',
      },
    });
    const body = await response.text();

    t.assert(body.includes('Deutsch'));
  }
);
