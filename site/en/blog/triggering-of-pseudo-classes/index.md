---
layout: 'layouts/blog-post.njk'
title: Triggering of pseudo classes
description: >
   Learn how to trigger pseudo classes such as :active to properly debug your CSS.
authors:
  - umarhansa
date: 2015-05-11
updated: 2015-05-18

---


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Gau53S03WIMcPweEzMoj.gif", alt="Triggering of pseudo classes in devtools.", width="726", height="530" %}
</figure>

Pseudo classes on elements can be triggered to investigate how an element may react if it were to be hovered over for example. You can right click on a node in the Elements panel and select Force element state. Alternatively, the Toggle element state icon can be clicked on in the Styles sub-pane.

When an element has some sort of state applied, you'll get a little visual indicator to the left of the nodes' opening tag and in some cases the closing tag too (if they are far apart).

We can trigger: active, focus, hover and visited pseudo classes.


