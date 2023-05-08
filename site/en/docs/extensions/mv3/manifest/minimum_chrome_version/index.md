---
layout: "layouts/doc-post.njk"
title: "Manifest - Minimum Chrome Version"
seoTitle: "Chrome Extensions Manifest: minimum_chrome_version"
date: 2013-05-12
updated: 2023-02-14
description: Reference documentation for the minimum_chrome_version property of manifest.json.
---

An optional manifest key containing a string that defines which versions of
Chrome are able to install the extension. The value set for this string must be
a substring of an existing Chrome browser version string. You can use a full version
number to specify a specific update to Chrome, or you can use the first number
in the string to specify a particular major version.

 ```json
{
  // ...
  "minimum_chrome_version": "107.0.5304.87", // Can also be abbreviated to "107", "107.0", or "107.0.5304"
  // ...
}
```

## Enforcement

### New Installs

In versions of Chrome older than the minimum version, the Chrome Web Store
will show a "Not compatible" message in place of the install button. Users on
these versions will not be able to install your extension.

### Existing Installs

Existing users of your extension will not receive updates when the
`minimum_chrome_version` is higher than their current browser version. This
happens silently so you should exercise caution and consider ways of letting
existing users know that they are no longer receiving updates.
