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
{% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/GoaezeAlSfYqW2ymK0mC.png", alt="The captureVisibleTab&lpar;) method supports promises as shown in the API reference", width="800", height="280" %}
<figcaption>The captureVisibleTab&lpar;) method supports promises as shown in the API reference.</figcaption>
</figure>

## When to use promises

There are many places where using promises results in cleaner, easier-to-maintain code. You
should consider using promises in situations such as the following:

* Any time you want to clean up your code by using a more "synchronous" invocation style.
* Where error handling would be too difficult using callbacks.
* When you want a more condensed way to invoke several concurrent methods and gather the results into a single thread of code.

## Converting a callback to a promise {: #compare-to-callback}

As previously mentioned, a method cannot both take a callback and return a promise. To convert from a callback to a promise, remove the callback and handle the returned promise. The example below is taken from the [optional permissions sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.optional_permissions), `newtab.js` specifically. The callback version shows what the sample's call to `request()` would look like with a callback. Note that the promise version could be rewritten with async and await.

<div class="switcher">
{% Compare 'worse', 'Callback' %}

```js
chrome.permissions.request(newPerms, (granted) => {
  if (granted) {
    console.log('granted');
  } else {
    console.log('not granted');
  }
});
```
{% endCompare %}

{% Compare 'better', 'Promise' %}
```js
const newPerms = { permissions: ['topSites'] };
chrome.permissions.request(newPerms)
.then((granted) => {
  if (granted) {
    console.log('granted');
  } else {
    console.log('not granted');
  }
});

```
{% endCompare %}
</div>