---
layout: "layouts/doc-post.njk"
title: "Manifest Version"
#date: TODO
#updated: TODO
#description: TODO
---

!!!.aside.aside--caution

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

!!!

One integer specifying the version of the manifest file format your package requires. As of Chrome
18, developers _should_ specify `2` (without quotes) to use the format as described by this
document:

```
"manifest_version": 2
```

Consider manifest version 1 _deprecated_ as of Chrome 18. Version 2 is not yet _required_, but we
will, at some point in the not-too-distant future, stop supporting packages using deprecated
manifest versions. Extensions, applications, and themes that aren't ready to make the jump to the
new manifest version in Chrome 18 can either explicitly specify version `1`, or leave the key off
entirely.

The changes between version 1 and version 2 of the manifest file format are described in detail in
[the `manifest_version` documentation.][3]

!!!.aside.aside--caution

Setting `manifest_version` 2 in Chrome 17 or lower is not recommended. If your extension needs to
work in older versions of Chrome, stick with version 1 for the moment. We'll give you ample warning
before version 1 stops working.

!!!

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: https://developer.chrome.com/apps/migration
[3]: https://developer.chrome.com/extensions/manifestVersion
