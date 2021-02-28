---
layout: 'layouts/doc-post.njk'
title: 'Privacy Sandbox glossary'
subhead: Privacy Sandbox articles and documentation assume a knowledge of concepts from privacy, advertising, and web development. This glossary explains key terms.
description: Simple explanations of key concepts.  
date: 2021-02-28
updated: 2021-02-28
authors:
  - samdutton
---

{% Aside %}
[Let us know](.) [URL TBC] if something is missing!
{% endAside %}

## Click-through rate (CTR) {: #glossary-ctr }

The ratio of users who click on an ad, having seen it. (See also [impression](#glossary-impression).)

## Click-through-conversion (CTC) {: #glossary-ctc }

A conversion attributed to an ad that was 'clicked'.

## Conversion

The completion of an action on an advertiser's website by a user who has previously interacted with an ad from that advertiser. For example, purchase of a product or sign-up for a newsletter after clicking an ad that links to the advertiser's site.

## Differential privacy

Share information about a dataset to reveal patterns of behaviour without revealing private information about individuals or whether they belong to the dataset.

## Domain

See [Top-Level Domain](#glossary-tld) and [eTLD](#glossary-etld).

## eTLD, eTLD+1 {: #glossary-etld }

'Effective' top level domains are defined by the [Public Suffix List](https://publicsuffix.org/list/). For example:

```text
co.uk
appspot.com
glitch.me
```
Effective TLDs are what enable foo.appspot.com to be a different site from bar.appspot.com. The effective top-level domain (**eTLD**) in this case is appspot.com, and the whole **site** name (foo.appspot.com, bar.appspot.com) is known as the **eTLD+1**.

See also [Top-Level Domain](#glossary-tld).

## Entropy

A measure of how much an item of data reveals individual identity.

Data entropy is measured in bits. The more that data reveals identity, the higher its entropy value.

Data can be combined to identify an individual, but it can be difficult to work out whether new data adds to entropy. For example, knowing a person is from Australia doesn't reduce entropy if you already know the person is from Kangaroo Island.

## Fingerprinting {: #glossary-fingerprinting }

Techniques to identify and track the behaviour of individual users. Fingerprinting uses mechanisms that users aren't aware of and can't control. Sites such as [Panopticlick](https://panopticlick.eff.org) and [amiunique.org](https://amiunique.org/) show how fingerprint data can be combined to identify you as an individual.

## Fingerprinting surface {: #glossary-fingerprinting-surface }

Something that can be used (probably in combination with other surfaces) to identify a particular user or device. For example, the `navigator.userAgent()` JavaScript method and the `User-Agent` HTTP request header provide access to a fingerprinting surface (the user agent string).

## First-party {: #glossary-first-party }

Resources from the site you're visiting. For example, the page you're reading is on the site web.dev and includes resources from that site. See also [Third-party](#glossary-third-party).

## Impression {: #glossary-impression }

View of an ad. (See also [click-through rate](#glossary-ctr).)

## k-anonymity

A measure of anonymity within a data set. If you have _k_ anonymity, you can't be distinguished from _k-1_ other individuals in the data set. In other words, _k_ individuals have the same information (including you).

## Nonce
Arbitrary number used once only in cryptographic communication.

## Origin
The origin of a request, including the server name but no path information. For example: `https://web.dev`.

## Passive surface {: #glossary-passive-surface }

Some fingerprinting surfaces, such as user agent strings, IP addresses and accept-language headers, are available to every website whether the site asks for them or not. That means passive surfaces can easily consume a site's privacy budget.

The Privacy Sandbox initiative proposes replacing passive surfaces with active ways to get specific information, for example using Client Hints a single time to get the user's language rather than having an accept-language header for every response to every server.

## Publisher

The Privacy Sandbox proposal explainers are mostly about ads, so the kinds of publishers referred to are ones that put ads on their websites.

## Reach

The total number of people who see an ad.

## Remarketing

Advertising to people who've already visited your site. For example, an online store could show ads for a toy sale to people who previously viewed toys on their site.

## Site

See [Top-Level Domain](#glossary-tld) and [eTLD](#glossary-etld).

## Surface

See [Fingerprinting surface](#glossary-fingerprinting-surface) and [Passive surface](#glossary-passive-surface).

## Third-party {: #glossary-third-party }

Resources served from a domain that's different from the website you're visiting. For example, a website foo.com might use analytics code from google-analytics.com (via JavaScript), fonts from use.typekit.net (via a link element) and a video from vimeo.com (in an iframe). See also [First-party](#glossary-first-party).

## Top-level domain (TLD) {: #glossary-tld }

Top-level domains such as .com and .org are listed in the [Root Zone Database](https://www.iana.org/domains/root/db).

Note that some 'sites' are actually just subdomains. For example, translate.google.com and maps.google.com are just subdomains of google.com (which is the [eTLD + 1](#glossary-etld)).

## .well-known

It can be useful to access policy or other information about a host _before_ making a request. For example, robots.txt tells web crawlers which pages to visit and which pages to ignore. IETF [RFC8615](https://tools.ietf.org/html/rfc8615) outlines a standardized way to make site-wide metadata accessible in standard locations in a /.well-known/ subdirectory. You can see a list of these at [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).