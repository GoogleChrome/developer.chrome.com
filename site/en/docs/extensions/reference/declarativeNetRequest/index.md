---
api: declarativeNetRequest
extra_permissions:
- declarativeNetRequestFeedback
extra_permissions_html:
  <a href="declare_permissions#host-permissions">host permissions</a><br />
  Note that <code>declarativeNetRequestFeedback</code> and host permissions should only be specified when necessary.
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
`"rule_resources"` manifest key. An extension is allowed to enable at least
[GUARANTEED_MINIMUM_STATIC_RULES][7] static rules. Additional static rule sets may or may not be
enabled depending on the available [global static rule limit][8].

## Global Static Rule Limit

In addition to the [GUARANTEED_MINIMUM_STATIC_RULES][9] static rules guaranteed for each extension,
extensions can enable additional static rulesets depending on the available global static rule
limit. This global limit is shared between all extensions and can be used by extensions on a
first-come, first-served basis. Extensions shouldn't depend on the global limit having a specific
value and should instead use the [getAvailableStaticRuleCount][10] API method to find the additional
rule limit available to them.

## Rules

A single declarative [Rule][11] consists of four fields: `id`, `priority`, `condition`, and
`action`. There are the following kinds of rules:

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

## Dynamic and session-scoped rules

An extension can add or remove rules dynamically using the [updateDynamicRules][12] and the [updateSessionRules][17] API methods.
- Rules added using the [updateDynamicRules][12] API method are persisted across both sessions and extension updates.
- Rules added using the [updateSessionRules][17] API method are not persisted across Chrome sessions. These rules are backed in memory by Chrome.
- The number of dynamic and session-scoped rules that an an extension can add is bounded by the [MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES][13] constant.

## Updating enabled rulesets

An extension can update the set of enabled static rulesets using the [updateEnabledRulesets][14] API
method.

- The number of rules across enabled static rulesets across all extensions must not exceed the
  [global limit][15]. Calling [getAvailableStaticRuleCount][10] is recommended to check the number
  of rules an extension can still enable before the global limit is reached.
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

When an extension is queried for how to handle a request, the highest priority matching rule is returned. If more than one matching rule has the highest priority, the tie is broken
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

### Comparison with the [webRequest][16] API

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
[7]: #property-GUARANTEED_MINIMUM_STATIC_RULES
[8]: #global-static-rule-limit
[9]: #property-GUARANTEED_MINIMUM_STATIC_RULES
[10]: #method-getAvailableStaticRuleCount
[11]: #type-Rule
[12]: #method-updateDynamicRules
[13]: #property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES
[14]: #method-updateEnabledRulesets
[15]: #global-static-rule-limit
[16]: /docs/extensions/webRequest
[17]: #method-updateSessionRules