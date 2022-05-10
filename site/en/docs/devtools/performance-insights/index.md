---
layout: "layouts/doc-post.njk"
title: "Performance insights: Get actionable insights on your website's performance"
authors:
  - jecelynyeen
date: 2022-03-29
description: "Get actionable insights on your website's performance with the Performance insights panel."
tags:
  - performance
---

Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance.

{% YouTube id='5PFmGeCZDvw' %}

{% Aside %}
This is a preview feature in Chrome 102. Our team is actively working on this feature and we are looking for your [feedback](https://goo.gle/perf-insights-feedback) for further enhancements. 
{% endAside %}


## Why a new panel? 

The new **Performance insights** panel is an experiment to address these 3 developer pain points when working with the existing **Performance** panel:

- **Too much information**. With the redesigned UI, the **Performance insights** panel streamlines the data shown on screen, displaying only relevant information. 
- **Hard to distinguish between use cases**. The **Performance insights** panel supports use-case-driven analysis. It only supports page load use-case at the moment, with more to come (e.g. interactivity) in the future based on your [feedback](https://crbug.com/1270700).
- **Requires deep expertise of how browsers work to use effectively**. The **Performance insights** panel highlights the key insights in the **Insights** pane, with actionable feedback on how to fix it.


## Introduction {: #intro }

This tutorial teaches you how to measure and understand your page load performance with the **Performance insights** panel. Read on, or watch the video version of this tutorial, above.


## Open the Performance insights panel {: #open }

1. [Open DevTools](/docs/devtools/open).
2. Click on **More options** &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **More tools** > **Performance insights**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OSQCgZjkCebnA86xBaZj.png", alt="Performance insights in the menu", width="800", height="558" %}

    Alternatively, use the [Command Menu](/docs/devtools/command-menu/) to open the **Performance insights** panel.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ARGYTwxT4iMzcWxQUSJa.png", alt="Show Performance insights command in the Command menu", width="800", height="558" %}


## Record performance {: #record }

The **Performance insights** panel supports record general and use-case-driven (e.g. page load) performance.

1. Click [Open Demo]. The demo opens in a new tab. [Open Demo](https://coffee-cart.netlify.app/?ad=1)
2. You can throttle the network and CPU while recording. For the tutorial, let’s set **disable cache** and set **CPU to 4x slowdown**:

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZcatuTY8eettWFRbBxVf.png", alt="Throttling", width="800", height="489" %}
  
    {% Aside 'gotchas' %}
    Throttling is relative to your computer's capabilities. For example, the 4x slowdown option makes your CPU operate 4 times slower than its usual ability. DevTools can't truly simulate the CPUs of mobile devices, because the architecture of mobile devices is very different from that of desktops and laptops.
    {% endAside %} 

3. Click **Measure page load**. DevTools records performance metrics while the page reloads and then automatically stops the recording a couple seconds after the page load has finished.
    
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/z24Hl8VhBVetZUNHIGms.png", alt="Start options", width="800", height="489" %}

    {% Aside 'gotchas' %}
    If you want to measure general performance of your web page, use **Start recording**. Interact with the page and click **Stop recording** manually to stop recording. 
    {% endAside %}


## Replay a performance recording {: #replay }

Use the controls at the bottom to control the replay of your recording.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XJqWjxuD2e58MBnSniIS.png", alt="replay controls", width="800", height="489" %}

Here is an example of how to do it.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/VBbc5OLPefRvxs29Cxqy.mp4", controls="true", muted="true", class="screenshot" %}

- Click **Play** to play the recording.
- Click **Pause** to pause the replay.
- Adjust the **playback speed** with the dropdown. 
- Click **Toggle visual preview** to show or hide the visual preview. 


## Navigate a performance recording {: #navigate }

DevTools automatically zooms out to show the full recording timeline. You can navigate the recording with zoom and move the timeline. 

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aiNxjBK2fBr76NKHfMoA.mp4", controls="true", muted="true", class="screenshot" %}

- Click on the **Timeline** to move the playhead to view a particular frame.
- Use the **Zoom in** and **Zoom out** control at the bottom to zoom.
- Drag the horizontal scroll bar at the bottom to move the timeline left and right.
- Alternatively, you can use **keyboard shortcuts** to zoom, move the timeline left and right. Click on the **?** button to view the shortcuts.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pcg1vz3JvbvhT2pyhGgg.png", alt="keyboard shortcuts", width="800", height="489" %}


## View performance insights {: #insights }

Get a list of performance insights in the **Insights** pane. Identify and fix potential performance issues.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/82lFXlEKTXT0a1iCiKMV.png", alt="Insights pane", width="800", height="489" %}

Hover over each of the insights to highlight them on the main tracks.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/FXl6y9hXBJNXsOLgLPft.mp4", controls="true", muted="true", class="screenshot" %}

Click on an insight (e.g. Rendering block request) to understand it further in the **Details** pane - **source file**, **issue**, **how to fix** it and more. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bHHoPGrJHuHPbRYOWWwd.png", alt="Insight details", width="800", height="489" %}


## View Web Vitals performance metrics {: #vitals }

[Web Vitals](https://web.dev/vitals/) is is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

You can view these metrics on the **Timeline** and **Insights** pane.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TP6Gt2laW0748JxVYta0.png", alt="View Web Vitals performance metrics", width="800", height="578" %}

Hover over the insights on the **Timeline** to learn more about the metrics.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/23onsIV7BvDJpMI4mnMZ.mp4", controls="true", muted="true", class="screenshot" %}


## View layout shifts activity {: #layout-shifts }

View layout shifts activity in the **Layout Shifts** track. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ronEnmKW9Xh4h8YLdVWN.png", alt="Layout Shifts track", width="800", height="491" %}

Layout shifts are grouped in [session window](https://web.dev/evolving-cls/?utm_source=devtools#why-a-session-window). In the example above, there are 2 session windows. There are gaps between session windows. 

{% Aside 'gotchas' %}
Think about layout shifts like fireworks, there are times where multiple shifts happen at once, then it pauses for a while, and multiple shifts happen. Each set of multiple shifts is a session window. For more information, see [Session window](https://web.dev/evolving-cls/?utm_source=devtools#why-a-session-window).
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uN8y6gdUU8QdmAREPtJ.png", alt="session window and gap", width="800", height="491" %}

[Cumulative Layout Shifts (CLS)](https://web.dev/cls) is one of the [core web vitals](https://web.dev/vitals/#core-web-vitals) metrics. Use the **Layout Shifts** track to identify potential layout shifts issues and causes.

Always start with the largest session window when improving CLS metric. In our example, session window 1 is the largest session window, based on the background color and level.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wgpE2wbqPMVbrcGcnFQD.png", alt="CLS", width="800", height="491" %}

Click on a screenshot to view the layout shift’s details, identify potential root causes and impacted elements.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/T7laY8CqS5kMMowwjwOH.png", alt="View the layout shift’s details", width="800", height="523" %}

In our example, the potential root cause is **unsized media**. See [Optimize Cumulative Layout Shift](​​https://web.dev/optimize-cls/#images-without-dimensions) to learn more about how to fix it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0eqkyM3nRWQIuWzQACHZ.png", alt="identify potential root causes", width="800", height="532" %}


### Understand layout shifts score {: #session-window }

In the **Details** pane, use the **Window** section to understand how the scores are calculated. The **Window** shows which session window the current layout shift belongs to.

The maximum score of each layout shift is 1, if the whole page is shifted. In our example, the first layout shift scored 0.15. The second layout shift scored 0.041.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/biYiq5w9QLOO0tLUyjh5.png", alt="Understand layout shifts score", width="800", height="429" %}

The total score for this session window is 0.19. Based on the CLS threshold, it needs improvement. The session window background color reflects the same.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qLAsAvXRANlaPjrNwtcG.png", alt="CLS threshold", width="800", height="212" %}

The session window background graph is increased over time. It is reflect the **cumulative score** of the layout shift at that point of time.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8sVRDJwUfiSJYVTBOkja.png", alt="session window background graph", width="800", height="429" %}


## View network activity {: #network }

View network activity in the **Network** track. You can expand the network track to view all the network activities and click on each item to view the details.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/19WF9xHELpG7ukNw1er6.png", alt="View network activity", width="800", height="421" %}


## View renderer activity {: #renderer }

View render activity in the **Renderer** track. You can expand each renderer to view the activities and click on each item to view the details.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YSdG7s6Na8XX8J2WSaNl.png", alt="View renderer activity", width="800", height="485" %}


## View GPU activity {: #gpu }

View GPU activity in the **GPU** track. The GPU track is hidden by default, enabling that in the [settings](/#settings). 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XLah7eTk4W8FlgzWONdU.png", alt="View GPU activity", width="800", height="377" %}


## Customize the UI {: #settings }

Click **Settings** to customize the **Timeline** and **Tracks**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OM4ZXcVtZ9QP8TGcHzCQ.png", alt="Settings", width="800", height="485" %}


## Export a recording {: #export }

To save a recording, click **Export**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UbdPV1X36eIjmet87lXL.png", alt="Export a recording", width="800", height="489" %}


## Import a recording {: #import }

To load a recording, select **Import**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FiBWU3KlqdXkQaMPTWp5.png", alt="Import a recording", width="800", height="489" %}


## Delete a recording {: #delete }

After making a recording, press **Delete** to clear that recording from the panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QhKTWlPVACLINviDp4GL.png", alt="Delete the recording", width="800", height="489" %}
