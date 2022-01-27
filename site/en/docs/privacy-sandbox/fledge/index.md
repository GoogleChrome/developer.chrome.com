---
layout: 'layouts/doc-post.njk'
title: 'The FLEDGE API'
subhead: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites.
description: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads from websites the user has previously visited.
date: 2022-01-27
updated: 2022-01-27
authors:
  - samdutton
---

{% YouTube
  id='HkvmYKqnytw'
%}


## Who is this article for?

This article covers the basics of FLEDGE, and explains some underlying concepts, but doesn't go into
much technical detail.

* If you work in **advertising or adtech**, you might want to skip the parts explaining concepts
such as [advertiser](#advertiser) and [publisher](#publisher). [How does FLEDGE work?](#how) should
still be useful.

* If you're a **developer or software engineer**, [The FLEDGE API](/blog/fledge-api) provides more
in-depth technical detail about the proposal.

* [The FLEDGE demo](https://fledge-demo.glitch.me) provides a walkthrough of a basic FLEDGE
deployment.


{% Aside %}
🧐 There is a [glossary](#glossary) of FLEDGE terms at the end of this post, along with information
about how to [engage and share feedback](#engage).
{% endAside %}


{: #what}

## What is FLEDGE?

FLEDGE is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve
[remarketing](#remarketing) and custom audience use cases, designed so that it cannot be used by
third parties to track user browsing behavior across sites.

The API enables on-device auctions by the browser, to choose relevant ads from websites the user
has previously visited.

FLEDGE is the first experiment to be implemented in Chromium within the
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals. The
[Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing
information for FLEDGE and other Privacy Sandbox proposals.


{: #overview}

## FLEDGE in one minute

<br>

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png", alt="Illustration providing
  an overview of each stage of the FLEDGE lifecycle",
  width="800", height="366" %}
  <br>
  <figcaption class="w-figcaption">The FLEDGE lifecycle: <a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">view a larger version</a></figcaption>
</figure>

<br>

FLEDGE uses [interest groups](#interest-group-detail) to enable sites to display ads that are
relevant to their users.

For example, when a user visits a website that wants to advertise its products, an interest group
[owner](#interest-group-detail) (such as a [DSP](#dsp) working for the site) can ask the user's
browser to add membership for the interest group. The group owner (in this example, the DSP) does
this by calling the JavaScript function `navigator.joinAdInterestGroup()`. If the call is
successful, the browser records:
* The **name** of the interest group: for example, 'custom-bikes'.
* The **owner** of the interest group: for example, 'https://dsp.example'.
* Interest group **configuration information** to enable the browser to access bidding code, ad
code, and realtime data, if the group's owner is invited to bid in an online ad auction. This
information can be updated later by the interest group owner.

{% Aside %}

There are other use cases for interest groups: see the [examples of owners and types](#interest-group-types).

{% endAside %}

Later, when the user visits a site that sells ad space, the ad space [seller](#seller-detail)
for the site (most likely the site's [SSP](#ssp), or the site itself) can use
FLEDGE to run an ad auction to select the most appropriate ads to display to the user. The seller
calls the `navigator.runAdAuction() `function, providing a list of interest group owners who are
invited to bid. Bidding code is only run for interest groups that the browser is a member of, and
whose owners have been invited to bid.

Bidding code is retrieved from the URL provided in the configuration information for the interest
group. This code must include a `generateBid()` function, which is passed data about the interest
group, and information from the seller, along with contextual data about the page and from the
browser. Each bidder is called a [buyer](#buyer).

When calling the `navigator.runAdAuction()` function, the seller provides code that includes a
`scoreAd()` function. This function is run for each bidder in the auction: to score each of the bids
returned by `generateBid()`. During the ad auction, the bidding code run for each buyer
(`generateBid()`) and the ad scoring code run for the seller (`scoreAd()`) can receive realtime data
from a [trusted server](#trusted-server).

The bid with the highest score wins the auction. The ad associated with the bid is displayed in
a [`<fencedframe>`](#fenced-frame) element, using the ad URL specified by the bid (which must be one of the ad URLs from the list provided in the interest group's configuration information).

To report the auction outcome, the seller's code can include a `reportResult()` function and each
buyer's code can include a `reportWin()` function.


{: #try-fledge}

## How can I try FLEDGE?

* [fledge-demo.glitch.me](https://fledge-demo.glitch.me/) provides a walkthrough of a basic FLEDGE
deployment across a shopping, travel and publisher site.

* [FLEDGE API developer guide](/blog/fledge-api#try-fledge) describes how to try out
FLEDGE by running Chrome from the command line using
[feature flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) to manually
enable the API.

{% Aside %}

Plans for the first FLEDGE [origin trial](/blog/origin-trials/) are
under discussion.

[Proposed First FLEDGE Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
provides more details about the goals of the trial and what features are proposed for support.

{% endAside %}

{: #user-controls}

## What browser configuration is available?

Users can adjust their participation for Privacy Sandbox trials in Chrome by enabling or disabling
the top-level setting in chrome://settings/privacySandbox.  During initial testing, people will be
able to use this high-level Privacy Sandbox setting to opt out of FLEDGE. Chrome plans to allow
users to see and manage the list of interest groups that they have been added to across the web
sites they have visited.  As with the Privacy Sandbox technologies themselves, user settings may
evolve with feedback from users, regulators and others.

We'll continue to update the available settings in Chrome as the FLEDGE proposal progresses, [based
on tests and feedback](/docs/privacy-sandbox/cds21-update/#collaborate).
In the future, we plan to offer more granular settings to manage FLEDGE and associated data.

API callers can't access group membership when users browse in Incognito mode, and membership is
removed when users clear their site data.


{: #why}

## Why do we need FLEDGE?

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

Not all features described in this post have been implemented (or fully implemented) in the version
of the FLEDGE API currently being tested in Chrome. The [FLEDGE API developer guide](/blog/fledge-api#try-fledge)
explains what FLEDGE features are currently available for testing in Chrome run from the command line
using [feature flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

We expect the features of FLEDGE will be added over time as work on implementation continues. Once
the API reaches the origin trial stage, we'll provide a regularly-updated list of which parts are
already implemented and what's still in progress.

{% endAside %}

<br>

{: #how}

## How does FLEDGE work?

Here's an example of how a user's interest groups inform ad selection as the user visits different
sites.

In this example, the user visits the website of a custom bike maker and spends some time looking
at different bike models. Later, the user visits a news website and is shown an ad for a new bike
from the bike maker.

### 1. A user visits an advertiser site

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="Illustration showing
  a person visiting the site of a custom bike maker in a browser on their laptop.",
  width="400", height="190" %}

Imagine that a user visits the website of a custom bike maker (the [advertiser](#advertiser) in
this example) and spends some time on the product page for a handmade steel bike. This provides the
bike maker with a [remarketing](#remarketing) opportunity.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

{: #joinAdInterestGroup}

### 2. The user's browser is asked to add an interest group

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png",
  alt="Illustration showing a person viewing a site in a browser on their laptop. JavaScript
  code joinAdInterestGroup() is running in the browser.", width="400", height="187" %}

The advertiser's [DSP](#dsp) (or the advertiser itself) makes a JavaScript call
`navigator.joinAdInterestGroup()` to ask the browser to add an interest group to the groups it is a
member of. In this example, the group might be named `custom-bikes`. The interest group owner is
an ad-space buyer in the ad auction described in [step 4](#ad-auction). The owner provides
configuration information to enable the browser to access bidding code, ad code, and
realtime data for the group when an ad auction is run.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 3. The user visits a site that sells ad space

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png",
  alt="Illustration showing a person visiting a news website in a browser on their laptop. The site
  has an empty ad slot.", width="400", height="182" %}

The user visits a news website (a [**publisher**](#publisher)) that uses FLEDGE to select ads.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 4. An ad auction is run in the browser

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png",
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad
  auction using the FLEDGE API is taking place.", width="500", height="228" %}

An ad auction is run on the user's device to select the most appropriate ad for a specific
available ad space on the publisher site. The code to run the auction is likely to be provided by
the publisher site's [supply-side platform (SSP)](#ssp) or by the site itself.

{% Aside %}

In FLEDGE, the party running an ad auction is called the **seller**.

Parties invited by the seller to bid in the auction are called **buyers**.

Each buyer is an interest group owner: each bid in an auction represents an interest group. In
other words, each bidder is an ad-space buyer and also an interest group owner.

{% endAside %}

Bidding code is run for all of the browser's interest groups—as long as the owner of that group is
on the list of invited bidders passed to `navigator.runAdAuction()`.

The auction is initiated when the seller calls the JavaScript function `navigator.runAdAuction()`.
This function uses code from the seller and each invited bidder. Each bidder's code (from the
URL provided in step 2) must include a `generateBid()` function to submit a bid. This function uses
data about the ad space available in order to choose whether to bid and to calculate a bid amount.
The seller's auction code must include a `scoreAd()` function, which is run once for each bid to
give it a score and choose the most desirable bid.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 5. The seller and participating buyers receive realtime data from trusted servers

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png",
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad
  auction using the FLEDGE API is taking place, with a participant getting data from a trusted
  server.", width="600", height="189" %}

During the ad auction, the ad-space [seller](#seller) or bidding ad-space [buyers](#buyer) may need
to access realtime data. For example, the seller may be required to check that [ad creatives](#creative)
comply with publisher policies, or bidders may need to calculate the remaining budget in an ad
campaign. To meet the privacy requirements of FLEDGE, this data is supplied using
[trusted servers](#trusted-server).

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 6. The winning ad is displayed

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png",
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad
  for a bike (20% off) is displayed—with a lock above to show that the ad is displayed in a
  fenced frame.", width="400", height="192" %}

The value returned by `navigator.runAdAuction()` in step 5 is passed to a [fenced frame](#fenced-frame)
for rendering, and the site displays the winning ad. A fenced frame prevents ad code from
interacting with the surrounding page.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 7. The auction result is reported

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/OPSYyEPotB8G1CUeDV0Q.png",
  alt="Illustration representing the result of a FLEDGE ad auction being reported to the ad seller
  and ad buyers.", width="600", height="173" %}

The `reportResult()` and `reportWin()` functions are called in auction code provided by the
[seller](#seller) and the winning buyer respectively, so each has an opportunity to perform logging
and reporting about the auction result.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 8. An ad click is reported

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="Illustration showing
a person clicking on an ad for a bike, inside a fenced frame, on a news website, with report
data going to seller and buyers.", width="600", height="220" %}

A click on an ad rendered in a fenced frame is reported. To learn more about how this might work,
see [Fenced Frames Ads Reporting](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent).

<br>


{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}
## What is an interest group?
{% endDetailsSummary %}

A FLEDGE interest group represents a group of people with a common interest, corresponding to a
[remarketing](#remarketing) list.

Every FLEDGE interest group has an owner. Different types of owners will create different types of
interest groups with different use cases.

The owner asks the user's browser to add membership of their interest group by calling the
JavaScript function `navigator.joinAdInterestGroup()`, providing information such as data about ads
relevant to the interest group, and a URL for JavaScript used in bidding. Interest group data
(such as the ads) can be updated, and an interest group can be enabled for up to 30 days.

{% Aside %}

Interest groups stored in the browser can make bids in FLEDGE in-browser auctions, but are not
programmatically 'readable'. In other words there is no navigator.getAdInterestGroups(), as this
would expose cross-site identity.

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
        <td style="vertical-align: top;"><a href="#dsp" title="Glossary entry for dsp">DSP</a></td>
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
## What is a buyer?
{% endDetailsSummary %}

In FLEDGE, a party that owns an [interest group](#interest-group) and bids in an ad [auction](#).

For example:

* **[Advertiser](#advertiser)**: acting for itself.
* **[Demand-Side Platform](#dsp)** (DSP): acting for advertisers.
* **[Interest group owner](#interest-group-detail)**: working for multiple advertisers.

Buyers have three jobs:

* Choose whether to participate in an auction.
* Choose ads and calculate a bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the buyer that is run during a FLEDGE ad
auction.

When a buyer asks a user's browser to add an interest group to the groups it is a member of (by calling the
JavaScript function `navigator.joinAdInterestGroup()`) the buyer provides the browser with:
* A URL for bidding code, that will be used when the [seller](#seller) runs an [ad auction](#ad-auction).
* Potentially, URLs for [ad creatives](#creative) for the interest group. (Ad URLs may be added
later via an update.)
* A list of data [keys](#key-value), and the URL of the buyer's [trusted server](#trusted-server),
to enable bidding code to get realtime data during an auction.

The buyer's code can also include a `reportWin()` function to report the auction outcome.

{% endDetails %}


{: #seller-detail}

{% Details %}

{% DetailsSummary %}
## Who runs an ad auction?
{% endDetailsSummary %}

There are multiple parties that might run an auction to sell ad space.

For example:

* **Content publisher**: acting for itself to host ad content on its website.
* **[Supply-side platform](#ssp)** (SSP): working with the publisher and providing other services.
* **Third-party script**: acting for a publisher, to enable participation in ad auctions.

With FLEDGE, an ad-space [seller](#seller) has three jobs:

* Enforce publisher rules: which buyers and which bids are eligible.
* Run auction logic: JavaScript run in [worklets](#worklet) to calculate a desirability score for each bid.
* Report the auction outcome.

These jobs are done programmatically, in code provided by the seller when it instigates an ad
auction by calling the JavaScript function `navigator.runAdAuction()`.

{% endDetails %}


{: #ad-auction}

{% Details %}

{% DetailsSummary %}
## How does a FLEDGE ad auction work?
{% endDetailsSummary %}

<br>

{: #auction-diagram}

The diagram below outlines each stage of a FLEDGE ad auction: <a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png?auto=format&w=1600"
title="Click to view a larger version of image" target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png", alt="Illustration providing
  an overview of each stage of a FLEDGE ad auction",
  width="800", height="481" %}
</figure>

<br>

In FLEDGE, an ad auction is a collection of small JavaScript programs the browser runs on the user's
device to choose an ad. To preserve privacy, all ad auction code from the seller and buyers is run
in isolated JavaScript [worklets](#worklet) that can't talk to the outside world.

An ad-space seller (such as a [supply-side platform](#ssp)) initiates a FLEDGE ad auction on a site
that sells ad space (such as a news site). The seller chooses buyers to participate in the auction,
indicates what space is for sale, and provides additional criteria for the ad. Each buyer is the
owner of an interest group.

The seller provides the browser with code to score bids, which includes each bid's value, the
[ad creative](#creative) URL, and other data returned from each buyer. During the auction, bidding
code from buyers and bid-scoring code from the seller can receive data from their
[trusted servers](#trusted-server). Once an ad is chosen and displayed (in a
[fenced frame](#fenced-frame) to preserve privacy) the seller and the winning bidder can report the
auction result.

### 1. A user visits a site that displays ads

### 2. The seller starts an auction

The **seller** calls the JavaScript function `navigator.runAdAuction()` to start an auction for an
available ad slot. The seller is likely to be the site's [SSP](#ssp), or the site itself. In the
auction configuration value passed to the function, the seller specifies which ad space is for
sale and who can bid, and provides a URL for code that scores bids.


### 3. Bidding code is run for each invited bidder

As explained in [How does FLEDGE work?](#joinAdInterestGroup), each interest group owner provides a
URL for code that can be used to bid in an ad auction, when the group owner called
`navigator.joinAdInterestGroup()`. That code must include a `generateBid()` function, which returns
a numerical bid and a URL for an [ad creative](#creative), along with other data. Bidding code can
receive realtime data from each bidder's [trusted server](#trusted-server), such as remaining ad
campaign budget.

### 4. The seller's code evaluates each buyer's bid

The `navigator.runAdAuction()` code (from step 2) must include a `scoreAd()` function, which is run
once for each ad and accompanying bid, to determine its desirability. The `scoreAd()` function is
run for every candidate ad, in the auction logic JavaScript code provided by the seller. This
function uses the bid value and other data returned by the `generateBid()` function in each buyer's
code (in the previous step). The seller may also receive realtime data from its [trusted server]
(#trusted-server).

For each ad, the `scoreAd()` function returns a number indicating its desirability. The most
desirable ad is the winner. Before an auction starts, the seller finds the best contextual ad for
the available ad slot. Part of its `scoreAd()` logic is to reject any ad that can't beat the
contextual winner.

### 5. The ad is displayed

For the winning ad, the auction code returns an *opaque* value, which can only be passed to a
[fenced frame](#fenced-frame) to render the ad. Neither the party selling the ad space nor the site
displaying the ad can inspect this value.

### 6. The auction result is reported by the seller and buyers

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


{: #trusted-server-detail}

{% Details %}

{% DetailsSummary %}
## What is a trusted server?
{% endDetailsSummary %}

In the context of the Privacy Sandbox, a trusted server is a secure environment to enable access to
data, while preserving privacy. A request to a trusted server cannot result in event-level logging,
or have other side effects.

To enable a party (such as a web browser during a FLEDGE auction) to ask questions that might reveal
sensitive information, a trusted server must provide:

-  **Policy approaches** such as mandatory code audits, or usage of servers only from trusted
   third parties.
-  **Technical guarantees** such as [secure multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation)
or [secure enclaves](https://support.apple.com/en-gb/guide/security/sec59b0b31ff/web).

{% endDetails %}


{% Details %}

{% DetailsSummary %}
## How is realtime data incorporated into auctions?
{% endDetailsSummary %}

The [buyers](#buyer-detail) or [seller](#seller-detail) in an ad auction may need access to realtime
data. For example, bidders may want to calculate the remaining budget in an ad campaign, or the
seller may be required to check ad creatives against publisher policies.

To meet the privacy requirements of FLEDGE, realtime data required during an ad auction is provided
by [trusted servers](#trusted-server-detail). When each buyer calls `navigator.joinAdInterestGroup()`,
the buyer specifies a trusted server URL and specifies the data it will require from the
server during an auction. Likewise, when the seller runs an ad auction by calling
`navigator.runAdAuction()`, the seller provides a URL for its trusted server, and specifies the
data that will be required from the server.

The role and the ownership of the trusted server is still under discussion, so initial testing of
FLEDGE temporarily uses a ["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)
model.

{% endDetails %}



<br>

{: #glossary}

{% Details %}

{% DetailsSummary %}
## Glossary
{% endDetailsSummary %}

{: #ad-auction}

### Ad auction

In FLEDGE, an auction run by a [seller](#seller), in JavaScript code in the browser on
the user's device, to sell ad space on a site that displays ads.

{: #ad-creative}

### Ad creative

See [creative](#creative).

{: #ad-exchange}

### Ad exchange

A platform to automate buying and selling of ad inventory from multiple ad
networks.

{: #ad-inventory }

### Ad inventory

The spaces for ads that are available from a site that sells ad space.

{: #advertiser}

### Advertiser

A site that pays to advertise its products. In the example in this post, a custom bike maker.

{: #buyer }

### Buyer

A party bidding for ad space in an [ad auction](#ad-auction), likely to be a DSP, or maybe the
advertiser itself. Ad-space buyers own and manage interest groups. See
[What is an ad-space buyer?](#buyer-detail) for more detail.

{: #creative}

### Creative

Ad content: graphics, text, and/or video and audio.

{: #dsp }

### Demand-side platform (DSP)

An adtech service used to automate ad purchasing. DSPs are used by advertisers to buy
[ad impressions](https://en.wikipedia.org/wiki/Impression_(online_media)) across a range of
publisher sites. Publishers put their [ad inventory](#ad-inventory) up for sale through marketplaces
called ad exchanges, and DSPs decide programmatically which available ad impression makes most sense
for an advertiser to buy.

{: #fenced-frame}

### Fenced frame

A type of [frame](https://developer.mozilla.org/docs/Web/HTML/Element/iframe)
which can be used to display an ad, but can't interact with the page around it. The
[fenced frame proposal](https://github.com/shivanigithub/fenced-frame) is under discussion.

{: #interest-group}

### Interest group

A group of people with a common interest, such as a
[remarketing list](https://www.thinkwithgoogle.com/marketing-strategies/search/remarketing-lists-for-search-ads/).
Each FLEDGE interest group has an owner: an advertiser, publisher or adtech platform. The owner asks
the user's browser to join their interest group.

{: #publisher}

### Key-value

See [Trusted server](#key-value).

### Publisher

In the context of [the FLEDGE explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=publisher),
a site that is paid to display ads. In the examples here, a news website.

{: #rtb}

### Real-time bidding (RTB)

An automated auction for buying and selling ad impressions on websites,
completed during page load.

{: #remarketing}

### Remarketing

Advertising to people who've already visited your site. For example, ads for a custom bike maker
could be shown to people who had previously viewed product pages on their site.

{: #seller }

### Seller

In FLEDGE, the party running an ad auction, likely to be an [SSP](#ssp) or maybe the publisher
itself.

{: #ssp }

### Supply-side platform, Sell-side platform (SSP)

An adtech service used to automate selling ad inventory. SSPs allow publishers to offer their
inventory (empty rectangles where ads will go) to multiple ad exchanges, DSPs, and networks. This
enables a wide range of potential buyers to bid for ad space.

{: #trusted-server}

### Trusted server

A server used to provide data, but with major restrictions to safeguard privacy, backed by technical
and policy guarantees. A request to a trusted server—such as a bidder in a FLEDGE ad auction
checking on the remaining budget for an ad campaign—cannot result in event-level logging, or have
other side effects.

{: #key-value}

When a buyer or seller makes a request to a trusted server, they specify the data they require from
the server as a list of 'keys'. The trusted server responds with a value for each key.

{: #worklet}

### Worklet

A small chunk of JavaScript, loaded from a single URL and run with restrictions. In particular, a
worklet cannot access the network, storage, cookies, or the web page on which it runs. Bidding
logic from ad-space [buyers](#buyer-detail), and ad desirability calculation by the ad-space
[seller](#seller-detail), is run in worklets when the seller calls the `navigator.runAdAuction()`
JavaScript function.

{% endDetails %}


<br>

{: #engage}

## Engage and share feedback

-  **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md),
   [raise questions and follow discussion](https://github.com/WICG/turtledove/issues).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Find out more

-  [FLEDGE API developer guide](/blog/fledge-api): reference guide to API usage.
-  [FLEDGE demo](https://fledge-demo.glitch.me): walkthrough of a basic FLEDGE deployment.
-  [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
-  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
-  [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)

---

Photo by [Ray Hennessy](https://unsplash.com/@rayhennessy) on [Unsplash](https://unsplash.com/photos/GL6ORxDMswI).
