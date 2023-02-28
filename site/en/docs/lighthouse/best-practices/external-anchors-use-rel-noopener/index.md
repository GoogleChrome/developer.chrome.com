---
layout: 'layouts/doc-post.njk'
title: Links to cross-origin destinations are unsafe
description: |
  Learn how to safely link to resources on another host.
date: 2019-05-02
updated: 2019-08-28
---

When you link to a page on another site using the `target="_blank"` attribute,
you can expose your site to performance and security issues:

- The other page may run on the same process as your page.
  If the other page is running a lot of JavaScript,
  your page's performance may suffer.
- The other page can access your `window` object with the `window.opener` property.
  This may allow the other page to redirect your page to a malicious URL.

Adding `rel="noopener"` or `rel="noreferrer"`
to your `target="_blank"` links avoids these issues.

{% Aside %}
As of Chromium version 88, anchors with `target="_blank"` automatically get
[`noopener` behavior by
default](https://www.chromestatus.com/feature/6140064063029248). Explicit
specification of  `rel="noopener"` helps protect users of legacy browsers
including Edge Legacy and Internet Explorer.
{% endAside %}

## How to improve your site's performance and prevent security vulnerabilities

Add `rel="noopener"` or `rel="noreferrer"`
to each link identified in your Lighthouse report.
In general, when you use `target="_blank"`, always
add `rel="noopener"` or `rel="noreferrer"`:

```html
<a href="https://examplepetstore.com" target="_blank" rel="noopener">
  Example Pet Store
</a>
```

- `rel="noopener"` prevents the new page from being able
to access the `window.opener` property and
ensures it runs in a separate process.
- `rel="noreferrer"` has the same effect
but also prevents the `Referer` header
from being sent to the new page.
See [Link type "noreferrer"](https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer).

See the [Share cross-origin resources safely](https://web.dev/cross-origin-resource-sharing/)
post for more information.

## Resources

- [Share cross-origin resources safely](https://web.dev/cross-origin-resource-sharing/)
- [Site isolation for web developers](/blog/site-isolation/)
