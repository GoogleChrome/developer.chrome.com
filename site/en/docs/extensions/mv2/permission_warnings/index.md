---
layout: "layouts/doc-post.njk"
title: "Declare permissions and warn users"
date: 2012-09-18
updated: 2018-10-10
description: >
  How to implement permissions to protect your users and your Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

An extension's ability to access websites and most Chrome APIs is determined by its declared
[permissions][1]. Permissions should be restricted to only what is needed for its functionality.
Limiting permissions establishes an extension's capabilities and reduces possible incursion to data
if the extension is compromised by an attacker. Protect extensions and their users by implementing
explicit, minimal and optional permissions.

## Organize permissions {: #declare_manifest }

Permissions are known strings that refer to a Chrome API or [match patterns][2] that grant access to
one or more hosts. They are listed in the manifest and specified as required permissions or
[optional permissions][3].

```json
{
  "name": "Permissions Extension",
  ...
  // required permissions
  "permissions": [
    "activeTab",
    "contextMenus",
    "storage"
  ],
  // optional permissions
  "optional_permissions": [
    "topSites",
    "http://www.developer.chrome.com/*"
  ],
      ...
  "manifest_version": 2
}
```

Limit required permissions to only what is needed for the extension's core functionality. An
extension should not request more permissions than it currently needs; do not future proof by
requesting permissions that may be needed with updates.

Permissions needed for optional features should be registered as [optional permissions][4]. This
allows users to decide how much access they are willing to provide an extension and which features
are desired.

## Identify required permissions {: #required_permissions }

A simple extension may need to request multiple permissions, and many permissions display
[warnings][5] on installation. Users are more likely to trust an extension with limited warnings or
when permissions are explained to them.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VVyazEJTquUP7aa6OZn0.png",
       alt="Extension permission warnings on installation", height="369", width="486" %}

Identify the core functionality of an extension and what permissions are required for it. Consider
making features optional if they require permissions with warnings.

## Trigger optional permissions with events {: #optional_events }

The [optional permissions sample extension's][6] core functionality is overriding the new tab page.
One feature is displaying the user's goal of the day. This feature only requires the [storage][7]
permission, which does not include a warning.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wtbjayBDYDyKZe2x580P.png",
       alt="Extension button that enables additional features", height="350", width="395" %}

The extension has an additional feature; displaying the user's top sites. This feature requires the
[topSites][8] permission, which has a warning.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5edHzqeUOJ8V6XHkjNBM.png",
       alt="Extension warning for topSites API", height="173", width="480" %}

Developing features that rely on permissions with warnings as optional and introducing those
features organically gives users a risk free introduction to the extension. Additionally, this
allows users to further customize their experience with an extension and creates opportunity to
explain warnings.

## Substitute the activeTab permission {: #activeTab_permission }

The `activeTab` permission grants temporary access to the site the user is on and allows the
extension to use the [`"tabs"`][9] permission on the current tab. It replaces the need for
`"<all_urls>"` in many cases and displays no warning on installation.

Without activeTab:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/jb7SZPwm4zPoOT7BVMw3.png",
       alt="Permissions UI without activeTab", height="190", width="490" %}

With activeTab:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2QKcJJSz35suMsGSWXM4.png",
       alt="Permissions UI with activeTab", height="190", width="490" %}

The `activeTab` permission grants an extension temporary access to the currently active tab when the
[user invokes][10] the extension. If the extension is compromised, the attacker would need to wait
for the user to invoke the extension before obtaining access, and that access would only last until
the tab is navigated or closed.

While the `activeTab` permission is enabled for a tab, an extension can:

- Call [`tabs.executeScript`][11] or [`tabs.insertCSS`][12] on that tab.
- Get the URL, title, and favicon for that tab via an API that returns a [`tabs.Tab`][13] object.
- Intercept network requests in the tab to the tab's main frame origin using the [webRequest][14]
  API. The extension temporarily gets host permissions for the tab's main frame origin.

The following user gestures enable `activeTab`:

- Executing a [browser action][15]
- Executing a [page action][16]
- Executing a [context menu item][17]
- Executing a keyboard shortcut from the [commands API][18]
- Accepting a suggestion from the [omnibox API][19]

## Allowing access {: #allow_access }

If an extension needs to access `file://` URLs or operate in incognito mode, users will need to
enable access for those features inside the extension's detail page at chrome://extensions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CXSHPxG4giUkzfGR67mY.png",
       alt="Allow file urls and incognito mode on the extension detial page", height="137", width="674" %}

An extension can detect if it is enabled in incognito mode by calling
[`extension.isAllowedIncognitoAccess()`][20] or able run on `file://` URLs with
[`extension.isAllowedFileSchemeAccess()`][21] .

<!-- TODO duplicate ID (was previously #view_warnings) -->

## Understanding permissions

Permission warnings exist to describe the capabilities granted by an API to extension users, but
some of these warnings may not be obvious at first. For instance, adding the [`"tabs"`][22]
permission results in a seemingly unrelated warning: the extension can **Read your browsing
activity**. Although the `chrome.tabs` API might be used to only open new tabs, it can also be used
to see the URL that is associated with every newly opened tab by using their [tabs.Tab][23] objects.

When possible, implement [optional permissions][24] or a less powerful API to avoid alarming
warnings.

## Viewing warnings {: #view_warnings }

No permission warnings will be displayed if an extension is loaded as an unpacked file. To view an
extension's permission warnings, navigate to `chrome://extensions`, ensure developer mode is enabled
and click **PACK EXTENSION**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Jvm8mGpe3j0j0aydcRnR.png",
       alt="Developer Mode is Checked then Click Pack Extension", height="120", width="642" %}

Specify the path to the extension's folder in the Extension root directory field then click the
**Pack Extension** button. Ignore the **Private key** field for a first-time package.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vVw89rdJOdXFYxvgM9Sj.png",
       alt="Specify Extension Path then Click Pack Extension", height="307", width="524" %}

Chrome will create two files, a `.crx` file and a `.pem` file, which contains the extension's
private key.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GLrVd51VTUF86K8gUxu8.png",
       alt="Packaged Extension Files", height="288", width="521" %}

**Do not lose the private key!** Keep the `.pem` file in a secret and secure place; it will be
needed to [update][25] the extension.

Install the `.crx` file by dropping it into the Chrome Extension's Management page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KXm9vTnv5VRNZJ9e2AJt.png",
       alt="Drop File to Install", height="420", width="427" %}

After dropping the `.crx` file the browser will ask if the extension can be added and display
warnings.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4vOB4X8ZNbdk321eAzKS.png",
       alt="Warning for New Tab Extension", height="150", width="481" %}

### Permissions with warnings {: #permissions_with_warnings }

**Note:** Permission tables are updated on a best-effort basis and may contain slight discrepancies
with the current warnings. Additionally, some permissions may not display warnings when paired with
other permissions. For example, the [`"tabs"`][26] warning will not show if the extension also
requests `"<all_urls>"`. To verify the most recent warnings shown for extension permissions, follow
the steps in [Viewing Warnings][27].

<table>
  <tbody>
    <tr>
      <th>Permission</th>
      <th>Description</th>
      <th>Warning</th>
    </tr>
    <tr id="match_patterns">
      <td>
        <ul>
          <li><code>"http://*/*"</code></li>
          <li><code>"https://*/*"</code></li>
          <li><code>"*://*/*"</code></li>
          <li><code>"&lt;all_urls&gt;"</code></li>
        </ul>
      </td>
      <td>Grants the extension access to all hosts. It may be possible to avoid declaring any host permissions by using
        the <a href="#activeTab_permission">activeTab</a> permission.</td>
      <td><strong>Read and change all your data on the websites you visit</strong></td>
    </tr>
    <tr id="host">
      <td><code>"https://HostName.com/"</code></td>
      <td>Grants the extension access to <code>"https://HostName.com/"</code>. It may be possible to avoid declaring any
        host permissions by using the <a href="#activeTab_permission">activeTab</a> permission.</td>
      <td><strong>Read and change your data on <code>HostName.com</code></strong></td>
    </tr>
    <tr id="bookmarks">
      <td><code>"bookmarks"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/bookmarks">chrome.bookmarks</a> API.</td>
      <td><strong>Read and change your bookmarks</strong></td>
    </tr>
    <tr id="clipboardRead">
      <td><code>"clipboardRead"</code></td>
      <td>Required if the extension uses <code>document.execCommand('paste')</code>.</td>
      <td><strong>Read data you copy and paste</strong></td>
    </tr>
    <tr id="clipboardWrite">
      <td><code>"clipboardWrite"</code></td>
      <td>Indicates the extension uses <code>document.execCommand('copy')</code> or
        <code>document.execCommand('cut')</code>.</td>
      <td><strong>Modify data you copy and paste</strong></td>
    </tr>
    <tr id="contentSettings">
      <td><code>"contentSettings"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/contentSettings">chrome.contentSettings</a> API.</td>
      <td><strong>Change your settings that control websites' access to features such as cookies, JavaScript, plugins,
          geolocation, microphone, camera etc.</strong></td>
    </tr>
    <tr id="debugger">
      <td><code>"debugger"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/debugger">chrome.debugger</a> API.</td>
      <td>
        <ul>
          <li><strong>Access the page debugger backend</strong></li>
          <li><strong>Read and change all your data on the websites you visit</strong></li>
        </ul>
      </td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/declarativeNetRequest">chrome.declarativeNetRequest</a> API.</td>
      <td><strong>Block page content</strong></td>
    </tr>
    <tr id="desktopCapture">
      <td><code>"desktopCapture"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/desktopCapture">chrome.desktopCapture</a> API.</td>
      <td><strong>Capture content of your screen</strong></td>
    </tr>
    <tr id="downloads">
      <td><code>"downloads"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/downloads">chrome.downloads</a> API.</td>
      <td><strong>Manage your downloads</strong></td>
    </tr>
    <tr id="geolocation">
      <td><code>"geolocation"</code></td>
      <td>Allows the extension to use the HTML5 <a href="http://dev.w3.org/geo/api/spec-source.html">geolocation API</a>
        without prompting the user for permission.</td>
      <td><strong>Detect your physical location</strong></td>
    </tr>
    <tr id="history">
      <td><code>"history"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/history">chrome.history</a> API.</td>
      <td><strong>Read and change your browsing history</strong></td>
    </tr>
    <tr id="management">
      <td><code>"management"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/management">chrome.management</a> API.</td>
      <td><strong>Manage your apps, extensions, and themes</strong></td>
    </tr>
    <tr id="nativeMessaging">
      <td><code>"nativeMessaging"</code></td>
      <td>Gives the extension access to the <a href="/docs/extensions/mv2/messaging#native-messaging">native messaging API</a>.</td>
      <td><strong>Communicate with cooperating native applications</strong></td>
    </tr>
    <tr id="notifications">
      <td><code>"notifications"</code></td>
      <td>Grants your extension access to the <a href="/docs/extensions/reference/notifications">chrome.notifications</a> API.</td>
      <td><strong>Display notifications</strong></td>
    </tr>
    <tr id="pageCapture">
      <td><code>"pageCapture"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/pageCapture">chrome.pageCapture</a> API.</td>
      <td><strong>Read and change all your data on the websites you visit</strong></td>
    </tr>
    <tr id="privacy">
      <td><code>"privacy"</code></td>
      <td>Gives the extension access to the <a href="/docs/extensions/reference/privacy">chrome.privacy</a> API.</td>
      <td><strong>Change your privacy-related settings</strong></td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/proxy">chrome.proxy</a> API.</td>
      <td><strong>Read and change all your data on the websites you visit</strong></td>
    </tr>
    <tr id="system.storage">
      <td><code>"system.storage"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/system.storage">chrome.system.storage</a> API.</td>
      <td><strong>Identify and eject storage devices</strong></td>
    </tr>
    <tr id="tabCapture">
      <td><code>"tabCapture"</code></td>
      <td>Grants the extensions access to the <a href="/docs/extensions/reference/tabCapture">chrome.tabCapture</a> API.</td>
      <td><strong>Read and change all your data on the websites you visit</strong></td>
    </tr>
    <tr id="tabs">
      <td><code>"tabs"</code></td>
      <td>Grants the extension access to privileged fields of the <a
          href="/extensions/tabs#type-Tab"><code>Tab</code></a> objects used by several APIs
        including <a href="/extensions/tabs">chrome.tabs</a> and <a href="/docs/extensions/reference/windows">chrome.windows</a>. In
        many circumstances the extension will not need to declare the <code>"tabs"</code> permission to make use of
        these APIs.</td>
      <td><strong>Read your browsing history</strong></td>
    </tr>
    <tr id="topSites">
      <td><code>"topSites"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/topSites">chrome.topSites</a> API.</td>
      <td><strong>Read a list of your most frequently visited websites</strong></td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/ttsEngine">chrome.ttsEngine</a> API.</td>
      <td><strong>Read all text spoken using synthesized speech</strong></td>
    </tr>
    <tr id="webNavigation">
      <td><code>"webNavigation"</code></td>
      <td>Grants the extension access to the <a href="/docs/extensions/reference/webNavigation">chrome.webNavigation</a> API.</td>
      <td><strong>Read your browsing history</strong></td>
    </tr>
  </tbody>
</table>

## Update permissions {: #update_permissions }

Updating an extension with additional permissions may temporarily disable it. The user will have to
re-enable it after agreeing to any new warnings.

If the user manually updates an extension that now includes the [tabs][52] permission, they will get
a warning on the management page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gotD9HeWU8LsFdacTQkq.png",
       alt="Adding tabs Permission", height="193", width="481" %}

If the extension is updated automatically it will be disabled until the user agrees to the new
permissions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/usZSh31pGiJxhhuKmM8B.png",
       alt="Extension has been disabled", height="398", width="297" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZxRaaibQJSuZ6MZBvmmo.png",
       alt="Agree to permissions", height="159", width="286" %}

This can be avoided by making the new feature optional and adding new permission updates to
[`optional_permissions`][53] in the [manifest][54].

[1]: /docs/extensions/mv2/declare_permissions
[2]: /docs/extensions/mv2/match_patterns
[3]: /permissions#manifest
[4]: #optional_events
[5]: #permissions_with_warnings
[6]: /docs/extensions/mv2/samples#search:optional
[7]: /docs/extensions/reference/storage
[8]: /docs/extensions/reference/topSites
[9]: /docs/extensions/reference/tabs
[10]: #p_activeTab_gestures
[11]: /docs/extensions/reference/tabs#method-executeScript
[12]: /docs/extensions/reference/tabs#method-insertCSS
[13]: /docs/extensions/reference/tabs#type-Tab
[14]: /docs/extensions/reference/webRequest
[15]: /docs/extensions/reference/browserAction
[16]: /docs/extensions/reference/pageAction
[17]: /docs/extensions/reference/contextMenus
[18]: /docs/extensions/reference/commands
[19]: /docs/extensions/reference/omnibox
[20]: /docs/extensions/reference/extension#method-isAllowedIncognitoAccess
[21]: /docs/extensions/reference/extension#method-isAllowedFileSchemeAccess
[22]: /docs/extensions/reference/tabs
[23]: /docs/extensions/reference/tabs#type-Tab
[24]: #optional_events
[25]: #update_permissions
[26]: /docs/extensions/reference/tabs
[27]: #view_warnings_instructions
[28]: #activeTab_permission
[29]: #activeTab_permission
[30]: /docs/extensions/reference/bookmarks
[31]: /docs/extensions/reference/contentSettings
[32]: /docs/extensions/reference/debugger
[33]: /docs/extensions/reference/declarativeNetRequest
[34]: /docs/extensions/reference/desktopCapture
[35]: /docs/extensions/reference/downloads
[36]: http://dev.w3.org/geo/api/spec-source.html
[37]: /docs/extensions/reference/history
[38]: /docs/extensions/reference/management
[39]: /docs/extensions/mv2/messaging#native-messaging
[40]: /docs/extensions/reference/notifications
[41]: /docs/extensions/reference/pageCapture
[42]: /docs/extensions/reference/privacy
[43]: /docs/extensions/reference/proxy
[44]: /docs/extensions/reference/system.storage
[45]: /docs/extensions/reference/tabCapture
[46]: /docs/extensions/reference/tabs#type-Tab
[47]: /docs/extensions/reference/tabs
[48]: /docs/extensions/reference/windows
[49]: /docs/extensions/reference/topSites
[50]: /docs/extensions/reference/ttsEngine
[51]: /docs/extensions/reference/webNavigation
[52]: /docs/extensions/reference/tabs
[53]: /docs/extensions/reference/permissions#manifest
[54]: /docs/extensions/mv2/manifest
