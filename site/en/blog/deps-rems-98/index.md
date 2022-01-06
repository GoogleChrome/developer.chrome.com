---
title: Deprecations and removals in Chrome 98
description: >
  A round up of the deprecations and removals in Chrome 98 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-01-06
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/8hNVkXWdaC9NGJ5Pg0HT.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations
  - removals
  - chrome-98
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 98 beta was released on January 6, 2022 and is expected to become the
stable version in early February, 2022.

## Remove SDES key exchange for WebRTC

The SDES key exchange mechanism for WebRTC has been declared a MUST NOT in the
relevant IETF standards since 2013. Its usage in Chrome has declined
significantly over the last year. [SDES is
removed](https://chromestatus.com/features/5695324321480704) because it is a
security problem. It exposes session keys to Javascript, which means that
entities with access to the negotiation exchange, or with the ability to subvert
the Javascript, can decrypt the media sent over the connection.

## Deprecate PaymentRequest.show() without user activation

[Starting in Chrome 98](https://chromestatus.com/feature/5948593429020672), if a
website calls PaymentRequest.show() without a user activation, a console warning
will be issued. Starting in Chrome 99, such calls will not work. Allowing
PaymentRequest.show() to be triggered without a user activation could be abused
by malicious websites. To protect users, the spec was changed to require user
activation. To avoid a broken purchase experience, calls to this method should
now be inside a user event such as click.

Firefox has not shipped PaymentRequest at all, while Safari's implementation
already requires user activation for calling show().

{% include 'partials/deprecations-policy.md' %}
