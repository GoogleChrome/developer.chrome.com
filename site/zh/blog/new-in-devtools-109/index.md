---
layout: 'layouts/blog-post.njk'
title: "DevTools 新功能（Chrome 109）"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Recorder 面板支持复制步骤为脚本，在 Performance 面板里面显示真实的函数名称，以及更多。'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/p70HCxnj5vSj9MbsSk8H.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*感谢 [流浪大法师](https://webfrontend.dev) 提供的翻译*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/zh/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->
## Recorder: 为步骤提供新的复制选项，支持页面内重放，步骤支持鼠标右键弹出菜单 {: #recorder }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Recorder 面板支持新的复制选项", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
在 **Recorder** 面板里面打开一个用户流程。之前，当您重放该用户流程时，DevTools 会始终通过跳转或重新加载页面的方式来执行此次的重放。

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
有了这次更新，**Recorder** 面板就可以分别展示各个跳转（navigation）步骤。您可以鼠标右键并删除它来执行页面内重放！

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
除此之外，您还可以对步骤进行鼠标右键操作并将其复制到 **Recorder** 面板的剪贴板中，而不再是导出整个用户流程。它也适用于 [Chrome 扩展](https://goo.gle/recorder-extension)。例如，尝试将步骤复制为 [Nightwatch Test](https://bit.ly/nightwatch-recorder) 脚本。有了这个功能，您可以轻松地更新任何已有脚本。

<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
现在，您可以在步骤上的任何位置通过鼠标右键的方式来弹出菜单。在此之前，您只能通过点击 3 个点按钮的方式来弹出步骤菜单。

Chromium 议题：[1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)


<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## 在 Performance 面板里显示实际的函数名称 {: #performance }

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a sourcemap. -->
**Performance** 面板现在会读取 sourcemap， 在 trace 中显示实际的函数名称和它们的源文件。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="在 Performance 面板里面，对比显示压缩前的函数名称与压缩后的函数名称。", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
在这个例子里面，处在生产环境下的源文件会被压缩。例如，在这个 [demo](https://clinquant-mousse-2f2396.netlify.app/) 中，`sayHi` 函数被压缩为 `n`，`takeABreak` 函数被压缩为 `o`。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="显示压缩前与压缩后的文件。", width="800", height="392" %}


<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
在此之前，当您在 **Performance** 面板中记录 trace 时，trace 只会显示您压缩后的函数名称。这使得调试变得更加困难。

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
有了这次更新，DevTools 现在就可以读取 sourcemap 并显示实际的函数名称和源文件位置。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Chromium 议题：[1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
## Console & Sources 面板新增快捷键 {: #keyboard-shortcuts }

<!-- You can switch between tabs in the **Sources** panel using: -->
在 **Sources** 面板里面，您可以通过以下方式切换选项卡：
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
在 MacOS 系统里面，使用 <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> 和 <kbd>Arrow down</kbd>
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
在 Windows 和 Linux 系统里面，使用 <kbd>Control</kbd> + <kbd>Page up</kbd> 或 <kbd>Page down</kbd>

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
此外，您可以在 MacOS 系统里面使用 <kbd>Ctrl</kbd> + <kbd>N</kbd> 和 <kbd>Ctrl + P</kbd> 来上下选择自动填充建议，类似于 [Emacs](https://www.gnu.org/software/emacs/)。例如，您可以在 `Console` 面板里面输入 `window.` 并使用这些快捷键来上下选择自动填充建议。

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
此外，DevTools 现在只会在行尾响应用于自动填充的 <kbd>Arrow Right</kbd>。例如，当您在代码的中间位置编辑某些内容时，会弹出自动填充对话框。当您按下 <kbd>Arrow Right</kbd>时，您很可能想要将光标设置到下一个位置，而不是自动填充。这个 UX 上的变动可以更好地服务于您的工作流程。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Chromium 议题：[1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->
## 改善 JavaScript 调试体验 {: #debugging }

<!-- These are some JavaScript debugging improvements in this release: -->
以下是这个版本针对 JavaScript 调试的一些改进：

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
- `new.target` 指的是一个元属性，它可以让您检测到调用函数或构造函数是否使用 new 操作符的这种情况。您现在可以通过在 **Console** 面板里面打印出 `new.target` 的方式来检查它的值。在此之前，当您输入 `new.target` 时，它就会返回错误。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="在调试 new.target 的值时，对比显示之前和之后的 new target。", width="800", height="499" %}
<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
- `WeakRef` 对象允许您持有另一个对象的弱引用，而不会阻止该对象被垃圾回收。DevTools 现在会在调试期间在控制台里面直接显示一个 inline preview，并且对弱引用进行评估。在此之前，您必须显式地调用“deref”来解析它。
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="在调试 WeakRef 的值时，对比显示之前和之后的 WeakRef。", width="800", height="453" %}
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
- 修复了 shadowed 变量的 inline preview。在此之前，显示的值是不正确的。
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="对比显示之前和之后 shadowed 变量的 inline preview。", width="800", height="519" %}
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->
- 在 **Sources** 面板的 **Scope** 窗格中，对 `Generator` 和 `async` 函数中的变量名进行反混淆。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Chromium 议题：[1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：

<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- 针对 **Styles** 面板中的非活跃 CSS 属性 - 行内高度和宽度，弹性和网格属性，支持更多的提示信息。
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- 修复语法高亮的问题。自从 DevTools 的 [code editor](https://codemirror.net/) 升级以来，它就不再正常工作。
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- 在 **Recorder** 面板中，在失焦事件之后，正确地捕获 input change 事件。
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- 在 **Recorder** 面板中，为了更好的调试体验，更新 Puppeteer 重放脚本。
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- 针对远程调试，在 **Recorder** 面板中，支持记录和重放。
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- 修复 `var()` 中存在特殊 CSS 变量名会导致解析失败的问题。在此之前，DevTools 不支持解析带有转义字符的变量，例如 `var(--fo\ o)`。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## 【实验阶段】优化断点管理界面的 UX


{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
要启用该实验特性，请在 **Settings** > **Experiments** 下勾选 **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel**。
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
遇到需要查看所有断点的情况，目前的 **Breakpoints** 窗格所能够提供的视觉辅助实属有限。此外，常用的操作被隐藏在右键菜单中。

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
处于实验阶段的 UX redesign 目的在于结构化 **Breakpoints** 面板，并允许开发人员快速访问常用功能，特别是在编辑和删除断点的情况下。

<!-- These are some highlights: -->
这里有一些亮点：

<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- 两个暂停选项都在 **Breakpoints** 面板中，并用文本标记，以便于理解。
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
- 断点可以按文件分组，按行/列号排序，并可折叠。
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- 在 **Breakpoint** 面板中，把鼠标悬停在断点或文件名上，面板会新增删除和编辑断点的选项。

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
阅读我们的 [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) 的全部更改，并在[这里](https://crbug.com/1394686)提供您的反馈。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="对比显示重构前后的 Breakpoint 面板。", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Chromium 议题：[1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904)


<!-- ## [Experimental] Automatic in-place pretty print -->
## 【实验阶段】自动格式化

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
要启用实验，请在 **Settings** > **Experiments** 下勾选 **Automatically pretty print in the Sources panel**。
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
**Sources** 面板现在会自动对那些文件内容处于压缩状态的源文件进行格式化。您可以单击 **pretty print button `{ }`** 来取消。

<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
在此之前，**Sources** 面板默认会显示压缩内容。开发人员需要手动单击 pretty print 按钮来格式化内容。此外，格式化内容不会显示在同一个文件中，而是显示在另一个 `::formatted` 选项卡中。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="显示格式化之前与格式化之后的文件。", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Chromium 议题：[1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
