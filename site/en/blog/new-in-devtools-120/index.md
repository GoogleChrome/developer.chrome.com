---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 120)"
authors:
  - sofiayem
date: 2023-11-01
description: ""
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/C5z0hHEPjBwgsXg2WG0t.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-120
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

<!-- $contentStart -->

## Third-party cookie phaseout {: #3pc }

Your site may use third-party cookies and it's time to take action as we approach their deprecation. To learn what to do about affected cookies, see [Preparing for the end of third-party cookies](https://developer.chrome.com/blog/cookie-countdown-2023oct/).

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="24", height="24" %} **Include third-party cookie issues** checkbox has been enabled by default for all Chrome users, so the **Issues** panel now warns you about the cookies that will be affected by the upcoming deprecation and phaseout of third-party cookies.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DjvhUFzFqSA2x1RndzLO.png", alt="A warning about the upcoming third-party cookie deprecation in the Issues panel.", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5656fa6c28f29257f6d8b02df8d799dc19b4eaa #}

Chromium issue: [1466310](https://crbug.com/1466310).

## Analyze your website's cookies with the Privacy Sandbox Analysis Tool {: #ps-analysis-tool }

The [Privacy Sandbox Analysis Tool](https://github.com/GoogleChromeLabs/ps-analysis-tool) extension for DevTools is under active development with the latest pre-release [version of 0.3.1](https://github.com/GoogleChromeLabs/ps-analysis-tool/releases). The tool lets you understand how your website uses cookies and provides guidance on the new privacy-preserving Chrome APIs.

To analyze your cookies:

1. [Install the extension](https://github.com/GoogleChromeLabs/ps-analysis-tool#install-psat-from-zip-file) in Chrome.
1. Open your website in a single tab for best analysis.
1. [Open DevTools](/docs/devtools/open/) and navigate to the **Privacy Sandbox** panel. This panel might be hidden behind the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ekcx09RfcNTMEi60n8Jj.svg", alt="More tabs.", width="20", height="20" %} drop-down button at the top.
1. Open the **Cookies** section and click **Analyze this tab**. If the tool didn't find any cookies, try reloading the page.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zQo1rh5VHAhVGMamCjo9.png", alt="The Privacy Sandbox Analysis Tool.", width="800", height="652" %}

For more information on how to use the Privacy Sandbox Analysis Tool, see its [GitHub Wiki](https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki/A.-PSAT's-How-To).

## Effective Content Security Policy in the Application panel {: #csp }

You can now view the [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) details of an inspected frame. To view the details, navigate to Application > Frames, select a frame and scroll down to the **Content Security Policy (CSP)** section.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hqCYqEh6rqckFz8e6xj8.png", alt="The Content Security Policy section in Application > Frames.", width="800", height="446" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dee14d983039f08b350c4932efc983e89ceb7dbe #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/61baf65bc88cb991e4fcd9073c8a409f81464ab3 #}

Chromium issue: [1424714](https://crbug.com/1424714).

## Improved animation debugging {: #animations }

In the **Animations** tab, you can now:

- Click anywhere on the timeline header to set the playhead. The animation continues to play if it was already playing and stops otherwise. Previously, you had to drag it.
- Resize the name column to see the full animation names.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/ReiQOLhC2qwi4NeCUbtQ.mp4", width="800", height="454", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6aafa9de8000bbb4a889375dc483e2da28edd960 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3c68b4da98b91f729a007b804f548185403a775f #}

Chromium issues: [1492460](https://crbug.com/1492460), [1489721](https://crbug.com/1489721).

## 'Do you trust this code?' dialog in Sources and self-XSS warning in Console {: #self-xss }

The {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show warning about Self-XSS when pasting code** [experiment](/docs/devtools/settings/experiments/) has been enabled by default. Self-XSS (self cross-site scripting) is an attack that tricks you into pasting malicious code into DevTools and lets an attacker gain control of your web accounts and personal information.

When you attempt to paste code, the **Sources** panel now shows you the **Do you trust this code?** dialog and the **Console** now displays a similar warning. Paste only the code that you understand and have reviewed yourself. To paste, type `allow pasting` when prompted.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HZxshcqZev8dBvDwYD0v.png", alt="The 'Do you trust this code?' dialog when pasting code to Sources.", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/33f928b256c219c815530cb04e8e1160fb28a480 #}

Chromium issue: [345205](https://crbug.com/345205).

## New input mode toggle during remote debugging {: #remote-input-mode }

You can now toggle between touch and mouse input when debugging a Chrome tab remotely. For example, when you run a Chrome instance with the `--remote-debugging-port=<port>` and connect to this network target via `chrome://inspect/#devices`.

Watch the video to see input mode toggling in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Mux9Dh4PazeINtyFNSYg.mp4", width="800", height="479", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/28f1262c413523433c8252ae046cabbb97d6211e #}

Chromium issue: [1410433](https://crbug.com/1410433).

## Event listener breakpoints in web workers and worklets {: #worker-breakpoints }

When you set an event breakpoint in **Sources** > **Event Listener Breakpoints**, in addition to pausing on this event on your website, the **Debugger** now also pauses when the corresponding event happens in a [web worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API#worker_types) or [worklet](https://developer.mozilla.org/docs/Web/API/Worklet) of any type, including the [Shared Storage Worklet](/docs/privacy-sandbox/shared-storage/#how-does-shared-storage-work).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZCIFXMeZDGW4BMJZhgoZ.png", alt="Debugger paused when a service worker calls the set timeout function.", width="800", height="549" %}

{% Aside %}
**Note**: Not all worker types support all of the corresponding APIs, so the **Debugger** might not pause when you expect it to.
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992fc88c6c9549810616f83dae64047e3e654bf7 #}

Chromium issue: [1445175](https://crbug.com/1445175).

## Preloading renamed into Speculative loading {: #speculative-loading }

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
- **Network**: The **Priority** column now shows a tooltip with information on initial priority when **Big request rows** are enabled ([1495735](https://crbug.com/1495735)).
- Deprecations:
  - The **Color format** setting has been disabled in previous version and is now removed.
  - The Delete all overrides option in **Sources** is now removed due to low usage after the [streamlining of overrides](blog/new-in-devtools-117/#overrides) ([1473681](https://crbug.com/1473681)).

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

