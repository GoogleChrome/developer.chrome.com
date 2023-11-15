---
layout: "layouts/doc-post.njk"
title: "WebUSB in extensions"
seoTitle: "Chrome Extensions: WebUSB"
date: 2023-11-02
description: The WebUSB API, which exposes non-standard Universal Serial Bus (USB) compatible devices to the web, is available in extensions.
---

The WebUSB API exposes non-standard Universal Serial Bus (USB) compatible devices to the web. This page describes aspects of the API that are particular to extensions. Refer to MDN for complete details of the [WebUSB API](https://developer.mozilla.org/docs/Web/API/WebUSB_API).

## Availability in extensions

Chrome 118 or later.

## Permissions

No manifest file permissions are required; however WebUSB triggers the browser's user permission flow.

## Manifest

No manifest keys are needed for this API.

## Supporting contexts

This API may be used in almost any context; The `WebUSB.requestDevice()` method cannot be used in extension service workers. See the next section for details.

## Chrome extension differences

Although WebUSB is available to extension service workers, [`WebUSB.requestDevice()`](https://developer.mozilla.org/docs/Web/API/USB/requestDevice), which returns a promise that resolves with a [USBDevice](https://developer.mozilla.org/docs/Web/API/USBDevice) instance, cannot be called in an extension service worker. To get around this, call `requestDevice()` from an extension page other than the extension service worker and send a message to the extension service worker.

The following code follows a typical pattern by calling `requestDevice()` as part of a permissions flow requiring a user gesture. When the device is acquired it sends a message to the service worker, which can then retrieve the device using [`getDevices()`](https://developer.mozilla.org/docs/Web/API/USB/getDevices).

{% Label %}popup.js:{% endLabel %}

```javascript
myButton.addEventListener("click", async () => {
  await navigator.usb.requestDevice({
    filters: [{ vendorId: 0x1234, productId: 0x5678 }],
  });
  chrome.runtime.sendMessage("newDevice");
});
```

{% Label %}service-worker.js{% endLabel %}

```javascript
chrome.runtime.onMessage.addListener(async (message) => {
  if (message === "newDevice") {
    const devices = await navigator.usb.getDevices();
    for (const device of devices) {
      // open device connection.
      await device.open();
    }
  }
});
```