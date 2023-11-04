---
layout: "layouts/doc-post.njk"
title: "Shared modules"
date: 2015-01-05
updated: 2018-05-22
description: How to share code between Chrome Extensions.
---

_Shared Modules_ are permissionless collections of resources that can be shared between
extensions. Common uses of Shared Modules are:

- As an API. You can distribute a Shared Module that can provide HTML, JS, and other resources to
  provide an API that can be updated independently of the extensions that depend on it.
- As a download optimization. The Shared Module contains common resources used by many extensions.
  It's downloaded once, the first time a dependent extension is installed.

## Manifest {: #manifest }

Shared Modules are used through two [manifest][manifest] fields: `"export"` and `"import"`.

### Export {: #export}

The _export_ field indicates an extension is a Shared Module that exports its resources:

```json
{
  "version": "1.0",
  "name": "My Shared Module",
  "export": {
    // Optional list of extension IDs explicitly allowed to
    // import this Shared Module's resources.  If no allowlist
    // is given, all extensions are allowed to import it.
    "allowlist": [
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    ]
  }
  // Note: no permissions are allowed in Shared Modules
}
```

### Import {: #import}

The _import_ field is used by extensions and apps to declare that they depend on the resources from
particular Shared Modules:

```json
{
  "version": "1.0",
  "name": "My Importing Extension",
  ...
  "import": [
    {"id": "cccccccccccccccccccccccccccccccc"},
    {"id": "dddddddddddddddddddddddddddddddd"
     "minimum_version": "0.5" // optional
    },
  ]
}
```

## Accessing resources {: #accessing_resources }

Shared Module resources are accessed by a reserved path _\_modules/SHARED\_MODULE\_ID_ in the root
of your importing extension. For example, to include the script `foo.js` from a Shared Module with
ID "cccccccccccccccccccccccccccccccc", use this path from the root of your extension:

```html
<script src="_modules/cccccccccccccccccccccccccccccccc/foo.js">
```

If the importing extension has ID "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", then the full URL to resources
in the Shared Module is:

```text
chrome-extension://aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/_modules/cccccccccccccccccccccccccccccccc/
```

Note that since resources from Shared Modules are overlaid into the origin of the importing
extension, all privileges granted to the importing extension are available to code in Shared
Modules. Also, the Shared Module can access resources in the importing extension by using
absolute paths.

## Install / uninstall {: #install_uninstall }

A Shared Module is automatically installed from the Chrome Web Store when needed by a dependent extension and automatically uninstalled when the last extension which references it is uninstalled.
To upload an extension that uses a Shared Module, the Shared Module must be published in
the Chrome Web Store and the extension must not be restricted from using the Shared Module by its
allowlist.

During development, you will need to manually install any Shared Modules your extension uses.
Automatic installs do not happen for extensions that are side-loaded or loaded as unpacked
extensions. For locally installed, unpacked Shared Modules, you must use the [key][manifest-key] field to
ensure the Shared Modules use the correct IDs.

[manifest]: /docs/extensions/mv3/manifest/
[manifest-key]: /docs/extensions/mv3/manifest/key
