---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 106）"
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "Better support for modern web debugging, LCP timings breakdown in the Performance Insights, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wCoTnfpC0kBvZGrr3GfB.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

*感谢 [Yoong Sin Yi (Louis)](https://www.linkedin.com/in/louis-yoong-a2370ab7/) 提供的翻译*。

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored } -->
## 在 Sources 面板中按照 Authored / Deployed 对文件进行分组 {: #authored }

<!-- The **Group files by Authored / Deployed** is now shown under the 3-dot menu. Previously, it showed directly on the navigation pane. -->
现在 **已创作/ 已部署** `(Authored / Deployed)` 选项将显示在三点式菜单下。 以前，它是显示在导航边栏上。

<!-- Open this [demo](https://ng-devtools.netlify.app/). Enable the **Group files by Authored / Deployed** setting to view your original source code (Authored) first and navigate to them quicker. -->
打开这个 [演示] (https://ng-devtools.netlify.app/)。 启用**已创作/已部署分组**的设置，以便首先查看你的原始源代码（已创作）并更快地浏览它们。


<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Group files by Authored / Deployed", width="800", height="405" %}-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="已创作 / 已部署", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

<!-- Chromium bug: [1352488](https://crbug.com/1352488) -->
Chromium 议题: [1352488](https://crbug.com/1352488)


<!-- ## Improved stack traces {: #stack-traces } -->
## 改进堆栈痕迹 {: #stack-traces }

<!-- ### Linked stack traces for asynchronous operations  {: #async } -->
### 异步操作的链接堆栈痕迹 {: #async }

<!-- When some operations are scheduled to happen asynchronously, the stack traces in DevTools now tell the “full story” of the operation. Previously, it tells only part of the story. -->
当进行某些操作被安排为异步发生时，DevTools 中的堆栈跟踪现在可以讲述操作的“完整故事”。相对起以前，它只讲述了故事的一部分。

<!-- For example, open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. In our source code, the operation includes an async `timeout` operation. -->
例如，打开这个[演示](https://ng-devtools.netlify.app/)，点击增量按钮。展开**控制台**中的错误信息。在我们的源代码中，该操作包括一个异步`超时`操作。

```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

<!-- Previously, the stack trace only showed the timeout operation. It did not show the “root cause” of the operation.  -->
相对以前，堆栈跟踪只显示超时操作。它没有显示该操作的“根本原因”。

<!-- With the latest changes, DevTools now shows the operation originates from the `onClick` event in the button component, then the `increment` function, followed by the timeout operation. -->
随着最新的变化，DevTools 现在显示操作源于按钮组件中的 `onClick` 事件，然后是 `increment` 函数，接着是超时操作。

<!--{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="Linked stack traces for asynchronous operations", width="800", height="442" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="异步操作的链接堆栈跟踪", width="800", height="442" %}

<!-- Behind the scenes, DevTools introduced a new “Async Stack Tagging” feature. You can tell the whole story of the operation by linking both parts of the async code together with the new `console.createTask()` method. See [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) to learn more.  -->
在幕后，DevTools 引入了一个新的 "异步堆栈标签" 功能。您可以通过新的`console.createTask()`方法将异步代码的两部分联系在一起，来讲述操作的整个故事。参阅 [DevTools 中的现代调试](/blog/devtools-modern-web-debugging/#linked-stack-traces)以了解更多。

<!-- Does it sound complicated? Not at all. Most of the time, the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API, you don’t need to worry about it. (e.g. Angular implemented these [changes](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)) -->
这听起来很复杂吗？一点也不。大多数情况下，您所使用的框架会处理调度和异步执行。在这种情况下，要由框架来实现 API，您不需要担心这个问题。(例如 Angular 实现了这些[变化](https://chromium-review.googlesource.com/c/v8/v8/+/3776678))

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

<!-- Chromium bug: [1334585](https://crbug.com1334585) -->
Chromium 议题: [1334585](https://crbug.com1334585)


<!-- ### Automatically ignore known third-party scripts {: #auto-ignore } -->
### 自动忽略已知的第三方脚本 {: #auto-ignore }

<!-- Identify issues in your code quicker during debugging because DevTools now automatically adds known third-party scripts to the ignore list. -->
在调试过程中更快地识别代码中的问题，因为 DevTools 现在会自动将已知的第三方脚本添加到忽略列表中。

<!-- Open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. The stack trace shows only your code (e.g. `app.component.ts` `button.component.ts`). Click **Show more frames** to view the full stack trace. -->
打开这个[演示](https://ng-devtools.netlify.app/)，点击增量按钮。在 **Console** 中展开错误信息。堆栈跟踪只显示您的代码（例如：`app.component.ts` `button.component.ts`）。点击**显示更多的框架**来查看完整的堆栈跟踪。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Automatically ignore known third-party scripts in stack trace", width="800", height="425" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="自动忽略堆栈跟踪中的已知第三方脚本", width="800", height="425" %}

<!-- Previously, the stack trace included third-party scripts like `zone.js` and `core.mjs`. These are not your source code, they are generated by bundlers (e.g. webpack) or frameworks (e.g. Angular). It took a longer time to identify the root cause of an error.  -->
相对以前，堆栈跟踪包括第三方脚本，如`zone.js`和`core.mjs`。这些不是您的源代码，它们是由捆绑器（如 webpack）或框架（如 Angular）生成的。需要花费较长的时间来确定错误的根本原因。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Automatically ignore known third-party scripts in the stack trace", width="800", height="425" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="自动忽略堆栈跟踪中的已知第三方脚本", width="800", height="425" %}

<!-- Behind the scenes, DevTools ignores third-party scripts based on the new `x_google_ignoreList` property in source maps. Frameworks and bundlers need to supply this information. See [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).  -->
在幕后，DevTools 根据 source maps 中新的`x_google_ignoreList`属性来忽略第三方脚本。框架和捆绑器需要提供这一信息。参见[案例研究：用 DevTools 进行更好的 Angular 调试]（/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular）。

<!-- Optionally, if you prefer to always view full stack traces, you can disable the setting via **Settings** > **Ignore list** > **Automatically add known third-party scripts to ignore list**. -->
另外，如果您喜欢总是查看完整的堆栈跟踪，您可以通过**设置** > **忽略列表** > **自动添加已知的第三方脚本到忽略列表**来禁用该设置。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="Setting to automatically add known third-party scripts to ignore list", width="800", height="516" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="设置自动添加已知的第三方脚本忽略列表", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

<!-- Chromium bug: [1323199](https://crbug.com/1323199) -->
Chromium 议题: [1323199](https://crbug.com/1323199)


<!-- ## Improved call stack during debugging  {: #call-stack } -->
## 在调试过程中改进调用堆栈 {: #call-stack }

<!-- With the **Automatically add known third-party scripts to ignore list** setting, the call stack now shows only frames that are relevant to your code. -->
通过**自动添加已知的第三方脚本到忽略列表**设置，现在调用栈只显示与你的代码相关的堆栈帧。

<!-- Open this [demo](https://ng-devtools.netlify.app/) and set a breakpoint at the `increment()` function in `app.component.ts`. Click the increment button on the page to trigger the breakpoint. The call stack shows only frames from your code (e.g.  `app.component.ts` and `button.component.ts`).  -->
打开这个 [demo] (https://ng-devtools.netlify.app/)，在`app.component.ts`中的`increment()`函数处设置一个断点。点击页面上的increment按钮来触发断点。调用堆栈只显示您的代码中的框架（例如，`app.component.ts`和`button.component.ts`）。

<!-- To view all frames, enable **Show ignore-listed frames**. Previously, DevTools displayed all frames by default.  -->
要查看所有的框架，请启用**显示被忽略的堆栈帧**。对比以前，DevTools 默认显示所有堆栈帧。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="Improved call stack during debugging", width="800", height="601" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="调试期间改进的调用堆栈", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

<!-- Chromium bug: [1352488](https://crbug.com/1352488) -->
Chromium 议题: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed sources in the Sources panel {: #ignore-nav } -->
## 在来源面板中隐藏被忽略的来源 {: #ignore-nav }

<!-- Enable **hide ignore-listed sources** to hide irrelevant files in the **Navigation** pane. This way, you can focus only on your code. -->
启用**隐藏忽略列表中的来源**，在**导航**窗格中隐藏不相关的文件。这样，你就可以只关注你的代码。

<!-- Open this [demo](https://ng-devtools.netlify.app/). In the **Sources** panel. The `node_modules` and `webpack` are the third-party scripts. Click on the 3-dot menu and select **hide ignore-listed sources** to hide them from the pane. -->
打开这个[演示](https://ng-devtools.netlify.app/)。在**资源**面板上。`node_modules`和`webpack`是第三方脚本。点击3点菜单，选择 **hide ignore-listed sources**，将它们从窗格中隐藏。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Hiding ignore-listed sources in the Sources panel", width="800", height="449" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="面板中隐藏忽略列出的资源", width="800", height="449" %}


<!-- Chromium bug: [1352488](https://crbug.com/1352488) -->
Chromium 议题: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed files in the Command Menu {: #ignore-search } -->
## 在命令菜单中隐藏被忽略的文件 {: #ignore-search }

<!-- With the **hide ignore-listed sources** setting, you can find your file quicker with the [Command Menu](/docs/devtools/command-menu/). Previously, searching files in the **Command Menu** returns third-party files that might not be relevant to you. -->
通过 **hide ignore-listed sources** 设置，您可以使用 [Command Menu](/docs/devtools/command-menu/) 更快地找到您的文件。 在以前，**Command Menu** 中搜索文件会返回可能与您无关的第三方文件。

<!-- For example, enable the **hide ignore-listed sources** setting and click on the 3-dot menu. Select **Open file**. Type “ton” to search for button components. Previously, the results include files from `node_modules`, one of the `node_modules` files even shown up as the first result.  -->
例如，启用 **hide ignore-listed sources** 设置，并点击三点式菜单。选择**打开文件**。输入 “ton” 来搜索按钮组件。以前的情况，结果包括了来自`node_modules`的文件，其中一个`node_modules`的文件甚至显示为第一个结果。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="Hiding ignore-listed files in the Command Menu", width="800", height="425" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="在命令菜单中隐藏被忽略的文件", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

<!-- Chromium bug: [1336604](https://crbug.com/1336604) -->
Chromium 议题: [1336604](https://crbug.com/1336604)


<!-- ## New Interactions track in the Performance panel  {: #performance } -->
## 性能面板中的新互动轨道 {: #performance }

<!-- Use the new **Interactions** track in the **Performance** panel to visualize interactions and track down potential responsiveness issues.  -->
使用**性能**面板中新的**互动**轨道来可视化互动并追踪潜在的响应性问题。

<!-- For example, [start a performance recording](/docs/devtools/evaluate-performance/#record ) on this [demo page](https://coffee-cart.netlify.app/?ad=1). Click on a coffee and stop recording. Two interactions show in the **Interactions** track. Both interactions have the same IDs, indicating the interactions are triggered from the same user interaction. -->
例如，在这个[演示页](https://coffee-cart.netlify.app/?ad=1)上[开始表演录制](/docs/devtools/evaluate-performance/#record )。点击咖啡，停止录制。两个交互显示在**交互**轨道中。两个互动都有相同的 ID，表明这些互动是由同一个用户互动触发的。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="Interactions track in the Performance panel", width="800", height="489" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="性能面板中的交互跟踪", width="800", height="489" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

<!-- Chromium bug: [1347390](https://crbug.com/1347390) -->
Chromium 议题: [1347390](https://crbug.com/1347390)


<!-- ## LCP timings breakdown in the Performance Insights panel {: #insights } -->
## 性能洞察面板中的LCP时序分解 {: #insights }

<!-- The **Performance Insights** panel now shows the [timings breakdown](https://web.dev/optimize-lcp/#lcp-breakdown)  of the [Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Use these timings information to understand and identify an opportunity to improve LCP performance. -->
**性能洞察**面板现在显示了[时间表分类](web.dev/optimize-lcp/#lcp-breakdown)中的[Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint)。 并使用这些时间信息来了解和提高 LCP 性能的机会。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="LCP timings breakdown in the Performance Insights panel", width="800", height="523" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Performance Insights 面板中的 LCP 计时细分", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

<!-- Chromium bug: [1351735](https://crbug.com/1351735) -->
Chromium 议题: [1351735](https://crbug.com/1351735)


<!-- ## Auto-generate default name for recordings in the Recorder panel {: #recorder } -->
## 在 Recorder 面板中自动生成录音的默认名称 {: #recorder }

<!-- The **Recorder** panel now automatically generates a name for new recordings. -->
**Recorder** 面板将会自动为新录音生成一个名称。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Default name for recordings in the Recorder panel", width="800", height="565" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Recorder 面板中录音的默认名称", width="800", height="565" %}


{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

<!-- Chromium bug: [1351383](https://crbug.com/1351383) -->
Chromium 议题: [1351383](https://crbug.com/1351383)


<!-- ## Miscellaneous highlights {: #misc } -->
## 其他的更新 {: #misc }

<!-- - Previously, [Recorder extensions](/docs/devtools/recorder/reference/#extension-troubleshooting) don’t show up in the **Recorder** panel from time to time. ([1351416](https://crbug.com/1351416)) -->
- 之前，[Recorder 扩展] (/docs/devtools/recorder/reference/#extension-troubleshooting)不时会在 **Recorder** 面板上不被显示出来。
<!-- - The **Styles** pane now displays a color picker for the [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) element’s `stop-color` property. ([1351096](https://crbug.com/1351096)) -->
- **样式**边栏现在显示 [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) 元素的 `stop-color` 属性显示一个颜色选择器。([1351096](https://crbug.com/1351096))
<!-- - Identify script causing [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) as the potential root causes for layout shifts in the **Performance Insights** panel. ([1343019](https://crbug.com/1343019)) -->
- 在 **Performance Insights** 面板中，识别导致[布局](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)的脚本是布局转变的潜在根源。([1343019](https://crbug.com/1343019))
<!-- - Display critical path for LCP web fonts in the **Performance Insights** panel. ([1350390](https://crbug.com/1350390)) -->
- 在 **Performance Insights** 面板中显示 LCP 网页字体的关键路径。 ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
