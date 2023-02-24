---
layout: 'layouts/doc-post.njk'
title: Using promises
subhead: 'How to use promises in extension APIs'
description: 'How to use promises in extension APIs'
date: 2021-03-26
updated: 2023-02-22
---

In Manifest V3, many extension API methods return promises. A *Promise* is a proxy or placeholder for a value returned by an asynchronous method. If you've never used Promises, you can [read about them on MDN](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises). This page describes what you need to know to use them in a Chrome extension.

## When can I use Promises?

It's long been possible to "promisify" Chrome extension APIs using libraries. Starting in Manifest V3, many extension APIs return promises and many more will in the future.

For backward compatibility, many methods continue to support callbacks after promise support is added. Be aware that you cannot use both on the same function call. If you pass a callback, the function will not return a promise and if you want a promise returned do not pass a callback. Some API features, such as event listeners, will continue to require callbacks.

To check whether a method supports promises, look for the "Promise" label in its API reference. You'll find it below the method signature. Here's an example from the [`chrome.tabs`](/docs/extensions/reference/tabs/#methods) namespace:

<figure>
{% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/GoaezeAlSfYqW2ymK0mC.png",
  alt="The captureVisibleTab() method supports promises as shown in the API reference",
  width="800", height="280" %}
<figcaption>The captureVisibleTab() method supports promises as shown in the API reference.</figcaption>
</figure>
