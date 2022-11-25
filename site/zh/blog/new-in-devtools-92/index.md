---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 92）"
authors:
  - jecelynyeen
date: 2021-06-02
updated: 2021-06-02
description:
  "CSS 网格编辑器、支持控制台中的 const 重声明、来源顺序查看器以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BnPX5Sm6bpsxg4Rv0hV8.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-92
---

*感谢 [韩昌浩 @hanselfmu](https://github.com/hanselfmu) 提供的翻译*。


<!-- lint disable no-smart-quotes -->
{% Partial 'devtools/banner.md' %}

{% YouTube id="2baY3JpCxpo" %}

## CSS 网格编辑器 {: #grid-editor }

我们新增入了大家期待已久的 CSS 网格编辑器。 您现在更方便地预览并编辑 CSS 网格！

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mV9Ac7QAD8vVPoiqmii6.png", alt="CSS 网格编辑器", width="800", height="486" %}

当您页面中的 HTML 元素有 `display: grid` 或 `display: inline-grid` 的 CSS 声明时, 您会在样式边栏中看到该声明旁边出现了一个图标。点击该图标打开或关闭 CSS 网格编辑器。CSS 网格编辑器里的图标让您预览可能的变化（例如 `justify-content: space-around`）。接着，您可以一键点击任何图标以编辑网格。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dbd631539c7eeac02ea68a37096ce3bc7d9487d9 #}

Chromium 议题: [1203241](https://crbug.com/1203241)


## 支持控制台中的 const 重声明 {: #const-redeclaration }

控制台现在也支持 const 重声明，在此之前，DevTools 只支持[`let` 和 `class` 的重声明](/blog/new-in-devtools-80/#redeclarations)。无法在控制台中重声明是开发者们常见的困扰，尤其是当您在试验新 JavaScript 代码的时候。

这项新功能允许开发者将代码复制粘贴进 DevTools 控制台，进行测试和调整。您现在可以无限重复这个过程，并且不需要刷新页面。在此之前，如果控制台中的代码重声明了一个 `const` 变量，DevTools 就会抛出一个语法错误。

请参见下面的示例。`const` 重声明的支持是**跨 REPL 脚本**的（参见变量 `a`）。按照设计，以下场景是不被支持的：

- 不允许在 REPL 脚本中重声明页面脚本的 `const` 变量
- 不允许在同一个 REPL 脚本中重声明 `const` （参见变量 `b`）

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tJCPlokvxw6OWyCAmocM.png", alt="const 重声明", width="800", height="496" %}

{# https://chromium.googlesource.com/v8/v8/+/0acdf36510e72d5dac5777d893e77716235b7c39 #}

Chromium 议题: [1076427](https://crbug.com/1076427)


## 来源顺序查看器 {: #source-order }

您现在可以在屏幕上查看元素的来源顺序，从而更好地检查无障碍功能。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2QoBtjGjFxgDAkKaO3y2.png", alt="来源顺序查看器", width="800", height="515" %}

对于搜索引擎优化和无障碍功能来说，一个 HTML 文档内容的顺序是十分重要的。然而一些新的 CSS 功能允许开发者创建展示顺序与来源顺序十分不同的内容。这对于屏幕阅读器用户来说是一个严重的无障碍功能问题，因为这会给这些用户带来与视觉用户不同的、很可能是令人困惑的体验。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f83e4b0190ed2dbc32feef6d8b0315279ad7d07 #}

Chromium 议题: [1094406](https://crbug.com/1094406)


## 查看 iframe 详细信息的新快捷方式 {: #frame-details }

右键点击**元素**面板中的 iframe 元素，选择**显示 iframe 详细信息**。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YdENg6wjsgPNyMODdOHC.png", alt="显示 iframe 详细信息", width="800", height="486" %}

这会打开**应用**面板中的 iframe 版面。您可以在此检查文档的详细信息、安全与隔离状态、权限策略等，从而调试潜在的问题。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hEsg9Mc95n7w2tPrv6KH.png", alt="iframe 详细信息展示", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/30ba780ff36307473aee2e2c959287ea8d0b3bd7 #}

Chromium 议题: [1192084](https://crbug.com/1192084)


## 优化跨域资源共享的调试支持 {: #cors }

从现在起，**问题**面板将会展示跨域资源共享（CORS）的错误。这些 CORS 的错误可能由多种原因造成。点击展开每一个问题即可了解潜在的原因及其解决方案。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UpiZQCNnlENB8ZluzeFt.png", alt="问题标签页的 CORS 问题", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ca000670d62477dfb0a6a83e038b6caecc1e322 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ad8fc07dbe879162b4cb65ca800a2c10e6a73fc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bec4aa4eb52f9cf75077d165d2ceba12ebf5ab95 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db2f1f97aa230de89ac5f80ec8e361f90d8efdd1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b9d0e036f6998109673be71a2dc76fb246c8de3b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1531610a58453da982acaa1d445c0e8952dbf004 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/541a6b4f7d3627296484d1483ef85e1d10a835f1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6b3a0affa984c37720361127a21ff7a936a8b820 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9149c7abd583c45cf0df83bf445c5b0ae7fa65b9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/80736dbaf8cb5f06215a5843f326a32ac7ca3a99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0404498fbfe3e99ba69a4e99f09715baceecd99d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eeb37658907bbc78b70f7712bb48f7a77d152663 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3aa8ba4983bd6cf65673c4c1908992e5ab81d6fc #}

Chromium 议题: [1141824](https://crbug.com/1141824)


## **网络**面板的更新 {: #network }

### 重命名 XHR 标签为 Fetch/XHR {: #fetch-xhr }

XHR 标签现被重命名为 **Fetch/XHR**。 这项更新可以让开发者更明确，该过滤项同时包含 [`XMLHttpRequest`](https://xhr.spec.whatwg.org/) 以及 [Fetch API](https://fetch.spec.whatwg.org/) 网络请求。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/I0QOVTO52JRpl0jJO6Zt.png", alt="Fetch/XHR 标签", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/274ace4270fd5c3004c6b594e1b009c545318e0e #}

Chromium 议题: [1201398](https://crbug.com/1201398)


### 在**网络**面板中过滤 Wasm 资源类型 {: #wasm }

您现在可以点击新的 **Wasm** 按钮来过滤 Wasm 网络请求。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vuTMcfCjDWFfVtDN6Dpf.png", alt="按 Wasm 过滤", width="800", height="515" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db3b40161aeb0856d33e0e4545b2b5bd8e79fb86 #}

Chromium 议题: [1103638](https://crbug.com/1103638)


### **网络状况**面板中设备的用户代理客户端提示 {: #sec-ua-ch }

**网络状况** 面板下的**用户代理**现已加入了[用户代理客户端提示（User agent client hints）](https://web.dev/user-agent-client-hints) 。

用户代理客户端提示是客户端提示 API （Client Hints API）的新扩展。在保护用户隐私的前提下，开发者们可以在利用这个 API ，有效地获取用户浏览器的信息。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iMlkTtV9OUdfujSWdHnR.png", alt="网络状况标签页中设备的用户代理客户端提示", width="800", height="532" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2b0c3b6c6e093649c35b6824004284ca4c2bd4a #}

Chromium 议题: [1174299](https://crbug.com/1174299)


## 在**问题**面板中报告怪异模式问题 {: #quirks-mode }

DevTools 现在会报告[怪异模式 （quirks mode）](https://quirks.spec.whatwg.org/)和[有限怪异模式](https://dom.spec.whatwg.org/#concept-document-limited-quirks)的问题了。

怪异模式和有限怪异模式是 Web 标准制定之前的传统浏览器模式。这些模式会模拟 Web 标准时代之前的页面布局行为，并常常会造成意外的视觉效果。

在调试布局问题的时候，开发者可能会认为这些问题都是由开发者编写的 CSS 或 HTML 造成的，而实际的问题则可能源于当前页面所在的浏览器模式。DevTools 为此提供了解决建议。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XqtqSZPa1S1YnmeIt0ee.png", alt="在问题标签页中报告怪异模式问题", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/79d5f4274f21bb78e2ce572d118c2bd5bf1cfa82 #}

Chromium 议题: [622660](https://crbug.com/622660)


## 在**性能**面板中添加"计算相交部分" {: #computed-intersections }

DevTools 现在会在火焰图中显示**计算相交部分**了。这项更新可以帮助您发现 [intersection observers](https://web.dev/intersectionobserver-v2/) 事件，并调试这些事件潜在的性能开销。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Nx3K0Lpst0lICGbtpzsW.png", alt="性能面板中的计算相交部分", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/03f91c46e7920e768eba5192b7f902e916b9cac3 #}

Chromium 议题: [1199137](https://crbug.com/1199137)


## Lighthouse 面板中的 Lighthouse 7.5 {: #lighthouse }

**Lighthouse** 面板现已运行 Lighthouse 7.5。现在针对已通过 CSS 定义了 `aspect-ratio` 的图片将不再展示"缺少明确的宽高"的警告。在此之前，Lighthouse 会对未定义宽高的图片展示此警告。

完整的更新列表请参见[发布版本通知](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.5.0)。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4cef9324af0e4560421beb138313458d5ae6fb0b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d17898e62fe19b9f47b25f1568b57fce951c6d10 #}

Chromium 议题: [772558](https://crbug.com/772558)


## 在"调用堆栈"边栏中弃用上下文菜单的 "Restart frame" 项 {: #restart-frame }

此 **Restart frame** 菜单项现已被弃用。该功能需要进一步的开发，现在它经常无法正常运作。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Alvnt4FkoEFoP0SkdKgi.png", alt="弃用 Restart frame 菜单项", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4494098b6840f608347c1edf3c048691056eada4 #}

Chromium 议题: [1203606](https://crbug.com/1203606)


## [实验阶段] 协议监视器 {: #protocol-monitor }

{% Aside %}

如想开启此项实验，请在**设置** > **实验**下选中**协议监视器**复选框。

{% endAside %}

Chrome DevTools 使用 [Chrome DevTools 协议 (CDP)](https://chromedevtools.github.io/devtools-protocol/) 来测量、检查、调试和配置 Chrome 浏览器。**协议监视器**可以让您查看 DevTools 发出的所有 CDP 请求及其响应。

以下两个新功能可以帮助 CDP 的测试：

- 新的**保存**按钮可以让您将已记录的消息以 JSON 文件的形式下载
- 一个可以让您直接发送原始 CDP 命令的新字段

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRVrHC9WEet7cwA7QAeV.png", alt="协议监视器", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/40fcb9a9aae81ac1df2c19dee467ab3a4cf4088b #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/006e20c4226a7b2e5fde4026191b1eaf05bf8b8e #}

Chromium 议题: [1204004](https://crbug.com/1204004), [1204466](https://crbug.com/1204466)


## [实验阶段] Puppeteer Recorder {: #puppeteer-recorder }

{% Aside %}

如想开启此项实验，请在**设置** > **实验**下选中**Recorder**复选框。

{% endAside %}

[Puppeteer Recorder](/blog/new-in-devtools-89/#record) 现在会根据您与浏览器的交互来生成一份操作步骤列表，而之前 DevTools 则会直接生成一份 Puppeteer 脚本。一个新的**导出**按钮可以让您将这些操作步骤以 Puppeteer 脚本的形式导出。

在记录了这些步骤之后，您可以用新的**重放**按钮来重新播放这些步骤。请参考[这里的指示](/blog/new-in-devtools-89/#record)来了解如何开始使用记录功能。

请注意，这是一项早期的实验功能。我们计划会在接下来的时间里改进并扩展 Recorder 的功能。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kh1Z4jcWxbO6rYCSoIPn.png", alt="Puppeteer Recorder", width="800", height="557" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b36b600405ef18131b89edf85cca816c955c1590 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a2ffe4a8d202e56d640c2f8744c905354e2bca8e #}

Chromium 议题: [1199787](https://crbug.com/1199787)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}