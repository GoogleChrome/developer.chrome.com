---
title: Improving user privacy by requiring opt-in to send X-Requested-With header from WebView
description: >
  We want to protect user privacy by limiting when the X-Requested-With header is sent.
layout: 'layouts/blog-post.njk'
date: 2023-03-13
authors:
  - pbirk
hero: 'image/VbsHyyQopiec0718rMq2kTE1hke2/LNiRMeNkUXQw6EBKwJw9.jpg'
alt: >
  Choices, as represented by signs, at sunset.
tags:
  - privacy
---

When a user installs and runs an application that uses a WebView to embed web content, the WebView will add the X-Requested-With header on every request sent to servers, with a value of the application APK name. It is then left to the receiving web server to determine if and how to use this information.

We want to protect the user's privacy by only sending this header on requests if the app developer explicitly opts in to share with services embedded within the WebView. We are introducing new and purpose-built methods of client attestation that solve important safety use cases in a privacy-sensitive manner.

You can read more about why we're making this change and how it works over at the Android Developer's Blog in [Improving user privacy by requiring opt-in to send X-Requested-With header from WebView](https://android-developers.googleblog.com/2023/02/improving-user-privacy-by-requiring-opt-in-to-send-x-requested-wih-header-from-webview.html).
