---
layout: 'layouts/doc-post.njk'
title: 归因报告介绍（转化测量）
subhead: 有助于了解归因报告 API 的介绍和关键概念。
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}该 API 是一个提案，会随着时间的推移而持续扩展。本篇博文描述了该 API 的当前状态，并将随着 API 的发展而持续更新。{% endAside %}

更新：

- 2021 年初：将聚合报告和浏览型测量添加到提案中。
- 2021 年初：API 更名为"归因报告 API"。

{% Aside 'caution' %}

- 虽然本篇文章侧重于广告用例，但归因报告 API 也可以用于非广告用例。
- 该 API 的广告用例侧重于将广告点击或广告浏览与转化（转化测量）进行关联。 {% endAside %}

## 介绍

归因报告 API 可以测量哪些**广告点击或广告查看**在广告商的网站上带来了**转化**（例如销售或注册）。该 API 不依赖第三方 cookie 或可用于跨站识别个人用户的机制。

该提案正在进行公开孵化。提案和讨论都在 [WICG GitHub 存储库](https://github.com/WICG/conversion-measurement-api)中。

{% Aside %}该 API 是隐私沙盒的一部分，这是一系列满足第三方用例的提案，且无需使用第三方 cookie 或其他跨站跟踪机制。请参阅[隐私沙盒提案](https://developers.chrome.com/docs/privacy-sandbox)。{% endAside %}

## 为什么需要这个 API？

如今，广告转化测量通常依赖于[第三方 cookie](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies)。但是浏览器正在限制获取这些第三方 cookie，因为这些 cookie 可用于跨站跟踪用户并妨碍用户隐私。该 API 以保护隐私的方式实现这些测量，且无需第三方 cookie。

## 谁需要了解此 API？

- [需求方平台](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) 或[数据管理平台](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) 等广告技术平台可能会使用此 API 来支持当前依赖第三方 cookie 的功能。
- 依赖自定义代码进行广告或转化测量的广告商和发布商可以使用此 API 来替换现有技术。
- 依赖广告技术平台进行转化测量的广告商和发布商不需要直接使用 API，但如果他们正在使用可能集成 API 的广告技术平台，则可能有兴趣了解此 API。

## 使用 Chrome DevTools 调试 API 错误

[从 Chrome 93 开始可用](/blog/new-in-devtools-93/#attribution-reporting)。归因报告 API 错误现在会在[开发者工具](/docs/devtools)的[问题标签](/docs/devtools/issues/)下进行汇报。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="问题标签下的归因报告 API 错误", width="800", height="501" %}

## 参与

{% Aside %}**我们需要您的参与！**此 API 会需要为各种转化测量和优化用例提供支持。为了确保针对支持这些用例的解决方案展开公开讨论，生态系统的输入至关重要。{% endAside %}

若想参与其中，您可以加入讨论并试用该 API。同时采取这两种做法最为理想，但无论您是否试用过 API，都欢迎您加入讨论。

### 加入讨论

- [参加每两周一次的会议](https://github.com/WICG/conversion-measurement-api/issues/80)（隔周举办一次）。在这些电话会议中，参与者会讨论 API 设计提案以及 API 预期能够对各种测量用例提供的支持。您可以随时为下一次会议的议程[添加议题](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit)。欢迎大家参与这些讨论（需确保[加入WICG](https://www.w3.org/community/wicg/)）。
- 通过[开立一个问题](https://github.com/WICG/conversion-measurement-api/issues/new)来提出问题、功能建议或讨论用例。如果您不确定如何表述您的问题，请参阅[此问题](https://github.com/WICG/conversion-measurement-api/issues/147)和[此问题](https://github.com/WICG/conversion-measurement-api/issues/68)等示例。您还可以加入围绕[现存问题](https://github.com/WICG/conversion-measurement-api/issues)的对话。

### 试用 API

{% Aside 'caution' %}

如果您正在 Chrome 中对此 API 进行实验，您将可以使用**当前**已实现的所有功能。Chrome 原始试验中还未实现[存储库](https://github.com/WICG/conversion-measurement-api/)和[会议](https://github.com/WICG/conversion-measurement-api/issues/80)中所讨论的全部功能。请前往[状态](#status)部分查看当前功能状态。目前的实验功能也是 API 最终能够支持的功能的一个子集，并且可能会随着 API 在开放环境中的孵化和生态系统反馈的收集而发生变化。

{% endAside %}

#### 在本地或使用演示进行实验

1. 要在您的浏览器中本地启用 API，请打开标志`#enable-experimental-web-platform-features`。Chrome 标志是一个切换开关，能够告诉您的浏览器启用某些实验性功能。如需打开该标志，请在 Chrome 的搜索栏中粘贴`chrome://flags/#enable-experimental-web-platform-features`并点击**启用** 。
2. 在本地运行[演示](#demo)（或尝试[实时演示](#demo)）。
3. [复刻演示代码](#demo)并对其进行自定义，或者从头开始构建您自己的演示。

#### 在已部署的网站上对最终用户进行实验

1. 通过注册[原始试验](/blog/origin-trials/)（如果可用）为最终用户启用 API。原始试验让您能够使用实验性功能并构建可以在有限时间内试用的功能。请注意，[第三方原始试验](/blog/third-party-origin-trials/)使广告服务和测量提供商等第三方行为者可以跨多个站点对 API 进行测试。**如需查看此 API 当前可用的原始试验，请前往[状态](#status)部分**。如需了解未来原始试验的相关信息，请加入[归因报告开发者邮件列表](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)。

2. 将 API 集成到您的网站和系统中。

{% Aside %}如果您有执行方面的问题，请加入[归因报告开发者邮件列表](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)进行询问。

如果您对于您的用例有相关的一般技术问题，可以考虑在[隐私沙盒开发支持存储库](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)上开立一个问题。{% endAside %}

## 演示

您可以尝试一些可用演示。

- 事件级报告，仅限点击型转化：

    - [实时演示](https://goo.gle/sppi-devrel-eventlevel)。
    - 该演示的[源代码](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting)，您可以根据需要[进行复刻和自定义](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize)。

## 用例和功能

{% Aside %}

该 API 是一个进展中的项目，将根据生态系统的反馈和输入随时间的推移而不断发展。

此 API 目前支持的所有功能都是提案。**每一项提案都欢迎讨论及反馈**，包括那些已经准备好初始浏览器实现的提案。

该 API 正在进行公开孵化和开发。请[考虑参与](#participate)讨论。

{% endAside %}

此 API 使网站能够在下列情况下测量转化：

- 广告**点击**和广告**浏览**。
- **第三方** iframe 中的广告，例如使用第三方广告技术提供商的发布商网站上的广告。
- **第一方**上下文中的广告，例如社交网络或搜索引擎结果页面上的广告，或者发布商投放自己的广告。

该 API 支持灵活的**归因模型**。请参阅[状态](#status)了解详情。

此 API 可以通过两种类型的报告获取不同类型的有用信息，这些报告可发送给广告商或第三方广告技术提供商。这两种报告是互补的，因此您可以选择同时使用。

**事件级报告**会将广告点击或广告浏览与粗略的转化数据联系起来。

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png", alt="事件级报告", width="400", height="180" %}<figcaption>事件级报告示例：在<code>news.example</code>上的点击 ID 200400600（附加到<code>news.example</code>上的用户 ID Bob_Doe）促成了<code>shop.example</code>上的一次购买。</figcaption></figure>

事件级报告适用于：

- **优化**用例。事件级报告有助于为诸如*"我该如何提高投资回报率？"*等问题提供解答。具体来说，该报告可用于优化广告展示位置，因为报告中可以提供广告方的唯一 ID。事件级报告可以为机器学习模型提供训练数据。
- **粗略报告**用例（需要的转化相关信息非常少）。当前的限制是点击转化数据为 3 位（意味着可以将一次转化分配到八个类别之一），而浏览转化数据为 1 位。因此，事件级报告不支持对转化端的粒度数据（例如特定价格或转化时间）进行编码。
- **欺诈检测**用例。某些报告中的数据能够使您了解可用于识别垃圾信息或无效活动的模式，因此可以用于广告欺诈检测和分析。

而**聚合报告**提供了更详细的转化数据，并且可以更灵活地将点击/浏览数据和转化数据联系起来。

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="聚合报告", width="400", height="180"%}<figcaption>聚合报告提供的有用信息示例：<code>news.example</code>上的 CampaignID 1234567 在<code>shoes.example</code>上促成了 518 次转化，总消费金额为 38174 美元。其中一半的转化来自美国纽约市的用户。</figcaption></figure>

聚合报告最适用于**报告**用例。这些报告有助于为诸如*"我该如何提高投资回报率？"*等问题提供解答。<br>将聚合报告用于**优化**用例（例如，优化购买价值，由于转化数据过于粗略，事件级报告不支持这项功能）还是一个活跃的研究领域。请参阅[开放性问题](#open-questions)。

{% Details %} {% DetailsSummary 'h3' %}为什么需要两种类型的报告？ {% endDetailsSummary %}

为保护用户隐私，事件级报告仅提供粗略的转化数据。

但这些粗略的数据可能不足以测量广告活动的有效性。营销人员会需要了解有关转化的详细信息，例如购买价值、转化用户的广告方人口统计聚合数据、所购买产品的类别、转化用户是新客户还是老客户、购物车的内容等等。

我们因此设计了聚合报告。 {% endDetails %}

该 API 中提出的其他功能包括[应用程序到网络归因](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)（查看或点击应用程序中的广告，然后在网络上进行转化）和[跨设备归因](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)（在移动端查看或点击广告，然后在桌面端进行转化）。

{% Aside %}将来不再使用第三方 cookie 时，该 API 将与其他隐私保护广告 API 相结合，从而覆盖端到端用例：

- 再营销：参见 [FLEDGE](/docs/privacy-sandbox/fledge/)
- 基于兴趣的广告选择：参见 [FLoC](/docs/privacy-sandbox/floc/)

{% endAside %}

## 状态

**🕙  最后更新时间：2021 年 8 月**

状态：

- `🤿 Under exploration`：该想法处于早期讨论阶段。
- `🥚 Proposal`：初步设计已准备就绪，正在公开孵化。
- `🏗️ Under development (BROWSER_NAME)`：该功能正在 BROWSER_NAME 中进行实现。
- `🧪 Experiment (BROWSER_NAME)`：BROWSER_NAME 有可用的实验。Chrome 中将实验称为原始试验。
- `🚀 Stable (BROWSER_NAME)` ：BROWSER_NAME 中已默认提供该功能。

{% Aside %} [当前原始试验](/origintrials/#/view_trial/3411476717733150721)（Chrome 实验 🧪）{% endAside %}

{% Aside 'caution' %}我们将运行多个原始试验（实验）。每轮运行情况将用来根据生态系统反馈对 API 进行改进和调整。{% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">提案</th>
    <th style="text-align: left;">状态</th>
</tr></thead>
<tbody>
    <tr>
    <td>点击型事件级报告<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">详细说明</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>浏览型事件级报告<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">详细说明</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>点击型和浏览型聚合报告<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">详细说明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>转化历程：跨设备<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">详细说明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>转化历程：应用程序到网络<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">详细说明</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>归因模型：最终点击<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">详细说明</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>归因模型：基于优先级<br><a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">详细说明</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>归因模型：灵活</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %} {% DetailsSummary 'h3' %}关于归因模型{% endDetailsSummary %}

在基于优先级的归因模型下，浏览器可以将优先级与每个归因来源联系起来。该模式可用于：

- 确定某次点击或浏览是否是最有可能促成转化的原因（通常认为点击是用户兴趣的一个更直接的信号）。
- 设置**首次触点****归因**模型，可以通过将`attributionsourcepriority`设置为相对于时间来实现。
- 设置（一定概率上的）**线性归因模型**，可以通过随机且均匀地选择优先级来实现。

该 API 未来可能会支持其他归因模型。在聚合报告中，[基于工作集的方案](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)可能允许更灵活的归因选项，包括为多个先前的归因来源指定部分功劳。

{% endDetails %}

## 浏览器支持

- Firefox 和 Edge [尚未共享信号](https://chromestatus.com/feature/6412002824028160)。
- Safari/Webkit 对此[持否定态度](https://chromestatus.com/feature/6412002824028160)，并提议了另一种用于测量广告转化的 API，称为[私人点击测量](https://developer.apple.com/videos/play/wwdc2021/10033/)。

尽管这是两个不同的 API，但 Chrome 和 WebKit 正在开放合作，从而简化开发者体验，例如在属性名称和[报告的 JSON 结构](https://github.com/privacycg/private-click-measurement/issues/30)方面保持一致。

{% Details %} {% DetailsSummary 'h3' %}Chrome 提议的 API 与 WebKit 提议的 API 之间的区别{% endDetailsSummary %}Chrome 提议的归因报告 API 的功能集与 Safari/WebKit 提议的私人点击测量 API 的功能集不同。<br>最值得注意的是，Chrome 提议的归因报告 API：

- 支持浏览型测量。
- 可以提供事件级报告。
- 支持第一方上下中的广告链接（例如社交网络或搜索引擎结果页面上的广告，或者发布商投放自己的广告）**和**第三方 iframe 中的广告链接（例如使用第三方广告技术提供商的发布商网站上的广告）。
- 可以使广告技术平台等第三方代表发布商和广告商接收报告。

{% endDetails %}

## 运作方式

### 事件级报告

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png", alt="事件级报告", width="800", height="521" %}<figcaption>事件级报告的生成方式如下：浏览器将点击或浏览事件（"归因来源事件"）与广告技术定义的转化数据（"归因触发数据"）进行匹配。稍后，浏览器将生成的报告发送到预定义的端点，报告会包含一些噪声并经历一段延迟。</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %}详细的运作方式：事件级报告{% endDetailsSummary %}可以使用特定于广告转化的属性对广告链接进行配置：

- 附加到发布商端广告点击（或广告浏览）的自定义数据，例如点击 ID 或活动 ID。
- 该广告预期会发生转化的网站。
- 应该收到成功转化通知的报告端点，即接收报告。
- 无法再计入广告转化的截止日期和时间。

注意：也可以为[`window.open()`发起的](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations)导航注册归因来源，或者通过 [JavaScript API](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript) 为浏览注册归因来源。

当用户点击或看到一则经过特别配置的广告时，用户本地设备上的浏览器就会记录此事件以及指定的归因配置数据。

稍后，用户访问广告商的网站并执行广告商或其广告技术提供商归类为转化的操作（例如购买）。发生这种情况时，广告商或广告技术提供商会触发归因：API 要求浏览器将一次转化记录为一个特定的值`trigger-data`，并且用户浏览器会将广告点击（或广告浏览）与转化事件进行匹配。

浏览器最终安排将报告发送给广告方指定的端点。该报告包括：

- 附加到促成此次转化的广告点击或广告浏览的自定义广告方数据。
- 带有一些噪声的自定义转化方数据。

如果某次给定的广告点击（或广告浏览）注册了多次转化，则浏览器会安排发送相应的报告。每次浏览可以发送一次报告，而每次点击最多可以发送三次报告。

报告会由浏览器延迟发送（转化后数天或有时数周）。

{% endDetails %}

### 聚合报告

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %}<figcaption>聚合报告的生成方式如下：浏览器将详细的点击或浏览事件（"归因来源事件"）与广告技术定义的详细转化数据（"归因触发数据"）进行匹配。广告技术定义的代码在工作集中运行，从而对将由浏览器发送并用于计算聚合报告的贡献进行定义。聚合服务负责私下为广告技术计算聚合报告。</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %}详细的运作方式：聚合报告{% endDetailsSummary %}

可以使用特定于广告转化的属性对广告链接进行配置。

当用户点击或看到一则经过特别配置的广告时，用户本地设备上的浏览器就会记录此事件以及指定的归因配置数据。

广告技术定义的代码会在工作集中执行，从而对贡献（即广告方和转化方的共同数据）进行定义。

这些贡献（原始报告）被加密发送到广告技术服务器，然后发送到聚合服务，并将由聚合服务通过[私密](#privacy)方式计算聚合报告。

请注意，聚合报告的延迟程度与事件级报告的延迟程度不同。

{% endDetails %}

## 隐私

### 概述

我们以一个叫鲍勃的人为例。鲍勃在`news.com`上读新闻时看到了一则广告。一周后，鲍勃在`shoes.example`上购买了鞋子。

现如今，这种转化会由作为**跨站标识符**的第三方 cookie 进行跟踪。广告技术公司可以借助第三方 cookie 获取到鲍勃在`news.example`**和**`shoes.example`上的大量活动细节，并将这些信息合并，建立一份关于鲍勃的详细资料。广告技术公司最终能够获知鲍勃的地理位置、浏览习惯和在`news.com`上的阅读偏好，**以及**在`shoes.com`上的购买记录、活动和信用卡信息。这种跨站连接对于广告转化的测量十分有用，但妨碍了用户隐私：鲍勃高度详细的活动信息在各个站点之间被跟踪。

然而，归因报告 API 在使广告公司能够深入了解转化的同时，**无需对个人活动进行跨站跟踪**。该 API 通过跨站连接的信息量非常少，足以用于测量转化，但不足以跟踪鲍勃的跨站活动细节。鲍勃在`news.example`和`shoes.example`上的活动信息得以保持互相独立的状态。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="图解：如今的网络（合并身份）和将来的网络（分划身份）对照视图", width="800", height= "314" %}

### 详细信息

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png", alt="ALT_TEXT_HERE", width="800", height="1237" %}<figcaption>与第三方 cookie 不同，归因报告 API 为了保持每个网站的身份分划，能够在不需要跨站标识符的情况下提供有价值的信息。<br>事件级报告仅将广告方标识符与少量转化方数据相关联。因此，即使这些报告确实提供了有关转化的跨站信息，但转化方的信息太过粗略，无法对用户身份进行跨站合并。<br>聚合报告虽然会提供详细的有用信息，但也仅限于聚合层面。由于不同的隐私技术、私人计算和密码学，聚合报告无法用于跟踪单个用户的跨站活动。<br>我们还对事件级报告和聚合报告都施加了额外的隐私保护措施，例如速率限制。</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %}详细信息：事件级报告与隐私{% endDetailsSummary %}

事件级报告通过遵循以下隐私机制，能够在无需跨站跟踪用户的情况下提供转化的相关有用信息：

- 不使用跨站标识符，且没有详细的跨站浏览活动离开设备。事件级报告将广告方 ( `news.example` ) 的 64 位信息与转化方的 ( `shop.example` )  1 位或 3 位信息相关联。64 位的信息**足以映射到单个用户标识符，但是这 64 位的信息只能与非常少量的跨站信息相连：**1 位或 3 位，因而不足以容纳标识符。注意：广告方的 64 位信息并不是新信息。在如今的情况下，广告方可能已经获取了某个用户 ID。`news.example`或`adtech.example`已经获知了某个特定用户在`news.example`上的活动。

- 采用额外的保护机制防止滥用和跨站跟踪：

    - **延迟**发送报告。
    - 向转化数据中**加入噪声**：在一定比例的时间内（Chrome 中为 5%），用随机值替换真实转化数据。
    - 每次点击或浏览只发送有限次数的归因转化报告。

{% Aside %}您可以通过保护隐私的方式恢复真实的转化计数。请参阅[示例脚本](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py)。{% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}详细信息：聚合报告与隐私{% endDetailsSummary %}

聚合报告将详细的点击或浏览事件与详细的转化数据相关联。但是，这些报告通过遵循以下隐私机制，能够在无需跨站跟踪用户的情况下提供转化的相关有用信息：

- 不使用跨站标识符。

- 每次归因可以对生成的聚合报告做出多项贡献，并且某位给定用户可以为特定的点击（或浏览）和转化触发多次归因。但是任何用户在给定的时间窗口内可以做出的贡献是有限的。

- 数据会被向上聚合到许多事件的级别（许多用户），因此无法精确观察单个事件。利用[差分隐私](https://en.wikipedia.org/wiki/Differential_privacy)使输出数据无法被用于跨站连接用户身份：当深入聚合数据时，随着详细程度的增加，数据的相对噪声也会增加。这会导致更大的相对误差，从而确保无法对单个事件（或用户）进行精确观察。另一方面，聚合了大量事件和用户的数据切片也更加准确有用。

- 将详细的点击或浏览事件与详细的转化数据相关联的原始报告已经过加密，因此广告技术公司无法读取。接着会通过一个受信任的服务器，以私密方式从这些报告中计算出聚合数据。目前正在考虑的一些计算选项：

    - 安全多方计算 (MPC)。这种计算方式将信任分布在多个服务器上。每台服务器会获得一份本身没有意义的数据切片。在合作各方都运行了计算后，各方的输出就会组合成一个有意义的整体。
    - 单服务器计算。这种计算方式使用一台助手服务器计算输出。此选项相对缺乏一些安全性和私密性，但更容易进行设置，也就意味着该选项可以让更多不同的生态系统参与者对此 API 进行实验并提供反馈。**该选项并不适合作为一个长期解决方案**。随着生态系统反馈的整合以及此 API 的发展成熟，我们会在提前通知并预留足够迁移时间的前提下弃用该选项，从而支持更安全的方法，如 MPC 或安全的单服务器计算。
    - 安全的单服务器计算。虽然使用单服务器，但该服务器具有与 MPC 相似（但不等效）的机密计算属性。
    - 从长远来看，服务器将需要完全通过安全的多方计算（安全的单服务器计算或多方计算）来处理数据。

- 采用额外的保护机制防止滥用和跨站跟踪：

    - 随机延迟发送报告。
    - 对不同数据切片的查询实施限速。

{% endDetails %}

## 网站和用户控制

- 用户可以在用户设置`chrome://settings/privacySandbox`中选择退出。
- 默认情况下，顶级上下文中会启用该功能。任意第三方无法在发布商不知情的情况下使用该 API，因为需要通过[许可策略](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)在子 iframe 中启用归因报告 API。

## 开放性问题

许多仍未得到解决的问题将随着 API 的公开孵化而得到解决。我们鼓励您[参与](#participate)这些讨论，特别是针对下列问题：

- 在数据中加入多少噪声才能同时兼顾隐私保护和实用性？
- 如何支持自定义归因模型？
- 如何针对具有一定详细程度的任何转化方数据（例如购买价值）进行优化？
- 受信任服务器的资格标准是什么？目前正在进行评估的一种解决方案是定期进行开源审计。[加入讨论](https://github.com/WICG/conversion-measurement-api/issues/116)。
- 如何提供更多报告灵活性，例如支持委派到更多报告端点？[加入讨论](https://github.com/WICG/conversion-measurement-api/issues/96)。
- 如何防止欺诈，例如通过使用匿名凭据进行身份验证？[加入讨论](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth)。
- 如果您正在考虑将此 API 用于非广告用例：还缺少哪些功能，如何对 API 进行改进？[开立一个问题](https://github.com/WICG/conversion-measurement-api/issues)
- 开发者如何自定义隐私设置？[加入讨论](https://github.com/WICG/conversion-measurement-api/issues/99)。

{% Aside %}该 API 为了兼顾**隐私性和实用性**而将多种隐私技术进行了结合。这意味着此 API 使用的 3 位（或针对浏览型转化的 1 位）数据限制和其他隐私机制都是达到目的的一种方式。这些方式可能会发生变化。如果广告技术公司有办法为他们的用例获取更多有用的数据，同时又能实现强大的隐私保证，那么该 API 也将进行相应的发展。{% endAside %}
