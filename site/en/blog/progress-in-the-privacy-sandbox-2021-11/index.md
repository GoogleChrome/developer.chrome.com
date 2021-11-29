---
title: Progress in the Privacy Sandbox (November 2021)
description: >
  Monthly summary of Privacy Sandbox news including a CDS recap and User-Agent
  testing guidance.
layout: 'layouts/blog-post.njk'
date: 2021-11-30
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/TG00mBIgiEzZo09xjvBg.png'
alt: >
  Privacy Sandbox logo
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

Welcome to the November edition of "**[Progress in the Privacy
Sandbox](/tags/progress-in-the-privacy-sandbox/)**," tracking the milestones on
the path to phasing out third-party cookies in Chrome and working towards a more
private web. Each month we'll share an overview of the updates to [the Privacy
Sandbox timeline](https://privacysandbox.com/timeline/) along with news from
across the project. We've also provided an [update on our Privacy Sandbox
commitments](https://blog.google/around-the-globe/google-europe/update-our-privacy-sandbox-commitments/)
as we continue to ensure proposals are designed, developed and implemented with
regulatory oversight and input from the UK’s Competition and Markets Authority
(CMA) and Information Commissioner's Office (ICO).

As we approach the end of the year there are fewer changes across the different
proposals and so the update here is also lighter. Likewise you can also expect
December to be quieter with holidays and code freezes in place. However, this
does mean it's a good time for testing and questions which we are always happy
to hear either on the [@ChromiumDev Twitter](https://twitter.com/ChromiumDev) or
the [developer support
repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).


## Events

At the beginning of the month we ran the Chrome Developer Summit which included
both a Privacy Sandbox segment in the keynote and a few related questions in the
Ask Me Anything (AMA) session. We've [added a summary for
you](/docs/privacy-sandbox/cds21-update/) to read or watch that covers
activities and examples on what to expect as proposals progress through the
discussion, testing, and scaled adoption phases.

{% YouTube id='_Ah_ODU3CvA' %}

## Strengthen cross-site privacy boundaries

Third-party cookies are a key mechanism that enables cross-site tracking. Being
able to phase them out is a major milestone, but we also need to tackle other
forms of cross-site storage or communication.


### Federated Credentials Management API

The **[Federated Credentials Management (FedCM)
proposal](https://github.com/WICG/FedCM)** is the new, more meaningful name for
WebID.  We've reflected this change in the [Privacy Sandbox
Timeline](https://privacysandbox.com/timeline/) as well. Federated identity is a
critical service for the web, but given that it's explicitly about sharing
aspects of identity with other sites, there are implementation details which
overlap with cross-site tracking.

The Federated Credentials Management proposal explores a range of options from
simple migration paths for existing solutions to more private methods of
connecting to services with the bare minimum of information shared.

November also included the bi-annual
**[BlinkOn](https://www.chromium.org/events/blinkon-15)** conference. Blink is
the rendering engine used by Chromium, and BlinkOn is where contributors get
together for engineering presentations and discussions on current projects which
included FedCM. You can [watch the recording on
YouTube](https://www.youtube.com/watch?v=9la0cBhVXac).


## Preventing covert tracking

As we reduce the options for explicit cross-site tracking, we also need to
address the areas of the web platform that expose identifying information that
enables fingerprinting or covert tracking of users.


### User-Agent string reduction and User-Agent Client Hints

Progress continues on reducing the information available by default in Chrome's
User-Agent string and providing an improved, active method for requesting that
data via User-Agent Client Hints. We've added a new **[User-Agent
Reduction](/docs/privacy-sandbox/user-agent/) landing page** to collate all the
current guidance and updates. 

We have published new testing resources to help prepare for the changes. The
**[User-Agent reduction code
snippets](/docs/privacy-sandbox/user-agent/snippets/)** provide a selection of
examples for transforming the current Chrome User-Agent string to the reduced
format. There is also the new `chrome://flags/#force-major-version-to-100` entry
which will let you check if the switch to a 3 digit major version causes any
issues.

We have sent the **[Intent to Ship for
`Sec-CH-UA-Full-Version-List`](https://groups.google.com/a/chromium.org/g/blink-dev/c/yZh8Lwr34Ro)**.
This addresses [ecosystem
feedback](https://github.com/WICG/ua-client-hints/issues/196) that the existing
`Sec-CH-UA-Full-Version` was too tightly bound to the primary brand as it just
provided a single value. For example, the current implementation shows:

⬇️ _Server response header_
```text
Accept-CH: Sec-CH-UA-Full-Version
```

⬆️ _Browser request header_
```text
Sec-CH-UA: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"
Sec-CH-UA-Full-Version: "94.0.4606.124"
```

The updated version would provide:

⬇️ _Server response header_
```text
    Accept-CH: Sec-CH-UA-Full-Version-List
```

⬆️ _Browser request header_
```text
    Sec-CH-UA: "Chromium";v="94", "Google Chrome";v="94", "Other browser";v="99"
    Sec-CH-UA-Full-Version-List: "Chromium";v="94.0.4606.124", "Google Chrome";v="94.0.4606.124", "Other browser";v="99.88.77.66"
```


If you are using `Sec-CH-UA-Full-Version` then you should plan to migrate to
`Sec-CH-UA-Full-Version-List` as it will enable us to deprecate
`Sec-CH-UA-Full-Version` in the future.


## Measure digital ads

As the companion to displaying ads without cross-site tracking, we need
privacy-preserving mechanisms to enable measuring the effectiveness of those
ads.


### Attribution Reporting API

The **[Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting/)** enables functionality to
measure events on one site, like clicking or viewing an ad, that lead to a
conversion on another site—without enabling cross-site tracking.

We are continuing testing on the API and **[the origin trial has been
extended](https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA)**
through to Chrome 97. Current origin trial tokens expired on October 12th, so
you will need to apply for updated tokens to continue testing.

There are two new blog posts up for the latest details on event-level reporting
in the API. **[Event-level reports in the Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting-event-introduction/)**
introduces the concepts and process while **[Using event-level reports in the
Attribution Reporting
API](/docs/privacy-sandbox/attribution-reporting-event-guide/)** goes into the
implementation detail with accompanying demo and demo code.


## Feedback

As we continue to publish these monthly updates and progress through the Privacy
Sandbox as a whole, we want to make sure that you as a developer are getting the
information and support that you need. Let us know on [@ChromiumDev
Twitter](https://twitter.com/ChromiumDev) if there's anything that we could
improve in this series. We'll use your input to continue improving the format.

We have also added a **[Privacy Sandbox FAQ](/docs/privacy-sandbox/faq/)** which
we will continue to expand based on the issues you submit to the [developer
support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
If you have any questions around testing or implementation on any of the
proposals, come talk to us there.