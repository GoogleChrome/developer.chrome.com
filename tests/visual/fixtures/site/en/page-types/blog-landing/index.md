---
title: 'Blog'
description: ''
permalink: '{{locale}}/page-types/blog-landing/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/blog-landing.njk'
type: landing
blogPosts:
  - data :
      title: Goodbye short sessions - A proposal for using service workers to improve cookie management on the web
      authors:
        - surma
        - owencm
      thumbnail: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png
      alt: test
      tags:
        - autoplay
        - media
        - prototype-fixes
        - find-issues
      date: 2022-11-28
  - data :
      title: Autocapitalize for mobile
      authors:
        - borissmus
      thumbnail: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png
      alt: test
      tags:
        - prototype-fixes
      date: 2022-11-25
  - data :
      title: 'The Chromium Chronicle #25: Thread Safety Annotations'
      authors:
        - housseindjirdeh
        - philipwalton
        - paulkinlan
        - afuchs
        - adrianajara
      thumbnail: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png
      alt: test
      tags:
        - prototype-fixes
        - media
      date: 2022-08-28
  - data :
      title: URL bar resizing
      authors:
        - jecelynyeen
      thumbnail: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png
      alt: test
      date: 2022-07-28
  - data :
      title: Web animations playback control in Chrome 39
      authors:
        - jecelynyeen
      thumbnail: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png
      alt: test
      tags:
        - prototype-fixes
        - media
      date: 2022-05-28
  - data :
      title: 'Having a ride with Three.js'
      authors:
        - jecelynyeen
      description: >
        We are seeing more and more developers coming up with new 3D demos whether they were
        OpenGL experts already or new adventurers that started playing with it.
      alt: test
      tags:
        - prototype-fixes
        - media
      date: 2021-08-28
  - data :
      title:  Animating a blur
      authors:
        - jecelynyeen
      description: A few tricks are necessary to animate a blur efficiently.
      alt: test
      tags:
        - media
      date: 2021-08-22
pagination:
  data: blogPosts
  size: 6
---
