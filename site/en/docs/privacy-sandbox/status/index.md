---
layout: 'layouts/doc-post.njk'
title: API status and feature releases
subhead: >
  Review Chrome platform status, resources, and feature release
  timelines.
description: >
  Review Chrome platform status, resources, and feature release
  timelines.
date: 2021-05-18
updated: 2023-07-03
authors:
  - alexandrawhite
---

Each of the Privacy Sandbox proposals are in varied stages of the development
process. Within each proposal, there are individual features that have
different expected availability.

To review the latest information on any proposal or API, visit the respective overview documentation and the [Privacy Sandbox timeline](https://privacysandbox.com/open-web/).

## Attribution Reporting

{% Partial 'privacy-sandbox/timeline/attribution-reporting.njk' %}

{% Partial 'privacy-sandbox/timeline/attribution-reporting-features.njk' %}

## Bounce tracking mitigations

{% Partial 'privacy-sandbox/timeline/bounce-tracking.njk' %}

## CHIPS

{% Partial 'privacy-sandbox/timeline/chips.njk' %}

## Federated Credential Management API (FedCM)

{% Partial 'privacy-sandbox/timeline/fedcm.njk' %}

## Fenced Frames

{% Partial 'privacy-sandbox/timeline/fenced-frames.njk' %}

{% Partial 'privacy-sandbox/timeline/fenced-frames-features.njk' %}

## First-Party Sets

{% Partial 'privacy-sandbox/timeline/first-party-sets.njk' %}

## IP Protection

{% Partial 'privacy-sandbox/timeline/ip-protection.njk' %}

## Private Aggregation API

{% Partial 'privacy-sandbox/timeline/private-aggregation.njk' %}

{% Partial 'privacy-sandbox/timeline/private-aggregation-features.njk' %}

## Private State Tokens

{% Partial 'privacy-sandbox/timeline/private-state-tokens.njk' %}

## Protected Audience

Descendant of [TURTLEDOVE](https://github.com/WICG/turtledove). Formerly
named FLEDGE.

{% Partial 'privacy-sandbox/timeline/fledge.njk' %}

{% Partial 'privacy-sandbox/timeline/fledge-features.njk' %}

## Shared Storage

{% Partial 'privacy-sandbox/timeline/shared-storage.njk' %}

{% Partial 'privacy-sandbox/timeline/shared-storage-features.njk' %}

## Topics API

{% Partial 'privacy-sandbox/timeline/topics.njk' %}

{% Partial 'privacy-sandbox/timeline/topics-features.njk' %}

## User-Agent reduction and Client Hints (UA-CH)

Limit passively shared browser data to reduce the volume of sensitive
information which leads to fingerprinting.

{% Partial 'privacy-sandbox/timeline/ua-ch.njk' %}

{% Details %}
{% DetailsSummary %}

## Closed proposals

{% endDetailsSummary %}

### FLoC

Replaced by the [Topics API](#topics).

- [Chrome Platform Status](https://www.chromestatus.com/features/5710139774468096).
- Initial origin trial was closed.
  See [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs)
  for updates.
- [Blink status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- [API proposal](https://github.com/WICG/floc) was under discussion with
  [WICG](https://www.w3.org/community/wicg/) and interest groups.
- [GitHub](https://github.com/WICG/floc): see
  [issues](https://github.com/WICG/floc/issues) for API questions and discussion.

{% endDetails %}

---

## Find out more

### Blink, Chromium, and Chrome

- [What are Chrome release channels?](/docs/web-platform/chrome-release-channels/)
- [Chrome release schedule](https://www.chromestatus.com/features/schedule)
- [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
- [Intent to explain: Demystifying the Blink shipping
  process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): implementation
  status and discussion of features in Blink, the rendering engine used by Chromium
- [Chromium code search](https://source.chromium.org/)
- [What are Chrome flags?](/docs/web-platform/chrome-flags/)

### Origin trials

- [Get started with Chrome's origin trials](/docs/web-platform/origin-trials/)
- [Third-party origin trials](/docs/web-platform/third-party-origin-trials/)
- [Troubleshoot origin trials](/docs/web-platform/origin-trial-troubleshooting/)
