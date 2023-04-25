---
layout: 'layouts/blog-post.njk'
title: "DevTools 新功能（Chrome 111）"
authors:
  - jecelynyeen
date: 2023-02-16
description: "调试高清颜色, 增强断点的用户体验和更多新功能。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FcgcgDZrBTx9Jklfyfc5.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-111
---

*感谢 [Yoong Sin Yi (Louis)](https://www.linkedin.com/in/louis-yoong-a2370ab7/) 提供的翻译*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/zh/_partials/devtools/whats-new.md file -->


<!-- ## Debugging HD color with the Styles pane {: #color } -->
## 使用样式面板调试高清颜色 {: #color }

<!-- New [CSS color types and spaces](/blog/chrome-111-beta/#new-css-color-types-and-spaces) are coming to the web! It is equally exciting that DevTools introduced new tools to help developers create, convert and debug High Definition color.  -->
新的 [CSS 颜色类型和空间](/blog/chrome-111-beta/#new-css-color-types-and-spaces) 即将上线！ 同样令人兴奋的是，DevTools 推出了新工具来帮助开发人员创建、转换和调试高清颜色。

<!-- The **Styles** pane now supports 12 new color spaces and 7 new gamuts as outlined in the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification. See [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) for a comprehensive understanding of color options available on the web. -->
**样式** 边栏现在支持[CSS色彩等级4](https://www.w3.org/TR/css-color-4/)规范中列出的 12 个新色彩空间和 7 个新色域。请参阅[高清CSS色彩指南](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools)以全面了解网络上的色彩选项。

<!-- Here are examples of CSS color definitions with `color()`, `lch()`, `oklab()` and `color-mix()`. -->
以下是用`color()`、`lch()`、`oklab()` 和 `color-mix()` 定义 CSS 颜色的例子。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="CSS颜色定义的例子。", width="800", height="509" %}

<!-- When using the `color-mix()` function, you can view the final color output in the **Computed** pane. -->
当使用 `color-mix()` 函数时，你可以在 **Computed** 边栏中查看最终的颜色输出。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="计算边栏中的混色结果。", width="800", height="487" %}

<!-- The color picker supports all the new color spaces with more features. For example, click on the color swatch of `color(display-p3 1 0 1)`. A gamut boundary line has also been added, distinguishing between the `sRGB` and `display-p3` gamuts for a clearer understanding of your selected color's gamut. -->
颜色选择器支持所有新的颜色空间，并有更多的功能。例如，点击 `color(display-p3 1 0 1)` 的颜色色块。还增加了一条色域边界线，区分了 `sRGB` 和 `display-p3` 色域，以便更清楚地了解你所选颜色的色域。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="色域边界线。", width="800", height="657" %}

<!-- DevTools supports converting colors between color formats. Use the **Change Color Format** icon to access the conversion popup, or simply use the `Shift` + click on a color swatch in the **Styles** pane. -->
DevTools 支持在颜色格式之间转换颜色。 使用 **Change Color Format** 图标访问转换弹出窗口，或简单地使用 `Shift` + 单击**样式**边栏中的色样。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="在颜色格式之间转换颜色。", width="800", height="460" %}

<!-- When converting, it's important to know if the conversion was clipped to fit the space. DevTools puts a warning icon next to the converted color that alerts you to this clipping. -->
在转换时，知道转换是否被剪切以适应空间是很重要的。DevTools 在转换后的颜色旁边放了一个警告图标，提醒你注意这种剪裁。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5Y4rVIqL9rjuSbHcodKr.png", alt="颜色剪裁的警告。", width="800", height="657" %}

<!-- In addition, you can pick colors from your screen with the new shortcut. Press 'c' to activate the eye dropper and hit `Escape` to deactivate it. The eyedropper tool only samples colors in the sRGB color space. For example, if you try to sample the color `color(display-p3 1 0 1)`, which is outside of the sRGB color space, the eyedropper tool will clip the color to the nearest color in the sRGB space, which is magenta `color(display-p3 0.92 0.2 0.97)`. -->
此外，你可以用新的快捷方式从屏幕上挑选颜色。按 'c' 键激活滴管，按 'Escape' 键停用它。滴管工具只对sRGB色彩空间的颜色进行采样。例如，如果你试图对 sRGB 色彩空间之外的颜色 `color(display-p3 1 0 1)` 进行采样，滴管工具将把该颜色剪切到 sRGB 空间中最接近的颜色，即洋红色 `color(display-p3 0.92 0.2 0.97)`。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VNBu6RenRerRqNhNYfyf.png", alt="激活滴管。", width="800", height="657" %}

<!-- Finally, the **Color format** setting is now deprecated to make room for the new HD color format. -->
最后，**颜色格式** 设置现在已被废弃，以便为新的高清颜色格式腾出空间。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SPymkBgxzI6iVAvLdWBN.png", alt="颜色格式设置的废弃。", width="800", height="441" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f600600cf51a6582870c99e9a6b9a6a9ba76f9dc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e813f07e6a47b39c04c64a409dd08be294432490 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b54410ab252e1cdc882c3a71e86b04c3de055fa #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/392b216dfae9c04697d7d0591af547c2482f7666 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9f3432a40c557b3faa3da01fc2ef84e4cf60e66a #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/504995fbfc3bf21bcaf2718b6a469c5f23814936 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6cc705a56def86c35d61b45a98371c190f4275e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e9a64d873ac41e8d585e60b4934879abd8ba4977 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/abe7076d2df519b001dbea807a3aaf5beaa86fc0 #} 


Chromium 议题 : [1073895](https://crbug.com/1073895), [1395782](https://crbug.com/1395782), 
[1408777](https://crbug.com/1408777),  [1395782](https://crbug.com/1395782),  [1392717](https://crbug.com/1392717), [1382409](https://crbug.com/1382409), [1392054](https://crbug.com/1392054)

<!-- ## Enhanced breakpoint UX {: #breakpoint-redesign } -->
## 增强断点的用户体验 {: #breakpoint-redesign }
<!-- The redesigned **Breakpoints** pane allows you to have quick access to commonly used features, in particular, deactivating, editing, and removing breakpoints. -->
重新设计的 **断点** 边栏使你能够快速访问常用的功能，特别是停用、编辑和删除断点。

<!-- These are some highlights: -->
以下是一些重点更新：
<!-- - Both pause exception options moved to the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- 两个暂停异常选项（pause exception options）都移到了 **断点** 窗格中，并标上了文字，使其更易于解释。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KADuAqVdrxxQDg5AYYeA.png", alt="暂停例外选项。", width="800", height="518" %}

<!-- - Breakpoints are grouped by file, ordered by line or column numbers, and are collapsible. -->
- 断点按文件分组，按行号或列号排序，并且是可折叠的。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AXJ7IL5aJ6gwbZmnoH39.png", alt="按文件分组断点。", width="800", height="454" %}

<!-- - There are new options to deactivate, remove, and edit breakpoints when hovering over a breakpoint or file. -->
- 将鼠标悬停在断点或文件上时，有一些新选项可以停用、删除和编辑断点。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vAQ4YuWGuXYLxXQXt0HG.png", alt="停用断点的新选项。", width="800", height="496" %}

<!-- - Click the edit breakpoint button to open the breakpoint editor. From here, you can enter the breakpoint condition or switch to a logpoint. -->
- 单击编辑断点按钮以打开断点编辑器。 从这里，您可以输入断点条件或切换到日志点。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SrgbxxF8U3s9yzDPV25q.png", alt="断点编辑对话框。", width="800", height="697" %}

<!-- See [JavaScript debugging reference](/docs/devtools/javascript/reference/) to learn how to debug with DevTools. -->
请参阅 [JavaScript 调试参考](/docs/devtools/javascript/reference/) 了解如何使用 DevTools 进行调试。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/48b648b65cd05071d1950e50d0b529ff20294780 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6c8a19b3922ed95818b5751f1b6548724ff868c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b955a3533292790168431db4e54906d4b1fa64a #} 
Chromium 议题: [1407586](https://crbug.com/1407586), [1402891](https://crbug.com/1402891), [1402893](https://crbug.com/1402893)

<!-- ## Customizable Recorder shortcuts {: #recorder } -->
## 可自定义的记录器快捷方式 {: #recorder }

<!-- Use keyboard shortcuts to record and replay user flows quicker. -->
使用键盘快捷键可以更快地记录和重播用户流程。

<!-- The **Recorder** introduces a few convenient keyboard shortcuts for faster recording and replaying of user flows.  -->
**记录器** 引入了一些方便的键盘快捷键，可以更快地录制和重播用户流程。

<!-- Don’t remember the shortcuts? No problem, click the `?` button to view all the shortcuts at any time. -->
不记得快捷方式？ 没问题，点击 `?` 按钮可以随时查看所有的快捷方式。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BJq63X8k89HTdINY2RKu.png", alt="记录器快捷方式。", width="800", height="625" %}

<!-- You can even customize these shortcuts via the **Settings** menu. -->
您甚至可以通过**设置**菜单自定义这些快捷方式。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FtZSO1pPSooAbBrPTGC6.png", alt="自定义记录器快捷方式。", width="800", height="494" %}

<!-- If you're working in a different panel and want to start a user flow recording, use the **Create a new recording** command from the [Command Menu](/docs/devtools/command-menu/) in DevTools to get started. -->
当您在不同的面板中，并想要开始用户流记录，请使用 DevTools [命令菜单](/docs/devtools/command-menu/) 中的**创建新记录**命令来进行开始录制。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fErUqzQ03p5zOk301nTN.png", alt="新建录音命令。", width="800", height="435" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/140ffb3e4c5e084eff5522508310af5dd407cf6e #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e61fa89b8d073c4ff6b4da3599f83bf5972d5415 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/ffc735e599881fec2779477e6c20165e2796da69 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/f57026189fb51f801bf2ea2611afcb932fa32bef #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/0a7c428980b8f8a60e83c780e17f6a6f94007493 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/aea51aad7026881ad26ca1b270d12338adb92d79 #} 

Chromium 议题: [1339771](https://crbug.com/bbb)

<!-- ## Better syntax highlight for Angular {: #syntax } -->
## Angular 更好的语法显示 {: #syntax }

<!-- DevTools enhanced the syntax highlighting for Angular HTML templates, making it easier for you to read code and recognize its structure. -->
DevTools 增强了 Angular HTML 模板的语法突出显示，使您更容易阅读代码并识别其结构。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lJU7wOa4vNDb2Vm2zPJq.png", alt="Angular HTML 模板的语法突出显示。", width="800", height="507" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4ec36d2fc5e7506d1ff65fd282a43215164f03f2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/717953202d0e8463257e09cc3f68a7769fd25300 #}

Chromium 议题: [1385374](https://crbug.com/1385374),  [1385678](https://crbug.com/1385678)


<!-- ## Reorganize caches in the Application panel {: #cache } -->
## 在应用程序面板中重新组织缓存 {: #cache }

<!-- The **Cache Storage** pane can now be found in the **Storage** section of the **Application** panel, while the **Back/forward cache** pane has been moved to the **Background Services** section.  -->
**缓存存储** 窗格现在可以在 **应用程序** 面板的 **存储** 部分找到，而 **后退/转发缓存** 窗格已移至 **后台服务* * 部分。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q5ZeDvMc3OseF8fQve5A.png", alt="在“应用程序”面板中缓存。", width="800", height="506" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/adccf1afe5d585b294dee247f5a4982aca8f5f1e  #}

Chromium 议题: [1407166](https://crbug.com/1407166)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
这些是此版本中一些值得注意的修复：

<!-- - DevTools has been updated to respect the [Disable cache](/docs/devtools/network/reference/#disable-cache) setting when loading sourcemaps. ([1407084](https://crbug.com/1407084)) -->
- DevTools 已更新以在加载 sourcamap 时遵守[禁用缓存](/docs/devtools/network/reference/#disable-cache)设置。 ([1407084](https://crbug.com/1407084))
<!-- - The **Elements** panel now instantly autofocuses on the first matching element in search results. ([1381853](https://crbug.com/1381853)) -->
- **元素** 面板现在会立即自动聚焦在搜索结果中的第一个匹配元素上。 ([1381853](https://crbug.com/1381853))
<!-- - Various fixes to improve the sourcemap and breakpoints reliability. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134)) -->
- 提高 sourcemap 和断点可靠性的各种修复。 ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298]( https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134))
<!-- - To better facilitate debugging, DevTools now supports evaluating expressions with private class members. ([1381806](https://crbug.com/1381806)) -->
- 为了更好地促进调试，DevTools 现在支持处理（evaluating）使用私有类成员（private class members）表达式。 ([1381806](https://crbug.com/1381806))
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q68fvo870weBVwupujqf.png", alt="使用私有类成员评估表达式。", width="800", height="683" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
