---
api: scripting
---

## Manifest

In order to use the `chrome.scripting` API, you need to specify a
`"manifest_version"` of `3` or higher and include the `"scripting"` permission
in your [manifest file][manifest].

```json
{
  "name": "Scripting Extension",
  "manifest_version": 3,
  "permissions": ["scripting"],
  ...
}
```

## Usage

You can use the `chrome.scripting` API to inject JavaScript and CSS into
websites. This is similar to what you can do with
[content scripts][contentscripts], but by using the `chrome.scripting` API,
extensions can make decisions at runtime.

### Injection targets

You can use the `target` parameter to specify a target to inject JavaScript or
CSS into.

The only required field is `tabId`. By default, an injection will run in the
main frame of the specified tab.

```js
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      files: ['script.js'],
    },
    () => { ... });
```

To run in all frames of the specified tab, you can set the `allFrames` boolean
to `true`.

```js
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId, allFrames: true},
      files: ['script.js'],
    },
    () => { ... });
```

You can also inject into specific frames of a tab by specifying individual frame
IDs. For more information on frame IDs, see the
[webNavigation API][webnavigation].

```js
const tabId = getTabId();
const frameIds = [frameId1, frameId2];
chrome.scripting.executeScript(
    {
      target: {tabId: tabId, frameIds: frameIds},
      files: ['script.js'],
    },
    () => { ... });
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
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      files: ['script.js'],
    },
    () => { ... });
```

{% Aside %}
Note: Currently, a maximum of a single file is supported.
{% endAside %}

#### Runtime functions

When injecting JavaScript with `scripting.executeScript()`, you can specify a
function to be executed instead of a file. This function should be a function
variable available to the current extension context.

```js
function getTitle() {
  return document.title;
}
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      function: getTitle,
    },
    () => { ... });
```

This function will be executed in the context of injection target. However,
this will not carry over any of the current execution context of the function.
As such, bound parameters (including the `this` object) and
externally-referenced variables will result in errors.  For instance, the
following code will not work, and will throw a ReferenceError because `color`
is undefined when the function executes:

```js
const color = getUserColor();
function changeBackgroundColor() {
  document.body.style.backgroundColor = color;
}
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      function: changeBackgroundColor,
    },
    () => { ... });
```

You can work around this by using the [Storage API][storage] or by
[passing messages][messaging].

#### Runtime strings

If injecting CSS within a page, you can also specify a string to be used in the
`css` property. This option is only available for `scripting.insertCSS()`; you
can't execute a string using `scripting.executeScript()`.

```js
const css = 'body { background-color = "red"; }';
const tabId = getTabId();
chrome.scripting.insertCSS(
    {
      target: {tabId: tabId},
      css: css,
    },
    () => { ... });
```

### Handling results

The results of executing JavaScript are passed to the extension. A single
result is included per-frame. The main frame is guaranteed to be the first
index in the resulting array; all other frames are in a non-deterministic
order.

```js
function getTitle() {
  return document.title;
}
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId, allFrames: true},
      function: getTitle,
    },
    (injectionResults) => {
      for (const frameResult of injectionResults)
        console.log('Frame Title: ' + frameResult.result);
    });
```

`scripting.insertCSS()` does not return any results.

[manifest]: /docs/extensions/mv3/manifest
[contentscripts]: /docs/extensions/mv3/content_scripts
[webnavigation]: /docs/extensions/reference/webNavigation
[storage]: /docs/extensions/reference/storage
[messaging]: /docs/extensions/mv3/messaging
