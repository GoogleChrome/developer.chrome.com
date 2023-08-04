---
layout: layouts/doc-post.njk
title: Privacy Preserving Building Blocks
subhead: >
  Strive to replace existing functionality with privacy-preserving techniques.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

Eventually 3P cookies will be removed and we will need to rely on other technologies as building blocka for implementing the kind of features users have come to expect on the web, and which greatly improve their experience. The following table provides a concise mapping from available or proposed web platform APIs to the scenario they can be used to replace the use of cookies.

| API                                                                     | Scenario                                                                                                                                                |
| :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FPS                                                                     |                                                                                                                                                         |
| CHIPS                                                                   |
| [Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/) | Federated identity services enabling users to log into sites without sharing their personal information with a third-party service or website.          |
| [Private State Tokens](/docs/privacy-sandbox/trust-tokens/)             | Convey a limited amount of information from one browsing context to another to help combat fraud, without passive tracking.                             |
| [Ad relevance](/docs/privacy-sandbox/#show-relevant-content)            | A suite of APIs to enable [ad relevance](/docs/privacy-sandbox/#show-relevant-content)                                                                  |
| [Measurement](/docs/privacy-sandbox/#measure-digital-ads)               | Interest-based advertising, on-device auctions for custom audiences, cross-site content selection, ad conversion measurement and attribution, and more. |

Learn more about how leverage the capabilities of the web platform to replace 3P cookies from your use case by reviewing the components of this section, and the [Privacy Sandbox documentation](/docs/privacy-sandbox/).
