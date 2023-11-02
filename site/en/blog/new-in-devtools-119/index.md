---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 119)"
authors:
  - sofiayem
date: 2023-10-10
description: "Improved @property section in Styles, updated devices list, enhanced pretty-printing in Sources and autocompletion in the Console."
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Sn4Hb69riQJo2hnsqOup.jpg'
alt: 'Improved @property section in Styles, updated devices list, enhanced pretty-printing in Sources and autocompletion in the Console.'
tags:
  - new-in-devtools
  - devtools
  - chrome-119
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

<!-- $contentStart -->

## Improved `@property` section in Elements > Styles {: #css }

### Editable `@property` rule {: #edit-property }

You can now edit the [`@property` CSS at-rule](https://web.dev/articles/at-property) in the corresponding section in the **Elements** > **Styles** pane.

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

## Autocomplete private fields in Console {: #autocomplete-console }

You can now autocomplete [private class fields](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes/Public_class_fields) when evaluating them outside the class scope in the **Console**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5yG7PmRn2TmVGOz0N1ne.png", alt="The before and after supporting autocompletion for private class field outside of class scope.", width="800", height="408" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7eb2770f7ff2395c817725e77df1ca07d48fe872 #}

Chromium issues: [1483848](https://crbug.com/1483848), [1381806](https://crbug.com/1381806).

## Lighthouse 11.1.0 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 11.1.0. See the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v11.1.0).

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/65643d2c71a7fa41038525f125eeff743964af59 #}

Chromium issues: [772558](https://crbug.com/772558).

## Accessibility improvements {: #accessibility }

Screen readers will now read out the following:

- Warnings and errors in the **Console**.
- The text in the **Do you trust this code?** dialog when pasting code to **Console** or **Sources**.

Additionally, the **Application** panel fixed contrast issues with links in high contrast mode.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7fa46cca30a1d164c60e359b10cd97b1be541d4e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f843ded7a69f3a2b5817c8b1e01ab828e178c8e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/85a958fb910c0c2c0e5c1b206d52e3708b30bebe #}

Chromium issues: [1485257](https://crbug.com/1485257), [1486643](https://crbug.com/1486643), [1485263](https://crbug.com/1485263).

## Web SQL deprecation {: #web-sql }

The **Application** > **Web SQL** section will be removed in Chrome 123 because the [Web SQL Database API](https://www.w3.org/TR/webdatabase/) [isn't maintained](https://www.w3.org/TR/webdatabase/#status-of-this-document) anymore. This version adds a warning to the section about the upcoming removal.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NuJgh7FznQ2jlgG0pq9w.png", alt="The Web SQL deprecation warning.", width="800", height="472" %}

For more information, see [Deprecating and removing Web SQL](/blog/deprecating-web-sql/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/087d06b98e6fdd264fde7d16895a1c3cec4d0766 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/712c7996d8c9a492e073f75b26d92ae76f959719 #}

Chromium issues: [1485966](https://crbug.com/1485966).

## Screenshot aspect ratio validation in Application > Manifest {: #manifest-aspect-ratio }

The **Application** > **Manifest** section now checks if your web app's [screenshots](https://web.dev/add-manifest/#screenshots) with the same form factor (`wide` or `narrow`) have the same aspect ratio.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/krHlVOBrMa0p4SvlhGOJ.png", alt="A warning on the incorrect aspect ratio of screenshots with the same form factor.", width="800", height="370" %}

For more information, see [Debug Progressive Web Apps](/docs/devtools/progressive-web-apps/) and [Add a web app manifest](https://web.dev/articles/add-manifest).

The DevTools team expresses gratitude to [Alexey Rodionov](https://chromium.googlesource.com/devtools/devtools-frontend/+/f95f715656086cbd9daef3302b7691403bed12c6) for landing this change and other [manifest warning improvements](https://chromium.googlesource.com/devtools/devtools-frontend/+/ead65e6c528a1a8efe7808a51e3f3db06406b9f7) in the previous version.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f95f715656086cbd9daef3302b7691403bed12c6 #}

Chromium issue: [1476656](https://crbug.com/1476656).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:

- **Elements**:
  - Animation timing function swatches are not shown for longhand CSS properties under the [expandable shorthand](/docs/devtools/css/issues/#shorthand) ones ([1149182](https://crbug.com/1149182)).
  - The autocomplete for `contain-intrinsic-*` now doesn't provide the incorrect single `auto` value because it should be `auto <length>` ([1480415](https://crbug.com/1480415)).
  - Support for deprecated and invalid `-webkit-*` properties has been removed ([1086089](https://crbug.com/1086089), [1030765](https://crbug.com/1030765)).
- **Breakpoints**: Fixed the bug with disappearing breakpoint editing dialog when the breakpoint type is changed ([1485782](https://crbug.com/1485782)).
- **Performance**:
  - The color parsing error during performance recording has been fixed ([1480205](https://crbug.com/1480205)).
  - Fixed the bug with [LCP](https://web.dev/articles/lcp) not showing in the **Timings** track ([1487136](https://crbug.com/1487136)).
- **Network**: The **Set cookies** column now shows the correct number of cookies that are set, excluding blocked ([1486903](https://crbug.com/1486903)).
- DevTools extensions now load after navigation to a non-blocked host ([1476264](https://crbug.com/1476264)).
- Fixed the bug with incorrect script execution context for extensions ([1275331](https://crbug.com/1275331)).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

