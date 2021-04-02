---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 63)"
authors:
  - kaycebasques
date: 2017-11-28
#updated: YYYY-MM-DD
description:
  "Multi-client remote debugging, push notifications with custom data, and Workspaces 2.0."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xV71BolvPqA7eZZaWCsD.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-63
---

Welcome back! New features coming to DevTools in Chrome 63 include:

- [Multi-client remote debugging support][1].
- [Workspaces 2.0][2].
- [Four new audits][3].
- [Simulate push notifications with custom data][4].
- [Trigger background sync events with custom tags][5].

{% Aside %}

**Note:** You can check what version of Chrome you're running at `chrome://version`. Chrome
auto-updates to a new major version about every 6 weeks.

{% endAside %}

Read on or watch the video below to learn more!

{% YouTube id="Eyw\_mwbABIQ" %}

## Multi-client remote debugging support {: #multi-client }

If you've ever tried debugging an app from an IDE like VS Code or WebStorm, you've probably
discovered that opening DevTools messes up your debug session. This issue also made it impossible to
use DevTools to debug WebDriver tests.

As of Chrome 63, DevTools now supports multiple remote debugging clients by default, no
configuration needed.

Multi-client remote debugging was the [number 1 most-popular DevTools issue on crbug.com][6], and
number 3 across the entire Chromium project. Multi-client support also opens up quite a few
interesting opportunities for integrating other tools with DevTools, or using those tools in new
ways. For example:

- Protocol clients such as ChromeDriver or the Chrome debugging extensions for VS Code and Webstorm,
  and WebSocket clients such as Puppeteer, can now run at the same time as DevTools.
- Two separate WebSocket protocol clients, such as [Puppeteer][7] or [chrome-remote-interface][8],
  can now connect to the same tab simultaneously.
- Chrome Extensions using the `chrome.debugger` API can now run at the same time as DevTools.
- Multiple different Chrome Extensions can now use the `chrome.debugger` API on the same tab
  simultaneously.

## Workspaces 2.0 {: #workspaces }

Workspaces have been around for some time in DevTools. This feature enables you to use DevTools as
your IDE. You make some changes to your source code within DevTools, and the changes persist to the
local version of your project on your file system.

Workspaces 2.0 builds off of 1.0, adding a more helpful UX and improved auto-mapping of transpiled
code. This feature was originally scheduled to be released shortly after Chrome Developer Summit
(CDS) 2016, but the team postponed it to sort out some issues.

Check out the "Authoring" part (around 14:28) of the DevTools talk from CDS 2016 to see Workspaces
2.0 in action.

{% YouTube id="HF1luRD4Qmk" %}

## Four new audits {: #audits }

In Chrome 63 the **Audits** panel has 4 new audits:

- Serve images as WebP.
- Use images with appropriate aspect ratios.
- Avoid frontend JavaScript libraries with known security vulnerabilities.
- Browser errors logged to the Console.

See [Run Lighthouse in Chrome DevTools][9] to learn how to use the **Audits** panel to improve the
quality of your pages.

See [Lighthouse][10] to learn more about the project that powers the **Audits** panel.

## Simulate push notifications with custom data {: #push }

Simulating push notifications has been around for a while in DevTools, with one limitation: you
couldn't send custom data. But with the new **Push** text box coming to the **Service Worker** pane
in Chrome 63, now you can. Try it now:

1.  Go to [Simple Push Demo][11].
2.  Click **Enable Push Notifications**.
3.  Click **Allow** when Chrome prompts you to allow notifications.
4.  Open DevTools.
5.  Go to the **Service Workers** pane.
6.  Write something in the **Push** text box.

    {% Img src="image/admin/UQm1GplN9Vont3jI4wGb.png", alt="Simulating a push notification with custom data.", width="800", height="488" %}

    **Figure 1**. Simulating a push notification with custom data via the **Push** text box in the
    **Service Worker** pane

7.  Click **Push** to send the notification.

    {% Img src="image/admin/0WYH7Hl1TojntCXGQhpV.png", alt="The simulated push notification", width="789", height="188" %}

    **Figure 2**. The simulated push notification

## Trigger background sync events with custom tags {: #sync }

Triggering background sync events has also been in the **Service Workers** pane for some time, but
now you can send custom tags:

1.  Open DevTools.
2.  Go to the **Service Workers** pane.
3.  Enter some text in the **Sync** text box.
4.  Click **Sync**.

{% Img src="image/admin/JcCAO4fmPvVtkqZTqVgN.png", alt="Triggering a custom background sync event", width="800", height="553" %}

**Figure 3**. After clicking **Sync**, DevTools sends a background sync event with the custom tag
`update-content` to the service worker

[1]: #multi-client
[2]: #workspaces
[3]: #audits
[4]: #push
[5]: #sync
[6]: https://crbug.com/129539
[7]: https://github.com/GoogleChrome/puppeteer
[8]: https://github.com/cyrus-and/chrome-remote-interface
[9]: https://developers.google.com/web/tools/lighthouse#devtools
[10]: https://developers.google.com/web/tools/lighthouse
[11]: https://gauntface.github.io/simple-push-demo/
[12]: /blog/new-in-devtools-59#coverage
[13]: /blog/new-in-devtools-59#screenshots
[14]: /blog/new-in-devtools-59#block-requests
[15]: /blog/new-in-devtools-59#async
[16]: /blog/new-in-devtools-59#command-menu
