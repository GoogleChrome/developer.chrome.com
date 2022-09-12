---
title: Deprecations and removals in Chrome 105
description: >
  A round up of the deprecations and removals in Chrome 105 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2022-08-04
hero: 'image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/ffGHwaPUVn8VxZrnrpzA.png'
alt: >
  Deprecations and Removals hero logo
tags:
  - deprecations-removals
  - chrome-105
---

{% Partial 'see-all-dep-rem.md' %}

Chrome 105 beta was released on August 4, 2022 and is expected to become the stable version in late August, 2022.

## Remove Web SQL in non-secure contexts

Web SQL in non-secure contexts is deprecated and developers trying to use the feature under these circumstances will see a warning in the Issues panel. The Web SQL Database standard was first proposed in April 2009 and abandoned in November 2010. Gecko never implemented this feature and WebKit deprecated it in 2019. The W3C encourages [Web Storage](https://developer.mozilla.org//docs/Web/API/Web_Storage_API) and [IndexedDB](https://developer.mozilla.org//docs/Web/API/IndexedDB_API) for those needing alternatives.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/unDM9iaTcPDbedQ3dL84.png", alt="Chrome DevTools Issues panel with a warning that reads Web SQL in non-secure contexts is deprecated and will be removed in M107. Please use Web Storage or Indexed Database.", width="800", height="158" %}

Developers should expect that Web SQL itself will be deprecated and removed when usage is low enough.

## CSS default keyword is disallowed in custom identifiers

The CSS keyword ['default' is no longer allowed](https://chromestatus.com/feature/5096490737860608) within CSS custom identifiers, which are used for many types of user-defined names in CSS (for example, names created by `@keyframes` rules, counters, `@container` names, custom layout or paint names). This adds `'default'` to the list of names that are restricted from use in custom identifiers, specifically `'inherit'`, `'initial'`, `'unset'`, `'revert'`, and `'revert-layer'`.

## Deprecations in the Navigation API

The `transitionWhile()` and `restoreScroll()` methods are also deprecated in this release, and we expect to remove them in 108. Developers who need this functionality should use the new `intercept()` and `scroll()` methods. For explanations of the problems with the existing methods and examples of using the new, see [Changes to NavigateEvent](/blog/navigateevent-intercept/).

## Deprecate non-ASCII characters in cookie domain attributes

To align with the latest spec ([RFC 6265bis](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis/#section-5.5)), [Chromium will soon reject](https://www.chromestatus.com/feature/5534966262792192) cookies with a "Domain" attribute that contains a non-ASCII character (for example, Domain=éxample.com).
Support for IDN domain attributes in cookies has been long unspecified, with Chromium, Safari, and Firefox all behaving differently. This change standardizes Firefox's behavior of rejecting cookies with non-ASCII domain attributes.

Since Chromium has previously accepted non-ASCII characters and tried to convert them to normalized punycode for storage, we will now apply stricter rules and require valid ASCII (punycode if applicable) domain attributes.

A warning is printed to the console starting in 105. Removal is expected in 106.

## Remove Gesture Scroll DOM Events

The gesture scroll DOM events [have been removed from Chrome](https://chromestatus.com/feature/5166018807726080), specifically, `gesturescrollstart`, `gesturescrollupdate` and `gesturescrollend`. These were non-standard APIs that were added to Blink for use in plugins, but had also been exposed to the web. 

{% Partial 'deprecations-policy.md' %}
