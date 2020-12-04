---
layout: "layouts/doc-post.njk"
title: "Manifest File Format"
date: 2012-09-18
updated: 2018-04-26
description: An overview of the manifest.json properties that you can use in your Chrome Extension.
---

Every extension has a [JSON][1]\-formatted manifest file, named `manifest.json`, that provides
important information.

## Field summary {: #overview }

The following code shows the supported manifest fields for Extensions, with links to the page that
discusses each field.

<!-- TODO(kaycebasques): Re-enable all of the links within the code. -->

```
{
  // Required
  "manifest_version": 2,
  "name": "My Extension",
  "version": "versionString",

  // Recommended
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},

  // Pick one (or none)
  "browser_action": {...},
  "page_action": {...},

  // Optional
  "action": ...,
  "author": ...,
  "automation": ...,
  "background": {
    // Recommended
    "persistent": false,
    // Optional
    "service_worker":
  },
  "chrome_settings_overrides": {...},
  "chrome_url_overrides": {...},
  "commands": {...},
  "content_capabilities": ...,
  "content_scripts": [{...}],
  "content_security_policy": "policyString",
  "converted_from_user_script": ...,
  "current_locale": ...,
  "declarative_net_request": ...,
  "devtools_page": "devtools.html",
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": {
    "matches": ["*://*.example.com/*"]
  },
  "file_browser_handlers": [...],
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "homepage_url": "http://path/to/homepage",
  "host_permissions": ...,
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": {
    "keyword": "aString"
  },
  "optional_permissions": ["tabs"],
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "signature": ...,
  "spellcheck": ...,
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...},
  "update_url": "http://path/to/updateInfo.xml",
  "version_name": "aString",
  "web_accessible_resources": [...]
}
```

[1]: https://www.json.org
[2]: /docs/extensions/mv2/manifest/manifest_version
[3]: /docs/extensions/mv2/manifest/name#name
[4]: /docs/extensions/mv2/manifest/version
[5]: /docs/extensions/mv2/manifest/default_locale
[6]: /docs/extensions/mv2/manifest/description
[7]: /docs/extensions/mv2/manifest/icons
[8]: /docs/extensions/browserAction
[9]: /docs/extensions/pageAction
[10]: /docs/extensions/mv2/background_pages
[11]: /docs/extensions/mv2/event_pages
[12]: /docs/extensions/mv2/background_pages
[13]: /docs/extensions/mv2/settings_override
[14]: /docs/extensions/mv2/override
[15]: /docs/extensions/reference/commands
[16]: /docs/extensions/mv2/content_scripts
[17]: /docs/extensions/mv2/contentSecurityPolicy
[18]: /docs/extensions/mv2/devtools
[19]: /docs/extensions/mv2/manifest/event_rules
[20]: /docs/extensions/mv2/manifest/externally_connectable
[21]: /docs/extensions/reference/fileBrowserHandler
[22]: /docs/extensions/mv2/manifest/file_system_provider
[23]: /docs/extensions/mv2/manifest/homepage_url
[24]: /docs/extensions/mv2/shared_modules
[25]: /docs/extensions/mv2/manifest/incognito
[26]: /docs/extensions/mv2/manifest/key
[27]: /docs/extensions/mv2/manifest/minimum_chrome_version
[28]: /docs/extensions/mv2/manifest/nacl_modules
[29]: /docs/extensions/mv2/manifest/offline_enabled
[30]: /docs/extensions/reference/omnibox
[31]: /docs/extensions/reference/permissions
[32]: /docs/extensions/mv2/options
[33]: /docs/extensions/mv2/optionsV2
[34]: /docs/extensions/mv2/declare_permissions
[35]: /docs/extensions/mv2/manifest/requirements
[36]: /docs/extensions/mv2/manifest/sandbox
[37]: /docs/extensions/mv2/manifest/name#short_name
[38]: /docs/extensions/mv2/manifest/storage
[39]: /docs/extensions/reference/ttsEngine
[40]: /docs/extensions/mv2/autoupdate
[41]: /docs/extensions/mv2/manifest/version
[42]: /docs/extensions/mv2/manifest/web_accessible_resources
