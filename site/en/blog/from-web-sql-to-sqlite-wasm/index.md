---
layout: 'layouts/blog-post.njk'
title: 'From Web SQL to SQLite Wasm: the database migration guide'
subhead: >
  With SQLite Wasm backed by the origin private file system, there is a versatile replacement for the deprecated Web SQL database technology. This article is a guide to migrating your data from Web SQL to SQLite Wasm.
date: 2023-03-24
updated: 2023-04-19
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/l5kRHOrUI9mQmwOTJKr7.jpg
alt: Library symbolizing a database.
authors:
  - thomassteiner
tags:
  - capabilities
---

## Required background

The post [Deprecating and removing Web SQL](/blog/deprecating-web-sql/) announced the deprecation of the Web SQL database technology. While the technology itself may be deprecated, the use cases addressed by the technology very much are not, so the follow-up post [SQLite Wasm in the browser backed by the Origin Private File System](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/), outlines a replacement set of technologies based on the [SQLite](https://sqlite.org/) database, [compiled to Web Assembly](https://sqlite.org/wasm) (Wasm), and backed by the [origin private file system](https://developer.mozilla.org/docs/Web/API/File_System_Access_API#origin_private_file_system). To close the circle, this article shows how to migrate databases over from Web SQL to SQLite Wasm.

## Migrating your databases

The following four steps demonstrate the conceptual idea of migrating a Web SQL database over to SQLite Wasm, with the SQLite database backed by the origin private file system. This can serve as the foundation for your own code customized to _your_ Web SQL migration needs.

{% Aside 'success' %}
The SQLite team have run some benchmarks on their WebAssembly implementation compared to the deprecated Web SQL. These benchmarks show that SQLite Wasm is generally about as fast as Web SQL. Sometimes it's a little slower, sometimes it's a little faster. See all details on the [results page](https://sqlite-wasm-opfs.glitch.me/speedtest.html).
{% endAside %}

### The to-be-migrated Web SQL database(s)
The baseline assumption of this migration guide is that you have one (or several) existing Web SQL databases that hold data relevant to your app. In the screenshot below, you see an example database called _mydatabase_ with a rainstorms table that maps moods to severities. Chrome DevTools allow you to [view Web SQL databases for debugging](/docs/devtools/storage/websql/#view), as shown in the following screenshot.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/5bs1vLzkKQ9rQhTmcKSN.png", alt="A Web SQL database inspected in Chrome's DevTools. The database is called mydatabase and hosts a table with three columns: row ID, mood, and severity. There are three rows of sample data.", width="800", height="512" %}

### Translating the Web SQL database to SQL statements

To migrate the data in a way that is transparent to the user, that is, without requiring them to perform any of the migration steps on their own, the pieces of data in the database need to be translated back to the original SQL statements that created them in the first place. This challenge has come up before, and the migration script used in this article—[`mywebsqldump.js`](https://web-sql-to-sqlite-wasm.glitch.me/mywebsqldump.js)—is based on a community library called [`websqldump.js`](https://github.com/sdesalas/websqldump), with some minor adjustments. The following code sample shows the code required to translate the Web SQL database _mydatabase_ to a set of SQL statements.

```js
websqldump.export({
  database: 'mydatabase',
  version: '1.0',
  success: function(sql) {
    // The SQL statements.
  },
  error: function(err) {
    // Handle the error.
  }
});
```

Running this code results in the SQL statements string below.

```sql
CREATE TABLE IF NOT EXISTS rainstorms (mood text, severity int);
INSERT INTO rainstorms(mood,severity) VALUES ('somber','6');
INSERT INTO rainstorms(mood,severity) VALUES ('rainy','8');
INSERT INTO rainstorms(mood,severity) VALUES ('stormy','2');
```

{% Aside 'warning' %}
The outlined steps show the conceptual idea tested on a small database. For migrating production-size databases, additional performance tuning steps may be necessary. For example, preprocessing the SQL statements string. One optimization would be to group the `INSERT` statements: `INSERT INTO rainstorms VALUES ('somber',6), ('rainy',8), ('stormy',2)`. You may also have to further patch `mywebsqldump.js`, so it correctly deals with corner cases present in _your_ Web SQL data.
{% endAside %}

### Importing the data into SQLite Wasm

All that remains is executing these SQL commands in the context of SQLite Wasm. For all details regarding setting SQLite Wasm up, I refer you to the article [SQLite Wasm in the browser backed by the Origin Private File System](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/), but the gist is again below. Remember that this code needs to run in a Worker, with the [required HTTP headers](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/#setting-the-required-headers) set correctly. You can install the [`@sqlite.org/sqlite-wasm`](https://www.npmjs.com/package/@sqlite.org/sqlite-wasm) package from npm.

```js
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const createSQLiteDatabase = (sqlite3, database, sql) => {
  let db;
  const fileName = `/${database}.db`;
  if (sqlite3.opfs) {
    db = new sqlite3.oo1.OpfsDb(fileName);
  } else {
    db = new sqlite3.oo1.DB(fileName, 'ct');
  }
  try {
    sql.split(';').forEach((sqlStatement) => {
      sqlStatement += ';';
      db.exec(sqlStatement);
    });
  } catch (err) {
    db.close();
    console.error(err.name, err.message);
    return;
  }
};

self.sqlite3InitModule().then(function (sqlite3) {
  // Hardcoded for brevity. You pass the two variables `database` and `sql`
  // to the Worker from the main thread.
  const database = 'mydatabase';
  const sql = `
      CREATE TABLE IF NOT EXISTS rainstorms (mood text, severity int);
      INSERT INTO rainstorms(mood,severity) VALUES ('somber','6');
      INSERT INTO rainstorms(mood,severity) VALUES ('rainy','8');
      INSERT INTO rainstorms(mood,severity) VALUES ('stormy','2');`;
  try {
     createSQLiteDatabase(sqlite3, database, sql);
  } catch (e) {
    error('Exception:', e.message);
  }
});
```

After running this code, inspect the imported database file with the [OPFS Explorer](https://chrome.google.com/webstore/detail/opfs-explorer/acndjpgkpaclldomagafnognkcgjignd) Chrome DevTools extension. There are two files now, one with the actual database, and one with journaling information. Note that these two files live in the origin private file system, so you need to use the OPFS Explorer extension to see them.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/9idHbu6bElnapJUUo73R.png", alt="Inspecting the origin private file system with the OPFS Explorer Chrome DevTools. There are two files, one called mydatabase.db and one called mydatabase.db-journal.", width="800", height="322" %}

To actually verify that the imported data is the same as the initial Web SQL data, click the file `mydatabase.db` and the OPFS Explorer extension will show a **Save File** dialog to let you save the file in the user-visible file system. With the database file saved, use a SQLite viewer app to explore the data. The [Project Fugu API Showcase](/fugu-showcase/) features several [apps for working with SQLite in the browser](/fugu-showcase/#sqlite). For example, [Sqlime — SQLite Playground](https://sqlime.org/) lets you open a SQLite database file from your hard disk and run queries on the database. As you see in the screenshot below, the rainstorm table has been correctly imported into SQLite.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/Cu9K7qrejQuXV3HCPw8o.png", alt="Exploring the mydatabase.db file in the Sqlime SQLite Playground tool. The app is shown with the SQL query select star from rainstorms limit 10 being run, resulting in the three rows from the initial sample data from Web SQL.", width="800", height="396" %}

### Freeing Web SQL storage

While it's (maybe surprisingly) [impossible to delete a Web SQL database](https://www.w3.org/TR/webdatabase/#:~:text=There%20is%20no%20way%20to%20enumerate%20or%20delete%20the%20databases%20available%20for%20an%20origin%20from%20this%20API.), you should still free some storage by dropping the now obsolete Web SQL tables after you have migrated the data into SQLite Wasm. To list all tables in a Web SQL database and drop them using JavaScript, use code as in the following snippet:

```js
const dropAllTables = () => {
  try {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name !='__WebKitDatabaseInfoTable__'",
        [],
        function (tx, result) {
          const len = result.rows.length;
          const tableNames = [];
          for (let i = 0; i < len; i++) {
            const tableName = result.rows.item(i).name;
            tableNames.push(`'${tableName}'`);
            db.transaction(function (tx) {
              tx.executeSql('DROP TABLE ' + tableName);
            });
          }
          console.log(`Dropped table${tableNames.length > 1 ? 's' : ''}: ${tableNames.join(', ')}.`);
        }
      );
    });
  } catch (err) {
    console.error(err.name, err.message);
  }
};
```

### Working with the data after the migration

After you have migrated the data, work with the data as outlined in this [Getting started code sample](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/#getting-started-code-sample). See the [SQLite Wasm API reference](https://sqlite.org/wasm/doc/trunk/api-index.md) for details. Again a reminder that you need to access SQLite Wasm from a Worker if you use the origin private file system as your storage backend.

## Test it out

This [demo](https://web-sql-to-sqlite-wasm.glitch.me/) lets you populate a Web SQL database with sample data, then dumps the Web SQL data as SQL statements, which next get imported into SQLite Wasm backed by the origin private file system. Finally, you free storage by deleting the obsolete Web SQL data. Check the [source code](https://glitch.com/edit/#!/web-sql-to-sqlite-wasm) for the full implementation, including the patched [`mywebsqldump.js`](https://web-sql-to-sqlite-wasm.glitch.me/mywebsqldump.js) file.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/0NADeamxiVBPCSuHV7bJ.png", alt="The demo app at web-sql-to-sqlite-wasm.glitch.me.", width="800", height="479" %}

## Conclusions

Migrating your Web SQL databases to SQLite Wasm backed by the origin private file system is possible in a way transparent to your users. They will not notice that their data is now hosted in the origin private file system in a SQLite database, and no longer lives in Web SQL. Overall, migrating from Web SQL to SQLite is a necessary step for web developers who want to ensure the long-term stability and scalability of their applications. While the process may require some initial effort, the benefits of a more robust, flexible, and, above all, future-proof database solution make it well worth the investment.
