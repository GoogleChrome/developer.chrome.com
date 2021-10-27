---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 96）"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aUnjMsVWCJvIiUCq5Rxp.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
draft: true
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*感谢[流浪大法师](https://webfrontend.dev/)提供的翻译。*

{% include 'partials/devtools/zh/banner.md' %}

<!-- ## Preview feature: New CSS Overview panel {: #css-overview } -->

<!-- Use the new **CSS Overview** panel to identify potential CSS improvements on your page.
[Open the **CSS Overview** panel](/docs/devtools/css-overview#open), then click on **Capture overview** to generate a report of your page’s CSS. -->

<!-- You can further drill down on the information. For example, click on a color in the **Colors** section to view the list of elements that apply the same color. Click on an element to open the element in the **Elements** panel. -->

<!-- The **CSS Overview** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements. -->

<!-- Read [this article](/docs/devtools/css-overview) to learn more on the **CSS Overview** panel. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="CSS Overview panel", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium 议题： [1254557](https://crbug.com/1254557)


<!-- ## Rendering tab updates  -->

<!-- ### Emulate the CSS prefers-contrast media feature {: #prefers-contrast } -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Emulate the CSS prefers-contrast media feature", width="800", height="483" %}

<!-- The [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) media feature is used to detect if the user has requested more or less contrast in the page. -->

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature prefers-contrast** dropdown. -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Chromium 议题： [1139777](https://crbug.com/1139777)


<!-- ### Emulate the Chrome’s Auto Dark Theme feature {: #auto-dark-mode } -->

<!-- Use DevTools to emulate auto dark theme to easily see how your page looks when Chrome’s [Auto Dark Theme](/blog/auto-dark-theme/) is enabled. -->

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System.  -->

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate auto dark mode** dropdown. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Emulate the Chrome’s Auto Dark Theme feature", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Chromium 议题： [1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->

<!-- Two new options are added in the context menu  for you to easily copy CSS rules as JavaScript properties. These shortcuts options are handy especially for developers who are working with [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)  libraries. -->

<!-- In the **Styles** pane, right click on a CSS rule. You can select **Copy declaration as JS** to copy a single rule or **Copy all declarations as JS** to copy all rules. -->

<!-- For instance, the example below will copy `padding-left: '1.5rem'` to the clipboard. -->

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copy declaration as JavaScript", width="800", height="469" %} -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Chromium 议题： [1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->

<!-- Use the new **Payload** tab in the **Network** panel when you inspect a network request with payload. Previously, the payload information is available under the **Headers** tab. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Payload tab in the Network panel", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Chromium 议题： [1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->

<!-- The **Properties** pane now shows only relevant properties instead of showing all properties of the instance. DOM prototypes and methods are now removed. -->

<!-- Together with the **Properties** pane [enhancements](/blog/new-in-devtools-95/#properties) in Chrome 95, you can now locate the relevant properties easier. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="The display of properties in the Properties pane", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Chromium 议题： [1226262](https://crbug.com/1226262) 


<!-- ## Console updates -->

<!-- ### Option to hide CORS errors in the Console {: #hide-cors-errors } -->

<!-- You can hide CORS errors in the **Console**. As the CORS errors are now reported in the Issues tab, hiding CORS errors in the **Console** can help reduce the clutters. -->

<!-- In the **Console**, click on the **Settings** icon and uncheck the **Show CORS errors in console** checkbox. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Option to hide CORS errors in the Console", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Chromium 议题： [1251176](https://crbug.com/1251176)


<!-- ### Proper `Intl` objects preview and evaluation in the Console {: #intl } -->

<!-- The [Intl](https://tc39.es/ecma402/#intl-object) objects have proper preview now and are evaluated eagerly in the Console. Previously, the `Intl` objects were not evaluated eagerly. -->

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Intl objects in the Console", width="800", height="559" %} -->

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Chromium 议题： [1073804](https://crbug.com/1073804)


<!-- ### Consistent async stack traces {: #async } -->

<!-- DevTools now reports `async` stack traces for `async` functions to be consistent with other async tasks.  -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="async stack traces", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Chromium 议题： [1254259](https://crbug.com/1254259)


<!-- ### Retain the Console sidebar {: #console-sidebar } -->

<!-- The Console sidebar is here to stay. In Chrome 94, we announced the [upcoming deprecation of the Console sidebar](/blog/new-in-devtools-94/#deprecated) and ask developers for feedback and concerns. -->

<!-- We have now got enough feedback from the deprecation notice and we will work on improving the sidebar rather than removing it. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Console sidebar", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Chromium 议题: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


<!-- ## Deprecated Application cache pane in the Application panel {: #app-cache } -->

<!-- The [Application cache](https://developer.chrome.com/docs/devtools/storage/applicationcache/) pane in the Application panel is now removed as the support for [AppCache](https://web.dev/appcache-removal/) is removed from Chrome and other Chromium-based browsers. -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Chromium 议题： [1084190](https://crbug.com/1084190) 


<!-- ## [Experimental] New Reporting API pane in the Application panel {: #reporting-api } -->

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
{% endAside %}

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->

<!-- With this experiment enabled, you can now view the reports status in the new **Reporting API** pane in the **Application** panel.  -->

<!-- Please note that the **Endpoints** section is currently still under active development (showing no reporting endpoints for now).  -->

<!-- Learn more about the **Reporting API** with [this article](https://web.dev/reporting-api/). -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Reporting API pane in the Application panel", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Chromium 议题： [1205856](https://crbug.com/1205856)

{% include 'partials/devtools/zh/reach-out.md' %}
{% include 'partials/devtools/zh/whats-new.md' %}
