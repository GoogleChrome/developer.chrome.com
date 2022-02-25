---
layout: 'layouts/doc-post.njk'
title: FLEDGE
subhead: 一种适用于再营销用例的解决方案，旨在防止第三方将其用于跟踪用户跨网站的浏览行为。
description: FLEDGE 能够满足再营销用例的需求，设计上可以防止第三方将其用于跟踪用户跨网站的浏览行为。API 允许浏览器进行设备端"竞价"，以选择用户之前访问过的网站所提供的相关广告。
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## 实现状态

- 正在与 [WICG](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) 和兴趣小组探讨 [API 提案](https://www.w3.org/community/wicg/)。
- 在 [Blink](https://www.chromium.org/blink) 中处于 [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)。

{% Aside %}
FLEDGE 是 [TURTLEDOVE](https://github.com/WICG/turtledove) 的衍生技术。
{% endAside %}

## 为什么我们需要 FLEDGE？

了解用户兴趣便可为其投放相关性更高的广告，而不仅仅是根据网站内容选择广告（内容相关广告定位）或使用用户提供给显示广告的网站的信息（第一方数据定位）。就传统技术而言，广告平台会通过跟踪用户跨网站的行为来了解用户的兴趣。我们需要一种无需跨网站跟踪即可向用户展示相关广告的方式。

FLEDGE 能够满足[再营销](/privacy-sandbox/glossary/#remarketing)用例的需求，设计上可以防止第三方将其用于跟踪用户跨网站的浏览行为。API 允许浏览器进行设备端"竞价"，以选择用户之前访问过的网站所提供的相关广告。

借助 FLEDGE：

- 用户的浏览器（而非广告客户或广告技术平台）可以存储与用户浏览器相关联的由广告客户定义的兴趣类别。
- 用户的浏览器可以将兴趣类别数据与广告买方/卖方数据和业务逻辑结合起来，从而进行"竞价"以选择广告。此广告竞价在用户设备上本地进行，而不会与第三方共享数据。
- 可以针对兴趣类别选择广告，但广告客户不能将兴趣类别数据与有关用户的其他信息（特别是个人身份信息或其访问的页面信息）结合起来。广告客户无法获知用户在发布商网站上查看了哪些网页。
- 网站以及这些网站使用的广告联盟无法获知访问者的广告兴趣或兴趣类别：广告选择在用户浏览器上完成。

换言之，FLEDGE 可以对您的兴趣和浏览活动予以保密。例如，如果您访问了一家在线鞋店并表现出对跑鞋感兴趣，随后访问了展示广告的新闻网站（发布商），则广告客户（鞋店）不会获知您正在查看新闻网站的哪些网页，发布商（新闻网站）不会获知您对跑鞋感兴趣。

## FLEDGE 的运作方式

当用户访问希望发布自身产品或服务广告的网站（广告客户）中的网页时，该网站可以要求用户的浏览器将用户与特定的兴趣类别关联一段时间（例如 30 天）。

兴趣类别对于广告客户的网站可能是唯一的，因此可将其用作再营销列表。或者，多个网站也可以同意将用户分配到同一个兴趣类别（例如在网站具有合作伙伴关系或属于同一广告联盟的情况下）。用户的浏览器会定期提取为兴趣类别指定的广告，以及有关与兴趣类别相关联的广告何时有资格在设备端竞价中出价（例如仅针对广告资源内位于网页顶部附近的广告；此信息由广告客户提供指令）的代码。当用户所访问的发布商网站配置为使用 FLEDGE API 接受广告并显示来自用户之前访问过的广告客户网站所用广告联盟的广告时，网页中的广告联盟代码会向浏览器发出请求以运行"竞价"代码，从而选择广告。随后即可显示"获胜"广告。

1. 用户访问希望发布自身产品广告的网站的网页，例如在线商店。
2. 广告客户网站（或其使用的广告技术平台）通过调用 joinAdInterestGroup() 来请求用户的浏览器加入广告"兴趣类别"，传递包括与用户浏览相关的广告、广告平台主机名和访问出价逻辑和出价信号的网址在内的数据。
3. 用户访问显示广告并配置为接受使用 FLEDGE 选择的广告的网站（例如新闻发布商）。
4. 用户的浏览器运行"竞价"以选择广告，用于可以接受 FLEDGE 所选广告的广告资源（广告位）。此竞价中的"卖方"可能是网站本身或代其行事的第三方，例如供应方平台。"买方"为出价竞拍网站广告资源的第三方，例如代表广告客户行事的需求方平台。此广告竞价中的卖方有三个工作：<br> • 选择哪些买方可以参与。<br> • 根据每个出价的价格和元数据选择最理想的出价。<br> • 报告竞价结果。<br>
5. 卖方通过调用 runAdAuction() 启动广告竞价，数据包括卖方的主机名、买方和卖方的信号以及竞价决策逻辑的网址。
6. 竞价会返回有关获胜广告的数据。发布商网站无法访问这些数据，除非在 Fenced Frame 中呈现广告。
7. 广告将得以显示。

---

## 参与并分享反馈

- **GitHub**：阅读[提案](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)、[提出问题并关注讨论](https://github.com/WICG/turtledove/issues)。
- **W3C**：在 [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) 中讨论行业用例。
- **开发者支持**：在 [Privacy Sandbox Developer Support 仓库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)中提问并加入讨论。

## 发现更多

- [FLEDGE API 技术说明](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [深入了解隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)
