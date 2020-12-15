---
layout: "layouts/doc-post.njk"
title: "Cross-origin XMLHttpRequest"
date: 2012-09-18
updated: 2020-03-09
description: How to implement cross-origin XHR in your Chrome Extension.
---

Regular web pages can use the [XMLHttpRequest][1] object to send and receive data from remote
servers, but they're limited by the [same origin policy][2]. [Content scripts][3] initiate requests
on behalf of the web origin that the content script has been injected into and therefore content
scripts are also subject to the [same origin policy][4]. (Content scripts have been subject to [CORB
since Chrome 73 and CORS since Chrome 83][5].) Extension origins aren't so limited - a script
executing in an extension's background page or foreground tab can talk to remote servers outside of
its origin, as long as the extension requests cross-origin permissions.

## Extension origin {: #extension-origin }

Each running extension exists within its own separate security origin. Without requesting additional
privileges, the extension can use XMLHttpRequest to get resources within its installation. For
example, if an extension contains a JSON configuration file called `config.json`, in a
`config_resources` folder, the extension can retrieve the file's contents like this:

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
xhr.open("GET", chrome.extension.getURL('/config_resources/config.json'), true);
xhr.send();
```

If the extension attempts to use a security origin other than itself, say https://www.google.com,
the browser disallows it unless the extension has requested the appropriate cross-origin
permissions.

## Requesting cross-origin permissions {: #requesting-permission }

By adding hosts or host match patterns (or both) to the [host_permissions][6] section of the
[manifest][7] file, the extension can request access to remote servers outside of its origin.

```json
{
  "name": "My extension",
  ...
  "host_permissions": [
    "https://www.google.com/"
  ],
  ...
}
```

Cross-origin permission values can be fully qualified host names, like these:

- "https://www.google.com/"
- "https://www.gmail.com/"

Or they can be match patterns, like these:

- "https://\*.google.com/"
- "https://\*/"

A match pattern of "https://\*/" allows HTTPS access to all reachable domains. Note that here, match
patterns are similar to [content script match patterns][8], but any path information following the
host is ignored.

Also note that access is granted both by host and by scheme. If an extension wants both secure and
non-secure HTTP access to a given host or set of hosts, it must declare the permissions separately:

```json
"host_permissions": [
  "http://www.google.com/",
  "https://www.google.com/"
]
```

## Security considerations {: #security-considerations }

### Avoiding cross-site scripting vulnerabilities {: #xss }

When using resources retrieved via XMLHttpRequest, your background page should be careful not to
fall victim to [cross-site scripting][9]. Specifically, avoid using dangerous APIs such as the
below:

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

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be injecting a malicious script!
    document.getElementById("resp").innerHTML = xhr.responseText;
    ...
  }
}
xhr.send();
```

Instead, prefer safer APIs that do not run scripts:

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

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
    document.getElementById("resp").innerText = xhr.responseText;
  }
}
xhr.send();
```

### Limiting content script access to cross-origin requests {: #xhr-vs-content-scripts }

When performing cross-origin requests on behalf of a content script, be careful to [guard against
malicious web pages][10] that might try to impersonate a content script. In particular, do not allow
content scripts to request an arbitrary URL.

Consider an example where an extension performs a cross-origin request to let a content script
discover the price of an item. One (insecure) approach would be to have the content script specify
the exact resource to be fetched by the background page.

```js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'fetchUrl') {
        // WARNING: SECURITY PROBLEM - a malicious web page may abuse
        // the message handler to get access to arbitrary cross-origin
        // resources.
        fetch(request.url)
            .then(response => response.text())
            .then(text => sendResponse(text))
            .catch(error => ...)
        return true;  // Will respond asynchronously.
      }
    });
```

```js
chrome.runtime.sendMessage(
    {contentScriptQuery: 'fetchUrl',
     url: 'https://another-site.com/price-query?itemId=' +
              encodeURIComponent(request.itemId)},
    response => parsePrice(response.text()));
```

In the approach above, the content script can ask the extension to fetch any URL that the extension
has access to. A malicious web page may be able to forge such messages and trick the extension into
giving access to cross-origin resources.

Instead, design message handlers that limit the resources that can be fetched. Below, only the
`itemId` is provided by the content script, and not the full URL.

```js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == 'queryPrice') {
        var url = 'https://another-site.com/price-query?itemId=' +
            encodeURIComponent(request.itemId);
        fetch(url)
            .then(response => response.text())
            .then(text => parsePrice(text))
            .then(price => sendResponse(price))
            .catch(error => ...)
        return true;  // Will respond asynchronously.
      }
    });
```

```js
chrome.runtime.sendMessage(
    {contentScriptQuery: 'queryPrice', itemId: 12345},
    price => ...);
```

### Preferring HTTPS over HTTP {: #http-man-in-the-middle }

Additionally, be especially careful of resources retrieved via HTTP. If your extension is used on a
hostile network, an network attacker (aka a ["man-in-the-middle"][11]) could modify the response
and, potentially, attack your extension. Instead, prefer HTTPS whenever possible.

### Adjusting the content security policy {: #interaction-with-csp }

If you modify the default [Content Security Policy][12] for apps or extensions by adding a
`content_security_policy` attribute to your manifest, you'll need to ensure that any hosts to which
you'd like to connect are allowed. While the default policy doesn't restrict connections to hosts,
be careful when explicitly adding either the `connect-src` or `default-src` directives.

[1]: https://www.w3.org/TR/XMLHttpRequest/
[2]: https://en.wikipedia.org/wiki/Same_origin_policy
[3]: /docs/extensions/mv3/content_scripts
[4]: https://en.wikipedia.org/wiki/Same_origin_policy
[5]: https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
[6]: /docs/extensions/mv3/declare_permissions
[7]: /docs/extensions/mv3/manifest
[8]: /docs/extensions/mv3/match_patterns
[9]: https://en.wikipedia.org/wiki/Cross-site_scripting
[10]: /docs/extensions/mv3/security#content_scripts
[11]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[12]: /docs/extensions/mv3/contentSecurityPolicy
