---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE'
subhead: 'A solution for remarketing use cases, designed so it cannot be used by third parties to track user browsing behaviour.'
description: 'The FLEDGE API enables on-device "auctions" by the browser, on the user's device, to choose relevant ads, based on websites the user has previously visited. The API enables remarketing use cases, but is designed so it cannot be used by third parties to track user browsing behaviour.'
date: 2021-01-04
updated: 2021-01-04
authors:
  - samdutton
---

## What is the FLEDGE?

### Today
Blah

### Future
Blah

## How does it work?
1. A user visits a page on a site that wants to advertise its products, such as an online store.
2. The advertiser site (or the ad tech it uses) asks the user's browser to join an ad 'interest group' by calling joinAdInterestGroup(), passing data including ads relevant to the user's browsing, the ad platform host name, and URLs to access bidding logic and bidding signals.
3. The user visits a site that displays ads, such as a news publisher. 
4. The user's browser runs an 'auction' to choose an ad for an ad block on the site. The 'seller' in this auction might be the site itself or a third party acting on its behalf, such as a supply-side platform. The 'buyers' are third parties bidding for the site's ad inventory, such as demand-side platforms acting on behalf of advertisers. The seller in this ad auction has three jobs:
Choose which buyers can participate.
Choose which bid is most desirable, based on each bid's price and metadata.
Report the auction outcome.
The seller initiates the ad auction by calling runAdAuction(), with data including the host name of the seller, signals from buyers and the seller, and a URL for auction decision logic.
5. The auction returns data about the winning ad. The data cannot be accessed by the publisher site, except to render the ad in a Fenced Frame.
6. The ad is displayed.

When a user visits an advertiser's website, the site can ask the user's browser to associate the user with specific interest groups for a certain period of time (for example 30 days). 

The interest group could be unique to the advertiser's website, so that it functions as a remarketing list.  Alternatively, multiple websites could agree to assign users to the same interest group, for example if the sites are partnered together or they belong to the same ad network. 
Periodically the user's browser fetches ads designated for the interest groups, along with code to enable the browser to run an "auction" to choose an ad, for example based on whether the ad will be displayed near the top of the page. 
When the user visits a publisher site that displays ads from an ad network used by an advertiser site the user visited previously, ad network code in the page makes a request to the browser to run "auction" code to select an ad. The "winning" ad is displayed.

