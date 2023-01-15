---
title: Chrome 110 beta
description: >
  CSS initial letters, web app launch handler, cross-origin iframe support for the FedCM API, and more.
subhead: >
  CSS initial letters, web app launch handler, cross-origin iframe support for the FedCM API, and more.
layout: 'layouts/blog-post.njk'
date: 2023-01-12
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/cEsvLI2imoFbiFJzhGcW.png'
alt: >
  Chrome 110 beta hero logo
tags:
  - beta
  - chrome-110
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 110 is beta as of 12 January 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds two new CSS features.

### CSS Initial Letters

Initial letters are large, decorative letters that have been used to start new sections of text since before the invention of printing. The CSS [`initial-letter`](https://developer.mozilla.org/docs/Web/CSS/initial-letter) property provides a way to set the number of lines that an initial-letter should sink into following lines of text. In the following example the initial-letter will display over three lines of text.

```css
.content::first-letter {
  initial-letter: 3;
}
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/CRhblIzkDPwhnhNbv4wO.png", alt="A paragraph of text with an initial letter sunk down into three lines of the paragraph.", width="800", height="227" %}

### CSS pseudo-class `:picture-in-picture`

The [`:picture-in-picture`](https://developer.mozilla.org/docs/Web/CSS/:picture-in-picture) pseudo-class helps web developers customize the media player when videos enter and exit [Picture-in-Picture](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API).

[Try a demo of the :picture-in-picture pseudo-class](https://googlechrome.github.io/samples/picture-in-picture/css-pseudo-class). 

## Web APIs

### AudioContext.setSinkId()

`AudioContext.setSinkId` sets the ID of the audio device to use for output. This allows the `AudioContext` to route audio to a connected output device of the user's choosing.

Learn more about this feature in the post [Change the destination output device in Web Audio](/blog/audiocontext-setsinkid/).

### FedCM within cross-origin iframe

Adds cross-origin iframe support for the FedCM API via a permissions policy. It enables websites to sandbox the scripts from identity providers which trigger the FedCM API in a cross-origin iframe, so that they do not have full control over the whole page. This also allows use cases where it is the iframe itself which requires a sign-in from the user. In both cases, the parent frame must provide the cross-origin iframe with the permissions policy `identity-credentials-get`.

### IFrame credentialless

[IFrame credentialless](https://developer.mozilla.org/docs/Web/Security/IFrame_credentialless) gives developers a way to load documents in third party iframes using new and ephemeral contexts. Iframe credentialless are a generalization of [COEP](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) credentialless to support third-party iframes that may not deploy COEP. This removes the constraint that third-party iframes must support COEP in order to be embedded in a COEP page and will unblock developers looking to adopt cross-origin-isolation. 

Learn more about [iframe credentialless](/blog/iframe-credentialless).

### `FileSystemHandle::remove()` method

The [`remove()`](/articles/file-system-access/#deleting-a-file-or-folder-directly) method of `FileSystemHandle` enables the common use case where you obtain a file handle from `showSaveFilePicker()`, but then decide you don't want to save after all, and delete the file. Before the addition of this method it was impossible to remove a file or directory given its handle. You had to obtain the handle of the parent directory and call [`FileSystemDirectoryHandle::removeEntry()`](/articles/file-system-access/#deleting-files-and-folders-in-a-directory). 

### Prefetching triggered by the speculation rules API

Prefetching fetches the main resource for a future navigation, keeping it in memory so that it can be used to speed up the next navigation. This launch includes both same-site prefetching, and cross-site prefetching in the case where no credentials are present for the destination site.

### Use Non-Transitional IDNA Processing in URLs

Enable IDNA 2008 in Non-Transitional Mode for URL processing, aligning Chrome's behavior with Firefox and Safari. Chrome currently uses IDNA 2008 in Transitional Mode in URL processing. The main difference between Transitional and Non-Transitional Mode is the handling of four characters known as deviation characters: ß (LATIN SMALL LETTER SHARP S), ς (GREEK SMALL LETTER FINAL SIGMA), ZWJ (Zero width joiner) and ZWNJ (Zero width non-joiner). In Transitional mode, deviation characters are handled the same as IDNA2003: ß is mapped to ss, ς is mapped to σ, and ZWJ and ZWNJ are deleted. In Non-Transitional mode, domains containing these characters are allowed in domain names without mapping, and thus can resolve to different IP addresses. For example, typing `faß.de` in Chrome and Firefox opens different sites today. Enabling Non-Transitional IDNA in Chrome will allow deviation characters in domain names. Firefox and Safari already made this change in 2016 and continue to use Non-Transitional URL processing.

### Web app launch handler

Add a [`launch_handler`](/docs/web-platform/launch-handler/) web app manifest member that enables web apps to customize their launch behavior across all types of app launch triggers. For example, the following will cause all launches of the Example app to focus an existing app window and navigate it (if it exists) instead of always launching a new app window. 

```js
{ 
    "name": "Example app", 
    "start_url": "/index.html", 
    "launch_handler": {
        "client_mode": "navigate-existing" 
    } 
} 
```

### web-share permission policy

Controls access to [`navigator.share()`](https://web.dev/web-share/). By default, third-party iframes do not have permission to use the Web Share API.

## Origin trials in progress

In Chrome 110 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### No-Vary-Search support in navigation prefetch cache

Enables prefetch to match even if URL query parameters change. The `No-Vary-Search` HTTP response header declares that some or all parts of a URL query can be ignored for cache matching purposes. It can declare that the order of query parameter keys should not cause cache misses, that specific query parameters should not cause cache misses or that only certain known query parameters should cause cache misses. It could apply to multiple caches, but this entry refers to support for prefetch cache.

[Register for No-Vary-Search support in navigation prefetch cache trial](/origintrials/#/register_trial/4146689356901384193).

### PerformanceResourceTiming.deliveryType

Expose information about how a resource was delivered. For example, resources which were delivered from the cache (currently exposed through `transferSize`) and navigations which were prefetched by the previous page are useful to identify. 

### SoftNavigation performance entry

Exposes the (experimental) [soft navigation heuristics](https://github.com/WICG/soft-navigations) to web developers, using both PerformanceObserver and the performance timeline.

[Register for the soft navigation heuristics trial](/origintrials/#/register_trial/21392098230009857).

### Speculation rules: delivery via Speculation-Rules header

Currently developers can only specify speculation rules using inline script tags. The proposed feature provides an alternative through the "Speculation-Rules" header. Its value must be a URL to a text resource with `application/speculationrules+json` MIME type. The resource's rules will be added to the document's rule set. 

### Speculation rules: document-sourced rules

An extension to speculation rules syntax that lets the browser obtain URLs for speculation from link elements in a page. They may include criteria which restrict which of these links can be used.

### X-Requested-With in WebView

Deprecation trial to retain legacy behavior of the `X-Requested-Header` on Android WebView. This header is currently set with the package name of the embedding app as the value, but this behavior will be removed in a slow roll-out. During the deprecation this trial will allow site owners to continue to receive the header while migrating away from using it. 

More information about this deprecation will follow in a separate blog post. [Register for the X-Requested-With deprecation trial here](/origintrials/#/view_trial/1390486384950640641).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome removes two features.

### Remove Web SQL in non-secure contexts

Web SQL is now [removed in non-secure contexts](/blog/deprecating-web-sql/). We recommend you switch to [SQLite Wasm in the browser backed by the origin private file system](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/).

### Remove window.webkitStorageInfo

Removes support for the legacy storage quota API, window.webkitStorageInfo. Originally introduced in 2011, Chrome implemented the prefixed quota API which was immediately succeeded by the Quota API which has since been deprecated as well. The legacy storage quota API was never implemented by any other browser, and has been marked deprecated since 2013.
