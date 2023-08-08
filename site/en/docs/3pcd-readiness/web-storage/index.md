---
layout: layouts/doc-post.njk
title: Web Storage APIs
subhead: >
  Store key/value pairs in the browser.
description: ''
date: 2023-07-26
updated: 2023-07-31
authors:
  - nmichell
  - albertomedina
---

## State management

Both cookies and the Web Storage API are data storage mechanisms. The [Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API) is a set of capabilities of that enable websites to store persistent data on a user's device. Cookies do the same, and are often used to store a user's data and preferences.

Because the Web Storage API features are similar to cookies, without the same privacy concerns, you may find them to be useful replacements for some of your third-party cookie use cases.

## Web storage vs. cookies

There are a number of differences between web storage and cookies.

- Cookies are limited to about 4KB per domain, while Web Storage limits are between 5MB and 10MB, depending on the browser. While cookies don't hold much data, because they are sent with every HTTP request, they can consume a lot of bandwidth.

- Web Storage does not suffer from the confidentiality and weak integrity that cookies do, because local and session storage can only be read on the client.

- Web Storage provides a better programmatic model because it allows you to store data as key/value pairs. This means you can parse and use the data more easily and more intuitively. For example, you can get the key/vlaue pairs using `JSON.parse` in JavaScript in a more human readable format.

## Web Storage APIs

[Local storage](https://www.w3schools.com/jsref/prop_win_localstorage.asp): The data stored in local storage (the `Window.localStorage` object) has no expiration time, and it persists across browsing sessions. Local storage is limited to 5-10MB, depending on the browser.

[Session storage](https://www.w3schools.com/jsref/prop_win_sessionstorage.asp): The data stored in session storage (the `Window.sessionStorage` object) is cleared when the page session ends. A page session lasts for as long as the browser is open and persists over page reloads and restores.

[IndexedDB](https://web.dev/indexeddb/): This is a low-level API for client-side storage of significant amounts of structured data. This API uses indexes to enable high-performance searches of the data.

[Cache Storage API](https://web.dev/learn/pwa/caching/): This API allows you to cache network requests and responses; it's often used with [Service Workers](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) to create offline-first web applications.
