---
title: Chrome 120 beta
description: >
  CSS masking, relaxed rules for CSS nesting, create accordion patterns with the <details> element, the enterpictureinpicture action for the Media Session API.
subhead: >
  CSS masking, relaxed rules for CSS nesting, create accordion patterns with the <details> element, the enterpictureinpicture action for the Media Session API.
layout: 'layouts/blog-post.njk'
date: 2023-11-01
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/wqMne7H79dnsomaDFY8V.png'
alt: >
  Chrome 120 beta hero logo
tags:
  - beta
  - chrome-120
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on [chromestatus.com](https://chromestatus.com). Chrome 120 is beta as of November 1, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds seven new CSS features.

### CSS `<image>` syntax for registered custom properties

Supports using the` <image>` syntax for custom properties registered with `@property` or `registerProperty()`. The `<image>` syntax can be used to restrict values of the custom property to `url()` values and generated images like gradients.. 

### CSS `<transform-function>` and `<transform-list>` syntax for registered custom properties

Supports using the `<transform-function>` and `<transform-list>` syntaxes for custom properties registered with `@property` or `registerProperty()`.

The syntax can be used to restrict values of the custom property to represent transforms. This also makes it possible to use transitions and animations directly on these registered custom properties.

### Media Queries: scripting feature

The scripting media feature is used to query whether scripting languages, such as JavaScript, are supported on the current document. Valid options are 'enabled', 'initial-only', and 'none'. However, 'initial-only' never matches inside a browser.

### :dir() pseudo-class selector

The :dir() CSS pseudo-class selector matches elements based on directionality, which is determined based on the HTML dir attribute.  

`:dir(ltr)` matches left-to-right text directionality.
`:dir(rtl)` matches elements with right-to-left text directionality. 

It is not equivalent to `[dir]` attribute selectors because it matches against directions inherited from an ancestor with the `dir` attribute, and because it matches against the direction computed from use of `dir=auto` (which determines directionality from the first character in the text with strong directionality).

### CSS exponential functions

Adds the CSS exponential functions: `pow()`, `sqrt()`, `hypot()`, `log()`, and `exp()` from the CSS Values and Units Level 4 specification.

### CSS masking

CSS `mask`, and related properties such as `mask-image` and `mask-mode` are used to hide an element (partially or fully) by masking or clipping the image at specific points.

This feature unprefixes the `-webkit-mask*` properties and brings them into line with the current specification. This includes `mask-image`, `mask-mode`, `mask-repeat`, `mask-position`, `mask-clip`, `mask-origin`, `mask-size`, and `mask-composite`, as well as the `mask` shorthand. Local `mask-image` references are supported, serialization now matches the specification, and accepted values now match the specification (for example, `add` instead of `source-over` for `mask-composite`.)

### Relaxed CSS nesting
This change to the CSS nesting implementation allows nested style rules to begin with an element, for example `h1` rather than requiring the `&` symbol in front, or being wrapped with `is()`. The following example is now valid in the specification, and works in Chrome 120.

```css
.card {
  h1 {
    /* h1 does not start with a symbol */
  }
}

```

## HTML

### Accordion pattern using name attribute on `<details>`

This feature adds the ability to construct accordions using a sequence of HTML `<details>` elements. It adds a name attribute to the `<details>` element. When this attribute is used, multiple `<details>` elements that have the same name form a group. At most one element in the group can be open at once.

## Web APIs

### Allow transferring ArrayBuffer into VideoFrame, AudioData, EncodedVideoChunk, EncodedAudioChunk, ImageDecoder constructors

This will allow detaching array buffers and using corresponding buffers inside VideoFrame, ImageDecoder, EncodedVideoChunk, EncodedAudioChunk, AudioData without a copy. 

### CSS Font Loading API FontFaceSet: check() method

The `check()` method of `FontFaceSet` verifies whether it's possible to display text using the specified fonts without attempting to utilize fonts in the `FontFaceSet` that have not completed loading. This allows users to safely employ the font without later triggering a font replacement.

### Close requests and CloseWatcher

_Close requests_ are a new concept that encompasses user requests to close something currently open, using the **Esc** key on desktop or the back gesture or button on Android. Integrating them into Chrome comes with two changes: 

* `CloseWatcher`, a new API for directly listening and responding to close requests. 
* Upgrades to `<dialog>` and `popover=""` to use the new close request framework, so that they respond to the Android back button. 

### Dedicated workers and Storage Access API

Dedicated workers will inherit the _storage access status_ of the parent context. Therefore, if a document obtains storage access via `document.requestStorageAccess()` and then creates a dedicated worker, the worker will also have storage access (and be able to access unpartitioned cookies.) 

### FedCM: Error API and AutoSelectedFlag API

Dedicated APIs to help developers and users to better understand the authentication flow. Both APIs are triggered post user permission to sign in to a website or application (in this context known as a relying party (RP)) with an identity provider. In other words, after the user clicks the **Continue as** button. 

With the Error API, if a user's sign-in attempt fails, the identity provider can share the reasons with the browser to keep both users and RP developers updated. 

With the AutoSelectedFlag API, both identity provider and RP developers can have a better understanding about the sign-in UX, and evaluate performance and segment metrics accordingly. 

Find out more in [the FedCM Chrome 120 blog post](/blog/fedcm-chrome-120-updates).

### Fenced Frames functionality updates

There is an additional format option for [Protected Audience](/docs/privacy-sandbox/protected-audience/) ad size macros in the Protected Audience API within the Privacy Sandbox. An opt-in feature allows you to use macros to specify the size of the ad that wins the auction into the ad’s URL, for example:

https://ad.com?width={/%AD_WIDTH%}&height={/%AD_HEIGHT%}

To be more consistent with other types of macros in Protected Audience, like those used by `deprecatedReplaceInURN` and `registerAdMacro()`, in Chrome 120 we’re adding the ability to use ${AD_WIDTH} and ${AD_HEIGHT} as the format for the macros in addition to the current format.

Automatic beacons will now send to all registered URLs. Previously, only destinations specified when calling `setReportEventDataForAutomaticBeacons()` receive automatic beacons, even if that destination called `registerAdBeacon()` for `reserved.top_navigation` in their worklet. Now, any destination that calls `registerAdBeacon()` for `reserved.top_navigation` will get an automatic beacon, but only destinations specified in `setReportEventDataForAutomaticBeacons()` will get automatic beacon data along with the beacon. The `once` parameter in `setReportEventDataForAutomaticBeacons()` will now determine whether the data is sent out once, rather than determine if the entire beacon is sent once.

### Intersection Observer Scroll Margin

Intersection Observer `scrollMargin` allows developers to observe targets inside nested scroll containers that are currently clipped away by the scroll containers. This is achieved by expanding the container's clipping rect by the `scrollMargin` when calculating the intersection. 

### Permissions policy violation reports

This integrates the Permissions policy API with the Reporting API, allowing web developers to configure endpoints to which permissions policy violation reports will be sent, allowing site owners to see when disallowed features are being requested on their pages in the field.

It also includes the `Permissions-Policy-Report-Only` header, which enables reports to be sent based on a proposed policy (analogous to `Content-Security-Policy-Report-Only`) so that policy changes can be evaluated for potential breakage before implementing them in the regular, enforcing mode.

### Media Session API: `enterpictureinpicture` action

Adds an`enterpictureinpicture` action to the Media Session API. Websites can register an action handler which can be used to open a Picture-in-Picture or Document Picture-in-Picture window.

Learn more in [Automatic picture-in-picture for web apps](/blog/automatic-picture-in-picture/).

### WebGPU f16 support

Allows for the use of the half-precision floating-point type f16 in WebGPU shaders (WGSL).

Developers can use the 'shader-f16' feature from the WebGPU spec and the 'f16' extension from the WGSL spec to access 16-bit floating point variables and APIs in their shaders.

### MediaCapabilities: Query HDR support with decodingInfo()

Extends the Media Capabilities API to allow detection of HDR rendering support via three new VideoConfiguration dictionary fields: `hdrMetadataType`, `colorGamut`, and `transferFunction`. Chrome implements its own tone-mapping algorithms so will always return true for HDR10 (smpteSt2086) static metadata. HDR10+ (smpteSt2094-10) and Dolby Vision (smpteSt2094-40) dynamic metadata are not currently supported, so will return false. We anticipate adding support for dynamic metadata in the future, so this API will allow developers to select the appropriate content for users with support. 

### MediaStreamTrack Stats (Video)

An API that exposes frame counters (delivered, discarded, total) for MediaStreamTracks of kind video. Audio stats will be covered by a separate Chrome feature launch. 

### Private Aggregation API: aggregation coordinator selection

Modification to the Private Aggregation API to provide a mechanism for selecting which coordinator to use for payload encryption (from a vendor-specified allowlist). The choice of service is made with an additional option in the `run()` and `selectURL()` SharedStorage calls, and in the `runAdAuction()` and `joinAdInterestGroup()` Protected Audience calls. The broad approach largely aligns with the approach of the Attribution Reporting API.

### The Login Status API in FedCM

The Login Status API (formerly IdP Sign-in Status API) allows identity providers to signal to the browser when their users are logging-in or out. 

This is used by FedCM to address a silent timing attack, and in doing so, allows FedCM to operate without third-party cookies altogether. 

In future this API may become available for more use cases.

Find out more in [the announcement blog post](/blog/fedcm-chrome-120-updates).

### View Transitions: making callback non-nullable

The `startViewTransition` call currently takes an optional nullable callback type with a default value of null: `startViewTransition(optional UpdateCallback? callback = null)`. 

This feature changes this to be a non-nullable type: `startViewTransition(optional UpdateCallback callback)`.

### X25519Kyber768 key encapsulation for TLS

Protect current Chrome TLS traffic against future quantum cryptanalysis by deploying the Kyber768 quantum-resistant key agreement algorithm. This is a hybrid X25519 + Kyber768 key agreement based on an IETF standard. This specification and launch is outside the scope of W3C. This key agreement will be launched as a TLS cipher, and should be transparent to users. 

## Origin trials in progress

In Chrome 120 you can opt into the following new [origin trials](/docs/web-platform/origin-trials/). 

### 'priority' HTTP request header

This feature adds the `priority` request header for all HTTP requests with the priority information for the request at the time that it was sent. 

RFC 9218 (Extensible Prioritization Scheme for HTTP) defines a 'priority' HTTP request header to use for signaling request priority to origins (and intermediaries). It also defines negotiation processes and protocol-level frames for HTTP/2 and HTTP/3 to carry the same priority information. The header can only signal the initial priority for a resource when it was first requested while the frame-based mechanisms allow for modifying the priority after the fact. The header can operate end-to-end to the origin servers (and provide a mechanism for the origin to override the priority if recognized by intermediaries) while the frames are limited to operating on a link level. This feature is specifically for supporting the header-based prioritization scheme. 

### Extending the Storage Access API (SAA) to non-cookie storage

We propose an extension of the Storage Access API (backwards compatible) to allow access to unpartitioned (cookie and non-cookie) storage in a third-party context.

### Private Network Access permission to relax mixed content

In order to establish connections to devices on a local network that do not have globally unique names, and therefore cannot obtain TLS certificates, this feature introduces a new option to `fetch()` to declare a developers' intent to talk to such a device, a new policy-controlled feature to gate each sites' access to this capability, and new headers for the server's preflight response to provide additional metadata. 

[Sign up for the Private Network Access Permission Prompt origin trial](/origintrials/#/view_trial/1367968386813788161).

### Unrestricted access to performance.measureUserAgentSpecificMemory()

performance.measureUserAgentSpecificMemory() is specified to only be available in cross-origin isolated environments (behind COOP/COEP). This feature removes the COOP/COEP restriction to allow regression tests and measuring of impact when not being able to fully deploy COOP/COEP. Note that performance.memory (legacy API) cannot be used for this purpose as it was never enabled on workers. 

### performance.measureUserAgentSpecificMemory()

The feature adds a `performance.measureUserAgentSpecificMemory()` function that estimates the memory usage of the web page. The website needs to be cross-origin isolated to use the API.

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome deprecates one feature.

### Deprecate and remove Theora support

Chrome will deprecate and remove support for the Theora video codec in desktop Chrome due to emerging security risks. Theora's low (and now often incorrect) usage no longer justifies support for most users. 

This release of Chrome removes two features.

### Remove data: URL in SVGUseElement

Assigning a data: URL in SVGUseElement can cause XSS. And this also led to a Trusted Types bypass. Therefore, we plan to deprecate and remove support for it. 

### Remove same-origin blanket enforcement in CSPEE

Removes a special treatment for same-origin iframes from CSP Embedded Enforcement. This aligns the behavior of enforcing CSP Embedded Enforcement for cross-origin iframes and same-origin iframes. 
