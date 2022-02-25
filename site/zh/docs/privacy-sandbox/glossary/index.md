---
layout: 'layouts/doc-post.njk'
title: 隐私沙盒词汇表
subhead: 隐私沙盒文章和文档假定读者对于隐私、广告和网站开发中的概念已有一定了解。本词汇表解释了关键术语。
description: 关键概念的简单解释。
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

{% Aside %}

如有任何遗漏之处，请[告诉我们！](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=)

{% endAside %}

## 广告平台 (Adtech) {: #adtech }

提供广告投放服务的公司。

## 广告客户 {: #advertiser }

为其产品付费投放广告的公司。

## 归因 {: #attribution }

识别能够促成结果的用户操作。例如：识别广告点击或观看与[转化](#conversion)的相关性。

## Blink {: #blink }

Chrome 使用的[呈现引擎](https://en.wikipedia.org/wiki/Browser_engine)，作为 [Chromium](#chromium) 项目的一部分开发。

## Chromium {: #chromium }

一项开源网络浏览器项目。Chrome、Microsoft Edge、Opera 等浏览器均基于 Chromium。

## 点击率 (CTR) {: #ctr }

点击并观看过广告的用户比例。（另请参阅[展示次数](#impression)。）

## 点击转化 (CTC) {: #ctc }

归因于广告"点击"的转化。

## 转化

基于用户操作而完成一些预期目标。例如，在点击广告以链接到广告客户的网站后，购买产品或注册简报。

## Cookie

网站可以要求网络浏览器在用户的计算机上存储一小段文本数据（称为 Cookie）。当用户在整个网络上浏览时，网站可以使用 Cookie 来保存有关用户的数据（或引用存储在网站后端服务器上的数据）。例如：即使用户未登录，在线商店也可以保留购物车详细信息，或者网站可以记录用户在其网站上的浏览活动。请参阅[第一方 Cookie](#first-party-cookie) 和[第三方 Cookie](#third-party-cookie)。

## 差分隐私 {: #differential-privacy }

此技术允许共享有关数据集的信息以揭示行为模式，而不会泄露有关个人隐私的信息或他们是否属于该数据集的信息。

## 域名

请参阅[顶级域名](#tld)和 [eTLD](#etld)。

## eTLD、eTLD+1 {: #etld }

**有效顶级域名**由[公共后缀列表](https://publicsuffix.org/list/)定义。例如：

```text
co.uk
github.io
glitch.me
```

有效 TLD 使 foo.appspot.com 成为与 bar.appspot.com 不同的网站。在此例中，有效顶级域名 (**eTLD**) 为 appspot.com，完整**网站**名称（foo.appspot.com、bar.appspot.com）被称为 **eTLD+1**。

另请参阅[顶级域名](#tld)。

## 熵

用于衡量一项数据能够多大程度揭示个人身份信息的指标。

数据熵以位为计量单位。数据揭示的身份信息越多，其熵值就越高。

数据可组合以识别个人，但可能会难以确定新的数据是否会增大熵值。例如，如果您已经知道某人来自袋鼠岛，那么知道其来自澳大利亚并不会增大熵值。

## 联合身份（也称为联合登录）

一种第三方平台，使用户能够登录网站而该网站无需实现自己的身份验证服务。

## "指纹"收集 {: #fingerprinting }

识别和跟踪个别用户行为的技术。"指纹"收集使用用户不会意识到且无法控制的机制。[Panopticlick](https://panopticlick.eff.org) 和 [amiunique.org](https://amiunique.org/) 等网站展示了如何结合"指纹"数据来识别您的个人身份。

## "指纹"收集图面 {: #fingerprinting-surface }

可用于（可能与其他图面结合用于）识别特定用户或设备的元素。例如，`navigator.userAgent()` JavaScript 方法和 `User-Agent` HTTP 请求标头提供了对"指纹"收集图面（用户代理字符串）的访问。

## 第一方 {: #first-party }

来自您所访问的网站的资源。例如，您所阅读的网页位于 developer.chrome.com 网站，其中包含从该网站请求的资源。对这些第一方资源的请求称为"第一方请求"，而您在浏览此网站时存储的来自 developer.chrome.com 的 [Cookie](#cookie) [称为第一方 Cookie](#first-party-cookie)。另请参阅[第三方](#third-party)。

## 第一方 Cookie {: #first-party-cookie }

当用户浏览网站时由网站存储的 [Cookie](#cookie)。例如：在线商店可能会要求浏览器存储 Cookie，以便为未登录的用户保留购物车详细信息。另请参阅[第三方 Cookie](#third-party-cookie)。

## 展示次数 {: #impression }

- 广告观看次数。（另请参阅[点击率](#ctr)。）
- 广告位：网页上可以显示广告的空白矩形。众多广告位可构成[广告资源](#inventory)。

## 广告资源 {: #inventory }

网站上可用的广告位：可以显示广告的空白矩形。

## K 匿名

用于衡量数据集中匿名程度的指标。如果您具备 *K* 匿名，则您无法与数据集中的 *K-1* 位其他个人区分开来。换言之，*K* 位个人拥有相同的信息（包括您在内）。

## 随机数

仅在加密通信中使用一次的任意数字。

## 来源

请求的来源，包含协议名称和服务器名称，但无路径信息。例如：`https://developer.chrome.com`

## 源站试用 {: #origin-trial }

源站试用可提供对新功能或实验性功能的访问，从而可以构建可供用户试用的功能，以在该功能面向所有用户发布之前的有限时间内进行试用。当 Chrome 针对某项功能提供源站试用时，可为试用注册一个[源站](#origin)，从而对该来源的所有用户启用该功能，而用户无需切换任何标志或切换到其他版本的 Chrome 浏览器（虽然他们可能需要升级）。源站试用使开发者能够构建使用新功能的演示和原型。试用还可以帮助 Chrome 工程师了解新功能的使用情况，以及它们与其他网站技术的交互情况。了解更多信息：[Chrome 源站试用入门](https://web.dev/origin-trials/)。

## 被动图面 {: #passive-surface }

无论网站请求与否，某些"指纹"收集图面（例如用户代理字符串、IP 地址和接受语言标头）都会提供给每个网站。这意味着被动图面很容易消耗网站的隐私预算。

隐私沙盒计划建议采用主动方式取代被动图面来获取特定信息，例如，使用一次客户端提示来获取用户的语言，而非为每个服务器的每个响应都设置接受语言标头。

## 发布商

在隐私沙盒这一背景下，发布商为显示广告的网站。

## 覆盖面

看到广告（或访问展示广告的网页）的总人数。

## 再营销

向正在浏览其他网站并曾访问过您的网站的用户发起营销。例如，在线商店可以向之前在其网站上查看过玩具的用户展示玩具销售广告。

## 网站

请参阅[顶级域名](#tld)和 [eTLD](#etld)。

## 图面

请参阅["指纹"收集图面](#fingerprinting-surface)和[被动图面](#passive-surface)。

## 第三方 {: #third-party }

来自不同于您所访问网站的域名的资源。例如，网站 foo.com 可能使用来自 google-analytics.com（通过 JavaScript）的分析代码、来自 use.typekit.net（通过链接元素）的字体和来自 vimeo.com 的视频（在 iframe 内）。另请参阅[第一方](#first-party)。

## 第三方 Cookie {: #third-party-cookie }

由第三方服务存储的 [Cookie](#cookie)。例如，视频网站可能会在其嵌入式播放器中包含 **Watch Later** 按钮，使用户能够将视频添加到他们的心愿单中，而无需强迫他们导航到视频网站。另请参阅[第一方 Cookie](#first-party-cookie)。

## 顶级域名 (TLD) {: #tld }

顶级域名（例如 .com 和 .org）列于[根区数据库](https://www.iana.org/domains/root/db)中。

请注意，某些"网站"实际上仅为子域名。例如，translate.google.com 和 maps.google.com 仅为 google.com 的子域名（即 [eTLD + 1](#etld)）。

## .well-known

通过标准化网址添加指向网站的重定向会非常实用。例如，如果网站通过 `/.well-known/change-password` 设置了重定向到该网站的更改密码页面，密码管理器就可以让用户能够更加方便地更新密码。此外，在发出请求*之前*访问有关主机的策略或其他信息也非常实用。例如，robots.txt 可以告知网页抓取工具访问哪些网页以及忽略哪些网页。IETF [RFC8615](https://tools.ietf.org/html/rfc8615) 概述了一种可在 /.well-known/ 子目录中的标准位置访问网站范围的元数据的标准化方式。您可以在 [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml) 中查看这些内容的列表。
