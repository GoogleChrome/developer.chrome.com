---
layout: "layouts/doc-post.njk"
title: VersionHistory API reference
date: 2021-03-04
description: Technical reference information about the VersionHistory web service API.
---

This page contains technical reference information about the VersionHistory web
service API.

All API access is over HTTPS, and accessed from `https://versionhistory.googleapis.com/v1/chrome`.

## Version

A version is a particular instance of Chrome that users are running.

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
version of Chrome. The release endpoints also provide information
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

## Platform

A platform is one of the computing platforms that Chrome runs on, such
as Windows, Android, etc.

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

## Channel

See [How do I choose which channel to use?][channels] for an explanation
of Chrome's channels.

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

### Channel identifiers {: #channel-identifiers }

The VersionHistory API supports the following channel identifiers:

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

## Filter results {: #filter }

Add a `filter` query parameter to filter results. Only the
[version](#version) and [release](#release) endpoints support filtering.
Example:

```http
GET /platforms/win/channels/stable/versions/all/releases?filter=fraction=1
```

The value of `filter` should be a comma-separated list of expressions. Each
expression should take the form of `field operator value`.

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Valid values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Field</td>
      <td>
        <code>version</code>, <code>name</code>, <code>platform</code>,
        <code>starttime</code>*, <code>endtime</code>*, <code>fraction</code>*
      </td>
    </tr>
    <tr>
      <td>Operator</td>
      <td>
        <code>&lt;</code>, <code>&lt;=</code>, <code>=</code>,
        <code>&gt;</code>, <code>&gt;=</code>
      </td>
    </tr>
  </tbody>
</table>

{% Aside %}
  An item with an asterisk (`*`) to the right of it is only valid
  for [release](#release) endpoints.
{% endAside %} 

* Channel filtering is done by distance from Stable, in other words `stable` < `beta`
  < `dev` < `canary` < `canary_asan`. For example, `channel<=dev` returns
  information for `stable`, `beta`, and `dev`.
* Version filtering is done numerically, for example `1.0.0.8` < `1.0.0.10`.
  If a version is not entirely written, VersionHistory appends `0` for the missing
  fields. For example, `version>80` becomes `version>80.0.0.0`.
* `endtime=none` filters for releases that are currently live and do not
  have an end time yet.
* When filtering by `starttime` or `endtime`, the value must be in [RFC 3339][rfc3339]
  date string format.
* `name` and `platform` are filtered by string comparison.
* For releases that Chrome is still serving, `serving.endtime` will not be populated.
  During ordering or filtering, `serving.endtime` will be treated as
  `1970-01-01T00:00:00Z` if the field is not populated.
* `fraction` is used to specify how many users were involved in the rollout.
  For example, `fraction=1` means 100% of users.

## Order results {: #order }

Add a `order_by` query parameter to order results. Only the
[version](#version) and [release](#release) endpoints support ordering.
Example:

```http
GET /platforms/win/channels/stable/versions/all/releases?order_by=starttime
```

`order_by` accepts a comma-separated list of the following
values: `version`, `name`, `platform`, `channel`, `starttime`,
`endtime`, `fraction`.

Add a space character (`%20`) followed by `asc` or `desc` after the `order_by` value to specify ascending
or descending ordering. Example:

```http
GET /platforms/win/channels/stable/versions/all/releases?order_by=starttime%20asc
```

* Channel ordering is done in the following order: `stable`, `beta`,
  `dev`, `canary`, `canary_asan`. 
* Ordering by `name` may cause unexpected behaviour as it is a naive string sort. For
  example, `1.0.0.8` will be before 1.0.0.10 in descending order.
* When `order_by` is not specified the default ordering is by `platform`, `channel`,
  `version`, and then `serving.starttime`.

[channels]: https://www.chromium.org/getting-involved/dev-channel#TOC-How-do-I-choose-which-channel-to-use-
[rfc3339]: https://medium.com/easyread/understanding-about-rfc-3339-for-datetime-formatting-in-software-engineering-940aa5d5f68a