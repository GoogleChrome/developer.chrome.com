---
api: userScripts
---
{% Aside 'note' %}
This API is currently available in Chrome 120 beta.
{% endAside %}

## Manifest

To use the `chrome.userScripts` API, add the `"userScripts"` permission to your manifest.json and `"host_permissions"` for sites you want to run scripts on.

```json/7-9
{
  "name": "User script test extension",
  "manifest_version": 3,
  "minimum_chrome_version": "120",
  "permissions": [
    "userScripts"
  ],
  "host_permissions": [
    "*://example.com/*"
  ]
}
```

## Concepts and usage

A user script is a bit of code injected into a web page to modify its appearance or behavior. Scripts are either created by users or downloaded from a script repository or a user script extension.

### Developer mode for extension users

As an extension developer, you already have Developer mode enabled in your installation of Chrome. For user script extensions, your users will also need to enable developer mode. Here are instructions that you can copy and paste into your own documentation.

1. Go to the Extensions page by entering `chrome://extensions` in a new tab. (By design `chrome://` URLs are not linkable.)
1. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
    <figure>
    {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/3gJmpGWMuvsOk9Jaj2NJ.png", alt="Extensions page",
    width="400", height="183",  class="screenshot" %}

      <figcaption>
      Extensions page (chrome://extensions)
      </figcaption>
    </figure>

You can determine if developer mode is enabled by checking whether `chrome.userScripts` throws an error. For example:

```javascript
function isUserScriptsAvailable() {
  try {
    // Property access which throws if developer mode is not enabled.
    chrome.userScripts;
    return true;
  } catch {
    // Not available.
    return false;
  }
}
```

### Work in isolated worlds

Both user and content scripts can run in an isolated world or in the main world. An isolated world is an execution environment that isn't accessible to a host page or other extensions. This lets a user script change its JavaScript environment without affecting the host page or other extensions' user and content scripts. Conversely, user scripts (and content scripts) are not visible to the host page or the user and content scripts of other extensions. Scripts running in the main world are accessible to host pages and other extensions and are visible to host pages and to other extensions. To select the world, pass `"USER_SCRIPT"` or `"MAIN"` when calling [`userScripts.register()`](#method-register).

To configure a [content security policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) for whichever world you specify, call `userScripts.configureWorld()` as shown below.

```javascript
chrome.userScripts.configureWorld({
  csp: "script-src 'self'"
});
```

### Messaging

Like content scripts and offscreen documents, user scripts can communicate with other parts of an extension using [messaging](/docs/extensions/mv3/messaging/). Unlike other types of messages, user script messages use their own methods: `runtime.onUserScriptMessage` and `chrome.runtime.onUserScriptConnect` events.

Before sending a message, you must call `configureWorld()` with the `messaging` argument set to `true`. Note that both the `csp` and `messaging` arguments can be passed at the same time.

```javascript
chrome.userScripts.configureWorld({
  messaging: true
});
```

### Extension updates

User scripts are cleared when an extension updates. You can add them back running code via the [`runtime.onInstalled`](/docs/extensions/reference/runtime/#event-onInstalled) event handler in the extension service worker. Respond only to the [`"update"` reason](/docs/extensions/reference/runtime/#type-OnInstalledReason:~:text=as%20an%20installation.-,%22update%22,-Specifies%20the%20event) passed to the event callback.

## Example

The example below is from the [userScript sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/userScripts) in our samples repo.

### Register a script

The following example shows a basic call to `register()`. The first argument is an array of objects defining the scripts to be registered. There are more options than are shown here.

```javascript
chrome.userScripts.register([{
  id: 'test',
  matches: ['*://*/*'],
  js: [{code: 'alert("Hi!")'}]
}]);
```
