---
layout: 'layouts/blog-post.njk'
title: 'Using event-level reports in the Attribution Reporting API'
subhead: >
  Learn how to use the Attribution Reporting API for click-through measurement with event-level reports.
date: 2021-11-19
updated: 2021-11-19
hero: 'image/O2RNUyVSLubjvENAT3e7JSdqSOx1/D0A8xGWbNKdk1qV0CWcL.jpg'
alt: >
  Ruler on blue background
authors:
  - maudn
---

{% Aside 'warning' %}
The Attribution Reporting proposal is changing. The information contained in this post is obsolete, and will be updated.

**Read all the details in [What's changing in January 2022?](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/)**
{% endAside %}

## Who is this blogpost for?

This post is for you if you're a developer planning on experimenting with the Attribution Reporting API with event-level reports, either locally or via an origin trial⏤for example, if you're planning on taking part in the [origin trial](/origintrials/#/view_trial/3411476717733150721) that was [extended in November 2021](https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA/m/RTK45f9gBQAJ).

In this post, you'll find:

- **Example code** that includes the latest API features
- Link to a **live demo** and code
- Instructions for **setting up your browser**
- Tips for **debugging** and experimenting with event-level reports

## Before you read this

Before reading this post, **make sure you understand the basics of event-level reports in the Attribution Reporting API**.

Head over to [Event-level reports in the Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-event-introduction/).
If you only want the essentials, do check out the [API behavior and parameters](/docs/privacy-sandbox/attribution-reporting-event-introduction/#api-behavior-and-parameters) and [Glossary](/docs/privacy-sandbox/attribution-reporting-event-introduction/#glossary) sections from that article.

## Changelog

### January 2022

A caution note has been added on top of this post.

### November 2021

Features added to the API that are available in the origin trial that was [extended in November 2021](https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA/m/RTK45f9gBQAJ):

- [Better retry logics](https://bugs.chromium.org/p/chromium/issues/detail?id=1054127#c7) increases the chance for reports to be successfully sent.
- [Custom attribution rules](/docs/privacy-sandbox/attribution-reporting-event-guide/#define-custom-attribution-rules) help you customize how the browser associates attribution trigger events (conversions) with source events (clicks). For example, this lets you define a first-click or probabilistic linear attribution model.
- [Custom priorities for triggering attributions](/docs/privacy-sandbox/attribution-reporting-event-guide/#prioritize-specific-conversions) make it possible to define rules to ensure that you will get reports for the conversions that matter most to you.
- [Deduplication](/docs/privacy-sandbox/attribution-reporting-event-guide/#deduplicate-reports) gives you a way to prevent unwanted duplicate reports.

Additionally, a [number of enhancements to the debugging UI in Chrome](https://bugs.chromium.org/p/chromium/issues/list?q=conversion%20component%3AInternals%3EConversionMeasurement%20%22Dev%20Experience%3A%22%20status%3DFixed&can=1) make it easier to understand and debug the API's behavior, in particular when it comes to priorities and report sending.

## Demo

To generate real event-level reports and see them in your browser, try the [live demo](https://goo.gle/sppi-devrel-eventlevel).

Check out the [source code](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement)
for this demo. You can
[fork and customize](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/conversion-measurement#fork-and-customize)
this demo code as needed.

{% Columns %}

{% Column %}
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/O59eUascDKlhrxR7SbJz.png", alt="ALT_TEXT_HERE", width="400", height="300" %}
{% endColumn %}

{% Column %}
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/u3Gfm4ebwIr9NREfq5eE.png", alt="ALT_TEXT_HERE", width="400", height="300" %}
{% endColumn %}

{% endColumns %}

## Enable the API in your browser

If you are developing locally or testing out a deployed demo app in your browser, it's enough to enable the API **in your browser**.

{% Details %}
{% DetailsSummary %}

How to enable the API in your browser

{% endDetailsSummary %}

Enable the API via a _flag_. A flag is a special setting in your browser.

1. Enter `chrome://flags/#enable-experimental-web-platform-features` in Chrome's URL bar. This works on mobile, too.
2. Click **Enabled.**
3. Restart Chrome.
4. Ensure that Privacy Sandbox features are turned **on** at `chrome://settings/privacySandbox`. If
   they're turned off, this would override your flag and disable the Attribution Reporting API.

<figure>
   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bKfzMxqL4gpbDDw3NLDc.png", alt="ALT_TEXT_HERE", width="400", height="261" %}
   <figcaption>Turn on the flag to enable the API in your browser.</figcaption>
</figure>

{% endDetails %}

## Enable the API for end users (origin trial)

To enable the API for all your site's users⏤except those who have chosen to opt-out of Privacy Sandbox features⏤register your site for an _origin trial_. You can also register for an origin trial if your code is embedded in sites you don't own, as third-party code.

{% Aside 'key-term' %}
An _origin trial_ (sometimes called an _experiment_) is a way to test a new or experimental web platform feature, and give feedback to the web standards community on the feature.
Learn more in [Getting started with Chrome's origin trials](/blog/origin-trials/).
{% endAside %}

### Design your origin trial

{% Details %}
{% DetailsSummary %}

How to design your origin trial

{% endDetailsSummary %}

Before you set up an origin trial, set time aside to design your experiment. Ask yourself and your team: _What is our goal with this experiment?_

If your goal is to understand the API mechanics, run your experiment as follows:

- Track conversions.
- See how you can assign different values to attribution trigger events (conversions).
- Look at the reports you're receiving.

If your goal is to see how well the API satisfies basic use cases, run your experiment as follows:

- Track conversions.
- Look at the count of reports you're receiving.
- [Recover the corrected conversion
  count](#recover-the-corrected-conversion-count). Optionally, if you want to try something more advanced, tweak the noise correction script.
  For example, try different groupings to see what sizes are necessary for the noise to be negligible.
- Compare the corrected count of conversions with source-of-truth data, that is cookie-based
  measurement data.

{% endDetails %}

### Set up an origin trial

{% Details %}
{% DetailsSummary %}
How to set up an origin trial
{% endDetailsSummary %}

1. Head over to [Chrome Origin Trials: active
   trials](https://developers.chrome.com/origintrials/#/trials/active) and sign in.
2. Search for **Conversion Measurement** or **Attribution Reporting** and click **Register**.
3. Fill in the form:

   - **Third-party matching**. Select this if you're planning on using the API as a third-party—for
     example, if you need to use the API in a script you wrote that is executed on origins you
     don't own. This is convenient if you need to test at scale across different
     sites. Learn more in
     [What are third-party origin trials](/blog/third-party-origin-trials/).

   - **Subdomain matching**. Select this if you need your token to match all subdomains of the origin—for
     example, if you need your `https://shop.example` token to be valid in
     `https://shoes.shop.example` as well.

   - **Usage restriction**. Keep **Standard Limit** (this should already be set as default).

4. Click **Register**.
5. You'll get back an origin
   trial token, which is a long string. Add this token where needed via an HTTP header, meta tag or JavaScript.

{% Aside 'gotchas' %}

- Even if an origin trial is set up for your site, the API will only be enabled for users
  that have **not opted out** of the Privacy Sandbox via `chrome://settings/privacySandbox`.
- If you're running an origin trial, make sure to follow [Troubleshooting origin
  trials](/blog/origin-trial-troubleshooting/). In particular if you're
  using the feature in an iframe, add the origin trial token to this iframe as well as in the top-level page.

{% endAside %}

{% endDetails %}

## Example code: Basic usage

{% Aside %}
**Make sure to take a look at the [demo and demo code](#demo)**; it includes all of the functionalities that are documented in this section.
{% endAside %}

### Register a click

_The example code in this section would live on the ad display side, for example in an adtech company's script embedded in a publisher's site._

#### Register clicks with an `<a>` element

```html
<a
  href="https://advertiser.example/shoes"
  attributiondestination="https://advertiser.example"
  attributionreportto="https://adtech.example"
  attributionsourceeventid="412444888111012"
  attributionexpiry="864000000"
  target="_blank"
>
  <img width="180" src="/images/blue-shoes.jpg" alt="shoes 07" />
</a>
```

The value picked here for `attributionexpiry` is 864000000, which is 10 days in milliseconds.

{% Aside %}

The code examples in this blogpost use `target=_blank` or `target=_top`. `target=_parent` wouldn't
work for a number of display ads, since these may be nested.

{% endAside %}

#### Register clicks with `window.open`

```javascript
const adEl = document.getElementById('ad');
adEl.addEventListener('click', () => {
  window.open(
    href,
    '_blank',
    `attributionsourceeventid="412444888111012",attributiondestination="https://advertiser.example",attributionreportto="https://adtech.example",attributionexpiry="864000000"`
  );
});
```

#### HTML attribute `attributionsourceeventid` (required)

A 64-bit identifier to attach to an ad click. One way to set it is to define it on the server-side, as an ID that maps to the creative type,
serving time, publisher site, and any other granular information needed by the adtech company at
ad-serving time.

Example value
: `"412444888111012"`

Limits
: Maximum 64 bits; must be an integer between 0 and 2^64-1. To avoid [issues with large numbers in JavaScript](https://2ality.com/2012/07/large-integers.html)
and ensure that the value is preserved, define `attributionsourceeventid` as a string, not as an
integer.

#### HTML attribute `attributiondestination` (required)

The [eTLD+1](https://web.dev/same-site-same-origin/#site) where a
conversion is expected for this ad.

Example value
: `"https://advertiser.example"`

Requirements
: Must be an [origin](https://web.dev/same-site-same-origin/#origin).
: Must use HTTPS (or `http://localhost`, or `http://127.0.0.1`).
: If `attributiondestination` is `https://advertiser.example`, conversions on both
`https://advertiser.example` and `https://shop.advertiser.example` will be attributed.
The same happens if `attributiondestination` is `https://shop.advertiser.example`: conversions on
both `https://advertiser.example` and `https://shop.advertiser.example` will be attributed.

{% Details %}
{% DetailsSummary %}
Do's and don'ts for `attributiondestination`
{% endDetailsSummary %}

{% Compare 'better' %}

```text
attributiondestination="https://advertiser.example"
```

{% CompareCaption %} Always include the scheme (`https://`) in the URL. For a non-local origin like this one, the protocol must be HTTPS. {% endCompareCaption %}
{% endCompare %}

{% Compare 'better' %}

```text
attributiondestination="http://localhost:8082"
```

{% CompareCaption %} HTTP is fine for local origins. {% endCompareCaption %}
{% endCompare %}

{% Compare 'worse' %}

```text
attributiondestination="advertiser.example"
```

{% CompareCaption %}
This is not an [origin](https://web.dev/same-site-same-origin/#origin): the scheme (`https://`) is missing.
{% endCompareCaption %}
{% endCompare %}

{% Compare 'worse' %}

```text
attributiondestination="http://advertiser.example"
```

{% CompareCaption %}
This is an [origin](https://web.dev/same-site-same-origin/#origin), but the scheme is insecure (HTTP).
{% endCompareCaption %}
{% endCompare %}

{% endDetails %}

#### HTML attribute `attributionreportto`

The endpoint the browser will send reports to.

Example value
: `"https://adtech.example"`

Default value
: The top-level origin of the page where the `a` element is added or where the JavaScript API is called to register a click.

Requirements
: Must be an [origin](https://web.dev/same-site-same-origin/#origin).
: Must use HTTPS (or `http://localhost` or `http://127.0.0.1`).

{% Details %}
{% DetailsSummary %}
Do's and don'ts for `attributionreportto`
{% endDetailsSummary %}

{% Compare 'better' %}

```text
attributionreportto="https://adtech.example"
```

{% endCompare %}

{% Compare 'better' %}

```text
attributionreportto="http://localhost:3000"
```

{% endCompare %}

{% Compare 'worse' %}

```text
attributionreportto="https://adtech.example/reports"
```

{% CompareCaption %}
This is not just an [origin](https://web.dev/same-site-same-origin/#origin), this is a full URL. This won't throw an error, but anything in the path after the origin will be ignored. Reports will be sent `https://adtech.example` and **not** to
`https://adtech.example/reports`.
{% endCompareCaption %}
{% endCompare %}

{% endDetails %}

#### HTML attribute `attributionexpiry`

In milliseconds, the duration for which conversions can be attributed to a source event (click)—from the moment the ad is clicked.

Example value
: `2592000000` = 30 days in milliseconds

Default value
: `864000000` = 10 days in milliseconds

Limits
: Minimum value: 2 days in milliseconds. Maximum value: 30 days in milliseconds.

#### HTML attribute `attributionsourcepriority`

A priority for the source event. Only the report that matches the source event with the highest priority will be sent.

Default value
: `0`

Example value
: `30`

Limits
: Minimum value: `0`. Maximum value: `100`.

#### HTML attribute `href`

The intended destination of the ad click.

Example value
: `"https://advertiser.example/blue-shoes"`

{% Aside %}
Why is a distinct attribute `attributiondestination` needed, on top of `href`? 🤔

Having two separate attributes makes it possible to support **redirects** after click: in redirects, the final destination doesn't match `href`.

{% endAside %}

### Attribute a conversion to a source event (click)

_The example code in this section would live on the attribution trigger side, for example in an adtech
company's script embedded in an advertiser's site._

To attribute a conversion, you first need to make a request from the advertiser's site to the adtech server.

Example pixel on `https://advertiser.example/checkout`:

```html/2
<img
 class="pixel"
 src="https://adtech.example/conversion?conversion-type=checkout-completed"
 height="1"
 width="1"
/>
```

Upon receiving this request, the adtech server should run its own logic to determine the value of the trigger data that should be associated with this conversion and will ultimately appear in the report.

Then, it must make a `302` redirect to `/.well-known/attribution-reporting/trigger-attribution` that tells the browser to send a report later. In this 302 redirect request, you should specify:

- The `trigger-data` query parameter: the conversion data. This can't exceed 3 bits.
- Optional: the `priority` query parameter. See details in [Prioritize specific conversions](#prioritize-specific-conversions).
- Optional: the `dedup-key` query parameter. See details in [Deduplicate reports](#deduplicate-reports).

Adtech's `server.js`:

```javascript
const triggerDataValues = {
  'checkout-completed': 1,
  'add-to-cart': 2,
  'visit-product-page': 3,
  'signup-newsletter': 4,
};

app.get('/conversion', (req, res) => {
  // Determine the trigger data that will be put into the report - for clicks
  const triggerData = triggerDataValues[req.query['conversion-type']];
  // Order the browser to schedule-send a report
  res.redirect(
    302,
    `/.well-known/attribution-reporting/trigger-attribution?trigger-data=${triggerData}`
  );
});
```

{% Aside 'gotchas' %}

- The pixel request must be made to the exact same origin as the one that was defined in
  `attributionreportto` on the ad side (publisher site). If `attributionreportto` was declared with a value `https://adtech.example`, a pixel with `src="https://reporter.adtech.example/..."` will **not** work.
- The 302 redirect destination should keep the same
  [origin](https://web.dev/same-site-same-origin/#origin).
  For example, if the `/conversion` request above goes to `https://adtech.example`, a redirect such as `res.redirect( 302, 'https://reporter.adtech.example/.well-known/...'` will **not** trigger an attribution because `reporter.adtech` and `adtech` are not the same origin.
- The `/.well-known/` request tells the browser to send a report, but the report won't be sent immediately. See details in [Report scheduling](/docs/privacy-sandbox/attribution-reporting-event-introduction/#report-scheduling).
  {% endAside %}

### Allow the feature for cross-origin iframes

In order to use Attribution Reporting in **cross-origin iframes** to declare a click
or trigger an attribution, you need to enable the feature via the `attribution-reporting`
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

```html
<iframe src="..." allow="attribution-reporting"></iframe>
```

This is not needed in a top-level document or in same-origin iframes.

## Example code: Advanced features

### Define custom attribution rules

_The example code in this section would live on the ad display side, for example in an adtech
company's script embedded in a publisher's site._

{% Details %}
{% DetailsSummary %}

Why is this needed?

{% endDetailsSummary %}

Consider the following case: a user visits `news.example`. They click an ad (source event ID
`12300000000`) for `shoes.example`. Later, they visit `other-news.example` and click an ad (source event ID `99999999999`) for
`shoes.example`. A few days later, they buy shoes on `shoes.example`.

By default, this API uses the last-touch attribution model, thus you'll receive only the
following report:

```json
source_event_id: "99999999999"
trigger_data: "1" // trigger-side (conversion-side) data, capped to 3 bits
```

Instead, you may want to receive a report that tells you about the first click, on `news.example`.
To achieve that, you can set custom attribution rules.

{% endDetails %}

To define custom attribution rules, use source-side priorities. Only the report that matches
the source event with the highest priority will be sent.

To define source-side priorities, use the `attributionsourcepriority` HTML attribute; it's also
supported if you're using `window.open` instead of anchor tags. `attributionsourcepriority` must be
an integer between `(-2^63)+1` and `(2^63)-1`. Larger values denote a higher priority—for example, a
source event with a priority value of `2` takes precedence over a source with a priority value of
`1`.

#### Example code

Example use of `attributionsourcepriority` to define a first-click attribution model:

```html/7
<a
id="ad"
href="https://advertiser.example/shoes"
attributiondestination="https://advertiser.example"
attributionreportto="https://adtech.example"
attributionsourceeventid="..."
attributionexpiry="..."
attributionsourcepriority="0"
target="\_blank"

>  <img width="180" src="/images/blue-shoes.jpg" alt="shoes 07" />
> </a>
```

Here we've defined `attributionsourcepriority` explicitly for the example, but if it's not defined, its default is already `0`.

```javascript/0,7,9
const adEl = document.getElementById('ad');
adEl.addEventListener('click', () => {
// clicks happening later will have larger timestamps and hence lower prios
// hence the first click will take precedence
const currentTimestamp = Date.now();
const priority = - currentTimestamp;
// after click: attributionsourcepriority = prio
adEl.setAttribute("attributionsourcepriority", priority);
});
```

Floating point precision issues in JavaScript don't impact priorities. Unlike `attributionsourceeventid`, you don't have to make `attributionsourcepriority` a string.

### Prioritize specific conversions

_The example code in this section would live for example on an adtech
company's server._

To mark some conversions as more important than others and ensure that you get reports when these take place, use **trigger-side (conversion-side) priorities**.

When an attribution is triggered for a given source (click event), and if the maximum number of attributions (three) has been reached for this source, meaning that three reports are already scheduled for this source, the browser compares the priority of this new report with the priorities of
other scheduled reports for that source.

- If the new report has the lowest priority, it will be ignored and you won't receive it.
- Otherwise, the browser will look at existing scheduled reports and delete the one with the lowest
  priority to schedule the new report instead.

If no priorities are set, the browser will fallback to its default behavior: any conversion
happening after the third conversion will be dropped.

To define trigger-side (conversion-side) priorities, use the `priority` query parameter in the attribution redirect request.
The `priority` query parameter must be an integer between `(-2^63)+1` and `(2^63)-1`. Larger values
denote a higher priority—for example, a trigger with a priority value of `2` takes precedence
over a trigger with a priority value of `1`.

{% Details %}
{% DetailsSummary %}

Why is this needed?

{% endDetailsSummary %}

Consider the following case: a user visits `news.example`. They click an ad for
`shoes.example`. Over the next few days, they convert on `shoes.example`: they visit the site home page, visit a product page, then sign up to the newsletter for special offers, and finally make a purchase.

This user converted **four** times. However, in order to protect user privacy, at most **three** reports are generated
and sent. By default, in this example, all subsequent reports after the signup (third conversion) will be dropped. This
means that you'd miss the purchase report. This is not desirable, because the purchase is the most
valuable conversion.

Instead, you can configure the API such that you do get reports for conversions that
you consider particularly important.

{% endDetails %}

#### Example code

Example use of `priority` to prioritize reports of type `checkout` (purchases):

Adtech's `server.js`:

```javascript/12,13,17

app.get('/conversion', (req, res) => {
 // Determine the trigger data that will be put into the report
 const triggerData = ...
 // Define the priority depending on the conversion type
 let priorityValue = 0;
 const conversionType = req.query['conversion-type'];
 if (conversionType === 'checkout-completed') {
   priorityValue = 100;
 }
 // ... etc, for example 'add-to-cart' -> priorityValue = 90; 'visit-product-page' -> priorityValue = 80;
 // Order the browser to schedule-send a report
 const url = `/.well-known/attribution-reporting/trigger-attribution?trigger-data=${triggerData}&priority=${priorityValue}`;
 res.redirect(302, url);
});
```

### Deduplicate reports

_The example code in this section would live on the attribution trigger (conversion) side, for example in an adtech
company's script embedded in an advertiser's site._

To deduplicate reports, use a deduplication key, that can be set as a query parameter (`dedup-key`) in the attribution redirect request.
`dedup-key` will be used to deduplicate triggers which contain the same `dedup-key` for a single source.
`dedup-key` is a 64-bit integer. It must be unique.

{% Details %}
{% DetailsSummary %}

Why is this needed?

{% endDetailsSummary %}

Consider the following case: a user visits `news.example` and click an ad for `shoes.example`. Over the next few days, they visit `shoes.example` and convert: they make a purchase (`orderId=123`), which triggers a conversion. But for some reason, they reload the checkout completion page that includes the conversion pixel.

By default, the page reload will trigger a second conversion and you'll get _two_ reports.
This is not desirable, because the user really has made only _one_ purchase.

To avoid this, you can **deduplicate** conversions.

{% endDetails %}

#### Example code

Example use of `dedup-key` to deduplicate conversions for the same `orderId`:

Adtech's `server.js`:

```javascript/5,6
app.get('/conversion', (req, res) => {
   const conversionType = req.query['conversion-type']
   const triggerData = ...
   // Use the orderId as a deduplication key
   const orderId = req.query['order-id']
   const dedupKey=`${orderId}`
   const url = `/.well-known/attribution-reporting/trigger-attribution?trigger-data=${triggerData}&dedup-key=${dedupKey}`
   // Adtech orders the browser to schedule-send a report
   res.redirect(302, url)
})
```

{% Aside %}
You can combine deduplication keys and conversion priorities. In this case, the request URL will look like this:

```javascript
/.well-known/attribution-reporting/trigger-attribution?trigger-data=${triggerData}&priority=${priorityValue}&dedup-key=${dedupKey}
```

{% endAside %}

## Example code: Reports

Reports will be sent by the browser to the `attributionreportto` endpoint.

Expect JSON reports with the following format:

```json
{
  "attribution_destination": "http://shoes.example",
  "source_event_id": "93695719836295",
  "trigger_data": "3",
  "source_type": "navigation"
}
```

`source_type`'s value will always be `navigation` in this version of the API. Future versions may include different classes of attribution sources differentiated by this attribute.

## Tips for origin trials

### Use feature detection

{% Aside %}
**If you're
experimenting with the API locally, you can skip this section.**
Feature detection is most relevant for origin trials and experiments running at scale.
{% endAside %}

#### Code for feature detection

To detect whether the API is enabled on a certain page or frame, run the following check:

```js
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // the Attribution Reporting API is enabled
}
```

{% Aside 'gotchas' %}
If `document.featurePolicy.allowsFeature("attribution-reporting")` returns `true`
the API is allowed in the context (page) where this feature detection check is run.

**This isn't a guarantee that the API is usable on that page**: the user may have disabled the API via their browser settings in
`chrome://settings/privacySandbox`.
In order to protect user privacy, there is no way to check for this
programmatically.

<figure>
   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HUzy7QUTW22es3lfPXx7.png", alt="ALT_TEXT_HERE", width="800", height="395" %}
 <figcaption>Event-level reports are generated if the feature is allowed AND is not disabled in the user's browser.</figcaption>
</figure>
 
{% endAside %}
 
#### Use feature detection on the ad side
 
In order to get meaningful insights out of your experiment, you need to know whether a
report **can** be generated for a given source event ID (click ID) that's used on a given publisher
page. One way to do this is as follows:
 
1. In your source-side script (typically the script on the publisher page): check if the feature is
   allowed via `document.featurePolicy.allowsFeature("attribution-reporting")`. Send a request to
   the server with the result of this check.
2. On your server: if the feature is allowed on that page, generate
   source event IDs that will be attached to the ads on that page. Thanks to Step 1,
   you can be confident that all these source event IDs are "registrable" ("activable"): reports can technically be generated for these sources if the user converts and has not opted out of the API via `chrome://settings/privacySandbox`.
3. In your source-side script (typically the script on the publisher page): if the ad is clicked, send a request to the server to mark it as registered ("active").
 
This will help you analyze the results of your experiment. Head over to [Analyze the reports](#analyze-the-reports) for details.
 
#### Use feature detection on the attribution trigger side
 
Run a feature check on the attribution trigger side (typically, an advertiser site).
This will help you monitor a potential report loss in case attributions can't be triggered.

### Analyze the reports

_The example code in this section would live on the server that receives the reports, for example on an adtech company's server or in a helper service._

{% Aside %}
**If you're experimenting with the API locally, you can skip this section.** This section is most relevant for origin trials and experiments running at scale.
It will be updated as details are gathered about the behavior of the API at scale.
{% endAside %}

Once you receive a report, if it matches a source event ID that you had [marked as "active" on your server](#use-feature-detection-on-the-source-side), count this as a conversion.

All source event IDs that were active but did **not** generate a report tell you the following:

- The user has not converted.
- Or the user may or may not have converted, and has taken an action that prevents reports
  from being generated or sent: they may have disabled the API, or [cleared browsing data](/docs/privacy-sandbox/attribution-reporting-data-clearing/).

- Or the user may or may not have converted, and a technical error happened:
  - A misconfiguration in your code prevented clicks or attribution triggers from
    being registered. See how to avoid common misconfigurations in [Troubleshooting in your browser](#troubleshooting-in-your-browser).
  - The report could not be sent due to a network error.

### Recover the corrected conversion count

_The example code in this section would live on the server that receives the reports, for example on
an adtech company's server, or in a helper service._

Even though the trigger (conversion-side) data is noised, the reporting endpoint can recover the
true count of reports that have a specific conversion value.

See how in the [noise corrector example script](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py).

{% Aside %}
**Does this impact user privacy?** 🤔

User privacy isn't impacted by this technique, because you can't determine whether a
specific event's conversion data was noised. This only gives you the correct conversion count at an aggregated level.

{% endAside %}

## Browser setup

### Browser setup for origin trials

If you want to try in your browser a deployed application that's using an origin trial token for this API, it should work out-of-the-box⏤this is the point of origin trials, where API can be tested with end-users without any special setup required.
However, there are still a few basic criteria that need to be fulfilled.

{% Details %}
{% DetailsSummary %}

How to ensure that a site that is origin-trial-configured will run correctly in your browser

{% endDetailsSummary %}

If you're trying out a deployed application that is origin-trial-configured, make sure your browser fulfills these criteria:

- Use Chrome version **94** or later. You can check what version of Chrome you're using by
  typing `chrome://version` in the URL bar. To access the newest Chrome versions, you may need [Chrome Canary](https://www.google.com/chrome/canary/). See details about Chrome release dates on [Chrome Platform Status](https://www.chromestatus.com/features/schedule).
- **Don't use Incognito** or Guest mode. The API is disabled on these profiles.
- Ensure that the **Privacy Sandbox APIs are enabled** at `chrome://settings/privacySandbox`.
- **Deactivate ad-blocking extensions** on the pages where you need to test the API (or create a
  fresh user profile without extensions). Some ad-blocking browser extensions may block some of
  the API's functionality if script names contain the term "ad".
- Optional (only relevant if you've chosen to **Exclude a subset of users** in the dropdown
  **How is usage controlled?** when you've registered your origin trial token): in this case, the API is only enabled for a subset of Chrome users. You may not be part of
  this group. You can enforce that your browser behaves as if it was in the selected Chrome group
  by enabling the flag `chrome://flags/#enable-experimental-web-platform-features`). Learn more in
  [Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/).

{% endDetails %}

{% Aside %}

Even if you've set up an origin trial, keep in mind that user can opt out of the API via `chrome://settings/privacySandbox`.

{% endAside %}

### Browser setup for local development

{% Details %}
{% DetailsSummary %}

How to setup your browser for local development

{% endDetailsSummary %}

- **Enable** the flag `chrome://flags/#enable-experimental-web-platform-features`.
- Apply the exact same setup steps listed in the previous section, [Browser setup for origin trials](#browser-setup-for-origin-trials).

To check if the API is enabled for your browser, open `chrome://internals` and check if the status is
**enabled**.

{% endDetails %}

## Tips for local debugging

{% Aside %}

If you have questions or need support to experiment with this API, join the
[mailing list for developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)
and ask your question.

If you're missing some features to troubleshoot and debug, your input is needed!
[Join the discussion](https://github.com/WICG/conversion-measurement-api/labels/debugging-monitoring) and open new issues to share your thoughts on
what would make debugging easier for you.

{% endAside %}

### Use the debugging interface and DevTools

To visualize attribution data and reports stored locally in your browser, open
`chrome://conversion-internals/`.

- Under **Active Sources**, you can see the clicks that have been registered and
  that will be matched with trigger data as conversions happen.
- Under **Pending Reports**, you can see the reports the browser has scheduled to send.
- Under **Sent Reports**, you can see the reports that the browser has sent.

{% Aside 'gotchas' %}
A click becomes inactive and will disappear from the **Active Sources** list when the maximum number of attributions has been reached; for clicks, the maximum is three.
{% endAside %}

<figure>
   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/l0TKQxBtYGYriRPec35c.png", alt="Screenshot of the conversion internals", width="800", height="598" %}
   <figcaption>Debug with conversion internals: this UI displays sources, triggers, as well as pending and sent reports.</figcaption>
</figure>

Use the DevTools **Issues** tab to detect problems in your implementation. Issues will pop up if your click sources or attribution triggers are incorrectly configured.

<figure>
   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/35AVSPBuMNw6mMoJ7aPM.png", alt="Screenshot of DevTools", width="800", height="605" %}
   <figcaption>Debug with Chrome DevTools: Issues will pop up in the 'Issues' tab of Chrome DevTools if a source or an attribution trigger is incorrectly configured.</figcaption>
</figure>
 
### Get reports immediately
 
Reports are normally sent at scheduled times. But for debugging purposes, you need to receive the reports immediately after they're generated.
 
- To have your browser send all of the currently scheduled reports, click **Send All
 Reports** in `chrome://conversion-internals/` > Pending Reports.
- To have your browser **always** send reports immediately, enable the flag
 `chrome://flags/#conversion-measurement-debug-mode` and restart your browser.
 
### Use consistent origins

Pick one of `localhost` or `127.0.0.1`, and use it consistently everywhere.

{% Aside 'gotchas' %}

Even though `localhost` and `127.0.0.1` are aliases, they're different origins. If you set `attributiondestination=http://localhost:3000`,
conversions happening on `http://127.0.0.1:3000` will **not** be registered, since the origins don't match.

{% endAside %}

## Troubleshooting in your browser

**If you've followed the [browser setup steps](#browser-setup)** but the API doesn't behave as expected, follow the troubleshooting tips below.

{% Aside %}
You can apply these techniques to debug an application
that's deployed or an application that's running locally.

If the tips below don't fix the issue you're encountering, join the
[mailing list for developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)
and ask your question.
{% endAside %}

### No clicks or trigger events are recorded

If you're not able to see any clicks or attribution trigger event on `chrome://conversion-internals` with your implementation, try the following:

- Check if the API is enabled for your browser: open `chrome://internals`. The **status** field should display **enabled**.
- If the status is **disabled**, follow the setup steps in [Browser setup](#browser-setup). Once you do that, the displayed status on `chrome://internals` should be **enabled**.
- Try out the [demo](#demo).
- If you can't see clicks, attribution triggers and reports populating `chrome://conversion-internals` as you go through the demo, follow the steps listed in
  [Browser setup](#browser-setup).
- If you can see clicks, attribution triggers and reports when trying out the demo, this means
  that your browser is properly configured. The issue may be a result of your implementation or
  origin trial setup. Check for common issues in your origin trial setup and implementation:
- If you're running an origin trial, follow the troubleshooting checklist in
  [Troubleshooting origin trials](/origin-trial-troubleshooting/).
- Ensure that the feature is [allowed](#allow-the-feature-for-cross-origin-iframes) in your application.
- Open Chrome DevTools and see if issues have been flagged with your implementation in the
  **Issues** tab. A misconfiguration in your code may have prevented clicks or attribution triggers from being registered.

### The trigger data looks wrong

If the trigger data (conversion data) in the report isn't the value that you set for it, this is most likely due to the noise that's applied by the browser to preserve user
privacy.

{% Aside 'gotchas' %}
If noise is applied to the trigger data, this is already reflected in the trigger data that is
displayed on `chrome://conversion-internals`.
{% endAside %}

Keep in mind that you can recover the true conversion count in a privacy-preserving way. See
[Recover the corrected conversion count](#recover-the-corrected-conversion-count).

### No reports are received

If reports appear as generated and sent but don't seem to be received by your endpoint:

- Open `chrome://conversion-internals`.
- Check if reports are generated and appear under **Pending Reports**.
- If no reports appear under **Pending Reports**, there may be an issue with the way attributions are triggered in your implementation. Head over to [No clicks or trigger events are recorded](#no-clicks-or-trigger-events-are-recorded).
- If reports appear under **Pending Reports**, click **Send**. Under
  **Sent Reports**, check the HTTP response code.
- If the status code is 500 or another error code, the browser has correctly sent the report to the `attributionreportto` endpoint but an error happened on the endpoint's side. Check your server logs to investigate the issue.

### Still not working?

In case these troubleshooting tips didn't help 🤷🏻, join the
[mailing list for developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)
and ask your question!

## Troubleshooting at scale

Even when you're not encountering errors in your browser,
there may be some issues for your end-users that cause reports to not be generated or sent.
Learn more in [Analyze the reports](#analyze-the-reports).

{% Aside %}
If you're looking for ways to troubleshoot and debug at scale, your input is needed.
[Join ongoing discussions](https://github.com/WICG/conversion-measurement-api/labels/debugging-monitoring)
and share what could be done to make debugging at scale easier for you.
{% endAside %}

## Attribution Reporting: all resources

See [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction).
