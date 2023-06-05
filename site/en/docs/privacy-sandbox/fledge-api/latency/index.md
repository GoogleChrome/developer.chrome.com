---
layout: 'layouts/doc-post.njk'
title: 'Improve Protected Audience API auction latency'
subhead: >
  Review a collection of best practices to improve Protected Audience API auction latency.
description: >
  Review a collection of best practices to improve Protected Audience API auction latency.
date: 2022-06-27
updated: 2022-07-04
authors:
  - pauljensen
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

It's in everyone's best interest to make sure the Protected Audience API operates efficiently.

* People browsing the web want sites to load quickly. This means developers
  should build with the Protected Audience API efficiently as to not overutilize limited device
  resources, like compute or network resources, that are necessary to load
  sites and their embedded ads.
* Publishers want their sites to load quickly, providing users an efficient and
  responsive experience. Publishers also want effective advertising to maximize
  their revenue.
* Advertisers and ad techs want their ads to display quickly to provide the
  greatest utility.

This document outlines some best practices for a Protected Audience API implementation, to ensure
your site operates at maximum efficiency.

## Buyer (bidder) best practices

To make sure you're optimizing for Protected Audience API auction efficiency, follow these best
practices.

### Fewer interest group owners

To protect Protected Audience API bidders in the same way that the browser protects different
origins on the web using [site isolation](https://www.chromium.org/Home/chromium-security/site-isolation/),
the browser uses expensive resources (like operating system processes) to
protect individual interest group owners.

To minimize the expenditure of these very expensive resources, having the
fewest number of interest group owners is crucial. Avoid having different
interest groups owned by various subdomains. For example, if `adtech.example`
had interest groups owned by `cats.adtech.example` and `dogs.adtech.example`,
the browser would likely use two separate processes to run their bidding
scripts.

### Fewer interest groups bidding

The browser must do significant setup and preparation before invoking a buyer's
`generateBid()` script, such as setting up a new clean JavaScript execution
environment, and parsing and loading the `generateBid()` code.

* Interest groups that represent users who aren't the current target of and
  active advertising campaign should have empty ad creative lists. This prevents
  the Protected Audience API from executing `generateBid()` for interest groups without relevant
  ads.
* Combining similar interest groups will decrease the number of times
  `generateBid()` must be run. An interest group's `userBiddingSignals`
  property can be used to store additional metadata about the user, so fewer
  interest groups doesn't have to mean less effective targeting.
* Currently, the Protected Audience API supports seller-specified limits on the numbers of interest
  groups, and an API for buyers to specify the relative priority of their
  interest groups. These limits can be used to significantly reduce the number
  of bidding scripts to run.

There is ongoing discussion about how to filter the interest groups that
participate in an auction. If you have ideas in this area,
[file a GitHub issue](https://github.com/WICG/turtledove/issues/new) or
contribute to [Issue 305](https://github.com/WICG/turtledove/issues/305).

There is ongoing discussion about how to reuse the JavaScript execution
environment between auctions. Reusing the environment reduces the amount of
time the browser must spend initializing them. You can follow along:

* [Issue 304](https://github.com/WICG/turtledove/issues/304)
* [Issue 310](https://github.com/WICG/turtledove/issues/310)
* Or [file a new GitHub issue](https://github.com/WICG/turtledove/issues/new).

### Reuse bidding scripts

Set up a shared bidding script for separate interest groups. This prevents the
browser from having to download, parse, and compile multiple scripts (which
incurs extra network requests).

### Reuse `trustedBiddingSignalsUrls`

Network latency and resource usage can be very significant. Fewer real-time
trusted bidding signals fetches can help reduce this latency.

The [trusted bidding signal fetches can be combined](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#11-joining-interest-groups)
when the `trustedBiddingSignalsUrl` is reused amongst multiple interest groups.
When possible, use the same `trustedBiddingSignalsUrl` between interest groups.

### Smaller real-time trusted bidding signals fetches

Network latency can be very significant, and this is directly impacted by how
much data is transferred during the real-time trusted bidding signal fetches.

Prefer storing ad-specific or interest-group-specific data in the interest
group, rather than on the real-time trusted bidding signal service. Reserve
real-time trusted bidding signal data for only those truly real-time signals,
like campaign budgeting or kill-switches.

Any signal that can be updated on a daily or longer basis should be stored in
the interest group and updated via the daily updates.

## Seller best practices

Make sure you're monitoring and optimizing for Protected Audience API auction efficiency.

### Monitor your auctions

Collect metrics on your auctions. The number of interest group owners and
interest groups bidding significantly impacts auction performance and should be
monitored. The metrics are visible in `scoreAd()`.

`scoreAd()` receives `biddingDurationMsec`, which indicates how long a bidder
took to compute their bid. Though multi-core processors can execute multiple
bidding scripts concurrently, this still has a significant effect on
performance and is worth monitoring.

Bidders may have insights into their own interest groups' bidding performance,
but they may not be able to compare this to other bidders. Comparing relative
win rates and bid rejection rates for different bidders may help identify cases
where bidding compute resources were wasted due to interest groups never
producing viable bids or excessive bidding with unapproved creatives.

### Protect against slow bid scripts

Bidding scripts that take excessive time can slow the Protected Audience API auction down for everyone involved.

* **Use timeouts**. The Protected Audience API includes some default time-outs for bidding scripts,
  but `perBuyerTimeouts` can be adjusted to ensure that no bidders
  participating in the auction are using excessive computation time. 
  * Consider participating in future timeouts and limits discussions, as
     described in [Issue 293](https://github.com/WICG/turtledove/issues/293).
* **Use limits**. Setting bidding script timeouts can prevent one script
  execution using excessive time, but buyers are free to add users to many,
  potentially duplicate, interest groups, and each interest group gets a chance
  to bid and a separate timeout. By using `perBuyerGroupLimits` to set limits
  on the number of interest groups, you can prevent individual buyers from
  consuming excessive auction time.
  * Work with your buyers to ensure they set interest group priorities. This
    will help ensure their most important interest groups are included in each
    auction.

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}
