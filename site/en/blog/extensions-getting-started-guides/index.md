---
title: "A new way to Get Started with Chrome Extension Development"
description: >
  TBA
layout: "layouts/blog-post.njk"
authors:
  - amysteam
date: 2022-09-25
hero: 'image/BhuKGJaIeLNPW9ehns59NfwqKxF2/9mMec0BTzXrg4uMqJF63.jpg'
alt: ''
tags:
  - extensions
---

In this post, we're excited to share some significant improvements to the Chrome extensions Getting Started experience and a few ways you can be part of this dream.

## The old guide {: #former-guide }

Previously, the Chrome Extension Getting Started tutorial was a basic extension example that would change the background color of the current page by clicking on a button in the extension popup. It also included an options page where you could pick one of four colors.

The thought was to teach a variety of core extension concepts and development workflow in a single tutorial while also providing a real-world example. This proved to be an ambitious endeavor.

## A new approach {: #new-guides }

 We know developers rely on our documentation to begin their Chrome extension learning journey, and our goal is to provide a path that is accessible, beginner-friendly, and relevant.

Instead of trying to improve the existing tutorial example, we decided to start from scratch. We researched the most frequently asked questions that developers had when creating their first Chrome extension and came up with the following set of documents.

Introducing the new and improved Getting Started collection:

### A few essentials {: #conceptual }

[Extensions 101][doc-ext-101]

: Briefly covers some fundamental concepts of Chrome Extension development like web technologies and most commonly used extension components. In addition, it includes what to be aware of when designing and distributing an extension in the Chrome Web Store. 

[Development Basics][doc-dev-basics]

: Introduces the extension development workflow by creating a _Hello, Extensions_ example. It walks through loading the extension during development, locating logs and errors, choosing a project structure, and using Typescript.

### The tutorials {: #tutorials }

These tutorials not only teach you how to build real-world extensions but also strive to share development tips and best practices. In addition, using these extensions will improve your experience while reading the extension documentation.

[Reading time][tut-reading-time]

: It’s nice to know how much time we need to finish reading an article. Reading time teaches you how to insert an element containing the estimated reading time on every extension documentation page.

[Focus Mode][tut-focus-mode]

: Removing extra clutter from a page allows our minds to concentrate on the most relevant information. Focus Mode demonstrates how to change the style of the page and hide a few distracting elements.

[Tabs Manager][tut-tabs-manager]

: While researching extension development you can end up with many documentation tabs across multiple windows.
Learn how to organize your Chrome extension and Chrome Web store documentation tabs with this Tabs
Manager.

## What to expect {: #sections }

Each tutorial includes the following sections:
- The task the extension will perform. 
- The lessons that will be covered.
- What you need to know before starting.
- Step-by-step instructions to build the extension. 
- How to load and test the extension.

In addition, If you are up for a challenge, we include a section with ideas on how to customize or add other features to your extension.

## We want your help {: #help-wanted }

We are excited to hear from you! There are two ways you can contribute to the new Getting Started Guides:

### Improve the existing tutorials {: #report-issues }

If you see something wrong or unclear in the Getting Started guides, please reporting a bug on our [Github repository][github-ext-doc-issue].

### Request a beginner tutorial {: #request-tutorial }

If you have an idea for another beginner tutorial, you can let us know by following these steps:
- Create an issue on the [Github repository][github-ext-doc-issue].
- Choose “New extension guide request”.
- Fill out and submit the form.

We think this new getting started guide is a big improvement over the old one, but we're not stopping here; we'll keep working to improve and expand our documentation to better serve all extension developers. We're excited to continue collaborating with the extension developer community.

[doc-ext-101]: /docs/extensions/mv3/getstarted/extensions-101
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[github-ext-doc-issue]: https://github.com/GoogleChrome/developer.chrome.com/issues/new/choose
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager

