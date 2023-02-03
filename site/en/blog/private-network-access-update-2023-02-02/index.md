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

Feedback from websites currently participating in the [Private Network Access from non-secure contexts deprecation trial](https://developer.chrome.com/origintrials/#/view_trial/4081387162304512001) has emphasized the difficulty in migrating affected websites to HTTPS. As a result, the trial is extended until Chrome 113 inclusive. Chrome 114, the first milestone without support for the trial, will roll out to Beta in early May 2023 and Stable in the end of May 2023.

For further information, please see [Private Network Access update: Introducing a deprecation trial](/blog/private-network-access-update/).

If you host a website within a private network that expects requests from
public networks, we are interested in your feedback and use cases.
Let us know by filing an issue with Chromium at [crbug.com](crbug.com) and set
the component to `Blink>SecurityFeature>CORS>PrivateNetworkAccess` or open an issue
in the [Private Network Access WICG specification Github repository](https://github.com/WICG/local-network-access/issues).

Thank you for helping us make the web safer!


