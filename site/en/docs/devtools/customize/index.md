---
layout: "layouts/doc-post.njk"
title: "Customization"
authors:
  - kaycebasques
  - jecelynyeen
date: 2019-05-02
updated: 2021-12-02
description: "A list of ways you can customize Chrome DevTools."
---

This page lists the ways you can customize Chrome DevTools.

{% YouTube id="xHusjrb_34A" %}

## Settings {: #settings }

**Settings** > **Preferences** contains many options for customizing DevTools.

To open Settings, do one of the following:

- Click on the **Settings** icon.
- Press <kbd>F1</kbd> while DevTools is in focus.
- Press <kbd>?</kbd> while DevTools is in focus.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HaeLqueTSvpXQQXUwUCk.png", alt="Settings icon", width="800", height="485" %}


## Drawer {: #drawer }

The **Drawer** contains many hidden features.

Press <kbd>Escape</kbd> to open or close the Drawer.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7qVeHmolnGaM71A07iap.png", alt="The Drawer", width="800", height="485" %}

Click **More** {% Img src="image/admin/412azsDzeKPM2HQ6p5Rr.png", alt="More", width="6", height="26" %} to open other Drawer
tabs.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CUmjkDySI6MMzgEjukxi.png", alt="The button for opening Drawer tabs.", width="800", height="485" %}


## Reorder panels and tabs {: #reorder }

Click and drag a panel / tab left or right to change its ordering. You can [move the panel / tab up and down](/blog/new-in-devtools-87/#moveable-tools) too by right click > **move to top** / **move to bottom**. Your custom tab order persists across DevTools sessions.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/TrzgaUT4vNk1ToIDTnKv.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}


## Change DevTools placement {: #placement }

See [Chrome DevTools Placement](/docs/devtools/customize/placement).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/60jo8OMncIlLhh6VRILs.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}


## Dark theme {: #dark-theme }

See [Enable Dark Theme](/docs/devtools/customize/dark-theme).

{% Img src="image/admin/aeIyPT88dwvuDGDmQTDw.png", alt="The dark theme.", width="800", height="477" %}


## Panel layout {: #panel-layout }

By default, DevTools will auto-rearrange your panel layout depending on window size. You can disable the auto-rearrangement. Go to **Settings** > update the **panel layout** based on your preference. 

For example, the **Styles pane** in the **Elements** panel will move from the side to the bottom when screen size is small. If you want the **Style pane** to always stay on the side, change the **panel layout** to **vertical**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NWhgJvRd87ENa9iLwYaf.png", alt="Change panel layout", width="800", height="487" %}


## Change DevTools UI language {: #language }

See [Use DevTools in your preferred language](/blog/new-in-devtools-94/#localized).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="Change language in Settings > Preferences", width="800", height="494" %}


## Sync settings {: #sync }

You can sync your DevTools settings across devices. To enable that, you need to:

1. Turn on Chrome profile sync. Your DevTools settings are synced by default when you turn on Chrome profile sync.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yhIipqtEvDuy6ygB677t.png", alt="Chrome profile sync", width="400", height="579" %}
2. The DevTools sync settings can be updated via **Settings** > **Sync** > **Enable settings sync** checkbox.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools sync settings", width="800", height="654" %}
3. Most of the settings are synced, except for the **Workspace**, **Experiments**, and **Devices** tabs and a few other general settings. The state of the **Enable settings sync** checkbox is synced across devices as well.
  For example, the following **appearance** settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="appearance settings", width="800", height="584" %}
  However, the **dock** settings isn’t sync because developers have different dock preferences when debugging on different sites.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jWv8rwkF4q6SwTQbSNpp.png", alt="dock", width="426", height="134" %}


## Customize keyboard shortcuts {: #keyboard-shortcuts }

See [Customize chords keyboard shortcuts](/blog/new-in-devtools-88/#keyboard-shortcuts).

{% Img src="image/admin/tF18281gSqF69MENLGuk.png", alt="Chords keyboard shortcuts", width="800", height="508" %}


## Experiments {: #experiments }

To enable DevTools experiments:

1.  Go to **Settings** > **Experiments**.
2.  Search for the experiment you would like to try, enable on checkbox.
3.  Close the page.
4.  Click **Reload DevTools**.

The next time you open DevTools, the experiment should be enabled. You can disable the experiment with similar steps above.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PIV27gTdvjHqc2RfrRPo.png", alt="Experiments", width="800", height="487" %}

