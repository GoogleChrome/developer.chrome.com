---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 102）"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "新的 Performance insights 面板、模拟深色/浅色主题的快捷方式以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4M3s5976WolNBQZePk9y.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

*感谢 [韩昌浩](https://github.com/hanselfmu) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->
## 预览功能：新的 Performance insights 面板 {: #perf }

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->
利用 **Performance insights** 面板来获取关于您网站性能的可行性深度分析。面板将按照您的用例提供可行性的建议和回馈。

<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->
[打开此面板](/docs/devtools/performance-insights/#open)并根据您的用例来开始一段新的录制。举个例子，让我们来测量这个[示例网页](https://coffee-cart.netlify.app/?ad=1)的页面加载情况。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="新的 Performance insights 面板", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->
录制完成后，您会在 **Insights** 窗格中获得相关的性能深度分析。 单击每个深度分析项目（例如，阻止渲染的请求、布局偏移）以了解问题和潜在的修复。

<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->
前往 **Performance insights** 面板的[文档](/docs/devtools/performance-insights/)并通过教程来逐步了解更多内容。

<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->
这是一项预览功能，可帮助 Web 开发人员（尤其是非性能专家）识别和修复潜在的性能问题。 我们的团队正在积极开发此功能，并期待获得您的[反馈](https://crbug.com/1270700) 以进一步改进。

Chromium 议题: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->
## 新的模拟浅色和深色主题的快捷方式 {: #emulation }

<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->
您现在可以在**样式**边栏中利用新的快捷方式来更快速地模拟浅色和深色主题（CSS 媒体功能 [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)）。

<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->
在此之前，在**渲染**标签页中[模拟主题](/docs/devtools/rendering/emulate-css/)需要更多步骤。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="新的模拟浅色和深色主题的快捷方式", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Chromium 议题: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->
## 提升网络预览标签页的安全性 {: #network-preview }

<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->
**网络**面板中的**预览**标签页现在应用了内容安全政策（CSP）。

<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->
例如，第一个屏幕截图显示了一个包含[混合内容](https://web.dev/what-is-mixed-content/)的页面。该页面通过安全的 HTTPS 连接加载，但样式表通过不安全的 HTTP 连接加载。

<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->
浏览器默认阻止样式表请求。但是，当您通过**网络**面板中的**预览**标签页打开页面时，样式表此前并没有被阻止（因此背景变成了红色）。现在像您期望的那样，该样式表被阻止了（第二个屏幕截图）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="提升网络预览标签页的安全性", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Chromium 议题: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->
## 提升在断点处的重新加载 {: #debugger }

<!-- The debugger now terminates script execution when reloading at breakpoint. -->
调试程序现在会在断点处重新加载时停止脚本执行。

<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->
例如，之前在这个 [React 示例](https://react-stuck.glitch.me/) 中的 `ReactDOM` 断点处重新加载时，脚本进入了无限循环。**来源**面板由于无限循环而崩溃。

<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->
继续执行 JavaScript 会给开发人员带来很多麻烦，并且可能会使渲染程序处于损坏状态。这项更改使调试行为与 Firefox 等其他浏览器保持一致。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="提升在断点处的重新加载", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Chromium 议题: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->
## 控制台更新 {: #console }

<!-- ### Handle script execution errors in the Console {: #errors } -->
### 在控制台中处理脚本执行错误 {: #errors }

<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->
控制台中脚本评估期间的错误现在会生成正确的错误事件，这些事件会触发 `window.onerror` 处理程序，并在窗口对象上作为 `"error"` 事件进行调度。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="在控制台中处理脚本执行错误", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Chromium 议题: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->
### 通过回车键提交实时表达式 {: #live-expression }

<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->
一旦您完成了一个[实时表达式](/blog/new-in-devtools-70/#watch) 的输入，您即可通过回车键来提交它。在此之前，按回车键会导致添加新行。这行为与 DevTools 的其他部分不一致。

<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->
使用 `Shift` + `回车键` 来添加新行。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="通过回车键提交实时表达式", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Chromium 议题: [1260744](https://crbug.com/1260744)


<!-- ## Cancel user flow recording at the start {: #recorder } -->
## 在用户流程录制开始时取消 {: #recorder }

<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->
您可以在用户流程录制开始时取消录制。此前没有办法取消录制。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="在用户流程录制开始时取消", width="800", height="488" %}

Chromium 议题: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->
## 在样式边栏中展示继承的高亮伪元素 {: #pseudo }

<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->
现在，在**样式**边栏中可以看到继承的高亮伪元素（例如 `::selection`、`::spelling-error`、`::grammar-error`、以及 `::highlight`）。

<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->
正如[规范](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade)中提到的，当多个样式冲突时，CSS 层叠决定了优先的样式。此新功能可帮助您了解层叠规则的继承和优先级。

{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->
目前，您需要使用 `--enable-blink-features=HighlightInheritance` 的命令行选项运行 Chrome 以启用此功能。
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="在样式边栏中展示继承的高亮伪元素", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Chromium 议题: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其它的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：

<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->

- **属性**边栏现在默认显示带有值的访问器属性。在此之前，这些值被错误地隐藏了。（[1309087](https://crbug.com/1309087)）
- **样式**边栏现在正确地用删除线显示被覆盖的 `@supports` 规则。在此之前，被覆盖的这些规则没有删除线。（[1298025](https://crbug.com/1298025)）
- 修复了**来源**面板中的 CSS 格式化逻辑，该逻辑在编辑 CSS 时会导致多个空行。（[1309588](https://crbug.com/1309588)）
- 将**控制台**中对象的**以递归方式展开**选项限制为最大100层，这样它就不会在展开循环引用的对象时陷入无限循环。（[1272450](https://crbug.com/1272450)）

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->
## [实验阶段] 复制 CSS 更改 {: #copy }

{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->
请在**设置** > **实验**中勾选 **Sync CSS changes in the Styles pane** 来开启此实验功能。
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->
在此实验中，**样式**边栏用绿色突出显示您的 CSS 更改。您可以将鼠标悬停在更改的规则上，然后单击它旁边新的复制按钮进行复制。

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->
除此之外，您可以通过右键单击任何 CSS 规则并选择**复制所有 CSS 更改**来跨 CSS 声明复制所有 CSS 更改。

<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->
[变更](/docs/devtools/changes/)标签页中还添加了一个新的**复制**按钮，以帮助您轻松跟踪和复制 CSS 更改！

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="复制 CSS 更改", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# ​​https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #} 

Chromium 议题: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->
## [实验阶段] 在浏览器外选择颜色 {: #color-picker }

{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
请在**设置** > **实验**中勾选 **Enable color picking outside the browser window** 来开启此实验功能。
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->
启用此实验以使用颜色选择器在浏览器之外选择颜色。在此之前，您只能在浏览器内选择颜色。

<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->
在**样式**边栏中，单击任何颜色预览以打开颜色选择器。使用吸管从任何地方选择颜色。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="在浏览器外选择颜色", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Chromium 议题: [1245191](https://crbug.com/1245191)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
