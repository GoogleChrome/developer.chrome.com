---
layout: 'layouts/blog-post.njk'
title: FLEDGE API developer guide
authors:
  - samdutton
  - kevinkiklee
description: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. 
date: 2022-01-27
updated: 2022-08-24
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/UiyBX61nCLHExFoy0eEn.jpg
alt: Photograph of a piping plover bird with a chick on a sandy beach in Middletown, New Jersey, United States.
tags:
  - privacy
  - security
---

{% YouTube
  id='HkvmYKqnytw'
%}


## Who is this article for? {: #who}

This post is a technical reference to the current iteration of the experimental FLEDGE API.

* [The FLEDGE API](/docs/privacy-sandbox/fledge) is a less technical overview of the proposal,
and also has a [glossary](/docs/privacy-sandbox/fledge#glossary).

* [The FLEDGE demo](https://fledge-demo.glitch.me) provides a walkthrough of a basic FLEDGE
deployment.

* [The FLEDGE demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
explains how the demo code works, and shows how to use Chrome DevTools for FLEDGE debugging.


## What is FLEDGE? {: #what}

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


## How can I try FLEDGE? {: #try-fledge}

### FLEDGE demo {: #demo}

A walkthrough of a basic FLEDGE deployment across advertiser and publisher sites is  available at
[fledge-demo.glitch.me](https://fledge-demo.glitch.me/).
 
The [demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
explains how the demo code works, and shows how to use Chrome DevTools for FLEDGE debugging.

{% YouTube
  id='znDD0gkdJyM'
%}

### Take part in a FLEDGE origin trial {: #origin-trial}

A Privacy Sandbox Relevance and Measurement [origin trial](/blog/origin-trials/) has been
made available in Chrome Beta 101.0.4951.26 and above on desktop for the FLEDGE,
[Topics](/docs/privacy-sandbox/topics/), and
[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) APIs.

To take part, [register for an origin trial token](/origintrials/#/view_trial/771241436187197441).

Once you have successfully enrolled in the trial, you can try out the FLEDGE JavaScript API on pages
that provide a valid trial token: for example, to ask the browser to [join one or more interest groups](#joinadinterestgroup),
and then to [run an ad auction](#ad-auction) to select and display an ad.

The [FLEDGE demo](#demo) provides a basic example of an end-to-end FLEDGE deployment.

Provide a trial token for every page on which you would like to run FLEDGE API code:

*   As a meta tag in the &lt;head&gt;:<br>

    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`

*   As an HTTP header:<br>

    `Origin-Trial: TOKEN_GOES_HERE`

*   By providing a token programmatically:<br>

    ```javascript
    const otMeta = document.createElement('meta');
    otMeta.httpEquiv = 'origin-trial';
    otMeta.content = 'TOKEN_GOES_HERE';
    document.head.append(otMeta);
    ```

An iframe running FLEDGE code—such as a [`navigator.joinAdInterestGroup()`](#joinadinterestgroup)
call by an interest group owner—will need to provide a token that matches its origin.

[Proposed First FLEDGE Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
provides more details about the goals of the first trial and explains what features are supported.

{% Aside 'caution' %}

Not all users may be eligible for the Privacy Sandbox Relevance and Measurement origin trial, even
on pages that provide a valid trial token.

[Testing the Privacy Sandbox ads relevance and measurement APIs](/blog/privacy-sandbox-unified-origin-trial#eligible-users)
explains why this is so, and shows how you can (and should) detect if an origin trial feature is
available before attempting to use it.

{% endAside %}

### Test with `chrome://flags` or feature flags {: #flags}

You can test FLEDGE for a single user in Chrome Beta 101.0.4951.26 and above on desktop:
* By enabling `chrome://flags/#privacy-sandbox-ads-apis`.
* By setting flags from the command line.

#### Render ads in iframes or fenced frames

Ads can be rendered in an `<iframe>` or a [`<fencedframe>`](/docs/privacy-sandbox/fenced-frame/),
depending on which flags are set.

To use `<fencedframe>` to render ads:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

To use `<iframe>` to render ads:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,AllowURNsInIframes --disable-features=FencedFrames
```

Include the `BiddingAndScoringDebugReportingAPI` flag to enable the [temporary debug loss/win reporting methods](#temporary-reporting).

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
explains how to set flags when running Chrome and other Chromium-based browsers from the command
line. The full list of FLEDGE flags is available from
[Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/about_flags.cc;l=7135;drc=e50bce9adfbbac13d8ec1017f9239fe1ae06cc72).


{% Aside %}

This is an in-progress version of FLEDGE for early testing. It shouldn't be considered
complete or indicative of the final implementation. FLEDGE progress and status are discussed in the
regular WICG meetings.

The [minutes](https://github.com/WICG/turtledove/blob/main/meetings/2021-05-12-FLEDGE-call-minutes.md#agenda)
for the 2021-05-12 WICG call provide detail on what is and is not supported in the current
implementation.

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timing
information for FLEDGE and other Privacy Sandbox proposals.

{% endAside %}

### What features are supported in the latest version of Chrome?

FLEDGE is being made available [behind feature flags](#flags) in Chromium as a first
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
to adjust their cross-domain iframe [permissions policies](/docs/privacy-sandbox/permissions-policy/), the plan is to disallow calls from
cross-domain iframes, as the explainer describes.

#### Key/Value service

As part of a FLEDGE ad auction, the browser can access a
[key/value service](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)
that returns simple key-value pairs to provide information to an ad buyer, such as remaining
campaign budget. The FLEDGE proposal [mandates](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)
that this server "performs no event-level logging and has no other side effects based on these
requests".  

The FLEDGE Key/Value service code is now available in a [Privacy Sandbox GitHub repository](https://github.com/privacysandbox/fledge-key-value-service). This service can be used by Chrome and Android developers. Check out the [announcement blog post](/blog/open-sourcing-fledge-key-value-service/) for the status update. Learn more about the FLEDGE Key/Value service from the [API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) and the [trust model explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md).  

For initial testing, ["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now) model is used. In the long-term, adtechs will need to use the open-source FLEDGE Key/Value services running in [trusted execution environments](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) for retrieving real-time data.

To ensure that the ecosystem has sufficient time to test, we don’t expect to require the use of the open-source Key/Value services or TEEs until sometime after third-party cookie deprecation. We will provide substantial notice for developers to begin testing and adoption before this transition takes place.

### Detect feature support

Before using the API, check if it's supported by the browser and available in the document:

```javascript
'joinAdInterestGroup' in navigator &&
  document.featurePolicy.allowsFeature('join-ad-interest-group') &&
  document.featurePolicy.allowsFeature('run-ad-auction') ?
  console.log('navigator.joinAdInterestGroup() is supported on this page') :
  console.log('navigator.joinAdInterestGroup() is not supported on this page');
```

{% Aside 'caution' %}

Feature support on the current page isn't a guarantee that an API is usable: the user may have
disabled the API via browser settings, or they may have other settings that prevent the API from
being used. In order to protect user privacy, there is no way to check for this programmatically.

{% endAside %}


## How can I opt out of FLEDGE? {: #opt-out}

You can block access to the FLEDGE API either as a site owner, or as an individual user.

### How can sites control access? {: #opt-out-site}

FLEDGE will eventually require sites to set a [Permissions Policy](/docs/privacy-sandbox/permissions-policy/)
to allow FLEDGE functionality to be available. This will help ensure that arbitrary third parties can't use the API without a site's
knowledge. However, to facilitate testing during [the first origin trial](/blog/privacy-sandbox-unified-origin-trial),
this requirement is [waived by default](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy).
Sites that would like to explicitly disable FLEDGE functionality during the testing period can use
the relevant Permissions Policy to block access.

There are two FLEDGE permissions policies that can be set independently:
* `join-ad-interest-group` enables/disables functionality to add a browser to interest groups
* `run-ad-auction` enables/disables functionality to run an on-device auction

Access to FLEDGE APIs can be disabled completely in first-party contexts by specifying the following
permissions policy in an HTTP response header:

``` text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

You can disable usage of the APIs in an iframe by adding the following `allow` attribute to an
iframe element:

``` html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

The [Proposed First FLEDGE Origin Trial Permissions-Policy](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy) section provides more detail.

### User opt-out {: #opt-out-user}

A user can block access to the FLEDGE API and other Privacy Sandbox features by using any of the
following mechanisms:

*  **Disable the Privacy Sandbox trials** in Chrome Settings: **Settings** >
    **Security and privacy** > **Privacy Sandbox**. This is also accessible at `chrome://settings/privacySandbox`.
* **Disable third-party cookies** in Chrome Settings: **Settings** > **Security and privacy**.
* Set **Cookies and other site data** to either "Block third-party cookies" or "Block all cookies"
  from `chrome://settings/cookies`.
* Use Incognito mode.

The FLEDGE explainer provides [more detail about API design elements](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements) and describes how the API seeks to meet [privacy goals](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal).


## Debug FLEDGE worklets {: #debugging }

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

### Observe FLEDGE events

From the Application panel in Chrome DevTools, you can observe FLEDGE interest group and auction
events.

If you visit the [FLEDGE demo shopping site](https://shopping-fledge-demo.glitch.me/advertiser/shopping.html)
in a browser with FLEDGE enabled, DevTools will display information about the `join` event.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/3jI5bJh8XKiZP5WHMBYl.png", alt="The
   DevTools Application panel in Chrome Canary, showing information about a FLEDGE interest group
   join event.", width="800", height="402" %}

Now, if you visit the [FLEDGE demo publisher site](https://publisher-fledge-demo.glitch.me/publisher/index.html?fencedframe)
   in a browser with FLEDGE enabled, DevTools displays information about the `bid` and `win` events.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wMvNrY9GrcD2p3Q6wTsw.png", alt="The
   DevTools Application panel in Chrome Canary, showing information about FLEDGE auction bid and
   win events.", width="800", height="482" %}

{% Aside %}

You'll need to refresh the page to see FLEDGE events if DevTools wasn't open when you navigated to
the site.

{% endAside %}

## How does the FLEDGE API work? {: #how}

In this example, a user browses the website of a custom bike maker, then later visits a news website
and is shown an ad for a new bike from the bike maker.

{% Aside 'warning' %}

Not all features described in this post have been implemented (or fully implemented) in the version
of the FLEDGE API currently being tested in Chrome. [Test with feature flags](#flags)
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

### 2. The user's browser is asked to add an interest group {: #joinadinterestgroup}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png",
  alt="Illustration showing a person viewing a site in a browser on their laptop. JavaScript
  code joinAdInterestGroup() is running in the browser.", width="400", height="187" %}

**Explainer section:** [Browsers Record Interest Groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)

The advertiser's [demand-side platform](/docs/privacy-sandbox/fledge/#dsp) (DSP) (or the advertiser
itself) calls `navigator.joinAdInterestGroup()` to ask the browser to add an interest group to the
list of groups the browser is a member of. In this example, the group is named `custom-bikes`, and
the owner is `dsp.example`. The interest group owner (in this case, the DSP) will be a
[buyer](/docs/privacy-sandbox/fledge/#buyer) in the ad auction described in [step 4](#ad-auction).
Interest group membership is stored by the browser, on the user's device, and is not shared with the
browser vendor or anyone else.

{% Aside %}
The origin of the calling context for `joinAdInterestGroup()` must match the interest group
owner's origin, so `joinAdInterestGroup()` will need to be called from an iframe (for
example, from a DSP) unless the origin of the interest group owner matches the origin of the current
document (for example, a website with its own interest groups).

[`runAdAuction`](#ad-auction) doesn't have the same requirements, so calling `runAdAuction()` from a
&lt;script&gt; tag is probably far more performant than a cross-origin iframe.
{% endAside %}

`joinAdInterestGroup()` requires permission from:
* The site being visited
* The interest group owner

For example: it must not be possible for `malicious.example` to call
`joinAdInterestGroup()` with `dsp.example` as owner without the permission of
`dsp.example`.

#### Permission from the site being visited

**Same origin**: By default, permission is implicitly granted for `joinAdInterestGroup()` calls from
the same origin as the site being visited, i.e. from the same origin as the top-level frame of the
current page. Sites can use a FLEDGE [permissions policy header](/docs/privacy-sandbox/permissions-policy/)
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
  biddingWasmHelperUrl: ...,
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

{% Aside 'gotchas' %}

All URLs used as parameters for FLEDGE API methods must be from secure origins: all resources must
be served over HTTPS URLs. [How to use HTTPS for local development](https://web.dev/how-to-use-local-https/)
explains how to do this when running FLEDGE locally.

In addition, `biddingLogicUrl`, `decisionLogicUrl`, and `trustedBiddingSignals` all require an
`X-Allow-FLEDGE: true` HTTP response header.

{% endAside %}

#### Interest group properties {: #interest-group-properties}

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
        <td style="vertical-align: top;"><code>biddingWasmHelperUrl</code>**</td>
        <td style="vertical-align: top;">Optional*</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/bid.wasm'</code></td>
        <td style="vertical-align: top;">URL for WebAssembly code driven from <code>biddingLogicUrl</code>.</td>
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
        <td style="vertical-align: top;">Ads that might be rendered for this interest group.</td>
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
   creating an interest group without these properties: for example, an interest group owner might
   want to add a browser to an interest group for a campaign that isn't running yet, or for some
   other future use, or they may temporarily have run out of advertising budget.

\*\* The `biddingLogicUrl`, `biddingWasmHelperUrl`, `dailyUpdateUrl` and `trustedBiddingSignalsUrl` URLs must have the same origin as owner. The `ads` and `adComponents` URLs have no such constraint.

#### Update interest group attributes {: #update-interest-group}

`dailyUpdateUrl` specifies a web server that returns JSON defining interest group properties,
corresponding to the interest group object passed to `navigator.joinAdInterestGroup()`. This
provides a mechanism for the group's owner to periodically update the attributes of the
interest group. In the [current implementation](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=671;drc=5a102f146faa0c21eb9cf255ceb46b35a158ab3f),
the following attributes can be changed:

* `biddingLogicUrl`
* `biddingWasmHelperUrl`
* `trustedBiddingSignalsUrl`
* `trustedBiddingSignalsKeys`
* `ads`
* `priority`

Any field not specified in the JSON will not be overwritten—only fields specified in the JSON get
updated—whereas calling `navigator.joinAdInterestGroup()` overwrites any existing interest group.

Updates are best-effort, and can fail under the following conditions:
* Network request timeout (currently 30 seconds).
* Other network failure.
* JSON parsing failure.

Updates can also be canceled if too much contiguous time has been spent updating, though this
doesn't impose any rate limiting on canceled (remaining) updates. Updates are rate-limited to a
maximum of one per day. Updates that fail due to network errors are retried after an hour, and
updates that fail due to disconnection from the internet are retried immediately on reconnection.

##### Manual updates

Updates to interest groups owned by the current frame's origin can be triggered manually via
`navigator.updateAdInterestGroups()`. Rate limiting prevents updates from happening too frequently:
repeated calls to `navigator.updateAdInterestGroups()` don't do anything until the rate limit
period (currently one day) has passed. The rate limit gets reset if
`navigator.joinAdInterestGroup()` is called again for the same interest group `owner` and `name`.

##### Automatic updates

All interest groups loaded for an auction are updated automatically after an auction completes,
subject to the same rate limits as manual updates. For each owner with at least one interest group
participating in an auction, it's as if `navigator.updateAdInterestGroups()` is called from an
iframe whose origin matches that owner.

#### Specify ads for an interest group

`ads` and `adComponents` objects include a URL for an ad creative and, optionally, arbitrary
metadata that can be used at bidding time. For example:

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

#### How do buyers make bids? {: #generatebid}

The script at `biddingLogicUrl` provided by an interest group owner must include a `generateBid()`
function. When [an ad-space seller calls `navigator.runAdAuction()`](#ad-auction), the `generatedBid()`
function is called once for each of the interest groups the browser is a member of, if the interest
group's owner is invited to bid. In other words, `generateBid()` is called once for each candidate
ad. The seller provides a `decisionLogicUrl` property on the auction configuration parameter passed
to `navigator.runAdAuction()`. The code at this URL must include a `scoreAd()` function, which is
run for each bidder in the auction, to score each of the bids returned by `generateBid()`.

{% Aside %}

The `biddingWasmHelperUrl` property is optional, but it allows the bidder to provide
computationally-expensive subroutines in [WebAssembly](https://developer.mozilla.org/docs/WebAssembly),
rather than JavaScript, to be driven from the JavaScript function provided by `biddingLogicUrl`. If
provided, it must point to a WebAssembly binary, delivered with an `application/wasm mimetype`. The
corresponding `WebAssembly.Module` is made available by the browser to the `generateBid()` function.

{% endAside %}


The script at `biddingLogicUrl` provided by an ad-space buyer must include a `generateBid()` function.
This function is called once for each candidate ad. [`runAdAuction()`](#ad-auction)
individually checks each ad, along with its associated bid and metadata, then assigns the ad a
numerical desirability score.

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
As with `auctionSignals`, a property of the [auction configuration](#ad-auction)
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
  wasmHelper: ... /* WebAssembly.Module object based on interest group's biddingWasmHelperUrl. */
  dataVersion: 1, /* Data-Version value from the buyer's Key/Value service response(s). */
}
```

To calculate a `bid` value, code in `generateBid()` can use the properties of the function's
parameters. For example:

```javascript
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  return {
    ...
    bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    ...
  }
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
A URL, or a list of URLs, that will be used to render the creative if this bid wins the auction.
(See [Ads Composed of Multiple Pieces](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces)
in the API explainer.) The value has to match the `renderUrl` of one of the
[ads defined for the interest group](#ad-components).


* `adComponents`<br>
An optional list of up to 20 components for
[ads composed of multiple pieces](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces),
taken from the [`adComponents`](#ad-components) property of the interest group argument
passed to `navigator.joinAdInterestGroup()`.

#### Asking a browser to leave an interest group

The interest group owner can request that a browser be removed from an interest group. In other
words, the browser is asked to remove the interest group from the list of those it is a member of.

```javascript
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

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 4. An ad auction is run in the browser {: #ad-auction}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png",
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad
  auction using the FLEDGE API is taking place.", width="400", height="182" %}

**Explainer section:** [Sellers Run On-Device Auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)

The ad auction is likely to be run by the publisher's [SSP](/docs/privacy-sandbox/fledge#ssp), or
the publisher itself. The purpose of the auction is to select the most appropriate ad for a single
available ad slot on the current page. The auction takes into account the interest groups the
browser is a member of, along with data from ad-space buyers and the sellers from the [Key/Value services](#keyvalue-service).

The ad-space **seller** makes a request to the user's browser to begin an ad auction by calling
`navigator.runAdAuction()`.

For example:

```javascript
const auctionConfig = {
  seller: 'https://ssp.example',
  decisionLogicUrl: ...,
  trustedScoringSignalsUrl: ...,
  interestGroupBuyers: ['https://dsp.example', 'https://buyer2.example', ...],
  auctionSignals: {...},
  sellerSignals: {...},
  sellerTimeout: 100,
  perBuyerSignals: {
    'https://dsp.example': {...},
    'https://another-buyer.example': {...},
    ...
  },
  perBuyerTimeouts: {
    'https://dsp.example': 50,
    'https://another-buyer.example': 200,
    '*': 150,
    ...
  },
  componentAuctions: [
    {
      'seller': 'https://some-other-ssp.example',
      'decisionLogicUrl': ...,
      ...
    },
    ...
  ]
};

const auctionResultPromise = navigator.runAdAuction(auctionConfig);
```

`runAdAuction()` returns a promise that resolves to a [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns) (`urn:uuid:<something>`) that represents the
ad auction outcome. This can only be decoded by the browser when passed to a [fenced frame](/docs/privacy-sandbox/fledge#fenced-frame)
for rendering: the publisher page cannot inspect the winning ad.

{% Aside %} As explained earlier, the origin of the calling context for
[`joinAdInterestGroup()`](#joinadinterestgroup) must match the interest group owner's
origin, so `joinAdInterestGroup()` will need to be called from an iframe (for example,
from a DSP) unless the origin of the interest group owner matches the origin of the current
document (for example, a website with its own interest groups).

[`runAdAuction`](#ad-auction) doesn't have the same requirements, so calling `runAdAuction()` from a
&lt;script&gt; tag is probably far more performant than a cross-origin iframe.
{% endAside %}

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
        <td style="vertical-align: top;"><code>sellerTimeout</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>100</code></td>
        <td style="vertical-align: top;">Maximum runtime (ms) of seller's <code>scoreAd()</code> script.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>{'https://dsp.example': {...},<br>
          &nbsp;&nbsp;'https://another-buyer.example': {...},<br>
          ...}</code></td>
        <td style="vertical-align: top;">Contextual signals about the page for each specific buyer, from their server.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerTimeouts</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>50</code></td>
        <td style="vertical-align: top;">Maximum runtime (ms) of particular buyer's <code>generateBid()</code> scripts.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>componentAuctions</code></td>
        <td style="vertical-align: top;">Optional</td>
        <td style="vertical-align: top;"><code>[{'seller': 'https://www.some-other-ssp.com',<br>
          &nbsp;&nbsp;'decisionLogicUrl': ..., ...},<br>
          &nbsp;&nbsp;...]</code></td>
        <td style="vertical-align: top;">Additional configurations for <a href="#ad-components">component auctions</a>.</td>
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

The code at `decisionLogicUrl` (a property of the auction configuration object passed to
[`runAdAuction()`](#ad-auction)) must include a `scoreAd()` function. This is run once for each ad
to determine its desirability.

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
  adComponents: ['https://cdn.com/ad-component-1', ...],
  biddingDurationMsec: 12,
  dataVersion: 1 /* Data-Version value from the seller's Key/Value service response. */
}
```

Before an auction starts, the seller finds the best contextual ad for the available ad slot. Part of
its `scoreAd()` logic is to reject any ad that can't beat the contextual winner.

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 5. The seller and participating buyers receive realtime data from the Key/Value service

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png",
  alt="Illustration showing a person viewing a news website in a browser on their laptop. An ad
  auction using the FLEDGE API is taking place, with a participant getting data from the Key/Value service.", width="400", height="126" %}

**Explainer section:** [Fetching Real-Time Data from the FLEDGE Key/Value service](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server).

During an ad auction, the ad-space **seller** can get realtime data about specific ad creatives by
making a request to a [Key/Value service](#keyvalue-service) using the `trustedScoringSignalsUrl` property of
[auction configuration](#ad-auction) argument passed to `navigator.runAdAuction()`, along with the keys
from the `renderUrl` properties of all entries in the `ads` and `adComponents` fields of all
interest groups in the auction.

Likewise, an ad-space **buyer** can request realtime data from the Key/Value service using the
`trustedBiddingSignalsUrl` and `trustedBiddingSignalsKeys` properties of the interest group argument
passed to `navigator.joinAdInterestGroup()`.

When  `runAdAuction()` is called, the browser makes a request to each ad buyer's trusted server. The
URL for the request might look like this:

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

* The base URL comes from `trustedBiddingSignalsUrl`.
* The `hostname` is provided by the browser.
* The `keys` value is taken from `trustedBiddingSignalsKeys`.

The response to this request is a JSON object providing values for each of the keys.

{% Aside 'gotchas' %}
In the current initial experimental phase for testing FLEDGE, `trustedBiddingSignalsUrl` must have
the same origin as the interest group owner: see [Interest group properties](#interest-group-properties) and
[Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server).
{% endAside %}

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

{% Aside %}

The current implementation of FLEDGE in Chrome will warn if `reportWin()` is not defined.

{% endAside %}

The arguments passed to this function are:

* `auctionSignals` and `perBuyerSignals`<br>
The same values passed to [`generateBid()`](#generatebid) for the winning bidder.
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

#### Temporary loss/win reporting implementation {: #temporary-reporting}

There are two methods available temporarily in Chrome for auction reporting:

* `forDebuggingOnly.reportAdAuctionLoss()`
* `forDebuggingOnly.reportAdAuctionWin()`

These methods each take a single argument: a URL to fetch after the auction is completed. They can
be called multiple times, in both `scoreAd()` and `generateBid()`, with different URL arguments.

Chrome only sends debug loss/win reports when an auction runs to completion. If an auction is
canceled (for example, due to a new navigation) no reports will be generated.

These methods are available by default in Chrome if `chrome://flags/#privacy-sandbox-ads-apis` is
enabled. But, if you're running Chrome with command line flags to enable FLEDGE, you'll need to
explicitly enable the methods by including the `BiddingAndScoringDebugReportingAPI` flag. If the
flag is not enabled, the methods will still be available but do nothing.

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
<a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600"
  target="_blank">view a larger version</a>.

<figure class="w-figure">
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="Illustration providing
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
   [Criteo](https://www.admonsters.com/what-is-sparrow/) proposed the addition of a
   ("Gatekeeper") service model running in a [trusted execution environment (TEE)](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment).  FLEDGE includes a more limited use of TEEs, for real-time data lookup and aggregated reporting.
-  NextRoll's [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) and Magnite's
   [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md)
   proposals described the different roles that buyers and sellers had in the on-device auction.
   FLEDGE's ad bidding/scoring flow is based on this work.
-  RTB House's [Outcome-based](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md) and
   [Product-level](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md) TURTLEDOVE
   modifications improved the anonymity model and personalization capabilities of the on-device auction
-  [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) is
   Microsoft's proposal for a TURTLEDOVE-like ad service that relies on a proxy server running in a TEE
   between the browser and the adtech providers, to anonymize ad requests and enforce privacy
   properties.  FLEDGE has not adopted this proxying model.  We are bringing the JavaScript APIs
   for PARAKEET and FLEDGE into alignment, in support of future work to further combine the best
   features of both proposals.

FLEDGE does not yet prevent a website's ad network from learning which ads a person sees. We expect
to modify the API to become more private over time.

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


## Engage and share feedback {: #engage}

-  **GitHub**: Read the [proposal](https://github.com/WICG/turtledove/blob/master/FLEDGE.md),
   [raise questions and follow discussion](https://github.com/WICG/turtledove/issues).
-  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants).
-  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-  **FLEDGE mailing list**: [fledge-api-announce](https://groups.google.com/u/1/a/chromium.org/g/fledge-api-announce)
   provides announcements and updates about the API.
- [Join the scheduled calls for FLEDGE](https://github.com/WICG/turtledove/issues/88) (every
  second week). Everyone is welcome to join&mdash;to participate, first make sure to [join the
  WICG](https://www.w3.org/community/wicg/). You can actively participate or just listen in!
- Use the Privacy Sandbox [feedback form](/docs/privacy-sandbox/feedback/#feedback-form)
to share feedback privately with the Chrome team outside of public forums.

## Get support

To ask a question about **your implementation**, about the **demo**, or about the **documentation**:
* [Open a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)
on the privacy-sandbox-dev-support repository. Make sure to select the issue template for FLEDGE.
* Raise an issue on the [demo code repo on GitHub](https://github.com/JackJey/fledge-demo).
* For more general questions about how to meet your **use cases** with the API,
[file an issue on the proposal repository](https://github.com/WICG/turtledove/issues/new).

For bugs and issues with the implementation of the FLEDGE API in Chrome:
* [View existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)
reported for the API.
* Raise a new issue at [crbug.com/new](https://crbug.com/new).

## Get updates

- To be notified of status changes in the API, join the [mailing list for
  developers](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce).
- To closely follow all ongoing discussions on the API, click the **Watch** button on the [proposal page on
  GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md). This requires you have or [create a GitHub
  account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
- To get overall updates on the Privacy Sandbox, subscribe to the RSS feed [Progress in the Privacy
  Sandbox](/tags/progress-in-the-privacy-sandbox/).


## Find out more

-  [The FLEDGE API](/docs/privacy-sandbox/fledge): less technical overview of the proposal.
-  [FLEDGE demo](https://fledge-demo.glitch.me): walkthrough of a basic FLEDGE deployment.
-  [The FLEDGE demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv):
explains the demo code, and shows how to use Chrome DevTools for FLEDGE debugging.
-  [FLEDGE API technical explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
-  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
-  [Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)

<hr>
  
Photo by [Ray Hennessy](https://unsplash.com/@rayhennessy) on [Unsplash](https://unsplash.com/photos/GL6ORxDMswI).
