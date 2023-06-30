---
layout: 'layouts/doc-post.njk'
title: 'Relevance and measurement unified origin trial'
subhead: >
   Run unified experiments across Attribution Reporting, Protected Audience API,
   Topics, Fenced Frames, and Shared Storage.
description: >
   Run unified experiments across Attribution Reporting, Protected Audience API,
   Topics, Fenced Frames, and Shared Storage.
date: 2022-09-08
updated: 2023-06-05
authors:
  - anusmitaray
  - kevinkiklee
  - rowan_m
---

The Privacy Sandbox includes a selection of proposals to enable advertising use
cases without the need for cross-site tracking. [Origin
trials](/blog/origin-trials/) provide an opportunity for developers to evaluate
and provide feedback on new web technologies through real-world testing. The
[Privacy Sandbox Relevance and
Measurement](/origintrials/#/view_trial/771241436187197441) origin trial
provides a single trial allowing sites to run unified experiments across
Attribution Reporting, Protected Audience API, Topics, Fenced Frames, and Shared Storage.

Developers can sign up for this single origin trial that allows you to test
across the Topics, Protected Audience API, and Attribution Reporting APIs. This guide takes you
through the configuration steps to access the APIs, tells you how to validate
your configuration, and provides further resources for testing against the APIs.

{% Aside 'key-term' %}
_Traffic_ refers to the percentage of Chrome browser instances included in the trial, not the percentage of requests made to individual sites.
{% endAside %}

## Check the status of the origin trial {: #status}

### June 2023

#### Private Aggregation 7% ramp-up in Stable

[Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) will be available at 7% of Chrome Stable traffic from Tuesday, June 6, 2023. The API will be available in the main unified origin trial group (5%), Protected Audience isolated group (1%), and Shared Storage isolated group (1%). The traffic allocation for Protected Audience and Shared Storage will not change since Private Aggregation is being added to existing isolated experiments. 

Traffic allocation as of Tuesday, June 6th:

<table>
  <tr>
   <td><strong>API</strong>
   </td>
   <td><strong>Traffic allocation</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="2">Attribution Reporting 
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of Stable traffic as of March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - ARA only
   </td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="3">7% of Stable traffic as of March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage + Private Aggregation + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience + Private Aggregation + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience
   </td>
   <td>Unified - 5% 
   </td>
   <td rowspan="2">6% of Stable traffic as of March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience + Private Aggregation + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="3">Private Aggregation
   </td>
   <td>Unified - 5% 
   </td>
   <td rowspan="3">7% of Stable traffic as of June 6, 2023
   </td>
  </tr>
  <tr>
    <td>Isolated - 1% - Protected Audience + Private Aggregation + Fenced Frames only
    </td>
    </tr>
    <tr>
    <td>Isolated - 1% - Shared Storage + Private Aggregation + Fenced Frames only
    </td>
  </tr>
  <tr>
   <td rowspan="2">Shared Storage
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of Stable traffic as of March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage + Private Aggregation + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Topics
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of Stable traffic as of March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Topics only
   </td>
  </tr>
</table>

{% Details %} {% DetailsSummary %}
### Previous updates

Check out previous updates on the origin trial. {% endDetailsSummary %}

#### April 2023

##### Private Aggregation 1% ramp-up in Stable

[Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) origin trial will be available at 1% of Chrome Stable unified experiment traffic from Monday April 17. The <code>[sendHistogramReport()](/docs/privacy-sandbox/private-aggregation/#sendhistogramreport)</code> function of Private Aggregation is available to be used in [Protected Audience API](/docs/privacy-sandbox/fledge/) and [Shared Storage](/docs/privacy-sandbox/shared-storage/) worklets. 

The traffic allocation will look like the following starting on Monday, April 17:

<table>
  <tr>
   <td><strong>API</strong>
   </td>
   <td><strong>Traffic allocation</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="2">Attribution Reporting 
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - ARA only
   </td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="3">7% of the Stable traffic starting from March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage (URL Selection) + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience API + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience API 
   </td>
   <td>Unified - 5% 
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience API + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td>Private Aggregation
   </td>
   <td>Unified - 1% 
   </td>
   <td>1% of the Stable traffic starting from April 17, 2023
   </td>
  </tr>
  <tr>
   <td rowspan="2">Shared Storage (URL Selection)
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage (URL Selection) + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Topics
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 13, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Topics only
   </td>
  </tr>
</table>

#### March 2023

##### Timeline update

We initially communicated that we will begin the isolated experiments on Monday, March 13, 2023, but the new experiments will now begin on Thursday, March 16, 2023 due to the additional time needed for setting up the experiments. The 1% Protected Audience API ramp back up from 4% to 5% will also occur on Thursday, March 16, 2023.

##### Protected Audience API 1% ramp back up

Last month, we [temporarily reduced Protected Audience API origin trial traffic](/docs/privacy-sandbox/unified-origin-trial/#january-2023) from 5% to 4% of Chrome stable for testing. The initial testing has concluded, and we plan to ramp Protected Audience API back up to 5% from 4% for the unified experiment on Thursday, March 16, 2023.

The ramped-up users will be the same set of users that were ramped down. However, their previous interest groups have expired, since more than 30 days have passed since the ramp-down. 

##### Isolated experiments

To improve our testing process and continue observing the metrics of origin trial APIs, we're creating isolated experiments for each API, in addition to the existing unified experiment. New experiments will be created for Attribution Reporting, Topics, a combination of Protected Audience API and Fenced Frames, and a combination of Shared Storage’s URL Selection operation and Fenced Frames. In each isolated experiment, only the assigned APIs will be available for the users in that group.

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API
   </th>
   <th>Isolated experiment<br>traffic allocation
   </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>Attribution Reporting 
   </td>
   <td>1%
   </td>
  </tr>
  <tr>
   <td>Protected Audience API + Fenced Frames
   </td>
   <td>1%
   </td>
  </tr>
  <tr>
   <td>Shared Storage (URL selection) + Fenced Frames
   </td>
   <td>1%
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>1%
   </td>
  </tr></tbody>
</table>

Starting Thursday, March 16, you will begin to receive an additional 1% of the Chrome Stable traffic for the APIs listed above, on top of the 5% traffic you are receiving from the existing unified experiment. New users will be allocated to each experiment.

##### Traffic allocation

The current unified origin trials traffic allocation as of Tuesday, February 28, is as follows:

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API
   </th>
   <th>Current unified experiment<br>traffic allocation
   </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>Attribution Reporting 
   </td>
   <td>5%
   </td>
  </tr>
  <tr>
   <td>Fenced Frames
   </td>
   <td>5%
   </td>
  </tr>
  <tr>
   <td>Protected Audience API
   </td>
   <td>4%
   </td>
  </tr>
  <tr>
   <td>Shared Storage (URL selection)
   </td>
   <td>5%
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>5%
   </td>
  </tr></tbody>
</table>

The traffic allocation will look like the following starting on Thursday, March 16, after Protected Audience API is ramped back up, and the new isolated experiments begin:

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API
   </th>
   <th>New traffic allocation
   </th>
   <th>Status
   </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td rowspan="2">Attribution Reporting 
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 16, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - ARA only
   </td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="3">7% of the Stable traffic starting from March 16, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage (URL Selection) + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience API + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience API 
   </td>
   <td>Unified - 5% (4% current allocation + 1% ramp back up)
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 16, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Protected Audience API + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Shared Storage <br>(URL Selection)
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 16, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Shared Storage (URL Selection) + Fenced Frames only
   </td>
  </tr>
  <tr>
   <td rowspan="2">Topics
   </td>
   <td>Unified - 5%
   </td>
   <td rowspan="2">6% of the Stable traffic starting from March 16, 2023
   </td>
  </tr>
  <tr>
   <td>Isolated - 1% - Topics only
   </td>
  </tr></tbody>
</table>

These changes will not affect your existing origin trial token setup, and you will not have to renew or generate a new origin trial token. 

#### January 2023

As part of a Chrome regression investigation, we will temporarily reduce Protected Audience API origin trial traffic from 5% to 4% of Chrome Stable, from January 26th 2023. We estimate the investigation will take about a month, and we will notify you when the traffic is ramped back up.  

This change will happen automatically, and will not impact your existing origin trial tokens. For the users in the 1% traffic that will ramp down, the interest groups will remain in their browsers. The same users will be part of the ramp back up, and their interest groups can be reused. However, the interest groups expire in 30 days, and the regression investigation may take longer than that. 

Also, Shared Storage’s URL Selection API origin trial will be increasing to 5% of Chrome Stable traffic from January 26th 2023.

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>Notes</th>
  </tr></thead>
  <tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
   </td>
   <td>Available in Stable, increased to 5% from October 26th 2022.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a>
   </td>
   <td>Available in Stable, increased to 5% from October 26th 2022.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>
   </td>
   <td>Available in Stable, temporarily decreasing to 4% from January 26th 2023.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th 2022.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">Shared Storage</a>
   </td>
   <td>Available in Stable, increasing 5% from January 26th 2023.
   </td>
  </tr></tbody>
</table>

#### November 2022

Shared Storage’s `selectURL` API will be [joining the origin
trial](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wXlBwB_UAQAJ)
at 1% of Chrome Stable traffic from November 9th. As previously announced in the
[Increasing the Privacy Sandbox Relevance and Measurement origin trial to
5%](/blog/privacy-sandbox-origin-trial-increase/) blog post, Attribution
Reporting and Topics are now at 5% with Protected Audience API and Fenced Frames also following
on November 9th.

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
   </td>
   <td>Available in Stable, increased to 5% from October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a>
   </td>
   <td>Available in Stable, increased to 5% from October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">Shared Storage</a>
   </td>
   <td>Will be available in Stable, starting at 1% from November 9th.
   </td>
  </tr></tbody>
</table>

#### October 2022: 5% increase

Attribution Reporting, Topics, Protected Audience API, and Fenced Frames are all currently
available in Chrome Stable and will be part of the increased traffic. We will
start increasing traffic for Attribution Reporting and Topics from this week,
Protected Audience API and Fenced Frames will increase from November 9th. Read more in the
[Increasing the Privacy Sandbox Relevance and Measurement origin trial to
5%](/blog/privacy-sandbox-origin-trial-increase/) blog post.

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
   </td>
   <td>Available in Stable, increasing to 5% after October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a>
   </td>
   <td>Available in Stable, increasing to 5% after October 26th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a>
   </td>
   <td>Available in Stable, increasing to 5% from November 9th.
   </td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">Shared Storage</a>
   </td>
   <td>Only available in M105+ Canary, Dev, and Beta for now.
   </td>
  </tr></tbody>
</table>

#### October 2022

-  Origin trial has been [extended to Chrome
110](https://groups.google.com/a/chromium.org/g/blink-dev/c/xm9EvnaVBj8).
[Getting started with Chrome's origin
trials](/docs/web-platform/origin-trials/#renew) explains how to renew origin
trial enrollment. This includes providing a new token to participating origins,
which is the same process followed by any other origin trial extension.

This extension was granted to give the ecosystem time in Stable channel to
continue testing and validating API improvements, while providing feedback
consistent with our existing public timeline.

The overall [Privacy Sandbox
timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)
remains unchanged.

APIs included in the trial:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th>API</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/attribution-reporting/">Attribution
Reporting</a></td>
      <td>
<a
href="/docs/privacy-sandbox/attribution-reporting-experiment/">Developer
guide for the origin trial</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/fledge/">Protected Audience API</a></td>
      <td>
<a
href="/docs/privacy-sandbox/fledge-experiment/">Developer
guide for the origin trial</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/topics/">Topics</a></td>
      <td>
<a
href="/docs/privacy-sandbox/topics-experiment/">Developer
guide for the origin trial</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/fenced-frame/">Fenced
Frames</a></td>
      <td>
See the Protected Audience API guidance for origin trial usage.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/shared-storage/">Shared
Storage</a></td>
      <td>
Only available in M105+ Canary, Dev, and Beta for now.
	  </td>
    </tr>
  </tbody>
</table>

#### August 2022

-  Origin trial availability ramps up to [1% of desktop users from Chrome Stable
    104](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/KhFZN95WBgAJ).
    -  Updates will follow when the availability includes mobile users.

-  Pre-stable channels (Canary, Beta) remain at 50% of users.
-  APIs are not available on iOS Chrome.

#### May 2022

Origin trial availability ramps up to [50% of users from Chrome 102
Beta](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/WBPqGvscAgAJ).
APIs included in the trial:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>
API</th>
      <th>
Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/attribution-reporting-experiment/">Attribution
Reporting</a></td>
      <td>
<a
href="/docs/privacy-sandbox/attribution-reporting-experiment/">Developer
guide for the origin trial</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/fledge-experiment/">Protected Audience API</a></td>
      <td>
<a
href="/docs/privacy-sandbox/fledge-experiment/">Developer
guide for the origin trial</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/topics-experiment/">Topics</a></td>
      <td>
<a
href="/docs/privacy-sandbox/topics-experiment/">Developer
guide for the origin trial</a>. Topics was briefly disabled in the
origin trial due to a <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1321140">bug that affected browser stability.</a></td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/fenced-frame/">Fenced
Frames</a></td>
      <td>
Fenced Frames added to the origin trial. See the Protected Audience API guidance
for experiment usage.</td>
    </tr>
  </tbody>
</table>

#### April 2022

Origin trial begins with a [limited proportion of users from Chrome 102
Beta](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wzeBWfxxEgAJ).
APIs included in the trial:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>
API</th>
      <th>
Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/attribution-reporting-experiment/">Attribution
Reporting</a></td>
      <td>
Individual <a
href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/m/nlEDdjmnCgAJ">Intent
to Experiment (I2E)</a> post. Attribution Reporting also available as
an individual origin trial.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/fledge-experiment/">Protected Audience API</a></td>
      <td>
Individual <a
href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/m/_0T5qleqCgAJ">Intent
to Experiment (I2E)</a> post. Protected Audience API available on desktop only with a
<a
href="https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md">subset
of functionality</a>.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/topics-experiment/">Topics</a></td>
      <td>
Individual <a
href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs/m/jPkW3T-mCgAJ">Intent
to Experiment (I2E)</a> post.</td>
    </tr>
  </tbody>
</table>
{% endDetails %}

## Sign up for and configure the origin trial {: #configure}

To activate the origin trial on your site, you will need to register and embed
the assigned origin trial token (a time-based string for your specific access to
the origin trial). Learn more in the [Getting started with Chrome's origin
trials](/docs/web-platform/origin-trials).

{% Aside %} Register for the [Privacy Sandbox Relevance and Measurement
trial](/origintrials/#/view_trial/771241436187197441). {% endAside %}

Origin trial tokens are granted immediately, and you can revoke or recreate them
at any time.

For every page where you want to use the origin trial, you will need to include
a trial token with that specific page's HTML or response.

Use a `<meta>` tag in the page's `<head>` section:

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

Alternatively, include the following HTTP header in the page response:

```http
Origin-Trial: TOKEN_GOES_HERE
```

### Configure with an iframe

If you're using origin trial features within an iframe (such as Protected Audience API's
`joinAdInterestGroup()`), then the token needs to be provided within the iframe
and match the iframe's origin.

### Configure cross-site with JavaScript

If you are using origin trial features via cross-site JavaScript, as in you are
the provider of third-party JavaScript that is included in the top-level page,
then you will need to:

-  Select the **Third-party matching** option when registering for the origin
    trial.
-  The **Web Origin field** should be the origin of your script.
-  Inject the `<meta>` tag into the top-level page (that is, the first-party
    page, not your own content) from your script. For example:

```js
const otMeta = document.createElement('meta');
otMeta.setAttribute('http-equiv', 'origin-trial');
otMeta.setAttribute('content', 'TOKEN_GOES_HERE');
document.querySelector('head').appendChild(otMeta);
```

## Debug the origin trial {: #debug}

You can check the status for an origin trial in **DevTools** > **Applications**
panel.

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/j2eSl60izhpZDVz4Ea3o.png",
alt="Token Success status and enabled.", width="800", height="397" %}

1. Scroll down to the **Frames** pane.
1. Select the frame where you expect to set the token. For example, the **top**
    frame for the top-level page or the specific **iframe** for embedded pages.
1. In the right-hand pane scroll down to the **Origin Trials** section.
1. You should see an entry for the `PrivacySandboxAdsAPIs` trial.
1. Expand this entry to see the status for the origin trial and your specific
    tokens.

The origin trial is limited to a fraction of Chrome users and your browser may
not be in the experiment group. As a result, you may see a red `TrialNotAllowed`
message against `PrivacySandboxAdsAPIs`. When you expand the entry to check
Token Status, if it shows a green `Success` message, your origin trial
configuration is correct. Eligible users will see the message set to `Enabled`.

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/BPIbYn2BIAWXHfncyoQi.png",
alt="Token Success status and not enabled.", width="800", height="398" %}

If you see different messages, refer to [Troubleshooting Chrome's origin
trials](/docs/web-platform/origin-trial-troubleshooting/#devtools-status) for a
detailed checklist to validate your configuration of the origin trial.

## Detect features {: #feature-detection}

As with all web features, you should check they are reporting as available in
the browser before attempting to use them. You can do this by checking for the
existence of the relevant API in the right location:

```js
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // Attribution Reporting enabled
}

if ('runAdAuction' in navigator) {
  // Protected Audience API enabled
}

if ('browsingTopics' in document) {
  // Topics enabled
}

if ('HTMLFencedFrameElement' in window) {
  // Fenced Frames enabled
}

if ('sharedStorage' in window) {
  // Shared Storage enabled
}

if (window?.sharedStorage?.selectURL instanceof Function) {
  // optionally check specifically for the selectURL function in Shared Storage
}
```

## Determine user eligibility {: #eligible-users}

The origin trial is running for a fraction of Chrome users. They must also have
the relevant functionality enabled in their settings to be eligible for the
trial:

### Browser settings

For a user to be eligible for the trial, they must:

-  Be using a **version and channel of Chrome** where the origin trial is
    running.
    -  See [Origin Trial Status](#status) for current configurations.

-  Be within the **active experiment group in Chrome**.

### User settings

For a user to be eligible for the trial, they must also:

-  have the **Privacy Sandbox trial enabled** via Settings > Security and
    privacy > Privacy Sandbox, also accessible via
    `chrome://settings/privacySandbox`.
-  have **third-party cookies enabled** via Settings > Security and privacy >
    Cookies and other site data set to either "Allow all cookies" or "Block
    third-party cookies in incognito", also accessible via
    `chrome://settings/cookies`.
-  be in a standard browsing session and **not Incognito mode**.

While the origin trial will only show as active to eligible users, you can also
use the [developer flags](#test-locally) to test against your own production
site.

## Control your participation in the origin trial {: #control-participation }

The mechanics of the origin trial remain the same: you obtain origin trial
tokens for the contexts where you want to experiment with the APIs. With the
expanded testing population, you should ensure that you are actively monitoring
and controlling the level of traffic where you choose to enable the trial.

{% Aside %}
5% of Chrome Stable traffic won’t directly correspond to 5% of your own traffic.
The actual proportion of traffic your sites and services receive will depend on
the make-up of your visitors.
{% endAside %}

A good approach here is to:

1. Include the origin trial tokens by default in all contexts where you wish to
   experiment.
2. Use feature detection to check for active APIs.
3. If the APIs are active (and therefore, the browser is eligible for this
   experiment), choose whether or not to use them based on your own experiment
   criteria. For example, if you already have A/B testing infrastructure to
   experiment on a percentage of traffic, sampling, or some other attribute,
   then at this point you can decide which features you will actively use.

You can prevent participation in the origin trial entirely for any browser
instance by not including the token in the response. For instance, if you have
met your own quota for an experiment or need to address an issue during the
trial, then not including the token ensures no experimental functionality will
be available or active in the page.

### Origin trial control by geographic region

You cannot opt-out of an origin trial for specific regions. Origin trials are active on pages that [contain the token](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial), included via HTTP headers (server-side) or HTML meta tags (client-side). 

If you can determine the user's location, then you *could* write code to include the origin trial token based on that location information. For example, you could attempt to use IP addresses to determine a user's location. IP addresses can be spoofed, so this is not a guaranteed solution.

However, a geographic-specific origin can set a [Permissions Policy](/docs/privacy-sandbox/permissions-policy/)
to control what features are usable. For example, `us.example.com` and `uk.example.com` are geographic-specific origins which can be controlled. This does not mean that a region has opted-out of the origin trial.

With a Permissions Policy, a site adds a little snippet of code to their  pages that provides instructions to the browser. When the page loads, the browser  reads the Permission Policy instructions and will allow or block features (or APIs) as outlined in the Permissions Policy. If a site wants to restrict an API in a specific region, the developer could set a policy for all pages requested from that region.

{% Aside 'warning' %}
Users may choose to visit an origin from a region that's different
from where they are. In other words, a user in the United States may be
able to visit `uk.example.com`. Those users would see features and functions
for the United States site that were blocked for the United Kingdom site.
{% endAside %}

## Renew your token

Origin trial tokens expire six weeks from their issue date (or at the end of the
trial if that's sooner).

It’s critical that you [renew and deploy your new
tokens](/docs/web-platform/origin-trials/#renew) within that window for
uninterrupted use of the origin trial features.

Renewing tokens only takes a few minutes, and you can deploy multiple tokens for
the same trial within the same page. You can deploy a renewed token before your
existing token expires, so there's no break in service for users.

{% Aside 'caution'%}
Renewing a token at the end of October only takes you through to early December.
If you have a code freeze over the end of the year, you will either want to
ensure that you can still deploy an updated token or plan to pause participation
in the origin trial over that period.
{% endAside %}

## Test locally {: #test-locally}

For specific guidance on local developer testing, see:

-  [Topics](/docs/privacy-sandbox/topics-experiment/)
-  [Protected Audience API](/docs/privacy-sandbox/fledge-experiment/)
-  [Attribution
   Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/)

The APIs are not on by default and must be [enabled with
flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/) for
testing. You should ensure that you have the same configuration settings enabled
above and then:

-  Use a **version and channel of Chrome** where the features are available.
-  Enable the `chrome://flags/#privacy-sandbox-ads-apis` flag.
    -  Additional flags may conflict with this one, so consider only setting
        this one flag if you experience issues.

Check the developer guides for availability of specific APIs and features and
additional flags for more fine-grained configuration.
