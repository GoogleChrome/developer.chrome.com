---
layout: 'layouts/doc-post.njk'
title: Create anchor redirects
description: 'Redirect previously used anchors to new pages.'
date: 2022-09-08
---

Sometimes a page using anchors to link to content on the same page grows
to an extent where it makes sense to extract that content to new pages.

To keep the potentially shared anchor links working, you
can redirect previously used anchors to new pages.

Add an `anchorRedirects` key to the page's front matter—the YAML block between
`---` lines at the start of `.md` file. This key can list multiple redirects
and works both for fully qualified URLs and local paths:

```yaml
anchorRedirects:
  your-old-anchor: https://your-new-fully-qualified-page-url.com/with/optional/path/#and-optional-new-anchor
  your-old-anchor-2: /local/path/#with-an-optional-new-anchor
```

Where `your-old-anchor` is the [fragment identifier](https://developer.mozilla.org/docs/Web/API/URL/hash) without `#`.

For example, in the `/docs/devtools/recorder/index.md` file:

```yaml
anchorRedirects:
  selector: /docs/devtools/recorder/reference/#selector
```

This redirects:

- From `https://developer.chrome.com/docs/devtools/recorder/#selector`
- To `https://developer.chrome.com/docs/devtools/recorder/reference/#selector`
