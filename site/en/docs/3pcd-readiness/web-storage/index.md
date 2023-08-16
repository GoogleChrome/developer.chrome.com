---
layout: layouts/doc-post.njk
title: Web Storage APIs
subhead: >
  Store key/value pairs in the browser.
description: ''
date: 2023-07-26
updated: 2023-07-31
authors:
  - albertomedina
---

## State management

The [Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) is a set of capabilities of that enable websites to store persistent data on a user's device. And Cookies are a very simple mechanism to do the same. Therefore, Web Storage APIs can be good to replace the use of 1P/3P cookies when implementing functional capabilities for your site.

## Web storage vs. cookies

There are a number of differences between web storage and cookies.

- Visibility: Web Storage makes it easier to control how information stored by one window object is visible to another.

- Capacity: Cookies are limited to about 4KB per domain, while Web Storage limits are between 5MB and 10MB, depending on the browser. While cookies don't hold much data, because they are sent with every HTTP request, they can consume a lot of bandwidth.

- Vulnerabilities: Web Storage does not suffer from the confidentiality and weak integrity that cookies do, because local and session storage can only be read on the client.

- Usage: Web Storage provides a better programmatic model because it allows you to store data as key/value pairs. This means you can parse and use the data more easily and more intuitively. For example, you can get the key/vlaue pairs using `JSON.parse` in JavaScript in a more human readable format.

## Web Storage APIs

These are some of the most commony used Web Storage APIs:

- [Session storage](https://www.w3schools.com/jsref/prop_win_sessionstorage.asp): The data stored in session storage (the `Window.sessionStorage` object) is cleared when the broswer session ends. A browser session lasts for as long as the browser is open and persists over page reloads and restores.

- [Local storage](https://www.w3schools.com/jsref/prop_win_localstorage.asp): The data stored in local storage (the `Window.localStorage` object) has no expiration time, and it persists across browsing sessions. Local storage is limited to 5-10MB, depending on the browser. Typical application scenarios include: storing partially submitted input or form data, caching, and databases for simple applciations.

- [IndexedDB](https://web.dev/indexeddb/): This is a low-level API for client-side storage of significant amounts of structured data. This API uses indexes to enable high-performance searches of the data.

- [Cache Storage](https://web.dev/learn/pwa/caching/): This API allows you to cache network requests and responses; it's often used with [Service Workers](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) to create offline-first web applications.

## Storage Partitioning

To prevent certain types of side-channel cross-site tracking, Chrome is partitioning storage and communications APIs in third-party contexts.

Historically, storage has been keyed only by origin. This means that if an iframe from example.com is embedded on a.com and b.com, it could learn about your browsing habits for those two sites by storing and successfully retrieving an ID from storage. With third-party storage partitioning enabled, storage for example.com exists in two different partitions, one for a.com and the other for b.com.

Partitioning generally means that data stored by storage APIs like local storage and IndexedDB by an iframe will no longer be accessible to all contexts in the same origin. Instead, the data will only be available to contexts with the same origin and same top-level site.

Check [this article](/docs/privacy-sandbox/storage-partitioning/) to learn more details about Storage Paritioning.
