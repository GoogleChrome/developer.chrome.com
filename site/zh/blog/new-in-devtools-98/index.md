---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 98）"
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description:
  "整页无障碍功能树、在变更标签页中显示更精确的更改以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EO410dU8yyNvSzzoanMP.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

*感谢 [阮贝琪 @jecelynyeen](https://github.com/jecelynyeen) 和 [韩昌浩 @hanselfmu](https://github.com/hanselfmu) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->
## 预览功能：整页无障碍功能树 {: #a11y-tree }

<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->
新的**整页无障碍功能树**让您更轻松地概览您整个网页的[无障碍功能树](/blog/full-accessibility-tree/#what-is-the-accessibility-tree)结构，并帮助您了解您网页内容在辅助技术（例如：屏幕阅读器）下的展示。

<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->
在**元素**面板中，打开**无障碍功能**边栏并选中**启用整页模式的无障碍功能树**复选框。然后，重新加载 DevTools，您将在**元素**面板中看到一个新的无障碍功能树按钮。

<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->
单击该按钮以切换到**无障碍功能树**视图。您可以展开元素节点或单击元素，从而在**无障碍功能**边栏中查看详细信息。

<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->
此前，**无障碍功能**边栏中的无障碍功能树只能提供局部的视图，它只能让您探索单个元素节点及其祖先元素。

<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->
我们的团队仍在积极开发这项预览功能。期待您的[反馈](https://goo.gle/devtools-a11y-tree-feedback)以帮助我们进一步改进！

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="整页无障碍功能树", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Chromium 议题：[887173](https://crbug.com/887173)


<!-- ## More precise changes in the Changes tab {: #changes }  -->
## 在变更标签页中显示更精确的更改 {: #changes }


<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->
现在，**变更**标签页中的代码变更会被自动美观输出（pretty-print）。

<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->
此前，开发者们很难在**变更**标签页中跟踪压缩（minified）代码的实际变化，因为所有代码都挤在一行。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="变更标签页", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Chromium 议题：[1238818](https://crbug.com/1238818)，[1268754](https://crbug.com/1268754)，[1086491](https://crbug.com/1086491)


<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->
## 为用户操作流的录制设置更长的超时时间 {: #recorder-timeout }

<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->
您现在可以在[录制器](/docs/devtools/recorder/)中为所有步骤或特定步骤调整**超时**设置。这对于网络请求缓慢且动画冗长的页面尤其有用。

<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->
例如，我在这个[演示页](https://jec.fish/demo/pup-slow-result)上[录制](/docs/devtools/recorder/#record)用户加载并点击菜单项的操作。但是，菜单项的加载速度很慢（需要6秒）。这次用户操作的[重放](/docs/devtools/recorder/#replay)会因此失败，因为它超过了默认的5秒超时。

<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->
我们可以使用新的**超时**设置来解决这个问题。展开我们点击菜单项的步骤。[编辑步骤](/docs/devtools/recorder/#edit-steps)以**添加超时**，并将其设置为**6000**毫秒（等于6秒）。

<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->
另外，您可以在**重放设置**中为所有步骤调整**超时**。展开**重放设置**并编辑**超时**数值。
 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="用户操作录制的超时设置", width="800", height="530" %}

Chromium 议题：[1257499](https://crbug.com/1257499)


<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->
## 使用“往返缓存”选项卡确保您的页面可缓存 {: #bfcache }

<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->
[往返缓存（或 bfcache）](https://web.dev/bfcache/) 是一种浏览器优化，可提供即时的后退和前进导航。

<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->
新的**往返缓存**标签页可以帮助您测试您的页面，以确保它们针对 bfcache 进行了优化，并指出任何可能阻止它们符合 bfcache 条件的问题。

<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->
要测试某一页面，请在 Chrome 中导航到该页面，然后在 DevTools 中进入**应用** > **往返缓存**。接下来，单击**测试往返缓存**按钮，DevTools 将尝试导航离开当前页面并返回，以确定该页面是否可以从 bfcache 中恢复。

<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->
作为 Web 开发人员，了解如何在所有浏览器中针对 bfcache 进行页面优化至关重要，因为它将显著改善用户的浏览体验——尤其是那些网络或设备较慢的用户。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="往返缓存标签页", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Chromium 议题：[1110752](https://crbug.com/1110752)


<!-- ## New Properties pane filter {: #properties } -->
## 新的属性边栏过滤器 {: #properties }

<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->
如果您想持续关注**属性**边栏中的某一个特定属性，您现在可以在新的**过滤**文本框中输入该属性的名字或值。

<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** checkbox to view all properties.  -->
默认情况下，属性值为 `null` 或 `undefined` 的属性是被隐藏的。启用**全部显示**复选框可以查看所有的属性。

<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->
这些改进使您可以更快地看到您关注的属性，从而提高您的效率！

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="属性边栏过滤", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}  
  
Chromium 议题：[1269674](https://crbug.com/1269674)


<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->
## 模拟 CSS forced-colors 媒体功能 {: #forced-colors }

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->
[forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS 媒体功能用于检测用户代理是否启用了强制颜色（forced-colors）模式（例如 Windows 高对比度模式），这种模式会基于用户选择的颜色来展示页面。

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->
打开[命令菜单](/docs/devtools/command-menu/)，运行**显示“渲染”工具**命令，然后设置**模拟 CSS 媒体功能 force-colors** 下拉菜单。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="CSS forced-colors 媒体功能", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Chromium 议题：[1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->
## 在鼠标指针悬停时显示标尺 {: #show-rulers }

<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->
您现在可以打开[命令菜单](/docs/devtools/command-menu/)并运行**在鼠标指针悬停时显示标尺**的命令。页面标尺可以让您更轻松地测量一个元素的宽度和高度。

<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->
以前，您只能通过**设置** > **显示标尺**复选框启用页面标尺。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="在鼠标指针悬停时显示标尺", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a932e35aa5521826c8beea #}

Chromium 议题：[1270562](https://crbug.com/1270562)


<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->
## 在 Flexbox 编辑器中支持 `row-reverse` 和 `column-reverse` {: #flexbox-editor }

<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->
[Flexbox 编辑器](/blog/new-in-devtools-90/#flexbox)添加了两个新按钮以支持 `flex-direction` 中的 `row-reverse` 和 `column-reverse`。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Flexbox 编辑器", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Chromium 议题：[1263866](https://crbug.com/1263866)


<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->
## 新增“重放 XHR “和“扩展所有搜索结果”的键盘快捷键 {: #shortcuts }

<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->
### 在网络面板中“重放 XHR ”的键盘快捷键 {: #replay-xhr }

<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->
在**网络**面板中选择一个 XHR 请求，然后按键盘上的 **R** 以重放 XHR。之前，您只能通过上下文菜单重放 XHR（右键单击 > **重放 XHR**）

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="重放 XHR", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Chromium 议题： [1050021](https://crbug.com/1050021)

 
<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->
### 用于展开所有搜索结果的键盘快捷键 {: #toggle-search-result }

<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->
**搜索**选项卡中添加了一个新的键盘快捷键，允许您展开和折叠所有搜索结果。之前，您只能通过一次单击一个文件来展开和折叠搜索结果。

<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->
通过 **Esc** > **3点妆** 菜单 > **搜索**打开搜索选项卡。输入搜索字符串（例如函数）并按 **Enter** 以查看搜索结果列表。关注搜索结果并使用以下快捷方式展开/折叠搜索文件：

- **Windows / Linux** - `Ctrl` + `Shift` + `{` or `}`
- **MacOS** - `Cmd` + `Options` + `{` or `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->
前往 [keyboard shortcuts](/docs/devtools/shortcuts/) 文档以参考 Chrome DevTools 中的键盘快捷键。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cbd6c9453ca55edb0f155068830b1ad69c5136e #}

Chromium 议题： [1255073](https://crbug.com/1255073)


## Lighthouse 面板中的 Lighthouse 9 {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->
**Lighthouse** 面板现在已运行 Lighthouse 9。Lighthouse 现在将列出所有共享相同 id 的元素。

<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->
重叠元素 id 是一个常见的无障碍（accessibility）问题。例如，`aria-labelledby` 属性中的 id 用于[多个元素](https://web.dev/duplicate-id-aria/)。

<!-- Check out the [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->
更多的 Lighthouse 更新细节，请参考 [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/)。

​{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="Lighthouse 的“所有可聚焦元素必须具有没重叠的 `id`”的审核 。画面显示两个元素，都具有相同的 `id`", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Chromium 议题： [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## 源代码面板的改善 {: #sources }

<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->
DevTools 升级使用 [CodeMirror 6](https://codemirror.net/6/)。此升级为**源代码**面板带来了大量的稳定性改进。以下是其中一些显着的改进：

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->
- 打开大文件（例如 WASM、JavaScript）时速度显着加快
- 单步执行代码时不再随机滚动
- 改进了源码的自动完成建议（例如代码段、local override）

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Chromium 议题： [1241848](https://crbug.com/1241848) 

<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
这些是此版本中一些值得注意的修复：

<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It’s now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972)) 
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->
- 修复网络请求的瀑布图。([1275501](https://crbug.com/1275501))
- 修复在**源代码**面板中搜索具有很长行的文档时，无法高亮代码的问题。([1275496](https://crbug.com/1275496))
- 网络请求中不再显示重复的 **Payload** 选项卡。 ([1273972](https://crbug.com/1273972))
- 修复了**性能**面板的**摘要**部分中缺少的布局转换详细信息。 ([1259606](https://crbug.com/1259606))
- 在**网络搜寻**查询中支持任意字符（例如 `,`, `.`）。 ([1267196](https://crbug.com/1267196))


<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->
## [Experimental] 在 Reporting API 窗格中显示端点 {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
要启用实验，请在**设置** > **实验**下勾选带有**在应用面板里面启用 Reporting API 边栏**字样的复选框选项。
{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->
我们在 [Chrome 96](/blog/new-in-devtools-96/#reporting-api) 引入了实验阶段的 **Reporting API** 窗格，以帮助您监控网页的 Reporting API 报告以及状态。

<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->
这次我们加入了**端点**部分。它为您提供了在 `Reporting-Endpoints` 标头中配置的所有端点的概述。

<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->
浏览 [Reporting API](https://web.dev/reporting-api/) 文档，以学习如何使用 Reporting API 来监控违规网页，过时的API调用以及更多。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt=" Reporting API 窗格", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #} 

Chromium 议题： [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
