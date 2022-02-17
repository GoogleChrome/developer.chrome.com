---
layout: 'layouts/doc-post.njk'
title: '<fencedframe>'
subhead: >
  The new Fenced frame API aims to embed content into a page in more privacy preserving way.
description: |
  The new Fenced frame API aims to embed content into a page in more privacy preserving way.
  This article introduces the API, and explains its usage.
authors:
  - jackjey
date: 2022-02-28
---

Fenced frame is a proposed new embedding API, which displays content similar to an iframe. However, a Fenced frame restricts communication with its embedder to allow access to unpartitioned data without leaking cross-site data.

```html
<fencedframe src="https://3rd.party.example">
  New API for privacy preserving way to embed content
</fencedframe>
```

## Strengthen cross-site privacy with storage partitioning

While browsing the web, you’ve probably seen products you were looking at on one site appear in an ad on a completely different site.

This is achieved primarily through tracking technology that uses third-party cookies to share information across sites, technology which [Chrome has committed to phase out](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/).

Currently, Chrome teams are working on [Storage Partitioning](https://github.com/privacycg/storage-partitioning). Storage Partitioning separates browser storage on a per-site basis, and it will be applied to the storage APIs including LocalStorage, IndexedDB, and cookies. In a partitioned world, information leakage across first-party storage won’t be possible, and many tracking related problems will be solved.

## What does Privacy Sandbox cover ?

The Privacy Sandbox initiative is both partitioning data by top-frame site as well as creating a series of proposals to satisfy cross-site use cases without third-party cookies or other tracking mechanisms. Examples include: [FLEDGE](/docs/privacy-sandbox/fledge/) which allows for interest-based ad serving in a privacy-preserving manner, [FedCM](https://github.com/fedidcg/FedCM) for secure Single Sign On, and [others](/docs/privacy-sandbox/overview/). Some Privacy Sandbox API proposals allow access to unpartitioned storage in a privacy-preserving way, while others satisfy specific use-cases without exposing first-party storage. Fenced frame is one of former works.

For example, let's take a look at the [FLEDGE](/docs/privacy-sandbox/fledge/) proposal.
With FLEDGE, a user's interests are registered on an advertiser's site in [interest groups](/docs/privacy-sandbox/fledge/#interest-group-detail), along with ads that may be of interest to the user. Then, on a publisher's site, the ads registered in an interest group are auctioned and the winning ads are displayed.

If the publisher's script takes the URL of the winning ad and sets it as the iframe's `src` attribute, the publisher can infer information about the visitor's interests from that ads URL. This is not privacy-preserving.

This use case, among others, is why we’ve proposed fenced frames.

## How fenced frames work

A fenced frame can fetch the results of the FLEDGE API ad auction and display the winning ad. The information retrieved from FLEDGE API isn’t the URL of the ads itself, but an [opaque source](https://github.com/shivanigithub/fenced-frame/blob/master/OpaqueSrc.md) (this specific proposal is a work in-progress, but the concept remains the same). This allows your site to display the ads without showing the URL to the publisher.

It's not enough to just be able to display ads. If the ad can postMessage to the publisher's site, like in an iframe, it can leak the content of the displayed ad. So unlike iframes, fenced frames don’t allow the [Messaging API](https://developer.mozilla.org/docs/Web/API/Window/postMessage). The Fenced Frame is isolated from the publisher page in other ways as well. For instance the publisher does not have access to the DOM inside of a fenced frame. Also, access to the attributes such as the `name` which can be set any value to and observed by the publisher are restricted.

In other words, fenced frames won’t replace iframes, instead they’re a more private frame that is used when data from different top-frame partitions needs to be displayed on the same page

## How will this API be used?

Fenced frames are used in combination with another API from The Privacy Sandbox to access unpartitioned data that is discussed now and proposed in the future.

Currently, the [TURTLEDOVE API](https://github.com/WICG/turtledove) family (which is the basis for FLEDGE), [Conversion Lift Measurement](https://github.com/w3c/web-advertising/blob/main/support_for_advertising_use_cases.md#conversion-lift-measurement) via [Shared Storage](https://github.com/pythagoraskitty/shared-storage) and unpartitioned storage access are candidates. For more details, refer to the [Explainer](https://github.com/shivanigithub/fenced-frame#use-caseskey-scenarios).

### Example usage

Embedded content inside the `<fencedframe>` is described by the `src` attribute.

```html
<fencedframe src="demo_fenced_frame.html"></fencedframe>
```

As mentioned, some APIs provide an Opaque URL, which look something like “urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a”, and can be used as a fenced frame src.

Also, a Fenced frame can't communicate with its parent element via the [Messaging API](https://developer.mozilla.org/docs/Web/API/Window/postMessage). However, it can use the Messaging API with iframes that are children of the Fenced frames. This makes the Fenced frames behave like a [top-level browsing context](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context) (such as a browser tab).

Browsers will set `Sec-Fetch-Dest: fencedframe` for requests made from Fenced frames and iframes that are embedded within a Fenced frame.

```http
Sec-Fetch-Dest: fencedframe
```

The server must set the `Supports-Loading-Mode: fenced-frame` response header for `demo_fenced_frame.html` to be embedded in a fenced frame.

```http
Supports-Loading-Mode: fenced-frame
```

For more details, review the [specifications](https://github.com/shivanigithub/fenced-frame).

## Try the Fenced Frame API

From Chrome 97, [use Chrome flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) to enable the Fenced Frame API from `chrome://flags/#enable-fenced-frames`.

{% Img src="image/PV7xjXdOKHP8LWt9XhstsToJeK82/AeU7fj1b3I9dfnqkDc6h.png", alt="In Chrome Experiments, set Enabled for the flag named Enable the Fenced frame element", width="800", height="211" %}

There are multiple choices in the dialog. In most cases, you should select **Enable**.

The other options, **Enabled with ShadowDOM** and **Enabled with multiple page architecture**, offer different implementation strategies which are only relevant to browser engineers. For now, **Enable** works in the same way as **Enabled with ShadowDOM**. In the future, the ShadowDOM option will map to **Enable with multiple page architecture**.

### Feature detection

```js
if (window.HTMLFencedFrameElement) {
  // Fenced Frame is enabled
}
```

## Feedback

The Fenced Frame proposal is under active discussion and subject to change in the future. If you try this API and have feedback, we'd love to hear it. Share your thoughts and engage in discussion by filing an issue on the [Fenced frame explainer](https://github.com/shivanigithub/fenced-frame).

_Header photo by [Gwengoat](https://www.istockphoto.com/portfolio/Gwengoat?mediatype=photography) on [iStockphoto](https://www.istockphoto.com/photo/private-property-sign-gm536675704-95052019)._
