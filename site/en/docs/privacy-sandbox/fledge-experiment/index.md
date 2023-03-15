---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE: experiment and participate'
subhead: >
  Quick guide to implement and test the API. Set up privacy-preserving ad auctions to serve remarketing and custom audience use cases.
description: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads from websites the user has previously visited.
date: 2022-03-31
updated: 2022-08-12
authors:
  - samdutton
---

## Learn the essentials

* If you're a developer or software engineer, the [FLEDGE API Developer Guide](/blog/fledge-api)
provides an in-depth technical reference to the proposal.

* [The FLEDGE API](/docs/privacy-sandbox/fledge) is a less technical overview, and also has a
[glossary](/docs/privacy-sandbox/fledge#glossary).


## Try the API

{% Aside 'caution' %}

Not all users may be eligible to experience features from the Privacy Sandbox
Relevance and Measurement origin trial, even on pages that provide a valid
trial token.

Learn more about [feature detection](/docs/privacy-sandbox/unified-origin-trial/#feature-detection) to
learn how to detect if a feature is available before attempting to use it.

{% endAside %}

1. Try the [demo](https://fledge-demo.glitch.me).
   * Review the [source code](https://github.com/JackJey/fledge-demo).
   * Watch the [FLEDGE demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv) to learn how the demo code works and how to use Chrome DevTools for FLEDGE debugging.
2. Review the [FLEDGE status](/docs/privacy-sandbox/status/#fledge) for updates on the implementation of the FLEDGE API.
3. Experiment with the API.
   * The [developer guide](/docs/privacy-sandbox/fledge-api/) also provides a reference guide to API methods and parameters.
   * Take part in the [origin trial](/docs/privacy-sandbox/fledge-api/#origin-trial)
   * Try out FLEDGE for a single user by enabling
     `chrome://flags/#privacy-sandbox-ads-apis` or by running Chrome from the
     command line with [FLEDGE feature flags](/docs/privacy-sandbox/fledge-api/#flags).
   * [Troubleshoot FLEDGE worklets](/docs/privacy-sandbox/fledge-api/troubleshoot/) with Chrome DevTools. Learn how to debug FLEDGE bidding and auction code.

[The API explainer provides more detail](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) about feature support and constraints.

## Get support

Is anything blocking you from experimenting with the API? Ask a question 
about **your implementation**, about the **demo**, or about the 
**documentation**:

*  [Open a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)
   on the Privacy Sandbox Dev Support repository. Make sure to select the
   Issue template for FLEDGE.
*  Raise an issue on the [demo code repo on
   GitHub](https://github.com/JackJey/fledge-demo).
*  For more general questions about how to meet your **use cases** with the
   API, [file an issue on the proposal repository](https://github.com/WICG/turtledove/issues/new).

For bugs and issues with the implementation of the FLEDGE API in Chrome:

*  [View existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)
   reported for the API.
*  Raise a new issue at [crbug.com/new](https://crbug.com/new).

## Join the discussion

Everyone is welcome to join in discussion of the FLEDGE proposal. In 
particular, if you're experimenting with the API, your feedback is essential.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and discussed publicly.

*  Read the [FLEDGE explainer on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
*  Join the conversation about [existing issues](https://github.com/WICG/turtledove/issues).
*  [Open a new issue](https://github.com/WICG/turtledove/issues/new) to ask a
   question, propose a feature, or discuss a use case.
*  [Join the scheduled calls for FLEDGE](https://github.com/WICG/turtledove/issues/88) (every
  second week). Everyone is welcome to join&mdash;to participate, first make sure to [join the
  WICG](https://www.w3.org/community/wicg/). You can actively participate or just listen in!

### Discuss related topics

Discuss industry use cases in the [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).

### Give feedback

[Privacy Sandbox feedback](/docs/privacy-sandbox/feedback/#fledge-api)
explains how to provide other types of feedback, and how to engage in discussion of Privacy Sandbox proposals.

## Get updates

* To be notified of status changes in the API, join the
  [mailing list for developers](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce).
* To closely follow all ongoing discussions on the API, click the **Watch**
  button on the [proposal page on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
  This requires you have or
  [create a GitHub account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
* To get overall updates on the Privacy Sandbox, subscribe to the RSS feed
  [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/).
