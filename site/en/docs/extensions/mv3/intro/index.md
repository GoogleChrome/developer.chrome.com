---
layout: 'layouts/doc-post.njk'
title: Welcome to Manifest V3
subhead: 'A step in the direction of security, privacy, and performance.'
description: 'An introduction to Manifest V3'
date: 2020-11-09
updated: 2022-08-20
---

This site introduces Manifest Version 3 (V3) for Chrome Extensions.

{% Aside 'key-term' %}

An extension _[Manifest][doc-manifest]_ gives the browser information about the extension, such as the most
important files and the capabilities the extension might use. These capabilities change when a new [Manifest version][manifest-version] number is released.

{% endAside %}

Manifest V3 represents one of the most significant shifts in the extensions platform since it
launched a decade ago. Manifest V3 extensions will enjoy enhancements in security, privacy, and
performance; they can also use more contemporary Open Web technologies such as service workers and
promises. 

## Learn about Manifest V3

The following articles provide an overview of Manifest V3, the reasons behind it, and how to
approach it:

[Platform vision][mv3-platform]
: Explains how the Manifest V3 changes fit into the big picture of where the platform is going.

[Overview of Manifest V3][mv3-overview]
: Summarizes the technical changes introduced with Manifest V3.

[Migration guide][mv3-migration]
: Describes how to get started updating Manifest V2 extensions so they work in Manifest V3.

[Migration checklist][mv3-checklist]
: Provides a quick checklist to help adapt your extension to Manifest V3.

## Start the conversion

Developers must begin to migrate their extensions to Manifest V3 as soon as possible; this will become mandatory as [Manifest V2 will be phasing out][mv2-sunset] in 2023.

## Keep up with the latest announcements

We're excited about the improvements that Manifest V3 brings to the extensions
platform. Look for further announcements on the [What's new in Chrome Extensions][doc-new] blog and [Chromium
Blog][chromium-blog].

[chromium-blog]: https://blog.chromium.org/
[doc-new]: /docs/extensions/whatsnew/
[mv2-sunset]: /docs/extensions/mv3/mv2-sunset/
[mv3-migration]: /docs/extensions/mv3/intro/mv3-migration/
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[mv3-platform]: /docs/extensions/mv3/intro/platform-vision/
[mv3-checklist]: /docs/extensions/mv3/mv3-migration-checklist/
[doc-manifest]: /docs/extensions/mv3/manifest/
[manifest-version]: /docs/extensions/mv3/manifest/manifest_version/