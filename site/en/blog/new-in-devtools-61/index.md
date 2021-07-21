---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 61)"
authors:
  - kaycebasques
date: 2017-07-10
#updated: YYYY-MM-DD
description: "New features and changes coming to DevTools in Chrome 61."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pkmry1VcHxSk2Wx96Ee6.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-61
---

New features and major changes coming to DevTools in Chrome 61 include:

- [Mobile device throttling simulation][1]. Set CPU and network throttling simultaneously, to
  simulate mid-tier or low-end mobile devices.
- [Storage usage][2]. View how much storage an origin is using, broken down by technology
  (IndexedDB, cache, local, session, etc.).
- [Cache timestamps][3]. View when a service worker cached a response.
- [Enable the FPS Meter from the Command Menu][4].
- [Change mousewheel and trackpad behavior in the Performance panel][5].
- [Debug ES6 modules natively][6].

{% Aside %}

**Note:** You can check what version of Chrome you're running at `chrome://version`. Chrome
auto-updates to a new major version about every 6 weeks.

{% endAside %}

Check out the video version of these release notes below or read on to learn more.

{% YouTube id="Lscb4SL58X4" %}

## Simulate low-end and mid-tier mobile devices in Device Mode {: #throttling }

The Device Mode **Throttling** menu is now exposed by default, and it now lets you simulate a
low-end or mid-tier mobile device with a couple of clicks.

{% Img src="image/admin/oF5txSZp8l7oLUpqzByj.png", alt="The Throttling Menu", width="800", height="511" %}

**Figure 1**. The **Throttling Menu**

{% Img src="image/admin/7ZeCyXh6WRFbqvdCUtzh.svg", alt="Throttling Menu definitions", width="800", height="471" %}

**Figure 2**. Hover over the **Throttling** menu or open the **Capture Settings** menu to see the
definitions for **Mid-tier mobile** and **Low-end mobile**

## View storage usage {: #storage }

The new **Usage** section in the **Clear Storage** tab of the **Application** panel shows you how
much storage an [origin][7] is using, as well as the maximum quota for the origin on this device.

{% Img src="image/admin/wjRSmrs9iXUuyhqo6qwW.png", alt="The Usage section", width="800", height="507" %}

**Figure 3**. The **Usage** section shows that `https://airhorner.com` is using 66.9KB out of the
origin's quota of 15214MB

## View when a service worker cached responses {: #time-cached }

The new **Time Cached** column in the **Cache Storage** tab shows you when a service worker cached
responses.

{% Img src="image/admin/n7gJiv0MUjixjWafnJsC.png", alt="The Time Cached column", width="800", height="581" %}

**Figure 4**. The **Time Cached** column

## Enable the FPS Meter from the Command Menu {: #fps-meter }

You can now enable the [FPS Meter][8] from the [Command Menu][9].

{% Img src="image/admin/Lzkb4RCXPrjN6YNi0ZTQ.png", alt="Enabling the FPS Meter from the Command Menu", width="800", height="433" %}

**Figure 5**. Enabling the **FPS Meter** from the **Command Menu**

## Set mousewheel behavior to zoom or scroll with Performance recordings {: #mousewheel }

Open [Settings][10] and set the new **Flamechart mouse wheel action** setting to change how
mousewheels behave on the **Performance** panel.

For example, when you use a mousewheel on the **Main** section of a recording, or when you swipe
with two fingers on a trackpad, the default behavior is to zoom in or out. When you change the
setting to **Scroll**, this gesture now scrolls up or down.

{% Img src="image/admin/oicYBAxeipbNpfurGevt.svg", alt="The 'Flamechart mouse wheel action' setting", width="800", height="581" %}

**Figure 6**. The **Flamechart mouse wheel action** setting

## Debugging support for ES6 Modules {: #modules }

ES6 Modules are shipping natively in Chrome 61. There's not much going on here with regards to
DevTools, other than that debugging works as you'd expect it to. Try setting some breakpoints in and
stepping through [Paul Irish's ES6-Module-implementation][11] of [TodoMVC][12] to see for yourself.

[1]: #throttling
[2]: #storage
[3]: #time-cached
[4]: #fps-meter
[5]: #mousewheel
[6]: #modules
[7]: https://tools.ietf.org/html/rfc6454#section-3.2
[8]: /docs/devtools/evaluate-performance/reference#fps-meter
[9]: /docs/devtools/command-menu/
[10]: /docs/devtools/customize/#settings
[11]: https://paulirish.github.io/es-modules-todomvc/
[12]: http://todomvc.com/
[13]: /blog/new-in-devtools-59#coverage
[14]: /blog/new-in-devtools-59#screenshots
[15]: /blog/new-in-devtools-59#block-requests
[16]: /blog/new-in-devtools-59#async
[17]: /blog/new-in-devtools-59#command-menu
