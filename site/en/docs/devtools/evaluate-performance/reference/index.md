---
layout: "layouts/doc-post.njk"
title: "Performance features reference"
authors:
  - kaycebasques
date: 2017-05-08
#updated: YYYY-MM-DD
description: "A reference on all the ways to record and analyze performance in Chrome DevTools."
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
3.  Click **Record** {% Img src="image/admin/Re0KNyMRmkswFBpNYVW3.png", alt="Record", width="24", height="24" %}.

    {% Img src="image/admin/Vkr4jM5q0MAgLIvGyG35.svg", alt="Record", width="800", height="468" %}

    **Figure 1**. **Record**, outlined in blue

4.  Interact with the page. DevTools records all page activity that occurs as a result of your
    interactions.
5.  Click **Record** again or click **Stop** to stop recording.

### Record load performance {: #record-load }

Record load performance when you want to analyze the performance of a page as it's loading, as
opposed to running.

1.  Go to the page that you want to analyze.
2.  Open the **Performance** panel of DevTools.
3.  Click **Reload page**
    {% Img src="image/admin/LLUc63dXLxWMXnoL8kyr.png", alt="Reload Page", width="24", height="25" %}. DevTools
    records performance metrics while the page reloads and then automatically stops the recording a
    couple seconds after the load finishes.

    {% Img src="image/admin/lKfrmjzS0hQHvgk425kL.svg", alt="Reload page", width="800", height="468" %}

    **Figure 2**. **Reload page**, outlined in blue

DevTools automatically zooms in on the portion of the recording where most of the activity occurred.

{% Img src="image/admin/MQaqMsLSnCfpnjt0C4xk.png", alt="A page-load recording", width="800", height="857" %}

**Figure 3**. A page-load recording

### Capture screenshots while recording {: #screenshots }

Enable the **Screenshots** checkbox to capture a screenshot of every frame while recording.

{% Img src="image/admin/bgBdzp23tsgMHIYVMVNJ.svg", alt="The Screenshots checkbox", width="800", height="468" %}

**Figure 4**. The **Screenshots** checkbox

See [View a screenshot][2] to learn how to interact with screenshots.

### Force garbage collection while recording {: #garbage }

While you are recording a page, click **Collect garbage**
{% Img src="image/admin/3pKYmus2h5cTtgSeGSDj.png", alt="Collect garbage", width="18", height="28" %} to
force garbage collection.

{% Img src="image/admin/TpDkcFuP46PR2f3ViVWM.svg", alt="Collect garbage", width="800", height="468" %}

**Figure 5**. Collect garbage, outlined in blue

### Show recording settings {: #settings }

Click **Capture settings**
{% Img src="image/admin/AVbUTcyBdsQDHOGJrYtO.png", alt="Capture settings", width="28", height="28" %} to
expose more settings related to how DevTools captures performance recordings.

{% Img src="image/admin/oMrzdv4yCX3nNYXXxyiO.svg", alt="The Capture Settings section", width="800", height="583" %}

**Figure 6**. The **Capture settings** section, outlined in blue

### Disable JavaScript samples {: #disable-js-samples }

By default, the **Main** section of a recording displays detailed call stacks of JavaScript
functions that were called during the recording. To disable these call stacks:

1.  Open the **Capture settings** menu. See [Show recording settings][3].
2.  Enable the **Disable JavaScript Samples** checkbox.
3.  Take a recording of the page.

Figure 7 and Figure 8 show the difference between disabling and enabling JavaScript samples. The
**Main** section of the recording is much shorter when sampling is disabled, because it omits all of
the JavaScript call stacks.

{% Img src="image/admin/ggxgXYwyRlwqZ64RQjYR.png", alt="An example of a recording when JS samples are disabled", width="800", height="626" %}

**Figure 7**. An example of a recording when JS samples are disabled

{% Img src="image/admin/mDRqRgX1BgCgS3UjWSzm.png", alt="An example of a recording when JS samples are enabled", width="800", height="781" %}

**Figure 8**. An example of a recording when JS samples are enabled

### Throttle the network while recording {: #network-throttle }

To throttle the network while recording:

1.  Open the **Capture settings** menu. See [Show recording settings][4].
2.  Set **Network** to the desired level of throttling.

### Throttle the CPU while recording {: #cpu-throttle }

To throttle the CPU while recording:

1.  Open the **Capture settings** menu. See [Show recording settings][5].
2.  Set **CPU** to the desired level of throttling.

Throttling is relative to your computer's capabilities. For example, the **2x slowdown** option
makes your CPU operate 2 times slower than its usual ability. DevTools can't truly simulate the CPUs
of mobile devices, because the architecture of mobile devices is very different from that of
desktops and laptops.

### Enable advanced paint instrumentation {: #paint }

To view detailed paint instrumentation:

1.  Open the **Capture settings** menu. See [Show recording settings][6].
2.  Check the **Enable advanced paint instrumentation** checkbox.

To learn how to interact with the paint information, see [View layers][7] and [View paint
profiler][8].

## Save a recording {: #save }

To save a recording, right-click and select **Save Profile**.

{% Img src="image/admin/u2XWglmRCUs83vxv3fFK.png", alt="Save Profile", width="800", height="600" %}

**Figure 9**. **Save Profile**

## Load a recording {: #load }

To load a recording, right-click and select **Load Profile**.

{% Img src="image/admin/nz7lFM4urJs2IGwtosdm.png", alt="Load Profile", width="800", height="587" %}

**Figure 10**. **Load Profile**

## Clear the previous recording {: #clear }

After making a recording, press **Clear recording**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mEMdGoChkUDgRIowaEu1.png", alt="Clear recording", width="26", height="26" %}
to clear that recording from the **Performance** panel.

{% Img src="image/admin/KDg1wSCNTs4Ts3qQN0gy.svg", alt="Clear recording", width="800", height="547" %}

**Figure 11**. Clear recording, outlined in blue

## Analyze a performance recording {: #analyze }

After you [record runtime performance][9] or [record load performance][10], the **Performance**
panel provides a lot of data for analyzing the performance of what just happened.

### Select a portion of a recording {: #select }

Drag your mouse left or right across the **Overview** to select a portion of a recording. The
**Overview** is the section that contains the **FPS**, **CPU**, and **NET** charts.

{% Img src="image/admin/CvbTzzqLPqoCfo0vJ8UE.gif", alt="Dragging the mouse across the Overview to zoom", width="800", height="546" %}

**Figure 12**. Dragging the mouse across the Overview to zoom

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

{% Img src="image/admin/bDTtPmR7htQFD82qG0Mp.png", alt="The search box", width="800", height="586" %}

**Figure 13**. Using regex in the search box at the bottom of the window to find any activity that
begins with `E`

To navigate activities that match your query:

- Use the **Previous**
  {% Img src="image/admin/4IX7ufjSOK30gfolntm4.png", alt="Previous", width="34", height="36" %} and **Next**
  {% Img src="image/admin/podVrMNQX4eE0cNLfarR.png", alt="Next", width="34", height="36" %} buttons.
- Press Shift+Enter to select the previous or Enter to select the next.

To modify query settings:

- Press **Case sensitive**
  {% Img src="image/admin/PZvAN15LZnGb1fGFzr53.png", alt="Case sensitive", width="31", height="19" %} to make
  the query case sensitive.
- Press **Regex** {% Img src="image/admin/klPyk4dJ7YIwumZTOqOp.png", alt="Regex", width="17", height="18" %} to
  use a regular expression in your query.

To hide the search box, press **Cancel**.

### View main thread activity {: #main }

Use the **Main** section to view activity that occurred on the page's main thread.

{% Img src="image/admin/xNyVAPQQVzJ6WAehsum5.svg", alt="The Main section", width="800", height="662" %}

**Figure 14**. The **Main** section, outlined in blue

Click on an event to view more information about it in the **Summary** tab. DevTools outlines the
selected event in blue.

{% Img src="image/admin/8R1ZWSovI8pMUgylpZpJ.png", alt="More information about a main thread event in the Summary tab", width="800", height="869" %}

**Figure 15**. More information about the `Me` function call event in the **Summary** tab

DevTools represents main thread activity with a flame chart. The x-axis represents the recording
over time. The y-axis represents the call stack. The events on top cause the events below it.

{% Img src="image/admin/9GggXOXYnbx2DVeZ3Fa1.png", alt="A flame chart", width="800", height="893" %}

**Figure 16**. A flame chart in the **Main** section

In Figure 16, a `click` event caused a function call in `script_foot_closure.js` on line 53. Below
`Function Call` you see that an anonymous function was called. That anonymous function then called
`Me()`, which then called `Se()`, and so on.

DevTools assigns scripts random colors. In Figure 16, function calls from one script are colored
light green. Calls from another script are colored beige. The darker yellow represents scripting
activity, and the purple event represents rendering activity. These darker yellow and purple events
are consistent across all recordings.

See [Disable JavaScript samples][11] if you want to hide the detailed flame chart of JavaScript
calls. When JS samples are disabled, you only see high-level events such as `Event (click)` and
`Function Call (script_foot_closure.js:53)` from Figure 16.

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

{% Aside %}

**Note:** The next three sections all refer to the same demo. You can run the demo yourself at
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

{% Img src="image/admin/OjSICzOrejsaGYTysG7u.png", alt="The Call Tree tab", width="800", height="863" %}

**Figure 17**. The **Call Tree** tab

In Figure 17, the top-level of items in the **Activity** column, such as `Event`, `Paint`, and
`Composite Layers` are root activities. The nesting represents the call stack. For example, in
Figure 17, `Event` caused `Function Call`, which caused `button.addEventListener`, which caused `b`,
and so on.

**Self Time** represents the time directly spent in that activity. **Total Time** represents the
time spent in that activity or any of its children.

Click **Self Time**, **Total Time**, or **Activity** to sort the table by that column.

Use the **Filter** text box to filter events by activity name.

By default the **Grouping** menu is set to **No Grouping**. Use the **Grouping** menu to sort the
activity table based on various criteria.

Click **Show Heaviest Stack**
{% Img src="image/admin/QGgcONKJoO4kVtKreJY3.png", alt="Show Heaviest Stack", width="30", height="26" %}
to reveal another table to the right of the **Activity** table. Click on an activity to populate the
**Heaviest Stack** table. The **Heaviest Stack** table shows you which children of the selected
activity took the longest time to execute.

#### The Bottom-Up tab {: #bottom-up }

Use the **Bottom-Up** tab to view which activities directly took up the most time in aggregate.

The **Bottom-Up** tab only displays activities during the selected portion of the recording. See
[Select a portion of a recording][20] to learn how to select portions.

{% Img src="image/admin/m5ooBRBaQ4MLXmjeLgYR.png", alt="The Bottom-Up tab", width="800", height="879" %}

**Figure 18**. The **Bottom-Up** tab

In the **Main** section flame chart of Figure 18, you can see that almost practically all of the
time was spent executing the three calls to `wait()`. Accordingly, the top activity in the
**Bottom-Up** tab of Figure 18 is `wait`. In the flame chart of Figure 18, the yellow below the
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

{% Img src="image/admin/ErnVsmtVYqnc9awGTY5n.png", alt="The Event Log tab", width="800", height="826" %}

**Figure 19**. The **Event Log** tab

The **Start Time** column represents the point at which that activity started, relative to the start
of the recording. For example, the start time of `1573.0 ms` for the selected item in Figure 19
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

### View GPU activity {: #gpu }

View GPU activity in the **GPU** section.

{% Img src="image/admin/zOL3E4TTppXz4o0appWw.svg", alt="The GPU section", width="800", height="660" %}

**Figure 20**. The **GPU** section, outlined in blue

### View raster activity {: #raster }

View raster activity in the **Raster** section.

{% Img src="image/admin/MjviwXOVytHRom3xDsDi.svg", alt="The Raster section", width="800", height="709" %}

**Figure 21**. The **Raster** section, outlined in blue

### View interactions {: #interactions }

Use the **Interactions** section to find and analyze user interactions that happened during the
recording.

{% Img src="image/admin/RLvocLiAoWSxDrSIM0U8.svg", alt="The Interactions section", width="800", height="816" %}

**Figure 22**. The **Interactions** section, outlined in blue

A red line at the bottom of an interaction represents time spent waiting for the main thread.

Click an interaction to view more information about it in the **Summary** tab.

### Analyze frames per second (FPS) {: #fps }

DevTools provides numerous ways to analyze frames per second:

- Use [the **FPS** chart][22] to get an overview of FPS over the duration of the recording.
- Use [the **Frames** section][23] to view how long a particular frame took.
- Use the **FPS meter** for a realtime estimate of FPS as the page runs. See [View frames per second
  in realtime with the FPS meter][24].

#### The FPS chart {: #fps-chart }

The **FPS** chart provides an overview of the frame rate across the duration of a recording. In
general, the higher the green bar, the better the frame rate.

A red bar above the **FPS** chart is a warning that the frame rate dropped so low that it probably
harmed the user's experience.

{% Img src="image/admin/DRy9iQ4PlKbu568jEQxD.svg", alt="The FPS chart", width="800", height="530" %}

**Figure 20**. The FPS chart, outlined in blue

#### The Frames section {: #frames }

The **Frames** section tells you exactly how long a particular frame took.

Hover over a frame to view a tooltip with more information about it.

{% Img src="image/admin/MX9kRvaRf3DqfkZAgoTq.png", alt="Hovering over a frame", width="800", height="542" %}

**Figure 21**. Hovering over a frame

Click on a frame to view even more information about the frame in the **Summary** tab. DevTools
outlines the selected frame in blue.

{% Img src="image/admin/0eNKIn4DCCUo0A1GsA8R.png", alt="Viewing a frame in the Summary tab", width="800", height="596" %}

**Figure 22**. Viewing a frame in the **Summary** tab

### View network requests {: #network }

Expand the **Network** section to view a waterfall of network requests that occurred during the
recording.

{% Img src="image/admin/ZkpNSWGs2csexM9Mo7GO.svg", alt="The Network section", width="800", height="950" %}

**Figure 23**. The **Network** section, outlined in blue

Requests are color-coded as follows:

- HTML: Blue
- CSS: Purple
- JS: Yellow
- Images: Green

Click on a request to view more information about it in the **Summary** tab. For example, in Figure
23 the **Summary** tab is displaying more information about the blue request that's selected in the
**Network** section.

A darker-blue square in the top-left of a request means it's a higher-priority request. A
lighter-blue square means lower-priority. For example, in Figure 23 the blue, selected request is
higher-priority, and the green one above it is lower-priority.

In Figure 24, the request for `www.google.com` is represented by a line on the left, a bar in the
middle with a dark portion and a light portion, and a line on the right. Figure 25 shows the
corresponding representation of the same request in the **Timing** tab of the **Network** panel.
Here's how these two representations map to each other:

- The left line is everything up to the `Connection Start` group of events, inclusive. In other
  words, it's everything before `Request Sent`, exclusive.
- The light portion of the bar is `Request Sent` and `Waiting (TTFB)`.
- The dark portion of the bar is `Content Download`.
- The right line is essentially time spent waiting for the main thread. This is not represented in
  the **Timing** tab.

{% Img src="image/admin/IHFdgHMSSdVjrKkbknOM.png", alt="The line-bar representation of the www.google.com request", width="800", height="603" %}

**Figure 24**. The line-bar representation of the `www.google.com` request

{% Img src="image/admin/0tmyrwYEZd27ej4gw0UM.png", alt="The Network section", width="800", height="831" %}

**Figure 25**. The **Timing** tab representation of the `www.google.com` request

### View memory metrics {: #memory }

Enable the **Memory** checkbox to view memory metrics from the last recording.

{% Img src="image/admin/RKJIxxwVnBj5ivVjvMtI.svg", alt="The Memory checkbox", width="800", height="468" %}

**Figure 26**. The **Memory** checkbox, outlined in blue

DevTools displays a new **Memory** chart, above the **Summary** tab. There's also a new chart below
the **NET** chart, called **HEAP**. The **HEAP** chart provides the same information as the **JS
Heap** line in the **Memory** chart.

{% Img src="image/admin/dgmYH2RBKH2M2Ej0gaXO.png", alt="Memory metrics", width="800", height="493" %}

**Figure 27**. Memory metrics, above the **Summary** tab

The colored lines on the chart map to the colored checkboxes above the chart. Disable a checkbox to
hide that category from the chart.

The chart only displays the region of the recording that is currently selected. For example, in
Figure 27, the **Memory** chart is only showing memory usage for the start of the recording, up to
around the 1000ms mark.

### View the duration of a portion of a recording {: #duration }

When analyzing a section like **Network** or **Main**, sometimes you need a more precise estimate of
how long certain events took. Hold Shift, click and hold, and drag left or right to select a portion
of the recording. At the bottom of your selection, DevTools shows how long that portion took.

{% Img src="image/admin/ywM6ZNwJARqChcDXyR8W.png", alt="Viewing the duration of a portion of a recording", width="800", height="606" %}

**Figure 28**. The `488.53ms` timestamp at the bottom of the selected portion indicates how long
that portion took

### View a screenshot {: #view-screenshot }

See [Capture screenshots while recording][25] to learn how to enable screenshots.

Hover over the **Overview** to view a screenshot of how the page looked during that moment of the
recording. The **Overview** is the section that contains the **CPU**, **FPS**, and **NET** charts.

{% Img src="image/admin/kEHMCIm7hnRwi1Zu02ej.png", alt="Viewing a screenshot", width="800", height="658" %}

**Figure 29**. Viewing a screenshot

You can also view screenshots by clicking a frame in the **Frames** section. DevTools displays a
small version of the screenshot in the **Summary** tab.

{% Img src="image/admin/4eReOueadJ28sws2OXmI.png", alt="Viewing a screenshot in the Summary tab", width="800", height="851" %}

**Figure 30**. After clicking the `195.5ms` frame in the **Frames** section, the screenshot for that
frame is displayed in the **Summary** tab

Click the thumbnail in the **Summary** tab to zoom in on the screenshot.

{% Img src="image/admin/IRCF7raB4ms6clXaJ1ma.png", alt="Zooming in on a screenshot from the Summary tab", width="800", height="851" %}

**Figure 31**. After clicking the thumbnail in the **Summary** tab, DevTools zooms in on the
screenshot

### View layers information {: #layers }

To view advanced layers information about a frame:

1.  [Enable advanced paint instrumentation][26].
2.  Select a frame in the **Frames** section. DevTools displays information about its layers in the
    new **Layers** tab, next to the **Event Log** tab.

{% Img src="image/admin/gJFELbc08PJ13f3QMSeF.png", alt="The Layers tab", width="800", height="758" %}

**Figure 32**. The **Layers** tab

Hover over a layer to highlight it in the diagram.

{% Img src="image/admin/22v3FsuWbI5rLiU8sEUs.png", alt="Highlighting a layer", width="800", height="689" %}

**Figure 33**. Highlighting layer **#39**

To move the diagram:

- Click **Pan Mode** {% Img src="image/admin/M00j8zOIaeKAJ0jLqyOU.png", alt="Pan Mode", width="32", height="32" %}
  to move along the X and Y axes.
- Click **Rotate Mode**
  {% Img src="image/admin/QfAWp7e0kuhmVzOwJY28.png", alt="Rotate Mode", width="32", height="32" %} to rotate
  along the Z axis.
- Click **Reset Transform** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5SunRxvT1B8Zmp4iOKk7.png", alt="Reset Transform", width="30", height="30" %}
  to reset the diagram to its original position.

See layer analysis in action:

{% YouTube id="6je49J67TQk" %}

### View paint profiler {: #paint-profiler }

To view advanced information about a paint event:

1.  [Enable advanced paint instrumentation][27].
2.  Select a **Paint** event in the **Main** section.

{% Img src="image/admin/ljSjIYcsNHLsNj6JQO9J.png", alt="The Paint Profiler tab", width="800", height="713" %}

**Figure 34**. The **Paint Profiler** tab

## Analyze rendering performance with the Rendering tab {: #rendering }

Use the **Rendering** tab's features to help visualize your page's rendering performance.

To open the **Rendering** tab:

1.  Open the [Command Menu][28].
2.  Start typing `Rendering` and select `Show Rendering`. DevTools displays the **Rendering** tab at
    the bottom of your DevTools window.

{% Img src="image/admin/hBtfLDNsBbr9vJhy4GHr.png", alt="The Rendering tab", width="800", height="687" %}

**Figure 35**. The **Rendering** tab

### View frames per second in realtime with the FPS meter {: #fps-meter }

The **FPS meter** is an overlay that appears in the top-right corner of your viewport. It provides a
realtime estimate of FPS as the page runs. To open the **FPS meter**:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][29].
2.  Enable the **FPS Meter** checkbox.

{% Img src="image/admin/ztC0PRZRr0tczy4jqrxq.png", alt="The FPS meter", width="800", height="593" %}

**Figure 36**. The FPS meter

### View painting events in realtime with Paint Flashing {: #paint-flashing }

Use Paint Flashing to get a realtime view of all paint events on the page. Whenever a part of the
page gets re-painted, DevTools outlines that section in green.

To enable Paint Flashing:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][30].
2.  Enable the **Paint Flashing** checkbox.

{% Img src="image/admin/AKUsdeRRaSFncCF94ap5.gif", alt="Paint Flashing", width="800", height="322" %}

**Figure 37**. **Paint Flashing**

### View an overlay of layers with Layer Borders {: #layer-borders }

Use **Layer Borders** to view an overlay of layer borders and tiles on top of the page.

To enable Layer Borders:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][31].
2.  Enable the **Layer Borders** checkbox.

{% Img src="image/admin/FAgzk3UUc2WZC5i28X9f.png", alt="Layer Borders", width="800", height="515" %}

**Figure 38**. **Layer Borders**

See the comments in [`debug_colors.cc`][32] for an explanation of the color-codings.

### Find scroll performance issues in realtime {: #scrolling-performance-issues }

Use Scrolling Performance Issues to identify elements of the page that have event listeners related
to scrolling that may harm the performance of the page. DevTools outlines the
potentially-problematic elements in teal.

To view scroll performance issues:

1.  Open the **Rendering** tab. See [Analyze rendering performance with the Rendering tab][33].
2.  Enable the **Scrolling Performance Issues** checkbox.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NH12bctPHXR9VD9GO7ov.png", alt="Scrolling Performance Issues is indicating that there's a mousewheel event listener encompassing the entire viewport that may harm scroll performance", width="800", height="498" %}

**Figure 39**. **Scrolling Performance Issues** is indicating that there's a `mousewheel` event
listener encompassing the entire viewport that may harm scroll performance

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
[32]: https://cs.chromium.org/chromium/src/cc/debug/debug_colors.cc
[33]: #rendering
