---
api: sidePanel
---

## Overview {: #overview }

Chrome features a built-in side panel that allows users to view more information alongside the main content of a webpage. The SidePanel API allows extensions to add their own panels to the Chrome browser. Some features include:

- The side panel is displayed on the right side of the page.
- It remains open when navigating between tabs (if set to do so).
- The side panel can be enabled only on specific websites.
- As an extension page, side panels have access to all Chrome APIs.

## Manifest {: #manifest }

In order to use the SidePanel API, you must include the `"sidePanel"` permission in the extension manifest. For example:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My side panel extension",
  ...
  "permissions": [
    "sidePanel"
  ]
  ...
}
```

## Use cases {: #use-cases }

The following sections demonstrate some common use cases for the SidePanel API. For complete extension samples, skip to [examples](#examples).

### Display the same side panel on every site {: #every-site }

The side panel can optionally be set initially from the `“default_path”` property in the `“side_panel”` key of the manifest to display the same side panel on every site. This should point to a relative path within the extension directory.

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
//TODO
```

### Enable a side panel on a specific site {: #by-site }

An extension can enable the side panel when the user is on a specific site by using `sidepanel.setOptions()`. The following example enables the side panel only on www.google.com. 

{% Label %}sidepanel.html:{% endLabel %}

```html

```


{% Label %}sidepanel.js:{% endLabel %}

```js

```

When the user navigates to a site where the side panel is not enabled, the side panel will close and not be displayed on the drop-down menu.

### Switch from one panel to another {: #multi-panels }

Another way to switch between different side panels is by using `sidepanel.getOptions()` to retrieve the current side panel. The following example sets a welcome side panel, then when the user navigates to a different tab, it replaces it with the main side panel.

{% Label %}sidepanel.js:{% endLabel %}

```js

```

### Use the action icon to open the side panel {: #open-action-icon } 

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My side panel extension",
  ...
  "permissions": [
    "sidePanel"
  ],
  "action":{},
  ...
}
```

{% Label %}sidepanel.js:{% endLabel %}

```js
chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true})
```

## How to open a side panel {: #user-experience }

Users can view the available panels on the Side panel menu <image here>. Then they can choose a side panel from the drop-down menu. Chrome displays the built-in side panels first.

Each side panel displays the extension's icon in the side panel menu. Otherwise, it will show a placeholder icon with the first letter of the extension's name. 

Developers can also allow users to open the side panel [using the action icon](#open-action-icon).

## Extension samples
// TODO: Links to GH repo samples



