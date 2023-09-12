---
layout: 'layouts/doc-post.njk'
title: Third-party origin trials
subhead: >
  Providers of embedded content can test new or experimental web platform
  features.
description: >
  Learn how providers of embedded content can test new or experimental web
  platform features across multiple sites.
author:
  - samdutton
date: 2020-10-01
updated: 2023-01-05
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/gPlFs9TIUayaQ1MvxRlP.jpg
alt: Person wearing medical gloves pouring purple liquid from glass beaker into flask. Bristol Robotics Laboratory, UK.
tags:
  - origin-trials
---

[Origin trials](/docs/web-platform/origin-trials/) are a way to test a new or experimental web platform
feature.

Origin trials are usually only available on a first-party basis: they only work for a single
registered [origin](https://web.dev/same-site-same-origin/#origin). If a developer wants to test an
experimental feature on other origins where their content is embedded, those origins all need to be
registered for the origin trial, each with a unique trial token. This is not a scalable approach for
testing scripts that are embedded across a number of sites.

Third-party origin trials make it possible for providers of embedded content to try out a new
feature across multiple sites by [providing a token using JavaScript](#provide-token).

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/fCachIuiBjh3XPo10CrN.png", alt="Diagram showing how
   third-party origin trials enable a single registration token to be used across multiple origins.",
   width="800", height="400" %}

Third-party origin trials don't make sense for all features. Chrome will only make the third-party
origin trial option available for features where embedding code on third-party sites is a common use
case.  [Get started with Chrome's origin trials](https://developers.chrome.com/origintrials/)
provides more general information about how to participate in Chrome origin trials.

If you participate in an origin trial as a third-party provider, it will be your responsibility to
notify and set expectations with any partners or customers whose sites you intend to include in the
origin trial. Experimental features may cause unexpected issues and browser vendors may not be able
to provide troubleshooting support.

{% Aside %}
Supporting third-party origin trials allows for broader participation, but also increases the
potential for overuse or abuse of experimental features, so a "trusted tester" approach is more
appropriate. The greater reach of third-party origin trials requires additional scrutiny and
additional responsibility for web developers that participate as third-party providers.

Requests to
enable a third-party origin trial may be reviewed in order to avoid problematic third-party scripts
affecting multiple sites. The Origin Trials Developer Guide explains the
[approval process](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#18-how-can-i-enable-an-experimental-feature-as-embedded-content-on-different-domains).
{% endAside %}

Check [Chrome Platform Status](https://www.chromestatus.com/features/5691464711405568) for updates
on progress with third-party origin trials.


## Register for a third-party origin trial

1. Select a trial from the [list of active
   trials](https://developers.chrome.com/origintrials/#/trials/active).
1. On the trial's registration page, enable the option to request a third-party token, if
   available.
1. Select one of the choices for restricting usage for a third-party token:
   1. Standard Limit: This is the usual limit of
      [0.5% of Chrome page loads](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#3-what-happens-if-a-large-site-such-as-a-google-service-starts-depending-on-an-experimental-feature).
   1. User Subset: A small percentage of Chrome users will always be excluded from the trial,
      even when a valid third-party token is provided. The exclusion percentage varies (or might
      not apply) for each trial, but is typically less than 5%.

1. Click the Register button to submit your request.
1. Your third-party token will be issued immediately, unless further review of the request is
   required. (Depending on the trial, token requests may require review.)
1. If review is required, you'll be notified by email when the review is
   complete and your third-party token is ready.
   <figure class="w-figure">
     {% Img
       src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/r07Zb0QoHnlgiItETR6q.png",
       alt="Chrome origin trials registration page for the Conversion Measurement API, with third-party matching checkbox selected.",
       width="800", height="618" %}
     <figcaption class="w-figcaption">Registration page for the Conversion Measurement trial.</figcaption>
   </figure>

{% Aside 'caution' %}
A third-party token must be provided in an external JavaScript file included via a `<script>`
element: a third-party token won't work in a meta tag, inline script or HTTP header.
{% endAside %}

## Provide a trial token programmatically {: #provide-token}

To take part in an origin trial, a page must provide a valid trial token. If you want a trial
feature to be enabled on multiple sites where your code is embedded, use JavaScript to inject a
token:

```javascript
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = 'TOKEN_GOES_HERE';
document.head.append(otMeta);
```

Otherwise, you would need to get every site that embeds your code to provide a token with an HTTP
header or in their HTML.

{% Aside %}
The demo at [ot-3p.glitch.me](https://ot-3p.glitch.me) accesses an origin trial feature enabled by
using a token provided by JavaScript from a different origin.
{% endAside %}


## Share feedback

If you're registering for a third-party origin trial and have feedback to share on the process or
ideas on how we can improve it, [create an Issue](https://github.com/GoogleChrome/OriginTrials/issues/new)
on the Origin Trials GitHub repository.


## Find out more

* [Demo](https://ot-3p.glitch.me)
* [Cross-origin iframe examples](https://ot-iframe-3p.glitch.me)
* [Getting started with Chrome's origin trials](/blog/origin-trials/)
* [Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
* [Chrome Platform Status](https://www.chromestatus.com/features/5691464711405568)

Photo by [Louis Reed](https://unsplash.com/@_louisreed) on [Unsplash](https://unsplash.com/photos/JeInkKlI2Po).
