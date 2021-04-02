---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 81)"
authors:
  - kaycebasques
date: 2020-01-29
#updated: YYYY-MM-DD
description: "Moto G4 in Device Mode, new cookie-related features, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/F1FaxjoLJGCQb5XXvX5m.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-81
---

{% YouTube id="HJNaNDspffM" %}

## Moto G4 support in Device Mode {: #motog4 }

After [enabling the Device Toolbar][1] you can now simulate the dimensions of a Moto G4 viewport
from the **Device** list.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sjq2F9xT7TvvuMn9dK19.png", alt="Simulating a Moto G4 viewport", width="800", height="697" %}

Click [Show Device Frame][2] to show the Moto G4 hardware around the viewport.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/g4Zv3NVUWJ9zXA8ap5Nx.png", alt="Showing the Moto G4 hardware", width="800", height="663" %}

Related features:

- Open the [Command Menu][3] and run the `Capture screenshot` command to take a screenshot of the
  viewport that includes the Moto G4 hardware (after enabling **Show Device Frame**).
- [Throttle the network and CPU][4] to more accurately simulate a mobile user's web browsing
  conditions.

[Chromium issue #924693][5]

## Cookie-related updates {: #cookies }

### Blocked cookies in the Cookies pane {: #blockedcookies }

The Cookies pane in the Application panel now colors blocked cookies with a yellow background.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/xL1eFHhHrBSttaKvAWNY.png", alt="Blocked cookies in the Cookies pane of the Application panel", width="800", height="339" %}

See also [Debug why a cookie was blocked][6] to learn how to access a similar UI from the Network
panel.

[Chromium issue #1030258][7]

### Cookie priority in the Cookie pane {: #cookiepriority }

The Cookies tables in the Network and Application panels now include a **Priority** column.

{% Aside "caution" %}

Chrome is the only browser that supports cookie priority.

{% endAside %}

[Chromium issue #1026879][8]

### Edit all cookie values {: #edit }

All cells in the Cookie tables are editable now, except cells in the **Size** column because that
column represents the network size of the cookie, in bytes. See [Fields][9] for an explanation of
each column.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/I9QWmwImTskUoTWvNl6f.png", alt="Editing a cookie value", width="800", height="267" %}

### Copy as Node.js fetch to include cookie data {: #fetchcookies }

Right-click a network request and select **Copy** > **Copy as Node.js fetch** to get a `fetch`
expression that includes cookie data.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iu0PwomIqe8ebeeLTtKM.png", alt="Copy as Node.js fetch", width="800", height="393" %}

[Chromium issue #1029826][10]

## More accurate web app manifest icons {: #manifesticons }

Previously, the Manifest pane in the Application panel would perform its own requests in order to
display web app manifest icons. DevTools now shows the exact same manifest icon that Chrome uses.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/d6TqfMrcnEc21yq9bXMq.png", alt="Icons in the Manifest pane", width="800", height="521" %}

[Chromium issue #985402][11]

## Hover over CSS `content` properties to see unescaped values {: #content }

Hover over the value of a `content` property to see the unescaped version of the value.

For example, on this [demo][12] when you inspect the `p::after` pseudo-element you see an escaped
string in the Styles pane:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sgqFVrsJHu5X6sRu1zNw.png", alt="The escaped string", width="800", height="497" %}

When you hover over the `content` value you see the unescaped value:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/R906EbXoT2HZ5Qa2s81W.png", alt="The unescaped value", width="586", height="72" %}

## More detailed source map errors in the Console {: #sourcemaperrors }

The Console now provides more detail on why a source map failed to load or parse. Previously it just
provided an error without explaining what went wrong.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OHmBSg0ClDD9vOlk4bt9.png", alt="A source map loading error in the Console", width="800", height="479" %}

## Setting for disabling scrolling past the end of a file {: #scrolling }

Open [Settings][13] and then disable **Preferences** > **Sources** > **Allow scrolling past end of
file** to disable the default UI behavior that allows you to scroll well past the end of a file in
the **Sources** panel.

Here's a [GIF of the feature][14].

[1]: /docs/devtools/device-mode#viewport
[2]: /docs/devtools/device-mode#frame
[3]: /docs/devtools/command-menu
[4]: /docs/devtools/device-mode#throttle
[5]: https://crbug.com/924693
[6]: /blog/new-in-devtools-79#blockedcookies
[7]: https://crbug.com/1030258
[8]: https://crbug.com/1026879
[9]: /docs/devtools/storage/cookies#fields
[10]: https://crbug.com/1029826
[11]: https://crbug.com/985402
[12]: https://mathiasbynens.github.io/css-dbg-stories/css-escapes.html
[13]: /docs/devtools/customize#settings
[14]: https://imgur.com/zJytuf1
