---
layout: 'layouts/blog-post.njk'
title: 'DevTools 新功能（Chrome 107）'
authors:
  - jecelynyeen
date: 2022-09-20
description: 'Customize keyboard shortcuts, highlight C/C++ objects in the Memory Inspector and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wchUXKvGXO7WtfDYmrsj.svg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---

*感谢 [JimLim](https://www.linkedin.com/in/jim-lim-539a5638) 提供的翻译*

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

去到**Settings(设置)** > **Shortcuts(快捷键）**, 将鼠标徘徊在命令上并点击**Edit（编辑）** 按钮 (钢笔图示）来客制化键盘快捷键。您也可以创建组合键 You can create chords (a.k.a 多键点击快捷键)。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="客制化DevTools的键盘快捷键。", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Chromium issues: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


## 使用键盘快捷键对光亮与暗黑主题进行快速切换。 {: #toggle-themes }

设置一个键盘快捷键来对光亮与暗黑主图便利地进行快速切换。这个行动的快捷键并没有被系统预设。 

<!-- Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="使用键盘快捷键对光亮与暗黑主题进行快速切换。", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


 ## 强标记忆检查器里的C/C++对象。 {: #memory } 

<!-- The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object. -->

 辨识围绕在一个对象字节中的网络组件记忆体是一个用户痛点，您必须知道对象的体积以及从对象初始的时候开始计算字节数。 

 有了这个新功能,  它会帮助您指示他们从围绕的记忆体中分离， 参看 [延伸为了C/C++ 纠错而发生的机器检查器](/blog/memory-inspector-extended-cpp/) 来学习更多的改善。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="强标记忆检查器里的C/C++对象。", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Chromium issue: [1336568](https://crbug.com/1336568)


 ## 支持HAR 导入的完整初始者的资讯。{: #har } 

 [HAR import]的完整**Initiator（初始者)** 讯息现在可以可见(/docs/devtools/network/reference/#save-as-har). 在之前的版本中, **Network（网络）** 界面只显示导入时的部分初始者讯息。 

 完整的初始者讯息将帮助开发者检索网络请求的源头并辨别和网络相关的问题。  

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="支持HAR 导入的完整初始者的资讯。", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Chromium issue: [1343185](https://crbug.com/1343185)



 ## 点击`Enter（回车键）`后开始DOM搜索。 {: #search-type } 

 您现在可以禁止**Search as you type（输入即搜索** 设置来启动点击<kbd>Enter</kbd>后开始DOM搜索。  

 在**Elements（元素）**界面, 使用<kbd>Control</kbd> 或 <kbd>Command</kbd> + <kbd>F</kbd>来对搜索栏进行快速切换。 当您在搜索栏中输入一个查询时, DOM数会跳跃至第一个符合条件的元素并将至设置为预设。 

 对于用户, 特别时经常使用长查询语句的测试者, 这中行为是很不理想的. 因为您输入的长查询语句， DOM 树可能会发生数次跳跃 (e.g. `//div[@id="example"]`)。这个行为发生了不必需要的举动。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="DOM search.", width="800", height="505" %}

 去到**Settings（设置）** > **Preferences（喜好）**, 禁止**Search as you type（输入即搜索）**. 通过这个改良, 搜索将会在点击 <kbd>Enter</kbd>才会发生。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Search as you type setting.", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Chromium issue: [1344526](https://crbug.com/1344526)


 ## 在`align-content`的CSS flexbox 属性中显示`开始` 和 `结束`图标。 {: #flexbox } 

 在**Styles（风格）**界面中 , `使用在一个CSS 类中的display: flex` 或 `display: inline-flex`的`开始` and `结束`图标来编辑`align-content` 的属性 。 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="在`align-content`的CSS flexbox 属性中显示`开始` 和 `结束`图标。", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Chromium issue: [1139945](https://crbug.com/1139945)


 ## Miscellaneous highlights {: #misc } 

 在**Console(控制台）** 边栏中显示正确的错误计数. 在之前的版本中, 当清除控制台的错误讯息是不会更新错误计数。
([1343311](https://crbug.com/1343311)) 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
