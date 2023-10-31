---
layout: "layouts/doc-post.njk"
title: "Design the user interface"
seoTitle: "Chrome Extensions: Design the user interface"
date: 2018-03-16
updated: 2023-05-30
description: User interface and design guidelines for Chrome Extensions.
---

Like Chrome's user interface, an extension user interface should be purposeful and minimal. Extensions
should allow users to customize or enhance the user's browsing experience without distracting
from it. 

This guide explores required and optional user interface features. Use it to understand how and when
to implement different user interface elements within an extension.

## The extension action {: #action }

The [Action API][api-action] controls the extension's action (toolbar icon). It can either open a
[popup][section-popup] or trigger some functionality when it's [clicked][section-onclick]. 

Users can trigger an extension's action by expanding the extension menu and selecting the desired
extension. 

To make it easier to access an extension, the user may choose to pin the extension's action to the
toolbar. Once pinned, the extension's action will appear to the left of the extension menu. Users
can rearrange their pinned extensions by dragging and dropping their action icons to the desired
order.

{% Columns %}

{% Column %} 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/iouvm1a3lsQWGyg6fSMS.png", alt="Unpinned extension",
width="400", height="374", class="screenshot" %}
  <figcaption>Unpinned extension.</figcaption>
</figure>

{% endColumn %}

{% Column %} 

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/KS09fVoCj3YWuIoH5EFn.png", alt="Pinned extension",
width="400", height="382", class="screenshot" %}
  <figcaption>Pinned extension.</figcaption>
</figure>

{% endColumn %}

{% endColumns %}

### Register the action {: #browser }

To use the Action API, the extension's [manifest][manifest-file] must contain an `"action"`
key. This informs the browser that the extension will customize the action.

{% Label %}manifest.json:{% endLabel %}

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

See the [manifest section][action-manifest] of the Action API docs for a full description of the
optional properties of this field.

###  Activate the action conditionally  {: #activate_pages }

The [DeclarativeContent API][api-declarativecontent] allows you to enable the extension's action
based on the page URL or when the CSS selectors match the elements on the page.

When an extension is disabled, the icon is grayed out. If the user clicks the disabled extension,
the extension's context menu will appear.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/hlYsQJPFsF7WBAjJZ6DS.png", 
alt="Clicked Disabled extension", width="252", height="180", class="screenshot" %}  

<figcaption>
    Disabled extension.
  </figcaption>
</figure>

## Provide the extension icons

An extension requires at least one icon to represent it. Provide icons in PNG format for the best
visual results, although any raster format supported by Chrome is accepted. This includes BMP,
GIF, ICO, and JPEG.

{% Aside 'caution' %}

SVG files are not supported for any icons declared in the manifest.

{% endAside %}

Ensure your icon follows the [extension icon best practices][docs-icon-guidelines].

### Designate action icons {: #icons }

Icons specific to the toolbar are registered in the `"default_icon"` field under
[`"action"`][api-action] in the manifest. Including multiple sizes is encouraged to scale for the
16-dip space. At minimum, 16x16 and 32x32 sizes are recommended.

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "My Awesome Extension",
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
generic one to the toolbar with the first letter of the extension name. 

### Create and register additional icons {: #icon_size }

Include additional icons in the following sizes for uses outside of the toolbar.

| Icon Size | Icon Use                                               |
|-----------|--------------------------------------------------------|
| 16x16     | Favicon on the extension's pages and context menu icon.|
| 32x32     | Windows computers often require this size.             |
| 48x48     | Displays on the extension management page.             |
| 128x128   | Displays on installation and in the Chrome Web Store.  |


Register icons in the manifest under the `"icons"` field.

{% Label %}manifest.json:{% endLabel %}

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

## Additional user interface features {: #additional_features }

### Action badge {: #badge }

Badges display a colored banner on top of the action icon. They can only be used when the `"action"`
is declared in the manifest. 

Use badges to indicate the state of the extension. The [Drink Water][sample-drink] sample extension
displays a badge with "ON" to show the user they have successfully set an alarm and displays nothing when
the extension is idle. Badges can contain up to 4 characters.

{% Columns %}

{% Column %}

<figure>
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nXwAHSWLBEgT8099ITT0.png", alt="Badge On",
       height="72", width="72" %}  
<figcaption>
    An action icon with a badge.
  </figcaption>
</figure>



{% endColumn %}

{% Column %} 

<figure>
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pNz8UgfTBMmcf7fE9wja.png", alt="Badge Off",
       height="72", width="72" %}  
<figcaption>
    An action icon without a badge.
  </figcaption>
</figure>



{% endColumn %}

{% endColumns %}

You can set the text of the badge by calling [`chrome.action.setBadgeText()`][action-setbadgetext] and
the banner color by calling
[`chrome.action.setBadgeBackgroundColor()`][action-setbadgebackgroundcolor].

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
```

### Popup {: #popup }

A popup is an HTML file that is displayed in a special window when the user clicks the action icon.
A popup works similarly to a web page; it can contain links in style and script tags, but
does not allow inline JavaScript.

The [Drink Water Event][sample-drink] example popup displays available timer options. Users set an
alarm by clicking one of the provided buttons.

<figure>
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JVduBMXnyUorfNjFZmue.png", alt="The Drink Water popup", height="361", width="213", class="screenshot" %}  
<figcaption>
    The Drink Water popup.
  </figcaption>
</figure>

{% Label %}popup.html:{% endLabel %}

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

The popup is registered in the manifest under the `"action"` key.

{% Label %}manifest.json:{% endLabel %}

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

Popups can also be set dynamically by calling [`action.setPopup()`][action-setpopup].

{% Label %}???:{% endLabel %}

```js
chrome.storage.local.get('signed_in', (data) => {
  if (data.signed_in) {
    chrome.action.setPopup({popup: 'popup.html'});
  } else {
    chrome.action.setPopup({popup: 'popup_sign_in.html'});
  }
});
```

### Side panel {: #side-panel } 

An extension side panel is an HTML file that provides additional functionality alongside the main content of a web page. The [Dictionary side panel][sample-dictionary-sidepanel] example allows users to right-click on a word and see the definition in the side panel.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/9QJK3CNx71t67M3MlIUY.png", alt="Selecting the Dictionary side panel", width="379", height="386" %}
  <figcaption>
    Dictionary side panel extension.
  </figcaption>
</figure>

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/aC3zkJDPliNLXdvfugeU.png", alt="Dictionary side panel context menu choosing the word extensions", width="800", height="393" %}
  <figcaption>
    Dictionary extension defining the word "Extensions".
  </figcaption>
</figure>

For more samples and use cases, see the [Side Panel API][api-sidepanel] reference page.

### Tooltip {: #tooltip }

Use a tooltip to give short descriptions or instructions to users when they hover over the action
icon. By default, the tootip displays the name of the extension.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Go8aQg0vd0f2hkOFElLK.png", alt="An
example tooltip", height="157", width="419", class="screenshot" %}
  <figcaption>
    An example tooltip.
  </figcaption>
</figure>

Tooltips are registered in the `"default_title"` field under the `"action"` key in the manifest.

{% Label %}manifest.json:{% endLabel %}

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

Tooltips can also be set or updated by calling [`action.setTitle()`][action-settitle].

### Click Event {: #click}

It's possible to register an [`OnClicked` handler][action-onclicked] for when the user clicks the action
item. However, this won't fire if the action has a popup (default or otherwise).

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setTitle({tabId: tab.id, title: `You are on tab: ${tab.id}`});
});
```

### Omnibox {: #omnibox }

Users can invoke extension functionality through the [Omnibox API][api-omnibox]. Include the `"omnibox"`
field in the manifest and designate a keyword. The [Omnibox New Tab Search][sample-new-tab-search]
sample extension uses <kbd>nt</kbd> as the keyword.

{% Label %}manifest.json:{% endLabel %}

```json/3
{
  "name": "Omnibox New Tab Search",
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

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/T0jCZDUVfuEANigPV6bY.png", alt="An example of Omnibox functionality", height="70", width="476", class="screenshot" %}
  <figcaption>
    An example of Omnibox functionality.
  </figcaption>
</figure>

The extension listens to the [`omnibox.onInputEntered`][omnibox-inputentered] event. After it's
triggered, the extension opens a new tab containing a Google search for the user's entry.

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
  const newURL = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
  chrome.tabs.create({ url: newURL });
});
```

### Context menu {: #context_menu }

You can use the [ContextMenus API][api-context-menu] by granting the `"contextMenus"` permission in the
manifest.

{% Label %}manifest.json:{% endLabel %}

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

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/jpA0DLCg2sEnwIf4FkLp.png", alt="A context menu icon",
height="300", width="300", class="screenshot" %}
  <figcaption>
    A context menu icon.
  </figcaption>
</figure>

Create a context menu by calling [`contextMenus.create()`][contextmenu-create] in the service worker. Do this in the [`runtime.onInstalled`][runtime-oninstalled] event listener.

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.runtime.onInstalled.addListener(async () => {
  for (let [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: locale,
      type: 'normal',
      contexts: ['selection'],
    });
  }
});
```

{% Label %}locals.js:{% endLabel %}

```js
const tldLocales = {
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

The [Global Google Search context menu example][sample-context-menu] provides multiple context menu options based on the list in
`locales.js` (see above). When an extension contains more than one context menu, Chrome automatically
collapses them into a single parent menu (see below).

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LhrliaEhN82maJmeNp7f.png", alt="Multiple context
menus will collapse", height="306", width="500", class="screenshot" %}
  <figcaption>
    Multiple context menus will collapse.
  </figcaption>
</figure>


### Commands {: #commands }

Use the [Commands API][api-commands] to define commands and bind them to a key combination. Register
one or more shortcuts in the manifest under the `"commands"` key.

{% Label %}manifest.json:{% endLabel %}

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

Use commands to provide new or alternative browser shortcuts. The [Tab
Flipper][sample-tab-flipper] sample extension listens to the
[`commands.onCommand`][commands-oncommand] event in the [service worker][docs-service-worker] and
defines functionality for each registered combination.

{% Label %}service-worker.js:{% endLabel %}

```js

chrome.commands.onCommand.addListener((command) => {
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

An extension can [override][docs-override] _one_ of thee possible pages:

* History
* New tab
* Bookmarks

Use a custom HTML file to do this. As with a [popup][section-popup], it can include specialized logic and style,
but does not allow inline JavaScript. Register it in the manifest under the `"chrome_url_overrides"` field.

{% Label %}manifest.json:{% endLabel %}

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

{% Label %}override_page.html:{% endLabel %}

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

### Notifications

You can communicate relevant information to users by displaying notifications directly in their
system tray. To use the [Notifications API][api-notif], you must declare the `"notifications"`
permission in the manifest.

{% Label %}manifest.json:{% endLabel %}

```json/5
{ 
  "name": "Drink Water Event Popup",
...
  "permissions": [
    "alarms",
    "notifications",
    "storage"
  ],
 ...
}
```

Once the permission is declared, you can display a notification by calling
[`notifications.create()`][notifications-create].

{% Label %}service-worker.js:{% endLabel %}

```js
function showStayHydratedNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'stay_hydrated.png',
    title: 'Time to Hydrate',
    message: 'Everyday I\'m Guzzlin\'!',
    buttons: [
      { title: 'Keep it Flowing.' }
    ],
    priority: 0
  });
}
```

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/e5S112AtwfnA5o64JrGg.png", 
alt="Mac OS notification", width="500", height="150", class="screenshot" %}
  <figcaption>
    Notification on macOS.
  </figcaption>
</figure>

## Internationalize the user interface {: #localize }

You can use the [I18n API][api-i18n] to internationalize your extension. Create directories
to house language specific messages within a folder called `_locales/`, like this:

- `_locales/en/messages.json`
- `_locales/es/messages.json`

[Format messages][docs-locale-messages] inside of each language's `messages.json`. For example, the
following code localizes the tooltip:

{% Columns %}

{% Column %}

{% Label %}_locales/en/messages.json:{% endLabel %}

```json
{
  "__MSG_tooltip__": {
    "message": "Hello!",
    "description": "Tooltip"
  }
}
```

{% endColumn %}

{% Column %}

{% Label %}_locales/es/messages.json:{% endLabel %}

```json
{
  "__MSG_tooltip__": {
    "message": "Hola!",
    "description": "Tooltip"
  }
}
```

{% endColumn %}

{% endColumns %}

Specify the name of the message in the `"default_title"` field of the manifest. The
`"default_locale"` field must be defined.

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "Tab Flipper",
  ...
  "action": {
    "default_title": "__MSG_tooltip__"
  },
  "default_locale": "en"
  ...
}
```

## Continue exploring {: #next}

See the [Action API example][sample-action] for a complete demonstration of the action APIs
capabilities.

[action-hide]: /docs/extensions/reference/action#method-hide
[action-manifest]:/docs/extensions/reference/action/#manifest
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
[api-notif]: /docs/extensions/reference/notifications
[api-omnibox]: /docs/extensions/reference/omnibox
[api-sidepanel]: /docs/extensions/reference/sidePanel
[commands-oncommand]: /docs/extensions/reference/commands#event-onCommand
[contextmenu-create]: /docs/extensions/reference/contextMenus#method-create
[docs-background]: /docs/extensions/mv3/background_pages
[docs-emulating-page-actions]: /docs/extensions/reference/action/#emulating-pageactions-with-declarativecontent
[docs-icon-guidelines]: /docs/webstore/images/#icons
[docs-locale-messages]: /docs/extensions/mv3/i18n-messages/
[docs-override]: /docs/extensions/mv3/override
[manifest-file]:/docs/extensions/mv3/manifest/
[omnibox-inputentered]: /docs/extensions/reference/omnibox#event-onInputEntered
[runtime-oninstalled]: /docs/extensions/reference/runtime#event-onInstalled
[sample-action-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action
[sample-action]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action
[sample-context-menu]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/contextMenus/global_context_search
[sample-drink]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.water_alarm_notification
[sample-new-tab-search]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/omnibox/new-tab-search
[sample-dictionary-sidepanel]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary
[sample-tab-flipper]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/default_command_override
[section-onclick]: #click
[section-popup]: #popup
[notifications-create]: /docs/extensions/reference/notifications#method-create
[docs-service-worker]: /docs/extensions/mv3/service_workers/basics/
