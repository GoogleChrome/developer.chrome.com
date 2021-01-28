---
layout: "layouts/doc-post.njk"
title: "Stay secure"
date: 2018-03-06
updated: 2019-07-17
description: How to keep your Chrome Extension secure.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Extensions have access to special privileges within the browser, making them an appealing target for
attackers. If an extension is compromised, _every_ user of that extension becomes vulnerable to
malicious and unwanted intrusion. Keep an extension secure and its users protected by incorporating
these practices.

## Protect developer accounts {: #PDA }

Extension code is uploaded and updated through Google accounts. If developers' accounts are
compromised, an attacker could push malicious code directly to all users. Protect these accounts by
creating specifically developer accounts and enabling [two-factor authentication][1] , preferably
with a [security key][2] .

### Keep groups selective {: #group_publishing }

If using [group publishing][3], keep the group confined to trusted developers. Do not accept
membership requests from unknown persons.

## Never use HTTP, Ever {: #https }

When requesting or sending data, avoid an HTTP connection. Assume that any HTTP connections will
have eavesdroppers or contain modifications. HTTPS should always be prefered, as it has built-in
security circumventing most [man-in-the-middle attacks][4].

## Request minimal permissions {: #permissions }

The Chrome browser limits an extension's access to privileges that have been explicitly requested in
the [manifest][5]. Extensions should minimize their permissions by only registering APIs and
websites they depend on. Arbitrary code should be kept to a minimum.

Limiting an extensions privileges limits what a potential attacker can exploit.

### Cross-origin XMLHttpRequest {: #xhr }

An extension can only use [XMLHttpRequest][6] to get resources from itself and from domains
specified in the permissions.

```json
{
  "name": "Very Secure Extension",
  "version": "1.0",
  "description": "Example of a Secure Extension",
  "permissions": [
    "/*",
    "https://*.google.com/"
  ],
  "manifest_version": 2
}
```

This extension requests access to anything on developer.chrome.com and subdomains of Google by
listing `"/*"` and `"https://*google.com/"` in the permissions. If the
extension were compromised, it would still only have permission to interact with websites that meet
the [match pattern][7]. The attacker would not be able to access `"https://user_bank_info.com"` or
interact with `"https://malicious_website.com"`.

## Limit manifest fields {: #manifest_fields }

Including unnecessary registrations in the manifest creates vulnerabilities and makes an extension
more visible. Limit manifest fields to those the extension relies on and give specific field
registration.

### Externally connectable {: #externally_connectable }

Use the [`externally_connectable`][8] field to declare which external extensions and web pages the
extension will exchange information with. Restrict who the extension can externally connect with to
trusted sources.

```json
{
  "name": "Super Safe Extension",
  "externally_connectable": {
    "ids": [
      "iamafriendlyextensionhereisdatas"
    ],
    "matches": [
      "/*",
      "https://*google.com/"
    ],
    "accepts_tls_channel_id": false
  },
  ...
}
```

### Web-accessible resources {: #web_accessible_resources }

Making resources accessible by the web, under the [`web_accessible_resources`][9] will make an
extension detectable by websites and attackers.

```json
{
  ...
  "web_accessible_resources": [
    "images/*.png",
    "style/secure_extension.css",
    "script/secure_extension.js"
  ],
  ...
}
```

The more web accessible resources available, the more avenues a potential attacker can exploit. Keep
these files to a minimum.

## Include an explicit content security policy {: #content_security_policy }

Include a [content security policy][10] for the extension in the manifest to prevent cross-site
scripting attacks. If the extension only loads resources from itself register the following:

```json
{
  "name": "Very Secure Extension",
  "version": "1.0",
  "description": "Example of a Secure Extension",
  "content_security_policy": "default-src 'self'"
  "manifest_version": 2
}
```

If the extension needs to include scripts from specific hosts, they can be included:

```json
{
  "name": "Very Secure Extension",
  "version": "1.0",
  "description": "Example of a Secure Extension",
  "content_security_policy": "default-src 'self' https://extension.resource.com"
  "manifest_version": 2
}
```

## Avoid executable APIs {: #avoid }

APIs that execute code should be replaced with safer alternatives.

### document.write() and innerHTML {: #document_write }

While it may be simpler to dynamically create HTML elements with `document.write()` and `innerHTML`,
it leaves the extension, and web pages the extension depends on, open to attackers inserting
malicious scripts. Instead, manually create DOM nodes and use `innerText` to insert dynamic content.

```js
function constructDOM() {
  let newTitle = document.createElement('h1');
  newTitle.innerText = host;
  document.appendChild(newTitle);
}
```

### eval() {: #eval }

Avoid using `eval()` whenever possible to prevent attacks, as `eval()` will execute any code passed
into it, which may be malicious.

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    var resp = eval("(" + xhr.responseText + ")");
    ...
  }
}
xhr.send();
```

Instead, prefer safer, and faster, methods such as `JSON.parse()`

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
  }
}
xhr.send();
```

## Use content scripts carefully {: #content_scripts }

While [content scripts][11] live in an [isolated world][12], they are not immune from attacks:

- Content scripts are the only part of an extension that interacts directly with the web page.
  Because of this, hostile web pages may manipulate parts of the DOM the content script depends on,
  or exploit surprising web standard behavior, such as [named items][13].
- To interact with DOM of web pages, content scripts need to execute in the same renderer process as
  the web page. This makes content scripts vulnerable to leaking data via side channel attacks
  (e.g., [Spectre][14]), and to being taken over by an attacker if a malicious web page compromises
  the renderer process.

Sensitive work should be performed in a dedicated process, such as the extension's [background
script][15]. Avoid accidentally exposing extension privileges to content scripts:

- Assume that [messages from a content script][16] might have been crafted by an attacker (e.g.
  [validate and sanitize][17] all input and protect your scripts from [cross-site scripting][18]).
- Assume any data sent to the content script might leak to the web page. Do not send sensitive data
  (e.g. secrets from the extension, data from other web origins, browsing history) to content
  scripts.
- Limit the scope of privileged actions that can be triggered by content scripts. Do not allow
  content scripts to [trigger requests to arbitrary URLs][19] or pass arbitrary arguments to
  extension APIs (e.g., do not allow passing arbitrary URLs to [`fetch`][20] or
  [`chrome.tabs.create`][21] API).

## Register and sanitize inputs {: #sanitize }

Safeguard an extension from malicious scripts by limiting listeners to only what the extension is
expecting, validating the senders of incoming data, and sanitizing all inputs.

An extension should only register for [`runtime.onRequestExternal`][22], if it is expecting
communication from an external website or extension. Always validate that the sender matches a
trusted source.

```js
// The ID of an external extension
const kFriendlyExtensionId = "iamafriendlyextensionhereisdatas";

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id === kFriendlyExtensionId)
      doSomething();
});
```

Even messages via [runtime.onMessage][23] event from the extension itself should be scrutinized to
ensure the [MessageSender][24] is not from a compromised [content script][25].

```js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.allowedAction)
    console.log("This is an allowed action.");
});
```

Prevent an extension from executing an attacker's script by sanitizing user inputs and incoming
data, even from the extension itself and approved sources. [Avoid executable APIs][26].

```js
function sanitizeInput(input) {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
```

[1]: https://support.google.com/accounts/answer/185839?hl=en
[2]: https://support.google.com/accounts/answer/6103523
[3]: /publish#set-up-group-publishing
[4]: https://www.owasp.org/index.php/Man-in-the-middle_attack
[5]: /manifest
[6]: /xhr
[7]: /match_patterns
[8]: /manifest/externally_connectable
[9]: /manifest/web_accessible_resources
[10]: /contentSecurityPolicy
[11]: /content_scripts
[12]: /content_scripts#isolated_world
[13]: https://html.spec.whatwg.org/#dom-window-nameditem
[14]: https://spectreattack.com/
[15]: /background_pages
[16]: /messaging#content-scripts-are-less-trustworthy
[17]: #sanitize
[18]: /messaging#cross-site-scripting
[19]: /xhr#xhr-vs-content-scripts
[20]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[21]: /tabs#method-create
[22]: /runtime#event-onMessageExternal
[23]: /runtime#event-onMessage
[24]: /runtime#type-MessageSender
[25]: /content_scripts
[26]: /security#avoid
