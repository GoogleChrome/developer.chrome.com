---
api: userScripts
---
{% Aside 'note' %}
This API is currently available in Chrome 120 beta.
{% endAside %}
## Manifest

To use the `chrome.userScripts` API, add the `"userScripts"` permission to your manifest.json and `"host_permissions"` for sites you want to run scripts on.

```json/9-15
{
  "name": "User script test extension",
  "manifest_version": 3,
  "minimum_chrome_version": "118",
  "permissions": [
    "userScripts"
  ],
  "host_permissions": [
    "*://requested.com/*"
  ]
}
```

## Concepts and usage

A user script is a bit of code injected into a web page to modify its appearance or behavior. Scripts are either created by users or downloaded from a script repository using a type of extension called a user script manager.

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

### Work in isolated worlds

Both user and content scripts can run in an isolated world or in the main world. An isolated world is an execution environment that isn't accessible to a host page or other extensions. This lets a user script change its JavaScript environment without affecting the host page or other extensions' user and content scripts. Conversely, user scripts (and content scripts) are not visible to the host page or the user and content scripts of other extensions. Scripts running in the main world are accessible to host pages and other extensions and are visible to host pages and to other extensions. To select the world, pass `"USER_SCRIPT"` or `"MAIN"` when calling `userScripts.register()`.

To configure a [content security policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) for whichever world you specify, call `userScripts.configureWorld()`.

### Basic usage

TBD

## Examples

### Register a script

The following example shows a basic call to `register()`. The first argument is an array of objects defining the scripts to be registered. There are more options than are shown here.

### Configure the world

You can configure a [content security policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) for whichever world you specify by calling `userScripts.configureWorld()` as shown below.
