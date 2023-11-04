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

{% YouTube id='5o8krh_Qduk' %}

## View `sessionStorage` keys and values {: #view }

1. [Open DevTools](/docs/devtools/open/) on the website you want to inspect.

1. Navigate to **Application** > **Storage**  and expand **Session Storage**. Click a domain to view its key-value pairs.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HkF7F4kaxpT98LBU44Qb.png", alt="The key-value pairs of youtube.com.", width="800", height="550" %}

1. To preview the value below the table, select a pair.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uBuibJAcyagvF28e7r7d.png", alt="Viewing the value of the selected key.", width="800", height="550" %}

To manually refresh the key-value pairs, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} **Refresh** in the action bar at the top.

## Filter key-value pairs {: #filter }

To quickly find a key-value pair you need, type into the filter box at the top a string that either the key or value contains.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s9ukUideEkouZ5Fj97uT.png", alt="Filtering out key-value pairs that don't contain the string 'false'.", width="800", height="534" %}

## Create a new `sessionStorage` key-value pair {: #create }

1. [View the domain's `sessionStorage` key-value pairs][3]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in
    the **Key** column.
1. Enter a new key-value pair.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/lP04T7LxqplyLVWlw1e0.mp4", width="800", height="470", controls="true", class="screenshot", autoplay="false" %}

## Edit `sessionStorage` keys or values {: #edit }

1. [View a domain's `sessionStorage` key-value pairs][4]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Double-click a cell in the **Key** or **Value** column to edit that key or value.
1. Refresh the page to apply.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/tyYwiraWbkhE4TY1j0kA.mp4", width="800", height="427", controls="true", class="screenshot", autoplay="false" %}

## Delete `sessionStorage` key-value pairs {: #delete }

1. [View a domain's `sessionStorage` key-value pairs][5]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Click a key-value pair to select it.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete** in the action bar at the top to remove the selected pair.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iSLfoyyLdbQbKefIIMzo.png", alt="Deleting the selected key-value pair.", width="800", height="534" %}
1. Alternatively, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mMGdymtMmpYX2j3PRSfa.svg", alt="Clear all.", width="24", height="24" %} **Clear all** to remove all pairs.

## Interact with `sessionStorage` from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `sessionStorage` from the **Console**.

1. In DevTools, open the **Console**.
1. If you want to access the `sessionStorage` key-value pairs of a domain other than the page you're on, [select the JavaScript context](/docs/devtools/console/reference/#context) you need from the context drop-down menu in the action bar at the top.
1. Run your `sessionStorage` expressions in the **Console**, the same as you would in your JavaScript.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yqtA3jOalfsNO8ZH9DIo.png", alt="Interacting with `sessionStorage` from the Console", width="800", height="421" %}

[1]: /docs/devtools
[2]: https://developer.mozilla.org/docs/Web/API/Window/sessionStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
