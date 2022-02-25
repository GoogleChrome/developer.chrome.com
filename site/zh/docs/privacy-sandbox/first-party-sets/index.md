---
layout: 'layouts/doc-post.njk'
title: 第一方集
subhead: 允许由同一实体拥有和运营的相关域名声明属于同一个第一方。
description: 第一方集使同一实体拥有和运营的相关域名能够声明自己属于同一个第一方。
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## 实现状态

- [源站试用](https://web.dev/origin-trials/)：Chrome 89 到 93。
- [注册源站试用](/origintrials/#/view_trial/988540118207823873)。
- [Chrome 平台状态](https://chromestatus.com/feature/5640066519007232)。
- [Chromium 项目](https://www.chromium.org/updates/first-party-sets)。

## 为什么我们需要第一方集？

{% YouTube id='cNJ8mZ-J3F8' %}

网页由来自多个[来源](/docs/privacy-sandbox/glossary#origin)的内容组成。有些内容属于第一方，来自用户正在访问的顶级网站。其他内容可能来自第三方，例如广告、嵌入式媒体或共享资源，例如来自 [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) 的 JavaScript 库。第三方可能还希望通过使用 [Cookie](/docs/privacy-sandbox/glossary#origin) 等机制将不同网站的用户活动关联起来。

浏览器提出了在跨网站上下文中限制访问用户身份的隐私模型。但是，许多组织都拥有具有不同域名的相关网站，例如不同国家/地区的不同域（ `example.com` 和 `example.co.uk`）。应当可以允许具有适当关系（可能是共同所有权）的相关域名声明自己属于同一个第一方，这样在第一方和第三方被区别对待的情况下，浏览器可以将这些域视为第一方。

此外，任何解决方案还需要防止滥用系统。例如，不应为了获得第一方特权而声明组织包含具有不同所有者的不相关网站。

## 第一方集的运作方式

网站可以通过提供定义其与其他域的关系的清单文件（位于 `.well-known/first-party-set` 地址的 JSON 文件）来声明它是一组网络域的成员（或所有者）。

假设 `a.example`、`b.example` 和 `c.example` 希望构成一个由 `a.example` 拥有的第一方集。随后这些网站将提供以下资源：

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
	"owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
	"owner": "a.example"
}
```

所有者域托管一个清单文件，其中列出了其成员域。浏览器可以要求成员网站指定其所有者，然后检查所有者的清单来验证关系。

浏览器策略应防止滥用或误用。例如，第一方集不得允许在不相关的网站之间交换用户信息，或者将不属于同一实体的网站并为一组。网站注册的一种可能方式是网站将其提出的域组以及满足浏览器策略所需的信息提交给公共跟踪器（例如专用的 GitHub 仓库）。验证所有者对成员域的控制可能还需要在集中每个域上的 `.well-known` 网址下提供质询。

第一方集的补充提案是 `SameParty` Cookie 特性。在 Cookie 上指定 `SameParty` 特性会指示浏览器在其上下文与顶级上下文属于同一个第一方集时包含该 Cookie。

例如，对于上述的第一方集，a.example 可设置以下 Cookie：

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

这意味着当 b.example 或 c.example 上的访问者向 a.example 发出请求时，`session` Cookie 会包含在该请求中。

---

## 参与和分享反馈

- **源站试用**：注册并加入 [Chrome 源站试用](/origintrials/#/view_trial/988540118207823873)。
- **GitHub**：阅读[提案](https://github.com/privacycg/first-party-sets)、[提出问题并关注讨论](https://github.com/privacycg/first-party-sets/issues)。
- **开发者支持**：在 [Privacy Sandbox Developer Support 仓库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)中提出问题并加入讨论。

## 发现更多

- [第一方集技术说明](https://github.com/privacycg/first-party-sets)
- [Chrome 平台状态](https://chromestatus.com/feature/5640066519007232)。
- [Chromium 项目](https://www.chromium.org/updates/first-party-sets)。
