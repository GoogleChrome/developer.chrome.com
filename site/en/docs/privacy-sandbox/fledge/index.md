---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE'
subhead: >
  A solution for remarketing use cases, designed so it cannot be used by third parties to track user browsing behaviour across sites.
description: >
  FLEDGE satisfies remarketing use cases, but is designed so it cannot be used by third parties to track user browsing behaviour across sites. The API enables on-device "auctions" by the browser, to choose relevant ads provided by websites the user has previously visited.
date: 2021-05-18
updated: 2021-09-10
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

{% Aside %}
FLEDGE is the first experiment to be implemented in Chromium within the 
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.
{% endAside %}

{% YouTube
  id='HkvmYKqnytw' 
%}

## Implementation status

* [API proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) is under discussion with
[WICG](https://www.w3.org/community/wicg/) and interest groups.
* [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) in
[Blink](https://www.chromium.org/blink).


## Why do we need FLEDGE?

Understanding user interests can enable more relevant ads than simply choosing ads based on site
content (contextual targeting) or by using information that the user provided to the site on which
the ad appears (first-party-data targeting). Traditionally, ad platforms have learned about user
interests by tracking their behaviour across sites. We need a way to present users with relevant ads
without cross-site tracking.

FLEDGE satisfies [remarketing](/privacy-sandbox/glossary/#remarketing) use cases, but is designed so
it cannot be used by third parties to track user browsing behaviour. The API enables on-device
"auctions" by the browser to choose relevant ads, based on websites the user has previously visited.

With FLEDGE:

* The user's browser, not the advertiser or ad tech platform, stores advertiser-defined interest
groups that the user's browser is associated with.
* The user’s browser combines interest group data with ad buyer/seller data and business logic to
conduct an "auction" to select an ad. This ad auction happens locally on the user's device, rather 
than sharing data with a third party.
* Ads can be selected for an interest group, but an advertiser cannot combine interest group data
with other information about a user—in particular, the identity of a person or the pages they visit.
An advertiser cannot learn about what pages a user views on a publisher site.
* Websites, and the ad networks used by those sites, cannot learn about their visitors' ad interests
or interest groups: ad selection is done on the user's browser.

In other words, FLEDGE keeps your interests and browsing activity private. For example, if you visit
an online shoe store and show an interest in running shoes, and then visit a news site that
displays ads (a publisher), the advertiser (the shoe store) doesn't learn what pages you're viewing
on the news site and the publisher (the news site) doesn't learn about your interest in running
shoes.


## How does FLEDGE work?

When a user visits a page on a site that wants to advertise its products or services (an advertiser)
the site can ask the user's browser to associate the user with specific interest groups for a
certain period of time (for example 30 days).

The interest group could be unique to the advertiser's website, so that it functions as a
remarketing list. Alternatively, multiple websites could agree to assign users to the same interest
group, for example if the sites are partnered together or they belong to the same ad network.
Periodically the user's browser fetches ads designated for interest groups, along with code that
provides instructions from advertisers for when an ad associated with an interest group should be
eligible for bidding in an on-device auction, for example only on inventory with ads near the top of
the page. When the user visits a publisher site that is configured to accept ads using the FLEDGE
API, and to display ads from an ad network used by an advertiser site the user visited previously,
ad network code in the page makes a request to the browser to run "auction" code to select an ad.
The "winning" ad is displayed.


1. A user visits a page on a site that wants to advertise its products, such as an online store.
1. The advertiser site (or the ad tech it uses) asks the user's browser to join an ad 'interest
group' by calling joinAdInterestGroup(), passing data including ads relevant to the user's browsing,
the ad platform host name, and URLs to access bidding logic and bidding signals.
1. The user visits a site such as a news publisher, that displays ads and is configured to accept
ads selected using FLEDGE.
1. The user's browser runs an 'auction' to choose an ad for inventory (ad slots) that can accept
FLEDGE-selected ads. The 'seller' in this auction might be the site itself or a third party acting on
its behalf, such as a supply-side platform. The 'buyers' are third parties bidding for the site's ad
inventory, such as demand-side platforms acting on behalf of advertisers. The seller in this ad
auction has three jobs:<br>
• Choose which buyers can participate.<br>
• Choose which bid is most desirable, based on each bid's price and metadata.<br>
• Report the auction outcome.<br>
1. The seller initiates the ad auction by calling runAdAuction(), with data including the host name
of the seller, signals from buyers and the seller, and a URL for auction decision logic.
1. The auction returns data about the winning ad. The data cannot be accessed by the publisher site,
except to render the ad in a Fenced Frame.
1. The ad is displayed.

---

## Engage and share feedback

* **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), [raise
questions and follow discussion](https://github.com/WICG/turtledove/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).
* **Developer support**: Ask questions and join discussions on the
[Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

* [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

