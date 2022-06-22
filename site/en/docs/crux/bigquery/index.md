---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: CrUX on BigQuery

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: >
  CrUX data can be accessed via BigQuery. Learn more about data structure and example queries.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  CrUX data can be accessed via BigQuery. Learn more about data structure and example queries.

# Required
date: 2022-04-01

# Optional
# Include an updated date when you update your post
updated: 2020-10-16

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - simonhearne

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - performance
---

A few rules:

- Posts should **NOT** contain any h1's in markdown. The `title` element in the
  YAML frontmatter will generate the page's h1. Only use h2-h4s in markdown.
- Make sure all of your images have `alt` text unless they are purely
  decorative.
- Don't forget to add your new doc to the `_data/docs/[project-name]/toc.yml` or
  else it won't show up in the site navigation!
- Make sure authors appear in the `authorsData.json` file and that they have
  uploaded a headshot to our image CDN. See [How to add an author](/docs/handbook/how-to/add-an-author/).
- Make sure tags have been added to `tags.yml`. See [How to add a tag](/docs/handbook/how-to/add-a-tag/).
- Code blocks should use triple backticks and include a language name. Example:

```html
<p>Hello world!</p>
```
