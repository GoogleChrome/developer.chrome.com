---
layout: 'layouts/blog-post.njk'
title: "Private Network Access update: Announce extension of the Deprecation Trial"
authors:
  - lyf
description: Chrome is deprecating access to private network endpoints from non-secure public websites as part of the Private Network Access specification. A deprecation trial is available until Chrome 113.
date: 2023-02-02
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/dwtN0NkxkBmIz1EyhzAm.jpg'
alt: 'Photo by Sara Cohen on Unsplash'
tags:
  - chrome-113
  - security
---

Feedback from websites currently participating in the [Private Network Access from non-secure contexts deprecation trial](/origintrials/#/view_trial/4081387162304512001) has emphasized the difficulty in migrating affected websites to HTTPS. As a result, the trial is extended until Chrome 113 inclusive. Chrome 114, the first milestone without support for the trial, will roll out to Beta in early May 2023 and Stable in the end of May 2023.

A permission prompt will be built to allow mix-content requests from HTTPs public websites to plaintext private devices. For more information, please check the [feature explainer](https://github.com/WICG/local-network-access/blob/main/permission_prompt/explainer.md) for an overview and the [developer walks through document](https://docs.google.com/document/d/1W70cFFaBGWd0EeOOMxJh9zkmxZ903vKUaGjyF-w7HcY/edit#heading=h.qof2sn5s8r89) to see developers' possible approaches need to achieve. We will put out a blog post with more details in the future once it is ready.

For further information, please see [Private Network Access update: Introducing a deprecation trial](/blog/private-network-access-update/).

If you host a website within a private network that expects requests from
public networks, we are interested in your feedback and use cases.
Let us know by filing an issue with Chromium at [crbug.com](crbug.com) and set
the component to `Blink>SecurityFeature>CORS>PrivateNetworkAccess` or open an issue
in the [Private Network Access WICG specification Github repository](https://github.com/WICG/local-network-access/issues).

Thank you for helping us make the web safer!


