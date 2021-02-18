---
layout: 'layouts/doc-post.njk'
title: 'Federated Learning of Cohorts (FLoC)'
subhead: >
  Allow sites to guess your interests without being able to uniquely identify you.
description: >
 FLoC enables interest-based advertising in a way that preserves privacy. As a user moves around the 
 web, their browser is assigned to an "interest cohort" along with thousands of others with a 
 similar browsing history. This is done without sharing individual browsing data with the browser 
 vendor or anyone else. Advertisers (sites that pay for advertisements) can include code on their 
 pages to provide access to cohort data for their ad-tech platforms. 
date: 2021-02-19
updated: 2021-02-19
authors:
  - samdutton
---

## When will this be available?

* [API proposal](https://github.com/WICG/floc) is under discussion with [WICG](https://www.w3.org/community/wicg/) and interest groups.


[Embed video when available.]


{% Aside 'warning' %}

[For Googlers, February 2021.]

This document is a work in progress, unfinished and not to be shared externally.

The aim is to include the following textual content in this page in 300 words or less. 

Potentially, these items (or similar) could be headings.

* Why do we need this technology? 
* What requirements does it meet?
* How does the technology work?
* What are the major use cases?
* Simple diagram
* Simple example
* Are there any new capabilities this technology will give web platforms?
* If there are existing solutions, why do we need something new? 
* Who needs to know about this API?
* [Short glossary if necessary: just a few words.]
* How to share feedback and comments
* How to get involved

**Text below is content in progress.**

{% endAside %}


## What is the Federated Learning of Cohorts (FLoC)?

Many people are concerned about the privacy implications of ad selection, which currently relies on techniques such as tracking cookies and device fingerprinting that can reveal your browsing history to ad platforms and advertisers.

Advertisers use multiple techniques to choose relevant ads. For example:
* First-party and contextual information: "Show this ad to users who selected knitting as a favorite topic" or "Show this ad on pages about motorcycles'.
* Specific actions of the user: "Show this ad for discount wool to users who left knitting items in their shopping cart." Remarketing use cases such as this are handled by the TURTLEDOVE proposal.
* General information about user interests: "Show this ad to classical music lovers'. This is the use case handled by FLoC.

With FLoC, the browser groups thousands of users with similar browsing histories into "cohorts". Advertisers can select ads for this group, but cannot identify individual people within it. Each user belongs to no more than one cohort. The user's browser provides their cohort name (for example "9739") to websites and services on request. Cohort names can be requested to select ads or to learn which cohorts are most likely to visit a website or complete a conversion event.

### Today
Ad tech companies infer a particular individual's interests based on sites they visit by using cookies and fingerprinting techniques.

### Future
FLoC allows sites to guess your interests without being able to uniquely identify you. By generating a ID based on the browsing history of a large group of people, instead of ones of a particular individual, content can be personalized in a private way.


## How does FLoC work?

### FLoC server
1. Creates points randomly distributed in n-dimensional 'browsing history space', and assigns each 
point a 'cohort name'.

### User's browser, on their device
1. Calculates the point in 'browsing history space' that corresponds most closely to its browsing
history.
1. Gets the set of points with their cohort names from the FloC server.
1. Works out its cohort name by calculating which point from the FLoC data is closest to its own. In
other words, the browser, on the device, works out which cohort best matches its own browsing
history.

### Advertiser (such as a shoe store)
1. A user visits an advertiser site.
1. The advertiser identifies correlations between cohorts and conversions (or other desirable
behaviour). For example, an online shoe store might learn that browsers from cohorts 219 and 9739
show a particular interest in hiking shoes.
1. The advertiser shares this information with advertising platforms.

### Publisher (such as a news website)
1. User visits the publisher website.
1. The site requests the browser's cohort name.
1. The website makes a request for an ad to an ad platform, providing the browser's cohort name.

### Ad platform 
1. The ad platform can select ads appropriate to the user, since it has the browser's cohort name 
from the publisher site, and data about what ads are appropriate for that cohort from the
advertiser.

For example:

1. A user visits an advertiser site, such as an online shoe store.
1. The shoe store uses JavaScript to request the browser's cohort name, which is 9739.
1. The user searches the store for hiking boots.
1. The shoe store shares this information with its ad platform: "A browser from cohort 9739 showed
an interest in hiking boots."
1. Later, the user visits a news website that publishes ads.
1. The news site requests the browser's cohort name.
1. The news site requests an ad from its ad platform, providing the browser cohort name (9739) in
its request. The ad platform happens to be the same one used by the shoe store to advertise its
products.
1. The ad platform now knows (from the news site) that the browser's cohort name is 9739, and (from
the shoe store) that cohort 9739 is interested in hiking boots, so it provides the news site with a 
hiking boot ad from the shoe store.
1. The news site displays the ad.


## Find out more

* [FLoC API technical explainer](https://github.com/WICG/floc)
* [Digging into the Privacy Sandbox](web.dev/digging-into-the-privacy-sandbox)
* [The Privacy Sandbox on chromium.org](chromium.org/Home/chromium-privacy/privacy-sandbox)
