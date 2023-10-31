---
title: Chrome 109 beta
description: >
  MathML, conditional focus for getDisplayMedia(), Origin Private File System on Android, and more.
subhead: >
  MathML, conditional focus for getDisplayMedia(), Origin Private File System on Android, and more.
layout: 'layouts/blog-post.njk'
date: 2022-12-01
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/zQuGajDm8rdY6kUo84LB.png'
alt: >
  Chrome 109 beta hero logo
tags:
  - beta
  - chrome-109
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 109 is beta as of December 1, 2022. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

### Auto range support for font descriptors inside `@font-face` rule

Variable fonts provide users the opportunity to choose how heavy or slanted or wide the typeface should be, using the `font-weight`, `font-style`, and `font-stretch`' descriptors inside the `@font-face` rule. The CSS Working Group added a new value of `auto` for these descriptors, which is now the initial value. This value is implemented in 109 to match the new specification.

### CSS `lh` Length Unit

The `lh` CSS [`<length>`](https://developer.mozilla.org/docs/Web/CSS/length) unit is equivalent to the computed value of the line-height property on the element on which it is used. This allows a `<textarea>` to be given a height equivalent to the number of lines of text expected.

### CSS `hyphenate-limit-chars` property

The `hyphenate-limit-chars` property specifies the minimum number of characters in a hyphenated word. When applying the hyphenation, the optimal minimum number of characters in the word, before the hyphen, or after the hyphen can vary by the design of the page, or by the language. This property allows finer grained control of the hyphenation for better typography on the web. It can also help international pages when the default settings are not optimal. 

### Snap border, outline and column-rule widths before layout

Currently Blink snaps the border widths at paint time. This can cause a visible 1px gap between a parent element's border and a child's background when the border is rounded down during paint. This happens because the snapping floors the value, but the layout rounds it up to calculate the child’s position (for example, border-width is set to 10.75 pixels, rounded to 10px at paint time, but 11 at layout time). By making this change Blink will behave like Gecko and WebKit, improving interoperability.

## MathML

Chrome 109 supports [MathML](https://developer.mozilla.org/docs/Web/MathML) Core, a language for describing mathematical notation embeddable in HTML and SVG. MathML is rendered in a CSS-compatible way with OpenType MATH and exposed via platform accessibility APIs. MathML styling is enabled by CSS features including those dedicated to math layout:

The [`math-depth`](https://developer.mozilla.org/docs/Web/CSS/math-depth) property.
The [`math-shift`](https://developer.mozilla.org/docs/Web/CSS/math-shift) property.
The [`math-style`](https://developer.mozilla.org/docs/Web/CSS/math-style) property. 
The `math` value for the [`display`](https://developer.mozilla.org/docs/Web/CSS/display) property
The `math` `font-family` name
The `math-auto` value for the [`text-transform`](https://developer.mozilla.org/docs/Web/CSS/text-transform) property. 

The `MathMLElement` interface provides a convenient way to manipulate MathML in scripts. 

## Web APIs

### Secure Payment Confirmation on Android Chrome

[Chrome 109 on Android supports Secure Payment Confirmation (SPC)](/blog/spc-on-android), which is a [proposed web standard](https://www.w3.org/TR/secure-payment-confirmation/) that allows customers to authenticate with a credit card issuer, bank, or other payment service provider using a platform authenticator—typically activated with a device's screen unlock feature such as a fingerprint sensor. This usually happens during a payments authentication protocol such as [EMV 3-D Secure](https://www.emvco.com/emv-technologies/3d-secure/) or [Open Banking](https://standards.openbanking.org.uk/). EMV 3-D Secure, for example, has support for SPC in its [v2.3 spec release](https://www.emvco.com/emv_insights_post/what-is-new-with-emv-3ds-v2-3/). We [previously announced](/articles/secure-payment-confirmation/) that SPC was launched for Google Chrome on macOS and Windows and provided developer guides for both [registration](/articles/register-secure-payment-confirmation/) and [authentication](/articles/authenticate-secure-payment-confirmation/).

### Conditional Focus

[Conditional Focus](/docs/web-platform/conditional-focus) extends `getDisplayMedia()` by adding a `CaptureController` object which can be passed in as a parameter. This object exposes a `setFocusBehavior()` method. By calling this method, an app can control whether the captured tab or window is focused when capture starts, or whether the capturing page should retain focus.

### `MediaTrackSupportedConstraints.suppressLocalAudioPlayback`

It is common for colleagues to gather in a room so that one of them can present from their laptop to an in-room conferencing solution with a dedicated monitor and speakers. The presenter will typically mute their own laptop, and use the external speakers which are often louder; this also ensures audio is in sync with video. The [`suppressLocalAudioPlayback`](/blog/screen-sharing-improvements-in-chrome-109/#suppress-local-audio-playback) audio constraint saves time here. When set to `true`, it indicates that the browser should stop relaying audio to the local speakers when capture starts. 

### HTTP response status code in the Resource Timing API

Adds a field to `PerfomanceResourceTiming` to indicate the HTTP response status when the resource was fetched. This provides a straightforward way to tell if a resource failed loading for developers using the Resource Timing API. 

## Origin Private File System (OPFS) on Android

Chrome 109 enables the Origin Private File System (OPFS) part of the File System Access API on Android. This includes all of the File System Access API surface, minus the `show{OpenFile, SaveFile, Directory}Picker()` methods and the Drag-and-Drop API integration. With the File System Access API on OPFS, sites can access their per-origin, private file system and are able to perform file operations via `FileSystemSyncAccessHandle` with improved performance. 

### Same-site cross-origin prerendering triggered by the speculation rules API

Previously Chrome launched same-origin prerendering triggered by the speculation rules API. Chrome 109 expands coverage to also allow triggering same-site cross-origin pages. This prerendering will be done with credentials and storage access, but such prerender targets will need to opt in by using the `Supports-Loading-Mode: credentialed-prerender` header.

### WebTransport BYOB readers

Support BYOB (bring-your-own-buffer) readers for Web Transport to allow reading into a developer-supplied buffer. BYOB readers can minimize buffer copies and reduce memory allocations. 

## Origin trials in progress

In Chrome 109 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Back/forward cache NotRestoredReason API

The NotRestoredReason API will report the list of reasons why a page is not served from BFcache in a frame tree structure, via the PerformanceNavigationTiming API.

[Register for the NotRestoredReason API origin trial](/origintrials/#/register_trial/3101854243351429121).

### Private Network Access preflight requests for subresources

The feature sends a CORS preflight request ahead of any private network requests for subresources, asking for explicit permission from the target server. A private network request is any request from a public website to a private IP address or localhost, or from a private website (for example, an intranet) to localhost. Sending a preflight request mitigates the risk of cross-site request forgery attacks against private network devices such as routers, which are often not prepared to defend against this threat.

[Register for the Private Network Access preflight requests for subresources origin trial]().

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit [ChromeStatus.com](https://chromestatus.com) for lists of planned deprecations, current deprecations and previous removals.

### Deprecations

There are no new deprecations in this version of Chrome.

### Removals

This release of Chrome removes one feature.

### Remove `Event.path`

`Event.path` is a non-standard API that returns the event's path, which is an array of the objects on which listeners will be invoked. Only Blink supports this, causing web compatibility issues. Web developers should switch to the equivalent standard API [`Event.composedPath()`](https://developer.mozilla.org/docs/Web/API/Event/composedPath), which returns the same result.
