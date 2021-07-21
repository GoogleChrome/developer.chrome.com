---
layout: "layouts/doc-post.njk"
title: "Simulate mobile devices with Device Mode"
authors:
  - kaycebasques
date: 2015-04-13
#updated: YYYY-MM-DD
description: "Use virtual devices in Chrome's Device Mode to build mobile-first websites."
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
{% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="30", height="32" %} to open
the UI that enables you to simulate a mobile viewport.

{% Img src="image/admin/9Hw1ojc4jyUdo0ycwH7X.png", alt="The Device Toolbar.", width="800", height="645" %}

**Figure 1**. The Device Toolbar

By default the Device Toolbar opens in Responsive Viewport Mode.

### Responsive Viewport Mode {: #responsive }

Drag the handles to resize the viewport to whatever dimensions you need. Or, enter specific values
in the width and height boxes. In **Figure 2**, the width is set to `628` and the height is set to
`662`.

{% Img src="image/admin/ElSBe9rER945XTdAyfEZ.png", alt="The handles for changing the viewport's dimensions when in Responsive Viewport Mode.", width="800", height="645" %}

**Figure 2**. The handles for changing the viewport's dimensions when in Responsive Viewport Mode

#### Show media queries {: #queries }

To show media query breakpoints above your viewport, click **More options** and then select **Show
media queries**.

{% Img src="image/admin/oJZtLzKYgf4PTNvtAQSu.png", alt="Show media queries.", width="800", height="550" %}

**Figure 3**. Show media queries

Click a breakpoint to change the viewport's width so that the breakpoint gets triggered.

{% Img src="image/admin/jrnh2WuIYexYaH5Qh3ZZ.png", alt="Click a breakpoint to change the viewport's width.", width="800", height="527" %}

**Figure 4**. Click a breakpoint to change the viewport's width

#### Set the device type {: #type }

Use the **Device Type** list to simulate a mobile device or desktop device.

{% Img src="image/admin/S6rhZEC4PMfN5c3WpZk8.png", alt="The Device Type list.", width="800", height="468" %}

**Figure 5**. The **Device Type** list

The table below describes the differences between the options. **Rendering method** refers to
whether Chrome renders the page as a mobile or desktop viewport. **Cursor icon** refers to what type
of cursor you see when you hover over the page. **Events fired** refers to whether the page fires
`touch` or `click` events when you interact with the page.

<table><tbody><tr><th>Option</th><th>Rendering method</th><th>Cursor icon</th><th>Events fired</th></tr><tr><td>Mobile</td><td>Mobile</td><td>Circle</td><td>touch</td></tr><tr><td>Mobile (no touch)</td><td>Mobile</td><td>Normal</td><td>click</td></tr><tr><td>Desktop</td><td>Desktop</td><td>Normal</td><td>click</td></tr><tr><td>Desktop (touch)</td><td>Desktop</td><td>Circle</td><td>touch</td></tr></tbody></table>

### Mobile Device Viewport Mode {: #device }

To simulate the dimensions of a specific mobile device, select the device from the **Device** list.

{% Img src="image/admin/q5MGmsuKDvz67EWNfriE.png", alt="The Device list.", width="800", height="500" %}

**Figure 6**. The Device list

#### Rotate the viewport to landscape orientation {: #landscape }

Click **Rotate** {% Img src="image/admin/BU4jR7mdnO6VxOkWH1Wl.png", alt="Rotate", width="29", height="28" %} to rotate the
viewport to landscape orientation.

{% Img src="image/admin/YMWoNEKKmHrRIxrR0vmv.png", alt="Landscape orientation.", width="800", height="372" %}

**Figure 7**. Landscape orientation

Note that the **Rotate** button disappears if your **Device Toolbar** is narrow.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zf7hzykbu0bOx8JjZJpp.png", alt="The Device Toolbar.", width="800", height="645" %}

**Figure 8**. The Device Toolbar

See also [Set orientation][8].

#### Show device frame {: #frame }

When simulating the dimensions of a specific mobile device like an iPhone 6, open **More options**
and then select **Show device frame** to show the physical device frame around the viewport.

{% Aside %}

**Note:** If you don't see a device frame for a particular device, it probably means that DevTools
just doesn't have art for that specific option.

{% endAside %}

{% Img src="image/admin/YQw0pa2iWzi3pEQbwphz.png", alt="Show device frame.", width="800", height="567" %}

**Figure 9**. Show device frame

{% Img src="image/admin/hlZmXsdKkLqGUo0m8obv.png", alt="The device frame for the iPhone 6.", width="800", height="586" %}

**Figure 10**. The device frame for the iPhone 6

#### Add a custom mobile device {: #custom }

To add a custom device:

1.  Click the **Device** list and then select **Edit**.

    {% Img src="image/admin/WJsZLsXJmMAkxsVMIAg9.png", alt="Selecting 'Edit'.", width="800", height="536" %}

    **Figure 11**. Selecting **Edit**

2.  Click **Add custom device**.
3.  Enter a name, width, and height for the device. The [device pixel ratio][9], [user agent
    string][10], and [device type][11] fields are optional. The device type field is the list that
    is set to **Mobile** by default.

    {% Img src="image/admin/on0B3hv1k23NRXjE1TzW.png", alt="Creating a custom device.", width="800", height="548" %}

    **Figure 12**. Creating a custom device

### Show rulers {: #rulers }

Click **More options** and then select **Show rulers** to see rulers above and to the left of your
viewport. The sizing unit of the rulers is pixels.

{% Img src="image/admin/rQGuzADTqJj8CUFidrW5.png", alt="Show rulers.", width="800", height="504" %}

**Figure 13**. Show rulers

{% Img src="image/admin/EtRsMva6aPxWmLRukwLf.png", alt="Rulers above and to the left of the viewport.", width="800", height="609" %}

**Figure 14**. Rulers above and to the left of the viewport

### Zoom the viewport {: #zoom }

Use the **Zoom** list to zoom in or out.

{% Img src="image/admin/0OVcVM6pQOzYiJ8c0GM5.png", alt="Zoom.", width="800", height="463" %}

**Figure 15**. Zoom

## Throttle the network and CPU {: #throttle }

To throttle the network and CPU, select **Mid-tier mobile** or **Low-end mobile** from the
**Throttle** list.

{% Img src="image/admin/YEoB6HQkzQUZ33XSH25y.png", alt="The Throttle list.", width="800", height="567" %}

**Figure 16**. The Throttle list

**Mid-tier mobile** simulates fast 3G and throttles your CPU so that it is 4 times slower than
normal. **Low-end mobile** simulates slow 3G and throttles your CPU 6 times slower than normal. Keep
in mind that the throttling is relative to the normal capability of your laptop or desktop.

Note that the **Throttle** list will be hidden if your **Device Toolbar** is narrow.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zf7hzykbu0bOx8JjZJpp.png", alt="The Device Toolbar.", width="800", height="645" %}

**Figure 17**. The Device Toolbar

### Throttle the CPU only {: #cpu }

To throttle the CPU only and not the network, go to the **Performance** panel, click **Capture
Settings** {% Img src="image/admin/CBHNS0GIpZlOcDkO1D7F.png", alt="Capture Settings", width="28", height="28" %}, and
then select **4x slowdown** or **6x slowdown** from the **CPU** list.

{% Img src="image/admin/ntoyTFejTcYZs6eZ8oQB.png", alt="The CPU list.", width="800", height="588" %}

**Figure 18**. The CPU list

### Throttle the network only {: #network }

To throttle the network only and not the CPU, go the **Network** panel and select **Fast 3G** or
**Slow 3G** from the **Throttle** list.

{% Img src="image/admin/rTpWIlXuQcUB0tUa75fI.png", alt="The Throttle list.", width="800", height="465" %}

**Figure 19**. The Throttle list

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `3G`, and select **Enable fast 3G throttling** or **Enable slow 3G throttling**.

{% Img src="image/admin/dpOHIvK5v3J5Flv1Zrsv.png", alt="The Command Menu.", width="800", height="518" %}

**Figure 20**. The Command Menu

You can also set network throttling from the **Performance** panel. Click **Capture Settings**
![Capture Settings](/docs/devtools/images/shared/capture-settings.png) and then select
**Fast 3G** or **Slow 3G** from the **Network** list.

{% Img src="image/admin/DVa1oLS5wWMY07WXe0K1.png", alt="Setting network throttling from the Performance panel.", width="800", height="656" %}

**Figure 21**. Setting network throttling from the Performance panel

## Override geolocation {: #geolocation }

To open the geolocation overriding UI click **Customize and control DevTools**
{% Img src="image/admin/MEV74GBA0djVjJ36fPf3.png", alt="Customize and control DevTools", width="6", height="26" %}
and then select **More tools** > **Sensors**.

{% Img src="image/admin/eb1Ahn7tFUrvfwsj1FQd.png", alt="Sensors", width="800", height="648" %}

**Figure 22**. Sensors

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

{% Img src="image/admin/hVVQ0sRjUQkDKWfyjH8O.png", alt="Show Sensors", width="800", height="627" %}

**Figure 23**. Show Sensors

Select one of the presets from the **Location** list, or select **Other...** to enter your
own coordinates, or select **Location unavailable** to test out how your page behaves when
geolocation is in an error state.

{% Img src="image/admin/VaU4wIpuUsjgsDHjOw6x.png", alt="Geolocation", width="800", height="602" %}

**Figure 24**. Geolocation

## Set orientation {: #orientation }

To open the orientation UI click **Customize and control DevTools**
{% Img src="image/admin/MEV74GBA0djVjJ36fPf3.png", alt="Customize and control DevTools", width="6", height="26" %}
and then select **More tools** > **Sensors**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JXJf08VxTePcH96fxMCB.png", alt="Sensors", width="800", height="648" %}

**Figure 25**. Sensors

Or press Command+Shift+P (Mac) or Control+Shift+P (Windows, Linux, Chrome OS) to open the Command
Menu, type `Sensors`, and then select **Show Sensors**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nQ9bLVGBdLT4I9jvm69f.png", alt="Show Sensors", width="800", height="627" %}

**Figure 26**. Show Sensors

Select one of the presets from the **Orientation** list or select **Custom orientation** to set your
own alpha, beta, and gamma values.

{% Img src="image/admin/kk5jCSTMJHmGN1w3AMIC.png", alt="Orientation", width="800", height="675" %}

**Figure 27**. Orientation

[1]: #viewport
[2]: #network
[3]: #cpu
[4]: #geolocation
[5]: #orientation
[6]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order
[7]: /docs/devtools/remote-debugging
[8]: #orientation
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
[10]: https://developer.mozilla.org/en-US/docs/Glossary/User_agent
[11]: #type
[12]: /docs/devtools#community
