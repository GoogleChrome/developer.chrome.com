---
layout: "layouts/doc-post.njk"
title: "Serial Devices"
date: 2013-10-31
updated: 2014-09-10
description: How to communicate with serial devices from your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

This document describes how to use the [serial API][3] to read and write from serial devices. Chrome
Apps can also connect to [USB][4] and [Bluetooth][5] devices.

{% Aside %}

**Samples:** For examples that illustrate how Chrome Apps can connect to hardware devices through a
serial port, see the [adkjs][6], [ledtoggle][7] and the [servo][8] samples.

{% endAside %}

## Manifest requirement {: #requirement }

You must add the "serial" permission to the manifest file:

```json
"permissions": [
  "serial"
]
```

## Listing available serial ports {: #listing }

To get a list of paths associated with available serial ports, use the [`serial.getDevices`][9]
method. **Note:** not all serial ports are available. The API uses heuristics to only expose serial
devices that are expected to be safe.

```js
var onGetDevices = function(ports) {
  for (var i=0; i<ports.length; i++) {
    console.log(ports[i].path);
  }
}
chrome.serial.getDevices(onGetDevices);
```

## Connecting to a serial device {: #opening }

If you know the path associated with the serial port, you can connect to it using the
[`serial.connect`][10] method:

```js
chrome.serial.connect(path, options, callback)
```

<table border="0"><tbody><tr><th scope="col">Parameter</th><th scope="col">Description</th></tr><tr><td>path&nbsp;(string)</td><td>If the path associated with your device's port is unknown, you can use the <a href="/apps/serial#method-getDevices"><code>serial.getDevices</code></a> method.</td></tr><tr><td>options&nbsp;(object)</td><td>Parameter object with several configuration values. See details at <a href="/apps/serial#type-ConnectionOptions">serial.ConnectionOptions</a></td></tr><tr><td>callback</td><td>Invoked when the port has been successfully opened. The callback will be called with one parameter, <code>connectionInfo</code>, that has several important values. See details at <a href="/apps/serial#type-ConnectionInfo">serial.ConnectionInfo</a>.</td></tr></tbody></table>

A simple example:

```js
var onConnect = function(connectionInfo) {
   // The serial port has been opened. Save its id to use later.
  _this.connectionId = connectionInfo.connectionId;
  // Do whatever you need to do with the opened port.
}
// Connect to the serial port /dev/ttyS01
chrome.serial.connect("/dev/ttyS01", {bitrate: 115200}, onConnect);
```

## Disconnect from a serial port {: #disconnect }

When an app terminates, connections to serial ports that are not persistent are automatically closed
by the platform. However, if you want to disconnect while your app is still running, you can use the
[serial.disconnect][14] method:

```js
var onDisconnect = function(result) {
  if (result) {
    console.log("Disconnected from the serial port");
  } else {
    console.log("Disconnect failed");
  }
}
chrome.serial.disconnect(connectionId, onDisconnect);
```

## Reading from a serial port {: #reading }

The serial API reads from the serial port and delivers the read bytes as an ArrayBuffer to event
listeners. Every port that your application is connected to will generate read events to all
listeners added through `chrome.serial.onReceive.addListener(onReceiveCallback)`. If you are
connected to more than one port at the same time, you may find the corresponding `connectionId` of
an incoming read event in the callback parameter of [serial.onReceive][15].

The following example can accumulate read bytes until a new line is read, converting the received
ArrayBuffer to String and calling a method when a newline is found as the last character received:

```js
var stringReceived = '';

var onReceiveCallback = function(info) {
    if (info.connectionId == expectedConnectionId && info.data) {
      var str = convertArrayBufferToString(info.data);
      if (str.charAt(str.length-1) === '\n') {
        stringReceived += str.substring(0, str.length-1);
        onLineReceived(stringReceived);
        stringReceived = '';
      } else {
        stringReceived += str;
      }
    }
  };

chrome.serial.onReceive.addListener(onReceiveCallback);

// [...] not shown here: connect to the serial port
```

## Sending data to a serial port {: #writing }

Sending data is simpler than reading. The only catch is that if your data protocol is String based,
you have to convert your output string to an `ArrayBuffer`. See the code example below:

```js
var writeSerial=function(str) {
  chrome.serial.send(connectionId, convertStringToArrayBuffer(str), onSend);
}
// Convert string to ArrayBuffer
var convertStringToArrayBuffer=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}
```

## Flushing a serial port buffer {: #flushing }

You can flush your serial port buffer by issuing the flush command:

```js
  chrome.serial.flush(connectionId, onFlush);
```

## More {: #More }

The Serial API has several other features. You can, for example, set a connection to persistent, so
it can receive data even when your app is not running, or you can update connection parameters on
the fly, like bitrate, timeouts, control signals, and many others with the [serial.update][16]
method. See the full reference of the [serial][17] API for more information.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: serial
[4]: app_usb
[5]: app_bluetooth
[6]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/serial/adkjs#readme
[7]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/serial/ledtoggle#readme
[8]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/servo#readme
[9]: /apps/serial#method-getDevices
[10]: /apps/serial#method-connect
[11]: /apps/serial#method-getDevices
[12]: /apps/serial#type-ConnectionOptions
[13]: /apps/serial#type-ConnectionInfo
[14]: /apps/serial#method-disconnect
[15]: /apps/serial#event-onReceive
[16]: /apps/serial#method-update
[17]: /apps/serial
