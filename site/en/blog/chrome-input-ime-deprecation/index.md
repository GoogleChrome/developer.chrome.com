---
title: chrome.input.ime deprecation on ChromeOS
description: >
  chrome.input.ime is being deprecated and will be removed no earlier than ChromeOS 119.
layout: layouts/blog-post.njk
authors:
  - samrichard
date: 2023-08-21
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/8ayEOa5luIniBq7RxKkC.png'
alt: ''
tags:
  - extensions-news
---

On July 18, we [announced](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/0ybWrEVaE-I/m/8QOeRmxrBQAJ) we were ending support for [`chrome.input.ime⁠`](/docs/extensions/reference/input_ime/) on ChromeOS as of ChromeOS 117, scheduled for September. After conversations with the developer community, we’ve pushed back the removal of `chrome.input.ime` to ChromeOS 119 at the earliest. We hope that this lengthier timeline will give you adequate time to notify your users and clients of the upcoming change.

Many of you reported that you’re using this API for a wide variety of interesting use cases. During the extra time before we remove this API, we want to hear from you. Fill out our [developer interest form](https://forms.gle/wPUjwhLgLnqvsqDG6)⁠ and tell us what you use the `chrome.input.ime` API for, including IME in your feedback. We’ll use your feedback to help us design future APIs for ChromeOS and determine how to proceed with this API.

## Why are we deprecating this?

`chrome.input.ime` is a bit of an outlier of a Chrome extensions API. It was formerly a semi-cross-platform API, having been launched only on Windows, Linux, and ChromeOS, but was deprecated on Windows and Linux in 2020 due to security issues sent to Google. IMEs provided by the API are particularly privileged because they have the ability to record and trigger keystrokes. On a Chromebook, they’re even more privileged; on Windows and Linux, IMEs were confined to the browser, but on ChromeOS, they work across the whole operating system. In tablet mode, IMEs can even create a virtual keyboard, potentially giving them access to sensitive data like passwords. When evaluating other options at the time, we decided that other platforms had better options for creating IMEs than a Chrome extension, so we deprecated them there. On ChromeOS, because this was the only option, we decided to keep it.

As we worked this year to upgrade ChromeOS’s browser architecture, we re-evaluated whether this API should be included as it has been in maintenance mode since that original deprecation decision. While there still isn’t an alternative for IMEs, in the three years since the cross-platform deprecation decision was made, usage of this API on ChromeOS has remained extremely low. The low usage, combined with the potential security and privacy issues of the original deprecation, led to our decision to deprecate this API.

## What happens next?

We want to include you, our developers, in shaping the ChromeOS platform into an experience where you can thrive. While we know this will affect our developers and users who rely on it, deprecating the existing `chrome.input.ime` API lets us focus on providing improved input-related APIs that our developers need. To help us do so, please fill out our [developer interest form](https://forms.gle/wPUjwhLgLnqvsqDG6)⁠ and tell us what you use the `chrome.input.ime` API for. We look forward to working with you to improve ChromeOS’s developer platform.

