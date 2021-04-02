---
api: declarativeNetRequest
extra_permissions:
- declarativeNetRequestFeedback
extra_permissions_html:
  <a href="declare_permissions#host-permissions">host permissions</a><br />
---

Use this API to block or modify network requests by specifying declarative rules. This lets
extensions modify network requests without intercepting them and viewing their content, thus
providing more privacy.

{% Aside %}
See [Using chrome.declarativeNetRequest][howto-dnr] for an expanded explanation of how to use this
API.
{% endAside %}

## Manifest

Extensions must declare the `"declarativeNetRequest"` permission in the extension [manifest][1] to
use this API. Additional permissions are required in some cases:

* The `"declarativeNetRequestFeedback"` permission &mdash; Provides access to functions or
  events that return information on declarative rules matched.
* [Host permissions][2] &mdash; Required if the extension wants to redirect requests or modify headers.

To specify static [Rulesets][3], extensions must also declare the `"declarative_net_request"`
manifest key, which should be a dictionary with a single key called `"rule_resources"`. It should be
a list containing dictionaries of type [Ruleset][4], as shown below.

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

## Rule limits

* Maximum per extension: Each extension must not specify more than
  [MAX_NUMBER_OF_STATIC_RULESETS][5] [rulesets][6] under the `"rule_resources"` manifest key.
* Global maximum: There is a global pool for all extensions. See (********) for more information.
* Guaranteed minimum: An extension can enable at least
  [GUARANTEED_MINIMUM_STATIC_RULES][7] static rules regardless of the available [global static rule
  limit][8].

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
.
.
.
]
```

{% Aside %}
For an expanded example of rulesets and their use, see [Using declarativeNetRequest][howto-rules].
{% endAside %}


[howto-dnr]: /docs/extensions/api-howto/declarativeNetRequest
[howto-rules]: /docs/extensions/api-howto/declarativeNetRequest/#rule-resources
[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/declare_permissions
[3]: #type-Ruleset
[4]: #type-Ruleset
[5]: #property-MAX_NUMBER_OF_STATIC_RULESETS
[6]: #type-Ruleset
[7]: #property-GUARANTEED_MINIMUM_STATIC_RULES
[8]: /docs/extensions/api-howto/declarativeNetRequest#global-static-rule-limit
[9]: #property-GUARANTEED_MINIMUM_STATIC_RULES
[10]: #method-getAvailableStaticRuleCount
[11]: #type-Rule
[12]: #method-updateDynamicRules
[13]: #property-MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES
[14]: #method-updateEnabledRulesets
[15]: #global-static-rule-limit
[16]: /docs/extensions/webRequest
[17]: #method-updateSessionRules
