---
layout: 'layouts/doc-post.njk'
title: 'IP Protection'
subhead: >
  Improve user privacy by protecting their IP address from being used for tracking.
description: >
  A proposal to improve user privacy by protecting their IP address from being used for tracking. 
date: 2022-12-01
authors:
  - anusmitaray
---

{% Aside %}
This proposal previously had a different scope and was known as Gnatcatcher, or the Global Network Address Translation Combined with Audited and Trusted CDN or HTTP-Proxy Eliminating Reidentification. You can still view the [deprecated documentation](/docs/privacy-sandbox/gnatcatcher/).
{% endAside %}

## Implementation status

This document outlines the IP Protection proposal to help prevent covert tracking, which has evolved from [Gnatcatcher](/docs/privacy-sandbox/gnatcatcher/).

*  The [IP Protection proposal](https://github.com/spanicker/ip-blindness) has entered [public discussion](https://github.com/spanicker/ip-blindness/issues).
*  This proposal has not been implemented in any browser.
*  [The Privacy Sandbox timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) provides implementation timings for other Privacy Sandbox proposals. The IP Protection proposal is still in an early discussion phase. We will provide firmer timelines on this website when available.

## Why do we need this proposal?

A user's IP address is the public 'address' of their computer on the internet which, in most cases, is dynamically assigned by the network through which they connect to the internet. However, even dynamic IP addresses may remain stable over periods of time, and this can lead to user identification across first parties.

IP Protection is a proposal to avoid sharing a user's real IP address with third parties. This proposal suggests using a privacy proxy (previously called a Near-Path NAT) for a connection.  An IP address is an effective cross-site identifier as it is unique, relatively stable, cheap to collect, and IP address collection cannot be detected by the browser. Therefore limiting access to IP addresses is important to prevent methods of cross-site tracking beyond third-party cookies.

## How will IP Protection work?

IP Protection proposes to anonymize the IP address for [third parties identified as potentially using IP addresses for web-wide cross-site tracking](https://github.com/spanicker/ip-blindness#cross-site-tracking-and-the-role-of-ip-addresses).
 
IP Protection proposes a two-hop [privacy proxy that anonymizes qualifying traffic](https://github.com/spanicker/ip-blindness#privacy-proxy):

* To stop a destination origin from seeing the client’s original IP address.
* To make sure that proxy and network intermediaries are not privy to the contents of traffic between the client and the destination origin.

### GeoIP

IP-based geolocation is used by a number of services within proxied third-party traffic to help services obey local laws and regulations. They also allow services to provide content that is relevant to users, such as content localization (for example, to set language), local cache assignment, and geotargeting for ads. To support these needs, the privacy proxy assigns IP addresses that represent the user’s coarse location, including country.

## When will IP Protection be available?

IP protection will not launch as a default setting for Chrome users before 2024. Testing and launch timelines will be informed partly by ecosystem input. The timelines are independent of other anti-covert-tracking efforts like phasing out third-party cookies and reducing the information shared by default in the user agent.

## Engage and share feedback

The IP Protection proposal is under active discussion and subject to change. If you try this API and have feedback, we'd love to hear it.

*  **GitHub**: Read the [proposal](https://github.com/spanicker/ip-blindness), 
   [raise questions and participate in discussion](https://github.com/spanicker/ip-blindness/issues).
*  **Developer support**: Ask questions and join discussions on the [Privacy 
   Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
