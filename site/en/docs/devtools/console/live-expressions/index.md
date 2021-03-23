---
layout: "layouts/doc-post.njk"
title: "Watch JavaScript values in real-time with Live Expressions"
authors:
  - kaycebasques
date: 2019-04-18
#updated: YYYY-MM-DD
description:
  "If you find yourself typing the same JavaScript expressions into the Console repeatedly, try Live
  Expressions instead."
---

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might find
it easier to create a **Live Expression**. With **Live Expressions** you type an expression once and
then pin it to the top of your Console. The value of the expression updates in near real-time.

## Create a Live Expression {: #create }

1.  [Open the Console][1].
2.  Click **Create Live Expression**
    {% Img src="image/admin/AvEHQZdjwsrFJOcU8JLR.png", alt="Create Live Expression", width="33", height="23" %}.
    The **Live Expression** text box appears.

    {% Img src="image/admin/8KMAI8XnGHYGmQYX34mz.png", alt="Typing document.activeElement into the Live Expression text box.", width="800", height="512" %}

    **Figure 1** Typing `document.activeElement` into the **Live Expression** text box.

3.  Type <kbd>Control</kbd>+<kbd>Enter</kbd> or <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) to save
    the expression, or click outside of the **Live Expression** text box.

[1]: /docs/devtools/console/reference#open
