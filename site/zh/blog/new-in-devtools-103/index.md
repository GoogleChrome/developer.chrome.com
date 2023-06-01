---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 103）"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "记录双击和右击事件、Lighthouse 新增用户流程测量选项以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ESPIFFk00y1EsFkGum7Q.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

*感谢 [流浪大法师 @liuliangsir](https://github.com/liuliangsir) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Capture double-click and right-click events in the Recorder panel {: #recorder } -->
## Recorder 面板捕获双击和右击事件 {: #recorder }

<!-- The **Recorder** panel can now capture double-click and right-click events. -->
**Recorder** 面板现在能够捕获双击和右击事件。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Recorder 面板捕获双击和右击事件", width="800", height="572" %}

<!-- In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:  -->
在这个[例子](https://jec.fish/demo/dbl-right-click)里面，可以开始 [recording](/docs/devtools/recorder/#record) 并尝试执行以下步骤：

<!-- - Double-click the card to enlarge it
- Right-click the card and select an action from the context menu -->
- 双击卡片来放大该卡片
- 右击卡片并从右键菜单中选择一个 action

<!-- To understand how **Recorder** captured these events, expand the steps: -->
为了了解 **Recorder** 是如何捕获这些事件，展开讲讲这些步骤：

<!-- - **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`. -->
- **双击** 事件会被捕获为 `type: doubleClick`。
- **右击** 事件会被捕获为 `type: click` 但事件的 `button` 属性会被设置为 `secondary`。通常，鼠标点击事件的 `button` 值是 `primary`。

Chromium 议题：[1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


<!-- ## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 面板支持 timespan 和 snapshot 新模式 {: #lighthouse }

<!-- You can now use **Lighthouse** to measure your website’s performance beyond page load. -->
您现在可以使用 **Lighthouse** 来测量您网站的性能，而不仅仅是测量页面加载时的性能。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Lighthouse 面板支持 timespan 和 snapshot 新模式", width="800", height="507" %}

<!-- The **Lighthouse** panel now supports 3 modes of user flow measurement:  -->
**Lighthouse** 面板现在支持 3 种用户流程测量模式：

<!-- - [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports. -->
- [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) 报告可以分析单个页面加载时的性能。Navigation 是最常见的报告类型。在当前版本之前，所有的 Lighthouse 报告都是使用 navigation 模式。

<!-- - [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions. -->
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) 报告可以分析任意时间段的性能，通常包含用户交互。

<!-- - [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it. -->
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) 报告可以分析特定状态下的页面，通常发生在用户与页面交互之后。

<!-- For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions. -->
比如，让我们用这个 [demo 页面](https://coffee-cart.netlify.app/) 来测量把商品添加到购物车的性能。选择 **Timespan** 模式并点击 **开始 timespan**。滚动并添加几个商品到购物车。一旦完成，点击 **结束 timespan** 来生成 Lighthouse 报告。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Timespan 模式", width="800", height="549" %}

<!-- See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.  -->
查阅 [Lighthouse 用户流程文档](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md）以便于了解每种模式的独特用例，优点和限制。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Chromium 议题：[1291284](https://crbug.com/1291284)


<!-- ## Performance Insights updates {: #performance } -->
## Performance Insights 更新 {: #performance }

<!-- ### Improved zoom control in the Performance Insights panel {: #zoom } -->
### 改进 Performance Insights 面板的缩放控制问题 {: #zoom }

<!-- DevTools will now zoom in based on your mouse cursor rather than the playhead position. With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.  -->
DevTools 现在会根据鼠标的位置来缩放，而不是播放指针的位置。有了最新的鼠标缩放功能，您不但可以随意移动鼠标，而且还可以通过 [zoom in](/docs/devtools/performance-insights/#navigate) 的方式瞬间抵达指定区域。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
查阅 [Performance Insights 文档](/docs/devtools/performance-insights/) 以便于了解如何获取可行的 insights，以及如何使用面板来改善网站的性能。


Chromium 议题：[1313382](https://crbug.com/1313382)


<!-- ### Confirm to delete a performance recording {: #delete } -->
### 对删除性能记录的操作进行确认 {: #delete }

<!-- DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete). -->
DevTools 现在会在[删除性能记录](/docs/devtools/performance-insights/#delete)之前显示一个确认对话框。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="对删除性能记录的操作进行确认", width="800", height="549" %}

Chromium 议题：[1318087](https://crbug.com/1318087)


<!-- ## Reorder panes in the Elements panel {: #reorder-pane } -->
## 重新排列 Elements 面板中的窗格 {: #reorder-pane }

<!-- You can now reorder panes in the **Elements** panel based on your preference. -->
您现在可以根据您的喜好来重新排列 Elements 面板中的窗格。

<!-- For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access. -->
例如，当您在窄屏上打开 DevTools，[Accessibility](/docs/devtools/accessibility/reference/#pane) 窗格会被隐藏在 **Show more** 按钮下。如果您需要经常调试 Accessibility 问题，那么您现在可以将 Accessibility 窗格拖到前面，以便于更容易访问。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="重新排列 Elements 面板中的窗格", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Chromium 议题：[1146146](https://crbug.com/1146146)


<!-- ## Picking a color outside of the browser {: #color } -->
## 支持在浏览器外面选择颜色 {: #color }

<!-- DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser. -->
DevTools 现在支持在浏览器外面选择颜色。在此之前，您只能在浏览器里面选择颜色。

<!-- In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere. -->
在 **Styles** 窗格中，点击任意预览颜色来打开颜色选择器。使用滴管工具来实现从任意地方选择颜色。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="支持在浏览器外面选择颜色", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Chromium 议题：[1245191](https://crbug.com/1245191)


<!-- ## Improved inline value preview during debugging {: #inline-preview } -->
## 改进调试期间的 inline 值预览问题 {: #inline-preview }

<!-- The debugger now shows the inline values preview correctly. -->
调试器现在可以显示正确的 inline 值预览。

<!-- In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview. -->
在这个例子中，`double` 函数有一个输入参数 `a` 和一个变量 `x`。在 `return` 行放置一个断点并运行代码。inline 预览显示 `a` 和 `x` 的值正确。在此之前，调试器不会显示 `x` 的值。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="改进调试期间的 inline 值预览问题", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Chromium 议题：[1316340](https://crbug.com/1316340)


<!-- ## Support large blobs for virtual authenticators {: #webauthn } -->
## virtual authenticators 支持大型 blob {: #webauthn }

<!-- The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators. -->
现在，[WebAuthn](/docs/devtools/webauthn/) 选项卡拥有新的 **Supports large blob** 复选框，用于 virtual authenticators。

<!-- This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys. -->
该复选框默认是处于禁用状态。您现在只可以为那些已支持 resident keys 以及 `ctap2` 协议的 authenticators 启用该复选框。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt="virtual authenticators 支持大型 blob", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Chromium 议题：[1321803](https://crbug.com/1321803)


<!-- ## New keyboard shortcuts in the Sources panel {: #shortcuts } -->
## Sources 面板支持新的键盘快捷键 {: #shortcuts }

<!-- Two new keyboard shortcuts are now available in the  **Sources** panel: -->
在 **Sources** 面板中，可以使用两个新的键盘快捷键：

<!-- - Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> -->
- 切换 **navigation** 工具栏 (左侧) 使用 <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- 切换 **debugger** 工具栏 (右侧) 使用 <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="Sources 面板支持新的键盘快捷键", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium 议题：[1226363](https://crbug.com/1226363)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Source maps 改进 {: #sourcemaps }

<!-- Previously, developers experience random failure during: -->
在此之前，开发者会随机遇到以下问题：

<!-- - Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled -->
- 在调试 [Codepen](https://codepen.io/) 示例的过程中，会遇到一些问题
- 在定位 [Codepen](https://codepen.io/) 示例所出现性能问题的过程中，会遇到一些问题
- 在启用 [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 的前提下，出现丢失 **Component** 选项卡的情况

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
这里有几个对 source maps 的改进，旨在提高整体调试体验：

<!-- - Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL   -->
- 针对行内脚本（inline scripts）和源码位置（source location），修正位置跟偏移之间的映射关系
- 针对 frame 的文本位置，使用 fallback 信息
- 使用 frame 的 URL 来正确解析相对路径

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Chromium 议题：[1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
