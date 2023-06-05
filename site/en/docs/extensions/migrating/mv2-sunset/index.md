---
title: Manifest V2 support timeline
seoTitle: "Chrome Extensions Manifest V2 support timeline"
subhead: 'Understand when Manifest V2 will stop working for extensions'
description: 'Details of the Manifest V2 phase-out and end of life.'
layout: 'layouts/doc-post.njk'
date: 2021-09-23
updated: 2023-06-02
tags:
  - extensions-news
---

We're still working on the timeline of the MV2 phase-out plan, so keep an eye out for it in the
coming months. We will provide at least 6 months between a timeline announcement and any experiments
deprecating MV2 features.

Before announcing a new timeline, we are addressing prioritized platform gaps and closing critical
bugs. You can track these on the [Known Issues][known-issues] page.

For more information, see our [most recent post][mailing-list-update] on the chromium-extensions
mailing list.

## History

**June 2022**

Chrome Web Store stopped accepting new Manifest V2 extensions with visibility set to "Private".

**January 2022**

Chrome Web Store stopped accepting new Manifest V2 extensions with visibility set
to "Public" or "Unlisted". The ability to change Manifest V2 extensions from "Private" to "Public"
or "Unlisted" was removed.

[mailing-list-update]: https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E/m/HjaaCIG-BQAJ
[known-issues]: /docs/extensions/migrating/known-issues/
