---
title: Deprecations and removals in Chrome 100
description: >
  A round up of the deprecations and removals in Chrome 100 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-03-04
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/v9Z37wMz90insDTB56fx.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-100
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 100 beta was released on March 3, 2022 and is expected to become the
stable version in late March, 2022.

## Last Version for Unreduced User-Agent String

Chromium 100 will be the last version to support an unreduced User-Agent string by default (as well as the related `navigator.userAgent`, `navigator.appVersion`, and `navigator.platform` DOM APIs). The origin trial that [allowed sites to test the fully reduced User-Agent](/origintrials/#/view_trial/-7123568710593282047) will end on April 19, 2022. After that date, the User-Agent String will be gradually reduced. To review the whole schedule, see [Chromium Blog: User-Agent Reduction Origin Trial and Dates](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html). Sites that need more time to test or [migrate to User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) can enroll in the deprecation origin trial [scheduled from Chrome 100 to 113](/origintrials/#/view_trial/2608710084154359809), inclusive. In contrast to the first origin trial, which previews the fully reduced User-Agent string, the deprecation trial maintains the legacy User-Agent. The deprecation trial is expected to end in late May of 2023.

This is part of a strategy to replace use of the User-Agent string with the
new User-Agent Client Hints API. To learn about User-Agent Client Hints, see [Migrate to User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) and [Improving user privacy and developer experience with User-Agent Client Hints](https://web.dev/user-agent-client-hints/).

{% Partial 'deprecations-policy.md' %}
