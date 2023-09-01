---
layout: 'layouts/doc-post.njk'
title: 'Chrome-facilitated testing'
subhead: >
  Test your sites with third-party cookies disabled.
description: >
  Test your sites with third-party cookies disabled.
date: 2023-05-18
updated: 2023-09-01
authors:
  - alexandrawhite
  - rowan_m
---

To prepare for third-party cookie deprecation, we will be providing Chrome-facilitated testing modes that allow sites to preview how site behavior and functionality works without third-party cookies. This post provides an overview of the testing modes Chrome plans to provide and how to access experiment group labels.

{% Aside %}

This testing focuses on measuring the performance of the Privacy Sandbox relevance and measurement APIs (PS R&M APIs): Attribution Reporting, Protected Audience, Topics, Private Aggregation, Shared Storage, and Fenced Frames.

{% endAside %}

We have worked with the CMA to ensure these testing modes align with the
testing framework (and timeline) for third parties laid out in its
[guidance on industry testing](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing).
As a result, the CMA anticipates that the results from testing in these modes
can be used in its assessment of the Privacy Sandbox. 

We plan to have two modes of Chrome-facilitated testing:

* **Mode A**: Ad techs can receive control and experiment labels on a portion
  of traffic and use these to conduct testing and experiments.
* **Mode B**: Chrome globally disables third-party cookies for some portion of
  all Chrome users.

{% Aside %}

Labels will be available via the temporary cookie-deprecation value which can be accessed via an HTTP header or JavaScript API. See the later section [Accessing labels via the cookie-deprecation value](#cookie-deprecation-value) for implementation details.

{% endAside %}

Some of the precise details of the composition and size of the groups within the modes are not final, however they will be in line with the treatment and control groups defined in the CMA’s testing guidance and we will publish further implementation guidance in Q3 2023. The current proposals are as follows.

## Mode A: Opt-in testing {: #mode-a }

Ad techs will be able to receive labels for experimental treatment and control groups for a portion of Chrome
traffic. An ad tech can choose to coordinate with other ad techs, for example,
to run [Protected Audience](/docs/privacy-sandbox/protected-audience/) auctions without
third-party cookies for a consistent experiment group. Ad techs can also use
these labels for their own independent experiments and testing. 

Chrome will not modify the state of third-party cookies for users in Mode A.
Chrome only provides the labels, as to ensure that ad techs can experiment with
consistent control and experiment groups. This means that a publisher's site
could still receive third-party cookie data for the publisher's own usage, even
if their ad tech partners are participating in the experiment.

We expect this to allow for meaningful experimentation, where all involved
sites and services can coordinate to ensure third-party cookies are not used at
any point within the process. We anticipate providing labels for up to 9% of
Chrome browsers. We
encourage anyone interested in testing to provide
[feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)
from the ecosystem on the method for accessing labels and the granularity of
labels.

We plan to make the opt-in testing mode available starting in Q4 2023, and
we'll continue this mode until third-party cookie deprecation.

## Mode B: 1% third-party cookie deprecation {: #mode-b }

Chrome will deprecate third-party cookies for up to 1% of browsers. There is no
opt-in for this mode, as it will be applied globally. There is, of
course, the possibility that some site features may be impacted if the site
hasn't yet adopted an alternative solution, such as
[CHIPS](/docs/privacy-sandbox/chips/) or
[First-Party Sets](/docs/privacy-sandbox/first-party-sets/). 

{% Aside %}

If you rely on third-party cookie data for site functionality, read our
[guide to prepare for third-party cookie phase-out](/docs/privacy-sandbox/third-party-cookie-phase-out/)
to understand if CHIPS or First-Party Sets can address your needs. We've
launched a [public issue tracker](https://goo.gle/report-3pc-broken), where you
can report site issues resulting from third-party cookie deprecation. 

{% endAside %}

We're working on mitigations to detect, address, and proactively alert site
owners of issues that impact user experience during this phase.

Additionally, we plan to provide a small fraction of traffic within Mode B that also
has Privacy Sandbox relevance and measurement APIs disabled. Other APIs, like
First-Party Sets, CHIPS, FedCM, and so on, will not be disabled. We anticipate
that this combination will be helpful to establish a baseline of
performance without third-party cookies, and we're seeking
[feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) on
an appropriate fraction of traffic to devote to this subset of testing.

We plan to deprecate 1% of third party cookies in Q1 2024, and we'll work
closely with the CMA before taking further steps to expand deprecation.

## Accessing labels via the `Cookie-Deprecation` value {: #cookie-deprecation-value}

For the duration of Mode A and Mode B we will be introducing a temporary `Cookie-Deprecation` value accessible via an opt-in HTTP header and JavaScript API provide the label for the browser's applicable Mode A or B experiment group (as defined by the percentages above), if it falls into one. We will remove this value when the experiment ends.

Accessing labels involves accessing information stored on the user’s device. In some jurisdictions (e.g., the EU and UK), we understand that this activity is analogous to the use of cookies and thus accessing labels likely requires end user consent. Before you begin requesting labels, we recommend that you seek legal advice as to whether this consent obligation applies to you.

{% Aside %}

As with all features we ship in Chromium, we will send an [Intent to Prototype as part of the Blink development process](/docs/privacy-sandbox/proposal-lifecycle/). The implementation details below are what we are proposing, but these **may change before we ship the feature** in Chrome Stable. We will continue to update this documentation and you can also follow the public discussion when the Intents are posted to the [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev).

{% endAside %}

### Accessing the `Sec-Cookie-Deprecation` HTTP header

To receive the `Sec-Cookie-Deprecation` request header, the site must first set the `receive-cookie-deprecation` cookie. This cookie must use the <code>[Partitioned attribute](/docs/privacy-sandbox/chips/)</code>, which means that opt-in for receiving the header must be done per top-level site.

For example, if `3p-example.site` wants to receive the `Sec-Cookie-Deprecation` header on its resources embedded on `example.com`, then `3p-example.site` must set the following cookie in that context.

```text
Set-Cookie: receive-cookie-deprecation=1; Secure; HttpOnly; Path=/; SameSite=None; Partitioned;
```

The `Secure`, `HttpOnly`, `Path`, `SameSite`, and `Partitioned` cookie attributes are mandatory. The other attributes: `Domain`, `Expires`, and `Max-Age` may be set as best suits your needs.

Assuming the browser was in the `example_label_1 group`, subsequent requests which include this cookie would also include the `Sec-Cookie-Deprecation` header.

```text
Sec-Cookie-Deprecation: example_label_1
```

If the browser is not part of a group, no header will be sent.

As labels are tied to the presence of the cookie, if the cookie is deleted, labels will also no longer be sent. As the `Partitioned` attribute is intended for continued use after third-party cookies are fully deprecated, this means `Partitioned` cookies may be set when third-party cookies are blocked.


### Accessing the cookieDeprecationLabel JavaScript API

The `Cookie-Deprecation` value can also be accessed via the `navigator.cookieDeprecationLabel.getValue()` JavaScript API. This will return a promise which resolves to a string containing the applicable group label. For example, if the browser was in the `example_label_1`:

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

If the browser is not part of a group, then the value will be `null`.

The JavaScript API may be called regardless of the presence of the `receive-cookie-deprecation` cookie.

## Feedback

Feedback from a diverse set of stakeholders across the web ecosystem is critical to the Privacy Sandbox initiative. The dedicated [feedback section](/docs/privacy-sandbox/feedback/) provides an overview of the existing public channels, where you can follow or contribute to discussion, along with a feedback form to ensure you can always reach the Chrome team directly.

We use the ["chrome-testing"](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) label in the developer support repo on GitHub to manage questions. We welcome your feedback and discussion on the initial questions:

*   [Are you planning to test using Mode A, Mode B, or both?](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
*   [Picking label sizes for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
*   [Use of Client Hints for Chrome-facilitated testing](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

You can also [raise new questions or discussions](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose) in the repo using the "Chrome-facilitated testing" template.

{% Aside %}

The [Competition and Markets Authority (CMA)](https://www.gov.uk/government/organisations/competition-and-markets-authority) has published their [guidance on testing Privacy Sandbox APIs](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing) with relevant information on timelines, approaches to testing, and next steps.

{% endAside %}