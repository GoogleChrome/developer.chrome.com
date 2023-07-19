---
title: Chrome 116 beta
description: >
  CSS motion path, Back/forward cache NotRestoredReason API, Document Picture-in-Picture, and more.
subhead: >
  CSS motion path, Back/forward cache NotRestoredReason API, Document Picture-in-Picture, and more.
layout: 'layouts/blog-post.njk'
date: 2023-07-19
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/8bVSTrXPIr6VCCiXJCzv.png'
alt: >
  Chrome 116 beta hero logo
tags:
  - beta
  - chrome-116
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 116 is beta as of July 19 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds two new CSS features.

### CSS Motion Path

Motion path allows authors to position any graphical object and animate it along a path specified by the developer. This allows a number of powerful new transform possibilities, such as positioning using polar coordinates (with the `ray()` function) rather than the standard rectangular coordinates used by the `translate()` function, or animating an element along a defined path. This makes it easier to define complex and beautiful 2d spatial transitions. A path can be specified as `circle()`, `ellipse()`, `rect()`, `inset()`, `xywh()`, `polygon()`, `ray()` and `url()`. 

### Display and content-visibility animations

Chrome 116 supports the `display` and `content-visibility` properties in keyframe animations. This support allows developers to create exit animations after which the element automatically becomes `display: none` or `content-visibility: hidden` without needing to write any JavaScript to handle that switch after the animation is finished. This allows exit animations for elements to be added purely in CSS. 


## Web APIs

### AbortSignal.any()

Returns a signal that is aborted when any of the source signals are aborted. Developers can use this to combine independent abort sources, for example, timeouts specified with `AbortSignal.timeout()` and signals associated with an AbortController, and pass them to async APIs like `fetch()`.

### BYOB support for Fetch

Chrome's implementation of ReadableStream supports bring-your-own-buffer (BYOB) readers for readable byte streams. Now, `Response.body` is also a readable byte stream instead of a "default" readable stream. This enables the Fetch API to be used with BYOB readers, reducing garbage collection overhead and copies, and  improving responsiveness for users. `Blob.stream()` now also benefits from this optimization.

### Back/forward cache NotRestoredReason API

The NotRestoredReason API will report the list of reasons why a page is not served from BFcache in a frame tree structure, via PerformanceNavigationTiming API. 

### Document Picture-in-Picture

[Document Picture-in-Picture](/docs/web-platform/document-picture-in-picture/) adds a new API to open an always-on-top window that can be populated with arbitrary `HTMLElements`. This is an expansion upon the existing `HTMLVideoElement` API that only allows for an `HTMLVideoElement` to be put into a Picture-in-Picture (PiP) window. This allows web developers to provide a better PiP experience to users. 

### Expanded Wildcards in Permissions Policy Origins

Subdomain wildcards in allowlists provided some valuable flexibility, but differed from existing wildcard parsers and required novel code and spec work. This intent will reduce that overhead by reusing parts of the existing Content Security Policy spec and permitting `scheme + wildcard domain` and `wildcard port` in the allowlist. Specifically, this intent would adopt the definition of host-source and scheme-source instead of origin in the Allowlist definition while requiring that the path-part is empty (as Permissions Policies apply to matching origins). 

### FedCM bundle: Login Hint API, User Info API, and RP Context API

This bundled update allows customizations to federated login flows that use Federated Credential Management API (FedCM).

With Login Hint API, the relying party (RP) can specify a hint about the user account they want displayed in the FedCM UI. This is mainly used to provide a better UX for returning users.

The User Info API allows the identity provider (IdP) to fetch the user information so that they can personalize the login experience for returning users, for instance via personalized “Sign in with IdP” buttons.

With the RP Context API, the RP can request for the FedCM dialog to replace the title "Sign in" with "Sign up", "Use" or "Continue", to align the actual intent for the user.


### Non-composed Mouse and Pointer enter/leave events

Make the `event.composed` property in `mouseenter`, `mouseleave`, `pointerenter` and `pointerleave` events `"false"` to be spec compliant and to fix interop gaps. Both the UI Events spec for Mouse Events and the Pointer Events spec define these events as non-composed. Both specs switched away from their original definitions few years ago: https://github.com/w3c/uievents/pull/210 https://github.com/w3c/pointerevents/pull/461 In addition to addressing the interop gap, this change also fixes an erroneous double or triple dispatch of these events to a shadow DOM host in Chromium [when the shadow DOM also listens to the event](https://crbug.com/1136584). 

### Remove document.open sandbox inheritance

Currently Sandbox flags of the caller are currently applied to the callee when `document.open` targets a different window. After this change this will no longer be the case..

### Report Critical-CH caused restart in NavigationTiming

Websites can indicate that a particular Client Hint is critical to the page by including it in a `Critical-CH` HTTP response header. Doing so will trigger a connection restart if the hint listed in the `Critical-CH` HTTP response header could be (but wasn’t) included in the HTTP request initially sent. This intent proposes adding `readonly attribute DOMHighResTimeStamp criticalCHRestart;` to the `PerformanceNavigationTiming` interface. 

## Origin trials in progress

In Chrome 116 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### COOP: restrict-properties

Cross-Origin-Opener-Policy is used to sever the relationship between popup and openers, to increase security. "restrict-properties" is a proposed value that restricts the relationship instead of completely severing it. It would enable crossOriginIsolated when paired with COEP. 

[Register for the COOP restrict-properties origins trial](/origintrials/#/register_trial/1827335548805578753).

### FedCM Sign-in Status API

The IdP Sign-in Status API of the Federated Credential Management API (FedCM) allows an identity provider (IdP) to signal to the browser when their users are logging-in/out so that FedCM can raise its privacy properties by optimizing its UX.

[Register for the FedCM Sign-in Status origin trial](/origintrials/#/register_trial/3196429835526209537)

### EditContext API

The EditContext API simplifies the process of integrating a web app with advanced text input methods such as VK shape-writing, handwriting panels, speech recognition, and IME Compositions. The API improves accessibility and performance, and unlocks new capabilities for web-based editors.

[Register for the EditContext API origin trial](/origintrials/#/register_trial/4565524122246840321)

### Long Animation Frame Timing

This is a extension of long tasks. It measures the task together with its subsequent rendering update, adding information such as long running scripts, rendering time, and time spent in forced layout and style, known as _layout thrashing_.

Developers can use this as a diagnostic for "sluggishness", which is measured by INP, by finding the causes for main-thread congestion which is often the cause for bad INP.

[Register for the Long Animation Frame Timing origin trial](/origintrials/#/view_trial/3935020174414970881)
