---
title: Open sourcing the FLEDGE Key/Value service
description: >
  FLEDGE Key/Value service
layout: 'layouts/blog-post.njk'
date: 2022-08-23
hero: 'image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/FQx2L0MGnXgrcAOzkVmm.png'
alt: ''
authors:
  - kevinkiklee
tags:
  - privacy
  - proposal
---
The [FLEDGE Key/Value service code](https://github.com/privacysandbox/fledge-key-value-service) is now available in a Privacy Sandbox GitHub repository. This service can be used by Chrome and Android developers.

## What is FLEDGE?

[FLEDGE](/docs/privacy-sandbox/fledge/) is a proposal to serve remarketing and custom audience use cases while protecting user’s privacy. When FLEDGE executes the ad auction between buyers (DSP) and sellers (SSP), the client receives real-time signals from the FLEDGE Key/Value services. Real-time signals are critical because they provide information, such as the budget for a buyer, when a bid is calculated. They can also provide information about an ad creative to a seller, to help decide which ad is shown to the user. Without these signals, buyers and sellers are not able to conduct basic operations that the ad industry relies on. 

When the auction is executed, [FLEDGE Key/Value services](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) are queried and values become available for buyers and sellers. When a buyer is making a bid, the DSP Key/Value service can be queried to receive real-time information to help determine the bid. When a seller is making a decision about the bids, the SSP Key/Value service can be queried with the creative render URL to receive any information about the creative to help score the ad. 

## Operate the FLEDGE Key/Value service

The [README file](https://github.com/privacysandbox/fledge-key-value-service/blob/main/README.md) of the repository links to instructions for setting up the required AWS infrastructure, building service artifacts, running the service, and integrating with the FLEDGE API. The documentation will be updated as service development progresses. 

For testing, adtechs can currently operate their own service (["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)), but in the long-term, adtechs will need to use the open-source FLEDGE Key/Value services running in trusted execution environments (TEEs) for retrieving real-time data.

To ensure that the ecosystem has sufficient time to test, we don’t expect to require the use of the open-source Key/Value services or TEEs until sometime after third-party cookie deprecation. We will provide substantial notice for developers to begin testing and adoption before this transition takes place.

## Initial implementation plans

For our initial release, we will provide:
* Sample data or a basic set of libraries and instructions for generating your own data. In the future, we intend to provide additional data generation solutions to integrate with your system more easily.
* A service setup that runs on an Amazon Web Service (AWS) Nitro Enclave environment with basic key-value lookup functionality.

{% Aside %}
For the initial version, the Key/Value service code is only supported on Amazon Web Services.
{% endAside %}

At the moment, there is limited or no support for establishing trust between the client and the service, but will be provided in the future.

{% Aside 'warning' %}
The FLEDGE Key/Value service is publicly queryable and does not authenticate callers. Since anyone can query any data you load into the service, we strongly recommend against serving personal identifiable information.
{% endAside %}

## Feedback

The FLEDGE Key/Value service proposal is under active discussion and subject to change in the future. If you try this system and have feedback, we'd love to hear it:
* **Discussions and questions**
  * Read the [trust model](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md) and [attend the FLEDGE WICG meeting](https://github.com/WICG/turtledove/issues/88).
  * [Raise questions and participate in discussion in the GitHub repository](https://github.com/WICG/turtledove/issues)
* **Developer support**: Ask questions and join discussions on
  * [Privacy Sandbox for the Web Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
  * [Privacy Sandbox on Android issue tracker](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)
