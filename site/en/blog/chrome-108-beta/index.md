---
title: Chrome 108 beta
description: >
  New CSS viewport units, Federated Credential Management API, Variable COLRv1 fonts, and more.
subhead: >
  New CSS viewport units, Federated Credential Management API, Variable COLRv1 fonts, and more.
layout: 'layouts/blog-post.njk'
date: 2022-10-28
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/FbdknipjOqHfVYEbvcLz.png'
alt: >
  Chrome 108 beta hero logo
tags:
  - beta
  - chrome-108
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 108 is beta as of October 27, 2022. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

Chrome 108 includes a number of new CSS features.

### CSS Overflow for replaced elements

Chrome will start to roll out a change that allows developers to use the existing `overflow` property with replaced elements that paint outside the content-box. Paired with `object-view-box` this can be used to create an image with a custom glow or shadow applied, with proper ink-overflow behavior like a CSS shadow would have. 

This is a potential breaking change, find out more in [A change to overflow on replaced elements](/blog/overflow-replaced-elements/).

### Small, Large, Dynamic, and Logical viewport units

This adds support for small (`svw`, `svh`, `svi`, `svb`, `svmin`, `svmax`), large (`lvw`, `lvh`, `lvi`, `lvb`, `lvmin`, `lvmax`), dynamic (`dvw`, `dvh`, `dvi`, `dvb`, `dvmin`, `dvmax`), and logical (`vi`, `vb`) units.

### CSS `break-after`, `break-before` and `break-inside` support

Support for the avoid value of the CSS fragmentation properties `break-before`, `break-after`, and `break-inside` when printing. This value tells the browser to avoid breaking before, after or inside the element it is applied to. For example, the following CSS avoids a figure being broken at a page break.

```css
figure {
    break-inside: avoid;
}
```

This feature has been added due to Chrome 108 adding support for LayoutNG printing.

### Last baseline item alignment

This feature allows developers to align items within either flex or grid layout by their last baseline, instead of their first. This is done via the following properties: 

- `align-items: last baseline;`
- `justify-items: last baseline;` 
- `align-self: last baseline;`
- `justify-self: last baseline;`

## `ContentVisibilityAutoStateChanged` event

An event that fires on an element with `content-visibility: auto` when the rendering state of the element changes due to any of the attributes that make the [element relevant to the user](https://www.w3.org/TR/css-contain-2/#relevant-to-the-user).

The use-case for this is to let developers have greater control over when to stop or start rendering in response to the user-agent stopping or starting rendering of the content-visibility subtree. For example, the developer may want to stop React updates in a subtree that is not rendered by the user-agent. Similarly, the developer may want to stop any other script updates (for example, canvas updates) when the user-agent is not rendering the element.

## Web APIs

### Federated Credentials Management (was WebID)

The Federated Credential Management API allows users to bring their federated identity to login to websites in a manner compatible with improvements to browser privacy.

### Media Source Extensions in workers

Enables Media Source Extensions (MSE) API usage from DedicatedWorker contexts to enable improved performance of buffering media for playback by an HTMLMediaElement on the main Window context. By creating a MediaSource object on a DedicatedWorker context, an application may then obtain a MediaSourceHandle from it and transfer that handle to the main thread for use in attaching to an HTMLMediaElement. The context that created the MediaSource object may then use it to buffer media. 

### `Sec-CH-Prefers-Reduced-Motion` User Preference Media Features Client Hints Header

[User Preference Media Features Client Hints Headers](https://web.dev/user-preference-media-features-headers/) defines a set of HTTP Client Hints headers around user preference media features as defined by Media Queries Level 5. If used as Critical Client Hints, these headers allow servers to make smart choices regarding, for example, CSS inlining. `Sec-CH-Prefers-Reduced-Motion` reflects the user's `prefers-reduced-motion` preference. 

### WebTransport BYOB readers

Supports BYOB(bring-your-own-buffer) readers for WebTransport to allow reading into a developer-supplied buffer. BYOB readers can minimize buffer copies, and reduce memory allocations. 

### Wildcards in Permissions Policy Origins

The Permissions Policy specification defines a mechanism that allows developers to selectively enable and disable use of various browser features and APIs. One capability of this mechanism allows features to be enabled only on explicitly enumerated origins (for example, `https://foo.com/`). This mechanism is not flexible enough for the design of some CDNs, which deliver content via an origin that might be hosted on one of several hundred possible subdomains.

Therefore, this feature adds support for wildcards in permissions policy structured like `SCHEME://*.HOST:PORT` (for example, `https://*.foo.com/`) where a valid Origin could be constructed from `SCHEME://HOST:PORT` (for example, `https://foo.com/`). This requires that HOST is a registrable domain. This means that `https://*.bar.foo.com/` works but `https://*.com/` won’t (if you want to allow all domains to use the feature, you should just delegate to `*`). 

### Sync methods for AccessHandles in File System Access API

Updates the asynchronous methods `flush()`, `getSize()`, and ` truncate()` in `FileSystemSyncAccessHandle` in the File System Access API to synchronous methods.
`FileSystemSyncAccessHandle` currently has a mix of sync and async methods, hindering the performance and the usability, especially for applications porting C/C++ to Wasm. This update will bring consistency in the API usage and improve the performance for Wasm-based libraries.

This is a potential breaking change, you can read more in [Breaking change: sync methods for AccessHandles](/blog/sync-methods-for-accesshandles/).

### WebAuthn conditional UI

[Conditional UI](https://web.dev/passkey-form-autofill/) for WebAuthn is supported on Windows 22H2 or later, macOS, and Android P or later. The WebAuthn UI on desktop platforms has also been refreshed.

## Variable COLRv1 fonts and font feature detection

### COLRv1 variable font support

[COLRv1 color vector fonts](/blog/colrv1-fonts/) have been supported since Chrome 98, but this initial release supported only static functionality of the COLRv1 table. The COLRv1 specification defines integration with OpenType Variations which allows modifying font properties of gradients and transforms by means of changing variable axis parameters. This second step brings support for such variations to COLRv1.

### `font-tech()` and `font-format()` condition extensions to CSS @supports

Using `font-tech()` and `font-format()` together with CSS @supports allows detection of font technology and format support, and progressive enhancement of content. The following example tests for support of [COLRv1 fonts](/blog/colrv1-fonts/).

```css
@supports font-tech(color-COLRv1) {

}
```
### `tech()` function support in `@font-face src:` descriptor

CSS Fonts Level 4 provides additional means of selecting or filtering font resources. The `tech()` function was introduced, which allows passing in a list of font technologies that this respective font blob requires to function. Based on that, the User Agent will select the first suitable resource.

## Chrome on Android

### Android OSK now resizes the visual viewport by default

The Android On-Screen Keyboard [resizes the visual viewport by default](/blog/viewport-resize-behavior/) rather than the initial containing block. Authors can opt out of this using the new `interactive-widget` meta-viewport key.

## Origin trials

This release of Chrome has two new [origin trials](/docs/web-platform/origin-trials/).

### Merchant identity in `canmakepayment` event

The `canmakepayment` service worker event lets the merchant know whether the user has a card on file in an installed payment app. It silently passes the merchant's origin and arbitrary data to a service worker from payment app origin. This cross-origin communication happens on `PaymentRequest` construction in JavaScript, does not require a user gesture, and does not show any user interface. The developer trial for removing the identity fields from "canmakepayment" event can be enabled via: `chrome://flags/#clear-identity-in-can-make-payment`. Enabling this flag will empty-out the identity fields in the "canmakepayment" event (and the Android `IS_READY_TO_PAY` Intent).

Find out more in [Update to the CanMakePayment event behavior of the Payment Handler API](/blog/payment-handler-canmakepayment-update/).


### Back/forward cache NotRestoredReason API

The NotRestoredReason API will report the list of reasons why a page is not served from BFcache in a frame tree structure, via the PerformanceNavigationTiming API.

Pages can be blocked from BFcache for different reasons, such as reasons required by the specification, and reasons specific to the browser implementation. Developers can gather the hit-rate of BFCache on their site by using the pageshow handler persisted parameter and `PerformanceNavigationTiming.type(back-forward)`. This API makes it possible for sites to collect information on why BFCache is not used on a history navigation, so that they can take actions on each reason and make their page BFCache compatible.

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

### Deprecations

This release of Chrome deprecates one feature.

#### Deprecate and remove `window.defaultStatus` and `window.defaultstatus`

These are non-standard APIs that aren't implemented by all browsers and have no effect on browser behavior. This cleans them up, and removes a potential fingerprinting signal.

They were originally used to modify/control the "status bar" text at the bottom of browser windows. However, they have never had any actual effect on Chrome's status bar, and they are not standardized attributes. Gecko has not supported these attributes since version 23; WebKit still supports these attributes. The related `window.status` attribute *is* standardized, but also [must never have an impact on the window status bar](https://html.spec.whatwg.org/multipage/window-object.html#dom-window-status).

### Removals

This release of Chrome removes four features.

#### Remove `ImageDecoderInit.premultiplyAlpha`

The feature has no observable effects in primary use cases, but may constrain implementations in suboptimal ways. See [this issue](https://github.com/w3c/webcodecs/issues/508) for a more detailed description. Per consensus of WebCodecs spec editors and lack of usage (0.000000339% - 0.00000687% of page loads per use counter in M106).

#### Remove `navigateEvent.restoreScroll()`

`restoreScroll()` is being replaced by `navigateEvent.scroll()`. `scroll()` works identically except that it allows the developer to control scroll timing for non-traverse navigations (`scroll()` works when the scroll is not a restore, hence the name change along with the behavior change). 

#### Remove `navigateEvent.transitionWhile()`

`transitionWhile()` is being replaced by `navigateEvent.intercept()` due to design flaws reported by developers. intercept() behaves nearly identically to transitionWhile(), but instead of taking a mandatory Promise parameter, it takes an optional handler function that returns a Promise. This allows the browser to control when the handler executes, which is later and more intuitive than for `transitionWhile()`. 

#### Remove WebRTC mediaConstraint's `googIPv6`

`"googIPv6: false"` can be used to disable IPv6 support in WebRTC, as in the following example. 

```js
new RTCPeerConnection({}, {mandatory:{googIPv6:false}});
```

IPv6 has been enabled by default for many years and we should not be able to disable it. This is a legacy API that does not exist in the spec. 
