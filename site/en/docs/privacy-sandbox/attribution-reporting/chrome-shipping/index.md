---
layout: 'layouts/doc-post.njk'
title: 'Why Chrome plans to ship the Attribution Reporting API'
description: >
  Understand why we plan to ship this API in the first half of 2023, while
  it is in incubation in the Web Incubator Community Group.
date: 2022-12-15
authors:
  - csharrison
  - cilvento
  - maudn
---

The Attribution Reporting API is Chrome's proposal to support
[Attribution Reporting use cases](/docs/privacy-sandbox/attribution-reporting/#use-cases-and-features)
while enhancing privacy for users. It's one of many proposals
([1](https://github.com/patcg-individual-drafts/ipa),
[2](https://github.com/privacycg/private-click-measurement),
[3](https://github.com/WICG/privacy-preserving-ads/blob/main/MaskedLARK.md),
[4](https://github.com/WICG/privacy-preserving-ads/blob/main/Bucketization.md),
and more) attempting to solve the same problem.

This article explains our plans to ship the Attribution Reporting API sometime
in the first half of 2023, while it's still in incubation in the
[Web Incubator Community Group](https://github.com/WICG/attribution-reporting-api).
Chrome is fully committed to participating in the relevant W3C processes, and
Chrome teams are working in the
[Private Advertising Technology Community Group](https://www.w3.org/community/patcg/)
(PATCG) to identify a solution that is broadly acceptable across many browser
engines. Shipping the API in parallel will allow us to test and improve this
important use case.

**The use cases served by the Attribution Reporting API are important to effectively support the needs of the ecosystem before phasing out third-party cookies.**

We believe that the Attribution Reporting use cases are critical for a thriving
web ecosystem. We also believe that removing third-party cookies from Chrome is
vital to improving users' privacy on the web.

To address ecosystem needs and better protect user privacy, we think it's
necessary to ship this API and thus enable testing and calibration before
phasing out third-party cookies. This position is aligned with our
[commitments](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)
to the UK's Competition and Markets Authority (CMA) regarding the Privacy
Sandbox and Chrome's removal of third-party cookies.

**Shipping the Attribution Reporting API will allow developers to adapt to the new technology and provide real-world experience to inform the standards process, while improving privacy for users.**

While standards are essential for a functioning web, they take time and
consensus to be established. As the web moves away from cross-site tracking, we
need to make sure that the new technologies we develop will effectively support
the needs of the ecosystem. 

This requires making the Attribution Reporting API broadly available. This
provides the opportunity for developers to adopt the new technology and assess
testing outcomes, all while the standards process unfolds. We believe the
results of this adoption and testing will feed into the standard-setting
process and allow participants in the PATCG to reach a more informed consensus
on an interoperable standard that satisfies the underlying use case.

Shipping the Attribution Reporting API offers concrete benefits in terms of
laying the groundwork for the future of measurement on the web platform:

* Research: Operationalizing the API will give Chrome and other browser vendors
  key insights needed to design a future interoperable API. We'll bring our
  early insights to venues like the PATCG to improve any future standards.
* Development paradigm shift: Developers migrating to Attribution Reporting API
  will ramp up on new technical concepts, such as noise addition, that are
  likely to be key for future privacy-preserving measurement regardless of the
  specific API. Developers will also start to adapt their other systems to
  noisy data. We'll do our best to provide developers with the documentation
  and support they need to handle noise and concepts that are likely to be
  transferable.

These benefits are all in addition to the fundamental improvement to user
privacy that comes with phasing out third-party cookies—which we believe
requires first offering an API that supports Attribution Reporting use cases,
for reasons explained above.

**Chrome would provide a careful migration to any possible interoperable replacement.**

Chrome is committed to providing an effective, privacy-enhancing API for this
use case, to support the ecosystem after the deprecation of third-party
cookies. In the near-term, we believe this requires shipping the Attribution
Reporting API.

We recognize, however, that some browsers have not expressed
positive signals for Chrome's proposal. Our long-term goal remains an
interoperable standard that browsers broadly support, and we are actively
working to identify such a solution.

If, after we ship the Attribution Reporting API, a different mutually-agreeable
standard arrives, we would work with the ecosystem to support a thoughtful
transition to the new API. At that point, we could explore deprecating the
Attribution Reporting API. This would likely mean a significant period when
both the Attribution Reporting API and its replacement are available in Chrome,
to allow developers and other stakeholders adequate time to evaluate the
replacement API and make the migration path as easy as possible.

## Engage and share feedback

We're committed to continuing to improve the API, and have made several changes
already in response to developer feedback (such as
[1](https://github.com/WICG/attribution-reporting-api/issues/521),
[2](https://github.com/WICG/attribution-reporting-api/issues/522),
[3](https://github.com/WICG/attribution-reporting-api/issues/347),
[4](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/41),
[5](https://github.com/WICG/attribution-reporting-api/issues/590), and more).
We welcome further feedback and look forward to continuing to work closely with
the community.

* **GitHub**: Read the [Attribution Reporting API proposal](https://github.com/WICG/attribution-reporting-api),
  and [raise questions and follow discussion.](https://github.com/WICG/attribution-reporting-api)
* **Developer support**: Ask questions and join discussions on the
  [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
