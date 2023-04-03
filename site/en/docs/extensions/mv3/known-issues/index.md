---
layout: 'layouts/doc-post.njk'
title: Known issues when migrating to Manifest V3
seoTitle: Known issues when migrating Chrome Extensions to Manifest V3
description: ''
date: 2022-09-23
updated: 2023-02-09
tags:
  - extensions-news
---

{% Aside %}

**December 9, 2022:** The Manifest V2 deprecation timelines are under review and the experiments scheduled for early 2023 are being postponed. For more information, [read the update](https://groups.google.com/u/1/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E) in the chromium-extensions Google Group.

{% endAside %}

This page lists major known issues that affect developers as they migrate to Manifest V3. Known issues are divided into two primary groups:

* **Capabilities** – Features that we plan to add to Manifest V3 to facilitate migration efforts.
* **Bugs** – Significant issues with Manifest V3 platform features that are not working as expected.

These lists are a curated subset of items from the [Chromium issue tracker][crbug]. For a complete list of issues, visit the issue tracker and search for items tagged with the [Platform>Extensions][crbug-crx] component.

When a capability is added to the platform or a bug is addressed, it will be removed from this page at roughly the same time the change lands in Chrome's Stable channel. See [What's New in Chrome Extensions][crx-whats-new] for a list of recent updates.

## Capabilities {: #capabilities }

This section lists major features that will be added to the Manifest V3 platform in order to aid developers migrating from Manifest V2. Timelines included here are best effort estimates, not hard commitments.

### FIXED: webRequest.onAuthRequired events {: #webrequest-onauthrequired }

**Summary:** User-installed Manifest V3 extensions could not intercept `webRequest.onAuthRequired` events because the `webRequestBlocking` permission is restricted to policy-installed extensions. Chrome now allows extensions with the `webRequest` and `webRequestAuthProvider` permissions to asynchronously supply credentials for `onAuthRequired` events.

**Shipped in Chrome 108.**

### FIXED: Offscreen Documents API {: #offscreen-documents-api }

**Summary:** Offscreen documents are a new capability that allows Manifest V3 extensions to create a headless page (no user visible window) to call DOM APIs that aren't supported in extension service workers. Extensions can use offscreen documents to interact with the clipboard, play audio, parse HTML, and XML documents, and so on. We will continue iterating this API in future Chrome versions.

**Shipped in Chrome 109.**

### FIXED: Relax the fixed maximum lifetime for extension service workers {: #sw-fixed-lifetime }

**Summary:** Extension service workers are currently terminated a set amount of time after starting. This fixed limit will be replaced by an activity-based system. As a result, an extension's service worker will be able to stay alive so long as it is continuously working.

**Shipped in Chrome 110.**

### Userscript managers support {: #userscript-managers-support }

**Summary:** Userscript managers cannot inject scripts that are not included in the extension's package due to platform and policy changes that prevent arbitrary code execution. To address this, the Manifest V3 platform will be expanded to specifically support user-authored scripts and styles.

**Estimated timeline:** Targeting Canary support in the first quarter of 2023.

### Increased quota for session storage in the Storage API {: #increased-session-storage-quota }

**Summary:** When it was introduced, the `session` storage area had an intentionally conservative maximum quota of 1 MB. This limit is being increased to 10 MB.

**Estimated timeline**: This will be available in Chrome 112. Chrome 112 beta is planned around March 9, with a stable release around the beginning of April.

## Bugs {: #bugs }

### FIXED: Service workers are not started in response to webRequest events {: #webrequest-in-sw }

**Summary:** Previously, Manifest V3 extensions only received [Web Request API](/docs/extensions/reference/webRequest) events for a short time immediately after installation. After the extension service worker stopped for the first time, events on this API would no longer be dispatched as intended. This effectively prevented Manifest V3 extensions from observing network requests. This issue has been resolved.

**Shipped Chrome 107.**

### FIXED: Sandboxed page CSP can't be customized {: #sandboxed-csp }

**Summary:** Declaring a custom sandboxed page content security policy in the extension's `manifest.json` does not override the default content security policy. This prevents extensions from integrating with services that require their scripts or iframes to be remotely loaded.

**Shipped in Chrome 110.**

**Tracking issue:** [1247690][]

[1024211]: https://bugs.chromium.org/p/chromium/issues/detail?id=1024211
[1135492]: https://bugs.chromium.org/p/chromium/issues/detail?id=1135492
[1247690]: https://bugs.chromium.org/p/chromium/issues/detail?id=1247690
[1339382]: https://bugs.chromium.org/p/chromium/issues/detail?id=1339382
[crbug-crx]: https://bugs.chromium.org/p/chromium/issues/list?q=component%3APlatform%3EExtensions
[crbug]: https://bugs.chromium.org/p/chromium/issues/list
[crx-whats-new]: /docs/extensions/whatsnew/
