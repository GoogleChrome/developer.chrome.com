---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 97）"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
  "新的录制器面板, 设备模式中更新的设备列表以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YO7JQwXI16NSgxijKq4v.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content, do not delete English comment -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

*感谢 [韩昌浩 @hanselfmu](https://github.com/hanselfmu) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

<!-- ## Preview feature: New Recorder panel {: #recorder } -->
## 预览特性：新的**录制器**面板 {: #recorder }

<!-- Use the new **Recorder** panel to record, replay and measure user flows.  -->
利用新的**录制器**面板来录制、重放、以及测量用户操作的性能。

<!-- [Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording.  -->
[打开**录制器**面板](/docs/devtools/recorder/#open)。请跟随屏幕上的指示来开始一次新的录制。

<!-- For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel. -->
例如，您可以在这个[点咖啡](https://coffee-cart.netlify.app/)应用上录制一次咖啡购买的过程。在添加一杯咖啡并填写支付信息之后，您可以结束录制，重放这个过程，或点击**测量性能**按钮来在**性能**面板中测量用户操作的性能。

<!-- Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial! -->
如果想通过教程来逐步了解更多内容，请访问**录制器**面板的[文档](/docs/devtools/recorder/)！

<!-- The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. -->
**录制器**面板特性目前还处于预览阶段。我们团队正在积极努力开发该功能。我们期待您的[反馈](https://goo.gle/recorder-feedback)以便于我们做进一步改进。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="录制器面板", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium 议题: [1257499](https://crbug.com/1257499)


<!-- ## Refresh device list in Device Mode {: #device } -->
## 设备模式中更新的设备列表 {: #device }

<!-- [Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions. -->
[启用设备工具栏](/docs/devtools/device-mode#viewport)之后可以发现，设备列表中添加了更多的现代设备。请选择其中一个设备来模拟该设备的尺寸。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="设备模式中更新的设备列表", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Chromium 议题: [1223525](https://crbug.com/1223525)


<!-- ## Autocomplete with Edit as HTML {: #code-completion } -->
## 修改 HTML 时自动补全 {: #code-completion }

<!-- The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for. -->
**修改 HTML（Edit as HTML）**现已支持自动补全和语法高亮。在**元素**面板中，右键点击一个元素并选择**以 HTML 格式修改**。试着输入一个 DOM 属性（例如 `id`、`aria`），自动补全会帮助您找到您想要的属性。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="在 HTML 格式修改中自动补全", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Chromium 议题: [1215072](https://crbug.com/1215072)


<!-- ## Improved code debugging experience {: #debugging } -->
## 改善的代码调试体验 {: #debugging }

<!-- Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript. -->
现在在控制台中显示的错误输出也会包含列数。列数的显示使代码调试更加便利，尤其是在调试压缩后的 JavaScript 代码时。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="错误输出中的列数", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Chromium 议题: [1073064](https://crbug.com/1073064)


<!-- ## [Experimental] Syncing DevTools settings across devices {: #sync } -->
## [实验阶段] 跨设备同步 DevTools 设置 {: #sync }

<!-- Your DevTools settings are now synced across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**.  -->
现在当您打开 Chrome 个人设置同步之后，您的 DevTools 设置会默认在多个设备上同步。您可以在**设置** > **同步** > **启用设置同步**中更改 DevTools 的同步设置。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools 同步设置", width="800", height="654" %}

<!-- This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again. Learn more about the sync feature in [DevTools customization](/docs/devtools/customize/). -->
这项新设置可以让您在跨设备工作时更轻松。例如，同步以下这些外观设置可以让您在跨设备的过程中享受一致的体验而无需重新进行配置。请在[DevTools 个性化](/docs/devtools/customize/)中了解更多。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="外观设置", width="800", height="584" %}

<!-- This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, please share with us [here](https://crbug.com/1245541). -->
这项特性目前在实验中。我们团队正在积极努力开发该功能。如果您有任何反馈，请在[这里](https://crbug.com/1245541)分享给我们。

Chromium 议题: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
