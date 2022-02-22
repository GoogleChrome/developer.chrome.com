---
layout: 'layouts/doc-post.njk'
title: 'Fenced Frame'
subhead: >
  Embed content onto a page in a more privacy-preserving way.
description: |
  Embed content onto a page in a more privacy-preserving way. Learn about the Fenced Frame API and usage examples.
authors:
  - jackjey
date: 2022-02-28
---

## Implementation status

*  [Fenced Frame API proposal](https://github.com/shivanigithub/fenced-frame)
*  [Chrome Platform Status](https://chromestatus.com/feature/5699388062040064) 

## What is Fenced Frame?

The Fenced Frame API is a proposed new embedding API, which displays content
similar to an iframe. Unlike iframes, a fenced frame restricts communication
with its embedder to allow access to unpartitioned data without leaking
cross-site data.

```html
<fencedframe src="https://3rd.party.example">
  <!-- Content displayed, in a privacy-preserving manner. -->
</fencedframe>
```

## Strengthen cross-site privacy with storage partitioning

While browsing the web, you've probably looked at products on one site, and then
you've seen them appear again in an ad on a completely different site.

This advertising technique is achieved primarily through tracking technology
that uses third-party cookies to share information across sites. This is
technology which [Chrome has committed to phase
out](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/).

Currently, Chrome teams are working on [storage
partitioning](https://github.com/privacycg/storage-partitioning), which
separates browser storage on a per-site basis. Storage partitioning will be
applied to standard storage APIs including LocalStorage, IndexedDB, and cookies.
In a partitioned world, information leakage across first-party storage won't be
possible, and many tracking related problems will be solved.

## How does fenced frames work with The Privacy Sandbox initiative?

The Privacy Sandbox initiative suggests top-level sites should partition data. Many of the proposals aim to satisfy cross-site use cases without third-party cookies or other tracking mechanisms. For example: 

*  [FLEDGE](/docs/privacy-sandbox/fledge/) allows for interest-based ad serving
   in a privacy-preserving manner 
*  [FedCM](https://github.com/fedidcg/FedCM) for secure single sign-on (SSO)

Some Privacy Sandbox proposals allow access to unpartitioned storage with
privacy-preserving methods, while others satisfy specific use-cases without exposing first-party storage. Fenced frames are in the former category.

For example, let's take a look at the [FLEDGE](/docs/privacy-sandbox/fledge/)
proposal. With FLEDGE, a user's interests are registered on an advertiser's site in [interest groups](/docs/privacy-sandbox/fledge/#interest-group-detail), along with ads that may be of interest to the user. Then, on a separate site (known as a "publisher"), the ads registered in relevant interest groups are auctioned and the winning ad is displayed.

If the publisher displays the winning ad in an iframe and the script can read
the iframe's `src` attribute, the publisher can infer information about the
visitor's interests from that ads URL. This is not privacy-preserving.

This use case, among others, is why we've proposed fenced frames.

## How fenced frames work

A fenced frame will fetch the results of the FLEDGE API ad auction and display
the winning ad. The information retrieved from FLEDGE API isn't the URL of the
ads itself, but will be an [opaque
source](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/opaque_src.md)
(this specific proposal is a work in-progress, but the concept remains the
same). This will allow your site to display ads on a site without revealing the
ad source URL to the site owner.

It's not enough to just be able to display ads. If the ad can `postMessage` to
the publisher's site, like in an iframe, it would leak the content of the
displayed ad. So unlike iframes, fenced frames don't allow usage of the
[Messaging API](https://developer.mozilla.org/docs/Web/API/Window/postMessage)
to communicate with the top-level site.

Fenced frames will be isolated from the publisher in other ways as well. For
instance the publisher doesn't have access to the DOM inside of a fenced frame.
Further, access to the attributes such as `name`&mdash;which can be set any value to and observed by the publisher&mdash;are restricted.

Ultimately, fenced frames won't replace iframes. Instead they're proposed as a
more private frame for usage when data from different top-level partitions needs
to be displayed on the same page

## How will this API be used?

Fenced frames will work in partnership with another proposed API to access
unpartitioned data. Potential APIs are currently in discussion, but one contender
has not yet been proposed as the partner API.

Current candidates for this partnership include:

* From the [TURTLEDOVE API](https://github.com/WICG/turtledove) family (which is the basis for FLEDGE), fenced frames could work with [Conversion Lift Measurement](https://github.com/w3c/web-advertising/blob/main/support_for_advertising_use_cases.md#conversion-lift-measurement) using [Shared Storage](https://github.com/pythagoraskitty/shared-storage)
* Another option is to allow [fenced frames to access unpartitioned storage](https://github.com/shivanigithub/fenced-frame/blob/master/alternate_usecases_analysis/PrompltessUnpartitionedStorageAccess.md)

For more details, refer to the [Fenced Frame explainer](https://github.com/shivanigithub/fenced-frame#use-caseskey-scenarios).

### Example usage

Embedded content inside the `<fencedframe>` will be described by the `src`
attribute.

```html
<fencedframe src="demo_fenced_frame.html"></fencedframe>
```

Some APIs can provide an opaque URL, which looks something like
`"urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a"`, which could be used as a
fenced frame `src`.

Remember, a fenced frame can't communicate with its parent element with the
[Messaging API](https://developer.mozilla.org/docs/Web/API/Window/postMessage).
However, a fenced frame can use the Messaging API with iframes that are children
of the fenced frame. This means fenced frames behave like a [top-level browsing
context](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context) (such as a browser tab).

Browsers will set `Sec-Fetch-Dest: fencedframe` for requests made from Fenced frames and iframes that are embedded within a Fenced frame.

```http
Sec-Fetch-Dest: fencedframe
```

The server must set the `Supports-Loading-Mode: fenced-frame` response header for `demo_fenced_frame.html` to be embedded in a fenced frame.

```http
Supports-Loading-Mode: fenced-frame
```

For more details, review the [Fenced Frame API specifications](https://github.com/shivanigithub/fenced-frame).

## Try the Fenced Frame API

From Chrome 97, [use Chrome
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) to
enable the Fenced Frame API at `chrome://flags/#enable-fenced-frames`.

{% Img src="image/PV7xjXdOKHP8LWt9XhstsToJeK82/AeU7fj1b3I9dfnqkDc6h.png", alt="In Chrome Experiments, set Enabled for the flag named Enable the Fenced frame element", width="800", height="211" %}

There are multiple choices in the dialog. In most cases, you should select
**Enable**. The other options, **Enabled with ShadowDOM** and **Enabled with
multiple page architecture**, offer different implementation strategies which
are only relevant to browser engineers. For now, **Enable** works in the same way as **Enabled with ShadowDOM**. In the future, the ShadowDOM option will map to **Enable with multiple page architecture**.

### Feature detection

To determine if the Fenced Frame API is enabled:

```js
if (window.HTMLFencedFrameElement) {
  // Fenced Frame is enabled
}
```

## Engage and share feedback

The Fenced Frame proposal is under active discussion and subject to change in the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/shivanigithub/fenced-frame),[raise questions, and follow discussion](https://github.com/shivanigithub/fenced-frame/issues).
*  **Developer support**: Ask questions and join discussions on the
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

*  [Chrome Platform Status](https://chromestatus.com/feature/5699388062040064)
*  [Blink Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/m/URRsB-qvAAAJ)
