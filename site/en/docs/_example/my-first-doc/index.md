---
# Required
layout: 'layouts/doc-post.njk'

# Required
title: My first doc

# Required
# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: >
  A brief, high level summary of this doc.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  A sentence of extra info to entice the reader.

# Required
date: 2020-10-15

# Optional
# Include an updated date when you update your post
updated: 2020-10-16

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - jakearchibald
  - kaycebasques

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - privacy
  - security
---

A few rules:

- Posts should **NOT** contain any h1's in markdown. The `title` element in the
  YAML frontmatter will generate the page's h1. Only use h2-h4s in markdown.
- Make sure all of your images have `alt` text unless they are purely
  decorative.
- Don't forget to add your new doc to the `_data/docs/[project-name]/toc.yml` or
  else it won't show up in the site navigation!
- Make sure authors appear in the `authorsData.json` file and that they have
  uploaded a headshot to our image CDN. See [How to add an author](https://developer.chrome.com/docs/handbook/how-to/add-an-author/).
- Make sure tags have been added to `supportedTags.json` and `tags.yml`. See [How to add a tag](https://developer.chrome.com/docs/handbook/how-to/add-a-tag/).
- Code blocks should use triple backticks and include a language name. Example:

```html
<p>Hello world!</p>
```