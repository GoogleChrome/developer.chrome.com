---
layout: "layouts/doc-post.njk"
title: "Manifest - declarativeNetRequest"
date: 2022-12-13
description: Reference documentation for the declarativeNetRequest property of manifest.json.
---

An optional manifest key and permission enabling the [declarativeNetRequest API](/docs/extensions/reference/declarativeNetRequest/). Using `declarativeNetRequest`, you can block or modify network requests by specifying declarative rules. This lets extensions modify network requests without intercepting them and viewing their content, providing more privacy. Runtime modification and registration of declarativeNetRequest rules can be done with only the permission requested, without the need for the full manifest key implementation.
The manifest key accepts a dictionary with a single key called `"rule_resources"`, containing a list of static ruleset dictionaries. Either the `"declarativeNetRequest"` or `"declarativeNetRequestWithHostAccess"` permissions must be added, with `"declarativeNetRequestFeedback"` available as an additional permission for debugging. `"host_permissions"` are required for certain actions that a rule can perform, if only using the `"declarativeNetRequest"` permission.
A list of specified  `"host_permissions"` URLs are also required.

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
  "http://www.blogger.com/",
  "http://*.google.com/"
],
  ...
}
```

It must be noted that extensions cannot clear the browser's cache storage or service worker registrations automatically. When enabling an extension using `declarativeNetRequest` rules to block certain sites, the rule may be ignored depending on if the site is cached. This caching can persist after browser restarts. You use the `chrome.browsingData` API to clear the browser memory manually to ensure specified `declarativeNetRequest` rules are followed. 
