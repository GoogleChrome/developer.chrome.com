---
layout: 'layouts/doc-post.njk'
title: 准备好了吗？
subhead: Privacy Sandbox API 的实现状态。
description: Privacy Sandbox API 的实现状态。最后更新时间为 2021 年 5 月 18 日。
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} 每个 API 可能有多个单独的源站试用期。{% endAside %}

## 归因报告

*以前称为转化衡量。*

- [当前源站试用](https://web.dev/origin-trials/)：现已从 Chrome 86 [扩展](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM)到 Chrome 93。
- [注册源站试用](/origintrials/#/view_trial/3411476717733150721)。
- [演示](https://goo.gle/demo-event-level-conversion-measurement-api)。
- [Chrome 平台状态](https://www.chromestatus.com/features/6412002824028160)。
- [Blink 状态](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement)。
- [GitHub](https://github.com/WICG/conversion-measurement-api/)：有关 API 问题和讨论，请参阅[议题](https://github.com/WICG/conversion-measurement-api/issues)。

### 状态：详细信息

请参阅[状态](/docs/privacy-sandbox/attribution-reporting-introduction/#status)。

### 所有资源

- [归因报告（转化衡量）](/docs/privacy-sandbox/attribution-reporting)
- [归因报告简介（转化衡量）](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API 技术说明](https://github.com/WICG/conversion-measurement-api/)
- （⚠️ 过时）[一种衡量广告转化的更私密方式](https://web.dev/conversion-measurement/)：此 API 第一次迭代的概述（面向网站开发者）
- （⚠️ 过时）[一种衡量广告转化的更私密方式 - 视频](https://www.youtube.com/watch?v=jcDfOoWwZcM)：此 API 第一次迭代的演示（仅限点击）
- （⚠️ 过时）[使用 Event Conversion Measurement API](https://web.dev/using-conversion-measurement/)：如何使用此 API 的第一次迭代进行实验（面向网站开发者）
- [深入了解隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)

## 信任令牌

- [当前源站试用](https://web.dev/origin-trials/)：现已从 Chrome 84 [扩展](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ)到 Chrome 94。
- [注册源站试用](/origintrials/#/view_trial/2479231594867458049)。
- [演示](https://trust-token-demo.glitch.me/)。
- [Chrome 平台状态](https://www.chromestatus.com/feature/5078049450098688)。
- [Blink 状态](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens)。
- [GitHub](https://github.com/WICG/trust-token-api)：有关 API 问题和讨论，请参阅[议题](https://github.com/WICG/trust-token-api/issues)。
- [Chrome DevTools 集成](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)。
- 发现更多：[信任令牌使用入门](https://web.dev/trust-tokens/)

## 第一方集

- [当前源站试用](https://web.dev/origin-trials/)：Chrome 89 到 93。
- [注册源站试用](/origintrials/#/view_trial/988540118207823873)。
- [Chrome 平台状态](https://chromestatus.com/feature/5640066519007232)。
- [Blink 状态](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets)。
- [API 提案](https://github.com/privacycg/first-party-sets)：有关 API 问题和讨论，请参阅[议题](hhttps://github.com/privacycg/first-party-sets/issues)。
- 发现更多：[Chromium 项目：第一方集](https://www.chromium.org/updates/first-party-sets)。

## FLoC

- 初始[源站试用](https://web.dev/origin-trials)现已关闭。请参阅 [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) 了解动态。
- 初始版本[演示](https://floc.glitch.me/)（源站试用现已关闭）。
- [Blink 状态](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)。
- 正在与 [WICG](https://github.com/WICG/floc) 和兴趣小组探讨 [API 提案](https://www.w3.org/community/wicg/)。
- [GitHub](https://github.com/WICG/floc)：有关 API 问题和讨论，请参阅[议题](https://github.com/WICG/floc/issues)。
- [Chrome 平台状态](https://www.chromestatus.com/features/5710139774468096)。
- 发现更多：[什么是 FLoC？](https://web.dev/floc/)

## FLEDGE

[TURTLEDOVE](https://github.com/WICG/turtledove) 的后代。

- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ)。
- [Blink 状态](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge)。
- 正在与 [WICG](https://www.w3.org/community/wicg/) 和兴趣小组探讨 [API 提案](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)。
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)：有关 API 问题和讨论，请参阅 [TURTLEDOVE 议题](https://github.com/WICG/turtledove/issues)。

<br>

---

## 发现更多

### Blink、Chromium 和 Chrome

- [Chrome 发布时间表](https://www.chromestatus.com/features/schedule)
- [在 Chromium 中推出新功能的流程](https://www.chromium.org/blink/launching-features)
- [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [Blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/)：Chromium 使用的呈现引擎 Blink 中的实现状态和功能讨论。
- [Chromium 代码搜索](https://source.chromium.org/)。

### 源站试用

- [Chrome 的源站试用入门](https://web.dev/origin-trials/)
- [什么是第三方源站试用？](https://web.dev/third-party-origin-trials)
- [Chrome 源站试用问题排查](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [面向网站开发者的源站试用指南](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [源站试用说明](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [运行源站试用](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
