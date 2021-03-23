---
layout: "layouts/doc-post.njk"
title: "Blackbox Chrome Extension Scripts"
authors:
  - kaycebasques
date: 2018-12-14
#updated: YYYY-MM-DD
description: "Enable Blackbox content scripts from Settings > Blackboxing."
---

When using the **Sources** panel of Chrome DevTools to [step through code][1], sometimes you pause
on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions
that you've installed. To never pause on extension code:

1.  Press <kbd>F1</kbd> to open **Settings**. Or click **Settings**
    {% Img src="image/admin/alL4Um6RCmypEOSCEBgj.png", alt="Settings", width="28", height="28" %}.
2.  Open the **Blackboxing** tab.
3.  Enable the **Blackbox content scripts** checkbox.

    {% Img src="image/admin/SHrse0pfDPQ3fsdwkKbb.png", alt="Enabling the 'Blackbox content scripts' checkbox.", width="800", height="562" %}

    **Figure 1**. Enabling the **Blackbox content scripts** checkbox

[1]: /docs/devtools/javascript#code-stepping
