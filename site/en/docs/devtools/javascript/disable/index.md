---
layout: "layouts/doc-post.njk"
title: "Disable JavaScript"
authors:
  - kaycebasques
date: 2019-01-31
#updated: YYYY-MM-DD
description: "Open the Command Menu and run the Disable JavaScript command."
---

To see how a web page looks and behaves when JavaScript is disabled:

1.  [Open Chrome DevTools][1].
2.  Press Control+Shift+P or Command+Shift+P (Mac) to open the **Command Menu**.

    {% Img src="image/admin/iGnR09vHOtXYztNupYUU.png", alt="The Command Menu.", width="800", height="632" %}

    **Figure 1**. The Command Menu

3.  Start typing `javascript`, select **Disable JavaScript**, and then press Enter to run the
    command. JavaScript is now disabled.

    {% Img src="image/admin/v5K0a7jgtCbS9R18Vf6j.png", alt="Selecting 'Disable JavaScript' in the Command Menu.", width="800", height="464" %}

    **Figure 2**. Selecting **Disable JavaScript** in the Command Menu

    The yellow warning icon next to **Sources** reminds you that JavaScript is disabled.

    {% Img src="image/admin/FIUqH0pwaKOW4V4BxPsD.png", alt="The warning icon next to Sources.", width="800", height="498" %}

    **Figure 3**. The warning icon next to **Sources**

JavaScript will remain disabled in this tab so long as you have DevTools open.

You may want to reload the page to see if and how the page depends on JavaScript while loading.

To re-enable JavaScript:

- Open the Command Menu again and run the **Enable JavaScript** command.
- Close DevTools.

[1]: /docs/devtools/open
