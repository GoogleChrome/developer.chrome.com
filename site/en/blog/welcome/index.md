---
title: Welcome to the new developer.chrome.com!
description: Announcing a revamp of the site, and a summary of our plans for 2021.
layout: 'layouts/blog-post.njk'
date: 2020-12-04
authors:
  - samthorogood
  - robdodson
  - kaycebasques
hero: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'
alt: >
  An illustration featuring household items like a coffee cup, a
  book, and a toolbox, each with the Chrome logo on it.
---

Today, we're happy to announce a revamp of the developer.chrome.com documentation site. Google
Chrome was originally released in 2008, and this domain dates from about the same time—with the last
major update back in 2012.

developer.chrome.com will remain as the home of Chrome's Extension and Web Store documentation. Over
the coming weeks and months, we'll also be bringing a variety of new and migrated Chrome-specific
content to the domain: including the popular "What's new in Chrome" series and the DevTools
documentation.

We'd also love for you to keep up with content by subscribing to this site in your favourite RSS
reader. 📶

## Chrome releases

developer.chrome.com aims to be your central source for information related to
each new Chrome release. While fairly spartan for now, our [Tags page](/tags/)
lists information tagged with the relevant upcoming Chrome release—we'll be
including articles on major changes that will affect you if you're specifically
targeting Chrome. This might include changes to Chrome's extensions APIs, or a
change in the way Chrome works relative to other browsers or web standards
themselves.

## Extensions

Chrome Extensions are undergoing rapid changes around 2020-21. We're introducing Manifest V3, a new
format for your extension's manifest.json file. Along with this comes new capabilities such as the
`declarativeNetRequest` API, a fast, rule-based way to operate on a user's network requests;
background service workers, which will replace background pages; and promise support for appropriate
callback-based methods.

We're also now publishing an automatically generated TypeScript Definition file to npm. If you build
a Chrome Extension with tools like VSCode, you can depend on
[chrome-types](https://www.npmjs.com/package/chrome-types) to benefit from autocompletion. This npm
package is published automatically and will pick up changes right from Chromium source.

## Technical notes

From a technical point of view, for most of Chrome's existence, long-form content has lived in the
Chromium repository itself. But by migrating long-form content like guides and information to
GitHub, and converting them from hand-written HTML to Markdown, we aim to remove the barrier to
entry for contributors from the wider Chrome community. These contributions could be filing issues
on our content or pull requests to fix issues you might find. (But if you find an issue with the
browser itself, please continue to file it on crbug.com!)

Chrome has also had a number of APIs come and go. We've built and removed APIs like NaCL and the
Chrome Apps platform. These APIs have had a "successful exit": with modern replacements that make up
part of the open web. While these APIs continue to be documented on the new developer.chrome.com
site—under a clear deprecation notice—we'll be removing their documentation at a time in-line with
the relevant deprecation policies.

Finally, this site used to contain a large number of extension samples. We've also [moved these to
GitHub](https://github.com/GoogleChrome/chrome-extensions-samples), to make them more accessible to
the community.

## Summary

The Chrome browser has undergone a huge number of changes since its first release in 2008—not just
in terms of its features, but also its look and feel. Now it's time for developer.chrome.com to do
the same. We hope you enjoy the new experience!
