---
layout: 'layouts/blog-post.njk'
title: Storage partitioning deprecation trial extended
description: >
  Sites that haven't had time to adapt their sites for third-party storage partitioning can take part in a deprecation trial to temporarily unpartition and restore prior behavior of storage, service workers, and communication APIs in content embedded on their site. 
subhead: >
  The deprecation trial will now be available until the release of Chrome 127, scheduled for September 3, 2024.
date: 2023-06-09
authors:
  - mihajlija
tags:
  - privacy
  - origin-trials
---

To prevent certain types of side-channel cross-site tracking,
[Chrome is partitioning storage and communications APIs in third-party contexts](/docs/privacy-sandbox/storage-partitioning/).

Sites that haven't had time to adapt their sites for third-party storage
partitioning can take part in a deprecation trial to temporarily unpartition and
restore prior behavior of storage, service workers, and communication APIs in
content embedded on their site.

The deprecation trial is available starting in Chrome 115. It was initially
scheduled to expire in Chrome version 123, ending on May 2, 2024.

Based on feedback, to give developers more time to adapt to the new
implementation of storage partitioning, the storage partitioning deprecation
trial has been extended and will be available until the release of Chrome 127,
scheduled for September 3, 2024.

[Learn more about how to participate in deprecation trial for unpartitioned third-party storage, Service Workers, and Communication APIs.](/blog/storage-partitioning-deprecation-trial/)