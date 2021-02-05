---
layout: "layouts/doc-post.njk"
title: "Content scripts"
date: 2012-09-17
updated: 2021-01-20
description: An explanation of content scripts and how to use them in your Chrome Extension.
---

Content scripts are files that run in the context of web pages. By using the standard [Document
Object Model][1] (DOM), they are able to read details of the web pages the browser visits, make
changes to them, and pass information to their parent extension.

## Understand content script capabilities {: #capabilities }

Content scripts can access Chrome APIs used by their parent extension by exchanging [messages][2]
with the extension. They can also access the URL of an extension's file with
`chrome.runtime.getURL()` and use the result the same as other URLs.

```js/1
// Code for displaying <extensionDir>/images/myimage.png:
var imgURL = chrome.runtime.getURL("images/myimage.png");
document.getElementById("someImage").src = imgURL;
```

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
JavaScript environment without conflicting with the page or other extensions' content Scripts.

{% Aside %}
An *isolated world* is a private execution environment that isn't accessible from other extensions. A practical consequence of this isolation is that variables declared by one extension are not visible to another one. The concept was originally introduced with the initial launch of Chrome, providing isolation for browser tabs. 
{% endAside %}

An extension may run in a web page with code similar to the example below.

```html
<html>
  <button id="mybutton">click me</button>
  <script>
    var greeting = "hello, ";
    var button = document.getElementById("mybutton");
    button.person_name = "Bob";
    button.addEventListener("click", () =>
      alert(greeting + button.person_name + ".")
    , false);
  </script>
</html>
```

That extension could inject the following content script using one of the techniques outlined in the
[Inject scripts][31] section.

```js
var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person_name = "Roberto";
button.addEventListener("click", () =>
  alert(greeting + button.person_name + ".")
, false);
```

With this change, both alerts appear in sequence when the button is clicked.

{% Aside %}
Not only does each extension run in its own isolated world, but content scripts
and the web page do too. This means that none of these (web page, content
scripts, and any running extensions) can access the context and variables of
the others.
{% endAside %}

{# youtube id="laLudeUmXHM" #}

## Inject scripts {: #functionality }

Content Scripts can be injected [declared statically][14], [declared dynamically][32], or
[programmatically injected][13].

### Inject with static declarations {: #static-declarative }

Use static content script declarations in manifest.json for scripts that should be automatically
run on a well known set of pages.

Statically declared scripts are registered in the manifest under the `"content_scripts"` field.
They can include JavaScript files, CSS files, or both. All auto-run content scripts must specify
[match patterns][18].

```json/3-9
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["http://*.nytimes.com/*"],
     "css": ["myStyles.css"],
     "js": ["contentScript.js"]
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
          href="match_patterns">Match Patterns</a> for more details on the syntax of these strings
        and <a href="#matchAndGlob">Match patterns and globs</a> for information on how to exclude
        URLs.</td>
    </tr>
    <tr id="css">
      <td><code>css<code></code></code></td>
      <td>array of strings</td>
      <td><em>Optional.</em> The list of CSS files to be injected into matching pages. These are
        injected in the order they appear in this array, before any DOM is constructed or displayed
        for the page.</td>
    </tr>
    <tr id="js">
      <td><code>js<code></code></code></td>
      <td>
        <nobr>array of strings</nobr>
      </td>
      <td><em>Optional.</em> The list of JavaScript files to be injected into matching pages. These
        are injected in the order they appear in this array.</td>
    </tr>
    <tr id="match_about_blank">
      <td><code>match_about_blank</code></td>
      <td>boolean</td>
      <td><em>Optional.</em> Whether the script should inject into an <code>about:blank</code> frame
        where the parent or opener frame matches one of the patterns declared in
        <code>matches</code>. Defaults to false.</td>
    </tr>
  </tbody>
</table>

### Inject with dynamic declarations {: #dynamic-declarative }

{% Aside 'caution' %}
This feature is not yet fully supported. It is currently in dev and is also available in Chrome Canary.
{% endAside %}

You should use dynamic declarations in the following cases:

- When the host is not well known
- The script may need to be added/removed from a known host

{% if false %}
**TODO**

- Uses the JS scripting API
    - example of adding a script
    - example of removing a script
- Q: Is this going to be the cannonical reference material for content scripts? If so, we may want
  to include examples for the relevant Scripting API methods.

See the [api
proposal](https://docs.google.com/document/d/1p2jnIL3znAhD2VVuEbzOetgj1Qeya9yATa3B9gBGGUg/edit) for
additional details.
{% endif %}


```js
chrome.scripting.registerContentScript(optionsObject, callback);
```


```js
chrome.scripting.unregisterContentScript(idArray, callback);
```


### Inject programmatically {: #programmatic }

Use programmatic injection for content scripts that need to run in respond to events or on specific
occasions.

In order to inject a content script programmatically, your extension needs host permissions for
the page it's trying to inject scripts into. Host permissions can either be granted either by
requesting them as part of your extension's manifest (see [`host_permissions`][33]) or temporarily
via [activeTab][15].

Below we'll look at an example that uses activeTab.

```json/3-5
{
  "name": "My extension",
  ...
  "permissions": [
    "activeTab"
  ],
  ...
}
```

Content scripts can be injected as files.

```js
chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "runContentScript"){
    chrome.scripting.executeScript({
      file: 'contentScript.js'
    });
  }
});
```

Or an entire file can be injected.

```js
function injectedFunction() {
  document.body.style.backgroundColor = 'orange';
}

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "changeColor"){
    chrome.scripting.executeScript({
      function: injectedFunction
    });
  }
});
```

When injecting as a function, you can also pass arguments to the function.

```js
function injectedFunction(color) {
  document.body.style.backgroundColor = color;
}

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "changeColor"){
    chrome.scripting.executeScript({
      function: injectedFunction,
      arguments: ['orange']
    });
  }
});
```


#### Exclude matches and globs {: #matchAndGlob }

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
          href="http://wiki.greasespot.net/Metadata_Block#.40include"><code>@include</code></a>
        Greasemonkey keyword.</td>
    </tr>
    <tr id="exclude_globs">
      <td><code>exclude_globs</code></td>
      <td>array of string</td>
      <td><em>Optional.</em> Applied after <code>matches</code> to exclude URLs that match this
        glob. Intended to emulate the <a
          href="http://wiki.greasespot.net/Metadata_Block#.40include"><code>@exclude</code></a>
        Greasemonkey keyword.</td>
    </tr>
  </tbody>
</table>

The content script will be injected into a page if both of the following are true:

- Its URL matches any `matches` pattern and any `include_globs` pattern
- The URL doesn't also match an `exclude_matches` or `exclude_globs` pattern.
Because the `matches` property is required, `exclude_matches`, `include_globs`, and `exclude_globs`
can only be used to limit which pages will be affected.

The following extension injects the content script into **http://www.nytimes.com/ health**
but not into **http://www.nytimes.com/ business** .

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/2
chrome.scripting.registerContentScript({
  id: 1,
  matches: ["http://*.nytimes.com/*"],
  exclude_matches: ["*://*/*business*"],
  js: ["contentScript.js"]
});
```

Glob properties follow a different, more flexible syntax than [match patterns][24]. Acceptable glob
strings are URLs that may contain "wildcard" asterisks and question marks. The asterisk **\***
matches any string of any length, including the empty string, while the question mark **?** matches
any single character.

For example, the glob **http:// ??? .example.com/foo/ \*** matches any of the following:

- **http:// www .example.com/foo /bar**
- **http:// the .example.com/foo /**

However, it does _not_ match the following:

- **http:// my .example.com/foo/bar**
- **http:// example .com/foo/**
- **http://www.example.com/foo**

This extension injects the content script into **http:/www.nytimes.com/ arts /index.html** and
**http://www.nytimes.com/ jobs /index.html** but not into **http://www.nytimes.com/ sports
/index.html**.

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/3
chrome.scripting.registerContentScript({
  id: 1,
  matches: ['http://*.nytimes.com/*'],
  include_globs: ['*nytimes.com/???s/*'],
  js: ['contentScript.js']
});
```

This extension injects the content script into **http:// history .nytimes.com** and
**http://.nytimes.com/ history** but not into **http:// science .nytimes.com** or
**http://www.nytimes.com/ science** .

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/3
chrome.scripting.registerContentScript({
  id: 1,
  matches: ['http://*.nytimes.com/*'],
  exclude_globs: ['*science*'],
  js: ['contentScript.js']
});
```

One, all, or some of these can be included to achieve the correct scope.

```json/6-8
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "exclude_matches": ["*://*/*business*"],
      "include_globs": ["*nytimes.com/???s/*"],
      "exclude_globs": ["*science*"],
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/2-4
chrome.scripting.registerContentScript({
  matches: ['http://*.nytimes.com/*'],
  exclude_matches: ['*://*/*business*'],
  include_globs: ['*nytimes.com/???s/*'],
  exclude_globs: ['*science*'],
  js: ['contentScript.js']
});
```

#### Run time {: #run_time }

The `run_at` field controls when JavaScript files are injected into the web page. The
preferred and default value is `"document_idle"`, but you can also specify `"document_start"` or
`"document_end"` if needed.

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "run_at": "document_idle",
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/2
chrome.scripting.registerContentScript({
  matches: ['http://*.nytimes.com/*'],
  run_at: 'document_idle',
  js: ['contentScript.js']
});
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
      <td><em>Prefered.</em> Use <code>"document_idle"</code> whenever possible.<br><br>The browser
        chooses a time to inject scripts between <code>"document_end"</code> and immediately after
        the <a
          href="http://www.whatwg.org/specs/web-apps/current-work/#handler-onload"><code>window.onload</code></a>
        event fires. The exact moment of injection depends on how complex the document is and how
        long it is taking to load, and is optimized for page load speed.<br><br>Content scripts
        running at <code>"document_idle"</code> do not need to listen for the
        <code>window.onload</code> event, they are guaranteed to run after the DOM is complete. If a
        script definitely needs to run after <code>window.onload</code>, the extension can check if
        <code>onload</code> has already fired by using the <a
          href="http://www.whatwg.org/specs/web-apps/current-work/#dom-document-readystate"><code>document.readyState</code></a>
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

#### Specify frames {: #frames }

The `"all_frames"` field allows the extension to specify if JavaScript and CSS files should be
injected into all frames matching the specified URL requirements or only into the topmost frame in a
tab.

```json/6
{
  "name": "My extension",
  ...
  "content_scripts": [
    {
      "matches": ["http://*.nytimes.com/*"],
      "all_frames": true,
      "js": ["contentScript.js"]
    }
  ],
  ...
}
```
```js/2
chrome.scripting.registerContentScript({
  matches: ['http://*.nytimes.com/*'],
  all_frames: true,
  js: ['contentScript.js']
});
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

## Communication with the embedding page {: #host-page-communication }

Although the execution environments of content scripts and the pages that host them are isolated
from each other, they share access to the page's DOM. If the page wishes to communicate with the
content script, or with the extension via the content script, it must do so through the shared DOM.

An example can be accomplished using [`window.postMessage`][27]:

```js
var port = chrome.runtime.connect();

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
```

```js
document.getElementById("theButton").addEventListener("click", () => {
  window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
}, false);
```

The non-extension page, example.html, posts messages to itself. This message is intercepted and
inspected by the content script and then posted to the extension process. In this way, the page
establishes a line of communication to the extension process. The reverse is possible through
similar means.

## Stay secure {: #security }

While isolated worlds provide a layer of protection, using content scripts can create
vulnerabilities in an extension and the web page. If the content script receives content from a
separate website, such as making an [XMLHttpRequest][28], be careful to filter content [cross-site
scripting][29] attacks before injecting it. Only communicate over HTTPS in order to avoid
["man-in-the-middle"][30] attacks.

Be sure to filter for malicious web pages. For example, the following patterns are dangerous:

{% Compare 'worse' %}
```js
var data = document.getElementById("json-data")
// WARNING! Might be evaluating an evil script!
var parsed = eval("(" + data + ")")
```
{% endCompare %}

{% Compare 'worse' %}
```js
var elmt_id = ...
// WARNING! elmt_id might be "); ... evil script ... //"!
window.setTimeout("animate(" + elmt_id + ")", 200);
```
{% endCompare %}

Instead, prefer safer APIs that do not run scripts:

{% Compare 'better' %}
```js
var data = document.getElementById("json-data")
// JSON.parse does not evaluate the attacker's scripts.
var parsed = JSON.parse(data);
```
{% endCompare %}

{% Compare 'better' %}
```js
var elmt_id = ...
// The closure form of setTimeout does not evaluate scripts.
window.setTimeout(() => animate(elmt_id), 200);
```
{% endCompare %}

[1]: http://www.w3.org/TR/DOM-Level-2-HTML/
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
[13]: #programmatic
[14]: #static-declarative
[15]: /activeTab
[16]: /tabs#manifest
[18]: /docs/extensions/mv3/match_patterns
[19]: /docs/extensions/mv3/match_patterns
[20]: #matchAndGlob
[21]: /docs/extensions/mv3/match_patterns
[22]: http://wiki.greasespot.net/Metadata_Block#.40include
[23]: http://wiki.greasespot.net/Metadata_Block#.40include
[24]: /docs/extensions/mv3/match_patterns
[25]: http://www.whatwg.org/specs/web-apps/current-work/#handler-onload
[26]: http://www.whatwg.org/specs/web-apps/current-work/#dom-document-readystate
[27]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[28]: /docs/extensions/mv3/xhr
[29]: http://en.wikipedia.org/wiki/Cross-site_scripting
[30]: http://en.wikipedia.org/wiki/Man-in-the-middle_attack
[31]: #functionality
[32]: #dynamic-declarative
[33]: /docs/extensions/reference/permissions
