---
layout: "layouts/doc-post.njk"
title: "View and edit local storage"
authors:
  - kaycebasques
date: 2019-03-14
#updated: YYYY-MM-DD
description: "How to view and edit localStorage with the Local Storage pane and the Console."
---

This guide shows you how to use [Chrome DevTools][1] to view, edit, and delete [`localStorage`][2]
key-value pairs.

## View localStorage keys and values {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane is shown
    by default.

    {% Img src="image/admin/D0n4Y2LgEnwi2x98f4Su.png", alt="The Manifest pane", width="800", height="619" %}

    **Figure 1**. The Manifest pane

2.  Expand the **Local Storage** menu.

    {% Img src="image/admin/HV8eHezUc8qcKPyDnS1S.png", alt="The Local Storage Menu", width="800", height="525" %}

    **Figure 2**. The **Local Storage** menu shows two domains: **https://developers.google.com**
    and **https://www.youtube.com**

3.  Click a domain to view its key-value pairs.

    {% Img src="image/admin/sZ8JCGib96F45euuc4pi.png", alt="The localStorage key-value pairs for the https://www.youtube.com domain", width="800", height="525" %}

    **Figure 3**. The `localStorage` key-value pairs for the **https://www.youtube.com** domain

4.  Click a row of the table to view the value in the viewer below the table.

    {% Img src="image/admin/fC3vyAbvWYXqcTRhnpun.png", alt="Viewing the value of the yt-remote-connected-devices key", width="800", height="525" %}

    **Figure 4**. Viewing the value of the `yt-remote-connected-devices` key

## Create a new localStorage key-value pair {: #create }

1.  [View a domain's `localStorage` key-value pairs][3].
2.  Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in
    the **Key** column.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/8ou4ezYdLO8WdTlOljXY.png", alt="The empty part of the table to double-click in order to create a new key-value pair", width="800", height="525" %}

    **Figure 5**. The empty part of the table to double-click in order to create a new key-value
    pair

## Edit localStorage keys or values {: #edit }

1.  [View a domain's `localStorage` key-value pairs][4].
2.  Double-click a cell in the **Key** or **Value** column to edit that key or value.

    {% Img src="image/admin/eEghzgOxFdtCglymVTfO.png", alt="Editing a localStorage key", width="800", height="525" %}

    **Figure 6**. Editing a `localStorage` key

## Delete localStorage key-value pairs {: #delete }

1.  [View a domain's `localStorage` key-value pairs][5].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.
3.  Press the Delete key or click **Delete Selected**
    {% Img src="image/admin/Ut5ykA2d9ulNxQMcrILz.png", alt="Delete Selected", width="20", height="20" %}.

## Delete all localStorage key-value pairs for a domain {: #deleteall }

1.  [View a domain's `localStorage` key-value pairs][6].
2.  Click **Clear All** {% Img src="image/admin/R7oNtQoKqUSqP55Ux0ck.png", alt="Clear All", width="26", height="26" %}.

## Interact with localStorage from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `localStorage` from the **Console**.

1.  Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if you
    want to access the `localStorage` key-value pairs of a domain other than the page you're on.

    {% Img src="image/admin/g7AlwIgHyyhjWhzrX6aI.png", alt="Changing the JavaScript context of the Console", width="800", height="525" %}

    **Figure 7**. Changing the JavaScript context of the **Console**

2.  Run your `localStorage` expressions in the Console, the same as you would in your JavaScript.

    {% Img src="image/admin/AgbPaacvuPCKVaBuQVGE.png", alt="Interacting with localStorage from the Console", width="800", height="579" %}

    **Figure 8**. Interacting with `localStorage` from the **Console**

[1]: /docs/devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
