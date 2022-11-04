---
title: Use advanced typography with local fonts
subhead: Learn how the Local Font Access API allows you to access the user's locally installed fonts and
obtain low-level details about them.
tags:
  - blog
  - fonts
  - capabilities
authors:
  - thomassteiner
description: >
  The Local Font Access API enumerates the user's installed local fonts and provides low-level access to
  the various TrueType/OpenType tables.
date: 2020-08-24
updated: 2022-07-01
hero: image/admin/oeXwG1zSwnivzpvcUJly.jpg
alt: Page of a font book.
feedback:
  - api
---

{% Aside 'success' %} The Local Font Access API was part of the
[capabilities project](https://developer.chrome.com/blog/capabilities/) and is now shipped.
{% endAside %}

## Web safe fonts

If you have been doing web development long enough, you may remember the so-called
[web safe fonts](https://developer.mozilla.org/docs/Learn/CSS/Styling_text/Fundamentals#Web_safe_fonts).
These fonts are known to be available on nearly all instances of the most used operating systems
(namely Windows, macOS, the most common Linux distributions, Android, and iOS). In the early 2000s,
Microsoft even spearheaded an
[initiative](https://web.archive.org/web/20020124085641/http://www.microsoft.com/typography/fontpack/default.htm)
called _TrueType core fonts for the Web_ that provided these fonts for free download with the
objective that _"whenever you visit a Web site that specifies them, you'll see pages exactly as the
site designer intended"_. Yes, this included sites set in
[Comic Sans MS](https://docs.microsoft.com/en-us/typography/font-list/comic-sans-ms). Here is a
classic web safe font stack (with the ultimate fallback of whatever
[`sans-serif`](https://developer.mozilla.org/docs/Web/CSS/font-family#<generic-name>:~:text=sans%2Dserif,-Glyphs)
font) might look like this:

```css
body {
  font-family: Helvetica, Arial, sans-serif;
}
```
