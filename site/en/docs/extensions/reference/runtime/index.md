---
api: runtime
---
The runtime API provides methods to support a number of areas of functionality that your extensions
can use:

Message passing

: These methods support message passing so that you can communicate with different parts of your extension (such as an extension popup and background scripts), other extensions, or native applications on the user's device. See [Message
  Passing][message-passing] for an overview of the subject. Methods in this category include
  [connect](/docs/extensions/reference/runtime/#method-connect),
  [connectNative](/docs/extensions/reference/runtime/#method-connectNative),
  [sendMessage](/docs/extensions/reference/runtime/#method-sendMessage), and
  [sendNativeMessage](/docs/extensions/reference/runtime/#method-sendNativeMessage).

Accessing extension and platform metadata

: These methods let you retrieve several specific pieces of metadata about the extension and the
  platform. Methods in this category include
  [getBackgroundPage](/docs/extensions/reference/runtime/#method-getBackgroundPage),
  [getManifest](/docs/extensions/reference/runtime/#method-getManifest),
  [getPackageDirectoryEntry](/docs/extensions/reference/runtime/#method-getPackageDirectoryEntry), and
  [getPlatformInfo](/docs/extensions/reference/runtime/#method-getPlatformInfo).

Managing extension lifecycle and options

: These methods let you perform some meta-operations on the extension, and display the options page
  to the extension user. Methods in this category include
  [reload](/docs/extensions/reference/runtime/#method-reload),
  [requestUpdateCheck](/docs/extensions/reference/runtime/#method-requestUpdateCheck),
  [setUninstallURL](/docs/extensions/reference/runtime/#method-setUninstallURL), and
  [openOptionsPage](/docs/extensions/reference/runtime/#method-openOptionsPage).

Device restart support

: These methods are available only on Chrome OS, and exist mainly to support kiosk implementations.
  Methods in this category include
  [restart](/docs/extensions/reference/runtime/#method-restart) and
  [restartAfterDelay](/docs/extensions/reference/runtime/#method-restartAfterDelay).

Helper utilities

: These methods provide utility such as the conversion of internal resource representations to
  external formats. Methods in this category include
  [getURL](/docs/extensions/reference/runtime/#method-getURL).


## Manifest

Most methods on the runtime API do not require any permission to use. However,
[sendNativeMessage](/docs/extensions/reference/runtime/#method-sendNativeMessage) and
[connectNative](/docs/extensions/reference/runtime/#method-connectNative) require the
`nativeMessaging` permission to be declared in your manifest.



## Examples

### Use [`getURL`][get-url] to add an extension image to a page {: #example-get-url }

In order for a web page to access an asset hosted on another domain, it must specify the resource's
full URL (e.g. `<img src="https://example.com/logo.png">`). The same is true for when a web page
wants to include assets included in an extension. The two main differences here are that the
extension's assets must be exposed as [web accessible resources][war] and that typically content
scripts are responsible for injecting extension assets.

This example shows how a [content script][content] can add an image in the extension's package to
the page that the content script has been [injected][content-inject] into.

```js
//// content.js ////

{ // Block used to avoid setting global variables
  let const = document.createElement('img');
  img.src = chrome.runtime.getURL('logo.png');
  document.body.append(img);
}
```

### Getting background data into a content script {: #example-content-msg }

Its common for an extension's content scripts to need data managed by another part of the extension,
like the extension's background script. Much like two browser windows opened to the same web page,
these two contexts cannot directly access each other's values. Instead, the extension can use
[message passing][message-passing] to coordinate across these different contexts.

In this example, the content script needs some data from the extension's background script in order
to initialize its UI. To get this data, it passes a `get-user-data` message to the background, and
the background responds with a copy of the user's information.

```js
//// content.js ////

// 1. Send the background a message requesting the user's data
chrome.runtime.sendMessage('get-user-data', (response) => {
  // 3. Got an asynchronous response with the data from the background
  console.log('received user data', response);
  initializeUI(response);
});
```

```js
//// background.js ////

// Example of a simple user data object
const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-user-data') {
    sendResponse(user);
  }
});
```

### Gathering feedback on uninstall {: #example-uninstall-url }

Many extensions use post-uninstall surveys to understand how the extension could better serve its
users and improve retention. The below example shows how one can add this functionality to their
extension.


```js
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL('https://example.com/extension-survey');
  }
});
```


[content-inject]: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality
[content]: /docs/extensions/mv3/content_scripts/
[get-url]: #method-getURL
[handshake]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment
[key-prop]: /docs/extensions/mv3/manifest/key/
[message-passing]: /docs/extensions/mv3/messaging/
[oauth]: https://developer.chrome.com/docs/extensions/mv3/tut_oauth/
[war]: /docs/extensions/mv3/manifest/web_accessible_resources/
