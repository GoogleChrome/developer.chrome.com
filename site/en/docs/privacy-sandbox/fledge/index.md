---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE'
subhead: >
  A solution for remarketing use cases, designed so it cannot be used by third parties to track user browsing behaviour.
description: >
  The FLEDGE API enables on-device "auctions" by the browser, on the user's device, to choose relevant ads, based on websites the user has previously visited. The API enables remarketing use cases, but is designed so it cannot be used by third parties to track user browsing behaviour.
date: 2021-02-05
updated: 2021-02-05
authors:
  - samdutton
---

## Implementation status

* [API proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) under discussion with [WICG](https://www.w3.org/community/wicg/) and interest groups.

[Embed video when available.]


!!!.aside.aside--warning
This document is a work in progress, unfinished and not to be shared externally.

The aim is to include the following textual content in this page in 300 words or less. 

Potentially, these (or similar) could be headings.

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

**Text below is just draft/dummy content: work in progress.**
!!!

## How does FLEDGE work?
1. A user visits a page on a site that wants to advertise its products, such as an online store.
1. The advertiser site (or the ad tech it uses) asks the user's browser to join an ad 'interest group' by calling joinAdInterestGroup(), passing data including ads relevant to the user's browsing, the ad platform host name, and URLs to access bidding logic and bidding signals.
1. The user visits a site that displays ads, such as a news publisher.
1. The user's browser runs an 'auction' to choose an ad for an ad block on the site. The 'seller' in this auction might be the site itself or a third party acting on its behalf, such as a supply-side platform. The 'buyers' are third parties bidding for the site's ad inventory, such as demand-side platforms acting on behalf of advertisers. The seller in this ad auction has three jobs:<br>
• Choose which buyers can participate.<br>
• Choose which bid is most desirable, based on each bid's price and metadata.<br>
• Report the auction outcome.<br>
1. The seller initiates the ad auction by calling runAdAuction(), with data including the host name of the seller, signals from buyers and the seller, and a URL for auction decision logic.
1. The auction returns data about the winning ad. The data cannot be accessed by the publisher site, except to render the ad in a Fenced Frame.
1. The ad is displayed.

When a user visits an advertiser's website, the site can ask the user's browser to associate the user with specific interest groups for a certain period of time (for example 30 days).

The interest group could be unique to the advertiser's website, so that it functions as a remarketing list.  Alternatively, multiple websites could agree to assign users to the same interest group, for example if the sites are partnered together or they belong to the same ad network.
Periodically the user's browser fetches ads designated for the interest groups, along with code to enable the browser to run an "auction" to choose an ad, for example based on whether the ad will be displayed near the top of the page.
When the user visits a publisher site that displays ads from an ad network used by an advertiser site the user visited previously, ad network code in the page makes a request to the browser to run "auction" code to select an ad. The "winning" ad is displayed.


## Find out more

* [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
* [Digging into the Privacy Sandbox](web.dev/digging-into-the-privacy-sandbox)
* [The Privacy Sandbox on chromium.org](chromium.org/Home/chromium-privacy/privacy-sandbox)
