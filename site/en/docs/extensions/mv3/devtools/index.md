---
layout: "layouts/doc-post.njk"
title: "Extending DevTools"
seoTitle: "Extending DevTools with Chrome Extensions"
date: 2012-09-17
updated: 2023-07-12
description: How to create a Chrome Extension that adds functionality to Chrome DevTools.
---

DevTools extensions add functionality to Chrome DevTools by accessing DevTools-specific
extension APIs through a DevTools page added to the extension.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/kcLMpTY6qtez03TVSqt4.png",
         alt="Architecture diagram showing DevTools page communicating with the
         inspected window and the service worker. The service worker is shown
         communicating with the content scripts and accessing extension APIs.
         The DevTools page has access to the DevTools APIs, for example, creating panels.",
         height="556", width="522" %}
  <figcaption>DevTools extension architecture./figcaption>
</figure>

The DevTools-specific extension APIs include the following:

- [`devtools.inspectedWindow`][api-inspectedwindow]
- [`devtools.network`][api-network]
- [`devtools.panels`][api-panels]
- [`devtools.recorder`][api-recorder]

## The DevTools page {: #devtools-page }

When a DevTools window opens, a DevTools extension creates an instance of its DevTools page that
exists as long as the window is open. This page has access to the DevTools APIs and some other
extension APIs, and can do the following:

- Create and interact with panels using the [`devtools.panels`][api-panels] APIs, including adding other extension pages as panels or sidebars to the DevTools window.
- Get information about the inspected window and evaluate code in the inspected window using the
  [`devtools.inspectedWindow`][api-inspectedwindow] APIs.
- Get information about network requests using the [`devtools.network`][api-network] APIs.
- Extend the [Recorder panel](/docs/devtools/recorder/) using the [`devtools.recorder`][api-recorder] APIs (preview feature).

The DevTools page can't use most extensions APIs directly. Instead, it uses the same subset of
the [`extension`][api-extension] and [`runtime`][api-runtime] APIs as content scripts do, and
communicates with the service worker using [message passing][doc-message-passing]. For an
example, see [Inject a Content Script][header-injecting].

## Create a DevTools extension {: #creating }

To create a DevTools page for your extension, add the `devtools_page` field in the extension
manifest:

```json
{
  "name": ...
  "version": "1.0",
  "devtools_page": "devtools.html",
  ...
}
```

The `devtools_page` field must point to an HTML page. Because the DevTools
page must be local to your extension, we recommend specifying it it using a relative URL.

The members of the `chrome.devtools` API are available only to the pages loaded within the DevTools
window while that window is open. Content scripts and other extension pages don't have access
to these APIs.


## DevTools UI elements: panels and sidebar panes {: #devtools-ui }

In addition to the usual extension UI elements, such as browser actions, context menus and popups, a
DevTools extension can add UI elements to the DevTools window:

- A _panel_ is a top-level tab, like the Elements, Sources, and Network panels.
- A _sidebar pane_ presents supplementary UI related to a panel. The Styles, Computed Styles, and
  Event Listeners panes on the Elements panel are examples of sidebar panes. Depending on the
  version of Chrome you're using and where the DevTools window is docked, your sidebar panes might
  look like the following example image:

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png", class="screenshot",
      alt="DevTools window showing Elements panel and Styles sidebar pane.", height="302", width="770" %}
  <figcaption>DevTools window showing Elements panel and Styles sidebar pane.</figcaption>
</figure>

Each panel is its own HTML file, which can include other resources (JavaScript, CSS, images, and so
on). To create a basic panel, use the following code:

```js
chrome.devtools.panels.create("My Panel",
    "MyPanelIcon.png",
    "Panel.html",
    function(panel) {
      // code invoked on panel creation
    }
);
```

JavaScript executed in a panel or sidebar pane has access to the same APIs as the DevTools page.

To create a basic sidebar pane, use the following code:

```js
chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setObject({ some_data: "Some data to show" });
});
```

There are several ways to display content in a sidebar pane:

- HTML content: Call [`setPage`][api-panels-setpane] to specify an HTML page to display in the pane.
- JSON data: Pass a JSON object to [`setObject`][api-panels-setobject].
- JavaScript expression: Pass an expression to [`setExpression`][api-panels-setexpression]. DevTools
  evaluates the expression in the context of the inspected page, then displays the return value.

For both `setObject` and `setExpression`, the pane displays the value as it would appear in the
DevTools console. However, `setExpression` lets you display DOM elements and arbitrary JavaScript
objects, while `setObject` only supports JSON objects.

## Communicate between extension components {: #solutions }

The following sections describe some helpful ways to allow DevTools extension components to
communicate with each other.

### Inject a content script {: #injecting }

The DevTools page can't call [`scripting.executeScript()`][api-scripting-executescript] directly. To
inject a content script from the DevTools page, you must retrieve the inspected window's tab ID
using the [`inspectedWindow.tabId`][api-inspectedwindow-tabid] property and send a message to
the background page. From the background page, call
[`scripting.executeScript`][api-scripting-executescript] to inject the script.

The following code snippets show how to inject a content script using `executeScript`.

```js
// DevTools page -- devtools.js
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
});

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "content_script.js"
});
```

Code for the background page:

```js
// Background page -- background.js
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    var devToolsListener = function(message, sender, sendResponse) {
        // Inject a content script into the identified tab
        chrome.scripting.executeScript({
          target: {tabId: message.tabId},
          files: [message.scriptToInject]
    });
    }
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
         devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});
```

If a content script has already been injected, you can add additional context scripts using the
`eval()` method. See [Pass the Selected Element to a Content Script][header-selected-element] for
more information.

### Evaluate JavaScript in the inspected window {: #evaluating-js }

You can use the [`inspectedWindow.eval()`][api-inspectedwindow-eval] method to execute JavaScript
code in the context of the inspected page. You can invoke the `eval()` method from a DevTools page,
panel, or sidebar pane.

{% Aside 'caution' %}
Use `eval()` only if you need access to the JavaScript content of an inspected page. Otherwise,
we recommend using the [`scripting.executeScript()`][api-scripting-executescript] method to run scripts.
For more information, see [`inspectedWindow`][api-inspectedwindow].
{% endAside %}


By default, the expression is evaluated in the context of the main frame of the page.
`inspectedWindow.eval()` uses the same script execution context and options as code
entered in the DevTools console, which allows access to DevTools [Console Utilities
API][doc-utilities] features within the eval. For example, [SOAK][gh-soak] uses it for inspecting an element:

```js
chrome.devtools.inspectedWindow.eval(
  "inspect($$('head script[data-soak=main]')[0])",
  function(result, isException) { }
);
```

You can also use the `useContentScriptContext: true` option for `inspectedWindow.eval()` to
evaluate the expression in the same context as the content scripts. To use this option, you must load a
context script before calling `eval`, either by calling `executeScript` or by specifying a content
script in the `manifest.json` file. After the context script context loads, you can also use this option to
inject additional content scripts.

### Pass the selected element to a content script {: #selected-element }

The content script doesn't have direct access to the current selected element. However, any code you
execute using [`inspectedWindow.eval()`][api-inspectedwindow-eval] has access to the DevTools
console and Console Utilities APIs. For example, in evaluated code you can use `$0` to access the
selected element.

To pass the selected element to a content script:

1. Create a method in the content script that takes the selected element as an argument.

<!--Update this code-->
  ```js
  function setSelectedElement(el) {
      // do something with the selected element
  }
  ```

2. Call the method from the DevTools page using [`inspectedWindow.eval()`][api-inspectedwindow-eval]
  with the `useContentScriptContext: true` option.

  ```js
  chrome.devtools.inspectedWindow.eval("setSelectedElement($0)",
      { useContentScriptContext: true });
  ```

The `useContentScriptContext: true` option specifies that the expression must be evaluated in the
same context as the content scripts, so it can access the `setSelectedElement` method.

### Get a reference panel's `window` {: #panel-window }

To call `postMessage()` from a devtools panel, you'll need a reference to its `window` object. Get a
panel's iframe window from the [`panel.onShown`][api-panels-onshown] event handler:

```js
onShown.addListener(function callback)
extensionPanel.onShown.addListener(function (extPanelWindow) {
    extPanelWindow instanceof Window; // true
    extPanelWindow.postMessage( // …
});
```

### Send messages between content scripts and the DevTools page {: #content-script-to-devtools }

Use the service worker to send messages between the DevTools page and content scripts.

To send a message _to_ a content script, the service worker calls
[`tabs.sendMessage()`][api-scripting-sendmessage] method, which directs a message to the content
scripts in a specific tab, as shown in [Injecting a Content Script][header-injecting].

To send a message from a content script, you'll need to establish a connection between the DevTools
page and the service worker, and create a map of tab IDs to connections so the service worker
can route each message to the correct connection.

<!--Update this code-->
```js
// background.js
var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
          connections[message.tabId] = port;
          return;
        }

	// other message handling
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
      var tabId = sender.tab.id;
      if (tabId in connections) {
        connections[tabId].postMessage(request);
      } else {
        console.log("Tab not found in connection list.");
      }
    } else {
      console.log("sender.tab not defined.");
    }
    return true;
});
```

The DevTools page (or panel or sidebar pane) establishes the connection like this:

```js
// Create a connection to the service worker
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});
```

### Send messages from injected scripts to the DevTools page {: #evaluated-scripts-to-devtools }

Code injected directly into the page without a content script, including by appending a `<script>`
tag or calling [`inspectedWindow.eval()`][api-inspectedwindow-eval], can't send messages to the
DevTools page using [`runtime.sendMessage()`][api-runtime-sendmessage]. Instead, we recommend
combining your injected script wtih a content script that can act as an intermediary, and using
the [`window.postMessage()`][mdn-postmessage] method. The following example uses the background script
from the previous section:

```js
// injected-script.js

window.postMessage({
  greeting: 'hello there!',
  source: 'my-devtools-extension'
}, '*');
```

```js
// content-script.js

window.addEventListener('message', function(event) {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
      message.source !== 'my-devtools-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
});
```

The message is sent from the injected script, to the content script, to the background
script, and finally to the DevTools page.

Other alternative message-passing techniques can be found [here][gh-devtools-messaging].

### Detect when DevTools opens and closes {: #detecting-open-close }

To track whether the DevTools window is open, add an [onConnect][api-runtime-onconnect] listener
to the service worker and call [connect()][api-runtime-connect] from the DevTools page. Because
each tab can have its own DevTools window open, you might receive multiple connect events.
To track whether any DevTools window is open, count the connect and disconnect events as shown
in the following example:

<!--Update this code-->
```js
// background.js
var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "devtools-page") {
      if (openCount == 0) {
        alert("DevTools window opening.");
      }
      openCount++;

      port.onDisconnect.addListener(function(port) {
          openCount--;
          if (openCount == 0) {
            alert("Last DevTools window closing.");
          }
      });
    }
});
```

The DevTools page creates a connection like this:

```js
// devtools.js

// Create a connection to the service worker
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});
```

## DevTools extension examples

The examples on this page come from the following pages:

- [Polymer Devtools Extension][gh-polymer-dt] - Uses many helpers running in the host page to query
  DOM/JS state to send back to the custom panel.
- [React DevTools Extension][gh-react-dt] - Uses a submodule of the renderer to reuse DevTools UI
  components.
- [Ember Inspector][gh-ember-dt] - Shared extension core with adapters for both Chrome and Firefox.
- [Coquette-inspect][gh-coquette] - A clean React-based extension with a debugging agent injected
  into the host page.
- [Sample Extensions][doc-samples] have more worthwhile extensions to install, try out, and learn
  from.

## More information {: #more }

For information on the standard APIs that extensions can use, see [chrome.\* APIs][api-index] and [web
APIs][mdn-web-apis].

[Give us feedback!][group-devtools] Your comments and suggestions help us improve the APIs.

## Examples {: #examples }

You can find examples that use DevTools APIs in [Samples][doc-samples].

[api-extension]: /docs/extensions/reference/extension
[api-index]: /docs/extensions/reference
[api-inspectedwindow-eval]: /docs/extensions/reference/devtools_inspectedWindow#method-eval
[api-inspectedwindow-tabid]: /docs/extensions/reference/devtools_inspectedWindow#property-tabId
[api-inspectedwindow]: /docs/extensions/reference/devtools_inspectedWindow
[api-network]: /docs/extensions/reference/devtools_network
[api-panels-onshown]: /docs/extensions/reference/devtools_panels#event-ExtensionPanel-onShown
[api-panels-setexpression]: /docs/extensions/reference/devtools_panels#method-ExtensionSidebarPane-setExpression
[api-panels-setobject]: /docs/extensions/reference/devtools_panels#method-ExtensionSidebarPane-setObject
[api-panels-setpane]: /docs/extensions/reference/devtools_panels#method-ExtensionSidebarPane-setPage
[api-panels]: /docs/extensions/reference/devtools_panels
[api-recorder]: /docs/extensions/reference/devtools_recorder
[api-runtime-connect]: /docs/extensions/reference/runtime#method-connect
[api-runtime-onconnect]: /docs/extensions/reference/runtime#event-onConnect
[api-runtime-sendmessage]: /docs/extensions/reference/runtime#method-sendMessage
[api-runtime]: /docs/extensions/reference/runtime
[api-scripting-executescript]: /docs/extensions/reference/scripting#method-executeScript
[api-scripting-sendmessage]: /docs/extensions/reference/scripting#method-sendMessage
[doc-message-passing]: /docs/extensions/mv3/messaging
[doc-samples]: /docs/extensions/samples/
[doc-utilities]: /docs/devtools/console/utilities/
[gh-coquette]: https://github.com/thomasboyt/coquette-inspect
[gh-devtools-messaging]: https://github.com/GoogleChrome/devtools-docs/issues/143
[gh-ember-dt]: https://github.com/emberjs/ember-inspector
[gh-polymer-dt]: https://github.com/PolymerLabs/polymer-devtools-extension
[gh-react-dt]: https://github.com/facebook/react/tree/main/scripts/devtools
[gh-soak]: https://github.com/RedRibbon/SOAK/blob/ffdfad68ffb6051fa2d4e9db0219b3d234ac1ae8/pages/devtools.js#L6-L8
[group-devtools]: https://groups.google.com/g/google-chrome-developer-tools
[header-injecting]: #injecting
[header-selected-element]: #selected-element
[mdn-postmessage]: https://developer.mozilla.org/docs/Web/API/Window.postMessage
[mdn-web-apis]: https://developer.mozilla.org/docs/Web/API

