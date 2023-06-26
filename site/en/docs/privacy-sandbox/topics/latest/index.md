---
layout: 'layouts/doc-post.njk'
title: 'Topics API latest updates'
subhead: >
 Updates and enhancements to the design and implementation of the API.
description: >
 Updates and enhancements to the design and implementation of the API.
date: 2023-01-24
authors:
 - leeronisrael
 - joeytrotz
---

{% Aside %}

For technical resources, see the developer guides:

* [Web platform](/docs/privacy-sandbox/topics/)
* [Android](https://developer.android.com/design-for-safety/privacy-sandbox/guides/topics)

For a non-technical introduction, see the [Topics overview on privacysandbox.com](https://privacysandbox.com/intl/en_us/proposals/topics/).

{% endAside %}

## New taxonomy and expanding support for headers

**June 15, 2023**

**Taxonomy** - The Topics taxonomy has been [expanded and improved](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md). We've added 280 commercially focused categories, like "Athletic Apparel", "Mattresses", and "Luxury Travel," while removing 160 categories including topics such as "Civil Engineering" and "Equestrian". Chrome will begin using the new taxonomy later this year, but you can take a look and provide feedback.

**Request headers** - The initial topics proposal required developers to call `document.browsingTopics()` from a cross-origin iframe. We received feedback that this requirement would introduce latency that could pose challenges in digital ad auctions and potentially slow down web pages. Last year, we announced support for Topics via headers, in requests initiated via fetch and (temporarily) XHR. Recently, we announced that we plan to extend support to request headers for iframes that include a `browsingtopics` attribute. These changes will improve the performance of Topics, and limit potential negative impacts on developers and users.

**Observing ancestor topics** - Chrome has updated the definition of "observation" to include all ancestors of a given topic. Now, if a caller observes `/Shopping/Apparel/Footwear/Boots`, they will observe Boots, but also Shopping, Apparel, and Footwear. Previously, in order for a caller to observe Shopping, Apparel, or Footwear, a caller must have observed a user visit a page with that topic.

For more information on these and upcoming changes, refer to [Enhancements to the Topics API](/blog/topics-enhancements/).

## Chrome’s commitment to Topics

**January 24, 2023**

Following the W3C Technical Architecture Group’s initial design review of Topics, we’ve received some questions from ecosystem stakeholders about what this means for the Topics API.  

As we [noted on Twitter](https://twitter.com/vkw/status/1614001374873944066?s=20&t=BAGWkeoOEwq4yex_JpDNDw), we want to affirm our commitment to make the Topics API available in Chrome Stable this year and continue the public development process. The Topics API offers significant privacy improvements over third-party cookies, limits cross-site tracking,  and is an important building block for a more private web. It will provide publishers and advertisers with an important signal to inform interest-based advertising once third-party cookies are no longer available.  

Launching Topics in Chrome will provide the web community with the opportunity to observe how Topics performs in the real world, as we continue working toward the longer-term goal of browser interoperability.   We’ve seen a tremendous amount of engagement across the ecosystem to design and begin [testing](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md) Topics, and we are excited to improve the API in 2023 and beyond.


## Insights from early Topics testers

**January 9, 2023**

Topics testing in Chrome is still at an early stage, focused on validating the technical stability
and core functionality of the API. However, we are encouraged to see some early testers exploring
aspects of the business logic behind Topics and sharing their insights publicly. For example,
[Xandr](https://medium.com/xandr-tech/on-the-topic-of-topics-298f95e39269) looked at how the Topics
classifier compares to Xandr's own method of categorizing websites, and Criteo evaluated the ability
of Topics, as a standalone signal, to predict users' future interaction with advertiser websites. 
While isolated analysis won't meaningfully predict the real-world performance of the Privacy Sandbox
technologies, it can prompt constructive dialog and surface areas for improvement. As more holistic
utility testing becomes possible in 2023, we look forward to deeper industry engagement to optimize
Topics and develop best practices for its use in digital advertising products. If you are testing
Topics we encourage you to share your plans and insights on the 
[Topics API Tester List](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md).   

## Ecosystem feedback on Topics for Q3 2022

**October 27, 2022**

As part of our commitments to the [CMA](https://www.gov.uk/government/organisations/competition-and-markets-authority),
Chrome publishes quarterly feedback reports on the Privacy Sandbox proposals, summarizing feedback
received from the various sources including GitHub Issues, the
[Privacy Sandbox feedback form](https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform), meetings with industry stakeholders, and web standards forums. The 2022 Q3 report includes
[Topics feedback themes](/docs/privacy-sandbox/feedback/report-2022-q3/#topics)
such as the accuracy of the Topics system for inferring topics of interest from hostnames, the
granularity of the Topics Taxonomy and the usefulness of Topics for various types and sizes of
websites. (Past reports: [2022 Q2](/docs/privacy-sandbox/feedback/report-2022-q2/#topics) |
[2022 Q1](/docs/privacy-sandbox/feedback/report-2022-q1/#show-relevant-content-and-ads))
 Here's some
[general guidance on providing feedback](/docs/privacy-sandbox/feedback/);
scroll down this page to the "Help Improve Topics" section for some specific areas where we are
seeking ecosystem input.

## Topics origin trial increasing to 5% of Chrome users

**October 26, 2022**

Chrome has started to [increase traffic](/blog/privacy-sandbox-origin-trial-increase/)
for the [Privacy Sandbox Relevance and Measurement origin trial](/origintrials/#/view_trial/771241436187197441), including Topics, from 1% of Chrome Stable traffic to 5%. The trial has been
available in Chrome Stable since August, and feedback from early testers has helped improve API
stability so that we can now expand the trial population to continue functional testing through 2022
and prepare for utility testing in 2023. Stay tuned for more detailed utility testing guidance to
help testers evaluate the Topics API for their use cases. If you'd like to receive notifications
about origin trial progress and other developer updates, please join the
[Topics API Announcements email group](https://groups.google.com/u/1/a/chromium.org/g/topics-api-announce).


## Topics tester page launched on GitHub

**October 11, 2022**

To help consolidate information about Topics testing, we've created a [Tester List page on GitHub](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md)
where Topics testers can identify themselves and link to their learnings. This list is voluntary
and self-reported, so we don't expect it will be complete or representative of all testing
activity—but we hope it will be a useful hub for testers who are willing to share their insights
with the community and inspire others to get involved. If you are testing Topics or making plans to
test, please add your organization to the list. You'll find detailed instructions on the page.

## Help improve Topics

The Privacy Sandbox team welcomes all feedback regarding the design, implementation and
effectiveness of the Topics API. You can join the discussion and raise questions in the [issues for
the Topics proposal](https://github.com/patcg-individual-drafts/topics/issues) on GitHub. You can
also provide feedback via the
[Privacy Sandbox feedback form](https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform).

Here are some specific areas where the Chrome team is seeking input from testers and other
stakeholders.

### Topics taxonomy

The [initial taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)
for the web version of Topics includes around 350 topics across categories such as "Arts & Entertainment,"
"Home & Garden," and "Travel & Transportation." Although the list is human-curated to exclude
explicitly sensitive topics, we acknowledge that some topics may have unintended correlations to
sensitive topics. The eventual goal is for the taxonomy to be sourced from an external party that
incorporates feedback and ideas from across the ecosystem. Some stakeholders have raised concerns
that the taxonomy may not be granular enough; some have suggested the taxonomy should account for
regional and country-level variations.

- [**What taxonomy should be used?**](https://github.com/patcg-individual-drafts/topics/issues/3)
Who should create and maintain it?
- [**What standard might be used to determine sensitive categories?**](https://github.com/patcg-individual-drafts/topics/issues/4) Further discussion [on the Topics explainer repo](https://github.com/patcg-individual-drafts/topics/issues/78).

### Website classification

Topics are inferred by Chrome, using a classifier model that maps site hostnames to topics. The
public can inspect the classifier—either by downloading it locally, using
[the Topics colab](https://colab.sandbox.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn?usp=sharing),
or utilizing `chrome://topics-internals`. Some stakeholders have shared individual examples of
"miscategorized sites." Others have suggested that categorization at the hostname level does not
effectively assign topics for sites with diverse sets of content.

- [**Should sites be able to provide their own topics?**](https://github.com/patcg-individual-drafts/topics/issues/1) Further discussion [here](https://github.com/patcg-individual-drafts/topics/issues/50).
- [**What should happen if a site disagrees with the topics assigned to it by the browser?**](https://github.com/patcg-individual-drafts/topics/issues/2)
- [**Should the classifier consider additional data beyond hostname (for example, page URL, page content)?**](https://github.com/patcg-individual-drafts/topics/issues/17)


### Topics ranking

The top five topics for an [epoch](/docs/privacy-sandbox/topics/topic-classification/#how-the-users-top-five-topics-are-selected)
are selected based on frequency. That is, the browser selects the five topics that appeared most
frequently in a user's browsing history for a given week. Some stakeholders have shared alternative
approaches to calculating the top topics, including variables such as inverse document frequency
(also known as TF-IDFA), a notion of commercial value by topics, and the frequency of advertising
landing pages on the web.

- [**What other variables should be considered when choosing the user's top topics?**](https://github.com/patcg-individual-drafts/topics/issues/42) How should those variables be weighted?
