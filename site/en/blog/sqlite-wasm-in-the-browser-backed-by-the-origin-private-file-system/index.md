---
layout: 'layouts/blog-post.njk'
title: SQLite Wasm in the browser backed by the Origin Private File System
subhead: >
  Use SQLite to handle all your storage needs performantly on the web.
date: 2023-01-11
updated: 2023-04-29
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/l5kRHOrUI9mQmwOTJKr7.jpg
alt: Library symbolizing a database.
authors:
  - thomassteiner
tags:
  - capabilities
---

{% Aside 'success' %} In our blog post
[Deprecating and removing Web SQL](/blog/deprecating-web-sql/), we promised a replacement for Web
SQL based on SQLite. The SQLite Wasm library with the Origin Private File System persistence backend
is our fulfillment of this promise. {% endAside %}

## About SQLite

[SQLite](https://sqlite.org/) is a popular, [open-source](https://sqlite.org/src/tree), lightweight,
embedded relational database management system. Many developers use it to store data in a
structured, easy-to-use manner. Because of its small size and low memory requirements, SQLite is
often leveraged as a database engine in mobile devices, desktop applications, and web browsers.

One of the key features of SQLite is that it is a serverless database, which means that it does not
require a separate server process to operate. Instead, the database is stored in a single file on
the user's device, making it easy to integrate into applications.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/eDfwxFJirAZ6hqdt6Z8Y.png", alt="SQLite logo.", width="220", height="101" %}

## SQLite based on Web Assembly

There are a number of unofficial SQLite versions based on Web Assembly (Wasm), allowing it to be
used in web browsers, for example, [sql.js](https://github.com/sql-js/sql.js). The
[sqlite3 WASM/JS subproject](https://sqlite.org/wasm/doc/tip/about.md) is the first effort that is
officially associated with the [SQLite project](https://sqlite.org/) making Wasm builds of the
library established members of the family of supported SQLite deliverables. The concrete goals of
this project include:

- Binding a low-level sqlite3 API which is as close to the C one as feasible in terms of usage.
- A higher-level object-oriented API, more akin to [sql.js](https://github.com/sql-js/sql.js/) and
  [Node.js-style implementations](https://www.npmjs.com/package/sqlite3), that speaks directly to
  the low-level API. This API must be used from the same thread as the low-level API.
- A Worker-based API which speaks to the previous APIs via Worker messages. This one is intended for
  use in the main thread, with the lower-level APIs installed in a Worker thread, and talking to
  them via Worker messages.
- A Promise-based variant of the Worker API which entirely hides the cross-thread communication
  aspects from the user.
- Support for persistent client-side storage using available JavaScript APIs, including the Origin
  Private File System (OPFS).

## Using SQLite Wasm with the Origin Private File System persistence backend

### Installing the library from npm

Install the [@sqlite.org/sqlite-wasm](https://www.npmjs.com/package/@sqlite.org/sqlite-wasm) package
from npm with the following command:

```bash
npm install @sqlite.org/sqlite-wasm
```

### The Origin Private File System

The Origin Private File System (OPFS, part of the
[File System Access API](/articles/file-system-access/)) is augmented with a special surface that
brings very performant access to data. This new surface differs from existing ones by offering
in-place and exclusive write access to a file's content. This change, along with the ability to
consistently read unflushed modifications and the availability of a synchronous variant on dedicated
workers, significantly improves performance and unblocks new use cases.

As you can imagine, the last point of the project's goals, Support for persistent client-side
storage using available JavaScript APIs, comes with strict performance requirements
regarding persisting data to the database file. This is where the Origin Private File System, and,
more specifically, the
[`createSyncAccessHandle()`](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/createSyncAccessHandle)
method of [`FileSystemFileHandle`](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle)
objects comes into play. This method returns a Promise which resolves to a
[`FileSystemSyncAccessHandle`](https://developer.mozilla.org/docs/Web/API/FileSystemSyncAccessHandle)
object that can be used to synchronously read from and write to a file. The synchronous nature of
this method brings performance advantages, but therefore it is only usable inside dedicated
[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) for files within the
Origin Private File System so the main thread can't be blocked.

### Setting the required headers

{% Aside 'warning' %} Setting these headers is a required step for the Origin Private File System
persistence backend to work. {% endAside %}

Among other files, the downloaded SQLite Wasm archive contains the `sqlite3.js` and `sqlite3.wasm`
files, which make up the sqlite3 WASM/JS build. The `jswasm` directory contains the core sqlite3
deliverables and the top-level directory contains demonstration and test apps. Browsers will not
serve Wasm files from `file://` URLs, so any apps you build with this require a web server and that
server must include the following headers in its response when serving the files:

- [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
  set to the
  [`same-origin` directive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy#directives),
  which isolates the browsing context exclusively to same-origin documents. Cross-origin documents
  are not loaded in the same browsing context.
- [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
  set to the
  [`require-corp` directive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy#directives),
  so a document can only load resources from the same origin, or resources explicitly marked as
  loadable from another origin.

The reason for these headers is that SQLite Wasm depends on
[`SharedArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer),
and setting these headers is part of its
[security requirements](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements).

If you inspect the traffic with DevTools, you should find the following information:

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/5IwU6G8KyFjV3SP3f0lX.png", alt="The two headers mentioned above, Cross-Origin-Embedder-Policy and Cross-Origin-Opener-Policy, highlighted in Chrome DevTools.", width="377", height="249" %}

### Speedtest

The SQLite team have run some benchmarks on their WebAssembly implementation compared to the deprecated Web SQL. These benchmarks show that SQLite Wasm is generally about as fast as Web SQL. Sometimes it's a little slower, sometimes it's a little faster. See all details on the [results page](https://sqlite-wasm-opfs.glitch.me/speedtest.html).

### Getting started code sample

As mentioned previously, SQLite Wasm with the Origin Private File System persistence backend needs
to run from a Worker context. So to use it, in the main thread, you need to create the worker and
listen to messages from it.

```js
const logHtml = function (cssClass, ...args) {
  const ln = document.createElement('div');
  if (cssClass) {
    ln.classList.add(cssClass);
  }
  ln.append(document.createTextNode(args.join(' ')));
  document.body.append(ln);
};

const worker = new Worker('worker.js');
worker.onmessage = function ({ data }) {
  switch (data.type) {
    case 'log':
      logHtml(data.payload.cssClass, ...data.payload.args);
      break;
    default:
      logHtml('error', 'Unhandled message:', data.type);
  }
};
```

After that, in the worker thread, you can then set up the communication with the main thread,
initialize the Wasm module, and finally start working with SQLite and execute queries.

```js
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const logHtml = function (cssClass, ...args) {
  postMessage({
    type: 'log',
    payload: { cssClass, args },
  });
};

const log = (...args) => logHtml('', ...args);
const error = (...args) => logHtml('error', ...args);

const start = function (sqlite3) {
  const capi = sqlite3.capi; /*C-style API*/
  const oo = sqlite3.oo1; /*high-level OO API*/
  log('sqlite3 version', capi.sqlite3_libversion(), capi.sqlite3_sourceid());
  let db;
  if (sqlite3.opfs) {
    db = new sqlite3.opfs.OpfsDb('/mydb.sqlite3');
    log('The OPFS is available.');
  } else {
    db = new oo.DB('/mydb.sqlite3', 'ct');
    log('The OPFS is not available.');
  }
  log('transient db =', db.filename);

  try {
    log('Create a table...');
    db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
    log('Insert some data using exec()...');
    let i;
    for (i = 20; i <= 25; ++i) {
      db.exec({
        sql: 'INSERT INTO t(a,b) VALUES (?,?)',
        bind: [i, i * 2],
      });
    }
    log("Query data with exec() using rowMode 'array'...");
    db.exec({
      sql: 'SELECT a FROM t ORDER BY a LIMIT 3',
      rowMode: 'array', // 'array' (default), 'object', or 'stmt'
      callback: function (row) {
        log('row ', ++this.counter, '=', row);
      }.bind({ counter: 0 }),
    });
  } finally {
    db.close();
  }
};

log('Loading and initializing sqlite3 module...');
sqlite3InitModule({
  print: log,
  printErr: error,
})
.then(function (sqlite3) {
  log('Done initializing. Running demo...');
  try {
    start(sqlite3);
  } catch (e) {
    error('Exception:', e.message);
  }
});
```

### Demo

See the above code in action in the [demo](https://sqlite-wasm-opfs.glitch.me/).
Be sure to check out the
[source code](https://glitch.com/edit/#!/sqlite-wasm-opfs?path=index.js%3A1%3A0) on Glitch.
Note how the embedded version below does not use the OPFS backend, but when you open the demo
in a [separate tab](https://sqlite-wasm-opfs.glitch.me/) it does.

{% Glitch {
  id: 'sqlite-wasm-opfs'
} %}

### Debugging the Origin Private File System

To debug SQLite Wasm's Origin Private File System output, use the
[OPFS Explorer](https://chrome.google.com/webstore/detail/opfs-explorer/acndjpgkpaclldomagafnognkcgjignd)
Chrome extension.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/jT2SFMpWzPuPKjcphLlR.png", alt="OPFS Explorer in the Chrome Web Store.", width="800", height="612" %}

After installing the extension, open the Chrome DevTools, select the **OPFS Explorer** tab, and
you're then ready to inspect what SQLite Wasm writes to the Origin Private File System.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/vIjB6Gnl879OySnYuueJ.png", alt="OPFS Explorer Chrome extension showing the Origin Private File System structure of the demo app.", width="800", height="416" %}

If you click on any of the files in the OPFS Explorer window in DevTools, you can save it to the
local disk. You can then use an app like [SQLite Viewer](https://sqliteviewer.app/) to inspect the
database, so you can assure yourself that SQLite Wasm actually works as promised.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/fKoJyNfsmFWI5oC4kEJA.png", alt="SQLite Viewer app used to open a database file from the SQLite Wasm demo.", width="800", height="329" %}

## Getting help and providing feedback

SQLite Wasm is developed and maintained by the SQLite community. Get help and provide feedback by
searching in and posting to the [support forum](https://sqlite.org/forum/forum). The full
[documentation](https://sqlite.org/docs.html) is available on the SQLite site.

## Acknowledgements

Hero image by [Tobias Fischer](https://unsplash.com/@tofi) on
[Unsplash](https://unsplash.com/photos/PkbZahEG2Ng).
