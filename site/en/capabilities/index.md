---
layout: 'layouts/landing.njk'
title: 'Capabilities'
description: 'Enabling the most amazing apps on the web.'
sections:
  intro:
    - url: https://fugu-tracker.web.app
      title: Fugu API Tracker
      description: Get an overview of all the APIs we work on in the context of Project Fugu.
    - url: /blog/fugu-showcase/
    - url: /blog/fugu-status/
---

{% from 'macros/cards/hero-card.njk' import heroCard with context %}
{% from 'macros/cards/blog-card.njk' import blogCard with context %}
{% from 'macros/icon.njk' import icon with context %}
{% from 'macros/landing-section.njk' import landingSection with context %}
{% from 'macros/landing-deco.njk' import landingDeco with context %}

{{ heroCard(
  'Capabilities',
  "Enabling the most amazing apps on the web.",
  "All capabilities",
  "/tags/capabilities/",
  "",
  "",
  "red",
  "image/8WbTDNrhLsU0El80frMBGE4eMCD3/lauDAddiUZqlgicYTyYV.svg"
  )
}}

{{ landingSection(
  'About capabilities, aka. Project Fugu',
  'Learn about the cross-company effort around enabling the most amazing apps on the web.',
  sections.intro,
  'red',
  'top-3',
  true,
  'image/jxu1OdD7LKOGIDU7jURMpSH2lyK2/2xzRN81jadQ55f1WFkWH.svg',
  'Waving hand icon',
  333,
  165,
  'image/jxu1OdD7LKOGIDU7jURMpSH2lyK2/kdPhkPXy7R0mmcJaKyoi.svg'
  )
}}