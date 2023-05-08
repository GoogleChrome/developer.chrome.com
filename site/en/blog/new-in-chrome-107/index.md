---
title: New in Chrome 107
description:
  Chrome 107 is rolling out now! There are new properties in the Screen Capture API that improve the screen sharing experiences.You can now precisely identify whether a resource on your page is render blocking or not.There is a new way to send data to a backend server with the declarative PendingBeacon API in origin trial. And there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2022-10-25
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/sTsLWh3hhROVksOU7DYi.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-107
---

{% YouTube id='WieUZ9YeD7o' %}

Here's what you need to know:

* There are [new properties in the Screen Capture API](#new-screen-capture) to improve the screen sharing experiences.
* You can now precisely identify whether a resource on your page is [render blocking or not](#render-blocking-status).
* There is a new way to send data to a backend server with the declarative [PendingBeacon API](#pending-beacon) in origin trial. And there’s plenty more.

* And there's plenty [more](#more).

I'm [Adriana Jara](https://twitter.com/tropicadri). Let's dive in and
see what's new for developers in Chrome 107.

## New properties in Screen Capture API {: #new-screen-capture }

In this version the Screen Capture API adds new properties to improve the screen sharing experiences.

The `DisplayMediaStreamOptions` added the `selfBrowserSurface` property. With this hint the application can tell the browser that when calling `getDisplayMedia()` the current tab should be excluded.

```js
// Exclude the streaming tab
const options = {
  selfBrowserSurface: 'exclude',
};
const stream = await navigator
                    .mediaDevices
                    .getDisplayMedia(options);
```

It helps prevent accidental self capture and avoids the “Hall of Mirrors” effect we’ve seen in video conferences.

`DisplayMediaStreamOptions `now also has the `surfaceSwitching` property.
This property adds an option to programmatically control whether Chrome shows a button for switching tabs while screen sharing. These options will be passed to`getDisplayMedia()`. The `Share this tab instead` button allows users to switch to a new tab without going back to the video-conferencing tab or selecting from a long list of tabs, but the behavior is exposed conditionally in case the web application doesn’t handle it.

```js
// Show the switch to this tab button
const options = {
  surfaceSwitching: 'include',
};
const stream = await navigator
                    .mediaDevices
                    .getDisplayMedia(options);
```

Also `MediaTrackConstraintSet` adds the property `displaySurface`. When `getDisplayMedia()` is called the browser offers the user a choice of display surfaces: tabs, windows or monitors. Using the `displaySurface` constraint, the web app may now hint to the browser if it prefers one of the surface types to be offered more prominently.

For example, it can help [prevent oversharing](/blog/avoiding-oversharing-when-screen-sharing/) by accident since sharing a single tab can be the default.
{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/7z4i2ZI77UZA80WRg4Rc.jpg", alt="Screenshots of the old and new media picker prompts.", width="800", height="556" %}

## Identify render blocking resources {: #render-blocking-status }

Reliable insights into a page’s performance are critical for developers to build fast user experiences, so far developers have relied on complex heuristics to determine whether a resource is render blocking or not.

Now the Performance API includes the renderBlockingStatus property which provides a direct signal from the browser that identifies the resources that prevent your page from displaying, until they are downloaded.

The code snippet here, shows how to get a list of all your resources and use the new renderBlockingStatus property to list all of those that are render blocking.

```js
// Get all resources
const res = window.performance.getEntriesByType('resource');

// Filter to get only the blocking ones
const blocking =   res.filter(({renderBlockingStatus}) =>
      renderBlockingStatus === 'blocking');
```

Optimizing how you load your resources helps with [Core Web Vitals](https://web.dev/vitals/) and with providing a better user experience, Check out the MDN documentation to learn more about the [Performance API](https://developer.mozilla.org/docs/Web/API/Performance_API), look for those render blocking resources and optimize away.


## PendingBeacon API origin trial {: #pending-beacon }

The declarative [PendingBeacon API](https://github.com/WICG/pending-beacon) lets the browser control when beacons are sent.

A beacon is a bundle of data sent to a backend server, without expecting a particular response.

Applications often want to send these beacons at the end of a user's visit, but there's no good time for that "send" call to be made. This API delegates the sending to the browser itself, so it can support beacons on `page unload` or on `page hide`, without the developer having to implement send calls at exactly the right times.

[Sign up for the origin trial](/docs/web-platform/origin-trials/), give the API a try and please send feedback our way to improve the use cases.

## And more! {: #more }

Of course there’s plenty more.

* The `expect-ct` http header is deprecated.
* The `rel` attribute is now supported on `<form>` elements.
* Last time I mentioned [`grid-template` interpolation](https://web.dev/css-animated-grid-layouts/), this time it should be included.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 107.

* [What's new in Chrome DevTools (107)](/blog/new-in-devtools-107/)
* [Chrome 107 deprecations and removals](/blog/deps-rems-107/)
* [ChromeStatus.com updates for Chrome 107](https://www.chromestatus.com/features#milestone%3D107)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/106.0.5249.68..107.0.5304.71)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 108 is released, I'll be right here to
tell you what's new in Chrome!
