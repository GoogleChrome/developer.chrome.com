---
layout: "layouts/doc-post.njk"
title: "Settings overview"
authors:
  - sofiayem
date: 2023-02-14
#updated: YYYY-MM-DD
description: "Settings overview."
---

DevTools settings let you control the behavior of both individual panels and DevTools in general.

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** panel has several tabs described in the following sections:

- [**Preferences**](/docs/devtools/settings/preferences/)
- [**Workspace**](/docs/devtools/settings/workspace)
- [**Experiments**](/docs/devtools/settings/experiments)
- [**Ignore List**](/docs/devtools/settings/ignore-list)
- [**Devices**](/docs/devtools/settings/devices)
- [**Throttling**](/docs/devtools/settings/throttling)
- [**Locations**](/docs/devtools/settings/locations)
- [**Shortcuts**](/docs/devtools/settings/shortcuts)

## Open Settings {: #open }

To open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings**:

1. [Open DevTools](/docs/devtools/open/) on any page.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** button in the action bar at the top.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KSgG5FtMU6pvdR8qUpJq.png", alt="The Settings button in the action bar at the top of DevTools.", width="800", height="464" %}

   {% Aside 'gotchas' %}
   Be careful not to confuse general DevTools settings with panel settings. DevTools settings are on the topmost action bar.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OQk9CIpYLf4lGToIyL5G.png", alt="General DevTools settings on the topmost action bar and panel settings on the panel's action bar.", width="800", height="315" %}
   {% endAside %}

1. Alternatively, when focused in DevTools, press:

   - <kbd>?</kbd>
   - <kbd>F1</kbd> on Windows or Linux
   - <kbd>Fn</kbd> + <kbd>F1</kbd> on Mac

The **Settings** panel opens.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bEjoxfvtBIHKXqb4lvnN.png", alt="The Settings panel.", width="800", height="450" %}

## Use the Command Menu to access settings faster {: #command-menu-settings }

The [Command Menu](/docs/devtools/command-menu/) is a faster alternative to accessing many of the settings. In particular, if you remember the name of the settings or even its value but don't remember where the setting is.

To quickly change a setting:

1. [Open the Command Menu](/docs/devtools/command-menu/#open).
1. Start typing the setting's name or its value, select a suggested option, and press <kbd>Enter</kbd>.

For example, to set the DevTools UI language to Chinese, type `Chinese` and select an option.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dBRcWgqLF2s5z1hUmMXV.png", alt="Options for a Chinese DevTools UI locale.", width="800", height="491" %}

These commands directly set the value of {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Appearance**](/docs/devtools/settings/preferences/#appearance) > Language.


