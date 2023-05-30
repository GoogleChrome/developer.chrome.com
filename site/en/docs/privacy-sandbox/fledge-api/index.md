---
layout: 'layouts/doc-post.njk'
title: 'Protected Audience API: developer guide'
subhead: >
  Developer guide for on-device ad auctions to serve remarketing and custom audiences,
  without cross-site third-party tracking.
description: >
  Developer guide for on-device ad auctions to choose relevant ads from
  previously visited websites, designed so it cannot be used by
  third parties to track user browsing behavior across sites.
date: 2022-01-27
updated: 2023-03-14
authors:
  - samdutton
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

For those new to the Protected Audience API, read the [Protected Audience API overview](/docs/privacy-sandbox/fledge)
for a high-level explanation of the proposal.

This post is written for developers as a technical reference for the most
recent iteration of the experimental Protected Audience API. A [demo](#demo) of a basic
Protected Audience API deployment is available, as are
[API references for ad buyers and sellers](#api-reference).

## Implementation status

{% Partial 'privacy-sandbox/timeline/fledge.njk' %}

## What is the Protected Audience API? {: #what}

The Protected Audience API is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve
[remarketing](/docs/privacy-sandbox/fledge#remarketing) and custom audience use
cases, designed so that it cannot be used by third parties to track user
browsing behavior across sites. The API enables on-device auctions by
the browser, to choose relevant ads for websites the user has previously visited.

The Protected Audience API is the first experiment to be implemented in Chromium within the
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.

## Try the Protected Audience API {: #try-fledge}

### Available API reference {: #api-reference }

This document serves as an overview of the Protected Audience API. If you're looking for specific API methods and parameters:

* Buyers guide for [`joinAdInterestGroup()` and `generateBid()`](/docs/privacy-sandbox/fledge-api/interest-groups).
* Seller's guide for the Protected Audience API
  [`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction)
* Buyers guide to [`reportWin()`](/docs/privacy-sandbox/fledge-api/reports) and
  sellers guide to [`reportResult()`](/docs/privacy-sandbox/fledge-api/reports)
* [Troubleshoot the Protected Audience API](/docs/privacy-sandbox/fledge-api/troubleshoot)

You can also read [Protected Audience API ad auction latency best practices](/docs/privacy-sandbox/fledge-api/latency).

### Protected Audience API demo {: #demo}

A walk-through of a basic Protected Audience API deployment across advertiser and publisher
sites is available at [fledge-demo.glitch.me](https://fledge-demo.glitch.me/).

<figure>
{% YouTube
  id='znDD0gkdJyM'
%}
<figcaption>
  Watch this end-to-end deployment to learn how the Protected Audience API demo code works and how to use Chrome DevTools for debugging.
</figcaption>
</figure>

### Take part in the origin trial {: #origin-trial}

The [Privacy Sandbox Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial)
has been made available in Chrome Beta 101.0.4951.26 and above on desktop for
the Protected Audience API, [Topics](/docs/privacy-sandbox/topics/), and
[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) APIs.

To take part, [register for an origin trial token](/origintrials/#/view_trial/771241436187197441).

Once you have successfully enrolled in the trial, you can try out the Protected Audience API
API on pages that provide a valid trial token. For example, to ask
the browser to [join one or more interest groups](#joinadinterestgroup),
and then to run an ad auction to select and display an ad.

Provide a trial token for every page on which you would like to run Protected Audience API code:

*  As a meta tag in the `<head>`:
  ```html
  <meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
  ```

*  As an HTTP header:
  ```text
  Origin-Trial: TOKEN_GOES_HERE
  ```

*   By providing a token programmatically:

  ```javascript
  const otMeta = document.createElement('meta');
  otMeta.httpEquiv = 'origin-trial';
  otMeta.content = 'TOKEN_GOES_HERE';
  document.head.append(otMeta);
  ```

An iframe running Protected Audience API code—such as a
[`navigator.joinAdInterestGroup()`](#joinadinterestgroup)
call by an interest group owner—will need to provide a token that matches its origin.

[Proposed First Protected Audience API Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
provides more details about the goals of the first trial and explains what
features are supported.

{% Aside 'caution' %}

Not all users are eligible for the Privacy Sandbox Relevance and Measurement
origin trial, even on pages that provide a valid trial token.

The [Relevance and measurement unified origin trial overview](/docs/privacy-sandbox/unified-origin-trial#eligible-users)
explains why this is so, and shows how you can (and should) detect if an origin 
trial feature is available before attempting to use it.

{% endAside %}

### Test with `chrome://flags` or feature flags {: #flags}

You can test the Protected Audience API for a single user in Chrome Beta 101.0.4951.26 and above on
desktop:

* Enable `chrome://flags/#privacy-sandbox-ads-apis`.
* [Set flags from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).
  The full list of available Protected Audience API flags can be found in
  [Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/about_flags.cc;l=7135;drc=e50bce9adfbbac13d8ec1017f9239fe1ae06cc72).

#### Render ads in iframes or fenced frames

Ads can be rendered in an `<iframe>` or a
[`<fencedframe>`](/docs/privacy-sandbox/fenced-frame/),  depending on which
flags are set.

To use `<fencedframe>` to render ads:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

To use `<iframe>` to render ads:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,AllowURNsInIframes --disable-features=FencedFrames
```

Include the `BiddingAndScoringDebugReportingAPI` flag to enable
[temporary debug loss/win reporting methods](#temporary-reporting).

{% Aside %}

This is an in-progress version of the Protected Audience API for early testing. It shouldn't be
considered complete or indicative of the final implementation. Protected Audience API progress
and status are discussed in the regular WICG meetings.

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing for Protected Audience API and other Privacy Sandbox proposals.

{% endAside %}

## Supported features

Protected Audience API behind feature flags in Chromium is a first experiment to test the
following features of the Protected Audience API proposal:

-  **Interest groups**: stored by the browser, with associated metadata to
   configure ad bidding and rendering.
-  **On-device bidding by buyers (DSP or advertiser)**: based on stored
   interest groups and signals from the seller.
-  **On-device ad selection by the seller (SSP or publisher)**: based on
   auction bids and metadata from buyers.
-  **Ad rendering in a temporarily relaxed version of Fenced Frames**: with
   network access and logging allowed for ad rendering.

Read more about feature support and constraints in the 
[Protected Audience API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary).

### Interest group permissions

The default for the current implementation of the Protected Audience API is to allow calling
[`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups)
from anywhere in a page, even from cross-domain iframes.

In the future, once site owners have had time to update their cross-domain
iframe [permissions policies](/docs/privacy-sandbox/permissions-policy/), the
plan is to disallow calls from cross-domain iframes.

### Key/Value service

To support the Protected Audience API ad auction, the browser can access a
[key/value service](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)
to retrieve real-time information which supports the Protected Audience API ad auction.  This
information could be used in a number ways:

*  Buyers may want to calculate the remaining budget in an ad campaign.
*  Sellers may be required to check ad creatives against publisher policies.

The [Protected Audience API key/value service code](https://github.com/privacysandbox/fledge-key-value-service)
is now available. Check out the [announcement blog post](/blog/open-sourcing-fledge-key-value-service/) for the status update.

For initial testing, a "[Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)"
model was introduced. In the long-term, ad techs will need to use the
open-source Protected Audience API Key/Value services running in trusted execution
environments.

Refer to the [Protected Audience API services blog post](/blog/fledge-service-overview/#timeline)
for timeline updates. We'll provide substantial notice for developers to begin
testing and adoption before this transition takes place.

### Detect feature support

Before using the API, check if it's supported by the browser and available in
the document:

```javascript
'joinAdInterestGroup' in navigator &&
  document.featurePolicy.allowsFeature('join-ad-interest-group') &&
  document.featurePolicy.allowsFeature('run-ad-auction') ?
  console.log('navigator.joinAdInterestGroup() is supported on this page') :
  console.log('navigator.joinAdInterestGroup() is not supported on this page');
```

{% Aside 'caution' %}

Feature support on the current page isn't a guarantee that an API is usable.
The user may have disabled the API via browser settings, or they may have other
settings that prevent the API from being used. In order to protect user
privacy, there is no way to check for this programmatically.

{% endAside %}

## How does the Protected Audience API work? {: #how}

In this example, a user browses the website of a custom bike maker, then later
visits a news website and is shown an ad for a new bike from the bike maker.

{% Aside 'warning' %}

Not all features described in this post have been implemented (or fully
implemented) in the version of the Protected Audience API currently being tested in Chrome.
[Test with feature flags](#flags) explains what Protected Audience API features are currently
available for testing in Chrome run from the command line.

{% endAside %}

Features of the Protected Audience API will be added over time as work on implementation progresses.

### 1. A user visits an advertiser site

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png",
  alt="A person visiting a custom bike manufacturer site in a browser on their laptop.",
  width="400", height="190"
%}
</figure>

Imagine that a user visits the website of a custom bike maker (the advertiser)
in this example) and spends some time on the product page for a handmade steel
bike. This provides the bike maker with a
[remarketing](/docs/privacy-sandbox/glossary#remarketing) opportunity.

### 2. The user's browser is asked to add an interest group {: #joinadinterestgroup}

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png",
  alt="A user opens a browser on their laptop and visits a site. JavaScript
  code for joining ad interest groups is running in the browser.", width="400", height="187" %}
</figure>

The advertiser's demand-side platform (DSP) (or the advertiser itself) calls
`navigator.joinAdInterestGroup()` to ask the browser to add an interest group
to the list of groups the browser is a member of.

In this example, the group is named `custom-bikes`, and the owner is `dsp.example`. The interest group owner (in this case, the DSP) will be a buyer
in the Protected Audience API ad auction. Interest group membership is stored by the browser,
on the user's device, and is not shared with the browser vendor or anyone else.

* **Read the Protected Audience API explainer**: [Browsers Record Interest Groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups).
* **Read the API guide**: buyers and DSPs, learn how to
  [`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups) and generate bids.

{% Aside %}
The origin of the calling context for `joinAdInterestGroup()` must match the
interest group owner's origin.

[`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups) must be called from an iframe owned by the interest group owner (for example, from a DSP). If the origin of the current document is the same as the interest group owner (for example, a website with its own interest groups), no iframe is needed.
{% endAside %}

#### Specify ads for an interest group

`ads` and `adComponents` objects include a URL for an ad creative and,
optionally, arbitrary metadata that can be used at bidding time. For example:

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

#### How do buyers make bids? {: #generatebid}

`generateBid()` is called for each interest group that the browser is a member
of&mdash;if the interest group's owner is invited to bid.

Read the [`generatedBid()` developer documentation](/docs/privacy-sandbox/fledge-api/interest-groups#generatebid).

### 3. The user visits a site that sells ad space

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png",
  alt="A person visits a news website in a browser on their laptop. The site
  has an empty ad slot.", width="400", height="182" %}
</figure>

Later, the user visits a site that sells ads space, in this example a news
website. The site has ad inventory, which it sells programmatically with
real-time bidding.

### 4. A ad auction is run in the browser {: #ad-auction}

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png",
  alt="A person views a news website in a browser on their laptop. A Protected Audience API ad auction is run to pick an ad for the available ad space.", width="400", height="182" %}
</figure>

The ad auction is likely to be run by the publisher's supply-side provider
(SSP), or the publisher itself. The purpose of the auction is to select the
most appropriate ad for a single available ad slot on the current page. The
auction takes into account the interest groups the browser is a member of,
along with data from ad-space buyers and the sellers from the
[Key/Value services](#keyvalue-service).

* **Read the Protected Audience API explainer**: [Sellers Run On-Device Auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)
* **Read the API guide**: sellers can learn more about
  [`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction/) and the [ad auction latency best practices](/docs/privacy-sandbox/fledge-api/latency).

### 5. The seller and participating buyers request real-time data from the Key/Value service

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png",
  alt="The user views a news website in a browser on their laptop. An ad
  auction using the Protected Audience API is taking place, with a participant getting data from the Key/Value service.", width="400", height="126" %}
</figure>

During an ad auction, the seller can request real-time data about specific ad
creatives by making a request to their [Key/Value service](#keyvalue-service).
The seller can request this information during
[`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction/) by the `trustedScoringSignalsUrl` property,
along with the keys from the `renderUrl` properties of all entries in the `ads`
and `adComponents` fields of all interest groups in the auction.

A buyer can request real-time data from their Key/Value service using
the `trustedBiddingSignalsUrl` and `trustedBiddingSignalsKeys` properties of
the interest group argument passed to `navigator.joinAdInterestGroup()`.

When  `runAdAuction()` is called, the browser makes a request to each ad
buyer's trusted server. The URL for the request might look like this:

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

* The base URL comes from `trustedBiddingSignalsUrl`.
* The `hostname` is provided by the browser.
* The `keys` value is taken from `trustedBiddingSignalsKeys`.

The response to this request is a JSON object providing values for each of the
keys.

* **Read the Protected Audience API explainer**: [Fetching Real-Time Data from the Protected Audience API Key/Value service](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server).
* Read **[open sourcing the Protected Audience API Key/Value service](/blog/open-sourcing-fledge-key-value-service/)**.

{% Aside 'gotchas' %}
While in the initial experimental phase of testing the Protected Audience API,
`trustedBiddingSignalsUrl` must have the same origin as the interest group
owner. Learn more in [Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server).
{% endAside %}

### 6. The winning ad is displayed

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png",
  alt="A person views a news website in a browser on their laptop. An ad
  for 20% off a bike is displayed in a secure fenced frame.",
  width="400", height="192"
%}
</figure>

The promise returned by [runAdAuction()](/docs/privacy-sandbox/fledge-api/ad-auction/) resolves to a fenced frame config object (`FencedFrameConfig`) when the`resolveToConfig` flag is set to `true` in the auction config. The frame config is used by a fenced frame to navigate the frame to the winning ad, but the URL of the ad is not visible to the frame embedder.

{% Aside ‘important’ %}
The `FencedFrameConfig` object is returned only when the flag `resolveToConfig` is set to `true` in the auction config. If the flag is not set, or is `false`, an opaque [URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) will be returned which can only be rendered in an iframe.
{% endAside %} 

Fenced frame config object is available starting from M114. For more on the `FencedFrameConfig` object, see the [Chrome blog article](/docs/privacy-sandbox/fenced-frame). 

* **Read the Protected Audience API explainer**: [browsers render the winning ad](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

### 7. The auction result is reported

The long-term plan is to allow the browser to report auction results for the
seller and buyers using the [Private Aggregation APIs](/docs/privacy-sandbox/private-aggregation).

As a temporary event-level reporting mechanism, the code implementing
`reportResult()` for the seller, and `reportWin()` for the winning bidder, can
call the `sendReportTo()` function. This takes a single argument: a string
representing a URL that is fetched after the auction completes, which encodes
event-level information to be reported.

* **Read the API guide**: learn about [seller and buyer reporting](/docs/privacy-sandbox/fledge-api/reports)

### 8. An ad click is reported

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png",
  alt="A person clicks on an ad for a bike, embedded with a fenced frame, on a news website. The report data is sent to seller and buyers.",
  width="600", height="220"
%}
</figure>

A click on an ad rendered in a fenced frame is reported. To learn more about
how this might work, see [Fenced Frames Ads Reporting](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent).

<hr>

{: #auction-diagram}

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="An overview of each stage of a Protected Audience API ad auction",
  width="800", height="481"
  %}
  <figcaption>
    This diagram outlines each stage of a Protected Audience API auction. <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
      target="_blank">View a larger version</a>.
   </figcaption>
</figure>

{% Details %}

{% DetailsSummary %}
### What is the difference between the Protected Audience API and TURTLEDOVE?

{% endDetailsSummary %}

The Protected Audience API is the first experiment to be implemented in Chromium within the
TURTLEDOVE family of proposals.

The Protected Audience API follows TURTLEDOVE's high-level principles. Some online advertising has
been based on showing an ad to a potentially-interested person who has
previously interacted with the advertiser or ad network. Historically this has
worked by the advertiser recognizing a specific person as they browse across
web sites, a core privacy concern with today's web.

The TURTLEDOVE effort is about offering a new API to address this use case
while offering some key privacy advances:

-  The browser, not the advertiser, holds the information about what the
  advertiser thinks a person is interested in.
-  Advertisers can serve ads based on an interest, but cannot combine that
  interest with other information about a person&mdash;in particular, who they
  are or what page they are visiting.

The Protected Audience API grew out of TURTLEDOVE and a collection of related proposals for
modifications to better served the developers who would be using the API:

-   In [SPARROW](https://github.com/WICG/sparrow):
   [Criteo](https://www.admonsters.com/what-is-sparrow/) proposed the addition
   of a ("Gatekeeper") service model running in a [trusted execution environment (TEE)](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment). The Protected Audience API includes a more limited use of TEEs, for real-time data lookup and aggregated reporting.
-  NextRoll's [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) and
  Magnite's [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md)
  proposals described the different roles that buyers and sellers had in the
  on-device auction. The Protected Audience API's ad bidding/scoring flow is based on this work.
-  RTB House's [Outcome-based](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md)
  and [Product-level](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md)
  TURTLEDOVE modifications improved the anonymity model and personalization
  capabilities of the on-device auction
-  [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) is
   Microsoft's proposal for a TURTLEDOVE-like ad service that relies on a proxy
   server running in a TEE between the browser and the ad tech providers, to
   anonymize ad requests and enforce privacy
   properties. The Protected Audience API has not adopted this proxying model.  We are bringing
   the JavaScript APIs for PARAKEET and the Protected Audience API into alignment, in support of
   future work to further combine the best features of both proposals.

The Protected Audience API does not yet prevent a website's ad network from learning which ads a person sees. We expect to modify the API to become more private over time.

{% endDetails %}

{% Details %}

{% DetailsSummary %}
### Can the Topics API be used with the Protected Audience API? 

{% endDetailsSummary %}
Yes. An observed topic for the current user, provided by the [Topics API](/docs/privacy-sandbox/topics/), could be used as 
contextual information by a seller or bidder. A topic could be included in
the following properties:

*  `auctionSignals`, a property of the auction configuration object passed to `navigator.runAdAuction()`
*  `userBiddingSignals`, a property of the interest group configuration
   object passed to `navigator.joinAdInterestGroup()`
   
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Available browser configuration {: #user-controls}

{% endDetailsSummary %}

Users can adjust their participation for Privacy Sandbox trials in Chrome by
enabling or disabling the top-level setting in
`chrome://settings/privacySandbox`.

During initial testing, people will be able to use this high-level Privacy
Sandbox setting to opt-out of the Protected Audience API. Chrome plans to allow users to see and
manage the list of interest groups that they have been added to across the web
sites they have visited. As with the Privacy Sandbox technologies themselves,
user settings may evolve with feedback from users, regulators and others.

We'll continue to update the available settings in Chrome as the Protected Audience API
proposal progresses, [based on tests and feedback](/docs/privacy-sandbox/proposal-lifecycle/#collaborate).
In the future, we plan to offer more granular settings to manage the Protected Audience API and
associated data.

API callers can't access group membership when users browse in Incognito mode,
and membership is removed when users clear their site data.

{% endDetails %}

{: #engage}
 
## Engage and share feedback

### Get support {: #get-support }

To ask a questions and get support with your implementation, the demo, or the
documentation:

*  **GitHub**: Read the
  [proposal](https://github.com/WICG/turtledove/blob/main/FLEDGE.md), 
   [raise questions, and follow  discussion](https://github.com/WICG/turtledove/issues).
* **Demo**: Raise an issue on the [demo code repository](https://github.com/JackJey/fledge-demo).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support 
   repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
   Select the issue template for the Protected Audience API.
* **Chrome implementation**: for bugs or issues with Chrome's implementation of
  the Protected Audience API, you can [view existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)
  or [raise a new issue](https://crbug.com/new).

For more general questions about meeting your needs with the Protected Audience API, 
[file an issue on the proposal repository](https://github.com/WICG/turtledove/issues/new).
You can also discuss industry use cases in the W3C's
[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).

Use the Privacy Sandbox [feedback form](/docs/privacy-sandbox/feedback/#feedback-form)
to share feedback privately with the Chrome team outside of public forums.

#### Opt-out {: #opt-out}

Want to opt-out of the Protected Audience API? Learn how to
[block access to the Protected Audience API](/docs/privacy-sandbox/fledge-api/opt-out/),
as a site owner or an individual user.

### Get updates

- For notifications of API status changes, join the
  [mailing list for developers](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce).
- To closely follow all ongoing discussions on the API, click the **Watch** button on the [proposal page on
  GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md). This requires you have or [create a GitHub
  account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
- To get overall updates on the Privacy Sandbox, subscribe to the RSS feed
  [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/).
- [Join the scheduled calls for the Protected Audience API](https://github.com/WICG/turtledove/issues/88)
  (every   second week). Everyone is welcome to join&mdash;to participate,
  first make sure to [join the WICG](https://www.w3.org/community/wicg/). You
  can actively participate or just listen in!
