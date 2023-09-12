---
layout: "layouts/doc-post.njk"
title: "Manifest - key"
seoTitle: "Chrome Extensions manifest: key"
date: 2013-05-12
updated: 2022-11-29
description: Reference documentation for the key property of manifest.json.
---

This value maintains the unique ID of an extension, or theme when it is loaded
during development. The following are some common use cases:

- To configure a server to only accept requests from your Chrome Extension origin.
- So that other extensions or websites can [send messages][doc-external-msg] to your extension.
- So that a website can access the [`web_accessible_resources`][doc-war] of your extension.

{% Partial 'extensions/reusing-prod-extension-id.md' %}

[doc-external-msg]: /docs/extensions/mv3/messaging/#external-webpage
[doc-war]: /docs/extensions/mv3/manifest/web_accessible_resources/

