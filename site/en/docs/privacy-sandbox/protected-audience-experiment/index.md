---
layout: 'layouts/doc-post.njk'
title: 'The Protected Audience API: experiment and participate'
subhead: >
  Quick guide to implement and test the API. Set up privacy-preserving ad auctions to serve remarketing and custom audience use cases.
description: >
  The Protected Audience API is a Privacy Sandbox API to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads from websites the user has previously visited.
date: 2022-03-31
updated: 2022-09-18
authors:
  - samdutton
---

{% Partial 'privacy-sandbox/ot-end.njk' %}

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

## Learn the essentials

* If you're a developer or software engineer, the
  [Protected Audience API Developer Guide](/docs/privacy-sandbox/protected-audience-api/) provides an
  in-depth technical reference.
* The [Protected Audience API overview](/docs/privacy-sandbox/protected-audience) offers a higher level
  explanation for those who work in advertiser and ad tech, who are new to the Privacy
  Sandbox.

## Try the API

{% Aside 'caution' %}

Read about [feature detection](/docs/privacy-sandbox/unified-origin-trial/#feature-detection)
to learn how to determine if a feature is available before attempting to use it.

{% endAside %}

1. Learn how to use the Protected Audience API.
   * Review the [Protected Audience API Developer Guide](/docs/privacy-sandbox/protected-audience-api/).
     This guide offers a reference for API methods and parameters.
   * Read about [Protected Audience services](/blog/fledge-service-overview/). For example,
     the Key/Value service offers real-time information to buyers and sellers
     during the ad auction.
2. Try the [demo](https://protected-audience-demo.web.app/).
   * Review the [source code](https://github.com/GoogleChromeLabs/protected-audience-demo).
   * Watch the [Protected Audience demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv) to learn how the demo code works and how to use Chrome DevTools for FLEDGE debugging.
3. Experiment with the API.
   * Try out the Protected Audience API for a single user by enabling
     `chrome://flags/#privacy-sandbox-ads-apis` or by running Chrome from the
     command line with [Protected Audience feature flags](/docs/privacy-sandbox/protected-audience-api/#flags).
   * [Troubleshoot Protected Audience worklets](/docs/privacy-sandbox/protected-audience-api/troubleshoot/) with Chrome DevTools. Learn how to debug Protected Audience bidding and auction code.
4. Review the [Protected Audience status](/docs/privacy-sandbox/status/#fledge) for updates
   on the implementation of the Protected Audience API. Review the
   [pending Protected Audience capabilities](/docs/privacy-sandbox/protected-audience-api/feature-status/)
   for more details.

The [Protected Audience API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)
provides more detail about feature support and constraints.

## Get support

Is anything blocking you from experimenting with the API? Ask a question 
about **your implementation**, the **demo**, or the **documentation**:

*  [Open a new Issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)
   on the Privacy Sandbox Dev Support repository. Make sure to select the
   Issue template for the Protected Audience API.
*  Raise an issue on the [demo code repo on
   GitHub](https://github.com/GoogleChromeLabs/protected-audience-demo).
*  For more general questions about how to meet your **use cases** with the
   API, [file an issue on the API repository](https://github.com/WICG/turtledove/issues/new).

For bugs and issues with the implementation of the Protected Audience API in Chrome:

*  [View existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)
   reported for the API.
*  Raise a new issue at [crbug.com/new](https://crbug.com/new).

## Join the discussion

Everyone is welcome to join in discussion of the Protected Audience API. In 
particular, if you're experimenting with the API, your feedback is essential.

### Discuss the API

Like other Privacy Sandbox APIs, this API is documented and discussed publicly.

*  Read the [FLEDGE explainer on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
*  Join the conversation about [existing issues](https://github.com/WICG/turtledove/issues).
*  [Open a new issue](https://github.com/WICG/turtledove/issues/new) to ask a
   question, propose a feature, or discuss a use case.
*  [Join the scheduled calls for Protected Audience](https://github.com/WICG/turtledove/issues/88)
   (every second week). Everyone is welcome to join&mdash;to participate,
   first make sure to [join the WICG](https://www.w3.org/community/wicg/).
   You can actively participate or just listen in!

### Discuss related topics

Discuss industry use cases in the
[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).

### Give feedback

[Privacy Sandbox feedback](/docs/privacy-sandbox/feedback/#fledge-api)
explains how to provide other types of feedback, and how to engage in
discussion of Privacy Sandbox APIs.

## Get updates

* To be notified of status changes in the API, join the
  [mailing list for developers](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce).
* To closely follow all ongoing discussions on the API, click the **Watch**
  button on the [API page on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
  This requires you have or
  [create a GitHub account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
* To get overall updates on the Privacy Sandbox, subscribe to the RSS feed
  [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/).
