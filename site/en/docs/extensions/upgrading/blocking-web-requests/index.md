---
layout: 'layouts/doc-post.njk'
title: Replace blocking web request listeners
subhead: 'Modifying network requests in Manifest V3'
description: 'The second of three sections describing changes needed for code that is not part of the extension service worker.'
date: 2023-02-28
---

Manifest V3 changes how extensions handle modification of network requests. Instead of intercepting network requests and altering them at runtime with `chrome.webRequest`, your extension specifies rules that describe actions to perform when a given set of conditions is met. Do this using the [Declarative Net Request API](/docs/extensions/reference/declarativeNetRequest/).

Use of the webRequest and declarativeNetRequest APIs is significantly different. Instead of replacing one function call with another, you need to rewrite your code in terms of use cases. This section walks you through that process.

In Manifest V2, blocking web requests could significantly degrade both the performance of extensions and the performance of pages they work with. The [`webRequest` namespace](/docs/extensions/reference/webRequest) supports nine potentially blocking events, each of which takes an unlimited number of event handlers. To make matters worse, each web page is potentially blocked by multiple extensions, and the permissions required for this are invasive. Manifest V3 guards against this problem by replacing callbacks with declarative rules.

This is the second of three sections describing changes needed for code that is not part of the extension service worker. It describes converting blocking web requests, used by Manifest V2, to declarative net requests, used by Manifest V3. The other two sections cover [update API calls](/docs/extensions/upgrading/api-calls) needed for upgrading to Manifest V3 and [improving security](/docs/extensions/upgrading/improve-security).

## Update permissions {: #update-permissions }

Make the following changes to the [`"permissions"`](/docs/extensions/reference/permissions/) field in your `manifest.json`.

* Remove the `"webRequest"` permission if you no longer need to observe network requests.
* Move Match Patterns from `"permissions"` to `"host_permissions"`. 

You will need to add other permissions, depending on your use case. Those permissions are described with the use case they support.

## Create declarative net request rules {: #create-dnr-rules }

Creating declarative net request rules requires adding a `"declarative_net_request"` object to your `manifest.json`. The `"declarative_net_request"` block contains an array of `"rule_resource"` objects that point to a rule file. The rule file contains an array of objects specifying an action and the conditions in which those actions are invoked.

{% Aside %}
The examples in the rest of this section only show the contents of the rule file since the contents of the `"rule_resources"` object are the same for each.
{% endAside %}

## Common use cases {: #common-use-cases }

The following sections describe common use cases for declarative net requests. The instructions below provide only a brief outline. More information about all of the information here is described in the API reference under [`chrome.declarativeNetRequest`](/docs/extensions/reference/declarativeNetRequest)

### Block a single URL {: #block-a-single-url }

A common use case in Manifest V2 was to blockIn Manifest V2, extensions blocked web requests using the `BeforeRequest` event in the background script. 

{% Compare 'worse', 'Manifest V2 background script' %}
```javascript
chrome.webRequest.onBeforeRequest.addListener((e) => {
    return { cancel: true };
}, { urls: ["https://www.example.com/*"] }, ["blocking"]);
```
{% endCompare %}

For Manifest V3, create a new declarativeNetRequest rule using the `"block"` action type. Notice the `"condition"` object in the example rule. Its `"urlFilter"` replaces the `urls` option passed to the `webRequest` listener. A `"resourceTypes"` array specifies the category of resources to block. This example blocks only the main HTML page, but you could, for example, block only fonts. 

{% Compare 'better', 'Manifest V3 rule file' %}
```json/5-8
[
  {
    "id" : 1,
    "priority": 1,
    "action" : { "type" : "block" },
    "condition" : {
      "urlFilter" : "||example.com",
      "resourceTypes" : ["main_frame"]
    }
  }
]
```
{% endCompare %}

To make this work, you'll need to update the extension's permissions. In the `manifest.json` replace the `"webRequestBlocking"` permission with the `"declarativeNetRequest"` permission. Notice that the URL is removed from the `"permissions"` field because blocking content doesn't require host permissions. As shown above, the host or hosts that a declarative net request applies to is specified in the rule file.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
  "permissions": [
    "webRequestBlocking",
    "https://*.example.com/*"
  ]
```
{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
  "permissions": [
    "declarativeNetRequest",
  ]
```

{% endCompare %}
</div>

### Redirect multiple URLs {: #redirect-multiple-urls }

Another common use case in Manifest V2 was to use the `BeforeRequest` event to redirect web requests. 

{% Compare 'worse', 'Manifest V2 background script' %}
```javascript
chrome.webRequest.onBeforeRequest.addListener((e) => {
    console.log(e);
    return { redirectUrl: "https://developer.chrome.com/docs/extensions/mv3/intro/" };
  }, { 
    urls: [
      "https://developer.chrome.com/docs/extensions/mv2/"
    ]
  }, 
  ["blocking"]
);

```
{% endCompare %}

For Manifest V3, use the `"redirect"` action type. As before, `"urlFilter"` replaces the `url` option passed to the `webRequest` listener. Notice that for this example, the rule file's `"action"` object contains a `"redirect"` field containing the URL to return instead of the URL being filtered. 

<!-- Redirecting for multiple URLs requires multiple rules. For an example of this see the [redirect upgrade sample](). -->

{% Compare 'better', 'Manifest V3 rule file' %}
```json/6
[
  {
    "id" : 1,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": { "url": "https://developer.chrome.com/docs/extensions/mv3/intro/" }
    },
    "condition": {
      "urlFilter": "https://developer.chrome.com/docs/extensions/mv2/",
      "resourceTypes": ["main_frame"]
    }
  }
```
{% endCompare %}

This scenario also requires changes to the extension's permissions. As before, replace the `"webRequestBlocking"` permission with the `"declarativeNetRequest"` permission. The URLs are again moved from the `manifest.json` to a rule file. Notice that redirecting also requires the `"declarativeNetRequestWithHostAccess"` permission in addition to the host permission.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
  "permissions": [
    "webRequestBlocking",
    "https://developer.chrome.com/docs/extensions/*",
    "https://developer.chrome.com/docs/extensions/reference"
  ]
```
{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
  "permissions": [
    "declarativeNetRequestWithHostAccess"
  ],
  "host_permissions": [
    "https://developer.chrome.com/"
  ]
```
{% endCompare %}
</div>

### Block cookies {: #block-cookies }

In Manifest V2, blocking cookies requires intercepting the web request headers before they're sent and removing a specific one. 

{% Compare 'worse', 'Manifest V2 background script' %}
```javascript
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    removeHeader(details.requestHeaders, 'cookie');
    return {requestHeaders: details.requestHeaders};
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders']);
```
{% endCompare %}

Manifest V3 also does this with a rule in a rule file. This time the action type is `"modifyHeaders"`. The file takes an array of `"requestHeaders"` objects specifying the headers to modify and how to modify them. Notice that the `"condition"` object only contains a `"resourceTypes"` array. It supports the same values as the previous examples.

{% Compare 'better', 'Manifest V3 manifest.json' %}
```json/5-8,10
[
  {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "requestHeaders": [
        { "header": "cookie", "operation": "remove" }
      ]
    },
    "condition": { "resourceTypes": ["main_frame"] }
  }
]
```
{% endCompare %}

This scenario also requires changes to the extension's permissions. As before, replace the `"webRequestBlocking"` permission with the `"declarativeNetRequest"` permission. 

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
  "permissions": [
    "webRequest",
    "webRequestBlocking",
    "https://*/*",
    "http://*/*"
  ],
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
  "permissions": [
    "declarativeNetRequest",
  ],
  "host_permissions": [
    "<all_urls>"
  ]
```
{% endCompare %}
</div>
