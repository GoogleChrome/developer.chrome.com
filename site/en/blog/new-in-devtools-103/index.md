---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 103)"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "Record double-click and right-click events, new options to measure user flow in Lighthouse and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TWCiJaqb6IKBRsOyqYBo.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

## Capture double-click and right-click events in the Recorder panel {: #recorder }

The **Recorder** panel can now capture double-click and right-click events.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Capture double-click and right-click events in the Recorder panel", width="800", height="572" %}

In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:

- Double-click the card to enlarge it
- Right-click the card and select an action from the context menu

To understand how **Recorder** captured these events, expand the steps:

- **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`.

Chromium issues: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse }

You can now use **Lighthouse** to measure your website’s performance beyond page load.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="New timespan and snapshot mode in the Lighthouse panel", width="800", height="507" %}

The **Lighthouse** panel now supports 3 modes of user flow measurement:

- [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it.

For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Timespan mode", width="800", height="549" %}

See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Chromium issue: [1291284](https://crbug.com/1291284)


## Performance Insights updates {: #performance }

### Improved zoom control in the Performance Insights panel {: #zoom }

DevTools will now zoom in based on your mouse cursor rather than the playhead position.With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel.

Chromium issue: [1313382](https://crbug.com/1313382)


### Confirm to delete a performance recording {: #delete }

DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="Confirm to delete a performance recording", width="800", height="549" %}

Chromium issue: [1318087](https://crbug.com/1318087)


## Reorder panes in the Elements panel {: #reorder-pane }

You can now reorder panes in the **Elements** panel based on your preference.

For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="Reorder panes in the Elements panel", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Chromium issue: [1146146](https://crbug.com/1146146)


## Picking a color outside of the browser {: #color }

DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser.

In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="Picking a color outside of the browser", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Chromium issue: [1245191](https://crbug.com/1245191)


## Improved inline value preview during debugging {: #inline-preview }

The debugger now shows the inline values preview correctly.

In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="Improved inline value preview during debugging", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Chromium issue: [1316340](https://crbug.com/1316340)


## Support large blobs for virtual authenticators {: #webauthn }

The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators.

This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt=" Support large blobs for virtual authenticators", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Chromium issue: [1321803](https://crbug.com/1321803)


## New keyboard shortcuts in the Sources panel {: #shortcuts }

Two new keyboard shortcuts are now available in the  **Sources** panel:

- Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="New keyboard shortcuts for the Sources panel", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1226363](https://crbug.com/1226363)


## Source maps improvements {: #sourcemaps }

Previously, developers experience random failure during:

- Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled

Here are a few fixes on source maps to improve the overall debugging experience:

- Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Chromium issues: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
