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
[2]: /docs/extensions/manifest/manifest_version
[3]: /docs/extensions/manifest/name#name
[4]: /docs/extensions/manifest/version
[5]: /docs/extensions/manifest/default_locale
[6]: /docs/extensions/manifest/description
[7]: /docs/extensions/manifest/icons
[8]: /docs/extensions/browserAction
[9]: /docs/extensions/pageAction
[10]: /docs/extensions/background_pages
[11]: /docs/extensions/event_pages
[12]: /docs/extensions/background_pages
[13]: /docs/extensions/settings_override
[14]: /docs/extensions/override
[15]: /docs/extensions/commands
[16]: /docs/extensions/content_scripts
[17]: /docs/extensions/contentSecurityPolicy
[18]: /docs/extensions/devtools
[19]: /docs/extensions/manifest/event_rules
[20]: /docs/extensions/manifest/externally_connectable
[21]: /docs/extensions/fileBrowserHandler
[22]: /docs/extensions/manifest/file_system_provider
[23]: /docs/extensions/manifest/homepage_url
[24]: /docs/extensions/shared_modules
[25]: /docs/extensions/manifest/incognito
[26]: /docs/extensions/manifest/key
[27]: /docs/extensions/manifest/minimum_chrome_version
[28]: /docs/extensions/manifest/nacl_modules
[29]: /docs/extensions/manifest/offline_enabled
[30]: /docs/extensions/omnibox
[31]: /docs/extensions/permissions
[32]: /docs/extensions/options
[33]: /docs/extensions/optionsV2
[34]: /docs/extensions/declare_permissions
[35]: /docs/extensions/manifest/requirements
[36]: /docs/extensions/manifest/sandbox
[37]: /docs/extensions/manifest/name#short_name
[38]: /docs/extensions/manifest/storage
[39]: /docs/extensions/ttsEngine
[40]: /docs/extensions/autoupdate
[41]: /docs/extensions/manifest/version
[42]: /docs/extensions/manifest/web_accessible_resources
