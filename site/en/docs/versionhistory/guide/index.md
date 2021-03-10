---
layout: "layouts/doc-post.njk"
title: VersionHistory API guide
date: 2021-03-04
description: > 
  A how-to guide on using the VersionHistory web service API to programmatically access Google
  Chrome version history information.
---

This guide shows you how to use the VersionHistory web service API.

## Overview

The VersionHistory API provides programmatic access to Google Chrome
version history information. It is a [REST][rest] API that returns information
as JSON.

All API access is over HTTPS, and accessed from `https://versionhistory.googleapis.com/v1/chrome`.

## Get all platforms

Chrome is supported on many different platforms, such as Windows, iOS, Android, etc.
To view all of the platforms that VersionHistory has information about:

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/
```

{% Details 'h3' %}

{% DetailsSummary %}
Example response
{% endDetailsSummary %}

```json
{
  "platforms": [
    {
      "name": "chrome/platforms/win",
      "platformType": "WIN"
    },
    {
      "name": "chrome/platforms/win64",
      "platformType": "WIN64"
    },
    {
      "name": "chrome/platforms/mac",
      "platformType": "MAC"
    },
    {
      "name": "chrome/platforms/mac_arm64",
      "platformType": "MAC_ARM64"
    },
    {
      "name": "chrome/platforms/linux",
      "platformType": "LINUX"
    },
    {
      "name": "chrome/platforms/android",
      "platformType": "ANDROID"
    },
    {
      "name": "chrome/platforms/webview",
      "platformType": "WEBVIEW"
    },
    {
      "name": "chrome/platforms/ios",
      "platformType": "IOS"
    }
  ]
}
```

{% endDetails %}

## Get all valid platform/channel combinations

Chrome provides multiple [channels] on many of the platforms that
it supports. To view all valid platform/channel combinations:

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels
```

{% Details 'h3' %}

{% DetailsSummary %}
Example response
{% endDetailsSummary %}

```json
{
  "channels": [
    {
      "name": "chrome/platforms/win/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/win/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/win/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/win/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/win/channels/canary_asan",
      "channelType": "CANARY_ASAN"
    },
    {
      "name": "chrome/platforms/win64/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/win64/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/win64/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/win64/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/win64/channels/canary_asan",
      "channelType": "CANARY_ASAN"
    },
    {
      "name": "chrome/platforms/mac/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/mac/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/mac/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/mac/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/mac_arm64/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/mac_arm64/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/mac_arm64/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/mac_arm64/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/linux/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/linux/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/linux/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/android/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/android/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/android/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/android/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/webview/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/webview/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/webview/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/webview/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/ios/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/ios/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/ios/channels/dev",
      "channelType": "DEV"
    }
  ]
}
```

{% endDetails %}

## Get all valid channels for a particular platform

The previous examples used the `all` parameter to instruct VersionHistory to
retrieve information about all platforms. To focus on a particular platform,
replace `all` with a particular [platform identifier] (such as `win`):

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels
```

{% Details 'h3' %}

{% DetailsSummary %}
Example response
{% endDetailsSummary %}

```json
{
  "channels": [
    {
      "name": "chrome/platforms/win/channels/stable",
      "channelType": "STABLE"
    },
    {
      "name": "chrome/platforms/win/channels/beta",
      "channelType": "BETA"
    },
    {
      "name": "chrome/platforms/win/channels/dev",
      "channelType": "DEV"
    },
    {
      "name": "chrome/platforms/win/channels/canary",
      "channelType": "CANARY"
    },
    {
      "name": "chrome/platforms/win/channels/canary_asan",
      "channelType": "CANARY_ASAN"
    }
  ]
}
```

{% endDetails %}

## Get version information for a particular platform/channel combination

A version represents the specific instance of Chrome that users are running.
To retrieve version information for a particular combination of platform/channel,
send a GET request like this:

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions
```

This request retrieves all versions of Google Chrome Stable that ran on Windows.

{% Details 'h3' %}

{% DetailsSummary %}
Example response
{% endDetailsSummary %}

```json
{
  "versions": [
    {
      "name": "chrome/platforms/win/channels/stable/versions/89.0.4389.72",
      "version": "89.0.4389.72"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.190",
      "version": "88.0.4324.190"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.190",
      "version": "88.0.4324.190"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.182",
      "version": "88.0.4324.182"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.150",
      "version": "88.0.4324.150"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.146",
      "version": "88.0.4324.146"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.104",
      "version": "88.0.4324.104"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/88.0.4324.96",
      "version": "88.0.4324.96"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/87.0.4280.141",
      "version": "87.0.4280.141"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/87.0.4280.88",
      "version": "87.0.4280.88"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/87.0.4280.66",
      "version": "87.0.4280.66"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/86.0.4240.198",
      "version": "86.0.4240.198"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/86.0.4240.193",
      "version": "86.0.4240.193"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/86.0.4240.183",
      "version": "86.0.4240.183"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/86.0.4240.111",
      "version": "86.0.4240.111"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/86.0.4240.75",
      "version": "86.0.4240.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/85.0.4183.121",
      "version": "85.0.4183.121"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/85.0.4183.102",
      "version": "85.0.4183.102"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/85.0.4183.83",
      "version": "85.0.4183.83"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/84.0.4147.135",
      "version": "84.0.4147.135"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/84.0.4147.125",
      "version": "84.0.4147.125"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/84.0.4147.105",
      "version": "84.0.4147.105"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/84.0.4147.89",
      "version": "84.0.4147.89"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/84.0.4147.89",
      "version": "84.0.4147.89"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/83.0.4103.116",
      "version": "83.0.4103.116"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/83.0.4103.106",
      "version": "83.0.4103.106"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/83.0.4103.97",
      "version": "83.0.4103.97"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/83.0.4103.61",
      "version": "83.0.4103.61"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/81.0.4044.138",
      "version": "81.0.4044.138"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/81.0.4044.129",
      "version": "81.0.4044.129"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/81.0.4044.122",
      "version": "81.0.4044.122"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/81.0.4044.113",
      "version": "81.0.4044.113"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/81.0.4044.92",
      "version": "81.0.4044.92"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.163",
      "version": "80.0.3987.163"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.162",
      "version": "80.0.3987.162"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.149",
      "version": "80.0.3987.149"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.132",
      "version": "80.0.3987.132"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.122",
      "version": "80.0.3987.122"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.116",
      "version": "80.0.3987.116"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.106",
      "version": "80.0.3987.106"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.100",
      "version": "80.0.3987.100"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/80.0.3987.87",
      "version": "80.0.3987.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/79.0.3945.130",
      "version": "79.0.3945.130"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/79.0.3945.117",
      "version": "79.0.3945.117"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/79.0.3945.88",
      "version": "79.0.3945.88"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/79.0.3945.79",
      "version": "79.0.3945.79"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/78.0.3904.108",
      "version": "78.0.3904.108"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/78.0.3904.97",
      "version": "78.0.3904.97"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/78.0.3904.87",
      "version": "78.0.3904.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/78.0.3904.70",
      "version": "78.0.3904.70"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/77.0.3865.120",
      "version": "77.0.3865.120"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/77.0.3865.90",
      "version": "77.0.3865.90"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/77.0.3865.75",
      "version": "77.0.3865.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/76.0.3809.132",
      "version": "76.0.3809.132"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/76.0.3809.100",
      "version": "76.0.3809.100"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/76.0.3809.87",
      "version": "76.0.3809.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/75.0.3770.142",
      "version": "75.0.3770.142"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/75.0.3770.100",
      "version": "75.0.3770.100"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/75.0.3770.90",
      "version": "75.0.3770.90"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/75.0.3770.80",
      "version": "75.0.3770.80"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/74.0.3729.169",
      "version": "74.0.3729.169"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/74.0.3729.157",
      "version": "74.0.3729.157"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/74.0.3729.131",
      "version": "74.0.3729.131"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/74.0.3729.108",
      "version": "74.0.3729.108"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/73.0.3683.103",
      "version": "73.0.3683.103"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/73.0.3683.86",
      "version": "73.0.3683.86"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/73.0.3683.75",
      "version": "73.0.3683.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/72.0.3626.121",
      "version": "72.0.3626.121"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/72.0.3626.119",
      "version": "72.0.3626.119"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/72.0.3626.109",
      "version": "72.0.3626.109"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/72.0.3626.96",
      "version": "72.0.3626.96"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/72.0.3626.81",
      "version": "72.0.3626.81"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/71.0.3578.98",
      "version": "71.0.3578.98"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/71.0.3578.80",
      "version": "71.0.3578.80"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/70.0.3538.110",
      "version": "70.0.3538.110"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/70.0.3538.102",
      "version": "70.0.3538.102"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/70.0.3538.77",
      "version": "70.0.3538.77"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/70.0.3538.67",
      "version": "70.0.3538.67"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/69.0.3497.100",
      "version": "69.0.3497.100"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/69.0.3497.92",
      "version": "69.0.3497.92"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/69.0.3497.81",
      "version": "69.0.3497.81"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/68.0.3440.106",
      "version": "68.0.3440.106"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/68.0.3440.84",
      "version": "68.0.3440.84"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/68.0.3440.75",
      "version": "68.0.3440.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/67.0.3396.99",
      "version": "67.0.3396.99"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/67.0.3396.87",
      "version": "67.0.3396.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/67.0.3396.79",
      "version": "67.0.3396.79"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/67.0.3396.62",
      "version": "67.0.3396.62"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/66.0.3359.181",
      "version": "66.0.3359.181"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/66.0.3359.170",
      "version": "66.0.3359.170"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/66.0.3359.139",
      "version": "66.0.3359.139"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/66.0.3359.117",
      "version": "66.0.3359.117"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/65.0.3325.181",
      "version": "65.0.3325.181"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/65.0.3325.162",
      "version": "65.0.3325.162"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/65.0.3325.146",
      "version": "65.0.3325.146"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/64.0.3282.186",
      "version": "64.0.3282.186"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/64.0.3282.168",
      "version": "64.0.3282.168"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/64.0.3282.167",
      "version": "64.0.3282.167"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/64.0.3282.140",
      "version": "64.0.3282.140"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/64.0.3282.119",
      "version": "64.0.3282.119"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/63.0.3239.132",
      "version": "63.0.3239.132"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/63.0.3239.108",
      "version": "63.0.3239.108"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/63.0.3239.84",
      "version": "63.0.3239.84"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/62.0.3202.94",
      "version": "62.0.3202.94"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/62.0.3202.89",
      "version": "62.0.3202.89"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/62.0.3202.75",
      "version": "62.0.3202.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/62.0.3202.62",
      "version": "62.0.3202.62"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/61.0.3163.100",
      "version": "61.0.3163.100"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/61.0.3163.91",
      "version": "61.0.3163.91"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/61.0.3163.79",
      "version": "61.0.3163.79"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/60.0.3112.113",
      "version": "60.0.3112.113"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/60.0.3112.101",
      "version": "60.0.3112.101"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/60.0.3112.90",
      "version": "60.0.3112.90"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/60.0.3112.78",
      "version": "60.0.3112.78"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/59.0.3071.115",
      "version": "59.0.3071.115"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/59.0.3071.109",
      "version": "59.0.3071.109"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/59.0.3071.104",
      "version": "59.0.3071.104"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/59.0.3071.86",
      "version": "59.0.3071.86"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/58.0.3029.110",
      "version": "58.0.3029.110"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/58.0.3029.110",
      "version": "58.0.3029.110"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/58.0.3029.96",
      "version": "58.0.3029.96"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/58.0.3029.96",
      "version": "58.0.3029.96"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/58.0.3029.81",
      "version": "58.0.3029.81"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/57.0.2987.133",
      "version": "57.0.2987.133"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/57.0.2987.110",
      "version": "57.0.2987.110"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/57.0.2987.98",
      "version": "57.0.2987.98"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/56.0.2924.87",
      "version": "56.0.2924.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/56.0.2924.76",
      "version": "56.0.2924.76"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/55.0.2883.87",
      "version": "55.0.2883.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/55.0.2883.75",
      "version": "55.0.2883.75"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/54.0.2840.99",
      "version": "54.0.2840.99"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/54.0.2840.87",
      "version": "54.0.2840.87"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/54.0.2840.71",
      "version": "54.0.2840.71"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    },
    {
      "name": "chrome/platforms/win/channels/stable/versions/unknown_version",
      "version": "unknown_version"
    }
  ]
}
```

{% endDetails %}

Replacing `win` with `all` in the example above would retrieve Chrome Stable
version information for all platforms.

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/stable/versions
```

Replacing `stable` with `all` would retrieve version information for all Windows
channels:

```http
GET https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/all/versions
```

## Learn more

Check out the [examples](/docs/versionhistory/examples/) for examples of other use cases,
and check out the [reference](/docs/versionhistory/reference/) for detailed technical information,
including how to [filter](/docs/versionhistory/reference/#filter) and
[order](/docs/versionhistory/reference/#order) results.

[rest]: https://en.wikipedia.org/wiki/Representational_state_transfer
[channels]: https://www.chromium.org/getting-involved/dev-channel#TOC-How-do-I-choose-which-channel-to-use-
[platform identifier]: /docs/versionhistory/reference/#platform-identifiers