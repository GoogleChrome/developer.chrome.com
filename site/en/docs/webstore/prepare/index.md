---
layout: "layouts/doc-post.njk"
title: "Prepare your extension"
seoTitle: "Preparing and zipping your Chrome extension for the Chrome Web Store"
date: 2023-10-16
description: Prepare your extension files.
---

After [registering][register] and [setting up][setup-account] your developer account, you can submit your extension to the Chrome Web Store. But before you do so, there are a few ways to prepare your extension and other content before submitting your item.

## Test your extension in production {: #test }

[Load your extension locally][locally] and make sure all your features work as intended before uploading your extension to the Chrome Web Store. 

## Review your manifest {: #manifest }

After uploading your item, you won't be able to edit the metadata of your manifest in the developer dashboard. This means, that if you notice a typo, you will have to edit the manifest, increase the version number, and zip the files all over again.

Make sure you check and include the following fields: 

`"name"`
: This [name][name] appears in the Chrome Web Store and the Chrome browser.

`"version"`
: The [version][version] number of this extension release.

`"icons"`
: An array specifying the [icons][icons] of your extension.

`"description"`
: A string of no more than 132 characters that [describes][description] your extension.

Set the initial [version number][version] in the manifest to a low value, such as 0.0.0.1. That way, you have room to increase the version number when you [upload new versions][upload] of your item. Each new
version that you upload to the Chrome Web Store must have a larger version number than the
previous version.

{% Aside %}
If you encounter a "Cannot parse the manifest" error when you upload your extension, check the format of your manifest JSON file. Commonly, this error occurs if there are comments in the manifest file. To resolve this issue, remove any comments from the manifest file and attempt to re-upload your extension.
{% endAside %}

## Zip your extension files {: #zip }

To upload your extension, you need to submit a ZIP file that contains all extension files. Make sure you place the manifest file in the **root directory**, not in a folder.

## Additional store listing content  {: #listing }

Besides the metadata in your manifest, you will also need to provide content, images, and URLs that
will help your users understand what value your extension offers. See [Creating a great listing
page][best-listing] for details on creating a high-quality listing page that clearly
communicates what your item will offer, using the item description, images, and other listing
metadata. 

## Next steps

- [Publish your extension][publish].

[description]: /docs/extensions/mv3/manifest/description/
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[icons]: /docs/extensions/mv3/manifest/icons
[locally]: /docs/extensions/mv3/getstarted/development-basics/#load-unpacked
[name]: /docs/extensions/mv3/manifest/name
[publish]: /docs/webstore/publish
[upload]: /docs/webstore/upload
[register]: /docs/webstore/register
[setup-account]: /docs/webstore/set-up-account
[version]: /docs/extensions/mv3/manifest/version
[best-listing]: /docs/webstore/best_listing/



