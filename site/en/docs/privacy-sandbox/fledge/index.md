---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE API'
subhead: >
  A proposal for on-device ad auctions to serve remarketing and custom audiences, without cross-site third-party tracking.
description: >
  A Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third-parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads from websites the user has previously visited.
date: 2022-01-27
updated: 2022-08-23
authors:
  - samdutton
  - kevinkiklee
---

{% YouTube
  id='HkvmYKqnytw'
%}

## Who is this article for?

This article covers the basics of FLEDGE, and explains some underlying
concepts, but doesn't go into much technical detail.

* If you work in **advertising or adtech**, you'll gain an understanding of [how FLEDGE works](#how).
* If you're a **developer or software engineer**, the [FLEDGE API Developer Guide](/blog/fledge-api) provides more in-depth technical detail about the proposal.
* [The FLEDGE demo](https://fledge-demo.glitch.me) provides a walkthrough of a basic FLEDGE deployment.

{% Aside %}
<span role="img" aria-label="Thinking face">🧐</span> There is a [glossary](/docs/privacy-sandbox/glossary/) with terms used across FLEDGE documentation.
{% endAside %}

At the end of this post, learn how to [engage and share feedback](#engage).

## What is FLEDGE? {: #what}

FLEDGE is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve
[remarketing](/docs/privacy-sandbox/glossary/#remarketing) and custom audience
use cases, designed so that it cannot be used by third parties to track user browsing behavior across sites.

The API enables on-device auctions by the browser, to choose relevant ads from
websites the user has previously visited.

FLEDGE is the first experiment to be implemented in Chromium within the
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals. The
[Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing
information for FLEDGE and other Privacy Sandbox proposals.


### FLEDGE in one minute {: #overview}

<figure class="w-figure">
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png", alt="Illustration providing
  an overview of each stage of the FLEDGE lifecycle",
  width="800", height="366" %}
  <br>
  <figcaption class="w-figcaption">The FLEDGE lifecycle: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">view a larger version</a></figcaption>
</figure>

<br>

FLEDGE uses [interest groups](#interest-group-detail) to enable sites to display ads that are
relevant to their users.

For example, when a user visits a website that wants to advertise its products, an interest group
[owner](#interest-group-detail) (such as a [demand side platform or DSP](/docs/privacy-sandbox/glossary/#dsp) working for the site) can ask the user's
browser to add membership for the interest group. The group owner (in this example, the DSP) does
this by calling the JavaScript function `navigator.joinAdInterestGroup()`. If the call is
successful, the browser records:

* The **name** of the interest group: for example, 'custom-bikes'.
* The **owner** of the interest group: for example, 'https://dsp.example'.
* Interest group **configuration information** to enable the browser to access
  bidding code, ad code, and realtime data, if the group's owner is invited to
  bid in an online ad auction. This information can be updated later by the
  interest group owner.

{% Aside %}

There are other use cases for interest groups: see the [examples of owners and types](#interest-group-types).

{% endAside %}

Later, when the user visits a site that sells ad space, the ad space seller
(most likely the site's 
[SSP](/docs/privacy-sandbox/glossary/#ssp), or the site itself) can use
FLEDGE to run an ad auction to select the most appropriate ads to display to the user. The seller
calls the `navigator.runAdAuction() `function, which provides a list of interest group owners who are invited to bid.

Bidding code is only run for interest groups that the browser is a member of, and
whose owners have been invited to bid.

Bidding code is retrieved from the URL provided in the configuration information for the interest
group. This code must include a `generateBid()` function, which is passed data about the interest
group, and information from the seller, along with contextual data about the page and from the
browser. Each bidder is called a buyer.

When calling the `navigator.runAdAuction()` function, the seller provides code that includes a
`scoreAd()` function. This function is run for each bidder in the auction: to score each of the bids
returned by `generateBid()`. During the ad auction, the bidding code run for each buyer
(`generateBid()`) and the ad scoring code run for the seller (`scoreAd()`) can receive realtime data
from the [FLEDGE Key/Value service](#key-value-service-detail).

The bid with the highest score wins the auction. The ad associated with the bid
is displayed in a `<fencedframe>`, using the ad URL specified by the bid (which
must be one of the ad URLs from the list provided in the interest group's
configuration information).

To report the auction outcome, the seller's code can include a `reportResult()` function and each
buyer's code can include a `reportWin()` function.


## How can I try FLEDGE? {: #try-fledge}

* [FLEDGE API developer guide](/blog/fledge-api#try-fledge) describes how to take part in the
Privacy Sandbox Relevance and Measurement origin trial and how to try out FLEDGE for a single user
by setting Chrome flags.

* [fledge-demo.glitch.me](https://fledge-demo.glitch.me/) provides a walkthrough of a basic FLEDGE
deployment across advertiser and publisher sites.

* [The FLEDGE demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
explains how the demo code works, and shows how to use Chrome DevTools for FLEDGE debugging.

{% YouTube
  id='znDD0gkdJyM'
%}

### What browser configuration is available? {: #user-controls}

Users can adjust their participation for Privacy Sandbox trials in Chrome by enabling or disabling
the top-level setting in `chrome://settings/privacySandbox`. During initial testing, people can use the Privacy Sandbox setting to opt out of FLEDGE. 

Chrome plans to allow users to see and manage the list of interest groups that
they've been added to, across the sites they've visited.  As with the Privacy
Sandbox technologies, user settings may evolve with feedback from users,
regulators, and others.

We'll update the available settings in Chrome as the FLEDGE proposal
progresses, [based on tests and feedback](/docs/privacy-sandbox/proposal-lifecycle/#testing).
In the future, we'll offer more granular settings to manage FLEDGE and
associated data.

API callers can't access group membership when users browse in Incognito mode,
and membership is removed when users clear their site data.

{: #opt-out-site}

### Can I opt out of FLEDGE? {: #opt-out}

The FLEDGE API developer guide explains how you can [block access to the FLEDGE API](/blog/fledge-api#opt-out),
either as a site owner or as an individual user.


## Why do we need FLEDGE? {: #why}

Understanding user interests can enable more relevant ads than simply choosing ads based on site
content (contextual targeting) or by using information that the user provided to the site on which
the ad appears (first-party-data targeting).

Traditionally, ad platforms have learned about user interests by tracking their behavior across
sites. Browsers need a way to enable ad platforms to select relevant ads, so content publishers can
get ad revenue, without cross-site tracking.

The FLEDGE experiment aims to move the web platform closer to a state where the user's browser,
on their device—not the advertiser or adtech platforms—holds information about what that person is
interested in.

{% Aside 'warning' %}

Not all features described here have been implemented (in part or in full) in the version
of the FLEDGE API currently being tested in Chrome. The [FLEDGE API developer guide](/blog/fledge-api#try-fledge)
explains what FLEDGE features are currently available for testing in Chrome run from the command line
using [feature flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

Features of FLEDGE will be added over time. While the [origin trial](/docs/privacy-sandbox/unified-origin-trial/)
is active, we'll regularly update a list of which features are already
implemented and what's still in progress.

{% endAside %}

<br>


## How does FLEDGE work? {: #how}

Here's an example of how a user's interest groups inform ad selection as the user visits different
sites.

In this example, the user visits the website of a custom bike maker and spends some time looking
at different bike models. Later, the user visits a news website and is shown an ad for a new bike
from the bike maker.

### 1. A user visits an advertiser site

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="A person visits a custom bike maker's site in a browser on their laptop.",
  width="400", height="190"
%}
</figure>

Imagine that a user visits the website of a custom bike maker (the advertiser)
and spends some time on the product page for a handmade steel bike. This provides the bike maker with a remarketing opportunity.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 2. The user's browser is asked to add an interest group {: #joinAdInterestGroup}

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png",
  alt="A person views a site in a browser on their laptop. The JavaScript code joinAdInterestGroup() is running in the browser.", width="400", height="187"
%}
</figure>

The advertiser's [DSP](/docs/privacy-sandbox/glossary/#dsp) (or the advertiser itself) makes a JavaScript call
`navigator.joinAdInterestGroup()` to ask the browser to add an interest group to the groups it is a
member of. In this example, the group might be named `custom-bikes`. The interest group owner is
an ad space buyer in the ad auction (described in step 4). The owner provides
configuration information to enable the browser to access bidding code, ad code, and
realtime data for the group when an ad auction is run.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 3. The user visits a site with ad space

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png",
  alt="A person visits a news website in a browser on their laptop. The site
  has an empty ad slot.", width="400", height="182"
%}
</figure>

The user visits a news website (a [_publisher_](/docs/privacy-sandbox/glossary/#publisher)) that uses FLEDGE to select ads.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 4. An ad auction runs in the browser

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png",
  alt="A person visits a news website in a browser on their laptop. A FLEDGE API adauction is taking place.",
  width="500", height="228" %}
</figure>

An ad auction is run in the browser on the user's device to select the most
appropriate ad for a specific available ad space. The auction code is likely 
provided by the publisher's
[supply-side platform (SSP)](/docs/privacy-sandbox/glossary/#ssp) or by the site itself.

{% Aside %}

In FLEDGE, the party running an ad auction is called the _seller_. Parties invited by the seller to bid in the auction are called _buyers_.

Each buyer is an interest group owner: each bid in an auction represents an interest group. In
other words, each bidder is an ad space buyer and also an interest group owner.

{% endAside %}

Bidding code is run for all of the browser's interest groups—as long as the
owner of that group is on the list of invited bidders passed to
`navigator.runAdAuction()`.

The auction is initiated when the seller calls `navigator.runAdAuction()`. This
JavaScript function includes data from the seller and each invited buyer. Each
buyer's code (from the URL provided in step 2) must include a `generateBid()`
function to submit a bid. This function uses data about the ad space available
to inform the buyer what creative to bid and calculate a bid value.

The seller's auction includes a `scoreAd()` function, which is run
once for each bid, to score and select the most desirable bid.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 5. The seller and participating buyers receive realtime data

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png",
  alt="A person visits a news website in a browser on their laptop. A FLEDGE API ad auction is taking place. Meanwhile, auction participants retrieve data from the Key/Value service.", width="600", height="189"
  %}
</figure>

During the ad auction, the ad space seller or ad space buyers may need
to access real-time data. For example, the seller may be required to check that
[ad creatives](/docs/privacy-sandbox/glossary/#creative)
comply with publisher policies, or bidders may need to calculate the remaining
budget in an ad campaign.

To meet the privacy requirements of FLEDGE, this data is supplied by a 
[Key/Value service](#key-value-service-detail).

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 6. The winning ad is displayed

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png",
  alt="On a news website, an ad for a 20% off a bike is displayed within a fenced frame.", width="400", height="192" %}
</figure>

The value returned by `navigator.runAdAuction()` in step 5 is passed to a [fenced frame](/docs/privacy-sandbox/fenced-frame)
for rendering, and the site displays the winning ad. A fenced frame prevents ad code from
interacting with the surrounding page.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 7. The auction result is reported

<figure>
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/OPSYyEPotB8G1CUeDV0Q.png",
  alt="The result of the FLEDGE ad auction is reported to the ad seller
  and ad buyers.", width="600", height="173" %}
</figure>

The `reportResult()` and `reportWin()` functions are called in auction code
provided by the seller and the winning buyer respectively, so each has an
opportunity to perform logging and reporting about the auction result.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 8. An ad click is reported

<figure>
{% Img
  src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png",
  alt="A person clicks on the ad for a bike (hosted ina fenced frame). A report about this action is sent to seller and buyers.",
  width="600", height="220"
%}
</figure>

Once a user clicks on an ad rendered in a fenced frame, the click is reported. To learn more about how this might work,
see [Fenced Frames Ads Reporting](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent).

{: #glossary}

## Key concepts

Looking for more information on FLEDGE terminology? Refer to the [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}
### What is an interest group?
{% endDetailsSummary %}

A FLEDGE interest group represents a group of people with a common interest, corresponding to a
[remarketing](/docs/privacy-sandbox/glossary/#remarketing) list.

Every FLEDGE interest group has an owner. Different types of owners will create different types of
interest groups with different use cases.

The owner asks the user's browser to add membership of their interest group by calling the
JavaScript function `navigator.joinAdInterestGroup()`, providing information such as data about ads
relevant to the interest group, and a URL for JavaScript used in bidding. Interest group data
(such as the ads) can be updated, and an interest group can be enabled for up to 30 days.

{% Aside %}

Interest groups are stored in the browser and can make bids in FLEDGE
in-browser auctions, but aren't programmatically 'readable'. In other words
there's no `navigator.getAdInterestGroups()`, as this would expose cross-site
identity.

{% endAside %}

{: #interest-group-types}

The table below provides examples of different types of FLEDGE interest group and owner.

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
        <td style="vertical-align: top;">Adtech</td>
        <td style="vertical-align: top;">DSP</td>
        <td style="vertical-align: top;">Category of products</td>
        <td style="vertical-align: top;">People who showed an interest in cycling gear.</td>
        <td style="vertical-align: top;">An adtech company might create and manage an interest group
          of people they believe are in the market for some category of item. This interest group
          could then be used to advertise products on sites that sell things in that category (and
          who work with the adtech company).</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

{% endDetails %}


{: #buyer-detail}

{% Details %}

{% DetailsSummary %}
### What is a buyer?
{% endDetailsSummary %}

In FLEDGE, a party that owns an [interest group](#interest-group-detail) and bids in an ad auction.

For example:

* **[Advertiser](/docs/privacy-sandbox/glossary/#advertiser)**: acting for itself.
* **[Demand-Side Platform](/docs/privacy-sandbox/glossary/#dsp)** (DSP): acting for advertisers.
* **Interest group owner**: working for multiple advertisers.

Buyers have three jobs:

* Choose whether to participate in an auction.
* Choose ads and calculate a bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the buyer that is run
during a FLEDGE ad auction.

When a buyer asks a user's browser to add an interest group to the groups it is a member of (by calling the
JavaScript function `navigator.joinAdInterestGroup()`) the buyer provides the browser with:
* A URL for bidding code, that will be used when the [seller](/docs/privacy-sandbox/glossary/#seller) runs an [ad auction](/docs/privacy-sandbox/glossary/#ad-auction).
* Potentially, URLs for [ad creatives](/docs/privacy-sandbox/glossary/#creative) for the interest group. (Ad URLs may be added
later via an update.)
* A list of data [keys](#key-value) to be queried, and the URL of the buyer's [Key/Value service](#key-value-service-detail),
to enable bidding code to get realtime data during an auction.

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

With FLEDGE, an ad space [seller](/docs/privacy-sandbox/glossary/#seller) has three jobs:

* Enforce publisher rules: which buyers and which bids are eligible.
* Run auction logic: JavaScript run in
  [worklets](/docs/privacy-sandbox/glossary/#worklet) to calculate a
  desirability score for each bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the seller when it instigates an ad
auction by calling the JavaScript function `navigator.runAdAuction()`.

{% endDetails %}

{: #ad-auction}

{% Details %}

{% DetailsSummary %}
### How does a FLEDGE ad auction work?
{% endDetailsSummary %}

{: #auction-diagram}

The diagram below outlines each stage of a FLEDGE ad auction: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img
    src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png",
    alt="Six stages in a FLEDGE ad auction",
    width="800", height="481"
    %}
</figure>

<br>

In FLEDGE, an ad auction is a collection of small JavaScript programs the browser runs on the user's
device to choose an ad. To preserve privacy, all ad auction code from the seller and buyers is run
in isolated JavaScript [worklets](/docs/privacy-sandbox/glossary/#worklet) that can't talk to the outside world.

An ad space seller (such as a [supply-side platform](/docs/privacy-sandbox/glossary/#ssp)) initiates a FLEDGE ad auction on a site
that sells ad space (such as a news site). The seller chooses buyers to participate in the auction,
indicates what space is for sale, and provides additional criteria for the ad. Each buyer is the
owner of an interest group.

The seller provides the browser with code to score bids, which includes each bid's value, the
[ad creative](/docs/privacy-sandbox/glossary/#creative) URL, and other data returned from each buyer. During the auction, bidding
code from buyers and bid-scoring code from the seller can receive data from their
[Key/Value services](#key-value-service-detail). Once an ad is chosen and displayed (in a
[fenced frame](/docs/privacy-sandbox/fenced-frame/) to preserve privacy) the seller and the winning bidder can report the
auction result.

#### 1. A user visits a site that displays ads

#### 2. The seller starts an auction

The **seller** calls the JavaScript function `navigator.runAdAuction()` to start an auction for an
available ad slot. The seller is likely to be the site's [SSP](/docs/privacy-sandbox/glossary/#ssp), or the site itself. In the
auction configuration value passed to the function, the seller specifies which ad space is for
sale and who can bid, and provides a URL for code that scores bids.

#### 3. Bidding code is run for each invited bidder

As explained in [How does FLEDGE work?](#joinAdInterestGroup), each interest group owner provides a
URL for code that can be used to bid in an ad auction, when the group owner called
`navigator.joinAdInterestGroup()`. That code must include a `generateBid()` function, which returns
a numerical bid and a URL for an ad creative, along with other data. Each bidding script can receive realtime data from its [Key/Value service](#key-value-service-detail) that was defined in the interest group config. The Key/Value service can be queried for data such as remaining ad campaign budget.

#### 4. The seller's code evaluates each buyer's bid

The `navigator.runAdAuction()` code (from step 2) must include a `scoreAd()` function, which is run
once for each ad and accompanying bid, to determine its desirability. The `scoreAd()` function is
run for every candidate ad, in the auction logic JavaScript code provided by the seller. This
function uses the bid value and other data returned by the `generateBid()` function in each buyer's
code (in the previous step). The seller may also receive realtime data from its
[Key/Value service](#key-value-service-detail).

For each ad, the `scoreAd()` function returns a number indicating its desirability. The most
desirable ad is the winner. Before an auction starts, the seller finds the best contextual ad for
the available ad slot. Part of its `scoreAd()` logic is to reject any ad that can't beat the
contextual winner.

#### 5. The ad is displayed

For the winning ad, the auction code returns an *opaque* value, which can only be passed to a [fenced frame](/docs/privacy-sandbox/fenced-frame/) to render
the ad. Neither the party selling the ad space nor the site displaying the ad
can inspect this value.

#### 6. The auction result is reported by the seller and buyers

The seller's code from step 4 can include a definition of the function `reportResult()`. Each
buyer's code from step 3 can include a definition of `reportWin()`. The code within
`reportResult()` and `reportWin()` can include a call to `sendReportTo()`: this is a
[temporary measure](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)
until aggregate reporting is available. The `sendReportTo()` function takes a URL as an argument
that is fetched to report the auction result.

{% Aside %}
A reporting mechanism for losing bidders is [under discussion](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting).
{% endAside %}

{% endDetails %}


{: #key-value-service-detail}

{% Details %}

{% DetailsSummary %}
### What is a FLEDGE Key/Value service?
{% endDetailsSummary %}

FLEDGE Key/Value service allows adtechs to query for realtime data when a bid is made by the buyer, and for sellers to score ads while preserving privacy. FLEDGE Key/Value service is one of the [FLEDGE services](/blog/fledge-service-overview/). 

The Key/Value service is deployed to the adtech's own cloud infrastructure, and the service runs on a [trusted execution environment](/docs/privacy-sandbox/glossary/#trusted-execution-environment). A request to a Key/Value service cannot result in event-level logging or have other side effects. The Key/Value service will also support [user-defined functions (UDFs)](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs) that allow adtechs to execute their own custom logic within the Key/Value service. 

{: #key-value}

A buyer or seller provides a list of 'keys' to specify the data they require from a FLEDGE Key/Value service. The Key/Value service responds with a value for each key.

The FLEDGE Key/Value service code is now available in a [Privacy Sandbox GitHub repository](https://github.com/privacysandbox/fledge-key-value-service). This service can be used by Chrome and Android developers. 

Learn more about the FLEDGE Key/Value service from the
[API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)
and the [trust model explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md).

{% endDetails %}


{% Details %}

{% DetailsSummary %}
### How is realtime data incorporated into auctions?
{% endDetailsSummary %}

The [buyers](#buyer-detail) or [seller](#seller-detail) in an ad auction may need access to realtime
data. For example, bidders may want to calculate the remaining budget in an ad campaign, or the
seller may be required to check ad creatives against publisher policies.

To meet the privacy requirements of FLEDGE, realtime data required during an ad auction is provided by the [Key/Value service](#key-value-service-detail). When each buyer calls `navigator.joinAdInterestGroup()`,the buyer specifies a Key/Value service URL and specifies the keys to be queried to the service during an auction. Likewise, when the seller runs an ad auction by calling `navigator.runAdAuction()`, the seller provides a URL for its Key/Value service. The seller's Key/Value service will be queried with the render URL of the creative.

For initial testing, ["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now) model is used. In the long-term, adtechs will need to use the open-source FLEDGE Key/Value services running in [trusted execution environments](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) for retrieving real-time data.

To ensure that the ecosystem has sufficient time to test, we don’t expect to require the use of the open-source Key/Value services or TEEs until sometime after third-party cookie deprecation. We will provide substantial notice for developers to begin testing and adoption before this transition takes place.

{% endDetails %}

{: #engage}

## Find out more

-  [FLEDGE API developer guide](/blog/fledge-api): reference guide to API usage.
-  [FLEDGE demo](https://fledge-demo.glitch.me): walkthrough of a basic FLEDGE deployment.
-  [The FLEDGE demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
explains how the demo code works, and shows how to use Chrome DevTools for FLEDGE debugging.
-  [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
-  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
-  [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)

## Engage and share feedback

-  **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md),
   [raise questions and follow discussion](https://github.com/WICG/turtledove/issues).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
