---
layout: "layouts/doc-post.njk"
title: "View and edit session storage"
authors:
  - kaycebasques
date: 2019-03-14
#updated: YYYY-MM-DD
description: "How to view and edit sessionStorage with the Session Storage pane and the Console."
---

This guide shows you how to use [Chrome DevTools][1] to view, edit, and delete [`sessionStorage`][2]
key-value pairs.

## View sessionStorage keys and values {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane is shown
    by default.

    {% Img src="image/admin/Rt9sE5wcM4XChjHAEbwm.png", alt="The Manifest pane", width="800", height="619" %}

    **Figure 1**. The Manifest pane

2.  Expand the **Session Storage** menu.

    {% Img src="image/admin/FNTagOn8cnsylvpMAqls.png", alt="The Session Storage Menu", width="800", height="579" %}

    **Figure 2**. The **Session Storage** menu shows two domains: **https://developers.google.com**
    and **https://www.youtube.com**

3.  Click a domain to view its key-value pairs.

    {% Img src="image/admin/fJijNAIrM9DFmAGxkXAU.png", alt="The sessionStorage key-value pairs for the https://www.youtube.com domain", width="800", height="579" %}

    **Figure 3**. The `sessionStorage` key-value pairs for the **https://www.youtube.com** domain

4.  Click a row of the table to view the value in the viewer below the table.

    {% Img src="image/admin/YxEayGVMtIP0yExSuWVk.png", alt="Viewing the value of the yt-remote-cast-available key", width="800", height="579" %}

    **Figure 4**. Viewing the value of the `yt-remote-cast-available` key

## Create a new sessionStorage key-value pair {: #create }

1.  [View a domain's `sessionStorage` key-value pairs][3].
2.  Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in
    the **Key** column.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wHbbYT8MsU3U68Op2yWj.png", alt="The empty part of the table to double-click in order to create a new key-value pair", width="800", height="579" %}

    **Figure 5**. The empty part of the table to double-click in order to create a new key-value
    pair

## Edit sessionStorage keys or values {: #edit }

1.  [View a domain's `sessionStorage` key-value pairs][4].
2.  Double-click a cell in the **Key** or **Value** column to edit that key or value.

    {% Img src="image/admin/tEPwnClhMoj3lQGkIpa8.png", alt="Editing a sessionStorage key", width="800", height="579" %}

    **Figure 6**. Editing a `sessionStorage` key

## Delete sessionStorage key-value pairs {: #delete }

1.  [View a domain's `sessionStorage` key-value pairs][5].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.
3.  Press the Delete key or click **Delete Selected**
    {% Img src="image/admin/RZdVGIrpAWpIoQ7yo45u.png", alt="Delete Selected", width="20", height="20" %}.

## Delete all sessionStorage key-value pairs for a domain {: #deleteall }

1.  [View a domain's `sessionStorage` key-value pairs][6].
2.  Click **Clear All** {% Img src="image/admin/XOrLlc1EDHyM8wRTRhD2.png", alt="Clear All", width="26", height="26" %}.

## Interact with sessionStorage from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `sessionStorage` from the **Console**.

1.  Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if you
    want to access the `sessionStorage` key-value pairs of a domain other than the page you're on.

    {% Img src="image/admin/6CdoUiGdkS5zpuBeF9pE.png", alt="Changing the JavaScript context of the Console", width="800", height="525" %}

    **Figure 7**. Changing the JavaScript context of the **Console**

2.  Run your `sessionStorage` expressions in the Console, the same as you would in your JavaScript.

    {% Img src="image/admin/y85mudOFG83xUq9rIUJE.png", alt="Interacting with sessionStorage from the Console", width="800", height="579" %}

    **Figure 8**. Interacting with `sessionStorage` from the **Console**

[1]: /docs/devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
