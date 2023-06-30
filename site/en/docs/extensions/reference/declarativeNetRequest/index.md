---
api: declarativeNetRequest
extra_permissions_html:
  <code>declarativeNetRequestFeedback</code><br/>
  <a href="/docs/extensions/mv3/declare_permissions#host-permissions">host permissions</a><br />
has_warning: One or more of these permissions <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.

---

## Manifest {: #manifest }

Extensions must declare either the `declarativeNetRequest` or the
`declarativeNetRequestWithHostAccess` (available since **Chrome 96**) permission in the extension
[manifest][1] to use this API. The former allows extensions to block and upgrade requests without
any [host permissions][2]. Host permissions are still required if the extension wants to redirect a
request or modify headers on it. The `declarativeNetRequestWithHostAccess` permission always
requires host permissions to the request URL and initiator to act on a request.

The `declarativeNetRequestFeedback` permission is required to access functions and events which
return information on declarative rules matched.

To specify static [Rulesets][3], extensions must also declare the `"declarative_net_request"`
manifest key, which should be a dictionary with a single key called `"rule_resources"`. It should be
a list containing dictionaries of type [Ruleset][3], as shown below.

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
  ],
  "host_permissions": [
    "http://www.blogger.com/*",
    "http://*.google.com/*"
  ],
  ...
}
```

### Rule Resources {: #manifest-rule-resources }

Rules are specified in JSON files referenced under the `"rule_resources"` manifest key.

Each file should contain an array of [rules](#rules) as in the [example](#example).

**Note:** Errors and warnings about invalid static rules are only displayed for unpacked extensions.
Invalid static rules in packed extensions are ignored. It's therefore important to verify that your
static rulesets are valid by testing with an unpacked version of your extension.

## Limits {: #limits }

There is a performance overhead to loading and evaluating rules in the browser,
and so a number of limits apply when using the API. Limits depend on the type of
rule you're using.

### Static rules {: #static-rules }

Static rules are those specified in rule files (which are specified in the manifest file). 

An extension can specify up to **50** static [rulesets][3] as part of the
`"rule_resources"` manifest key, but only **10** of these rulesets can be
enabled at a time. The latter is called the
[`MAX_NUMBER_OF_ENABLED_STATIC_RULESETS`][14]. Collectively, those rulesets are
guaranteed at least **30,000** rules. This is called the
[`GUARANTEED_MINIMUM_STATIC_RULES`][5]. The number of rules available after that
depend on how many rules are enabled by all the extensions installed on a user's
browser. You can find this number at runtime by calling
[`getAvailableStaticRuleCount()`][7]. 

### Dynamic and session rules {: #dynamic-session-rules }

The limits applied to dynamic and session rules are simpler than static rules. The total number of
both cannot exceed **5000**. This is called the
[`MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES`][10].

### Rules that use regex {: #regex-rules }

All types of rules can use regular expressions; however the total number of regex rules, of each type cannot exceed **1000**. This is called the [MAX_NUMBER_OF_REGEX_RULES][15].

## Rules {: #rules }

A single declarative [Rule][8] consists of four fields: `id`, `priority`, `condition`, and
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
    "initiatorDomains" : ["foo.com"],
    "resourceTypes" : ["script"]
  }
}
```

The above rule will block all script requests originating from `"foo.com"` to any URL with `"abc"`
as a substring.

The `urlFilter` field of a rule condition is used to specify the pattern which is matched against
the request URL. It is documented on the [`RuleCondition`](#type-RuleCondition) type below. Some
examples of URL filters:

<table>
    <tbody>
        <tr>
            <th><code><b>urlFilter</b></code></th>
            <th>Matches</th>
            <th>Does not match</th>
        </tr>
        <tr>
            <td><code>"abc"</code></td>
            <td>https://abcd.com<br>https://example.com/abcd</td>
            <td>https://ab.com</td>
        </tr>
        <tr>
            <td><code>"abc*d"</code></td>
            <td>https://abcd.com<br>https://example.com/abcxyzd</td>
            <td>https://abc.com</td>
        </tr>
        <tr>
            <td><code>"||a.example.com"</code></td>
            <td>https://a.example.com/<br>https://b.a.example.com/xyz</td>
            <td>https://example.com/</td>
        </tr>
        <tr>
            <td><code>"|https*"</code></td>
            <td>https://example.com</td>
            <td>http://example.com/<br>http://https.com</td>
        </tr>
        <tr>
            <td><code>"example*^123|"</code></td>
            <td>https://example.com/123<br>http://abc.com/example?123</td>
            <td>https://example.com/1234<br>https://abc.com/example0123</td>
        </tr>
    </tbody>
</table>

## Dynamic and session-scoped rules {: #dynamic-and-session-rules }

An extension can add or remove rules dynamically using the [`updateDynamicRules()`][9] and the [`updateSessionRules()`][13] API methods.
- Rules added using the [`updateDynamicRules()`][9] API method are persisted across both sessions and extension updates.
- Rules added using the [`updateSessionRules()`][13] API method are not persisted across Chrome sessions. These rules are backed in memory by Chrome.
- The number of dynamic and session-scoped rules that an an extension can add is bounded by the [`MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES`][10] constant.

## Updating enabled rulesets {: #update-enabled-rulesets }

An extension can update the set of enabled static rulesets using the [`updateEnabledRulesets()`][11]
method.

- The number of static rulesets which are enabled at one time must not exceed
  [`MAX_NUMBER_OF_ENABLED_STATIC_RULESETS`][14].
- The number of rules across enabled static rulesets across all extensions must not exceed the
  [global limit][6]. Calling [`getAvailableStaticRuleCount()`][7] is recommended to check the number
  of rules an extension can still enable before the global limit is reached.
- The set of enabled static rulesets is persisted across sessions but not across extension updates.
  The `"rule_resources"` manifest key will determine the set of enabled static rulesets on initial
  extension install and on each subsequent extension update.

## Implementation details {: #implementation }

### web_accessible_resources {: #implementation-web-accessible-resources }

When an extension uses declarativeNetRequest APIs to redirect a public resource request to a resource that is not web accessible, it is blocked and will result in an error. The above holds true even if the resource that is not web accessible is owned by the redirecting extension. To declare resources for use with declarativeNetRequest APIs, populate the [`"web_accessible_resources"`](/docs/extensions/mv3/manifest/web_accessible_resources/) array.

### Matching algorithm {: #implementation-matching-algorithm }

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

### Interaction with cached pages {: #implementation-cached-pages }

When rules are applied to browsers with pages in the service worker's cached storage, the browser may ignore the set rule for those specific pages until the cached storage is cleared. This is because cached storage is intended to be persistent, and many features like offline use do not expect the cache to be cleared without also clearing a service worker's registration as well. For cases when extensions utilizing declarativeNetRequest must be enabled and disabled repeatedly, the [`chrome.browsingData`](/docs/extensions/reference/browsingData/) API may be used to clear the cache to guarantee proper functionality.

## Example {: #example }

{% Label %}manifest.json:{% endLabel %}

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
    "declarativeNetRequest"
  ],
  "host_permissions": [
    "*://*.google.com/*",
    "*://*.abcd.com/*",
    "*://*.example.com/*",
    "https://*.xyz.com/*",
    "*://*.headers.com/*",
  ],
  "manifest_version": 3
}
```

{% Label %}rules.json:{% endLabel %}

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
      "regexFilter": "^https://www\\.(abc|def)\\.xyz\\.com/",
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

- Consider a navigation to `"https://google.com"`. Rules with id (1) and (4) match. The request will
  be blocked because blocking rules have higher priority than redirect rules when the `"priority"`
  is the same.
- Consider a navigation to `"https://google.com/1234"`. Rules with id (1), (2), and (4) match.
  Because the request has a matching `allow` rule and no higher priority rules, the request is not
  blocked nor redirected and continues to `"https://google.com/1234"`.
- Consider a navigation to `"https://google.com/12345"` Rules with id (1), (2), (3), and (4) match.
  The request will be blocked because rule (3) has the highest priority, overriding all other
  matching rules.
- Consider a navigation to `"https://abcd.com"`. The rule with id (5) matches. Since rule (5)
  specifies an extension path, the request is redirected to
  `"chrome-extension://EXTENSION_ID/a.jpg"`.
- Consider a navigation to `"http://example.com/path"`. The rule with id (6) matches. Since rule (6)
  specifies a url transform, the request is redirected to `"https://new.example.com/path"`.
- Consider a navigation to `"https://www.abc.xyz.com/path"`. The rule with id (7) matches. The
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
- Consider a navigation to `"https://headers.com/12345"` with response headers
  `{ "h1": "initial_1", "h2": "initial_2" }`. Rules with id (10) and (11) match. The request will
  have its response headers modified to `{ "h2": "v2", "h2": "v5", "h3": "v3", "h3": "v6" }`. Header
  `h1` was removed by (10), `h2` was set by (10) then appended by (11), and `h3` was appended by
  (10) and (11).

To try the `chrome.declarativeNetRequest` API,
install the [declarativeNetRequest samples](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/declarativeNetRequest) from the [chrome-extension-samples](https://github.com/GoogleChrome/chrome-extensions-samples)
repository.

[1]: /docs/extensions/mv3/manifest
[2]: /docs/extensions/mv3/declare_permissions
[3]: #type-Ruleset
[4]: #property-MAX_NUMBER_OF_STATIC_RULESETS
[5]: #property-GUARANTEED_MINIMUM_STATIC_RULES
[6]: #limits-global-static-rule-limit
[7]: #method-getAvailableStaticRuleCount
[8]: #type-Rule
[9]: #method-updateDynamicRules
[10]: #property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES
[11]: #method-updateEnabledRulesets
[12]: /docs/extensions/webRequest
[13]: #method-updateSessionRules
[14]: #property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS
[15]: #property-MAX_NUMBER_OF_REGEX_RULES
