---
layout: 'layouts/blog-post.njk'
title: Use keyboard to navigate through callstack
description: >
   How to set a breakpoint and navigate through the call stack with keyboard shortcuts.
authors:
  - umarhansa
date: 2015-05-18
updated: 2015-05-18

---


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/iXZsKWtv74fp41Pp2NTE.gif", alt="Set a breakpoint and navigate through the call stack with keyboard shortcuts", width="628", height="434" %}
</figure>

There are a few keyboard shortcuts when dealing with the debugger. A few are:


- Toggle a breakpoint while on a line: Cmd + B
- Select the next call frame: Ctrl + .
- Select the previous call frame: Ctrl + ,

Also, you may notice from a few Dev Tips ago ([21. highlight paused statement](https://umaar.com/dev-tips/21-highlight-paused-statement/)) that when you navigate through the call stack, the exact column is highlighted.


