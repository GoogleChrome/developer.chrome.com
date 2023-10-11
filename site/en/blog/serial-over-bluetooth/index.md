---
layout: "layouts/blog-post.njk"
title: "Serial over Bluetooth on the web"
description: "The Web Serial API added support for Bluetooth RFCOMM services."
hero: "image/vvhSqZboQoZZN9wBvoXq72wzGAf1/uabT6SZieVHZgpYLsnF2.jpg"
alt: "A human hand holding Google Pixel Buds Pro charging case."
date: 2023-10-12
#updated: YYYY-MM-DD
authors:
  - beaufortfrancois
tags:
  - capabilities
  - devices
  - chrome-117
---

The [Web Bluetooth API](/articles/bluetooth/) and the [Web Serial API](/articles/serial/) allow web apps to communicate with Bluetooth Low Energy (BLE) devices and serial devices, respectively. While many web developers are already using these APIs to great success, there is a growing demand for support for Bluetooth Classic devices as well.

Now, the Web Serial API supports communicating with RFCOMM services on paired Bluetooth Classic devices including the [Serial Port Profile](https://www.bluetooth.com/specifications/specs/serial-port-profile-1-1/) (SPP) in Chrome 117 on desktop. This opens up new possibilities for web developers and users alike. Here are some real-world devices that can benefit from this:

- Pixel Buds Pro and other wireless earbuds use RFCOMM to manage audio settings and firmware updates.
- Mobile point-of-sale systems use Bluetooth SPP to communicate with receipt printers.
- Livestock RFID tag readers use Bluetooth SPP to log animal movements.

## The Bluetooth RFCOMM protocol

Take yourself back to the late 90s. You just put your Palm Pilot into its cradle to sync your calendar for the next day. Wouldn't it be nice if you could do that wirelessly instead? With this new "Bluetooth" technology you can get rid of all those messy cords. Wireless is the future! There's only one problem, everything that exists is designed to connect with an RS-232 cable. So, Bluetooth uses the [Radio Frequency Communication](https://www.bluetooth.com/specifications/specs/rfcomm-1-1/) (RFCOMM) protocol to provide that interface to all of the existing software and hardware.

Even today, RFCOMM services are widely used in new and existing hardware. It allows for meeting specific latency and bandwidth requirements that are not met by Bluetooth Low Energy so far. That is why we’ve developed an integration between Web Serial, an API for connecting to serial devices, and Bluetooth, to enable access to these legacy RFCOMM services before manufacturers eventually migrate to Bluetooth Low Energy and developers can use the Web Bluetooth API instead. 

## Web Serial API changes

Starting in Chrome 117 on desktop, web developers can now reliably communicate with paired Bluetooth Classic devices through RFCOMM services using the Web Serial API. This was made possible by the following updates to the Web Serial API:

- Chrome now enumerates paired Bluetooth devices that expose a serial interface using the standardized Bluetooth Classic Serial Port Profile.
- Chrome can now communicate with the serial interface even if the operating system has not created a [device node](https://en.wikipedia.org/wiki/Device_file) through an emulated serial port specifically.
- Chrome can now communicate with a non-Serial Port service that exposes an RFCOMM serial interface (see [non-standard Service Class IDs](https://github.com/WICG/serial/blob/main/EXPLAINER_BLUETOOTH.md#non-standard-service-class-ids)).

You can learn about how to use the Web Serial API in the [Read from and write to a serial port](/articles/serial/) article. This article assumes you have basic knowledge about Bluetooth and focuses on the serial over Bluetooth changes.

Without specifying any filters, calling `navigator.serial.requestPort()` allows users to select non-Bluetooth serial ports, Bluetooth serial ports that have been mapped already, and any unmapped serial ports provided by the standardized Bluetooth Classic Serial Port Profile.

```js
// Prompt user to select any serial port.
const port = await navigator.serial.requestPort();
```

Although most devices expose SPP-based communication through the standardized Bluetooth Classic Serial Port Profile, some use custom RFCOMM-based services. These devices have a Service Class ID that is not in the standard Bluetooth UUID range. 

You need to pass the `allowedBluetoothServiceClassIds` list to `navigator.serial.requestPort()` to access these custom RFCOMM-based services as shown in the example below.

```js
const myBluetoothServiceUuid = "01234567-89ab-cdef-0123-456789abcdef";

// Prompt user to select any serial port.
// Access to the custom Bluetooth RFCOMM service above will be allowed.
const port = await navigator.serial.requestPort({
  allowedBluetoothServiceClassIds: [myBluetoothServiceUuid],
});
```

Note that all Service Class IDs that use the Bluetooth SIG Base UUID (that is, all UUIDs that end in "-0000-1000-8000-00805f9b34fb") are blocked except the Serial Port Profile ID as Chrome does not support Bluetooth Classic services such as audio and video.

You can also use the `bluetoothServiceClassId `filter key when calling `navigator.serial.requestPort() `to prompt the user with a list of filtered Bluetooth serial ports identified by Service Class IDs. See the example below.

```js
const myBluetoothServiceUuid = "01234567-89ab-cdef-0123-456789abcdef";

// Prompt the user to select Bluetooth serial ports with
// the custom Bluetooth RFCOMM service above.
const port = await navigator.serial.requestPort({
  allowedBluetoothServiceClassIds: [myBluetoothServiceUuid],
  filters: [{ bluetoothServiceClassId: myBluetoothServiceUuid }],
});
```

If the serial port is part of a Bluetooth device, a new `bluetoothServiceClassId` key containing the Service Class ID associated with the RFCOMM channel that the port is connected to is available in the serial port info returned by calling `port.getInfo()`. If the serial port is mapped, it returns "00001101-0000-1000-8000-00805f9b34fb" or 0x1101 in its short form.

```js
const { bluetoothServiceClassId } = port.getInfo();
```

## Use case example: Control Pixel Buds Pro

The Pixel Buds Pro Web Companion App is a new web app that allows users to control their Pixel Buds Pro from any device with a web browser. It is built using [Progressive Web Apps](https://web.dev/progressive-web-apps/) technologies for an instant load experience and can optionally be installed alongside other operating system apps.

The app uses the Web Serial API to communicate with the Pixel Buds Pro. This allows users to control various settings on their Pixel Buds Pro, such as active noise control, equalizer, in-ear detection, and firmware updates.

To try the Pixel Buds Pro Web Companion App, visit [mypixelbuds.google.com](https://mypixelbuds.google.com) on a ChromeOS device (other platforms coming soon).

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/MGZqWBWp7He7IxlZu88l.jpg", alt="Screenshot of the Pixel Buds Pro Web Companion App.", width="800", height="450" %}
  <figcaption>
    Pixel Buds Pro Web Companion App.
  </figcaption>
</figure>

## Resources

- [Explainer](https://github.com/WICG/serial/blob/main/EXPLAINER_BLUETOOTH.md)
- [Spec changes](https://github.com/WICG/serial/pull/189)
- [ChromeStatus entry](https://chromestatus.com/feature/5686596809523200)
- [TAG review](https://github.com/w3ctag/design-reviews/issues/854)
- [Intent to Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/P4YwDCcvdvs/m/CHbyTu_gAAAJ)

## Acknowledgments

Thanks to Reilly Grant, Thomas Steiner, Ben Morss, and Vincent Scheib for their reviews.
Hero image by [Mika Baumeister](https://unsplash.com/@mbaumi) on [Unsplash](https://unsplash.com/photos/QC87Pjb4hG4).
