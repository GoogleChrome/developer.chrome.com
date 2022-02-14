---
layout: 'layouts/doc-post.njk'
title: 'Topics API'
subhead: >
  Enable interest-based advertising, without having to resort to tracking the sites a user visits.
description: >
 A proposal for a mechanism to enable interest-based advertising without having to resort to tracking the sites a user visits.
date: 2022-02-14
updated: 2022-02-14
authors:
  - samdutton
---

## 实现状态

本文档简要介绍了一种针对用户兴趣投放广告的新提案：Topics API。

-  [Topics API
   提案](https://github.com/jkarlin/topics)已进入[公开讨论](https://github.com/jkarlin/topics/issues)阶段。
-  此提案需要您的反馈。如果您要分享意见，请在 [Topics 解释器代码库](https://github.com/jkarlin/topics)中创建问题，或者在 [Improving
   Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)
   中参与讨论。解释器中有很多仍需要进一步定义的[开放性问题](https://github.com/jkarlin/topics/issues)。
-  此 API 尚未在任何浏览器中实现。
-  [Privacy Sandbox 时间表](http://privacysandbox.com/timeline)提供了 Topics API 及其他 Privacy Sandbox
   提案的实现时间。

## 为什么需要此 API？

Topics API 是一种 [Privacy Sandbox](/docs/privacy-sandbox/overview/)
提案，旨在提供一种机制来实现针对用户兴趣投放广告的功能，而无需跟踪用户访问的网站。    

{% Aside %}

**针对用户兴趣投放广告 (IBA)** 是一种个性化广告形式，即系统会根据用户兴趣（从用户最近访问过的网站推断出）选择为他们投放的广告。这与内容相关广告不同，后者旨在匹配用户正在访问的网页上的内容。  
IBA 可以帮助广告主覆盖潜在客户，并为那些无法单纯通过内容相关广告靠其网站访问量轻松获利的网站提供资金支持。IBA 还可以为当前网页提供背景信息，有助于为访问者找到合适的广告。  

{% endAside %}

Topics API 提出了一种方法，让系统可以根据用户的近期浏览活动提供他们当前可能感兴趣的主题。这些主题可以作为背景信息的补充，帮助选择合适的广告。  
Topics API 有三项主要任务：

-  将网站主机名映射到感兴趣的主题。例如，瑜伽网站可能会被归类为与"健身"相关。
-  根据用户的近期浏览活动计算他们最感兴趣的热门主题。
-  提供 JavaScript API 来提供用户当前感兴趣的主题，以帮助选择适当的广告。

Topics API 基于易于识别的概要主题而构建，因此有助于实现稳健的用户控制。Chrome 计划为用户提供移除各个主题的选项，以及向用户显示浏览器中存储的主题。

## 系统会如何挑选和选择主题？

系统会从[分类](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)中选择主题。分类是一个项目列表，例如"乡村音乐"、"化妆用品"或"素食菜肴"。这些主题最初是由
Chrome 精心挑选出来的，以便进行测试，但我们的目标是将主题分类变成由可信的生态系统贡献者维护的资源。分类需要提供一组数量不多（目前提议的数量约为 350
个，但根据我们的预期，最终的主题数应为几百到几千个不等）的主题，以便很多浏览器都将与每个主题相关联。为避免敏感类别，这些主题必须公开、经过人工挑选，并且及时更新。Chrome
最初提议用于测试的分类已经过人工挑选，[排除了通常被视为敏感的类别](#sensitive-topics)，例如种族或性取向。
  
Topics API
提议使用[机器学习](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)根据主机名推断主题。为此，分类器模型最初会由浏览器供应商或受信任的第三方进行训练，采用人工挑选的主机名和主题。该模型将随浏览器一起分发，因此将公开开发并免费提供。然后，用户设备上的浏览器可以根据用户近期访问过的网站的[主机名](https://web.dev/same-site-same-origin/#origin)，使用该模型计算用户最感兴趣的热门主题。  
下图概述了一个经过简化的示例，展示了 Topics API 如何帮助广告技术平台选择适当的广告。此示例假定用户的浏览器已有可将网站主机名映射到主题的模型。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

Topics API
生命周期：[查看大图](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Topics API 是如何运作的？

{% Aside %}

Topics API
提案处于[初始讨论阶段](/docs/privacy-sandbox/cds21-update/#discussion)，旨在收集生态系统中的反馈意见并据此采取行动。
该 API 的设计并非最终版本，以下详情会随着讨论的推进而发生变化。  

{% endAside %}

帮助实现针对用户兴趣投放广告的功能的机制（例如 Topics API）必须确保它提供的感兴趣主题始终是最新的。  

{: #epoch}

借助 Topics API 提案，浏览器会根据用户在某个时间段（称为_周期_，目前提议为 1
周）内的浏览活动来推断他们感兴趣的主题。系统会从用户在每个周期内最感兴趣的前五个热门主题中随机挑选一个主题，作为该时间段的主题。为了进一步加强隐私保护并确保所有主题都有代表性，从相应分类所有可能的主题中随机选择一个主题的概率为
5%。  
Topics JavaScript API
包含一种方法：`document.browsingTopics()`。此方法会按随机顺序返回一个最多包含三个主题的数组，最近的三个周期中的每个周期各对应一个主题。
Topics 解释器提议，`document.browsingTopics()` 所返回数组中的每个主题对象都具有以下三个属性：

-  `id：`分类中相应主题的 ID
-  `taxonomyVersion：`浏览器当前使用的一组主题
-  `classifierVersion：`用于根据主机名推断网站主题的机器学习分类器  

{% Aside %}

目前，Topics API 的设计正作为[解释器](https://github.com/jkarlin/topics)接受讨论，解释器只是标准化流程的第一步。此 API 尚未最终确定。  
随着我们采纳生态系统反馈并对该 API 反复改进，本文中所述的参数和该 API 的详细信息（例如分类大小、每周计算的主题数以及每次调用返回的主题数）随时可能会发生变化。

{% endAside %}

{: #observed-topics}

### API 调用方仅接收它们观察到的主题

Topics API 的设计目标是实现针对用户兴趣投放广告的功能，同时不会将信息分享给目前使用第三方 Cookie 涉及的实体之外的更多实体。Topics API
提议，只能针对在有限时间内已观察到主题的 API 调用方返回这些主题。  
{: #caller}  

{% Aside %}
Topics API **调用方**是_调用_ `document.browsingTopics()` JavaScript 方法的实体，并且会使用由该方法返回的主题来帮助选择相关广告。
通常，可以从来自第三方（例如广告技术平台）的网站中包含的代码调用
`document.browsingTopics()`。浏览器会根据当前文档所在的网站确定调用方。因此，如果您是相应网页上的第三方，请务必从您的网站拥有的 iframe 中调用该 API。  
为了让 `document.browsingTopics()` 返回一个或多个主题，必须在与观察到这些主题的网站上的代码位于同一来源的代码中调用该方法。

{% endAside %}

如果 API 调用方在 Topics API 已映射到某个用户感兴趣的主题的网站上所含的代码中调用了 `document.browsingTopics()`
方法，就称此调用方_观察到_该主题。例如：

1. Topics API 将主机名 `knitting.example` 映射到包含"织物与纺织艺术品"的主题。
1. `adtech.example` 中的代码包含在 `knitting.example` 上的网页中。
1. 某用户访问 `knitting.example`。
1. `adtech.example` 代码调用 `document.browsingTopics()。`
1. 浏览器为 knitting.example 推断出的主题之一是"织物与纺织艺术品"。
1. 也就是说，`adtech.example` 观察到用户感兴趣的主题为"织物与纺织艺术品"。

Topics API 的 `document.browsingTopics()`
方法只会提供调用方在最近三个[周期](#epoch)中观察到的主题。这样有助于阻止系统将用户相关信息分享给
Topics API 所取代的技术（包括第三方 Cookie）涉及的实体之外的更多实体。  
`document.browsingTopics()` 返回的主题数取决于
[API 调用方](#caller)之前观察到的主题数，以及用户的可用主题数（例如累积数据的周数）。可以返回的主题数介于
0 和 3 之间。

### Topics JavaScript API 可能是什么样的？

下面的代码提供了一个基本的 API 可能使用情况示例（为简单起见，我们不提供任何错误处理方法）。  

{% Aside %}

提供此代码段只是为了显示 Topics JavaScript API 的可能样式。API 设计随时可能更改，此代码目前无法在任何浏览器中使用！  

{% endAside %}

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

### Topics API 如何确定哪些调用方可以看到哪个主题？

API 调用方仅会接收最近观察到的主题，而用户感兴趣的主题在每个周期刷新一次。这意味着，该 API 会提供一个滚动窗口，在该时段内，给定调用方可以接收特定主题。  
下表概述了某用户在一个周期内的虚构浏览记录（但因数量较少而不切实际）示例，显示与用户访问过的网站相关的主题，以及每个网站上存在的 API
[调用方](#caller)（在该网站上所含的
JavaScript 代码中调用 `document.browsingTopics()` 的实体）。

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>网站</strong></th>
<th style="text-align: left;"><strong>主题</strong></th>
<th style="text-align: left;"><strong>网站上的 API 调用方</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>yoga.example</td>
<td>健身</td>
<td>adtech1.example adtech2.example</td>
</tr>
<tr>
<td>knitting.example</td>
<td>手工艺品</td>
<td>adtech1.example</td>
</tr>
<tr>
<td>hiking-holiday.example</td>
<td>健身、<br>
旅行与交通</td>
<td>adtech2.example</td>
</tr>
<tr>
<td>diy-clothing.example</td>
<td>手工艺品、时尚与潮流</td>
<td>[无]</td>
</tr>
</tbody>
</table>

该周期结束时（目前建议为一周），Topics API 会生成浏览器在这周内的热门主题。

-  adtech1.example 现在符合接收"健身"和"手工艺品"主题的条件，因为它在 yoga.example 和 knitting.example 上观察到这些主题。
-  adtech1.example 不符合针对该用户接收"旅行与交通"主题的条件，因为它未出现在用户最近访问的与该主题相关的任何网站上。
-  adtech2.example 看到了"健身"和"旅行与交通"主题，但没有看到"手工艺品"主题。

该用户访问了 diy-clothing.example，其中包含"时尚"主题，但该网站并未调用 Topics API。这意味着，此时该 API 不会针对任何调用方返回"时尚"主题。  
在第二周，该用户访问了另一个网站：

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>网站</strong></th>
<th style="text-align: left;"><strong>主题</strong></th>
<th style="text-align: left;"><strong>网站上的 API 调用方</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>sewing.example</td>
<td>手工艺品</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

此外，系统会将 adtech2.example 中的代码添加到 diy-clothing.example 中：

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>网站</strong></th>
<th style="text-align: left;"><strong>主题</strong></th>
<th style="text-align: left;"><strong>网站上的 API 调用方</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>diy-clothing.example</td>
<td>手工艺品、时尚与潮流</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

这意味着，除了第 1 周的"健身"和"旅行与交通"外，adtech2.example 现在还能收到"手工艺品"和"时尚与潮流"主题，但直到下一个周期（第 3
周）才能收到。这样可确保第三方能够了解到的用户过往详情（在本例中，是对时尚感兴趣）不会比通过 Cookie 了解到的多。  
又过了两周，如果该用户未访问包含 adtech2.example 中的代码且涵盖这些主题的任何网站，那么"健身"和"旅行与交通"可能会从 adtech2.example
的符合条件的主题列表中删除。

### Topics API 如何为网站推断主题？

Topics API
解释器提议，主题派生自将网站[主机名](https://web.dev/same-site-same-origin/#origin)映射至零个或更多个主题的[分类器模型](https://github.com/jkarlin/topics#:~:text=classifier)。  
分析其他信息（例如完整网址或网页内容）可能有助于投放更具相关性的广告，但也可能会降低隐私保护。  
用于将主机名映射到主题的分类器模型是公开的，并且解释器提议：应该可以通过浏览器开发者工具查看网站的主题。映射模型会定期更新，更新频率仍在考虑中。

### 用户最感兴趣的前五个热门主题是如何选择的？

该 API 会为每个周期返回一个主题，最多返回三个。如果返回了三个，其中会包含当前周期和之前两个周期的主题。

1. 在每个周期结束时，浏览器会整理出一个包含满足以下条件的网页的列表：
   1. 用户在周期内访问了该网页。
   1. 该网页包含调用 `document.browsingTopics()` 的代码
   1. 该 API
      已启用（例如，未被用户禁止或未通过[响应标头](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)禁止）。

1. 用户设备上的浏览器使用 Topics API 提供的分类器模型将每个网页的主机名映射到主题列表。
1. 浏览器累积主题列表。
1. 浏览器按频率生成最热门的前五个主题的列表。

然后，`document.browsingTopics()` 方法从每个周期的前五个热门主题中返回一个随机主题，并且从主题的完整分类中随机选择其中任一个主题的概率为 5%。  
在 Chrome 中，用户也可以移除各个主题，或清除其浏览记录，以减少该 API 返回的主题数。用户也可以选择停用该
API：请参阅[用户选择停用](#opt-out)。

## Topics API 如何解决 FLoC 方面的疑虑？

2021 年推出的 [FLoC](https://github.com/WICG/floc) 源试用获得了广告技术和网络生态系统贡献者提供的各种反馈。具体而言，有人担心 FLoC
同类群组可能会被用作识别用户身份的数字"指纹"收集途径，或者可能会揭示用户与敏感类别的关联。还有人要求让 FLoC 变得更加透明且更易于用户理解。  
Topics API 在设计时充分参考了这些反馈，以探索以其他方式支持针对用户兴趣投放广告，不仅提高了透明度，增强了隐私保护，还能以不同的方法处理敏感类别。

### 减少数字"指纹"收集

Topics API 提议了多种机制，以帮助确保仅使用 Topics API 难以跨网站重新识别大量用户：

-  主题分类提供了一组粗略的主题（第一个分类总共有大约 350
   个主题），这意味着每个主题可能会拥有大量用户（具体取决于指定浏览器拥有的用户总数）。事实上，每个主题的用户数下限都有保证，因为所返回主题有 5% 的概率是随机的。
-  系统会从用户最感兴趣的前 5 个热门主题中随机返回主题。
-  系统提供随机主题（选自整套主题）的概率为 5%。
-  如果用户经常访问同一网站（例如，每周访问一次），那么该网站上运行的代码每周最多只能学习一个新主题。
-  不同的网站将在同一周期收到同一用户的不同主题。对某用户而言，系统在一个网站上返回的主题与在另一个网站上返回的主题匹配的概率只有五分之一。因此，系统更难以确定他们是否为同一用户。
-  系统为用户更新主题的频率是每周一次，这限制了信息的共享频率。
-  系统仅会针对[之前观察到某个主题](#observed-topics)的
   API 调用方为同一用户返回这个主题。此模型有助于降低实体了解（或分享）它们尚未观察到的用户兴趣相关信息的可能性。

{: #sensitive-topics}

### 敏感主题

Topics [分类](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)将是公开的，并会经过人工挑选，以避免敏感类别。  
此外，网站和用户都可以[选择停用](#opt-out) Topics
API。

{% Aside %}

Topics 提案解释器这样描述："第三方 Cookie 可用于跟踪与用户有关的任何信息，包括他们访问过的确切网址和这些网页上的精确网页内容。其中可包含无限敏感内容。另一方面，Topics API 仅限于经过人工挑选的主题分类。但这并不是说，其他信息在统计学上不会与该分类中的主题相关。这是可能会发生的。但在比较这两者时，Topics 似乎比 Cookie 具有明显的改进。"

{% endAside %}


### 用户控制和透明度

用户应该能够理解 Topics API 的用途，了解系统对自己的描述，知道该 API 何时正在使用中，并获得可启用或停用该 API 的控件。  
该 API 提供人类可读的分类，方便用户了解和控制浏览器可能会为他们建议的主题。他们可以移除不希望看到广告的主题，系统也可以提供相应的用户体验，让用户了解该 API 以及如何启用或停用它。Chrome
会在 chrome://settings/privacySandbox 上提供 Topics API 的相关信息和设置。此外，API
调用方无法在无痕模式下获得主题，当浏览记录被清除后，这些主题也会一并清除。

{: #opt-out}


### 网站选择停用

只有所含代码会调用 Topics API 的网站才会纳入符合主题频率计算条件的浏览记录中，并且 API
调用方[仅会接收它们观察到的主题](#observed-topics)。也就是说，如果网站或内嵌服务没有执行调用该
API 的操作，该网站就不符合主题频率计算条件。  
Topics 解释器还提议，网站可以通过以下
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)
标头阻止计算与其访问者相关的主题：  

```text  
Permissions-Policy: browsing-topics=()
````

{% Aside %}

FLOC 中的现行 Permissions-Policy `interest-cohort=()` 也会禁止计算主题。

{% endAside %}

### 用户选择停用

Topics API 解释器[提议](https://github.com/jkarlin/topics#:~:text=empty)，在以下情况下，所返回的主题列表将为空：

-  用户通过 chrome://settings/privacySandbox 上的浏览器设置选择停用 Topics API。
-  用户清除了其主题（通过 chrome://settings/privacySandbox 上的浏览器设置）或[清除了其
   Cookie](https://support.google.com/accounts/answer/32050)。
-  浏览器处于无痕模式。

解释器[详细介绍了隐私目标](https://github.com/jkarlin/topics#:~:text=privacy%20goals)以及该 API 如何努力实现这些目标。

---

## 互动和分享反馈

-  **GitHub**：阅读[提案解释器](https://github.com/jkarlin/topics)中的内容，并在[提案代码库上的"问题"标签页](https://github.com/jkarlin/topics/issues)中提出问题和关注讨论。
-  **W3C**：在 [Improving Web Advertising Business
   Group](https://www.w3.org/community/web-adv/participants) 中讨论行业用例。
-  **Topics API 公告：**在 [groups.google.com/a/chromium.org/g/topics-api-annnounce](https://groups.google.com/a/chromium.org/g/topics-api-annnounce)
   上加入或查看邮寄名单
-  **Privacy Sandbox 开发者支持**：在   
   [Privacy Sandbox 开发者支持代码库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)中提问和参与讨论。

## 了解详情

-  [Topics API 技术解释器](https://github.com/jkarlin/topics)
-  [深入了解 Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)  
  
