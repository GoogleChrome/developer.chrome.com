---
layout: "layouts/doc-post.njk"
title: "Disable JavaScript With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-01-31
updated: 2020-07-10
description: "Open the Command Menu and run the &#34;Disable JavaScript&#34; command."
---

To see how a web page looks and behaves when JavaScript is disabled:

1.  [Open Chrome DevTools][1].
2.  Press Control+Shift+P or Command+Shift+P (Mac) to open the **Command Menu**.

    ![The Command Menu.](/web/tools/chrome-devtools/images/shared/command-menu.png)

    **Figure 1**. The Command Menu

3.  Start typing `javascript`, select **Disable JavaScript**, and then press Enter to run the
    command. JavaScript is now disabled.

    ![Selecting 'Disable JavaScript' in the Command Menu.](/web/tools/chrome-devtools/javascript/imgs/disable-javascript.png)

    **Figure 2**. Selecting **Disable JavaScript** in the Command Menu

    The yellow warning icon next to **Sources** reminds you that JavaScript is disabled.

    ![The warning icon next to Sources.](/web/tools/chrome-devtools/javascript/imgs/disabled-javascript-warning.png)

    **Figure 3**. The warning icon next to **Sources**

JavaScript will remain disabled in this tab so long as you have DevTools open.

You may want to reload the page to see if and how the page depends on JavaScript while loading.

To re-enable JavaScript:

- Open the Command Menu again and run the **Enable JavaScript** command.
- Close DevTools.

[1]: /web/tools/chrome-devtools/open
