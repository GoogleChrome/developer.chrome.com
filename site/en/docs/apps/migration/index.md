---
layout: "layouts/doc-post.njk"
title: "Transitioning from Chrome Apps"
date: 2016-08-18
updated: 2023-08-17
description: How to migrate your Chrome packaged or hosted app.
authors:
  - demianrenzulli
  - paulrossman
---

{% Aside 'caution' %}

**Important:** As [previously announced on Chromium Blog][1], we are phasing out support for Chrome Apps in favor of Web Applications. Starting with Chrome 112, Chrome Apps on Windows, Mac and Linux no longer work. Based on feedback from ChromeOS Enterprise and Education customers and developers, Chrome App support for those users on ChromeOS is extended until at least January 2025.

{% endAside %}

## Migration options {: #migration-options }

There are two primary options to migrate from Chrome Apps: web applications and Chrome Extensions:

{% Img src="image/26V1DWN36MZr3mUo8ChSBlCpzp43/DG9uvmotUXImXRu1Yhge.png", alt="Chrome app migration options. Web Applications or Chrome Extensions.", width="800", height="421" %}

Web applications are the preferred path in most cases. Chrome Extensions can be used in some scenarios for use cases that the web doesn’t support, like running in the background without a user interface.

### Web Applications {: #web-applications }

The preferred alternative for migrating from Chrome Apps is to build a web application. By doing so you can use advanced features, like those of the [web capabilities project][2], which covers most of the use cases that were previously achievable with Chrome App APIs. However, it is not mandatory to use any of these features: the flexibility of the web allows developers to choose the level of complexity that best suits their needs.

#### Advantages of Web Applications {: #advantages-web-applications }

Web applications have some advantages over Chrome Apps:

- **Portability:** Chrome Apps only run in Chrome. Web applications run on most browsers and operating systems, although support for different APIs varies among them.
Developer experience: Chrome Apps use the same technologies as web applications (HTML, JS, CSS), but some of Chrome Apps advanced capabilities (e..g background pages) are not standard, which require additional knowledge.
- **Feature set:** Chrome Apps rely on APIs that are no longer maintained or updated with new features. Web applications rely on the open web, which evolves continuously and has access to all the up-to-date APIs.
- **Installation and updates:** Chrome Apps require manual installation and updating, and sometimes require store reviews. Web applications can be accessed directly from a browser and can optionally be installed. Updates for web applications are instant upon deployment, as soon as the browser fetches the new files.
- **Support:** While both Chrome Apps and web applications have sizable communities, the web platform has a much larger presence and offers a broader range of development tools, such as frameworks and libraries, to support developers.

#### Progressive Web Apps {: #progressive-web-apps }

Progressive Web Apps, or PWAs, are just web applications that are built and optimized with modern APIs to deliver enhanced capabilities, installability, and reliability. Implementing these functionalities allows you to achieve app-like experiences on the web.

##### Installability {: #installability }

PWAs are [installable][4] on both desktop and mobile platforms, but this is optional, as they can still be accessed directly from the browser. Users who choose to install a PWA can launch it via icons and shortcuts. You can provide metadata in your PWA's [web manifest file][5] indicating that, when launched after installation, it will open in its own window.

##### Reliability {: #reliability }

PWAs have the ability to function consistently even under challenging network conditions. This is made possible by a core component of PWAs, known as [service workers][6]. Service workers allow you to intercept network requests and serve cached content to ensure that the app works offline or in scenarios of poor connectivity. Libraries like [Workbox][7], provide a set of out of the box strategies to let you implement common offline functionalities, greatly simplifying development.

##### Enhanced capabilities {: #enhanced-capabilities }

The [Web Capabilities project][8] enables web applications to achieve many use cases that Chrome Apps can implement. However, the web's security model imposes certain limitations. Here are some examples of advanced web capabilities that you can use instead of existing Chrome App APIs:

- **Bluetooth and USB access:** [Web Bluetooth][9] and [Web USB][10] provide an alternative to [`chrome.bluetooth`][11] and [`chrome.usb`][12] respectively.
- **File System management:** The [File System Access API][13] is the alternative to [`chrome.fileSystem`][14] API.
- **Shortcuts:** Web apps can support keyboard shortcuts by listening to the various key events (e.g. [keydown][15]), but the shortcuts you can support are limited. When your web app is used in fullscreen mode, you are able to intercept these system shortcuts with the [Keyboard Lock API][16].
- **Persistent Storage:** Requesting [Persistent Storage][17] permission within your web application can offer similar capabilities as the `unlimitedStorage` permission in Chrome Apps.
- **Geolocation:** The [Geolocation API][18] can be used in web apps to locate a user's position, as an alternative to the geolocation permission.
- **Background processing:** Alternatives to the `background` permission include the [Background Sync API][19] and the [Periodic Background Sync API][20].
- **Copy to clipboard:** The [Async Clipboard API][21] allows you to copy and paste both text and images programmatically.

### Chrome Extensions {: #chrome-extensions }

Web applications are the best alternative to migrate from Chrome Apps, but Chrome Extensions can be an option in some cases. They are also built with web technologies (HTML, CSS, JS) and can be used to add or modify the browser's functionality and customize other web applications for better user experience.

#### Build a standalone extension {: #build-standalone-extension }

Depending on the user experience you want to provide, it might make sense to convert your Chrome App into an extension. For example, you could provide a [browser action][22] button which shows a small popup window for your user interface, or navigates to a page your extension provides. This UI model may be more suitable for apps that do most of their work in the background.

#### Connect an Extension from a web application {: #connect-extension-web-application }

If your Chrome App offers capabilities that are not available on the web platform, it may be possible to [connect a Chrome Extension with a web application][23] and give it access to [extension APIs][24].The disadvantage of this approach is that users / IT admins have to manage two different parts (web application and companion extensions). It’s important to note that Chrome extensions can't be run on some browsers, you should detect when required functionality isn't available and provide explanatory text for users on these other browsers.

### Should I create a Web Application or a Chrome Extension? {: #web-application-or-chrome-extension }

A web application is the preferred technology to migrate to from Chrome Apps. There are a few use cases where Chrome Extensions might be a better choice. Before deciding, analyze which option is better according to different factors:

- **Purpose:** Chrome extensions are primarily used to extend the functionality of the browser. Common use cases include: productivity tools, web page content enrichment, information aggregation, etc. Web applications can have a much wider range of use cases by leveraging the full power of the web.
- **User Experience:** Chrome extensions typically have a more limited user interface and are designed to integrate with the browser. Web applications can have a rich user interface that looks and feels like a native app and it’s highly customizable.
- **Portability:** Chrome Extensions are Chrome-specific. Some browsers (e.g. [Firefox][25], [Edge][26]) support the same extension APIs as Chrome, but this support is not universal. Web applications are supported by all the browsers (although not all the APIs might be).
- **Discoverability:** Chrome Extensions need to be installed (e.g. from the Chrome Web Store or via self hosting) and accessed via the browser toolbar. Web applications can be instantly loaded via a URL and accessed from all the browsers. They can optionally be installed but this is not mandatory. 
- **Feature set:** Chrome Extensions have a deep integration with Chrome, through Chrome APIs. Web applications might be more limited in low-level or system-level tasks. As discussed, it's possible to [call an extension from a web application][27] to have access to extension-only APIs.
- **Background work:** Chrome extensions can perform background work and run even when the browser window is closed. Web applications, on the other hand, are typically designed to run in the foreground and have more limited background capabilities, mostly used for performance and reliability.

## Migration steps

### Migrating your Chrome Apps

Follow these steps to migrate from a Chrome App to web applications or Chrome Extensions:

1. **Scope your app functionality:** In some cases your app will dictate if you must go for a web application or if your only choice is to build a Chrome Extension. In cases where both can suit your needs you have a choice. Check out the [Web Capabilities site][28] and [Chrome Extension API reference][29] to learn more about what each technology has to offer.
1. **Learn & Build:** Follow the learning resources to know about technologies and get your app up and running. The [PWA training][30] and the [Getting Started Chrome Extension][31] guides are great resources to get started on each of these technologies.
1. **Test and distribute:** Offer your new app to a smaller percentage of users before a broader rollout to make sure it works well. To distribute them more widely, Web Applications can be accessed and installed from the browser. Chrome Extensions are usually distributed via the Chrome Web Store or self-hosted. Both can be forced installed by admins in managed scenarios.

### Migrating your users

Regardless of the technology you have chosen to migrate from Chrome Apps, you need to tell your users to uninstall the current app and guide them to the new experience.
We recommend updating your app to include a message indicating that it has been discontinued, and that users should visit your website or the Chrome Web Store going forward (see example below). You can also include an "uninstall" button that calls the [`uninstallSelf()`][32] method.
Starting with Chrome 75, the [`installReplacementWebApp()`][33] method can be used inside of a Chrome App, in response to a button click or other user gesture, to automatically trigger the installation flow for your replacement web application.

{% Img src="image/26V1DWN36MZr3mUo8ChSBlCpzp43/xeIV2iUiXMbfcbrv5GH3.png", alt="Google Photos Chrome App replacement", width="598", height="468" %}

An additional consideration is to inform Chrome Enterprise browser and ChromeOS Enterprise admins to update their app policies for their organizations. It is common for Enterprise and Education managed users to have their apps and extensions [force-installed via management policy][34].
Developers should inform admins to update their [ExtensionInstallForcelist policy][35] (used to install Chrome Apps) and replace it with the [WebAppInstallForceList policy][36] with your web app’s URL:

{% Img src="image/26V1DWN36MZr3mUo8ChSBlCpzp43/vTWEWNxK7zwB3jcGgyVD.png", alt="Admin Console Extension and Web App force install policy", width="800", height="503" %}

## Support

If you have any technical questions here are some resources you can use to get support:

- For Chrome App to web application questions use [this Stack Overflow template][37].
- For Chrome App to Chrome Extension help use [this Stack Overflow template][38].
- For missing web app capabilities, request a new capability under [Capabilities, aka. Project Fugu][39].

[1]: https://blog.chromium.org/2021/10/extending-chrome-app-support-on-chrome.html
[2]: https://developer.chrome.com/blog/capabilities/
[3]: https://web.dev/progressive-web-apps/
[4]: https://web.dev/customize-install/
[5]: https://web.dev/add-manifest/
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[7]: https://developer.chrome.com/docs/workbox/
[8]: https://www.chromium.org/teams/web-capabilities-fugu/
[9]: https://developer.chrome.com/articles/bluetooth/
[10]: https://developer.chrome.com/articles/usb/
[11]: https://developer.chrome.com/docs/extensions/reference/bluetooth/
[12]: https://developer.chrome.com/docs/extensions/reference/usb/
[13]: https://developer.chrome.com/articles/file-system-access/
[14]: https://developer.chrome.com/docs/extensions/reference/fileSystem/
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
[16]: https://developer.chrome.com/articles/keyboard-lock/
[17]: https://web.dev/persistent-storage/
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[19]: https://developer.chrome.com/blog/background-sync/
[20]: https://developer.chrome.com/articles/periodic-background-sync/
[21]: https://web.dev/async-clipboard/
[22]: https://developer.chrome.com/docs/extensions/reference/browserAction/
[23]: https://chromeos.dev/en/kiosk/connecting-an-extension-from-a-kiosk-pwa
[24]: https://developer.chrome.com/docs/extensions/reference/
[25]: https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/
[26]: https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/developer-guide/port-chrome-extension
[27]: https://chromeos.dev/en/kiosk/connecting-an-extension-from-a-kiosk-pwa
[28]: https://developer.chrome.com/capabilities/
[29]: https://developer.chrome.com/docs/extensions/reference/
[30]: https://web.dev/learn/pwa/
[31]: https://developer.chrome.com/docs/extensions/#getting-started-guides
[32]: https://developer.chrome.com/docs/extensions/reference/management/#method-uninstallSelf
[33]: https://developer.chrome.com/docs/extensions/reference/management/#method-installReplacementWebApp
[34]: https://support.google.com/chrome/a/answer/6306504
[35]: https://chromeenterprise.google/policies/#ExtensionInstallForcelist
[36]: https://chromeenterprise.google/policies/#WebAppInstallForceList
[37]: https://stackoverflow.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2fask%3ftags%3dprogressive-web-apps%2cgoogle-chrome-app
[38]: https://stackoverflow.com/users/login?ssrc=anon_ask&returnurl=https%3a%2f%2fstackoverflow.com%2fquestions%2fask%3ftags%3dgoogle-chrome-extension%2cgoogle-chrome-app
[39]: https://developer.chrome.com/capabilities/