---
layout: 'layouts/blog-post.njk'
title: Easily duplicate DOM nodes
description: >
   You can easily change the DOM without having to edit the HTML as a giant string.
authors:
  - umarhansa
date: 2015-08-09
updated: 2015-08-19 
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/TPwxickcFYAfbKPP5nWn.gif", alt="Duplicate DOM nodes", width="688", height="366" %}
</figure>

__These are essentially cut/copy and paste operations.__

You can easily change the DOM without having to edit the HTML as a giant string.

1. Right click on a node and select __Copy__.
2. You can paste in your code editor, or for prototyping, you can paste the DOM node elsewhere in the DOM tree. The pasted node is inserted as a child of the currently selected node. In the video, I use the left arrow key to jump to the immediate parent opening tag and paste there (which is what I do in most cases).

You can also Cut (right click > Cut, Cmd + x/Ctrl + x) a DOM node and paste - which has the effect of moving the node.

__Experiment:__ Try adding more links in the header/footer of a site using this copy and paste technique and figure out at which point the layout needs improving.


