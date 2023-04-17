---
layout: 'layouts/blog-post.njk'
title: "DevTools 新功能（Chrome 110）"
authors:
  - jecelynyeen
date: 2023-02-13
description: '重载时清除性能面板, 在记录器中查看并突出显示用户流的代码和更多新功能。'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VoEi83p5Na5KhDBANwjD.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-110
---

*感谢 [Yoong Sin Yi (Louis)](https://www.linkedin.com/in/louis-yoong-a2370ab7/) 提供的翻译*。

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Clearing Performance Panel on reload {: #perf } -->
## 重载时清除性能面板 {: #perf }

<!-- The **Performance** panel now clears both the screenshot and trace when you click the **Start profiling and reload page** button. -->
当点击 **开始分析和重新加载页面** 按钮时，**性能** 面板现在会同时清除屏幕截图和跟踪。

<!-- Previously, the **Performance** panel displayed a timeline with screenshots from previous recordings. This made it difficult to see when the actual measurement started. The panel now always navigates to the `about:blank` page first to guarantee that the recording begins with a blank trace. This aligns with the **Performance Insights** panel which already did the same. -->
以前，**性能** 面板会显示一个时间轴，其中包含以前录制的屏幕截图。 这使得我们很难看到实际测量录制是什么时候开始的。 现在面板总是先导航到 "about:blank "页面，以保证记录从一个空白跟踪开始。这与 **性能洞察力** 面板一致，后者已经做到了这一点。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JVXCt6hKIxMtf0tCLWwh.png", alt="重载时清除性能面板.", width="800", height="548" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a301d29d165f17a6eceb1adf91bff0c1c2e07eb #}

Chromium 议题: [1101268](https://crbug.com/1101268), [1382044](https://crbug.com/1382044)


<!-- ## Recorder updates {: #recorder } -->
## 记录器更新 {: #recorder }

<!-- ### View and highlight the code of your user flow in the Recorder {: #recorder-code } -->
### 在记录器中查看并突出显示用户流的代码 {: #recorder-code }

<!-- The **Recorder** now offers split code view, making it easier to view your user flow code. To access the code view, open a user flow and click **Show Code**.  -->
**记录器** 现在提供拆分代码视图，让您更轻松地查看用户流代码。 要访问代码视图，打开用户流并点击**显示代码**。

<!-- The  **Recorder**  highlights the corresponding code as you hover over each step on the left, making it easy to track your flow. You can change the code format using the dropdown, which lets you switch between formats such as [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. -->
当把鼠标悬停在左边的每个步骤上时，**记录器** 突出显示相应的代码，使您很轻松跟踪您的流程。您可以使用下拉菜单改变代码格式，让您在 [Nitghtwatch](https://bit.ly/nightwatch-recorder) 脚本等格式之间切换。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxNNmun9Yfqs97JCAn7C.png", alt="记录器中的代码视图。", width="800", height="542" %}

Chromium 议题: [1385489](https://crbug.com/1385489)


<!-- ### Customize selector types of a recording {: #recorder-selector } -->
### 自定义录音的选择器类型 {: #recorder-selector }

<!-- You can create recordings that capture only the selector types that matter to you. With the new option to customize selector types when creating a new recording, you can include or exclude selectors such as XPath, ensuring you capture only the selectors you want in your user flows. -->
您可以创建只捕获对您重要的选择器类型的记录。 通过在创建新记录时自定义选择器类型的新选项，您可以包括或排除选择器 XPath，确保您只捕获用户流中所需的选择器。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5t2TOY9VA2Uq08Dq2ZhM.png", alt="自定义选择器类型的新选项.", width="800", height="645" %}

Chromium 议题: [1384431](https://crbug.com/1384431)


<!-- ### Edit user flow while recording {: #recorder-edit } -->
### 录制时编辑用户流程 {: #recorder-edit }

<!-- The **Recorder** now allows editing during recording, providing you with the flexibility to make changes in real-time. You no longer need to end the recording to make adjustments. -->
**录音机** 现在允许在录制过程中进行编辑，让您可以灵活地进行实时更改。 您不再需要结束录制来进行调整。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1a2S1lizzJ5acRMgjtwH.png", alt="在用户流程记录过程中进行编辑。", width="800", height="619" %}

Chromium 议题: [1381971](https://crbug.com/1381971)


<!-- ## Automatic in-place pretty print {: #pretty-print } -->
## 自动的代码美化器 {: #pretty-print }

<!-- The **Sources** panel now automatically pretty prints minified source files in place. You can click on the **pretty print** button `{ }` to undo it. -->
在 **资源** 面板会自动在原地代码美化已减化的源文件。你可以点击 **代码美化器** 按钮`{ }`来撤销它。

<!-- Previously, the **Sources** panel showed minified content by default. To format the content, you had to click the pretty print button manually. On top of that, the pretty-printed content wasn’t displayed in the same tab, but in another `::formatted` tab. -->
在以前，**源代码** 面板默认显示缩小的内容。 要格式化内容，您必须手动单击代码美化器的打印按钮。 最重要的是，代码美化器内容没有显示在同一个选项卡中，而是显示在另一个 `::formatted` 选项卡中。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="在自动代码美化器之前和之后显示缩小的文件。", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3ae70742a7fce9657d8fcd578a182635e619cad5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b9c42efb6065c8a697eaf3acd656cb87e3d4f54 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6bddcbabb2d977b620758ac20785675053a4db9  #}

Chromium 议题: [1383453](https://crbug.com/1383453), [1382752](https://crbug.com/1382752), [1382397](https://crbug.com/1382397) 


<!-- ## Better syntax highlight and inline preview for Vue, SCSS and more {: #highlight } -->
## 为 Vue、SCSS 等提供更好的语法高亮和内联预览 {: #highlight }

<!-- The **Sources** panel enhanced the syntax highlighting for several widely-used file formats, enabling you to read code more easily and recognize its structure, including Vue, JSX, Dart, LESS, SCSS, SASS, and inline CSS. -->
**源代码** 面板增强了几种广泛使用的文件格式的语法突出显示，使您能够更轻松地阅读代码并识别其结构，包括 Vue、JSX、Dart、LESS、SCSS、SASS 和内联 CSS。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/92SB2J5N6ImqJlOY3tIB.png", alt="Vue 里的语法突出显示.", width="800", height="550" %}

<!-- In addition, DevTools also improved the inline preview for Vue, inline HTML, and TSX. Hover over a variable to preview its value.  -->
此外，DevTools 还改进了 Vue、内联 HTML 和 TSX 的内联预览。将鼠标悬停在一个变量上可以预览它的值。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uLxVoWz3yyxYvOkgCq7t.png", alt="Vue 的内联预览。", width="800", height="700" %}

<!-- Apart from that, DevTools now shows the sourcemap of a stylesheet in the **Sources** panel. For instance, when you open a SCSS file, you can access the related CSS file by clicking on the sourcemap link. -->
除此之外，DevTools 现在在 **源代码** 面板中显示样式表的源码图。例如，当你打开一个 SCSS 文件时，你可以通过点击源图链接来访问相关的 CSS 文件。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bK6TMGR8c6285bUlrIbx.png", alt="SASS 的源代码地图链接.", width="800", height="745" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c9af6b86b85bf23f9ed07d68b2d58b45910426de #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4f330a0d5cef6e74b5b73f258e55cc0960769bca #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ec6a8092e7b45fc403d571982d1b214181d9695 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5a02aca17849514b1e2bc828f78aedece5161dfa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0928e31ba0ed2e81456f0109d323dd09768cfe1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992cc762b6790a7bd1a0d5c12ed0169270ac7dd0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2bc726458c3d6507be9a4b56845b789c7ce653e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b77b77646c6257ab80893f5d1b5d9607a969c0e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f1ab763383c7641644f7fd4f88c49465a70ed01 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11bdafdbbd9bd153aea84b1fe03db4dff89d3aa9 #}

Chromium 议题: [1385374](https://crbug.com/1385374), [1385632](https://crbug.com/1385632), [1385281](https://crbug.com/1385281), [1385269](https://crbug.com/1385269), [1383892](https://crbug.com/1383892), [1361862](https://crbug.com/1361862), [1383451](https://crbug.com/1383451), [1392106](https://crbug.com/1392106), [1149734](https://crbug.com/1149734)


<!-- ## Ergonomic and consistent Autocomplete in the Console {: #console } -->
## 控制台中符合人体工程学且一致的自动完成功能 {: #console }

<!-- DevTools enhances the autocompletion experience by implementing the following changes: -->
DevTools 通过实施以下更改增强了自动完成体验：

<!-- - `Tab` is always used for autocompletion. -->
- `Tab`总是用于自动完成。
<!-- - The behavior of `Arrow right` and `Enter` varies based on context. -->
- `右箭头` 和 `回车` 的行为因环境而异。
<!-- - The autocompletion experience is consistent across text editors, in the **Console**, **Sources**, and **Elements** panels  -->
- 在 **控制台**、**源代码** 和 **元素** 面板中，自动完成的体验在各文本编辑器中是一致的。

<!-- For example, here is what happens when you type `cons` in the **Console**: -->
例如，当你在 **控制台** 中输入 "cons "时，会发生以下情况。

<!-- - The **Console** displays a list of autocomplete suggestions, with a subtle dotted border around the top option indicating that navigation has not yet begun. -->
- **控制台** 显示一个自动完成的建议列表，顶部选项周围有一个微妙的点状边框，表明导航尚未开始。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kSTUPmkQK3HzE7BElmAK.png", alt="顶部自动完成选项周围的虚线边框。", width="800", height="580" %}
<!-- - The **Console** executes the line when you press `Enter`. Previously, it would automatically complete the line with the top suggestion. To auto-complete, press either `Tab` or `Arrow Right`. -->
- 当您按 `回车` 时，**控制台** 会执行该行。 以前，它会自动完成带有最高建议的行。 要自动完成，请按 `Tab` 或 `右箭头`。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7SZ8AM51vI7WEIovjUDX.png", alt="执行回车上的行。", width="800", height="549" %}
<!-- - The **Console** highlights the selected option as you navigate through the suggestion list using the `Arrow up` and `Arrow down` shortcuts. -->
- 当您使用`向上箭头` 和 `向下箭头` 快捷方式浏览建议列表时，**控制台** 会突出显示所选选项。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XxjZu5GrFnPEUZhoQN0i.png", alt="建议导航期间的亮点。", width="800", height="580" %}
<!-- - To auto-complete with the selected option during navigation, use the keyboard keys `Tab`, `Enter`, or `Arrow Right`. -->
- 要在导航期间自动完成所选选项，请使用键盘键`Tab`、`回车` 或 `右箭头`
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YU89q0lRFsocpdXS6ZMO.png", alt="在导航过程中使用所选选项自动完成。", width="800", height="360" %}

<!-- - When editing in the middle of code, for example, when the cursor is between `n` and `s`, use `Tab` for autocompletion, `Enter` to execute the line, and `Arrow Right` to move the cursor forward. -->
- 在代码中间编辑时，例如，当光标在 `n` 和 `s` 之间时，使用 `Tab` 进行自动补全，使用 `回车` 执行该行，使用 `右箭头` 向前移动光标。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4jiMQ2btaT4MX7Y3VqgH.png", alt="在代码中间编辑。", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00103b19eec2ba086c608b79ff34b696fe07bb62 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89f259ddb6c36f486108e0dc9ccb4d4125a04917 #}

Chromium 议题: [1399436](https://crbug.com/1399436), [1276960](https://crbug.com/1276960)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：

<!-- - A regression issue in DevTools, where it failed to stop at the `debugger` statement in inline scripts, has been resolved. ([1385374](https://crbug.com/1385374)) -->
- DevTools 中的一个回归问题，即它无法在内联脚本中的 `debugger` 语句处停止，已经得到解决。([1385374](https://crbug.com/1385374))
<!-- - A new **Console** setting that allows you to expand or collapse `console.trace()` messages by default. Toggle the settings via **Settings** > **Preferences** >  **Expand console.trace() messages by default**. ([1139616](https://crbug.com/1139616)) -->
- 新的 **控制台** 设置，允许你默认展开或折叠`console.trace()`信息。通过 **设置** > **首选项** > **默认展开console.trace()信息来切换设置。([1139616](https://crbug.com/1139616))
<!-- - The [Snippets](/docs/devtools/javascript/snippets/) pane in the **Sources** panel supports enhanced autocomplete, similar to the **Console**. ([772949](https://crbug.com/772949))  -->
- **源代码** 面板中的 [Snippets](/docs/devtools/javascript/snippets/) 边栏支持增强的自动完成功能，类似于 **控制台**。 ([772949](https://crbug.com/772949))
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/thkb1CYO0yYiGHll7Yp8.png", alt="摘录中的自动完成。", width="800", height="417" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
