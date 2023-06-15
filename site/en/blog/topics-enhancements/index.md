---
layout: 'layouts/blog-post.njk'
title: Enhancements to the Topics API
description: >
  Updates to the Topics taxonomy and filtering mechanisms, along with speed improvements and enhanced user controls.
subhead: >
  Updates to the Topics taxonomy and filtering mechanisms, along with speed improvements and enhanced user controls.
date: 2023-06-15
thumbnail: 'image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png'
alt: >
  Topics API enhancements
authors:
  - leeronisrael
tags:
  - privacy
---

Over a year ago, we
[announced](https://blog.google/products/chrome/get-know-new-topics-api-privacy-sandbox/) the Topics
API, a proposal for interest-based advertising. Topics is designed to enable websites to serve
relevant ads in a privacy-preserving manner, without resorting to covert tracking techniques, like
browser fingerprinting. Topics utilizes several techniques to preserve user privacy, including
reducing data, noising data, excluding potentially sensitive topics, and processing data on-device.
Combined, these changes make Topics a significant [step forward](https://arxiv.org/abs/2304.07210)
for user privacy compared to third-party cookies.

When we first offered Topics, we were clear that this was an initial proposal, and we asked the
ecosystem to provide input to help improve it. Since our announcement, we have been listening
carefully to their suggestions. Today, we're excited to share some of the latest improvements to the
Topics API. We believe these changes will make Topics even more useful to the digital advertising
industry, without compromising user privacy.

## Taxonomy

Alongside the initial Topics API announcement, we proposed a taxonomy designed for testing. The
taxonomy is the list of available topics that may be returned by the API. We repeatedly received
[feedback](https://github.com/patcg-individual-drafts/topics/issues/3) that the testing taxonomy did
not represent topics the advertising industry cared most about, so today we're announcing an
[improved taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md).

When crafting this new taxonomy, we saw deep engagement from companies across the ecosystem, like
Raptive (formerly CafeMedia) and Criteo. It removes categories we've heard are less useful, in favor
of categories that better match advertiser interests, while maintaining our commitment to exclude
potentially sensitive topics. We have added 280 commercially focused categories, like "Athletic
Apparel", "Mattresses", and "Luxury Travel," while removing 160 categories including topics like
"Civil Engineering" and "Equestrian" which don't add much commercial value for ad selection on most
sites. The new taxonomy has 469 topics, compared to 349 for the previous version. We chose to limit
the taxonomy's size, to protect against re-identification risk.

We expect the taxonomy to evolve over time, and for governance of the taxonomy to eventually
transition to an external party representing stakeholders from across the industry. We encourage the
ecosystem to review the [latest
taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md) and provide
feedback on the changes.

{% Aside %}

_We're delighted to be working with Google Chrome on improving the Topics API and making it even
more relevant for advertisers and publishers. The new taxonomy should deliver substantial additional
value to API callers._

— Patrick McCann, SVP Research, Raptive (formerly CafeMedia)

{% endAside %}

## Per-caller filtering

One of many privacy-preserving features of Topics is the per-caller filtering requirement. This
feature ensures that callers can only receive topics that they've observed the user visit in the
past, rather than provide the topics to any caller regardless of their level of interaction with the
user. For example, if a caller observes a user visit a site about news, but not shopping, that
caller cannot learn that the user is interested in shopping.

Consider the topic "Boots," which is fully expressed as "/Shopping/Apparel/Footwear/Boots."
"Shopping" and "Apparel" are ancestors of "Boots." Chrome has
[updated](https://github.com/patcg-individual-drafts/topics/pull/143/files) the definition of
"observation" to include all ancestors of a given topic. Previously, in order for a caller to
observe "Shopping" or  "Apparel" a caller must have observed a user visit a page with that topic.
With this change, if "Boots" is observed, then all ancestors (such as "Shopping" and "Apparel") of
that topic are recorded as observed as well.

This change increases the likelihood sites will receive topics information, without impacting the
API's privacy since the topic's ancestors were already known to the caller.

## User controls

With Topics, users can view and control how their cross-site data is used to personalize ads in a
more intuitive and accessible manner compared to tracking mechanisms like third-party cookies. In
fact, participants in [user research](https://research.google/pubs/pub52194/) conducted by Google
reported a significantly better privacy experience and feeling of control when introduced to Topics
user controls, compared to current third-party cookie controls.

Today we're announcing our plans to give users even greater control over which topics are associated
with them. Specifically, users will be able to proactively block topics. This means users will be
able to curate the set of available topics they are interested in by removing selected topics. This
change, coming by early next year, will give users even more control over their privacy and make the
Topics API even more user-friendly.

## Speed improvements

The initial topics proposal required developers to create a cross-origin iframe from which they
would call the Topics' JavaScript API. We received
[feedback](https://github.com/patcg-individual-drafts/topics/issues/7) that this requirement may
have negative impacts for developers and users. Namely, that the introduction of latency would pose
challenges in digital ad auctions and potentially slow down web pages, degrading user experience on
the open web.

Last year, we [announced](https://github.com/patcg-individual-drafts/topics/pull/81) support for
Topics via headers, in requests initiated via Fetch and (temporarily) XHR . Recently, we
[announced](https://github.com/patcg-individual-drafts/topics/pull/147) that we plan to extend
support to request headers for iframes. These changes will improve the performance of Topics,
limiting potential negative impacts on developers and users.

## What's next?

We are excited about these updates to the Topics API and believe that they not only will make it
more effective for advertisers and keep ads relevant for people, but still preserve privacy.
Per-caller filtering updates and speed improvements are already available in Chrome 114. Taxonomy
updates will be available in Q3 2023. User controls updates will be available by early next year. We
are committed to continuing to listen to ecosystem feedback as we build new, more private
technologies for the web.