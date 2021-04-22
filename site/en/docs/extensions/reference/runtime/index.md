---
api: runtime
---
The runtime API provides methods to support a number of areas:

<dl>
<dt>Message passing</dt>
<dd><ul>
<li>connect runtime.connect(extensionId: string, connectInfo: object): Port</li>
<li>connectNative runtime.connectNative(application: string): Port</li>
<li>sendMessage runtime.sendMessage(extensionId?: string, message: any, options: object, 
responseCallback: function)</li>
<li>sendNativeMessage runtime.sendNativeMessage(application: string, message: object, 
responseCallback: function)</li>
</ul></dd>

<dt>Accessing extension and platform metadata</dt>
<dd><ul>
<li>getBackgroundPage runtime.getBackgroundPage(callback: function)</li>
<li>getManifest runtime.getManifest(): object</li>
<li>getPackageDirectoryEntry runtime.getPackageDirectoryEntry(callback: function)</li>
<li>getPlatformInfo runtime.getPlatformInfo(callback: function)</li>
</ul></dd>

<dt>Managing extension execution and lifecycle</dt>
<dd><ul>
<li>reload runtime.reload()</li>
<li>requestUpdateCheck runtime.requestUpdateCheck(callback: function)</li>
<li>restart runtime.restart()</li>
<li>restartAfterDelay runtime.restartAfterDelay(seconds: number, callback: function)</li>
<li>setUninstallURL runtime.setUninstallURL(url: string, callback: function)</li>
<li>openOptionsPage runtime.openOptionsPage(callback: function)</li>
</ul></dd>

<dt>Helper utilities</dt>
<dd><ul>
<li>getURL runtime.getURL(path: string): string</li>
</ul></dd>

</dl>


## Manifest

There are no permissions or other manifest requirements for the runtime API.



## Examples

### Use [`getURL`][get-url] to add an extension image to a page {: #example-get-url }

In order for a web page to access an asset hosted on another domain, it must specify the resource's
full URL (e.g. `<img src-"https://example.com/logo.png">`). The same is true for when a web page
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
chrome.runtime.onInstalled.addListener(reason => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
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
