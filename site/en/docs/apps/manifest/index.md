---
layout: "layouts/doc-post.njk"
title: "Manifest File Format"
#date: TODO
#updated: TODO
#description: TODO
---

!!!.aside.aside--caution

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

!!!

Every app has a [JSON][3]\-formatted manifest file, named `manifest.json`, that provides important
information.

## Field summary {: #overview }

The following code shows the supported manifest fields for Apps, with links to the page that
discusses each field.

```
{
  // Required
  "app": {
    "background": {
      // Optional
      "scripts": ["background.js"]
    }
  },
  "manifest_version": 2,
  "name": "My App",
  "version": "versionString",

  // Recommended
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},

  // Optional
  "action_handlers": ["new_note"],
  "author": ...,
  "automation": ...,
  "bluetooth": {
    "uuids": ["1105", "1006"]
  },
  "commands": {...},
  "current_locale": ...,
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": {
    "matches": ["*://*.example.com/*"]
  },
  "file_handlers": {...},
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "key": "publicKey",
  "kiosk": {
    "always_update": ...,
    "required_platform_version": ...
  },
  "kiosk_enabled": true,
  "kiosk_only": true,
  "kiosk_secondary_apps": ...,
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "oauth2": ...,
  "offline_enabled": true,
  "optional_permissions": ["tabs"],
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_android_app": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "signature": ...,
  "sockets": {
    "tcp": {
      "connect": "*"
    },
    "udp": {
      "send": "*"
    }
  },
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "update_url": "http://path/to/updateInfo.xml",
  "url_handlers": {...},
  "usb_printers": {
    "filters": [...]
  },
  "version_name": "aString",
  "webview": {...}
}
```

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: https://developer.chrome.com/apps/migration
[3]: https://www.json.org
[4]: manifest/app
[5]: manifest/app
[6]: manifest/manifest_version
[7]: manifest/name#name
[8]: manifest/version
[9]: manifest/default_locale
[10]: manifest/description
[11]: manifest/icons
[12]: manifest/action_handlers
[13]: manifest/bluetooth
[14]: commands
[15]: manifest/event_rules
[16]: manifest/externally_connectable
[17]: manifest/file_handlers
[18]: manifest/file_system_provider
[19]: shared_modules
[20]: manifest/key
[21]: manifest/kiosk_enabled#kiosk_enabled
[22]: manifest/kiosk_enabled#kiosk_only
[23]: manifest/minimum_chrome_version
[24]: manifest/nacl_modules
[25]: manifest/offline_enabled
[26]: permissions
[27]: declare_permissions
[28]: manifest/requirements
[29]: manifest/sandbox
[30]: manifest/name#short_name
[31]: manifest/sockets
[32]: manifest/storage
[33]: autoupdate
[34]: manifest/url_handlers
[35]: manifest/usb_printers
[36]: manifest/version
[37]: tags/webview#local_resources
