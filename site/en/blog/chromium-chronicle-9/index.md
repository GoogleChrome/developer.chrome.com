---
title: "The Chromium Chronicle #9: ClusterFuzz"
description: >
  You may find you are asked to fix high-priority security bugs discovered by
  ClusterFuzz. What is it? Should you take those bugs seriously? How can you
  help?
layout: 'layouts/blog-post.njk'
date: 2019-12-13
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 9:** by Adrian Taylor in Mountain View (December, 2019)<br>
[Previous episodes](/tags/chromium-chronicle/)

You may find you are asked to fix high-priority security bugs discovered by
ClusterFuzz. What is it? Should you take those bugs seriously? How can you
help?

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/YAtzVlCiCpI5kX6IfgJ3.png", alt="Fuzzing flow chart", height="108", width="681" %}

**ClusterFuzz feeds input to Chrome and watches for crashes.** Some of those
Chrome builds have extra checks turned on, for example [AddressSanitizer][go-asan],
which looks for memory safety errors.

ClusterFuzz assigns components based on the crash location, and **assigns
severity based on the type of crash and whether it happened in a sandboxed
process**. For example, a heap use-after-free will be high severity, unless
it's in the browser process, in which case it's critical (no sandbox to limit
impact!):

```cpp
class Foo {
  Widget* widget;
};

void Foo::Bar() {
  delete widget;
  ...
  widget->Activate();  // Bad in the renderer process, worse in the
                       // browser process. Obviously, real bugs are
                       // more subtle. Usually.
```

ClusterFuzz generates input from fuzzers or from bugs submitted externally.
Some fuzzers are powered by [libFuzzer][go-libfuzzer], which evolves input to
increase code coverage. Some understand the grammar of the input language
converted into `protobufs`. Once ClusterFuzz finds a crash, it will try to
**minimize the input test case and even bisect to find the offending commit**.
It finds a lot...

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/7KdI3HXVypDiK7GJZ3Gf.png", alt="", className="float-left", height="430", width="800" %}

You can help:

* Be paranoid about object lifetimes & integer overflows.
* Add new fuzzers, especially when you process untrustworthy data or IPC (see
  links below, often < 20 lines of code).
* Fix ClusterFuzz-reported bugs: its **severity heuristics can be trusted because
  they're based on real-world exploitability**: Even a
  [single byte overflow][go-onebyte] has led to arbitrary code execution by an
  attacker.

## Resources

* [Fuzz testing in Chromium][go-fuzz-in-cr]: How to add new fuzzers to
  ClusterFuzz for new data formats, or just because you want the credit of
  finding awesome vulns.
* [Chrome Fuzzer Program Update and How-To][go-cr-fuzz-pgm]: Fuzzers are also
  written by external contributors. Hear about their experience and how easy
  it can be to get started.

[go-asan]: https://github.com/google/sanitizers/wiki/AddressSanitizer
[go-libfuzzer]: https://llvm.org/docs/LibFuzzer.html
[go-onebyte]: https://googleprojectzero.blogspot.com/2016/12/chrome-os-exploit-one-byte-overflow-and.html
[go-fuzz-in-cr]: https://chromium.googlesource.com/chromium/src/+/master/testing/libfuzzer/README.md
[go-cr-fuzz-pgm]: https://security.googleblog.com/2019/07/chrome-fuzzer-program-update-and-how-to.html
