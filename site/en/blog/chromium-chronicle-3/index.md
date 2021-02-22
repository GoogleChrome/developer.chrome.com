---
title: "The Chromium Chronicle #3: Code Coverage in Gerrit"
description: >
  Tests are critical because they find bugs and regressions, enforce better
  designs and make code easier to maintain. This month, we take a look at
  how to conduct thorough tests with Gerrit.
layout: 'layouts/blog-post.njk'
date: 2019-06-24
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 3:** by Yuke, Roberto and Sajjad in Mountain View, CA (June, 2019)<br>
[Previous episodes](/tags/chromium-chronicle/)

Tests are critical because they find bugs and regressions, enforce better
designs and make code easier to maintain. Code coverage helps you ensure
your tests are thorough.

Chromium CLs can show a line-by-line breakdown of test coverage. You can
use the code coverage trybot to ensure you only submit well-tested code.

To see code coverage for a Chromium CL, trigger the code coverage trybot
*linux-coverage-rel*:

{% Columns %}
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/Z9UKBlA67VrGcR1sxNpn.png", alt="", width="745", height="28" %}
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/p4L6k3hEN6j4kvMgsbAs.png", alt="", width="745", height="28" %}
{% endColumns %}

Once the build finishes and code coverage data is processed successfully,
look at the right column of the side by side diff view to see coverage
information:

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/wUaY6ZViX5BWxUBIOPz7.jpg", alt="", width="360", height="190" %}

The code coverage tool currently supports C/C++ code for Chrome on Linux;
support for more platforms and more languages is in progress.

The code coverage trybot has been rolled out to a 10% experiment, and once
we're more comfortable in its stability, we plan to enable it by default and
expand it to more platforms.

## Learn More

Want to learn more? Check out the coverage in Gerrit [demo CL][demo-cl]
and play around with code coverage in Gerrit, or see the full
[codebase coverage dashboard][dashboard], broken down by directories and components.

## Share your feedback

Have any feedback? Contact code-coverage@chromium.org or [file a bug][file-bug].

[demo-cl]: https://chromium-review.googlesource.com/c/chromium/src/+/1455344
[dashboard]: https://analysis.chromium.org/p/chromium/coverage
[file-bug]: https://bugs.chromium.org/p/chromium/issues/entry?labels=Pri-3&status=Unconfirmed&components=Tools%3ECodeCoverage&comment=what%27s%20the%20bug%20or%20feature?
