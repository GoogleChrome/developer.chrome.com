---
layout: 'layouts/doc-post.njk'
title: 'Gnatcatcher'
subhead: >
  Keep individual users' IP addresses hidden to prevent cross-site covert tracking.
description: >
  A proposal to keep individual users' IP addresses hidden to prevent cross-site covert tracking. 
date: 2022-03-04
authors:
  - alexandrawhite
---

{% Aside %}
This proposal has been updated with a different scope and is now called IP Protection. You can check out the [documentation](/docs/privacy-sandbox/ip-protection) and [explainer](https://github.com/GoogleChrome/ip-protection) for IP Protection to learn more.
{% endAside %}

## Implementation status

This document outlines a new proposal to prevent covert tracking: Gnatcatcher.

*  The [Gnatcatcher proposal](https://github.com/bslassey/ip-blindness) has 
   entered [public 
   discussion](https://github.com/bslassey/ip-blindness/issues).
*  This proposal has not been implemented in any browser.
*  [The Privacy Sandbox 
   timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) 
   provides implementation timings for Gnatcatcher and other Privacy Sandbox 
   proposals.

## Why do we need this proposal?

IP addresses were created to provide unique identifiers for a client so that 
traffic can be routed over the internet. IP addresses can be stable over 
periods of time, which can lead to user identification across first-parties.

Gnatcatcher, or the Global Network Address Translation Combined with Audited 
and Trusted CDN or HTTP-Proxy Eliminating Reidentification, is a proposed 
solution for IP blindness. This proposal suggests combining two other 
proposals: [Willful IP Blindness](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md)
and [Near-Path NAT](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) 
(or a proxy-related solution) for any connection not participating in Willful 
IP Blindness. 

This means by default, IP addresses would be hidden. Sites may be allowed to 
attest they aren't misusing IP addresses to use direct connections.

### What is Willful IP Blindness?

The goal of Willful IP Blindness is to provide HTTP applications a mechanism to 
assert that they are not using IP addresses for cross-site tracking purposes.  
The proposal also states this mechanism should allow for normal operations of 
servers, such as uses of IP addresses for bot, DoS, and SPAM detection.

Willful IP Blindness could be offered as a service by a content delivery 
network (CDN) or reverse proxies, to remove burden from the hosting providers.

### What is Near-Path Nat?

Near-Path NAT (Network Address Translator) proposes allowing groups of users to 
send traffic through the same server, thus leading all traffic to appear to 
originate from the same pool of IP addresses.  This proposal suggests no 
server-side changes are necessary to guarantee IP address privacy, which is 
much easier to rollout for sites and users.

{% Aside 'key-term' %}
_Network Address Translator_ is a process which allows one unique IP address to 
represent a group of computers.
{% endAside %}

The browser will use Multiplexed Application Substrate over QUIC Encryption 
(MASQUE) to forward HTTP traffic through an IP privatizing server (IPPS). The 
HTTP traffic seen by servers will have the IP address of the IPPS instead of 
the IP address of the browser. To ensure the IPPS isn't privy to the HTTP 
traffic contents, the browser will use end-to-end encryption.

## How will Gnatcatcher work?

Gnatcatcher proposes use of both Near-Path NAT and Willful IP Blindness. 
Near-Path NAT (or another proxy solution) would use IP Addresses from 
destination servers as a baseline default.

There is a subset of web service providers who require additional controls to 
prevent abuse, who could choose to attest to Willful IP Blindness compliance so 
that the client can make a direct connection. That compliance may be ensured 
through audit and certification

### How will Willful IP Blindness be enforced?

There are a number of options in consideration for Willful IP Blindness 
enforcement. One possibility is to require an independent third-party 
coordinator for assessment and attestation to access IP addresses. 

Enforcement for Gnatcatcher is still [in 
discussion](https://github.com/bslassey/ip-blindness/issues). 

## When will Gnatcatcher be available?

The earliest date of scaled availability represents the earliest date when 
Gnatcatcher could be made available to sites for broad use on an optional basis. 
This will not happen before 2023.

At this time, Gnatcatcher is a proposal and has not been implemented for any 
browser.

## Engage and share feedback

The Gnatcatcher proposal is under active discussion and subject to change in the 
future. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/bslassey/ip-blindness), 
   [raise questions and participate in discussion](https://github.com/bslassey/ip-blindness/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy 
   Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
