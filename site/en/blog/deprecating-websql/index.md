---
layout: 'layouts/blog-post.njk'
title: Deprecating WebSQL
description: >
  The Web SQL Database standard was first proposed in April 2009 and abandoned in November 2010.
  While it was implemented in WebKit and remained active in Blink, Gecko never implemented this
  feature and WebKit deprecated it in 2019. The W3C encourages those needing web databases to adopt
  Web Storage or Indexed Database. Web SQL has been deprecated and removed for third-party contexts
  in Chromium 97. Now Chromium 105 deprecates Web SQL in insecure contexts. The complete removal of
  the feature is planned for Chromium 107.
authors:
  - thomassteiner
date: 2022-08-01
# updated: 2022-08-01
---

The [Web SQL Database](https://www.w3.org/TR/webdatabase/) proposal was first [introduced in April 2009](https://www.w3.org/TR/2009/WD-webdatabase-20091222/) and [abandoned in November 2010](https://www.w3.org/TR/webdatabase/#status-of-this-document).
While it was implemented in WebKit and remained active in Blink, Gecko never implemented this feature and [WebKit deprecated it in 2019](https://lists.webkit.org/pipermail/webkit-dev/2019-November/030968.html). The W3C encourages those needing web databases to adopt [Web Storage](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) or [Indexed Database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB). Web SQL has been deprecated and removed for third-party contexts
in Chromium&nbsp;97. Now Chromium&nbsp;105 deprecates Web SQL in insecure contexts. The complete removal of the feature is planned for Chromium&nbsp;107.

```js
openDatabase(
  // Name
  "mydatabase",
  // Version
  1,
  // Display name
  "mydatabase",
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
          "create table rainstorms (mood text, severity int)",
          // Arguments
          [],
          // Success callback
          function () {
            // Execute SQL statement
            tx.executeSql(
              // SQL statement
              "insert into rainstorms values (?, ?)",
              // Arguments
              ["somber", 6],
              // Success callback
              function () {
                // Execute SQL statement
                tx.executeSql(
                  // SQL statement
                  "select * from rainstorms where mood = ?",
                  // Arguments
                  ["somber"],
                  // Success callback
                  function (tx, res) {
                    // Do something with the result
                    var row = res.rows.item(0);
                    console.log(
                      "rainstorm severity: " +
                        row.severity +
                        ",  my mood: " +
                        row.mood
                    );
                  }
                );
              }
            );
          }
        );
      },
      // Error callback
      function (err) {
        console.log("Transaction failed!: " + err);
      },
      // Success callback);
      function () {
        console.log("Transaction succeeded!");
      }
    );
  }
);
```
