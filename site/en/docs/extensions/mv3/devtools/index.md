---
layout: "layouts/doc-post.njk"
title: "Extending DevTools"
date: 2012-09-17
updated: 2020-08-25
description: How to create a Chrome Extension that adds functionality to Chrome DevTools.
---

{% include 'partials/extensions/mv2page-in-mv3.md' %}

## Overview {: #overview }

A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels and
sidebars, interact with the inspected page, get information about network requests, and more. View
[featured DevTools extensions][1]. DevTools extensions have access to an additional set of
DevTools-specific extension APIs:

- [`devtools.inspectedWindow`][2]
- [`devtools.network`][3]
- [`devtools.panels`][4]

A DevTools extension is structured like any other extension: it can have a background page, content
scripts, and other items. In addition, each DevTools extension has a DevTools page, which has access
to the DevTools APIs.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/kcLMpTY6qtez03TVSqt4.png",
       alt="Architecture diagram showing DevTools page communicating with the
       inspected window and the background page. The background page is shown
       communicating with the content scripts and accessing extension APIs.
       The DevTools page has access to the DevTools APIs, for example, creating panels.",
       height="556", width="522" %}

## The DevTools page {: #devtools-page }

An instance of the extension's DevTools page is created each time a DevTools window opens. The
DevTools page exists for the lifetime of the DevTools window. The DevTools page has access to the
DevTools APIs and a limited set of extension APIs. Specifically, the DevTools page can:

- Create and interact with panels using the [`devtools.panels`][5] APIs.
- Get information about the inspected window and evaluate code in the inspected window using the
  [`devtools.inspectedWindow`][6] APIs.
- Get information about network requests using the [`devtools.network`][7] APIs.

The DevTools page cannot use most of the extensions APIs directly. It has access to the same subset
of the [`extension`][8] and [`runtime`][9] APIs that a content script has access to. Like a content
script, a DevTools page can communicate with the background page using [Message Passing][10]. For an
example, see [Injecting a Content Script][11].

## Creating a DevTools extension {: #creating }

To create a DevTools page for your extension, add the `devtools_page` field in the extension
manifest:

```json
{
  "name": ...
  "version": "1.0",
  "minimum_chrome_version": "10.0",
  "devtools_page": "devtools.html",
  ...
}
```

An instance of the `devtools_page` specified in your extension's manifest is created for every
DevTools window opened. The page may add other extension pages as panels and sidebars to the
DevTools window using the [`devtools.panels`][12] API.

{% Aside %}

The `devtools_page` field must point to an HTML page. This differs from the `background` field, used
for specifying a background page, which lets you specify JavaScript files directly. The DevTools
page must be local to your extension, so it is best to specify it using a relative URL.

{% endAside %}

The `chrome.devtools.*` API modules are available only to the pages loaded within the DevTools
window. Content scripts and other extension pages do not have these APIs. Thus, the APIs are
available only through the lifetime of the DevTools window.

There are also some DevTools APIs that are still experimental. Refer to [chrome.experimental.\*
APIs][13] for the list of experimental APIs and guidelines on how to use them.

## DevTools UI elements: panels and sidebar panes {: #devtools-ui }

In addition to the usual extension UI elements, such as browser actions, context menus and popups, a
DevTools extension can add UI elements to the DevTools window:

- A _panel_ is a top-level tab, like the Elements, Sources, and Network panels.
- A _sidebar pane_ presents supplementary UI related to a panel. The Styles, Computed Styles, and
  Event Listeners panes on the Elements panel are examples of sidebar panes. (Note that the
  appearance of sidebar panes may not match the image, depending on the version of Chrome you're
  using, and where the DevTools window is docked.)

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png",
    className="screenshot",
    alt="DevTools window showing Elements panel and Styles sidebar pane.", height="302", width="770" %}

Each panel is its own HTML file, which can include other resources (JavaScript, CSS, images, and so
on). Creating a basic panel looks like this:

```js
chrome.devtools.panels.create("My Panel",
    "MyPanelIcon.png",
    "Panel.html",
    function(panel) {
      // code invoked on panel creation
    }
);
```

JavaScript executed in a panel or sidebar pane has access to the the same APIs as the DevTools page.

Creating a basic sidebar pane for the Elements panel looks like this:

```js
chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
    function(sidebar) {
        // sidebar initialization code here
        sidebar.setObject({ some_data: "Some data to show" });
});
```

There are several ways to display content in a sidebar pane:

- HTML content. Call [`setPage`][14] to specify an HTML page to display in the pane.
- JSON data. Pass a JSON object to [`setObject`][15].
- JavaScript expression. Pass an expression to [`setExpression`][16]. DevTools evaluates the
  expression in the context of the inspected page, and displays the return value.

For both `setObject` and `setExpression`, the pane displays the value as it would appear in the
DevTools console. However, `setExpression` lets you display DOM elements and arbitrary JavaScript
objects, while `setObject` only supports JSON objects.

## Communicating between extension components {: #solutions }

The following sections describe some typical scenarios for communicating between the different
components of a DevTools extension.

### Injecting a content script {: #injecting }

The DevTools page can't call [`scripting.executeScript`][17] directly. To inject a content script from
the DevTools page, you must retrieve the ID of the inspected window's tab using the
[`inspectedWindow.tabId`][18] property and send a message to the background page. From the
background page, call [`scripting.executeScript`][19] to inject the script.

{% Aside %}

If a content script has already been injected, you can add additional context scripts using the
`eval` method. See [Passing the Selected Element to a Content Script][20] for more information.

{% endAside %}

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
        chrome.scripting.executeScript(message.tabId,
            { file: message.scriptToInject });
    }
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
         devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});
```

### Evaluating JavaScript in the inspected window {: #evaluating-js }

You can use the [`inspectedWindow.eval`][21] method to execute JavaScript code in the context of the
inspected page. You can invoke the `eval` method from a DevTools page, panel or sidebar pane.

By default, the expression is evaluated in the context of the main frame of the page. Now, you may
be familiar with the DevTools [commandline API][22] features like element inspection
(`inspect(elem)`), breaking on functions (`debug(fn)`), copying to clipboard (`copy()`) and more.
`inspectedWindow.eval()` uses the same script execution context and options as the code typed at the
DevTools console, which allows access to these APIs within the eval. For example, [SOAK][23] uses it
for inspecting an element:

```js
chrome.devtools.inspectedWindow.eval(
  "inspect($$('head script[data-soak=main]')[0])",
  function(result, isException) { }
);
```

Alternatively, use the `useContentScriptContext: true` option for `inspectedWindow.eval()` to
evaluate the expression in the same context as the content scripts. Calling `eval` with
`useContentScriptContext: true` does not _create_ a content script context, so you must load a
context script before calling `eval`, either by calling `executeScript` or by specifying a content
script in the `manifest.json` file.

Once the context script context exists, you can use this option to inject additional content
scripts.

The `eval` method is powerful when used in the right context and dangerous when used
inappropriately. Use the [`scripting.executeScript`][24] method if you don't need access to the
JavaScript context of the inspected page. For detailed cautions and a comparison of the two methods,
see [`inspectedWindow`][25].

### Passing the selected element to a content script {: #selected-element }

The content script doesn't have direct access to the current selected element. However, any code you
execute using [`inspectedWindow.eval`][26] has access to the DevTools console and command-line APIs.
For example, in evaluated code you can use `$0` to access the selected element.

To pass the selected element to a content script:

- Create a method in the content script that takes the selected element as an argument.
- Call the method from the DevTools page using [`inspectedWindow.eval`][27] with the
  `useContentScriptContext: true` option.

The code in your content script might look something like this:

```js
function setSelectedElement(el) {
    // do something with the selected element
}
```

Invoke the method from the DevTools page like this:

```js
chrome.devtools.inspectedWindow.eval("setSelectedElement($0)",
    { useContentScriptContext: true });
```

The `useContentScriptContext: true` option specifies that the expression must be evaluated in the
same context as the content scripts, so it can access the `setSelectedElement` method.

### Getting a reference panel's `window` {: #panel-window }

To `postMessage` from a devtools panel, you'll need a reference to its `window` object.
Get a panel's iframe window in from the the [`panel.onShown`][28] event handler:

```js
onShown.addListener(function callback)
extensionPanel.onShown.addListener(function (extPanelWindow) {
    extPanelWindow instanceof Window; // true
    extPanelWindow.postMessage( // …
});
```

### Messaging from content scripts to the DevTools page {: #content-script-to-devtools }

Messaging between the DevTools page and content scripts is indirect, by way of the background page.

When sending a message _to_ a content script, the background page can use the
[`tabs.sendMessage`][29] method, which directs a message to the content scripts in a specific tab,
as shown in [Injecting a Content Script][30].

When sending a message _from_ a content script, there is no ready-made method to deliver a message
to the correct DevTools page instance associated with the current tab. As a workaround, you can have
the DevTools page establish a long-lived connection with the background page, and have the
background page keep a map of tab IDs to connections, so it can route each message to the correct
connection.

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
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});
```

### Messaging from injected scripts to the DevTools page {: #evaluated-scripts-to-devtools }

While the above solution works for content scripts, code that is injected directly into the page
(e.g. through appending a `<script>` tag or through [`inspectedWindow.eval`][31]) requires a
different strategy. In this context, [`runtime.sendMessage`][32] will not pass messages to the
background script as expected.

As a workaround, you can combine your injected script with a content script that acts as an
intermediary. To pass messages to the content script, you can use the [`window.postMessage`][33]
API. Here's an example, assuming the background script from the previous section:

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
      !message.source === 'my-devtools-extension') {
    return;
  }

  chrome.runtime.sendMessage(message);
});
```

Your message will now flow from the injected script, to the content script, to the background
script, and finally to the DevTools page.

You can also consider [two alternative message passing techniques here][34].

### Detecting when DevTools opens and closes {: #detecting-open-close }

If your extension needs to track whether the DevTools window is open, you can add an [onConnect][35]
listener to the background page, and call [connect][36] from the DevTools page. Since each tab can
have its own DevTools window open, you may receive multiple connect events. To track whether any
DevTools window is open, you need to count the connect and disconnect events as shown below:

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

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});
```

<!-- TODO this section's ID was previously #examples which is a duplicate of another section -->

## DevTools extension examples

Browse the source of these DevTools extension examples:

- [Polymer Devtools Extension][37] - uses many helpers running in the host page to query DOM/JS
  state to send back to the custom panel.
- [React DevTools Extension][38] - Uses a submodule of Blink to reuse DevTools UI components.
- [Ember Inspector][39] - Shared extension core with adapters for both Chrome and Firefox.
- [Coquette-inspect][40] - A clean React-based extension with a debugging agent injected into the
  host page.
- our [DevTools Extension Gallery][41] and [Sample Extensions][42] have more worthwhile apps to
  install, try out, and learn from.

## More information {: #more }

For information on the standard APIs that extensions can use, see [chrome.\* APIs][43].

[Give us feedback!][45] Your comments and suggestions help us improve the APIs.

## Examples {: #examples }

You can find examples that use DevTools APIs in [Samples][46].

[1]: /docs/devtools/docs/extensions-gallery
[2]: /docs/extensions/mv3/devtools.inspectedWindow
[3]: /docs/extensions/mv3/devtools.network
[4]: /docs/extensions/mv3/devtools.panels
[5]: /docs/extensions/mv3/devtools.panels
[6]: /docs/extensions/mv3/devtools.inspectedWindow
[7]: /docs/extensions/mv3/devtools.network
[8]: /docs/extensions/extension
[9]: /docs/extensions/runtime
[10]: /docs/extensions/mv3/messaging
[11]: #injecting
[12]: /docs/extensions/mv3/devtools.panels
[13]: /docs/extensions/reference
[14]: /docs/extensions/mv3/devtools.panels#method-ExtensionSidebarPane-setPage
[15]: /docs/extensions/mv3/devtools.panels#method-ExtensionSidebarPane-setObject
[16]:
  /extensions/devtools.panels#method-ExtensionSidebarPane-setExpression
[17]: /docs/extensions/scripting#method-executeScript
[18]: /docs/extensions/mv3/devtools.inspectedWindow#property-tabId
[19]: /docs/extensions/scripting#method-executeScript
[20]: #selected-element
[21]: /docs/extensions/mv3/devtools.inspectedWindow#method-eval
[22]: /docs/devtools/docs/commandline-api
[23]:
  https://github.com/RedRibbon/SOAK/blob/ffdfad68ffb6051fa2d4e9db0219b3d234ac1ae8/pages/devtools.js#L6-L8
[24]: /docs/extensions/scripting#method-executeScript
[25]: /docs/extensions/mv3/devtools.inspectedWindow
[26]: /docs/extensions/mv3/devtools.inspectedWindow#method-eval
[27]: /docs/extensions/mv3/devtools.inspectedWindow#method-eval
[28]: /docs/extensions/reference/devtools_panels#event-ExtensionPanel-onShown
[29]: /docs/extensions/scripting#method-sendMessage
[30]: #injecting
[31]: /docs/extensions/mv3/devtools.inspectedWindow#method-eval
[32]: /docs/extensions/runtime#method-sendMessage
[33]: https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
[34]: https://github.com/GoogleChrome/devtools-docs/issues/143
[35]: /docs/extensions/runtime#event-onConnect
[36]: /docs/extensions/runtime#method-connect
[37]: https://github.com/PolymerLabs/polymer-devtools-extension
[38]: https://github.com/facebook/react-devtools
[39]: https://github.com/emberjs/ember-inspector
[40]: https://github.com/thomasboyt/coquette-inspect
[41]: /docs/devtools/docs/extensions-gallery
[42]: /docs/devtools/docs/sample-extensions
[43]: /docs/extensions/reference
[45]: http://groups.google.com/group/google-chrome-developer-tools/topics
[46]: /extensions/samples#devtools
