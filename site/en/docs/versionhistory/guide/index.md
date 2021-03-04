---
layout: "layouts/doc-post.njk"
title: VersionHistory API guide
date: 2021-01-28
description: > 
  Use the VersionHistory web service API to programmatically access Google
  Chrome version history information.
---

This guide shows you how to use the VersionHistory web service API to programmatically
access Google Chrome version history information.

## Overview

All API access is over HTTPS, and accessed from `https://versionhistory.googleapis.com/v1/chrome`.

## Get version information

[endpoints]: https://developer.wordpress.org/rest-api/glossary/#routes--endpoints

There are 5 main resources that live in a hiearchy in the VersionHistory API. \
They are **Product**, **Platform**, **Channel**, **Version**, and **Release**.

Most of the information lives in Versions and Releases while Products,
Platforms, and Channels exist to make the organization and navigation easier.

All URL paths alternate between the resource name (platforms, channels,
versions) and resource identifier (win, beta, 81.1.1.1), with the corresponding
resource name preceding the resource identifier except for the product
identifier.

You can query to list a resource by not providing a resource identifier after
the name of the resource you wish to list. For example, to list all valid
channels for the win platform, you can query: \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/



## Filtering

### Example Filters

Filter for all versions that are Milestone 85 or after \
`filter=version>=85`

Filter for all releases that were released in or after 2021 \
`filter=starttime=2021-01-01T00:00:00Z`

Filter for all releases that reached 100% rollout in Milestone 85 \
`filter=fraction=1,version>=85,version<86`

## Ordering

### Example Ordering

Order by version, then order releases with the same versions by fraction \
`order_by=version desc, fraction desc`

Order by platform, then order releases with the same platform by version \
`order_by=platform, version desc`

**TIP:** You can use order_by and filter at the same time by using `&` to
combine them. For example `filter=version>=85&order_by=version` will sort
releases that are in Milestone 85 and after by their version.






