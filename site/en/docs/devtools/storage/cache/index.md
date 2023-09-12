---
layout: "layouts/doc-post.njk"
title: "View cache data"
authors:
  - kaycebasques
  - sofiayem
date: 2019-03-25
updated: 2023-03-07
description: "How to view cache data from the Application panel of Chrome DevTools."
tags:
  - storage
---

This guide shows you how to use [Chrome DevTools][1] to inspect [Cache][2] data.

If you're trying to inspect [HTTP cache][3] data, this is not the guide you want. The **Size**
column of the **Network Log** has the information you're looking for. See [Log network activity][4].

## View cache data {: #view }

1. [Open DevTools](/docs/devtools/open/) > **Application** > **Storage**.

1. To view available caches, expand {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bJ1ZWs8NN8S0NaZnCHyQ.svg", alt="Expand.", width="20", height="20" %} **Cache Storage**. 

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CFQacZHmo8JXJYkQu8Zt.png", alt="Available caches.", width="800", height="486" %}

1. Click a cache to view its contents.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PyO7Sj97pIqTrMhg2Chj.png", alt="Viewing a cache's contents.", width="800", height="626" %}

1. Click a resource to view its HTTP headers in the section below the table.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NO1AvJbmgbHV61MRgMFB.png", alt="Viewing a resource's HTTP headers.", width="800", height="730" %}

1. Open the **Preview** tab to view a resource's content.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/u4QXSTPy6MFV0yjpx6YF.png", alt="Viewing a resource's content.", width="800", height="677" %}

## Refresh a resource {: #refresh }

1.  [View a cache's data][5].
1.  Select the resource that you want to refresh. DevTools highlights it blue to indicate that it's
    selected.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QOrkZLZsHeaQ0OO2Eayj.png", alt="Selecting a resource.", width="800", height="677" %}

3.  Click **Refresh** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="22", height="22" %}.

## Filter resources {: #filter }

1.  [View a cache's data][5].
1.  Use the **Filter by Path** text box to filter out any resources that do not match the path that
    you provide.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Lx2djKo3ZYnP2l6anlhT.png", alt="Filtering out resources that do not match the specified path.", width="800", height="444" %}

This example filters out resources that don't contain `script` in their path.

## Delete a resource {: #deleteresource }

1.  [View a cache's data][5].
1.  Click the resource that you want to delete. DevTools highlights it blue to indicate that it's
    selected.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/l7MuPSPJvm3ARanTwUgs.png", alt="Selecting a resource to delete.", width="800", height="506" %}

1.  Click **Delete Selected** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete selected.", width="24", height="24" %}.

## Delete all cache data {: #deletecache }

1.  Open **Application** > **Storage**.
1.  In the **Cache** section, make sure {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Cache Storage** is enabled.

1.  Click **Clear site data**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IAbkEFrH95USyQXHSwpi.png", alt="The Cache Storage checkbox and the Clear site data button.", width="800", height="654" %}

    {% Aside %}
    **Tip**: Next to **Clear site data**, enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **including third-party cookies** to clear those as well.
    {% endAside %}

[1]: /docs/devtools
[2]: https://developer.mozilla.org/docs/Web/API/Cache
[3]: https://developer.mozilla.org/docs/Web/HTTP/Caching
[4]: /docs/devtools/network#load
[5]: #view
