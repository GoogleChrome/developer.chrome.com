---
layout: 'layouts/doc-post.njk'
title: 'Chrome-facilitated testing'
subhead: >
  Test your sites with third-party cookies disabled.
description: >
  Test your sites with third-party cookies disabled.
date: 2023-05-18
updated: 2023-11-05
authors:
  - alexandrawhite
  - rowan_m
---

To prepare for third-party cookie deprecation, we will be providing Chrome-facilitated testing modes that allow sites to preview how site behavior and functionality works without third-party cookies. This guide provides an overview of the testing modes Chrome plans to provide and how to access experiment group labels.

{% Aside %}

This testing focuses on measuring the performance of the Privacy Sandbox relevance and measurement APIs (PS R&M APIs): Attribution Reporting, Protected Audience, Topics, Private Aggregation, Shared Storage, and Fenced Frames.

{% endAside %}

We will offer two distinct modes:

*   **Mode A:** In Q4 2023 organizations testing the PS R&M APIs can opt in to receive consistent labels on a subset of Chrome browsers to allow for coordinated testing across different testers.
*   **Mode B:** In Q1 2024 Chrome will globally disable third-party cookies for a portion of Chrome browsers.

Both modes will continue through to at least Q2 2024. Where third-party cookies are disabled in Mode B, they will remain disabled through the full phase out of third-party cookies.

We have worked with the [CMA](https://www.gov.uk/government/organisations/competition-and-markets-authority) to ensure that these testing modes align with the testing framework (and timeline) for third parties as laid out in its [guidance on industry testing](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing). As a result, the CMA anticipates that the results from testing in these modes can be used in its assessment of the Privacy Sandbox.

{% Aside %}

Labels will be available via the temporary cookie-deprecation value which can be accessed via an HTTP header or JavaScript API. See the later section [Accessing labels via the cookie-deprecation value](#cookie-deprecation-value) for implementation details.

{% endAside %}

We will also be sending this proposal through the usual [Blink development process](/docs/privacy-sandbox/proposal-lifecycle/), where the technical design and the Chrome release milestone will be finalized. While this is the implementation we would like to ship, additional discussion and approval means these details are still subject to change. We will continue to update this page as the plans progress, and you can continue to [provide feedback or questions](#feedback).


## Mode A: Labeled browser groups {: #mode-a }

Organizations participating in testing will be able to opt in to receiving a persistent set of labels for a subset of Chrome browsers, allowing for coordinated experiments across different ad techs on the same set of browsers. If a browser falls into the `label_only_3` group (as shown in the following table) then all participating ad techs would be able to see the same `label_only_3` label and coordinate accordingly, i.e. use the PS R&M APIs, but refrain from using third-party cookies. We expect participants in the page to ensure labels are forwarded to other participants to allow for a consistent experiment across the entire process.

For example, this allows multiple participants to run [Protected Audience](/docs/privacy-sandbox/fledge/) auctions without third-party cookies across a consistent group of browsers. The auction seller participants would forward the observed label to buyers to facilitate coordinated testing.

The labels do not affect any functionality in those instances of Chrome, including the availability of third-party cookies. The labels provide the grouping for independent, coordinated experiments, but it's down to the participating parties to enforce the relevant parameters for the experiment. If you're testing the effect of removing third-party cookies, then each participant is responsible for excluding third-party cookie data for browsers with that label.

The aim is to have groups that are representative of normal Chrome traffic. That means both third-party cookies and the PS R&M APIs should be available, though some portion of users may have changed or disabled functionality via settings or extensions.

Labels will generally be persistent throughout browsing, and across Chrome sessions, however this is not guaranteed as there are rare scenarios where entirely resetting the browser may also reset the current label.

We are planning to use 8.5% of Chrome Stable browsers for Mode A, and our initial proposal divides that population into nine groups. The smaller subgroups are intended to allow ad techs flexibility in combining labels to create their own experiments of varying sizes. Groups do not overlap.

Note that the `control_1.*` labels are intended to be used as "Control 1" as outlined in the CMA’s [guidance on industry testing](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing), so testing participants should not use Topics API or run Protected Audiences auctions for this traffic.  As the labels do not affect functionality, participants should not pass observed topics or run Protected Audience auctions when they detect the `control_1.*` group labels.

We welcome [feedback](#feedback) as to whether this selection of groups meets the needs of participating organizations.

<table>
  <tr>
   <th scope="col" style="text-align: left;">Label</th>
   <th scope="col" style="text-align: left;">% of Stable traffic</th>
  </tr>
  <tr>
   <td><code>control_1.1</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>control_1.2</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>control_1.3</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>control_1.4</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>label_only_1</code></td>
   <td style="font-variant-numeric: tabular-nums;">1.5</td>
  </tr>
  <tr>
   <td><code>label_only_2</code></td>
   <td style="font-variant-numeric: tabular-nums;">1.5</td>
  </tr>
  <tr>
   <td><code>label_only_3</code></td>
   <td style="font-variant-numeric: tabular-nums;">1.5</td>
  </tr>
  <tr>
   <td><code>label_only_4</code></td>
   <td style="font-variant-numeric: tabular-nums;">1.5</td>
  </tr>
  <tr>
   <td><code>label_only_5</code></td>
   <td style="font-variant-numeric: tabular-nums;">1.5</td>
  </tr>
</table>

We plan to make the Mode A `label_only_*` browser groups available starting in November 2023, and Mode A `control_1_*`  groups starting in January 2024. We will continue sending all Mode A and Mode B labels until third-party cookie phase-out in Q3 2024.


## Mode B: 1% third-party cookie deprecation {: #mode-b }

We will disable third-party cookies for approximately 1% of Chrome Stable browsers at the beginning of Q1 2024 (and also in Dev, Canary, and Beta browsers during Q4 2023). Organizations testing the PS R&M APIs do not need to opt in for this mode, as it will be applied uniformly across the entire browser population. There is, of course, the possibility that some site features may be impacted if the site hasn't yet adopted an alternative solution, such as [CHIPS](/docs/privacy-sandbox/chips/) or [Related Website Sets](/docs/privacy-sandbox/first-party-sets/).

{% Aside %}

If you rely on third-party cookie data for site functionality, read our [guide to prepare for third-party cookie phase-out](/docs/privacy-sandbox/third-party-cookie-phase-out/) to understand if CHIPS or Related Website Sets can address your needs. We've launched a [public issue tracker](https://goo.gle/report-3pc-broken), where you can report site issues resulting from third-party cookie deprecation. We're working on mitigations to detect, address, and proactively alert site owners of issues that impact user experience during this phase.

{% endAside %}

Additionally, we plan to provide a small fraction of traffic within Mode B that has PS R&M APIs disabled. Other APIs, such as Related Website Sets, CHIPS, and FedCM, will not be disabled. We anticipate that this combination will be helpful to establish a baseline of performance without third-party cookies or the PS R&M APIs.

As part of Mode B we will also provide labels for the affected browsers. The labels will be available at the same time as the APIs are disabled. We're proposing to divide the population into three `treatment_1.*` groups where third-party cookies are disabled, but PS R&M APIs are available, and one `control_2` group where **both** third-party cookies and the PS R&M APIs are disabled.

Mode A continues to run and these groups are distinct from the Mode A groups, as in a user will either be in Mode A, Mode B, or neither. Testing participants should use the `control_1.*` traffic as a control group representing the status quo with third party cookies.

<table>
  <tr>
   <th scope="col" style="text-align: left;">Label</th>
   <th scope="col" style="text-align: left;">% of Stable traffic</th>
  </tr>
  <tr>
   <td><code>treatment_1.1</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>treatment_1.2</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>treatment_1.3</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
  <tr>
   <td><code>control_2</code></td>
   <td style="font-variant-numeric: tabular-nums;">0.25</td>
  </tr>
</table>

As with Mode A, the PS R&M APIs are not guaranteed to be available, as users can disable them from the Chrome **Privacy and security** settings.


## Accessing labels via the Cookie-Deprecation value {: #cookie-deprecation-value}

For the duration of Mode A and Mode B we will be introducing a temporary `Cookie-Deprecation` value accessible via an opt-in HTTP header and JavaScript AP, which willI provide the label for the browser's applicable Mode A or B experiment group (as defined by the percentages above), if it falls into one. We will remove this value when the experiment ends.

Accessing labels involves accessing information stored on the user’s device. In some jurisdictions (e.g., the EU and UK), we understand that this activity is analogous to the use of cookies and thus accessing labels likely requires end user consent. Before you begin requesting labels, we recommend that you seek legal advice as to whether this consent obligation applies to you.

{% Aside %}

As with all features we ship in Chromium, we have sent an [Intent to Prototype (I2P)](https://groups.google.com/a/chromium.org/g/blink-dev/c/8mlWTOcEzcA/) as part of [the Blink development process](/docs/privacy-sandbox/proposal-lifecycle/). The implementation details below are what we are proposing, but these **may change before we ship the feature** in Chrome Stable. We will continue to update this documentation and you can also follow the public discussion when the Intents are posted to the [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev).

{% endAside %}


### Accessing the Sec-Cookie-Deprecation HTTP header {: #cookie-deprecation-header}

To receive the Sec-`Cookie-Deprecation` request header, a site must first set the `receive-cookie-deprecation` cookie. This cookie must use the [`Partitioned` attribute](/docs/privacy-sandbox/chips/), which means that opt-in for receiving the header must be done per top-level site.

For example, if `3p-example.site` wants to receive the `Sec-Cookie-Deprecation` header on its resources embedded on `example.com`, then `3p-example.site` must set the following cookie in that context.

```text
Set-Cookie: receive-cookie-deprecation=1; Secure; HttpOnly; Path=/; SameSite=None; Partitioned;
```

The `Secure`, `HttpOnly`, `SameSite`, and `Partitioned` cookie attributes are mandatory. The other attributes: `Domain`, Path (though Path=/ is a good default), `Expires`, and `Max-Age` may be set as best suits your needs.

Assuming the browser was in the `example_label_1 group`, subsequent requests which include this cookie would also include the `Sec-Cookie-Deprecation` header.


```text
Sec-Cookie-Deprecation: example_label_1
```

If the browser is not part of a group, no header will be sent.

Labels are tied to the presence of the cookie, so if the cookie is deleted, blocked entirely, or blocked for the specific site, then labels will not be sent. As the `Partitioned` attribute is intended for continued use after third-party cookies are fully deprecated, this means `Partitioned` cookies may be set when third-party cookies are blocked.


### Accessing the cookieDeprecationLabel JavaScript API {: #cookie-deprecation-js}

The `Cookie-Deprecation` value can also be accessed via the `navigator.cookieDeprecationLabel.getValue()` JavaScript API. This will return a promise which resolves to a string containing the applicable group label. For example, if the browser was in the `example_label_1` group:

```js
// Feature detect temporary API first
if ('cookieDeprecationLabel' in navigator) {
  // Request value and resolve promise
  navigator.cookieDeprecationLabel.getValue().then((label) => {
    console.log(label);
    // Expected output: "example_label_1"
  });
}
```

If the browser is not part of a group, the API will either not be available or the value will be an empty string, so ensure you do feature detection.

The JavaScript API may be called regardless of the presence of the `receive-cookie-deprecation` cookie. However, if cookies are blocked completely or specifically for the site, the API will again either not be available or return an empty string.

As with any client provided value, ensure that you sanitize and validate the value from the header or the JavaScript API before use.


## Feedback

We use the ["chrome-testing"](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) label in the developer support repo on GitHub to manage questions. We welcome your feedback and discussion on the initial questions:

*   [Are you planning to test using Mode A, Mode B, or both?](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
*   [Picking label sizes for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
*   [Use of Client Hints for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

You can also [raise new questions or discussions](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose) in the repo using the "Chrome-facilitated testing" template.
