---
layout: 'layouts/doc-post.njk'
title: 归因报告
subhead: 在不使用跨站标识符的情况下测量哪些用户操作（例如广告点击或广告浏览）带来了转化。
description: 归因报告 API 能够在不使用跨站标识符的情况下测量哪些用户操作（例如广告点击或广告浏览）带来了转化。
date: 2021-05-18
updated: 2021-08-24
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %}归因报告 API 之前被称为转化测量 API。{% endAside %}

## 实施状态

请参阅[状态](/docs/privacy-sandbox/attribution-reporting-introduction/#status)。

## 通用术语

{% Aside %}

您还可以查阅完整的[隐私沙盒通用术语](/docs/privacy-sandbox/glossary/)。

{% endAside %}

- **广告技术平台**：提供软件和工具从而使品牌或代理机构能够定位、交付和分析其数字广告的公司。
- **广告商**：为广告付费的公司。
- **发布商**：在其网站上展示广告的公司。
- **点击型转化**：归因于广告点击的转化。
- **浏览型转化**：归因于广告展示的转化（用户未与广告交互，而稍后又发生了转化）。

## 谁需要了解此 API：广告技术平台、广告商和发布商

- [需求方平台](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) 或[数据管理平台](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) 等广告技术平台可能会使用此 API 来支持当前依赖第三方 cookie 的功能。
- 依赖自定义代码进行广告或转化测量的广告商和发布商可以使用此 API 来替换现有技术。
- 依赖广告技术平台进行转化测量的广告商和发布商不需要直接使用 API，但如果他们正在使用可能集成 API 的广告技术平台，则可能有兴趣了解此 API。

{% Aside %}可能会存在一些非广告用例。[参与](#engage)并分享您的用例！ {% endAside %}

## 为什么需要这个 API？ {: #why-is-this-api-needed }

如今，广告转化测量通常依赖于[第三方 cookie](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies)。但是浏览器正在限制获取这些第三方 cookie，因为这些 cookie 可用于跨站跟踪用户并妨碍用户隐私。该 API 以保护隐私的方式实现这些测量，且无需第三方 cookie。

## 归因报告 API 的运作方式是怎样的？都有哪些功能？

{% Aside %}该 API 正在进行公开孵化和开发，因此可能会发生变化。我们欢迎您提出反馈意见。请参阅[如何参与](#engage)。{% endAside %}

归因报告 API 可以测量两个联系在一起的事件：发布商网站上的事件（例如用户浏览或点击广告）与随后在广告商网站上发生的转化。

该 API 支持点击型转化归因测量（在 API 的第一次实现中即可使用，该 API 目前处于[原始试验](https://web.dev/conversion-measurement/#browser-support)阶段）和浏览型归因测量（[请参阅公开详细说明](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md)）。

该 API 提供两种类型的归因报告，可用于不同的用例：

- **事件级报告**将特定的广告点击或广告浏览（广告方）与转化方数据相关联。为了防止对用户身份进行跨站合并，从而保护用户隐私，转化方的数据非常有限，并且包含了"噪声"（即会针对一小部分比例的情况发送随机数据）。我们还施加了额外的隐私保护措施，不会立即发送报告。
- **聚合报告**不与广告方的具体事件相关联。与事件级报告相比，聚合报告能够提供更丰富、更保真的转化数据。涵盖密码学、信任分布和差分隐私的隐私技术结合有助于降低跨站身份合并的风险。两种报告类型可以同时使用并且是互补的。此 API 中的其他功能设计包括[跨设备归因报告](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)和[应用程序到网络归因报告](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)。

## 参与并分享反馈 {: #engage }

- **原始试验**：[注册第一代原始试验（仅支持点击型转化）](/origintrials/#/view_trial/3411476717733150721)或[查看第一个演示（仅支持点击型转化）](https://goo.gle/demo-event-level-conversion-measurement-api)。
- 请加入[开发者邮件列表](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)，进而继续关注该 API 的下一次实现，该实现将提供更多功能并将在 Chrome 中投入实验（原始试验）。
- **GitHub**：阅读[提案](https://github.com/WICG/conversion-measurement-api/)、[提出问题并关注讨论](https://github.com/WICG/conversion-measurement-api/issues)。
- **W3C**：在[改善网络广告业务组](https://www.w3.org/community/web-adv/participants)中讨论行业用例，也可以加入[隐私社区组](https://www.w3.org/community/privacycg/)，参与围绕 WebKit/Safari API 的讨论。
- **开发者支持**：提出问题并加入关于[隐私沙盒开发者支持存储区](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)的讨论。

## 了解更多

- [归因报告介绍（转化测量）](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API 技术详细说明](https://github.com/WICG/conversion-measurement-api/)
- （⚠️ 已过时）[一种测量广告转化更私密的方式](https://web.dev/conversion-measurement/)：此 API 第一次迭代的概述（面向网络开发者）
- （⚠️ 过时）[一种衡量广告转化的更私密方式 - 视频](https://www.youtube.com/watch?v=jcDfOoWwZcM)：此 API 第一次迭代的演示（仅限点击）
- （⚠️ 已过时）[使用事件转化测量 API](https://web.dev/using-conversion-measurement/)：如何使用此 API 的第一次迭代进行实验（面向网络开发者）
- [深入挖掘隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)
- [使用 Chrome DevTools 调试 API](/blog/new-in-devtools-93/#attribution-reporting)
