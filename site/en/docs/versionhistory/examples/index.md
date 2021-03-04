---
layout: "layouts/doc-post.njk"
title: VersionHistory API examples
date: 2021-01-28
description: > 
  Use the VersionHistory web service API to programmatically access Google
  Chrome version history information.
---

This page shows example usage of the VersionHistory web service API.

## Platform examples

List all platforms:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/
```

List all platform x channel combinations:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels
```

List all versions for all platform x channel combinations. (The response will be
long

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions
```

## Version examples

List all versions for Windows in the stable channel:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions
```

List all versions for Windows in the stable channel in ascending order by
version:

```http
[https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version
asc](https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version%20asc)

List all versions for Windows in stable, beta, and dev channel:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/?filter=channel<=dev
```

## Release examples

List all releases for Windows in the stable channel:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases
```

List all releases for the version `85.0.4183.83`:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions/85.0.4183.83/releases
```

List all releases for Windows that are currently live:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/all/releases?filter=endtime=1970-01-01T00:00:00Z
```

List all releases for Windows in the stable channel that reached 100% rollout:

```http
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases?filter=fraction=1
```