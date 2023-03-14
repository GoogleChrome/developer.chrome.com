---
layout: 'layouts/doc-post.njk'
title: Add a landing page
description: 'Add a landing page'
date: 2022-12-29
---

## Create a Featured Card

Feature Card contains content and actions that relate information about a single topic. You can use HTML entities (```&mdash;```) or basic Markdown styling (```*emphasis*```) inside these string arguments.

The `featuredCard` component requires these fields:

- `title` — the title of the card.
- `description` — the description of the card.
- `imgSrc` — the image displays on the card. Follow the [add media guide](/docs/handbook/how-to/add-media/) to upload your
image to our CDN. Once you've uploaded the image, copy the path out of the
shortcode snippet, paste that into this field.
- `imgAlt` — the description
of the image. You can read more about writing effective alt text over on [the
web.dev handbook](https://web.dev/handbook/inclusion-and-accessibility/#use-inclusive-images).
- `actionUrl`— an url of the CTA at the bottom of the card.
- `actionText`— a text of the CTA at the bottom of the card.

To add an **Featured Card** to the page, you can use the {% raw %}`{{ featuredCard }}`{% endraw %} shortcode.

{% raw %}

```md
{% from 'macros/cards/featured-card.njk' import featuredCard with context %}
```

```md
{{ featuredCard({
  title: '#100CoolWebMoments',
  description: 'Take a stroll down memory lane and celebrate **#100CoolwebMoments** since Chrome’s first release &mdash; _lorem ipsum._',
  imgSrc: 'image/kheDArv5csY6rvQUJDbWRscckLr1/AlyVvShYHBM5I7ikG8vj.jpg',
  imgAlt: '#100CoolWebMoments',
  actionUrl: '/blog/insider-april-2022/',
  actionText: 'Discover the timeline'
}) }}
```

{% endraw %}

{% from 'macros/cards/featured-card.njk' import featuredCard with context %}

<!-- lint disable no-unescaped-template-tags -->
{{ featuredCard({
  title: '#100CoolWebMoments',
  description: 'Take a stroll down memory lane and celebrate **#100CoolwebMoments** since Chrome’s first release &mdash; _lorem ipsum._',
  imgSrc: 'image/kheDArv5csY6rvQUJDbWRscckLr1/AlyVvShYHBM5I7ikG8vj.jpg',
  imgAlt: '#100CoolWebMoments',
  actionUrl: '/blog/100-web-moments/',
  actionText: 'Discover the timeline'
}) }}

## Featured Blog Card

Featured Blog Card is a card component that displays your post. It includes post title, content, thumbnail, and authors detail.

The `featuredPostCard` component requires these fields:

- `post` — a relative url path to a single blog post page.
- `options`
  - `icon` - the filename for the icon, minus the .svg extension.
  - `actionUrl`— an url of the CTA at the bottom of the card.
  - `actionText`— a text of the CTA at the bottom of the card.

To add an **Featured Blog Card** to the page, you can use the {% raw %}`{{ featuredPostCard }}`{% endraw %} shortcode.

{% raw %}

```md
{% from 'macros/cards/featured-post-card.njk' import featuredPostCard with context %}
```

```md
{% set url = '/blog/devtools-tips-2/' %}
{% set post = helpers.findByUrl(collections.all, url, locale) %}

{{ featuredPostCard(
  post, {
    icon: 'star',
    actionText: 'Discover',
    actionUrl: url
  })
}}
```

{% endraw %}

{% from 'macros/cards/featured-post-card.njk' import featuredPostCard with context %}
{% set post = helpers.findByUrl(collections.all, '/blog/insider-april-2022/', locale) %}

<!-- lint disable no-unescaped-template-tags -->
{{ featuredPostCard(
  post, {
    icon: 'star',
    actionText: 'Discover',
    actionUrl: post.url
  })
}}

## Featured Cards Section

A featured section is a layout of cards on the same plane. The code below is the example of the component usages to display two featured cards, which are a Featured Blog Card and Featured Card.

{% raw %}

```md
{% from 'macros/featured-section.njk' import featuredSection with context %}
```

```md
{{ featuredSection(
  cards: [
    { postUrl: '/blog/insider-april-2022/',
      actionUrl: '/blog/insider-april-2022/',
      actionText: 'Discover'
    }, 
    { customPost: {
        title: '#100CoolWebMoments',
        description: 'Take a stroll down memory lane and celebrate **#100CoolwebMoments** since Chrome’s first release &mdash; _lorem ipsum._',
        imgSrc: 'image/kheDArv5csY6rvQUJDbWRscckLr1/AlyVvShYHBM5I7ikG8vj.jpg',
        imgAlt: '#100CoolWebMoments',
      },
      actionUrl: '/blog/insider-april-2022/',
      actionText: 'Discover the timeline'
    },
  ], utilities: 'grid-cols-1 lg:grid-cols-2') 
}}
```

{% endraw %}

{% from 'macros/featured-section.njk' import featuredSection with context %}

<!-- lint disable no-unescaped-template-tags -->
{{ featuredSection({
  cards: [
    {
      postUrl: '/blog/insider-dg-2022/',
      actionUrl: '/blog/insider-april-2022/',
      actionText: 'Discover'
    },
    {
      customPost: {
        title: '#100CoolWebMoments',
        description: 'Take a stroll down memory lane and celebrate **#100CoolwebMoments** since Chrome’s first release &mdash; _lorem ipsum._', 
        imgSrc: 'image/kheDArv5csY6rvQUJDbWRscckLr1/AlyVvShYHBM5I7ikG8vj.jpg',
        imgAlt: '#100CoolWebMoments'
      },
      actionUrl: '/blog/100-web-moments/',
      actionText: 'Discover the timeline'
    }
  ],
  utilities: 'grid-cols-1 lg:grid-cols-2'
}) }}
