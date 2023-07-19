---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 114)"
authors:
  - sofiayem
  - jecelynyeen
date: 2023-05-05
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WHNGhOa6BbgiUAQU0JnY.png'
alt: 'WebAssembly debugging, Autofill debugging, better assertions in Recorder, Performance panel enhancements, Lighthouse 10.1.1, and more.'
tags:
  - new-in-devtools
  - devtools
  - chrome-114
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}
{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## WebAssembly debugging support {: #wasm }

DevTools enables {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Experiments** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **WebAssembly Debugging: Enable DWARF support** by default. For more information, see [Debugging WebAssembly with modern tools](/blog/wasm-debugging-2020/).

This experiment lets you pause execution and debug C and C++ code in Wasm apps, with all the debugging information available to you:

- Your original source code, mapped using [DWARF](https://dwarfstd.org/) debugging information.
- Understandable function names in call stack.
- Breakpoints support, and more.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8COHSVU8nn1m9qjHH15z.png", alt="A Wasm application paused in the Debugger.", width="800", height="762" %}

To test Wasm debugging, install the [C/C++ DevTools Support (DWARF) extension](https://goo.gle/wasm-debugging-extension) and step through the code in the [Mandelbrot demo](https://emscripten-dbg-stories.netlify.app/mandelbrot.html).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/abb3f72ab0c637a1da69fd663c380333e5b6a003 #}

Chromium issue: [1414289](https://crbug.com/1414289).

### Improved stepping behavior in Wasm apps {: #wasm-step }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/FBSJosXk2J6rXbRE0baL.svg", alt="Step over.", width="20", height="20" %} **Step over** in your original code now avoids pausing in disassembly (`.wasm` file). Previously, it would pause there.

However, stepping ends when it lands outside of the function it started in, for example, after returning from the function.

This behavior is enabled by default in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Sources**](/docs/devtools/settings/preferences/#sources).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jhEckqLwOGILepWT8QRN.png", alt="The new setting in Preferences > Sources.", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/87db8b89918cc2f7b18e2623a3c7df810e32da82 #}

Chromium issue: [1418938](https://crbug.com/1418938).

## Debug Autofill using the Elements panel and Issues tab {: #autofill }

[Chrome Autofill](https://support.google.com/chrome/answer/142893) fills in forms automatically with saved information, like your addresses or payment information. To let you easily debug Autofill-related issues, the **Elements** panel can now highlight them with red curly underlines.

To check out this feature, enable {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Experiments** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Highlights a violating node or attribute in the Elements panel DOM tree** and inspect this [demo page](http://form-problems.glitch.me/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VNEcEhKsc243YE218B7R.png", alt="Autofill issues highlighted in the Elements panel and reported by the Issues panel.", width="800", height="762" %}

Hover over a highlighted issue in the DOM tree and click **View issue** to open the **Issues** tab that lists all detected issues and provides clues on what went wrong.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0461387468dc7258322216206391b925542b1207 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7faa8cda6e13cd7bf4a7b199d90006dcab574b42 #}

Chromium issue: [1399414](https://crbug.com/1399414).

## Assertions in Recorder {: #recorder }

The **Recorder** panel now lets you add assertions right during recording, with all the runtime data available to you.

To add an assertion, start a new recording, interact with your page, and click **Add assertion**. The **Recorder** inserts a step with the [`waitForElement` type](/docs/devtools/recorder/reference/#step-properties) that you can customize on the fly. Watch the video to see assertions in action on the [coffee cart demo](https://coffee-cart.app/).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/BNpFsEc4rzFsLVPE5EH2.mp4", controls="true", muted="true", class="screenshot" %}

This video shows you how to assert:

- HTML attributes, for example, an element's `class`.
- JavaScript properties in JSON, for example, `.innerText`.

You can also configure steps to assert, for example, conditional statements in JavaScript, number of node's children (`count`), element visibility, and more. For more information, see [Configure steps](/docs/devtools/recorder/reference/#configure-steps).

Additionally, the **Recorder** now remembers your preferred script format in the [side-by-side code view](/docs/devtools/recorder/reference/#inspect-code) and right-click step menu.

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/67b9e72b50d50c5e959ccfebe202b486a3417736 #}

Chromium issue: [1423624](https://crbug.com/1423624).

## Lighthouse 10.1.1 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 10.1.1, with a notable change introduced in [10.1.0](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.1.0). All audits that deal with URLs are now grouped by entity and aggregate numerical statistics such as size or duration. Popular third parties are also tagged with their category so it's easier to identify their purpose on the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mKXh4UJb8OBM9rCNQv5M.png", alt="Grouped audits by entity.", width="800", height="736" %}

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ba6ed7f9e83373c5395aa30c66dd6c81f0efec0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c2fc9fa0d279c8ed597688032a015063fa894b36 #}

Chromium issue: [772558](https://crbug.com/772558).

## Performance enhancements {: #performance }

### `performance.mark()` shows timing on hover in Performance > Timings {: #mark }

The [performance.mark() method](https://developer.mozilla.org/docs/Web/API/Performance/mark) now shows its timing when you hover over the corresponding mark in **Performance** > **Timings**. The timing here is a timestamp relative to the previous navigation event.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/81B2NfenvYRiUK1uPiz8.png", alt="The pop-up with timing on hover in the Timings section.", width="800", height="782" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7b27d0a56548b9c5adc8bdae13751fae7f658515 #}

Chromium issue: [1426762](https://crbug.com/1426762).

### `profile()` command populates Performance > Main {: #profile }

The [`profile()` and `profileEnd()` commands](/docs/devtools/console/utilities/#profile-function) in the **Console** now start and stop CPU profiling in the [**Main** thread](/docs/devtools/performance/reference/#main) of the **Performance** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WPSIhGfU4uO1X2t71poK.png", alt="The console() command creates a profile in the Performance panel.", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f8fc1cc8b2c26c46e22b7af16b42122acccc13f6 #}

Chromium issue: [1429191](https://crbug.com/1429191).

### Warning for slow user interactions {: #slow-interaction-warning }

User interactions longer than 200 milliseconds get an [Interaction to Next Paint (INP)](https://web.dev/inp/) warning in the **Performance** > **Summary** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wrFaZ26nYCuprtCSNB5C.png", alt="The INP warning.", width="800", height="685" %}

Additionally, the ID of the interaction has been moved from the tooltip to **Summary**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e73984213b6dfdc2f858ed1edfe323d7755d757f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7e33a26c738bcd848aacd140248d285b9db31704 #}

Chromium issues: [1432512](https://crbug.com/1432512), [1432509](https://crbug.com/1432509).

### The Web Vitals track moved {: #web-vitals }

The **Performance** panel has removed the following tracks:

- The **Web Vitals** track. Instead, see the relevant timings in the **Timings** track on hover.
- The **Long Tasks** subtrack. You can already find such tasks in the [**Main** track](/docs/devtools/performance/reference/#long-tasks) shaded [in red and with a red triangle](/blog/new-in-devtools-83/#long-tasks).

Both the **Web Vitals** and **Long Tasks** tracks contained information duplicated elsewhere. They were also non-interactive compared to their more fully featured alternatives which provide more detailed information when clicked.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wu4ePOcdvtKHyvy0PK96.png", alt="Before and after moving the Web Vitals to the Timings track.", width="800", height="613" %}

Additionally, the **Experiences** track was renamed to **Layout Shifts** to more accurately reflect its usage.

Learn more about [Web Vitals](https://web.dev/vitals/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/41b7043de413b2a87f6a8dc8a90ac1a744912400 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/26306da9622791b255b12c9c0deeac0a0d4a07b8 #}

## JavaScript Profiler deprecation: Phase three {: #js-profiler }

As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance.

DevTools version 114 starts *phase three* of the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). During this phase, the **JavaScript Profiler** panel is removed from DevTools but you can still temporarily enable it via {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Experiments**](/docs/devtools/settings/experiments/) and open it from the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iEkxGNsTwKYYMP2nCxfY.png", alt="JavaScript profiler checkbox in Settings > Experiments.", width="800", height="507" %}

To profile CPU performance, use the **Performance** panel.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fecc2e9a652f3b4cb830555c9d991b66ecf3ddf0 #}

Chromium issue: [1428026](https://crbug.com/1428026).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:

- The [Color Picker](/docs/devtools/css/color/) now detects HWB values that are [out of gamut](/docs/devtools/css/color/#convert-colors) when clipped ([1429271](https://crbug.com/1429271)).
- The **Sources** panel:
  - Enabled JSON syntax highlighting for source maps ([1385374](https://crbug.com/1385374)).
  - Stopped showing "Source map detected" messages when you manually [disable source maps](/docs/devtools/javascript/source-maps/#enable_source_maps_in_settings) ([1423718](https://crbug.com/1423718)).
- The **Console** now lets you evaluate incomplete JavaScript expressions with <kbd>Ctrl</kbd> + <kbd>Enter</kbd> and outputs syntax errors ([1314700](https://crbug.com/1314700)).
- The [Breakpoint editing dialog](/docs/devtools/javascript/breakpoints/#edit-breakpoints) now has a close button. Previously, you had to press <kbd>Enter</kbd> or unfocus the dialog ([1412980](https://crbug.com/1412980)).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
