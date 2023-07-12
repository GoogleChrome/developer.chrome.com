---
layout: 'layouts/doc-post.njk'
title: 'Set up debug reports'
subhead: Part 2 of 3 on debugging Attribution Reporting. Set up your debug reports.
description: Part 2 of 3 on debugging Attribution Reporting. Set up your debug reports.
date: 2022-12-13
authors:
  - maudn
  - alexandrawhite
---

{% Partial 'privacy-sandbox/ara-debugging-series-intro.njk' %}

{% Details %}
{% DetailsSummary 'h2' %}

## Glossary {: #glossary}

{% endDetailsSummary %}

{% Partial 'privacy-sandbox/ara-debugging-glossary.njk' %}

{% endDetails %}

## Implementation questions?

If you encounter any issue while setting up debug reports, [create an issue on our developer support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues) and we'll help you troubleshoot.

## Prepare to set up debug reports

Before you set up debug reports, follow these steps:

{% Details %}
{% DetailsSummary 'h3' %}

Check that you've applied best practices for API integration

{% endDetailsSummary %}

- Check that your code is gated behind feature detection. To be sure the API is not blocked by Permissions-Policy, run the following code:

  ```javascript
  if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // the Attribution Reporting API is enabled
  }
  ```

  If this feature detection check returns true, the API is allowed in the context (page) where the check is run. 
- (Not required during the testing phase: Check that you've set a [Permissions-Policy](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.ju0kr1sopvhz))

{% Aside 'gotchas' %}
Permissions-Policy requirements have been [relaxed](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#bookmark=id.qoybi4lx0dka) for testing, but a publisher or advertiser can still decide to explicitly disable the Attribution Reporting API using the Permissions-Policy. In this case, no source or trigger can be recorded (and therefore, no report can be generated or sent).
{% endAside %}

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Fix fundamental integration issues {: #fix-fundamental-issues}

{% endDetailsSummary %}

While debug reports are useful to help you detect and analyze loss at scale, some integration issues can be detected locally. Source and trigger header misconfiguration issues, JSON parsing issues, insecure context (non-HTTPS), and other issues that prevent the API from functioning will be surfaced in the [DevTools **Issues** tab](/docs/devtools/issues/).

{% Aside %}
These issues will not generate verbose debug reports, because they cause the API not to function. Only the absence of success debug reports indicates that you may be encountering some of these issues. Learn more in [Part 3: Debugging cookbook](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/).
{% endAside %}

DevTools issues can be of different types. If you encounter an `invalid header` issue, copy the header into the [header validator tool](https://wicg.github.io/attribution-reporting-api/validate-headers). This will help you identify and fix the field that's causing an issue.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TafeqOxgeSrRWhakTQmh.png", alt="Screenshot: header validation tool", width="800", height="399", class="screenshot screenshot--filled" %}

{% endDetails %}

## Set up debug reports: steps common to success reports and verbose reports

{% Details %}
{% DetailsSummary 'h3' %}

Step 1: Set the debug cookie {: #debug-cookie}

{% endDetailsSummary %}

Set the following cookie on the [reporting origin](#glossary):

```http
Set-Cookie: ar_debug=1; SameSite=None; Secure; Path=/; HttpOnly
```

The browser will check for the presence of this cookie on both source and trigger registration. The success debug report will only be generated if the cookie is present at both times.

**[Demo code: debug cookie](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L91)**

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 2: Set debug keys

{% endDetailsSummary %}

Each debug key must be a 64-bit unsigned integer formatted as a base-10 string. Make each debug key a unique ID.

- Map the source-side debug key to additional source-time information you think is relevant for you to debug.
- Map the trigger-side debug key to additional trigger-time information you think is relevant for you to debug.

You could for example set the following debug keys:

- Cookie ID + Source timestamp as a source debug key (and capture that same timestamp in your cookie-based system)
- Cookie ID + Trigger timestamp as a trigger debug key (and capture that same timestamp in your cookie-based system)

**With this, you can use cookie-based conversion information to look up the corresponding debug reports or attribution reports.** Learn more in [Part 3: Cookbook](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/).

Make the source-side debug key different from `source_event_id`, so that you can differentiate individual reports that have the same source event ID.

```http
Attribution-Reporting-Register-Source:
{
// … Usual fields for Attribution-Reporting-Register-Source
"debug_key":"647775351539539"
}
```

```http
Attribution-Reporting-Register-Trigger:
{
// … Usual fields for Attribution-Reporting-Register-Trigger
"debug_key":"938321351539743"
}
```

**[Demo code: source debug key](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L160)**
**[Demo code: trigger debug key](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L278)**

{% Aside %}
In the demo code, we give both debug keys the value of the legacy measurement third-party cookie. In a real system, you would make each key a unique ID, and map it to additional source-time information that you deem useful for debugging, as suggested in the example debug keys above.

{% endAside %}

{% endDetails %}

## Set up success debug reports

{% Aside %}
Try the [demo](https://goo.gle/attribution-reporting-demo) to generate and preview success debug reports in your browser.
Review the corresponding [code](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting).
{% endAside %}

The example code in this section generates success debug reports for both event-level and aggregatable reports. Event-level and aggregatable reports use the same debug keys.

{% Details %}
{% DetailsSummary 'h3' %}

Step 3: Set up an endpoint to collect success debug reports

{% endDetailsSummary %}

Set up an endpoint to collect the debug reports. This endpoint should be similar to the main attribution endpoint, with an additional `debug` string in the path:

- Endpoint for **event-level** success debug reports: `https://adtech.example/.well-known/attribution-reporting/debug/report-event-attribution`
- Endpoint for **aggregatable** success debug reports: `https://adtech.example/.well-known/attribution-reporting/debug/report-aggregate-attribution`

When an attribution is triggered, the browser will immediately send a debug report via a `POST` request to this endpoint.
Your server code to handle incoming success debug reports may look as follows (here on a node endpoint):

```javascript
// Handle incoming event-Level Success Debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/report-event-attribution',
  async (req, res) => {
    // Debug report is in req.body
    res.sendStatus(200);
  }
);

// Handle incoming aggregatable Success Debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/report-aggregate-attribution',
  async (req, res) => {
    // Debug report is in req.body
    res.sendStatus(200);
  }
);
```

**[Demo code: event-level debug reports endpoint](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L318)**

**[Demo code: aggregatable debug reports endpoint](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L353)**

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 4: Confirm your setup will generate success debug reports

{% endDetailsSummary %}

- Open `chrome://attribution-internals` in your browser.
- Make sure that the **Show Debug Reports** checkbox is checked, in both the **Event-Level Reports** and the **Aggregatable Reports** tabs.
- Open the sites on which you've implemented Attribution Reporting. Complete the steps you use to generate attribution reports; these same steps will generate success debug reports.
- In `chrome://attribution-internals`:
  - Check that attribution reports are correctly generated.
  - In the **Event-Level Reports** tab and the **Aggregatable Reports** tab, check that the success debug reports are generated too. Recognize them in the list with their blue `debug` path.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/n3BCxJZ9h915NJIrMdsi.png", alt="Screenshot: Attribution internals", width="800", height="484", class="screenshot screenshot--filled" %}

- On your server, verify that your endpoint immediately receives these success debug reports. Make sure to check for both event-level and aggregatable success debug reports.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/LWwuTRFZIIbY4g5aGYmI.png", alt="Screenshot: reporting origin server logs", width="800", height="381", class="screenshot screenshot--filled" %}

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 5: Observe success debug reports {: #success-reports-examples}

{% endDetailsSummary %}

A success debug report is identical to an attribution report, and contains both the source-side and the trigger-side debug keys.

<web-tabs>
  <web-tab title="Example event-level success debug report">

```json
{
  "attribution_destination": "https://advertiser.example",
  "randomized_trigger_rate": 0.0000025,
  "report_id": "7d76ef29-d59e-4954-9fff-d97a743b4715",
  "source_debug_key": "647775351539539",
  "source_event_id": "760938763735530",
  "source_type": "event",
  "trigger_data": "0",
  "trigger_debug_key": "156477391437535"
}
```

  </web-tab>
  <web-tab title="Example aggregatable success debug report">

```json
{
  "aggregation_service_payloads": [
    {
      "debug_cleartext_payload": "omRkYXRhgqJldmFsdWVEAACAAGZidWNrZXRQPPhnkD+7c+wm1RjAlowp3KJldmFsdWVEAAARMGZidWNrZXRQJFJl9DLxbnMm1RjAlowp3GlvcGVyYXRpb25paGlzdG9ncmFt",
      "key_id": "d5f32b96-abd5-4ee5-ae23-26490d834012",
      "payload": "0s9mYVIuznK4WRV/t7uHKquHPYCpAN9mZHsUGNiYd2G/9cg87Y0IjlmZkEtiJghMT7rmg3GtWVPWTJU5MvtScK3HK3qR2W8CVDmKRAhqqlz1kPZfdGUB4NsXGyVCy2UWapklE/r7pmRDDP48b4sQTyDMFExQGUTE56M/8WFVQ0qkc7UMoLI/uwh2KeIweQCEKTzw"
    }
  ],
  "shared_info": "{\"api\":\"attribution-reporting\",\"attribution_destination\":\"https://advertiser.example\",\"debug_mode\":\"enabled\",\"report_id\":\"4a04f0ff-91e7-4ef6-9fcc-07d000c20495\",\"reporting_origin\":\"https://adtech.example\",\"scheduled_report_time\":\"1669888617\",\"source_registration_time\":\"1669852800\",\"version\":\"0.1\"}",
  "source_debug_key": "647775351539539",
  "trigger_debug_key": "156477391437535"
}
```

  </web-tab>
</web-tabs>

{% endDetails %}

## Set up verbose debug reports

{% Aside %}
Try the [demo](https://goo.gle/attribution-reporting-demo) to generate and preview verbose debug reports in your browser.
Review the corresponding [code](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting).
{% endAside %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 3: Opt into verbose debugging in the source and trigger headers

{% endDetailsSummary %}

Set `debug_reporting` to `true` in both `Attribution-Reporting-Register-Source` and `Attribution-Reporting-Register-Trigger`.

```http
Attribution-Reporting-Register-Source:
{
// … Usual fields for Attribution-Reporting-Register-Source
"debug_key":"938321351539743",
"debug_reporting": true // defaults to false if not present
}

Attribution-Reporting-Register-Trigger:
{
// … Usual fields for Attribution-Reporting-Register-Trigger
"debug_key":"938321351539743",
"debug_reporting": true // defaults to false if not present
}
```

**[Demo code: source header](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js#L168)**

**[Demo code: trigger header](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js#L280)**

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 4: Set up an endpoint to collect verbose debug reports

{% endDetailsSummary %}

Set up an endpoint to collect the debug reports. This endpoint should be similar to the main attribution endpoint, with an additional `debug/verbose` string in the path:

```text
https://adtech.example/.well-known/attribution-reporting/debug/verbose
```

When verbose debug reports are generated, that is when a source or trigger isn't registered, the browser will immediately send a verbose debug report via a `POST` request to this endpoint.
Your server code to handle incoming verbose debug reports may look as follows (here on a node endpoint):

```javascript
// Handle incoming verbose debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/verbose',
  async (req, res) => {
    // List of verbose debug reports is in req.body
    res.sendStatus(200);
  }
);
```

Unlike success debug reports, there's only one endpoint for verbose reports. Verbose reports that relate to event-level and aggregated reports will all be sent to the same endpoint.

**[Demo code: verbose debug reports endpoint](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/d6e4c38664b6631657f81e6bdd13d0480be3c07d/attribution-reporting/functions/apps/adtech.js#L373)**

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 5: Confirm your setup will generate verbose debug reports

{% endDetailsSummary %}

While there are numerous types of verbose debug reports, it's sufficient to check your verbose debugging setup with only **one type** of verbose debug report. If this one type of verbose debug report is correctly generated and received, this means that all types of verbose debug reports will be correctly generated and received as well, because all verbose debug reports use the same configuration and are sent to the same endpoint.

{% Aside 'gotchas' %}
Pick a verbose debug report that's simple to test for. `trigger-no-matching-source` is a good candidate, because you can generate it by simply converting. Verbose reports that relate to trigger events tend to be better candidates; verbose report types that relates to source events are more tedious to purposefully generate.
{% endAside %}

1. Open `chrome://attribution-internals` in your browser.
2. Trigger an attribution (convert) on your site that's set up with Attribution Reporting. Given that there was no ad engagement (impression or click) before this conversion, you should expect a verbose debug report of type `trigger-no-matching-source` will be generated.
3. In `chrome://attribution-internals`, open the **Verbose debug reports** tab and check that a verbose debug report of type `trigger-no-matching-source` has been generated.
4. On your server, verify that your endpoint has immediately received this verbose debug report.

{% endDetails %}

{% Details %}
{% DetailsSummary 'h3' %}

Step 6: Observe verbose debug reports {: #verbose-reports-examples}

{% endDetailsSummary %}

Verbose debug reports generated at trigger time include both the source-side and the trigger-side debug key (if there is a matching source for the trigger).
Verbose debug reports generated at source time include the source-side debug key.

Example of a request containing verbose debugs reports, sent by the browser:

```json
[
  {
    "body": {
      "attribution_destination": "http://arapi-advertiser.localhost",
      "randomized_trigger_rate": 0.0000025,
      "report_id": "92b7f4fd-b157-4925-999e-aad6361de759",
      "source_debug_key": "282273499788483",
      "source_event_id": "480041649210491",
      "source_type": "event",
      "trigger_data": "1",
      "trigger_debug_key": "282273499788483"
    },
    "type": "trigger-event-low-priority"
  },
  {
    "body": {
      "attribution_destination": "http://arapi-advertiser.localhost",
      "limit": "65536",
      "source_debug_key": "282273499788483",
      "source_event_id": "480041649210491",
      "source_site": "http://arapi-publisher.localhost",
      "trigger_debug_key": "282273499788483"
    },
    "type": "trigger-aggregate-insufficient-budget"
  }
]
```

{% Aside 'gotchas' %}
Unlike a success debug request, a verbose debug request contains a **list (array)** of verbose report(s) in its body.
{% endAside %}

Each verbose report contains the following fields:

`Type`
: What caused the report to be generated. To learn about all verbose report types and what action to take depending on each type, review the verbose reports reference in [Part 3: Debugging cookbook](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/).

`Body`
: The report's body. It will depend on its type. Review the verbose reports reference in [Part 3: Debugging cookbook](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/).

A request's body will contain at least one, and at most two verbose reports:

- One verbose report if the failure only affects event-level reports (or if it only affects aggregatable reports). A source or trigger registration failure has only one reason; hence one verbose report can be generated per failure and per report type (event-level or aggregatable).
- Two verbose reports if the failure affects both event-level and aggregatable reports—with an exception: if the failure reason is the same for event-level and aggregatable reports, only one verbose report is generated (example: `trigger-no-matching-source`)

{% endDetails %}

## Up next

[Part 3: Debugging cookbook](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)
