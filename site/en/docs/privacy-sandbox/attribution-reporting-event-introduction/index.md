---
layout: 'layouts/blog-post.njk'
title: 'Event-level reports in the Attribution Reporting API '
subhead: >
  Learn the basics of ad conversion measurement with the Attribution Reporting API with event-level reports.
date: 2021-11-19
updated: 2021-11-19
hero: 'image/O2RNUyVSLubjvENAT3e7JSdqSOx1/DNYjVyAo6FG6Y8z80VkD.jpeg'
alt: >
  Ruler on yellow background
authors:
  - maudn
---

Event-level reports are one of the two types of reports that can be generated via the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-in-short/). This API makes it possible to measure ad conversions without cross-site tracking.

Event-level reports give access to **detailed display-side data at the level of an individual click event**: creative type (the type of graphics or media for an ad), serving time, publisher site, and any other granular information needed by an adtech company at ad-serving time.

## Who is this blogpost for?

This post is for you if:

- You're a developer getting ready to experiment with the Attribution Reporting API with event-level reports.
- You want to gain a better understanding of the API's use cases and behavior for event-level reports. What are these reports good for? What data do they give you access to? When are they sent?

## Before you read this

If you're new to Attribution Reporting, head over to [Attribution Reporting in five minutes](/docs/privacy-sandbox/attribution-reporting-in-short/) for a quick overview.
For an in-depth introduction, check out [Introduction to Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction/).

## Use cases for event-level reports

The Attribution Reporting API enables sites to measure conversions in the following cases:

- Ad clicks.
- Ads in a third-party iframe, such as ads on a publisher site that uses a third-party adtech provider.
- Ads in a first-party context, such as ads on a social network or a search engine results page, or a publisher serving their own ads.

This API can generate two types of insights:

- [Aggregate reports](/docs/privacy-sandbox/attribution-reporting-introduction/#:~:text=or%20invalid%20activity.-,Aggregate%20reports,-%2C%20on%20the%20other)
- Event-level reports

This post focuses on event-level reports.

**Event-level reports** associate an ad click with coarse conversion data.

<figure>
  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/WQi0OKAUfD6Agqx9j3s5.png", alt="Event-level: example report", width="400", height="235" %}
  <figcaption>Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.</figcaption>
</figure>

Event-level reports are suited to the following use cases:

- **Optimization**. Event-level reports help answer questions such as "How can
  I improve my return on investment?". They can be useful for optimizing ad
  placement, since reports can include a unique ad or click ID. This way, event-level reports can provide training data for machine learning models.
- **Coarse reporting**. Event-level reports currently support 3 bits of conversion data: a conversion can be associated to one of eight categories. This doesn't give you access to more granular data such as a specific purchase value or conversion time.
- **Fraud detection**. The data in some reports can be useful for ad fraud
  detection and analysis, by allowing you to understand patterns that can be used to
  identify spammy or invalid activity.

## Glossary

- An _attribution_ is the identification of user actions that contribute to an outcome. For example, a purchase can be _attributed_ to an ad click.
- A _conversion_ is a user action that is desirable for the advertiser or adtech company,
  such as a sign-up or purchase.
- In this API, the term _source_ is used to describe what happens on the ad display side⏤typically, a publisher site.
- The term _trigger_ is used to describe what happens on the
  conversion side—typically, an advertiser site.
- An _attribution source event_ (or _attribution source_, or _source_ for short) is when
  a user clicks an ad.
- A _source_ is said to be _triggered_ for attribution when a user converts. An
  _attribution trigger event_ is a conversion.

## How does it work?

To generate event-level reports, the browser matches _attribution source events_ (clicks) with _attribution trigger data_ (conversion data) defined by an adtech. Later, the browser sends the reports to a predefined endpoint, with some delay and noise.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/LmX5xkFFMmgG8cJEm78I.png", alt="Diagram that shows how Attribution Reporting with event-level reports work", width="800", height="517" %}
 <figcaption>How Attribution Reporting with event-level reports works</figcaption>
</figure>

Ad elements (<code>a</code>) can be configured with attributes that are specific to attribution reporting:

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>attributionsourceeventid</code>
      </td>
      <td>Custom data to attach to an ad click on the publisher's side, for example a
  click ID or campaign ID.</td>
    </tr>
    <tr>
      <td>
        <code>attributiondestination</code>
      </td>
      <td>The site for which an attribution trigger (conversion) is expected for this ad.</td>
    </tr>
    <tr>
      <td>
        <code>attributionreportto</code>
      </td>
      <td>The reporting endpoint that will be notified of conversions, namely the endpoint that will receive reports sent by the user's browser.</td>
    </tr>
    <tr>
      <td>
        (Optional)
        <code>attributionexpiry</code>
      </td>
      <td>The duration for which conversions can be attributed to a click on this ad—from the moment the ad is clicked.</td>
    </tr>
    <tr>
      <td>
        (Optional)
        <code>attributionsourcepriority</code>
      </td>
      <td>A priority to assign to this source.</td>
    </tr>
  </tbody>
</table>

It's also possible to register a source for navigations [initiated by
`window.open()`](/docs/privacy-sandbox/attribution-reporting-event-guide/#register-clicks-with-windowopen).

When the user clicks this ad, the browser—on the user's local
device—records this event, alongside the attribution configuration data that was
specified.

Later on, the user visits the advertiser's website and performs an action that the
advertiser or their adtech provider categorizes as a conversion, such as a purchase. When
this happens, the advertiser or adtech provider triggers an attribution: it asks the browser to record an attribution and attaches some data to it, the trigger data. The browser then matches the ad click and attribution trigger data.

Finally, the browser schedules a report to be sent to the endpoint specified on the ad
side. This report includes:

- Custom source-side data that the adtech or advertiser attached to the ad click.
- Custom data from the attribution side (trigger data), with some noise.

If several triggers are registered for a given ad click, up to three corresponding
reports will be sent.

Reports are sent by the browser after a delay⏤days or sometimes weeks after an attribution trigger (conversion). The trigger data may be noised.

## API behavior and parameters

### Detailed source-side data and limited conversion data

Event-level reports link **detailed source-side data** with **coarse conversion-side data** (trigger data).

The **source-side data** (source event ID) can be used by an adtech company as an identifier to attach to an ad click.
An adtech company could map this identifier to the creative type, serving time, publisher site, and any other granular information needed by the adtech company at ad-serving time.

The source event ID can be up to 64 bits⏤a large number. `18446744073709551612` is an example of a source event ID.

The **trigger data** (conversion data) is limited to only 3 bits. 3 bits can hold a number between 0 and 7, that is one of eight categories.
This is not enough to hold a unique identifier. This limitation is a privacy protection: it prevents this API from being used to join user identity across sites via a unique user identifier.

#### Example

Because event-level reports can only contain 3 bits of trigger data, you may for example decide to use this data to encode conversion types. Using your encoding system, you can determine that a given trigger data value signifies a purchase or a signup.

```text
site visit: 0, purchase: 1, newsletter signup: 2, account creation: 3
```

```text
ClickID 1298765678762 led to a conversion of value 1.
```

{% Aside 'caution' %}
Event-level reports can **not** contain detailed conversion data (trigger data) such as exact purchase values. You **can't** get event-level reports that look like this:

```text
ClickID 1298765678762 led to a $317 purchase (red sports shoes) in Boston, CA.
```

This is supported in [aggregate reports](/docs/privacy-sandbox/attribution-reporting-introduction/#:~:text=Aggregate%20reports%2C%20on%20the%20other%20hand%2C%20offer%20more%20detailed%20conversion%20data).
{% endAside %}

### One reporting endpoint

Reports can be sent only to **one endpoint**.

{% Aside %}
More flexible endpoint configurations are [under discussion](https://github.com/WICG/conversion-measurement-api/issues/96).
{% endAside %}

### Noise

The trigger data (conversion data) is _noised_. Noise is a privacy protection that comes on top of the [data limitation to 3 bits](#detailed-source-side-data-and-limited-conversion-data).

{% Aside "key-term" %}
When trigger data has its values randomized in some way, this creates _noised data_.
{% endAside %}

This means that **a small percentage of the time, a report will contain inaccurate trigger data instead of the real data**.

In Chrome, 5% of the time the browser will send inaccurate trigger data instead of real.

#### Example

ClickID `1298765678762` led to a conversion of value `1`.

Instead of receiving this report:

```text
Click 1298765678762 led to a conversion of value 1.
```

You may receive the following report:

```text
Click 1298765678762 led to a conversion of value 4.
```

### Report limitation

To protect user privacy, the number of reports is limited. For a given source event (click), **at most three conversions can be registered**.

{% Aside  %}
This means that conversions will be dropped if a user converts more than three times. You can choose which conversions to get and which are fine to drop by configuring [conversion priorities](/docs/privacy-sandbox/attribution-reporting-event-guide/#prioritize-specific-conversions).
{% endAside %}

#### Example

A user clicks an ad. Later on, they visit the advertiser site (first conversion), then
create an account (second), and finally make two separate purchases (third and fourth).

Even though they have converted four times, by default, you'll receive a report only for the first three conversions.

### Report scheduling

Reports are **not sent immediately after a user converts**. To protect privacy, reports are sent with a delay during a **reporting window**.

After the initial ad click, a schedule of reporting windows begins. Each reporting window has a
deadline. Conversions registered before that deadline will be sent at the end of that window.

{% Aside 'caution' %}
Reports may not be exactly sent at the scheduled dates. If the browser isn't running
when a report is scheduled to be sent, the report is sent at browser startup—which could be days or
weeks after the initially scheduled time.
{% endAside %}

Once the expiry time is reached⏤the duration of time specified in `attributionexpiry`, starting from the click event⏤conversions can no longer be attributed to this click event.

#### Example

If a user clicks an ad and converts three days later, you may receive the report approximately seven days
later.

{% Details %}
{% DetailsSummary 'h3' %}
Report scheduling: detail
{% endDetailsSummary %}

In Chrome, report scheduling for clicks works as follows:

<div class="w-table-wrapper">
    <table class="w-table--top-align with-heading-tint">
        <thead>
            <tr>
                <th>Value of <code>attributionexpiry</code><br></th>
                <th>Time a report is sent, depending on the conversion time and whether the browser is open</th>
                <th>Number of reporting windows</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>30 days (the default and maximum value)</td>
                <td>
                    <ul>
                        <li>2 days after the click</li>
                        <li>or 7 days after the click</li>
                        <li>or at maximum, 30 days + 1 hour after the click</li>
                    </ul>
                </td>
                <td>3</td>
            </tr>
            <tr>
                <td>Between 7 and 30 days</td>
                <td>
                    <ul>
                        <li>2 days after the click</li>
                        <li>or 7 days after the click</li>
                        <li>or the value of <code>attributionexpiry</code> + 1 hour after the click</li>
                    </ul>
                </td>
                <td>3</td>
            </tr>
            <tr>
                <td>Between 2 and 7 days</td>
                <td>
                    <ul>
                        <li>2 days after click</li>
                        <li>or at maximum, the value of <code>attributionexpiry</code> + 1 hour after the click</li>
                    </ul>
                </td>
                <td>2</td>
            </tr>
            <tr>
                <td>Under 2 days</td>
                <td>
                    <ul>
                        <li>2 days + 1 hour after the click</li>
                    </ul>
                </td>
                <td>1</td>
            </tr>
        </tbody>
    </table>
</div>

{% endDetails %}

### Attribution model

By default, the attribution model is **last-touch**: for a given conversion, only the last
engagement with an ad will generate a report.

You can change this behavior by configuring [source-side priorities](/docs/privacy-sandbox/attribution-reporting-event-guide/#define-custom-attribution-rules).

#### Example

A user visits `news.example` and clicks an ad for `shoes.example`. On the next day, they visit `other-news.example` and again click an ad for `shoes.example`. A few days later, they visit `shoes.example` and convert by making a purchase.

By default, unless you configure custom [source-side priorities](/docs/privacy-sandbox/attribution-reporting-event-guide/#define-custom-attribution-rules), you'll receive a report that attributes this conversion to the ad clicked on `other-news.example`.

### Matching source and trigger data

Let's take a given ad click (source event) with an click ID (source event ID) of `1298765678762`.
When this click is registered, the browser⏤on the user's device⏤stores the click ID `1298765678762`, and alongside the following data:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>attributiondestination</code>
      </td>
      <td>Typically, an advertiser site.</td>
      <td><code>shoes.example</code></td>
    </tr>
    <tr>
      <td>
        <code>attributionreportto</code>
      </td>
      <td>Typically, an adtech endpoint.</td>
      <td><code>adtech.example</code></td>
    </tr>
  </tbody>
</table>

Later on, a trigger (conversion) takes place on a page.
The browser will match this trigger with the source event ID `1298765678762` in the following conditions:

- The page on which the trigger (conversion) took place matches **the [eTLD+1](https://web.dev/same-site-same-origin/#site) that was provided in the source's `attributiondestination`**. Example: `shoes.example/checkout`.
- The attribution is triggered (that is, the conversion is registered) via a request to the **same `attributionreportto` origin** (that then redirects to a `.well-known` location). Example: `adtech.example`.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/gdpjvYVB50vCbBUP2UKj.png", alt="Diagram that shows how the browser matches click IDs (source event IDs) with attribution trigger data (conversion data)", width="800", height="474" %}
 <figcaption>How the browser matches click IDs (source event IDs) with attribution trigger data (conversion data).</figcaption>
</figure>
 
Note:
 
- When a source is registered with a given (`attributiondestination`, `attributionreportto`) pair, existing sources matching this pair will be looked up in storage. If the matching sources have been triggered at least once (that is, have scheduled a report), they will be removed from browser storage and will not be eligible for further reporting. Any pending reports for these sources will still be sent.
- For click events, a source will be registered only if the resulting document being navigated to ends up sharing the eTLD+1 with the `attributiondestination` origin.

### User-initiated data clearing

Data clearing on the user's end⏤for example, when a user deletes their browsing history⏤can affect measurement based on the Attribution Reporting API in ways that differ from cookie-based measurement.

Head over to [FAQ: Impact of user-initiated data clearing on attribution reports](/docs/privacy-sandbox/attribution-reporting-data-clearing/) for details.

## Summary: API behavior and parameters

<table>
<tbody>
<tr>
<td>Source data (display side)<td>
<code>attributionsourceeventid</code><br>
</th>
<td>Maximum 64 bits, that is a large integer (between 0 and 2^64 - 1 = 18,446,744,073,709,551,615)</td>
</tr>
<tr>
<td>Trigger data (conversion side)<br>
</td>
<td>Maximum 3 bits, that is an integer between 0 and 7.</td>
</tr>
<tr>
<td>Noise on the trigger data value (conversion side)</td>
<td>5% of the time in Chrome.</td>
</tr>
<tr>
<td>Number of configurable reporting endpoints<br>
</td>
<td>Maximum 1.</td>
</tr>
<tr>
<td>Number of reports that can be generated per source event</td>
<td>Maximum 3.</td>
</tr>
<tr>
<td>Report scheduling and delays</td>
<td>Reports are sent at the end of one of several windows.</td>
</tr>
</tbody>
</table>

## Demo

To generate real event-level reports and see them in your browser, try the [live demo](https://goo.gle/sppi-devrel-eventlevel).

Check out the [source code](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement)
for this demo. You can
[fork and customize](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement#fork-and-customize)
this demo code as needed.

## Up next

Now that you've ramped up on the key properties of event-level reports, you're ready to experiment!

Head over to [Using event-level reports in the Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-event-guide/) to get started.
