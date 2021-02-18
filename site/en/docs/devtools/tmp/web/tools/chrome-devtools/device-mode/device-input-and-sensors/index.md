---
layout: "layouts/doc-post.njk"
title: "Emulate Sensors: Geolocation and Accelerometer"
authors:
  - megginkearney
  - pbakaus
date: 2015-04-13
updated: 2020-07-10
description: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don&#39;t have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
---

!!!.aside.aside--warning

**This page is deprecated**. There are links to up-to-date documentation throughout the page.

!!!

GPS chips and accelerometers can be difficult to test since most desktops don't have them. The
Chrome DevTools Sensors emulation pane reduces the overhead of testing by emulating common mobile
device sensors.

## TL;DR {: #tldr }

- Emulate geolocation coordinates to test geolocation overrides.
- Simulate device orientation to test accelerometer data.

## Access sensor controls {: #access_sensor_controls }

To access the Chrome DevTools sensor controls:

1.  Open the DevTools main menu, then
2.  Under **More Tools**, click on **Sensors**

{% Img src="image/admin/OUotpPZMMrGF5kTdHvB8.png", alt="Navigate to Sensors panel", width="716", height="482" %}

!!!.aside.aside--note

**Note:** If your app detects sensors onload using JavaScript (such as Modernizr), make sure that
you reload the page after enabling sensor emulators.

!!!

## Override geolocation data {: #override_geolocation_data }

!!!.aside.aside--warning

**This page is deprecated**. See [Override Geolocation][1].

!!!

Unlike desktops, mobile devices commonly use GPS hardware to detect location. In the Sensors pane,
you can simulate geolocation coordinates to use with the [Geolocation API][2].

Enable the geolocation emulation by selecting the **Emulate geolocation coordinates** checkbox in
the sensors pane of the emulation drawer.

{% Img src="image/admin/6avAikF7EJCv4uu63yEz.png", alt="geolocation emulator enabled", width="277", height="83" %}

You can use this emulator to override position values for `navigator.geolocation`, as well as to
simulate cases when geolocation data is unavailable.

## Emulate Accelerometer (Device Orientation) {: #emulate_accelerometer_device_orientation }

!!!.aside.aside--warning

**This page is deprecated**. See [Simulate Device Orientation][3].

!!!

To test accelerometer data coming from the [Orientation API][4], enable the accelerometer emulator
by selecting the **Accelerometer** checkbox in the Sensors pane.

{% Img src="image/admin/SWQ0s8t4uHxw6JHiIdIP.png", alt="Accelerometer control", width="298", height="168" %}

You can manipulate the following orientation parameters:

α

Rotation around the z-axis.

β

Left-to-right tilt.

γ

Front-to-back tilt.

You can also click and drag the model accelerometer to the desired orientation.

Try out the accelerometer emulator using this [device orientation demo][5].

[1]: /web/tools/chrome-devtools/device-mode/geolocation
[2]: http://www.w3.org/TR/geolocation-API/
[3]: /web/tools/chrome-devtools/device-mode/orientation
[4]: http://www.w3.org/TR/screen-orientation/
[5]:
  http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html
