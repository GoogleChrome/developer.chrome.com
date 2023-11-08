---
title: Chrome 119 beta
description: >
  Chrome 119 beta brings you CSS relative color syntax, new pseudo-classes, and much more.
subhead: >
  Chrome 119 beta brings you CSS relative color syntax, new pseudo-classes, and much more.
layout: 'layouts/blog-post.njk'
date: 2023-10-06
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/5N68Pe8N9DKjNi5F0YP6.png'
alt: >
  Chrome 119 beta hero logo
tags:
  - beta
  - chrome-119
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 119 is beta as of October 4, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds four new CSS features.

### :user-valid and :user-invalid CSS pseudo-classes

The `:user-invalid` and `:user-valid` pseudo-classes represent an element with incorrect or correct input, respectively, but only after the user has significantly interacted with it. This is similar to `:valid` and `:invalid`, but with the added constraint that these pseudo-classes only match after the user has interacted with the element.

### CSS Relative Color Syntax (RCS)

The [relative color syntax](https://www.w3.org/TR/css-color-5/#relative-colors) allows developers to define colors by modifying the parameters of other colors.

For example: `oklab(from magenta calc(l * 0.8) a b);` results in an oklab magenta that is 80% lighter.

### CSS clip-path geometry-box values

The CSS `clip-path` property now supports `<geometry-box>` values to control the clip's reference box, making `clip-path` easier to use. These box values can be used alongside basic shapes (for example, `clip-path: circle(50%) margin-box`), or they can be used alone to clip to the specified box (for example, `clip-path: content-box`).

### CSS clip-path xywh() and rect() values

Chrome now supports the `xywh()` and `rect()` values of the `clip-path` property, which make it easier to specify rectangular or rounded-rectangular clips.

## Web APIs

### Cookie Expires/Max-Age attribute upper limit for prior storage

Since Chrome 104 newly created cookies or those updated with an expiration date have had that date capped at no more than 400 days in the future. This same limit will now be retroactively applied to cookies already in storage. The expiration dates of these cookies will be capped at no more than 400 days after the first time Chrome 119+ starts up and does a one time database migration. The impact of this change will not be felt by users until at least 400 days after Chrome 119 is released, and then only for existing cookies that have not been updated in that period.

### DisplayMediaStreamOptions monitorTypeSurfaces

When `getDisplayMedia()` is called, the browser offers the user a choice of display surfaces: tabs, windows, or monitors. Using the [`monitorTypeSurfaces`](/docs/web-platform/screen-sharing-controls/#monitorTypeSurfaces ) option, the web application may now hint to the browser if it prefers to include display surfaces whose type is monitor among the choices offered to the user.

### Fenced Frames functionality updates

Chrome 119 includes the following improvements to Fenced Frames.

There is an additional format option for Protected Audience ad size macros In the Protected Audience API within the Privacy Sandbox. An opt-in feature allows you to macro the size of the ad that wins the auction into the ad’s url, for example:

`https://ad.com?width={/%AD_WIDTH%}&height={/%AD_HEIGHT%}`

To be more consistent with other types of macros in Protected Audience, like those used by `deprecatedReplaceInURN` and `registerAdMacro`, in Chrome 119 we’re adding the ability to use `${AD_WIDTH}` and `${AD_HEIGHT}` as the format for the macros in addition to the current format.

Automatic beacons will now send to all registered URLs. Previously, only destinations specified when calling `setReportEventDataForAutomaticBeacons()` receive automatic beacons, even if that destination called `registerAdBeacon()` for `"reserved.top_navigation"` in their worklet. Now, any destination that called `registerAdBeacon()` for `"reserved.top_navigation"` will get an automatic beacon, but only destinations specified in `setReportEventDataForAutomaticBeacons()` will get automatic beacon data along with the beacon. The `"once"` parameter in `setReportEventDataForAutomaticBeacons()` will now determine whether the data is sent out once, rather than determine if the entire beacon is sent once.

### Intersection Observer scroll margin

The Intersection Observer `scrollMargin` property allows developers to observe targets inside nested scroll containers that are currently clipped away by the scroll containers. This is achieved by expanding the container's clipping rect by the `scrollMargin` when calculating the intersection.

### Keyboard-focusable scroll containers

This feature improves accessibility by making scroll containers focusable using sequential focus navigation. Previously, the tab key didn't focus scrollers unless tabIndex was explicitly set to 0 or more. By making scrollers focusable by default, users who can't (or don't want to) use a mouse will be able to focus clipped content using a keyboard's tab and arrow keys. This behavior is enabled only if the scroller does not contain any keyboard focusable children.

### Private Network Access restrictions for automotive

Enforce (instead of just warn) Private Network Access restrictions on Chrome for Android Automotive (if `BuildInfo::is_automotive`). This includes Private Network Access preflight requests for subresources, and Private Network Access for Workers.

### Read Chrome device attributes

Device Attributes Web API is a subset of the Managed Device Web API, that provides web applications the capability to query device information. For example, device ID, serial number, and location.

### Replace dangling markup in target name to `_blank`

This change replaces the navigable target name (which is usually set by target attribute) to `_blank`, if it contains a dangling markup (for example, `\n` and `<`). Which fixes a bypass in the dangling markup injection mitigation.

### Sec-CH-Prefers-Reduced-Transparency user preference media features Client Hints header

The [user preference media features Client Hints header](https://web.dev/articles/user-preference-media-features-headers) defines a set of HTTP Client Hints headers around user preference media features as defined by Media Queries Level 5. If used as Critical Client Hints, these headers allow servers to make smart choices regarding, for example, CSS inlining. `Sec-CH-Prefers-Reduced-Transparency` reflects the user's `prefers-reduced-transparency` preference, and is available from Chrome 119.

### Standard compliant URL host punctuation characters

Make Chrome's handling of URL host punctuation characters compliant with the [URL standard](https://url.spec.whatwg.org/#host-writing). For example:

Before:

```bash
> const url = new URL("http://exa(mple.com;");
> url.href
'http://exa%28mple.com/&apos;
```

`(` is a forbidden character, however, Chrome permits it wrongly.

After:

```bash
> const url = new URL("http://exa(mple.com;");
> => throws TypeError: Invalid URL.
```

### WebCodecs AudioEncoder bitrateMode

Some audio codecs support specifying the audio encoder bitrate modes. This feature adds a `"bitrateMode"` flag with a default value of `"variable"` to WebCodec's `AudioEncoderConfig`, which mirrors the config option and default already present for `VideoEncoderConfig`.

This flag will allow developers to choose between encoding audio with a variable bitrate or a constant bitrate. Specific codec encoder implementations might have slightly different terminology (for example, `CBR` vs `VBR` for Opus), but all of them should map to the general concept of "constant" versus "variable" bitrate.

The two options have the following effects:

- **variable**:  allows an audio encoder to increase or lower its bitrate according to the content of the audio it is encoding, in order to preserve bandwidth/binary-size, while still maintaining a target quality. For example, an encoder might lower its bitrate when encoding silence, and revert to a full bitrate when encoding speech.
- **constant** : forces an audio encoder to maintain the same bitrate, regardless of the audio content. This can be useful when a predictable bandwidth consumption is preferable.

As of Chrome 119, this flag will affect two codecs on Chromium: Opus and AAC.

### X25519Kyber768 key encapsulation for TLS

[Protect current Chrome TLS traffic](https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html) against future quantum cryptanalysis by deploying the Kyber768 quantum-resistant key agreement algorithm. This is a hybrid X25519 + Kyber768 key agreement based on an IETF standard. This specification and launch is outside the scope of W3C. This key agreement will be launched as a TLS cipher, and should be transparent to users.

## Origin trials in progress

In Chrome 119 you can opt into the following new [origin trial](/docs/web-platform/origin-trials/).

### Open popups as fullscreen windows

This [new origin trial](/origintrials/#/view_trial/106960491150049281) adds a `fullscreen` windowFeatures parameter to the `window.open()` JavaScript API. This allows the caller to open a popup directly to full-screen on the display that would contain the popup (based on screenX and screenY). This eliminates the need for the developer to manually transition a popup into full-screen, which could require a new user activation signal.

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome removes four features.

### Remove Web SQL

We previously announced the [deprecation and removal of Web SQL](/blog/deprecating-web-sql/). The feature is fully removed as of Chrome 119. [A reverse origin trial](/origintrials/#/view_trial/494270059103911937) allows developers to continue to use WebSQL until Chrome 123.

### Remove Sanitizer API

The Sanitizer API aims to build an easy-to-use, always secure, browser-maintained HTML sanitizer into the platform. Chrome shipped an initial version in Chrome 105, based on the then-current specification draft. However, the discussion has meanwhile moved on and the proposed API shape has changed substantially.

In order to prevent the current API from becoming entrenched we are removing the current implementation. We expect to re-implement the Sanitizer API when the proposed specification stabilizes again.

### Remove data: URL in SVGUseElement

Assigning a `data: URL` in `SVGUseElement` can cause XSS. And this also led to a Trusted Types bypass. Therefore, we plan to deprecate and remove support for it.


### Remove non-standard `shadowroot` attribute for declarative shadow DOM

The standards-track `shadowrootmode` attribute, which enables declarative Shadow DOM, was shipped in Chrome 111. The older, non-standard `shadowroot` attribute is being removed in Chrome 119. There is a straightforward migration path: replace `shadowroot` with `shadowrootmode`.
