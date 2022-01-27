---
layout: 'layouts/blog-post.njk'
title: FLEDGE API developer guide
authors:
  - samdutton
description: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. 
date: 2022-01-27
updated: 2022-01-27
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/UiyBX61nCLHExFoy0eEn.jpg
alt: Photograph of a piping plover bird with a chick on a sandy beach in Middletown, New Jersey, United States.
tags:
  - privacy
  - security
---


{% YouTube
  id='HkvmYKqnytw' 
%}


{: #who}

## Who is this article for?

This post is a technical reference to the current iteration of the experimental FLEDGE API.

* [The FLEDGE API](/docs/privacy-sandbox/fledge) is a less technical overview of the proposal.

* [The FLEDGE demo](https://fledge-demo.glitch.me) provides a walkthrough of a basic FLEDGE 
deployment. 


{% Aside %}
🔎 There is a [glossary](/docs/privacy-sandbox/fledge#glossary) of FLEDGE terms at the end of [The FLEDGE API](/docs/privacy-sandbox/fledge#glossary)
{% endAside %}


{: #what}

## What is FLEDGE?

FLEDGE is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve 
[remarketing](/docs/privacy-sandbox/fledge#remarketing) and custom audience use cases, designed so that it cannot be used by
third parties to track user browsing behavior across sites. The API enables on-device auctions by 
the browser, to choose relevant ads for websites the user has previously visited. 

FLEDGE is the first experiment to be implemented in Chromium within the 
[TURTLEDOVE](https://github.com/WICG/turtledove) family of proposals.

The diagram below provides an overview of the FLEDGE lifecycle: 
<a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png?auto=format&w=1600"
  target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png", alt="Illustration providing
  an overview of each stage of the FLEDGE lifecycle", 
  width="800", height="366" %}
</figure>

<br>


{: #try-fledge}

## How can I try FLEDGE?

### FLEDGE demo

A walkthrough of a basic FLEDGE deployment across a shopping, travel and publisher site is 
available at [fledge-demo.glitch.me](https://fledge-demo.glitch.me/). 

{% Aside %}

Plans for the first FLEDGE [origin trial](/blog/origin-trials/) are
under discussion.

[Proposed First FLEDGE Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
provides more details about the goals of the trial and what features are proposed for support.

{% endAside %}

{: #test}

### Test with feature flags

The current iteration of FLEDGE is not yet available in an origin trial, but can be tested by a
single user running a current version of Chrome, Chrome Beta or Chrome Canary with feature flags
set from the command line. 

* This is the in-progress version of FLEDGE for early testing, so it should not be considered 
feature complete or indicative of the final implementation. 
* FLEDGE progress and status are discussed in the regular WICG meetings. The 
[minutes](https://github.com/WICG/turtledove/blob/main/meetings/2021-05-12-FLEDGE-call-minutes.md#agenda) 
for the 2021-05-12 WICG call provide detail on what is and is not supported in the current 
implementation.
* [Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) 
explains how to set flags when running Chrome and other Chromium-based browsers from the command 
line.

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing 
information for FLEDGE and other Privacy Sandbox proposals.

#### Frames and fenced frames

When enabling FLEDGE for testing with feature flags, ads can be rendered in an `<iframe>` or a 
[`<fencedframe>`](https://github.com/shivanigithub/fenced-frame), depending on which flags are 
set.

Using `<fencedframe>` to render ads:

```text 
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

Using `<iframe>` to render ads:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,AllowURNsInIframes --disable-features=FencedFrames
```

### What features are supported behind these feature flags in the latest version of Chrome?

FLEDGE is being made available behind [behind feature flags](#try-fledge) in Chromium as a first 
experiment to test the following features of the FLEDGE proposal:

-  **Interest groups**: stored by the browser, with associated metadata to configure ad bidding
   and rendering.
-  **On-device bidding by buyers (DSP or advertiser)**: based on stored interest groups and signals
     from the seller.
-  **On-device ad selection by the seller (SSP or publisher)**: based on auction bids and
   metadata from buyers.
-  **Ad rendering in a temporarily relaxed version of Fenced Frames**: with network access and
   logging allowed for ad rendering.

[The API explainer provides more detail](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)
about feature support and constraints.

#### Interest group permissions

The default in the current implementation of FLEDGE is to allow calling `joinAdInterestGroup()` from
anywhere in a page, even from cross-domain iframes. In the future, once site owners have had time
to adjust their cross-domain iframe permissions policies, the plan is to disallow calls from
cross-domain iframes, as the explainer describes.

#### Trusted servers

As part of a FLEDGE ad auction, the browser can access a
[trusted server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)
that returns simple key-value pairs to provide information to an ad buyer, such as remaining
campaign budget. The FLEDGE proposal [mandates](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements) 
that this server "performs no event-level logging and has no other side effects based on these 
requests".  However, in the current initial experimental phase for testing FLEDGE, the seller
and buyers can run trusted servers themselves (a 
"[Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server)" 
model). Discussion is underway about how trusted servers are managed and owned. 


{: #debugging }

## Debug FLEDGE worklets

From Chrome Canary 98.0.4718.0, it's possible to debug FLEDGE worklets within Chrome DevTools.

The first step is to set breakpoints via a new category in the **Event Listener Breakpoints** pane 
in the **Sources** panel.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/x0jhCIMB8L8tV9bcpkPi.png", alt="Screenshot of
   DevTools in Chrome Canary, highlighting the Event Listener Breakpoints pane in the Sources panel.
   Bidder Bidding Phase Start is selected under Ad Auction Worklet.", width="800", height="549" %}

When a breakpoint triggers, execution is paused before the first statement at the top-level of the 
worklet script. You can use regular breakpoints or step commands to get to the bidding/scoring/reporting 
function itself.

Live worklet scripts will also show up under the Threads panel.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yJYTFRRcPmVse2teuc7u.png", alt="Screenshot of
DevTools in Chrome Canary, highlighting the Threads pane in the Sources panel, showing the current
worklet script that has been paused.", width="800", height="537" %}

Since some worklets may run in parallel, multiple threads may end up in the "paused" state there; 
you can use the thread list to switch between threads, and resume or inspect them more closely as 
appropriate. 


{: #how}

## How does the FLEDGE API work?

In this example, a user browses the website of a custom bike maker, then later visits a news website
and is shown an ad for a new bike from the bike maker.

{% Aside 'warning' %} 

Not all features described in this post have been implemented (or fully implemented) in the version 
of the FLEDGE API currently being tested in Chrome. [Test with feature flags](#test)
explains what FLEDGE features are currently available for testing in Chrome run from the command line 
using [feature flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

We expect the features of FLEDGE will be added over time as work on implementation continues. Once 
the API reaches the origin trial stage, we'll provide a regularly-updated list of which parts are 
already implemented and what's still in progress.

{% endAside %}

### 1. A user visits an advertiser site

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="Illustration showing
  a person visiting a custom bike manufacturer site in a browser on their laptop.", 
  width="400", height="190" %}

Imagine that a user visits the website of a custom bike maker (the [advertiser](/docs/privacy-sandbox/fledge#advertiser) in
this example) and spends some time on the product page for a handmade steel bike. This provides the
bike maker with a [remarketing](/docs/privacy-sandbox/fledge#remarketing) opportunity.

{% Aside 'key-term' %}
A _demand-side platform_ (DSP) is an adtech service used to automate ad purchasing. DSPs are
used by advertisers to buy [ad impressions](https://en.wikipedia.org/wiki/Impression_(online_media)) 
across a range of publisher sites. Publishers put their [ad inventory](/docs/privacy-sandbox/fledge#ad-inventory) up for sale
through marketplaces called ad exchanges, and DSPs decide programmatically which available ad 
impression makes most sense for an advertiser to buy.

A _supply-side platform_ (SSP) is an adtech service used to automate selling ad inventory. SSPs
allow publishers to offer their inventory (empty rectangles where ads will go) to multiple ad 
exchanges, DSPs, and networks. This enables a wide range of potential buyers to bid for ad space. 
{% endAside %}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 2. The user's browser is asked to add an interest group

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png", 
  alt="Illustration showing a person viewing a site in a browser on their laptop. JavaScript 
  code joinAdInterestGroup() is running in the browser.", width="400", height="187" %}

**Explainer section:** [Browsers Record Interest Groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)

The advertiser's [demand-side platform](/docs/privacy-sandbox/fledge/#dsp) (DSP) (or the advertiser itself) calls
`navigator.joinAdInterestGroup()` to ask the browser to add an interest group to the list of groups
the browser is a member of. In this example, the group is named `custom-bikes`, and the owner is
`dsp.example`. The interest group owner (in this case, the DSP) will be a [buyer](/docs/privacy-sandbox/fledge/#buyer)
in the ad auction described in [step 4](#ad-auction). Interest group membership is stored by the 
browser, on the user's device, and is not shared with the browser vendor or anyone else. 

`joinAdInterestGroup()` requires permission from: 
* The site being visited
* The interest group owner

For example: it must not be possible for `malicious.example` to call 
`joinAdInterestGroup()` with `dsp.example` as owner without the permission of 
`dsp.example`. 

#### Permission from the site being visited

**Same origin**: By default, permission is implicitly granted for `joinAdInterestGroup()` calls from 
the same origin as the site being visited, i.e. from the same origin as the top-level frame of the 
current page. Sites can use a FLEDGE [permissions policy header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)
 `join-ad-interest-group` directive to disable `joinAdInterestGroup()` calls.

**Cross origin**: Calling `joinAdInterestGroup()` from origins that are different from the current 
page can only succeed if the site being visited has set a permissions policy that allows calls to 
`joinAdInterestGroup()` from cross-origin iframes.

{% Aside %}
The default in the current implementation of FLEDGE is to allow calls to `joinAdInterestGroup()` 
from anywhere in a page, even from cross-origin iframes. In the future, once site owners have had 
time to adjust their permissions policies, the plan is by default to disallow calls from 
cross-origin iframes, as described in the FLEDGE explainer.
{% endAside %}

#### Permission from the interest group owner

Interest group owner permission is implicitly granted by calling `joinAdInterestGroup()` 
from an iframe with the same origin as that of the interest group's owner. For example, a `dsp.example` 
iframe can call `joinAdInterestGroup()` for interest groups owned by `dsp.example`. 

The proposal is that `joinAdInterestGroup()` can run in a page or iframe in the owner's domain, or 
be delegated to other domains provided using a list at a `.well-known` URL.

#### Using navigator.joinAdInterestGroup()

Here's an example of how the API might be used:

{: #ad-components}

```javascript
const interestGroup = {
  owner: 'https://dsp.example',
  name: 'custom-bikes',
  biddingLogicUrl: ...,
  dailyUpdateUrl: ...,
  trustedBiddingSignalsUrl: ...,
  trustedBiddingSignalsKeys: ['key1', 'key2'],
  userBiddingSignals: {...},
  ads: [bikeAd1, bikeAd2, bikeAd3],
  adComponents: [customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2],
};

navigator.joinAdInterestGroup(interestGroup, 7 * kSecsPerDay);
```

The `interestGroup` object passed to the function must be no more than 50 kiB in size, otherwise the
call will fail. The second parameter specifies the duration of the interest group, capped at 30
days. Successive calls overwrite previously stored values.

#### Interest group properties

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Required</th>
        <th style="font-weight: bold; text-align: left;">Example</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>owner</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'https://dsp.example'</code></td>
        <td style="vertical-align: top;">Origin of the interest group owner.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>name</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'custom-bikes'</code></td>
        <td style="vertical-align: top;">Name of the interest group.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>biddingLogicUrl</code>**</td>
        <td style="vertical-align: top;">Optional*</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/bid.js'</code></td>
        <td style="vertical-align: top;">URL for bidding JavaScript run in worklet.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>dailyUpdateUrl</code>**</td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/update'</code></td>
        <td style="vertical-align: top;">URL that returns JSON to update interest group attributes.
        (See <a href="#update-interest-group">Update the interest group</a>.)</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedBiddingSignalsUrl</code>**</td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/trusted/bidding-signals'</code></td>
        <td style="vertical-align: top;">Base URL for key-value requests to bidder's trusted server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedBiddingSignalsKeys</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>['key1', 'key2' ...]</code></td>
        <td style="vertical-align: top;">Keys for requests to key-value trusted server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>userBiddingSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">Additional metadata the owner can use during bidding.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>ads</code></td>
        <td style="vertical-align: top;">Optional*</td>
        <td style="vertical-align: top;"><code>[bikeAd1, bikeAd2, bikeAd3]</code></td>
        <td style="vertical-align: top;">Ads that might be rendered for this interest group<./td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>adComponents</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>[customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2]</code></td>
        <td style="vertical-align: top;">Components for <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">ads composed of multiple pieces</a>.</td>
      </tr>
    </tbody>
  </table>
</div>

\* All properties are optional except for `owner` and `name`. The `biddingLogicUrl` and `ads`
   properties are optional, but required to participate in an auction. There may be use cases for
   creating a interest group without these properties: for example, an interest group owner might
   want to add a browser to an interest group for a campaign that isn't running yet, or for some
   other future use, or they may temporarily have run out of advertising budget.

\*\* In the current implementation of FLEDGE, `biddingLogicUrl`, `dailyUpdateUrl` and
`trustedBiddingSignalsUrl` must have the same origin as owner. That may not be a long-term
constraint, and the `ads` and `adComponents` URLs have no such constraint.

{: #update-interest-group}

#### Update the interest group

`dailyUpdateUrl` specifies a web server that returns JSON defining interest group properties,
corresponding to the interest group object passed to `navigator.joinAdInterestGroup()`. This
provides provides a mechanism for the group's owner to periodically update the attributes of the
interest group. In the [current implementation](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=650;drc=13a62b6d89315e5a90deb712b0c1e47c72100f6c),
the following attributes can be changed:

* `biddingLogicUrl`
* `trustedBiddingSignalsUrl`
* `trustedBiddingSignalsKeys`
* `ads`
* `adComponents`

Any field not specified in the JSON will not be overwritten—only fields specified in the JSON get
updated—whereas calling `navigator.joinAdInterestGroup()` overwrites any existing interest group.

{% Aside "caution" %}

The current implementation of FLEDGE in Chrome does not update interest groups automatically in the
background.

For the time being, updates to interest groups owned by the current frame's origin can
be triggered manually via `navigator.updateAdInterestGroups()`. Rate limiting prevents updates from
happening too frequently: repeated calls to `navigator.updateAdInterestGroups()` don't do anything
until the rate limit period (currently one day) has passed. The rate limit gets reset if
`navigator.joinAdInterestGroup()` is called again for the same interest group `owner` and `name`.


{% endAside %}

#### Specify ads for an interest group

`ads` and `adComponents` objects include a URL for an ad creative and, optionally, arbitrary
metadata that can be used at bidding time. For example: 

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

{: #biddinglogicurl}

#### How do buyers make bids?

The script at `biddingLogicUrl` provided by an interest group owner must include a `generateBid()` 
function. When an ad-space seller calls `navigator.runAdAuction()`, the `generatedBid()` 
function is called once for each of the interest groups the browser is a member of, if the interest 
group's owner is invited to bid. In other words, `generateBid()` is called once for each candidate 
ad. When the seller calls the `navigator.runAdAuction()` function, they provide code that includes a
`scoreAd()` function. This function is run for each bidder in the auction: to score each of the bids 
returned by `generateBid()`. 

Bidding code might look this very simple example: 

```javascript
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  return {
    ad: {...}, // ad metadata
    bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    render: interestGroup.ads[0].renderUrl
  }
}
```

{: #generate-bid}

#### More about generateBid()

The script at `biddingLogicUrl` provided by an ad-space buyer must include a `generateBid()` function.
This function is called once for each candidate ad. As described later in this post, [`runAdAuction
()`](#ad-auction) individually checks each ad, along with its associated bid and metadata, then
assigns the ad a numerical desirability score.

```javascript
generateBid(interestGroup, auctionSignals, perBuyerSignals, 
    trustedBiddingSignals, browserSignals) {
  ...
  return {
    ad: adObject, 
    bid: bidValue, 
    render: renderUrl,
    adComponents: [adComponentRenderUrl1, ...]
   };
}
```

`generateBid()` takes the following arguments:

* `interestGroup`<br>
The object passed to `joinAdInterestGroup()` by the ad buyer. (The interest group 
may be updated via `dailyUpdateUrl`.)

* `auctionSignals`<br>
A property of the [auction config](#ad-auction) argument passed to 
`navigator.runAdAuction()` by the ad-space **seller**. This provides information about page context (such as
the ad size and the publisher ID), the type of auction (first-price or second-price), and other 
metadata.

* `perBuyerSignals`<br>
As with `auctionSignals`, a property of the [auction config](#ad-auction) 
argument passed to `navigator.runAdAuction()` by the seller. This can provide contextual
signals from the buyer's server about the page, if the seller is an [SSP](/docs/privacy-sandbox/fledge#ssp) which
performs a real-time bidding call to buyer servers and pipes the response back, or if the publisher 
page contacts the buyer's server directly. If so, the buyer may wish to check a cryptographic 
signature of those signals inside generateBid() as protection against tampering.

* `trustedBiddingSignals`<br>
An object whose keys are the `trustedBiddingSignalsKeys` for the 
interest group, and whose values are returned in the `trustedBiddingSignals` request.

* `browserSignals`<br>
An object constructed by the browser, which might include information about page 
context (such as the `hostname` of the current page, which the seller could otherwise fake) and data
for the interest group itself (such as a record of when the group previously won an auction, to allow 
on-device frequency capping).

The `browserSignals` object has the following properties:

```javascript
{ 
  topWindowHostname: 'publisher.example',
  seller: 'https://ssp.example',
  joinCount: 3,
  bidCount: 17,
  prevWins: [[time1,ad1],[time2,ad2],...],
}
```

`generateBid()` returns an object with four properties:

* `ad`<br>
Arbitrary metadata about the ad, such as information the seller expects to learn about this bid or 
ad creative. The [seller](/docs/privacy-sandbox/fledge/#seller) uses this information in its auction and decision
logic.

* `bid`<br>
A numerical bid that will enter the auction. The seller must be in a position to compare 
bids from different buyers, therefore bids must be in some seller-chosen unit (e.g. "USD per 
thousand"). If the bid is zero or negative, then this interest group will not participate in the 
seller's auction at all. With this mechanism, the buyer can implement any advertiser rules for where 
their ads may or may not appear.

* `render`<br>
A URL, or a list of URLs, that will be rendered to display the creative if this bid 
wins the auction. (See [Ads Composed of Multiple Pieces](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces) 
in the API explainer.) The value has to match the `renderUrl` of one of the [ads defined for the 
interest group](#ad-components).


* `adComponents`<br>
An optional list of up to 20 components for 
[ads composed of multiple pieces](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces), 
taken from the [`adComponents`](ad-components) property of the interest group argument 
passed to `navigator.joinAdInterestGroup()`.

#### Asking a browser to leave an interest group

The interest group owner can request that a browser be removed from an interest group. In other 
words, the browser is asked to remove the interest group from the list of those it is a member of.

``` javascript
navigator.leaveAdInterestGroup({
  owner: 'https://dsp.example',
  name: 'custom-bikes'
});
```

If a user returns to the site which asked the browser to add an interest group, the interest group owner 
can call the `navigator.leaveAdInterestGroup()` function to request the browser remove the interest group. 
Code for an ad can also call this function for its interest group.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 3. The user visits a site that sells ad space

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", 
  alt="Illustration showing a person visiting a news website in a browser on their laptop. The site 
  has an empty ad slot.", width="400", height="182" %}

Later, the user visits a site that sells ads space, in this example a news website. The site has
[ad inventory](/docs/privacy-sandbox/fledge/#ad-inventory), which it sells programmatically using
[real-time bidding](/docs/privacy-sandbox/fledge/#rtb).

{% Aside %}

There are three main roles described in the FLEDGE proposal explainer: 

* **Advertiser**: a site that pays to advertise its products. In the example here, a custom bike
    maker. 
* **Publisher**: sites that sell ad space, such as the online news website referred to in the
    examples here. Many (but not all) sites selling ad space are content publishers. 
* **Seller**: the party running the ad auction (in the next step). Most publishers use an adtech
    service such as an [SSP](/docs/privacy-sandbox/fledge#ssp) to optimize selling ad inventory.

{% endAside %}

{: #ad-auction}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 4. An ad auction is run in the browser

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", 
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad 
  auction using the FLEDGE API is taking place.", width="400", height="182" %}

**Explainer section:** [Sellers Run On-Device Auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)

The ad auction is likely to be run by the publisher's [SSP](/docs/privacy-sandbox/fledge#ssp), or the publisher
itself. The purpose of the auction is to select the most appropriate ad for a single available ad
slot on the current page. The auction takes into account the interest groups the browser is a
member of, along with data from ad-space buyers and the seller—from trusted servers in the next
step. 

The ad-space **seller** makes a request to the user's browser to begin an ad auction by calling
`navigator.runAdAuction()`.

For example:

```javascript
const auctionConfig = {
  seller: 'https://ssp.example',
  decisionLogicUrl: ...,
  trustedScoringSignalsUrl: ...,
  interestGroupBuyers: ['https://dsp.example', 'https://buyer2.example', ...],
  additionalBids: [otherSourceAd1, otherSourceAd2, ...],
  auctionSignals: {...},
  sellerSignals: {...},
  perBuyerSignals: {
    'https://dsp.example': {...},
    'https://another-buyer.example': {...},
    ...
  },
};

const auctionResultPromise = navigator.runAdAuction(auctionConfig);
```

`runAdAuction()` returns a promise that resolves to a [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns) (`urn:uuid:<something>`) that represents the
ad auction outcome. This can only be decoded by the browser when passed to a [fenced frame](/docs/privacy-sandbox/fledge#fenced-frame)
for rendering: the publisher page cannot inspect the winning ad. 

The `decisionLogicUrl` script considers each individual ad, along with its associated bid and 
metadata, one at a time, and then assigns it a numerical desirability score.

#### <code>auctionConfig</code> properties

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Required</th>
        <th style="font-weight: bold; text-align: left;">Example</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>seller</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'https://ssp.example'</code></td>
        <td style="vertical-align: top;">Origin of the seller.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>decisionLogicUrl</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/auction-decision-logic.js'</code></td>
        <td style="vertical-align: top;">URL for auction worklet JavaScript.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedScoringSignalsUrl</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/scoring-signals'</code></td>
        <td style="vertical-align: top;">URL of seller's trusted server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>interestGroupBuyers*</code></td>
        <td style="vertical-align: top;">Required</td>
        <td style="vertical-align: top;"><code>['https://dsp.example', 'https://buyer2.example', ...]</code></td>
        <td style="vertical-align: top;">Origins of all interest group owners asked to bid in the auction.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>additionalBids</code>**</td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>[otherSourceAd1, otherSourceAd2, ...]</code></td>
        <td style="vertical-align: top;"><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants">Alternative ads</a> for participation in the auction.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">Seller information about page context, type of auction, etc.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>sellerSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">Information based on publisher settings, making a contextual ad request, etc.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{'https://dsp.example': {...},<br>
          &nbsp;&nbsp;'https://another-buyer.example': {...},<br>
          ...}</code></td>
        <td style="vertical-align: top;">Contextual signals about the page for each specific buyer, from their server.</td>
      </tr>
    </tbody>
  </table>
</div>

\* The seller may specify `interestGroupBuyers: '*'` to permit all interest groups to bid. 
Ads are then accepted or rejected based on criteria other than inclusion of the interest group owner. 
For example, the seller may review ad creatives to confirm compliance with their policies.

\*\* `additionalBids` is not supported in the current implementation of FLEDGE. Read the [Auction 
Participants](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants) section in the 
FLEDGE explainer for more information.

#### How are ads selected?

The `runAdAuction()` code must include a `scoreAd()` function, which is run once for each ad to 
determine its desirability.

```javascript
scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  ...
  return desirabilityScoreForThisAd;
}
```

`scoreAd()` takes the following arguments:
* `adMetadata`<br>
Arbitrary metadata provided by the buyer.
* `bid`<br>
A numerical bid value.
* `auctionConfig`<br>
The auction configuration object passed to `navigator.runAdAuction()`.
* `trustedScoringSignals`<br>
Values retrieved at auction time from the seller's trusted server, 
representing the seller's opinion of the ad.
* `browserSignals`<br>
An object constructed by the browser, including information that the browser 
knows and which the seller's auction script might want to verify:

```javascript
{ 
  topWindowHostname: 'publisher.example',
  interestGroupOwner: 'https://dsp.example',
  renderUrl: 'https://cdn.example/render',
  adComponentRenderUrls: ['https://cdn.com/ad-component-1',...],
  biddingDurationMsec: 12
}
```

Before an auction starts, the seller finds the best contextual ad for the available ad slot. Part of 
its `scoreAd()` logic is to reject any ad that can't beat the contextual winner.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 5. The seller and participating buyers receive realtime data from trusted servers

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", 
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad 
  auction using the FLEDGE API is taking place, with a participant getting data from a trusted 
  server.", width="400", height="126" %}

**Explainer section:** [Fetching Real-Time Data from a Trusted Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)

During an ad auction, the ad-space **seller** can get realtime data about specific ad creatives by
making a request to a trusted server using the `trustedScoringSignalsUrl` property of
[auction config](#ad-auction) argument passed to `navigator.runAdAuction()`, along with the keys
from the `renderUrl` properties of all entries in the `ads` and `adComponents` fields of all
interest groups in the auction. 

Likewise, an ad-space **buyer** can request realtime data from a trusted server using the 
`trustedBiddingSignalsUrl` and `trustedBiddingSignalsKeys` properties of the interest group argument 
passed to `navigator.joinAdInterestGroup()`. The URL for an ad buyer request to a trusted server 
might look like this:

```javascript
https://trusted-server.example/getvalues?hostname=publisher.example&keys=key1,key2
```

A request to this URL is made when `runAdAuction()` is called:
* The base URL comes from `trustedBiddingSignalsUrl`.
* The `hostname` is provided by the browser.
* The `keys` value is taken from `trustedBiddingSignalsKeys`. 

The response to this request is a JSON object providing values for each of the keys. 

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 6. The winning ad is displayed

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", 
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad 
  for a bike (20% off) is displayed—with a lock above to show that the ad is displayed in a 
  fenced frame.", width="400", height="192" %}

**Explainer section:** [Browsers Render the Winning Ad](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

As described earlier: the promise returned by [`runAdAuction()`](#ad-auction) resolves to an [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns)
which is passed to a [fenced frame](/docs/privacy-sandbox/fledge#fenced-frame) for rendering, and the site displays
the winning ad.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 7. The auction result is reported

**Explainer section:** [Event-Level Reporting (for now)](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)

{% Aside %}

The long-term plan is to enable the browser to report auction results for the seller and buyers 
using [aggregate reporting APIs](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now). 
As a temporary event-level reporting mechanism, the code implementing `reportResult()` for the 
seller, and `reportWin()` for the winning bidder, can call the `sendReportTo()` function. This takes 
a single argument: a string representing a URL that is fetched after the auction completes, which 
encodes event-level information to be reported.

{% endAside %}

#### Seller reports outcome

**Explainer section:** [Seller Reporting on Render](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#51-seller-reporting-on-render) 

{: #reportresult}

The seller's JavaScript provided at `decisionLogicUrl` (which also provided `scoreAd()`) can 
include a `reportResult()` function, to report the auction outcome. 

```javascript
reportResult(auctionConfig, browserSignals) {
  ...
  return signalsForWinner;
}
```

The arguments passed to this function are:

* `auctionConfig`<br>
The auction configuration object passed to `navigator.runAdAuction()`.

* `browserSignals` <br>
An object constructed by the browser providing information about the auction. 
For&nbsp;example:<br><br>

  ```javascript
  { 
    'topWindowHostname': 'publisher.example',
    'interestGroupOwner': 'https://dsp.example',
    'renderUrl': 'https://cdn.example/url-of-winning-creative.wbn',
    'bid:' <bidValue>,
    'desirability': <winningAdScore>
  }
  ```

The return value of this function is used as the `sellerSignals` argument for the winning bidder's 
`reportWin()` function.

#### Winning bidder reports outcome

**Explainer section:** [Buyer Reporting on Render and Ad Events](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#52-buyer-reporting-on-render-and-ad-events) 

The winning bidder's JavaScript (which also provided `generateBid()`) can include a 
`reportWin()` function to report the auction outcome. 

```javascript
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

The arguments passed to this function are:

* `auctionSignals` and `perBuyerSignals`<br>
The same values passed to [`generateBid()`](#generate-bid) for the winning bidder. 
* `sellerSignals`<br>
The return value of [`reportResult()`](#reportresult), which gives the seller an 
opportunity to pass information to the buyer. 
* `browserSignals`<br>
An object constructed by the browser providing information about the auction.
For&nbsp;example:<br><br>

  ```javascript
  { 
    'topWindowHostname': 'publisher.example',
    'seller': 'https://ssp.example',
    'interestGroupOwner': 'https://dsp.example',
    'interestGroupName': 'custom-bikes',
    'renderUrl': 'https://cdn.example/winning-creative.wbn',
    'bid:' <bidValue>
  }
  ```

{% Aside %}
A reporting mechanism for losing bidders is [under discussion](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting).
{% endAside %}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 8. An ad click is reported

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="Illustration showing 
  a person clicking on an ad for a bike, inside a fenced frame, on a news website, with report 
  data going to seller and buyers.", width="600", height="220" %}

A click on an ad rendered in a fenced frame is reported. To learn more about how this might work,
see [Fenced Frames Ads Reporting](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent).

<hr>


<br>

{: #auction-diagram}

The diagram below outlines each stage of a FLEDGE [ad auction](#ad-auction): 
<a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png?auto=format&w=1600"
  target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/roes4NP2gaUcEFD2uVlW.png", alt="Illustration providing 
  an overview of each stage of a FLEDGE ad auction", 
  width="800", height="481" %}
</figure>

<br>



{% Details %}

{% DetailsSummary %}
### What is the difference between FLEDGE and TURTLEDOVE?
{% endDetailsSummary %}

FLEDGE is the first experiment to be implemented in Chromium within the TURTLEDOVE family of proposals.

FLEDGE follows TURTLEDOVE's high-level principles. Some online advertising has been based on showing an ad to a potentially-interested person who has previously interacted with the advertiser or ad network. Historically this has worked by the advertiser recognizing a specific person as they browse across web sites, a core privacy concern with today's web.

The TURTLEDOVE effort is about offering a new API to address this use case while offering some key privacy advances:

-  The browser, not the advertiser, holds the information about what the advertiser thinks a
   person is interested in.
-  Advertisers can serve ads based on an interest, but cannot combine that interest with other
   information about a person — in particular, who they are or what page they are visiting.

FLEDGE grew out of TURTLEDOVE and a collection of related proposals for modifications to better served the developers who would be using the API:

-   In [SPARROW](https://github.com/WICG/sparrow):
   [Criteo](https://www.admonsters.com/what-is-sparrow/) proposed the addition of a trusted-server
   ("Gatekeeper") model.  FLEDGE includes a more limited use of trusted servers, for real-time data
   lookup and aggregated reporting.​​
-  NextRoll's [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) and Magnite's
   [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md)
   proposals described the different roles that buyers and sellers had in the on-device auction. 
   FLEDGE's ad bidding/scoring flow is based on this work.
-  RTB House's [Outcome-based](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md) and
   [Product-level](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md) TURTLEDOVE
   modifications improved the anonymity model and personalization capabilities of the on-device auction
-  [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) is
   Microsoft's proposal for a TURTLEDOVE-like ad service that relies on a trusted proxy server
   between the browser and the adtech providers, to anonymize ad requests and enforce privacy
   properties.  FLEDGE has not adopted this proxying model.  We are bringing the JavaScript APIs
   for PARAKEET and FLEDGE into alignment, in support of future work to further combine the best
   features of both proposals.

FLEDGE does not yet prevent a website's ad network from learning which ads a person sees. We expect it to modify it to become more private over time.

{% endDetails %}


{% Details %}

{: #user-controls}

{% DetailsSummary %}
### What browser configuration is available?
{% endDetailsSummary %}

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

{% endDetails %}


<br><br>

{: #engage}


## Engage and share feedback 

-  **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md),
   [raise questions and follow discussion](https://github.com/WICG/turtledove/issues).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Developer support**: Ask questions and join discussions on the   
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-  **FLEDGE mailing list**: [fledge-api-announce](https://groups.google.com/u/1/a/chromium.org/g/fledge-api-announce)
   provides announcements and updates about the API.


## Find out more 

-  [The FLEDGE API](/docs/privacy-sandbox/fledge): less technical overview of the proposal.
-  [FLEDGE demo](https://fledge-demo.glitch.me): walkthrough of a basic FLEDGE deployment. 
-  [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
-  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
-  [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)

---
  
Photo by [Ray Hennessy](https://unsplash.com/@rayhennessy) on [Unsplash](https://unsplash.com/photos/GL6ORxDMswI).
