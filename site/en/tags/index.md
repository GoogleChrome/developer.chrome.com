---
title: 'Tags'
description: ''
permalink: '{{locale}}/tags/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/tags-landing.njk'
i18n:
  headings:
    latest-news: 'Latest news'
pagination:
  data: collections.tags
  size: 50
  resolve: values
---
