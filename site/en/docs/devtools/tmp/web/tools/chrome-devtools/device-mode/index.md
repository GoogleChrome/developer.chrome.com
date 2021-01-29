---
layout: "layouts/doc-post.njk"
title: "Simulate Mobile Devices with Device Mode in Chrome DevTools"
authors:
  - kaycebasques
date: 2015-04-13
updated: 2020-07-10
description: "Use virtual devices in Chrome&#39;s Device Mode to build mobile-first websites."
---

Use Device Mode to approximate how your page looks and performs on a mobile device.

Device Mode is the name for the loose collection of features in Chrome DevTools that help you
simulate mobile devices. These features include:

- [Simulating a mobile viewport][1]
- [Throttling the network][2]
- [Throttling the CPU][3]
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
![Toggle Device Toolbar](/web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png) to open
the UI that enables you to simulate a mobile viewport.

![The Device Toolbar.](/web/tools/chrome-devtools/device-mode/imgs/device-toolbar.png)

**Figure 1**. The Device Toolbar

By default the Device Toolbar opens in Responsive Viewport Mode.

### Responsive Viewport Mode {: #responsive }

Drag the handles to resize the viewport to whatever dimensions you need. Or, enter specific values
in the width and height boxes. In **Figure 2**, the width is set to `628` and the height is set to
`662`.

![The handles for changing the viewport's dimensions when in Responsive Viewport Mode.](/web/tools/chrome-devtools/device-mode/imgs/responsive-handles.png)

**Figure 2**. The handles for changing the viewport's dimensions when in Responsive Viewport Mode

#### Show media queries {: #queries }

To show media query breakpoints above your viewport, click **More options** and then select **Show
media queries**.

![Show media queries.](/web/tools/chrome-devtools/device-mode/imgs/show-media-queries.png)

**Figure 3**. Show media queries

Click a breakpoint to change the viewport's width so that the breakpoint gets triggered.

![Click a breakpoint to change the viewport's width.](/web/tools/chrome-devtools/device-mode/imgs/breakpoint.png)

**Figure 4**. Click a breakpoint to change the viewport's width

#### Set the device type {: #type }

Use the **Device Type** list to simulate a mobile device or desktop device.

![The Device Type list.](/web/tools/chrome-devtools/device-mode/imgs/device-type.png)

**Figure 5**. The **Device Type** list

The table below describes the differences between the options. **Rendering method** refers to
whether Chrome renders the page as a mobile or desktop viewport. **Cursor icon** refers to what type
of cursor you see when you hover over the page. **Events fired** refers to whether the page fires
`touch` or `click` events when you interact with the page.

<table><tbody><tr><th>Option</th><th>Rendering method</th><th>Cursor icon</th><th>Events fired</th></tr><tr><td>Mobile</td><td>Mobile</td><td>Circle</td><td>touch</td></tr><tr><td>Mobile (no touch)</td><td>Mobile</td><td>Normal</td><td>click</td></tr><tr><td>Desktop</td><td>Desktop</td><td>Normal</td><td>click</td></tr><tr><td>Desktop (touch)</td><td>Desktop</td><td>Circle</td><td>touch</td></tr></tbody></table>

### Mobile Device Viewport Mode {: #device }

To simulate the dimensions of a specific mobile device, select the device from the **Device** list.

![The Device list.](/web/tools/chrome-devtools/device-mode/imgs/device-list.png)

**Figure 6**. The Device list

#### Rotate the viewport to landscape orientation {: #landscape }

Click **Rotate** ![Rotate](/web/tools/chrome-devtools/device-mode/imgs/rotate.png) to rotate the
viewport to landscape orientation.

![Landscape orientation.](/web/tools/chrome-devtools/device-mode/imgs/landscape.png)

**Figure 7**. Landscape orientation

Note that the **Rotate** button disappears if your **Device Toolbar** is narrow.

![The Device Toolbar.](/web/tools/chrome-devtools/device-mode/imgs/device-toolbar.png)

**Figure 8**. The Device Toolbar

See also [Set orientation][8].

#### Show device frame {: #frame }

When simulating the dimensions of a specific mobile device like an iPhone 6, open **More options**
and then select **Show device frame** to show the physical device frame around the viewport.

!!!.aside.aside--note

**Note:** If you don't see a device frame for a particular device, it probably means that DevTools
just doesn't have art for that specific option.

!!!

![Show device frame.](/web/tools/chrome-devtools/device-mode/imgs/show-device-frame.png)

**Figure 9**. Show device frame

![The device frame for the iPhone 6.](/web/tools/chrome-devtools/device-mode/imgs/iphone-frame.png)

**Figure 10**. The device frame for the iPhone 6

#### Add a custom mobile device {: #custom }

To add a custom device:

1.  Click the **Device** list and then select **Edit**.

    ![Selecting 'Edit'.](/web/tools/chrome-devtools/device-mode/imgs/edit.png)

    **Figure 11**. Selecting **Edit**

2.  Click **Add custom device**.
3.  Enter a name, width, and height for the device. The [device pixel ratio][9], [user agent
    string][10], and [device type][11] fields are optional. The device type field is the list that
    is set to **Mobile** by default.

    ![Creating a custom device.](/web/tools/chrome-devtools/device-mode/imgs/add-custom-device.png)

    **Figure 12**. Creating a custom device

### Show rulers {: #rulers }

Click **More options** and then select **Show rulers** to see rulers above and to the left of your
viewport. The sizing unit of the rulers is pixels.

![Show rulers.](/web/tools/chrome-devtools/device-mode/imgs/show-rulers.png)

**Figure 13**. Show rulers

![Rulers above and to the left of the viewport.](/web/tools/chrome-devtools/device-mode/imgs/rulers.png)

**Figure 14**. Rulers above and to the left of the viewport

### Zoom the viewport {: #zoom }

Use the **Zoom** list to zoom in or out.

![Zoom.](/web/tools/chrome-devtools/device-mode/imgs/zoom-viewport.png)

**Figure 15**. Zoom

## Throttle the network and CPU {: #throttle }

To throttle the network and CPU, select **Mid-tier mobile** or **Low-end mobile** from the
**Throttle** list.

![The Throttle list.](/web/tools/chrome-devtools/device-mode/imgs/throttling.png)

**Figure 16**. The Throttle list

**Mid-tier mobile** simulates fast 3G and throttles your CPU so that it is 4 times slower than
normal. **Low-end mobile** simulates slow 3G and throttles your CPU 6 times slower than normal. Keep
in mind that the throttling is relative to the normal capability of your laptop or desktop.

Note that the **Throttle** list will be hidden if your **Device Toolbar** is narrow.

![The Device Toolbar.](/web/tools/chrome-devtools/device-mode/imgs/device-toolbar.png)

**Figure 17**. The Device Toolbar

### Throttle the CPU only {: #cpu }

To throttle the CPU only and not the network, go to the **Performance** panel, click **Capture
Settings** ![Capture Settings](/web/tools/chrome-devtools/images/shared/capture-settings.png), and
then select **4x slowdown** or **6x slowdown** from the **CPU** list.

![The CPU list.](/web/tools/chrome-devtools/device-mode/imgs/cpu.png)

**Figure 18**. The CPU list

### Throttle the network only {: #network }

To throttle the network only and not the CPU, go the **Network** panel and select **Fast 3G** or
**Slow 3G** from the **Throttle** list.

![The Throttle list.](/web/tools/chrome-devtools/device-mode/imgs/network.png)

**Figure 19**. The Throttle list

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `3G`, and select **Enable fast 3G throttling** or **Enable slow 3G throttling**.

![The Command Menu.](/web/tools/chrome-devtools/device-mode/imgs/commandmenu.png)

**Figure 20**. The Command Menu

You can also set network throttling from the **Performance** panel. Click **Capture Settings**
![Capture Settings](/web/tools/chrome-devtools/images/shared/capture-settings.png) and then select
**Fast 3G** or **Slow 3G** from the **Network** list.

![Setting network throttling from the Performance panel.](/web/tools/chrome-devtools/device-mode/imgs/network2.png)

**Figure 21**. Setting network throttling from the Performance panel

## Override geolocation {: #geolocation }

To open the geolocation overriding UI click **Customize and control DevTools**
![Customize and control DevTools](/web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png)
and then select **More tools** > **Sensors**.

![Sensors](/web/tools/chrome-devtools/device-mode/imgs/sensors.png)

**Figure 22**. Sensors

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

![Show Sensors](/web/tools/chrome-devtools/device-mode/imgs/show-sensors.png)

**Figure 23**. Show Sensors

Select one of the presets from the **Geolocation** list, or select **Custom location** to enter your
own coordinates, or select **Location unavailable** to test out how your page behaves when
geolocation is in an error state.

![Geolocation](/web/tools/chrome-devtools/device-mode/imgs/geolocation.png)

**Figure 24**. Geolocation

## Set orientation {: #orientation }

To open the orientation UI click **Customize and control DevTools**
![Customize and control DevTools](/web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png)
and then select **More tools** > **Sensors**.

![Sensors](/web/tools/chrome-devtools/device-mode/imgs/sensors.png)

**Figure 25**. Sensors

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

![Show Sensors](/web/tools/chrome-devtools/device-mode/imgs/show-sensors.png)

**Figure 26**. Show Sensors

Select one of the presets from the **Orientation** list or select **Custom orientation** to set your
own alpha, beta, and gamma values.

![Orientation](/web/tools/chrome-devtools/device-mode/imgs/orientation.png)

**Figure 27**. Orientation

See [Join the DevTools community][12] for other ways to leave feedback.

[1]: #viewport
[2]: #network
[3]: #cpu
[4]: #geolocation
[5]: #orientation
[6]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order
[7]: /web/tools/chrome-devtools/remote-debugging
[8]: #orientation
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
[10]: https://developer.mozilla.org/en-US/docs/Glossary/User_agent
[11]: #type
[12]: /web/tools/chrome-devtools#community
