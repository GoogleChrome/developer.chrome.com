---
title: "The Chromium Chronicle #20: Benchmarking Test Harnesses"
description: >
  Adding benchmarks is an easy way to prevent performance regressions and
  help improve performance.
layout: 'layouts/blog-post.njk'
date: 2021-04-30
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 20:** by John Chen in Bellevue, WA (April, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Speed is one of Chrome's four core principles. **Adding benchmarks is an
easy way to prevent performance regressions and help improve performance
over time.** Good Benchmarks have a fast iteration cycle, can catch
performance regressions much earlier than UMA, and are great for measuring
a new feature's performance.

**Benchmarks run regularly in the lab.** When a regression is found, [`bisect`][bisect]
automatically finds the culprit CL and assigns a bug to the CL owner.

**Chrome benchmarks combine sequences of web page interactions (called
stories) with performance measurements.** Similar cases are grouped into
benchmark harnesses. New benchmarks usually fit into one of the
[existing harnesses](http://bit.ly/chrome-benchmark-harnesses):

{% Columns %}

{% Column %}

* System Health
* Loading
* Memory
* Rendering
* Power
* Startup

{% endColumn %}
{% Column %}

* V8 Runtime
* Media
* WebRTC
* Press
* Blink Perf

{% endColumn %}
{% endColumns %}

**The Telemetry framework replays recorded stories to simulate user
interactions with Chrome while collecting traces that record Chrome
activities.** After the stories finish, the framework runs various performance
metrics to analyze the traces and calculates performance results.

You can cover most new performance test cases in Chrome by adding a new story,
using an existing metric within one of the existing harnesses. You can also
collect additional traces and add more metrics to existing benchmarks or pass
additional flags to the browser.

Use Blink Perf for one-off cases that don't fit into other harnesses. In
Blink Perf, you can measure trace events on one-off pages.

**Keep your benchmark stories simple** and only include the minimal set of
interactions needed to complete your scenario. If a test case is complex, it
may be hard to automate or it may be flaky.

Limit your tests to the smallest number that cover the most important use
cases. The benchmarking infrastructure is expensive to maintain. See
[Chrome Speed Devices][chrome-speed-devices] for a list of supported hardware.

**There is more than one way to measure performance.** Telemetry-based
benchmarks control Chrome from an external process, and this does not always
offer the level of control needed. As an alternative, gtest-based benchmarks
allow test code to share the same process as Chrome code. You may also
consider other performance tools, such as using UMA to measure performance
on users' devices instead of in the lab.

Want to learn more about Chrome benchmarking? Contact telemetry@chromium.org.

## Additional resources

* Get more information on how to start authoring a [new benchmark][new-bmp].
* Need more help figuring out [where your use case fits][cr-bm]? Contact us
  before you get too far in authoring the test.

[chrome-speed-devices]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/speed/perf_lab_platforms.md
[new-bmp]: https://docs.google.com/document/d/1ni2MIeVnlH4bTj4yvEDMVNxgL73PqK_O9_NUm3NW3BA
[cr-bm]: https://groups.google.com/a/chromium.org/g/telemetry
[bisect]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/speed/bisects.md
