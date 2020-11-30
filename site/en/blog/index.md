---
title: 'Blog'
description: ''
permalink: '{{locale}}/blog/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/blog-landing.njk'
type: landing
i18n:
  headings:
    latest-news: 'Latest Chrome news'
pagination:
  data: collections.blog-en
  size: 24
---
