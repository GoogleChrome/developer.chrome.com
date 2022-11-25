---
layout: "layouts/doc-post.njk"
title: "Customize"
authors:
  - kaycebasques
  - jecelynyeen
date: 2019-05-02
updated: 2022-06-21
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

Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="More Tools.", width="24", height="24" %} **More Tools** to open other **Drawer**
tabs.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CUmjkDySI6MMzgEjukxi.png", alt="The More Tools button that opens other Drawer tabs.", width="800", height="485" %}


## Reorder panels, tabs, and panes {: #reorder }

To change ordering, click and drag left or right any of the following:

- Panels at the top of DevTools
- Panes in the **Elements** panel such as **Styles**, **Computed**, **Layout**, etc.
- **Drawer** tabs at the bottom of DevTools

Additionally, you can [move panels and tabs up and down](/blog/new-in-devtools-87/#moveable-tools) to and from the **Drawer**. To do this, right-click the panel or tab and select **Move to top** or **Move to bottom** from the drop-down menu.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/TrzgaUT4vNk1ToIDTnKv.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

Your custom tab order persists across DevTools sessions.

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
  For example, the following **appearance** settings are synced so you have a consistent experience across devices and don't need to re-define the same settings again.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="The appearance settings.", width="800", height="584" %}
  However, the **dock** settings isn't sync because developers have different dock preferences when debugging on different sites.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jWv8rwkF4q6SwTQbSNpp.png", alt="The dock.", width="426", height="134" %}


## Customize keyboard shortcuts {: #keyboard-shortcuts }

To edit keyboard shortcuts:

1. [In DevTools](/docs/devtools/open/), click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LwoUTAEghXYMyYV5EfIy.png", alt="Settings.", width="800", height="445" %}

1. In the **Settings** > **Shortcuts** tab, hover over any shortcut and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="24", height="24" %} **Edit** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BuceMKLqXmgLxRZPXTfg.png", alt="Edit shortcut.", width="800", height="596" %}

1. Put the cursor in the text bar and press any convenient combination of keys (chord). DevTools notifies you if the combination is already in use.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lsqH7u5rnAcaE3dQdqWH.png", alt="A chord shortcut that is already in use.", width="800", height="565" %}

1. Record a new combination and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7l4ffLtFrht87gVnT0IZ.svg", alt="Check.", width="24", height="24" %} **Check** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3VBJ5QKkUCG1H2FX8f78.png", alt="Save the new shortcut.", width="800", height="565" %}

To revert or delete changes, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tby5LrQzKTKzHia2fEBO.svg", alt="Back.", width="24", height="24" %} **Back** or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete**.

By default, DevTools doesn't assign shortcuts to all available actions. For example, to toggle [light and dark theme preference](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) with a keystroke, set your own shortcut in the **Shortcuts** > **Rendering** section as described above.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Toggle light and dark themes with keyboard shortcut.", width="800", height="576" %}

To bring back defaults, click **Restore default shortcuts** in the bottom-right corner of the **Settings** > **Shortcuts** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nQK0bSoeOzjAzWnmC3AY.png", alt="Restore default shortcuts.", width="800", height="463" %}

## Enable experiments {: #experiments }

To enable DevTools experiments:

1.  Go to **Settings** > **Experiments**.
2.  Search for the experiment you would like to try, enable on checkbox.
3.  Close the page.
4.  Click **Reload DevTools**.

The next time you open DevTools, the experiment should be enabled. You can disable the experiment with similar steps above.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PIV27gTdvjHqc2RfrRPo.png", alt="Experiments", width="800", height="487" %}

