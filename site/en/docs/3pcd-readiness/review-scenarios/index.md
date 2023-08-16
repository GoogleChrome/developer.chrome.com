---
layout: layouts/doc-post.njk
title: Review your scenarios
subhead: >
  .
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

## Cookie Scenarios

An HTTP Cookie is a mechanism for an origin server to send state information/state to a user agent and for the user agent to return the state information to the origin server, enabling the stateless HTTP Protocol to “remember” stateful information. Thus, Cookies are a state management mechanism, and the state/information collected via Cookies enable a wide range of applications in many areas that are at the core of the usefulness and success of the web. Although there are many such application areas, we can group most of the major cookie scenarios into the following categories:

- **Enterprise authentication** solutions (e.g. SSO), allowing users to authenticate once and gain access to multiple applications and services within the organization without being prompted to log in repeatedly.
- **Federated identity** solutions, allowing users from one organization to be recognized and authenticated by another organization's systems. It's about trust between different domains or organizations.
- **Embedded Content** in \<iframes\>, enabling content sharing from other sites, such as videos, maps, code samples, and social posts.
- **Session Management**, including shopping carts, game scores, etc.
- **Personalization**, including user preferences (e.g. themes, settings), Ad targeting, and others.
- **User Behavior Tracking**, including tracking users on single site/device and across sites/devices, Ad measurement and attribution, Analytics, and others.
- **E-commerce**, including shoping flows, payment solutions, etc.

As Chrome changes the handling of 3P cookies to adjust to a new identity model for the web where state is partitioned at the level of first-party sites, implementations in the aforementioned application categories will have to change accordingly.

To get ready for the phasing out of 3P cookies, you must review all cookie scenarios that may be powering features of your site, providing good value/experiences to your users, and assess if any of them could be impacted.

## Reviewing your Scenarios

For each scenario identified in our sites, we need to ask the following questions:

1. Is my scenario implemented using cookies? If the answer is not, then nothing to do here!
1. Is my scenario implemented using state/information collected by 3P cookies (i.e. cross-site)? If the answer is no, then we just need to focus on ensuring we follow best practices for the use of 1P cookies.
1. Does my scenario require state at a first-party site only? If the answer is yes, then you can consider leveraging Partitioned Cookies (todo: add link to CHIPS).
1. Does my scenario require state sharing across different domains owned by my organization? If the answer is yes, then you can consider leverating First Party Sets (todo: add link to FPS).
1. Does my scenario require state sharing across different sites belonging to different organizations? If the answer is yes the you can consider use some of the other state storage/management mechanisms avialble in the Web Platform. (todo: add link to Web Storage APIs)

## Replacing third-party cookies

The application areas described above are key to the health and vibrancy of the web ecosystem. Many of them currently depend on the use of 3P cookies, and we want for them to continue being supported, by enabling their implementation using privacy-preserving bulding blocks.

Once we have identified the scenarios in our sites that require changes, we can then focus on understanding alternatives to 3P cookies and how to apply them. [This section](/docs/building-blocks/) provides you with guidance to achieve this.
