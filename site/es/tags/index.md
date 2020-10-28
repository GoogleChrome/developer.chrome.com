---
title: 'Etiquetas'
description: ''
permalink: '{{locale}}/tags/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/tags-landing.njk'
i18n:
  headings:
    latest-news: 'Últimas noticias'
pagination:
  data: collections.tags
  size: 24
  resolve: values
---
