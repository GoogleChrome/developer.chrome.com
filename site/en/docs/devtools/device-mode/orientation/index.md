---
layout: "layouts/doc-post.njk"
title: "Simulate device orientation"
authors:
  - kaycebasques
date: 2018-12-18
#updated: YYYY-MM-DD
description: "Open the Sensors tab and go to the Orientation section."
---

To simulate different [device orientations][1] from Chrome DevTools:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/ybeQIXE0h2xg3nfKPFZU.png", alt="The Command Menu.", width="800", height="632" %}

    **Figure 1**. The Command Menu

2.  Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab opens
    up at the bottom of your DevTools window.
3.  From the **Orientation** list select one of the preset orientations, like **Portrait upside
    down**, or select **Custom orientation** to provide your own exact orientation.

    {% Img src="image/admin/y5lnWi2Sa77ADlcTea2h.png", alt="Selecting 'Portrait upside down' from the 'Orientation' list.", width="800", height="663" %}

    **Figure 2**. Selecting **Portrait upside down** from the **Orientation** list

    After selecting **Custom orientation** the **alpha**, **beta**, and **gamma** fields are
    enabled. See [Alpha][2], [Beta][3], and [Gamma][4] to understand how these axes work.

    You can also set a custom orientation by dragging the **Orientation Model**. Hold
    <kbd>Shift</kbd> before dragging to rotate along the **alpha** axis.

    {% Img src="image/admin/Dq2YzD2HbRXAyyrSHDun.png", alt="The Orientation Model.", width="800", height="648" %}

    **Figure 3**. The **Orientation Model**

[1]: https://developers.google.com/web/fundamentals/native-hardware/device-orientation
[2]: https://developers.google.com/web/fundamentals/native-hardware/device-orientation#alpha
[3]: https://developers.google.com/web/fundamentals/native-hardware/device-orientation#beta
[4]: https://developers.google.com/web/fundamentals/native-hardware/device-orientation#gamma
