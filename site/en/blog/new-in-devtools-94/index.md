---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "Use DevTools in your preferred language, new Nest Hub devices, new CSS container queries badge and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ar2bYZVZCt9GPDfVtrTV.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}

## Use DevTools in your preferred language {: #localized }
Chrome DevTools now supports more than 80 languages, allowing you to work in your preferred language!

Open [Settings](/docs/devtools/customize/#settings), then select your preferred language under the  **Preferences** > **Language** dropdown and reload DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="Change language in Settings > Preferences", width="800", height="494" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium issue: [1163928](https://crbug.com/1163928)


## New Nest Hub devices in the Device list {: #nest-hub }
You can now simulate the dimensions of Nest Hub and Nest Hub Max in the [Device mode](/docs/devtools/device-mode/).

Click [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, select Nest Hub or Nest Hub Max under the device list. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub device in the Device mode", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium issue: [1223525](https://crbug.com/1223525)


## Origin trials in the Frame details view {: #origin-trials }
You can now get information about a site's [origin trials](/blog/origin-trials/) in the frame details view under the Application panel. 

[Origin trials](/blog/origin-trials/) gives you access to a new or experimental feature, to build functionality your users can try out for a limited time before the feature is made available to everyone.

Open a page with origin trials (e.g. [demo page](https://mediastreamtrack.glitch.me)). In the **Application** panel, scroll down to the **Frames** section and select the top frame.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials in the Frame details view", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium issue: [607555](https://crbug.com/607555)


## New CSS container queries badge {: #container-queries }
A new **container** badge is added next to the container elements (the ancestor elements that match the criteria of `@container` at-rules). Click the badge to toggle the display of an overlay of the chosen container and all its querying descendants on the page.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS container queries badge", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## New checkbox to invert the network filters {: #invert-network-filter }
Use the new **Invert** checkbox to invert the filters in the Network panel.

For example, you can type "status-code: 404" to filter the network requests with status 404. Enable the **Invert** checkbox to negate the filter (show all network requests which are not with status 404).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Invert the network filters", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium issue: [1054464](https://crbug.com/1054464)


## Upcoming deprecation of the Console sidebar {: #deprecated }
The Console sidebar will be removed in favor of moving the filter UI to the toolbar. Do you have any concerns or feedback? Let us know via this [issue tracker](https://crbug.com/1232937).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Console sidebar deprecation message", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium issue: [1232937](https://crbug.com/1232937)


## Display raw `Set-Cookie` headers in the Issues tab and Network panel {: #raw-cookies }
DevTools now displays raw `Set-Cookie` headers in the **Issues** tab.

Previously, DevTools did not show malformed cookies (incorrect `Set-Cookie` header) in the Network panel. With the new `response-header-set-cookie` filter added in the **Network** panel, users can filter the raw `Set-Cookie` header response. DevTools will link the raw `Set-Cookie` headers in the **Issues** tab to the **Network** panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Raw 'Set-Cookie' headers in the Issues tab and Network panel", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium issue: [1179186](https://crbug.com/1179186)


## Consistent display native accessors as own properties in the Console {: #native-accessors }
The **Console** now displays native accessors as their own properties consistently.

For example, when evaluating the `new Int8Array([1, 2, 3])` expression in the **Console**, native accessors like `length`, `byteOffset` did not display in the preview. With this latest update, native accessors are shown in the preview and values are eagerly evaluated when expanded.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Consistent display native accessors as own properties in the Console", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium issues: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Proper error stack traces for inline scripts with #sourceURL {: #inline-script }
DevTools now resolves inline scripts with `#sourceURL` properly and shows proper error stack traces for debugging.

Previously DevTools displayed incorrect location for inline scripts with `#sourceURL`, relative to the surrounding document rather than relative to the opening `<script>` tag.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Proper error stack traces for inline scripts with #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium issues: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## Change color format in the Computed pane {: #color-unit }

You can now change the color format of any element in the Computed pane by <kbd>Shift</kbd> + click on the color preview.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+Click the color preview to change color format", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium issue: [1226371](https://crbug.com/1226371)

## Replace custom tooltips with native HTML tooltips {: #tooltip }

DevTools now adopts native HTML tooltips across all components. DevTools has had a custom tooltip implementation for a long time due to the lack of styling of a native HTML tooltip.

Unfortunately, maintaining a custom tooltip implementation is complicated and we regularly run into complicated bugs.

After reweighting the benefits of the custom implementations, we find that the native HTML tooltips are sufficient for DevTools and adopting the tooltips prevents a vast variety of problems for our users.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium issue: [1223391](https://crbug.com/1223391)


## [Experimental] Hide issues in the Issues tab {: #hide-issues }
{% Aside %}
To enable the experiment, check the **Enable hide issues menu** checkbox under **Settings** > **Experiments**.
{% endAside %}

Enable the **hide issues menu** experiment to hide issues in the **Issues** tab. This way, you can focus on the important issues that matter to you.

In the **Issue** tab, hover an issue, click on the issue menu &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; on the right, select **Hide issues like this** to hide it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Experimental hide issue context menu", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium issue: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
