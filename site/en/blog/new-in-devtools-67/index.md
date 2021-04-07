---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 67)"
authors:
  - kaycebasques
date: 2018-04-11
#updated: YYYY-MM-DD
description:
  "Search across network headers, copy requests as fetch, audit pages using desktop conditions, and
  much more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/edO2lzkhF5E6uCQ85tv9.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-67
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

{% YouTube id="4EdPq9Nw6uI" %}

{% Aside %}

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

{% endAside %}

## Search across all network headers and responses {: #network-search }

Open the **Network** panel then press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+F
(Windows, Linux, Chrome OS) to open the new **Network Search** pane. DevTools searches the headers
and bodies of all network requests for the query that you provide.

{% Img src="image/admin/TnRMO7DetVC3UM3ONfQH.png", alt="Searching for the text 'cache-control' with the new Network Search pane.", width="800", height="479" %}

**Figure 1**. Searching for the text `cache-control` with the new Network Search pane

Click **Match Case** {% Img src="image/admin/nsPESeW3M26Asl8Ly4UW.png", alt="Match Case", width="31", height="19" %} to make your query
case-sensitive. Click **Use Regular Expression**
{% Img src="image/admin/uad781vLFZpnQPIK3jAZ.png", alt="Use Regular Expression", width="17", height="18" %} to show any results that match
the pattern you provide. You don't need to wrap your RegEx in forward slashes.

{% Img src="image/admin/b5xTsg6SFJgYGRcrk4pP.png", alt="A regular expression query in the Network Search pane.", width="800", height="518" %}

**Figure 2**. A regular expression query in the Network Search pane.

### Search pane UI updates {: #search }

The UI of the **Global Search** pane now matches the UI of the new **Network Search** pane. It now
also pretty-prints results to aid scannability.

{% Img src="image/admin/m7TtiSxMaJdf5NluAHHB.png", alt="The old and new UI.", width="800", height="344" %}

**Figure 3**. The old UI on the left, and the new UI on the right

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows, Linux, Chrome OS) to open **Global
Search**. You can also open it via the [Command Menu][13].

## CSS variable value previews in the **Styles** pane {: #vars }

When the value of a CSS color property, such as `background-color` or `color`, is set to a CSS
variable, DevTools now shows a preview of that color.

{% Img src="image/admin/QKLilvfcdik1HKCwv5sI.png", alt="An example of CSS variable color values.", width="800", height="382" %}

**Figure 4**. In the old UI on the left, there is no color preview next to
`color: var(--main-color)`, whereas in the new UI on the right, there is

## Copy as fetch {: #fetch }

Right-click a network request then select **Copy** > **Copy As Fetch** to copy the
`fetch()`\-equivalent code for that request to your clipboard.

{% Img src="image/admin/7bW4IwvbWaKHy1iknSp2.png", alt="Copying the fetch()-equivalent code for a request.", width="800", height="587" %}

**Figure 5**. Copying the `fetch()`\-equivalent code for a request

DevTools produces code like the following:

```js
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

{% Img src="image/admin/IKHKo4IwkOPoEV5qklS9.png", alt="New audit configuration options.", width="800", height="580" %}

**Figure 6**. New audit configuration options

### View traces {: #traces }

After auditing a page, click **View Trace** to view the load performance data that your audit is
based off of in the **Performance** panel.

{% Img src="image/admin/ycbjoUpPtPkKEUgvoR7t.png", alt="The View Trace button.", width="800", height="604" %}

**Figure 7**. The **View Trace** button

## Stop infinite loops {: #stop }

If you work with `for` loops, `do...while` loops, or recursion a lot, you've probably executed an
infinite loop by mistake while developing your site. To stop the infinite loop, you can now:

1.  Open the **Sources** panel.
2.  Click **Pause** {% Img src="image/admin/aRnFKWDcMQ2YezsefPr0.png", alt="Pause", width="18", height="16" %}. The button changes to **Resume
    Script Execution** {% Img src="image/admin/QeKjQuJXBEDj4gFZTNrP.png", alt="Resume", width="26", height="20" %}.
3.  Hold **Resume Script Execution**
    ![Resume](/docs/devtools/images/resume-script-execution.png) then select **Stop
    Current JavaScript Call** {% Img src="image/admin/Nvxc3igqv68CADzcPKSb.png", alt="Stop", width="16", height="16" %}.

{% YouTube id="haFYwEBjaTo" %}

In the video above, the clock is being updated via a `setInterval()` timer. Clicking **Start
Infinite Loop** runs a `do...while` loop that never stops. The interval resumes because it wasn't
running when **Stop Current JavaScript Call** ![Stop](/web/updates/images/2018/04/stop.png) was
selected.

## User Timing in the Performance tabs {: #tabs }

When viewing a Performance recording, click the **User Timing** section to view [User Timing][16]
measures in the **Summary**, **Bottom-Up**, **Call Tree** and **Event Log** tabs.

{% Img src="image/admin/Zkidb0hLM15mZtAe0DXP.png", alt="Viewing User Timing measures in the Bottom-Up tab.", width="800", height="602" %}

**Figure 8**. Viewing User Timing measures in the **Bottom-Up** tab. The blue bar to the left of the
**User Timing** section indicates that it is selected.

In general, you can now select any of the sections (**Main Thread**, **User Timing**, **GPU**,
**ScriptStreamer**, and so on) and view that section's activity in the tabs.

## Select JavaScript VM instances in the Memory panel {: #vm }

The **Memory** panel now clearly lists out all JavaScript VM instances associated with a page,
rather than hiding them behind the **Target** dropdown menu as before.

{% Img src="image/admin/KXo3kr9QiulYJrlT04H4.png", alt="Before and after screenshots of the Memory panel.", width="800", height="448" %}

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

{% Img src="image/admin/ZL8orqzhqW4lvjJXf5QU.png", alt="Two DevTools windows side-by-side, demonstrating the name change.", width="800", height="457" %}

**Figure 10**. In the old UI on the left, the tab showing the page's resources is called
**Network**, whereas in the new UI on the right it's called **Page**

## Dark theme updates {: #dark }

Chrome 67 ships with a number of minor changes to the dark theme color scheme. For example, the
breakpoint icons and the current line of execution are now green.

{% Img src="image/admin/MeAG3aqxoGNYrp63w9aW.png", alt="A screenshot of the new breakpoint icon and current line of execution color scheme.", width="800", height="491" %}

**Figure 11**. A screenshot of the new breakpoint icon and current line of execution color scheme

## Certificate transparency in the Security panel {: #security }

The **Security** panel now reports [certificate transparency][17] information.

{% Img src="image/admin/2z0dp1CDW9iSIJEHqMmI.png", alt="Certificate transparency information in the Security panel.", width="800", height="561" %}

**Figure 12**. Certification transparency information in the Security panel

## Site Isolation in the Performance panel {: #site-isolation }

If you've got [Site Isolation][18] enabled, the **Performance** panel now provides a flame chart for
each process so that you can see the total work that each process is causing.

{% Img src="image/admin/NEKRPLyQuqzgNg7Gw9uY.png", alt="Per-process flame charts in a Performance recording.", width="800", height="644" %}

**Figure 13**. Per-process flame charts in a Performance recording

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
[13]: /docs/devtools/shortcuts#command-menu
[14]: https://web.dev/uses-rel-preload/
[15]: https://developers.google.com/web/updates/2016/02/font-display
[16]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
[17]: https://www.certificate-transparency.org/
[18]: https://www.chromium.org/Home/chromium-security/site-isolation
[19]: /blog/new-in-devtools-59#coverage
[20]: /blog/new-in-devtools-59#screenshots
[21]: /blog/new-in-devtools-59#block-requests
[22]: /blog/new-in-devtools-59#async
[23]: /blog/new-in-devtools-59#command-menu
