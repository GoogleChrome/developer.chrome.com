---
layout: "layouts/doc-post.njk"
title: "Performance insights: Get actionable insights on your website's performance"
authors:
  - jecelynyeen
  - sofiayem
date: 2022-03-29
updated: 2022-07-22
description: "Get actionable insights on your website's performance with the Performance insights panel."
tags:
  - performance
---

Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance.

{% Aside 'note' %}
This feature is available only in Chrome, not Chromium.
{% endAside %}

{% YouTube id='5PFmGeCZDvw' %}

{% Aside %}
This is a preview feature in Chrome 102. Our team is actively working on this feature and we are looking for your [feedback](https://goo.gle/perf-insights-feedback) for further enhancements. 
{% endAside %}


## Why a new panel? 

The new **Performance insights** panel is an experiment to address these 3 developer pain points when working with the existing **Performance** panel:

- **Too much information**. With the redesigned UI, the **Performance insights** panel streamlines the data and displays only relevant information.
- **Hard to distinguish between use cases**. The **Performance insights** panel supports use-case-driven analysis. It only supports page load use-case at the moment, with more to come in the future based on your [feedback](https://crbug.com/1270700), for example, [interactivity](https://web.dev/inp).
- **Requires deep expertise of how browsers work to use effectively**. The **Performance insights** panel highlights the key insights in the **Insights** pane, with actionable feedback on how to fix issues.


## Introduction {: #intro }

This tutorial teaches you how to measure and understand your page load performance with the **Performance insights** panel. Continue reading or watch the video version of this tutorial above.


## Open the Performance insights panel {: #open }

1. [Open DevTools](/docs/devtools/open).
2. Click on **More options** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More.", width="24", height="24" %} > **More tools** > **Performance insights**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OSQCgZjkCebnA86xBaZj.png", alt="Performance insights in the menu.", width="800", height="558" %}

    Alternatively, use the [Command Menu](/docs/devtools/command-menu/) to open the **Performance insights** panel.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ARGYTwxT4iMzcWxQUSJa.png", alt="Show Performance insights command in the Command menu.", width="800", height="558" %}


## Record performance {: #record }

The **Performance insights** panel can record general and use-case-driven (for example, page load) performance.

1. [Open this demo page](https://coffee-cart.app/?ad=1) in a new tab and, on the page, [open the Performance insights panel](#open).
2. You can throttle the network and CPU while recording. For this tutorial, check **Disable cache** and set **CPU** to **4x slowdown** in the drop-down menu:

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZcatuTY8eettWFRbBxVf.png", alt="Throttling.", width="800", height="489" %}
  
    {% Aside 'gotchas' %}
    Throttling is relative to your computer's capabilities. For example, the 4x slowdown option makes your CPU operate 4 times slower than usual. DevTools can't truly simulate the CPUs of mobile devices because the architecture of mobile devices is very different from that of desktops and laptops.
    {% endAside %} 

3. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} **Measure page load**. DevTools records performance metrics while the page reloads and then automatically stops the recording a couple seconds after the page load has finished.
    
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/z24Hl8VhBVetZUNHIGms.png", alt="Start options.", width="800", height="489" %}

    {% Aside 'gotchas' %}
    If you want to measure general performance of your web page, use **Start recording**. Interact with the page and click **Stop recording** manually to stop recording. 
    {% endAside %}


## Replay a performance recording {: #replay }

Use the controls at the bottom to control the replay of your recording.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XJqWjxuD2e58MBnSniIS.png", alt="Replay controls.", width="800", height="489" %}

Here is an example of how to do it.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/VBbc5OLPefRvxs29Cxqy.mp4", controls="true", muted="true", class="screenshot" %}

- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Play.", width="20", height="20" %} **Play** to play the recording.
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E4DiaFpjvozAUMoUQgB1.svg", alt="Pause.", width="20", height="20" %} **Pause** to pause the replay.
- Adjust the **playback speed** with the drop-down. 
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CoI0VqgWpyBs6ye9WJZ3.svg", alt="Preview.", width="20", height="20" %} **Toggle visual preview** to show or hide the visual preview. 


## Navigate a performance recording {: #navigate }

DevTools automatically zooms out to show the full recording timeline. You can navigate the recording with zoom and move the timeline. 

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aiNxjBK2fBr76NKHfMoA.mp4", autoplay=true, loop=true, muted="true", class="screenshot" %}

To zoom and move the timeline left and right, use the corresponding navigation buttons:

- Click on the **Timeline** to move the playhead to view a particular frame.
- Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W0YLGvycDjOWpEubawyh.svg", alt="Zoom in.", width="20", height="20" %} **Zoom in** and {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0kg9yZVysvkgc8mutOvB.svg", alt="Zoom out.", width="20", height="20" %} **Zoom out** controls at the bottom to zoom. In this case, you zoom based on the playhead.
- Drag the horizontal scroll bar at the bottom to move the timeline left and right.

Alternatively, you can use keyboard shortcuts. Click on the **?** button to view the shortcuts.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pcg1vz3JvbvhT2pyhGgg.png", alt="Keyboard shortcuts.", width="800", height="489" %}

When using shortcuts, you zoom based on your mouse cursor.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

## View performance insights {: #insights }

Get a list of performance insights in the **Insights** pane. Identify and fix potential performance issues.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/82lFXlEKTXT0a1iCiKMV.png", alt="Insights pane.", width="800", height="489" %}

Hover over each of the insights to highlight them on the main tracks.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/FXl6y9hXBJNXsOLgLPft.mp4", controls="true", muted="true", class="screenshot" %}

Click on an insight, for example, the render blocking request, to open it in the **Details** pane. To understand the issue further, examine its **File**, **Issue**, **How to fix** sections, and more. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bHHoPGrJHuHPbRYOWWwd.png", alt="Insight details.", width="800", height="489" %}

## View Web Vitals performance metrics {: #vitals }

[Web Vitals](https://web.dev/vitals/) is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

You can view these metrics on the **Timeline** and **Insights** pane.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TP6Gt2laW0748JxVYta0.png", alt="View Web Vitals performance metrics.", width="800", height="578" %}

Hover over the insights on the **Timeline** to learn more about the metrics.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/23onsIV7BvDJpMI4mnMZ.mp4", controls="true", muted="true", class="screenshot" %}

## Discover delays of the largest contentful paint {: #largest-contentful-paint }

[Largest Contentful Paint (LCP)](https://web.dev/lcp/) is one of the [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) metrics. It reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.

{% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/elqsdYqQEefWJbUM2qMO.svg", alt="LCP thresholds.", width="800", height="212" %}

A [good LCP score](https://web.dev/lcp/#what-is-a-good-lcp-score?) is 2.5 seconds or less.

If the largest contentful paint on your page takes longer to render, in the timeline, you will see the LCP badge with a yellow square or red triangle.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ftLjLtpo9Lki9JGbhHpB.png", alt="The LCP badge.", width="800", height="580" %}

To open the **Details** pane, click the LCP badge on the timeline or on the **Insights** pane on the right. In the pane, you can discover potential causes for the delays and suggestions on how to fix them.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wnl6w6KOnqUQsXSWu0xN.png", alt="The details pane.", width="800", height="627" %}

In this example, a request blocks rendering and you can apply critical styles inline to fix it. To learn more, see [Eliminate render-blocking resources](https://web.dev/render-blocking-resources/).

To view the [sub-parts of LCP render time](https://web.dev/optimize-lcp/#lcp-breakdown), scroll down to the **Details** > **Timings breakdown** section.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zog6KF5dnfgnGdshcbvH.png", alt="Timings breakdown.", width="800", height="579" %}

LCP render time consists of the following sub-parts:

<table>
<thead>
  <tr>
    <th>LCP sub-part</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Time to first byte (TTFB)</td>
    <td>The time from when the user initiates loading the page until when the browser receives the first byte of the HTML document response.</td>
  </tr>
  <tr>
    <td>Resource load delay</td>
    <td>The delta between TTFB and when the browser starts loading the LCP resource.</td>
  </tr>
  <tr>
    <td>Resource load time</td>
    <td>The time it takes to load the LCP resource itself.</td>
  </tr>
  <tr>
    <td>Element render delay</td>
    <td>The delta between when the LCP resource finishes loading until the LCP element is fully rendered.</td>
  </tr>
</tbody>
</table>

If an LCP element doesn't require a resource load to render, the resource load delay and time are omitted. For example, in case the element is a text node rendered with a system font.

## View layout shifts activity {: #layout-shifts }

View layout shifts activity in the **Layout Shifts** track. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ronEnmKW9Xh4h8YLdVWN.png", alt="Layout Shifts track.", width="800", height="491" %}

Layout shifts are grouped in a [session window](https://web.dev/evolving-cls/?utm_source=devtools#why-a-session-window). In the example above, there are two session windows. Session windows have gaps between them. 

{% Aside 'gotchas' %}
Think about layout shifts like fireworks. There are times where multiple shifts happen at once, then they pause for a while, then multiple shifts happen again. Each set of multiple shifts is a session window. For more information, see [Session window](https://web.dev/evolving-cls/?utm_source=devtools#why-a-session-window).
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uN8y6gdUU8QdmAREPtJ.png", alt="Session window and gap.", width="800", height="491" %}

[Cumulative Layout Shifts (CLS)](https://web.dev/cls) is one of the [core web vitals](https://web.dev/vitals/#core-web-vitals) metrics. Use the **Layout Shifts** track to identify potential issues and causes of layout shifts.

Always start with the largest session window when improving CLS metric. In our example, session window 1 is the largest window, based on the background color and level.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wgpE2wbqPMVbrcGcnFQD.png", alt="CLS.", width="800", height="491" %}

Click on a screenshot to view the layout shift's details, identify potential root causes and impacted elements.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/T7laY8CqS5kMMowwjwOH.png", alt="View the layout shift's details.", width="800", height="523" %}

In our example, the potential root cause is **unsized media**. To learn how to fix it, see [Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/#images-without-dimensions).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0eqkyM3nRWQIuWzQACHZ.png", alt="identify potential root causes.", width="800", height="532" %}


### Understand layout shifts score {: #session-window }

To understand how the scores are calculated, use the **Window** section in the **Details** pane. The **Window** shows which session window the current layout shift belongs to.

If the whole page is shifted, the maximum score of each layout shift is `1`. In our example, the first layout shift scored `0.15`. The second layout shift scored `0.041`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/biYiq5w9QLOO0tLUyjh5.png", alt="Understand layout shifts score.", width="800", height="429" %}

The total score for this session window is `0.19`. Based on the CLS threshold, it needs improvement. The session window background color reflects the same.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qLAsAvXRANlaPjrNwtcG.png", alt="CLS threshold.", width="800", height="212" %}

The session window background graph increases over time. The **Cumulative score** of the layout shift reflects the increase at that point of time.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8sVRDJwUfiSJYVTBOkja.png", alt="Cession window background graph.", width="800", height="429" %}


## View network activity {: #network }

View network activity in the **Network** track. You can expand the network track to view all the network activities and click on each item to view the details.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/19WF9xHELpG7ukNw1er6.png", alt="View network activity.", width="800", height="421" %}


## View renderer activity {: #renderer }

View render activity in the **Renderer** track. You can expand each renderer to view the activities and click on each item to view the details.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YSdG7s6Na8XX8J2WSaNl.png", alt="View renderer activity.", width="800", height="485" %}


## View GPU activity {: #gpu }

View GPU activity in the **GPU** track. The GPU track is hidden by default. To enable it, check **GPU** in [Settings](#settings).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XLah7eTk4W8FlgzWONdU.png", alt="View GPU activity.", width="800", height="377" %}

## View user timings {: #timings }

To get custom performance measures, you can use [User Timing](https://www.w3.org/TR/user-timing/) and visualize your timings with the **Timing** track. For more information, see the [User timing API](https://web.dev/usertiming/).

Check out [this demo page](https://jec.fish/demo/perf-measure) that calculates the elapsed time of text loading. 

To view user timings:

1. Mark places in your application with [`performance.mark()`](https://web.dev/usertiming/#using-mark()).
1. Measure the elapsed time between marks with [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()).
1. [Record performance](#record).
1. View the measurements on the **Timings** track. If you can't see the track, check **User timings** in [Settings](#settings).
1. To view details, click the timing on the track.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jcCIWEsYYwkJUQfEn7A0.png", alt="The Timings track.", width="800", height="433" %}

## Customize the UI {: #settings }

To customize the **Timeline** and **Tracks**, click the panel's {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="20", height="20" %} **Settings** icon and check the options you prefer.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p5GvvxTKCrcc4ZGLtS05.png", alt="Settings.", width="800", height="584" %}


## Export a recording {: #export }

To save a recording, click **Export** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %}.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UbdPV1X36eIjmet87lXL.png", alt="Export a recording.", width="800", height="489" %}


## Import a recording {: #import }

To load a recording, select **Import** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="Import.", width="20", height="20" %}.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FiBWU3KlqdXkQaMPTWp5.png", alt="Import a recording.", width="800", height="489" %}


## Delete a recording {: #delete }

To delete a recording:

1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/G3beoQrG60COzsJM4TNb.svg", alt="Delete.", width="20", height="20" %} **Delete**. A confirmation dialog opens.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QhKTWlPVACLINviDp4GL.png", alt="Delete the recording.", width="800", height="489" %}
1. In the dialog, click **Delete** to confirm the deletion.
