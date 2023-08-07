---
layout: layouts/doc-post.njk
title: Web Storage APIs
subhead: >
  Store key/value pairs on the browser.
description: ''
date: 2023-07-26
updated: 2023-07-31
authors:
  - nmichell
  - albertomedina
---

## State management

Both cookies and Web Storage are data storage mechanisms. The term Web Storage refers to a set of capabilities of the Web Platform, which enables websites to store persistent data on a user's device. And cookies are a very simple state management mechanism, which enables servers to communicate with clients.

## Web storage vs. cookies

Looking at both cookies and web storage only from the perspective of satisfying requirements for storing data for some kind of appklications, the difference between include:

- Although cookies do store state, they are intended primarirly as a mechanism to exchange the data they hold with the server side. Web Storage can be accessed only on the client side.

- Cookies are limited to about 4KB per domain, which is not much, but since cookies are sent with every HTTP request, they can end up consuming a lot of bandwidth.

- Web Storage limits are between 5MB and 10MB, depending on the User Agent.

- Web Storage does not suffer from ther Web Confidentialit and Weak Integrity vulnerablities as cookies do, because the scoping rules that govern Web Storage: local vs. session storage.

- Web Storage provides a better programmatic model.

## Web Storage APIs

[Local storage](https://www.w3schools.com/jsref/prop_win_localstorage.asp): This is a part of the Web Storage API. The data stored in local storage has no expiration time, and it persists across browsing sessions. Local Storage is limited to about 5-10MB depending on the browser.

[Session storage](https://www.w3schools.com/jsref/prop_win_sessionstorage.asp): This is also a part of the Web Storage API. The data stored in session storage gets cleared when the page session ends. A page session lasts for as long as the browser is open and survives over page reloads and restores.

[IndexedDB](https://web.dev/indexeddb/): This is a low-level API for client-side storage of significant amounts of structured data. This API uses indexes to enable high-performance searches of the data.

[Cache Storage API](https://web.dev/learn/pwa/caching/): This API allows to cache network requests and responses, it's often used with Service Workers to create offline-first web applications.
