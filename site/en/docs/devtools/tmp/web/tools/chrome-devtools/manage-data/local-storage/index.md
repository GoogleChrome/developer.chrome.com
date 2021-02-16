---
layout: "layouts/doc-post.njk"
title: "Inspect and Manage Storage, Databases, and Caches"
authors:
  - kaycebasques
date: 2015-04-13
updated: 2020-07-10
description: "Inspect and manage storage, databases, and caches from the Application panel."
---

!!!.aside.aside--caution

This page is deprecated.

!!!

Inspect and manage storage, databases, and caches from the **Application** panel.

## TL;DR {: #tldr }

- View and edit local and session storage.
- Inspect and modify IndexedDB databases.
- Execute statements on a Web SQL database.
- View Application and Service Worker Caches.
- Clear all storage, databases, caches, and service workers with a single button click.

## Local storage {: #local-storage }

See [View And Edit Local Storage With Chrome DevTools][1].

## Session storage {: #session-storage }

See [View And Edit Session Storage With Chrome DevTools][2].

## IndexedDB {: #indexeddb }

See [View And Change IndexedDB Data With Chrome DevTools][3].

## Web SQL {: #web-sql }

See [View And Edit Web SQL Data][4].

## Application Cache {: #application-cache }

See [View Application Cache Data][5].

## Service Worker Caches {: #service-worker-caches }

See [View Cache Data][6].

## Clear service workers, storage, databases, and caches {: #clear-storage }

Sometimes you just need to wipe all of the data for a given origin. The **Clear Storage** pane on
the **Application** panel lets you selectively unregister service workers, storage, and caches. To
clear data, just enable the checkboxes next to the components that you want to wipe, and then click
**Clear site data**. The action wipes all of the data for the origin listed under the **Clear
storage** label.

{% Img src="image/admin/r52uDNwdqwMXLE6NT6xI.png", alt="clear storage", width="718", height="496" %}

[1]: /web/tools/chrome-devtools/storage/localstorage
[2]: /web/tools/chrome-devtools/storage/sessionstorage
[3]: /web/tools/chrome-devtools/storage/indexeddb
[4]: /web/tools/chrome-devtools/storage/websql
[5]: /web/tools/chrome-devtools/storage/applicationcache
[6]: /web/tools/chrome-devtools/storage/cache
