---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE system overview'
subhead: >
  High-level overview of connected services for FLEDGE.
description: >
  High-level overview of connected services for FLEDGE.
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

<style type="text/css">
	.type figcaption {text-align:left;}
</style>

FLEDGE is a [Privacy Sandbox](/docs/privacy-sandbox/overview) proposal to serve
[remarketing](/docs/privacy-sandbox/glossary/#remarketing) and custom audience
use cases, designed so third parties cannot track user browsing behavior across
sites.

The API enables on-device auctions by the browser, to choose relevant ads from
websites the user has previously visited.

If you're new to FLEDGE or the Privacy Sandbox, make sure to read the
[FLEDGE overview](/docs/privacy-sandbox/fledge).
This will help you understand the key concepts critical to the API's purpose
and usage. If you come across unfamiliar terms, refer to the
[Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

## Who is this article for?

You should read this article if:

*  You're an adtech or advertiser's **decision-maker**. You may work
   in operations, DevOps, data science, IT, marketing, or another role where
   you make technical implementation decisions. You're wondering how the
   proposals for FLEDGE work together to perform on-device auction.
*  You're a **practitioner** (such as a developer, system operator,
   system architect, or data scientist) who will be setting up experiments with
   this API.

{% Aside %}
Right now, publishers don't have to take any action with this API. If this changes, this article will be updated accordingly.
{% endAside %}

In this article, you'll read a high-level, end-to-end explanation of how the
services work for the FLEDGE API. If you're a technical
practitioner, you can
[experiment with this API](/docs/privacy-sandbox/fledge-experiment/)
locally or in production with the
[unified Privacy Sandbox Relevance and Measurement Origin Trial](/blog/privacy-sandbox-unified-origin-trial/).

## How does FLEDGE work? {: #how}

FLEDGE consists of many services. The on-device bidding and auction requires
client-side configuration, there are server-side deployments for
additional support (such as the Key/Value service).

There are always two components which work together to
support FLEDGE auctions

* **Interest-based auctions in the browser**. Historically, publishers have been able to sell ad space to buyers by either running their own auctions or relying on a third-party provider to perform bidding and auction logic. Both rely on user data collected from third-party cookies. FLEDGE uses interest groups to help sites to display ads that are relevant to their users, directly in the browser.
* **Real-time data**. The seller and buyer rely on separate real-time services which help them make decisions. For example, the buyer can learn how much money is left in an ad campaign's spend--this information is not made available to the sellers.


## What's next?

We want to engage in conversations with you to ensure we build an API that
works for everyone.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and
[discussed publicly](/docs/privacy-sandbox/fledge/#engage).

### Experiment with the API

You can [experiment and participate](/docs/privacy-sandbox/fledge-experiment/)
in conversation about the FLEDGE API.
