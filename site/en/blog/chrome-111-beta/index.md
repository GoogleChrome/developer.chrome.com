---
title: Chrome 111 beta
description: > 
  New CSS color types and color spaces, CSS trigonometric functions, and the View Transitions API.
subhead: >
  New CSS color types and color spaces, CSS trigonometric functions, and the View Transitions API.
layout: 'layouts/blog-post.njk'
date: 2023-02-09
update: 2023-02-10
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/pcXsIOqFVrZiYPjNulQf.png'
alt: >
  Chrome 111 beta hero logo.
tags:
  - beta
  - chrome-111
---

Unless otherwise noted, the following changes apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 111 is beta as of 9 February 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

### New CSS color types and spaces

All features described in [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) are now enabled. This includes four device-independent color types (lab, Oklab, lch and Oklch), the [`color()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color) function, and user-defined color spaces for gradients and animations. 

Read the [High definition CSS color guide](/articles/high-definition-css-color-guide/) to learn about these new color types and spaces.

### The `color-mix()` function

The incredibly useful [`color-mix()`](/blog/css-color-mix/) function from [CSS Color 5](https://www.w3.org/TR/css-color-5/#color-mix) is also shipping. This function enables mixing a percentage of one color into another, in any supported colorspace. This following example mixes 10% of `blue` into `white` in SRGB.

```css
.item {
  background-color: color-mix(in srgb, blue 10%, white);
}
```

### CSS Selectors 4 Pseudo-Class :nth-child(an + b of S)

Extends `:nth-child(an + b)` and `:nth-last-child()` to take a selector. For example, `:nth-child(3 of .c)` is the third `.c` under a given parent. To learn more, read the post [More control over `:nth-child()` selections with the `of S` syntax](/en/articles/css-nth-child-of-s/).

### CSS root font units

Adds root font units:  `rex`, `rch`, `ric`, and `rlh` to the existing root font unit of `rem`.

### CSS trigonometric functions

The [trigonometric functions](https://developer.mozilla.org/docs/Web/CSS/CSS_Functions#trigonometric_functions) `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, `atan2()` have been added to CSS math expressions. 

### Style Container Queries for CSS Custom Properties

Adds the `style()` function to `@container` rules to make it possible to apply styles based on the computed values of custom properties of an ancestor element. 

### The `baseline-source` property

The `baseline-source` property allows web developers to specify if an inline-level box should use the `first` or `last` baseline for alignment within an linebox.

## Web APIs

### The `window-management` permission and permission policy string

Chrome 111 adds `window-management` as an alias for `window-placement` permission and permission-policy strings. This is part of a larger effort to rename the strings by eventually deprecating and removing `window-placement`. The terminology change improves the longevity of the descriptor as the Window Management API evolves over time. 

### Media Session API: Presenting slides actions

Adds `previousslide` and `nextslide` actions to the existing Media Session API. 

### Resizable `ArrayBuffer` and growable `SharedArrayBuffer`

Extend the `ArrayBuffer` constructors to take an additional maximum length that allows in-place growth and shrinking of buffers. Similarly, `SharedArrayBuffer` is extended to take an additional maximum length that allows in-place growth. 

### Speculation rules: referrer policy key

This extends the speculation rules syntax to allow developers to specify the referrer policy to use with speculative requests triggered by speculation rules. This also reintroduces the "sufficiently-strict referrer policy" requirement.

### Streaming declarative shadow DOM

This adds support for streaming, by attaching the shadow root on the opening, rather than the closing, template tag.

### View Transitions API

Enables the creation of polished transitions in Single-Page Applications (SPAs) by snapshotting views and allowing the DOM to change without any overlap between states. Use View Transitions to build custom transitions, or use a simple crossfade default to improve user experience.

Check out the [Chrome Developers article](/docs/web-platform/view-transitions/) for more information and example transitions to help you get started. 

### WebRTC Scalable Video Coding extensions

This extension defines a standard method for picking between possible Scalable Video Coding (SVC) configurations on an outgoing WebRTC video track.

### WebXR `enabledFeatures` attribute

Returns the set of features that were enabled for this `XRSession` as specified by `XRSessionInit` and the Implied Features required by the spec for the given mode and features. For a granted Session, this will contain all `requiredFeatures`, but may be a subset of `optionalFeatures`. Most features have alternate ways to detect if they were granted; however, for some features the signal of whether or not a feature was enabled may tie closely with data for a feature just not being available right now, rather than data not being available ever. By querying `enabledFeatures`, you can determine if any helpful hints (for example, to improve or start tracking) should be shown, or if a feature will never be supported in the current session. 


## Origin trials in progress

In Chrome 111 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Deprecation trial for removal of the `connect-src` CSP bypass in Web Payment API

Deprecate the ability for Web Payment API to bypass the connect-src CSP policy when fetching the manifest. After this deprecation, a site's connect-src CSP policy will need to allow for the payment method URL specified in a PaymentRequest call, as well as any other URLs that the method chains to fetch its manifest. 

This bypass ability is removed in Chrome 111 with a reverse origin trial from 111 to 113 for those developers that need to temporarily re-enable the bypass. To opt into this, register for the [reverse deprecation trial for the `connect-src` CSP bypass](/origintrials/#/register_trial/3804415785221226497).

### Document Picture-in-Picture

The Document Picture-in-Picture API is a new API to open an always-on-top window that can be populated with arbitrary HTML content. This is an expansion upon the existing Picture-in-Picture API that only allows for an HTMLVideoElement to be put into a PiP window. This allows web developers to provide a better PiP experience to users.

Read the documentation for [Document Picture-in-Picture](/docs/web-platform/document-picture-in-picture/).

Register for the [Document Picture-In-Picture origin trial](/origintrials/#/register_trial/1885882343961395201).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome removes three features.

### Remove PaymentInstruments

PaymentInstruments is the Web API that backs non-JIT install of payment apps (see https://w3c.github.io/payment-handler/). It was designed with the assumption that the browser would store the actual payment instrument details, which has not turned out to be true, and has some privacy leaks. It also has not shipped on any other browser, not have we seen any interest from other browser vendors. As such, [this API has been deprecated and removed](https://web.dev/registering-a-web-based-payment-app/).

### Remove `connect-src` CSP bypass in Web Payment API

[Deprecate the ability for Web Payment API to bypass the `connect-src` CSP policy when fetching the manifest](/blog/payment-handler-csp-connect-src/). After this removal, a site's `connect-src` CSP policy will need to allow for the payment method URL specified in a PaymentRequest call, as well as any other URLs that the method chains to fetch its manifest.

See the infomation under origin trials for a method of opting into a deprecation trial giving more time to make required changes due to this removal.

### Merchant identity in `canmakepayment` event

The `canmakepayment` service worker event lets the merchant know whether the user has a card on file in an installed payment app. It used to silently pass the merchant's origin and arbitrary data to a service worker from payment app origin. This cross-origin communication happened on PaymentRequest construction in JavaScript, did not require a user gesture, and did not show any user interface. [This silent data passage has been removed from the `canmakepayment` event, and the Android `IS_READY_TO_PAY` Intent)](/blog/payment-handler-canmakepayment-update/).
