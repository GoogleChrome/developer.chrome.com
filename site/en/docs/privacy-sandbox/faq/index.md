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

## Network State Partitioning

### How can I ask a question about this feature?

-  For questions about the specification:
   [create an issue](https://github.com/shivanigithub/fenced-frame/issues) 
   on repo for the explainer.
-  For implementation, integration, and general best practice questions: 
   [create an issue](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   on the Privacy Sandbox developer support repo.


