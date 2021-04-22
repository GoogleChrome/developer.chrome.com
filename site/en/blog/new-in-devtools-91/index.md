---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 91)"
authors:
  - jecelynyeen
date: 2021-04-21
updated: 2021-04-21
description:
  "Web vitals information pop up, visualize CSS scroll-snap, new Memory inspector and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRH6N7U6lOQHI50ATjxp.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-91
---

{% Aside %}
Interested in helping improve DevTools? Sign up to participate in [Google User Research here](https://google.qualtrics.com/jfe/form/SV_9YbKj35IGoGsDBj?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXFm430458).
{% endAside %}

## Web Vitals information pop up in the Performance panel {: #web-vitals }
Hover on a Web Vitals marker in the **Performance** panel to understand what's the indicator about - whether the performance is good, needs improvement, or poor.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BTpc3iOnzmLhNvv9XZwF.png", alt="Web Vitals information pop up", width="800", height="524" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a5ee192a42493f0b31f360da9caee458d18fb0c5 #}

Chromium issue: [1147872](https://crbug.com/1147872)


## Visualize CSS scroll-snap {: #css-croll-snap }
You can now toggle the `scroll-snap` badge in the **Elements** panel to inspect the CSS scroll-snap alignment.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/H3smYZG2alG5PQU3BHw3.png", alt="CSS scroll-snap", width="800", height="507" %}

When an HTML element on your page (e.g. this [demo](https://mathiasbynens.github.io/css-dbg-stories/css-scroll-snap.html) page) has `scroll-snap-type` applied to it, you can see a `scroll-snap` badge next to it in the **Elements** panel. Click the badge to toggle the display of a scroll-snap overlay on the page.

In the example above, you can see dot marks on snap edges. The scroll port has solid outlined while the snap items have dash outlines. The scroll padding is filled in green color while the scroll margin is filled in orange.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e63382911634945d2113d2c2215e6dd3bff9a28a #}

Chromium issue: [862450](https://crbug.com/862450)


## New Memory inspector {: #memory-inspector }
Use the new **Memory inspector** to inspect an `ArrayBuffer` in JavaScript, as well as the Wasm memory. 

Open [this demo page](https://memory-inspector.glitch.me/demo-js.html). In the **Sources** panel, open the **demo-js.js** file, and set a breakpoint at line 15.

Refresh the page. Expand the **Scope** section in the right **debugger** pane. Notice the new icon next to the **buffer** value. Click on it to reveal the **Memory Inspector**.

Try [this demo](https://memory-inspector.glitch.me/demo-wasm.html) for Wasm memory inspection. Read [this article](/blog/webassembly/#memory-inspector) to learn more on how to inspect Wasm memory.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7CY7ijbHVfFFl7DM3lLT.png", alt="Memory inspector", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7de6c9a80d7214559939399310b7ef1184554d92 #}
Chromium issue: [1166577](https://crbug.com/1166577)


## New badge settings pane in the Elements panel {: #badge-settings }
You can now selectively enable or disable badges via the **Badge settings** in the **Elements** panel. Use this feature to customize and stay focused on the important badges while inspecting web pages. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BliSe8qwK8G6lFvNtmTv.png", alt="badge settings pane in the Elements panel", width="800", height="524" %}

In the **Elements** panel, right click on any elements. Select **Badge settings** from the context menu, the badge settings pane appears on top. Enable or disable any checkbox to show/hide the badges.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9be84da12cff6935b15173b615df5132b0418eaa #}

Chromium issue: [1066772](https://crbug.com/1066772)


## Enhanced image preview with aspect ratio information  {: #image-preview }
Image previews in the **Elements** panel now displays more information on the image - rendered size, rendered aspect ratio, intrinsic size, intrinsic aspect ratio, and file size. 

This information helps you better understand your images and apply optimization if you need to.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LvPDU04gjOhjWJ2h2bdi.png", alt="Image preview with aspect ratio information", width="800", height="505" %}

The image aspect ratio information is available in the **Network** panel as well when you click to preview the image.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/blVl3UjoEBw90AXgEs9I.png", alt="Image aspect ratio information in the Network panel", width="800", height="505" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/83ce85f4b06fc320a728a0fbabbaebdd04cb90ee #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/680fdf1d415dd747f3649dde3752eeef73d8f690 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d43db246fd0782b17f3a4123c0b470a703ada9d1 #}

Chromium issues: [1149832](https://crbug.com/1149832), [1170656](https://crbug.com/1170656)


## New network conditions button with options to configure `Content-Encoding`s  {: #network-panel }
A new network conditions button is added in the **Network** panel. Click on it to open the **Network conditions** tab.

A new **Accepted Content-Encodings** option is added to the **Network conditions** tab. Configure it to test if server responses are encoded correctly in browsers that do not support gzip, brotli, or other future `Content-Encoding`s.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ygmMhry5lBawc7EcfJog.png", alt="New network conditions button with options to configure Content-Encoding", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2fc8c14ed7a8dc0e08fd7ec07f307f9e903a1ff0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afd74f9d8abd97b2c5b7d4668497d972f7cbbdb0 #}

Chromium issue: [1162042](https://crbug.com/1162042)


## Styles pane enhancements {: #styles }

### New shortcut to view computed value in the Styles pane {: #computed-value }
You can now right click on a CSS property in the **Styles** pane and select **View computed value** to view the computed CSS value.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3neADdgFglmViAxnZ6zS.png", alt="New shortcut to view computed value", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/01b8d8c661e3ad422dc0a6692ee3100c4168006c #}

Chromium issue: [1076198](https://crbug.com/1076198)


### Support for the `accent-color` keyword {: #accent-color }
The Styles pane's autocomplete UI now detects the [`accent-color`](https://drafts.csswg.org/css-ui-4/#widget-accent) CSS keyword, which allows web developers to specify the accent color for UI controls (e.g. checkbox, radio button) generated by the element.

The `accent-color` CSS property is [currently experimental](https://chromestatus.com/feature/4752739957473280). Please enable `chrome://flags/#enable-experimental-web-platform-features` to test it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y4oS3jvinp4fgfxav4tP.png", alt="accent-color", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/207ee9372daf32d51374afba176cdf1aa1d5e412 #}
Chromium issue: [1092093](https://crbug.com/1092093)


## Categorize issue types with colors and icons {: #issue-category }
The **Issues** tab now categorize issues into page errors, upcoming breaking changes, and possible improvements for better severity indication. You can open the **Issues** tab by clicking on the **issue count** button in the **Console**.

- **Page errors (red)**. Issues that have immediate impact for page functionality, such as not setting correct [CORS](https://web.dev/cross-origin-resource-sharing/) headers, etc.
- **Upcoming breaking changes (yellow)**. Issues that inform about an upcoming, incompatible change of the web platform that may result in a loss of page functionality (e.g. warning of upcoming [CORS RFC 1918 changes](https://web.dev/cors-rfc1918-feedback)).
- **Possible improvements (blue)**. Potential improvements on the page, but are currently not impairing basic functionality of the page (e.g. accessibility issues)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/urhDPcFLC8LO4ibV20Hd.png", alt="Categorize issue types with colors and icons", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8fb5eae8cb55c4fac5acd2a8e2a59b7a84310c82 #}

Chromium issue: [1183241](https://crbug.com/1183241)


## Delete Trust tokens {: #trust-tokens }
You can now delete trust tokens with the new delete button in the **Trust tokens** pane, under the **Application** panel.

Trust Token is a new API to help combat fraud and distinguish bots from real humans, without passive tracking. Learn how to [get started with Trust Tokens](https://web.dev/trust-tokens/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3WPcQCDFBydw04zETEV.png", alt="Delete Trust tokens", width="800", height="435" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf83ad89eb6c8fa903d29919a711784aeb7557e4 #}

Chromium issue: [1126824](https://crbug.com/1126824)


## View details on blocked features in the Frame details view  {: #permissions-policy }
You can now view details on blocked features under the **Permissions policy** section in the Frame details view.

Open this [demo](http://permission-policy-demo.glitch.me/) page. Go to the **Application** panel and select a frame. In the **Permissions Policy** section, scroll to the **Disabled Features** property. Click on **Show details** to view the details on why the feature is blocked. Click on the icon next to each policy to navigate to the iframe or network request that blocked the feature.

[Permissions policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md) is a web platform API which gives a website the ability to allow or block the use of browser features in its own frame or in iframes that it embeds.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8GxecpqtEUv3xoocvcLi.png", alt="Blocked features in the Frame details view", width="800", height="461" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4751c1c8dcb151c985b1e54cb1c1a05cb83704b8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89cc8730ade0d0018671f19770bacc93b705b9ff #}
 
Chromium issue: [1158827](https://crbug.com/1158827)


## Filter experiments in the Experiments setting {: #filter-experiment }
Find experiments quicker with the new experiment filter. For example, go to **Settings** > **Experiments**, in the **Filter** textbox, type "contrast" to filter all the experiments with the word "contrast".

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dwGsjklZTIihki8uYLTn.png", alt="Filter experiments in the Experiments setting", width="800", height="524" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/080437fc01191517eb8194a6e8e1f454e42b69d4 #}


## New `Vary Header` column in the Cache storage pane {: #vary-header }
Use the new `Vary Header` column in the **Cache Storage** pane to view the [Vary](https://httpwg.org/specs/rfc7231.html#header.vary) HTTP response header.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NA5OmN8upMB3thEwXHKE.png", alt="Vary Header column", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0e1057d6ad9bddfca3bc8053215aa83752f50db7 #}

Chromium issue: [1186049](https://crbug.com/1186049)


## Sources panel improvements  {: #sources }

### Support for new JavaScript features {: #javascript }
DevTools now support the new [private brand check](https://v8.dev/features/private-brand-checks) JavaScript language feature, a.k.a `#foo in obj`.

This private brand checks feature extends the [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) to support the [private class fields](https://v8.dev/features/class-fields#private-class-fields) testing on any given object. 

Try it out in the **Console** and **Sources** panel. You can inspect the private fields in the **Scope** section under the **debugger** pane as well.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/RCw19qd1bZOeNFydsUCW.png", alt="JavaScript private brand checks", width="800", height="504" %}

Chromium issue: [11374](https://crbug.com/v8/11374)


### Enhanced support for breakpoints debugging {: #breakpoint }
DevTools now properly set breakpoints in multiple scripts correctly. Modern JavaScript bundlers (e.g. [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/)) support code splitting feature - there are scenarios where one shared component can be included in multiple routes (code splits). 

Previously, DevTools was only able to set breakpoints on one raw location. With this latest improvement, DevTools can set breakpoints in all relevant locations correctly.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42a214129db8ec58fd74f6acd7b07c7dc169a713 #}

Chromium issues: [1142705](https://crbug.com/1142705), [979000](https://crbug.com/979000), [1180794](https://crbug.com/1180794)


### Support hover preview with `[]` notation {: #expression-preview }
DevTools now support for hover preview on JavaScript member expressions that use the `[]` notation in the **Sources** panel.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XFxlQjvLVWJUiV24zDw2.png", alt="Support hover preview with '[]' notation", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ebaf1aed1524c64a0909d257be4a0aa28f7b6bd #}

Chromium issue: [1178305](https://crbug.com/1178305)


### Improved outline of HTML files {: #html-outline }
DevTools now has better outline support for HTML files. In the **Sources** panel, open a HTML file. You can toggle the code outline with keyboard Cmd + Shift + O in Mac or Ctrl + Shift + O in Windows. 

In the example below, DevTools now correctly list all functions in the outline. Previously, DevTools only showed some of the functions.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tOzDFrFwQNbDG4mlexd3.png", alt=" Improved outline of HTML files", width="800", height="463" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96a7adb8c0e3472a554f2b0889a7a4902ec78087 #}

Chromium issue: [761019](https://crbug.com/761019), [1191465](https://crbug.com/1191465)


### Proper error stack traces for Wasm debugging {: #error-stack-traces }

DevTools now resolves inline function calls and shows proper error stack traces for Wasm debugging.

Previously DevTools only displayed generic Wasm references in the Error stack traces.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/rIngYpWX5CrxGhmtIL1L.png", alt="Proper error stack traces for Wasm debugging", width="800", height="423" %}

The old version of Chrome on the left does not show the source location (e.g. `dsquare`) in the Error stack traces, whereas the new version on the right does.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/068b01dc6fac2343045da703607f6fb87183bc7e #}

Chromium issue: [1189161](https://crbug.com/1189161)

