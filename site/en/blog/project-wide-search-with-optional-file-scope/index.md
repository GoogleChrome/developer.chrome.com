---
layout: 'layouts/blog-post.njk'
title: Project wide search with optional file scope
description: >
   Learn the secret commands to search like a pro in DevTools.
authors:
  - umarhansa
date: 2015-07-08
updated: 2015-07-08 
---


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ccPvZdFejjdDawtcUGgY.gif", alt="A project wide search with an optional file scope", width="628", height="540" %}
</figure>

Search across all sources with `Cmd + Opt + F` / `Ctrl + Shift + F`. If your query returns too many matching files, you can limit the search scope by changing the search query from:

`query`

To:

`query file:main.js`

Or:

`query file:main`


