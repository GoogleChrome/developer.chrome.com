---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 101）"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "导入以及导出用户流程为 JSON 文件、支持 hwb() colors 函数、样式边栏查看级联层以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/e9bxQMW3fZ7eWHLceqqz.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

*感谢 [流浪大法师 @liuliangsir](https://github.com/liuliangsir) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

<!-- ## Import and export recorded user flows as a JSON file  {: #recorder } -->
## 导入以及导出用户流程为 JSON 文件 {: #recorder }

<!-- The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting. -->
[Recorder](/docs/devtools/recorder) 面板现在支持导入 JSON 文件形式的用户流程记录以及支持导出用户流程记录为 JSON 文件。这个补充功能的出现，使得分享用户流程的操作变得更加容易，而且还能够有助于 bug 的报告。

<!-- For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay). -->
例如，下载这个 [JSON 文件](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json)。您可以使用导入按钮来导入该 JSON 文件，然后[重放该用户流程](/docs/devtools/recorder/#replay)。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

<!-- Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options: -->
除了上面所说的导入用户流程记录，您还可以导出这些记录。在[录制完用户流程](/docs/devtools/recorder/#record)之后，点击导出按钮。会弹出 3 个导出选项：

<!-- - **Export as a JSON file**. Download the recording as a JSON file. -->
- **导出为 JSON 文件**。下载的记录为一个 JSON 文件。
<!-- - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.  -->
- **导出为 @puppeteer/replay 脚本**。下载的记录为一段 [Puppeteer Replay](https://github.com/puppeteer/replay）脚本。
<!-- - **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script. -->
- **导出为 Puppeteer 脚本**。下载的记录为一段 [Puppeteer](https://pptr.dev/) 脚本。

<!-- Consult [the documentation](/docs/devtools/recorder) to learn more about the differences between these options. -->
请参考[文档](/docs/devtools/recorder/#export-flows)以便于了解更多关于这些选项之间的区别。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Recorder 面板中的导出选项", width="800", height="556" %}

Chromium 议题: [1257499](https://crbug.com/1257499)


<!-- ## View cascade layers in the Styles pane {: #layer } -->
## 样式边栏查看级联层 {: #layer }

<!-- [Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications. -->
[级联层（Cascade layers）](/blog/cascade-layers/)允许您显式控制自己的 CSS 文件，从而达到避免样式冲突的目的。这对于大型代码库、设计系统、以及需要在应用中管理第三方样式的情况来说非常有用。

<!-- In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles. -->
在这个[示例](https://jec.fish/demo/cascade-layer)里面，定义了 3 个级联层（Cascade layers）：`page`、`component` 和 `base`。在**样式**边栏那里，您可以查看每个层以及层里面所包含的样式。

<!-- Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green.  -->
点击层名称可以查看层顺序。由于 `page` 层的权重最高，因此 `box` 背景是绿色的。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="样式边栏查看级联层", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Chromium 议题: [1240596](https://crbug.com/1240596)


<!-- ## Support for the hwb() color function {: #hwb } -->
## 支持 hwb() 颜色函数 {: #hwb }

<!-- You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools. -->
您现在可以在 DevTools 那里查看以及编辑 [HWB 颜色格式](https://drafts.csswg.org/css-color/#the-hwb-notation)。

<!-- In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added. -->
在**样式**边栏那里，按住 **Shift** 键，然后点击任意颜色并留意颜色格式的变化。会发现 HWB 颜色格式已经被添加上去。

<!-- Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker). -->
另外，您也可以在[颜色选择器](/docs/devtools/css/reference/#color-picker) 那里将颜色格式修改为 HWB。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="hwb() 颜色函数", width="800", height="508" %}


<!-- ## Improved the display of private properties {: #private-props } -->
## 改进私有属性的显示问题 {: #private-props }

<!-- DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel. -->
DevTools 现在能够正确执行并显示私有属性。在此之前，DevTools 不允许您在**控制台**以及**源码**面板里面展开带有私有属性的类。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="控制台中的私有属性", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Chromium 议题: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
下面列出的是此次更新需要注意的 bug 修复：

<!-- - The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548)) -->
- [Back/forward cache](/blog/new-in-devtools-98/#bfcache) 选项卡现在会显示那些禁止 [bfcache](https://web.dev/bfcache/)功能的插件 ID，前提是插件有 ID。( [1284548](https://crbug.com/1284548))
<!-- - Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983)) -->
- 修复类数组对象、CSS 类名、`map.get` 以及 HTML 标签的自动填充问题。([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
<!-- - Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667)) -->
- 修复双击单词以及撤销自动填充所出现的高亮问题。([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
<!-- - Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535)) -->
- 在**源码**面板里面，修复注释快捷键问题。([1296535](https://crbug.com/1296535))
<!-- - Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070)) -->
- 在**源码**面板里面，重新启用 **Alt** (选项) 键的多选功能。([1304070](https://crbug.com/1304070))


<!-- ## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## [实验阶段] Lighthouse 面板新增 timespan 和快照模式 {: #lighthouse }

{% Aside %}
<!-- To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**. -->
如果想要开启该实验特性，请在**设置** > **实验**那里勾选**使用 Lighthouse 面板中的 timespan 和 snapshot 模式**这个选项。
{% endAside %}

<!-- Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**. -->
除了现有的**导航**模式，Lighthouse 面板现在支持两种新模式，用于评估用户流程 - **timespan** 和 **snapshot**。

<!-- For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction. -->
例如，您可以使用 **timespan** 报告来分析用户交互。打开这个 [demo](https://coffee-cart.netlify.app/) 页面。选择 **Timespan** 模式，然后点击**开始 timespan** 按钮。在页面上，点击咖啡杯图案并结束 timespan。读取报告，以便于找出上述交互所产生的 [Total Blocking Time](https://web.dev/tbt/) 和 [Cumulative Layout Shift](https://web.dev/cls/)。

<!-- Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information. -->
每个模式都有属于自己特有的使用场景，优点和限制。请参考 [Lighthouse 帮助文档](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md)以获取更多信息。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Lighthouse 面板新增 timespan 和快照模式", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Chromium 议题: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
