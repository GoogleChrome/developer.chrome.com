---
title: Blog landing - given a collection this page generates a paginated list of blog cards.
description:
permalink: '{{locale}}/docs/handbook/content-types/blog-landing/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: layouts/blog-landing.njk
type: landing
override:blogPosts:
  - data:
      thumbnail:
      title: >-
        A post without a thumbnail
      alt: Lorem Ipsum
      description: >-
        It's possible to add a post without a thumbnail. If it has a
        description then it will surface like this.
      tags:
      authors:
        - fawazm
      date: 2022-11-10
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: If a post has a thumbnail then it will use this layout
      alt: The alt used for the thumbnail image
      tags:
      authors:
        - rachelandrew
      date: 2022-11-09
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: This is what a post looks like with a single author
      alt: The alt used for the thumbnail image
      tags:
      authors:
        - surma
      date: 2022-12-09
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: This is what a post looks like with two authors
      alt: Lorem Ipsum
      tags:
      authors:
        - surma
        - fawazm
      date: 2022-12-09
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: This is what a post looks like with more than two authors
      alt: The alt used for the thumbnail image
      tags:
      authors:
        - surma
        - mustafa
        - rachelandrew
        - dtapuska
      date: 2022-11-09
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: This is what a post looks like with a single tag
      alt: The alt used for the thumbnail image
      tags:
        - news
      authors:
        - surma
      date: 2022-11-09
      url: /
  - data:
      thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/yG6HcKRIK416ewhINL0T.jpg
      title: This is what a post looks like multiple  tags
      alt: The alt used for the thumbnail image
      tags:
        - accessibility
        - css
        - news
        - autoplay
        - emulate
      authors:
        - surma
      date: 2022-11-09
      url: /
  - data:
      thumbnail:
      title: This is the 8th post
      description: >-
        Since the paginator is configured to show 7 posts per page, you'll find
        me on the second page.
      alt: The alt used for the thumbnail image
      tags:
      authors:
        - surma
      date: 2022-11-09
      url: /
pagination:
  data: blogPosts
  size: 7
---
