---
layout: 'layouts/doc-post.njk'

title: What's new in Chrome extensions
description: 'Recent changes to the Chrome extensions platform, documentation, and policy'
date: 2021-02-25
updated: 2022-02-17

# Note: disabling the linter for duplicate headings because this isn't hierarchical and it needs
# smaller font headings.

---
<!--lint disable no-duplicate-headings-->
<!--lint disable first-heading-level-->

Check this page often to learn about changes to the Chrome extensions platform, its documentation,
and related policy or other changes.

### Chrome 100: native messaging port keeps service worker alive {: #m100-native-msg-lifetime }

February 9, 2022

Connecting to a native messaging host using `chrome.runtime.connectNative()` in an extension's
service worker will keep the service worker alive as long as the port is open. 

### Chrome 100: omnibox.setDefaultSuggestion() supports promises and callbacks {: #m100-omnibox-setdefault }

February 8, 2022

The
[`omnibox.setDefaultSuggestion()`](/docs/extensions/reference/omnibox/#method-setDefaultSuggestion)
method now returns a promise or accepts a callback to allow developers to determine when the
suggestion has been properly set.

### Chrome 100: i18n.getMessage() support in extension service workers {: #m100-i18n-getmessage }

January 27, 2022

The [`chrome.i18n.getMessage()`](/docs/extensions/reference/i18n/#method-getMessage) API is now
supported in extension service worker contexts.

### Chrome 99: match_origin_as_fallback in Canary {: #canary-match-origin-as-fallback }

January 5, 2022

Content scripts can now specify the `match_origin_as_fallback` key to inject into frames that are
related to a matching frame, including frames with `about:`, `data:`, `blob:`, and `filesystem:`
URLs.  See the [content scripts](/docs/extensions/mv3/content_scripts/#injecting-in-related-frames)
documentation for details.

### Chrome 99: extension service worker support for file: schemes in Canary {: #canary-file-access }

December 30, 2021

Service worker-based Manifest V2 and Manifest V3 extensions can now use the Fetch API to request
`file:`-scheme URLs. Access to `file:`-scheme URLs still requires that the user enable 'Allow access
to File URLs' for the extension in the `chrome://extensions` page.

### Chrome 99: promise support for messaging APIs in Canary {: #canary-message-promise-support }

December 28, 2021

Promise support has been added to
[`tabs.sendMessage`](/docs/extensions/reference/tabs/#method-sendMessage),
[`runtime.sendMessage`](/docs/extensions/reference/runtime/#method-sendMessage), and
[`runtime.sendNativeMessage`](/docs/extensions/reference/runtime/#method-sendNativeMessage) for
extensions built for Manifest V3.

### Docs update: Chrome Web Store review documentation {: #cws-review-doc }

December 10, 2021

Added [a new reference page](/docs/webstore/review-process) that provides an overview of the Chrome
Web Store review process and explains how [developer program
policy](/docs/webstore/program_policies/) enforcement is handled.

### Docs update: review violation troubleshooting updates {: #2021-10-27-reivew-troubleshooting }

October 27, 2021

The [Troubleshooting Chrome Web Store violations](/docs/webstore/troubleshooting/) page has been
updated to provide developers with more detailed guidance for common reasons for rejection.

### Chrome 96: expanded promise support to 27 more APIs {: #m96-promise-support }

October 1, 2021

This release contains significantly more promise updates than any previous release. Updates include
both general and Chrome OS-specific extensions APIs. Expand the following sections for details.

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
- [`chrome.signedInDevices`](/docs/extensions/reference/signedInDevices)
- [`chrome.topSites`](/docs/extensions/reference/topSites)

Also, APIs that use the [`ChromeSetting`](/docs/extensions/reference/types/#type-ChromeSetting)
prototype now also support promises. The following APIs are affected by this change.

- [`chrome.privacy`](/docs/extensions/reference/privacy/)
- [`chrome.accessibilityFeatures`](/docs/extensions/reference/accessibilityFeatures/)
- [`chrome.proxy`](/docs/extensions/reference/proxy/)

{% endDetails %}

{% Details %}
{% DetailsSummary %}
Chrome OS APIs
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

September 24, 2021

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API now supports
[registering](/docs/extensions/reference/scripting/#method-registerContentScripts),
[updating](/docs/extensions/reference/scripting/#method-updateContentScripts),
[unregistering](/docs/extensions/reference/scripting/#method-unregisterContentScripts), and [getting
a list](/docs/extensions/reference/scripting/#method-getRegisteredContentScripts) of content scripts
at runtime. Previously, content scripts could only be statically declared in an extension's
manifest.json or programmatically injected at runtime with
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript).

### Docs update: Manifest V2 support timeline {: #manifest-v2-support-timeline }

September 23, 2021

The Manifest V2 to V3 transition timeline was [announced in this blog post](/blog/mv2-transition/) and
a more detailed [timeline page](/docs/extensions/mv3/mv2-sunset) was published.

### Chrome 96: declarativeNetRequestWithHostAccess permission

September 20, 2021

The new `declarativeNetRequestWithHostAccess` permission allows extensions to use the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API on sites the
extension has host permissions for. This also enables existing Manifest V2 extensions that use
`webRequest`, `webRequestBlocking`, and site-specific host permission to migrate to the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API without
requiring the user to approve new permissions.

### Chrome 95: inject scripts directly into pages {: #m95-page-script-injection }

September 2, 2021

The [`chrome.scripting`](/docs/extensions/reference/scripting) API's
[`executeScript()`](/docs/extensions/reference/scripting/#method-executeScript) method can now
inject scripts directly into a page's main world. Previously, extensions could only inject directly
into the extension's isolated world. For more information on isolated worlds, see the documentation
on [content scripts](/docs/extensions/mv3/content_scripts/#isolated_world).

### Chrome 95: promise support for Storage API {: #m95-storage-promise-support }

August 30, 2021

Methods on the Manifest V3 version of the [`chrome.storage`](/docs/extensions/reference/storage/)
API now return promises.

### Policy update: two step verification enforcement {: #two-step-verification-enforcement }

August 4, 2021

The [policy update blog post](/blog/policy-update-2sv/) published on June 29, 2021 has been updated
to correct the two step verification deployment timeline.

### Chrome 94: declarative net request static ruleset changes

July 28, 2021

The [`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) now supports
specifying up to 50 static rulesets
([MAX_NUMBER_OF_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_STATIC_RULESETS))
and enabling up to 10 rulesets
([MAX_NUMBER_OF_ENABLED_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS))
at a time.

### Chrome 93: cross origin isolation support

July 12, 2021

Both [Manifest V2](/docs/extensions/mv2/cross-origin-isolation/) and [Manifest
V3](/docs/extensions/mv3/cross-origin-isolation/) extensions can now opt into [cross origin
isolation](https://web.dev/cross-origin-isolation-guide/). This feature limits which cross-origin
resources can load an extension's pages and enables the use of low level web platform features like
[`SharedArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer). Opt in will be required starting in Chrome 95.

### Policy update: developer program policies updated {: #developer-program-policies-updated }

June 29, 2021

The Chrome Web Store [Developer Program Policies](/docs/webstore/program_policies) have been updated
with clarifications to the deceptive installation tactics, spam, and repetitive content policies.
This update also includes a new two step verification requirement to publish on the Chrome Web
Store. [Read the blog post](/blog/policy-update-2sv/) for more information.

### Blog post: extension actions in Manifest V3 {: #new-blog-post-extension-actions-in-manifest-v3 }

June 23, 2021

Chrome extensions had `chrome.browserAction` and `chrome.pageActions` APIs for years, but Manifest
V3 replaced both with a generic [`chrome.actions`](/docs/extensions/reference/action/) API. This
post explores the history of these APIs and what has changed in Manifest V3. [Read the
post](/blog/mv3-actions).

### Blog post: introducing chrome.scripting {: #new-blog-post-introducing-chromescripting }

June 8, 2021

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API is a new Manifest V3 API focused
on, well, scripting. In this post we dig into the motivations for this change and take a closer look
at it's new capabilities. [Read the post](/blog/crx-scripting-api).

### Chrome 92: module service worker support {: #es-modules-for-service-workers }

April 13, 2021

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

April 2, 2021

The new
[`chrome.action.getUserSettings()`](/docs/extensions/reference/action/#method-getUserSettings)
method allows extensions to determine if the user has pinned the extension to the main toolbar.

### Chrome 90: chrome.scripting.removeCSS() {: #chromescriptingremovecss-available }

February 10, 2021

The new [`chrome.scripting.removeCSS()`](/docs/extensions/reference/scripting/#method-removeCSS)
method allows extensions to remove CSS that was previously inserted via
[`chrome.scripting.insertCSS()`](/docs/extensions/reference/scripting/#method-insertCSS). It
replaces [`chrome.tabs.removeCSS()`](/docs/extensions/reference/tabs/#method-removeCSS).

### Chrome 90: returning promises from scripting.executeScript() {: #m96-execute-script }

February 24, 2021

[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript) now
supports returning promises. If the resulting value of the script execution is a promise, Chrome
will wait for the promise to settle and return its resulting value.

### Chrome 90: chrome.scripting.executeScript() results include frameId {: # chromescriptingexecutescript-results-include-frameid }

January 27, 2021

Results returned from
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript)
now include the [frameId](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids).
The `frameId` property indicates the frame that the result is from, letting extensions easily
associate results with the individual frames when injecting in multiple frames.

### Chrome 89: new API for managing tab groups {: #new-api-for-tab-groups-mv3-only }

January 14, 2021

The new [`chrome.tabGroups`](/docs/extensions/reference/tabGroups/) API and new capabilities in
[`chrome.tabs`](/docs/extensions/reference/tabs/) let extensions read and manipulate tab groups.
Requires Manifest V3.

### Chrome 89: customizable permissions for web accessible resources {: #customizable-permissions-for-mv3-web-accessible-resources }

December 23, 2020

[Web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/) definitions in
Manifest V3 have changed to let extensions restrict resource access based on the requester's origin
or extension ID.

### Blog post: Extension Manifest Converter {: #extension-manifest-converter}

April 28, 2021

The Chrome Extensions team has open sourced "Extension Manifest Converter", a Python tool that
automates some of the mechanical aspects of converting extensions to Manifest V3. See the
[announcement blog post](/blog/extension-manifest-converter/) and [get it from
GitHub](https://github.com/GoogleChromeLabs/extension-manifest-converter).

### Chrome 88: Manifest V3 general availability {: #manifest-v3-general-availability }

January 19, 2021

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview/) for a summary of new and changed features. Extensions
may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly
recommend that you use Manifest V3 for any new extensions, and begin migrating existing extensions
to Manifest V3 as soon as possible.
