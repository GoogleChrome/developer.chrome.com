---
api: scripting
---

## Manifest {: #manifest }

To use the `chrome.scripting` API, declare the `"scripting"` permission in the [manifest][manifest] plus the host permissions for the pages to inject scripts into. Use the [`"host_permissions"`][match-patterns] key or the [activeTab][activetab] permission, which grants temporary host permissions. The following example uses the activeTab permission.

```json
{
  "name": "Scripting Extension",
  "manifest_version": 3,
  "permissions": ["scripting", "activeTab"],
  ...
}
```

## Usage

You can use the `chrome.scripting` API to inject JavaScript and CSS into
websites. This is similar to what you can do with [content
scripts][contentscripts]. But by using the [`chrome.scripting`](/docs/extensions/reference/scripting/) namespace, extensions
can make decisions at runtime.

### Injection targets

You can use the `target` parameter to specify a target to inject JavaScript or
CSS into.

The only required field is `tabId`. By default, an injection will run in the
main frame of the specified tab.

```js
function getTabId() { ... }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      files : [ "script.js" ],
    })
    .then(() => console.log("script injected"));
```

To run in all frames of the specified tab, you can set the `allFrames` boolean
to `true`.

```js
function getTabId() { ... }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId(), allFrames : true},
      files : [ "script.js" ],
    })
    .then(() => console.log("script injected in all frames"));
```

You can also inject into specific frames of a tab by specifying individual frame
IDs. For more information on frame IDs, see the [`chrome.webNavigation`
API][webnavigation].

```js
function getTabId() { ... }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId(), frameIds : [ frameId1, frameId2 ]},
      files : [ "script.js" ],
    })
    .then(() => console.log("script injected on target frames"));
```

{% Aside %}

You cannot specify both the `frameIds` and `allFrames` properties.

{% endAside %}

### Injected code

Extensions can specify the code to be injected either via an external file or a
runtime variable.

#### Files

Files are specified as strings that are paths relative to the extension's root
directory. The following code will inject the file `script.js` into the main
frame of the tab.

```js
function getTabId() { ... }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      files : [ "script.js" ],
    })
    .then(() => console.log("injected script file"));
```

#### Runtime functions

When injecting JavaScript with `scripting.executeScript()`, you can specify a
function to be executed instead of a file. This function should be a function
variable available to the current extension context.

```js
function getTabId() { ... }
function getTitle() { return document.title; }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      func : getTitle,
    })
    .then(() => console.log("injected a function"));
```

```js
function getTabId() { ... }
function getUserColor() { ... }

function changeBackgroundColor() {
  document.body.style.backgroundColor = getUserColor();
}

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      func : changeBackgroundColor,
    })
    .then(() => console.log("injected a function"));
```

You can work around this by using the `args` property:

```js
function getTabId() { ... }
function getUserColor() { ... }
function changeBackgroundColor(backgroundColor) {
  document.body.style.backgroundColor = backgroundColor;
}

chrome.scripting
    .executeScript({
      target : {tabId : getTabId()},
      func : changeBackgroundColor,
      args : [ getUserColor() ],
    })
    .then(() => console.log("injected a function"));
```

#### Runtime strings

If injecting CSS within a page, you can also specify a string to be used in the
`css` property. This option is only available for `scripting.insertCSS()`; you
can't execute a string using `scripting.executeScript()`.

```js
function getTabId() { ... }
const css = "body { background-color: red; }";

chrome.scripting
    .insertCSS({
      target : {tabId : getTabId()},
      css : css,
    })
    .then(() => console.log("CSS injected"));
```

### Handling results

The results of executing JavaScript are passed to the extension. A single result
is included per-frame. The main frame is guaranteed to be the first index in the
resulting array; all other frames are in a non-deterministic order.

```js
function getTabId() { ... }
function getTitle() { return document.title; }

chrome.scripting
    .executeScript({
      target : {tabId : getTabId(), allFrames : true},
      func : getTitle,
    })
    .then(injectionResults => {
      for (const {frameId, result} of injectionResults) {
        console.log(`Frame ${frameId} result:`, result);
      }
    });
```

`scripting.insertCSS()` does not return any results.

#### Promises

If the resulting value of the script execution is a promise, Chrome will wait
for the promise to settle and return the resulting value.

```js
function getTabId() { ... }
async function addIframe() {
  const iframe = document.createElement("iframe");
  const loadComplete =
      new Promise(resolve => iframe.addEventListener("load", resolve));
  iframe.src = "https://example.com";
  document.body.appendChild(iframe);
  await loadComplete;
  return iframe.contentWindow.document.title;
}

chrome.scripting
    .executeScript({
      target : {tabId : getTabId(), allFrames : true},
      func : addIframe,
    })
    .then(injectionResults => {
      for (const frameResult of injectionResults) {
        const {frameId, result} = frameResult;
        console.log(`Frame ${frameId} result:`, result);
      }
    });
```

## Examples

### Unregister all dynamic content scripts

The following snippet contains a function that unregisters all dynamic content
scripts the extension has previously registered.

```js
async function unregisterAllDynamicContentScripts() {
  try {
    const scripts = await chrome.scripting.getRegisteredContentScripts();
    const scriptIds = scripts.map(script => script.id);
    return chrome.scripting.unregisterContentScripts(scriptIds);
  } catch (error) {
    const message = [
      "An unexpected error occurred while",
      "unregistering dynamic content scripts.",
    ].join(" ");
    throw new Error(message, {cause : error});
  }
}
```

{% Aside 'important' %}

Unregistering content scripts will not remove scripts or styles that have
already been injected.

{% endAside %}

To try the `chrome.scripting` API,
install the [scripting sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/scripting) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples)
repository.

[activetab]: /docs/extensions/mv3/manifest/activeTab/
[contentscripts]: /docs/extensions/mv3/content_scripts
[manifest]: /docs/extensions/mv3/manifest
[match-patterns]: /docs/extensions/mv3/match_patterns
[messaging]: /docs/extensions/mv3/messaging
[storage]: /docs/extensions/reference/storage
[webnavigation]: /docs/extensions/reference/webNavigation
