---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 99）"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "WebSocket 请求限速、Reporting API 新边栏、控制台美化以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/65bzqQ8Lnd4l3LzhueDO.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-99
---

*感谢 [流浪大法师 @liuliangsir](https://github.com/liuliangsir) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='zFVWeOKZBHs' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Throttling WebSocket requests {: #websocket } -->
## WebSocket 请求限速 {: #websocket }

<!-- The **Network** panel now supports throttling web socket requests. Previously, the network throttling didn't work on web socket requests. -->
**网络**面板现在已经支持对网络套接字（web socket）请求进行限速。在此之前，网络限速的功能对网络套接字（web socket）请求不起作用。

<!-- Open the **Network** panel, click on a web socket request and open the **Messages** tab to observe the message transfers. Select **Slow 3G** to throttle the speed.  -->
打开**网络**面板，点击一个网络套接字（web socket）请求，然后打开**消息**选项卡来查看消息的传输情况。 选择 **慢速 3G** 来限速。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="WebSocket 限速", width="800", height="540" %}

Chromium 议题: [423246](https://crbug.com/423246)


<!-- ## New Reporting API pane in the Application panel {: #reporting-api } -->
## 应用面板里面的 报告 API （Reportng API）新边栏 {: #reporting-api }

<!-- Use the new **Reporting API** pane to monitor the reports generated on your page and their status. -->
使用 **报告 API** 新边栏来查看有关自己页面情况的报告以及报告对应的状态。

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
该 [Reporting API](https://web.dev/reporting-api/) 是为了帮助您了解自己页面的安全违规情况，弃用 API 的调用情况以及更多。

<!-- Open a page which uses the Reporting API (e.g. [demo page](https://reporting-api-demo.glitch.me/)). In the **Application** panel, scroll down to the **Background services** section and select the **Reporting API** pane.  -->
打开一个使用 Reporting API 的页面（例如 [demo 页面](https://reporting-api-demo.glitch.me/)）。在**应用**面板里面，把滚动条滚动到**后台服务**区域，然后选择 **Reporting API** 边栏。

<!-- The **Reports** section shows you a list of reports generated on your page and their status. Click on it to view the report’s details. -->
**报告**区域为您展示有关自己页面情况的各种报告以及报告对应的状态。点击某个报告可以查看该报告的详情。

<!-- The **Endpoints** section gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header.  -->
**Endpoints** 区域为您展示那些所有被配置 `Reporting-Endpoints` 头部的 endpoints。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API 边栏", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/668bc7a4bc6bea854e8fc21f0e0ca3953ff5e95a #}

Chromium 议题: [1205856](https://crbug.com/1205856)


<!-- ## Support wait until element is visible/clickable in the Recorder panel {: #recorder } -->
## 支持 Recorder 面板一直处于等待状态，直到元素可见或可点击 {: #recorder }

<!-- When replaying a user flow recording, the **Recorder** panel will now wait until the element is visible or clickable in the viewport or try to automatically scroll the element into the viewport before replaying the step. Previously, the replay would fail immediately. -->
在重放用户流程记录的过程中，现在的 **Recorder** 面板将会一直处于等待状态，直到元素在视口范围内能够被看见或可以被点击；或者 **Recorder** 面板会尝试自动将元素滚动到视口范围，然后再执行重放该步的动作。在此之前，重放动作会立即失败。

<!-- Here is an example of an off-screen menu positioned outside of the viewport and slide in when activated. The user flow is to toggle the menu, and click on the menu item. Previously, the replay would fail at the last step, because the menu item is still sliding in and not visible in the viewport yet. It’s fixed now. -->
这里有一个例子：菜单被放置在视口范围之外，当这个菜单被激活时，会从视口外面滑动到视口里面。这个用户流程描述了从点击 toggle off-screen menu 按钮开始到点击菜单里面选项的全过程。在此之前，重放动作会在最后一步失败，这是因为此时的菜单项还处于滑入状态且在视口范围内不可见。现在这个问题已经被修复。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qf8f2x1u1y5FEMSmkB3A.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Chromium 议题: [1257499](https://crbug.com/1257499#c38)


<!-- ## Better console styling, formatting and filtering {: #console } -->
## 更好的控制台样式，格式化和过滤 {: #console }

<!-- ### Properly style log messages with ANSI escape code {: #console-styling }  -->
### 使用 ANSI 转义码来适当地修饰日志信息 {: #console-styling }

<!-- You can now use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) to properly style console messages. Previously, DevTools console had very limited (and partly broken) support for ANSI escape sequences. -->
您现在可以使用 [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) 来适当地修饰控制台信息。在此之前，DevTools 控制台对 ANSI escape sequences 的支持实属有限（且部分功能已经失效）。

<!-- It is common for [Node.js](https://nodejs.org/) developers to colorize log messages via ANSI escape sequences, often with the help of some styling libraries like [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur), etc.  -->
对 [Node.js](https://nodejs.org/) 开发者来说，使用 ANSI escape sequences 来美化日志信息的做法实属平常，通常是需要使用一些样式库，如 [chalk](https://www.npmjs.com/package/chalk)、[colors](https://www.npmjs.com/package/colors)、[ansi-colors](https://www.npmjs.com/package/ansi-colors)、[kleur](https://www.npmjs.com/package/kleur) 等。

<!-- With these changes, you can now debug your Node.js applications seamlessly using DevTools, with proper colorized console messages. Open this [demo](https://stackblitz.com/edit/node-colors-test) to view it yourself! -->
有了这些改动，您现在就可以无差别地使用 DevTools 来调试您的 Node.js 应用程序，并且能够适当地美化控制台信息。打开这个 [demo](https://stackblitz.com/edit/node-colors-test) 来亲眼目睹效果！

<!-- To learn more about formatting & styling console messages with DevTools, go to [format and style messages in the Console](/docs/devtools/console/format-style) documentation. -->
如果您想了解更多关于 DevTools 格式化以及美化控制台信息的内容，请查看 [格式化和修饰控制台信息](/docs/devtools/console/format-style) 文档。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6Lu7Js1rgSmjV0cnhDlH.png", alt="控制台美化", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f061ee77a872701a366a604903e639506574520a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22a372d445c3f8cff00c2cfe48cb7373165bcd9d #}

Chromium 议题: [1282837](https://crbug.com/1282837), [1282076](https://crbug.com/1282076)


<!-- ### Properly support `%s`, `%d`, `%i` and `%f` format specifiers {: #console-format } -->
### 适当地支持 `%s`, `%d`, `%i` 和 `%f` 格式指定符 {: #console-format }

<!-- The **Console** now properly performs the `%s`, `%d`, `%i`, and `%f` type conversions as specified in the [Console Standard](https://console.spec.whatwg.org/). Previously, the conversation result was inconsistent. -->
**控制台**现在能够正确完成对 `%s`、`%d`、`%i` 以及 `%f` 类型的转换，参考 [Console Standard](https://console.spec.whatwg.org/)。在此之前，会出现转换结果不一致的情况。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="控制台信息里面支持格式指定符", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ec299d49c6ab2c185df660766b1fb827db87f8a #}

Chromium 议题: [1277944](https://crbug.com/1277944), [1282076](https://crbug.com/1282076)


<!-- ### More intuitive console group filter {: #console-filter } -->
### 更加直观的控制台组过滤器 {: #console-filter }

<!-- When filtering the console message, a console message is now shown if its message content matches the filter or the title of the group (or the ancestor group) matches the filter. Previously, the console group title would show despite the filter. -->
在过滤控制台信息的过程中，现在只有在其内容和过滤器匹配或者控制台组（或其祖先组）标题和过滤器匹配的情况下，控制台信息才会被显示出来。在此之前，控制台组标题的显示会无视过滤器。

<!-- In addition, if a console message is shown, the group (or the ancestor group) it belongs to is now shown as well.  -->
此外，如果控制台信息被显示出来，那么其所属的控制台组（或其祖先组）也会被显示出来。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="控制台组过滤器", width="800", height="612" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/94734947c48283a56f93430f23b838cef10fd364 #}

Chromium 议题: [1068788](https://crbug.com/1068788)


<!-- ## Source maps improvements {: #sourcemap } -->
## 改进 Source maps {: #sourcemap }

<!-- ### Debug Chrome extension with source map files {: #extension } -->
### 使用 source map 文件来调试 Chrome 扩展 {: #extension }

<!-- You can now [debug Chrome extension](/docs/extensions/mv3/getstarted/#unpacked) with source map files. Previously, DevTools only supported inline sourcemap for Chrome extension debugging. -->
您现在可以使用 source map 文件来[调试 Chrome 扩展](/docs/extensions/mv3/getstarted/#unpacked)。在此之前，DevTools 只支持内联 sourcemap。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="使用 source map 文件来调试 Chrome 扩展", width="800", height="518" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1e73eb62955de7c4b0920575c7b374d47dab6a65 #}

Chromium 议题: [212374](https://crbug.com/212374)


<!-- ### Improved source folder tree in the Sources panel {: #source-tree } -->
### 优化 Sources 面板里面源文件夹树的显示问题 {: #source-tree }

<!-- The source folder tree in the **Sources** panel is now improved with less clutter in the folder structures and naming (e.g. “../”, “./”, etc). Under the hood, this is the result of normalizing the absolute source URLs in the sourcemaps. -->
现在，**Sources** 面板里面的源文件夹树变得更加简洁，并且命名更加易读（例如：“../”、“./”等）。这项功能的实现得益于规范化 source maps 里面的绝对源 URL。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="优化 Sources 面板里面源文件夹树的显示", width="800", height="444" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/68613ab02f6d556a2c5ac68ea08f466a534c6bd9 #}

Chromium 议题: [1284737](https://crbug.com/1284737)


<!-- ### Display worker source files in the Sources panel {: #worker-sourcemap } -->
### Sources 面板里面显示 Worker 源文件 {: #worker-sourcemap }

<!-- [Worker](https://web.dev/workers-overview/) (e.g. web worker, service worker) source files with relative SourceURL are now displayed in the **Source** panel. Previously, worker source files were not handled correctly. -->
现在，[Worker](https://web.dev/workers-overview/)（例如：web worker、service worker）源文件在使用相对 SourceURL 的情况下，会被显示在 **Source** 面板里面。在此之前，Worker 源文件不会被正确处理。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="Sources 面板里面显示 Worker 源文件", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6e877d5e1a3ccca22e866fb2a70330613aeb6964 #}


Chromium 议题: [1277002](https://crbug.com/1277002)


<!-- # Chrome’s Auto Dark Theme updates {: #auto-dark-mode } -->
## Chrome 自动深色模式的更新 {: #auto-dark-mode }

<!-- The [Auto Dark Theme emulation](/blog/new-in-devtools-96/#auto-dark-mode) UI is now simplified. It is a checkbox now, it was a dropdown previously. -->
现在，[自动深色模式模拟](/blog/new-in-devtools-96/#auto-dark-mode) UI 变得更加简洁。当下是个复选框，之前是个下拉框。


<!-- Apart from that, when the [Auto Dark Theme](/blog/auto-dark-theme/) is enabled, the **Emulate prefers-color-scheme** dropdown will be disabled and set to **prefers-color-scheme: dark** automatically. -->
除了上面说的这些，在开启[自动深色主题](/blog/auto-dark-theme/)功能之后，**Emulate prefers-color-scheme** 下拉框会被禁用掉，并且下拉框选项还会被自动设置为 **prefers-color-scheme: dark**。

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System. -->
Chrome 96 发布了[自动深色主题](/blog/auto-dark-theme/)的 [Origin Trial](/blog/origin-trials/) （目前只限于 Android 版）。有了该功能，当用户在操作系统那里选择深色主题时，浏览器将自动为浅色主题网站生成深色主题。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="自动深色模式模拟", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8443d2894b6401695ce94657e6afd5ad399eef28 #}

Chromium 议题: [1243309](https://crbug.com/1243309)


<!-- ## Touch-friendly color-picker and split pane {: #touch-friendly } -->
## 颜色选择器和分割面板支持触摸 {: #touch-friendly }

<!-- You can now select color, and resize the [Drawer](/docs/devtools/customize/#drawer) in DevTools with fingers or stylus on touchscreen devices. -->
您现在可以在 DevTools 那里用手指或者触控笔来选择颜色以及改变 [Drawer](/docs/devtools/customize/#drawer) 的大小。

<!-- Here is an example captured with the [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) device touchscreen. -->
这里有个用 [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) 触屏设备捕捉的例子。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aA3Oann2z26Yty9sgNB2.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f60936b29519e0cf387cd0a133d43885c6eb183d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22bb84d657aa69f6f7d5067605c2c133a5714172 #}

Chromium 议题: [1284245](https://crbug.com/1284245), [1284995](https://crbug.com/1284995)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
下面列出的是此次更新需要注意的 bug 修复：

<!-- - Fixed the [edit cookies](/docs/devtools/storage/cookies/#edit) issue in the **Cookies** pane. ([1290196](https://crbug.com/1290196)) -->
- 修复 **Cookies** 面板里面关于 [edit cookies](/docs/devtools/storage/cookies/#edit) 问题。([1290196](https://crbug.com/1290196))
<!-- - Use `Shift` + `Tab` to select the previous command in the [Command menu](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743)) -->
- 使用 `Shift` + `Tab` 可以选择[命令菜单](/docs/devtools/command-menu/)里面的前一个命令。([1278743](https://crbug.com/1278743))
<!-- - Report [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) issues in the [Issues](/docs/devtools/issues/) tab. ([1272445](https://crbug.com/1272445)). -->
- 在 [Issues](/docs/devtools/issues/) 选项卡里面，会报告 [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) 问题。([1272445](https://crbug.com/1272445))
<!-- - Report [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) issues in the [Issues](/docs/devtools/issues/) tab. ([1219359](https://crbug.com/1219359)). -->
- 在 [Issues](/docs/devtools/issues/) 选项卡里面，会报告 [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) 问题。([1219359](https://crbug.com/1219359))
<!-- - Fixed `Shift` + `Delete` and `Page up` / `Page down` behaviors in the **Sources** and **Console** panel. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662)) -->
- 在 **Sources** 和 **Console** 面板里面修复 `Shift` + `Delete` 和 `Page up` / `Page down` 的行为。([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662))
<!-- - Close the breakpoint edit dialog on breakpoint removal in the **Sources** panel. (922513)  -->
- 在 **Sources** 面板里面移除断点，会关闭断点编辑对话框。(922513)
<!-- - No reload required when [switching light/dark theme](/docs/devtools/customize/dark-theme/) in DevTools. ([1278738](https://crbug.com/1278738)) -->
- 在 DevTools 里面切换 [浅色/深色主题](/docs/devtools/customize/dark-theme/)，不需要重新加载 DevTools。([1278738](https://crbug.com/1278738))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
