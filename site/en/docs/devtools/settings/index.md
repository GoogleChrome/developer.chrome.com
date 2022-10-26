---
layout: "layouts/doc-post.njk"
title: "Settings reference"
authors:
  - sofiayem
date: 2022-10-25
#updated: YYYY-MM-DD
description: "A comprehensive reference of all DevTools settings."
---

Configure DevTools to your preferences with this comprehensive list of all DevTools settings.

## Open Settings {: #open }

To open **Settings**:

1. [Open DevTools](/docs/devtools/open/) on any page.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** button in the action bar at the top of DevTools.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KSgG5FtMU6pvdR8qUpJq.png", alt="The Settings button in the action bar at the top of DevTools.", width="800", height="464" %}

   Alternatively, you can press <kbd>F1</kbd> (Windows or Linux) or <kbd>Fn</kbd> + <kbd>F1</kbd> (Mac) when focused in DevTools.

The **Settings** panel has a list of tabs explained in detail in the sections below.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bEjoxfvtBIHKXqb4lvnN.png", alt="The Settings panel.", width="800", height="450" %}

## Preferences

### Appearance

### Sources

### Elements

### Network

### Performance

### Console

### Extension

### Persistence

### Debugger

### Global

### Sync

## Workspace

## Experiments

## Ignore List

## Devices

## Throttling

## Locations

The **Location** tab contains a list of geolocation presets. You can use these presets to [override geolocation](/devtools/device-mode/geolocation/) in Chrome. You can also populate the list with your own preset that you use frequently.

To add a custom preset:

1. In the **Locations** tab, click **Add location**.
1. Then specify the following values for the new entry:
   {% Aside 'gotchas' %}
   To copy latitude and longitude, right-click a city name on [Google Maps](https://www.google.co.uk/maps/place/New+York,+NY,+USA/).
   {% endAside %}
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AMgkP56ZekXmsK64VkS7.png", alt="New York coordinates on Google Maps.", width="400", height="351" %}

   - **Location name**: for example, `New York`.
   - **Latitude**: `40.72403285608484`.
   - **Longitude**: `-73.94397543423175`.
   - **Timezone ID**: `America/New_York` as defined in the [latest release of the Time Zone Database](https://data.iana.org/time-zones/releases/).
   - **Locale**: `en-US` as defined by [BCP47](https://www.rfc-editor.org/info/bcp47).

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/poZ1KfliVyP8Np7bbZmV.png", alt="Specifying values for a new entry in the Locations list.", width="800", height="526" %}

1. Click **Save**. Now you can select this preset from the [**Sensors** > **Location** drop-down list](/docs/devtools/device-mode/geolocation/#override).

To edit or remove an existing preset, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Shortcuts