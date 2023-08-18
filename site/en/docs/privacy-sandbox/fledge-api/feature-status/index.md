---
layout: 'layouts/doc-post.njk'
title: 'Status of pending Protected Audience API capabilities'
subhead: >
  Learn more about Protected Audience API auction features as we approach third-party
  cookie deprecation.
description: >
  Learn more about Protected Audience API auction features as we approach third-party
  cookie deprecation.
date: 2023-02-09
updated: 2023-06-01
authors:
  - tristramsouthey
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

As we move [Protected Audience API](/docs/privacy-sandbox/fledge/) closer to general
availability and approach third-party cookie deprecation in Chrome, you may be
wondering about the availability of Protected Audience API services and features. Here you'll
find a list of the scoped Protected Audience API features and when they'll be supported. 

## Feature availability timeline

<table class="with-heading-tint with-borders width-full">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Available for testing</th>
      <th>Status</th>
    </tr>
  </thead>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now">Event-level auction win reporting</a>
   </td>
    <td>Now</td>
    <td><p>Supported until at least 2026.</p>
      <p>This feature is intended to make the transition to Protected Audience API reporting from third-party cookie reporting easier. Thus, this reporting will not be supported after ad techs have had time to update their reporting mechanisms.</p>
    </td>
  </tr>
  <tr>
    <td><a href="/docs/privacy-sandbox/private-aggregation/#contributetohistogramonevent">Trigger-based aggregation</a>
   </td>
    <td>Now</td>
    <td><p>Available for testing in Chrome Canary/Dev M113+ and Beta/Stable M115+.</p>
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment">Trusted Execution Environment (TEE)</a> usage for Key/Value service</td>
    <td>Now</td>
    <td>Required no sooner than Q3 2025.</td>
  </tr>
  <tr>
    <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced frames</a>
   </td>
    <td>Now
   </td>
    <td>Required no sooner than 2026.</td>
  </tr>
  <tr>
    <td>Improved Protected Audience API + <a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a> integration.</td>
    <td>2023 Q2</td>
    <td>Available for testing in Chrome Stable M112+.</td>
  </tr>
 <tr>
    <td><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md">K-anonymity</a>
   </td>
    <td>Later in 2023 Q3
   </td>
    <td>For rendering creatives, the k-anonymity threshold of “a crowd of 50 users per creative over 7 days” must be met. 
   </td>
  </tr>
    <tr>
    <td><a href="/blog/fledge-service-overview/#bidding-auction-service">Bidding and Auction services</a>
   </td>
    <td>Targeted for testing in H2 2023.</td>
    <td>In development.</td>
  </tr>
</table>

### Additional features

<table class="with-heading-tint with-borders width-full">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Available for testing</th>
      <th>Status</th>
    </tr>
  </thead>
    <tr>
    <td>Event-level user bidding signals for modeling (<a href="https://github.com/WICG/turtledove/issues/435">Github Issue</a>)</td>
    <td>Later in 2023</td>
    <td>Available in Chrome for origin trial in Q2 2023.</td>
  </tr>
    <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/299">Per-Buyer Latency Reporting</a></td>
    <td>Later in 2023</td>
    <td>Available in Chrome for origin trial in Q1 2023.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/293">Per-buyer wall-time timeout</a></td>
    <td>Later in 2023</td>
    <td>Available in Chrome for origin trial in Q1 2023.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/165">Buyer reporting ID for custom breakdowns</a></td>
    <td>Later in 2023</td>
    <td>Expected in Chrome for origin trial in Q3 2023.</td>
  </tr>
    <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/441">Direct seller destination support</a></td>
    <td>Later in 2023</td>
    <td>Available in Chrome for origin trial in Q1 2023.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/356">Accuracy-limited ad cost for cost-per-click billing</a></td>
    <td>Later in 2023</td>
    <td>Available in Chrome for origin trial in Q2 2023.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/166">Currency for highest bid and highest other scoring bid</a>
    </td>
    <td>Later in 2023</td>
    <td>Expected in Chrome for origin trial in Q3 2023.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/477">Macro Support for Third-party Ad Trackers (3PAT)</a>
    </td>
    <td>Later in 2023</td>
    <td>Expected in Chrome in Q3 2023.</td>
  </tr> 
  <tr>
    <td><a href="https://github.com/WICG/turtledove/issues/319">Support for Negative Interest Group Targeting</a>
    </td>
    <td>Later in 2023</td>
    <td>Expected in Chrome in Q3 2023.</td>
  </tr> 
  </table>

## Event-level auction win reporting

We initially indicated that the event-level auction win reporting would be a
temporary solution, and [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) will be used to generate summary reports. After listening to feedback and examining the relative complexity of aggregation-based solutions, particularly for billing, we have decided to not remove support for [event-level auction win results reporting](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now) with `reportResult()` and `reportWin()` functions having the ability to call [`sendReportTo()`](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#reporting) until sometime after third-party cookie deprecation. 

Event-level auction win reporting will be supported until at least 2026, and we will provide advanced notice before the API transitions to any alternative solutions. 

Auction loss reporting will continue to be supported through the
[Private Aggregation API](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md).

## Trigger-based aggregate reporting
During a Protected Audience auction, you can send an aggregatable report when triggered by an event using [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/)’s `contributeToHistogramOnEvent()` method. The triggering event can come from the auction itself, such as an auction win or loss, which allows you to generate an auction loss report. The event can also come from a fenced frame outside of the auction using [Fenced Frame Ads Reporting API](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md)’s `window.fenced.reportEvent()` to trigger the aggregatable report submission. 

See the [`contributeToHistogramOnEvent()` section of the Private Aggregation page](/docs/privacy-sandbox/private-aggregation/#contributetohistogramonevent) to learn more. 

## Trusted Execution Environment usage for Key/Value service

The [Protected Audience API Key/Value service](/blog/open-sourcing-fledge-key-value-service/) allows the auction to retrieve real-time signals when the bid is generated by the buyer and the ad is scored by the seller. The Key/Value service will eventually be required to run in a [trusted execution environment (TEE)](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) to ensure that the user's data is kept private.

Running the Key/Value service in a TEE will not be required until sometime after third-party cookie deprecation. We will provide at least 12 months notice before TEE usage is mandatory. Until then, you can continue to use [your own server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now) for real-time key/value signals. Note that running the Key/Value service in a TEE with [user-defined functions](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md#support-for-user-defined-functions-udfs) (UDFs) will be available for testing by the end of Q1 2023 with on-device Protected Audience API. 

## Fenced frames

[Fenced frames](/docs/privacy-sandbox/fenced-frame/) are a new HTML element that limits communication between the content and the embedder, and is used for rendering content based on cross-site data. The Protected Audience API will render content into a fenced frame.

After working closely with various stakeholders and examining the significant effort to accommodate this change, Chrome will not mandate fenced frames until at least 2026 to maintain ecosystem inclusivity,and Chrome will provide significant advanced notice. Until then, if fenced frames are not used, you will need to use an iframe to render the [opaque URN](https://github.com/WICG/fenced-frame/blob/master/explainer/opaque_src.md). Also, it should be noted that sellers could still require the use of Fenced Frames.

{% Aside %}
The temporary `navigator.deprecatedURNToURL()` will be removed by third-party cookie deprecation.
{% endAside %}

{% Partial 'privacy-sandbox/timeline/fenced-frames-features.njk' %}

## Improved Protected Audience API and Attribution Reporting integration

Recently, challenges have been [pointed out](https://github.com/WICG/turtledove/issues/281)
around the integration of the
[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) and
Protected Audience API, especially where fenced frames are involved. 

For event-level reporting with the Protected Audience API, we have a proposed set of initial
improvements to make this integration easier which you can learn more about in
the [explainer](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#support-for-attribution-reporting).
The integration will be available for both fenced frames and iFrames.
Event-level reporting will be available for testing in Chrome Stable M112+.

For those who need [Attribution Reporting with the Protected Audience API](https://github.com/WICG/turtledove/issues/289),
we are working on more flexible solutions to capture more bidding signals with
aggregatable reports, and we will publish a proposal once it is ready. 

## K-anonymity

We will soon publish an explainer with more details on how [k-anonymity](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md) will be enforced using the Protected Audience API framework.

For rendering a creative, we will require _a crowd of 50 users per creative within the past 7 days_ to pass the k-anonymity threshold before the ad can be served. The creative is available to be served as soon as it hits the 50 ads threshold and does not need to wait for 7 days. 

K-anonymity requirements will be available for testing and will be enforced
later in 2023. We encourage feedback from ad tech on this parameter.

## Bidding and Auction Services

We have heard some concerns about
[Protected Audience API latency](https://github.com/WICG/turtledove/issues/385) and are
actively working on improving on-device latency. Both Chrome and Android plan
to provide [Bidding and Auction Services](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)
as an additional way to run bidding and scoring logic besides on-device
auctions. Bidding and Auction services is a
[Protected Audience API service](/blog/fledge-service-overview/) solution for running auctions
off-device, which we believe will allow for even faster performance.

We will continue to support on-device auctions, and the use of the Bidding and
Auction Services is not required unless it fits your use cases.

More details can be found in the [blog post](/blog/bidding-and-auction-services-availability/).

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}
