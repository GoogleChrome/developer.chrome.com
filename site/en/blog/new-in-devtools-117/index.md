---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 117)"
authors:
  - sofiayem
date: 2023-08-22
description: "Override XHR/fetch requests and hide extension requests from the Network panel, see changes in fetch priority in the Performance panel, experience multiple UI improvements, check out new colors and experimental features, and more."
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oM7ywmnxgVDuegxueVbK.png'
alt: 'Override XHR/fetch requests and hide extension requests from the Network panel, see changes in fetch priority in the Performance panel, experience multiple UI improvements, check out new colors and experimental features, and more.'
tags:
  - new-in-devtools
  - devtools
  - chrome-117
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*There is no 'What's new in DevTools' video for this release, but you can watch this quick recap of the recent features.*

{% YouTube id='e8tl_yp5BQg' %}

<!-- $contentStart -->

## Network panel improvements {: #network }

### Override web content locally even faster {: #overrides }

The [local overrides](/docs/devtools/overrides/) feature is now streamlined, so you can easily mock response headers and web content of remote resources from the **Network** panel without access to them.

To override web content, open the **Network** panel, right-click a request, and select **Override content**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BRExqF6iUJioa9YkiUeV.png", alt="The override options in the drop-down menu of a request.", width="800", height="685" %}

If you have local overrides set up but disabled, DevTools enables them. If you haven't set them up yet, DevTools prompts you in the action bar at the top. Select a folder to store the overrides in and allow DevTools access to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cuNvCVUAVtICozqgThQi.png", alt="Select a folder and allow access to it in the action bar at the top.", width="800", height="507" %}

Once the overrides are set up, DevTools then takes you to **Sources** > **Overrides** > **Editor** to let you [override web content](/docs/devtools/overrides/#make-changes).

Note that the overridden resources are indicated with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} in the **Network** panel. Hover over the icon to see what's overridden.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hekOD6lUKKXipZ6qFT3D.png", alt="An override icon next to a request in the Network panel.", width="800", height="493" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5cc23747aef9bf9380fc09e45897f49295026801 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3755eef346c32ef537e66a7ee13efe9a0c4ab84a #}

Chromium issues: [1465785](https://crbug.com/1465785), [1470532](https://crbug.com/1470532), [1469359](https://crbug.com/1469359).

### Override the content of XHR and fetch requests {: #xhr-fetch }

You can now override the content of XHR and fetch requests in addition to their response headers. With such overrides, you can mock the API responses to debug your web page even if your backend and API aren't ready yet.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/TNcd8DCxoK6OmHQqJjKT.mp4", autoplay="false", loop="true", muted="true", controls="true", width="800", height="704", class="screenshot" %}

DevTools currently supports content overrides for the following request types: images (for example, avif, png), fonts, fetch and XHR, scripts (css and js), and documents (html). DevTools now grays out the **Override content** option for unsupported types.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/67b8ebb822a32dd187c3963d108645e25015c0e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4465f5220d3a58242c8ed6f697a8d575448d9553 #}

Chromium issues: [792101](https://crbug.com/792101), [1469776](https://crbug.com/1469776).

### Hide Chrome extension requests {: #hide-extension-requests }

To help you focus on the code you author and filter out irrelevant requests sent by extensions you might have installed in Chrome, the **Network** panel gets a new filter.

To filter out all the requests sent to `chrome-extension://` URLs, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide extension URLs**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/07CwNEuofVPa8jp3LFfm.png", alt="Extension URLs hidden from the requests table.", width="800", height="478" %}

{% Aside 'important' %}
Additionally, DevTools now won't attempt to load source maps for extensions, so you won't see the "Failed to load source maps" warnings that aren't related to your code.

Moreover, similar warnings caused by *your* code are now shown in an information bar at the bottom of the **Sources** panel instead of the **Console**.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/45b4415d1599864a73cab4138ecd3135d8ee79ba #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dffee77bf9253cfb926ea96ff07c09d9649f4b14 #}

Chromium issues: [1257885](https://crbug.com/1257885), [1458803](https://crbug.com/1458803).

### Human-readable HTTP status codes {: #status-codes }

The **Status Code** in the request's header now shows human-readable text next to the HTTP status codes, so you can figure out what happened to the request quicker.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZaKyHIWya3xO6jFqyFlB.png", alt="The before and after displaying human-readable HTTP status codes.", width="800", height="437" %}

You can also hover over the status code in the request table to see the same text.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/39e9d691bf22c254bdecb9d735d3725d1d3c50b4 #}

Chromium issue: [1153956](https://crbug.com/1153956).

### Pretty-print responses for JSON subtypes {: #pretty-json-response }

The **Response** tab of for a request with a `application/[subtype]+json` [MIME subtype](https://www.iana.org/assignments/media-types/media-types.xhtml#application) (for example, `ld+json`, `hal+json`, and others) now parses the response correctly and lets you prettify it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Na2g2Ba9ihx4P5BH9ZYW.png", alt="The before and after parsing an application/json subtype in a network response preview.", width="800", height="446" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2d0a199d6b50cc3cb6b8ca6539859045b52fb5e1 #}

Chromium issue: [406900](https://crbug.com/406900).

## Performance: See the changes in fetch priority for network events {: #performance }

The **Performance** panel now shows two priority fields in the **Summary** of an event in the **Network** track: **Initial Priority** and (final) **Priority**, instead of just the singe **Priority**. With this additional field you can now see if the event's fetch priority changes and tweak the order of downloads. For more information, see [Optimizing resource loading with the Fetch Priority API](https://web.dev/fetch-priority/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IzdOpZvv0KSQNdtGLfhL.png", alt="Before and after displaying changes in fetch priority.", width="800", height="521" %}

Additionally, you can find the same information in the **Priority** column of the **Network** panel, with the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Big request rows** setting enabled.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XDOh7qRquDu5joKZ9srg.png", alt="The Priority column in the Network panel.", width="800", height="610" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9b0b36187f7bb3b74497fcb6bfec20394cc6c0c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c56ddbbaaf87a3136bcca7191e7012aba8de7931 #}

Chromium issues: [1463901](https://crbug.com/1463901), [1380964](https://crbug.com/1380964).

## Sources settings enabled by default: Code folding and automatic file reveal  {: #sources }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Code folding**](http://localhost:8080/docs/devtools/settings/preferences/#code-folding) option is now enabled by default. This option lets you fold code blocks.

To fold a code block, hover over the line number next to the start of the block and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/996xap2zAEHX564M0MBF.svg", alt="Collapse.", width="24", height="24" %} collapse icon. Click `{...}` to expand the block again.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/5j5X3jaQVphrPSfvazk1.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="498" %}

Moreover, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Automatically reveal files in the sidebar**](http://localhost:8080/docs/devtools/settings/preferences/#reveal-files) is now also enabled by default.

This setting makes the file tree in the **Sources** > **Page** select the current file open in the **Editor** when you switch tabs.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Bgimcr4eWCyOjxePsXo7.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a61b70fdf40d352a06520d1704b0ee08dc5cea5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0fb0a115b9fc00a6af1be58db426674dd7411c84 #}

Chromium issues: [1459193](https://crbug.com/1459193), [1336599](https://crbug.com/1336599).

## Improved debugging of third-party cookie issues {: #third-party-cookies }

In an effort to help build a [more private web](https://blog.google/products/chrome/building-a-more-private-web/) and in parallel with [updates by other browsers](/docs/privacy-sandbox/chips/#why-its-important-to-opt-into-cookie-partitioning), Chrome introduced the [Privacy Sandbox](https://privacysandbox.com/) initiative. This initiative fundamentally enhances privacy on the web and can sustain a healthy, ad-supported web in a way that will render third-party cookies obsolete. Privacy Sandbox has a [gradual phaseout timeline](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) to let you adapt to changes comfortably.

You can already test how Chrome behaves *after* the third-party cookie phaseout. To do this, run [Chrome from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/) with the `--test-third-party-cookies-phaseout` flag. To learn what this flag does, see [Debugging cookies](/docs/privacy-sandbox/third-party-cookie-phase-out/#debugging-cookies).

Regardless of the way you run Chrome (with or without the flag), the **Issues** tab now has the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Include third-party cookie issues** checkbox enabled by default and, as a result, reports:

- A breaking change warning about the upcoming phaseout.
- Issues related to third-party cookies.

To test this, inspect cookies at [this demo page](https://samesite-sandbox.glitch.me/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WlT6ntQm5iEGujg8P32c.png", alt="Third-party cookie issues reported in the Issues tab.", width="800", height="439" %}

Additionally, the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Blocked response cookies** filter in the **Network** panel has been rephrased to make it clear that it shows only the blocked *response* cookies.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/anskbEwDVG6vvXKqW5TA.png", alt="The checkbox is enabled and shows only the requests with blocked response cookies.", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b9391367907b720b3d270141815b1f49ec39bc6a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/295a09a976fa964f1618d00c0721912286aa0b75 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/28558f4af329940651fed72b317b9a4b5b5523c5 #}

Chromium issues: [1458839](https://crbug.com/1458839), [1462693](https://crbug.com/1462693), [1466310](https://crbug.com/1466310).

## Debug preloading in the Application panel {: #preloading }

The Chrome team is [bringing back full prerendering](/blog/prerender-pages/) of future pages that a user is likely to navigate to. To let you debug this, DevTools adds the **Preloading** section to the **Application** panel. The new prefetching and prerendering (collectively known as "navigational preloading") uses the Speculation Rules API rather than to the [link-based resource hints](/blog/prerender-pages/#a-brief-history-of-prerender).

On [this demo page](https://prerender-demos.glitch.me/), in the **Application** > **Preloading** section, you can inspect:

- **Speculation Rules** that lists all the rule sets found on the current page.
- **Preloads** that lists all the prefetched and prerendered URLs from the rule sets.
- **This Page** that lists the prerendered status of the current page.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/YyxptgchqoTk8BQmXKO3.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="592" %}

For more information, refer to the [dedicated post on debugging speculation rules](/blog/debugging-speculation-rules/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4e07e2023f0c99a2c2b31c87024d94dc820193de #}

Chromium issue: [1410709](https://crbug.com/1410709).

## New colors {: #colors }

You might have already noticed that DevTools now has a refreshed look that better aligns with Chrome. One contributing factor is the new color scheme.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dhvFP34kcqgGfHseGGWL.png", alt="The before and after applying new colors.", width="800", height="440" %}

This version (117) brings more UX improvements to DevTools, both already mentioned and listed further, including a number of improved UI texts.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bde284efe828595e6ecc42b55dd582b8ba2ab0ed #}

Chromium issue: [1456677](https://crbug.com/1456677).

## Lighthouse 10.4.0 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 10.4.0. Most notably, this version adds new accessibility audits for the following:

- [`aria-dialog-name`](https://dequeuniversity.com/rules/axe/4.7/aria-dialog-name)
- [`aria-text`](https://dequeuniversity.com/rules/axe/4.7/aria-text)
- [`link-in-text-block`](https://dequeuniversity.com/rules/axe/4.7/link-in-text-block)
- [`select-name`](https://dequeuniversity.com/rules/axe/4.7/select-name)

For example:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/b8rrvtXSXeGL1YxnHHLz.png", alt="Failed check on the color of links that makes them indistinguishable.", width="800", height="738" %}

See also the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.4.0). To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c09ba04a1333f99d02cb042d99c84844587466d2 #}

Chromium issue: [772558](https://crbug.com/772558).

## The C/C++ WebAssembly debugging extension for DevTools is now open source {: #debug-cpp }

The [C/C++ WebAssembly debugging extension for DevTools](https://goo.gle/wasm-debugging-extension) is now open source and resides in the [DevTools frontend repository](https://chromium.googlesource.com/devtools/devtools-frontend/+/refs/heads/main/extensions/cxx_debugging/). This extension enables debugging capabilities in DevTools for C++ programs compiled to WebAssembly. For more information, see [Debug C/C++ WebAssembly](/docs/devtools/wasm/).

Learn how to [build, run, and test the extension](https://chromium.googlesource.com/devtools/devtools-frontend/+/refs/heads/main/extensions/cxx_debugging/README.md) and feel free to [contribute](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/workflows.md).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/32770f2f66f01f8bd7239af447dfd8b9030eda29 #}

Chromium issue: [1410709](https://crbug.com/1410709).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:

- [CSS Nesting](/articles/css-nesting/): The **Elements** panel now shows the entire selector chain for nested children ([1172985](https://crbug.com/1172985)).
- **Application** > **Manifest** now has a **Window Controls Overlay** section that checks if a `display_override` value is present in the Manifest and provides links to relevant documentation.
- The **Sources** > **Page** tree now does the following, including but not limited to ([1442863](https://crbug.com/1442863)):
  - Greys out folders if all their content is ignore-listed.
  - Colors folders in orange if all their content is from a source map.
- **Performance**: [**Capture Settings**](/docs/devtools/performance/reference/#settings) now automatically hide when you start the recording ([1455498](https://crbug.com/1455498)).
- **Sources** > **Editor** restored the <kbd>Ctrl</kbd> + <kbd>Arrow</kbd> behavior (Win) and <kbd>Opt</kbd> + <kbd>Arrow</kbd> (MacOs) ([1468208](https://crbug.com/1468208)).
- **Animations** > **Pause all** toggle now keeps its state across page loads ([1446046](https://crbug.com/1446046)).
- **Application** > **Storage** > **Cache storage** moved to the **Application** > **Storage** > **Cache section** ([1462622](https://crbug.com/1462622)).
- Some UI texts and tooltips are improved: [Hardware concurrency tooltip](https://crbug.com/1456479), [Network filter texts and a main menu option](https://chromium.googlesource.com/devtools/devtools-frontend/+/25f464282874c208ca533c56f9396eaa17891a2c), capitalization in the [Application tree view](https://crbug.com/1464866), [Network > Headers texts](https://crbug.com/1463173), [Sources > Overrides and Filesystem texts](https://crbug.com/1469415).

## New experimental features {: #experimental }

### New rendering emulation: `prefers-reduced-transparency` {: #reduced-transparency }

Your website users may start enabling the new experimental [`prefers-reduced-transparency` CSS media feature](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-transparency) on their devices to indicate their preference to reduce transparent effects. You might consider taking this preference into account to increase your website's accessibility. To help you, the **Rendering** drawer tab can now emulate the `prefers-reduced-transparency: reduce` setting, so you can prototype a solution and test how your website behaves in this case.

To test [this feature](https://chromestatus.com/feature/5191066147356672) in Chrome, enable **Experimental Web Platform features** in `chrome://flags`.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Xh60t9y0KnAIdwoUnbX5.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="533" %}

{% Aside %}
The DevTools team expresses gratitude to [Luke Warlow](https://chromium.googlesource.com/devtools/devtools-frontend/+/8f2118f91bab0707949706421727ca423d53e111) for landing this feature.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8f2118f91bab0707949706421727ca423d53e111 #}

Chromium issue: [1424879](https://crbug.com/1424879).

### Enhanced Protocol monitor {: #protocol-monitor }

Chrome DevTools uses the [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) to instrument, inspect, debug, and profile Chrome browsers. If you are a Chromium or DevTools developer, the **Protocol monitor** provides you with a way to view all the CDP requests and responses made by DevTools and send CDP commands.

The **Protocol monitor** gets a new interface to let you construct and send CDP commands easier. Now you don't have to look up commands and their parameters in documentation, DevTools will suggest them to you.

{% Aside %}
To enable this feature, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Experiments** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Protocol Monitor**.
{% endAside %}

In the bottom right corner of the **Protocol monitor** drawer tab, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/H4duJWlMkdd1903sC0Bw.svg", alt="Left panel open.", width="20", height="20" %} **Show CDP command editor**, select a target, start typing a command, select one of the suggested, if required, specify parameter values, and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/M6ltzywbLiI5cMJ1jrEg.svg", alt="Send.", width="24", height="24" %} **Send command** (<kbd>Ctrl/Cmd</kbd> + <kbd>Enter</kbd>).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lQv810MXafmVjuj70RP6.png", alt="Specifying and sending a CDP command.", width="800", height="298" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ecbc68611ae1d9db1292b6e7afeda6c481975d8e #}

Chromium issue: [1469345](https://crbug.com/1469345).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

