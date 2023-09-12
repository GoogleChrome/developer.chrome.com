---
layout: 'layouts/blog-post.njk'
title: "DevTools 新功能（Chrome 112）"
authors:
  - jecelynyeen
date: 2023-03-09
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hHB9YCtjLF8GTP3TROMz.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-112
---

*感谢 [Poong Zui Yong](https://www.linkedin.com/in/zui-yong-poong-1b507b14/) 提供的翻译*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/zh/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder } -->
## 记录器更新 {: #recorder }
<!-- ### Replay extensions support {: #replay-extensions } -->
### 重播扩展支持 {: #replay-extensions }
<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->
**记录器** 引入了对自定义重放选项的支持，您可以使用扩展将这些选项嵌入到 DevTools 中。
<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->
试用 [示例扩展](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay)。 选择新的自定义重播选项以打开自定义重播界面。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="自定义重播界面。", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->
您可以开发自家的扩展，根据您的需要自定义 **记录器** 并将其与您的工具集成：搜索 [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) 并查看更多 [扩展示例](https://github.com/puppeteer/replay/tree/main/examples/)。

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Chromium 议题: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->
### 使用 pierce 选择器记录 {: #pierce-selectors }
<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->
除了 [custom， CSS， ARIA， text 和 XPath 选择器](/docs/devtools/recorder/reference/#selector)，您现在还可以使用 [pierce 选择器](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce)。 这些选择器的行为类似于 CSS 选择器，但也可以穿透影子根。
<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->
在含有 [shadow DOM](https://web.dev/shadowdom-v1/) 的页面上开始一个新的记录。在 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="复选框.", width="22", height="22" %} **Selector types to record** 选择 **Pierce**，并开始记录您与子 DOM 中元素的交互并检查相应的步骤。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="将记录器设置为使用 pierce 选择器; Pierce 选择器使用中。", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Chromium 议题: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->
### 导出带有 Lighthouse 分析的 Puppeteer 脚本 {: #puppeteer-lighthouse }
<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->
**Recorder** 引入了一个新的导出选项：**Puppeteer (including Lighthouse analysis)**。 使用 [Puppeteer](/docs/puppeteer/)，您可以自动化和控制 Chrome。 使用 [Lighthouse](/docs/lighthouse/)，您可以捕捉并提高网站的性能。
<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->
打开你的录影, 点击 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **导出**, 选择新选项 ，并保存 `.js` 文件。
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="导出 Puppeteer (including Lighthouse analysis).", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->
[运行 Puppeteer 脚本](/docs/puppeteer/get-started/) 在 `flow.report.html` 文件中获取 Lighthouse 报告。
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="Lighthouse 报告在 Chrome 中打开。", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->
### 获取扩展 {: #get-extensions }
<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->
探索自定义您的记录器体验的选项，例如，使用自定义导出选项。 在录影里， 通过单击 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="导出。", width="20", height="20" %} **导出** > **Get extensions** 以获取 **Recorder** 的扩展。
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="在导出下拉菜单中的 Get extensions 选项。", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->
如果您有开发[记录器扩展]，欢迎添加(https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) 到我们的 [记录器扩展列表](/docs/devtools/recorder/extensions/). 我们期待在名单上看到您的扩展！
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Chromium 议题: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->
## 元素 > 样式更新 {: #elements-styles }
<!-- ### CSS documentation {: #css } -->
### CSS 文档 {: #css }
<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->
您一天查看多少次有关 CSS 属性的文档？ 当您将鼠标悬停在某个属性上时，**元素** > **样式** 边栏现在会向您显示简短描述。
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="带有 CSS 属性文档的工具提示。", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->
工具提示还有一个 **了解更多** 链接，可将您带到此属性的 [MDN CSS 参考](https://developer.mozilla.org/docs/Web/CSS/Reference)。
<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->
如果您很了解 CSS，您可能会觉得工具提示很麻烦。 要将它们全部关闭，请选择 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="复选框。", width="22", height="22" %} **Don't show**.

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->
要重新打开它们，请检查 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="设置。", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. 

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
DevTools 从 [VS Code 自定义数据](https://github.com/microsoft/vscode-custom-data) 中提取工具提示的描述。
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Chromium 议题: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->
### CSS 嵌套支持 {: #nesting }
<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->
**元素** > **样式** 边栏现在可以识别 [CSS 嵌套](/articles/css-nesting/) 语法并将嵌套样式应用于正确的元素。

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Chromium 议题: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->
## 在控制台中标记日志点和条件断点 {: #logpoint }
<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->
DevTools 进一步改进 [调试控制台中标记日志点和条件断点的用户体验](/blog/new-in-devtools-111/#breakpoint-redesign)。**控制台**现在标记由断点触发的消息：
<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
- `console.*` 在 [条件断点](/docs/devtools/javascript/breakpoints/#conditional-loc) 中调用带有橙色问号 `?`
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->
- [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc)  的消息带有两个粉红色点 `..`
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="控制台显示由断点触发的消息的更改：带有图标和正确的源链接。", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->
**控制台** 现在为您提供指向源文件中断点的正确锚链接，而不是 Chrome 创建的用于在 [V8](https://v8.dev/) 上运行任何 Javascript 的 `VM<number>` 脚本。

<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->
单击断点消息旁边的链接可直接跳转到断点编辑器。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="打开断点编辑器的日志点消息旁边的锚链接。", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Chromium 议题: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->
## 在调试过程中忽略不相关的脚本 {: #ignore-list }

<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->
为了帮助您专注于代码中最重要的部分，您现在可以直接从 **Sources** > **Page** 边栏的文件树中将不相关的脚本添加到 **Ignore List**。

<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->
右键单击任何脚本或文件夹，然后选择与忽略相关的选项之一。 您可能会看到用于在列表中添加或删除脚本或文件夹的选项。 [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) 添加到列表中并在调用堆栈中忽略它们。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="具有忽略相关选项的文件夹和脚本的上下文菜单。", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="忽略列出的脚本和文件夹显示为灰色，您可以使用更多选项下拉菜单中的实验性选项隐藏它们。", width="800", height="542" %}

<!-- If you select an ignored script, the **Configure** button takes you to  -->
如果您选择忽略的脚本，**配置** 按钮会将您带到
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="设置。", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/). 您还可以使用以下命令从文件树中隐藏被忽略的源 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="三点菜单。", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="实验性。", width="20", height="20" %}.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Chromium 议题: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->
## JavaScript 性能剖析器开始弃用 {: #js-profiler-deprecation }

<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->
早在 [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/) 中，DevTools 团队就计划最终弃用 **JavaScript 性能剖析器**，并让 Node.js 和 Deno 开发人员使用**性能**面板，用于分析 JavaScript CPU 性能。
<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->
此 DevTools 版本 (112) 开始 [四阶段 **JavaScript 性能剖析器** 弃用](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668)。 **JavaScript 性能剖析器** 面板现在显示相应的警告横幅。
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="性能剖析器顶部的弃用横幅。", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->
使用 [**Performance**](/docs/devtools/performance/reference/#main) 面板来代替 **性能剖析器**分析 CPU。

<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->
在相应的 [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) 和 [crbug.com/1354548](https://crbug.com/1354548) 中了解更多信息并提供反馈。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Chromium 议题: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->
## 模拟降低对比度 {: #reduced-contrast }

<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->
[**渲染**](/docs/devtools/rendering/#open-rendering) 选项卡为[模拟视觉缺陷](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies）列表—**对比度降低**。 使用此选项体验您网站是否对比敏感度较低的人友好呈现。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="在渲染 > 模拟视觉缺陷下拉菜单中的对比度降低选项。", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->
请注意，列表选项已更新以告诉您选项代表的颜色不敏感度。

<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->
使用 DevTools，您可以一次找到并修复所有对比度问题。 有关详细信息，请参阅 [如何提升您的网站更具可读性](/docs/devtools/accessibility/contrast/)。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Chromium 议题: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->
## Lighthouse 10 {: #lighthouse }
<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->
**Lighthouse** 面板现在运行 [Lighthouse 10.0.1](/blog/lighthouse-10-0/)。 有关详细信息，请参阅 [Lighthouse 10.0.1 的新功能](/blog/lighthouse-10-0/)。

<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->
**Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="设置.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="空复选框。", width="24", height="24" %} **旧版导航** 现在默认禁用。 此选项使用旧版 [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) 在导航模式下。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="禁用旧版导航。", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->
Lighthouse 10 现在使用 Moto G Power 作为[默认仿真设备](https://github.com/GoogleChrome/lighthouse/pull/14674)。 DevTools 将此设备添加到 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="设置。", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/)。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="设备列表中的 Moto G Power。", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Chromium 议题: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：

<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
- [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) 边栏现在在不明确的文件名旁边显示不同的文件路径 ([1403924](crbug.com/1403924 ))。
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
- **Performance** 面板的火焰图中的 [**Main** section](/docs/devtools/performance/reference/#main) 现在将 `CpuProfiler::StartProfiling` 指定为 `Profiler Overhead` ([ 1358602]（https://crbug.com/1358602））。
<!-- - DevTools improved autocompletion: -->
- DevTools 改进了自动完成：
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
  - **源代码**：任何单词的一致完成 ([1320204](https://crbug.com/1320204))。
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
  - **控制台**: `Arrow down` 选择第一个建议，而且建议含有 `Tab` 提示 ([1276960](https://crbug.com/1276960)).
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
- DevTools 添加了一个 [事件侦听器断点](/docs/devtools/javascript/breakpoints/#event-listeners) 让你在打开[Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter)时暂停 ([1315352](https://crbug.com/1315352)).
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
- DevTools 设置了一个解决方法，可以将 Vue2 webpack 工件正确显示为 JavaScript ([1416562](https://crbug.com/1416562))。
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->
- [**控制台**设置](/docs/devtools/settings/preferences/#console) 有一个更好的名字：默认展开 console.trace() 消息。 （[1139616]（https://crbug.com/1139616））。

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
