---
layout: 'layouts/doc-post.njk'
title: 'IP Protection'
subhead: >
  Improve user privacy by protecting their IP address from being used for tracking.
description: >
  A proposal to improve user privacy by protecting their IP address from being used for tracking. 
date: 2022-12-05
authors:
  - anusmitaray
---

{% Aside %}
This proposal used to previously have a different scope and was known as Gnatcatcher, or the Global Network Address Translation Combined with Audited and Trusted CDN or HTTP-Proxy Eliminating Reidentification. You can still view the [deprecated documentation](/docs/privacy-sandbox/archive/gnatcatcher/).
{% endAside %}

## Implementation status

This document outlines a new proposal to help prevent covert tracking: IP Protection.

{% Partial 'privacy-sandbox/timeline/ip-protection.njk' %}
*  [The Privacy Sandbox timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) provides implementation timings for other Privacy Sandbox proposals. IP Protection is still in its early phase and will have firmer timelines available on this website when available.

## Why do we need this proposal?

IP addresses were created to provide unique identifiers for a client so that traffic can be routed over the internet. IP addresses can be stable over periods of time, which can lead to user identification across first-parties.

IP Protection is a proposal to avoid sharing a user's real IP address with third parties. This proposal suggests using a privacy proxy (previously called a Near-Path NAT) for a connection.  An IP address is an effective cross-site identifier as it is unique, relatively stable, cheap to collect, and IP address collection cannot be detected by the browser. Therefore limiting access to IP addresses is important to prevent methods of cross-site tracking beyond third-party cookies.

## How will IP Protection work?

IP Protection proposes to anonymize the user's IP address, to help protect it from being used by third parties identified as potentially using IP addresses for web-wide cross-site tracking.
 
IP Protection proposes a two-hop [privacy proxy that anonymizes qualifying traffic](https://github.com/GoogleChrome/ip-protection#privacy-proxy):

* To stop a destination origin from seeing the client’s original IP address.
* To make sure that proxy and network intermediaries are not privy to the contents of traffic between the client and the destination origin.

### GeoIP

IP-based geolocation is used by a number of services within proxied third-party traffic to obey local laws and regulations. They let services provide content that is relevant to users, such as content localization (for example, to set language), local cache assignment, and geotargeting for ads. To support these needs, the privacy proxy assigns IP addresses that represent the user’s coarse location, including country.

## When will IP Protection be available?

IP protection will not launch as a default setting for Chrome users before 2024. Testing and launch timelines will be determined in accordance with [our commitments](https://blog.google/around-the-globe/google-europe/path-forward-privacy-sandbox/) to the UK’s Competition and Markets Authority, and informed by ecosystem input. The implementation of IP Protection may take place on a different timeline than [other Privacy Sandbox efforts](http://privacysandbox.com/timeline), such as phasing out third-party cookies.

## Engage and share feedback

The IP Protection proposal is under active discussion and subject to change. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/GoogleChrome/ip-protection), [raise questions and participate in discussion](https://github.com/GoogleChrome/ip-protection/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
