---
title: Chrome 117 beta
description: >
  CSS grid subgrid, entry and exit animation support for CSS, array grouping, iterator helpers, and more.
subhead: >
  CSS grid subgrid, entry and exit animation support for CSS, array grouping, iterator helpers, and more.
layout: 'layouts/blog-post.njk'
date: 2023-08-16
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/JEQ1ZvdVbdKX9jO3iTXd.png'
alt: >
  Chrome 117 beta hero logo
tags:
  - beta
  - chrome-117
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 117 is beta as of August 16, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds five new CSS features. The first three properties are part of work to enable transitions on discrete properties, [which enable entry and exit animations](/blog/entry-exit-animations/). 

### The @starting-style rule

This at-rule allows authors to start CSS transitions on the first style update. 

CSS transitions do not trigger transitions from initial styles on the first style update for an element, or when the display type changes from `none` to some other type. This is to avoid unexpected transitions from initial styles. To start a transition from the first style update, you can now apply styles from within a `@starting-style` rule. For example, the following CSS starts a background-color transition from green to lime on the first style update for a div: 

```css
div { 
  transition: background-color 0.5s; 
  background-color: lime; 
} 

@starting-style {
  div { 
    background-color: green; 
  } 
}
```

### The overlay property

The `overlay` property enables developers to keep elements in the top layer for an exit transition. The overlay property is added to indicate if an element is in the top layer or not, and can take two values: `none`, or `auto`. 

### CSS transition-behavior property

The `transition-behavior` CSS property is a longhand of the `transition` property which allows discrete properties to be used in transitions. By specifying the `allow-discrete` value for transition-behavior, discrete properties will now start animations and flip from their initial value to their final value at 50%. For transitions where `display: none` and `content-visibility: hidden` are one of the initial or final values, the visible value will be used for the entire duration of the transition.

### The CSS grid subgrid value

The `subgrid` value for `grid-template-columns` and `grid-template-rows` is now implemented in Chrome. This value allows a nested grid to use the tracks defined on its parent, rather than creating a new track definition for rows, columns, or both.

### CSS text-wrap: pretty

The `pretty` value for the CSS `text-wrap` property optimizes for the best layout, rather than speed. It is intended for body text, and therefore expects multiple lines. By using `pretty` a developer is explicitly opting into a layout method that may be slower than `wrap`—which optimizes for performance. The current implementation in Chrome optimizes for [orphans](https://fonts.google.com/knowledge/glossary/widows_orphans) to prevent a single word displaying at the bottom of a paragraph of text.

In Chrome 117 try this [demo of text-wrap: pretty](https://codepen.io/argyleink/pen/dyQxmYK) and see how the value changes the text presentation.

### contain-intrinsic-size: auto none support

This feature extends the existing `contain-intrinsic-size` syntax to also include `auto && none`. 

## Web APIs

### Array grouping

Array grouping is an extremely common operation, best exemplified by SQL's GROUP BY clause and MapReduce programming (which is better thought of map-group-reduce). The ability to combine data into groups allows developers to compute higher order datasets, like the average age of a cohort or daily LCP values for a webpage. This feature enables this by adding the [`Object.groupBy`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) and [`Map.groupBy`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy) static methods. The Object method returns a plain object, where the groups are property keys. The Map method returns a Map, where the keys can be arbitrary values.

### Clear Client Hints via Clear-Site-Data header

Websites will now be able to clear the client hints cache using `Clear-Site-Data: "clientHints"`. Client hints will also now be cleared when "cookies", "cache", or "*" are targeted by the same header. This is because if the user clears cookies in the UI client hints are already cleared as well, the client hints cache is a cache, and to be consistent with wildcard targets respectively.

### Clear-Site-Data header wildcard syntax

Websites will now be able to clear all storage targets ("cookies", "cache", and "storage") by sending `Clear-Site-Data: "*"`. Note that Chrome does not support clearing "executionContexts" at the moment, but if we added it in the future any header targeting "*" would then clear them too. 

### `customElements.getName`

The [`customElements.getName()`](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/getName) method returns the tag name of the given custom element definition. 

### Iterator helpers

[Iterator helpers](https://github.com/tc39/proposal-iterator-helpers) are new methods on iterator prototype to allow general usage and consumption of iterators. 

### Make `CaptureController` derive from the `EventTarget` interface

The [CaptureController](https://developer.mozilla.org/docs/Web/API/CaptureController) interface enables further manipulation of a screen capture session. In the future, it is expected that the events related to a capture session are dispatched on that controller. To be able to manage listeners for such events, the `EventTarget` methods are made available on `CaptureController`. 

### PerformanceResourceTiming deliveryType

The `deliveryType` property of `PerformanceResourceTiming` returns information about how a resource was delivered. For example, resources which were delivered from the cache (currently exposed through `transferSize`) and navigations which were prefetched by the previous page.

### Port overflow check in URL setters

The port value will be checked when setting `url.port`. All the values that overflow the 16-bit numeric limit will be no longer valid. For instance the following script behaves differently after the change: 

```js 
u = new URL("http://test.com"); 
u.port = 65536; 
console.log(u.port); 
``` 

Before the change the output is 65536. After the change the output will be 80. 

### Private State Token API

This is a new API for propagating limited private signals across sites, without using cross-site persistent identifiers like third party cookies. Anti-fraud methods that rely on third-party cookies will not work once third-party cookies are depreciated.  The Private State Token API does not generate or define anti-fraud signals: this is up to the corresponding first party and the token issuers. Rather, the API maintains privacy by enforcing limits on the information transferred in these signals. The API is based on a variant of the [Privacy Pass](https://privacypass.github.io/) protocol, which is in the process of being standardized by the IETF. It can be considered as a web-exposed form of the Privacy Pass protocols. The API spec is to be updated for new versions and types of tokens, and will be kept up to date with Privacy Pass working group specs. Expected changes would be in the underlying cryptographic protocols and token issuance code: we do not expect changes in the developer facing issuance and redemption [Fetch APIs](https://github.com/WICG/trust-token-api#potential-api). The Private State Token API was formerly known as the Trust Token API. It is renamed to more accurately capture the underlying semantics and to highlight the privacy benefits to users. 

### URL Standard-compatible IPv4 embedded IPv6 host parser

The behavior of parsing IPv4 embedded IPv6 host parser will be updated to strictly follow the web [URL standard](https://url.spec.whatwg.org/#concept-ipv6-parser). The introduced restrictions on the IPv6 address are: 

* The embedded IPv4 address shall always consist of 4 parts. 
* Addresses with less than 4 parts like `http://[::1.2]` will be no longer valid. The feature is a part of the URL interop 2023.

### URL: Allow "%00" as a valid URL path

Chrome currently considers a URL invalid if the URL's path part contains "%00" (or null), which is not compliant with the [URL Standard](https://url.spec.whatwg.org/). For example, the following test fails in Chrome, as `new URL(...)` throws an Invalid URL exception. 

```js
assertEquals(new URL("http://example.com/%00").pathname, "/%00"); 
```

According to the URL Standard, any character or byte sequence in the URL path should not make the URL invalid, and this change updates Chrome to follow that standard.

### WebRTC RTP header extension control

Extend the WebRTC `RTCRtpTransceiver` API to offer control over which RTP header extensions are negotiated. 

### Per frame quantizer in VideoEncoder

Adds "quantizer" `VideoEncoderBitrateMode` for VideoEncoder.
This provides the ability to specify a quantizer parameter for each frame for AV1, VP9, and AVC video codecs.

## Origin trials in progress

In Chrome 117 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### Compression dictionary transport with Shared Brotli

This feature adds support for using designated previous responses, as an external dictionary for Brotli-compressing HTTP responses. 

[Register for the CompressionDictionaryTransport origin trial](/origintrials/#/register_trial/2583940286203822081).

### WebSQL deprecation trial

WebSQL is being removed from Chrome. Sites relying on it are encouraged to move to [SQLite via Wasm](/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/).

This [deprecation trial](/docs/web-platform/origin-trials/#deprecation-trials) gives developers who need more time for the migration the ability to continue to use WebSQL until Chrome 123 (March 2024).

Register for the WebSQL deprecation trial](/origintrials/#/register_trial/494270059103911937).

### Tabbed web apps

Allow web app windows to have a tab strip. This adds a new display mode "tabbed" and a new manifest field to allow customizations to the tab strip. 

[Register for the Tabbed Web Apps origin trial](/origintrials/#/register_trial/3547710606461108225).

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates two feature(s).

### Deprecate the unload event

Chrome 117 will start the process of deprecating the `unload` event handler. If your site uses these then you are strongly advised to read the [dedicated post on deprecating `unload`](/blog/deprecating-unload/) for more details.

### Deprecate TLS SHA-1 server signatures

Chrome is removing support for signature algorithms using SHA-1 for server signatures during the TLS handshake. This does not affect SHA-1 support in server certificates, which was already removed, or in client certificates, which continues to be supported. 

This release of Chrome removes four feature(s).

### [WebRTC] Unship callback-based legacy getStats()

RTCPeerConnection has two versions of `getStats()`, one that is spec-compliant returning the report via resolving a promise, and one that is non-standard returning a very different report via a callback as the first argument. The callback-based one is now removed. 

For more information on migration, and what to do if you need more time see [Legacy getStats() migration guide](/blog/getstats-migration/).

### Removal of the -1 value for WebRTC getStats datachannelIdentifier

The WebRTC getStats API exposes a [dataChannelIdentifier property](https://w3c.github.io/webrtc-stats/#dom-rtcdatachannelstats-datachannelidentifier). It will no longer provide the value "-1" in cases where statistics are queried before the datachannel connection is established. Instead, the dictionary member will be omitted.

### Removal of WebRTC getStats encoderImplementation and decoderImplementation "unknown"

The WebRTC getStats API exposes the encoder and decoder implementation names [for outbound and inbound video](https://w3c.github.io/webrtc-stats/#dom-rtcoutboundrtpstreamstats-encoderimplementation). It will no longer provide the value “unknown” in cases where statistics are queried before a video frame was encoded or decoded. Instead, the dictionary member will be omitted. 

### CSS property -webkit-highlight

Remove the CSS property `-webkit-highlight` intended to highlight text, but never standardized. It has no visible effect in chromium (it is parsed but never used in rendering content). The property was [removed from WebKit in 2014](https://bugs.webkit.org/show_bug.cgi?id=128456), has been marked as deprecated on MDN, and has been replaced recently with the [CSS Highlight Pseudo spec](https://www.w3.org/TR/css-pseudo-4/#highlight-pseudos). 

