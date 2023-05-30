---
layout: layouts/blog-post.njk
title: プライバシーサンドボックスの関連性と測定 API の出荷の準備
authors:
  - rowan_m
  - alexandrawhite
description: これらの API の Chrome での提供は、7 月下旬の Chrome 安定版 115 で開始されます。
subtitle:  これらの API の Chrome での提供は、7 月下旬の Chrome 安定版 115 で開始されます。
date: 2023-05-18
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/tcYqpA0B5VEJXN27w0ZW.png
alt: ロゴ付きのプライバシーサンドボックス。
tags:
  - privacy
  - origin-trials
---

プライバシーサンドボックスプロジェクトは、関連性と測定 API を Chrome 安全版に出荷する準備を進めています。[ウェブのプロジェクトタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)では、Chrome での提供が 2023 年第 3 四半期に始まることが示されています。具体的には、 [Chrome 安定版 115](https://chromiumdash.appspot.com/schedule) をターゲットにする予定です。つまり、2023 年 7 月下旬から API の提供を開始することになります。

この記事では、今回のリリースに関わる次の内容について確認します。

- **出荷内容**。公開予定の関連性と測定 API は、Topics、Protected Audience、アトリビューション レポート、Private Aggregation、共有ストレージ、および Fenced Frames です。これらの API は、潜在的なイシューを監視するために段階的に利用可能になる予定です。
- **正式な公開プロセス**。各 API は標準の Chrome 公開プロセスをたどります。このプロセスには、blink-dev メーリングリストに承認を得る目的で公開される個別の「Intent to Ship」メッセージが含まれます。
- **ユーザーコントロールの更新**。ユーザーは、API を管理するための広告プライバシーコントロールを利用できます。
- **オリジントライアルのステータス**。オリジントライアルは安定版リリースまで引き続き利用可能です。
- **登録**。登録は 6 月に開始され、8 月には関連性 API と測定 API にアクセスできる必要があります。
- **Chrome を使用したテスト**。開発者がサードパーティ Cookie データを使用せずに API をテストできるオプションを準備しています。

Chrome での提供が近づきましたら、改めてお知らせいたします。今のところ、開発者がすぐにできる唯一のアクションは、情報を入手することです。これから起こる変更を理解しておくことで、サイトの準備を確実に行うことができます。

「Chrome での提供」とは、ブラウザのフラグやオリジントライアルへの参加を必要とせずに、デフォルトの Chrome で API をで利用できることを意味します。ただし、100% すべての Chrome ブラウザで API がすぐに有効になるということではありません。API は段階的に公開され、API がアクティブであるかどうかはユーザーがいつでも制御できます。立ち上げが完了すると、エコシステムは本番環境で API を使用できるようになります。

<figure class="screenshot">
  <p data-md-type="paragraph"><a href="https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline"> {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ywbyok1JNTBh5B9Xb8xP.png", alt="プライバシーサンドボックスのウェブのタイムライン。", width="800", height="562" %} </a></p></figure>

これらは、[関連性と測定のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)でテスト用に提供されている API と同じセットです。テスト中にエコシステムから受け取ったフィードバックは、重要なユースケースに合わせてこの機能を形成する上で不可欠でした。テストの実施、イシューの報告、関係者との結果の共有にご協力いただいた皆さんに感謝します。これこそが共同の取り組みです。

{: #include-apis }

## 出荷内容

関連性と測定 API には次のものが含まれます。

- [Topics](/docs/privacy-sandbox/topics/): サイト全体で個人をトラッキングするサードパーティ Cookie やその他のユーザー識別子を使用せずに、インタレストベース広告のシグナルを生成します。
- [Protected Audience](/docs/privacy-sandbox/fledge/): リマーケティングやカスタムオーディエンスのユースケースに対応する広告を選択します。サイト間でのサードパーティのトラッキングを軽減するように設計されています。（この API は以前は FLEDGE という名前でした。リリースに向けて、機能をより適切に反映するように名前を更新しました。）
- [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/): 広告のクリックまたは広告のビューをコンバージョンと関連付けます。アドテックは、イベントレベルまたは<a>要約レポート</a>を生成できます。
- [Private Aggregation](/docs/privacy-sandbox/private-aggregation/): Protected Audience からのデータと Shared Storage からのクロスサイトデータを使用して、集計データレポートを生成します。
- [共有ストレージ](/docs/privacy-sandbox/shared-storage/): プライバシーが保護された読み取りアクセスを備えた、無制限のクロスサイトストレージ書き込みアクセスを許可します。
- [Fenced Frames](/docs/privacy-sandbox/fenced-frame/): クロスサイトデータを共有することなく、ページにコンテンツを安全に埋め込みます。

{: #blink-intents }

### Chrome での機能の出荷

<figure class="float-right">{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/wtfeBg9L5DZVLQYoKKvO.png", alt="ロックと鍵を備えたスーツケース", width="444", height="338" %}</figure>

新しいウェブプラットフォーム機能に関するすべての提案は、プライバシーサンドボックスの提案も含み、Chrome における[標準の新機能出荷プロセス](https://www.chromium.org/blink/launching-features/)をたどります。API のライフサイクルの各マイルストーンは、公開の [blink-dev メーリング リスト](https://groups.google.com/a/chromium.org/g/blink-dev)で共有される [Intent](https://www.youtube.com/watch?v=9cvzZ5J_DTg&list=PLNYkxOF6rcIBzsbjZKyOdO-iwQTjidz1P&index=1&t=3s&ab_channel=GoogleChromeDevelopers) メッセージによって通知されます。つまり、プライバシーサンドボックスの各機能について、ディスカッションのための最初の提案を共有したときには「Intent to Prototype」（I2P）を、オリジントライアルで機能をテストできるようにしたときには「Intent to Experiment」（I2E）を送信しました。

近日、機能ごとに「Intent to Ship」（I2S）メッセージを blink-dev に送信する予定です。I2S メッセージには、正確な機能に関する追加の詳細と、Chrome バージョン 115 をターゲットとする計画が含まれます。I2S は、続行する前に 3 人の Chromium API 所有者から承認を得る必要があります。

API は、安定版リリースを使用するすべてのブラウザインスタンスに対してすぐに有効になるわけではありません。以前の一部のプライバシーサンドボックス機能と同様に、潜在的な問題を監視して対応できるように、ブラウザインスタンスの割合を増やしながら段階的に API を有効にしていきます。この過程において、developer.chrome.com、blink-dev I2S スレッド、および[開発者メーリング リスト](/docs/privacy-sandbox/events/#future-events)において、開発者チャンネル全体にそのステータスを共有する予定です。

### 出荷済み {: #shipped }

関連性と測定 API は、プライバシーサンドボックスプロジェクトの重要な部分です。ただし、すでに達成した重要なマイルストーンもいくつかあり、今後さらに多くのマイルストーンが達成されます。

- [User-Agent の情報量削減](/docs/privacy-sandbox/user-agent/): パッシブに共有されるブラウザデータを制限して、フィンガープリンティングにつながる機密情報の量を削減すると同時に、データをアクティブに要求するための User-Agent Client Hints を提供します。これらの値の削減は 2022 年 5 月に開始され、2023 年 5 月に完了しました。
- [CHIPS](/docs/privacy-sandbox/chips/): トップレベル サイトごとに個別の Cookie ジャーを使用して、開発者がパーティション化されたストレージに Cookie をオプトインできるようにします。CHIPS は 2023 年 2 月に Chrome 安定版で利用可能になりました。
- [First-Party Sets](/docs/privacy-sandbox/first-party-sets/): ストレージアクセス API を使用して、サイト間の関係を宣言し、限定的なクロスサイト Cookie アクセスを許可します。今週、Chrome Stable 113 で First-Party Sets が徐々に展開されています。
- [Federated Credential Management（FedCM）](/docs/privacy-sandbox/fedcm/): ユーザーが明示的に同意しない限り、ユーザーのメールアドレスやその他の識別情報をサードパーティのサービスやウェブサイトと共有することなく、ID 連携をサポートします。FedCM は 2022 年 11 月に出荷されました。

## ユーザーコントロールの更新 {: #user-controls }

機能を構成するために、ウェブプラットフォーム API の出荷と並行して Chrome のインターフェースを更新しています。このインターフェースをトライアル参加コントロールから進化させ、全体的な Chrome 設定とより統合できるようにしています。現在、少数の Chrome 安定版ユーザーを対象に、広告プライバシーインターフェースの更新をテストしています。

開発者は `chrome://flags/#privacy-sandbox-settings-4` フラグを設定することで、これらのコントロールをプレビューできます。私たちは更新されたコントロールの評価を継続しているため、現在のバージョンとデフォルトで出荷されるものが異なる可能性があります。ただし、これらのユーザーコントロールは、サイトが API サーフェスと対話する方法を変更することはありません。機能の検出と API の呼び出しの方法は同じままになります。

<figure class="screenshot">{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/K7udJ3mRsR3ltLwZVJnL.png", alt="Chrome でのプライバシーコントロールのプレビュー。", width="800", height="509" %}</figure>

## オリジントライアル

[プライバシーサンドボックスの関連性と測定のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)では、アトリビューション レポート、Protected Audience、Topics、Fenced Frames、および共有ストレージをサイトで総合的に実験することができます。このオリジントライアルは Chrome 安定版 115 まで継続される予定です。オリジントライアルに参加しているテスターは、安定版の展開に伴い、可用性や API からのデータにギャップを体験する可能性があります。テスターがこの移行を管理するのに役立つ追加のガイダンスと詳細を提供します。

進捗に合わせて[ドキュメント](/docs/privacy-sandbox/unified-origin-trial/)を更新する予定です。

## 登録と次のステップ {: #enrollment }

Chrome での提供と並行して、これらの API が意図どおりに透明性をもって使用されるようにしたいと考えています。 Chrome と Android にわたるプライバシー サンドボックスの関連性と測定 API のための新しい[開発者登録プロセス](/blog/announce-enrollment-privacy-sandbox/)を発表しました。更新情報と手順については、[登録ドキュメント](/docs/privacy-sandbox/enroll/)で共有します。

## Chrome が提供するテスト モード {: #testing }

サードパーティ Cookie のない世界でサイトがどのように動作するかを有意義にプレビューできるように、Chrome を利用したテストを提供する予定です。これにより、より効果的な API テストを実行できるようになり、エコシステム内でサードパーティ Cookie の段階的廃止への対応に確信をもてるようになります。

Google は CMA との連携により、これらのテストモードが *[Google のプライバシーサンドボックステクノロジーの定量的テスト](https://assets.publishing.service.gov.uk/media/6363b00de90e0705a8c3544d/CMA_Experiments_note.pdf)* に関するメモに記載されているサードパーティ向けのテストフレームワーク（およびタイムライン）と一致していることを確認してきました。その結果、CMA は、これらのモードでのテストの結果がプライバシーサンドボックスの評価に使用できると考えています。

Chrome を利用したテストには 2 つのモードが用意される予定です。

- **モード A**: アドテックは、トラフィックの一部でコントロールラベルと実験ラベルを受け取り、これらを使用してテストと実験を実施できます。
- **モード B**: Chrome は、全 Chrome ユーザーの一部に対してサードパーティ Cookie をグローバルに無効にします。

これらの詳細は最終的なものではなく、2023 年第 3 四半期の進捗に合わせてさらなる実装ガイダンスを公開する予定です。現在の提案は次のとおりです。

### モード A: オプトインテスト {: #mode-a }

アドテックは、Chrome トラフィックの一部について実験ラベルを受け取ることができます。アドテックは、他のアドテックと連携して、たとえば、一貫した実験グループに対してサードパーティ Cookie を使用せずに [Protected Audience](/docs/privacy-sandbox/fledge/) オークションを実行することを選択できます。アドテックは、これらのラベルを独自の実験やテストに使用することもできます。

Chrome は、モード A のユーザーのサードパーティ Cookie の状態を変更しません。Chrome は、アドテックが一貫したコントロールグループと実験グループを使用して実験できるように、ラベルを提供するだけです。つまり、アドテックパートナーが実験に参加している場合でも、サイト運営者自身が使用する目的でサイト運営者のサイトがサードパーティ Cookie データを受け取る可能性があるということになります。

これにより、関係するすべてのサイトとサービスが連携して、プロセス内のどの時点でもサードパーティ Cookie が使用されないようにすることができる、有意義な実験が可能になると期待しています。新しいリクエストヘッダーと低エントロピーのクライアント ヒントを介して、最大 10% の Chrome ブラウザにラベルが提供される予定です。テストに関心のある方は、ラベルへのアクセス方法とラベルの粒度についてエコシステムからの[フィードバック](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)を提供することをお勧めします。

オプトインテストモードは 2023 年第 4 四半期から利用可能になる予定で、サードパーティ Cookie が廃止されるまでこのモードは継続されます。

### モード B: サードパーティ Cookie の 1% 廃止 {: #mode-b }

Chrome は最大 1% のブラウザに対してサードパーティ Cookie を廃止します。このモードはグローバルに適用されるため、オプトインはありません。もちろん、サイトが [CHIPS](/docs/privacy-sandbox/chips/) や [First-Party Sets](/docs/privacy-sandbox/first-party-sets/) などの代替ソリューションをまだ採用していない場合、一部のサイト機能が影響を受ける可能性があります。

{% Aside %}

サイトの機能としてサードパーティ Cookie データに依存している場合は、[サードパーティ Cookie の段階的廃止に備えるためのガイド](/docs/privacy-sandbox/third-party-cookie-phase-out/)を読んで、CHIPS または First-Party Sets がニーズに対応できるかどうかを理解してください。サードパーティ Cookie の廃止に起因するサイトの問題を報告できる[公開イシュートラッカー](https://goo.gle/report-3pc-broken)を開始しました。

{% endAside %}

私たちは、この段階でユーザーエクスペリエンスに影響を与えるイシューを検出し、対処し、サイト所有者に積極的に警告するための緩和策に取り組んでいます。

さらに、プライバシーサンドボックスの関連性と測定 API が無効になっているモード B 内のトラフィックのごく一部を提供する予定です。First-Party Sets、CHIPS、FedCM などの他の API は無効になりません。この組み合わせは、サードパーティ Cookie を使用しないパフォーマンスのベースラインを確立するのに役立つと予想されており、このサブセットのテストに充てるトラフィックの適切な部分に関する[フィードバック](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing)を求めています。

2024 年第 1 四半期にサードパーティ Cookie の 1% を廃止する予定であり、CMA と緊密な連携を通じて、廃止範囲を拡大するためのさらなる措置を講じていく予定です。

## 貢献とフィードバックの共有 {: #feedback}

関連性と測定のオリジントライアルにまだ参加していない場合でも、[登録してこれらの API を試す](/docs/privacy-sandbox/unified-origin-trial/)ことができます。今すぐ登録すると、これらの API が実際にどのように機能するかをより詳しく知り、広範に提供される前にさまざまな手法を試すことができます。

ウェブエコシステム全体の多様な関係者からのフィードバックは、プライバシーサンドボックスイニシアチブにとって非常に重要です。専用の[フィードバックセクション](/docs/privacy-sandbox/feedback/)には、フォローしたりディスカッションに参加したりできる既存の公開チャンネルの概要と、いつでも Chrome チームに直接連絡できるフィードバックフォームが用意されています。

開発者は、GitHub の [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問したり、ディスカッションに参加したりできます。
