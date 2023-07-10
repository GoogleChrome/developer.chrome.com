---
layout: "layouts/doc-post.njk"
title: "View and edit local storage"
authors:
  - kaycebasques
  - sofiayem
date: 2019-03-14
updated: 2023-07-04
description: "How to view and edit `localStorage` with the Local Storage pane and the Console."
tags:
  - storage
---

This guide shows you how to use [Chrome DevTools][1] to view, edit, and delete [`localStorage`][2]
key-value pairs. Local storage saves data across browser sessions.

{% YouTube id='5o8krh_Qduk' %}

## View `localStorage` keys and values {: #view }

1. [Open DevTools](/docs/devtools/open/) on the website you want to inspect.

1. Navigate to **Application** > **Storage**  and expand **Local Storage**. Click a domain to view its key-value pairs.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eHST5dS0RZ31pFk9oIq1.png", alt="The key-value pairs of youtube.com.", width="800", height="544" %}

1. To preview the value below the table, select a pair.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jGPcY7ajhIk4ZceFP5s5.png", alt="Viewing the value of the selected key.", width="800", height="544" %}

To manually refresh the key-value pairs, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} **Refresh** in the action bar at the top.

## Filter key-value pairs {: #filter }

To quickly find a key-value pair you need, type into the filter box at the top a string that either the key or value contains.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qdds6K3eNNpkSVuNM5mu.png", alt="Filtering out key-value pairs that don't contain the string 'has'.", width="800", height="534" %}

## Create a new `localStorage` key-value pair {: #create }

1. [View the domain's `localStorage` key-value pairs][3]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Double-click the empty part of the table. DevTools creates a new row and focuses your cursor in the **Key** column.
1. Enter a new key-value pair.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/SAFPsoDmsnLJq6TMdlrs.mp4", width="800", height="434", controls="true", class="screenshot", autoplay="false" %}

## Edit `localStorage` keys or values {: #edit }

1. [View a domain's `localStorage` key-value pairs][4]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Double-click a cell in the **Key** or **Value** column to edit that key or value.
1. Refresh the page to apply.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/XgRapD1J6o6PtrDmGqa5.mp4", width="800", height="426", controls="true", class="screenshot", autoplay="false" %}

## Delete `localStorage` key-value pairs {: #delete }

1. [View a domain's `localStorage` key-value pairs][5]. For example, on this [demo page](https://jec.fish/demo/storage).
1. Click a key-value pair to select it.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete** in the action bar at the top to remove the selected pair.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AlVmA5JKa7sdkaoh92dq.png", alt="Deleting the selected key-value pair.", width="800", height="540" %}
1. Alternatively, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mMGdymtMmpYX2j3PRSfa.svg", alt="Clear all.", width="24", height="24" %} **Clear all** to remove all pairs.

## Interact with `localStorage` from the Console {: #console }

Since you can run JavaScript in the **Console**, and since the **Console** has access to the page's
JavaScript contexts, it's possible to interact with `localStorage` from the **Console**.

1. In DevTools, open the **Console**.
1. If you want to access the `localStorage` key-value pairs of a domain other than the page you're on, [select the JavaScript context](/docs/devtools/console/reference/#context) you need from the context drop-down menu in the action bar at the top.
1. Run your `localStorage` expressions in the **Console**, the same as you would in your JavaScript.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xp0MlringRUq6iaqWPzi.png", alt="Interacting with `localStorage` from the Console", width="800", height="483" %}

[1]: /docs/devtools
[2]: https://developer.mozilla.org/docs/Web/API/Window/localStorage
[3]: #view
[4]: #view
[5]: #view
[6]: #view
