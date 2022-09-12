---
title: "DevTools architecture refresh: migrating to Web Components"
description: >
  Why and how we migrate Chrome DevTools to Web Components.
layout: "layouts/blog-post.njk"
authors:
  - jackfranklin
date: 2020-12-08
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/obi72DM6B0c8UeT45XEN.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
  - devtools-architecture
---

{% Partial 'devtools/banner.md' %}

This post is part of [a series of blog posts](/tags/devtools-architecture/) describing the changes we are making to DevTools' architecture and how it is built. 

When DevTools was first created many, many years ago the team chose to build a bespoke UI framework. This was a reasonable choice at the time and has served DevTools well.

But since then various features have landed in the platform and one of those, Web Components, is a great fit for building new UI elements in DevTools. By leaning on what the platform provides we can greatly reduce the amount of bespoke UI code we have to maintain and invest more in building features for DevTools, rather than supporting bespoke infrastructure.

To help with the transition, we created a guide to building UI elements in DevTools to share with the wider DevTools team. Some of the guide is bespoke to DevTools and its architecture, which brings its own set of constraints, but some of it are generic guidelines on the approaches we've used to build, structure and test Web Components. 

Today, we're making this document publicly available at [goo.gle/building-ui-devtools](https://goo.gle/building-ui-devtools
). If you've ever wondered more about how Web Components are used in large, real world applications, or some of the challenges that come with integrating components into a large, pre-existing codebase, this document could help and provide some answers. If you have any questions about our guidelines, feel free to [tweet me](https://www.twitter.com/Jack_Franklin).

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
