---
layout: "layouts/doc-post.njk"
title: "Inspect animations"
authors:
  - kaycebasques
date: 2016-05-02
#updated: YYYY-MM-DD
description: "Inspect and modify animations with the Chrome DevTools Animation Inspector."
---

Inspect and modify animations with the Chrome DevTools Animation Inspector.

{% Img src="image/admin/NbXydhQGmfbeMOPHCHu9.png", alt="animation inspector", width="800", height="421" %}

## Summary {: #summary }

- Capture animations by opening the Animation Inspector. It automatically detects animations and
  sorts them into groups.
- Inspect animations by slowing them down, replaying them, or viewing their source code.
- Modify animations by changing their timing, delay, duration, or keyframe offsets.

## Overview {: #overview }

The Chrome DevTools Animation Inspector has two main purposes.

- Inspecting animations. You want to slow down, replay, or inspect the source code for an animation
  group.
- Modifying animations. You want to modify the timing, delay, duration, or keyframe offsets of an
  animation group. Bezier editing and keyframe editing are currently not supported.

The Animation Inspector supports CSS animations, CSS transitions, and web animations.
`requestAnimationFrame` animations are currently not supported.

### What's an animation group? {: #whats_an_animation_group }

An animation group is a group of animations that _appear_ to be related to each other. Currently,
the web has no real concept of a group animation, so motion designers and developers have to compose
and time individual animations so that they appear to be one coherent visual effect. The Animation
Inspector predicts which animations are related based on start time (excluding delays, and so on)
and groups them all side-by-side. In other words, a set of animations all triggered in the same
script block are grouped together, but if they're asynchronous then they're grouped separately.

## Get started {: #get_started }

There are two ways to open the Animation Inspector:

- Through the Main Menu:

  - Click **More**
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MU5oyGVk9rFUORcbptoZ.png", alt="More", width="6", height="26" %}
    to open the Main Menu.
  - Navigate to the **More tools** sub-menu.
  - Select **Animations**:  
    {% Img src="image/admin/VVGz6geZHi4jFJuuUxoT.png", alt="Animations via Main Menu", width="422", height="199" %}

- Open the Command Menu and type `Show Animations`.

The Animation Inspector opens up as a tab next to the Console Drawer. Since it's a Drawer tab, you
can use it from any DevTools panel.

{% Img src="image/admin/6dTrFBnaasvcKhrQreDm.png", alt="Empty Animation Inspector", width="800", height="422" %}

The Animation Inspector is grouped into four main sections (or panes). This guide refers to each
pane as follows:

1.  **Controls**. From here you can clear all currently captured Animation Groups, or change the
    speed of the currently selected Animation Group.
2.  **Overview**. Select an Animation Group here to inspect and modify it in the **Details** pane.
3.  **Timeline**. Pause and start an animation from here, or jump to a specific point in the
    animation.
4.  **Details**. Inspect and modify the currently selected Animation Group.

{% Img src="image/admin/PNT2B9LyO9ZK7O7YPpQV.png", alt="annotation Animation Inspector", width="800", height="437" %}

To capture an animation, just perform the interaction that triggers the animation while the
Animation Inspector is open. If an animation is triggered on page load, you can help the Animation
Inspector detect the animation by reloading the page.

## Inspect animations {: #inspect }

Once you've captured an animation, there are a few ways to replay it:

- Hover over its thumbnail in the **Overview** pane to view a preview of it.
- Select the Animation Group from the **Overview** pane (so that it's displayed in the **Details**
  pane) and press the **replay** button
  ({% Img src="image/admin/FMABaWsGPXg627w2Ip0d.png", alt="replay button", width="46", height="44" %}). The
  animation is replayed in the viewport. Click on the **animation speed** buttons
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0TdVNMElxodMWBFqfRze.png", alt="Animation speed buttons", width="254", height="50" %}
  to change the preview speed of the currently selected Animation Group. You can use the red
  vertical bar to change your current position.
- Click and drag the red vertical bar to scrub the viewport animation.

### View animation details {: #view_animation_details }

Once you've captured an Animation Group, click on it from the **Overview** pane to view its details.
In the **Details** pane each individual animation gets its own row.

{% Img src="image/admin/vdjLKNjWK79GW3PgiJol.png", alt="animation group details", width="800", height="501" %}

Hover over an animation to highlight it in the viewport. Click on the animation to select it in the
**Elements** panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/cwfsRGVqdUx09qYmZGzu.png", alt="Hovering over an animation to highlight it in viewport", width="800", height="431" %}

The leftmost, darker section of an animation is its definition. The right, more faded section
represents iterations. For example, in the screenshot below, sections two and three represent
iterations of section one.

{% Img src="image/admin/X3dRm6DBme4PfCjPAXZO.png", alt="diagram of animation iterations", width="494", height="110" %}

If two elements have the same animation applied to them, the Animation Inspector assigns them the
same color. The color itself is random and has no significance. For example, in the screenshot below
the two elements `div.eye.left::after` and `div.eye.right::after` have the same animation (`eyes`)
applied to them, as do the `div.feet::before` and `div.feet::after` elements.

{% Img src="image/admin/czOX5s4gDuLjnoFl7mmv.png", alt="color-coded animations", width="518", height="268" %}

## Modify animations {: #modify }

There are three ways you can modify an animation with the Animation Inspector:

- Animation duration.
- Keyframe timings.
- Start time delay.

For this section suppose that the screenshot below represents the original animation:

{% Img src="image/admin/XKgSjsvRLNrQkapxpekI.png", alt="original animation before modification", width="800", height="423" %}

To change the duration of an animation, click and drag the first or last circle.

{% Img src="image/admin/ilDNkK4AfTzWeAbe9MZZ.png", alt="modified duration", width="800", height="421" %}

If the animation defines any keyframe rules, then these are represented as white inner circles.
Click and drag one of these to change the timing of the keyframe.

{% Img src="image/admin/jJHtenLps4VT8RYWUDxS.png", alt="modified keyframe", width="800", height="421" %}

To add a delay to an animation, click and drag it anywhere except the circles.

{% Img src="image/admin/D7OuXdLLAb1iBgPazKd0.png", alt="modified delay", width="800", height="421" %}
