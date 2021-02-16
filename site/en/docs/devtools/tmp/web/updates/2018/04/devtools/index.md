---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 67)"
authors:
  - kaycebasques
date: 2018-04-11
updated: 2019-09-19
description:
  "Search across network headers, copy requests as fetch, audit pages using desktop conditions, and
  much more."
---

New features and major changes coming to DevTools in Chrome 67 include:

- [Search across all network headers][1]
- [CSS variable value previews in the **Styles** pane][2]
- [Copy as fetch][3]
- [New audits, desktop configuration options, and viewing traces][4]
- [Stop infinite loops][5]
- [User Timing in the **Performance** tabs][6]
- [JavaScript VM instances clearly listed in the **Memory** panel][7]
- [The **Network** tab in the **Sources** panel has been renamed to the **Page** tab][8]
- [Dark theme updates][9]
- [Certificate transparency information in the **Security** panel][10]
- [Site isolation features in the **Performance** panel][11]

[Video version of the release notes][12]:

{% youtube id="4EdPq9Nw6uI" %}

!!!.aside.aside--note

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

!!!

## Search across all network headers and responses {: #network-search }

Open the **Network** panel then press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+F
(Windows, Linux, Chrome OS) to open the new **Network Search** pane. DevTools searches the headers
and bodies of all network requests for the query that you provide.

![Searching for the text 'cache-control' with the new Network Search pane.](/web/updates/images/2018/04/network-search.png)

**Figure 1**. Searching for the text `cache-control` with the new Network Search pane

Click **Match Case** ![Match Case](/web/updates/images/2018/04/match-case.png) to make your query
case-sensitive. Click **Use Regular Expression**
![Use Regular Expression](/web/updates/images/2018/04/use-regex.png) to show any results that match
the pattern you provide. You don't need to wrap your RegEx in forward slashes.

![A regular expression query in the Network Search pane.](/web/updates/images/2018/04/regex.png)

**Figure 2**. A regular expression query in the Network Search pane.

### Search pane UI updates {: #search }

The UI of the **Global Search** pane now matches the UI of the new **Network Search** pane. It now
also pretty-prints results to aid scannability.

![The old and new UI.](/web/updates/images/2018/04/search-ui.png)

**Figure 3**. The old UI on the left, and the new UI on the right

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows, Linux, Chrome OS) to open **Global
Search**. You can also open it via the [Command Menu][13].

## CSS variable value previews in the **Styles** pane {: #vars }

When the value of a CSS color property, such as `background-color` or `color`, is set to a CSS
variable, DevTools now shows a preview of that color.

![An example of CSS variable color values.](/web/updates/images/2018/04/vars.png)

**Figure 4**. In the old UI on the left, there is no color preview next to
`color: var(--main-color)`, whereas in the new UI on the right, there is

## Copy as fetch {: #fetch }

Right-click a network request then select **Copy** > **Copy As Fetch** to copy the
`fetch()`\-equivalent code for that request to your clipboard.

![Copying the fetch()-equivalent code for a request.](/web/updates/images/2018/04/fetch.png)

**Figure 5**. Copying the `fetch()`\-equivalent code for a request

DevTools produces code like the following:

```
fetch("https://preload.glitch.me/styles.css", {
  "credentials": "omit",
  "headers": {},
  "referrer": "https://preload.glitch.me/after/",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
});
```

## Audits panel updates {: #audits }

### New audits {: #new-audits }

The **Audits** panel has 2 new audits, including:

- [Preload key requests][14]. Preloading requests can speed up page load time by giving hints to the
  browser to download resources that are important for your Critical Rendering Path as soon as
  possible.
- [Avoid invisible text while webfonts are loading][15]. Ensuring that text is visible while
  webfonts load makes the page more useful to users faster.

### New configuration options {: #audit-config }

You can now configure the **Audits** panel to:

- Preserve desktop viewport and user agent settings. In other words, you can prevent the **Audits**
  panel from simulating a mobile device.
- Disable network and CPU throttling.
- Preserve storage, such as LocalStorage and IndexedDB, across audits.

![New audit configuration options.](/web/updates/images/2018/04/audit-config.png)

**Figure 6**. New audit configuration options

### View traces {: #traces }

After auditing a page, click **View Trace** to view the load performance data that your audit is
based off of in the **Performance** panel.

![The View Trace button.](/web/updates/images/2018/04/view-trace.png)

**Figure 7**. The **View Trace** button

## Stop infinite loops {: #stop }

If you work with `for` loops, `do...while` loops, or recursion a lot, you've probably executed an
infinite loop by mistake while developing your site. To stop the infinite loop, you can now:

1.  Open the **Sources** panel.
2.  Click **Pause** ![Pause](/web/updates/images/2018/04/pause.png). The button changes to **Resume
    Script Execution** ![Resume](/web/tools/chrome-devtools/images/resume-script-execution.png).
3.  Hold **Resume Script Execution**
    ![Resume](/web/tools/chrome-devtools/images/resume-script-execution.png) then select **Stop
    Current JavaScript Call** ![Stop](/web/updates/images/2018/04/stop.png).

{% youtube id="haFYwEBjaTo" %}

In the video above, the clock is being updated via a `setInterval()` timer. Clicking **Start
Infinite Loop** runs a `do...while` loop that never stops. The interval resumes because it wasn't
running when **Stop Current JavaScript Call** ![Stop](/web/updates/images/2018/04/stop.png) was
selected.

## User Timing in the Performance tabs {: #tabs }

When viewing a Performance recording, click the **User Timing** section to view [User Timing][16]
measures in the **Summary**, **Bottom-Up**, **Call Tree** and **Event Log** tabs.

![Viewing User Timing measures in the Bottom-Up tab.](/web/updates/images/2018/04/bottom-up.png)

**Figure 8**. Viewing User Timing measures in the **Bottom-Up** tab. The blue bar to the left of the
**User Timing** section indicates that it is selected.

In general, you can now select any of the sections (**Main Thread**, **User Timing**, **GPU**,
**ScriptStreamer**, and so on) and view that section's activity in the tabs.

## Select JavaScript VM instances in the Memory panel {: #vm }

The **Memory** panel now clearly lists out all JavaScript VM instances associated with a page,
rather than hiding them behind the **Target** dropdown menu as before.

![Before and after screenshots of the Memory panel.](/web/updates/images/2018/04/js-vm.png)

**Figure 9**. In the old UI on the left, the JavaScript VM instances are hidden behind the
**Target** dropdown menu, whereas in the new UI on the right they are shown in the **Select
JavaScript VM Instance** table

Next to the `developers.google.com` instance there are 2 values: `8.7 MB` and `13.3 MB`. The left
value represents memory allocated because of JavaScript. The right value represents all OS memory
that is being allocated because of that VM instance. The right value is inclusive of the left value.
In Chrome's Task Manager, the left value corresponds to `JavaScript Memory` and the right value
corresponds to `Memory Footprint`.

## Network tab renamed to Page tab {: #page }

On the **Sources** panel, the **Network** tab is now called the **Page** tab.

![Two DevTools windows side-by-side, demonstrating the name change.](/web/updates/images/2018/04/page.png)

**Figure 10**. In the old UI on the left, the tab showing the page's resources is called
**Network**, whereas in the new UI on the right it's called **Page**

## Dark theme updates {: #dark }

Chrome 67 ships with a number of minor changes to the dark theme color scheme. For example, the
breakpoint icons and the current line of execution are now green.

![A screenshot of the new breakpoint icon and current line of execution color scheme.](/web/updates/images/2018/04/dark-theme.png)

**Figure 11**. A screenshot of the new breakpoint icon and current line of execution color scheme

## Certificate transparency in the Security panel {: #security }

The **Security** panel now reports [certificate transparency][17] information.

![Certificate transparency information in the Security panel.](/web/updates/images/2018/04/certificate-transparency.png)

**Figure 12**. Certification transparency information in the Security panel

## Site Isolation in the Performance panel {: #site-isolation }

If you've got [Site Isolation][18] enabled, the **Performance** panel now provides a flame chart for
each process so that you can see the total work that each process is causing.

![Per-process flame charts in a Performance recording.](/web/updates/images/2018/04/perf-isolation.png)

**Figure 13**. Per-process flame charts in a Performance recording

- [CSS and JS code coverage][19]
- [Full-page screenshots][20]
- [Block requests][21]
- [Step over async await][22]
- [Unified Command Menu][23]

[1]: #network-search
[2]: #vars
[3]: #fetch
[4]: #audits
[5]: #stop
[6]: #tabs
[7]: #vm
[8]: #page
[9]: #dark
[10]: #security
[11]: #site-isolation
[12]: https://youtu.be/4EdPq9Nw6uI
[13]: /web/tools/chrome-devtools/shortcuts#command-menu
[14]: /web/tools/lighthouse/audits/preload
[15]: /web/updates/2016/02/font-display
[16]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
[17]: https://www.certificate-transparency.org/
[18]: https://www.chromium.org/Home/chromium-security/site-isolation
[19]: /web/updates/2017/04/devtools-release-notes#coverage
[20]: /web/updates/2017/04/devtools-release-notes#screenshots
[21]: /web/updates/2017/04/devtools-release-notes#block-requests
[22]: /web/updates/2017/04/devtools-release-notes#async
[23]: /web/updates/2017/04/devtools-release-notes#command-menu
