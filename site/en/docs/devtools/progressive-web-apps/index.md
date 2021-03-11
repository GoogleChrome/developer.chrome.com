---
layout: "layouts/doc-post.njk"
title: "Debug Progressive Web Apps"
authors:
  - kaycebasques
date: 2016-07-25
#updated: YYYY-MM-DD
description:
  "Use the Application panel to inspect, modify, and debug web app manifests, service workers, and
  service worker caches."
---

Use the **Application** panel to inspect, modify, and debug web app manifests, service workers, and
service worker caches.

Related Guides:

- [Progressive Web Apps][1]

This guide only discusses the Progressive Web App features of the **Application** panel. If you're
looking for help on the other panes, check out the last section of this guide, [Other Application
panel guides][2].

## Summary {: #summary }

- Use the **Manifest** pane to inspect your web app manifest and trigger Add to Homescreen events.
- Use the **Service Workers** pane for a whole range of service-worker-related tasks, like
  unregistering or updating a service, emulating push events, going offline, or stopping a service
  worker.
- View your service worker cache from the **Cache Storage** pane.
- Unregister a service worker and clear all storage and caches with a single button click from the
  **Clear storage** pane.

## Web app manifest {: #manifest }

If you want your users to be able to add your app to their mobile homescreens, you need a web app
manifest. The manifest defines how the app appears on the homescreen, where to direct the user when
launching from homescreen, and what the app looks like on launch.

Related Guides:

- [Improve user experiences with a Web App Manifest][3]
- [Using App Install Banners][4]

Once you've got your manifest set up, you can use the **Manifest** pane of the **Application** panel
to inspect it.

{% Img src="image/admin/lcj1XOPDeY6HMzWOE12x.png", alt="manifest pane", width="602", height="541" %}

- To look at the manifest source, click the link below **App Manifest** label
  (`https://airhorner.com/manifest.json` in the screenshot above).
- Press the **Add to homescreen** button to simulate an Add to Homescreen event. Check out the next
  section for more information.
- The **Identity** and **Presentation** sections just display fields from the manifest source in a
  more user-friendly display.
- The **Icons** section displays every icon that you've specified.

### Simulate Add to Homescreen events {: #add-to-homescreen }

A web app can only be added to a homescreen when the site is visited at least twice, with at least
five minutes between visits. While developing or debugging your Add to Homescreen workflow, this
criteria can be inconvenient. The **Add to homescreen** button on the **App Manifest** pane lets you
simulate Add to Homescreen events whenever you want.

You can test out this feature with the [Google I/O 2016 progressive web app][5], which has proper
support for Add to Homescreen. Clicking on **Add to Homescreen** while the app is open prompts
Chrome to display the "add this site to your shelf" banner, which is the desktop equivalent of the
"add to homescreen" banner for mobile devices.

{% Img src="image/admin/dcHC145P0QVJTCapLWFd.png", alt="add to desktop shelf", width="800", height="611" %}

**Tip**: Keep the **Console** drawer open while simulating Add to Homescreen events. The Console
tells you if your manifest has any issues and logs other information about the Add to Homescreen
lifecycle.

The **Add to Homescreen** feature cannot yet simulate the workflow for mobile devices. Notice how
the "add to shelf" prompt was triggered in the screenshot above, even though DevTools is in Device
Mode. However, if you can successfully add your app to your desktop shelf, then it'll work for
mobile, too.

If you want to test out the genuine mobile experience, you can connect a real mobile device to
DevTools via \[remote debugging\][remote debugging][6], and then click the **Add to Homescreen**
button (on DevTools) to trigger the "add to homescreen" prompt on the connected mobile device.

## Service workers {: #service-workers }

Service workers are a fundamental technology in the future web platform. They are scripts that the
browser runs in the background, separate from a web page. These scripts enable you to access
features that don't need a web page or user interaction, like push notifications, background sync,
and offline experiences.

Related Guides:

- [Intro to Service Workers][7]
- [Push Notifications: Timely, Relevant, and Precise][8]

The **Service Workers** pane in the **Application** panel is the main place in DevTools to inspect
and debug service workers.

{% Img src="image/admin/6DPB4hljonLW1hVhaka5.png", alt="service worker pane", width="718", height="415" %}

- If a service worker is installed to the currently open page, then you'll see it listed on this
  pane. For example, in the screenshot above there's a service worker installed for the scope of
  `https://events.google.com/io2016/`.
- The **Offline** checkbox puts DevTools into offline mode. This is equivalent to the offline mode
  available from the **Network** panel, or the `Go offline` option in the [Command Menu][9].
- The **Update on reload** checkbox forces the service worker to update on every page load.
- The **Bypass for network** checkbox bypasses the service worker and forces the browser to go to
  the network for requested resources.
- The **Update** button performs a one-time update of the specified service worker.
- The **Push** button emulates a push notification without a payload (also known as a [tickle][10]).
- The **Sync** button emulates a background sync event.
- The **Unregister** button unregisters the specified service worker. Check out [Clear storage][11]
  for a way to unregister a service worker and wipe storage and caches with a single button click.
- The **Source** line tells you when the currently running service worker was installed. The link is
  the name of the service worker's source file. Clicking on the link sends you to the service
  worker's source.
- The **Status** line tells you the status of the service worker. The number on this line (`#1` in
  the screenshot above) indicates how many times the service worker has been updated. If you enable
  the **update on reload** checkbox you'll notice that the number increments on every page load.
  Next to the status you'll see a **start** button (if the service worker is stopped) or a **stop**
  button (if the service worker is running). Service workers are designed to be stopped and started
  by the browser at any time. Explicitly stopping your service worker using the **stop** button can
  simulate that. Stopping your service worker is a great way to test how your code behaves when the
  service worker starts back up again. It frequently reveals bugs due to faulty assumptions about
  persistent global state.
- The **Clients** line tells you the origin that the service worker is scoped to. The **focus**
  button is mostly useful when you've enabled the **show all** checkbox. When that checkbox is
  enabled, all registered service workers are listed. If you click on the **focus** button next to a
  service worker that is running in a different tab, Chrome focuses on that tab.

If the service worker causes any errors, a new label called **Errors** shows up.

{% Img src="image/admin/EhulxkNH9EIAwVbQX6Xd.png", alt="service worker with errors", width="508", height="296" %}

## Service worker caches {: #caches }

The **Cache Storage** pane provides a read-only list of resources that have been cached using the
(service worker) [Cache API][12].

{% Img src="image/admin/KLqhHBwpNPFGTiv1kUTR.png", alt="service worker cache pane", width="800", height="421" %}

Note that the first time you open a cache and add a resource to it, DevTools might not detect the
change. Reload the page and you should see the cache.

If you've got two or more caches open, you'll see them listed below the **Cache Storage** dropdown.

{% Img src="image/admin/mK84c0i8pMq3hPTXCNpv.png", alt="multiple service worker caches", width="800", height="206" %}

## Quota usage {: #opaque-responses }

Some responses within the Cache Storage pane may be flagged as being "[opaque][13]". This refers to
a response retrieved from a different origin, like from a [CDN][14] or remote API, when [CORS][15]
is not enabled.

In order to avoid leakage of cross-domain information, there's significant padding added to the size
of an opaque response used for calculating storage quota limits (i.e. whether a `QuotaExceeded`
exception is thrown) and reported by the [`navigator.storage` API][16].

The details of this padding vary from browser to browser, but for Google Chrome, this means that the
_minimum_ size that any single cached opaque response contributes to the overall storage usage is
[approximately 7 megabytes][17]. You should keep this in mind when determining how many opaque
responses you want to cache, since you could easily exceeded storage quota limitations much sooner
than you'd otherwise expect based on the actual size of the opaque resources.

Related Guides:

- [Stack Overflow: What limitations apply to opaque responses?][18]
- [Workbox: Understanding Storage Quota][19]

## Clear storage {: #clear-storage }

The **Clear Storage** pane is a very useful feature when developing progressive web apps. This pane
lets you unregister service workers and clear all caches and storage with a single button click.
Check out the section below to learn more.

Related Guides:

- [Clear Storage][20]

## Other Application panel guides {: #other }

Check out the guides below for more help on the other panes of the **Application** panel.

Related Guides:

- [Inspect page resources][21]
- [Inspect and manage local storage and caches][22]

[1]: https://web.dev/progressive-web-apps
[2]: #other
[3]: https://developers.google.com/web/fundamentals/web-app-manifest
[4]: https://developers.google.com/web/fundamentals/app-install-banners
[5]: https://events.google.com/io2016/
[6]: /docs/devtools/remote-debugging/
[7]: https://developers.google.com/web/fundamentals/primers/service-worker
[8]: https://developers.google.com/web/fundamentals/push-notifications
[9]: /docs/devtools/command-menu/
[10]: https://developers.google.com/web/fundamentals/push-notifications/how-push-works
[11]: #clear-storage
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[13]: https://developers.google.com/web/fundamentals/glossary#opaque-response
[14]: https://developers.google.com/web/fundamentals/glossary#CDN
[15]: https://fetch.spec.whatwg.org/#http-cors-protocol
[16]: https://developers.google.com/web/updates/2017/08/estimating-available-storage-space
[17]: https://bugs.chromium.org/p/chromium/issues/detail?id=796060#c17
[18]: https://stackoverflow.com/q/39109789/385997
[19]: https://developers.google.com/web/tools/workbox/guides/storage-quota#beware_of_opaque_responses
[20]: /docs/devtools/storage/localstorage/#clear
[21]: /docs/devtools/resources/
[22]: /docs/devtools/storage/localstorage/
