---
layout: 'layouts/blog-post.njk'
title: "Chrome will disable modifying `document.domain` to relax the same-origin policy"
description: >
  If your website relies on setting `document.domain`, your action is required.
subhead: >
  If your website relies on setting `document.domain`, your action is required.
date: 2022-01-11
authors:
  - agektmr
tags:
  - security
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/grGMzuhOjsGhN150dONe.jpg'
alt: >
  A dog in disguise.
---

{% Aside 'warning' %}

If your website relies on relaxing the same-origin policy via `document.domain`,
your action is required. Continue to read more about why this is changing or
skip to [alternative code for cross-origin
communication](#alternative-cross-origin-communication)

{% endAside %}

[`document.domain`](https://developer.mozilla.org/docs/Web/API/Document/domain)
was designed to get or set the origin's hostname.

On Chrome, websites will be unable to set `document.domain`. They will need to
use alternative approaches such as `postMessage()` or Channel Messaging API to
communicate cross-origin. We're targeting Chrome 101 to ship this change at the
earliest, but this is dependent on the response to the [Intent to
Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/_oRc19PjpFo/).

If your website relies on same-origin policy relaxation via `document.domain`
to function correctly, the site will need to send an `Origin-Agent-Cluster: ?0`
header, as will all other documents that require that behavior (note that
`document.domain` has no effect if only one document sets it).

## Timeline

Here's the current timeline:

* **Chrome 98:** When using `document.domain`, DevTools Console displays a
  warning message. `Origin-Agent-Cluster` header is available.
* **Chrome 99:** Enterprise policy is offered to extend availability of
  `document.domain`.
* **Chrome 101:** `document.domain` is immutable. Depending on the feedback to
  [Intent to
  Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/_oRc19PjpFo/),
  this may be delayed.

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

For example, if a hosting service provides different subdomains per user, an
attacker can set `document.domain` to pretend they are the same-origin
as another user's page. Further, an attacker can host a website under a shared
hosting service, which serves sites through the same IP address with different
port numbers. In that case, the attacker can pretend to be on the same-site-but-same-origin
as yours. This is possible because `document.domain` ignores the port number
part of the domain.

To learn more about the security implications of setting `document.domain`, read
["Document.domain" page on
MDN](https://developer.mozilla.org/docs/Web/API/Document/domain#setter).

Chrome will display a warning in DevTools Console as soon as `document.domain`
is set, beginning in Chrome 98. Chrome plans to make `document.domain`
immutable from Chrome 101.

## Alternative cross-origin communication

At this time, you have two options to replace `document.domain` for your website.

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

### Send `Origin-Agent-Cluster: ?0` header to continue using `document.domain`

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

## Browser compatibility

* [The Origin
  specification](https://html.spec.whatwg.org/multipage/origin.html#:~:text=Because%20of%20these%20security%20pitfalls%2C%20this%20feature%20is%20in%20the%20process%20of%20being%20removed%20from%20the%20web%20platform),
  states that the feature should be removed.
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
