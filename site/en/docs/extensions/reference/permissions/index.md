---
api: permissions
---

## Overview {: #overview }

Permission warnings exist to describe the capabilities granted by an API, but some of these warnings may not be obvious. The Permissions API allows developers to explain permission warnings and introduce new features gradually which gives users a risk-free introduction to the extension. This way, users can specify how much access they are willing to grant and which features they want to enable.

For example, the [optional permissions extension's][gh-optional-perms] core functionality is overriding the new tab page. One feature is displaying the user's goal of the day. This feature only requires the [storage][api-storage] permission, which does not include a warning. The extension has an additional feature, that users can enable by clicking the following button: 

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wtbjayBDYDyKZe2x580P.png",
       alt="Extension button that enables additional features", height="350", width="395" %}

Displaying the user's top sites requires the [topSites][api-top-sites] permission, which has the following warning.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5edHzqeUOJ8V6XHkjNBM.png",
       alt="Extension warning for topSites API", height="173", width="480" %}

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

Declare optional permissions in your [extension manifest][doc-manifest] with the `optional_permissions` key,
using the same format as the [permissions][doc-permissions] field:

```json
{
  "name": "My extension",
  ...
  "optional_permissions": ["tabs"],
  "optional_host_permissions": ["https://www.google.com/"],
  ...
}
```

If you want to request hosts that you only discover at runtime, include `"https://*/*"` in your extension's `optional_host_permissions` field. This lets you specify any origin in [Permissions.origins][perm-origins] as long as it has a matching
scheme.

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
      <td>The <a href="/docs/extensions/reference/debugger">chrome.debugger</a> API serves as an
        alternate transport for Chrome's <a
          href="https://chromedevtools.github.io/devtools-protocol/">remote debugging
            protocol</a>.</td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Grants the extension access to the <a
          href="/docs/extensions/reference/declarativeNetRequest">
        chrome.declarativeNetRequest</a> API.</td>
    </tr>
    <tr id="devtools">
      <td><code>"devtools"</code></td>
      <td>Allows extension to expand <a href="/docs/extensions/mv3/devtools/">Chrome DevTools</a>
        functionality.</td>
    </tr>
    <tr id="experimental">
      <td><code>"experimental"</code></td>
      <td><strong><a href="https://www.google.com/chrome/canary/">Canary</a> and <a
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
      <td>Grants the extension access to the
        <a href="/docs/extensions/reference/mdns">chrome.mdns</a> API.</td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Grants the extension access to the <a
          href="/docs/extensions/reference/proxy">chrome.proxy</a> API to manage Chrome's proxy
        settings.</td>
    </tr>
    <tr id="tts">
      <td><code>"tts"</code></td>
      <td>The <a href="/docs/extensions/reference/tts">chrome.tts</a> API plays synthesized
        text-to-speech (TTS).</td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>The <a href="/docs/extensions/reference/ttsEngine">chrome.ttsEngine</a> API implements a
        text-to-speech (TTS) engine using an extension.</td>
    </tr>
    <tr id="wallpaper">
      <td><code>"wallpaper"</code></td>
      <td><strong>ChromeOS only</strong>. Use the <a
          href="/docs/extensions/reference/wallpaper">chrome.wallpaper</a> API change the ChromeOS
        wallpaper.</td>
    </tr>
  </tbody>
</table>

View [Declare Permissions and Warn Users][doc-warnings] for further information on available permissions and
their warnings.

### Step 3: Request optional permissions

Request the permissions from within a user gesture using `permissions.request()`:

```js
document.querySelector('#my-button').addEventListener('click', (event) => {
  // Permissions must be requested from inside a user gesture, like a button's
  // click handler.
  chrome.permissions.request({
    permissions: ['tabs'],
    origins: ['https://www.google.com/']
  }, (granted) => {
    // The callback argument will be true if the user granted the permissions.
    if (granted) {
      doSomething();
    } else {
      doSomethingElse();
    }
  });
});
```

Chrome prompts the user if adding the permissions results in different [warning messages][doc-warnings] than
the user has already seen and accepted. For example, the previous code might result in a prompt like
this:

![example permission confirmation prompt](perms-optional.png)

### Step 4: Check the extension's current permissions

To check whether your extension has a specific permission or set of permissions, use
`permission.contains()`:

```js
chrome.permissions.contains({
  permissions: ['tabs'],
  origins: ['https://www.google.com/']
}, (result) => {
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
  origins: ['https://www.google.com/']
}, (removed) => {
  if (removed) {
    // The permissions have been removed.
  } else {
    // The permissions have not been removed (e.g., you tried to remove
    // required permissions).
  }
});
```

[api-storage]: /docs/extensions/reference/storage
[api-top-sites]: /docs/extensions/reference/topSites
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-permissions]: /docs/extensions/mv3/declare_permissions
[doc-warnings]: /docs/extensions/mv3/permission_warnings/#overview
[gh-optional-perms]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.optional_permissions
[perm-origins]: #property-Permissions-origins
[warning-msg]: /docs/extensions/mv3/permission_warnings/#overview
