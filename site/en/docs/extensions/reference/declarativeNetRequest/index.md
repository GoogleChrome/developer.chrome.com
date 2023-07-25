---
api: declarativeNetRequest
extra_permissions_html:
  <code>declarativeNetRequestFeedback</code><br/>
  <a href="/docs/extensions/mv3/declare_permissions#host-permissions">host permissions</a><br />
has_warning: One or more of these permissions <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>.

---

## Manifest {: #manifest }

### Permissions {: #permission-definitions }

`declarativeNetRequest`
: Allows extensions to block and upgrade requests.

`declarativeNetRequestWithHostAccess`
: Allows extensions to redirect requests and modify request and response headers. This permission always requires [host permissions](/docs/extensions/mv3/declare_permissions/) to the request URL and initiator to act on a request.

`declarativeNetRequestFeedback`
: Allows access functions and events that return information on matched rules during debugging. This permission only works in [unpacked extensions](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

Certain rules such as redirect and header modification rules also require host permissions which match the network requests that these rules will be applied towards.

### Static rulesets

This API supports multiple ruleset types, which will be described below, but only one type, static rulesets, requires keys in the manifest file. To use static rulesets, declare the `"declarative_net_request"` manifest key, which should be a dictionary with a single key called `"rule_resources"`. It should be a list containing dictionaries of type `Ruleset`, as shown below. These structures will be described in more detail elsewhere.

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

## Concepts and Usage

To use declarative net requests specify one or more rulesets. A ruleset contains an array of rules. A single rule does one of the following:

-  Block a network request.
-  Prevent a request from getting blocked by negating any matching blocked rules.
-  Redirect a network request.
-  Modify request or response headers.

There are three types of rulesets.

-  Static rules
-  Dynamic rules
-  Session rules

### Dynamic and session-scoped rulesets {: #dynamic-and-session-rules }

Dynamic and session-scoped rulesets are managed using JavaScript while an extension is in use.

-  Dynamic rules persist across browser sessions and extension upgrades.
-  Session rules are destroyed when the browser shuts down and when a new version of the extension is installed.

There is only one each of these ruleset types. An extension can add or remove rules to them dynamically by calling [`updateDynamicRules()`](/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules) and [`updateSessionRules()`](/docs/extensions/reference/declarativeNetRequest/#method-updateSessionRules), provided the rule limits aren't exceeded. For information on rule limits, see [Rule limits](#limits).

_Method examples here._

### Static rulesets

Unlike dynamic and session rules, static rules are packaged, installed, and updated with an extension. They're stored in rule files in JSON format, which are indicated to the extension using the `"declarative_net_request"` `"rule_resources"` keys [as described above](#manifest), as well as one or more [`Ruleset`](/docs/extensions/reference/declarativeNetRequest/#type-Ruleset) dictionaries. A `Ruleset` dictionary contains a path to the rule file, an ID for the ruleset contained in the file, and whether the ruleset is enabled or disabled. The last two will be important when you enable or disable a ruleset programmatically.

JSON sample here

To test rule files, [load your extension unpacked](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked). Errors and warnings about invalid static rules are only displayed for unpacked extensions. Invalid static rules in packed extensions are ignored.

### Enable and disable static rulesets

To enable or disable static rulesets, call [`updateEnabledRulesets()`](#method-updateEnabledRulesets). This method takes an [`UpdateRulesetOptions`](#type-UpdateRulesetOptions) object, which contains arrays of IDs of rules to enable or disable. The IDs are defined using the `"id"` key of the `Ruleset` dictionary.

The set of enabled static rulesets is persisted across browser sessions. Static rules are not persisted across exensin updates, meaning that only rules you chose to leave in your rule files are available after an update.

For performance reasons there are also limits to the number of rules and rulesets that may be enabled at one time. Call [`getAvailableStaticRuleCount()`](#method-getAvailableStaticRuleCount) to check the number of additional rules that may be enabled. For information on rule limits, see [Rule limits](#limits).

The following example shows how to and disable rulesets, while taking into account the number of available rules and the global rule limits.

JS sample here

### Build rules

Regardless of type, a rule starts with four fields as shown below. While the `"id"` and `"number"` keys merely take a number, the `"action"` and `"condition"` provide a multitude of blocking and redirecting conditions. For example, the rule below blocks all script requests originating from "foo.com" to any URL with "abc" as a substring.

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

### urlFilter matching characters

A rule's `"condition"` key allows a `"urlFilter"` key for acting on URLs under a specified domain. You create patterns using [pattern matching tokens](/docs/extensions/reference/declarativeNetRequest/#type-RuleCondition:~:text=session%2Dscoped%20rules.-,urlFilter,-string%C2%A0optional). A few examples are shown below.

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

### Rule prioritization {: #implementation-matching-algorithm }

Rules are triggered by requests sent from web pages. If multiple rules match a particular request, then the rules must be prioritized. This section explains how they're prioritized. Prioritization happens in two stages.

1. Priority is determined for rules within an extension.
1. If more than one extension can apply a rule to a request, priority is determined for all extensions that match a particular request.

Thinking of matching this way: whatever rule a particular extension prioritizes will then be prioritized against rules from other extensions.

{% Aside %}
Avoid building rulesets that depend on rules with the same priority running in a particular order. Rules with the same priority in the same set (e.g static rules with priority 1) are executed in an arbitrary order which is not defined and can change between runs or browser versions.
{% endAside %}

#### Rule prioritization within an extension

Within a single extension, prioritization is worked out using the following process:

1. The rule with the highest developer-defined priority (in other words, the `"priority"` field) is returned.
1. If there is more than one rule with the highest developer-defined priority, rules are prioritized using the `"action"` field, in the following order:
    -  `allow`
    -  `allowAllRequests`
    -  `block`
    -  `upgradeScheme`
    -  `redirect`

1. If the action type is not `block` or `redirect`, any matching `modifyHeaders` rules are evaluated. Be aware that if there are any rules with a developer-defined priority lower than the priority specified for `allow` and `allowAllRequests`, such rules will be ignored.
1. If multiple rules modify the same header, modification is determined by the developer-defined `"priority"` field and by the specified operations.
    -  If a rule has appended to a header, then lower priority rules can only append to that header. Set and remove operations are not permitted.
    -  If a rule has set a header, then lower priority rules cannot further modify the header, except for append rules from the same extension.
    -  If a rule has removed a header, then lower priority rules cannot further modify the header.

#### Rule prioritization between extensions

If only one extension has a rule that matches a request, that rule is applied. But if more than one extension matches a request, the following process is used.

1. Rules are prioritized using the `"action"` field, in the following order:
    -  `block`
    -  `redirect` or `upgradeScheme`
    -  `allow` or `allowAllRequests`

1. If more than one rule matches, the most recently installed extension gets priority.

### Rule limits {: #limits }

There is a performance overhead to loading and evaluating rules in the browser,
and so a number of limits apply when using the API. Limits depend on the type of
rule you're using.

#### Static rules {: #static-rules }

Static rules are those specified in rule files (which are specified in the manifest file).

An extension can specify up to **50** static [rulesets](#type-Ruleset) as part of the `"rule_resources"` manifest key, but only **10** of these rulesets can be enabled at a time. The latter is called the [`MAX_NUMBER_OF_ENABLED_STATIC_RULESETS`](#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS). Collectively, those rulesets are guaranteed at least **30,000** rules. This is called the [`GUARANTEED_MINIMUM_STATIC_RULES`](#property-GUARANTEED_MINIMUM_STATIC_RULES). The number of rules available after that depends on how many rules are enabled by all the extensions installed on a user's browser. You can find this number at runtime by calling [`getAvailableStaticRuleCount()`](#method-getAvailableStaticRuleCount).

#### Dynamic and session rules {: #dynamic-session-rules }

The limits applied to dynamic and session rules are simpler than static rules. The total number of both cannot exceed **5000**. This is called the [`MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES`][#property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES].

#### Rules that use regex {: #regex-rules }

All types of rules can use regular expressions; however the total number of regex rules, of each type cannot exceed **1000**. This is called the [MAX_NUMBER_OF_REGEX_RULES](#property-MAX_NUMBER_OF_REGEX_RULES).

### Interaction with cached pages {: #implementation-cached-pages }

If a rule matches a resource in the service worker cache, that rule may be ignored until the resource is cleared from the cache. This is because cached storage is intended to be persistent, and many features such as offline use do not expect the cache to be cleared without also clearing a service worker's registration. For your rules to work properly, you will need to call [`browsingData.removeCache()`](/docs/extensions/reference/browsingData/#method-removeCache) or [`browsingData.removeCacheStorage()`](/docs/extensions/reference/browsingData/#method-removeCacheStorage) after installation of your extension. You may need to call one of these functions after an extension upgrade, depending on whether you've changed your rules.

### Web accessible resources {: #implementation-web-accessible-resources }

A declarative net request cannot redirect from a public resource request to a resource that is not web accessible. Doing so will trigger an error. This is true even if the specified web accessible resource is owned by the redirecting extension. To declare resources for declarative net requests, use the manifest's [`"web_accessible_resources"`](/docs/extensions/mv3/manifest/web_accessible_resources/) array.

## Examples {: #example }

The examples below illustrate various aspects of rule file files. You may want to open the [prioritization](#implementation-matching-algorithm) rules in a separate window when reviewing them.

### The "priority" key

To use the example file shown below, your manifest file would need the following host permission:

`*://*.example.com/*`

To work out the priority of a particular URL, look at the (developer-defined) `"priority"` key, the `"action"` key and the `"urlFilter"` key.

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
]
```

**Navigation to https://google.com**
Two rules cover this URL: the rules with IDs 1 and 4. The rule with ID 1 applies because `"block"` actions have a higher priority than `"redirect"` actions. The remaining rules do not apply because they are for longer URLs.

**Navigation to https://google.com/1234**
Because of the longer URL, the rule with ID 2 now matches in addition to  the rules with IDs 1 and 4. The rule with ID 2 applies because `"allow"` has a higher priority than `"block"` `"redirect"`.

**Navigation to https://google.com/12345**
All four rules match this URL. The rule with ID 3 applies because its developer-defined priority is the highest of the group.

### Redirects

To use the example file shown below, your manifest file would need the following host permission:

`*://*.example.com/*`

The following example shows how to redirect a request from example.com to a page within the extension itself. The extension path `/a.jpg` resolves to `chrome-extension://EXTENSION_ID/a.jpg`, where `EXTENSION_ID` is the ID of your extension.

```json
{
  "id": 1,
  "priority": 1,
  "action": { "type": "redirect", "redirect": { "extensionPath": "/a.jpg" } },
  "condition": {
    "urlFilter": "https://www.example.com",
    "resourceTypes": ["main_frame"]
  }
}
```

The following uses the `"transform"` key to redirect to a subdomain of example.com. It uses a domain name anchor ("||") to intercept requests with any scheme from example.com. The `"scheme"` key in `"transform"` specifies that redirects to the subdomain will always use "https".

```json
{
  "id": 1,
  "priority": 1,
  "action": {
    "type": "redirect",
    "redirect": {
      "transform": { "scheme": "https", "host": "new.example.com" }
    }
  },
  "condition": {
    "urlFilter": "||example.com",
    "resourceTypes": ["main_frame"]
  }
}
```

The following example uses regular expressions to redirect from `https://www.abc.xyz.com/path` to `https://abc.xyz.com/path`. In the `"regexFilter"` key notice how periods are escaped and that the capturing group selects either "abc" or "def". The `"regexSubstitution"` key specifies the first returned match of the regular expression using "\\1". In this case "abc" is captured from the redirected URL and placed in the substitution.

```json
{
  "id": 1,
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
}
```

### Headers

The following example removes all cookies both main and sub frames.

```json
{
  "id": 1,
  "priority": 1,
  "action": {
    "type": "modifyHeaders",
    "requestHeaders": [{ "header": "cookie", "operation": "remove" }]
  },
  "condition": { "resourceTypes": ["main_frame", "sub_frame"] }
}
```





{: #manifest-rule-resources }

{: #rules }



{: #update-enabled-rulesets }

{: #implementation }









