---
layout: 'layouts/doc-post.njk'
title: Add an article
description: 'Add a new post to /articles'
date: 2022-05-19
---

## Before you start

Make sure your content is an article, and not reference documentation or a blog post. See [where to publish](/docs/handbook/where-to-publish) for more information.

## Clone the sample post

Duplicate the example post located in `site/en/articles/_example/` and
rename the folder to match whatever slug you want to use for your url.

Posts support markdown syntax with some additional features and shortcodes.

## Metadata

Each `index.md` file starts with YAML front matter. See
`site/en/articles/_example/` for documentation of all supported metadata.

Articles and blog posts share the same template and are identical other than location at the moment.

### Outdated banner 

The outdated banner indicates this article is outdated and no longer accurate.

Set `is_outdated` field in your YAML frontmatter.
If new material is available, paste an available content URL into the `new_available_content_url` field in your YAML frontmatter.

### Hero images

Hero images should be at least 1920 x 960. Use JPG unless you have a specific
need for PNG or SVG. Our image CDN will handle compressing and converting the
image to newer formats such as WebP so you don't have to do that in advance.

Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN. Once you've uploaded the image, copy the path out of the
shortcode snippet, it should look like this:

`'image/foR0vJZKULb5AGJExlazy1xYDgI2/ZnGIwrOoVIL6J5CohCki.jpg'`

Paste that into the `hero` field in your YAML frontmatter.

## Components

See the [components guide](/docs/handbook/components/) for a full list of
supported elements.
