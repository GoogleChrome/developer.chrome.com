---
layout: 'layouts/doc-post.njk'
title: 'Enroll with the Privacy Sandbox'
subhead: >
  A new process for the Privacy Sandbox relevance and measurement APIs,
  across Chrome and Android.
description: >
  Verify identity and share configuration details for the Privacy Sandbox
  relevance and measurement APIs, across Chrome and Android.
date: 2023-04-12
authors:
  - georgiafranklin
---

{% Aside %}

The page will be updated with instructions for enrollment. At this time, you'll
find a copy of the [enrollment announcement](/blog/announce-enrollment-privacy-sandbox/).

{% endAside %}

We are launching a new Privacy Sandbox enrollment to verify all entities calling the APIs, and gather data needed to properly configure and use these APIs.

Here, we'll provide a step-by-step guide for how to enroll before it is required. This page will be updated as soon as this process is finalized.

## Why are we asking you to enroll?

It is of paramount importance to the Privacy Sandbox that we protect user privacy. This enrollment process adds an additional layer of protections on top of the structural restrictions enforced within each API, by adding transparency to who is collecting data, and mitigating attempts to misuse the APIs to gather more data than intended. 

To provide auditable transparency, enrollment information about the company will be made public. We will provide further details in a later update on how the public will be able to access this information. 

To limit how much data an API caller can receive, we’ve already incorporated rate limits for each developer into the relevance and measurement APIs. Enrollment allows us to better enforce those rate limits by using an independent, third party verification service. We will use Dun & Bradstreet to verify your corporate identity and any potential corporate linkages. 

This verification process will also help ensure that one developer can’t impersonate another developer and limit their usage of the APIs. Lastly, this effort brings the Privacy Sandbox Chrome and Android ecosystems to a shared enrollment process, which ensures you won’t have to duplicate verification efforts across platforms.

## How do I enroll?

{% Aside %}
The new, unified Privacy Sandbox developer enrollment process will start in June 2023 and become mandatory in August 2023. In August, access to the APIs will be limited only to entities who have successfully completed registration.
{% endAside %}

To enroll, we will ask you to provide the following information:

* Contact details
* Business identification, including your organization's [DUNS number](https://www.dnb.com/duns-number.html)
* Other inputs necessary for API or server configurations (such as sites and/or SDKs used to call the APIs, etc.)
* List of requested APIs

We intend for this process to be lightweight, so that developers can easily set up and begin testing the Privacy Sandbox APIs. Extra assistance in transitioning to the new enrollment process will be provided for currently enrolled Android testers, and Google support channels will be available to address any enrollment related questions. 

### Site-based enrollment

All API callers will need to enroll their
[site](https://web.dev/same-site-same-origin/#public-suffix-list-and-etld). A
site provides a boundary that informs the Privacy Sandbox API's privacy
protections.

{% Aside %}
Enrollment only applies to companies that will call one or more of the Privacy
Sandbox relevance and measurement APIs. Publishers and/or other companies that
are customers of ad techs do not need to enroll.
{% endAside %}

Enrollments should align with independent lines of business or products. If you have multiple such entities that would not share rate limits, you may apply for multiple enrollments for different, independent sites. Any origin used to call the APIs must be within the site boundary of the enrollment.

If you use the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) across Chrome or Android, please be aware of the possible implications to your existing integrations. There are ongoing discussions on rate limits that are relevant to enrollment. We invite your participation in this conversation in [GitHub Issue 661](https://github.com/WICG/attribution-reporting-api/issues/661) and [GitHub Issue 725](https://github.com/WICG/attribution-reporting-api/issues/725).

### Attestations

To enroll, developers will need to agree to specific statements, also known as attestations, about their usage of the enrolled Privacy Sandbox APIs. This helps reduce the risk of these APIs being used improperly, beyond their intended purpose to enable key business use cases while limiting cross-site tracking.

Additionally, attestations help improve public transparency on data collected and used with the Privacy Sandbox APIs. The attestations will be written to be understandable by users, focused on outcomes rather than implementation details. 

We'll provide details about the attestations before the unified enrollment period is available so developers can review the full process. Developers will have until August 2023 to complete their attestations as part of the enrollment process and make them publicly available for verification.

## Next steps

We'll update this documentation once enrollment instructions are available.
