---
layout: 'layouts/doc-post.njk'
title: Update the manifest
subhead: Convert a V2 manifest to a V3 manifest
description: The manifest.json file requires a slightly different format for Manifest V3 than for Manifest V2.
date: 2023-03-09
---

{% Partial 'extensions/mv3-support.md' %}

The `manifest.json` file requires a slightly different format for Manifest V3 than for Manifest V2. This page describes changes that only affect the `manifest.json` file. But many of the changes to scripts and pages also require changes to the manifest. Those changes are covered with the migration tasks that require them.

## Change the manifest version number {: #change-version }

Change the value of the `"manifest_version"` field from 2 to 3.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
{
  ...
  "manifest_version": 2
  ...
}
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json
{
  ...
  "manifest_version": 3
  ...
}
```

{% endCompare %}
</div>

## Update host permissions {: #update-host-permissions }

Host permissions in Manifest V3 are a separate field; you don't specify them in `"permissions"` or in `"optional_permissions"`. 

[Content scripts](/docs/extensions/mv3/content_scripts/#static-declarative) remain under `"content_scripts.matches"`. See [Inject with static declarations](/docs/extensions/mv3/content_scripts/#static-declarative) for information on `"content_scripts.matches"`.

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json/5,9
{
  ...
  "permissions": [
    "tabs",
    "bookmarks",
    "https://www.blogger.com/",
  ],
  "optional_permissions": [
    "unlimitedStorage",
    "*://*/*",
  ]
  ...
}
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json/9-14
{
  ...
  "permissions": [
    "tabs",
    "bookmarks"
  ],
  "optional_permissions": [
    "unlimitedStorage"
  ],
  "host_permissions": [
    "https://www.blogger.com/",
  ],
  "optional_host_permissions": [
    "*://*/*",
  ]
  ...
}
```

{% endCompare %}
</div>

## Update web accessible resources {: #update-wa-resources }

Web accessible resources are files inside an extension that can be accessed by web pages or other extensions. As implemented in Manifest V2, the `"web_accessible_resources"` field made extensions detectable by websites and attackers if the extension chose to expose resources. This created opportunities for fingerprinting or unintentional resource access. 

Manifest V3 limits exposure by restricting which web sites and extensions can access resources in your extension. Instead of providing a list of files as before, you now provide an *array of objects*, each of which maps a set of resources to a set of URLs or extension IDs.

The example below compares web accessible resources between Manifest V2 and Manifest V3. In Manifest V2, the specified resources were accessible to all web sites by default. In the Manifest V3 code shown below, these resources are only available to `https://example.com`, while only certain images are available to all web sites.

For more information, see [Web accessible resources](/docs/extensions/mv3/manifest/web_accessible_resources/) and [Match patterns](/docs/extensions/mv3/match_patterns/).

<div class="switcher">
{% Compare 'worse', 'Manifest V2' %}
```json
{
  ...
  "web_accessible_resources": [
    "images/*",
    "style/extension.css",
    "script/extension.js"
  ],
  ...
}
```

{% endCompare %}

{% Compare 'better', 'Manifest V3' %}
```json/4-7
{
  ...
    "web_accessible_resources": [
    {
      "resources": [
        "images/*"
      ],
      "matches": [
        "*://*/*"
      ]
    },
    {
      "resources": [
        "style/extension.css",
        "script/extension.js"
      ],
      "matches": [
        "https://example.com/*"
      ]
    }
  ],
  ...
}
```

{% endCompare %}
</div>
