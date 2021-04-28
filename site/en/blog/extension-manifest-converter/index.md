---
layout: 'layouts/blog-post.njk'
title: Extension Manifest Converter
description: >
  Open source tool to convert extensions to Manifest V3. You'll still need to manually update any
  service worker code that relies on a DOM, in addition to updating chrome.scripts.
subhead: >
  Easily convert an entire directory, extension zip file, or manifest.json file.
date: 2021-04-28
updated: 2021-04-28
authors:
  - solomonkinard
  - dotproto
tags:
  - extensions
hero: image/WlD8wC6g8khYWPJUsQceQkhXSlv1/GVDuhpIli5DeYmbiPlqG.jpg
alt: A woodworking hand plane.
---

Hi everyone. My name is Solomon and I'm a software engineer on Chrome's extensions team.

As we continue to build out the latest version of [Chrome's extensions platform][mv3], I found
myself needing to convert MV2 extensions to MV3 for testing purposes. To make this process a little
easier I created a tool called [Extension Manifest Converter][emc-repo] (EMC).

EMC is a Python 3 command line tool that automates several parts of converting an extension form MV2
to MV3. Users can quickly convert an extension directory, zip file, or manifest.json file with a
single command.

```bash
python3 extension.py <extension_path>
```

This tool automates some of the more mechanical parts of updating an extension like moving from
`chrome.browserAction` to `chrome.action` or moving to the new [web accessible resources][war]
syntax introduced with Manifest V3.

If you encounter any issues with the project, [open an issue][emc-issue] on the [project's
repo][emc-repo].

[emc-issue]: https://github.com/GoogleChromeLabs/extension-manifest-converter/issues
[emc-repo]: https://github.com/GoogleChromeLabs/extension-manifest-converter
[mv3]: https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/
[war]: https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/
