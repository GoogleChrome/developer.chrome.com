---
layout: 'layouts/doc-post.njk'
title: 'Topics API demos'
subhead: >
  Try out the Topics API demos. 
description: >
  Try out the Topics API demos.
date: 2022-01-25
updated: 2022-02-01
authors:
  - samdutton
---

The Topics API demo provides a look at how topics are inferred from hostnames. You can preview what topics are observed when you visit a demo site which requires very little setup.

If you want to test the API with your users, sign up for the [Relevance and Measurement origin trial](LINK).

Our demo is a preview  that demonstrates most features of the Topics API, for you to gain familiarity with how the API is implemented.

## Test with chrome://flags or feature flags

There are two ways to try the Topics API as a single user, running Chrome 101 or above:

- Enable the API in the CHrome page: `chrome://flags/#privacy-sandbox-ads-apis`

<figure>

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png", alt="Enable the Topics API using the chrome://flags/#privacy-sandbox-ads-apis page", width="800", height="246" %}
  <figcaption>Enable the Topics API using the chrome://flags/#privacy-sandbox-ads-apis page</figcaption>
</figure>

- Run Chrome from the command line with the following flags:

```text
--enable-features=BrowsingTopics,PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting
```
