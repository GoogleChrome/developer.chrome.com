---
title: New in Chrome 108
description: >
  Chrome 108 is rolling out now. There are new Intl APIs to give you more control when formatting numbers. There’s an origin trial for the new Pop Up API, making it easy to surface critical content to the user. There are a handful of CSS improvements. And there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2022-11-29
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/cGAnSrbzBlcpeD827tFY.png'
alt: >
  New in Chrome hero logo.
tags:
  - new-in-chrome
  - chrome-108
---

{% YouTube id='E72r3FN9X1k' %}

Here's what you need to know:

* It is easier to create adaptive UIs with new [viewport size units](#viewport-units).
* Color vector fonts now include support for [variable fonts](#colrv1-support).
* The methods in the interface `FileSystemSyncAccessHandle`, part of the File System Access API, are now [synchronous](#sync-filehandle).
* And there’s plenty [more](#more)

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 108.
## New viewport size units {: #viewport-units }
The new viewport units give you more control to create adaptive UIs.

These units measure the viewport area differently, as they take into account UI elements in the browser that can be expanded or collapsed. For example, the address bar.

The `large` units provide the viewport size assuming that those user agent interfaces are collapsed.

On the other hand the `small` units provide viewport size assuming the interfaces are expanded.

And with `dynamic` units the viewport size will automatically adjust itself in response to browser interface elements being shown or not.

The value will be anything within the limits of the large unit (the maximum) and small units (the minimum).

{% Img src="image/RYmV5NPuMZRoF3PVwIXTUpdYeQ23/JUvvIgXen1zmHFH53CBS.png", alt="The different parts of the viewport for each type of viewport unit.", width="800", height="664" %}

Check out [this article](https://web.dev/viewport-units/) for more details.  Also checkout the change on [Android viewport resizing behavior](/blog/viewport-resize-behavior/) to handle your viewport appropriately .

## Variable fonts now supported in COLRv1. {: #colrv1-support }

[COLRv1 color vector fonts](/blog/colrv1-fonts/) have been supported since Chrome 98, but the initial release supported only static functionality of the COLRv1 table.

But COLRv1 specification also includes OpenType Variations, which means allowing changes to font properties by changing variable axis values. Such variations are supported now.

This release also includes the `font-tech()` and `font-format()` condition extensions to CSS `@supports` .


With these conditions the developer can detect when the font features are available to give the user the latest experience and also create a fallback if the support is not available.

Play with the demo [here](https://roettsch.es/var_colrv1.html) and add impact to your words with variable fonts.

## FileSystemSyncAccessHandle methods are now synchronous. {: #sync-filehandle }

The origin private file system provides access to a special kind of file that is highly optimized for performance, developers can get access to such files by calling `createSyncAccessHandle()`, which is a method exposed on `FileSystemFileHandle` objects.

This call results in a `FileSystemSyncAccessHandle`.

The methods `truncate(newSize)`, `getSize()`, `flush()`, and `close()` in that access handle, used to be asynchronous, but they are synchronous as of Chrome 108.

There is a good reason for the change, it makes `FileSystemSyncAccessHandle` match the synchronous, POSIX-like file API that Wasm-based applications expect; making the API more ergonomic while bringing substantial performance gains.

This is a potentially breaking change, if you are using the methods above, any use of `Promise.then()` will break. If you chain a  `then()` call on the result of any of the previously asynchronous and now synchronous methods, you need to change your code.

```js
// ⛔️ This will break, and you need to restructure your code:
accessHandle.flush().then(/* Follow-up code */);
// ✅ Correct:
accessHandle.flush();
/* Follow-up code */
```

For more detailed instructions visit this [article](/blog/sync-methods-for-accesshandles/)

## And more! {: #more }

Of course there’s plenty more.

* A change [in the behavior for `overflow`](/blog/overflow-replaced-elements/) on replaced elements is being rolled out.
* If you are an identity provider check out the [Federated Credential Management API](/docs/privacy-sandbox/fedcm/).
* The [Media Source Extensions API](https://web.dev/media-mse-basics/) is now available in the worker context.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 108.

* [What's new in Chrome DevTools (108)](/blog/new-in-devtools-108/)
* [Chrome 108 deprecations and removals](/blog/deps-rems-108/)
* [ChromeStatus.com updates for Chrome 108](https://www.chromestatus.com/features#milestone%3D108)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/107.0.5304.124..108.0.5359.70)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 109 is released, I'll be right here to
tell you what's new in Chrome!