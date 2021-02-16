---
layout: "layouts/doc-post.njk"
title: "How to Use the Timeline Tool"
authors:
  - kaycebasques
date: 2015-06-08
updated: 2020-07-10
description:
  "Use the Chrome DevTools Timeline panel to record and analyze all the activity in your application
  as it runs. It&#39;s the best place to start investigating perceived performance issues in your
  application."
---

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Performance Analysis Reference][1] for up-to-date
information.

!!!

Use the Chrome DevTools _Timeline_ panel to record and analyze all the activity in your application
as it runs. It's the best place to start investigating perceived performance issues in your
application.

{% Img src="image/admin/dTWv7nk48ctaQVAL9khU.png", alt="Timeline tool", width="800", height="568" %}

## TL;DR {: #tldr }

- Make a Timeline recording to analyze every event that occurred after a page load or a user
  interaction.
- View FPS, CPU, and network requests in the Overview pane.
- Click on an event within the Flame Chart to view details about it.
- Zoom in on a section of a recording to make analysis easier.

## Timeline panel overview {: #timeline-overview }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See the following sections for up-to-date information:

- [Record performance][2]
- [The FPS chart][3]
- [View main thread activity][4]

!!!

The Timeline panel consists of four panes:

1.  **Controls**. Start a recording, stop a recording, and configure what information is captured
    during the recording.
2.  **Overview**. A high-level summary of page performance. More on this below.
3.  **Flame Chart**. A visualization of the CPU stack trace.

    You may see one to three dotted, vertical lines on your **Flame Chart**. The blue line
    represents the `DOMContentLoaded` event. The green line represents time to first paint. The red
    line represents the `load` event.

4.  **Details**. When an event is selected, this pane shows more information about that event. When
    no event is selected, this pane shows information about the selected time frame.

{% Img src="image/admin/v7D5LYMXYrWz6efWVbvN.png", alt="annotated timeline panel", width="800", height="567" %}

### Overview pane {: #overview_pane }

The **Overview** pane consists of three graphs:

1.  **FPS**. Frames Per Second. The higher the green bar, the higher the FPS. The red blocks above
    the FPS graph indicate long frames, which are likely candidates for [jank][5].
2.  **CPU**. CPU resources. This [area chart][6] indicates what type of events consumed CPU
    resources.
3.  **NET**. Each colored bar represents a resource. The longer the bar, the longer it took to
    retrieve the resource. The lighter portion of each bar represents waiting time (the time between
    when the resource was requested up until the time that the first byte was downloaded). The
    darker portion represents transfer time (the time between when the first and last bytes were
    downloaded).

    Bars are color coded as follows:

    - HTML files are **blue**.
    - Scripts are **yellow**.
    - Stylesheets are **purple**.
    - Media files are **green**.
    - Miscellaneous resources are **grey**.

{% Img src="image/admin/2HDqQih0c6Ee8v8QxFd2.jpg", alt="overview pane, annotated", width="800", height="145" %}

## Make a recording {: #make_a_recording }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Record performance][7] for up-to-date information.

!!!

To make a recording of a _page load_, open the **Timeline** panel, open the page that you want to
record, and then reload the page. The **Timeline** panel automatically records the page reload.

To make a recording of a _page interaction_, open the **Timeline** panel, then start the recording
by pressing the **Record** button
({% Img src="image/admin/0lDkj81bWVh1br1t9Hn6.png", alt="record button", width="26", height="26" %}) or by typing
the keyboard shortcut <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows /
Linux). The **Record** button turns red during a recording. Perform your page interactions, and then
press the **Record** button or type the keyboard shortcut again to stop the recording.

When the recording is finished, DevTools guesses what portion of the recording is most relevant to
you, and automatically zooms to that portion.

### Recording tips {: #recording_tips }

- **Keep recordings as short as possible**. Shorter recordings generally make analysis easier.
- **Avoid unnecessary actions**. Avoid actions (mouse clicks, network loads, etc.) that are
  extraneous to the activity you want to record and analyze. For example, if you want to record
  events that occur after you click a Login button, don't also scroll the page, load an image, and
  so on.
- **Disable the browser cache**. When recording network operations, it's a good idea to disable the
  browser's cache from the DevTools Settings panel or the [**Network conditions**][8] drawer.
- **Disable extensions**. Chrome extensions can add unrelated noise to Timeline recordings of your
  application. Open a Chrome window in [incognito mode][9], or create a new [Chrome user
  profile][10] to ensure that your environment has no extensions.

## View recording details {: #view_recording_details }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [View main thread][11] for up-to-date information.

!!!

When you select an event in the **Flame Chart**, the **Details** pane displays additional
information about the event.

{% Img src="image/admin/r3JM81hXuBDtKQ8zOQHu.png", alt="details pane", width="800", height="544" %}

Some tabs, like **Summary**, are present for all event types. Other tabs are only available to
certain event types. See the [Timeline event reference][12] for details on each record type.

## Capture screenshots during recording {: #filmstrip }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Capture screenshots while recording][13] for up-to-date
information.

!!!

The **Timeline** panel can capture screenshots during a page load. This feature is known as the
**Filmstrip**.

Enable the **Screenshots** checkbox in the **Controls** pane before you make a recording to capture
screenshots of the recording. The screenshots are displayed below the **Overview** pane.

{% Img src="image/admin/97ajXOfoK4FCXbMkZeaL.png", alt="timeline recording with filmstrip", width="800", height="293" %}

Hover your mouse over the **Screenshots** or **Overview** pane to view a zoomed screenshot of that
point in the recording. Move your mouse left and right to simulate an animation of the recording.

## Profile JavaScript {: #profile-js }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See the following sections for up-to-date information:

- [Disable JavaScript samples][14]
- [View main thread activity][15]
- [View activities][16]

!!!

Enable the **JS Profile** checkbox before you take a recording to capture JavaScript stacks in your
timeline recording. When the JS profiler is enabled, your flame chart shows every JavaScript
function that was called.

{% Img src="image/admin/Wi65B9xauldX3FNvlWrD.png", alt="flame chart with JS profile enabled", width="800", height="605" %}

## Profile painting {: #profile-painting }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [View paint profiler][17] for up-to-date information.

!!!

Enable the **Paint** checkbox before you take a recording to gain more insight into **Paint**
events. When paint profiling is enabled and you click on a **Paint** event, a new **Paint Profiler**
tab is displayed in the **Details** pane that shows much more granular information about the event.

{% Img src="image/admin/HKXiy68yW83qidJuSyp7.png", alt="paint profiler", width="800", height="713" %}

### Rendering settings {: #rendering-settings }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Analyze rendering performance with the Rendering tab][18]
for up-to-date information.

!!!

Open the main DevTools menu and select **More tools** > **Rendering settings** to access rendering
settings that may be helpful when debugging paint issues. The rendering settings opens up as a tab
next to the **Console** drawer (press <kbd>esc</kbd> to show the drawer, if it's hiding).

{% Img src="image/admin/ZcLDi0MVFyn0EmFnX21I.png", alt="rendering settings", width="800", height="380" %}

## Search records {: #search_records }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Search activities][19] for up-to-date information.

!!!

While looking at events you may want to focus on one type of events. For example, perhaps you need
to view the details of every `Parse HTML` event.

Press <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows / Linux) while the
**Timeline** is in focus to open a Find toolbar. Type in the name of the event type that you wish to
inspect, such as `Event`.

The toolbar only applies to the currently selected timeframe. Any events outside of the selected
timeframe are not included in the results.

The up and down arrows move you chronologically through the results. So, the first result represents
the earliest event in the selected timeframe, and the last result represents the last event. Every
time that you press the up or down arrow, a new event is selected, so you can view its details in
the **Details** pane. Pressing the up and down arrows is equivalent to clicking on an event in the
**Flame Chart**.

{% Img src="image/admin/r1QbF8jnBeyaxmgglRo2.png", alt="find toolbar", width="690", height="307" %}

## Zoom in on a Timeline section {: #zoom }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Select a portion of a recording][20] for up-to-date
information.

!!!

You can zoom in on a section of a recording to make analysis easier. You use the **Overview** pane
to zoom in on a section of the recording. After zooming, the **Flame Chart** is automatically zoomed
to match the same section.

{% Img src="image/admin/B9s6zXrFb1IBqAmw9CFX.png", alt="zoom in on a section of a timeline recording", width="800", height="246" %}

To zoom in on a Timeline section:

- In the **Overview** pane, drag out a Timeline selection with your mouse.
- Adjust the gray sliders in the ruler area.

Once you have a section selected, you can use the <kbd>W</kbd>,<kbd>A</kbd>, <kbd>S</kbd>, and
<kbd>D</kbd> keys to adjust your selection. <kbd>W</kbd> and <kbd>S</kbd> zoom in and zoom out,
respectively. <kbd>A</kbd> and <kbd>D</kbd> move left and right, respectively.

## Save and load recordings {: #save_and_load_recordings }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See the following sections for up-to-date information:

- [Save a recording][21]
- [Load a recording pane][22]

!!!

You can save and open recordings by right-clicking inside the **Overview** or **Flame Chart** panes
and selecting the relevant option.

{% Img src="image/admin/HcZf7ZzxWzsu5qWhFL9l.png", alt="save and open recordings", width="517", height="342" %}

You can also share saved recordings using [timeline-viewer][23].

[1]: /web/tools/chrome-devtools/evaluate-performance/reference
[2]: /web/tools/chrome-devtools/evaluate-performance/reference#record
[3]: /web/tools/chrome-devtools/evaluate-performance/reference#fps-chart
[4]: /web/tools/chrome-devtools/evaluate-performance/reference#main
[5]: /web/fundamentals/performance/rendering
[6]: https://en.wikipedia.org/wiki/Area_chart
[7]: /web/tools/chrome-devtools/evaluate-performance/reference#record
[8]: /web/tools/chrome-devtools/network-performance/reference#network-conditions
[9]: https://support.google.com/chrome/answer/95464
[10]: https://support.google.com/chrome/answer/142059
[11]: /web/tools/chrome-devtools/evaluate-performance/reference#main
[12]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference
[13]: /web/tools/chrome-devtools/evaluate-performance/reference#screenshots
[14]: /web/tools/chrome-devtools/evaluate-performance/reference#disable-js-samples
[15]: /web/tools/chrome-devtools/evaluate-performance/reference#main
[16]: /web/tools/chrome-devtools/evaluate-performance/reference#activities
[17]: /web/tools/chrome-devtools/evaluate-performance/reference#paint-profiler
[18]: /web/tools/chrome-devtools/evaluate-performance/reference#rendering
[19]: /web/tools/chrome-devtools/evaluate-performance/reference#search
[20]: /web/tools/chrome-devtools/evaluate-performance/reference#select
[21]: /web/tools/chrome-devtools/evaluate-performance/reference#save
[22]: /web/tools/chrome-devtools/evaluate-performance/reference#load
[23]: https://chromedevtools.github.io/timeline-viewer/
