---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 64)"
authors:
  - kaycebasques
date: 2017-12-28
#updated: YYYY-MM-DD
description: "Performance Monitor, Console Sidebar, and Console groupings."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qydNN6rx1qbTZj2Uroyn.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-64
---

Welcome back! New features coming to DevTools in Chrome 64 include:

- [Performance Monitor][1]. View a page's performance in real-time.
- [Console Sidebar][2]. Reduce Console noise and focus on the messages that are important to you.
- [Group similar Console messages][3]. The Console now groups similar messages together by default.

Read on, or watch the video version of these release notes below.

{% YouTube id="90wNAn05Cf4" %}

{% Aside %}

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

{% endAside %}

## Performance Monitor {: #perf-monitor }

Use the **Performance Monitor** to get a real-time view of various aspects of a page's load or
runtime performance, including:

- CPU usage.
- JavaScript heap size.
- The total number of DOM nodes, JavaScript event listeners, documents, and frames on the page.
- Layouts and style recalculations per second.

If users are reporting that your app feels slow or janky, check the **Performance Monitor** for
clues.

**Why load perf matters**: BookMyShow achieved an 80% increase in conversions when they built a
Progressive Web App that focused on speed. [Learn more][4].

To use the **Performance Monitor**:

1.  Open the [Command Menu][5].
2.  Start typing `Performance` then select `Show Performance Monitor`.

    {% Img src="image/admin/T0NRJB8MqpmcdhwvRx2S.png", alt="The Performance Monitor", width="800", height="488" %} **Figure 1**. The
    Performance Monitor

3.  Click a metric to show or hide it. In Figure 1 the **CPU Usage**, **JS heap size**, and **JS
    event listeners** charts are shown.

Related features:

- **Performance** panel. Walk through a critical user journey and record everything that happens on
  the page, including JavaScript activity, network requests, CPU usage, and much more. Can also be
  used to analyze load performance. [Learn more][6].
- **Audits** panel. Run a suite of automated load and runtime performance tests against any URL.
  [Learn more][7].

If you're just starting out with analyzing performance, the recommended path is to first use the
**Audits** panel, and then investigate further using the **Performance** panel or **Performance**
monitor.

## Console Sidebar {: #console-sidebar }

On large sites, the Console can quickly get flooded with irrelevant messages. Use the new **Console
Sidebar** to reduce the noise and focus on the messages that are important to you.

{% Img src="image/admin/Zh583Lcb57sNBWDGBas3.png", alt="Using the Console Sidebar to show error messages only", width="800", height="551" %}

**Figure 2**. Using the Console Sidebar to show error messages only

The Console Sidebar is hidden by default. Click **Show Console Sidebar**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iq3lqE16ilO9zTji6jEF.png", alt="Show Console Sidebar", width="30", height="26" %}
to show it.

Related features:

- **Filter** text box. Enter some text and the **Console** only shows messages that include that
  text. Also supports regex patterns, [negative filters][8], and [URL filters][9].

## Group similar Console messages {: #group-similar }

The Console now groups similar messages together by default. For example, in Figure 3 there are 27
instances of the message `[Violation] Avoid using document.write()`.

{% Img src="image/admin/uw6PiqfqFdJAlL7iScXm.png", alt="An example of the Console grouping similar messages together", width="800", height="493" %}

**Figure 3**. An example of the Console grouping similar messages together

Click on a group to expand it and see each instance of the message.

{% Img src="image/admin/jzkZ5NxwQDLZlddAI7sS.png", alt="An example of an expanded group of Console messages", width="800", height="505" %}

**Figure 4**. An example of an expanded group of Console messages

Uncheck the **Group Similar** checkbox to disable this feature.

Related features:

- You can group your own Console messages with [`console.group()`][10].

## Local Overrides {: #overrides }

Whoops! We originally scheduled this feature to launch in Chrome 64, but pulled it close to the
deadline in order to smooth out some rough edges. Apparently, the What's New UI didn't update in
time. Sorry!

This feature is shipping in Chrome 65, which will land approximately 6 weeks after Chrome 64. Check
out [Local Overrides][11] to learn more. If you're on Windows or Mac, you can try Chrome 65 now by
downloading [Chrome Canary][12].

[1]: #perf-monitor
[2]: #console-sidebar
[3]: #group-similar
[4]: https://developers.google.com/web/showcase/2017/bookmyshow
[5]: /docs/devtools/command-menu/
[6]: /docs/devtools/evaluate-performance
[7]: https://developers.google.com/web/tools/lighthouse#devtools
[8]: /blog/new-in-devtools-62#negative-filters
[9]: /blog/new-in-devtools-62#url-filters
[10]: /docs/devtools/console/api#group
[11]: /blog/new-in-devtools-65#overrides
[12]: https://www.google.com/chrome/browser/canary.html
[13]: /blog/new-in-devtools-59#coverage
[14]: /blog/new-in-devtools-59#screenshots
[15]: /blog/new-in-devtools-59#block-requests
[16]: /blog/new-in-devtools-59#async
[17]: /blog/new-in-devtools-59#command-menu
