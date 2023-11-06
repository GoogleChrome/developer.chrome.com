---
layout: "layouts/doc-post.njk"
title: "WebHID in extensions"
seoTitle: "Chrome Extensions: WebHID"
date: 2023-11-02
description: The WebHID API, which exposes Human Interface Device (HID) compatible devices to the web, is available in extensions.

---

A Human Interface Device (HID) takes input from or provides output to humans. It also refers to the HID protocol, a standard for bi-directional communication between a host and a device that is designed to simplify the installation procedure.

This page describes aspects of the API that are particular to extensions. Refer to MDN for complete details of the [WebHID API](https://developer.mozilla.org/docs/Web/API/WebHID_API).

You can find a [sample app for WebHID](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.co2meter) in our samples repo.

## Availability in extensions

Chrome 117 or later.

## Permissions

No manifest file permissions are required; however WebHID triggers the browser's user permission flow.

## Manifest

No manifest keys are needed for this API.

## Supporting contexts

This API may be used in almost any context; The `WebHID.requestDevice()` method cannot be used in extension service workers. See the next section for details.

## Chrome extension differences

Although WebHID is available to extension service workers, [`WebHID.requestDevice()`](https://developer.mozilla.org/docs/Web/API/HID/requestDevice), which returns a promise that resolves with an [HIDDevice](https://developer.mozilla.org/docs/Web/API/HIDDevice) instance, cannot be called in an extension service worker. To get around this, call `requestDevice()` from an extension page other than the extension service worker and send a message to the extension service worker.

The following code follows a typical pattern by calling `requestDevice()` as part of a permissions flow requiring a user gesture. When the device is acquired it sends a message to the service worker, which can then retrieve the device using [`getDevices()`](https://developer.mozilla.org/docs/Web/API/HID/getDevices).

{% Label %}popup.js:{% endLabel %}

```javascript
myButton.addEventListener("click", async () => {
  await navigator.hid.requestDevice({
    filters: [{ vendorId: 0x1234, productId: 0x5678 }],
  });
  chrome.runtime.sendMessage("newDevice");
});
```

{% Label %}service-worker.js{% endLabel %}

```javascript
chrome.runtime.onMessage.addListener(async (message) => {
  if (message === "newDevice") {
    const devices = await navigator.hid.getDevices();
    for (const device of devices) {
      // open device connection.
      await device.open();
    }
  }
});
```