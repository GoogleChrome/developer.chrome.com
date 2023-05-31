---
title: Chrome 115 beta
description: >
  Multiple keywords for the CSS display property, WGSLLanguageFeatures for WebGPU, HTTPS upgrades, and more.
subhead: >
  Multiple keywords for the CSS display property, WGSLLanguageFeatures for WebGPU, HTTPS upgrades, and more.
layout: 'layouts/blog-post.njk'
date: 2023-05-31
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/De5peVXJZz3uSEmmVeYJ.png'
alt: >
  Chrome 115 beta hero logo
tags:
  - beta
  - chrome-115
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 115 is beta as of May 31, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds three new CSS features.

### Multiple values of the `display` property

The CSS `display` property now accepts multiple keywords as a value, besides the legacy precomposed keywords. The first two keywords represent the outer and inner values of display, there are optional flags for `list-item`, internal values such as `table-cell`, and the box values of `contents` and `none`.

With the outer and inner keywords you can define how the outer box behaves (block or inline) and how the inner children behave, for example `flex`, `grid`, or `flow`. Therefore `display: flex` becomes `display: block flex` and `display: block` becomes `display: block flow`. See MDN for [a list of common mappings](https://developer.mozilla.org/docs/Web/CSS/display/multi-keyword_syntax_of_display) and more information.

### Boolean context style container queries

Chrome 115 supports `style()` container queries without a declaration value, only a property name, as a way of matching non-initial values. Previously you would have to use: `not style(--my-property: initial)` Now you can use: `style(--my-property)` to match any non-initial value.

### Scroll-driven animations

`ScrollTimeline` and `ViewTimeline` are an extension to the Web Animations specification which allow developers to use the position of a scroller or the position of an element within a scroller as an input 'time' rather than the default monotonic clock time. This enables accelerated scroll-based animations, such as a shrinking navigation bar, without requiring user script execution. They can be declared and instantiated both via CSS and JavaScript used in CSS animations and Web Animations.

See [Animate elements on scroll with Scroll-driven animations](/articles/scroll-driven-animations/) for more details.

### Fix to regression where elements with `display: contents` were no longer shown in the accessibility tree

A regression was introduced that caused elements with `display: contents` to lose semantic information, and no longer be represented correctly in the accessibility tree. Chrome 115 includes [a fix for this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1448706).

## Web APIs

### Increasing the maximum size of a `WebAssembly.Module()` on the main thread to 8 MB

The [WebAssembly.Module()](https://developer.mozilla.org/docs/WebAssembly/JavaScript_interface/Module) constructor compiles a binary WebAssembly module synchronously, which can block the main thread. To avoid this, the maximum size of a WebAssembly module that can be compiled with this constructor is limited to 8 MB. Larger modules can be compiled asynchronously on the main thread with `WebAssembly.compile()`, or synchronously on a worker thread. The 8 MB limit is an extension of the original limit of 4 KB. This extension is possible thanks to improvements in the WebAssembly runtime V8. The 8 MB limit has been determined through performance measurements on a Google Pixel 1 phone, which is currently considered a representative low-end phone. Future developments in V8 or in hardware may allow further extensions of the limit.


### FedCM: Support credential management mediation requirements for auto re-authentication

Supports [Credential Management Mediation Requirements](https://w3c.github.io/webappsec-credential-management/#mediation-requirements) to provide streamlined re-authentication UX for users who have created federated accounts on websites with the FedCM API. 

### HTTPS upgrades

Automatically and optimistically upgrade all main-frame navigations to HTTPS, with fast fallback to HTTP. 

### Partitioning the Storage, Service Worker, and Communication APIs

To prevent certain types of side-channel cross-site tracking, Chrome is partitioning storage and communications APIs in third-party contexts. This includes quota-managed storage, service workers, and communication APIs (like BroadcastChannel). See [the documentation for storage partitioning](/en/docs/privacy-sandbox/storage-partitioning/) for more details.


### Resource Timing: Expose interim response times

Expose `PerformanceResourceTiming.firstInterimResponseStart` in cases where a navigation or subresource fetch encounters an interim 1xx response. For example with 100 continue or 103 early hints, `firstInterimResponseStart` now corresponds to the time of that first interim response, while `responseStart` corresponds to the final response, for example with 200 status. 

### Update of "xml" prefix handling in `lookupNamespaceURI()` and `createNSResolver()`

`Node.lookupNamespaceURI()` supports "xml" and "xmlns" prefixes by default. The function returns fixed namespace strings for them. `Document.createNSResolver()` and `XPathEvaluator.createNSResolver()` stops to wrap the specified node to add "xml" prefix handling. They return the specified node as is. Web developers can now use an element as an `XPathNSResolver` without wrapping it with `createNSResolver()`. 

### VisibilityStateEntry

Exposes visibility state (visible or hidden) in the performance timeline. The timeline will always have an entry with a `startTime` of 0 and the initial visibility state, plus entries corresponding to any visibility state change. 

### WGSLLanguageFeatures for WebGPU

Adds the `wgslLanguageFeatures` getter on the GPU object for WebGPU, and its corresponding `WGSLLanguageFeatures` type. 

### WebDriver commands for interacting with FedCM dialogs

This exposes several WebDriver commands to enable browser automation, such as automated testing, to interact with FedCM dialogs. 


## Origin trials in progress

In Chrome 115 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Compute Pressure

The Compute Pressure API offers high-level information about the current state of the device hardware to allow sites to strike the right balance for users between taking advantage of available processing power and putting the system under unmanageable stress. Compute Pressure is a generic term by design. At the moment it is calculated based on CPU load, but future plans include using signals from temperature and battery status, for example. Learn more in [Announcing the second Compute Pressure origin trial](/blog/compute-pressure-origin-trial-2/).

[Register for the Compute Pressure origin trial](/origintrials/#/register_trial/1196831600973709313).

### Explicit compile hints with magic comments

Allow attaching information about which functions should be eager parsed and compiled in JavaScript files. The information will be encoded as magic comments. We'll be experimenting with different magic comment formats. For example, marking all functions in a file for eager compilation, or marking only a subset of functions.

[Register for the explicit compile hints with magic comments origin trial](/origintrials/#/register_trial/4317826142741463041).

### Long Animation Frames API

This is an extension of the [Long Tasks API](https://developer.mozilla.org/docs/Web/API/PerformanceLongTaskTiming). It measures the task together with its subsequent rendering update, adding information such as long running scripts, rendering time, and time spent in forced layout and style known as layout thrashing. Developers can use this as a diagnostic for "sluggishness", which is measured by [Interaction to Next Paint (INP)](https://web.dev/inp/), by finding the causes for main-thread congestion which is often the cause for bad INP.

[Register for the Long Animation Frames origin trial](/origintrials/#/view_trial/3935020174414970881).

### Storage Buckets API

Storage Buckets allows sites the ability to create multiple storage buckets to organize their data, allowing user agents to delete each bucket independently of other buckets. Each storage bucket can store data associated with established storage APIs such as IndexedDB and CacheStorage. 
[Register for the Storage Buckets API origin trial](/origintrials/#/register_trial/2674012278751232001).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates two features.

### Deprecate the `document.domain` setter

The `document.domain` setter is being deprecated because it allows developers to relax the same-origin policy—and as such it complicates the fundamental security boundary we aim to maintain, and puts roadblocks in the way of post-Spectre changes to Chromium's process model. 
Visit [Chrome disables modifying document.domain](/blog/document-domain-setter-deprecation/) for alternatives to using document.domain. In most use cases, cross-origin `postMessage()` or Channel Messaging API can replace document.domain. As a last resort, you can opt into document-domain via [Origin-keyed agent clusters](https://chromestatus.com/features/5683766104162304). The setter will remain, but the origin remains unchanged.

### Deprecate mutation events

Mutation Events, including `DOMSubtreeModified`, `DOMNodeInserted`, `DOMNodeRemoved`, `DOMNodeRemovedFromDocument`, `DOMNodeInsertedIntoDocument` were deprecated from [the specification](https://w3c.github.io/uievents/#legacy-event-types) in 2011, and were replaced in 2012 by the Mutation Observer API. Usage of the obsolete mutation events must be migrated to Mutation Observer before removal in Chrome 127 (July 20, 2024).

Learn more about the [deprecation of mutation events](/blog/mutation-events-deprecation/).
