---
title: Simulating restricted host permissions
description: >
  "In the future, host permissions will be blocked by default when an extension is installed. Though we're still working on the user interface, we're giving you a way to emulate how your extension will work when the user does not grant host permissions."
layout: 'layouts/blog-post.njk'
date: 2022-12-12
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/EiCV49QB0MW6Ze05OFdg.jpeg'
alt: >
  A walk sign against a partly cloudy sky.
tags:
  - chrome-109
  - extensions-news
authors:
  - joemedley
---

In the future host permissions will be blocked by default when an extension is installed. A user gesture will be required to grant host permissions to your extension. We want to make it clearer to users what they're granting and why. 

We don't know yet what the interface will look like. In the meantime, we're giving you a way to emulate how your extension will work when the user does not grant host permissions. This process involves a packed extension, a command line switch for launching Chrome, and a temporary addition to the Extension installation dialog box.

To simulate a user not granting permissions:

1. If you do not have a way to [install your extension from a server](/docs/extensions/mv3/external_extensions/#prereq-server) (you would likely only do this for an enterprise extension), you will need to [create a packed extension](/docs/extensions/mv3/external_extensions/#create-crx).

1. Launch Chrome 109 or later with the following flag per the [instructions on the Chromium developer site](https://chromium.googlesource.com/playground/chromium-org-site/+/refs/heads/main/for-testers/command-line-flags.md#how-to-specify-command-line-flags).

   `--enable-features=AllowWithholdingExtensionPermissionsOnInstall`

   For example, if you are testing your extension in Chrome Canaray on mac, you would use the following command line:

   ```bash
   /Applications/Google\ Chrome\ Canary.app/Contents/cOS/Google\ Chrome\ Canary --enable-features=AllowWithholdingExtensionPermissionsOnInstall
   ```

1. Load your extension [packed](/docs/extensions/mv3/external_extensions#chrome-crx) or install an extension from the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions).

1. The Add dialog box appears with a new checkbox to “grant access to all requested sites”.

1. Leave the checkbox unchecked. This will load the extension with the new behavior.

   {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/JwEbz8Vc3UCk1qzlRFEq.png", alt="ALT_TEXT_HERE", width="800", height="332" %}

1. See how your extension would behave with host permissions withheld, and correct any problems you encounter.

If you need to toggle host permissions, you can do so using the extension icon's context menu. Right-click the extension icon and view the menu named, "This Can Read and Change Site Data". (If this menu is missing, your extension does not request host permissions.)

Photo by <a href="https://unsplash.com/@markkoenig?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mark König</a> on <a href="https://unsplash.com/s/photos/permission?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
