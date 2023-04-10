---
title: Test the Privacy Sandbox ads relevance and measurement APIs
description: >
  Learn about developer testing and the upcoming origin trial allowing for
  unified experimentation across the Privacy Sandbox relevance and measurement APIs: Topics, FLEDGE, and Attribution Reporting.
layout: 'layouts/blog-post.njk'
date: 2022-03-31
updated: 2023-01-05
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/1Eh5fSHWhurUuED3WGU1.png'
alt: >
  Privacy Sandbox beta logo
tags:
  - privacy
  - origin-trials
---

{% Aside %}
**See updated guidance for the [Relevance and measurement unified origin
trial](/docs/privacy-sandbox/unified-origin-trial/).**
{% endAside %}

The [Privacy Sandbox](https://privacysandbox.com/open-web/) includes a selection
of proposals to enable advertising use cases without the need for cross-site
tracking. [Origin trials](/blog/origin-trials/) provide the opportunity for
developers to evaluate and provide feedback on new web technologies through
real-world testing. In previous origin trials sites have been able to test
against individual APIs. For the Topics, FLEDGE and Attribution Reporting APIs
we are providing a **single origin trial** that allows sites to run unified
experiments across the APIs making up an initial version of the end-to-end ad
lifecycle. The APIs are available for testing in Chrome 101 [Beta](https://www.google.com/chrome/beta/)
and above. The Chrome 101 Beta release also sees
[updates to the user controls](https://blog.chromium.org/2022/03/what-to-expect-from-ps-testing.html)
as we continue to iterate on configuration options.

As a developer you will be able to sign up for this single origin trial that
will allow you to test across the Topics, FLEDGE, and Attribution Reporting
APIs. This guide takes you through the configuration steps to access the APIs,
explains how to validate your configuration, and provides further resources for
testing against the APIs.


## What's in the origin trial?

The aim of this origin trial is to allow for meaningful testing across the ad
lifecycle over multiple sites. To cover this journey, the origin trial includes:

*   **[Topics](/docs/privacy-sandbox/topics/)** to observe and access a
    browser's topics via `document.browsingTopics()`.
*   **[FLEDGE](/docs/privacy-sandbox/fledge/)** to manage a browser's 
    interest groups, along with ad bidding and selection based on those 
    groups and other signals.
    *   In this origin trial, FLEDGE is available on desktop and includes a
        specific subset of all the proposed functionality. Read the
        [FLEDGE origin trial details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
        for more information.
*   **[Fenced frames](/docs/privacy-sandbox/fenced-frame/)** to render the [opaque URL](https://github.com/WICG/fenced-frame/blob/master/explainer/opaque_src.md) of the [FLEDGE ad auction winner](/docs/privacy-sandbox/fledge/#6-the-winning-ad-is-displayed).
*   **[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/)** to
    measure and report on the performance over the ad lifecycle.
    *   As part of Attribution Reporting, aggregatable reports must be 
        processed and aggregated by an [aggregation
        service](/docs/privacy-sandbox/attribution-reporting/summary-reports/#aggregation-service)
        to produce summary reports. We will publish additional tools and
        guides for local and origin trial testing soon.
    *   If you have participated in previous origin trials for Attribution
        Reporting, be aware that you will need to update inline with the
        latest API changes. Refer to the [Migration
        guide](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit#)
        for details.

While this setup allows for unified testing across all these APIs, you can 
pick and choose which aspects to implement—as much or as little as fits your 
needs.


## How do developers sign up for the origin trial?

Register for the [Privacy Sandbox Relevance and Measurement](/origintrials/#/view_trial/771241436187197441)
trial. With the following HTML tags, provide a trial token on every page that you would like to run API code:

*   `<meta>` tag in the top-level page's `<head>` section:
    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
*   HTTP header in the top-level page response:
    `Origin-Trial: TOKEN_GOES_HERE`

Some functionality available in the origin trial is intended for use in
cross-site contexts, as in when you are providing a service as a third-party 
on the top-level site. If you need to enable your origin trial for these additional
contexts, **ensure that you select the option for "Third-party matching"**.
To enable the origin trial from third-party JavaScript, inject the `<meta>` tag
into the **top-level page** (i.e. the first-party page, not your own content)
from your script. For example:

```javascript
const otMeta = document.createElement('meta');
otMeta.setAttribute('http-equiv', 'origin-trial');
otMeta.setAttribute('content', 'TOKEN_GOES_HERE');
document.querySelector('head').appendChild(otMeta);
```

Learn more in [the guide to getting started with Chrome's origin trials](/blog/origin-trials/).

{% Aside 'caution' %}
An iframe accessing a trial feature (such as FLEDGE's [`joinAdInterestGroup()`](/blog/fledge-api#joinadinterestgroup))
must provide a token that matches its origin.
{% endAside %}


## How do developers test locally? {: #local-testing}

The individual developer documentation for
[Topics](/docs/privacy-sandbox/topics-experiment/),
[FLEDGE](/docs/privacy-sandbox/fledge-experiment/), and [Attribution
Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/) provide
specific guidance on local developer testing for each API. The APIs are not on
by default and must be [enabled with
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/) for
testing.

To enable APIs for testing, you must:

*   **Use Chrome 101 [Beta](https://www.google.com/chrome/beta/) or above**.
    *   FLEDGE requires desktop Chrome.
    *   APIs are not available on iOS versions of Chrome.
*   **Enable the APIs** using the `chrome://flags/#privacy-sandbox-ads-apis`
    flag.
    *   This flag forces the APIs on for easier testing, if you want to
        replicate an eligible origin trial user where their additional 
        settings can still disable the APIs, then you should launch Chrome 
        using the CLI flags:
        `--enable-features=BrowsingTopics,InterestGroupStorage,AllowURNsInIframes,PrivacySandboxAdsAPIs`.
    *   Individual APIs may have more additional flags for more fine-grained
        configuration, check the individual guides for details.
    *   Additional flags may conflict with this one, so consider only setting
        this one flag if you encounter issues.
*   **Enable the Privacy Sandbox trials** in Chrome Settings: **Settings** > 
    **Security and privacy** > **Privacy Sandbox**. This is also accessible 
    at `chrome://settings/privacySandbox`.
*   **Enable third-party cookies** in Chrome Settings: **Settings** > 
    **Security and privacy**. Set **Cookies and other site data** to either 
    "Allow all cookies" or "Block third-party cookies in Incognito". This is 
    also accessible at `chrome://settings/cookies`.
*   Be in a standard browsing session. Do not use Incognito mode.


## How do developers check if the origin trial is configured correctly?

[Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/)
provides a detailed checklist to validate your configuration of the origin
trial.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/GQv4Ybw6AVXCMwbyZtmN.png",
alt="DevTools showing origin trial status under Applications > Frames",
width="800", height="326" %}

DevTools shows the status for an origin trial in the Applications tab under
Frames.

While the origin trial will only show as active to [eligible
users](#eligible-users) as detailed below, you can also use the [developer
flags](#local-testing) to test against your own production site.


## What users are eligible for the origin trial? {: #eligible-users}

By design, origin trials are intended to [only run on a small portion of overall
Chrome traffic](/blog/origin-trial-troubleshooting/#usage-restrictions) and as
such you should always assume that even when **you have enabled the origin
trial** on your site, the **user may not have the API active**. The active
experiment group in the origin trial will start with a low proportion of users
and likely ramp up as the trial progresses. Be aware that the percentage of
Chrome users in the experiment may not match the percentage of enabled users 
on your site.

However, to allow for unified testing across sites, that set of eligible users
should remain mostly consistent. For example, if a user is eligible for the
origin trial when they view an ad on a participating publisher site, that same
user should still be eligible when they convert on a participating advertiser
site.

For a user to be eligible, they must:

*   be using **Chrome 101 [Beta](https://www.google.com/chrome/beta/) or
    above**.
    *   FLEDGE requires desktop Chrome.
    *   no origin trials are available on iOS versions of Chrome.
*   be browsing during the **active origin trial period**.
*   have the **Privacy Sandbox trials enabled** via Settings > Security and
    privacy > Privacy Sandbox, also accessible via
    `chrome://settings/privacySandbox`.
*   have **third-party cookies enabled** via Settings > Security and privacy >
    Cookies and other site data set to either "Allow all cookies" or "Block
    third-party cookies in incognito", also accessible via
    `chrome://settings/cookies`.
*   be in a standard browsing session and **not Incognito mode**.
*   be within the **active experiment group in Chrome**.


## How should developers feature detect API support?

As with any web platform feature, you should detect support for the feature
before using it.


### Topics

Check for the `browsingTopics()` function in the `document` and
the Permissions Policy](/docs/privacy-sandbox/permissions-policy/#featurepolicyallowsfeaturefeature)
for "browsing-topics".

```javascript
if ('browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics')) {
  // Topics enabled
}
```

### FLEDGE

If you want to join an ad interest group, check for the `joinAdInterestGroup` function in
`navigator` and the Permissions Policy for "join-ad-interest-group".

```javascript
if ('joinAdInterestGroup' in navigator && document.featurePolicy.allowsFeature('join-ad-interest-group')) {
  // FLEDGE interest group enabled
}
```

If you want to run an auction, check for the `runAdAuction`function in `navigator`, and the permissions policy for "run-ad-auction". 

```javascript
if ('runAdAuction' in navigator && document.featurePolicy.allowsFeature('run-ad-auction')) {
  // FLEDGE auction enabled
}
```

### Attribution Reporting

Check for the `attributionReporting` object in the `window` and
the Permissions Policy for "attribution-reporting".

```javascript
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // Attribution Reporting API enabled
}
```

## Where can developers give feedback and get support?

The [feedback overview page](/docs/privacy-sandbox/feedback/) details the
various routes for giving feedback on different aspects of the Privacy Sandbox.
There are specific sections for
[Topics](/docs/privacy-sandbox/feedback/#topics-api),
[FLEDGE](/docs/privacy-sandbox/feedback/#fledge-api), and [Attribution
Reporting](/docs/privacy-sandbox/feedback/#measure-digital-ads) which provide
the individual links for each API.

We also provide regular updates on the [Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/) series which provides a 
summary of important news.
