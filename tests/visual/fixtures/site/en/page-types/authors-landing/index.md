---
title: 'Authors'
description: ''
permalink: '{{locale}}/page-types/authors-landing/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
layout: 'layouts/authors-landing.njk'
type: landing
i18n:
  headings:
    latest-news: 'Authors'
override:authorsData:
  alexdanilo:
    twitter: alexanderdanilo
  leeronisrael:
    image: image/80mq7dk16vVEg8BBhsVe42n6zn82/E02nz219ZjKaoyuRFtdb.jpg
  adamsilverstein:
    twitter: adamsilverstein
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/a58pQb092GyDr5S7vOeg.webp
  rouslan:
    image: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/dZOnFhReaU2NKpk1Rr9f.jpg
  mgechev:
    image: image/admin/OPpZ9x8KCVcxvqgdWXM5.jpg
  adrianajara:
    image: image/Vww75TFpThOgTNuASFM6UYfBAp53/tIuTcnxqlspZFyklJYHG.jpg
  crystalwang:
    image: image/WlD8wC6g8khYWPJUsQceQkhXSlv1/8NhYSp5dX1NtITmlqqDT.jpeg
  eladalon:
    image: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/EAFBslJDQgJynWlS3Hp8.jpeg
  miketaylr:
    image: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/v4ogqQjm5vTjRQBaTyRK.png
  joelewis:
    image: image/VbsHyyQopiec0718rMq2kTE1hke2/aS7reiLcBKY52w1HUU3m.jpeg
pagination:
  data: authorsData
  size: 9
  resolve: keys
---
