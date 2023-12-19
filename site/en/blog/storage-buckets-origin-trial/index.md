---
layout: 'layouts/blog-post.njk'
title: Storage Buckets origin trial available
description: >
  The Storage Standard defines an API for persistent storage and quota estimates, and the platform storage architecture. We're experimenting with an API for making persistent storage eviction under heavy memory pressure more predictable. Try the Storage Buckets API in an origin trial that runs from Chrome 115 to Chrome 118.
subhead: >
  Optimize persistent storage eviction under heavy memory pressure.
date: 2023-05-15
# updated: 2021-01-28
authors:
  - thomassteiner
tags:
  - capabilities
hero: 'image/8WbTDNrhLsU0El80frMBGE4eMCD3/uSUKNoGdlmEsXAtHr0yJ.jpg'
alt: >
  Several buckets with paint in different colors in them.
---

The [Storage Standard](https://storage.spec.whatwg.org/) defines an API for persistent storage and
quota estimates, and the platform storage architecture.
The experimental [Storage Buckets API](/blog/storage-buckets/) is our attempt to make persistent storage eviction under heavy memory pressure more predictable.

Try the Storage Buckets API by [participating in the Storage Buckets origin trial](/origintrials/#/view_trial/2674012278751232001). The origin trial runs from Chrome&nbsp;115 (stable date): {% ChromeDate 115 %} to Chrome&nbsp;118 (stable date): {% ChromeDate 118 %}. 
