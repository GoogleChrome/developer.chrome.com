---
layout: "layouts/doc-post.njk"
title: "Customize Chrome DevTools"
authors:
  - kaycebasques
date: 2019-05-02
updated: 2020-10-01
description: "A list of ways you can customize Chrome DevTools."
---

This page lists the ways you can customize Chrome DevTools.

## Settings {: #settings }

**Settings** > **Preferences** contains many options for customizing DevTools.

To open Settings, do one of the following:

- Press <kbd>F1</kbd> while DevTools is in focus.
- Click **Settings**
  ![Settings icon](/web/tools/chrome-devtools/images/shared/capture-settings.png).

![Settings.](/web/tools/chrome-devtools/customize/images/settings-menu.png)

**Figure 1**. Settings.

## Drawer {: #drawer }

The **Drawer** contains many hidden features.

Press <kbd>Escape</kbd> to open or close the Drawer.

![The Drawer.](/web/tools/chrome-devtools/customize/images/drawer-example.png)

**Figure 2**. The Drawer.

Click **More** ![More](/web/tools/chrome-devtools/customize/images/more.png) to open other Drawer
tabs.

![The button for opening Drawer
      tabs.](/web/tools/chrome-devtools/customize/images/more-drawer-tabs.svg)

**Figure 3**: The button for opening Drawer tabs, outlined in blue.

## Reorder panels {: #reorder }

Click and drag a panel tab to change its ordering. Your custom tab order persists across DevTools
sessions.

![A DevTools window
      with a custom panel tab ordering.](/web/tools/chrome-devtools/customize/images/custom-panel-tab-ordering.png)

**Figure 4**: A DevTools window with a custom tab ordering. By default, the Network panel tab is
usually the fourth from the left. In the screenshot, it's the first from the left.

## Change DevTools placement {: #placement }

See [Chrome DevTools Placement][1].

![Undocked DevTools.](/web/tools/chrome-devtools/customize/images/undock.png)

**Figure 5**. Undocked DevTools.

## Dark theme {: #dark-theme }

See [Enable Dark Theme][2].

![The dark theme.](/web/tools/chrome-devtools/customize/images/darktheme.png)

**Figure 6**. The dark theme.

## Experiments {: #experiments }

To enable DevTools experiments:

1.  Go to `chrome://flags/#enable-devtools-experiments`.
2.  Click **Enable**.
3.  Click **Relaunch Now**, at the bottom of the page.

The next time you open DevTools, there's a new page called **Experiments** in [Settings][3].

[1]: /web/tools/chrome-devtools/customize/placement
[2]: /web/tools/chrome-devtools/customize/dark-theme
[3]: #settings
