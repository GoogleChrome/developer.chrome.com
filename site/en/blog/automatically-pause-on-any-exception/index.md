---
layout: 'layouts/blog-post.njk'
title: Automatically pause on any exception
description: >
   In the DevTools, you can automatically pause on any exception (especially useful for uncaught exceptions).
authors:
  - umarhansa
date: 2015-05-16
updated: 2015-05-19
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/mcIwVmL8QGFVDI0rvGCA.gif", alt="Automatically pause on any exception", width="614", height="390" %}
</figure>

In DevTools, you can automatically pause on any exception (especially useful for __uncaught__ exceptions). Just enable 'Pause on exceptions' within the Sources Panel. Optionally, you can also pause on __caught__ exceptions.

This means the debugger will pause __before__ that red message appears in the Console and you get a chance to inspect what may have gone wrong.



