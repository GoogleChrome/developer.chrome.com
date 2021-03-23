---
layout: 'layouts/doc-post.njk'

title: Using promises
# subhead: 'How to use promises when calling extensions APIs'

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'How to use promises when calling extensions APIs'

# The publish date
date: 2021-03-26

# An optional updated date
# updated: 2020-10-16

---

Many extension API methods support promises.  This document explains how to use promises when
calling these methods.

## Introduction

Promises were introduced into Chrome not long after they were included in the ES6 specification.
They are an important feature of the modern JavaScript idiom, providing several benefits, such as:

* Streamlined error handling
* Coding in a synchronous style for invoking asynchronous functions
* A simple "fork and join" syntax for invoking concurrent functions

Extensions can use promises beginning with Manifest V3. Many API methods support promises, and we
are progressively adding promise support to additional API methods.

{% Aside 'gotchas' %}
Promises are not available for extensions using Manifest V2, and are not available on all API methods.
{% endAside  %}

Promises can and should be used in many circumstances. However, there are times (for example, event
listeners) when a promise won't work and a callback is more appropriate. Methods that support
promises also support callbacks when invoked asynchronously.

## Can I use promises?

You can and should use promises in your extension code, where a promise is available and appropriate
to the use case.

Not all methods in extensions APIs support promises. Sometimes that's because we haven't added
promise support on the method yet; in many cases it's because using a promise isn't feasible for the
method. You can check if an API method support promises by checking its API reference page:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/lDjGweNENKyqGSA2nZrp.png", alt="Screenshot of an API
reference page with promises support noted", width="800", height="467" %}

## How to use promises

There are many places where using promises will result in cleaner, easier-to-maintain code. You
should consider using promises in situations such as the following:

* Any time that you want to clean up your code by using a more "synchronous" invocation style.
* Where error handling would be too difficult using callbacks.
* When you want a simpler way to invoke a number of concurrent methods and gather the results into a single thread of code.

* When you can’t

### Converting a callback to a promise

One way to understand how you can use promises in extensions APIs is to compare two equivalent code
fragments, one using a callback and one using a promise. The following example shows this
comparison:

```js
/*---------------------------------\
| Standard callback implementation |
\---------------------------------*/

function openTabOnRight(onComplete) {
  chrome.tabs.query(queryOptions, function(tabs) {
    if (chrome.runtime.lastError) {
      onComplete({error: chrome.runtime.lastError});
      return;
    }

    if (!tabs.length) {
      onComplete();
      return;
    };

    chrome.tabs.create({
      url: 'https://example.com',
      index: tab[0].index + 1,
    }, function(tab) {
      if (chrome.runtime.lastError) {
        onComplete({error: chrome.runtime.lastError});
      }

      console.log('tab created', tab);
      onComplete(tab);
    });
  });
}

/*-----------------------\
| Promise implementation |
\-----------------------*/

function openTabOnRight() {
  // Errors are automatically propagated down the promise chain
  return chrome.tabs.query(queryOptions)
    .then((tabs) => {
      if (!tabs.length) return;

      return chrome.tabs.create({
        url: 'https://example.com',
        index: tab[0].index + 1,
      });
    })
    .then(tab => {
      if (!tab) return;

      console.log('tab created', tab);
      return tab;
    });
}

/*---------------------------\
| Async/await implementation |
\---------------------------*/

async function openTabOnRight() {
  // When not wrapped in try/catch, errors thrown in an async
  // function will propagate down the promise chain
  let tabs = await chrome.tabs.query(queryOptions);

  if (!tabs.length) return;
  let tab = await chrome.tabs.create({
    url: 'https://example.com',
    index: tab[0].index + 1,
  });

  if (!tab) return;
  console.log('tab created', tab);
  return tab;
}
```

<!-- notes here about the code fragments -->

### Error handling

Returning errors works differently depending on if the extension is using a callback or a promise.

#### Error handling with Callbacks

If using a callback, then `chrome.runtime.lastError` is set for the duration of the execution of the
callback. It is not thrown as a JS Error (which would interrupt JS execution), and is not set
outside the duration of the callback run (which would result in it being "randomly" set during other
execution).  The extension would look at the last error like this:

```js
chrome.tabs.create({...}, (result) => {

  if (chrome.runtime.lastError) {
    // Handle last error
  }
});
```

Promises are designed to deliver asynchronous results, both success and failure.  A failure in a
promise (a promise rejection) is handled differently.  It might look like this:

```
chrome.tabs.create({...})
  .then((result) => {
    // success case
  })
  .catch((e) => {
    // failure case
  });
```

Instead of setting `chrome.runtime.lastError`, we deliver the error directly to the "catch" of the
promise. We don't set the `lastError` in the success case, because the onFulfilled handler (the
argument in the `.then())` is never invoked in the failure case.

{% Aside %}
Extensions APIs don't set `chrome.runtime.lastError()` with promises.
{% endAside %}

This lets you write async function calls like sync function calls, verifying the failure cases (the
errors) in the same way.

{% if false %}
## Dealing with edge cases

There are a few cases where you might need to take some extra care when converting an existing
callback-based method call to use promises. These cases include the following:

* Methods with multiple parameters
* Methods with multiple returns (a meaningful return value and also data returned via a callback)

The following sections address these cases.

### Calls with multiple parameters

TODO:

* promises take just one
* bundle into an object

### Calls with multiple returns

TODO
{% endif %}
