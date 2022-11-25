---
layout: 'layouts/blog-post.njk'
title: "What's New In DevTools (Chrome 107)"
authors:
  - jecelynyeen
date: 2022-09-20
description: 'Customize keyboard shortcuts, highlight C/C++ objects in the Memory Inspector and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cyulcPa8T8YshkToHVLw.svg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---


{% Partial 'devtools/banner.md' %}

{% YouTube id='1uwv6HbR8HU' %}

<!-- Content starts here -->

## Customize keyboard shortcuts in DevTools {: #shortcuts }

You can now customize keyboard shortcuts for your favorite commands in DevTools.

Go to **Settings** > **Shortcuts**, hover over a command and click the **Edit** button (pen icon) to customize the keyboard shortcut. You can create chords (a.k.a multi-key press shortcuts) as well. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="Customize keyboard shortcuts in DevTools.", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Chromium issues: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


## Toggle light and dark themes with keyboard shortcut {: #toggle-themes }

Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Toggle light and dark themes with keyboard shortcut.", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


## Highlight C/C++ objects in the Memory Inspector {: #memory }

The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object.

Recognizing an object’s bytes among the surrounding WebAssembly memory was a pain point. You have to know the object’s size and count bytes from the object’s start.

With this feature,  it helps you tell them apart from the surrounding memory. See [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/) to learn more about the changes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="Highlight C/C++ objects in the Memory Inspector.", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Chromium issue: [1336568](https://crbug.com/1336568)


## Support full initiator information for HAR import {: #har }

Full **Initiator** information is available now for [HAR import](/docs/devtools/network/reference/#save-as-har). Previously, the **Network** panel only shows partial initiator information during import.

The initiator information helps developers to trace the origin of a network request and identify network-related issues. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="Support full initiator information for HAR import.", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Chromium issue: [1343185](https://crbug.com/1343185)



## Start DOM search after pressing `Enter` {: #search-type }

You can now disable the **Search as you type** setting to always start DOM search after pressing <kbd>Enter</kbd>. 

In the **Elements** panel, toggle the search bar with <kbd>Control</kbd> or <kbd>Command</kbd> + <kbd>F</kbd>. As you type a query in the search textbox, the DOM tree will jump to the first matching element and highlight it by default. 

For users, especially testers who always work with lengthy search queries, this behavior is not ideal. The DOM tree might jump multiple times as you type in a lengthy search query (e.g. `//div[@id="example"]`). This behavior creates unnecessary motion.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="DOM search.", width="800", height="505" %}

Go to **Settings** > **Preferences**, disable **Search as you type**. With this change, the search will start only after you press <kbd>Enter</kbd>.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Search as you type setting.", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Chromium issue: [1344526](https://crbug.com/1344526)


## Display `start` and `end` icons for `align-content` CSS flexbox properties {: #flexbox }

In the **Styles** pane, edit the `align-content` properties in a CSS class with `display: flex` or `display: inline-flex`. The `start` and `end` show in the auto-complete dropdown with icons.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="align-content flexbox properties.", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Chromium issue: [1139945](https://crbug.com/1139945)


## Miscellaneous highlights {: #misc }

- Display correct message counts in the **Console** sidebar. Previously, the counts didn't refresh when clearing console messages. ([1343311](https://crbug.com/1343311))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
