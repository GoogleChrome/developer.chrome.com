---
layout: 'layouts/blog-post.njk'
title: "Private Network Access update: Announce extension of the Deprecation Trial"
authors:
  - lyf
description: Chrome is deprecating access to private network endpoints from non-secure public websites as part of the Private Network Access specification and is currently in a stage of deprecation trial until Chrome 113 at the moment.
date: 2023-02-02
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/dwtN0NkxkBmIz1EyhzAm.jpg'
alt: 'Photo by Sara Cohen on Unsplash'
tags:
  - chrome-113
  - security
---

Due to massive deprecation trial feedbacks mentioning the difficulty of deprecating HTTP
private webpages and migrating those with TSL certification, we are now announcing an extension of the trial period until Chrome 113. Chrome 113 will roll out to Beta in April 2023 and Stable in May 2023.

For further information, please follow [Private Network Access update: Introducing a deprecation trial](/blog/private-network-access-update/).

If you are hosting a website within a private network that expects requests from
public networks, we are interested in your feedback and use cases.
Let us know by filing an issue with Chromium at [crbug.com](crbug.com) and set
the component to `Blink>SecurityFeature>CORS>PrivateNetworkAccess` or open an issue
under [Private Network Access WICG specification Github repository](https://github.com/WICG/local-network-access/issues).

Thank you for all the effort you put with us to make the web safer!


