---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 119)"
authors:
  - sofiayem
date: 2023-10-05
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/r8TZKv9wtqFJvjYbyBeb.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-119
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

{% YouTube id='Ta-YTDhiBIQ' %}

<!-- $contentStart -->

## Improved `@property` section in Elements > Styles {: #css }

### Editable `@property` rule {: #edit-property }

You can now edit the [`@property` CSS at-rule](https://web.dev/at-property/) in the corresponding section in the **Elements** > **Styles** pane.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/J6OXQJK3RRuCvAR1Yai9.png", alt="The before and after making the property rule editable.", width="800", height="526" %}

{% Aside 'note' %}
Note that DevTools shows [non-editable](/docs/devtools/css/issues/#non-editable) rules in *italic text*.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0226cbddd5437e869c924569fe342fcb9e89b466 #}
{# https://chromium.googlesource.com/chromium/src/+/15245f8b594e93fa4aeb2f3d321364eaf2ed8438 #}

Chromium issue: [1471123](https://crbug.com/1471123).

### Issues with invalid `@property` rules are reported {: #property-issues }

The **Issues** tab now reports issues with invalid declarations in `@property` rules.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sd2Fh479paZoIzukHrCO.png", alt="An issues with the property rule reported in the Issues tab.", width="800", height="639" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/499d13e8ad395b9a55aadf7eaaafe487ebed2cbb #}
{# https://chromium.googlesource.com/chromium/src/+/b0b317506822855ec4757d5962671f5fe666aac0 #}

Chromium issue: [1473283](https://crbug.com/1473283).

##  {: #devices }

##  {: #sources }

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

