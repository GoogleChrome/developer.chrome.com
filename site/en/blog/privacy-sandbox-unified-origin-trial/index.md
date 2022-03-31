---
title: Testing the Privacy Sandbox ads relevance and measurement APIs
description: >
  Learn about developer testing and the upcoming origin trial allowing for
  unified experimentation across the Privacy Sandbox relevance and measurement
  APIs: Topics, FLEDGE, and Attribution Reporting.
layout: 'layouts/blog-post.njk'
date: 2022-03-31
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/1Eh5fSHWhurUuED3WGU1.png'
alt: >
  Privacy Sandbox beta logo
tags:
  - privacy
---

The [Privacy Sandbox](https://privacysandbox.com/open-web/) includes a selection
of proposals to enable advertising use cases without the need for cross-site
tracking. [Origin trials](/blog/origin-trials/) provide the opportunity for
developers to evaluate and provide feedback on new web technologies through
real-world testing. In previous origin trials sites have been able to test
against individual APIs. For the Topics, FLEDGE and Attribution Reporting APIs
we are providing a **single origin trial** that will allow sites to run unified
experiments across the APIs making up an initial version of the end-to-end ad
lifecycle. The APIs are available for **local developer testing** in the
**Chrome 102 [Canary](https://www.google.com/chrome/canary/)** release now and
we expect to make the **origin trial** available as soon as possible during the
**Chrome 101 [Beta](https://www.google.com/chrome/beta/)** window. The Chrome
101 Beta will also see updates to the user controls as we continue to iterate on
configuration options.

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
*   **[FLEDGE](/docs/privacy-sandbox/fledge/)** to manage a browser's interest
    groups, along with ad bidding and selection based on those groups and other
    signals.
    *   In this origin trial, FLEDGE is available on desktop and includes a
        specific subset of all the proposed functionality. See the [FLEDGE
        origin trial
        details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
        for more information.
*   **[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/)** to
    measure and report on the performance over the ad lifecycle.
    *   As part of Attribution Reporting, aggregatable reports must be processed
        and aggregated by an [aggregation
        service](/docs/privacy-sandbox/attribution-reporting/summary-reports/#aggregation-service)
        to produce summary reports. We will publish additional tools and guides
        for local and origin trial testing soon.
    *   If you have participated in previous origin trials for Attribution
        Reporting, be aware that you will need to update inline with the latest
        API changes. See the [Migration
        guide](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit#)
        for details.

While this setup allows for unified testing across all these APIs, you can pick
and choose which aspects to implement—as much or as little as fits your needs.


## How do developers sign up for the origin trial?

All active origin trials are available at the [Chrome Origin Trials
site](/origintrials/). You will be able to register for the **"Privacy Sandbox
Ads APIs"** origin trial from here when it is available.

Much of the functionality available in the origin trial is intended for use in
cross-site contexts, as in when you are providing a service as a third-party on
the top-level site. To enable your origin trial for these additional contexts,
**ensure that you select the option for "Third-party matching"**.

You will receive an origin trial token that must be included either in a:



*   `<meta>` tag in the top-level page's `<head>` section:
    *   `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
*   HTTP header in the top-level page response:
    *   `Origin-Trial: TOKEN_GOES_HERE`

If you are enabling the origin trial as a third-party, then you **must inject
the `<meta>` tag** into the **top-level page** (i.e. the first-party page, not
your own content) from your script. For example:

```javascript
const otMeta = document.createElement('meta');
otMeta.setAttribute('http-equiv', 'origin-trial');
otMeta.setAttribute('content', 'TOKEN_GOES_HERE');
document.querySelector('head').appendChild(otMeta);
```

Learn more in [the guide to getting started with Chrome's origin
trials](/blog/origin-trials/).


## How do developers test locally? {: #local-testing}

The individual developer pages for
[Topics](/docs/privacy-sandbox/topics-experiment/),
[FLEDGE](/docs/privacy-sandbox/fledge-experiment/), and [Attribution
Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/) provide
specific guidance on local developer testing for each API. The APIs are not on
by default and must be [enabled via
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/) for
testing.

To enable APIs for testing, you must:



*   be using **Chrome 102 [Canary](https://www.google.com/chrome/canary/) or
    above**.
    *   FLEDGE requires desktop Chrome.
    *   APIs are not available on iOS versions of Chrome.
*   **enable the APIs** using the `chrome://flags/#privacy-sandbox-ads-apis`
    flag.
    *   This flag forces the APIs on for easier testing, if you want to
        replicate an eligible origin trial user where their additional settings
        can still disable the APIs, then you should launch Chrome using the CLI
        flags:
        `--enable-features=BrowsingTopics,InterestGroupStorage,AllowURNsInIframes,PrivacySandboxAdsAPIs`.
    *   Individual APIs may have more additional flags for more fine-grained
        configuration, check the individual guides for details.
    *   Additional flags may conflict with this one, so consider only setting
        this one flag if you encounter issues.
*   have the **Privacy Sandbox trials enabled** via Settings → Security and
    privacy → Privacy Sandbox, also accessible via
    `chrome://settings/privacySandbox`.
*   have **third-party cookies enabled** via Settings → Security and privacy →
    Cookies and other site data set to either "Allow all cookies" or "Block
    third-party cookies in incognito", also accessible via
    `chrome://settings/cookies`.
*   be in a standard browsing session and **not Incognito mode**.


## How do developers check if the origin trial is configured correctly?

[Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/)
provides a detailed checklist to validate your configuration of the origin
trial.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/GQv4Ybw6AVXCMwbyZtmN.png",
alt="DevTools showing origin trial status under Applications → Frames",
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
Chrome users in the experiment may not match the percentage of enabled users on
your site.

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
*   have the **Privacy Sandbox trials enabled** via Settings → Security and
    privacy → Privacy Sandbox, also accessible via
    `chrome://settings/privacySandbox`.
*   have **third-party cookies enabled** via Settings → Security and privacy →
    Cookies and other site data set to either "Allow all cookies" or "Block
    third-party cookies in incognito", also accessible via
    `chrome://settings/cookies`.
*   be in a standard browsing session and **not Incognito mode**.
*   be within the **active experiment group in Chrome**.


## How should developers feature detect API support?

As with any web platform feature, you should detect support for the feature
before using it.


### Topics

Check for the `browsingTopics()` function in the `document`.

```javascript
if ('browsingTopics' in document) {
  // Topics enabled
}
```


### FLEDGE

Check for the `runAdAuction`function  in `navigator`. 

```javascript
if ('runAdAuction' in navigator) {
  // FLEDGE enabled
}
```


### Attribution Reporting

Check for the `attributionReporting` object in the `window`.

```javascript
if ('attributionReporting' in window) {
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
Sandbox](/tags/progress-in-the-privacy-sandbox/) series which provides a summary
of important news.
