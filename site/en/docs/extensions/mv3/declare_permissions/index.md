---
layout: "layouts/doc-post.njk"
title: "Declare permissions"
seoTitle: "Chrome Extensions Declare permissions"
date: 2012-10-08
updated: 2023-01-28
description: An overview of the valid values for the permissions property in manifest.json.
---

To use most [Chrome APIs][apis-ref], your extension must declare its intent in the permissions fields
of the [manifest][doc-manifest]. Extensions can request four categories of permissions, specified using the
respective keys in the manifest:

`permissions`
: contain items from a list of known strings (such as `"geolocation"`).

`optional_permissions`
: are like regular `permissions`, but are granted by the extension's user at runtime, rather than in advance.

`host_permissions`
: contain one or more [match patterns][doc-match] that give access to one or more hosts.

`optional_host_permissions`
: are like regular `host_permissions`, but are granted by the extension's user at runtime, rather than in advance.

Permissions help to limit damage if your extension is compromised by
malware. Some permissions are displayed to users for their consent before
installation or at runtime as needed, as detailed in [Permission Warnings][doc-warning].

{% Aside %}
You should use [optional permissions][api-perms] wherever the functionality of your extension
permits, to provide users with informed control over access to resources and data.
See the [platform vision][vision-optperms] to better understand this recommendation.
{% endAside %}

If an API requires you to declare a permission in the manifest, then its documentation tells you how
to do so. For example, the [Storage][api-storage] page shows how to declare the `"storage"` permission.

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
"optional_host_permissions": [
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
      <td>Gives access to the <a href="/docs/extensions/reference/alarms">alarms</a> API.</td>
    </tr>
    <tr id="background">
      <td><code>"background"</code></td>
      <td>
        <p id="bg">Makes Chrome start up early and shut down late, so that extensions can have a longer
          life.</p>
        <p>When any installed extension has "background" permission, Chrome runs
          (invisibly) as soon as the user logs into their computer—before the user launches  The "background"
          permission also makes Chrome continue running (even after its last window is closed) until the user explicitly
          quits </p>
        <div class="aside aside--note"><b>Note:</b> Disabled extensions are treated as if they aren't
          installed.</div>
	<p>You should use the "background" permission with <a
          href="/docs/extensions/mv3/background_pages/">background scripts</a>.</p></td>
    </tr>
    <tr id="bookmarks">
      <td><code>"bookmarks"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/bookmarks/">Bookmarks</a> API.</td>
    </tr>
    <tr id="browsingData">
      <td><code>"browsingData"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/browsingData/">BrowsingData</a> API.</td>
    </tr>
    <tr id="certificateProvider">
      <td><code>"certificateProvider"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/certificateProvider/">CertificateProvider</a> API.</td>
    </tr>
    <tr id="clipboardRead">
      <td><code>"clipboardRead"</code></td>
      <td>Required if the extension uses <code>document.execCommand('paste')</code>.</td>
    </tr>
    <tr id="clipboardWrite">
      <td><code>"clipboardWrite"</code></td>
      <td>Required if the extension uses <code>document.execCommand('copy')</code> or
        <code>document.execCommand('cut')</code>.
    </tr>
    <tr id="contentSettings">
      <td><code>"contentSettings"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/contentSettings/">ContentSettings</a> API.</td>
    </tr>
    <tr id="contextMenus">
      <td><code>"contextMenus"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/contextMenus/">ContextMenus</a> API.</td>
    </tr>
    <tr id="cookies">
      <td><code>"cookies"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/cookies/">Cookies</a> API.</td>
    </tr>
    <tr id="debugger">
      <td><code>"debugger"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/debugger/">Debugger</a> API.</td>
    </tr>
    <tr id="declarativeContent">
      <td><code>"eclarativeContent"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/declarativeContent/">DeclarativeContent</a> API.</td>
    </tr>
    <tr id="declarativeNetRequest">
      <td><code>"declarativeNetRequest"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/declarativeNetRequest/">DeclarativeNetRequest</a> API.</td>
    </tr>
    <tr id="declarativeNetRequestFeedback">
      <td><code>"declarativeNetRequestFeedback"</code></td>
      <td>Gives access to events and methods within the <a
          href="/docs/extensions/reference/declarativeNetRequest/">DeclarativeNetRequest</a> API which return information on declarative
        rules matched.</td>
    </tr>
    <tr id="declarativeWebRequest">
      <td><code>"declarativeWebRequest"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/declarativeWebRequest/">DeclarativeWebRequest</a> API.</td>
    </tr>
    <!-- No corresponding reference entry
    <tr id="displaySource">
      <td><code>"displaySource"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/displaySource/">displaySource</a> API.</td>
    </tr>
    <tr id="dns">
      <td><code>"dns"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/dns/">dns</a> API.</td>
    </tr>
    -->
    <tr id="desktopCapture">
      <td><code>"desktopCapture"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/desktopCapture/">DesktopCapture</a> API.</td>
    </tr>
    <tr id="documentScan">
      <td><code>"documentScan"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/documentScan/">DocumentScan</a> API.</td>
    </tr>
    <tr id="downloads">
      <td><code>"downloads"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/downloads/">Downloads</a> API.</td>
    </tr>
    <tr id="enterprise.deviceAttributes">
      <td><code>"enterprise.deviceAttributes"</code></td>
      <td>Gives access to the <a
          href="/docs/extensions/reference/enterprise_deviceAttributes/">Enterprise.deviceAttributes</a> API.</td>
    </tr>
    <tr id="enterprise.hardwarePlatform">
      <td><code>"enterprise.hardwarePlatform"</code></td>
      <td>Gives access to the <a
          href="/docs/extensions/reference/enterprise_hardwarePlatform/">Enterprise.hardwarePlatform</a> API.</td>
    </tr>
    <tr id="enterprise.networkingAttributes">
      <td><code>"enterprise.networkingAttributes"</code></td>
      <td>Gives access to the <a
          href="/docs/extensions/reference/enterprise_networkingAttributes/">Enterprise.networkingAttributes</a> API.</td>
    </tr>
    <tr id="enterprise.platformKeys">
      <td><code>"enterprise.platformKeys"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/enterprise_platformKeys/">Enterprise.platformKeys</a> API.
      </td>
    </tr>
    <tr id="experimental">
      <td><code>"experimental"</code></td>
      <td>Required if the extension uses any <a href="/docs/extensions/reference/#experimental_apis/">Experimental.* APIs</a>.</td>
    </tr>
    <tr id="fileBrowserHandler">
      <td><code>"fileBrowserHandler"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/fileBrowserHandler/">FileBrowserHandler</a> API.</td>
    </tr>
    <tr id="fileSystemProvider">
      <td><code>"fileSystemProvider"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/fileSystemProvider/">FileSystemProvider</a> API.</td>
    </tr>
    <tr id="fontSettings">
      <td><code>"fontSettings"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/fontSettings/">FontSettings</a> API.</td>
    </tr>
    <tr id="gcm">
      <td><code>"gcm"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/gcm/">gcm</a> API.</td>
    </tr>
    <tr id="geolocation">
      <td><code>"geolocation"</code></td>
      <td>Allows the extension to use the <a
          href="https://dev.w3.org/geo/api/spec-source.html">Geolocation API</a> without prompting the user for
        permission.</td>
    </tr>
    <tr id="history">
      <td><code>"history"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/history/">History</a> API.</td>
    </tr>
    <tr id="identity">
      <td><code>"identity"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/identity/">Identity</a> API.</td>
    </tr>
    <tr id="idle">
      <td><code>"idle"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/idle/">Idle</a> API.</td>
    </tr>
    <!-- No corresponding reference entry
    <tr id="idltest">
      <td><code>"idltest"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/idltest/">idltest</a> API.</td>
    </tr>
    <tr id="login">
      <td><code>"login"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/login/">login</a> API.</td>
    </tr>
    <tr id="loginScreenStorage">
      <td><code>"loginScreenStorage"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/loginScreenStorage/">loginScreenStorage</a> API.</td>
    </tr>
    -->
    <tr id="loginState">
      <td><code>"loginState"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/loginState/">LoginState</a> API.</td>
    </tr>
    <tr id="management">
      <td><code>"management"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/management/">Management</a> API.</td>
    </tr>
    <tr id="nativeMessaging">
      <td><code>"nativeMessaging"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/runtime#perms">Native Messaging API</a>.</td>
    </tr>
    <tr id="notifications">
      <td><code>"notifications"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/notifications/">Notifications</a> API.</td>
    </tr>
    <tr id="offscreen">
      <td><code>"offscreen"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/offscreen/">Offscreen</a> API.
    </tr>
    <tr id="pageCapture">
      <td><code>"pageCapture"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/pageCapture/">PageCapture</a> API.</td>
    </tr>
    <tr id="platformKeys">
      <td><code>"platformKeys"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/platformKeys/">PlatformKeys</a> API.</td>
    </tr>
    <tr id="power">
      <td><code>"power"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/power/">Power</a> API.</td>
    </tr>
    <tr id="printerProvider">
      <td><code>"printerProvider"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/printerProvider/">PrinterProvider</a> API.</td>
    </tr>
    <tr id="printing">
      <td><code>"printing"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/printing/">Printing</a> API.</td>
    </tr>
    <tr id="printingMetrics">
      <td><code>"printingMetrics"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/printingMetrics/">PrintingMetrics</a> API.</td>
    </tr>
    <tr id="privacy">
      <td><code>"privacy"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/privacy/">Privacy</a> API.</td>
    </tr>
    <tr id="processes">
      <td><code>"processes"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/processes/">Processes</a> API.</td>
    </tr>
    <tr id="proxy">
      <td><code>"proxy"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/proxy/">Proxy</a> API.</td>
    </tr>
    <tr id="scripting">
      <td><code>"scripting"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/scripting/">Scripting</a> API.</td>
    </tr>
    <tr id="search">
      <td><code>"search"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/search/">Search</a> API.</td>
    </tr>
    <tr id="sessions">
      <td><code>"sessions"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/sessions/">Sessions</a> API.</td>
    </tr>
    <tr id="signedInDevices">
      <td><code>"signedInDevices"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/signedInDevices/">SignedInDevices</a> API.</td>
    </tr>
    <tr id="storage">
      <td><code>"storage"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/storage/">Storage</a> API.</td>
    </tr>
    <tr id="system.cpu">
      <td><code>"system.cpu"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/system_cpu/">System.cpu</a> API.</td>
    </tr>
    <tr id="system.display">
      <td><code>"system.display"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/system_display/">System.display</a> API.</td>
    </tr>
    <tr id="system.memory">
      <td><code>"system.memory"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/system_memory/">System.memory</a> API.</td>
    </tr>
    <tr id="system.storage">
      <td><code>"system.storage"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/system_storage/">System.storage</a> API.</td>
    </tr>
    <tr id="tabCapture">
      <td><code>"tabCapture"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/tabCapture/">TabCapture</a> API.</td>
    </tr>
    <tr id="tabGroups">
      <td><code>"tabGroups"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/tabGroups/">TabGroups</a> API.</td>
    </tr>
    <tr id="tabs">
      <td><code>"tabs"</code></td>
      <td>Gives access to privileged fields of the <a
          href="/docs/extensions/reference/tabs#perms"><code>Tab</code></a> objects used by several APIs
        including <a href="/docs/extensions/reference/tabs">tabs</a> and <a href="/docs/extensions/reference/windows">Windows</a>.
    </tr>
    <tr id="topSites">
      <td><code>"TopSites"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/topSites/">topSites</a> API.</td>
    </tr>
    <tr id="tts">
      <td><code>"tts"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/tts/">Tts</a> API.</td>
    </tr>
    <tr id="ttsEngine">
      <td><code>"ttsEngine"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/ttsEngine/">TtsEngine</a> API.</td>
    </tr>
    <tr id="unlimitedStorage">
      <td><code>"unlimitedStorage"</code></td>
      <td>Provides an unlimited quota for storing client-side data, such as databases and local storage files.
        Without this permission, the extension is limited to 5 MB of local storage.<div
          class="aside aside--note"><b>Note:</b> This permission applies only to Web SQL Database and application cache
          (see issue <a href="http://crbug.com/58985">58985</a>). Also, it doesn't currently work with wildcard
          subdomains such as <code>http://*.example.com</code>.</div>
      </td>
    </tr>
    <tr id="vpnProvider">
      <td><code>"vpnProvider"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/vpnProvider/">VpnProvider</a> API.</td>
    </tr>
    <tr id="wallpaper">
      <td><code>"wallpaper"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/wallpaper/">Wallpaper</a> API.</td>
    </tr>
    <tr id="webNavigation">
      <td><code>"webNavigation"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/webNavigation/">WebNavigation</a> API.</td>
    </tr>
    <tr id="webRequest">
      <td><code>"webRequest"</code></td>
      <td>Gives access to the <a href="/docs/extensions/reference/webRequest/">WebRequest</a> API.</td>
    </tr>
    <tr id="webRequestBlocking">
      <td><code>"webRequestBlocking"</code></td>
      <td>Required if the extension uses the <a href="/docs/extensions/reference/webRequest/">WebRequest</a> API in a blocking fashion.</td>
    </tr>
  </tbody>
</table>

[api-perms]: /docs/extensions/reference/permissions
[api-ref]: /docs/extensions/reference/
[api-storage]: /docs/extensions/reference/storage
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match]: /docs/extensions/mv3/match_patterns
[doc-warning]: /docs/extensions/mv3/permission_warnings
[vision-optperms]: /docs/extensions/mv3/intro/platform-vision/#improved-user-visibility-and-control
