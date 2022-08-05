---
layout: 'layouts/landing.njk'
title: 'Capabilities'
description: 'Enabling the most amazing apps on the web.'
sections:
  intro:
    - url: https://fugu-tracker.web.app
    - url: /blog/fugu-showcase/
    - url: /blog/fugu-status/
---

{% from 'macros/cards/hero-card.njk' import heroCard with context %}
{% from 'macros/cards/blog-card.njk' import blogCard with context %}
{% from 'macros/icon.njk' import icon with context %}
{% from 'macros/landing-section.njk' import landingSection with context %}
{% from 'macros/landing-deco.njk' import landingDeco with context %}

{# unique styles, needed only for Capabilities hero card. #}
<style>
.hero-card {
  background-image: url(https://wd.imgix.net/image/8WbTDNrhLsU0El80frMBGE4eMCD3/lD9tSNG70nGO94nSNAI3.svg);
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
}

.material-button.bg-green-medium {
  color: #fff;
}
</style>

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