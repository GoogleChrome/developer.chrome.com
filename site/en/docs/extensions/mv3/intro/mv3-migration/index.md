---
layout: 'layouts/doc-post.njk'

# The page title. This appears at the top of the doc and as the page name
# in Google Search.
title: Migrating to Manifest V3

# This appears below the title and is an optional teaser
subhead: 'Getting you headed in the right direction.'

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'A high-level guide to how you can migrate your MV2 extensions to MV3.'

# The publish date
date: 2020-11-09

# An optional updated date
# updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.

---

This guide provides developers with the information they need to begin
migrating an extension from Manifest V2 to Manifest V3 (MV3). Some extensions
will require very little change to make them MV3 compliant, while others will
need to be redesigned to some degree. Developers experienced with MV2, and who
are creating new MV3 extensions, may also find this helpful. For a quick
reference guide see the [migration
checklist](/docs/extensions/mv3/mv3-migration-checklist). 

Manifest V3 offers a number of improvements reflecting the aims of our
[platform vision](/docs/extensions/mv3/intro/platform-vision).


## Feature summary  {: #feature-summary }

There are a number of new features and functional changes for extensions using MV3:

* [Service workers](/docs/extensions/mv3/intro/mv3-overview#service-workers)
  replace background pages.
* [Network request modification](/docs/extensions/mv3/intro/mv3-overview#network-request-modification)
  is now handled with the new
  [declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest) API.
* [Remotely hosted code](/docs/extensions/mv3/intro/mv3-overview#remotely-hosted-code)
  is no longer allowed; an extension can only execute JavaScript that is
  included within its package.
* [Promise](/docs/extensions/mv3/intro/mv3-overview#promises)
  support has been added to many methods, though callbacks are still supported
  as an alternative.  (We will eventually support promises on all appropriate
  methods.)
* A number of other, relatively
  [minor feature changes](/docs/extensions/mv3/intro/mv3-overview#other-features)
  are also introduced in MV3.

For a fuller description of these changes, see the
[MV3 Overview](/docs/extensions/mv3/intro/mv3-overview).


## Updating the manifest.json file  {: #updating-manifest-dot-json }

To use the features of MV3, you need to first update your [manifest
file](/docs/extensions/mv3/manifest). Naturally, you'll change the manifest
version to "3", but there are a number of other things you need to change in
the manifest file: host permissions, content security policy, action
declarations, and web-accessible resources.


### Manifest version  {: #manifest-version }

Changing the value of the manifest_version element is the key to upgrading your
extension. This determines whether you're using the MV2 or MV3 feature set:

{% Columns %}
```json
// Manifest v2

"manifest_version": 2
```

```json
// Manifest v3

"manifest_version": 3
```
{% endColumns %}

### Host permissions  {: #host-permissions }

In MV3, you'll need to specify host permissions separately from other permissions:

{% Columns %}
```js
// Manifest v2
"permissions": [
  "tabs",
  "bookmarks",
  "http://www.blogger.com/",
],
"optional_permissions": [
  "*://*/*",
  "unlimitedStorage"
]
```

```js/7-10
// Manifest v3
"permissions": [
  "tabs",
  "bookmarks"
],
"optional_permissions": [
  "unlimitedStorage"
],
"host_permissions": [
  "http://www.blogger.com/",
  "*://*/*"
],
```
{% endColumns %}


{% Aside 'warning' %}
You do not have to declare content script match patterns in `host_permissions`
in order to inject content scripts.  However, they **are** treated as host
permissions requests by the Chrome Web Store review process.
{% endAside %}


### Content security policy  {: #fcontent-security-policy }

An extension's [content security policy](https://content-security-policy.com/)
(CSP) was specified in MV2 as a string; in MV3 it is an object with members
representing alternative CSP contexts:

{% Columns %}
```json
// Manifest v2

"content_security_policy": "..."
```

```json
// Manifest v3

"content_security_policy": {
  "extension_pages": "...",
  "sandbox": "..."
}
```
{% endColumns %}

**`extension_pages`**:  This policy covers pages in your extension, including html files and service workers. 


{% Aside %}
These page types are served from the `chrome-extension://` protocol. For
instance, a page in your extension is
`chrome-extension://<extension-id>/foo.html`.
{% endAside %}

**`sandbox`**: This policy covers any [sandboxed extension
pages](/docs/extensions/mv3/manifest/sandbox) that your extension uses.

In addition, MV3 disallows certain CSP modifications for `extension_pages` that
were permitted in MV2. The `script-src,` `object-src`, and `worker-src`
directives may only have the following values:

*   `self`
*   `none`
*   Any localhost source, (`http://localhost`,  `http://127.0.0.1`, or any port on those domains)

CSP modifications for `sandbox` have no such new restrictions. 


### Action API unification  {: #action-api-unification }

In MV2, there were two different APIs to implement actions: `browser_action`
and `page_action`. These APIs filled distinct roles when they were introduced,
but over time they've become redundant so in MV3 we are unifying them into as
single `action` API:


{% Columns %}
```js
// Manifest v2

// manifest.json
{
  "browser_action": { … },
  "page_action": { … }
}

// background.js
chrome.browserAction.onClicked.addListener(tab => { … });
chrome.pageAction.onClicked.addListener(tab => { … });
```

```js
// Manifest v3

// manifest.json
{
  "action": { … }
}


// background.js
chrome.action.onClicked.addListener(tab => { … });
```
{% endColumns %}

{% Aside %}
In order to aid with the migration process, the Action API can be used in MV2
beginning with Chrome 88.
{% endAside %}


### Web-accessible resources  {: #web-accessible-resources }

This change limits access to extension resources to specific sites/extensions.
Instead of providing a list of files, you now provide a list of objects, each
of which can map to a set of resources to a set of URLs and extension IDs:

{% Columns %}
```json
// Manifest v2

"web_accessible_resources": [
  <files>
]
```

```json
// Manifest v3

"web_accessible_resources": [{
  "resources": [<resources>],
  "matches": [<urls>],
  "extension_ids": [<keys>],
  optional "use_dynamic_url": boolean
}]
```
{% endColumns %}

{% Aside %}
The `matches`, `extension_ids`, and `use_dynamic_url` keys are not available
yet. Support for these properties will be coming in a future release.
{% endAside %}

Previously, the list of web accessible resources applied to all websites and
extensions, which created opportunities for fingerprinting or unintentional
resource access. The updated API lets extensions more tightly control what
other sites or extensions can access extension resources.


## Code execution  {: #code-execution }

MV3 imposes new restrictions that limit an extension's ability to execute
unreviewed JavaScript through a combination of platform changes and policy
limitations.

Many extensions are unaffected by this change. However, if your MV2 extension
executes remotely hosted scripts, injects code strings into pages, or evals
strings at runtime, you'll need to update your code execution strategies when
migrating to MV3.

{% Aside %}
With Manifest V3 the `executeScript()` method also moves to a different API.

* **MV2:**&emsp;[chrome.tabs.executeScript()](/docs/extensions/reference/tabs/#method-executeScript)
* **MV3:**&emsp;[chrome.scripting.executeScript()](/docs/extensions/reference/scripting/#method-executeScript).

If you use executeScript() anywhere in your code, you'll need to update that call to use the new
API. The `insertCSS()` and `removeCSS()` methods similarly move from chrome.tabs to
chrome.scripting.
{% endAside %}


### Remotely hosted code  {: #remotely-hosted-code }

_Remotely hosted code_ refers to any code that is not included in an
extension's package as a loadable resource. For example, both of the following
are considered remotely hosted code:

*   JavaScript files pulled from a remote server
*   a code string passed into eval at runtime

In MV3, all of your extension's logic must be bundled with the extension. You
can no longer load and execute a remotely hosted file. A number of alternative
approaches are available, depending on your use case and the reason for remote
hosting. Two such approaches are:

**Configuration-driven features and logic**—In this approach, your extension
loads a remote configuration (for example a JSON file) at runtime and caches
the configuration locally. The extension then uses this cached configuration to
decide which features to enable.

**Externalize logic with a remote service**—Consider migrating application
logic from the extension to a remote web service that your extension can call.
(Essentially a form of message passing.) This provides you the ability to keep
code private and change the code on demand while avoiding the extra overhead of
resubmitting to the Chrome Web Store.


### Executing arbitrary strings  {: #executing-arbitrary-strings }

The `code` property from executeScript's
[details](/docs/extensions/reference/tabs#method-executeScript) object is no longer
available in MV3.

Instead of executing a string, you should move your code into a static
JavaScript file included in the bundle, then execute it using the executeScript
method's `file` property:

{% Columns %}
```js
// Manifest v2

// background.js
chrome.tabs.executeScript({
  code: 'alert("test!")'
});
```

```js
// Manifest v3

// background.js
chrome.scripting.executeScript({
  file: 'content-script.js'
});

// content-script.js
alert("test!");
```
{% endColumns %}

Alternatively, if the logic being executed can be neatly wrapped in a function
call, you can use the new `function` property:

{% Columns %}
```js
// Manifest v2

// background.js
chrome.tabs.executeScript({
  code: 'alert("test!")'
});
```

```js
// Manifest v3

// background.js
function showAlert() {
  alert("test!");
}

chrome.scripting.executeScript({
  function: showAlert
});
```
{% endColumns %}

## Background service workers  {: #background-service-workers }

Background pages in MV2 are replaced by service workers in MV3: this is a
foundational change that affects most extensions.

[Service workers](https://developers.google.com/web/fundamentals/primers/service-workers)
are event based, and like event pages they do not persist between invocations.
This change generally requires some redesign, with a number of factors to
consider: see [Migrating from Background Pages to Service
Workers](/docs/extensions/mv3/migrating_to_service_workers) for additional
details.

{% Aside %}
In order to aid with the migration process, MV2 extensions can use background
service workers as of Chrome 87.
{% endAside %}


## Modifying network requests  {: #modifying-network-requests }

There is a new
[declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest) for
network request modification, which provides an alternative for much of the
[webRequest](/docs/extensions/reference/webRequest) AP's functionality.


### When can you use blocking webRequest?  {: #when-use-blocking-webrequest }

The blocking version of the [webRequest](/docs/extensions/reference/webRequest)
API still exists in MV3 but its use is restricted to force-installed extensions
only. See Chrome Enterprise policies:
[ExtensionSettings](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ExtensionSettings),
[ExtensionInstallForcelist](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ExtensionInstallForcelist).

All other extensions must now use
[declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest) for
network request modification. This moves the actual modification of the network
request into the Chrome browser: the extension no longer can read the actual
network request, and in most cases needs no host permissions. 

{% Aside %}
Request redirects and header modifications **do** require the user to grant host permissions.
{% endAside %}


### How do you use declarativeNetRequest?  {: #how-use-declarativenetrequest }

Instead of reading the request and programmatically altering it, your extension
specifies a number of rules, which map a set of conditions to corresponding
actions. See the
[declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest)
reference documentation for a more detailed description of rules.

This feature allows content blockers and other request-modifying extensions to
implement their use cases without requiring host permissions, and without
needing to read the actual requests.

{% Aside %}
In order to aid with the migration process, the declarativeNetRequest API is
available for use in MV2 extensions as of Chrome 84.
{% endAside %}


### Conditional permissions and declarativeNetRequest  {: #declarativenetrequest-conditional-perms }

Most use cases for declarativeNetRequest don't require any host permissions at
all. However, some do.

{% Aside %}
Request redirects and header modifications **do** require the user to grant host permissions.
{% endAside %}

When extensions require host permissions for these use cases, we recommend a
"tiered" permissions strategy. This means implementing the extension's core
functionality without using these permissions; putting the more advanced use
cases behind an optional permission.

This approach allows privacy-conscious users to withhold those permissions and
still use much of the extension's functionality. This means that developers
can implement many common use cases, such as content-blocking functionality,
without requiring any host permissions.


## Sunset for deprecated APIs  {: #sunset-deprecated-apis }

There are a number of APIs that have long been deprecated. Manifest V3 finally
removes support for these deprecated APIs. These include:

*   chrome.extension.sendRequest()
*   chrome.extension.onRequest
*   chrome.extension.onRequestExternal
*   chrome.extension.lastError
*   chrome.extension.getURL()
*   chrome.extension.getExtensionTabs()
*   chrome.tabs.Tab.selected
*   chrome.tabs.sendRequest()
*   chrome.tabs.getSelected()
*   chrome.tabs.getAllInWindow()
*   chrome.tabs.onSelectionChanged
*   chrome.tabs.onActiveChanged
*   chrome.tabs.onHighlightChanged

As well as the undocumented:

*   chrome.extension.sendMessage()
*   chrome.extension.connect()
*   chrome.extension.onConnect
*   chrome.extension.onMessage

If your extensions use any of these deprecated APIs, you'll need to make the
appropriate changes when you migrate to MV3.

