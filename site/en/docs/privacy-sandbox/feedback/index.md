---
layout: layouts/doc-post.njk
title: Feedback
subhead: >
  Where and how to provide feedback for Privacy Sandbox proposals throughout the development process.
description: >
  Where and how to provide feedback for Privacy Sandbox proposals throughout the development process.
date: 2022-02-28
updated: 2022-07-27
authors:
  - rowan_m
---

Getting feedback from a diverse set of stakeholders across the web ecosystem is
critical to the Privacy Sandbox initiative. Here you’ll find explanations of the
many public channels that inform development, and guidance on how individuals
and organizations can provide feedback at every stage. Chrome product managers
and engineers actively engage with this feedback, and there are hundreds of
industry representatives already participating.

There are many feedback channels available to you. Individual interactions are
public in most cases, which means you can follow along in discussions and decide
where you want to contribute. There is also a **[feedback
form](#feedback-form)**, which provides the opportunity for stakeholders to
share feedback directly to the Chrome team outside of public forums. Feedback
received through the feedback form may be aggregated for inclusion in the Chrome
team’s public reports, without attribution.

## How will you know feedback has been considered?  {: #reports}

Regular updates for each Privacy Sandbox API are published on this site. In
particular, these updates will cover a summary of common feedback themes per
API.

 * [Feedback report for 2023 Q1](/docs/privacy-sandbox/feedback/report-2023-q1/)
 * [Feedback report for 2022 Q4](/docs/privacy-sandbox/feedback/report-2022-q4/)
 * [Feedback report for 2022 Q3](/docs/privacy-sandbox/feedback/report-2022-q3/)
 * [Feedback report for 2022 Q2](/docs/privacy-sandbox/feedback/report-2022-q2/)
 * [Feedback report for 2022 Q1](/docs/privacy-sandbox/feedback/report-2022-q1/)

While public feedback channels are preferred, both public (e.g., GitHub) and
direct (e.g., feedback form) channels do exist, and the Chrome team will explain
whether and how feedback and concerns arising from stakeholder engagement are
being incorporated into the design and development of each API.


## Feedback routes

{% Details %} {% DetailsSummary %}

### Collaborate on individual proposals {: #proposal-feedback}

**_Every Privacy Sandbox proposal is open to public discussion, where proposal
authors and web stakeholders collaborate to answer open questions and clarify
implementation details before features are finalized._**

{% endDetailsSummary %}

A proposal begins with an explainer—a high-level technical overview of a
proposed specification's functionality. Explainers are posted to start the
feedback process, as there are always open questions and details that need
clarification. This collaborative process is ongoing through the lifecycle of
the proposal from early discussion of the idea through to iterating on revisions
of a formal specification.

{% Aside %}

You can see this pattern of a high-level overview and open questions in the
[Topics API explainer](https://github.com/jkarlin/topics).

{% endAside %}

The explainers and supporting content are hosted on GitHub. GitHub enables
anyone with a GitHub account to raise an Issue (ask questions or add comments)
in the repository (repo) to start or participate in a discussion. Proposal
authors, including Chrome product managers and engineers, are active in these
discussions and GitHub provides options to be alerted for any new activity. With
GitHub feedback, you can engage directly with the community interested in a
specific proposal. Even without a GitHub account, you can still read all the
community commentary for each proposal.

Discussion in the repository should be focused on how and why the proposal
addresses the use case it sets out to solve. You can find the link to view and
raise an issue for each proposal in the **Feedback** column of the tables in the
[**Proposals** section](#proposals).

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Track and respond to Chromium feature development

**_Every stage of feature development is announced to a public mailing list,
which encourages further discussion of technical implementation._**

{% endDetailsSummary %}

Each proposal may result in one or more features to build in Chromium. Proposal
developers submit requests to begin each stage of feature development on the
[public `blink-dev` mailing
list](https://groups.google.com/a/chromium.org/g/blink-dev). [These stages
include](https://blog.chromium.org/2019/11/intent-to-explain-demystifying-blink.html):
Intent to Prototype (I2P), Intent to Experiment (I2E), Intent to Ship (I2S), or
Intent to Remove (I2R).

*   **Intent to Prototype (I2P):** the developer would like to begin an initial
    implementation in Chromium. This often results in early functionality being
    available for developer testing. Useful feedback at this stage is likely
    best suited to GitHub as the aim at this stage is to validate proposal ideas
    with working code.
*   **Intent to Experiment (I2E):** the developer would like to run scaled
    testing in the form of an origin trial. This allows sites to test early
    functionality on a portion of their own traffic. Useful feedback at this
    stage includes stating willingness to participate and if the proposed
    experiment meets your needs to validate behavior.
*   **Intent to Ship (I2S)**: the developer would like to deploy the completed
    feature to Chromium. This results in the functionality being available for
    all users. Useful feedback at this stage addresses outstanding issues to
    ensure the feature is ready for general availability.
*   **Intent to Remove (I2R)**: the developer would like to deprecate and remove
    functionality from Chromium. Useful feedback here includes highlighting if
    this removal impacts your use case in ways not captured by the development
    team.

Each stage has a standard template where the developer will provide a selection
of relevant information. Certain stages require approval from Chromium project
owners who will do this by providing a "Looks Good To Me" (LGTM) response on the
post.

The mailing list is open to the public so you can follow along with the
discussion on each milestone and join the list to ask additional questions.
There is a high-level of activity on this list as it covers all functionality
landing in the Chromium project, so you may wish to [track individual features
on the Chrome Status](https://chromestatus.com/features) site.

Discussion on these threads should focus on the specifics of implementing the
particular feature in Chromium; discussion on how the proposal itself functions
[is best suited for GitHub](#proposal-feedback). You can find a link to view and
contribute to each of these announcements in the **Intents** column in the
tables in the [**Proposals** section](#proposals).

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Track and discuss individual feature development

**_Specific mailing lists may be created as proposal implementation progresses,
to allow for more focused discussion._**

{% endDetailsSummary %}

As individual proposals progress through implementation in Chromium, a
proposal-specific mailing list may be created to allow for focused
communication.

This allows for announcements and discussion of origin trial updates, necessary
code updates , or known issues that may impact development. As with `blink-dev`,
these lists are public. If you are directly tracking or working on one of these
proposals, you should join the specific list to hear updates directly from the
development teams.

Discussions on these threads should be focused on the ongoing implementation
detail in Chromium as the intended audience is developers directly coding
against the feature, as opposed to a general audience interested in broad
announcements. You can find a link to read and contribute to these in the
**Mailing list** column in the tables in the [**Proposals**
section](#proposals).

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Raise and track feature issues

**_As implementation continues, issues with the feature behavior can be raised
in the Chromium issue tracker._**

{% endDetailsSummary %}

This includes implementation bugs where Chromium's behavior does not match the
proposed specification, but can also cover browser-specific functionality such
as how the feature interacts with DevTools and user preferences, or it may just
be to report an error. Issues can be raised at any point in the lifecycle of a
Chromium feature, whether that's newly available for developer testing behind a
flag or something discovered in a stable release.

Discussion in Chromium issues should be focused on the details of the envisaged
implementation of the feature in Chromium; discussion on how the proposal itself
functions [should go to GitHub](#proposal-feedback). You can find a link to view
or raise issues in the **Chromium component** column of the tables in the
[**Proposals** section](#proposals).

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Follow and participate in standards bodies

**_The [World Wide Web Consortium (W3C)](https://www.w3.org/) and [Internet
Engineering Task Force (IETF)](https://www.ietf.org/) develop open standards for
all web platforms. They encourage interested parties to discuss and learn about
individual standards as well as the web ecosystem at-large._**

{% endDetailsSummary %}

The W3C and IETF are international communities that develop open standards for
the web and the Internet to ensure the long term growth of these open platforms.
New web platform technologies, like Privacy Sandbox technologies, are proposed
and discussed in various forums across these standards bodies. These forums are
open to anyone who wants to actively participate in the design and development
of the technologies.

Each standards body offers any interested party a variety of different
membership and contribution options. There are Community Groups and Business
Groups which include members from across the web ecosystem and relevant
industries. Proposal authors will often present overviews and progress updates
at associated meetings, providing an opportunity to ask direct questions and
hear from other stakeholders. Meeting minutes for most groups are publicly
available.

Discussion in standards bodies is wide-ranging, but generally focuses on how a
proposal meets the needs of the ecosystem and its progress towards becoming an
accepted standard. You can find a link to follow or join in the **Standards
groups** column of the tables in the [**Proposals** section](#proposals).

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Submit feedback through the feedback form {: #feedback-form}

**_Not all issues fit neatly into the above categories. While these routes are
the best way to start a public dialogue with the most relevant people, the
feedback form is there to ensure you can always reach the Chrome team
directly._**

{% endDetailsSummary %}

This form may be the right place if you want to know:

*   How particular situations may be affected by multiple proposals;
*   If your use case is covered by a proposal.

While this is an opportunity for stakeholders to share feedback to the Chrome
team directly, the themes or issues in your feedback may be aggregated for
inclusion in the Chrome team’s public reports, without attribution.

{% endDetails %}

{% Aside %}

You can [**submit feedback using the feedback
form**](https://goo.gle/privacy-sandbox-feedback).

{% endAside %}

## Proposals

### Key

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td>Open discussions on the individual proposal
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td>Announcement messages for each stage of Chromium feature development
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td>Open issues related to Chromium feature implementations
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>Developer announcements and discussion for in-progress Chromium features
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td>W3C or IETF groups where individual proposals are discussed
   </td>
  </tr>
</table>

### Fight spam and fraud on the web

#### Trust Token API

_Trust Tokens enables a site to share small amounts of information, like
signaling a user is genuine, to another site without allowing cross-site
tracking. [Learn more about the Trust Token
API](/docs/privacy-sandbox/trust-tokens/)_

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/trust-token-api/issues">WICG/trust-token-api</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/fpfbKgJF8Vc/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_Ayi6SD8yRs/">I2E 2021/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/UIvia1WwIhk/">I2E 2020/05</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/X9sF2uLe9rA/">I2P 2019/10</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ETrustTokens">Internals>Network>TrustTokens</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://datatracker.ietf.org/rg/pearg/about/">Privacy Enhancements and Assessments Research Group (pearg)</a>
   </td>
  </tr>
</table>

### Show relevant content and ads

#### Topics API

_Topics enable interest-based advertising, without resorting to tracking the
sites a user visits. [Learn more about the Topics
API](/docs/privacy-sandbox/topics/)._

**_Last updated 2022/03: Topics is preparing for origin trial_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/jkarlin/topics/issues">jkarlin/topics</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/59uTw_dxM3M/">I2P 2022/02</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td>[to come]
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/topics-api-announce/">topics-api-announce</a>
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

#### FLoC API

_FLoC provided a high-level view of a user's interests by grouping them in
cohorts with thousands of similar browsers. [Learn more about
FLoC](/docs/privacy-sandbox/floc/)._

**_Last updated 2022/02: FLoC has been superseded by the Topics API, links are for
historical reference_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/floc/issues">WICG/floc</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs/">I2E 2021/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DpZZG5K1PWs/">I2P 2020/05</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestCohort">Blink>InterestCohort</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

#### Protected Audience API

_The Protected Audience API enables remarketing and custom audience use cases, as in advertising
that can make use of sites or products previously visited, but without relying
on an individual identifier. [Learn more about the Protected Audience API](/docs/privacy-sandbox/fledge/)._

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

**_Last updated 2022/03: FLEDGE is preparing for origin trial_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/turtledove/issues">WICG/turtledove</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/">I2P 2021/03</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups">Blink>InterestGroups</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/fledge-api-announce">fledge-api-announce</a>
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

### Measure digital ads

#### Event-level reports in the Attribution Reporting API

_Event-level reports allow sites to measure when a user action, such as an ad
click or view, leads to a conversion, but without using cross-site identifiers.
[Learn more about the Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)._

**_Last updated 2022/03: Attribution Reporting is preparing for an additional
origin trial_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/conversion-measurement-api/issues">WICG/conversion-measurement-api</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/DmsUL3KHqMk/">I2E 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/xCWP1ltlAgw/">I2E 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/C0P7ePjITJQ/">I2E 2021/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/Ib9-tDFitns/">I2E 2020/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/7B0ldtZR_68/">I2P 2019/10</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3EConversionMeasurement">Internals>ConversionMeasurement</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev">attribution-reporting-api-dev</a>
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

#### Summary reports in the Attribution Reporting API

_Summary reports allow for an aggregated view of detailed conversion data, which
retains critical information for reporting without the ability to identify
individual users within that data. [Learn more about the Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)._

**_Last updated 2022/03: Attribution Reporting is preparing for an additional
origin trial_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/conversion-measurement-api/issues">WICG/conversion-measurement-api</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2zA5-TuVSkA/">I2P 2021/08</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3EConversionMeasurement">Internals>ConversionMeasurement</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev">attribution-reporting-api-dev</a>
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

### Strengthen cross-site privacy boundaries

#### First-Party Sets API

_First-Party Sets allows related sites, owned and operated by the same entity,
to declare themselves as belonging to the same first-party. [Learn more about
First-Party Sets](/docs/privacy-sandbox/first-party-sets/)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/privacycg/first-party-sets/issues">privacycg/first-party-sets</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/nNdY-qOScBc/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/XkWbQKrBzMg/">I2E 2021/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-unZxHbw8Pc/">I2P 2021/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0EMGi-xbI-8/">I2P 2020/08</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3EFirst-Party-Sets">Internals>Network>First-Party-Sets</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a>
   </td>
  </tr>
</table>

#### Shared Storage API

_Shared Storage allows sites to store unpartitioned cross-site data, but only
read that data in specifically controlled ways. This facilitates several use
cases, such as consistent A/B experiments across sites. [Learn more about the
Shared Storage API](https://github.com/pythagoraskitty/shared-storage/)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/pythagoraskitty/shared-storage/issues">pythagoraskitty/shared-storage</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_quChIvPzT8/">I2P 2021/06</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EStorage%3ESharedStorage">Blink>Storage>SharedStorage</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

#### Cookies Having Independent Partitioned State (CHIPS)

_CHIPS allows sites to opt-in a cookie to "partitioned" storage, with a separate
cookie jar per top-level site. [Learn more about
CHIPS](/docs/privacy-sandbox/chips/)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/WICG/CHIPS/issues">WICG/CHIPS</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U/">I2E2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo/">I2P 07/2021</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECookies">Internals>Network>Cookies</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/wicg/">Web Platform Incubator Community Group (WICG)</a>
   </td>
  </tr>
</table>

#### Storage Partitioning

_Storage partitioning brings other existing storage and communication methods
inline with the proposed cookie changes by creating separate containers for
storage per top-level site. [Learn more about Storage
Partitioning](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/wanderview/quota-storage-partitioning/issues">wanderview/quota-storage-partitioning</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/WXNzM0WiQ-s/">I2P 2021/05</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EStorage">Blink>Storage</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a>
   </td>
  </tr>
</table>

#### HTTP Cache Partitioning

_The HTTP cache previously provided a single point where it was possible for one
site to determine if its resources had been loading another—effectively leaking
cross-site information. Partitioning the cache ensures that activity is
restricted to a single site. [Learn more about HTTP Cache
Partitioning](/blog/http-cache-partitioning/)._

**_Last updated 2022/02: HTTP cache partitioning has fully shipped_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/shivanigithub/http-cache-partitioning/issues">shivanigithub/http-cache-partitioning</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/NUR-gpWxSZ4/">I2S 2020/10</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KKXv1PqPZ0/">I2P 2019/07</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECache">Internals>Network>Cache</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://whatwg.org/">Web Hypertext Application Technology Working Group (WHATWG)</a>
   </td>
  </tr>
</table>

#### Network State Partitioning

_Network State Partitioning continues the pattern implemented in HTTP Cache
Partitioning by creating finer-grained containers for caches, preventing
cross-site information leakage. [Learn more about Network State
Partitioning](https://github.com/MattMenke2/Explainer---Partition-Network-State)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/MattMenke2/Explainer---Partition-Network-State/issues">MattMenke2/Explainer---Partition-Network-State</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/tJa6uzXu_IA/">I2S 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/sLC_W6B8big/">I2E 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KKXv1PqPZ0/">I2P 2019/07</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork">Internals>Network</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://whatwg.org/">Web Hypertext Application Technology Working Group (WHATWG)</a>
   </td>
  </tr>
</table>

#### Fenced Frames

_Fenced frames enforce a boundary between a page and embedded content which can
allow safe access to unpartitioned data without allowing cross-site tracking.
[Learn more about Fenced
Frames](https://github.com/shivanigithub/fenced-frame)._

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/shivanigithub/fenced-frame/issues">shivanigithub/fenced-frame</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/">I2P 2021/04</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EFencedFrames">Blink>FencedFrames</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/web-adv/participants">Improving Web Advertising Business Group</a>
   </td>
  </tr>
</table>

#### Federated Credentials Management (FedCM)

_The Federated Credentials Management API builds on existing identity provider
use cases to allow new and existing federated identity use cases to continue
without third-party cookies. [Learn more about Federated Credentials
Management](https://github.com/fedidcg/FedCM)._

**_Last updated 2022/03_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/fedidcg/FedCM/issues">fedidcg/FedCM</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/kws-gltC5us/">I2E 2022/03</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jlV_1m7uUAg/">I2E 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2B4TJ7j2U4M/">I2P 2020/09</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EIdentity%3EFedCM">Blink>Identity>FedCM</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/fed-id/">Federated Identity Community Group</a>
   </td>
  </tr>
</table>

### Prevent covert tracking

#### SameSite Lax by default cookies

_"SameSite Lax by default" was a specification change which made all cookies
first-party (or same-site) by default. This also required sites to explicitly
mark their cookies for third-party (or cross-site) usage. [Learn more about
SameSite cookies](https://web.dev/samesite-cookies-explained/)._

**_Last updated 2022/02: SameSite=Lax by default has fully shipped_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/mikewest/cookie-incrementalism/issues">mikewest/cookie-incrementalism</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/O_uF2FBXacA/">I2S 2019/08</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/6KhRNH3PrvU/">I2R 08/2019</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/AknSSyQTGYs/">I2P+I2S 2019/05</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3ECookies">Internals>Network>Cookies</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://datatracker.ietf.org/group/httpstate/about/">HTTP State Management Mechanism (httpstate)</a>
   </td>
  </tr>
</table>

#### DNS-over-HTTPS

_DNS-over-HTTPS ensures that the sites visited by the browser are not visible to
observers on the same network. [Learn more about
DNS-over-HTTPS](https://blog.chromium.org/2020/05/a-safer-and-more-private-browsing-DoH.html)._

**_Last updated 2022/02: DNS-over-HTTPS has shipped for all platforms_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/net-dev">net-dev</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td>[n/a]
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Internals%3ENetwork%3EDoH">Internals>Network>DoH</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/net-dev">net-dev</a>
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://datatracker.ietf.org/group/doh/about/">DNS Over HTTPS (doh)</a>
   </td>
  </tr>
</table>

#### User-Agent reduction and User-Agent Client Hints

_Chrome is reducing the amount of information exposed by default in its
user-agent string which limits the potential for covert tracking. User-Agent
Client Hints allows sites to receive this information on-request with a clean
and auditable API. [Learn more about the User-Agent reduction and User-Agent
Client Hints (UA-CH)](/docs/privacy-sandbox/user-agent/)._

**_Note: Overall work has shipped incrementally as a number of individual
features resulting in more Intent messages._**

**_Last updated 2022/02_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><ul>

<li>User-Agent Client Hints: <a href="https://github.com/WICG/ua-client-hints/issues">WICG/ua-client-hints</a>
<li>Client Hints overall: <a href="https://github.com/WICG/client-hints-infrastructure/issues">WICG/client-hints-infrastructure</a>
<li>Reducing the user-agent string: <a href="https://github.com/abeyad/user-agent-reduction/issues">abeyad/user-agent-reduction</a></li></ul>

   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/">I2S 2022/02</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/G-ouYoNY9Hs/">I2E 2022/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-2OW78CB1-A/">I2E 2022/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU/">I2S 2021/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oDU_uaDTLic/">I2P 2021/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/yZh8Lwr34Ro/">I2S 2021/11</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/2V3kubJSOU0">I2P 2021/11</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/FTNrw03Xs9s/">I2P 2021/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/R0xKm1B7qoQ/">I2E 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/r0kcHYoK79U/">I2P 2021/07</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/dafizBGwWMw/">I2P 2021/04</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/t-S9nnos9qU/">I2R 2020/12</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/zPYGbULXn7o/">I2P 2020/09</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/">I2R 2020/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/A4wxFpvqUfA/">I2S 2020/01</a>, <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/WQ0eC_Gf8bw">I2P 2019/01</a>
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3ENetwork%3EClientHints">Blink>Network>ClientHints</a>
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/community/wicg/">Web Platform Incubator Community Group (WICG)</a>
   </td>
  </tr>
</table>

#### Bounce tracking mitigations

_Reduce or eliminate the ability of bounce tracking to recognize people across contexts. [Learn more about bounce tracking mitigations](/docs/privacy-sandbox/bounce-tracking-mitigations/)._

<table class="width-full">
  <tr>
    <td><strong>Feedback</strong></td>
    <td><a href="https://github.com/privacycg/nav-tracking-mitigations/issues">privacycg/nav-tracking-mitigations</a></td>
  </tr>
  <tr>
    <td><strong>Intents</strong></td>
    <td><a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/vwQ2x1lByqc/m/re5WEH84CAAJ">I2P 2022/09</a></td>
  </tr>
  <tr>
    <td><strong>Chromium component</strong></td>
    <td><a href="https://bugs.chromium.org/p/chromium/issues/list?q=component:Privacy%3ENavTracking">Privacy>NavTracking</a></td>
  </tr>
  <tr>
    <td><strong>Mailing list</strong></td>
    <td>[optional]</td>
  </tr>
    <tr>
    <td><strong>Standards groups</strong></td>
    <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a></td>
  </tr>
</table>

#### Gnatcatcher

_Gnatcatcher explores methods to mask a user's IP address from sites. Masking
can reduce a major tracking signal while still retaining core functionality that
requires the IP address. [Learn more about
Gnatcatcher](https://github.com/bslassey/ip-blindness)._

**_Last updated 2022/02: The initial Privacy Budget proposal is still in early
discussion_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/bslassey/ip-blindness/issues">bslassey/ip-blindness</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td>[to come]
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td>[to come]
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://datatracker.ietf.org/wg/masque/about/">Multiplexed Application Substrate over QUIC Encryption (masque)</a>
   </td>
  </tr>
</table>

#### Privacy Budget

_The Privacy Budget explores how a browser could detect the amount of
identifying information available to a site, then allow the browser to take
action before too much data is collected. [Learn more about Privacy
Budget](https://github.com/bslassey/privacy-budget)._

**_Last updated 2022/02: The initial Privacy Budget proposal is still in early
discussion_**

<table class="width-full">
  <tr>
   <td><strong>Feedback</strong>
   </td>
   <td><a href="https://github.com/bslassey/privacy-budget/issues">bslassey/privacy-budget</a>
   </td>
  </tr>
  <tr>
   <td><strong>Intents</strong>
   </td>
   <td>[to come]
   </td>
  </tr>
  <tr>
   <td><strong>Chromium component</strong>
   </td>
   <td>[to come]
   </td>
  </tr>
  <tr>
   <td><strong>Mailing list</strong>
   </td>
   <td>[optional]
   </td>
  </tr>
  <tr>
   <td><strong>Standards groups</strong>
   </td>
   <td><a href="https://www.w3.org/groups/cg/privacycg">Privacy Community Group</a>
   </td>
  </tr>
</table>
