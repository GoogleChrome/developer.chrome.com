---
layout: "layouts/doc-post.njk"
title: "Customization"
authors:
  - kaycebasques
  - jecelynyeen
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

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/js6f1MUOacROa2L3kYnY.svg", alt="The button for opening Drawer tabs.", width="700", height="532" %}

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

## Sync settings {: #sync }

To update DevTools settings sync:

1. Turn on Chrome profile sync.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yhIipqtEvDuy6ygB677t.png", alt="Chrome profile sync", width="400", height="579" %}
2. The DevTools sync settings can be updated via **Settings** > **Sync** > **Enable settings sync** checkbox.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools sync settings", width="800", height="654" %}
3. Most of the settings you see in the **Settings** UI are synced, except for the **Workspace**, **Experiments**, **Devices** tab and a few other general settings. The state of the **Enable settings sync** checkbox is synced across devices as well.
  For example, the following **appearance** settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="appearance settings", width="800", height="584" %}
  However, the **dock** settings isn’t sync because developers have different dock preferences when debugging on different sites.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jWv8rwkF4q6SwTQbSNpp.png", alt="dock", width="426", height="134" %}


## Experiments {: #experiments }

To enable DevTools experiments:

1.  Go to **Settings** > **Experiments**.
2.  Search for the experiment you would like to try, enable on checkbox.
3.  Close the page.
4.  Click **Reload DevTools**.

The next time you open DevTools, the experiment should be enabled. You can disable the experiment with similar steps above.

[1]: /docs/devtools/customize/placement
[2]: /docs/devtools/customize/dark-theme
