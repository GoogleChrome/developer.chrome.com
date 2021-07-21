---
api: devtools.inspectedWindow
---

Use `chrome.devtools.inspectedWindow` to interact with the inspected window: obtain the tab ID for
the inspected page, evaluate the code in the context of inspected window, reload the page, or obtain
the list of resources within the page.

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

The [`tabId`][2] property provides the tab identifier that you can use with the [`chrome.tabs.*`][3]
API calls. However, please note that `chrome.tabs.*` API is not exposed to the Developer Tools
extension pages due to security considerations—you will need to pass the tab ID to the background
page and invoke the `chrome.tabs.*` API functions from there.

The `reload` method may be used to reload the inspected page. Additionally, the caller can specify
an override for the user agent string, a script that will be injected early upon page load, or an
option to force reload of cached resources.

Use the `getResources` call and the `onResourceContent` event to obtain the list of resources
(documents, stylesheets, scripts, images etc) within the inspected page. The `getContent` and
`setContent` methods of the `Resource` class along with the `onResourceContentCommitted` event may
be used to support modification of the resource content, for example, by an external editor.

## Executing Code in the Inspected Window {: #executing-code }

The `eval` method provides the ability for extensions to execute JavaScript code in the context of
the inspected page. This method is powerful when used in the right context and dangerous when used
inappropriately. Use the [`tabs.executeScript`][4] method unless you need the specific functionality
that the `eval` method provides.

Here are the main differences between the `eval` and `tabs.executeScript` methods:

- The `eval` method does not use an isolated world for the code being evaluated, so the JavaScript
  state of the inspected window is accessible to the code. Use this method when access to the
  JavaScript state of the inspected page is required.
- The execution context of the code being evaluated includes the [Developer Tools console API][5].
  For example, the code can use `inspect` and `$0`.
- The evaluated code may return a value that is passed to the extension callback. The returned value
  has to be a valid JSON object (it may contain only primitive JavaScript types and acyclic
  references to other JSON objects). _Please observe extra care while processing the data received
  from the inspected page—the execution context is essentially controlled by the inspected page; a
  malicious page may affect the data being returned to the extension._

{% Aside 'caution' %}

**Important:** Due to the security considerations explained above, the [`tabs.executeScript`][4]
method is the preferred way for an extension to access DOM data of the inspected page in cases where
the access to JavaScript state of the inspected page is not required.

{% endAside %}

Note that a page can include multiple different JavaScript execution contexts. Each frame has its
own context, plus an additional context for each extension that has content scripts running in that
frame.

By default, the `eval` method executes in the context of the main frame of the inspected page.

The `eval` method takes an optional second argument that you can use to specify the context in which
the code is evaluated. This _options_ object can contain one or more of the following keys:

`frameURL`

: Use to specify a frame other than the inspected page's main frame.

`contextSecurityOrigin`

: Use to select a context within the specified frame according to its [web origin][7].

`useContentScriptContext`

: If true, execute the script in the same context as the extensions's content scripts. (Equivalent to
  specifying the extensions's own web orgin as the context security origin.) This can be used to
  exchange data with the content script.

## Examples

The following code checks for the version of jQuery used by the inspected page:

```js
chrome.devtools.inspectedWindow.eval(
  "jQuery.fn.jquery",
  function(result, isException) {
    if (isException) {
      console.log("the page is not using jQuery");
    } else {
      console.log("The page is using jQuery v" + result);
    }
  }
);
```

You can find more examples that use Developer Tools APIs in [Samples][8].

[1]: /docs/extensions/mv3/devtools
[2]: #property-tabId
[3]: /docs/extensions/reference/tabs
[4]: /docs/extensions/reference/tabs#method-executeScript
[5]: https://developers.google.com/web/tools/chrome-devtools/
[7]: https://www.ietf.org/rfc/rfc6454.txt
[8]: /docs/extensions/mv3/samples#search:devtools
