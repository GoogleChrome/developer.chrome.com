---
layout: "layouts/doc-post.njk"
title: "Manifest - USB Printers"
seoTitle: "Chrome Apps Manifest - USB Printers [Deprecated]"
date: 2015-05-07
#updated: TODO
description: Reference documentation for the usb_printers property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The `usbPrinters` manifest property declares which USB printers are supported by an app using the
[printerProvider][3] API.

## Sample manifest.json {: #manifest }

```json
{
  "name": "My printer app",
  "usb_printers": {
    "filters": [
      // This app can print to the Nexus One and any printer made by Google.
      { "vendorId": 6353, "productId": 19985 },
      { "vendorId": 6353, "interfaceClass": 7 }
    ]
  },
  ...
}
```

## Reference {: #reference }

- **`filters` (array of object)** - required

  A list of [USB device filters][4] matching supported devices. A device only needs to match one of
  the provided filters. A `vendorId` is required and only one of `productId` or `interfaceClass` may
  be provided.

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /apps/printerProvider
[4]: /apps/usb#type-DeviceFilter
