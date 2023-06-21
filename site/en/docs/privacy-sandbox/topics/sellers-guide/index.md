---
layout: 'layouts/doc-post.njk'
title: 'Topics API sellers guide'
subhead: Learn how to use the Topics API with Prebid.js for header bidding.
description: Learn how to use the Topics API with Prebid.js for header bidding.
date: 2023-06-22
authors:
  - leeronisrael
  - darojas
---

[Prebid](https://prebid.org/) is an open-source software library that lets publishers use header bidding. [Prebid.js Core](https://docs.prebid.org/prebid/prebidjs.html) is the foundational code that is needed for header bidding, while modules are extensions that provide additional features and functionality. The Topics module calls the Topics API on a publisher's site, then sends topics in bid requests to bidders. 

This guide assumes you're using header bidding via Prebid and need to implement the Topics module.

## Prebid integration

We recommend publishers update to Prebid version 7.29 or later to use the [Topics FPD Module](https://docs.prebid.org/dev-docs/modules/topicsFpdModule.html). For full documentation, refer to the official [Prebid API Reference](https://docs.prebid.org/dev-docs/publisher-api-reference.html). 

By default, the module creates a cross-origin iframe on the publisher site, from which the Topics API is called. Then, topics are sent up to the parent window. From there, the topics are inserted into the bid request and sent to bidders. The process is illustrated here:

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/xY2OKyTrSboKAJFJHSm4.png", alt="Topics Prebid module using iframe-based integration", width="800", height="386" %}

### Topics iframe configuration

Publishers can override the default config maintained in the module to create multiple topics-invoking iframes on behalf of various bidders. The [Prebid Topics FPD Module documentation](https://docs.prebid.org/dev-docs/modules/topicsFpdModule.html) provides more detail. 

### Publishers integration

To enable this module, publishers need to compile Prebid.js with support for the module. They can add the `topicsFpdModule` module to their existing modules:

```text
gulp build --modules=topicsFpdModule,...
```
More information on building Prebid with modules can be found in the [Prebid GitHub README](https://github.com/prebid/Prebid.js/blob/master/README.md#Build).

## OpenRTB spec

For more information, refer to the [OpenRTB](https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/extensions/community_extensions/segtax.md) Segment Taxonomies [spec](https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/extensions/community_extensions/segtax.md).

The Prebid module passes topics in the [`BidRequest.user.data`](https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/extensions/community_extensions/segtax.md#example) object. The following example illustrates the role of `segtax` (Segment Taxonomies) in `BidRequest.user.data` when used to send information from the Topics API. 

In the following example, three topics are shared from the [V1 Topics taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md):
- `1. Arts & Entertainment`
- `2. Acting & Theater`
- `3. Comics` 

```javascript
{
  ...,
  "user": {
    "data": [
      {
        "name": "ad-tech.example",
        "ext": {
          "segtax": 600
        },
        "segment": [
          { "id": "1" },
          { "id": "2" },
          { "id": "3" }
        ]
      }
    }
  }
}
```

## What's next?

Once a publisher begins sending topics in bid requests, demand-side platforms (DSPs) should ensure they are set up to maximize the use of topics in serving relevant ads. This is to be the subject of an upcoming guide. 
