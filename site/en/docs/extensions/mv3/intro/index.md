---
layout: 'layouts/doc-post.njk'
title: Welcome to Manifest V3
seoTitle: Welcome to the Chrome Extension Manifest V3
subhead: 'A step in the direction of security, privacy, and performance.'
description: 'An introduction to Manifest V3'
date: 2020-11-09
updated: 2022-09-28
---

{% Partial 'extensions/mv3-support.md' %}

This site introduces Manifest V3, short for Manifest Version 3, which is the latest iteration of the Chrome extension platform. It shares the background and reasons for introducing Manifest V3 and the vision for the platform's future, along with resources on how to migrate.

## What is a manifest? {: #what-is-a-manifest }

An extension [manifest][doc-manifest] gives the browser information about the extension, such as the most important files and the capabilities the extension might use. The extension platform features change when there's a new [manifest version][manifest-version].

## Introducing Manifest V3 {: #introducing-manifest-v3 }

Manifest V3 represents one of the most significant shifts in the extensions platform since it launched a decade ago. Manifest V3 extensions enjoy enhancements in security, privacy, and performance; they can also use more contemporary open web technologies such as service workers and promises.

## Manifest V3 resources {: #manifest-v3-resources }

Manifest V3 is part of a shift in the philosophy behind user security and privacy. The following articles provide an overview of Manifest V3, the reasons behind it, and how to
approach it:

[Platform vision][mv3-platform]
: Explains how the Manifest V3 changes fit into the big picture of where the platform is going.

[Overview of Manifest V3][mv3-overview]
: Summarizes the technical changes introduced with Manifest V3.

[Migration guide][mv3-migration]
: Describes how to get started updating Manifest V2 extensions so they work in Manifest V3.

[Migration checklist][mv3-checklist]
: Provides a quick checklist to help adapt your extension to Manifest V3.

## Start the conversion {: #start-the-conversion }

As of January 17, 2022 the Chrome Web Store has stopped accepting new Manifest V2 extensions. We strongly recommend migrating your extensions to Manifest V3 as soon as possible; this will become mandatory after [Manifest V2 is phased out][mv2-sunset] in 2024.

## Keep up with the latest news {: #keep-up-with-the-latest-news }

We're excited about the improvements that Manifest V3 brings to the platform. Look for new announcements in [What's new in Chrome Extensions][doc-new] and the [Chrome Developer Blog][devs-blog].


[devs-blog]: https://developer.chrome.com/tags/extensions/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-new]: /docs/extensions/whatsnew/
[manifest-version]: /docs/extensions/mv3/manifest/manifest_version/
[mv2-sunset]: /docs/extensions/mv3/mv2-sunset/
[mv3-checklist]: /docs/extensions/migrating/checklist/
[mv3-migration]: /docs/extensions/migrating/
[mv3-overview]: /docs/extensions/mv3/intro/mv3-overview/
[mv3-platform]: /docs/extensions/mv3/intro/platform-vision/
