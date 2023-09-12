---
title: Attribution Reporting proposal updates in January 2022
description: >
  Learn about changes made to Attribution Reporting to reflect community feedback.
layout: 'layouts/blog-post.njk'
date: 2022-01-27
updated: 2022-06-15
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/0ZWxOTHGZIp5fRzDBLTx.jpg'
alt: >
  Measuring tape.
authors:
  - maudn
  - alexandrawhite
tags:
  - privacy
  - experiment
---

{% Aside %}
This content was initially posted in the Attribution Reporting API
documentation. We're now keeping a [running list of
updates](/docs/privacy-sandbox/attribution-reporting-updates/), with links
out to more information.
{% endAside %}

The Attribution Reporting proposal has undergone a number of changes to address
community feedback, from API mechanism changes to new functionality.

## Changelog

- February 7, 2022: Section on [header trigger redirect](#header-trigger-redirect) added.
- January 27, 2022: Article first published.

## Who is this post for? {: #who }

This post is for you:

- If you already understand the API—for example, if you've been observing or
  participating in the discussions on the WICG repository and want to understand the batch of
  changes made to the proposal in January 2022.
- If you're using the Attribution Reporting API in a demo or in an experiment in production.

If you're just getting started with this API and/or have not experimented with it yet, go directly
to the
[introduction to the API](/docs/privacy-sandbox/attribution-reporting-introduction/)
instead.

## Migration ahead {: #migration }

{% Aside %}
The proposed changes will be implemented in Chrome for experimentation.

Ecosystem feedback on these changes is greatly appreciated. Join the discussion by commenting on the links listed under Join the public discussion in this post, or by creating new issues. [Learn more about participating](/docs/privacy-sandbox/attribution-reporting-introduction/#participate).

**This is not an API guide**; details in the new proposal are subject to change. If you intend to experiment with the API: hold your migration until code is available in Chrome, and subscribe to the [developer mailing list](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) for updates.
{% endAside %}

Once these changes are implemented in Chrome: if you use event-level reports from the Attribution Reporting API in a demo or in an experiment in production (origin trial), you'll need to edit your code for the API to continue working. You may also consider using the new features.

This article also lists changes for aggregatable reports. However, these changes, if implemented, will not require any action or migration, as there's no browser implementation yet for aggregatable reports at the time of this writing.

## Name changes {: #name-changes }

### Summary reports and aggregatable reports

What you may have seen described as aggregate reports will now be referred to
as [_summary reports_](/docs/privacy-sandbox/attribution-reporting/summary-reports/).

_Summary reports_ are the final output of the aggregation of multiple _aggregatable reports_,
formerly called contributions or histogram contributions.

## API mechanism changes {: #mechanism-changes }

### Header-based source registration (event-level reports) {: #header-source }

#### What's changing, and why? {: #header-source-event-change }

When the user views or clicks an ad, the browser—locally on the user's device—records this event,
alongside parameters that are specific to attribution reporting (such as the
`attributionsourceeventid`, `attributiondestination`, `attributionexpiry` and other parameters). The
values of these parameters are set by the adtech.

The way these parameters are set is changing.

In the previous proposal, the parameters had to be included client-side: either in the anchor tags
as HTML attributes, or as arguments of a JS-based call. Parameters had to be known at click or view
time.

In the new proposal, the value of these parameters is defined on the adtech server instead.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/YHKvC2HL9yLi7j6QZ3zv.png", alt="Diagram of header-based source registration", width="800", height="476" %}

This has a number of upsides, notably in terms of security: the header mechanism gives the reporting
origin—typically, an adtech—direct control over whether an attribution source is registered in their
scope. This partially mitigates fraud concerns, as with this change a genuine browser will never
register a source without the reporting origin's opt-in.

#### How does source registration work? {: #header-source-event-how }

1. For a given ad, the adtech would now need to define a specific client-side attribute
   `attributionsrc`. The value of this attribute is a URL to which the browser will send a
   request; this request will include a new HTTP header `Attribution-Reporting-Source-Info` whose
   value, `navigation `or `event,`specifies whether the source was a click or a view respectively.
1. Upon receiving this request, the click/view tracking server should respond with a HTTP
   header, `Attribution-Reporting-Register-Source`, that contains the desired attribution
   parameters.
1. The origin that returns this header is now the reporting origin (formerly defined as
   `attributionreportto`).

   HTTP Response Header `Attribution-Reporting-Register-Source`:

   ```json
   {
     "source_event_id": "267630968326743374",
     "destination": "https://toasters.example",
     "expiry": "604800000"
   }
   ```

#### Learn more in the technical explainer {: #header-source-event-explainer }

[Registering attribution sources](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#registering-attribution-sources)

#### Join the public discussion {: #header-source-event-discuss }

[Issue #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### Header-based attribution trigger (event-level reports) {: #header-trigger-event }

#### What's changing, and why? {: #header-trigger-event-change }

Just like click or view registration, the new proposal changes the attribution trigger—when an
adtech instructs the browser to record a conversion—to a header-based approach.  
This mechanism is aligned with the [header-based source registration](#header-based-source-registration-event-level-reports), and is more
conventional than the previously used redirect mechanism.

Additionally, in the new proposal, the `attributionsrc` attribute is needed on the conversion page.

The rationale is a matter of permissions: in the previous proposal, the trigger-side site—typically,
an advertiser site—did have general control on the feature via a `Permissions-Policy` header, but
did not have granular, element-level control on whether an element can send out a request to a party
that would ultimately trigger an attribution. `attributionsrc` changes this: this mandatory marker
gives the advertiser the ability to monitor and hence control which elements can trigger an
attribution.

Note that on the source side—typically, a publisher site—a page-wide control via
`Permissions-Policy`, as well an element-wide control via `attributionsrc`, are present.

#### How does attribution trigger work? {: #header-trigger-event-how }

Upon receiving a pixel request and deciding that it should be categorized as a conversion, an adtech
should respond with a new HTTP  
 header `Attribution-Reporting-Register-Event-Trigger`.

This header's value specifies how to treat the trigger event, as a JSON object. This is the same
information that was defined as query parameters in the previous proposal.

HTTP Response Header `Attribution-Reporting-Register-Event-Trigger`:

```json
    [{
        trigger_data: (unsigned 3-bit integer),
        trigger_priority: (signed 64-bit integer),
        deduplication_key: (signed 64-bit integer)
    }]
```

#### Redirection (optional) {: #header-trigger-redirect }

Optionally, the adtech server can make the response that contains `Attribution-Reporting-Register-Event-Trigger` a redirect response.
With this, it enables third-parties to observe the conversion event and to instruct the browser to attribute it.

Redirection is optional; it's not needed when both an adtech and a third-party have pixels on the page.

More details in [Third-pary reporting](#3p-reporting).

#### Learn more in the technical explainer {: #header-trigger-event-explainer }

[Triggering Attribution](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#triggering-attribution)

#### Join the public discussion {: #header-trigger-event-discuss }

[Issue #91](https://github.com/WICG/conversion-measurement-api/issues/91)

### No worklet (aggregatable reports) {: #no-worklet }

#### What's changing, and why? {: #no-worklet-change }

In the previous proposal for aggregatable reports, JavaScript access was required to invoke a
worklet—a JavaScript-based mechanism—that would generate these reports.

In the new proposal, no worklet is required. Instead, an adtech would define declaratively—via HTTP
headers—the rules the browser should use to generate aggregatable reports.

The new proposal offers several benefits:

- **Browser implementation:** the new design, unlike the worklet design, is substantially
  simpler because it doesn't require a new execution environment in browsers.
- **Developer experience:** the new design relies on headers, which are commonly used and
  widely known by developers—unlike worklets. It also aligns closely with the API surface for
  [source registration](#header-based-source-registration-event-level-reports), making the API easier to learn and use.
- **Adoption:** the new design enables more existing measurement systems to use aggregatable
  reports. Many measurement solutions are HTTP-only: they rely on image requests—pixel
  requests—that don't require JavaScript access. But because the worklet approach did require
  JavaScript access, it may have been difficult to migrate to from some existing measurement systems.
- **Robustness:** the new design helps mitigate data loss because it's easier to integrate
  with `keepalive` semantics, for example if a click or view is registered when a user is leaving
  a page.

#### How does the worklet-free mechanism work? {: #no-worklet-how }

This declarative mechanism is based on HTTP headers—just like the event-level source registration
and the attribution trigger header. More details on this in the next sections.

#### Join the public discussion {: #no-worklet-discuss }

[Issue #194](https://github.com/WICG/conversion-measurement-api/issues/194)

### Header-based source registration (aggregatable reports) {: #header-source-agg }

A new mechanism is proposed to register a source for an aggregatable report; this mechanism is the
same as the [event-level source registration](#header-based-source-registration-event-level-reports).

Only the header name is different: `Attribution-Reporting-Register-Aggregatable-Source`.

#### Learn more in the technical explainer {: #header-source-agg-explainer }

[Attribution source registration](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-source-registration)

### Header-based attribution trigger (aggregatable reports) {: #header-trigger-agg }

A new mechanism is proposed to register a source for an aggregatable report; this mechanism is the
same as the [event-level attribution trigger](#header-based-attribution-trigger-event-level-reports).

Only the header name is different: `Attribution-Reporting-Register-Aggregatable-Trigger-Data`.

#### Learn more in the technical explainer {: #header-trigger-agg-explainer }

[Attribution trigger registration](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)

## New features {: #new-features }

### Third-party reporting (event-level reports and aggregatable reports) {: #3p-reporting }

#### What's changing, and why? {: #3p-reporting-change }

Two aspects of the new proposal help better support third-party reporting use cases:

- Optionally, adtechs can **redirect network requests to other adtechs servers**, which allows those other
  adtechs to perform their own source and trigger registration. This is a common way third
  parties are configured today. This makes the API easier to adopt, among others in existing
  third-party reporting systems.
- Reporting origins—typically, adtechs—**no longer share most privacy limits**. This supports use
  cases where multiple adtechs work with the same publishers or advertisers.

#### How does third-party reporting work? {: #3p-reporting-how }

In the new proposal, response-based source registration and trigger rely on
HTTP headers. An adtech can leverage HTTP redirects for these requests.

If a click/view request on a publisher site (source registration) is subsequently redirected to
multiple parties, each of these parties can register this view or click (source event).  
Similarly, an adtech can redirect a specific attribution request made from an adivertiser site,
allowing multiple other parties to register a conversion (attribution trigger).

**Each party is able to access their separate reports**, and to configure them with separate data.

{% Aside %}
To prevent abuse, explicit reporting limitations have been added. Learn more in [Privacy protection changes](#privacy-protection-changes).
{% endAside %}

#### Register multiple triggers without redirects

It's also possible to register multiple attribution triggers without using redirects, by adding multiple pixel elements on the conversion side (one per trigger).

#### Join the public discussion {: #3p-reporting-discuss }

[Issue #91](https://github.com/WICG/conversion-measurement-api/issues/91)
[Issue #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### View-through measurement (event-level reports and aggregatable reports) {: #view-through }

#### What's changing, and why? {: #view-through-change }

In the new proposal, view-through measurement and click-through measurement work in a unified way:

- `registerattributionsrc`, the view-specific attribute that instructed the browser to
  record views alongside clicks, is **no longer** part of the proposal.
- The **privacy mechanisms** are now unified across click and view. On this, see details in [Noise
  and transparency](#noise-and-transparency-event-level-reports-and-aggregatable-reports).

This change is proposed to align with the new [header-based registration mechanism](#api-mechanism-changes).
It also simplifies developer experience when intending to support both click- and view-through
measurement.

#### How does view-through measurement work? {: #view-through-how }

View-through measurement and click-through measurement both rely on [header-based registration](#api-mechanism-changes).

#### Learn more in the technical explainer {: #view-through-explainer }

[Event-level reports (for both clicks and views)](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md)

#### Join the public discussion {: #view-through-discuss }

[Issue #261](https://github.com/WICG/conversion-measurement-api/issues/261)

### Debugging / Performance analysis (event-level reports and aggregatable reports) {: #debugging }

#### What's changing, and why? {: #debugging-change }

A debugging mechanism has been added to the proposal to help developers detect bugs, as well as
compare the performance of Attribution Reporting to existing cookie-based measurement solutions.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/ncYlu8aGOiQn579Wzc2D.png", alt="Diagram of the new cookie-based debugging system", width="800", height="304" %}

#### How does debugging work? {: #debugging-how }

{% Aside %}
The Attribution Reporting API explicitly prevents the linking of detailed source events (ad clicks
or views on a publisher site) and detailed trigger events (detailed conversions on an advertiser
site). This prevents cross-site tracking enabled by third-party cookie-based solutions.

**During the experimentation phase**, the debugging functionality proposal does provide a link between a detailed
source event and a detailed trigger event. However, the debugging functionality intentionally
requires the ability to already set a third-party cookie.
This means that the debugging
functionality will not be available if third-party cookies are blocked. This also means it will naturally no
longer be available after support for third-party cookies is phased out.
{% endAside %}

Both source and trigger registration will accept a new parameter `debug_key`, a 64-bit unsigned
integer (that is, a large number).

If a report is created with source and trigger debug keys and if a `Samesite=None ar_debug=1` cookie
is present in the reporting origin's cookie jar at source and trigger registration time, a debug
report (JSON) will be sent to a `.well-known/attribution-reporting/debug` endpoint:

```json
{
  "source_debug_key": 1234567890987,
  "trigger_debug_key": 4567654345028
}
```

Event-level and aggregatable reports will also include these two new parameters, so that they can be
associated with the correct debug report.

#### Learn more in the technical explainer {: #debugging-explainer }

[Optional: extended debugging reports](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-extended-debugging-reports)

#### Join the public discussion {: #debugging-discuss }

[Issue #174](https://github.com/WICG/conversion-measurement-api/issues/174)

### Filtering capabilities (event-level reports and aggregatable reports) {: #filtering }

{% Aside %}
This is a new feature—more precisely, it was already part of the aggregatable reports proposal and
has now been added to the event-level reports proposal.
{% endAside %}

#### What's changing, and why? {: #filtering-change }

Because they support important use cases in today's advertising ecosystem, a number of use cases
will now be supported in both event-level and aggregatable reports:

- **Conversion filtering:** filter a conversion based on source-side information. For
  example, select different trigger data (conversion data) for ad clicks and views.
- **Attribution mismatching:** filter conversions that have been misattributed; this is a
  specific type of conversion filtering. For example, filter out conversions that get matched to
  the wrong ad click/view due to the etld+1 destination scope in the API.

#### How do filtering capabilities work? (for event-level reports) {: #filtering-how }

An optional `source_data` field in the source-side JSON object can define items that will be
subsequently used by the browser at conversion time to apply filtering logic.

```json
  {
    source_event_id: "267630968326743374",
    destination: "https://toasters.example",
    expiry: "604800000"
    source_data: {
      conversion_subdomain: ["electronics.megastore"
                              "electronics2.megastore"],
      product: "198764",
      // Note that "source_type" will be automatically generated as one of {"navigation", "event"}
    }
  }
```

Trigger registration will now accept an optional header `Attribution-Reporting-Filters`.

HTTP Response header `Attribution-Reporting-Filters`:

```json
{
  "conversion_subdomain": "electronics.megastore",
  "directory": "/store/electronics"
}
```

Alternatively, the `Attribution-Reporting-Register-Event-Trigger` header can be extended with a
`filters` field to do selective filtering to set `trigger_data` based on `source_data`.

If keys in the filters JSON match keys in `source_data`, the trigger is  
completely ignored if the intersection is empty.

#### Learn more in the technical explainer {: #filtering-explainer }

[Optional attribution filters](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#optional-attribution-filters)

#### Join the public discussion {: #filtering-discuss }

[Issue #194](https://github.com/WICG/conversion-measurement-api/issues/194)  
[Issue #201](https://github.com/WICG/conversion-measurement-api/issues/201)

## Privacy protection changes {: #privacy-changes }

### Noise and transparency (event-level reports and aggregatable reports) {: #noise }

#### What's changing, and why? {: #noise-change }

In the new proposal, one of the privacy mechanisms for reports has been improved: reports are
subject to **randomized response**.  
This means that some real conversions will be reported correctly; and a certain percentage of the
time, **some real conversions will be suppressed or some fake conversions will be added**.

This new technique has a few benefits:

- It **unifies** the privacy mechanism for clicks and views.
- It's **simpler** to reason about than a mechanism where trigger data (conversion data) and trigger-source link noise would be separated.
- It sets up a **privacy framework** which could, with the right noise settings, ensure that no party can rely on the API to know with certainty that an individual user has converted (or not) for a certain ad.

This new mechanism replaces the previous mechanism where 5% of the time, trigger data
(conversion data) was replaced with a random value.

Additionally, the randomized response probability value has been added to the report body
(`randomized_trigger_rate` field). This field specifies the probability (0 to 1) that a source is
subject to randomized response.

This has two main benefits:

- It makes the underlying browser behavior **transparent** to the parties that will receive the reports
  (typically, adtechs).
- It's helpful for a future where the API would be supported **across
  browsers**: different browsers may decide to apply different levels of noise depending on their
  privacy goals, and the parties that will handle the report will need visibility into this.

#### How does noise work? {: #noise-how }

In the new proposal, at the time a source is registered (i.e. an ad click or view is recorded), the
browser randomly decides whether it will truthfully attribute conversions and send reports for this
ad click/view, or whether it will generate a **fake output** instead.

The fake output can be:

- **No report at all**—regardless of whether the user converts;
- **One or several fake reports**—regardless of whether the user converts.

In fake reports, the trigger data (conversion data) is random: a random 3-bit value for clicks (any
number between 0 and 7) and a random 1-bit value for views (0 or 1).

Like real reports, fake reports are not sent immediately after the user converts. They're sent at
the end of a random _reporting window_.

{% Aside 'key-term' %}
After an initial ad click, a schedule of _reporting windows_ begins.
Each reporting window has a deadline. Reports for conversions that are attributed before that deadline
will be sent at the end of that window.
{% endAside %}

There are three reporting windows for **clicks** (2 days, 7 days or 30 days after click). Each fake
report is randomly assigned to one of the reporting windows.

Separately, as the previous proposal already stated, ordering of reports _within_ a window is random.

{% Aside %}
Fake reports for **views** are not subject to a random reporting window, because there is one single
reporting window for views.
{% endAside %}

#### Learn more in the technical explainer {: #noise-explainer }

[Noisy fake conversions examples](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#noisy-fake-conversion-examples)

#### Join the public discussion {: #noise-discuss }

[Issue #84](https://github.com/WICG/conversion-measurement-api/issues/84)  
[Issue #273](https://github.com/WICG/conversion-measurement-api/issues/273)

### Reporting limitations (event-level reports and aggregatable reports) {: #reporting-limits }

[Reporting origin limits](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#reporting-origin-limits)

#### What's changing, and why? {: #reporting-limits-change }

The new proposal **explicitly limits how many parties can measure events between two sites**.

- The maximum number of unique reporting origins (typically adtechs) that can register
  sources per {publisher, advertiser} is proposed to be capped to **100 per 30 days**. This
  counter will be incremented for each ad click or view (source event), even those that are not
  attributed.
- The maximum number of unique reporting origins (typically adtechs) that can send reports per
  {publisher, advertiser} is proposed to be capped to **10 per 30 days**. This counter will be
  incremented for every attributed conversion.

These limits are intended to be high enough that they don't limit any actor's ability to measure
conversions, but low enough that they help mitigate some forms of API abuse.

### Reporting cooldown / rate limits {: #rate-limits }

#### What's changing, and why? {: #rate-limits-change }

Reporting cooldown is a privacy mechanism that throttles the amount of total information sent
through this API in a given time period for a user.

In the new proposal, **100** reports per {source site, destination, reporting origin}
(typically {publisher, advertiser, adtech}) can be scheduled over **30 days**.

Beyond this limit, the browser will stop scheduling reports that match this given {source site,
destination, reporting origin} (typically {publisher, advertiser, adtech})—until the rolling 30-day
report count falls below 100 for that {source site, destination, reporting origin}.

#### Learn more in the technical explainer {: #rate-limits-explainer }

[Reporting cooldown / rate limits](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#reporting-cooldown--rate-limits)

### Destination capping (event-level reports only) {: #capping }

{% Aside %}
The new proposal subjects **both clicks and views** to destination capping; note that the previous proposal already mentioned destination capping for views.
{% endAside %}

#### What's changing, and why? {: #capping-change }

Destination capping is modified to include the reporting origin (typically, an adtech) in the scope: **100** unique
pending destinations (typically, advertiser sites, or sites where conversions are expected to take
place) are allowed per {publisher, adtech}.

This is a **privacy protection** to limit browsing history reconstruction.

#### Learn more in the technical explainer {: #capping-explainer }

[Limiting the number of unique destinations covered by pending sources](https://github.com/WICG/conversion-measurement-api/blob/main/EVENT.md#limiting-the-number-of-unique-destinations-covered-by-pending-sources)

## All resources {: #resources }

*  See [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction).
*  Read [What you should know about the API](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/edit?usp=sharing).

_The header image is from <a href="https://unsplash.com/@diana_pole">Diana Polekhina</a> on <a href="https://unsplash.com/">Unsplash</a>._
