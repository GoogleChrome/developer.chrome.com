---
layout: "layouts/doc-post.njk"
title: "Track element focus"
authors:
  - kaycebasques
date: 2018-12-14
#updated: YYYY-MM-DD
description:
  "Open the Console, create a Live Expression, and set the expression to
  document.activeElement."
---

Suppose that you're testing the keyboard navigation accessibility of a page. When navigating the
page with the <kbd>Tab</kbd> key, the focus ring sometimes disappears because the element that has
focus is hidden. To track the focused element in DevTools:

1.  Open the **Console**.
2.  Click **Create Live Expression**
    {% Img src="image/admin/IPDgkbaWTrf05ffw1JSt.png", alt="Create Live Expression", width="33", height="23" %}.

    {% Img src="image/admin/3iWMW3uh7GaqUWxv8uB1.png", alt="Creating a Live Expression.", width="800", height="516" %}

    **Figure 1**. Creating a **Live Expression**.

3.  Type `document.activeElement`.
4.  Click outside of the **Live Expression** UI to save.

The value that you see below `document.activeElement` is the result of the expression. Since that
expression always represents the focused element, you now have a way to always keep track of which
element has focus.

- Hover over the result to highlight the focused element in the viewport.
- Right-click the result and select **Reveal in Elements panel** to show the element in the **DOM
  Tree** on the **Elements** panel.
- Right-click the result and select **Store as global variable** to create a variable reference to
  the node that you can use in the **Console**.
