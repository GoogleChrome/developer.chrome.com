---
layout: 'layouts/blog-post.njk'
title: Cookies Having Independent State (CHIPS) origin trial extended
description: >
  CHIPS is a Privacy Sandbox proposal that introduces a mechanism to opt-in to
  having third-party cookies partitioned by top-level site. The origin trial
  that started in Chrome 100, will now be available on Chrome 106+ until October
  25, 2022.
subhead: >
  The origin trial will now be available on Chrome 106+ until October 25, 2022.
date: 2022-05-26
updated: 2022-09-23
authors:
  - mihajlija
tags:
  - privacy
  - origin-trials
  - cookies
---

[CHIPS](/docs/privacy-sandbox/chips/) is a Privacy Sandbox proposal that
introduces a mechanism to opt-in to having third-party cookies partitioned by
top-level site using a new cookie attribute, `Partitioned`.

{% Aside %}

**Update:** To give developers more time to test the feature and gather more
feedback, an [extension to the experiment will be available on Chrome 106+ until
October 25,
2022](https://groups.google.com/a/chromium.org/g/blink-dev/c/MKQODOL0Fso/m/S3ss7A8jCAAJ)
.

{% endAside %}

The experiment started in Chrome 100 on March 29, 2022 and was scheduled to run
until June 14, 2022.

Starting in version 103, Chrome will include an alternative CHIPS origin trial
design for HTTP cookies, which should enable an opt-in mechanism that will make
deployment easier for large organizations.

In the new design, sending `Accept-CH: Sec-CH-Partitioned-Cookies` header will
no longer be required to enroll in the origin trial. Sites will only need to
send the `Origin-Trial` header with their CHIPS origin trial token when they are
sending responses that include the `Set-Cookie` header with the `Partitioned`
attribute.

To enroll in the origin trial and start experimenting, head over to [CHIPS
origin trial instructions](/blog/chips-origin-trial/).
