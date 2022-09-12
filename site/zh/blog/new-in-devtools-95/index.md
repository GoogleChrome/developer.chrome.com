---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 95）"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-10-20
description:
  "新的 CSS 长度编辑工具、在“问题”标签页隐藏问题、改善属性展示以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/F7eHsbOisrDMocY3MjSx.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*感谢 [韩昌浩 @hanselfmu](https://github.com/hanselfmu) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

<!-- ## New CSS length authoring tools {: #length } -->
## 新的 CSS 长度编辑工具 {: #length }

<!-- DevTools added an easier yet flexible way to update lengths in CSS! -->
DevTools 添加了一种更简单且灵活的方式来更新 CSS 长度！ 

<!-- In the **Styles** pane, look for any CSS property with length (e.g. `height`, `padding`). -->
在“样式”边栏中，找到任意一个含有长度的 CSS 属性（例如 `height`、`padding`）。

<!-- Hover over the unit type, and notice the unit type is underlined. Click on it to select a unit type from the dropdown. -->
将鼠标悬停在长度单位上，会出现一条下划线来标明它。点击它即可在弹出的下拉列表中选择新的长度单位。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- Hover over the unit value, and your mouse pointer is changed to horizontal cursor. Drag horizontally to increase or decrease the value. To adjust the value by 10, hold the <kbd>Shift</kbd> key when dragging. -->
将鼠标悬停在长度数值上，就会发现您的鼠标指针变成了可横向移动的光标。横向拖拽光标即可加减长度数值。如果想以 10 来调整长度数值，可以在拖拽的同时按下 <kbd>Shift</kbd> 键。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

<!-- You can still edit the unit value as text — just click on the value and start editing. -->
您仍然可以通过使用文本的方式来编辑长度数值 -- 只需要在长度数值上点击一下即可直接编辑。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Chromium 议题: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


<!-- ## Hide issues in the Issues tab {: #hide-issues } -->
## 在“问题”标签页隐藏问题 {: #hide-issues }

<!-- You can now hide specific issues in the Issues tab to focus only on those issues that matter to you. -->
您现在可以在“问题”标签页中隐藏特定的问题，从而只关注您关心的问题。

<!-- In the [Issues tab](/docs/devtools/issues/), hover over on an issue you would like to hide. Click on **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this**. -->
在[“问题”标签页](/docs/devtools/issues/)，将鼠标悬停在一个您想要隐藏的问题上。点击**更多选项** &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="更多", width="4", height="20" %} &nbsp; > **隐藏与此类似的问题**。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="“隐藏问题”菜单", width="800", height="488" %}

<!-- All hidden issues will be added under the **Hidden issues** pane. Expand the pane. You can unhide all hidden issues or a selected one.  -->
所有的隐藏问题都会被添加到“已隐藏的问题”窗格下。展开此窗格，您可以取消隐藏所有问题或选中的问题。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="“已隐藏的问题”窗格", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Chromium 议题: [1175722](https://crbug.com/1175722)


<!-- ## Improved the display of properties {: #properties } -->
## 改善属性展示 {: #properties }

<!-- DevTools improve the display of properties by: -->
DevTools 通过以下方式改善了属性的展示：

<!-- - Always bold and sort own properties first in the **Console**, **Sources** panel and **Properties** pane. 
- Flatten the properties display in the **Properties** pane. -->
- 在控制台、“来源”面板和“属性”边栏中，永远加粗并优先排序自有属性。
- 在“属性”边栏中扁平化展示属性。

<!-- For example, the snippet below creates an [`URL`](https://developer.mozilla.org/docs/Web/API/URL) object `link` with 2 own properties: `user` and `access`, and updates the value of an inherited property `search`. -->
例如，以下的代码片段创建了一个 [`URL`](https://developer.mozilla.org/docs/Web/API/URL) 对象链接（`link`），它包含了两个自有属性：`user` 和 `access`，并更新了一个继承属性 `search` 的值。

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

<!-- Try logging `link` in the **Console**. Own properties are now bold and sorted first. These changes make it easier to spot custom properties, especially for [Web APIs](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) with many inherited properties. -->
试着在“控制台”中打出 `link`。自有属性现在是加粗并优先排序的。这些改动会让自定义属性更容易被发现，尤其对于有着很多继承属性的 [Web APIs](https://developer.mozilla.org/docs/Web/API)（例如 `URL`）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="自有属性加粗并优先排序", width="800", height="561" %}

<!-- Apart from these changes, the properties in the  **Properties** pane are also flattened now for better DOM properties debugging experience, especially for [Web components](https://www.webcomponents.org/introduction).  -->
在这些改动之外，“属性”边栏所展示的属性现在也已扁平化，从而提供更好的 DOM 属性调试体验，尤其是对于 [Web components](https://www.webcomponents.org/introduction)。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="扁平化的属性", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Chromium 议题: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


<!-- ## Lighthouse 8.4 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 面板中的 Lighthouse 8.4 {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 8.4. Lighthouse will now detect if the [Largest Containful Paint (LCP)](https://web.dev/lcp) element was a lazy-loaded image and recommend removing the `loading` attribute from it. -->
**Lighthouse** 面板现已运行 Lighthouse 8.4。Lighthouse 现在可以检测到某 [Largest Containful Paint (LCP)](https://web.dev/lcp) 元素是否是一个延迟加载的图片，并建议移除该图片的 `loading` 属性。

<!-- Check out the [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) for more details on the updates. -->
更多的更新细节请参见 [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/)。

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="Lighthouse 报告中的延迟加载 LCP 审核", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Chromium 议题: [772558](https://crbug.com/772558)


<!-- ## Sort snippets in the Sources panel {: #snippets } -->
## 在“来源”面板中排序代码段 {: #snippets }

<!-- The [snippets](/docs/devtools/javascript/snippets/) in the **Snippets** pane under the **Sources** panel are now sorted alphabetically. Previously, it’s not sorted. -->
“来源”面板下的“代码段”边栏中的[代码段](/docs/devtools/javascript/snippets/)现在按照字母顺序排序了。在此之前它并无排序规则。

<!-- Utilize the snippets feature to run commands quicker. Watch this video for a [tip](https://youtu.be/NOal2gTzftI?t=176)! -->
利用代码段功能来更快运行命令。请观看此视频来获得一个[提示](https://youtu.be/NOal2gTzftI?t=176)！

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="在“来源”面板中排序代码段", width="800", height="475" %}

Chromium 议题: [1243976](https://crbug.com/1243976)


<!-- ## New links to translated release notes and report a translation bug {: #localized } -->
## 阅读 DevTools 新功能的翻译文章和举报翻译错误 {: #localized }
<!-- You can now click to read the DevTools release notes in 6 other languages - [Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95), [Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95), [Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95)  via the What’s new tab.  -->
您现在可以在**新变化**标签页里点击阅读其他 6 种语言的 DevTools 新功能 - [俄文](/ru/blog/new-in-devtools-95), [中文](/zh/blog/new-in-devtools-95), [西班牙文](/es/blog/new-in-devtools-95), [日文](/ja/blog/new-in-devtools-95), [葡萄牙文](/pt/blog/new-in-devtools-95) and [韩文](/ko/blog/new-in-devtools-95).

<!-- Since Chrome 94, you can [set your preferred language](/blog/new-in-devtools-94/#localized) in DevTools. If you found any issues with the translations, help us improve it by [reporting a translation issue](https://goo.gle/devtools-translate) via **More options** > **Help** > **Report a translation bug**.  -->
从 Chrome 94 开始，您可以在 DevTools 中[设置您的界面语言](/blog/new-in-devtools-94/#localized)。 如果您发现任何翻译问题，请通过 **更多选项** > **帮助** > **[举报翻译问题](https://goo.gle/devtools-translate) 帮助我们改进翻译错误**。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="两个新的链接让您阅读 DevTools 新功能的翻译文章和举报翻译错误", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Chromium issues: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481) 


<!-- ## Improved UI for DevTools command menu {: #command-menu } -->
## DevTools 命令菜单的用户交互优化 {: #command-menu }

<!-- Did you find it hard to search for a file in the [Command Menu](/docs/devtools/command-menu/#open)? Good news for you, the **Command Menu** user interface is now enhanced!  -->
您是否发现要想在[命令菜单](/docs/devtools/command-menu/#open)中搜索一个文件，这本身就是一件很困难的事情呢？好消息来了，**命令菜单**的用户交互现在得到了改善！

<!-- Open the **Command Menu** to search for a file with keyboard shortcut <kbd>Control</kbd>+<kbd>P</kbd> in Windows and Linux, or <kbd>Command</kbd>+<kbd>P</kbd> in MacOS. -->
打开**命令菜单**，在 Windows 和 Linux 上使用快捷键 <kbd>Control</kbd>+<kbd>P</kbd>，或在 MacOS 上使用 <kbd>Command</kbd>+<kbd>P</kbd> 来搜索文件。

<!-- The UI improvements of the **Command Menu** is still ongoing, stay tuned for more updates! -->
**命令菜单**的用户交互还在持续优化中，请继续关注后续的更新！

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="命令菜单", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Chromium 议题: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
