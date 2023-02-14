---
layout: 'layouts/blog-post.njk'
title: 'Talking to the Stadia controller with WebHID'
subhead: >
  The flashed Stadia controller acts like a standard gamepad, which means not all its buttons are accessible using the Gamepad API. With WebHID, you can now access the missing buttons.
date: 2023-02-08
# updated: 2023-02-08
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/ntu2C8y08oDDQf6oMhF2.jpg
alt: Stadia controller.
authors:
  - thomassteiner
tags:
  - capabilities
---

Since Stadia shut down, many feared that the controller would end up as a useless piece of hardware on the landfill. Luckily, the Stadia team has decided to instead open up the Stadia controller by providing a custom firmware that you can flash on your controller by going to the [Stadia Bluetooth mode](https://stadia.com/controller) page. This makes your Stadia controller appear as a standard gamepad that you can connect to via USB cable or wirelessly via Bluetooth. Proudly [featured on the Project Fugu API Showcase](/fugu-showcase/#stadia-bluetooth-mode), the Stadia Bluetooth page itself uses [WebHID](https://developer.mozilla.org/docs/Web/API/WebHID_API) and [WebUSB](https://developer.mozilla.org/docs/Web/API/USB), but this is not the topic of this article. In this post, I want to explain how you can talk to the Stadia controller via WebHID.

## The Stadia controller as a standard gamepad

After flashing, the controller appears as a [standard gamepad](https://w3c.github.io/gamepad/#dfn-standard-gamepad) to the operating system. See the following screenshot for a common button and axis arrangement on a standard gamepad. As defined in the [Gamepad API](https://web.dev/gamepad/) spec, standard gamepads have buttons from 0 to 16, so 17 in total (the d-pad counts as four buttons). If you try the Stadia controller on the [gamepad tester demo](https://gamepad-demo.glitch.me/), you will notice that it works like a charm.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/ujZz8e9qFPk9YVTROqZX.png", alt="A schema of a standard gamepad with the various axes and buttons labeled.", width="800", height="566" %}

However, if you count the buttons on the Stadia controller, there are 19. If you systematically try them one by one in the gamepad tester, you will realize that the **Assistant** and the **Capture** buttons don't work. Even if the gamepad [`buttons` attribute](https://w3c.github.io/gamepad/#dom-gamepad-buttons) as defined in the Gamepad spec is open-ended, since the Stadia controller appears as a standard gamepad, only buttons 0–16 are mapped. You can still use the other buttons, but most games won't expect them to exist.

## WebHID to the rescue

Thanks to the WebHID API, you can talk to the missing buttons 17 and 18. And if you really want to, you can even get data about all the other buttons and axes that are already available via the Gamepad API. The first step is finding out how the Stadia controller reports itself to the operating system. One way to do so is to open the Chrome DevTools Console on any random page, and to request an unfiltered list of devices from the WebHID API. You then manually choose the Stadia controller for further inspection. Get an unfiltered list of devices by simply passing an empty `filters` options array.

```js
const [device] = await navigator.hid.requestDevice({filters: []});
```

In the picker, the penultimate entry looks like the Stadia controller.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/j9eJ6MlwBoE8aPFoeJBf.png", alt="The WebHID API device picker showing some unrelated devices, and the Stadia controller in the penultimate position.", width="445", height="425" %}

After selecting the "Stadia Controller rev. A" device, log the resulting [`HIDDevice`](https://developer.mozilla.org/docs/Web/API/HIDDevice) object to the Console. This reveals the Stadia controller's `productId` (`37888`, which is `0x9400` in hex) and `vendorId` (`6353`, which is `0x18d1` in hex). If you look up the `vendorID` in the official [USB vendor ID table](https://usb.org/sites/default/files/vendor_ids051920_0.pdf), you will find that `6353` maps to what you would expect: `Google Inc.`.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/PrdSqHe6ZGpHL08ZW722.png", alt="Chrome DevTools Console showing the output of logging the HIDDevice object.", width="800", height="218" %}

An alternative to the flow described above is navigating to `chrome://device-log/` in the URL bar, pressing the **Clear** button, plugging in your Stadia controller, and then pressing **Refresh**. This provides you with the same information.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/kcPKwGZ6IDjH90hO5vqC.png", alt="The chrome://device-log debug interface showing information about the plugged-in Stadia controller.", width="800", height="154" %}

Yet another alternative is using the [HID Explorer](https://nondebug.github.io/webhid-explorer/) tool that lets you explore even more details of the HID devices connected to your computer.

Use these two IDs, the `vendorId` and the `productId`, to refine what's shown in the picker by now correctly filtering for the right WebHID device.

```js
const [stadiaController] = await navigator.hid.requestDevice({filters: [{
  vendorId: 6353,
  productId: 37888,
}]});
```

Now the noise from all the unrelated devices is gone, and only the Stadia controller shows up.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/XiYdITiLC0xcmWJzbm3J.png", alt="The WebHID API device picker showing only the Stadia controller.", width="443", height="423" %}

Up next, open the `HIDDevice` by calling the [`open()`](https://developer.mozilla.org/docs/Web/API/HIDDevice/open) method.

```js
await stadiaController.open();
```

Log the `HIDDevice` again, and the `opened` flag is set to `true`.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/9Gyu3SyEXOZxOkc1mPE5.png", alt="The Chrome DevTools Console showing the output of logging the HIDDevice object after opening it.", width="800", height="266" %}

With the device open, listen for incoming [`inputreport`](https://developer.mozilla.org/docs/Web/API/HIDInputReportEvent) events by attaching an event listener.

```js
stadiaController.addEventListener('inputreport', (e) => {
  console.log(e);
});
```

When you press and let go the **Assistant** button on the controller, two events are logged to the Console. You can think of them as "**Assistant** button down" and "**Assistant** button up" events. Apart from the `timeStamp`, the two events look indistinguishable at first glance.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/trcZJZs3cDb3BC3BDEH4.png", alt="The Chrome DevTools Console showing HIDInputReportEvent objects being logged.", width="800", height="864" %}

The `reportId` property of the `HIDInputReportEvent` interface returns the one-byte identification prefix for this report, or `0` if the HID interface does not use report IDs. In this case it's `3`. The secret is in the [`data` property](https://developer.mozilla.org/docs/Web/API/HIDInputReportEvent/data), which is represented as a [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) of size 10. A `DataView` provides a low-level interface for reading and writing multiple number types in a binary [`ArrayBuffer`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). The way to get something more digestible out of this representation is by creating a [`Uint8Array`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) out of the `ArrayBuffer`, so you can see the individual 8-bit unsigned integers.

```js
const data = new Uint8Array(event.data.buffer);
```

When you then log the input report event data again, things start to make more sense and the "**Assistant** button down" and "**Assistant** button up" events start to become decipherable. The first integer (`8` in both events) seems to be related to button presses, and the second integer (`2` and `0`) seems to be related to whether the **Assistant** button is pressed or not.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/rsNOPN7F1S2ot5AvPy8X.png", alt="The Chrome DevTools Console showing Uint8Array objects being logged for each HIDInputReportEvent.", width="800", height="202" %}

Press the **Capture** button instead of the **Assistant** button, and you will see that the second integer toggles from `1` when the button is pressed to `0` when it's released. This allows you to write a very simple "driver" that enables you to make use of the missing two buttons.

```js
stadia.addEventListener('inputreport', (event) => {
  if (!e.reportId === 3) {
    return;
  }
  const data = new Uint8Array(event.data.buffer);
  if (data[0] === 8) {
    if (data[1] === 1) {
      hidButtons[1].classList.add('highlight');
    } else if (data[1] === 2) {
      hidButtons[0].classList.add('highlight');
    } else if (data[1] === 3) {
      hidButtons[0].classList.add('highlight');
      hidButtons[1].classList.add('highlight');
    } else {
      hidButtons[0].classList.remove('highlight');
      hidButtons[1].classList.remove('highlight');
    }
  }
});
```

Using a reverse-engineering approach like this, you can, button by button and axis by axis, figure out how to talk to the Stadia controller with WebHID. Once you get the hang of it, the rest is almost mechanical integer mapping work.

The one thing that's missing now is the smooth connecting experience that the Gamepad API gives you. While for security reasons you always need to go through the initial picker experience once in order to work with a WebHID device like the Stadia controller, for future connections, you can reconnect to known devices. Do that by calling the [`getDevices()`](https://developer.mozilla.org/docs/Web/API/HID/getDevices) method.

```js
let stadiaController;
const [device] = await navigator.hid.getDevices();
if (device && device.vendorId === 6353 && device.productId === 37888) {
  stadiaController = device;
}
```

## Demo

You can see the Stadia controller controlled jointly by the Gamepad API and the WebHID API in a [demo](https://stadia-controller-webhid-gamepad.glitch.me/) that I've built. Be sure to check out the [source code](https://glitch.com/edit/#!/stadia-controller-webhid-gamepad?path=script.js%3A42%3A8), which builds upon the snippets from this article. For the sake of simplicity, I only display the **A**, **B**, **X**, and **Y** buttons (controlled by the Gamepad API), and the **Assistant** and the **Capture** buttons (controlled by the WebHID API). Below the controller image, you can see the raw WebHID data, so you can get a feeling for all the buttons and axes on the controller.

 {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/ea213ZGChHGrqvAI80Vr.png", alt="The demo app at https://stadia-controller-webhid-gamepad.glitch.me/ showing the A, B, X, and the Y buttons being controlled by the Gamepad API, and the Assistant and the Capture buttons being controlled by the WebHID API.", width="800", height="726" %}

## Conclusions

Thanks to the new firmware, the Stadia controller is now usable as a standard gamepad with 17 buttons, which, in the majority of cases, is more than enough to control common web games. If, for whatever reason, you need data from all 19 buttons on the controller, WebHID allows you to get access to low-level input reports that you can decipher by reverse-engineering them one by one. If you happen to write a complete WebHID driver after reading this article, be sure to contact me, and I'll happily link your project here. Happy WebHIDing!

## Acknowledgements

This article was reviewed by [François Beaufort](https://twitter.com/quicksave2k).
