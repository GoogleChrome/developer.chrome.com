We use includes to inject SVG icons into our pages, loading the basenames found in this folder.

```text
{{ icon('arrow-back', {
  hidden: true,
  label: 'i18n.common.string_id' | i18n(locale),
  className: 'gap-300',
  id: 'idToUseOnPage',
}) }}
```

All of the options in the second argument are optional.

This allows lets us use CSS to style the fill and color of the SVG elements and avoids FOUC that occurs when loading SVG with `img`.

This is similar to GitHub's approach outlined here: https://github.blog/2016-02-22-delivering-octicons-with-svg/
