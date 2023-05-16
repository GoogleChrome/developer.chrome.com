---
layout: "layouts/blog-post.njk"
title: "Participate in deprecation trial for unpartitioned third-party storage, Service Workers, and Communication APIs"
description: >
  Beginning gradually in Chrome 115, storage, service workers, and communication APIs will be partitioned in third-party contexts. For sites that need time to adjust to this new feature, these deprecation trials will allow them to temporarily keep their third-party storage, service workers, and communication APIs unpartitioned.
authors:
  - arichiv
  - kyraseevers
date: 2023-03-09
updated: 2023-05-16
tags:
  - privacy
---

Beginning gradually in [Chrome 115](https://chromiumdash.appspot.com/schedule),
storage, service workers, and communication APIs will be
[partitioned in third-party contexts](/docs/privacy-sandbox/storage-partitioning/).
In addition to being isolated by the same-origin policy, the affected APIs used
in third-party contexts would also be separated by the site of the top-level
context. Sites that haven't had time to implement support for third-party
storage partitioning can take part in a deprecation trial to temporarily
**unpartition** (continue isolation by same-origin policy but remove isolation
by top-level site) and restore prior behavior of storage, service workers, and
communication APIs in content embedded on their site.

In addition to a general unpartitioning deprecation trial, it's possible to
participate in a focused deprecation trial just for `window.sessionStorage`.
This trial is available due to a need for some sites to migrate their Firebase
`signInWithRedirect` flow. For more information on that migration see
[this article](https://firebase.google.com/docs/auth/web/redirect-best-practices).

## Available deprecation trials

Starting in [Chrome 115](https://chromiumdash.appspot.com/schedule), we'll
open up two deprecation trials:

1.  [`DisableThirdPartyStoragePartitioning`](/origintrials/#/view_trial/-8517432795264450559):
    allows a top-level site to unpartition (temporarily remove isolation by
    top-level site) in storage, service workers, and communication APIs in
    third-party content embedded on its pages.
1.  [`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`](/origintrials/#/view_trial/3444127815031586817):
    allows a site to unpartition sessionStorage across navigations.

These will enable sites to discover and fix problems before third-party
partitioning begins its rollout process in Chrome 115.

Below is an overview of the deprecation trial and what to expect. If you have
feedback to share or you experience any issues throughout this trial let us know
in the
[Partitioned Storage Deprecation Trial Github repository](https://github.com/miketaylr/partitioned-storage-deprecation-trial-feedback).

### DisableThirdPartyStoragePartitioning

The following APIs will remain unpartitioned in third-party contexts should you
enroll the top-level site in the `DisableThirdPartyStoragePartitioning`
deprecation trial:
[Storage APIs](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#storage-apis)
(such as localStorage, sessionStorage, IndexedDB, Quota, and other),
[Communication APIs](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#communication-apis)
(such as BroadcastChannel, SharedWorkers, and WebLocks), and
[ServiceWorker API](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md#serviceworker-api).

{% Aside 'caution' %}
For this `DisableThirdPartyStoragePartitioning` trial, the origin trial token must be included via an HTML `<meta>` tag and not an `Origin-Trial` HTTP header.
{% endAside %}

Example:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/dqBSsNU8W3HOmMkPDYYh.png", alt="Storage partitioning diagram", width="800", height="544" %}

For a more detailed explanation, check out the
[project explainer](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md).

### DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning

If you enroll in the
`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`
deprecation trial, navigating a tab to an enrolled origin will cause all
cross-site iframes of that same origin to remain unpartitioned only for
`Window.sessionStorage` and only for the lifetime of that particular tab.
Whereas the `DisableThirdPartyStoragePartitioning` deprecation trial affects all
third-party contexts embedded within the enrolled origin, the
`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`
deprecation trial instead registers a given origin to receive unpartitioned
access when embedded in third-party contexts.

{% Aside %}
The `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning` trial will work via HTML `<meta>` or an `Origin-Trial` HTTP header.
{% endAside %}

Example:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/6uxCgy48dDcfFVgkwycu.png", alt="Storage partitioning diagram after general paritoning.", width="800", height="432" %}

## What does this mean for web developers?

Sites should audit their usage of unpartitioned storage, service worker, and
communication APIs in third-party contexts, and, if needed, prepare for
third-party partitioning before these deprecation trials expire. **The intent is
to expire these deprecation trials with the release of Chrome 127 on September 3, 2024.**

To instruct the browser to unpartition storage in third-party content embedded
on its pages, top-level sites need to register for one or both of the
deprecation trials and add the corresponding trial token(s) to their HTTP
response headers (see detailed example below).

Each deprecation trial is available on Windows, Mac, Linux, Chrome OS, Android,
and Android WebView.

## Participate in the deprecation trials

The following is a brief overview of how to participate in one or both of the
deprecation trials. For more detailed instructions, visit
[Get started with origin trials](/docs/web-platform/origin-trials).

1.  Launch Chrome version 115 (or later) and ensure the
    [`ThirdPartyStoragePartitioning`](/blog/storage-partitioning-dev-trial/)
    flag is enabled.
1.  Verify that the behavior of third-party content embedded in your
    top-level site is broken by storage partitioning (if not, then no need to
    participate in the Deprecation Trials).
1.  Register for the deprecation trial and get a token for your domains by
    visiting the following:
    1.  For a top-level site to unpartition storage, service workers,
        and communication APIs in its third-party embedded content:
        [`DisableThirdPartyStoragePartitioning`](/origintrials/#/view_trial/-8517432795264450559)
    1.  For a top-level site to unpartition sessionStorage across
        navigations:
        [`DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`](/origintrials/#/view_trial/3444127815031586817)
1.  Add an origin trial token to your page:
    1. For the `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning` trial you may add an `Origin-Trial: <DEPRECATION TRIAL TOKEN>` to         your top-level site’s HTTP response header, where `<DEPRECATION TRIAL TOKEN>` contains the token you got when registering for the deprecation             trial. You can also do this via HTML `<meta> tag.
    1. For the `DisableThirdPartyStoragePartitioning` trial, the token must be given via an HTML `<meta>` tag. The HTTP header method is not supported.
1.  Load your website in Chrome 115 (or later) with
    `ThirdPartyStoragePartitioning` still enabled and verify that any
    partitioning related issues have been properly mitigated.
1.  To stop participating in the deprecation trial simply remove the header
    you added in step 2.

The `DisableThirdPartyStoragePartitioning` deprecation trial does support the
[third-party origin trials](/docs/web-platform/third-party-origin-trials/)
feature, but the third-party script injecting the token must be evaluated in the
top-level frame before the third-party iframe that won't have partitioning applied
is loaded. The `DisableThirdPartySessionStoragePartitioningAfterGeneralPartitioning`
deprecation trial does not support third-party origin trials as the enrollee
must have been the top-level site at some point in the lifetime of the given tab. The guide to
[troubleshooting Chrome's origin trials](/docs/web-platform/origin-trial-troubleshooting/)
provides a full checklist for ensuring your token is correctly configured.

## Share feedback

Please submit any feedback or issues you encounter to the
[Partitioned Storage Deprecation Trial Github repository](https://github.com/miketaylr/partitioned-storage-deprecation-trial-feedback).
