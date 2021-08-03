---
title: Deprecations and removals in Chrome 91
description: >
  A round up of the deprecations and removals in Chrome 91 to help you plan.
layout: 'layouts/blog-post.njk'
date: 2021-05-07
alt: >
  Deprecations and removals hero logo
tags:
  - deprecations
  - removals
  - chrome-91
---

{% include 'partials/see-all-dep-rem.md' %}

Chrome 91 beta was released on April 22, 2021 and is expected to become the
stable version in late May, 2021.

## Remove alert(), confirm(), and prompt() for cross origin iframes

Chrome allows iframes to trigger Javascript dialogs. For example it shows "<URL>
says ..." when the iframe is the same origin as the top frame, and "An embedded
page on this page says..." when the iframe is cross-origin. This is confusing,
and has led to spoofs where sites pretend the message comes from Chrome or a
different website.

Chrome 91 deprecates this ability. [Removing
support](https://chromestatus.com/feature/5148698084376576) for cross origin
iframes' ability to call `alert()`, `confirm()`, and `prompt()` will prevent
this kind of spoofing, and unblock further UI simplifications. For example, this
means notexample.com will no longer be able to call `window.alert()`,
`window.prompt()`, or `window.confirm()` if embedded in an iframe on
example.com.

{% include 'partials/deprecations-policy.md' %}
