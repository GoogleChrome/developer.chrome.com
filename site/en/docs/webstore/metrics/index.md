---
layout: "layouts/doc-post.njk"
title: "Analyze your store listing metrics"
date: 2021-08-17
updated: 2023-10-25
description: >
  Understanding metrics and performance of your Chrome Web Store store listing.
---

Interpreting your Chrome Web Store listing metrics can help you evaluate how changes to your extension and store
listing can affect conversion rates. For example, you can identify countries with a high number
of visitors so you can prioritize supporting languages for those countries. You can also export all
the reports described below as CSV files.

## Installs and uninstalls

You can track customer acquisition and churn using these reports:
- Track acquisition using the daily install report.
- Monitor user churn using the daily uninstalls analytics.

These numbers include new and returning
  users. You can configure this data by country, language, operating system, or time period using
  the “filter by” dropdown menus.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bj6IRC7am3XgQwcfxpnr.png", alt="daily installs
statistics chart", width="800", height="586" %}

## Impressions

The impressions metrics track the number of users that discover your extension while searching or
browsing the Chrome Web Store. An impression occurs when your extension is featured in any
collection or direct visits to your store item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Hu4dskyv3lIOuYB0qpv0.png", alt="daily impressions
statistics chart", width="800", height="299" %}

## Users

You can monitor weekly user retention for different groups of users, categorized by country,
language, operating system, and item version.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/jOUcBDD8sBcTFCXrGq1s.png", alt="weekly users
statistics chart", width="800", height="342" %}

{% Aside %}

The **Users** stats only captures installations; it doesn't monitor whether users are active or not.

{% endAside %}

## Google Analytics

To track store item metrics, you can opt in to Google Analytics 4 by clicking **Opt in to Google Analytics** under **Additional metrics** on the **Store listing** tab. After opting in you will receive an email notification.

The Chrome Web Store manages the account for you and makes the data available in Google Analytics. Chrome Web Store grants you access only to non user-level data. For group publishers, all developers within the group, regardless of their role within the group, are granted access to data for items owned by the group.
{% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/etCDPbAFMIeOcKvAW4rN.png", alt="Where to opt in to Google Analytics", width="713", height="123" %}

See [Using your Google Analytics account with the Chrome Web Store][analytics] to learn more.

[analytics]: /docs/webstore/google-analytics/
