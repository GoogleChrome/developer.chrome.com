---
title: Deprecations and removals in Chrome 102
description: >
  A round up of the deprecations and removals in Chrome 102 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-03-31
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/Yj71FJ6FU94BnscmhmVy.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-102
---


Chrome 102 beta was released on April 28, 2022 and is expected to become the
stable version in late May, 2022.


## Deprecate PaymentRequest.show() without User Activation {: #deprecate-paymentrequest-show-without-user-activation }

Sites can [no longer call PaymentRequest.show() without a user activation](https://chromestatus.com/feature/5948593429020672). Allowing `PaymentRequest.show()` to be triggered without a user activation could be abused by malicious websites. To protect users, the spec was changed to require user activation. To avoid a broken purchase experience, calls to this method should now be inside a user event such as `click`.

Firefox has not shipped `PaymentRequest` at all, while Safari's implementation already requires user activation for calling `show()`.


## Remove SDP Plan B {: #remove-sdp-plan-b }

The Session Description Protocol (SDP) used to establish a session in WebRTC has been implemented with two different dialects in Chromium: Unified Plan and Plan B. Plan B is not cross-browser compatible and [is hereby removed](https://www.chromestatus.com/features/5823036655665152).

In this version of Chrome an exception will be thrown when Plan B is used. Developers needing to avoid the exception can participate in a [deprecation trial until May 25, 2022](/origintrials/#/view_trial/3892235977954951169). If you participated in the previous deprecation trial that ended in December, and want participate in the current trial, you will need to request a new token.


{% Partial 'deprecations-policy.md' %}
