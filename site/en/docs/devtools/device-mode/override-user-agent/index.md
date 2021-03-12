---
layout: "layouts/doc-post.njk"
title: "Override the user agent string"
authors:
  - kaycebasques
date: 2018-12-14
#updated: YYYY-MM-DD
description:
  "Open the Network conditions tab, disable Select automatically, and choose from the list
  or enter a custom string."
---

To override the [user agent][1] string from Chrome DevTools:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    {% Img src="image/admin/6zZ617vix5m8hDk4OZQn.png", alt="The Command Menu.", width="800", height="632" %}

    **Figure 1**. The Command Menu

2.  Type `network conditions`, select **Show Network conditions**, and press <kbd>Enter</kbd> to
    open the **Network conditions** tab.
3.  In the **User agent** section disable the **Select automatically** checkbox.

    {% Img src="image/admin/5RNVgBsha4LYrVxEc5CH.png", alt="Disabling 'Select automatically'.", width="800", height="552" %}

    **Figure 2**. Disabling **Select automatically**

4.  Select a user agent string from the list, or enter your own custom string.

[1]: https://developer.mozilla.org/en-US/docs/Glossary/User_agent
