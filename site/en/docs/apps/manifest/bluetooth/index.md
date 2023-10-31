---
layout: "layouts/doc-post.njk"
title: "Manifest - Bluetooth"
seoTitle: "Chrome Apps Manifest - Bluetooth [Deprecated]"
date: 2014-03-11
updated: 2014-10-31
description: Reference documentation for the bluetooth property of manifest.json.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The `bluetooth` manifest property declares which permissions are available for the [bluetooth][3]
API.

## Sample manifest.json {: #manifest }

```json
{
  "name": "My Bluetooth app",
  "bluetooth": {
    // Permission for chrome.bluetoothSocket:
    // The application is allowed to communicate with devices
    // using the protocols, profiles, or services identified by
    // the UUIDs 0x1105 and 0x1106 using the BluetoothSocket API.
    "uuids": [ "1105", "1106" ],
    "socket": true
  },
  ...
}
```

```json
{
  "name": "My Bluetooth app",
  "bluetooth": {
    // Permission for chrome.bluetoothLowEnergy:
    // The application is allowed to communicate with devices
    // using the profiles identified by the UUIDs 0x180D, 0x1809 and 0x180F
    // using the BluetoothLowEnergy API.
    "uuids": [ "180D", "1809", "180F" ],
    "low_energy": true
  },
  ...
}
```

## Reference {: #reference }

- **`uuids` (array of string)** - optional

  The `uuids` manifest property declares the list of protocols, profiles and services that an app
  can communicate using.

- **`socket` (boolean)** - optional

  If `true`, gives permission to an app to use the [bluetoothSocket][4] API

- **`low_energy` (boolean)** - optional

  If `true`, gives permission to an app to use the [bluetoothLowEnergy][5] API

- **`peripheral` (boolean)** - optional

  If `true`, gives permission to an app to use the advertisement functions in the
  [bluetoothLowEnergy][6] API

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: /apps/bluetooth
[4]: /apps/bluetoothSocket
[5]: /apps/bluetoothLowEnergy
[6]: /apps/bluetoothLowEnergy
