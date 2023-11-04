---
layout: 'layouts/blog-post.njk'
title: 'DevTools 新功能（Chrome 107）'
authors:
  - jecelynyeen
date: 2022-09-20
description: 'Customize keyboard shortcuts, highlight C/C++ objects in the Memory Inspector and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uzf52nA5SHTJ1wHGiolx.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---

*感谢 [Jim Lim](https://www.linkedin.com/in/jim-lim-539a5638) 提供的翻译。*

{% Partial 'devtools/banner.md' %}
{% YouTube id='1uwv6HbR8HU' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the whats-new.md file -->

<!-- Content starts here -->

## 客制化 DevTools 的键盘快捷键 {: #shortcuts }

您现在可以在 DevTools 里客制化您喜爱的键盘快捷键。

点击**设置** > **快捷键**, 将鼠标悬停在命令上并点击**编辑**的钢笔图示来客制化键盘快捷键。您也可以创建组合键（a.k.a. 多键点击快捷键）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="客制化开发者工具 （DevTools） 的键盘快捷键。", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Chromium 议题: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


## 使用键盘快捷键对浅色与深色主题进行快速切换 {: #toggle-themes }


<!-- Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut. -->

您可以设置一个快捷键来快速切换浅色与深色主题。开发者工具 （Dev Tools） 没有为这个东走预设任何快捷键。 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="使用键盘快捷键对浅色与深色主题进行快速切换。", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium 议题: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


## 高亮内存检查器里的 C/C++ 对象 {: #memory } 

<!-- The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object. -->

辨识围绕在一个对象字节中的网络组件记忆体是一个用户痛点，您必须知道对象的体积以及从对象启动的时候开始计算字节数。 

有了这个新功能,  将帮助用户讲您指示网络组件记忆对象从围绕的记忆体中分离, 参看 [延伸 - 为了C/C++ 纠错而发生的机器检查器](/blog/memory-inspector-extended-cpp/) 来学习更多的改善。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="高亮记忆检查器里的C/C++对象。", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Chromium 议题: [1336568](https://crbug.com/1336568)


## 支持 HAR 导入的完整启动器（Initiator）的讯息 {: #har } 

[HAR import] 的完整 **启动器（Initiator）** 讯息现在可以参见(/docs/devtools/network/reference/#save-as-har). 在之前的版本中, **网络 （Network）** 界面只显示启动器（Initiator) 的部分导入讯息。 

完整的启动器讯息将帮助开发者检索网络请求的源头并辨别和网络相关的问题。  

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="导入 HAR 导入的完整启动器的资讯", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Chromium 议题: [1343185](https://crbug.com/1343185)



## 点击 `Enter` 后开始 DOM 搜索 {: #search-type } 

您现在可以禁止 **即输即搜 （Search as you type）** 设置来启动点击 <kbd>Enter</kbd> 后开始DOM搜索。  

在**元素 （Elements）**面板, 使用 <kbd>Control</kbd> 或 <kbd>Command</kbd> + <kbd>F</kbd> 来打开搜索栏，每当您在搜索栏中输入一个字母, DOM 树会默认跳到第一个符合条件的元素。 

对于经常使用搜索长语句的用户, 这个设定并不是很不理想。因为 DOM 树 可能会在用户输入时, 不断地跳跃搜寻 (e.g. `//div[@id="example"]`)，造成不必要的动效。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="DOM search.", width="800", height="505" %}

打开 **设置 (Settings)** > **偏好设置 (Preferences)** , 禁止 **即输即搜 (Search as you type)** , 更改设置后，搜索将会在您点击<kbd>回车键</kbd>后才开始。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Search as you type setting.", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Chromium 议题: [1344526](https://crbug.com/1344526)


## 在 `align-content` 的 CSS flexbox 属性中显示`start` 和 `end`图标 {: #flexbox } 

在 **样式 (Styles)**边栏中, 点击 `display: flex` 或 `display: inline-flex` 旁边的图标打开 flexbox 编辑器。
您可以利用图标来编辑 `align-content` 属性的 `start` 和 `end`。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="align-content 的 CSS flexbox 属性", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Chromium 议题: [1139945](https://crbug.com/1139945)


## 其他的更新 {: #misc } 

- 在 **控制台 (Console)** 中显示正确的网页错误计数。在之前版本中, 网页错误计数并没有在清除控制台的讯息后被自动更新。([1343311](https://crbug.com/1343311)) 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
