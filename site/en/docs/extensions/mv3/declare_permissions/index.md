---
layout: "layouts/doc-post.njk"
title: "Declare permissions"
date: 2012-10-08
updated: 2014-05-21
description: An overview of the valid values for the permissions property in manifest.json.
---

To use most chrome.\* APIs, your extension or app must declare its intent in the permissions fields
of the [manifest][1]. Extensions can request three categories of permissions, specified using the
respective keys in the manifest:

* **`permissions`** contain items from a list of known strings (such as "geolocation")
* **`optional_permissions`** are like regular `permissions`, but are granted by the extension's user at runtime, rather than in advance
* **`host_permissions`** contain one or more [match patterns][2] that give access to one or more hosts

Permissions help to limit damage if your extension or app is compromised by
malware. Some permissions are displayed to users for their consent before
installation or at runtime as needed, as detailed in [Permission Warnings][3].

{% Aside %}
You should use optional permissions wherever the functionality of your extension
permits, to provide users with informed control over access to resources and data.
See the [platform vision][vision-optperms] to better understand this recommendation.
{% endAside %}

If an API requires you to declare a permission in the manifest, then its documentation tells you how
to do so. For example, the [Storage][4] page shows you how to declare the "storage" permission.

Here's an example of the permissions part of a manifest file:

```json
"permissions": [
  "tabs",
  "bookmarks",
  "unlimitedStorage"
],
"optional_permissions": [
  "unlimitedStorage"
],
"host_permissions": [
  "http://www.blogger.com/",
  "http://*.google.com/"
],
```

The following table lists the currently available permissions:

<table>
  <tbody>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
    <tr id="activeTab">
      <td><code>"activeTab"</code></td>
      <td>Requests that the extension be granted permissions according to the <a href="/docs/extensions/mv3/manifest/activeTab">activeTab</a>
        specification.</td>
    </tr>
    <tr id="alarms">
      <td><code>"alarms"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/alarms">chrome.alarms</a> API.</td>
    </tr>
    <tr id="background">
      <td><code>"background"</code></td>
      <td>
        <p id="bg">Makes Chrome start up early and and shut down late, so that apps and extensions can have a longer
          life.</p>
        <p>When any installed hosted app, packaged app, or extension has "background" permission, Chrome runs
          (invisibly) as soon as the user logs into their computer—before the user launches Chrome. The "background"
          permission also makes Chrome continue running (even after its last window is closed) until the user explicitly
          quits Chrome.</p>
        <div class="aside aside--note"><b>Note:</b> Disabled apps and extensions are treated as if they aren't
          installed.</div>
        <p>You typically use the "background" permission with a <a href="/docs/extensions/mv3/background_pages">background page</a>, <a
            href="/docs/apps/event_pages">event page</a> or (for hosted apps) a <a
            href="http://developers.google.com/chrome/apps/docs/background.html">background window</a>.</p>
      </td>
    </tr>
    <tr id="bookmarks">
      <td><code>"bookmarks"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/bookmarks/">chrome.bookmarks</a> API.</td>
    </tr>
    <tr id="browsingData">
      <td><code>"browsingData"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/browsingData/">chrome.browsingData</a> API.</td>
    </tr>
    <tr id="certificateProvider">
      <td><code>"certificateProvider"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/certificateProvider/">chrome.certificateProvider</a> API.</td>
    </tr>
    <tr id="clipboardRead">
      <td><code>"clipboardRead"</code></td>
      <td>Required if the extension or app uses <code>document.execCommand('paste')</code>.</td>
    </tr>
    <tr id="clipboardWrite">
      <td><code>"clipboardWrite"</code></td>
      <td>Indicates the extension or app uses <code>document.execCommand('copy')</code> or
        <code>document.execCommand('cut')</code>. This permission is <b>required for hosted apps</b>; it's recommended
        for extensions and packaged apps.</td>
    </tr>
    <tr id="contentSettings">
      <td><code>"contentSettings"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/contentSettings/">chrome.contentSettings</a> API.</td>
    </tr>
    <tr id="contextMenus">
      <td><code>"contextMenus"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/contextMenus/">chrome.contextMenus</a> API.</td>
    </tr>
    <tr id="cookies">
      <td><code>"cookies"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/cookies/">chrome.cookies</a> API.</td>
    </tr>
    <tr id="debugger">
      <td><code>"debugger"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/debugger/">chrome.debugger</a> API.</td>
    </tr>
    <tr id="declarativeContent">
      <td><code>"declarativeContent"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/declarativeContent/">chrome.declarativeContent</a> API.</td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/declarativeNetRequest/">chrome.declarativeNetRequest</a> API.</td>
    </tr>
    <tr id="declarativeNetRequestFeedback">
      <td><code>"declarativeNetRequestFeedback"</code></td>
      <td>Grants the extension access to events and methods within the <a
          href="/docs/extensions/reference/declarativeNetRequest/">chrome.declarativeNetRequest</a> API which return information on declarative
        rules matched.</td>
    </tr>
    <tr id="declarativeWebRequest">
      <td><code>"declarativeWebRequest"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/declarativeWebRequest/">chrome.declarativeWebRequest</a> API.</td>
    </tr>
    <!-- No corresponding reference entry
    <tr id="displaySource">
      <td><code>"displaySource"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/displaySource/">chrome.displaySource</a> API.</td>
    </tr>
    <tr id="dns">
      <td><code>"dns"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/dns/">chrome.dns</a> API.</td>
    </tr>
    -->
    <tr id="desktopCapture">
      <td><code>"desktopCapture"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/desktopCapture/">chrome.desktopCapture</a> API.</td>
    </tr>
    <tr id="documentScan">
      <td><code>"documentScan"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/documentScan/">chrome.documentScan</a> API.</td>
    </tr>
    <tr id="downloads">
      <td><code>"downloads"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/downloads/">chrome.downloads</a> API.</td>
    </tr>
    <tr id="enterprise.deviceAttributes">
      <td><code>"enterprise.deviceAttributes"</code></td>
      <td>Gives your extension access to the <a
          href="/docs/extensions/reference/enterprise_deviceAttributes/">chrome.enterprise.deviceAttributes</a> API.</td>
    </tr>
    <tr id="enterprise.hardwarePlatform">
      <td><code>"enterprise.hardwarePlatform"</code></td>
      <td>Gives your extension access to the <a
          href="/docs/extensions/reference/enterprise_hardwarePlatform/">chrome.enterprise.hardwarePlatform</a> API.</td>
    </tr>
    <tr id="enterprise.networkingAttributes">
      <td><code>"enterprise.networkingAttributes"</code></td>
      <td>Gives your extension access to the <a
          href="/docs/extensions/reference/enterprise_networkingAttributes/">chrome.enterprise.networkingAttributes</a> API.</td>
    </tr>
    <tr id="enterprise.platformKeys">
      <td><code>"enterprise.platformKeys"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/enterprise_platformKeys/">chrome.enterprise.platformKeys</a> API.
      </td>
    </tr>
    <tr id="experimental">
      <td><code>"experimental"</code></td>
      <td>Required if the extension or app uses any <a href="/docs/extensions/reference/#experimental_apis/">chrome.experimental.* APIs</a>.</td>
    </tr>
    <tr id="fileBrowserHandler">
      <td><code>"fileBrowserHandler"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/fileBrowserHandler/">chrome.fileBrowserHandler</a> API.</td>
    </tr>
    <tr id="fileSystemProvider">
      <td><code>"fileSystemProvider"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/fileSystemProvider/">chrome.fileSystemProvider</a> API.</td>
    </tr>
    <tr id="fontSettings">
      <td><code>"fontSettings"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/fontSettings/">chrome.fontSettings</a> API.</td>
    </tr>
    <tr id="gcm">
      <td><code>"gcm"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/gcm/">chrome.gcm</a> API.</td>
    </tr>
    <tr id="geolocation">
      <td><code>"geolocation"</code></td>
      <td>Allows the extension or app to use the <a
          href="https://dev.w3.org/geo/api/spec-source.html">geolocation API</a> without prompting the user for
        permission.</td>
    </tr>
    <tr id="history">
      <td><code>"history"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/history/">chrome.history</a> API.</td>
    </tr>
    <tr id="identity">
      <td><code>"identity"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/identity/">chrome.identity</a> API.</td>
    </tr>
    <tr id="idle">
      <td><code>"idle"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/idle/">chrome.idle</a> API.</td>
    </tr>
    <!-- No corresponding reference entry
    <tr id="idltest">
      <td><code>"idltest"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/idltest/">chrome.idltest</a> API.</td>
    </tr>
    <tr id="login">
      <td><code>"login"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/login/">chrome.login</a> API.</td>
    </tr>
    <tr id="loginScreenStorage">
      <td><code>"loginScreenStorage"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/loginScreenStorage/">chrome.loginScreenStorage</a> API.</td>
    </tr>
    -->
    <tr id="loginState">
      <td><code>"loginState"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/loginState/">chrome.loginState</a> API.</td>
    </tr>
    <tr id="management">
      <td><code>"management"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/management/">chrome.management</a> API.</td>
    </tr>
    <tr id="nativeMessaging">
      <td><code>"nativeMessaging"</code></td>
      <td>Gives your extension access to the <a href="/docs/apps/nativeMessaging/">native messaging API</a>.</td>
    </tr>
    <tr id="notifications">
      <td><code>"notifications"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/notifications/">chrome.notifications</a> API.</td>
    </tr>
    <tr id="pageCapture">
      <td><code>"pageCapture"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/pageCapture/">chrome.pageCapture</a> API.</td>
    </tr>
    <tr id="platformKeys">
      <td><code>"platformKeys"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/platformKeys/">chrome.platformKeys</a> API.</td>
    </tr>
    <tr id="power">
      <td><code>"power"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/power/">chrome.power</a> API.</td>
    </tr>
    <tr id="printerProvider">
      <td><code>"printerProvider"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/printerProvider/">chrome.printerProvider</a> API.</td>
    </tr>
    <tr id="printing">
      <td><code>"printing"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/printing/">chrome.printing</a> API.</td>
    </tr>
    <tr id="printingMetrics">
      <td><code>"printingMetrics"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/printingMetrics/">chrome.printingMetrics</a> API.</td>
    </tr>
    <tr id="privacy">
      <td><code>"privacy"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/privacy/">chrome.privacy</a> API.</td>
    </tr>
    <tr id="processes">
      <td><code>"processes"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/processes/">chrome.processes</a> API.</td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/proxy/">chrome.proxy</a> API.</td>
    </tr>
    <tr id="scripting">
      <td><code>"scripting"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/scripting/">chrome.scripting</a> API.</td>
    </tr>
    <tr id="search">
      <td><code>"search"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/search/">chrome.search</a> API.</td>
    </tr>
    <tr id="sessions">
      <td><code>"sessions"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/sessions/">chrome.sessions</a> API.</td>
    </tr>
    <tr id="signedInDevices">
      <td><code>"signedInDevices"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/signedInDevices/">chrome.signedInDevices</a> API.</td>
    </tr>
    <tr id="storage">
      <td><code>"storage"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/storage/">chrome.storage</a> API.</td>
    </tr>
    <tr id="system.cpu">
      <td><code>"system.cpu"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/system_cpu/">chrome.system.cpu</a> API.</td>
    </tr>
    <tr id="system.display">
      <td><code>"system.display"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/system_display/">chrome.system.display</a> API.</td>
    </tr>
    <tr id="system.memory">
      <td><code>"system.memory"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/system_memory/">chrome.system.memory</a> API.</td>
    </tr>
    <tr id="system.storage">
      <td><code>"system.storage"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/system_storage/">chrome.system.storage</a> API.</td>
    </tr>
    <tr id="tabCapture">
      <td><code>"tabCapture"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/tabCapture/">chrome.tabCapture</a> API.</td>
    </tr>
    <tr id="tabGroups">
      <td><code>"tabGroups"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/tabGroups/">chrome.tabGroups</a> API.</td>
    </tr>
    <tr id="tabs">
      <td><code>"tabs"</code></td>
      <td>Gives your extension access to privileged fields of the <a
          href="/docs/extensions/reference/tabs#type-Tab"><code>Tab</code></a> objects used by several APIs
        including <a href="/docs/extensions/reference/tabs">chrome.tabs</a> and <a href="/docs/extensions/reference/windows">chrome.windows</a>. In
        many circumstances your extension will not need to declare the <code>"tabs"</code> permission to make use of
        these APIs.</td>
    </tr>
    <tr id="topSites">
      <td><code>"topSites"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/topSites/">chrome.topSites</a> API.</td>
    </tr>
    <tr id="tts">
      <td><code>"tts"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/tts/">chrome.tts</a> API.</td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/ttsEngine/">chrome.ttsEngine</a> API.</td>
    </tr>
    <tr id="unlimitedStorage">
      <td><code>"unlimitedStorage"</code></td>
      <td>Provides an unlimited quota for storing client-side data, such as databases and local storage files.
        Without this permission, the extension or app is limited to 5 MB of local storage.<div
          class="aside aside--note"><b>Note:</b> This permission applies only to Web SQL Database and application cache
          (see issue <a href="http://crbug.com/58985">58985</a>). Also, it doesn't currently work with wildcard
          subdomains such as <code>http://*.example.com</code>.</div>
      </td>
    </tr>
    <tr id="vpnProvider">
      <td><code>"vpnProvider"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/vpnProvider/">chrome.vpnProvider</a> API.</td>
    </tr>
    <tr id="wallpaper">
      <td><code>"wallpaper"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/wallpaper/">chrome.wallpaper</a> API.</td>
    </tr>
    <tr id="webNavigation">
      <td><code>"webNavigation"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/webNavigation/">chrome.webNavigation</a> API.</td>
    </tr>
    <tr id="webRequest">
      <td><code>"webRequest"</code></td>
      <td>Gives your extension access to the <a href="/docs/extensions/reference/webRequest/">chrome.webRequest</a> API.</td>
    </tr>
    <tr id="webRequestBlocking">
      <td><code>"webRequestBlocking"</code></td>
      <td>Required if the extension uses the <a href="/docs/extensions/reference/webRequest/">chrome.webRequest</a> API in a blocking fashion.</td>
    </tr>
  </tbody>
</table>

[1]: /docs/extensions/mv3/manifest
[2]: /docs/extensions/mv3/match_patterns
[3]: /docs/extensions/mv3/permission_warnings
[4]: /docs/extensions/reference/storage
[5]: /docs/extensions/activeTab
[6]: /docs/extensions/alarms
[7]: /docs/extensions/mv3/background_pages
[8]: /docs/extensions/mv3/event_pages
[9]: http://developers.google.com/chrome/apps/docs/background.html
[10]: /docs/extensions/bookmarks
[11]: /docs/extensions/browsingData
[12]: /docs/extensions/certificateProvider
[13]: /docs/extensions/contentSettings
[14]: /docs/extensions/contextMenus
[15]: /docs/extensions/cookies
[16]: /docs/extensions/debugger
[17]: /docs/extensions/declarativeContent
[18]: /docs/extensions/declarativeNetRequest
[19]: /docs/extensions/declarativeNetRequest
[20]: /docs/extensions/declarativeWebRequest
[21]: /docs/extensions/desktopCapture
[22]: /docs/extensions/displaySource
[23]: /docs/extensions/dns
[24]: /docs/extensions/documentScan
[25]: /docs/extensions/downloads
[26]: /docs/extensions/enterprise.deviceAttributes
[27]: /docs/extensions/enterprise.hardwarePlatform
[28]: /docs/extensions/enterprise.networkingAttributes
[29]: /docs/extensions/enterprise.platformKeys
[30]: /docs/extensions/experimental
[31]: /docs/extensions/reference/fileBrowserHandler
[32]: /docs/extensions/fileSystemProvider
[33]: /docs/extensions/fontSettings
[34]: /docs/extensions/gcm
[35]: http://dev.w3.org/geo/api/spec-source.html
[36]: /docs/extensions/history
[37]: /docs/extensions/identity
[38]: /docs/extensions/idle
[39]: /docs/extensions/idltest
[40]: /docs/extensions/login
[41]: /docs/extensions/loginScreenStorage
[42]: /docs/extensions/loginState
[43]: /docs/extensions/management
[44]: /docs/extensions/mv3/messaging#native-messaging
[45]: /docs/extensions/notifications
[46]: /docs/extensions/pageCapture
[47]: /docs/extensions/platformKeys
[48]: /docs/extensions/power
[49]: /docs/extensions/printerProvider
[50]: /docs/extensions/printing
[51]: /docs/extensions/printingMetrics
[52]: /docs/extensions/privacy
[53]: /docs/extensions/processes
[54]: /docs/extensions/proxy
[55]: /docs/extensions/scripting
[56]: /docs/extensions/search
[57]: /docs/extensions/sessions
[58]: /docs/extensions/signedInDevices
[59]: /docs/extensions/storage
[60]: /docs/extensions/system.cpu
[61]: /docs/extensions/system.display
[62]: /docs/extensions/system.memory
[63]: /docs/extensions/system.storage
[64]: /docs/extensions/tabCapture
[65]: /docs/extensions/tabGroups
[66]: /docs/extensions/tabs#type-Tab
[67]: /docs/extensions/tabs
[68]: /docs/extensions/windows
[69]: /docs/extensions/topSites
[70]: /docs/extensions/tts
[71]: /docs/extensions/reference/ttsEngine
[72]: http://crbug.com/58985
[73]: /docs/extensions/vpnProvider
[74]: /docs/extensions/wallpaper
[75]: /docs/extensions/webNavigation
[76]: /docs/extensions/webRequest
[77]: /docs/extensions/webRequest
[vision-optperms]: /docs/extensions/mv3/intro/platform-vision/#improved-user-visibility-and-control
