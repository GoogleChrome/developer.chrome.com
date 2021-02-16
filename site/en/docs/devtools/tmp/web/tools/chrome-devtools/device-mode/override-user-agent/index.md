---
layout: "layouts/doc-post.njk"
title: "Override The User Agent String From Chrome DevTools"
authors:
  - kaycebasques
date: 2018-12-14
updated: 2020-07-10
description:
  "Open the Network conditions tab, disable &#34;Select automatically&#34;, and choose from the list
  or enter a custom string."
---

To override the [user agent][1] string from Chrome DevTools:

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) to open the
    **Command Menu**.

    ![The Command Menu.](/web/tools/chrome-devtools/images/shared/command-menu.png)

    **Figure 1**. The Command Menu

2.  Type `network conditions`, select **Show Network conditions**, and press <kbd>Enter</kbd> to
    open the **Network conditions** tab.
3.  In the **User agent** section disable the **Select automatically** checkbox.

    ![Disabling 'Select automatically'.](/web/tools/chrome-devtools/device-mode/imgs/user-agent.png)

    **Figure 2**. Disabling **Select automatically**

4.  Select a user agent string from the list, or enter your own custom string.

[1]: https://developer.mozilla.org/en-US/docs/Glossary/User_agent
