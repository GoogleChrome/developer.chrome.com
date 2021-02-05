---
layout: "layouts/doc-post.njk"
title: "Message passing"
date: 2012-09-18
updated: 2019-07-17
description: How to pass messages between extensions and content scripts.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Since content scripts run in the context of a web page and not the extension, they often need some
way of communicating with the rest of the extension. For example, an RSS reader extension might use
content scripts to detect the presence of an RSS feed on a page, then notify the background page in
order to display a page action icon for that page.

Communication between extensions and their content scripts works by using message passing. Either
side can listen for messages sent from the other end, and respond on the same channel. A message can
contain any valid JSON object (null, boolean, number, string, array, or object). There is a simple
API for [one-time requests][1] and a more complex API that allows you to have [long-lived
connections][2] for exchanging multiple messages with a shared context. It is also possible to send
a message to another extension if you know its ID, which is covered in the [cross-extension
messages][3] section.

## Simple one-time requests {: #simple }

If you only need to send a single message to another part of your extension (and optionally get a
response back), you should use the simplified [runtime.sendMessage][4] or [tabs.sendMessage][5] .
This lets you send a one-time JSON-serializable message from a content script to extension , or vice
versa, respectively . An optional callback parameter allows you handle the response from the other
side, if there is one.

Sending a request from a content script looks like this:

```js
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

Sending a request from the extension to a content script looks very similar, except that you need to
specify which tab to send it to. This example demonstrates sending a message to the content script
in the selected tab.

```js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```

On the receiving end, you need to set up an [runtime.onMessage][6] event listener to handle the
message. This looks the same from a content script or extension page.

```js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  }
);
```

In the above example, `sendResponse` was called synchronously. If you want to asynchronously use
`sendResponse`, add `return true;` to the `onMessage` event handler.

<div class="aside aside--note"><b>Note:</b> If multiple pages are listening for onMessage events, only the first to call sendResponse() for a particular event will succeed in sending the response. All other responses to that event will be ignored.</div>

<div class="aside aside--note"><b>Note:</b> The <code>sendResponse</code> callback is only valid if used synchronously, or if the event handler returns <code>true</code> to indicate that it will respond asynchronously. The <code>sendMessage</code> function's callback will be invoked automatically if no handlers return true or if the <code>sendResponse</code> callback is garbage-collected.</div>

## Long-lived connections {: #connect }

Sometimes it's useful to have a conversation that lasts longer than a single request and response.
In this case, you can open a long-lived channel from your content script to an extension page , or
vice versa, using [runtime.connect][7] or [tabs.connect][8], respectively . The channel can
optionally have a name, allowing you to distinguish between different types of connections.

One use case might be an automatic form fill extension. The content script could open a channel to
the extension page for a particular login, and send a message to the extension for each input
element on the page to request the form data to fill in. The shared connection allows the extension
to keep shared state linking the several messages coming from the content script.

When establishing a connection, each end is given a [runtime.Port][9] object which is used for
sending and receiving messages through that connection.

Here is how you open a channel from a content script, and send and listen for messages:

```js
var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});
```

Sending a request from the extension to a content script looks very similar, except that you need to
specify which tab to connect to. Simply replace the call to connect in the above example with
[tabs.connect][10].

In order to handle incoming connections, you need to set up a [runtime.onConnect][11] event
listener. This looks the same from a content script or an extension page. When another part of your
extension calls "connect()", this event is fired, along with the [runtime.Port][12] object you can
use to send and receive messages through the connection. Here's what it looks like to respond to
incoming connections:

```js
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
```

### Port lifetime {: #port-lifetime }

Ports are designed as a two-way communication method between different parts of the extension, where
a (top-level) frame is viewed as the smallest part.
Upon calling [tabs.connect][13], [runtime.connect][14] or [runtime.connectNative][15], a [Port][16]
is created. This port can immediately be used for sending messages to the other end via
[postMessage][17].

If there are multiple frames in a tab, calling [tabs.connect][18] results in multiple invocations of
the [runtime.onConnect][19] event (once for each frame in the tab). Similarly, if
[runtime.connect][20] is used, then the onConnect event may be fired multiple times (once for every
frame in the extension process).

You may want to find out when a connection is closed, for example if you are maintaining separate
state for each open port. For this you can listen to the [runtime.Port.onDisconnect][21] event. This
event is fired when there are no valid ports at the other side of the channel. This happens in the
following situations:

- There are no listeners for [runtime.onConnect][22] at the other end.
- The tab containing the port is unloaded (e.g. if the tab is navigated).
- The frame from where `connect` was called has unloaded.
- All frames that received the port (via [runtime.onConnect][23]) have unloaded.
- [runtime.Port.disconnect][24] is called by _the other end_. Note that if a `connect` call results
  in multiple ports at the receiver's end, and `disconnect()` is called on any of these ports, then
  the `onDisconnect` event is only fired at the port of the sender, and not at the other ports.

## Cross-extension messaging {: #external }

In addition to sending messages between different components in your extension, you can use the
messaging API to communicate with other extensions. This lets you expose a public API that other
extensions can take advantage of.

Listening for incoming requests and connections is similar to the internal case, except you use the
[runtime.onMessageExternal][25] or [runtime.onConnectExternal][26] methods. Here's an example of
each:

```js
// For simple requests:
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id == blocklistedExtension)
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

Similar to [cross-extension messaging][27], your app or extension can receive and respond to
messages from regular web pages. To use this feature, you must first specify in your manifest.json
which web sites you want to communicate with. For example:

```json
"externally_connectable": {
  "matches": ["*://*.example.com/*"]
}
```

This will expose the messaging API to any page which matches the URL patterns you specify. The URL
pattern must contain at least a [second-level domain][28] - that is, hostname patterns like "\*",
"\*.com", "\*.co.uk", and "\*.appspot.com" are prohibited. From the web page, use the
[runtime.sendMessage][29] or [runtime.connect][30] APIs to send a message to a specific app or
extension. For example:

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

From your app or extension, you may listen to messages from web pages via the
[runtime.onMessageExternal][31] or [runtime.onConnectExternal][32] APIs, similar to [cross-extension
messaging][33]. Only the web page can initiate a connection. Here is an example:

```js
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.url == blocklistedWebsite)
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      openUrl(request.openUrlInEditor);
  });
```

## Native messaging {: #native-messaging }

Extensions and apps [can exchange messages][34] with native applications that are registered as a
[native messaging host][35]. To learn more about this feature, see [Native messaging][36].

## Security considerations {: #security-considerations }

### Content scripts are less trustworthy {: #content-scripts-are-less-trustworthy }

[Content scripts are less trustworthy][37] than the extension background page (e.g., a malicious web
page might be able to compromise the renderer process where the content scripts run). Assume that
messages from a content script might have been crafted by an attacker and make sure to [validate and
sanitize all input][38]. Assume any data sent to the content script might leak to the web page.
Limit the scope of privileged actions that can be triggered by messages received from content
scripts.

### Cross-site scripting {: #cross-site-scripting }

When receiving a message from a content script or another extension, your scripts should be careful
not to fall victim to [cross-site scripting][39]. This advice applies to scripts running inside the
extension background page as well as to content scripts running inside other web origins.
Specifically, avoid using dangerous APIs such as the ones below:

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // WARNING! Might be evaluating an evil script!
  var resp = eval("(" + response.farewell + ")");
});
```

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // WARNING! Might be injecting a malicious script!
  document.getElementById("resp").innerHTML = response.farewell;
});
```

Instead, prefer safer APIs that do not run scripts:

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // JSON.parse does not evaluate the attacker's scripts.
  var resp = JSON.parse(response.farewell);
});
```

```js
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  // innerText does not let the attacker inject HTML elements.
  document.getElementById("resp").innerText = response.farewell;
});
```

## Examples {: #examples }

You can find simple examples of communication via messages in the [examples/api/messaging][40]
directory. The [native messaging sample][41] demonstrates how a Chrome app can communicate with a
native app. For more examples and for help in viewing the source code, see [Samples][42].

[1]: #simple
[2]: #connect
[3]: #external
[4]: /docs/extensions/reference/runtime#method-sendMessage
[5]: /docs/extensions/reference/tabs#method-sendMessage
[6]: /docs/extensions/reference/runtime#event-onMessage
[7]: /docs/extensions/reference/runtime#method-connect
[8]: /docs/extensions/reference/tabs#method-connect
[9]: /docs/extensions/reference/runtime#type-Port
[10]: /docs/extensions/reference/tabs#method-connect
[11]: /docs/extensions/reference/runtime#event-onConnect
[12]: /docs/extensions/reference/runtime#type-Port
[13]: /docs/extensions/reference/tabs#method-connect
[14]: /docs/extensions/reference/runtime#method-connect
[15]: /docs/extensions/reference/runtime#method-connectNative
[16]: /docs/extensions/reference/runtime#type-Port
[17]: /docs/extensions/reference/runtime#property-Port-postMessage
[18]: /docs/extensions/reference/tabs#method-connect
[19]: /docs/extensions/reference/runtime#event-onConnect
[20]: /docs/extensions/reference/runtime#method-connect
[21]: /docs/extensions/reference/runtime#property-Port-onDisconnect
[22]: /docs/extensions/reference/runtime#event-onConnect
[23]: /docs/extensions/reference/runtime#event-onConnect
[24]: /docs/extensions/reference/runtime#property-Port-disconnect
[25]: /docs/extensions/reference/runtime#event-onMessageExternal
[26]: /docs/extensions/reference/runtime#event-onConnectExternal
[27]: #external
[28]: https://en.wikipedia.org/wiki/Second-level_domain
[29]: /docs/extensions/reference/runtime#method-sendMessage
[30]: /docs/extensions/reference/runtime#method-connect
[31]: /docs/extensions/reference/runtime#event-onMessageExternal
[32]: /docs/extensions/reference/runtime#event-onConnectExternal
[33]: #external
[34]: /docs/apps/nativeMessaging#native-messaging-client
[35]: /docs/apps/nativeMessaging#native-messaging-host
[36]: /docs/apps/nativeMessaging
[37]: /docs/extensions/mv2/security#content_scripts
[38]: /docs/extensions/mv2/security#sanitize
[39]: https://en.wikipedia.org/wiki/Cross-site_scripting
[40]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/messaging
[41]: /docs/apps/nativeMessaging#examples
[42]: /docs/extensions/mv2/samples
