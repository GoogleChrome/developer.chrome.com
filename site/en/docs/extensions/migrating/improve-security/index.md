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
- Use a sandboxed iframe: `eval` and `new Function(...)` are still supported in sandboxed iframes. For more details read the [guide on sandboxed iframes][sandbox-eval]. 

The `executeScript()` method is now in the [`scripting`](/docs/extensions/reference/scripting/) namespace rather than the `tabs` namespace. For information on updating calls, see [Move executeScript()](/docs/extensions/upgrade-to-mv3/update-code#move-executescript).

There are a few special cases in which executing arbitrary strings is still possible:

-   [Inject remote hosted stylesheets into a web page using insertCSS][insert-css]
-   For extensions using `chrome.devtools`: [inspectWindow.eval][inspect-window-eval] allows executing JavaScript in the context of the inspected page.
-   Debugger extensions can use [chrome.debugger.sendCommand][send-command] to execute JavaScript in a debug target.

## Remove remotely hosted code {: #remove-remote-code }

In Manifest V3, all of your extension's logic must be part of the extension package. You can no longer load and execute remotely hosted files. Examples include:

- JavaScript files pulled from the developer's server.
- Any library hosted on a [CDN][mdn-cdn].

Alternative approaches are available, depending on your use case and the reason for remote hosting. Here are approaches to consider:

Configuration-driven features and logic
: Your extension loads and caches a remote configuration (for example a JSON file) at runtime. The cached configuration determines which features are enabled.

Externalized logic with a remote service
: Your extension calls a remote web service. This lets you keep code private and change it as needed while avoiding the extra overhead of resubmitting to the Chrome Web Store.

Embed remotely hosted code in a sandboxed iframe
: Remotely hosted code [is supported in sandboxed iframes][sandbox-eval]. However, this approach does not work if the code requires access to the embedding page's DOM.

Bundle third-party libraries
: If you are using a popular framework like React or Bootstrap which you were previously loading from an external server, you can download the minified files, add them to your project and import them locally. For example:
    ```html
    <script src="./react-dom.production.min.js"></script>
    <link href="./bootstrap.min.css" rel="stylesheet">
    ```
    In some cases, libraries, such as Firebase, will fetch additional code on a by need basis at runtime. In this case, you have to download all possible dynamic imports at build time. Here is an [example script that bundles Firebase using Rollup.js][firebase].

Look for other workarounds
: If the previous approaches don’t help with your use case you might have to either find an alternative solution (i.e. migrate to a different library) or find other ways to use the library's functionality. For example, in the case of Google Analytics, you can switch to the Google measurement protocol instead of using the official remote hosted JavaScript version as described in our [Google Analytics 4 guide][google-analytics].

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
[sandbox-eval]: /docs/extensions/mv3/sandboxingEval/
[insert-css]: /docs/extensions/reference/scripting/#method-insertCSS
[inspect-window-eval]: /docs/extensions/reference/devtools_inspectedWindow/
[send-command]: /docs/extensions/reference/debugger/#method-sendCommand
[firebase]: https://gist.github.com/patrickkettner/8c1a91b1b8f9502b3b67d874e7024a7b
[google-analytics]: /docs/extensions/mv3/tut_analytics/

