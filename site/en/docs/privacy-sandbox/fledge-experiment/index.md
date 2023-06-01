---
layout: 'layouts/doc-post.njk'
title: 'The Protected Audience API: experiment and participate'
subhead: >
  Quick guide to implement and test the API. Set up privacy-preserving ad auctions to serve remarketing and custom audience use cases.
description: >
  The Protected Audience API is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads from websites the user has previously visited.
date: 2022-03-31
updated: 2022-08-12
authors:
  - samdutton
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

## Learn the essentials

* If you're a developer or software engineer, the [Protected Audience API Developer Guide](/blog/fledge-api)
provides an in-depth technical reference to the proposal.

* [The Protected Audience API](/docs/privacy-sandbox/fledge) is a less technical overview, and also has a
[glossary](/docs/privacy-sandbox/fledge#glossary).


## Try the API

{% Aside 'caution' %}

Not all users may be eligible for the Privacy Sandbox Relevance and Measurement origin trial, even
on pages that provide a valid trial token.

[Testing the Privacy Sandbox ads relevance and measurement APIs](/blog/privacy-sandbox-unified-origin-trial#eligible-users)
explains why this is so, and shows how you can (and should) detect if an origin trial feature is
available before attempting to use it.

{% endAside %}

1. Try the [demo](https://fledge-demo.glitch.me). This provides a walkthrough of a basic Protected Audience API
implementation. [The Protected Audience API demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)
explains how the demo code works, and shows how to use Chrome DevTools for Protected Audience API debugging.
2. Check the Privacy Sandbox [status page](/docs/privacy-sandbox/status/#fledge) for updates on the
implementation status of the Protected Audience API.
3. Experiment with the API:
   * [Protected Audience API developer guide](/blog/fledge-api#try-fledge) explains how to take part in the
   Privacy Sandbox Relevance and Measurement origin trial.
   * Try out Protected Audience API for a single user by enabling `chrome://flags/#privacy-sandbox-ads-apis`
   or by running Chrome from the command line with [Protected Audience API feature flags](/blog/fledge-api#flags).
   * The [developer guide](/blog/fledge-api) also provides a reference guide to API methods
   and parameters.
   * The [source code](https://github.com/JackJey/fledge-demo) for the [Protected Audience API demo](https://fledge-demo.glitch.me)
   provides a starting point for your own experimentation.
   * [Debug Protected Audience API worklets](/blog/fledge-api/#debugging)
   explains how to use Chrome DevTools to help debug Protected Audience API bidding and auction code.
   * The [developer guide](/blog/fledge-api) details the features supported in the latest version of Chrome. 
   [The API explainer provides more detail](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)about feature 
   support and constraints.

## Get support

Is anything blocking you from experimenting with the API? Ask a question 
about **your implementation**, about the **demo**, or about the 
**documentation**:

*  [Open a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)
   on the Privacy Sandbox Dev Support repository. Make sure to select the
   Issue template for the Protected Audience API.
*  Raise an issue on the [demo code repo on
   GitHub](https://github.com/JackJey/fledge-demo).
*  For more general questions about how to meet your **use cases** with the
   API, [file an issue on the proposal repository](https://github.com/WICG/turtledove/issues/new).

For bugs and issues with the implementation of the Protected Audience API in Chrome:

*  [View existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)
   reported for the API.
*  Raise a new issue at [crbug.com/new](https://crbug.com/new).

## Join the discussion

Everyone is welcome to join in discussion of the Protected Audience API proposal. In 
particular, if you're experimenting with the API, your feedback is essential.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and discussed publicly.

*  [Read the proposal explainer on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
*  Join the conversation about [existing issues](https://github.com/WICG/turtledove/issues).
*  [Open a new issue](https://github.com/WICG/turtledove/issues/new) to ask a question, propose a
feature, or discuss a use case.
*  [Join the scheduled calls for the Protected Audience API](https://github.com/WICG/turtledove/issues/88) (every
  second week). Everyone is welcome to join&mdash;to participate, first make sure to [join the
  WICG](https://www.w3.org/community/wicg/). You can actively participate or just listen in!

### Discuss related topics

- Discuss industry use cases in the [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).

### Give feedback

* Use the Privacy Sandbox [feedback form](/docs/privacy-sandbox/feedback/#feedback-form)
to share feedback privately with the Chrome team outside of public forums.
* [Privacy Sandbox Feedback](/docs/privacy-sandbox/feedback/#fledge-api) explains how to provide
other types of feedback, and how to engage in discussion of Privacy Sandbox proposals.


## Get updates

- To be notified of status changes in the API, join the [mailing list for
  developers](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce).
- To closely follow all ongoing discussions on the API, click the **Watch** button on the [proposal page on
  GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md). This requires you have or [create a GitHub
  account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
- To get overall updates on the Privacy Sandbox, subscribe to the RSS feed [Progress in the Privacy
  Sandbox](/tags/progress-in-the-privacy-sandbox/).
