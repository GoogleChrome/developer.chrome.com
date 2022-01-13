---
title: "The Chromium Chronicle #28: Getting started with Bling"
description: >
  Learn how to get started with Bling, Chrome on iOS.
layout: 'layouts/blog-post.njk'
date: 2022-01-25
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 28:** by Mark Cogan in Paris, France (January, 2022)<br>
[Previous episodes](/tags/chromium-chronicle/)

**Bling is Chrome on iOS**. In 2022, Bling will celebrate its 10th anniversary. 
Chrome is one of the most widely used iOS apps—it's currently the number 2 Utility app in the US App Store. 

Bling provides all of the great Chrome features our users love, including Sync, Translate, Incognito, Password Manager, Autofill, and many more. 
Bling also integrates with native iOS features such as multi-window and device-wide password autofill. 

However, there's one major thing that makes Bling very different from all other Chrome platform implementations.

Bling doesn't use Blink. 

Because of Apple's App Store rules, Bling has to use the iOS platform API's for fetching and rendering web content. So Bling uses WebKit, Nitro and CFNetwork where other Chrome platforms are using Blink, V8 and `//net`. Due to this, and the limited API available for iOS apps to interact with web page content, many Chrome features that use the `//content` APIs are implemented in Bling using JavaScript injection. 

Cross-platform features in `//components` are structured to share as much code as possible across all platforms while keeping `//content` dependencies siloed:

```bash
ls components/some_component

content/        # code with dependencies on //content.
core/           # cross-platform code with no //content dependencies.
ios/            # iOS implementation using JavaScript injection.
```

Other important differences between Bling and other platforms include:

- iOS apps are required to be single-process, so Bling can't `fork()`.
- Bling is written in Objective-C++ (a mix of C++ and Objective-C), along with some Swift.
- While you can compile and run Bling directly on an iOS device, it's possible to do a lot in the quite capable device simulator that Apple provides.

Getting started with Bling is easy once you get set up. You will need:

- A macOS computer, 64-bit, running macOS 11.3 or higher. Apple Silicon is supported.
- Xcode, the IDE for Apple platforms, version 13.0 or higher.
- The current version of the JDK.

See the [build instructions](https://chromium.googlesource.com/chromium/src/+/main/docs/ios/build_instructions.md) for more information.

Fetching the source is much like other platforms:

```bash
mkdir ${HOME}/bling
cd ${HOME}/bling
fetch ios
```

After that, you can build from the command line (or from Xcode):

```bash
ninja -C out/Debug-iphonesimulator chrome
```

