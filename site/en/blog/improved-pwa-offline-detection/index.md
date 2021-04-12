---
layout: 'layouts/blog-post.njk'
title: Improving Progressive Web App offline support detection
description: >
  Verification of offline support has been part of the PWA installability
  criteria since the beginning.
date: 2021-02-08
updated: 2021-04-14
hero: image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4dPIp42oCe3Vq3OPMIuQ.png
alt: Screenshot of Chrome dino game.
authors:
  - pjmclachlan
tags:
  - chrome-89
  - chrome-90
  - chrome-92
  - progressive-web-apps
---

{% Aside 'note' %}
**Updated April 14th, 2021:** We previously announced plans to update the
installability criteria to ensure a PWA actually provides an offline experience.
After listening to your feedback, and discovering a number of issues, **we have
decided to put those plans on hold**. We strongly believe providing a valid
page when the user is offline is critical to providing a good user experience.
{% endAside %}

[Progressive Web Apps (PWAs)](https://web.dev/pwa/) are a pattern for
building modern, installable applications using web technology for mobile and
desktop devices.

One of the criteria for building a modern web experience, and not
coincidentally PWAs, is that the app must continue to work even if the device
is offline.  That means no Chrome Dino screen if the user loses network
access on their device!

The goal of all PWA criteria is to help ensure users have a high
quality, app-competitive experience when browsing the web. Chrome performs
checks against [PWA criteria][pwa-criteria] before enabling the install
capability for a PWA.

Only apps that fulfill all core
[Progressive Web App installability criteria][pwa-criteria], including support
for an offline mode, can be installed to the device from Chrome.

## Previous offline detection logic

Verification of offline support has been part of PWA installability
criteria for several years. Until recently, Chrome did not have the
ability to simulate requests through the service worker, so a full check of
correct offline behaviour was not possible.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/qrDoFGCM2s8pBvM4n7Dv.png", alt="Diagram of service worker", width="800", height="385" %}

That meant that Chrome did not have the ability to validate whether the `fetch`
event handler returned a valid resource with HTTP 200 during the offline check.
Chrome only checked whether the service worker actually had a `fetch` handler.

## Updated offline detection logic

Chrome 89 added the ability to run simulated offline requests through the
service worker, allowing improved offline detection logic to better reflect
actual offline support of the application.

We had planned to use this new ability to ensure that PWAs provided a valid
page when offline, but have put those plans hold. The installability check
will continue to pass if the page has a service worker that includes a
`fetch` event handler.

## What does this mean for developers?

While **no changes are required now**, we strongly recommend you provide an
offline experience, as we expect to use the updated logic to check for a valid
page at some point in the future.

It's up to you to decide what kind of offline experience you want to provide.
On one end of the spectrum is a fully functional offline experience. This means
pre-caching all the resources and data needed, and syncing data with your
server when the user is online again. Caching resources will also help improve
[core web vital metrics][cwv] because it eliminates the need to download
resources from the network every time. At the other end of the spectrum is a
[custom offline fallback page][offline-fallback].

{% Aside %}
**Want something easy?** We've got all the code you need for a
[custom offline fallback page][offline-fallback] that you can literally copy
and paste directly into your app. And for more complex scenarios, check out
[Workbox][workbox], a set of libraries that can power a production-ready
service worker for your Progressive Web App.
{% endAside %}

The warning that is shown under the
*Issues* tab of developer tools will be removed around Chrome 90.

{% Aside %}
**Have a question about service workers?** Ask it on [Stack Overflow][so] and
tag it with [`service-worker`][so-sw] and [`progressive-web-apps`][so-pwa].
Our team regularly monitors those tags and does our best to help.
{% endAside %}

[pwa-criteria]: https://web.dev/install-criteria/
[cwv]: https://web.dev/vitals/
[offline-fallback]: https://web.dev/offline-fallback-page/
[so]: https://stackoverflow.com/
[workbox]: https://developers.google.com/web/tools/workbox
[so-pwa]: https://stackoverflow.com/questions/tagged/progressive-web-apps
[so-sw]: https://stackoverflow.com/questions/tagged/service-worker
