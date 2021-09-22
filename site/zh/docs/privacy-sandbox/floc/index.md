---
layout: 'layouts/doc-post.njk'
title: FLoC
subhead: 允许网站猜测您的兴趣，而不能对您进行唯一标识。
description: FLoC 能够以保护隐私的方式实现基于兴趣的广告投放。当用户在网络上浏览时，他们的浏览器会被分配到包含成千上万个具有类似浏览记录的其他浏览器的"兴趣同类群组"中。这是在不与浏览器供应商或其他任何人共享个人浏览记录的情况下完成的。
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## 实现状态

- 初始[源站试用](https://web.dev/origin-trials)现已关闭。
- 初始版本[演示](https://floc.glitch.me/)（源站试用现已关闭）。
- 在 [Blink](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) 中处于 [Intent to Prototype](https://www.chromium.org/blink)。

## 我们为什么需要 FLoC？

许多人都会对定制广告的隐私影响感到担忧，目前这些广告依赖于跟踪 Cookie 和设备"指纹"收集等技术，这些技术可以向广告客户或广告平台揭示您在各个网站中的浏览记录。FLoC 提案旨在实现以更加保护隐私的方式选择广告。

## 什么是 FLoC 提案？

FLoC 为基于兴趣选择广告和其他内容提供了一种隐私保护机制。

当用户在网络上浏览时，他们的浏览器会使用 FLoC 算法获知其"兴趣同类群组"，成千上万个具有类似最近浏览记录的其他浏览器会被分配到同一兴趣同类群组中。浏览器会定期在用户设备上重新计算其同类群组，而不会与浏览器供应商或其他任何人共享个人浏览记录。

广告客户（支付广告费用的网站）可以在自己的网站上包含代码，以收集同类群组数据并将其提供给他们的广告技术平台（提供软件和工具以投放广告的公司）。例如，广告技术平台可能会从一家在线鞋店了解到来自同类群组 1101 和 1354 的浏览器似乎对商店的登山装备感兴趣。广告技平台也会从其他广告客户那里获知这些同类群组的其他兴趣。

随后，当来自这些同类群组之一的浏览器访问展示广告的网站（例如新闻网站）中的网页时，广告平台可以使用这些数据来选择相关广告。

## FLoC 可以用来做些什么？

- 向浏览器属于经常访问广告客户网站或对相关主题表现出兴趣的同类群组的用户展示广告。
- 使用机器学习模型基于用户的同类群组来预测用户转化的概率，以便为广告竞价时的出价行为提供信息。
- 向用户推荐内容。例如，假设一个新闻网站观察到他们的体育播客网页在 1234 和 14159 同类群组的访问者中变得特别受欢迎，他们可以向来自这些同类群组的其他访问者推荐该内容。

## FLoC 的运作方式

[什么是 FLoC？](https://web.dev/floc/#how-does-floc-work)提供了有关 FloC 运作方式的简要分步说明。

下图显示了使用 FLoC 选择和投放相关广告时不同角色的示例。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", alt="图表显示使用 FLoC 选择和投放相关广告的各个步骤中的不同角色：FLoC 服务、浏览器、广告客户、发布商（观察同类群组）、广告技术平台、发布商（展示广告）", width="800", height="359" %}

---

## 参与并分享反馈

- GitHub：阅读提案、提出问题并关注讨论。
- **W3C**：在 [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) 中讨论行业用例。
- **开发者支持**：在 [Privacy Sandbox Developer Support 仓库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)中提问并加入讨论。

## 发现更多

- [什么是 FLoC？](https://www.web.dev)
- [FLoC API 技术说明](https://github.com/WICG/floc)
- [深入了解隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)
