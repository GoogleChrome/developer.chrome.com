---
layout: 'layouts/doc-post.njk'
title: Welcome to Manifest V3
seoTitle: Welcome to the Chrome Extension Manifest V3
subhead: 'A step in the direction of security, privacy, and performance.'
description: 'An introduction to Manifest V3'
date: 2020-11-09
updated: 2023-08-31
---

{% Partial 'extensions/mv3-support.md' %}

Manifest Version 3 (Manifest V3) is the latest iteration of the Chrome extension platform. This page outlines the changes in Manifest V3 and provides migration resources.

An extension [manifest][doc-manifest] gives the browser information about an extension's capabilities and the files it uses. The features available for extensions to use are defined by the current [manifest version][manifest-version]. Manifest V3 introduces enhancements to extension security, privacy, and performance, and allows extensions to use open web technologies such as service workers and promises.

The Chrome Web Store no longer accepts new Manifest V2 extensions. Watch the [Manifest V2 support timeline][mv2-sunset] for details. We strongly recommend migrating your extensions to Manifest V3 as soon as possible.

## Resources {: #manifest-v3-resources }

Manifest V3 is part of a shift in Chrome's user security and privacy philosophy. The following articles provide an overview of Manifest V3, the reasons for the update, and how to
implement it:

* [Platform vision][mv3-platform] explains how the Manifest V3 changes fit into the big picture.

* [Overview of Manifest V3][mv3-overview] summarizes the technical changes introduced in Manifest V3.

* [Migration guide][mv3-migration] explains how to update Manifest V2 extensions to use Manifest V3. For a quick reference, see [Migration checklist][mv3-checklist].

## Manifest V3 news {: #keep-up-with-the-latest-news }

For more information and updates on Manifest V3, see [What's new in Chrome Extensions][doc-new] and the [Chrome Developer Blog][devs-blog].


[devs-blog]: https://developer.chrome.com/tags/extensions-news/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-new]: /docs/extensions/whatsnew/
[manifest-version]: /docs/extensions/mv3/manifest/manifest_version/
[mv2-sunset]: /docs/extensions/mv3/mv2-sunset/
[mv3-checklist]: /docs/extensions/migrating/checklist/
[mv3-migration]: /docs/extensions/migrating/
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[mv3-platform]: /docs/extensions/mv3/intro/platform-vision/
