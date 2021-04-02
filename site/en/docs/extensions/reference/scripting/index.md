---
api: scripting
---

You can use the chrome.scripting API to inject JavaScript and CSS into websites. This is similar to
what you can do using [content scripts], but by using the chrome.scripting API, extensions can make
decisions at runtime.

{% Aside %}
See [Using chrome.scripting][howto-scripting] for an expanded explanation of how to use this
API.
{% endAside %}

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

## Examples

The following example shows how you can inject a JavaScript file into the current tab:

```js
const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      files: ['script.js'],
    },
    () => { ... });
```

For additional examples and more about injecting scripts, see [Using
chrome.scripting][howto-scripting].

[content scripts]: /docs/extensions/mv3/content_scripts/
[howto-scripting]: /docs/extensions/api-howto/scripting/
[manifest]: /docs/extensions/mv3/manifest
