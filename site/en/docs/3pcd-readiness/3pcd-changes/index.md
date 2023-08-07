---
layout: layouts/doc-post.njk
title: Upcoming changes to 3P cookies
subhead: >
  What exactly is changing with cookies after the deprecation?
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

## Today's identity model on the web

The existing identity model of the web is the result of two interacting browser capabilities:

1. **Per-domain state**, particularly cookies, which allow sites to maintain a consistent visitor identity across different top-level domains; and

2. **In-browser information sharing** among co-occurring parties on a webpage through various mechanisms

On one hand, this global identity enables important aspects of the web ecosystem such as quality advertisements and experience personalization, both essential for maintaining a healthy vibrant web ecosystem with a sustainable community of content creators and global user reach. On the other hand, this global identity raises serious privacy concerns, and a break of the trust from users.

## A new identity model for the web

This [explainer document](https://github.com/michaelkleber/privacy-model) describes a proposal for a new identity model for the web that does not require cross-site tracking, but still allows key web ecosystem use cases, such as publishers to support themselves via effective advertising.

In this new Identity model for the web, **identity is Partitioned by First Party Site**. Per-first-party identity refers to the unique identity a user has while visiting a specific website (the first party). First parties can delegate access to a user's identity to specific third parties (3Ps), such as advertisers or analytics services, as long as the delegated identity remains segmented or sharded by the first party (1P).

In this new Identity model for the web, **some access to 1P-identity can be allowed to 3P**. Browsers can implement mechanisms that allow first parties to delegate access to specific third parties selectively, while keeping the user's identity information sharded by the first party. For instance, when a user visits a news website (the first party), that website might delegate access to a user's identity to an advertising service (the third party) for ad personalization. However, the first party ensures that the third party can only access the user's identity related to their activity on that specific news website, not across multiple websites. This delegation allows for a more personalized user experience and targeted advertising while still preserving privacy by preventing third parties from building comprehensive cross-site profiles of users.

**Access to first-party (per-1p) identity should be considered a privilege** granted to specific third parties (3Ps) by the first party (1P), rather than an automatic right for all third parties. This means that: (1) when a user visits a website (the first party), the website owner should be able to decide which third parties, such as advertisers or analytics providers, are allowed to access the user's identity information related to their site; and (2) Browsers should provide mechanisms that prevent third parties from gaining access to per-1p identity information by enforcing restrictions that only allow third parties to access identity information if they have been explicitly granted permission by the first party.

**1P identity can be associated only to limited amounts of x-site information**. One of the most challenging aspects of defining an privacy-preserving model is establishing the meaning of “limited amounts”. The balancing act is to protect user data from being exploited on one hand, and enable functionalities that rely on access to some user information, on the other.

Determining in which cases, and under what conditions, it might be beneficial to connect a user’ first-party identity with data obtained from third-party websites, maps to answering the following two questions:

1. Across what range of web activity does the browser let websites treat a person as having a single identity?
2. In what ways can information move across identity boundaries without compromising that separation?

The changes to 3PC and the foundations for all new PS APIs seek bring solutions forward which answer these questions, and provide the building blocks for a privacy-preserving user web identity.

## What is changing after 3PCD?

{% Img src="image/WvQmAFP386a04HT2ItuD4b77Aml2/E8BTB3kvs99zizMMkNnn.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}

Cookies were originally designed for recognizing repeat visitors to a website, but they were soon repurposed for use cases like: login and single sign-on; tracking state (like putting shopping choices into a cart); tracking to better target advertising; detecting fraud; measurement and attribution of ad clicks. Third party cookies (cookies set by someone other than the website being used) have introduced additional vectors for cookies to be used as a data collection mechanism across web sites. This increase in data collection and sharing about people using the web - often in a way that is opaque or incomprehensible to a web user - results in decreased individual and collective privacy.

Third-party cookies in particular are a key technology supporting tracking networks, which have been identified as a major threat to privacy. These tracking networks entail concentrating data in the hands of - and thus giving greater power to - intermediaries with a presence across many sites, away from the individual sites a person is actually visiting. This centralising effect has repercussions on innovation and accountability, beyond what is in scope for discussion here.

## Privacy Sandbox

{% Img src="image/WvQmAFP386a04HT2ItuD4b77Aml2/fqi4g4M1NapwzgmiMrzh.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}

Privacy Sandbox is a multi-year initiative by Google (Chromium project) for achieving a more private web by implementing privacy-centric building blocks in alignment with a new privacy model for the web. Such building blocks map to a set of proposed API, which enable the implementation of privacy-preserving solutions for relevant use cases by partitioning user identity at the level of first-party sites.

The Privacy Sandbox Initiative encompasses three main areas:

1. Replace existing functionality with privacy-preserving techniques. Ideally, from a user's point of view, there should be no noticeable difference between how the web operates today and how it functions in a world after the implementation of the Privacy Sandbox.
2. Eventually 3P cookies will be removed while ensuring that the ecosystem has the technical capabilities for embracing new non-cookie-based solutions (e.g. separating first- and third-party cookies, creating first-party sets, and finally removing third-party cookies).
3. As the ability of doing cross-site tracking via 3P cookies is removed, we will ensure developers have a well-lit path to the new capabilities of the platform, and avoid pursuing tracking via other means.
