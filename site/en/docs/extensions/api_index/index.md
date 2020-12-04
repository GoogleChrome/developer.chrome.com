---
layout: "layouts/doc-post.njk"
title: "Chrome APIs"
#date: TODO
#updated: TODO
#description: TODO
---

Chrome provides extensions with many special-purpose APIs like `chrome.runtime` and `chrome.alarms`.

## Stable APIs {: #stable_apis }

<table><tbody><tr><th>Name</th><th>Description</th><th>Since</th></tr><tr><td><a href="accessibilityFeatures">accessibilityFeatures</a></td><td>Use the <code>chrome.accessibilityFeatures</code> API to manage Chrome's accessibility features. This API relies on the <a href="types#ChromeSetting">ChromeSetting prototype of the type API</a> for getting and setting individual accessibility features. In order to get feature states the extension must request <code>accessibilityFeatures.read</code> permission. For modifying feature state, the extension needs <code>accessibilityFeatures.modify</code> permission. Note that <code>accessibilityFeatures.modify</code> does not imply <code>accessibilityFeatures.read</code> permission.</td><td>38</td></tr><tr><td><a href="alarms">alarms</a></td><td>Use the <code>chrome.alarms</code> API to schedule code to run periodically or at a specified time in the future.</td><td>38</td></tr><tr><td><a href="bookmarks">bookmarks</a></td><td>Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise manipulate bookmarks. Also see <a href="override">Override Pages</a>, which you can use to create a custom Bookmark Manager page.</td><td>38</td></tr><tr><td><a href="browserAction">browserAction</a></td><td>Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its <a href="browserAction#icon">icon</a>, a browser action can have a <a href="browserAction#tooltip">tooltip</a>, a <a href="browserAction#badge">badge</a>, and a <a href="browserAction#popups">popup</a>.</td><td>38</td></tr><tr><td><a href="browsingData">browsingData</a></td><td>Use the <code>chrome.browsingData</code> API to remove browsing data from a user's local profile.</td><td>38</td></tr><tr><td><a href="certificateProvider">certificateProvider</a></td><td>Use this API to expose certificates to the platform which can use these certificates for TLS authentications.</td><td>46</td></tr><tr><td><a href="commands">commands</a></td><td>Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.</td><td>38</td></tr><tr><td><a href="contentSettings">contentSettings</a></td><td>Use the <code>chrome.contentSettings</code> API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.</td><td>38</td></tr><tr><td><a href="contextMenus">contextMenus</a></td><td>Use the <code>chrome.contextMenus</code> API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.</td><td>38</td></tr><tr><td><a href="cookies">cookies</a></td><td>Use the <code>chrome.cookies</code> API to query and modify cookies, and to be notified when they change.</td><td>38</td></tr><tr><td><a href="debugger">debugger</a></td><td>The <code>chrome.debugger</code> API serves as an alternate transport for Chrome's <a href="https://developer.chrome.com/devtools/docs/debugger-protocol">remote debugging protocol</a>. Use <code>chrome.debugger</code> to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee <code>tabId</code> to target tabs with sendCommand and route events by <code>tabId</code> from onEvent callbacks.</td><td>38</td></tr><tr><td><a href="declarativeContent">declarativeContent</a></td><td>Use the <code>chrome.declarativeContent</code> API to take actions depending on the content of a page, without requiring permission to read the page's content.</td><td>38</td></tr><tr><td><a href="declarativeNetRequest">declarativeNetRequest</a></td><td>The <code>chrome.declarativeNetRequest</code> API is used to block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, thus providing more privacy.</td><td>84</td></tr><tr><td><a href="desktopCapture">desktopCapture</a></td><td>Desktop Capture API that can be used to capture content of screen, individual windows or tabs.</td><td>38</td></tr><tr><td><a href="devtools.inspectedWindow">devtools.inspectedWindow</a></td><td>Use the <code>chrome.devtools.inspectedWindow</code> API to interact with the inspected window: obtain the tab ID for the inspected page, evaluate the code in the context of the inspected window, reload the page, or obtain the list of resources within the page.</td><td>38</td></tr><tr><td><a href="devtools.network">devtools.network</a></td><td>Use the <code>chrome.devtools.network</code> API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.</td><td>38</td></tr><tr><td><a href="devtools.panels">devtools.panels</a></td><td>Use the <code>chrome.devtools.panels</code> API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.</td><td>38</td></tr><tr><td><a href="documentScan">documentScan</a></td><td>Use the <code>chrome.documentScan</code> API to discover and retrieve images from attached paper document scanners.</td><td>44</td></tr><tr><td><a href="downloads">downloads</a></td><td>Use the <code>chrome.downloads</code> API to programmatically initiate, monitor, manipulate, and search for downloads.</td><td>38</td></tr><tr><td><a href="enterprise.deviceAttributes">enterprise.deviceAttributes</a></td><td>Use the <code>chrome.enterprise.deviceAttributes</code> API to read device attributes. Note: This API is only available to extensions force-installed by enterprise policy.</td><td>46</td></tr><tr><td><a href="enterprise.hardwarePlatform">enterprise.hardwarePlatform</a></td><td>Use the <code>chrome.enterprise.hardwarePlatform</code> API to get the manufacturer and model of the hardware platform where the browser runs. Note: This API is only available to extensions installed by enterprise policy.</td><td>71</td></tr><tr><td><a href="enterprise.networkingAttributes">enterprise.networkingAttributes</a></td><td>Use the <code>chrome.enterprise.networkingAttributes</code> API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.</td><td>85</td></tr><tr><td><a href="enterprise.platformKeys">enterprise.platformKeys</a></td><td>Use the <code>chrome.enterprise.platformKeys</code> API to generate hardware-backed keys and to install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through <a href="/extensions/platformKeys">chrome.platformKeys</a>.</td><td>38</td></tr><tr><td><a href="events">events</a></td><td>The <code>chrome.events</code> namespace contains common types used by APIs dispatching events to notify you when something interesting happens.</td><td>38</td></tr><tr><td><a href="extension">extension</a></td><td>The <code>chrome.extension</code> API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in <a href="messaging">Message Passing</a>.</td><td>38</td></tr><tr><td><a href="extensionTypes">extensionTypes</a></td><td>The <code>chrome.extensionTypes</code> API contains type declarations for Chrome extensions.</td><td>39</td></tr><tr><td><a href="fileBrowserHandler">fileBrowserHandler</a></td><td>Use the <code>chrome.fileBrowserHandler</code> API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.</td><td>38</td></tr><tr><td><a href="fileSystemProvider">fileSystemProvider</a></td><td>Use the <code>chrome.fileSystemProvider</code> API to create file systems, that can be accessible from the file manager on Chrome OS.</td><td>40</td></tr><tr><td><a href="fontSettings">fontSettings</a></td><td>Use the <code>chrome.fontSettings</code> API to manage Chrome's font settings.</td><td>38</td></tr><tr><td><a href="gcm">gcm</a></td><td>Use <code>chrome.gcm</code> to enable apps and extensions to send and receive messages through the <a href="http://developer.android.com/google/gcm/">Google Cloud Messaging Service</a>.</td><td>38</td></tr><tr><td><a href="history">history</a></td><td>Use the <code>chrome.history</code> API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see <a href="override">Override Pages</a>.</td><td>38</td></tr><tr><td><a href="i18n">i18n</a></td><td>Use the <code>chrome.i18n</code> infrastructure to implement internationalization across your whole app or extension.</td><td>38</td></tr><tr><td><a href="identity">identity</a></td><td>Use the <code>chrome.identity</code> API to get OAuth2 access tokens.</td><td>38</td></tr><tr><td><a href="idle">idle</a></td><td>Use the <code>chrome.idle</code> API to detect when the machine's idle state changes.</td><td>38</td></tr><tr><td><a href="input.ime">input.ime</a></td><td>Use the <code>chrome.input.ime</code> API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.</td><td>38</td></tr><tr><td><a href="instanceID">instanceID</a></td><td>Use <code>chrome.instanceID</code> to access the Instance ID service.</td><td>46</td></tr><tr><td><a href="loginState">loginState</a></td><td>Use the <code>chrome.loginState</code> API to read and monitor the login state.</td><td>78</td></tr><tr><td><a href="management">management</a></td><td>The <code>chrome.management</code> API provides ways to manage the list of extensions/apps that are installed and running. It is particularly useful for extensions that <a href="override">override</a> the built-in New Tab page.</td><td>38</td></tr><tr><td><a href="notifications">notifications</a></td><td>Use the <code>chrome.notifications</code> API to create rich notifications using templates and show these notifications to users in the system tray.</td><td>38</td></tr><tr><td><a href="omnibox">omnibox</a></td><td>The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.</td><td>38</td></tr><tr><td><a href="pageAction">pageAction</a></td><td>Use the <code>chrome.pageAction</code> API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.</td><td>38</td></tr><tr><td><a href="pageCapture">pageCapture</a></td><td>Use the <code>chrome.pageCapture</code> API to save a tab as MHTML.</td><td>38</td></tr><tr><td><a href="permissions">permissions</a></td><td>Use the <code>chrome.permissions</code> API to request <a href="permissions#manifest">declared optional permissions</a> at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.</td><td>38</td></tr><tr><td><a href="platformKeys">platformKeys</a></td><td>Use the <code>chrome.platformKeys</code> API to access client certificates managed by the platform. If the user or policy grants the permission, an extension can use such a certficate in its custom authentication protocol. E.g. this allows usage of platform managed certificates in third party VPNs (see <a href="/extensions/vpnProvider">chrome.vpnProvider</a>).</td><td>45</td></tr><tr><td><a href="power">power</a></td><td>Use the <code>chrome.power</code> API to override the system's power management features.</td><td>38</td></tr><tr><td><a href="printerProvider">printerProvider</a></td><td>The <code>chrome.printerProvider</code> API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.</td><td>44</td></tr><tr><td><a href="printing">printing</a></td><td>Use the <code>chrome.printing</code> API to send print jobs to printers installed on Chromebook.</td><td>81</td></tr><tr><td><a href="printingMetrics">printingMetrics</a></td><td>Use the <code>chrome.printingMetrics</code> API to fetch data about printing usage.</td><td>79</td></tr><tr><td><a href="privacy">privacy</a></td><td>Use the <code>chrome.privacy</code> API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the <a href="types#ChromeSetting">ChromeSetting prototype of the type API</a> for getting and setting Chrome's configuration.</td><td>38</td></tr><tr><td><a href="proxy">proxy</a></td><td>Use the <code>chrome.proxy</code> API to manage Chrome's proxy settings. This API relies on the <a href="types#ChromeSetting">ChromeSetting prototype of the type API</a> for getting and setting the proxy configuration.</td><td>38</td></tr><tr><td><a href="runtime">runtime</a></td><td>Use the <code>chrome.runtime</code> API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.</td><td>38</td></tr><tr><td><a href="search">search</a></td><td>Use the <code>chrome.search</code> API to search via the default provider.</td><td>87</td></tr><tr><td><a href="sessions">sessions</a></td><td>Use the <code>chrome.sessions</code> API to query and restore tabs and windows from a browsing session.</td><td>38</td></tr><tr><td><a href="storage">storage</a></td><td>Use the <code>chrome.storage</code> API to store, retrieve, and track changes to user data.</td><td>38</td></tr><tr><td><a href="system.cpu">system.cpu</a></td><td>Use the <code>system.cpu</code> API to query CPU metadata.</td><td>38</td></tr><tr><td><a href="system.memory">system.memory</a></td><td>The <code>chrome.system.memory</code> API.</td><td>38</td></tr><tr><td><a href="system.storage">system.storage</a></td><td>Use the <code>chrome.system.storage</code> API to query storage device information and be notified when a removable storage device is attached and detached.</td><td>38</td></tr><tr><td><a href="tabCapture">tabCapture</a></td><td>Use the <code>chrome.tabCapture</code> API to interact with tab media streams.</td><td>38</td></tr><tr><td><a href="tabs">tabs</a></td><td>Use the <code>chrome.tabs</code> API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.</td><td>38</td></tr><tr><td><a href="topSites">topSites</a></td><td>Use the <code>chrome.topSites</code> API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.</td><td>38</td></tr><tr><td><a href="tts">tts</a></td><td>Use the <code>chrome.tts</code> API to play synthesized text-to-speech (TTS). See also the related <a href="http://developer.chrome.com/extensions/ttsEngine">ttsEngine</a> API, which allows an extension to implement a speech engine.</td><td>38</td></tr><tr><td><a href="ttsEngine">ttsEngine</a></td><td>Use the <code>chrome.ttsEngine</code> API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the <a href="tts">tts</a> API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.</td><td>38</td></tr><tr><td><a href="types">types</a></td><td>The <code>chrome.types</code> API contains type declarations for Chrome.</td><td>38</td></tr><tr><td><a href="vpnProvider">vpnProvider</a></td><td>Use the <code>chrome.vpnProvider</code> API to implement a VPN client.</td><td>43</td></tr><tr><td><a href="wallpaper">wallpaper</a></td><td>Use the <code>chrome.wallpaper</code> API to change the ChromeOS wallpaper.</td><td>38</td></tr><tr><td><a href="webNavigation">webNavigation</a></td><td>Use the <code>chrome.webNavigation</code> API to receive notifications about the status of navigation requests in-flight.</td><td>38</td></tr><tr><td><a href="webRequest">webRequest</a></td><td>Use the <code>chrome.webRequest</code> API to observe and analyze traffic and to intercept, block, or modify requests in-flight.</td><td>38</td></tr><tr><td><a href="windows">windows</a></td><td>Use the <code>chrome.windows</code> API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.</td><td>38</td></tr></tbody></table>

## Beta APIs {: #beta_apis }

These APIs are only available in the Chrome Beta and Dev channels:

<table><tbody><tr><th>Name</th><th>Description</th></tr><tr><td><a href="declarativeWebRequest">declarativeWebRequest</a></td><td><em><strong>Note:</strong> this API is currently on hold, without concrete plans to move to stable.</em> Use the <code>chrome.declarativeWebRequest</code> API to intercept, block, or modify requests in-flight. It is significantly faster than the <a href="webRequest"><code>chrome.webRequest</code> API</a> because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.</td></tr></tbody></table>

## Dev APIs {: #dev_apis }

These APIs are only available in the Chrome Dev channel:

<table><tbody><tr><th>Name</th><th>Description</th></tr><tr><td><a href="automation">automation</a></td><td>The <code>chrome.automation</code> API allows developers to access the automation (accessibility) tree for the browser. The tree resembles the DOM tree, but only exposes the <em>semantic</em> structure of a page. It can be used to programmatically interact with a page by examining names, roles, and states, listening for events, and performing actions on nodes.</td></tr><tr><td><a href="processes">processes</a></td><td>Use the <code>chrome.processes</code> API to interact with the browser's processes.</td></tr><tr><td><a href="signedInDevices">signedInDevices</a></td><td>Use the <code>chrome.signedInDevices</code> API to get a list of devices signed into chrome with the same account as the current profile.</td></tr></tbody></table>

## Experimental APIs {: #experimental }

Chrome also has [experimental APIs][92], some of which will become supported APIs in future releases
of Chrome.

## API conventions {: #conventions }

Unless the doc says otherwise, methods in the chrome.\* APIs are **asynchronous**: they return
immediately, without waiting for the operation to finish. If you need to know the outcome of an
operation, then you pass a callback function into the method. For more information, watch this
video:

[1]: /docs/extensions/accessibilityFeatures
[2]: /docs/extensions/types#ChromeSetting
[3]: /docs/extensions/alarms
[4]: /docs/extensions/bookmarks
[5]: /docs/extensions/override
[6]: /docs/extensions/browserAction
[7]: /docs/extensions/browserAction#icon
[8]: /docs/extensions/browserAction#tooltip
[9]: /docs/extensions/browserAction#badge
[10]: /docs/extensions/browserAction#popups
[11]: /docs/extensions/browsingData
[12]: /docs/extensions/certificateProvider
[13]: /docs/extensions/commands
[14]: /docs/extensions/contentSettings
[15]: /docs/extensions/contextMenus
[16]: /docs/extensions/cookies
[17]: /docs/extensions/debugger
[18]: /docs/devtools/docs/debugger-protocol
[19]: /docs/extensions/declarativeContent
[20]: /docs/extensions/declarativeNetRequest
[21]: /docs/extensions/desktopCapture
[22]: /docs/extensions/devtools.inspectedWindow
[23]: /docs/extensions/devtools.network
[24]: /docs/extensions/devtools.panels
[25]: /docs/extensions/documentScan
[26]: /docs/extensions/downloads
[27]: /docs/extensions/enterprise.deviceAttributes
[28]: /docs/extensions/enterprise.hardwarePlatform
[29]: /docs/extensions/enterprise.networkingAttributes
[30]: /docs/extensions/enterprise.platformKeys
[31]: /docs/extensions/platformKeys
[32]: /docs/extensions/events
[33]: /docs/extensions/extension
[34]: /docs/extensions/messaging
[35]: /docs/extensions/extensionTypes
[36]: /docs/extensions/fileBrowserHandler
[37]: /docs/extensions/fileSystemProvider
[38]: /docs/extensions/fontSettings
[39]: /docs/extensions/gcm
[40]: http://developer.android.com/google/gcm/
[41]: /docs/extensions/history
[42]: /docs/extensions/override
[43]: /docs/extensions/i18n
[44]: /docs/extensions/identity
[45]: /docs/extensions/idle
[46]: /docs/extensions/input.ime
[47]: /docs/extensions/instanceID
[48]: /docs/extensions/loginState
[49]: /docs/extensions/management
[50]: /docs/extensions/override
[51]: /docs/extensions/notifications
[52]: /docs/extensions/omnibox
[53]: /docs/extensions/pageAction
[54]: /docs/extensions/pageCapture
[55]: /docs/extensions/permissions
[56]: /docs/extensions/permissions#manifest
[57]: /docs/extensions/platformKeys
[58]: /docs/extensions//extensions/vpnProvider
[59]: /docs/extensions/power
[60]: /docs/extensions/printerProvider
[61]: /docs/extensions/printing
[62]: /docs/extensions/printingMetrics
[63]: /docs/extensions/privacy
[64]: /docs/extensions/types#ChromeSetting
[65]: /docs/extensions/proxy
[66]: /docs/extensions/types#ChromeSetting
[67]: /docs/extensions/runtime
[68]: /docs/extensions/search
[69]: /docs/extensions/sessions
[70]: /docs/extensions/storage
[71]: /docs/extensions/system.cpu
[72]: /docs/extensions/system.memory
[73]: /docs/extensions/system.storage
[74]: /docs/extensions/tabCapture
[75]: /docs/extensions/tabs
[76]: /docs/extensions/topSites
[77]: /docs/extensions/tts
[78]: http://developer.chrome.com/extensions/ttsEngine
[79]: /docs/extensions/ttsEngine
[80]: /docs/extensions/tts
[81]: /docs/extensions/types
[82]: /docs/extensions/vpnProvider
[83]: /docs/extensions/wallpaper
[84]: /docs/extensions/webNavigation
[85]: /docs/extensions/webRequest
[86]: /docs/extensions/windows
[87]: /docs/extensions/declarativeWebRequest
[88]: /docs/extensions/webRequest
[89]: /docs/extensions/automation
[90]: /docs/extensions/processes
[91]: /docs/extensions/signedInDevices
[92]: /docs/extensions/experimental
