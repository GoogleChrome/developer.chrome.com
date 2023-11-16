---
title: Manifest V2 support timeline
seoTitle: "Chrome Extensions Manifest V2 support timeline"
subhead: 'Understand when Manifest V2 will stop working for extensions'
description: 'Details of the Manifest V2 phase-out and end of life.'
layout: 'layouts/doc-post.njk'
date: 2021-09-23
updated: 2023-11-16
tags:
  - extensions-news
---

## Latest 

### November 2023: New Chrome MV2 deprecation timeline announcement

The Manifest V2 support timeline has been updated. See our [November 2023 blog post](/blog/resuming-the-transition-to-mv3/) for details.

## Upcoming

### June 2024: Chrome MV2 deprecation pre-stable rollout 
We will begin disabling Manifest V2 extensions in [pre-stable versions of Chrome](/docs/web-platform/chrome-release-channels/) (Dev, Canary, and Beta) as early as **June 2024**, in Chrome 127 and later. Users impacted by the rollout will see Manifest V2 extensions automatically disabled in their browser and will no longer be able to install Manifest V2 extensions from the Chrome Web Store. Also in June 2024, Manifest V2 extensions will lose their Featured badge in the Chrome Web Store if they currently have one.

We will gradually roll out this change, gathering user feedback and collecting data to make sure Chrome users understand the change and what actions they can take to find alternative, up-to-date extensions.

We will communicate with developers throughout the rollout, and we will continue to closely monitor feedback during this process.

### June 2024 + 1-X months: Chrome MV2 deprecation stable rollout 

We expect it will take at least a month to observe and stabilize the changes in pre-stable before expanding the rollout to stable channel Chrome where it will also gradually roll out over time. The exact timing may vary depending on the data collected, and during this time, we will keep you informed about our progress.

### June 2025: Chrome MV2 deprecation enterprise rollout

Enterprises using the [ExtensionManifestV2Availability](https://chromeenterprise.google/policies/#ExtensionManifestV2Availability) policy to ensure the continued functioning of Manifest V2 extensions in their organization will have one additional year - until June 2025 - to migrate the Manifest V2 extensions in their organization. Browsers with the policy enabled will not be impacted by the rollout of the deprecation until that time.

## Past

### June 2022: Chrome Web Store -  no new private extensions

Chrome Web Store stopped accepting new Manifest V2 extensions with visibility set to "Private".

### January 2022: Chrome Web Store - no new public / unlisted extensions

Chrome Web Store stopped accepting new Manifest V2 extensions with visibility set
to "Public" or "Unlisted". The ability to change Manifest V2 extensions from "Private" to "Public"
or "Unlisted" was removed.

