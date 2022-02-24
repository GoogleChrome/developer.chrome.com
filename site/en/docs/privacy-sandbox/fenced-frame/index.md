---
layout: 'layouts/doc-post.njk'
title: 'Fenced Frame'
subhead: >
  Securely embed content onto a page without sharing cross-site data.
description: |
  Securely embed content onto a page without sharing cross-site data. Learn about the Fenced Frame HTML element and usage examples.
authors:
  - jackjey
  - alexandrawhite
date: 2022-02-28
---

## Implementation status

*  [Fenced Frame proposal](https://github.com/shivanigithub/fenced-frame)
*  [Chrome Platform Status](https://chromestatus.com/feature/5699388062040064) 

## What is Fenced frame?

Fenced frame (`<fencedframe>`) is a proposed  HTML element for embedded content, 
similar to an iframe. Unlike iframes, a fenced frame restricts communication 
with its embedding context to allow access to cross-site data without it being 
shared with the embedding context. Similarly, any first-party data in the 
embedding page cannot be shared with the fenced frame.

```html
<fencedframe src="https://3rd.party.example">
  <!-- Content displayed, in a privacy-preserving manner. -->
</fencedframe>
```

## Strengthen cross-site privacy with storage partitioning

While browsing the web, you've probably looked at products on one site, and then
you've seen them appear again in an ad on a completely different site.

Today, this advertising technique is achieved primarily through tracking 
technology that uses third-party cookies to share information across sites. This 
is technology which [Chrome has committed to phase
out](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/) and replace with more privacy-preserving variants.

Currently, Chrome teams are working on [storage
partitioning](https://github.com/privacycg/storage-partitioning), which
separates browser storage [per-site](https://web.dev/same-site-same-origin/).
This means sites with the same eTLD+1, such as `http://example.com` and
`http://this.example.com`, could share browser storage. Sites that share the 
same port but have different hostnames, like `http://example.com:443` and 
`http://this.com:443`, won’t share browser storage.

Storage partitioning will be applied to standard storage APIs including 
LocalStorage, IndexedDB, and cookies. In a partitioned world, information 
leakage across first-party storage will be significantly reduced.

### How do fenced frames work with cross-ste data?

The fenced frame element is a [Privacy Sandbox 
proposal](/docs/privacy-sandbox/overview/) which suggests top-level sites should 
partition data. Many of the Privacy Sandbox proposals aim to satisfy cross-site 
use cases without third-party cookies or other tracking mechanisms. For example: 

*  [FLEDGE](/docs/privacy-sandbox/fledge/) allows for interest-based ad serving
   in a privacy-preserving manner.
*  [FedCM](https://github.com/fedidcg/FedCM) for secure single sign-on (SSO).

For example, let's consider how fenced frames could work with the 
[FLEDGE](/docs/privacy-sandbox/fledge/) proposal. With FLEDGE, a user's 
interests are registered on an advertiser's site in [interest 
groups](/docs/privacy-sandbox/fledge/#interest-group-detail), along with ads 
that may be of interest to the user. Then, on a separate site (known as a 
"publisher"), the ads registered in relevant interest groups are auctioned and 
the winning ad is displayed in a fenced frame.

If the publisher displays the winning ad in an iframe and the script can read 
the iframe's `src` attribute, the publisher can infer information about the 
visitor's interests from that ad's URL. This is not privacy-preserving.

With a fenced frame, the publisher could display an ad which matches visitor 
interests, but the `src` and interest group will be known only to the 
advertiser. The publisher could not access this information.

## How fenced frames work

A fenced frame will fetch the results of the FLEDGE API ad auction and display
the winning ad. The information retrieved from FLEDGE API isn't the URL of the
ads itself, but will be an [opaque
source](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/opaque_src.md)
(this specific proposal is a work in-progress).

{% Aside 'key-term' %}
An _opaque source_ is represented by a [Uniform Resource Name (URN) for 
UUIDs](https://datatracker.ietf.org/doc/html/rfc4122). So, instead of 
`http://example.com` (a URL), an opaque source is represented as 
`urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a`. URN schemes are persistent, 
location-independent identifiers, which means they cannot be used to locate a 
resource (such as an ad creative).
{% endAside %}

Opaque sources will allow your site to display ads on a site without revealing 
the ad source URL to the site owner.

It's not enough to just be able to display ads. If the ad can `postMessage` to
the publisher's site, like in an iframe, it may leak the content of the
displayed ad. So unlike iframes, fenced frames don't allow usage of the
[`postMessage`](https://developer.mozilla.org/docs/Web/API/Window/postMessage)
to communicate with the top-level site.

Fenced frames will be isolated from the publisher in other ways as well. For
instance the publisher doesn't have access to the DOM inside of a fenced frame, 
and the fenced frame cannot access the publisher’s DOM. Further, access to the 
attributes such as `name`&mdash;which can be set any value to and observed by 
the publisher&mdash;are restricted.

Fenced frames behave like a [top-level browsing
context](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context)
(such as a browser tab).

### How do fenced frames compare to iframes?

Now that you know what fenced frames will and won’t do, it’s useful to compare to existing iframe features. 

| Feature | iframe | Fenced frame |
| ----------- | ----------- | ----------- |
| Embed content | Yes | Yes |
| Embedded content can access embedding context DOM | Yes | No |
| Embedding context can access embedded content DOM | Yes | No | 
| Access to `name` | Yes | No |
| URLs (`http://example.com`) | Yes | No |
| Opaque source (`urn:uuid`) | No | Yes |
| Access to unpartitioned storage | No | Yes |

Fenced frames elect to support fewer features than iframes, as a way of 
preserving privacy.

### Will fenced frames replace iframes?

Ultimately, fenced frames won't replace iframes. Instead they're proposed as a
more private frame for usage when data from different top-level partitions needs
to be displayed on the same page.

Friendly iframes, iframes which share the same source as the top-level page, are 
considered trusted content and may value shared communication with the Messaging 
API.

## How will the Fenced Frame API be used?

Fenced frames will work in combination with other Privacy Sandbox proposal to 
access unpartitioned data. Potential APIs are currently in discussion.

Current candidates for this combination. include:

* From the [TURTLEDOVE API](https://github.com/WICG/turtledove) family (which is the basis for FLEDGE), fenced frames could work with [Conversion Lift Measurement](https://github.com/w3c/web-advertising/blob/main/support_for_advertising_use_cases.md#conversion-lift-measurement) using [Shared Storage](https://github.com/pythagoraskitty/shared-storage)
* Another option is to allow fenced frames  to be 
  [read-only](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#read-only)
  or to [access unpartitioned 
  storage](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#unpartitioned-storage)

For more details, refer to the [Fenced Frame explainer](https://github.com/shivanigithub/fenced-frame#use-caseskey-scenarios).

### Example usage

Embedded content inside the `<fencedframe>` will be described by the `src`
attribute.

```html
<fencedframe src="demo_fenced_frame.html" mode="opaque-ads"></fencedframe>
```

Browsers may generate an opaque URL for the fenced frame `src`, as requested by 
certain use case API. For example, if a FLEDGE ad auction is run, the browser 
can generate an `urn:uuid` which maps back to the URL for the winning ad 
creative. That `urn:uuid` could then be used in a fenced frame to display the 
winning ad.

```html
<fencedframe src="urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a"></fencedframe>
```

Remember, a fenced frame can't communicate with its parent element with the
[`postMessage`](https://developer.mozilla.org/docs/Web/API/Window/postMessage).
However, a fenced frame can use the postMessage with iframes that are children
of the fenced frame. This means fenced frames behave like a [top-level browsing
context](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context)
(such as a browser tab).

Browsers will set `Sec-Fetch-Dest: fencedframe` for requests made from fenced frames and iframes that are embedded within a fenced frame.

```http
Sec-Fetch-Dest: fencedframe
```

#### Server opt-in

The server must set the `Supports-Loading-Mode: fenced-frame` response header
for `demo_fenced_frame.html` to be embedded in a fenced frame.

```http
Supports-Loading-Mode: fenced-frame
```

For more details, review the [Fenced Frame API
specifications](https://github.com/shivanigithub/fenced-frame).

## Browser support

The `<fencedframe>` element is still in  experimental mode, so it is currently 
supported from Chrome 97 onwards. At this time, it is not supported by other 
browsers.

### Try the Fenced Frame API

[Use Chrome
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) to
enable the Fenced Frame API at `chrome://flags/#enable-fenced-frames`.

{% Img src="image/PV7xjXdOKHP8LWt9XhstsToJeK82/AeU7fj1b3I9dfnqkDc6h.png", alt="In Chrome Experiments, set Enabled for the flag named Enable the Fenced frame element", width="800", height="211" %}

There are multiple choices in the dialog. In most cases, you should select
**Enable**.

The other options, **Enabled with ShadowDOM** and **Enabled with
multiple page architecture**, offer different implementation strategies which
are only relevant to browser engineers. For now, **Enable** works in the same way as **Enabled with ShadowDOM**. In the future, **Enable** will map to **Enable with multiple page architecture**.

### Feature detection

To determine if fenced frames are enabled:

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
