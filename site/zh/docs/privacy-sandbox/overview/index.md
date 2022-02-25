---
layout: layouts/doc-post.njk
title: 什么是隐私沙盒？
subhead: 隐私沙盒是一系列在无需第三方 cookie 或其他跟踪机制的情况下满足跨站用例的提案。
description: "隐私沙盒的内容、使用方式及其用途。"
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## 我们为什么需要隐私沙盒？

隐私沙盒计划有两个核心目标：

- 开发替代解决方案，用于支持无需跨网站跟踪用户并可避免用户不知情跨网站跟踪的网站用例和业务模型。
- 当新的解决方案就绪时，逐步停止对第三方 Cookie 的支持。

## 什么是隐私沙盒提案？

迄今为止，Chrome 和其他生态系统相关方已经提出了 30 多项提案，可在 [W3C 小组的公共资源](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)中找到。这些提案涵盖了各种各样的用例和要求。

Chrome 团队开发的主要提案如下。

### 相关内容和广告

- [**FLoC**](/docs/privacy-sandbox/floc)：以保护隐私的方式基于兴趣选择广告和内容："相关广告"。
- [**FLEDGE**](/docs/privacy-sandbox/fledge)：以再营销为目的选择广告。[TURTLEDOVE](https://github.com/WICG/turtledove) 的衍生技术。

### 衡量和归因

- [**归因报告**](/docs/privacy-sandbox/attribution-reporting)：关联点击广告或观看广告与转化之间的关系。以前称为 Event Conversion Measurement API。支持两种类型的报告：事件级和汇总。

### 第一方保护

- [**SameSite Cookie 变更**](https://web.dev/samesite-cookies-explained/)：通过显式标记您的跨网站 Cookie 来保护网站。
- [**第一方集**](/docs/privacy-sandbox/first-party-sets)：使同一实体拥有的相关域名能够声明自己属于同一个第一方。

### 欺诈检测

- [**信任令牌**](/docs/privacy-sandbox/trust-tokens)：从一个上下文向另一个上下文传达对用户的信任，以帮助打击欺诈并区分机器人与人类。

### 限制数据收集

- [**隐私预算**](https://www.youtube.com/watch?v=0STgfjSA6T8)：允许网站获取有关用户浏览器或设备的信息，但浏览器可以对网站可访问的信息总量设置配额，从而无法识别用户身份。
- [**用户代理客户端提示**](https://web.dev/user-agent-client-hints/)：[用户代理](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) (UA) 字符串是一个重要的被动["指纹"收集](https://w3c.github.io/fingerprinting-guidance/#passive)图面，并且难以处理。客户端提示使开发者能够主动请求其确切需要的用户设备或条件相关信息，而不需要从用户代理字符串中解析这些数据。
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness)：限制通过访问个人用户 IP 地址来识别个人用户身份的能力。提案包含两部分：[<strong data-md="">Willful IP Blindness</strong>](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) 为网站提供了一种使浏览器知晓其并未将 IP 地址与用户相联系的方式；以及 [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) 允许用户组通过同一个私有化服务器发送其流量，从而有效地对网站主机隐藏其 IP 地址。Gnatcatcher 还可确保需要出于合法目的（例如防止滥用）而访问 IP 地址的网站可以在获得认证和审核的情况下予以访问。

### 身份

- [**WebID**](https://github.com/WICG/WebID)：支持联合身份（用户可以通过第三方服务登录网站）而不与第三方服务或网站共享用户的电子邮件地址或其他身份识别信息，除非用户明确同意共享。WebID 支持在无需使用可用于跨网站识别和跟踪用户的重定向、弹出窗口或第三方 Cookie 的情况下使用联合登录。

## 谁在从事隐私沙盒方面的工作？

截至 2021 年初，包括：

- Chrome 和其他团队提供了超过 30 项隐私沙盒提案。
- 超过 400 名参与者加入了 W3C 小组献计献策，包括 [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) 和 [Privacy Community Group](https://www.w3.org/community/privacycg/participants)。
- 有五项 API 实现可用于 Chrome 内测试。

## API 何时实现？

本网站的[实现状态](/docs/privacy-sandbox/status/)页面提供了各个 API 的进度更新。

---

## 参与并分享反馈

- **GitHub**：在 GitHub 上阅读提案的说明，并在说明的"Issues"标签页中提问或评论。<br> [说明链接](#explainers)如下。
- **W3C**：人们可以在 W3C [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/)、[Privacy Community Group](https://www.w3.org/community/privacycg/participants) 以及 [Web Incubator Community Group](https://github.com/WICG) 中讨论用例并分享行业反馈。
- **开发者支持**：在 <a href="https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support">Privacy Sandbox Developer Support 仓库</a>中提问并加入讨论。

## 发现更多

### 隐私沙盒提案说明 {: #explainers }

API 提案说明需要反馈，特别是在缺少的用例和如何以更加保护隐私的方式实现其目标方面提供建议。您可以在每个说明的"Issues"标签页中发表评论或提问。

- [隐私预算](https://github.com/bslassey/privacy-budget)
- [信任令牌](https://github.com/dvorak42/trust-token-api)
- [第一方集](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
- [归因报告](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### 面向网站开发者的文章和视频

- [深入了解隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)
- [SameSite Cookie 说明](https://web.dev/samesite-cookies-explained/)
- [信任令牌使用入门](https://web.dev/trust-tokens)
- [一种更私密的广告转化衡量方式](https://web.dev/conversion-measurement/)
- [什么是 FLoC？](https://web.dev/floc/)
- [隐私预算简介](https://www.youtube.com/watch?v=0STgfjSA6T8)

### 提案背后的原则和概念

- [网站的潜在隐私模型](https://github.com/michaelkleber/privacy-model)阐述了 API 的核心原则。
- [隐私沙盒](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- 隐私沙盒概述：[构建更私密的网站](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Google AI 博客：[联合学习：无需集中训练数据的协作式机器学习](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [第三方 Cookie 的未来](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
