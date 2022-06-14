---
layout: layouts/doc-post.njk
title: プライバシーサンドボックスとは？
subhead: プライバシーサンドボックスは、サードパーティ Cookie やその他の追跡の仕組みを使用せずにクロスサイトに関わるユースケースを満たすための一連の提案です。
description: "提案の内容、貢献方法、およびその目的について。"
date: 2021-05-18
updated: 2021-01-25
authors:
  - samdutton
---


{% YouTube id='WnCKlNE52tc' %}


## プライバシーサンドボックスが必要な理由

プライバシーサンドボックスのイニシアチブには、主な目的が 2 つあります。
* サイト間でのユーザーの追跡やユーザーが認識しないサイト間追跡を行わずに、ウェブのユースケースとビジネスモデルをサポートするための代替ソリューションを開発する。
* 新しいソリューションが導入されたら、サードパーティ Cookie のサポートを段階的に廃止する。


## プライバシーサンドボックスの提案とは？

Chrome やその他のエコシステムの関係者は、これまでに 30 件を超える提案を提出し、[W3C グループの公開リソース](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)で閲覧できるようになっています。 これらの提案では、多様なユースケースと要件がカバーされています。

主な提案は以下のとおりです。

{% Aside %}
以下の一部の項目は、API の Explainer やその他のリソースにリンクされています。

今後数か月にわたって、外部コンテンツを要約した内容を、このサイト内に投稿していく予定です。
{% endAside %}


### サイト間プライバシーの境界の強化

* [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): 同じエンティティが所有する関連ドメイン名が、同じファーストパーティに属していることを宣言できるようにします。
* [**共有ストレージ**](https://github.com/pythagoraskitty/shared-storage): 現在パーティションされていないストレージ（使用廃止中）に依存している多くの正当なユースケースに対応できる汎用の低レベル API の提案。
* [**CHIPS**](https://github.com/WICG/CHIPS): [First-Party Sets](/docs/privacy-sandbox/first-party-sets)と同様に、この提案では、パーティショニングに関するユースケース、意味を持つ場合にクロスオリジンのインタラクションと共有を有効にする方法、およびこれを安全に保つ方法について説明されています。 サードパーティサービスが Cookie を設定できるようにする一方で、Cookie が最初に設定されたトップレベルサイトのコンテキスト内でのみ読み取れるようにすることを主な目的としています。 パーティショニングされたサードパーティ Cookie は、それを最初に設定したトップレベルサイトに関連付けられるため、他の場所からはアクセスできません。
* [**Origin-Bound Cookie**](https://www.chromestatus.com/feature/4945698250293248): デフォルトで Cookie をその設定オリジンにバインドし、そのオリジンからのみアクセスできるようにします。
* [**SameSite Cookie**](https://web.dev/samesite-cookies-explained/): クロスサイト Cookie を明示的にマーキングしてサイトを保護します。
* [**ストレージパーティショニング**](https://github.com/privacycg/storage-partitioning): `localStorage` または Cookie など、あらゆる形態の[ユーザーエージェントステート](https://github.com/privacycg/storage-partitioning#user-agent-state)を、単一のオリジンまたはサイトではなく、トップレベルサイトと読み込まれるリソースのオリジンによってダブルキーで使用できるようにします。
* [**Fenced Frame**](https://github.com/shivanigithub/fenced-frame): コンテンツ（広告など）の表示に使用できても、同じページ内の他の要素とは対話できないようにする一種の frame 要素を提供します。
* [**ネットワークの状態のパーティショニング**](https://github.com/MattMenke2/Explainer---Partition-Network-State/blob/main/README.md): ネットワークの状態を分割し、リソースの再利用を可能にするために照合する必要のあるネットワークパーティションキーをすべてのリクエストに割り当てることによって、ブラウザネットワークリソースがファーストパーティのコンテキスト間で共有されないようにします。
* [**HTTP キャッシュのパーティショニング**](https://developers.google.com/web/updates/2020/10/http-cache-partitioning): ブラウザの HTTP キャッシュを分割することで、セキュリティとプライバシーを向上させます。
* [**Federated Credential Management**](https://github.com/wicg/fedcm): ユーザーが明示的に同意しない限り、ユーザーのメールアドレスやその他の識別情報をサードパーティのサービスやウェブサイトに共有することなく、フェデレーション ID をサポートします（ユーザーがサードパーティサービスを通じてウェブサイトにサインインできる場合）。 WebID を使用すると、リダイレクト、ポップアップ、またはサイト間でユーザーの識別と追跡に使用できるサードパーティ Cookie を用いずに、ID 連携によるログインが可能になります。


### 関連するコンテンツと広告の表示

* [**Topics API**](/docs/privacy-sandbox/topics): インタレストベース広告を有効にします。 サードパーティ Cookie を必要とせず、サイト間でユーザー のブラウジング行動を追跡する目的でサードパーティが使用できないように設計されています。 Topics API は、ウェブサイトのホスト名を関心のあるトピックにマッピングする仕組みを提案しており、最近のブラウジングアクティビティに基づいてユーザーが現在関心を示している可能性のある大まかなトピックを返す JavaScript API を提供します。
* [**FLEDGE**](/docs/privacy-sandbox/fledge): リマーケティングとカスタムオーディエンスのユースケースに配信するための広告選択手法で、サードパーティがサイト間でのユーザーのブラウジング行動を追跡するために使用できないように設計されています。  FLEDGE は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリーの提案内で、Chromium に最初に実装された実験的機能です。


### デジタル広告の測定

* [**アトリビューション レポート**](/docs/privacy-sandbox/attribution-reporting): 広告クリックまたは広告ビューをコンバージョンに関連付けます。 以前は Event Conversion Measurement API と呼ばれていました。 イベントレベルと集計の 2 つのタイプのレポートを有効にします。


### 秘密追跡の防止

* [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/): [User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)（UA）文字列は、重要なパッシブ[フィンガープリンティング](https://w3c.github.io/fingerprinting-guidance/#passive)サーフェスであり、処理が困難です。 クライアントヒントを使用すると、開発者は、User-Agent 文字列からこのデータを解析することなく、ユーザーのデバイスまたは条件について必要な情報のみを積極的にリクエストすることができます。
* [**DNS-over-HTTPS**](https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/): の安全なコンテキストを介した [DNS 解決](https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/)のプロトコル。</p></li> 

  * [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): IP アドレスにアクセスして、個々のユーザーを識別する機能を制限します。 この提案には 2 つの機能が含まれます。1 つは、ウェブサイトが IP アドレスとユーザーを関連付けていないことをブラウザに知らせる [**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) という機能で、もう 1 つは、ユーザーのグループが同じ秘匿化サーバーを通じてトラフィックを送信することで、サイトホストからユーザーの IP アドレスを効果的に隠す [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) という機能です。 Gnatcatcher はまた、不正使用防止などの正当な目的で IP アドレスへのアクセスを必要とするサイトが、認証と監査に基づいてアクセスできるようにします。

* [**プライバシーバジェット**](https://www.youtube.com/watch?v=0STgfjSA6T8): ユーザーのブラウザまたはデバイスに関してウェブサイトが利用できる情報の量を数量化する方法を探り、サイトがアクセスできる情報に対してブラウザ単位の制限を有効にできる実用的な仕組みを開発します。</ul>




### ウェブのスパムや詐欺への対抗

* [**トラストトークン**](/docs/privacy-sandbox/trust-tokens): ウェブサイトが限定的な情報をブラウジングコンテキストから別のブラウジングコンテキストに（サイト間など）伝達できるようにすることで、パッシブ追跡を行わずに不正行為に対抗できるようにします。




## プライバシーサンドボックスへの取り組み状況

2021年早期までの状況は以下のとおりです。

* 30 件以上のプライバシーサンドボックスの提案が Chrome などから提出されています。
* 400 人以上が参加しました。これらのユーザーは、W3C グループに参加して、[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) や [Privacy Community Group](https://www.w3.org/community/privacycg/participants) などに意見を投稿しています。

* 5 つの API 実装を Chrome でテストできます。




## API の実装時期

各 API の進捗状況は、このサイトの [実装ステータス](/docs/privacy-sandbox/status/) ページでお知らせしています。



---




## 貢献とフィードバックの共有

* **GitHub**: GitHub で提案の Explainer を読み、Explainer の［Issues］タブで質問またはコメントを投稿してください。  
  [Explainer へのリンク](#explainers) は以下に記載されています。

* **W3C**: W3C の [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/)、[Privacy Community Group](https://www.w3.org/community/privacycg/participants)、および [Web Incubator Community Group](https://github.com/WICG) では、ユースケースに関するディスカッションや業界のフィードバックが共有されています。

* **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。




## 詳細について



### プライバシーサンドボックス提案の Explainer {: #explainers }

API 提案の Explainer では、特に欠落しているユースケースや、目標を達成するためのよりプライベートな方法の提案などのフィードバックを求めています。 各 Exapliner の［Issues］タブでコメントや質問を投稿できます。

* [プライバシーバジェット](https://github.com/bslassey/privacy-budget)
* [トラストトークン](https://github.com/dvorak42/trust-token-api)
* [First-Party Sets](https://github.com/privacycg/first-party-sets)
* [Gnatcatcher](https://github.com/bslassey/ip-blindness)
* [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
* [アトリビューション レポート](https://github.com/csharrison/conversion-measurement-api)
* [Topics API](https://github.com/jkarlin/topics)
* [FLEDGE](https://github.com/michaelkleber/turtledove)



### ウェブ開発者向けの記事と動画

* [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)
* [SameSite Cookie の説明](https://web.dev/samesite-cookies-explained/)
* [トラストトークンの基礎](https://web.dev/trust-tokens)
* [広告コンバージョンを測定するよりプライベートな方法](https://web.dev/conversion-measurement/)
* [プライバシーバジェットの紹介](https://www.youtube.com/watch?v=0STgfjSA6T8)



### 提案の背後にある原則と概念

* 「[A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)」（ウェブの潜在的なプライバシーモデル）は、API の基盤となるコア原則を説明しています。

* [プライバシーサンドボックス](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)

* プライバシーサンドボックスの概要: [Building a more private web](https://www.blog.google/products/chrome/building-a-more-private-web/)（よりプライベートなウェブを構築する）
* Google AI ブログ: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)（連合学習: 一元化されたトレーニングデータを使用しない共同機械学習）
* [The future of third-party cookies（サードパーティ Cookie の未来）](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
