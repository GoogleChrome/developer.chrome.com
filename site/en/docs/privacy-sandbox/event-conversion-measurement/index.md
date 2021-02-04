---
layout: 'layouts/doc-post.njk'
title: 'Event Conversion Measurement'
subhead: >
  A new web API available as an origin trial measures when an ad click leads to a conversion, without using cross-site identifiers.
description: >
  The Event Conversion Measurement API enables the correlation of an event on a publisher's website with a subsequent conversion on an advertiser site without involving mechanisms that can be used to recognize a user across sites.
date: 2021-01-04
updated: 2021-01-04
authors:
  - samdutton
---

## What is Event Conversion Measurement?

### Today
Blah

### Future
Blah

## How does it work?

1. A user visits a page on a publisher website.
1. The publisher website requests an ad from an ad platform.
1. The ad platform responds with code for an ad.
1. The publisher incorporates the ad code on the web page. The code for the ad includes a link element with special attributes:
`conversiondestination`: where the conversion is expected to take place.
`impressiondata`: a unique ID for the click.
`reportingorigin`: an optional destination for reporting conversions.
`impressionexpiry`: maximum time for conversion attribution after the ad is clicked.
1. The user clicks on the ad.
1. Using the attribute values from the ad link element, the browser stores data for the click securely on the user's device.
1. The browser navigates to the destination of the ad link: the advertiser's website.
1. At some point, the user makes a purchase on the advertiser's site.
1. Using the Conversion Measurement JavaScript API, the advertiser site asks the browser to record data for the conversion.
1. The browser correlates the click data stored previously with the conversion data.
1. Later, the browser sends a conversion report to the advertiser.

In order to measure the effectiveness of ad campaigns, advertisers and publishers need to know when an ad click or view leads to a conversion, such as a purchase or sign-up. Historically this has been done with third-party cookies, but browsers are restricting access to these.

The Event Conversion Measurement API enables correlation of an event on a publisher's website (such as a user clicking on an ad) to be correlated with a subsequent conversion on an advertiser site—without involving mechanisms that can be used to recognize a user across sites.

This API only supports click-through conversion measurement. View-through conversion measurement isn't supported yet, because view-through conversions are harder to measure in a truly privacy-preserving way. Exploration is underway for a new version of the API, which would also support view conversion attribution.
