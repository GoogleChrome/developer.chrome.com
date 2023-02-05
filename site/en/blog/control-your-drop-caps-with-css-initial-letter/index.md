---
layout: "layouts/blog-post.njk"
title: "Control your drop caps with CSS initial-letter"
description: "Say \"Goodbye\" to interesting workarounds to style your drop caps!"
authors:
  - jheyy
hero: "image/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/lfhUhRIzBKWiCKZvMlkK.jpg"
alt: "Photo of a book opened out on a surface where one of the pages is using a drop cap style."
tags:
  - css
  - html
date: 2023-01-19
---
The art of styling drop caps has been around for hundreds, if not thousands of years. Its use in print styles to signify the start of a new section or chapter can be seen through history. But, it's always been problematic to style in the digital age. There hasn't been a "clean" solution to styling them.

The [CSS `initial-letter` property](https://drafts.csswg.org/css-inline-3/#sizing-drop-initials) will make things much easier.

## Browser support
Where can you try `initial-letter`? It's available in Safari and from Chrome 110. In Safari, the property needs the `-webkit-` prefix. There is an [open issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1223880) for it to be implemented in Firefox.

{% Aside %}
There is also an open Chromium issue detailing the related properties `initial-letter-align` and `initial-letter-wrap` that are still to be implemented as per the CSSWG spec.
{% endAside %}

Test for `initial-letter` support with:

```css
@supports (initial-letter: 1 1) { /* Your supported styles */ }
```

## Current solutions
How might you style a drop cap in CSS today?

The `:first-letter` pseudo-class gets us part of the way.

``` css
p:first-letter {
  color: hsl(220, 94%, 51%);
  font-weight: bold;
  font-size: 4rem;
}
```
{% Codepen {
    user: 'web-dot-dev',
    id: 'qByPXby',
    height: 450,
    tab: 'result'
  }
%}

But then you likely need to reach for properties like "float" whilst calculating a size for that first letter.

```css
p:first-letter {
  color: hsl(220, 94%, 51%);
  font-weight: bold;
  font-size: 4rem;
  float: left;
  line-height: 1;
  margin-right: 0.25rem;
}
```
{% Codepen {
    user: 'web-dot-dev',
    id: 'rNrGzGJ',
    height: 450,
    tab: 'result'
  }
%}

The introduction of new CSS units like `lh` could ease some of this pain. But, these have limited support too (`lh` is currently only supported in Chrome).

```css
p:first-letter {
  color: hsl(220, 94%, 51%);
  font-weight: bold;
  font-size: 3lh;
  float: left;
  line-height: 1;
  margin-right: 0.1lh;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'QWBqMmp',
    height: 450,
    tab: 'result'
  }
%}

## Introducing initial-letter
The `initial-letter` property gives you finer control over this drop cap styling. It takes two space separated values:

```css
p:first-letter {
  initial-letter: 3.5 3;
}
```

- The first argument defines the size of the letter and how many lines it will occupy. The letter will scale up whilst maintaining its aspect ratio.You can’t use a negative value but you can use decimal values.
- The second argument defines the letter sink. This can be thought of as the offset for where the letter will sit. The second value is optional and can’t be negative. If it isn’t present, it assumes the value for the letter size floored to the nearest integer. This is equivalent to using the keyword “drop”. The sink also accepts another keyword value, “raise” which is equivalent to a sink of 1.

Check out this demo where you can change the values to see how it affects the drop cap styling.

{% Video {
    controls: true,
    loop: true,
    src: "video/Dyx9FwYgMyNqy1kMGx8Orz6q0qC3/JlF90JWm0DXgkS6ZiBpD.mp4"
  }
%}

{% Codepen {
    user: 'web-dot-dev',
    id: 'MWBErYp',
    height: 450,
    tab: 'result'
  }
%}

Combine it with `:first-line` and you could have something like this

```css
p:first-line {
  font-variant: small-caps;
  font-weight: bold;
  font-size: 1.25rem;
}
p:first-letter {
  font-family: "Merriweather", serif;
  initial-letter: 3.5 3;
  font-weight: bold;
  line-height: 1;
  margin-right: 1rem;
  color: #3b5bdb;
  text-shadow: 0.25rem 0.25rem #be4bdb;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'JjBrMXZ',
    height: 450,
    tab: 'result'
  }
%}


Or perhaps, give it a `border`. Note how the following example uses the “drop” keyword which would be the default if omitted and equates to 3:
```css
p:first-letter {
  font-family: "Merriweather", serif;
  initial-letter: 3.5 drop;
  font-weight: bold;
  line-height: 1;
  margin-right: 1rem;
  color: #3b5bdb;
  border: 0.25rem dashed #be4bdb;
  padding: 0.5rem;
  border-radius: 5px;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'mdjBpmN',
    height: 450,
    tab: 'result'
  }
%}

Maybe add a `background` or some `box-shadow`:

```css
p:first-letter {
  font-family: "Merriweather", serif;
  initial-letter: 3.5 3;
  font-weight: bold;
  line-height: 1;
  margin-right: 1rem;
  color: var(--surface-1);
  background: #be4bdb;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0.5rem 0.5rem 0 #3b5bdb;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'MWBErvv',
    height: 450,
    tab: 'result'
  }
%}

Or clip the background to the text:

```css
p:first-letter {
  background: linear-gradient(to bottom right,#1f005c,#5b0060,#870160,#ac255e,#ca485c,#e16b5c,#f39060,#ffb56b);
  font-family: "Merriweather", serif;
  initial-letter: 3.5 3;
  font-weight: bold;
  line-height: 1;
  margin-right: 1rem;
  color: transparent;
  -webkit-background-clip: text;
  padding: 0.5rem;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJwxZOy',
    height: 450,
    tab: 'result'
  }
%}

You’ve got a lot of possibilities!

And there you have it, finer control over your drop cap styling with `initial-letter`! Would you add drop caps to your typography? How might you style them? Let us know!
