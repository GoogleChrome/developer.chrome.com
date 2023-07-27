---
layout: 'layouts/doc-post.njk'
title: Migrate to Manifest V3
subhead: A guide to converting Manifest V2 extensions to Manifest V3 extensions.
description: A guide to converting Manifest V2 extensions to Manifest V3 extensions.
date: 2023-03-09
updated: 2023-04-14
---

{% Partial 'extensions/mv3-support.md' %}

This section helps you upgrade an extension from Manifest V2 to Manifest V3, the newest version of the Chrome Extensions platform. Migration work is broadly divided into the categories below. To help you track your work, we've provided a [checklist](/docs/extensions/migrating/checklist/) summarizing the contents of these documents. You can access the content via the checklist, or dive into the content. Both paths end with an upgraded extension. 

* [Update the manifest](/docs/extensions/migrating/manifest/)&mdash;The `manifest.json` must be specific to V3. Changes that can be made on their own are described in this section. Manifest changes related to code are described with the code changes they support.
* [Migrate to a service worker](/docs/extensions/migrating/to-service-workers/)&mdash;A service worker replaces the extension's background or event page to ensure that background code stays off the main thread where it can hurt performance. This change also requires moving DOM, window, and certain extension API calls into offscreen documents. 
* [Update API calls](/docs/extensions/migrating/api-calls)&mdash;Some API calls need to be replaced with more modern equivalents. 
* [Replace blocking web request listeners](/docs/extensions/migrating/blocking-web-requests)&mdash;Blocking or modifying network requests in Manifest V2 could significantly degrade performance and require excessive access to sensitive user data. The Declarative Net Request API allows extensions to block or modify web content with fewer permissions and without hindering performance.
* [Improve extension security](/docs/extensions/migrating/improve-security)&mdash;Manifest V3 improves extension security in several ways. Besides an enhanced content security policy, support is removed for remotely hosted code and execution of arbitrary strings.

We also have an [Extension Manifest Converter](https://github.com/GoogleChromeLabs/extension-manifest-converter). It does not do everything for you, but it will get you started. The converter's README describes what the tool changes.

## New extension features

Since the release of Manifest V3, we've continued to [add new features](/docs/extensions/whatsnew/), many of which are usable in both Manifest V2 and Manifest V3. You are not required to use them when converting; however, when they replace older features, you should prefer them to the features they replace and expect that the replaced features will eventually be deprecated and removed.
