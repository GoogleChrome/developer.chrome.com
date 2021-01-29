---
layout: "layouts/doc-post.njk"
title: "View And Edit Local Storage With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-14
updated: 2020-07-10
description: "How to view and edit localStorage with the Local Storage pane and the Console."
---

This guide shows you how to use [Chrome DevTools][1] to view, edit, and delete [`localStorage`][2]
key-value pairs.

## View localStorage keys and values {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane is shown
    by default.

    ![The Manifest pane](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane

2.  Expand the **Local Storage** menu.

    ![The Local Storage Menu](/web/tools/chrome-devtools/storage/imgs/localstoragemenu.png)

    **Figure 2**. The **Local Storage** menu shows two domains: **https://developers.google.com**
    and **https://www.youtube.com**

3.  Click a domain to view its key-value pairs.

    ![The localStorage key-value pairs for the https://www.youtube.com domain](/web/tools/chrome-devtools/storage/imgs/localstorage.png)

    **Figure 3**. The `localStorage` key-value pairs for the **https://www.youtube.com** domain

4.  Click a row of the table to view the value in the viewer below the table.

    ![Viewing the value of the yt-remote-connected-devices key](/web/tools/chrome-devtools/storage/imgs/localstorageviewer.png)

    **Figure 4**. Viewing the value of the `yt-remote-connected-devices` key

## Create a new localStorage key-value pair {: #create }

1.  [View a domain's `localStorage` key-value pairs][3].
2.  Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in
    the **Key** column.

    ![The empty part of the table to double-click in order to create a new
             key-value pair](/web/tools/chrome-devtools/storage/imgs/localstoragecreate.png)

    **Figure 5**. The empty part of the table to double-click in order to create a new key-value
    pair

## Edit localStorage keys or values {: #edit }

1.  [View a domain's `localStorage` key-value pairs][4].
2.  Double-click a cell in the **Key** or **Value** column to edit that key or value.

    ![Editing a localStorage key](/web/tools/chrome-devtools/storage/imgs/localstorageedit.png)

    **Figure 6**. Editing a `localStorage` key

## Delete localStorage key-value pairs {: #delete }

1.  [View a domain's `localStorage` key-value pairs][5].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.
3.  Press the Delete key or click **Delete Selected**
    ![Delete Selected](/web/tools/chrome-devtools/images/shared/delete.png).

## Delete all localStorage key-value pairs for a domain {: #deleteall }

1.  [View a domain's `localStorage` key-value pairs][6].
2.  Click **Clear All** ![Clear All](/web/tools/chrome-devtools/images/shared/clear.png).

## Interact with localStorage from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `localStorage` from the **Console**.

1.  Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if you
    want to access the `localStorage` key-value pairs of a domain other than the page you're on.

    ![Changing the JavaScript context of the Console](/web/tools/chrome-devtools/storage/imgs/jscontext.png)

    **Figure 7**. Changing the JavaScript context of the **Console**

2.  Run your `localStorage` expressions in the Console, the same as you would in your JavaScript.

    ![Interacting with localStorage from the Console](/web/tools/chrome-devtools/storage/imgs/localstorageconsole.png)

    **Figure 8**. Interacting with `localStorage` from the **Console**

[1]: /web/tools/chrome-devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
