---
layout: 'layouts/blog-post.njk'
title: Get and debug event listeners 
description: >
  Get and debug event listeners in DevTools with these console commands.
authors:
  - umarhansa
date: 2015-05-17
updated: 2015-05-19

---


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/GiTDBIBy7p6BSj1xzIqb.gif", alt="Get and debug event listeners", width="678", height="486" %}
</figure>

You can use `getEventListeners(node)` in the Console Panel to retrieve registered event listeners on the passed in DOM node. In addition to that, the video clip shows `debug(fn)`invoking the debugger when `fn` is called.



