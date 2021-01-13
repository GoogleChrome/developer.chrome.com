---
layout: 'layouts/doc-post.njk'
title: Add a tag
description: 'Add a new tag.'
date: 2021-01-11
---

## Add the tag to the list of supported tags

- Add your tag to `site/_data/i18n/tags.yml`. The `en` and `es` fields correspond
to different languages. For now, just add your tag using the `en` field.

```yaml
news:
  en: News
```

- Add your tag to `site/_data/supportedTags.json`. For the `title` field, use
the same key you used in `site/_data/i18n/tags.yml`.

```json
"news": {
  "title": "i18n.tags.news"
},
```

## Add the tag to your post

In the front matter for your post you can add a list of tags:

```md
---
title: My first post
tags:
  - news
  - feature-policy
  - encryption
---
```
