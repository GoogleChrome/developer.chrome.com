---
layout: "layouts/doc-post.njk"
title: "Customize DevTools"
authors:
  - kaycebasques
  - jecelynyeen
  - sofiayem
date: 2019-05-02
updated: 2023-02-16
description: "A list of ways you can customize Chrome DevTools: Change theme, placement, panel order, language, and more."
---

This page lists the ways you can customize Chrome DevTools.

{% YouTube id="xHusjrb_34A" %}

## Settings {: #settings }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** contains many options for customizing DevTools.

See [Open Settings](/docs/devtools/settings/#open) and [Preferences](/docs/devtools/settings/preferences/).

## Dark theme {: #dark-theme }

You can enable dark theme in [Settings](/docs/devtools/settings/) or the [Command Menu](/docs/devtools/command-menu/).

{% Img src="image/admin/WvpPi2YTkYNCsmeguTwm.png", alt="The dark theme.", width="800", height="477" %}

1.  [Open the Command Menu](/docs/devtools/command-menu).
1.  Start typing `dark`, select the **Switch to dark theme** command, and then press
    <kbd>Enter</kbd> to run the command.

    {% Img src="image/admin/ZuWH6C0rI0XPrSNock9l.png", alt="The dark theme command.", width="800", height="350" %}
1.  Alternatively, set your theme in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Appearance**](/docs/devtools/settings/preferences/#appearance) > **Themes**.

## Drawer {: #drawer }

The **Drawer** contains many hidden features.

Press <kbd>Escape</kbd> to open or close the Drawer.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7qVeHmolnGaM71A07iap.png", alt="The Drawer", width="800", height="485" %}

Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="More Tools.", width="24", height="24" %} **More Tools** to open other **Drawer**
tabs.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CUmjkDySI6MMzgEjukxi.png", alt="The More Tools button that opens other Drawer tabs.", width="800", height="485" %}

## Change DevTools placement {: #placement }

By default, DevTools is docked to the right of your viewport. You can also dock to the bottom or left sides or undock DevTools into a separate window.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0G4eZnKz0u6wXmL0tSU.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

You can change the placement of DevTools in two ways:

- **Main Menu**: Open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="More.", width="24", height="24" %} **Customize And Control DevTools** and click:
  - {% Img src="image/admin/32ywiTV2crhhBz4Qy24M.png", alt="Undock.", width="24", height="22" %} **Undock into separate window**
  - {% Img src="image/admin/rrwMCjKldgIkwl7bCH1p.png", alt="Dock to left", width="24", height="22" %} **Dock to left**
  - {% Img src="image/admin/ckt768UpO2BOngVqYbfG.png", alt="Dock to bottom.", width="24", height="22" %} **Dock to bottom** 
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7RPiByVYQRpml2szndNy.png", alt="Dock to right.", width="24", height="22" %} **Dock to right**
- **Command Menu**:

  1. [Open the Command Menu](/docs/devtools/command-menu).
  1. Start typing `dock` and select one of the suggested options: dock to bottom, left, right, undock, or restore last dock position.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XIBCqmxgj9jcRbSxgrqJ.png", alt="Suggested docking option in the Command Menu.", width="800", height="488" %}

To toggle **Restore last dock position** with a keyboard shortcut, press:

- On Linux or Windows: <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>
- On MacOS: <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>

## Reorder panels, tabs, and panes {: #reorder }

To change ordering, click and drag left or right any of the following:

- Panels at the top of DevTools.
- Panes in the **Elements** panel such as **Styles**, **Computed**, or **Layout**.
- **Drawer** tabs at the bottom of DevTools.

Additionally, you can [move panels and tabs up and down](/blog/new-in-devtools-87/#moveable-tools) to and from the **Drawer**. To do this, right-click the panel or tab and select **Move to top** or **Move to bottom** from the drop-down menu.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/TrzgaUT4vNk1ToIDTnKv.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

Your custom tab order persists across DevTools sessions.

## Panel layout {: #panel-layout }

By default, DevTools will auto-rearrange your panel layout depending on window size. You can disable the auto-rearrangement. Go to **Settings** > update the **panel layout** based on your preference. 

For example, the **Styles pane** in the **Elements** panel will move from the side to the bottom when screen size is small. If you want the **Style pane** to always stay on the side, change the **panel layout** to **vertical**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NWhgJvRd87ENa9iLwYaf.png", alt="Change panel layout", width="800", height="487" %}


## Change DevTools UI language {: #language }

See {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Appearance**](/docs/devtools/settings/preferences/#appearance) > **Language**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="Change language in Settings > Preferences", width="800", height="494" %}


## Sync settings {: #sync }

You can sync your DevTools settings across multiple devices.

To enable sync, first turn on [Chrome Sync](https://support.google.com/chrome/answer/185277). Once enabled, your DevTools settings are synced by default.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yhIipqtEvDuy6ygB677t.png", alt="Chrome profile sync.", width="400", height="579" %}

You can enable or disable the DevTools settings sync separately using the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Sync**](/docs/devtools/settings/preferences/#sync) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable settings sync** checkbox.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools sync settings", width="800", height="654" %}

DevTools syncs most of the settings except those in the **Workspace**, **Experiments**, and **Devices** tabs and a few other general settings. The state of the **Enable settings sync** checkbox is synced across devices as well.

{% Aside %}
DevTools also doesn't sync [Snippets](/docs/devtools/javascript/snippets/), they are stored as local preferences.
{% endAside %}

For example, the following **Appearance** settings are synced, so you have a consistent experience across devices and don't need to re-define the same settings again.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="The appearance settings.", width="800", height="584" %}

However, the **dock** setting isn't synced because developers have different dock preferences when debugging on different sites.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jWv8rwkF4q6SwTQbSNpp.png", alt="The dock.", width="426", height="134" %}


## Customize keyboard shortcuts {: #keyboard-shortcuts }

See [Settings > Shortcuts](/docs/devtools/settings/#shortcuts).

## Enable experiments {: #experiments }

See [Settings > Experiments](/docs/devtools/settings/#experiments).
