---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 93）"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "可编辑的 CSS 容器查询（container queries），web bundle 预览，更好地处理控制台里面的字符串以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcT2bC9fEzrOLuVMOBlf.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

<!-- lint disable no-smart-quotes -->

*感谢[流浪大法师](https://webfrontend.dev/)提供的翻译。*

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## 样式窗格（Styles pane）可编辑 CSS 容器查询（container queries） {: #container-queries }
现在，您可以在**样式**窗格（Styles pane）那里查看以及编辑 [CSS 容器查询（container queries）](https://web.dev/new-responsive/#responsive-to-the-container)。

容器查询的出现，给响应式设计提供更多的动态解决方案。虽`@container` @规则的工作方式与媒体查询（`@media`）类似，然而 `@container` 查询的对象是满足一定条件的祖先容器节点，而不是查询视口以及 user agent 信息。

在**元素**面板那里，点击带有 `@container` @规则的 DOM 元素。**样式**窗格现在将显示 `@container` 信息。您可以点击该信息，以编辑容器尺寸。**样式**窗格那里同时也会显示相对应的容器信息。把鼠标悬停上去，可以高亮页面中对应的容器元素以及检查容器的真实尺寸。点击可以选中该容器元素。

容器查询特性现还处于实验阶段。测试该特性之前，请在 `chrome://flags` 那里打开 `#enable-container-queries` 开关。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="样式窗格（Styles pane）可编辑 CSS 容器查询（container queries）", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Chromium 议题: [1146422](https://crbug.com/1146422)


## 网络面板可预览 Web bundle {: #web-bundle }
[Web bundle](https://web.dev/web-bundles/) 是一种新兴的文件格式，用于封装一个或多个 HTTP 资源。现在，您可以在**网络**面板那里预览 web bundle 的网络请求。

web bundle 特性现还处于实验阶段。测试该特性之前，请在 `chrome://flags` 那里打开 `#enable-experimental-web-platform-features` 开关。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="预览 Web bundle", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Chromium 议题: [1182537](https://crbug.com/1182537)


## Attribution Reporting API 调试 {: #attribution-reporting }
现在，Attribution Reporting API 错误会显示在**问题**标签页那里。

[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/)是一个新的 API，旨在帮助您在没有使用跨站标识符的情况下，评估用户行为（比如点击或者查看广告）所导致的转化率。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="显示在问题标签页里的 Attribution Reporting API 错误信息", width="800", height="501" %}

Chromium 议题: [1190735](https://crbug.com/1190735)


## 更好地处理控制台里面的字符串 {: #string }
**控制台**里面的新右键菜单允许您复制任何字符串，作为文本内容、JavaScript 字面量或者 JSON 字面量。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="控制台里面的新右键菜单", width="800", height="477" %}

在 Chrome 90，**控制台**默认将[输出字符串格式化为 JSON 字面量](/blog/new-in-devtools-90/#double-quotes)。我们从开发者那里得到反馈：这个改动对开发者造成困扰，一些人觉得字符串的转义有点多，不利于字符串的可读性。

现在，**控制台**默认将输出字符串格式化为有效的 JavaScript 字面量，并且会进一步提供 3 种复制字符串的选项。**复制字符串作为 JavaScript 字面量**的这个选项，会转义那些合适且特殊的字符，然后会根据字符串内容来决定是否使用单引号、双引号或者反引号来包裹字符串。**复制字符串内容**的这个选项呢，会一字不差地将原生的字符串内容（包括换行符以及其它的特殊字符）复制到剪切板。最后，**复制字符串作为 JSON 字面量**的这个选项，会将字符串格式化为有效的 JSON 字面量，然后复制到剪切板。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Chromium 议题: [1208389](https://crbug.com/1208389)


## 改善 CORS 调试体验 {: #cors }
**控制台**里面的 CORS 相关错误，现在可以链接到**网络**面板和**问题**标签页。

点击 CORS 相关错误信息旁边的两个新按钮以查看网络请求，以及进一步理清楚该错误信息，在**问题**标签页那里获取潜在的解决方案。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="CORS 错误信息旁边的图标", width="800", height="485" %}

Chromium 议题: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }
现在，**Lighthouse** 面板运行的是 Lighthouse 8.1。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

如果您的网站有使用 source maps，在 **Lighthouse** 报告里将显示 **View Treemap** 按钮。点击该按钮查看您网页所有的 JavaScript 的拆解情况，检测 JavaScript 的体积以及载入时 JavaScript 的覆盖情况。

这个报告也引入一个新的指标过滤条件（参考上述截图里面的 **Show audits relevant to** 过滤条件）。选择一个指标，以便于获取信息以及相关诊断，从而达到改善该指标的目的。

针对评分的部分，**Performance Category** 做了很多调整，方便与其它的性能工具保持一致以及更好地反映出 web 的现况。

想看完整的变更列表，请翻阅[发布记录](https://github.com/GoogleChrome/lighthouse/releases) 。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Chromium 议题: [772558](https://crbug.com/772558)


## 在 Manifest 窗格展示新的 note 链接 {: #new-note-url }
现在，Manifest 窗格可以显示[新的 note 链接](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking)。

目前，那些有声明 "new-note" 能力 的 ChromeOS (CrOS)、Chrome 以及安卓（Android）的应用 ，可以会在设备的Stylus设定中被选为 note-taking 应用（前提是 CrOS 设备已经在使用 stylus）。当被选为 note-taking 应用，用户可以通过 stylus palette 上的 "创建 Note" 按钮来启动 APP 。我们在应用的 manifest 文件里面添加 `new-note-url` 字段，是为了将相同功能给移植到 web 应用。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="Manifest 窗格里的新 note 链接", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Chromium 议题: [1185678](https://crbug.com/1185678)


## 修复 CSS 选择器匹配问题 {: #matching-selectors }
DevTools 修复了 CSS 选择器匹配的问题，该功能在上个版本里面有问题。

在**样式**窗格里面，逗号分隔的选择器会以不同的颜色呈现，这取决于该选择器是否匹配到选中的 DOM 节点：

- 未匹配的选择器部分用浅灰色
- 匹配的选择器部分用黑色

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="CSS 选择器匹配", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Chromium 议题: [1219153](https://crbug.com/1219153)


## 网络面板支持格式化 JSON 响应 {: #pretty-print-json }
现在，您可以在**网络**面板里面格式化 JSON 响应。

在**网络**面板里面，打开一个 JSON 响应，点击 `{}` 图标以便于格式化该 JSON 响应。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt="格式化 JSON 响应", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Chromium bug: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
