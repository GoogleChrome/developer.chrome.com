---
layout: layouts/doc-post.njk
title: Feedback
subhead: >
  Where and how to provide feedback for Privacy Sandbox proposals throughout the development process.
description: >
  Where and how to provide feedback for Privacy Sandbox proposals throughout the development process.
date: 2022-02-28
updated: 2023-06-05
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

 * [Feedback report for 2023 Q2](/docs/privacy-sandbox/feedback/report-2023-q2/)
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

### Chrome-facilated testing

**_We are seeking feedback on the [Chrome-faciliated testing plans](/docs/privacy-sandbox/chrome-testing/) along with tracking issues from initial third-party cookie deprecation._**

{% endDetailsSummary %}

If you rely on third-party cookie data for site functionality, you can now report site issues resulting from third-party cookie deprecation in the [public issue tracker](https://goo.gle/report-3pc-broken).

Additionally, Chrome will deprecate 1% of third party cookies in Q1 2024, and we'll work closely with the CMA before taking further steps to expand deprecation. You can provide [feedback on GitHub](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) as to the appropriate fraction of traffic to devote to this subset of [Chrome-facilitated testing](/docs/privacy-sandbox/chrome-testing/).

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

Feedback and discussion options for individual Privacy Sandbox proposals can be found in the [API status and feature releases](/docs/privacy-sandbox/status/).
