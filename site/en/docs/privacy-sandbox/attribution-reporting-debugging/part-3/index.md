---
layout: 'layouts/doc-post.njk'
title: 'Debugging cookbook'
subhead: Part 3 of 3 on debugging Attribution Reporting. Find instructions for how to use debug reports.
description: Part 3 of 3 on debugging Attribution Reporting. Find instructions for how to use debug reports.
date: 2022-12-13
updated: 2023-03-02
authors:
  - maudn
  - alexandrawhite
---

{% Partial 'privacy-sandbox/ara-debugging-series-intro.njk' %}

In this cookbook, you’ll find instructions for how to use debug reports for various use cases outlined in [Part 1: Introduction to debug reports](/docs/privacy-sandbox/attribution-reporting-debugging/part-1/).

{% Details %}
{% DetailsSummary 'h2' %}

## Glossary {: #glossary}

{% endDetailsSummary %}

{% Partial 'privacy-sandbox/ara-debugging-glossary.njk' %}

{% endDetails %}

## How-to: Check your integration in real time

1. Set up your system to generate **success debug reports**. See how in [Part 2: Set up Debug reports](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/).
1. Whenever you deploy Attribution Reporting code, check in real time if you're receiving some success debug reports on your endpoint. If so, your Attribution Reporting setup is working.
1. Success debug reports are only sent when a conversion takes place. Instead, you may want to check that your integration is properly set up regardless of conversions—that is, you want to check that sources are successfully registered. To achieve this, you can rely on _source registration success_ **verbose debug reports**. See how to set them up in [Part 2: Set up Debug reports](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/).

{% Aside 'caution' %}
This is only a basic check. Your implementation may still contain bugs, and other factors will cause measurement data loss. For more advanced checks, review the other use cases.
{% endAside %}

## How-to: Analyze loss and troubleshoot your integration

To compare cookie-based conversion measurement results with Attribution Reporting reports, use [debug keys](#glossary) and map cookie conversions with debug reports. Remember that debug reports are [sent immediately](/docs/privacy-sandbox/attribution-reporting-debugging/part-1/#debug-reports-are-sent-immediately) to your endpoint.

### Overview

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/VZpOhA8ra1QtQ9W34tBH.png", alt="Steps for a loss analysis", width="800", height="609" %}

Use the debug keys (`<source_debug_key, trigger_debug_key>` pair) to map cookie conversions to success debug reports.
**For each cookie conversion, at conversion time, did you receive a corresponding success debug report?**

**If yes**: for all of these success debug reports, you can expect to receive an attribution report later—with a few exceptions. **Review the [Success debug report scenario](#success-debug-report) for details.**

**If not**: this means that the conversion didn’t register with Attribution Reporting. Use the `<source_debug_key, trigger_debug_key>` pair (or source debug key if the trigger debug key is absent) to map cookie conversions to verbose debug reports. **For each of these conversions, did you at some point (source or trigger time) receive a corresponding verbose debug report?**

- If you did not receive a verbose debug report: this may be due to user behavior or to an integration issue. **Review the [no debug report scenario](#no-debug-reports) for details.**

- If you did receive a verbose debug report, look at its `type` field.

  - If its `type` is `source-success`: this means the source was successfully registered, but the trigger wasn't. To narrow down the reason why the success debug report is missing, look for a corresponding verbose debug report of any other type⏤that report will indicate an issue on the trigger side.

  - If its `type` is anything else: the source or trigger has not been registered. `type` tells you why. The corresponding attribution report (and success debug report) will be missing. Depending on the `type` of a verbose debug report, you may want to just take this information as a loss analysis data point (in other words, no action for you), or you may want to file a bug or troubleshoot your implementation. **Review the [verbose debug report scenario](#verbose-debug-report) for details.**

{% Aside 'gotchas' %}
_Success debug reports_ are sent when the browser successfully generates the event-level report or aggregatable report.
Most _verbose debug reports_, on the other hand, are sent when a source or trigger is not registered successfully—except for the _source registration success verbose debug report_.
{% endAside %}

{% Aside %}
In this overview, we're describing how to run a comprehensive analysis, including troubleshooting potential implementation issues.

However, you may be in a testing phase where you want to solely focus on eliminating implementation issues, without necessarily running a comprehensive loss analysis and waiting for a given set of conversions. In that case, you can directly look into [specific verbose reports types that may indicate implementation issues](#other-verbose-reports) as you receive them.
{% endAside %}

### Possible scenarios

#### Success debug report

If for a given cookie conversion, you received a success debug report, this means that this conversion was successfully registered with Attribution Reporting.

**You can expect to receive later an attribution report for this conversion**⏤with a few exceptions:

- User behavior: [clearing data](/docs/privacy-sandbox/attribution-reporting-data-clearing/) after conversion and before the attribution report is sent, closing their browser, etc. If a user closes their browser after converting and does not open their browser for a week, the report won't be sent for a week or more. You may consider this delay as a loss.
- Applicable to Event-Level only: An event-level report is replaced by another higher priority report.
- Possible network issues.

{% Aside %}
When the browser tries to send a report but fails because of network issues, it retries twice before eventually giving up.
{% endAside %}

#### Verbose debug report of type `source-success`

If for the source of a given cookie conversion, you received a verbose debug report of type `source-success`, this means that the source registration was successful. Depending on whether trigger registration is also later successful, you may or may not receive a report for that conversion.

There is one caveat to this:

{% Aside 'gotchas' %}
The source registration success verbose debug report is sent even if the unattributed reporting origin limit is reached. It's sent for security reasons, even though the source registration isn't actually successful in that case.
{% endAside %}

#### Verbose debug report of any other type

If for a given cookie conversion, you received a verbose debug report of any other type, you won't receive a success debug report, and hence later no attribution report⏤because a verbose report means that a reportable failure took place. Something prevented source registration, trigger registration, report generation or report sending. Possible causes:

- Privacy limits
- Storage limits
- Custom rules
- Implementation issue in your code
- Browser bug

Some of these are expected! Which action to take depends on each verbose report's `type`. Review the [verbose reports reference](#verbose-reference).

#### No debug reports

If for a given cookie conversion, you received only an attribution report (no success debug report nor verbose debug report), this means that something prevented the debug reports from being generated. Possible causes:

- User preferences (the user has turned off third-party cookies)
- Missing cookie, or missing debug keys (debug key cleared due to a missing cookie). In `chrome://attribution-internals`, open the **Logs** tab and check if any issue is surfaced there.
- Network issues that occurred at source or trigger time, but not when the attribution report was sent.

**Are you receiving attribution reports?**

This is a subcase of not receiving a debug report: if for a given cookie conversion, you didn't receive reports of any kind (no debug report of any kind, no attribution report), this means that a non-reportable failure took place. Possible causes:

- Fundamental integration issue. Review how to troubleshoot these in [Fix fundamental integration issues](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/#fix-fundamental-issues).
- Possible network issues.
- User preferences in browser settings, e.g. Privacy Sandbox turned off, or origin trial not active in the user's browser.

## Verbose debug reports reference

Each verbose debug report has a `type` field that captures the reason why the corresponding attribution report was dropped. Use the reference to figure out, for each `type` of verbose report, what action to take.

{% Aside %}
If a verbose report's `type` starts with `trigger-event`, it can only be generated for source or trigger events that are associated with event-level reports. If a verbose report's `type` starts with `trigger-aggregate`, it can only be generated for source or trigger events that are associated with aggregatable reports.
In all other cases, it's for either an event-level or an aggregatable report.
{% endAside %}

### Source registration success

A source is successfully registered.

`source-success`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-success)

{% Aside 'gotchas' %}
The source registration success verbose debug report is sent even if the unattributed reporting origin limit is reached. It's sent for security reasons, even though the source registration isn't actually successful in that case.
{% endAside %}

### Privacy limitations reports

**These reports are expected.** They indicate privacy limitations to reduce cross-site user identity leakage.

`source-destination-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-destination-limit)

`source-noised`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-noised)

`trigger-attributions-per-source-destination-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md)

`trigger-reporting-origin-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-reporting-origin-limit)

`trigger-event-noise`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-noise)

`trigger-event-excessive-reports`
: This is generated if the report count is over limit; you can register at most one conversion for views, and three for clicks. Note that you can configure what reports to receive by setting [priorities](/docs/privacy-sandbox/attribution-reporting/change-attribution-logic/).
[Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md)

### Storage limitations reports

**These reports are expected.** They indicate storage limitations to prevent excessive resource usage.

`source-storage-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-storage-limit)

`trigger-event-storage-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-storage-limit)

`trigger-aggregate-storage-limit`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-storage-limit)

### Custom rules reports

**These reports are expected if you're using filtering, deduplication, priorities, or window-based filtering**. Just in case, double-check the corresponding custom rules to confirm that the report corresponding to that verbose report is indeed a report you want to drop. If this is correct, there is no action for you to take.

`trigger-no-matching-filter-data`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-no-matching-filter-data)

`trigger-event-no-matching-configuration`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-no-matching-configurations)

`trigger-event-deduplicated`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-deduplicated)

`trigger-aggregate-deduplicated`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-deduplicated)

`trigger-event-low-priority`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-low-priority)

`trigger-event-report-window-passed`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-report-window-passed)

`trigger-aggregate-report-window-passed`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-report-window-passed)

### Other verbose reports

**These reports may indicate potential implementation issues in your code.**

`trigger-no-matching-source`
: This may be an implementation issue. Check that there is no misconfiguration in your setup of `<reporting origin, destination>`. This may also be expected API behavior. For example, the user has cleared data at some point after engaging with an ad and before converting, or the user converted without ever seeing an associated ad.
[Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-no-matching-source)

`trigger-aggregate-no-contributions`
: This is likely not the behavior you intend your code to have. Troubleshoot your trigger registration code; make sure that your contribution configuration is correct.
[Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-no-contributions)

`trigger-aggregate-insufficient-budget`
: This is likely not the behavior you intend your code to have. Double-check your trigger registration code to make sure that the sum of all contributions doesn't exceed the contribution budget.
[Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-insufficient-budget)

### Unexpected errors (potential browser bugs)

**These reports are unexpected**. They could be due to a browser bug! [File a bug](https://bugs.chromium.org/p/chromium/issues/entry?components=Internals%3EAttributionReporting') and specify in your description the steps to reproduce it.

`source-unknown-error`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-unknown-error)

`trigger-unknown-error`
: [Details and report body](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-unknown-error)

{% Details %}
{% DetailsSummary 'h2' %}

## Loss analysis example

{% endDetailsSummary %}

### Step 1: Setup and mapping with cookies

Follow the instructions in [Part 2: Set up debug reports](/docs/privacy-sandbox/attribution-reporting-debugging/part-2) to set up your system to generate **success debug reports** and **verbose debug reports**.

With this, you can use cookie-based conversion information to look up the corresponding debug reports or attribution reports.

### Step 2: Identify successful registrations and missing reports

In this example, let's assume you've tracked 100 conversions with your cookie-based system.

Each time you record a cookie-based conversion, look for the success debug report (sent immediately) that has the same `<source_debug_key, trigger_debug_key>` pair as this cookie-based conversion.

Let's assume you've received a success debug report for 70 of these cookie conversions.

- Success reports mean that the attribution has been successfully recorded, so you can safely assume that you will be getting an attribution report that corresponds to each success report—with some exceptions.
- You can decide to monitor these exceptions. To do so, as attribution reports are sent onto your endpoint over the next days/weeks (depending on expiry), look for the attribution reports that have the same debug keys pair as each success debug report. Make sure to wait a bit: reports may not be sent immediately at the end of each window. Let's assume that you find only 60 attribution reports. The 10 missing attribution reports may be due to user behavior.

{% Aside %}
It's possible you have event-level attribution reports that do not map to a cookie-based conversion. These are most likely noisy reports that were randomly generated by the API. You can confirm this by looking for debug verbose reports of type `source-noised` that have the same source debug key as your event-level report.
{% endAside %}

### Step 3: Brief loss assessment

100-70 = 30 success debug reports are missing. This means that these 30 conversions (that were tracked in your cookie-based implementation) weren't recorded with Attribution Reporting. You will not be receiving attribution reports for these.

Since you have 100 cookie-based conversions and only 70 attribution-based conversions, your loss is 30%. You now have a brief loss assessment.

### Step 4: Analyze causes

To investigate why these reports are missing, look for corresponding verbose debug reports you've received at conversion (trigger registration) time or earlier at source registration time. Use the keys of the cookie-based conversions to map these to verbose debug reports.

- Let's assume that there are 10 keys for which there is no verbose debug report. Check if there's any integration issue. If not, this may be due to user behavior.
- You have 20 verbose debug reports. You can now refine your loss analysis. Analyze the `type` field of each verbose report. For example, you may find that:
  - 10 (= 10% in our example) reports are missing due to `pending destination limit`
  - 5 (= 5%) reports are missing due to `trigger-aggregate-no-contributions`.
  - 5 (= 5%) reports are missing due to `unknown-error`.

### Step 5: Take action and troubleshoot

Now that you've gained visibility into why reports are missing, you can act on these insights.

Which action to take depends on each verbose report's `type`. Review the verbose reports reference for details. For example:

- `pending-destination-limit` is a privacy protection. There's no action to take. Use this number as a data point, for your own visibility and monitoring.
- `trigger-aggregate-no-contributions` may be the sign of an implementation issue on your side. Analyze this further. Use details in the verbose report's body to troubleshoot and fix this if needed.
- `unknown-error` may be the sign of a browser bug or network error. If you repeatedly encounter this, file a bug for browser developers.

{% endDetails %}
