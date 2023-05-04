---
api: sidePanel
---

{% Aside 'important' %}
The Side Panel API will launch in [Chrome 114](https://chromiumdash.appspot.com/schedule), currently in beta and available in stable in late May 2023.
{% endAside %}

## Overview {: #overview }

Chrome features a built-in side panel that enables users to view more information alongside the main content of a webpage. The Side Panel API allows extensions to display their own UI in the side panel. 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/2uFG8qxM7cqyMuXWlD9R.png", alt="Side panel drop-down menu", width="291", height="366" %}
  <figcaption>
    Chrome browser side panel UI.
  </figcaption>
</figure>

Some features include:

- The side panel remains open when navigating between tabs (if set to do so).
- It can be available only on specific websites.
- As an extension page, side panels have access to all Chrome APIs.
- Users can choose which side to display the panel on within Chrome's settings.

## Manifest {: #manifest }

To use the Side Panel API, add the `"sidePanel"` permission in the extension [manifest][doc-manifest] file:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My side panel extension",
  ...
  "permissions": [
    "sidePanel"
  ]
}
```

## Use cases {: #use-cases }

The following sections demonstrate some common use cases for the Side Panel API. See [Extension samples](#examples) for complete extension examples.

### Display the same side panel on every site {: #every-site }

The side panel can be set initially from the `"default_path"` property in the `"side_panel"` key of the manifest to display the same side panel on every site. This should point to a relative path within the extension directory.

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My side panel extension",
  ...
  "side_panel": {
    "default_path": "sidepanel.html"
  }
  ...
}
```

{% Label %}sidepanel.html:{% endLabel %}

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Sidepanel</title>
  </head>
  <body>
    <h1>All sites sidepanel extension</h1>
    <p>This side panel is enabled on all sites</p>
  </body>
</html>
```

### Enable a side panel on a specific site {: #by-site }

An extension can use [`sidepanel.setOptions()`][sidepanel-setoptions] to enable a side panel on a specific tab. This example uses [`chrome.tabs.onUpdated()`][tabs-onupdated] to listen for any updates made to the tab. It checks if the URL is [www.google.com](https://www.google.com) and enables the side panel. Otherwise, it disables it. 

{% Label %}service-worker.js:{% endLabel %}

```js
const GOOGLE_ORIGIN = 'https://www.google.com';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (url.origin === GOOGLE_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});
```

When a user temporarily switches to a tab where the side panel is not enabled, the side panel will be hidden. It will automatically show again when the user switches to a tab where it was previously open.

When the user navigates to a site where the side panel is not enabled, the side panel will close and the extension will not show in the side panel drop-down menu.

For a complete example, see the [Tab-specific side panel][sample-sp-google] sample. 

### Enable the action icon to open the side panel {: #open-action-icon } 

Developers can allow users to open the side panel when they click on the action toolbar icon with [`sidePanel.setPanelBehavior()`][sidepanel-set-behavior]. First, declare the `"action"` key in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json/3-5
{
  "name": "My side panel extension",
  ...
   "action": {
    "default_title": "Click to open panel"
  },
  ...
}
```

Now, let's add this functionality to the previous example:

{% Label %}service-worker.js:{% endLabel %}

```js
const GOOGLE_ORIGIN = 'https://www.google.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
...
```

{% Aside 'success' %}
With `openPanelOnActionClick()` enabled, you can also open the side panel using a keyboard shortcut by specifying an [action command][action-commands] in the manifest as featured in the [Tab-specific side panel][sample-sp-google] sample.
{% endAside %}

### Switch to a different panel {: #multi-panels }

Extensions can use [`sidepanel.getOptions()`][sidepanel-getoptions] to retrieve the current side panel. The following example sets a welcome side panel on [`runtime.onInstalled()`][runtime-oninstalled]. Then when the user navigates to a different tab, it replaces it with the main side panel.

{% Label %}service-worker.js:{% endLabel %}

```js
const welcomePage = 'sidepanels/welcome-sp.html';
const mainPage = 'sidepanels/main-sp.html';

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: welcomePage });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const { path } = await chrome.sidePanel.getOptions({ tabId });
  if (path === welcomePage) {
    chrome.sidePanel.setOptions({ path: mainPage });
  }
});
```

See the [Multiple side panels][sample-sp-multiple] for a complete sample.

## Side panel user experience {: #user-experience }

Users will see Chrome's built-in side panels first. Each side panel displays the extension's icon in the side panel menu. If no icons are included, it will show a placeholder icon with the first letter of the extension's name.

### Opening the side panel {: #open }

Navigating to the side panel menu
: Users can find available side panels on the side panel menu. Then, they can choose an extension from the drop-down menu.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/2uFG8qxM7cqyMuXWlD9R.png", alt="Side panel drop-down menu", width="291", height="366" %}
  <figcaption>
    Chrome browser side panel UI.
  </figcaption>
</figure>

Using the action toolbar icon
: Users can open the side panel by clicking on [the action icon](#open-action-icon) if it's enabled.

Using a keyboard shortcut
: Users can open the side panel by pressing a keyboard shortcut if the [action command][action-commands] and the [action icon](#open-action-icon) are enabled.


## Extension samples {: #examples }

For more Side Panel API extensions demos, explore any of the following extensions:

- [Site-specific side panel][sample-sp-google].
- [Multiple side panels][sample-sp-multiple].
- [Global side panel][sample-sp-global].
- [Dictionary side panel][sample-sp-dictionary].

[action-commands]: /docs/extensions/reference/commands/#action-commands
[api-action]: /docs/extensions/reference/action/
[doc-manifest]: /docs/extensions/mv3/manifest/
[runtime-oninstalled]: /docs/extensions/reference/runtime/#event-onInstalled
[sample-sp-dictionary]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary
[sample-sp-global]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-global
[sample-sp-google]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-site-specific
[sample-sp-multiple]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.sidepanel-multiple
[sidepanel-getoptions]:#method-getOptions
[sidepanel-set-behavior]: #method-setPanelBehavior
[sidepanel-setoptions]: #method-setOptions
[tabs-onupdated]: /docs/extensions/reference/tabs/#event-onUpdated



