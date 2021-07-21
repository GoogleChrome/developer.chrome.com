---
layout: "layouts/doc-post.njk"
title: "View Cache data"
authors:
  - kaycebasques
date: 2019-03-25
#updated: YYYY-MM-DD
description: "How to view Cache data from the Application panel of Chrome DevTools."
---

This guide shows you how to use [Chrome DevTools][1] to inspect [Cache][2] data.

If you're trying to inspect [HTTP cache][3] data, this is not the guide you want. The **Size**
column of the **Network Log** has the information you're looking for. See [Log network activity][4].

## View cache data {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane usually
    opens by default.

    {% Img src="image/admin/3tTFCU70dPYRD95kmmB2.png", alt="The Manifest pane.", width="800", height="619" %}

    **Figure 1**. The Manifest pane.

2.  Expand the **Cache Storage** section to view available caches.

    {% Img src="image/admin/4h1B7kXmeAtOpE2RIiWX.png", alt="Available caches.", width="800", height="573" %}

    **Figure 2**. Available caches.

3.  Click a cache to view its contents.

    {% Img src="image/admin/meUW7vB4HHJ2Jtm3MOSo.png", alt="Viewing a cache's contents.", width="800", height="408" %}

    **Figure 3**. Viewing the **airhorner-0.6.11** cache.

4.  Click a resource to view its HTTP headers in the section below the table.

    {% Img src="image/admin/7KpwTx6x1vZmknjLdt0o.png", alt="Viewing a resource's HTTP headers.", width="800", height="521" %}

    **Figure 4**. Viewing the HTTP headers of the **/index.html** resource.

5.  Click **Preview** to view a resource's content.

    {% Img src="image/admin/hsgw21Df0XNW29lHwbXz.png", alt="Viewing a resource's content.", width="800", height="477" %}

    **Figure 5**. Viewing the content of the **/scripts.comlink.global.js** resource.

## Refresh a resource {: #refresh }

1.  [View a cache's data][5].
2.  Click the resource that you want to refresh. DevTools highlights it blue to indicate that it's
    selected.

    {% Img src="image/admin/CnT5LMGVd696SCltMJdW.png", alt="Selecting a resource.", width="800", height="488" %}

    **Figure 6**. Selecting the **/styles/main.css** resource.

3.  Click **Refresh** {% Img src="image/admin/b55bnqwzTUDyXdgIP7pd.png", alt="Refresh", width="24", height="25" %}.

## Filter resources {: #filter }

1.  [View a cache's data][6].
2.  Use the **Filter by Path** text box to filter out any resources that do not match the path that
    you provide.

    {% Img src="image/admin/RiYDO2lVWdbXNLRSOMM8.png", alt="Filtering out resources that do not match the specified path.", width="800", height="382" %}

    **Figure 7**. Filtering out resources that do not match the `/script` path.

## Delete a resource {: #deleteresource }

1.  [View a cache's data][7].
2.  Click the resource that you want to delete. DevTools highlights it blue to indicate that it's
    selected.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/3MLpzyWtyg9MyCsBKr0T.png", alt="Selecting a resource.", width="800", height="488" %}

    **Figure 8**. Selecting the **/styles/main.css** resource.

3.  Click **Delete Selected**
    {% Img src="image/admin/7n8KigaAtonB8ZzKDrkj.png", alt="Delete Selected", width="20", height="20" %}.

## Delete all cache data {: #deletecache }

1.  Open **Application** > **Clear Storage**.
2.  Make sure that the **Cache Storage** checkbox is enabled.

    {% Img src="image/admin/f7eXNmgoU2BqwR8Jxfvg.png", alt="The Cache Storage checkbox.", width="800", height="572" %}

    **Figure 9**. The **Cache Storage** checkbox.

3.  Click **Clear site data**.

    {% Img src="image/admin/C0MQhJ0YhFIuKudvcghG.png", alt="The Clear Site Data button.", width="800", height="572" %}

    **Figure 10**. The **Clear Site Data** button.

[1]: /docs/devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[4]: /docs/devtools/network#load
[5]: #view
[6]: #view
[7]: #view
