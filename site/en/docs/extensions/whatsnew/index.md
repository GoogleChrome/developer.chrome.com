---
layout: 'layouts/doc-post.njk'

title: What's new in Chrome extensions
description: 'Recent changes to the Chrome extensions platform, documentation, and policy'
date: 2021-02-25
updated: 2021-11-24

# Note: disabling the linter for duplicate headings because this isn't hierarchical and it needs
# smaller font headings.

---
<!--lint disable no-duplicate-headings-->
<!--lint disable first-heading-level-->

Check this page often to learn about changes to the Chrome extensions platform, its documentation,
and related policy or other changes.

### Chrome 98: Returning promises from scripting.executeScript()

[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript)
now supports returning promises. When a script evaluates to a promise, Chrome will wait for the
promise to settle and return its resulting value.

### Chrome 96: Dynamic content scripts {: #m96-dynamic-content-scripts }

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API now supports
[registering](/docs/extensions/reference/scripting/#method-registerContentScripts),
[updating](/docs/extensions/reference/scripting/#method-updateContentScripts),
[unregistering](/docs/extensions/reference/scripting/#method-unregisterContentScripts), and [getting
a list](/docs/extensions/reference/scripting/#method-getRegisteredContentScripts) of content scripts
at runtime. Previously, content scripts could only be statically declared in an extension's
manifest.json or programmatically injected at runtime with
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript).

### Chrome 96: Expanded promise support to 27 more APIs {: #m96-promise-support }

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

### Chrome 96: `declarativeNetRequestWithHostAccess` permission

The new `declarativeNetRequestWithHostAccess` permission allows extensions to use the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API on sites the
extension has host permissions for. This also enables existing Manifest V2 extensions that use
`webRequest`, `webRequestBlocking`, and site-specific host permission to migrate to the
[`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) API without
requiring the user to approve new permissions.

### 2021.10.27: Review violation troubleshooting updates {: #2021-10-27-reivew-troubleshooting }

The [Troubleshooting Chrome Web Store violations](/docs/webstore/troubleshooting/) page has been
updated to provide developers with more detailed guidance for common reasons for rejection.

### Chrome 95: Inject scripts directly into pages {: #m95-page-script-injection }

The [`chrome.scripting`](/docs/extensions/reference/scripting) API's
[`executeScript()`](/docs/extensions/reference/scripting/#method-executeScript) method can now
inject scripts directly into a page's main world. Previously, extensions could only inject directly
into the extension's isolated world. For more information on isolated worlds, see the documentation
on [content scripts](/docs/extensions/mv3/content_scripts/#isolated_world).

### Chrome 95: Promise support for Storage API {: #m95-storage-promise-support }

Methods on the Manifest V3 version of the [`chrome.storage`](/docs/extensions/reference/storage/)
API now return promises.

### 2021.09.23: Manifest V2 support timeline {: #manifest-v2-support-timeline }

The Manifest V2->V3 transition timeline was [announced in this blog post](/blog/mv2-transition/) and
a more detailed [timeline page](/docs/extensions/mv3/mv2-sunset) was published.

### Chrome 94: Declarative net request static ruleset changes

The [`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest/) now supports
specifying up to 50 static rulesets
([MAX_NUMBER_OF_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_STATIC_RULESETS))
and enabling up to 10 rulesets
([MAX_NUMBER_OF_ENABLED_STATIC_RULESETS](/docs/extensions/reference/declarativeNetRequest/#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS))
at a time.

### Chrome 93: Cross origin isolation support

Both [Manifest V2](/docs/extensions/mv2/cross-origin-isolation/) and [Manifest
V3](/docs/extensions/mv3/cross-origin-isolation/) extensions can now opt into [cross origin
isolation](https://web.dev/cross-origin-isolation-guide/). This feature limits which cross-origin
resources can load an extension's pages and enables the use of low level web platform features like
[`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer). Opt in will be required starting in Chrome 95.

### 2021.08.04: Two step verification enforcement {: #two-step-verification-enforcement }

The [policy update blog post](/blog/policy-update-2sv/) published on 2021.06.29 has been updated to
correct the two step verification deployment timeline.

### 2021.06.29: Developer program policies updated {: #developer-program-policies-updated }

The Chrome Web Store [Developer Program Policies](/docs/webstore/program_policies) have been updated
with clarifications to the deceptive installation tactics, spam, and repetitive content policies.
This update also includes a new two step verification requirement to publish on the Chrome Web
Store. [Read the blog post](/blog/policy-update-2sv/) for more information.

### 2021.06.23: "Extension actions in Manifest V3" blog post {: #new-blog-post-extension-actions-in-manifest-v3 }

Chrome extensions had `chrome.browserAction` and `chrome.pageActions` APIs for years, but Manifest
V3 replaced both with a generic [`chrome.actions`](/docs/extensions/reference/action/) API. This
post explores the history of these APIs and what has changed in Manifest V3. [Read the
post](/blog/mv3-actions).

### 2021.06.08: "Introducing chrome.scripting" blog post {: #new-blog-post-introducing-chromescripting }

The [`chrome.scripting`](/docs/extensions/reference/scripting/) API is a new Manifest V3 API focused
on, well, scripting. In this post we dig into the motivations for this change and take a closer look
at it's new capabilities. [Read the post](/blog/crx-scripting-api).

### Chrome 91: Module service worker support {: #es-modules-for-service-workers }

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

### Chrome 91: `chrome.action.getUserSettings()` {: #chromeactiongetusersettings-available }

The new
[`chrome.action.getUserSettings()`](/docs/extensions/reference/action/#method-getUserSettings)
method allows extensions to determine if the user has pinned the extension to the main toolbar.

### Chrome 90: `chrome.scripting.removeCSS()` {: #chromescriptingremovecss-available }

The new [`chrome.scripting.removeCSS()`](/docs/extensions/reference/scripting/#method-removeCSS)
method allows extensions to remove CSS that was previously inserted via
[`chrome.scripting.insertCSS()`](/docs/extensions/reference/scripting/#method-insertCSS). It
replaces [`chrome.tabs.removeCSS()`](/docs/extensions/reference/tabs/#method-removeCSS).

### Chrome 90: `chrome.scripting.executeScript()` results include frameId {: # chromescriptingexecutescript-results-include-frameid }

Results returned from
[`chrome.scripting.executeScript()`](/docs/extensions/reference/scripting/#method-executeScript)
now include the [frameId](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids).
The `frameId` property indicates the frame that the result is from, letting extensions easily
associate results with the individual frames when injecting in multiple frames.

### Chrome 89: New API for managing tab groups {: #new-api-for-tab-groups-mv3-only }

The new [`chrome.tabGroups`](/docs/extensions/reference/tabGroups/) API and new capabilities in
[`chrome.tabs`](/docs/extensions/reference/tabs/) let extensions read and manipulate tab groups.
Requires Manifest V3.

### Chrome 89: Customizable permissions for web accessible resources {: #customizable-permissions-for-mv3-web-accessible-resources }

[Web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/) definitions in
Manifest V3 have changed to let extensions restrict resource access based on the requester's origin
or extension ID.

### 2021.04.08: Extension Manifest Converter {: #extension-manifest-converter}

The Chrome Extensions team has open sourced "Extension Manifest Converter", a Python tool that
automates some of the mechanical aspects of converting extensions to Manifest V3. See the
[announcement blog post](/blog/extension-manifest-converter/) and [get it from
GitHub](https://github.com/GoogleChromeLabs/extension-manifest-converter).

### Chrome 88: Manifest V3 general availability {: #manifest-v3-general-availability }

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview/) for a summary of new and changed features. Extensions
may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly
recommend that you use MV3 for any new extensions, and begin to migrate existing extensions to MV3
as soon as possible.
