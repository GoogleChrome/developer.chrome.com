---
layout: 'layouts/doc-post.njk'
title: Add a collection page
description: >
  Add a landing page within a doc set for a project or initiative.
date: 2022-12-15
---

These collections can live in your documentation as either tradition [collections](/docs/handbook/how-to/add-a-collection-page/), which are built with tags, or like a [landing page](/docs/handbook/how-to/add-a-landing-page/) with a customized set of docs or articles.

## Choose the collection method

* For an ordered set, list the articles.
* For an unordered set, use a tag.

### List of articles

If you'd like a set of docs and articles in a custom order, you can add the URL string of each to the list of `articles` in the page YAML.

```yaml
articles:
  - url: /docs/.../
  - url: /articles/.../
```

The existence of an `articles` list will always be prioritized over tags.

### Tagged collection

Choose a tag for your collection. It will become the `<COLLECTION_NAME>`. You can use an
[existing tag](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/i18n/tags.yml)
or [create a new one](/docs/handbook/how-to/add-a-tag/).

#### Tag content

Make sure all posts / articles / docs that will be bart of the collection are
tagged with the chosen tag (such as, `tags: ["capabilities"]`).

## Create collection landing page

Create a new page in your `site/en/docs/` directory:

```bash
├── site
│   ├── en
│   │   ├── docs
│   │   │   ├── <Your Doc Set>
│   │   │   │   ├── <COLLECTION_NAME>
│   │   │   │   │     └── index.md
```

### Configure the page

Add the following frontmatter to the `index.md` file:

```bash
---
title: '<COLLECTION_NAME_OR_CUSTOM_TITLE>'
description: '...'
subhead: '...'
layout: 'layouts/collection-in-docs.njk'
collection_tag: '<CUSTOM-TAG-NAME>'
articles:
  - url: /docs/.../
  - url: /articles/.../
---
```

The existence of an `articles` list will always be prioritized over tags.

You can leave the content of the `index.md` empty, or add custom markup as needed.

Content supports markdown syntax with some additional features and shortcodes.
See the [components guide](/docs/handbook/components/) for a full list of supported elements.

We use an image CDN and GCS bucket to ensure that images and
videos are served in a performant, responsive manner.
Take a look at the guide on [uploading media](/docs/handbook/how-to/add-media)
to learn how to add images and videos to your docs.
