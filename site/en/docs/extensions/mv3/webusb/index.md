---
layout: "layouts/doc-post.njk"
title: "WebUSB in extensions"
seoTitle: "Chrome Extensions: WebUSB"
date: 2023-11-02
description: The WebUSB API, which exposes non-standard Universal Serial Bus (USB) compatible devices to the web, is available in extensions.
---

The WebUSB API exposes non-standard Universal Serial Bus (USB) compatible devices to the web. This page describes aspects of the API that are particular to extensions. Refer to MDN for complete details of the [WebUSB API](https://developer.mozilla.org/docs/Web/API/WebUSB_API).

Here is [a sample app for WebUSB](https://github.com/sowbug/weblight/tree/master);

## Availability in extensions

Chrome 117 or later.

## Permissions

No manifest file permissions are required; however WebUSB triggers the browser's user permission flow.

## Manifest

No manifest keys are needed for this API.

## Supporting contexts

This API may be used in any extension component. Although this API cannot be used in web service workers, most of its methods and properties can be used in extension service workers. See the next section for details.

## Chrome extension differences

Although WebUSB is available to extension service workers, [`WebUSB.requestDevice()`](https://developer.mozilla.org/docs/Web/API/USB/requestDevice), which returns a promise that resolves with a [USBDevice](https://developer.mozilla.org/docs/Web/API/USBDevice) instance, cannot be called in an extension service worker. To get around this, call `requestDevice()` from an extension page other than the extension service worker and pass the reference to the extension service worker.

The following code follows a typical pattern by calling `requestDevice()` as part of a permissions flow requiring a user gesture. (If the permission has not already been granted, calling `requestDevice()` triggers it.)

```javascript
someButton.addEventListener('click', async () => {
  const device = await navigator.usb.requestDevice({
    filters: [{ vendorId: 1241, productId: 41042 }]
  });
  console.log('Device access granted!', device);
  chrome.runtime.sendMessage(device);
});
  ```
