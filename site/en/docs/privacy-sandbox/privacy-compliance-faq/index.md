---
layout: 'layouts/doc-post.njk'
title: 'Privacy-related compliance FAQs'
subhead: >
   Answers to frequently asked questions about obligations, consent, and user controls.
description: >
   Answers to frequently asked questions about obligations, consent, and user controls.
date: 2023-09-11
---

## Privacy-related compliance FAQs for Privacy Sandbox Relevance and Measurement APIs

Privacy Sandbox relevance and measurement APIs and updated user controls are
now
[generally available in Chrome](https://privacysandbox.com/intl/en_us/news/privacy-sandbox-for-the-web-reaches-general-availability).
Ecosystem participants have asked about Chrome's approach to privacy-related
compliance with Privacy Sandbox as well as their own responsibilities. While we
cannot provide legal advice, we can share our responses to frequently asked
questions and provide information about the APIs that can help those responsible
for privacy-related compliance decisions.

### Questions and answers

**Do sites and other Privacy Sandbox relevance and measurement API callers have ePrivacy obligations?**

Laws like ePrivacy require consent to store or access data on and from a user's
browser unless strictly necessary and do not differentiate between legacy
technologies such as third-party cookies, and emerging Privacy Enhancing
Technologies (PET) such as the Privacy Sandbox APIs.

Use of each of the Privacy Sandbox APIs involves accessing data that is stored
on the user's device.

For reference, companies can see how Google's own ads services, which operate
independently from Chrome, are incorporating Privacy Sandbox technologies as
part of their
[EU User Consent Policies](https://www.google.com/about/company/user-consent-policy-help/#:~:text=Do%20I%20need%20to%20follow%20this%20policy%20if%20I%20participate,and%20the%20UK.).
As the landscape evolves, we are hopeful that the privacy benefits of PETs may
be reflected in user consent regulations in the future. We encourage companies
to monitor privacy regulations and DPA guidance, and assess their own
obligations.

**Can users withdraw consent or otherwise control Privacy Sandbox relevance and measurement APIs?**

Yes. Users can access `chrome://settings/adPrivacy`, which provides individual,
granular controls for turning off Privacy Sandbox APIs, blocking individual
topics and specific sites from setting Interest Groups. Users can delete
ad-measurement data by deleting browsing data.

Sites will need to determine what choices they offer to users, how those
preferences are stored, how a user's preference is signaled to the site's
ad-tech vendors who may call the Privacy Sandbox APIs, and how those vendors are
held accountable. Sites and their vendors will need to decide what a user's
choice means in terms of whether and how a given Privacy Sandbox API is used.

Some opt-out based, self-regulatory programs such as AdChoices rely on third-party
cookies. We encourage you to ask those programs how they are preparing for
third-party cookie deprecation.

**Can user choices related to Privacy Sandbox be persisted across sites?**

Users can access `chrome://settings/adPrivacy`, which provides controls for turning
off Privacy Sandbox APIs altogether or blocking individual topics. Users can
delete ad-measurement data by deleting browsing data.

Sites will need to determine whether they take responsibility for extending
user choices expressed on their own sites to the rest of the web. Some opt-out
based, self-regulatory programs such as AdChoices are meant to offer users choices
about how ad tech companies process user data across sites (such as
[Interest-based Advertising](https://youradchoices.com/learn#learn-icon)).
Traditionally those programs are specific to ad tech companies who choose to
participate, and not to sites. We encourage you to ask those programs how they
are preparing for third-party cookie deprecation.

**Can users delete data related to Privacy Sandbox relevance and measurement APIs?**

Users can access `chrome://settings/adPrivacy`, which provides individual, granular
controls for turning off Privacy Sandbox APIs, blocking individual topics and
specific sites from setting Interest Groups. Users can delete ad-measurement
data by deleting browsing data. Additionally, Chrome will automatically delete
users' topics of interest, Interest Groups and reporting events after a set
period of time.

For sites and other Privacy Sandbox relevance and measurement API callers, the
following technical functions are available:

-   For Protected Audience, a site or its ad tech that can add Interest
    Groups from this site can also call the `leaveAdInterestGroup` function.
-   For Shared Storage, a site or its ad tech can call the `delete` method
    on a key or the `clear` method to clear all keys.
-   For the Attribution Reporting API, a site or its ad tech can use
    the
    [`Clear-Site-Data` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data).

Sites and other API callers will need to determine if their current mechanisms
for deletion rights are suitable if and when they have chosen to store data
retrieved from Privacy Sandbox APIs or data related to calling the APIs.

**How is Privacy Sandbox approaching privacy-related compliance in Chrome?**

In the case of Topics, this is a new experience for Chrome users and Chrome
wanted to provide a separate moment for users to learn and choose what's best
for them. Topics marks a new way for Chrome to enable relevant experiences based
on a user's browsing history, and Chrome has taken the decision to ask for
consent from users in the UK/EEA and Switzerland before enabling the API.

The Protected Audience and measurement APIs represent more private versions of
existing processing behaviors both within the browser and in protected, trusted
environments. Overall, all users will have robust controls, and can opt out of
the Privacy Sandbox experience at any point.

You can learn more about Privacy Sandbox ad controls in our
[Help Center](https://support.google.com/chrome/answer/13355898#zippy=%2Cmanage-ad-topics).

## More API information

Learn more about the Privacy Sandbox relevance and measurement APIs:

-   [Topics](/docs/privacy-sandbox/topics/):
    Generate signals for interest-based advertising without third-party cookies
    or other user identifiers that track individuals across sites.
-   [Protected Audience](/docs/privacy-sandbox/protected-audience/):
    Select ads to serve remarketing and custom audience use cases, designed to
    mitigate third-party tracking across sites.
-   [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/):
    Correlate ad clicks or ad views with conversions. Ad techs can generate
    event-level or summary reports.
-   [Private Aggregation](/docs/privacy-sandbox/private-aggregation/):
    Generate aggregate data reports using data from Protected Audience and
    cross-site data from Shared Storage.
-   [Shared Storage](/docs/privacy-sandbox/shared-storage/):
    Allow unlimited, cross-site storage write access with privacy-preserving
    read access.
-   [Fenced Frames](/docs/privacy-sandbox/fenced-frame/):
    Securely embed content onto a page without sharing cross-site data.
