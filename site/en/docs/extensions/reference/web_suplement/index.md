---
layout: 'layouts/doc-post.njk'
title: Web platform suplement
seoTitle: Use web platform features in extensions
subhead: A reference for extension-specific information about web platform APIs.
description: A reference for extension-specific information about web platform APIs.
date: 2023-10-11
---

Many web platform APIs may be used in extensions, but some APIs have extension-specific requirements. These might be as simple as a permission in the manifest file. Some are more complicated, requiring a specific minimum Chrome version, or other specific actions.

If the web platform API merely requires a permission, this list says so. If its requirements are more complicated, it links to a dedicated reference page.

[Launch Handler API](/docs/extensions/reference/web_suplement/launch_handler)
: The Launch Handler API allows you to read, stream, or edit files with a given MIME type or file type in an extension, and configure an operating system to open those files in your extension.