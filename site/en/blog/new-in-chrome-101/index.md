---
title: New in Chrome 101
description: >
  Chrome 101 is rolling out now with a new method of specifying color with hwb notation, and fetch priority giving a way to hint to the browser the ideal order to download resources. And there's plenty more!
layout: 'layouts/blog-post.njk'
date: 2022-05-03
authors:
  - rachelandrew
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/9pkNxkQXGyaqlEMbLKPO.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-101
---

Here's what you need to know:

- [The `hwb()` color notation](#hwb) gives you a new way to specify color according to hue, whiteness, and blackness.
- [Fetch Priority](#priority-hints) give you a way to hint to the browser in which order resources should be downloaded.
- And there's plenty [more](#also-in-this-release).

Let's take a look at what's available in Chrome 101.


## `hwb()` color notation {: #hwb }

Described [in an article by Stefan Judis](https://www.stefanjudis.com/blog/hwb-a-color-notation-for-humans/) as a "color notation for humans", [`hwb()`](https://developer.mozilla.org/docs/Web/CSS/color_value/hwb) specifies color according to hue, whiteness, and blackness. As with other color notations, an optional alpha component specifies opacity.

```css
h1 {
  color: hwb(194 0% 0% / .5) /* #00c3ff with 50% opacity */
}
```

This method of specifying color is now well-supported, with Firefox supporting it from version 96, and Safari from version 15.

## Fetch Priority {: #fetch-priority }

Fetch Priority gives you a way to hint to the browser which order resources should be downloaded in, by using the `fetchpriority` attribute. This accepts values of `"high"`, `"low"`, and `"auto"`.

*  `"high"`: You consider the resource a high priority and want the browser to prioritize it as long as the browser's heuristics don't prevent that from happening.
*  `"low"`: You consider the resource a low priority and want the browser to deprioritize it if its heuristics permit.
*  `"auto"`: This is the default value that lets the browser decide the appropriate priority.

In the example below, a low priority image is indicated with `fetchpriority="low"`.

```html
<img src="/images/in_viewport_but_not_important.svg" fetchpriority="low" alt="I'm an unimportant image!">
```

Read more about the various use cases in [Optimize resource loading with the Fetch Priority API](https://web.dev/fetch-priority/).

### Also in this release

There is a new method of [`forget()`](
https://web.dev/usb/#revoke-access) for [`USBDevice`](https://developer.mozilla.org/docs/Web/API/USBDevice) objects. This enables the forgetting of a device that previously had permission granted. For example, if this is an application used on a shared computer with many devices.

Also for Web USB, a fix to support [`SameObject`] for related attributes within `USBDevice`. The specification change can be found [in a PR to the draft spec](https://github.com/WICG/webusb/pull/212).

Dedicated workers loaded from a secure (HTTPS) origin, yet instantiated by insecure (non-HTTPS) contexts, are no longer considered secure. This means that inside such worker contexts:
- `self.isSecureContext` is now `false`.
- `self.caches` and `self.storageFoundation` are no longer available.

The [`popup`](https://developer.mozilla.org/docs/Web/API/Window/open#popup) argument for `window.open()` now evaluates to `true`, following a recent change to the spec for parsing this argument. Previously, when `popup` was set equal to true, `window.open()` was interpreted to mean `false`. This change makes boolean features easier to use and understand.

## Further reading

This covers only some key highlights. Check the links below for additional changes to Chrome 101.

- [What's new in Chrome DevTools (101)](/blog/new-in-devtools-101/)
- [Chrome 101 deprecations and removals](/blog/deps-rems-101/)
- [ChromeStatus.com updates for Chrome 101](https://www.chromestatus.com/features#milestone%3D101)
- [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/refs/tags/101.0.4951.49)
- [Chrome release calendar](https://chromiumdash.appspot.com/schedule)
