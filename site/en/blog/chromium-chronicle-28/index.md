---
title: "The Chromium Chronicle #28: Getting started with Chrome on iOS"
description: >
  Learn how to work with the code behind Chrome's iOS app.
layout: 'layouts/blog-post.njk'
date: 2022-02-01
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  The Chromium Chronicle
tags:
  - chromium-chronicle
---

**Episode 28:** by Mark Cogan in Paris, France (January, 2022)<br>
[Previous episodes](/tags/chromium-chronicle/)

In 2022, Chrome on iOS will celebrate its 10th anniversary. 
Chrome is one of the most widely used iOS apps&mdash;it's currently the number 2 Utility app in the US App Store. 

Chrome on iOS provides all of the great Chrome features our users love, including Sync, Translate, Incognito, Password Manager, Autofill, and many more. 
Chrome on iOS also integrates with native iOS features such as multi-window and device-wide password autofill. 

However, there's one major thing that makes Chrome on iOS very different from all other Chrome platform implementations.

Chrome on iOS doesn't use Blink. 

Because of Apple's App Store rules, Chrome on iOS has to use the iOS platform APIs for fetching and rendering web content. So Chrome on iOS uses WebKit, Nitro and CFNetwork where other Chrome platforms are using Blink, V8 and `//net`. Due to this, and the limited API available for iOS apps to interact with web page content, many Chrome features that use the `//content` APIs are implemented in Chrome on iOS using JavaScript injection. 

Cross-platform features in `//components` are structured to share as much code as possible across all platforms while keeping `//content` dependencies siloed:

```bash
ls components/some_component

content/        # code with dependencies on //content.
core/           # cross-platform code with no //content dependencies.
ios/            # iOS implementation using JavaScript injection.
```

Other important differences between Chrome on iOS and other platforms include:

- iOS apps are required to be single-process, so Chrome on iOS can't [`fork()`](https://en.wikipedia.org/wiki/Fork_(system_call)).
- Chrome on iOS is written in Objective-C++ (a mix of C++ and Objective-C), along with some Swift.
- While you can compile and run Chrome on iOS directly on an iOS device, you can also do a lot of feature development in the quite capable device simulator that Apple provides.

## Get started with Chrome on iOS

You will need:

- A macOS computer, 64-bit, running macOS 11.3 or higher. Apple Silicon is supported.
- Xcode, the IDE for Apple platforms, version 13.0 or higher.
- The current version of the JDK.

See the [build instructions](https://chromium.googlesource.com/chromium/src/+/main/docs/ios/build_instructions.md) for more information.

Fetching the source is much like other platforms:

```bash
mkdir ${HOME}/chromium-ios
cd ${HOME}/chromium-ios
fetch ios
```

After that, you can build from the command line (or from Xcode):

```bash
autoninja -C out/Debug-iphonesimulator chrome
```
## Learn more about Chrome on iOS feature development

We encourage you to refer to the [Chromium style guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md). Read [Apple's developer documentation](https://developer.apple.com/) to learn more about Swift, xCode, and other iOS-specific resources.

If you're typically an iOS developer and new to Chromium, refer to the [documentation on important abstractions and data structures](http://dev.chromium.org/developers/coding-style/important-abstractions-and-data-structures).

