---
layout: 'layouts/blog-post.njk'
title: Web SQL deprecation timeline updated
description: >
  The current target version to remove Web SQL is Chromium 119.
subhead: >
  The current target version to remove Web SQL is Chromium 119.
date: 2023-05-15
updated: 2023-06-30
authors:
  - thomassteiner
tags:
  - deprecations-removals
  - storage
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/yUp8lfaCt4EmxmVei3lj.jpg
alt: Filing cabinet symbolizing a database.
---

Web SQL was first proposed in April 2009 and abandoned in November 2010. Gecko
never implemented it and WebKit removed it in 2019. Web SQL was removed for
third-party contexts in Chromium 97. Chromium 105 deprecated Web SQL in
insecure contexts and showed a warning in the DevTools Issue panel when the
feature is used. Chromium 110 removed Web SQL in insecure contexts. Complete
removal in insecure contexts and eventually all contexts is planned for Chromium 119.

- [✅ Done.] Web SQL was deprecated and removed for **third-party contexts** in
  **Chromium&nbsp;97** ({% ChromeDate '96' %}).
- [✅ Done.] Web SQL access in **insecure contexts** was deprecated as of
  **Chromium&nbsp;105** ({% ChromeDate '105' %}) at which time a warning message
  was shown in the Chrome DevTools Issue panel.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/AunrHQyWXS6AmECRn9oT.png", alt="Chrome DevTools Issues panel with a warning that reads Web SQL in non-secure contexts is deprecated.", width="800", height="158" %}

- [📍 We are here.] Web SQL access in **insecure contexts** is no longer
  available as of **Chromium&nbsp;110** ({% ChromeDate '110' %}). An
  **enterprise policy** to keep using the feature is available from
  **Chromium&nbsp;110** ({% ChromeDate '110' %}) to **Chromium&nbsp;123**
  ({% ChromeDate '123' %}).
- [🔮 In the future.] Web SQL access in **all contexts** is deprecated as of
  **Chromium&nbsp;115** ({% ChromeDate '115' %}) and a warning message is shown
  in the Chrome DevTools Issue panel.
- [🔮 In the future.] Web SQL access in **all contexts** is no longer available
  in **Chromium&nbsp;119** ({% ChromeDate '119' %})
- [🔮 In the future.] A
  [deprecation trial](/docs/web-platform/origin-trials/#deprecation-trials) to
  keep using Web SQL is available from **Chromium&nbsp;117**
  ({% ChromeDate '117' %}) to **Chromium&nbsp;123** ({% ChromeDate '123' %}).

See the post [Deprecating and removing Web SQL](/blog/deprecating-web-sql/) for all details on this deprecation.
