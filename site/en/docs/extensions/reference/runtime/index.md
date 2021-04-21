---
api: runtime
---

## Examples

### Use [`getURL`][get-url] to add an extension image to a page {: #example-get-url }

In order for a web page to access an asset hosted on another domain, it must specify the resource's
full URL (e.g. `<img src-"https://example.com/logo.png">`). The same is true for when a web page
wants to include assets included in an extension. The two main differences here are that the
extension's assets must be exposed as [web_accessible_resources][war] and that typically content
scripts are responsible for injecting extension assets.

This example shows how a [content script][content] can add an image in the extension's package to
the page that the content script has been [injected][content-inject] into.

```js
//// content.js

{ // Block used to avoid setting global variables
  let img = document.createElement('img');
  img.src = chrome.runtime.getURL('logo.png');
  document.body.append(img);
}
```

### Getting background data into a content script {: #example-content-msg }

It's common for an extension's content scripts to need data managed by another part of the
extension, like the extension's background script. Much like two browser windows opened to the same
web page, these two contexts cannot directly access each other's values. Instead, the page and background can use [message passing][message-passing] to coordinate with each other.

In this example, the content script needs some data from the extension's background script in order
to initialize it's UI. To get this data, it passes a `get-user-data` message to the background, and
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
let user = {
  username: 'demo-user'
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-user-data') {
    sendResponse(user);
  }
});
```

### Getting an extension's key from it's manifest {: #example-key }

Retrieve a production extension's [public key][key-prop] for use in development. Execute this
snippet in a DevTools console for the production extension to copy the extension's key to your
clipboard, then open your unpacked extension's manifest.json and paste the key on a new line.

```js
//// DevTools console for a published extension
copy(`"key": "${chrome.runtime.getManifest().key}"`)
```

[content-inject]: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality
[content]: /docs/extensions/mv3/content_scripts/
[get-url]: #method-getURL
[handshake]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment
[key-prop]: /docs/extensions/mv3/manifest/key/
[message-passing]: /docs/extensions/mv3/messaging/
[war]: /docs/extensions/mv3/manifest/web_accessible_resources/
