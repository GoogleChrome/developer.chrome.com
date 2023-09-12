---
layout: 'layouts/doc-post.njk'
title: '[Obsolete] Migration guide (Chrome 92): Conversion Measurement API to Attribution Reporting API'
subhead: >
  The Conversion Measurement API is changing in Chrome 92.
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %}
If you have questions or need support during your migration, join
the [mailing list](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) and
ask your question.
{% endAside %}

## What's changing?

Following the [API proposal](https://github.com/WICG/conversion-measurement-api)'s changes
in the first months of 2021, the API implementation in Chrome is evolving. Here's what changing:

- The API name, and the permissions policy name.
- The HTML attribute names and `.well-known` URLs.
- The format of the reports. Reports are now sent as JSON in the request body.
- The content of the reports: `credit` has been removed, along with reports that would have had 0 credit.

What remains unchanged in Chrome 92 is the set of supported features: event-level reports, for clicks only.
**Expect updates on this**. After this change, other updates and features will be released in future Chrome versions.

{% Aside %}
To receive updates on the origin trial for this API and upcoming features, subscribe to
the [mailing list](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
{% endAside %}

## When do these changes take effect?

These changes take effect starting from [Chrome
92](https://chromestatus.com/features/schedule), stable on July 20th 2021.
Chrome 92 beta was released on June 3rd 2021.

## What should you do?

{% Aside %}
There are more changes to the API coming in future versions. They will use the new naming adopted in Chrome 92.
{% endAside %}

If you're running an origin trial or have implemented a demo for this API, you have two
options:

- **Option 1 (recommended)**: migrate your code now or in the following weeks, ideally before
  mid-July 2021. This way, your codebase will be ready for future changes and will
  keep working for newer Chrome clients.
- **Option 2**: Wait for more updates and features to be released in future Chrome versions,
  and make all necessary code changes at once.

## Migrate

### Example migration

You can see a migration example for a small demo app in this [pull request (draft)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files).

### Update your permissions policy code

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr>
</tbody>
</table>

### Update your feature detection code

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr>
</tbody>
</table>

### Update the HTML attributes

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>conversiondestination</code></td>
<td><code>attributiondestination</code></td>
</tr>
<tr>
<td><code>impressiondata</code></td>
<td><code>attributionsourceeventid</code></td>
</tr>
<tr>
<td><code>impressionexpiry</code></td>
<td><code>attributionexpiry</code></td>
</tr>
<tr>
<td><code>reportingorigin</code></td>
<td><code>attributionreportto</code></td>
</tr>
</tbody>
</table>

### Update `window.open()` arguments

An attribution source can be registered for navigations initiated by `window.open()`.
Update these calls if you're using `window.open()` to register attribution sources.

Your new code should look as follows (this renaming follows the [HTML attributes
renaming](#update-the-html-attributes)):

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Update your registration call URL and parameter

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead>
<tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr>
</tbody>
</table>

### Update your reporting endpoint code

<table class="simple width-full fixed-table with-heading-tint">
<thead>
<tr>
<th></th>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr>
</thead>
<tbody>
<tr>
<td>Requests to expect from the browser</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution</td>
</tr>
<tr>
<td>Incoming reports</td>
<td>Sent as URL parameters.</td>
<td>Sent as JSON in the request body.<br>
<br>
The report data is included <strong>in the request body as a JSON object</strong> with the
following keys:<br>
<code>source_event_id</code>: formerly <code>impression-data</code>, the 64-bit event id set on the attribution source.<br>
<code>trigger_data</code>: formerly <code>conversion-data</code>, the 3-bit data set in the attribution trigger
redirect.<br><br>
⚠️ <code>credit</code> has been removed.

</tr>
</tbody>
</table>

## Attribution Reporting: all resources

See [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-introduction).
