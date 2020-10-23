---
layout: 'layouts/doc-post.njk'

# The page title. This appears at the top of the doc and as the page name
# in Google Search.
title: My first doc

# This appears below the title and is an optional teaser
subhead: 'A sentence of extra info to entice the reader.'

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'A brief, high level summary of this doc.'

# The publish date
date: 2020-10-15

# An optional updated date
updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.
authors:
  - jakearchibald
  - kaycebasques
---

A few rules:

- Posts should **NOT** contain any h1's in markdown. The `title` element in the
  YAML frontmatter will generate the page's h1. Only use h2-h4s in markdown.
- Make sure all of your images have `alt` text unless they are purely
  decorative.
- Don't forget to add your new doc to the `_data/docs/[project-name]/toc.yml` or
  else it won't show up in the site navigation!
- Make sure authors appear in the `authorsData.json` file and that they have
  uploaded a headshot to our image CDN.
- Code blocks should use triple backticks and include a language name. Example:

```html
<p>Hello world!</p>
```