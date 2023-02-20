---
layout: layouts/doc-post.njk
title: フィードバックレポート - 2022 年第 1 四半期
subhead: >
  プライバシーサンドボックスの提案と Chrome の対応について受け取ったエコシステムフィードバックを要約した 2022 年第 1 四半期の四半期報告書。
description: >
  プライバシーサンドボックスの提案と Chrome の対応について受け取ったエコシステムフィードバックを要約した 2022 年第 1 四半期の四半期報告書。
date: 2022-05-17
authors:
  - rowan_m
---

英国公正取引委員会へのコミットメントの一環として、Google は、プライバシーサンドボックスの提案に関する利害関係者のエンゲージメントプロセスに関する四半期報告書を公に提供することに同意しました（[コミットメント](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)の段落 12 および 17(c)(ii) を参照）。 プライバシーサンドボックスに関するこれらのフィードバック要約報告書は、[フィードバックの概要](/docs/privacy-sandbox/feedback/)にリストされているさまざまなソースから Chrome が受け取った フィードバックを集計して生成されます。これらのソースには、GitHub の課題、[privacysandbox.com](https://privacysandbox.com/) で提供されているフィードバックフォーム、業界関係者との会議、Web 標準フォーラムが含まれますが、これらに限定されません。 Chrome は、エコシステムからフィードバックを受け取り、そこから得た情報を設計上の決定に統合する方法を積極的に模索しています。

フィードバックのテーマは、API ごとの普及率によってランク付けされます。 これは、Chrome チームが特定のテーマについて受け取ったフィードバックの量を集計し、量を降順に整理することによって行われます。 一般的なフィードバックのテーマは、公開会議（W3C、PatCG、IETF）、直接受けたフィードバック、GitHub、および Google の内部チームと公開フォームを通じて提示される一般的な質問からのディスカッションのトピックを確認することによって特定されました。

より具体的には、ウェブ標準機関の会議の議事録がレビューされ、直接フィードバックについては、Google の 1 対 1 で行われた関係者会議の記録、個々のエンジニアが受信したメール、API メーリングリスト、および公開フィードバックフォームが考慮されました。 次に、Google は、これらのさまざまなアウトリーチ活動に関与するチームの間で調整を行い、各 API に関連して出現するテーマの相対的な普及率を決定した。

フィードバックに対する Chrome の対応の説明は、公開された FAQ、関係者によって提起された課題に対する実際の対応、およびこの公開報告活動の目的のための位置決めの決定から作成されました。 開発とテストの現在の焦点を反映して、特に Topics、Fledge、アトリビューション レポートの API とテクノロジーに関しての質問とフィードバックが寄せられています。

最近受け取ったフィードバックについては、まだ Chrome の対応が検討されていない可能性があります。


{% Details %} {% DetailsSummary %}

**頭字語（略字）の用語集**

{% endDetailsSummary %}

<dl>
<dt>W3C</dt>    <dd><a href="https://www.w3.org/">ワールドワイドウェブコンソーシアム</a></dd>
<dt>PatCG</dt>  <dd><a href="https://www.w3.org/community/patcg/">プライベートアドテクノロジーコミュニティグループ</a></dd>
<dt>IETF</dt>   <dd><a href="https://www.ietf.org/">インターネットエンジニアリングタスクフォース</a></dd>
<dt>DSP</dt>    <dd>デマンドサイドプラットフォーム</dd>
<dt>SSP</dt>    <dd>サプライサイドプラットフォーム</dd>
<dt>OT</dt>     <dd><a href="/blog/origin-trials/">オリジンライアル</a></dd>
<dt>UA</dt>     <dd><a href="/docs/privacy-sandbox/user-agent/">ユーザーエージェント文字列</a></dd>
<dt>UA-CH</dt>  <dd><a href="/docs/privacy-sandbox/user-agent/">User-Agent Client Hints</a></dd>
<dt>IP</dt>     <dd>インターネットプロトコルアドレス</dd>
<dt>WIPB</dt>   <dd><a href="/docs/privacy-sandbox/gnatcatcher/">Willful IP Blindness</a></dd>
<dt>IAB</dt>    <dd><a href="https://www.iab.com/">Interactive Advertising Bureau</a></dd>
<dt>openRTB</dt><dd><a href="https://iabtechlab.com/standards/openrtb/#:~:text=OpenRTB%20is%20the%20communication%20protocol,in%20the%20digital%20advertising%20industry.">リアルタイム入札</a></dd>
<dt>CHIPS</dt>  <dd><a href="/docs/privacy-sandbox/chips/">Cookies Having Independent Partitioned State</a></dd>
<dt>FPS</dt>    <dd><a href="/docs/privacy-sandbox/first-party-sets/">First Party Sets</a></dd>
<dt>FedCM</dt>  <dd><a href="/docs/privacy-sandbox/fedcm/">Federated Credential Management</a></dd>
<dt>IDP</dt>    <dd>ID プロバイダー</dd>
</dl>

{% endDetails %}



## すべてのフィードバックソースに見られる共通のテーマ

ディスカッションとフィードバックチャネルに共通するテーマは、テストのタイミング、トラフィックレベル、および可用性に関する質問です。 特に、テスターは、API がいつテスト可能になるか、テストが世界的に利用可能になるかを常に確認したいと考えています。

このフィードバックに対処するために、Chrome はさまざまな伝達手段を使用してテストが世界的に公開されることを告知してきました。これと同じ内容については FAQ でも確認できるようにする意向です。 さらに、Chrome は CMA との協議の上、公開スケジュールを定期的に更新し続けたいと考えています。


## 関連するコンテンツと広告の表示


<table>
  <tr>
   <td style="background-color: #f3f3f3"><strong>API/テクノロジー</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>フィードバックのテーマ</strong>
<p>
<strong>（普及率でランク付け）</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>質問と懸念事項の要約</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Chrome の対応</strong>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>粗粒トピックの有用性 
   </td>
   <td>粗粒度の高いトピックの分類は、インタレストベース広告にはあまり有用でない可能性があるという懸念が提起されています。
   </td>
   <td>テストを通して API の有用性を探ります。 Chrome は、テスト結果に基づいて分類を進化させられることを期待しています。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>分類 
   </td>
   <td>業界関係者は、分類に影響を与える発言権を持ちたいと考えています。
   </td>
   <td>Chrome は分類に関する意見を受け付けています。 Chrome は、分類法を変更するためのガバナンスモデルに関するフィードバックや、他の業界団体が長期的に分類法の開発と維持においてより積極的な役割を果たすことのできる方法についての議論に大きな関心を抱いています。 
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>さまざまなタイプのサイトでの有用性
   </td>
   <td>トラフィックのレベルやコンテンツの専門性に応じて、サイトの有用性について懸念が提起されています。
   </td>
   <td>テストを通して API の有用性を探ります。 Chrome は、テスト結果に基づいて分類法とその他のパラメーターを進化させられることを期待しています。 分類法またはパラメーターの進化には、下位互換性のない変更が不要な場合があります。 さらに、Chrome は、サードパーティCookie が廃止された後も、フィードバックから Topics API の進化への影響を得られ続けることを期待しています。<strong> </strong>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>サイト分類法
   </td>
   <td>サイトが Topics による分類を決定またはそれに影響を与えることができることが要求されています。
   </td>
   <td>Chrome はこの要求について調査していますが、サイトが「システムを悪用」してプライバシーを侵害する方法でユーザーをターゲットにしたり、広告の関連性を低下させたりする潜在的なリスクについての懸念を（ウェブブラウザコミュニティや DSP から）から耳にしています。 Chrome はフィードバックを求めており、潜在的な変更を検討しています。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>ノイズの多い信号
   </td>
   <td>ランダムなトピックを 5% 配信すれば、ノイズや誤った信号が増えすぎる可能性があります。
   </td>
   <td>ノイズはユーザーのプライバシーを保護するための重要な方法であり、ノイズのレベルとトピックの有用性はテストを通じて比較されます。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>サイト制御のサードパーティ権限
   </td>
   <td>サイドが Topics API を呼び出せるアドテクを選択できることが要求されています。
   </td>
   <td>要求されているこの機能は、<a href="https://github.com/patcg-individual-drafts/topics#specific-details=">Explainer</a> で述べられているとおり、「browsing-topics」権限ポリシーですでにサポートされています。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Topics API がページのパフォーマンスに及ぼす影響
   </td>
   <td>Topics API に依存した結果、最初の広告が表示されるまでの遅延に関する懸念
   </td>
   <td>Chrome は、パフォーマンスを向上させるために HTTP リクエストヘッダーでの Topics のサポートの可能性について<a href="https://github.com/patcg-individual-drafts/topics/issues/7">議論</a>しています。 テストを通じて、そのような変更が必要かどうかを確認します。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>プライバシー /ポリシー
   </td>
   <td>一部のサードパーティがそれを呼び出す人とトピックを共有するかどうかを、呼び出し元別にレスポンスをフィルタリングする目的についての質問
   </td>
   <td>エコシステムの多くの人から受けたフィードバックに基づいて、Chrome は、情報へのアクセスを、他の方法ではその情報にアクセスできなかった者に制限するこの設計を選択しました。 もちろん、Topics を受け取るサイト運営者とサードパーティはそれぞれに、どの情報をサイトで共有するかを決定することができます。 このような共有を行う場合、Chrome は、そのような共有についてユーザーに対して透明性を示し、コントロールを提供することを強く推奨します。
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>ドキュメント
   </td>
   <td>分類器と分類法が変更される頻度など、FLoC で行ったように、Chrome が使用する分類器モデルと分類法の詳細を網羅したドキュメントへの関心
   </td>
   <td>Chrome は、オリジントライアルの一部として使用されている <a href="https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md">分類法</a> をすでに提供しており、ウェブサイトをトピックに分類する分類器モデルは、オープンソースコードの一部として Chrome のコードベース内で利用できるようになっています。 オリジントライアルの一環として、Chrome はフィードバックを受け取り、それがどの程度うまく機能するかについての学習が集められたときに、どちらにも変更を加える権利を留保します。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>フリークエンシーキャップ
   </td>
   <td>キャンペーン内または広告グループ内のユーザーごとの頻度を制御できるようにしたい。
   </td>
   <td><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=a%20Trusted%20Server-,3.2%20On%2DDevice%20Bidding,-3.3%20Metadata%20with">FLEDGE は、オンデバイスオークションのフリークエンシーキャップ</a> をサポートします。  コンテキスト/ブランディングキャンペーンもサポートするために、FLEDGE も含まれている<a href="https://github.com/WICG/turtledove/issues/260">未解決のイシュー</a>があります。  別の開発中の API である<a href="https://github.com/pythagoraskitty/shared-storage#frequency-capping">共有ストレージ</a>と、サイト固有の上限も、追加のフリークエンシーキャップ制御に使用できます。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>FLEDGE がパフォーマンスに与える影響
   </td>
   <td>計算集約型の入札者が FLEDGE オークションに及ぼす潜在的な影響についての懸念
   </td>
   <td>Chrome は、サイトのパフォーマンスへの潜在的な影響について、開発者と<a href="https://github.com/WICG/turtledove/issues/287">活発に話し合っています</a>。 Chrome は、テスト中にさらに多くのことを学べる機会を期待しています。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>FLEDGE を他の機能でテストする
   </td>
   <td>他の機能（k-匿名性サーバー、Key-Value サーバーなど）を使ったテストはいつ、どのように行われるのか。
   </td>
   <td>Chrome は、テストを容易に進められるように、最初のオリジントライアル用の機能を段階的に展開しています。 Chrome は、他の機能のタイムラインを明確にすることがいかに重要であるかを認識しており、可能な場合は明確にする意向です。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>テストの調整
   </td>
   <td>複数のアドテクにまたがるテストを調整する方法
   </td>
   <td>Chrome では、異なるアドテクが同じユーザーを対象に実験できるように、実験を調整するための追加サポートの提供を検討しています。 これは Chrome パートナーシップアウトリーチの重要な焦点でもあり、業界団体も役割を果たすことに関心を示しています。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>インタレストグループの制限
   </td>
   <td>ユーザーを追加できる、またはオークションに含められるインタレストグループの数に制限はありますか？
   </td>
   <td>Chrome は、フィードバックと測定されたレイテンシーの影響に基づいて、テスト期間中のウェブページのパフォーマンスやユーザーエクスペリエンスの理由から、これらの制限を調整することができます。  バイヤーとセラーがリソースの使用量を調整できるようにする追加の方法について、テスターの間で継続的な議論が行われています。
   </td>
  </tr>
  <tr>
   <td>FLEDGE
   </td>
   <td>クロス API 機能
   </td>
   <td>アトリビューション レポートは FLEDGE とどのように連携しますか？
   </td>
   <td>完全な詳細はまだ未定であり、Chrome は第 2 四半期にこれに関する更新を行う予定です。 Chrome は、オリジントライアルの期間中、オークションの結果（勝ち負け）に関するイベントレベルのレポートを引き続き提供する予定です。
   </td>
  </tr>
</table>

## デジタル広告の測定


<table>
  <tr>
   <td style="background-color: #f3f3f3"><strong>API/テクノロジー</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>フィードバックのテーマ</strong>
<p>
<strong>（普及率でランク付け）</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>質問と懸念事項の要約</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Chrome の対応</strong>
   </td>
  </tr>
  <tr>
   <td>Attribution Reporting（およびその他の API）
   </td>
   <td>トラフィックのテスト
   </td>
   <td>テストに十分なトラフィックがあるかどうかが懸念される
   </td>
   <td>Chrome は、ユーザーコントロールに重大なバグやイシューがないことを確認するために、非常に少ないトラフィックでオリジントライアルを開始しています。 初期のテスターは、API が技術的な観点から意図したとおりに機能していることを確認する上で重要な役割を果たします。これにより、より大きなトラフィックに迅速に立ち上がることが可能です。 API が期待どおりに機能しているという確信が持てれば、Chrome はユーティリティテストをサポートできるよう、オリジントライアルを増やす意向です。
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>イベント登録のための人間工学
   </td>
   <td>サポートされているイベントの登録方法に関する質問。
   </td>
   <td>Chrome は、現在サポートされている登録方法を明確に示した回答を GitHub に公開しました。 Chrome は、エコシステムから現在の設計に関するフィードバックを収集し、提案された変更がこれらの懸念に十分に対応しているかどうか、またはさらなる更新が必要かどうかを確認しています。
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>ノイズ生成 
   </td>
   <td>集計レポートでノイズがどのように生成されるかについてもっと詳しく知りたい。
   </td>
   <td>Chrome は、ノイズが生成される体系的な方法の詳細を提供するために、GitHub に<a href="https://github.com/WICG/conversion-measurement-api/issues/306">回答を公開</a>しました。 Chrome は、ノイズをシミュレートし、OT 中にさまざまなパラメーターでテストするためのライブラリを提供する予定です。  Chrome では、集計レポートモードに関する追加の開発者向けドキュメントとガイドも提供する予定です。  
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>小規模サイトではデータの精度が低い
   </td>
   <td>小規模なサイトやキャンペーンでは、より精度の低いデータを受け取るのではないかと懸念されています。
   </td>
   <td>Chrome は、ノイズベースのプライバシー保護が小さなデータスライスに大きな影響を与えることを認識しています。 ただし、長期間にわたる集計などの方法でこの問題を解決できる可能性があります。また、非常に小さなデータスライス（1 つまたは2 つの購入など）に基づく結論が広告主にとって意味があるかどうかも不明です。 オリジントライアル中、Chrome は、テスターがこのイシューについてより具体的なフィードバックを提供できるように、さまざまなプライバシーとノイズのパラメーターを試す機能を活用することを推奨しています。 
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>コンバージョン遅延によるユーティリティへの影響
   </td>
   <td>コンバージョンの遅延がキャンペーンの設定と検証、またはキャンペーンの最適化を妨げるのではないかという懸念。 
   </td>
   <td>Chrome は、コンバージョンレポートの遅延の影響について、相反するフィードバックを聞いています。 ただし、Attribution Reporting API では、ユーザーのプライバシーを保護するためにレポートにランダムな遅延が生じるため、Chrome はテスト期間中に特定のユースケースや懸念事項がより明確になることを期待しており、追加のデバッグサポートまたは開発者ガイダンスによって対処される可能性があります。 
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>長い集計期間
   </td>
   <td>30 日間の集計期間の延長に関するリクエスト 
   </td>
   <td>Chrome は、データの最小化と有用性の両方を考慮して、集計期間の長さに関するフィードバックを求める<a href="https://github.com/WICG/conversion-measurement-api/issues/337">回答を公開</a>しました。
   </td>
  </tr>
  <tr>
   <td>アトリビューション レポート
   </td>
   <td>視認できないインプレッション
   </td>
   <td>視認できないインプレッションがビュースルーコンバージョンレポートにカウントされるかどうかに関する質問。 
   </td>
   <td>Chrome は、表示可能なインプレッションをより明確に説明する<a href="https://github.com/WICG/conversion-measurement-api/issues/310">回答を Git Hub に公開</a>しました。
   </td>
  </tr>
</table>

## 隠されたトラッキングの制限


<table>
  <tr>
   <td style="background-color: #f3f3f3"><strong>API/テクノロジー</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>フィードバックのテーマ</strong>
<p>
<strong>（普及率でランク付け）</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>質問と懸念事項の要約</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Chrome の対応</strong>
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減
   </td>
   <td>パフォーマンス
   </td>
   <td>Critial-CH（最初のページ読み込み時）を介してヒントを取得するレイテンシーが懸念されています。
   </td>
   <td>Chrome は、パフォーマンスを向上させる方法を検討しています。
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減/User-Agent Client Hints
   </td>
   <td>不正防止/乱用防止に関する懸念
   </td>
   <td>サービス拒否を含む特定の種類の攻撃をデバッグする際には、できるだけ多くの情報を持つことが重要です。 UA 文字列からいくつかの情報を失うと、問題が発生する可能性があります。
   </td>
   <td>Chrome は、デバッグに役立つ十分な情報を提供しながら、プライバシーを維持する方法を議論し、評価しています。
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減
   </td>
   <td>OT セットアップに関する混乱
   </td>
   <td>複数のオリジントライアル参加者が、オリジントライアルへの登録方法の例を含むドキュメントを改善することを推奨しました。
   </td>
   <td>Reduced UA のオリジントライアルは終了しますが、Chrome は<a href="/blog/user-agent-reduction-deprecation-trial/">デプリケーション トライアルの指示</a>（サンプルデモをより目立たせることを含む）を改善する予定です。
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減
   </td>
   <td>特定のヒントの価値に関する懸念
   </td>
   <td>Sec-CH-UA-Model がユーザーエージェント文字列の &lt;deviceModel> と同じかどうかに関する質問。
   </td>
   <td>Sec-CH-UA-Model は、ユーザーエージェント文字列の &lt;deviceModel> と同じです。 Chrome は、今後のドキュメントでこれをより明確にする予定です。 
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減
   </td>
   <td>デプリケーション トライアルへの登録に関する懸念
   </td>
   <td>多数のドメインをデプリケーション トライアルに登録する方法に関する質問
   </td>
   <td>Chrome はデプリケーション トライアルを設計する際に集中型のアプローチを検討しましたが、Chrome はすべてのコントロールを開発者に与える既存のオリジントライアルが最良の選択肢であると考えています（開発者はヘッダーを送信するかどうかを選択できるため）。
   </td>
  </tr>
  <tr>
   <td>User-Agent Client Hints
   </td>
   <td>UA-CH の規範的性質に関する懸念
   </td>
   <td>rfc7231 で定義されているように、User-Agent ヘッダーが提供する柔軟性と比較すると、UA-CHが過度に規範的であるという懸念があります。
   </td>
   <td>Chrome は、UA-CH ヘッダーの規範的な性質を、最終的なブラウザ間の相互運用性とユーザーのプライバシー保護（高エントロピー識別子の任意の追加を防ぐことによる）の両方の観点から、UA 文字列の柔軟性に対する重要な改善と見なしています。
<p>
ただし、他の人もこの懸念を抱えており、フィードバックの提供を希望する場合に備えて、イシューは未解決のままとなっています。
   </td>
  </tr>
  <tr>
   <td>User-Agent Client Hints
   </td>
   <td>特定のブラウザをブロックするために API が使用されているという懸念
   </td>
   <td>サイトが API を使用して「Google Chrome」または「Microsoft Edge」を探し、他のすべてのブラウザをブロックしているという懸念。
   </td>
   <td>ブランドリストのコンセプトは、このケースを処理するために設計されました。ブラウザは、自社のブランドに加えて「Google Chrome」を送信できます。
   </td>
  </tr>
  <tr>
   <td>User-Agent Client Hints
   </td>
   <td>サポートされているすべてのヒントを列挙するメソッドのリクエスト
   </td>
   <td>ブラウザでサポートされているすべてのヒントをプログラム的に知る方法に関心があります。
   </td>
   <td>Chrome は機能リクエストを評価中です。
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減/User-Agent Client Hints
   </td>
   <td>不正防止/乱用防止に関する懸念
   </td>
   <td>クライアントヒントは HTTP1 の初回ロードでは利用できません
   </td>
   <td>Client Hints Reliability API（ACCEPT_CH）の 1 つは、HTTP2 と HTTP3 でのみ使用できます。 まだ HTTP1 経由でサービスを提供しているサーバーの場合、Critial-CH のみに依存する必要があります。
   </td>
  </tr>
  <tr>
   <td>ユーザーエージェントの削減
   </td>
   <td>Android 版 Chrome への影響
   </td>
   <td>これが特に Android の Chrome にどのように影響するかについての質問
   </td>
   <td>UA Reduction と UA-CH は、デスクトップ版のほかに、Android 版の Chrome にも出荷されます。 Android 版 Chrome の場合、変更は Chrome 110 で現在予定されている「フェーズ6」でのみ行われます。
   </td>
  </tr>
  <tr>
   <td>Gnatcatcher（WIPB）
   </td>
   <td>不適合な用途と方法
   </td>
   <td><a href="https://github.com/bslassey/ip-blindness/blob/master/proposed_willful_ip_blindness_principles.md#nonconforming-uses-of-ip-addresses">不適合な使用と不適合な方法</a>についての明確な説明
   </td>
   <td>Chrome は Explainer の詳細を更新する予定です。
   </td>
  </tr>
  <tr>
   <td>Gnatcatcher + ユーザーエージェントの削減
   </td>
   <td>不正防止シグナルの軽減
   </td>
   <td><em>IP</em> と UA アクセスを<em>同時に</em>に軽減した場合の不正防止の影響 
   </td>
   <td>Willful IP Blindness 不正防止ポリシーの規定（不正防止のユースケースで IP を使用できるようにする）により、IP プロキシに関する防御性の懸念が解決されることが期待されています。
   </td>
  </tr>
  <tr>
   <td>ナビゲーショントラッキング
   </td>
   <td>将来の破損に関する懸念
   </td>
   <td>広告主は潜在的な破損を懸念しており、ID プロバイダーも Chrome の計画に関心を示しています。
   </td>
   <td>Chrome は差し迫った変更を行っておらず、まだユースケースを模索中です。
   </td>
  </tr>
  <tr>
   <td>SameSite Cookie
   </td>
   <td>他のブラウザとの相互運用性
   </td>
   <td>crbug.com/1221316 は Chrome の実装が他のブラウザと異なる領域であるため、Chrome によるその修正計画に関する質問です。
   </td>
   <td>Chrome はメトリクスにバグを発見し、その結果新しいメトリクスを公開しました。 Chrome は、バグ修正の影響をよりよく理解するためにデータを収集しています。
   </td>
  </tr>
  <tr>
   <td>ストレージ分割
   </td>
   <td>メッセージチャネルの分割に関する懸念
   </td>
   <td>メッセージングチャネル（SharedWorker と BroadcastChannel）を分割する必要があるかどうかに関する質問。
   </td>
   <td>Chrome はフィードバックを評価していますが、隠されたトラッキングを防ぐには、ストレージとともにメッセージングチャネルを分割する必要があると考えています。
   </td>
  </tr>
</table>

## サイト間プライバシーの境界の強化


<table>
  <tr>
   <td style="background-color: #f3f3f3"><strong>API/テクノロジー</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>フィードバックのテーマ</strong>
<p>
<strong>（普及率でランク付け）</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>質問と懸念事項の要約</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Chrome の対応</strong>
   </td>
  </tr>
  <tr>
   <td>First Party Sets
   </td>
   <td>共通のプライバシーポリシー要件
   </td>
   <td>すべての製品、および同じセットの一部である必要がある管轄区域にわたって共通のプライバシーポリシーを維持することは不可能です。
   </td>
   <td>Chrome はまだポリシー要件を定義中です。このフィードバックを念頭に置いておきます。
   </td>
  </tr>
  <tr>
   <td>First Party Sets
   </td>
   <td>Independent Enforcement Entity（IEE）は、FPS の有効性に関する多数の課題を受ける可能性が高い
   </td>
   <td>FPS の有効性を判断するための予測可能な課題の要約: テキストまたはプライバシーポリシーがセットメンバー間で一致しない、ユーザーが自明なセットメンバーシップの定義方法に関する明確さ、帯域幅とタイミングの課題、および企業構造に関する専門知識。
   </td>
   <td>Chrome はまだポリシー要件を定義中です。このフィードバックを念頭に置いておきます。
   </td>
  </tr>
  <tr>
   <td>First Party Sets
   </td>
   <td>ブラウザの FPS リストを維持するプロセス 
   </td>
   <td>非西欧諸国のウェブサイトへの参入障壁、更新ケイデンスの違いによるブラウザ間での FPS リストのバージョンの一貫性の欠如、および小型または新しいブラウザがリストを使用する能力に関する懸念。 
   </td>
   <td>Chrome では、ポリシー要件、承認プロセス、リストの使用権をまだ定義中です。このフィードバックを念頭に置いておきます。
<p>
Chrome は、Public Suffix List など、ウェブプラットフォームで使用されている他の静的リストからの情報も調べる予定です。 
   </td>
  </tr>
  <tr>
   <td>First Party Sets
   </td>
   <td>サイトごとの動的アサーションの設計 
   </td>
   <td> 動的設計（静的リストとは対照的）は、共通所有権の誤った主張や、ページ読み込みの遅延/失敗の傾向が強くなる可能性があります。
   </td>
   <td>Chrome は現在、静的リストアプローチを追求中です。 <a href="https://github.com/privacycg/first-party-sets/blob/main/signed_assertions.md">署名付きアサーション</a>アプローチが将来的に再評価された場合は、このフィードバックを念頭に置いておきます。
   </td>
  </tr>
  <tr>
   <td>First Party Sets
   </td>
   <td>First Party Sets の潜在的なユースケース（信頼できる公平なバージョンの FPS リストを作成できる場合）
   </td>
   <td>シングルサインオン、カスタマイズ可能なデータプロンプト、ユーザーへの透明性レポートの強化の可能性。
   </td>
   <td>Chrome は、First Party Sets の次のステップを検討する際に、このフィードバックを考慮する予定です。
   </td>
  </tr>
  <tr>
   <td>CHIPS
   </td>
   <td>ブラウザとの互換性
   </td>
   <td>他のブラウザが分割された Cookie 属性をどのように処理したかを理解することへの関心
   </td>
   <td>Chrome は、複数のブラウザで動作する設計と実装を特定するために、W3C などの公開標準グループ内で取り組みを続けます。
   </td>
  </tr>
  <tr>
   <td>CHIPS
   </td>
   <td>設計要件
   </td>
   <td>__Host- 名の接頭辞を含めるのが現実的ではないかもしれないという懸念
   </td>
   <td>Chrome は、オリジントライアルでの命名要件を削除しました。テスト期間の終了時にこの削除を恒久的にするかどうかを検討します。 
   </td>
  </tr>
  <tr>
   <td>CHIPS
   </td>
   <td>広告のユースケースでの CHIPS の使用
   </td>
   <td>広告のユースケースで CHIPSを使用できるかどうかについての質問
   </td>
   <td>CHIPS では、サードパーティがトップレベルサイト（またはその First-Party Sets）に分割されたクライアントサイド Cookie を作成するができます。 ユースケースがクロスサイト状態ではなく分割の状態を必要とする場合、そのユースケースには CHIPS を使用できます。
   </td>
  </tr>
  <tr>
   <td>CHIPS
   </td>
   <td>CHIPS と FPS の統合
   </td>
   <td>First Party Sets など、他のプライバシーサンドボックスの提案と並行して CHIPS をテストに使用することは不可能かもしれないという懸念
   </td>
   <td>Chrome は、そのようなテストを可能にするテスト環境を促進する方法を積極的に模索しています。 <a href="/blog/first-party-sets-sameparty/#how-do-you-get-involved">FPS</a> のローカルテスト用の指示と、<a href="/docs/privacy-sandbox/chips/#try-it-out">CHIPS</a> に関する指示も公開しており、暫定的に使用することができます。
   </td>
  </tr>
  <tr>
   <td>FedCM
   </td>
   <td>明示性
   </td>
   <td>ブラウザは ID 連携フローの一部をレンダリングするため、IdP がユーザーに提示したいと思うニュアンスをすべて把握するのは困難であるという懸念
   </td>
   <td>Chrome はこのトレードオフを認識しており、エコシステムと連携して、可能な限り多くの分野をカバーし、可能な限り明示できるようにすることに取り組み続ける意向です。 Chrome は、ブランディングのカスタマイズ（ロゴ、色など）や文字列のカスタマイズ（「～でログイン」ではなく「この記事にアクセス」など）といったアイデアを検討中です。
   </td>
  </tr>
  <tr>
   <td>FedCM
   </td>
   <td>ブラウザの関与
   </td>
   <td>ブラウザが以前よりも ID 連携フローに関与しているため、ユーザーがどのウェブサイトに（どの IDP を使って）ログインしているかをより明確に認識することが懸念されます。
   </td>
   <td>Chrome は、ブラウザがより積極的な役割を果たしていることを認識していますが、ID 連携をサポートしながら、ブラウザがクロスサイトトラッキングを区別して防止するには、この追加レベルの関与が必要です。
   </td>
  </tr>
  <tr>
   <td>FedCM
   </td>
   <td>適用性と相互運用性
   </td>
   <td>他のブラウザが FedCM を採用または実装しないことへの懸念。 
   </td>
   <td>Chrome は、FedID コミュニティグループで ID 連携のための共通ソリューションを見つけるために、他のブラウザベンダーとの協力にも努めています。
   </td>
  </tr>
  <tr>
   <td>FedCM
   </td>
   <td>さまざまな API の課題
   </td>
   <td>FedCM はまだ早期段階または未熟であり、エコシステムが必要とするすべての機能を提供するのに長い時間がかかるだろうという懸念。
   </td>
   <td>Chrome は、エコシステムテストの一環としてこれをさらに調査する予定です。
   </td>
  </tr>
  <tr>
   <td>FedCM
   </td>
   <td>エンタープライズポリシーとユーザーコントロール
   </td>
   <td>企業が ID 連携の展開を変更せずに維持できるようにするコントロール（エンタープライズポリシーやユーザー設定など）が提供されるかどうかに関する懸念 再デプロイまたは変更が特別に困難である ID 連携のオンプレミスデプロイが多いため、IdP の再デプロイを必要とする新しいブラウザ API に対して多くの抵抗があります。
   </td>
   <td>Chrome は、これらの懸念に対処できると考えているエンタープライズ管理者とユーザーのためのコントロールを模索中です。 Chrome は、特定のユースケースに関する企業からのフィードバックを歓迎しています。 
   </td>
  </tr>
</table>

## スパムと詐欺への対抗


<table>
  <tr>
   <td style="background-color: #f3f3f3"><strong>API/テクノロジー</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>フィードバックのテーマ</strong>
<p>
<strong>（API ごとの普及率でランク付け）</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>質問と懸念事項の要約</strong>
   </td>
   <td style="background-color: #f3f3f3"><strong>Chrome の対応</strong>
   </td>
  </tr>
  <tr>
   <td>トラストトークン API
   </td>
   <td>償還限度
   </td>
   <td>特に、同じページに数回埋め込まれている場合や、組織内に別の発行者ドメインがあるシナリオでは、1 ページあたり 2 個では制限が強すぎるという懸念があります。 他の市場参加者を考慮しなくても、自社で限界に達する可能性があります。  
   </td>
   <td>Chrome は、採用が増えれば 1 ページあたりの償還上限をわずかに拡大する可能性がありますが、過剰なエントロピーを導入するためには比較的低く抑える必要があります。  さらに、償還レコードをキャッシュすることで、1 つの発行者が 1 人のユーザーに対して短期間で複数のトークンを引き換える必要性を減らすことができます。
   </td>
  </tr>
  <tr>
   <td>トラストトークン API
   </td>
   <td>レイテンシー
   </td>
   <td>通常、入札リクエストには 10 ミリ秒以内に応答する必要があるため、最初のページの読み込み時にトークンを引き換えると、入札前の無効なトラフィックの決定を含めることがほぼ不可能になります。 
   </td>
   <td>Chrome は、テストを通じて、レイテンシーが入札前のユースケースにどのように影響するかを理解しようとしています。
   </td>
  </tr>
  <tr>
   <td>トラストトークン API
   </td>
   <td>OpenRTB の採用
   </td>
   <td>入札前のユースケースでは、広告の決定に使用するために、引き換えられたトークン情報を SSP と DSP に渡すことが重要です。  
   </td>
   <td>IAB は新しいデフォルトフィールドを追加するための標準を所有していますが、IAB と協力して、有用な不正防止/不正使用防止シグナルが OpenRTB を介して伝播できるようにすることに前向きです。
   </td>
  </tr>
  <tr>
   <td>トラストトークン API
   </td>
   <td>プライバシー
   </td>
   <td>エントロピーは少ない（約 2.5 ビット）にもかかわらず、あらゆる形態のクロスサイトデータ伝播の存続可能性が長期であることに関する質問
   </td>
   <td>ユニークユーザーの識別可能性を回避するための堅牢なユーザー保護を考えると、Chrome はエコシステムが受け入れるのに適したケースがあると考えています。 Chrome は主な関係者と緊密に協力して、長期的な存続可能性を確保することに努めています。  
   </td>
  </tr>
  <tr>
   <td>プラットフォームアテステーションシグナル
   </td>
   <td>新しいアイデア/提案への関心を測定する
   </td>
   <td>プラットフォームが提供できるデバイスインテグリティシグナルの伝達など、さまざまな実現可能な（および実行不可能な）シグナルの強力なサポート
   </td>
   <td>Chromeは、フィードバックの新しいアイデアとして、このアイデアを W3C の不正防止コミュニティグループに持ち込む予定です。 
   </td>
  </tr>
  <tr>
   <td>不正防止のための信頼できるサーバー 
   </td>
   <td>新しいアイデア/提案への関心を測定する
   </td>
   <td>興味深いコンセプトだが、おそらく適用可能なユースケースをさらに調査する必要がある
   </td>
   <td>関心の度合いに応じて、Chrome はこのコンセプトについてさらにアイデアを練り、今後のエコシステムフィードバックで使用する Explainer に含める可能性があります。
   </td>
  </tr>
</table>

