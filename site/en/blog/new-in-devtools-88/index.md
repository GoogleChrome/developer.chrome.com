---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 88)"
authors:
  - jecelynyeen
date: 2020-11-12
#updated: YYYY-MM-DD
description:
  "New CSS angle visualization tools, emulate unsupported image types and storage quota, new Web
  Vitals lane and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OcPfMxTKFgMh9mipiPu3.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-88
---

{% Aside %}

Interested in helping improve DevTools? Sign up to participate in [Google User Research here][1].

{% endAside %}

{% YouTube id="3tUXV\_n3yng" %}

## Faster DevTools startup {: #fast-startup }

DevTools startup now is ~37% faster in terms of JavaScript compilation (from 6.9s down to 5s)! 🎉

The team did some optimization to reduce the performance overhead of serialisation, parsing and
deserialisation during the startup.

There will be an upcoming engineering blog post explaining the implementation in detail. Stay tuned!

Chromium issue: [1029427][2]

## New CSS angle visualization tools {: #css-angle }

DevTools now has better support for CSS angle debugging!

{% Img src="image/admin/M1Au4mPpxHaFbLoEGNIi.png", alt="CSS angle", width="800", height="608" %}

When an HTML element on your page has CSS angle applied to it (e.g.
`background: linear-gradient(angle, color-stop1, color-stop2)`, `transform: rotate(angle)`), a clock
icon is shown next to the angle in the Styles pane. Click on the clock icon to toggle the clock
overlay. Click anywhere in the clock or drag the needle to change the angle!

There are mouse and keyboard shortcuts to change the angle value as well, check out our
[documentation][3] to learn more!

Chromium issues: [1126178][4], [1138633][5]

## Emulate unsupported image types {: #emulate-image }

DevTools added two new emulations in the Rendering tab, allowing you to disable AVIF and WebP image
formats. These new emulations make it easier for developers to test different image loading
scenarios without having to switch browsers.

Suppose we have the following HTML code to serve an image in AVIF and WebP for newer browsers, with
a fallback PNG image for older browsers.

```js
<picture>
  <source srcset="test.avif" type="image/avif">
  <source srcset="test.webp" type="image/webp">
  <img src="test.png" alt="A test image">
</picture>
```

Open the **Rendering** tab, select "Disable AVIF image format" and refresh the page. Hover over the
`img src`. The current image src (`currentSrc`) is now the fallback WebP image.

{% Img src="image/admin/WHyF0XexaaWPCp07vJRj.png", alt="Emulate image types", width="800", height="480" %}

Chromium issue: [1130556][6]

## Simulate storage quota size in the Storage pane {: #simulate-storage }

You can now override storage quota size in the Storage pane. This feature gives you the ability to
simulate different devices and test the behavior of your apps in low disk availability scenarios.

Go to **Application** > **Storage**, enable the **Simulate custom storage quota** checkbox, and
enter any valid number to simulate the storage quota.

{% Img src="image/admin/tO7iv8T0Y1mPK4fMFQSK.png", alt="Simulate storage quota size", width="800", height="480" %}

Chromium issues: [945786][7], [1146985][8]

## New Web Vitals lane in the Performance panel recordings {: #web-vitals }

Performance recordings now have an option to display Web Vitals information.

After recording your load performance, enable the **Web Vitals** checkbox in the Performance panel
to view the new Web Vitals lane.

The lane currently displays Web Vitals information such as [First Contentful Paint][9] (FCP),
[Largest Contentful Paint][10] (LCP) and [Layout Shift][11] (LS).

Check out [web.dev/vitals][12] to learn more about how to optimize user experience with the Web
Vitals metrics.

{% Img src="image/admin/AFxlLLBhqMQdxTbc1s92.png", alt="Web Vitals lane", width="800", height="480" %}

Chromium issue: N/A

## Report CORS errors in the Network panel {: #cors }

DevTools now shows CORS error when a network request is failed due to Cross-origin Resource Sharing
(CORS).

In the **Network** panel, observe the failed CORS network request. The status column shows **"CORS
error"**. Hover over on the error, the tooltip now shows the error code. Previously, DevTools only
showed generic **"(failed)"** status for CORS errors.

This lays the foundation for our next enhancements on providing more detailed description of the
CORS problems!

{% Img src="image/admin/DHGTFV0ybVJzeD3MmUIe.png", alt="CORS errors", width="800", height="480" %}

Chromium issue: [1141824][13]

## Frame details view updates {: #frame-details }

### Cross-origin isolation information in the Frame details view {: #cross-origin }

The cross-origin isolated status is now displayed under the **Security & Isolation** section.

The new **API availability** section displays the availability of `SharedArrayBuffer`s (SAB) and
whether they can be shared using `postMessage()`.

A deprecation warning will show if the SAB and `postMessage()` is currently available, but the
context is not cross-origin isolated. Learn more about cross-origin isolation and why it will be
required for features like `SharedArrayBuffers` in this [article][14].

{% Img src="image/admin/zUKJS3qlUNqxTpPYLslQ.png", alt="Cross-origin information", width="800", height="480" %}

Chromium issue: [1139899][15]

### New Web Workers information in the Frame details view {: #web-worker }

DevTools now displays dedicated web workers under the frame which creates them.

In the **Application** panel, expand a frame with web workers, then select a worker under the
**Workers** tree to view the web worker's details.

{% Img src="image/admin/rHxO3TM0jpwuDj2XFW7L.png", alt="Web workers information", width="800", height="480" %}

Chromium issues: [1122507][16], [1051466][17]

### Display opener frame details for opened windows {: #opener-frame }

You can now view the details about which frame caused the opening of another Window.

Select an opened window under the **Frames** tree to view the window details. Click on the **Opener
Frame** link to reveal the opener in the Elements panel.

{% Img src="image/admin/ceCIdX7RvwqU226EgZXK.png", alt="Opener frame details", width="800", height="480" %}

Chromium issue: [1107766][18]

## Open Network panel from the Service Workers pane {: #sw }

View all service worker (SW) request routing information with the new **Network requests** link.
This provides developers added context when debugging the SW.

Go to **Application** > **Service Workers**, click on the **Network requests** of a SW. The
**Network** panel is opened in the bottom panel displaying all service worker related requests (the
network requests are filtered by _"is:service-worker-intercepted"_).

{% Img src="image/admin/ivX2jn1HnNYrpKA6gOmR.png", alt="Open Network panel from the Service Workers", width="800", height="480" %}

Chromium issue: N/A

## New copy options in the Network panel {: #copy }

### Copy property value {: #copy-value }

The new **"Copy value"** option in the context menu lets you copy the property value of a network
request.

{% Img src="image/admin/5eUVpfTNli3XXgaFoScB.png", alt="Copy property value", width="800", height="480" %}

In the **Network** panel, click on a network request to open the **Headers** pane. Right click on
one of the properties under these section: Request payload (JSON) Form Data Query String Parameters
Request Headers Response Headers

Then, you can select **Copy value** to copy the property value to your clipboard.

Chromium issue: [1132084][19]

### Copy stacktrace for network initiator {: #copy-stacktrace }

Right-click a network request, then select **Copy stacktrace** to copy the stacktrace to your
clipboard.

{% Img src="image/admin/D50DOHVfdgQ2d0P2hDSP.png", alt="Copy stacktrace", width="800", height="480" %}

Chromium issue: [1139615][20]

## Wasm debugging updates {: #wasm }

### Preview Wasm variable value on mouseover {: #wasm-mouseover }

When hovering over a variable in WebAssembly (Wasm) disassembly while paused on a breakpoint,
DevTools now shows the variable current value.

In the **Sources** panel, open a Wasm file, put a breakpoint and refresh the page. Hover to a
variable to see the value.

{% Img src="image/admin/6Uugv35ktmbzkQyJ3X92.png", alt="Preview Wasm variable on mouseover", width="800", height="480" %}

Chromium issues: [1058836][21], [1071432][22]

### Evaluate Wasm variable in the Console {: #wasm-console }

You can now evaluate Wasm variable in the Console while paused on a breakpoint.

In this example, we put a breakpoint on the line `local.get $input`. When debugging, type `$input`
in the Console will return the current value of the variable, which is `4` in this case.

{% Img src="image/admin/sxagdNxUWL0G8qBUsQnu.png", alt="Evaluate Wasm variable in the Console", width="800", height="508" %}

Chromium issue: [1127914][23]

## Consistent units of measurement for file/memory sizes {: #consistent-kb }

DevTools now consistently use kB for displaying file/memory sizes. Previously DevTools mixed kB
(1000 bytes) and KiB (1024 bytes). For example, the Network panel previously used "kB" labels but
actually performed calculations using KiB, which caused needless confusion.

Chromium issue: [1035309][24]

## Highlight pseudo elements in the Elements panel {: #pseudo }

DevTools has increased the color contrast of pseudo elements to help you better spot them.

{% Img src="image/admin/9vSBemIYz3MuM4eaq4ge.png", alt="Highlight pseudo elementse", width="800", height="549" %}

Chromium issue: [1143833][25]

## Experimental features {: #experimental }

### CSS Flexbox debugging tools {: #flexbox }

{% Aside %}

To enable the experiment, check the **Enable CSS Flexbox debugging features** checkbox under
**Settings** > **Experiments**.

{% endAside %}

Flexbox debugging tools are coming!

For starters, DevTools now shows a `flex` badge in the Elements panel for elements with
`display: flex` applied to it.

Beside that, new alignment icons are added in the following flexbox properties:

- `flex-direction`
- `align-items`
- `align-content`
- `align-self`
- `justify-items`
- `justify-content`

On top of that, these icons are context-aware. The icon direction will be adjusted according to:

- `flex-direction`
- `direction`
- `writing-mode`

These icons aim to help you better visualize the flexbox layout of the page.

{% Img src="image/admin/DtWip3leUSGoK2Rvm92B.png", alt="CSS Flex debugging", width="800", height="480" %}

Here is the [design doc][26] of the Flexbox tooling features. More features will be added soon.

Give it a try and [let us know][27] what you think!

Chromium issues: [1144090][28], [1139945][29]

### Customize chords keyboard shortcuts {: #keyboard-shortcuts }

{% Aside %}

To enable the experiment, check the **Enable keyboard shortcut editor** checkbox under
**Settings** > **Experiments**.

{% endAside %}

DevTools added experimental support for [customize keyboard shortcuts][30] since last release.

You can now create chords (a.k.a multi-keypress shortcuts) in the shortcut editor.

Go to **Settings** > **Shortcuts**, hovering on a command and click the **Edit** button (pen icon)
to customize the chords shortcut.

{% Img src="image/admin/tF18281gSqF69MENLGuk.png", alt="Chords keyboard shortcuts", width="800", height="508" %}

Chromium issue: [174309][31]

[1]:
  https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXbl384838
[2]: https://crbug.com/1029427
[3]: /docs/devtools/css/reference#angle-clock
[4]: https://crbug.com/1126178
[5]: https://crbug.com/1138633
[6]: https://crbug.com/1130556
[7]: https://crbug.com/945786
[8]: https://crbug.com/1146985
[9]: https://web.dev/fcp
[10]: https://web.dev/lcp
[11]: https://web.dev/cls
[12]: https://web.dev/vitals
[13]: https://crbug.com/1141824
[14]: https://web.dev/why-coop-coep
[15]: https://crbug.com/1139899
[16]: https://crbug.com/1122507
[17]: https://crbug.com/1051466
[18]: https://crbug.com/1107766
[19]: https://crbug.com/1132084
[20]: https://crbug.com/1139615
[21]: https://crbug.com/1058836
[22]: https://crbug.com/1071432
[23]: https://crbug.com/1127914
[24]: https://crbug.com/1035309
[25]: https://crbug.com/1143833
[26]: https://goo.gle/devtools-flex
[27]: https://crbug.com/1136394
[28]: https://crbug.com/1144090
[29]: https://crbug.com/1139945
[30]: /blog/new-in-devtools-87#customize
[31]: https://crbug.com/174309
