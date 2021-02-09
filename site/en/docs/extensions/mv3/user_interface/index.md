---
layout: "layouts/doc-post.njk"
title: "Design the user interface"
date: 2018-03-16
updated: 2018-05-16
description: UI and design guidelines for Chrome Extensions.
---

The extension user interface should be purposeful and minimal. Just like extensions themselves, the
UI should customize or enhance the browsing experience without distracting from it.

This guide explores required and optional user interface features. Use it to understand how and when
to implement different UI elements within an extension.

## Activate the extension on all pages {: #browser_action }

Use a [browser_action][1] when an extension's features are functional in most situations.

### Register browser action {: #browser }

The `"browser_action"` field is registered in the manifest.

```json
{
  "name": "My Awesome browser_action Extension",
  ...
  "browser_action": {
    ...
  }
  ...
}
```

Declaring `"browser_action"` keeps the icon colorized, indicating the extension is available to
users.

### Add a badge {: #badge }

Badges display a colored banner with up to four characters on top of the browser icon. They can only
be used by extensions that declare `"browser_action"` in their manifest.

Use badges to indicate the state of the extension. The [Drink Water Event][2] sample displays a
badge with "ON" to show the user they successfully set an alarm and displays nothing when the
extension is idle.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nXwAHSWLBEgT8099ITT0.png",
       alt="Badge On", height="72", width="72" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pNz8UgfTBMmcf7fE9wja.png",
       alt="Badge Off", height="72", width="72" %}

Set the text of the badge by calling [`chrome.browserAction.setBadgeText`][3] and the banner color
by calling [`chrome.browserAction.setBadgeBackgroundColor`][4] .

```js
chrome.browserAction.setBadgeText({text: 'ON'});
chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
```

## Activate the extension on select pages {: #page_action }

Use [page_action][5] when an extension's features are only available under defined circumstances.

### Declare page action {: #page }

The `"page_action"` field is registered in the manifest.

```json
{
  "name": "My Awesome page_action Extension",
  ...
  "page_action": {
    ...
  }
  ...
}
```

Declaring `"page_action"` will colorize the icon only when the extension is available to users,
otherwise it will be displayed in greyscale.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/eoqQgLdvEe1gCDaz5ocx.png",
       alt="Active Page Action Icon", height="72", width="72" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5tyLyV97eUeLb01648UF.png",
       alt="Unusable Page Action Icon", height="72", width="72" %}

### Define rules for activating the extension {: #rules }

Define rules for when the extension is usable by calling [`chrome.declarativeContent`][6] under the
[`runtime.onInstalled`][7] listener in a [background script][8]. The [Page action by URL][9] sample
extension sets a condition that the url must include a 'g'. If the condition is met, the extension
calls [`declarativeContent.ShowPageAction()`][10].

```js
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'g' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
```

### Enable or disable the extension {: #enable_disable }

Extensions using `"page_action"` can activate and disable dynamically by calling
[`pageAction.show`][11] and [`pageAction.hide`][12].

The [Mappy][13] sample extension scans a web page for an address and shows its location on a static
map in the [popup][14]. Because the extension is dependent on page content, it cannot declare rules
to predict which pages will be relevant. Instead, if an address is found on a page it calls
`pageAction.show` to colorize the icon and signal the extension is usable on that tab.

```js/2
chrome.runtime.onMessage.addListener(function(req, sender) {
  chrome.storage.local.set({'address': req.address})
  chrome.pageAction.show(sender.tab.id);
  chrome.pageAction.setTitle({tabId: sender.tab.id, title: req.address});
});
```

<!-- TODO duplicate ID (was previously #icons) -->

## Provide the extension icons

Extensions require at least one icon to represent it. Provide icons in PNG format form the best
visual results, although any format supported by WebKit including BMP, GIF, ICO, and JPEG is
accepted.

### Designate toolbar icons {: #icons }

Icons specific to the toolbar are registered in the `"default_icon"` field under
[`browser_action`][15] or [`page_action`][16] in the manifest. Including multiple sizes is
encouraged to scale for the 16-dip space. At minimum, 16x16 and 32x32 sizes are recommended.

```json
{
  "name": "My Awesome page_action Extension",
  ...
  "page_action": {
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

### Popup {: #popup }

A popup is an HTML file that is displayed in a special window when the user clicks the toolbar icon.
A popup works very similarly to a web page; it can contain links to stylesheets and script tags, but
does not allow inline JavaScript.

The [Drink Water Event][17] example popup displays available timer options. Users set an alarm by
clicking one of the provided buttons.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JVduBMXnyUorfNjFZmue.png",
       alt="Popup sample screenshot", height="561", width="413" %}

```html
<html>
  <head>
    <title>Water Popup</title>
  </head>
  <body>
      <img src='./stay_hydrated.png' id='hydrateImage'>
      <button id='sampleSecond' value='0.1'>Sample Second</button>
      <button id='15min' value='15'>15 Minutes</button>
      <button id='30min' value='30'>30 Minutes</button>
      <button id='cancelAlarm'>Cancel Alarm</button>
    <script src="popup.js"></script>
  </body>
</html>
```

The popup can be registered in the manifest, under browser action or page action.

```json
{
  "name": "Drink Water Event",
  ...
  "browser_action": {
    "default_popup": "popup.html"
  }
  ...
}
```

Popups can also be set dynamically by calling [`browserAction.setPopup`][18] or
[`pageAction.setPopup`][19].

```js
chrome.storage.local.get('signed_in', function(data) {
  if (data.signed_in) {
    chrome.browserAction.setPopup({popup: 'popup.html'});
  } else {
    chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
  }
});
```

### Tooltip {: #tooltip }

Use a tooltip to give short descriptions or instructions to users when hovering over the browser
icon.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Go8aQg0vd0f2hkOFElLK.png",
       alt="A screenshot of an example tooltip", height="157", width="519" %}

Tooltips are registered in the `"default_title"` field [`browser_action`][20] or [`page_action`][21]
in the manifest.

```json
{
"name": "Tab Flipper",
  ...
  "browser_action": {
    "default_title": "Press Ctrl(Win)/Command(Mac)+Shift+Right/Left to flip tabs"
  }
...
}
```

Tooltips can also be set or updated by calling [`browserAction.setTitle`][22] and
[`pageAction.setTitle`][23].

```js
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setTitle({tabId: tab.id, title: "You are on tab:" + tab.id});
});
```

Specialized locale strings are implemented with [Internationalization][24]. Create directories to
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
"name": "Tab Flipper",
  ...
  "browser_action": {
    "default_title": "__MSG_tooltip__"
  }
...
}
```

### Omnibox {: #omnibox }

Users can invoke extension functionality through the [omnibox][26]. Include the `"omnibox"` field in
the manifest and designate a keyword. The [Omnibox New Tab Search][27] sample extension uses "nt" as
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
it greyscales the provided 16x16 icon and includes it in the omnibox next to the extension name.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/T0jCZDUVfuEANigPV6bY.png",
       alt="Active Omnibox Extension", height="70", width="576" %}

The extension listens to the [`omnibox.onInputEntered`][28] event. After it's triggered, the
extension opens a new tab containing a Google search for the user's entry.

```js
chrome.omnibox.onInputEntered.addListener(function(text) {
  // Encode user input for special characters , / ? : @ & = + $ #
  var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});
```

### Context menu {: #context_menu }

Add new [context menu][29] options by granting the `"contextMenus"` permission in the manifest.

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

Create a context menu by calling [`contextMenus.create`][30] in the [background script][31]. This
should be done under the [`runtime.onInstalled`][32] listener event.

```js
chrome.runtime.onInstalled.addListener(function() {
  for (let key of Object.keys(kLocales)) {
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
[locales.js][33] . When an extension contains more than one context menu, Google Chrome
automatically collapses them into a single parent menu.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LhrliaEhN82maJmeNp7f.png",
       alt="Multiple Context Menus will Collapse", height="606", width="800" %}

### Commands {: #commands }

Extensions can define specific [commands][34] and bind them to a key combination. Register one or
more commands in the manifest under the `"commands"` field.

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

Commands can be used to provide new or alternative browser shortcuts. The [Tab Flipper][35] sample
extension listens to the [`commands.onCommand`][36] event in the [background script][37] and defines
functionality for each registered combination.

```js
chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // Sort tabs according to their index in the window.
    tabs.sort((a, b) => { return a.index < b.index; });
    let activeIndex = tabs.findIndex((tab) => { return tab.active; });
    let lastTab = tabs.length - 1;
    let newIndex = -1;
    if (command === 'flip-tabs-forward')
      newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
    else  // 'flip-tabs-backwards'
      newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
    chrome.tabs.update(tabs[newIndex].id, {active: true, highlighted: true});
  });
});
```

Commands can also create a key binding that works specially with its extension. The [Hello
Extensions][38] example gives a command to open the popup.

```json/4,10
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "browser_action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  },
  "manifest_version": 3,
  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+F",
        "mac": "MacCtrl+Shift+F"
      },
      "description": "Opens hello.html"
    }
  }
}
```

Because the extension defines a [`broswer_action`][39] it can specify `"execute_browser_action"` in
the commands to open the popup file without including a [background script][40]. If using
[`page_action`][41], it can be replaced with `"execute_page_action"`. Both browser and extension
commands can be used in the same extension.

### Override pages {: #override }

An extension can [override][42] and replace the History, New Tab, or Bookmarks web page with a
custom HTML file. Like a [popup][43], it can include specialized logic and style, but does not allow
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

[1]: /docs/extensions/reference/browserAction
[2]: /docs/extensions/mv3/samples#search:drink
[3]: /docs/extensions/reference/browserAction#method-setBadgeText
[4]: /docs/extensions/reference/browserAction#method-setBadgeBackgroundColor
[5]: /docs/extensions/reference/pageAction
[6]: /docs/extensions/reference/declarativeContent
[7]: /docs/extensions/reference/runtime#event-onInstalled
[8]: /docs/extensions/mv3/background_pages
[9]: /samples#search:page%20action%20by%20url
[10]: /docs/extensions/reference/pageAction#method-show
[11]: /docs/extensions/reference/pageAction#method-show
[12]: /docs/extensions/reference/pageAction#method-hide
[13]: /docs/extensions/mv3/samples#search:mappy
[14]: #popup
[15]: /docs/extensions/reference/browserAction
[16]: /docs/extensions/reference/pageAction
[17]: /docs/extensions/mv3/samples#search:drink
[18]: /docs/extensions/reference/browserAction#method-setPopup
[19]: /docs/extensions/reference/pageAction#method-setPopup
[20]: /docs/extensions/reference/browserAction
[21]: /docs/extensions/reference/pageAction
[22]: /docs/extensions/reference/browserAction#method-setTitle
[23]: /docs/extensions/reference/pageAction#method-setTitle
[24]: /docs/extensions/reference/i18n
[25]: /docs/extensions/mv3/i18n-messages
[26]: /docs/extensions/reference/omnibox
[27]: /docs/extensions/mv3/samples#search:omnibox%20new
[28]: /docs/extensions/reference/omnibox#event-onInputEntered
[29]: /docs/extensions/reference/contextMenus
[30]: /docs/extensions/reference/contextMenus#method-create
[31]: /docs/extensions/mv3/migrating_to_service_workers
[32]: /docs/extensions/reference/runtime#event-onInstalled
[33]: /docs/extensions/examples/api/contextMenus/global_context_search/locales.js
[34]: /docs/extensions/reference/commands
[35]: /docs/extensions/mv3/samples#search:tab%20flipper
[36]: /docs/extensions/reference/commands#event-onCommand
[37]: /docs/extensions/mv3/migrating_to_service_workers
[38]: /docs/extensions
[39]: /docs/extensions/mv3/user_interface#browser
[40]: /docs/extensions/mv3/migrating_to_service_workers
[41]: #page
[42]: /docs/extensions/mv3/override
[43]: #popup

