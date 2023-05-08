---
title: Chrome 107 beta
description: >
  Additions to the Screen Capture API, CSS grid-template properties interpolation, and more.
subhead: >
  Additions to the Screen Capture API, CSS grid-template properties interpolation, and more.
layout: 'layouts/blog-post.njk'
date: 2022-09-29
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/ib7vJvBRPcmYPg1ZYuaf.png'
alt: >
  Chrome 107 betas hero logo
tags:
  - beta
  - chrome-107
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 107 is beta as of September 29, 2022. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS `grid-template` properties interpolation

In CSS Grid, the `grid-template-columns` and `grid-template-rows` properties allow developers to define line names and track sizing of grid columns and rows, respectively. Thanks to our contributors at Microsoft, we now [support interpolation](https://www.chromestatus.com/feature/6037871692611584) for these properties. Grid layouts can now smoothly transition between states, instead of snapping at the halfway point of an animation or transition. 

## Privacy preserving screen sharing controls

The [Screen Capture API](https://w3c.github.io/mediacapture-screen-share/) introduces additions to the existing Media Capture and Streams API to let the user select a screen or portion of a screen (such as a window) to capture as a media stream. This stream can then be recorded or shared with others over the network. In this beta some new features are added to this API.

{% Aside %}  
Learn more about the Screen Capture API in the MDN guide to [Using the Screen Capture API](https://developer.mozilla.org/docs/Web/API/Screen_Capture_API/Using_Screen_Capture).   
{% endAside %}

### DisplayMediaStreamConstraints.selfBrowserSurface

Hint allowing Web applications to instruct the browser whether, upon calling `getDisplayMedia()`, the current tab should be excluded from the list of tabs offered to the user. 

This helps prevent accidental self-capture, when users accidentally choose the tab in which the app is running, a Hall-of-Mirrors effect is produced, confusing users and derailing discussions with remote users.

### DisplayMediaStreamConstraints.surfaceSwitching

Adds an option to programmatically control whether Chrome shows a button for switching tabs while screen-shared. This option will be passed to `navigator.mediaDevices.getDisplayMedia()`. 

The Share this tab instead button allows users to seamlessly switch which tab they're sharing, without having to select the video-conferencing tab again, click a button to initiate `getDisplayMedia()` again, or selecting a new tab out of a long list of tabs. This behavior is exposed conditionally because not all Web applications are able to handle this behavior. 

### MediaTrackConstraintSet.displaySurface

When `getDisplayMedia()` is called, the browser offers the user a choice of display surfaces: tabs, windows, or monitors. Using the displaySurface constraint, the Web application may now hint to the browser if it prefers that a certain surface type be more prominently offered to the user. 

[Find out more about how these features will help to avoid accidental oversharing.](/blog/avoiding-oversharing-when-screen-sharing/)

## Render blocking status in Resource Timing

Adds a field to [`PerfomanceResourceTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming) to indicate the render blocking status of a resource. Currently from a developer perspective, the only way to determine which resources were actually render blocking is to rely on complex heuristics. The new field would instead provide a direct signal regarding the same.

## Wildcards in permissions policy origins

This feature adds support for wildcards in permissions policy structured like `SCHEME://*.HOST:PORT` (for example, https://*.foo.com/) where a valid Origin could be constructed from `SCHEME://HOST:PORT` (for example, https://foo.com/). This requires that HOST is at least eTLD+1 (a registrable domain). This means that `https://*.bar.foo.com/` works but `https://*.com/` won't. Wildcards in the scheme and port section will be unsupported and `https://*.foo.com/` does not delegate to `https://foo.com/`. Before, a permissions policy might need to look like: 

```txt
permissions-policy: ch-ua-platform-version=(self "https://foo.com" "https://cdn1.foo.com" "https://cdn2.foo.com")   
```

With this feature, you can use: 

```txt 
permissions-policy: ch-ua-platform-version=(self "https://foo.com" "https://*.foo.com")   
```

## Support the `rel` attribute on `<form>` elements

This feature adds the `rel` attribute to form elements, which makes it possible to prevent `window.opener` from being present on websites navigated to by form elements which have `rel=noopener` and prevents the referer header from being sent with `rel=noreferrer`.

## Origin Trials

This release of Chrome had 2 new [origin trials](/docs/web-platform/origin-trials/).

### Declarative PendingBeacon API

A stateful beacon API that lets the browser control when beacons are sent. A _beacon_ is a bundle of data sent to a backend server, without expecting a particular response. It's often desirable to send these at the end of a user's visit to a page, but there's no good time for that "send" call to be made. This API delegates the sending to the browser itself, so it can support beacons on page unload or on page hide, without the developer having to implement send calls at exactly the right times.

This trial is expected to run until Chrome 109. [Register for the trial here](/origintrials/#/register_trial/1581889369113886721).

### Permissions-Policy: unload

This feature allows pages to disable the running of unload event handlers. The goal is to allow sites that have removed all unload handlers to ensure they do not accidentally add new ones. This will help sites migrate off unload event handlers and thereby [improve BFCache hit-rate](https://web.dev/bfcache/#never-use-the-unload-event).

This trial is expected to run until Chrome 109. [Register for the trial here](/origintrials/#/view_trial/1012184016251518977).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates one feature.

### Expect-CT

`Expect-CT` is an HTTP header that allowed websites to opt in to Certificate Transparency enforcement before it was enforced by default. It also has reporting functionality to help developers discover CT misconfigurations.

The `Expect-CT` HTTP header was designed to help transition to universal Certificate Transparency (CT) enforcement, by allowing high-value websites to opt in to CT enforcement or reporting for better security before CT enforcement was required (by Chrome) on all public websites. However, `Expect-CT` has now outlived its usefulness. Chrome requires CT on all public websites now, so there is no security value to `Expect-CT` anymore. No other browser has implemented `Expect-CT` so removing it is not an interoperability concern.
