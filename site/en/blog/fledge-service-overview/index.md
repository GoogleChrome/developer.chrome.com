---
layout: 'layouts/blog-post.njk'
title: FLEDGE services for Chrome and Android
authors:
  - alexandrawhite
  - joelewis
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/Hw1FzR5OI1KbQMQVzO3c.png'
alt: 'Privacy Sandbox FLEDGE services overview.'
description: >
  FLEDGE is a Privacy Sandbox proposal to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites. 
date: 2022-08-24
tags:
  - privacy
  - proposal
---

<style type="text/css">
	.type figcaption {text-align:left;}
</style>

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

FLEDGE ([Android](https://developer.android.com/design-for-safety/ads/fledge),
[Chrome](/docs/privacy-sandbox/fledge/#overview)) is a Privacy Sandbox proposal
to let marketers target ads to custom audiences, based on audience members'
previous mobile app or web engagement, in ways that limit third-party data
sharing. FLEDGE services provide real-time information to advertisers and
adtechs.

## Who should read these updates? {: #who}

*  If you work in **adtech**, **advertising**, or **ad mediation**, this
   article will share a high-level overview of the cloud services you can use
   to optimize FLEDGE.
*  If you're a **developer**, the explainers will link to and provide more
   in-depth technical details and setup.

These services are designed for supply-side providers (SSPs) and demand-side
suppliers (DSPs). No action is currently required from website and application
content publishers, though an SSP may reach out directly to coordinate efforts.

## Cross-platform, real-time services

FLEDGE was built for apps and the web, so it's critical that services work
across platforms and in real time.

The [FLEDGE services explainer](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md)
details the high-level system overview, trust model, privacy considerations,
and security goals for current and future proposed FLEDGE services.

If you've been testing FLEDGE in production, you'll already be familiar with
the **[Key/Value service](#key-value-service)**. This proposal has been updated
with a new trust model for cloud implementation. If you're familiar with the
"Bring Your Own Server" model, we've provided
[migration details and timeline updates](#byos-to-tee). 

The second service is newly proposed under the FLEDGE umbrella: 
**[Bidding and auction service](#bidding-auction-service)**. This new proposal,
offloads bidding and ad auctions from the client into the cloud, while
preserving privacy of the ad auction and bidding service.  We welcome feedback
on the merits of the new Bidding and auction service idea versus the current
on-device design, especially from testers who have already gained experience as
part of the ongoing Chrome ads relevance and measurement origin trial. This
proposal is in the [discussion phase of the proposal life
cycle](/docs/privacy-sandbox/proposal-lifecycle/). The Bidding and auction
service is not in scope for a "Bring Your Own Server" model.

### Key/Value service {: #key-value-service }

Adtechs can use the [Key/Value service](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)
to supply real-time information to the FLEDGE ad auction. This information
could be used in a number ways:

*  Buyers may want to calculate the remaining budget in an ad campaign.
*  Sellers may be required to check ad creatives against publisher policies.

The Key/Value service will have APIs for developers that allow for
[custom, user-defined functions](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs).
This allows developers to execute their own logic for tasks such as multiple
look-ups and other advanced queries.

By implementing a cloud service, adtechs can securely store data for their use
and keep it up-to-date as the ad campaign progresses.

The TEE-based [FLEDGE Key/Value service](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) has been [open sourced](/blog/open-sourcing-fledge-key-value-service/).

### Bidding and auction service proposal {: #bidding-auction-service }

{% Aside %}
This is a brand new proposal under discussion, and the
**current on-device bidding and auction approach for FLEDGE has not changed**.
The Bidding and auction service is a complementary proposal to offload bidding
and auction computation to a trusted execution environment if and when useful.

We want to hear [your feedback](#engage-and-share-feedback), and we
especially hope to hear from our testers participating in the
[ads relevance and measurement origin trial](/blog/privacy-sandbox-unified-origin-trial/).
{% endAside %}

The proposal for FLEDGE proposes ad bidding and auction execution to happen
on-device.

FLEDGE bidding and auction processes may be compute intensive and involve
several calls over the network. Migrating these computations to the cloud can
free up computational resources and network bandwidth for the device, and
optimize overall ad rendering latency.

With the [Bidding and auction service](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md),
ad space buyers and sellers can offload the execution of ad bidding and
auctions to services running in trusted execution environments in the cloud.

Unlike the Key/Value service, the Bidding and auction service is not in scope
for a "Bring Your Own Server" model. 

## Infrastructure for FLEDGE services

These service proposals present privacy-focused cloud-based services, rather
than services which run on-device.

There are several entities that interact so that the FLEDGE services can
perform their tasks.

* **[Clients](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#clients)**
  (Android devices and the Chrome browser) send encrypted requests to the
  FLEDGE service.
* A **[cloud platform](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#cloud-platform)**,
  hosts FLEDGE services in virtual machines backed by a trusted execution
  environment (TEE), which prevents FLEDGE services from sharing information
  with third-parties.
* **[Key management systems](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#key-management-systems)**
  include services and databases that generate and distribute public and
  private keys to ensure end-to-end encryption of client-service communication.

<figure class="screenshot">
	{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/5XMXkDmG1Tx07DPdHHIR.jpg", alt="System communication for FLEDGE services.", width="770", height="415" %}
	<figcaption><strong>Figure 1</strong>.<br><br>
	Clients send requests to the FLEDGE service, which returns information
	critical to the bidding and ad auction process. The client uses a public
	key, hosted on a key management system, to encrypt these requests. The
	FLEDGE service relies on key management systems to decrypt the requests and
	encrypt their response.<br><br>
	Refer to <a href="https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#system-overview">systems overview in the FLEDGE services explainer</a>.
    </figcaption>
</figure>

## Privacy and security considerations

In the proposed architecture for FLEDGE services, we've made several decisions
to ensure the infrastructure is privacy-preserving and secure.

Adtechs operate these services in trusted execution environments (TEEs) running
on a cloud provider with the required security features. 

There are a number of mechanisms to ensure data is kept private and secure,
including:

*  End to end encryption of all client-service and service-to-service
   communication.
*  Key management system operated by trusted parties.
*  The FLEDGE service is attested before that can obtain access to private keys
   required for decrypting client requests.

Sensitive data will not be exfiltrated from any service, either by adtech, Google, or any other entity.

### Bring Your Own Server to TEE migration {: #byos-to-tee}

FLEDGE for Chrome currently allows a
["Bring Your Own Server"](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) (BYOS) model
for the Key/Value service, which will need to be migrated to TEEs in the future.
The BYOS model is not in scope for [Bidding and Auction services](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md).

To ease the migration from the BYOS model, we're providing new [open source APIs,
documentation, server implementation, and explainers](/blog/open-sourcing-fledge-key-value-service/)
for the FLEDGE Key/Value service with additional capabilities beyond those
already proposed. These APIs intend to allow custom scripts and
custom code by adtechs, which can be run on TEEs.

Chrome and Android will be open sourcing a Key/Value service so that adtech
platforms can monitor development and potentially contribute to the data
plane’s codebase.

#### Timeline

Adtech platforms who have implemented the BYOS model can consider migrating
to a TEE-based Key/Value service implementation while FLEDGE is still in development.

In the long-term, adtechs will need to use the open source FLEDGE
Key/Value services running in trusted execution environments (TEEs)
for retrieving real-time data. To ensure that the ecosystem has sufficient
time to test, we don’t expect to require the use of the open-source
Key/Value services or TEEs until sometime after third-party cookie
deprecation. We will provide substantial notice for developers to begin
testing and adoption before this transition takes place.

Further, we're aiming to provide user-defined function API and other
integrations for the Key/Value service by mid-2023. Once that is ready, adtechs
can develop more advanced logic. We welcome [your contributions](#feedback) to
make this implementation better and best meet your needs.

## Engage and share feedback {: #feedback}

The Privacy Sandbox is a collaboration between Chrome and Android to provide
technologies that protect user privacy and give companies and developers the
tools they need to leverage interest-based advertising.

To learn more about the Privacy Sandbox initiative:

*  **GitHub**:
   * Read the [FLEDGE services proposal](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md),
   [raise questions, and follow the discussions](https://github.com/privacysandbox/fledge-docs/issues).
   * Read the [Bidding and auction service proposal](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md),
     [raise questions and follow discussions](https://github.com/privacysandbox/fledge-docs/issues).
     In particular, we’re interested in hearing from participants of the ads
     relevance and measurement origin trial. What do you think of this proposal
    as compared to the current on-device design?
*  **W3C**: Discuss industry use cases in the [Improving Web Advertising Business Group,](https://www.w3.org/community/web-adv/participants) and discuss FLEDGE design in the Web Platform Incubation Community Group's [FLEDGE GitHub repository and regular calls](https://github.com/WICG/turtledove/issues/88).
*  **Developer support**: Ask questions and join discussions in:
    *  [Chrome's Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
    *  [Privacy Sandbox on Android issue tracker](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)
*  **Chrome:** Learn more about the [FLEDGE API on Chrome](/docs/privacy-sandbox/fledge/).
*  **Android:** Read the [FLEDGE on Android design proposal](https://developer.android.com/design-for-safety/privacy-sandbox/fledge) and learn more about how to [build](https://developer.android.com/design-for-safety/privacy-sandbox/guides/fledge) FLEDGE in your Android projects.
