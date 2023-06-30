---
layout: 'layouts/doc-post.njk'
title: 'Report schedules'
subhead: >
  Learn how aggregatable and event-level reports are scheduled.
description: >
  Learn how aggregatable and event-level reports are scheduled.
date: 2022-03-01
updated: 2023-03-14
authors:
  - maudn
---

In the Attribution Reporting API, reports are sent based on a set schedule. Schedules are different for aggregatable reports and event-level reports.

Note that regardless of report type, reports are only sent when the browser is running and online. After the first failure to send, the report is retried after 5 minutes. After the second failure, the report is retried after 15 minutes. After that, it's not sent.


## Aggregatable reports

{% Aside %}
What's described in this section is the default behavior. If you need to filter out conversions happening after a certain window, you can use [custom report windows](docs/privacy-sandbox/attribution-reporting/custom-report-windows/).
{% endAside %}

### Report delays

Aggregatable reports are sent by the browser to the ad tech provider or advertiser with a random delay between 0-60 minutes, or with a small delay after the browser next starts up. 

## Event-level reports

{% Aside %}
What's described in this section is the default behavior. If you need to customize report scheduling behavior by shortening a report window, or if you need to filter out conversions happening after a certain window, you can use custom report windows.
{% endAside %}

* View-through conversion reports are sent by the browser to the ad tech approximately one hour after the view event the conversion is attributed to is no longer eligible for attribution.

* Click-through conversion reports are sent following a more complex schedule of attribution windows; they are sent at least two days after conversion.

After the initial ad click or view, a schedule of built-in reporting windows begins. 
Each reporting window has a deadline. Conversions registered before that deadline will be sent at the end of that window. 

Clicks have three windows (2, 7 and 30 days after conversion). Views have one.
After expiry⏤the duration of time specified in expiry, starting from the click/view event⏤conversions can no longer be attributed to this event.

{% Aside %}
Reports may not be sent exactly at the scheduled dates and times. If the browser isn't running when a report is scheduled to be sent, the report is sent at browser startup. In this case, the browser may also decide to delay some of these reports for a randome but short amount of time.
{% endAside %}

### Views (event sources)

In Chrome, reports are sent approximately one hour after the expiry time (one hour after the unique window).
Because the default expiry is 30 days, if expiry isn't changed explicitly, reports will be sent 30 days +1 hour after the view event.

### Clicks (navigation sources)

The following list shows the time a report is sent based on how long after a click the conversion takes place.

<dl>
  <dt>Using the default value of 30 days, or not explicitly set</dt>
    <dd>Reports will be sent 2 days, 7 days, or 30 days (+1 hour) after the click.<br>
  For example, if the user converts 1 day after click, the report is sent ~ 2 days after the click. If the user converts 3 or 5 days after click, the report is sent ~ 7 days after the click. If the user converts 9 or 25 days after click, the report is sent ~ 30 days after the click.</dd>
  <dt>With an expiry between 7 and 30 days</dt>
    <dd>The report is sent 2 days, 7 days or expiry (+1 hour) after the click.</dd>

  <dt>With an expiry between 2 and 7 days</dt>
    <dd>The report is sent 2 days or expiry (+1 hour) after the click.</dd>
  <dt>With an expiry under 2 days</dt>
    <dd>The report is sent 2 days (+1 hour) after the click</dd>
</dl>

## Limiting factors

### Event-level reports

The following sections on click and view events list features and limitations to keep in mind.

#### Click (`navigation` source)

- `source_event_id` (ad-side information) can be up to 64 bits - large enough to be be used as a unique identifier.
- `trigger_data` (conversion-side information) is up to 3 bits; that is, it should be an integer between 0 and 7.
- Up to 3 conversions can be attributed to a given source (ad click or view event).
- Noise is applied to reports in the form of a randomized response. The correct conversion count can be recovered via a script.
- Noise is applied with a 0.0024 (0.24%) probability in the current Chrome code.
- Reports are sent with a delay of between 2 and 30 days; the exact mechanism for view and clicks vary. See details.

#### View (`event` source)

- `source_event_id` (ad-side information) can be up to 64 bits - large enough to be be used as a unique identifier.
- `trigger_data` (conversion-side information) is up to 3 bits, i.e. it should be either 0 and 1.
- Up to 1 conversion can be attributed to a given source (ad click or view event).
- Noise is applied to reports in the form of a randomized response. The correct conversion count can be recovered via a script.
- Noise is applied with a 0.0000025 probability (0.00025%) in the current Chrome code.
- Reports are sent with a delay of between 2 and 30 days; the exact mechanism for view and clicks vary. See details.

### Aggregatable reports

The following list notes limitations to keep in mind.

#### Click (`navigation` source) and View (`event` source)

- The total values of all the buckets attributed to a source should be at most 65536.
  - For example:

    First conversion for a source:

      ```json
      "campaignCounts": 32768
      "geoValues": 1664
      ```

    Second conversion for that same source:

      ```json
      "campaignCounts": 12323
      "geoValues": 1664
      ```
    Note that there can be more conversions.
    In this example, the total = 32768 + 1664 + 12323 + 1664. The total must be under 65536, as mentioned earlier.

- The maximum number of aggregation keys allowed in the source registration is 50. This is also the maximum number of contributions per aggregatable report.
- Noise is applied in the aggregation service.
- Reports are sent with a random delay between 0-1 hours.

### All reports

- For a given user, within all unexpired sources, there can be a maximum of 100 different destinations (typically, advertiser sites, or sites where conversions are expected to take place). Unexpired sources are ad clicks or views to which a conversion can still be attributed, i.e. for which `expiry` has not yet been exceeded. I.e., the unique destination limit for attribution sources is covered by unexpired sources, instead of pending sources.
- 100 attributions per {source site, destination, reporting origin} (typically {publisher, advertiser, ad tech}) can be scheduled over 30 days.
- 100 unique reporting origins (typically ad techs) can register sources per {publisher, advertiser} per 30 days. This counter is incremented for each ad click or view (source event), even those that are not attributed.
- 10 unique reporting origins (typically ad techs) can send reports per {publisher, advertiser} per 30 days. This counter is incremented for every attributed conversion.
- Prior to Chrome 108, this limitation was as follows: For a given user, within all unattributed sources—ad clicks or views for which no conversion has been attributed yet—there can be a maximum of 100 different destinations (typically, advertiser sites, or sites where conversions are expected to take place).
