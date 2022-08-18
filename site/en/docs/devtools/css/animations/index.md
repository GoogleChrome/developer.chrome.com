---
layout: "layouts/doc-post.njk"
title: "Animations: Inspect and modify CSS animation effects"
authors:
  - kaycebasques
  - sofiayem
date: 2016-05-02
updated: 2022-08-11
description: "Inspect and modify animations with the Animations tab."
tags:
  - prototype-fixes
  - css
---

Inspect and modify animations with the Chrome DevTools **Animations** drawer tab.

{% YouTube id='lVLzkleL_CE' %}

## Overview {: #overview }

To capture animations, open the **Animations** tab. It automatically detects animations and sorts them into groups.

The **Animations** tab has two main purposes:

- **Inspect animations**. Slow down, replay, or inspect the source code for an animation
  group.
- **Modify animations**. Modify the timing, delay, duration, or keyframe offsets of an
  animation group. Keyframe and Bezier editing isn't supported.

{% Aside 'gotchas' %}
You can edit the timings of CSS transition and animation easings and configure custom Bezier curves with the [Easing Editor](/docs/devtools/css/reference/#edit-easing) in the **Elements** > **Styles** pane.
{% endAside %}

The **Animations** tab supports CSS animations, CSS transitions, and web animations.
`requestAnimationFrame` animations are currently not supported.

### What's an animation group? {: #whats_an_animation_group }

An animation group is a set of animations that _appear_ to be related to each other. 

Currently, the web has no real concept of a group animation, so motion designers and developers compose and time individual animations to appear as one coherent visual effect. The **Animations** tab predicts related animations based on start time (excluding delays) and groups them side-by-side.

In other words, the **Animations** tab groups together animations triggered in the same script block, but if they're asynchronous, they end up in different groups.

## Get started {: #get_started }

There are two ways to open the **Animations** tab:

- Select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More.", width="24", height="24" %} **Customize and control DevTools** > **More tools** > **Animations**.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w4767GjJfcHUdokjxB1a.png", alt="Animations in the menu.", width="800", height="572" %}
- Open the Command Menu by pressing one of the following:
  - On macOS: <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
  - On Windows, Linux, or ChromeOS: <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> 

  Then start typing `Show Animations` and select the corresponding Drawer panel.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pbUGqPRe0SlaYNyqVMsO.png", alt="Show Animations.", width="800", height="572" %}

By default, the **Animations** tab opens up as a tab next to the **Console** drawer. As a drawer tab, you can use it with any panel or [move it to the top of DevTools](/docs/devtools/customize/#reorder).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xTomXEMrcWX94R7u1ivo.png", alt="Empty Animations tab.", width="800", height="560" %}

The **Animations** tab is grouped into four main panes (sections):

<div class="elevation--4">{% Img src="image/admin/PNT2B9LyO9ZK7O7YPpQV.png", alt="Animations tab panes.", width="800", height="437" %}</div>

1.  **Controls**. From here, you can clear all currently captured animation groups, or change the
    speed of the currently selected animation group.
2.  **Overview**. Select an animation group here to inspect and modify it in the **Details** pane.
3.  **Timeline**. Pause and start an animation from here, or jump to a specific point in the
    animation.
4.  **Details**. Inspect and modify the currently selected animation group.

To capture an animation, trigger it while the **Animations** tab is open. If an animation is triggered on page load, reload it.

## Inspect animations {: #inspect }

Once you've captured an animation, there are a few ways to replay it:

- Hover over its thumbnail in the **Overview** pane to view a preview of it.
- Click and drag the red vertical bar to scrub the viewport animation.
- Select the animation group from the **Overview** pane (so that it's displayed in the **Details**
  pane) and press the {% Img src="image/admin/FMABaWsGPXg627w2Ip0d.png", alt="Replay button.", width="23", height="22" %} **Replay** button. The
  animation is replayed in the viewport.

Click on the {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0TdVNMElxodMWBFqfRze.png", alt="Animation speed buttons.", width="127", height="25" %} **Animation speed** buttons in the **Controls** bar to change the preview speed of the currently selected animation group.

### View animation details {: #view_animation_details }

Once you've captured an animation group, click on it from the **Overview** pane to view its details.
In the **Details** pane, each individual animation gets its own row.

<div class="elevation--4">{% Img src="image/admin/NbXydhQGmfbeMOPHCHu9.png", alt="The Details pane.", width="800", height="421" %}</div>

Hover over an animation to highlight it in the viewport. Click on the animation to select it in the
**Elements** panel.

<div class="elevation--4">{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/cwfsRGVqdUx09qYmZGzu.png", alt="Hovering over an animation to highlight it in viewport.", width="800", height="431" %}</div>

Some animations repeat indefinitely if their `animation-iteration-count` property is set to `infinite`. The **Animations** tab displays their definitions and iterations.

<div class="elevation--4">{% Img src="image/admin/vdjLKNjWK79GW3PgiJol.png", alt="Animation iterations.", width="800", height="501" %}</div>

The leftmost, darker section of an animation is its definition. The right, more faded sections
represent iterations.

For example, in the screenshot below, sections two and three represent
iterations of section one.

<div class="elevation--4" style="width: max-content; margin: 20px auto;">{% Img src="image/admin/X3dRm6DBme4PfCjPAXZO.png", alt="Diagram of animation iterations.", width="494", height="110" %}</div>

If two elements have the same animation applied to them, the **Animations** tab assigns them the
same color. The color itself is random and has no significance. For example, in the screenshot below
the two elements `div.eye.left::after` and `div.eye.right::after` have the same animation (`eyes`)
applied to them, as do the `div.feet::before` and `div.feet::after` elements.

<div class="elevation--4" style="width: max-content; margin: 20px auto;">{% Img src="image/admin/czOX5s4gDuLjnoFl7mmv.png", alt="Color-coded animations.", width="518", height="268" %}</div>

## Modify animations {: #modify }

There are three ways you can modify an animation with the **Animations** tab:

- Animation duration.
- Keyframe timings.
- Start time delay.

{% Aside 'gotchas' %}
Any changes you make in the **Animations** tab apply inline styles to the corresponding elements, so you can see and replay the resulting animations right away.
{% endAside %}

For this section, suppose that the screenshot below represents the original animation:

<div class="elevation--4">{% Img src="image/admin/XKgSjsvRLNrQkapxpekI.png", alt="Original animation before modification.", width="800", height="423" %}</div>

To change the duration of an animation, click and drag the first or last circle.

<div class="elevation--4">{% Img src="image/admin/ilDNkK4AfTzWeAbe9MZZ.png", alt="Modified duration.", width="800", height="421" %}</div>

If the animation defines any keyframe rules, then these are represented as white inner circles.
Click and drag one of these to change the timing of the keyframe.

<div class="elevation--4">{% Img src="image/admin/jJHtenLps4VT8RYWUDxS.png", alt="Modified keyframe.", width="800", height="421" %}</div>

To add a delay to an animation, click the animation itself, not the circles, then drag it anywhere.

<div class="elevation--4">{% Img src="image/admin/D7OuXdLLAb1iBgPazKd0.png", alt="Modified delay.", width="800", height="421" %}</div>
