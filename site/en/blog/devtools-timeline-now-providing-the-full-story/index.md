---
layout: "layouts/blog-post.njk"
title: DevTools Timeline - Now providing the full story
description: >
  We've upgraded the Timeline panel for Chrome DevTools to give developers more insight on their site’s runtime performance.
authors:
  - heathermahan
date: 2015-03-23
updated: 2019-03-16
---


The DevTools [Timeline panel](/docs/devtools/evaluate-performance/performance-reference) has always been the best first stop on the path to performance optimization. This centralized overview of your app’s activity helps you analyze where time is spent on loading, scripting, rendering, and painting. Recently, we’ve upgraded the Timeline with more instrumentation so that you can see a more in-depth view of your app’s performance.

We’ve added the following features:

* integrated [JavaScript profiler](#integrated-javascript-profiler). (Flame chart included!)
* [frame viewer](#frame-viewer) to help you visualize composited layers.
* [paint profiler](#paint-profiler) for detailed drill-downs into the browser’s painting activity.

Note that using the __Paint__ capture options described in this article do incur some performance overhead, so flip them on only when you want 'em.

## Integrated JavaScript Profiler

If you’ve ever poked around in __Profiles__ panel, you’re probably familiar with the [JavaScript CPU profiler](docs/devtools/rendering). This tool measures where execution time is spent in your JavaScript functions. By viewing JavaScript profiles with the Flame Chart, you can visualize your JavaScript processing over time.

Now, you can get this granular breakdown of your JavaScript execution in the __Timeline__ panel. By selecting the __JS Profiler__ capture option, you can see your JavaScript call stacks in the Timeline along with other browser events. Adding this feature to the Timeline helps streamline your debugging workflow. But more than that, it allows you to view your JavaScript in context and identify the parts of your code that affect page load time and rendering.

In addition to the JavaScript profiler, we also integrated a Flame Chart view into the __Timeline__ panel. You can now view your app’s activity either as the classic waterfall of events or as a Flame Chart. The Flame Chart icon allows you to toggle between these two views.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/k4sJJ5lJO1VWYYB5OAso.png", alt="Flame icon.", width="28", height="18" %}
</figure>


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/my0sfoqqXwDq9fngPpge.png", alt="Using the JS Profiler capture option and Flame Chart view to investigate call stacks in the Timeline.", width="692", height="564" %}
<figcaption>Using the <strong>JS Profiler</strong> capture option and Flame Chart view to investigate call stacks in the Timeline.</figcaption>
</figure>

{% Aside %}
Use WASD to zoom and pan through the Flame Chart. Shift-drag to draw a selection box.
{% endAside %}


## Frame Viewer

The art of [layer compositing](https://www.html5rocks.com/tutorials/speed/layers/) is another aspect of the browser that has been mostly hidden from developers. When used sparingly and with care, layers can help avoid costly re-paints and yield huge performance boosts. But it’s often not obvious to predict how the browser will composite your content. Using Timeline’s new __Paint__ capture option, you can visualize composited layers at each frame of a recording.

When you select a gray frame bar above the __Main Thread__, its __Layers__ panel provides a visual model of the layers that compose your app.

{% YouTube id="sC6IlD-U2TI" %}

{% Aside%}
Note: Play back animations by clicking through frame bars on a Timeline recording.
{% endAside %}

You can zoom, rotate, and drag the layers model to explore its contents. Hovering over a layer reveals its current position on the page. Right-clicking on a layer lets you jump to the corresponding node in the __Elements__ panel. These features show you what was promoted to a layer. If you select a layer, you can also see why it was promoted in the row labeled __Compositing Reasons__.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/2GrY35BEjXA2bQzPsTn4.png", alt="Inspecting a layer from Codrops' Scattered Polaroids Gallery to reveal the browser’s reasons for compositing.", width="644", height="589" %}
<figcaption>Inspecting a layer from <a href="https://tympanus.net/Development/ScatteredPolaroidsGallery/">Codrops' Scattered Polaroids Gallery</a> to reveal the browser’s reasons for compositing.</figcaption>
</figure>

## Paint Profiler

Last but not least, we’ve added the paint profiler to help you identify jank caused by expensive paints. This feature enriches the Timeline with more details about the work Chrome does during paint events.

For starters, it’s now easier to identify the visual content corresponding to each paint event. When you select a green paint event in the Timeline, the __Details__ pane shows you a preview of the actual pixels that were painted.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/XQ0kWrp8HUCrAM1cEq0j.png", alt="Previewing pixels that the browser painted using the Paint capture option.", width="579", height="513" %}
<figcaption>
    Previewing pixels that the browser painted using the <strong>Paint</strong> capture option.
</figcaption>
</figure>

If you really want to dive in, switch over to the __Paint Profiler__ pane. This profiler shows you the exact draw commands that the browser executed for the selected paint. To help you connect these native commands with actual content in your app, you can right-click on a __draw*__ call and jump straight to the corresponding node in the __Elements__ panel.



<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/TcMXmXMn9qvWG7qzZ35z.png", alt="Relating native browser draw calls to DOM elements using the Paint Profiler.", width="608", height="450" %}
<figcaption>
   Relating native browser <strong>draw</strong> calls to DOM elements using the <strong>Paint Profiler</strong>.
</figcaption>
</figure>

The mini-timeline across the top of the pane lets you play back the painting process and get a sense of which operations are expensive for the browser to perform. Drawing operations are color-coded as follows: <strong style="color: #ffa181;">pink</strong> (shapes), <strong style="color: #88c4ff;">blue</strong> (bitmap), <strong style="color: #b4ff89;">green</strong> (text), and <strong style="color: #cea0ff;">purple</strong> (misc.). Bar height indicates call duration, so investigating tall bars can help you understand what about a particular paint was costly.

{% YouTube id="vcjcykN6smw" %}

## Profile and profit!

When it comes to performance optimization, knowledge of the browser can be incredibly powerful. By giving you a peek under the hood, these Timeline updates help clarify the relationship between your code and Chrome’s rendering processes. Try out these new options in the Timeline and see what Chrome DevTools can do to enhance your jank-hunting workflow!


