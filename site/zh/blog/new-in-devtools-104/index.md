---	
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 104）"
authors:
  - jecelynyeen
date: 2022-07-13
updated: 2022-07-13
description: "在调试时进行帧重启、录制面板中的慢速复盘选项与更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VojSLwN9rFRkALzi6RZh.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-104
---

*感谢 [Jim Lim @xyugroup](https://www.linkedin.com/in/jim-lim-539a5638) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='4RXWfw7Xg_Y' %}
<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

## 在调试时进行帧重启 {: #restart-frame  }

**帧重启** 功能回归了! 您可以在调试时的函数中途从头开始重启当前代码行之前的代码。这个功能曾经因为稳定性问题在 Chrome 92 版本被弃用。  

在这个 [例子](https://jec.fish/), 调试器暂停在这个靠近`toggleColorScheme`函数尾端的断点（343 行) 。 在函数 `toggleColorScheme`开始处重启调试器, 扩展在**调试器**面板中的 **调用** 部分, 在`toggleColorScheme`上右点击并选取**帧重启**。  

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uBcTkuIaoHHTgJCiGNED.png", alt="在调试时进行帧重启", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f6749f5cbbfc7d3c89cb2b6b3557d0ff33536ad #}

Chromium 议题: [1303521](https://crbug.com/1303521)


## 录制面板中的慢速重播选项 {: #recorder  } 

您现在可以对用户流程进行慢速重播 - 慢、很慢和极慢. 这些选项使您能在屏幕上更加详细地观察到每一个重播的步骤。 

[打开](/docs/devtools/recorder/#open) **录制** 面板，然后[开始一个新的录制](/docs/devtools/recorder/#record)。 录制完成后，在**重播**的下拉按钮上点击， 选择一个速率来进行重播流程。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yLIIMlaew0EWfEYdDbXJ.png", alt="录制面板上的慢速重播选项", width="800", height="486" %}

Chromium 议题: [1306756](https://crbug.com/1306756)


## 为录制面板创建 extension {: #recorder-extension } 

您可以创建或安装一个Chrome扩展来使用您喜爱的格式来导出重播脚本。 看 [录制扩展应用程序界面API](/docs/extensions/reference/devtools_recorder/) 文档来学习如何自己创建一个Extension。

按照[这些步骤](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) 安装一个演示扩展。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="为录制面板客制化扩展", width="800", height="486" %}

Chromium 议题: [1325751](https://crbug.com/1325751)


## 使用面板中的已编写/已部署来进行分组 {: #authored-deployed } 

启用新的**已编写/已部署**来进行分组以组织您的源面板中的文件。当使用框架(例如, React, Angular)来开发网络应用程序, 在浏览源文件的时候会非常困难，那是因为由构建工具(例如, Webpack, Vite)所产生的缩图造成的。  
 
使用这个复选框, 您可以将文件分组成两个类别以进行快速搜索: 

- **已编写 (Authored)**. 类似您在集成开发环境(IDE)中的源文件。 DevTools 根据您的源图产生这些文件 (由您的构建工具DevTools所提供).
- **已部署（Deployed）** - 浏览器读取的真正文件。 通常这些是已压缩的文件。 
 
您可以自己做一个尝试，用这个链接 [React demo](https://reactjs.org/)! 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5E1qbkl0Gx1REx7FdqEr.png", alt="使用源面板中的已编写/已部署进行分组", width="800", height="521" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6bc65d0595702fc826ca87e2cfe519a134b62d90 #}
 
Chromium 议题: [960909](https://crbug.com/960909)


## Performance insights 面板新增了用户计时轨道 {: #performance }

您现在可以透过 **Performance insights** 面板新增的**用户计时**轨道来查看您 performance recording 的 `performance.measure()` 标记。 

例如, 这个 [网页](https://jec.fish/demo/perf-measure) 使用 [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure())方法进行文字载入耗时的计算。

当您开始 [测量页面载入](/docs/devtools/performance-insights/#record), **用户计时** 追踪显示在录制中。在旁侧面板中点击计时物件检视计时细节. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nxPCp6UaiGWJCWWx4Laa.png", alt="Performance insights 面板新增了用户计时轨道", width="800", height="499" %}

Chromium 议题: [1322808](https://crbug.com/1322808)

 
## 显示元素的分配槽（slot） {: #slot } 

**元素**面板中的槽原件有一个新的`槽`徽章。当调试布局的问题时，使用这个功能快速地确认影响节点布局的元素 .  

这个 [样本](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) 包含了几个被命名槽的卡片。 检查`个人-职业` 槽的卡片, 点击`槽` 靠近它的徽章以显示他的分配槽。 

[学习](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) how to use [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) and [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) 元素分配一个可以用来填充网页组件的影子文件对象模型 (Shadow DOM) 的自由面板。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uQGHp9WoMCG1RIAkgIF.png", alt="显示元素的分配槽", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/164e238dabefc08018318a981131eedf2e81736b #}

Chromium 议题: [1018906](https://crbug.com/1018906)


## 模拟性能录制的硬件并发 {: #simulate  } 
 
在**性能** 面板中的**硬件并发**新设置让开发者设置由`navigator.hardwareConcurrency`报告的值。 
 
一些应用程序使用 `navigator.hardwareConcurrency`来调控他们的应用程序的并行程度, 例如,  调控Emscripten的可移植操作系统接口线程池(PThread)的大小. 使用这个功能, 开发者可以测试他们的应用程序在不同的内核数下的性能。
 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PyykGRv29FZbBKJAwWOW.png", alt="模拟性能录制的硬件并行", width="800", height="536" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b26de259d74a45e700d989ad9178c5e3a8b73145 #}
 
Chromium 议题: [1297439](https://crbug.com/1297439)


## 在自动填充层叠样式表（CSS）时预览非颜色数值的值 {: #css-var } 

当完成自当填充层叠样式表（CSS）变量时, DevTools 可以使用有意义的数值填充非颜色变量，并且让你预览改变后的节点数值。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V4slwNtX9HwLPdAyr8JF.png", alt="在自动填充层叠样式表（CSS）时预览非颜色数值的值", width="800", height="431" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/977cc58cb5654a2b68142ef8ac1b3f9ac2822694 #}

Chromium 议题: [1285091](https://crbug.com/1285091)

        
## 识别退后/前进缓存面板中的阻塞帧 {: #bfcache } 

[退后/前进缓存](/docs/devtools/application/back-forward-cache/) 面板中的**应用程序** 有新的 **帧** 分部来帮助你识别阻止页面符合bfcache条件的阻塞帧 . 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UaRYEoYYoXhjSIn9seYK.png", alt="识别退后/前进缓存面板中的阻塞帧", width="800", height="486" %}
 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/897799b24fff0639d483111dd2d957288ba2bd06 #}
 
Chromium 议题: [1288158](https://crbug.com/1288158) 
 
 
## 改良JavaScript对象的自动填充建议 {: #autocomplete } 

JavaScript对象属性的自动填充现在可以根据这个规律显示: 

1. 拥有可枚举的属性
2. 拥有不可枚举的属性
3. 继承的可枚举的属性
4. 继承的不可枚举的属性

以前，开发者很难找到相关属性， 因为这个建议功能只支持自己的属性而非它的继承属性, 并且所有的继承属性都有自己的优先等级。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IvFTcOWrBOTTMRHqn8u4.png", alt="JavaScript对象属性的自动填充现在可以根据这个规律显示", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cee5205ae93c95b1dce49e220b9ebfa8c998d5a6 #}
 
Chromium 议题: [1299241](https://crbug.com/1299241)

 
## 源图优化 {: #sourcemaps }
 
以下是列出了几个源图的修复，这些优化改进了整体调试体验: 
 
- 您现在可以在带有 sourceURL 注释的内联的 `<script>`脚本中设置断点。 
- 调试器现在可以解析带有源图的**范围**视图中的块作用域变量。 
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gv9cGnDMF7OVlXPWntII.png", alt="解析块作用域变量lock scoped variables", width="800", height="532" %}
- 调试器现在可以解析带有源图的的**范围**视图中的块箭头函数的变量. 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZk0xjwMQAqknkW5G4Xf.png", alt="解析箭头函数中的变量", width="800", height="479" %}

Chromium 议题: [1329113](https://crbug.com/1329113), [1322115](https://crbug.com/1322115)
 
 
## 其他亮点 {: #misc } 
 
这里是一些本版本中需要注意的修复: 
 
- 修复源面板中的**自动填充**设置。之前, 这个功能的关闭设置是失效的。 ([1323286](https://crbug.com/1323286))
- 更新**应用程序**面板中的**清单文件（Manifest）**来解析最新的配色方案的格式。 ([1318305](https://crbug.com/1318305))
- 改进了 **Performance insights** 中的 `<script async>` 渲染阻塞问题的建议。 之前，既使已经在脚本标注为异步， DevTools 也会建议用户`将异步属性添加到脚本标签`。 ([1334096](https://crbug.com/1334096))
- **性能洞察**面板现在将iframes检测为布局变化的潜在原因。 你可以检看**细节**面板 中的iframe 细节。 ([1328873](https://crbug.com/1328873)) 
- 当**命令菜单**中 [打开文件](/docs/devtools/resources/#open) , 编写文件 (源图产生的文件) 的排名会更加高，因此他们会出现在被相似命名的部署脚本之上。 ([1312929](https://crbug.com/1312929)) 


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
