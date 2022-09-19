---
layout: 'layouts/blog-post.njk'
title: '$title'
authors:
  - jecelynyeen
date: $date
description: 'to_be_updated'
hero: 'image/to_be_updated.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-$version
draft: true
---

$thankful

{% include 'partials/devtools/$lang/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the whats-new.md file -->

<!-- Content starts here -->

{% include 'partials/devtools/$lang/reach-out.md' %}
{% include 'partials/devtools/$lang/whats-new.md' %}
