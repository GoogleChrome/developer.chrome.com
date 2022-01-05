---
layout: 'layouts/blog-post.njk'
title: "`document.domain` is becoming immutable"
description: >
  Websites will be unable to set `document.domain` on Chrome starting in version 101. If your website relies on setting `document.domain`, your action is required.
subhead: >
  Beginning with Chrome version 101, websites will be unable to set `document.domain`.
date: 2022-01-06
authors:
  - agektmr
tags:
  - security
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/grGMzuhOjsGhN150dONe.jpg'
alt: >
  A dog in disguise.
---

**If your website relies on relaxing the same-origin policy via `document.domain`,
your action is required.**

Beginning with Chrome version 101, websites will be unable to set
`document.domain`. Websites will need to use alternative approaches such as
`postMessage()` or Channel Messaging API to communicate cross-origin. If a
website relies on same-origin policy relaxation via `document.domain` to
function correctly, it will need to send an `Origin-Agent-Cluster: ?0` header
along with all documents that require that behavior (note that `document.domain`
has no effect if only one document sets it).

## Why make `document.domain` immutable?

Many websites set `document.domain` to allow communication between [same-site
but cross-origin](https://web.dev/same-site-same-origin/) pages. 

{% Aside 'key-term' %}

Sites which have the same
[eTLD+1](https://web.dev/same-site-same-origin/#:~:text=the%20whole%20site%20name%20is%20known%20as%20the%20etld%2B1)
but are different subdomains are considered "same-site but cross-origin".

{% endAside %}

Here's how it's used:

Let's say a page on `https://parent.example.com` embeds an iframe page from
`https://video.example.com`. These pages have the same eTLD+1 (`example.com`)
with different subdomains. By setting both pages' `document.domain` to
`'example.com'`, the two origins can be treated as if they are the same-origin
by the browser.

On `https://parent.example.com`:

```js
console.log(document.domain); // "parent.example.com"
document.domain = 'example.com';
console.log(document.domain); // "example.com"
```

On `https://video.example.com`:

```js
console.log(document.domain); // "video.example.com"
document.domain = 'example.com';
console.log(document.domain); // "example.com"
```

On `https://parent.example.com`, do a cross origin DOM manipulation against
`https://video.example.com`.

Websites set `document.domain` to make it possible for same-site documents to
communicate more easily. Because this change [relaxes the same-origin
policy](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction),
the parent page will be able to access the iframe's document and traverse the
DOM tree, and vice versa.

At a glance, this is a convenient technique, but this actually introduces a
security risk.

### Security concerns with `document.domain`

Security concerns have led to the spec for `document.domain` to [warn users to
avoid
usage](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction).
The [current discussion with other browser
vendors](https://github.com/w3ctag/design-reviews/issues/564) is moving toward
the same direction.

For example, if a hosting service provides different subdomains per user, an
attacker can set `document.domain` to pretend as if they are the same-origin
with another user's page. Further, an attacker can host a website under a shared
hosting service, which serves through the same IP address with different port
numbers, the attacker can pretend to be on the same-site-but-same-origin as
yours. This is possible because `document.domain` ignores the port number part
of the domain.

To learn more about the security implications of setting `document.domain`, read
["Document.domain" page on
MDN](https://developer.mozilla.org/docs/Web/API/Document/domain#setter).

Chrome will start displaying a warning in DevTools Console as soon as
`document.domain` is set starting Chrome 98. Chrome is planning to  make
`document.domain` immutable starting Chrome 101.

## Alternative cross-domain communication

### Use `postMessage()` or Channel Messaging API

In most use cases, `document.domain` can be replaced by a cross-origin
[`postMessage()`
](https://developer.mozilla.org/docs/Web/API/Window/postMessage) or [Channel
Messaging
API](https://developer.mozilla.org/docs/Web/API/Channel_Messaging_API).

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

Try it and see if it works. If you have specific requirements that won't work
with `postMessage()` or Channel Messaging API, please let us know on [Twitter
via @ChromiumDev](https://twitter.com/ChromiumDev) or ask on Stack Overflow.

### Send `Origin-Agent-Cluster: ?0` header to continue using `document.domain`

If you have strong reasons to continue setting `document.domain`, you can do so
by sending `Origin-Agent-Cluster: ?0` response header along with the target
document.

```http
Origin-Agent-Cluster: ?0
```

`Origin-Agent-Cluster` header instructs the browser whether the document should
be handled by the origin-keyed agent cluster or not. To learn more about Origin
Agent Cluster, read [Requesting performance isolation with the
Origin-Agent-Cluster header](https://web.dev/origin-agent-cluster/).

By sending this header, the document can continue setting `document.domain` even
after it becomes immutable by default.

## Timeline

Chrome will eventually make `document.domain` immutable. Here's the current
timeline:

* **Chrome 98:** Usage of `document.domain` displays a warning message in
  DevTools Console. Also, `Origin-Agent-Cluster` header is available.
* **Chrome 99:** Enterprise policy is in place to extend behavior.
* **Chrome 101:** `document.domain` is immutable.

## Browser compatibility

* [In the Origin
  spec](https://html.spec.whatwg.org/multipage/origin.html#:~:text=Because%20of%20these%20security%20pitfalls%2C%20this%20feature%20is%20in%20the%20process%20of%20being%20removed%20from%20the%20web%20platform),
  it's clearly stated that the feature should be removed.
* [WebKit indicated that they are moderately positive about deprecating
  `document.domain`
  setter](https://github.com/w3ctag/design-reviews/issues/564#issuecomment-768450217).

## Resources

* [Document.domain - Web APIs |
  MDN](https://developer.mozilla.org/docs/Web/API/Document/domain)
* [mikewest/deprecating-document-domain: `document.domain` intentionally weakens
  the only security boundary we have. Perhaps we can dump
  it?](https://github.com/mikewest/deprecating-document-domain/)
* [Deprecating `document.domain`. · Issue #564 ·
  w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/564)

Photo by <a href="https://unsplash.com/@braydona?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Braydon Anderson</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
