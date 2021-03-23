---
title: "The Chromium Chronicle #19: Faster Development with CLion"
description: >
  CLion IDE makes it possible to navigate across symbols, search the codebase,
  and more.
layout: 'layouts/blog-post.njk'
date: 2021-03-30
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 19:** by Tom Hughes in Mountain View, CA (March, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

When dealing with large codebases, it's useful to have the code indexed, so you can navigate across symbols. CodeSearch works for Google3 and Chromium, but doesn't yet support Chrome OS. Don't despair, you can use the CLion IDE (go/clion-for-chromeos) to get this functionality, in addition to many more useful features.

<!-- Row 1 -->
{% Columns %}

{% Column %}
[Find Usages][find-usages] of methods. Navigate directly to definitions from
the source.
{% endColumn %}

{% Column %}
{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/iQqaFyy8mneSlmR7iNOY.png", alt="Find usage of GetFpMode in Project and Libraries", width="764", height="554" %}
{% endColumn %}

{% endColumns %}

<!-- Row 2 -->
{% Columns %}

{% Column %}
Use [Global Search][global-search] to search across all files and symbols in
Chrome OS by tapping the *Shift* key twice.
{% endColumn %}

{% Column %}
{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/xKiEi1RyKmASxNtaSxrD.png", alt="Global search for 'biod metrics'", width="800", height="168" %}
{% endColumn %}

{% endColumns %}

<!-- Row 3 -->
{% Columns %}

{% Column %}
[Refactor][refactor] code, rename symbols, change signatures, pull class
members up and down, extract values, and more.
{% endColumn %}

{% Column %}
{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/IVRaDq2tY6xGM9SRYucl.png", alt="Refactor dialog", width="800", height="405" %}
{% endColumn %}

{% endColumns %}

[find-usages]: https://www.jetbrains.com/clion/features/navigation-and-usages-searches.html
[global-search]: https://www.jetbrains.com/help/clion/searching-everywhere.html
[refactor]: https://www.jetbrains.com/help/clion/refactoring-source-code.html
