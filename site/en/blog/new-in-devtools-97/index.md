---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-25
updated: 2021-11-25
description:
  "New Recorder panel, refresh device list in Device Mode, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xy6CXdvjfEHDvsFehr9B.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

## Preview feature: New Recorder panel {: #recorder }

Use the new **Recorder** panel to record, replay and measure user flows. 

[Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording. 

For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel.

Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial!

The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Recorder panel", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1257499](https://crbug.com/1257499)


## Refresh device list in Device Mode {: #device }

[Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="Refresh device list in Device Mode", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Chromium issue: [1223525](https://crbug.com/1223525)


## Autocomplete with Edit as HTML {: #code-completion }

The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="Autocomplete with Edit as HTML", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Chromium issue: [1215072](https://crbug.com/1215072)


## Improved code debugging experience {: #debugging }

Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="Column number in the output error", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Chromium issue: [1073064](https://crbug.com/1073064)

## [Experimental] Syncing DevTools settings across devices {: #sync }

Your DevTools settings are now synced across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools sync settings", width="800", height="654" %}

This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again. Learn more about the sync feature in [DevTools customization](/docs/devtools/customize/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="appearance settings", width="800", height="584" %}

This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, please share with us [here](https://crbug.com/1245541).

Chromium issue: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

