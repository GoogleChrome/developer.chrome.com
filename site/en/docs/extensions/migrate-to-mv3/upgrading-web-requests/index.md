---
layout: 'layouts/doc-post.njk'
title: "Migrating Web Requests"
date: 2019-11-02
updated: 2022-10-24
description: TBD
---

Blocking web requests in Manifest V2 could significantly degrade both the performance of extensions and the performance of pages they worked with. Code that used the [`Chrome.webRequest` interface](/docs/extensions/reference/webRequest) could implement up to nine potentially blocking events for each network request and each web page was potentially blocked by multiple extensions. 

To guard against performance problems, Manifest V3 replaces the blocking version of `Chrome.webRequest` with rules specified under `"declarative_net_request"`

Extensions that modify network requests will need to transition from the blocking version of the
[Web Request API](/docs/extensions/reference/webRequest) to the new [Declarative Net Request
API][api-declarativenetrequest]. This new API was designed to work well with the event-based
execution model of service workers and to maximize an extension's ability to block network requests
without requiring the extension to have permissions.