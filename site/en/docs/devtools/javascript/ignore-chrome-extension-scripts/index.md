---
layout: "layouts/doc-post.njk"
title: "Ignore Chrome Extension Scripts"
authors:
  - kaycebasques
date: 2018-12-14
updated: 2022-10-31
description: "Ignore content scripts from Settings > Ignore List."
---

When using the **Sources** panel of Chrome DevTools to [step through code][1], sometimes you pause on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions that you've installed.

To never pause on extension code:

1.  Press <kbd>F1</kbd> to open **Settings**. Or click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Setings.", width="24", height="24" %} in the action bar at the top of DevTools.
2.  Open the **Ignore List** tab.
3.  Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Add content scripts to ignore list**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gITIpgMzlzuTyPD8XXKU.png", alt="Enabling the 'Add content scripts to ignore list' checkbox.", width="800", height="548" %}

[1]: /docs/devtools/javascript#code-stepping
