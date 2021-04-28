---
api: devtools.panels
---

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

Each extension panel and sidebar is displayed as a separate HTML page. All extension pages displayed
in the Developer Tools window have access to all modules in `chrome.devtools` API, as well as to
[chrome.extension][2] API. Other extension APIs are not available to the pages within Developer
Tools window, but you may invoke them by sending a request to the background page of your extension,
similarly to how it's done in the [content scripts][3].

You can use the [`devtools.panels.setOpenResourceHandler`][4] method to install a callback function
that handles user requests to open a resource (typically, a click on a resource link in the
Developer Tools window). At most one of the installed handlers gets called; users can specify (using
the Developer Tools Settings dialog) either the default behavior or an extension to handle resource
open requests. If an extension calls `setOpenResourceHandler()` multiple times, only the last
handler is retained.

## Examples

The following code adds a panel contained in `Panel.html`, represented by `FontPicker.png` on the
Developer Tools toolbar and labeled as _Font Picker_:

```js
chrome.devtools.panels.create("Font Picker",
                              "FontPicker.png",
                              "Panel.html"
                              function(panel) { ... });
```

The following code adds a sidebar pane contained in `Sidebar.html` and titled _Font Properties_ to
the Elements panel, then sets its height to `8ex`:

```js
chrome.devtools.panels.elements.createSidebarPane("Font Properties",
  function(sidebar) {
    sidebar.setPage("Sidebar.html");
    sidebar.setHeight("8ex");
  }
);
```

This screenshot demonstrates the effect the above examples would have on Developer Tools window:

![Extension icon panel on DevTools toolbar](devtools-panels.png)

You can find examples that use this API in [Samples][5].

[1]: /docs/extensions/mv3/devtools
[2]: /docs/extensions/reference/extension/
[3]: /docs/extensions/mv3/overview#contentScripts
[4]: /docs/extensions/reference/devtools_panels#method-setOpenResourceHandler
[5]: https://github.com/GoogleChrome/chrome-extensions-samples
