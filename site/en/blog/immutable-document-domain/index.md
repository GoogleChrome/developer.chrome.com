---
layout: 'layouts/blog-post.njk'
title: "Chrome will disable modifying `document.domain` to relax the same-origin policy"
description: >
  If your website relies on setting `document.domain`, your action is required.
subhead: >
  If your website relies on setting `document.domain`, your action is required.
date: 2022-01-11
updated: 2023-04-07
is_outdated: true
new_available_content_url: /blog/document-domain-setter-deprecation
authors:
  - agektmr
tags:
  - security
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/grGMzuhOjsGhN150dONe.jpg'
alt: >
  A dog in disguise.

---

**Updates**

- **May 30, 2023**: we've [announced](/blog/document-domain-setter-deprecation) that
  the deprecation of `document.domain` setter will be effective in Chrome 115.
- **April 7, 2023**: We've identified [an issue](https://crbug.com/1429587)
  before shipping this change in Chrome 112. `document.domain` setter to be
  removed by default is currently suspended and the new shipping milestone is
  not determined yet. Please check back on this blog post or subscribe to
  [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/) and [this
  thread](https://groups.google.com/a/chromium.org/g/blink-dev/c/nrLl0IxSxSI/).
- **January 20, 2023**: Updated timeline—`document.domain` setter will be
  removed by default starting from Chrome 112. Also, [a mention about enterprise
  policy](#enterprise-policy) to control the `document.domain` behavior is
  added.
- **July 25, 2022**: Updated timeline—`document.domain` setter will be removed
  by default starting from Chrome 109.
- **February 4, 2022**: Updated with the new timeline - we'll show a warning in
  the Issues panel starting from Chrome 100, removing `document.domain` setter
  by default starting from Chrome 106.

{% Aside 'warning' %}

If your website relies on relaxing the same-origin policy via `document.domain`,
your action is required. Continue to read more about why this is changing or
skip to [alternative code for cross-origin
communication](#alternative-cross-origin-communication)

{% endAside %}

[`document.domain`](https://developer.mozilla.org/docs/Web/API/Document/domain)
was designed to get or set the origin's hostname.

On Chrome, websites will be unable to set `document.domain`. You will need to
use alternative approaches, such as `postMessage()` or the Channel Messaging
API, to communicate cross-origin. We're targeting Chrome 112 to ship this change
at the earliest, but this is dependent on the response to the [Intent to
Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/_oRc19PjpFo/).

If your website relies on same-origin policy relaxation via `document.domain`
to function correctly, the site will need to send an `Origin-Agent-Cluster: ?0`
header, as will all other documents that require that behavior (note that
`document.domain` has no effect if only one document sets it).

## Why make `document.domain` immutable?

Many websites set `document.domain` to allow communication between [same-site
but cross-origin](https://web.dev/same-site-same-origin/) pages. 

{% Aside 'key-term' %}

Same-site but cross-origin sites have the same
[eTLD+1](https://web.dev/same-site-same-origin/#:~:text=the%20whole%20site%20name%20is%20known%20as%20the%20etld%2B1)
but different subdomains.

{% endAside %}

Here's how it's used:

Let's say a page on `https://parent.example.com` embeds an iframe page from
`https://video.example.com`. These pages have the same eTLD+1 (`example.com`)
with different subdomains. When both pages' `document.domain` is set to
`'example.com'`, the browser treats the two origins as if they are same-origin.

Set the `document.domain` for `https://parent.example.com`:

```js
// Confirm the current origin of "parent.example.com"
console.log(document.domain);

// Set the document.domain
document.domain = 'example.com';
console.log(document.domain);
```

Set the `document.domain` for `https://video.example.com`:

```js
// Confirm the current origin of "video.example.com"
console.log(document.domain);

// Set the document.domain
document.domain = 'example.com';
console.log(document.domain);
```

You could now create a cross-origin DOM manipulation on
`https://parent.example.com` against `https://video.example.com`.

Websites set `document.domain` to make it possible for same-site documents to
communicate more easily. Because this change [relaxes the same-origin
policy](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction),
the parent page is able to access the iframe's document and traverse the
DOM tree, and vice versa.

This is a convenient technique, however it introduces a security risk.

### Security concerns with `document.domain`

Security concerns around `document.domain` have led to a change in the
[specification that warns users to avoid using
it](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction).
The [current discussion with other browser
vendors](https://github.com/w3ctag/design-reviews/issues/564) is moving in
the same direction.

For example, when two pages set `document.domain`, they can pretend as if they
are the same-origin. This is particularly critical when these pages use a shared
hosting service with different subdomains. Setting `document.domain` opens up
access to all other sites hosted by that same service, which makes it easier for
attackers to access your sites. This is possible because `document.domain`
ignores the port number part of the domain.

To learn more about the security implications of setting `document.domain`, read
["Document.domain" page on
MDN](https://developer.mozilla.org/docs/Web/API/Document/domain#setter).

Chrome plans to make `document.domain` immutable in Chrome 112.

### How do I know if my site is affected?

If your website is affected by this change, Chrome will warn in the DevTools
Issues panel. Notice the yellow flag at the top right corner.

<figure class="w-figcaption">
{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/OPEFWOBPMZHmj32aVq2I.png", alt="When document.domain is modified, a warning is displayed in the Issues
panel.", width="800", height="472" %}
<figcaption>When document.domain is modified, a warning is displayed in the Issues panel.</figcaption>
</figure>

If you have a reporting endpoint set up, you will also be sent deprecation
reports. Learn more about [how to use the Reporting
API](https://web.dev/reporting-api/) with either existing report collection
services or by building your own in-house solution.

You can run your site through the [LightHouse deprecated API
audit](https://web.dev/deprecations/) to find all APIs that are scheduled to
be removed from Chrome.

## Alternative cross-origin communication

At this time, you have three options to replace `document.domain` for your website.

### Use `postMessage()` or Channel Messaging API

In most use cases, cross-origin 
[`postMessage()`](https://developer.mozilla.org/docs/Web/API/Window/postMessage)
or [Channel Messaging API](https://developer.mozilla.org/docs/Web/API/Channel_Messaging_API)
can replace `document.domain`.

In the following example:

1. `https://parent.example.com` requests `https://video.example.com` within an
   iframe to manipulate DOM by sending a message via `postMessage()`.
2. `https://video.example.com` manipulates DOM as soon as it receives the
   message and notify the success back to the parent.
3. `https://parent.example.com` acknowledges the success.

On `https://parent.example.com`:

```js
// Send a message to https://video.example.com
iframe.postMessage('Request DOM manipulation', 'https://video.example.com');

// Receive messages
iframe.addEventListener('message', (event) => {
  // Reject all messages except ones from https://video.example.com
  if (event.origin !== 'https://video.example.com') return;

  // Filter success messages
  if (event.data === 'succeeded') {
    // DOM manipulation is succeeded
  }
});
```

On `https://video.example.com`:

```js
// Receive messages
window.addEventListener('message', (event) => {
  // Reject all messages except ones from https://parent.example.com
  if (event.origin !== 'https://parent.example.com') return;

  // Do a DOM manipulation on https://video.example.com.

  // Send a success message to https://parent.example.com
  event.source.postMessage('succeeded', event.origin);
});
```

Try it and see how it works. If you have specific requirements that won't work
with `postMessage()` or Channel Messaging API, let us know on [Twitter via
@ChromiumDev](https://twitter.com/ChromiumDev) or ask on Stack Overflow with [a
`document.domain`
tag](https://stackoverflow.com/questions/tagged/document.domain).

### As a last resort, send the `Origin-Agent-Cluster: ?0` header

If you have strong reasons to continue setting `document.domain`, you can send
`Origin-Agent-Cluster: ?0` response header along with the target document.

```http
Origin-Agent-Cluster: ?0
```

The `Origin-Agent-Cluster` header instructs the browser whether the document
should be handled by the origin-keyed agent cluster or not. To learn more about
`Origin-Agent-Cluster`, read [Requesting performance isolation with the
`Origin-Agent-Cluster` header](https://web.dev/origin-agent-cluster/).

When you send this header, your document can continue to set `document.domain`
even after it becomes immutable by default.

### Configure `OriginAgentClusterDefaultEnabled` for enterprise policy {: #enterprise-policy}

Optionally, your admin can configure `OriginAgentClusterDefaultEnabled` policy
to `false` to make `document.domain` settable by default on Chrome instances
across your organization. To learn more, read [Chrome Enterprise Policy List &
Management | Documentation](https://chromeenterprise.google/policies/#OriginAgentClusterDefaultEnabled).

## Browser compatibility

* [The Origin
  specification](https://html.spec.whatwg.org/multipage/origin.html#:~:text=Because%20of%20these%20security%20pitfalls%2C%20this%20feature%20is%20in%20the%20process%20of%20being%20removed%20from%20the%20web%20platform),
  states that the feature should be removed.
* [Mozilla considers disabling `document.domain` by default worth
  prototyping](https://github.com/mozilla/standards-positions/issues/601).
* [WebKit indicated that they are moderately positive about deprecating
  `document.domain`
  setter](https://github.com/w3ctag/design-reviews/issues/564#issuecomment-768450217).

## Resources

* [`Document.domain` - Web APIs |
  MDN](https://developer.mozilla.org/docs/Web/API/Document/domain)
* [Origin Isolation and Deprecating
  `document.domain`](https://github.com/mikewest/deprecating-document-domain/)
* [Deprecating `document.domain`. · Issue #564 ·
  w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/564)

## Acknowledgements

Photo by <a href="https://unsplash.com/@braydona">Braydon Anderson</a> on <a href="https://unsplash.com/">Unsplash</a>
