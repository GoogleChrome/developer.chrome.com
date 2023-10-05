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

## Updated list of devices to emulate {: #devices }

The user agent strings in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/) has been updated to reflect the average usage of browsers and operating systems. You can now emulate more of the up-to-date devices in [device mode](/docs/devtools/device-mode/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EaLfaHSw1q7wGH5C1HQ6.png", alt="The before and after updating the device list.", width="800", height="503" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d86bfdc7c2178324e2717afe5b19d2ba1cd8744d #}

Chromium issue: [1479733](https://crbug.com/1479733).

## Pretty-print inline JSON in script tags in Sources {: #sources }

The **Sources** panel now supports pretty-printing inline JSON in `<script>` HTML tags for easier debugging.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EdE39X771gyHJLTGmPj8.png", alt="The before and after pretty-printing inline JSON in the script tag.", width="800", height="648" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/84ca000f76aa74165674247374b0e0802c3f8a89 #}

Chromium issues: [406900](https://crbug.com/406900), [1473875](https://crbug.com/1473875).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:



<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

