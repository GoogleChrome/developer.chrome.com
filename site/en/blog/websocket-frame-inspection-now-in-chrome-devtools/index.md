---
layout: 'layouts/blog-post.njk'
title: Websocket Frame Inspection now in Chrome DevTools
description: >
  Adding inspection ability into the data going over the wire in WebSockets
authors:
  - paulirish
date: 2012-05-07
updated: 2019-02-09

---

While before we could see sockets being established, we haven't had inspection ability into the data going over the wire in WebSockets. Thanks to a [WebKit patch](https://trac.webkit.org/changeset/115427/webkit) from RIM, we can now see the frame data, along with small unicode arrows indicating which direction the data is going.

Open up your [Chrome Canary](https://www.google.com/intl/en/chrome/canary/) or a [fresh Chromium build](https://download-chromium.appspot.com/) for the latest changes here.

