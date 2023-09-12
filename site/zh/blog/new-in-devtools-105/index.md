---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 105）"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Supports step-by-step replay and mouse over events in the Recorder, LCP in the Performance insights panel and more.
"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EQpPulvFa6SZuARQFwEH.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

*感谢 [Poong Zui Yong](https://www.linkedin.com/in/zui-yong-poong-1b507b14/) 提供的翻译*。

{% Partial 'devtools/banner.md' %}
{% YouTube id='bHw_56RiVsg' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## 录制面板中的分步重放 {: #recorder }
<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
您现在可以**录制**面板中对用户流程进行分步重放和设置断点。
<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
点击步骤侧边的蓝点以设置断点，然后重放您的用户流程。该重放动作将在执行该步骤前暂停。 从这里，您可以选择继续重放、执行一个步骤或取消重放。
<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
借助此功能，您可以完全控制用户流程的重播，令调试更方便。
<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
参阅[录制面板功能参考](/docs/devtools/recorder/reference/)以获取更多相关信息，。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Step-by-step replay in the Recorder", width="800", height="547" %}

Chromium 议题: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## 支持录制面板中的鼠标悬浮事件 {: #recorder-hover }
<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
录制面板现在支持在录制中手动加入鼠标悬停步骤。
<!-- [This demo](https://jec.fish/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[此演示](https://jec.fish/demo/menu-hover) 显示悬停时的弹出菜单. 在录制用户流程时，单击菜单项。
<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
现在，如果您重播用户流程，它将会失败。因为 **录制面板** 在录制期间并没有自动捕获鼠标悬停事件。 要解决此问题，请 [手动添加步骤](/docs/devtools/recorder/reference/#add-and-remove-steps) ，在单击菜单项之前，将鼠标悬停在选择器上。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Support mouse over event in the Recorder", width="800", height="488" %}

Chromium 议题: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Performance insights 面板中的最大内容绘制 (LCP) {: #lcp }
<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
最大内容绘制 (LCP) 是测量[感知加载速度](https://web.dev/user-centric-performance-metrics/#types-of-metrics)的一个以用户为中心的重要指标。 您现在可以找出 [最大内容绘制 (LCP)](https://web.dev/lcp/) 的关键路径和根本原因。
<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
在 [性能录制](/docs/devtools/performance-insights/#record) 中，单击 **时间线** 中的 LCP 徽章。 在 **细节** 边栏中，您可以查看 LCP 分数，了解如何修复降低 LCP 速度的资源并查看 LCP 资源的关键路径。
<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
参阅 [Performance insights](/docs/devtools/performance-insights/) 文档以了解如何通过此面板获得可行性的建议并提高网站的性能。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP in the Performance insights panel", width="800", height="751" %}

Chromium 议题: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## 识别闪烁的文本（FOIT、FOUT）为布局偏移的潜在根本原因 {: #foit-fout }
<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
**Performance insights**面板现在可以检测 [flash of invisible text (FOIT) 和 flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) 作为布局偏移的根本原因。
<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
单击 **Layout shifts** 轨道中的屏幕截图，以便查看布局偏移的潜在根本原因。
<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
请参阅 [优化 WebFont 加载和渲染](https://web.dev/optimize-webfont-loading/) 以了解防止布局偏移的技术。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT in the Performance insights panel", width="800", height="497" %}

Chromium 议题: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Manifest 窗格中的协议处理程序 {: #manifest }
<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
您现在可以使用 DevTools 测试[渐进式网络应用 (PWA)](https://web.dev/learn/pwa/) 的 [URL 协议处理程序注册](https://web.dev/url-protocol-handler/)。
<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
URL 协议处理程序注册允许已安装的 PWA 处理使用特定协议的链接（例如 [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme)、`web+example`）以获得更集成的体验。
<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
通过 **Application** > **Manifest** 窗格导航到 **Protocol Handlers** 部分。 您可以在此处查看和测试所有可用的协议。
<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->
例如，安装 [this demo PWA](https://protocol-handler.glitch.me/)。 在 **Protocol Handlers** 部分，输入“americano”并单击 **Test protocol** 以打开 PWA 中的咖啡页面。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Protocol handlers in the Manifest pane", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Chromium 议题: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->
## 元素面板中的顶层徽章 {: #top-layer }
<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->
使用【顶层徽章】(/blog/top-layer-devtools/#top-layer-support-design-in-devtools) 了解顶层的概念，可视化顶层内容的变化。
<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->
[`<dialog>` 元素](https://web.dev/building-a-dialog-component/) 最近在浏览器中变得稳定。 当您打开一个对话框时，它会被放入一个 [top layer](/blog/top-layer-devtools/)。 顶层内容呈现在所有其他内容之上。
<!-- In this [demo](https://jec.fish/demo/dialog), click **Open dialog**.  -->
在此 [演示](https://jec.fish/demo/dialog) 中，单击 **Open dialog**。
<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->
为了帮助可视化顶层元素，DevTools 将顶层容器（`#top-layer`）添加到 DOM 树中。 它位于结束 `</html>` 标记之后。
<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
要从顶层容器元素跳转到顶层树元素，请单击顶层容器中元素旁边的 **reveal** 按钮或其背景。
<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->
在顶层树元素（例如对话框元素）旁边，单击 **top-layer** 徽章以跳转到顶层容器。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Top layer badge in the Elements panel", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Chromium 议题: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## 在运行时附加 Wasm 调试信息 {: #wasm }
<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching source maps to JavaScript and Wasm files. -->
您现在可以在运行时为 wasm 附加 DWARF 调试信息。 之前，**Sources** 面板仅支持将源映射附加到 JavaScript 和 Wasm 文件。
<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->
在 **Sources** 面板中打开一个 Wasm 文件。 在编辑器中右键单击并选择 **Add DWARF debugging info…** 以按需附加调试信息。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="ALT_TEXT_HERE", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Chromium 议题: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->
## 调试时支持实时编辑 {: #live-edit }
<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
您现在可以编辑堆栈上最顶层的函数，而无需重新启动调试器。
<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->
在 Chrome 104 中，DevTools 恢复了 [restart frame](/blog/new-in-devtools-104/) 功能。 但是，您无法编辑当前暂停的函数。开发人员通常会中断一个函数，然后在暂停时编辑该函数。
<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->
通过此更新，调试器会自动重新启动该功能，但具有以下限制：
<!-- - Only the top-most function can be edited while paused -->
<!-- - No recursive call on the same function further down the stack -->
暂停时只能编辑最顶层的函数
在堆栈的更下方对同一函数没有递归调用
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="live edit during debugging", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Chromium 议题: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## 在样式窗格的规则中查看和编辑@scope {: #scope }
<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->
您现在可以在 **Styles** 窗格中查看和编辑 [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule)。
<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
规则中的 `@scope` 是 [CSS Cascading and Inheritance Level 6 规范](https://drafts.csswg.org/css-cascade-6/) 的一部分。 这些规则允许开发人员在 CSS 中定义样式规则。
<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
打开 [此演示页面](https://codepen.io/miriamsuzanne/details/ZErXZVY) 并检查 `<div class=”dark-theme”>` 元素中的超链接。 在 **Styles** 窗格中，查看 `@scope` 规则。 单击规则声明进行编辑。
{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
CSS `@scope` 目前正在开发中。 要测试此功能，请通过 `chrome://flags/#enable-experimental-web-platform-features` 启用 **Experimental Web Platform features** 标志。
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="@scope at rules in the Styles pane", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Chromium 议题: [1337777](https://crbug.com/1337777)


<!-- ## Source map improvements {: #sourcemaps } -->
## Source map 改进 {: #sourcemaps }
<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
以下是对 source maps 的一些修复，以改善整体调试体验：
<!-- - DevTools now properly resolves source map identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
DevTools 现在可以正确解析带有标点符号的 source maps 标识符。 一些现代缩小器（例如，[esbuild](https://esbuild.github.io/)） 生成 sourcemaps 时将标识符与后续标点符号（逗号、括号、分号）合并。
<!-- - DevTools now resolves source map names for constructors with a `super` call. -->
DevTools 现在使用 `super` 调用解析构造函数的 source map 名称。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="ALT_TEXT_HERE", width="800", height="441" %}
<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->
修复了重复的规范 URL 的 source map URL 索引。 以前，由于重复的规范 URL ,在某些文件中没有激活断点。

Chromium 议题: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
 ## 其他的更新 {: #misc }
<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：
<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
- 从 **Application** > **Local Storage** 窗格中的表正确删除本地存储键值对。 ([1339280](https://crbug.com/1339280))
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
- 在源代码面板中查看 CSS 文件时，正确显示颜色预览。 此前，它们的位置错位了。 ([1340062](https://crbug.com/1340062))
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
- 在 **Layout** 边栏中始终显示 CSS flex 和 grid 元素，并在 **元素** 面板中将它们显示为徽章。 以前，flex 和 grid 元素会在这两个地方都随机丢失。 ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->
- [广告框架] (https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker)里新增 **Creator Ad Script** 链接。 当 DevTools 搜索到了导致框架被标记为广告的脚本时，您可以通过 **Application** > **Frames** 打开框架。 ([1217041](https://crbug.com/1217041))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
