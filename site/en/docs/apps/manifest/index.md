---
layout: "layouts/doc-post.njk"
title: "Manifest File Format"
seoTitle: "Chrome Apps Manifest File Format [Deprecated]"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Every app has a [JSON][3]\-formatted manifest file, named `manifest.json`, that provides important
information.

## Field summary {: #overview }

The following code shows the supported manifest fields for Apps, with links to the page that
discusses each field.

```json
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
  "cross_origin_embedder_policy": {
    "value": "require-corp"
  },
  "cross_origin_opener_policy": {
    "value": "same-origin"
  },
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

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: https://www.json.org
