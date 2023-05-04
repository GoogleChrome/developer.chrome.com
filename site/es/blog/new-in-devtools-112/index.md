---
layout: 'layouts/blog-post.njk'
title: "Qué hay de nuevo en DevTools (Chrome 112)"
authors:
  - jecelynyeen
date: 2023-03-09
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GW5JgGha6aT2shvuONTv.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-112
draft: true
---

*Gracias por la traducción [Miguel Ángel](https://midu.dev) y por la revisión [Carlos Caballero](https://carloscaballero.io).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder } -->

<!-- ### Replay extensions support {: #replay-extensions } -->

<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->

<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="Custom replay UI.", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Chromium issue: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->

<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->

<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="Setting the Recorder to use pierce selectors; Pierce selector in action.", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Chromium issue: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->

<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->

<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="Export Puppeteer (including Lighthouse analysis).", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="The Lighthouse report opened in Chrome.", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->

<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="The Get extensions option in the Export drop-down menu.", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Chromium issues: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->

<!-- ### CSS documentation {: #css } -->

<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="The tooltip with documentation on a CSS property.", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->

<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Chromium issue: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->

<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Chromium issue: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->

<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->

<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Changes to how the Console now displays messages triggered by breakpoints: with icons and proper source link.", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->

<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="The anchor link next to a logpoint message that opens the breakpoint editor.", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Chromium issue: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->

<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->

<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="Context menus of a folder and script with ignore-related options.", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="Ignore-listed scripts and folders are grayed out, you can hide them with an experimental option in the More options drop-down menu.", width="800", height="542" %}

<!-- If you select an ignored script, the **Configure** button takes you to  -->
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/). You can also hide ignored sources from the file tree with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Chromium issue: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->

<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->

<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Deprecation banner at the top of the Profiler.", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->

<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Chromium issue: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->

<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="The reduced contrast option on the Rendering > Emulate vision deficiencies.", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->

<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Chromium issues: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->

<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->

<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="Disabled legacy navigation.", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="Moto G Power in the Devices list.", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Chromium issue: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->

<!-- These are some noteworthy fixes in this release: -->

<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
<!-- - DevTools improved autocompletion: -->
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
