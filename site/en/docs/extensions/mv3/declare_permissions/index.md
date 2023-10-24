---
layout: "layouts/doc-post.njk"
title: "Declare permissions"
seoTitle: "Chrome Extensions Declare permissions"
date: 2012-10-08
updated: 2023-09-27
description: An overview of the valid values for the permissions property in manifest.json.
---

To use most [extension APIs][api-ref] and features, you must declare your extension's intent in the [manifest's](#manifest) permissions fields. Extensions can request the following categories of permissions, specified using the respective manifest keys:

[`"permissions"`](#permissions)
: Contains items from a list of [known strings](#permissions). Changes may trigger a [warning](#warnings).

[`"optional_permissions"`][api-perms]
: Granted by the user at runtime, instead of at install time.

[`"content_scripts.matches"`][doc-cs-static]
: Contains one or more [match patterns][doc-match] that allows content scripts to inject into one or more hosts. Changes may trigger a [warning](#warnings).

[`"host_permissions"`](#host-permissions)
: Contains one or more [match patterns][doc-match] that give access to one or more hosts. Changes may trigger a [warning](#warnings).

`"optional_host_permissions"`
: Granted by the user at runtime, instead of at install time.

Permissions help to limit damage if your extension is compromised by malware. Some permission warning are displayed to users for their consent before
installation or at runtime, as detailed in [Permission with warnings](#warnings).

Consider using [optional permissions][api-perms] wherever the functionality of your extension
permits, to provide users with informed control over access to resources and data.
For more information, see the [platform vision][vision-optperms] statement.

If an API requires a permission, its documentation explains how to declare it. For an
example, see [Storage API][api-storage].

## Manifest {: #manifest }

The following is an example of the permissions section of a [manifest][doc-manifest] file:

{% Label %}manifest.json:{% endLabel %}

```json
{
  "name": "Permissions Extension",
  ...
  "permissions": [
    "activeTab",
    "contextMenus",
    "storage"
  ],
  "optional_permissions": [
    "topSites",
  ],
  "host_permissions": [
    "https://www.developer.chrome.com/*"
  ],
  "optional_host_permissions":[
    "https://*/*",
    "http://*/*"
  ],
  ...
  "manifest_version": 3
}
```

## Host permissions {: #host-permissions }

Host permissions allow extensions to interact with the URL's [matching patterns][doc-match]. Some [Chrome APIs][api-ref] require host permissions in addition to their own API permissions, which are documented on each reference page. Here are some examples:

- Make [`fetch()`][mdn-fetch] requests from the extension service worker and extension pages.
- Read and query the sensitive [tab properties][api-tabs-tab] (url, title, and favIconUrl) using the [`chrome.tabs`][api-tabs] API.
- Inject a [content script programmatically][cs-prog].
- Monitor and control the network requests with the [`chrome.webRequest`][api-webrequest] API.
- Access cookies with the [`chrome.cookies`][api-cookies] API.
- Redirect and modify requests and response headers using [`chrome.declarativeNetRequest`][api-dnr] API.

## Permissions with warnings {:#warnings }

When an extension requests multiple permissions, and many of them display
warnings on installation, the user will see a list of warnings, like in the following example:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VVyazEJTquUP7aa6OZn0.png",
       alt="Extension permission warnings on installation", height="369", width="486" %}

Users are more likely to trust an extension with limited warnings or when permissions are explained
to them. Consider implementing [optional permissions][api-perms] or a less powerful API to avoid alarming
warnings. For a complete list of best practices, see [Permission warnings guidelines][doc-warning].

Adding or changing match patterns in the `"host_permissions"` and `"content_scripts.matches"` fields will also trigger a [warning](#warnings). To learn more, see [Updating permissions][perm-update].

## Allow access {: #allow_access }

If your extension needs to run on `file://` URLs or operate in incognito mode, users must give the extension access on its details page. You can find instructions for opening the details page under [Manage your extensions](https://support.google.com/chrome_webstore/answer/2664769?hl=en#:~:text=Manage%20your%20extensions).

{% Details %}
{% DetailsSummary %}

### Allow access to file URLs and incognito pages

{% endDetailsSummary %}

1. Right-click the extension icon in Chrome.
2. Choose **Manage Extension**.

    <figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/hZZMDG0SEoCaHWkfwqbY.png", alt="Extension context menu", width="363", height="334", class='screenshot' %}
    <figcaption>
    Extension menu
    </figcaption>
  </figure>

3. Scroll down to enable access to file URLs or incognito mode.

    <figure>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CXSHPxG4giUkzfGR67mY.png",
          alt="Allow file URLs and incognito mode on the extension detail page", height="137", width="674", class="screenshot" %}
      <figcaption>
      Access enabled to file URLs and incognito mode.
      </figcaption>
    </figure>

{% endDetails %}

To detect whether the user has allowed access, you can call [`extension.isAllowedIncognitoAccess()`][incognito-allow] or
[`extension.isAllowedFileSchemeAccess()`][file-scheme-allow].

## Permissions list {: #permissions }

Here's the list of permissions. See [Permission warnings][doc-warning-table] for a list of permission warnings.

`"accessibilityFeatures.modify"`
: Lets extensions modify accessibility states when using the <a href="/docs/extensions/reference/accessibilityFeatures/"><code>chrome.accessibilityFeatures</code></a> API.

`"accessibilityFeatures.read"`
: Lets extensions read accessibility states when using the <a href="/docs/extensions/reference/accessibilityFeatures/"><code>chrome.accessibilityFeatures</code></a> API.

`"activeTab"`
: Gives temporary access to the active tab through a user gesture. See <a href="/docs/extensions/mv3/manifest/activeTab"><code>activeTab</code></a>
for details.

`"alarms"`
: Gives access to the <a href="/docs/extensions/reference/alarms"><code>chrome.alarms</code></a> API.

`"audio"`
: Gives access to the <a href="/docs/extensions/reference/audio"><code>chrome.audio</code></a> API.

`"background"`
: Makes Chrome start up early (as soon as the user logs into their computer, before they launch Chrome), and shut down late (even after its last window is closed, until the user explicitly quits Chrome).

`"bookmarks"`
: Gives access to the <a href="/docs/extensions/reference/bookmarks/">chrome.bookmarks</a> API.

`"browsingData"`
: Gives access to the <a href="/docs/extensions/reference/browsingData/">chrome.browsingData</a> API.

`"certificateProvider"`
: Gives access to the <a href="/docs/extensions/reference/certificateProvider/">chrome.certificateProvider</a> API.

`"contentSettings"`
: Gives access to the <a href="/docs/extensions/reference/contentSettings/">chrome.contentSettings</a> API.

`"contextMenus"`
: Gives access to the <a href="/docs/extensions/reference/contextMenus/">chrome.contextMenus</a> API.

`"cookies"`
: Gives access to the <a href="/docs/extensions/reference/cookies/">chrome.cookies</a> API.

`"debugger"`
: Gives access to the <a href="/docs/extensions/reference/debugger/">chrome.debugger</a> API.

`"declarativeContent"`
: Gives access to the <a href="/docs/extensions/reference/declarativeContent/">chrome.declarativeContent</a> API.

`"declarativeNetRequest"`
: Gives access to the <a href="/docs/extensions/reference/declarativeNetRequest/">chrome.declarativeNetRequest</a> API.

`"declarativeNetRequestWithHostAccess"`
: Gives access to the <a href="/docs/extensions/reference/declarativeNetRequest/">chrome.declarativeNetRequest</a> API when host permissions are required.

`"declarativeNetRequestFeedback"`
: Gives permission to write errors and warnings to the DevTools console when using the <a
          href="/docs/extensions/reference/declarativeNetRequest/">chrome.declarativeNetRequest</a> API. This permission is for use with [unpacked extensions](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) and is ignored for extensions installed from the Chrome Web Store.

`"dns"`
: Gives access to the <a href="/docs/extensions/reference/dns/">chrome.dns</a> API.

`"desktopCapture"`
: Gives access to the <a href="/docs/extensions/reference/desktopCapture/">chrome.desktopCapture</a> API.

`"documentScan"`
: Gives access to the <a href="/docs/extensions/reference/documentScan/">chrome.documentScan</a> API.

`"downloads"`
: Gives access to the <a href="/docs/extensions/reference/downloads/">chrome.downloads</a> API.

`"downloads.open"`
: Allows the use of <a href="/docs/extensions/reference/downloads/#method-open">chrome.downloads.open()</a>.

`"downloads.ui"`
: Allows the use of <a href="/docs/extensions/reference/downloads/#method-setUiOptions">chrome.downloads.setUiOptions()</a>.

`"enterprise.deviceAttributes"`
: Gives access to the <a href="/docs/extensions/reference/enterprise_deviceAttributes/">chrome.enterprise.deviceAttributes</a> API.

`"enterprise.hardwarePlatform"`
: Gives access to the <a
          href="/docs/extensions/reference/enterprise_hardwarePlatform/">chrome.enterprise.hardwarePlatform</a> API.

`"enterprise.networkingAttributes"`
: Gives access to the <a        href="/docs/extensions/reference/enterprise_networkingAttributes/">chrome.enterprise.networkingAttributes</a> API.

`"enterprise.platformKeys"`
: Gives access to the <a href="/docs/extensions/reference/enterprise_platformKeys/">chrome.enterprise.platformKeys</a> API.

`"favicon"`
: Grants access to the [Favicon](/docs/extensions/mv3/favicon/) API.

`"fileBrowserHandler"`
: Gives access to the <a href="/docs/extensions/reference/fileBrowserHandler/">chrome.fileBrowserHandler</a> API.

`"fileSystemProvider"`
: Gives access to the <a href="/docs/extensions/reference/fileSystemProvider/">chrome.fileSystemProvider</a> API.

`"fontSettings"`
: Gives access to the <a href="/docs/extensions/reference/fontSettings/">chrome.fontSettings</a> API.

`"gcm"`
: Gives access to the <a href="/docs/extensions/reference/gcm/"><code>chrome.gcm</code></a> and <a href="https://developer.chrome.com/docs/extensions/reference/instanceID/"><code>chrome.instanceID</code></a> APIs.

`"geolocation"`
: Allows the extension to use the <a
          href="https://developer.mozilla.org/docs/Web/API/Geolocation_API">geolocation API</a> without prompting the user for permission.

`"history"`
: Gives access to the <a href="/docs/extensions/reference/history/">chrome.history</a> API.

`"identity"`
: Gives access to the <a href="/docs/extensions/reference/identity/">chrome.identity</a> API.

`"idle"`
: Gives access to the <a href="/docs/extensions/reference/idle/">chrome.idle</a> API.

`"loginState"`
: Gives access to the <a href="/docs/extensions/reference/loginState/">chrome.loginState</a> API.

`"management"`
: Gives access to the <a href="/docs/extensions/reference/management/">chrome.management</a> API.

`"nativeMessaging"`
: Gives access to the <a href="/docs/extensions/mv3/nativeMessaging/">native messaging API</a>.

`"notifications"`
: Gives access to the <a href="/docs/extensions/reference/notifications/">chrome.notifications</a> API.

`"offscreen"`
: Gives access to the <a href="/docs/extensions/reference/offscreen/"><code>chrome.offscreen</code></a> API.

`"pageCapture"`
: Gives access to the <a href="/docs/extensions/reference/pageCapture/">chrome.pageCapture</a> API.

`"platformKeys"`
: Gives access to the <a href="/docs/extensions/reference/platformKeys/">chrome.platformKeys</a> API.

`"power"`
: Gives access to the <a href="/docs/extensions/reference/power/">chrome.power</a> API.

`"printerProvider"`
: Gives access to the <a href="/docs/extensions/reference/printerProvider/">chrome.printerProvider</a> API.

`"printing"`
: Gives access to the <a href="/docs/extensions/reference/printing/">chrome.printing</a> API.

`"printingMetrics"`
: Gives access to the <a href="/docs/extensions/reference/printingMetrics/">chrome.printingMetrics</a> API.

`"privacy"`
: Gives access to the <a href="/docs/extensions/reference/privacy/">chrome.privacy</a> API.

`"processes"`
: Gives access to the <a href="/docs/extensions/reference/processes/">chrome.processes</a> API.

`"proxy"`
: Gives access to the <a href="/docs/extensions/reference/proxy/">chrome.proxy</a> API.

`"runtime"`
: Gives access to <a href="/docs/extensions/reference/runtime/#method-connectNative"><code>runtime.conntectNative()</code></a> and <a href="/docs/extensions/reference/runtime/#method-sendNativeMessage"><code>runtime.sendNatriceMessage()</code></a>. For all other features of the <code>runtime</code> namespace, no permission is required.

`"scripting"`
: Gives access to the <a href="/docs/extensions/reference/scripting/">chrome.scripting</a> API.

`"search"`
: Gives access to the <a href="/docs/extensions/reference/search/">chrome.search</a> API.

`"sessions"`
: Gives access to the <a href="/docs/extensions/reference/sessions/">chrome.sessions</a> API.

`"sidePanel"`
: Gives access to the <a href="/docs/extensions/reference/sidePanel/">chrome.sidePanel</a> API.

`"storage"`
: Gives access to the <a href="/docs/extensions/reference/storage/">chrome.storage</a> API.

`"system.cpu"`
: Gives access to the <a href="/docs/extensions/reference/system_cpu/">chrome.system.cpu</a> API.

`"system.display"`
: Gives access to the <a href="/docs/extensions/reference/system_display/">chrome.system.display</a> API.

`"system.memory"`
: Gives access to the <a href="/docs/extensions/reference/system_memory/">chrome.system.memory</a> API.

`"system.storage"`
: Gives access to the <a href="/docs/extensions/reference/system_storage/">chrome.system.storage</a> API.

`"tabCapture"`
: Gives access to the <a href="/docs/extensions/reference/tabCapture/">chrome.tabCapture</a> API.

`"tabGroups"`
: Gives access to the <a href="/docs/extensions/reference/tabGroups/">chrome.tabGroups</a> API.

`"tabs"`
: Gives access to privileged fields of the <a
          href="/docs/extensions/reference/tabs#type-Tab"><code>Tab</code></a> objects used by several APIs,
including <a href="/docs/extensions/reference/tabs">chrome.tabs</a> and <a href="/docs/extensions/reference/windows">chrome.windows</a>. You usually won't need to declare this permission to use those APIs.

`"topSites"`
: Gives access to the <a href="/docs/extensions/reference/topSites/">chrome.topSites</a> API.

`"tts"`
: Gives access to the <a href="/docs/extensions/reference/tts/">chrome.tts</a> API.

`"ttsEngine"`
: Gives access to the <a href="/docs/extensions/reference/ttsEngine/">chrome.ttsEngine</a> API.

`"unlimitedStorage"`
: Provides an unlimited quota for <a href="/docs/extensions/reference/storage#property-local">chrome.storage.local</a>, <a href="https://developer.mozilla.org/docs/Web/API/IndexedDB_API">IndexedDB</a>,
      <a href="https://developer.mozilla.org/docs/Web/API/Cache">Cache Storage</a> and <a href="https://web.dev/origin-private-file-system/">Origin Private File System</a>. For more information,
      see <a href="/docs/extensions/mv3/storage-and-cookies">Storage and cookies</a>.

`"vpnProvider"`
: Gives access to the <a href="/docs/extensions/reference/vpnProvider/">chrome.vpnProvider</a> API.

`"wallpaper"`
: Gives access to the <a href="/docs/extensions/reference/wallpaper/">chrome.wallpaper</a> API.

`"webAuthenticationProxy"`
: Gives access to the <a href="/docs/extensions/reference/webAuthenticationProxy/">chrome.webAuthenticationProxy</a> API.

`"webNavigation"`
: Gives access to the <a href="/docs/extensions/reference/webNavigation/">chrome.webNavigation</a> API.

`"webRequest"`
: Gives access to the <a href="/docs/extensions/reference/webRequest/">chrome.webRequest</a> API.

`"webRequestBlocking"`
: Allows the use of the <a href="/docs/extensions/reference/webRequest/">chrome.webRequest</a> API for blocking.

[api-cookies]: /docs/extensions/reference/cookies
[api-dnr]: /docs/extensions/reference/declarativeNetRequest
[api-perms]: /docs/extensions/reference/permissions
[api-ref]: /docs/extensions/reference/
[api-storage]: /docs/extensions/reference/storage
[api-tabs-tab]: /docs/extensions/reference/tabs/#type-Tab
[api-tabs]: /docs/extensions/reference/tabs/
[api-webrequest]: /docs/extensions/reference/webRequest
[cs-prog]: /docs/extensions/mv3/content_scripts#programmatic
[doc-cs-static]: /docs/extensions/mv3/content_scripts#static-declarative
[doc-cs]: /docs/extensions/mv3/content_scripts
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match]: /docs/extensions/mv3/match_patterns
[doc-warning-table]: /docs/extensions/mv3/permission_warnings/#permissions_with_warnings
[doc-warning]: /docs/extensions/mv3/permission_warnings
[mdn-fetch]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[perm-update]: /docs/extensions/mv3/permission_warnings/#update_permissions
[vision-optperms]: /docs/extensions/mv3/intro/platform-vision/#improved-user-visibility-and-control
[file-scheme-allow]: /docs/extensions/reference/extension/#method-isAllowedFileSchemeAccess
[incognito-allow]: /docs/extensions/reference/extension/#method-isAllowedIncognitoAccess
[indexeddb]: https://developer.mozilla.org/docs/Web/API/IndexedDB_API
[cache-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[opfs]: https://web.dev/origin-private-file-system/
[storage-and-cookies]: /docs/extensions/mv3/storage-and-cookies
