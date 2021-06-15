---
layout: 'layouts/doc-post.njk'
title: Display a banner
description: 'Display a banner across the entire site or an individual post.'
date: 2021-04-21
---

To display a banner across the entire site, add a `banner.yml` file to the
`_data` directory. The contents of the file should look like this:

```yaml
type: info
text: Your banner text goes here.
actions:
  - text: Apply
    href: https://google.com
  - text: Dismiss
```

Banners support either `info` or `warning` types. An info banner is blue and
a warning banner is red.

The banner supports up to two actions. If an action has an `href` it will
generate a link. If it does not have an `href` it will generate a button that
will always dismiss the banner.

Clicking either action will dismiss the banner and store a cookie on the user's
computer so they don't see the banner again.

If you don't have two links, then we suggest the second action always be a
dismiss button so users can clear the banner if they find it intrusive.
