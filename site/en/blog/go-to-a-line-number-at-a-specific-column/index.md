---
layout: 'layouts/blog-post.njk'
title: Go to a line number at a specific column  
description: >
  Learn how to jump to specific line numbers in the Sources panel.
authors:
  - umarhansa
date: 2015-05-07
updated: 2015-05-19

---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/YBu3yQGC1PVvJ6vxCH69.gif", alt="DevTools - Go to a line number at a specific column.", width="608", height="432" %}
</figure>

**GOTO** a line number with a specified column using the format `:line_number:column_number` in the <kbd>CMD</kbd> + <kbd>O</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>O</kbd> (Windows / Linux) dialogue from the Sources panel editor.


1. In a file open in the **Sources** panel, press <kbd>CMD</kbd> / <kbd>Ctrl</kbd> + <kbd>O</kbd>.
1. Enter :5:9.
1. Notice you are taken to line 5, column 9.
