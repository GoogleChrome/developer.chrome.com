---
layout: "layouts/doc-post.njk"
title: "View Cache Data With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-25
updated: 2020-07-10
description: "How to view Cache data from the Application panel of Chrome DevTools."
---

This guide shows you how to use [Chrome DevTools][1] to inspect [Cache][2] data.

If you're trying to inspect [HTTP cache][3] data, this is not the guide you want. The **Size**
column of the **Network Log** has the information you're looking for. See [Log network activity][4].

## View cache data {: #view }

1.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane usually
    opens by default.

    ![The Manifest pane.](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane.

2.  Expand the **Cache Storage** section to view available caches.

    ![Available caches.](/web/tools/chrome-devtools/storage/imgs/cache.png)

    **Figure 2**. Available caches.

3.  Click a cache to view its contents.

    ![Viewing a cache's contents.](/web/tools/chrome-devtools/storage/imgs/cacheview.png)

    **Figure 3**. Viewing the **airhorner-0.6.11** cache.

4.  Click a resource to view its HTTP headers in the section below the table.

    ![Viewing a resource's HTTP headers.](/web/tools/chrome-devtools/storage/imgs/viewcacheresource.png)

    **Figure 4**. Viewing the HTTP headers of the **/index.html** resource.

5.  Click **Preview** to view a resource's content.

    ![Viewing a resource's content.](/web/tools/chrome-devtools/storage/imgs/cachecontent.png)

    **Figure 5**. Viewing the content of the **/scripts.comlink.global.js** resource.

## Refresh a resource {: #refresh }

1.  [View a cache's data][5].
2.  Click the resource that you want to refresh. DevTools highlights it blue to indicate that it's
    selected.

    ![Selecting a resource.](/web/tools/chrome-devtools/storage/imgs/cacheselected.png)

    **Figure 6**. Selecting the **/styles/main.css** resource.

3.  Click **Refresh** ![Refresh](/web/tools/chrome-devtools/images/shared/reload.png).

## Filter resources {: #filter }

1.  [View a cache's data][6].
2.  Use the **Filter by Path** text box to filter out any resources that do not match the path that
    you provide.

    ![Filtering out resources that do not match the specified path.](/web/tools/chrome-devtools/storage/imgs/cachefilter.png)

    **Figure 7**. Filtering out resources that do not match the `/script` path.

## Delete a resource {: #deleteresource }

1.  [View a cache's data][7].
2.  Click the resource that you want to delete. DevTools highlights it blue to indicate that it's
    selected.

    ![Selecting a resource.](/web/tools/chrome-devtools/storage/imgs/cacheselected.png)

    **Figure 8**. Selecting the **/styles/main.css** resource.

3.  Click **Delete Selected**
    ![Delete Selected](/web/tools/chrome-devtools/images/shared/delete.png).

## Delete all cache data {: #deletecache }

1.  Open **Application** > **Clear Storage**.
2.  Make sure that the **Cache Storage** checkbox is enabled.

    ![The Cache Storage checkbox.](/web/tools/chrome-devtools/storage/imgs/cachecheckbox.png)

    **Figure 9**. The **Cache Storage** checkbox.

3.  Click **Clear site data**.

    ![The Clear Site Data button.](/web/tools/chrome-devtools/storage/imgs/cacheclearsite.png)

    **Figure 10**. The **Clear Site Data** button.

[1]: /web/tools/chrome-devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[4]: /web/tools/chrome-devtools/network#load
[5]: #view
[6]: #view
[7]: #view
