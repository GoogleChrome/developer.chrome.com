---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 115)"
authors:
  - sofiayem
date: 2023-05-30
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3epzH8UKrCVrMdc7fEpG.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-115
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}
{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## Elements improvements {: #elements }

### New CSS subgrid badge {: #subgrid }

The **Elements** panel gets a new `subgrid` badge for [subgrid](https://developer.mozilla.org/docs/Web/CSS/CSS_Grid_Layout/Subgrid). This feature is currently experimental in Chrome Canary.

To inspect and debug a nested grid that is a subgrid, and therefore inheriting the number and size of tracks from its parent, click the badge. It toggles an overlay that shows columns, rows, and their numbers on top of the element in the viewport.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YdYYo1t21cwTUVEW2bgS.png", alt="The subgrid badge and the overlay in the viewport.", width="800", height="549" %}

For the list of all badges in the **Elements** panel, see the [Badges reference](/docs/devtools/elements/badges/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b64a1595f831021d41a4849376ef16d4a4ddf201 #}

Chromium issue: [1442536](https://crbug.com/1442536).

### Selector specificity in tooltips {: #specificity }

In **Elements** > **Styles**, hover over a selector name to see its [specificity weight](https://developer.mozilla.org/docs/Web/CSS/Specificity) in a tooltip.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eQt4wClGtnVpFsYSC5NH.png", alt="A tooltip with specificity weight of a selector.", width="800", height="509" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/4431863 #}

Chromium issue: [1204932](https://crbug.com/1204932).

### Values of custom CSS properties in tooltips {: #css-variable-values }

In **Elements** > **Styles**, hover over a custom CSS property name to see its value in a tooltip.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7StcARknd7VTSOFhlWnX.png", alt="The tooltip with a value of the custom CSS property.", width="800", height="429" %}

The DevTools team would like to express gratitude to [一丝 and Suyan](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3992726) for landing this improvement.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a74458f6bf953e146f531309c39fd6842f6ece88 #}

Chromium issue: [1380779](https://crbug.com/1380779).

## Sources improvements {: #sources }

### CSS syntax highlighting {: #css }

The **Sources** panel gets the following for [preprocessed CSS](https://developer.mozilla.org/docs/Glossary/CSS_preprocessor) files, such as SASS, SCSS, and LESS:

- Syntax highlighting.
- Inline editors support. These editors are similar to those in **Elements** > **Styles**, for example, [**Color Picker**](/docs/devtools/css/color/) and [**Easing Editor**](/docs/devtools/css/reference/#edit-easing).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kaJILu31mesFmq7eZUQy.png", alt="Improved CSS syntax highlighting and inline editors support in Sources.", width="800", height="689" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ab3adf62fb280aa4a598f5a3fd9f27dd24ad0ba6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/906a69dfd1d94765cce5215bcee179dff3117998 #}

Chromium issues: [1302261](https://crbug.com/1302261), [1392085](https://crbug.com/1392085s).

### Shortcut to set conditional breakpoints {: #breakpoint }

You can now set [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) faster with a shortcut. To open the breakpoint dialog, hold <kbd>Command</kbd> (MacOS) or <kbd>Control</kbd> (Windows / Linux) and click the line number in the left column of the **Sources** > **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7bRF2xDUGpwfvY6HIkgo.png", alt="The line number in the left column and the breakpoint dialog.", width="800", height="611" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d8f4d718804e1bc7b1d7916014c8c5b6a62c0b3 #}

Chromium issue: [1405767](https://crbug.com/1405767).

## Application > Bounce Tracking Mitigations {: #bounce-tracking }

[Bounce Tracking Mitigations](https://privacycg.github.io/nav-tracking-mitigations/#bounce-tracking-mitigations) experiment in Chrome lets you identify and delete the state of sites that appear to perform cross-site tracking using the bounce tracking technique. The **Application** > **Background Services** pane gets a new **Bounce Tracking Mitigations** tab that lets you manually force tracking mitigations and lists the sites whose states were deleted.

Check out this security feature:

1. [Block third-party cookies in Chrome](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DAndroid&sjid=2048967673261319866-EU#zippy=%2Callow-or-block-cookies). Navigate to and enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Settings** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JbhmMshze0QJJVcmDr30.svg", alt="Security.", width="24", height="24" %} **Privacy and security** > **Cookies and other site data** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gV2vW2PQXfBqvQEJ4sF0.svg", alt="Radio button checked.", width="24", height="24" %} **Block third-party cookies**.
1. In `chrome://flags`, set the **Bounce Tracking Mitigations** experiment to **Enabled With Deletion**.
1. Inspect this [demo page](https://bounce-tracking-demo.glitch.me/), open **Application** > **Background Services** > **Bounce Tracking Mitigations**, click a bounce link on the page, wait (10 seconds) for Chrome to record the bounce, and click **Force run** to delete the state immediately.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PJ8FUFF64ogdBNyFNPuB.png", alt="Bounce Tracking Mitigations lists a state deletion.", width="800", height="701" %}

Additionally, the **Issues** tab warns you about the upcoming state deletion.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ace8e94508b6f0f63aa25fe40f65d675d3c98f81 #}

Chromium issue: [1432303](https://crbug.com/1432303).

## Lighthouse 10.2.0 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 10.2.0. Most notably, the [Largest Contentful Paint](/docs/lighthouse/performance/lighthouse-largest-contentful-paint/#how-to-improve-your-lcp-score) check gets a table with phase calculations for simulated and DevTools throttling. See also the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.2.0).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/R0Bm7iyxXQ4d67YVTqtK.png", alt="The LCP phase table.", width="800", height="607" %}

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/def91af01dd6dcc5c61524bb2a5962983067868e #}

Chromium issue: [772558](https://crbug.com/772558).

## Ignore content scripts by default {: #content-script }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Content scripts injected by extensions** is now enabled by default.

With this setting enabled:

- The **Debugger** ignores such scripts and doesn't stop on exceptions thrown by them.
- The **Sources** > **Call Stack** pane skips ignored frames. To turn the skipping off here, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Show ignore-listed frames**](/docs/devtools/javascript/reference/#show-ignore-listed-frames).
- The **Console** [collapses ignored frames](/docs/devtools/console/reference/#show-third-party) in stack traces. Click **Show N more frames** to expand, and **Show less** to collapse again.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bQYJDFHrl0bi28jsBEmW.png", alt="The Settings > Ignore List > Content scripts injected by extensions enabled by default.", width="800", height="611" %}

Additionally, the checkboxes in **Ignore List** got clearer text.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e434ba21ef503af0f5b303a2ba7b2058dd21869c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/88fd441c2f7e483db02f4ab5e78a401fcf97cf8d #}

Chromium issues: [1440958](https://crbug.com/1440958), [1364501](https://crbug.com/1364501).

## Network > Response pretty-printing by default {: #network }

The **Network** > **Response** pane now pretty-prints minified response bodies by default, similar to [the **Sources** panel](/blog/new-in-devtools-110/#pretty-print).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6v8sGp3FbOJF2hoWj0YB.png", alt="Enabled pretty-printing in Network > Response.", width="800", height="446" %}

Additionally, SVG files get syntax highlighting.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zNnzIWvccp8Ndz2AOy8P.png", alt="SVG syntax highlighting.", width="800", height="379" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7eb6fdc4c780d046fd73e0182efbddec4f0535b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00bca2313807f054bede3febf6dd37e1519ba084  #}

Chromium issues: [1382752](https://crbug.com/1382752), [1385374](https://crbug.com/1385374).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/): Added **Facebook for Android v407 on Pixel 6** to the list of agent strings.
- [Network](/docs/devtools/shortcuts/#network): Added the **Clear network log** shortcut ([1444991](https://crbug.com/1444991)):
  - MacOS: <kbd>Command</kbd> + <kbd>K</kbd>
  - Windows/Linux: <kbd>Control</kbd> + <kbd>L</kbd>
- Removed the **Recorder** > **Recording N** > **Performance insights panel** drop-down option ([1414773](https://crbug.com/1414773)).
- Stylesheets that failed to load are now hidden from the navigator tree ([1386059](https://crbug.com/1386059)).
- **Performance**: Fixed incorrect display of the expandable **Interactions** track ([1432510](https://crbug.com/1432510)).
- **Elements**: Stylesheets that failed to load are now underscored with wavy lines ([1440626](https://crbug.com/1440626)).
- The **Debugger** doesn't automatically step in WebAssembly when there is no plugin for the respective language ([1443342](https://crbug.com/1443342)).
- The shortcut that moves the cursor one word at at time is restored for CSS files in **Sources** > **Editor** ([1241848](https://crbug.com/1241848)):
  - MacOS: <kbd>Alt</kbd> + <kbd>Arrow</kbd>
  - Windows/Linux: <kbd>Ctrl</kbd> + <kbd>Arrow</kbd>

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
