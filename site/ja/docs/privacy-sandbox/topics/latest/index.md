---
layout: layouts/doc-post.njk
title: Topics API の最新アップデート
subhead: API の設計と実装に対する更新と機能強化。
description: API の設計と実装に対する更新と機能強化。
date: 2023-01-24
authors:
  - leeronisrael
  - joeytrotz
---

{% Aside %}

技術リソースについては、開発者ガイドを参照してください。

- [ウェブプラットフォーム](/docs/privacy-sandbox/topics/)
- [Android](https://developer.android.com/design-for-safety/privacy-sandbox/guides/topics)

技術的でない概要については、[privacysandbox.com のトピックの概要](https://privacysandbox.com/intl/en_us/proposals/topics/)をご覧ください。

{% endAside %}

## 新しい分類法とヘッダーのサポートの拡大

**2023 年 6 月 15 日**

**分類** - トピックの分類が[拡大・改善](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md)されました。「Athletic Apparel」、「Mattresses」、「Luxury Travel」など、商業に焦点を当てた 280 個のカテゴリを追加し、「Civil Engineering」や「Equestrian」など、160 個のカテゴリを削除しました。Chrome がこの新しい分類を使用し始めるのは今年後半ですが、確認してフィードバックを送信することができます。

**リクエスト ヘッダー** - 最初のトピック提案では、開発者はクロスオリジン iframe から`document.browsingTopics()`を呼び出す必要がありました。この要件により遅延が発生し、デジタル広告オークションに課題が生じ、Web ページの速度が低下する可能性があるというフィードバックを受け取りました。昨年、フェッチおよび (一時的に) XHR 経由で開始されたリクエストにおける、ヘッダー経由のトピックのサポートを発表しました。最近、 `browsingtopics`属性を含む iframe のリクエスト ヘッダーのサポートを拡張する予定であると発表しました。これらの変更により、Topics のパフォーマンスが向上し、開発者とユーザーに対する潜在的な悪影響が制限されます。

**先祖トピックの観察** - Chrome は、「観察」の定義に特定のトピックの全先祖を含めるように更新しました。現在、呼び出し元が `/Shopping/Apparel/Footwear/Boots` を観察すると、Boots だけでなく Shopping、Apparel、および Footwear も観察されるようになっています。以前は、呼び出し元が Shopping、Apparel、または Footwear を観察するようにするには、呼び出し元がそのトピックを持つページにユーザーがアクセス済みであることを観察する必要がありました。

これらの変更および今後の変更の詳細については、[Topics API の機能強化](/blog/topics-enhancements/)をご覧ください。

## Chrome の Topics への取り組み

**2023 年 1 月 24 日**

W3C Technical Architecture Group による Topics の初期設計レビューに続き、エコシステムの関係者から、これが Topics API にとって何を意味するかについての質問をいくつか受けました。

[Twitter でお知らせ](https://twitter.com/vkw/status/1614001374873944066?s=20&t=BAGWkeoOEwq4yex_JpDNDw)したように、今年 Topics API を Chrome 安定版で利用できるようにし、公開開発プロセスを継続することに取り組みます。Topics API は、サード パーティ Cookie に比べてプライバシーを大幅に改善し、クロスサイトトラッキングを制限し、ウェブをよりプライベートにするための重要な構成要素です。これは、サード パーティ Cookie が利用できなくなった場合に、サイト運営者と広告主にインタレストベース広告への情報を提供するための重要なシグナルとなります。

Chrome で Topics がリリースされると、ブラウザの相互運用性という長期的な目標に向けて取り組みを続けながら、ウェブコミュニティに Topics の実際の動作を観察する機会が提供されます。Topics の[テスト](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md)の設計と開始に向けて、エコシステム全体で膨大な量の取り組みが行われているのを見てきたため、2023 年以降での API を改善に意気込んでいます。

## Topics の初期テスターからのインサイト

**2023 年 1 月 9 日**

Chrome での Topics のテストはまだ初期段階にあり、技術的な安定性と API のコア機能の検証に重点を置いていますが、一部の初期テスターが Topics の背後にあるビジネスロジックの側面を調査し、そのインサイトを公に共有しているのを見るのに勇気づけられています。たとえば、[Xandr](https://medium.com/xandr-tech/on-the-topic-of-topics-298f95e39269) は、Topics の分類器が Xander 独自のウェブサイト分類法とどのように比較されるかを調査し、Criteo は、Topics がスタンドアロンのシグナルとして、ユーザーと広告主サイトとの将来のインタラクションを予測する能力を評価しました。個別の分析では、プライバシーサンドボックステクノロジーの実際のパフォーマンスを有意義に予測することはできませんが、建設的な対話やサーフェス分野の改善を促すことができます。2023 年にはより総合的なユーティリティ テストが可能になるため、Topics を最適化し、デジタル広告製品での使用に関するベストプラクティスを開発する上で、業界の関与が深まることを期待しています。Topics をテストしている場合は、[Topics API テスターリスト](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md)で計画とインサイトを共有することをお勧めします。

## 2022 年第 3 四半期の Topics に関するエコシステムのフィードバック

**2022 年 10 月 27 日**

[CMA](https://www.gov.uk/government/organisations/competition-and-markets-authority) への取り組みの一環として、Chrome は、GitHub のイシュー、[プライバシーサンドボックスのフィードバックフォーム](https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform)、業界関係者との会議、ウェブ標準フォーラムなどのさまざまな情報源から受け取ったフィードバックをまとめた、プライバシーサンドボックスの提案に関するフィードバック レポートを四半期ごとに発行しています。2022 年第 3 四半期レポートには、ホスト名から関心のあるトピックを推測するための Topics システムの精度、トピック分類の粒度、さまざまな種類や規模のウェブサイトに対する Topics の有用性といった [Topics のフィードバックのテーマが](/docs/privacy-sandbox/feedback/report-2022-q3/#topics)含まれています。（過去のレポート: [2022 年第 2 四半期](/docs/privacy-sandbox/feedback/report-2022-q2/#topics) | [2022 年第 1 四半期](/docs/privacy-sandbox/feedback/report-2022-q1/#show-relevant-content-and-ads)）[フィードバックの提供に関する一般的なガイダンス](/docs/privacy-sandbox/feedback/)が用意されています。このページを下にスクロールすると、私たちがエコシステムからの意見として求めている特定の領域に関する「Topics の改善にご協力ください」セクションがあります。

## Topics のオリジントライアルを Chrome ユーザーの 5% に増加

**2022 年 10 月 26 日**

Chrome は、Topics を含む[プライバシー サンドボックス広告関連オリジントライアル](/blog/privacy-sandbox-origin-trial-increase/)の[トラフィックを、Chrome 安定版トラフィックの 1% から 5% に増加](/origintrials/#/view_trial/771241436187197441)し始めました。このトライアルは 8 月から Chrome 安定版で利用可能になっており、初期テスターからのフィードバックにより API の安定性が向上したため、トライアル対象者を拡大することになりました。2022 年を通して機能テストを継続し、2023 年のユーティリティテストに備えます。テスターがユースケースに合わせて Topics API を評価するのに役立つユーティリティテストガイダンスの詳細については、続報をお待ちください。オリジントライアルの進行状況やその他の開発者向け最新情報に関する通知をご希望の場合は、[Topics API Announcements メールグループ](https://groups.google.com/u/1/a/chromium.org/g/topics-api-announce)に参加してください。

## GitHub で Topics テスターページを公開

**2022 年 10 月 11 日**

Topics テストに関する情報を統合するために、Topics テスターがテスター自身を識別し、学習内容にリンクできる[テスターリストページを GitHub](https://github.com/patcg-individual-drafts/topics/blob/main/topics-tester-list.md) に作成しました。このリストは自主的かつ自己申告によるものであるため、すべてのテストアクティビティが完全であったり、それを代表したりするものである必要はありませんが、インサイトをコミュニティと共有し、他の人にも参加を促したいと考えているテスターに​​とって有用なハブとなることを期待しています。Topics をテストしている場合、またはテストの計画を立てている場合は、このリストに組織を追加してください。詳細な手順はそのページに記載されています。

## Topics の改善にご協力ください

プライバシーサンドボックスチームは、Topics API の設計、実装、有効性に関するあらゆるフィードバックを歓迎しています。GitHub 上の[Topics の提案に関するイシュー](https://github.com/patcg-individual-drafts/topics/issues)でディスカッションに参加し、質問を提起することができます。[プライバシーサンドボックスのフィードバックフォーム](https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform)からフィードバックを送信することも可能です。

ここでは、Chrome チームがテスターやその他の関係者からの意見を求めている特定の領域をいくつか紹介します。

### Topics 分類

ウェブバージョンにおける Topics の[初期分類](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)には、「Arts &amp; Entertainment」、「Home &amp; Garden」、「Travel &amp; Transportation」などのカテゴリにわたる約 350 個のトピックが含まれています。このリストは明らかにデリケートなトピックを除外するために人間によって厳選されていますが、一部のトピックがデリケートなトピックと意図しない相関関係を持っている可能性があることを認識しています。最終的な目標は、エコシステム全体からのフィードバックやアイデアを組み込んだ外部パーティから分類を取得することです。一部の関係者は、分類が十分に細分化されていないのではないかとの懸念を表明していますが、一方では、分類は地域レベルおよび国レベルの変動を考慮すべきだと主張する人もいます。

- [**どの分類を使用する必要があるか？**](https://github.com/patcg-individual-drafts/topics/issues/3)誰がそれを作成し、管理する必要があるか？
- [**デリケートなカテゴリを決定するためには、どのような標準が使用される可能性があるか？**](https://github.com/patcg-individual-drafts/topics/issues/4)詳細については、[Topics の Explainer リポジトリ](https://github.com/patcg-individual-drafts/topics/issues/78)をご覧ください。

### ウェブサイトの分類

Topics は、サイトのホスト名をトピックにマッピングする分類器モデルを使用して Chrome によって推論されます。一般の人は、分類器をローカルにダウンロードするか、[Topics colab](https://colab.sandbox.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn?usp=sharing) を使用するか、`chrome://topics-internals` を利用することで、分類器を検査できます。一部の関係者は、「誤って分類されたサイト」の個々の例を共有しています。ホスト名レベルでの分類では、多様なコンテンツを含むサイトのトピックが効果的に割り当てられないと示唆する人もいます。

- [**サイトは独自のトピックを提供できるべきか？**](https://github.com/patcg-individual-drafts/topics/issues/1)さらに詳しいディスカッションは[こちら](https://github.com/patcg-individual-drafts/topics/issues/50)をご覧ください。
- [**サイトがブラウザによって割り当てられたトピックと一致しない場合はどうすればよいか？**](https://github.com/patcg-individual-drafts/topics/issues/2)
- [**分類器はホスト名以外の追加データ（ページ URL、ページコンテンツなど）を考慮する必要があるか？**](https://github.com/patcg-individual-drafts/topics/issues/17)

### トピックのランキング

[エポック](/docs/privacy-sandbox/topics/topic-classification/#how-the-users-top-five-topics-are-selected)の上位 5 つのトピックは頻度に基づいて選択されます。つまり、ブラウザは、特定の週のユーザーの閲覧履歴に最も頻繁に表示された 5 つのトピックを選択します。一部の関係者は、逆文書頻度（TF-IDFA）、トピック別の商業的価値の概念、ウェブ上の広告ランディングページの頻度などの変数を含む、トップトピックを計算するための代替アプローチを共有しています。

- [**ユーザーのトップトピックを選択する際に、他にどのような変数を考慮する必要があるか？**](https://github.com/patcg-individual-drafts/topics/issues/42)これらの変数は重み付け方法は？
