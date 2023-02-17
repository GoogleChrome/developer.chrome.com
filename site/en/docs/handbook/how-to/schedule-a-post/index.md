---
layout: 'layouts/doc-post.njk'
title: Schedule a post
description: 'Schedule a post for a moment in future'
date: 2023-02-09
---

To schedule a post to be launched at a future date, set the `date:` field in
the frontmatter to a future date.

```yaml
date: 2030-02-09 2:59:43.10 -5
```

You can specify only date, or date and time.
If you use only date, the default launch time would be at `00:00 GTM`.
Dates are interpreted to be in `GTM` timezone, unless explicit timezone is
included in the date string.

Accepted formats:

```yaml
date only:        2023-02-09
canonical:        2023-02-09T02:59:43.1Z
space separated:  2023-02-09 21:59:43.10
with timezone:    2023-02-09 2:59:43.10 -5
```

Please note that the post **must not** be set to draft
(`draft: true` in the frontmatter) to be launched live at the desired date.

The post will go live in **the next release** after the specified date, which
might take up to 15 mins.

{% Aside 'caution' %}
When developing on the site using `npm run dev`, all posts are rendered (also drafts and future posts).
{% endAside %}


