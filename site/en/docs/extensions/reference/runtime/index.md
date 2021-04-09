---
api: runtime
---

## Examples

### Use [`getURL`][getURL] to add an extension image to a page

Extensions can access their own resources using relative paths, but in order for the extension's
assets to appear in a web page, you will need to specify the fully URL of the asset (and expose it
using [web_accessible_resources][war]).

This example shows how a [content script][content] could add an image in the extension's package to
the page that the content script has been [injected][content-inject] into.

```js
//// content.js

{ // Block used to avoid setting global variables
  let img = document.createElement('img');
  img.src = chrome.runtime.getURL('logo.png');
  document.body.append(img);
}
```

A basic example of content script injected into a page and background script passing messages to
each other. This exchange is modeled on a [TCP handshake][handshake].

```js
//// content.js ////

// 1. Send the background a message requesting receipt confirmation.
console.log('[content] sending content-syn');
chrome.runtime.sendMessage('content-syn');

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message === 'bg-syn-ack') {
    // 3. BG syn-ack received, acknowledged receipt.
    console.log('[content] received bg-syn-ack');
    console.log('[content] sending content-ack');
    chrome.runtime.sendMessage('content-ack');
  }
});
```

```js
//// background.js ////

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'content-syn') {
    // 2. Content syn received, acknowledge receipt & request confirmation.
    console.log('[bg] received content-syn');
    console.log('[bg] sending bg-syn-ack');
    chrome.tabs.sendMessage(sender.tab.id, 'bg-syn-ack');
  }
  if (message.type === 'content-ack') {
    // 4. Content ack received. Both ends have verified that message
    //    passing works as expected.
    console.log('[bg] received content-ack');
  }
});
```

Retrieve a production extension's [public key][key-prop] for use in development. Execute this snippet in a DevTools console for the production extension paste the value in your unpacked extension's manifest.json.

```js
//// DevTools console for a published extension
copy(`"key": "${chrome.runtime.getManifest().key}"`)
```

[content]: /docs/extensions/mv3/content_scripts/
[content-inject]: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#functionality
[getURL]: #method-getURL
[handshake]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment
[key-prop]: /docs/extensions/mv3/manifest/key/
[war]: /docs/extensions/mv3/manifest/web_accessible_resources/
