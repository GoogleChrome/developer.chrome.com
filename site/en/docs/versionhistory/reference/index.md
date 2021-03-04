---
layout: "layouts/doc-post.njk"
title: Reference
date: 2021-01-28
description: TODO
---

### Product

Currently, the only available product for VersionHistory is **Chrome**.

### Platform

Currently, the version history are available for these platforms: \
Windows, Windows (64-bit), Mac, Mac (ARM64), Linux, Android, Webview, and iOS. \
These platforms are correspondingly represented as the following in
VersionHistory: \
**win**, **win64**, **mac**, **mac_arm64**, **linux**, **android**, **webview**,
and **ios**.

You can also query for all platforms by using **all** instead of a specific
platform.

### Channel

Currently, the available channels are **stable**, **beta**, **dev**, **canary**,
and **canary_asan**. \
For more information on Chrome channels click
[here](https://www.chromium.org/getting-involved/dev-channel#TOC-How-do-I-choose-which-channel-to-use-).

Not all channels are available on each platform. You can find out which channels
are available for each platform with the query: \
https://versionhistory.googleapis.com/v1/chrome/platforms/PLATFORM/channels/ or
use this query to see all platform x channel combination:
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/

You can also query for all channels by using **all** instead of using a specific
channel.

### Version

A Version only contains its version string (e.g. 84.0.4147.38). Listing the
versions is the simplest way to check the version history of any platform x
channel combination.

You can also query for all versions by using **all** instead of using a specific
version.

### Release

A Release contains the interval in which the version was serving, and at what
fraction the version was serving at during that interval.

For releases that are still serving, serving.endtime will not be populated.
During ordering or filtering, serving.endtime will be treated as
`1970-01-01T00:00:00Z` if the field is not populated.

To filter for releases that are still serving and do not have an endtime, you
can filter for `endtime=none`

