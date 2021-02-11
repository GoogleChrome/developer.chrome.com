---
api: permissions
---

## Implementing optional permissions

### Step 1: Decide which permissions are required and which are optional

An extension can declare both required and optional permissions. In general, you should:

- Use required permissions when they are needed for your extension's basic functionality.
- Use optional permissions when they are needed for optional features in your extension.

Advantages of _required_ permissions:

- **Fewer prompts:** An extension can prompt the user once to accept all permissions.
- **Simpler development:** Required permissions are guaranteed to be present.

Advantages of _optional_ permissions:

- **Better security:** Extensions run with fewer permissions since users only enable permissions
  that are needed.
- **Better information for users:** An extension can explain why it needs a particular permission
  when the user enables the relevant feature.
- **Easier upgrades:** When you upgrade your extension, Chrome will not disable it for your users if
  the upgrade adds optional rather than required permissions.

### Step 2: Declare optional permissions in the manifest

Declare optional permissions in your [extension manifest][1] with the `optional_permissions` key,
using the same format as the [permissions][2] field:

```json
{
  "name": "My extension",
  ...
  "optional_permissions": [ "tabs", "http://www.google.com/" ],
  ...
}
```

If you want to request hosts that you only discover at runtime, include `"http://*/"` and/or
`"https://*/"` in your Manifest V2 extension's `optional_permission` field or in your Manifest V3
extension's `host_permissions` field. This lets you specify any origin in [Permissions.origins][3]
as long as it has a matching scheme.

**Permissions that can _not_ be specified as optional**

Most Chrome extension permissions can be specified as optional, with the following exceptions.

<table>
  <tbody>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
    <tr id="debugger">
      <td><code>"debugger"</code></td>
      <td>The <a href="debugger">chrome.debugger</a> API serves as an alternate transport for
        Chrome's <a href="/devtools/docs/debugger-protocol">remote debugging protocol </a>.</td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Grants the extension access to the <a
          href="declarativeNetRequest">chrome.declarativeNetRequest</a> API.</td>
    </tr>
    <tr id="devtools">
      <td><code>"devtools"</code></td>
      <td>Allows extension to expand <a href="devtools">Chrome DevTools</a> functionality.</td>
    </tr>
    <tr id="experimental">
      <td><code>"experimental"</code></td>
      <td><strong><a href="http://tools.google.com/dlpage/chromesxs">Canary</a> and <a
            href="https://www.chromium.org/getting-involved/dev-channel">Dev channel</a>
          only.</strong> Grants the extension access to <a
          href="experimental">chrome.experimental</a> APIs.</td>
    </tr>
    <tr id="geolocation">
      <td><code>"geolocation"</code></td>
      <td>Allows the extension to use the HTML5 <a
          href="https://w3c.github.io/geolocation-api/">geolocation</a> API.</td>
    </tr>
    <tr id="mdns">
      <td><code>"mdns"</code></td>
      <td>Grants the extension access to the <a href="mdns">chrome.mdns</a> API.</td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Grants the extension access to the <a href="mdns">chrome.proxy</a> API to manage Chrome's
        proxy settings.</td>
    </tr>
    <tr id="tts">
      <td><code>"tts"</code></td>
      <td>The <a href="tts">chrome.tts</a> API plays synthesized text-to-speech (TTS).</td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>The <a href="ttsEngine">chrome.ttsEngine</a> API implements a text-to-speech(TTS) engine
        using an extension.</td>
    </tr>
    <tr id="wallpaper">
      <td><code>"wallpaper"</code></td>
      <td><strong>ChromeOS only</strong>. Use the <a href="ttsEngine">chrome.wallpaper</a> API
        change the ChromeOS wallpaper.</td>
    </tr>
  </tbody>
</table>

View [Declare Permissions and Warn Users][17] for further information on available permissions and
their warnings.

### Step 3: Request optional permissions

Request the permissions from within a user gesture using `permissions.request()`:

```js
document.querySelector('#my-button').addEventListener('click', function(event) {
  // Permissions must be requested from inside a user gesture, like a button's
  // click handler.
  chrome.permissions.request({
    permissions: ['tabs'],
    origins: ['http://www.google.com/']
  }, function(granted) {
    // The callback argument will be true if the user granted the permissions.
    if (granted) {
      doSomething();
    } else {
      doSomethingElse();
    }
  });
});
```

Chrome prompts the user if adding the permissions results in different [warning messages][18] than
the user has already seen and accepted. For example, the previous code might result in a prompt like
this:

![example permission confirmation prompt](perms-optional.png)

### Step 4: Check the extension's current permissions

To check whether your extension has a specific permission or set of permissions, use
`permission.contains()`:

```js
chrome.permissions.contains({
  permissions: ['tabs'],
  origins: ['http://www.google.com/']
}, function(result) {
  if (result) {
    // The extension has the permissions.
  } else {
    // The extension doesn't have the permissions.
  }
});
```

### Step 5: Remove the permissions

You should remove permissions when you no longer need them. After a permission has been removed,
calling `permissions.request()` usually adds the permission back without prompting the user.

```js
chrome.permissions.remove({
  permissions: ['tabs'],
  origins: ['http://www.google.com/']
}, function(removed) {
  if (removed) {
    // The permissions have been removed.
  } else {
    // The permissions have not been removed (e.g., you tried to remove
    // required permissions).
  }
});
```

[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/declare_permissions#manifest
[3]: #property-Permissions-origins
[4]: /docs/extensions/debugger
[5]: /devtools/docs/debugger-protocol
[6]: /docs/extensions/declarativeNetRequest
[7]: /docs/extensions/mv2/devtools
[8]: https://tools.google.com/dlpage/chromesxs
[9]: https://www.chromium.org/getting-involved/dev-channel
[10]: /docs/extensions/experimental
[11]: https://w3c.github.io/geolocation-api/
[12]: /docs/extensions/mdns
[13]: /docs/extensions/mdns
[14]: /docs/extensions/tts
[15]: /docs/extensions/reference/ttsEngine
[16]: /docs/extensions/reference/ttsEngine
[17]: /docs/extensions/mv2/permission_warnings
[18]: /docs/extensions/mv2/permission_warnings
