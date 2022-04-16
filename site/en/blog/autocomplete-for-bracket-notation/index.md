---
layout: 'layouts/blog-post.njk'
title: Autocomplete for bracket notation
description: >
   Did you know you can autocomplete bracket notation in the Sources panel?
authors:
  - umarhansa
date: 2015-05-14
updated: 2015-05-19 
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/mcIwVmL8QGFVDI0rvGCA.gif", alt="Console Panel autocomplete with properties (bracket or dot notation)", width="614", height="390" %}
</figure>

Autocomplete in the Console Panel not only works with regular dot notation (e.g. `window.onload` → `window.onload`), but also with square bracket notation e.g. `window['onloa` → `window['onload']`.

Even if you have an array, you get autocomplete for the index e.g. `arr[0` → `arr[0]`.


