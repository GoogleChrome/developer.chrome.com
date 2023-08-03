---
layout: 'layouts/doc-post.njk'
title: 'Private Aggregation API fundamentals'
subhead: >
   Key concepts of the Private Aggregation API
description: >
   Key concepts of the Private Aggregation API
date: 2022-10-11
authors:
   - kevinkiklee
---

## Who is this article for?

The [Private Aggregation API]( /docs/privacy-sandbox/private-aggregation) enables aggregate data collection from worklets with access to cross-site data. The concepts shared here are important for developers building reporting functions within Shared Storage and Protected Audience API.

*   If you're a **developer** building a reporting system for cross-site measurement. 
*   If you're a **marketer**, **data scientist**, or other **summary report consumer**, understanding these mechanisms will help you make design decisions to retrieve an optimized summary report.

## Key terms

Before reading this article, it will be helpful to familiarize yourself with key terms and concepts. Each of these terms will be described in-depth within this article.

*   An [_aggregation key_](#aggregation-key) (also known as a bucket) is a predetermined collection of data points. For example, you may want to collect a bucket of location data where the browser reports the country name. An aggregation key may contain more than one dimension (for example, country and ID of your content widget). 
*   An [_aggregatable value_](#aggregatable-value) is an individual data point collected into an aggregation key. If you want to measure how many users from France have seen your content, then `France` is a dimension in the aggregation key, and the `viewCount` of `1` is the aggregatable value.
*   _Aggregatable reports_ are generated and encrypted within a browser. For the Private Aggregation API, this contains data about a single event.
*   The [_Aggregation Service_](/docs/privacy-sandbox/aggregation-service) processes data from aggregatable reports to create a summary report.
*   A _summary report_ is the final output of the Aggregation Service, and contains noisy aggregated user data and detailed conversion data.
*   A _[worklet](https://developer.mozilla.org/docs/Web/API/Worklet)_ is a piece of infrastructure which allows you to run specific JavaScript functions and return information back to the requester. Within a worklet, you can execute JavaScript but you cannot interact or communicate with the outside page.

## Private Aggregation workflow

When you call the Private Aggregation API with an aggregation key and an aggregatable value, the browser generates an aggregatable report. The reports are sent to your server that batches the reports.  The batched reports are processed later by the Aggregation Service, and a summary report is generated. 

<figure class="screenshot">
{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/NqNZ51sVCASKNyNbYoHv.png", alt="Data flows from the client to the collector, then to the Aggregation Service to generate a summary report.", width="800", height="211" %}
</figure>

1. When you call the Private Aggregation API, the client (browser) generates and sends the aggregatable report to your server to be collected.
2. Your server collects the reports from the clients and batches them to be sent to the Aggregation Service.
3. Once you've collected enough reports, you'll batch and send them to the Aggregation Service, running in a trusted execution environment, to generate a summary report.

{% Aside 'key-term' %}
A _trusted execution environment_ is a special configuration of computer hardware and software that allows external parties to verify the exact versions of software running on the computer. TEEs allow external parties to verify that the software does exactly what the software manufacturer claims it does—nothing more or less.
{% endAside %}

The workflow described in this section is similar to the [Attribution Reporting API](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#). However, Attribution Reporting associates data gathered from an impression event and a conversion event, which happen at different times. Private Aggregation measures a single, cross-site event. 

## Aggregation key

An _aggregation key_ ("key" for short) represents the bucket where the aggregatable values will be accumulated. One or more dimensions can be encoded into the key. A dimension represents some aspect that you want to gain more insight on, such as the age group of users or the impression count of an ad campaign. 

For example, you may have a widget that is embedded across multiple sites and want to analyze the country of users who have seen your widget. You are looking to answer questions such as "How many of the users who have seen my widget are from Country X?" To report on this question, you can set up an aggregation key that encodes two dimensions: widget ID and country ID. 

The key supplied to the Private Aggregation API is a
[BigInt](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt), which consists of multiple dimensions. In this example, the dimensions are the widget ID and country ID. Let's say that the widget ID can be up to 4 digits long such as `1234`, and each country is mapped to a number in alphabetical order such as Afghanistan is `1`, France is `61`, and Zimbabwe is '195'.  Therefore, the aggregatable key would be 7 digits long, where the first 4 characters are reserved for the `WidgetID` and the last 3 characters are reserved for the `CountryID`. 

Let's say the key represents the count of users from France (country ID `061`) who have seen the widget ID `3276`, The aggregation key is `3276061`. 

<table>
  <tr>
   <td colspan="2" style="background-color: #efefef">Aggregation key
   </td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">Widget ID
   </td>
   <td style="background-color: #92da78">Country ID
   </td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">3276
   </td>
   <td style="background-color: #92da78">061
   </td>
  </tr>
</table>

{% Aside 'example' %}
If a dimension has available key space for multiple digits, but the value has fewer, add leading zeros. For example, if country ID allows 3 digits, the country ID for Algeria is `003`.
{% endAside %}

The aggregation key can also be generated with a hashing mechanism, such as SHA-256. For example, the string `“WidgetID=3276;CountryID=67”` can be converted to a hex string `c002f0033c108abf3ae0ec654fe38a1792186bfd582380b24ea93ebdeb6395be` which is equivalent to the BigInt `86849257128445315549261263548129498923703362729078813106545648910309959898558n`. 

Some important web APIs that are required to generate a hash, like [`crypto`](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API), are not currently available within Shared Storage worklets or Protected Audience API worklets. As these worklets cannot communicate outside of itself, if you want to create hashes, you need to pre-generate one or more hashes outside the worklet then pass it in.

{% Aside %}
Although the concepts are similar, the key is constructed differently for the Private Aggregation API than the Attribution Reporting API. For Private Aggregation, the complete key is specified at the one time, in the JavaScript call.
{% endAside %}

## Aggregatable value

Aggregatable values are summed per key across many users to generate aggregated insights in the form of summary values in summary reports. 

Let's return to the example question posed above: "How many of the users who have seen my widget are from France?" The answer to this question will look something like "Approximately 4881 users who have seen my Widget ID 3276 are from France."  The _aggregatable value_ is 1 for each user, and “4881 users” is the _aggregated value_ that is the sum of all _aggregatable values_ for that _aggregation key_. 

<table>
  <tr>
   <td colspan="2" style="background-color: #efefef">Aggregation key
   </td>
   <td style="background-color: #efefef">Aggregatable value
   </td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">Widget ID
   </td>
   <td style="background-color: #92da78">Country ID
   </td>
   <td style="background-color: #d2e9ff">View Count
   </td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">3276
   </td>
   <td style="background-color: #92da78">061
   </td>
   <td style="background-color: #d2e9ff">1
   </td>
  </tr>
</table>

For this example, we increment the value by 1 for each user who sees the widget. In practice, the aggregatable value can be scaled to improve [signal-to-noise ratio](#noise-and-scaling).

### Contribution budget

Each call to the Private Aggregation API is called a _contribution_. To protect user privacy, the number of contributions which can be collected from an individual are limited.

When you sum all aggregatable values across all aggregation keys, the sum must be less than the contribution budget. The budget is scoped per-worklet [origin](https://web.dev/same-site-same-origin/#origin), per-day, and is separate for Protected Audience API and Shared Storage worklets. A rolling window of approximately the last 24 hours is used for the day. If a new aggregatable report would cause the budget to be exceeded, the report is not created.

The _contribution budget_ is represented by the parameter `L<sub>1</sub>`, and for the current Privacy Sandbox Origin Trial, the contribution budget has been set to 2<sup>16</sup> = 65,536.  The value of the contribution budget is arbitrary where noise is scaled to it, and you can use this budget to maximize signal-to-noise ratio on the summary values (discussed more below in the [Noise and scaling](#noise-and-scaling) section below). 

To learn more about contribution budgets, see the [explainer](https://github.com/patcg-individual-drafts/private-aggregation-api#contribution-bounding-and-budgeting). Also, refer to the [Contribution Budget section of the Attribution Reporting strategy guide](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#) for more guidance. 

## Aggregatable reports

Once the user invokes the Private Aggregation API, the browser generates aggregatable reports to be processed by the Aggregation Service at a later point in time to generate [summary reports](/docs/privacy-sandbox/summary-reports/). An aggregatable report is JSON-formatted and contains an encrypted list of contributions, each one being an `{aggregation key, aggregatable value}` pair. Aggregatable reports are sent with a random delay up to one hour. 

The contributions are encrypted and not readable outside of Aggregation Service. The Aggregation Service decrypts the reports and generates a summary report. The encryption key for the browser and the decryption key for the Aggregation Service are issued by the coordinator, which acts as the key management service. The coordinator keeps a list of binary hashes of the service image to verify that the caller is allowed to receive the decryption key. 

An example aggregatable report with [debug mode](/docs/privacy-sandbox/private-aggregation#enabledebugmode) enabled: 

```js
  "aggregation_service_payloads": [
    {
      "debug_cleartext_payload": "omRkYXRhgaJldmFsdWVEAAAAgGZidWNrZXRQAAAAAAAAAAAAAAAAAAAE0mlvcGVyYXRpb25paGlzdG9ncmFt",
      "key_id": "2cc72b6a-b92f-4b78-b929-e3048294f4d6",
      "payload": "a9Mk3XxvnfX70FsKrzcLNZPy+00kWYnoXF23ZpNXPz/Htv1KCzl/exzplqVlM/wvXdKUXCCtiGrDEL7BQ6MCbQp1NxbWzdXfdsZHGkZaLS2eF+vXw2UmLFH+BUg/zYMu13CxHtlNSFcZQQTwnCHb"
    }
  ],
  "debug_key": "777",
  "shared_info": "{\"api\":\"shared-storage\",\"debug_mode\":\"enabled\",\"report_id\":\"5bc74ea5-7656-43da-9d76-5ea3ebb5fca5\",\"reporting_origin\":\"https://localhost:4437\",\"scheduled_report_time\":\"1664907229\",\"version\":\"0.1\"}"
```

The aggregatable reports can be inspected from the `chrome://private-aggregation-internals` page: 

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/mUpLvkqjpzATYeKtUDrW.png", alt="screenshot of the Private Aggregation API internals page", width="800", height="303" %}

For testing purposes, the “Send Selected Reports” button can be used to send the report to the server immediately. 

### Collect and batch aggregatable reports

The browser sends the aggregatable reports to the origin of the worklet containing the call to the Private Aggregation API, using the listed well-known path:

*   For Shared Storage: `/.well-known/private-aggregation/report-shared-storage`
*   For Protected Audience: `/.well-known/private-aggregation/report-protected-audience`

At these endpoints, you will need to operate a server — acting as a collector — that receives the aggregatable reports sent from the clients.

The server should then batch reports and send the batch to the Aggregation Service.  Create batches based on the information available in the unencrypted payload of the aggregatable report, such as the `shared_info` field. Ideally, the batches should contain 100 or more reports per batch. 

You may decide to batch on a daily or weekly basis. This strategy is flexible, and you can change your batching strategy for specific events where you expect more volume—for example, days of the year when more impressions are expected. Batches should include reports from the same API version, reporting origin, and schedule report time. 

## Aggregation Service

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png", alt="The service runs in a TEE, decrypts the aggregatable reports and adds noise to create the final summary report.", width="800", height="457" %}

The [Aggregation Service](/docs/privacy-sandbox/aggregation-service/) receives encrypted aggregatable reports from the collector and generates summary reports.

To decrypt the report payload, the Aggregation Service fetches a decryption key from the coordinator. The service runs in a trusted execution environment (TEE), which provides a level of assurance for data integrity, data confidentiality, and code integrity. Though you own and operate the service, you will not have visibility into the data being processed inside the TEE.  

## Summary reports

[Summary reports](/docs/privacy-sandbox/summary-reports/) allow you to see the data you have collected with noise added. You can request summary reports for a given set of keys.  

A summary report contains a JSON dictionary-style set of key-value pairs. Each pair contains:

*   _`bucket`_: the aggregation key as a binary number string.  If the aggregation key used is “123”, then the bucket is “1111011”.
*   _`value`_: the summary value for a given measurement goal, summed up from all available aggregatable reports with noise added.

For example:

```js
[
  {"bucket":` `"111001001",` `"value":` `"2558500"},  
  {"bucket":` `"111101001",` `"value":` `"3256211"},  
  {"bucket":` `"111101001",` `"value":` `"6536542"},  
]
```

### Noise and scaling

To preserve user privacy, the Aggregation Service adds noise once to each summary value every time a summary report is requested.  The noise values are randomly drawn from a [Laplace probability distribution](https://en.wikipedia.org/wiki/Laplace_distribution).  While you are not in direct control of the ways noise is added, you can influence the impact of noise on its measurement data. 

The noise distribution is the same regardless of the sum of all aggregatable values. Therefore, the higher the aggregatable values, the less impact the noise is likely to have.

For example, let's say the noise distribution has a standard deviation of 100 and is centered at zero. If the collected aggregatable report value (or “aggregatable value”) is only 200, then the noise's standard deviation would be 50% of the aggregated value. But, if the aggregatable value is 20,000, then the noise's standard deviation would only be 0.5% of the aggregated value. So, the aggregatable value of 20,000 would have a much higher signal-to-noise ratio.

Therefore, multiplying your aggregatable value by a scaling factor can help reduce noise. The scaling factor represents how much you want to scale a given aggregatable value.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qJ182Vhszwsgf1PVLEpT.png", alt="Noise is constant regardless of the aggregated value.", width="600", height="462" %}

Scaling the values up by choosing a larger scaling factor reduces the relative noise. However, this also causes the sum of all contributions across all buckets to reach the contribution budget limit faster. Scaling the values down by choosing a smaller scaling factor constant increases relative noise, but reduces the risk of reaching the budget limit.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qgDt0a7GaMFJ07zibVUw.png", alt="Scale the aggregatable value to the contribution budget.", width="400", height="340" %}

To calculate an appropriate scaling factor, divide the contribution budget by the maximum sum of aggregatable values across all keys.  

See the [Contribution section of the Attribution Reporting strategy guide](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2) to learn more. 

## Engage and share feedback

The Private Aggregation API proposal is under active discussion and subject to change in the future. If you try this API and have feedback, we'd love to hear it.

*   **GitHub**: Read the [proposal](https://github.com/patcg-individual-drafts/private-aggregation-api), [raise questions and participate in discussion](https://github.com/patcg-individual-drafts/private-aggregation-api/issues).
*   **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
*   Join the [Shared Storage API group](https://groups.google.com/a/chromium.org/g/shared-storage-api-announcements) and the [Protected Audience API group](https://groups.google.com/a/chromium.org/g/fledge-api-announce/) for the latest announcements related to Private Aggregation. 
