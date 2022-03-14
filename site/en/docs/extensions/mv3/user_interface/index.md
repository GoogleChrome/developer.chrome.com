---
layout: "layouts/doc-post.njk"
title: "Design the user interface"
date: 2018-03-16
updated: 2021-08-18
description: UI and design guidelines for Chrome Extensions.
---

The extension user interface should be purposeful and minimal. Just like extensions themselves, the
UI should customize or enhance the browsing experience without distracting from it.

This guide explores required and optional user interface features. Use it to understand how and when
to implement different UI elements within an extension.

## The action icon {: #action }

The [action][api-action] API controls the toolbar icon for your extension. It can open a [popup][section-popup] or trigger some functionality when it's [clicked][section-onclick]. The action icons are displayed in the browser toolbar to the right of the user's URL bar. 

After installation, by default, these appear in the extensions menu (the puzzle piece). Users can choose to 'pin' your extension icon to the toolbar.

{% Columns %}

{% Column %}
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/iouvm1a3lsQWGyg6fSMS.png", 
alt="Unpinned extension", width="300", height="174" %}

**Unpinned**
{% endColumn %}

{% Column %}
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KS09fVoCj3YWuIoH5EFn.png", 
alt="Pinned extension", width="300", height="182" %}

**Pinned**
{% endColumn %}

{% endColumns %}

### Register the action {: #browser }

The `"action"` field is registered in the manifest.

```json
{
  "name": "My Awesome action MV3 Extension",
  ...
  "action": {
    ...
  }
  ...
}
```

## Define rules for activating the extension {: #activate_pages }

The [declarativeContent][api-declarativecontent] API allows you to enable and disable the action
based on the current URL being shown. 

When an extension is disabled, the icon will be greyscale. If the user clicks on the action icon, they will see the extension's context menu.
<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/hlYsQJPFsF7WBAjJZ6DS.png", 
alt="Clicked Disabled extension", width="252", height="180" %}  

<figcaption>
    Disabled extension.
  </figcaption>
</figure>

See the [Emulating pageActions with declarativeContent][docs-emulating-page-actions] for a code sample.

## Provide the extension icons

An extension requires at least one icon to represent it. Provide icons in PNG format for the best
visual results, although any format supported by WebKit including BMP, GIF, ICO, and JPEG is accepted.

### Designate toolbar icons {: #icons }

Icons specific to the toolbar are registered in the `"default_icon"` field under
[`action`][api-action]  in the manifest. Including multiple sizes is
encouraged to scale for the 16-dip space. At minimum, 16x16 and 32x32 sizes are recommended.

```json
{
  "name": "My Awesome page_action Extension",
  ...
  "action": {
    "default_icon": {
      "16": "extension_toolbar_icon16.png",
      "32": "extension_toolbar_icon32.png"
    }
  }
  ...
}
```

All icons should be square or they may be distorted. If no icons are supplied, Chrome will add a
generic one to the toolbar.

### Create and register additional icons {: #icon_size }

Include additional icons in the following sizes for uses outside of the toolbar.

<table><tbody><tr><th>Icon Size</th><th>Icon Use</th></tr><tr><td>16x16</td><td>favicon on the extension's pages</td></tr><tr></tr><tr><td>32x32</td><td>Windows computers often require this size. Providing this option will prevent size distortion from shrinking the 48x48 option.</td></tr><tr></tr><tr><td>48x48</td><td>displays on the extensions management page</td></tr><tr></tr><tr><td>128x128</td><td>displays on installation and in the Chrome Webstore</td></tr><tr></tr></tbody></table>

Register icons in the manifest under the `"icons"` field.

```json
{
  "name": "My Awesome Extension",
  ...
  "icons": {
    "16": "extension_icon16.png",
    "32": "extension_icon32.png",
    "48": "extension_icon48.png",
    "128": "extension_icon128.png"
  }
  ...
}
```

## Additional UI features {: #additional_features }

### Add a badge {: #badge }

Badges display a colored banner with up to four characters on top of the action icon. They can only
be used by extensions that declare `"action"` in their manifest.

Use badges to indicate the state of the extension. The [Drink Water Event][sample-drink] sample displays a
badge with "ON" to show the user they successfully set an alarm and displays nothing when the
extension is idle.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nXwAHSWLBEgT8099ITT0.png",
       alt="Badge On", height="72", width="72" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pNz8UgfTBMmcf7fE9wja.png",
       alt="Badge Off", height="72", width="72" %}

Set the text of the badge by calling [`chrome.action.setBadgeText`][action-setbadgetext] and the banner color
by calling [`chrome.action.setBadgeBackgroundColor`][action-setbadgebackgroundcolor] .

```js
chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
```

### Popup {: #popup }

A popup is an HTML file that is displayed in a special window when the user clicks the toolbar icon.
A popup works very similarly to a web page; it can contain links to stylesheets and script tags, but
does not allow inline JavaScript.

The [Drink Water Event][sample-drink] example popup displays available timer options. Users set an alarm by
clicking one of the provided buttons.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JVduBMXnyUorfNjFZmue.png",
       alt="Popup sample screenshot", height="561", width="413" %}

```html
<html>
  <head>
    <title>Water Popup</title>
  </head>
  <body>
      <img src="./stay_hydrated.png" id="hydrateImage">
      <button id="sampleSecond" value="0.1">Sample Second</button>
      <button id="min15" value="15">15 Minutes</button>
      <button id="min30" value="30">30 Minutes</button>
      <button id="cancelAlarm">Cancel Alarm</button>
    <script src="popup.js"></script>
  </body>
</html>
```

The popup can be registered in the manifest under the `"action"` key.

```json
{
  "name": "Drink Water Event",
  ...
  "action": {
    "default_popup": "popup.html"
  }
  ...
}
```

Popups can also be set dynamically by calling [`action.setPopup`][action-setpopup].

```js
chrome.storage.local.get('signed_in', (data) => {
  if (data.signed_in) {
    chrome.action.setPopup({popup: 'popup.html'});
  } else {
    chrome.action.setPopup({popup: 'popup_sign_in.html'});
  }
});
```

### Tooltip {: #tooltip }

Use a tooltip to give short descriptions or instructions to users when hovering over the browser
icon.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Go8aQg0vd0f2hkOFElLK.png",
       alt="A screenshot of an example tooltip", height="157", width="519" %}

Tooltips are registered in the `"default_title"` field under the `"action"` key.
in the manifest.

```json
{
  "name": "Tab Flipper",
  ...
  "action": {
    "default_title": "Press Ctrl(Win)/Command(Mac)+Shift+Right/Left to flip tabs"
  }
...
}
```

Tooltips can also be set or updated by calling [`action.setTitle`][action-settitle].

Specialized locale strings are implemented with [Internationalization][api-i18n]. Create directories to
house language specific messages within a folder called `_locales`, like this:

* `_locales/en/messages.json`
* `_locales/es/messages.json`

[Format messages][25] inside of each language's `messages.json`.

```json
{
  "__MSG_tooltip__": {
    "message": "Hello!",
    "description": "Tooltip Greeting."
  }
}
```

```json
{
  "__MSG_tooltip__": {
    "message": "Hola!",
    "description": "Tooltip Greeting."
  }
}
```

Include the name of the message in the tooltip field instead of the message to enable localization.

```json
{
" name": "Tab Flipper",
  ...
  "action": {
    "default_title": "__MSG_tooltip__"
  }
...
}
```

### Click Event {: #click}

It's possible to install a [click handler][action-onclicked] for when the user clicks the action item.
However, this won't fire if the action has a popup (default or otherwise).

```js
chrome.action.onClicked.addListener(function(tab) {
  chrome.action.setTitle({tabId: tab.id, title: "You are on tab:" + tab.id});
});
```

### Omnibox {: #omnibox }

Users can invoke extension functionality through the [omnibox][api-omnibox]. Include the `"omnibox"` field in
the manifest and designate a keyword. The [Omnibox New Tab Search][sample-new-tab-search] sample extension uses "nt" as
the keyword.

```json/3
{
  "name": "Omnibox New Tab Search",\
  ...
  "omnibox": { "keyword" : "nt" },
  "default_icon": {
    "16": "newtab_search16.png",
    "32": "newtab_search32.png"
  }
  ...
}
```

When the user types "nt" into the omnibox, it activates the extension. To signal this to the user,
it grayscales the provided 16x16 icon and includes it in the omnibox next to the extension name.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/T0jCZDUVfuEANigPV6bY.png",
       alt="Active Omnibox Extension", height="70", width="576" %}

The extension listens to the [`omnibox.onInputEntered`][omnibox-inputentered] event. After it's triggered, the
extension opens a new tab containing a Google search for the user's entry.

```js
chrome.omnibox.onInputEntered.addListener(function(text) {
  // Encode user input for special characters , / ? : @ & = + $ #
  const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});
```

### Context menu {: #context_menu }

Add new [context menu][api-context-menu] options by granting the `"contextMenus"` permission in the manifest.

```json/4
{
  "name": "Global Google Search",
  ...
  "permissions": [
    "contextMenus",
    "storage"
  ],
  "icons": {
    "16": "globalGoogle16.png",
    "48": "globalGoogle48.png",
    "128": "globalGoogle128.png"
  }
  ...
}
```

The 16x16 icon is displayed next to the new menu entry.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/jpA0DLCg2sEnwIf4FkLp.png",
       alt="Context Menu Icon", height="500", width="500" %}

Create a context menu by calling [`contextMenus.create`][contextmenu-create] in the background script. This
should be done under the [`runtime.onInstalled`][runtime-oninstalled] listener event.

```js
// background.js
chrome.runtime.onInstalled.addListener(function() {
  for (const key of Object.keys(kLocales)) {
    chrome.contextMenus.create({
      id: key,
      title: kLocales[key],
      type: 'normal',
      contexts: ['selection'],
    });
  }
});
```

```js
const kLocales = {
  'com.au': 'Australia',
  'com.br': 'Brazil',
  'ca': 'Canada',
  'cn': 'China',
  'fr': 'France',
  'it': 'Italy',
  'co.in': 'India',
  'co.jp': 'Japan',
  'com.ms': 'Mexico',
  'ru': 'Russia',
  'co.za': 'South Africa',
  'co.uk': 'United Kingdom'
};
```

The Global Google Search context menu example creates multiple options from the list in
`locales.js`. When an extension contains more than one context menu, Google Chrome
automatically collapses them into a single parent menu.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LhrliaEhN82maJmeNp7f.png",
       alt="Multiple Context Menus will Collapse", height="606", width="800" %}

### Commands {: #commands }

Extensions can define specific [commands][api-commands] and bind them to a key combination. Register one or
more commands in the manifest under the `"commands"` key.

```json
{
  "name": "Tab Flipper",
  ...
  "commands": {
    "flip-tabs-forward": {
      "suggested_key": {
        "default": "Ctrl+Shift+Right",
        "mac": "Command+Shift+Right"
      },
      "description": "Flip tabs forward"
    },
    "flip-tabs-backwards": {
      "suggested_key": {
        "default": "Ctrl+Shift+Left",
        "mac": "Command+Shift+Left"
      },
      "description": "Flip tabs backwards"
    }
  }
  ...
}
```

Commands can be used to provide new or alternative browser shortcuts. The [Tab Flipper][sample-tab-flipper] sample
extension listens to the [`commands.onCommand`][commands-oncommand] event in the [background script][docs-background] and defines
functionality for each registered combination.

```js
// background.js 

chrome.commands.onCommand.addListener(command => {
  // command will be "flip-tabs-forward" or "flip-tabs-backwards"

  chrome.tabs.query({currentWindow: true}, tabs => {
    // Sort tabs according to their index in the window.
    tabs.sort((a, b) => a.index - b.index);
    const activeIndex = tabs.findIndex((tab) => tab.active);
    const lastTab = tabs.length - 1;
    let newIndex = -1;
    if (command === 'flip-tabs-forward') {
      newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
    } else {  // 'flip-tabs-backwards'
      newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
    }
    chrome.tabs.update(tabs[newIndex].id, {active: true, highlighted: true});
  });
});
```

### Override pages {: #override }

An extension can [override][docs-override] and replace the History, New Tab, or Bookmarks web page with a
custom HTML file. Like a [popup][section-popup], it can include specialized logic and style, but does not allow
inline JavaScript. A single extension is limited to overriding only one of the three possible pages.

Register an override page in the manifest under the `"chrome_url_overrides"` field.

```json
{
  "name": "Awesome Override Extension",
  ...

  "chrome_url_overrides" : {
    "newtab": "override_page.html"
  },
  ...
}
```

The `"newtab"` field should be replaced with `"bookmarks"` or `"history"` when overriding those
pages.

```html
<html>
  <head>
  <title>New Tab</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <script src="logic.js"></script>
  </body>
</html>
```

[action-hide]: /docs/extensions/reference/action#method-hide
[action-onclicked]: /docs/extensions/reference/action/#event-onClicked
[action-setbadgebackgroundcolor]: /docs/extensions/reference/action#method-setBadgeBackgroundColor
[action-setbadgetext]: /docs/extensions/reference/action#method-setBadgeText
[action-setpopup]: /docs/extensions/reference/action#method-setPopup
[action-settitle]: /docs/extensions/reference/action#method-setTitle
[action-show]: /docs/extensions/reference/action#method-show
[api-action]: /docs/extensions/reference/action
[api-commands]: /docs/extensions/reference/commands
[api-context-menu]: /docs/extensions/reference/contextMenus
[api-declarativecontent]: /docs/extensions/reference/declarativeContent
[api-i18n]: /docs/extensions/reference/i18n
[api-messages]: /docs/extensions/mv3/i18n-messages
[api-omnibox]: /docs/extensions/reference/omnibox
[commands-oncommand]: /docs/extensions/reference/commands#event-onCommand
[contextmenu-create]: /docs/extensions/reference/contextMenus#method-create
[docs-background]: /docs/extensions/mv3/background_pages
[docs-emulating-page-actions]: /docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
[docs-override]: /docs/extensions/mv3/override
[omnibox-inputentered]: /docs/extensions/reference/omnibox#event-onInputEntered
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[sample-drink]: /docs/extensions/mv3/samples#search:drink
[sample-mappy]: /docs/extensions/mv3/samples#search:mappy
[sample-new-tab-search]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api/omnibox/new-tab-search
[sample-tab-flipper]: /docs/extensions/mv3/samples#search:tab%20flipper
[section-popup]: #popup
[section-onclick]: #click

