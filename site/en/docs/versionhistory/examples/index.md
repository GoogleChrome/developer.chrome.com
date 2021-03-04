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

List all platforms. \
https://versionhistory.googleapis.com/v1/chrome/platforms/

List all platform x channel combinations. \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels

List all versions for all platform x channel combinations. (The response will be
long.) \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions

## Version examples

List all versions for Windows in the stable channel. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions

List all versions for Windows in the stable channel in ascending order by
version. \
[https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version
asc](https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version%20asc)

List all versions for Windows in stable, beta, and dev channel. \
[https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/?filter=channel<=dev](https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/?filter=channel%3C=dev)

## Release examples

List all releases for Windows in the stable channel. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases

List all releases for the version 85.0.4183.83. \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions/85.0.4183.83/releases

List all releases for Windows that are currently live. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/all/releases?filter=endtime=1970-01-01T00:00:00Z

List all releases for Windows in the stable channel that reached 100% rollout.
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases?filter=fraction=1