---
layout: 'layouts/doc-post.njk'
title: 'Size limitations for aggregatable data'
subhead: >
  Understand the limits of destinations, attributions, reporting origins, and the impact on schedules.
description: >
  Understand the limits of destinations, attributions, reporting origins, and the impact on schedules.
date: 2022-03-31
updated: 2023-07-15
authors:
  - maudn
---

## Limiting factors

Intro

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
- `trigger_data` (conversion-side information) is up to 3 bits, i.e. it should be either 0 or 1.
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

## Next steps

For more on report schedules, review [Report schedules](/docs/privacy-sandbox/attribution-reporting/schedule/).