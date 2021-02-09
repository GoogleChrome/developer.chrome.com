---
layout: "layouts/doc-post.njk"
title: "Transitioning from Chrome Apps"
date: 2016-08-18
updated: 2019-12-02
description: How to migrate your Chrome packaged or hosted app.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

To transition away from a Chrome packaged or hosted app, the following options are available.

## Chrome packaged apps {: #chrome-packaged-apps }

Recommended migration options for packaged apps are listed in order from simplest to most
complicated.

### Build a Progressive Web App {: #build-pwa }

Building a [Progressive Web App][3] (PWA) is the ideal way to reach users across all operating
systems.  
As part of our [Web Capabilities][4] (codename: [Fugu][5]) efforts, we are investigating ways to
improve the migration path to the web for developers that depend on exclusive Chrome App APIs—in
particular the Sockets, HID, File System, and Serial APIs. If there are web platform features you
need that are [only available in select browsers][6], you can use feature detection to gracefully
degrade or include explanatory text when your app is run in a browser that doesn't support a
particular API. If there are gaps in the web platform for your application, please **[let us
know][7]**.

PWAs are installable on both [desktop][8] and [mobile][9] platforms. Users who choose to install
your PWA can launch it via icons and shortcuts, similar to the way that Chrome Apps can be installed
today.

### Build an extension-enhanced web page {: #build-extension-web-page }

If there is a capability that your Chrome App has that the regular web platform can't provide, it
might be available as an **[extension API][10]**. In this case, you use a **[progressive web app
together with an externally connectable extension your web app can send messages to][11]**. Building
a web app is typically preferable to this, because this approach forces users to install an
extension that is only useful on your site and can cause increased friction.

As Chrome extensions can't be run on other browsers, you should detect when required functionality
isn't available and provide explanatory text for users on these other browsers.

### Build an extension {: #build-extension }

Depending on the user experience you want to provide, it might make sense to convert your entire app
into an extension. For example you could provide a **[browser action][12]** button which shows a
small popup window for your user interface, or navigates to a page your extension provides. For some
apps, this might be a good enough user experience to be a viable solution.

Note there are significant costs to this approach. [While some browsers][13] support the same
extensions API as Chrome, this support is not universal. This can significant friction for your
users who would prefer a cross-browser alternative.

### Build for Chrome OS via Android {: #build-chromeos-android }

If you are an Android developer interested in building for Chrome OS, you can optimize your Android
application for a better experience.

Chrome App API/Capability migration recommendations (current as of Nov. 2019):

<table><thead><tr><th><strong>Chrome App feature/functionality</strong></th><th><strong>Web platform migration recommendations</strong></th><th><strong>Android migration recommendations</strong></th><th><strong>Extension migration recommendations</strong></th></tr></thead><tbody><tr><td><a href="/apps/accessibilityFeatures">chrome.accessibilityFeatures</a></td><td></td><td></td><td><a href="/extensions/accessibilityFeatures">chrome.accessibilityFeatures</a></td></tr><tr><td><a href="/apps/alarms">chrome.alarms</a></td><td><a href="http://crbug.com/891339">Notification Triggers</a></td><td><a href="https://developer.android.com/topic/libraries/architecture/workmanager">WorkManager</a></td><td><a href="/extensions/alarms">chrome.alarms</a></td></tr><tr><td><a href="/apps/app_runtime">chrome.app.runtime</a></td><td><a href="https://bugs.chromium.org/p/chromium/issues/detail?id=844279">Launch Event</a></td><td><a href="https://developer.android.com/guide/components/activities/activity-lifecycle">Activity Lifecycle</a></td><td></td></tr><tr><td><a href="/apps/app_runtime#event-onRestarted">chrome.app.runtime.onRestarted</a></td><td><a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api">Page Life Cycle</a></td><td><a href="https://developer.android.com/guide/components/activities/activity-lifecycle#onresume">Activity.onResume</a></td><td></td></tr><tr><td><a href="/apps/app_window">chrome.app.window</a></td><td><a href="https://crbug.com/897300">Window Placement / Screen Enumeration</a></td><td></td><td><a href="/extensions/windows">chrome.windows</a></td></tr><tr><td><a href="/apps/audio">chrome.audio</a></td><td><a href="http://crbug.com/897326">Audio Device Client</a></td><td><a href="https://developer.android.com/guide/topics/media/mediaplayer">Some Audio APIs</a></td><td></td></tr><tr><td><a href="/apps/app_bluetooth">chrome.bluetooth</a></td><td><a href="https://www.chromestatus.com/feature/5264933985976320">Web Bluetooth API</a></td><td><a href="https://developer.android.com/guide/topics/connectivity/bluetooth">Bluetooth API</a></td><td></td></tr><tr><td><a href="/apps/bluetoothLowEnergy">chrome.bluetoothLowEnergy</a></td><td><a href="https://www.chromestatus.com/feature/5264933985976320">Web Bluetooth API</a></td><td><a href="https://developer.android.com/guide/topics/connectivity/bluetooth-le">BTLE</a></td><td></td></tr><tr><td><a href="/apps/bluetoothSocket">chrome.bluetoothSocket</a></td><td><a href="https://www.chromestatus.com/feature/5264933985976320">Web Bluetooth API</a></td><td><a href="https://developer.android.com/reference/android/bluetooth/BluetoothSocket">Bluetooth Socket</a></td><td></td></tr><tr><td><a href="/apps/browser">chrome.browser</a></td><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/open">window.open</a></td><td><a href="https://developer.android.com/reference/android/content/Intent">Intent system</a></td><td></td></tr><tr><td><a href="/apps/commands">chrome.commands</a></td><td><a href="https://w3c.github.io/uievents/">UI Events</a></td><td><a href="https://developer.android.com/training/keyboard-input/commands">Hard-code keyboard commands</a></td><td><a href="/extensions/commands">chrome.commands</a></td></tr><tr><td><a href="/apps/contextMenus">chrome.contextMenus</a></td><td>(HTML/script)</td><td><a href="https://developer.android.com/reference/android/view/ContextMenu">Native, Android has its own contextmenus</a></td><td></td></tr><tr><td><a href="/apps/documentScan">chrome.documentScan</a></td><td></td><td></td><td><a href="/extensions/documentScan">chrome.documentScan</a></td></tr><tr><td><a href="/apps/events">chrome.events</a></td><td><a href="https://bugs.chromium.org/p/chromium/issues/detail?id=891339">Alarms</a></td><td></td><td><a href="/extensions/events">chrome.events</a></td></tr><tr><td><a href="/apps/extensionTypes">chrome.extensionTypes</a></td><td></td><td>N/A</td><td><a href="/extensions/extensionTypes">chrome.extensionTypes</a></td></tr><tr><td><a href="/apps/fileSystem">chrome.fileSystem</a></td><td><a href="http://crbug.com/853326">Native FileSystem API</a></td><td></td><td></td></tr><tr><td><a href="/apps/fileSystemProvider">chrome.fileSystemProvider</a></td><td></td><td><a href="https://developer.android.com/reference/java/nio/file/spi/FileSystemProvider.html">FileSystemProvider</a></td><td><a href="/extensions/fileSystemProvider">chrome.fileSystemProvider</a></td></tr><tr><td><a href="/apps/gcm">chrome.gcm</a></td><td><a href="https://developers.google.com/web/fundamentals/push-notifications/">Web Push Notifications</a></td><td>N/A</td><td><a href="/extensions/gcm">chrome.gcm</a></td></tr><tr><td><a href="/apps/hid">chrome.hid</a></td><td><a href="https://www.chromestatus.com/feature/5172464636133376">Web HID API</a></td><td></td><td></td></tr><tr><td><a href="/apps/i18n">chrome.i18n</a></td><td>(HTML/script)</td><td><a href="https://developer.android.com/guide/topics/resources/localization">Localization</a></td><td><a href="/extensions/i18n">chrome.i18n</a></td></tr><tr><td><a href="/apps/identity">chrome.identity</a></td><td>OAuth API or <a href="https://www.chromestatus.com/feature/5669923372138496">Credential Management API</a></td><td><a href="https://developer.android.com/training/id-auth/authenticate">Native</a></td><td><a href="/extensions/identity">chrome.identity</a></td></tr><tr><td><a href="/apps/idle">chrome.idle</a></td><td><a href="http://crbug.com/878979">User Idle Detection API</a></td><td></td><td><a href="/extensions/idle">chrome.idle</a></td></tr><tr><td><a href="/apps/instanceID">chrome.instanceID</a></td><td><a href="https://developers.google.com/web/fundamentals/push-notifications/">Web push</a></td><td>Per-App ID needs to be self-generated</td><td><a href="/extensions/instanceID">chrome.instanceID</a></td></tr><tr><td><a href="/apps/mdns">chrome.mdns</a></td><td></td><td><a href="https://developer.android.com/training/connect-devices-wirelessly/nsd">NDS discovery</a></td><td></td></tr><tr><td><a href="/apps/mediaGalleries">chrome.mediaGalleries</a></td><td><a href="http://crbug.com/853326">Native FileSystem API</a></td><td></td><td></td></tr><tr><td><a href="/apps/networking_onc">chrome.networking.onc</a></td><td></td><td></td><td></td></tr><tr><td><a href="/apps/notifications">chrome.notifications</a></td><td><a href="https://www.chromestatus.com/feature/5064350557536256">Notifications API</a></td><td>Notifications show in lower right of CrOS as system level notifications</td><td><a href="/extensions/notifications">chrome.notifications</a></td></tr><tr><td><a href="/apps/permissions">chrome.permissions</a></td><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API">Web Permissions API</a></td><td>N/A</td><td><a href="/extensions/permissions">chrome.permissions</a></td></tr><tr><td><a href="/apps/power">chrome.power</a></td><td><a href="https://www.chromestatus.com/feature/4636879949398016">WakeLock API</a></td><td><a href="http://b/133417350">In discussion</a></td><td><a href="/extensions/power">chrome.power</a></td></tr><tr><td><a href="/apps/printerProvider">chrome.printerProvider</a></td><td><a href="/extensions/printerProvider">Transition to Extension</a></td><td><a href="https://developer.android.com/reference/android/printservice/package-summary">android.printservice</a></td><td><a href="/extensions/printerProvider">chrome.printerProvider</a></td></tr><tr><td><a href="/apps/runtime">chrome.runtime</a></td><td><a href="https://developers.google.com/web/updates/2018/07/page-lifecycle-api">Service Workers + Page Lifecycle API</a></td><td></td><td><a href="/extensions/runtime">chrome.runtime</a></td></tr><tr><td><a href="/apps/messaging#connect">chrome.runtime.connect</a></td><td><a href="https://www.chromestatus.com/feature/6710044586409984">Channel Messaging API</a></td><td></td><td><a href="/extensions/runtime#method-connect">chrome.runtime.connect</a></td></tr><tr><td><a href="/apps/messaging#simple">chrome.runtime.sendMessage</a></td><td></td><td></td><td><a href="/extensions/runtime#method-sendMessage">chrome.runtime.sendMessage</a></td></tr><tr><td><a href="/apps/app_serial">chrome.serial</a></td><td><a href="https://www.chromestatus.com/feature/6577673212002304">Web Serial API</a></td><td></td><td></td></tr><tr><td><a href="/apps/app_network">chrome.sockets.tcp</a></td><td><a href="https://w3c.github.io/webrtc-quic/cs.html">QuicTransport C/S (or WebSockets)</a></td><td><a href="https://developer.android.com/reference/java/net/Socket">android.net.ConnectivityManager and Java standard socket API</a></td><td></td></tr><tr><td><a href="/apps/sockets_tcpServer">chrome.sockets.tcpServer</a></td><td></td><td><a href="https://developer.android.com/reference/java/net/Socket">android.net.ConnectivityManager and Java standard socket API</a></td><td></td></tr><tr><td><a href="/apps/sockets_udp">chrome.sockets.udp</a></td><td><a href="https://w3c.github.io/webrtc-quic/cs.html">QuicTransport C/S</a></td><td><a href="https://developer.android.com/reference/java/net/DatagramSocket">DatagramSocket API for UDP</a></td><td></td></tr><tr><td><a href="/apps/storage">chrome.storage</a></td><td><a href="https://www.chromestatus.com/feature/5072127703121920">Cache API</a><br><a href="https://www.chromestatus.com/feature/6507459568992256">IndexedDB</a></td><td></td><td><a href="/extensions/storage">chrome.storage</a></td></tr><tr><td><a href="/extensions/manifest/storage">chrome.storage.managed</a></td><td></td><td><a href="https://developer.android.com/work/managed-configurations">Managed Configurations</a></td><td><a href="/extensions/storage#property-managed">chrome.storage.managed</a></td></tr><tr><td><a href="/apps/syncFileSystem">chrome.syncFileSystem</a></td><td></td><td><a href="https://developers.google.com/drive/api/v3/quickstart/java">Java - Drive REST API</a></td><td></td></tr><tr><td><a href="/apps/system.cpu">chrome.system.cpu</a></td><td><a href="https://www.chromestatus.com/feature/6248386202173440">navigator.hardwareConcurrency</a></td><td></td><td><a href="/extensions/system_cpu">chrome.system.cpu</a></td></tr><tr><td><a href="/apps/system.display">chrome.system.display</a></td><td><a href="https://drafts.csswg.org/cssom-view/#the-screen-interface">window.screen</a></td><td><a href="https://developer.android.com/reference/android/util/DisplayMetrics">DisplayMetrics, but high density displays are wonky</a></td><td></td></tr><tr><td><a href="/apps/system.memory">chrome.system.memory</a></td><td><a href="https://www.chromestatus.com/feature/5119701235531776">navigator.deviceMemory</a></td><td></td><td><a href="/extensions/system_memory">chrome.system.memory</a></td></tr><tr><td><a href="/apps/system.network">chrome.system.network</a></td><td><a href="https://www.chromestatus.com/feature/6338383617982464">Network Information API</a></td><td></td><td></td></tr><tr><td><a href="/apps/system.storage">chrome.system.storage</a></td><td><a href="https://www.chromestatus.com/feature/5630353511284736">navigator.storage</a></td><td></td><td><a href="/extensions/system_storage">chrome.system.storage</a></td></tr><tr><td><a href="/apps/tts">chrome.tts</a></td><td><a href="https://www.chromestatus.com/feature/4782875580825600">Web Speech API (Synthesis)</a></td><td><a href="https://android-developers.googleblog.com/2009/09/introduction-to-text-to-speech-in.html">Android TTS 2009</a></td><td><a href="/extensions/tts">chrome.tts</a></td></tr><tr><td><a href="/apps/types">chrome.types</a></td><td></td><td></td><td><a href="/extensions/types">chrome.types</a></td></tr><tr><td><a href="/apps/app_usb">chrome.usb</a></td><td><a href="https://www.chromestatus.com/feature/5651917954875392">Web USB API</a></td><td><a href="http://go/arc++usb">Temporary* private USB host API</a></td><td></td></tr><tr><td><a href="/apps/virtualKeyboard">chrome.virtualKeyboard</a></td><td></td><td><a href="https://developer.android.com/training/keyboard-input">Soft Input Method</a></td><td></td></tr><tr><td><a href="/apps/vpnProvider">chrome.vpnProvider</a></td><td></td><td><a href="https://developer.android.com/reference/android/net/VpnService">VpnService</a></td><td><a href="/extensions/vpnProvider">chrome.vpnProvider</a></td></tr><tr><td><a href="/apps/wallpaper">chrome.wallpaper</a></td><td></td><td><a href="https://developer.android.com/reference/android/app/WallpaperManager">WallpaperManager</a></td><td><a href="/extensions/wallpaper">chrome.wallpaper</a></td></tr><tr><td><a href="/apps/manifest/externally_connectable">externally_connectable</a></td><td></td><td></td><td></td></tr><tr><td><a href="/apps/manifest/kiosk_enabled">kiosk_enabled</a></td><td></td><td></td><td></td></tr><tr><td><a href="/apps/manifest/minimum_chrome_version">minimum_chrome_version</a></td><td></td><td>Target Android version</td><td><a href="/apps/manifest/minimum_chrome_version">minimum_chrome_version</a></td></tr><tr><td><a href="/apps/offline_apps">offline_enabled</a></td><td><a href="https://developers.google.com/web/fundamentals/codelabs/offline/">Offline via Service Workers</a></td><td>Native</td><td></td></tr><tr><td><a href="/native-client">NaCl</a></td><td><a href="/native-client/migration">Migration Guide</a></td><td></td><td></td></tr><tr><td><a href="/docs/extensions/reference/webviewTag">&lt;webview&gt; tag</a></td><td>Native</td><td><a href="https://developer.android.com/reference/android/webkit/WebView">WebView</a></td><td></td></tr></tbody></table>

## FAQs {: #faqs }

### Q: What if the Chrome App migration recommendations do not meet my use case requirements? {: #use-case-requirements }

We'd like your feedback! Please fill out [this form][167] with as much detail as possible.

### Q: My Chrome App has many users. What's the best way to migrate them to my new web app and deprecate my Chrome App? {: #best-migration-path }

You will still be able to publish updates to your Chrome App until the runtime is removed. We
recommend updating your app to include a message indicating that your app has been discontinued, and
that users should visit your website going forward (see example below). You can also include an
"uninstall" button that calls the [`uninstallSelf()`][168] method.

Starting with Chrome 75, the [`installReplacementWebApp()`][169] method can be used inside of a
Chrome App, in response to a button click or other user gesture, to automatically trigger the
installation flow for your replacement PWA.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Qw8PhA0V122tSWZTRyw9.png", alt="Shows button that can link to install PWA", height="468", width="598" %}

### Q: I want to continue to have a UI affordance that enables users to launch my app from the taskbar/dock/homescreen. What should I do? {: #app-launcher }

[Progressive Web Apps][170] are installable on both [desktop][171] and [mobile][172] platforms.
Users who choose to install your PWA can launch it via icons and shortcuts, similar to the way that
Chrome Apps can be installed today.

### Q: I want my app to run in its own window, not in a tab. Is this something I can do with a web app? {: #run-in-window }

You can provide [metadata][173] in your Progressive Web App's [manifest file][174] indicating that,
when launched after installation, it will open in its own window.

### Q: My app supports keyboard shortcuts. Can the web support this also? {: #keyboard-shortcuts }

Web apps can support keyboard shortcuts by listening to the various key events (e.g.
**[keydown][175]**), but the shortcuts you can support are limited. For example, you cannot
intercept Ctrl+N, Ctrl+T etc. as these are used by the browser. Or, these might be shortcuts that
are handled by the operating system (e.g. Alt+Tab on Windows).

When your web app is used in [fullscreen][176] mode, you are able to [intercept][177] these system
shortcuts.

The **[Extension Commands API][178]** supports richer keyboard shortcuts which operate across the
entire browser, which may enable new capabilities if transitioning to an extension is possible.

### Q: My app needs to run when the user is offline. Can I do that with a web app? {: #offline-app }

Yes, you can **[use service workers to make your site run offline][179]**. The [Workbox][180]
project can simplify developing a full-featured caching strategy for your service worker.

### Q: My app uses the chrome.gcm API to receive push messages from the cloud. Can the open web do that? {: #push-messages }

Yes, assuming the user has granted permission, the **[Push API and Notifications API][181]** can
allow your web app to show your user push notifications.

### Q: My app needs to be able to show notifications to the user even when it has no windows open. Can I do that with the open web? {: #show-notifications }

Yes, the **[Push API and Notifications API][182]** can allow your web app to show your user push
notifications even when your web app is closed, as long as an instance of the browser is running.

### Q: My app uses chrome.bluetooth/chrome.usb to talk to a Bluetooth/USB device. Can this be done on the open web? {: #bluetooth }

Both [Web Bluetooth][183] and [Web USB][184] are available in certain browsers, and can be used
(along with feature detection) in a Progressive Web App.

### Q: My app uses the chrome.fileSystem API to read and write user-specified files and / or directories. Can this be done on the open web? {: #fileSystem }

The open web can read single files that the user opens, but cannot retain access to those files,
write to those files, or have any access to directories.

There are plans to [implement direct filesystem access][185], and an experimental implementation is
available in Chrome, but that functionality has not yet been fully standardized.

### Q: My app uses the chrome sockets API to do networking. Can this be done with the open web? {: #sockets }

You might be able to do what you need with **[WebSockets][186]**. However, to use this, you will
likely need to change the remote end of your connection.

If that isn't possible, we'd like to hear more about your use case—please let us know about what
you're trying to accomplish [via the Chromium issue tracker][187].

### Q: What resources are available to help with a Progressive Web App migration? {: #migration-resources }

The Chrome team maintains the following sites and tools with information that can help during your
migration:

- [Web Capabilities][188] overview
- [Progressive Web Apps Training][189]
- [Workbox][190], for generating a service worker

If you have a specific question not addressed via those resources, we recommend asking a question on
[Stack Overflow][191]. This [template][192] can be used to create a question tagged with both
[`google-chrome-app`][193] and [`progressive-web-apps`][194], to ensure maximum visibility.

### Q: I'd like to use a capability not mentioned already that lacks a web alternative. How do I make a feature request? {: #missing-capability }

We'd like to hear more about what you're trying to accomplish— let us know [via the Chromium issue
tracker][195].

## Chrome hosted apps {: #hosted-apps }

## FAQs {: #hosted-apps-faqs }

### Q: My hosted app uses the notifications permission. How do I do that on the web? {: #hosted-apps-notifications-permission }

Yes, assuming the user has granted permission, the **[Push API and Notifications API][196]** can
allow your web app to show your user push notifications.

### Q: My hosted app uses the unlimitedStorage permission. How do I do that on the web? {: #unlimitedStorage }

The unlimitedStorage permission ensured that data you store was 'Persistent', which means it can
only be cleared manually by the user.

The recommended alternative is to request **[Persistent Storage][197]** permission within your web
app.

### Q: My hosted app uses the geolocation permission. How do I do that on the web? {: #geolocation }

The **[Geolocation API][198]** can be used in web apps to locate a user's position.

### Q: My hosted app uses the background permission. How do I do that on the web? {: #background }

To ensure minimal power consumption we have been careful about introducing a generic method for
sites to run in the background on user's devices.

Sites that have deployed a [service worker][199] can ensure actions taken by the user while offline
are synced to the server using the **[Background Sync API][200]**. This API allows sites to run some
limited code in the background when the device re-connects to the internet, even if the tab has
since been closed. Note that this API doesn't allow for the service worker to be woken up
periodically.

A separate feature, [Periodic Background Sync][201], is being implemented as an experimental feature
in Chrome. It allows developers to request periodic updates via a special event exposed on the
service worker, with controls over the frequency of those updates.

### Q: My hosted app uses the clipboardRead and/or clipboardWrite permission. How do I do that on the web? {: #clipboard }

Web apps can use a standard platform API to copy and paste both [text][202] and [images
programmatically.][203]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://developers.google.com/web/progressive-web-apps/
[4]: https://developers.google.com/web/updates/capabilities
[5]: https://www.chromium.org/teams/web-capabilities-fugu
[6]: https://caniuse.com/
[7]:
  https://bugs.chromium.org/p/chromium/issues/entry?summary=Fugu+Request:++Add+your+feature+title&comment&labels=Type-Feature,Pri-3,Proj-Fugu
[8]: https://developers.google.com/web/progressive-web-apps/desktop
[9]: https://developers.google.com/web/fundamentals/app-install-banners/
[10]: /docs/extensions/reference
[11]: /extensions/messaging#external-webpage
[12]: /extensions/browserAction
[13]:
  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Porting_a_Google_Chrome_extension
[14]: /apps/accessibilityFeatures
[15]: /extensions/accessibilityFeatures
[16]: /apps/alarms
[17]: http://crbug.com/891339
[18]: https://developer.android.com/topic/libraries/architecture/workmanager
[19]: /extensions/alarms
[20]: /apps/app_runtime
[21]: https://bugs.chromium.org/p/chromium/issues/detail?id=844279
[22]: https://developer.android.com/guide/components/activities/activity-lifecycle
[23]: /apps/app_runtime#event-onRestarted
[24]: https://developers.google.com/web/updates/2018/07/page-lifecycle-api
[25]: https://developer.android.com/guide/components/activities/activity-lifecycle#onresume
[26]: /apps/app_window
[27]: https://crbug.com/897300
[28]: /extensions/windows
[29]: /apps/audio
[30]: http://crbug.com/897326
[31]: https://developer.android.com/guide/topics/media/mediaplayer
[32]: /apps/app_bluetooth
[33]: https://www.chromestatus.com/feature/5264933985976320
[34]: https://developer.android.com/guide/topics/connectivity/bluetooth
[35]: /apps/bluetoothLowEnergy
[36]: https://www.chromestatus.com/feature/5264933985976320
[37]: https://developer.android.com/guide/topics/connectivity/bluetooth-le
[38]: /apps/bluetoothSocket
[39]: https://www.chromestatus.com/feature/5264933985976320
[40]: https://developer.android.com/reference/android/bluetooth/BluetoothSocket
[41]: /apps/browser
[42]: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
[43]: https://developer.android.com/reference/android/content/Intent
[44]: /apps/commands
[45]: https://w3c.github.io/uievents/
[46]: https://developer.android.com/training/keyboard-input/commands
[47]: /extensions/commands
[48]: /apps/contextMenus
[49]: https://developer.android.com/reference/android/view/ContextMenu
[50]: /apps/documentScan
[51]: /extensions/documentScan
[52]: /apps/events
[53]: https://bugs.chromium.org/p/chromium/issues/detail?id=891339
[54]: /extensions/events
[55]: /apps/extensionTypes
[56]: /extensions/extensionTypes
[57]: /apps/fileSystem
[58]: http://crbug.com/853326
[59]: /apps/fileSystemProvider
[60]: https://developer.android.com/reference/java/nio/file/spi/FileSystemProvider.html
[61]: /extensions/fileSystemProvider
[62]: /apps/gcm
[63]: https://developers.google.com/web/fundamentals/push-notifications/
[64]: /extensions/gcm
[65]: /apps/hid
[66]: https://www.chromestatus.com/feature/5172464636133376
[67]: /apps/i18n
[68]: https://developer.android.com/guide/topics/resources/localization
[69]: /extensions/i18n
[70]: /apps/identity
[71]: https://www.chromestatus.com/feature/5669923372138496
[72]: https://developer.android.com/training/id-auth/authenticate
[73]: /extensions/identity
[74]: /apps/idle
[75]: http://crbug.com/878979
[76]: /extensions/idle
[77]: /apps/instanceID
[78]: https://developers.google.com/web/fundamentals/push-notifications/
[79]: /extensions/instanceID
[80]: /apps/mdns
[81]: https://developer.android.com/training/connect-devices-wirelessly/nsd
[82]: /apps/mediaGalleries
[83]: http://crbug.com/853326
[84]: /apps/networking_onc
[85]: /apps/notifications
[86]: https://www.chromestatus.com/feature/5064350557536256
[87]: /extensions/notifications
[88]: /apps/permissions
[89]: https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API
[90]: /extensions/permissions
[91]: /apps/power
[92]: https://www.chromestatus.com/feature/4636879949398016
[93]: http://b/133417350
[94]: /extensions/power
[95]: /apps/printerProvider
[96]: /extensions/printerProvider
[97]: https://developer.android.com/reference/android/printservice/package-summary
[98]: /extensions/printerProvider
[99]: /apps/runtime
[100]: https://developers.google.com/web/updates/2018/07/page-lifecycle-api
[101]: /extensions/runtime
[102]: /apps/messaging#connect
[103]: https://www.chromestatus.com/feature/6710044586409984
[104]: /extensions/runtime#method-connect
[105]: /apps/messaging#simple
[106]: /extensions/runtime#method-sendMessage
[107]: /apps/app_serial
[108]: https://www.chromestatus.com/feature/6577673212002304
[109]: /apps/app_network
[110]: https://w3c.github.io/webrtc-quic/cs.html
[111]: https://developer.android.com/reference/java/net/Socket
[112]: /apps/sockets_tcpServer
[113]: https://developer.android.com/reference/java/net/Socket
[114]: /apps/sockets_udp
[115]: https://w3c.github.io/webrtc-quic/cs.html
[116]: https://developer.android.com/reference/java/net/DatagramSocket
[117]: /apps/storage
[118]: https://www.chromestatus.com/feature/5072127703121920
[119]: https://www.chromestatus.com/feature/6507459568992256
[120]: /extensions/storage
[121]: /extensions/manifest/storage
[122]: https://developer.android.com/work/managed-configurations
[123]: /extensions/storage#property-managed
[124]: /apps/syncFileSystem
[125]: https://developers.google.com/drive/api/v3/quickstart/java
[126]: /apps/system.cpu
[127]: https://www.chromestatus.com/feature/6248386202173440
[128]: /extensions/system_cpu
[129]: /apps/system.display
[130]: https://drafts.csswg.org/cssom-view/#the-screen-interface
[131]: https://developer.android.com/reference/android/util/DisplayMetrics
[132]: /apps/system.memory
[133]: https://www.chromestatus.com/feature/5119701235531776
[134]: /extensions/system_memory
[135]: /apps/system.network
[136]: https://www.chromestatus.com/feature/6338383617982464
[137]: /apps/system.storage
[138]: https://www.chromestatus.com/feature/5630353511284736
[139]: /extensions/system_storage
[140]: /apps/tts
[141]: https://www.chromestatus.com/feature/4782875580825600
[142]: https://android-developers.googleblog.com/2009/09/introduction-to-text-to-speech-in.html
[143]: /extensions/tts
[144]: /apps/types
[145]: /extensions/types
[146]: /apps/app_usb
[147]: https://www.chromestatus.com/feature/5651917954875392
[148]: http://go/arc++usb
[149]: /apps/virtualKeyboard
[150]: https://developer.android.com/training/keyboard-input
[151]: /apps/vpnProvider
[152]: https://developer.android.com/reference/android/net/VpnService
[153]: /extensions/vpnProvider
[154]: /apps/wallpaper
[155]: https://developer.android.com/reference/android/app/WallpaperManager
[156]: /extensions/wallpaper
[157]: /apps/manifest/externally_connectable
[158]: /apps/manifest/kiosk_enabled
[159]: /apps/manifest/minimum_chrome_version
[160]: /apps/manifest/minimum_chrome_version
[161]: /apps/offline_apps
[162]: https://developers.google.com/web/fundamentals/codelabs/offline/
[163]: /native-client
[164]: /native-client/migration
[165]: /docs/extensions/reference/webviewTag/
[166]: https://developer.android.com/reference/android/webkit/WebView
[167]: https://forms.gle/cNiZJbSutFbnFUdv8
[168]: /extensions/management#method-uninstallSelf
[169]: /extensions/management#method-installReplacementWebApp
[170]: https://developers.google.com/web/progressive-web-apps/
[171]: https://developers.google.com/web/progressive-web-apps/desktop
[172]: https://developers.google.com/web/fundamentals/app-install-banners/
[173]: https://developers.google.com/web/fundamentals/web-app-manifest/#display
[174]: https://developers.google.com/web/fundamentals/web-app-manifest/
[175]: https://developer.mozilla.org/en-US/docs/Web/Events/keydown
[176]: https://developers.google.com/web/fundamentals/web-app-manifest/#display
[177]: https://chromestatus.com/feature/5642959835889664
[178]: /extensions/commands
[179]: https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
[180]: https://developers.google.com/web/tools/workbox/
[181]: https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/
[182]: https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/
[183]: https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
[184]: https://developers.google.com/web/updates/2016/03/access-usb-devices-on-the-web
[185]: https://developers.google.com/web/updates/2018/11/writable-files
[186]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[187]: https://bit.ly/new-fugu-request
[188]: https://developers.google.com/web/updates/capabilities
[189]: https://developers.google.com/web/ilt/pwa/
[190]: https://developers.google.com/web/tools/workbox/
[191]: https://stackoverflow.com/
[192]: https://stackoverflow.com/questions/ask?tags=progressive-web-apps,google-chrome-app
[193]: https://stackoverflow.com/questions/tagged/google-chrome-app
[194]: https://stackoverflow.com/questions/tagged/progressive-web-apps
[195]: https://bit.ly/new-fugu-request
[196]: https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/
[197]: https://developers.google.com/web/updates/2016/06/persistent-storage?hl=en
[198]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[199]: https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
[200]: https://developers.google.com/web/updates/2015/12/background-sync?hl=en
[201]: https://developers.google.com/web/updates/2019/08/periodic-background-sync
[202]: https://developers.google.com/web/updates/2018/03/clipboardapi
[203]: https://developers.google.com/web/updates/2019/07/image-support-for-async-clipboard
