---
layout: 'layouts/doc-post.njk'
title: 'Federated Learning of Cohorts (FLoC)'
subhead: 'FLoC allows sites to guess your interests without being able to uniquely identify you.'
description: 'FLoC allows sites to guess your interests without being able to uniquely identify you. By generating a ID based on the browsing history of a large group of people, instead of ones of a particular individual, content can be personalized in a private way.'
date: 2021-01-04
updated: 2021-01-04
authors:
  - samdutton
---

## What is the Federated Learning of Cohorts (FLoC)?

### Today
Ad tech companies infer a particular individual's interests based on sites they visit by using cookies and fingerprinting techniques.

### Future
FLoC allows sites to guess your interests without being able to uniquely identify you. By generating a ID based on the browsing history of a large group of people, instead of ones of a particular individual, content can be personalized in a private way.

## How does FLoC work?

### FLoC server
1. Creates points randomly distributed in n-dimensional 'browsing history space', and assigns each point a 'cohort name'.


### User's browser, on their device
1. Calculates the point in 'browsing history space' that corresponds to its browsing history.
1. Gets the set of points with their cohort names from the FloC server.
1. Works out its cohort name by calculating which point from the FLoC data is closest to its own.


### Advertiser (such as a shoe store)
1. A user visits an advertiser site.
1. The advertiser identifies correlations between conversions (or other desirable behaviour) and cohort names. For example, an online shoe store might learn that browsers from cohorts 219 and 9739 show a particular interest in hiking shoes. 
1. The advertiser shares this information with advertising platforms.


### Publisher (such as a news website)
1. A user visits a publisher website.
1. The site requests the browser's cohort name.  
1. The website makes a request for an ad to an ad platform, providing the browser's cohort name.


### Ad platform
1. The ad platform selects ads appropriate to a user by combining cohort information from a publisher website with cohort conversion information shared by the advertiser. 

For example:
1. A user visits an advertiser site, such as an online shoe store, and views hiking shoes.
1. The shoe store gets the cohort name of the user's browser: 9739.
1. The shoe store shares this information with its ad platform: a browser with cohort name 9739 showed an interest in hiking shoes.
1. Later, the user visits a news website that publishes ads.
1. The news site shares the user's browser's cohort name 9739 with an ad platform, which is used by the shoe store.
1. The ad platform knows (from the news site) that the browser's cohort name is 9739, and (from the shoe store) that cohort 9739 is interested in hiking shoes, so it provides the news site with a hiking shoe ad from the shoe store.
1. Publisher (the news site) displays ads from the ad platform that are appropriate for the user's cohort.

Many people are concerned about the privacy implications of ad selection, which currently relies on techniques such as tracking cookies and device fingerprinting that can reveal your browsing history to ad platforms and advertisers.

Advertisers use multiple techniques to choose relevant ads. For example:
* First-party and contextual information: "Show this ad to users who selected knitting as a favorite topic" or "Show this ad on pages about motorcycles'.
* Specific actions of the user: "Show this ad for discount wool to users who left knitting items in their shopping cart." Remarketing use cases such as this are handled by the TURTLEDOVE proposal.
* General information about user interests: "Show this ad to classical music lovers'. This is the use case handled by FLoC.

With FLoC, the browser groups thousands of users with similar browsing histories into "cohorts". Advertisers can select ads for this group, but cannot identify individual people within it. Each user belongs to no more than one cohort. The user’s browser provides their cohort name (for example “123”) to websites and services on request. Cohort names can be requested to select ads or to learn which cohorts are most likely to visit a website or complete a conversion event.
