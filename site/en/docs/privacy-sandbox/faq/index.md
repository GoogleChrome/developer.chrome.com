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

Here you'll find general questions about the Privacy Sandbox that are not covered in any single topic.

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

