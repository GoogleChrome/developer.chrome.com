---
layout: 'layouts/blog-post.njk'
title: Manage hyphens with CSS
description: >
    Chrome 55 implements the hyphens property to control when soft hyphens appear and how they behave.
authors:
  - joemedley
date: 2016-10-21
updated: 2016-10-21
---


In many written languages, it's possible to break lines between syllables as
well as between words. This is often done so that more characters may be placed
on a line of text with the goal of having fewer lines in a text area, and thus
saving space. In such languages the break is indicated visually with a hyphen
('-').

The [CSS Text Module Level 3](https://drafts.csswg.org/css-text-3) defines a
hyphens property to control when hyphens are shown to users and how they behave
when shown. Starting with version 55, Chrome implements the hyphens property.
Per the specification, the hyphens property has three values: `none`, `manual`,
and `auto`. To illustrate this we need to use a soft hyphen (`&shy;`) as in the
following example.

```html
Google ipsum dolor sit amet, consectetur adipiscing e&shy;lit.
```

A soft hyphen is one that will only be shown when it occurs at the trailing
margin. How this hyphen renders in Chrome 55 or later depends on the value of
the CSS `hypens` property.

```css
-webkit-hyphens: manual;
hyphens: manual;
```

Combining these gives a result like this:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/IFOOgGqWXSwGzQUjgOub.png", alt="Single line screenshot", width="800", height="59" %}
</figure>

Notice that the soft hyphen isn't visible. In all cases, when a word containing
the soft hyphen fits on a single line, the hypen will be invisible. Now, let's
look at how all three values of hyphen behave.

{% Aside %}
The following examples contain working CSS. But you won't be able to see
it functioning unless you use a [supporting browser](http://caniuse.com/#feat=css-hyphens).
This same code is also available in a [downloadable example](https://googlechrome.github.io/samples/css-hyphens/index.html).
{% endAside %}


## Using none

In the first example, the hyphens property is set to `none`. This prevents the
soft hyphen from ever being displayed. You can confirm this by adjusting the
window size so that the word 'elit' will not fit in the visible line of text.

<style>
div.example {
  font: 18px serif;
  margin-bottom: 2.5%;
  background-color: #e1f5fe;
}

div.none {
   -webkit-hyphens: none;
   hyphens: none;
}
</style>
<div class="none example">
  Google ipsum dolor sit amet, consectetur adipiscing e&shy;lit.
</div>

## Using manual

In the second example, the hyphens property is set to `manual` meaning the soft
hyphen will only appear when the margin breaks the word 'elit'. Again, you can
confirm this by adjusting the window size.

<style>
div.example {
  font: 18px serif;
  margin-bottom: 2.5%;
  background-color: #e1f5fe;
}

div.manual {
   -webkit-hyphens: manual;
   hyphens: manual;
}
</style>
<div class="manual example">
  Google ipsum dolor sit amet, consectetur adipiscing e&shy;lit.
</div>

## Using auto


In the third example, the hyphens property is set to `auto`. In this case, no
soft hyphen is needed since the user agent will determine hyphen locations
automatically. If you resize the window, you'll see that the browser hyphenates
this example in the same place as in the second, though no soft hyphen is
present. If you continue to shrink the window, you'll see that your browser is
able to break lines between any two syllables in the text.

<style>
div.example {
  font: 18px serif;
  margin-bottom: 2.5%;
  background-color: #e1f5fe;
}

div.auto {
   -webkit-hyphens: auto;
   hyphens: auto;
}
</style>
<div class="auto example">
  Google ipsum dolor sit amet, consectetur adipiscing elit.
</div>

