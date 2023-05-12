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

If you've used any of our demos before and can't quite remember where you found them, here's a list.

Most of them will need background information that's found in the documentation, so if 
you haven't read it or have questions, take a look at the docs for each API, listed with the demos below.

<p>

</p>

## Demos and colabs

{% Details %}
{% DetailsSummary %}
### Protected Audience API (FLEDGE)
{% endDetailsSummary %}

{% Columns %}
{% Column %}
This demo uses FLEDGE to join ad interest groups on two advertiser sites,
and then initiates an on-device auction to select an ad for display on a publisher site.

[Demo](https://fledge-demo.glitch.me/)

[Docs](/docs/privacy-sandbox/fledge-api/)

{% endColumn %}
{% Column %}

<a href="https://fledge-demo.glitch.me/"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/Tejkps8XvgWoobfGLMVO.png?auto=format&w=439"  alt="ALT_TEXT_HERE" width="230"></a>

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
This demo shows a simple example of the Topics API in action.

[Demo](https://topics-demo.glitch.me/)

[Walkthrough video](https://www.youtube.com/watch?v=hEBzWuXjeTQ)

[Docs](/docs/privacy-sandbox/topics/overview/)

{% endColumn %}
{% Column %}

<a href="https://topics-demo.glitch.me/"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/3YDJBguZVeVorWT4BdkA.png?auto=format&w=571"  alt="ALT_TEXT_HERE" width="230"></a>

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

<a href="https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/Au0wqVDHINuCmWxN0lOR.png?auto=format&w=439"  alt="ALT_TEXT_HERE" width="230"></a>

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
In this demo an advertiser uses an ad tech provider to run their ads on a publisher site.

[Demo](https://arapi-home.web.app/)

[Docs](/docs/privacy-sandbox/attribution-reporting-experiment/)

[Summary reports walkthrough video](https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/view)

{% endColumn %}
{% Column %}

<a href="https://arapi-home.web.app/"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/cQABHch0L68I92idOgcN.png?auto=format&w=571"  alt="ALT_TEXT_HERE" width="230"></a>

{% endColumn %}
{% endColumns %}


#### Noiselab

{% Columns %}
{% Column %}
In this demo an advertiser uses an ad tech provider to run their ads on a publisher site.

[Noise Lab](https://noise-lab.uc.r.appspot.com/?mode=simple)

[Docs](/docs/privacy-sandbox/attribution-reporting/system-overview/)


{% endColumn %}
{% Column %}

<a href="https://noise-lab.uc.r.appspot.com/?mode=simple"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/9pln3PilOb2Hh5zrLdhz.png?auto=format&w=571"  alt="ALT_TEXT_HERE" width="230"></a>

{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Shared Storage
{% endDetailsSummary %}

{% Columns %}
{% Column %}
Shared Storage API is a storage that can be used cross-site, meaning you store a value at a.com, then read a value from b.com at a later point in time. With Shared Storage, you can set data freely, but you are restricted in how you get that data out of the storage. This demo illustrates how it works.

[Demo](https://shared-storage-demo.web.app/")

[Docs](/docs/privacy-sandbox/attribution-reporting/shared-storage/)


{% endColumn %}
{% Column %}

<a href="https://shared-storage-demo.web.app/"><img src="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/dOFtwOaI8ldFfwgmG5El.png?auto=format&w=571"  alt="ALT_TEXT_HERE" width="230"></a>

{% endColumn %}
{% endColumns %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
### First-party Sets
{% endDetailsSummary %}


https://first-party-sets.glitch.me/ 

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/xQbEZnwQ7Fjw8MOYuddS.png", alt="ALT_TEXT_HERE", width="600", height="400" %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}
### FedCM
{% endDetailsSummary %}


https://fedcm-rp-demo.glitch.me 

{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/r9RNu995n1Toyp9ysI5d.png", alt="ALT_TEXT_HERE", width="514", height="380" %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Permissions Policy
{% endDetailsSummary %}



{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/qaZFVmYVbQmEGhl004VT.png", alt="ALT_TEXT_HERE", width="676", height="458" %}

https://permissions-policy-demo.glitch.me/demo/ 
{% endDetails %}


{% Details %}
{% DetailsSummary %}
### User Agent Reduction
{% endDetailsSummary %}


https://uar-ot.glitch.me/
{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/V2ej15YhrmcD63KZe9UA.png", alt="ALT_TEXT_HERE", width="608", height="462" %}

https://reduced-ua.glitch.me/javascript.html
{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/rQpRviM9Xv2tYAxDg0Bc.png", alt="ALT_TEXT_HERE", width="694", height="396" %}

https://reduced-ua.glitch.me/server-side
{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/pon9P8soEiUNb4gTfluf.png", alt="ALT_TEXT_HERE", width="592", height="544" %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}
### CHIPS
{% endDetailsSummary %}

https://www.chromium.org/updates/chips/ 
{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/BHTwEZIn1orxMaPl6zjn.png", alt="ALT_TEXT_HERE", width="437", height="258" %}

{% endDetails %}

<!--
 Trust Tokens

https://trust-token-demo.glitch.me/ 
-->