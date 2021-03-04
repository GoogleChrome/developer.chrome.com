---
layout: "layouts/doc-post.njk"
title: VersionHistory API reference
date: 2021-01-28
description: TODO
---

All API access is over HTTPS, and accessed from `https://versionhistory.googleapis.com/v1/chrome`.

## Version

### Get version information for a given platform and channel

Lists all Chrome versions for the given platform and channel.

```http
GET /platforms/{platform}/channels/{channel}/versions
```

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>platform</code></td>
      <td>A <a href="#platform-identifiers">platform identifier</a>.</td>
    </tr>
    <tr>
      <td><code>channel</code></td>
      <td>A <a href="#channel-identifiers">channel identifier</a>.</td>
    </tr>
  </tbody>
</table>

## Release

A release is the interval in which users were running a particular
version of Chrome. The VersionHistory API also provides information
around what fraction of users were running that version of Chrome
during that interval.

### Get all releases

Lists all releases for the given platform, channel, and version.

```http
GET /platforms/{platform}/channels/{channel}/versions/{version}/releases
```

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>platform</code></td>
      <td>A <a href="#platform-identifiers">platform identifier</a>.</td>
    </tr>
    <tr>
      <td><code>channel</code></td>
      <td>A <a href="#channel-identifiers">channel identifier</a>.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>A version identifier.</td>
    </tr>
  </tbody>
</table>

### Filtering releases

For releases that are still serving, serving.endtime will not be populated.
During ordering or filtering, serving.endtime will be treated as
`1970-01-01T00:00:00Z` if the field is not populated.

To filter for releases that are still serving and do not have an endtime, you
can filter for `endtime=none`

## Platform

### Get all platforms

```http
GET /platforms
```

### Get all platform and channel combinations

```http
GET /platforms/all/channels
```

### Platform identifiers {: #platform-identifiers }

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>All platforms</td>
      <td><code>all</code></td>
    </tr>
    <tr>
      <td>Windows</td>
      <td><code>win</code></td>
    </tr>
    <tr>
      <td>Windows (64-bit)</td>
      <td><code>win64</code></td>
    </tr>
    <tr>
      <td>Mac</td>
      <td><code>mac</code></td>
    </tr>
    <tr>
      <td>Mac (ARM64)</td>
      <td><code>mac_arm64</code></td>
    </tr>
    <tr>
      <td>Linux</td>
      <td><code>linux</code></td>
    </tr>
    <tr>
      <td>Android</td>
      <td><code>android</code></td>
    </tr>
    <tr>
      <td>WebView</td>
      <td><code>webview</code></td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><code>ios</code></td>
    </tr>
  </tbody>
</table>

### Product

Currently, the only available product for VersionHistory is **Chrome**.

## Channel

### Channel identifiers {: #channel-identifiers }

The VersionHistory API supports the following [channel] identifiers:

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Stable</td>
      <td><code>stable</code></td>
    </tr>
    <tr>
      <td>Beta</td>
      <td><code>beta</code></td>
    </tr>
    <tr>
      <td>Dev</td>
      <td><code>dev</code></td>
    </tr>
    <tr>
      <td>Canary</td>
      <td><code>canary</code></td>
    </tr>
    <tr>
      <td>Canary (variant build)</td>
      <td><code>canary_asan</code></td>
    </tr>
  </tbody>
</table>

{% Aside %}
  `canary_asan` is a fraction of the Canary population that
  receives a variant build of Chrome. This variant build has
  more diagnostics capabilities enabled which makes it better
  at uncovering bugs.
{% endAside %}

### Get a platform's valid channels

Lists the valid channels for a given platform:

```http
GET /platforms/{platform}/channels
```

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>platform</code></td>
      <td>A <a href="#platform-identifiers">platform identifier</a>.</td>
    </tr>
  </tbody>
</table>

## Filter results

The version and release endpoints support filtering. Example:

```http
GET /platforms/win/channels/stable/versions?filter={filter}
```

The value for `filter` should be a comma-separated list of expressions.
Each expression must take the form of `{field} {operator} {value}` where
`field` is the 

Add the `filter` query parameter to filter version and release endpoints

The version and release endpoints support filtering. Use the `filter` query
param

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

## Order results

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

[channel]: https://www.chromium.org/getting-involved/dev-channel#TOC-How-do-I-choose-which-channel-to-use-