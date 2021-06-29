---
api: commands
---

## Manifest

You must have a `"manifest_version"` of at least `2` to use this API.

## Usage

The commands API allows you to define specific commands, and bind them to a default key combination.
Each command your extension accepts must be listed in the manifest as an attribute of the 'commands'
manifest key. An extension can have many commands but only 4 suggested keys can be specified. The
user can manually add more shortcuts from the chrome://extensions/configureCommands dialog.

Supported keys: A-Z, 0-9, Comma, Period, Home, End, PageUp, PageDown, Space, Insert, Delete, Arrow
keys (Up, Down, Left, Right) and the Media Keys (MediaNextTrack, MediaPlayPause, MediaPrevTrack,
MediaStop).

Note: All key combinations must include either Ctrl\* or Alt. Combinations that involve Ctrl+Alt are
not permitted in order to avoid conflicts with the AltGr key. Shift can be used in addition to Alt
or Ctrl, but is not required. Modifiers (such as Ctrl) can not be used in combination with the Media
Keys. Tab key was removed from list of supported keys in Chrome version 33 and above for
accessibility reasons.

{% Aside %}

Please note that on Mac 'Ctrl' is automatically converted to 'Command'. If you want 'Ctrl' instead,
please specify 'MacCtrl' under `"mac"`. Specifying 'MacCtrl' under `"default"` will cause the
extension to be uninstallable.

Additionally, on Chrome OS, you can specify 'Search' as a modifier.

{% endAside %}

Certain Chrome shortcuts (e.g. window management) always take priority over Extension Command
shortcuts and can not be overwritten.

```json
{
  "name": "My extension",
  ...
  "commands": {
    "toggle-feature-foo": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y"
      },
      "description": "Toggle feature foo"
    },
    "_execute_action": {
      "suggested_key": {
        "windows": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y",
        "chromeos": "Ctrl+Shift+U",
        "linux": "Ctrl+Shift+J"
      }
    }
  },
  ...
}
```

In your background page, you can bind a handler to each of the commands defined in the manifest
(except for `\_execute_action`, `\_execute_browser_action`, and `\_execute_page_action`) via
onCommand.addListener. For example:

```js
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});
```

The `\_execute_action`, `\_execute_browser_action`, and `\_execute_page_action` commands are
reserved for the action of opening your extension's popups. They won't normally generate events that
you can handle. If you need to take action based on your popup opening, consider listening for an
'onDomReady' event inside your popup's code.

## Scope

By default, Commands are scoped to the Chrome browser, which means that while the browser does not
have focus, the shortcut will be inactive. On desktop Chrome, Commands can instead have global
scope, as of version 35, and will then also work while Chrome does \*not\* have focus. NOTE: The
exception here is Chrome OS, where global commands are not allowed at the moment.

The user is free to designate any shortcut as global using the UI in chrome://extensions \\ Keyboard
Shortcuts, but the extension developer is limited to specifying only Ctrl+Shift+\[0..9\] as global
shortcuts. This is to minimize the risk of overriding shortcuts in other applications since if, for
example, Alt+P were to be allowed as global, the printing shortcut might not work in other
applications.

Example:

```json
{
  "name": "My extension",
  ...
  "commands": {
    "toggle-feature-foo": {
      "suggested_key": {
        "default": "Ctrl+Shift+5"
      },
      "description": "Toggle feature foo",
      "global": true
    }
  },
  ...
}
```

## Examples

The following examples show

### Basic command

Commands allow extensions to map logic to keyboard shortcuts that can be invoked by the user. At
it's most basic, a command only requires a command declaration in the extension's manifest and a
listener registration as shown below.

```json
// manifest.json
{
  "name": "Command demo - basic",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "commands": {
    "inject-script": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y"
      },
      "description": "Inject a script on the page"
    }
  }
}
```

```js
// background.js
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command.name}" triggered`);
});
```

### Action command

As described in the [Usage][usage] section above, a command can also be mapped to the extension's
action (Manifest V3), browser action (Manifest V2), or page action (Manifest V2). The below example
programmatically injects a content script that shows an alert on the current page in response to the
user either clicking the extension's action or triggering a keyboard shortcut.

```json
// manifest.json
{
  "name": "Commands demo - action invocation",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["activeTab", "scripting"],
  "action": {},
  "commands": {
    "_execute_action": {
      "suggested_key": {
        "default": "Ctrl+U",
        "mac": "Command+U"
      }
    }
  }
}
```

```js
// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: contentScriptFunc,
    args: ['action'],
  });
});

function contentScriptFunc(name) {
  alert(`"${name}" executed`);
}

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" called`);
});
```

### Verify commands registered

If an extension attempts to register a shortcut that is already in use used by another extension,
the second extension's shortcut will not register as expected. Developers can provide a more robust
end user experience by anticipating this possibility and checking for collisions at install time.

{% Aside %}

`\_execute_action`, `\_execute_browser_action`, and `\_execute_page_action` will not appear in the
list of commands returned by `command.getAll()`.

{% endAside %}

```js
// background.js
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let errors = [];

    for (let {name, shortcut} of commands) {
      if (shortcut === '') {
        errors.push(name);
      }
    }

    if (errors.length > 0) {
      // Notify the user that shortcuts for one or more commands were not
      // registered as expected & provide guidance on how to fix this.
    }
  });
}
```

[usage]: #usage
