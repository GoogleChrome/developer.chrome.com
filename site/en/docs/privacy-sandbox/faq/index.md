---
layout: layouts/doc-post.njk
title: FAQs
subhead: The Privacy Sandbox is a series of proposals to satisfy cross-site use cases without third-party cookies or other tracking mechanisms.
description: "Frequently asked questions about the Privacy Sandbox proposals"
date: 2021-09-21
updated: 2021-11-04
authors:
	- samdutton
---

Here you'll find common questions about the Privacy Sandbox. The range of
questions is in no way comprehensive, and we expect the list of topics under
each heading to grow substantially over time.

Contributions are welcome. If you have a Privacy Sandbox question that's not
answered here:

-  File an issue on the explainer repo for the proposal you're asking about.
   Links to these are provided below, and are available from the
   [Privacy Sandbox status page](/docs/privacy-sandbox/status).
-  Ask general Privacy Sandbox questions, and questions that cover multiple
   APIs, on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-  If you'd prefer, you can
   [file a feature request](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request%2CP2&template=feature_request.md&title=)
   on the repo for this site.

## General questions

### Why do we need the Privacy Sandbox?

The Privacy Sandbox initiative has two core aims:

-  Develop replacement solutions to support web use cases and business models
   without allowing users to be tracked across sites, and avoiding cross-site
   tracking users aren't aware of.
-  Phase out support for third-party cookies and other forms of tracking when
   new solutions are in place.

### Who works on the Privacy Sandbox?

The Privacy Sandbox is a set of proposed web standards.

Chrome and other browser vendors, as well as ad companies and other
stakeholders, have offered more than 30 proposals to date. These proposals can
be found in the
[public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo) and cover a wide variety of use cases and requirements.

### How can I get involved?

-  Participate in incubation, testing and refinement of the APIs:  
   [How to participate in the Privacy Sandbox initiative](/blog/privacy-sandbox-participate/)
-  As a developer, join discussions or ask questions:  
   [Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)

For questions about specific APIs, you can file an issue on the
[GitHub repo for an API Explainer](/docs/privacy-sandbox/status/).

### Can you define the terminology in the API explainers?

Yes, refer to the [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

### When will the Privacy Sandbox APIs be implemented?

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline/) shows the
roadmap to phase out third-party cookies. Additional current information for
individual APIs is available on the
[implementation status page](/docs/privacy-sandbox/status/).

### Are the Privacy Sandbox APIs in Chromium or Chrome?

The APIs are implemented in
[Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)), which
is the open-source browser used to make Chrome. Code for the Privacy Sandbox
APIs can be accessed via
[Chromium Code Search](https://source.chromium.org/search?q=floc).

You can
[download Chromium](http://chromium.org/getting-involved/download-chromium),
then [run it with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
to allow access to APIs that are in the process of implementation.

### How can I try Privacy Sandbox APIs that aren't yet turned on by default?

As an API progresses through development in Chrome, there are multiple ways it
may be made available for testing.

-  **For a single user via command line flags**  
   Early features may often provide a specific command line flag to allow a
   developer to launch the browser with the new feature enabled.
-  **For a single user via `chrome://flags`**  
   As a feature progresses, it's often made available via an experimental flag
   within the more accessible `chrome://flags` interface. These flags can also
   be enabled via the command line.
   `chrome://flags#enable-experimental-web-platform-features` bundles together
   current experimental features.
-  **For your users, in an origin trial**  
   Once an iteration of a new feature is code-complete and relatively stable,
   an [origin trial](https://web.dev/origin-trials) may be provided to allow
   individual sites to turn on the feature for Chrome users on their site. If
   an [origin trial](https://web.dev/origin-trials) is available for an API you
   want to test with your users,
   [register for the origin trial](/origintrials/#/trials/active) and provide
   a valid trial token with every page load.
-  **For users of early Chrome releases**  
   When a feature is approved to ship in a given release, it will progress
   through Canary and Beta channels before it reaches Stable. The feature will
   be turned on by default for all users of those channels.

{% Aside 'caution' %}  
Chrome offers users the ability to opt-out of Privacy Sandbox trials in
browser settings. Users who opt-out will not have Privacy Sandbox features
turned on, even on pages which provide a valid origin trial token.  
{% endAside%}  

### I registered for an origin trial, but the API isn't working on my site

See [Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/#chrome).

### Will Privacy Sandbox origin trials work in Chromium or other browsers?

Chrome origin trials are designed to work for Chrome users. Don't rely on Chrome
origin trial tokens to allow trial features in other browsers, including Chromium,
and other Chromium-based browsers.

For more detailed information, see
[Troubleshooting Chrome's origin trials](/blog/origin-trial-troubleshooting/#chrome).

Chrome on iOS and iPadOS does not support Chrome origin trials.

## Trust Tokens

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/trust-token-api/issues) 
   on the proposal repo.
-  For origin trial questions:
   [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=trust%20tokens)  
   or respond to the feedback form that is sent to you as an origin trial
   participant. 
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) 
   on the Privacy Sandbox developer support repo.

### Is tooling available for Trust Tokens?

Chrome DevTools turns on trust token inspection from the Network and
Application tabs: read
[Getting started with Trust Tokens](https://web.dev/trust-tokens/#summary).

## FLEDGE

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/turtledove/issues) on the proposal
   repo.
-  For questions about the implementation currently available to test in
   Chrome: [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=fledge).
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) 
   on the Privacy Sandbox developer support repo.

### What's the difference between FLEDGE and TURTLEDOVE?

[FLEDGE](/docs/privacy-sandbox/fledge) is the first experiment to be implemented
in Chromium within the [TURTLEDOVE](https://github.com/WICG/turtledove) family
of proposals. The differences mostly pertain to separation of the on-device role
of the ad buyer and seller:

FLEDGE allows a 'trusted server' to provide access to real-time data used by a
worklet in bidding, without compromising privacy. Each interest group can
have a `trusted_bidding_signals_url` and `trusted_bidding_signals_keys`
attribute.

At auction time, the browser communicates with the trusted server to
fetch the values for those keys, and then makes those values available to the `generate_bid()` function. The advertiser (ad buyer) can store additional
metadata, along with the interest group, to improve on-device bidding.

## Attribution Reporting

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/conversion-measurement-api/issues) 
   on the proposal repo.
-  If you're an origin trial participant and have technical questions, join the
   [Attribution Reporting mailing list](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) 
   for developers and ask questions there, or
   [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=attribution%20reporting).
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) 
   on the Privacy Sandbox developer support repo.

### Is Attribution Reporting the same as the Event Conversion Measurement API?

Yes. [The name was changed](/docs/privacy-sandbox/attribution-reporting-introduction/),
as the original event-level scope expanded to cover additional measurement use
cases.

## First-Party Sets

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/privacycg/first-party-sets/issues) 
   on the proposal repo.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) on the Privacy 
   Sandbox developer support repo.

### What does 'sharded' mean in the context of First-Party Sets?

The registrable domains, or "First-Party Set," is not joined across domains.

For example, `a.example`, `b.example`, and `c.example` are not inherently part
of a first-party set owned by any one domain. The owner domain must serve a
manifest file which defines the relationship to other domains.

## User-Agent Client Hints (UA-CH)

### How can I ask a question about this feature?

-  For questions about the API:
   [create an issue](https://github.com/WICG/ua-client-hints/issues) 
   on the specification repo.
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) 
   on the Privacy Sandbox developer support repo.

### How can I detect tablet devices with the UA-CH API?

As the line between mobile, tablet, and desktop devices continues to become
less distinct and dynamic form-factors are more common (folding screens,
switching between laptop and tablet mode), it's advisable to use responsive
design and feature detection to present an appropriate user interface.

However, information provided by the browser for both the User-Agent string
and User-Agent Client Hints comes from the same source, so the same forms
of logic should work.

For example, if this pattern is checked on the UA string:
- Phone pattern: `'Android' + 'Chrome/[.0-9]* Mobile'`
- Tablet pattern: `'Android' + 'Chrome/[.0-9]* (?!Mobile)'`

The matching default UA-CH headers interface may be checked:
- Phone pattern: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?1`
- Tablet pattern: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?0`

Or the equivalent JavaScript interface:
- Phone pattern: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === true`
- Tablet pattern: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === false`

For hardware-specific use-cases, the device model name can be requested via
the high entropy `Sec-CH-UA-Model` hint.

### How long will hints specified via the `Accept-CH` header be sent?

Hints specified via the `Accept-CH` header will be sent for the duration of the
browser session or until a different set of hints are specified.

### Does UA-CH work with HTTP/2 and HTTP/3?

UA-CH works with both HTTP/2 and HTTP/3 connections.

{% Aside 'caution' %}
Client Hints are only sent over secure connections, so make sure your uses HTTPS.
{% endAside %}

### Do subdomains (and CNAMEs) require a top-level page `Permissions-Policy` to access high entropy UA-CH?

High-entropy UA-CH on request headers are restricted on cross-origin requests
regardless of how that origin is defined on the DNS side. Delegation must be
handled via `Permissions-Policy` for any cross-origin subresource or obtained
via JavaScript which executes in the cross-origin context.

## Shared storage

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/pythagoraskitty/shared-storage/issues)
   on the proposal repo.
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

## CHIPS

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/CHIPS/issues) on the proposal repo.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) on
   the Privacy Sandbox developer support repo.

## Storage Partitioning

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/MattMenke2/Explainer---Partition-Network-State/issues) 
   on the repo for the proposal explainer.
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

## Fenced frames

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/shivanigithub/fenced-frame/issues) 
   on the proposal repo.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

### What are the use cases for fenced frames?

The API proposes
[a new form of embedded document](https://github.com/shivanigithub/fenced-frame)
that will allow new APIs to isolate themselves from their embedders. This
prevents cross-site recognition.

For ads use cases, see
[Fenced frames for Ads Design Doc](https://docs.google.com/document/d/17rtX55WkxMcfh6ipuhP4mNULIVxUApvYt4ZYXfX2x-s/edit#heading=h.jy0hectpkl95).

## Network State Partitioning

### How can I ask a question about this feature?

-  For questions about the specification:
   [create an issue](https://github.com/shivanigithub/fenced-frame/issues) 
   on repo for the explainer.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

## WebID

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/WebID/issues) on the proposal repo.
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

### What is WebID?

The name "WebID" can be confusing! WebID is not a type of user identifier.
Rather, WebID is a proposal for a privacy-preserving approach to federated
identity services (such as "Sign in with&nbsp;...")  where users can log into
sites without sharing their personal information with the identity service or
the site.

WebID is still [in incubation in the W3C](https://github.com/WICG/WebID).
