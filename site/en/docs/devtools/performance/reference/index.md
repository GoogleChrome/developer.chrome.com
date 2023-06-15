---
layout: "layouts/doc-post.njk"
title: "Performance features reference"
authors:
  - kaycebasques
  - sofiayem
date: 2017-05-08
updated: 2023-06-12
description: "A reference on all the ways to record and analyze performance in Chrome DevTools."
tags:
  - performance
---

This page is a comprehensive reference of Chrome DevTools features related to analyzing performance.

See [Get Started With Analyzing Runtime Performance][1] for a guided tutorial on how to analyze a
page's performance using Chrome DevTools.

## Record performance {: #record }

### Record runtime performance {: #record-runtime }

Record runtime performance when you want to analyze the performance of a page as it's running, as
opposed to loading.

1.  Go to the page that you want to analyze.
2.  Click the **Performance** tab in DevTools.
3.  Click **Record** {% Img src="image/admin/Re0KNyMRmkswFBpNYVW3.png", alt="Record.", width="24", height="24" %}.

    {% Img src="image/admin/Vkr4jM5q0MAgLIvGyG35.svg", alt="Record.", width="800", height="468" %}

4.  Interact with the page. DevTools records all page activity that occurs as a result of your
    interactions.
5.  Click **Record** again or click **Stop** to stop recording.

### Record load performance {: #record-load }

Record load performance when you want to analyze the performance of a page as it's loading, as
opposed to running.

1.  Go to the page that you want to analyze.
2.  Open the **Performance** panel of DevTools.
3.  Click **Start profiling and reload page**
    {% Img src="image/admin/LLUc63dXLxWMXnoL8kyr.png", alt="Start profiling and reload page.", width="20", height="20" %}. DevTools first navigates to `about:blank` to clear any remaining screenshots and traces. Then DevTools
    records performance metrics while the page reloads and then automatically stops the recording a
    couple seconds after the load finishes.

    {% Img src="image/admin/lKfrmjzS0hQHvgk425kL.svg", alt="Reload page.", width="800", height="468" %}

DevTools automatically zooms in on the portion of the recording where most of the activity occurred.

{% Img src="image/admin/MQaqMsLSnCfpnjt0C4xk.png", alt="A page-load recording.", width="800", height="857" %}

In the example above, the **Performance** panel shows the activity during a page load.

### Capture screenshots while recording {: #screenshots }

Enable the **Screenshots** checkbox to capture a screenshot of every frame while recording.

{% Img src="image/admin/bgBdzp23tsgMHIYVMVNJ.svg", alt="The Screenshots checkbox.", width="800", height="468" %}

See [View a screenshot][2] to learn how to interact with screenshots.

### Force garbage collection while recording {: #garbage }

While you are recording a page, click **Collect garbage**
{% Img src="image/admin/3pKYmus2h5cTtgSeGSDj.png", alt="Collect garbage.", width="18", height="28" %} to
force garbage collection.

{% Img src="image/admin/TpDkcFuP46PR2f3ViVWM.svg", alt="Collect garbage.", width="800", height="468" %}

### Show recording settings {: #settings }

Click **Capture settings**
{% Img src="image/admin/AVbUTcyBdsQDHOGJrYtO.png", alt="Capture settings.", width="28", height="28" %} to
expose more settings related to how DevTools captures performance recordings.

{% Img src="image/admin/oMrzdv4yCX3nNYXXxyiO.svg", alt="The Capture Settings section.", width="800", height="583" %}

### Disable JavaScript samples {: #disable-js-samples }

By default, the **Main** section of a recording displays detailed call stacks of JavaScript
functions that were called during the recording. To disable these call stacks:

1. Open the **Capture settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} menu. See [Show recording settings][3].
2.  Enable the **Disable JavaScript Samples** checkbox.
3.  Take a recording of the page.

The following screenshots show the difference between disabling and enabling JavaScript samples. The
**Main** section of the recording is much shorter when sampling is disabled, because it omits all of
the JavaScript call stacks.

{% Img src="image/admin/ggxgXYwyRlwqZ64RQjYR.png", alt="An example of a recording when JS samples are disabled.", width="800", height="626" %}

The example above shows a recording with disabled JS samples.

{% Img src="image/admin/mDRqRgX1BgCgS3UjWSzm.png", alt="An example of a recording when JS samples are enabled.", width="800", height="781" %}

The example above shows a recording with enabled JS samples.

### Throttle the network while recording {: #network-throttle }

To throttle the network while recording:

1. Open the **Capture settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} menu. See [Show recording settings][4].
2.  Set **Network** to the desired level of throttling.

### Throttle the CPU while recording {: #cpu-throttle }

To throttle the CPU while recording:

1. Open the **Capture settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} menu. See [Show recording settings][5].
2.  Set **CPU** to the desired level of throttling.

Throttling is relative to your computer's capabilities. For example, the **2x slowdown** option
makes your CPU operate 2 times slower than its usual ability. DevTools can't truly simulate the CPUs
of mobile devices, because the architecture of mobile devices is very different from that of
desktops and laptops.

### Enable advanced paint instrumentation {: #paint }

To view detailed paint instrumentation:

1.  Open the **Capture settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} menu. See [Show recording settings][6].
2.  Check the **Enable advanced paint instrumentation** checkbox.

To learn how to interact with the paint information, see [View layers][7] and [View paint
profiler][8].

### Emulate hardware concurrency {: #hardware-concurrency }

To test application performance with different numbers of processor cores, you can configure the value reported by the [`navigator.hardwareConcurrency`](https://developer.mozilla.org/docs/Web/API/Navigator/hardwareConcurrency) property. Some applications use this property to control the degree of parallelism of their application, for example, to control Emscripten pthread pool size.

To emulate hardware concurrency:

1. Open the **Capture settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} menu. See [Show recording settings][6].
1. Check **Hardware concurrency** and set the number of cores in the text box.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SjBgvDM57GzK6Jn3B0nY.png", alt="Hardware concurrency.", width="800", height="497" %}

DevTools displays a warning icon {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jsbv7jCK4GsRjL6e8RcF.svg", alt="Warning.", width="24", height="24" %} next to the **Performance** tab to remind you that hardware concurrency emulation is enabled.

To revert to the default value of `10`, click the **Revert** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tby5LrQzKTKzHia2fEBO.svg", alt="Revert.", width="24", height="24" %} button.

## Save a recording {: #save }

To save a recording, right-click and select **Save Profile**.

{% Img src="image/admin/u2XWglmRCUs83vxv3fFK.png", alt="Save Profile.", width="800", height="600" %}

## Load a recording {: #load }

To load a recording, right-click and select **Load Profile**.

{% Img src="image/admin/nz7lFM4urJs2IGwtosdm.png", alt="Load Profile.", width="800", height="587" %}

## Clear the previous recording {: #clear }

After making a recording, press **Clear recording**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mEMdGoChkUDgRIowaEu1.png", alt="Clear recording.", width="26", height="26" %}
to clear that recording from the **Performance** panel.

{% Img src="image/admin/KDg1wSCNTs4Ts3qQN0gy.svg", alt="Clear recording.", width="800", height="547" %}

## Analyze a performance recording {: #analyze }

After you [record runtime performance][9] or [record load performance][10], the **Performance**
panel provides a lot of data for analyzing the performance of what just happened.

### Select a portion of a recording {: #select }

Drag your mouse left or right across the **Overview** to select a portion of a recording. The
**Overview** is the section that contains the **FPS**, **CPU**, and **NET** charts.

{% Img src="image/admin/CvbTzzqLPqoCfo0vJ8UE.gif", alt="Dragging the mouse across the Overview to zoom.", width="800", height="546" %}

To select a portion using the keyboard:

1.  Click on the background of the **Main** section, or any of the sections next to it, such as
    **Interactions**, **Network**, or **GPU**. This keyboard workflow only works when one of these
    sections is in focus.
2.  Use the W, A, S, D keys to zoom in, move left, zoom out, and move right, respectively.

To select a portion using a trackpad:

1.  Hover your mouse over the **Overview** section or the **Details** section. The **Overview**
    section is the area containing the **FPS**, **CPU**, and **NET** charts. The **Details** section
    is the area containing the **Main** section, the **Interactions** section, and so on.
2.  Using two fingers, swipe up to zoom out, swipe left to move left, swipe down to zoom in, and
    swipe right to move right.

To scroll a long flame chart in the **Main** section or any of its neighbors, click and hold while
dragging up and down. Drag left and right to move what portion of the recording is selected.

### Search activities {: #search }

Press Command+F (Mac) or Control+F (Windows, Linux) to open the search box at the bottom of the
**Performance** panel.

{% Img src="image/admin/bDTtPmR7htQFD82qG0Mp.png", alt="The search box.", width="800", height="586" %}

The example above shows a RegEx pattern in the search box at the bottom of the window that finds any activity that
begins with `E`.

To navigate activities that match your query:

- Use the **Previous**
  {% Img src="image/admin/4IX7ufjSOK30gfolntm4.png", alt="Previous.", width="24", height="26" %} and **Next**
  {% Img src="image/admin/podVrMNQX4eE0cNLfarR.png", alt="Next.", width="24", height="26" %} buttons.
- Press Shift+Enter to select the previous or Enter to select the next.

To modify query settings:

- Press **Case sensitive**
  {% Img src="image/admin/PZvAN15LZnGb1fGFzr53.png", alt="Case sensitive.", width="31", height="19" %} to make
  the query case sensitive.
- Press **Regex** {% Img src="image/admin/klPyk4dJ7YIwumZTOqOp.png", alt="RegEx.", width="17", height="18" %} to
  use a regular expression in your query.

To hide the search box, press **Cancel**.

### View main thread activity {: #main }

Use the **Main** section to view activity that occurred on the page's main thread.

{% Img src="image/admin/xNyVAPQQVzJ6WAehsum5.svg", alt="The Main section.", width="800", height="662" %}

Click on an event to view more information about it in the **Summary** tab. DevTools outlines the
selected event in blue.

{% Img src="image/admin/8R1ZWSovI8pMUgylpZpJ.png", alt="More information about a main thread event in the Summary tab.", width="800", height="869" %}

The example above shows more information about the `Me` function call event in the **Summary** tab.

DevTools represents main thread activity with a flame chart. The x-axis represents the recording
over time. The y-axis represents the call stack. The events on top cause the events below it.

{% Img src="image/admin/9GggXOXYnbx2DVeZ3Fa1.png", alt="A flame chart.", width="800", height="893" %}

The example above shows a flame chart in the **Main** section.

A `click` event caused a function call in `script_foot_closure.js` on line 53. Below
`Function Call` you see that an anonymous function was called. That anonymous function then called
`Me()`, which then called `Se()`, and so on.

DevTools assigns scripts random colors to break up the flame chart and make it more readable. In the example above, function calls from one script are colored light green. Calls from another script are colored beige. The darker yellow represents scripting activity, and the purple event represents rendering activity. These darker yellow and purple events are consistent across all recordings.

{: #long-tasks }

[Long tasks are also highlighted](/blog/new-in-devtools-83/#long-tasks) with a red triangle, and with the part over 50 milliseconds shaded in red:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zB1QLni239q7xxTYqUhP.png", alt="The Long Task UI", width="800", height="568" %}

In this example, the task is approximately 140 milliseconds, so the part representing the last 90 milliseconds is shaded in red, while the initial 50 milliseconds is not.

Additionally, the **Main** section shows information on CPU profiles started and stopped with [`profile()` and `profileEnd()`](/docs/devtools/console/utilities/#profile-function) console functions.

See [Disable JavaScript samples][11] if you want to hide the detailed flame chart of JavaScript
calls. When JS samples are disabled, you only see high-level events such as `Event (click)` and
`Function Call (script_foot_closure.js:53)`.

### View activities in a table {: #activities }

After recording a page, you don't need to rely solely on the **Main** section to analyze activities.
DevTools also provides three tabular views for analyzing activities. Each view gives you a different
perspective on the activities:

- When you want to view the root activities that cause the most work, use [the **Call Tree**
  tab][12].
- When you want to view the activities where the most time was directly spent, use [the
  **Bottom-Up** tab][13].
- When you want to view the activities in the order in which they occurred during the recording, use
  [the **Event Log** tab][14].

Each tabular view in the **Performance** panel shows links for activities such as functions calls.
To help you debug, DevTools finds the corresponding function declarations in source files.
Additionally, if the appropriate [source maps](/blog/sourcemaps/) are present and enabled, DevTools automatically finds the original files.

Click a link to open a source file in the **Sources** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4SQI9D4uvwrBOqhfKnmB.png", alt="Link to a source file in the Event Log tab.", width="800", height="669" %}

{% Aside %}
**Note**:The next three sections all refer to the same demo. You can run the demo yourself at
[Activity Tabs Demo][15] and see the source at
[GoogleChrome/devtools-samples/perf/activitytabs.html][16].
{% endAside %}

#### Root activities {: #root-activities }

Here's an explanation of the _root activities_ concept that's mentioned in the **Call Tree** tab,
**Bottom-Up** tab, and **Event Log** sections.

Root activities are those which cause the browser to do some work. For example, when you click a
page, the browser fires an `Event` activity as the root activity. That `Event` might cause a handler
to execute, and so on.

In the **Main** section's flame chart, root activities are at the top of the chart. In the **Call
Tree** and **Event Log** tabs, root activities are the top-level items.

See [The Call Tree tab][17] for an example of root activities.

#### The Call Tree tab {: #call-tree }

Use the **Call Tree** tab to view which [root activities][18] cause the most work.

The **Call Tree** tab only displays activities during the selected portion of the recording. See
[Select a portion of a recording][19] to learn how to select portions.

{% Img src="image/admin/OjSICzOrejsaGYTysG7u.png", alt="The Call Tree tab.", width="800", height="863" %}

In the example above, the top-level of items in the **Activity** column, such as `Event`, `Paint`, and
`Composite Layers` are root activities. The nesting represents the call stack. For example, in
the example above, `Event` caused `Function Call`, which caused `button.addEventListener`, which caused `b`,
and so on.

**Self Time** represents the time directly spent in that activity. **Total Time** represents the
time spent in that activity or any of its children.

Click **Self Time**, **Total Time**, or **Activity** to sort the table by that column.

Use the **Filter** text box to filter events by activity name.

By default the **Grouping** menu is set to **No Grouping**. Use the **Grouping** menu to sort the
activity table based on various criteria.

Click **Show Heaviest Stack**
{% Img src="image/admin/QGgcONKJoO4kVtKreJY3.png", alt="Show Heaviest Stack.", width="30", height="26" %}
to reveal another table to the right of the **Activity** table. Click on an activity to populate the
**Heaviest Stack** table. The **Heaviest Stack** table shows you which children of the selected
activity took the longest time to execute.

#### The Bottom-Up tab {: #bottom-up }

Use the **Bottom-Up** tab to view which activities directly took up the most time in aggregate.

The **Bottom-Up** tab only displays activities during the selected portion of the recording. See
[Select a portion of a recording][20] to learn how to select portions.

{% Img src="image/admin/m5ooBRBaQ4MLXmjeLgYR.png", alt="The Bottom-Up tab.", width="800", height="879" %}

In the **Main** section flame chart of the example above, you can see that almost all of the
time was spent executing the three calls to `wait()`. Accordingly, the top activity in the
**Bottom-Up** tab is `wait`. In the flame chart, the yellow below the
calls to `wait` are actually thousands of `Minor GC` calls. Accordingly, you can see that in the
**Bottom-Up** tab, the next most expensive activity is `Minor GC`.

The **Self Time** column represents the aggregated time spent directly in that activity, across all
of its occurrences.

The **Total Time** column represents aggregated time spent in that activity or any of its children.

#### The Event Log tab {: #event-log }

Use the **Event Log** tab to view activities in the order in which they occurred during the
recording.

The **Event Log** tab only displays activities during the selected portion of the recording. See
[Select a portion of a recording][21] to learn how to select portions.

{% Img src="image/admin/ErnVsmtVYqnc9awGTY5n.png", alt="The Event Log tab.", width="800", height="826" %}

The **Start Time** column represents the point at which that activity started, relative to the start
of the recording. For example, the start time of `1573.0 ms` for the selected item in the example above
means that activity started 1573 ms after the recording started.

The **Self Time** column represents the time spent directly in that activity.

The **Total Time** columns represents time spent directly in that activity or in any of its
children.

Click **Start Time**, **Self Time**, or **Total Time** to sort the table by that column.

Use the **Filter** text box to filter activities by name.

Use the **Duration** menu to filter out any activities that took less than 1 ms or 15 ms. By default
the **Duration** menu is set to **All**, meaning all activities are shown.

Disable the **Loading**, **Scripting**, **Rendering**, or **Painting** checkboxes to filter out all
activities from those categories.

### View timings {: #timings }

On the **Timings** track, view important markers such as:

- [First Paint (FP)](https://developer.mozilla.org/docs/Glossary/First_paint)
- [First Contentful Paint (FCP)](https://web.dev/fcp/)
- [Largest Contentful Paint (LCP)](https://web.dev/lcp/)
- [DOMContentLoaded Event (DCL)](https://developer.mozilla.org/docs/Web/API/Window/DOMContentLoaded_event)
- [Onload Event (L)](https://developer.mozilla.org/docs/Web/API/Window/load_event)
- Your custom [`performance.mark()`](https://developer.mozilla.org/docs/Web/API/Performance/mark) calls

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7aTG6FO3T8Tz1kkWgKKy.png", alt="Markers in the Timings track.", width="800", height="578" %}

To see more details in the **Summary** tab, select a marker. To see the marker's timestamp, hover over it on the **Timings** track.

### View interactions {: #interactions }

View user interactions on the **Interactions** track to track down potential responsiveness issues.

To view interactions:

1. [Open DevTools](/docs/devtools/open/), for example, on this [demo page](https://coffee-cart.app/?ad=1).
1. Open the **Performance** panel and [start a recording](/docs/devtools/evaluate-performance/#record).
1. Click an element (coffee) and stop the recording.
1. Find the **Interactions** track in the timeline.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QtXDPyOntOBbcFwI5QUY.png", alt="The Interactions track.", width="800", height="459" %}

In the example above, the **Interactions** track shows two interactions. Both have the same IDs, indicating that the interactions are triggered by the same user action.

The **Interactions** track also shows [Interaction to Next Paint (INP)](https://web.dev/inp/) warnings for interactions longer than 200 milliseconds in the **Summary** tab:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wrFaZ26nYCuprtCSNB5C.png", alt="The INP warning.", width="800", height="685" %}

Interactions over 200 milliseconds also have the part of the interaction above 200 milliseconds shaded in red—in the same way that [long tasks in the Main thread section](#long-tasks) also have the part over the 50 millisecond long task threshold shaded in red. In this example, 353.77 milliseconds out of the 553.77 milliseconds is shaded in red.

### View GPU activity {: #gpu }

View GPU activity in the **GPU** section.

{% Img src="image/admin/zOL3E4TTppXz4o0appWw.svg", alt="The GPU section.", width="800", height="660" %}

### View raster activity {: #raster }

View raster activity in the **Raster** section.

{% Img src="image/admin/MjviwXOVytHRom3xDsDi.svg", alt="The Raster section.", width="800", height="709" %}

### Analyze frames per second (FPS) {: #fps }

DevTools provides numerous ways to analyze frames per second:

- Use [the **FPS** chart][22] to get an overview of FPS over the duration of the recording.
- Use [the **Frames** section][23] to view how long a particular frame took.
- Use the **FPS meter** for a real time estimate of FPS as the page runs. See [View frames per second
  in real time with the FPS meter][24].

#### The FPS chart {: #fps-chart }

The **FPS** chart provides an overview of the frame rate across the duration of a recording. In
general, the higher the green bar, the better the frame rate.

A red bar above the **FPS** chart is a warning that the frame rate dropped so low that it probably
harmed the user's experience.

{% Img src="image/admin/DRy9iQ4PlKbu568jEQxD.svg", alt="The FPS chart.", width="800", height="530" %}

#### The Frames section {: #frames }

The **Frames** section tells you exactly how long a particular frame took.

Hover over a frame to view a tooltip with more information about it.

{% Img src="image/admin/MX9kRvaRf3DqfkZAgoTq.png", alt="Hovering over a frame.", width="800", height="542" %}

The example above shows a tooltip when you hover over a frame.

The **Frames** section can show four types of frames:

1. **Idle frame (white)**. No changes.
1. **Frame (green)**. Rendered as expected and in time.
1. **Partially presented frame (yellow with a sparse wide dash-line pattern)**. Chrome did its best to render at least some visual updates in time. For example, in case the work of the main thread of the renderer process (canvas animation) is late but the compositor thread (scrolling) is in time.
1. **Dropped frame (red with a dense solid-line pattern)**. Chrome can't render the frame in reasonable time.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZT2pGas5UPTRfkRTTnG8.png", alt="Hovering over a partially presented frame.", width="800", height="529" %}

The example above shows a tooltip when you hover over a partially presented frame.

Click on a frame to view even more information about the frame in the **Summary** tab. DevTools
outlines the selected frame in blue.

{% Img src="image/admin/0eNKIn4DCCUo0A1GsA8R.png", alt="Viewing a frame in the Summary tab.", width="800", height="596" %}

### View network requests {: #network }

Expand the **Network** section to view a waterfall of network requests that occurred during the
recording.

{% Img src="image/admin/ZkpNSWGs2csexM9Mo7GO.svg", alt="The Network section.", width="800", height="950" %}

Requests are color-coded as follows:

- HTML: Blue
- CSS: Purple
- JS: Yellow
- Images: Green

Click on a request to view more information about it in the **Summary** tab. In the example above,
the **Summary** tab is displaying more information about the blue request that's selected in the
**Network** section.

A darker-blue square in the top-left of a request means it's a higher-priority request. A
lighter-blue square means lower-priority. In the example above, the selected request is
higher-priority, and the green one above it is lower-priority.

In the example above, the request for `www.google.com` is represented by a line on the left, a bar in the
middle with a dark portion and a light portion, and a line on the right. The screenshot below shows the
corresponding representation of the same request in the **Timing** tab of the **Network** panel.
Here's how these two representations map to each other:

- The left line is everything up to the `Connection Start` group of events, inclusive. In other
  words, it's everything before `Request Sent`, exclusive.
- The light portion of the bar is `Request Sent` and `Waiting (TTFB)`.
- The dark portion of the bar is `Content Download`.
- The right line is essentially time spent waiting for the main thread. This is not represented in
  the **Timing** tab.

{% Img src="image/admin/IHFdgHMSSdVjrKkbknOM.png", alt="The line-bar representation of the www.google.com request.", width="800", height="603" %}

The example above shows the line-bar representation of the `www.google.com` request.

{% Img src="image/admin/0tmyrwYEZd27ej4gw0UM.png", alt="The Network section.", width="800", height="831" %}

The example above shows the **Timing** tab representation of the `www.google.com` request.

### View memory metrics {: #memory }

Enable the **Memory** checkbox to view memory metrics from the last recording.

{% Img src="image/admin/RKJIxxwVnBj5ivVjvMtI.svg", alt="The Memory checkbox.", width="800", height="468" %}

DevTools displays a new **Memory** chart, above the **Summary** tab. There's also a new chart below
the **NET** chart, called **HEAP**. The **HEAP** chart provides the same information as the **JS
Heap** line in the **Memory** chart.

{% Img src="image/admin/dgmYH2RBKH2M2Ej0gaXO.png", alt="Memory metrics.", width="800", height="493" %}

The example above shows memory metrics above the **Summary** tab.

The colored lines on the chart map to the colored checkboxes above the chart. Disable a checkbox to
hide that category from the chart.

The chart only displays the region of the recording that is currently selected. For example, in the example
above, the **Memory** chart shows only the memory usage for the start of the recording, up to
around the 1000ms mark.

### View the duration of a portion of a recording {: #duration }

When analyzing a section like **Network** or **Main**, sometimes you need a more precise estimate of
how long certain events took. Hold Shift, click and hold, and drag left or right to select a portion
of the recording. At the bottom of your selection, DevTools shows how long that portion took.

{% Img src="image/admin/ywM6ZNwJARqChcDXyR8W.png", alt="Viewing the duration of a portion of a recording.", width="800", height="606" %}

In the example above, the `488.53ms` timestamp at the bottom of the selected portion indicates how long
that portion took.

### View a screenshot {: #view-screenshot }

See [Capture screenshots while recording][25] to learn how to enable screenshots.

Hover over the **Overview** to view a screenshot of how the page looked during that moment of the
recording. The **Overview** is the section that contains the **CPU**, **FPS**, and **NET** charts.

{% Img src="image/admin/kEHMCIm7hnRwi1Zu02ej.png", alt="Viewing a screenshot.", width="800", height="658" %}

You can also view screenshots by clicking a frame in the **Frames** section. DevTools displays a
small version of the screenshot in the **Summary** tab.

{% Img src="image/admin/4eReOueadJ28sws2OXmI.png", alt="Viewing a screenshot in the Summary tab.", width="800", height="851" %}

The example above shows the screenshot for the `195.5ms` frame in the **Summary** tab when you click on it in the **Frames** section.

Click the thumbnail in the **Summary** tab to zoom in on the screenshot.

{% Img src="image/admin/IRCF7raB4ms6clXaJ1ma.png", alt="Zooming in on a screenshot from the Summary tab.", width="800", height="851" %}

The example above shows a zoomed-in screenshot after you click its thumbnail in the **Summary** tab.

### View layers information {: #layers }

To view advanced layers information about a frame:

1.  [Enable advanced paint instrumentation][26].
2.  Select a frame in the **Frames** section. DevTools displays information about its layers in the
    new **Layers** tab, next to the **Event Log** tab.

{% Img src="image/admin/gJFELbc08PJ13f3QMSeF.png", alt="The Layers tab.", width="800", height="758" %}

Hover over a layer to highlight it in the diagram.

{% Img src="image/admin/22v3FsuWbI5rLiU8sEUs.png", alt="Highlighting a layer.", width="800", height="689" %}

The example above shows the layer **#39** highlighted as you hover over it.

To move the diagram:

- Click **Pan Mode** {% Img src="image/admin/M00j8zOIaeKAJ0jLqyOU.png", alt="Pan Mode.", width="32", height="32" %}
  to move along the X and Y axes.
- Click **Rotate Mode**
  {% Img src="image/admin/QfAWp7e0kuhmVzOwJY28.png", alt="Rotate Mode.", width="32", height="32" %} to rotate
  along the Z axis.
- Click **Reset Transform** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5SunRxvT1B8Zmp4iOKk7.png", alt="Reset Transform.", width="30", height="30" %}
  to reset the diagram to its original position.

See layer analysis in action:

{% YouTube id="6je49J67TQk" %}

### View paint profiler {: #paint-profiler }

To view advanced information about a paint event:

1.  [Enable advanced paint instrumentation][27].
2.  Select a **Paint** event in the **Main** section.

{% Img src="image/admin/ljSjIYcsNHLsNj6JQO9J.png", alt="The Paint Profiler tab.", width="800", height="713" %}

## Analyze rendering performance with the Rendering tab {: #rendering }

Use the **Rendering** tab's features to help visualize your page's rendering performance.

[Open the **Rendering** tab](/docs/devtools/rendering#open-rendering).

### View frames per second in real time with the FPS meter {: #fps-meter }

The **Frame rendering stats** is an overlay that appears in the top-right corner of your viewport. It provides a real time estimate of FPS as the page runs.

See [Frame rendering stats](/docs/devtools/rendering#frame-rendering-stats).

### View painting events in real time with Paint Flashing {: #paint-flash }

Use **Paint Flashing** to get a real time view of all paint events on the page.

See [Paint flashing](/docs/devtools/rendering#paint-flashing).

### View an overlay of layers with Layer Borders {: #layer-border }

Use **Layer Borders** to view an overlay of layer borders and tiles on top of the page.

See [Layer borders](/docs/devtools/rendering#layer-borders).

### Find scroll performance issues in real time {: scrolling-performance-issues }

Use **Scrolling Performance Issues** to identify elements of the page that have event listeners related to scrolling that may harm the performance of the page. DevTools outlines the
potentially-problematic elements in teal.

See [Scrolling performance issues](/docs/devtools/rendering#scrolling-performance-issues).

[1]: /docs/devtools/evaluate-performance
[2]: #view-screenshot
[3]: #settings
[4]: #settings
[5]: #settings
[6]: #settings
[7]: #layers
[8]: #paint-profiler
[9]: #record-runtime
[10]: #record-load
[11]: #disable-js-samples
[12]: #call-tree
[13]: #bottom-up
[14]: #event-log
[15]: https://activitytabs.glitch.me/
[16]: https://glitch.com/edit/#!/activitytabs?path=index.html
[17]: #call-tree
[18]: #root-activities
[19]: #select
[20]: #select
[21]: #select
[22]: #fps-chart
[23]: #frames
[24]: #fps-meter
[25]: #screenshots
[26]: #paint
[27]: #paint
[28]: /docs/devtools/command-menu/
[29]: #rendering
[30]: #rendering
[31]: #rendering
[33]: #rendering
