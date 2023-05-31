---
layout: "layouts/doc-post.njk"
title: "Native messaging"
seoTitle: "Chrome Extensions: Native messaging"
date: 2023-02-27
updated: 2023-02-27
description: Exchange messages with native applications from your Chrome Extension.
---

Extensions can exchange messages with native applications using an API that is similar to
the other [message passing APIs][messaging]. Native applications that support this feature must register a
_native messaging host_ that can communicate with the extension. Chrome starts the host in
a separate process and communicates with it using standard input and standard output streams.

## Native messaging host {: #native-messaging-host }

In order to register a native messaging host the application must save a file that
defines the native messaging host configuration.

An example of the file is as follows:

```json
{
  "name": "com.my_company.my_application",
  "description": "My Application",
  "path": "C:\\Program Files\\My Application\\chrome_native_messaging_host.exe",
  "type": "stdio",
  "allowed_origins": ["chrome-extension://knldjmfmopnpolahpmmgbagdohdnhkik/"]
}
```

The native messaging host manifest file must be valid JSON and contain the following fields:

|Name|Description|
|----|-----------|
|`name`|Name of the native messaging host. Clients pass this string to [`runtime.connectNative()`][connect-native] or [`runtime.sendNativeMessage()`][send-native-message]. This name can only contain lowercase alphanumeric characters, underscores and dots. The name cannot start or end with a dot, and a dot cannot be followed by another dot.|
|`description`|Short application description.|
|`path`|Path to the native messaging host binary. On Linux and macOS the path must be absolute. On Windows it can be relative to the directory in which the manifest file is located. The host process is started with the current directory set to the directory that contains the host binary. For example if this parameter is set to `C:\Application\nm_host.exe` then it will be started with current directory `C:\Application\`.|
|`type`|Type of the interface used to communicate with the native messaging host. Currently there is only one possible value for this parameter: `stdio`. It indicates that Chrome should use `stdin` and `stdout` to communicate with the host.|
|`allowed_origins`|List of extensions that should have access to the native messaging host. Wildcards such as `chrome-extension://*/*` are _not_ allowed.|

### Native messaging host location {: #native-messaging-host-location }

The location of the manifest file depends on the platform.

On **Windows**, the manifest file can be located anywhere in the file system. The application
installer must create a registry key, either
`HKEY_LOCAL_MACHINE\SOFTWARE\Google\Chrome\NativeMessagingHosts\com.my_company.my_application` or
`HKEY_CURRENT_USER\SOFTWARE\Google\Chrome\NativeMessagingHosts\com.my_company.my_application`, and
set the default value of that key to the full path to the manifest file. For example, using the
following command:

```text
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.my_company.my_application" /ve /t REG_SZ /d "C:\path\to\nmh-manifest.json" /f
```

or using the following `.reg` file:

```text
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\com.my_company.my_application]
@="C:\\path\\to\\nmh-manifest.json"
```

When Chrome looks for native messaging hosts, first the 32-bit registry is queried, then the 64-bit
registry.

On **macOS** and **Linux**, the location of the native messaging host's manifest file varies by the
browser (Google Chrome or Chromium). The system-wide native messaging hosts are looked up at a fixed
location, while the user-level native messaging hosts are looked up in the `NativeMessagingHosts/` subdirectory
of the [user profile directory][user-data-directory].

- macOS (system-wide)
  - Google Chrome: `/Library/Google/Chrome/NativeMessagingHosts/com.my_company.my_application.json`
  - Chromium: `/Library/Application Support/Chromium/NativeMessagingHosts/com.my_company.my_application.json`
- macOS (user-specific, _default_ path)
  - Google Chrome: `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/com.my_company.my_application.json`
  - Chromium: `~/Library/Application Support/Chromium/NativeMessagingHosts/com.my_company.my_application.json`
- Linux (system-wide)
  - Google Chrome: `/etc/opt/chrome/native-messaging-hosts/com.my_company.my_application.json`
  - Chromium: `/etc/chromium/native-messaging-hosts/com.my_company.my_application.json`
- Linux (user-specific, _default_ path)
  - Google Chrome: `~/.config/google-chrome/NativeMessagingHosts/com.my_company.my_application.json`
  - Chromium: `~/.config/chromium/NativeMessagingHosts/com.my_company.my_application.json`

### Native messaging protocol {: #native-messaging-host-protocol }

Chrome starts each native messaging host in a separate process and communicates with it using
standard input (`stdin`) and standard output (`stdout`). The same format is used to send messages in
both directions; each message is serialized using JSON, UTF-8 encoded and is preceded with 32-bit
message length in native byte order. The maximum size of a single message from the native messaging
host is 1 MB, mainly to protect Chrome from misbehaving native applications. The maximum size of the
message sent to the native messaging host is 4 GB.

The first argument to the native messaging host is the origin of the caller, usually
`chrome-extension://[ID of allowed extension]`. This allows native messaging hosts to identify the
source of the message when multiple extensions are specified in the `allowed_origins` key in the
[native messaging host manifest][native-messaging-host-manifest].

On Windows, the native messaging host is also passed a command line argument with a handle to the
calling Chrome native window: `--parent-window=<decimal handle value>`. This lets the native
messaging host create native UI windows that are correctly parented. Note that this value will be
0 if the calling context is a service worker.

When a messaging port is created using [`runtime.connectNative`][connect-native] Chrome starts native messaging
host process and keeps it running until the port is destroyed. On the other hand, when a message is
sent using [`runtime.sendNativeMessage`][send-native-message], without creating a messaging port, Chrome starts a new
native messaging host process for each message. In that case the first message generated by the host
process is handled as a response to the original request, and Chrome will pass it to the response
callback specified when [`runtime.sendNativeMessage`][send-native-message] is called. All other messages generated by
the native messaging host in that case are ignored.

## Connecting to a native application {: #native-messaging-client }

Sending and receiving messages to and from a native application is very similar to cross-extension
messaging. The main difference is that [`runtime.connectNative`][connect-native] is used instead of
[`runtime.connect`][connect], and [`runtime.sendNativeMessage`][send-native-message] is used instead of
[`runtime.sendMessage`][send-message].

To use these methods, the "nativeMessaging" permission must be [declared][declare-permissions] in your
extensions's manifest file.

These methods are not available inside content scripts, only inside your extension's pages and service worker. If you
wish to communicate from a content script to the native application, send the message to your service worker to pass it along to the native application.

The following example creates a [`runtime.Port`][port] object that's connected to native messaging host
`com.my_company.my_application`, starts listening for messages from that port and sends one outgoing
message:

```js
var port = chrome.runtime.connectNative('com.my_company.my_application');
port.onMessage.addListener(function (msg) {
  console.log('Received' + msg);
});
port.onDisconnect.addListener(function () {
  console.log('Disconnected');
});
port.postMessage({text: 'Hello, my_application'});
```

Use [`runtime.sendNativeMessage`][send-native-message] to send a message to the native application without
creating a port, e.g.:

```js
chrome.runtime.sendNativeMessage(
  'com.my_company.my_application',
  {text: 'Hello'},
  function (response) {
    console.log('Received ' + response);
  }
);
```

## Debugging native messaging {: #native-messaging-debugging }

When certain native messaging failures occur, output is written to the error log of Chrome. This includes
when the native messaging host fails to start, writes to `stderr` or violates the communication protocol. On
Linux and macOS, this log can easily be accessed by starting Chrome from the command line and watching its
output in the terminal. On Windows, use `--enable-logging` as explained at [How to enable logging][enable-logging].

Here are some common errors and tips for solving them:

**Failed to start native messaging host.**

Check whether you have sufficient permissions to execute the native messaging host file.

**Invalid native messaging host name specified.**

Check whether the name contains invalid characters. Only lowercase alphanumeric characters,
underscores, and dots are allowed. A name cannot start or end with a dot, and a dot cannot be
followed by another dot.

**Native host has exited.**

The pipe to the native messaging host was broken before the message was read by Chrome. This is most
likely initiated from your native messaging host.

**Specified native messaging host not found.**

Check the following:

- Is the name spelled correctly in the extension and in the manifest file?
- Is the manifest in the right directory and with the correct name? See [native messaging host
  location][native-messaging-host-location] for the expected formats.
- Is the manifest file in the correct format? In particular, is the JSON valid and well-formed and do the
  values match the definition of a [native messaging host manifest][native-messaging-host-manifest]?
- Does the file specified in `path` exist? On Windows, paths may be relative, but on macOS and Linux,
  the paths must be absolute.

**Native messaging host _host name_ is not registered. (Windows-only)**

The native messaging host was not found in the Windows registry. Double-check using `regedit`
whether the key was really created and matches the required format as documented at [native
messaging host location][native-messaging-host-location].

**Access to the specified native messaging host is forbidden.**

Is the extension's origin listed in `allowed_origins`?

**Error when communicating with the native messaging host.**

This indicates an incorrect implementation of the communication protocol in the native messaging host.

- Make sure that all output in `stdout` adheres to the [native messaging protocol][native-messaging-host-protocol]. If you want
  to print some data for debugging purposes, write to `stderr`.
- Make sure that the 32-bit message length is in the platform's native integer format (little-endian
  / big-endian).
- The message length must not exceed 1024\*1024.
- The message size must be equal to the number of bytes in the message. This may differ from the
  "length" of a string, because characters may be represented by multiple bytes.
- **Windows-only:** Make sure that the program's I/O mode is set to `O_BINARY`. By default, the I/O
  mode is `O_TEXT`, which corrupts the message format as line breaks (`\n` = `0A`) are replaced with
  Windows-style line endings (`\r\n` = `0D 0A`). The I/O mode can be set using [`__setmode`][set-mode].

[messaging]: /docs/extensions/mv3/messaging/
[user-data-directory]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md
[native-messaging-host-manifest]: #native-messaging-host
[connect-native]: /docs/extensions/reference/runtime/#method-connectNative
[send-native-message]: /docs/extensions/reference/runtime/#method-sendNativeMessage
[connect]: /docs/extensions/reference/runtime/#method-connect
[send-message]: /docs/extensions/reference/runtime/#method-sendMessage
[declare-permissions]: /docs/extensions/mv3/declare_permissions/#nativeMessaging
[port]: /docs/extensions/reference/runtime/#type-Port
[enable-logging]: https://www.chromium.org/for-testers/enable-logging
[native-messaging-host-location]: #native-messaging-host-location
[native-messaging-host-protocol]: #native-messaging-host-protocol
[set-mode]: https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode
