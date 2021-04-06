---
layout: 'layouts/blog-post.njk'
title: Improving Progressive Web App offline support detection
description: >
  Verification of offline support has been part of the PWA installability
  criteria since the beginning. Starting in Chrome 89, we will start to close
  a key loophole that allowed developers to pass the check, without an offline
  experience.
date: 2021-02-08
hero: image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/4dPIp42oCe3Vq3OPMIuQ.png
alt: Screenshot of Chrome dino game.
authors:
  - pjmclachlan
tags:
  - chrome-89
  - chrome-92
  - progressive-web-apps
---

{% Aside %}
**TL;DR:** Offline support has been part of the PWA installability criteria
since the beginning. We are updating the offline detection logic to ensure a
PWA actually provides an offline experience, closing the loophole used by
some developers to meet the installability criteria. In the future,
sites with empty `fetch` event handlers will no longer meet the criteria.
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

## Current offline detection logic

Verification of offline support has been part of PWA installability
criteria for several years; however, Chrome's check was a simplified
heuristic.

Previously, the installability check passed if the page had a service worker
that included a `fetch` event handler.  Chrome did not have the
ability to simulate requests through the service worker, so a full check of
correct offline behaviour was not possible.

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/qrDoFGCM2s8pBvM4n7Dv.png", alt="Diagram of service worker", width="800", height="385" %}

That meant that Chrome did not have the ability to validate whether the `fetch`
event handler returned a valid resource with HTTP 200 during the offline check.
Chrome only checked whether the service worker actually had a `fetch` handler.

Starting in Chrome 89, Chrome has the ability to run simulated offline requests
through the service worker, allowing improved offline detection logic
to better reflect actual offline support of the application.

## Updated offline detection logic

The updated offline detection logic checks:

* That there is a service worker installed for the page.
* That the installed service worker has a `fetch` event.
* **That the installed service worker `fetch` event returns an HTTP 200
   status code (indicating a successful fetch) in simulated offline mode.**

This change **does not** affect PWAs that have already been installed. The
criteria are only checked before a PWA is installed.

## What does this mean for developers?

A properly implemented offline mode requires that the `fetch` handler return
a resource with HTTP 200, so, if you've correctly implemented an offline mode
for your Progressive Web App, this change to offline detection requires no
action by you.

On the other hand, if you only defined a `fetch` handler stub, or if your
offline mode isn't working properly and a resource is not returned with an
HTTP 200 response code, you will need to update your PWA to meet the updated
installability criteria.

It's up to you to decide what kind of offline experience you want to provide.
On one end of the spectrum is a fully functional offline experience. This means
pre-caching all the resources and data needed, and syncing data with your
server when the user is online again. Caching resources will also help improve
[core web vital metrics][cwv] because it eliminates the need to download
resources from the network every time. At the other end of the spectrum is a
[custom offline fallback page][offline-fallback].

{% Aside %}
Check out [Workbox][workbox], a set of libraries that can power a
production-ready service worker for your Progressive Web App.

**Have a question about service workers?** Ask it on [Stack Overflow][so] and
tag it with [`service-worker`][so-sw] and [`progressive-web-apps`][so-pwa].
Our team regularly monitors those tags and does our best to help.
{% endAside %}

## When will this change take effect?

For most PWA developers, specifically those who correctly implemented offline
mode, this change will not impact your applications.  However, we want to give
adequate time to address this issue for developers with apps that have broken
offline modes.

### Warning starting Chrome 89 (March 2021)

Starting in Chrome 89 (stable in March 2021), if the PWA does not provide a
valid response when offline, a message will be displayed under the *Issues*
tab of developer tools. The `beforeinstallprompt` event, and in-browser
installation prompts will still be provided.

Lighthouse v7 and later will also indicate when there's a problem with the
offline implementation and provide guidance on how to fix it.

<figure>
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/qQHA9CJQrYX6w9FY9P6T.png", alt="Screen shot of DevTools showing warning message in Console.", width="800", height="100" %}
  <figcaption>
    Warning message in the Chrome DevTools Console.
  </figcaption>
</figure>

<figure>
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/On0AEdm2u9EZUuI3NIVv.png", alt="Screenshot of DevTools showing warning message in Application tab.", width="800", height="170" %}
  <figcaption>
    Warning message in Application tab &gt; Manifest &gt; Installability.
  </figcaption>
</figure>

### Enforcement starting Chrome 93 (August 2021)

Starting in Chrome 93 (stable in August 2021), the updated install criteria
will be enforced. If the PWA does not provide a valid response when offline,
it will no longer pass the installability check, the `beforeinstallprompt`
event will not be triggered, and the in-browser install prompts will not be
shown.

{% Aside %}
**Do you think this is a good change?** Take a moment to
[let us know your thoughts](https://goo.gle/pwa-offline-feedback), how it
will affect you, and what changes you'll make to your site because of it.
Your feedback will help us understand and mitigate any concerns you have.
{% endAside %}

[pwa-criteria]: https://web.dev/install-criteria/
[cwv]: https://web.dev/vitals/
[offline-fallback]: https://web.dev/offline-fallback-page/
[so]: https://stackoverflow.com/
[workbox]: https://developers.google.com/web/tools/workbox
[so-pwa]: https://stackoverflow.com/questions/tagged/progressive-web-apps
[so-sw]: https://stackoverflow.com/questions/tagged/service-worker
