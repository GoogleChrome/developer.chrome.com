---
title: 'Authors'
description: ''
permalink: '{{locale}}/authors/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/authors-landing.njk'
type: landing
i18n:
  headings:
    latest-news: 'Authors'
pagination:
  data: postsData.authors
  size: 24
  resolve: values
---
