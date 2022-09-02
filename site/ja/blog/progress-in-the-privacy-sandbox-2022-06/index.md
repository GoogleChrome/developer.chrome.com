---
title: プライバシーサンドボックスの進捗状況（2022 年 5 月 ～ 6 月）
description: >
  アトリビューション レポート、FLEDGE、Topics、Fenced Frames、共有ストレージに関するプライバシーサンドボックスの関連性と測定の拡張トライアルを含む更新情報。 2022 年第 1 四半期のフィードバック要約レポートを公開し、さらに多くの開発者オフィスアワーを開催しました。
layout: 'layouts/blog-post.njk'
date: 2022-07-08
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/qDtYpUkWP0DtqmpIVXli.png'
alt: >
  プライバシーサンドボックスのロゴ
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

このエディションの「**[プライバシーサンドボックスの進捗状況](/tags/progress-in-the-privacy-sandbox/)**」へようこそ。Chrome におけるサードパーティ Cookie の段階的廃止とよりプライベートなウェブに向けた取り組みについて、2022 年 5 月と 6 月のマイルストーンの達成状況をお知らせします。 各エディションでは、[プライバシー サンドボックス](https://privacysandbox.com/open-web/)全体の更新情報とニュースをまとめてお届けしています。


## プライバシーサンドボックスの関連性と測定のオリジントライアル

**アトリビューション レポート**、**FLEDGE**、および **Topics** の複合オリジントライアルを継続して実行するとともに、**Fenced Frames** と**共有ストレージ**にもこのトライアルを拡張しています。 Fenced Frames は、コンテンツを表示するための制限付きコンテナで、FLEDGE が広告を表示するために使用するフレームです。 共有ストレージは、パーティション化されていないストレージを慎重にゲート化し、そこに保管されたデータへのアクセスを広告選択プロセスの一環として許可することで、Fenced Frames の補完的機能を果たします。

オリジントライアルは現在、**[Chrome Beta ユーザーの 50％ を対象に展開](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs)** されています。 この段階では、大規模な有効性またはユーティリティのテストに進む前に、インフラストラクチャのセットアップ、開発者 のエクスペリエンス、およびユーザーインターフェイスのテストに焦点が当てられています。 このテストでは、[Topics で null 値が正しく処理されないというクラッシュバグ](https://bugs.chromium.org/p/chromium/issues/detail?id=1321140)を発見し、修正しました。 これらの初期段階のテストでは、機能に実際のトラフィックを流し始めるため、課題が見つかることが一般的です。 このため、影響を最小限に抑えながら課題を見つけられるように、トラフィック全体のごく一部からテストを開始しています。 ただし、この課題にはその少数のユーザーにおいてもブラウザーがクラッシュする可能性があったため、修正が公開されるまで、オリジントライアルで Topics API を無効にしました。 この修正は現在では完了しており、Topics はオリジントライアル内でもう一度有効化されています。

この段階でのフィードバックとテストは、ユーザーが必要とする機能を確実に提案して構築する上で欠くことのできない工程です。 現在オリジントライアルに参加している場合は、フィードバックやイシューへの対応と利用可能な機能の拡張が進むにつれ、コードの継続的な定期更新を期待できます。

**[オリジントライアルに今すぐ登録](/origintrials/#/view_trial/771241436187197441)** できます。 **[参加方法やテスト方法、多様なデモ、およびトライアルに関するフィードバックの提供先に関するの詳しい説明](/blog/privacy-sandbox-unified-origin-trial/)** を用意しています。


## フィードバック

ウェブエコシステム全体のさまざまな関係者から得られるフィードバックは、プライバシーサンドボックスイニシアチブ全体にとって非常に重要です。 既存の公開チャネルの概要は、**専用の[フィードバックセクション](/docs/privacy-sandbox/feedback/)** で説明されています。このチャネルではディスカッションのフォローやそれへの参加が可能で、Chrome チームにいつでも直接連絡できるフィードバックフォームも用意されています。

皆さんからのフィードバックとその対応について、**[2022 年 第 1 四半期のフィードバック概要レポート](/docs/privacy-sandbox/feedback/report-2022-q1/)** にまとめました。 たくさんの内容が含まれていますが、すべてに目を通す必要はありません！ 提起された質問やイシューの種類、それらへの対応状況について、大まかに理解していただけることを狙いとしています。 開発者がフィードバックの提供経路ルートを簡単に利用できるようにすることを目指しているため、ご質問やご不明な点があれば、ぜひご連絡ください。

**[アトリビューション レポートに関する概要セッションを織り込んだプライバシーサンドボックスオフィスアワー](https://groups.google.com/a/chromium.org/g/attribution-reporting-api-dev/c/NLbPwiwj3BE)** を引き続き開催しています。 これは、実装チームに直接質問するチャンスです。 また、このセッションを日本語でも開催するほか、更新されたデモのウォークスルーセッションも実施することを計画しています。 他の API やプロジェクトの側面を説明するオフィスアワーも準備される予定ですが、これについては、メーリングリスト、ブログ、および [Twitter](https://twitter.com/ChromiumDev) でお知らせいたします。


## クロスサイトプライバシーの境界の強化

サードパーティ Cookie は、クロスサイトトラッキングを可能にする重要なメカニズムです。 このメカニズムの段階的廃止を実現することは大きなマイルストーンではありますが、他の形態のクロスサイトストレージやコミュニケーションについても解決する必要があります。


### Cookie

Cookie 関連の提案が進展するにつれて、自社サイトの `SameSite=None` または **クロスサイト Cookie** を監査し、サイトに実施する必要のあるアクションを計画する必要があります。


#### CHIPS

[CHIPS (Cookies Having Independent Partitioned State)](/docs/privacy-sandbox/chips/) を使用すると、トップレベルサイトごとに個別のクッキージャーを用意し、Cookie を「パーティション化された」ストレージにオプトインすることができます。 現在、[現行のオリジントライアルを Charome 104 の最後（8 月末ごろ）まで延長](https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY)しようとしています。 **[CHIPS オリジントライアルに今すぐ](/origintrials/#/view_trial/1239615797433729025)** 登録しましょう。**[開発者向けの指示書](/blog/chips-origin-trial/)** が提供されているため、独自の本番サイトで `Partitioned` 属性を使った Cookie をテストできます。


#### Cookie に関するその他の更新

また、プライバシーサンドボックスの旗印の下にある変更に加えて、Cookie の一般的なデフォルト機能のクリーンアップと改善も続けています。 **[デフォルトでオリジンにバインドされた Cookie に関する I2P（Intent to Prototype）](https://groups.google.com/a/chromium.org/g/blink-dev/c/xKTem_X2LU8)** を提出済みです。これにより、Cookie のデフォルト設定がより安全になります。 以前の `SameSite= Lax` のデフォルトの変更により、Cookie はデフォルトで同一サイト（または「ファーストパーティ」）に制限されていましたが、それでも異なるポートまたは URL スキームを介せば送信できます。 この更新では、Cookie は、`Domain` 属性で明示的に許可されていない限り、設定されたの正確なオリジンにのみ送信されます。

また、**[アウトバウンドのフェッチリクエストで `Set-Cookie` ヘッダーをブロック](https://groups.google.com/a/chromium.org/g/blink-dev/c/SyHAsPfO004)** することで、Chrome を Fetch の仕様に一致するようにしています。 レポートによると、この機能の使用率は非常に低いことが示されていますが、この機能に依存している場合、これらの Cookie はすぐに設定されなくなることに注意してください。


### 共有ストレージ

共有ストレージを使用すると、サイトは分割されていないデータを保存できますが、慎重に構築された出力ゲートを備えた安全な環境でのみそのデータを読み取ることができます。 共有ストレージは、安全な環境を提供する Fenced Frames と組み合わせることで、キャンペーンに対する A/B テストなどのユースケースを可能にします。

**[共有ストレージの I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/jDx8z5a6ovk)** では、より広範な[プライバシーサンドボックスの関連性と測定のオリジントライアル](/origintrials/#/view_trial/771241436187197441)の一環としてテストすることが可能です。 **[開発者向けのドキュメント](/docs/privacy-sandbox/shared-storage/)** には、ユースケースとテストが含まれています。


## 隠されたトラッキングの防止

明示的なクロスサイトトラッキングに使用されるオプションを減らすため、ユーザーのフィンガープリントまたは隠されたトラッキングを可能にする情報を公開するウェブプラットフォームの領域に対処する必要があります。


### User-Agent 文字列の削減と User-Agent Client Hints

引き続き、[Chrome のユーザーエージェント文字列で受動的に利用できる情報を段階的に減らし、その情報を積極的に要求する必要のあるサイトに代替の User-Agent Client Hints（UA-CH）を提供](/docs/privacy-sandbox/user-agent/)しています。 最初のフェーズはマイナーバージョン番号を 0 にすることでしたが、これは、**[Chrome 101 以降で完了](https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/m/xDC3QIjgBQAJ)** しています。

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0 (Linux、Android 12、Pixel 6) AppleWebKit/537.36（KHTML、Gecko など）Chrome/101.<span  style="background: #ef9a9a">0.4638.16</span> Mobile Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0（Linux、Android 12、Pixel 6）AppleWebKit/537.36（KHTML、Gecko など）Chrome/101.<span style="background: #a5d6a7">0.0.0</span> Mobile Safari/537.36</span> {% endCompare %}

現在は、Client Hints の全般的な動作を改良し、更新し続けています。 これには、レガシーヒント（`dpr`、`width`、`viewport-width`、および `device-memory`）がサードパーティのサブリソースにデフォルトで送信されないように、これらの[デフォルトのクリーンアップ](https://groups.google.com/a/chromium.org/g/blink-dev/c/PUymAUxfjVg)が含まれています。


### Accept-Langugage の削減

`Accept-Language` ヘッダーは、ユーザーの言語設定をサイトに送信します。これは、ローカライズされたコンテンツを配信するのに役立ちますが、特にユーザーが複数の言語を使用できるようにしている場合などには、パッシブなフィンガープリント情報のソースにもなります。 そこで、**[`Accept-Language` ヘッダーのフィンガープリントサーフェスを削減する I2P](https://groups.google.com/a/chromium.org/g/blink-dev/c/V4FS3zMbZ08)** を提出しました。

その意図は、サイトへの最初のリクエストで、ブラウザがヘッダーで最も優先される言語（`Accept-Language: fr` など）のみを送信することです。 サイトのレスポンスでは、レスポンスの `Content-Language` を指定し、`Vary` や `Variants` ヘッダーを使用して、使用できる言語が複数存在するかどうかを示します。 たとえば、以下のようになります。

```diff
Get / HTTP/1.1
Host: example.com
Accept-Language: fr

HTTP/1.1 200 OK
Content-Language: fr
Vary: Accept-Language
Variants: Accept-Language=(de en fr)
```

最上位の選択肢が利用できない場合、ブラウザは `Variants` の情報を使用して、優先言語でコンテンツを再リクエストできます。 I2P は、このような変更による潜在的な影響について話し合いを持ち、その影響を監視するための適切なメトリックをセットアップできるように、意図的にプロセスの早い段階で提出されています。


### Fenced Frames

Fenced Frame（`<fencedframe>`）は、埋め込みコンテンツ用に提案されている HTML 要素で、iframe に似ています。 ただし、Fenced Frame は、埋め込みコンテキストとの 通信を制限して、フレームが埋め込みコンテキストと共有せずにクロスサイトデータにアクセスできるようにする点で、iframe とは異なります。 たとえば、FLEDGE では、Fenced Frame 内に広告を表示することを意図しています。

[新しい開発者向けの概要コンテンツ](/docs/privacy-sandbox/fenced-frame/)をお読みください。 **[Fenced Frames の I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/y6G3cvKXjlg)** は公開済みであり、より広範な[プライバシーサンドボックスの関連性と測定のオリジントライアル](/origintrials/#/view_trial/771241436187197441)の一環として登録できるようになっています。


## 関連するコンテンツと広告の表示

サードパーティ Cookie の段階的廃止に向けて、サイトが依存していた主要なユースケースを有効にし、クロスサイトトラッキングを有効にしなくてもコンテンツで収入を得続けられるようにする API を導入しています。


### Topics

[Topics API](/docs/privacy-sandbox/topics/) は、クロスサイトトラッキングを使用せずに、インタレストベース広告を可能にする提案です。 プライバシーサンドボックスの関連性と測定のオリジントライアルの一環として [Topics を含める I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs) を送信しました。 また、オリジントライアル中には、[Topics のテストとフィードバックの提供に関する新しい開発者ガイド](/docs/privacy-sandbox/topics-experiment/)もご利用いただけます。

これは早期のテスト段階であるため、コード内にイシューが見つかるたびに、それらを積極的に調査して対処しています。 Topics では、[クラッシュバグ](https://bugs.chromium.org/p/chromium/issues/detail?id=1321140)が見つかったため、ユーザーエクスペリエンスに過度な影響を与えないよう、オリジントライアルに修正が公開されるまで、API を一時的に無効化しました。 その修正が完了したため、Topics API は現在では総合的なオリジントライアルの一環として [Chrome Beta ユーザーの 50% を対象に公開](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs)されています。


### FLEDGE

[FLEDGE](/docs/privacy-sandbox/fledge/) は、個人の識別子に依存することなく、以前にアクセスしたサイトまたは製品を利用できる広告を実行することで、リマーケティングとカスタムオーディエンスのユースケースを実現します。 より広範なプライバシーサンドボックスの関連性と測定のオリジントライアルの一環として有効にするために、[FLEDGE の I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg) をもう一度送信しました。 同様に、これに対応する[実験用の開発者ドキュメントも提供](/docs/privacy-sandbox/fledge-experiment/)されています。


## デジタル広告の測定

クロスサイトトラッキングを使用せずに広告を表示するためのコンパニオンとして、これらの広告の有効性を測定するプライバシー保護ツールが必要です。


### Attribution Reporting API

**[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/)** を使うと、アドテクや広告主は、広告のクリックや閲覧といった、別のサイトでのコンバージョンにつながるイベントを、クロスサイトトラッキングを有効にせずに測定できるようになります。 これについても、プライバシーサンドボックスの関連性と測定のオリジントライアルの一環としてテストを拡張し続けるための、[アトリビューションレポート の I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y) を提出しました。

オリジントライアルの初期フェーズでは、[デバッグ](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/#debugging)など、開発者のエクスペリエンスと統合に関するフィードバックに焦点を当てていますが、これは、イベントレベルレポートと要約レポート全体のエンドツーエンドテストを網羅するように拡張されます。


## 記事に関するフィードバック

これらの更新を継続的に公開し、プライバシーサンドボックス全体をさらに進展させられるように、開発者であるユーザーが必要とする情報やサポートが確実に提供されるようにしたいと考えています。 この連載において何か改善できることがございましたら、[@ChromiumDev Twitter](https://twitter.com/ChromiumDev) にお知らせください。 皆さんのご意見をフォーマットの継続的な改善に活用させていただきます。
