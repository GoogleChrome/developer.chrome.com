---
layout: 'layouts/doc-post.njk'
title: 信任令牌
subhead: 信任令牌是一种新的 API，可帮助打击欺诈并将机器人与真人区分开来，无需被动跟踪。
description: Trust Tokens API 能够从一个上下文向另一个上下文传达对用户的信任，而无需识别用户身份或在两个上下文之间关联身份。API 使来源能够向其信任的用户发放加密令牌。令牌由用户的浏览器存储。然后，浏览器可以在其他上下文中使用令牌来评估用户的真实性。
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## 实现状态

- [源站试用](https://web.dev/origin-trials/)：Chrome 84 到 94。
- [注册试用](/origintrials/#/view_trial/2479231594867458049)。
- [演示](https://trust-token-demo.glitch.me/)。
- [Chrome DevTools 集成](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)。
- [Chrome 平台状态](https://www.chromestatus.com/feature/5078049450098688)。

## 什么是信任令牌？

{% YouTube id='bXB1Iwq6Eq4' %}

信任令牌可使对用户真实性的信任能够从一个上下文传达到另一个上下文，以帮助网站打击欺诈并将机器人与真人区分开来，无需被动跟踪。

- **颁发者**网站可以向展示自己可信的用户的网络浏览器颁发令牌，持续使用帐号、完成交易或获得可接受的[人机识别分数](https://developers.google.com/recaptcha)等可以展示用户可信。
- **赎回者**网站可以通过检查用户是否拥有由赎回者所信任的颁发者颁发的令牌来确认其是否为虚假用户，然后在必要时赎回令牌。

信任令牌是加密的，因此无法识别个人身份或连接受信任和不受信任的实例以发现用户身份信息。

{% Aside 'caution' %} 信任令牌不能替代人机识别或其他用于确定用户身份真实与否的机制。

信任令牌是一种**传达**对用户的信任的方式，而非**建立**对用户的信任。{% endAside %}

## 为什么我们需要信任令牌？

网站需要建立和传达信任信号的方式，以表明用户身份的真实性，避免机器人伪装成人类或者恶意第三方对真实用户或服务实施欺诈。欺诈保护对于广告客户、广告提供商和 [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) 尤为重要。

不巧的是，许多现有的可信度衡量和传播机制（例如确定与网站的交互是否来自真人）都利用了也可用于"指纹"收集的技术。用于传达信任的机制必须能够保护隐私，在无需跟踪用户的情况下跨网站传播信任。

借助 Trust Tokens API，网站可以向其信任的用户颁发加密令牌，随后可在其他位置使用。令牌由用户的浏览器安全地存储，然后可以在其他上下文中赎回以确认用户的真实性。这样即可将一个网站（例如社交媒体网站或电子邮件服务）的用户信任信息传达到另一个网站（例如发布商或在线商店），而无需识别用户身份或跨网站链接身份。

{% Aside 'key-term' %} ["指纹"收集](https://w3c.github.io/fingerprinting-guidance/#passive)使网站能够通过获取有关其设备、操作系统和浏览器设置（例如语言偏好设置、 [用户代理](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent)和可用字体）或设备状态变更的数据来识别和跟踪个别用户。这可以通过检查请求标头在服务器上完成，也可以使用 JavaScript 在客户端上完成。

"指纹"收集使用用户不会意识到且无法控制的机制。[Panopticlick](https://panopticlick.eff.org/) 和 [amiunique.org](https://amiunique.org/) 等网站展示了如何结合"指纹"数据来识别您的个人身份。{% endAside %}

## 信任令牌的运作方式

在此示例中，发布商网站希望在展示广告之前检查用户是否为真人，而非机器人。

1. 用户访问网站（称为**颁发者**）并执行能够使网站相信用户为真人的操作，例如购买、使用电子邮件帐号或成功完成人机识别。
2. 颁发者网站使用 Trust Tokens JavaScript API 触发为用户的浏览器请求信任令牌。
3. 颁发者网站以令牌数据进行响应。
4. 用户的浏览器安全地存储信任令牌的数据。
5. 用户访问其他网站（例如新闻发布商），该网站想要验证用户是否为真人（例如，在展示广告时）。
6. 该网站使用 Trust Tokens API 来检查用户的浏览器是否针对该网站信任的颁发者存储了信任令牌。
7. 为用户之前访问过的颁发者找到信任令牌。
8. 发布商网站向颁发者发出赎回信任令牌的请求。
9. 颁发者网站以赎回记录进行响应。
10. 发布商网站向广告平台发出请求，其中包含赎回记录以表明颁发者信任的用户为真人。
11. 广告平台提供展示广告所需的数据。
12. 发布商网站展示广告。
13. 计为一次广告观看展示。

{% Aside %} 有关此示例中 JavaScript 调用的更多详细信息，请参阅[示例 API 用法](https://web.dev/trust-tokens/#sample-api-usage)。{% endAside %}

---

## 参与并分享反馈

- **源站试用**：注册并参加 [Chrome 源站试用](/origintrials/#/view_trial/2479231594867458049)。
- **演示**：尝试信任令牌的[颁发和赎回](https://trust-token-demo.glitch.me/)。
- **GitHub**：阅读[提案](https://github.com/WICG/trust-token-api)、[提出问题并关注讨论](https://github.com/WICG/trust-token-api/issues)。
- **W3C**：在 [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) 中讨论行业用例。
- **IETF**：在 IETF [Privacy Pass 工作小组](https://datatracker.ietf.org/wg/privacypass/about/)中提供针对底层协议的技术意见。
- **开发者支持**：在 [Privacy Sandbox Developer Support 仓库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)中提问并加入讨论。

## 发现更多

- [Trust Token API 技术说明](https://github.com/dvorak42/trust-token-api)
- [信任令牌入门](https://web.dev/trust-tokens/)：面向网站开发者的概述
- [Chrome 的源站试用入门](https://web.dev/origin-trials)
- [深入了解隐私沙盒](https://web.dev/digging-into-the-privacy-sandbox)
