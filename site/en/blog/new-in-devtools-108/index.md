---
layout: 'layouts/blog-post.njk'
title: "What's New In DevTools (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: 'Hints for inactive CSS properties, new XPath and text selectors in the Recorder, and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/R04Uaz5x81UmGFLrHOSN.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- $contentStart -->

## Hints for inactive CSS properties {: #css-hint }

DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="Hints for inactive CSS properties.", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Chromium issue: [1178508](https://crbug.com/1178508)


## Auto-detect XPath and text selectors in the Recorder panel {: #recorder }

The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="XPath and text selectors in the Recorder panel.", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Chromium issues: [1327206](https://crbug.com/1327206),[1327209](https://crbug.com/1327209)


## Step through comma-separated expressions {: #debugging }

You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="Step through comma-separated expressions.", width="800", height="473" %}

Previously, DevTools only supported stepping through semicolon-separated expressions.

Given the code below,

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

Transpilers and minifiers may turn them into comma-separated expressions.

```js
function bar(){return foo(),foo(),42}
```

This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using source maps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them.

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Chromium issue: [1370200](https://crbug.com/1370200)


## Improved Ignore list setting {: #ignore-list }

Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="The Ignore List tab.", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Chromium issue: [1356517](https://crbug.com/1356517)


## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:

- Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316))
- Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
