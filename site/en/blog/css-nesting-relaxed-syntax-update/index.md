---
layout: layouts/blog-post.njk
title: CSS nesting relaxed syntax update
description: >
  Lookahead nesting enabled in Chrome 120.
subhead: >
  Lookahead nesting enabled in Chrome 120.
date: 2023-11-09
authors:
  - argyle
tags:
  - css
  - chrome-120
hero: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/IlxIDvyAMRQaOOPPqjSR.jpg
thumb: image/vS06HQ1YTsbMKSFTIPl2iogUQP73/3hB9DeRjr3dMLITVPPIJ.png
alt: >
  a bird's nest in the grass next to a body of water
---

Earlier this year Chrome shipped [CSS
nesting](/articles/css-nesting/) in 112, and it's
now in each major browser.

{% BrowserCompat 'css.selectors.nesting' %}

However, there was one strict and potentially unexpected requirement to the
syntax, listed in the first article of the [invalid nesting
examples](/articles/css-nesting/#invalid-nesting-examples).
This follow up article will cover what has changed in the spec, and from Chrome
120.

## Nesting element tag names

One of the most surprising limitations in the first release of CSS nesting
syntax, was the inability to nest bare element tag names. This inability has
been removed, making the following CSS nesting valid:

```css
.card {
  h1 {
    /* this is now valid! */
  }
}

/* the same as */
.card {
  & h1 {
    /* this is now valid! */
  }
}
```

This becomes really sweet when nesting ordered, unordered or definition lists:

```css
dl {
  dt {
    /* dl dt styles */
  }

  dd {
    /* dl dd styles */
  }
}
```

### What changed to allow this nesting?

It's largely thanks to some exploring and prototyping by Chrome engineers,
combined with the desire from the community and CSS Working Group.

There was a decent amount of doubt that the CSS parser could be taught to
differentiate between a tag name (`div`) and a property name (`visibility`) as
the parser currently has no concept of looking ahead. To understand that the
token is a property, the browser needs to look ahead and see if a `:` follows
the unknown token. Therefore, in the original spec, the `&` symbol was used to
indicate to the browser that what follows was nested, and not a regular CSS
property and value.

Fortunately, an engineer discovered that when the parser failed to parse the
nested selector as a property as per the normal consumption pass, it could be
restarted in a mode that assumed a selector instead of a property. Parsing
resumes, acknowledging the nesting as selector nesting. It's fast enough and
reliable enough that it was determined sufficient enough to release the syntax.
