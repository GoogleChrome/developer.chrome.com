---
layout: 'layouts/doc-post.njk'
title: Privacy Sandbox FAQ
description: Frequently Asked Questions for the Privacy Sandbox.
date: 2021-03-02
updated: 2021-03-02
authors:
  - samdutton
---

{% Aside 'warning' %}
[For Googlers, March 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## General topics

### Where can I track implementation progress?

See [Implementation status for Privacy Sandbox APIs](/docs/privacy-sandbox/status/).

### Are the Privacy Sandbox APIs standardized or proprietary?

The Privacy Sandbox is a set of proposed web standards.   
By early 2021 there were:

+   30+ Privacy Sandbox proposals offered by Chrome and others.
+   400+ participants who joined W3C groups to provide input including the [Improving Web
    Advertising Business Group](https://www.w3.org/community/web-adv/participants) and the [Privacy
    Community Group](https://www.w3.org/community/privacycg/participants).
+   Five API implementations available for testing in Chrome.

### Browsers such as Safari and Mozilla have their own strategies for user privacy, which may be different from Chrome's approach. How can we deal with fragmentation and divergence from standards?

[...]

### Without third-party cookies or other tracking mechanisms, is there any functionality that will no longer be available? How might feature detection work?

[...]

## Trust Tokens

### What are the major use cases?

Convey trust in a user from one context to another, in order to help combat fraud and distinguish
bots from humans.

+   **Transfer trust signal from one site where there is a strong user trust signal to other
sites with a weaker trust signal.**  
    A trust signal is established by a high-interaction website and used on lower-interaction sites
    that don't have enough user interaction to establish a trust signal.
+   **Third-party anti-fraud provider**  
    Activity on individual sites may meet the threshold to determine that the user is likely
    trusted or fraudulent, at which point tokens can be given out that are then redeemed on other
    sites by that anti-fraud provider as a signal about how to classify the activity on the new site.
+   **Conglomeration issuers**  
    A number of entities in some conglomerate (such as partnered banks or partnered news outlets)
    all have the capability to issue tokens representing that a member of the conglomerate has a
    trust signal about a particular user. These tokens can be redeemed in other contexts where that
    signal might be valuable, such as online merchants or partnered news sites.

### How do Trust Tokens work?

See [Trust Tokens](/docs/privacy-sandbox/trust-tokens).

### Is tooling available?

From Chrome 90, DevTools enables [trust token
inspection](https://developers.google.com/web/updates/2021/01/devtools#trust-token) from the Network
and Application tabs. 

## Event Attribution Reporting

### Is this the same as the Event Conversion Measurement API?

Yes: the name has changed.

### What are the main use cases?

To attribute click-through conversions for now, and maybe view-through conversions in future
iterations.

### How does it work?

See [Event Attribution Reporting](/docs/privacy-sandbox/event-attribution-reporting).

### What about view-through conversions?

This API only supports click-through conversion attribution. View-through conversion attribution
isn't supported yet, because view-through conversions are harder to attribute in a truly
privacy-preserving way. This is an active area of work; you can read more about privacy
considerations in the [API
proposal](https://github.com/WICG/conversion-measurement-api#privacy-considerations).

### How does Event Attribution Reporting API compare to third-party cookies?

+   Purpose-built to attribute conversions, unlike cookies. This in turn can enable browsers
    to apply more enhanced privacy protections.
+   More private: it makes it difficult to recognize a user across two different top-level
    sites, for example to link publisher-side and advertiser-side user profiles. See how in
    [How this API preserves user privacy](https://web.dev/conversion-measurement/#how-this-api-preserves-user-privacy).

### What kind of businesses might benefit from the Event Attribution Reporting API?

Businesses that are using third-party cookies today to attribute conversions should benefit from the
API.  
More specifically:

+   Adtech platforms such as demand-side platforms are likely to be interested in using this
    API to support functionality that currently relies on third-party cookies.
+   Advertisers and publishers relying on custom code for advertising or conversion attribution
    may similarly be interested in using this API to replace existing techniques.
+   Advertisers and publishers relying on adtech platforms for advertising or conversion
    attribution don't need to use the API directly, but the rationale for this API may be of
    interest, particularly if you are working with adtech platforms that may integrate the API.

For more information see
[A more private way to measure ad conversions](https://web.dev/conversion-measurement/#who-needs-to-know-about-this-api:-adtech-platforms-advertisers-and-publishers).

### Can affiliate service providers continue their business using the Event Attribution Reporting API?

Yes. The Event Attribution Reporting API makes it possible to attribute conversions without
third-party cookies.   
If you're using third-party cookies, we encourage you to try out the API: 

+   [Try our demo](https://web.dev/using-conversion-measurement/#demo).   

    This takes about three minutes. 

+   [Build a small prototype locally](https://web.dev/using-conversion-measurement/#experiment-with-the-api-with-end-users).

    This should take about one hour. You can even clone the code from our demo to get started quickly.

+   [Register for an origin trial](https://web.dev/conversion-measurement/#browser-support-and-similar-apis) 
		to experiment with end-users.  

    This, of course, requires a bigger time investment.

Note that the currently available API is the first iteration of the API, so there are a few
limitations: it can attribute clicks but not views, and has only a last-click attribution model.
This is on the team's roadmap.

## FLoC

### How does it work?

See [FLoC](/docs/privacy-sandbox/floc).

### Can a browser's cohort change?

YES! A browser's cohort definitely can change! You probably don't visit the same websites every
week, and your browser's cohort will reflect that.  

A cohort represents a cluster of browsing activity, not a collection of people. The activity 
characteristics of a cohort are generally consistent over time, and cohorts are useful for ad
selection because they group similar recent browsing behaviour. Individual people's browsers will
float in and out of a cohort as their browsing behavior changes. Initially, we expect the browser to
recalculate its cohort every seven days.

### Will FLoC be opt-in or opt-out?

[TBC]

### How can users and websites opt out?

For users, the browser will provide a setting to opt out of FLoC. If a user chooses to   
opt out, their browser will not be assigned a cohort number and the browser will   
provide a no-cohort indicator if requested. Websites can opt out of FLoC by setting   
the [feature policy](https://developers.google.com/web/updates/2018/06/feature-policy)
`interest-cohort 'none'`.  

During the [FLoC origin trial](https://developer.chrome.com/origintrials/#/trials/active), websites
that don't use that feature policy mechanism will be included in the FLoC calculation if Chrome
detects that they are sites which load ads. ([Ad Tagging in Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md) explains how Chrome's ad detection mechanism works.) Websites can also, of course, 
simply not access or record the cohort numbers of their visitors.

### How does the browser work out its cohort?

The user's browser gets data from its FLoC service that describes a mathematical model for cohorts:
a multi-dimensional space that represents the browsing activity of all users. The browser then uses
the FLoC algorithm to work out which region of this "cohort space" (i.e. which cohort) most closely
matches its own recent browsing behaviour.   
How does this algorithm work? Before the FLoC origin trial begins, FLoC designers will provide
details of the initial "clustering technique" for working out the browser's cohort, and which pages
contribute to it from the browser's history. For example, the algorithm might only take into account
sites which have requested the browser's cohort number.

### As a web developer, how can I try out FLoC?

The FLoC API is very simple: just a single method to enable a site to access the browser's cohort
number. You can try this out from the Chrome DevTools console, or with our demo at floc.glitch.me:
console.log(document.interestCohort()).

### How does FLoC protect users from being associated with cohorts in ways that might reveal sensitive details about their browsing activity?

[TBC—see https://github.com/WICG/floc/issues/40, etc.]

### How is cohort size calculated?

[TBC] For the FLoC origin trial, sizes will be measured using Chrome Sync data, and will require at
least 1000 of those people in each cohort.  Of course, cohorts will be larger than that, since they
will also include lots of browsers belonging to people who don't use Chrome Sync.  
Chrome is building a new way to measure total cohort sizes that doesn't rely on Chrome Sync, and the
implementation will switch to that once it's ready.

## FLEDGE

### How does it work?
See [FLEDGE](/docs/privacy-sandbox/fledge).

### What are the main use cases?

Ad selection for remarketing.

### What's the difference between FLEDGE and TURTLEDOVE?

[FLEDGE](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) is a descendant of
[TURTLEDOVE](https://github.com/WICG/turtledove).   
The differences are mostly about separating the on-device role of the buyer and seller:

+   FLEDGE enables a 'trusted server' to provide access to real time data used by a worklet
    during bidding (without compromising privacy). Each interest group can have a
    trusted_bidding_signals_url and trusted_bidding_signals_keys attribute.  At auction time, the
    browser communicates with the trusted server to fetch the values for those keys, and then makes
    those values available to the generate_bid() function.
+   The advertiser (ad buyer) can store all sorts of data along with the interest group, to help
    it do better on-device bidding.