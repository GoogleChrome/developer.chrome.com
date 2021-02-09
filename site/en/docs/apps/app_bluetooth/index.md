---
layout: "layouts/doc-post.njk"
title: "Bluetooth"
date: 2014-03-11
updated: 2017-02-18
description: How to communicate with Bluetooth devices from your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

This document describes how to use the [Bluetooth][3], [Bluetooth Socket][4] and [Bluetooth Low
Energy][5] APIs to communicate with Bluetooth and Bluetooth Low Energy devices.

For background information about Bluetooth, see the official [Bluetooth specifications][6].

{% Aside %}

**Note:** With Chrome 56, users can select nearby Bluetooth Low Energy devices to provide to web
sites that use the [Web Bluetooth][7] API.

{% endAside %}

## Manifest requirements {: #manifest }

For Chrome Apps that use Bluetooth, add the [bluetooth][8] entry to the manifest and specify, if
appropriate, the UUIDs of profiles, protocols or services you wish to implement along with whether
you wish to implement these with the socket and/or Low Energy APIs.

For example for a socket implementation:

```json
"bluetooth": {
  "uuids": [ "1105", "1106" ],
  "socket": true
}
```

And for a Low Energy implementation:

```json
"bluetooth": {
  "uuids": [ "180D", "1809", "180F" ],
  "low_energy": true
}
```

To only access adapter state, discover nearby devices, and obtain basic information about devices,
only the entry itself is required:

```json
"bluetooth": {}
```

## Adapter information {: #adapter_info }

### Obtaining adapter state {: #adapter_state }

To obtain the state of the Bluetooth adapter, use the [bluetooth.getAdapterState][9] method:

```js
chrome.bluetooth.getAdapterState(function(adapter) {
  console.log("Adapter " + adapter.address + ": " + adapter.name);
});
```

### Adapter notifications {: #adapter_notifications }

The [bluetooth.onAdapterStateChanged][10] event is sent whenever the adapter state changes. This can
be used, for example, to determine when the adapter radio is powered on or off.

```js
var powered = false;
chrome.bluetooth.getAdapterState(function(adapter) {
  powered = adapter.powered;
});

chrome.bluetooth.onAdapterStateChanged.addListener(
  function(adapter) {
    if (adapter.powered != powered) {
      powered = adapter.powered;
      if (powered) {
        console.log("Adapter radio is on");
      } else {
        console.log("Adapter radio is off");
      }
    }
  });
```

## Device information {: #device_info }

### Listing known devices {: #listing_devices }

To get a list of the devices known to the Bluetooth adapter, use the [bluetooth.getDevices][11]
method:

```js
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    console.log(devices[i].address);
  }
});
```

All devices are returned, including paired devices and devices recently discovered. It will not
begin discovery of new devices (see [Discovering nearby devices][12]).

### Receiving device notifications {: #device_notifications }

Instead of repeatedly calling [bluetooth.getDevices][13], you can use the
[bluetooth.onDeviceAdded][14], [bluetooth.onDeviceChanged][15] and [bluetooth.onDeviceRemoved][16]
events to receive notifications.

The [bluetooth.onDeviceAdded][17] event is sent whenever a device is discovered by the adapter or
makes a connection to the adapter:

```js
chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  console.log(device.address);
});
```

Adding a listener for this event does not begin discovery of devices (see [Discovering nearby
devices][18]).

Changes to devices, including previously discovered devices becoming paired, are notified by the
[bluetooth.onDeviceChanged][19] event:

```js
chrome.bluetooth.onDeviceChanged.addListener(function(device) {
  console.log(device.address);
});
```

Finally the [bluetooth.onDeviceRemoved][20] event is sent whenever a paired device is removed from
the system, or a discovered device has not been seen recently:

```js
chrome.bluetooth.onDeviceRemoved.addListener(function(device) {
  console.log(device.address);
});
```

### Discovering nearby devices {: #discovery }

To begin discovery of nearby devices, use the [bluetooth.startDiscovery][21] method. Discovery can
be resource intensive so you should call [bluetooth.stopDiscovery][22] when done.

You should call [bluetooth.startDiscovery][23] whenever your app needs to discover nearby devices.
Do not make the call conditional on the `discovering` property of [bluetooth.AdapterState][24]. The
call will succeed even if another app is discovering nearby devices, and will ensure the adapter
continues to perform discovery after that other app has stopped.

Information about each newly discovered device is received using the [bluetooth.onDeviceAdded][25]
event. For devices that have already been discovered recently, or have been previously paired with
or connected to, the event will not be sent. Instead you should call [bluetooth.getDevices][26] to
obtain the current information, and use the [bluetooth.onDeviceChanged][27] event to be notified of
changes to that information as a result of discovery.

Example:

```js
var device_names = {};
var updateDeviceName = function(device) {
  device_names[device.address] = device.name;
};
var removeDeviceName = function(device) {
  delete device_names[device.address];
}

// Add listeners to receive newly found devices and updates
// to the previously known devices.
chrome.bluetooth.onDeviceAdded.addListener(updateDeviceName);
chrome.bluetooth.onDeviceChanged.addListener(updateDeviceName);
chrome.bluetooth.onDeviceRemoved.addListener(removeDeviceName);

// With the listeners in place, get the list of devices found in
// previous discovery sessions, or any currently active ones,
// along with paired devices.
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    updateDeviceName(devices[i]);
  }
});

// Now begin the discovery process.
chrome.bluetooth.startDiscovery(function() {
  // Stop discovery after 30 seconds.
  setTimeout(function() {
    chrome.bluetooth.stopDiscovery(function() {});
  }, 30000);
});
```

If the user turns off the Bluetooth radio, all discovery sessions will be ended and not resumed
automatically when the radio is switched on. If this matters to your app, you should watch the
[bluetooth.onAdapterStateChanged][28] event. If the `discovering` property changes to `false`, then
your app will need to call [bluetooth.startDiscovery][29] again to resume. Be cautious of the
resource intensive nature of discovery.

### Identifying devices {: #identifying_devices }

A number of different options are provided for identifying devices returned by
[bluetooth.getDevices][30] and the related events.

If the device supports the Bluetooth [Device ID specification][31], several properties are added to
the Device object containing the fields defined by that specification. Example:

```js
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    if (devices[0].vendorIdSource != undefined) {
      console.log(devices[0].address + ' = ' +
                  devices[0].vendorIdSource + ':' +
                  devices[0].vendorId.toString(16) + ':' +
                  devices[0].productId.toString(16) + ':' +
                  devices[0].deviceId.toString(16));
    }
  }
});
```

The Device ID specification is usually sufficient to identify a particular model, and even revision,
of a device from a vendor. Where it is not present, you must instead rely on information about the
class or type of the device, optionally combined with the manufacturer prefix in the `address`.

Most Bluetooth devices provide Class of Device information as a bit-field interpreted according to
the [Baseband Assigned Numbers][32] document. This bit-field is available in the `deviceClass`
property.

```js
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    if (devices[0].vendorIdSource != undefined) {
      console.log(devices[0].address + ' = ' +
                  devices[0].deviceClass.toString(16));
    }
  }
});
```

Parsing the field can be complex so for the most common device types Chrome handles this for you and
sets the `type` field. Where this is not available, or insufficient for your needs, you'll need to
parse the `deviceClass` yourself.

```js
chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    if (devices[0].vendorIdSource != undefined) {
      console.log(devices[0].address + ' = ' + devices[0].type);
    }
  }
});
```

## Using RFCOMM and L2CAP {: #using_rfcomm }

Chrome Apps may make connections to any device that supports RFCOMM or L2CAP services. This includes
the majority of classic Bluetooth devices on the market.

### Connecting to a socket {: #connecting }

In order to make a connection to a device you need three things. A socket to make the connection
with, created using [bluetoothSocket.create][33]; the address of the device you wish to connect to,
and the UUID of the service itself.

Before making the connection you should verify that the adapter is aware of the device by using
[bluetooth.getDevice][34] or the device discovery APIs.

The information necessary to establish the underlying connection, including whether the RFCOMM or
L2CAP protocol should be used and which channel or PSM, is obtained using SDP discovery on the
device.

Example:

```js
var uuid = '1105';
var onConnectedCallback = function() {
  if (chrome.runtime.lastError) {
    console.log("Connection failed: " + chrome.runtime.lastError.message);
  } else {
    // Profile implementation here.
  }
};

chrome.bluetoothSocket.create(function(createInfo) {
  chrome.bluetoothSocket.connect(createInfo.socketId,
    device.address, uuid, onConnectedCallback);
});
```

Keep a handle to the socketId so that you can later send data ([bluetoothSocket.send][35]) to this
socket.

### Receiving from and sending to a socket {: #receiving }

Receiving data from and sending to a socket uses `ArrayBuffer` objects. To learn about ArrayBuffers,
check out the overview, [JavaScript typed arrays][36], and the tutorial, [How to convert ArrayBuffer
to and from String][37].

To send data you have in `arrayBuffer` use [bluetoothSocket.send][38]:

```js
chrome.bluetoothSocket.send(socketId, arrayBuffer, function(bytes_sent) {
  if (chrome.runtime.lastError) {
    console.log("Send failed: " + chrome.runtime.lastError.message);
  } else {
    console.log("Sent " + bytes_sent + " bytes")
  }
})
```

In contrast to the method to send data, data is received in an event
([bluetoothSocket.onReceive][39]. Sockets are created unpaused (see [bluetoothSocket.setPaused][40])
so the listener for this event is typically added between [bluetoothSocket.create][41] and
[bluetoothSocket.connect][42].

```js
chrome.bluetoothSocket.onRecieve.addListener(function(receiveInfo) {
  if (receiveInfo.socketId != socketId)
    return;
  // receiveInfo.data is an ArrayBuffer.
});
```

### Receiving socket errors and disconnection {: #errors }

To be notified of socket errors, including disconnection, add a listener to the
[bluetoothSocket.onReceiveError][43] event.

```js
chrome.bluetoothSocket.onReceiveError.addListener(function(errorInfo) {
  // Cause is in errorInfo.error.
  console.log(errorInfo.errorMessage);
});
```

### Disconnecting from a socket {: #disconnection }

To hang up the connection and disconnect the socket use [bluetoothSocket.disconnect][44].

```js
chrome.bluetoothSocket.disconnect(socketId);
```

## Publishing services

In addition to making outbound connections to devices, Chrome Apps may publish services that may be
used by any device that supports RFCOMM or L2CAP.

### Listening on a socket {: #listening }

Two types of published service are supported. RFCOMM is the most commonly used and covers the
majority of devices and profiles:

```js
var uuid = '1105';
chrome.bluetoothSocket.create(function(createInfo) {
  chrome.bluetoothSocket.listenUsingRfcomm(createInfo.socketId,
    uuid, onListenCallback);
});
```

L2CAP is the other and covers other device types and vendor-specific uses such as firmware
uploading.

```js
var uuid = '0b87367c-f188-47cd-bc20-a5f4f70973c6';
chrome.bluetoothSocket.create(function(createInfo) {
  chrome.bluetoothSocket.listenUsingL2cap(createInfo.socketId,
    uuid, onListenCallback);
});
```

In both cases an optional [bluetoothSocket.ListenOptions][45] may be passed to allocate a specific
channel or PSM. The callback indicates error through `chrome.runtime.lastError` and success
otherwise. Keep a handle to the socketId so that you can later accept connections
([bluetoothSocket.onAccept][46]) from this socket.

### Accepting client connections {: #accepting }

Client connections are accepted and passed to your application through the
[bluetoothSocket.onAccept][47] event.

```js
chrome.bluetoothSocket.onAccept.addListener(function(acceptInfo) {
  if (info.socketId != serverSocketId)
    return;

  // Say hello...
  chrome.bluetoothSocket.send(acceptInfo.clientSocketId,
    data, onSendCallback);

  // Accepted sockets are initially paused,
  // set the onReceive listener first.
  chrome.bluetoothSocket.onReceive.addListener(onReceive);
  chrome.bluetoothSocket.setPaused(false);
});
```

### Stop accepting client connections {: #stop-accepting }

To stop accepting client connections and unpublish the service use [bluetoothSocket.disconnect][48].

```js
chrome.bluetoothSocket.disconnect(serverSocketId);
```

## Interacting with Low Energy devices {: #low-energy }

Bluetooth Low Energy or (Bluetooth Smart) is a wireless technology aimed at reduced power
consumption. The [Bluetooth Low Energy][49] API allows applications to implement the central role in
a LE connection to a peripheral. The following sections describe how to discover, connect to, and
interact with Bluetooth Low Energy peripherals.

### Discovering and connecting to peripherals {: #le-discovery }

As with traditional Bluetooth devices, LE peripherals can be discovered using the methods described
in [Discovering nearby devices][50] . An LE device makes itself discoverable by sending data packets
called "Advertising Data" and the device is said to be in _advertising mode_. The advertising data
may contain UUIDs of services that are available on the device. If present, these UUIDs will be
accessible using the `uuids` property of the corresponding [bluetooth.Device][51] object.

Once discovered, an LE device can be connected to by calling [bluetoothLowEnergy.connect][52] so
that the application can interact with its services:

```js
chrome.bluetooth.onDeviceAdded.addListener(function(device) {
  var uuid = '0000180d-0000-1000-8000-00805f9b34fb';
  if (!device.uuids || device.uuids.indexOf(uuid) < 0)
    return;

  // The device has a service with the desired UUID.
  chrome.bluetoothLowEnergy.connect(device.address, function () {
    if (chrome.runtime.lastError) {
      console.log('Failed to connect: ' + chrome.runtime.lastError.message);
      return;
    }

    // Connected! Do stuff...
    ...
  });
});
```

Once connected, the `connected` property of the corresponding [bluetooth.Device][53] object will
have the value `true`. Calling [bluetoothLowEnergy.connect][54] establishes a claim by the
application on the physical connection to the device. A physical connection to the device can exist
without ever calling [bluetoothLowEnergy.connect][55] (for example due to another application). In
this case, while your application can still interact with the services of the device, it should
always call [bluetoothLowEnergy.connect][56] to prevent another application from disconnecting the
physical link.

Once your application no longer needs to be connected, it can remove its claim on the connection by
calling [bluetoothLowEnergy.disconnect][57]:

```js
chrome.bluetoothLowEnergy.disconnect(deviceAddress);
```

Note that this won't necessarily destroy the physical link to the device, as there may be other
applications who have active connections to the device. Sometimes the device might become
disconnected due to reasons that are beyond the control of the application (e.g. if the device
disappears or gets explicitly disconnected by the user through utilities of the operating system).
Your application should observe the [bluetooth.onDeviceChanged][58] event to get notified of changes
to the connection and reconnect if necessary.

Once connected, the device that is running Chrome will be in the so called _central role_, while the
remote device is said to be in the _peripheral role_. At this point, your application can interact
with the services on the device using the methods described in the following section. _Note:_ The
APIs currently do not support acting as a LE peripheral; apps can only implement the central role.

### Services, Characteristics, and Descriptors {: #gatt }

Bluetooth Low Energy is based on a simple request-response protocol called the _Attribute Protocol_
(ATT). Using ATT, a central device interacts with the so called _attributes_ on a peripheral device
by conforming to a special Bluetooth profile called the _Generic Attribute Profile_ (GATT). GATT
defines the following high level concepts:

- Service: A GATT service represents a collection of data and associated behaviors to accomplish a
  particular function of a device. For example, a heart rate monitor will typically have at least
  one "Heart Rate Service". Information about a GATT service is contained in a
  [bluetoothLowEnergy.Service][59] object.
- Characteristic: A GATT characteristic is a basic data element used to construct a GATT service,
  containing a value along with properties that define how that value can be accessed. For example,
  the "Heart Rate Service" has the "Heart Rate Measurement" characteristic, which is used to obtain
  the value of the user's heart rate. Information about a GATT characteristic is contained in a
  [bluetoothLowEnergy.Characteristic][60] object.
- Descriptor: A GATT characteristic descriptor contains further information about a characteristic.
  Information about a GATT characteristic descriptor is contained in a
  [bluetoothLowEnergy.Descriptor][61] object.

The [Bluetooth Low Energy][62] API allows applications to find information about a device's
services, characteristics, and descriptors by calling [bluetoothLowEnergy.getServices][63],
[bluetoothLowEnergy.getCharacteristics][64], and [bluetoothLowEnergy.getDescriptors][65]. Apps can
filter through services, characteristics, and descriptors by comparing their `uuid` field to the
desired GATT UUID:

```js
chrome.bluetoothLowEnergy.getServices(deviceAddress, function(services) {
  ...
  for (var i = 0; i < services.length; i++) {
    if (services[i].uuid == HEART_RATE_SERVICE_UUID) {
      heartRateService = services[i];
      break;
    }
  }
  ...
});
```

Each service, characteristic, and descriptor accessible through the API is assigned a unique
instance identifier, which can be obtained using the `instanceId` field. This instance ID can be
used to identify a GATT object and to perform specific operations on it:

```js
chrome.bluetoothLowEnergy.getCharacteristics(heartRateService.instanceId,
                                             function(chracteristics) {
  ...
  for (var i = 0; i < characteristics.length; i++) {
    if (characteristics[i].uuid == HEART_RATE_MEASUREMENT_UUID) {
      measurementChar = characteristics[i];
      break;
    }
  }
  ...
  chrome.bluetoothLowEnergy.getDescriptors(measurementChar.instanceId,
                                           function(descriptors) {
    ...
  });
});
```

### Service events {: #service-events }

Once a device is connected, Chrome will discover its services. As each service is discovered and
removed, the application will receive the [bluetoothLowEnergy.onServiceAdded][66] and
[bluetoothLowEnergy.onServiceRemoved][67] events:

```js
  var initializeService = function(service) {
    if (!service) {
      console.log('No service selected!');
      // Reset UI, etc.
      ...
      return;
    }

    myService = service;

    // Get all the characteristics and descriptors and bootstrap the app.
    ...
  };

  chrome.bluetoothLowEnergy.onServiceAdded.addListener(function(service) {
    if (service.uuid == MY_SERVICE_UUID)
      initializeService(service);
  });

  chrome.bluetoothLowEnergy.onServiceRemoved.addListener(function(service) {
    if (service.instanceId == myService.instanceId)
      initializeService(null);
  });
```

Chrome discovers all characteristics and descriptors of a service asynchronously and sends the
[bluetoothLowEnergy.onServiceAdded][68] event once discovery has completed. If the connection to a
peripheral terminates, Chrome removes all related services and sends the
[bluetoothLowEnergy.onServiceRemoved][69] event.

Some peripherals may modify their services, e.g. the characteristics of a service may change or
services may get added and removed entirely. Chrome notifies apps of these changes using the
[bluetoothLowEnergy.onServiceChanged][70], [bluetoothLowEnergy.onServiceAdded][71], and
[bluetoothLowEnergy.onServiceRemoved][72] events.

```js
  chrome.bluetoothLowEnergy.onServiceChanged.addListener(function(service) {
    if (service.instanceId != myService.instanceId)
      return;

    updateMyService(service);
  });
```

### Reading and writing a characteristic's value {: #gatt-read-write }

A GATT characteristic encodes one aspect of its service. A central app reads, acts on, and modifies
the state of a peripheral's service by operating on a characteristic's value. The characteristic
value is a sequence of bytes and its meaning is defined by the high-level specification that defines
a certain characteristic. For example, the value of the _Heart Rate Measurement_ characteristic
encodes the user's heart rate and the total amount of calories they burned, while the _Body Sensor
Location_ characteristic encodes where in the body the heart rate sensor should be worn.

Chrome provides the [bluetoothLowEnergy.readCharacteristicValue][73] method to read the value of a
characteristic:

```js
chrome.bluetoothLowEnergy.readCharacteristicValue(chrc.instanceId,
                                                  function(result) {
  if (chrome.runtime.lastError) {
    console.log('Failed to read value: ' + chrome.runtime.lastError.message);
    return;
  }

  var bytes = new Uint8Array(result.value);

  // Do stuff with the bytes.
  ...
});
```

Some characteristics are writable, especially those that behave as "Control Points", where writing
the value has side effects. For example, the _Heart Rate Control Point_ characteristic is used to
tell a heart rate sensor to reset its count of total calories burned and only supports writes. To
achieve this, Chrome provides the [bluetoothLowEnergy.writeCharacteristicValue][74] method:

```js
var myBytes = new Uint8Array([ ... ]);
chrome.bluetoothLowEnergy.writeCharacteristicValue(chrc.instanceId,
                                                   myBytes.buffer,
                                                   function() {
  if (chrome.runtime.lastError) {
    console.log('Failed to write value: ' +
                chrome.runtime.lastError.message);
    return;
  }

  // Value is written now.
});
```

Characteristic descriptors behave the same way and can be readable and/or writable. Chrome provides
the [bluetoothLowEnergy.readDescriptorValue][75] and [bluetoothLowEnergy.writeDescriptorValue][76]
methods to read and write the value of a descriptor.

To check if a characteristic supports reads or writes, an application can check the `properties`
field of a [bluetoothLowEnergy.Characteristic][77] object. While this field does not contain
information about the security requirements to access a value, it does describe which value
operation the characteristic supports in general.

### Handling value notifications {: #gatt-notifications }

Some characteristics make their value known using notifications or indications. For example the
_Heart Rate Measurement_ characteristic is neither readable nor writable but sends updates on its
current value at regular intervals. Applications can listen to these notifications using the
[bluetoothLowEnergy.onCharacteristicValueChanged][78] event.

```js
  chrome.bluetoothLowEnergy.onCharacteristicValueChanged.addListener(
      function(chrc) {
    if (chrc.instanceId != myCharId)
      return;

    var bytes = new Uint8Array(chrc.value);

    // Do stuff with the bytes.
    ...
  });
```

Even if a characteristic supports notifications/indications, they aren't enabled by default. An
application should call the [bluetoothLowEnergy.startCharacteristicNotifications][79] and
[bluetoothLowEnergy.stopCharacteristicNotifications][80] methods to start or stop receiving the
[bluetoothLowEnergy.onCharacteristicValueChanged][81] event.

```js
  // Start receiving characteristic value notifications.
  var notifying = false;
  chrome.bluetoothLowEnergy.startCharacteristicNotifications(chrc.instanceId,
                                                             function() {
    if (chrome.runtime.lastError) {
      console.log('Failed to enable notifications: ' +
                  chrome.runtime.lastError.message);
      return;
    }

    notifying = true;
  });

  ...

  // No longer interested in notifications from this characteristic.
  if (notifying) {
    chrome.bluetoothLowEnergy.stopCharacteristicNotifications(
        chrc.instanceId);
  }
```

Once notifications are started, the application will receive the
[bluetoothLowEnergy.onCharacteristicValueChanged][82] every time a notification or indication is
received from the characteristic. If the characteristic supports reads, then this event will also be
sent after a successful call to [bluetoothLowEnergy.readCharacteristicValue][83]. This allows apps
to unify the control flow of a value update triggered through a read request and notifications:

```js
  chrome.bluetoothLowEnergy.onCharacteristicValueChanged.addListener(
      function(chrc) {
    // Process the value.
    ...
  });

  chrome.bluetoothLowEnergy.startCharacteristicNotifications(chrc.instanceId,
                                                             function() {
    // Notifications started. Read the initial value.
    chrome.bluetoothLowEnergy.readCharacteristicValue(chrc.instanceId,
                                                      function(result) {
      ...
      // No need to do anything here since onCharacteristicValueChanged
      // will handle it.
    });
  });
```

If a characteristic supports notifications, its `properties` field will contain either the
`"notify"` or `"indicate"` property.

NOTE: If a characteristic supports notifications/indications, it will have the "Client
Characteristic Configuration" descriptor to enable/disable notifications. Chrome does not permit
apps to write to this descriptor. Apps should instead use the
[bluetoothLowEnergy.startCharacteristicNotifications][84] and
[bluetoothLowEnergy.stopCharacteristicNotifications][85] methods to control notification behavior.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: /docs/extensions/reference/bluetooth
[4]: /docs/extensions/reference/bluetoothSocket
[5]: /docs/extensions/reference/bluetoothLowEnergy
[6]: http://www.bluetooth.org
[7]: https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
[8]: /docs/apps/manifest/bluetooth/
[9]: /docs/extensions/reference/bluetooth/#method-getAdapterState
[10]: /docs/extensions/reference/bluetooth/#event-onAdapterStateChanged
[11]: /docs/extensions/reference/bluetooth/#method-getDevices
[12]: #discovery
[13]: /docs/extensions/reference/bluetooth/#method-getDevices
[14]: /docs/extensions/reference/bluetooth/#event-onDeviceAdded
[15]: /docs/extensions/reference/bluetooth/#event-onDeviceChanged
[16]: /docs/extensions/reference/bluetooth/#event-onDeviceRemoved
[17]: /docs/extensions/reference/bluetooth/#event-onDeviceAdded
[18]: #discovery
[19]: /docs/extensions/reference/bluetooth/#event-onDeviceChanged
[20]: /docs/extensions/reference/bluetooth/#event-onDeviceRemoved
[21]: /docs/extensions/reference/bluetooth/#method-startDiscovery
[22]: /docs/extensions/reference/bluetooth/#method-stopDiscovery
[23]: /docs/extensions/reference/bluetooth/#method-startDiscovery
[24]: /docs/extensions/reference/bluetooth/#type-AdapterState
[25]: /docs/extensions/reference/bluetooth/#event-onDeviceAdded
[26]: /docs/extensions/reference/bluetooth/#method-getDevices
[27]: /docs/extensions/reference/bluetooth/#event-onDeviceChanged
[28]: /docs/extensions/reference/bluetooth/#event-onAdapterStateChanged
[29]: /docs/extensions/reference/bluetooth/#method-startDiscovery
[30]: /docs/extensions/reference/bluetooth/#method-getDevices
[31]: https://developer.bluetooth.org/TechnologyOverview/Pages/DI.aspx
[32]: https://www.bluetooth.org/en-us/specification/assigned-numbers/baseband
[33]: /docs/extensions/reference/bluetoothSocket#method-create
[34]: /docs/extensions/reference/bluetooth/#method-getDevice
[35]: /docs/extensions/reference/bluetoothSocket#method-send
[36]: https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays
[37]: https://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
[38]: /docs/extensions/reference/bluetoothSocket#method-send
[39]: /docs/extensions/reference/bluetoothSocket#event-onReceive
[40]: /docs/extensions/reference/bluetoothSocket#method-setPaused
[41]: /docs/extensions/reference/bluetoothSocket#method-create
[42]: /docs/extensions/reference/bluetoothSocket#method-connect
[43]: /docs/extensions/reference/bluetoothSocket#event-onReceiveError
[44]: /docs/extensions/reference/bluetoothSocket#method-disconnect
[45]: /docs/extensions/reference/bluetoothSocket#type-ListenOptions
[46]: /docs/extensions/reference/bluetoothSocket#event-onAccept
[47]: /docs/extensions/reference/bluetoothSocket#event-onAccept
[48]: /docs/extensions/reference/bluetoothSocket#method-disconnect
[49]: /docs/extensions/reference/bluetoothLowEnergy
[50]: #discovery
[51]: /docs/extensions/reference/bluetooth/#type-Device
[52]: /docs/extensions/reference/bluetoothLowEnergy#method-connect
[53]: /docs/extensions/reference/bluetooth/#type-Device
[54]: /docs/extensions/reference/bluetoothLowEnergy#method-connect
[55]: /docs/extensions/reference/bluetoothLowEnergy#method-connect
[56]: /docs/extensions/reference/bluetoothLowEnergy#method-connect
[57]: /docs/extensions/reference/bluetoothLowEnergy#method-disconnect
[58]: /docs/extensions/reference/bluetooth/#event-onDeviceChanged
[59]: /docs/extensions/reference/bluetoothLowEnergy#type-Service
[60]: /docs/extensions/reference/bluetoothLowEnergy#type-Characteristic
[61]: /docs/extensions/reference/bluetoothLowEnergy#type-Descriptor
[62]: /docs/extensions/reference/bluetoothLowEnergy
[63]: /docs/extensions/reference/bluetoothLowEnergy#method-getServices
[64]: /docs/extensions/reference/bluetoothLowEnergy#method-getCharacteristics
[65]: /docs/extensions/reference/bluetoothLowEnergy#method-getDescriptors
[66]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceAdded
[67]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceRemoved
[68]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceAdded
[69]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceRemoved
[70]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceChanged
[71]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceAdded
[72]: /docs/extensions/reference/bluetoothLowEnergy#event-onServiceRemoved
[73]: /docs/extensions/reference/bluetoothLowEnergy#method-readCharacteristicValue
[74]: /docs/extensions/reference/bluetoothLowEnergy#method-writeCharacteristicValue
[75]: /docs/extensions/reference/bluetoothLowEnergy#method-readDescriptorValue
[76]: /docs/extensions/reference/bluetoothLowEnergy#method-writeDescriptorValue
[77]: /docs/extensions/reference/bluetoothLowEnergy#type-Characteristic
[78]: /docs/extensions/reference/bluetoothLowEnergy#event-onCharacteristicValueChanged
[79]: /docs/extensions/reference/bluetoothLowEnergy#method-startCharacteristicNotifications
[80]: /docs/extensions/reference/bluetoothLowEnergy#method-stopCharacteristicNotifications
[81]: /docs/extensions/reference/bluetoothLowEnergy#event-onCharacteristicValueChanged
[82]: /docs/extensions/reference/bluetoothLowEnergy#event-onCharacteristicValueChanged
[83]: /docs/extensions/reference/bluetoothLowEnergy#method-readCharacteristicValue
[84]: /docs/extensions/reference/bluetoothLowEnergy#method-startCharacteristicNotifications
[85]: /docs/extensions/reference/bluetoothLowEnergy#method-stopCharacteristicNotifications
