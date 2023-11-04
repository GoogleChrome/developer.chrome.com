---
layout: 'layouts/blog-post.njk'
title: Attribution Reporting updates in June 2022
description: >
  Review the latest changes to the Attribution Reporting API.
date: 2022-06-23
authors:
  - alexandrawhite
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/0ZWxOTHGZIp5fRzDBLTx.jpg'
alt: >
  Measuring tape.
tags:
  - privacy
  - experiment
---

The Attribution Reporting proposal is changing for [Chrome version
104](https://chromiumdash.appspot.com/schedule), with new API mechanisms, functionality, and updates
to the aggregation service.

## Who are these updates for?

These updates are for you if:

*  You already are familiar with the API—for example, if you've been observing
   or participating in the discussions on the WICG repository and want to
   understand the changes made to the API.
*  You're using the Attribution Reporting API in a demo or plan to test in the
   [origin trial](/blog/privacy-sandbox-unified-origin-trial/).

If you're just getting started with this API and/or have not experimented with
it yet, go directly to the [introduction to the
API](/docs/privacy-sandbox/attribution-reporting-introduction/) instead.

{% Aside %}

The Google Chrome team will host [developer office
hours](https://docs.google.com/document/d/14GNexALd7dLBJe-MdLFuAjiZI3EhfNvk8zTs5Ct6nnM/edit?usp=sharing),
where developers who are testing and integrating the Privacy Sandbox
technologies can learn more about Attribution Reporting in Chrome's Privacy
Sandbox.

{% endAside %}

## Attribution Reporting API updates

The [Attribution Reporting demo](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/27/files)
have been updated to reflect the latest changes to the Attribution Reporting
client-side API.

Most changes don't require action. Those that do require updates for your
implementation have been highlighted below.

### (Action required) unified headers for registration

The headers have been unified. There is now just one header for sources and one
for triggers, formatted in JSON.

*  To register attribution sources, you can respond to registration requests
   with the header `Attribution-Reporting-Register-Source`. 
*  To complete trigger registration, set the
   `Attribution-Reporting-Register-Trigger` header.

This change requires action. Refer to the
[API handbook](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit)
for more information.

### (Action required) aggregation keys are now a dictionary

To [register attribution sources](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/f653de6d9562c4c5f5ca04a1c89fd97c5aedce5a/conversion-measurement/adtech/server.js#L118),
continue to use `aggregation_keys`, but now stored as a JSON dictionary instead
of a list.

For example:

```json
"aggregation_keys": {
    // Generate a "0x159" key piece for the key named "campaignCounts".
    "campaignCounts": "0x159", // User saw ad from campaign 345 (out of 511)

    // Generates a "0x5" key piece (low order bits of the key) for 
    // the key named "geoValue".
    "geoValue": "0x5" // Source-side geo region = 5 (US), out of a possible ~100 regions
 }
```

This change requires action. Refer to the
[API handbook](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit)
for more information.

### Report generation

You can choose to generate only aggregatable reports, which can be aggregated
into summary reports. If your filters don't match any event triggers, then no
event-level reports will be generated.

### Unified debug key setting

The debug key should now be set in the source and trigger headers, instead of
with separate headers. Learn more about [how to debug
reports](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.fvp017tkgw79).

### Register attribution sources

Script tags can now be used to register attribution sources, similar to support
for the `<img>` tag. 

### More API updates

Other changes that have been made and cited in the API handbook include:

*  Sources can be registered with JavaScript request APIs.
*  `window.registerSource` was removed.
*  It is now optional to include a value for `attributionsrc` when registering
   sources.
*  `Attribution-Reporting-Eligible` header added to incoming source
   registration requests.
*  There was a minor change to `encodeURIComponent`. 
*  The [privacy budget key was removed](https://github.com/WICG/attribution-reporting-api/pull/471)
   from the `shared_info` field in aggregatable reports.

## Support for the Aggregation Service

In Chrome 104, we intend to update the format of some information inside of
aggregatable reports. We are currently building support for this change in the
Aggregation Service. This document will be updated, as well the
[changelog](/docs/privacy-sandbox/attribution-reporting-updates/#changelog),
after the changes are shipped.

We've gathered a document of [practical tips and strategies to generate summary
reports](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit?usp=sharing).
There are a number of insights, including:

*  Overview of noise in summary report generation
*  A detailed explanation of dimensions, keys, and values
*  Aggregation keys in practice, including a key structure map
*  Aggregatable values in practice, and implications of the contribution budget
*  Guide to experimenting with epsilon

## Read more about the updates

*  Read [What you should know about the API](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/edit).
*  Read [Experiment with Attribution Reporting: Strategy and tips for summary reports](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit?usp=sharing).

_The header image is from <a href="https://unsplash.com/@diana_pole">Diana Polekhina</a> on <a href="https://unsplash.com/">Unsplash</a>._
