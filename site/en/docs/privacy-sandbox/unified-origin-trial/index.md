---
layout: 'layouts/doc-post.njk'
title: 'Relevance and measurement unified origin trial'
subhead: >
   Run unified experiments across Attribution Reporting, FLEDGE,
   Topics, Fenced Frames, and Shared Storage.
description: >
   Run unified experiments across Attribution Reporting, FLEDGE,
   Topics, Fenced Frames, and Shared Storage.
date: 2022-09-08
authors:
  - anusmitaray
  - rowan_m
---

The Privacy Sandbox includes a selection of proposals to enable advertising use
cases without the need for cross-site tracking. [Origin
trials](/blog/origin-trials/) provide an opportunity
for developers to evaluate and provide feedback on new web technologies through
real-world testing. The
[Privacy Sandbox Relevance and Measurement](/origintrials/#/view_trial/771241436187197441)
origin trial provides a single trial allowing sites to run unified experiments
across Attribution Reporting, FLEDGE, Topics, Fenced Frames, and Shared Storage.  

Developers can sign up for this single origin trial that
allows you to test across the Topics, FLEDGE, and Attribution Reporting
APIs. This guide takes you through the configuration steps to access the APIs,
tells you how to validate your configuration, and provides further resources for
testing against the APIs.

## Check the status of the origin trial {: #status}

### August 2022

-  Origin trial availability ramps up to
    [1% of desktop users from Chrome Stable 104](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/KhFZN95WBgAJ).
    -  Updates will follow when the availability includes mobile users.

-  Pre-stable channels (Canary, Beta) remain at 50% of users.
-  APIs are not available on iOS Chrome.

APIs included in the trial:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th><strong>API</strong></th>
      <th><strong>Notes</strong></th>
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
href="/docs/privacy-sandbox/fledge/">FLEDGE</a></td>
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
See the FLEDGE guidance for origin trial usage.</td>
    </tr>
    <tr>
      <td>
<a
href="/docs/privacy-sandbox/shared-storage/">Shared
Storage</a></td>
      <td>
Shared Storage added to the origin trial in only M105+ Canary, Dev, and Beta for now.
	  </td>
    </tr>
  </tbody>
</table>

{% Details %}
{% DetailsSummary %}

### Previous updates

Check out previous updates on the origin trial.
{% endDetailsSummary %}

#### May 2022

Origin trial availability ramps up to
[50% of users from Chrome 102 Beta](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/WBPqGvscAgAJ).  
APIs included in the trial:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th>
<strong>API</strong></th>
      <th>
<strong>Notes</strong></th>
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
href="/docs/privacy-sandbox/fledge-experiment/">FLEDGE</a></td>
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
Fenced Frames added to the origin trial. See the FLEDGE guidance
for experiment usage.</td>
    </tr>
  </tbody>
</table>

#### April 2022

Origin trial begins with a [limited proportion of users from Chrome 102 Beta](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wzeBWfxxEgAJ).  
APIs included in the trial:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th>
<strong>API</strong></th>
      <th>
<strong>Notes</strong></th>
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
href="/docs/privacy-sandbox/fledge-experiment/">FLEDGE</a></td>
      <td>
Individual <a
href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/m/_0T5qleqCgAJ">Intent
to Experiment (I2E)</a> post. FLEDGE available on desktop only with a
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

To activate the origin trial on your site, you will need to register
and embed the assigned origin trial token (a time-based string
for your specific access to the origin trial). Learn more in the
[Getting started with Chrome's origin trials](/docs/web-platform/origin-trials).  

{% Aside %}
Register for the [Privacy Sandbox Relevance and Measurement trial](/origintrials/#/view_trial/771241436187197441). 
{% endAside %}

Origin trial tokens are granted immediately, and you can revoke or recreate them
at any time. 

For every page where you want to use the origin trial, you will need to include a trial token with that specific page's HTML or response.

Use a `<meta>` tag in the page's `<head>` section: 

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

Alternatively, include the following HTTP header in the page response: 

```http
Origin-Trial: TOKEN_GOES_HERE
``` 

{% Aside %}
If you're using origin trial features within an iframe (such as FLEDGE's
`joinAdInterestGroup()`), then the token needs to be provided within the iframe
and match the iframe's origin. 
{% endAside %}
 
If you are using origin trial features via cross-site JavaScript, as in you are
the provider of third-party JavaScript that is included in the top-level page,
then you will need to:

-  Select the **Third-party matching** option when registering for the
    origin trial.
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

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/j2eSl60izhpZDVz4Ea3o.png", alt="Token Success status and enabled.", width="800", height="397" %}

1. Scroll down to the **Frames** pane.
1. Select the frame where you expect to set the token. For example, the
    **top** frame for the top-level page or the specific **iframe** for
    embedded pages.
1. In the right-hand pane scroll down to the **Origin Trials** section.
1. You should see an entry for the `PrivacySandboxAdsAPIs` trial.
1. Expand this entry to see the status for the origin trial and your
    specific tokens.

The origin trial is limited to a fraction of Chrome users and your browser may
not be in the experiment group. As a result, you may see a red
`TrialNotAllowed` message against `PrivacySandboxAdsAPIs`. When you expand the
entry to check Token Status, if it shows a green `Success` message, your origin
trial configuration is correct. Eligible users will see the message set to
`Enabled`.  

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/BPIbYn2BIAWXHfncyoQi.png", alt="Token Success status and not enabled.", width="800", height="398" %}

If you see different messages, refer to
[Troubleshooting Chrome's origin trials](/docs/web-platform/origin-trial-troubleshooting/#devtools-status)
for a detailed checklist to validate your configuration of the origin trial.

## Detect features {: #feature-detection}

As with all web features, you should check they are reporting as available in
the browser before attempting to use them. You can do this by checking for the
existence of the relevant API in the right location:  

```js  
if (document.featurePolicy.allowsFeature('attribution-reporting')) {  
  // Attribution Reporting enabled  
}

if ('runAdAuction' in navigator) {  
  // FLEDGE enabled  
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
```

## Determine which of your users are eligible {: #eligible-users}

The origin trial is running for a fraction of Chrome users. They must also
have the relevant functionality enabled in their settings to be eligible
for the trial:

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
-  have **third-party cookies enabled** via Settings > Security and privacy > Cookies and other site data set to either "Allow all cookies" or "Block
    third-party cookies in incognito", also accessible via
    `chrome://settings/cookies`.
-  be in a standard browsing session and **not Incognito mode**.

While the origin trial will only show as active to eligible users, you can also
use the [developer flags](#test-locally) to test against your own production
site.

## Test locally {: #test-locally}

For specific guidance on local developer testing, see:

-  [Topics](/docs/privacy-sandbox/topics-experiment/)
-  [FLEDGE](/docs/privacy-sandbox/fledge-experiment/)
-  [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/)

The APIs are not on by default and must be
[enabled with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)
for testing. You should ensure that you have the same configuration settings
enabled above and then:

-  Use a **version and channel of Chrome** where the features are
    available.
-  Enable the `chrome://flags/#privacy-sandbox-ads-apis` flag.
    -  Additional flags may conflict with this one, so consider only
        setting this one flag if you experience issues.

Check the developer guides for availability of specific APIs and features and
additional flags for more fine-grained configuration.
