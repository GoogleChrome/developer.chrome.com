---
layout: 'layouts/doc-post.njk'
title: Known issues when migrating to Manifest V3
description: ''
date: 2022-09-23
#updated: 2022-07-12
---

This page lists major known issues that affect developers as they migrate to Manifest V3. Known issues are divided into two primary groups:

* **Capabilities** – Features that we plan to add to Manifest V3 to facilitate migration efforts.
* **Bugs** – Significant issues with Manifest V3 platform features that are not working as expected.

These lists are a curated subset of items from the [Chromium issue tracker][crbug]. For a complete list of issues, visit the issue tracker and search for items tagged with the [Platform>Extensions][crbug-crx] component.

When a capability is added to the platform or a bug is addressed, it will be removed from this page at roughly the same time the change lands in Chrome's Stable channel. See [What's New in Chrome Extensions][crx-whats-new] for a list of recent updates.

## Capabilities {: #capabilities }

This section lists major features that will be added to the Manifest V3 platform in order to aid developers migrating from Manifest V2. Timelines included here are best effort estimates, not hard commitments.

### Userscript managers support {: #userscript-managers-support }

**Summary:** Userscript managers cannot inject scripts that are not included in the extension's package due to platform and policy changes that prevent arbitrary code execution. To address this, the Manifest V3 platform will be expanded to specifically support user-authored scripts and styles.

**Estimated timeline:** Canary support around October, 2022.

### Increased quota for session storage in the Storage API {: #increased-session-storage-quota }

**Summary:** When it was introduced, the `session` storage area had an intentionally conservative maximum quota of 1 MB. We are planning to increase this limit, but have not yet settled on a new value.

**Estimated timeline**: Targeting Canary support around October, 2022.

### Offscreen Documents API {: #offscreen-documents-api }

**Summary:** Offscreen documents are a new capability that will allow Manifest V3 extensions to create a headless page (no user visible window) in order to call DOM APIs that aren't supported in extension service workers. Extensions will be able to use offscreen documents to interact with the clipboard, play audio, parse HTML, and XML documents, and so on.

**Estimated timeline:** Targeting Canary support around October, 2022.

**Tracking issue:** [1339382][]

## Bugs {: #bugs }

### Sandboxed page CSP can't be customized {: #sandboxed-csp }

**Summary:** Declaring a custom sandboxed page content security policy in the extension's `manifest.json` does not override the default content security policy. This prevents extensions from integrating with services that require their scripts or iframes to be remotely loaded.

**Estimated timeline:** Targeting Canary support before January, 2023.

**Tracking issue:** [1247690][]

## Fixed but not yet in Stable {: #resolved }

### webRequest.onAuthRequired events {: #webrequest-onauthrequired }

**Summary:** User-installed Manifest V3 extensions cannot currently intercept `webRequest.onAuthRequired` events, since the `webRequestBlocking` permission is restricted to policy-installed extensions. Chrome will provide extensions with a way to supply credentials for authentication requests in Manifest V3.

**Estimated timeline:** Slated for release in Chrome 108.

**Tracking issue:** [1135492][]

### Service workers are not started in response to webRequest events {: #webrequest-in-sw }

**Summary:** Manifest V3 extensions will only receive [Web Request API](/docs/extensions/reference/webRequest) events for a short time immediately after installation. After the extension service worker is stopped for the first time, events on this API are no longer dispatched as intended. This prevents Manifest V3 extensions from observing network requests.

**Estimated timeline**: Slated for release in Chrome 107.

**Tracking issue**: [1024211][]

[1024211]: https://bugs.chromium.org/p/chromium/issues/detail?id=1024211
[1135492]: https://bugs.chromium.org/p/chromium/issues/detail?id=1135492
[1247690]: https://bugs.chromium.org/p/chromium/issues/detail?id=1247690
[1339382]: https://bugs.chromium.org/p/chromium/issues/detail?id=1339382
[crbug-crx]: https://bugs.chromium.org/p/chromium/issues/list?q=component%3APlatform%3EExtensions
[crbug]: https://bugs.chromium.org/p/chromium/issues/list
[crx-whats-new]: /docs/extensions/whatsnew/
