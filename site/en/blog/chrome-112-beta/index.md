---
title: Chrome 112 beta
description: >
  CSS nesting, animation-composition, and a submitter parameter for the FormData constructor.
subhead: >
  CSS nesting, animation-composition, and a submitter parameter for the FormData constructor.
layout: 'layouts/blog-post.njk'
date: 2023-03-09
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/fKHm0WlotmleOWIwU9d0.png'
alt: >
  Chrome 112 beta hero logo
tags:
  - beta
  - chrome-112
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 112 is beta as of 9 March 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

### CSS Nesting

The ability to nest CSS style rules inside other style rules, combining selectors from the outer with the inner rule for increasing modularity and maintainability of style sheets. Learn more in this article on [CSS Nesting](/articles/css-nesting/).

### CSS `animation-composition` property

The [`animation-composition`](https://developer.mozilla.org/docs/Web/CSS/animation-composition) property allows the specification of the composite operation to use when multiple animations affect the same property simultaneously. [View an example in this demo](https://codepen.io/argyleink/pen/BaPxMWb).

## Web APIs

### "Reload this page" infobar no longer shown if top-level frame is observing permission changes

Suppresses the "Reload this page" infobar if the top-level frame is subscribed to the `onchange ` event of `PermissionStatus`, which is taken as an indication that the application wishes to dynamically react to camera or microphone permission changes initiated through the page info dialog. Regardless of the presence of the event listener, the pre-existing behavior remains unchanged that media streams are terminated immediately once the permission is revoked. 

### Add optional submitter parameter to the `FormData` constructor

Allows passing a submit button to the [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData) constructor. If the button has a name or is an image button, it will contribute to the form data set. This makes it possible to create a `FormData` object with the same data set as a vanilla form submission triggered by the button.

### RegExp v flag with set notation and properties of strings

Add set operations, string literals, nested classes and unicode properties of strings to regular expression character classes. Set operations and unicode properties of strings allow developers to create regular expressions matching strings with certain unicode characters with ease. 

For example:` /[\p{Script_Extensions=Greek}&&\p{Letter}]/v` matches all Greek letters. 

### Updated `<dialog>` initial focus algorithm

Some changes have been made to which element is selected to get focus when a `<dialog>` element is opened: 

- Make the dialog focusing steps look at keyboard focusable elements instead of any focusable element.
- Make the dialog element itself get focus if it has the autofocus attribute set.
- Make the dialog element itself get focus as a fallback instead of focus being "reset" to the body element. 

### WebAssembly tail call

Add an explicit tail call and indirect tail call opcodes to WebAssembly. 

### WebGLContextEvent on Web Workers

The `WebGLContextEvent` type has been defined in Khronos' WebGL specification for a number of years, but it was not noticed until recently that in Blink, this type is not exposed on web workers. 

Most applications simply add an event listener for the type, and do not look for its prototype in the global scope. This is a simple fix to Blink's Web IDL for `WebGLContextEvent`, but is a web exposed change.

###  Skip service worker no-op fetch handler

The feature makes the navigation of pages with no-op service worker fetch handlers fast by skipping them.

Some sites have a no-op (no operation) fetch listener (for example, `onfetch = () => {}`).  Since having the fetch listener was one of the requirements to be a progressive web app (PWA), we assume they did that to make their site recognized as PWA.  However, it only brings overhead to start a service worker and execute a no-op listener, without bringing any feature benefits like caching or offline capabilities because the code does nothing.

To make the navigation to such pages faster, starting from Chrome 112 we will omit the service worker start and the listener dispatch from the navigation critical path if a user agent identifies that all the service worker's fetch listeners are no-ops.

As part of this change, Chromium will show console warnings if all the service worker’s fetch listeners are no-ops, and encourage developers to remove the useless fetch listeners.  Hopefully sites stop using the useless fetch listeners and we can deprecate the feature in the future.

### Accept-encoding: br (Brotli) on HTTPS connection in WebView

Brotli (content-encoding type: `br`)  is a generic-purpose lossless compression algorithm which offers a more dense compression with a compression ratio and speed comparable with the best currently available general-purpose compression methods (See [google/brotli](https://github.com/google/brotli) and [RFC 7932](https://tools.ietf.org/html/rfc7932) for more details).

While the HTTP content-encoding type for Brotli (`Accept-Encoding: br`) has been supported by Chrome from [version 50](http://chromestatus.com/feature/5420797577396224) it was not enabled for WebView until now. The feature will go through a phased rollout to ensure stability and will be available for 50% of the population on WebView Beta.

## Origin trials in progress

In Chrome 112 you can opt into the following [origin trials](/docs/web-platform/origin-trials/). 

### FedCM: Auto re-authentication API

The latest version of FedCM includes an opt-in auto-reauthentication feature, which enables reauthenticaticating users automatically when they come back after their initial authentication using FedCM.

Currently, after a user has created a federated account on an RP (relying party) with an IdP (identity provider) via the FedCM, the next time they visit the website they need to go through the same steps in the user interface. That is, they need to explicitly confirm and reauthenticate to proceed with the sign-in flow. As one of the main goals of FedCM is to prevent covert tracking, this user experience (UX) makes sense before the user has created the federated account, but it becomes unnecessary and cumbersome after the user has gone through it once. That's why Chrome is introducing a more streamlined UX that RPs can choose for their returning users.

[Register for the FedCM auto-reauthentication origin trial](/origintrials/#/view_trial/2426314299245854721)

### Deprecation trial 

The `getStats()` method of `RTCPeerConnection` will no longer return stats objects where `type == "track"` or `"stream"`. This feature is removed in Chrome 112, opt into this trial to have more time to make needed changes.

[Register for this deprecation trial](/origintrials/#/view_trial/440789813528887296)

### X-Requested-With in WebView Deprecation

The Deprecation origin trial supports cross-origin pre-enablement when calling services that rely on the `X-Requested-With` header. This option is available in WebView from Chrome 112. See the origin trial setup instructions for how to use this feature.

[Register for the X-Requested with WebView deprecation trial](/origintrials/#/view_trial/1390486384950640641).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates one feature.

### Deprecate the `document.domain` setter

The `document.domain` setter allows developers to relax the same-origin policy, complicating the fundamental security boundary we aim to maintain, and putting roadblocks in the way of post-Spectre changes to Chromium's process model. It is now opt-in via Origin-keyed agent clusters.

This release of Chrome removes one feature.

### Remove stats objects `track` and `stream` from the `getStats()` method of `RTCPeerConnection` 

The `getStats()` method of `RTCPeerConnection`  will no longer return stats objects where `type == "track"` or `"stream"`. Unshipped in Chrome 112, with a Deprecation Trial (listed above) to extend the availability of these metrics to Chrome 115.

