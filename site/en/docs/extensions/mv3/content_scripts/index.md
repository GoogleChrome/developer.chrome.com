---
layout: "layouts/doc-post.njk"
title: "Content scripts"
seoTitle: "Chrome Extensions content scripts"
date: 2012-09-17
updated: 2021-08-02
description: An explanation of content scripts and how to use them in your Chrome Extension.
---

Content scripts are files that run in the context of web pages. By using the standard [Document
Object Model][1] (DOM), they are able to read details of the web pages the browser visits, make
changes to them, and pass information to their parent extension.

## Understand content script capabilities {: #capabilities }

Content scripts can access Chrome APIs used by their parent extension by exchanging [messages][2]. They can [access extension files][section-files] after declaring them as [web-accessible resources][34].

Additionally, content scripts can access the following chrome APIs directly:

- [i18n][3]
- [storage][4]
- [runtime][5]:
  - [connect][6]
  - [getManifest][7]
  - [getURL][8]
  - [id][9]
  - [onConnect][10]
  - [onMessage][11]
  - [sendMessage][12]

Content scripts are unable to access other APIs directly.

## Work in isolated worlds {: #isolated_world }

Content scripts live in an isolated world, allowing a content script to make changes to its
JavaScript environment without conflicting with the page or other extensions' content scripts.

{% Aside 'key-term' %}

An **isolated world** is a private execution environment that isn't accessible to the page or other
extensions. A practical consequence of this isolation is that JavaScript variables in an extension's
content scripts are not visible to the host page or other extensions' content scripts. The concept
was originally introduced with the initial launch of Chrome, providing isolation for browser tabs.

{% endAside %}

An extension may run in a web page with code similar to the example below.

{% Label %}webPage.html{% endLabel %}

```html
<html>
  <button id="mybutton">click me</button>
  <script>
    var greeting = "hello, ";
    var button = document.getElementById("mybutton");
    button.person_name = "Bob";
    button.addEventListener(
        "click", () => alert(greeting + button.person_name + "."), false);
  </script>
</html>
```

That extension could inject the following content script using one of the techniques outlined in the
[Inject scripts][31] section.

{% Label %}content-script.js{% endLabel %}

```js
var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person_name = "Roberto";
button.addEventListener(
    "click", () => alert(greeting + button.person_name + "."), false);
```

With this change, both alerts appear in sequence when the button is clicked.

{% Aside %}

Not only does each extension run in its own isolated world, but content scripts and the web page do
too. This means that none of these (web page, content scripts, and any running extensions) can
access the context and variables of the others.

{% endAside %}

{# youtube id="laLudeUmXHM" #}

## Inject scripts {: #functionality }

Content scripts can be [declared statically][header-cs-static], [declared
dynamically][header-cs-dynamic], or [programmatically injected][header-cs-injection].

### Inject with static declarations {: #static-declarative }

Use static content script declarations in manifest.json for scripts that should be automatically
run on a well known set of pages.

Statically declared scripts are registered in the manifest under the `"content_scripts"` field.
They can include JavaScript files, CSS files, or both. All auto-run content scripts must specify
[match patterns][18].

{% Label %}manifest.json{% endLabel %}

```json/3-9
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["https://*.nytimes.com/*"],
     "css": ["my-styles.css"],
     "js": ["content-script.js"]
   }
 ],
 ...
}


```

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="matches">
      <td><code>matches</code></td>
      <td>array of strings</td>
      <td><em>Required.</em> Specifies which pages this content script will be injected into. See <a
          href="/docs/extensions/mv3/match_patterns/">Match Patterns</a> for more details on the syntax of these strings
        and <a href="#matchAndGlob">Match patterns and globs</a> for information on how to exclude
        URLs.</td>
    </tr>
    <tr id="css">
      <td><code>css</code></td>
      <td>array of strings</td>
      <td><em>Optional.</em> The list of CSS files to be injected into matching pages. These are
        injected in the order they appear in this array, before any DOM is constructed or displayed
        for the page.</td>
    </tr>
    <tr id="js">
      <td><code>js</code></td>
      <td>
        <nobr>array of strings</nobr>
      </td>
      <td><em>Optional.</em> The list of JavaScript files to be injected into matching pages. Files
        are injected in the order they appear in this array. Each string in this list must contain
        a relative path to a resource in the extension's root directory. Leading slashes (`/`) are
        automatically trimmed.</td>
    </tr>
    <tr id="run_at">
      <td><code>run_at</code></td>
      <td><a href="/docs/extensions/reference/extensionTypes/#type-RunAt">RunAt</a></td>
      <td><em>Optional.</em> Specifies when the script should be injected into the page. Defaults to
        <code>document_idle</code>.</td>
    </tr>
    <tr id="match_about_blank">
      <td><code>match_about_blank</code></td>
      <td>boolean</td>
      <td><em>Optional.</em> Whether the script should inject into an <code>about:blank</code> frame
        where the parent or opener frame matches one of the patterns declared in
        <code>matches</code>. Defaults to false.</td>
    </tr>
    <tr id="match_origin_as_fallback">
      <td><code>match_origin_as_fallback</code></td>
      <td>boolean</td>
      <td>
        <em>Optional.</em> Whether the script should inject in frames that were
        created by a matching origin, but whose URL or origin may not directly
        match the pattern. These include frames with different schemes, such as
        <code>about:</code>, <code>data:</code>, <code>blob:</code>, and
        <code>filesystem:</code>. See also
        <a href="#injecting-in-related-frames">Injecting in related frames</a>.
      </td>
    </tr>
    <tr id="world">
      <td><code>world</code></td>
      <td><a href="/docs/extensions/reference/scripting/#type-ExecutionWorld">ExecutionWorld</a></td>
      <td>
        <em>Optional.</em> The JavaScript world for a script to execute within. Defaults to <code>ISOLATED</code>. See also
        <a href="#isolated_world">Work in isolated worlds</a>.
      </td>
    </tr>
  </tbody>
</table>

### Inject with dynamic declarations {: #dynamic-declarative }

Dynamic content scripts are useful when the match patterns for content scripts are
not well known or when content scripts should not always be injected on known hosts.

Introduced in Chrome 96, dynamic declarations are similar to [static
declarations][header-cs-static], but the content script object is registered with Chrome using
methods in the [`chrome.scripting` namespace](/docs/extensions/reference/scripting/) rather than in
[manifest.json][doc-manifest]. The Scripting API also allows extension developers
to:

- [Register][api-register-cs] content scripts.
- [Get a list of][api-get-registered-cs] registered content scripts.
- [Update][api-update-cs] the list of registered content scripts.
- [Remove][api-unregister-cs] registered content scripts.

Like static declarations, dynamic declarations can include JavaScript files, CSS files, or both.

{% Label %}service-worker.js{% endLabel %}

```js
chrome.scripting
  .registerContentScripts([{
    id: "session-script",
    js: ["content.js"],
    persistAcrossSessions: false,
    matches: ["*://example.com/*"],
    runAt: "document_start",
  }])
  .then(() => console.log("registration complete"))
  .catch((err) => console.warn("unexpected error", err))
```

{% Label %}service-worker.js{% endLabel %}

```js
chrome.scripting
  .updateContentScripts([{
    id: "session-script",
    excludeMatches: ["*://admin.example.com/*"],
  }])
  .then(() => console.log("registration updated"));
```

{% Label %}service-worker.js{% endLabel %}

```js
chrome.scripting
  .getRegisteredContentScripts()
  .then(scripts => console.log("registered content scripts", scripts));
```

{% Label %}service-worker.js{% endLabel %}

```js
chrome.scripting
  .unregisterContentScripts({ ids: ["session-script"] })
  .then(() => console.log("un-registration complete"));
```

### Inject programmatically {: #programmatic }

Use programmatic injection for content scripts that need to run in response to events or on specific
occasions.

To inject a content script programmatically, your extension needs host permissions for
the page it's trying to inject scripts into. Host permissions can either be granted by
requesting them as part of your extension's manifest (see [`host_permissions`][33]) or temporarily
via [activeTab][15].

Below we'll look at different versions of an activeTab-based extension.

{% Label %}manifest.json:{% endLabel %}

```json/4
{
  "name": "My extension",
  ...
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "Action Button"
  }
}
```

Content scripts can be injected as files…

{% Label %}content-script.js{% endLabel %}

```js

document.body.style.backgroundColor = "orange";
```

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"]
  });
});
```

…or a function body can be injected and executed as a content script.

{% Label %}service-worker.js:{% endLabel %}

```js
function injectedFunction() {
  document.body.style.backgroundColor = "orange";
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    func : injectedFunction,
  });
});
```

Be aware that the injected function is a copy of the function referenced in the
`chrome.scripting.executeScript` call, not the original function itself. As a result, the function's
body must be self contained; references to variables outside of the function will cause the content
script to throw a [`ReferenceError`][ref-error].

When injecting as a function, you can also pass arguments to the function.

{% Label %}service-worker.js{% endLabel %}

```js
function injectedFunction(color) {
  document.body.style.backgroundColor = color;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    func : injectedFunction,
    args : [ "orange" ],
  });
});
```

### Exclude matches and globs {: #matchAndGlob }

Specified page matching is customizable by including the following fields in a declarative
registration.

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="exclude_matches">
      <td><code>exclude_matches</code></td>
      <td>array of strings</td>
      <td><em>Optional.</em> Excludes pages that this content script would otherwise be injected
        into. See <a href="match_patterns">Match Patterns</a> for more details on the syntax of
        these strings.</td>
    </tr>
    <tr id="include_globs">
      <td><code>include_globs</code></td>
      <td>array of strings</td>
      <td><em>Optional.</em> Applied after <code>matches</code> to include only those URLs that also
        match this glob. Intended to emulate the <a
          href="https://wiki.greasespot.net/Metadata_Block#.40include"><code>@include</code></a>
        Greasemonkey keyword.</td>
    </tr>
    <tr id="exclude_globs">
      <td><code>exclude_globs</code></td>
      <td>array of string</td>
      <td><em>Optional.</em> Applied after <code>matches</code> to exclude URLs that match this
        glob. Intended to emulate the <a
          href="https://wiki.greasespot.net/Metadata_Block#.40exclude"><code>@exclude</code></a>
        Greasemonkey keyword.</td>
    </tr>
  </tbody>
</table>

The content script will be injected into a page if both of the following are true:

- Its URL matches any `matches` pattern and any `include_globs` pattern
- The URL doesn't also match an `exclude_matches` or `exclude_globs` pattern.
Because the `matches` property is required, `exclude_matches`, `include_globs`, and `exclude_globs`
can only be used to limit which pages will be affected.

The following extension injects the content script into **https://www.nytimes.com/ health**
but not into **https://www.nytimes.com/ business** .

{% Label %}manifest.json{% endLabel %}

```json/5-6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

{% Label %}service-worker.js{% endLabel %}

```js/2-3
chrome.scripting.registerContentScripts([{
  id : "test",
  matches : [ "https://*.nytimes.com/*" ],
  excludeMatches : [ "*://*/*business*" ],
  js : [ "contentScript.js" ],
}]);
```

Glob properties follow a different, more flexible syntax than [match patterns][24]. Acceptable glob
strings are URLs that may contain "wildcard" asterisks and question marks. The asterisk **\***
matches any string of any length, including the empty string, while the question mark **?** matches
any single character.

For example, the glob **https://???.example.com/foo/\*** matches any of the following:

- **https://www.example.com/foo/bar**
- **https://the.example.com/foo/**

However, it does _not_ match the following:

- **https://my.example.com/foo/bar**
- **https://example.com/foo/**
- **https://www.example.com/foo**

This extension injects the content script into **https://www.nytimes.com/arts/index.html** and
**https://www.nytimes.com/jobs/index.html**, but not into
**https://www.nytimes.com/sports/index.html**:

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

This extension injects the content script into **https://history.nytimes.com** and
**https://.nytimes.com/history**, but not into **https://science.nytimes.com** or
**https://www.nytimes.com/science**:

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

One, all, or some of these can be included to achieve the correct scope.

{% Label %}manifest.json{% endLabel %}

```json/6-8
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

### Run time {: #run_time }

The `run_at` field controls when JavaScript files are injected into the web page. The preferred and
default value is `"document_idle"`. See the [RunAt][api-runat] type for other possible
values.

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "run_at": "document_idle",
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

{% Label %}service-worker.js{% endLabel %}

```js/3
chrome.scripting.registerContentScripts([{
  id : "test",
  matches : [ "https://*.nytimes.com/*" ],
  runAt : "document_idle",
  js : [ "contentScript.js" ],
}]);
```

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="document_idle">
      <td><code>document_idle</code></td>
      <td>string</td>
      <td><em>Preferred.</em> Use <code>"document_idle"</code> whenever possible.<br><br>The browser
        chooses a time to inject scripts between <code>"document_end"</code> and immediately after
        the <a
          href="https://www.whatwg.org/specs/web-apps/current-work/#handler-onload"><code>window.onload</code></a>
        event fires. The exact moment of injection depends on how complex the document is and how
        long it is taking to load, and is optimized for page load speed.<br><br>Content scripts
        running at <code>"document_idle"</code> do not need to listen for the
        <code>window.onload</code> event, they are guaranteed to run after the DOM is complete. If a
        script definitely needs to run after <code>window.onload</code>, the extension can check if
        <code>onload</code> has already fired by using the <a
          href="https://www.whatwg.org/specs/web-apps/current-work/#dom-document-readystate"><code>document.readyState</code></a>
        property.</td>
    </tr>
    <tr id="document_start">
      <td><code>document_start</code></td>
      <td>string</td>
      <td>Scripts are injected after any files from <code>css</code>, but before any other DOM is
        constructed or any other script is run.</td>
    </tr>
    <tr id="document_end">
      <td><code>document_end</code></td>
      <td>string</td>
      <td>Scripts are injected immediately after the DOM is complete, but before subresources like
        images and frames have loaded.</td>
    </tr>
  </tbody>
</table>

### Specify frames {: #frames }

The `"all_frames"` field allows the extension to specify if JavaScript and CSS files should be
injected into all frames matching the specified URL requirements or only into the topmost frame in a
tab.

{% Label %}manifest.json{% endLabel %}

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.nytimes.com/*"],
      "all_frames": true,
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

{% Label %}service-worker.js{% endLabel %}

```js/3
chrome.scripting.registerContentScripts([{
  id: "test",
  matches : [ "https://*.nytimes.com/*" ],
  allFrames : true,
  js : [ "contentScript.js" ],
}]);
```

<table class="simple">
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr id="all_frames">
      <td><code>all_frames</code></td>
      <td>boolean</td>
      <td><em>Optional.</em> Defaults to <code>false</code>, meaning that only the top frame is
        matched.<br><br>If specified <code>true</code>, it will inject into all frames, even if the
        frame is not the topmost frame in the tab. Each frame is checked independently for URL
        requirements, it won't inject into child frames if the URL requirements are not met.</td>
    </tr>
  </tbody>
</table>

### Injecting in related frames {: #injecting-in-related-frames }

Extensions may want to run scripts in frames that are related to a matching
frame, but don't themselves match. A common scenario when this is the case is
for frames with URLs that were created by a matching frame, but whose URLs don't
themselves match the script's specified patterns.

This is the case when an extension wants to inject in frames with URLs that
have `about:`, `data:`, `blob:`, and `filesystem:` schemes. In these cases, the
URL will not match the content script's pattern (and, in the case of `about:` and
`data:`, do not even include the parent URL or origin in the URL
at all, as in `about:blank` or `data:text/html,<html>Hello, World!</html>`).
However, these frames can still be associated with the creating frame.

To inject into these frames, extensions can specify the
`"match_origin_as_fallback"` property on a content script specification in the
manifest.

{% Label %}manifest.json{% endLabel %}

```json
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["https://*.google.com/*"],
      "match_origin_as_fallback": true,
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```

When specified and set to `true`, Chrome will look at the origin of the
initiator of the frame to determine whether the frame matches, rather than at
the URL of the frame itself. Note that this might also be different than the
target frame's _origin_ (e.g., `data:` URLs have a null origin).

The initiator of the frame is the frame that created or navigated the target
frame. While this is commonly the direct parent or opener, it may not be (as in
the case of a frame navigating an iframe within an iframe).

Because this compares the _origin_ of the initiator frame, the initiator frame
could be on at any path from that origin. To make this implication clear, Chrome
requires any content scripts specified with `"match_origin_as_fallback"`
set to `true` to also specify a path of `*`.

When both `"match_origin_as_fallback"` and `"match_about_blank"` are specified,
`"match_origin_as_fallback"` takes priority.

This property is only available in extensions running manifest version 3 or
higher.

## Communication with the embedding page {: #host-page-communication }

Although the execution environments of content scripts and the pages that host them are isolated
from each other, they share access to the page's DOM. If the page wishes to communicate with the
content script, or with the extension via the content script, it must do so through the shared DOM.

An example can be accomplished using [`window.postMessage`][27]:

{% Label %}content-script.js{% endLabel %}

```js
var port = chrome.runtime.connect();

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  if (event.data.type && (event.data.type === "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
```

{% Label %}example.js{% endLabel %}

```js
document.getElementById("theButton").addEventListener("click", () => {
  window.postMessage(
      {type : "FROM_PAGE", text : "Hello from the webpage!"}, "*");
}, false);
```

The non-extension page, example.html, posts messages to itself. This message is intercepted and
inspected by the content script and then posted to the extension process. In this way, the page
establishes a line of communication to the extension process. The reverse is possible through
similar means.

## Accessing extension files {: #files }

To access an extension file from a content script, you can call
[`chrome.runtime.getURL()`][api-get-url] to get the _absolute URL_ of your extension asset as shown in the following example (`content.js`):

{% Label %}content-script.js{% endLabel %}

```js
let image = chrome.runtime.getURL("images/my_image.png")
```

To use fonts or images in a CSS file, you can use [`@@extension_id`][i18n-extid] to construct a URL as shown in the following example (`content.css`):

{% Label %}content.css{% endLabel %}

```css
body {
 background-image:url('chrome-extension://__MSG_@@extension_id__/background.png');
}

@font-face {
 font-family: 'Stint Ultra Expanded';
 font-style: normal;
 font-weight: 400;
 src: url('chrome-extension://__MSG_@@extension_id__/fonts/Stint Ultra Expanded.woff') format('woff');
}
```

All assets must be declared as [Web Accessible Resources][manifest-war] in the `manifest.json` file:

{% Label %}manifest.json{% endLabel %}

```json
{
 ...
 "web_accessible_resources": [
   {
     "resources": [ "images/*.png" ],
     "matches": [ "https://example.com/*" ]
   },
   {
     "resources": [ "fonts/*.woff" ],
     "matches": [ "https://example.com/*" ]
   }
 ],
 ...
}
```

## Stay secure {: #security }

While isolated worlds provide a layer of protection, using content scripts can create
vulnerabilities in an extension and the web page. If the content script receives content from a
separate website, such as making a fetch() request, be careful to filter content
[cross-site scripting][29] attacks before injecting it. Only communicate over HTTPS in order to
avoid ["man-in-the-middle"][30] attacks.

Be sure to filter for malicious web pages. For example, the following patterns are dangerous, and
disallowed in Manifest V3:

{% Compare 'worse' %}

{% Label %}content-script.js{% endLabel %}

```js
const data = document.getElementById("json-data");
// WARNING! Might be evaluating an evil script!
const parsed = eval("(" + data + ")");
```
{% endCompare %}

{% Compare 'worse' %}

{% Label %}content-script.js{% endLabel %}

```js
const elmt_id = ...
// WARNING! elmt_id might be '); ... evil script ... //'!
window.setTimeout("animate(" + elmt_id + ")", 200);
```
{% endCompare %}

Instead, prefer safer APIs that do not run scripts:

{% Compare 'better' %}

{% Label %}content-script.js{% endLabel %}

```js
const data = document.getElementById("json-data")
// JSON.parse does not evaluate the attacker's scripts.
const parsed = JSON.parse(data);
```
{% endCompare %}

{% Compare 'better' %}

{% Label %}content-script.js{% endLabel %}

```js
const elmt_id = ...
// The closure form of setTimeout does not evaluate scripts.
window.setTimeout(() => animate(elmt_id), 200);
```
{% endCompare %}

[1]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[2]: /docs/extensions/mv3/messaging
[3]: /docs/extensions/reference/i18n
[4]: /docs/extensions/reference/storage
[5]: /docs/extensions/reference/runtime
[6]: /docs/extensions/reference/runtime#method-connect
[7]: /docs/extensions/reference/runtime#method-getManifest
[8]: /docs/extensions/reference/runtime#method-getURL
[9]: /docs/extensions/reference/runtime#property-id
[10]: /docs/extensions/reference/runtime#event-onConnect
[11]: /docs/extensions/reference/runtime#event-onMessage
[12]: /docs/extensions/reference/runtime#method-sendMessage
[15]: /docs/extensions/mv3/manifest/activeTab/
[16]: /tabs#manifest
[18]: /docs/extensions/mv3/match_patterns
[19]: /docs/extensions/mv3/match_patterns
[20]: #matchAndGlob
[21]: /docs/extensions/mv3/match_patterns
[22]: https://wiki.greasespot.net/Metadata_Block#.40include
[23]: https://wiki.greasespot.net/Metadata_Block#.40include
[24]: /docs/extensions/mv3/match_patterns
[25]: https://www.whatwg.org/specs/web-apps/current-work/#handler-onload
[26]: https://www.whatwg.org/specs/web-apps/current-work/#dom-document-readystate
[27]: https://developer.mozilla.org/docs/Web/API/Window/postMessage
[28]: /docs/extensions/mv3/xhr
[29]: https://en.wikipedia.org/wiki/Cross-site_scripting
[30]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[31]: #functionality
[33]: /docs/extensions/reference/permissions
[34]: /docs/extensions/mv3/manifest/web_accessible_resources/

[api-get-registered-cs]: /docs/extensions/reference/scripting/#method-getRegisteredContentScripts
[api-register-cs]: /docs/extensions/reference/scripting/#method-registerContentScripts
[api-runat]: /docs/extensions/reference/extensionTypes/#type-RunAt
[api-scripting]: /docs/extensions/reference/scripting/
[api-unregister-cs]: /docs/extensions/reference/scripting/#method-unregisterContentScripts
[api-update-cs]: /docs/extensions/reference/scripting/#method-updateContentScripts
[doc-manifest]: /docs/extensions/mv3/manifest
[header-cs-dynamic]: #dynamic-declarative
[header-cs-injection]: #programmatic
[header-cs-static]: #static-declarative
[header-related-frames]: #injecting-in-related-frames
[ref-error]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError
[api-get-url]: /docs/extensions/reference/runtime#method-getURL
[manifest-war]: /docs/extensions/mv3/manifest/web_accessible_resources/
[section-files]: #files
[i18n-extid]: /docs/extensions/reference/i18n/#overview-predefined
