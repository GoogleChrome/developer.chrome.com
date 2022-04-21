---
layout: "layouts/blog-post.njk"
title: "Securely embed content on your site"
authors:
  - jackjey
  - alexandrawhite
date: 2022-04-13
updated: 2022-04-14
description: >
   Learn about multiple HTML elements used to embed content, and how to optimize for security.
hero: "image/VbsHyyQopiec0718rMq2kTE1hke2/USsZELgMeJW2htiuy6lO.jpg"
alt: >
  HTML closed tag.
tags:
  - security
  - html
---

Embedded content is the best way to keep users on your site, while sharing
content from other pages or sites. This could be as small as an embedded Tweet,
which displays in Twitter's style and format. It could be as large as an
entirely separate site embedded onto your own, such as an embedded Shopify shop
where visitors can make a purchase without leaving your site.

Now more than ever, it's important that our sites remain secure when we embed
content.

There are several ways developers can embed content on a website. The most
common technique is to use an
[`<iframe>`](https://developer.mozilla.org/docs/Web/HTML/Element/iframe), 
which allows you to embed any content onto your site with just a URL. It's
already possible to add the `sandbox` attribute to make an iframe more secure.

Alternatively, you could use a proposed HTML element:

*  `<fencedframe>` is proposed as a privacy-preserving way to embed third
   party content.
*  `<portal>` is proposed for more seamless page transitions.

Read on to learn how to improve the security of your embedded content.

## Embed with iframes {: #iframes }

Iframes can be used for all sorts of use cases, such as adding maps or forms
to a contact page, and displaying ads.

```html
<iframe src="https://example.com/maps"></iframe>
```

Each iframe has its own browsing context, with its own session history and
[document](https://developer.mozilla.org/docs/Web/API/Document). The context
that embeds the iframe is referred to as the _parent_ browsing context.

Third-party content displayed in an iframe can interact with the parent site
through `postMessage()`. This allows developers to send arbitrary values between
browsing contexts. The message receiver can use the event listener `onmessage`
to receive the values.

```javascript
// inside iframe
window.parent.postMessage("ping", "https://example.com");

// window
window.addEventListener("message", (event) => {
  console.log(event.data);
})
```

### Added security with the `sandbox` attribute

If malicious content is deployed in an iframe, it's possible that unintended
actions (such as a JavaScript execution or form submission) could be executed.
To avoid this, the [`sandbox`
attribute](https://www.w3schools.com/tags/att_iframe_sandbox.asp) restricts the
executable APIs in the iframe and disables potentially harmful features.

```html
<iframe src="https://example.com" sandbox></iframe>
```

Sandbox may make certain APIs unavailable that are important to your embedded
content. To allow a disabled API, you can explicitly add an argument to the
sandbox attribute.

```html
<iframe sandbox="allow-forms" src="https://example.com"></iframe>
```

There are a number of possible values for the
[`sandbox` specification](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox),
including `allow-forms`, `allow-same-origin`, `allow-popups`, and
more.


### Permissions Policy

As increasingly powerful features have been developed for the web, [permissions
policies](/docs/privacy-sandbox/permissions-policy/) were created to manage permissions for all of them. A permissions policy
can be applied to a parent site and to iframe content. The permissions granted
to a parent site can also be granted to the iframe, using the `allow` attribute.

```html
<iframe src="https://example.com" allow="fullscreen"></iframe>
```

## Embed with fenced frames {: #fenced-frames }

A [fenced frame](/docs/privacy-sandbox/fenced-frame/) (`<fencedframe>`) is a
proposed HTML element for embedded content, similar to an iframe. Unlike
an iframe, a fenced frame restricts communication with its embedding context to
allow the frame access to cross-site data without sharing it with the embedding
context. Similarly, first-party data on the parent's page cannot be shared with
the fenced frame.

```html
<fencedframe src="https://3rd.party.example"></fencedframe>
```

Fenced Frames is a [Privacy Sandbox proposal](/docs/privacy-sandbox/overview/)
which suggests top-level sites should partition data. Many of the Privacy
Sandbox proposals aim to satisfy cross-site use cases, without third-party
cookies or other tracking mechanisms. Certain Privacy Sandbox APIs may require
select documents to [render within a fenced
frame](/docs/privacy-sandbox/fenced-frame/#cross-site-data).

For example, a fenced frame will be created for the winner of the FLEDGE API ad
auction. The FLEDGE API will provide an [opaque
source](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/opaque_src.md),
a location-independent URN scheme, which can render within a fenced
frame. Opaque sources allow sites to display content on their sites without
revealing the ad source URL to the site owner.

```html
<fencedframe src="urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a"></fencedframe>
```

Ultimately, fenced frames won't replace iframes. You won't have to use them.
Fenced frames are proposed for a more private frame for usage when data from
different top-level partitions needs to be displayed on the same page.

## Embed with portals  {: #portal }

[Portal](https://web.dev/hands-on-portals/) (`<portal>`) is a proposed HTML
element with an independent browsing context, which could improve the page
transition experience. Portals embed content like iframe, but the user cannot
access the portal's code. A portal is view-only and cannot be interacted with by
users.

Portals offer the low complexity of a multi-page application with the
seamless transitions of a single-page application. These transitions can be
animated, quickly replacing the content in the browser window.

```html
<portal src="https://example.com/"></portal>
```

The [portal specification](https://wicg.github.io/portals/) is still in the
early stages of development.

## Other HTML elements used for embeds

Throughout web history, there have been a number of HTML elements proposed and
APIs created to embed content. For a while, it was common to create sites with
multiple [`<frame>`](https://developer.mozilla.org/docs/Web/HTML/Element/frame) 
and a [`<frameset>`](https://developer.mozilla.org/docs/Web/HTML/Element/frameset)
elements. Sites with several `<frameset>` elements displayed the URL of the
parent page in the address bar, regardless of the source of the many individual
frames. This made it difficult to share links to content within the site. These
APIs have since been deprecated. 

There was also a time when plugin technologies, such as the Java `<applet>`
element, were used to cover other use cases. This was later replaced by the
`<object>` element. Both of these elements were commonly used to display Flash
plugins, but were also used to display other HTML elements (similar to iframes).
Other elements, such as  `<canvas>`, `<audio>`, `<video>`, and `<svg>`, have
rendered both the `<object>` and `<applet>` elements obsolete. 

Although `<object>` and `<embed>` are not officially deprecated yet, it's best
to avoid them, especially since they have some [strange
behaviors](https://github.com/whatwg/html/issues?q=is%3Aopen+is%3Aissue+label%3A%22topic%3A+embed+and+object%22).
`<applet>` was [removed from the HTML
specification](https://github.com/whatwg/html/pull/1399) in 2017. 

## Conclusion

You can securely embed content onto any website, using the existing iframe 
specification. More HTML elements, including `<fencedframe>` and `<portal>` have 
been proposed for security and style improvements. We'll continue to share the 
progress on the [Fenced Frames proposal](/docs/privacy-sandbox/fenced-frame/) as 
it progresses.

_Hero image by [Jackson So](https://unsplash.com/@jacksonsophat)._
