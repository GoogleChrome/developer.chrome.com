---
layout: 'layouts/blog-post.njk'
title: "DevTools 新功能（Chrome 108）"
authors:
  - jecelynyeen
date: 2022-10-26
description: '提示非活跃的 CSS 属性、记录器（Recorder）新增 XPath 和文本选择器以及更多。'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fQvLwDdC3o6d1wwKCCHT.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*感谢 [Poong Zui Yong](https://www.linkedin.com/in/zui-yong-poong-1b507b14/) 提供的翻译*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/zh/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint } -->
## 提示非活跃的 CSS 属性 {: #css-hint }

<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->
DevTools 现在可以识别那些语法有效但在页面上没有效果的 CSS 样式。 在**样式**边栏中，DevTools 会通过淡化字体颜色的方式来展示那些不活跃的属性。 将鼠标悬停在它旁边的图标上，以便于了解为什么该规则没有可见效果。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="提示非活跃的 CSS 属性", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Chromium 议题: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
## 记录器（Recorder）面板支持自动检测 XPath 和文本选择器 {: #recorder }

<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->
**记录器（Recorder）**面板现在支持 XPath 和文本选择器。 [开始记录一个用户流程](/docs/devtools/recorder/#record)，在元素存在可用选择器的情况下，记录器会自动将选中的 XPath 以及唯一的超短文本作为选择器。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="记录器（Recorder）面板支持 XPath 和文本选择器", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Chromium 议题: [1327206](https://crbug.com/1327206),[1327209] (https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
## 逐步执行逗号分隔的表达式 {: #debugging }

<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->
您现在可以在调试期间单步执行那些以逗号分隔的表达式。 这种做法提升了调试压缩代码的用户体验。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="逐步执行逗号分隔的表达式。", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
之前 DevTools 仅支持单步执行那些以分号分隔的表达式。
<!-- Given the code below, -->
鉴于下面的代码，

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
转译器和压缩器可能会将它们转换为逗号分隔的表达式。

```js
function bar(){return foo(),foo(),42}
``` 

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using sourcemaps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
在调试过程中，上述行为会给人造成思维上的混乱，因为压缩后的代码和用户编写的代码之间存在步进行为不一致的情况。在使用 sourcemap 来调试压缩代码所对应的源码时，会更加让人不解，因为开发人员正在查看分号（背后被工具链转换为逗号）但调试器不会在分号那里停住。

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Chromium 议题: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## 改进忽略列表设置 {: #ignore-list }
<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->
转到 **设置（Settings）** > **忽略列表（Ignore List）** 。 DevTools 改进了设计以帮助您配置规则以[忽略单个脚本或脚本模式](/docs/devtools/javascript/reference/#settings-ignore-list)。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="忽略列表选项卡。", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Chromium 议题: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }
<!-- These are some noteworthy fixes in this release: -->
以下是此版本中一些值得注意的修复：
<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
在**样式**边栏中按空格自动完成 CSS 属性名称。 （[1343316](https://crbug.com/1343316))
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->
删除 **Element** 面板的页面路径/面包屑导览中的自动滚动。 ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
