---
layout: 'layouts/doc-post.njk'
title: Create anchor redirects
description: 'Redirect previously used anchors to new pages.'
date: 2022-09-08
---

Sometimes a page using anchors to link to content on the same page grows
to an extent where it makes sense to extract that content to new pages.

To keep anchor links which have been potentially shared working you
are able to redirect previously used anchors to new pages. Simply add
an `anchorRedirects` key to the page's frontmatter.

```yaml
anchorRedirects:
  your-old-anchor: https://your-new-fully-qualified-page-url.com
  your-old-anchor-2: /docs/webstore/faq/#how-can-i-raise-p2b-concerns
```
