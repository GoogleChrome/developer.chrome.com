---
layout: 'layouts/doc-post.njk'
title: Manifest V3 Status
description: "Known issues when migrating Chrome Extensions to Manifest V3."
date: 2022-09-23
updated: 2022-04-13
tags:
  - extensions-news
---

The Manifest V2 deprecation is on hold. In the meantime, we're improving the platform and documentation to ensure the transition from Manifest V2 to Manifest V3 is smooth and successful. Watch this page for our progress. We'll provide sufficient migration time for developers&mdash;at least 6 months&mdash;before beginning any experiments to turn off MV2.

## Planned enhancements {: #planned-enhancements }

The following enhancement is currently under development.

### Userscript managers support {: #userscript-managers-support }

Userscript managers cannot inject scripts that are not included in the extension's package because of platform and policy changes that prevent arbitrary code execution. To address this, Manifest V3 is being expanded to specifically support user-authored scripts and styles.

**Estimated timeline:** Targeting Canary support in the second quarter of 2023.

## Completed work {: #complated-work }

The following features have been completed. Follow the links for more information.

* Chrome 112: [Increased storage.session quota](/docs/extensions/whatsnew/#m112-storage-session-quota) (in beta as of March 3, 2023) {: #increased-session-storage-quota }

* Chrome 110: [Relax the fixed maximum lifetime for extension service workers](/docs/extensions/whatsnew/#sw-fixed-lifetime) (February 7, 2023)

* Chrome 110: [Offscreen Documents API](/docs/extensions/whatsnew/#offscreen-documents-api) (February 7, 2023) {: #offscreen-documents-api }

* Chrome 110: [Sandboxed page CSP can't be customized](/docs/extensions/whatsnew/#sandboxed-csp) (February 7, 2023) {: #sandboxed-csp }

* Chrome 108: [webRequest.onAuthRequired events](/docs/extensions/whatsnew/#webrequest-onauthrequired) (Nov 29, 2022) {: #webrequest-onauthrequired }

* Chrome 107: [Service workers are not started in response to webRequest events](/docs/extensions/whatsnew/#webrequest-in-sw) (October 22, 2022) {: #webrequest-in-sw }