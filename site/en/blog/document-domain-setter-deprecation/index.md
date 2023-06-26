---
layout: 'layouts/blog-post.njk'
title: "Chrome disables modifying `document.domain`"
description: >
  If your website relies on setting document.domain, your action is required.
subhead: >
  If your website relies on setting document.domain, your action is required.
date: 2023-05-30
authors:
  - maudn
  - agektmr
tags:
  - security
hero: 'image/O2RNUyVSLubjvENAT3e7JSdqSOx1/5gX4Rd9jWgF8ks7kKsBQ.jpg'
alt: >
  Colorful masks in a row.
---


{% Aside 'warning' %}

As we've [announced in January 2022](/blog/immutable-document-domain/), we are deprecating the `document.domain` setter starting in [Chrome 115](https://chromiumdash.appspot.com/schedule). If your website relies on relaxing the
same-origin policy via `document.domain`, your immediate
action is required.

Note that using the `document.domain` setter (`document.domain = ...`) will not throw an exception. It will only cease to have an effect.

Continue to read more about why this is changing or skip to [alternative code](#alternatives) you can implement.

{% endAside %}


## What's changing, and why?

Starting in [Chrome 115](https://chromiumdash.appspot.com/schedule), websites will be unable to set `document.domain`: Chrome will make `document.domain` immutable. To communicate cross-origin, you need to use alternative approaches, such as `postMessage()` or the Channel
Messaging API.

Note that this change will be rolled out progressively.

We expect other browsers to eventually deprecate and remove this functionality. Review the [browser compatibility](#browser-compatibility) section for details.


### Why make `document.domain` immutable?

[`document.domain`](https://developer.mozilla.org/docs/Web/API/Document/domain)
was designed to get or set the origin's hostname. Many websites set
`document.domain` to allow communication between [same-site but
cross-origin](https://web.dev/same-site-same-origin/) pages. 

While this is a
convenient technique, it introduces a security risk, because it
[relaxes the same-origin policy](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction).
Security concerns around `document.domain` have led to a change in the
specification that [warns users to avoid using it](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction).

{% Details %}
{% DetailsSummary %}
**In detail: Why make document.domain immutable?**
{% endDetailsSummary %}

#### How `document.domain` is used today

Many websites set `document.domain` to allow communication between [same-site
but cross-origin](https://web.dev/same-site-same-origin/) pages.

Same-site but cross-origin sites have the same
[eTLD+1](https://web.dev/same-site-same-origin/#:~:text=the%20whole%20site%20name%20is%20known%20as%20the%20etld%2B1)
but different subdomains.

Here's how `document.domain` was used up until now:

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

#### Security concerns with `document.domain`

Security concerns around `document.domain` have led to a change in the
[specification that warns users to avoid using it](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction).

For example, when two pages set `document.domain`, they can pretend as if they
are the same-origin. This is particularly critical when these pages use a shared
hosting service with different subdomains. Setting `document.domain` opens up
access to all other sites hosted by that same service, which makes it easier for
attackers to access your sites. This is possible because `document.domain`
ignores the port number part of the domain.

To learn more about the security implications of setting `document.domain`,
read the ["Document.domain" page on MDN](https://developer.mozilla.org/docs/Web/API/Document/domain#setter).

{% endDetails %}

## Browser compatibility {: #browser-compatibility}

- [The HTML specification](https://html.spec.whatwg.org/multipage/origin.html#:~:text=Because%20of%20these%20security%20pitfalls%2C%20this%20feature%20is%20in%20the%20process%20of%20being%20removed%20from%20the%20web%20platform)
    states that the feature should be removed.
- [Mozilla considers disabling `document.domain` by default worth prototyping](https://github.com/mozilla/standards-positions/issues/601).
- [WebKit indicated that they are moderately positive about deprecating `document.domain` setter](https://github.com/w3ctag/design-reviews/issues/564#issuecomment-768450217).
- [Discussion with other browser vendors](https://github.com/w3ctag/design-reviews/issues/564)
- [WHATWG / HTML working group Pull Request (pending experimentation experience)](https://github.com/whatwg/html/pull/7617)

## How do I know if my site is affected?

{% Aside 'warning' %}

Note that starting in Chrome 115, using the `document.domain` setter will not throw an exception, as per the [specification](https://html.spec.whatwg.org/multipage/browsers.html#dom-document-domain). It will only cease to have an effect. 

{% endAside %}

If your website is affected by this change, Chrome warns you in the DevTools
Issues panel — this warning has been added in 2022.
Notice the yellow flag in the upper right of DevTools.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HIqzEZLIDAIPgY9y39X1.png", alt="Screenshot of the issue warning in DevTools", width="800", height="255" %}

You can also run your site through the [LightHouse deprecated API audit](https://web.dev/deprecations/) to find all APIs that are scheduled to be removed from Chrome.

If you have set up the Reporting API, Chrome has sent you deprecation reports
to notify you of this upcoming deprecation. Learn more about [how to use the
Reporting API](https://web.dev/reporting-api/) with either existing report
collection services or by building your own in-house solution.

## How do I see this change in action?

The change will be rolled out progressively, starting in [Chrome 115](https://chromiumdash.appspot.com/schedule).
To see in this change in action even if it hasn't already rolled out in your Chrome browser, you can turn it on as follows:

1.  Open `chrome://flags/#origin-agent-cluster-default`
2.  Select **Enable.**
3.  Restart Chrome.

## What alternatives can I use? {: #alternatives}

The best option is to not modify `document.domain` at all, for example by
hosting the page and all constituent frames on the same origin. This works in
all versions of all browsers. But this may require substantial re-work of an
application, so it's worth to also look at alternatives that continue to support
cross-origin accesses.

### Use `postMessage()` or Channel Messaging API instead of `document.domain`

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

### As a last resort, send the `Origin-Agent-Cluster: ?0` header {: #origin-agent-cluster}

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

All other documents that require that behavior will also need to send an
`Origin-Agent-Cluster` (note that `document.domain` has no effect if only one
document sets it).

### Configure `OriginAgentClusterDefaultEnabled` for enterprise policy {: #enterprise-policy}

Optionally, your admin can configure `OriginAgentClusterDefaultEnabled` policy
to `false` to make `document.domain` settable by default on Chrome instances
across your organization. To learn more, read [Chrome Enterprise Policy List & Management | Documentation](https://chromeenterprise.google/policies/#OriginAgentClusterDefaultEnabled).

## Resources

- [`Document.domain` - Web APIs | MDN](https://developer.mozilla.org/docs/Web/API/Document/domain)
- [Origin Isolation and Deprecating `document.domain`](https://github.com/mikewest/deprecating-document-domain/)
- [Deprecating `document.domain`. · Issue #564 · w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/564)

## Acknowledgements

Photo by <a href="https://unsplash.com/@finan">Finan Akbar</a> on <a href="https://unsplash.com/">Unsplash</a>
