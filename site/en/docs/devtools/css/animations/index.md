---
layout: "layouts/doc-post.njk"
title: "Animations: Inspect and modify CSS animation effects"
authors:
  - kaycebasques
  - sofiayem
date: 2016-05-02
updated: 2022-08-11
description: "Inspect and modify animations with the Chrome DevTools Animation Inspector."
tags:
  - prototype-fixes
  - css
---

Inspect and modify animations with the Chrome DevTools Animation Inspector.

<div class="elevation--4">{% Img src="image/admin/NbXydhQGmfbeMOPHCHu9.png", alt="Animation inspector.", width="800", height="421" %}</div>

## Overview {: #overview }

You can capture animations by opening the Animation Inspector. It automatically detects animations and sorts them into groups.

The Animation Inspector has two main purposes:

- **Inspect animations**. Slow down, replay, or inspect the source code for an animation
  group.
- **Modify animations**. Modify the timing, delay, duration, or keyframe offsets of an
  animation group. Keyframe editing is currently not supported.

  {% Aside 'gotchas' %}
  Bezier editing link.
  {% endAside %}

The Animation Inspector supports CSS animations, CSS transitions, and web animations.
`requestAnimationFrame` animations are currently not supported.

### What's an animation group? {: #whats_an_animation_group }

An animation group is a set of animations that _appear_ to be related to each other. 

Currently, the web has no real concept of a group animation, so motion designers and developers compose and time individual animations to appear as one coherent visual effect. The Animation Inspector predicts related animations based on start time (excluding delays) and groups them side-by-side.

In other words, the Animation Inspector groups together animations triggered in the same script block, but if they're asynchronous, they end up in different groups.

## Get started {: #get_started }

There are two ways to open the Animation Inspector:

- Select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More.", width="24", height="24" %} **Customize and control DevTools** > **More tools** > **Animations**.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w4767GjJfcHUdokjxB1a.png", alt="Animations in the menu.", width="800", height="572" %}
- Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>C</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux, ChromeOS) to open the Command Menu, start typing `Show Animations`, and select the corresponding Drawer panel.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pbUGqPRe0SlaYNyqVMsO.png", alt="Show Animations.", width="800", height="572" %}

The Animation Inspector opens up as a tab next to the Console Drawer. Since it's a Drawer tab, you can use it from any DevTools panel.

<div class="elevation--4">{% Img src="image/admin/6dTrFBnaasvcKhrQreDm.png", alt="Empty Animation Inspector.", width="800", height="422" %}</div>

The Animation Inspector is grouped into four main sections (or panes):

1.  **Controls**. From here, you can clear all currently captured Animation Groups, or change the
    speed of the currently selected Animation Group.
2.  **Overview**. Select an Animation Group here to inspect and modify it in the **Details** pane.
3.  **Timeline**. Pause and start an animation from here, or jump to a specific point in the
    animation.
4.  **Details**. Inspect and modify the currently selected Animation Group.

<div class="elevation--4">{% Img src="image/admin/PNT2B9LyO9ZK7O7YPpQV.png", alt="Animation Inspector panes.", width="800", height="437" %}</div>

To capture an animation, trigger it while the Animation Inspector is open. If an animation is triggered on page load, reload it.

## Inspect animations {: #inspect }

Once you've captured an animation, there are a few ways to replay it:

- Hover over its thumbnail in the **Overview** pane to view a preview of it.
- Click and drag the red vertical bar to scrub the viewport animation.
- Select the Animation Group from the **Overview** pane (so that it's displayed in the **Details**
  pane) and press the {% Img src="image/admin/FMABaWsGPXg627w2Ip0d.png", alt="Replay button.", width="23", height="22" %} **Replay** button. The
  animation is replayed in the viewport.

Click on the {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0TdVNMElxodMWBFqfRze.png", alt="Animation speed buttons", width="127", height="25" %} **Animation speed** buttons in the **Controls** bar to change the preview speed of the currently selected Animation Group.

### View animation details {: #view_animation_details }

Once you've captured an Animation Group, click on it from the **Overview** pane to view its details.
In the **Details** pane, each individual animation gets its own row.

<div class="elevation--4">{% Img src="image/admin/vdjLKNjWK79GW3PgiJol.png", alt="animation group details", width="800", height="501" %}</div>

Hover over an animation to highlight it in the viewport. Click on the animation to select it in the
**Elements** panel.

<div class="elevation--4">{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/cwfsRGVqdUx09qYmZGzu.png", alt="Hovering over an animation to highlight it in viewport", width="800", height="431" %}</div>

The leftmost, darker section of an animation is its definition. The right, more faded section
represents iterations. For example, in the screenshot below, sections two and three represent
iterations of section one.

<div class="elevation--4" style="width: max-content; margin: 20px auto;">{% Img src="image/admin/X3dRm6DBme4PfCjPAXZO.png", alt="diagram of animation iterations", width="494", height="110" %}</div>

If two elements have the same animation applied to them, the Animation Inspector assigns them the
same color. The color itself is random and has no significance. For example, in the screenshot below
the two elements `div.eye.left::after` and `div.eye.right::after` have the same animation (`eyes`)
applied to them, as do the `div.feet::before` and `div.feet::after` elements.

<div class="elevation--4" style="width: max-content; margin: 20px auto;">{% Img src="image/admin/czOX5s4gDuLjnoFl7mmv.png", alt="color-coded animations", width="518", height="268" %}</div>

## Modify animations {: #modify }

There are three ways you can modify an animation with the Animation Inspector:

- Animation duration.
- Keyframe timings.
- Start time delay.

For this section, suppose that the screenshot below represents the original animation:

<div class="elevation--4">{% Img src="image/admin/XKgSjsvRLNrQkapxpekI.png", alt="original animation before modification", width="800", height="423" %}</div>

To change the duration of an animation, click and drag the first or last circle.

<div class="elevation--4">{% Img src="image/admin/ilDNkK4AfTzWeAbe9MZZ.png", alt="modified duration", width="800", height="421" %}</div>

If the animation defines any keyframe rules, then these are represented as white inner circles.
Click and drag one of these to change the timing of the keyframe.

<div class="elevation--4">{% Img src="image/admin/jJHtenLps4VT8RYWUDxS.png", alt="modified keyframe", width="800", height="421" %}</div>

To add a delay to an animation, click and drag it anywhere except the circles.

<div class="elevation--4">{% Img src="image/admin/D7OuXdLLAb1iBgPazKd0.png", alt="modified delay", width="800", height="421" %}</div>
