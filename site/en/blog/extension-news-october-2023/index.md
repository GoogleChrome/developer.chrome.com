---
layout: 'layouts/blog-post.njk'
title: What's happening in Chrome Extensions?
description: >
 An overview of the changes so far this year in Chrome Extensions, plus exciting upcoming extension features developers can look forward to.
date: 2023-10-13
authors:
  - amysteam
tags:
  - extensions-news
hero: 'image/BhuKGJaIeLNPW9ehns59NfwqKxF2/jzaO8VCyWJRXKgeIe68T.png'
alt: >
  What's happening in Chrome extensions?
---

Back in July, we launched [a new blog series](/blog/extension-news-july-2023/) to keep you up-to-date on extension developments. Thanks to your valuable feedback and our ongoing collaboration with fellow browser vendors in the WebExtensions Community Group, we continue to enhance extension APIs and work towards greater consistency across browsers.

Welcome to the October edition! In this post, we will look at some of the changes the Chrome extension team has made in the past few months, as well as some new features that will come out later this year. Let's get started!

{% Aside %}

If you’d like a TL;DR, feel free to jump to the [Coming soon...](#coming-soon-apis) section for new extension features you can start looking forward to 🙂.

{% endAside %}

## New extension APIs and features {: #new-apis }

In this section, we share some significant API launches, briefly review other API improvements, and share upcoming releases. All launches are currently available in the latest Beta release. See the [chromium release schedule](https://chromiumdash.appspot.com/schedule) for details.


### Highlights {: #apis-highlights }

#### Resolved known issues {: #closing-gap }

The extension team has been actively working to resolve Manifest V3 stability issues. [Chrome 116 launched many improvements](/blog/chrome-116-beta-whats-new-for-extensions/) that helped us make significant progress toward closing the feature gap between Manifest V2 and V3. In Chrome 120, we will have finished addressing our prioritized platform gaps and closing all critical bugs documented on the [known issues page](/docs/extensions/migrating/known-issues/).

#### Improved Service Worker stability {: #stable-sw }

Service Worker related stability issues have been resolved. In Chrome 116, we added strong keep-alives to extension APIs that [display a user prompt](/blog/chrome-116-beta-whats-new-for-extensions/#sw-keepalive) and improved support for WebSockets (see the [Using WebSockets in extensions](/docs/extensions/mv3/tut_websockets/) tutorial). From Chrome 118 onward, a service worker will stay alive during an [active Debugger API session](/docs/extensions/reference/debugger/).

Check out our updated [Service Worker guidance](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#timeouts) for more details. If your users still encounter service worker-related stability issues in Chrome > 119, [please let us know](/docs/extensions/support-feedback/).  


#### Increased security {: #security-increase }

Previously, navigating to some chrome:// URLs using [`tabs.update`](/docs/extensions/reference/tabs/#method-update), [`tabs.create`](/docs/extensions/reference/tabs/#method-create), and [`windows.create`](/docs/extensions/reference/windows/#method-create) emitted an error or would crash. Also, [`tabs.update`](/docs/extensions/reference/tabs/#method-update) couldn't open a Javascript URL. In Chrome 117, the list of chrome:// URLs we check for has been expanded, and the Javascript URL blocking now also applies to all extension API methods.

In Chrome 117, users will receive proactive notifications on the Chrome Extensions page if an extension they've installed is no longer available on the Chrome Web Store. This can happen if the developer unpublishes the extension, it's taken down for policy violations, or it's identified as malware. For a deep dive, see [Bringing Safety Check to the chrome://extensions page](/en/blog/extension-safety-hub/).

In Chrome 118, extensions will not be allowed to navigate to file:// URLs using the `chrome.tabs` and `chrome.windows` APIs, unless the “Allow access to file URLs” option is enabled on the extension’s details page. See the [WECG discussion](https://github.com/w3c/webextensions/issues/426).


### More API launches {: #apis-others }

- **Runtime API:** Starting in Chrome 116, you can use `[runtime.getContexts()``](/docs/extensions/reference/runtime/#method-getContexts) to retrieve information about active contexts. For example, you can check if there's an [active offscreen document](/docs/extensions/reference/offscreen/#example-maintaining-the-lifecycle-of-an-offscreen-document).
- **Side Panel API** In [Chrome 116](https://chromiumdash.appspot.com/commit/8e7430446eaa0b80964b0ab1fd816ac6f33fd4cd) you can use [`sidepanel.open()`](/docs/extensions/reference/sidepanel/#method-open), to open the extension side panel programmatically in response to a user gesture, such as a context menu click. See an extension sample here
- **TabCapture API** Added the ability to call `getMediaStreamId()` from the extension service worker and obtain a MediaStream from a stream ID in an offscreen document in Chrome 116. See [Audio recording and screen capture](/docs/extensions/mv3/screen_capture/) for examples.
- **DeclarativeNetRequest API:** The default value for the [isUrlFilterCaseSensitive](/docs/extensions/reference/declarativeNetRequest/#property-RuleCondition-isUrlFilterCaseSensitive) property was changed to `false` in [Chrome 118](https://chromiumdash.appspot.com/commit/d90e6a56d0e77ce5d278a5b070098c5d8f7081fd).

### Coming soon... {: #coming-soon-apis }

Upcoming Chrome versions will release features that will complete the remaining items on the [known issues page](/docs/extensions/migrating/known-issues/#closing-the-platform-gap). Additionally, we plan to add the following features:

- The **UserScripts API** will allow user script managers to coordinate how and when to inject a collection of user scripts into web pages. Currently available in Canary 119. See the [WECG proposal](https://github.com/w3c/webextensions/blob/main/proposals/user-scripts-api.md) and follow the [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1472902) for updates on availability.  
- The **ReadingList API** will allow developers to create, read, update, and delete metadata located in the Reading List panel of the side panel. See the [ReadingList API proposal](https://docs.google.com/document/d/1f1wW2955nY5Rp3vfS0JGuo1kACOAmsjZupvLYknWKII/) and [Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1421058) for details.
- The number of **DeclarativeNetRequest API** static and enabled rulesets will increase in Chrome 120, available now in Canary.
- The **File Handling API:** is will be available for ChromeOS extensions starting in ChromeOS 120, which lets extensions open files with specified MIME types and file extensions. To implement file handling add a [set of rules](https://github.com/WICG/file-handling/blob/main/explainer.md#example-manifest) to the manifest.json. This feature works the same as for progressive web apps. For more information, see [this article](/articles/file-handling/).
- Extensions will be able to use the web [Push API](https://developer.mozilla.org/docs/Web/API/Push_API) via [self.registration.pushManager.subscribe()](https://developer.mozilla.org/docs/Web/API/PushManager/subscribe) without showing a user-visible notification by setting userVisibleOnly to false. This will make push notifications a more seamless alternative to WebSockets in service workers (MV3) for asynchronous client-server communication. See [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1319986) and [WECG discussion](https://github.com/w3c/webextensions/issues/208) for details.

Stay tuned to the [What's new in extensions](/docs/extensions/whatsnew) page for these announcements as soon as they are made available in [Chrome Beta](https://chromestatus.com/roadmap).

## Documentation upgrades {: #new-docs }

We've also been improving and adding to our documentation. Please continue to ask questions on the [chromium-group](https://groups.google.com/a/chromium.org/g/chromium-extensions) and report documentation issues.

### Highlights {: #doc-highlights }

- We've revamped the [Samples landing page](/docs/extensions/samples/). You can now filter by API, permission, and type, making it easier to locate specific samples. This enhancement was a collaborative effort with our Summer of Code intern, Xuezhou Dai. Read about his experience in [this blog post](/blog/google-summer-of-code-and-chrome-extensions/).
- [Using your Google Analytics account with the Chrome Web Store](/docs/webstore/google-analytics/) describes how to view Google Analytics 4 for your Chrome Web Store listing, complementing the data provided by the Developer Dashboard. This guide provides steps to opt into Google Analytics, monitor ad performance, track conversions, and grant other accounts access to Google Analytics data.
- We published a new guide on [how cookies and web storage APIs](/docs/extensions/mv3/storage-and-cookies/) work in Chrome extensions. It includes all you need to know about [Privacy Sandbox](/docs/privacy-sandbox/) as an extension developer. 
- We write two articles on how to integrate testing in your extension projects: [Testing extensions](/docs/extensions/mv3/automated-testing/) covers general guidance and best practices across a number of popular frameworks and [Using Puppeteer](/docs/extensions/mv3/tut_puppeteer-testing/) demonstrates how to write end-to-end tests for your extension.

### More updates {: #doc-others }

- We've rewritten the [Declarative Net Request API](/docs/extensions/reference/declarativeNetRequest/) guidance in a way that paints a clearer picture of how to implement declarative rulesets.
- We added more guidance for [migrating remotely hosted code to Manifest V3](/docs/extensions/migrating/improve-security/). Plus, to minimize the risk of encountering issues during the release, we offer strategies [Publishing your Manifest V3 extension](/docs/extensions/migrating/publish-mv3/) in stages.
- Learn how to connect to a [WebSocket in your extension's service worker](/docs/extensions/mv3/tut_websockets/).

### Coming soon... {: #coming-soon-docs }

- User Scripts API reference and tutorial.
- Firebase tutorial and samples.
- ReadingList API reference.

## Redesigning the Chrome Web store 🌈 {: #cws-redesign }

Earlier this month, we announced an early preview of the revamped Chrome Web Store, as we hinted at Google I/O. Check it out for yourself! [https://chromewebstore.google.com/](https://chromewebstore.google.com/). A few noteworthy changes are:

- Increasing the list of categories from a list of eleven to a new list of [seventeen in three](/docs/webstore/best_practices/#category-revisions) subcategories.
- Improved autocomplete in the search.
- The screenshots are now being displayed at significantly higher quality. If you haven't already, you can upload 1280x800 screenshots.
- Replies to questions on the Support tab now show newlines.
- When replying to a user, your response will now include a “Developer” badge beside your name.
- You can provide users with a direct link to the reviews page by adding "/reviews" at the end of your store item URL For example: https://chromewebstore.google.com/detail/_EXTENSION_ID_/reviews

Thanks for everyone's input so far on the [chromium-google group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/9lc7Prf9vLk/m/3trCFBWYAQAJ). Feel free to join in the discussion! Also, if you can send feedback directly to the CWS team using the **Give feedback** menu item:

Additionally, you can [submit a self-nomination form](https://docs.google.com/forms/d/e/1FAIpQLSf4goBOeJDSVwp7xGCZw5vORovPOBhCv_kWM-VXWDhSA0NUQg/viewform) to be featured in the Editors’ Picks collection. Stay tuned for improvements coming soon to the developer dashboard as well!

## Did you know? {: #tips }

- There's a new video on Debugging Chrome extensions. It covers many topics you may already be familiar with, but it also shares a few neat tricks for using the Devtools in extensions.
    {% YouTube id='Ta-YTDhiBIQ' %}
- You can now add one privacy policy per extension. Previously, you could only add one privacy policy per developer account, but it was awkward if you had a few extensions under one developer account. This new interface is available in the **Privacy Tab** of your item in the developer dashboard.
- You can add a localized promotional video (YouTube URL) to your store listing.

## Reaching out 🙌 {: #connecting }

We've continued reaching out to the extension developer community through 1:1's, launching new programs, and attending summits. Here are a few highlights: 

- The extensions Google Developer Experts program was launched in August. We have over a dozen extension GDEs from around the world providing us with great feedback. It's a very exciting time for the program! Learn more about it here.
- FOCUS GROUPS: blurb needed from Patrick?
- We attended [TPAC](https://www.w3.org/2023/09/TPAC/) (W3C's annual conference) as part of the [Web Extensions Community Group](https://github.com/w3c/webextensions) and met with representatives from Firefox and Safari along with several members of the community. We made significant progress on several topics, including moving towards more consistent extension APIs, working on a specification, and building on top of Web Platform Tests to create a new testing suite. Read the full minutes in the [WECG repository](https://github.com/w3c/webextensions).
- Last week, the extension's team participated in the Ad-Filtering Dev Summit in Amsterdam. They met several of you at a coffee chat they hosted before the summit week and the open office hours on Friday.

Even if you were unable to attend any of these events, you can continue getting involved by asking questions on the [chromium-groups](https://groups.google.com/a/chromium.org/g/chromium-extensions), following browser partner discussions on the [WECG](https://github.com/w3c/webextensions/issues), and reporting any documentation issues.

Thanks again for being a part of the extension developer community!

