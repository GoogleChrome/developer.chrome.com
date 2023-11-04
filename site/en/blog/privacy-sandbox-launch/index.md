---
layout: 'layouts/blog-post.njk'
title: 'Shipping the Privacy Sandbox relevance and measurement APIs'
authors:
  - rowan_m
  - anusmitaray
description: >
  Plans and timeline for gradually enabling the Privacy Sandbox relevance and measurement APIs in Chrome 115, ending the origin trial, and enrollment updates.
subhead: >
  Plans and timeline for gradually enabling the Privacy Sandbox relevance and measurement APIs in Chrome 115, ending the origin trial, and enrollment updates.
date: 2023-07-20
thumbnail: 'image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png'
alt: >
  Shipping the Privacy Sandbox relevance and measurement APIs
tags:
  - privacy
---

In May we shared our [plans to ship the Privacy Sandbox relevance and measurement APIs](/blog/shipping-privacy-sandbox/) in Chrome 115. That moment is now here, so with Chrome 115 going to Stable, we are beginning the process of gradually enabling the APIs in the next few days.  

In this post, we'll cover the multiple components of this launch, including:

-  **What's shipping:**  The launch process for the relevance and measurement APIs: Topics, Protected Audience, Attribution Reporting, Private Aggregation, Shared Storage, and Fenced Frames.
-  **Gradually enabling the APIs:** APIs will be gradually enabled over the course of the 115 milestone while monitoring for issues, aiming for 99% availability by mid-August.
-  **Ending the unified origin trial:** The Privacy Sandbox Relevance and Measurement origin trial ends on September 20, 2023 providing overlap with the transition to general availability.
-  **Updated user controls:** Users will have "Ad privacy" controls to manage the APIs.
-  **Enrollment:** There's an updated enrollment process which is mandatory for developers using the relevance and measurement APIs.
-  **Chrome-facilitated testing modes:** Updated details on the options for developers to test the APIs without third-party cookie data.

## What's shipping

In [the previous post](/blog/shipping-privacy-sandbox/), we introduced the list of relevance and measurement APIs that are launching in Chrome 115. As part of the [usual process](/docs/privacy-sandbox/proposal-lifecycle/), we’ve sent an "Intent to Ship" (I2S) message to the blink-dev mailing list for each feature. The I2S messages include details of the specific API functionality for the 115 release, engineering discussions on the proposals, and importantly, the approvals (or LGTMs) from the [Blink API owners](https://www.chromium.org/blink/guidelines/api-owners/#:~:text=The%20Blink%20API%20owners%20oversee,APIs%20to%20Chromium%2Dbased%20browsers.) to ship the feature.

{% Aside %}

You can check out the I2S messages for [Attribution Reporting API](https://groups.google.com/a/chromium.org/g/blink-dev/c/2Rmj5V6FSaY), [Protected Audience](https://groups.google.com/a/chromium.org/g/blink-dev/c/igFixT5n7Bs), [Topics API](https://groups.google.com/a/chromium.org/g/blink-dev/c/PN_aE-X-f9U), [Private Aggregation API](https://groups.google.com/a/chromium.org/g/blink-dev/c/8cKaLstq2QQ), [Shared Storage API](https://groups.google.com/a/chromium.org/g/blink-dev/c/dZ0NRwh7cvs), and [Fenced Frames](https://groups.google.com/a/chromium.org/g/blink-dev/c/tpw8wW0VenQ). 

{% endAside %}

Alongside the web platform APIs, the [Aggregation Service](/docs/privacy-sandbox/aggregation-service) for Attribution Reporting and Private Aggregation is also moving to general availability. Additionally, we're in the process of gradually enabling [First-Party Sets](/docs/privacy-sandbox/first-party-sets/) ([I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/7_6JDIfE1as)), [Private State Tokens](/docs/privacy-sandbox/trust-tokens/) ([I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/vKCYxKqw8k0/m/ohKLGrM5AQAJ)), and will be shipping [Storage Partitioning](/docs/privacy-sandbox/storage-partitioning/) ([I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/24hK6DKJnqY/m/ChL2WWx5CgAJ)).

## Gradually enabling APIs

As with some previous Privacy Sandbox features, we'll gradually enable the relevance and measurement APIs for an increasing percentage of browser instances to make sure that we can monitor and respond to any potential issues. Our aim is to start this process a few days after the 115 Stable date of July 18, 2023, most likely the week of July 24. Then we intend to ramp up to enabling the APIs for approximately 35% of browsers over about a week. Similar to the [unified origin trial](/docs/privacy-sandbox/unified-origin-trial/#status), this ramp-up will include a main group with all APIs enabled and several smaller isolated groups with a subset of APIs enabled. These isolated groups provide a quicker route for identifying potential issues with the APIs.

{% Aside %}

Users need to relaunch Chrome before version updates or incremental API updates take effect, meaning it always takes additional time for the ramp up to reach the target levels. All percentages shown are approximate and developers should expect fluctuations in this period as we may adjust levels to respond to issues. Overall percentages of Chrome browsers may also not map to the same percentage of an individual site's traffic, so you should only use this as indicative of expected traffic.

{% endAside %}

We then intend to increase availability to approximately 60% of browsers at the start of August. This will still include the experimental groups, so you may see different levels of availability for different APIs.  All being well, we will make a final increase to approximately 99% of browsers by mid-August, around the 116 Stable release. At this point we will also merge the individual experiment groups, maintaining only small, isolated groups without every API enabled to aid with any potential issue detection. We will hold at this level to continue monitoring and begin preparation for the Chrome-facilitated testing modes. 

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/oPELU4sAmYTdAsahyFQy.png", alt="Approximate availability in Chrome Stable by version.", width="800", height="339" %}

This timeline is subject to alterations depending on the results of monitoring along the way. As always, we will update the documentation here as well as posting updates to the blink-dev threads as we progress through each stage.

## Enrollment

To access the Privacy Sandbox relevance and measurement APIs on Chrome and Android, developers will need to complete the [enrollment and attestation process](https://goo.gle/privacy-sandbox-enroll). This will soon become a mandatory requirement for accessing the APIs, so we recommend you start the process as soon as possible.  
For local testing, we are providing developer overrides from Chrome 116 with a Chrome flag and CLI switch:

-  Flag: `chrome://flags/#privacy-sandbox-enrollment-overrides`
-  CLI: `--privacy-sandbox-enrollment-overrides=https://example.com,https://example.co.uk,...`

## Ending the unified origin trial

The [Privacy Sandbox Relevance and Measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/) allows sites to run unified experiments across the relevance and measurement APIs. We are starting the API ramp up with the same groups that are enabled in the origin trial to provide continuity in existing data. The tokens and the origin trial remain valid until September 20th, 2023 but by the end of July it will no longer be necessary to provide them. We will also start removing the origin trial token requirement for pre-Stable channels (Beta, Canary, etc.) this week as we begin to ramp up the overall traffic. However, you should ensure you enroll for the APIs before the expiration date to ensure a seamless transition. We'll update our [documentation](/docs/privacy-sandbox/unified-origin-trial/) with additional guidance and instructions as we reach the end of the origin trial.

## Updated user controls

We are gradually rolling out the updated Ad privacy controls which replace the trial version of the Privacy Sandbox controls. We're enabling the new UX on a similar timeline to the APIs, aiming to be complete by mid-August.  
Developers can enable the new settings for testing by enabling the flag at  `chrome://flags/#privacy-sandbox-settings-4`. The following table includes the relevant Chrome settings and the APIs they control:

<table>
  <thead>
    <tr>
      <th><br>
<strong>Chrome settings</strong></th>
      <th><br>
<strong>Settings location</strong></th>
      <th><br>
<strong>Privacy Sandbox API</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><br>
Ad topics</td>
      <td><p><pre>
chrome://settings/adPrivacy/interests
</pre></p></td>
      <td><br>
Topics</td>
    </tr>
    <tr>
      <td><br>
Site-suggested ads</td>
      <td><p><pre>
chrome://settings/adPrivacy/sites
</pre></p></td>
      <td><br>
Protected Audience</td>
    </tr>
    <tr>
      <td><br>
Ad measurement</td>
      <td><p><pre>
chrome://settings/adPrivacy/measurement
</pre></p></td>
      <td><br>
Attribution Reporting</td>
    </tr>
  </tbody>
</table>

## Chrome-facilitated testing modes

We previously provided the initial information on the [Chrome-facilitated testing modes](/docs/privacy-sandbox/chrome-testing/) and we have also been working on your feedback provided on the [developer support GitHub repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing). We are looking to share further technical details in mid-August. From there, we will also host office hours sessions for developers along with continuing to work on the testing mode issues in GitHub.  
You can provide your feedback on the following issues:

-  [Are you planning to test using Mode A, Mode B, or both?](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
-  [Picking label sizes for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
-  [Use of Client Hints for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

Or you can also [raise a new issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues) for additional questions or discussion.  

{% Aside %}

The [Competition and Markets Authority](https://www.gov.uk/government/organisations/competition-and-markets-authority) (CMA) has published their [guidance on testing Privacy Sandbox APIs](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf) with relevant information on timelines, approaches to testing, and next steps.  

{% endAside %}

Shipping these APIs is another key milestone in the ongoing [Privacy Sandbox timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline). This marks the beginning of the transition from sites testing in the origin trial to integrating these APIs in production. We will be keeping you updated as we progress through enabling the APIs, to the opt-in testing with labels in Q4 2023, the 1% third-party cookie deprecation in Q1 2024, heading towards the full third-party cookie phaseout in Q3 2024. We will continue working closely with the CMA, as per our commitments, before taking further steps to expand deprecation.
