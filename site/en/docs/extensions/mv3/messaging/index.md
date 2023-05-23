---
layout: "layouts/doc-post.njk"
title: "Message passing"
seoTitle: "Chrome Extensions Message passing"
date: 2012-09-18
updated: 2023-02-22
description: How to pass messages between extensions and content scripts.
---

Since content scripts run in the context of a web page and not the extension, they often need some
way of communicating with the rest of the extension. For example, an RSS reader extension might use
content scripts to detect the presence of an RSS feed on a page, then notify the background page in
order to display a page action icon for that page.

Communication between extensions and their content scripts works by using message passing. Either
side can listen for messages sent from the other end, and respond on the same channel. A message can
contain any valid JSON object (null, boolean, number, string, array, or object). There is a simple
API for [one-time requests][section-one-time] and a more complex API for [long-lived
connections][section-long] to exchange multiple messages within shared context. It is also possible to send
a message to another extension if you know its ID. That is covered in the [cross-extension
messages][section-external] section.

## Simple one-time requests {: #simple }

If you only need to send a single message to another part of your extension (and optionally get a
response back), use the simplified [`runtime.sendMessage()`][runtime-send-msg] method or [`tabs.sendMessage()`][tabs-send-msg]
method. This lets you send a one-time JSON-serializable message from a content script to the
extension, or vice versa. To handle the response, use the returned Promise. For backward
compatibility, you can alternatively pass a callback as the last argument. You cannot use both a
promise and a callback.

Sending a request from a content script looks like this:

{% Label %}content-script.js:{% endLabel %}

```js
(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();
```

Sending a request from the extension to a content script is similar, except that you need to
specify which tab to send it to. This example demonstrates sending a message to the content script
in the selected tab.

{% Label %}service-worker.js{% endLabel %}

```js
(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();
```

On the receiving end, you need to set up an [runtime.onMessage][runtime-on-msg] event listener to handle the
message. This looks the same from a content script or extension page.

{% Label %}content-script.js or service-worker.js:{% endLabel %}

```js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);
```

In the above example, `sendResponse()` was called synchronously. If you want to asynchronously use
`sendResponse()`, add `return true;` to the `onMessage` event handler.

{% Aside %}
If multiple pages are listening for `onMessage` events, only the first to call `sendResponse()` for
a particular event will succeed in sending the response. All other responses to that event will be
ignored.
{% endAside %}

For new extensions you should prefer promises over callbacks. If you're using callbacks, the
`sendResponse()` callback is only valid if used synchronously, or if the event handler returns
`true` to indicate that it will respond asynchronously. The `sendMessage()` function's callback
will be invoked automatically if no handlers return true or if the `sendResponse()` callback is
garbage-collected.

For information on using promises, see [Promises on MDN][mdn-promise]. For information on converting
callbacks to promises and for using them in extensions, see [our own article][doc-promises].

## Long-lived connections {: #connect }

Sometimes it's useful to have a conversation that lasts longer than a single request and response.
In this case, you can open a long-lived channel from your content script to an extension page or
vice versa using [runtime.connect][runtime-connect] or [tabs.connect][tabs-connect], respectively. The channel can
optionally have a name, allowing you to distinguish between different types of connections.

One use case might be an automatic form filling extension. The content script could open a channel to
the extension page for a particular login, and send a message to the extension for each input
element on the page to request the form data to fill in. The shared connection allows the extension
to keep shared state linking the messages coming from the content script.

When establishing a connection, each end is given a [runtime.Port][runtime-port] object which is used for
sending and receiving messages through that connection.

Here is how you open a channel from a content script, and send and listen for messages:

{% Label %}content-script.js:{% endLabel %}

```js
var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg.question === "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question === "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});
```

Sending a request from the extension to a content script is similar, except that you need to
specify which tab to connect to. Simply replace the call to connect in the above example with
[tabs.connect()][tabs-connect].

To handle incoming connections, you need to set up a [runtime.onConnect()][runtime-on-connect] event
listener. This looks the same from a content script or an extension page. When another part of your
extension calls `connect()`, this event is fired, along with the [runtime.Port][runtime-port] object you can
use to send and receive messages through the connection. Here's what it looks like to respond to
incoming connections:

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke === "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer === "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer === "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
```

### Port lifetime {: #port-lifetime }

Ports are designed as a two-way communication method between different parts of the extension, where
a (top-level) frame is viewed as the smallest part.
Upon calling [tabs.connect()][tabs-connect], [runtime.connect()][runtime-connect] or [runtime.connectNative()][runtime-connect-native], a [Port][runtime-port]
is created. This port can immediately be used for sending messages to the other end via
[postMessage()][runtime-post-msg].

If there are multiple frames in a tab, calling [tabs.connect()][tabs-connect] results in multiple invocations of
the [runtime.onConnect][runtime-on-connect] event, once for each frame in the tab. Similarly, if
[runtime.connect()][runtime-connect] is called, then the onConnect event may be fired multiple times, once for every
frame in the extension process.

You may want to find out when a connection is closed, for example if you are maintaining separate
state for each open port. For this listen to the [runtime.Port.onDisconnect][runtime-on-disconnect] event. This
event is fired when there are no valid ports at the other side of the channel. This happens in the
following situations:

- There are no listeners for [runtime.onConnect][runtime-on-connect] at the other end.
- The tab containing the port is unloaded (for example, if the tab is navigated).
- The frame where `connect()` was called has unloaded.
- All frames that received the port (via [runtime.onConnect][runtime-on-connect]) have unloaded.
- [runtime.Port.disconnect()][runtime-port-disconnect] is called by _the other end_. Note that if a `connect()` call results
  in multiple ports at the receiver's end, and `disconnect()` is called on any of these ports, then
  the `onDisconnect` event is only fired at the port of the sender, and not at the other ports.

## Cross-extension messaging {: #external }

In addition to sending messages between different components in your extension, you can use the
messaging API to communicate with other extensions. This lets you expose a public API that other
extensions can take advantage of.

Listening for incoming requests and connections is similar to the internal case, except you use the
[runtime.onMessageExternal][runtime-on-msg-ext] or [runtime.onConnectExternal][runtime-on-connect-ext] methods. Here's an example of
each:

{% Label %}service-worker.js{% endLabel %}

```js
// For simple requests:
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id === blocklistedExtension)
      return;  // don't allow this extension access
    else if (request.getTargetData)
      sendResponse({targetData: targetData});
    else if (request.activateLasers) {
      var success = activateLasers();
      sendResponse({activateLasers: success});
    }
  });

// For long-lived connections:
chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    // See other examples for sample onMessage handlers.
  });
});
```

Likewise, sending a message to another extension is similar to sending one within your extension.
The only difference is that you must pass the ID of the extension you want to communicate with. For
example:

{% Label %}service-worker.js{% endLabel %}

```js
// The ID of the extension we want to talk to.
var laserExtensionId = "abcdefghijklmnoabcdefhijklmnoabc";

// Make a simple request:
chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
  function(response) {
    if (targetInRange(response.targetData))
      chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
  }
);

// Start a long-running conversation:
var port = chrome.runtime.connect(laserExtensionId);
port.postMessage(...);
```

## Sending messages from web pages {: #external-webpage }

As with [cross-extension messaging][section-external], your extension can receive and respond to
messages from regular web pages. To use this feature, you must first specify in your `manifest.json`
which websites you want to communicate with using [`"externally_connectable"`][43]. For example:

{% Label %}manifest.json{% endLabel %}

```json
"externally_connectable": {
  "matches": ["https://*.example.com/*"]
}
```

This exposes the messaging API to any page that matches the URL patterns you specify. The URL
pattern must contain at least a [second-level domain][wiki-second-level]; that is, hostname patterns such as "\*",
"\*.com", "\*.co.uk", and "\*.appspot.com" are prohibited. From the web page, use the
[runtime.sendMessage()][runtime-send-msg] or [runtime.connect()][runtime-connect] APIs to send a message to a specific app or
extension. For example:

{% Label %}webpage.js{% endLabel %}

```js
// The ID of the extension we want to talk to.
var editorExtensionId = "abcdefghijklmnoabcdefhijklmnoabc";

// Make a simple request:
chrome.runtime.sendMessage(editorExtensionId, {openUrlInEditor: url},
  function(response) {
    if (!response.success)
      handleError(url);
  });
```

From your extension, you may listen to messages from web pages via the
[runtime.onMessageExternal][runtime-on-msg-ext] or [runtime.onConnectExternal][runtime-on-connect-ext] APIs, similar to [cross-extension
messaging][section-external]. Only the web page can initiate a connection. Here is an example:

{% Label %}service-worker.js{% endLabel %}

```js
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.url === blocklistedWebsite)
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      openUrl(request.openUrlInEditor);
  });
```

## Native messaging {: #native-messaging }

Extensions [can exchange messages][native-client] with native applications that are registered as a
[native messaging host][native-host]. To learn more about this feature, see [Native messaging][native-messaging].

## Security considerations {: #security-considerations }

### Content scripts are less trustworthy {: #content-scripts-are-less-trustworthy }

[Content scripts are less trustworthy][security-cs] than the extension service worker (for example, a malicious web
page might be able to compromise the renderer process where the content scripts run). Assume that
messages from a content script might have been crafted by an attacker and make sure to [validate and
sanitize all input][security-santize]. Assume any data sent to the content script might leak to the web page.
Limit the scope of privileged actions that can be triggered by messages received from content
scripts.

### Cross-site scripting {: #cross-site-scripting }

When receiving a message from a content script or another extension, your scripts should be careful
not to fall victim to [cross-site scripting][wiki-cross-site]. This advice applies to scripts running inside the
extension background page as well as to content scripts running inside other web origins.
Specifically, avoid using dangerous APIs such as the ones below:

{% Label %}content-script.js or service-worker.js{% endLabel %}

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // WARNING! Might be evaluating an evil script!
  var resp = eval("(" + response.farewell + ")");
});
```

{% Label %}content-script.js or service-worker.js{% endLabel %}

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // WARNING! Might be injecting a malicious script!
  document.getElementById("resp").innerHTML = response.farewell;
});
```

Instead, prefer safer APIs that do not run scripts:

{% Label %}content-script.js or service-worker.js{% endLabel %}

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // JSON.parse does not evaluate the attacker's scripts.
  var resp = JSON.parse(response.farewell);
});
```

{% Label %}content-script.js or service-worker.js{% endLabel %}

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // innerText does not let the attacker inject HTML elements.
  document.getElementById("resp").innerText = response.farewell;
});
```

[doc-promises]: /docs/extensions/mv3/promises/
[mdn-promise]: https://developer.mozilla.org/docs/Learn/JavaScript/Asynchronous/Promises
[native-client]: /docs/extensions/mv3/nativeMessaging/#native-messaging-client
[native-host]: /docs/extensions/mv3/nativeMessaging/#native-messaging-host
[native-messaging]: /docs/extensions/mv3/nativeMessaging/
[runtime-connect-native]: /docs/extensions/reference/runtime#method-connectNative
[runtime-connect]: /docs/extensions/reference/runtime#method-connect
[runtime-on-connect-ext]: /docs/extensions/reference/runtime#event-onConnectExternal
[runtime-on-connect]: /docs/extensions/reference/runtime#event-onConnect
[runtime-on-disconnect]: /docs/extensions/reference/runtime#property-Port-onDisconnect
[runtime-on-msg-ext]: /docs/extensions/reference/runtime#event-onMessageExternal
[runtime-on-msg]: /docs/extensions/reference/runtime#event-onMessage
[runtime-port-disconnect]: /docs/extensions/reference/runtime#property-Port-disconnect
[runtime-port]: /docs/extensions/reference/runtime#type-Port
[runtime-post-msg]: /docs/extensions/reference/runtime#property-Port-postMessage
[runtime-send-msg]: /docs/extensions/reference/runtime#method-sendMessage
[section-external]: #external
[section-long]: #connect
[section-one-time]: #simple
[security-cs]: /docs/extensions/mv3/security#content_scripts
[security-santize]: /docs/extensions/mv3/security#sanitize
[tabs-connect]: /docs/extensions/reference/tabs#method-connect
[tabs-send-msg]: /docs/extensions/reference/tabs#method-sendMessage
[wiki-second-level]: https://wikipedia.org/wiki/Second-level_domain
[wiki-cross-site]: https://wikipedia.org/wiki/Cross-site_scripting
