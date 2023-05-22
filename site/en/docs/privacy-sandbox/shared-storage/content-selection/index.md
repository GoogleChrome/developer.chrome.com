---
layout: 'layouts/doc-post.njk'
title: 'Content selection with Shared Storage'
subhead: >
  Select a URL based on data collected in Shared Storage render the
  content in a fenced frame.
description: >
  Select a URL based on data collected in Shared Storage render the
  content in a fenced frame.
date: 2023-04-14
authors:
  - alexandrawhite
---

With the [Shared Storage API](/docs/privacy-sandbox/shared-storage/), you can
select content to be rendered into a fenced frame using cross-site data. Use
JavaScript to read and write cross-site data, then select a URL from a provided
list based on your stored data. You can render that content in a
[fenced frame](/docs/privacy-sandbox/fenced-frame/).

Content selection can include any kind of content: ads, articles, images, HTML,
calls-to-action (such as buttons), and more.

For example, let's say you run a travel site and are running an ad campaign
with three different ad creatives. You want to sequence these creatives based
on the user's interactions (view or click).

<figure>
  {% Img
    src="image/VbsHyyQopiec0718rMq2kTE1hke2/IpZ9UTJTPctcnFzVY4yc.svg",  alt="Three ad creatives, which are shown to users based on their previous interaction.", width="443", height="128"
    %}
<figcaption>
  The first creative for a new viewer says, "Go on your next adventure." With just a view and no click, the user would see, "Explore weekend getaways." After viewing or clicking, the third creative encourages users to "Click to get your Hotel Discount." If the user clicks on the first ad, the next ad they would see is the thrid creative.
</figcaption>
</figure>

When a user first observes a winning ad space, you can store an ID and click status for that creative in Shared Storage. This means when you win an ad auction on other sites that this user visits, you can display a different ad based on that data.

<figure>
{% Img
  src="image/VbsHyyQopiec0718rMq2kTE1hke2/67pzl4bhK1kVVFZongSl.png",
  alt="Shared Storage walk-through with three ad creatives and user interaction.",
  width="800", height="354" %}
</figure>

Your JavaScript runs in a worklet to retrieve this information, but your code
cannot interact with or communicate outside of the iframe or fenced frame on
the parent page.

Let's take another example. Let's say you're interested in testing what article
would perform better in an embedded context. You can assign a user to an
experiment group when you see that user on your site, then store that group ID
in Shared Storage to be accessed in a cross-site context. On another site, your
fenced frame can select a URL based on that user's experiment group as stored
with Shared Storage.

Shared Storage allows you to make informed decisions based on cross-site data,
without sharing user information (such as browser history or other personal
details) with an embedding site or exfiltrating data to your own servers.

## Use cases

Content selection with Shared Storage supports the following use cases:

* **[Creative rotation](/docs/privacy-sandbox/shared-storage/creative-rotation/)**:
  You can store data, such as creative ID and user interaction, to determine
  which creative users' see across different sites.
  * One use case of creative rotation is
    [frequency](/docs/privacy-sandbox/shared-storage/creative-selection-by-frequency/).
    Browser view counts can be stored in Shared Storage and used to decide
    which creative is shown to a user.
* **[A/B testing](/docs/privacy-sandbox/shared-storage/ab-testing/)**: You can
  assign a user to an experiment group, then store that group ID with Shared
  Storage to be accessed cross-site.
* **[Custom user experiences](/docs/privacy-sandbox/shared-storage/known-customer/)**:
  You can share custom content and calls-to-action based on a user's
  registration status or other user states.

## Try content selection

Content selection with the Shared Storage API is available for testing in
Chrome Canary/Dev/Beta M105+.

To test, you must enable the **Privacy Sandbox Ads APIs experiment** flag at
`chrome://flags/#privacy-sandbox-ads-apis`.

<figure class="screenshot">
{% Img
	src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png",
	alt="Set Privacy Sandbox Ads APIs experiment to enabled to use these APIs",
	width="744", height="124"
%}
</figure>

### Experiment with the demo

A [demo is available](https://shared-storage-demo.web.app/), and you can review
the code on [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo).

This demo is constructed from the perspective of an advertiser, adtech, content
distributor or other third-party service that wants to store information across
different publishers' sites. In the demo, the same third-party code runs on
both Publisher A and Publisher B sites for each use case. Visit each
publisher's page to see how the data is shared in a cross-site context.

{% Partial 'privacy-sandbox/shared-storage-engage.md' %}
