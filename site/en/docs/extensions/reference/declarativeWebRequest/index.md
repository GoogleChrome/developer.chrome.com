---
api: declarativeWebRequest
---

## Manifest

You must declare the "declarativeWebRequest" permission in the [extension manifest][1] to use this
API, along with [host permissions][2].

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "declarativeWebRequest",
    "*://*/*"
  ],
  ...
}
```

Note that certain types of non-sensitive actions do not require host permissions:

- `CancelRequest`
- `IgnoreRules`
- `RedirectToEmptyDocument`
- `RedirectToTransparentImage`

The `SendMessageToExtension` action requires host permissions for any hosts whose network requests
you want to trigger a message.

All other actions require host permissions to all URLs.

As an example, if `"*://*.google.com/*"` is the only host permission an extension has, then such an
extension may set up a rule to

- cancel a request to "http://www.google.com" or "http://anything.else.com"
- send a message when navigating to "http://www.google.com" but not to "http://something.else.com"

The extension cannot set up a rule to redirect "http://www.google.com" to "http://mail.google.com".

## Rules

The Declarative Web Request API follows the concepts of the [Declarative API][3]. You can register
rules to the `chrome.declarativeWebRequest.onRequest` event object.

The Declarative Web Request API supports a single type of match criteria, the `RequestMatcher`. The
`RequestMatcher` matches network requests if and only if all listed criteria are met. The following
`RequestMatcher` would match a network request when the user enters "http://www.example.com" in the
URL bar:

```js
var matcher = new chrome.declarativeWebRequest.RequestMatcher({
  url: { hostSuffix: 'example.com', schemes: ['http'] },
  resourceType: ['main_frame']
});
```

Requests to "https://www.example.com" would be rejected by the `RequestMatcher` due to the scheme.
Also all requests for an embedded iframe would be rejected due to the `resourceType`.

{% Aside %}

**Note:** All conditions and actions are created via a constructor as shown in the example above.

{% endAside %}

In order to cancel all requests to "example.com", you can define a rule as follows:

```js
var rule = {
  conditions: [
    new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'example.com' } })
  ],
  actions: [
    new chrome.declarativeWebRequest.CancelRequest()
  ]
};
```

In order to cancel all requests to "example.com" and "foobar.com", you can add a second condition,
as each condition is sufficient to trigger all specified actions:

```js
var rule2 = {
  conditions: [
    new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'example.com' } }),
    new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: 'foobar.com' } })
  ],
  actions: [
    new chrome.declarativeWebRequest.CancelRequest()
  ]
};
```

Register rules as follows:

```js
chrome.declarativeWebRequest.onRequest.addRules([rule2]);
```

{% Aside %}

**Note:** You should always register or unregister rules in bulk rather than individually because
each of these operations recreates internal data structures. This re-creation is computationally
expensive but facilitates a very fast URL matching algorithm for hundreds of thousands of URLs. The
[Performance section][4] of the [Events][5] API provides further performance tips.

{% endAside %}

## Evaluation of conditions and actions {: #evaluation }

The Declarative Web Request API follows the [Life cycle model for web requests][6] of the [Web
Request API][7]. This means that conditions can only be tested at specific stages of a web request
and, likewise, actions can also only be executed at specific stages. The following tables list the
request stages that are compatible with conditions and actions.

<table><tbody><tr><th colspan="5">Request stages during which condition attributes can be processed.</th></tr><tr><th>Condition attribute</th><th>onBeforeRequest</th><th>onBeforeSendHeaders</th><th>onHeadersReceived</th><th>onAuthRequired</th></tr><tr><td>url</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>resourceType</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>contentType</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>excludeContentType</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>responseHeaders</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>excludeResponseHeaders</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>requestHeaders</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>excludeRequestHeaders</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>thirdPartyForCookies</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><th colspan="5" style="padding-top:2em">Request stages during which actions can be executed.</th></tr><tr><th>Event</th><th>onBeforeRequest</th><th>onBeforeSendHeaders</th><th>onHeadersReceived</th><th>onAuthRequired</th></tr><tr><td>AddRequestCookie</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>AddResponseCookie</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>AddResponseHeader</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>CancelRequest</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>EditRequestCookie</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>EditResponseCookie</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>IgnoreRules</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>RedirectByRegEx</td><td>✓</td><td></td><td>✓</td><td></td></tr><tr><td>RedirectRequest</td><td>✓</td><td></td><td>✓</td><td></td></tr><tr><td>RedirectToEmptyDocument</td><td>✓</td><td></td><td>✓</td><td></td></tr><tr><td>RedirectToTransparentImage</td><td>✓</td><td></td><td>✓</td><td></td></tr><tr><td>RemoveRequestCookie</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>RemoveRequestHeader</td><td></td><td>✓</td><td></td><td></td></tr><tr><td>RemoveResponseCookie</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>RemoveResponseHeader</td><td></td><td></td><td>✓</td><td></td></tr><tr><td>SendMessageToExtension</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>SetRequestHeader</td><td></td><td>✓</td><td></td><td></td></tr></tbody></table>

**Note:** Applicable stages can be further constrained by using the "stages" attribute.

**Note:** Redirects initiated by a redirect action use the original request method for the redirect,
with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect
will be issued using the GET method.

**Example:** It is possible to combine a
`new chrome.declarativeWebRequest.RequestMatcher({contentType: ["image/jpeg"]})` condition with a
`new chrome.declarativeWebRequest.CancelRequest()` action because both of them can be evaluated in
the onHeadersReceived stage. It is, however, impossible to combine the request matcher with a
`new chrome.declarativeWebRequest.SetRequestHeader()` because request headers cannot be set any more
by the time the content type has been terminated.

## Using priorities to override rules

Rules can be associated with priorities as described in the [Events API][8]. This mechanism can be
used to express exceptions. The following example will block all requests to images named "evil.jpg"
except on the server "myserver.com".

```js
var rule1 = {
  priority: 100,
  conditions: [
    new chrome.declarativeWebRequest.RequestMatcher({
        url: { pathEquals: 'evil.jpg' } })
  ],
  actions: [
    new chrome.declarativeWebRequest.CancelRequest()
  ]
};
var rule2 = {
  priority: 1000,
  conditions: [
    new chrome.declarativeWebRequest.RequestMatcher({
      url: { hostSuffix: '.myserver.com' } })
  ],
  actions: [
    new chrome.declarativeWebRequest.IgnoreRules({
      lowerPriorityThan: 1000 })
  ]
};
chrome.declarativeWebRequest.onRequest.addRules([rule1, rule2]);
```

It is important to recognize that the `IgnoreRules` action is not persisted across [request
stages][9]. All conditions of all rules are evaluated at each stage of a web request. If an
`IgnoreRules` action is executed, it applies only to other actions that are executed for the same
web request in the same stage.

[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/declare_permissions
[3]: /docs/extensions/events#declarative
[4]: /docs/extensions/events#performance
[5]: /docs/extensions/events
[6]: /docs/extensions/webRequest#life_cycle
[7]: /docs/extensions/webRequest
[8]: /docs/extensions/events#declarative
[9]: #evaluation
