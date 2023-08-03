---
layout: 'layouts/blog-post.njk'
title: Deprecating and removing Web SQL
description: >
  Web SQL was first proposed in April 2009 and abandoned in November 2010. Gecko
  never implemented it and WebKit removed it in 2019. Web SQL was removed for
  third-party contexts in Chromium 97. Chromium 105 deprecated Web SQL in
  insecure contexts and showed a warning in the DevTools Issue panel when the
  feature is used. Chromium 110 removed Web SQL in insecure contexts. Complete
  removal in insecure contexts and eventually all contexts is planned for Chromium 119.
authors:
  - thomassteiner
date: 2022-08-31
updated: 2023-06-30
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/yUp8lfaCt4EmxmVei3lj.jpg
alt: Filing cabinet symbolizing a database.
tags:
  - deprecations-removals
  - storage
---

{% Aside %} This is a living post that will be updated as the deprecation steps
outlined below happen. The current target version to remove Web SQL is
**Chromium&nbsp;119** ({% ChromeDate '119' %}). {% endAside %}

The [Web SQL Database API](https://www.w3.org/TR/webdatabase/), which allows you
to store data in a structured manner on the user's computer (internally based on
the SQLite database engine), was
[introduced in April 2009](https://www.w3.org/TR/2009/WD-webdatabase-20091222/)
and
[abandoned in November 2010](https://www.w3.org/TR/webdatabase/#status-of-this-document).
While it was implemented in WebKit (which powers Safari and early versions of
Chrome) and remained active in the Blink engine (that powers Chrome after the
switch from WebKit), Gecko (which powers Firefox) never implemented this feature
and
[WebKit removed it in 2019](https://lists.webkit.org/pipermail/webkit-dev/2019-November/030968.html).

The World Wide Web Consortium (W3C)
[encourages](https://www.w3.org/TR/webdatabase/#:~:text=The%20Web%20Applications%20Working%20Group%20continues%20work%20on%20two%20other%20storage%2Drelated%20specifications%3A%20Web%20Storage%20and%20Indexed%20Database%20API.)
those needing web databases to adopt
[Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
technologies like
[`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
and
[`sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage),
or
[IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Using_IndexedDB).
These technologies show their strengths when it comes to key/value stores and
structured data, but acknowledgedly also have weaknesses like the lack of a
strong query language. People want SQL on the web for a reason.

{% Aside 'success' %} Our intention is to empower developers to create their own
solutions for structured storage. We've worked with the
[SQLite](https://www.sqlite.org/index.html) team to create a SQLite
implementation over WebAssembly. This
[solution is now ready](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/)
and outperforms Web SQL in many cases.

{% Img src="image/x1Los57vDga6OEMNi1dIJwZ0qvp2/dh8CuKvNIfkb8Bz00Th4.svg", alt="Arrow", class="right-arrow", width="16", height="12" %}

{% endAside %}

## Web SQL deprecation and removal steps

- [✅ Done.] Web SQL was deprecated and removed for **third-party contexts** in
  **Chromium&nbsp;97** ({% ChromeDate '96' %}).
- [✅ Done.] Web SQL access in **insecure contexts** was deprecated as of
  **Chromium&nbsp;105** ({% ChromeDate '105' %}) at which time a warning message
  was shown in the Chrome DevTools Issue panel.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/AunrHQyWXS6AmECRn9oT.png", alt="Chrome DevTools Issues panel with a warning that reads Web SQL in non-secure contexts is deprecated.", width="800", height="158" %}

- [📍 We are here.] Web SQL access in **insecure contexts** is no longer
  available as of **Chromium&nbsp;110** ({% ChromeDate '110' %}). An
  **enterprise policy** to keep using the feature is available from
  **Chromium&nbsp;110** ({% ChromeDate '110' %}) to **Chromium&nbsp;123**
  ({% ChromeDate '123' %}).
- [🔮 In the future.] Web SQL access in **all contexts** is deprecated as of
  **Chromium&nbsp;115** ({% ChromeDate '115' %}) and a warning message is shown
  in the Chrome DevTools Issue panel.
- [🔮 In the future.] Web SQL access in **all contexts** is no longer available
  in **Chromium&nbsp;119** ({% ChromeDate '119' %})
- [🔮 In the future.] A
  [deprecation trial](/docs/web-platform/origin-trials/#deprecation-trials) to
  keep using Web SQL is available from **Chromium&nbsp;117**
  ({% ChromeDate '117' %}) to **Chromium&nbsp;123** ({% ChromeDate '123' %}).

## Where to go from here

As pointed out in the introduction,
[Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
technologies like
[`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
and
[`sessionStorage`](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage),
or the
[IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Using_IndexedDB)
standard are good alternatives in many, but by far not all cases.

{% Aside %} We recommend most users switch to
[SQLite compiled to WebAssembly, backed by the Origin Private File System (OPFS)](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/),
especially those with strong performance requirements. {% endAside %}

### Rationale for leaving storage to web developers

With the advent of Wasm, SQL or NoSQL solutions can come to the web. One example
is [DuckDB-Wasm](https://duckdb.org/2021/10/29/duckdb-wasm.html), another is
[absurd-sql](https://github.com/jlongster/absurd-sql). Based on these creations,
we feel that the developer community can iterate on and create new storage
solutions faster and better than browser vendors.

We're not planning to just remove Web SQL. In fact, we replaced it with
[something](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/)
that will be maintained by the open-source community, served as a package that
can be updated at will—without the burden of introducing fixes and new features
directly into browsers. Our objective really is to let developers bring their
own database to the web.

What's more, we're hoping that this example will help a new ecosystem of
open-source databases to flourish! The release of
[file system access handles](https://web.dev/file-system-access/#accessing-files-optimized-for-performance-from-the-origin-private-file-system)
finally provides the new primitive on which custom storage solutions can be
built.

## Reasons for deprecating Web SQL

### Sustainability and security concerns

The Web SQL specification cannot be implemented sustainably, which limits
innovation and new functionality. The last version of the standard literally
[states](https://www.w3.org/TR/webdatabase/#web-sql) _"User agents must
implement the SQL dialect supported by Sqlite 3.6.19"_. SQLite was not initially
designed to run malicious SQL statements, yet implementing Web SQL means
browsers have to do exactly this. The need to keep up with security and
stability fixes dictates updating SQLite in Chromium. This comes in direct
conflict with Web SQL's requirement of behaving exactly as SQLite 3.6.19.

### API shape

Web SQL also is an API that shows its age. Being a child of the late 2000s, it's
a great example of "callback hell", as the code sample
([courtesy of Nolan Lawson](https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/))
below impressively demonstrates. As you can see, the SQL statements (using the
[SQLite](https://www.sqlite.org/index.html) SQL dialect) are passed as strings
to the database methods.

```js
openDatabase(
  // Name
  'mydatabase',
  // Version
  1,
  // Display name
  'mydatabase',
  // Estimated size
  5000000,
  // Creation callback
  function (db) {
    db.transaction(
      // Transaction callback
      function (tx) {
        // Execute SQL statement
        tx.executeSql(
          // SQL statement
          'create table rainstorms (mood text, severity int)',
          // Arguments
          [],
          // Success callback
          function () {
            // Execute SQL statement
            tx.executeSql(
              // SQL statement
              'insert into rainstorms values (?, ?)',
              // Arguments
              ['somber', 6],
              // Success callback
              function () {
                // Execute SQL statement
                tx.executeSql(
                  // SQL statement
                  'select * from rainstorms where mood = ?',
                  // Arguments
                  ['somber'],
                  // Success callback
                  function (tx, res) {
                    // Do something with the result
                    var row = res.rows.item(0);
                    console.log(
                      'rainstorm severity: ' +
                        row.severity +
                        ',  my mood: ' +
                        row.mood,
                    );
                  },
                );
              },
            );
          },
        );
      },
      // Error callback
      function (err) {
        console.log('Transaction failed!: ' + err);
      },
      // Success callback);
      function () {
        console.log('Transaction succeeded!');
      },
    );
  },
);
```

{% Aside 'warning' %} This code is obsolete. Don't use it in practice.
{% endAside %}

If you were to run this code and
[inspect the created table with Chrome DevTools](/docs/devtools/storage/websql/),
this is the result:

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/MnkvXruPWsb89lFTynqX.png", alt="Inspecting the Web SQL section in Chrome DevTools shows a database called mydatabase with a table called rainstorms with the columns mood (textual) and severity (integer) that has one entry with a mood of somber and a severity of six.", width="800", height="187" %}

### Lack of implementer support

Apart from the arcane API shape (at least from today's point of view), Mozilla
had many
[concerns](https://hacks.mozilla.org/2010/06/beyond-html5-database-apis-and-the-road-to-indexeddb/)
about Web SQL being built upon SQLite:

_"We don't think [SQLite] is the right basis for an API exposed to general web
content, not least of all because there isn't a credible, widely accepted
standard that subsets SQL in a useful way. Additionally, we don't want changes
to SQLite to affect the web later, and don't think harnessing major browser
releases (and a web standard) to SQLite is prudent."_

You can read about Mozilla's concerns in
[former Mozillan Vladimir Vukićević's blog post](https://web.archive.org/web/20090412154147/http://blog.vlad1.com/2009/04/06/html5-web-storage-and-sql/).
For some more history, check out the
[W3C Web Applications Working Group minutes](http://www.w3.org/2009/11/02-webapps-minutes.html#item10)
(and, if you really want to go into the details, read the
[IRC logs](http://www.w3.org/2009/11/02-webapps-irc)) and the
[mailing list archives](http://lists.w3.org/Archives/Public/public-webapps/2009OctDec/0526.html)).
Additionally,
[Nolan Lawson's blog post](https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/)
provides a good overview of what happened.

## Feedback

If you have _any_ concerns about the deprecation steps communicated in this
post, please let us know on the
[blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev).
Membership in this group is open to anyone, and anyone is allowed to post.

## Related links

- [All deprecations and removals in Chromium](/tags/deprecations-removals/)
- ChromeStatus entry:
  [Deprecate and remove WebSQL in third-party contexts](https://chromestatus.com/feature/5684870116278272)
- ChromeStatus entry:
  [Deprecate and remove WebSQL in non-secure contexts](https://chromestatus.com/feature/5175124599767040)
- Intent to Deprecate and Remove:
  [WebSQL in third-party contexts](https://groups.google.com/a/chromium.org/g/blink-dev/c/TM6YDx1Hh08/m/FxebaDQKAgAJ)
- Intent to Deprecate and Remove:
  [WebSQL in non-secure contexts](https://groups.google.com/a/chromium.org/g/blink-dev/c/xdcl4yc8Ihk/m/lq35JuYOAAAJ)
- Chromium issue:
  [Deprecate and remove WebSQL in third-party contexts](https://bugs.chromium.org/p/chromium/issues/detail?id=1212491)
- Chromium issue:
  [Deprecate and remove WebSQL in insecure contexts](https://bugs.chromium.org/p/chromium/issues/detail?id=1212492)
- Chromium issue:
  [Deprecate and remove WebSQL (Window#openDatabase)](https://bugs.chromium.org/p/chromium/issues/detail?id=695592)
- [SQLite Wasm in the browser backed by the Origin Private File System](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/)

## Acknowledgements

This article was reviewed by [Joe Medley](https://github.com/jpmedley) and
[Ben Morss](https://github.com/morsssss), and
[Joshua Bell](https://github.com/inexorabletash). Hero image by
[Jan Antonin Kolar](https://unsplash.com/@jankolar) on
[Unsplash](https://unsplash.com/photos/lRoX0shwjUQ).
