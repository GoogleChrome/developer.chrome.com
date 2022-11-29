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
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: Lorem Ipsum is simply dummy text of the printing and typesetting industry
        alt: Lorem Ipsum
        description: >-
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        tags:
          - news
          - accessibility
          - css
        authors:
          - surma
          - mustafa
          - rachelandrew
          - dtapuska
        date: 2022-11-09
        url:
      - thumbnail:
        title: Lorem Ipsum is simply dummy text of the printing and typesetting industry
        alt: Lorem Ipsum
        description: >-
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        tags:
          - news
          - accessibility
          - css
        authors:
          - surma
          - fawazm
        date: 2022-11-10
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: Lorem Ipsum
        alt: Lorem Ipsum
        description: >-
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        tags:
        authors:
          - surma
        date: 2022-12-09
        url:
      - thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
        title: Lorem Ipsum
        alt: Lorem Ipsum
        description: >-
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        tags:
        authors:
          - surma
        date: 2022-12-09
        url:
    size: 4
    href:
      previous: null
      next: '/'
eleventyComputed:
  title: '{{ paged.title | i18n(locale) or title }}'
  description: '{{ paged.description | i18n(locale) or description }}'
  hero: '{{ paged.image }}'
---
