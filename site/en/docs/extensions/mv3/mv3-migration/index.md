---
layout: 'layouts/doc-post.njk'
title: Migrating to Manifest V3
seoTitle: "Chrome Extensions: Migrating to Manifest V3"
subhead: 'Getting you headed in the right direction.'
description: 'A high-level guide to how you can migrate your Manifest V2 extensions to Manifest V3.'
date: 2020-11-09
updated: 2022-06-13
---

This guide provides you with the information needed to migrate an extension from
Manifest V2 to Manifest V3. Some extensions require very little change to make them Manifest V3
compliant, while others need to be redesigned to some degree. For a quick reference guide see
the [migration checklist][mv3-checklist].

{% Aside %}

Follow [What's new in Chrome Extensions][doc-whats-new] to read about new Manifest V3 features as
they become available.

{% endAside %}

## Feature summary  {: #feature-summary }

There are a number of new features and functional changes for extensions using Manifest V3:

* [Service workers][mv3-sw] replace background pages.
* [Network request modification][mv3-network] is now handled with the new
  [declarativeNetRequest][mv3-declarative] API.
* [Remotely hosted code][mv3-remote] is no longer allowed; an extension can only execute JavaScript
  that is included within its package.
* [Promise][mv3-promise] support has been added to many methods, though callbacks are still
  supported as an alternative.  (We will eventually support promises on all appropriate methods.)
* A number of other, relatively [minor feature changes][mv3-other] are also introduced in Manifest
  V3.

For a fuller description of these changes, see the [Manifest V3 Overview][mv3-overview].

## Updating the manifest.json file  {: #updating-manifest-dot-json }

To use the features of Manifest V3, you need to update your [manifest file][doc-manifest].
Naturally, you'll need to change the manifest version, but there are other changes that require
manifest updates. Each of these is explained further on in this document.

- [service worker][section-man-sw]
- [host permissions][section-host]
- [content security policy][section-csp]
- [action declarations][section-action]
- [web-accessible resources][section-war]

### Manifest version  {: #manifest-version }

Changing the value of the `"manifest_version"` element is the key to upgrading your extension. This
determines whether you're using the Manifest V2 or Manifest V3 feature set:

{% Columns %}
```json
// Manifest V2
{
  ...
  "manifest_version": 2
  ...
}
```

```json
// Manifest V3
{
  ...
  "manifest_version": 3
  ...
}
```

{% endColumns %}

### Service worker  {: #man-sw }

Manifest V3, replaces background pages with a single [*extension service workers*][mdn-service-workers]. Register the service worker under the `"background"` field, which uses the `"service_worker"` key, which specifies a single JavaScript file.

Even though Manifest V3, does not support multiple background scripts, you can optionally declare
the service worker as an [ES Module][webdev-esm] by specifying `"type": "module"`, which allows you
to import further code.

{% Columns %}

```json
// Manifest V2
{
  ...
  "background": {
    "scripts": [
      "backgroundContextMenus.js",
      "backgroundOauth.js"
    ],
    "persistent": false
  },
  ...
}
```

```json
// Manifest V3
{
  ...
  "background": {
    "service_worker": "background.js",
    "type": "module" //optional
  }
  ...
}
```

{% endColumns %}

Multiple background scripts are not supported in Manifest V3 and only 
one `service_worker` can be specified. You can optionally declare the service 
worker as an [ES Module][webdev-esm] by specifying `"type": "module"`, which 
allows you to import further code.

### Host permissions  {: #host-permissions }

In Manifest V3, you'll need to specify host permissions and optional host permissions separately
from other permissions.

{% Columns %}
```js
// Manifest V2
{
  ...
  "permissions": [
    "tabs",
    "bookmarks",
    "http://www.blogger.com/",
  ],
  "optional_permissions": [
    "unlimitedStorage",
    "*://*/*",
  ]
  ...
}
```

```js/10-15
// Manifest V3
{
  ...
  "permissions": [
    "tabs",
    "bookmarks"
  ],
  "optional_permissions": [
    "unlimitedStorage"
  ],
  "host_permissions": [
    "http://www.blogger.com/",
  ],
  "optional_host_permissions": [
    "*://*/*",
  ]
  ...
}
```
{% endColumns %}

{% Aside 'caution' %}

Moving the match patterns to `"host_permissions"` does not affect [content scripts][doc-static-cs].
Content script match patterns remain under `"content_scripts.matches"`.

{% endAside %}

### Content security policy  {: #content-security-policy }

An extension's [content security policy][csp] (CSP) was specified in Manifest V2 as a string; in
Manifest V3 it is an object with members representing alternative CSP contexts:

{% Columns %}
```json
// Manifest V2
{
  ...
  "content_security_policy": "..."
  ...
}
```

```json
// Manifest V3
{
  ...
  "content_security_policy": {
    "extension_pages": "...",
    "sandbox": "..."
  }
  ...
}
```
{% endColumns %}

**`extension_pages`**:  This policy covers pages in your extension, including html files and service
workers.

{% Aside %}

These page types are served from the `chrome-extension://` protocol. For instance, a page in your
extension is `chrome-extension://EXTENSION_ID/foo.html`.

{% endAside %}

**`sandbox`**: This policy covers any [sandboxed extension pages][manifest-sandbox] that your
extension uses.

In addition, Manifest V3 disallows certain CSP modifications for `extension_pages` that were
permitted in Manifest V2. The `script-src,` `object-src`, and `worker-src` directives may only have
the following values:

*   `self`
*   `none`
*   Any localhost source, (`http://localhost`,  `http://127.0.0.1`, or any port on those domains)

CSP modifications for `sandbox` have no such new restrictions.

Starting in Chrome 102, Manifest V3 extensions can include `wasm-unsafe-eval` in the CSP to use WebAssembly
files bundled as part of the extension.

### Action API unification  {: #action-api-unification }

In Manifest V2, there were two different APIs to implement actions: `"browser_action"` and
`"page_action"`. These APIs filled distinct roles when they were introduced, but over time they've
become redundant so in Manifest V3 we are unifying them into as single `"action"` API:

{% Columns %}
```js
// Manifest V2

// manifest.json
{
  ...
  "browser_action": { ... },
  "page_action": { ... }
  ...
}

// background.js
chrome.browserAction.onClicked.addListener(tab => { ... });
chrome.pageAction.onClicked.addListener(tab => { ... });
```

```js
// Manifest V3

// manifest.json
{
  ...
  "action": { ... }
  ...
}


// background.js
chrome.action.onClicked.addListener(tab => { ... });
```
{% endColumns %}

### Web-accessible resources  {: #web-accessible-resources }

This change limits access to extension resources to specific sites/extensions. Instead of providing
a list of files, you now provide an **array of objects**, each of which can map to a set of resources to a
set of URLs or extension IDs:

{% Columns %}

```json
// Manifest V2
{
  ...
  "web_accessible_resources": [
    RESOURCE_PATHS
  ]
  ...
}
```

```json
// Manifest V3
{
  ...
  "web_accessible_resources": [{
    "resources": [RESOURCE_PATHS],
    "matches": [MATCH_PATTERNS],
    "extension_ids": [EXTENSION_IDS],
    "use_dynamic_url": boolean //optional
  }]
  ...
}
```

{% endColumns %}

Replace the following:

- <code><var>RESOURCE_PATHS</var></code>: A list of strings, each containing a relative path to a
  given resource from the extension's root directory.
- <code><var>MATCH_PATTERNS</var></code>: A list of strings, each containing a [match
  pattern][doc-match-pattern] that specifies which sites can access this set of resources.
- <code><var>EXTENSION_IDS</var></code>: A list of strings, each containing the ID of a given
  extension.

Previously, the list of web accessible resources applied to all websites and extensions. This
created opportunities for fingerprinting or unintentional resource access. The updated API lets
extensions more tightly control what other sites or extensions can access extension resources. 

See the [web accessible resources][doc-war] documentation for usage information.

## Code execution  {: #code-execution }

Manifest V3 imposes new restrictions that limit an extension's ability to execute unreviewed
JavaScript through a combination of platform changes and policy limitations.

Many extensions are unaffected by this change. However, if your Manifest V2 extension executes
remotely hosted scripts, injects code strings into pages, or eval strings at runtime, you'll need
to update your code execution strategies when migrating to Manifest V3.

### Remotely hosted code restrictions  {: #remotely-hosted-code }

_Remotely hosted code_ refers to any code that is **not** included in an extension's package as a
loadable resource. For example, the following are considered remotely hosted code:

- JavaScript files pulled from the developer's server.
- Any library hosted on a [CDN][mdn-cdn].
- a code string passed into [`eval()`][mdn-eval] at runtime

In Manifest V3, all of your extension's logic must be included in the extension. You can no longer
load and execute a remotely hosted file. A number of alternative approaches are available, depending
on your use case and the reason for remote hosting. Here are approaches to consider:

Configuration-driven features and logic
: In this approach, your extension loads a remote
configuration (for example a JSON file) at runtime and caches the configuration locally. The
extension then uses this cached configuration to decide which features to enable.

Externalize logic with a remote service
: Consider migrating application logic from the extension to
a remote web service that your extension can call. (Essentially a form of message passing.) This
provides you the ability to keep code private and change the code on demand while avoiding the extra
overhead of resubmitting to the Chrome Web Store.

Bundle third-party libraries
: If you are using a popular framework like [React][react-cdn] or
[Bootstrap][bootstrap-gs], you can download the minified files, add them to your project and import
them locally. For example:

{% Columns %}

```js
// Manifest V2

// popup.html
...
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
...
```

```js
// Manifest V3

// popup.html
...
<script src="./react-dom.production.min.js"></script>
<link href="./bootstrap.min.css" rel="stylesheet">
...
```

{% endColumns %}

To include a library in a service worker, you have two options:
- For standard service workers, use `importScripts()`.
- To use static import statements, set the `"background.type"` to `"module"` in the manifest.

### Executing arbitrary strings  {: #executing-arbitrary-strings }

In Manifest V2, it was possible to execute an arbitrary string of code using
[`tabs.executeScript()`][api-tabs-executescript] and the `code` property on the options object.
Manifest V3 does not allow arbitrary code execution. In order to adapt to this requirement,
extension developers can use the [`scripting.executeScript()`][api-scripting-executescript] method to
either inject a static file or a function.

To use the [Scripting API][api-scripting], you need to include the `"scripting"` permission in your
manifest file. This API does not [trigger a permission warning][doc-perm-warn].

```json
{
  "manifest_version": 3,
  "permissions": ["scripting"],
  ...
}
```

#### Injecting a static file {: #cs-static-file}

Static file injection with `scripting.executeScript()` is almost identical to how it used to work in
the Tabs API. While the old method only took a single file, the new method now takes an array of files.

{% Columns %}
```js
// Manifest V2

// background.js
...
chrome.tabs.executeScript({
  file: 'content-script.js'
});
...

// content-script.js
...
alert('File test alert');
...
```

```js
// Manifest V3

// background.js
...
async function getCurrentTab() {/* ... */}
let tab = await getCurrentTab();

chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['content-script.js']
});
...

// content-script.js
...
alert('File test alert');
...
```
{% endColumns %}

To include an external library, save the file locally and add it to the files array:

```js
// background.js
...
chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['jquery-min.js', 'content-script.js']
});
...
```

#### Injecting a function {: #cs-func } 

If you need more dynamism, the new `func` property allows you to inject a function as a content
script and pass variables using the `args` property. Note that the function is not run as if it
was located within the content script; rather, its source is sent to the target tab and it is run
there.

{% Columns %}
```js
// Manifest V2

// background.js
...
let name = 'World!';
chrome.tabs.executeScript({
  code: `alert('Hello, ${name}!')`
});
...
```

```js
// Manifest V3

// background.js
...
async function getCurrentTab() {/* ... */}
let tab = await getCurrentTab();

function showAlert(givenName) {
  alert(`Hello, ${givenName}`);
}

let name = 'World';
chrome.scripting.executeScript({
  target: {tabId: tab.id},
  func: showAlert,
  args: [name],
});
...
```
{% endColumns %}

A functional version of the Manifest V3 snippets in this section can be found in the
[chrome-extensions-samples][github-samples-content] repository. See the [Tabs API
examples][api-tabs-example] for an implementation of `getCurrentTab()`.

## Service workers  {: #background-service-workers }

Background pages in Manifest V2 are replaced by [service workers][dev-google-sw] in Manifest V3;
this is a foundational change that affects most extensions. The following are some notable
differences:

| MV2 - Background page       | MV3 - Service worker                            |
|-----------------------------|-------------------------------------------------|
| Can use a persistent page.  | Terminates when not in use.                     |
| Has access to the DOM.      | Doesn't have access to the DOM.                 |
| Can use `XMLHttpRequest()`. | Must use [`fetch()`][mdn-fetch] to make requests. |

See [Migrating from Background Pages to Service Workers][doc-background-to-worker] to explore how to
adapt to these and other challenges.

{% Aside %}

To aid with the migration process, Manifest V2 extensions can use service
workers as of Chrome 87.

{% endAside %}

## Modifying network requests  {: #modifying-network-requests }

Extensions that modify network requests will need to transition from the blocking version of the
[Web Request API][api-webrequest] to the new [Declarative Net Request
API][api-declarativenetrequest]. This new API was designed to work well with the event-based
execution model of service workers and to maximize an extension's ability to block network requests
without requiring the extension to have permissions.

### Can Manifest V3 extensions use blocking Web Request?  {: #when-use-blocking-webrequest }

The blocking version of the [Web Request API][api-webrequest] exists in Manifest V3, but it can only be used by extensions that are force-installed using Chrome's enterprise policies: 
[ExtensionSettings][enterprise-settings], [ExtensionInstallForcelist][enterprise-force-list].

Extensions meant to be used by the general public must now use [Declarative Net
Request][api-declarativenetrequest] for network request modification. Here 'used by the general
public' means any extension published to the Chrome Web Store except those deployed to a given domain
or to trusted testers. 

### How do you use declarativeNetRequest?  {: #how-use-declarativenetrequest }

Instead of reading the request and programmatically altering it, your extension specifies a number
of [rules][api-declarative-rules]. Each rule contains a set of actions to perform when a given set
of conditions are matched. For example, you could define a rule that removes "cookie" headers when a
request is sent to a specific domain. See the [declarativeNetRequest][api-declarativenetrequest]
reference documentation for a more detailed description of rules

This feature allows content blockers and other request-modifying extensions to implement their use
cases without requiring host permissions, and without needing to read the actual requests.

### Differences between [webRequest](/docs/extensions/reference/webRequest/) and [declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest/) API

- The declarativeNetRequest API allows for evaluating network requests in the browser itself. This
  makes it more performant than the webRequest API, where each network request is evaluated in
  JavaScript in the extension process.
- Because the requests are not intercepted by the extension process, declarativeNetRequest removes
  the need for extensions to have a service worker; resulting in less memory consumption.
- Unlike the webRequest API, blocking or upgrading requests using the declarativeNetRequest API
  requires no host permissions when used with the `declarativeNetRequest` permission.
- The declarativeNetRequest API provides better privacy to users because extensions can't actually
  read the network requests made on the user's behalf.
- Unlike the webRequest API, any images or iframes blocked using the declarativeNetRequest API are
  automatically collapsed in the DOM.
- While deciding whether a request is to be blocked or redirected, the declarativeNetRequest API is
  given priority over the webRequest API because it allows for synchronous interception. Similarly,
  any headers removed through declarativeNetRequest API are not made visible to web request
  extensions.

### Conditional permissions and declarativeNetRequest  {: #declarativenetrequest-conditional-perms }

Most use cases for `declarativeNetRequest` don't require any host permissions at all. However, some
do.

{% Aside 'caution' %}

Host permissions are still required if the extension wants to *redirect* a request or modify its
headers. The `declarativeNetRequestWithHostAccess` permission always requires host permissions to
the request URL and it's initiator to act on a request.

{% endAside %}

When extensions require host permissions for these use cases, we recommend a "tiered" permissions
strategy. This means implementing the extension's core functionality without using these
permissions; putting the more advanced use cases behind an `"optional_host_permissions"` pattern.

This approach allows privacy-conscious users to withhold those permissions and still use much of the
extension's functionality. This means that developers can implement many common use cases, such as
content-blocking functionality, without requiring any host permissions.

## Sunset for deprecated APIs  {: #sunset-deprecated-apis }

There are a number of APIs that have long been deprecated. Manifest V3 finally removes support for
the following deprecated methods and properties:

*   chrome.extension.getExtensionTabs()
*   chrome.extension.getURL()
*   chrome.extension.lastError
*   chrome.extension.onRequest
*   chrome.extension.onRequestExternal
*   chrome.extension.sendRequest()
*   chrome.tabs.getAllInWindow()
*   chrome.tabs.getSelected()
*   chrome.tabs.onActiveChanged
*   chrome.tabs.onHighlightChanged
*   chrome.tabs.onSelectionChanged
*   chrome.tabs.sendRequest()
*   chrome.tabs.Tab.selected

As well as the undocumented:

*   chrome.extension.connect()
*   chrome.extension.onConnect
*   chrome.extension.onMessage
*   chrome.extension.sendMessage()

If your extensions use any of these deprecated APIs, you'll need to make the appropriate changes
when you migrate to Manifest V3.

[api-declarative-rules]: /docs/extensions/reference/declarativeNetRequest/#example
[api-declarativenetrequest]: /docs/extensions/reference/declarativeNetRequest
[api-scripting-executescript]: /docs/extensions/reference/scripting/#method-executeScript
[api-scripting]: /docs/extensions/reference/scripting/
[api-tabs-example]: /docs/extensions/reference/tabs/#get-the-current-tab
[api-tabs-executescript]: /docs/extensions/reference/tabs/#method-executeScript 
[api-webrequest]: /docs/extensions/reference/webRequest
[bootstrap-gs]: https://getbootstrap.com/docs/5.1/getting-started/introduction/
[csp]: https://content-security-policy.com/
[dev-google-sw]: https://developers.google.com/web/fundamentals/primers/service-workers
[doc-background-to-worker]: /docs/extensions/mv3/migrating_to_service_workers
[doc-manifest]: /docs/extensions/mv3/manifest
[doc-match-pattern]: /docs/extensions/mv3/match_patterns/
[doc-perm-warn]: /docs/extensions/mv3/permission_warnings/
[doc-static-cs]: /docs/extensions/mv3/content_scripts/#static-declarative
[doc-war]: /docs/extensions/mv3/manifest/web_accessible_resources/
[doc-whats-new]: /docs/extensions/whatsnew/
[enterprise-force-list]: https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ExtensionInstallForcelist
[enterprise-settings]: https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ExtensionSettings
[github-samples-content]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/reference.mv3-content-scripts
[manifest-sandbox]: /docs/extensions/mv3/manifest/sandbox
[mdn-cdn]: https://developer.mozilla.org/docs/Glossary/CDN
[mdn-eval]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/eval
[mdn-fetch]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[mdn-service-workers]: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
[mv3-checklist]: /docs/extensions/mv3/mv3-migration-checklist
[mv3-declarative]: /docs/extensions/reference/declarativeNetRequest
[mv3-network]: /docs/extensions/mv3/intro/mv3-overview#network-request-modification
[mv3-other]: /docs/extensions/mv3/intro/mv3-overview#other-features
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview
[mv3-promise]: /docs/extensions/mv3/intro/mv3-overview#promises
[mv3-remote]: /docs/extensions/mv3/intro/mv3-overview#remotely-hosted-code
[mv3-sw]: /docs/extensions/mv3/intro/mv3-overview#service-workers
[react-cdn]: https://reactjs.org/docs/cdn-links.html
[section-action]: #action-api-unification
[section-csp]: #content-security-policy
[section-file]: #inject-file
[section-func]: #inject-func
[section-host]: #host-permissions
[section-man-sw]: #man-sw
[section-war]: #web-accessible-resources
[webdev-esm]: https://web.dev/es-modules-in-sw/#static-imports-only
