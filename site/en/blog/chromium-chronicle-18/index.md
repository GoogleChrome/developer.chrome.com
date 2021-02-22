---
title: "The Chromium Chronicle #18: Chromium Code Coverage"
description: >
  Test coverage measures how much source code is executed when a particular
  test suite runs.
layout: 'layouts/blog-post.njk'
date: 2021-02-22
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 18:** by Veenita Joshi and Prakhar Asthana in
Mountain View, CA (February 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

**Test coverage measures how much source code is executed** when a particular
test suite runs. Generating coverage data has three major steps: compiling
with instrumentation, gathering data from running instrumented tests, and
post-processing the data. The coverage team has tools to automate this process.

The [Coverage script][1] **can generate code coverage reports in just one command**,
without waiting for [Gerrit UI to be updated](/blog/chromium-chronicle-3/).
This script is currently supported on Linux, Mac, iOS and ChromeOS.

Here is a sample usage:

```shell
$ gn gen out/coverage \
    --args='use_clang_coverage=true is_component_build=false'
$ python tools/code_coverage/coverage.py \
    crypto_unittests url_unittests \
    -b out/coverage -o out/report \
    -c 'out/coverage/crypto_unittests' \
    -c 'out/coverage/url_unittests --gtest_filter=URLParser.PathURL' \
    -f url/ -f crypto/
```

This builds and runs the `crypto_unittests` and `url_unittests targets`. For
`url_unittests`, it only runs the test `URLParser.PathURL`. The coverage
report is filtered to include only files and sub-directories under `url/`
and `crypto/`. Aside from automating the process, **this script provides
additional features to view code coverage by directories and components**.

{% Columns %}

{% Column %}
{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/so1zrd3pzjk0SO9lu7jQ.png", alt="Screenshot of output from coverage script.", width="800", height="161" %}
Directory View
{% endColumn %}

{% Column %}
{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/I1c23lIHLlbsciym2aX4.png", alt="Screenshot of output from coverage script.", width="800", height="161" %}
Component View
{% endColumn %}

{% endColumns %}

The [Code Coverage tool][2] provides a code coverage breakdown by directory
and component for the whole codebase, for Windows, iOS, Android, Linux and
Chrome OS.

**Share your feedback:** Contact `code-coverage @ chromium.org` or file a bug
on [crbug.com][3].

## Resources

* See the [code coverage for the whole codebase][4] and a breakdown by
  directories and components.

[1]: https://chromium.googlesource.com/chromium/src/+/master/tools/code_coverage/coverage.py
[2]: https://analysis.chromium.org/p/chromium/coverage/dir?host=chromium.googlesource.com&project=chromium/src&ref=refs/heads/master&revision=fda1eab599aa18a4731275a74385c13d546bb7f6&path=//this/path/is/set/&platform=linux
[3]: https://bugs.chromium.org/p/chromium/issues/entry?labels=Pri-3&status=Unconfirmed&components=Infra%3ETest%3ECodeCoverage&comment=what%27s+the+bug+or+feature%3F
[4]: https://analysis.chromium.org/p/chromium/coverage
