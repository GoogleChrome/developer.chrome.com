---
layout: 'layouts/doc-post.njk'
title: 'Report schedules'
subhead: >
  Learn when the Attribution Reporting API sends aggregatable and event-level reports.
description: >
  Learn when the Attribution Reporting API sends aggregatable and event-level reports.
date: 2023-03-06
updated: 2023-07-21
authors:
  - maudn
---

With the Attribution Reporting API, reports are not sent immediately after a user converts. Instead, the browser sends them with a delay.

Note that regardless of report type, reports are only sent when the browser is running and online. If the browser is online and fails to send a report, it tries to send the report again after 5 minutes. After the second failure, the browser tries to send the report again after 15 minutes. After that, it's not sent and the report is deleted. The browser only reattempts to send reports when it is online.

This page describes default behavior. If you need to customize report scheduling behavior, or if you need to filter out conversions happening after a certain window, you can use [custom report windows](/docs/privacy-sandbox/attribution-reporting/custom-report-windows/).


## Aggregatable report schedules

Aggregatable reports are sent by the browser to the ad tech provider or advertiser with a random delay between zero and 10 minutes, or with a small delay after the browser starts again. 

## Event-level report schedules

{% Aside %}
What's described in this section is the default behavior. If you need to customize report scheduling behavior by shortening a report window, or if you need to filter out conversions happening after a certain window, you can use [custom report windows](/docs/privacy-sandbox/attribution-reporting/custom-report-windows/).
{% endAside %}

View-through conversion reports are sent by the browser to the ad tech approximately one hour after the view event (that the conversion is attributed to) is no longer eligible for attribution.

Click-through conversion reports are sent following a more complex schedule of attribution windows; they are sent at least two days after conversion.

After the initial ad click or view, a schedule of built-in reporting windows begins. Each reporting window has a deadline. Conversions registered before that deadline are sent at the end of that window. 

Click reports are sent during one of three windows: 2, 7, or 30 days after conversion.

Views have one window. After expiry⏤the duration of time specified in expiry, starting from the click/view event⏤conversions can no longer be attributed to this event.

{% Aside %}
Reports may not be sent exactly at the scheduled dates and times. If the browser isn't running when a report is scheduled to be sent, the report is sent at browser startup. In this case, the browser may also decide to delay some of these reports for a random, but short, period of time.
{% endAside %}

### Views (event sources)

In Chrome, reports are sent approximately one hour after the expiry time (one hour after the unique window).
Because the default expiry is 30 days, if expiry isn't changed explicitly, reports are sent 30 days plus 1 hour after the view event.

### Clicks (navigation sources)

The following list shows when a report is sent based on how long after a click the conversion takes place.

<dl>
  <dt>Using the default value of 30 days, or not explicitly set</dt>
    <dd>Reports are sent 2 days, 7 days, or 30 days (plus 1 hour) after the click.<br>
  For example, if the user converts 1 day after click, the report is sent approximately 2 days after the click. If the user converts 3 or 5 days after click, the report is sent approximately 7 days after the click. If the user converts 9 or 25 days after click, the report is sent approximately 30 days after the click.</dd>
  <dt>With an expiry between 7 and 30 days</dt>
    <dd>The report is sent 2 days, 7 days, or expiry (plus 1 hour) after the click.</dd>

  <dt>With an expiry between 2 and 7 days</dt>
    <dd>The report is sent 2 days or expiry (plus 1 hour) after the click.</dd>
  <dt>With an expiry under 2 days</dt>
    <dd>The report is sent at the expiry (plus 1 hour) after the click.</dd>
</dl>

## Next steps

Review the following docs for more information on report schedules and filtering reports.

- [Custom report windows](/docs/privacy-sandbox/attribution-reporting/custom-report-windows/)
- [Define custom rules using filters](/docs/privacy-sandbox/attribution-reporting/define-filters/)