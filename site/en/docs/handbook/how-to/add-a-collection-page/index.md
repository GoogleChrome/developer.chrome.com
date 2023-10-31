---
layout: 'layouts/doc-post.njk'
title: Add a collection page
description: >
  Add a landing page for a project or initiative
date: 2022-03-08
---

## Choose a tag for your collection

Choose a tag for your collection. It will become the `<COLLECTION_NAME>`. You can use an
[existing tag](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/i18n/tags.yml)
or [create a new one](/docs/handbook/how-to/add-a-tag/).

### Tag content

Make sure all posts / articles / docs that will be part of the collection are
tagged with the chosen tag.

```yaml
tags: ["<COLLECTION_NAME>"]
```

## Create collection landing page

Create a new page in the `site/en` directory:

```bash
├── site
│   ├── en
│   │   ├── <COLLECTION_NAME>
│   │   │   └── index.md
```

## Configure the page

Add the following frontmatter to the `index.md` file:

```yaml
---
title: '<COLLECTION_NAME_OR_CUSTOM_TITLE>'
description: '<COLLECTION_DESCRIPTION>'
layout: 'layouts/collection-landing.njk'
collection_tag: '<COLLECTION_NAME>'
---
```

You can leave the content of the `index.md` empty, or add custom markup as needed.

Content supports markdown syntax with some additional features and shortcodes.
See the [components guide](/docs/handbook/components/) for a full list of supported elements.

We use an image CDN and GCS bucket to ensure that images and
videos are served in a performant, responsive manner.
Take a look at the guide on [uploading media](/docs/handbook/how-to/add-media)
to learn how to add images and videos to your docs.
