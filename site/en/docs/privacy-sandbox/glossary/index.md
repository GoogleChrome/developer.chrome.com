--- 
layout: 'layouts/doc-post.njk' 
title: 'Privacy Sandbox glossary' 
subhead: Privacy Sandbox articles and documentation assume a knowledge of concepts from privacy, advertising, and web development. This glossary explains key terms. 
description: Simple explanations of key concepts.
date: 2021-05-18
updated: 2021-05-18 
authors:
  - samdutton 
---


{% Aside %}
[Let us know](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=) if something is missing!
{% endAside %}

## Ad platform (Adtech) {: #adtech }

A company that provides services to deliver ads.

## Advertiser {: #advertiser }

A company that pays to advertise its products.

## Attribution {: #attribution }

Identification of user actions that contribute to an outcome. For example: correlation of ad clicks 
or views with [conversions](#conversion).

## Blink {: #blink }

The [rendering engine](https://en.wikipedia.org/wiki/Browser_engine) used by Chrome, developed as 
part of the [Chromium](#chromium) project.

## Chromium {: #chromium }

An open-source web browser project. Chrome, Microsoft Edge, Opera and other browsers are based on 
Chromium.

## Click-through rate (CTR) {: #ctr }

The ratio of users who click on an ad, having seen it. (See also [impression](#impression).)

## Click-through-conversion (CTC) {: #ctc }

A conversion attributed to an ad that was 'clicked'.

## Conversion

The completion of some desired goal following action by a user. For example, purchase of a product 
or sign-up for a newsletter after clicking an ad that links to the advertiser's site.

## Cookie

A website can ask a web browser to store a small piece of textual data (called a cookie) on a user's 
computer. Cookies can be used by a website to save data about a user (or a reference to data stored 
on the website's backend servers) as the user moves across the web. For example: an 
online store can retain shopping cart details even if a user is not logged in, or the site could 
record the user's browsing activity on their site. See [First-party cookie](#first-party-cookie) and 
[Third-party cookie](#third-party-cookie).

## Differential privacy  {: #differential-privacy }

Techniques to enable sharing of information about a dataset to reveal patterns of behaviour without 
revealing private information about individuals or whether they belong to the dataset.

## Domain

See [Top-Level Domain](#tld) and [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

**Effective Top Level Domains** are defined by the [Public Suffix List](https://publicsuffix.org/list/). 
For example:

```text
co.uk 
github.io 
glitch.me
``` 

Effective TLDs are what enable foo.appspot.com to be a different site from bar.appspot.com. The
effective top-level domain (**eTLD**) in this case is appspot.com, and the whole **site** name 
(foo.appspot.com, bar.appspot.com) is known as the **eTLD+1**.

See also [Top-Level Domain](#tld).

## Entropy

A measure of how much an item of data reveals individual identity.

Data entropy is measured in bits. The more that data reveals identity, the higher its entropy value.

Data can be combined to identify an individual, but it can be difficult to work out whether new data
adds to entropy. For example, knowing a person is from Australia doesn't reduce entropy if you
already know the person is from Kangaroo Island.

## Federated identity (also known as federated login)

A third-party platform to enable a user to sign in to a website, without requiring the site to
implement their own identity service.

## Fingerprinting {: #fingerprinting }

Techniques to identify and track the behaviour of individual users. Fingerprinting uses mechanisms
that users aren't aware of and can't control. Sites such as [Panopticlick](https://panopticlick.eff.org) 
and [amiunique.org](https://amiunique.org/) show how fingerprint data can be combined to identify 
you as an individual.

## Fingerprinting surface {: #fingerprinting-surface }

Something that can be used (probably in combination with other surfaces) to identify a particular
user or device. For example, the `navigator.userAgent()` JavaScript method and the `User-Agent` HTTP
request header provide access to a fingerprinting surface (the user agent string).

## First-party {: #first-party }

Resources from the site you're visiting. For example, the page you're reading is on the site 
developer.chrome.com and includes resources requested from that site. Requests for those first-party 
resources are called 'first-party requests', and [cookies](#cookie) from developer.chrome.com 
stored while you're on this site are called [first-party cookies](#first-party-cookie). See also 
[Third-party](#third-party).

## First-party cookie {: #first-party-cookie } 

[Cookie](#cookie) stored by a website while a user is on the site itself. For example: an online 
store might ask a browser to store a cookie in order to retain shopping cart details for a user 
who is not logged in. See also [Third-party cookies](#third-party-cookie). 

## Impression {: #impression }

* View of an ad. (See also [click-through rate](#ctr).) 
* An ad slot: an empty rectangle on a web page where an ad can be displayed. Ad slots 
constitute [inventory](#inventory).

## Inventory {: #inventory}

The ad slots available on a site: the empty rectangles where ads can be displayed.

## k-anonymity

A measure of anonymity within a data set. If you have _k_ anonymity, you can't be distinguished from
_k-1_ other individuals in the data set. In other words, _k_ individuals have the same information
(including you).

## Nonce 

Arbitrary number used once only in cryptographic communication.

## Origin 

The origin of a request, including the scheme and server name, but no path information. For example:
`https://developer.chrome.com`

## Origin trial {: #origin-trial}
Origin trials provide access to a new or experimental feature, to make it possible to build 
functionality that users can try out for a limited time before the feature is made available to 
everyone. When Chrome offers an origin trial for a feature, an [origin](#origin) can be registered 
for the trial to enable the feature for all users on that origin, without requiring users to toggle 
any flags or switch to an alternative build of Chrome (though they may need to upgrade). Origin 
trials enable developers to build demos and prototypes using new features. The trials also help 
Chrome engineers understand how 
new features are used, and how they may interact with other web technologies. Find out more: 
[Getting started with Chrome's origin trials](https://web.dev/origin-trials/).

## Passive surface {: #passive-surface }

Some fingerprinting surfaces, such as user agent strings, IP addresses and accept-language headers,
are available to every website whether the site asks for them or not. That means passive surfaces
can easily consume a site's privacy budget.

The Privacy Sandbox initiative proposes replacing passive surfaces with active ways to get specific
information, for example using Client Hints a single time to get the user's language rather than
having an accept-language header for every response to every server.

## Publisher

In the Privacy Sandbox context, a site that displays ads. 

## Reach

The total number of people who see an ad (or who visit a web page that displays the ad).

## Remarketing

Reaching people on other sites who have previously visited your site. For example, an online store 
could show ads for a toy sale to people who previously viewed toys on their site. 

## Site

See [Top-Level Domain](#tld) and [eTLD](#etld).

## Surface

See [Fingerprinting surface](#fingerprinting-surface) and [Passive
surface](#passive-surface).

## Third-party {: #third-party }

Resources served from a domain that's different from the website you're visiting. For example, a
website foo.com might use analytics code from google-analytics.com (via JavaScript), fonts from
use.typekit.net (via a link element) and a video from vimeo.com (in an iframe). See also
[First-party](#first-party).

## Third-party cookie {: #third-party-cookie}

[Cookie](#cookie) stored by a third-party service. For example, a video website might include a 
**Watch Later** button in their embedded player, to enable a user to add a video to their wishlist 
without forcing them to navigate to the video site. See also [First-party cookie](#first-party-cookie).

## Top-level domain (TLD) {: #tld }

Top-level domains such as .com and .org are listed in the [Root Zone
Database](https://www.iana.org/domains/root/db).

Note that some 'sites' are actually just subdomains. For example, translate.google.com and
maps.google.com are just subdomains of google.com (which is the [eTLD + 1](#etld)).

## .well-known

It can be useful to add redirects to a website from standardized URLs. For example, password 
managers can make it easier for users to update passwords if a website sets a redirect from 
`/.well-known/change-password` to the change password page of the site. In addition, it can be 
useful to access policy or other information about a host _before_ making a request. For
example, robots.txt tells web crawlers which pages to visit and which pages to ignore. IETF
[RFC8615](https://tools.ietf.org/html/rfc8615) outlines a standardized way to make site-wide
metadata accessible in standard locations in a /.well-known/ subdirectory. You can see a list of
these at [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).