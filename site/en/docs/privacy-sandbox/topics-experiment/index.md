---
layout: 'layouts/doc-post.njk'
title: 'Topics API: experiment and participate'
subhead: >
  Quick guide to implement and test the API. Access topics with JavaScript and share your feedback.
description: >
  Quick guide to implement and test the API. Access topics with JavaScript and share your feedback.
date: 2022-03-31
updated: 2022-04-19
authors:
  - samdutton
---

## Learn the essentials

* [Topics API overview](/docs/privacy-sandbox/topics/overview) introduces the API and explains the issues it addresses. 
* [Topic classification](/docs/privacy-sandbox/topics/topic-classification) explains the classifier model, how topics are inferred and assigned to users' browsers, and how users can control their topics list.
* [The Topics API developer guide](/docs/privacy-sandbox/topics/#get-and-set-topics) covers setup, getting and setting topics using JavaScript and headers, and debugging.

## Try the API

{% Aside 'caution' %}

Not all users may be eligible for the Privacy Sandbox Relevance and Measurement origin trial, even
on pages that provide a valid trial token.

[Testing the Privacy Sandbox ads relevance and measurement APIs](/blog/privacy-sandbox-unified-origin-trial#eligible-users)
explains why this is so, and shows how you can (and should) detect if an origin trial feature is
available before attempting to use it.

{% endAside %}

1. Check the Privacy Sandbox [status page](/docs/privacy-sandbox/status/#topics) for updates on the
implementation status of the Topics API.
2. Experiment with the API:
   * Learn how to take part in the [Privacy Sandbox Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/).
   * Try out Topics for a single user in Chrome 101 or above by enabling `chrome://flags/#privacy-sandbox-ads-apis`
   or by running Chrome from the command line with the `--enable-features=PrivacySandboxAdsAPIsOverride`
   [feature flag](https://www.chromium.org/developers/how-tos/run-chromium-with-flags). Refer to [Topics API demos](/docs/privacy-sandbox/topics/demo/).
   * [Use the Topics JavaScript API to access topics](/docs/privacy-sandbox/topics/#access-topics-with-the-javascript-api)
   provides a short code example to demonstrate how the API might be used to access topics observed
   for the current user.


## Get support

Is anything blocking you from experimenting with the API? Ask a question 
about **your implementation** or about the **documentation**:

*  [Open a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)
   on the Privacy Sandbox Dev Support repository. Make sure to select the issue template for Topics.
*  For more general questions about how to meet your **use cases** with the 
   API, [file an issue on the proposal repository](https://github.com/jkarlin/topics/issues/new).

For bugs and issues with the implementation of the Topics API in Chrome:

*  [View existing issues](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestCohort)
   reported for the API.
*  Raise a new issue at [crbug.com/new](https://crbug.com/new).


## Join the discussion

Everyone is welcome to join in discussion of the Topics proposal. In particular, if you're
experimenting with the API, your feedback is essential.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and discussed publicly.

* [Read the proposal explainer on GitHub](https://github.com/jkarlin/topics).
* Join the conversation about [existing issues](hhttps://github.com/jkarlin/topics/issues).
* [Open a new issue](https://github.com/jkarlin/topics/issues/new) to ask a question, propose a
feature, or discuss a use case.

### Discuss related topics

* Discuss industry use cases in the [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).

### Give feedback

* Use the Privacy Sandbox [feedback form](/docs/privacy-sandbox/feedback/#feedback-form)
to share feedback privately with the Chrome team outside of public forums.
* [Privacy Sandbox Feedback](/docs/privacy-sandbox/feedback/#topics-api) explains how to provide
other types of feedback, and how to engage in discussion of Privacy Sandbox proposals.


## Get updates

* To be notified of status changes in the API, join the [mailing list for
  developers](https://groups.google.com/u/3/a/chromium.org/g/topics-api-announce).
* To closely follow all ongoing discussions on the API, click the **Watch** button on the [proposal page on
  GitHub](https://github.com/jkarlin/topics). This requires you have or [create a GitHub
  account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
* To get overall updates on the Privacy Sandbox, subscribe to the RSS feed [Progress in the Privacy
  Sandbox](/tags/progress-in-the-privacy-sandbox/).
