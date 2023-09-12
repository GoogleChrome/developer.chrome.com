---
layout: 'layouts/blog-post.njk'
title: 'A new home for the Project Fugu API Showcase'
subhead: >
  The Project Fugu API Showcase is a collection of apps that make use of APIs that are part  of Project Fugu.
date: 2023-03-06
# updated: 2023-03-06
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
authors:
  - thomassteiner
tags:
  - capabilities
---

The cross-company Capabilities Project (code name [Project Fugu](/capabilities/)) at Google has the objective of making it possible for web apps to do anything platform-specific apps can. Apart from Google, project partners include Microsoft, Intel, Samsung, and others. The project enables amazing web applications like [Photoshop](https://web.dev/ps-on-the-web/) by exposing the capabilities of the underlying operating systems to the web platform, while maintaining user security, privacy, trust, and other core tenets of the web.

But what are examples of apps that make use of these capabilities? Our answer to this question is the [Project Fugu API Showcase](/fugu-showcase/). It is sourced by community submissions, and contains a filterable list of apps that make use of one or more of the Fugu APIs.

{% Aside %}
Propose missing apps to the showcase by submitting them via an [anonymous form](https://docs.google.com/forms/d/e/1FAIpQLScNd1rClbmFWh6FcMmjUNrwg9RLz8Jk4BkHz_-EOpmkVd_-9g/viewform). Submissions are reviewed regularly and the showcase will be updated accordingly.
{% endAside %}


After living in an embedded iframe that didn't really allow the showcase to fully shine, we have now worked on migrating it to a new home, and have polished its look and feel a fair bit, too. Find the Project Fugu API Showcase at its new location [developer.chrome.com/fugu-showcase](/fugu-showcase/)!

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/c7is7cp31DfaKl3mPt2q.png", alt="The Project Fugu API Showcase.", width="800", height="749" %}

Launch each app by clicking its name, screenshot, or the **Launch app** link. For many apps, you can also see the source code by clicking **View source**. On browsers that support the [Web Share API](https://developer.mozilla.org/docs/Web/API/Web_Share_API), click **Share app** to do exactly that. As a special inception Easter egg, the [Project Fugu API Showcase is of course contained in the Project Fugu API Showcase](/fugu-showcase/#developer.chrome.com!fugu-showcase).

{% Aside %}
Be sure to subscribe to the [RSS feed](/feeds/fugu-showcase.xml) so you never miss a new Fugu app.
{% endAside %}
