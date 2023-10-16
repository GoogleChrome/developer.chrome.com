---
layout: 'layouts/blog-post.njk'
title: What's happening in Chrome Extensions?
description: >
 An overview of the recent changes in Chrome Extensions, plus exciting upcoming extension features developers can look forward to.
date: 2023-10-13
authors:
  - amysteam
tags:
  - extensions-news
hero: 'image/BhuKGJaIeLNPW9ehns59NfwqKxF2/zHJnWcckEKIRCdXOGYNo.png'
alt: >
  What's happening in Chrome extensions?
---

Back in July, we launched [a new blog series](/blog/extension-news-july-2023/) to keep you up-to-date on extension developments. Thanks to your valuable feedback and our ongoing collaboration with fellow browser vendors in the WebExtensions Community Group, we continue to enhance extension APIs and work towards greater consistency across browsers.

Welcome to the October edition! In this post, we'll look at some of the changes the Chrome extension team has made in the past few months, as well as some new features that'll come out later this year. Let's get started!

{% Aside %}

If you’d like a TL;DR, feel free to jump to the [Coming soon...](#coming-soon-apis) section for new extension features you can start looking forward to 🙂.

{% endAside %}

## New extension APIs and features {: #new-apis }

In this section, we share some significant API launches, briefly review other API improvements, and share upcoming releases. All launches are currently available in the latest Beta release. See the [chromium release schedule](https://chromiumdash.appspot.com/schedule) for details.


### Highlights {: #apis-highlights }

#### Resolved known issues {: #closing-gap }

The extension team has been actively working to resolve Manifest V3 stability issues. [Chrome 116 launched many improvements](/blog/chrome-116-beta-whats-new-for-extensions/) that helped us make significant progress toward closing the feature gap between Manifest V2 and V3. In Chrome 120, we will have finished addressing all our prioritized platform gaps and closed all critical bugs that are documented on the [known issues page](/docs/extensions/migrating/known-issues/). All features are currently available in Chrome 120 Canary, except fileHandler support for ChromeOS Lacros, which will land later this month. For more details, check out the updated [known issues page](/docs/extensions/migrating/known-issues/).

#### Improved Service Worker stability {: #stable-sw }

Service worker-related stability issues have been resolved. In Chrome 116, we added strong keep-alives to extension APIs that [display a user prompt](/blog/chrome-116-beta-whats-new-for-extensions/#sw-keepalive) and improved support for WebSockets (see the [Using WebSockets in extensions](/docs/extensions/mv3/tut_websockets/) tutorial). From Chrome 118 onward, a service worker will stay alive during an [active Debugger API session](/docs/extensions/reference/debugger/).

Check out our updated [Service Worker guidance](/docs/extensions/mv3/service_workers/service-worker-lifecycle/#timeouts) for more details. If your users still encounter service worker-related stability issues in Chrome versions after 119, [please let us know](/docs/extensions/support-feedback/).  

#### Increased security {: #security-increase }

Previously, navigating to some chrome:// URLs using [`tabs.update()`](/docs/extensions/reference/tabs/#method-update), [`tabs.create`](/docs/extensions/reference/tabs/#method-create), and [`windows.create()`](/docs/extensions/reference/windows/#method-create) emitted an error or would crash Chrome. Also, [`tabs.update()`](/docs/extensions/reference/tabs/#method-update) couldn't open a Javascript URL. In Chrome 117, we expanded the number of supported chrome:// URLs, and the Javascript URL blocking now also applies to all extension API methods.

In Chrome 117, users will receive proactive notifications on the Chrome Extensions page if an extension they've installed is no longer available on the Chrome Web Store. This can happen if the developer unpublishes the extension, it's taken down for policy violations, or it's identified as malware. For a deep dive, see [Bringing Safety Check to the chrome://extensions page](/en/blog/extension-safety-hub/).

In Chrome 118, extensions will not be allowed to navigate to file:// URLs using the `chrome.tabs` and `chrome.windows` APIs unless the “Allow access to file URLs” option is enabled on the extension’s details page. See the [WECG discussion](https://github.com/w3c/webextensions/issues/426).

### More API launches {: #apis-others }

- **Runtime API:** Starting in Chrome 116, you can use [`runtime.getContexts()`](/docs/extensions/reference/runtime/#method-getContexts) to retrieve information about active contexts. For example, you can check if there's an [active offscreen document](/docs/extensions/reference/offscreen/#example-maintaining-the-lifecycle-of-an-offscreen-document).
- **Side Panel API** In [Chrome 116](https://chromiumdash.appspot.com/commit/8e7430446eaa0b80964b0ab1fd816ac6f33fd4cd) you can use [`sidepanel.open()`](/docs/extensions/reference/sidepanel/#user-interaction), to open the extension side panel programmatically in response to a user gesture, such as a context menu click.
- **TabCapture API** Added the ability to call `getMediaStreamId()` from the extension service worker and obtain a [`MediaStream`](https://developer.mozilla.org/docs/Web/API/MediaStream) object from a stream ID in an offscreen document in Chrome 116. See [Audio recording and screen capture](/docs/extensions/mv3/screen_capture/) for examples.
- **DeclarativeNetRequest API:** The default value for the [`isUrlFilterCaseSensitive`](/docs/extensions/reference/declarativeNetRequest/#property-RuleCondition-isUrlFilterCaseSensitive) property was changed to `false` in [Chrome 118](https://chromiumdash.appspot.com/commit/d90e6a56d0e77ce5d278a5b070098c5d8f7081fd).

### Coming soon... {: #coming-soon-apis }

Upcoming Chrome versions will release features that will complete the remaining items on the [known issues page](/docs/extensions/migrating/known-issues/#closing-the-platform-gap). Additionally, we plan to add the following features:

- The **UserScripts API** will allow user script managers to coordinate how and when to inject a collection of user scripts into web pages. See the [WECG proposal](https://github.com/w3c/webextensions/blob/main/proposals/user-scripts-api.md) for details.
- The **ReadingList API** will allow developers to create, read, update, and delete metadata located in the Reading List panel of the side panel. Watch [What's new in Chrome extensions](/docs/extensions/whatsnew/) for the announcement.
- Following [feedback](https://github.com/w3c/webextensions/issues/318) in the Web Extensions Community Group, we are significantly increasing the limit on enabled static rulesets from 10 to 50. Additionally, we are increasing the total number of allowed static rulesets from 50 to 100. This is currently available in Canary.
- The **File Handling API:** is will be available for ChromeOS extensions starting in ChromeOS 120, which lets extensions open files with specified MIME types and file extensions in a similar manner to web platform file handling.
- Extensions will be able to use the web [Push API](https://developer.mozilla.org/docs/Web/API/Push_API) via [self.registration.pushManager.subscribe()](https://developer.mozilla.org/docs/Web/API/PushManager/subscribe) without showing a user-visible notification by setting `userVisibleOnly` to `false`. This will make push notifications a more seamless alternative to WebSockets in service workers (MV3) for asynchronous client-server communication. See [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1319986) and [WECG discussion](https://github.com/w3c/webextensions/issues/208) for details.

Stay tuned to the [What's new in extensions](/docs/extensions/whatsnew) page for announcements as soon as these features are available in [Chrome Beta](https://chromestatus.com/roadmap).

## Documentation upgrades {: #new-docs }

We've also been improving and adding to our documentation. Please continue to ask questions on the [chromium-group](https://groups.google.com/a/chromium.org/g/chromium-extensions) and [report documentation issues](/docs/extensions/support-feedback/file-a-bug/).

### Highlights {: #doc-highlights }

- We've revamped the [Samples landing page](/docs/extensions/samples/). You can now filter by API, permission, and type, making it easier to locate specific samples. This enhancement was a collaborative effort with our Summer of Code intern, Xuezhou Dai. Read about his experience in [this blog post](/blog/google-summer-of-code-and-chrome-extensions/).
- [Using your Google Analytics account with the Chrome Web Store](/docs/webstore/google-analytics/) describes how to view Google Analytics 4 for your Chrome Web Store listing, complementing the data provided by the Developer Dashboard. This guide provides steps to opt into Google Analytics, monitor ad performance, track conversions, and grant other accounts access to Google Analytics data.
- We published a new guide on [how cookies and web storage APIs](/docs/extensions/mv3/storage-and-cookies/) work in Chrome extensions. It includes all you need to know about [Privacy Sandbox](/docs/privacy-sandbox/) as an extension developer. 
- We launched new articles on how to integrate testing in your extension projects: [Unit testing Chrome extensions](/docs/extensions/mv3/unit-testing/) and [End-to-end testing for extensions](/docs/extensions/mv3/end-to-end-testing/) covers general guidance and best practices across a number of popular frameworks. For a practical tutorial, see [Testing Chrome Extensions with Puppeteer](/docs/extensions/mv3/tut_puppeteer-testing/).

### More updates {: #doc-others }

- We've rewritten the [Declarative Net Request API](/docs/extensions/reference/declarativeNetRequest/) guidance in a way that paints a clearer picture of how to implement declarative rulesets.
- We added more guidance for [migrating remotely hosted code to Manifest V3](/docs/extensions/migrating/improve-security/). Plus, to minimize the risk of encountering issues during the release, we offer strategies for [Publishing your Manifest V3 extension](/docs/extensions/migrating/publish-mv3/) in stages.
- Learn how to connect to a [WebSocket in your extension's service worker](/docs/extensions/mv3/tut_websockets/).
- We expanded our [Get Help guide](/docs/extensions/support-feedback/) to include more detailed instructions on how to file a bug, keep track of existing issues, request new features, and more. 

### Coming soon... {: #coming-soon-docs }

- User Scripts API reference and tutorial.
- Firebase tutorial and samples.
- ReadingList API reference.

## Redesigning the Chrome Web store 🌈 {: #cws-redesign }

<figure>
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/Hl9EIC00L5beXdmY1t07.png", alt="Screenshot of the Chrome Web Store home page.", width="800", height="536", class='screenshot' %}.
  <figcaption>
    The new Chrome Web Store home page
  </figcaption>
</figure>

Earlier this month, we announced an early preview of the revamped Chrome Web Store, as we hinted at Google I/O. Check it out for yourself! [https://chromewebstore.google.com/](https://chromewebstore.google.com/). A few noteworthy changes are:

- Increased the list of categories from a list of eleven to a new list of [seventeen in three](/docs/webstore/best_practices/#category-revisions) category groups.
- Improved autocomplete in the search.
- Screenshots are now being displayed at significantly higher quality. If you haven't already, you can upload 1280x800 screenshots.
- Replies to questions on the Support tab now show newlines.
- When replying to user reviews and support questions, your response will now include a “Developer” badge beside your name.
- You can provide users with a direct link to the reviews page by adding "/reviews" at the end of your store item URL For example: `https://chromewebstore.google.com/detail/_EXTENSION_ID_/reviews`.

Thanks for everyone's input so far on the [chromium-google group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/9lc7Prf9vLk/m/3trCFBWYAQAJ). Feel free to join in the discussion or send your feedback directly to the CWS team using the **Give feedback** menu item:

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/ERwUa61uGIFQ65VUgsVn.png", alt="Give feedback in the Chrome Web Store page", width="400", height="323", class='screenshot' %}
  <figcaption>
    Giving feedback on the Chrome Web Store page
  </figcaption>
</figure>

Additionally, you can [submit a self-nomination form](https://docs.google.com/forms/d/e/1FAIpQLSf4goBOeJDSVwp7xGCZw5vORovPOBhCv_kWM-VXWDhSA0NUQg/viewform) to be featured in the Editors’ Picks collection. Stay tuned for improvements coming soon to the developer dashboard as well!

## 💡 Did you know? {: #tips }

- There's a new video on Debugging Chrome extensions. It covers many topics you may already be familiar with, but it also shares a few neat tricks for using DevTools in extensions.
    {% YouTube id='Ta-YTDhiBIQ' %}
- You are now required to provide a privacy policy for each extension. Previously, you could only add one privacy policy per developer account, but it was awkward if you had a few extensions under one developer account. This new interface is available in the **Privacy Tab** of your item in the developer dashboard. This means that account-level privacy policies are no longer supported.
<figure>
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/BB2ziYwins4YpyJ7aETj.png", alt="Screenshot of the privacy policy box", width="474", height="178" %}
  <figcaption>
    Screenshot of the privacy policy box
  </figcaption>
</figure>

## Reaching out 🙌 {: #connecting }

We've continued reaching out to the extension developer community through 1:1's, launching new programs, and attending summits. Here are a few highlights: 

- The extensions [Google Developer Experts program](https://developers.google.com/community/experts) was launched in August. We have over a dozen new Chrome extension-focused GDEs from around the world providing us with great feedback. It's a very exciting time for the program! 
- We attended [TPAC](https://www.w3.org/2023/09/TPAC/) (W3C's annual conference) as part of the [Web Extensions Community Group](https://github.com/w3c/webextensions) and met with representatives from Firefox and Safari along with several members of the community. We made significant progress on several topics, including moving towards more consistent extension APIs, working on a specification, and building on top of Web Platform Tests to create a new testing suite. Read the full minutes in the [WECG repository](https://github.com/w3c/webextensions).
- Last week, the extension team participated in the [Ad-Filtering Dev Summit](https://adfilteringdevsummit.com/) in Amsterdam. They met several of you at a coffee chat they hosted before the summit week and the open office hours on Friday.
    <figure>
      {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Dc2jNjuo21hkCq4cZBiI.jpg", alt="Extension team in Ad-filtering Dev Summit", width="600", height="533" %}
      <figcaption>
        Extension team in Ad-filtering Dev Summit
      </figcaption>
    </figure>

Even if you were unable to attend any of these events, you can continue getting involved by asking questions on the [chromium-extensions](https://groups.google.com/a/chromium.org/g/chromium-extensions) Google group, following browser partner discussions on the [WECG](https://github.com/w3c/webextensions/issues), and reporting any documentation issues.

Thanks again for being a part of the extension developer community!