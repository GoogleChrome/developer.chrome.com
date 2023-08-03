---
layout: "layouts/doc-post.njk"
title: "event_rules"
seoTitle: "MV2 - event_rules [Deprecated]"
date: 2015-06-12
updated: 2015-06-15
description: Reference documentation for the event_rules property of manifest.json.
---

{% Partial 'extensions/mv2-legacy-page.md' %}

{% Aside %}
You have been redirected from Manifest V3. Chrome extensions no longer support this feature.
{% endAside %}

The `event_rules` manifest property provides a mechanism to add rules that intercept, block, or
modify web requests in-flight using [declarativeWebRequest][1] or take actions depending on the
content of a page, without requiring permission to read the page's content using
[declarativeContent][2].

## Translating rules from javascript to manifest {: #translation }

The following defines a rule to display a page action if the current page has a video css tag in
javascript:

```js
chrome.declarativeContent.onPageChanged.addRules([{
  actions: [
    new chrome.declarativeContent.ShowPageAction()
  ],
  conditions: [
    new chrome.declarativeContent.PageStateMatcher(
        {css: ["video"]}
    )
  ]
}]);
```

This is the same definition in the manifest:

```json
{
  "name": "Sample extension",
  "event_rules": [{
    "event": "declarativeContent.onPageChanged",
    "actions": [{
      "type": "declarativeContent.ShowPageAction"
    }],
    "conditions": [{
      "type": "declarativeContent.PageStateMatcher",
      "css": ["video"]
    }]
  }],
  ...
}
```

[1]: /docs/extensions/declarativeWebRequest
[2]: /docs/extensions/declarativeContent
