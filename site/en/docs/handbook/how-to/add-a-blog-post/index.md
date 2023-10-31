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

### Outdated banner 

The outdated banner indicates this article is outdated and no longer accurate.

Set `is_outdated` field in your YAML frontmatter.
If new material is available, paste an available content URL into the `new_available_content_url` field in your YAML frontmatter.

### Hero images

Hero images should be at least 1920 x 960. Use jpg unless you have a specific
need for png or svg. Our image CDN will handle compressing and converting the
image to newer formats such as webp so you don't have to do that in advance.

Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN. Once you've uploaded the image, copy the path out of the
shortcode snippet, it should look like this:

`'image/foR0vJZKULb5AGJExlazy1xYDgI2/ZnGIwrOoVIL6J5CohCki.jpg'`

Paste that into the `hero` field in your YAML frontmatter.

#### YouTube videos as heroes

Alternatively, you can replace the hero field in your YAML frontmatter with
the hero_youtube_id field, for example:
```diff
- hero: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'
+ hero_youtube_id: 'PupwBARjaYU'
```

If this is done, the thumbnail field is required.

```diff
+ thumbnail: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'
```

This results in the thumbnail being displayed on pages referencing the
article, such as the blog index page, and a YouTube video embed being
displayed on the article page where the hero image otherwise would be.

### Social sharing image 

Social sharing image is the visual thumbnail that appears when a post or page 
is shared on social media platforms like Twitter and Facebook.

Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN or use the [sharing image generator](https://web-dev-uploads.web.app/sharing-image-generator)
to generate the social sharing image. 

Once you've uploaded the image or generated the sharing image, copy the path out,
it should look like this:

`'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'`

Paste that into the `sharing_image` field in your YAML frontmatter.

## Components

See the [components guide](/docs/handbook/components/) for a full list of
supported elements.
