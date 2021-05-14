---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE'
subhead: >
  A solution for remarketing use cases, designed so it cannot be used by third parties to track user browsing behaviour.
description: >
  FLEDGE satisfies remarketing use cases, but is designed so it cannot be used by third parties to track user browsing behaviour. The API enables on-device "auctions" by the browser to choose relevant ads, based on websites the user has previously visited. 
date: 2021-05-17
updated: 2021-05-17
authors:
  - samdutton
---

{% Aside 'warning' %}
[For Googlers, May 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## Implementation status

* [API proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) is under discussion with [WICG](https://www.w3.org/community/wicg/) and interest groups.
* [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) in 
[Blink](https://www.chromium.org/blink).


{% Aside %}
FLEDGE is a descendant of [TURTLEDOVE](https://github.com/WICG/turtledove).
{% endAside %}


## Why do we need FLEDGE?

Understanding user interests can result in more relevant ads than simply choosing ads based on site 
content (contextual targeting) or by using information about the user (first-party-data targeting).
Traditionally, ad platforms have learned about user interests by tracking their behaviour across 
sites. We need a way to present users with relevant ads without cross-site tracking.

FLEDGE satisfies remarketing use cases, but is designed so it cannot be used by third parties to 
track user browsing behaviour. The API enables on-device "auctions" by the browser to choose 
relevant ads, based on websites the user has previously visited.

With FLEDGE:

* The user's browser, not the advertiser or adtech platform, holds information about what the 
advertiser thinks a person is interested in. 
* The browser combines user data with ad buyer/seller data and business logic to conduct an 
"auction" to select an ad on the user's device, rather than sharing data with a third party.
* Advertisers can serve ads based on an interest, but cannot combine that interest data with other 
information about the person—in particular, the identity of the person or the pages they visit. The 
advertiser cannot learn about what pages the user viewing on a publisher site.
* Websites the person visits, and the ad networks those sites use, cannot learn about their 
visitors' ad interests: ad selection is done on the user's browser. 

In other words, FLEDGE keeps your interests and browsing activity private. For example, if you visit 
an online store and show an interest in running shoes, and then visit a news site, the advertiser 
(the running store) doesn't learn what pages you're viewing and the ad publisher (the news site) 
doesn't learn about your interest in running shoes. 


## How does FLEDGE work?

When a user visits an advertiser's website, the site can ask the user's browser to associate the 
user with specific interest groups for a certain period of time (for example 30 days).

The interest group could be unique to the advertiser's website, so that it functions as a 
remarketing list.  Alternatively, multiple websites could agree to assign users to the same interest 
group, for example if the sites are partnered together or they belong to the same ad network. 
Periodically the user's browser fetches ads designated for the interest groups, along with code to 
enable the browser to run an "auction" to choose an ad, for example based on whether the ad will be 
displayed near the top of the page. When the user visits a publisher site that displays ads from an 
ad network used by an advertiser site the user visited previously, ad network code in the page makes 
a request to the browser to run "auction" code to select an ad. The "winning" ad is displayed.


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

---

## Engage and share feedback

* **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), [raise 
questions and follow discussion](https://github.com/WICG/turtledove/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).


## Find out more

* [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

