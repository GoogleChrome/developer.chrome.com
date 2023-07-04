---
layout: 'layouts/doc-post.njk'
title: 'Using WebSockets in Service Workers'
seoTitle: 'How to use WebSockets in Chrome Extension Service Workers'
date: 2023-07-04
description: 'Step-by-step instructions on how to connect to a WebSocket in your Chrome Extension.'
---

This tutorial demonstrates how to connect to a WebSocket in your Chrome Extension's service worker. You can find a [working example on Github](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.websockets).

## Background

Starting with Chrome M116, extension service workers get full support for WebSockets. Previously, a service worker could become inactive if the WebSocket connection was active for more than 30s and no other extension events occurred at that time, which could result in connection loss and the inability to receive messages.

The reason for this is that Chrome terminates an extension service worker after 30s of inactivity. In Chrome versions &lt;M116 messages sent or received on a WebSocket do not extend the service worker lifetime, causing Chrome to suspend the service workers with an active WebSocket connection. For more background on the extension service worker lifecycle, read the [extension service worker guide](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#idle-shutdown)).

From Chrome M116 on, you can keep a service worker with a WebSocket connection active by exchanging messages within the 30s service worker activity window. These can either be initiated from your server or from your extension. In the following example, we will send a regular message from the Chrome extension to the server to ensure that the service worker stays alive.

## Example: WebSocket keep alive

First we need to make sure that the Chrome version supports WebSockets in service workers by setting the minimum Chrome to M116 in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "minimum_chrome_version": "116",
  ...
}
```

Then we can keep the service worker active by sending a keep alive message every 20s. The keep alive is started once the service worker connects to the WebSocket. The following sample WebSocket client logs messages and calls `keepAlive()` when the `onopen` event is triggered:

```js

let webSocket = null;

function connect() {
  webSocket = new WebSocket('wss://example.com/ws');

  webSocket.onopen = (event) => {
    console.log('websocket open');
    keepAlive();
  };

  webSocket.onmessage = (event) => {
    console.log(`websocket received message: ${event.data}`);
  };

  webSocket.onclose = (event) => {
    console.log('websocket close');
    webSocket = null;
  };
}

function disconnect() {
  webSocket.close();
  webSocket = null;
}
```

Inside `keepAlive()` we use `setInterval(...)` to regularly send a ping to the server while there is an active WebSocket connection:

```js
function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (webSocket) {
        webSocket.send('keep alive');
      } else {
        clearInterval(keepAliveIntervalId);
      }
    },
    // Set interval to 20s to avoid that the service worker becomes inactive.
    20 * 1000 
  );
}
```
