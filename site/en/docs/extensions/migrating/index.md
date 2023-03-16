---
layout: 'layouts/doc-post.njk'
title: Migrate to Manifest V3
subhead: A guide to converting Manifest V2 extensions to Manifest V3 extensions.
description: A guide to converting Manifest V2 extensions to Manifest V3 extensions.
date: 2023-03-09
---

This section helps you upgrade an extension from Manifest V2 to Manifest V3, the newest version of the Chrome Extensions platform. A summary of the work is provided below with links to pages for each of the task areas. There is also a list of new extension features you should consider incorporating into your extension. Finally, there is a [migration checklist](/docs/extensions/mv3-migration-checklist) to help you keep track of your work.

{% Aside %}
Follow [What's new in Chrome Extensions](/docs/extensions/whatsnew/) to read about new Manifest V3 features as they become available.
{% endAside %}

## Migration summary

Migration work is broadly divided into the categories below. The links provide details of each. To help you track your work, we've provided a checklist summarizing the contents of these documents. You can access the content via the checklist, or dive into the content. Both paths end with an upgraded extension. 

* [Update the manifest](/docs/extensions/migrating/manifest/)&mdash;The `manifest.json` must be specific to V3. Changes that can be made on their own are described in this section. Manifest changes related to code are described with the code changes they support.
* [Migrate to a service worker](/docs/extensions/migrating/to-service-workers/)&mdash;A service worker replaces the extension's background or event page to ensure that background code stays off the main thread where it can hurt performance. This change also requires moving DOM, window, and certain extension API calls into offscreen documents. 
* [Update API calls](/docs/extensions/migrating/api-calls)&mdash;Some API calls need to be replaced with more modern equivalents. 
* [Replace blocking web request listeners](/docs/extensions/migrating/blocking-web-requests)&mdash;Blocking or modifying network requests in Manifest V2 could significantly degrade performance and require excessive access to sensitive user data. The Declarative Net Request API allows extensions to block or modify web content with fewer permissions and without hindering performance.
* [Improve extension security](/docs/extensions/migrating/improve-security)&mdash;Manifest V3 improves extension security in several ways. Besides an enhanced content security policy, support is removed for remotely hosted code and execution of arbitrary strings. 

## New extension features 

The following is a list of new or recent extension features. You are not required to use them when converting; however, when they replace older features, you should prefer them to the features they replace and expect that the replaced features will eventually be deprecated and removed.

* Many methods now return [Promises](/docs/extensions/mv3/intro/mv3-overview#promises). Support has been added to many methods, though you can still pass callbacks to those methods for backwards compatibility. (We will eventually support promises on all appropriate methods.)

* A favicon (short for "favorite icon") is a small icon that is displayed in the browser's address bar. Favicons are typically used to identify and differentiate websites. A web site's favicon is now [retrievable in Manifest V3](/docs/extensions/mv3/favicon/).