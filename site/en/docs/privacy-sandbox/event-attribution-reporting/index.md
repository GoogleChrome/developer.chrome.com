---
layout: 'layouts/doc-post.njk'
title: 'Event Attribution Reporting'
subhead: >
  Measure when an ad click leads to a conversion, without using cross-site identifiers.
description: >
  The Event Attribution Reporting API enables the correlation of an event on a publisher's website with a subsequent conversion on an advertiser site without involving mechanisms that can be used to recognize a user across sites.
date: 2021-02-19
updated: 2021-02-19
authors:
  - maudnalpas
---

## When will this be available?

* Currently in [origin trial](https://web.dev/origin-trials/): Chrome 86 to 91. [Register for trial](https://developer.chrome.com/origintrials/#/view_trial/3411476717733150721).
* [Demo](https://goo.gle/demo-event-level-conversion-measurement-api).

[Might want to replace this video with short version as for other APIs.]

{% YouTube 
	id='jcDfOoWwZcM' 
%}

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


## Glossary

{% Aside %}
You may also want to consult the complete [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).
{% endAside %}

- **Adtech platforms**: companies that provide software and tools to enable brands or agencies to
  target, deliver, and analyze their digital advertising.
- **Advertisers**: companies paying for advertising.
- **Publishers**: companies that display ads on their websites.
- **Click-through conversion**: conversion that is attributed to an ad click.
- **View-through conversion**: conversion that is attributed to an ad impression (if the user
  doesn't interact with the ad, then later converts).


## Who needs to know about this API: adtech platforms, advertisers, and publishers

- **Adtech platforms** such as **[demand-side
  platforms](https://en.wikipedia.org/wiki/Demand-side_platform)** are likely to be interested in
  using this API to support functionality that currently relies on third-party cookies. If you're
  working on conversion measurement systems: [try out the demo](#demo), [experiment with the
  API](#experiment-with-the-api), and [share your feedback](#share-your-feedback).
- **Advertisers and publishers relying on custom code for advertising or conversion measurement**
  may similarly be interested in using this API to replace existing techniques.
- **Advertisers and publishers relying on adtech platforms for advertising or conversion
  measurement** don't need to use the API directly, but the [rationale for this
  API](#why-is-this-needed) may be of interest, particularly if you are working with adtech
  platforms that may integrate the API.


## Why is this API needed?

Today, ad conversion measurement often relies on [third-party
cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies). **But
browsers are restricting access to these.**

Chrome plans on [phasing out support for third-party
cookies](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html) and [offers
ways for users to block them if they
choose](https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en). Safari
[blocks third-party
cookies](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), Firefox [blocks
known third-party tracking
cookies](https://blog.mozilla.org/blog/2019/09/03/todays-firefox-blocks-third-party-tracking-cookies-and-cryptomining-by-default),
and Edge [offers tracking
prevention](https://support.microsoft.com/en-us/help/4533959/microsoft-edge-learn-about-tracking-prevention?ocid=EdgePrivacySettings-TrackingPrevention).

Third-party cookies are becoming a legacy solution. **New purpose-built APIs are emerging** to
address in a privacy-preserving way the use cases that third-party cookies solved. To name a few:

- The Event Attribution Reporting API helps measure click-through conversions for now, and maybe
  view-through conversions in future iterations.
- The [Aggregate Conversion Measurement
  API](https://github.com/WICG/conversion-measurement-api/blob/master/AGGREGATE.md) provides rich
  reports to advertisers by [aggregating conversions from multiple
  clients](https://github.com/WICG/conversion-measurement-api/blob/master/SERVICE.md).
- [Trust Tokens](https://web.dev/trust-tokens/) help combat fraud and distinguish bots from humans.

{% Aside %}
**How does the Event Attribution Reporting API compare to third-party cookies?**

* It's **purpose-built** to measure conversions, unlike cookies. This in turn can enable browsers to
  apply more enhanced privacy protections.
* It's **more private**: it makes it difficult to recognize a user across two different top-level
  sites, for example to link publisher-side and advertiser-side user profiles. See how in [How
  this API preserves user privacy](#how-this-api-preserves-user-privacy).
{% endAside %}


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
1. Using the Event Attribution Reporting JavaScript API, the advertiser site asks the browser to record data for the conversion.
1. The browser correlates the click data stored previously with the conversion data.
1. Later, the browser sends a conversion report to the advertiser.

In order to measure the effectiveness of ad campaigns, advertisers and publishers need to know when an ad click or view leads to a conversion, such as a purchase or sign-up. Historically this has been done with third-party cookies, but browsers are restricting access to these.

The Event Attribution Reporting API enables correlation of an event on a publisher's website (such as a user clicking on an ad) to be correlated with a subsequent conversion on an advertiser site—without involving mechanisms that can be used to recognize a user across sites.

This API only supports click-through conversion measurement. View-through conversion measurement isn't supported yet, because view-through conversions are harder to measure in a truly privacy-preserving way. Exploration is underway for a new version of the API, which would also support view conversion attribution.


## Find out more

* [A more private way to measure ad conversions](https://web.dev/conversion-measurement/)
* [API technical explainer](https://github.com/WICG/floc)
* [Digging into the Privacy Sandbox](web.dev/digging-into-the-privacy-sandbox)
* [The Privacy Sandbox on chromium.org](chromium.org/Home/chromium-privacy/privacy-sandbox)