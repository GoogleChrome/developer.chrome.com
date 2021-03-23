---
layout: "layouts/doc-post.njk"
title: "View and change IndexedDB data"
authors:
  - kaycebasques
date: 2019-03-18
#updated: YYYY-MM-DD
description: "How to view and change IndexedDB data with the Application panel and Snippets."
---

This guide shows you how to use [Chrome DevTools][1] to view and change [IndexedDB][2] data. It
assumes you're familiar with DevTools. If not, see [Get started][3]. It also assumes you're familiar
with IndexedDB. If not, see [Using IndexedDB][4].

## View IndexedDB data {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane usually
    opens by default.

    {% Img src="image/admin/JXXI9yZ0j9xCVs4W4R1C.png", alt="The Manifest pane", width="800", height="619" %}

    **Figure 1**. The Manifest pane

2.  Expand the **IndexedDB** menu to see which databases are available.

    {% Img src="image/admin/SLH67ZeSBmZMOHW8y036.png", alt="The IndexedDB menu", width="800", height="579" %}

    **Figure 2**. The **IndexedDB** menu

    - {% Img src="image/admin/621QGydZcQbvLxEXFyEj.png", alt="Database icon", width="24", height="26" %} **notes -
      https://mdn.github.io** represents a database, where **notes** is the name of the database and
      **https://mdn.github.io** is the origin that can access the database.
    - {% Img src="image/admin/iCTUUGCj14KSIMN6brU8.png", alt="Object Store icon", width="26", height="22" %} **notes** is an
      object store.
    - **title** and **body** are [indexes][5].

      {% Aside %}

      **Known Limitation** Third-party databases are not visible. For example, if you use an
      `<iframe>` to embed an ad on your page, and your ad network uses IndexedDB, your ad network's
      IndexedDB data won't be visible. See [issue #943770][6].

      {% endAside %}

3.  Click a database to see its origin and version number.

    {% Img src="image/admin/bXK6EnZMo6yDUwkoFLXc.png", alt="The 'notes' database", width="800", height="579" %}

    **Figure 3**. The **notes** database

4.  Click an object store to see its key-value pairs.

    {% Aside 'caution' %}

    IndexedDB data does not update in real-time. See [Refresh IndexedDB data][7].

    {% endAside %}

    {% Img src="image/admin/w7r5L2I6CD9EIlCCZyVe.png", alt="The 'notes' object store", width="800", height="415" %}

    **Figure 4**. The **notes** object store

    - **Total entries** is the total number of key-value pairs in the object store.
    - **Key generator value** is the next available key. This field is only shown when using [key
      generators][8].

5.  Click a cell in the **Value** column to expand that value.

    {% Img src="image/admin/84k10iTRZfFTGd6HAGXv.png", alt="Viewing an IndexedDB value", width="800", height="415" %}

    **Figure 5**. Viewing an IndexedDB value

6.  Click an index, such as **title** or **body** in **Figure 6** below, to sort the object store
    according to the values of that index.

    {% Img src="image/admin/lkksyFWKnZbSJZGWIdsi.png", alt="Sorting an object store by an index", width="800", height="384" %}

    **Figure 6**. An object store that is sorted alphabetically according to its **title** key

## Refresh IndexedDB data {: #refresh }

IndexedDB values in the **Application** panel do not update in real-time. Click **Refresh**
{% Img src="image/admin/t6Vwc2XfZKsrmIRJmO09.png", alt="Refresh", width="24", height="25" %} when viewing an object store to
refresh its data, or view a database and click **Refresh database** to refresh all data.

{% Img src="image/admin/bXK6EnZMo6yDUwkoFLXc.png", alt="Viewing a database", width="800", height="579" %}

**Figure 7**. Viewing a database

## Edit IndexedDB data {: #edit }

IndexedDB keys and values are not editable from the **Application** panel. Since DevTools has access
to page context, however, you can run JavaScript code within DevTools that edits IndexedDB data.

### Edit IndexedDB data with Snippets {: #snippets }

[Snippets][9] are a way to store and run blocks of JavaScript code within DevTools. When you run a
Snippet, the result is logged to the **Console**. You can use a Snippet to run JavaScript code that
edits an IndexedDB database.

{% Img src="image/admin/DHdPZXwfsagXnt25cRsl.png", alt="Using a Snippet to interact with IndexedDB", width="800", height="743" %}

**Figure 8**. Using a Snippet to interact with IndexedDB

## Delete IndexedDB data {: #delete }

### Delete an IndexedDB key-value pair {: #deletekvp }

1.  [View an IndexedDB object store][10].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.

    {% Img src="image/admin/vRnv2bHWTWBo6iWH8hCn.png", alt="Selecting a key-value pair in order to delete it", width="800", height="357" %}

    **Figure 9**. Selecting a key-value pair in order to delete it

3.  Press the <kbd>Delete</kbd> key or click **Delete Selected**
    {% Img src="image/admin/LIWHfgDB8ZvCTPHtXYxt.png", alt="Delete Selected", width="20", height="20" %}.

    {% Img src="image/admin/3kLjkSWE1DjgcCSUZFMW.png", alt="How the object store looks after the key-value pair has been deleted", width="800", height="357" %}

    **Figure 10**. How the object store looks after the key-value pair has been deleted

### Delete all key-value pairs in an object store {: #deleteobjectstore }

1.  [View an IndexedDB object store][11].

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FJ6eP0ZU0g7QuA1TxBBP.png", alt="Viewing an object store", width="800", height="415" %}

    **Figure 11**. Viewing an object store

2.  Click **Clear object store**
    {% Img src="image/admin/ARGsVs91SSwdHjW2p6CP.png", alt="Clear object store", width="26", height="26" %}.

### Delete an IndexedDB database {: #deletedatabase }

1.  [View the IndexedDB database][12] that you want to delete.
2.  Click **Delete database**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hhUoSxlRKF2j6kacnKem.png", alt="The 'Delete database' button", width="800", height="579" %}

    **Figure 12**. The **Delete database** button

### Delete all IndexedDB storage {: #deleteall }

1.  Open the **Clear storage** pane.
2.  Make sure that the **IndexedDB** checkbox is enabled.
3.  Click **Clear site data**.

    {% Img src="image/admin/wJKlzu5mw7RZMEpVvUCR.png", alt="The 'Clear storage' pane", width="800", height="700" %}

    **Figure 13**. The **Clear storage** pane

[1]: /docs/devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[3]: /docs/devtools/overview/#start
[4]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
[5]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#Using_an_index
[6]: https://crbug.com/943770
[7]: #refresh
[8]:
  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_keygenerator
[9]: /docs/devtools/snippets
[10]: #view
[11]: #view
[12]: #view
