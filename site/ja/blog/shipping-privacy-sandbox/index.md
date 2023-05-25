---
layout: layouts/blog-post.njk
title: Preparing to ship the Privacy Sandbox relevance and measurement APIs
authors:
  - rowan_m
  - alexandrawhite
description: |2-

  これらの API の Chrome での有効化は、7 月下旬の Chrome 安定版 115 で開始されます。
subtitle: |2-

  これらの API の Chrome での有効化は、7 月下旬の Chrome 安定版 115 で開始されます。
date: '2023-05-18'
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/tcYqpA0B5VEJXN27w0ZW.png
alt: |2

  The Privacy Sandbox with logo.
tags:
  - privacy
  - origin-trials
---

プライバシーサンドボックスプロジェクトは、関連性と測定 API を Chrome 安全版に出荷する準備を進めています。[ウェブのプロジェクトタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)では、Chrome での有効化が 2023 年第 3 四半期に始まることが示されています。具体的には、 [Chrome 安定版 115](https://chromiumdash.appspot.com/schedule) をターゲットにする予定です。つまり、2023 年 7 月下旬から API の有効化を開始することになります。

In this post, we review multiple components of this launch, including:

- **出荷内容**。公開予定の関連性と測定 API は、Topics、Protected Audience、アトリビューション レポート、Private Aggregation、共有ストレージ、および Fenced Frames です。これらの API は、潜在的なイシューを監視するために段階的に利用可能になる予定です。
- **The official launch process**. Each API goes through the standard Chrome launch process, which includes individual "Intent to Ship" messages published on the blink-dev mailing list for approval.
- **Updated user controls**. Users will have Ad privacy controls to manage the APIs.
- **Status of the origin trial**. The origin trial will continue to be available through to Stable release.
- **Enrollment**. Enrollment will be available in June and required to access the relevance and measurement APIs in August.
- **Chrome-facilitated testing**. We're preparing options for developers to test the APIs without third-party cookie data.

Chrome での有効化が近づきましたら、改めてお知らせいたします。今のところ、開発者がすぐにできる唯一のアクションは、情報を入手することです。これから起こる変更を理解しておくことで、サイトの準備を確実に行うことができます。

「Chrome での有効化」とは、ブラウザのフラグやオリジントライアルへの参加を必要とせずに、デフォルトの Chrome で API をで利用できることを意味します。ただし、100% すべての Chrome ブラウザで API がすぐに有効になるということではありません。API は段階的に公開され、API がアクティブであるかどうかはユーザーがいつでも制御できます。立ち上げが完了すると、エコシステムは本番環境で API を使用できるようになります。

<figure class="screenshot">
  <p data-md-type="paragraph"><a href="https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline">     {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ywbyok1JNTBh5B9Xb8xP.png", alt="Web timeline for the Privacy Sandbox.", width="800", height="562" %} </a></p></figure>

These are the same set of APIs available for testing in the [relevance and measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/). The feedback we received from the ecosystem during testing has been absolutely critical in shaping this functionality to meet important use cases. We're grateful to all of you who have been testing, reporting issues, and sharing your results with the world—it's a genuinely collaborative effort!

{: #included-apis }

## What's shipping

The relevance and measurement APIs include:

- [Topics](/docs/privacy-sandbox/topics/): Generate signals for interest-based advertising without third-party cookies or other user identifiers that track individuals across sites.
- [Protected Audience](/docs/privacy-sandbox/fledge/): Select ads to serve remarketing and custom audience use cases, designed to mitigate third-party tracking across sites. (This API was previously named FLEDGE. As we head towards launch, we've updated the name to better reflect the functionality.)
- [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/): 広告のクリックまたは広告のビューをコンバージョンと関連付けます。アドテックは、イベントレベルまたは<a>要約レポート</a>を生成できます。
- [Private Aggregation](/docs/privacy-sandbox/private-aggregation/): Generate aggregate data reports using data from Protected Audience and cross-site data from Shared Storage.
- [共有ストレージ](/docs/privacy-sandbox/shared-storage/): プライバシーが保護された読み取りアクセスを備えた、無制限のクロスサイトストレージ書き込みアクセスを許可します。
- [Fenced Frames](/docs/privacy-sandbox/fenced-frame/): Securely embed content onto a page without sharing cross-site data.

{: #blink-intents }

### Shipping features in Chrome

<figure class="float-right"> {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/wtfeBg9L5DZVLQYoKKvO.png", alt="A suitcase with a lock and key", width="444", height="338" %} </figure>

All proposals for new web platform features, including those in the Privacy Sandbox,  go through our [standard process to ship new functionality](https://www.chromium.org/blink/launching-features/) in Chrome. Each milestone in an API's lifecycle is signaled by an [Intent](https://www.youtube.com/watch?v=9cvzZ5J_DTg&list=PLNYkxOF6rcIBzsbjZKyOdO-iwQTjidz1P&index=1&t=3s&ab_channel=GoogleChromeDevelopers) message that we share on the public [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev). That means for each of the Privacy Sandbox features, we sent an "Intent to Prototype" (I2P) when we shared the initial proposal for discussion and an "Intent to Experiment" (I2E) when we made the features available for testing via origin trial.

Soon, we'll send an "Intent to Ship" (I2S) message to blink-dev for each feature. The I2S messages will include additional detail on exact functionality and the plan to target Chrome version 115. An I2S must receive approvals from three Chromium API owners before it can proceed.

The APIs will not immediately be enabled for all browser instances with the Stable release. As with some previous Privacy Sandbox features, we'll gradually enable the APIs for an increasing percentage of browser instances to ensure that we can monitor and respond to any potential issues. As we progress, we'll share the status across our developer channels: here on developer.chrome.com, the blink-dev I2S threads, and the [developer mailing lists](/docs/privacy-sandbox/events/#future-events).

### Already shipped {: #shipped }

The relevance and measurement APIs are a critical piece of the Privacy Sandbox project. But, there are also some significant milestones we've already hit and plenty more to come:

- [User-Agent の情報量削減](/docs/privacy-sandbox/user-agent/): パッシブに共有されるブラウザデータを制限して、フィンガープリンティングにつながる機密情報の量を削減すると同時に、データをアクティブに要求するための User-Agent Client Hints を提供します。これらの値の削減は 2022 年 5 月に開始され、2023 年 5 月に完了しました。
- [CHIPS](/docs/privacy-sandbox/chips/): Allow developers to opt-in a cookie to partitioned storage, with a separate cookie jar per top-level site. CHIPS became available in Chrome Stable in February 2023.
- [First-Party Sets](/docs/privacy-sandbox/first-party-sets/): Declare relationships among sites to allow for limited cross-site cookie access using the Storage Access API. First-Party Sets is slowly rolling out with Chrome Stable 113, this week.
- [Federated Credential Management (FedCM)](/docs/privacy-sandbox/fedcm/): Support federated identity without sharing the user's email address or other identifying information with a third-party service or website, unless the user explicitly agrees to do so. FedCM shipped in November 2022.

## Updated user controls {: #user-controls }

Alongside shipping the web platform APIs, we're updating the interface in Chrome to configure the features. We're evolving this interface from the trial participation controls to be more integrated with the overall Chrome settings. Currently, we're testing an updated Ad privacy interface with a small percentage of Chrome Stable users.

Developers can preview these controls by setting the `chrome://flags/#privacy-sandbox-settings-4` flag. We're continuing to evaluate the updated controls and the current version may differ from what we ship by default. However, these user controls don't change how sites interact with the API surface—the methods for feature detection and calling the APIs remain the same.

<figure class="screenshot"> {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/K7udJ3mRsR3ltLwZVJnL.png", alt="Ad privacy controls preview in Chrome.", width="800", height="509" %} </figure>

## Origin trial

[プライバシーサンドボックスの関連性と測定のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)では、アトリビューション レポート、Protected Audience、Topics、Fenced Frames、および共有ストレージをサイトで総合的に実験することができます。このオリジントライアルは Chrome 安定版 115 まで継続される予定です。オリジントライアルに参加しているテスターは、安定版の展開に伴い、可用性や API からのデータにギャップを体験する可能性があります。テスターがこの移行を管理するのに役立つ追加のガイダンスと詳細を提供します。

We'll update our [documentation](/docs/privacy-sandbox/unified-origin-trial/) as this progresses.

## Enrollment and next steps {: #enrollment }

Chrome での有効化と並行して、これらの API が意図どおりに透明性をもって使用されるようにしたいと考えています。 Chrome と Android にわたるプライバシー サンドボックスの関連性と測定 API のための新しい[開発者登録プロセス](/blog/announce-enrollment-privacy-sandbox/)を発表しました。更新情報と手順については、[登録ドキュメント](/docs/privacy-sandbox/enroll/)で共有します。

## Chrome-facilitated testing modes {: #testing }

We intend to provide Chrome-facilitated testing that allows sites to meaningfully preview what it's like to operate in a world without third-party cookies. This will allow us to perform more effective API testing and grow confidence within the ecosystem, as to its readiness for third-party cookie phase out.

We have worked with the CMA to ensure these testing modes align with the testing framework (and timeline) for third parties laid out in its note on *[Quantitative testing of Google's Privacy Sandbox technologies](https://assets.publishing.service.gov.uk/media/6363b00de90e0705a8c3544d/CMA_Experiments_note.pdf)*. As a result, the CMA anticipates that the results from testing in these modes can be used in its assessment of the Privacy Sandbox.

We plan to have two modes of Chrome-facilitated testing:

- **Mode A**: Ad techs can receive control and experiment labels on a portion of traffic and use these to conduct testing and experiments.
- **Mode B**: Chrome globally disables third-party cookies for some portion of all Chrome users.

These details are not final, and we'll publish further implementation guidance as we progress in Q3 2023. The current proposals are as follows.

### Mode A: Opt-in testing {: #mode-a }

Ad techs will be able to receive experiment labels for a portion of Chrome traffic. An ad tech can choose to coordinate with other ad techs, for example, to run [Protected Audience](/docs/privacy-sandbox/fledge/) auctions without third-party cookies for a consistent experiment group. Ad techs can also use these labels for their own independent experiments and testing.

Chrome will not modify the state of third-party cookies for users in Mode A. Chrome only provides the labels, as to ensure that ad techs can experiment with consistent control and experiment groups. This means that a publisher's site could still receive third-party cookie data for the publisher's own usage, even if their ad tech partners are participating in the experiment.

We expect this to allow for meaningful experimentation, where all involved sites and services can coordinate to ensure third-party cookies are not used at any point within the process. We anticipate providing labels for up to 10% of Chrome browsers via a new request header and low-entropy client hint. We encourage anyone interested in testing to provide [feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues) from the ecosystem on the method for accessing labels and the granularity of labels.

We plan to make the opt-in testing mode available starting in Q4 2023, and we'll continue this mode until third-party cookie deprecation.

### Mode B: 1% third-party cookie deprecation {: #mode-b }

Chrome will deprecate third-party cookies for up to 1% of browsers. There is no opt-in for this mode, as it will be applied globally. There is, of course, the possibility that some site features may be impacted if the site hasn't yet adopted an alternative solution, such as [CHIPS](/docs/privacy-sandbox/chips/) or [First-Party Sets](/docs/privacy-sandbox/first-party-sets/).

{% Aside %}

If you rely on third-party cookie data for site functionality, read our [guide to prepare for third-party cookie phase-out](/docs/privacy-sandbox/third-party-cookie-phase-out/) to understand if CHIPS or First-Party Sets can address your needs. We've launched a [public issue tracker](https://goo.gle/report-3pc-broken), where you can report site issues resulting from third-party cookie deprecation.

{% endAside %}

We're working on mitigations to detect, address, and proactively alert site owners of issues that impact user experience during this phase.

Additionally, we plan to provide a small fraction of traffic within Mode B that has Privacy Sandbox relevance and measurement APIs disabled. Other APIs, like First-Party Sets, CHIPS, FedCM, and so on, will not be disabled. We anticipate that this combination will be helpful to establish a baseline of performance without third-party cookies, and we're seeking [feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) on an appropriate fraction of traffic to devote to this subset of testing.

We plan to deprecate 1% of third party cookies in Q1 2024, and we'll work closely with the CMA before taking further steps to expand deprecation.

## Engage and share feedback {: #feedback }

If you're not already participating in the relevance and measurement origin trial, you can still [sign up and experiment](/docs/privacy-sandbox/unified-origin-trial/) with these APIs. By signing up now, you'll have a chance to get more familiar with how these APIs work in practice and try different techniques before they are widely available.

Feedback from a diverse set of stakeholders across the web ecosystem is critical to the Privacy Sandbox initiative. Our dedicated [feedback section](/docs/privacy-sandbox/feedback/) provides an overview of the existing public channels, where you can follow or contribute to discussion, along with a feedback form to ensure you can always reach the Chrome team directly.

If you're a developer, you can ask questions and join discussions in the [Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) on GitHub.
