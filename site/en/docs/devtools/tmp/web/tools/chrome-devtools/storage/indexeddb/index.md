---
layout: "layouts/doc-post.njk"
title: "View And Change IndexedDB Data With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-18
updated: 2020-07-10
description: "How to view and change IndexedDB data with the Application panel and Snippets."
---

This guide shows you how to use [Chrome DevTools][1] to view and change [IndexedDB][2] data. It
assumes you're familiar with DevTools. If not, see [Get started][3]. It also assumes you're familiar
with IndexedDB. If not, see [Using IndexedDB][4].

## View IndexedDB data {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane usually
    opens by default.

    ![The Manifest pane](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane

2.  Expand the **IndexedDB** menu to see which databases are available.

    ![The IndexedDB menu](/web/tools/chrome-devtools/storage/imgs/idbmenu.png)

    **Figure 2**. The **IndexedDB** menu

    - ![Database icon](/web/tools/chrome-devtools/images/shared/database.png) **notes -
      https://mdn.github.io** represents a database, where **notes** is the name of the database and
      **https://mdn.github.io** is the origin that can access the database.
    - ![Object Store icon](/web/tools/chrome-devtools/images/shared/objectstore.png) **notes** is an
      object store.
    - **title** and **body** are [indexes][5].

      !!!.aside.aside--note

      **Known Limitation** Third-party databases are not visible. For example, if you use an
      `<iframe>` to embed an ad on your page, and your ad network uses IndexedDB, your ad network's
      IndexedDB data won't be visible. See [issue #943770][6].

      !!!

3.  Click a database to see its origin and version number.

    ![The 'notes' database](/web/tools/chrome-devtools/storage/imgs/idbdatabase.png)

    **Figure 3**. The **notes** database

4.  Click an object store to see its key-value pairs.

    !!!.aside.aside--caution

    IndexedDB data does not update in real-time. See [Refresh IndexedDB data][7].

    !!!

    ![The 'notes' object store](/web/tools/chrome-devtools/storage/imgs/idbobjectstore.png)

    **Figure 4**. The **notes** object store

    - **Total entries** is the total number of key-value pairs in the object store.
    - **Key generator value** is the next available key. This field is only shown when using [key
      generators][8].

5.  Click a cell in the **Value** column to expand that value.

    ![Viewing an IndexedDB value](/web/tools/chrome-devtools/storage/imgs/idbvalue.png)

    **Figure 5**. Viewing an IndexedDB value

6.  Click an index, such as **title** or **body** in **Figure 6** below, to sort the object store
    according to the values of that index.

    ![Sorting an object store by an index](/web/tools/chrome-devtools/storage/imgs/idbindex.png)

    **Figure 6**. An object store that is sorted alphabetically according to its **title** key

## Refresh IndexedDB data {: #refresh }

IndexedDB values in the **Application** panel do not update in real-time. Click **Refresh**
![Refresh](/web/tools/chrome-devtools/images/shared/reload.png) when viewing an object store to
refresh its data, or view a database and click **Refresh database** to refresh all data.

![Viewing a database](/web/tools/chrome-devtools/storage/imgs/idbdatabase.png)

**Figure 7**. Viewing a database

## Edit IndexedDB data {: #edit }

IndexedDB keys and values are not editable from the **Application** panel. Since DevTools has access
to page context, however, you can run JavaScript code within DevTools that edits IndexedDB data.

### Edit IndexedDB data with Snippets {: #snippets }

[Snippets][9] are a way to store and run blocks of JavaScript code within DevTools. When you run a
Snippet, the result is logged to the **Console**. You can use a Snippet to run JavaScript code that
edits an IndexedDB database.

![Using a Snippet to interact with IndexedDB](/web/tools/chrome-devtools/storage/imgs/idbsnippet.png)

**Figure 8**. Using a Snippet to interact with IndexedDB

## Delete IndexedDB data {: #delete }

### Delete an IndexedDB key-value pair {: #deletekvp }

1.  [View an IndexedDB object store][10].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.

    ![Selecting a key-value pair in order to delete it](/web/tools/chrome-devtools/storage/imgs/idbkvp1.png)

    **Figure 9**. Selecting a key-value pair in order to delete it

3.  Press the <kbd>Delete</kbd> key or click **Delete Selected**
    ![Delete Selected](/web/tools/chrome-devtools/images/shared/delete.png).

    ![How the object store looks after the key-value pair has been deleted](/web/tools/chrome-devtools/storage/imgs/idbkvp2.png)

    **Figure 10**. How the object store looks after the key-value pair has been deleted

### Delete all key-value pairs in an object store {: #deleteobjectstore }

1.  [View an IndexedDB object store][11].

    ![Viewing an object store](/web/tools/chrome-devtools/storage/imgs/idbobjectstore.png)

    **Figure 11**. Viewing an object store

2.  Click **Clear object store**
    ![Clear object store](/web/tools/chrome-devtools/images/shared/clear.png).

### Delete an IndexedDB database {: #deletedatabase }

1.  [View the IndexedDB database][12] that you want to delete.
2.  Click **Delete database**.

    ![The 'Delete database' button](/web/tools/chrome-devtools/storage/imgs/idbdatabase.png)

    **Figure 12**. The **Delete database** button

### Delete all IndexedDB storage {: #deleteall }

1.  Open the **Clear storage** pane.
2.  Make sure that the **IndexedDB** checkbox is enabled.
3.  Click **Clear site data**.

    ![The 'Clear storage' pane](/web/tools/chrome-devtools/storage/imgs/idbclearstorage.png)

    **Figure 13**. The **Clear storage** pane

[1]: /web/tools/chrome-devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[3]: /web/tools/chrome-devtools#start
[4]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
[5]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#Using_an_index
[6]: https://crbug.com/943770
[7]: #refresh
[8]:
  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_keygenerator
[9]: /web/tools/chrome-devtools/snippets
[10]: #view
[11]: #view
[12]: #view
