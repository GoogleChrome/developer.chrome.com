---
layout: "layouts/doc-post.njk"
title: "Test Responsive and Device-specific Viewports"
date: 2015-04-13
updated: 2020-07-10
description:
  "Chrome DevTools&#39; Device Mode lets you mimic how your development site will look in production
  on a range of devices."
---

!!!.aside.aside--warning

**This page is deprecated**. There are links to up-to-date documentation throughout the page.

!!!

The updated Device Mode (since Chrome 49) is an integral part of the now-mobile-first DevTools and
extends the main DevTools bar. Learn how to use its controls to simulate a wide range of devices or
go fully responsive.

## TL;DR {: #tldr }

- Test your site's responsiveness using the Device Mode's screen emulator.
- Save custom presets so you can easily access them later.
- Device mode isn't a replacement for real device testing. Be aware of its limitations.

## Using the viewport controls {: #viewport-controls }

!!!.aside.aside--warning

**This page is deprecated**. See [Response Viewport Mode][1] and [Mobile Device Viewport Mode][2].

!!!

{% Img src="image/admin/tZAo3YXiqJNVR2ggHK39.png", alt="device mode enabled", width="800", height="303" %}

The Viewport Controls allow you to test your site against a variety of devices, as well as fully
responsively. It comes in two modes:

1.  **Responsive**. Makes the Viewport freely resizable via big handles on either side.
2.  **Specific Device**. Locks the Viewport to the exact viewport size of a specific device and
    emulates certain device characteristics.

## Responsive mode {: #responsive_mode }

!!!.aside.aside--warning

**This page is deprecated**. See [Response Viewport Mode][3].

!!!

We recommend using the **Responsive Mode** as your default work mode. Use it during active
development of your site and app and resize the viewport often to create a freely responsive design
that adapts to even unknown and future device types.

To get the most out of the Responsive Mode, turn on the [Media Queries Bar][4].

### Customize the viewport size {: #customize_the_viewport_size }

Either drag the big resize handles on the viewport or click into the values in the menu bar for
finer grained control.

## Device-specific mode {: #device-specific_mode }

!!!.aside.aside--warning

**This page is deprecated**. See [Mobile Device Viewport Mode][5].

!!!

Use the **Device-specific Mode** when you're nearing the end of active development and want to
perfect how your site looks like on specific mobiles (e.g. a certain iPhone or Nexus).

### Built-in device presets {: #built-in_device_presets }

!!!.aside.aside--warning

**This page is deprecated**. See [Mobile Device Viewport Mode][6].

!!!

We've included the currently most popular devices in the device dropdown. After selecting a device,
each preset automatically configures emulation of certain device characteristics:

- Sets the correct "User Agent" (UA) string.
- Sets the device resolution and DPI (device pixel ratio).
- Emulates touch events (if applicable).
- Emulates mobile scrollbar overlays and meta viewport.
- Autosizes (boosts) text for pages without a defined viewport.

{% Img src="image/admin/AZ8ONM8cxQYYC31pRMFB.png", alt="select a device", width="334", height="496" %}

### Adding custom device presets {: #adding_custom_device_presets }

!!!.aside.aside--warning

**This page is deprecated**. See [Add a custom mobile device][7].

!!!

Device Mode offers a wide array of devices for emulation. You can add a custom device if you find an
edge-case or niche device that isn't covered.

To add a custom device:

1.  Go to DevTools Settings.
2.  Click the **Devices** tab.
3.  Click **Add custom device**.
4.  Enter a device name, width, height, device pixel ratio, and user agent string.
5.  Click **Add**.

Your custom device is now available in the **Device** dropdown menu.

{% Img src="image/admin/p6ujBaYFVFJbOMJ6vuEU.png", alt="select a device", width="800", height="659" %}

### Device states and orientation {: #device_states_and_orientation }

!!!.aside.aside--warning

**This page is deprecated**. See [Set orientation][8].

!!!

{% Img src="image/admin/fx1n9GLOUyeWsQL3X6nx.png", alt="toggle orientation", width="800", height="91" %}

When emulating a specific device, the Device Mode toolbar shows an additional control that primarily
serves as a way to toggle the orientation between landscape and portrait.

On selected devices, the control does more than just orientation toggling. For supported devices
like the Nexus 5X, you'll get a dropdown that allows you to emulate certain device states, like:

- Default browser UI
- With Chrome navigation bar
- With opened keyboard

{% Img src="image/admin/vpB3Yo8dxFDOc1zcPxrm.png", alt="Change the Device UI", width="462", height="382" %}

### Zoom to fit {: #zoom_to_fit }

Sometimes you'll want to test a device that has a resolution larger than the actual available space
in your browser window. In these cases, the **Zoom to Fit** option comes in handy:

1.  **Fit to Window** will automatically set the zoom level to the maximum available space.
2.  **Explicit percentages** are useful if you want to test DPI on images, for instance.

{% Img src="image/admin/XuCNiZaYnD1fYD2HaLGN.png", alt="Zoom to Fit", width="374", height="390" %}

## Optional controls (e.g. touch, media queries, DPR) {: #optional_controls_eg_touch_media_queries_dpr }

Optional controls can be changed or enabled by clicking on the three little dots on the right side
of the device toolbar. Current options include

- User agent type (Emulates UA and touch events)
- Device pixel ratio
- Media Queries
- Rulers
- Configure Network (UA, Network Throttling)

{% Img src="image/admin/0e4VMuw2VbAfYmxjBAnc.png", alt="Device Mode Settings", width="448", height="380" %}

Read on to learn more about the specific options.

### Device pixel ratio (DPR) {: #device_pixel_ratio_dpr }

If you want to emulate a Retina device from a non-Retina machine or vice versa, adjust the **Device
pixel ratio**. The **device pixel ratio** (DPR) is the ratio between logical pixels and physical
pixels. Devices with Retina displays, such as the Nexus 6P, have higher pixel density than standard
devices, which can affect the sharpness and size of visual content.

Some examples of "Device Pixel Ratio" (DPR) sensitivity on the web are:

- CSS media queries such as:

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ... }

- CSS [image-set][9] rules.
- The [srcset][10] attribute on images.
- The `window.devicePixelRatio` property.

If you have a native Retina display, you'll notice that low "Dots Per Inch" (DPI) assets look
pixelated while higher-DPI assets are sharp. To simulate this effect on a standard display, set the
DPR to 2 and scale the viewport by zooming. A 2x asset will continue to look sharp, while a 1x one
will look pixelated.

### Media queries {: #media-queries }

!!!.aside.aside--warning

**This page is deprecated**. See [Show media queries][11].

!!!

[Media queries][12] are an essential part of responsive web design.To view the media query
inspector, click **Show Media queries** in the three dot menu. The DevTools detect media queries in
your stylesheets and display them as colored bars in the top ruler.

{% Img src="image/admin/chA3dy9z2WGMXJU3HVhb.png", alt="show media queries", width="800", height="550" %}

{% Img src="image/admin/e6LeCoc4RMmFiphKoAKc.png", alt="media query inspector", width="800", height="135" %}

Media queries are color-coded as follows:

<table id="colortable"><tbody><tr><td class="max-width"></td><td>Queries targeting a maximum width.</td></tr><tr><td class="max-and-min"></td><td>Queries targeting widths within a range.</td></tr><tr><td class="min-width"></td><td>Queries targeting a minimum width.</td></tr></tbody></table>

#### Quickly preview a media query {: #quickly_preview_a_media_query }

Click a media query bar to adjust the viewport size and preview styles for the targeted screen
sizes.

#### View associated CSS {: #view_associated_css }

Right-click a bar to view where the media query is defined in CSS and jump to the definition in
source code.

{% Img src="image/admin/CEMu2wYVTgIkDk2weKaX.png", alt="web fundamentals media queries view", width="800", height="261" %}

### Rulers {: #rulers }

!!!.aside.aside--warning

**This page is deprecated**. See [Show rulers][13].

!!!

Toggle this option to show pixel-based rulers next to the viewport.

### Configure network (UA, network throttling) {: #network }

Selecting this option opens the [Network Conditions drawer][14], where you can change the following
network behaviors:

1.  **Disk Cache**: Disable Disk Cache stops pages and their assets from being cached by the browser
    while the DevTools are open.
2.  **Network Throttling**: Simulate slow network connections.
3.  **User Agent**: Allows you to set a specific UA (User Agent) string override.

## Limitations {: #limitations }

Device Mode has some limitations.

- **Device hardware**
  - GPU and CPU behavior are not emulated.
- **Browser UI**
  - System displays, such as the address bar, are not emulated.
  - Native displays, such as `<select>` elements, are not emulated as a modal list.
  - Some enhancements, such as number inputs opening a keypad, might vary from actual device
    behavior.
- **Browser functionality**
  - WebGL operates in the emulator, but is not supported on iOS 7 devices.
  - MathML is not supported in Chrome, but is supported on iOS 7 devices.
  - [HLS playback][15] (HTTP Live Streaming for video) is not supported while emulating, but is
    supported natively on Android Chrome and iOS.
  - The [iOS 5 orientation zoom bug][16] is not emulated.
  - The line-height CSS property operates in the emulator, but is not supported in Opera Mini.
  - CSS rule limits, such as those in [Internet Explorer][17], are not emulated.
- **AppCache**
  - The emulator does not override the UA for AppCache [manifest files][18] or [view source
    requests][19].

Despite these limitations, the Device Mode is robust enough for most tasks. When you need to test on
a real device, you can use [Remote Debugging][20] for additional insight.

[1]: /web/tools/chrome-devtools/device-mode#responsive
[2]: /web/tools/chrome-devtools/device-mode#device
[3]: /web/tools/chrome-devtools/device-mode#responsive
[4]: #media-queries
[5]: /web/tools/chrome-devtools/device-mode#device
[6]: /web/tools/chrome-devtools/device-mode#device
[7]: /web/tools/chrome-devtools/device-mode#custom
[8]: /web/tools/chrome-devtools/device-mode#orientation
[9]: http://dev.w3.org/csswg/css-images/#image-set-notation
[10]: /web/fundamentals/design-and-ux/responsive/images#images-in-markup
[11]: /web/tools/chrome-devtools/device-mode#queries
[12]: /web/fundamentals/design-and-ux/responsive#use-media-queries
[13]: /web/tools/chrome-devtools/device-mode#rulers
[14]: /web/tools/chrome-devtools/network-performance/reference#network-conditions
[15]: https://en.wikipedia.org/wiki/HTTP_Live_Streaming
[16]: https://github.com/scottjehl/device-bugs/issues/2
[17]: http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx
[18]: https://code.google.com/p/chromium/issues/detail?id=334120
[19]: https://code.google.com/p/chromium/issues/detail?id=119767
[20]: /web/tools/chrome-devtools/debug/remote-debugging
