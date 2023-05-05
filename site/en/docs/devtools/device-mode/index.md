---
layout: "layouts/doc-post.njk"
title: "Simulate mobile devices with Device Mode"
authors:
  - kaycebasques
  - sofiayem
date: 2015-04-13
updated: 2022-07-04
description: "Use virtual devices in Chrome's Device Mode to build mobile-first websites."
tags:
  - emulate
  - test
---

{% YouTube id='f7kokNyRe7U' %}

Use Device Mode to approximate how your page looks and performs on a mobile device.

Device Mode is the name for a collection of features in Chrome DevTools that help you
simulate mobile devices. These features include:

- [Simulating a mobile viewport][1]
- [Throttling the CPU][3]
- [Throttling the network][2]
  {% Aside 'gotchas' %}
  Alternatively, you can [throttle connection speed](/docs/devtools/network/reference/#throttling) in the **Network** panel.
  {% endAside %}
- Additionally, in the [**Sensors** tab](/docs/devtools/sensors/):
  - [Simulating geolocation][4]
  - [Setting orientation][5]

## Limitations {: #limitations }

Think of Device Mode as a [first-order approximation][6] of how your page looks and feels on a
mobile device. With Device Mode you don't actually run your code on a mobile device. You simulate
the mobile user experience from your laptop or desktop.

There are some aspects of mobile devices that DevTools will never be able to simulate. For example,
the architecture of mobile CPUs is very different than the architecture of laptop or desktop CPUs.
When in doubt, your best bet is to actually run your page on a mobile device. Use [Remote
Debugging][7] to view, change, debug, and profile a page's code from your laptop or desktop while it
actually runs on a mobile device.

## Simulate a mobile viewport {: #viewport }

Click **Toggle Device Toolbar**
{% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar.", width="20", height="22" %} to open
the UI that enables you to simulate a mobile viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CkPWy2neRUswovjY1ql2.png", alt="The Device Toolbar.", width="800", height="562" %}

By default, the Device Toolbar opens in viewport with **Dimensions** set to **Responsive**.

### Responsive Viewport Mode {: #responsive }

Drag the handles to resize the viewport to whatever dimensions you need. Or, enter specific values
in the width and height boxes. In this example, the width is set to `480` and the height is set to
`415`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bzTz5dEpOUIjRCrpdw5C.png", alt="The handles for changing the viewport's dimensions when in Responsive Viewport Mode.", width="800", height="567" %}

Alternatively, use the width presets bar to set the width with a click to one of the following:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rvOX3mx1WcP2kSvoUFNY.png", alt="The width presets bar.", width="800", height="578" %}

<table>
<thead>
  <tr>
    <th>Mobile S</th>
    <th>Mobile M</th>
    <th>Mobile L</th>
    <th>Tablet</th>
    <th>Laptop</th>
    <th>Laptop L</th>
    <th>4K</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>320px</td>
    <td>375px</td>
    <td>425px</td>
    <td>768px</td>
    <td>1024px</td>
    <td>1440px</td>
    <td>2560px</td>
  </tr>
</tbody>
</table>

### Show media queries {: #queries }

To show media query breakpoints above your viewport, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} **More options** > **Show media queries**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Y8OPepQNYdD6of4QC8if.png", alt="Show media queries.", width="800", height="567" %}

DevTools now displays two additional bars above the viewport:

- The <span style="background-color:lightskyblue">blue</span> bar with `max-width` breakpoints.
- The <span style="background-color:orange">orange</span> bar with `min-width` breakpoints.

Click between breakpoints to change the viewport's width so that the breakpoint gets triggered.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TL943bgHrNVpZwBQGCWo.png", alt="Click between breakpoints to change the viewport's width.", width="800", height="447" %}

To find the corresponding `@media` declaration, right-click between breakpoints and select **Reveal in source code**. DevTools opens the **Sources** panel at the corresponding line in the **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rhOtkyEwDf0bJE3TAEjF.png", alt="Reveal in source code drop-down menu.", width="800", height="447" %}

### Set device pixel ratio {: #dpr }

[Device pixel ratio (DPR)](https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio) is the ratio between physical pixels on the hardware screen and logical (CSS) pixels. In other words, DPR tells Chrome how many screen pixels to use to draw a CSS pixel. Chrome uses the DPR value when drawing on HiDPI (High Dots Per Inch) displays.

To set a DPR value:

1. Click **More options** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} > **Add device pixel ratio**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lhWacswryP5MHsaesMQe.png", alt="Add device pixel ratio.", width="800", height="489" %}

1. In the action bar at the top of the viewport, select a DPR value from the new **DPR** drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EtjNHXY7QFAQythiNtCw.png", alt="Setting the DPR value.", width="800", height="489" %}



### Set the device type {: #type }

Use the **Device Type** list to simulate a mobile device or desktop device.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6958u357vToj6yBdGbve.png", alt="The Device Type list.", width="800", height="507" %}

If you can't see the list on the action bar at the top, select **More options** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} > **Add device type**.

The table below describes the differences between the options. **Rendering method** refers to
whether Chrome renders the page as a mobile or desktop viewport. **Cursor icon** refers to what type
of cursor you see when you hover over the page. **Events fired** refers to whether the page fires
`touch` or `click` events when you interact with the page.

<table><tbody><tr><th>Option</th><th>Rendering method</th><th>Cursor icon</th><th>Events fired</th></tr><tr><td>Mobile</td><td>Mobile</td><td>Circle</td><td>touch</td></tr><tr><td>Mobile (no touch)</td><td>Mobile</td><td>Normal</td><td>click</td></tr><tr><td>Desktop</td><td>Desktop</td><td>Normal</td><td>click</td></tr><tr><td>Desktop (touch)</td><td>Desktop</td><td>Circle</td><td>touch</td></tr></tbody></table>

### Mobile Device Viewport Mode {: #device }

To simulate the dimensions of a specific mobile device, select the device from the **Dimensions** list.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2JDEYmYANUwYnNUrbe1e.png", alt="The Dimensions list.", width="800", height="507" %}

For more information, see [Add a custom mobile device](#custom).

### Rotate the viewport to landscape orientation {: #landscape }

Click **Rotate** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CjWGNTZnTdtOPPEnZjEk.svg", alt="Rotate.", width="24", height="24" %} to rotate the viewport to landscape orientation.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7NI2IxsNGaYBBEXzMPeZ.png", alt="Landscape orientation.", width="800", height="507" %}

Note that the **Rotate** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CjWGNTZnTdtOPPEnZjEk.svg", alt="Rotate.", width="24", height="24" %} button disappears if your **Device Toolbar** is narrow.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ldhUUNnixCCAmbF7cQrk.png", alt="The Device Toolbar.", width="800", height="570" %}

See also [Set orientation][8].

### Show device frame {: #frame }

When simulating the dimensions of a specific mobile device like a Nest Hub, select **More options** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} > **Show device frame** to show the physical device frame around the viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0zuYwF6sKDsOS0q8N201.png", alt="Show device frame.", width="800", height="503" %}

{% Aside %}

**Note:** If you don't see a device frame for a particular device, it probably means that DevTools
just doesn't have art for that specific option.

{% endAside %}

In this example, DevTools shows the frame for the Nest Hub.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DsjFEajcQnpTGxuStqax.png", alt="The device frame for the Nest Hub.", width="800", height="516" %}

### Add a custom mobile device {: #custom }

To add a custom device:

1.  Click the **Device** list and then select **Edit**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/r57tLyKF2Fw7ZSq3cXjT.png", alt="Edit.", width="800", height="516" %}

1.  On the **Settings** > **Devices** tab, either choose a device from the list of supported ones or click **Add custom device** to add your own.

1.  If you're adding your own, enter a name, width, and height for the device, then click **Add**.

    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BrFpL7MQ0VYzl1P1rtC6.png", alt="Creating a custom device.", width="800", height="681" %}

    The [device pixel ratio][9], [user agent string][10], and [device type][11] fields are optional. The device type field is the list that is set to **Mobile** by default.

1. Back in the viewport, select the newly added device from the **Dimensions** list.

### Show rulers {: #rulers }

Click **More options** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} > **Show rulers** to see rulers. The sizing unit of the rulers is pixels.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s8rmAV06Skgtpj4m9unI.png", alt="Show rulers.", width="800", height="546" %}

DevTools shows rulers above and to the left of the viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/R7cckrDXSPs0NJBxQ2GB.png", alt="Rulers above and to the left of the viewport.", width="800", height="546" %}

Click the rulers at specific marks to set the viewport's width and height.

### Zoom the viewport {: #zoom }

Use the **Zoom** list to zoom in or out.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JFYPAyC2AO5mExJ8p1Je.png", alt="Zoom.", width="800", height="546" %}

### Capture a screenshot {: #screenshot }

To capture a screenshot of what you currently see in the viewport, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More options.", width="20", height="20" %} **More options** > **Capture screenshot**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/x2EqWnDtfdjjuGnyDmdq.png", alt="The Capture screenshot option in the More options menu.", width="800", height="626" %}

To capture a screenshot of the whole page including the content that isn't currently visible in the viewport, select **Capture a full size screenshot** from the same menu.

## Throttle the network and CPU {: #throttle }

To throttle both the network and CPU, select **Mid-tier mobile** or **Low-end mobile** from the
**Throttle** list.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AlqR3FkTwOWp1nRWAY5B.png", alt="The Throttle list.", width="800", height="497" %}

**Mid-tier mobile** simulates fast 3G and throttles your CPU so that it is 4 times slower than
normal. **Low-end mobile** simulates slow 3G and throttles your CPU 6 times slower than normal. Keep
in mind that the throttling is relative to the normal capability of your laptop or desktop.

Note that the **Throttle** list will be hidden if your **Device Toolbar** is narrow.

### Throttle the CPU only {: #cpu }

To throttle the CPU only and not the network, go to the **Performance** panel, click **Capture
Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Capture settings.", width="24", height="24" %}, and
then select **4x slowdown** or **6x slowdown** from the **CPU** list.

{% Img src="image/admin/ntoyTFejTcYZs6eZ8oQB.png", alt="The CPU list.", width="800", height="588" %}

### Throttle the network only {: #network }

To throttle the network only and not the CPU, go the **Network** panel and select **Fast 3G** or
**Slow 3G** from the **Throttle** list.

{% Img src="image/admin/rTpWIlXuQcUB0tUa75fI.png", alt="The Throttle list.", width="800", height="465" %}

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, ChromeOS) to open the Command
Menu, type `3G`, and select **Enable fast 3G throttling** or **Enable slow 3G throttling**.

{% Img src="image/admin/dpOHIvK5v3J5Flv1Zrsv.png", alt="The Command Menu.", width="800", height="518" %}

You can also set network throttling from the **Performance** panel. Click **Capture Settings**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Capture settings.", width="24", height="24" %} and then select
**Fast 3G** or **Slow 3G** from the **Network** list.

{% Img src="image/admin/DVa1oLS5wWMY07WXe0K1.png", alt="Setting network throttling from the Performance panel.", width="800", height="656" %}

## Emulate sensors {: #emulate-sensors }

Use the **Sensors** tab to override geolocation, simulate device orientation, force touch, and emulate idle state.

The sections below provide a quick look on how to override geolocation and set device orientation. For a complete list of featrues, see [Emulate device sensors](/docs/devtools/sensors/).

### Override geolocation {: #geolocation }

To open the geolocation overriding UI, click **Customize and control DevTools**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools.", width="20", height="20" %} and then select **More tools** > **Sensors**.

{% Img src="image/admin/eb1Ahn7tFUrvfwsj1FQd.png", alt="Sensors", width="800", height="648" %}

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, ChromeOS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

{% Img src="image/admin/hVVQ0sRjUQkDKWfyjH8O.png", alt="Show Sensors", width="800", height="627" %}

Select one of the presets from the **Location** list, or select **Other...** to enter your
own coordinates, or select **Location unavailable** to test out how your page behaves when
geolocation is in an error state.

{% Img src="image/admin/VaU4wIpuUsjgsDHjOw6x.png", alt="Geolocation", width="800", height="602" %}

### Set orientation {: #orientation }

To open the orientation UI, click **Customize and control DevTools**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools.", width="20", height="20" %} and then select **More tools** > **Sensors**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JXJf08VxTePcH96fxMCB.png", alt="Sensors", width="800", height="648" %}

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, ChromeOS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nQ9bLVGBdLT4I9jvm69f.png", alt="Show Sensors", width="800", height="627" %}

Select one of the presets from the **Orientation** list or select **Custom orientation** to set your
own alpha, beta, and gamma values.

{% Img src="image/admin/kk5jCSTMJHmGN1w3AMIC.png", alt="Orientation", width="800", height="675" %}

[1]: #viewport
[2]: #network
[3]: #cpu
[4]: #geolocation
[5]: #orientation
[6]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order
[7]: /docs/devtools/remote-debugging
[8]: #orientation
[9]: https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio
[10]: https://developer.mozilla.org/docs/Glossary/User_agent
[11]: #type
[12]: /docs/devtools#community
