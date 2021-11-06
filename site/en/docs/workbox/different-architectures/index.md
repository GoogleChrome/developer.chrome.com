---
layout: "layouts/doc-post.njk"
title: Different service worker strategies for different architectures
date: 2021-10-20
description: >
  Introduction to the two different website architectures.
---

When it comes to building for the web, there are a couple of architectural styles to be aware of.

For example, a "traditional" website&mdash;also referred to as a _Multi-page Application_ (MPA)&mdash;is a collection of pages that users navigate through via traditional [navigation requests](https://web.dev/handling-navigation-requests/). 
Static sites are a good example of this architectural style, 
even CMS-powered websites such as blog and marketing websites are examples of the style as well.

Then there's the "modern" _Single Page Application_ (SPA) style, 
where the only navigation request is the very first one. 
SPA architectures tend to serve minimal markup on the initial navigation request, 
which is populated by data provided by server-side APIs. 
This data is then presented in client-rendered markup provided by a client-side router for every subsequent navigation.

Whichever style you prefer, 
matching a given architecture with the right service worker implementation is key to ensuring high reliability and performance. 
The open-ended design of service workers&mdash;and Workbox by extension&mdash;provides a lot of flexibility in how requests for assets are handled, 
and the technology can be tailored for whatever architectural style you prefer.

To get things started, let's first cover what it takes to build a service worker 
[that works best with an SPA](/docs/workbox/app-shell-model).

