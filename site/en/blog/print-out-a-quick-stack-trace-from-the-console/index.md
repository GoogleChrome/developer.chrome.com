---
layout: 'layouts/blog-post.njk'
title: Print out a quick stack trace from the Console
description: >
   You can use console.trace() to get a quick and easy stack trace to better understand code execution flow.
authors:
  - umarhansa
date: 2015-07-13 
updated: 2015-07-13 
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/S7WHiifUByoS3OyTYxQD.gif", alt="Print out a quick stack trace from the Console.", width="674", height="702" %}
</figure>

You can use `console.trace()` to get a quick and easy stack trace to better understand code execution flow.


Notes:

- You get file names and line numbers which you can click on to navigate to the source.
- Console.trace is compatible with the snippets feature of Chrome DevTools.
- console.trace is part of the Console API (just like `console.log`)



