---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 96）"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  "新的 CSS 概览面板，模拟 CSS prefers-contrast，Chrome 的自动深色模式以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aUnjMsVWCJvIiUCq5Rxp.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*感谢[流浪大法师](https://webfrontend.dev/)提供的翻译。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

<!-- ## Preview feature: New CSS Overview panel {: #css-overview } -->
## 预览特性: 新的 CSS 概览面板 {: #css-overview }

<!-- Use the new **CSS Overview** panel to identify potential CSS improvements on your page.
[Open the **CSS Overview** panel](/docs/devtools/css-overview#open), then click on **Capture overview** to generate a report of your page’s CSS. -->
使用新的 **CSS 概览**面板，可以帮助您确定自己的页面是否存在可以潜在改善 CSS 的地方。[打开 **CSS 概览**面板](/docs/devtools/css-overview#open)，然后点击**捕获概览**以便于生成有关页面 CSS 的报告。

<!-- You can further drill down on the information. For example, click on a color in the **Colors** section to view the list of elements that apply the same color. Click on an element to open the element in the **Elements** panel. -->
您可以进一步了解该信息。例如，点击**颜色**区域中的颜色来查看应用相同颜色的元素列表。点击一个元素可以在**元素**面板中打开该元素。

<!-- The **CSS Overview** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements. -->
**CSS 概览**面板特性目前还处于预览阶段。我们团队也在积极努力开发该功能。我们期待您的[反馈](https://goo.gle/css-overview-feedback)以便于我们做进一步改进。

<!-- Read [this article](/docs/devtools/css-overview) to learn more on the **CSS Overview** panel. -->
欲了解更多有关于 CSS 概览面板的信息，请阅读[此文章](/docs/devtools/css-overview)。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="CSS 概览面板", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium 议题：[1254557](https://crbug.com/1254557)

<!-- ## Restored and improved CSS length edit and copy experince {: #length } -->
## 修复以及改善 CSS 长度编辑与复制的体验  {: #length }

<!-- The **copy CSS** and **edit as text** experience are restored for CSS properties with length. These experiences are broken in the last release. -->
CSS 长度的**复制**以及**文本编辑**的用户体验问题均已被修复。这两个功能在上轮发布中出现了一些问题。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- In addition, you can drag to adjust the unit value and update the unit type via the dropdown. This add-on length authoring feature should not impact the primary edit as text experience. -->
此外，您还是可以横向拖拽光标加减长度数值以及在下拉列表中选择新的长度单位。这些附加的长度编辑功能不会影响主要的文本编辑体验。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

<!-- Please report via [goo.gle/length-feedback](https://goo.gle/length-feedback) if you found any issues. -->
如果您发现任何问题，请通过 [goo.gle/length-feedback](https://goo.gle/length-feedback) 报告。

<!-- You can disable it via the **Settings** > **Experiments** > **Enable CSS length authoring tools in the Styles pane** checkbox. -->
您可以通过 **设置** > **实验** > **Enable CSS length authoring tools in the Styles pane** 复选框禁用附加的长度编辑功能。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

Chromium 议题: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)

<!-- ## Rendering tab updates  -->
## 渲染选项卡的更新

<!-- ### Emulate the CSS prefers-contrast media feature {: #prefers-contrast } -->
### 模拟 CSS prefers-contrast 媒体特性 {: #prefers-contrast }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="模拟 CSS prefers-contrast 媒体特性", width="800", height="483" %}

<!-- The [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) media feature is used to detect if the user has requested more or less contrast in the page. -->
[prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) 媒体特性可以用来检测用户是否在页面里面或多或少使用对比度。

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature prefers-contrast** dropdown. -->
打开[命令菜单](/docs/devtools/command-menu/)，运行 **Show Rendering** 命令，然后设置带有模拟 CSS preferred-contrast 媒体特性字样的下拉菜单。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Chromium 议题：[1139777](https://crbug.com/1139777)


<!-- ### Emulate the Chrome’s Auto Dark Theme feature {: #auto-dark-mode } -->
### 模拟 Chrome 的自动深色主题特性 {: #auto-dark-mode }

<!-- Use DevTools to emulate auto dark theme to easily see how your page looks when Chrome’s [Auto Dark Theme](/blog/auto-dark-theme/) is enabled. -->
使用 DevTools 模拟自动深色主题以查看页面在 [Chrome 的自动深色主题](/blog/auto-dark-theme/)开启后的外观。

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System.  -->
Chrome 96 发布了[自动深色主题](/blog/auto-dark-theme/)的 [Origin Trial](/blog/origin-trials/) （目前只限于 Android 版）。有了该功能，当用户在操作系统那里选择深色主题时，浏览器将自动为浅色主题网站生成深色主题。

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate auto dark mode** dropdown. -->
打开[命令菜单](/docs/devtools/command-menu/)，运行 **Show Rendering** 命令，然后设置带有模拟自动深色模式字样的下拉菜单。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="模拟 Chrome 的自动深色主题特性", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Chromium 议题：[1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->
## 将样式边栏里面的 CSS 规则复制为 JavaScript 属性 {: #copy-as-js }

<!-- Two new options are added in the context menu  for you to easily copy CSS rules as JavaScript properties. These shortcuts options are handy especially for developers who are working with [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)  libraries. -->
右鍵菜单里面新增了两个选项，方便您将 CSS 规则复制为 JavaScript 属性。这些快捷选项特别适合那些使用 [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js) 库的开发者。

<!-- In the **Styles** pane, right click on a CSS rule. You can select **Copy declaration as JS** to copy a single rule or **Copy all declarations as JS** to copy all rules. -->
在**样式**边栏中，右键点击 CSS 规则。您可以选择 **将声明复制为 JS** 的选项来复制单个规则或选择**将所有声明复制为 JS** 的选项来复制所有规则。

<!-- For instance, the example below will copy `padding-left: '1.5rem'` to the clipboard. -->
例如，下面的示例将会把 `paddingLeft: '1.5rem'` 给复制到剪贴板。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="将 CSS 规则复制为 JavaScript 属性", width="800", height="469" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Chromium 议题：[1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->
## 网络面板新增载荷（Payload）边栏 {: #payload }

<!-- Use the new **Payload** tab in the **Network** panel when you inspect a network request with payload. Previously, the payload information is available under the **Headers** tab. -->
当您想查看网络请求中的 payload 信息时，可以使用**网络**面板里面的 **Payload** 边栏。此前，payload 信息出现在**报头**边栏里。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="网络面板里面的 payload 边栏", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Chromium 议题：[1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->
## 优化属性边栏里面的属性展示 {: #properties }

<!-- The **Properties** pane now shows only relevant properties instead of showing all properties of the instance. DOM prototypes and methods are now removed. -->
**属性**边栏现在只展示相关属性，而不是像之前那样展示实例的所有属性。现在移除对 DOM 原型以及方法的展示。

<!-- Together with the **Properties** pane [enhancements](/blog/new-in-devtools-95/#properties) in Chrome 95, you can now locate the relevant properties easier. -->
配合 Chrome 95 **属性**边栏的[属性展示改善](/blog/new-in-devtools-95/#properties)，您现在可以更轻松地找到相关属性。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="属性边栏里面的属性显示", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Chromium 议题：[1226262](https://crbug.com/1226262)


<!-- ## Console updates -->
## 控制台的更新

<!-- ### Option to hide CORS errors in the Console {: #hide-cors-errors } -->
### 新增选项，用于隐藏控制台里面的 CORS 错误 {: #hide-cors-errors }

<!-- You can hide CORS errors in the **Console**. As the CORS errors are now reported in the Issues tab, hiding CORS errors in the **Console** can help reduce the clutters. -->
您可以隐藏**控制台**里面的 CORS 错误。由于 CORS 的错误已经显示在**问题**选项卡那里，隐藏**控制台**里面的 CORS 错误有助于减少混乱。

<!-- In the **Console**, click on the **Settings** icon and uncheck the **Show CORS errors in console** checkbox. -->
在**控制台**里面，点击**设置**图标，然后取消选中 **在控制台中显示 CORS 错误** 复选框。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="新增选项，用于隐藏控制台里面的 CORS 错误", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Chromium 议题：[1251176](https://crbug.com/1251176)


<!-- ### Proper `Intl` objects preview and evaluation in the Console {: #intl } -->
### 控制台正确预览以及执行 `Intl` 对象 {: #intl }

<!-- The [Intl](https://tc39.es/ecma402/#intl-object) objects have proper preview now and are evaluated eagerly in the Console. Previously, the `Intl` objects were not evaluated eagerly. -->
现在，[Intl](https://tc39.es/ecma402/#intl-object)对象不仅能够被正确预览，而且还能够在控制台里直接查询。此前，Intl 对象不会被立即查询。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="控制台里面的 Intl 对象", width="800", height="559" %}

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Chromium 议题：[1073804](https://crbug.com/1073804)


<!-- ### Consistent async stack traces {: #async } -->
### 统一的异步堆栈信息 {: #async }

<!-- DevTools now reports `async` stack traces for `async` functions to be consistent with other async tasks.  -->
DevTools 现在能够实现`异步`函数的`异步`堆栈信息与其它异步任务的堆栈信息保持一致。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="异步堆栈信息", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Chromium 议题：[1254259](https://crbug.com/1254259)


<!-- ### Retain the Console sidebar {: #console-sidebar } -->
### 保留控制台侧边栏 {: #console-sidebar }

<!-- The Console sidebar is here to stay. In Chrome 94, we announced the [upcoming deprecation of the Console sidebar](/blog/new-in-devtools-94/#deprecated) and ask developers for feedback and concerns. -->
控制台侧边栏将会被保留。在 Chrome 94 中，我们宣布[即将弃用控制台侧边栏](/blog/new-in-devtools-94/#deprecated)，并且向开发者寻求反馈以及意见。

<!-- We have now got enough feedback from the deprecation notice and we will work on improving the sidebar rather than removing it. -->
现在，我们从弃用通知那里获得了足够的反馈，后面我们将致力于改进侧边栏而不是将它移除。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="控制台侧边栏", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Chromium 议题: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


<!-- ## Deprecated Application cache pane in the Application panel {: #app-cache } -->
## 弃用应用程序面板里面的应用程序缓存边栏 {: #app-cache }

<!-- The [Application cache](/docs/devtools/storage/applicationcache/) pane in the Application panel is now removed as the support for [AppCache](https://web.dev/appcache-removal/) is removed from Chrome and other Chromium-based browsers. -->
由于 Chrome 以及基于 Chromium 的浏览器都已移除对 [AppCache](https://web.dev/appcache-removal/) 的支持，因此**应用**面板里面的[应用缓存](/docs/devtools/storage/applicationcache/)边栏现已被移除。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Chromium 议题：[1084190](https://crbug.com/1084190)


<!-- ## [Experimental] New Reporting API pane in the Application panel {: #reporting-api } -->
## [实验阶段] 应用程序面板里面新增 Reporting API 边栏 {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
要启用实验，请在**设置** > **实验**下勾选带有**在应用面板里面启用 Reporting API 边栏**字样的复选框选项。
{% endAside %}

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
[Reporting API](https://web.dev/reporting-api/) 旨在帮助您监控违规网页，过时的API调用以及更多。

<!-- With this experiment enabled, you can now view the reports status in the new **Reporting API** pane in the **Application** panel.  -->
启用此实验后，您现在可以在**应用程序**面板的新 **Reporting API** 边栏里面查看报告状态。

<!-- Please note that the **Endpoints** section is currently still under active development (showing no reporting endpoints for now).  -->
请注意，**Endpoints** 部分目前仍在积极开发中（目前没有 reporting endpoints）。

<!-- Learn more about the **Reporting API** with [this article](https://web.dev/reporting-api/). -->
欲了解更多有关于 **Reporting API** 的信息，请阅读[这篇文章](https://web.dev/reporting-api/)。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="应用程序面板里面新增 Reporting API 窗格", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Chromium 议题：[1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
