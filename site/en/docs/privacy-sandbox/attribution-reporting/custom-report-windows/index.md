---
layout: 'layouts/doc-post.njk'
title: 'Custom report windows'
subhead: >
  Custom report windows can provide faster event-level reports and selective reporting for aggregatable reports.
description: >
  Custom report windows can provide faster event-level reports and selective reporting for aggregatable reports.
date: 2022-12-15
updated: 2023-06-29
authors:
  - maudn
---

With custom report windows for Attribution Reporting (shipped in Chrome 110), you can instruct the browser to filter out conversions that occur after a certain time window. 

- For event-level reports, report windows allow you to get reports faster, in addition to filtering out conversions that take place after a certain time frame.  Depending on your goal, another way to look at this is as a trade-off: using report windows gives you faster access to reports, but implies that you may lose some conversions. Review the [event-level section](#event-level) for details.
- For aggregatable reports, report windows allow you to filter conversions that take place after a certain time frame. Review the [aggregatable section](#aggregatable) for details.

## What is a custom report window?

A custom report window is the period after source registration during which reports of the corresponding type (event or aggregatable) may be created for this source. 

For event-level reports, a report window also acts as the last window in which reports of the corresponding type will be sent. 

Key points about reporting windows:

- If no `report_window` is set, it falls back to `expiry`.
- If no `expiry` is set, it falls back to the default of 30 days.
- The minimum custom report window is one day. Even if you set a window of less than a day, the value will be clamped to a day. Review [the examples for event-level reports](#event-level-schedule).
- A report window is defined in seconds.

Note that the way `expiry` works is unchanged; `expiry` changes which impressions or clicks are eligible for attribution. 

### Event-level reports: faster reporting and selective reporting {: #event-level }

By default, event-level reports are sent following a [schedule of built-in report windows](/docs/privacy-sandbox/attribution-reporting/report-schedules/#event-level-report-schedules): three windows for clicks and one window for views.

For event-level reports, custom report windows enable you to:

- Get reports faster. Among other things, custom report windows enable you to get reports one day after the click or impression, instead of the two-day limit that was imposed by built-in expiry windows prior to Chrome 110. 
- Filter out conversions happening after a certain time frame. 

To use report windows for event-level reports, add the `event_report_window` field to your `Attribution-Reporting-Register-Source` source registration header.

```json
event_report_window
```

Event-level reports are scheduled to be sent at the latest shortly after the report window is reached. 

{% Aside %}
Remember, in all the following examples, if the browser isn't running when a report is scheduled to be sent, the report is sent at browser startup. In this case, the browser may also delay some of these reports for a short random time on startup.
{% endAside %}

### Schedule examples for event-level reports, clicks {: #event-level-schedule }

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>expiry</th>
      <th><pre>
event_report_window
</pre></th>
      <th>If a conversion takes place one day after the click, browser sends report:</th>
      <th>Reports filtered out (not sent) for conversions taking place:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default (30 days)</td>
      <td>(Not set)</td>
      <td>About 2 days plus 1 hour after click<br>
Default reporting behavior — built-in window #1</td>
      <td>About 30 days after click</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>(Not set)</td>
      <td>About 2 days plus 1 hour after click<br>
Default reporting behavior — built-in window #1</td>
      <td>More than 5 days after click</td>
    </tr>
    <tr>
      <td>Default (30 days)</td>
      <td>Set to 1 day</td>
      <td>About 1 day plus 1 hour after click<br>
<br>
Custom behavior due to your custom report window. Note how this gets you this report faster than in the first row, where you need to wait for the first built-in window (2 days)</td>
      <td>More than 1 day after click</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>Set to 1 day</td>
      <td>About 1 day plus 1 hour after click<br>
<br>
Custom behavior due to your custom report window</td>
      <td>More than 1 day after click</td>
    </tr>
    <tr>
      <td>Default (30 days)</td>
      <td>Set to 4 hours</td>
      <td>About 1 day plus 1 hour after click<br>
Custom behavior due to your custom report window. This is due to clamping: the minimum report window is one day. Even if you set a report window to less than a day, for example, 4 hours, its value will be clamped to a day.</td>
      <td>More than 1 day after click<br>
</td>
    </tr>
  </tbody>
</table>


### Schedule examples for event-level reports, views

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>expiry</th>
      <th>event_report_window</th>
      <th>If a conversion takes place one day after the click, the browser sends report:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default (30 days)</td>
      <td>(Not set)</td>
      <td>About 30 days plus 1 hour after view<br>
Default reporting behavior</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>(Not set)</td>
      <td>About 5 days plus 1 hour after view<br>
Default reporting behavior</td>
    </tr>
    <tr>
      <td>Default (30 days)</td>
      <td>Set to 1 day</td>
      <td>About 1 day plus 1 hour after view<br>
Custom behavior due to your custom report window</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>Set to 1 day</td>
      <td>About 1 day plus 1 hour after view<br>
Custom behavior due to your custom report window</td>
    </tr>
  </tbody>
</table>

### Aggregatable reports: selective reporting {: #aggregatable }

For aggregatable reports, the benefit of report windows is only to filter out conversions happening after a certain time frame. There is no benefit in terms of getting reports faster.

To use report windows for aggregatable reports, add the following field to your `Attribution-Reporting-Register-Source` source registration header:

```json
aggregatable_report_window
```

This will filter out conversions happening after a certain time frame.

Aggregatable reports are sent within an hour of trigger; they're randomly delayed between 10 minutes and an hour.

{% Aside %}
In the following table, for all cases, if a conversion takes place **one day after the click or impression**, the browser will send the report **approximately an hour after the trigger**.
{% endAside %}

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>expiry</th>
      <th><pre>
aggregatable_report_window
</pre></th>
<th>Reports filtered out (not sent) for conversions taking place:</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default (30 days)</td>
      <td>(Not set)</td>
      <td>More than 30 days after click or view</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>(Not set)</td>
      <td>More than 5 days after click or view</td>
    </tr>
    <tr>
      <td>Default (30 days)</td>
      <td>Set to 1 day</td>
      <td>More than 1 day after click or view</td>
    </tr>
    <tr>
      <td>Custom, set to 5 days</td>
      <td>Set to 1 day</td>
      <td>More than 1 day after click or view</td>
    </tr>
    <tr>
      <td>Default (30 days)</td>
      <td>Set to 4 hours</td>
      <td>More than 1 day after click or view. This is due to clamping: the minimum report window is one day. Even if you set a report window to less than a day, for example, 4 hours, its value will be clamped to a day.</td>
    </tr>
  </tbody>
</table>

{% Partial 'privacy-sandbox/ar-engage.njk' %}
