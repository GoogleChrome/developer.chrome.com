---
api: declarativeNetRequest
extra_permissions_html:
  <code>declarativeNetRequestFeedback</code><br/>
  <a href="/docs/extensions/mv3/declare_permissions#host-permissions"><code>host_permissions</code></a><br />
has_warning:
  <p>One or more of these permissions <a href="/docs/extensions/mv3/permission_warnings/#permissions_with_warnings">triggers a warning</a>. The <code>declarativeNetRequest</code> and <code>declarativeNetRequestWithHostAccess</code> permissions provide the same capabilities, and both require host permissions; however, the latter prevents host permission warnings.</p>
---

## Manifest {: #manifest }

In addition to the permissions described above, certain types of rulesets, static rulesets specifically, require declaring the `"declarative_net_request"` manifest key, which should be a dictionary with a single key called `"rule_resources"`. This key is an array containing dictionaries of type `Ruleset`, as shown below. (Note that the name 'Ruleset' does not appear in the manifest's JSON since it is merely an array.) [Static rulesets](#rules) are explained later in this document.

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

## Concepts and usage {: #concepts-and-usage }

To use this API, specify one or more rulesets. A ruleset contains an array of rules. A single rule does one of the following:

-  Block a network request.
-  Upgrade the schema (http to https).
-  Prevent a request from getting blocked by negating any matching blocked rules.
-  Redirect a network request.
-  Modify request or response headers.

There are three types of rulesets, managed in slightly different ways.

Dynamic
: Persist across browser sessions and extension upgrades and are managed using JavaScript while an extension is in use.

Session
: Cleared when the browser shuts down and when a new version of the extension is installed. Session rules are managed using JavaScript while an extension is in use.

Static
: Packaged, installed, and updated when an extension is installed or upgraded. Static rules are stored in JSON-formatted rule files and listed in the manifest file.

The next few sections explain ruleset types in detail.

### Dynamic and session-scoped rulesets {: #dynamic-and-session-rules }

Dynamic and session rulesets are managed using JavaScript while an extension is in use.

-  Dynamic rules persist across browser sessions and extension upgrades.
-  Session rules are cleared when the browser shuts down and when a new version of the extension is installed.

There is only one each of these ruleset types. An extension can add or remove rules to them dynamically by calling [`updateDynamicRules()`](/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules) and [`updateSessionRules()`](/docs/extensions/reference/declarativeNetRequest/#method-updateSessionRules), provided the rule limits aren't exceeded. For information on rule limits, see [Rule limits](#limits). You can see [an example of this](#update-dynamic-rule-examples) under [code examples](#code-examples).

### Static rulesets {: #rules }

Unlike dynamic and session rules, static rules are packaged, installed, and updated when an extension is installed or upgraded. They're stored in rule files in JSON format, which are indicated to the extension using the `"declarative_net_request"` and `"rule_resources"` keys [as described above](#manifest), as well as one or more [`Ruleset`](/docs/extensions/reference/declarativeNetRequest/#type-Ruleset) dictionaries. A `Ruleset` dictionary contains a path to the rule file, an ID for the ruleset contained in the file, and whether the ruleset is enabled or disabled. The last two are important when you enable or disable a ruleset programmatically.

```json
{
  ...
  "declarative_net_request" : {
    "rule_resources" : [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules_1.json"
    },
    ...
    ]
  }
  ...
}
```

To test rule files, [load your extension unpacked](/docs/extensions/mv3/getstarted/development-basics/#load-unpacked). Errors and warnings about invalid static rules are only displayed for unpacked extensions. Invalid static rules in packed extensions are ignored.

### Enable and disable static rules and rulesets {: #update-rules-rulesets }

Both individual static rules and complete static rulesets may be enabled or disabled at runtime. {: #update-enabled-rulesets }

The set of enabled static rules and rulesets is persisted across browser sessions. Neither are persisted across extension updates, meaning that only rules you chose to leave in your rule files are available after an update.

For performance reasons there are also limits to the number of rules and rulesets that may be enabled at one time. Call [`getAvailableStaticRuleCount()`](#method-getAvailableStaticRuleCount) to check the number of additional rules that may be enabled. For information on rule limits, see [Rule limits](#limits).

To enable or disable static _rules_, call [`updateStaticRules()`](#method-updateStaticRules). This method takes an [`UpdateStaticRulesOptions`](#type-UpdateStaticRulesOptions) object, which contains arrays of IDs of rules to enable or disable. The IDs are defined using the `"id"` key of the `Ruleset` dictionary.

To enable or disable static _rulesets_, call [`updateEnabledRulesets()`](#method-updateEnabledRulesets). This method takes an [`UpdateRulesetOptions`](#type-UpdateRulesetOptions) object, which contains arrays of IDs of rulesets to enable or disable. The IDs are defined using the `"id"` key of the `Ruleset` dictionary.

### Build rules {: #build-rules }

Regardless of type, a rule starts with four fields as shown below. While the `"id"` and `"priority"` keys take a number, the [`"action"`](#property-Rule-action) and [`"condition"`](#property-Rule-condition) keys may provide several blocking and redirecting conditions. The following rule blocks all script requests originating from `"foo.com"` to any URL with `"abc"` as a substring.

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

### urlFilter matching characters {: #filter-matching-charactgers }

A rule's `"condition"` key allows a `"urlFilter"` key for acting on URLs under a specified domain. You create patterns using [pattern matching tokens](/docs/extensions/reference/declarativeNetRequest/#property-RuleCondition-urlFilter). A few examples are shown below.

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

{% Aside 'caution' %}
Avoid writing rules with the same action and priority that must run in a particular order. Rules with the same action and priority (e.g., redirect rules with priority 1) are executed in an arbitrary order which is not defined and can change between runs or browser versions, even when spread between multiple types of ruleset (e.g, a static rule and a session rule). This is the case across browsers.
{% endAside %}

#### Rule prioritization within an extension {: #rule-prioritization-within-an-extension }

Within a single extension, prioritization is worked out using the following process:

1. The rule with the highest developer-defined priority (in other words, the `"priority"` field) is returned.
1. If there is more than one rule with the highest developer-defined priority, rules are prioritized using the `"action"` field, in the following order:
    1. `allow`
    1. `allowAllRequests`
    1. `block`
    1. `upgradeScheme`
    1. `redirect`

1. If the action type is not `block` or `redirect`, any matching `modifyHeaders` rules are evaluated. Be aware that if there are any rules with a developer-defined priority lower than the priority specified for `allow` and `allowAllRequests`, such rules are ignored.
1. If multiple rules modify the same header, modification is determined by the developer-defined `"priority"` field and by the specified operations.
    -  If a rule appends to a header, then lower priority rules can only append to that header. Set and remove operations are not allowed.
    -  If a rule sets a header, then lower priority rules can only append to that header. No other modifications are allowed.
    -  If a rule removes a header, then lower priority rules cannot further modify the header.

#### Rule prioritization between extensions {: #rule-prioritization-between-extensions }

If only one extension has a rule that matches a request, that rule is applied. But if more than one extension matches a request, the following process is used:

1. Rules are prioritized using the `"action"` field, in the following order:
    1. `block`
    1. `redirect` or `upgradeScheme`
    1. `allow` or `allowAllRequests`

1. If more than one rule matches, the most recently installed extension gets priority.

### Rule limits {: #limits }

There is a performance overhead to loading and evaluating rules in the browser,
so some limits apply when using the API. Limits depend on the type of
rule you're using.

#### Static rules {: #static-rules }

Static rules are those specified in rule files declared in the manifest file. An extension can specify up to 100 static [rulesets](#type-Ruleset) as part of the `"rule_resources"` manifest key, but only 50 of these rulesets can be enabled at a time. The latter is called the [`MAX_NUMBER_OF_ENABLED_STATIC_RULESETS`](#property-MAX_NUMBER_OF_ENABLED_STATIC_RULESETS). Collectively, those rulesets are guaranteed at least 30,000 rules. This is called the [`GUARANTEED_MINIMUM_STATIC_RULES`](#property-GUARANTEED_MINIMUM_STATIC_RULES).

{% Aside 'note' %}
Prior to Chrome 120, extensions were limited to a total of 50 static rulesets, and only 10 of these
could be enabled at the same time. Use the [`minimum_chrome_version`][minimum-chrome-version]
manifest field to limit which Chrome versions can install your extension.
{% endAside %}

The number of rules available after that depends on how many rules are enabled by all the extensions installed on a user's browser. You can find this number at runtime by calling [`getAvailableStaticRuleCount()`](#method-getAvailableStaticRuleCount). You can see [an example of this](#update-static-rulesets) under [code examples](#code-examples).

#### Session rules {: #session-rules }

An extension can have up to 5000 session rules. This is exposed as the
[`MAX_NUMBER_OF_SESSION_RULES`](#property-MAX_NUMBER_OF_SESSION_RULES).

Before Chrome 120, there was a limit of 5000 combined dynamic and session rules.

#### Dynamic rules {: #dynamic-rules }

An extension can have at least 5000 dynamic rules. This is exposed as the
[`MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES`](#property-MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES).

Starting in Chrome 121, there is a larger limit of 30,000 rules available for safe dynamic rules,
exposed as the [`MAX_NUMBER_OF_DYNAMIC_RULES`](#property-MAX_NUMBER_OF_DYNAMIC_RULES). Safe rules
are defined as rules with an action of `block`, `allow`, `allowAllRequests` or `upgradeScheme`. Any
unsafe rules added within the limit of 5000 will also count towards this limit.

Before Chrome 120, there was a 5000 combined dynamic and session rules limit.

#### Rules that use regex {: #regex-rules }

All types of rules can use regular expressions; however, the total number of regex rules of each type cannot exceed 1000. This is called the [MAX_NUMBER_OF_REGEX_RULES](#property-MAX_NUMBER_OF_REGEX_RULES).

Additionally, each rule must be less than 2KB once compiled. This roughly correlates with the complexity of the rule. If you try to load a rule that exceeds this limit, you will see a warning like the one below and the rule will be ignored.

```bash
rules_1.json: Rule with id 1 specified a more complex regex than allowed
as part of the "regexFilter" key.
```

### Interactions with service workers {: #interact-w-service-workers }

A declarativeNetRequest only applies to requests that reach the network stack. This includes responses from the HTTP cache, but may not include responses that go through a service worker's `onfetch` handler. declarativeNetRequest won't affect responses generated by the service worker or retrieved from `CacheStorage`, but it will affect calls to `fetch()` made in a service worker.

### Web accessible resources {: #implementation-web-accessible-resources }

A declarativeNetRequest rule cannot redirect from a public resource request to a resource that is not web accessible. Doing so triggers an error. This is true even if the specified web accessible resource is owned by the redirecting extension. To declare resources for declarativeNetRequest, use the manifest's [`"web_accessible_resources"`](/docs/extensions/mv3/manifest/web_accessible_resources/) array.

## Examples {: #example }

### Code examples {: #code-examples }

#### Update dynamic rules {: #update-dynamic-rule-examples }

The following example shows how to call `updateDynamicRules()`. The procedure for `updateSessionRules()` is the same.

```js
// Get arrays containing new and old rules
const newRules = await getNewRules();
const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
const oldRuleIds = oldRules.map(rule => rule.id);

// Use the arrays to update the dynamic rules
await chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: oldRuleIds,
  addRules: newRules
});
```

#### Update static rulesets {: #update-static-rulesets }

The following example shows how to enable and disable rulesets while considering the number of available and the maximum number of enabled static rulesets. You would do this when the number of static rules you need exceeds the number allowed. For this to work, some of your rulesets should be installed with some of your rulesets disabled (setting `"Enabled"` to `false` within the manifest file).

```js
async function updateStaticRules(enableRulesetIds, disableCandidateIds) {
  // Create the options structure for the call to updateEnabledRulesets()
  let options = { enableRulesetIds: enableRulesetIds }
  // Get the number of enabled static rules
  const enabledStaticCount = await chrome.declarativeNetRequest.getEnabledRulesets();
  // Compare rule counts to determine if anything needs to be disabled so that
  // new rules can be enabled
  const proposedCount = enableRulesetIds.length;
  if (enabledStaticCount + proposedCount > chrome.declarativeNetRequest.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS) {
    options.disableRulesetIds = disableCandidateIds
  }
  // Update the enabled static rules
  await chrome.declarativeNetRequest.updateEnabledRulesets(options);
}
```

### Rule examples {: #rule-examples }
The examples below illustrate how Chrome prioritizes rules in an extension. When reviewing them, you may want to open the [prioritization](#implementation-matching-algorithm) rules in a separate window.

#### The "priority" key {: #priority-key }

These examples require [host permission](/docs/extensions/mv3/declare_permissions/) to `*://*.example.com/*`.

To work out the priority of a particular URL, look at the (developer-defined) `"priority"` key, the `"action"` key and the `"urlFilter"` key. These examples refer to the example rule file shown below them.

Navigation to https://google.com
: Two rules cover this URL: the rules with IDs 1 and 4. The rule with ID 1 applies because `"block"` actions have a higher priority than `"redirect"` actions. The remaining rules do not apply because they are for longer URLs.

Navigation to https://google.com/1234
: Because of the longer URL, the rule with ID 2 now matches in addition to the rules with IDs 1 and 4. The rule with ID 2 applies because `"allow"` has a higher priority than `"block"` and `"redirect"`.

Navigation to https://google.com/12345
: All four rules match this URL. The rule with ID 3 applies because its developer-defined priority is the highest of the group.

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

#### Redirects {: #redirects }

The example below requires [host permission](/docs/extensions/mv3/declare_permissions/) to `*://*.example.com/*`.

The following example shows how to redirect a request from example.com to a page within the extension itself. The extension path `/a.jpg` resolves to `chrome-extension://EXTENSION_ID/a.jpg`, where `EXTENSION_ID` is the ID of your extension. For this to work the manifest should declare `/a.jpg` as a [web accessible resource](/docs/extensions/mv3/manifest/web_accessible_resources/).

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

The following example uses regular expressions to redirect from `https://www.abc.xyz.com/path` to `https://abc.xyz.com/path`. In the `"regexFilter"` key, notice how periods are escaped and that the capturing group selects either "abc" or "def". The `"regexSubstitution"` key specifies the first returned match of the regular expression using "\\1". In this case, "abc" is captured from the redirected URL and placed in the substitution.

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

#### Headers {: #headers }

The following example removes all cookies from both a main frame and any sub frames.

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
[minimum-chrome-version]: /docs/extensions/mv3/manifest/minimum_chrome_version/
