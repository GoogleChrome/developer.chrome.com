---
layout: 'layouts/doc-post.njk'
title: 'Privacy Sandbox demos'
subhead: >
  Demos and colabs walk you through the Privacy Sandbox APIs.
description: >
  Demos and colabs walk you through the Privacy Sandbox APIs.
date: 2023-05-29
authors:
  - alexandrawhite
---

There are a number of demos available for the Privacy Sandbox APIs. Most of them will require you to be familiar with the APIs, so if you haven't read the docs, check out the links we've listed along with the demos.

<p>

</p>

## Demos and colabs

{% Details %}
{% DetailsSummary %}
### Protected Audience API
{% endDetailsSummary %}

{% Columns %}
{% Column %}
The demo uses the Protected Audience API to join ad interest groups on two advertiser sites,
and then initiates an on-device auction to select an ad for display on a publisher site.

[Demo](https://protected-audience-demo.web.app/)

[Docs](/docs/privacy-sandbox/fledge-api/)

{% endColumn %}
{% Column %}

<a href="https://protected-audience-demo.web.app/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/Tejkps8XvgWoobfGLMVO.png", alt="Protected Audience API demo.", width="484", height="418" %}</a>

{% endColumn %}
{% endColumns %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Topics API
{% endDetailsSummary %}

#### Demo

{% Columns %}
{% Column %}
The Topics API allows a browser to share information about a user's interests with third parties without the use of third-party cookies. It enables interest-based advertising (IBA) without tracking the sites a user visits. This demo shows an example of the API in action.

[Demo](https://topics-demo.glitch.me/)

[Walkthrough video](https://www.youtube.com/watch?v=hEBzWuXjeTQ)

[Docs](/docs/privacy-sandbox/topics/overview/)

{% endColumn %}
{% Column %}

<a href="https://topics-demo.glitch.me/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/3YDJBguZVeVorWT4BdkA.png", alt="The Topics API demo.", width="469", height="386" %}</a>

{% endColumn %}
{% endColumns %}

#### Colab

{% Columns %}
{% Column %}
This colab makes it easy to load the TensorFlow Lite model used by Chrome to infer topics from hostnames.

[Colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn)

[Colab doc](/docs/privacy-sandbox/topics/colab/)

[Walkthrough video](https://www.youtube.com/watch?v=hEBzWuXjeTQ)

{% endColumn %}
{% Column %}

<a href="https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/Au0wqVDHINuCmWxN0lOR.png", alt="Topics API colab.", width="503", height="269" %}</a>

{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Attribution Reporting
{% endDetailsSummary %}

#### Demo

{% Columns %}
{% Column %}
The Attribution Reporting API enables advertisers and ad tech providers to measure conversions for ad clicks and views, 
ads in a third-party iframe, and ads in a first-party context. In this demo an advertiser uses an ad tech provider to run their ads on a publisher site.

[Demo](https://arapi-home.web.app/)

[Docs](/docs/privacy-sandbox/attribution-reporting-experiment/)

[Summary reports walkthrough video](https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/view)

{% endColumn %}
{% Column %}

<a href="https://arapi-home.web.app/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/cQABHch0L68I92idOgcN.png", alt="Attribution Reporting API demo.", width="707", height="512" %}</a>

{% endColumn %}
{% endColumns %}


#### Noiselab

{% Columns %}
{% Column %}
When aggregatable reports are batched by a collector and processed by the aggregation service, random data is added to the resulting summary reports in order to protect user privacy. Use Noiselab to experiment with different values to see the impact of noise.

[Noise Lab](https://noise-lab.uc.r.appspot.com/?mode=simple)

[Docs](/docs/privacy-sandbox/attribution-reporting/system-overview/)


{% endColumn %}
{% Column %}

<a href="https://noise-lab.uc.r.appspot.com/?mode=simple">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/9pln3PilOb2Hh5zrLdhz.png", alt="Noise Lab.", width="686", height="448" %}</a>

{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Shared Storage
{% endDetailsSummary %}

{% Columns %}
{% Column %}
The Shared Storage API provides storage that can be used cross-site, meaning you store a value at one domain, then read the value from another domain. You can set data freely, but are restricted in how you get data out of storage. This demo illustrates how it works.

[Demo](https://shared-storage-demo.web.app/)

[Docs](/docs/privacy-sandbox/attribution-reporting/shared-storage/)

{% endColumn %}
{% Column %}

<a href="https://shared-storage-demo.web.app/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/dOFtwOaI8ldFfwgmG5El.png", alt="Shared Storage API 
 demo.", width="751", height="521" %}</a>

{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### First-party Sets
{% endDetailsSummary %}
{% Columns %}
{% Column %}
First-Party Sets (FPS) is a way for a company to declare relationships among sites, so that browsers allow limited third-party cookie access for specific purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

[Demo](https://first-party-sets.glitch.me/)

[Docs](/docs/privacy-sandbox/first-party-sets/)

{% endColumn %}
{% Column %}
<a href="https://first-party-sets.glitch.me/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/xQbEZnwQ7Fjw8MOYuddS.png", alt="First-Party Sets demo.", width="600", height="400" %}</a>
{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### FedCM
{% endDetailsSummary %}
{% Columns %}
{% Column %}
FedCM is a privacy-preserving approach to federated identity services where users can log into sites without sharing their personal information with the identity service or the site. This demo illustrates how it works.

[Demo](https://fedcm-rp-demo.glitch.me)

[Docs](/docs/privacy-sandbox/fedcm/)

{% endColumn %}
{% Column %}
<a href="https://fedcm-rp-demo.glitch.me">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/r9RNu995n1Toyp9ysI5d.png", alt="FedCM demo.", width="514", height="380" %}</a>
{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Permissions Policy
{% endDetailsSummary %}
{% Columns %}
{% Column %}
Permissions Policy allows the developer to control the browser features available to a page, its iframes, and subresources, by declaring a set of policies for the browser to enforce. This demo lets you try out the available policies.

[Demo](https://permissions-policy-demo.glitch.me/demo/)

[Docs](/docs/privacy-sandbox/permissions-policy/)

{% endColumn %}
{% Column %}
<a href="https://permissions-policy-demo.glitch.me/demo/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/qaZFVmYVbQmEGhl004VT.png", alt="Permissions Policy demo.", width="676", height="458" %}</a>
{% endColumn %}
{% endColumns %}

{% endDetails %}


{% Details %}
{% DetailsSummary %}
### User Agent Reduction
{% endDetailsSummary %}
{% Columns %}
{% Column %}
User-Agent reduction minimizes the identifying information shared in the User-Agent string, which may be used for passive fingerprinting. Resource requests have a reduced User-Agent header now and the return values from certain Navigator interfaces are reduced. This demo lets you experiment with the new UA string values.

[Demo](https://uar-ot.glitch.me/)

[Docs](/docs/privacy-sandbox/user-agent/)

{% endColumn %}
{% Column %}
<a href="https://uar-ot.glitch.me/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/S5ALrfmMdD2xDkIpsnS0.png", alt="User Agent Reduction demo.", width="800", height="627" %}</a>
{% endColumn %}
{% endColumns %}
{% Columns %}
{% Column %}
JavaScript reduced user-agent

[Demo](https://reduced-ua.glitch.me/javascript.html)

[Docs](/docs/privacy-sandbox/user-agent/)
{% endColumn %}
{% Column %}
<a href="https://reduced-ua.glitch.me/javascript.html">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/rQpRviM9Xv2tYAxDg0Bc.png", alt="JavaScript reduced user-agent demo.", width="694", height="396" %}</a>
{% endColumn %}
{% endColumns %}
{% Columns %}
{% Column %}
Server-side reduced user-agent

[Demo](https://reduced-ua.glitch.me/server-side)

[Docs](/docs/privacy-sandbox/user-agent/)
{% endColumn %}
{% Column %}
<a href="https://reduced-ua.glitch.me/server-side">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/pon9P8soEiUNb4gTfluf.png", alt="Server-side reduced user-agent demo.", width="592", height="544" %}</a>
{% endColumn %}
{% endColumns %}
{% endDetails %}

<!--
{% Details %}
{% DetailsSummary %}
### CHIPS
{% endDetailsSummary %}
https://developer.chrome.com/en/docs/privacy-sandbox/chips/

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/BHTwEZIn1orxMaPl6zjn.png", alt="ALT_TEXT_HERE", width="437", height="258" %}

{% endDetails %}
-->
{% Details %}
{% DetailsSummary %}
### Private State Token API
{% endDetailsSummary %}
{% Columns %}
{% Column %}
With the Private State Token API, a website can issue cryptographic tokens to a user it trusts, which can later be used elsewhere. The tokens are stored securely by the user's browser, and can then be redeemed in other contexts to confirm the user's authenticity. Check out the API in this demo.

[Demo](https://private-state-token-demo.glitch.me/)

[Docs](/docs/privacy-sandbox/trust-tokens/)
{% endColumn %}

{% Column %}
<a href="https://private-state-token-demo.glitch.me/">{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/OVudOoLOz1BKNEmfY1pc.png", alt="Private State Token API demo.", width="620", height="519" %}</a>
{% endColumn %}
{% endColumns %}
{% endDetails %}
