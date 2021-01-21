We use includes to inject SVG icons into our pages.

```text
{% include 'icons/arrow-back.svg' %}
```

This allows lets us use CSS to style the fill and color of the SVG elements
and avoids FOUC that occurs when loading SVG with `img`.

This is similar to GitHub's approach outlined here:
https://github.blog/2016-02-22-delivering-octicons-with-svg/