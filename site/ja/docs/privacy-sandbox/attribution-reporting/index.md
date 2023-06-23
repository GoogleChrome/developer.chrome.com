---
layout: layouts/doc-post.njk
title: アトリビューションレポート
subhead: |2

  Measure when an ad click or view leads to a conversion, such as a
  purchase on an advertiser site.
description: |2

  Measure when an ad click or view leads to a conversion, such as a
  purchase on an advertiser site.
date: '2021-05-18'
updated: '2023-03-14'
authors:
  - maudn
  - alexandrawhite
---

{% YouTube id='UGA74CIcom8' %}

## Who is this for?

This article covers the basics of Attribution Reporting and explains some underlying concepts, but doesn't go into much technical detail.

- If you work in **advertising or ad tech**, you'll learn about how this API to supports functions that are currently supported by third-party cookies. Check out the API [use cases](#use-cases-and-features), with a more details of how [the reports are generated](#how-does-the-attribution-reporting-api-work).
- If you're a **developer or software engineer**, head over to the [full system overview](/docs/privacy-sandbox/attribution-reporting/system-overview/) or [experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/) with the API.

**Advertisers and publishers that rely on ad tech platforms** for conversion measurement don't need to use the API directly. You may be interested in understanding how Attribution Reporting works if your ad tech plans to integrate with this API.

{% Aside %}

In the future, the Attribution Reporting API may serve use cases that are not related to advertising.

{% endAside %}

## Attribution Reporting API とは何ですか？

Today, ad conversion measurement often relies on [third-party cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Browsers are restricting access to third-party cookies because these can be used to track users across sites and hinder user privacy.

Attribution Reporting API は、サードパーティ Cookie を使用することなくプライバシーの保護を担保しながらこういった測定を可能にしています。

この API を使用することで、広告主やアドテクプロバイダーは以下のような場合にコンバージョンを測定できるようになります。

- 広告の**クリック**や**表示**。
- サードパーティのアドテクプロバイダーを使用している広告主のサイト内の広告など、**サードパーティ** iframe 内の広告。
- SNS や検索エンジンの検索結果ページ上の広告や、広告主が独自に配信する広告などを含む**ファーストパーティ**コンテキストの広告。

If you're unfamiliar with some of these terms or concepts, consult the [Privacy Sandbox glossary](/docs/privacy-sandbox/glossary/).

## Try the API

- The Attribution Reporting API is available for experiments in the [relevance and measurement origin trial](/docs/privacy-sandbox/unified-origin-trial/).
- Test locally in your browser. [Set a *flag*](/docs/web-platform/chrome-flags/), which tells the Chrome browser to enable specific experimental features.

If you're interested in experimenting with the API, head over to [Attribution Reporting: experiment and participate](/docs/privacy-sandbox/attribution-reporting-experiment/).

{% Partial 'privacy-sandbox/feedback-aside.njk' %}

{: #changes }

### API changes

- [API の変更点](/docs/privacy-sandbox/attribution-reporting-updates/) を追跡する。
- Learn why we plan to [ship the Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/chrome-shipping) in the first half of 2023.

{% Aside %}

Attribution Reporting was formerly known as the Event Conversion Measurement API. [The name was changed](/docs/privacy-sandbox/attribution-reporting-introduction/) in 2022, as the original event-level scope expanded to cover additional measurement use cases.

{% endAside %}

{: #status }

### Availability

{% Partial 'privacy-sandbox/timeline/attribution-reporting-features.njk' %}

{% Aside %}

For an overview of the status of all Privacy Sandbox APIs, see the [Privacy Sandbox timeline](https://privacysandbox.com/timeline).

{% endAside %}

## ユースケースと機能

Attribution Reporting API では、広告主またはサードバーティのアドテクプロバイダーへと送信可能な 2 種類のレポートを通して、さまざまな種類の統計情報にアクセスできます。 これら 2 種類のレポートは同時使用が可能であり、補完的な関係にあります。

- [**Event-level reports**](#event-level-reports) associate a particular ad click or view (on the ad side) with data on the conversion side. Conversion-side data is very limited, and the data is noised (meaning that for a small percentage of cases, random data is sent instead of real reports). This preserves user privacy by preventing a joining of user identity across sites. As an extra privacy protection, reports are not sent immediately.
- <strong>集計レポート</strong>は、広告側の特定のイベントには関連付けられていません。 こういったレポートは、イベントレベルレポートよりもリッチで忠実度の高いコンバージョンデータを提供しています。 複数のプライバシー技術を組み合わせることで、サイト間でアイデンティティが結び付けられてしまうリスクを軽減させます。

### イベントレベルレポート

**イベントレベルレポート**は、広告のクリックや表示を大まかなコンバージョンデータに関連付けます。

<figure class="screenshot">  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",  alt="Event-level report", width="400", height="180" %}  <figcaption>    Example event-level report: Click ID 200400600 on <code>news.example</code> (attached to user ID Bob_Doe on <code>news.example</code>) has led to a purchase on <code>shop.example</code>.  </figcaption> </figure>

イベントレベルレポートは、以下の用途に適しています。

- **Optimization**. Answer questions like "How can I improve my return on investment?". In particular, these reports can be used to optimize ad placement, as ad-side unique IDs can be made available in the reports. Event-level reports can provide training data for machine learning models.
- **Coarse reporting**, where very little information is needed about the conversion. The current limit is 3 bits of conversion data for clicks⏤this means a conversion can be assigned one of eight categories⏤and 1 bit for views. Encoding of granular conversion-side data, such as a specific price or conversion time is not supported in event-level reports.
- **不正行為の検出**。 一部のレポートのデータからはスパム行為や不正な操作の特定に使用可能なパターンを読み取ることができるため、広告に関する不正の検出や分析に役立ちます。

### 要約レポート (これまでの集計レポート)

一方**要約レポート**は、より詳細なコンバージョンデータと、クリック/ビューデータやコンバージョンデータを結び付けるために必要となる柔軟性を提供します。

Learn more about [summary reports](/docs/privacy-sandbox/summary-reports/).

<figure>  {% Img    src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="Example of insights from summary reports.", width="400", height="180"%}  <figcaption>Here's an example of insights from summary reports: CampaignID 1234567 on <code>news.example</code> has led to 518 conversions on <code>shoes.example</code>, and to a total spend of $38174. Half of the conversions were from users in NYC, USA.</figcaption> </figure>

Summary reports are best suited for reporting use cases. These reports help answer questions such as: "What is my return on investment?"

Usage of summary reports for optimization—for example, to optimize for a purchase value, which is not supported by event-level reports (because the conversion data is too coarse)—is an area of active research.

### その他の機能

Other features proposed for this API include:

- [App-to-web attribution](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md): see or click an ad in an app and convert on the web.
- [Cross-device attribution](https://github.com/WICG/attribution-reporting-api/blob/main/archive/cross_device.md): see or click an ad on mobile and convert on desktop.

{% Aside %}

In a future without third-party cookies, this API would be combined with other privacy-preserving ads APIs to cover end-to-end use cases:

- Remarketing: see [Protected Audience API](/docs/privacy-sandbox/fledge/)
- Interest-based ad selection: see [Topics](/docs/privacy-sandbox/topics/)

{% endAside %}

## ブラウザのサポート

- Firefox と Edge は[シグナルがありません](https://chromestatus.com/feature/6412002824028160)。
- Safari/Webkit は[非対応](https://chromestatus.com/feature/6412002824028160)であり、広告コンバージョンの測定には[プライベートクリック測定](https://developer.apple.com/videos/play/wwdc2021/10033/)と呼ばれる異なる API を提案しました。

{% Details %}

{% DetailsSummary 'h3' %} Differences between the API proposed by Chrome and the API proposed by WebKit {% endDetailsSummary %}

この 2 つの API は異なるものの、Chrome と WebKit はオープンに連携しながら開発者エクスペリエンスの簡素化を進めています。たとえば、属性名や[レポート用の JSON の構造](https://github.com/privacycg/private-click-measurement/issues/30)を統一しています。

Chrome が 提案する Attribution Reporting API は、Safari/WebKit が提案する Private Click Measurement API とは機能セットが異なっています。 Chrome が提案する Attribution Reporting API のポイントは、以下の通りです。

- ビュースルー測定のサポート。
- イベントレベルレポートの提供が可能であること。
- 要約レポートにクリック/ビュー側とコンバージョン側の双方に関する情報が豊富に含まれていること。
- アドテクプラットフォームなどのサードパーティがサイト運営者や広告主に代わってレポートを受け取ることができること。

{% endDetails %}

### Browser configuration {: #browser-configuration }

- ユーザーは、`chrome://settings/privacySandbox` のユーザー設定から API の利用を停止することができます。
- **シークレット**モードの使用中は API が無効になります。
- **サードパーティ Cookie** が無効になっている場合、API は無効化されます。

{% Aside %}

この API はサードパーティ Cookie に依存していません。 しかしながら、テスト段階では API を有効にするためにサードパーティ Cookie を有効化する必要があります。 これにより開発者はデバッグレポートを取得し、API の結果を Cookie ベースのアトリビューションと比較することができます。

{% endAside %}

## サイトではどのようにしてアクセスを制御することができますか？ {: #sites-control }

If the API is available in a given browser, it's available by default in any given site, both in top-level documents and scripts, and in same-origin iframes.

Arbitrary third-parties—for example, cross-origin ad iframes that were not added to the page via a script that has top-level access—can't use the API without a publisher's or advertiser's knowledge: in these iframes, the Attribution Reporting API needs to be explicitly enabled via [Permissions policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

```html
<iframe src="..." allow="attribution-reporting"></iframe>
```

Third parties with top-level access that add cross-origin iframes to a page can enable the Attribution Reporting API via [Permissions policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) as well.

{% Aside %}

### Security benefits

By doing this, a script with top-level access allows the frames it adds itself to use Attribution Reporting. Only a third-party script that is trusted by the site should be given top-level access, so this isn't an issue.

The main security advantage of the policy lies somewhere else: frames that were added without a top-level script shouldn't be trusted by default to register sources or triggers (unless their embedder is already trusted). This is why the top-level site is required to explicitly enable the API for these iframes.

{% endAside %}

A site can disable the Attribution Reporting API for all parties—including scripts with top-level access—by sending the HTTP response header:

```text
Permissions-Policy: attribution-reporting=()
```

## Attribution Reporting API はどのように機能するのですか？

The Attribution Reporting API enables measureing two events that are linked together: an event on a publisher's website, such as a user viewing or clicking an ad, with a subsequent conversion on an advertiser site.

{: #billing }

{% Aside %}

The Attribution Reporting API may not be suited for cost-per-conversion billing needs, because of the noise added to event-level and [summary reports](/docs/privacy-sandbox/aggregation-service/#noise-scale).

You can share any feedback regarding the impact on various billing models by the Attribution Reporting API on [GitHub](https://github.com/WICG/attribution-reporting-api/issues).

{% endAside %}

### イベントレベルレポート

<figure>  {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",  alt="event-level report", width="800", height="521" %} <figcaption style="text-align:left;">イベントレベルレポートは、次のような順序で生成されます。<br>ブラウザーは、クリックまたはビューをアドテクノロジーによって定義されたコンバージョンデータと照合します。<br>その後、多少の遅延とノイズとともにレポート結果を事前に定義されているエンドポイントへと送信します。</figcaption> </figure>

### 要約レポート

<figure> {% Img   src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/un70ZcJVrWepdWWsnMIY.png", alt="", width="800", height="1024" %}  <figcaption style="text-align:left;">Summary report generation</figcaption> </figure>

Summary reports are generated as follows:

- A user clicks or views a specially configured ad. The browser—on the user's local device—records this event, alongside pre-specified attribution configuration data.
- Later on, when the user converts, the browser matches this detailed click or view event (known as the *attribution source event*) with detailed conversion data (known as *attribution trigger data*). The dimensions of detail captured are pre-defined by an ad tech company, and the browser follows specific logic that is defined by the ad tech. The browser outputs this data in an *aggregatable report*.
- Aggregatable reports are encrypted by the browser and sent to an ad tech server. From the ad tech server, the aggregatable reports are sent to the [aggregation service](/docs/privacy-sandbox/aggregation-service/) to produce a summary report.
- Summary reports are then made available to the ad tech. Note that summary reports are not delayed to the same extent as event-level reports.

Read more about [summary reports](/docs/privacy-sandbox/summary-reports/).

## プライバシー

Unlike third-party cookies, the Attribution Reporting API allows advertising companies to gain insights into conversions **without tracking an individual's activity across sites**.

ボブという人物を例に挙げましょう。 ボブは、`news.com`でニュースを読んでいるときにある広告を目にしました。 その 1 週間後、ボブは `shoes.example` で靴を購入します。

現時点でこういったコンバージョンは**クロスサイト識別子**として使用されるサードパーティ Cookie によって追跡されています。 サードパーティ Cookie を使用することでアドテク企業は `news.example` と `shoes.example` でボブが行ったアクティビティの詳細な情報にアクセスできるようになり、それらの情報を統合してボブの詳細な人物像を構築することができます。 最終的にアドテク企業は、ボブの所在地、サイトの閲覧習慣、`news.com` での記事の好み、さらには `shoes.com` での購入内容、アクティビティ、クレジットカードなどの情報を手に入れることができます。 こういったクロスサイトでの情報の結び付けは広告のコンバージョン測定においては有効となります。 しかしながら、これはユーザーのプライバシーを侵害します。ボブのアクティビティは、サイト間に渡って高いレベルで追跡されてしまうことになります。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Side-by-side view of today's web (joined identity) and tomorrow's web (partitioned identity)", width="800", height="314" %}

A small amount of information is joined across sites—enough to measure conversions, but not enough to track Bob's activity across sites in detail. Bob's activity on `news.example` and on `shoes.example` remains separate.

### Protections in each report type

**Event-level reports** link an ad-side identifier with a small amount of conversion-side data. While they do provide cross-site information about a conversion, but the conversion-side information is too coarse to join user identity across sites.

**要約レポート**では詳細な分析情報が提供されますが、提供されるのは集計後の情報のみです。こういった集計可能レポートの内容は暗号化された上でアドクノロジー側へと送信されるため、アドテクノロジー側では集計サービスを利用しない限りレポートから情報を得ることができません。 集計サービスでは、ノイズが含まれる集計へのアクセスのみが提供されます。

レート制限などを含む追加のプライバシー保護が、イベントレベルレポートと集計レポートの両方に課せられています。

<figure> {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/mDdo2XLyGLBCAlgH7MPZ.png", alt="", width="800", height="1237" %} </figure>

{: #event-level-noise }

{% Details %} {% DetailsSummary 'h3' %} In detail: Event-level reports and privacy {% endDetailsSummary %}

Event-level reports provide conversion insights without tracking users across sites, by following the following privacy mechanisms:

- No cross-site identifier is used and no detailed cross-site browsing activity leaves the device.
- Event-level reports associate 64 bits of information on the ad side (`news.example`) with only 1 bit or 3 bits on the conversion side (`shop.example`). 64 bits are enough information to be mapped to an individual user identifier, but these 64 bits can only be linked with very little cross-site information: 1 bit or 3 bits, which are not enough to hold an identifier.
    - The ad-side 64 bits are not new information. A user ID can already be available on the ad side today. `news.example` or `adtech.example` already knows about a certain user's activity on `news.example`.
- 悪用やクロスサイトトラッキングを防止するために、追加の保護が適用されています。
    - The reports are sent with a **delay**.
    - The conversion data is **noised**: a certain percentage of the time, fake reports are generated.
    - The number of attributed conversion reports is limited per click or view. {% endDetails %}

{% Details %} {% DetailsSummary 'h3' %} In detail: Summary reports and privacy {% endDetailsSummary %}

Summary reports associate a click or view event with detailed conversion data. They provide conversion insights without tracking users across sites, by using the following privacy mechanisms:

- クロスサイト識別子を使用しません。
- 各アトリビューションは、要約レポートの結果に複数のコントリビューションを設定することが可能です。 ユーザーは特定のクリック (またはビュー) やコンバージョンについて複数のアトリビューションをトリガーすることができます。
- Data is aggregated up to the level of many events (many users) and no individual events can be observed precisely. When looking at the aggregated data, as the level of detail increases so does the relative noise on that data increases as well. Slices of data that aggregate a lot of events and users are more accurate to preserve usefulness.
- The raw reports that associate a detailed click or view event with detailed conversion data are encrypted and not readable by the ad tech company. This data can only be read by the [aggregation service](/docs/privacy-sandbox/aggregation-service).
- 悪用やクロスサイトトラッキングを防止するために、追加の保護が適用されています。
    - Reports are sent with random delays.
    - 異なるデータスライスに対するクエリについてはレートが制限されます。

{% endDetails %}

## 貢献とフィードバックの共有

- この機能について質問するにはどうすればよいですか？
- オリジントライアルの参加者で技術的な質問がある場合は、開発者向けの [Attribution Reporting メーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加して質問するか、[Chromium のバグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=attribution%20reporting)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。
