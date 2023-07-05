---
layout: 'layouts/doc-post.njk'
title: 'Troubleshoot differences in Attribution Reporting measurements'
subhead: >
  Learn why your measurements may be different in Attribution Reporting than they were with cookies.
description: >
  Learn why your measurements may be different in Attribution Reporting than they were with cookies.
date: 2022-03-01
updated: 2023-07-07
authors:
  - maudn
---

<!-- moved limitations section to schedule/index.md -->
## Differences between cookie-based and API measurements

If you notice data reported in summary reports is different from what you expected using cookies, review the possible reasons here.

### A cookie-based conversion is not reported with Attribution Reporting

#### Works as intended

-   Privacy-preserving API behaviors:
    -   A user hits the report rate limit—causing all subsequent
        reports to not be sent in the time period; or a source is removed due
        to the pending destination limit.
    -   For event-level reports: the report is subject to randomized
        response [noise](/docs/privacy-sandbox/attribution-reporting/noise/) and is suppressed.
    -   For event-level reports: the
        [limit](/docs/privacy-sandbox/attribution-reporting/schedule/#event-level-reports-1)
        of three (for clicks) or one (for views) reports has been reached, and
        subsequent reports have no explicit priority set, or a priority that is
        lower than existing reports.
    -   The contribution limits for aggregatable reports have been exceeded.
-   Ad tech-defined business logic:
    -   A conversion is filtered out via
        [filters](/docs/privacy-sandbox/attribution-reporting/define-filters/)
        or
        [priority](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/)
        rules.
-   User action:
    -   [User-initiated data deletion](/docs/privacy-sandbox/attribution-reporting-data-clearing/).
-   Time delays or interactions with network availability (e.g., the user
    turns off their device for an extended period of time).

#### Unintended causes

-   Implementation issues:
    -   The source header is misconfigured.
    -   The trigger header is misconfigured.
    -   Other configuration issues.
-   Browser or network issues:
    -   Failures due to network conditions.
    -   Source or trigger registration response doesn't reach the client.
    -   Browser bug.

### A conversion is not reported with cookies but was reported with the API

#### Works as intended

-   Privacy-preserving API behaviors:
    -   The report is a randomized report (noise).

#### Unintended causes

-   Implementation issue:
    -   A source is misconfigured. 