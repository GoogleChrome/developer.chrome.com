---
title: >
  DevTools Tips: Debugging PWA
description: >
  Debug Progressive Web Apps with DevTools.
layout: 'layouts/blog-post.njk'
date: 2023-01-30
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OEqDXbxeEqiGeZnKxr60.png'
alt: >
  DevTools Tips hero logo
tags:
  - devtools
  - devtools-tips
---

Progressive Web Apps (PWA) are web apps built and enhanced with modern APIs to deliver enhanced capabilities, reliability, and installability while reaching anyone, anywhere, on any device, all with a single codebase.

Watch the video to learn how to debug these apps with Chrome DevTools.

{% YouTube id='fGU39PukAlA' %}

With DevTools, you can:

- Inspect your app's manifest file that makes your app installable. For example:
  - Check icons for different platforms.
  - Catch errors.
  - Configure a richer installation UI with description and screenshots.
- Test service workers that act as proxies between your app and the network. For example:
  - Check worker registration.
  - Check worker versioning and activity.
  - Update worker version on reload.
  - Debug network connectivity by emulating offline mode or bypassing workers.
  - Test network messages.

To learn more, see:

- [Debug Progressive Web Apps](/docs/devtools/progressive-web-apps/)
- [Learn PWA](https://web.dev/learn/pwa/)
- [Unpacking the Workbox](https://www.youtube.com/playlist?list=PLNYkxOF6rcIC3BwCw--jvZNN7obH4QUlH) video series
- [The service worker lifecycle](https://web.dev/service-worker-lifecycle/)