---
layout: layouts/doc-post.njk
title: Fenced Frames
subhead: >
  Enforce boundaries between embedding pages and cross-site embedded documents.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

In a web that has its cookies and storage partitioned by top-frame site, there are occasions (such as [Interest group based advertising](https://github.com/WICG/turtledove) or [Consistent A/B experiments across sites](https://github.com/WICG/shared-storage#simple-example-consistent-ab-experiments-across-sites)) when it would be useful to display content from different partitions in the same page. This can only be allowed if the documents that contain data from different partitions are isolated from each other such that they're visually composed on the page, but unable to communicate with each other. Iframes do not suit this purpose since they have several communication channels with their embedding frame (e.g., postMessage, URLs, size attribute, name attribute, etc.). We propose fenced frames, a new element to embed documents on a page, that explicitly prevents communication between the embedder and the frame.

{%Aside 'important' %}
Note: contrast Fenced Frames Proposal as an API meeting the needs and requirements of solutions currently reying on 3P cookies.
{% endAside %}

## Debuggability

- DevTools are supported for fenced frames similar to how they are supported for iframes.
- DevTools’ network tab will include the beacons sent from a fenced frame as part of [fenced frames ads reporting](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md).
- We also support a developers testing mode behind a non-web-exposed flag where a `FencedFrameConfig` can be created with a plain url, to enable testing fenced frames without invoking the above mentioned consumer APIs. At the moment, this is at _chrome://flags/#enable-fenced-frames-developer-mode_, but we will likely move it to DevTools in the future.

## Non-ads use cases

The currently supported use cases (interest based ads and the more generic selectURL API) are definitely not the only ones that fenced frames are anticipated to support. For instance, posssibilities include a non-ads use case for ([personalized payment provider buttons](https://github.com/WICG/fenced-frame/issues/15) which have received ecosystem support.

The API surface for fenced frames configuration via FencedFrameConfig allows multiple consumer APIs to create FencedFrameConfig objects relevant to their needs and is thus extendable for future use cases.
