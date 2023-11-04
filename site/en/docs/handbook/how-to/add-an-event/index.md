---
layout: 'layouts/doc-post.njk'
title: Add an event
description: 'Add a new event to /meet-the-team'
date: 2022-10-18
updated: 2022-10-18
---

## Clone the sample post

Duplicate the example event located in `site/en/meet-the-team/events/_example/` and
rename the folder to match whatever slug you want to use for your url.

## Metadata

Each `index.md` file starts with YAML front matter. See
`site/en/meet-the-team/events/_example/` for documentation of all supported metadata.

### Images

There are 3 predefined images to choose from. The details of which can
be found in the sample event.

If the need arises you can upload your own image. Images should be at least 250 x 250.
Use jpg unless you have a specific need for png or svg. Our image CDN will handle
compressing and converting the image to newer formats such as webp so you don't
have to do that in advance.

Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN. Once you've uploaded the image, copy the path out of the
shortcode snippet, it should look like this:

`'image/foR0vJZKULb5AGJExlazy1xYDgI2/ZnGIwrOoVIL6J5CohCki.jpg'`

Paste that into the `image` field in your YAML frontmatter.

### Sessions

There are two types of session: participant and speaker. The sample event(`site/en/meet-the-team/events/_example/`)
contains examples of both.

### Filters

Please try to be consistent with the topic and location fields as they are ultimately
used to populate the filters on the 'meet-the-team-page'.

The location field should follow the following pattern: 'City, Country'. For example, Denver, USA.

When adding topics, please review the topics already in use to ensure you are
not adding multiple variations of the same thing.

