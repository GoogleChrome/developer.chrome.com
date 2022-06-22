---
layout: 'layouts/doc-post.njk'
title: Add a blog post
description: 'Add a new post to /blog'
date: 2021-01-27
updated: 2022-05-19
---

## Before you start

Make sure your content is a blog post, and not reference documentation or an article (or a mixture of all three). 
See [where to publish](/docs/handbook/where-to-publish) for more information.

## Clone the sample post

Duplicate the example post located in `site/en/blog/_example/` and
rename the folder to match whatever slug you want to use for your url.

Posts support markdown syntax with some additional features and shortcodes.

## Metadata

Each `index.md` file starts with YAML Front Matter. See
`site/en/blog/_example/` for documentation of all supported metadata.

### Hero images

Hero images should be at least 1920 x 960. Use jpg unless you have a specific
need for png or svg. Our image CDN will handle compressing and converting the
image to newer formats such as webp so you don't have to do that in advance.

Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN. Once you've uploaded the image, copy the path out of the
shortcode snippet, it should look like this:

`'image/foR0vJZKULb5AGJExlazy1xYDgI2/ZnGIwrOoVIL6J5CohCki.jpg'`

Paste that into the `hero` field in your YAML frontmatter.

## Components

See the [components guide](/docs/handbook/components/) for a full list of
supported elements.
