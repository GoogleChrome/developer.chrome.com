---
layout: "layouts/doc-post.njk"
title: "View and edit session storage"
authors:
  - kaycebasques
  - sofiayem
date: 2019-03-14
updated: 2023-07-04
description: "How to view and edit `sessionStorage` with the Session Storage pane and the Console."
tags:
  - storage
---

This guide shows you how to use [Chrome DevTools][1] to view, edit, and delete [`sessionStorage`][2]
key-value pairs. Session storage clears when the page session ends.

## View `sessionStorage` keys and values {: #view }

1. [Open DevTools](/docs/devtools/open/) on the website you want to inspect.

1. Navigate to **Application** > **Storage**  and expand **Session Storage**. Click a domain to view its key-value pairs.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HkF7F4kaxpT98LBU44Qb.png", alt="The key-value pairs of youtube.com.", width="800", height="550" %}

1. To preview the value below the table, select a pair.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uBuibJAcyagvF28e7r7d.png", alt="Viewing the value of the selected key.", width="800", height="550" %}

## Create a new `sessionStorage` key-value pair {: #create }

1. [View the domain's `sessionStorage` key-value pairs][3]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in
    the **Key** column.
1. Enter a new key-value pair.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/lP04T7LxqplyLVWlw1e0.mp4", width="800", height="470", controls="true", class="screenshot", autoplay="false" %}

## Edit `sessionStorage` keys or values {: #edit }

1.  [View a domain's `sessionStorage` key-value pairs][4].
2.  Double-click a cell in the **Key** or **Value** column to edit that key or value.

    {% Img src="image/admin/tEPwnClhMoj3lQGkIpa8.png", alt="Editing a `sessionStorage` key", width="800", height="579" %}

    **Figure 5**. Editing a `sessionStorage` key

## Delete `sessionStorage` key-value pairs {: #delete }

1.  [View a domain's `sessionStorage` key-value pairs][5].
2.  Click the key-value pair that you want to delete. DevTools highlights it blue to indicate that
    it's selected.
3.  Press the Delete key or click **Delete Selected**
    {% Img src="image/admin/RZdVGIrpAWpIoQ7yo45u.png", alt="Delete Selected", width="20", height="20" %}.

## Delete all `sessionStorage` key-value pairs for a domain {: #deleteall }

1.  [View a domain's `sessionStorage` key-value pairs][6].
2.  Click **Clear All** {% Img src="image/admin/XOrLlc1EDHyM8wRTRhD2.png", alt="Clear All", width="26", height="26" %}.

## Interact with `sessionStorage` from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `sessionStorage` from the **Console**.

1.  Use the **JavaScript contexts** menu to change the JavaScript context of the **Console** if you
    want to access the `sessionStorage` key-value pairs of a domain other than the page you're on.

    {% Img src="image/admin/6CdoUiGdkS5zpuBeF9pE.png", alt="Changing the JavaScript context of the Console", width="800", height="525" %}

    **Figure 6**. Changing the JavaScript context of the **Console**

2.  Run your `sessionStorage` expressions in the Console, the same as you would in your JavaScript.

    {% Img src="image/admin/y85mudOFG83xUq9rIUJE.png", alt="Interacting with `sessionStorage` from the Console", width="800", height="579" %}

    **Figure 7**. Interacting with `sessionStorage` from the **Console**

[1]: /docs/devtools
[2]: https://developer.mozilla.org/docs/Web/API/Window/sessionStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
