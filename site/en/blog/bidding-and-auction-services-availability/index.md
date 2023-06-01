---
layout: 'layouts/blog-post.njk'
title: FLEDGE Bidding and Auction services availability
authors:
  - priyankachatterjee
hero: 'image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/J1xttcy4grVMCckg0Feu.png'
alt: 'FLEDGE Bidding and Auction services availability'
description: >
  These services will be available for testing in 2023, for Chrome and Android.
date: 2023-02-09
tags:
  - privacy
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

As FLEDGE adoption continues to grow and scale, we recently launched a collection of new optimizations to help improve on-device auction latency. In addition to these improvements, we will be expanding support for the [Bidding and Auction services](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md) to the web platform. 

The Bidding and Auction services integrate with existing FLEDGE designs and offload bid computation and scoring to a cloud-based trusted execution environment. This was proposed back in 2022 and, after careful consideration, both Chrome and Android plan to provide support for Bidding and Auction services.

We will continue to support on-device auctions, and the use of the Bidding and Auction Services is not required unless it fits your use cases.

Our goal is to minimize the effort to test and deploy Bidding and Auction services. 

## Privacy and Security

The Bidding and Auction services provide a secure environment on the cloud that would protect user privacy and prevent adtechs from gaining access to protected information. 

The Bidding and Auction services’ code and cloud configurations will be made open source on GitHub, so that they can be verified by external parties and deployed to a [trusted execution environment](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) (TEE) on a public cloud platform. In this model, a user’s device would encrypt data required for ad targeting such that only the [Bidding and Auction services](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md) can decrypt this data. Independent, third-party entities will generate and manage the cryptographic keys for encryption and decryption. Adtechs do not have access to decryption keys and will not be able to access raw, unencrypted data.

{% Aside %}
A _trusted execution environment_ is a special configuration of computer hardware and software that allows external parties to verify the exact versions of software running on the computer. TEEs allow external parties to verify that the software does exactly what the software manufacturer claims it does—nothing more or less.
{% endAside %}

In addition, adtechs’ proprietary code for generating a bid or scoring an ad would run as an isolated process in a custom [V8 engine](https://v8.dev/), in a separate secure environment within a TEE, that has no way to log information, and no disk or network access. 

## Timeline

Bidding and Auction services for Chrome will be available for testing by the middle of 2023 and scaled testing by the end of 2023. This does not impact the Chrome timeline for the deprecation of third-party cookies shared at [privacysandbox.com](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline).

We encourage adtechs to continue their design and deployment of solutions built on top of the FLEDGE API in the [relevance and measurement unified origin trial](/docs/privacy-sandbox/unified-origin-trial/). The Bidding and Auction services will be integrated into these solutions and scale as near drop-in replacement. 

We plan for Bidding and Auction services to support [single-seller and multi-seller auctions](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md#types-of-auctions) including a design that supports the same functionality as [component auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#21-initiating-an-on-device-auction). These will be available for testing by the middle of 2023 and scaled testing by the end of 2023.

## Engage and share feedback

The Privacy Sandbox is a collaboration between Chrome and Android to provide technologies that protect user privacy and give companies and developers the tools they need to leverage interest-based advertising.

To learn more about these services and Privacy Sandbox proposals:

*   **GitHub**:
    *   Read the [Bidding and auction service proposal](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md), [raise questions and follow discussions](https://github.com/privacysandbox/fledge-docs/issues). We will publish more explainers on Bidding and Auction services.
    *   Read the [FLEDGE services proposal](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md), [raise questions, and follow the discussions](https://github.com/privacysandbox/fledge-docs/issues).
*   **W3C**: Discuss industry use cases in the [Improving Web Advertising Business Group,](https://www.w3.org/community/web-adv/participants) and discuss FLEDGE design in the Web Platform Incubation Community Group's [FLEDGE GitHub repository and regular calls](https://github.com/WICG/turtledove/issues/88).
*   **Developer support**: Ask questions and join discussions in:
    *   [Chrome's Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
    *   [Privacy Sandbox on Android issue tracker](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)
*   **Chrome:** Learn more about the [FLEDGE API on Chrome](/docs/privacy-sandbox/fledge/) and participate in the [origin trial](/docs/privacy-sandbox/unified-origin-trial/).
*   **Android:** Read the [FLEDGE on Android design proposal](https://developer.android.com/design-for-safety/privacy-sandbox/fledge) and learn more about how to [build FLEDGE](https://developer.android.com/design-for-safety/privacy-sandbox/guides/fledge) in your Android projects.
