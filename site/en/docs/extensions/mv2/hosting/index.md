---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store"
date: 2012-09-18
updated: 2018-06-12
description: >
  How to host your extension in the Chrome Web Store and update an extension
  that's hosted in the Chrome Web Store.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Most extensions are hosted in the [Chrome Web Store][1] to best [protect users from malicious
extensions][2].

## Hosting {: #hosting }

All extensions are distributed to users as a special ZIP file with a `.crx` suffix. Extensions
hosted in the [Chrome Web Store][3] are uploaded through the [Developer Dashboard][4] as `.zip`
files. The [publishing][5] process automatically converts the `.zip` into a `.crx` file.

There are three exceptions to the Chrome Web Store hosting rule:

1.  Extensions that are distributed through the [enterprise policy][6].
2.  Unpacked extension directories from a local machine while in [developer mode][7].
3.  [Linux installation][8].

[Read more about the hosting policy][9].

## Updating {: #updating }

The Chrome Browser periodically checks for new versions of installed extensions and updates them
without user intervention.

To release an update to an extension, increase the number in the `"version"` field of the manifest.

```json
{
  ...
  "version": "1.5",
  ...
  }
}
```

```json
{
  ...
  "version": "1.6",
  ...
  }
}
```

Convert the updated extension directory into a ZIP file and locate the old version in the [Developer
Dashboard][10]. Select **Edit**, upload the new package, and hit **Publish**. The browser will
automatically update the extension for users after the new version is published.

[1]: https://chrome.google.com/webstore/category/extensions
[2]: http://blog.chromium.org/2015/05/continuing-to-protect-chrome-users-from.html
[3]: /webstore
[4]: https://chrome.google.com/webstore/developer/dashboard
[5]: /webstore/publish
[6]: https://support.google.com/chrome/a/answer/188453
[7]: /docs/extensions/mv2/getstarted#unpacked
[8]: /linux_hosting
[9]: /hosting_changes
[10]: https://chrome.google.com/webstore/developer/dashboard
