---
layout: 'layouts/blog-post.njk'
title: Extension Manifest Converter
description: >
  Open source tool to convert extensions to Manifest V3. You'll still need to manually update any
  code with non-mechanical changes, such as adapting to use service workers or some script
  injection.
subhead: >
  Easily convert an entire directory, extension zip file, or manifest.json file.
date: 2021-04-28
updated: 2022-02-16
authors:
  - solomonkinard
  - dotproto
tags:
  - extensions-news
hero: image/WlD8wC6g8khYWPJUsQceQkhXSlv1/GVDuhpIli5DeYmbiPlqG.jpg
alt: A woodworking hand plane.
---

Hi everyone. My name is Solomon and I'm a software engineer on Chrome's extensions team.

As we continue to build out the latest version of [Chrome's extensions platform][mv3], I found
myself needing to convert Manifest V2 extensions to Manifest V3 for testing purposes. To make this
process a little easier I created a tool called [Extension Manifest Converter][emc-repo] (EMC).

EMC is a Python 3 command line tool that automates several parts of converting an extension between
manifest formats. Users can quickly convert an extension directory, zip file, or manifest.json file
with a single command.

```bash
python3 emc.py <extension_path>
```

This tool focuses on automating the mechanical parts of converting an extension. For example, it
will replace `chrome.browserAction` with `chrome.action` in JavaScript, but it cannot handle
abstract tasks like updating background logic to fully adopt service workers. See the project's
[README][emc-readme] for more details.

We've found this tool useful on our team and wanted to open source it in the hope that you might
too. Keep in mind, though, that as a personal side project we cannot offer support or maintain it indefinitely.

If you encounter any issues with the project, please [open an issue][emc-issue] on the [project's
repo][emc-repo].

[emc-issue]: https://github.com/GoogleChromeLabs/extension-manifest-converter/issues
[emc-repo]: https://github.com/GoogleChromeLabs/extension-manifest-converter
[emc-readme]: https://github.com/GoogleChromeLabs/extension-manifest-converter#readme
[mv3]: https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/
[war]: https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/
