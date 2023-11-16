---
layout: 'layouts/doc-post.njk'
title: 'Sequential auction setup with header bidding and multi-seller Protected Audience auction'
subhead: >
  Learn how the Protected Audience auction can fit into the existing ad infrastructure
description: >
  Learn how the Protected Audience auction can fit into the existing ad infrastructure
date: 2023-11-16
authors:
  - kevinkiklee
  - garimamimani
---

Publishers typically diversify their ad demand sources to optimize for revenue and invoke multiple companies (for example, publisher ad servers, supply-side platforms, and demand-side platforms) to determine the best ad for a given ad slot on the page. Header bidding allows publishers to capture bids for an ad slot from a variety of demand sources. In a sequential auction setup, header bidding library may be used to run an auction with contextual data and Protected Audience is used to run an auction with cross-site data. 

Before you begin, learn about the fundamentals of Protected Audience from the [landing page](/docs/privacy-sandbox/protected-audience/) and [header bidding](https://docs.prebid.org/overview/intro-to-header-bidding.html) from the Prebid.js documentation.

## Definitions

### Auctions

<table>
  <tr>
   <td><strong>Auction</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
  </tr>
  <tr>
   <td>Contextual auction
   </td>
   <td>An ad auction that uses the data available within the context of where the auction executes. There may be multiple auctions within a contextual auction, such as header bidding and server-side auctions.
   </td>
  </tr>
  <tr>
   <td>Protected Audience auction
   </td>
   <td>An ad auction that involves bidding on an interest group created on another site. 
   </td>
  </tr>
  <tr>
   <td>Protected Audience multi-seller auction
   </td>
   <td>A two-tier Protected Audience auction that first involves multiple parallel component auctions that then submit their top scoring ad to the final top-level auction.
   </td>
  </tr>
  <tr>
   <td>Top-level auction
   </td>
   <td>The final ad auction within a Protected Audience multi-seller auction that provides the scoring for the component auction winners from the component auctions. 
   </td>
  </tr>
  <tr>
   <td>Component auction
   </td>
   <td>A nested auction within a Protected Audience multi-seller auction where each component seller is running their component auctions in parallel. The top scoring ads from each component auction is passed up to the top-level auction.
   </td>
  </tr>
  <tr>
   <td>Sequential auction setup
   </td>
   <td>An ad auction setup that integrates contextual auctions with a Protected Audience auction, and determines a winner between the two auctions. 
   </td>
  </tr>
</table>

### Participants

<table>
  <tr>
   <td><strong>Participant</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
  </tr>
  <tr>
   <td>Advertiser
   </td>
   <td>The party that desires an ad placement and builds the ad creative.
   </td>
  </tr>
  <tr>
   <td>Publisher
   </td>
   <td>The party that provides ad inventory for auction.
   </td>
  </tr>
  <tr>
   <td>Buyer
   </td>
   <td>The party that bids in an auction to buy the ad space from a seller. Commonly a demand-side platform (DSP). 
   </td>
  </tr>
  <tr>
   <td>Publisher Ad Server
   </td>
   <td>A service used by publishers to manage and choose ads to be rendered on the site. A Publisher Ad Server may combine its own auction results, header bidder responses, direct-sold inventory, and more, to determine the ad that will provide the most revenue to a publisher. 
<p>
A Publisher Ad Server may provide a client-side library for interacting with the server.
   </td>
  </tr>
  <tr>
   <td>Top-level seller
   </td>
   <td>The party that invokes (that is, creates) the Protected Audience multi-seller auction and participates in the top-level auction. 
   </td>
  </tr>
  <tr>
   <td>Component seller
   </td>
   <td>The party that runs a component auction within the Protected Audience multi-seller auction to sell the publisher’s ad space to the buyers. Commonly a supply-side platform (SSP). 
   </td>
  </tr>
</table>

## Sequential auction setup

In a sequential auction setup, the contextual auctions are executed first, then the Protected Audience auction is executed. This setup allows publishers to maximize their earning potential by running an auction with the contextual data available on the page, and also running an auction with cross-site data in a secure environment to protect users' privacy. 

A [header bidding](https://docs.prebid.org/overview/intro-to-header-bidding.html#introduction-to-header-bidding) library may be executed first on the page to collect bids for the Publisher Ad Server’s contextual auction. Then, the adjusted winning bid price of the contextual auction can be entered into the Protected Audience auction as a bid floor. During the scoring step, the top-level seller can drop component auction bid prices below the bid floor by assigning them a zero score when the desirability score is calculated. If no Protected Audience component auction bid is above the bid floor, then the contextual auction winning ad is rendered to the user. If the Protected Audience auction returns a winner, it means it is above the bid floor, and the Protected Audience winning ad is rendered to the user. 

{% Aside %}
The setup in this document describes one potential approach to integrating Protected Audience with existing ad serving mechanisms, but it is not the only way. This document describes how one of the header bidding libraries, Prebid.js, has integrated with Protected Audience.
{% endAside %}

In this sequential auction setup example, three major auctions may be executed on the page in order: 1) contextual auction by header bidding library, 2) contextual auction by the Publisher Ad Server, and 3) Protected Audience auction.

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/PhfNzJgX2G439XmkgsyD.png", alt="User is added to an interest group on an advertiser site before a contextual and a Protected Audience auction is executed on the publisher site, then the Publisher Ad Server client-side library chooses the winner between these two auctions", width="800", height="315" %}
  <figcaption>
    Overview of Protected Audience multi-seller auction with header bidding contextual auction<br/>
    <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/PhfNzJgX2G439XmkgsyD.png" target="_blank">View full size diagram</a>
  </figcaption>
</figure>

Detailed description of the overview diagram: 

1. Before the auction, the user is added to an interest group on an advertiser site. 
2. When the user visits the publisher page at a later time, Prebid.js runs a contextual auction to collect the bid responses from header bidders. During this step, the buyers may provide the signals and the sellers may provide component auction configs to be used in the subsequent Protected Audience auction. Prebid.js provides a [module](https://docs.prebid.org/dev-docs/modules/fledgeForGpt.html) for propagating these signals and configs to the Protected Audience auction.
3. The bid responses collected by Prebid.js are sent to the Publisher Ad Server for a server-side contextual auction.
4. The Publisher Ad Server may combine its own auction results, header bidding results, direct-sold inventory, and more, to determine the ad that will provide the most revenue to a publisher. The winning ad is returned to the client-side library of the Publisher Ad Server.
5. The adjusted bid price from the contextual auction winner, along with the buyer’s signals (`perBuyerSignals`) and seller’s component auction configs gathered by Prebid.js can be passed into the Protected Audience auction by the Publisher Ad Server’s client-side library. 
6. The Protected Audience multi-seller auction is executed by the top-level seller. During the top-level seller’s scoring step, the top-level seller may compare each component auction winning bid price against the contextual auction adjusted winning bid price. If the component bid price is lower than the contextual auction bid price, then the top-level seller returns the desirability score of `0`. If all bids are scored `0`, then the `runAdAuction()` call returns `null` which signifies that the contextual auction winning ad should be rendered.
7. The Publisher Ad Server client-side library either renders the winning Protected Audience ad or contextual ad, based on what was returned from the `runAdAuction()` call. 
8. The winning ad is rendered to the user.

### Pre-auction

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/nasCbCGL8tuOeWT7VerM.png", alt="User is added to an interest group on an advertiser site", width="800", height="349" %}
  <figcaption>
    Interest group time sequence on an advertiser page<br/>
    <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/nasCbCGL8tuOeWT7VerM.png" target="_blank">View full size diagram</a>
  </figcaption>
</figure>

Before the auction, when the user visits an advertiser page, the buyer and the advertiser can define the site’s interest group the user belongs in, and add contextual data from the advertiser’s site and first-party data to be used as signals for the auction later. 

1. The user navigates to the advertiser site.
2. The advertiser site loads the script from each buyer participating in the auction at a later point in time. 
3. The buyer’s script contains the `joinAdInterestGroup()` call to add the user to the buyer’s interest group. 

### Contextual auctions with Prebid.js and Publisher Ad Server

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/s6skvEz9boQNm98BLtW7.png", alt="Contextual auction is initiated on the publisher site", width="800", height="349" %}
  <figcaption>
    Contextual auction time sequence on the publisher page<br/>
    <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/s6skvEz9boQNm98BLtW7.png" target="_blank">View full size diagram</a>
  </figcaption>
</figure>

In a sequential auction setup, all contextual auctions are executed before the Protected Audience auction runs. In the setup explained in this document, we run a header bidding contextual auction by Prebid.js that feeds into a server-side auction by the Publisher Ad Server. 

The publisher first initiates a header bidding contextual auction by calling Prebid.js with [a flag](https://docs.prebid.org/dev-docs/modules/fledgeForGpt.html#:~:text=bidderRequest.fledgeEnabled) to note that a Protected Audience auction will be executed afterwards. Then Prebid.js [collects](https://docs.prebid.org/dev-docs/modules/fledgeForGpt.html) the bid responses and sends them to the Publisher Ad Server for a server-side contextual auction. During the bid response collection step, the buyers and sellers have the opportunity to provide component auction configs and buyers’ signals (`perBuyerSignals`) to be used for the subsequent Protected Audience auction, if they wish to participate. That component auction config will eventually pass into the subsequent Protected Audience auction.

1. <b>Contextual auction initialization</b><br/>The user visits the publisher page.
2. The publisher page loads the Publisher Ad Server client-side library and defines ad slots.
3. The publisher page loads Prebid and starts the header bidding contextual auction. 
4. <b>Seller A’s contextual auction</b><br/>(running in parallel to Seller B’s contextual auction)<br/>Prebid.js sends a bid request to Seller A.
5. Seller A retrieves the bid responses  and `perBuyerSignals` from the buyers.
6. Seller A executes a contextual auction.
7. Seller A constructs the component auction config with `perBuyerSignals` included.
8. Seller A responds to Prebid.js with the winning bid and its component auction config.
9. <b>Seller B’s contextual auction</b><br/>(runs in parallel to Sellers A’s contextual auction)<br/>Prebid.js sends a bid request to Seller B.
10. Seller B retrieves the bid responses and `perBuyerSignals` from the buyers.
11. Seller B executes a contextual auction.
12. Seller B constructs the component auction config with `perBuyerSignals` included.
13. Seller B responds to Prebid.js with the winning bid and its component auction config.
14. <b>Publisher Ad Server’s contextual auction</b><br/>The bid responses collected by Prebid.js are sent to the Publisher Ad Server for the contextual auction.
15. The component auction configs with buyers’ signals are shared with the client-side library of the Publisher Ad Server
16. The Publisher Ad Server runs a contextual auction to determine the best ad between direct sold campaigns, programmatic bids, Prebid’s contextual bids, and other inventory. 
17. The Publisher Ad Server returns the adjusted winning bid.

### Protected audience multi-seller auction

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/fKxX6ZRulOHXVUP7Xn2W.png", alt="Protected Audience multi-seller auction chooses the highest scoring ad from the bids submitted by the component auctions", width="800", height="884" %}
  <figcaption>
    Protected Audience auction time sequence on the publisher page<br/>
    <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/fKxX6ZRulOHXVUP7Xn2W.png" target="_blank">View full size diagram</a>
  </figcaption>
</figure>

At this stage, contextual auctions have concluded, and the Publisher Ad Server’s client-side library can pass the contextual auction winning adjusted bid price, component auction configs, and signals from buyers that are participating in the Protected Audience auction to the top-level seller. The contextual auction bid price as a floor can be passed into the auction config as a signal for scoring at the top-level auction.

The component auctions are executed in parallel, and in each component auction, the browser generates bids from the bidding logic of each buyer participating in that component auction, scores each bid using the component seller’s scoring logic, and then returns the highest scoring ad to the top-level auction. 

1. The publisher site loads the top-level seller’s script.
2. The publisher ad server’s client-side library provides contextual auction bid price, component auction configs with signals from buyers to the top-level seller. The contextual auction winning ad bid price can be passed into the auction config as seller signals (this bid price becomes available in the top-level seller’s `scoreAd()` function).
3. The top-level seller starts the Protected Audience auction by calling `runAdAuction()`. 
4. <b>Seller A component auction</b><br/> (running in parallel to Seller B’s component auction)<br/>The browser reads the user’s interest groups for all buyers participating in Seller A’s component auction.
5. The browser fetches the bidding scripts and trusted bidding signals from the locations specified in the interest groups of the buyers participating in the component auction.
6. The browser generates the bids by executing each buyer’s bid generation logic.
7. The browser fetches the scoring script and trusted scoring signals of each ad from Seller A.
8. The browser executes Seller A’s scoring logic for each bid.
9. The browser chooses the ad with the highest score submitted by Seller A’s scoring logic.
10. <b>Seller B component auction</b><br/>(running in parallel to Seller A’s component auction)<br/>The browser reads the user’s interest groups for all buyers participating in Seller B’s component auction.
11. The browser fetches the bidding scripts and trusted bidding signals from the locations specified in the interest groups of the buyers participating in the component auction.
12. The browser generates the bids by executing each buyer’s bid generation logic.
13. The browser fetches the scoring script and trusted scoring signals of each ad from Seller B.
14. The browser executes Seller B’s scoring logic for each bid.
15. The browser chooses the ad with the highest score submitted by Seller B’s scoring logic.

### Top-level auction scoring and ad rendering

<figure>
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/tMwANg0vcHve1toQ8ggq.png", alt="The Publisher Ad Server client-side library renders the ad that was chosen between the contextual auction and the Protected Audience auction", width="800", height="488" %}
  <figcaption>
    Ad rendering sequence on the publisher page<br/>
    <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/tMwANg0vcHve1toQ8ggq.png" target="_blank">View full size diagram</a>
  </figcaption>
</figure>

After the component auctions from the previous section are executed, the browser runs the top-level seller’s scoring logic on each component auction’s winning ad. In the top-level seller’s `scoreAd()` function, the contextual auction adjusted bid price may be available as `sellerSignals`, and the scoring logic may compare that contextual auction bid price against the Protected Audience component auction’s winning bid price. 

If the contextual auction’s winning bid price is higher than the component auction’s winning bid price, then the `scoreAd()` function can return a desirability score of `0`. If there are no ads with a desirability score higher than `0`, then it signifies that the contextual auction’s winning ad is more valuable than any of the component auction’s winning ads, and the `runAdAuction()` function returns `null`. 

If the Protected Audience auction has no winner and returns `null`, then the publisher’s ad server client-side library can render the contextual auction winner into an iframe. If the Protected Audience auction is the winner against the contextual auction and returns a `FencedFrameConfig` object or an opaque URN, the winning Protected Audience auction ad can be rendered into a fenced frame or an iframe. 

1. <b>Top-level auction ad scoring</b><br/>The browser fetches the scoring script from the top-level seller along with trusted scoring signals of each ad.
2. The browser executes the top-level seller’s scoring logic for each winning bid of all component auctions. Inside the top-level seller’s `scoreAd()` script, the logic has access to the contextual auction adjusted winning bid price that may have been passed in as `sellerSignals` in the auction config. The script can compare the winning contextual bid price with component Protected Audience bid price and return a desirability score of 0 if the contextual price is higher.  Otherwise the script calculates the desirability score, likely based on the component Protected Audience bid price. 
3. The browser chooses the ad with the highest desirability score submitted by the top-level seller’s scoring logic.
4. <b>If the Protected Audience auction wins</b><br/>The Protected Audience auction returns a `FencedFrameConfig` object or an opaque URN to the publisher’s ad server client-side library.
5. Client-side library sets the fenced frame’s `config` attribute to the `FencedFrameConfig` object or sets the iframe’s `src` attribute to the opaque URN of the winning Protected Audience ad.
6. The browser fetches the Protected Audience auction winning ad from the buyer.
7. The browser renders the ad to the user.
8. <b>If the contextual auction wins</b><br/>The Protected Audience auction returns `null`.
9. The browser sets the iframe’s `src` attribute to the winning contextual ad.
10. The browser fetches the contextual auction winning ad from the buyer.
11. The browser renders the ad to the user.

## Engage and share feedback

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}
