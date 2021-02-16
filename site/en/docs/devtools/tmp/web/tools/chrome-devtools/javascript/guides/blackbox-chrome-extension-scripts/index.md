---
layout: "layouts/doc-post.njk"
title: "Blackbox Chrome Extension Scripts"
authors:
  - kaycebasques
date: 2018-12-14
updated: 2020-10-01
description: "Enable &#34;Blackbox content scripts&#34; from Settings &gt; Blackboxing."
---

When using the **Sources** panel of Chrome DevTools to [step through code][1], sometimes you pause
on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions
that you've installed. To never pause on extension code:

1.  Press <kbd>F1</kbd> to open **Settings**. Or click **Settings**
    ![Settings](/web/tools/chrome-devtools/images/shared/capture-settings.png).
2.  Open the **Blackboxing** tab.
3.  Enable the **Blackbox content scripts** checkbox.

    ![Enabling the 'Blackbox content scripts' checkbox.](/web/tools/chrome-devtools/javascript/guides/images/blackbox-content-scripts.png)

    **Figure 1**. Enabling the **Blackbox content scripts** checkbox

[1]: /web/tools/chrome-devtools/javascript#code-stepping
