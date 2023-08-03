---
layout: 'layouts/doc-post.njk'
title: What's new in Chrome extensions
description: 'Recent changes to the Chrome extensions platform, documentation, and policy'
date: 2021-02-25
updated: 2023-07-28
tags:
  - extensions-news

# Note: disabling the linter for duplicate headings because this isn't hierarchical and it needs
# smaller font headings.
---
<!--lint disable no-duplicate-headings-->
<!--lint disable first-heading-level-->

Check this page often to learn about changes to Chrome extensions, extensions documentation, or related policy or other changes. You'll find other notices posted on the [Extensions Google Group](https://groups.google.com/a/chromium.org/g/chromium-extensions). The [Extensions News](/tags/extensions-news/) tag lists articles about some of the topics listed here. (It even has [an RSS feed](/feeds/extensions-news.xml).) The [Chrome schedule](https://chromiumdash.appspot.com/schedule) lists stable and beta release dates.

### Chrome 115: DevTools steps over content scripts by default {: #step-over-content-script }

<p class="color-secondary-text type--caption">Posted on <time>July 28, 2023</time></p>

Injected content scripts are now in the DevTools ignore list by default. This doesn't affect breakpoints, but it does mean that content scripts will be stepped over during debugging and exceptions from these scripts will be ignored. When a content script is open in the **Sources** tab, a banner alerts you if this is on and provides an option to remove your content script from the ignore list. To turn this behavior off, open DevTools, go to **Settings** then **Ignore list**. To learn more, see [What's new in DevTools](/blog/new-in-devtools-115/#content-script).

### Chrome 116 beta: More than we can fit here {: #chrome-116 }

<p class="color-secondary-text type--caption">Posted on <time>July 21, 2023</time></p>

Chrome 116 is a big release for extensions. You can now open side panels programmatically. A new method lets you learn if there's an active offscreen document. Service workers got serveral improvements. There's enough improvements in 116 that we've written [a blog post to cover them](/blog/chrome-116-beta-whats-new-for-extensions/#runtime-get-contexts). Chrome 116 is in beta as of July 19.

### Blog post: What's happening in Chrome Extensions {: #whats-happening-7-23 }

<p class="color-secondary-text type--caption">Posted on <time>July 17, 2023</time></p>

We've just published an overview of this year's [changes and improvements to extensions](/blog/extension-news-july-2023/). The post discusses the year's big new features, including the Side Panel API, service worker enhancements, and offscreen documents. You'll also get a peek at what we're working on for this quarter. The article lists much more, with links to all.

### New guidance and sample: Learn how to use Google Analytics 4 in your Chrome extension {: #guide-ga }

<p class="color-secondary-text type--caption">Posted on <time>June 23, 2023</time></p>

We published new Google Analytics and geolocation guidance and samples:

* An [updated version of our Google Analytics guidance](/docs/extensions/mv3/tut_analytics/) explaining how you can use [Google Analytics 4](https://support.google.com/analytics/answer/10089681) in your Chrome extension. We've also added a working [Google Analytics 4 sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.google-analytics) to our Github sample repository. Check out [`google-analytics.js`](https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/tutorial.google-analytics/scripts/google-analytics.js) for the relevant code related to Google Analytics.
* A new [Geolocation guide](/docs/extensions/mv3/geolocation/) and [three samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples) demonstrating how to access geolocation in service workers, content scripts, popups and side panels.

### Chrome 115: Specify multiple reasons in chrome.offscreen.createDocument() {: #m115-offscreen-multiple-reasons }

<p class="color-secondary-text type--caption">Posted on <time>June 7, 2023</time></p>

You can now specify multiple [`reason`](/docs/extensions/reference/offscreen/#type-Reason) enums when calling [`chrome.offscreen.createDocument()`](/docs/extensions/reference/offscreen/#method-createDocument). Use this when an offscreen document will be used for multiple different purposes. The browser uses the supplied reasons to determine the lifetime of the offscreen document. 

### New tool: Extension Update Testing Tool {: #update-testing-tool }

<p class="color-secondary-text type--caption">Posted on <time>June 5, 2023</time></p>

We've just released the [Extension Update Testing Tool](https://github.com/GoogleChromeLabs/extension-update-testing-tool), a local extension update server that can be used for testing updates to Chrome Extensions during local development, including permission grants. The tool shows the user's update flow, including keeping an extension disabled until a user grants any newly requested permissions. This tool is particularly useful for simulating the permission changes requested when updating an extension from Manifest V2 to Manifest V3.

### Chrome 114: New Side Panel API {: #side-panel-launch }

<p class="color-secondary-text type--caption">Posted on <time>May 30, 2023</time></p>

Introducing the new Side Panel API, a companion surface that allows users to access tools alongside the content they are browsing. To learn more, visit the [Side Panel API reference](/docs/extensions/reference/sidePanel/). Additionally, we've added many side panel samples to our [GitHub sample repository](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples). We also share more about side panels in the new blog post [Designing a Superior User Experience with the New Side Panel API](/blog/extension-side-panel-launch). Our [quality guidelines policy](/docs/webstore/program-policies/quality-guidelines/) and [best practices](/docs/webstore/best_practices/#design-a-high-quality-extension) have also been reviewed to provide further guidance on creating high-quality side panel extensions. 

Your feedback is important in crafting this API; please share your thoughts and feature requests in the [chromium-groups](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/cJmdMLmpbjg/m/zYGc54AaAQAJ). Stay tuned for new updates as we continue to enhance the Side Panel API.

### New Samples: WASM in extensions {: #samples-wasm }

<p class="color-secondary-text type--caption">Posted on <time>May 17, 2023</time></p>

There are two new samples available that demonstrate how to use WASM in an extension: 

- [Using WASM in Manifest V3](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.wasm-helloworld-print-nomodule) shows the general method for including a WASM module. 
- [Using WASM as a module in Manifest V3](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/cookbook.wasm-helloworld-print) shows how to use it in a module.

Special thanks to GitHub contributor [@daidr](https://github.com/daidr) for these samples.

### Updated Manifest V3 migration guidance {: #doc-mv3-migration }

<p class="color-secondary-text type--caption">Posted on <time>May 10, 2023</time></p>

We've updated the [Known Issues](/docs/extensions/migrating/known-issues/) section of our [Manifest V3 migration guidance](/docs/extensions/migrating/) with an updated list of extension platform gaps that we intend to close before announcing a new Manifest V2 deprecation timeline.

### Recording audio and video with Manifest V3 {: #screen-audio-capture }

<p class="color-secondary-text type--caption">Posted on <time>May 10, 2023</time></p>

We've just published a new article called [Audio recording and screen capture](/docs/extensions/mv3/screen_capture/), which covers recording audio or video from a tab, window, or screen in Manifest V3. This article describes multiple approaches to recording involving the [`chrome.tabCapture`](/docs/extensions/reference/tabCapture/) API and the [`getDisplayMedia()`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia) function.

### Chrome 114: Increased storage.local quota {: #m114-storage-local-quota }

<p class="color-secondary-text type--caption">Posted on <time>May 9, 2023</time></p>

We have increased the quota for the [`storage.local`](/docs/extensions/reference/storage/#property-local) property to approximately 10 MB. This was [agreed to in the Web Extensions Community Group](https://github.com/w3c/webextensions/issues/351#issuecomment-1514420881). This brings `storage.local` in line with [`storage.session`](/docs/extensions/reference/storage/#property-session) which was changed in Chrome 112.

### New extension service worker tutorial and help {: #doc-service-worker }

<p class="color-secondary-text type--caption">Posted on <time>May 3, 2023</time></p>

Service Workers are an integral part of Chrome Extensions. We just [published a tutorial](/docs/extensions/mv3/getstarted/tut-quick-reference/) explaining the basics of registering, debugging, and interacting with Service Workers. We've also added a new [Service worker guide](/docs/extensions/mv3/service_workers/) explaining important concepts in more detail. We'll be expanding this section in the coming months.

### More troubleshooting tips for Web Store violations

<p class="color-secondary-text type--caption">Posted on <time>April 24, 2023</time></p>

To help with Chrome Web Store publishing, we added new guidance in two areas. Guidance for [minimum functionality](/docs/webstore/troubleshooting/#minimum-functionality) centers around providing users with benefits and enriching their browsing experience. Guidance for [affiliate ads](/docs/webstore/troubleshooting/#affiliate-ads) is about making users are aware of extensions using affiliate links or codes for monetization, and giving them some amount of control by requiring user action before inclusion.

### New instructions for the Extension Manifest Converter

<p class="color-secondary-text type--caption">Posted on <time>April 14, 2023</time></p>

We've rewritten the README for the [Extension Manifest Converter](https://github.com/GoogleChromeLabs/extension-manifest-converter) to make it easier to see what you need to do after running the tool. The converter helps helps migrate extensions built on Manifest V2 to Manifest V3. The new README describes what the tool does using words that closely match those in the [migration guide's checklist](/docs/extensions/migrating/checklist/). The converter doesn't do everything, but it does eliminate many tasks that don't require a human judgement call. 

### Chrome 113: New reasons for offscreen documents

<p class="color-secondary-text type--caption">Posted on <time>April 7, 2023</time></p>

We have added two new [reason types](/docs/extensions/reference/offscreen/#type-Reason) to the Offscreen Documents API. Use `LOCAL_STORAGE` to access the web platform's [localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) API. Use `WORKER` when creating web workers. 

### Google Analytics 4 now in the Developer Dashboard

<p class="color-secondary-text type--caption">Posted on <time>March 30, 2023</time></p>

The Chrome Web Store Developer Dashboard now supports Google Analytics 4 (GA4). We've simplified setting up Google Analytics and made access management for group publishers more straightforward. If you previously used Google Universal Analytics to track your store listing activity, you will need to take action by July 1, 2023 to ensure that you continue receiving data about your store listing. For more information, see the [post on the Chromium Extensions Google Group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/JpzTRHBXDok/m/0F93f7FyBQAJ).

### The File Handling API comes to ChromeOS

<p class="color-secondary-text type--caption">Posted on <time>March 24, 2023</time></p>

The File Handler API is available for experimentation on ChromeOS in Canary for versions 112 and 113. It lets extensions on ChromeOS open files with specified MIME types and file extensions. To implement file handling add a set of rules to the `manifest.json`. This feature works the same as for Progressive web apps. For more information, see [the article](/articles/file-handling/) elsewhere on this site.

To enable file handling:

* Starting in 112, launch Chrome using the `--enable-features=ExtensionWebFileHandlers` flag, starting in 112 
* Starting in 113, paste `os://flags/#extension-web-file-handlers` into the Chrome omnibox and select 'Enabled' from the dropdown menu. 

We hope to launch this feature in Chrome 115, in late June. Watch this space for updates.

### New Samples: dynamic declarations and programmatic injection {: #dynamic-dec-prog-inject }

<p class="color-secondary-text type--caption">Posted on <time>March 14, 2023</time></p>

We've built a [new sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/scripting) for the [`chrome.scripting`](/docs/extensions/reference/scripting/) API. It demonstrates dynamic declarations, where a content script is registered at runtime, and programmatic injection, where a script is executed in a tab that is already open.

### New Samples: Declarative Net Request use cases {: #dNR-use-cases }

<p class="color-secondary-text type--caption">Posted on <time>March 10, 2023</time></p>

[Three new samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/declarativeNetRequest) are available demonstrating the [Declarative Net Request API](/docs/extensions/reference/declarativeNetRequest/). Each demonstrates implementation of a single use case. The first shows how to block cookies. The remaining two demonstrate blocking and redirecting URLs.

### Chrome 112: Increased storage.session quota {: #m112-storage-session-quota }

<p class="color-secondary-text type--caption">Posted on <time>March 3, 2023</time></p>

From Chrome 112, the quota for the [`storage.session`](/docs/extensions/reference/storage/#property-session) property has been increased to approximately 10 MB. This was agreed to in the Web Extensions Community Group: [https://github.com/w3c/webextensions/issues/350](https://github.com/w3c/webextensions/issues/350)

### Chrome 109: Offscreen documents {: #m109-offscreen-docs}

<p class="color-secondary-text type--caption">Posted on <time>January 25, 2023</time></p>

Offscreen documents are now available in Manifest V3 extensions. These help with the transition from background pages to extension service workers by providing support for DOM-related features and APIs. For more information, [read the blog post](/blog/Offscreen-Documents-in-Manifest-v3/).

### Chrome 109: Is an extension enabled {: #m110-action }

<p class="color-secondary-text type--caption">Posted on <time>January 12, 2023</time></p>

The [`chrome.action.isEnabled()`](/docs/extensions/reference/action/#method-isEnabled) method programmatically checks whether an extension has been enabled for a specific tab. This saves you from maintaining the enabled state of your tabs. This new method takes a tab ID and a reference to a callback and returns a boolean. It has one limitation: tabs created using [`chrome.declarativeContent`](/docs/extensions/reference/declarativeContent/) always return false.

(The `chrome.action` namespace recently got new methods for controlling the appearance of extension badges. For more information, see [Setting badge colors](#m110-badge-color).)

### Chrome 110: Change in service worker idle timeout {: #m110-sw-idle }

<p class="color-secondary-text type--caption">Posted on <time>January 5, 2023</time></p>

Previously, an extension service worker would frequently shut down at the five minute mark. We've changed this behavior to more closely resemble service worker lifetime's on the web. An extension service worker will be shut down after either thirty seconds of inactivity or if a single activity takes longer than 5 minutes to process. For more information, see [Longer extension service worker lifetimes](/blog/longer-esw-lifetimes).

### Post: Pausing Manifest V2 phase-out

<p class="color-secondary-text type--caption">Posted on <time>December 9, 2022</time></p>

The Manifest V2 deprecation timelines are under review and the experiments scheduled for early 2023 are being postponed. For more information, [read the update](https://groups.google.com/u/1/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E) in the chromium-extensions Google Group.

### Chrome 108: Setting badge colors {: #m110-badge-color }

<p class="color-secondary-text type--caption">Posted on <time>November 29, 2022</time></p>

The `chrome.action` namespace has two new methods to give you more control over the appearance extension badges. The [`setBadgeTextColor()`](/docs/extensions/reference/action/#method-setBadgeTextColor) and [`getBadgeTextColor()`](/docs/extensions/reference/action/#method-getBadgeTextColor) methods allow an extension to change and query its toolbar icon's badge text color. When used with [`setBadgeBackgroundColor`](/docs/extensions/reference/action/#method-setBadgeBackgroundColor) and [`getBadgeBackgroundColor`](/docs/extensions/reference/action/#method-getBadgeBackgroundColor) these new methods let you enforce design and brand consistency.

### Blog post: More details on the transition to Manifest V3 {: #blog-mv3-transition-details }

<p class="color-secondary-text type--caption">Posted on <time>September 28, 2022</time></p>

We have [clarified the Manifest V2 deprecation timeline](/blog/more-mv2-transition/). The [Manifest V2 support timeline](/docs/extensions/mv3/mv2-sunset/) has also been updated to reflect this information.

### Docs update: Known issues when migrating to Manifest V3 {: #known-issues }

<p class="color-secondary-text type--caption">Posted on <time>September 28, 2022</time></p>

We've put together a list of [major features currently in development and open bugs](/docs/extensions/mv3/known-issues/). Our goal with this page is to help developers better understand the current state of the platform and what features they can target as they prepare for the future.

### Chrome Web Store: "large promo tile" image upload removed {: #cws-large-promo-tile }

<p class="color-secondary-text type--caption">Posted on <time>August 17, 2022</time></p>

Chrome Web Store has removed the "large promo tile" upload UI from the item Store Listing tab in the developer dashboard. This change does not affect the end user experience as these images were not used in the consumer UI. See this chromium-extensions post for additional details.

### Chrome 106: Allow pages on file:// urls to access web accessible resources {: #m106-file-pages }

<p class="color-secondary-text type--caption">Posted on <time>August 15, 2022</time></p>

Opaque origins such as sandboxed iframes and dynamic import should also be able to access web accessible resources, according to [crbug.com/1219825#c11](https://crbug.com/1219825#c11).

### Chrome 106: Fixed bug allowing incorrect final arguments on some async API functions {: #m106-async-arg-fix }

<p class="color-secondary-text type--caption">Posted on <time>August 8, 2022</time></p>

Previously, Manifest V3 calling async APIs could provide an invalid final argument and Chrome would not error. With this fix Chrome will now correctly error and report that there was no matching signature. Developers are encouraged to check their extensions on Canary for any errors in case they accidentally using incorrect signature for an API call that will be broken by this bug fix.

### Blog post: Chrome Web Store analytics revamp {: #cws-analytics-revamp }

<p class="color-secondary-text type--caption">Posted on <time>July 28, 2022</time></p>

Chrome Web Store has a revamped item analytics experience for the Chrome Web Store Developer Dashboard. The new dashboard is easier to understand at a glance and consolidates the most useful information up front. [Read the blog post](/blog/cws-analytics-revamp/) for more information.

### Chrome 105: promises for the Identity API {: #m105-identity-promise }

<p class="color-secondary-text type--caption">Posted on <time>July 15, 2022</time></p>

Functions on the [Identity API](/docs/extensions/reference/identity/#method-getAuthToken) now
support promise based calls. This comes with a slight change to the surface for
[`identity.getAuthToken()`](/docs/extensions/reference/identity/#method-getAuthToken), where the
asynchronous return set to a promise based call will have "token" and "grantedScopes" as parameters
on a single object (as opposed to the callback version receiving them as separate arguments to the
callback).

### Chrome 104: New favicons API for Manifest V3 {: #m104-favicon-api }

<p class="color-secondary-text type--caption">Posted on <time>June 08, 2022</time></p>

 Manifest V3 extensions can now access favicons using a new URL pattern: `chrome-extension://<id>/_favicon/`, where <id> is the ID of your extension. This replaces the Manifest V2 platform's `chrome://favicons` API. See the [Favicon API](/docs/extensions/mv3/favicon/) docs for more information.

### Docs update: Developer trader/non-trader disclosure {: #cws-trader-disclosure-doc }

<p class="color-secondary-text type--caption">Posted on <time>May 26, 2022</time></p>

Added the [trader/non-trader developer identification](/docs/webstore/trader-disclosure) that
informs developers to accurately self-declare their trader/non-trader status.

### Chrome 103: Wasm in Manifest V3 requires wasm-unsafe-eval {: #m103-wasm-csp }

<p class="color-secondary-text type--caption">Posted on <time>May 12, 2022</time></p>

Chrome no longer grants extensions `script-src: wasm-unsafe-eval` by default. Extensions that use
WebAssembly must now explicitly add this directive and value to `extension_pages` in their
`content_security_policy` declarations.

### Chrome 103: Changing MV3 shortcuts take effect immediately {: #m103-keyboard-shortcut }

<p class="color-secondary-text type--caption">Posted on <time>April 28, 2022</time></p>

When changing a Manifest V3 extension's keyboard shortcut on `chrome://extensions/shortcuts`,
updates are now applied immediately. Previously the extension would have to be reloaded before the
change would take effect.

### Chrome 102: Dynamic content scripts in main world {: #m102-registercontentscripts-main-world }

<p class="color-secondary-text type--caption">Posted on <time>April 14, 2022</time></p>

Dynamically registered content scripts can now specify the
[world](/docs/extensions/mv3/content_scripts/#isolated_world) that assets will be injected into. See
[`scripting.registerContentScripts()`](/docs/extensions/reference/scripting/#method-registerContentScripts)
for details.

### Chrome 102: New manifest field "optional_host_permissions" {: #m102-optional-host-permissions }

<p class="color-secondary-text type--caption">Posted on <time>April 4, 2022</time></p>

Manifest V3 extensions can now specify the `optional_host_permissions` key in manifest.json. This
allows Manifest V3 extensions to declare optional match patterns for hosts just as Manifest V2
extensions could using the `optional_permissions` key.

### Chrome 102: injectImmediately property in scripting.executeScript() {: #m102-injectimmediately }

<p class="color-secondary-text type--caption">Posted on <time>April 4, 2022</time></p>

`chrome.scripting.executeScript()` now accepts an optional `injectImmediately` property on it's
`injection` argument. If present and set to true, the script will inject into the target as soon as
possible, rather than waiting for `document_idle`. Note that this is not a guarantee the script will
inject before the page is loaded since the page continues to load while the API call is being made.

### Chrome 102: Omnibox API support in Manifest V3 {: #m102-omnibox }

<p class="color-secondary-text type--caption">Posted on <time>March 31, 2022</time></p>

The [Omnibox API](/docs/extensions/reference/omnibox) can now be used in service worker-based
extensions. Previously, some of this API's methods would throw on invocation due to internal
dependencies on DOM capabilities.

### Chrome 102: wasm-unsafe-eval allowed in Manifest V3 CSP {: #m102-wasm }

<p class="color-secondary-text type--caption">Posted on <time>March 22, 2022</time></p>

Manifest V3 extensions can now include `wasm-unsafe-eval` in their `content_security_policy`
declarations. This change allows Manifest V3 extensions to use WebAssembly.

### Docs update: Chrome Web Store item discovery {: #cws-discovery-doc }

<p class="color-secondary-text type--caption">Posted on <time>March 21, 2022</time></p>

[Discovery on Chrome Web Store](/docs/webstore/discovery/) gives an overview of how users find items
on the Chrome Web Store and how our editors select items to feature.

### Chrome 101: Improved declarativeNetRequest domain conditions {: #m101-dnr-conditions }

<p class="color-secondary-text type--caption">Posted on <time>March 9, 2022</time></p>

[declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest/) rule conditions have been
updated to allow extensions to better target requests based on the request's "request" and
"initiator" domains. The relevant condition properties are `initiatorDomains`,
`excludedInitiatorDomains`, `requestDomains`, and `excludedRequestDomains`. See also this
[chromium-extensions
thread](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/4971ZS9cI7E).

### Chrome 100: Resolved issue with scripting.executeScript() on newly created tabs {: #m100-executescript-bugfix }

Fixed a longstanding issue where calling `scripting.executeScript()` on a newly created tab or
window could fail.

### Chrome 100: native messaging port keeps service worker alive {: #m100-native-msg-lifetime }

<p class="color-secondary-text type--caption">Posted on <time>February 9, 2022</time></p>

{% Aside 'warning' %}

This change did not fully address the underlying issue. We will share another update when we are
confident that native messaging ports are behaving as intended.

{% endAside %}

Connecting to a native messaging host using `chrome.runtime.connectNative()` in an extension's
service worker should keep the service worker alive as long as the port is open.

### Chrome 100: omnibox.setDefaultSuggestion() supports promises and callbacks {: #m100-omnibox-setdefault }

<p class="color-secondary-text type--caption">Posted on <time>February 8, 2022</time></p>

The
[`omnibox.setDefaultSuggestion()`](/docs/extensions/reference/omnibox/#method-setDefaultSuggestion)
method now returns a promise or accepts a callback to allow developers to determine when the
suggestion has been properly set.

### Chrome 100: i18n.getMessage() support in extension service workers {: #m100-i18n-getmessage }

<p class="color-secondary-text type--caption">Posted on <time>January 27, 2022</time></p>

The [`chrome.i18n.getMessage()`](/docs/extensions/reference/i18n/#method-getMessage) API is now
supported in extension service worker contexts.

### Chrome 99: match_origin_as_fallback in Canary {: #canary-match-origin-as-fallback }

<p class="color-secondary-text type--caption">Posted on <time>January 5, 2022</time></p>

Content scripts can now specify the `match_origin_as_fallback` key to inject into frames that are
related to a matching frame, including frames with `about:`, `data:`, `blob:`, and `filesystem:`
URLs. See the [content scripts](/docs/extensions/mv3/content_scripts/#injecting-in-related-frames)
documentation for details.

### Chrome 99: extension service worker support for file: schemes in Canary {: #canary-file-access }

<p class="color-secondary-text type--caption">Posted on <time>December 30, 2021</time></p>

Service worker-based Manifest V2 and Manifest V3 extensions can now use the Fetch API to request
`file:`-scheme URLs. Access to `file:`-scheme URLs still requires that the user enable 'Allow access
to File URLs' for the extension in the `chrome://extensions` page.

### Chrome 99: promise support for messaging APIs in Canary {: #canary-message-promise-support }

<p class="color-secondary-text type--caption">Posted on <time>December 28, 2021</time></p>

Promise support has been added to
[`tabs.sendMessage`](/docs/extensions/reference/tabs/#method-sendMessage),
[`runtime.sendMessage`](/docs/extensions/reference/runtime/#method-sendMessage), and
[`runtime.sendNativeMessage`](/docs/extensions/reference/runtime/#method-sendNativeMessage) for
extensions built for Manifest V3.

### Docs update: Chrome Web Store review documentation {: #cws-review-doc }

<p class="color-secondary-text type--caption">Posted on <time>December 10, 2021</time></p>

Added [a new reference page](/docs/webstore/review-process) that provides an overview of the Chrome
Web Store review process and explains how [developer program
policy](/docs/webstore/program-policies/) enforcement is handled.

### Chrome 98: scripting.executeScript() and scripting.insertCSS() accept multiple files {: #m98-execute-multiple-files }

<p class="color-secondary-text type--caption">Posted on <time>November 9, 2021</time></p>

The Scripting API's [`executeScript()`](/docs/extensions/reference/scripting/#method-executeScript)
and [`insertCSS()`](/docs/extensions/reference/scripting/#method-insertCSS) methods now accept
multiple files. Previously these methods required an array with a single file entry.

### Docs update: review violation troubleshooting updates {: #2021-10-27-reivew-troubleshooting }

<p class="color-secondary-text type--caption">Posted on <time>October 27, 2021</time></p>

The [Troubleshooting Chrome Web Store violations](/docs/webstore/troubleshooting/) page has been
updated to provide developers with more detailed guidance for common reasons for rejection.

### Chrome 96: expanded promise support to 27 more APIs {: #m96-promise-support }

<p class="color-secondary-text type--caption">Posted on <time>October 1, 2021</time></p>

This release contains significantly more promise updates than any previous release. Updates include
both general and ChromeOS-specific extensions APIs. Expand the following sections for details.

{% Details %}
{% DetailsSummary %}
Extensions APIs
{% endDetailsSummary %}

A number of APIs now support promises in Manifest V3.

- [`chrome.browsingData`](/docs/extensions/reference/browsingData)
- [`chrome.commands`](/docs/extensions/reference/commands)
- [`chrome.contentSettings`](/docs/extensions/reference/contentSettings/)
- [`chrome.debugger`](/docs/extensions/reference/debugger)
- [`chrome.downloads`](/docs/extensions/reference/downloads)
- [`chrome.enterprise.hardwarePlatform`](/docs/extensions/reference/enterprise_hardwarePlatform)
- [`chrome.fontSettings`](/docs/extensions/reference/fontSettings)
- [`chrome.history`](/docs/extensions/reference/history)
- [`chrome.instanceID`](/docs/extensions/reference/instanceID)
- [`chrome.permissions`](/docs/extensions/reference/permissions)
- [`chrome.processes`](/docs/extensions/reference/processes)
- [`chrome.search`](/docs/extensions/reference/search)
- [`chrome.sessions`](/docs/extensions/reference/sessions)
- [`chrome.topSites`](/docs/extensions/reference/topSites)

Also, APIs that use the [`ChromeSetting`](/docs/extensions/reference/types/#type-ChromeSetting)
prototype now also support promises. The following APIs are affected by this change.

- [`chrome.privacy`](/docs/extensions/reference/privacy/)
- [`chrome.accessibilityFeatures`](/docs/extensions/reference/accessibilityFeatures/)
- [`chrome.proxy`](/docs/extensions/reference/proxy/)

{% endDetails %}

{% Details %}
{% DetailsSummary %}
ChromeOS APIs
{% endDetailsSummary %}

- [`chrome.certificateProvider`](/docs/extensions/reference/certificateProvider)
- [`chrome.documentScan`](/docs/extensions/reference/documentScan)
- [`chrome.enterprise.deviceAttributes`](/docs/extensions/reference/enterprise_deviceAttributes)
- [`chrome.enterprise.networkingAttributes`](/docs/extensions/reference/enterprise_networkingAttributes)
- [`chrome.fileBrowserHandler`](/docs/extensions/reference/fileBrowserHandler)
- [`chrome.fileSystemProvider`](/docs/extensions/reference/fileSystemProvider)
- [`chrome.loginState`](/docs/extensions/reference/loginState)
- [`chrome.printingMetrics`](/docs/extensions/reference/printingMetrics)
- [`chrome.wallpaper`](/docs/extensions/reference/wallpaper)

{% endDetails %}

### Chrome 96: dynamic content scripts {: #m96-dynamic-content-scripts }

<p class="color-secondary-text type--caption">Posted on <time>September 24, 2021</time></p>

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API now supports
[registering](/docs/extensions/reference/scripting/#method-registerContentScripts),
[updating](/docs/extensions/reference/scripting/#method-updateContentScripts),
[unregistering](/docs/extensions/reference/scripting/#method-unregisterContentScripts), and [getting
a list](/docs/extensions/reference/scripting/#method-getRegisteredContentScripts) of content scripts
at runtime. Previously, content scripts could only be statically declared in an extension's
manifest.json or programmatically injected at runtime with
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript).

### Docs update: Manifest V2 support timeline {: #manifest-v2-support-timeline }

<p class="color-secondary-text type--caption">Posted on <time>September 23, 2021</time></p>

The Manifest V2 to V3 transition timeline was [announced in this blog post](/blog/mv2-transition/) and
a more detailed [timeline page](/docs/extensions/mv3/mv2-sunset) was published.

### Chrome 96: declarativeNetRequestWithHostAccess permission

<p class="color-secondary-text type--caption">Posted on <time>September 20, 2021</time></p>

The new `declarativeNetRequestWithHostAccess` permission allows extensions to use the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API on sites the
extension has host permissions for. This also enables existing Manifest V2 extensions that use
`webRequest`, `webRequestBlocking`, and site-specific host permission to migrate to the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API without
requiring the user to approve new permissions.

### Chrome 95: inject scripts directly into pages {: #m95-page-script-injection }

<p class="color-secondary-text type--caption">Posted on <time>September 2, 2021</time></p>

The [`chrome.scripting`](/docs/extensions/reference/scripting) API's
[`executeScript()`](/docs/extensions/reference/scripting/#method-executeScript) method can now
inject scripts directly into a page's main world. Previously, extensions could only inject directly
into the extension's isolated world. For more information on isolated worlds, see the documentation
on [content scripts](/docs/extensions/mv3/content_scripts/#isolated_world).

### Chrome 95: promise support for Storage API {: #m95-storage-promise-support }

<p class="color-secondary-text type--caption">Posted on <time>August 30, 2021</time></p>

Methods on the Manifest V3 version of the [`chrome.storage`](/docs/extensions/reference/storage/)
API now return promises.

### Policy update: two step verification enforcement {: #two-step-verification-enforcement }

<p class="color-secondary-text type--caption">Posted on <time>August 4, 2021</time></p>

The [policy update blog post](/blog/policy-update-2sv/) published on June 29, 2021 has been updated
to correct the two step verification deployment timeline.

### Chrome 94: declarative net request static ruleset changes

<p class="color-secondary-text type--caption">Posted on <time>July 28, 2021</time></p>

The [`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) now supports
specifying up to 50 static rulesets
([MAX_NUMBER_OF_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_STATIC_RULESETS))
and enabling up to 10 rulesets
([MAX_NUMBER_OF_ENABLED_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS))
at a time.

### Chrome 93: cross origin isolation support

<p class="color-secondary-text type--caption">Posted on <time>July 12, 2021</time></p>

Both [Manifest V2](/docs/extensions/mv2/cross-origin-isolation/) and [Manifest
V3](/docs/extensions/mv3/cross-origin-isolation/) extensions can now opt into [cross origin
isolation](https://web.dev/cross-origin-isolation-guide/). This feature limits which cross-origin
resources can load an extension's pages and enables the use of low level web platform features like
[`SharedArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer). Opt in will be required starting in Chrome 95.

### Policy update: developer program policies updated {: #developer-program-policies-updated }

<p class="color-secondary-text type--caption">Posted on <time>June 29, 2021</time></p>

The Chrome Web Store [Developer Program Policies](/docs/webstore/program-policies) have been updated
with clarifications to the deceptive installation tactics, spam, and repetitive content policies.
This update also includes a new two step verification requirement to publish on the Chrome Web
Store. [Read the blog post](/blog/policy-update-2sv/) for more information.

### Blog post: extension actions in Manifest V3 {: #new-blog-post-extension-actions-in-manifest-v3 }

<p class="color-secondary-text type--caption">Posted on <time>June 23, 2021</time></p>

Chrome extensions had `chrome.browserAction` and `chrome.pageActions` APIs for years, but Manifest
V3 replaced both with a generic [`chrome.actions`](/docs/extensions/reference/action/) API. This
post explores the history of these APIs and what has changed in Manifest V3. [Read the
post](/blog/mv3-actions).

### Blog post: introducing chrome.scripting {: #new-blog-post-introducing-chromescripting }

<p class="color-secondary-text type--caption">Posted on <time>June 8, 2021</time></p>

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API is a new Manifest V3 API focused
on, well, scripting. In this post we dig into the motivations for this change and take a closer look
at it's new capabilities. [Read the post](/blog/crx-scripting-api).

### Chrome 92: module service worker support {: #es-modules-for-service-workers }

<p class="color-secondary-text type--caption">Posted on <time>April 13, 2021</time></p>

Chrome now supports JavaScript modules in service workers. To specify a module a module in your
manifest:

```js
"background": {
  "service_worker": "script.js",
  "type": "module"
}
```

This loads the worker script as an ES module, which lets you use the `import` keyword in the
worker's script to import other modules.

### Chrome 91: chrome.action.getUserSettings() {: #chromeactiongetusersettings-available }

<p class="color-secondary-text type--caption">Posted on <time>April 2, 2021</time></p>

The new
[`chrome.action.getUserSettings()`](/docs/extensions/reference/action/#method-getUserSettings)
method allows extensions to determine if the user has pinned the extension to the main toolbar.

### Chrome 90: chrome.scripting.removeCSS() {: #chromescriptingremovecss-available }

<p class="color-secondary-text type--caption">Posted on <time>February 10, 2021</time></p>

The new [`chrome.scripting.removeCSS()`](/docs/extensions/reference/scripting/#method-removeCSS)
method allows extensions to remove CSS that was previously inserted via
[`chrome.scripting.insertCSS()`](/docs/extensions/reference/scripting/#method-insertCSS). It
replaces [`chrome.tabs.removeCSS()`](/docs/extensions/reference/tabs/#method-removeCSS).

### Chrome 90: returning promises from scripting.executeScript() {: #m96-execute-script }

<p class="color-secondary-text type--caption">Posted on <time>February 24, 2021</time></p>

[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript) now
supports returning promises. If the resulting value of the script execution is a promise, Chrome
will wait for the promise to settle and return its resulting value.

### Chrome 90: chrome.scripting.executeScript() results include frameId {: # chromescriptingexecutescript-results-include-frameid }

<p class="color-secondary-text type--caption">Posted on <time>January 27, 2021</time></p>

Results returned from
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript)
now include the [frameId](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids).
The `frameId` property indicates the frame that the result is from, letting extensions easily
associate results with the individual frames when injecting in multiple frames.

### Chrome 89: new API for managing tab groups {: #new-api-for-tab-groups-mv3-only }

<p class="color-secondary-text type--caption">Posted on <time>January 14, 2021</time></p>

The new [`chrome.tabGroups`](/docs/extensions/reference/tabGroups/) API and new capabilities in
[`chrome.tabs`](/docs/extensions/reference/tabs/) let extensions read and manipulate tab groups.
Requires Manifest V3.

### Chrome 89: customizable permissions for web accessible resources {: #customizable-permissions-for-mv3-web-accessible-resources }

<p class="color-secondary-text type--caption">Posted on <time>December 23, 2020</time></p>

[Web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/) definitions in
Manifest V3 have changed to let extensions restrict resource access based on the requester's origin
or extension ID.

### Blog post: Extension Manifest Converter {: #extension-manifest-converter}

<p class="color-secondary-text type--caption">Posted on <time>April 28, 2021</time></p>

The Chrome Extensions team has open sourced "Extension Manifest Converter", a Python tool that
automates some of the mechanical aspects of converting extensions to Manifest V3. See the
[announcement blog post](/blog/extension-manifest-converter/) and [get it from
GitHub](https://github.com/GoogleChromeLabs/extension-manifest-converter).

### Chrome 88: Manifest V3 general availability {: #manifest-v3-general-availability }

<p class="color-secondary-text type--caption">Posted on <time>January 19, 2021</time></p>

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview/) for a summary of new and changed features. Extensions
may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly
recommend that you use Manifest V3 for any new extensions, and begin migrating existing extensions
to Manifest V3 as soon as possible.
