---
layout: "layouts/doc-post.njk"
title: "Chrome Web Store"
date: 2012-09-18
updated: 2021-12-10
description: >
  How to publish and update your extension in the Chrome Web Store.
---

Most extensions are hosted in the [Chrome Web Store][cws] to best [protect users from malicious
extensions][2].

## Hosting {: #hosting }

All extensions are distributed to users as a special ZIP file with a `.crx` suffix. Extensions
hosted in the [Chrome Web Store][cws-docs] are uploaded through the [Developer Dashboard][developer-console] as `.zip`
files. The publishing process automatically converts the `.zip` into a `.crx` file. See [Publish in
the Chrome Web Store][publish] to learn more. 

There are three exceptions to the Chrome Web Store hosting rule:

1.  Extensions that are distributed through the [enterprise policy][enterprise-policy].
2.  Unpacked extension directories from a local machine while in [developer mode][load-unpacked].
3.  [Linux installation][linux-install].

## Updating {: #updating }

The Chrome Browser periodically checks for new versions of installed extensions and updates them
without user intervention.

To release an update to an extension, increase the number in the [`version`][version] field of the
manifest.

```json
{
  ...
  "version": "1.5",
  ...
}
```

```json
{
  ...
  "version": "1.6",
  ...
}
```

Convert the updated extension directory into a ZIP file and locate the old version in the [Developer
Dashboard][developer-console]. Select **Edit**, upload the new package, and hit **Publish**. The browser will
automatically update the extension for users after the new version is published.

[cws]: https://chrome.google.com/webstore/
[2]: http://blog.chromium.org/2015/05/continuing-to-protect-chrome-users-from.html
[cws-docs]: /docs/webstore
[developer-console]: https://chrome.google.com/webstore/developer/dashboard
[publish]: /docs/webstore/publish
[enterprise-policy]: /docs/webstore/cws-enterprise
[load-unpacked]: /docs/extensions/mv3/getstarted#unpacked
[linux-install]: /docs/extensions/mv3/linux_hosting
[9]: /docs/extensions/mv2/hosting_changes
[version]: /docs/extensions/mv2/manifest/version/
