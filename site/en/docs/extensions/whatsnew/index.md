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

JavaScript supports modules in service workers. Setting 'module' type by the constructor's type attribute, worker scripts are loaded as ES modules and the import statement is available on worker contexts. (https://www.chromestatus.com/guide/edit/4609574738853888)

### chrome.action.getUserSettings() available
#### Launched in Chrome 91

The new `chrome.action.getUserSettings()` API allows extensions to determine if the user has pinned the extension to the main toolbar.

### chrome.scripting.removeCSS() available
#### Launched in Chrome 90

The `chrome.scripting.removeCSS()` API allows extensions to remove CSS that was previously inserted
via `chrome.scripting.insertCSS()`.  It replaces `chrome.tabs.removeCSS()`.

### chrome.scripting.executeScript() results include frameId
#### Launched in Chrome 90

Results returned from `chrome.scripting.executeScript()` now include the frameId.  The frameId indicates the frame from which the result is from, allowing extensions to easily associate results with the individual frames when injecting in multiple frames.

### New API for tab groups
#### Launched in Chrome 89

Added the `chrome.tabGroups` API to let extensions read and manipulate tab groups. Manifest V3 only.

### Customizable permissions for MV3 Web Accessible Resources
#### Launched in Chrome 89

Manifest now supports permission definitions to restrict resources based on either the accessing site origin or extension ID.
See the [updated documentation][war-docs].

### Extension Manifest Converter
#### Launched 2021-04-08

The Chrome Extensions team has open sourced "Extension Manifest Converter", a Python tool that
automates some of the mechanical aspects of converting extensions to Manifest V3. See the
[announcement blog post][emc-announce].
https://github.com/GoogleChromeLabs/extension-manifest-converter

### Manifest V3 launched
#### Launched in Chrome 88

Manifest V3 is a major update to the extensions platform; see [Overview of Manifest
V3][mv3-overview] for a summary of new and changed features. Extensions may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly recommend that you use MV3 for any new extensions, and begin to migrate existing extensions to MV3 as soon as possible.

[emc-announce]: https://github.com/GoogleChromeLabs/extension-manifest-converter
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[war-docs]: /docs/extensions/mv3/manifest/web_accessible_resources/


{% if false %}

### Chrome 91 (stable on May 25, 2021)

Chrome 91 adds the following features to the extensions platform.

#### ES modules for service workers

JavaScript supports modules in service workers. Setting 'module' type by the constructor's type attribute, worker scripts are loaded as ES modules and the import statement is available on worker contexts. (https://www.chromestatus.com/guide/edit/4609574738853888)

#### chrome.action.getUserSettings() available

The new chrome.action.getUserSettings() API allows extensions to determine if the user has pinned the extension to the main toolbar.

### Chrome 90 (stable on April 13, 2021)

#### New chrome.scripting.removeCSS() method (MV3 only)

The `chrome.scripting.removeCSS()` method lets extensions remove CSS that was previously inserted via
chrome.scripting.insertCSS(). It replaces the MV2 method `chrome.tabs.removeCSS()`.

#### chrome.scripting.executeScript() results now include frameId

Results returned from `chrome.scripting.executeScript()` now include the frameId.  The frameId indicates the frame from which the result is from, allowing extensions to easily associate results with the individual frames when injecting in multiple frames.

### April 8, 2021: Extension Manifest Converter

The Chrome Extensions team has open sourced [Extension Manifest
Converter](https://github.com/GoogleChromeLabs/extension-manifest-converter), a Python tool that
helps to convert extensions to Manifest V3. 

### Chrome 89 (stable on March 9, 2021)

#### New chrome.tabGroups API

Added the chrome.tabGroups API to let extensions read and manipulate tab groups. Manifest V3 only.

#### Customizable permissions for MV3 Web Accessible Resources

Manifest now supports permission definitions to restrict resources based on either the accessing site origin or extension ID.https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/


### Chrome 88 (stable on January 19, 2021)

#### Manifest V3 launched

Manifest V3 launched in Chrome 88. This is a major update to the extensions platform; see Overview of Manifest V3 for a summary of new and changed features. Extensions may continue to use Manifest V2 for now, but this will be phased out in the near future. We strongly recommend that you use MV3 for any new extensions, and begin to migrate existing extensions to MV3 as soon as possible.

### 2021.01.19: Manifest V3 launched

With the release of Chrome 88, the extensions platform now supports extensions
built with Manifest v3, and you can upload them to the Chrome Web Store.
Manifest v3 is a new extension platform that makes Chrome extensions more
secure, performant, and privacy respecting, by default.

Check out [Welcome to Manifest V3](/docs/extensions/mv3/intro/) for complete
details about Manifest V3 and how to build or migrate extensions for it.

{% endif %}
