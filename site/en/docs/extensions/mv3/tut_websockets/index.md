---
layout: 'layouts/doc-post.njk'
title: 'Using WebSockets in Service Workers'
seoTitle: 'How to use WebSockets in Chrome extension Service Workers'
date: 2023-07-04
description: 'Step-by-step instructions on how to connect to a WebSocket in your Chrome extension.'
---

This tutorial demonstrates how to connect to a WebSocket in your Chrome extension's service worker. You can find a [working example on Github](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.websockets).

## Background {: #background }

Starting with Chrome 116, extension service workers get improved support for [WebSockets](https://developer.mozilla.org/docs/Web/API/WebSockets_API). Previously, a service worker could become inactive despite a WebSocket connection being active if no other extension events occurred for 30 seconds. This would terminate the service worker and close the WebSocket connection. For more background on the extension service worker lifecycle, read the [extension service worker guide](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#idle-shutdown)).

From Chrome 116 on, you can keep a service worker with a WebSocket connection active by exchanging messages within the 30s service worker activity window. These can either be initiated from your server or from your extension. In the following example, we will send a regular message from the Chrome extension to the server to ensure that the service worker stays alive.

## Example: WebSocket keepalive {: #websocket-keepalive }

First we need to make sure that our extension only runs in Chrome versions supporting WebSockets in service workers by setting the minimum Chrome version to 116 in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "minimum_chrome_version": "116",
  ...
}
```

Then we can keep the service worker active by sending a keepalive message every 20s. The keepalive is started once the service worker connects to the WebSocket. The following sample WebSocket client logs messages and calls `keepAlive()` when the `onopen` event is triggered:

{% Label %}service-worker.js{% endLabel %}

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
    console.log('websocket connection closed');
    webSocket = null;
  };
}

function disconnect() {
  if (webSocket == null) {
    return;
  }
  webSocket.close();
}
```

Inside `keepAlive()` we use `setInterval(...)` to regularly send a ping to the server while there is an active WebSocket connection:

```js
function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (webSocket) {
        webSocket.send('keepalive');
      } else {
        clearInterval(keepAliveIntervalId);
      }
    },
    // Set the interval to 20 seconds to prevent the service worker from becoming inactive.
    20 * 1000 
  );
}
```
