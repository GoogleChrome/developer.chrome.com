---
layout: "layouts/doc-post.njk"
title: "Customization"
authors:
  - kaycebasques
date: 2019-05-02
#updated: YYYY-MM-DD
description: "A list of ways you can customize Chrome DevTools."
---

This page lists the ways you can customize Chrome DevTools.

## Settings {: #settings }

**Settings** > **Preferences** contains many options for customizing DevTools.

To open Settings, do one of the following:

- Press <kbd>F1</kbd> while DevTools is in focus.
- Click **Settings**.

{% Img src="image/admin/JT10WadwpzpCOuHkWHw9.png", alt="Settings.", width="800", height="524" %}

**Figure 1**. Settings.

## Drawer {: #drawer }

The **Drawer** contains many hidden features.

Press <kbd>Escape</kbd> to open or close the Drawer.

{% Img src="image/admin/xeCLVEAiw99oxMJp0uzn.png", alt="The Drawer.", width="800", height="604" %}

**Figure 2**. The Drawer.

Click **More** {% Img src="image/admin/412azsDzeKPM2HQ6p5Rr.png", alt="More", width="6", height="26" %} to open other Drawer
tabs.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/js6f1MUOacROa2L3kYnY.svg", alt="The button for opening Drawer tabs.", width="197", height="150" %}

**Figure 3**: The button for opening Drawer tabs, outlined in blue.

## Reorder panels {: #reorder }

Click and drag a panel tab to change its ordering. Your custom tab order persists across DevTools
sessions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Nv6HgEaNsc7QNRQzOykX.png", alt="A DevTools window with a custom panel tab ordering.", width="800", height="516" %}

**Figure 4**: A DevTools window with a custom tab ordering. By default, the Network panel tab is
usually the fourth from the left. In the screenshot, it's the first from the left.

## Change DevTools placement {: #placement }

See [Chrome DevTools Placement][1].

{% Img src="image/admin/NqpfQ9foeTjvOYLzOh16.png", alt="Undocked DevTools.", width="800", height="352" %}

**Figure 5**. Undocked DevTools.

## Dark theme {: #dark-theme }

See [Enable Dark Theme][2].

{% Img src="image/admin/aeIyPT88dwvuDGDmQTDw.png", alt="The dark theme.", width="800", height="477" %}

**Figure 6**. The dark theme.

## Experiments {: #experiments }

To enable DevTools experiments:

1.  Go to `chrome://flags/#enable-devtools-experiments`.
2.  Click **Enable**.
3.  Click **Relaunch Now**, at the bottom of the page.

The next time you open DevTools, there's a new page called **Experiments** in [Settings][3].

[1]: /docs/devtools/customize/placement
[2]: /docs/devtools/customize/dark-theme
[3]: #settings
