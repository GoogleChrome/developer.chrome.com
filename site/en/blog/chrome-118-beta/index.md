---
title: Chrome 118 beta
description: >
  Scoped styles for CSS, additional media features, keyboard-focusable scroll containers, and more.
subhead: >
  Scoped styles for CSS, additional media features, keyboard-focusable scroll containers, and more.
layout: 'layouts/blog-post.njk'
date: 2023-09-13
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/UXMAh3Kiswqs91x97YYG.png'
alt: >
  Chrome 118 beta hero logo
tags:
  - beta
  - chrome-118
---

Unless otherwise noted, changes described below apply to the newest Chrome beta channel release for Android, ChromeOS, Linux, macOS, and Windows. Learn more about the features listed here through the provided links or from the list on ChromeStatus.com. Chrome 118 is beta as of September 13, 2023. You can download the latest on [Google.com](https://www.google.com/chrome/beta/) for desktop or on Google Play Store on Android.

## CSS

This release adds four new CSS features.

### Scoped styles

The `@scope` rule allows developers to [scope style rules](https://drafts.csswg.org/css-cascade-6/#scoped-styles) to a given scoping root, and style elements according to the proximity of that scoping root.

### CSS logical flow-relative values

Adds the following new values to existing CSS properties: 

`float: inline-start`
`float: inline-end` 
`clear: inline-start`
`clear: inline-end`
`resize: block`
`resize: inline` 

These flow-relative directional keywords resolve to a physical value depending on the writing mode or direction of the element or its containing block. 

### Media Queries: prefers-reduced-transparency feature

Adds the [`prefers-reduced-transparency` media feature](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-transparency), which lets developers adapt web content to user-selected preference for reduced transparency in the OS, such as the **Reduce transparency** setting on macOS. Valid options are `reduce` or `no-preference`.


### Support stroke-box, content-box, and border-box in the transform-box CSS property

Adding this support enables changing how the reference box for the [`transform`](https://developer.mozilla.org/docs/Web/CSS/transform) property is computed. This enables additional transforms or graphical effects. For example, rotation around a point in the content box, where the width of the border of an element does not influence the result. Or, where the stroke of an (SVG) element should influence the result, for example, when rotating a stroked shape around its center—including the stroke.

## HTML

### Keyboard-focusable scroll containers

Improves accessibility by making scroll containers focusable using sequential focus navigation. Before this change, the tab key doesn't focus scrollers unless `tabIndex` is explicitly set to `0` or greater. By making scrollers focusable by default, users who can't (or don't want to) use a mouse will be able to access clipped content using a keyboard's tab and arrow keys. This behavior does not apply to scrollers that contain keyboard focusable elements, since those are already accessible via the keyboard.

### Remove quirks mode behavior for option label attribute

Option elements support a [`label` attribute](https://developer.mozilla.org/docs/Web/HTML/Element/option#label) which causes the option to render with the text inside the attribute rather than the child text of the option element itself. This functionality is disabled in quirks mode, where the label attribute is ignored and the child text is always rendered. This change will always use the label attribute in both standards mode and quirks mode.


## Web APIs

### Enrollment for Privacy Sandbox (PSB)

As the [Privacy Sandbox](https://privacysandbox.com/) relevance and measurement APIs start ramping up for general availability, we want to make sure these technologies are used as intended and with transparency. The APIs include [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/), the [Protected Audience API](/docs/privacy-sandbox/protected-audience/), the [Topics API](/docs/privacy-sandbox/topics/overview/), the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) and the [Shared Storage API](/docs/privacy-sandbox/shared-storage/). PSB is introducing a new Developer Enrollment process for Privacy Sandbox relevance and measurement APIs. Chrome will fetch the enrolled-sites list from the enrollment server (via component updater) and use it to gate access to the Privacy Sandbox APIs.

### Block all cookies set via JavaScript that contain control characters

Updates how control characters in cookies set via JavaScript are handled. Specifically, all control characters cause the entire cookie to be rejected. Previously, a NULL character, a carriage return character, or a line feed character in a cookie line caused it to be truncated instead of rejected entirely, which could have enabled malicious behavior in certain circumstances. This behavior aligns Chrome with the behavior indicated by the latest drafts of RFC6265bis. This change can be disabled using the `--disable-features=BlockTruncatedCookies` or the BlockTruncatedCookies enterprise policy, which will exist for several milestones in case this change causes any breakage.

### Consistent minimum font size across languages

Changes the default setting for the ***Minimum font size*** to be off by default for seven languages (Arabic, Farsi, Japanese, Korean, Thai, Simplified and Traditional Chinese) to improve interoperability and accessibility. Before this change, this setting was off by default for all languages except the seven languages listed. This change makes these languages consistent with other languages. Note, this is not about changing the minimum font size feature itself. It will be available without any changes for accessibility and readability.

### Detect UA transitions on same-document navigations

Smooth visual transitions as users navigate on the web can lower cognitive load by helping users stay in context. However, the user experience is bad if both the site author and the UA add these transitions: the transitions may conflict and cause confusion for the user. This API avoids such cases to ensure only one visual transition is executed at a time. The API adds a boolean on `PopStateEvent` and `NavigateEvent` to indicate whether the UA has executed a visual transition for this navigation. Developers can use this to skip their custom transition.

### URL parser will not decode percent-encoded ASCII characters in URL's path

This changes makes the URL parser not decode percent-encoded ASCII characters in the URL's path, such as "%41" ('A'). Before this change: 

```js
const url = new URL("http://example.com/%41");
url.href "http://example.com/A" 
```

After this change: 

```js
const url = new URL("http://example.com/%41"); 
url.href "http://example.com/%41"
```

### Protected Audiences negative targeting

In online ad auctions for ad space, it's sometimes useful to prevent showing an ad to certain audiences, a concept known as _negative targeting_. For example, you might not want to show a new customer advertisement to existing customers. New customer acquisition campaigns most often have this as a critical requirement. Protected Audience currently enables ads to target users that have been joined to a given interest group through some past activity on the web. This feature extends Protected Audience to enable negative targeting by allowing new ads to target only those users who have not been joined to a given interest group. In this way, we're enabling advertisers to target new groups of users using the existing privacy-preserving concepts of the Protected Audience API. 

### Remove payment user activation requirement

To help developers reduce friction in Payment Request flows, we are removing the user activation requirement in Payment Request and Secure Payment Confirmation. Spam and clickjacking mitigations are put in place to mitigate security and privacy risks with this change. 

### WebUSB in Extension Service Workers

Allows web developers to use the [WebUSB API](https://developer.mozilla.org/docs/Web/API/WebUSB_API) when responding to extension events by exposing the WebUSB API to Service Workers registered by browser extensions. This API is not currently exposed to Service Workers registered by sites. 

### XML documents merge consecutive CDATA sections into single node

Due to a bug in libxml, CDATA sections in an XHTML document can sometimes erroneously produce multiple nodes, depending on the size of the document and the position of the CDATA section in the document. When a single CDATA section spans multiple input parser chunks, libxml buffers and emits the CDATA input into 300 byte runs. This unexpectedly turns a single CDATA section into multiple nodes (if the length of the input chunk is greater than 300 bytes). This change causes sibling CDATA section nodes to be merged into a single CDATA section during parsing. This fixes the libxml bug during parsing but will also merge authored separate nodes, for example: `<![CDATA[foo]]><!CDATA[bar]]>` Will produce a single CDATA DOM node with content `"foobar": CDATA "foobar"`.

### Change beforeunload handler dialog condition

There are two new changes on how the cancel dialog gets prompted for the `beforeunload` event.

If `event.preventDefault()` is called, prompt cancel dialog.
If `event.returnValue` is the empty string, do not prompt cancel dialog.

## Origin trials in progress

In Chrome 118 you can opt into the following new [origin trial](/docs/web-platform/origin-trials/). 

### WebRTC encoded transform: modify metadata functions

Adds features to the WebRTC Encoded Transform API that allow manipulating audio and video frame metadata. A number of use cases have been identified that require the manipulation of WebRTC encoded media without decoding them first. These include: 

- Sending data that has been encoded previously.
- Sending data that has been received in encoded form. 
- Receiving data in encoded form and forwarding it. 

In particular, we want to support the use case of glitch-free forwarding of media coming from multiple redundant peer connections that provide the same media payloads but with different metadata.

Register for the [RTCEncodedFrameSetMetadata origin trial](/origintrials/#/register_trial/1097752409171558401). 

## Deprecations and removals

This version of Chrome introduces the deprecations and removals listed below. Visit ChromeStatus.com for lists of planned deprecations, current deprecations and previous removals.

This release of Chrome removes the following feature.

### Removal of some non-standard appearance keywords

In Chrome 118, the non-standard [`appearance`](https://developer.mozilla.org/docs/Web/CSS/appearance) keywords with the lowest usage will be deactivated. Once the feature is deactivated, the appearance property will be ignored if it uses that keyword as a value. The keywords being deactivated in Chrome 118 are those with less than 0.001% usage:

* `media-slider`
* `media-sliderthumb` 
* `media-volume-slider`
* `media-volume-sliderthumb`
* `sliderthumb-horizontal`
* `sliderthumb-vertical`

#### Background

Since only standard [`appearance`](https://developer.mozilla.org/docs/Web/CSS/appearance) keywords should be supported, we are removing the `appearance` (and `-webkit-appearance`) keywords that are non-standard. The full list is as follows:

* `inner-spin-button`
* `media-slider`
* `media-sliderthumb`
* `media-volume-slider`
* `media-volume-sliderthumb`
* `push-button`
* `searchfield-cancel-button`
* `slider-horizontal`
* `sliderthumb-horizontal`
* `sliderthumb-vertical`
* `square-button`

Note that value `slider-vertical` will not be removed as part of this
patch it is used for allowing `<input type=range>` vertical. It will be
removed once [form controls vertical writing mode](https://chromestatus.com/feature/5602118873907200) is fully adopted.

Prior to being deactivated, if using any of the above keywords, a console warning will be shown, but the keyword will be recognized as a valid value.
