---
layout: 'layouts/blog-post.njk'
title: Deprecating Web SQL
description: >
  The Web SQL Database standard was first proposed in April 2009 and abandoned in November 2010.
  While it was implemented in WebKit and remained active in Blink, Gecko never implemented this
  feature and WebKit deprecated it in 2019. The W3C encourages those needing web databases to adopt
  Web Storage or Indexed Database. Web SQL has been deprecated and removed for third-party contexts
  in Chromium 97. Now Chromium 105 deprecates Web SQL in insecure contexts. The complete removal of
  the feature is planned for Chromium 107.
authors:
  - thomassteiner
date: 2022-08-02
# updated: 2022-08-02
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/yUp8lfaCt4EmxmVei3lj.jpg
alt: Filing cabinet symbolizing a database.
---

The [Web SQL Database](https://www.w3.org/TR/webdatabase/) proposal was first
[introduced in April 2009](https://www.w3.org/TR/2009/WD-webdatabase-20091222/) and
[abandoned in November 2010](https://www.w3.org/TR/webdatabase/#status-of-this-document). While it
was implemented in the WebKit browser engine (that powers Safari and early versions of Chrome) and
remained active in the Blink engine (that powers Chrome after the switch from WebKit), the Gecko
engine (that powers Firefox) never implemented this feature and
[WebKit deprecated it in 2019](https://lists.webkit.org/pipermail/webkit-dev/2019-November/030968.html).
The World Wide Web Consortium (W3C)
[encourages](https://www.w3.org/TR/webdatabase/#:~:text=The%20Web%20Applications%20Working%20Group%20continues%20work%20on%20two%20other%20storage%2Drelated%20specifications%3A%20Web%20Storage%20and%20Indexed%20Database%20API.)
those needing web databases to adopt
[Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) or
[Indexed Database](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Using_IndexedDB).

## Web SQL deprecation steps

Now, in the Chromium project that browsers like Chrome and Edge are built upon, we're taking steps
to deprecate Web SQL for good, too:

- Web SQL has been deprecated and removed for **third-party contexts** in **Chromium&nbsp;97**.
- Web SQL access in **insecure contexts** is deprecated as of **Chromium&nbsp;105**.
- The **complete removal** of the feature is planned for **Chromium&nbsp;107**.

## Reasons for deprecating Web SQL

### Sustainability and security concerns

The Web SQL specification cannot be implemented sustainably. The last version of the standard
literally [states](https://www.w3.org/TR/webdatabase/#web-sql) _"User agents must implement the SQL
dialect supported by Sqlite 3.6.19"_. SQLite was not initially designed to run malicious SQL
statements, yet implementing Web SQL means browsers have to do exactly this. The need to keep up
with security and stability fixes dictates updating SQLite in Chromium. This comes in direct
conflict with Web SQL's requirement of behaving exactly as SQLite 3.6.19.

### API shape

Web SQL also is an API that shows its age. Being a child of the late 2000s, it's a great example of
"callback hell", as the code sample
([courtesy of Nolan Lawson](https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/)) below
impressively demonstrates. As you can see, the SQL statements (using the
[SQLite](https://www.sqlite.org/index.html) SQL dialect) are passed as strings to the database
methods.

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
                    console.log('rainstorm severity: ' + row.severity + ',  my mood: ' + row.mood);
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

{% Aside 'warning' %} This code is obsolete. Don't use it in practice. {% endAside %}

If you run this code and
[inspect the created table with Chrome DevTools](/docs/devtools/storage/websql/), this is the result
that you get:

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/MnkvXruPWsb89lFTynqX.png", alt="Inspecting the Web SQL section in Chrome DevTools shows a database called mydatabase with a table called rainstorms with the columns mood (textual) and severity (integer) that has one entry with a mood of somber and a severity of six.", width="800", height="187" %}

### Lack of implementor support

Apart from the, from a today's point of view, arcane API shape, Mozilla had a lot of
[concerns](https://hacks.mozilla.org/2010/06/beyond-html5-database-apis-and-the-road-to-indexeddb/)
about Web SQL being built upon SQLite:

_"We don't think [SQLite] is the right basis for an API exposed to general web content, not least of
all because there isn't a credible, widely accepted standard that subsets SQL in a useful way.
Additionally, we don't want changes to SQLite to affect the web later, and don't think harnessing
major browser releases (and a web standard) to SQLite is prudent."_

You can read up more on Mozilla's concerns in
[former Mozillan Vladimir Vukićević's blog post](https://web.archive.org/web/20090412154147/http://blog.vlad1.com/2009/04/06/html5-web-storage-and-sql/).
For some more history, check out the
[W3C Web Applications Working Group minutes](http://www.w3.org/2009/11/02-webapps-minutes.html#item10)
(and, if you really want to go into the details, the
[IRC logs](http://www.w3.org/2009/11/02-webapps-irc)), and the
[mailing list archives](http://lists.w3.org/Archives/Public/public-webapps/2009OctDec/0526.html).
Additionally,
[Nolan Lawson's blog post](https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/)
provides a good overview of what happened.

## Where to go from here

As pointed out in the introduction, the
[Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) and the
[Indexed Database](https://developer.mozilla.org/docs/Web/API/IndexedDB_API/Using_IndexedDB)
standards are good alternatives in many cases.

We're also working on a replacement for Web SQL based on SQLite implemented in Wasm, which will be
released in the near future. For developers looking for a drop-in replacement, we're investigating
if a shim script can be provided. The article will be updated once the replacement is ready.

## Feedback

If you have _any_ concerns about the deprecation steps communicated in this post, please let us know
on the [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev). Membership in
this group is open to anyone, and anyone is allowed to post.

## Related links

- ChromeStatus entry
  [Deprecate and remove WebSQL in third-party contexts](https://chromestatus.com/feature/5684870116278272)
- ChromeStatus entry
  [Deprecate and remove WebSQL in non-secure contexts](https://chromestatus.com/feature/5175124599767040)
- Intent to Deprecate and Remove
  [WebSQL in third-party contexts](https://groups.google.com/a/chromium.org/g/blink-dev/c/TM6YDx1Hh08/m/FxebaDQKAgAJ)
- Intent to Deprecate and Remove
  [WebSQL in non-secure contexts](https://groups.google.com/a/chromium.org/g/blink-dev/c/xdcl4yc8Ihk/m/lq35JuYOAAAJ)
- Chromium issue
  [Deprecate and remove WebSQL in third-party contexts](https://bugs.chromium.org/p/chromium/issues/detail?id=1212491)
- Chromium issue
  [Deprecate and remove WebSQL in insecure contexts](https://bugs.chromium.org/p/chromium/issues/detail?id=1212492)
- Chromium issue
  [Deprecate and remove WebSQL (Window#openDatabase)](https://bugs.chromium.org/p/chromium/issues/detail?id=695592)

## Acknowledgements

This article was reviewed by [Joe Medley](https://github.com/jpmedley). Hero image by
[Jan Antonin Kolar](https://unsplash.com/@jankolar) on
[Unsplash](https://unsplash.com/photos/lRoX0shwjUQ).
