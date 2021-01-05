---
api: declarativeNetRequest
---

## Manifest

Extensions must declare the `"declarativeNetRequest"` permission in the extension [manifest][1] to
use this API. The `"declarativeNetRequestFeedback"` permission is required to access functions and
events which return information on declarative rules matched. [Host permissions][2] are required if
the extension wants to redirect requests or modify headers. To specify static [Rulesets][3],
extensions must also declare the `"declarative_net_request"` manifest key, which should be a
dictionary with a single key called `"rule_resources"`. It should be a list containing dictionaries
of type [Ruleset][4], as shown below.

```json
{
  "name": "My extension",
  ...

  "declarative_net_request" : {
    "rule_resources" : [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules_1.json"
    }, {
      "id": "ruleset_2",
      "enabled": false,
      "path": "rules_2.json"
    }]
  },
  "permissions": [
    "declarativeNetRequest",
    "declarativeNetRequestFeedback",
    "*://example.com/*"
  ],
  ...
}
```

## Rule Resources

An extension can specify up to [MAX_NUMBER_OF_STATIC_RULESETS][5] [rulesets][6] as part of the
`"rule_resources"` manifest key. The number of rules across **enabled** static rulesets must be less
than the [MAX_NUMBER_OF_RULES][7] constant.

## Rules

A single declarative [Rule][8] consists of four fields: `id`, `priority`, `condition` and `action`.
There are the following kinds of rules:

- Rules that block a network request.
- Rules that prevent a request from getting blocked by negating any matching blocked rules.
- Rules that redirect a network request.
- Rules that modify headers from a network request.

An example rule:

```json
{
  "id" : 1,
  "priority": 1,
  "action" : { "type" : "block" },
  "condition" : {
    "urlFilter" : "abc",
    "domains" : ["foo.com"],
    "resourceTypes" : ["script"]
  }
}
```

The above rule will block all script requests originating from `"foo.com"` to any URL with `"abc"`
as a substring.

The `urlFilter` field of a rule condition is used to specify the pattern which is matched against
the request URL. Some examples of URL filters:

<table><tbody><tr><th><code><b>urlFilter</b></code></th><th>Matches</th><th>Does not match</th></tr><tr><td><code>"abc"</code></td><td>https://abcd.com<br>https://example.com/abcd</td><td>http://ab.com</td></tr><tr><td><code>"abc*d"</code></td><td>https://abcd.com<br>https://example.com/abcxyzd</td><td>http://abc.com</td></tr><tr><td><code>"||a.example.com"</code></td><td>https://a.example.com/<br>https://b.a.example.com/xyz</td><td>http://example.com/</td></tr><tr><td><code>"|https*"</code></td><td>https://example.com</td><td>http://example.com/<br>http://https.com</td></tr><tr><td><code>"example*^123|"</code></td><td>https://example.com/123<br>http://abc.com/example?123</td><td>https://example.com/1234<br>https://abc.com/example0123</td></tr></tbody></table>

## Dynamic rules

To add or remove rules dynamically, extensions can use the [updateDynamicRules][9] API method.

- The number of dynamic rules that an an extension can add is bounded by the
  [MAX_NUMBER_OF_DYNAMIC_RULES][10] constant.
- The dynamic rules for an extension are persisted across both sessions and extension updates.

## Updating enabled rulesets

An extension can update the set of enabled static rulesets using the [updateEnabledRulesets][11] API
method.

- The number of rules across enabled static rulesets must be less than the [MAX_NUMBER_OF_RULES][12]
  constant.
- The set of enabled static rulesets is persisted across sessions but not across extension updates.
  The `rule_resources` manifest key will determine the set of enabled static rulesets on initial
  extension install and on each subsequent extension update.

## Implementation details

### Matching algorithm

Before the request is sent, each extension is queried for an action to take. The following actions
are considered at this stage:

- Actions which block requests of type `block`
- Actions which redirect requests of type `redirect` or `upgradeScheme`
- Actions which allow requests of type `allow` or `allowAllRequests`

If more than one extension returns an action, the extension whose action type comes first in the
list above gets priority. If more than one extension returns an action with the same priority
(position in the list), the most recently installed extension gets priority.

When an extension is queried for how to handle a request, the highest priority matching static or
dynamic rule is returned. If more than one matching rule has the highest priority, the tie is broken
based on the action type, in the following order of decreasing precedence:

- `allow`
- `allowAllRequests`
- `block`
- `upgradeScheme`
- `redirect`

If the request was not blocked or redirected, the matching `modifyHeaders` rules are evaluated with
the most recently installed extensions getting priority. Within each extension, all `modifyHeaders`
rules with a priority lower than matching `allow` or `allowAllRequests` rules are ignored.

If multiple `modifyHeaders` rules specify the same header, the resulting modification for the header
is determined based on the priority of each rule and the operations specified.

- If a rule has appended to a header, then lower priority rules can only append to that header.
  `set` and `remove` operations are not permitted.
- If a rule has set a header, then lower priority rules cannot further modify the header, except for
  `append` rules from the same extension.
- If a rule has removed a header, then lower priority rules cannot further modify the header.

### Comparison with the [webRequest][13] API

- The declarativeNetRequest API allows for evaluating network requests in the browser itself. This
  makes it more performant than the webRequest API, where each network request is evaluated in
  JavaScript in the extension process.
- Because the requests are not intercepted by the extension process, declarativeNetRequest removes
  the need for extensions to have a background page; resulting in less memory consumption.
- Unlike the webRequest API, blocking requests using the declarativeNetRequest API requires no host
  permissions.
- The declarativeNetRequest API provides better privacy to users because extensions can't actually
  read the network requests made on the user's behalf.
- Unlike the webRequest API, any images or iframes blocked using the declarativeNetRequest API are
  automatically collapsed in the DOM.
- While deciding whether a request is to be blocked or redirected, the declarativeNetRequest API is
  given priority over the webRequest API because it allows for synchronous interception. Similarly,
  any headers removed through declarativeNetRequest API are not made visible to web request
  extensions.
- The webRequest API is more flexible as compared to the declarativeNetRequest API because it allows
  extensions to evaluate a request programmatically.

## Example

**manifest.json**

```json
{
  "name": "declarativeNetRequest extension",
  "version": "1",
  "declarative_net_request": {
    "rule_resources": [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules.json"
    }]
  },
  "permissions": [
    "*://*.google.com/*",
    "*://*.abcd.com/*",
    "*://*.example.com/*",
    "http://*.xyz.com/*",
    "*://*.headers.com/*",
    "declarativeNetRequest"
  ],
  "manifest_version": 2
}
```

**rules.json**

```json
[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {"urlFilter": "google.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 2,
    "priority": 1,
    "action": { "type": "allow" },
    "condition": { "urlFilter": "google.com/123", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 3,
    "priority": 2,
    "action": { "type": "block" },
    "condition": { "urlFilter": "google.com/12345", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 4,
    "priority": 1,
    "action": { "type": "redirect", "redirect": { "url": "https://example.com" } },
    "condition": { "urlFilter": "google.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 5,
    "priority": 1,
    "action": { "type": "redirect", "redirect": { "extensionPath": "/a.jpg" } },
    "condition": { "urlFilter": "abcd.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 6,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": { "scheme": "https", "host": "new.example.com" }
      }
    },
    "condition": { "urlFilter": "||example.com", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 7,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://\\1.xyz.com/"
      }
    },
    "condition": {
      "regexFilter": "^http://www\\.(abc|def)\\.xyz\\.com/",
      "resourceTypes": [
        "main_frame"
      ]
    }
  },
  {
    "id" : 8,
    "priority": 2,
    "action" : {
      "type" : "allowAllRequests"
    },
    "condition" : {
      "urlFilter" : "||b.com/path",
      "resourceTypes" : ["sub_frame"]
    }
  },
  {
    "id" : 9,
    "priority": 1,
    "action" : {
      "type" : "block"
    },
    "condition" : {
      "urlFilter" : "script.js",
      "resourceTypes" : ["script"]
    }
  },
  {
    "id": 10,
    "priority": 2,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        { "header": "h1", "operation": "remove" },
        { "header": "h2", "operation": "set", "value": "v2" },
        { "header": "h3", "operation": "append", "value": "v3" }
      ]
    },
    "condition": { "urlFilter": "headers.com/123", "resourceTypes": ["main_frame"] }
  },
  {
    "id": 11,
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        { "header": "h1", "operation": "set", "value": "v4" },
        { "header": "h2", "operation": "append", "value": "v5" },
        { "header": "h3", "operation": "append", "value": "v6" }
      ]
    },
    "condition": { "urlFilter": "headers.com/12345", "resourceTypes": ["main_frame"] }
  },
]
```

- Consider a navigation to `"http://google.com"`. Rules with id (1) and (4) match. The request will
  be blocked because blocking rules have higher priority than redirect rules when the `"priority"`
  is the same.
- Consider a navigation to `"http://google.com/1234"`. Rules with id (1), (2), and (4) match.
  Because the request has a matching `allow` rule and no higher priority rules, the request is not
  blocked nor redirected and continues to `"http://google.com/1234"`.
- Consider a navigation to `"http://google.com/12345"` Rules with id (1), (2), (3), and (4) match.
  The request will be blocked because rule (3) has the highest priority, overriding all other
  matching rules.
- Consider a navigation to `"http://abcd.com"`. The rule with id (5) matches. Since rule (5)
  specifies an extension path, the request is redirected to
  `"chrome-extension://<extension-id>/a.jpg"`.
- Consider a navigation to `"http://example.com/path"`. The rule with id (6) matches. Since rule (6)
  specifies a url transform, the request is redirected to `"https://new.example.com/path"`.
- Consider a navigation to `"http://www.abc.xyz.com/path"`. The rule with id (7) matches. The
  request will be redirected to `"https://abc.xyz.com/path"`.
- Consider the following request hierarchy:
  - https://a.com/path (main-frame request)
    - https://b.com/path (sub-frame request, matches rule with id (8))
      - https://c.com/path (sub-frame request, matches rule with id (8))
        - https://c.com/script.js (script request, matches rules with ids (8, 9) but (8) has higher
          priority)
      - https://b.com/script.js (script request, matches rules with ids (8, 9) but (8) has higher
        priority)
    - https://d.com/path (sub-frame request)
      - https://d.com/script.js (script request, matches rule with ids (9))All requests in green
        will be allow-listed due to rule with id (8) and not be evaluated by the extensions'
        ruleset. Requests in red will be blocked due to rule with id (9).
- Consider a navigation to `"http://headers.com/12345"` with response headers
  `{ "h1": "initial_1", "h2": "initial_2" }`. Rules with id (10) and (11) match. The request will
  have its response headers modified to `{ "h2": "v2", "h2": "v5", "h3": "v3", "h3": "v6" }`. Header
  `h1` was removed by (10), `h2` was set by (10) then appended by (11), and `h3` was appended by
  (10) and (11).

[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/declare_permissions
[3]: #type-Ruleset
[4]: #type-Ruleset
[5]: #property-MAX_NUMBER_OF_STATIC_RULESETS
[6]: #type-Ruleset
[7]: #property-MAX_NUMBER_OF_RULES
[8]: #type-Rule
[9]: #method-updateDynamicRules
[10]: #property-MAX_NUMBER_OF_DYNAMIC_RULES
[11]: #method-updateEnabledRulesets
[12]: #property-MAX_NUMBER_OF_RULES
[13]: /docs/extensions/webRequest
