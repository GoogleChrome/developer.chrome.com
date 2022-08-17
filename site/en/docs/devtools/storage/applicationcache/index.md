---
layout: "layouts/doc-post.njk"
title: "Deprecated: View Application Cache Data With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-25
#updated: YYYY-MM-DD
description: "How to view Application Cache data from the Application panel of Chrome DevTools."
tags:
  - storage
---

[mdn]: https://developer.mozilla.org/docs/Web/API/Window/applicationCache

{% Aside 'warning' %}
Support for [AppCache][mdn] will be removed from Chrome and other Chromium-based browsers. We encourage developers to migrate off of AppCache now, rather than waiting any longer. Read [more](https://web.dev/appcache-removal/).
{% endAside %}

This guide shows you how to use [Chrome DevTools](/docs/devtools/) to inspect
[Application Cache][mdn]{: .external } resources.

## View Application Cache Data {: #view }

1. Click the **Sources** tab to open the **Sources** panel. The **Manifest** pane usually opens
   by default.

   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bzasEKrxVeISVxBqy42W.png", alt="The Manifest pane", width="800", height="619" %}

1. Expand the **Application Cache** section and click a cache to view its resources.

   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uWzKzxzWLNb1FeURUls6.png", alt="The Application Cache pane", width="800", height="427" %}

Each row of the table represents a cached resource.

The **Type** column represents the resource's category:

* **Master**. The `manifest` attribute on the resource indicated that this cache is the resource's master.
* **Explicit**. This resource was explicitly listed in the manifest.
* **Network**. The manifest specified that this resource must come from the network.
* **Fallback**. The URL is a fallback for another resource. The URL of the other resource is not listed in DevTools.

At the bottom of the table there are status icons indicating your network
connection and the status of the Application Cache. The Application Cache
can have the following statuses:

* **IDLE**. The cache has no new changes.
* **CHECKING**. The manifest is being fetched and checked for updates.
* **DOWNLOADING**. Resources are being added to the cache.
* **UPDATEREADY**. A new version of the cache is available.
* **OBSOLETE**. The cache is being deleted.