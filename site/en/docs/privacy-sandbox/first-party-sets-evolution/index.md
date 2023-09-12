---
layout: 'layouts/blog-post.njk'
title: "How Chrome evolved the First-Party Sets proposal"
subheading: "Evolving First-Party Sets to advance privacy for users and web interoperability for developers."
description: "Evolving First-Party Sets to advance privacy for users and web interoperability for developers."
date: 2023-02-13
updated: 2023-02-16
thumbnail: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/TxiweGXhJ3d2RTsH8sZh.png'
alt: A diagram showing First-Party Sets.
tags: 
  - privacy
authors:
  - helencho
  - kaustubhag
  - johannhof
  - jney
---

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/TxiweGXhJ3d2RTsH8sZh.png", alt="First-Party Sets diagram", width="800", height="502" %}


First-Party Sets (FPS) is designed to support users' web browsing experience
after the 
[deprecation of third-party cookies](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline/)
in Chrome. The proposal has evolved significantly in open-web forums during the
[FPS incubation](https://github.com/WICG/first-party-sets), first in the W3C's
[Privacy Community Group](https://www.w3.org/groups/cg/privacycg), and now in
the [Web Incubator Community Group](https://www.w3.org/community/wicg/).

In this blog post, we will recap the evolution process, highlight key changes,
and discuss why we believe such changes improve privacy on the web while
continuing to support the ecosystem.

## Background

Sites often rely on access to their cookies in a third-party context to deliver
seamless and tailored experiences to users. In addition to the
[Privacy Preserving Ads APIs (Topics, Protected Audience API, and Attribution)](/docs/privacy-sandbox/maximize-ad-relevance/),
the Chrome team sought to understand the scope of scenarios in which third-party
cookies were used, beyond ads personalization or measurement purposes, to
provide enhanced browsing experiences for users.

We found that organizations may rely on third-party cookies because their web
architecture is designed to utilize multiple domains. For example, an
organization may have one domain for their hiking blog and another for their
camping store and want to support user journeys across those sites. An
organization may also maintain multiple country-code domains with shared
infrastructure for their web service. For cases like these, we  set out to
create a solution that aligned with such organizations' needs, while preserving
users' expectations for their privacy on the web.

## Where we started

Since the browser currently uses the site-level boundary to interpret
"first-party" versus "third-party", to account for the range of domains that an
organization might manage, it seemed appropriate to replace this technical
boundary with a more nuanced definition.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ZqDPMagkFqvX7UDjQj9v.png", alt="Diagram of a site with an embedded iframe", width="512", height="335" %}


In 2021, Chrome initially proposed the `SameParty` cookie attribute for
First-Party Sets such that sites could define cookies originating from sites
within the "same party". We used a
[User-Agent Policy](https://github.com/WICG/first-party-sets/blob/main/archive/ua_policy_proposal.md)
to define what would constitute a "same party". This policy definition attempted
to build upon existing frameworks of "party" (for example, from the [W3C DNT
specification](https://www.w3.org/TR/tracking-compliance/#party)) and
incorporated recommendations from relevant privacy discourse (such as the 2012
Federal Trade Commission report titled
["Protecting Consumer Privacy in an Era of Rapid Change"](https://www.ftc.gov/sites/default/files/documents/reports/federal-trade-commission-report-protecting-consumer-privacy-era-rapid-change-recommendations/120326privacyreport.pdf)).

At the time, we felt this approach provided enough flexibility for different
types of organizations, across industries, while also adhering to our
foundational goal of minimizing  widespread tracking through third-party
cookies.

## Feedback on the initial proposal

Through many conversations with stakeholders in the web ecosystem, we found
that there were limitations with this initial design.

### Privacy challenges with passive cookie access through the SameParty attribute

[Other browser](https://lists.w3.org/Archives/Public/public-privacycg/2022Jun/0001.html)
vendors [preferred](https://github.com/WICG/first-party-sets/issues/42) an
active approach to third-party cookie access requiring an explicit API
invocation, rather than establishing a boundary within which passive cookie
access could be maintained. Active requests for cookie access provide the
browser visibility and control so that the risk of covert tracking via
third-party cookies can be mitigated. Additionally, this visibility would allow
browsers to provide users with the choice to allow or block such cookie access.

In the interest of seeking web interoperability across browsers as well as
improving privacy benefits, we decided to move in this direction.

### Implementation challenges with the proposed policy

The original policy proposed three requirements for domains to be in a single
set: "common ownership", "common privacy policy", and "common group identity".

From the broader ecosystem, we found the feedback we received on the policy to
follow four main themes.

#### Common ownership is too restrictive

Regarding the "common ownership" requirement, we received
[feedback](https://assets.publishing.service.gov.uk/media/62e1662ee90e07142da0176f/CMA_update_report_-_Google_Privacy_Sandbox.pdf)
that a definition of FPS which focused solely on corporate ownership would give
larger companies a greater ability to pool data across a wide range of domains
and user-facing services, compared to smaller companies. Since our goal is to
build the Privacy Sandbox for the ecosystem as a whole, we took this feedback
seriously and prioritized a solution that was more inclusive.

#### A single policy limits extensibility to use cases

While the idea of a holistic policy to govern a boundary was intended to provide
flexibility for different types of domains that would need to be in an
organization's FPS, we found that some critical use cases could not meet this
policy design. For example, service domains (like those hosting user-generated
content) may require access to their cookies in a third-party context to
authenticate or identify users. Such domains rarely have a user-accessible
homepage, so the requirements of "common group identity" or "common privacy
policy" with other domains in the same FPS could not be met.

#### Users' perception and understanding of group identity may differ

We originally proposed guardrails to define a "common group identity" as an
attempt to scope domains within a single set to those that could easily be
associated with a common group identity. However, we weren't able to define a
technical means to measure and assess whether the common group identity could be
"easily discoverable by users". This left potential for abuse and questions
about enforcement.

We also
[received](https://github.com/WICG/first-party-sets/issues/31#issuecomment-777765845)
[feedback](https://github.com/WICG/first-party-sets/issues/30) that
understanding the meaning of "common ownership" boundaries may vary from user to
user, which makes creating guidelines that can be applied to all sites
difficult.

#### A subjective policy is difficult to enforce at scale

We received many requests for more detailed guidelines, given the subjective
nature of certain requirements (such as "common group identity"), and the need
to cover exceptions or edge cases for others
([regarding "common privacy policy"](https://github.com/WICG/first-party-sets/issues/72#issuecomment-1043250162)).

To ensure the policy was applied equitably and consistently, Chrome would have
had to provide site authors with much more specific guidelines. We determined
that attempting to create stricter guidelines could be exclusive to the
detriment of the ecosystem.

While we had initially proposed that an independent enforcement entity take on
the role of investigating and enforcing compliance with policy, in the current
ecosystem, finding an independent enforcement entity with the appropriate
expertise to carry out these responsibilities in an impartial manner was
challenging. Instead, we strived to pivot to a policy that could be technically
enforced to ensure that implementation could be applied consistently and
objectively.

## The evolution

In response to feedback, we redesigned FPS. We returned to the specific
problems we were trying to address, and decided to more directly frame the
proposal around specific use cases we were solving for.

### Solving for key use cases

Chrome developed three different purpose-built "subsets" to meet key use cases
on the web. The subsets approach improved upon the old approach by being more
private, more specific, and easier to enforce consistently.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jct3xEWm4zqs6nD8Zixz.png", alt="Diagram of First-Party Sets subsets.", width="800", height="287" %}


-   "ccTLDs" (country-code top-level domains) — Organizations may maintain
    sites with different ccTLDs for localized experiences, and these sites may
    still require access to shared services and infrastructure.
-   "Service" domains — Sites may use discrete domains for security or
    performance purposes, and these sites may require access to a user's
    identity to perform their functions.
-   "Associated" domains — Organizations may maintain multiple sites for
    different, related brands or products. They may want cross-site cookie
    access for use cases such as analytics of user journeys across related
    sites to better understand how an organization's user base interacts with
    their sites, or to remember a user's logged-in state on a related site
    relying on the same login infrastructure.

{% Aside %}    
For the "associated" subset, we proposed a numeric limit of
three domains as an objective, technical mechanism to prevent
widespread tracking abuse. Absent an impartial method of assessing user
understanding, we felt that a numeric limit was most appropriate to
uphold protections against potential widespread and passive tracking.
For organizations that have multiple domains (beyond three) that could
qualify for the “associated” subset, we encourage these organizations to
identify specific use cases so Chrome can consider how to best minimize
user-facing breakage post-third-party cookie deprecation. 
{% endAside %}  

For each of these use cases, there are discrete policy requirements,
corresponding technical validation checks, and specific browser-handling
behavior (learn more at
[Submission Guidelines](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)).
These changes address the limitations in the original proposal by abandoning a
"one size fits all" design, and favoring a compartmentalized, use case-driven
framework.

### Opportunity for interoperability through active requests for third-party cookie access

Chrome is keen to promote interoperability with other browsers to maintain the
health of the web platform. Since other browsers like Safari, Firefox, and Edge
currently use the
[Storage Access API](https://developer.mozilla.org/docs/Web/API/Storage_Access_API)
(SAA) to facilitate active cookie requests, we opted for leveraging SAA in
Chrome not only to help address key feedback we received, but also to support
web interoperability.

To provide more flexibility for developers and address [known limitations](https://github.com/WICG/first-party-sets/#providing-capabilities-beyond-the-storage-access-api) of SAA,
we have also proposed the [`requestStorageAccessForOrigin`](https://github.com/privacycg/requestStorageAccessForOrigin) API. 

### Opportunity to use Storage Access API and FPS together

When implementing the Storage Access API (SAA), browsers may choose to
[ask users](https://webkit.org/blog/11545/updates-to-the-storage-access-api/#:~:text=If%20the%20user%20has%20not%20yet%20opted%20in%20to%20storage%20access%20for%20social.example%20under%20news.example%20there%20will%20now%20be%20a%20prompt.)
directly for permission, and others may choose to
[allow](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#user_prompts)
a limited number of requests without a permission prompt.

Chrome believes that FPS can provide a transparent layer over SAA, by limiting
user friction and preventing prompt fatigue for key, limited use cases. FPS also
provides browsers the flexibility to provide users with additional context about
set membership, should they choose to prompt users for permission.

With FPS, developers have the opportunity to identify their own impacted sites
that serve key use cases. This affords developers the agency to anticipate how
their sites will function for users, and take measures to limit impact to user
experience, by leveraging FPS or a third-party cookie alternative. Additionally,
FPS provides developers platform predictability, as opposed to heuristics which
may change over time, or result in varying behaviors for different users.

Finally, developers who implement SAA to work with FPS in Chrome will also be
able to leverage SAA for their sites' performance on other browsers, *even those
that don't ship FPS*.

## Continued discussion

We believe our latest proposal strikes the right balance in a challenging
tradeoff space that considers the needs of users and developers. We appreciate
the feedback raised by web ecosystem stakeholders that helped us evolve the FPS
proposal.

We recognize that web ecosystem stakeholders are still familiarizing themselves
with the updated proposal. Please engage with us so we can continue to improve
the design in a manner that is more useful for developers and continues to
improve privacy on the web. Google will also continue working with the UK's
Competition and Markets Authority (CMA) to ensure compliance with the [Commitments](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf).

To engage check out the following resources:

-   Incubation in [WICG](https://github.com/WICG/first-party-sets/issues)
-   [FPS testing instructions](/blog/first-party-sets-testing-instructions/)
-   [First-Party Sets: integration guide](/docs/privacy-sandbox/first-party-sets-integration/)
-   [FPS Submission Guidelines](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)

## Working with the ecosystem

It's great to see companies like Salesforce and CafeMedia engaging on key feedback and development of First-Party Sets. They have been instrumental in advancing the technology. Several others have also shared their thoughts on First-Party Sets and Chrome’s efforts to work with the web ecosystem:

_"Chrome is developing first-party sets to align with many of our use cases, like preserving user journeys. This demonstrates to us that the Google team is working to understand the different types of needs of site owners across the web."_ - Mercado Libre


_"At VWO, we appreciate Google's efforts to elevate privacy standards, while ensuring that genuine use cases are handled. It's great that the team is collaborating with the developer ecosystem, and is constantly improving the implementation of the first-party sets proposal based upon the feedback from web stakeholders. We are excited about being a part of the testing journey of the proposal and looking forward to its incorporation into the browser."_ - Nitish Mittal, Director of Engineering, VWO