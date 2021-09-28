---
layout: 'layouts/blog-post.njk'
title: Chrome user device characteristics report
description: >
  Developers constantly wonder what kind of audience they are developing for. How much RAM do they have? What kind of Wi-fi are they on? A new report provides answers for a range of countries and platforms.
date: 2021-09-27
authors:
  - jichen
tags:
  - device-characteristics
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/SJJ2a5QPJ2jSsNyGDbTh.jpeg'
alt: >
  Many types of phones on a table.
---

Developers are constantly wondering about what kind of audience they are
developing for. Are they using high end devices with large RAM? What connection
are they using (for example Wi-Fi, 2G) and so on. The answers to these questions
can affect product development decisions such as choosing the
technologies to render the content. This report provides timeline data to inform
developers on these questions for a list of countries, such as the US, Brazil,
Japan, and others. Three platforms are included when data is available: Android,
Windows, and ChromeOS.

Looking at the data, there might be some interesting things for developers to
think about. For example, in Japan on the Android platform, the majority of
users have five to eight cores, and the prevalence is quite a bit higher than in
the US, and much higher than in next billion user (NBU) countries. Another
example: if you look at RAM on Android, a very low percentage of Brazil devices
have RAM larger than 5&nbsp;GB, which is much lower than in the US, and also lower
than India. We hope publishing information like this periodically will help
developers have a better understanding of the Chrome user device
characteristics.

This data comes from usage statistics sent to Google from Chrome installations.
In Chrome, users can choose to send usage statistics and crash reports to Google
to help improve Chrome's feature set and stability. Usage statistics and crash
reports are enabled by default for Chrome consumer installs and can be disabled
during installation or in Chrome's settings. Metrics collection is pseudonymous,
and metrics are tagged by an opaque per-install identifier that is not joinable
with other datasets.  If the metrics collection is re-enabled, the unique
identifier will also be reset. We used the data collected to calculate the
various statistics in this
[report](https://docs.google.com/document/d/1BPz0UnQGotX0dACmJbHbbXFJa38jxmKhhNQ2RLj5Gms/edit?usp=sharing).

Photo by [Halacious](https://docs.google.com/document/d/e/2PACX-1vTLB93N1X3QRs_0T869wIppeXYDGWeyDeVM5N8XSKVAx3cIl1RyNj3fM4gUn06cEimfUM4wubmC_laB/pub?urp=gmail_link) on [Unsplash](https://unsplash.com/s/photos/multiple-phones?utm_source=unsplash)
