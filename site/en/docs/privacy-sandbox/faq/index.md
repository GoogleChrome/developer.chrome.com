---
layout: layouts/doc-post.njk
title: FAQs
subhead: The Privacy Sandbox is a series of proposals to satisfy cross-site use cases without third-party cookies or other tracking mechanisms.
description: "Frequently asked questions about the Privacy Sandbox proposals"
date: 2021-04-12
updated: 2022-11-11
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
[public resources of W3C groups](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
and cover a wide variety of use cases and requirements.

### How can I keep track of changes and progress in the Privacy Sandbox?

You can follow the monthly updates to the [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/) series of articles which also includes an [RSS / Atom feed where you can subscribe](/feeds/progress-in-the-privacy-sandbox.xml) with your preferred reader.

The article series links to the matching monthly updates to the [Privacy Sandbox timeline](https://privacysandbox.com/timeline/) which shows the current status and schedule for proposals.

These high-level resources will provide signposts to changes across the project, but for individual proposals where you want to follow in detail you should:

 - Watch or Star proposal repos on GitHub to get notification of new issues and updates: the Privacy Sandbox [status page](/docs/privacy-sandbox/status/) provides a link to the repo for each proposal
 - Join the associated [W3C group](https://www.w3.org/groups/) for regular meetings discussing the proposal detail
 - Star the associated entry on [Chrome Platform Status](https://chromestatus.com) for email updates on Chrome implementation changes

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

### Will `SameSite` become irrelevant after third-party cookies are deprecated?

- `SameSite=Lax` is the current default. While it does not strictly *need* to
   be included, it's good practice to specify it for cross-browser consistency.
- `SameSite=Strict` continues to be a more restrictive option, for cookies that
   must only be sent when the user is already on the site. This is and remains
   a good security practice for cookies that are part of managing particularly
   sensitive access.
- `SameSite=None` should continue to be sent for cross-browser consistency. However,
   Chrome's proposed change to phase out third-party cookies would result in those
   cookies no longer being sent as is in cross-site contexts.

The exception is cookies that are modified by either the
[CHIPS](/docs/privacy-sandbox/chips/) or
[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) proposal.
These allow for a subset of cross-site use cases. As these proposals are
under active discussion, the final formats and functionality may change.

### Can a site participate in origin trials but opt-out of using a feature in specific geographic regions?

In short, no, you cannot opt-out of an origin trial for specific regions.
Origin trials are active on pages which
[contain the token](/blog/origin-trials/#take-part-in-an-origin-trial),
included via HTTP headers (server-side) or HTML meta tags
(client-side). 

If you can determine the user's location, then you could write code which
opts to include the origin trial token based on that location information.
For example, you could attempt to use IP addresses to determine a user's
location. IP addresses can be spoofed, so this is not a guaranteed solution.

However, a geographic-specific origin can set a
[Permissions Policy](/docs/privacy-sandbox/permissions-policy/)
to control what features are usable. For example, `us.example.com` and
`uk.example.com` are geographic-specific origins which can be controlled.
This does not mean that a region has opted-out of the origin trial.

With a Permissions Policy, a site adds a little snippet of code to their 
pages that provides instructions to the browser. When the page loads, the browser 
reads the Permission Policy instructions and will allow or block features (or APIs)
as outlined in the Permissions Policy. If a site wants to restrict an API in a 
specific region, the developer could set a policy for all pages requested from that region.

{% Aside 'warning' %}
Users may choose to visit an origin from a region that's different
from where they are. In other words, a user in the United States may be
able to visit `uk.example.com`. Those users would see features and functions
for the United States site that were blocked for the United Kingdom site.
{% endAside %}

## Privacy State Tokens

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

### Is tooling available for Privacy State Tokens?

Chrome DevTools turns on trust token inspection from the Network and
Application tabs: read
[Getting started with Trust Tokens](https://web.dev/trust-tokens/#summary).

### How do publishers handle tokens from multiple trusted issuers?

The publisher can check a user's browser for valid tokens with
`document.hasTrustToken()` for one issuer at a time. If this returns `true`
and a token is available, the publisher can redeem the token and stop
looking for other tokens.

The publisher must decide which token issuers to check and in what order.

## Topics

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/jkarlin/topics/issues) on the proposal
   repo.
-  For questions about the implementation currently available to test in
   Chrome: [file a Chromium bug](https://bugs.chromium.org/p/chromium/issues/list?q=topics).
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) 
   on the Privacy Sandbox developer support repo.
   
### Can I opt out of topic calculation for specific pages on my site?

Yes. Include the `Permissions-Policy: browsing-topics=()` header on a page to prevent topics
calculation for all users on that page only. Subsequent visits to other pages on your site will
not be affected. If you set a policy to block the Topics API on one page, this does won't
affect other pages. 

Topics are only inferred from the hostname and not from the URL path.

### Can I control which third parties have access to topics on my page?

Yes. You can use the Permission Policy header to control third-party access to the Topics API on your page.
Use `self` and any domains you would like to allow access to the API as parameters.

For example, to completely disable use of the Topics API within all browsing contexts except for your own origin and those whose origin is `https://example.com`, set the following HTTP response header: 'Permissions-Policy: geolocation=(self "https://example.com")`

### Can Topics API be used with on websites with `prebid.js`?

As noted in the release of [Prebid 7](https://prebid.org/blog/the-release-of-prebid-7-0/), 
the community is actively developing an integration with the Topics API via a new module. 
However, as of November 2022, the Topics Module has not yet been completed. To stay abreast with the 
development, we recommend the following:

- Follow [Prebid PR #8947: Topics module: Initial Topics iframe implementation](https://github.com/prebid/Prebid.js/pull/8947) 
which is the PR to create the Prebid Topics Module
- Follow [Prebid Issue #8741: Enhancements to Topics module](https://github.com/prebid/Prebid.js/pull/8741) 
which has an active discussion on the Prebid Topics module's intended workflow.
- If this is a high dependency, reach out to Prebid.js to check in on status updates and timelines, 
through whatever standard channel they offer.

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
fetch the values for those keys, and then makes those values available
to the `generate_bid()` function. The advertiser (ad buyer) can store additional
metadata, along with the interest group, to improve on-device bidding.

### Can the Topics API be used with the FLEDGE API? 

Yes. An observed topic for the current user, provided by the Topics API, could be used as 
contextual information by a seller or bidder. A topic could be included in
the following properties:

*  `auctionSignals`, a property of the auction configuration object passed to `navigator.runAdAuction()`
*  `userBiddingSignals`, a property of the interest group configuration
   object passed to `navigator.joinAdInterestGroup()`
   
### What is the limit to the number of interest groups that a group owner (origin) can add a single browser to?

Chrome allows up to 1000 interest groups per owner, and up to 1000 interest group owners.

These are meant to be guard rails, not to be hit in regular operation.


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

### How does User-Agent reduction affect bot detection?

Chrome's change to its user-agent string does not directly impact the
user-agent string that a bot chooses to send.

Bots may choose to update their own strings to reflect the reduced
information Chrome sends, but that is entirely their implementation
choice. Chrome is still sending the same user-agent format, and bots
that append their own identifier to the end of a Chrome user-agent
string can continue to do so.

For any concerns with specific bots, it may be worth reaching out
directly to the owners to ask if they have any plans to change their
user-agent string.

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
[Fenced frames for Ads design document](https://docs.google.com/document/d/17rtX55WkxMcfh6ipuhP4mNULIVxUApvYt4ZYXfX2x-s/edit#heading=h.jy0hectpkl95).

## Network State Partitioning

### How can I ask a question about this feature?

-  For questions about the specification:
   [create an issue](https://github.com/shivanigithub/fenced-frame/issues) 
   on repo for the explainer.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

## FedCM

### How can I ask a question about this feature?

-  For questions about the proposal:
   [create an issue](https://github.com/WICG/FedCM/issues) on the proposal repo.
-  For implementation, integration, and general best practice questions:
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.

### What is FedCM?

[FedCM (Federated Credential Management)](/docs/privacy-sandbox/fedcm/)
is a proposal for a privacy-preserving approach to federated
identity services (such as "Sign in with&nbsp;...")  where users can log into
sites without sharing their personal information with the identity service or
the site.
