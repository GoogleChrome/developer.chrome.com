---
layout: 'layouts/doc-post.njk'
title: 'Fenced frames'
subhead: >
  Securely embed content onto a page without sharing cross-site data.
description: |
  Securely embed content onto a page without sharing cross-site data.
authors:
  - jackjey
  - alexandrawhite
  - kevinkiklee
date: 2022-03-07
updated: 2022-05-10
---

## Implementation status

This document outlines a proposal for a new HTML element: `<fencedframe>`.

*  Experiment with fenced frames in the [Privacy Sandbox unified origin trial](/origintrials/#/view_trial/771241436187197441) from M102 to M107. Learn how to [set up the origin trial](/blog/privacy-sandbox-unified-origin-trial/) and [join us for a feedback/discussion](https://github.com/WICG/fenced-frame/issues).
*  [Fenced frames proposal](https://github.com/shivanigithub/fenced-frame)
*  [Chrome Platform Status](https://chromestatus.com/feature/5699388062040064) 
*  This feature is [available behind a Chrome flag](#try-fenced-frames).
*  [The Privacy Sandbox
   timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
   provides implementation timings for fenced frames and other proposals.

## Why do we need fenced frames?

A fenced frame (`<fencedframe>`) is a proposed HTML element for embedded
content, similar to an iframe. Unlike iframes, a fenced frame restricts
communication with its embedding context to allow the frame access to cross-site
data without sharing it with the embedding context. Some Privacy Sandbox APIs
may [require select documents to render within a fenced frame](#use-cases).

Similarly, any first-party data in the embedding context cannot be shared with
the fenced frame.

```html
<fencedframe src="https://3rd.party.example"></fencedframe>
```

For example, let's say `news.example` (the embedding context) embeds an ad from
`shoes.example` in a fenced frame. `news.example` cannot exfiltrate data from
the `shoes.example` ad, and `shoes.example` cannot learn first-party data from
`news.example`.

### Strengthen cross-site privacy with storage partitioning

While browsing the web, you've probably looked at products on one site, and then 
you've seen them appear again in an ad on a completely different site.

Today, this advertising technique is achieved primarily through tracking 
technology that uses third-party cookies to share information across sites. This 
is technology which [Chrome has committed to phase 
out](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/)
and replace with more privacy-preserving variants.

Chrome is working on [storage
partitioning](https://github.com/privacycg/storage-partitioning), which
separates browser storage per-site. Currently, if an iframe from `shoes.example`
is embedded on `news.example`, and that iframe stores a value into storage,
then that value can be read from the `shoes.example` site. When storage has been
partitioned, cross-site iframes will no longer share storage, therefore
`shoes.example` will not be able to access information stored by the iframe. If
the iframe is served from `*.shoes.example` and embedded on
`*.shoes.example`, browser storage will be shared as these are considered [same-site](https://web.dev/same-site-same-origin/). 

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/ss7wjBshEJcwdQXcXGov.png", alt="A comparison of before and after state of storage partitinoing.", width="800", height="613" %}

Storage partitioning will be applied to standard storage APIs including
LocalStorage, IndexedDB, and cookies. In a partitioned world, information
leakage across first-party storage will be significantly reduced.

### Work with cross-site data {: #cross-site-data }

Fenced frames is a [Privacy Sandbox proposal](/docs/privacy-sandbox/overview/)
which suggests top-level sites should partition data. Many Privacy Sandbox
proposals aim to satisfy cross-site use cases without third-party cookies or
other tracking mechanisms. For example:

*  [FLEDGE](/docs/privacy-sandbox/fledge/) allows for interest-based ad serving
   in a privacy-preserving manner.
*  [Shared Storage](https://github.com/pythagoraskitty/shared-storage) allows
   access to unpartitioned cross-site data in a secure environment.

Let's consider how fenced frames could work with the
[FLEDGE](/docs/privacy-sandbox/fledge/) proposal. With FLEDGE, a user's interests
are registered on an advertiser's site in [interest
groups](/docs/privacy-sandbox/fledge/#interest-group-detail), along with ads that
may be of interest to the user. Then, on a separate site (known as a
"publisher"), the ads registered in relevant interest groups are auctioned and
the winning ad is displayed in a fenced frame.

If the publisher displays the winning ad in an iframe and the script can read the
iframe's `src` attribute, the publisher can infer information about the visitor's
interests from that ad's URL. This is not privacy-preserving.

With a fenced frame, the publisher could display an ad which matches visitor
interests, but the `src` and interest group will be known only to the advertiser
in the frame. The publisher could not access this information.

## How do fenced frames work?

A fenced frame will be created from the winner of the FLEDGE API ad auction. The
information retrieved from FLEDGE API isn't the URL of the ads itself, but will
be an [opaque
source](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/opaque_src.md).

{% Aside 'key-term' %}
An _opaque source_ is represented by a [Uniform Resource Name (URN) for
UUIDs](https://datatracker.ietf.org/doc/html/rfc4122). So, instead of
`http://example.com` (a URL), an opaque source is represented as
`urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a`. URN schemes are persistent,
location-independent identifiers, which means they cannot be used to locate a
resource (such as an ad creative).
{% endAside %}

Opaque sources allow your site to display ads on a site without revealing the ad
source URL to the site owner.

It's not enough to just be able to display ads. If the ad can `postMessage` to
the publisher's site, like in an iframe, it may leak the content of the
displayed ad. So unlike iframes, fenced frames don't allow usage of the
[postMessage](https://developer.mozilla.org/docs/Web/API/Window/postMessage) to
communicate with the top-level site.

Fenced frames will be isolated from the publisher in other ways. For instance
the publisher won't have access to the DOM inside of a fenced frame, and the
fenced frame cannot access the publisher's DOM. Further, attributes such as
`name`&mdash;which can be set to any value to and observed by the
publisher&mdash;aren't available in fenced frames.

Fenced frames behave like a [top-level browsing
context](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context)
(such as a browser tab). Although a fenced frame in [certain modes](https://github.com/WICG/fenced-frame/blob/master/explainer/modes.md#fenced-frame-modes)
(such as `opaque-ads`) can contain cross-site data (such as a FLEDGE interest
group), the frame cannot access unpartitioned storage or cookies. An
`opaque-ads` fenced frame can access a unique, nonce-based cookie and storage
partition.

The characteristics of fenced frames are further detailed in the
[explainer](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/README.md).

### How do fenced frames compare to iframes? {: #compare }

Now that you know what fenced frames will and won't do, it's useful to compare
to existing iframe features.


<table class="with-heading-tint">
     <thead>
    <tr>
      <th>Feature </th>
      <th><code>iframe</code></th>
      <th><code>fencedframe</code></th>
    </tr></thead>
      <tbody>
    <tr>
      <td>Embed content</td>
      <td>Yes</td>
      <td>Yes</td>
   </tr>
   <tr>
      <td>Embedded content can access embedding context DOM</td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>Embedding context can access embedded content DOM</td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>Observable attributes, such as <code>name</code></td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>URLs (<code>http://example.com</code>) </td>
      <td>Yes</td>
      <td>Yes (<a href="https://github.com/WICG/fenced-frame/blob/master/explainer/modes.md">mode-dependent</a>)</td>
   </tr>
   <tr>
      <td>Browser-managed opaque source (<code>urn:uuid</code>)</td>
      <td>No</td>
      <td>Yes</td>
   </tr>
   <tr>
      <td>Access to cross-site data </td>
      <td>No</td>
      <td>Yes (mode-dependent)</td>
   </tr>
</tbody></table>
  

Fenced frames support fewer external communication options to preserve privacy.

### Will fenced frames replace iframes?

Ultimately, fenced frames won't replace iframes and you won't have to use them.
Fenced frames are proposed for a more private frame for usage when data from
different top-level partitions needs to be displayed on the same page.

Same-site iframes (sometimes known as friendly iframes) are considered trusted
content.

## Use fenced frames {: #use-cases }

Fenced frames will work in combination with other Privacy Sandbox proposals to
display documents from different storage partitions within a single page.
Potential APIs are currently in discussion.

Current candidates for this combination include:

* From the [TURTLEDOVE API](https://github.com/WICG/turtledove) family (which is
   the basis for FLEDGE), fenced frames could work with [Conversion Lift
   Measurement](https://github.com/w3c/web-advertising/blob/main/support_for_advertising_use_cases.md#conversion-lift-measurement)
   using [Shared Storage](https://github.com/pythagoraskitty/shared-storage).
* Another option is to allow fenced frames to be
   [read-only](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#read-only)
   or [access unpartitioned
   storage](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#unpartitioned-storage).


For more details, refer to the [Fenced Frames
explainer](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md).


### Examples

Embedded content inside the `<fencedframe>` will be described by the `src`
attribute.

```html
<fencedframe src="demo_fenced_frame.html"></fencedframe>
```

Browsers may generate an opaque URL for the fenced frame `src`, as requested by
certain use case APIs. For example, if a FLEDGE ad auction is run, the browser
can generate an `urn:uuid` which maps back to the URL for the winning ad
creative. That `urn:uuid` could then be used in a fenced frame to display the
winning ad.

```html
<fencedframe src="urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a" mode="opaque-ads" ></fencedframe>
```

Remember, a fenced frame can't use `postMessage` to communicate with its parent
element. However, a fenced frame can use `postMessage` with iframes that are
children of the fenced frame, because fenced frames behave like top-level
browsing contexts.

Browsers will set `Sec-Fetch-Dest: fencedframe` for requests made from fenced
frames and iframes that are embedded within a fenced frame.

```http
Sec-Fetch-Dest: fencedframe
```

#### Server opt-in

The server must set the `Supports-Loading-Mode: fenced-frame` response header
for a document to be loaded in a fenced frame. The header must be present for
any iframes inside of a fenced frame, as well.

```http
Supports-Loading-Mode: fenced-frame
```

## Try fenced frames

[Use Chrome
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) to
enable the Fenced Frame API at `chrome://flags/#enable-fenced-frames`.

{% Img
   src="image/PV7xjXdOKHP8LWt9XhstsToJeK82/AeU7fj1b3I9dfnqkDc6h.png",
   alt="In Chrome Experiments, set Enabled for the flag named Enable the Fenced frame element",
   width="800",
   height="211"
%}

There are multiple choices in the dialog. We strongly recommend you select
****Enable****, which allows Chrome to automatically update to new architecture
as it becomes available.

The other options, **Enabled with ShadowDOM** and **Enabled with multiple
page architecture**, offer different implementation strategies which are only
relevant to browser engineers. Today, **Enable** works in the same way as
**Enabled with ShadowDOM**. In the future, **Enable** will map to **Enable with
multiple page architecture**.

### Feature detection

To determine if fenced frames are defined:

```js
if (window.HTMLFencedFrameElement) {
  // The fenced frame element is defined
}
```

### Browser support

The `<fencedframe>` element is still in experimental mode, so it is currently
supported from Chrome 97 onwards. At this time, it's [not supported by other
browsers](https://chromestatus.com/feature/5699388062040064#consensus).

## Engage and share feedback

The Fenced Frame proposal is under active discussion and subject to change in
the future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/shivanigithub/fenced-frame), 
   [raise questions, and follow 
   discussion](https://github.com/shivanigithub/fenced-frame/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support 
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

*  [Chrome Platform Status](https://chromestatus.com/feature/5699388062040064)
*  [Blink Intent to 
   Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/m/URRsB-qvAAAJ)
