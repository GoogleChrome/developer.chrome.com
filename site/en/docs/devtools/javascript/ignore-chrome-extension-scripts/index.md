---
layout: "layouts/doc-post.njk"
title: "Ignore Chrome Extension Scripts"
authors:
  - kaycebasques
date: 2018-12-14
updated: 2021-08-11
description: "Ignore content scripts from Settings > Ignore List."
---

When using the **Sources** panel of Chrome DevTools to [step through code][1], sometimes you pause
on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions
that you've installed. To never pause on extension code:

1.  Press <kbd>F1</kbd> to open **Settings**. Or click **Settings**
    {% Img src="image/admin/alL4Um6RCmypEOSCEBgj.png", alt="Settings", width="28", height="28" %}.
2.  Open the **Ignore List** tab.
3.  Enable the **Add content scripts to ignore list** checkbox.

    {% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/DFANGZspw5B4IlgO04I6.png", alt="Enabling the 'Add content scripts to ignore list' checkbox.", width="800", height="552" %}

    **Figure 1**. Enabling the **ignore list** checkbox

[1]: /docs/devtools/javascript#code-stepping
