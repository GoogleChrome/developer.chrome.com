---
layout: "layouts/doc-post.njk"
title: "Other tabs"
authors:
  - sofiayem
date: 2023-02-14
#updated: YYYY-MM-DD
description: "A comprehensive reference of other Settings tabs: Workspace, Experiments, Ignore List, Devices, Throttling, Locations, and Shortcuts."
---

Configure other aspects of DevTools using the corresponding tabs in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hMEi26vDQRtc1mRc3iTj.png", alt="Other tabs in Settings.", width="800", height="552" %}

See the next sections to learn how to configure:

- [Workspace](#workspace)
- [Experiments](#experiments)
- [Ignore List](#ignore-list)
- [Devices](#devices)
- [Throttling](#throttling)
- [Locations](#locations)
- [Shortcuts](#shortcuts)

To customize the appearance of DevTools and its panels, see [Preferences](/docs/devtools/settings/preferences).

## Workspace {: #workspace }

[**Workspaces**](/docs/devtools/workspaces/) let you to save changes that you make within DevTools to source code that's stored on your computer.

{% Aside 'gotchas' %}
DevTools automatically maps your local sources to network resources using source maps. This way, you can make changes to sources in DevTools and immediately see the effect on the website you host locally and view in Chrome.
{% endAside %}

To configure your workspaces, open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [Settings][1] > **Workspace**.

### Customize exclusions {: #workspace-exclusions }

The **Folder exclude pattern** is the default global RegEx pattern that lists common and third-party folders and file types that DevTools excludes from workspaces so you can focus only on your code.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m6NjzWTH82irjOeSOCGu.png", alt="Folder exclude pattern in the Workspace tab.", width="800", height="471" %}
You can manually add new folders or file types to the pattern. Pattern changes take effect after reloading DevTools.

To change the default global list of excluded folders and files, edit the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Workspace** > **Folder exclude pattern** textbox.

### Manage Workspaces {: #manage-workspaces }

The **Workspace** tab lists folders you have set up as **Workspaces** and, for each folder, subfolders you manually excluded.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qtIbAfoPg7C7OlMMygWk.png", alt="A workspace folder with excluded subfolders.", width="800", height="536" %}
Changes to files in subfolders listed as excluded don't persist. Excluded subfolders are workplace-specific, not global.

To add a new **Workspace**:

1. [Open Settings][1].
1. In the **Workspace** tab, click **Add folder**.
1. Select the folder with your sources.
1. Click **Allow** in the prompt at the top to let DevTools make changes to sources.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fpb3F57oHqX2HYNRPxY2.png", alt="The prompt requesting full access to sources for DevTools.", width="800", height="387" %}

To remove a workspace, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0G3yI9F8BnkrEXyLf5EJ.svg", alt="Close.", width="24", height="24" %} next to the corresponding folder.

## Experiments {: #experiments }

{% Aside 'caution' %}
Chrome DevTools experiments may be unstable.
{% endAside %}

To enable an experiment:

1. [Open Settings][1].
1. In the **Experiments** tab, search for the experiment you would like to try in the **Filter** textbox.
1. Enable the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the experiment.
1. Close {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings**.
1. If required, click **Reload DevTools** in the prompt at the top.

The next time you open DevTools, the experiment is enabled. To disable an experiment, clear the corresponding checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TmKNYVbWgbsx5MSnHLgs.png", alt="The Experiments tab.", width="800", height="533" %}

## Ignore List {: #ignore-list }

The **Ignore List** tab lets you configure the list of scripts the [debugger](/docs/devtools/javascript/) ignores.

To enable or disable all ignore listing for the debugger, check or clear {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**. This is the main switch for all ignore-listing capabilities.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bissqX3mFMWLW6A1M4kp.png", alt="The Enable Ignore Listing checkbox.", width="800", height="548" %}

With ignore-listing enabled, you can further customize the list of scripts to ignore.

### Ignore Chrome Extensions scripts  {: #skip-extensions }

When using the **Sources** panel of Chrome DevTools to [step through code](/docs/devtools/javascript#code-stepping), sometimes you pause on code that you don't recognize. You're probably paused on the code of one of the Chrome Extensions that you've installed.

In {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Ignore List**, enable two checkboxes:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Add content scripts to ignore list**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/61Ez8rtic95aCrG0WhPi.png", alt="Settings DevTools to ignore extensions code.", width="800", height="525" %}

### Ignore known third-party scripts {: #skip-third-party }

To make the debugger skip known third-party scripts, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Automatically add known third-party scripts to ignore list**.

{% Aside 'gotchas' %}
DevTools adds third-party scripts to the ignore list based on the `x_google_ignoreList` property in sourcemaps. Frameworks and bundlers need to supply this information.

As of Chrome version 106, [Angular v14.1.0](https://github.com/angular/angular-cli/releases/tag/14.1.0) supports this feature. See [Case Study: Better Angular Debugging with DevTools](http://localhost:8080/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).
{% endAside %}

### Ignore a custom list of scripts {: #custom-ignore-pattern }

To ignore a single script or a custom pattern of scripts:

1.  Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**.
1.  In the **Custom exclusion rules** section, click **Add pattern**.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SToKXhMb1doVUojwzzaV.png", alt="Adding a custom pattern to the Ignore List.", width="800", height="587" %}
1.  Specify the script name or a RegEx pattern of script names to ignore.
1.  Click **Add** to save changes.

### Manage a custom list of ignored scripts {: #manage-custom-ignore-list }

To enable or disable ignoring of a specific script or pattern of script names, in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > **Custom exclusion rules**, check or clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the script or pattern.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0DZDXRV7SOgWGrzUEM7X.png", alt="A custom ignore list with a pattern or script names enabled.", width="800", height="569" %}

To edit or remove a script or a pattern of script names, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Devices {: #devices }

The **Devices** tab contains a list of devices and their dimensions. You can select these devices from the **Dimentions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

### Add a device to the Dimensions list {: #add-device }

To add a device to the list:

1. [Open Settings][1].
1. In the **Device** tab, enable the checkbox next to a device you want to add.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/81OxvjyGhfLMe1UZFJQX.png", alt="A list of enabled devices in the Devices tab.", width="800", height="606" %}

### Add a custom device {: #add-custom-device }

If you don't see a device you want to test, add a custom one:

1. [Open Settings][1].
1. In the **Device** tab, click **Add custom device**.
1. Specify the device details, for example, as shown on the screenshot:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/saf99v91L29TNeFEAKev.png", alt="Pixel 7 Pro device details.", width="800", height="1039" %}

   {% Aside 'gotchas' %}
   For more information on what to specify, see [User-Agent Client Hints](https://web.dev/user-agent-client-hints/).
   {% endAside %}

1. Click **Save**. Your device is enabled by default and you can select it from the **Dimentions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

To edit or remove a custom device you added, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Throttling {: #throttling }

The **Throttling** tab contains a list of custom throttling profiles. You can use these profiles to test [custom connection speeds in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To add a custom profile:

1. [Open Settings][1].
1. In the **Throttling** tab, click **Add custom profile**.
1. Specify the following values for the new entry:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/g3rn7EG4jq5Y3gofMlJH.png", alt="Creating a new profile in the Throttling tab.", width="800", height="464" %}

   - **Profile Name**.
   - **Download** and **Upload** speeds in Kbps.
   - **Latency** in milliseconds.

1. Click **Add** to save the new profile. You can now select it from the [throttling drop-down list in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To edit or remove an existing profile, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Locations {: #locations }

The **Location** tab contains a list of geolocation presets. You can use these presets to [override geolocation](/docs/devtools/sensors/#geolocation) in Chrome. You can also populate the list with your own preset that you use frequently.

To add a custom preset:

1. [Open Settings][1].
1. In the **Locations** tab, click **Add location**.
1. Specify the following values for the new entry. For example, let's add New York as a new location.
   - **Location name**: `New York`.
   - **Latitude**: `40.72403285608484`.
   - **Longitude**: `-73.94397543423175`.
   - **Timezone ID**: `America/New_York` as defined in the [latest release of the Time Zone Database](https://data.iana.org/time-zones/releases/).
   - **Locale**: `en-US` as defined by [BCP47](https://www.rfc-editor.org/info/bcp47).

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/poZ1KfliVyP8Np7bbZmV.png", alt="Specifying values for a new entry in the Locations list.", width="800", height="526" %}

   {% Aside 'gotchas' %}
   To copy latitude and longitude, right-click a city name on [Google Maps](https://www.google.co.uk/maps/place/New+York,+NY,+USA/).
   {% endAside %}
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AMgkP56ZekXmsK64VkS7.png", alt="New York coordinates on Google Maps.", width="400", height="351" %}

1. Click **Save**. Now you can select this preset from the [**Sensors** > **Location** drop-down list](/docs/devtools/device-mode/geolocation/#override).

To edit or remove an existing preset, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Shortcuts {: #shortcuts }

The **Shortcuts** tab lists default shortcuts you can use while focused in DevTools to speed up your workflow.

For a full list of default shortcuts, see [Keyboard shortcuts](/docs/devtools/shortcuts/).

{% Aside 'gotchas' %}
You can use the Visual Studio Code alternatives to default shortcuts. Select `Visual Studio Code` from {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Shortcuts** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Match shortcuts from preset**.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bi4B0or5wylM4jit6DfD.png", alt="Visual Studio Code shortcut alternatives.", width="800", height="416" %}

### Customize shortcuts {: #customize-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

To customize keyboard shortcuts:

1. [Open Settings][1].
1. In the **Shortcuts** tab, hover over any shortcut and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="24", height="24" %} **Edit** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BuceMKLqXmgLxRZPXTfg.png", alt="Edit shortcut.", width="800", height="596" %}

1. Put the cursor in the text bar and press any convenient combination of keys (chord). DevTools notifies you if the combination is already in use.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lsqH7u5rnAcaE3dQdqWH.png", alt="A chord shortcut that is already in use.", width="800", height="565" %}

1. Record a new combination and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7l4ffLtFrht87gVnT0IZ.svg", alt="Check.", width="24", height="24" %} **Check** button.

   {% Aside 'gotchas' %}
   To add an additional synonymous combination, click **Add a shortcut** and record another chord in a similar way.
   {% endAside %}

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3VBJ5QKkUCG1H2FX8f78.png", alt="Save the new shortcut.", width="800", height="565" %}

To revert or delete changes, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tby5LrQzKTKzHia2fEBO.svg", alt="Back.", width="24", height="24" %} **Back** or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete**.

### Add shortcuts to unassigned actions {: #assign-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

By default, DevTools doesn't assign shortcuts to all available actions.

For example, to toggle [light and dark theme preference](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) with a keystroke, in the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** > **Rendering** section, set your own shortcut as described in [Customize shortcuts](#customize-shortcuts).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Toggle light and dark themes with keyboard shortcut.", width="800", height="576" %}

### Restore default shortcuts {: #restore-defaults }

To bring back defaults, click **Restore default shortcuts** in the bottom-right corner of the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nQK0bSoeOzjAzWnmC3AY.png", alt="Restore default shortcuts.", width="800", height="463" %}

[1]: /docs/devtools/settings/#open
