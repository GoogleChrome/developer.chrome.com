---
layout: "layouts/doc-post.njk"
title: "Native Messaging"
date: 2014-12-15
updated: 2018-05-14
description: How to exchange messages with native applications from your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Extensions and apps can exchange messages with native applications using an API that is similar to
the other [message passing APIs][3]. Native applications that support this feature must register a
_native messaging host_ that knows how to communicate with the extension. Chrome starts the host in
a separate process and communicates with it using standard input and standard output streams.

## Native messaging host {: #native-messaging-host }

In order to register a native messaging host the application must install a manifest file that
defines the native messaging host configuration. Below is an example of the manifest file:

```json
{
  "name": "com.my_company.my_application",
  "description": "My Application",
  "path": "C:\\Program Files\\My Application\\chrome_native_messaging_host.exe",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://knldjmfmopnpolahpmmgbagdohdnhkik/"
  ]
}
```

The native messaging host manifest file must be valid JSON and contains the following fields:

<table class="simple" id="native-messaging-host-manifest"><tbody><tr><th>Name</th><th>Description</th></tr><tr><td><code>name</code></td><td>Name of the native messaging host. Clients pass this string to <a href="/apps/runtime#method-connectNative">runtime.connectNative</a> or <a href="/apps/runtime#method-sendNativeMessage">runtime.sendNativeMessage</a>. This name can only contain lowercase alphanumeric characters, underscores and dots. The name cannot start or end with a dot, and a dot cannot be followed by another dot.</td></tr><tr><td><code>description</code></td><td>Short application description.</td></tr><tr><td><code>path</code></td><td>Path to the native messaging host binary. On Linux and OSX the path must be absolute. On Windows it can be relative to the directory in which the manifest file is located. The host process is started with the current directory set to the directory that contains the host binary. For example if this parameter is set to <code>C:\Application\nm_host.exe</code> then it will be started with current directory <code>C:\Application\</code>.</td></tr><tr><td><code>type</code></td><td>Type of the interface used to communicate with the native messaging host. Currently there is only one possible value for this parameter: <code>stdio</code>. It indicates that Chrome should use <code>stdin</code> and <code>stdout</code> to communicate with the host.</td></tr><tr><td><code>allowed_origins</code></td><td>List of extensions that should have access to the native messaging host. Wildcards such as <code>chrome-extension://*/*</code> are <em>not</em> allowed.</td></tr></tbody></table>

### Native messaging host location {: #native-messaging-host-location }

The location of the manifest file depends on the platform.

On **Windows**, the manifest file can be located anywhere in the file system. The application
installer must create registry key
`HKEY_LOCAL_MACHINE\SOFTWARE\Google\Chrome\NativeMessagingHosts\_com.my_company.my_application_` or
`HKEY_CURRENT_USER\SOFTWARE\Google\Chrome\NativeMessagingHosts\_com.my_company.my_application_`, and
set default value of that key to the full path to the manifest file. For example, using the
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

On **OS X** and **Linux**, the location of the native messaging host's manifest file varies by the
browser (Google Chrome or Chromium). The system-wide native messaging hosts are looked up at a fixed
location, while the user-level native messaging hosts are looked up in a subdirectory within the
[user profile directory][6] called `NativeMessagingHosts`.

* OS X (system-wide)
  * Google Chrome: `/Library/Google/Chrome/NativeMessagingHosts/_com.my_company.my_application_.json`
  * Chromium: `/Library/Application Support/Chromium/NativeMessagingHosts/_com.my_company.my_application_.json`
* OS X (user-specific, _default_ path)
  * Google Chrome: `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/_com.my_company.my_application_.json`
  * Chromium: `~/Library/Application Support/Chromium/NativeMessagingHosts/_com.my_company.my_application_.json`
* Linux (system-wide)
  * Google Chrome: `/etc/opt/chrome/native-messaging-hosts/_com.my_company.my_application_.json`
  * Chromium: `/etc/chromium/native-messaging-hosts/_com.my_company.my_application_.json`
* Linux (user-specific, _default_ path)
  * Google Chrome: `~/.config/google-chrome/NativeMessagingHosts/_com.my_company.my_application_.json`
  * Chromium: `~/.config/chromium/NativeMessagingHosts/_com.my_company.my_application_.json`

### Native messaging protocol {: #native-messaging-host-protocol }

Chrome starts each native messaging host in a separate process and communicates with it using
standard input (`stdin`) and standard output (`stdout`). The same format is used to send messages in
both directions: each message is serialized using JSON, UTF-8 encoded and is preceded with 32-bit
message length in native byte order. The maximum size of a single message from the native messaging
host is 1 MB, mainly to protect Chrome from misbehaving native applications. The maximum size of the
message sent to the native messaging host is 4 GB.

The first argument to the native messaging host is the origin of the caller, usually
`chrome-extension://[ID of allowed extension]`. This allows native messaging hosts to identify the
source of the message when multiple extensions are specified in the `allowed_origins` key in the
[native messaging host manifest][7].
**_Warning_**: In Windows, in Chrome 54 and earlier, the origin was passed as the second parameter
instead of the first parameter.

When a messaging port is created using [runtime.connectNative][8] Chrome starts native messaging
host process and keeps it running until the port is destroyed. On the other hand, when a message is
sent using [runtime.sendNativeMessage][9], without creating a messaging port, Chrome starts a new
native messaging host process for each message. In that case the first message generated by the host
process is handled as a response to the original request, i.e. Chrome will pass it to the response
callback specified when [runtime.sendNativeMessage][10] is called. All other messages generated by
the native messaging host in that case are ignored.

On Windows, the native messaging host is also passed a command line argument with a handle to the
calling chrome native window: `--parent-window=<decimal handle value>`. This lets the native
messaging host create native UI windows that are correctly focused.

## Connecting to a native application {: #native-messaging-client }

Sending and receiving messages to and from a native application is very similar to cross-extension
messaging. The main difference is that [runtime.connectNative][11] is used instead of
[runtime.connect][12], and [runtime.sendNativeMessage][13] is used instead of
[runtime.sendMessage][14].
These methods can only be used if the "nativeMessaging" permission is [declared][15] in your app's
manifest file.

The Following example creates a [runtime.Port][16] object that's connected to native messaging host
`com.my_company.my_application`, starts listening for messages from that port and sends one outgoing
message:

```js
var port = chrome.runtime.connectNative('com.my_company.my_application');
port.onMessage.addListener(function(msg) {
  console.log("Received" + msg);
});
port.onDisconnect.addListener(function() {
  console.log("Disconnected");
});
port.postMessage({ text: "Hello, my_application" });
```

[runtime.sendNativeMessage][17] can be used to send a message to native application without creating
a port, e.g.:

```js
chrome.runtime.sendNativeMessage('com.my_company.my_application',
  { text: "Hello" },
  function(response) {
    console.log("Received " + response);
  });
```

## Debugging native messaging {: #native-messaging-debugging }

When the native messaging host fails to start, writes to `stderr` or when it violates the
communication protocol, output is written to the error log of Chrome. On Linux and OS X, this log
can easily be accessed by starting Chrome from the command line and watching its output in the
terminal. On Windows, use `--enable-logging` as explained at [How to enable logging][18].

Here are some errors and tips for solving the issues:

* Failed to start native messaging host.
  * Check whether you have sufficient permissions to execute the file.
* Invalid native messaging host name specified.
  * Check whether the name contains any invalid characters. Only lowercase alphanumeric characters,
    underscores and dots are allowed. A name cannot start or end with a dot, and a dot cannot be
    followed by another dot.
* Native host has exited.
  * The pipe to the native messaging host was broken before the message was read by Chrome. This is most
    likely initiated from your native messaging host.
* Specified native messaging host not found.
  - Is the name spelled correctly in the extension and in the manifest file?
  - Is the manifest put in the right directory and with the correct name? See [native messaging host
    location][19] for the expected formats.
  - Is the manifest file in the correct format? In particular, is the JSON syntax correct and do the
    values match the definition of a [native messaging host manifest][20]?
  - Does the file specified in `path` exist? On Windows, paths may be relative, but on OS X and Linux,
    the paths must be absolute.
* Native messaging host _host name_ is not registered. (Windows-only)
  * The native messaging host was not found in the Windows registry. Double-check using `regedit`
    whether the key was really created and matches the required format as documented at [native
    messaging host location][21].
* Access to the specified native messaging host is forbidden.
  * Is the extension's origin listed in `allowed_origins`?
* Error when communicating with the native messaging host.
  * This is a very common error and indicates an incorrect implementation of the communication protocol
    in the native messaging host.
    - Make sure that all output in `stdout` adheres to the [native messaging protocol][22]. If you want
      to print some data for debugging purposes, write to `stderr`.
    - Make sure that the 32-bit message length is in the platform's native integer format (little-endian
      / big-endian).
    - The message length must not exceed 1024\*1024.
    - The message size must be equal to the number of bytes in the message. This may differ from the
      "length" of a string, because characters may be represented by multiple bytes.
    - **Windows-only: Make sure that the program's I/O mode is set to `O_BINARY`**. By default, the I/O
      mode is `O_TEXT`, which corrupts the message format as line breaks (`\n` = `0A`) are replaced with
      Windows-style line endings (`\r\n` = `0D 0A`). The I/O mode can be set using [`__setmode`][23].

## Examples {: #examples }

The [examples/api/nativeMessaging][24] directory contains an example application that uses native
messaging to communicate with a Python script that serves as a native messaging host. The sample
host's directory also contains scripts to install/remove the native messaging host.

To try out the example, first download and extract the [sample app][25] and [sample host][26]. Run
`install_host.bat` (Windows) or `install_host.sh` (Linux / OS X) to install the native messaging
host. Then [load the app][27] and interact with the app. Run `uninstall_host.bat` or
`uninstall_host.sh` to unregister the native messaging host when you are done.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: messaging
[4]: /apps/runtime#method-connectNative
[5]: /apps/runtime#method-sendNativeMessage
[6]: https://www.chromium.org/user-experience/user-data-directory
[7]: #native-messaging-host-manifest
[8]: /apps/runtime#method-connectNative
[9]: /apps/runtime#method-sendNativeMessage
[10]: /apps/runtime#method-sendNativeMessage
[11]: /apps/runtime#method-connectNative
[12]: /apps/runtime#method-connect
[13]: /apps/runtime#method-sendNativeMessage
[14]: /apps/runtime#method-sendMessage
[15]: declare_permissions
[16]: /apps/runtime#type-Port
[17]: /apps/runtime#method-sendNativeMessage
[18]: https://www.chromium.org/for-testers/enable-logging
[19]: #native-messaging-host-location
[20]: #native-messaging-host-manifest
[21]: #native-messaging-host-location
[22]: #native-messaging-host-protocol
[23]: https://msdn.microsoft.com/en-us/library/tw4k6df8.aspx
[24]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/nativeMessaging
[25]: /extensions/examples/api/nativeMessaging/app.zip
[26]: /extensions/examples/api/nativeMessaging/host.zip
[27]: getstarted#unpacked
