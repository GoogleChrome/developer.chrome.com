---
layout: 'layouts/blog-post.njk'
title: What's happening in Chrome Extensions?
description: >
 An overview of the changes so far this year in Chrome Extensions, plus exciting upcoming extension features developers can look forward to.
date: 2023-07-13
authors:
  - amysteam
tags:
  - extensions-news
hero: 'image/BhuKGJaIeLNPW9ehns59NfwqKxF2/jzaO8VCyWJRXKgeIe68T.png'
alt: >
  What's happening in Chrome extensions?
---

So far, 2023 has been a busy year in the world of Chrome extensions. Your valuable feedback has allowed us to improve the extension platform and our documentation. We also continue collaborating with other browser vendors in the [WebExtensions Community Group][wecg] so that extension APIs work more consistently across browsers.

In this post, we’ll share with you a few changes that the Chrome extension team has worked on during the first half of this year and what upcoming features will be released later this quarter. Let's get started!

{% Aside %}

If you’d like a TL;DR, feel free to jump to the [Coming soon...][sec-coming-apis] section for new extension features you can start looking forward to 🙂.

{% endAside %}

## New extension APIs and features {: #new-apis}

In this section, I want to highlight some significant API launches, briefly review other API improvements, and share upcoming API releases.

### Highlights {: #apis-highlights}

#### Offscreen documents {: #offscreen-api }

The [Offscreen API][api-offscreen] was introduced in Chrome 109. It allows Manifest V3 extensions to handle use cases that need interaction with the DOM or window, which cannot be performed in the extension service worker. Also, Chrome 114 introduced two additional offscreen reasons: `'WORKERS'` for instances when your document needs to spawn a worker and `'LOCAL_STORAGE'` to help migrate data from `window.localStorage` to the [`chrome.storage` API][mv3-localstorage]. 

Starting in Chrome 115, you can provide multiple reasons when creating an offscreen document. This allows you to perform two related tasks in the same document.

#### New Side Panel API 🎉 {: #side-panel-api }

In the past, the only way to create sidebars in extensions was by injecting a new element with content scripts on every page. In Chrome 114, the [Side Panel API][api-sidepanel] was launched. Now you can develop a companion sidebar experience for users in a much more straightforward way. Read more about how the [Side Panel API allows you to design a superior user experience][blog-sidepanel].

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/OU9486fAP8Dqgrs83L39.png", alt="A dictionary extension that shows the definition of a selected word", width="500", height="537", class="screenshot" %}
  <figcaption>
  Side panel dictionary extension. See the <a href="https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary">code</a> in the chrome-extensions-samples repository.
  </figcaption>
</figure>

#### More robust Service Workers {: #sw }

All extension events now restart the extension service worker's idle timer. In Chrome 110, the hard five-minute maximum lifetime was removed for extension service workers. Also, messages to [native applications][doc-native-msg] and [messages within the extension][doc-messages] restart the idle timer. Read more about it in [The extension service worker lifecycle][sw-lifecycle] article.

### More API launches {: #apis-others }

- **Action API**: Starting Chrome 110, you can customize the badge text with [`setBadgeTextColor`()][action-set-color] and [`getBadgeTextColor()`][action-get-color]. Also, [`isEnabled()`][action-isenabled] allows you to check if the action is enabled for the current tab.
- **Commands API**: The bug where extension shortcuts, declared in the manifest under [`"commands._execute_action"`][commands-execute-action], would not persist during conversion to MV3, was fixed in [Chrome 111][bug-fix-commands].
- **Downloads API**: The default downloads UI in Chrome has moved from a shelf at the bottom to the right side of the omnibox. To disable this behavior, you can use [`downloads.setUiOptions()`][downloads-setui] which replaces `setShelfEnabled()`.
- **History API**: [`chrome.history.getVisits()`][history-get-visits] and [`chrome.history.search()`][history-search] also return data from other devices that have been synced to the local history database. This may result in more history entries and higher visit counts. `isLocal` was added to [`VisitItem`][history-visititem] in Chrome 115 (expected in stable later this month) to be able to filter by local visits only.
- **Identity API**: The authentication window now appears as a popup, instead of occupying a full application window. To grant more control during the process of JavaScript redirects, we have added two new options: [`abortOnLoadForNonInteractive`][identity-abort] and [`timeoutMsForNonInteractive`][identity-timeout].
- **Storage API**: In Chrome 112 the [`chrome.session`][storage-session] storage size was increased to 10MB. Then [`chrome.local`][storage-local] storage size was changed to match in Chrome 114.

### Coming soon... {: #coming-soon-apis }

Upcoming Chrome versions will introduce many features to make it easier for extensions to migrate to Manifest V3. For a list of upcoming MV3 migration-related changes, check out our [known issues page][mv3-known-issues]. Additionally, we plan to add the following features:

- **DeclarativeNetRequest API**: The default value for the [isUrlFilterCaseSensitive][dnr-url-case] property will change to `false`. See the [WECG][wecg-dnr-url-case] thread.
- The **File Handling API** will allow ChromeOS extensions to open files with specified MIME types and file extensions. This feature is currently [behind a flag][wn-file-handling].
- **Runtime API**: We are releasing [`runtime.getContexts()`][runtime-getcontexts] to replace `extension.getViews()`, which is deprecated. This will allow extensions to determine if an extension page like the side panel or offscreen document is open. See the [WECG][wecg-get-contexts] proposal.
- **Service workers**: We're adding strong keep-alives to Chrome APIs that display a user prompt: [`permissions.request()`][permission-request], [`desktopCapture.chooseDesktopMedia()`][desktop-capture], [`identity.launchWebAuthFlow()`][identity-launchwebflow], and [`management.uninstall()`][management-uninstall].
- **Side Panel API**: We're launching [`sidepanel.open()`][sidepanel-open], which will open the extension side panel programmatically in response to a user gesture, such as a context menu click.
- **TabCapture API**: We're adding the ability to call `getMediaStreamId()` from the extension service worker and obtain a MediaStream from a stream ID in an offscreen document. See [Audio recording and screen capture][tut-capture] for examples.

Stay tuned to the [What's new in extensions](/docs/extensions/whatsnew/) page for these announcements as soon as they are made available in [Chrome Beta](https://chromestatus.com/roadmap).

## Documentation upgrades and more Manifest V3 guidance {: #new-docs }

We've also been working hard to improve the developer's learning experience. Big thanks to all of
you who took the time to ask questions on the [chromium-group][chromium-group] and report
documentation issues on [developer.chrome.com][github-dcc].

### Highlights {: #doc-highlights }

- The new [MV3 Migration][mv3-migration] section provides practical ways to convert Manifest V2 extensions to Manifest V3.
- The [Extension service workers][sw-explainer] guide provides detailed information on extension service workers topics. These include how they are registered and updated, what the lifecycle looks like, how imports work, and more.
- The [Handle events with service workers][sw-tut] tutorial teaches the basics of extension service workers. It builds an omnibox extension that gives you quick access to extension API reference pages.

### More updates {: #doc-others }

- [Using Google Analytics 4][tut-ga4] demonstrates how to track the usage of your extension popup and service worker events.
- [Using geolocation][tut-geo] shows how to obtain the geographical location of the extension using the Offscreen API.
- [Audio recording and screen capture][tut-capture] teaches how to capture audio and video from tabs, windows, or screens using `chrome.tabCapture` and `navigator.mediaDevices.getDisplayMedia()` APIs.
- We've added new debugging tips to the [Debugging extensions][tut-debug] guide.
- We've updated the [Permission warnings guidelines][guide-perm-warn] to make it easier to understand how permission warnings work and how you can provide a better user experience. Also, there are practical ways to check what warnings the user will see.
- Our team and contributors have also added new Manifest V3 extension samples: [WASM in extensions][gh-wasm], [Scripting API demo][gh-scripting], [Side Panel API cookbooks][gh-sidepanel], and [DeclarativeNetRequest API samples][gh-dnr]. You can explore other extension samples in our [GitHub samples repo][gh-ext-samples].

### Coming soon... {: #coming-soon-docs }

- How to migrate remote hosted code to Manifest V3.
- How to run automated tests for Chrome extensions.
- Improved Declarative Net Request guidance.
- Improvements to the content script explainer.

## 💡 Did you know? {: #tips }

Before we wrap up, we wanted to share a couple of useful tools and insights:

- Chrome started work on supporting [WebHID][gh-webhid]; you can play around with the API starting Chrome 115 (but be aware that it's still a work in progress).
- [Puppeteer][puppeteer] now supports testing in headless mode using `--headless=new` . Read more about it on [Chrome's headless mode upgrade][chrome-headless] blog post.
- With the [Extension Update Testing Tool][gh-update-tool], you can check what warnings are triggered when permissions change in the manifest. This way, you can experience the update process as a user would. This is important because some permissions might disable the extension until the user grants access again.

## Let's connect! 🙌 {: #connecting }

This year, the extension team was happy to meet extension developers in person during [Google I/O Connect][yt-io-connect] events. We are working on creating new spaces to connect with you, such as launching focus groups and meetup events.

In the meantime, please continue to ask questions on the [chromium-groups][chromium-group], consider participating on the [WECG][wecg], and report any documentation issues on the [developer.chrome.com GitHub repo][github-dcc].

Thanks again for being a part of the extension developer community!

[action-get-color]: /docs/extensions/reference/action/#method-getBadgeTextColor
[action-isenabled]: /docs/extensions/reference/action/#method-isEnabled
[action-set-color]: /docs/extensions/reference/action/#method-setBadgeTextColor
[api-action]: /docs/extensions/reference/action/
[api-offscreen]: /docs/extensions/reference/offscreen/
[api-sidepanel]: /docs/extensions/reference/sidePanel/
[blog-sidepanel]: /blog/extension-side-panel-launch/
[blog-sw-lifetimes]: /blog/longer-esw-lifetimes/
[bug-fix-commands]: https://chromiumdash.appspot.com/commit/a98898b9615f2e454ec02917c720f479f29e673f
[chrome-headless]: /articles/new-headless/
[chromium-group]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[commands-execute-action]: /docs/extensions/reference/commands/#action-commands
[desktop-capture]: /docs/extensions/reference/desktopCapture/#method-chooseDesktopMedia
[dnr-url-case]: /docs/extensions/reference/declarativeNetRequest/#property-RuleCondition-isUrlFilterCaseSensitive
[doc-messages]: /docs/extensions/mv3/messaging/
[doc-native-msg]: /docs/extensions/mv3/nativeMessaging/
[downloads-setui]: /docs/extensions/reference/downloads/#method-setUiOptions
[gh-dnr]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/declarativeNetRequest
[gh-ext-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[gh-scripting]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/scripting
[gh-sidepanel]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples
[gh-update-tool]: https://github.com/GoogleChromeLabs/extension-update-testing-tool
[gh-wasm]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples
[gh-webhid]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.co2meter
[github-dcc]: https://github.com/GoogleChrome/developer.chrome.com/issues
[guide-perm-warn]: /docs/extensions/mv3/permission_warnings/
[history-get-visits]: /docs/extensions/reference/history/#method-getVisits
[history-search]: /docs/extensions/reference/history/#method-search
[history-visititem]: /docs/extensions/reference/history/#type-VisitItem
[identity-abort]: /docs/extensions/reference/identity#property-WebAuthFlowDetails-abortOnLoadForNonInteractive
[identity-launchwebflow]: /docs/extensions/reference/identity/#method-launchWebAuthFlow
[identity-timeout]: /docs/extensions/reference/identity/#property-WebAuthFlowDetails-timeoutMsForNonInteractive
[mv3-known-issues]: /docs/extensions/migrating/known-issues/#closing-the-platform-gap
[management-uninstall]: /docs/extensions/reference/management/#method-uninstall
[mv3-localstorage]: /docs/extensions/migrating/to-service-workers/#convert-localstorage
[mv3-migration]: /docs/extensions/#migrate-from-manifest-v2-to-manifest-v3
[permission-request]: /docs/extensions/reference/permissions/#method-request
[puppeteer]: https://pptr.dev/guides/chrome-extensions
[runtime-getcontexts]: /docs/extensions/reference/runtime/#method-getContexts
[sec-coming-apis]: #coming-soon-apis
[sec-coming-docs]: #coming-soon-docs
[storage-local]: /docs/extensions/reference/storage/#property-local
[storage-session]: /docs/extensions/reference/storage/#property-session
[sw-explainer]: /docs/extensions/#service-workers
[sw-lifecycle]: /docs/extensions/mv3/service_workers/service-worker-lifecycle/#timeouts
[sw-tut]: /docs/extensions/mv3/getstarted/tut-quick-reference/
[tut-capture]: /docs/extensions/mv3/screen_capture/
[tut-debug]: /docs/extensions/mv3/tut_debugging/
[tut-ga4]: /docs/extensions/mv3/tut_analytics/
[tut-geo]: /docs/extensions/mv3/geolocation/
[web-sql]: /blog/deprecating-web-sql/
[wecg-dnr-url-case]: https://github.com/w3c/webextensions/issues/269
[wecg-get-contexts]: https://github.com/w3c/webextensions/blob/main/proposals/runtime_get_contexts.md
[wecg]: https://github.com/w3c/webextensions/issues
[wn-file-handling]: /docs/extensions/whatsnew#the-file-handling-api-comes-to-chromeos
[yt-io-connect]: https://youtu.be/634qUJ0rJ8I
[sidepanel-open]: /docs/extensions/reference/sidepanel/#method-open
