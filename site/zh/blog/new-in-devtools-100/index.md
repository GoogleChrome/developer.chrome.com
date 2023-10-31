---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 100）"
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: '查看并修改 @supports at-rule、重命名和自定义录制选择器、以及更多。'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/rXkZGUbQjHcDWTpb8TmK.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

*感谢[韩昌浩 @hanselfmu](https://github.com/hanselfmu) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Chrome 100  {: #m100 } -->
## Chrome 100  {: #m100 }

<!-- Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones. -->
这是第 100 个 Chrome 版本！ Chrome DevTools 将继续为开发者在 Web 开发上提供可靠的工具。  **What's New** 选项卡中内含彩蛋，您可以在该选项卡里随意单击以庆祝这个里程碑。

<!-- As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->
和往常一样，您可以点击图片来观看最新的[DevTools 新功能视频](https://goo.gle/devtools-youtube)。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- ## View and edit @supports at rules in the Styles pane {: #supports } -->
## 在**样式**边栏中查看并修改 `@supports` at-rule {: #supports }

<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->
您现在可以在**样式**边栏中查看并修改 CSS `@supports` at-rule 了。这些改动可以让实时实验 @supports at-rules 更容易。

<!-- Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.  -->
打开此[演示页面](https://jec.fish/demo/at-support)，[检查](/docs/devtools/dom/#inspect) `<div class="box">` 元素，即可在**样式**边栏中查看 `@supports` at-rule。点击该 at-rule 的声明来编辑它。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="查看并编辑 @supports at-rules", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Chromium 议题: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Recorder 面板的改进 {: #recorder }

<!-- ### Support common selectors by default {: #selector } -->
### 默认支持常用选择器 {: #selector }

<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->
当在录制过程中试图确定一个唯一的选择器时，[Recorder](/docs/devtools/recorder/) 面板会自动优选选择有以下属性的元素：

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->
上列属性是在自动化测试中常用的选择器。

<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value. -->
举个例子，在这个[演示页面](https://jec.fish/demo/recorder)[开始一段新的录制](/docs/devtools/recorder/#record)。填写一个电子邮箱地址并观察它的选择器值。

<!-- Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes. -->
因为该电子邮箱元素定义了 `data-testid` 属性，该属性被自动用为选择器，而不是它的 `id` 或 `class` 属性。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="默认支持常用选择器", width="800", height="585" %}


<!-- ### Customize the recording’s selector {: #customize-selector } -->
### 自定义一段录制内容的选择器 {: #customize-selector }

<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->
如果您没有使用[常用的选择器](/docs/devtools/recorder/#selector)，您可以自定义一段录制内容的选择器。

<!-- For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->
举个例子，这个[演示页面](https://jec.fish/demo/recorder)使用了 `data-automate` 属性作为选择器。[开始一段新的录制](/docs/devtools/recorder/#record)并把 `data-automate` 作为选择器属性输入。填写电子邮箱地址并观察选择器值（`[data-automate=email-address]`）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="自定义一段录制内容的选择器", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="自定义选择器结果", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->
### 重命名一段录制内容 {: #recorder-rename }

<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title. -->
您现在可以在 [Recorder](/docs/devtools/recorder/) 面板中用录制内容的标题旁的编辑按钮（铅笔图标）来重命名一段录制内容。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="重命名录制内容", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->
## 在悬停时预览类/函数属性 {: #properties }

<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->
在**来源**面板中，您现在可以在调试过程中将鼠标悬停在某类或函数上来预览它的属性。之前，悬停只会展示函数名以及一个指向其在源代码中的位置的链接。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="在悬停时预览类/函数属性", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Chromium 议题: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->
## **性能**面板中的部分呈现帧 {: #perf }

<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->
性能记录现在在**帧**时间轴中展示了一个新的帧类别：部分呈现帧 （Partially presented frames）。

<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->
在此之前，**帧**时间轴会将任何含有延迟主线程的任务的帧作为“丢弃的帧”来展示。然而，在某些情况下，这些帧仍然可以在合成器线程的驱动下产生视觉更新（比如滚动）。

<!-- This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.  -->
这种情况给用户带来了困扰，因为这些“丢弃的帧”仍然包含了视觉更新。

<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->
新的“部分呈现帧”旨在更直观地表示出，尽管某些内容没有在某一帧中被及时呈现，但是这个问题没有严重到完全阻碍了视觉更新。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="性能面板中的部分呈现帧", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Chromium 议题: [1261130](https://crbug.com/1261130)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
本次发布还包含了一些值得注意的修复：

<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->
为[模拟的设备](/docs/devtools/device-mode/#device)更新了 iPhone 的用户代理字符串。所有 iPhone 5 之后的版本都会带有 iPhone OS 13_2_3 的用户代理字符串。([1289553](https://crbug.com/1289553))
<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->
您现在可以将[代码段](/docs/devtools/javascript/snippets/)直接存为一个 JavaScript 文件。在此之前，您需要手动添加 `.js` 文件名后缀。([1137218](https://crbug.com/1137218))
<!-- - The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite sourcemap being provided. ([1294682](https://crbug.com/1294682))  -->
**来源**面板现在在调试带有来源映射（source map）的代码时，可以正确展示作用域变量名了。在此之前，**来源**面板即使在有来源映射的情况下，还是会展示压缩之后的作用域变量名。([1294682](https://crbug.com/1294682))
<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->
**来源**面板现在可以在页面重加载后正确恢复滚动位置。在此之前，滚动位置没有正确恢复，造成了调试的不便。

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
