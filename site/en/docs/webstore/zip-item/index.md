---
layout: "layouts/doc-post.njk"
title: "Zip your extension"
seoTitle: "Zip your Chrome extension"
date: 2023-10-16
description: Create a zip file with your extension files.
---

After [registering][register] and [setting up][setup-account] your developer account, you can proceed to the next step to publish your first extension. But it's important to make sure you [load the extension locally][locally] and test that it works as intended before uploading your extension to the Chrome Web Store.

After testing it locally, you can create a ZIP file that contains all extension files. The manifest file needs to be placed in the **root directory** and must contain at least the following fields:

- `"name":`—This [name][name] appears in the Chrome Web Store and the Chrome browser
- `"version":`—The [version][version] number of this release of your extension.
- `"icons":`—An array specifying the [icons][icons] of your extension.
- `"description":`—A string of no more than 132 characters that [describes][description] your extension.

Your zip file may also include other images and any files that the extension requires. 

## Tips

Set the initial [version number][version] in the manifest to a low value, such as 0.0.0.1. That way, you have room to increase the version number when you upload new versions of your item. Each new
version that you upload to the Chrome Web Store must have a larger version number than the
previous version.

## Next steps

- [Publish your extension][publish].

[description]: /docs/extensions/mv3/manifest/description/
[locally]: /docs/extensions/mv3/getstarted/development-basics/#load-unpacked
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[icons]: /docs/extensions/mv3/manifest/icons
[name]: /docs/extensions/mv3/manifest/name
[register]: /docs/webstore/register
[publish]: /docs/webstore/publish
[setup-account]: /docs/webstore/set-up-account
[version]: /docs/extensions/mv3/manifest/version



