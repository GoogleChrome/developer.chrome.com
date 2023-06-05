---
layout: 'layouts/doc-post.njk'
title: 'Protected Audience API'
subhead: >
  On-device ad auctions to serve remarketing and custom audiences,
  without cross-site third-party tracking.
description: >
  A proposal for on-device ad auctions to choose relevant ads from
  websites a user has previously visited, designed so it cannot be
  used by third parties to track user browsing behavior across sites.
date: 2022-01-27
updated: 2022-08-23
authors:
  - samdutton
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

{% YouTube
  id='HkvmYKqnytw'
%}

## Who is this article for?

This article covers the basics of the Protected Audience API and explains some underlying
concepts, but doesn't go into much technical detail.

* If you work in **advertising or ad tech**, you'll get an overview of [how the Protected Audience API works](#overview).
* If you're a **developer or software engineer**, the [Protected Audience API Developer Guide](/docs/privacy-sandbox/fledge-api) provides more in-depth technical detail about the proposal and the [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)
  offers the latest conversation about Protected Audience API status in the browser.
* [The Protected Audience API demo](/docs/privacy-sandbox/fledge-api#demo) provides a walkthrough of a basic Protected Audience API deployment.

{% Aside %}
Refer to the [glossary](/docs/privacy-sandbox/glossary/) for terms used across Protected Audience API documentation.
{% endAside %}

At the end of this article is a link to [engage and share feedback](#engage).

## What is the Protected Audience API? {: #what}

The Protected Audience API is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve
[remarketing](/docs/privacy-sandbox/glossary/#remarketing) and custom audience
use cases, designed so third parties cannot track user browsing behavior across sites.

The API enables on-device auctions by the browser, to choose relevant ads from
websites the user has previously visited.

The Protected Audience API is the first experiment to be implemented in Chromium within the
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals. The
[Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing
information for the Protected Audience API and other Privacy Sandbox proposals.

### How does the Protected Audience API differ from Turtledove?

The differences between the Protected Audience API and Turtledove pertain mostly to separation of the on-device role
of the ad buyer and seller. The sections below explain how the Protected Audience API works.

### Protected Audience API in one minute {: #overview}

For a more in-depth overview of the Protected Audience API, read the
[Protected Audience API developer guide](/docs/privacy-sandbox/fledge-api/).

<figure class="w-figure">
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png", alt="An overview of each stage of the Protected Audience API lifecycle",
  width="800", height="366" %}
  <figcaption class="w-figcaption">
    The Protected Audience API lifecycle: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png?auto=format&w=1600" title="Click to view a larger version of image" target="_blank">view a larger version</a>.
  </figcaption>
</figure>

The Protected Audience API uses [interest groups](#interest-group-detail) to enable sites to
display ads that are relevant to their users.

For example, when a user visits a website that wants to advertise its products,
an interest group [owner](#interest-group-detail) (such as a
[demand side platform or DSP](/docs/privacy-sandbox/glossary/#dsp) working for the site) can ask the user's
browser to add membership for the interest group. The group owner (in this example, the DSP) does
this by calling the JavaScript function `navigator.joinAdInterestGroup()`. If the call is
successful, the browser records:

* The **name** of the interest group: for example, 'custom-bikes'.
* The **owner** of the interest group: for example, 'https://dsp.example'.
* Interest group **configuration information** to enable the browser to access
  bidding code, ad code, and real-time data, if the group's owner is invited to
  bid in an online ad auction. This information can be updated later by the
  interest group owner.

{% Aside %}

There are other use cases for interest groups; see the [examples of owners and types](#interest-group-types).

{% endAside %}

Later, when the user visits a site that sells ad space, the ad space seller
(most likely the site's 
[SSP](/docs/privacy-sandbox/glossary/#ssp), or the site itself) can use
the Protected Audience API to run an ad auction to select the most appropriate ads to display to the user. The seller
calls the `navigator.runAdAuction()` function, which provides a list of interest group owners who are invited to bid.

Bidding code is only run for interest groups that the browser is a member of,
and whose owners have been invited to bid.

Bidding code is retrieved from the URL provided in the configuration
information for the interest group. This code is passed data about the interest
group and information from the seller, along with contextual data about the
page and from the browser.

Each bidder is also known as a buyer.

When the browser calls the function to run the ad auction, each buyer's code generates
a bid with the help of real-time data provided by their
[Protected Audience API Key/Value service](#key-value-service-detail). Then, the seller receives these
bids as well as seller-owned real-time data, and scores each bid. The bid with the
highest score wins the auction.

The winning ad is displayed in a [fenced frame](/docs/privacy-sandbox/fenced-frame).
The ad creative's URL is specified in the bid, and the origin must match one in
the list provided by the interest group's configuration.

The seller can report the auction outcome (`reportResult()`), and buyers can
report their wins (`reportWin()`).

Learn how to [generate reports of the Protected Audience API auction results](/docs/privacy-sandbox/fledge-api/reports/).

## Why do we need the Protected Audience API? {: #why}

Understanding user interests can enable more relevant ads than simply choosing
ads based on site content (contextual targeting) or by using information that
the user provided to the site on which the ad appears (first-party data targeting).

Traditionally, ad platforms have learned about user interests by tracking their
behavior across sites. Browsers need a way to enable ad platforms to select
relevant ads, so content publishers can get ad revenue without cross-site
tracking.

The Protected Audience API experiment aims to move the web platform closer to a state where the
user's browser, on their device, not the advertiser or ad tech platforms, holds
information about what that person is interested in.

{% Aside 'warning' %}

Not all features described here have been implemented (in part or in full) in
the version of the Protected Audience API currently being tested in Chrome. The
[Protected Audience API developer guide](/docs/privacy-sandbox/fledge-api#try-fledge) explains which Protected Audience API
features are currently available for testing in Chrome run from the command line
using [feature flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

Features of the Protected Audience API will be added over time. While the [origin trial](/docs/privacy-sandbox/unified-origin-trial/)
is active, we'll regularly update a list of which features are already
implemented and what's still in progress.

{% endAside %}

## How can I try the Protected Audience API? {: #try-fledge}

* The [Protected Audience API developer guide](/docs/privacy-sandbox/fledge-api#try-fledge) describes how to
  take part in the Privacy Sandbox Relevance and Measurement origin trial and
  how to try out the Protected Audience API for a single user by setting Chrome flags.

* [fledge-demo.glitch.me](https://fledge-demo.glitch.me/) provides a
  walkthrough of a basic Protected Audience API deployment across advertiser and publisher
  sites.
   * [Watch the Protected Audience API demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
     to understand how the demo code works. The video also previews how to use
     Chrome DevTools for Protected Audience API debugging.

{% YouTube
  id='znDD0gkdJyM'
%}

### What browser configuration is available? {: #user-controls}

Users can adjust their participation for Privacy Sandbox trials in Chrome by
enabling or disabling the top-level setting in
`chrome://settings/privacySandbox`. During initial testing, users can opt out of the Protected Audience API using the
Privacy Sandbox settings. 

Chrome plans to allow users to see and manage the list of interest groups
they've been added to across the sites they've visited. As with the Privacy
Sandbox technologies, user settings may evolve with feedback from users,
regulators, and others.

We'll update the available settings in Chrome as the Protected Audience API proposal
progresses, [based on tests and feedback](/docs/privacy-sandbox/proposal-lifecycle/#testing).
In the future, we'll offer more granular settings to manage the Protected Audience API and
associated data.

API callers can't access group membership when users browse in Incognito mode,
and membership is removed when users clear their site data.

{: #opt-out-site}

### Can I opt out of the Protected Audience API? {: #opt-out}

Learn how you can [block access to the Protected Audience API](/docs/privacy-sandbox/fledge-api/opt-out),
either as a site owner or as an individual user.

### Can users block an ad shown as the result of a Protected Audience API auction? {: #ad-block }

Users can [opt out of the Privacy Sandbox API](/docs/privacy-sandbox/fledge-api/opt-out/#opt-out-user).
To opt out of a specific ad or ad selection technique, the appropriate party to
provide those controls is the ad tech serving the ad.

Developers can use multiple approaches to control which ads are eligible for
bidding and serving and record a user's ad preferences. One
technique is to call `leaveAdInterestGroup()` when a user asks to block a specific ad, for the winning interest group that provided the ad. This removes the user's browser from membership in the interest group and makes the group ineligible to bid in the future.

## Key concepts

{: #glossary}

Looking for more information on Protected Audience API terminology? Refer to the [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}
### What is an interest group?
{% endDetailsSummary %}

A Protected Audience API interest group represents a group of people with a common interest, corresponding to a
[remarketing](/docs/privacy-sandbox/glossary/#remarketing) list.

Every Protected Audience API interest group has an owner. Different types of owners will create different types of
interest groups with different use cases.

The owner asks the user's browser to add membership of their interest group by calling the
JavaScript function `navigator.joinAdInterestGroup()`, providing information such as data about ads
relevant to the interest group, and a URL for JavaScript used in bidding. Interest group data
(such as the ads) can be updated, and an interest group can be enabled for up to 30 days.

{% Aside %}

Interest groups are stored in the browser and can make bids in Protected Audience API
in-browser auctions, but aren't programmatically 'readable.' In other words,
there's nothing like navigator.getAdInterestGroups(), as this would expose cross-site
identity.

{% endAside %}

{: #interest-group-types}

The table below provides examples of different types of Protected Audience API interest groups and owners.

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="text-align: left; vertical-align: top;">Owner</th>
        <th style="text-align: left; vertical-align: top;">Example</th>
        <th style="text-align: left; vertical-align: top;">Interest</th>
        <th style="text-align: left; vertical-align: top;">Example</th>
        <th style="text-align: left; vertical-align: top;">Use cases</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;">Advertiser</td>
        <td style="vertical-align: top;">Bike maker</td>
        <td style="vertical-align: top;">Products</td>
        <td style="vertical-align: top;">People who viewed product pages for a particular category of bike.</td>
        <td style="vertical-align: top;"><a href="#remarketing" title="Glossary entry for remarketing">Remarketing</a> to people
        who have previously interacted with the brand.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">Publisher</td>
        <td style="vertical-align: top;">News website</td>
        <td style="vertical-align: top;">Content</td>
        <td style="vertical-align: top;">People who read about cycling.</td>
        <td style="vertical-align: top;">Publishers can use first-party data to enable advertisers
          to buy ads that are relevant to readers on their site. A publisher-owned interest group
          could let publishers do the same even when those people are browsing other sites.
          Publishers may be able to charge for the ability to show ads to specific segments of their
          audience.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">Ad tech</td>
        <td style="vertical-align: top;">DSP</td>
        <td style="vertical-align: top;">Category of products</td>
        <td style="vertical-align: top;">People who showed an interest in cycling gear.</td>
        <td style="vertical-align: top;">An ad tech company might create and manage an interest group
          of people they believe are in the market for some category of item. This interest group
          could then be used to advertise products on sites that sell things in that category (and
          who work with the ad tech company).</td>
      </tr>
    </tbody>
  </table>
</div>

{: #interest-group-limits}

Chrome allows up to 1000 interest groups per owner, and up to 1000 interest group
owners. These limits are meant as guard rails, not to be hit in regular operation.


{% endDetails %}


{: #buyer-detail}

{% Details %}

{% DetailsSummary %}
### What is a buyer?
{% endDetailsSummary %}

In the Protected Audience API, a buyer is a party that owns an [interest group](#interest-group-detail) and bids in an ad auction.

For example:

* **[Advertiser](/docs/privacy-sandbox/glossary/#advertiser)**: acting for itself.
* **[Demand-Side Platform](/docs/privacy-sandbox/glossary/#dsp)** (DSP): acting for advertisers.
* **Interest group owner**: working for multiple advertisers.

Buyers have three jobs:

* Choose whether to participate in an auction.
* Choose ads and calculate a bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the buyer that is run
during a Protected Audience API ad auction.

When a buyer asks a user's browser to add an interest group to the groups it is a member of (by calling the
JavaScript function `navigator.joinAdInterestGroup()`) the buyer provides the browser with:
* A URL for bidding code, that will be used when the [seller](/docs/privacy-sandbox/glossary/#seller) runs an [ad auction](/docs/privacy-sandbox/glossary/#ad-auction).
* Potentially, URLs for [ad creatives](/docs/privacy-sandbox/glossary/#creative) for the interest group. (Ad URLs may be added
later via an update.)
* A list of data [keys](#key-value) to be queried, and the URL of the buyer's [Key/Value service](#key-value-service-detail),
to enable bidding code to get real-time data during an auction.

The buyer's code can also include a `reportWin()` function to report the auction outcome.

{% endDetails %}

{: #seller-detail}

{% Details %}

{% DetailsSummary %}
### Who runs an ad auction?
{% endDetailsSummary %}

There are multiple parties that might run an auction to sell ad space.

For example:

* **Content publisher**: acting for itself to host ad content on its website.
* **[Supply-side platform](/docs/privacy-sandbox/glossary/#ssp)** (SSP): working with the publisher and providing other services.
* **Third-party script**: acting for a publisher, to enable participation in ad auctions.

With the Protected Audience API, an ad space [seller](/docs/privacy-sandbox/glossary/#seller) has three jobs:

* Enforce publisher rules: stating which buyers and which bids are eligible.
* Run auction logic: JavaScript run in
  [worklets](/docs/privacy-sandbox/glossary/#worklet) to calculate a
  desirability score for each bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the seller when it initiates an ad
auction by calling the JavaScript function `navigator.runAdAuction()`.

{% endDetails %}

{: #ad-auction}

{% Details %}

{% DetailsSummary %}
### How does a Protected Audience API ad auction work?
{% endDetailsSummary %}

{: #auction-diagram}

The diagram below outlines each stage of a Protected Audience API ad auction: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png",
    alt="Six stages in a Protected Audience API ad auction",
    width="800", height="481"
    %}
</figure>

<br>

In the Protected Audience API, an ad auction is a collection of small JavaScript programs the browser runs on the user's
device to choose an ad. To preserve privacy, all ad auction code from the seller and buyers is run
in isolated JavaScript [worklets](/docs/privacy-sandbox/glossary/#worklet) that can't talk to the outside world.

A seller (a publisher or a [supply-side platform](/docs/privacy-sandbox/glossary/#ssp))
initiates a Protected Audience ad auction on a site that sells ad space (such as a news
site). The seller chooses buyers to participate in the auction,
indicates what space is for sale, and provides additional criteria for the ad. Each buyer is the
owner of an interest group.

The seller provides the browser with code to score bids, which includes each bid's value, the
[ad creative](/docs/privacy-sandbox/glossary/#creative) URL, and other data returned from each buyer. During the auction, bidding
code from buyers and bid-scoring code from the seller can receive data from their
[Key/Value services](#key-value-service-detail). Once an ad is chosen and
displayed (in a [fenced frame](/docs/privacy-sandbox/fenced-frame/) to preserve
privacy), the seller and the winning bidder can report the auction result.

1. A user visits a site which displays ads.
2. The seller's code starts an auction. The seller specifies which ad space is
   for sale and who can bid, as well as a method to score those bids.
3. The invited buyer's code executes to generate a bid, URL for a relevant ad
   creative, and other data. The bidding script can query for real-time data,
   such as the remaining ad campaign budget, from the buyer's [Key/Value
   service](#key-value-service-detail).
4. The seller's code scores each bid and selects a winner. This logic uses the
   bid value and other data to return a bid's desirability and reject an ad that
   can't beat the contextual ad winner. The seller can use their own
   [Key/Value service](#key-value-service-detail) for real-time data.  Before
   an auction starts, the seller finds the best contextual ad for the available
   ad slot. 
5. The winning ad is returned as a fenced frame config object when the `resolveToConfig` flag is set in the auction config. The config is used to navigate the fenced frame to the ad creative, and the URL of the creative is hidden from both the seller and the publisher. If the `resolveToConfig` flag is set to `false` or not passed in, the winning ad is returned as an opaque [URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) that can be used to render the ad in an iframe. The fenced frame config object is available starting from M114.
6. The auction is reported to the seller and winning buyers. 
    {% Aside %}
    The seller's `reportResult()` and buyer's `reportWin()` can include a call to `sendReportTo()`. This is available [temporarily](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now), until aggregate reporting is available with [Private Aggregation](/docs/privacy-sandbox/private-aggregation).
    
    A reporting mechanism for losing buyers is [under discussion](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting).
    {% endAside %}

{% endDetails %}


{: #key-value-service-detail}

{% Details %}

{% DetailsSummary %}
### What is a Protected Audience API Key/Value service?
{% endDetailsSummary %}

The Protected Audience API Key/Value service allows ad techs to query for real-time data when a bid is made by the buyer, and for sellers to score ads while preserving privacy. You can read about the Protected Audience API Key/Value service and others in [Protected Audience API services](/blog/fledge-service-overview/). 

The Key/Value service is deployed to the ad tech's own cloud infrastructure, and the service runs in a [trusted execution environment](/docs/privacy-sandbox/glossary/#trusted-execution-environment). A request to a Key/Value service cannot result in event-level logging or have other side effects. The Key/Value service will also support [user-defined functions (UDFs)](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs) that allow ad techs to execute their own custom logic within the Key/Value service. 

{: #key-value}

A buyer or seller provides a list of 'keys' to specify the data they require from a Protected Audience API Key/Value service. The Key/Value service responds with a value for each key.

The Protected Audience API Key/Value service code is now available in a [Privacy Sandbox GitHub repository](https://github.com/privacysandbox/fledge-key-value-service). This service can be used by Chrome and Android developers. 

Learn more about the Protected Audience API Key/Value service from the
[API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)
and the [trust model explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md).

{% endDetails %}


{% Details %}

{% DetailsSummary %}
### How is real-time data incorporated into auctions?
{% endDetailsSummary %}

The [buyers](#buyer-detail) or [seller](#seller-detail) in an ad auction may need access to real-time
data. For example, bidders may want to calculate the remaining budget in an ad campaign, or the
seller may be required to check ad creatives against publisher policies.

To meet the privacy requirements of the Protected Audience API, real-time data required during an ad auction is provided by the [Key/Value service](#key-value-service-detail). When each buyer calls `navigator.joinAdInterestGroup()`, the buyer specifies a Key/Value service URL and specifies the keys to be queried to the service during an auction. Likewise, when the seller runs an ad auction by calling `navigator.runAdAuction()`, the seller provides a URL for its Key/Value service. The seller's Key/Value service will be queried with the render URL of the creative.

For initial testing, the ["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now) model is used. In the long term, ad techs will need to use the open-source Protected Audience API Key/Value services running in [trusted execution environments](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) for retrieving real-time data.

To ensure that the ecosystem has sufficient time to test, we don’t expect to require the use of the open-source Key/Value services or trusted execution environments until sometime after third-party cookie deprecation. We will provide substantial notice for developers to begin testing and adoption before this transition takes place.

{% endDetails %}

{: #engage}

## Find out more

For a more in-depth overview of the Protected Audience API, read the
[Protected Audience API developer guide](/docs/privacy-sandbox/fledge-api/).

### Developers

If you're ready to start working with the Protected Audience API, read
[experiment and participate](/docs/privacy-sandbox/fledge-experiment/).

We've written an  [API developer guide](/docs/privacy-sandbox/fledge-api) and built a [Protected Audience API demo](https://fledge-demo.glitch.me), which offers a walkthrough of a basic Protected Audience API deployment. The [Protected Audience API demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv) explains how the demo code works, and shows how to use Chrome DevTools for Protected Audience API debugging.

## Engage and share feedback

-  **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md),
   [raise questions and follow discussion](https://github.com/WICG/turtledove/issues).
-  **Announcements**: Join or view past announcements on the [Protected Audience API mailing list](https://groups.google.com/u/0/a/chromium.org/g/fledge-api-announce).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Developer support**: Ask questions about implementation and best practices, or join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-  **Current implementation**: For questions about the implementation currently available to test in
   Chrome: [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=fledge).
