---
layout: 'layouts/doc-post.njk'

title: What's new in Chrome extensions
description: 'Recent changes to the Chrome extensions platform, documentation, and policy'
date: 2021-02-25
updated: 2021-06-09

# Note: disabling the linter for duplicate headings because this isn't hierarchical and it needs
# smaller font headings.

---
<!--lint disable no-duplicate-headings-->
<!--lint disable first-heading-level-->

Check this page often to learn about changes to the Chrome extensions platform,
its documentation, and related policy or other changes.

### New blog post: "Extension actions in Manifest V3"
#### Published 2021.06.23

Chrome extensions had Browser and Page Actions APIs for years, but Manifest V3 replaced both with a
generic [Actions API](/docs/extensions/reference/action/). This post explores the history of these
APIs and what has changed in Manifest V3. [Read the post](/blog/mv3-actions).

### New blog post: "Introducing chrome.scripting"
#### Published 2021.06.08

The [Scripting API](/docs/extensions/reference/scripting/) is a new Manifest V3 API focused on,
well, scripting. In this post we dig into the motivations for this change and take a closer look at
some of the new capabilities it introduces. [Read the post](/blog/crx-scripting-api).

### ES modules for service workers
#### Launched in Chrome 91

Chrome now supports modules in service workers. In your manifest, specify a module in your manifest:

```js
"background": {
  "service_worker": "script.js",
  "type": "module"
}
```

This loads the worker script as an ES module, which lets you use the `import` keyword in the
worker's script to import other modules.


### chrome.action.getUserSettings() available
#### Launched in Chrome 91

The new
[chrome.action.getUserSettings()](/docs/extensions/reference/action/#method-getUserSettings)
method allows extensions to determine if the user has pinned the extension to the main toolbar.

### chrome.scripting.removeCSS() available
#### Launched in Chrome 90

The new [chrome.scripting.removeCSS()](/docs/extensions/reference/scripting/#method-removeCSS)
method allows extensions to remove CSS that was previously inserted
via [chrome.scripting.insertCSS()](/docs/extensions/reference/scripting/#method-insertCSS).
It replaces [chrome.tabs.removeCSS()](/docs/extensions/reference/tabs/#method-removeCSS).

### chrome.scripting.executeScript() results include frameId
#### Launched in Chrome 90

Results returned from
[chrome.scripting.executeScript()](/docs/extensions/reference/scripting/#method-executeScript)
now include the [frameId](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids).
The `frameId` property indicates the frame that the result is from, letting
extensions easily associate results with the individual frames when injecting in multiple frames.

### New API for tab groups (MV3 only)
#### Launched in Chrome 89

The new [chrome.tabGroups](/docs/extensions/reference/tabGroups/) API lets extensions read
and manipulate tab groups. Manifest V3 only.

### Customizable permissions for MV3 Web Accessible Resources
#### Launched in Chrome 89

[Web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/) definitions in
Manifest V3 have changed to let extensions restrict resource access based on the requester's origin
or extension ID.

### Extension Manifest Converter
#### Launched 2021-04-08

The Chrome Extensions team has open sourced "Extension Manifest Converter", a Python tool that
automates some of the mechanical aspects of converting extensions to Manifest V3. See the
[announcement blog post](/blog/extension-manifest-converter/) and [get it from
GitHub](https://github.com/GoogleChromeLabs/extension-manifest-converter).

### Manifest V3 general availability
#### Launched in Chrome 88

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview/) for a summary of new and changed features. Extensions
may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly
recommend that you use MV3 for any new extensions, and begin to migrate existing extensions to MV3
as soon as possible.
