---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: An example blog post

# Required
description: >
  Describe your example post with a couple sentences.

# Optional
# This appears below the title and is an optional teaser
subhead: >
  A sentence of extra info to entice the reader.

# Required
date: 2021-01-27

# Optional
# Include an updated date when you update your post
updated: 2021-01-28

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - samthorogood
  - robdodson
  - kaycebasques

# Optional
# How to a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - privacy
  - security

# Optional
# Hero images should be at least 1920 x 960
# https://developer.chrome.com/docs/handbook/how-to/add-media/
hero: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'

# Required if there is a hero image
alt: >
  An alternative text description of your hero image.
---

A few rules:

- Posts should **NOT** contain any h1's in markdown. The `title` element in the
  YAML frontmatter will generate the page's h1. Only use h2-h4s in markdown.
- Make sure all of your images have `alt` text unless they are purely
  decorative.
- Make sure authors appear in the `authorsData.json` file and that they have
  uploaded a headshot to our image CDN. See [How to add an author](https://developer.chrome.com/docs/handbook/how-to/add-an-author/).
- Make sure tags have been added to `supportedTags.json` and `tags.yml`. See [How to add a tag](https://developer.chrome.com/docs/handbook/how-to/add-a-tag/).
- Code blocks should use triple backticks and include a language name. Example:

```html
<p>Hello world!</p>
```

## My first heading

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aliquam reprehenderit placeat saepe sit libero dicta fugit laboriosam id dolor. Totam, optio obcaecati. Deserunt, itaque commodi? Qui laborum hic reprehenderit.

<!--
All images or videos should use the {% Img %} or {% Video %} shortcodes.
Take a look at our guide on uploading media:
https://developer.chrome.com/docs/handbook/how-to/add-media/
-->
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg", alt="A white dog holding a stick in its mouth.", width="380", height="240" %}

## My second heading

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aliquam reprehenderit placeat saepe sit libero dicta fugit laboriosam id dolor. Totam, optio obcaecati. Deserunt, itaque commodi? Qui laborum hic reprehenderit.


