---
api: runtime
---

## Overview {: # overview }

The Runtime API provides methods to support a number of areas of functionality that your extensions
can use:

Message passing

: Your extension can communicate with different contexts within your extension and also with other extensions using these methods and events: 
[connect()][method-connect],
[onConnect][method-onconnect], 
[onConnectExternal][method-onconnectexternal],
[sendMessage()][method-sendmessage], 
[onMessage][method-onmessage] and
[onMessageExternal][method-onmessageexternal]. 
In addition, your extension can pass messages to native applications on the user's device using 
[connectNative()][method-connectnative] and
[sendNativeMessage()][method-sendnativemessage]. 

{% Aside %}

See [Message Passing][doc-messages] for an overview of the subject. 

{% endAside %}

Accessing extension and platform metadata

: These methods let you retrieve several specific pieces of metadata about the extension and the
  platform. Methods in this category include
  [getManifest()][method-getmanifest], and
  [getPlatformInfo()][method-getplatforminfo].

Managing extension lifecycle and options

: These properties let you perform some meta-operations on the extension, and display the options page. 
Methods and events in this category include
  [onInstalled][method-oninstalled],
  [onStartup][method-onstartup],
  [openOptionsPage()][method-openoptionspage],
  [reload()][method-reload],
  [requestUpdateCheck()][method-requestupdatecheck], and
  [setUninstallURL()][method-setuninstallurl].

Helper utilities

: These methods provide utility such as the conversion of internal resource representations to
  external formats. Methods in this category include
  [getURL()][method-geturl].

Kiosk mode utilities

: These methods are available only on ChromeOS, and exist mainly to support kiosk implementations.
  Methods in this category include
  [restart][method-restart] and
  [restartAfterDelay][method-restartafterdelay].

## Permissions {: #perms }

Most methods on the Runtime API do **not** require any permission, except for
[sendNativeMessage][method-sendnativemessage] and [connectNative][method-connectnative], which
require the `nativeMessaging` permission.

## Manifest {: #manifest }

The following example shows how to declare the `nativeMessaging` permission in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "nativeMessaging"
  ],
  ...
}
```

## Use cases {: #examples}

### Add an image to a web page {: #example-get-url }

For a web page to access an asset hosted on another domain, it must specify the resource's full URL
(e.g. `<img src="https://example.com/logo.png">`). The same is true to include an extension asset on
a web page. The two differences are that the extension's assets must be exposed as [web
accessible resources][doc-war] and that typically content scripts are responsible for injecting
extension assets.

In this example, the extension will add `logo.png` to the page that the [content
script][doc-content] is being [injected][content-inject] into by using `runtime.getURL()` to create a
fully-qualified URL. But first, the asset must be declared as a web accessible resource in the manifest.

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "web_accessible_resources": [
    {
      "resources": [ "logo.png" ],
      "matches": [ "https://*/*" ]
    }
  ],
  ...
}
```

{% Label %}content.js:{% endLabel %}

```js
{ // Block used to avoid setting global variables
  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('logo.png');
  document.body.append(img);
}
```

### Send data from the service worker to a content script {: #example-content-msg }

Its common for an extension's content scripts to need data managed by another part of the extension,
like the service worker. Much like two browser windows opened to the same web page, these
two contexts cannot directly access each other's values. Instead, the extension can use [message
passing][doc-messages] to coordinate across these different contexts.

In this example, the content script needs some data from the extension's service worker to
initialize its UI. To get this data, it passes a `get-user-data` message to the service worker, and
it responds with a copy of the user's information.

{% Label %}content.js:{% endLabel %}

```js
// 1. Send a message to the service worker requesting the user's data
chrome.runtime.sendMessage('get-user-data', (response) => {
  // 3. Got an asynchronous response with the data from the service worker
  console.log('received user data', response);
  initializeUI(response);
});
```

{% Label %}background.js:{% endLabel %}

```js
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

### Gather feedback on uninstall {: #example-uninstall-url }

Many extensions use post-uninstall surveys to understand how the extension could better serve its
users and improve retention. The following example shows how to add this functionality.

{% Label %}background.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL('https://example.com/extension-survey');
  }
});
```

## Extension examples {: #more-samples }

See the [Manifest V3 - Web Accessible Resources demo][github-war-sample] for more Runtime API examples.


[content-inject]: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality
[doc-content]: /docs/extensions/mv3/content_scripts/
[doc-external-messaging]: /docs/extensions/mv3/messaging/#external
[doc-messages]: /docs/extensions/mv3/messaging/
[doc-native-messaging]: /docs/apps/nativeMessaging/
[doc-native-messaging]: /docs/extensions/mv3/messaging/#native-messaging
[doc-war]: /docs/extensions/mv3/manifest/web_accessible_resources/
[github-war-sample]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/web-accessible-resources
[method-connect]: #method-connect
[method-connectnative]: #method-connectNative
[method-getmanifest]: #method-getManifest
[method-getplatforminfo]: #method-getPlatformInfo
[method-geturl]: #method-getURL
[method-onconnect]: #event-onConnect
[method-onconnectexternal]: #event-onConnectExternal
[method-onmessage]: #event-onMessage
[method-onmessageexternal]: #event-onMessageExternal
[method-oninstalled]: #event-onInstalled
[method-onstartup]: #event-onStartup
[method-openoptionspage]: #method-openOptionsPage
[method-reload]: #method-reload
[method-requestupdatecheck]: #method-requestUpdateCheck
[method-restart]: #method-restart
[method-restartafterdelay]: #method-restartAfterDelay
[method-sendmessage]: #method-sendMessage
[method-sendnativemessage]: #method-sendNativeMessage
[method-setuninstallurl]: #method-setUninstallURL
