---
layout: 'layouts/doc-post.njk'

title: What's new in Chrome extensions

# This appears below the title and is an optional teaser
# subhead: 

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'Recent changes to the Chrome extensions platform, documentation, and policy'

# The publish date
date: 2021-02-25

# An optional updated date
# updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.

# Note: disabling the linter for duplicate headings because this isn't hierarchical and it needs
# smaller font headings.

---
<!--lint disable no-duplicate-headings-->
<!--lint disable first-heading-level-->

Check this page often to learn about changes to the Chrome extensions platform,
its documentation, and related policy or other changes.

### ES modules for service workers
#### Launched in Chrome 91

JavaScript supports modules in service workers. In your manifest, specify a module in your manifest:

```
"background": {
  "service_worker": "script.js",
  "type": "module"
}
```

This loads the worker script as an ES module, so you can import it in other worker
scripts.


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
It replaces [chrome.tabs.removeCSS()](/docs/extensions/reference/tabs/#method-removeCSS)`.

### chrome.scripting.executeScript() results include frameId
#### Launched in Chrome 90

Results returned from
[chrome.scripting.executeScript()](/docs/extensions/reference/scripting/#method-executeScript)
now include the [frameId](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids).
The frameId indicates the frame from which the result is from, allowing
extensions to easily associate results with the individual frames when injecting in multiple frames.

### New API for tab groups (MV3 only)
#### Launched in Chrome 89

There is now a [chrome.tabGroups](/docs/extensions/reference/tabGroups/) API to let extensions read
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

### Manifest V3 launched
#### Launched in Chrome 88

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview/) for a summary of new and changed features. Extensions
may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly
recommend that you use MV3 for any new extensions, and begin to migrate existing extensions to MV3
as soon as possible.


