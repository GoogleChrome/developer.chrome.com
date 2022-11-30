---
layout: "layouts/doc-post.njk"
title: "Ignore Chrome Extension Scripts"
authors:
  - kaycebasques
  - sofiayem
date: 2018-12-14
updated: 2022-11-29
description: "Ignore content scripts from Settings > Ignore List."
---

When using the **Sources** panel of Chrome DevTools to [step through code][1], sometimes you pause
on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions
that you've installed. To never pause on extension code:

1. Press <kbd>F1</kbd> or click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings**.
2. Open the **Ignore List** tab.
3. Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing** and {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Add content scripts to ignore list**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/61Ez8rtic95aCrG0WhPi.png", alt="Settings DevTools to ignore extensions code.", width="800", height="525" %}

[1]: /docs/devtools/javascript#code-stepping
