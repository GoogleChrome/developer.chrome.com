---
title: Chrome 114 beta
description: >
 CSS headline balancing, CHIPS, the scrollend event, and popover.
subhead: >
 CSS headline balancing, CHIPS, the scrollend event, and popover.
layout: 'layouts/blog-post.njk'
date: 2023-05-03
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/gMDPOeKkGt72mOrAaBF2.png'
alt: >
 Chrome 114 beta hero logo
tags:
 - beta
 - chrome-114
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 114 is beta as of May 3, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds two new CSS features.

### CSS headline balancing

This feature provides a way to balance the length of lines in an element, for better readability and to minimize typographic orphans, for text that flows onto four lines or fewer. This is often useful for headlines. For example, the following CSS would balance all headline levels and blockquotes: 

```css
h1, h2, h3, h4, h5, h6, blockquote { 
 text-wrap: balance; 
}
```

In addition to the `text-wrap` property, the `white-space-collapse` property is also supported, and the `white-space` property becomes a shorthand of these properties. 

Learn more in [CSS `text-wrap: balance`](/blog/css-text-wrap-balance/).

### Alias `overflow: overlay` to `overflow: auto`

Chrome 114 removes the `overflow: overlay` scrolling mode, and makes `overlay` a legacy alias of `auto`. Using `overflow: overlay` is the same as `overflow: auto`, except that it does not prevent content from extending into the scrollbar gutter, in cases where non-overlay OS scrollbars are present. (If overlay scrollbars are present, there is no effect.)

## Web APIs

### Back/forward cache NotRestoredReason API

The [NotRestoredReason API](/docs/web-platform/bfcache-notrestoredreasons/) reports the list of reasons why a page is not served from BFcache in a frame tree structure, via the PerformanceNavigationTiming API.

### Cookies Having Independent Partitioned State (CHIPS)

Chrome plans to obsolete third-party cookies, therefore developers need the ability to use cookies in third-party contexts that are partitioned by top-level site. This is necessary for use cases that are not cross-site tracking related. For example, SaaS embeds, headless CMS, and sandbox domains). The CHIPS cookie attribute of `Partitioned` enables developers to opt into having their third-party cookies partitioned by top-level site. CHIPS is enabled via Chrome Variations in Chrome 110 and newer versions. With Chrome 114, CHIPS will be enabled by default for all browser instances.

Learn more about [CHIPS](/docs/privacy-sandbox/chips/).

### The `scrollend` event

This event gives developers clarity on when a scroll has completed (including both the scroll itself and any updates to offsets from the scroll) through event listeners. Knowing when a scroll has completed is useful for various reasons. For example, synchronizing some logic on the snapped section, fetching stuff in a list, or triggering new animations. This feature greatly simplifies the logic for handling end-of-scroll effects, ensuring that they are consistent across many different input modalities. Currently, developers address this need by observing scroll events and building ad-hoc timeout algorithms.

[Learn more about the `scrollend` event](/blog/scrollend-a-new-javascript-event/).

### The Popover API

An API that can be used to build transient user interface (UI) elements that are displayed on top of all other web app UI. These include user-interactive elements like action menus, form element suggestions, content pickers, and teaching UI. This API uses a new `popover` content attribute to enable any element to be displayed in the top layer. This is similar to the `<dialog>` element, but has several important differences, including light-dismiss behavior, popover interaction management, and event support, and the lack of a "modal" mode.

[Learn more about the Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API).

### Web Bluetooth `exclusionFilters` option in `requestDevice()`

The [`exclusionFilters`](/articles/bluetooth/#exclusion-filters) option in `navigator.bluetooth.requestDevice()` allows web developers to exclude some devices from the browser picker. It can be used to exclude devices that match a broader filter but are unsupported.

[View sample code](https://googlechrome.github.io/samples/web-bluetooth/exclusion-filters.html) illustrating the use of the Web Bluetooth API to retrieve basic device information from a nearby Bluetooth Low Energy Device featuring basic exclusion filters.

### WebAssembly extended constant proposal

Chrome 114 implements the [WebAssembly extended constant proposal](https://github.com/WebAssembly/extended-const/blob/main/proposals/extended-const/Overview.md). This proposal adds the following new instructions to the list of valid constant instructions: `i32.add`, `i32.sub`, `i32.mul`, `i64.add`, `i64.sub`, and `i64.mul`.


## Origin trials in progress

In Chrome 114 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Cross App and Web Attribution measurement

Extends the Attribution Reporting API to allow attributing conversions that happen on the web to events that happen off the browser, within other applications. The proposal here takes advantage of OS-level support for attribution. In particular, it gives the developer an option to allow events on the mobile web to be joinable with events in Android’s Privacy Sandbox, although support for other platforms could also be implemented. 

[Register for the Cross App and Web Attribution measurement trial](/origintrials/#/view_trial/151996487423754241)

### The Background Blur API

The [Background Blur API](/blog/background-blur/) allows web developers to use the native platform's API for camera background segmentation. As background blur has become one of the most used features on video conferencing apps, we want web apps to leverage the same platform APIs without having to rely on ML frameworks like TensorFlow.js, Mediapipe, WASM libraries, or cloud based solutions.

[Register for the Background Blur origin trial](/origintrials/#/register_trial/2228155915641552897).

## Deprecations and removals

There are no new deprecations or removals in Chrome 114.
