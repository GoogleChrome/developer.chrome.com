---
layout: "layouts/doc-post.njk"
title: "View Application Cache Data With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-25
updated: 2021-01-18
description: "How to view Application Cache data from the Application panel of Chrome DevTools."
---

!!!.aside.aside--warning

The Application Cache API is [being removed from the web platform][1] .

!!!

This guide shows you how to use [Chrome DevTools][2] to inspect [Application Cache][3] resources.

## View Application Cache Data {: #view }

1.  Click the **Sources** tab to open the **Sources** panel. The **Manifest** pane usually opens by
    default.

    ![The Manifest pane.](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane.

2.  Expand the **Application Cache** section and click a cache to view its resources.

    ![The Application Cache pane.](/web/tools/chrome-devtools/storage/imgs/appcache.png)

    **Figure 2**. The Application Cache pane.

Each row of the table represents a cached resource.

The **Type** column represents the [resource's category][4]:

- **Master**. The `manifest` attribute on the resource indicated that this cache is the resource's
  master.
- **Explicit**. This resource was explicitly listed in the manifest.
- **Network**. The manifest specified that this resource must come from the network.
- **Fallback**. The URL is a fallback for another resource. The URL of the other resource is not
  listed in DevTools.

At the bottom of the table there are status icons indicating your network connection and the status
of the Application Cache. The Application Cache can have the following statuses:

- **IDLE**. The cache has no new changes.
- **CHECKING**. The manifest is being fetched and checked for updates.
- **DOWNLOADING**. Resources are being added to the cache.
- **UPDATEREADY**. A new version of the cache is available.
- **OBSOLETE**. The cache is being deleted.

[1]: https://web.dev/appcache-removal/
[2]: /web/tools/chrome-devtools
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/applicationCache
[4]:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache#Resources_in_an_application_cache
