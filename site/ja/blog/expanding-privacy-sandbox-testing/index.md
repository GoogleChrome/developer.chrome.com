---
title: プライバシーサンドボックステストの拡大
description: >
  プライバシーサンドボックスのタイムラインの変更に伴い、プライバシーサンドボックスの関連性と測定オリジントライアルの範囲拡大と期間延長、および API の今後の展開を形作るためのテスト方法とフィードバックの提供方法について学びます。
layout: 'layouts/blog-post.njk'
date: 2022-07-27
authors:
  - rowan_m
  - barbsmith
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/7Hid7vSdQtp0RNThvO5J.png'
alt: >
  プライバシーサンドボックスのロゴ
tags:
  - privacy
---

今日、[ウェブのプライバシーサンドボックスとサードパーティ Cookie の段階的廃止過程に関する最新の計画とタイムライン](https://blog.google/products/chrome/update-testing-privacy-sandbox-web/)が公開されました。 **ウェブ開発者やサイト所有者からのフィードバック**は、提案の整理に時間をかけ、新しいソリューションをテスト、統合、最適化する十分な機会を確保することの重要性を示すうえで有益です。 この記事では、プライバシーサンドボックスの関連性と測定の統合オリジントライアルの 8 月のテスト計画について、トラフィック量を増やし、トライアル期間を延長する意図を含め、詳しく説明します。

{% Aside %}

プライバシーサンドボックスイニシアチブの開始以来、W3C、業界イベント、Chrome 主催のオフィスアワー、提案リポジトリなどで、何百もの開発者、企業などのエンゲージメントが得られています。 過去 6 か月の間に、**四半期ごとの概要レポートの共有** も 開始し、現在、14 の分野で合計 145 件のフィードバックトピックが集約されています。 ユーザーからのフィードバックは提案の設計と開発に直結しています。[フィードバックの提出には複数の方法が用意](/docs/privacy-sandbox/feedback/)されているため、 ぜひお送りください！

*   [フィードバックレポート: 2022 年第 1 四半期](/docs/privacy-sandbox/feedback/report-2022-q1/)
*   [フィードバックレポート: 2022 年第 2 四半期](/docs/privacy-sandbox/feedback/report-2022-q2/)

{% endAside %}

プライバシーサンドボックスプロジェクトは、**ウェブ全体のクロスサイトトラッキングに対抗する** ことを目的とした、広範囲に及ぶ大規模な一連の変更を表しています。 サイトが安全かつプライベートな方法でサードパーティのサービスを使用できることを保証しながら、ブラウザ固有の機能ではなく、誰もが実装できるオープン標準を提案しています。 **サードパーティ Cookie の段階的廃止は、プロジェクトの全体的な進捗における主要なマイルストーン** ですが、あらゆる形態のクロスサイトトラッキングに対応するという目標はもっと大きな全体像です。 この計画を通して、個別の提案と機能が導入されることを期待できます。 サイトに何らかの影響が生じる可能性が高くなります。サイトとサービスがどのような影響を受けるのか、どの提案や機能に従うべきかを理解しておく必要があります。

現在の状況を細かく見ながら、引き続きテストを行い、フィードバックを提供し、機能の公開に向けた準備を進める上で必要となる情報を確認しましょう。

## プライバシーサンドボックスの関連性と測定のオリジントライアルの拡大

[プライバシーサンドボックスの関連性と測定のオリジントライアル](/blog/privacy-sandbox-unified-origin-trial/)では、[アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/)、[FLEDGE](/docs/privacy-sandbox/fledge/)、 [Topics](/docs/privacy-sandbox/topics/)、[Fenced Frame](/docs/privacy-sandbox/fenced-frame/) を統合してそれらの技術的安定性と開発者エクスペリエンスをエコシステムでテストできます。[共有ストレージ](/docs/privacy-sandbox/shared-storage/)については、まもなく追加される予定です。 このトライアルは、現在、[Chrome ベータユーザーの 50% で有効](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/NTItmgLMAQAJ)になっているため、ユーザーを混乱させ過ぎることなく、初期の開発者からのフィードバックやイシューに積極的に取り組むのに役立っています。

オリジントライアルが進むにつれて、実際のトラフィックの有意義な割合で、API の有用性と有効性をテストする機会を開発者に提供したいと考えています。 [8 月初めの Chrome 104 安定版 のリリース](https://chromiumdash.appspot.com/schedule)により、**トライアルを Chrome 安定版 を使用するデスクトップユーザーに拡大** する予定です。 モバイルユーザーにおいては、Android 版の [Chrome 105 安定版](https://chromiumdash.appspot.com/schedule) からトライアルが拡大される予定です。 現在オリジントライアルは、104 安定版 期間終了時にの終わる予定です。そこで、それ以降でもテストを続けられるように、[Chrome 107（10 月後半）](https://chromiumdash.appspot.com/schedule) までの **[延長を申請](https://groups.google.com/a/chromium.org/g/blink-dev/c/SD8Ot2gpz4g/m/Cc0TGPhoAAAJ)しています。** これは、3 マイルストーンごとのオリジントライアルの延長の申請に関する標準手続きに従うものです。  Google は、API の一般公開まで、テストをサポートすることを約束しています。

**正式な[Intent to Experiment （I2E）の延長申請](https://groups.google.com/a/chromium.org/g/blink-dev/c/SD8Ot2gpz4g/m/Cc0TGPhoAAAJ)** はご確認いただけるようになっています。 また、実装およびテストガイドを伴う[プライバシーサンドボックスのドキュメント](/docs/privacy-sandbox/)も更新する予定です。

{% Aside %}

*   [はじめに: プライバシーサンドボックスの関連性と測定のオリジントライアル](/blog/privacy-sandbox-unified-origin-trial/)
*   [開発者ガイド: アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting-experiment/)
*   [開発者ガイド: FLEDGE](/docs/privacy-sandbox/fledge-experiment/)
*   [開発者ガイド: Topics API](/docs/privacy-sandbox/topics-experiment/)

{% endAside %}

これらの API が提供するサービスのいずれかを配信する場合、オリジントライアルへの参加とフィードバックの提出が非常に貴重となります。 これは、より大規模なテストに移行するにつれて、提案がニーズを満たすことを検証する機会です。 ウェブ標準やブラウザ開発に関する専門知識は必要ありません。独自の分野におけるこれまでの経験だけで十分です。

コア機能が安定し、完了した時点で、**API の一般公開を開始する予定です。これは 2023 年の初めから半ば頃になると思われます**。 オリジントライアルの過程で、設計上、API がテストとフィードバックに基づいて進化する範囲があります。 全体的なオリジントライアルがまだ進行中である間、個々の機能がリリースされる可能性があります。 リリース後、初期の導入と長期的なテストを進めながら、API の改善を続けます。

## Cookie の動作を更新する

Cookies Having Independent Partitioned State（CHIPS）および First-Party Sets 提案は、**トラッキングに関連しないクロスサイトコンテキストで Cookie をサポート**するための方法を提供します。

### CHIPS

CHIPS を使用すると、開発者は、トップレベルサイトごとに個別のクッキージャーで **「分割された」ストレージに Cookie を入れる** ことができます。 現在のオリジントライアル中の開発者からのフィードバックに基づいて多数の修正と改良を行うとともに、 **このトライアル期間を 8 月末の [Chrome 安定版 104](https://chromiumdash.appspot.com/schedule) 最終日まで延長** しました。 具体的には、`shop.example.com` や `blog.example.com` などのサブドメイン間で Cookie を使用するサイトの移行を容易にするために、`__Host` プレフィックスに対する **より厳しい要件** が[削除](https://github.com/privacycg/CHIPS/pull/46)され、`Domain` 属性がなくなりました。

この提案とトライアルの両方において肯定的なフィードバックを得たことから、**トライアル終了後に CHIPS を公開できると考えています**。 正式なプロセスのとおり、[blink-dev メーリングリスト](https://groups.google.com/a/chromium.org/g/blink-dev/)をフォローすることで、[Intent to Ship（I2S）](https://www.chromium.org/blink/launching-features/#step-6-prepare-to-ship) メッセージ投稿のお知らせをご確認いただけます。

{% Aside %}

*   [開発者ガイド: Cookie having independent partitioned state (CHIPS)](/docs/privacy-sandbox/chips/)
*   [はじめに: CHIPS オリジントライアル](/blog/chips-origin-trial/)

{% endAside %}

これは刺激的なマイルストーンです。この公開を皮切りに、ウィジェットや API などの別のサイトに埋め込まれた自己完結型サービスを提供する多くのユースケースにおいて、サードパーティ Cookie の段階的廃止の前に更新を完了できるのですから！

### First-Party Sets

First-Party Sets は、異なる国レベルのドメインなどで複数のサイトを持つ組織が、特定のクロスサイトの設定のままファーストパーティのコンテキストで独自の Cookie を使用し続けられるように、関連サイトをグループ化する方法を提供します。

機能のディスカッションとテスト中に受け取ったフィードバックに基づいて、このようなイシューに対応しながらも、エコシステムのニーズを満たすことを目指した[多数の変更を提案](https://github.com/WICG/first-party-sets/issues/92)しています。 具体的には、ユースケース固有の「サブセット」の観点からセットを定義することを提案しています。 また、サイトがクロスサイト Cookie アクセスを要求するために、Storage Access API と潜在的な 拡張機能を使用することも提案しています。 これにより、`SameParty` 属性の提案が置き換えられます。

{% Aside %}

*   [GitHub Explainer: First-Party Sets](https://github.com/WICG/first-party-sets)
*   [開発者ガイド: First-Party Sets](/docs/privacy-sandbox/first-party-sets/)

{% endAside %}

作業の進捗状況に応じて、開発者ガイドが更新されます。 First-Party Sets やユースケースですでに実験を実施している場合は、ディスカッションに従って参加する良いタイミングです。

## ユーザーエージェント情報の削減

現在、Chrome のユーザーエージェント文字列の情報を減らしています。 2022 年 4 月の Chrome 101 の時点で、**マイナーバージョンまたはビルドバージョン ゼロに置き換えられました**。 [今後のフェーズ](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)では、**OS/プラットフォームのバージョンとデバイスモデルを固定値**に置き換える作業も予定されています。 これは、デスクトップでは、2022 年 10 月の [Chrome 107](https://chromiumdash.appspot.com/schedule)、モバイルでは、2023 年 1 月の [Chrome110](https://chromiumdash.appspot.com/schedule) から開始されます。 このタイムラインは変わらず、サードパーティ Cookie の段階的廃止のスケジュールの変更の影響を受けません。完全に削減されたユーザーエージェントは、2023 年前半までに展開されます。

{% Aside %}

*   [開発者ガイド: ユーザーエージェント情報の削減](/docs/privacy-sandbox/user-agent/)

{% endAside %}

**文字列の変更は下位互換性が確保される予定**であるため、これらの特定の値が必要がない場合は、影響を受けません。 ただし、ユーザーエージェント文字列を解析して、ブラウザのマイナー/ビルドバージョン、OS/プラットフォームバージョン、またはデバイスモデルを抽出する場合は、[User-Agent Client Hints](https://web.dev/migrate-to-ua-ch/) に移行する必要があります。

## ストレージ分割

Cookie はクロスサイトトラッキングで最も多く使用される機能ですが、**プライバシーサンドボックスは、全体としてクロスサイトトラッキングに取り組む**ことを目的としており、これにはあらゆる形態のクロスサイトストレージが含まれています。 [2020 年に HTTP キャッシュを分割](/blog/http-cache-partitioning/)した方法と同様に、IndexedDB や locerStorage などの**ストレージ API**、BroadcastChannel や SharedWorker などの通信 API、ServiceWorker などの両方のカテゴリにまたがる機能も分割する予定です。

{% Aside %}

*   [GitHub Explainer: ストレージ分割](https://github.com/privacycg/storage-partitioning#introduction)

{% endAside %}

[この作業については、Intent to Prototype (I2P)](https://groups.google.com/a/chromium.org/g/blink-dev/c/WXNzM0WiQ-s/m/l10NGhaoAQAJ) を送信しました。つまり、さまざまな API の設計と初期コードを進めています。 現在の [Chrome 105 Canary](https://chromiumdash.appspot.com/schedule) では、**ローカル開発者のテスト**を可能にするフラグを提供する予定です。 これらの変更は、全体的なサードパーティ Cookie の段階的廃止に先立って、2023 年前半に完了するため、標準 Chrome 開発プロセスで進められます。

## 開発者向けのドキュメントとサポート

プライバシーサンドボックス全体を調べられるように、Web と Android 間でプロジェクトの概念、 目標、およびタイムラインを提供する [privacysandbox.com](https://privacysandbox.com/) があります。 [developer.chrome.com/privacy-sandbox/](/docs/privacy-sandbox/) では、個々の提案、デモ、テスト、実装ガイドの詳細と、関連するさまざまなリソースへのリンクを検索することができます。

プライバシーサンドボックスのさまざまなトピックで、**開発者の業務時間**内にセッションが定期的に開催されています。 各セッションでは、エンジニアリングチームと製品チームを招き、デモを実行し、実装とテストに関する質問にお答えします。 各セッションは、[@ChromiumDev の Twitter](https://twitter.com/ChromiumDev) と、該当する API のメーリングリストで公開されます。 すでにさまざまなタイムゾーンで日本語セッションと再配信が提供されていますが、今後もデモの字幕付き動画を投稿し、トピックや質問を事前に簡単に提出できるように、プログラムを改善していきます。

{% Aside %}

さらに、次の 2 つの**アトリビューションレポート** セッションが予定されています。

*   英語 - 8 月 11 日木曜日 @ 15:00-16:30 GMT
*   日本語 - 8 月 19 日金曜日 @ 10:00-11:30 JST (01:00-02:30 GMT)

詳細については、[attribution-reporting-api-dev メーリングリスト](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev/c/s3QYro6SjeE/m/R6jI9TseAgAJ)のお知らせをご覧ください。

{% endAside %}

また、 **[GitHub に開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)** も用意されています。 イシューが発生した場合や、質問をどこに問題を提起すべきか分からない場合は、 イシューを投稿すると、当社が回答を行ったり、照会する適切な場所を見つけるお手伝いをしたりします。

## フィードバックの提供と共有

プロジェクトとしてのプライバシーサンドボックスは Google によって開始されましたが、目標は、Chrome の機能変更だけでなく、**Web プラットフォーム全体を変更する提案**を行うことです。 これは、ブラウザベンダー、サイト所有者、および最も重要なそれらのサイトとブラウザの利用者であるユーザーを含む多数のグループにわたる、オープンなコラボレーションプロセスです。 結果となる仕様は、非常に明示的で正式な言語で書かれていますが (実装するのに十分なプロセスを定義する必要があるため)、仕様が適切なことを確認するプロセスには、全員からの情報入力が必要です。

他に誰がテストしているのか、その結果がどのように共有されるかを知りたいという多くの企業から問い合わせがあります。 **テスト計画と結果を公開決定するのは、テストを実行する皆さん次第です** が、公開することを強くお勧めします。 W3C、GitHub、メーリングリストには多数の公開フォーラムがあり、他のステークホルダーと直接共有できます。 これは、オリジントライアルに積極的に参加していること、実装に必要なすべての材料が用意されていたかどうか、またはテスト結果の詳細分析を示すのと同じくらい簡単かもしれません。 また、独自のサイトやブログに公開したり、特に対話したい特定のオーディエンスがある場合はソーシャルアカウントに公開したりできます。

{% Aside %}

フィードバックのハイライト:

*   **Yahoo! Japan** 初期のアトリビューションレポートテストの結果に関する[ホワイトペーパー](https://github.com/WICG/attribution-reporting-api/issues/201)。
*   [Topics](https://support.google.com/admanager/answer/12270543) オリジントライアルに関する **Google Ad Manager** 初期計画。

{% endAside %}

**[フィードバックページでは、さまざまなルートのそれぞれ](/docs/privacy-sandbox/feedback/)** と、各 API のアクティブなルートについて説明します。 また、[フィードバック フォーム](/docs/privacy-sandbox/feedback/#feedback-form)経由で当社に直接フィードバックを提供することもできます。

最終的に、Cookie の動作を変更することで、28 年間 Web の一部であった技術を変更します。 Web は私たち全員に属しています。これらの変更に取り組み、よりプライベートな環境を可能にしながら、誰にとっても魅力的な豊かでオープンなエコシステムを可能にする理想的なミックスを追求するには、皆さんからの情報と方向性の提供が必要です。 この計画にご協力ください。
