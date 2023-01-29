---
# Required
layout: 'layouts/blog-post.njk'
title: New syntax for range media queries in Chrome 104
description: >
  Find out how this new syntax can streamline media queries.
subhead: >
  Find out how this new syntax can streamline media queries.
date: 2022-06-16
authors:
  - rachelandrew
tags:
  - css
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/iEJSP53ORdmspFCpJBIJ.jpg'
alt: >
  Three measures.
---
Media Queries enabled [responsive design](https://web.dev/learn/design/), and the range features that enable testing the minimum and maximum size of the viewport are used [by around 80% of sites](https://almanac.httparchive.org/en/2021/css#media-features-in-use) that use media queries. The Media Queries Level 4 specification includes a new syntax for these range queries.

{% BrowserCompat 'css.at-rules.media.range_syntax' %}

The new syntax has been available in Firefox since Firefox 63, and will be available in Chrome from 104. Let’s take a look at how it can streamline your queries. 

A typical media query testing for a minimum viewport width, would be written as follows:

```css
@media (min-width: 400px) {
  // Styles for viewports with a width of 400 pixels or greater.
}
```

The new syntax allows for the use of a comparison operator:

```css
@media (width >= 400px) {
  // Styles for viewports with a width of 400 pixels or greater.
}
```

Testing for a maximum width:

```css
@media (max-width: 30em) {
  // Styles for viewports with a width of 30em or less.
}
```

And, the version using the level 4 syntax:

```css
@media (width <= 30em) {
  // Styles for viewports with a width of 30em or less.
}
```

This syntax has the potential to streamline queries, in particular when testing between two widths. In the following example, the media query tests for a viewport with a minimum width of 400px, and a maximum width of 600px.

```css
@media (min-width: 400px) and (max-width: 600px) {
  // Styles for viewports between 400px and 600px.
}
```

This can be rewritten in the new syntax as:

```css
@media (400px <= width <= 600px )  {
  // Styles for viewports between 400px and 600px.
}
```

The feature that you are testing, in this case `width`, goes between the two values.

In addition to making media queries less verbose, the new syntax has the advantage of accuracy. The `min-` and `max-` queries are inclusive of the specified values, for example `min-width: 400px` tests for a width of 400px or greater. The new syntax allows you to be more explicit about what you mean and avoid the potential of clashing queries.

To use the new range syntax while accounting for browsers that have not yet implemented it, there is a [PostCSS plugin](https://github.com/postcss/postcss-media-minmax) that will rewrite the new syntax to the old in your stylesheets.

Hero image by [William Warby](https://unsplash.com/es/@wwarby?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
