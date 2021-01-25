---
layout: 'layouts/blog-post.njk'
title: Progress update on the Privacy Sandbox initiative
authors:
  - justinschuh
  - marshallvale
description: >
  The Privacy Sandbox proposes a set of privacy-preserving APIs to support business models that fund the open web in the absence of tracking mechanisms like third-party cookies. This post provides an update on the status of the APIs and proposals.
date: 2021-01-25
hero: image/80mq7dk16vVEg8BBhsVe42n6zn82/yxxyZycGJzpQaSXsGfT3.jpg
alt: Flock of birds over water, Yamuna Ghat, New Delhi, India
tags:
  - privacy
  - security
---

[The Privacy Sandbox initiative](https://web.dev/digging-into-the-privacy-sandbox/) proposes a set
of privacy-preserving APIs to support business models that fund the open web in the absence of
tracking mechanisms like third-party cookies. It was introduced in 2019, and Chrome shared updates
on progress in [January](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)
and [October](https://blog.chromium.org/2020/10/progress-on-privacy-sandbox-and.html) last year.  

After a year of incubation, 2021 will be a year of testing with continued [opportunities for the web
ecosystem to get involved](/blog/privacy-sandbox-participate). This post
provides an update on the status of the Privacy Sandbox APIs and proposals.

## Progress on key use cases

### Placing relevant ads on a site

Publishers and advertisers want to provide content, including ads, that is relevant and interesting
to the user. On today's web, people's interests are often gauged by observing what sites or pages
they visit, relying on third-party cookies or less-transparent and undesirable mechanisms like
device fingerprinting.

In March, with release 89, Chrome will launch an [origin trial](https://web.dev/origin-trials/) for
the [Federated Learning of Cohorts API](https://github.com/WICG/floc) (FLoC). FLoC proposes a new way
to reach people with relevant content and ads by clustering large groups of people with similar
browsing patterns, hiding individuals "in the crowd" and keeping their web history on their browser.
Today Google Ads is sharing [an update from their tests of the FLoC algorithm](https://blog.google/products/ads-commerce/2021-01-privacy-sandbox), 
which show that the proposed API could be similarly effective as third-party  cookies in serving 
relevant interest-based ads.

### Building first-party audiences

One of the use cases that has had exciting discussions in the standards community is around how
companies can build audiences, and reach prior visitors to their websites through remarketing. Last
year Chrome introduced [TURTLEDOVE](https://github.com/WICG/turtledove), a proposal that
addresses this use case, while providing the same privacy protections as the other proposals. A
website may ask the browser to store an Interest Group, including information about bidding and ad
display, and on-device bidding by potential ads buyers would be based on this Interest Group.

Chrome's new [FLEDGE](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) proposal ( First
"Locally-Executed Decision over Groups" Experiment) expands on TURTLEDOVE by incorporating new
concepts from many other contributed proposals. FLEDGE includes a way for on-device bidding
algorithms to use additional information from a new trusted server designed for this sole purpose.
To help early experimentation before the new trusted servers are available, we propose a "Bring Your
Own Server" model and expect to ship this first experiment during 2021.

### Measuring advertising effectiveness

When a marketer runs an ad campaign, it's important for them to understand how many people see each
ad and if this results in an action by the consumer such as a purchase or sign-up.

In September 2020, we opened up the [Event Conversion Measurement
API](https://web.dev/conversion-measurement/) for testing in public Chrome origin trials. It
allows marketers to measure conversions without the use of third-party cookies; instead, the browser
records clicks and conversions and shares an anonymized report. A future version of this technology
will also support "view-through conversions" (when people see an ad but act on it later).

To help marketers understand the audience reach of a particular ad campaign, in April 2020 we
published the [Aggregate Measurement API](https://github.com/csharrison/aggregate-reporting-api), 
which helps measure how many times unique users viewed an ad across multiple sites, again, without  
revealing data that could be used to identify individuals. This is made possible by reporting data 
only once it's met a certain threshold for aggregation. We're planning to open up the Aggregate 
Measurement API for testing via public origin trials in the first half of the year.

### Preventing fraud

Sites and publishers need to ensure they are able to distinguish spammers, fraudsters and bots from
real users. Last July we opened up the [Trust Tokens API](https://web.dev/trust-tokens/) for
testing. This supports evaluating a user's authenticity to combat fraud without needing to know the
user's identity. Chrome 89 introduces an origin trial to support a new type of Trust Token issuer
that can improve the detection of fraud originating on mobile devices while still safeguarding user
privacy.

## Cookie security improvements

In 2020, we also improved the safety of current web technology. The [SameSite cookie policy](https://web.dev/samesite-cookies-explained/) has been adopted by Chrome and Edge and is coming to Firefox soon, 
treating cookies as first-party, unless the developer indicates that they need to be accessed across 
sites. We've also rolled this out for Android webview and expect to enforce the "SameSite=Lax" 
default treatment beginning in apps targeting Android S.

New in this month's Chrome 88 release, we are strengthening this policy by [modifying the definition
of SameSite](https://web.dev/schemeful-samesite/) to prevent some forms of cross-site attacks,
including downgrading a connection's security. Now secure and insecure versions of the same host
domain, such as [https://site.example](https://site.example) and
[http://site.example](http://site.example), are considered as third-party context to each other.

We recognize that real-world websites can span multiple domains or country code domains (such as
.com, co.uk, and .de). With Chrome 89, we will be introducing **[First Party
Sets](https://github.com/privacycg/first-party-sets)** as an origin trial in Chrome so domain owners
can explicitly declare a group of related web domains as belonging to the same organization, and be
treated as "same party" to each other. Users can then for example stay logged in on a shopping site
even if the site experience spans multiple domains. [Sign up for the trial.
](https://www.chromium.org/updates/first-party-sets)

## Preventing covert tracking

We've also been making progress on changes in Chrome to prevent existing intrusive tracking
techniques, and enable mitigating workarounds:

+   In the coming weeks, we are completing the Chrome stable rollout of the new [User-Agent
    Client Hints (UA-CH) API](https://web.dev/user-agent-client-hints/) which enables developers
    to request specific information about a user's browser instead of getting it all by default. We
    encourage developers to begin migrating to the UA-CH API, as Chrome will eventually begin
    limiting the information available in the traditional User-Agent string which today can be used
    for fingerprinting.

+   Last week, we introduced [Gnatcatcher](https://github.com/bslassey/ip-blindness), a
    proposal that allows groups of users to send their traffic through the same privatizing server,
    effectively hiding their IP addresses from the site host. Gnatcatcher also ensures that sites
    requiring access to IP addresses for legitimate purposes such as abuse prevention can do so,
    subject to certification and auditing.

+   As we shared last October, we're also closing the ability for a site to observe other
    sites that a user might have visited through
    [caching](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)
    mechanisms. This ensures that cached resources can only be accessed by the site that made the
    original request, decreasing the risk of security attacks such as cross-site tracking and
    search attacks. This change will be rolled out to all Chrome users beginning in March with
    Chrome 89.

## Find out more

* [Digging in to the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox/)
* [The Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
* [How to participate in the Privacy Sandbox initiative](/blog/privacy-sandbox-participate/)
* [Privacy Sandbox in 2021: Testing a More Private Web](https://blog.chromium.org/)

---

<p>Photo by <a href="https://unsplash.com/@adityaries?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Aditya Saxena</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></p>
