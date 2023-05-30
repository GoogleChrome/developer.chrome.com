---
layout: 'layouts/doc-post.njk'
title: Improve extension security
subhead: 'Improving security in Manifest V3'
description: 'The last of three sections describing changes needed for code that is not part of the extension service worker.'
date: 2023-03-08
---

{% Partial 'extensions/mv3-support.md' %}

This is the last of three sections describing changes needed for code that is not part of the extension service worker. It describes changes required to improve the security of extensions. The other two sections cover [updating your code](/docs/extensions/migrating/api-calls) needed for upgrading to Manifest V3 and [replacing blocking web requests](/docs/extensions/migrating/blocking-web-requests).

## Remove execution of arbitrary strings {: #remove-execution-of-strings }

You can no longer [execute external logic](/docs/extensions/mv3/intro/mv3-overview#remotely-hosted-code) using `executeScript()`, `eval()`, and `new Function()`.

- Move all external code (JS, Wasm, CSS) into your extension bundle.
- Update script and style references to load resources from the extension bundle.
- Use [`chrome.runtime.getURL()`](/docs/extensions/reference/runtime/#method-getURL) to build resource URLs at runtime.

The `executeScript()` method is now in the [`scripting`](/docs/extensions/reference/scripting/) namespace rather than the `tabs` namespace. For information on updating calls, see [Move executeScript()](/docs/extensions/upgrade-to-mv3/update-code#move-executescript).

## Remove remotely hosted code {: #remove-remote-code }

In Manifest V3, all of your extension's logic must be part of the extension package. You can no longer load and execute remotely hosted files. Examples include:

- JavaScript files pulled from the developer's server.
- Any library hosted on a [CDN][mdn-cdn].

Alternative approaches are available, depending on your use case and the reason for remote hosting. Here are approaches to consider:

Configuration-driven features and logic
: Your extension loads and caches a remote configuration (for example a JSON file) at runtime. The cached configuration determines which features are enabled.

Externalized logic with a remote service
: Your extension calls a remote web service. This lets you keep code private and change it as needed while avoiding the extra overhead of resubmitting to the Chrome Web Store.

Bundle third-party libraries
: Your extension includes minified files. Popular frameworks such as [React](https://reactjs.org/docs/cdn-links.html) and [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) have minified versions available for download. Include them in your bundle and reference them as you would any other script. For example:

```html
<script src="./react-dom.production.min.js"></script>
<link href="./bootstrap.min.css" rel="stylesheet">
```

To include a library in a service worker set the `"background.type"` to `"module"` in the manifest and use an `import` statement.

### Use external libraries in tab-injected scripts {: #use-external-libraries }

External libraries may no longer be loaded remotely. They must be part of your extension bundle. Load them at runtime by adding them to the `files` array when calling `executeScript()`. You can still load data remotely at runtime.

```js
chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['jquery-min.js', 'content-script.js']
});
```
### Inject a function {: #inject-func }

If you need more dynamism, the new `func` property in `scripting.executeScript()` allows you to inject a function as a content script and pass variables using the `args` property. 

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```js
let name = 'World!';
chrome.tabs.executeScript({
  code: `alert('Hello, ${name}!')`
});
```

{% CompareCaption %}
In a background script file.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```js
async function getCurrentTab() {/* ... */}
let tab = await getCurrentTab();

function showAlert(givenName) {
  alert(`Hello, ${givenName}`);
}

let name = 'World';
chrome.scripting.executeScript({
  target: {tabId: tab.id},
  func: showAlert,
  args: [name],
});
```

{% CompareCaption %}
In the background service worker.
{% endCompareCaption %}

{% endCompare %}
</div>

The [Chrome Extension Samples repo](https://github.com/GoogleChrome/chrome-extensions-samples.git) contains a [function injection example](https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/reference/mv3/intro/mv3-migration/content-scripts/popup.js) you can step through. An example of `getCurrentTab()` is in the [reference](/docs/extensions/reference/tabs/#get-the-current-tab) for that function.

## Update the content security policy {: #update-csp }

The `"content_security_policy"` has not been removed from the `manifest.json` file, but it is now a dictionary that supports two properties: `"extension_pages"` and [`"sandbox"`](/docs/extensions/mv3/manifest/sandbox/).

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
{
  ...
  "content_security_policy": "default-src 'self'"
  ...
}
```


{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
{
  ...
  "content_security_policy": {
    "extension_pages": "default-src 'self'",
    "sandbox": "..."
  }
  ...
}
```

{% endCompare %}
</div>

**`extension_pages`**:  Refers to contexts in your extension, including html files and service workers.

{% Aside %}
These page types are served from the `chrome-extension://` protocol. For instance, a page in your extension is `chrome-extension://EXTENSION_ID/foo.html`.
{% endAside %}

**`sandbox`**: Refers to any [sandboxed extension pages](/docs/extensions/mv3/manifest/sandbox) that your extension uses.

## Remove unsupported content security policies {: #remove-unsupported-csv }

Manifest V3 disallows certain content security policy values in the `"extension_pages"` field that were allowed in Manifest V2. Specifically Manifest V3 disallows those that allow remote code execution. The `script-src,` `object-src`, and `worker-src` directives may only have the following values:

*   `self`
*   `none`
*  `wasm-unsafe-eval`
*   Unpacked extensions only: any localhost source, (`http://localhost`,  `http://127.0.0.1`, or any port on those domains)

Content security policy values for `sandbox` have no such new restrictions.


[mdn-cdn]: https://developer.mozilla.org/docs/Glossary/CDN
