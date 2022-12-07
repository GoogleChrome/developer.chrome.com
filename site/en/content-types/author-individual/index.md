---
title: 'Author'
description: ''
layout: 'layouts/author-individual.njk'
paged:
  image: image/i9nJGvw3SnTPH63zKOYWtI6cP5m2/rS10rvGrNat9Euvxw8ju.jpg
  title: i18n.authors.surma.title
  description: i18n.authors.surma.description
  homepage: https://surma.dev/
  twitter: dassurma
  github: surma
  glitch: surma
  pagination:
    items:
      - thumbnail:
        title: >-
          This is a blog card. They can be added to the page as described below
        alt: Lorem Ipsum
        description: >-
          To add cards to this page associate a post with an author by giving it
          an 'authors' field containing the authors handle. The post will then
          be assigned to the author via the authors collection and as a result
          will automatically surface here.
        tags:
          - news
          - accessibility
          - css
        authors:
          - fawazm
        date: 2022-11-10
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: If a post has a thumbnail then it'll use this layout
        alt: The alt used for the thumbnail image
        tags:
          - news
          - accessibility
        authors:
          - rachelandrew
        date: 2022-11-09
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: This is what a post looks like with a single author
        alt: The alt used for the thumbnail image
        tags:
        authors:
          - surma
        date: 2022-12-09
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: This is what a post looks like with two authors
        alt: Lorem Ipsum
        tags:
        authors:
          - surma
          - fawazm
        date: 2022-12-09
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: This is what a post looks like with more than two authors
        alt: The alt used for the thumbnail image
        tags:
          - accessibility
        authors:
          - surma
          - mustafa
          - rachelandrew
          - dtapuska
        date: 2022-11-09
        url:
    size: 5
    href:
      previous: null
      next: '/'
eleventyComputed:
  title: '{{ paged.title | i18n(locale) or title }}'
  description: '{{ paged.description | i18n(locale) or description }}'
  hero: '{{ paged.image }}'
---
