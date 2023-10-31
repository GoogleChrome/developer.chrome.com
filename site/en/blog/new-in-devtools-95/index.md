---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 95)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
  "New CSS length authoring tools, hide issues in the Issues tab, improved the display of properties, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Z98rfRfuNDjERrDwXnrD.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

## New CSS length authoring tools {: #length }

DevTools added an easier yet flexible way to update lengths in CSS!

In the **Styles** pane, look for any CSS property with length (e.g. `height`, `padding`).

Hover over the unit type, and notice the unit type is underlined. Click on it to select a unit type from the dropdown.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

Hover over the unit value, and your mouse pointer is changed to horizontal cursor. Drag horizontally to increase or decrease the value. To adjust the value by 10, hold the <kbd>Shift</kbd> key when dragging.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

You can still edit the unit value as text — just click on the value and start editing.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Chromium issues: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


## Hide issues in the Issues tab {: #hide-issues }

You can now hide specific issues in the Issues tab to focus only on those issues that matter to you.

In the [Issues tab](/docs/devtools/issues/), hover over on an issue you would like to hide. Click on **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="Hide issues menu", width="800", height="488" %}

All hidden issues will be added under the **Hidden issues** pane. Expand the pane. You can unhide all hidden issues or a selected one. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="Hidden issues pane", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Chromium issue: [1175722](https://crbug.com/1175722)


## Improved the display of properties {: #properties }

DevTools improve the display of properties by:

- Always bold and sort own properties first in the **Console**, **Sources** panel and **Properties** pane. 
- Flatten the properties display in the **Properties** pane.

For example, the snippet below creates an [`URL`](https://developer.mozilla.org/docs/Web/API/URL) object `link` with 2 own properties: `user` and `access`, and updates the value of an inherited property `search`.

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

Try logging `link` in the **Console**. Own properties are now bold and sorted first. These changes make it easier to spot custom properties, especially for [Web APIs](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) with many inherited properties.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="Own properties are bold and sorted first", width="800", height="561" %}

Apart from these changes, the properties in the  **Properties** pane are also flattened now for better DOM properties debugging experience, especially for [Web components](https://www.webcomponents.org/introduction). 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="Flatten properties", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Chromium issues: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


## Lighthouse 8.4 in the Lighthouse panel {: #lighthouse }

The **Lighthouse** panel is now running Lighthouse 8.4. Lighthouse will now detect if the [Largest Containful Paint (LCP)](https://web.dev/lcp) element was a lazy-loaded image and recommend removing the `loading` attribute from it.

Check out the [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) for more details on the updates.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="The lazy-loaded LCP audit in a Lighthouse report", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Chromium issue: [772558](https://crbug.com/772558)


## Sort snippets in the Sources panel {: #snippets }

The [snippets](/docs/devtools/javascript/snippets/) in the **Snippets** pane under the **Sources** panel are now sorted alphabetically. Previously, it’s not sorted.

Utilize the snippets feature to run commands quicker. Watch this video for a [tip](https://youtu.be/NOal2gTzftI?t=176)!
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="Sort snippets in the Sources panel", width="800", height="475" %}

Chromium issue: [1243976](https://crbug.com/1243976)


## New links to translated release notes and report a translation bug {: #localized }

You can now click to read the DevTools release notes in 6 other languages - [Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95), [Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95), [Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95)  via the What’s new tab. 

Since Chrome 94, you can [set your preferred language](/blog/new-in-devtools-94/#localized) in DevTools. If you found any issues with the translations, help us improve it by [reporting a translation issue](https://goo.gle/devtools-translate) via **More options** > **Help** > **Report a translation bug**. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="New links to translated release notes and report a translation bug", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Chromium issues: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481) 


## Improved UI for DevTools command menu {: #command-menu }

Did you find it hard to search for a file in the [Command Menu](/docs/devtools/command-menu/#open)? Good news for you, the **Command Menu** user interface is now enhanced! 

Open the **Command Menu** to search for a file with keyboard shortcut <kbd>Control</kbd>+<kbd>P</kbd> in Windows and Linux, or <kbd>Command</kbd>+<kbd>P</kbd> in MacOS.

The UI improvements of the **Command Menu** is still ongoing, stay tuned for more updates!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="Command Menu", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Chromium issue: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
