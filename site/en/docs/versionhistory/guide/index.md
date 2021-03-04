---
layout: "layouts/doc-post.njk"
title: Guide
date: 2021-01-28
description: TODO
---

## Sample Queries

List all platforms. \
https://versionhistory.googleapis.com/v1/chrome/platforms/

List all platform x channel combinations. \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels

List all versions for all platform x channel combinations. (The response will be
long.) \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions

List all versions for Windows in the stable channel. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions

List all versions for Windows in the stable channel in ascending order by
version. \
[https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version
asc](https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions?order_by=version%20asc)

List all versions for Windows in stable, beta, and dev channel. \
[https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/?filter=channel<=dev](https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/?filter=channel%3C=dev)

List all releases for Windows in the stable channel. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases

List all releases for the version 85.0.4183.83. \
https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/all/versions/85.0.4183.83/releases

List all releases for Windows that are currently live. \
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions/all/releases?filter=endtime=1970-01-01T00:00:00Z

List all releases for Windows in the stable channel that reached 100% rollout.
https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions/all/releases?filter=fraction=1

## Filtering

Filtering is available for versions and releases. To use filtering, append the
API query with `?filter=<filter string>`.

Format of the `<filter string>` is a comma separated list of `<field_name>
<operator> <filter>`. \
All comma separated filter clauses are conjoined with a logical and. \
Valid field_names are **version**, **name**, **platform**, **channel**,
**starttime**, **endtime**, and **fraction** (starttime, endtime, and fraction
are only available for releases). \
Valid operators are **<**, **<=**, **=**, **>=**, and **>**.

Channel comparison is done by distance from stable, i.e., stable < beta dev <
canary < canary_asan. \
`<filter>` must be a valid channel when filtering by channel.

Version comparison is done numerically, i.e., 1.0.0.8 < 1.0.0.10. \
If version is not entirely written, the version will be appended with 0 for the
missing fields i.e. version > 80 becomes version > 80.0.0.0

The filter `endtime=none` will filter for releases that are currently live and
do not have an endtime yet.

When filtering by starttime or endtime, `<filter>` must be in RFC 3339 date
string format.

Name and platform are filtered by string comparison.

### Example Filters

Filter for all versions that are Milestone 85 or after \
`filter=version>=85`

Filter for all releases that were released in or after 2021 \
`filter=starttime=2021-01-01T00:00:00Z`

Filter for all releases that reached 100% rollout in Milestone 85 \
`filter=fraction=1,version>=85,version<86`

## Ordering

Ordering of the versions and releases can be changed by appending the query with
`?order_by=<order_by string>`.

Format of the `<order_by string>` is a comma separated list of `<field_name>`. \
Valid field_names are **version**, **name**, **platform**, **channel**,
**starttime**, **endtime**, and **fraction** (starttime, endtime, and fraction
are only available for releases). \
Optionally, you can append **desc** or **asc** after each field_name to specify
the sorting order.

Ordering by channel will sort by distance from the stable channel (not
alphabetically). A list of channels sorted in this order is: stable, beta, dev,
canary, and canary_asan.

Sorting by name may cause unexpected behaviour as it is a naive string sort. For
example, 1.0.0.8 will be before 1.0.0.10 in descending order.

If order_by is not specified the response will be sorted by platform, channel,
version, and then serving.starttime.

### Example Ordering

Order by version, then order releases with the same versions by fraction \
`order_by=version desc, fraction desc`

Order by platform, then order releases with the same platform by version \
`order_by=platform, version desc`

**TIP:** You can use order_by and filter at the same time by using `&` to
combine them. For example `filter=version>=85&order_by=version` will sort
releases that are in Milestone 85 and after by their version.

