---
title: "The Chromium Chronicle #7: Preprocessing Source"
description: >
  Compiling a single Chromium source file by hand can help developers
  experiment with compiler optimization options, understand subtle macro
  details, or minimize a compiler bug. This month, we take a look at how to
  preprocess source.
layout: 'layouts/blog-post.njk'
date: 2019-10-24
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 7:** by Bruce Dawson in Seattle, WA (October, 2019)<br>
[Previous episodes](/tags/chromium-chronicle/)

Sometimes it is helpful **to compile a single Chromium source file by hand**,
perhaps to experiment with compiler optimization options, to preprocess it
to a single file to understand some subtle macro details, or to minimize a
compiler bug.

A few tricks will let a Chromium developer find and execute the command that
compiles a particular source file, with modifications as needed.

Start by going to your output directory and using autoninja (or ninja) to
**compile the file of interest** (and any dependencies) **using the `^` suffix**.
This suffix tells ninja to build the output of the specified `file—version.o`
in this case. Then, touch the file, and **compile it (and only it) again with
the `-v` (verbose) flag** to ninja:

On Linux or OSX:

```bash
autoninja ../../base/version.cc^
touch ../../base/version.cc
autoninja -v ../../base/version.cc^
```

In the Windows cmd shell `^` is a special character and must be escaped:

```bash
C:\> autoninja ../../base/version.cc^^
C:\> touch ../../base/version.cc
C:\> autoninja -v ../../base/version.cc^^
```

Typical output of the `autoninja -v` command looks like this (significantly
trimmed):

```bash
..\..\third_party\llvm-build\Release+Asserts\bin\clang-cl.exe /nologo /showIncludes -imsvc ...
```

This command allows you to compile the file of interest. To get the preprocessed
output, use the following steps:

**On Linux or OSX, remove the `-o obj/base/base/version.o` block from the end,
and add `-E`**. This tells the compiler to print the preprocessed file to
stdout.

Redirect the output to a file, like this:

```bash
../../third_party/llvm-build/Release+Asserts/bin/clang++ -MMD ... -E >version.i
```

**On Windows, remove the `/showIncludes` option** from the beginning (it prints
a line of output for each `#include`) **and then add `/P`** in order to
preprocess the file instead of compiling it. The results will be saved in the
current directory in `version.i`:

```bash
..\..\third_party\llvm-build\Release+Asserts\bin\clang-cl.exe /nologo -imsvc ... /P
```

Now you can examine the preprocessed file to see what the macros are actually doing,
or make experimental compiler-switch changes and recompile to see what happens.

## Additional Resources

* [Fast Chrome Builds][fast-chrome-builds]: For more build-optimization tips
  (focused on Windows).
* [ETW][etw]: Find out how to find Windows performance problems—in Chrome
  or in the build—by reading the ETW (also known as Xperf) docs.

[fast-chrome-builds]: https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#Faster-builds
[etw]: https://randomascii.wordpress.com/category/xperf/
