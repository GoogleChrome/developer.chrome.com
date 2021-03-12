---
layout: "layouts/doc-post.njk"
title: "Force print preview mode"
authors:
  - kaycebasques
date: 2018-12-14
#updated: YYYY-MM-DD
description:
  "Open the Rendering tab and select Emulate CSS media > print."
---

The [print media query][1] controls how your page looks when printed. To force your page into print
preview mode:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/vAwmfhwU6lLmrbEBCSsc.png", alt="The Command Menu", width="800", height="632" %}

    **Figure 1**. The **Command Menu**

2.  Type `rendering`, select **Show Rendering**, and then press <kbd>Enter</kbd>.
3.  Under **Emulate CSS media** select **print**.

    {% Img src="image/admin/F5e5z6N1lhwERU1TrX8c.png", alt="Print preview mode.", width="800", height="588" %}

    **Figure 2**. Print preview mode

From here, you can view and change your CSS, like any other web page. See [Get Started With Viewing
And Changing CSS][2].

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[2]: /docs/devtools/css
