---
api: runtime
---

<!-- Intentionally blank -->

## Examples

Using a content script to inject an extension asset on a page.

```js
//// content.js
{ // Block used to avoid setting global variables
  let el = document.createElement('img');
  el.src = chrome.runtime.getURL('logo.png');
  document.body.append(el);
}
```

A basic example of content script injected into a page and background script passing messages to
each other. This exchange is modeled on a [TCP handshake][handshake].

```js
//// content.js
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

//// background.js
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

[handshake]: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment
[key-prop]: https://developer.chrome.com/docs/extensions/mv3/manifest/key/

