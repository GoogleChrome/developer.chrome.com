---
layout: 'layouts/blog-post.njk'
title: "What's new in DevTools (Chrome 120)"
authors:
  - sofiayem
date: 2023-11-09

description: "Third-party cookie phaseout issues reported in the Issues panel, Privacy Sandbox Analysis Tool for cookies, effective Content Security Policy in the Applications panel, improved animations debugging, enhanced ignore listing, and more."
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KW2IAQCHKlPDK0lyQgY2.png'
alt: 'Third-party cookie phaseout issues reported in the Issues panel, Privacy Sandbox Analysis Tool for cookies, effective Content Security Policy in the Applications panel, improved animations debugging, enhanced ignore listing, and more.'
tags:
  - new-in-devtools
  - devtools
  - chrome-120
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

<!-- $contentStart -->

## Third-party cookie phaseout {: #3pc }

Your site may use third-party cookies and it's time to take action as we approach their deprecation. To learn what to do about affected cookies, see [Preparing for the end of third-party cookies](/blog/cookie-countdown-2023oct/).

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Include third-party cookie issues** checkbox has been enabled by default for all Chrome users, so the **Issues** tab now warns you about the cookies that will be affected by the upcoming deprecation and phaseout of third-party cookies. You can clear the checkbox at any time to stop seeing these issues.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DjvhUFzFqSA2x1RndzLO.png", alt="A warning about the upcoming third-party cookie deprecation in the Issues tab.", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5656fa6c28f29257f6d8b02df8d799dc19b4eaa #}

Chromium issue: [1466310](https://crbug.com/1466310).

## Analyze your website's cookies with the Privacy Sandbox Analysis Tool {: #ps-analysis-tool }

The [Privacy Sandbox Analysis Tool](https://github.com/GoogleChromeLabs/ps-analysis-tool) extension for DevTools is under active development with the latest pre-release [version of 0.3.2](https://github.com/GoogleChromeLabs/ps-analysis-tool/releases). The tool lets you understand how your website uses cookies and provides guidance on the new privacy-preserving Chrome APIs.

To analyze your cookies:

1. [Install the extension](https://github.com/GoogleChromeLabs/ps-analysis-tool#installing-and-running-psat) in Chrome.
1. Open your website in a single tab for best analysis.
1. [Open DevTools](/docs/devtools/open/) and navigate to the **Privacy Sandbox** panel. This panel might be hidden behind the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ekcx09RfcNTMEi60n8Jj.svg", alt="More tabs.", width="20", height="20" %} drop-down button at the top.
1. Open the **Cookies** section and click **Analyze this tab**. If the tool didn't find any cookies, try reloading the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pd5Rji1qdvVUZyzll1WS.png", alt="The Privacy Sandbox Analysis Tool.", width="800", height="567" %}

For more information on how to use the [Privacy Sandbox Analysis Tool (PSAT)](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki), see the following:

- [PSAT's How To](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/A.-PSAT's-How-To).
- To predict what is likely to happen once the deprecation comes into effect, set up an [Evaluation Environment](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/B.-Evaluation-Environment).
- To identify aspects to be affected, see [General Analysis Actions](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/C.-General-Analysis-Actions).
- To learn how to analyze common scenarios, including analytics, e-commerce, SSO services, embedded content, and more, check out the demo examples in [Analysis Scenarios](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/D.-Analysis-Scenarios).

Moreover, see guidance on [Reporting issues](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/E.-Reporting-Issues-and-Learning-More).

## Enhanced ignore listing {: #ignore-listing }

### Default exclusion pattern for `node_modules` {: #default-regex }

This version enables the default regular expression as a custom exclusion rule in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](docs/devtools/settings/ignore-list/). To help you focus on only your code, the **Debugger** will now skip scripts from `/node_modules/` and `/bower_components/` by default. You can disable this rule in settings at any time.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YW04UKu8dXAxIby609b1.png", alt="The before and after adding a regular expression.", width="800", height="461" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ae9af17d55a76abc959667bc61d36df50cd64617 #}

Chromium issue: [1496301](https://crbug.com/1496301).

### Exceptions now stop execution if caught or passing through non-ignored code {: #exceptions }

When you debug code with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pause on caught exceptions** checked, the **Debugger** now stops the execution on the following caught exceptions, both synchronous and asynchronous:

- Exceptions caught in non-ignored frames in the call stack.
- Caught exceptions that pass through non-ignored frames in the call stack. For example, see the screenshot.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DcFYfGliv5HO3mXV8pxT.png", alt="Pause on a caught exception that passed through non-ignored code.", width="800", height="509" %}

To test this behavior, open [this demo page](https://devtools-ignore-list-stories.glitch.me/):

1. Open DevTools > **Sources**, add the `hidden` [folder to the ignore list](/docs/devtools/javascript/reference/#file-tree-ignore-list), and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pause on caught exceptions**.
1. On the page, under the "Caught" list of scenarios, click the different buttons and see the execution paused in the mentioned cases.

To pause execution on caught and/or uncaught exceptions (when checked) in asynchronous calls, the **Debugger** looks for rejection handlers across promises. Starting with this version, the **Debugger** no longer predicts that `Promise.finally()` will catch an exception, similar to how the `try...finally` block doesn't catch any.

{# https://chromium.googlesource.com/v8/v8.git/+/8449af375a7282a4347b197146fc838ccc1bc719 #}
{# https://chromium.googlesource.com/v8/v8.git/+/94d44af3f774cb57f7f04b43bef3a644c9878644 #}

Chromium issues: [1489312](https://crbug.com/1489312), [1291064](https://crbug.com/1291064).

### `x_google_ignoreList` renamed to `ignoreList` in source maps {: #ignore-list-spec }

The [source maps specification](https://sourcemaps.info/spec.html) has [adopted](https://github.com/tc39/source-map-spec/pull/19) the `ignoreList` field instead of `x_google_ignoreList` and DevTools now supports the new name with a fallback for the old one. Frameworks and bundlers can now use the new field name.

Source maps let you debug the code you wrote rather than minified code served by your website.

For more information on source maps, see:

- [What are source maps](https://web.dev/articles/source-maps)
- [Debug your original code instead of deployed with source maps](/docs/devtools/javascript/source-maps/)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a5ef7b0545e43e68e5e4ebcdd309aa3c6c927598 #}

## New input mode toggle during remote debugging {: #remote-input-mode }

You can now toggle between touch and mouse input when debugging a Chrome tab remotely. For example, when you run a Chrome instance with the `--remote-debugging-port=<port>` and connect to this network target via `chrome://inspect/#devices`.

Watch the video to see input mode toggling in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Mux9Dh4PazeINtyFNSYg.mp4", width="800", height="479", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/28f1262c413523433c8252ae046cabbb97d6211e #}

Chromium issue: [1410433](https://crbug.com/1410433).

## The Elements panel now shows URLs for `#document` nodes {: #document-urls }

To let you debug iframes easier, the **Elements** panel now displays `documentURL` next to `#document` nodes.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/afcWfDe9f4Xf1G7Bp062.png", alt="The before and after shows documentURL next to #document node.", width="800", height="401" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/25e7a0a631115e2649c7b40ec301ca513961a264 #}

Chromium issue: [1376976](https://crbug.com/1376976).

## Effective Content Security Policy in the Application panel {: #csp }

You can now view the [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) details of an inspected frame. To view the details, navigate to **Application** > **Frames**, select a frame and scroll down to the **Content Security Policy (CSP)** section.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hqCYqEh6rqckFz8e6xj8.png", alt="The Content Security Policy section in Application > Frames.", width="800", height="446" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dee14d983039f08b350c4932efc983e89ceb7dbe #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/61baf65bc88cb991e4fcd9073c8a409f81464ab3 #}

Chromium issue: [1424714](https://crbug.com/1424714).

## Improved animation debugging {: #animations }

In the **Animations** tab, you can now:

- Click anywhere on the timeline header to set the playhead. The animation continues to play if it was already playing and stops otherwise. Previously, you had to drag it.
- Resize the name column to see the full animation names.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/QAXZfGIslB61Alhbbyjs.mp4", width="800", height="353", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6aafa9de8000bbb4a889375dc483e2da28edd960 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3c68b4da98b91f729a007b804f548185403a775f #}

Chromium issues: [1492460](https://crbug.com/1492460), [1489721](https://crbug.com/1489721).

## 'Do you trust this code?' dialog in Sources and self-XSS warning in Console {: #self-xss }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show warning about Self-XSS when pasting code** [experiment](/docs/devtools/settings/experiments/) has been enabled by default. Self-XSS (self cross-site scripting) is an attack that tricks you into pasting malicious code into DevTools and lets an attacker gain control of your web accounts and personal information.

If you are a new DevTools user and you attempt to paste code, the **Sources** panel now shows you the **Do you trust this code?** dialog and the **Console** now displays a similar warning. Paste only the code that you understand and have reviewed yourself. To paste, type `allow pasting` when prompted. Once pasting has been allowed once, the warning will never be shown again.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HZxshcqZev8dBvDwYD0v.png", alt="The 'Do you trust this code?' dialog when pasting code to Sources.", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/33f928b256c219c815530cb04e8e1160fb28a480 #}

Chromium issue: [345205](https://crbug.com/345205).

## Event listener breakpoints in web workers and worklets {: #worker-breakpoints }

When you set an event breakpoint in **Sources** > **Event Listener Breakpoints**, in addition to pausing on this event on your website, the **Debugger** now also pauses when the corresponding event happens in a [web worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API#worker_types) or [worklet](https://developer.mozilla.org/docs/Web/API/Worklet) of any type, including the [Shared Storage Worklet](/docs/privacy-sandbox/shared-storage/#how-does-shared-storage-work).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZCIFXMeZDGW4BMJZhgoZ.png", alt="Debugger paused when a service worker calls the set timeout function.", width="800", height="549" %}

{% Aside %}
**Note**: Not all worker types support all of the corresponding APIs, so the **Debugger** might not pause when you expect it to.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992fc88c6c9549810616f83dae64047e3e654bf7 #}

Chromium issue: [1445175](https://crbug.com/1445175).

## The new media badge for `<audio>` and `<video>` {: #media }

You can now enable the new media badge for `<audio>` and `<video>` elements in the **Elements** panel. When you click the badge, it takes you to the [**Media** panel](/docs/devtools/media-panel/), so you can debug these elements. 

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HzQvfQNSiygBdch9UmTt.png", alt="The new media badge for audio and video tags enabled.", width="800", height="522" %}

This feature is under development and will be further improved. The DevTools team would like to express gratitude to [Junseo (Jeremy) Yoo](https://chromium.googlesource.com/devtools/devtools-frontend/+/2d6d5624affeb912b95d61fb7267c9cad4686731) for landing this improvement.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2d6d5624affeb912b95d61fb7267c9cad4686731 #}

Chromium issue: [1448214](https://crbug.com/1448214).

## Preloading renamed to Speculative loading {: #speculative-loading }

To avoid overusing the previous term and better reflect the behavior, **Application** > **Preloading** has been renamed into **Speculative loads**. [Speculative loading](/blog/prerender-pages/) allows a [near-instant page load](/blog/prerender-pages/#impact-of-prerendering) based on speculation rules that [you can define](/blog/prerender-pages/#the-speculation-rules-api) for your website to prerender and prefetch most navigated-to pages.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kloAL5Vj50i4YfTQtO6h.png", alt="The before and after renaming preloading into speculative loading.", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b4c2082bd36ab2fa8eccf24c2348f85148a2eb5 #}

Chromium issue: [1478888](https://crbug.com/1478888).

## Lighthouse 11.2.0 {: #lighthouse }

The **Lighthouse** panel now runs Lighthouse 11.2.0. See the [full list of changes](https://github.com/GoogleChrome/lighthouse/releases/tag/v11.2.0).

This update includes an overhaul to the performance category. Performance insights are now scored and prioritized based on their estimated impact to the performance metrics. Additionally, the performance score gauge includes more detailed information about how each metric affects the score.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ax8j1I0KntXSphFTT12b.png", alt="The before and after performance overhaul.", width="800", height="382" %}

To learn the basics of using the **Lighthouse** panel in DevTools, see [Lighthouse: Optimize website speed](/docs/devtools/lighthouse/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5d879fe161d12dfebeefef3734b8b18407287cd4 #}

Chromium issues: [772558](https://crbug.com/772558).

## Accessibility improvements {: #accessibility }

This version has the following accessibility improvements:

- Screen readers will now announce the status (checked or unchecked) of checkboxes under **Sources** > **Breakpoints**.
- You can now access the **Hide issues like this** drop-down menu with the keyboard.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2b96e9e114928bb3df9e594adb385059285e56c7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/39f76f2c6ae4f3fd9193606682e0e4d0ab3f866e #}

Chromium issues: [1488645](https://crbug.com/1488645), [1484918](https://crbug.com/1484918).

## Miscellaneous highlights {: #misc }

These are some noteworthy fixes and improvements in this release:

- **Performance**: Fixed the sometimes missing LCP indicator in the recording ([1487136](https://crbug.com/1487136)).
- Speculative loads: Fixed the full URLs for targets in the drop-down menu in the **Network** panel ([1471020](https://crbug.com/1471020)).
- **Coverage**:
  - Fixed line-by-line coverage for pretty-printed code ([1464974](https://crbug.com/1464974)).
  - The coverage information now updated on page reload ([1494457](https://crbug.com/1494457)).
- **Console**:
  - Fixed partial text selection in messages ([1487449](https://crbug.com/1487449)).
  - Fixed the flickering of autocomplete drop-down ([1487453](https://crbug.com/1487453)).
  - Supported parentheses in stack paths and URLs in stack traces ([1473926](https://crbug.com/1473926)).
- **Sources**: Supported the syntax highlighting of the TypeScript `using` keyword ([1490515](https://crbug.com/1490515)).
- **Quick Open** menu now shows private methods ([1492957](https://crbug.com/1492957)).
- **Application** > **Background services**: The top action bar now wraps text when resizing ([1487276](https://crbug.com/1487276)).
- **Elements** > **Styles**:
  - Fixed the resolution of the inherited CSS variables for slotted elements ([1492162](https://crbug.com/1492162)).
  - When disabling a CSS property, its comments are now stripped to fix syntax breaks ([1101224](https://crbug.com/1101224)).
- **Network**: The **Priority** column now shows a tooltip with information on initial priority (the same is shown when **Big request rows** is checked) ([1495735](https://crbug.com/1495735)).
- Deprecations:
  - The **Color format** setting has been disabled in previous versions and is now removed.
  - The Delete all overrides option in **Sources** is now removed due to low usage after the [streamlining of overrides](blog/new-in-devtools-117/#overrides) ([1473681](https://crbug.com/1473681)).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

